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

.. _2021_concept_model_vivarium_nutrition_optimization_children:

===================================================
Nutrition Optimization Concept Model: CHILDREN
===================================================

.. contents::
  :local:

1.0 Overview
++++++++++++

This is the concept model document for the CHILD component of the Nutrition Optimization simulation model.
Documents that contain information specific to the overall model and the pregnancy subcomponent can be found here:

- :ref:`Overall nutrition optimization concept model document <2021_concept_model_vivarium_nutrition_optimization>`

- :ref:`Pregnancy subcomponent concept model <2021_concept_model_vivarium_nutrition_optimization_pregnancies>`

.. _nutritionoptimizationchild2.0:

1.1 Modeling aims and objectives
---------------------------------

1.2 Outstanding questions and/or high-level to-dos
-------------------------------------------------------

2.0 Model design
++++++++++++++++

2.1 Concept model diagram
-------------------------

.. image:: nutrition_optimization_child_concept_model.svg

2.2 Submodels
-------------

.. list-table:: Risk exposure subcomponents
  :header-rows: 1

  * - Component
    - Existing version
    - Wave I update
    - Wave II update
    - Note
  * - LBWSG exposure
    - :ref:`2019 docs<2019_risk_exposure_lbwsg>`, implemented in IV iron
    - Artifact rebuild
    - 
    - 
  * - Child wasting exposure
    - :ref:`2020 docs<2020_risk_exposure_wasting_state_exposure>`, implemented in wasting paper
    - Calibration will need to include stunting/underweight mortality effects
    - Transitions for 0-6 months
    - (Does not require separate 2021 update)
  * - Child stunting exposure
    - :ref:`2020 docs<2020_risk_exposure_child_stunting>`, implemented in IV iron, wasting paper
    - Artifact rebuild
    - 
    - (Does not require separate 2021 update)
  * - Child underweight exposure
    - No
    - New :ref:`child underweight exposure model <2020_risk_exposure_child_underweight>`, still in progress
    - 
    - (Does not require separate 2021 update)
  * - Target area
    - No
    - N/A
    - Needs to be created!
    - 
 
.. list-table:: Risk effects subcomponents
  :header-rows: 1

  * - Risk
    - Affected outcome
    - Existing version
    - Wave I update
    - Wave II update
    - Note
  * - LBWSG
    - Mortality
    - :ref:`Docs here<2019_risk_effect_lbwsg>`, implemented in IV iron
    - 
    - Will need PAF calculation for GBD 2021
    - 
  * - LBWSG
    - Wasting
    - Yes, docs part of :ref:`antenatal supplementation intervention CGF effects <maternal_supplementation_intervention>`. Implemented in IV iron
    - Use "static child wasting" effects from birth through initialization into the 6-11 month age group only; then wasting exposure model updates to transition model
    - Update to transition wasting model 0-6m
    - 
  * - LBWSG
    - Stunting
    - Yes, docs part of :ref:`antenatal supplementation intervention CGF effects <maternal_supplementation_intervention>`, implemented in IV iron
    - 
    - 
    - 
  * - CGF (wasting, stunting, and underweight)
    - Infectious disease
    - Only wasting is documented :ref:`found here <2019_risk_effect_wasting>`. Docs need updating
    - Update to 2021 values, add underweight risk effects, add malaria as affected outcome
    - None
    - (Does not require separate 2021 update)
  * - Target area
    - CGF
    - No
    - N/A
    - Needs to be created
    - 

.. list-table:: Intervention subcomponents
  :header-rows: 1

  * - Intervention
    - Existing version
    - Wave I update
    - Wave II update
    - Note
  * - SAM tx
    - :ref:`Docs here <intervention_wasting_treatment>`, implemented in wasting paper
    - :ref:`Updated modeling strategy (combined protocol data) found here <intervention_wasting_tx_combined_protocol>`
    - 
    - 
  * - MAM tx
    - :ref:`Docs here <intervention_wasting_treatment>`, implemented in wasting paper
    - :ref:`Updated modeling strategy (combined protocol data) found here <intervention_wasting_tx_combined_protocol>`
    - 
    - 
  * - SQLNS
    - :ref:`Docs here <lipid_based_nutrient_supplements>`, implemented in wasting paper
    - Need to double check lognormal distribution for effects and change duration of supplementation
    - 
    - 

