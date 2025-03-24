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

It isn't necessarily the case that every death even has *any* disease that "caused" it,
unless the when question is answered with "wouldn't have died *that instant*."
Consider someone who has two separate types of terminal cancer.
For any non-instantaneous period of time, they could be sick enough with both cancers
that even in a counterfactual where one type of cancer was cured,
they would die of the other, and vice versa.

Cause of death in GBD
---------------------

The Global Burden of Disease study (GBD), informed primarily by death certificates
and by methods that seek to approximate them such as verbal autopsy, **assigns every
death a single cause.**
(GBD chooses from a hand-crafted standardized list of causes, which aren't always the same as what would
actually be written on a death certificate.)

As discussed above, assigning a cause to every death is only strictly compatible
with an instantaneous interpretation of cause of death.
However, when GBD uses cause of death, particularly in its risk factors analysis which has an
explicitly causal interpretation (how many fewer deaths would there be in a world where
nobody smoked?), it reports these numbers at an annual level (e.g. how many fewer deaths there would
have been in 2021).
This is (implicitly) a contradictory answer to the when question:
counting people who wouldn't have died *that year*.

This inconsistency is a limitation in GBD.
Essentially, according to GBD, everyone who died in the real world and wouldn't have died at the same instant
in a counterfactual without the cause
*also would not have died for any other reason during the rest of the year*.
It is as if, in the counterfactual, instead of dying they became invincible (for the rest of the year).
This is obviously not realistic but simplifies things mathematically.

.. note::

  Assigning a *single* cause to every death (assuming no deaths have multiple causes)
  also implies additional assumptions about causality, i.e. that two distinct causes cannot have
  their impacts on mortality mediated by the same factors.
  We don't delve into this issue here.

Cause of death in Vivarium
--------------------------

In our microsimulations, following GBD, we assign every death a single cause --
going beyond this would make our simulations discordant with GBD in large ways.

However, the causal interpretation of our cause-of-death assignment is a bit different than in
GBD on the *when* question, because we partially address the GBD limitation
described above.
When we say a simulant died of cause A, it means that if they hadn't had cause A,
they would not have died *on that timestep.*
If they didn't die, however, they could still die on a future timestep;
we don't want to replicate the lasting invincibility implied by the GBD limitation.
If our timesteps are long enough that it still feels like a big limitation to say they
wouldn't have died of anything else during that time, that may be a sign that our
timesteps are too long!

Cause of death is a different sort of causal claim than we typically make in
our microsimulations.
Usually, we do causal inference by comparing two scenarios, where we change one thing;
any differences in outcomes are therefore caused by the one thing we changed.
With cause of death, we don't actually run a scenario in which we delete that cause;
the cause of death is assigned within the scenario.

To be internally consistent, though, we **want the deaths we assign to cause A on a given timestep
to be the same deaths that would not occur on the same timestep in a scenario where no simulants had cause A.**
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

This problem can only occur when simulants have (on a given timestep) multiple causes of death
with non-zero probabilities.
In simulations where comorbidity is rare, and generally only one cause of death is a possibility for
each simulant on each timestep, one cause's probability shifting another is also rare and therefore not
much of an issue.
This might be the case in a simulation where all modeled causes are acute, short-duration conditions.
Conversely, in a simulation with multiple chronic conditions modeled, comorbidity will be
more common and the shifting issue will be as well.

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

Here's what the probability space might look like for different simulants in the
same age and sex group:

.. image:: cod_reservation_diagram.drawio.svg

If our reservations under this scheme would require us to reserve more than 100% probability,
we will scale down our reservations proportionally to fit under 100%.
This means that our reservations may not be big enough all of the time and it is theoretically
possible for the true probability to "overflow" the reservation.
In this case, we revert to the status quo: an overflowing probability will shift over the next
cause's probability.
This is illustrated below: at the highest risk exposure for cause B,
Simulant 3's Cause B probability overflows its reservation and shifts cause C.

.. image:: cod_reservation_overflow_diagram.drawio.svg

As long as shifting happens only rarely (for a few simulants on a few timesteps),
we will still get good variance reduction in aggregate.
If this happens often, it may indicate that our timestep is too long.
Our probabilities are a function of our rates and our timestep, and decreasing the timestep
will decrease the probabilities and therefore the reservations needed to ensure no overflow.

.. note::

  In these bar charts, all the bars have substantial width, for visibility.
  In real simulations, for many simulants, deaths due to certain causes
  will be rare; some of the cause-specific bars will be extremely narrow.

  With improbable enough events, we may have *numerical precision* problems:
  floating-point numbers only have a certain amount of precision, and if
  a bar is too narrow, floating-point imprecision could lead to it essentially
  being rounded down to zero and never happening.

  We're unsure whether this is a common problem in practice.
  If so, it could be addressed by using multiple floating-point numbers to sample
  the outcome.
  For example, first sampling which reservation the simulant's draw should fall into,
  then sampling where *in* the assigned reservation it falls, or any other procedure
  that achieves uniform sampling overall,
  is invariant between scenarios (to preserve the common-random-numbers properties),
  and avoids transforming any numbers in such a way that they become subject to
  significant floating-point imprecision.

.. note::

  An idea for how we could get slightly better variance reduction: starting each cause's probability
  at the midpoint of its reservation, and growing symmetrically outward toward the edges of the
  reservation, then overflowing in both directions (until/unless hitting one of the edges of
  the 0-1 space, at which point it would overflow solely the other direction).

  The thinking here is trying to minimize the probability that one cause's probability allocation
  "bumps into" (and therefore shifts) another.
  Starting everything at the left side of its reservation, as actually proposed here,
  means that anytime a cause's probability overflows its reservation and the next
  cause's probability is non-zero, shifting occurs.
  The midpoint approach would mean that a shift would require the amount of overflow to be
  greater than next_cause_reservation minus next_cause_probability divided by 2.
  But it's possible I've totally missed something, like a case where this idea shifts and the actual proposal doesn't.

  In any case, the benefit is probably small and not worth the implementation effort.