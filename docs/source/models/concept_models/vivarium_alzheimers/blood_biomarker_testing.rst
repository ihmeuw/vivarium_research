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

- Sensitivity: 80% (probability of positive test given preclinical AD)
- Specificity: 80% (probability of negative test given no preclinical AD)
- Performance characteristics may vary by demographic groups

**Testing Independence:**

- Repeated tests are independent events
- Individual tested in year X has same probability of detection in year X+5
- No cumulative effect of multiple negative tests

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
      a. If simulant has preclinical AD: 80% chance positive result
      b. If simulant has no AD pathology: 20% chance false positive
   3. Route positive tests directly to diagnosed preclinical AD status (includes false positives)
   4. Record test events for economic analysis

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
    - 80%
    - 70-90%
    - Performance for preclinical AD detection
  * - Test specificity
    - 80%
    - 70-90%
    - Performance for ruling out AD pathology
  * - Direct diagnosis rate
    - 100%
    - --
    - All positive tests lead to preclinical AD diagnosis (no confirmation step)

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
- Healthcare utilization for confirmatory testing

**Validation Metrics:**

- Testing uptake rates match specified parameters
- Test performance characteristics align with input values
- Diagnosed population prevalence consistent with underlying disease model

Limitations and Assumptions
---------------------------

**Key Assumptions:**

- Test performance remains constant over time and across populations
- Uptake rates are uniform within demographic groups
- No behavioral changes following negative test results
- Confirmatory testing has perfect accuracy

**Limitations:**

- Does not model repeat testing behavior or test fatigue
- Assumes unlimited testing capacity at specified uptake rates
- No consideration of test cost or accessibility barriers beyond uptake rates
- Direct diagnosis without confirmatory testing (includes false positives in diagnosed population)

Future Enhancements
-------------------

**Potential Model Extensions:**

- Variable test performance by biomarker type or combination
- Learning curves for test implementation and uptake
- Risk-stratified testing based on family history or genetics
- Economic feedback effects on testing uptake and availability