.. list-table:: Cause subcomponents
  :header-rows: 1

  * - Cause
    - Existing version
    - Wave I update
    - Wave II update
    - Note
  * - Diarrheal diseases
    - :ref:`Docs here <2019_cause_diarrhea>`, implemented in IV iron
    -  
    - 
    - 
  * - Measles
    - :ref:`Docs here <2019_cause_measles>`, implemented in IV iron
    - 
    - 
    - 
  * - Lower respiratory infections (LRI)
    - :ref:`Docs here <2019_cause_lower_respiratory_infections>`, implemented in IV iron
    - 
    - 
    - 
  * - Malaria
    - No existing version
    - :ref:`Docs here <2021_cause_malaria>`, was not included in IV iron
    - 
    - 
  * - Protein energy malnutrition (PEM)
    - :ref:`Old docs here <2020_risk_exposure_wasting_state_exposure>`, implemented in IV iron and CIFF
    - :ref:`New docs here <2021_pem>`. TODO: list whether or not there are updates other than breaking up docs pages
    - 
    - 
  * - Background morbidity
    - :ref:`Docs here <other_causes_ylds>`, but has not yet been implemented
    - 
    - 
    - Bonus model, not a high priority

2.2.1 Task tracking for each wave
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

`A list of outstanding tasks for the child model (separated into wave I and wave II) can be found in this excel file in the "outstanding tasks" tab <https://uwnetid.sharepoint.com/:x:/r/sites/ihme_simulation_science_team/_layouts/15/Doc.aspx?sourcedoc=%7BB63E43A6-D0A8-482E-9AE2-5F8653F72818%7D&file=20230615_MNCH_Nutrition%20Optimization%20Timeline.xlsx&action=default&mobileredirect=true>`_

2.3 Default specifications
--------------------------

.. list-table::
  :header-rows: 1

  * - Parameter
    - Value
    - Note
  * - Location(s)
    - Ethiopia (ID: 179)
    - Eventually will also add Nigeria (214) and Pakistan (164)
  * - Number of draws
    - Same as pregnancy sim output data
    - 
  * - Population size per draw
    - Same as pregnancy sim output data
    - 
  * - Cohort type
    - Closed
    - 
  * - Sex
    - Male and female
    - 
  * - Age start (initialization)
    - 0
    -
  * - Age start (observation)
    - 0
    - 
  * - Age end (initialization)
    - 0
    - All simulants initialized at birth
  * - Exit age (observation)
    - 5
    - years
  * - Simulation start date
    - 2025-01-01
    - All simulants enter simulation at the same time
  * - Simulation observation start date
    - 2025-01-01
    - 
  * - Simulation end date
    - 2029-12-31
    - 
  * - Timestep
    - 4 days
    - May eventually update to variable or 28 days with YLL/YLD-only modeling strategy (likely not for wave I)
  * - Randomness key columns
    - ['entrance_time', 'maternal_id']
    - Entrance time should be identical for all simulants despite simulants having different birth dates/times from the pregnancy simulation

.. _nutritionoptimizationchild4.0:

2.4 Simulation scenarios
------------------------

As of June, 2023, there are a total of 5 scenarios in the pregnancy simulation, :ref:`which can be found here <nutritionoptimizationpreg4.0>`. With the exception of the baseline scenario, all of the following child scenarios should be run on the outputs for each pregnancy scenario.

Wave I:

- 1 location

- Baseline scenario as well as scenarios 0 through 8

- Total number of scenarios = (5 pregnancy :math:`\times` 9 child :math:`+` 1 baseline) :math:`\times` 1 location :math:`=` **46 scenarios** 

