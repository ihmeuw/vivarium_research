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

.. _automated_v_and_v:

.. role:: underline
    :class: underline

=========================================================
Automated verification and validation (V&V)
=========================================================

.. contents::
   :local:

.. note::

  This is a description of how to automate some verification and validation checks of our models.
  The approach described here has been prototyped on the probabilistic record linkage (PRL) project
  but it is not yet part of our routine simulation process.

Background/Motivation
---------------------

:ref:`The current process for verification and validation (V&V) <vivarium_v_and_v_process>`
works well but can be quite labor intensive.
Additionally, due to the long runtime of simulations and the number of people involved,
each V&V cycle generally takes *at least* one day, which makes it difficult to find and fix issues quickly.

Automating more of the V&V process would help us catch issues faster and with less work.

**We do not need to automate all V&V checks.** The more potential issues we can catch quickly and
automatically, the better.
This will also free up researcher V&V time to do more open-ended exploration of
results, which is difficult or impossible to automate.

Automated V&V
-------------

Automating V&V requires transforming the manual process into something that can be executed by a computer
and generate an unambiguous verdict on whether or not there is an issue.

.. note:: 
  In the future, we could explore having a result more complex than just "there is an issue" or
  "there isn't an issue," such as multiple levels of priority for potential issues to be reviewed by a human.
  For now, we stick to a binary result.

There are some process questions to work out about this transformation:

* Who investigates the cause of automated V&V failures -- research or engineering?
  Should we label whether checks are verification or validation, and have engineering and research investigate them, respectively?
  How we manage this affects how annoying it is to have a false alarm, which is relevant to `fuzzy checking`_.
* How frequently do we run automated V&V?
    * Should we consider separate "tiers" of automated checks that require different amounts of computational resources?
      For example, running the fast checks on every update to simulation code but the slower/more intensive checks only periodically.

PRL case study: integration tests
+++++++++++++++++++++++++++++++++

We have automated some V&V checks on the PRL project with `integration tests <https://en.wikipedia.org/wiki/Integration_testing>`_,
which run the simulation for a given number of time steps and check certain conditions
with explicit Python :code:`assert` statements.
When the model exhibits unexpected behavior,
the tests fail.
For example, there is a test that checks that each non-GQ household in the simulation has exactly one
living reference person, a condition which should always be true.

These tests have access to intermediate simulation states, not only simulation outputs, and can check
conditions at each time step.
Therefore, they are quite similar to :ref:`interactive simulation V&V <vivarium_interactive_simulation>` we have done in the past.
Because not much changes over time in the PRL simulation (there is nothing like an intervention scale-up),
we test only the first 10 time steps.

The integration tests `can be found in the simulation repository <https://github.com/ihmeuw/vivarium_census_prl_synth_pop/tree/main/integration_tests>`_.
Because none of the checks we have automated (so far) for the PRL simulation need a very large population
(and in the PRL simulation we do not run with multiple draws), these integration tests can run in just a few minutes.
Engineers are expected to run them before merging any pull request.

.. note::
  In the future, integration tests could be run by continuous integration (CI) and required before merging; at present,
  the simulation artifact is only available internally to IHME, which makes using it from an external
  CI server impossible.

Tests have been developed by the engineering team to cover most of the simulation's functionality,
though test coverage is not complete.
Notably, none of the observers currently have integration tests.

.. todo::
  Due to technical limitations in the :code:`pytest` tool, integration tests currently must select a simulation
  "size" (population, draws, time span), run it completely, and then check the results.
  It would likely lead to a much quicker iteration cycle if we ran a small simulation, checked the results,
  then added more population/draws/time and checked the results again, etc, similar to how we expand runs with
  :code:`psimulate`.
  This way, egregious bugs could be caught very quickly.

Fuzzy checking
--------------

It is fairly straightforward to automate checks such as
"a household *always* has exactly one living reference person."
It is more difficult to check that a value is correct when the value in the
simulation is subject to stochastic variation.
We clearly cannot check that the rate of events in the simulation is **exactly** the expected rate,
or that a mean value of a continuous risk factor is **exactly** as expected.
Nor can we use an approximation like "within X% of the target value,"
since how much a value deviates due to chance depends on our population size.
The difficulty of this problem is part of why, in the manual V&V process, we usually check such values visually.

