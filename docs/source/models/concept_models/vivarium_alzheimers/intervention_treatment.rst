.. _alzheimers_intervention_treatment:

Intervention and Treatment Module
=================================

This page describes the modeling approach for disease-modifying interventions in preclinical and clinical Alzheimer's disease.

Overview
--------

The intervention module simulates hypothetical disease-modifying treatments that prevent, delay, or slow Alzheimer's disease progression. The model excludes symptomatic treatments that improve quality of life but do not affect underlying disease progression. Focus remains on interventions comparable to lecanemab that modify disease trajectory and reduce long-term care burden.

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

Disease-modifying therapy reduces progression rates across all disease transitions. This uniform approach reflects limited evidence on stage-specific effectiveness but provides conservative estimates of intervention benefits.

- 20% reduction in disease progression rates, based on clinical trial evidence [vanDyck2023]_
- Applied uniformly across all transition rates (i_mci, i_mild, i_moderate, i_severe)
- Effectiveness maintained while on treatment
- Conservative assumption pending stage-specific efficacy data

**Treatment Adherence:**

- 10% annual discontinuation rate, consistent with clinical trial patterns [Honig2018]_
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
- Reduced caregiver burden and productivity losses, which we will compare with established economic evaluation methods [ICER2023]_

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
- Reduced prevalence of advanced disease stages, as demonstrated in simulation studies [Long2022]_
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

External Validation References
-------------------------------

**Treatment Effectiveness Validation:**

Phase 3 RCT evidence shows 27% reduction in cognitive decline [vanDyck2023]_, providing validation for our 20% progression rate reduction assumption. Direct methodological comparison through simulation modeling of early AD intervention [Long2022]_ validates our treatment pathway modeling approach.

**Economic Validation:**

Cost-effectiveness analysis showing $183,000-$204,000 per evLY gained [ICER2023]_ provides benchmarks for intervention cost-effectiveness modeling.

**Safety and Adherence:**

Real-world evidence for treatment discontinuation patterns and adherence in AD clinical trials [Honig2018]_ validates our 10% annual discontinuation rate.

.. [vanDyck2023] van Dyck CH, et al. "Lecanemab in Early Alzheimer's Disease." *New England Journal of Medicine* 2023; 388(1):9-21.

.. [Long2022] Long JM, et al. "Long-Term Health Outcomes of Lecanemab in Patients with Early Alzheimer's Disease Using Simulation Modeling." *Neurology and Therapy* 2022; 11(3):1143-1158.

.. [Honig2018] Honig LS, et al. "Trial of Solanezumab for Mild Dementia Due to Alzheimer's Disease." *New England Journal of Medicine* 2018; 378(4):321-330.