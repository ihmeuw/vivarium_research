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
   :depth: 2

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

What Base Distributions Are Used in GBD's Ensembles?
----------------------------------------------------

Here are links to R code and Python code implementing GBD's ensemble distributions:

* `R code for ensemble distributions <R code_>`_ on Stash, accessible on the
  cluster at :file:`/ihme/code/risk/ensemble/` and maintained by Central Comp

* `Python code for ensemble distributions <Python code_>`_ on GitHub, part of
  `Vivarium Public Health <https://github.com/ihmeuw/vivarium_public_health>`_
  and maintained by the Vivarium Engineering Team

The R code base lists 14 distribution families in the file `pdf_families.R`_,
and 12 of them are implemented for Vivarium in `risk_distributions.py`_ (all
except the Generalized Normal and Generalized Log-normal):

.. _R code: https://stash.ihme.washington.edu/projects/RF/repos/ensemble/browse
.. _Python code: https://github.com/ihmeuw/risk_distributions/
.. _pdf_families.R: https://stash.ihme.washington.edu/projects/RF/repos/ensemble/browse/pdf_families.R
.. _risk_distributions.py: https://github.com/ihmeuw/risk_distributions/blob/master/src/risk_distributions/risk_distributions.py

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

  * Name + Wikipedia link (or other source)
  * R function + documentation link
  * scipy.stats function + documentation link
  * Number of parameters for the distribution family (1, 2, or 3)
  * Formula for pdf or cdf?
  * How to get distribution parameters from mean and variance?

.. note::

  As of April 30, 2021, it appears that three of the above distributions
  (Generalized Normal, Generalized Log-normal, Inverse Weibull) are not
  currently used for ensemble modeling by Central Comp, because they don't get
  added to ``classA``, ``classB``, or ``classM`` at the end of
  `pdf_families.R`_.

Sampling from Ensemble Distributions in Vivarium
------------------------------------------------
