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
  * - FHS
    - Future Health Scenarios

1.0 Overview
++++++++++++

This project leverages IHME's simulation capabilities to quantify health
and economic impacts associated with early detection and treatment of
pre-clinical Alzheimer's disease (AD). The simulation evaluates scenarios
involving blood-based biomarker (BBBM) testing and a hypothetical
intervention that slows disease progression.

**Basic Goals:**

- Simulate the patient journey from identification through intervention
  and outcomes
- Compare health and economic impacts across reference and alternative
  scenarios in 10 locations

**Funding and collaboration:**

We are designing this simulation in conjunction with IHME's Client
Services Unit (CSU) with a focus on health and economic impact. Our team
will focus on simulating the the health impacts of preclinical AD
testing and the hypothetical intervention, and a different team at IHME
will use our results to estimate the economic impacts. We will be using
population forecasts from the Future Health Scenarios (FHS) team.

2.0 Modeling Aims and Objectives
+++++++++++++++++++++++++++++++++

The primary goal is to simulate the impact of early detection strategies
for Alzheimer's disease using blood-based biomarkers and subsequent
interventions. The simulation tracks simulants through health states
from age ~30 to 125 years (or death), capturing progression through
preclinical AD, mild cognitive impairment (MCI) due to AD, and various
stages of clinical Alzheimer's disease.

2.1 Scenarios
-------------

1. **Reference Scenario:** Present-day conditions with minimal BBBM
   uptake or disease-modifying therapies, including current
   cerebrospinal fluid (CSF) and amyloid-positron emission tomography
   (PET) diagnostic pathways
2. **Alternative Scenario 1:** Introduction of BBBM testing for at-risk
   preclinical populations (no intervention)
3. **Alternative Scenario 2:** BBBM testing plus hypothetical
   intervention that prevents, delays, or slows disease progression

2.2 General Modeling Strategy
------------------------------

Things to include:

- Six-state progression model

  - Susceptible → Preclinical AD → MCI due to AD → Mild AD → Moderate AD
    → Severe AD
  - Only the last 3 stages will have data from GBD
  - From the GBD data, we will have to separate AD out from other
    dementias

- Use forecasted population

  - We have data on 'population', 'deaths', 'migration', and 'births'
    from FHS that can inform the population structure

- Only simulate people who will eventually get AD

  - This drastically reduces population size and hence compute resources
  - We will need to "work backwards" from GBD's Alzheimer's estimates
    and the population forecasts to
    determine how many people to add on each time step

- We're doing a test run with mock-ups of all components and a full
  population (not just simulants with AD) to get an idea of runtime

3.0 Simulation Components
++++++++++++++++++++++++++++++++++++

.. list-table:: Model Component Organization
  :header-rows: 1

  * - Module
    - Purpose
    - Key Features
    - Dependencies
  * - :ref:`Population Model <2024_vivarium_alzheimers_population_model>`
    - Population forecasting (2020-2100)
    - Fertility, mortality, migration modeling
    - None (foundational)
  * - :ref:`Alzheimer's Disease Model <2024_vivarium_alzheimers_disease_model>`
    - Core disease progression
    - 6-state progression, transition rates, mortality
    - Population model
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

4.0 Specifications
++++++++++++++++++

4.1 Default Simulation Parameters
------------------------------------

.. list-table:: Default Simulation Parameter Specifications
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

4.2 Scenario Details
------------------------

4.3 Outputs and Observers
--------------------------

5.0 Model Runs, Verification & Validation
++++++++++++++++++++++++++++++++++++++++++

5.1 Model Runs
------------------------

5.2 V & V Tracking
------------------------
