.. _risk_correlation:

================
Risk Correlation
================

Background and motivation
-------------------------

At the individual level, risk exposures are frequently correlated.
Examples include high body mass index and high fasting plasma glucose,
tobacco smoking and alcohol use, and childhood height and weight.

Usually, Vivarium assigns each risk exposure independently to simulants, such that
each one follows the desired population-level univariate distribution, which frequently comes from GBD.
In the common case of a dichotomous exposure, this means that each simulant (in the same age/sex/location group) has the same
probability of exposure, which is equal to the prevalence in that population.

The correlation of risk exposures can be important to simulation results,
especially when the risks affect the same outcome, when results are stratified
by one of the risks, and/or when interventions are targeted based on one
of the risks.

.. todo::
  Add a more detailed description of when to include risk correlation, including
  which results are biased by the omission of a risk correlation and
  how to assess size/acceptability of the bias.

Risk exposure correlation
-------------------------

Instead of sampling from a univariate distribution for each risk exposure at initialization,
Vivarium can sample multiple exposures simultaneously from a multivariate distribution.
For example, given a correlation coefficient between two continuous exposures, it can sample from a bivariate normal distribution
instead of two independent univariate normal distributions.

We generally cannot get multivariate distributions from the GBD;
instead, we seek out auxiliary data sources.
These may report summary statistics such as a correlation coefficient, or
have full microdata we can use to summarize the joint distribution in a more detailed way.
However, no matter how we characterize the relationship, we prefer to continue to validate to the GBD marginal distributions,
since we trust them more than any single data source.

This plot shows data from a joint distribution reflecting the variance and covariance between height and weight for infants at age one month using
data from a cohort study.
The top panel shows the values for the height and weight z-scores and the bottom panel shows the percentiles
within the distributions (propensity values).

.. image:: gaussian_copulae.jpg

Maintaining correlation over time
---------------------------------

Maintaining the correlation is tricky when the risk exposures for a single simulant change over time.
In general, we have done this by sampling correlated *percentiles* at initialization and then keeping those *percentiles*
static throughout a simulant's life.
These percentiles, also known as propensities, are applied to different distributions as the simulant changes age group,
which means that a simulant's risk exposure in one age group and the next are perfectly auto-correlated.

For example, a simulant might have their propensities for height and weight sampled at birth from a
multivariate uniform distribution with correlation.
If the simulant receives a propensity of 0.85 (85th percentile) in height and 0.80 (80th percentile) in weight,
they are initially assigned the height and weight values at those percentiles among newborns.
But when they age into the next age group, they are assigned the values at those same percentiles in their new
age group, and so on throughout their life.
In this way, their height and weight can change over time, but the correlation introduced in the initial sampling
of propensities remains.

.. todo::
  Be more exact about the properties of the propensity correlation approach.
  I believe that it only exactly maintains the correlation coefficient with some distributional assumptions.

Risks with effects on the same outcome
--------------------------------------

When we introduce correlation between two risk factors that have effects on the same outcome, we have to
be especially careful about double-counting issues.

The population-attributable fractions (PAFs) must be calculated correctly,
or the population-level incidence of the outcome will
not validate to GBD.
**The usual Vivarium strategy to calculate joint PAFs (PAFs of more than one risk factor on an outcome)
is biased when the risk factors are correlated.**

The true population attributable fraction for the combined effect of two risk factors,
:math:`r1` and :math:`r2`, on an outcome :math:`O` such as a mortality rate is (assuming no effect modification, as we typically do):

.. math::
  O = O_{tmrel} * RR_{r1} * RR_{r2}

.. math::
  PAF = \frac{E(O) - E(O_{tmrel})}{E(O)} = 1 - \frac{O_{tmrel}}{E(O_{tmrel} * RR_{r1} * RR_{r2})} = 1 - \frac{1}{E(RR_{r1} * RR_{r2})}

where :math:`O_{tmrel}` is a constant representing the outcome (rate) among those at the
theoretical minimum risk exposure level.

Default approach
^^^^^^^^^^^^^^^^

By default in Vivarium, a joint PAF is calculated with the "multiplicative" approach:

.. math::
	PAF_{multiplicative} = 1 - (1 - PAF_{r1}) \cdot (1 - PAF_{r2}) = 1 - \frac{1}{E(RR_{r1})} \cdot \frac{1}{E(RR_{r2})}

When :math:`RR_{r1}` and :math:`RR_{r2}` are independent, :math:`E(RR_{r1}) * E(RR_{r2}) = E(RR_{r1} * RR_{r2})`
so :math:`PAF = PAF_{multiplicative}`; this is not the case when the risks are correlated.
The bias gets larger the more correlated the risks are, and the larger the true PAF is.
When exposures (with RR greater than 1) are positively correlated, the multiplicative approach underestimates the PAF.

Below is an example of how the population-level rate from GBD (0.5 in this case) will not match our simulation
result when two normally-distributed risk factors are correlated
(have non-zero covariance) and the multiplicative PAF is used.

.. image:: rate_dotplot.jpg

.. todo::
  Replace this example with Python, in a form we can easily re-run (e.g. Jupyter notebook) and where
  the parameters used are documented.
  The R code (incomplete and untested) is at :download:`correlated_exposures_sim.R`.

Calculation of joint PAFs in presence of correlation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Instead of the multiplicative approach, in the case of correlated risk factors we need to
directly estimate :math:`E(RR_{r1} * RR_{r2})` using our joint distribution between
:math:`r1` and :math:`r2`.
This generally needs to be performed for each combination of age, sex, and location.

.. todo::
  Is this usually/always calculated within the simulation, or is it sometimes done on the research side?
  Is there shared code or components that implement this on the engineering side?
  If the latter were true, we could simplify this section to "tell engineering to use the correlation-corrected
  joint PAF calculation" and put the mathematical details elsewhere.

For two categorical risks, the value is:

.. math::
  E(RR_{r1} * RR_{r2}) = \sum_{v1 \in r1}\sum_{v2 \in r2}{p(v1, v2) * RR_{r1}(v1) * RR_{r2}(v2)}

where :math:`p(v1, v2)` is the PDF of the joint distribution.

For two continuous risks with RRs **per unit increase** the value is:

.. math::
  E(RR_{r1} * RR_{r2}) = \int_{r1} \int_{r2} p(r1, r2) * (RR_{r1})^{(r1 - \text{tmrel}_{r1})} * (RR_{r2})^{(r2 - \text{tmrel}_{r2})} dr1 dr2

This can be approximated by sampling from the joint distribution, calculating
:math:`RR_{r1}(v1) * RR_{r2}(v2)` for each pair of exposures drawn, and taking the average
of those values.

For more details on the calculation of PAFs in the presence of correlated risks,
see `this example from the BEP project <https://github.com/ihmeuw/vivarium_research_bep_notebooks/blob/main/Correlation/2020_02_11a_correlation_and_paf.ipynb>`_.