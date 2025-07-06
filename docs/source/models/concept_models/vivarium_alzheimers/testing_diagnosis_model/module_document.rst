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

This module models diagnostic testing pathways for Alzheimer's disease, incorporating both existing diagnostic methods (CSF biomarkers, PET imaging) and blood-based biomarker (BBBM) testing. The model tracks diagnosis status, test timing, and diagnostic accuracy across different testing modalities to evaluate early detection strategies.

The testing framework captures three distinct diagnostic pathways: current standard of care, blood-based biomarker screening, and integrated testing-treatment programs. Each pathway provides different detection capabilities and healthcare utilization patterns.

2.0 Module Diagram and Data
+++++++++++++++++++++++++++

2.1 Module Inputs
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

2.2 Module Outputs
-------------------

.. list-table:: Module outputs
  :header-rows: 1

  * - Output
    - Value
    - Application
    - Note
  * - Testing status
    - Tested/Not tested by modality
    - Healthcare utilization tracking
    - Time-stamped testing events
  * - Test results
    - Positive/Negative by test type
    - Diagnostic accuracy assessment
    - True positive/false positive classification
  * - Diagnosis status
    - Diagnosed/Undiagnosed
    - Treatment eligibility determination
    - Links to intervention module
  * - Diagnosis timing
    - Age at diagnosis
    - Early detection evaluation
    - Time to diagnosis metrics
  * - Diagnostic pathway
    - Route to diagnosis
    - Healthcare system evaluation
    - Pathway efficiency assessment
  * - Test correlation outcomes
    - Repeat test concordance
    - Test reliability assessment
    - 75-85% correlation in 5-year window

2.3 Testing Architecture Framework
-----------------------------------

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

3.0 Blood-Based Biomarker Testing Implementation
++++++++++++++++++++++++++++++++++++++++++++++++

3.1 Eligibility and Uptake
---------------------------

**Target Population:**
- Ages 30-44 years
- Annual testing opportunity for eligible individuals
- No exclusions based on family history or risk factors in baseline model

**Testing Uptake:**
- 5% annual uptake rate among eligible population
- Client defines uptake flexibly ("20% of at-risk population identified at age 30")
- Implementation prioritizes simplicity over complex demographic variations
- Supply-side constraints modeled through reduced uptake rates

3.2 Test Performance
--------------------

**Performance Characteristics:**
- Sensitivity: 95% (probability of positive test given preclinical AD)
- Specificity: 90% (probability of negative test given no preclinical AD)
- Performance characteristics may vary by demographic groups

**Test Correlation Modeling:**
- **Long-term Test Correlation:** Repeated tests show high correlation over time due to individual biological factors
- Blood biomarkers: 75-85% chance of same result on repeat testing
- Individual tested in year X has correlated probability of same result in year X+5
- Correlation accounts for stable individual characteristics and measurement error patterns

3.3 Diagnostic Pathway
-----------------------

**Believed AD State Model:**

.. graphviz::

  digraph believed_state {
      rankdir = LR;
      node [shape=box];
      
      unknown [label="Unknown\nAD Status"];
      believed_negative [label="Believed\nAD Negative"];
      believed_positive [label="Believed\nAD Positive"];
      
      unknown -> believed_negative [label="Negative test"];
      unknown -> believed_positive [label="Positive test\n(includes false positives)"];
      believed_negative -> believed_positive [label="Subsequent\npositive test"];
  }

The believed AD state tracks what individuals and healthcare providers believe about AD status based on test results, which may differ from true biomarker status due to test imperfection.

**Test Decision Algorithm:**

.. code-block:: none

   For each eligible simulant in each time step:
   1. Determine if simulant chooses testing (5% probability)
   2. If tested:
      a. Check for previous test result and apply correlation:
         - If previous test within 5 years: 75-85% chance same result
         - If no previous test or >5 years: use base sensitivity/specificity
      b. If simulant has preclinical AD: 95% chance positive result (adjusted for correlation)
      c. If simulant has no AD pathology: 10% chance false positive (adjusted for correlation)
   3. Route positive tests directly to diagnosed preclinical AD status (includes false positives)
   4. Record test events and correlation tracking for economic analysis

**State Transitions:**

The testing module interacts with the core disease model by:
- Identifying individuals in preclinical AD state through testing
- Enabling transition to "diagnosed preclinical AD" status
- Triggering eligibility for intervention pathways

3.4 Key Parameters
------------------

.. list-table:: BBBM Testing Parameters
  :header-rows: 1

  * - Parameter
    - Baseline Value
    - Uncertainty Range
    - Notes
  * - Annual uptake rate
    - 5%
    - 3-10%
    - May vary by location and time
  * - Test sensitivity
    - 95%
    - 90-98%
    - Performance for preclinical AD detection
  * - Test specificity
    - 90%
    - 85-95%
    - Performance for ruling out AD pathology
  * - Direct diagnosis rate
    - 100%
    - --
    - All positive tests lead to preclinical AD diagnosis (no confirmation step)
  * - Test correlation (5-year)
    - 75-85%
    - 70-90%
    - Probability of same result on repeat testing

