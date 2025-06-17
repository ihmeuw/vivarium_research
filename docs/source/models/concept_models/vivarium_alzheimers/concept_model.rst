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
   
   blood_biomarker_testing
   intervention_treatment
   care_pathways
   economic_impact

.. list-table:: Abbreviations
  :header-rows: 1

  * - Abbreviation
    - Definition
  * - AD
    - Alzheimer's Disease
  * - BBBM
    - Blood-Based Biomarkers
  * - MCI
    - Mild Cognitive Impairment
  * - DALYs
    - Disability-Adjusted Life Years
  * - CSU
    - Client Services Unit

1.0 Project Overview
+++++++++++++++++++++

This project leverages IHME's simulation capabilities to quantify health and economic impacts associated with early detection of pre-clinical Alzheimer's disease. The simulation evaluates scenarios involving blood-based biomarker (BBBM) testing and hypothetical interventions that prevent, delay, or slow disease progression.

**Project Aims:**

- Simulate the patient journey from identification through intervention and outcomes
- Compare health and economic impacts across reference and alternative scenarios
- Provide evidence for early detection strategies and disease-modifying therapies

**Funder Information:**
Client Services Unit project with focus on health and economic impact assessment across 10 priority locations.

**Similar Analyses:**
This builds upon existing Vivarium disease progression models while incorporating novel biomarker testing and early intervention components.

2.0 Modeling Aims and Objectives
+++++++++++++++++++++++++++++++++

The primary goal is to simulate the impact of early detection strategies for Alzheimer's disease using blood-based biomarkers and subsequent interventions. The model follows established microsimulation approaches for dementia research [Green2017]_ and evaluates three key scenarios:

1. **Reference Scenario:** Present-day conditions with minimal BBBM uptake or disease-modifying therapies, including current CSF and PET-based diagnostic pathways
2. **Alternative Scenario 1:** Introduction of BBBM testing for at-risk preclinical populations (no intervention)
3. **Alternative Scenario 2:** BBBM testing plus hypothetical intervention that prevents, delays, or slows disease progression

The simulation tracks simulants through health states from age 30 to 120 years (or death), capturing progression through preclinical AD, mild cognitive impairment, and various stages of clinical Alzheimer's disease. Disease progression modeling follows established approaches with approximately 15-year spans from early pathology to severe dementia [Jedynak2012]_.

3.0 Concept Model and Submodels
++++++++++++++++++++++++++++++++

3.1 Core Disease Progression Model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

The core disease model represents Alzheimer's disease progression through six distinct health states, following established Markov modeling approaches for neurodegenerative diseases [Sukkar2013]_:

.. list-table:: Health State Definitions
  :widths: 15 30
  :header-rows: 1

  * - State
    - Definition
  * - Susceptible
    - Individual with no AD pathology, normal cognitive function
  * - Preclinical AD
    - Biomarker-positive for AD pathology but cognitively normal
  * - MCI due to AD
    - Mild cognitive impairment attributable to Alzheimer's disease
  * - Mild AD
    - Early-stage dementia with functional impairment
  * - Moderate AD
    - Progressive cognitive and functional decline
  * - Severe AD
    - Advanced dementia requiring full-time care

.. list-table:: Transition Rate Definitions
  :widths: 10 20 30
  :header-rows: 1

  * - Symbol
    - Name
    - Definition
  * - i_preclinical
    - Preclinical incidence rate
    - Rate at which individuals develop AD biomarker positivity
  * - i_mci
    - Progression to MCI rate
    - Rate of progression from preclinical to MCI due to AD
  * - i_mild
    - Progression to mild AD rate
    - Rate of progression from MCI to mild dementia
  * - i_moderate
    - Progression to moderate AD rate
    - Rate of progression from mild to moderate AD
  * - i_severe
    - Progression to severe AD rate
    - Rate of progression from moderate to severe AD

3.2 Blood-Based Biomarker Testing Model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. graphviz::

  digraph bbbm_testing {
      rankdir = TD;
      node [shape=box];
      
      eligible [label="Eligible Population\n(Age 30-44)"];
      tested [label="Tested\n(5% annual uptake)"];
      positive [label="Test Positive\n(80% sensitivity)"];
      negative [label="Test Negative"];
      diagnosed [label="Diagnosed\nPreclinical AD"];
      
      eligible -> tested [label="5% annually"];
      tested -> positive [label="True positive:\nSens = 0.80"];
      tested -> negative [label="True/False negative"];
      positive -> diagnosed [label="Direct diagnosis\n(includes false positives)"];
  }

