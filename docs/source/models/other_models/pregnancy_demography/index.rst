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

This document is intended to represent the demography model for a simulation of a closed cohort of (most; see note below) pregnancies. This population structure differs from the typical default Vivarium population structure delineated by age, sex, location, and year only (roughly speaking, it differs in that it excludes all non-pregnant people). The closed cohort of pregnancies model for use in the :ref:`Nutrition optimization pregnancy model <2021_concept_model_vivarium_nutrition_optimization>` will initialize a population that consists of female simulants who are all at the beginning of a pregnancy. Because of this, we must implement a custom age structure of the initialized population to be representative of the relevant subpopulation in any location and year.

.. note::

  The actual *beginning* of a pregnancy (conception) is difficult to observe, and most people aren't aware it has happened right away.
  This means that while in theory a cohort of "all" pregnancies would start with every conception event (in a given time period/year),
  we (a) don't have a very precise estimate of how many that is and (b) all our data *about* the pregnancies will also be conditional on
  some later requirement (e.g. the pregnancy reaching X weeks of gestation, or something).

  The actual cohort we simulate here is of all pregnancies with a "medically-relevant outcome," which we define as a live birth,
  stillbirth, or other pregnancy outcome requiring medical care.
  As described below, this cohort can be constructed from GBD estimates of live births and stillbirths combined with GBD incidence estimates
  for abortion and miscarriage (miscarriages included are only those that require medical care, and abortions need medical care by definition)
  and ectopic pregnancy (ectopic pregnancies need medical care by definition).
  This is a bit confusing to think about because it is an example of "fortune-telling" -- inclusion in our cohort at the *beginning* of pregnancy depends on what happens at the *end*.
  We may write more about this general kind of thing in the future (as it is very common in the MNCNH simulation)
  but in this specific case, we know it is fine to fortune-tell because we don't have any interventions that
  causally impact whether pregnancies have a medically-relevant outcome.

GBD Modeling Strategy
----------------------

Pregnancy and births are not explicit outcomes in the GBD study. However, there are location- and year-specfic GBD covariates related to fertility and births. A more thorough overview can be found on the :ref:`pregnancy model document <other_models_pregnancy>`

Vivarium Modeling Strategy
----------------------------

.. todo::

  We should clarify here exactly what pregnancies are included and excluded in this demography.
  Not every person who becomes pregnant gets included in this cohort, for example chemical pregnancies
  that are undetected.
  Also, pregnancies that *are* detected but miscarry without medical complications or need for medical care
  are excluded, so it isn't quite right even to say that this is a cohort of all detected pregnancies.

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
    - For GBD 2021: Covariate.
      For GBD 2023: Flat-file estimate not in covariate database.
    - For GBD 2021: 2267.
    - For GBD 2021: get_covariate_estimates: decomp_step='iterative'
      For GBD 2023, flat file can be accessed at ``/snfs1/Project/simulation_science/mnch_grant/MNCNH\ portfolio/stillbirth_livebirth_ratio_24wks.csv``, copied from ``/mnt/team/mortality/pub/covariates/run_versions/2025-10-16-11-03/stillbirth_livebirth_ratio_24wks.csv`` where the GBD modelers made it available to us.
    - Parameter is not age-specific.
      Use a truncated normal distribution of uncertainty replicating the 95% UI from the database, truncated at 0 only.
      Note that in GBD 2021 this parameter had no uncertainty (the mean, lower bound, and upper bound were all the same).
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

