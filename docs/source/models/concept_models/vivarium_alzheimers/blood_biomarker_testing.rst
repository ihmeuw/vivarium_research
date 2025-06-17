.. _alzheimers_bbbm_testing:

Blood-Based Biomarker Testing Module
====================================

This page details the implementation of blood-based biomarker (BBBM) testing for early detection of preclinical Alzheimer's disease.

Overview
--------

The BBBM testing module simulates population-level screening programs using blood-based biomarkers to identify individuals with preclinical Alzheimer's disease pathology. The module captures testing eligibility, uptake patterns, test performance characteristics, and diagnostic pathways.

Key Modeling Components
-----------------------

**Eligibility Criteria:**

- Target population: Ages 30-44 years
- Annual testing opportunity for eligible individuals
- No exclusions based on family history or risk factors in baseline model

**Testing Uptake:**

- 5% annual uptake rate among eligible population
- Uptake may vary by location, age, sex, and time period
- Supply-side constraints can be modeled through reduced uptake rates

**Test Performance:**

- Sensitivity: 95% (probability of positive test given preclinical AD)
- Specificity: 90% (probability of negative test given no preclinical AD)
- Performance characteristics may vary by demographic groups, based on validation studies [Janelidze2024]_ and clinical guidelines [GlobalCEO2024]_

**Testing Independence and Correlation:**

- **Long-term Test Correlation:** Repeated tests show high correlation over time due to individual biological factors
- Blood biomarkers: 75-85% chance of same result on repeat testing (influenced by disease progression)
- Individual tested in year X has correlated probability of same result in year X+5
- Correlation accounts for stable individual characteristics and measurement error patterns

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

Implementation Details
----------------------

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

**Key Parameters:**

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

Expected Outcomes
-----------------

**Primary Outputs:**

- Number of tests performed by age, sex, location, year
- True positive, false positive, true negative, false negative counts
- Diagnosed preclinical population size and characteristics
- Time from biomarker positivity to diagnosis

**Economic Inputs:**

- Total testing volume for cost calculations
- Positive predictive value and diagnostic yield
- Healthcare utilization for confirmatory testing, which we will compare with cost-effectiveness research [Fan2024]_

**Validation Metrics:**

- Testing uptake rates match specified parameters
- Test performance characteristics align with input values
- Diagnosed population prevalence consistent with underlying disease model

Limitations and Assumptions
---------------------------

**Key Assumptions:**

- Test performance remains constant over time and across populations
- Uptake rates are uniform within demographic groups
- Test correlation patterns are stable over 5-year periods
- Correlation driven by biological factors rather than systematic measurement error
- No behavioral changes following negative test results
- Confirmatory testing has perfect accuracy

**Limitations:**

- Test correlation modeling adds complexity but may not capture all biological variation
- Assumes unlimited testing capacity at specified uptake rates
- No consideration of test cost or accessibility barriers beyond uptake rates
- Direct diagnosis without confirmatory testing (includes false positives in diagnosed population)
- Simplified correlation model may not account for individual heterogeneity in test stability

Multi-Modal Testing Framework
-----------------------------

**Reference Scenario Testing (CSF and PET):**

In the reference scenario, current diagnostic pathways include cerebrospinal fluid (CSF) and PET-based testing:

- **CSF Testing:** 70-80% correlation for repeat results over 5-year periods
- **PET Imaging:** 85-90% correlation for repeat results if initially positive
- Lower accessibility and higher costs compared to blood biomarkers
- Used primarily in specialized centers and research settings

**Test Correlation Research:**

Detailed analysis of test correlation patterns and biological factors is available in this research summary: https://claude.ai/chat/aa8f154e-fe5e-4fe8-bd99-08da90d8e555

Future Enhancements
-------------------

**Potential Model Extensions:**

- Variable test performance by biomarker type or combination
- Learning curves for test implementation and uptake
- Risk-stratified testing based on family history or genetics
- Economic feedback effects on testing uptake and availability
- Cross-modal test correlation modeling (blood vs CSF vs PET)

External Validation References
-------------------------------

**Test Performance Validation:**

Real-world validation studies show 90% diagnostic accuracy [Janelidze2024]_, providing benchmarks for our 80% sensitivity/specificity assumptions. Clinical guidelines recommend ≥90% sensitivity with ≥85% specificity in primary care [GlobalCEO2024]_, validating our test performance parameters.

**Economic Validation:**

Monte Carlo simulation studies (10,000 iterations) show blood biomarkers are cost-effective despite lower accuracy [Fan2024]_, validating our economic modeling approach.

.. [Janelidze2024] Janelidze S, et al. "Highly accurate blood test for Alzheimer's disease is similar or superior to clinical cerebrospinal fluid tests." *Nature Medicine* 2024; 30:1085–1095.

.. [GlobalCEO2024] "Acceptable performance of blood biomarker tests of amyloid pathology — recommendations from the Global CEO Initiative on Alzheimer's Disease." *Nature Reviews Neurology* 2024; 20:570-583.