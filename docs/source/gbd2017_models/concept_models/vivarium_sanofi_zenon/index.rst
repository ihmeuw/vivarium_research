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

A baseline scenario projecting current treatment (per location), patient adherence, and trends of LDL-c and ASCVD outcomes, for the current year and five years into the future. (2019-2024). This scenario will be used to compare the two subsequent scenarios. The definition of adherence is the probability of a patient taking their medication 80% of the time. The proportion of patients that are adherent come from literature. More detailed information about adherence and probability of prescription given are included in the Data Artifact and subsequent to change during the development of the Zenon project.

2019 Guidelines with multiple pills scenario
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For each of the simulated populations/locations, IHME will run a counterfactual scenario in which all initial variables are identical to the BAU Scenario, but in which treatments follow the ESC 2019 Guidelines using individual components (i.e., multiple pills) for simulants meeting guideline criteria. The same treatment pathway will be applied to all countries based on ESC 2019 Guidelines. The guidelines propose a more proactive treatment than current treatment practices. More information about this scenario and associated adherence to multiple pills treatment can be found in the Treamtent Ramp below and is included in the Data Artifact.

2019 Guidelines with combination single pill 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For each of the simulated populations/locations, IHME will run a counterfactual scenario in which all initial variables are identical to '2019 Guidelines with multiple pills scenario', but in which treatments follow the ESC 2019 Guidelines using FDC rather than individual components for simulants meeting guideline criteria. This scenario would include an assumption about the increased adherence to single pill treatment compared to multiple pills. More information about this scenario and the increased adherence to single pill treatment can be found in the Treamtent Ramp below and is included in the Data Artifact.

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

* Start and end date: **Jan 1, 2020 -- Dec 31, 2024**
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

* :ref:`Diabetes Mellitus (DM) / Fasting Plasma Glucose (FPG) <_2017_cause_diabetes_mellitus>`

Risk-Outcome Relationships
++++++++++++++++++++++++++

Coverage Gap Framework
++++++++++++++++++++++

Eligible to Treatment Criteria
++++++++++++++++++++++++++++++

Simulants who are eligible to treatment fall in the criteria of: Starting age group of 40 years old or greater. No new treatment would be given to simulants over 75 years old but they continue treatment. 

We will assign treatment to new simulant patients who are currently not on treatment but meet the treatment criteria, based on scenario, and simulants who are currently on treatment but have had a CVD event or meet the treatment criteria to increase dosage. Treatment is not a one-time treatment but is a continuing treatment over 5 years. During the 5 year simulation, treatment for a patient may stay constant or may ramp up, based on the simulant and their LDL-c level, SBP level, or if they have had a CVD event. 

Utilization estimates used in this model are for the average number of outpatient healthcare visits, which will inform the treatment ramp of when a patient will seek care through a visit and get their LDL-c levels measured. The utilization rates are based on GHDx_, 'Global Inpatient and Outpatient Health Care Utilization, Unit Costs, and Costs and Services Needed to Achieve Universal Health Coverage 1990-2016'.

.. _GHDx: http://ghdx.healthdata.org/record/ihme-data/UHC-cost-and-services-2016

Interventions
+++++++++++++

2019 Guidelines with multiple pills
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

2019 Guidelines with combination single pill 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Treatment Ramp
++++++++++++++

Business As Usual (BAU) Scenario
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. image:: bau_treatment_ramp.svg

Intervention Scenarios (Both scenarios illustrated)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. image:: intervention_scenarios_treatment_ramp.svg


Desired Model Outputs
---------------------

.. list-table:: Desired Model Outputs
   :widths: 1, 5, 10, 5, 5, 30, 30, 20
   :header-rows: 1

   * - Location name
     - Year
     - Subpopulations
     - Age group
     - Sex 
     - Scenario
     - Outcome
     - Outcome Metric
   * - Brazil 
     - 2020
     - Hypertension (SBP > 140 mmHg)
     - 40-44
     - Male 
     - Business As Usual (BAU)
     - All-cause mortality
     - Rate per 100k 
   * - China
     - 2021
     - Diabetes (FPG > 7.0 mmol/L)
     - 45-49 
     - Female
     - 2019 Guidelines with multiple pills 
     - DALYs by all four causes 
     - Rate per 100k
   * - Italy 
     - 2022
     - Entire Population
     - 50-54
     - Both
     - 2019 Guidelines with combination single pill 
     - YLLS by all four causes
     - Rate per 100k
   * - France
     - 2023
     - Post-ACS
     - 55-59 
     - 
     - 
     - YLDs by all four causes
     - Rate per 100k
   * - Spain 
     - 2024
     - Treated, single drug
     - 60-64
     - 
     -
     - Mean, Standard Deviation for FPG
     - mmol/L
   * - Russia
     - 
     - Treated, multiple drugs
     - 65-69
     -
     -
     - Treatment Coverage
     - Percent 
   * -
     -
     - Not Treated
     - 70-74
     -
     -
     - Monotherapy vs. multiple pills
     - Percent
   * - 
     - 
     -
     - 75+
     -
     -
     - Population achieving target LDL-c
     - Percent 
   * -
     - 
     -
     - 40-74
     -
     -
     - CV risk score
     - Number
   * -
     - 
     -
     - 40-100
     -
     -
     - Proportion of people adherent
     - Percent
   * - 
     - 
     - 
     - 
     -
     -
     - Deaths by four causes
     - Rate per 100k
   * - 
     - 
     -
     -
     -
     -
     - Mean, Standard Deviation for SBP 
     - mmHg 
   * - 
     -
     -
     -
     -
     -
     - Mean, Standard Deviation for LDL-c level
     - mmol/ L
    
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