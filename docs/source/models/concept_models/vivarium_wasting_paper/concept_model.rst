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


.. _2020_concept_model_vivarium_ciff_sam:

===================================
Vivarium wasting paper simulation
===================================

.. contents::
  :local:

1.0 Project overview
++++++++++++++++++++

This simulation will build on :ref:`phase I of the severe acute malnutrition elimination model, described here <2019_concept_model_vivarium_ciff_sam>`. 

The goal of this simulation is to investigate the question:

  - What is the required treatment volume of MAM (and SAM) under various scale-up and targeting strategies for joint community management of acute malnutrition (for SAM and/or MAM) and small quantity lipid-based nutrient supplementation (SQ-LNS). 

    We will begin to investigate this question in two waves:

      1. Universal SQ-LNS coverage scale-up strategies (no x-factor)

      2. Targeted SQ-LNS coverage scale-up strategies (utilizing x-factor)

`Additional background on the project and resources for publication can be found here. <https://uwnetid.sharepoint.com/:w:/r/sites/ihme_sim_science_collaborations/_layouts/15/Doc.aspx?sourcedoc=%7BFE3E9389-829B-4BEC-A425-7487A1A510A8%7D&file=Updated%20draft%20introduction%20outline.docx&action=default&mobileredirect=true>`_

1.1 Examples of similar analyses
--------------------------------

Existing models that utilize dynamic transition models of child wasting include:

- Optima Nutrition Model, an adaptation of the Lives Saved Tool (LiST) [Optima-Nutrition-Model]_, utilized in an analysis by [Scott-et-al-2020]_

- Work by the Institute for Disease Modeling (IDM), developed to investigate the potential impact of nutritional supplementation on childhood measles burden [Noori-et-al-2021]_

2.0 Simulation design
+++++++++++++++++++++++++++++

2.1 Default specifications
---------------------------

.. list-table:: Default simulation specifications
  :header-rows: 1

  * - Parameter
    - Value
    - Note
  * - Location(s)
    - Ethiopia (ID: 179)
    - 
  * - Number of draws
    - 20
    - Needs to be refined based on test runs
  * - Population size per draw
    - 100,000
    - Needs to be refined based on test runs
  * - Age start (initialization)
    - Zero
    - 
  * - Age start (observation)
    - Six months
    - Change from :ref:`phase I <2019_concept_model_vivarium_ciff_sam>`
  * - Age end
    - 5 years
    - 
  * - Exit age
    - 5 years
    - 
  * - Simulation start date
    - 2021-07-01
    - 
  * - Simulation observation start date
    - 2022-01-01
    - Starts six months after x-factor burn-in
  * - Simulation end date
    - 2026-12-31
    - 
  * - Timestep
    - 4 days
    - Change from :ref:`phase I <2019_concept_model_vivarium_ciff_sam>`, needs to be validated

2.2 Scenarios
-------------

Simulated scenarios will involve some change of coverage/efficacy parameter values for the following interventions, in combination or isolation:

  1. SAM treatment

  2. MAM treatment

  3. SQ-LNS

    * 3a. Universal
    * 3b. Targeted to those with mild wasting
    * 3c. Targeted to those recovered from SAM/MAM treatment

.. list-table:: Intervention coverage and efficacy parameters
  :header-rows: 1

  * - Intervention
    - Baseline
    - Target
    - Zero coverage (*)
  * - 1: SAM treatment
    - Baseline values for :math:`C_{SAM}` and :math:`E_{SAM}`, :ref:`defined here <wasting-treatment-baseline-parameters>`
    - :math:`C_{SAM} = 0.7`

      :math:`E_{SAM} = 0.75`
    - :math:`C_{SAM} = 0`
      
      :math:`E_{SAM} = \text{baseline value}`
  * - 2: MAM treatment
    - Baseline values for :math:`C_{MAM}` and :math:`E_{MAM}`, :ref:`defined here <wasting-treatment-baseline-parameters>`
    - :math:`C_{MAM} = 0.7`
      
      :math:`E_{MAM} = 0.75`
    - :math:`C_{MAM} = 0`
      
      :math:`E_{MAM} = \text{baseline value}`
  * - 3: SQ-LNS (all sub-interventions)
    - :math:`C_{SQLNS} = 0`
    - :math:`C_{SQLNS} = 0.7` (*)
    - :math:`C_{SQLNS} = 0`