Wave II:

- 3 locations

- Baseline scenario as well as scenarios 0 through 18

- Total number of scenarios = (5 pregnancy :math:`\times` 19 child :math:`+` 1 baseline) :math:`\times` 3 locations :math:`=` **288 scenarios** 

- It is possible we decide to exclude scenarios 13-18 from wave II, reducing the number of child scenarios from 19 to 13 and the total number of scenarios to 66/location for **198 scenarios**

.. list-table:: Child scenarios, implemented for each pregnancy scenario
  :header-rows: 1

  * - Pregnancy scenario
    - Child scenario
    - SAM tx coverage
    - MAM tx coverage
    - SQ-LNS coverage
  * - 0
    - Baseline
    - baseline
    - baseline
    - baseline (0)
  * - All
    - 0: Zero coverage
    - 0
    - 0
    - 0
  * - All
    - 1: SAM tx
    - 1
    - 0
    - 0
  * - All
    - 2: MAM tx
    - 0
    - 1
    - 0
  * - All
    - 3: SQ-LNS
    - 0
    - 0
    - 1
  * - All
    - 5: SAM and MAM
    - 1
    - 1
    - 0
  * - All
    - 6: SAM and SQLNS
    - 1
    - 0
    - 1
  * - All
    - 7: MAM and SQLNS
    - 0
    - 1
    - 1
  * - All
    - 8: All
    - 1
    - 1
    - 1
  * - All
    - 9: targeted SQLNS
    - 0
    - 0
    - 1 for target group; 0 for others
  * - All
    - 10: targeted SQLNS and SAM
    - 1
    - 0
    - 1 for target group; 0 for others
  * - All
    - 11: targeted SQLNS and MAM
    - 0
    - 1
    - 1 for target group; 0 for others
  * - All
    - 12: targeted SQLNS and SAM and MAM
    - 1
    - 1
    - 1 for target group; 0 for others
  * - All
    - 13: targeted MAM
    - 0
    - 1 for target group; 0 for others
    - 0
  * - All
    - 14: SAM and targeted MAM
    - 1
    - 1 for target group; 0 for others
    - 0
  * - All
    - 15: SQLNS and targeted MAM
    - 0
    - 1 for target group; 0 for others
    - 1
  * - All
    - 16: SQLNS and SAM and targeted MAM
    - 1
    - 1 for target group; 0 for others
    - 1
  * - All
    - 17: targeted MAM and targeted SQLNS
    - 0 
    - 1 for target group; 0 for others
    - 1 for target group; 0 for others
  * - All
    - 18: SAM plus targeted MAM and targeted SQLNS
    - 1
    - 1 for target group; 0 for others
    - 1 for target group; 0 for others

Where:

- **0** is zero coverage

- **baseline** is baseline coverage

- **1** is 100% coverage 

.. todo::

    Link relevant parameters for coverage (C_SAM, C_MAM, E_SAM, E_MAM, SQ-LNS cov)

2.5 Outputs
------------

The outputs for this simulation will be highly variable by model version. This is because the production runs will have as few outputs and stratifications as possible to maximize efficiency and minimize computational resource requirements across the many modeled scenarios. However, different outputs and additional stratifications will be needed throughout model development for verification and validation. 

All possible observers and their default stratifications are outlined below. Requested outputs and stratification for each model run will be detailed in the model run request table. 

.. list-table:: Requested Count Data Outputs and Stratifications
  :header-rows: 1

  * - Output
    - Note
  * - Stunting state person time
    - 
  * - Wasting transition counts
    - 
  * - Wasting state person time
    - 
  * - Underweight state person time
    - 
  * - Deaths and YLLs (cause-specific)
    - 
  * - YLDs (cause-specific)
    - 
  * - Cause state person time
    - 
  * - Cause state transition counts
    - 
  * - Mortality hazard first moment
    - Each simulant’s all-cause mortality hazard multiplied by the person-time spent with that mortality hazard for each observed stratum. This observer is an attempt to measure the expected differences in mortality between scenarios without the influence of stochastic uncertainty, which will enable us to run the simulation with smaller population sizes.

