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

.. _vivarium_best_practices_ensemble_distributions:

=========================================================
Ensemble Distributions in GBD
=========================================================

.. contents::
   :local:

What Is an Ensemble Distribution?
---------------------------------

In GBD, many risk factor exposures are modeled by continuous probability
distributions. Occasionally, if we're lucky, the exposure data may closely
follow a standard probability distribution, such as normal, lognormal, Weibull,
gamma, Gumbel, etc. But in general there is no reason to expect real-world data
to match these nicely parameterized, mathematically convenient models. Thus, in
order to model exposure data more accurately, GBD uses an `ensemble learning`_
approach, fitting multiple distributions to the data, and averaging the
distribution functions together to get an overall "ensemble" distribution that
fits the data better than any of its individual components.

.. _ensemble learning: https://www.toptal.com/machine-learning/ensemble-methods-machine-learning#:~:text=Ensemble%20methods%20are%20techniques%20that,winning%20solutions%20used%20ensemble%20methods.

Mathematical Definition of Ensemble Distributions
-------------------------------------------------

Mathematically, an ensemble distribution in GBD is a `mixture distribution`_,
which is defined as follows.

Mixture Distributions
+++++++++++++++++++++

Suppose :math:`F_1, F_2,\ldots, F_k` are `cumulative distribution functions
<CDF_>`_ (CDFs), called the **base distributions** of the ensemble or the
**components** of the mixture, and suppose we have a collection of non-negative
numbers :math:`w_1, w_2,\ldots, w_k`, called **weights**, such that
:math:`\sum_1^k w_i = 1`. Then the **mixture distribution** with components
:math:`\{F_i\}_1^k` and weights :math:`\{w_i\}_1^k` is the probability
distribution on :math:`\mathbb{R}` whose cumulative distribution function :math:`F` is defined by

.. math::

  F(x) = \sum_{i=1}^k w_i F_i(x)\quad \text{for } x\in \mathbb{R}.

That is, the CDF of the mixture is a weighted average of the CDFs of the
components, with the weight of :math:`F_i` being :math:`w_i`.

If the :math:`F_i`'s all correspond to `continuous probability distributions`_
on :math:`\mathbb{R}`, then differentiating the above equation shows that the
mixture distribution is also continuous, with `probability density function
<PDF_>`_ (PDF) given by the coresponding weighted average of the component
densities, i.e. :math:`f(x) = \sum_1^k w_i f_i(x)`, where :math:`f=F'` and
:math:`f_i=F_i'`. Thus, the mixture distribution can be defined in terms of
density functions (PDFs) instead of distribution functions (CDFs) in the
continuous case.

.. _mixture distribution: https://en.wikipedia.org/wiki/Mixture_distribution
.. _CDF: https://en.wikipedia.org/wiki/Cumulative_distribution_function
.. _continuous probability distributions: https://en.wikipedia.org/wiki/Probability_distribution#Continuous_probability_distribution
.. _PDF: https://en.wikipedia.org/wiki/Probability_density_function

Fitting an Ensemble Distribution to GBD Risk Exposure Data
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

This section describes how GBD uses mixture distributions to define ensemble
distributions for modeling risk exposures.

Problem setup
~~~~~~~~~~~~~~~

Suppose we have a continuous risk exposure variable :math:`E` whose distribution
we want to model. For example, :math:`E` could be body mass index, fasting
plasma glucose, birthweight, or hemoglobin level. Suppose that we want to model
:math:`E` for :math:`n` different population groups, e.g. indexed by (location,
age, sex, year) as in GBD. Let :math:`j\in \{1,2,\ldots,n\}` specify which
population group we are referring to.

Typically, a GBD team will have microdata on :math:`E` for at least some of the
population groups, and they are able to estimate the mean :math:`\mu_j` and
standard deviation :math:`\sigma_j` of :math:`E` for each group :math:`j` using
various regression methods. The goal is to use all the available microdata plus
the estimates of :math:`\mu_j` and :math:`\sigma_j` to reconstruct the
approxmiate distribution function of :math:`E` for each group :math:`j`.

More precisely, the goal is to find a family of cumulative distribution
functions :math:`F(x | \mu, \sigma)`, parameterized by mean :math:`\mu` and
standard deviation :math:`\sigma`, satisfying the following criteria:

* For each group :math:`j` that has microdata, the distribution function
  :math:`F(x | \mu_j, \sigma_j)` provides a good approximation of the
  `empirical CDF`_ of :math:`E` ; and

* For all groups :math:`j`, the function :math:`F(x | \mu_j, \sigma_j)` provides
  a plausible estimate of the population distribution of :math:`E` --- in particular, its mean and
  standard deviation match :math:`\mu_j` and :math:`\sigma_j`.

.. _empirical CDF: https://en.wikipedia.org/wiki/Empirical_distribution_function

A simple strategy for estimating exposure distributions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

One simple approach to finding such a family of distributions :math:`F(x | \mu,
\sigma)` would be to choose a 2-parameter family of probability distributions on
:math:`\mathbb{R}`, such as the family of normal distributions
:math:`\mathcal{N}(\mu,\sigma^2)`, and to fit distributions from that family to
the exposure data using the `method of moments`_. That is, we would set
:math:`F(x | \mu, \sigma) \equiv \mathcal{N}(\mu,\sigma^2)` so that :math:`E`
would be normally distributed for each population group, with mean :math:`\mu_j`
and standard deviation :math:`\sigma_j` for the population group :math:`j`.

.. _method of moments: https://en.wikipedia.org/wiki/Method_of_moments_(statistics)

Improving the distribution estimates with an ensemble approach
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. todo::
  **Fill in this section.** Here are some unfinished snippets I started:

  The family of functions :math:`F(x | \mu, \sigma)` will be defined as a
  mixture of a fixed set of base distributions :math:`F_1(x | \mu, \sigma),
  F_2(x | \mu, \sigma),\ldots, F_k(x | \mu, \sigma)`  parameterized by mean
  :math:`\mu` and standard deviation :math:`\sigma`, using a fixed global set of
  weights :math:`\{w_i\}_1^k` for all :math:`\mu` and :math:`\sigma`. GBD calls
  :math:`F(x | \mu, \sigma)` an **ensemble distribution**.


  The goal for modeling :math:`E` with an ensemble distribution is to find a **global** set of weights :math:`\{w_i\}_1^k`


  to start with a specified set of base distributions :math:`F_1(x | \mu,
  \sigma), F_2(x | \mu, \sigma),\ldots, F_k(x | \mu, \sigma)`  parameterized by
  mean :math:`\mu` and standard deviation :math:`\sigma` and

  To model risk exposures using ensemble distributions, GBD uses the following
  procedure:

  1. Start with a collection of base distributions :math:`F_1, F_2,\ldots,
  F_k`

Where Is the Code for GBD's Ensemble Distributions?
----------------------------------------------------

Here are the repositories implementing ensemble distributions for :ref:`GBD
modeling <GBD_ensemble_repo_description>` and for :ref:`Vivarium
<Vivarium_risk_distributions_repo_description>`:

.. _GBD_ensemble_repo_description:

* `Ensemble Distributions repository (R code)  <R code_>`_ on Stash, maintained
  by Central Comp and accessible on the cluster at
  :file:`/ihme/code/risk/ensemble/`

  - `pdf_families.R`_ contains the list of base distributions for the ensemble,
    each with functions :samp:`d{distname}` to compute the density function
    (PDF), :samp:`p{distname}` to compute the probability distribution function
    (CDF), and :samp:`{distname}_mv2p` to implement the method of moments (i.e.
    calculate the parameters of the distribution given its mean and variance),
    where :samp:`{distname}` is the name of the base distribution in the R code.
    Each distribution is added to one of the classes ``classA`` (standard
    distributions supported on :math:`[0,\infty)` or :math:`(-\infty, \infty)`),
    ``classB`` (the shifted, scaled Beta distribution supported on
    :math:`[a,b]`), or ``classM`` (mirrored distributions) at the end of the
    file. The three distribution classes then get concatenated into a single
    distribution list called ``dlist`` in :file:`fit.R` and passed to the
    ``eKS`` function in :file:`eKS_parallel.R`.

  - `eKS_parallel.R`_ contains the optimization routine that finds the best set
    of ensemble weights by minimizing the `Kolmogorov--Smirnov statistic`_
    between the ensemble distribution and the empirical distribution of the
    data. This file also has code to plot the results of the fitting procedure.

  - `fit.R`_ loads the list of distributions from :file:`pdf_families.R` and
    calls :file:`eKS_parallel.R` to do the actual distribution fitting and plot
    the results.

  - `fit_submit.R`_ is the main program to submit a job on the cluster to fit an
    ensemble distribution to data by calling :file:`fit.R`.

  - `scale_density_simpson.cpp`_ is C++ code to rescale a distribution so that
    it integrates to 1 after it has been truncated at min and max values, using
    Simpson's rule. This function is called by the ``get_edensity`` function in
    `edensity.R`_. However, neither :file:`edensity.R` nor
    :file:`scale_density_simpson.cpp` appear to be used in any of the files
    above, as the ``get_edensity`` function has a different implementation in
    :file:`eKS_parallel.R`.

  - `edensity.R`_ is the function that returns an ensemble distribution density
    function for use in PAF calculations. Note that this function sets the
    XMIN and XMAX parameters that the mirrored gamma, mirrored gumbel, and 
    betasr functions rely on to the 0.001 and 0.999 percentiles of a lognormal
    distribution with the specified mean and standard deviation (or else a 
    normal distribution if the specified mean is equal to zero). However, XMIN
    and XMAX parameter values are overwritten with custom values for `several
    risk factors that can be found here <https://stash.ihme.washington.edu/projects/CCGMOD/repos/paf/browse/custom>`_.

.. _Vivarium_risk_distributions_repo_description:

* `Risk Distributions repository (Python code) <Python code_>`_ on GitHub,
  maintained by the Vivarium Engineering Team as part of
  `Vivarium Public Health <https://github.com/ihmeuw/vivarium_public_health>`_

  - `risk_distributions.py`_ implements GBD's ensemble distributions via a
    collection of classes that wrap ``scipy.stats`` distributions for use as
    risk exposure distributions in Vivarium. There is a class for each base
    distribution, each extending the ``BaseDistribution`` class, and an
    ``EnsembleDistribution`` class implementing the mixture of the base
    distributions. Each base distribution class implements the functions
    ``get_parameters`` to calculate the parameters of the distribution given its
    mean and standard deviation (implementing the method of moments), ``pdf`` to
    compute the probability density function, ``cdf`` to compute the cumulative
    distribution function, and ``ppf`` to compute the percent point function
    (i.e. quantile function, used for `inverse transform sampling`_).

  - `formatting.py`_ contains helper functions for formatting data and
    converting between data types.

  - Note that as of July 2023 by default, :code:`risk_distributions.py` sets XMIN and XMAX 
    parameter values to the 0.001 and 0.999 percentile values of a lognormal distribution
    with the specified mean and standard deviation, `as shown here 
    <https://github.com/ihmeuw/risk_distributions/blob/242c3c16c403bdf3833a7d3077bd24708150795b/src/risk_distributions/risk_distributions.py#L76>`_

.. note::

  Given that there are two different code bases meant to perform the same task, we have
  verified that the two code bases indeed accurately replicate one another `in a notebook
  that can be found here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/risk_distribution/risk%20distribution%20comparison.ipynb>`_. 
  We found that the two code bases do accurately replicate one another with a few exceptions:

    1. Accurate replication of the mirrored gamma and betasr distributions rely on values 
    for the XMIN and XMAX parameters. While the GBD R code implementation and Vivarium
    python code implementation share common default values for the XMIN and XMAX parameters,
    it is critical to ensure the python implementation reflect custom values used in the
    GBD implementation to accurately replicate the GBD distributions.

    2. The GBD code for the invweibull distribution relies on an optimization function 
    that can return unexpected results. The python function appears to solve the 
    distribution algebraically rather than via optimization and therefore does not 
    return these unexpected results. See more in this slack thread: 
    https://ihme.slack.com/archives/C01N6LFMN3W/p1688175801435049?thread_ts=1688162029.138979&cid=C01N6LFMN3W 

    3. The cumulative density function (:code:`.cdf`) in the python :code:`risk_distribution` 
    implementation does not function appropriately for the mirrored gamma or mirrored
    gumbel distributions.

    4. The python implementation reads in standard deviation while the R implementation reads
    in variance (equal to standard deviation squared), so input data must be appropriately
    converted when comparing the two implementations.