Note that fuzzy checking can be applied to both **verification** and **validation**.
For verification, the "target" is that the simulation's value is exactly
correct.
For example, if the simulation applies a GBD incidence rate, we can verify the simulation's incidence rate against
that GBD rate.
If we run with an arbitrarily large population, the simulation's rate should match arbitrarily well;
a simulation with billions of simulants would be expected to match the GBD rate to many decimal points.
For validation, we specify a target 95% uncertainty interval (UI), within which we expect the simulation's **underlying** value (i.e. the value of the simulation result as the simulated population size goes to infinity) should fall 95% of the time.
For example, we could specify that the UI of the simulation's prevalence value is +/-10% of the GBD prevalence, which means it should be 95% certain to be within 10% of GBD **as the simulated population size goes to infinity.**
For more on the interpretation/meaning of this UI, see the next section.

We have begun to formalize fuzzy checking using Bayesian hypothesis tests,
one for each of the values we want to check in the simulation.
In these hypothesis tests, one hypothesis is that the simulation value comes from our V&V target distribution
and the other hypothesis is that it comes from a prior distribution of bugs/errors;
when our data strongly favors the latter, it indicates a problem with the simulation.

Interpreting the hypotheses
+++++++++++++++++++++++++++

In the previous section, we have been a bit vague about what the hypotheses under consideration **mean**, using terms like "should"
(in "should fall 95% of the time") and "bugs/errors" without defining them.
Here, we attempt to define more precisely how we intend to interpret these competing hypotheses.
Understanding the interpretation is important to setting validation targets.

V&V as a decision problem
~~~~~~~~~~~~~~~~~~~~~~~~~

The decision that will be informed by these results, and by V&V in general, is whether to move forward with a simulation as-is,
(e.g., to report its results in a scholarly publication) or investigate the cause of a surprising result.
When we do investigate a result, we will either end up gaining more confidence it is valid, determine it is caused by a limitation and leave it be,
or make changes to the simulation to fix a bug or limitation.
We define "acceptable" limitations as those we would leave in the simulation if we knew about them,
while "unacceptable" limitations are those we would make changes to address if we knew about them.
Generally, all bugs (issues caused by differences between documentation and implementation) are considered unacceptable,
no matter the severity, because a bug is unambiguously wrong and relatively easy to fix
(in that it does not require redesigning the model or seeking more data).
Note that all of our models, being imperfect representations of the real world, have many limitations that we knew about during the design process,
and these are acceptable by definition since we put them there intentionally -- we call these "planned" limitations,
while the limitations that we didn't know about before running the simulation are "unplanned" limitations.
However, if we failed to accurately anticipate the impact of a planned limitation on our results, that constitutes an additional unplanned
limitation that, when we discover it, we may deem acceptable or unacceptable.

Since the direct decision to make in response to V&V results is whether to **investigate** a surprising result,
not whether to fix it, there are (at least) three ways to define our ideal decision function.
By the "ideal decision function" here, we mean the way we would make the decision if we had perfect information;
that is, if we already knew which limitations were acceptable and which weren't, but we still had to investigate them
before we could fix them.
All three are subject to the restriction that the decision function operates at the level of the check and not at the level of the simulation overall
(i.e. the decision of whether or not to investigate each surprising result must be made independently).

1. Ideal decision function: investigate all unplanned limitations, even those that we know (since we have perfect information) are acceptable.
   This decision function is ideal if it is worth the cost of investigation to understand our simulation completely, e.g. to be able to write a comprehensive
   "Limitations" section.
2. Ideal decision function: investigate all unplanned limitations that are larger than the unplanned limitations we typically produce in simulation design,
   even those that are acceptable.
   This decision function is ideal if it is worth the cost of investigation to understand the areas in which our simulation is **more** limited than a typical simulation we do.
3. Ideal decision function: investigate only unacceptable limitations (which are all unplanned by definition).
   We place no value on understanding the simulation better unless we would take action based on that information.

Connecting the decision to the hypotheses
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In fuzzy checking, we make hypotheses about the simulation **process**, which includes everything starting from primary data collection in the real world,
to data seeking and interpretation, to the modeling itself (since unacceptable or acceptable issues could be introduced anywhere in this chain).

Our "no bug/error" hypothesis is more precisely defined based on one of the ideal decision functions in the previous section:

1. With ideal decision function 1, the hypothesis is a distribution representing our subjective belief about the distribution of results
   that would be generated by a simulation with only our planned limitations and no bugs.
2. With ideal decision function 2, ditto, but for a simulation with our planned limitations, plus the amount and kind of
   unplanned limitations we've typically seen in past model results, and no bugs.
3. With ideal decision function 3, ditto, but for a simulation with the maximum limitation that would be acceptable,
   and no bugs.

In all cases, our second hypothesis, which we described above as "bug/error," is more precisely a distribution that represents our subjective belief about the
distribution of results that would be generated by the opposite process: one that **always** produces a bug/limitation not
permitted by our first hypothesis.

Sources of uncertainty
~~~~~~~~~~~~~~~~~~~~~~

When constructing our "no bug/error" hypothesis based on our validation data,
we should take into account the process that generated that validation data.
For example, if our validation data is a survey that we didn't use to inform the simulation,
we should conceptually start with a prior about the real-world
value we are interested in (e.g. prevalence of a certain disease).
We should then update that prior with our validation data to obtain our subjective belief,
including uncertainty, about the real-world value.
Then, we should consider the (probably wider spread) distribution of simulation input data that could be collected
under such a distribution of real-world values, and finally the (probably wider spread) distribution of simulation
results ("underlying" values, ignoring stochastic uncertainty) that could be generated under this distribution
of input data, given the assumed modeling limitations in one of
the hypothesis versions above.
It will probably not be feasible to do this whole process quantitatively, but conceptually
that is the belief we should attempt to represent with our V&V target.

However, on the other hand, if we are using validation data that shares some process in common
with our simulation, we would **not** want to include that part of the process in our uncertainty.
For example, in the PRL case study, we validate our simulation against a population-level migration rate in ACS,
when we also used ACS to calculate demographic-stratified migration rates for input to the simulation
and to initialize the demographics of the simulated population.
Therefore, the data collection step of ACS is almost entirely common between the validation data
and the simulation result, and uncertainty about how well this data collection reflects the real
world should mostly not be included in our hypothesis.
The only divergence between the ACS value and the simulation result will be due to dynamic
components such as immigration, emigration, fertility, and mortality, which are based on various
data sources, and update the demographic structure of the simulated population, thereby causing
drift in the population-level rate.
So, as before, we should start by thinking of priors on the migration rates,
and then update that with the ACS observations stratified by demographics.
We should also think of priors on the real-life values of the rates, etc
collected in our non-ACS data inputs to the immigration, emigration, fertility, and mortality components.
Then we could imagine a distribution of data that would be collected by these non-ACS data inputs given the
real-life values,
and a distribution of effects those components would be expected to have on the population structure by modeling
those processes (with assumed limitations) based on those data collected, including
the aspect of modeling that projects those present-day dynamics into the future.
Finally, we would construct from these pieces a distribution of population-level rates that we would expect the simulation to have if it
was built with assumed limitations, with the stratified rates directly from ACS but a population that starts with
ACS and applies X years of the population structure effects from the dynamic components.
This hypothesis should be much more concentrated around the ACS population-level value than it would be if the ACS
was being used as validation data for a simulation that did not use it as an input.
Again, we are unlikely to follow a process this formal, but this is the distribution we should do our best to
subjectively approximate.

Computational simplification
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The last, but quite large, caveat to our hypothesis tests is that our hypotheses' distributions will always be restricted to
a functional form that is too simple to represent our true subjective belief.
For example, in the case of rates, as described below, we use a beta distribution for computational reasons.
We can say categorically that the distribution of outcomes of a process as complex as building a
simulation will not have such a simple distribution;
therefore, you could argue that our prior belief in *any* beta-distributed hypothesis should be 0,
since that *cannot* be the true data-generating distribution.

.. pull-quote::
  ... it is difficult to accept the existence of a “true” model in a
  literal sense. There are many situations however where one is prepared to proceed “as if” such a
  true model existed, and furthermore belonged to some specified class of models. Naturally, any
  further conclusions will then be conditional on this (often strong) assumption being reasonable
  in the situation considered.

[Bernardo_2002]_

For lack of a better option, we follow this pattern.
Therefore, we summarize our subjective belief in the "no bug/error" case using a 95% UI.
Instead of testing the subjective belief itself, which is difficult or impossible to quantify,
we test the distribution in the appropriate class (e.g. beta distribution) that most closely
replicates that 95% UI.
The same limitation applies to the "bug/error" case, where we simply choose a plausible distribution
of the appropriate class to use for all checks.

