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

.. _2024_vivarium_alzheimers_disease_model:

======================================
Alzheimer's Disease Progression Model
======================================

.. contents::
  :local:
  :depth: 2

1.0 Overview
++++++++++++

This module implements the core Alzheimer's disease progression model, tracking individuals through six distinct health states from susceptibility to severe dementia. The model captures disease incidence, progression dynamics, and mortality across the full disease spectrum with age-, sex-, and location-specific parameters.

2.0 Module Objectives
+++++++++++++++++++++

**Primary Objectives:**
- Model natural history of Alzheimer's disease progression
- Provide foundation for intervention impact assessment
- Generate accurate prevalence and incidence estimates
- Support economic burden calculations through stage-specific outcomes

**Key Features:**
- 6-state disease progression model
- Monthly transition probabilities
- Age/sex/location-specific rates
- Separate Alzheimer's-specific mortality
- ~15-year total progression timeline

3.0 Disease State Framework
++++++++++++++++++++++++++++

3.1 Health States Definition
-----------------------------

.. list-table:: Alzheimer's disease health states
  :header-rows: 1

  * - State
    - Definition
    - Duration (Years)
    - Key Characteristics
  * - **Susceptible**
    - No evidence of AD pathology
    - Lifelong (until transition)
    - Normal cognitive function
  * - **Preclinical AD**
    - Biomarker positive, cognitively normal
    - ~5-7 years
    - Detectable by blood biomarkers
  * - **MCI due to AD**
    - Mild cognitive impairment from AD
    - ~3-4 years
    - Cognitive decline, functional independence
  * - **Mild AD**
    - Early-stage dementia
    - ~2-3 years
    - Mild functional impairment
  * - **Moderate AD**
    - Mid-stage dementia
    - ~2-3 years
    - Significant functional decline
  * - **Severe AD**
    - Late-stage dementia
    - ~2-3 years
    - Complete functional dependence

3.2 Transition Pathways
-----------------------

**Unidirectional Progression:**
- Susceptible → Preclinical AD → MCI due to AD → Mild AD → Moderate AD → Severe AD
- No reverse transitions or state skipping
- Death possible from any state (with state-specific mortality rates)

**Transition Rate Framework:**
- Monthly transition probabilities calculated from annual rates
- Age-specific acceleration of progression
- Sex differences in transition rates
- Location-specific variations in progression patterns

4.0 Module Diagram and Data
+++++++++++++++++++++++++++++++

4.1 Module Inputs
------------------

.. list-table:: Module required inputs
  :header-rows: 1

  * - Input
    - Source
    - Application
    - Note
  * - AD incidence rates
    - Custom AD-specific GBD analysis
    - Susceptible → Preclinical AD transitions
    - Age/sex/location-specific
  * - Progression transition rates
    - Literature synthesis + calibration
    - Between-state transitions
    - Based on ADNI cohort studies
  * - Stage-specific mortality rates
    - GBD + literature
    - Excess mortality by AD stage
    - Relative to background mortality
  * - Background population
    - Population model module
    - Denominators for prevalence
    - Age/sex/year-specific
  * - Treatment effects
    - Treatment model module
    - Modified transition rates
    - Applied to treated individuals

4.2 Module Outputs
-------------------

.. list-table:: Module outputs
  :header-rows: 1

  * - Output
    - Value
    - Application
    - Note
  * - A. Disease prevalence by state
    - Count by age/sex/location/year
    - Epidemiological outcomes
    - Monthly updates
  * - B. Disease incidence by transition
    - Rate by age/sex/location/year
    - New cases entering each state
    - Basis for screening program evaluation
  * - C. Disease progression events
    - Count by transition type
    - Treatment effect assessment
    - Intervention impact measurement
  * - D. AD-specific mortality
    - Rate by disease state
    - Excess mortality calculation
    - Separate from background mortality
  * - E. Person-years by state
    - Time-at-risk by disease stage
    - Economic burden calculations
    - Stage-specific cost application
  * - F. Disability-adjusted life years
    - DALYs by disease state
    - Health outcome measurement
    - Years of life lost + years lived with disability

5.0 Model Implementation Strategy
+++++++++++++++++++++++++++++++++

5.1 Transition Rate Modeling
-----------------------------

**Age-Specific Progression:**
- Base transition rates by age group (5-year bands)
- Exponential or power law acceleration with age
- Calibration to observed age-specific prevalence
- Sex-specific modifiers for progression speed

**Monthly Probability Calculation:**
- Convert annual rates to monthly probabilities
- Rate-to-probability formula: p = 1 - exp(-rate × timestep)
- Competing risks framework for multiple possible transitions
- Proper handling of death probability alongside progression

5.2 Incidence Modeling
----------------------

**Preclinical AD Incidence:**
- Age-specific incidence rates from literature
- Peak incidence in 60s-70s age range
- Sex differences (higher rates in women)
- Location-specific adjustments based on risk factor prevalence

**Validation Targets:**
- Age-specific prevalence matching GBD estimates
- Progression timeline validation against ADNI data
- Mortality rate validation against excess mortality literature

