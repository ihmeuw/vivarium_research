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

.. _2024_vivarium_alzheimers_testing_diagnosis_model:

======================================
Testing and Diagnosis Status Model
======================================

.. contents::
  :local:
  :depth: 2

1.0 Overview
++++++++++++

This module models diagnostic testing pathways for Alzheimer's disease, incorporating both existing diagnostic methods (CSF biomarkers, PET imaging) and hypothetical blood-based biomarker (BBBM) testing. The model tracks diagnosis status, test timing, and diagnostic accuracy across different testing modalities to evaluate early detection strategies.

2.0 Module Objectives
+++++++++++++++++++++

**Primary Objectives:**
- Model patient journey from testing through diagnosis
- Compare diagnostic pathways across reference and alternative scenarios
- Evaluate impact of blood-based biomarker testing on early detection
- Assess diagnostic accuracy and healthcare utilization

**Key Features:**
- Dual testing pathway modeling (existing vs. BBBM)
- Age-specific testing propensity (target: ages 30-44 for BBBM)
- Test performance characteristics (sensitivity/specificity)
- Test correlation modeling for repeat testing
- Diagnosis timing and pathway tracking

3.0 Testing Framework Architecture
+++++++++++++++++++++++++++++++++++

3.1 Testing Modalities
-----------------------

.. list-table:: Diagnostic testing modalities
  :header-rows: 1

  * - Test Type
    - Target Population
    - Primary Application
    - Performance
    - Cost Category
  * - **Blood-based biomarkers (BBBM)**
    - Ages 30-44 (asymptomatic)
    - Early detection screening
    - 95% sensitivity, 90% specificity
    - Low cost, high accessibility
  * - **CSF biomarkers**
    - Symptomatic individuals
    - Clinical diagnosis confirmation
    - High accuracy (~95%+)
    - Moderate cost, invasive
  * - **PET imaging**
    - Symptomatic individuals
    - Advanced diagnostic confirmation
    - High accuracy (~90%+)
    - High cost, limited access
  * - **Clinical assessment**
    - All symptomatic cases
    - Standard of care diagnosis
    - Variable accuracy
    - Standard healthcare cost

3.2 Diagnostic Pathways
-----------------------

**Reference Scenario (Current Standard of Care):**
- Minimal BBBM testing (<1% annual uptake)
- Existing CSF/PET diagnostic pathways for symptomatic cases
- Late-stage diagnosis (typically MCI or mild dementia stages)
- Standard clinical progression to diagnosis

**Alternative Scenario 1 (BBBM Testing Only):**
- 5% annual BBBM uptake in ages 30-44
- No disease-modifying intervention
- Early diagnosis pathway for biomarker-positive cases
- Direct pathway from BBBM+ to preclinical AD diagnosis

**Alternative Scenario 2 (BBBM Testing + Treatment):**
- 5% annual BBBM uptake in ages 30-44
- 80% treatment initiation rate for diagnosed individuals
- Early intervention for biomarker-positive cases
- Integrated testing and treatment pathway

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
  * - Disease state
    - Alzheimer's disease model
    - True disease status for test accuracy
    - Determines test performance
  * - Age and demographics
    - Population model
    - Testing eligibility determination
    - BBBM targets ages 30-44
  * - Healthcare access
    - Location-specific parameters
    - Testing availability
    - Varies by healthcare system
  * - Previous test results
    - Internal tracking
    - Test correlation modeling
    - 5-year correlation window
  * - Scenario parameters
    - Model configuration
    - Testing uptake rates
    - Scenario-specific coverage

4.2 Module Outputs
-------------------

.. list-table:: Module outputs
  :header-rows: 1

  * - Output
    - Value
    - Application
    - Note
  * - A. Testing status
    - Tested/Not tested by modality
    - Healthcare utilization tracking
    - Time-stamped testing events
  * - B. Test results
    - Positive/Negative by test type
    - Diagnostic accuracy assessment
    - True positive/false positive classification
  * - C. Diagnosis status
    - Diagnosed/Undiagnosed
    - Treatment eligibility determination
    - Links to intervention module
  * - D. Diagnosis timing
    - Age at diagnosis
    - Early detection evaluation
    - Time to diagnosis metrics
  * - E. Diagnostic pathway
    - Route to diagnosis
    - Healthcare system evaluation
    - Pathway efficiency assessment
  * - F. Test correlation outcomes
    - Repeat test concordance
    - Test reliability assessment
    - 75-85% correlation in 5-year window

5.0 Blood-Based Biomarker Testing Module
+++++++++++++++++++++++++++++++++++++++++

5.1 Testing Implementation
---------------------------

**Target Population:**
- Primary target: Ages 30-44 years
- Annual testing opportunity for eligible individuals
- 5% annual uptake rate (range: 3-10% for sensitivity analysis)
- Equal access across sex and other demographics within age range

**Test Performance Parameters:**
- Sensitivity: 95% (range: 90-98%)
- Specificity: 90% (range: 85-95%)
- Performance consistent across demographic groups
- No test performance degradation over time

**Test Correlation Modeling:**
- 75-85% probability of concordant results on repeat testing
- 5-year correlation window for test reliability
- Independent test results outside correlation window
- Accounts for biomarker progression and test variability

5.2 Diagnostic Pathway Integration
-----------------------------------

**BBBM-Positive Pathway:**
- Direct pathway to preclinical AD diagnosis (includes false positives)
- Immediate eligibility for treatment programs
- No additional confirmatory testing required in base model
- Simplified pathway for intervention evaluation

