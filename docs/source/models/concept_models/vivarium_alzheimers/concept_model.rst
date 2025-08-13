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
  * - computed tomography
    - CT
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
  * - ACMR
    - All-Cause Mortality Rate
  * - CSMR
    - Cause-Specific Mortality Rate
  * - EMR
    - Excess Mortality Rate
  * - CBR
    - Crude Birth Rate
  * - YLD
    - Years Lived with Disability
  * - YLL
    - Years of Life Lost

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
testing and the hypothetical intervention, and the Resource Tracking
team will use our results to estimate the economic impacts. We will be
using population forecasts from the Future Health Scenarios (FHS) team.

2.0 Modeling Aims and Objectives
+++++++++++++++++++++++++++++++++

The primary goal is to simulate the impact of early detection and treatment strategies
for Alzheimer's disease using blood-based biomarkers and subsequent
interventions. The simulation tracks simulants through health states
from age ~30 to 125 years (or death), capturing progression through
preclinical AD, mild cognitive impairment (MCI) due to AD, and three
stages of dementia due to Alzheimer's disease.

2.1 Scenarios
-------------

1. **Reference Scenario:** Present-day conditions, including current
   cerebrospinal fluid (CSF), computed tomography (CT), amyloid-positron emission tomography
   (PET) diagnostic pathways after clinical disease develops, but with
   no BBBM uptake or disease-modifying therapies.
2. **Alternative Scenario 1:** Introduction of BBBM testing for at-risk
   preclinical populations (no intervention)
3. **Alternative Scenario 2:** BBBM testing plus hypothetical
   intervention that prevents, delays, or slows disease progression

2.2 General Modeling Strategy
------------------------------

Based on literature and GBD, we conceive of Alzheimer's disease (AD) as
comprising a six-stage progression:

  **Susceptible → Preclinical AD → MCI due to AD → Mild AD → Moderate AD
  → Severe AD**

The last three stages correspond to a portion of the three sequelae (mild, moderate,
severe) of the GBD cause "Alzheimer's disease and other dementias." We
will have to separate AD out from other dementias in the GBD data, and
we will need non-GBD data sources to inform our modeling of preclinical
AD and MCI due to AD. Furthermore, reality may be a bit more complicated
than the simple one-directional progression depicted above, but the
assumption of no recovery from any state might be sufficient for our
purposes.

The basic plan for the design of the simulation is as follows:

- Use forecasted population estimates

  - We have data on 'population', 'deaths', 'migration', and 'births'
    from FHS that can inform the age structure in the population out to
    year 2100; we plan to use population and deaths forecasts, but not
    migration or births
  - Based on GBD data, the incidence of AD within each age group is
    pretty stable over time, so we are **not** planning on using
    forecasted data for Alzheimer's disease

- Only simulate people who will eventually get AD (and other dementias (?))

  - This drastically reduces population size and hence compute resources
  - We will need to "work backwards" from GBD's Alzheimer's estimates
    and the population forecasts to
    determine how many people to add on each time step
  - We will need to do some calculations outside the simulation to
    account for false positive tests and people who don't progress from
    preclinical AD or MCI to dementia due to AD

- On top of the population model, we will add an Alzheimer's disease
  progression model, a testing and diagnosis model, and a treatment
  model, as detailed in the next section

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
  :widths: 5 7 7

  * - Parameter
    - Value
    - Note
  * - Locations
    - Sweden, US, China, Japan, Brazil, UK, Germany, Spain, Israel, Taiwan
    - 10 locations of interest
  * - Simulation start date
    - 2025-01-01
    -
  * - Simulation end date
    - 2100-12-31
    - 76-year simulation period
  * - Observation start date
    - 2025-01-01
    - No burn-in period
  * - Cohort type
    - Open
    - Cohort consists of simulants who are in any of the 5 stages of
      Alzheimer's disease
  * - Sex
    - Males & Females
    -
  * - Age start (Initialization)
    - Age at which preclinical AD starts (~30 years or later)
    - Age start is simulant-dependent
  * - Age end (Initialization)
    - 125 years
    - End of oldest age group
  * - Age start (Observation)
    - Age at which preclinical AD starts (~30 years or later)
    - All simulants are observed since all have AD or its precursors
  * - Age end (Observation)
    - 125 years or death
    -
  * - Initial population size per draw
    - 100,000 simulants
    -
  * - Number of Draws
    - 25 draws
    -
  * - Timestep
    - 183 days (~6 months)
    - Twice a year is sufficient to capture frequency of testing and
      disease progression. Model 1 used a timestep of 182 days,
      resulting in 3 timesteps the first year, so we increased to 183 to
      guarantee exactly 2 timesteps per year for all 76 simulation
      years.
  * - Randomness key columns
    - ['entrance_time', 'age', 'sex']
    - There should be no need to modify the standard key columns