4.0 Existing Testing Pathways
++++++++++++++++++++++++++++++

4.1 Symptomatic Testing
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

4.2 Multi-Modal Testing Framework
---------------------------------

**Reference Scenario Testing (CSF and PET):**

Current diagnostic pathways include cerebrospinal fluid (CSF) and amyloid-PET testing. These expensive, invasive procedures have limited accessibility compared to blood biomarkers.

**Value Proposition for Alternative Scenarios:** Including existing testing modalities quantifies the number of expensive PET scans and CSF procedures avoided through blood biomarker implementation. This comparison demonstrates economic benefits beyond health outcomes.

**Testing Characteristics:**
- **CSF Testing:** 70-80% correlation for repeat results over 5-year periods
- **Amyloid-PET Imaging:** 85-90% correlation for repeat results if initially positive
- Higher costs and specialized center requirements limit population access
- Blood biomarkers offer comparable accuracy with greater accessibility

4.3 Healthcare System Integration
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

5.0 Scenario Implementation
+++++++++++++++++++++++++++

5.1 Reference Scenario
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

5.2 Alternative Scenario 1 (BBBM Testing Only)
-----------------------------------------------

- 5% annual BBBM uptake in target age group
- Early diagnosis capability without intervention
- Healthcare system impact of early diagnosis
- Cost-effectiveness of testing without treatment

5.3 Alternative Scenario 2 (BBBM Testing + Treatment)
-----------------------------------------------------

- Combined testing and intervention pathway
- 80% treatment initiation for BBBM-positive cases
- Integrated early detection and intervention program
- Full pathway cost-effectiveness evaluation

6.0 Expected Outcomes
+++++++++++++++++++++

**Primary Outputs:**

- Number of tests performed by age, sex, location, year
- True positive, false positive, true negative, false negative counts
- Diagnosed preclinical population size and characteristics
- Time from biomarker positivity to diagnosis

**Economic Inputs:**

- Total testing volume for cost calculations
- Positive predictive value and diagnostic yield
- Healthcare utilization for confirmatory testing

**Validation Metrics:**

- Testing uptake rates match specified parameters
- Test performance characteristics align with input values
- Diagnosed population prevalence consistent with underlying disease model

7.0 Assumptions and Limitations
+++++++++++++++++++++++++++++++

7.1 Key Assumptions
-------------------

**Test Performance Assumptions:**
- Test performance remains constant over time and across populations
- Uptake rates are uniform within demographic groups
- Test correlation patterns are stable over 5-year periods
- Correlation driven by biological factors rather than systematic measurement error
- No behavioral changes following negative test results
- Confirmatory testing has perfect accuracy

**Healthcare System Assumptions:**
- Uniform access within location/demographic groups
- Consistent diagnostic pathways
- Stable healthcare provider behavior
- No capacity constraints or supply limitations

7.2 Known Limitations
---------------------

**Testing Complexity:**
- Test correlation modeling adds complexity but may not capture all biological variation
- Assumes unlimited testing capacity at specified uptake rates
- No consideration of test cost or accessibility barriers beyond uptake rates
- Direct diagnosis without confirmatory testing (includes false positives in diagnosed population)
- Simplified correlation model may not account for individual heterogeneity in test stability

**Behavioral Factors:**
- Simplified testing uptake modeling
- No modeling of test anxiety or preferences
- Limited consideration of healthcare seeking behavior
- Static uptake rates over time

8.0 V&V Criteria
++++++++++++++++

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
-----------------------

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

9.0 References
++++++++++++++

**Test Performance Validation:**

Real-world validation studies show 90% diagnostic accuracy [Janelidze2024]_, providing benchmarks for our sensitivity/specificity assumptions. Clinical guidelines recommend ≥90% sensitivity with ≥85% specificity in primary care [GlobalCEO2024]_, validating our test performance parameters.

**Economic Validation:**

Monte Carlo simulation studies (10,000 iterations) show blood biomarkers are cost-effective despite lower accuracy [Fan2024]_, validating our economic modeling approach.

.. [Janelidze2024] Janelidze S, et al. "Highly accurate blood test for Alzheimer's disease is similar or superior to clinical cerebrospinal fluid tests." *Nature Medicine* 2024; 30:1085–1195.

.. [GlobalCEO2024] "Acceptable performance of blood biomarker tests of amyloid pathology — recommendations from the Global CEO Initiative on Alzheimer's Disease." *Nature Reviews Neurology* 2024; 20:570-583.

.. [Fan2024] Fan LY, et al. "Cost-effectiveness comparison between blood biomarkers and conventional tests in Alzheimer's disease diagnosis." *Current Opinion in Psychiatry* 2024; 37(2):118-124.