.. note::

  (*) in the table above indicates a change from phase I

.. note::

  Model versions 1 through 3.0.1 scaled between the baseline value and the target value accordingly:
    
    For scenarios that feature a scale-up of one of the above interventions, intervention parameters should scale between the baseline and the scale-up values according to :ref:`the algorithm described here <ciff_scale_up_algorithm>` that was used for phase I of the acute malnutrition simulation. For scenarios that feature "zero coverage" of one or more of the above interventions, intervention coverage should immediately change from the baseline to the zero coverage values at the date that the intervention scale-up would have occured according to the algorithm linked above. Intervention parameters should remain at the zero coverage values for the remainder of the simulation.

For model versions 3.0.2 onward, intervention parameters should be set to the value specified in the table below at initialization and remain at this level for the duration of the simulation.

.. list-table:: Scenarios
  :header-rows: 1

  * - Scenario
    - 1. SAM treatment
    - 2. MAM treatment
    - 3. SQ-LNS
    - Note
  * - 1: Baseline
    - Baseline
    - Baseline
    - Baseline (0%)
    - 
  * - 2: Zero coverage
    - Zero coverage
    - Zero coverage
    - Baseline (0%)
    - 
  * - 3: SAM treatment scale-up, baseline MAM treatment
    - Target
    - Baseline
    - Baseline (0%)
    - 
  * - 4: SAM treatment scale-up, zero MAM treatment
    - Target
    - Zero coverage
    - Zero coverage
    - 
  * - 5: MAM treatment scale-up
    - Baseline
    - :math:`C_{MAM}` to baseline :math:`C_{SAM}`, :math:`E_{MAM}` to target :math:`E_{MAM}` 
    - Baseline (0%)
    - 
  * - 6_incidence: Full scale-up to SAM baseline, 
    - Baseline
    - :math:`C_{MAM}` to baseline :math:`C_{SAM}`, :math:`E_{MAM}` to target :math:`E_{MAM}`
    - 3a to baseline :math:`C_{SAM}`, using SQ-LNS incidence sensitivity analysis effects
    - 
  * - 6_recovery: Full scale-up to SAM baseline
    - Baseline
    - :math:`C_{MAM}` to baseline :math:`C_{SAM}`, :math:`E_{MAM}` to target :math:`E_{MAM}`
    - 3a to baseline :math:`C_{SAM}`, using SQ-LNS recovery sensitivity analysis effects
    - 
  * - 7: MAM and SAM treatment scale-up
    - Target
    - Target
    - Baseline (0%)
    - 
  * - 8_incidence: Full scale-up to target
    - Target
    - Target
    - 3a to target, using SQ-LNS incidence sensitivity analysis effects
    - 
  * - 8_recovery: Full scale-up to target
    - Target
    - Target
    - 3a to target, using SQ-LNS recovery sensitivity analysis effects
    - 
  * - 9_incidence: SQ-LNS to mildly wasted
    - Target
    - Target
    - 3b to target, using SQ-LNS incidence sensitivity analysis effects
    - [Second wave that requires x-factor inclusion]
  * - 9_recovery: SQ-LNS to mildly wasted
    - Target
    - Target
    - 3b to target, using SQ-LNS recovery sensitivity analysis effects
    - [Second wave that requires x-factor inclusion]
  * - 10_incidence: SQ-LNS to SAM and MAM treatment
    - Target
    - Target
    - 3c to target, using SQ-LNS incidence sensitivity analysis effects
    - [Second wave that requires x-factor inclusion]
  * - 10_recovery: SQ-LNS to SAM and MAM treatment
    - Target
    - Target
    - 3c to target, using SQ-LNS recovery sensitivity analysis effects
    - [Second wave that requires x-factor inclusion]

