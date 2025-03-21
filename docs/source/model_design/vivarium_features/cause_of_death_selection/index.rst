..
  Section title decorators for this document:
  
  ==============
  Document Title
  ==============
  Section Level 1
  ---------------
  Section Level 2
  +++++++++++++++
  Section Level 3
  ~~~~~~~~~~~~~~~
  Section Level 4
  ^^^^^^^^^^^^^^^
  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

.. _cause_of_death_selection:

.. role:: underline
    :class: underline

=========================================================
Cause of death selection
=========================================================

.. contents::
   :local:

Cause of death
--------------

When deaths are recorded on death certificates, a coroner typically records
a **causal chain** of events, each causing the next, that directly caused the death.
For epidemiological purposes, including in the GBD, it is usually the **underlying**
cause that is most interesting: a **disease or injury** you find if you follow the causal chain
back far enough.

.. note::

  Of course, you could imagine following the chain back even further,
  for example saying that a lung cancer death was due to smoking or even that the smoking
  was due to the lack of national tobacco control policies,
  but this doesn't happen on death certificates.

What does it mean when we say a death was *caused* by a disease?
It means that in a counterfactual where the person didn't have that disease,
they wouldn't have died.
That explicit framing makes clear that there is some imprecision here:
they wouldn't have died *when*?
Of course, everyone is going to die eventually, regardless of what diseases they have.
So that counterfactual can only delay their death by some finite amount of time.
Perhaps they wouldn't have died that *minute* but they still would have died within
the hour, or perhaps they would have lived 50 more years!

Cause of death in GBD
---------------------

The Global Burden of Disease study (GBD), informed primarily by death certificates
and by methods that seek to approximate them such as verbal autopsy, **assigns every
death a single cause.**

When GBD uses cause of death, particularly in its risk factors analysis which has an
explicitly causal interpretation (how many fewer deaths would there be in a world where
nobody smoked?), it reports these numbers at an annual level (e.g. how many fewer deaths there would
have been in 2021).
Therefore, it is implicitly answering the when question: in a counterfactual where
those people didn't have the diseases in question, they wouldn't have died anytime that year.

However, a limitation of GBD is that it assumes deaths averted due to each cause sum to the total deaths averted,
which implies that everyone who died in the real world and didn't die under the exact same circumstances
in the counterfactual *also would not die for any other reason during the rest of the year*.
It is as if, in the counterfactual, instead of dying they became invincible (for the rest of the year).
This is obviously not realistic but simplifies things mathematically.

Cause of death in Vivarium
--------------------------

In our microsimulations, following GBD, we assign every death a single cause --
going beyond this would make our simulations discordant with GBD in ways that
would be very difficult to reason about.

However, the causal interpretation of our cause-of-death assignment is a bit different than in
GBD on the *when* question, because we partially address the GBD limitation
described above.
When we say a simulant died of cause A, it means that if they hadn't had cause A,
they would not have died *on that timestep.*
If they didn't die, however, they could still die on a future timestep;
we don't want to replicate the lasting invincibility implied by the GBD limitation.
If our timesteps are long enough that it still feels implausible to say they
wouldn't have died of anything else during that time, that may be a sign that our
timesteps are too long!

Cause of death is a different sort of causal claim than we typically make in
our microsimulations.
Usually, we do causal inference by comparing two scenarios, where we change one thing;
any differences in outcomes are therefore caused by the one thing we changed.
With cause of death, we don't actually run a scenario in which we delete that cause;
the cause of death is assigned within the scenario.

To be internally consistent, though, we **want the deaths we assign cause A on a given timestep
to be the same deaths that would not occur if we did run a no-cause-A scenario.**
This might seem like an academic point, since we will never run such a scenario.
But this property turns out to be equivalent to another property that has more practical relevance:
**when we intervene only on cause A, only cause A deaths should be averted**.

Current behavior
--------------------------

As of March 2025, the internal consistency described above is not achieved.
It is possible to have two scenarios in which only cause A is intervened on,
but cause B deaths are averted when comparing the two scenarios.

