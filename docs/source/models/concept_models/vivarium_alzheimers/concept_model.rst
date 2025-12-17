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

.. _alz_scenarios:

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
  * - :ref:`Alzheimer's Disease Model <cause_alzheimers_disease>`
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

.. _2025_concept_model_vivarium_alzheimers_sim_parameter_specs:

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
    - Age at which preclinical AD starts (currently set to 25 years to
      accommodate the youngest preclinical AD incident cases)
    - Age start is simulant-dependent
  * - Age end (Initialization)
    - 125 years
    - End of oldest age group
  * - Age start (Observation)
    - Age at which preclinical AD starts (currently set to 25 years to
      accommodate the youngest preclinical AD incident cases)
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
  * - Step size
    - 182 days (~6 months)
    - Twice a year is sufficient to capture frequency of testing and
      disease progression. Model 1 used a step size of 182 days,
      resulting in 3 timesteps the first year, so we increased to 183
      days in model 2 to guarantee exactly 2 timesteps per year for all
      76 simulation years. In model 6.1, we switched back to 182 days
      but recorded "event time" in the observers instead of "current
      time." This effectively makes the first observation 182 days after
      the start of the simulation, so the first "timestep" on Jan 1,
      2025 doesn't count, and all simulation years are again guaranteed
      to contain exactly 2 timesteps.
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

