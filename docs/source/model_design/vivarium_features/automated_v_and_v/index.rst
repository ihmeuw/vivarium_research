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
For validation, we specify a target 95% uncertainty interval (UI), within which we expect the simulation's **true** value (i.e. the value of the simulation result as the simulated population size goes to infinity) should fall 95% of the time.
For example, we could specify that the UI of the simulation's true value is +/-10% of the GBD estimate, which means it is 95% certain to be within 10% **as the population size goes to infinity.**

We have begun to formalize fuzzy checking using Bayesian hypothesis tests,
one for each of the values we want to check in the simulation.
In these hypothesis tests, the null hypothesis is that the simulation value comes from our V&V target distribution
and the alternative hypothesis is that it comes from a prior distribution of bugs/errors;
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

For our hypothesis testing approach to fuzzy checking, we choose a
cutoff `Bayes factor <https://en.wikipedia.org/wiki/Bayes_factor>`_.
The Bayes factor represents the size of the *update* we would make toward
the alternative hypothesis (that there is an error/bug in the simulation)
in a Bayesian framework.
The higher our cutoff is, the higher our specificity, but the lower our sensitivity.

.. todo::
  We do not estimate what the sensitivity and specificity values are.
  We could estimate these from our priors, if desired, to help with choosing a cutoff
  (note that these would only be estimates, not exact values, when our priors are knowingly
  mis-specified; see "Proportions and rates" section for how we approximate a Poisson binomial
  with a binomial distribution).
  For now we have used a conventional "decisive" cutoff of 100.

.. todo::
  There is potential to do something like a "power calculation," finding what ranges of
  true parameter values would be extreme enough to reject our hypothesis X% of the time.
  However, it is unclear whether this would add anything beyond calculating a sensitivity.
  Both would depend only on our priors, not on the data, and therefore would generally not
  change frequently unless our sample size was the result of dynamic simulation behavior.

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