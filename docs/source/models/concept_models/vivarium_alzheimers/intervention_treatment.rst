.. _alzheimers_intervention_treatment:

Intervention and Treatment Module
=================================

This page describes the modeling approach for disease-modifying interventions in preclinical and clinical Alzheimer's disease.

Overview
--------

The intervention module simulates hypothetical treatments that prevent, delay, or slow Alzheimer's disease progression. The module captures treatment initiation decisions, adherence patterns, effectiveness profiles, and discontinuation dynamics across the disease spectrum.

Key Modeling Components
-----------------------

**Treatment Eligibility:**

- Individuals with confirmed preclinical AD diagnosis
- May extend to MCI and mild AD stages in future model versions
- No contraindications or comorbidity restrictions in baseline model

**Treatment Initiation:**

- 80% probability of starting treatment upon diagnosis
- Initiation may vary by age, sex, location, and healthcare access
- Immediate treatment start following diagnostic confirmation

**Treatment Effectiveness:**

- 20% reduction in disease progression rates
- Applied uniformly across all transition rates (p_mci, p_mild, p_moderate, p_severe)
- Effectiveness maintained while on treatment

**Treatment Adherence:**

- 10% annual discontinuation rate
- Exponential survival model for time to discontinuation
- No re-initiation after discontinuation in baseline model

Implementation Strategy
-----------------------

**Progression Rate Modification:**

For individuals on treatment, disease progression rates are modified as:

.. math::

   \text{rate}_{\text{treated}} = \text{rate}_{\text{baseline}} \times (1 - \text{effectiveness})

Where:

- effectiveness = 0.20 (20% reduction)
- Applied to rates: i_mci, i_mild, i_moderate, i_severe

**Treatment States:**

.. list-table:: Treatment Status Definitions
  :header-rows: 1

  * - Status
    - Definition
    - Progression Rate Modifier
  * - Untreated
    - No current treatment exposure
    - 1.0 (baseline rates)
  * - On Treatment
    - Currently receiving intervention
    - 0.8 (20% reduction)
  * - Discontinued
    - Previously treated but stopped
    - 1.0 (return to baseline rates)

**Discontinuation Modeling:**

.. code-block:: none

   Time to discontinuation ~ Exponential(λ = -ln(0.9))
   Where annual continuation probability = 90%

Treatment Effects by Disease Stage
----------------------------------

**Preclinical AD:**

- Primary target population
- Greatest potential for disease modification
- Delays progression to symptomatic stages

**MCI due to AD:**

- Secondary target for intervention effects
- May slow progression to dementia
- Maintains functional independence longer

**Clinical AD Stages:**

- Potential for symptomatic benefits
- May slow functional decline
- Reduces caregiver burden

Parameterization Details
------------------------

.. list-table:: Treatment Parameters
  :header-rows: 1

  * - Parameter
    - Value
    - Uncertainty Range
    - Source/Assumption
  * - Initiation probability
    - 80%
    - 70-90%
    - Clinical uptake assumptions
  * - Effectiveness (progression reduction)
    - 20%
    - 10-40%
    - Hypothetical intervention profile
  * - Annual discontinuation rate
    - 10%
    - 5-20%
    - Based on chronic disease treatments
  * - Treatment delay (diagnosis to start)
    - 0 months
    - 0-3 months
    - Immediate initiation assumption

**Effectiveness Heterogeneity:**

Future model versions may incorporate:

- Age-dependent effectiveness
- Sex-specific response patterns
- Genetic modifier effects (APOE status)
- Disease stage-specific benefits

Expected Outcomes
-----------------

**Primary Effectiveness Measures:**

- Delayed progression through disease stages
- Increased time in preclinical and MCI states
- Reduced incidence of clinical dementia
- Extended cognitively normal lifespan

**Treatment Utilization Metrics:**

- Person-years of treatment by disease stage
- Treatment initiation rates by population subgroups
- Discontinuation patterns and duration of exposure
- Re-initiation rates (if modeled)

**Economic Inputs:**

- Total treatment volume for cost calculations
- Averted healthcare costs from delayed progression
- Reduced caregiver burden and productivity losses

Validation Criteria
-------------------

**Treatment Pathway Validation:**

- Initiation rates match specified parameters (80%)
- Discontinuation follows exponential pattern (10% annually)
- Progression rate reduction achieved in treated population

**Effectiveness Validation:**

- 20% reduction in transition rates for treated individuals
- Maintained effectiveness while on treatment
- Return to baseline rates after discontinuation

**Population-Level Impact:**

- Delayed age at onset of clinical symptoms
- Reduced prevalence of advanced disease stages
- Increased quality-adjusted survival

Limitations and Assumptions
---------------------------

**Key Assumptions:**

- Uniform treatment effectiveness across all disease transitions
- Immediate onset of treatment effects
- No carryover effects after discontinuation
- Perfect medication adherence while "on treatment"

**Model Limitations:**

- Does not account for side effects or contraindications
- Simplified discontinuation model (single rate across populations)
- No dose-response relationships
- Assumes constant effectiveness over time

**Future Model Enhancements:**

- Stage-specific effectiveness profiles
- Gradual onset and offset of treatment effects
- Combination therapy approaches
- Personalized treatment based on biomarker profiles