5.3 Mortality Integration
-------------------------

**AD-Specific Mortality:**
- Stage-specific excess mortality rates
- Hazard ratios relative to background mortality
- Increasing mortality risk with disease progression
- Competing risk with non-AD mortality

**Implementation Framework:**
- Susceptible/Preclinical: Minimal excess mortality
- MCI due to AD: Slightly elevated mortality
- Mild AD: Moderate excess mortality (HR ~1.5-2.0)
- Moderate AD: High excess mortality (HR ~2.5-3.5)
- Severe AD: Very high excess mortality (HR ~4.0-6.0)

6.0 Data Requirements and Calibration
++++++++++++++++++++++++++++++++++++++

6.1 Primary Data Sources
-------------------------

**Incidence and Prevalence:**
- Custom GBD analysis separating AD from other dementias
- Jaimie Steinmetz's clinical dementia subtype estimates
- Literature-based AD-specific incidence rates
- Population-based cohort studies

**Progression Rates:**
- ADNI (Alzheimer's Disease Neuroimaging Initiative) cohort data
- Jedynak et al. (2012) progression timing analysis
- Clinical trial natural history data
- Biomarker progression studies

**Mortality Data:**
- GBD excess mortality estimates
- Clinical cohort mortality follow-up
- Nursing home mortality data
- Competing risk analysis

6.2 Calibration Strategy
------------------------

**Target Matching:**
- Age-specific prevalence by disease stage
- Total AD prevalence matching GBD estimates
- Disease duration distributions
- Mortality rate validation

**Calibration Parameters:**
- Base transition rates by age group
- Age acceleration parameters
- Sex-specific rate modifiers
- Location-specific adjustments

**Validation Metrics:**
- Prevalence by age/sex/location/year
- Incidence rate trajectories
- Mean disease duration by stage
- Excess mortality rates

7.0 Location-Specific Implementation
++++++++++++++++++++++++++++++++++++

7.1 High-Income Countries
--------------------------

**Locations:** France, Germany, Italy, Spain, UK, US, Japan

**Characteristics:**
- Well-documented disease progression
- High-quality healthcare systems
- Earlier diagnosis and intervention
- Extensive biomarker validation data

**Model Adjustments:**
- Standard progression rates
- Higher baseline diagnostic rates
- Earlier intervention opportunities
- Comprehensive mortality data

7.2 Middle-Income Countries
---------------------------

**Locations:** China, Mexico, India

**Characteristics:**
- Emerging AD research infrastructure
- Varying healthcare access
- Different risk factor profiles
- Limited biomarker availability

**Model Adjustments:**
- Adjusted progression rates for risk factor differences
- Lower baseline diagnostic rates
- Limited intervention access
- Adapted mortality patterns

8.0 Validation Framework
++++++++++++++++++++++++

8.1 Epidemiological Validation
-------------------------------

**Prevalence Validation:**
- Age-specific prevalence curves
- Sex-specific prevalence ratios
- Location-specific prevalence patterns
- Time trends in prevalence (if available)

**Incidence Validation:**
- Age-specific incidence curves
- Peak incidence timing
- Cumulative incidence by age
- Transition rate validation

8.2 Natural History Validation
-------------------------------

**Disease Duration:**
- Total disease duration (~15 years)
- Stage-specific duration distributions
- Progression timeline validation
- Survival analysis comparison

**Mortality Validation:**
- Excess mortality by disease stage
- Age-specific mortality ratios
- Competing risk validation
- Life expectancy calculations

9.0 Model Assumptions and Limitations
+++++++++++++++++++++++++++++++++++++

9.1 Key Assumptions
-------------------

**Disease Progression:**
- Unidirectional progression through states
- Homogeneous progression within age/sex groups
- Stable disease rates over time
- Independent competing risks

**Population Dynamics:**
- Stable age/sex-specific incidence rates
- Consistent healthcare access within locations
- Uniform diagnostic criteria application
- No major changes in disease definition

9.2 Known Limitations
---------------------

**Biological Complexity:**
- Simplified disease heterogeneity
- No modeling of mixed pathologies
- Limited genetic risk factor integration
- Simplified biomarker relationships

**Healthcare System Variation:**
- Simplified diagnostic pathways
- No capacity constraints modeling
- Limited access variation within locations
- Static healthcare quality assumptions

10.0 Future Enhancements
++++++++++++++++++++++++

10.1 Model Sophistication
--------------------------

**Advanced Progression Modeling:**
- Non-linear progression patterns
- Individual-level progression heterogeneity
- Genetic risk factor integration
- Biomarker progression modeling

**Healthcare System Integration:**
- Diagnostic pathway modeling
- Healthcare access variation
- Quality of care effects
- Capacity constraint modeling

10.2 Data Integration Opportunities
-----------------------------------

**Enhanced Data Sources:**
- Real-world evidence integration
- Electronic health record utilization
- Biomarker registry linkages
- Longitudinal cohort expansion

**Methodological Advances:**
- Machine learning progression prediction
- Personalized progression modeling
- Dynamic risk factor integration
- Uncertainty quantification improvements