.. role:: underline
    :class: underline

.. _nutrition_optimization_extension:

=================================================================================
Nutrition Optimization Child Model Extension to include Inpatient SAM Treatment
=================================================================================

.. contents::
  :local:

Project overview
++++++++++++++++++++

This model will be built off of the existing :ref:`Nutrition Optimization <2021_concept_model_vivarium_nutrition_optimization>` simulation and extended to support the distinction between complicated and uncomplicated severe acute malnutrition in order to compare the relative priority of treatment for each condition. This model will use the :ref:`nutrition optimization pregnancy simulation <2021_concept_model_vivarium_nutrition_optimization_pregnancies>` without changes from the previous version and will make several changes to the :ref:`nutrition optimization child simulation <2021_concept_model_vivarium_nutrition_optimization_children>` (outlined below).

Simulation Design
++++++++++++++++++++++

.. _nutrition_optimization_extension2.1:

Model components 
--------------------------------------

Pregnancy model: unchanged from those listed in the :ref:`nutrition optimization pregnancy simulation concept model document <2021_concept_model_vivarium_nutrition_optimization_pregnancies>` 

Child model:

Components unchanged from the existing :ref:`nutrition optimization child model <2021_concept_model_vivarium_nutrition_optimization_children>`:

- :ref:`LBWSG risk exposure <2019_risk_exposure_lbwsg>`
- :ref:`LBWSG risk effects <2019_risk_effect_lbwsg>`
- :ref:`Antenatal supplementation intervention <maternal_supplementation_intervention>` 
- :ref:`Diarrheal diseases <2019_cause_diarrhea>`
- :ref:`Measles <2019_cause_measles>`
- :ref:`Lower respiratory infections <2019_cause_lower_respiratory_infections>`
- :ref:`Malaria <2021_cause_malaria>`
- :ref:`Child stunting risk exposure <2020_risk_exposure_child_stunting>`

Artifact-only updates (data updates to come):

- :ref:`SAM treatment for uncomplicated SAM <2021_risk_exposure_wasting_with_complicated_sam>`: parameter updates to C_SAM and E_SAM only
- :ref:`SQ-LNS <lipid_based_nutrient_supplements>`, wasting transition rate value updates, no changes to stunting effects

Components that need to be altered to support new wasting state (more details to come):

- :ref:`Child underweight risk exposure <2020_risk_exposure_child_underweight>`: exposure lookup table needs to support additional wasting state (apply existing cat1 values to both cat1_complicated and cat1_uncomplicated)
- :ref:`CGF risk effects <2019_risk_effect_wasting>`: EMR RRs for both SAM states set to zero, incidence rate RRs set to cat1_superstate value for both SAM substates

Components with substantial updates (links/updates to come)

- :ref:`Child wasting exposure <2021_risk_exposure_wasting_with_complicated_sam>`, including changes to:
- :ref:`SAM treatment for complicated SAM <intervention_wasting_tx_inpatient_sam>`: new intervention to this model
- :ref:`MAM treatment <intervention_wasting_tx_inpatient_sam>`: parameter updates to treated and untreated MAM recovery rates, C_MAM, and E_MAM and some bugfixes to the ``load_mam_treatment_rr`` function as described in a note on the intervention model document
- :ref:`Child wasting state-specific mortality and morbidity <2021_pem_inpatient_sam_extension>`

.. _nutrition_optimization_extension2.2:

Scenario descriptions
-------------------------

**Baseline scenario:**

The child baseline scenario will be run using fertility input data from the baseline scenario of the pregnancy model and with baseline coverage of all modeled child interventions.

**Intervention scenarios:**

We will run all child simulation scenarios using fertility input data from a new scenario of the pregnancy simulation: ``mms_at_anc1`` where coverage of MMS is set to be equal to the proportion of ANC1 attendance according to the GBD covariate. 

There will be a total of 54 child intervention scenarios.

:download:`Download this excel file for a list of intervention scenarios and their specified intervention coverage levels<scenario_map.xlsx>`.

Default specifications 
--------------------------

The below table is intended to outline the default specifications of your simulation. 
Included in the table is a column of parameter definitions. Please delete this column as you 
fill out the table. 