.. note::

  We may add/remove scenarios based on results of existing list

  Additional scenarios to consider include one in which SQ-LNS coverage is scaled-up to baseline coverage of CMAM screenings (:math:`C_{SAM}`) and coverage of MAM and SAM treatment are increased by some magnitude as well. There is some evidence to suggest that administering SQ-LNS at CMAM screenings may increase screening coverage [Huybregts-et-al-2019]_; however, we chose not to model this scenario as the paper ultimately did not find an impact on *treatment* coverage. As more evidence on this topic becomes available, we may consider including this scenario in our model.


2.2.1 Scenarios for emulator inputs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This section refers to a subset of scenarios intended for use in building and testing the separate Nutrition Intervention Optimization simulation.

.. _emulatorscenarios:

Note, for all emulator input scenarios, use baseline values for :math:`E_{SAM}` and :math:`E_{MAM}` parameters. Additionally, use the SQ-LNS incidence sensitivity analysis effects.

.. list-table:: Emulator input scenarios
  :header-rows: 1

  * - Scenario
    - SQ-LNS coverage
    - MAM treatment coverage
    - SAM treatment coverage
  * - E1
    - 0
    - 0
    - 0
  * - E2
    - 0.7
    - 0
    - 0
  * - E3
    - 0
    - 0.7
    - 0
  * - E4
    - 0
    - 0
    - 0.7
  * - E5
    - 0.7
    - 0.7
    - 0
  * - E6
    - 0.7
    - 0
    - 0.7
  * - E7
    - 0
    - 0.7
    - 0.7
  * - E8
    - 0.7
    - 0.7
    - 0.7

2.3 Modelling components
------------------------------

2.3.1 Concept model diagram
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::

  X-factor will be included in the second wave of model runs/scenarios only

.. image:: am_concept_model_diagram.svg

2.3.1.1 Cause Models
^^^^^^^^^^^^^^^^^^^^^

* :ref:`Diarrheal Diseases (GBD 2019) <2019_cause_diarrhea>`

* :ref:`Lower Respiratory Infections (GBD 2019) <2019_cause_lower_respiratory_infections>`

* :ref:`Measles (GBD 2019) <2019_cause_measles>`

2.3.1.2 Joint Cause-Risk Models
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* :ref:`Child Wasting / Protein Energy Malnutrition (GBD 2020) <2020_risk_exposure_wasting_state_exposure>`

2.3.1.3 Risk Exposure Models
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* :ref:`Child Stunting Risk Exposure (GBD 2020) <2020_risk_exposure_child_stunting>`

* :ref:`X-factor Risk Exposure <2019_risk_exposure_x_factor>`

2.3.1.4 Risk Effects Models
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* Child Stunting Risk Effects (GBD 2020)

* :ref:`Child Wasting Risk Effects (GBD 2020) <2019_risk_effect_wasting>`, NOTE: use the :ref:`risk effect on diarrheal diseases described here <standard-wasting-effects>`

* :ref:`X-factor Risk Effects <2019_risk_effect_x_factor>`, for wave 2 model runs only

.. note::

  Do not incude :ref:`Diarrheal Diseases Risk Effects <2019_risk_effect_diarrheal_diseases>`

2.3.1.5 Intervention Models
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. important::

  **A note on coverage propensities:**

  We would ideally like to use the same coverage propensity for all modeled interventions (MAM treatment, SAM treatment, and SQ-LNS). In other words, at the same coverage level, the same simulants should be covered by all 3 interventions and the remaining simulants should be covered by zero interventions. 

  However, we used non-fixed propensity values for the :ref:`Treatment and management for acute malnutrition <intervention_wasting_treatment>` model to avoid V&V issues as discussed on the intervention model document.

  Given this model limitation, **we will model *independent* coverage propensities of the SQ-LNS intervention and MAM/SAM treatment.**

* :ref:`Small quantity lipid based nutrient supplements universal coverage (SQ-LNS) <lipid_based_nutrient_supplements>` 

* :ref:`Treatment and management for acute malnutrition <intervention_wasting_treatment>`

