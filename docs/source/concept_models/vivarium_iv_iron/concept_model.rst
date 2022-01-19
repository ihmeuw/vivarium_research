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

.. _2019_concept_model_vivarium_iv_iron:

===========================
Vivarium Intravenous Iron
===========================

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

.. note::

  Gendered terms such as "maternal disorders" and "pregnant/lactating women" are used throughout this document as the existing terminology in the GBD and other literature sources rely on such terms. However, we acknowledge that not all pregnant individuals identify as female and we are working to incorporate more inclusive language such as pregnant indiviudals/parents, chestfeeding, etc. Additionally, our simulation will rely on data specific to male/female sex without consideration of intersex individuals or gender differences, which is a limitation of our analysis.

Anemia, a condition defined by low blood hemoglobin concentration, is a significant cause of morbidity and mortality globally, particularly in low and middle income countries and in sub-Saharan Africa and south Asia. Iron deficiency is a common cause of anemia, although other conditions such as hemoglobinopathies may also contribute to the condition.

Pregnancy is a time of increased iron demands to meet the needs of fetal development. Anemia during pregnancy has several health consequences, including increased risk of adverse health outcomes for mother and child.

Iron supplementation during pregnancy can help meet the increased iron demands during this period and prevent and/or remediate iron deficiency anemia (IDA). However, for those who are severely anemic during pregnancy, intravenous (IV) iron can be a more effective strategy for resolving IDA. Additionally, anemia during the postpartum period also has potential health consequences for mother and child and postpartum IV iron may be beneficial to those who are severely anemic immediately following birth.

.. _iviron2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++

**Objective:** Using the optimistic assumptions for the target product profiles from the Bill and Melinda Gates Foundation, estimate the cost effectiveness of a) IV iron use during pregnancy and b) IV iron use immediately postpartum under the following assumptions:

- Impact measured in terms of a) maternal anemia DALYs averted, and b) infant outcomes and stillbirths
- Assume no large-scale food fortification intervention. Comparator = routine anemia prevention/treatment in pregnancy and postpartum.
- Cost effectiveness estimates specific to all LMICs, disaggregated by region (separate estimates for South Asia and sub-Saharan Africa).

.. _iviron3.0:

3.0 Concept model
+++++++++++++++++

.. image:: concept_model_full.svg

This simulation will be built in a series of subgroups of model components that are summarized below.

.. list-table:: Concept model versions
  :widths: 5 5 20 10
  :header-rows: 1

  * - Model version
    - Color
    - Description
    - Note
  * - I
    - Green
    - Interventions and impacts on maternal morbidity and mortality due to maternal disorders and anemia
    - Women of reproductive age (WRA) population model only
  * - IIa
    - Purple
    - Infant birthweight and its efect on child morbidity and mortality directly as well as through child growth failure and infectious diseases (without the positive feedback loop of infectious diseases on child growth failure)
    - Includes children under five in population model as well as WRA
  * - IIb
    - N/A
    - Fertility component to familially link WRA to children under five.
    - May be swapped in implementation order with model 2a
  * - III
    - Blue
    - Postpartum depression and breastfeeding behaviors
    - 
  * - IV
    - Yellow
    - Non-standard outcomes, including stillbirths and cognition
    - Inclusion of cognition outcome on hold until BMGF trial results are received
  * - V
    - Orange
    - Orphanhood, care-seeking behaviors, and positive feedback loop between infectious diseases and child wasting
    - On hold - not shown in diagram
  * - VIa
    - Red
    - Fertility model that includes birth interval information
    - On hold - not shown in diagram
  * - VIb
    - Red
    - Access to care parameters (antenatal care and in-facility delivery) and correlation with other model components
    - On hold - not shown in diagram

**Model Version I Detail:**

.. image:: concept_model_version_i.svg

.. _iviron3.1:

3.1 Simulation scenarios
------------------------

