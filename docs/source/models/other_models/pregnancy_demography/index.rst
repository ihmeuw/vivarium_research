.. _other_models_pregnancy_demography:

..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  ---------------------

  Section Level 2 (#.#)
  +++++++++++++++++++++

  Section Level 3 (#.#.#)
  ~~~~~~~~~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

=============================================
Demography for a closed cohort of pregnancies
=============================================

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - ASFR
    - Age-specific fertility rate
    - 
  * - SBR
    - Stillbirth to live birth ratio
    - 
  * - LBWSG
    - Low birthweight and short gestation
    - 
  * - WRA
    - Women of reproductive age
    - 
  * - PLW 
    - Pregnant and lactating women
    - 

Overview
-------------

This document is intended to represent the demography model for a simulation of a closed cohort of pregnancies. This population structure differs from the typical default Vivarium population structure delineated by age, sex, location, and year only. The closed cohort of pregnancies model for use in the :ref:`Nutrition optimization pregnancy model <2021_concept_model_vivarium_nutrition_optimization>` will initialize a population that consists of pregnant female simulants only rather than initializing a population of women of reproductive age generally and tracking their pregnancy status over time. Because of this, we must implement a custom age structure of the initialized population to be representative of the pregnant population in any location and year.

GBD Modeling Strategy
----------------------

Pregnancy and births are not explicit outcomes in the GBD study. However, there are location- and year-specfic GBD covariates related to fertility and births. A more thorough overview can be found on the :ref:`pregnancy model document <other_models_pregnancy>`

Vivarium Modeling Strategy
----------------------------

While the default population structure of Vivarium simulations is determined according to the age/sex/location/year-specific GBD population count estimates, this custom demography model will be determined instead by the product of the age/sex/location/year-specific GBD population count estimates multiplied by the pregnancy incidence rate for that demographic group.

Relevant parameters are defined below:

.. list-table:: Parameters
  :header-rows: 1

  * - Parameter
    - Value
    - Note
  * - population for use in Vivarium initialization
    - gbd_population * pregnancy_incidence
    - 
  * - pregnancy_incidence
    - ASFR + ASFR * SBR + incidence_c995 + incidence_c374
    - 

.. list-table:: Data values
  :header-rows: 1

  * - Parameter
    - Data type  
    - Data ID
    - Source
    - Note
  * - gbd_population
    - population estimate
    - N/A
    - get_population: decomp_step='iterative'
    - 
  * - ASFR
    - Covariate
    - 13
    - get_covariate_estimates: decomp_step='iterative'
    - Assume lognormal distribution of uncertainty  
  * - SBR
    - Covariate
    - 2267
    - get_covariate_estimates: decomp_step=iterative'
    - Parameter is not age specific and has no draw-level uncertainty. Use mean_value as location-specific point parameter.
  * - incidence_c995
    - Incidence rate of abortion and miscarriage cause
    - c995
    - como; decomp_step='step5'
    - Use the :ref:`total population incidence rate <total population incidence rate>` directly from GBD and do not rescale this parameter to susceptible-population incidence rate using condition prevalence. 
  * - incidence_c374
    - Incidence rate of ectopic pregnancy
    - c374
    - como; decomp_step='step5'
    - Use the :ref:`total population incidence rate <total population incidence rate>` directly from GBD and do not rescale this parameter to susceptible-population incidence rate using condition prevalence.
.. note::

  **AGE SHIFTING:** The incidence rates in the table above are measured at the *end* of pregnancy. However, we will use them to inform the rates of the *beginning* of pregnancy. This will cause us to initialize a population that is older than it should be by the average duration of pregnancy in the given population. This had a minimal influence in the IV iron simulation, so it was regarded as an acceptable model limitation. However, if this is thought to cause model validation issues, we may revist this strategy and implement an age-shifting adjustment.
  
.. list-table:: Restrictions
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     - False
     -
   * - Female only
     - True
     -
   * - Age group start
     - 10 to 14 years
     - ID=7
   * - Age group end
     - 50 to 54 years
     - ID=15