The biomarker testing component models:

- **Eligibility:** Population aged 30-44 years
- **Uptake:** 5% annual testing rate
- **Test Performance:** 95% sensitivity and 90% specificity, based on current blood biomarker research [Janelidze2023]_
- **Independence:** Repeated testing events are independent
- **Diagnosis Pathway:** Positive tests lead directly to preclinical AD diagnosis (includes false positives)

3.3 Intervention and Treatment Model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The intervention model applies to individuals with confirmed preclinical AD diagnosis:

.. list-table:: Intervention Parameters
  :widths: 15 15 30
  :header-rows: 1

  * - Parameter
    - Value
    - Description
  * - Treatment Initiation
    - 80%
    - Probability of starting treatment upon diagnosis
  * - Effectiveness
    - 20% reduction
    - Reduction in disease progression rates based on lecanemab trials [vanDyck2023]_
  * - Discontinuation
    - 10% annually
    - Rate of treatment discontinuation per year

**Mechanism:** Treatment reduces all progression rates (i_mci, i_mild, i_moderate, i_severe) by 20% for adherent individuals. This effectiveness estimate is derived from recent clinical trials of disease-modifying therapies [vanDyck2023]_, while the economic framework follows established cost-effectiveness methodologies [ICER2023]_.

4.0 Data Requirements and Sources
+++++++++++++++++++++++++++++++++

4.1 Core Epidemiological Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Primary Data Needs:**

- Alzheimer's-specific incidence, prevalence, and mortality rates (separate from "Alzheimer's and other dementias")
- Duration of each health state and progression rates between states
- Age-, sex-, and location-specific transition rates
- Healthcare utilization data by disease stage (see :ref:`Care Pathways <alzheimers_care_pathways>` for detailed requirements)

**Key Questions for CSU:**

- Availability of Alzheimer's-only forecasts vs. combined dementia estimates
- Granularity of available epidemiological data (incidence, prevalence, CSMR vs. DALYs only)
- State duration estimates for model calibration

4.2 Intervention Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Biomarker Testing:**

- Test performance characteristics by demographic groups
- Uptake rates considering supply-side constraints, validated against recent cost-effectiveness studies [Fan2024]_
- Temporal trends in testing availability and performance

**Treatment Effectiveness:**

- Progression rate reductions by disease stage, informed by recent clinical trials [vanDyck2023]_
- Adherence and discontinuation patterns
- Heterogeneity by population characteristics

5.0 Simulation Specifications
+++++++++++++++++++++++++++++

.. list-table:: Default Simulation Specifications
  :header-rows: 1

  * - Parameter
    - Value
    - Note
  * - Locations
    - 10 priority locations: France, Germany, Italy, Spain, UK, US, China, Japan, Mexico, India
    - To be confirmed with client
  * - Time Horizon
    - 2020-2100
    - 80-year simulation period
  * - Age Range (Initialization)
    - 0-120 years
    - Open cohort model for long simulation period
  * - Age Range (Observation)
    - 30-120 years
    - Focus on ages when testing and intervention relevant
  * - Population Size per Draw
    - 100,000 simulants
    - Sufficient for rare disease modeling
  * - Number of Draws
    - 100 draws
    - Captures parameter uncertainty
  * - Timestep
    - 1 month
    - Supports precise progression modeling
  * - Randomness Key Columns
    - ['entrance_time', 'age', 'sex']
    - Ensures reproducibility across scenarios

5.1 Location Description
~~~~~~~~~~~~~~~~~~~~~~~~

The simulation covers 10 priority locations representing diverse global regions:

- **High-income countries:** France, Germany, Italy, Spain, UK, US, Japan
- **Middle-income countries:** China, Mexico, India

These locations provide variation in healthcare systems, demographic structures, and economic contexts relevant to biomarker testing and intervention implementation. The multi-location approach enables validation against international prevention studies [Ngandu2015]_ and global economic assessments [Wimo2023]_.