Sensitivity and specificity
+++++++++++++++++++++++++++

The **sensitivity** of a check is the probability of it catching
an issue, given that the issue is present.
The **specificity** is the probability of the check passing when
there is no issue present.

In this diagram `from Wikipedia <https://en.wikipedia.org/wiki/Sensitivity_and_specificity>`_, the yellow plane represents the decision boundary: to the left of this boundary, our check
considers the simulation "Healthy"; to the right, our check
considers the simulation "Sick."
The boundary can be chosen arbitrarily, which illustrates the direct tradeoff
between sensitivity and specificity.
By moving it left, we reduce the number of false negatives (missed bugs, in the simulation context), increasing sensitivity.
However, we also increase the number of false positives (false alarms),
decreasing specificity.

.. figure:: PPV,_NPV,_Sensitivity_and_Specificity.svg

  By Original by Luigi Albert Maria - SVG version of File\:PPV, NPV, Sensitivity and Specificity.pdf, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=99283192

In non-fuzzy V&V checks, there are no false alarms, so the specificity is always perfect.
The sensitivity depends on the population size: with a very small simulation run,
there could be lots of buggy situations that are possible but don't occur in that run due to chance.

Fuzzy checking introduces the problem of false alarms ("false positives" in the diagram above), when a check fails randomly without
there being an actual problem in the simulation.
The more difficult it is to investigate false alarms,
the more important it is for the checks to have high specificity.

For our hypothesis testing approach to fuzzy checking, we choose a
cutoff `Bayes factor <https://en.wikipedia.org/wiki/Bayes_factor>`_.
The Bayes factor represents the size of the *update* we would make toward
the hypothesis that there is an error/bug in the simulation
in a Bayesian framework.
The higher our cutoff is, the higher our specificity, but the lower our sensitivity.

.. todo::
  We do not estimate what the sensitivity and specificity values are.
  We could estimate these from our priors, if desired.
  Note that these sensitivity and specificity estimates would only be as good as our priors,
  and our priors are sometimes knowingly mis-specified; see the "Proportions and rates" section
  for how we approximate a Poisson binomial with a binomial distribution.

  Having estimates of sensitivity and specificity could help with choosing a cutoff and
  a population size.
  They would only depend on the priors and not on the data, and therefore
  would not change frequently, unless our sample size for (some of) our fuzzy checks was the
  result of dynamic simulation behavior.
  As described above, changing the Bayes factor cutoff trades off sensitivity for specificity,
  whereas increasing population size improves sensitivity (at all specificities) but also increases
  runtime.

  For now we have used a conventional "decisive" cutoff of 100 for the Bayes factor,
  and in the PRL simulation we typically run the integration tests with 250,000 simulants,
  which is about as large as we can run in a reasonable amount of time (10-20 minutes).

.. todo::
  There is potential to do something like a "power calculation," finding what ranges of
  true parameter values would be extreme enough to reject our hypothesis X% of the time.
  However, it is unclear whether this would add anything beyond calculating a sensitivity.

Hypotheses by value type
++++++++++++++++++++++++

.. todo::
  For now, we have only investigated methods for fuzzy checking proportions and rates.
  This is sufficient for a proof-of-concept implementation, which applies fuzzy checking
  to migration rates in the PRL simulation.
  Presumably, other types of values could be checked using appropriate hypothesis tests:

  * Summary statistics of continuous values, such as the mean or standard deviation of a hemoglobin distribution
  * Relative risks/rate ratios between categorical groups
  * More complex situations such as the number of unique values of an attribute observed, though these may
    be hard to work out hypotheses for, and are not likely to come up frequently in our simulations.

Proportions and rates
~~~~~~~~~~~~~~~~~~~~~

In our discrete-time simulations, rates can be seen as equivalent to proportions.
On each time step, a given event happens to some proportion of the population at risk.

The proportion we observe in the simulation is the result of some number of independent Bernoulli trials,
one for each simulant at risk.
Usually, in our simulations, the probability associated with each simulant/trial varies only according
to some categorical risk factors, which means that within each combination of categories,
the probability is the same for all simulants and the number of events has a binomial distribution.