.. _R code: https://stash.ihme.washington.edu/projects/RF/repos/ensemble/browse
.. _Python code: https://github.com/ihmeuw/risk_distributions/
.. _fit_submit.R: https://stash.ihme.washington.edu/projects/RF/repos/ensemble/browse/fit_submit.R
.. _fit.R: https://stash.ihme.washington.edu/projects/RF/repos/ensemble/browse/fit.R
.. _eKS_parallel.R: https://stash.ihme.washington.edu/projects/RF/repos/ensemble/browse/eKS_parallel.R
.. _pdf_families.R: https://stash.ihme.washington.edu/projects/RF/repos/ensemble/browse/pdf_families.R
.. _edensity.R: https://stash.ihme.washington.edu/projects/RF/repos/ensemble/browse/edensity.R
.. _scale_density_simpson.cpp: https://stash.ihme.washington.edu/projects/RF/repos/ensemble/browse/scale_density_simpson.cpp

.. _Kolmogorov--Smirnov statistic: https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test

.. _risk_distributions.py: https://github.com/ihmeuw/risk_distributions/blob/master/src/risk_distributions/risk_distributions.py
.. _formatting.py: https://github.com/ihmeuw/risk_distributions/blob/main/src/risk_distributions/formatting.py

What Base Distributions Are Used in GBD's Ensembles?
----------------------------------------------------

:ref:`Central Comp's R code base <GBD_ensemble_repo_description>` lists 14
distribution families in the file `pdf_families.R`_, and 12 of them are
:ref:`implemented for Vivarium <Vivarium_risk_distributions_repo_description>`
in `risk_distributions.py`_ (all except the Generalized Normal and Generalized
Log-normal):

* Gamma
* Mirrored Gamma
* Inverse Gamma
* Normal
* Generalized Normal (3-parameter)
* Log-normal
* Generalized Log-normal (3-parameter)
* Exponential (1-parameter)
* Weibull
* Inverse Weibull
* Log-logistic
* Gumbel
* Mirrored Gumbel
* Beta (with shift+scale)

Each of the above distribution families has 2 parameters except as otherwise
specified.

.. todo::

  Make a table out of the above list, including the following possible columns:

  * Distribution name + Wikipedia link (or other source)
  * Variable names for the distributions used in the R and Python repos
  * R function + documentation link
  * scipy.stats function + documentation link
  * Number of parameters for the distribution family (1, 2, or 3)
  * Formula for pdf or cdf?
  * How to get distribution parameters from mean and variance (i.e. method of moments)?
  * Tail behavior?
  * Whether min and max are needed in addition to other parameters

  It may be better to make a table with some small number of the above things,
  then add a brief section on each distribution going into more details.

  Also, here are some other things to add somewhere:

    - Explain how the mean and variance will stay the same when we average the
      distributions together because of the Laws of Total Expectation/Variance,
      *unless* the weight for the Exponential distribution is nonzero, which
      will throw the variance off.

    - Add examples of GBD and Vivarium models that use ensemble distributions
      and/or specific distributions from the list. It would be nice to show
      pictures of the ensembles and list the ensemble weights.

    - Add a link to the anemia team's repo with its own implementation of
      ensembles, and any other custom implementations that we find.

    - Add an explanation of how/why the support of the ensemble distribution is
      cut off at the 0.001 and 0.999 quantiles of the lognormal distribution. It
      appears that this is done in `edensity.R`_, but does that code actually
      get used, or does GBD use the version of ``get_edensity`` in
      `eKS_parallel.R`_ instead? This truncation is also implemented in Vivarium
      in `risk_distributions.py`_.

    - Note somewhere that in the R code, ``betasr`` evidently stands for "beta
      with shifted range".

.. note::

  As of May 12, 2021, it appears that three of the above distributions
  (Generalized Normal, Generalized Log-normal, Inverse Weibull) are not
  currently used for ensemble modeling by Central Comp, because they don't get
  added to any of the distribution classes ``classA`` (most distributions),
  ``classB`` (beta distribution), or ``classM`` (mirrored distributions) at the
  end of `pdf_families.R`_, and hence they don't get added to the distribution
  list variable ``dlist`` in `fit.R`_. In previous versions of the code, the
  Generalized Log-normal and Inverse Weibull distributions were put in
  ``classA``, but they have been removed.