**BBBM-Negative Pathway:**
- Return to standard care progression
- Potential for future testing (outside correlation window)
- Standard symptomatic diagnosis pathway remains available
- No immediate intervention eligibility

6.0 Existing Testing Pathways
++++++++++++++++++++++++++++++

6.1 Symptomatic Testing
-----------------------

**Clinical Presentation Triggers:**
- Cognitive symptoms reaching clinical threshold
- Family concerns about cognitive changes
- Healthcare provider-initiated assessment
- Typically occurs in MCI or mild dementia stages

**Diagnostic Workflow:**
- Initial clinical assessment and cognitive testing
- Biomarker testing (CSF or PET) for confirmation
- Differential diagnosis consideration
- Treatment planning and care coordination

6.2 Healthcare System Integration
---------------------------------

**Access Determinants:**
- Healthcare system capacity and availability
- Geographic access to specialized testing
- Insurance coverage and cost considerations
- Specialist referral patterns and timing

**Quality Variation:**
- Diagnostic accuracy varies by healthcare setting
- Specialist vs. primary care diagnostic capability
- Technology availability and implementation
- Training and experience effects on accuracy

7.0 Scenario Implementation
+++++++++++++++++++++++++++

7.1 Reference Scenario
----------------------

**Testing Characteristics:**
- Minimal BBBM testing (<1% annual uptake)
- Standard symptomatic diagnosis pathways
- Existing CSF/PET testing availability
- Late-stage diagnosis pattern (MCI+ stages)

**Outcome Measurement:**
- Baseline diagnostic timing and accuracy
- Current healthcare utilization patterns
- Standard care cost and burden
- Natural disease progression observation

7.2 Alternative Scenarios
-------------------------

**Scenario 1 - BBBM Testing Only:**
- 5% annual BBBM uptake in target age group
- Early diagnosis capability without intervention
- Healthcare system impact of early diagnosis
- Cost-effectiveness of testing without treatment

**Scenario 2 - BBBM Testing + Treatment:**
- Combined testing and intervention pathway
- 80% treatment initiation for BBBM-positive cases
- Integrated early detection and intervention program
- Full pathway cost-effectiveness evaluation

8.0 Validation Framework
++++++++++++++++++++++++

8.1 Test Performance Validation
-------------------------------

**Sensitivity/Specificity Validation:**
- Comparison to clinical validation studies
- Janelidze et al. (2024) blood biomarker accuracy data
- Age-specific performance validation
- False positive/negative rate tracking

**Diagnostic Timing Validation:**
- Age at diagnosis distributions
- Time from symptom onset to diagnosis
- Early vs. late diagnosis proportions
- Healthcare utilization pattern validation

8.2 Pathway Validation
---------------------

**Testing Uptake Validation:**
- Actual vs. target uptake rates (5%)
- Demographic distribution of testing
- Healthcare access equity assessment
- Scenario-specific coverage achievement

**Correlation Validation:**
- Repeat testing concordance rates (75-85%)
- Test reliability over time
- Biomarker progression consistency
- Test-retest validation studies

9.0 Data Requirements
+++++++++++++++++++++

9.1 Test Performance Data
-------------------------

**Blood Biomarker Performance:**
- Clinical validation study results (Janelidze et al. 2024)
- Age-specific sensitivity/specificity
- Population-specific performance variations
- Longitudinal test reliability data

**Existing Test Performance:**
- CSF biomarker accuracy in clinical settings
- PET imaging diagnostic performance
- Clinical assessment accuracy rates
- Healthcare setting performance variations

9.2 Healthcare Utilization Data
-------------------------------

**Testing Patterns:**
- Current diagnostic testing rates by age and location
- Healthcare access patterns
- Specialist referral rates and timing
- Insurance coverage and cost barriers

**Diagnostic Timing:**
- Age at diagnosis distributions
- Symptom onset to diagnosis intervals
- Healthcare seeking behavior patterns
- Diagnostic delay factors and barriers

10.0 Model Assumptions and Limitations
++++++++++++++++++++++++++++++++++++++

10.1 Key Assumptions
-------------------

**Test Performance Assumptions:**
- Consistent test performance over time
- Uniform accuracy across demographic groups
- Independent test results (except correlation modeling)
- Static technology performance characteristics

**Healthcare System Assumptions:**
- Uniform access within location/demographic groups
- Consistent diagnostic pathways
- Stable healthcare provider behavior
- No capacity constraints or supply limitations

10.2 Known Limitations
---------------------

**Testing Complexity:**
- Simplified diagnostic pathways
- No modeling of differential diagnosis complexity
- Limited healthcare system capacity constraints
- Static test performance over time

**Behavioral Factors:**
- Simplified testing uptake modeling
- No modeling of test anxiety or preferences
- Limited consideration of healthcare seeking behavior
- Static uptake rates over time

11.0 Future Enhancements
+++++++++++++++++++++++

11.1 Model Sophistication
-------------------------

**Advanced Testing Modeling:**
- Multi-biomarker testing strategies
- Sequential testing algorithms
- Risk-stratified testing approaches
- Dynamic test performance based on technology advancement

**Healthcare System Integration:**
- Capacity constraint modeling
- Healthcare provider training effects
- Diagnostic pathway optimization
- Cost-effectiveness of different testing strategies

11.2 Behavioral Integration
---------------------------

**Testing Behavior Modeling:**
- Patient preference and choice modeling
- Healthcare seeking behavior variation
- Socioeconomic factors in testing access
- Cultural factors affecting testing uptake

**System Dynamics:**
- Feedback between testing volume and capacity
- Learning curve effects on diagnostic accuracy
- Technology adoption and diffusion modeling
- Policy intervention effects on testing patterns