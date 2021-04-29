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
distributions. Occasionally, the exposure data may closely follow a standard
probability distribution, such as normal, lognormal, Weibull, gamma, logistic,
etc., but in general there is no reason to expect real-world data to match these
nicely parameterized, mathematically convenient models. Thus, in order to
accurately model exposure data, GBD uses an ensemble learning approach, fitting
multiple distributions to the data, and averaging them together to get an
overall "ensemble" distribution that fits the data better than any of its
individual components.

In order to

"Ensemble distribution" is a term used by GBD for a probability distribution that is a weighted average of several component distributions.
GBD uses
GBD models the exposure distributions of several risk factors using "ensemble distributions." An en

Mathematical Definition of Ensemble Distributions
-------------------------------------------------

Sampling from Ensemble Distributions in Vivarium
------------------------------------------------