2.6 Computational resource scoping
------------------------------------

Since this project requires running across many more scenarios than typical vivarium simulations, we ran some back-of-the-envelope calculations on the magnitude of computing resources to run all scenarios across all projects. The following assumptions went into these calculations:

- 46 scenarios in wave I (no targeting of SQLNS or MAM tx and 1 location) and 288 scenraios in wave II (including targeting of SQLNS and MAM treatment as well AND 3 locations)
- 4 day timestep in the child simulation if no "timestep inrease strategy" (such as variable timesteps or YLD/YLL-only modeling strategy) is implemented and 28 day timestep if we do implement one of these strategies
- Simulation takes 32 seconds per timestep. This assumption was informed by the "emulator test runs" of the wasting paper simulation that output only the necessary measures with no stratifications by year, age, or sex
- Assume 15,000 threads available on all.q

Under these assumptions, a full run of wave I will take 3.8 cluster-hours with 4-day timesteps and 0.6 cluster-hours with 28-day timesteps. A full run of wave II will take 23.5 cluster-hours with 4-day timesteps and 3.5 cluster-hours with 28-day timesteps.

:download:`Calculations of these estimated resource requirements can be found in this excel file <timestep scaling.xlsx>`

Notably, the run time of this simulation may increase as we add complexity to our model, particularly with respect to the additional risk factor of child underweight exposure and the additional cause model of malaria, which were not present in our test runs.


.. _nutritionoptimizationchild3.0:

3.0 Models
++++++++++

Wave I
------

.. note::

  Model sequences were designed with the following in mind: https://blog.crisp.se/2016/01/25/henrikkniberg/making-sense-of-mvp

.. list-table:: Model run requests
  :header-rows: 1

  * - Run
    - Description
    - Pregnancy scenario(s)
    - Child scenario(s)
    - Spec. mods
    - Note
  * - 1.0
    - Replication of IV iron child model fit to nutrition optimization pregnancy model input data
    - Baseline
    - Baseline
    - 
    - Should include antenatal supplementation intervention effects
  * - 2.0
    - Include CIFF/wasting paper implementation of the wasting transition model for children 6-59 months
    - Baseline
    - Baseline
    - 
    - This will implicitly include a model of wasting treatment
  * - 3.0
    - Add malaria cause model
    - Baseline
    - Baseline
    - 
    - 
  * - 4.0 
    - Add underweight risk exposure model
    - Baseline
    - Baseline
    - 
    - 
  * - 5.0
    - Update CGF risk effects
    - Baseline
    - Baseline
    - 
    - 
  * - 6.0
    - Wasting risk exposure model update
    - Baseline
    - Baseline
    - 
    - 
  * - 7.0
    - SQLNS intervention updates
    - Baseline, 0
    - Baseline, 0, 3
    - 
    - 
  * - 8.0
    - Production test runs
    - Baseline, 0, 2
    - Baseline, 0, 3, 8
    - 
    - 
  * - 8.1
    - Production runs
    - All
    - All
    - 
    - 

