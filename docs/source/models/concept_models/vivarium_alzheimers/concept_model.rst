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
  * - Baseline (CSF/PET) test counts
    - * Eligiblity of person recieving test, based on the :ref:`PET/CSF eligibility requirements <petcsf_requirements>` (list in step 1).
    -
  * - BBBM test counts
    - * Diagnosis provided
      * Eligiblity of person recieving test, based on the :ref:`BBBM eligibility requirements <bbbm_requirements>` (list in step 1).
    -
  * - Baseline (CSF/PET) test-eligibile simulants
    - 
    - Number of simulants who are eligible for baseline (CSF/PET) testing, based on the :ref:`PET/CSF eligibility requirements <petcsf_requirements>` (list in step 1).
      Will be used to check that eligible simulants * test rate = test count, for each location-specific test rate.
  * - BBBM test-eligibile simulants
    - 
    - Number of simulants who are eligible for BBBM testing, based on the :ref:`BBBM eligibility requirements <bbbm_requirements>` (list in step 1).
      Will be used to check that eligible simulants * test rate = test count, for each year-specific test rate.

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
  * - 6.0
    - Add testing (CSF/PET, BBBM) intervention
    - Baseline, Alternative Scenario 1
    - * Locations: All (Sweden, USA, China, Japan, Brazil, UK, Germany, Spain, Israel, Taiwan)
    - Default
    - Add test counts and testing eligibility observers


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
    - Same as 4.4
    - AD-dementia incidence looks identical to 4.4, so the double rounding was perhaps not a problem after all
    - https://github.com/ihmeuw/vivarium_research_alzheimers/blob/9fef98e6cc61f4eb6dec96c2cd477e64cc084d3f/verification_and_validation/2025_09_18d_model4.5_vv.ipynb
  * - 6.0
    - * Only eligible simulants are tested based on :ref:`PET/CSF <petcsf_requirements>` and :ref:`BBBM <bbbm_requirements>` testing requirements.
      * Location-specific CSF vs PET testing rates (CSF tests / PET tests = CSF rate / PET rate)
      * 90% diagnostic rate for BBBM tests
      * Eligible simulants * test rate = test count, for each test type (baseline, BBBM) and location- or year-specific rate
      * CSF/PET tests initialized properly - no testing spike for first time step
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

