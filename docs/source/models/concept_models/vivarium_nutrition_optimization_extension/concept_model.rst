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

- :ref:`MAM treatment <intervention_wasting_treatment>`: parameter updates to C_MAM and E_MAM only
- :ref:`SAM treatment for uncomplicated SAM <intervention_wasting_treatment>`: parameter updates to C_SAM and E_SAM only
- :ref:`SQ-LNS <lipid_based_nutrient_supplements>`, wasting transition rate value updates, no changes to stunting effects

Components that need to be altered to support new wasting state (more details to come):

- :ref:`Child underweight risk exposure <2020_risk_exposure_child_underweight>`: exposure lookup table needs to support additional wasting state (apply existing cat1 values to both cat1_complicated and cat1_uncomplicated)
- :ref:`Effect of birthweight on wasting (see initialization section) <2021_risk_exposure_wasting_state_exposure>`: needs to support additional wasting state
- :ref:`CGF risk effects <2019_risk_effect_wasting>`: EMRs for all SAM states set to zero

Components with substantial updates (links/updates to come)

- :ref:`Child wasting exposure <2021_risk_exposure_wasting_with_complicated_sam>`, including changes to:

  - Exposure initialization, see relevant changes in the third (and any later) commits of `this pull request <https://github.com/ihmeuw/vivarium_research/pull/1922>`__
  - Transition rates, see `relevant changes to modeling strategy in this PR <https://github.com/ihmeuw/vivarium_research/pull/1926>`__. Data values for transition rates still to come as of 4/15/2026

- SAM treatment for complicated SAM 
- Protein energy malnutrition/mortality attributable to child wasting
- Mortality due to other causes 

.. _nutrition_optimization_extension2.2:

Scenario descriptions
-------------------------

**Baseline scenario:**

The child baseline scenario will be run using fertility input data from the baseline scenario of the pregnancy model and with baseline coverage of all modeled child interventions.

**Intervention scenarios:**

We will run all child simulation scenarios using fertility input data from a new scenario of the pregnancy simulation: ``mms_at_anc1`` where coverage of MMS is set to be equal to the proportion of ANC1 attendance according to the GBD covariate. 

There will be a total of 54 child intervention scenarios.

`Download this excel file for a list of intervention scenarios and their specified intervention coverage levels <scenario_map.xlsx>`.

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

.. list-table:: Model runs
  :header-rows: 1

  * - Run number
    - Run description
    - Scenarios
    - Specification modifications
    - Stratification modifications
    - Observer modifications
  * - 
    - 
    -  
    - 
    - 
    - 

.. list-table:: Model verification and validation tracking
   :widths: 3 10 20
   :header-rows: 1

   * - Run number
     - V&V criteria
     - V&V summary
   * -  
     - 
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



