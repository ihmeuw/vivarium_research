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

.. _vivarium_model_components:

================================================
Types of Vivarium model components
================================================

The purpose of this page is to describe the general types of model components that comprise Vivarium models. 

.. toctree::
   :maxdepth: 1
   :glob:

   causes/index
   GBD_disease_health/index
   impairments/index
   interventions/index
   intervention_features/index
   risk_factors/index

Sub-components of risk factors can be found here:

  .. toctree::
     :maxdepth: 1
     :glob:

     risk_factors/risk_exposure/index
     risk_factors/risk_attributable_causes/index
     risk_factors/risk_correlation/index
     risk_factors/risk_effects/index
     risk_factors/risk_mediation/index
     risk_factors/population_attributable_fraction/index
     risk_factors/residual_confounding/index