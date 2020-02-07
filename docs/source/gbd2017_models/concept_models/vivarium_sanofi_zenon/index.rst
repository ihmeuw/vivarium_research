.. _2017_concept_model_vivarium_sanofi_zenon:

=====================================================
Vivarium - Sanofi - Zenon - Simulating lipid lowering
=====================================================

Model Overview
--------------

Objective
+++++++++

The objective is to model and simulate the Public Health Impact of fixed dose combination on LDL cholesterol and ASCVD (Ischemic heart disease, Ischemic stroke) in Brazil, China, France, Spain, and Russia. This includes the intervention targets of reducing deaths and DALYs due to Ischemic Heart Disease and Ischemic Stroke based on the intervention scenario. 

Intervention Definitions
++++++++++++++++++++++++

Business As Usual (BAU) scenario
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A baseline scenario projecting current treatment, patient adherence, and trends of LDL-c and ASCVD outcomes, for the current year and five years into the future. (2019-2024). This scenario will be used to compare the two subsequent scenarios.

2019 Guidelines with multiple pills scenario
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For each of the simulated populations/locations, IHME will run a counterfactual scenario in which all initial variables are identical to the BAU Scenario, but in which treatments follow the ESC 2019 Guidelines using individual components (i.e., multiple pills) for individuals meeting guideline criteria. The same treatment pathway will be applied to all countries based on ESC 2019 Guidelines. The guidelines propose a more proactive treatment than current treatment practices.

2019 Guidelines with combination single pill 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For each of the simulated populations/locations, IHME will run a counterfactual scenario in which all initial variables are identical to the Intervention Scenario 1, but in which treatments follow the ESC 2019 Guidelines using FDC rather than individual components for individuals meeting guideline criteria. This scenario would include an assumption about the increased adherence to single pill treatment compared to multiple pills. 

Questions of Interest
+++++++++++++++++++++


Scope of Modeling
+++++++++++++++++


Concept Model Diagram
---------------------

.. image:: zenon_concept_model_diagram.svg

Model Components
----------------

Time
++++

* Start and end year: **2020 -- 2024**
* Simulation time step: **28 days** to capture cardiovascular events and treatment timesteps

Demographics
++++++++++++

* Locations: **Brazil, China, France, Italy, Spain, Russia**
* Population: **Prospective open cohort of 40-74 year olds**
* Size of largest starting population: **100,000 simulants**
* Youngest start-age and oldest end-age: **30 - 100 years**
* Exit age (at what age to stop tracking simulants): **101 years**
* Fertility: **Not applicable**

GBD Causes
++++++++++

* :ref:`Ischemic Heart Disease <2017_cause_ischemic_heart_disease>`

* :ref:`Ischemic Stroke <2017_cause_ischemic_stroke>`

GBD Risks
+++++++++

* :ref:`High LDL cholesterol <2017_risk_high_ldl_c>`

PAF-of-1 Cause/Risk Pairs
+++++++++++++++++++++++++

* :ref:`Chronic Kidney Disease (CKD) / Impaired Kidney Function (IKF) <2017_cause_ckd>`

* Will add Diabetes Mellitus once PR is approved.

Risk-Outcome Relationships
++++++++++++++++++++++++++

Coverage Gap Framework
++++++++++++++++++++++

Interventions
+++++++++++++

2019 Guidelines with multiple pills
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

2019 Guidelines with combination single pill 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Desired Model Outputs
---------------------

.. list-table:: Desired Model Outputs
   :widths: 1, 5, 10, 5, 5, 30, 30
   :header-rows: 1

   * - Location name
     - Year
     - Subpopulations
     - Age group
     - Sex 
     - Scenario
     - Outcome
   * - Brazil 
     - 2020
     - Hypertension (SBP > 140 mmHg)
     - 40-44
     - Male 
     - Business As Usual (BAU)
     - All-cause mortality
   * - China
     - 2021
     - Diabetes (FPG > 7.0 mmol/L)
     - 45-49 
     - Female
     - 2019 Guidelines with multiple pills 
     - DALYs by all four causes 
   * - Italy 
     - 2022
     - Entire Population
     - 50-54
     - Both
     - 2019 Guidelines with combination single pill 
     - YLLS by all four causes
   * - France
     - 2023
     - Post-ACS
     - 55-59 
     - 
     - 
     - YLDs by all four causes
   * - Spain 
     - 2024
     - Treated, single drug
     - 60-64
     - 
     -
     - Mean, Standard Deviation for FPG, SBP, LDL-c 
   * - Russia
     - 
     - Treated, multiple drugs
     - 65-69
     -
     -
     - Treatment Coverage
   * -
     -
     - Not Treated
     - 70-74
     -
     -
     - Monotherapy vs. multiple pills
   * - 
     - 
     -
     - 75+
     -
     -
     - Percent achieving target LDL-c
   * -
     - 
     -
     - 40-74
     -
     -
     - CV risk score
   * -
     - 
     -
     - All ages
     -
     -
     - Proportion of people adherent
    
Stratification
++++++++++++++

Stratify by **location, age, sex, year, and Subpopulation (listed in Desired Model Outputs)**.

Observers
+++++++++

.. todo::

   Confirm with RT/SE teams if these are the correct observers or if any observers should be removed/added. I added 'FPGTimeSeries', SBPTimeSeries', and 'LDLCTimeSeries' observers to account for the need to be able to provide Mean LDL-C/SBP/FPG value per location/sex/age group/scenario.

- DisabilityObserver()
- MedicationObserver()
- DiseaseCountObserver('ischemic_heart_disease')
- DiseaseCountObserver('ischemic_stroke)
- DiseaseCountObserver('chronic_kidney_disease')
- DiseaseCountObserver('diabetes_mellitus')
- LDLCTimeSeriesObserver()
- FPGTimeSeriesObserver()
- SBPTimeSeriesObserver()
- SimulantTrajectoryObserver()
- LDLCMortalityObserver()

Verification and Validation Strategy
------------------------------------

#to-do- add verification & validation of model outputs against GBD estimates (initialization & forecast)
#to-do- add v&V of data input consistent with each other 