#. **Baseline:** baseline IFA coverage
#. **Oral iron:** MMS/BEP scale-up
#. **Antenatal IV iron:** MMS/BEP + antenatal IV iron scale-up
#. **Postpartum IV iron:** MMS/BEP + postpartum IV iron scale-up
#. **Antenatal and postpartum IV iron:** MMS/BEP + antenatal and postpartum IV iron scale-up

.. note::

  Scenario comparisons of interest to BMGF will be IV iron scenarios (antenatal IV iron, postpartum IV iron, antenatal + postpartum IV iron) relative to the oral iron scenario. However, all interventions will scale-up from baseline levels of intervention coverage.

.. list-table:: Intervention coverage of eligible individuals by scenario
  :header-rows: 1

  * - Scenario
    - IFA coverage
    - MMS/BEP coverage
    - Antenatal IV iron coverage
    - Postpartum IV iron coverage
  * - Baseline
    - To be defined for locations of interest on the :ref:`maternal supplementation intervention document <maternal_supplementation_intervention>`
    - 0
    - 0
    - 0
  * - Oral iron scale-up
    - 0
    - :math:`T * ANC`
    - 0
    - 0
  * - Antenatal IV iron scale-up
    - 0
    - :math:`T * ANC`
    - :math:`T * ANC`
    - 0
  * - Postpartum IV iron scale-up
    - 0
    - :math:`T * ANC`
    - 0
    - :math:`T * SBA`
  * - Antenatal and postpartum IV iron scale-up
    - 0
    - :math:`T * ANC`
    - :math:`T * ANC`
    - :math:`T * SBA`

Where,

.. list-table:: Intervention coverage parameter definitions
  :header-rows: 1

  * - Parameter
    - Description  
    - Value
    - Note
  * - :math:`T`
    - Target coverage
    - 0.8
    - Subject to change after confirmation with BMGF. Not location-specific.
  * - :math:`ANC`
    - Coverage of single antenatal care visit
    - GBD covariate ID=7, decomp_step='step4', normal distribution of uncertainty
    - Location-specific
  * - :math:`SBA`
    - Skilled birth attendance proportion
    - GBD covariate ID=143, decomp_step='step4', normal distribution of uncertainty
    - Location-specific

.. note::

  The coverage values in the table above are meant to represent the probability that a patient who is *eligible* for the intervention, as determined by the restrictions table on the relevant intervention model document, will receive the intervention.

.. _iviron3.2:

3.2 Simulation timeframe and intervention start dates
-----------------------------------------------------

We will model an *immediate* scale-up of intervention coverage from the baseline level to the target level rather than a gradual scale-up over time.

* **Date of simulation start:** January 1, 2022
* **Date of intervention scale-up:** Janary 1, 2023
* **Date of intervention end:** December 31, 2024
* **Simulation time step:** 1 week

.. note::

  For final simulation results, BMGF is interested in modeling an intervention uptake curve over time. We will model an immediate scale-up throughout model development and plan to incorporate the scale-up following model valiation and prior to the generation of final results.

.. _ivron4.0:

4.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _iviron4.1:

4.1 Vivarium concept model diagram components
----------------------------------------------

4.1.1 Cause Models
~~~~~~~~~~~~~~~~~~

* :ref:`Maternal disorders <2019_cause_maternal_disorders>`
* :ref:`Maternal hemorrhage incidence <2019_cause_maternal_hemorrhage_incidence>`

For model versions II+: 

  * :ref:`Diarrheal diseases <2019_cause_diarrhea>`
  * :ref:`Lower respiratory infections <2019_cause_lower_respiratory_infections>`
  * :ref:`Measles <2019_cause_measles>`
  * Postpartum depression

