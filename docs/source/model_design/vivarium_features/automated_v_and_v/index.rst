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
  The approach described here has already been used in practice on the probabilistic record linkage (PRL) project
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

* Who investigates the cause of automated V&V failures -- research or engineering? Does it depend on the type of failure?
  The answers to these questions greatly affect how annoying it is to have a false alarm, which is relevant to `fuzzy checking`_.
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
Therefore, they are quite similar to :ref:`interactive simulation V&V <vivarium_interactive_sim_v_and_v>` we have done in the past.
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
For validation, we specify a target range, within which we expect the simulation's **true** value (i.e. the value of the simulation result as the simulated population size goes to infinity) should fall.
For example, we could specify that the simulation's true value should be within 10% of the GBD estimate, which means it is within 10% **not including stochastic variation.**

We have begun to formalize fuzzy checking using frequentist hypothesis tests,
one for each of the values we want to check in the simulation.
In these hypothesis tests, the null hypothesis is that the simulation value matches the V&V target;
rejecting the null hypothesis indicates a problem with the simulation.

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

For our hypothesis testing approach to fuzzy checking, we choose our desired
specificity for the overall checking process (across all V&V checks).
Then, :math:`1 - \text{specificity}` is our desired `family-wise error rate <https://en.wikipedia.org/wiki/Family-wise_error_rate>`_
for the family of hypotheses.
We use a `Bonferroni correction <https://en.wikipedia.org/wiki/Bonferroni_correction>`_ to determine whether
any of the null hypotheses (that the simulation values match the V&V targets) can be rejected.
This correction makes no assumptions of independence between the hypotheses,
but **it means that our desired specificity is only a lower bound**.
The true specificity of our automated V&V is higher, with a corresponding loss in sensitivity.

.. note::
  We use `frequentist <https://en.wikipedia.org/wiki/Frequentist_inference>`_, rather than `Bayesian <https://en.wikipedia.org/wiki/Bayesian_statistics>`_, statistics here.
  This is mainly because a Bayesian approach would be more complex to implement, and
  it would be tricky to specify an intuitive prior about
  the distribution of potential simulation errors.

  However, using a Bayesian approach here would lead to a more interpretable result,
  namely the posterior probability that there is a bug.
  In other words, it would allow us to know what the tradeoff is between sensitivity and specificity, instead of setting specificity only and not knowing how sensitive our automated V&V is.
  This is worth exploring further.

While we cannot directly calculate the sensitivity of our fuzzy checks (or, for that matter, of our non-fuzzy checks),
we can gain some intuition about whether our fuzzy checks are sensitive enough.
We do this by reporting the range of true simulation values we would have an 80% chance of detecting as not matching the target value (in other words, the values we are `powered <https://en.wikipedia.org/wiki/Power_of_a_test>`_ to detect with power ≥ 0.8).
This power calculation does not depend on what is actually observed in the simulation, unless dynamic behavior
changes our sample size.
Therefore, in most cases we only need to look at power when adding new checks to our automated V&V;
if human inspection of the ranges of values that would be detected indicates that
the hypotheses are sufficiently powered to find bugs,
we can then move forward with that population size for all future runs of those checks.

Hypotheses by value type
++++++++++++++++++++++++

.. todo::
  For now, we have only investigated methods for fuzzy checking proportions and rates.
  This is sufficient for a proof-of-concept implementation, which applies fuzzy checking
  to migration rates in the PRL simulation.
  Presumably, other types of values could be checked using the appropriate hypothesis tests.

Proportions and rates
~~~~~~~~~~~~~~~~~~~~~

In our discrete-time simulations, rates can be seen as equivalent to proportions.
On each time step, a given event happens to some proportion of the population at risk.

The proportion we observe in the simulation is the result of some number of independent Bernoulli trials,
one for each simulant at risk.
Usually, in our simulations, the probability associated with each simulant/trial varies only according
to some categorical risk factors, which means that within each combination of categories,
the probability is the same for all simulants and the number of events has a binomial distribution.
Therefore, a two-tailed `binomial test <https://sites.utexas.edu/sos/guided/inferential/categorical/univariate/binomial/>`_
can determine the p-value of the simulation result in that group, which is the probability
of observing a result equally or less likely, given that the simulation's value is correct.

When simulant-level probabilities of an event vary within a group (for example, if there is a continuous risk factor
of the event), the Bernoulli trials are independent but not identically distributed.
The number of events observed has a `Poisson binomial <https://en.wikipedia.org/wiki/Poisson_binomial_distribution>`_
distribution.
This distribution has the same mean and **lower** variance, relative to a binomial distribution where each trial
has the mean probability.
The simple binomial distribution can be used as an approximation, allowing the use of a binomial test in this situation as well;
due to the variance property, this approximation will increase the specificity of the fuzzy check higher than it was configured to be.
This increase in specificity will cause a decrease in sensitivity.

When a range instead of a single number is specified for a validation target,
we use for the probability of a result its *maximum* probability, given *any* value in the specified range.
This naturally means that all values within the range have a p-value of 1.
This approach is more "conservative" (higher specificity and lower sensitivity) than any possible Bayesian prior about the
true value.

.. todo::
  What is this called? A minimax hypothesis test?

PRL case study: population-level rates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note::
  As of June 2023, implementation of fuzzy checking in the PRL simulation's
  automated V&V is `still in progress <https://github.com/ihmeuw/vivarium_census_prl_synth_pop/pull/256>`_.
  That PR contains the statistics, but does not yet apply the method to migration
  as described here; PRs for that are forthcoming.

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

For rates of migration within the US, and migration into the US, we check the migration rate at *each* time step.
We set the target range for each time step by assuming that the drift will be at most 1% per time step that has elapsed
since initialization.

For rates of migration out of the US, we check the migration rate over all time steps, setting a maximum 10% overall drift.
There is no particular reason for this discrepancy with the other two types of migration.

.. todo::
  Let's correct the discrepancy in the proof-of-concept by checking rates both overall *and* on each time step, for all three migration types.

The PRL integration tests are run very frequently by the software engineering team.
Due to how frequently they are run and the difficulty of debugging a failed test
(perhaps requiring researcher input in some cases),
it is important for these tests to be highly **specific**;
they should very rarely fail by chance.
For that reason, we set the specificity to 95%,
in *addition* to the generally conservative approximations listed in the section above,
which will in effect further increase this number.
In practice, by manually introducing bugs in the simulation, we have found that even with this very conservative approach, automated V&V is quite sensitive.