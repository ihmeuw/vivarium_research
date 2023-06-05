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

  This is a proposal for how to automate parts of the verification and validation process.
  It builds on some work that has already been done on the probabilistic record linkage (PRL) project but is not
  yet routine practice on other simulations: integration testing.

  It also covers some extensions to integration testing which would allow it to automate more V&V checks.
  As of April 2023, these are in the process of being implemented on the PRL project.

Background/Motivation
---------------------

:ref:`The current process for verification and validation (V&V) <vivarium_v_and_v_process>`
works well but can be quite labor intensive.
Additionally, due to the long runtime of simulations and the number of people involved,
each V&V cycle generally takes *at least* one day, which makes it difficult to find and fix issues quickly.

Automating more of the V&V process would help us catch issues faster and with less work.

**We do not need to automate all possible V&V checks.** The more potential issues we can catch quickly and
automatically, the better.
This will also free up researcher V&V time to do more open-ended exploration of
results, which is difficult or impossible to automate.

Automated V&V
-------------

Automating V&V requires transforming the manual process into something that can be executed by a computer
and generate an unambiguous verdict on whether or not there is an issue.

.. note:: 
  In the future, we could explore having an in-between result, where the automated process flags
  a *potential* issue for human review.
  For now, we stick to a binary result.

There are some process questions to work out about this transformation:

* Who investigates the cause of automated V&V failures -- research or engineering? Does it depend on the type of failure?
* How frequently does automated V&V need to be run, and with what population size/number of draws/etc?
    * Should we consider separate "tiers" of automated checks that require different amounts of computational resources?
* What sort of sensitivity/specificity tradeoff do we want for our automated V&V?
  This likely depends on both of the previous questions.

PRL case study: integration tests
+++++++++++++++++++++++++++++++++

We have automated some V&V checks on the PRL project by adding integration tests
to `the simulation repository <https://github.com/ihmeuw/vivarium_census_prl_synth_pop/>`_.
These tests run the simulation for a given number of time steps and check certain conditions
with explicit Python :code:`assert` statements, which fail when the model exhibits unexpected behavior.
For example, there is a test that checks that each non-GQ household in the simulation has exactly one
living reference person, a condition which should always be true.

The integration tests have access to intermediate simulation states, not only simulation outputs, and can check
conditions at each time step.
Therefore, they are quite similar to :ref:`interactive simulation V&V <vivarium_interactive_sim_v_and_v>` we have done in the past.
Because not much changes over time in the PRL simulation (there is nothing like an intervention scale-up),
we test only the first 10 time steps.

None of the checks we have automated (so far) for the PRL simulation need a very large population.
(Additionally, in the PRL project in general we do not run with multiple draws.)
Therefore, these integration tests can run in just a few minutes
and engineers are expected to run them before merging any pull request.
In the future, this could be done by continuous integration (CI) and required before merging; at present,
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
Nor can we use an approximation like "within X% of the true value,"
since how much a value deviates due to chance depends on our population size.
The difficulty of this problem is part of why, in the manual V&V process, we usually check such values visually.

By building a proof-of-concept for the PRL simulation, we have begun to formalize this to enable
automated V&V of such "fuzzy" values.
The approach we have landed on is to use frequentist hypothesis tests that correspond
to the values we want to check in the simulation.
In these hypothesis tests, the null hypothesis is that the simulation value corresponds to the V&V target;
rejecting the null hypothesis indicates a problem with the simulation.

We set the family-wise error rate, which is the probability of any test failing when all
the simulation values are correct.
We use a Bonferroni correction to determine whether
any of the null hypotheses (that the values are correct) can be rejected.
This correction makes no assumptions of independence between the hypotheses,
but it means that our specified family-wise error rate is only an upper bound.
The true family-wise error rate may be lower, with a corresponding loss of sensitivity.

.. note::
  We use frequentist, rather than Bayesian, statistics here.
  This is mainly because it would be tricky to specify an intuitive prior about
  the distribution of potential simulation errors, and because any such prior
  would likely not lead to an analytically tractable posterior distribution.
  Having to sample from such a distribution could significantly add to the computational
  costs of automated V&V.

  However, using a Bayesian approach here would lead to a more interpretable result
  (probability there is a bug) and could help us understand the tradeoff between
  type I (false alarm) and type II (a true issue is not caught) errors.
  This is worth exploring further.

Note that fuzzy checking can be applied to both **verification** and **validation**
(in fact, validation checks are almost always fuzzy).
In the case of verification, generally the expected result is that the simulation's value is exactly
correct.
In the case of validation, we can specify a range within which we expect the simulation's value should fall
(e.g. within 10% of the GBD estimate).

We can measure the statistical power of our hypothesis tests.
To do this in a flexible way that does not require an effect size estimate specific to each hypothesis,
we can report the range of simulation values we would have an 80% chance of detecting (power = 0.8).
This wouldn't affect whether the fuzzy check passes or fails; it would be used for human inspection to
get a sense of whether the computational resources allocated to the automated V&V are sufficient.
Note that the power calculations do not depend on what is actually observed in the simulation, unless dynamic behavior
changes our sample size.
Therefore, in most cases power calculation results should not need to be re-inspected every time there is an update to the simulation.

Value types
+++++++++++

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
Therefore, a `binomial test <https://sites.utexas.edu/sos/guided/inferential/categorical/univariate/binomial/>`_
can determine the p-value of the simulation result in that group, which is the probability
of observing a result equally or less likely, if the simulation's value is correct.
We use two-tailed tests in order to catch errors in either direction.

When simulant-level probabilities of an event vary within a group (for example, if there is a continuous risk factor
of the event), the Bernoulli trials are independent but not identically distributed.
The number of events observed has a `Poisson binomial <https://en.wikipedia.org/wiki/Poisson_binomial_distribution>`_
distribution.
This distribution has the same mean and **lower** variance, relative to a binomial distribution where each trial
has the mean probability.
This simple binomial distribution can be used as an approximation, allowing the use of a binomial test in this situation as well;
due to the variance property, this approximation will increase the specificity of the fuzzy test to be higher than
necessary to achieve the specified family-wise error rate.
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

As an initial example of fuzzy checking, we have a proof-of-concept implementation of integration tests of
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
We might consider checking both overall and on each time step for all three migration types.

The PRL integration tests are run very frequently by the software engineering team.
Due to how frequently they are run and the difficulty of debugging a failed test
(perhaps requiring researcher input in some cases),
it is important for these tests to be highly **specific**;
they should very rarely fail by chance.
For that reason, we set the family-wise error rate to 5%,
in *addition* to the generally conservative approximations listed in the section above,
which will in effect further decrease this number.
In practice, we have found that even with this
very conservative approach, reasonable population sizes are sufficient to detect small deviations
in relevant simulation values.