4.2 Scenario Details
------------------------

.. list-table:: Scenario details
  :header-rows: 1

  * - Scenario
    - Columns with more details go here
    - Note
  * - 0. Baseline (Reference)
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

Default stratifications for all observations:

* Year
* Sex
* Age group

Additionally, all output should automatically be stratified by location,
scenario, and input draw.

.. list-table:: Outputs of simulation observers
  :header-rows: 1

  * - Observation
    - Stratification modifications
    - Note
  * - Number of new simulants each year
    -
    - Either births or new Alzheimer's cases, depending on population
      model
  * - Deaths and YLLs (cause-specific)
    -
    -
  * - YLDs (cause-specific)
    -
    -
  * - Transition counts between Alzheimer's cause states
    -
    -
  * - Person-time in each Alzheimer's cause state
    -
    -

5.0 Model Runs and Verification & Validation
+++++++++++++++++++++++++++++++++++++++++++++

5.1 Model Runs
------------------------

.. _2025_alzheimers_model_runs_table:

.. list-table:: Model run requests
  :header-rows: 1

  * - Run
    - Description
    - Scenarios
    - Specification mods
    - Stratification mods
    - Observer mods
  * - 0.0
    - Speed test with fake data but full population and mock-ups of all
      components to test runtime
    - Custom scenario including three types of Alzheimer's testing and a
      hypothetical treatment
    - * Locations: United States (USA)
      * Cohort: Open cohort simulating entire population (including
        susceptible simulants, not just simulants who will get AD) in
        all age groups; simulants enter at age = 0 using crude birth
        rate
    - Default
    - Use (mostly) standard VPH observers:

      * Mortality and Disability observers
      * Disease observer for Alzheimers
      * Custom observer for Alzheimer's testing (based on
        DiseaseObserver)
      * CategoricalInterventionObserver for Alzheimer's treatment
  * - 1.0
    - Simple SI model of AD using GBD data for AD and other dementias
    - Baseline
    - * Locations: USA, China
      * Cohort: Same population model as Model 0.0
    - Default
    - Default
  * - 2.0
    - Replace standard population components with :ref:`custom
      Alzheimer's population component
      <other_models_alzheimers_population>` to model only population
      with AD
    - Baseline
    - * Locations: USA, China
    - Default
    - Default
  * - 2.1
    - Replace old Alzhiemer's disease model with one where everyone is infected
    - Baseline
    - * Locations: USA, China
    - Default
    - Default
  * - 3.0
    - Replace population and mortality data with forecasts from IHME's FHS team
    - Baseline
    - * Locations: USA, China
    - Default
    - Default

5.2 V & V Tracking
------------------------

