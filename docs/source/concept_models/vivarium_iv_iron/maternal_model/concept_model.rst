.. role:: underline
    :class: underline

..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  +++++++++++++++++++++

  Section Level 2 (#.#)
  ---------------------

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

.. _2019_concept_model_vivarium_iv_iron_maternal_sim:

=======================================================
Vivarium Intravenous Iron - Women of reproductive age
=======================================================

.. contents::
  :local:

.. list-table:: Abbreviations
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - IV
    - Intravenous
    - 
  * - IDA
    - Iron deficiency anemia
    - 
  * - WRA
    - Women of reproductive age
    - 
  * - PLW
    - Pregnant and lactating women
    - 
  * - IFA
    - Iron and folic acid
    - 
  * - MMS
    - Multiple micronutrient supplementation
    - 
  * - BEP
    - Balanced energy protein
    - 
  * - BMGF
    - Bill and Melinda Gates Foundation
    - 
  * - ANC
    - Antenatal care
    - 
  * - IFD
    - In-facility delivery
    - 
  * - LMICs
    - Low and middle income countries
    - 

1.0 Background
++++++++++++++

.. _ivironWRA2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++

.. _ivironWRA3.0:

3.0 Concept model
+++++++++++++++++

.. image:: concept_model_version_i.svg

3.2 Simulation timeframe and intervention start dates
------------------------------------------------------

We will model an *immediate* scale-up of intervention coverage from the baseline level to the target level rather than a gradual scale-up over time.

* Date of simulation start: January 1, 2022

* Date of intervention scale-up: Janary 1, 2023

* Date of intervention end: December 31, 2024

* Simulation time step: 1 week

.. note::

  The BMGF is interested in modeling a scale-up of intervention coverage over time. However, we will plan to model an immediate intervention scale-up throughout model development and validation and implement the scale-up at the end of model development prior to results finalization.

.. _ivironWRA4.0:

4.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _ivironWRA4.1:

4.1 Vivarium concept model diagram components
----------------------------------------------

4.1.1 Cause Models
~~~~~~~~~~~~~~~~~~

* :ref:`Maternal disorders <2019_cause_maternal_disorders>`
* :ref:`Maternal hemorrhage incidence <2019_cause_maternal_hemorrhage_incidence>`
* Postpartum depression

4.1.2 Joint Cause-Risk Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Hemoglobin, anemia, and iron deficiency model <2019_hemoglobin_anemia_and_iron_deficiency>`

Including, 

  * :ref:`Hemoglobin exposure model <2019_hemoglobin_model>`

  * :ref:`Anemia impairment model <2019_anemia_impairment>`

4.1.3 Risk Exposure Models
~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Maternal Body Mass Index conditional on hemoglobin status <2019_risk_exposure_maternal_bmi_hgb>`

* :ref:`Low Birthweight and Short Gestation (GBD 2019) <2019_risk_exposure_lbwsg>`

.. note::

  These risk exposures will be correlated, as discussed in the risk-risk correlation model section.

4.1.4 Risk Effects Models
~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Hemoglobin/Iron deficiency risk effects <2019_risk_effect_iron_deficiency>` (including impact on maternal disorders as well as maternal hemorrhage incidence)
* :ref:`Maternal hemorrhage risk effects <2019_risk_effect_maternal_hemorrhage>`
* Postpartum depression risk effects

4.1.5 Risk-Risk Correlation Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Maternal BMI, maternal hemoglobin, and infant birthweight <2019_risk_correlation_maternal_bmi_hgb_birthweight>`

4.1.6 Non-standard Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Pregnancy model <other_models_pregnancy>`
* Cognition

4.1.7 Intervention Models
~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Maternal supplementation <maternal_supplementation_intervention>`
* :ref:`Antenatal IV iron <intervention_iv_iron_antenatal>`
* :ref:`Postpartum IV iron <intervention_iv_iron_postpartum>`

.. _ivironWRA4.2:

4.2 Demographics
----------------

Location aggregation
~~~~~~~~~~~~~~~~~~~~~

Details on how to calculate weighted averages for specific simulation parameters are shown in the tables below.

.. list-table:: Weighted average calculation instructions
   :header-rows: 1

   * - Parameter
     - Parameter ID
     - Available location IDs
     - Weighting unit
     - Age-specific?
     - Note
   * - Population size
     - N/A (use *get_population*)
     - 159, 166, 44577, 44578
     - N/A
     - Yes
     - 
   * - Age-specific fertility rate (ASFR)
     - covariate_id 13
     - 159, 166 (not available for 44577 or 44578)
     - WRA
     - Yes
     - 
   * - Cause and sequela data
     - c366, c367, s182, s183, s184
     - 159, 166, 44577, 44578
     - PLW
     - Yes
     - 
   * - Hemoglobin modelable entity IDs
     - MEIDs 10487 and 10488
     - 159, 166
     - WRA
     - Yes
     - Not available for location IDs 44577 or 44578. NOTE: Ali may update to custom weighting strategy in a nano-sim.
   * - BMI modelable entity IDs
     - MEIDs 2548 and 18706
     - 159, 166 (not available for 44577 or 44578)
     - WRA
     - Yes
     - Not available for location IDs 44577 or 44578. Parameter not yet incorporated into maternal BMI exposure model
   * - Stillbirth to live birth ratio (SBR)
     - covariate ID 2267
     - None (national only)
     - ASFR :math:`\times` WRA
     - No
     - 
   * - Antenatal care visit attendance (ANC)
     - covariate ID 7
     - None (national only)
     - PLW
     - No
     - 
   * - Skilled birth attendance (SBA)
     - covariate ID 143
     - None (national only)
     - PLW
     - No
     - 
   * - Maternal low BMI exposure
     - covariate ID 1253
     - None (national only)
     - PLW
     - No
     - Current covariate for BMI exposure model, but to be updated to the BMI modelable entity IDs
   * - Anemia impariment
     - REIDs 192, 205, 206, 207
     - 159, 166, 44577 and 44578
     - WRA
     - Yes
     - Parameter used for validation, but not for model building
   * - LBWSG exposure
     - REI ID 339
     - 159, 166 (not available for 44577 or 44578)
     - ASFR :math:`\times` WRA
     - No, but sex-specific
     - Weight each exposure category prevalence separately


Where,

.. list-table:: Parameter values for weighted average calculations
   :header-rows: 1

   * - Parameter
     - Description   
     - Value
     - Note
   * - WRA
     - National population size of women of reproductive age (ages 10 to 54)
     - *get_population*, decomp_step='step4', age_group_id=[7,8,9,10,11,12,13,14,15], sex_id=2
     - Either age-specific or summed across age groups if not age-specific
   * - PLW
     - National number of women who become pregnant within one year   
     - WRA :math:`\times` (ASFR + (ASFR * SBR) + incidence_c996 + incidence_c374)
     - Calculate at the age-specific level and sum the result across age groups if not age-specific
   * - ASFR
     - Age-specific fertility rate   
     - covariate_id=13, decomp_step='step4'
     - Assume normal distribution of uncertainty  
   * - SBR
     - Stillbirth to live birth ratio   
     - covariate_id=1106, decomp_step='step4'
     - Not age-specific; no uncertainty 
   * - incidence_c996
     - Incidence rate of abortion and miscarriage cause   
     - cause_id=996, source=como, decomp_step=’step5’, measure_id=
     - 
   * - incidence_c374
     - Incidence rate of ectopic pregnancy
     - cause_id=374, source=como, decomp_step=’step5’, measure_id=
     - 

.. _ivironWRA4.2.1:

4.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table:: Simulation population parameters
   :header-rows: 1

   * - Parameter
     - Value
     - Note
   * - Population size
     - 100,000
     - per draw (10,000 per random seed/draw combination)
   * - Number of draws
     - 66
     - 
   * - Number of random seeds
     - 10
     - per draw
   * - Cohort type
     - Closed
     - 
   * - Age start
     - 7 years
     - Minimum age at initialization. Chosen by subtracting number of simulation run years from 10 years of age (minimum fertile age in GBD)
   * - Age end
     - 54 years
     - Maximum age at initialization
   * - Exit age
     - 57 years (track through the 56th year until the start of the 57th year)
     - Maximum age of tracking in simulation. Allows capture of potential events for pregnancies that occur at the end of the 54th year, including maximum gestation period and 1 year post-maternal disorder state.
   * - Sex restrictions
     - Female only
     - 

.. todo::

  The GBD defines reproductive age as 10 to 54 years of age. However, many other data sources define reproductive age as 15 to 49 years of age. 

  We should confirm with the BMGF that they would like to model the GBD definition rather than standard definition from other data sources. 

.. note::

  The overall fertility rate among women of reproductive age is 0.055 for South Asia and 0.105 for Sub-Saharan Africa (not including stillbirths). Therefore, approximately these fractions of the total population multiplied by the number of simulation years of WRA will enter the population of interest of PLW in our simulation. 

.. _ivironWRA4.3:

4.3 Models
----------

.. list-table:: Model verification and validation tracking
   :widths: 3 10 20
   :header-rows: 1

   * - Model
     - Description
     - V&V summary
   * - I.0
     - Demography for Sub-Saharan Africa and South Asia
     - `Notebook for validation can be found here <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/model0/model_0_gbd_validation.ipynb>`_. All-cause mortality rates look good. Age fraction looks reasonable, but slightly off for boundary age groups, likely a result of the assumption of uniform distribution of ages within a five year age group -- ok to proceed.

.. _ivironWRA4.4:

4.4 Desired outputs
-------------------

For model version I:

#. DALYs (YLLs and YLDs) due to a) maternal disorders, and b) anemia among a) pregnant, b) postpartum, and c) women of reproductive age
#. Severity-specific anemia prevalence during a) pregnancy, and b) the postpartum period
#. Average hemoglobin level among during a) pregnancy, and b) the postpartum period
#. Numbers of intervention regimens administered per a) 100,000 births, and b) 100,000 person years of women of reproductive age
#. Rates of each pregnancy outcome (live birth, stillbirth, abortion/miscarriage)

.. _ivironWRA4.5:

4.5 Simulation output table
---------------------------

.. csv-table:: Simulation output table
   :file: output_table.csv
   :header-rows: 1

**Outputs needed to inform the children under five simulation:**

The following ouputs should be 

#. Number of live births
#. LBWSG exposure (continuous values for birthweight and gestational age)

  For later model versions:

  * Time-specific maternal vital status and postpartum depression disease state

.. _ivironWRA5.0:

5.0 Back of the envelope calculations
+++++++++++++++++++++++++++++++++++++

.. _ivironWRA6.0:

6.0 Limitations
+++++++++++++++

7.0 References
+++++++++++++++

