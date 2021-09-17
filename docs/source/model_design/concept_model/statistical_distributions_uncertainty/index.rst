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

.. _vivarium_best_practices_statistical_distributions:

=========================================================
Statistics Distributions of Uncertainty
=========================================================

.. contents::
   :local:
   :depth: 1

.. todo::

  Intro

Common Statistical Distributions
--------------------------------

.. todo::

  - Uniform
  - Normal/Truncated normal
  - Lognormal
  - Gamma
  - Beta
  - Ensemble
  - Etc.

Log-normal distribution
+++++++++++++++++++++++

A random variable :math:`X` has a `log-normal distribution`_ with parameters
:math:`\mu` and :math:`\sigma`, denoted :math:`X\sim \mathrm{Lognorm}(\mu,
\sigma^2)`, if and only if its logarithm :math:`Y=\log(X)` has a normal
distribution with mean :math:`\mu` and variance :math:`\sigma^2`. Equivalently,
a random variable :math:`Y` satisfies :math:`Y\sim \mathcal{N}(\mu, \sigma^2)`
if and only if its exponential :math:`X = \exp(Y)` satisfies :math:`X \sim
\mathrm{Lognorm}(\mu, \sigma^2)`.

.. _log-normal distribution: https://en.wikipedia.org/wiki/Log-normal_distribution

Defining a log-normal distribution to simulate parameter uncertainty
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A lognormal distribution may be an appropriate model of uncertainty for any
positive, unbounded quantity :math:`X`. Rates and relative risks are common
model parameters for which a lognormal distribution may be appropriate. If the
literature reports a value :math:`v` for :math:`X` and a 95% confidence interval
:math:`(a,b)` such that :math:`v` is close to the geometric mean of the
endpoints (that is, :math:`v \approx \sqrt{ab}`, which is to the *left* of the
interval's midpoint), this is a good indication that the uncertainty in
:math:`X` can be modeled by a lognormal distribution with geometric mean
:math:`v` and central 95% interval :math:`(a,b)`.

A lognormal distribution with parameters :math:`\mu` and :math:`\sigma` has
geometric mean :math:`e^\mu`, which is also equal to the median of the
distribution. Below is Python code to construct a `scipy.stats lognormal
distribution`_ with a specified geometric mean (median) :math:`e^\mu = v =`
``median`` and approximate central 95% interval :math:`(a,b)` (where :math:`a =`
``lower`` and :math:`b =` ``upper``). The interval :math:`(a,b)` will be exactly
the central 95% interval of the distribution if and only if :math:`v =
\sqrt{ab}`.

.. _scipy.stats lognormal distribution: https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.lognorm.html

.. code-block:: Python

  import numpy as np
  from scipy import stats

  def lognorm_from_median_lower_upper(median, lower, upper, quantile_ranks=(0.025,0.975)):
    """Returns a frozen lognormal distribution with the specified median, such that
    (lower, upper) are approximately equal to the quantiles with ranks
    (quantile_ranks[0], quantile_ranks[1]).
    """
    # Let Y ~ Norm(mu, sigma^2) and X = exp(Y), where mu = log(median)
    # so X ~ Lognorm(s=sigma, scale=exp(mu)) in scipy's notation.
    # We will determine sigma from the two specified quantiles lower and upper.

    # mean (and median) of the normal random variable Y = log(X)
    mu = np.log(median)
    # quantiles of the standard normal distribution corresponding to quantile_ranks
    stdnorm_quantiles = stats.norm.ppf(quantile_ranks)
    # quantiles of Y = log(X) corresponding to the quantiles (lower, upper) for X
    norm_quantiles = np.log([lower, upper])
    # standard deviation of Y = log(X) computed from the above quantiles for Y
    # and the corresponding standard normal quantiles
    sigma = (norm_quantiles[1] - norm_quantiles[0]) / (stdnorm_quantiles[1] - stdnorm_quantiles[0])
    # Frozen lognormal distribution for X = exp(Y)
    # (s=sigma is the shape parameter; the scale parameter is exp(mu), which equals the median)
    return stats.lognorm(s=sigma, scale=median)

Common Model Parameters and Their Possible Appropriate Uncertainty Distributions
--------------------------------------------------------------------------------

.. todo::

  - Relative risk
  - Mean difference
  - Proportion
  - Cost estimate
  - Etc.

Other Considerations
--------------------

.. todo::

  - How to handle very asymmetric confidence intervals
  - How to handle uncertainty in data source(s) rather than statistical uncertainty from a single high quality data source?
    - Ex: combining multiple estimates from published papers with their own statistical uncertainty
  - How to handle uncertaity when extrapolating a subnataional estimate to a national estimate?
  - How to handle uncertainty distribution in the case of joint distributions
