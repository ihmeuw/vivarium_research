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

.. _2025_concept_model_vivarium_alzheimers:

===============================================
Alzheimer's Disease Early Detection Simulation
===============================================

.. contents::
  :local:
  :depth: 1

.. toctree::
   :maxdepth: 1
   :hidden:
   
   data_challenges_note
   alzheimers_disease_model/module_document
   population_model/module_document
   testing_diagnosis_model/module_document
   treatment_model/module_document
   economic_impact_model/module_document

.. list-table:: Abbreviations
  :header-rows: 1

  * - Abbreviation
    - Definition
  * - AD
    - Alzheimer's Disease
  * - BBBM
    - Blood-Based Biomarkers
  * - CSF
    - Cerebrospinal Fluid
  * - MCI
    - Mild Cognitive Impairment
  * - PET
    - Positron Emission Tomography
  * - DALYs
    - Disability-Adjusted Life Years
  * - CSU
    - Client Services Unit

1.0 Project Overview
+++++++++++++++++++++

This project leverages IHME's simulation capabilities to quantify health and economic impacts associated with early detection and treatment of pre-clinical Alzheimer's disease. The simulation evaluates scenarios involving blood-based biomarker (BBBM) testing and hypothetical interventions that prevent, delay, or slow disease progression.

**Project Aims:**

- Simulate the patient journey from identification through intervention and outcomes
- Compare health and economic impacts across reference and alternative scenarios
- Provide evidence for early detection strategies and disease-modifying therapies

**Funder Information:**
IHME Client Services Unit (CSU) project with focus on health and economic impact assessment across 10 locations.

2.0 Modeling Aims and Objectives
+++++++++++++++++++++++++++++++++

The primary goal is to simulate the impact of early detection strategies for Alzheimer's disease using blood-based biomarkers and subsequent interventions. The model follows established microsimulation approaches for dementia research and evaluates three key scenarios:

1. **Reference Scenario:** Present-day conditions with minimal BBBM uptake or disease-modifying therapies, including current cerebrospinal fluid (CSF) and amyloid-positron emission tomography (PET) diagnostic pathways
2. **Alternative Scenario 1:** Introduction of BBBM testing for at-risk preclinical populations (no intervention)
3. **Alternative Scenario 2:** BBBM testing plus hypothetical intervention that prevents, delays, or slows disease progression

The simulation tracks simulants through health states from age 30 to 120 years (or death), capturing progression through preclinical AD, mild cognitive impairment, and various stages of clinical Alzheimer's disease.

3.0 Core Model Components
+++++++++++++++++++++++++

3.1 Disease Progression Framework
---------------------------------

.. graphviz::

  digraph alzheimers_progression {
      rankdir = TD;
      node [shape=box];
      
      susceptible [label="Susceptible\n(No AD pathology)"];
      preclinical [label="Preclinical AD\n(Biomarker positive)"];
      mci [label="MCI due to AD\n(Mild symptoms)"];
      mild [label="Mild AD\n(Early dementia)"];
      moderate [label="Moderate AD\n(Progressive decline)"];
      severe [label="Severe AD\n(Advanced dementia)"];
      
      susceptible -> preclinical [label="i_preclinical"];
      preclinical -> mci [label="i_mci"];
      mci -> mild [label="i_mild"];
      mild -> moderate [label="i_moderate"];
      moderate -> severe [label="i_severe"];
  }

The core disease model represents Alzheimer's disease progression through six distinct health states, following established Markov modeling approaches. Disease progression spans approximately 15 years from early pathology to severe dementia.

**Key Features:**
- Six-state progression model (Susceptible → Preclinical AD → MCI → Mild → Moderate → Severe AD)
- Age-, sex-, and location-specific transition rates
- Mortality integration at each stage
- ~15-year progression span from preclinical to severe stages

3.2 Testing and Diagnosis Framework
-----------------------------------

The testing framework incorporates both existing diagnostic methods and blood-based biomarker screening:

**Blood-Based Biomarker Testing:**
- Target population: Ages 30-44 years
- 5% annual uptake rate
- 95% sensitivity, 90% specificity
- Direct pathway to preclinical AD diagnosis

**Existing Diagnostic Pathways:**
- CSF biomarker testing (reference scenario)
- Amyloid-PET imaging (reference scenario)
- Symptomatic diagnosis pathways

**Testing Correlation:**
- Blood biomarkers: 75-85% correlation over 5-year periods
- CSF testing: 70-80% correlation
- PET imaging: 85-90% correlation

3.3 Treatment Framework
-----------------------

The intervention model simulates hypothetical disease-modifying therapy:

**Treatment Parameters:**
- 80% initiation rate among diagnosed individuals
- 20% reduction in all disease progression rates
- 10% annual discontinuation rate
- Immediate effect upon treatment initiation

**Evidence Base:**
Based on lecanemab clinical trial results showing 27% reduction in cognitive decline, conservatively modeled as 20% progression rate reduction.

3.4 Economic Framework
----------------------

The economic model captures comprehensive costs across disease stages:

**Cost Components:**
- Direct healthcare costs (medical services, medications)
- Long-term care costs (formal care services)
- Informal care costs (80% of total economic burden)
- Productivity losses (patient and caregiver)
- Intervention costs (testing and treatment programs)

**Key Insight:**
Direct medical spending represents only 20% of total dementia costs. Informal care provided by family and friends accounts for 80% of economic impact, totaling $224 billion annually in unpaid care costs.

4.0 Module Organization
+++++++++++++++++++++++