.. note::

  This is **only** due to random noise (stochastic uncertainty) about the number
  of cause B deaths averted.
  *In expectation* -- that is, as the simulated population size goes to infinity --
  the number of cause B deaths averted is 0.
  In other words, this is an issue with our common random numbers, which are intended
  to reduce the variance in our estimates of averted quantities.

To briefly describe the reason why this can occur:
in Vivarium Public Health's mortality component,
two random decisions are made: first, we decide whether or not the simulant dies,
and only then do we decide the cause of death, with two separate random draws.

This is conceptually equivalent to (but possibly computationally faster than)
making a single choice between:

1. The simulant dies of cause A
2. The simulant dies of cause B
3. ... (and so on for other causes in the model)
4. The simulant dies of an unmodeled cause
5. The simulant does not die

Where each option is assigned a probability, and the probabilities collectively sum to 1.

We can visualize this as follows. For each simulant (with the same age and sex,
who has causes A, B, and C), Vivarium chooses a random point on the following
stacked bar chart:

.. image:: cod_diagram.drawio.svg

The problem is that when one of the cause-specific probabilities changes between scenarios,
it *shifts* all the rest.
Here's an example where an intervention reduces the excess mortality rate of cause A:

.. image:: cod_issue_diagram.drawio.svg

Instead of some simulants who would have died of cause A not dying at all,
some simulants who would have died of cause A die of cause B instead,
some who would have died of cause B die of cause C instead,
and some who would have died of cause C don't die at all.
Cause B and C don't change size -- so in expectation, the number of deaths is the same --
but depending on where our finite population of simulants actually fall on this
graph, we may get nonzero (positive or negative) numbers of deaths averted
for both cause B and C.

Proposed behavior
--------------------------

Instead of the above, we want to transfer probability *directly* from the intervened-on
cause to "does not die."
In order to do this, we reserve sections of the probability space for each
potential cause of death in the model.
**These reservations are the same between scenarios.**
The probability section for cause B never starts until after the *reserved* section
for cause A, regardless of the scenario-specific probability of cause A.

.. image:: cod_solution_diagram.drawio.svg

Making the reservations the same between scenarios is challenging in Vivarium,
due to the fact that scenarios run independently in an embarrassingly parallel fashion,
with no inter-scenario communication.
As such, we can only make the reservations based on information that we guarantee
we will not change between scenarios.
We typically change risk factor exposures and cause states, and sometimes directly
decrease excess mortality rate for a given cause state and risk factor exposure,
in our intervention scenarios.
However, we can generally assume that we will not add new causes, add new risk factor exposure
levels or cause states, change demographics such as age, or directly *increase* mortality rates
(conditional on risk exposures and cause states) in our intervention scenarios.

Therefore, for each age group and sex of simulants,
we can reserve for each cause its maximum cause-specific mortality probability (for that age group and sex) across
all possible risk factor exposures and cause states, and before applying any interventions on the mortality
probability directly.
This will be consistent between scenarios because age group and sex will not change, and the *possible*
risk factor exposures and cause states will not change (though our intervention may change their prevalences).
For continuous risk factors, we will need to bound the highest-risk exposure to some plausible range
for these purposes.
These are conservative upper-bound reservations that could be tightened if there was more
inter-scenario information sharing.

If our reservations under this scheme would require us to reserve more than 100% probability,
we will scale down our reservations proportionally to fit under 100%.
This means that our reservations may not be big enough all of the time and it is theoretically
possible for the true probability to "overflow" the reservation.
In this case, we revert to the status quo: an overflowing probability will shift over the next
cause's probability.
As long as this happens rarely, we will still get good variance reduction in aggregate.
If this is common, it may indicate that our timestep is too long.

.. note::

  I believe we could get slightly better variance reduction by starting each cause's probability
  at the midpoint of its reservation, and growing symmetrically outward toward the edges of the
  reservation, then overflowing the reservation in a random direction (e.g. right).
  But the benefit is probably small and not worth the implementation effort.