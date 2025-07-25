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
stages of dementia due to Alzheimer's disease.

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

Some key points:

- Based on literature and GBD, we conceive of Alzheimer's disease (AD)
  as comprising a six-state progression:

  - **Susceptible → Preclinical AD → MCI due to AD → Mild AD → Moderate AD
    → Severe AD**
  - Only the last 3 stages (dementia due to AD) will have data from GBD
  - From the GBD data, we will have to separate AD out from other
    dementias
  - Reality seems a bit more complicated than this simple linear
    progression, but assumption of no recovery, etc., might be
    sufficient for our purposes

- Use forecasted population

  - We have data on 'population', 'deaths', 'migration', and 'births'
    from FHS that can inform the population structure
  - Based on GBD data, the incidence of AD within each age group is
    pretty stable over time, so we are **not** planning on using
    forecasted data for Alzheimer's disease

- Only simulate people who will eventually get AD

  - This drastically reduces population size and hence compute resources
  - We will need to "work backwards" from GBD's Alzheimer's estimates
    and the population forecasts to
    determine how many people to add on each time step
  - We will need to do some calculations outside the simulation to
    account for false positive tests and people who don't progress from
    preclinical AD or MCI to dementia due to AD

- We're doing a test run with mock-ups of all components and a full
  population (not just simulants with AD) to get an idea of runtime

3.0 Simulation Components
++++++++++++++++++++++++++++++++++++

.. list-table:: Simulation Components
  :header-rows: 1

  * - Component
    - Purpose
    - Main Features
    - Dependencies
  * - :ref:`Population Model <other_models_alzheimers_population>`
    - Evolution of simulant demographics over time
    - Influx of incident cases of preclinical AD, aging of simulants,
      all-cause mortality
    - Forecasted population data, age-specific incidence rates of
      preclinical AD
  * - :ref:`Alzheimer's Disease Model <2021_cause_alzheimers_disease>`
    - Disease progression
    - Transition rates through 6 stages of AD, cause-specific mortality
    - Population model
  * - :ref:`Testing/Diagnosis Model <intervention_alzheimers_testing_diagnosis>`
    - BBBM and existing testing pathways
    - Multi-modal testing, correlation between testing and disease
      progression
    - Disease model, population model
  * - :ref:`Treatment Model <intervention_hypothetical_alzheimers_treatment>`
    - Hypothetical disease-modifying therapy
    - Reduction in progression rate, adherence
    - Disease model, testing model
  * - Economic Impact model
    - Cost-effectiveness analysis
    - Comprehensive cost modeling, ICER calculations
    - All other modules

4.0 Specifications
++++++++++++++++++

4.1 Default Parameter Specifications
------------------------------------

.. list-table:: Default Simulation Parameter Specifications
  :header-rows: 1

  * - Parameter
    - Value
    - Note
  * - Locations
    - Sweden, US, China, Japan, Brazil, UK, Germany, France, Italy,
      Spain
    - 10 locations of interest
  * - Time Horizon
    - 2020-2100
    - 80-year simulation period
  * - Age Range (Initialization)
    - ~30-125 years
    - Open cohort of simulants who are in any of the 5 stages of
      Alzheimer's disease
  * - Age Range (Observation)
    - ~30-125 years
    - All simulants are observed since all have AD or its precursors
  * - Population Size per Draw
    - 100,000 simulants
    -
  * - Number of Draws
    - 25 draws
    -
  * - Timestep
    - 6 months
    - Twice a year is sufficient to capture frequency of testing and
      disease progression
  * - Randomness Key Columns
    - ['entrance_time', 'age', 'sex']
    - There should be no need to modify the standard key columns

4.2 Scenario Details
------------------------

.. list-table:: Scenario details
  :header-rows: 1

  * - Scenario
    - Columns with more details go here
    - Note
  * - 0. Reference
    -
    -
  * - 1. Testing scale-up (Alternative 1)
    -
    -
  * - 2. Treatment scale-up (Alternative 2)
    -
    -

4.3 Outputs and Observers
--------------------------

.. list-table:: Outputs of simulation observers
  :header-rows: 1

  * - Observation
    - Default stratifications
    - Note
  * -
    -
    -

5.0 Model Runs and Verification & Validation
+++++++++++++++++++++++++++++++++++++++++++++

5.1 Model Runs
------------------------

.. list-table:: Model run requests
  :header-rows: 1

  * - Number
    - Description
    - Scenarios
    - Directory
    - Specification mods
    - Stratification mods
    - Observer mods
  * - 0.0
    - Mock-up run with full population and fake data to test runtime
    -
    -
    -
    -
    -

5.2 V & V Tracking
------------------------

.. list-table:: V&V Tracking
  :header-rows: 1

  * - Model number
    - V&V plan
    - V&V summary
    - Link to notebook
  * -
    -
    -
    -