4.1.2 Joint Cause-Risk Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Hemoglobin, anemia, and iron deficiency model <2019_hemoglobin_anemia_and_iron_deficiency>`

Including, 

  * :ref:`Hemoglobin exposure model <2019_hemoglobin_model>`

  * :ref:`Anemia impairment model <2019_anemia_impairment>`

For model versions II+:

  * Child wasting and protein energy malnutrition (NOTE: static propensity model verions 2-4, :ref:`dynamic transition model for versions 5+ <2020_risk_exposure_wasting_state_exposure>`)

4.1.3 Risk Exposure Models
~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Maternal Body Mass Index <2019_risk_exposure_maternal_bmi>`

.. todo::

  Ali to update this risk exposure to be specific to BMI < 18.5 using the GBD estimates of continuous BMI exposure using modelable entity IDs 2548 and 18706. 

  For now, use covariate ID 1253 (age-specific proportion of women with BMI < 17)

For model versions II+:

  * :ref:`Low Birthweight and Short Gestation (GBD 2019) <2019_risk_exposure_lbwsg>`
  * :ref:`Child Stunting (GBD 2020) <2020_risk_exposure_child_stunting>`
  * :ref:`Suboptimal breastfeeding <2020_risk_suboptimal_breastfeeding>`
  * Orphanhood

4.1.4 Risk Effects Models
~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Hemoglobin/Iron deficiency risk effects <2019_risk_effect_iron_deficiency>` (including impact on maternal disorders as well as maternal hemorrhage incidence)
* :ref:`Maternal hemorrhage risk effects <2019_risk_effect_maternal_hemorrhage>`

For model versions II+:

  * :ref:`Child Wasting Risk Effects <2019_risk_effect_wasting>` (NOTE: consider affected measure for diarrheal diseases for model versions before and after 5/vicious cycle implementation)
  * Child stunting risk effects
  * :ref:`Low Birthweight and Short Gestation Risk Effects (GBD 2019) <2019_risk_effect_lbwsg>`
  * :ref:`Diarrheal Diseases Risk Effects <2019_risk_effect_diarrheal_diseases>`
  * Suboptimal breastfeeding risk effects (note: separate risk exposure and effects model)
  * Postpartum depression risk effects
  * Orphanhood risk effects

4.1.5 Risk-Risk Correlation Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For model versions II+:

  * :ref:`Birthweight and child wasting risk-risk correlation <2019_risk_correlation_birthweight_wasting>`
  * :ref:`Birthweight and child stunting risk-risk correlation <2019_risk_correlation_birthweight_stunting>`
  * :ref:`Maternal BMI and birthweight <2019_risk_correlation_maternal_bmi_birthweight>`

4.1.6 Non-standard Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Pregnancy model <other_models_pregnancy>`

For model versions II+:

  * Stillbirth
  * Infertility
  * Cognition

4.1.7 Intervention Models
~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Maternal supplementation <maternal_supplementation_intervention>`
* :ref:`Antenatal IV iron <intervention_iv_iron_antenatal>`
* :ref:`Postpartum IV iron <intervention_iv_iron_postpartum>`

For model versions II+:

  * :ref:`Acute malnutrition management and treatment <intervention_wasting_treatment>` (NOTE: will need to be updated to locations of interest)
  * Childhood vaccinations

.. _iviron4.2:

4.2 Demographics
----------------

4.2.1 Locations
~~~~~~~~~~~~~~~

Locations of interest to this project: 

- Sub-Saharan Africa (location_type=superregion; location_id=166)
- South Asia (location_type=region; location_id=159)
- All low and middle income countries (LMICs)

  - This simulation location does not have a corresponding GBD location ID. Rather, there are two location IDs that fall within this location of interest and together will make up the overall LMIC location (shown in the bullets below). We will need to calculate weighted average estimates across these two locations (and/or the national-level locations that comprise them) for use in the simulation of the LMIC location.

    - World bank lower middle income (location_type=region; location_id=44577)
    - World bank low income (location_type=region; location_id=44578)

National-level locations included in each of these locations of interest `can be found here <https://github.com/ihmeuw/vivarium_research_iv_iron/tree/main/locations>`_.

Location aggregation
^^^^^^^^^^^^^^^^^^^^^^