5.2 Scenario Descriptions
~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table:: Simulation Scenarios
  :header-rows: 1

  * - Scenario
    - BBBM Testing
    - CSF/PET Testing
    - Intervention
    - Description
  * - Reference
    - Minimal/None
    - Current levels
    - Minimal/None
    - Current standard of care including CSF and PET-based diagnosis
  * - Alternative 1
    - 5% annual uptake (age 30-44)
    - Current levels
    - None
    - BBBM testing without intervention
  * - Alternative 2
    - 5% annual uptake (age 30-44)
    - Current levels
    - 80% initiation, 20% effectiveness
    - BBBM testing plus disease-modifying treatment

6.0 Key Outputs and Observers
+++++++++++++++++++++++++++++

6.1 Health Outcomes
~~~~~~~~~~~~~~~~~~~

**Primary Outputs:**

- Cases in each health state by year, age group, sex, and diagnosis status
- Disease progression rates and transitions between states
- Disability-adjusted life years (DALYs) by scenario
- Identified preclinical population size and characteristics

**Economic Inputs for Translation:**

- Number of diagnostic tests performed
- Treatment person-years by state and scenario
- Healthcare utilization patterns
- Caregiver burden metrics, which we will compare with existing economic burden estimates [Prada2023]_

6.2 Stratification Variables
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

All outputs stratified by:

- Age group (5-year bands)
- Sex
- Location
- Diagnosis status (for preclinical states)
- Scenario
- Year

7.0 Verification & Validation (V&V) Tracking
+++++++++++++++++++++++++++++++++++++++++++++

.. list-table:: Model Runs
  :header-rows: 1

  * - Run
    - Description
    - Scenarios
    - Specification Modifications
    - Note
  * - 1.0
    - Baseline disease progression model
    - Reference only
    - Default
    - Establish disease natural history
  * - 2.0
    - BBBM testing implementation
    - Reference, Alternative 1
    - Default
    - Validate testing pathway
  * - 3.0
    - Full intervention model
    - All scenarios
    - Default
    - Complete model validation

.. list-table:: Model Verification and Validation Tracking
  :header-rows: 1

  * - Run
    - V&V Criteria
    - V&V Summary
  * - 1.0
    - Validate disease progression rates against ADNI cohort data [Jedynak2012]_; confirm 15-year progression span from preclinical to severe AD
    - TBD
  * - 2.0
    - Confirm testing uptake (5%) and diagnostic accuracy (80% sens/spec) match specifications; compare with real-world blood biomarker performance [Janelidze2023]_
    - TBD
  * - 3.0
    - Verify intervention effects (20% reduction) align with lecanemab trial results [vanDyck2023]_; validate cost-effectiveness against ICER benchmarks [ICER2023]_
    - TBD

8.0 Links to Model Components
+++++++++++++++++++++++++++++

- :ref:`Blood-Based Biomarker Testing <alzheimers_bbbm_testing>`
- :ref:`Intervention and Treatment <alzheimers_intervention_treatment>`
- :ref:`Care Pathways <alzheimers_care_pathways>`
- :ref:`Economic Impact Assessment <alzheimers_economic_impact>`

9.0 Limitations and Assumptions
++++++++++++++++++++++++++++++++

**Key Limitations:**

- Assumes independence between repeated biomarker tests
- Treatment effectiveness modeled as uniform reduction across progression rates
- Economic analysis requires external cost inputs
- Limited data on Alzheimer's-specific (vs. all-dementia) epidemiology

**Critical Assumptions:**

- Biomarker test performance remains constant over time
- Treatment adherence patterns are homogeneous within populations
- Disease progression rates are linear and constant within states
- Healthcare access and quality consistent within locations

10.0 References and Literature Review
++++++++++++++++++++++++++++++++++++++

10.1 Key References for Model Validation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Simulation Modeling and Disease Progression:**

.. [Green2017] Green C, et al. "Machine learning and microsimulation techniques on the prognosis of dementia: A systematic literature review." *BMC Medical Informatics and Decision Making* 2017; 17:88. 
   
   **Application:** External validation of our microsimulation approach and disease progression modeling structure. This systematic review provides benchmarks for microsimulation models in dementia and identifies best practices for model validation.

.. [Jedynak2012] Jedynak BM, et al. "A computational neurodegenerative disease progression score: method and results with the Alzheimer's disease neuroimaging initiative cohort." *NeuroImage* 2012; 63(3):1478-86.
   
   **Application:** Validation of disease progression timing and trajectory modeling. Their 15-year span from subjective cognitive deficits to severe dementia provides external validation targets for our transition rates.