Sampling from Ensemble Distributions in Vivarium
------------------------------------------------

Vivarium needs to sample values of the exposure variable :math:`E` from its
estimated ensemble distribution in order to assign an exposure value to each
simulant. This contrasts with the usage of ensemble distributions in GBD, where
a typical use case might be to estimate the prevalence of each exposure category
of :math:`E` by computing areas under its PDF. In particular, computing the PDF
or CDF of :math:`E` is generally sufficient for a GBD team, whereas sampling
values from the ensemble distribution requires an additional algorithm.

Below, we describe two possible strategies for sampling from an ensemble
distribution. The first strategy (:ref:`two-step sampling
<two_step_sampling_of_mixtures>`) requires two random choices for each sampled
value but is easy to implement if we already have a sampling strategy for all
the base distributions. The second strategy (:ref:`inverse transform sampling
<inverse_transform_sampling_of_mixtures>`) uses a single random choice for each
sampled value but requires calculation of the ensemble distribution's quantile
function, which is not straightforward. As noted above, a GBD ensemble
distribution is mathematically defined as a mixture distribution, so it is
sufficient to describe how to sample from mixture distributions.

Sampling from a Mixture Distribution
+++++++++++++++++++++++++++++++++++++

Let :math:`F = \sum_1^k w_i F_i` be the CDF of a mixture distribution with
component CDFs :math:`\{F_i\}_1^k` and weights :math:`\{w_i\}_1^k`. Our goal is
to algorithmically generate a random variable :math:`E` whose CDF is :math:`F`
(i.e. generate a "draw" from the distribution :math:`F`).

.. _two_step_sampling_of_mixtures:

Two-step sampling from mixture distributions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

There is a simple two-step procedure to sample a random variable :math:`E`
distributed according to :math:`F`, assuming that we have a method of sampling
from each of the component distributions :math:`F_i`:

1.  Randomly choose a number :math:`i\in \{1,2,\ldots, k\}`, with the
    probability of :math:`i` being :math:`w_i`.

2.  Independently sample :math:`E` from the distribution :math:`F_i`, where
    :math:`i` is the number chosen in Step 1.

This sampling method is the source of the name "mixture": You can think of a
sequence of independent draws from the mixture distribution :math:`F` as each
coming from one of the component distributions :math:`F_i`, but the draws are
mixed together in a random order, with the proportion of draws from :math:`F_i`
being :math:`w_i` on average. The following theorem shows that this
sampling strategy works.

.. admonition:: Theorem

  **(Two-step mixture sampling)**
  *If* :math:`E` *is sampled using the above two-step procedure, then the
  distribution of* :math:`E` *is the mixture distribution*
  :math:`F = \sum_1^k w_i F_i`.

  **Proof.** Let :math:`Y` be a random variable having the `categorical
  distribution`_ on :math:`\{1,2,\ldots, k\}` with :math:`\Pr(Y=i) = w_i`. Let
  :math:`X_1,X_2,\ldots, X_k` be random variables with distributions
  :math:`F_1,F_2,\ldots F_k`, respectively, and assume that each :math:`X_i` is
  independent of :math:`Y`. Then the above sampling procedure can be formalized
  as the statement

  .. math::

    E = X_1 \cdot \mathbf{1}_{\{Y=1\}} + X_2\cdot \mathbf{1}_{\{Y=2\}}
    + \dotsb + X_k\cdot \mathbf{1}_{\{Y=k\}},

  where :math:`\mathbf{1}_{\{Y=i\}}` is the `indicator function`_ of the event
  :math:`\{Y=i\}` (i.e. for each outcome :math:`\omega`,
  :math:`\mathbf{1}_{\{Y=i\}}(\omega) = 1` if :math:`Y(\omega) = i`, and
  :math:`\mathbf{1}_{\{Y=i\}}(\omega) = 0` otherwise). In particular, we have

  .. math::

    E=X_i \text{ on the event } \{Y=i\}

  because the events :math:`\{Y=i\}` partition the sample space, so exactly one
  of the indicator functions :math:`\mathbf{1}_{\{Y=i\}}` will be nonzero for
  any outcome. Using this observation, plus the independence between :math:`Y`
  and :math:`X_i`, it follows that for any :math:`x\in\mathbb{R}` we have

  .. math::

    \Pr(E\le x)
    = \sum_{i=1}^k \Pr(Y=i \text{ and } E\le x)
    &= \sum_{i=1}^k \Pr(Y=i \text{ and } X_i\le x)\\
    &= \sum_{i=1}^k \Pr(Y=i) \Pr(X_i\le x)\\
    &= \sum_{i=1}^k w_i F_i(x)
    = F(x).

  This shows that the distribution function of :math:`E` is :math:`F`.
  :math:`\blacksquare`

