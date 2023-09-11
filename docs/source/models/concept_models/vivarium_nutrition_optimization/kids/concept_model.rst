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

**Outstanding questions/to-dos:**

- Determine how to handle the :ref:`wasting treatment propensity strategy as described here <WastingPropensityNote>` for the baseline scenario 

  - In short, the optimization protocol generally assumes that all interventions have the same propensity, although the child wasting treatment modeling strategy has a randomly generated propensity value upon each wasting transition. 

  - Note that this should only affect the baseline scenario as it is the only scenario in which wasting treatment coverage values will not equal zero or one.

**Notes/reminders:**

- We have chosen to exclude the "vicious cycle" feedback model from diarrheal diseases to child wasting in this simulation for the following reasons:

  - Inclusion of this effect would require "backing out" the direct effect of SQ-LNS on wasting exposure from the total effect of SQ-LNS on wasting exposure as mediated through the feedback cycle with diarrheal diseases as to not "double count" any effects of SQ-LNS on child wasting exposure.

  - This simulation model does not include any interventions that directly reduce diarrheal disease incidence rates, so it is not a pathway by which interventions primarily affect intervention outcomes.

  - The impact of child wasting on diarrheal diseases *incidence* is relatively small in magnitude (the majority of the effect applies to diarrheal diseases *mortality*). Therefore, the effect of feedback loop between *incidence* of wasting and *incidence* of diarrhea is expected to be modest.

- We have chosen to exclude the x-factor model of heterogeneity in wasting incidence rates calibrated to wasting treatment relapse data from this simulation for the following reasons:

  - This model made little difference in population-level intervention impact estimates when included in the CIFF project.

  - This model requires robust external calibration.

  - We are not considering any interventions that are directly targeted to the "x-factor." Instead, we will target interventions to a separate "target area" risk factor that will incorporate heterogeneity in wasting incidence rates. 

2.0 Model design
++++++++++++++++

2.1 Concept model diagram
-------------------------

.. image:: nutrition_optimization_child_concept_model.svg

2.2 Waves, GBD Rounds, and age groups
-------------------------------------

We will separate the implementation of the child model into two waves of updates. 
In addition to other differences detailed in the next section:

- Wave I will use GBD 2019 data, with the exception of using GBD 2021 data for child growth failure risk exposure and risk effects.

- Wave II will use GBD 2021 data for the entire model.

Notably, GBD 2021 uses different age groups than GBD 2019 (as summarized in the 
tables below). Therefore, the Wave I implementation that uses data from both GBD 
2019 and 2021 will require a hybrid approach that was used in the CIFF and wasting 
paper simulations. In this hybrid approach, the simulation uses GBD 2021 age groups 
for the entire simulation, but informs rates for these age groups from pooled 2019 
age groups for parameters other than child growth failure risk exposures and 
effects. For instance, cause model data for the 1-5 month and 6-11 month age groups 
in the simulation will be informed using data specific to the post neonatal age group from 2019.

.. list-table:: GBD 2019 age groups
  :header-rows: 1

  * - Age group
    - Age range
    - Age group ID
  * - early_neonatal
    - 0-6 days
    - 2
  * - late_neonatal
    - 7-28 days
    - 3
  * - post_neonatal
    - 28 days to 1 year
    - 4
  * - 1_to_4_years
    - 1 to 4 years
    - 5

.. list-table:: GBD 2021 age groups
  :header-rows: 1

  * - Age group
    - Age range
    - Age group ID
  * - early_neonatal
    - 0-6 days
    - 2
  * - late_neonatal
    - 7-28 days
    - 3
  * - 1-5_months
    - 1-5 months
    - 388
  * - 6-11_months
    - 6-11 months
    - 389
  * - 12_to_23_months
    - 12-23 months
    - 238
  * - 2_to_4_years
    - 2-4 years
    - 34