.. list-table:: Default simulation specifications
  :header-rows: 1

  * - Parameter
    - Definition
    - Value
    - Note
  * - Location(s)
    - 
    - Nigeria (modeled at the subnational level)
    - We will be modeling simulants at the subnational level in Nigeria and aggregating results to the national level. In practice, we should use the ``vivarium_gates_nutrition_optimization_child`` ``PopulationLineList`` component (as opposed to the ``EvenlyDistributedPopulation``) and set ``subnational: All`` in the model spec file. This will ensure that simulants are distributed across all Nigerian subnational locations proportionately to subnational population size. 
  * - Number of draws
    - Desired number of draws that a given simulation is to be run for. (Generally, this should be a number between 1 and 1,000.)
    - 20 to start
    - 
  * - Population size per draw
    - Desired simulated population size per draw for a given simulation. 
    - 100,000 pregnancies
    - 

.. note::

  All other specifications remain unchanged from the :ref:`nutrition optimization pregnancy <2021_concept_model_vivarium_nutrition_optimization_pregnancies>` and :ref:`nutrition optimization child <2021_concept_model_vivarium_nutrition_optimization_children>` simulation specifications 


Simulation Observers
-------------------------

Default stratifications for all observers should include:

  - Input draw
  - Scenario
  - Sex
  - Age group

    - Default: GBD age groups
    - Alternative groupings for production runs:
    
        - 0-6 months
        - 6-18 months
        - 18-60 months

.. list-table:: Simulation observers
  :header-rows: 1

  * - Number 
    - Observer
    - Observations
    - Default stratifications
    - Note
  * - 1
    - Mortality
    - * deaths
      * ylls
    - Include: Wasting state
    - Cause-specific
  * - 2
    - Disability
    - * ylds
    - 
    - Cause-specific 
  * - 3
    - Child wasting
    - * person_time_child_wasting
      * transition_count_child_wasting
    - Include: MAM treatment coverage, Uncomplicated SAM treatment coverage, Complicated SAM treatment coverage, SQ-LNS coverage
    - 
  * - 4
    - Child stunting
    - * person_time_child_stunting
    - Include: SQ-LNS coverage
    - 
  * - 5
    - Child underweight
    - * person_time_child_underweight
    - 
    - This observer is for V&V and can be excluded from production runs
  * - 6
    - Disease observers
    - For cause in [diarrheal_diseases, lower_respiratory_infections, measles, malaria]:
      * person_time_{cause}
      * transition_count_{cause}
    - Include: wasting state
    - These observers are for V&V and can be excluded from production runs


Verification & validation (V&V) tracking
++++++++++++++++++++++++++++++++++++++++++++

This section is intended for tracking the progress of V&V of simulation
results. 

The below tables can be filled out iteratively as new model runs are requested and later V&V'd. 

.. note::

  More detail will be added to these runs as we become closer to launching them -- details and V&V criteria may change depending on whether we are running with placeholder data or not

  A note on **fertility input data** from the pregnancy model.

  * First pass fertility input data specs

    * Filepath: ``/mnt/team/simulation_science/pub/models/vivarium_gates_nutrition_optimization/results/vivarium_v4.0_vph_v5.0_update/v3/nigeria/2026_03_31_12_55_44``
    * Input draws: [8, 13, 41]
    * Random seeds: [4344, 5616, 6810, 2787, 2284]
    * Maternal scenario: baseline

  * Updated fertility input data specs

    * Filepath: ``/mnt/team/simulation_science/pub/models/vivarium_gates_inpatient_sam_maternal_model/results/model_1.0/nigeria/2026_05_05_17_55_13/results/``
    * Input draws: [80, 13, 64, 74, 29, 52, 91, 60, 1, 83, 16, 26, 12, 28, 44, 88, 72, 35, 53, 47]. These draws were selected by randomly sampling 20 numbers between 1 and 99 as we have only generated wasting calibration data for 100 draws. Note we avoid draw 0 here as it has been overwritten with mean across all draws in N.O. artifacts
    * Random seeds: Unspecified, up to engineers
    * Maternal scenarios:

      * Baseline
      * MMS coverage equal to ANC1 value 