.. todo::

  Consider adding mortality impacts? We're thinking no for now.

2.4 Outputs
----------------------

**Primary simulation outcomes** (for each scenario):

  - Number of incident MAM and SAM cases per 100,000 PY
  - Number of *treated* MAM and SAM cases per 100,000 PY
  - Person-time spent utilizing SQ-LNS per 100,000 PY 
  - Prevalence of wasting and stunting
  - All-cause mortality rates
  - All-cause YLL rates
  - Cause-specific YLD rates

**Secondary simulation outcomes**

  - Relative risk for all-cause mortality by intervention coverage (for comparison with trial data)
  - Person-time spent covered by SQ-LNS per 100,000 PY (:ref:`see difference between coverage and utilization here <utilization-definition>`)
  - Mean difference of time-to-recovery of MAM and SAM by wasting treatment status 

*Simulation outcomes needed for verification and validation only:*

  - Cause incidence, remission, and excess mortality rates
  - Wasting and stunting risk effects
  - Effect of SQ-LNS intervention

**Requested outputs for primary and secondary outcomes** with minimum required stratification beyond defaults (additional stratification requested below if needed for V&V):

  Default strata:

  - Age
  - Sex
  - Year

.. list-table:: Requested Count Data Outputs and Stratifications
  :header-rows: 1

  * - Output
    - Include strata
    - Exclude strata
  * - Stunting state person time
    - * SQ-LNS coverage/utilization 
    - 
  * - Wasting transition counts
    - * MAM treatment coverage* 
      * SAM treatment coverage*
    - 
  * - Wasting state person time
    - * SQ-LNS coverage/utilization 
      * MAM treatment coverage*
      * SAM treatment coverage*
    - 
  * - Deaths and YLLs (cause-specific)
    - * SQ-LNS coverage/utilization 
      * MAM treatment coverage*
      * SAM treatment coverage*
    - 
  * - YLDs (cause-specific)
    - 
    - 
  * - Cause state person time
    - 
    - 
  * - Cause state transition counts
    - 
    - 
  * - Mortality hazard first moment
    - * MAM treatment coverage*
      * SAM treatment coverage*
      * SQ-LNS coverage/utilization (separately if targeting)
    - 

.. note::

  The mortality hazard first moment should be recorded as the sum of each simulant's all-cause mortality hazard multiplied by the person-time spent with that mortality hazard for each observed stratum. This observer is an attempt to measure the expected differences in mortality between scenarios without the influence of stochastic uncertainty, which will enable us to run the simulation with smaller population sizes. 

3.0 Models
+++++++++++

**Model development priorities:**

1. Concept model updates
  
  1a. Updated model components
  
    * :underline:`Keep without changes:` SQ-LNS intervention, MAM treatment intervention, SAM treatment intervention, wasting transition risk factor, stunting risk factor, protein energy malnutrition cause, measles cause
    
    * :underline:`Change:` Diarrheal diseases and lower respiratory infections causes (to most recent versions used in IV iron), update risk effect of wasting to apply to diarrheal diseases incidence rate rather than excess mortality rate
    
    * :underline:`Remove from previous model:` LBWSG risk factor, maternal supplementation intervention, insecticide treated net intervention, zinc supplementation intervention, diarrheal diseases risk effects, x-factor risk factor (for now), maternal BMI risk factor

  1b. Simulation outputs

    * Update outputs and stratification to match tables above

  1c. Model specification changes

    * Update simulation timestep from 0.5 days to 4 days

    * Change simulation age start from birth to six months

2. Update SQ-LNS intervention details (except for targeting implementation)

  * Change SQ-LNS coverage age-end parameter from 5 to 2 years

  * Update effect of SQ-LNS on wasting to new sex-specific values

3. Scenario implementation

  * First run for a sub-set of scenarios with increased population size and number of draws to assess how many to use moving forward (detailed in model request table below)

  * Then, run all scenarios with determined population size and number of draws

  * Assess computational resource requirements and joint decision about additional locations