.. list-table:: Model Component Organization
  :header-rows: 1

  * - Module
    - Purpose
    - Key Features
    - Dependencies
  * - :ref:`Alzheimer's Disease Model <2024_vivarium_alzheimers_disease_model>`
    - Core disease progression
    - 6-state progression, transition rates, mortality
    - Population model
  * - :ref:`Population Model <2024_vivarium_alzheimers_population_model>`
    - Population forecasting (2020-2100)
    - Fertility, mortality, migration modeling
    - None (foundational)
  * - :ref:`Testing/Diagnosis Model <2024_vivarium_alzheimers_testing_diagnosis_model>`
    - BBBM and existing testing pathways
    - Multi-modal testing, correlation modeling
    - Disease model, population model
  * - :ref:`Treatment Model <2024_vivarium_alzheimers_treatment_model>`
    - Hypothetical disease-modifying therapy
    - Progression rate reduction, adherence
    - Disease model, testing model
  * - :ref:`Economic Impact Model <2024_vivarium_alzheimers_economic_impact_model>`
    - Cost-effectiveness analysis
    - Comprehensive cost modeling, ICER calculations
    - All other modules

5.0 Simulation Specifications
+++++++++++++++++++++++++++++

.. list-table:: Default Simulation Specifications
  :header-rows: 1

  * - Parameter
    - Value
    - Note
  * - Locations
    - 10 priority locations: France, Germany, Italy, Spain, UK, US, China, Japan, Mexico, India
    - Diverse global regions
  * - Time Horizon
    - 2020-2100
    - 80-year simulation period
  * - Age Range (Initialization)
    - 0-120 years
    - Open cohort model
  * - Age Range (Observation)
    - 30-120 years
    - Focus on testing-relevant ages
  * - Population Size per Draw
    - 100,000 simulants
    - Sufficient for rare disease modeling
  * - Number of Draws
    - 100 draws
    - Captures parameter uncertainty
  * - Timestep
    - 1 month
    - Precise progression modeling
  * - Randomness Key Columns
    - ['entrance_time', 'age', 'sex']
    - Ensures reproducibility

6.0 Key Outputs and Stratification
+++++++++++++++++++++++++++++++++++

**Primary Health Outcomes:**
- Cases in each health state by year, age group, sex, and diagnosis status
- Disease progression rates and transitions between states
- Disability-adjusted life years (DALYs) by scenario
- Time to diagnosis and treatment metrics

**Economic Outcomes:**
- Healthcare spending by service category and payer
- Informal care costs and caregiver burden
- Productivity losses by sector and age group
- Cost-effectiveness ratios and net monetary benefits

**Stratification Variables:**
All outputs stratified by age group (5-year bands), sex, location, diagnosis status, scenario, and year.

7.0 Verification & Validation Framework
++++++++++++++++++++++++++++++++++++++++

.. list-table:: Model Verification and Validation Tracking
  :header-rows: 1

  * - Component
    - V&V Criteria
    - External Validation Targets
  * - Disease Progression
    - 15-year progression span validation
    - ADNI cohort data (Jedynak et al. 2012)
  * - Testing Implementation
    - 5% uptake, 95%/90% sensitivity/specificity
    - Clinical validation studies (Janelidze et al. 2024)
  * - Treatment Effects
    - 20% progression reduction validation
    - Lecanemab trial results (van Dyck et al. 2023)
  * - Economic Outcomes
    - Cost-effectiveness ratio validation
    - ICER benchmarks (ICER 2023)

8.0 Data Challenges and Implementation Notes
+++++++++++++++++++++++++++++++++++++++++++++

**Critical Data Requirements:**
- Alzheimer's-specific (not combined dementia) epidemiological data
- Stage-specific cost profiles, especially for preclinical AD
- Population forecasting data for 80-year time horizon
- Location-specific healthcare utilization patterns

**Key Implementation Decisions:**
- Population-based forecasting approach (vs. Future Health Scenarios)
- Custom Alzheimer's-only cause definition
- Simplified testing uptake modeling
- Uniform treatment effectiveness across disease stages

For detailed discussion of data challenges, see :ref:`Data Challenges Note <alzheimers_data_challenges>`.

9.0 Links to Model Components
+++++++++++++++++++++++++++++

- :ref:`Alzheimer's Disease Progression Model <2024_vivarium_alzheimers_disease_model>`
- :ref:`Population Forecasting Model <2024_vivarium_alzheimers_population_model>`
- :ref:`Testing and Diagnosis Model <2024_vivarium_alzheimers_testing_diagnosis_model>`
- :ref:`Treatment Model <2024_vivarium_alzheimers_treatment_model>`
- :ref:`Economic Impact Model <2024_vivarium_alzheimers_economic_impact_model>`
- :ref:`Data Challenges Note <alzheimers_data_challenges>`

10.0 References
+++++++++++++++

**Methodology Validation:**

External validation uses established microsimulation approaches for dementia research, ~15-year disease progression timing from ADNI cohort studies, blood biomarker performance from clinical validation studies (90% diagnostic accuracy), and treatment effectiveness from lecanemab trial results (27% cognitive decline reduction).

**Economic Validation:**

Cost-effectiveness methodology follows ICER standards with validation against established dementia economic burden studies showing informal care represents 80% of total costs.

.. [vanDyck2023] van Dyck CH, et al. "Lecanemab in Early Alzheimer's Disease." *New England Journal of Medicine* 2023; 388(1):9-21.

.. [ICER2023] Institute for Clinical and Economic Review. "Lecanemab for Early Alzheimer's Disease: Final Evidence Report." April 2023.