.. todo::

  Fill in V&V summaries for all runs and run specs for 2.1 and 2.2

.. list-table:: Model runs
  :header-rows: 1

  * - Run number
    - Run description
    - Preg. Sim Specs
    - Scenario
    - Specification modifications
    - Stratification modifications
    - Observer modifications
  * - 1.0
    - Wasting model update (without updates to the PEM model, but with no mortality due to infectious diseases in the SAM states)
    - First pass fertility input data specs
    - Baseline 
    - [8, 13, 41]
    - Default
    - Default
  * - 2.0
    - Updates to PEM model
    - Ideally Updated fertility input data specs, but first pass can be used if updated spec results are not ready
    - Baseline
    - 10 draws with updated fertility input specs or [8, 13, 41] with first pass specs
    - Default
    - Default
  * - 3.0
    - * Intervention model update implementation
      * Used Kano-only calibration data ``wasting_processed_rates_kano_20260428.csv`` `found here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/9ddd5e07a6c0fe0e96249aa8271dda6bcfe88630/data_prep/cgf_correlation/nigeria/wasting_processed_rates_kano_20260428.csv>`__. Note this data was missing the ``complicated_fraction`` parameter, which was filled using values from the prior run (2.2)
    - First pass fertility input data specs
    - * Baseline maternal scenario
      * Baseline child scenario and: 0-7, 36 (*uncomplicated_sam_tx__complicated_sam_stabilization__*), 45 (*uncomplicated_sam_tx__complicated_sam_recovery__*)
    - 10 draws
    - Default
    - Default
  * - 3.1
    - * Update to complicated SAM treatment baseline coverage (was zero in 3.0)
      * Updated wasting calibration values in ``wasting_processed_rates_kano_20260429.csv`` `found here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/741c5f53e060bcca1f0db6b3776df0bc02658366/data_prep/cgf_correlation/nigeria/wasting_processed_rates_kano_20260429.csv>`__ (fixed issue with missing complicated_fraction parameter from 3.0)
      * Updated SQ-LNS effect values [ALI TO LINK SOON]
    - First pass fertility input data specs
    - Baseline maternal scenario and the following child scenarios: ``[baseline, zero_coverage__, targeted_mam_tx__, universal_mam_tx__, targeted_mam_tx__universal_sqlns__, universal_sqlns__, universal_mam_tx__universal_sqlns__, complicated_sam_stabilization__, complicated_sam_stabilization__targeted_mam_tx__, complicated_sam_stabilization__universal_mam_tx__, complicated_sam_stabilization__targeted_mam_tx__universal_sqlns__, complicated_sam_stabilization__universal_sqlns__, complicated_sam_stabilization__universal_mam_tx__universal_sqlns__, complicated_sam_recovery__, complicated_sam_recovery__targeted_mam_tx__, complicated_sam_recovery__universal_mam_tx__, complicated_sam_recovery__targeted_mam_tx__universal_sqlns__, complicated_sam_recovery__universal_sqlns__, complicated_sam_recovery__universal_mam_tx__universal_sqlns__, uncomplicated_sam_tx__, uncomplicated_sam_tx__targeted_mam_tx__, uncomplicated_sam_tx__universal_mam_tx__, uncomplicated_sam_tx__targeted_mam_tx__universal_sqlns__, uncomplicated_sam_tx__universal_sqlns__, uncomplicated_sam_tx__universal_mam_tx__universal_sqlns__, uncomplicated_sam_tx__complicated_sam_stabilization__, uncomplicated_sam_tx__complicated_sam_stabilization__targeted_mam_tx__, uncomplicated_sam_tx__complicated_sam_stabilization__universal_mam_tx__, uncomplicated_sam_tx__complicated_sam_stabilization__targeted_mam_tx__universal_sqlns__, uncomplicated_sam_tx__complicated_sam_stabilization__universal_sqlns__, uncomplicated_sam_tx__complicated_sam_stabilization__universal_mam_tx__universal_sqlns__]`` aka: numbers ``[baseline, 0, 1, 4, 6, 7, 8, 9, 10, 13, 15, 16, 17, 18, 19, 22, 24, 25, 26, 27, 28, 31, 33, 34, 35, 36, 37, 40, 42, 43, 44]``
    - 10 draws
    - Use the following age groups:

      * Early neonatal (GBD)
      * Late neonatal (GBD)
      * 1-5 months (GBD)
      * 6-12 months (GBD)
      * 12-23 months (GBD)
      * 2-4 years (GBD)
    - Default
  * - 3.2
    - Same as 3.1, but with updated ordering of assigning the ``post_discharge`` state variable within a timestep to resolve the coverage issues seen in the ``complicated_sam_recovery`` scenarios
    - Same as 3.1
    - Same as 3.1
    - Same as 3.1
    - Same as 3.1
    - Same as 3.1
  * - 3.3
    - Parameter update for wasting calibration (not yet for SQLNS effects). `Use data found here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/57e2beeb00e56df4f1a8202b455a9c91f2a8f8f2/data_prep/cgf_correlation/nigeria/wasting_processed_rates_kano_20260505_incidence_update_100_draws.csv>`__
    - **UPDATED** fertility input data specs (see details in note above)
    - * Baseline maternal scenario + baseline child scenario
      * MMS at ANC1 maternal scenario and all child scenarios listed in model 3.1 request
    - 10 draws (use first 10 from the list of 20 specified in the fertility input data specs in the note above this table)
    - Use the following age groups:

      * Early neonatal (GBD)
      * Late neonatal (GBD)
      * 1-5 months (GBD)
      * 6-12 months (GBD)
      * #12-23 months (GBD)
      * **12-18 months (Custom for SQLNS eligible age)**
      * **18-24 months (Custom for SQLNS eligible age)**
      * 2-4 years (GBD)

      Exclude post_discharge and/or previous wasting state stratifications from all observers.
    - Can exclude disease observers
  * - 4.0
    - Production run test
    - Updated fertility input data specs
    - Baseline and MMS at ANC1 maternal scenarios, baseline child scenario
    - 10 draws
    - * Same age groups as 3.1, or 0-6 months, 6-18 months, 18-60 months for run time
      * Can exclude wasting state stratification from mortality observer for run time
    - Can exclude child underweight and disease observers (observers #5 and #6) for run time
  * - 4.1
    - Production runs
    - Updated fertility input data specs
    - * Baseline (maternal and child)
      * MMS at ANC maternal scenario and child scenarios listed for 3.1
    - 20 draws
    - Same as 4.0
    - Same as 4.0

.. list-table:: Model verification and validation tracking
   :widths: 3 10 20
   :header-rows: 1

   * - Run number
     - V&V criteria
     - V&V summary
   * - 1.0
     - Note this model is not expected to validate to GBD with regard to mortality or wasting exposure given that PEM mortality has not been included in this run. The following checks can be performed:

       1. Confirm that underweight exposure in the SAM substates from the simulation does not vary by SAM substate and matches the expectation of underweight exposure in the SAM superstate from the artifact
       
       2. Confirm that no deaths due to diarrheal diseases, LRI, malaria, or measles occurred in either SAM substate
       
       3. Confirm that CGF RRs are functioning as expected (given asssumption that SAM substates both have the SAM superstate RRs for incidence rates while having EMR RRs equal to zero)
       
       4. Confirm that the wasting transition rates match input data expectation
       
       5. Confirm that the wasting state initialization (in neonatal age groups) in the sim matches input data expectation for the substate-specific input data from the artifact (relevant age group = 1-5 months)
     - 
   * - 2.0
     - 1. Verify population ACMR to GBD
       
       2. Verify wasting state-specific mortality rates are as expected
       
       3. Verify CGF exposures
       
       4. Confirm all 1.0 criteria as well
     -  
   * - 3.0
     - * Confirm all intervention effects and coverage match expectations 
     - 

.. list-table:: Outstanding verification and validation issues
   :header-rows: 1

   * - Issue
     - Explanation
     - Action plan
     - Timeline
   * - 
     - 
     - 
     - 