.. list-table:: Output specifications
  :header-rows: 1
  :widths: 1 10 3

  * - Model
    - Outputs
    - Overall strata
  * - 1.0
    - 1. Deaths and YLLs (cause-specific)
      2. YLDs (cause-specific)
      3. Cause state person time
      4. Cause state transition counts
      5. Stunting state person time, stratified by antenatal intervention coverage
      6. Wasting state person time, stratified by antenatal intervention coverage
    - * Age group
      * Sex
  * - 2.0
    - 1. Deaths and YLLs (cause-specific)
      2. YLDs (cause-specific)
      3. Cause state person time
      4. Cause state transition counts
      5. Stunting state person time, stratified by antenatal intervention coverage
      6. Wasting state person time, stratified by antenatal intervention coverage
      7. Wasting transition counts, stratified by wasting treatement coverage
    - * Age group
      * Sex
  * - 3.0
    - 1. Deaths and YLLs (cause-specific)
      2. YLDs (cause-specific)
      3. Cause state person time
      4. Cause state transition counts
    - * Age group
      * Sex
  * - 4.0 
    - 1. Deaths 
      2. Stunting state person time
      3. Wasting state person time
      4. Wasting transition counts
      5. Underweight state person time
    - * Age group
      * Sex
  * - 5.0
    - 1. Deaths and YLLs (cause-specific) stratified by wasting
      2. Cause state person time, stratified by wasting
      3. Cause state transition counts, stratified by wasting
      4. Stunting state person time
      5. Wasting state person time
      6. Underweight state person time
    - * Age group
      * Sex
  * - 6.0
    - 1. Deaths, stratified by wasting exposure state
      2. Wasting state person time, stratified by wasting treatment coverage
      3. Wasting transition rates, stratified by wasting treatment coverage
      4. Stunting state person time
      5. Underweight state person time
    - * Age group
      * Sex
  * - 7.0 
    - 1. Deaths
      2. Wasting state person time
      3. Stunting state person time
      4. Underweight state person time
      5. Wasting transition counts
    - * Age group
      * Sex
  * - 8.0
    - 1. Deaths and YLLs (cause-specific)
      2. YLDs (cause-specific)
      3. Count of incident SAM cases
      4. Count of incident MAM cases
      5. Stunting state person-time stratified by SQ-LNS utilization
      6. Mortality hazard first moment
    - * Random seed
  * - 8.1
    - 1. Deaths and YLLs (**NOT**) cause-specific)
      2. YLDs (**NOT** cause-specific)
      3. Count of incident SAM cases
      4. Count of incident MAM cases
      5. Stunting state person-time stratified by SQ-LNS utilization
      6. Mortality hazard first moment (?)
    - None

.. list-table:: Verification and validation tracking
  :header-rows: 1
  :widths: 1 5 5 

  * - Model
    - V&V plan
    - V&V summary
  * - 1.0
    - * Verify to GBD cause YLDs and YLLs and risk exposures
      * Verify antenatal intervention effects on wasting and stunting exposures
    - 
  * - 2.0
    - * Verify wasting risk exposure
      * Verify baseline wasting treatment coverage
      * Verify that antenatal intervention effects remain for stunting
      * Verify that wasting intervention effects remain for wasting among <6 months, and taper off for >6 months
    - 
  * - 3.0
    - * Verify that malaria YLDs and YLLs match expected values
    - 
  * - 4.0
    - In simulation outputs:

      * Verify risk exposure for all CGF measures

      In interactive sim:

      * Verify conditional risk exposures
    -  
  * - 5.0
    - In simulation outputs:
      
      * Cause-specific incidence rates and EMRs stratified by wasting should match expected joint CGF RR values by wasting state
      * Note that wasting exposure (and therefore underweight exposure and cause-specific data) may not meet verification criteria for this model version until updates in model 6.0 are implemented

      In interactive sim:

      * Verify wasting, stunting, and underweight risk effects for incidence and mortality
    - 
  * - 6.0
    - * Verify updated wasting recovery parameters
      * Verify CGF risk exposures
      * Verify cause-specific parameters
    -
  * - 7.0 
    - Between scenario 0 and 3:
      * Verify SQ-LNS utilization ends at 6 months
      * Verify SQ-LNS prevalence ratios
      Baseline YLDs and YLLs should still verify
    - 
  * - 8.0
    - * Verify that intervention coverage is as expected in each scenario
      * Final check on baseline deaths, YLLs, YLDs
      * Check population size stability
    - 

.. list-table:: Outstanding V&V issues
  :header-rows: 1

  * - Issue
    - Explanation
    - Action plan
    - Timeline
  * - 
    - 
    - 
    - 