4. Update SQ-LNS parameters based on collaborator feedback and new data

  * SQ-LNS effects on stunting persist until five years of age (use new SQ-LNS coverage definition)

  * Updated effect sizes and effect size application strategy for SQ-LNS effects on stunting

  * SQ-LNS effects on wasting apply to additional transition rates, introduce sensitivity analysis (new scenarios)

  * Stratify mortality hazard first moment observer by intervention coverage

5. SQ-LNS utilization algorithms and targeted scenarios

  * SQ-LNS targeting implementation (new code!)

  * Include x-factor risk in model. Note that research team will need to pass off calibration values.

.. note::

  Model run requests may be added to this table for iterative verification and validation processes

.. list-table:: Model runs
  :header-rows: 1

  * - Run
    - Description
    - Scenarios
    - Specification modifications
    - Stratificaction modifications
    - Note
  * - 1.0 Baseline concept model updates
    - Includes relevant model components, updated outputs, updated model specs.
    - 1
    - * Simulation end date: 2023-12-31 (modified from 2026-12-31)
      * Otherwise, default specs (20 draws, 100,000 population size)
    - Stratify cause state person time and cause transition counts by wasting and stunting state (for V&V of risk effects)
    - No x-factor component. V&V baseline model before moving on (cause models, risk effects, MAM/SAM treatment effects)
  * - 2.0 SQ-LNS updates
    - Updates to SQ-LNS age-end parameter, sex-specific effect size
    - 6
    - Default (20 draws, 100,000 population size)
    - Wasting transition counts stratified by SQ-LNS coverage/utilization (for V&V of SQ-LNS intervention effect)
    - No x-factor component. V&V SQ-LNS effect and intervention scale-up before moving on.
  * - 3.0: Alternative scenario runs, stratified by seed
    - Subset of scenarios to determine desired number of draws and population sizes
    - 4, 7, 8
    - 50 draws, 200,000 population size
    - Count data results stratified by random seed for optimization
    - No x-factor component. V&V zero coverage implementation before moving on.
  * - 3.0.1: Updates and larger population size
    - Model 3.0 bugfixes, implement mortality hazard rate observer, remove intervention scale-up, subset of draws and larger population size
    - 4, 7, 8
    - Draw numbers :code:`[432, 78, 394, 100, 254, 440]`, 400,000 population size
    - Count data results stratified by random seed for optimization
    - No x-factor component. V&V zero coverage implementation before moving on
  * - 3.1: SQ-LNS updates
    - `Update SQ-LNS intervention in accordance with this PR <https://github.com/ihmeuw/vivarium_research/pull/1097>`_ (step #4 in the model development priorities list above), ensure mortality first hazard observer is stratified by intervention coverage, remove children under 6 months from observers
    - 7, 8_incidence, 8_recovery
    - Draw numbers :code:`[432, 78, 394, 100, 254, 440]`, 400,000 population size
    - Count data results stratified by random seed for optimization
    - No x-factor component. V&V SQ-LNS updates before moving on
  * - 3.1.1: Run-time test
    - Remove lots of stratification and record runtime for planning purposes in the nutrition optimization model
    - 1
    - 1 draw, population size 250,000
    - :download:`See modifications to defaults in this PNG file <stratification_details_for_test_run.png>`
    - Don't need results, only runtime statistics.
  * - 3.1.2: Emulator runs
    - Run select scenarios with little stratification to use in building and testing emulator for nutrition optimization project
    - E1 through E8, :ref:`defined here <emulatorscenarios>`
    - 2 draws, population size 100,000 per draw
    - Same stratifications and outputs as run 3.1.1
    - 
  * - 3.1.3
    - Updated age-specific SQLNS effects on wasting, additional stratifications, updated initialization age start value (from 0.5 to 0). All changes included in `pull request #1114 <https://github.com/ihmeuw/vivarium_research/pull/1114>`_
    - 7, 8_incidence, 8_recovery
    - Draw numbers :code:`[432, 78, 394, 100, 254, 440]`, 400,000 population size
    - Count data results stratified by random seed for optimization
    - No x-factor component
  * - 4.0: All wave 1 scenarios
    - Full wave 1 scenarios
    - 1 through 8
    - 35 draws and population size of 250,000 per draw
    - Default
    - No x-factor component. May be run for additional locations depending on computational resource requirements.

.. list-table:: Model verification and validation tracking
   :widths: 3 10 20
   :header-rows: 1

   * - Model
     - Description
     - V&V summary
   * - 1.0 
     - Baseline concept model updates
     - `V&V notebooks for model 1.0 can be found here <https://github.com/ihmeuw/vivarium_research_wasting/tree/main/verification_and_validation/model_1>`_. V&V criteria satisfied.
   * - 2.0
     - SQ-LNS intervention updates
     - * `SQ-LNS sex-specific effect size looks as expected <https://github.com/ihmeuw/vivarium_research_wasting/blob/main/verification_and_validation/model_2.0/intervention_effect_verification.ipynb>`_
       * `Intervention scale-ups look as expected <https://github.com/ihmeuw/vivarium_research_wasting/blob/main/verification_and_validation/model_2.0/intervention_coverage_verification.ipynb>`_
       * Cap of 2 years applied to entire simulation rather than to the SQ-LNS intervention eligibility
   * - 3.0
     - Subset of scenarios stratified by random seed
     - * Simulation age end parameter fixed (now equal to 5 years instead of 2 years as desired)
       * SQ-LNS `coverage <https://github.com/ihmeuw/vivarium_research_wasting/blob/main/verification_and_validation/model_3.0/intervention_coverage_verification.ipynb>`_ and `effects <https://github.com/ihmeuw/vivarium_research_wasting/blob/main/verification_and_validation/model_3.0/intervention_effect_verification.ipynb>`_ in the 2_to_4 age group (this age group should be ineligible for SQ-LNS)
       * `Scenario 4 has baseline levels of MAM treatment coverage rather than zero percent coverage as desired <https://github.com/ihmeuw/vivarium_research_wasting/blob/main/verification_and_validation/model_3.0/intervention_coverage_verification.ipynb>`_
       * Appears that population size of 200,000 is not sufficient to observe deaths averted between scenarios with minimal impact of stochastic uncertainty, particularly for early years in the scale-up. `See investigation notebook here <https://github.com/ihmeuw/vivarium_research_wasting/blob/main/verification_and_validation/model_3.0/population_size_analysis.ipynb>`_
   * - 3.0.1
     - Bugfixes, scale-up removal, increased population size for subset of draws
     - * SQ-LNS `coverage (shown here) <https://github.com/ihmeuw/vivarium_research_wasting/blob/main/verification_and_validation/model_3.0.1/intervention_coverage_verification.ipynb>`_ and `effects (shown here) <https://github.com/ihmeuw/vivarium_research_wasting/blob/main/verification_and_validation/model_3.0.1/intervention_effect_verification.ipynb>`_ no longer present for simulants over 2 years of age (success!)
       * `MAM coverage now zero for the zero coverage scenario (success!) <https://github.com/ihmeuw/vivarium_research_wasting/blob/main/verification_and_validation/model_3.0.1/intervention_coverage_verification.ipynb>`_
       * `Scale-up removed as desired (success!) <https://github.com/ihmeuw/vivarium_research_wasting/blob/main/verification_and_validation/model_3.0.1/intervention_coverage_verification.ipynb>`_
       * `Mortality hazard rate observer implemented as expected <https://github.com/ihmeuw/vivarium_research_wasting/blob/main/verification_and_validation/model_3.0.1/Mortality%20hazard%20observer.ipynb>`_
       * Decided on 35 draws for run 3.1 (`based on analysis in this notebook <https://github.com/ihmeuw/vivarium_research_wasting/blob/main/verification_and_validation/model_3.0/number_of_draws_analysis.ipynb>`_)
       * `Decided on 260,000 population size based on stability of SAM cases averted at this level <https://github.com/ihmeuw/vivarium_research_wasting/blob/main/verification_and_validation/model_3.0.1/population_size_analysis.ipynb>`_ and plan to use mortality hazard observer for expected deaths averted rather than observed (note that this will not apply to DALYs)
   * - 3.1
     - `Updated SQ-LNS intervention in accordance with this PR <https://github.com/ihmeuw/vivarium_research/pull/1097>`_, mortality first hazard observer is stratified by intervention coverage, removed children under 6 months from observers
     - * SQ-LNS intervention updates implemented correctly, although wasting prevalence ratios imperfectly validated (perhaps an issue with few draws). Will update values and random sampling instructions for SQ-LNS effects on wasting for next round implementation.
       * Simulants under six months of age successfully removed from observation, but identified a bug where simulants 0-6 months not present at initialization and simulants born into simulation at age zero, resulting in a missing age cohort over time. Will update by setting age start to zero.
       * Mortality first hazard stratified by intervention status successfully.

.. list-table:: Outstanding verification and validation issues
   :header-rows: 1

   * - Issue
     - Explanation
     - Action plan
     - Timeline
   * - Simulants aged 0-6 months not present at initialization, resulting in missing age cohort over time
     - Discrepancy between age start and entrance age
     - Set age start value to 0 (instead of six months)
     - For next model run

Assumptions and Limitations
----------------------------

- We assume independent coverage propensities between our modeled interventions. Say someone has SAM and does not have access to treatment but spontaneously recovers to MAM -- it is possible for this person to then be treated for MAM in our model. While possible, this is probably unlikely in reality. Additionally, while we expect our modeled interventions to estimate impact on total incident wasting cases reasonably, we will likely underestimate the potential impact of SQ-LNS on *treated* wasting cases as SQ-LNS coverage will not be concentrated among those who are covered by CMAM services.

- Our definition of MAM and SAM treatment coverage is probability rather than capacity based (probability of receiving treatment given that you need treatment does not change as the overall number of children who need treatment changes), which is likely not reflective of real-world resource availability/constraints. 

References
----------

.. [Huybregts-et-al-2019]

  View `Huybregts et al. 2019 <https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6711497/pdf/pmed.1002892.pdf>`_
  
    Huybregts L, Le Port A, Becquey E, Zongrone A, Barba FM, Rawat R, Leroy JL, Ruel MT. Impact on child acute malnutrition of integrating small-quantity lipid-based nutrient supplements into community-level screening for acute malnutrition: A cluster-randomized controlled trial in Mali. PLoS Med. 2019 Aug 27;16(8):e1002892. doi: 10.1371/journal.pmed.1002892. PMID: 31454356; PMCID: PMC6711497.

.. [Noori-et-al-2021]
  
  View `Noori et al. 2021 <https://doi.org/10.1101/2021.09.10.21263402>`_

    Navideh Noori, Laura A. Skrip, Assaf P. Oron, Kevin A. McCarthy, Benjamin M. Althouse, Indi Trehan, Kevin P.Q. Phelan. Potential Impacts of Mass Nutritional Supplementation on Dynamics of Measles: A Simulation Study. medRxiv 2021.09.10.21263402; doi: https://doi.org/10.1101/2021.09.10.21263402

.. [Optima-Nutrition-Model]
  Pearson R, Killedar M, Petravic J, Kakietek JJ, Scott N, Grantham KL, Stuart RM, Kedziora DJ, Kerr CC, Skordis-Worrall J, Shekar M, Wilson DP. Optima Nutrition: an allocative efficiency tool to reduce childhood stunting by better targeting of nutrition-related interventions. BMC Public Health. 2018 Mar 20;18(1):384. doi: 10.1186/s12889-018-5294-z. Erratum in: BMC Public Health. 2018 Apr 26;18(1):555. `https://pubmed.ncbi.nlm.nih.gov/29558915 <https://pubmed.ncbi.nlm.nih.gov/29558915>`_

.. [Scott-et-al-2020]
  Scott, N., Delport, D., Hainsworth, S. et al. Ending malnutrition in all its forms requires scaling up proven nutrition interventions and much more: a 129-country analysis. BMC Med 18, 356 (2020). `https://doi.org/10.1186/s12916-020-01786-5 <https://doi.org/10.1186/s12916-020-01786-5>`_

