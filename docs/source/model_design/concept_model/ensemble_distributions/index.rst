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
   :depth: 1

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

Mathematically, an ensemble distribution in GBD is just a `mixture
distribution`_, which is defined as follows. Suppose :math:`F_1, F_2,\ldots,
F_n` are `cumulative distribution functions <CDF_>`_ (CDFs), called the **base
distributions** of the ensemble or the **components** of the mixture, and
suppose we have a set of non-negative numbers :math:`w_1, w_2,\ldots, w_n`,
called **weights**, such that :math:`\sum_1^n w_i = 1`. Then the **mixture
distribution** with components :math:`\{F_i\}_1^n` and weights
:math:`\{w_i\}_1^n` is the probability distribution on :math:`\mathbb{R}` whose
cumulative distribution function :math:`F` is defined by

.. math::

  F(x) = \sum_{i=1}^n w_i F_i(x)\quad \text{for } x\in \mathbb{R}.

That is, the CDF of the mixture is just a weighted average of the CDFs of the
components, with the weight of :math:`F_i` being :math:`w_i`.

.. _mixture distribution: https://en.wikipedia.org/wiki/Mixture_distribution
.. _CDF: https://en.wikipedia.org/wiki/Cumulative_distribution_function

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