.. _categorical distribution: https://en.wikipedia.org/wiki/Categorical_distribution
.. _indicator function: https://en.wikipedia.org/wiki/Indicator_function

.. _inverse_transform_sampling_of_mixtures:

Inverse transform sampling from mixture distributions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Like any probability distribution, a draw :math:`E` from a mixture distribution
can be generated using `inverse transform sampling`_. That is, sample a
:math:`\mathrm{Uniform}(0,1)` random variable :math:`U`, then compute :math:`E =
Q(U)`, where :math:`Q` is the `quantile function`_ for :math:`E` (also called
the **percent point function** or **inverse CDF** of :math:`E`).

The challenge with this approach is that in general, there is no simple formula
for the quantile function :math:`Q` of the mixture distribution :math:`F =
\sum_1^k w_i F_i`. In particular, even when :math:`F` and :math:`F_i` are
`invertible`_, we have :math:`Q = F^{-1}`, but there is generally no simple way
to write :math:`F^{-1}` in terms of the components' quantile functions
:math:`Q_i = F_i^{-1}`.

However, it is still possible to compute the quantile function directly from the
definition :math:`Q(p) = \min \{x\in \mathbb{R} : F(x) \ge p\}`. Namely, to
compute :math:`Q(p)` for :math:`p\in [0,1]`, we look for the smallest number
:math:`x` such that :math:`F(x)\ge p`. Since :math:`F` is an increasing
function, this optimization problem can be solved efficiently using a `binary
search`_. For an example of this approach coded in Python, see this `blog post
by Andrew Webb`_.

.. _inverse transform sampling: https://en.wikipedia.org/wiki/Inverse_transform_sampling
.. _quantile function: https://en.wikipedia.org/wiki/Quantile_function
.. _invertible: https://en.wikipedia.org/wiki/Inverse_function
.. _binary search: https://en.wikipedia.org/wiki/Binary_search_algorithm
.. _blog post by Andrew Webb: http://www.awebb.info/probability/2017/05/12/quantiles-of-mixture-distributions.html

Propensity-Based Sampling from Ensemble Distributions
+++++++++++++++++++++++++++++++++++++++++++++++++++++

A key design feature of Vivarium is *propensity-based sampling*, in which each
simulant posesses a random "propensity" for an attribute :math:`E` (such as a
risk exposure) that is invariant across scenarios and/or time and/or draws of
model parameters, and the propensity is used to deterministically assign the
value of :math:`E` for the simulant at each time step. This is typically done by
defining the propensities as real numbers that are drawn uniformly from the
interval :math:`[0,1]` and then applying `inverse transform sampling`_ in order
to guarantee that :math:`E` follows a prescribed distribution across the
simulated population. Here we describe two propensity-based approaches to
sampling from an ensemble distribution, based on the two sampling strategies for
mixture distributions deescribed above.

Two-propensity sampling from ensemble distributions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

One-propensity sampling from ensemble distributions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. todo::

  Add discussion of pros and cons of the above sampling approaches, including
  what would happen if we make propensities change over time. Here's a note from
  Abie, based on a conversation with James:

    In future simulations, we might want individual simulants to have risk
    factor exposures that are correlated over time, but not perfectly correlated
    over time. For example, this could be accomplished in a normally distributed
    risk by changing the risk factor propensity by a small amount every
    timestep, in a way that keeps the propensity uniformly distributed between
    zero and one.  The mixture interpretation of the ensemble distribution is
    amenable to a similar sort of imperfectly autocorrelated risk exposure, by
    changing the second propensity while leaving the first fixed.  This might
    result in unexpected features, however, and we will need to proceed with
    caution, if and when the time comes.