.. [Sukkar2013] Sukkar R, et al. "Disease progression modeling using Hidden Markov Models." *Conference proceedings : Annual International Conference of the IEEE Engineering in Medicine and Biology Society* 2013; 2013:2845-8.
   
   **Application:** Methodological validation of our Markov-based disease progression model structure and parameter estimation approaches.

**Blood Biomarker Testing and Economic Evaluation:**

.. [Janelidze2023] Janelidze S, et al. "Highly accurate blood test for Alzheimer's disease is similar or superior to clinical cerebrospinal fluid tests." *Nature Medicine* 2024; 30:1085–1095.
   
   **Application:** Validation of blood biomarker test performance parameters (90% accuracy) and comparison with our assumed 80% sensitivity/specificity. Provides real-world benchmarks for diagnostic accuracy.

.. [Fan2024] Fan LY, et al. "Cost-effectiveness comparison between blood biomarkers and conventional tests in Alzheimer's disease diagnosis." *Current Opinion in Psychiatry* 2024; 37(2):118-124.
   
   **Application:** External validation of our economic evaluation framework and cost-effectiveness calculations. Their Monte Carlo simulation approach with 10,000 iterations validates our probabilistic sensitivity analysis methods.

**Early Intervention and Treatment Effects:**

Treatment effectiveness validation uses clinical trial evidence showing 27% reduction in cognitive decline [vanDyck2023]_, providing external validation for our assumed 20% progression rate reduction. Direct methodological validation through simulation modeling [Long2022]_ provides comparative framework for our treatment pathway modeling. Cost-effectiveness benchmarks [ICER2023]_ provide validation for health economic evaluation methods.

**Population Health and Prevention Models:**

Population-level intervention modeling validation uses lifetime Markov model evidence [Wimo2023]_ showing prevention of 1,623 dementia cases per 100,000 people, providing population impact benchmarks.

.. [Ngandu2015] Ngandu T, et al. "A 2 year multidomain intervention of diet, exercise, cognitive training, and vascular risk monitoring versus control to prevent cognitive decline in at-risk elderly people (FINGER): a randomised controlled trial." *The Lancet* 2015; 386(9996):829-840.
   
   **Application:** Validation of intervention uptake rates and population-level effectiveness. Provides real-world evidence for multidomain intervention approaches that can inform our treatment uptake assumptions.

**Healthcare Utilization and Economic Burden:**

Healthcare utilization and economic burden validation uses comprehensive cost-of-illness studies [Hurd2013]_ providing baseline cost structure and healthcare utilization patterns by disease stage. Caregiver burden estimates [Prada2023]_ validate our economic impact calculations with $599 billion annually in productivity losses.

.. [ICER2023] Institute for Clinical and Economic Review. "Lecanemab for Early Alzheimer's Disease: Final Evidence Report." April 2023.
   
   **Application:** Validation of intervention cost-effectiveness modeling and health economic evaluation methods. Provides benchmarks for cost per DALY averted calculations.

.. [Prada2023] Prada SI, et al. "Indirect Costs of Alzheimer's Disease: Unpaid Caregiver Burden and Patient Productivity Loss." *Value in Health* 2024; 27(6):759-767.
   
   **Application:** Validation of our economic impact calculations, particularly caregiver burden ($599 billion annually) and productivity losses. Provides stage-specific cost validation targets.

10.2 Model Validation Framework
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**External Validation Targets:**

- Disease progression rates from ADNI cohort studies [Jedynak2012]_
- Blood biomarker performance from clinical validation studies [Janelidze2023]_
- Treatment effectiveness from RCT evidence [vanDyck2023]_
- Economic outcomes from published cost-effectiveness studies [ICER2023]_
- Population health impacts from prevention trials [Wimo2023]_

**Methodological Validation:**

- Microsimulation approach validated against systematic review findings [Green2017]_
- Economic evaluation methods benchmarked against ICER standards [ICER2023]_
- Markov modeling structure compared with published AD progression models [Long2022]_

**Cross-Model Comparison:**

- Direct comparison with lecanemab simulation model results [Long2022]_
- Benchmarking against FINGER trial economic evaluation [Wimo2023]_
- Validation of cost structures against dementia economic burden studies [Prada2023]_