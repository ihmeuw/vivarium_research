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

The R code for fitting ensemble distributions can be found on Stash and on the cluster.

* Stash repo: https://stash.ihme.washington.edu/projects/RF/repos/ensemble/browse
* Cluster access: :file:`/ihme/code/risk/ensemble/`

There are 13 distribution families listed in the file `pdf_families.R <https://stash.ihme.washington.edu/projects/RF/repos/ensemble/browse/pdf_families.R>`_ in the above repo, though it appears that GBD currently uses only 11 of them  as base distributions to create ensembles:

Name+Wikipedia link, R function+documentation link, Number of parameters, (formula)

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


Mathematical Definition of Ensemble Distributions
-------------------------------------------------

Sampling from Ensemble Distributions in Vivarium
------------------------------------------------