2.3 Submodels
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
    - :ref:`Updated docs for children 6-59 months <2021_risk_exposure_wasting_state_exposure>` (use transitions rate values linked in .csv file) use :ref:`static wasting exposure <2020_risk_exposure_static_wasting>` for children 0-6 months of age (as implemented in IV iron)
    - Include transitions for 0-6 months
    - (Does not require separate 2021 update)
  * - Child stunting exposure
    - :ref:`2020 docs<2020_risk_exposure_child_stunting>`, implemented in IV iron, wasting paper
    - Artifact rebuild
    - 
    - (Does not require separate 2021 update)
  * - Child underweight exposure
    - No
    - New :ref:`child underweight exposure model <2020_risk_exposure_child_underweight>`
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
    - Updated to 2021 values, added underweight risk effects, added malaria as affected outcome. :ref:`Updated version of CGF risk effects <2021_risk_effect_cgf>`
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
    - :ref:`Updated modeling strategy (combined protocol data) found here <intervention_wasting_tx_combined_protocol>`. Use draw-level E_SAM and C_SAM parameters linked on this page.
    - 
    - 
  * - MAM tx
    - :ref:`Docs here <intervention_wasting_treatment>`, implemented in wasting paper
    - :ref:`Updated modeling strategy (combined protocol data) found here <intervention_wasting_tx_combined_protocol>`. Use draw-level E_MAM and C_MAM parameters linked on this page.
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
    - See note below
  * - Measles
    - :ref:`Docs here <2019_cause_measles>`, implemented in IV iron
    - 
    - 
    - 
  * - Lower respiratory infections (LRI)
    - :ref:`Docs here <2019_cause_lower_respiratory_infections>`, implemented in IV iron
    - 
    - 
    - See note below
  * - Malaria
    - No existing version
    - :ref:`Docs here <2021_cause_malaria>`, was not included in IV iron
    - 
    - See note below
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

.. note::

  For the diarrheal diseases, lower respiratory infections, and malaria cause models, we intend to set the age start parameter for each cause model to 28 days (the end of the late neonatal age group). We achieve this by applying the following conditions for each of these models:

  - Birth prevalence equal to the post neonatal (ID=4, 28 days to 1 year) age group for GBD 2019 and the 1-5 month age group (ID=388, 28 days to 6 months) for GBD 2021
  - Set CSMR, disability weight, incidence rate, and remission rate to zero for the early neonatal (ID=2, 0-6 days) and late neonatal (ID=3, 7-28 days) age groups

  This strategy allows us to increase our simulation timestep by removing the need to model very high excess mortality rates due to these causes in the neonatal age groups (:ref:`see an explanation here <vivarium_best_practices_time_steps>`), but while still including mortality due to these causes in the background mortality (deaths due to "other causes") component in our model. 

  Notably, CGF risks do not affect these causes during the neonatal period and we are able to model the effect of the LBWSG risk factor on diarrheal diseases and LRI by including them as "affected unmodeled causes" in the risk effects modeling strategy. 

  Also note that the measles cause model age start value in GBD is the postneonatal (GBD 2019)/6-11 month (GBD 2021) age gorups, so these changes are not necessary to apply to the measles cause model.

2.3.1 Task tracking for each wave
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

`A list of outstanding tasks for the child model (separated into wave I and wave II) can be found in this excel file in the "outstanding tasks" tab <https://uwnetid.sharepoint.com/:x:/r/sites/ihme_simulation_science_team/_layouts/15/Doc.aspx?sourcedoc=%7BB63E43A6-D0A8-482E-9AE2-5F8653F72818%7D&file=20230615_MNCH_Nutrition%20Optimization%20Timeline.xlsx&action=default&mobileredirect=true>`_

2.4 Default specifications
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

2.5 Simulation scenarios
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

Baseline values for :ref:`wasting treatment <intervention_wasting_tx_combined_protocol>` (:math:`C_\text{SAM}`, :math:`E_\text{SAM}`, :math:`C_\text{MAM}`, and :math:`E_\text{MAM}` parameters) and :ref:`SQ-LNS <lipid_based_nutrient_supplements>` interventions can be found on the respective intervention model documents.

.. note::

  :math:`E_\text{SAM}` and :math:`E_\text{MAM}` parameter values will **not** vary by scenario in this model.

2.6 Outputs
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

