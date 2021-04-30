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
gamma, logistic, etc. But in general there is no reason to expect real-world
data to match these nicely parameterized, mathematically convenient models.
Thus, in order to model exposure data more accurately, GBD uses an `ensemble
learning
<https://www.toptal.com/machine-learning/ensemble-methods-machine-learning#:~:text=Ensemble%20methods%20are%20techniques%20that,winning%20solutions%20used%20ensemble%20methods.>`_
approach, fitting multiple distributions to the data, and averaging the
distribution functions together to get an overall "ensemble" distribution that
fits the data better than any of its individual components.

What Base Distributions Are Used in GBD's Ensembles?
----------------------------------------------------

Here are links to R code and Python code implementing GBD's ensemble distributions:

* `R code for ensemble distributions on Stash <https://stash.ihme.washington.edu/projects/RF/repos/ensemble/browse>`_,
  accessible on the cluster at :file:`/ihme/code/risk/ensemble/` and maintained
  by Central Comp

* `Python code for ensemble distributions on GitHub <https://github.com/ihmeuw/risk_distributions/>`_,
  part of `Vivarium Public Health <https://github.com/ihmeuw/vivarium_public_health>`_
  and maintained by the Vivarium Engineering Team

There are 14 distribution families listed in the file `pdf_families.R <https://stash.ihme.washington.edu/projects/RF/repos/ensemble/browse/pdf_families.R>`_ in the R code base, and 12 of them are implemented for Vivarium in `risk_distributions.py <https://github.com/ihmeuw/risk_distributions/blob/master/src/risk_distributions/risk_distributions.py>`_:

* Gamma
* Mirrored Gamma
* Inverse Gamma
* Normal
* Generalized Normal (3-parameter, not used)
* Log-normal
* Generalized log-normal (3-parameter, not used)
* Exponential (1-parameter)
* Weibull
* Inverse Weibull (not used)
* Log-logistic
* Gumbel
* Mirrored Gumbel
* Beta (with shift+scale)

Name+Wikipedia link, R function+documentation link, Number of parameters, (formula)


Mathematical Definition of Ensemble Distributions
-------------------------------------------------

Sampling from Ensemble Distributions in Vivarium
------------------------------------------------