When simulant-level probabilities of an event vary within a group (for example, if there is a continuous risk factor
of the event), the Bernoulli trials are independent but not identically distributed,
**if we take into account our prior knowledge about the risk factor.**
In that case, we could say that the number of events observed has a `Poisson binomial <https://en.wikipedia.org/wiki/Poisson_binomial_distribution>`_
distribution.
This distribution has the same mean and **lower** variance, relative to a binomial distribution where each trial
has the mean probability.
Generally, it will be easier for us to ignore our prior knowledge about which simulants have higher
event probabilities, and use the binomial distribution.
This sacrifices some sensitivity without a corresponding increase in specificity, because we will
not flag an issue where the result is only very unlikely **given the observed distribution of risk factors.**

When a target 95% UI is specified instead of a single target value,
we fit a `beta distribution <https://en.wikipedia.org/wiki/Beta_distribution>`_ that has approximately that UI.
(This is an equal-tailed interval; in other words, we treat the
lower bound as the 2.5th percentile and the upper bound as the 97.5th.)
Because the beta distribution is the conjugate of the binomial distribution,
we can then use an easy-to-calculate `beta-binomial <https://en.wikipedia.org/wiki/Beta-binomial_distribution>`_ as the distribution
of the number of events when there is not a bug.

Finally, we must specify a distribution in the case where there is a bug/error
in the simulation.
For computational reasons, this should use a conjugate prior to the binomial,
which means our prior on the underlying simulation rate as the population
goes to infinity should be a weighted sum of beta distributions.
For simplicity, we currently use a `Jeffreys prior <https://en.wikipedia.org/wiki/Jeffreys_prior>`_ of a single beta distribution with :math:`\alpha = \beta = 0.5`.

PRL case study: population-level rates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note::
  As of October 2023, implementation of fuzzy checking in the PRL simulation's
  automated V&V is `still in progress <https://github.com/ihmeuw/vivarium_census_prl_synth_pop/pull/333>`_.
  That PR contains the statistics, and applies the method to domestic migration and immigration;
  emigration will be added in a forthcoming PR.

As an initial example of fuzzy checking, we are working on a proof-of-concept implementation of integration tests of
rates of simulant migration (into, out of, and within the US) in the PRL simulation.

These rates are stratified by a number
of demographic factors, and some of these factors (e.g. race/ethnicity) have highly imbalanced categories.
Therefore, verifying rates within each demographic combination would require a large population size.

Instead, the integration tests do a combination of verification and validation by checking
**population-level** migration rates against the corresponding rates in our data source (the American Communities Survey).
These should be similar, since the simulation's rates are calculated using this data source,
and the demographic composition of the population is initialized from the same data.
However, simulation rates can drift slightly from population-level rates in the data, without being indicative of a bug,
due to demographic change over the course of the simulation.
Checking at the population level makes use of the binomial approximation to the Poisson binomial,
as described in the previous section.

For rates of migration within the US, we check the migration rate at each time step, and overall.
We set the target range for each time step by assuming with 95% certainty that the drift will be at most 1% per time step that has elapsed
since initialization.
Overall, we set a UI of +/-10% the ACS value.

.. todo::
  We do not yet test emigration, but plan to do so with similar assumptions.

Migration into the US is a bit different; it is not an event with a rate of occurrence among
an at-risk population.
The only stochastic part of determining the number of immigration events is the
:ref:`"stochastic rounding" used <census_prl_international_immigration>`.
We check this rounding as a set of Bernoulli trials, one per time step:
whether to round up or down.

The PRL integration tests are run very frequently by the software engineering team.
Due to how frequently they are run and the difficulty of debugging a failed test
(perhaps requiring researcher input in some cases),
it is important for these tests to be highly **specific**;
they should very rarely fail by chance.
For that reason, we have set the Bayes factor cutoff to 100, commonly called "decisive,"
in *addition* to the generally conservative approximations listed in the section above.
In practice, by manually introducing bugs in the simulation, we have found that even with this very conservative approach, automated V&V is quite sensitive.

References
----------

.. [Bernardo_2002] Bernardo, José M., and Raúl Rueda. “Bayesian Hypothesis Testing: A Reference Approach.” International Statistical Review / Revue Internationale de Statistique, vol. 70, no. 3, 2002, pp. 351–72. JSTOR, https://doi.org/10.2307/1403862. Accessed 6 Nov. 2023.