2.7 Computational resource scoping
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
    - All
    - Baseline
    - 
    - Should include antenatal supplementation intervention and maternal anemia/BMI exposure effects on birth weight
  * - 1.1
    - Replication of IV iron child model fit to nutrition optimization pregnancy model input data
    - All
    - Baseline
    - 
    - Include new intervention impacts on gestational age 
  * - 2.0
    - Include CIFF/wasting paper implementation of the wasting transition model for children 6-59 months
    - All
    - Baseline
    - 
    - This will implicitly include the model of wasting treatment (as implemented in the wasting paper; updates to this model to come later)
  * - 2.0.1
    - CGF exposure bugfixes
    - All
    - Baseline
    - 
    - 
  * - 2.1
    - Same as model 2.0, but more scenarios and less observers to act as emulator test runs
    - All
    - Baseline, 0-8
    - 
    - 
  * - 3.0
    - Add malaria cause model
    - Baseline
    - Baseline
    - 
    - 
  * - 3.0.1
    - `Update malaria prevalence to be a function of incidence, in accordance with this PR <https://github.com/ihmeuw/vivarium_research/pull/1316>`_
    - Baseline
    - Baseline
    - 
    - 
  * - 3.0.2
    - 3.0.1bugfix (update EMR as a function of updated prevalence from 3.0.1)
    - Baseline
    - Baseline
    - 
    - 
  * - 3.0.3
    - `Remove neonatal age groups from malaria cause model, in accordance with this PR <https://github.com/ihmeuw/vivarium_research/pull/1319>`_
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
    - Wasting risk exposure model update (update wasting transition rates and C_MAM,C_SAM,E_MAM,E_SAM parameter values found in .csv files linked in documentation)
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
    - Baseline, 0-8
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
  * - 2.0 and 2.0.1
    - 1. Deaths and YLLs (cause-specific)
      2. YLDs (cause-specific)
      3. Cause state person time
      4. Cause state transition counts
      5. Stunting state person time, stratified by antenatal intervention coverage
      6. Wasting state person time, stratified by antenatal intervention coverage
      7. Wasting transition counts, stratified by wasting treatment coverage
    - * Age group
      * Sex
  * - 2.1
    - 1. Deaths and YLLs (does not need to be not cause-specific)
      2. YLDs (does not need to be cause-specific)
      3. Stunting state person time, stratified by SQ-LNS coverage
      4. Wasting transition counts, stratified by wasting treatment coverage
      5. Wasting state person time
    - None
  * - 3.0, 3.0.1, 3.0.2, and 3.0.3
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
      * Verify antenatal intervention effects on birthweight, wasting, and stunting exposures
      * Verify maternal BMI/anemia exposure effects on birthweight
    - `Model 1.0 V&V notebook available here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/child_model/model_1.0_risk_and_cause_checks.ipynb>`_
      * Diarrheal diseases prevalence spikes at the post neonatal age group - why?
      * Underestimating diarrheal disease incidence rates - why? (note this was present in IV iron for Ethiopia but not other locations)
      * Didn't have additional pregnancy scenarios, so could not check LBWSG by intervention - will evaluate in model 1.1 instead.
  * - 1.1
    - The following will be best to perform in the interactive sim:
      * Verify new antenatal intervention effects on gestational age
      * Check intervention effects on birthweight as well as impact of maternal joint BMI/anemia exposure on BW (should be the same as IV iron)
      * Note that LBWSG exposure has already been verified in the maternal output data
    - The `interactive sim model 1 notebook <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/child_model/model_1.0_interactive.ipynb>`_ shows that antenatal intervention effects on birth weight and gestational age seem to be working but have a lot of variation. This is to be expected though given the wide confidence intervals in effect size. 
  * - 2.0
    - * Verify wasting risk exposure
      * Verify baseline wasting treatment coverage
      * Verify that antenatal intervention effects remain for stunting
      * Verify that wasting intervention effects remain for wasting among <6 months, and taper off for >6 months
    - See `notebook with CGF exposure here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/child_model/model_2.0_risk_and_cause_checks.ipynb>`_ and a `notebook on wasting transitions here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/child_model/model_3.0_wasting_transitions.ipynb>`_. Note that a `V&V notebook that may be helpful for future wasting transition rate V&V can be found here (basically a record of what we expect each rate to be) <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/wasting_transitions/alibow_ki_database_rates/KI_rates_5.3.3.ipynb>`_.

      * Wasting exposure is really wacky. Looks like incidence rates are really large, remission rates are zero.
      * Stunting exposure model does not appear to be updated to GBD 2021
      * Will wait to examine antenatal intervention effects on CGF exposures until we resolve major issues with CGF exposure models
      * Wasting treatment coverage does not appear to be affecting wasting transition rates
      * Baseline wasting treatment coverage looks good
      * Note that cause model V&V looks bad here because CGF exposure is so off
  * - 2.1
    - * Verify wasting risk exposure
      * Verify baseline wasting treatment coverage
      * Verify that antenatal intervention effects remain for stunting
      * Verify that wasting intervention effects remain for wasting among <6 months, and taper off for >6 months
    - See `notebook with CGF exposure and cause data here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/child_model/model_2.0_risk_and_cause_checks.ipynb>`_ and a `notebook on wasting transitions here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/child_model/model_3.0_wasting_transitions.ipynb>`_. Note that a `V&V notebook that may be helpful for future wasting transition rate V&V can be found here (basically a record of what we expect each rate to be) <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/wasting_transitions/alibow_ki_database_rates/KI_rates_5.3.3.ipynb>`_.

      * Wasting exposure is looking correct 
      * Stunting exposure model is looking correct. Noting that early and late neonatal have 100% of simulants in cat4 
      * Have not assessed antenatal intervention effects on CGF exposures 
      * Wasting treatment coverage's effect on wasting transition rates appear to be working 
      * Cause models are looking correct. There are the same issues with diarrheal diseases prevalence spiking in the post neonatal age group which was noted in Model 1. 
  * - 2.2
    - Check intervention algorithm for all scenarios
    - 
  * - 3.0
    - * Verify that malaria YLDs and YLLs match expected values
    - Initially, prevalence and CSMR were dramatically underestimated
  * - 3.0.1
    - Verify malaria prevalence and CSMR match expected values
    - Prevalence matches artifact value, but still underestimating CSMR because the artifact value for EMR was not updated to new prevalence value
  * - 3.0.2
    - Verify malaria prevalence and CSMR match expected values
    - `Malaria is now looking pretty good, except for the late neonatal age group (expected long time step issue) <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/child_model/model_3.0_risk_and_cause_checks.ipynb>`_. The incidence and prevalence are a bit low but within the uncertainty. 
  * - 3.0.3
    - Verify exclusion of neonatal age groups from malaria cause model and that ACMR is still validating for neonatal age groups
    - TBD
  * - 4.0
    - In simulation outputs:

      * Verify risk exposure for all CGF measures

      In interactive sim:

      * Verify conditional risk exposures
    - `There are no simulants in cat3 underweight exposure <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/child_model/model_4.0.1_risk_and_cause_checks.ipynb>`_. It appears that in generating the lookup.csv file some data was cut off. The file has been regenerated and engineering will rerun with the new file. 
      
      * Cause models have not been assessed since the underweight exposure is being updated. 
      * The interactive sim has not been assessed since underwight exposure is being updated. 
  * - 4.0.1
    - In simulation outputs:

      * Verify risk exposure for all CGF measures

      In interactive sim:

      * Verify conditional risk exposures
    - `cat2 and cat3 underweight exposures appear to be switched <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/child_model/model_4.0_risk_and_cause_checks.ipynb>`_. The lookup.csv file error was found and is being recreated. We will rerun with the updated file. 

      * Malaria CSMR and prevalence look low but other cause models appear to be working. Waiting for the Model 3 updates to malaria before continuing. 
      * The interactive sim has not been assessed since underwight exposure is being updated. 
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
  * - Diarrheal diseases prevalence spikes in the postneonatal age group
    - Unknown
    - Engineers/RT to review
    - Low priority
  * - Diarrheal diseases incidence rate underestimated
    - Unknown
    - Engineers/RT to review and/or to revisit after we update CGF risk effects to CGF 2021
    - Low priority
  * - Wasting transition rates not as expected
    - Unknown
    - Engineers to investigate
    - High priority, for model 2.0.1
  * - Stunting risk exposure not updated to GBD 2021
    - Still has 2019 age groups and values (from IV iron) in model 2.0 artifact
    - Engineers to update to 2021
    - High priority, for model 2.0.1
  * - Malaria prevalence and CSMR really low
    - Suspected incompatibility between GBD prevalence/incidence/remission
    - RT to update malaria cause model doc so that prevalence = incidence * duration rather than GBD prevalence (like we've done for LRI and diarrheal diseases cause models), engineers to implement
    - High priority, for model 3.0.1