.. _alz_observer_outputs:

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
  * - CSF/PET-eligible simulant count
    - Test state: CSF test received, PET test received, no test received, (negative) BBBM test received
    - Observe only simulants eligible for CSF/PET tests and stratify by test states to get test counts. 
      Simulants who are CSF/PET-eligible but whose test propensity value is >= (CSF testing rate + PET testing rate) will be 
      in either the no test received stratification or BBBM test received stratification (depending whether or not they have 
      received a negative BBBM test), since any CSF/PET eligible simulants with propensities < (CSF testing rate + PET testing rate)  
      will be immediately given one of those tests.
  * - BBBM test counts
    - Diagnosis provided (positive, negative). Treatement initiation decision (yes, no).
    - Diagnosis and treatment initiation both stratified under test count because they both happen immediately on test.
  * - BBBM newly test-eligibile simulant count
    - 
    - Count of simulants who are newly eligible for BBBM testing, based on the :ref:`BBBM eligibility requirements <bbbm_requirements>` (list in step 1).
      Newly eligible simulants could be incident to pre-clinical, turning 60, or reaching 3 years since their last test.
      Will be used to check simulation test counts per newly eligible
      simulant match Lilly annual year-specific test rates.
  * - Person-time eligible for BBBM testing
    - BBBM test result (positive, negative, not tested)
    -
  * - Person-time ever eligible for BBBM testing
    - Alzheimer's cause state (BBBM-AD, MCI-AD, AD-dementia); BBBM test
      result (positive, negative, not tested)
    - A simulant contributes to this person-time if they have ever been
      eligible for BBBM testing. We will use this observer to calculate
      (person-time ever BBBM tested) / (person-time ever BBBM
      test-eligible) among simulants between 60-80 in the BBBM-AD
      disease state. The numerator is obtained from the BBBM test result
      stratification by summing the person-time for simulants with
      positive or negative BBBM test results, and the denominator is the
      person-time summed over all test result strata including not
      tested.
  * - Treatment status transition counts
    - State transitioned to (`Full treatment effect`, `Waning treatment effect`, `No treatment effect`), 
      treatment completion (completed, discontinued)
    - Treatment completion stratification for transitions to `Full treatment effect` state allows us to validate the 10% discontinuation rate.
      Note that the diagram states `Full treatment effect LONG` and `Full treatment effect SHORT` are both considered the same status (`Full treatment effect`),
      but are stratified by completion status.
  * - Treatment status person-time
    - Status (`In treatment/ Waiting for treatment`, `Full treatment effect`, `Waning treatment effect`, `No treatment effect`).
      Also stratify by treatment completion (completed, discontinuated) from transition observer
    - Treatment completion stratification allows us to validate the different sized durations for completed/discontinued `Full` and `Waning` treatment statuses

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
    - :ref:`Simple SI model of AD <2021_cause_alzheimers_and_dementia>`
      using GBD data for AD and other dementias
    - Baseline
    - * Locations: USA, China
      * Cohort: Same population model as Model 0.0
    - Default
    - Default
  * - 2.0
    - Replace standard population components with :ref:`custom
      Alzheimer's population component
      <other_models_alzheimers_population>` to model only population
      with AD; use same :ref:`simple SI model of AD
      <2021_cause_alzheimers_and_dementia>` as Model 1.0, but with
      initial prevalence of AD equal to 1
    - Baseline
    - * Locations: USA, China
      * Change  step size from 182 days to 183 days
    - Default
    - Default
  * - 2.1
    - Replace old Alzhiemer's disease model with one where everyone is infected
    - Baseline
    - * Locations: USA, China
    - Default
    - Default
  * - 2.2
    - Fix incidence to be based on full population instead of suscpetible population in fertility
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
  * - 3.1
    - Use draws from forecasted population structure data rather than mean value
    - Baseline
    - * Locations: USA, China
    - Default
    - Default
  * - 4.0
    - Include BBBM-AD and MCI-AD states
    - Baseline
    - * Locations: USA, China
    - Default
    - Default
  * - 4.1
    - `Update MCI duration and MCI → AD transition rate to avoid
      negatives in older age groups
      <https://github.com/ihmeuw/vivarium_research/pull/1778>`_
    - Baseline
    - * Locations: All (Sweden, USA, China, Japan, Brazil, UK, Germany, Spain, Israel, Taiwan)
    - Default
    - Default
  * - 4.2
    - `Switch BBBM → MCI hazard to Weibull distribution
      <https://github.com/ihmeuw/vivarium_research/pull/1785>`_
    - Baseline
    - * Locations: USA
    - Default
    - Default
  * - 4.3
    - `Set population and AD-dementia incidence rates to zero on
      nonexistent older age groups instead of forward filling
      <https://github.com/ihmeuw/vivarium_csu_alzheimers/pull/37>`_
    - Baseline
    - * Locations: USA
    - Default
    - Default
  * - 4.4
    - `Use total-population incidence rate of AD-dementia in calculation
      of BBBM-AD incidence
      <https://github.com/ihmeuw/vivarium_csu_alzheimers/pull/38>`_  (we
      had been incorrectly using susceptible-population incidence)
    - Baseline
    - * Locations: USA
    - Default
    - Default
  * - 4.5
    - `Don't double round age when finding age group at midpoint of
      interval
      <https://github.com/ihmeuw/vivarium_csu_alzheimers/pull/39/files>`_
    - Baseline
    - * Locations: USA
    - Default
    - Default
  * - 5.0
    - `Replace incidence and prevalence with AD proportion of GBD 2023
      dementia envelope
      <https://github.com/ihmeuw/vivarium_research/pull/1800>`_
    - Baseline
    - * Locations: All (Sweden, USA, China, Japan, Brazil, UK, Germany,
        Spain, Israel, Taiwan)
    - Default
    - Default
  * - 6.0
    - Add testing (CSF/PET, BBBM) intervention
    - Baseline, Alternative Scenario 1
    - * Locations: All (Sweden, USA, China, Japan, Brazil, UK, Germany, Spain, Israel, Taiwan)
    - Default
    - Add test counts and testing eligibility observers
  * - 6.1
    - Add person-time observers for BBBM testing
    - Baseline, Alternative Scenario 1
    - * Locations: USA
      * Record "event time" in observers instead of "current time,"
        effectively making the first timestep 6 months after the
        simulation start date instead of on the start date, and change
        the step size back to 182 days to guarantee 2 timesteps per
        year
    - Stratify BBBM testing observers by semester so that we have one
      row of observation for every time step
    - * `Observe person-time of simulants eligible for BBBM testing
        <https://github.com/ihmeuw/vivarium_csu_alzheimers/pull/48>`_
      * `Observe person-time of simulants ever eligible for BBBM testing
        <https://github.com/ihmeuw/vivarium_csu_alzheimers/pull/49>`_
  * - 7.0
    - Add treatment (full, waning) intervention
    - Baseline, Alternative Scenario 1, Alternative Scenario 2
    - * Locations: All (Sweden, USA, China, Japan, Brazil, UK, Germany, Spain, Israel, Taiwan)
    - Stratify all BBBM testing and treatment observations by semester
    - Add treatment status transition and person-time observers
  * - 7.1
    - `Fix usage of propensities for testing, and stratify disease
      observers by treatment status
      <https://github.com/ihmeuw/vivarium_csu_alzheimers/pull/54>`_
    - Baseline, Alternative Scenario 1, Alternative Scenario 2
    - * Locations: USA, Spain
    - Stratify disease state transitions and person-time by treatment
      status
    - Default
  * - 7.2
    - `Fix bug with 80-year-olds entering "waiting for treatment" state
      <https://github.com/ihmeuw/vivarium_csu_alzheimers/pull/53>`_, and
      `fix bug in BBBM → MCI hazard rate
      <https://github.com/ihmeuw/vivarium_csu_alzheimers/pull/55>`_
    - Baseline, Alternative Scenario 2
    - * Locations: USA
    - Stratify disease state transitions and person-time by treatment
      status
    - Default
  * - 7.3
    - `Add BBBM testing history
      <https://github.com/ihmeuw/vivarium_csu_alzheimers/pull/57>`_
    - Baseline, Alternative Scenario 1, Alternative Scenario 2
    - * Locations: USA
    - Stratify disease state transitions and person-time by treatment
      status
    - Default
  * - 7.4
    - `Bugfix: Use conditional prevalence to initialize AD dementia state
      instead of unconditional prevalence
      <https://github.com/ihmeuw/vivarium_csu_alzheimers/pull/58>`_
    - Baseline, Alternative Scenario 1, Alternative Scenario 2
    - * Locations: USA
    - Stratify disease state transitions and person-time by treatment
      status
    - Default
  * - 7.5
    - `Bugfix: Don't initialize BBBM testing history in baseline
      scenario <https://github.com/ihmeuw/vivarium_csu_alzheimers/pull/60>`_
    - Baseline, Alternative Scenario 1, Alternative Scenario 2
    - * Locations: USA
    - Stratify disease state transitions and person-time by treatment
      status
    - Default
  * - 7.6
    - `Additional bug fixes for BBBM testing
      <https://github.com/ihmeuw/vivarium_csu_alzheimers/pull/60>`_
    - Baseline, Alternative Scenario 1, Alternative Scenario 2
    - * Locations: USA
      * Simulation end date: 2065-12-31
    - Stratify disease state transitions and person-time by treatment
      status
    - Default
  * - 8.0
    -
    -
    -
    -
    -
  * - 8.1
    -
    -
    -
    -
    -
  * - 8.2
    -
    -
    -
    -
    -
  * - 8.3
    -
    -
    -
    -
    -
  * - 8.4
    -
    -
    -
    -
    -
  * - 8.5
    -
    -
    -
    -
    -
  * - 8.6
    -
    -
    -
    -
    -
  * - 8.7
    -
    -
    -
    -
    -
  * - 9.0
    -
    -
    -
    -
    -

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
    - * No simulants were susceptible or transitioned as expected
      * EMR validated, but CSMR and ACMR did not which was expected, 
        see below for new mortality metrics to validate against
      * Similarly, YLLs and YLDs did not match as expected, 
        remove these moving forward
      * The number of new simulants entering the sim is correct in younger 
        age groups but incorrect in later ages. This is thought to be an 
        issue with incidence used in the sim.
      * Prevalence and real world pop have not been evaluated
    - https://github.com/ihmeuw/vivarium_research_alzheimers/blob/232bab04fff9591b4fb4a543199ce50091087d95/verification_and_validation/2025_08_12_model2.1_vv.ipynb
  * - 2.2
    - **Note:** All these checks can be done separately for each age
      group and sex, but it may be more prudent to start by looking at
      aggregated results.

      * Verify the number of new simulants per year against the :ref:`AD
        population model <other_models_alzheimers_population>`
      * Verify the prevalent simulants per year against the 
        :ref:`AD population model <other_models_alzheimers_population>`
      * Verify that all simulants in the model have AD (i.e., all
        recorded person-time is in the "AD" state, not the "susceptible"
        state)
      * Verify that there are no transitions between AD states during
        the simulation (since it's an SI model and all simulants should
        be in the I state the whole time)
      * Validate Alzheimer's EMR against artifact
      * Validate overall mortality (ACMR - CSMR + EMR) vs artifact
    - * No simulants were susceptible or transitioned as expected
      * EMR, total mortality rate and new sim incidence counts validated
      * Prevalence was correct on initialization but total sim pop and 
        prevalence increases for about 10 years before stabilizing. This 
        is thought to be due to issues with misalignment of incidence and 
        mortality in GBD data. We are moving to model 3 as pop values change 
        with forecasting in that sim.
    - https://github.com/ihmeuw/vivarium_research_alzheimers/blob/b042cdee74149371425c001cedb022e7f6b6a0c4/verification_and_validation/2025_08_14_model2.2_vv.ipynb
  * - 3.0
    - **Note:** All these checks can be done separately for each age
      group and sex, but it may be more prudent to start by looking at
      aggregated results.

      * Everything from 2.0, except use FHS values for ACMR in the overall mortality (ACMR - CSMR + EMR) vs artifact comparison
      * Verify that (ACMR - CSMR + EMR) decreases slightly from 2025 to 2050 and then levels off
      * Since there are so many (age groups, years, locations, sex) combinations that might be tested, it will be good enough to confirm that new simulant counts and total mortality rates line up for 2030, 2060, and 2090, and for two locations.
    - * The number of new simulants entering the sim matches the target number, which leads to a prevalence counts higher than estimated by GBD/FHS, but closer than in Model 2.
    - https://github.com/ihmeuw/vivarium_research_alzheimers/blob/32e7d3d44f540a9b9620b21b5a137f626631475c/verification_and_validation/2025_08_25b_model3.0_vv.ipynb
  * - 3.1
    - Same as 3.0 (notebook copied)
    - * Results are consistent with 3.0 results
    - https://github.com/ihmeuw/vivarium_research_alzheimers/blob/main/verification_and_validation/2025_09_05a_model3.1_vv.ipynb
  * - 4.0
    - All checks from 3.0, but instead of verifying all-cause mortality rate, use other-cause mortality rate, which is easier to compute; also confirm that there are person-years of BBBM-AD and MCI-AD for all age groups and years.
    - * AD-dementia Incidence counts in simulation exceed artifact values for younger ages
      * Zero incidence and prevalence of AD-dementia at oldest ages (due to bug with negative transition rates)
    - https://github.com/ihmeuw/vivarium_research_alzheimers/blob/8f7f48009ee36b65763d8103cc4c4182b52908f1/verification_and_validation/2025_09_05a_model4.0_vv.ipynb
  * - 4.1
    - Same as 4.0, but also look at durations of BBBM-AD, MCI-AD to make sure they match expectation.  Anticipate there to be more similarity between AD-dementia incidence counts in simulation and GBD/FHS.
    - * AD-dementia incidence counts still too high in younger ages
      * AD-dementia incidence counts now extremely high in older ages,
        likely due to forward filling BBBM incidence data for
        nonexistent age groups above 95--100
      * Plot of BBBM → MCI transition rate looks very weird
    - https://github.com/ihmeuw/vivarium_research_alzheimers/blob/290165c8190b2030db735f812cf2b0c02733ac30/verification_and_validation/2025_09_13a_model4.1_vv.ipynb
  * - 4.2
    - Same as 4.1
    - * Not much positive change to the AD-dementia incidence (still off
        in young ages, and now further off in old ages)
      * Plot of BBBM → MCI transition rate is somewhat improved
    - https://github.com/ihmeuw/vivarium_research_alzheimers/blob/290165c8190b2030db735f812cf2b0c02733ac30/verification_and_validation/2025_09_15a_model4.2_vv.ipynb
  * - 4.3
    - Same as 4.2
    - Big improvement in AD-dementia incidence for older ages, still off for younger ages
    - https://github.com/ihmeuw/vivarium_research_alzheimers/blob/290165c8190b2030db735f812cf2b0c02733ac30/verification_and_validation/2025_09_18b_model4.3_vv.ipynb
  * - 4.4
    - Same as 4.3
    - Some improvement in AD-dementia incidence for younger ages; we think that the duration we have used is off by a little since we did not include mortality in our duration estimate
    - https://github.com/ihmeuw/vivarium_research_alzheimers/blob/290165c8190b2030db735f812cf2b0c02733ac30/verification_and_validation/2025_09_18c_model4.4_vv.ipynb
  * - 4.5
    - Same as 4.4, except add this check that we should have been doing
      previously:

      * Compute prevalence of AD-dementia state alone (in addition to
        combined prevalence of all 3 disease states)
    - * AD-dementia incidence looks identical to 4.4, so the double
        rounding was perhaps not a problem after all
      * Prevalence counts of all 3 states combined look pretty good
      * The prevalence counts of the AD-dementia state alone is too low
        at the start of the sim, then becomes too high as time goes on
    - https://github.com/ihmeuw/vivarium_research_alzheimers/blob/1fdfff314c3abb0088a919dd9cdfa7bb8766710b/verification_and_validation/2025_09_18d_model4.5_vv.ipynb
  * - 5.0
    - Same as 4.5, except add this check that we should have been doing
      previously:

      * Check disability weights of MCI and AD-dementia by computing
        YLDs/person-time for each sex and age group
    - * AD-dementia incidence is still close but a bit off, similar to
        model 4.5
      * Prevalence of AD-dementia still starts off too low and then
        becomes too high
      * Disability weights computed from the sim are virtually identical
        to those stored in the artifact
    - * `Disease transition rates, mortality, incidence, prevalence
        <https://github.com/ihmeuw/vivarium_research_alzheimers/blob/1fdfff314c3abb0088a919dd9cdfa7bb8766710b/verification_and_validation/2025_09_24_model5.0_vv.ipynb>`__
      * `Disability weights
        <https://github.com/ihmeuw/vivarium_research_alzheimers/blob/1fdfff314c3abb0088a919dd9cdfa7bb8766710b/verification_and_validation/2025_10_01_model5.0_vv_dws.ipynb>`__
  * - 6.0
    - * Only eligible simulants are tested based on :ref:`PET/CSF <petcsf_requirements>` and :ref:`BBBM <bbbm_requirements>` testing requirements.
      * Location-specific CSF vs PET testing rates (CSF tests / PET tests = CSF rate / PET rate)
      * 90% sensitivity rate for BBBM tests (meaning 90% of simulants test positive, since they all have preclinical AD)
      * Year-stratified CSF/PET test counts per CSF/PET eligible person-year match location and time-specific rates
      * Year-stratified BBBM test count per newly eligible person count match time-specific rates
      * CSF/PET tests initialized properly - no testing spike for first time step
    - * CSF and PET testing rates in baseline scenario match artifact
        values
      * Baseline CSF and PET testing rates match between concept model
        and artifact
      * CSF and PET testing rates in BBBM testing scenario decrease as
        expected as BBBM tests scale up, but CSF tests always start
        decreasing **before** PET tests, which is likely due to the way
        the testing propensity was implemented (the desired behavior is
        that CSF and PET tests would be independent of each other and
        would start decreasing **simultaneously**)
      * BBBM tests only occur from ages 60 - 79 as expected
      * BBBM test rate, calculated as (count of BBBM tests) / (count of
        newly eligible simulants), spikes in 2030 as expected and then
        increases until 2045 as expected, but it levels off between 0.1
        and 0.2 in all countries, which is not close to our target value
        of 0.6. This is likely due to the lifetime propensities for
        testing, and we think we need to compute the test rate in a
        different way to validate the eventual testing coverage of 60%.
      * BBBM test sensitivity is 90% as expected
    - * `Testing
        <https://github.com/ihmeuw/vivarium_research_alzheimers/blob/1fdfff314c3abb0088a919dd9cdfa7bb8766710b/verification_and_validation/2025_10_03_model6.0_vv_testing.ipynb>`__
  * - 6.1
    - * Compute BBBM test rate as (count of tests) / (eligible
        person-time)
      * Compute fraction of simulants who have had BBBM tests as
        (person-time ever tested) / (person-time ever eligible)
    - * The means of CSF and PET testing rates in baseline still look
        good, but the uncertainty intervals look off (I didn't check the
        uncertainty in model 6.0)
      * Plots of (BBBM tests) / (eligible person-time) look similar to
        plots of (BBBM tests) / (counts of eligible simulants), so not
        vey helpful
      * Plots of (person-time ever tested) / (person-time ever eligible)
        look good when stratified by age group:

        * For each age group above age 60, the coverage increases
          monotonically and levels off at 60% coverage, which is the
          target
        * Age groups from 60 - 79 all have an immediate jump in 2030 as
          expected and follow identical patterns
        * Age groups above age 80 follow a similar pattern but have a
          time lag and don't show the initial jump -- this is also
          expected

      * Other checks look the same as in model 6.0
    - * `Testing
        <https://github.com/ihmeuw/vivarium_research_alzheimers/blob/1fdfff314c3abb0088a919dd9cdfa7bb8766710b/verification_and_validation/2025_10_08_model6.1_vv_testing.ipynb>`__
  * - 7.0
    - * Positive BBBM tests result in treatment initiation rates that match the year/location specific rates from :math:`I` in the :ref:`treatment intervention data table <alzheimers_intervention_treatment_data_table>`
      * 10% of transitions to `Full treatment effect` status are by simulants who discontinue treatment
      * Full/Waning durations are accurate (use person-time ratios between states?)
      * "In treatment/waiting for treatment" duration is accurate (use person-time ratios between states?)
      * Interactive sim verification spot checking a simulant's durations in treatment statuses as they move through 
        `BBBM test negative`, `Full treatment effect`, `Waning treatment effect`, `No treatment effect` statuses (for both completed and discontinued treatments)
      * Check hazard ratios for simulants who begin treatment and those who transition to `No treatment effect`
    - Things that look good:

      * Treatment coverage ramps up as expected
      * 10% of simulants discontinue treatment as expected
      * Ratio of person-time between disease states looks good, given
        that we can't predict exactly what this will look like in the
        observers (the person-time for the "waning effect long" state
        looks a bit low, but this is likely because a significant number
        of people die before they reach the end of this state)
      * Average treatment state durations for people entering or exiting
        each state look good (again, we can't predict these exactly
        because of deaths)
      * Averted deaths, YLLs, and YLDs all seem reasonable
      * In the interactive sim, the hazard ratio (RR) for the treatment
        effect looks correct
      * Treatment state durations look good in the interactive sim, but
        I didn't run it long enough to check the "waning effect long"
        state

      Things that look wrong:

      * I can't check the hazard ratio in the sim outputs because we
        didn't stratify disease state person-time or transitions by
        treatment status
      * Simulants in the 80-84 age group are entering the
        "start treatment" state (aka "waiting for treatment") when they
        shouldn't be
      * In the interactive sim, the MCI incidence probability looks like
        it's about half as big as it should be (we determined that the
        hazard rate was getting multiplied by the time step of ~0.5
        *twice* instead of once)
      * In the interactive sim, some simulants have an RR of 1.0 on the
        last time step of the "waning treatment effect" state, whereas
        the docs specify that this should not happen until the "no
        effect" state on the next time step (this was determined to be
        an off-by-one error due to a misinterpretation of the docs, but
        we decided to leave it as is to err on the side of less
        effective treatment)

    - * `Treatment
        <https://github.com/ihmeuw/vivarium_research_alzheimers/blob/85e167993e790ca561657a62c3d713630f89bc7a/verification_and_validation/2025_10_14_model7.0_vv_treatment.ipynb>`__
      * `Interactive sim
        <https://github.com/ihmeuw/vivarium_research_alzheimers/blob/85e167993e790ca561657a62c3d713630f89bc7a/verification_and_validation/2025_10_20_model7.0_interactive_sim.ipynb>`__
  * - 7.1
    - Same as model 7.0, but add:

      * Check relative risk of treatment on BBBM → MCI transition in
        observer output now that we have the necessary stratifications
      * Check that CSF and PET testing start decreasing at the same time
        when increasing BBBM testing, rather than CSF testing always
        decreasing first
    - * The relative risk of treatment on BBBM → MCI transition looks
        about right for the "treatment effect long" state, but is
        strangely wiggly in the "treatment effect short" state --- this
        may be an artifact of how the observers work
      * CSF and PET tests now decrease simultaneously as BBBM testing
        ramps up, as desired
    - * `Testing
        <https://github.com/ihmeuw/vivarium_research_alzheimers/blob/85e167993e790ca561657a62c3d713630f89bc7a/verification_and_validation/2025_10_22_model7.1_vv_testing.ipynb>`__
      * `Treatment
        <https://github.com/ihmeuw/vivarium_research_alzheimers/blob/85e167993e790ca561657a62c3d713630f89bc7a/verification_and_validation/2025_10_22_model7.1_vv_treatment.ipynb>`__
  * - 7.2
    - Same as model 7.1, but add:

      * Check that the 80-84 year-old age group has no transitions into
        the "waiting for treatment" state
      * Check BBBM → MCI hazard rate in observer output and interactive
        sim
      * Re-run V&V from models 4 and 5 to check disease state
        incidence, prevalence, etc.
    - * Transitions into the "waiting for treatment" state are now
        restricted to the age range 60-79 as desired
      * The BBBM → MCI hazard rate and the RR of treatment on this
        hazard both look reasonable in the observer output; I didn't
        check these in the interactive sim
      * The results of running the model 5 V&V notebook seem reasonable,
        but it's hard to tell exactly because the notebook was designed
        for the baseline scenario only and is probably adding together
        results from all three scenarios (I didn't have time to fix this
        yet)
    - * `Disease transition rates, mortality, incidence, prevalence
        <https://github.com/ihmeuw/vivarium_research_alzheimers/blob/85e167993e790ca561657a62c3d713630f89bc7a/verification_and_validation/2025_10_24_model7.2_vv.ipynb>`__
      * `Treatment
        <https://github.com/ihmeuw/vivarium_research_alzheimers/blob/85e167993e790ca561657a62c3d713630f89bc7a/verification_and_validation/2025_10_24_model7.2_vv_treatment.ipynb>`__
  * - 7.3
    - Re-run testing notebook from model 7.1. Things should look
      similar, but testing should ramp up slightly slower
    - There were several problems with the BBBM test history:

      * The baseline scenario had people entering with BBBM test history
      * The sensitivity now appears to be 80% instead of 90% -- it looks
        like negative tests from before the sim are getting counted by
        the observer, but we want to count just tests that occur
        *during* the sim
      * Our original idea of measuring the testing rate as (# tests) /
        (# newly eligible) or (# tests) / (eligible person-time) look
        closer to the mark of 60%
      * Our graphs of (person-time ever tested) / (person-time ever
        eligible) look very different from model 7.1, and I'm not sure
        why
    - * `Testing
        <https://github.com/ihmeuw/vivarium_research_alzheimers/blob/85e167993e790ca561657a62c3d713630f89bc7a/verification_and_validation/2025_10_28_model7.3_vv_testing.ipynb>`__
  * - 7.4
    - * Check initial prevalence of all three AD states
      * Re-check the other health metrics (incidence, prevalence,
        mortality, etc.) in the baseline scenario
    - Not checking directly since Abie's run included these changes;
      check model 8.1 instead
    - N/A
  * - 7.5
    - Skip, check 7.6 instead
    - Not checking since fixes were incomplete; check model 7.6 instead
    - N/A
  * - 7.6
    - Re-run testing notebook from model 7.3 to see if things look more
      like they did in 7.1
    - Things look good now, more like they did in model 7.1:

      * Baseline scenario no longer includes BBBM testing history
      * Sensitivity is back to 90% as expected
      * Plots of (person-time ever tested) / (person-time ever eligible)
        look very similar to how they did in model 7.1

      There are a few minor differences with model 7.1 that I'm not sure
      how to explain:

      * The BBBM testing rate measured as (# tests) / (# newly eligible)
        levels off just under 50%, compared to around 15% in model 7.1,
        and there's a similar pattern for (# tests) / (eligible
        person-time)
      * The number of newly eligible simulants remains flatter after the
        first couple years, and the number of new BBBM tests per year
        levels off at a higher value than in model 7.1
      * The fraction of newly eligible simulants with negative BBBM
        tests remains much smaller now, under 5% compared with leveling
        off at almost 15% in model 7.1

    - * `Testing
        <https://github.com/ihmeuw/vivarium_research_alzheimers/blob/85e167993e790ca561657a62c3d713630f89bc7a/verification_and_validation/2025_10_29_model7.6_vv_testing.ipynb>`__
  * - 8.0
    -
    -
    -
  * - 8.1
    -
    -
    -
  * - 8.2
    -
    -
    -
  * - 8.3
    -
    -
    -
  * - 8.4
    -
    -
    -
  * - 8.5
    -
    -
    -
  * - 8.6
    -
    -
    -
  * - 8.7
    -
    -
    -
  * - 9.0
    -
    -
    -

.. list-table:: Outstanding model verification and validation issues
  :header-rows: 1

  * - Issue
    - Explanation
    - Action plan
    - Timeline
  * - YLDs rates do not match in model 1
    - Thought to be due to incorrect disability weight aggregation
    - Will be updated when we add severity levels, recheck then
    - Model 9
  * - Total simulation population increasing in model 3
    - Thought to be due to GBD mismatch in mortality and incidence
    - Review again after we reduce to AD only, and when we add in mixed
      dementias
    - Models 5 and 8
  * - AD-dementia incidence counts are still a bit off in model 4
    - * AD-incidence by age appears shifted to the left by about 2.5
        years, making it too high in younger ages and too low in older
        ages. We think this is due to our average durations being too
        long because they don't account for mortality.
      * Also, AD incidence counts in 2025 are too high, likely because
        of our initialization strategy for the durations in BBBM-AD at
        time 0.
    - * Update durations of BBBM-AD and MCI-AD to account for mortality
        during those stages
      * Try using an exponential distribution instead of a uniform
        distribution when initializing durations

      Jira ticket: `SSCI-2411
      <https://jira.ihme.washington.edu/browse/SSCI-2411>`_
    - After model 8 or model 9