For GBD outcomes that do not have estimates available for the locations of interest, we will calculate aggregate weighted average estimates from the national estimates included in the regional locations of interest. Notably, for some parameters, we will want to weight to the size of the population of women of reproductive age and for others we will want to weight to the size of the pregnant population. Generally, the following steps should be followed:

#. Pull estimates specific to each national-level location_id included in the region of interest (can be found in .csv files linked above)
#. Pull estimates of the relevant weighting unit for each national-level location_id included in the region of interest (weighting unit for each parameter is shown in the table below)
#. At the draw-level, caclulate a weighted average estimate across all national locations within the region of interest, like so:

.. math::

  estimate_\text{regional} = \frac{\sum_{n=1}^{n} \text{weighting unit value}_\text{national} * estimate_\text{national}}{\sum_{n=1}^{n} \text{weighting unit value}_\text{national}}

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
     - 159, 166
     - N/A: sum across sub-regional population size values for aggregate value
     - Yes
     - Can sum across location IDs 44577 and 44578 to get population size for the LMIC simulation location
   * - Age-specific fertility rate (ASFR)
     - covariate_id 13
     - 159, 166
     - WRA
     - Yes
     - 
   * - Cause and sequela data
     - c366, c367, s182, s183, s184
     - 159, 166
     - PLW
     - Yes
     - Also available for location IDs 44577 and 44578, but should be weighted from national-level values for the LMIC simulation location
   * - Hemoglobin modelable entity IDs
     - MEIDs 10487 and 10488
     - 159, 166
     - WRA
     - Yes
     - Would be good validation of weighting strategy to perform weighting for location IDs 159 and 166 to compare to GBD estimates for these parameters
   * - BMI modelable entity IDs
     - MEIDs 2548 and 18706
     - 159, 166
     - WRA
     - Yes
     - Not yet incorporated into maternal BMI exposure model
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

.. _iviron4.2.1:

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

**Later model versions:**

Additionally include children under five in the simulation population. Maternal/child pairs should be explcitly linked in this demographic model to allow for direct correlation between maternal and child risks and causes.

.. todo::

  Add more detail 

.. _iviron4.3:

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

.. _iviron4.4:

4.4 Desired outputs
-------------------

For model version II:

#. DALYs (YLLs and YLDs) due to a) maternal disorders, and b) anemia among a) pregnant, b) postpartum, and c) women of reproductive age
#. Severity-specific anemia prevalence during a) pregnancy, and b) the postpartum period
#. Average hemoglobin level among during a) pregnancy, and b) the postpartum period
#. Numbers of intervention regimens administered per a) 100,000 births, and b) 100,000 person years of women of reproductive age

.. _iviron4.5:

4.5 Simulation output table
---------------------------

.. csv-table:: Simulation output table
   :file: output_table.csv
   :header-rows: 1

.. _iviron5.0:

5.0 Back of the envelope calculations
+++++++++++++++++++++++++++++++++++++

.. _iviron6.0:

6.0 Limitations
+++++++++++++++

In addition to the assumptions and limitations listed in each of the pages included in the `4.1 Vivarium concept model diagram components`_ section, our simulation is also subject to the following assumptions and limitations:

#. Our simulation is run at the regional level and does not consider sub-regional heterogeneity.
#. We do not model a distinction between iron-deficiency anemia and other types of anemia. Therefore, we may overestimate the number of individuals whose hemoglobin levels respond to our interventions, which may also vary by modeled location.
#. We do not directly model access to care among our simulated population nor any of its correlates.
#. We do not consider outcomes affected by the intervention other than those that act through maternal hemoglobin and infant birthweight. However, the maternal supplementation intervention may also have impacts on additional outcomes that we do not consider such as maternal malnourishment (including micronutrient deficiencies as well as maternal underweight). This may cause us to overestimate DALYs in our alternative scenarios.

7.0 References
+++++++++++++++