.. list-table:: V&V Tracking
  :header-rows: 1

  * - Run
    - V&V plan
    - V&V summary
    - Link to notebook
  * - 0.0
    - Check runtime of simulation. No other V&V since data was fake.
    - ~15 minutes to complete parallel runs of 100 jobs with 20K
      simulants each (2 million total simulants, equivalent to 20 draws
      with 100K simulants each)
    - None
  * - 1.0
    - **Note:** All these checks can be done separately for each age
      group and sex, but due to the large number of age groups, it may
      be more prudent to start by looking at aggregated results.

      * Verify crude birth rate (CBR) against GBD
      * Verify ACMR against GBD
      * Validate Alzheimer's CSMR against GBD
      * Verify Alzheimer's incidence rate against GBD
      * Validate Alzheimer's prevalence against GBD
      * Validate Alzheimer's EMR against GBD
      * Validate Alzheimer's YLLs and YLDs against GBD
      * Check whether overall population remains stable over time
      * Check whether Alzheimer's prevalence remains stable over time
      * For comparison with model 2, calculate total "real world"
        Alzheimer's population over time as :math:`p_\text{AD}(t) \cdot
        X_t / S`, where :math:`p_\text{AD}(t)` is prevalence of AD at
        time :math:`t`, :math:`X_t` is the simulated population at time
        :math:`t`, and :math:`S = X_{2025}` / (real total population in
        2025) is the model scale
    - * Birth observer was missing, so we couldn't verify CBR
      * Total population per draw was 200k instead of 100k, and there
        were 10 draws instead of 25
      * Timestep was 182 days, resulting in 3 timesteps in 2025, making
        population counts 1.5 times what they should be in 2025; we'll
        change the timestep to 183 days for future models
      * Total population decreased monotonically during the 76 years of
        the sim from 200k to about 170k in USA and about 125k in China
      * Prevalence, incidence, EMR, CSMR, ACMR, and YLLs all validated to 
        artifact values and remained stable over time  
      * YLDs were above GBD values for both locations. We should look into 
        disability weights to see if there is a bug. 
    -   https://github.com/ihmeuw/vivarium_research_alzheimers/blob/b84ad4c959ad6a0ef5957250c17ef36dba23b190/verification_and_validation/2025_08_12_model1_vv.ipynb 
  * - 2.0
    - **Note:** All these checks can be done separately for each age
      group and sex, but it may be more prudent to start by looking at
      aggregated results.

      * Verify the number of new simulants per year against the :ref:`AD
        population model <other_models_alzheimers_population>`
      * Use interactive sim to verify initial population structure
        against the :ref:`AD population model
        <other_models_alzheimers_population>`
      * Verify that all simulants in the model have AD (i.e., all
        recorded person-time is in the "AD" state, not the "susceptible"
        state)
      * Verify that there are no transitions between AD states during
        the simulation (since it's an SI model and all simulants should
        be in the I state the whole time)
      * Verify ACMR against GBD
      * Validate Alzheimer's CSMR against GBD
      * Validate Alzheimer's EMR against GBD
      * Validate Alzheimer's YLLs and YLDs against GBD
      * For comparison with model 1, calculate total "real world"
        Alzheimer's population over time as :math:`X_t / S`, where
        :math:`X_t` is the simulated population at time :math:`t`, and
        :math:`S = X_{2025}` / (real population with AD in 2025) is the
        model scale (I'm not sure how closely we expect this to match
        model 1)
    - * There are simulants in susceptible and who transition from susceptible 
        to infected. This is incorrect.
      * Because of this, incidence and prevalence have not been evaluated 
      * ACMR, CSMR, EMR, YLLs are all correct 
      * The issues with YLDs is still present, as expected
    - https://github.com/ihmeuw/vivarium_research_alzheimers/blob/28c884aa7628819fe5ee03248c9a488d5c7eb340/verification_and_validation/2025_08_12_model2_vv.ipynb
  * - 2.1
    - **Note:** All these checks can be done separately for each age
      group and sex, but it may be more prudent to start by looking at
      aggregated results.

      * Verify the number of new simulants per year against the :ref:`AD
        population model <other_models_alzheimers_population>`
      * Use interactive sim to verify initial population structure
        against the :ref:`AD population model
        <other_models_alzheimers_population>`
      * Verify that all simulants in the model have AD (i.e., all
        recorded person-time is in the "AD" state, not the "susceptible"
        state)
      * Verify that there are no transitions between AD states during
        the simulation (since it's an SI model and all simulants should
        be in the I state the whole time)
      * Verify ACMR against GBD
      * Validate Alzheimer's CSMR against GBD
      * Validate Alzheimer's EMR against GBD
      * Validate Alzheimer's YLLs and YLDs against GBD
      * For comparison with model 1, calculate total "real world"
        Alzheimer's population over time as :math:`X_t / S`, where
        :math:`X_t` is the simulated population at time :math:`t`, and
        :math:`S = X_{2025}` / (real population with AD in 2025) is the
        model scale (I'm not sure how closely we expect this to match
        model 1)
    - 
    - 
  * - 3.0
    - **Note:** All these checks can be done separately for each age
      group and sex, but it may be more prudent to start by looking at
      aggregated results.

      * Everything from 2.0, except do not verify ACMR against GBD here
      * Verify ACMR against FHS
      * Since there are so many (age groups, years, locations, sex) combinations that might be tested, it will be good enough to confirm that new simulant counts and all-cause mortality rates line up for 2030, 2060, and 2090, and for two locations.
    -
    -
