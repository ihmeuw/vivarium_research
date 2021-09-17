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
literature reports a value :math:`v` for :math:`X` and an asymmetric 95%
confidence interval :math:`(a,b)` such that :math:`v` is close to the geometric
mean of the endpoints (that is, :math:`v \approx \sqrt{ab}`, which is to the
*left* of the interval's midpoint), this is a good indication that the
uncertainty in :math:`X` can be modeled by a lognormal distribution with
geometric mean :math:`v` and central 95% interval :math:`(a,b)`.

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
    the values (lower, upper) are approximately equal to the quantiles with ranks
    (quantile_ranks[0], quantile_ranks[1]). More precisely, if q0 and q1 are
    the quantiles of the returned distribution with ranks quantile_ranks[0]
    and quantile_ranks[1], respectively, then q1/q0 = upper/lower.
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

Note that since the log-normal distribution has only two parameters :math:`\mu`
and :math:`\sigma`, using three parameters :math:`v=` ``median``, :math:`a=`
``lower``, and :math:`b=` ``upper`` to specify the distribution results in an
overdetermined system if the specified median :math:`v` is not exactly equal to
the geometric mean of :math:`a` and :math:`b`. In ths case, the above code
actually determines the distribution's two parameters from the median :math:`v`
and the ratio :math:`b/a`, and the returned distribution's central 95% interval
will only be approximately equal to :math:`(a,b)`.

If the confidence interval :math:`(a,b)` was in fact generated from a log-normal
distribution with the reported value :math:`v` being an estimate of the
geometric mean :math:`e^\mu` of :math:`X`, then any discrepancy between
:math:`v` and :math:`\sqrt{ab}` would be due to rounding errors. In this case,
the above function incorporates all available data and generally results in a
better fit than using only one of the two estimated quantiles :math:`a` or
:math:`b`. See Nathaniel's `notebook investigating different lognormal
distributions`_ for the :ref:`CIFF acute malnutrition project <2019_concept_model_vivarium_ciff_sam>`.

.. _notebook investigating different lognormal distributions: https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/wasting_transitions/uncertainty/2021_09_03c_lognormal_distributions_for_k_sam.ipynb

.. todo::

  Investigate more fully what the above algorithm does when there is no
  lognormal distribution matching the three parameters ``median``, ``lower`` and
  ``upper`` for the specified quantile ranks.

  As noted in the docstring, here's a brief description of what the algorithm
  does. Let :math:`v=` ``median``, :math:`a=` ``lower``, and :math:`b=`
  ``upper``, and let :math:`(p_0, p_1) =` ``(quantile_ranks[0],
  quantile_ranks[1])`` be the specified quantile ranks. Then the returned
  lognormal distribution has median :math:`v` and quantiles :math:`a'` and
  :math:`b'` of ranks :math:`p_0` and :math:`p_1` such that :math:`b'/a' = b/a`.

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
