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

.. _2024_vivarium_alzheimers_treatment_model:

========================================
Hypothetical Alzheimer's Treatment Model
========================================

.. contents::
  :local:
  :depth: 2

1.0 Overview
++++++++++++

This module models a hypothetical disease-modifying therapy for Alzheimer's disease. The treatment represents a class of therapies similar to recently approved anti-amyloid drugs, with enhanced effectiveness assumptions for early-stage intervention. The model excludes symptomatic treatments that improve quality of life but do not affect underlying disease progression.

The intervention focuses on treatments comparable to lecanemab that modify disease trajectory and reduce long-term care burden through biological disease modification rather than symptom management.

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
  * - Diagnosis status
    - Testing/diagnosis model
    - Treatment eligibility determination
    - BBBM+ or symptomatic diagnosis
  * - Disease state
    - Alzheimer's disease model
    - Transition rate modification
    - Applies to all post-diagnosis states
  * - Age and demographics
    - Population model
    - Treatment response variation
    - May affect discontinuation rates
  * - Treatment history
    - Internal tracking
    - Continuation/discontinuation modeling
    - Tracks treatment duration
  * - Healthcare access
    - Location-specific parameters
    - Treatment availability
    - Varies by healthcare system capacity

2.2 Module Outputs
-------------------

.. list-table:: Module outputs
  :header-rows: 1

  * - Output
    - Value
    - Application
    - Note
  * - Treatment status
    - On treatment/Not on treatment
    - Disease progression modification
    - Time-varying status
  * - Treatment initiation events
    - Count by age/location/year
    - Healthcare utilization tracking
    - Links to diagnosis timing
  * - Treatment discontinuation events
    - Count by time on treatment
    - Adherence pattern analysis
    - Survival analysis framework
  * - Modified progression rates
    - Rate multiplier by individual
    - Disease model integration
    - 0.8× reduction for treated individuals
  * - Treatment duration
    - Time on therapy by individual
    - Cost calculation input
    - Discontinuation survival analysis
  * - Population treatment coverage
    - Proportion treated by demographics
    - Population impact assessment
    - Scenario comparison metrics

2.3 Treatment Framework
-----------------------

.. list-table:: Treatment parameters
  :header-rows: 1

  * - Parameter
    - Base Value
    - Range (Sensitivity Analysis)
    - Evidence Base
  * - **Effectiveness**
    - 20% progression reduction
    - 10-40%
    - Based on lecanemab trials (van Dyck et al. 2023)
  * - **Initiation Rate**
    - 80%
    - 70-90%
    - Clinical trial participation rates
  * - **Annual Discontinuation**
    - 10%
    - 5-20%
    - Real-world therapy adherence patterns
  * - **Treatment Eligibility**
    - All diagnosed individuals
    - N/A
    - Simplified for modeling purposes
  * - **Time to Effect**
    - Immediate
    - N/A
    - Conservative assumption

3.0 Treatment Implementation
++++++++++++++++++++++++++++

3.1 Eligibility and Initiation
-------------------------------

**Treatment Eligibility:**
- Individuals with confirmed preclinical AD diagnosis
- May extend to MCI and mild AD stages in future model versions
- No contraindications or comorbidity restrictions in baseline model
- Immediate eligibility upon diagnosis

**Treatment Initiation:**
- 80% probability of starting treatment upon diagnosis
- Initiation may vary by age, sex, location, and healthcare access
- Immediate treatment start following diagnostic confirmation
- Random selection of initiators (no systematic patterns)

**Geographic and Demographic Variation:**
- Baseline initiation rate consistent across locations
- Potential variation by healthcare system capacity
- No modeled variation by age, sex, or socioeconomic status
- Equal access assumptions within healthcare systems

3.2 Treatment Effectiveness
---------------------------

**Disease Modification Approach:**
Disease-modifying therapy reduces progression rates across all disease transitions. This uniform approach reflects limited evidence on stage-specific effectiveness but provides conservative estimates of intervention benefits.

- 20% reduction in disease progression rates, based on clinical trial evidence [vanDyck2023]_
- Applied uniformly across all transition rates (i_mci, i_mild, i_moderate, i_severe)
- Effectiveness maintained while on treatment
- Conservative assumption pending stage-specific efficacy data

**Progression Rate Modification:**

For individuals on treatment, disease progression rates are modified as:

.. math::

   \text{rate}_{\text{treated}} = \text{rate}_{\text{baseline}} \times (1 - \text{effectiveness})

Where:

- effectiveness = 0.20 (20% reduction)
- Applied to rates: i_mci, i_mild, i_moderate, i_severe

**Treatment Mechanism:**
- Targets underlying disease pathophysiology
- Slows but does not stop disease progression
- Uniform effect across all disease state transitions
- No curative or disease-reversing effects modeled

3.3 Treatment Adherence and Discontinuation
--------------------------------------------

**Treatment Adherence:**
- 10% annual discontinuation rate, consistent with clinical trial patterns [Honig2018]_
- Exponential survival model for time to discontinuation
- No re-initiation after discontinuation in baseline model

**Discontinuation Modeling:**

.. code-block:: none

   Time to discontinuation ~ Exponential(λ = -ln(0.9))
   Where annual continuation probability = 90%

**Discontinuation Framework:**
- Monthly discontinuation probability: 1 - exp(-0.10/12)
- Time-to-discontinuation modeling
- Censoring at end of simulation or death
- Population-level adherence curves

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

4.0 Treatment Effects by Disease Stage
++++++++++++++++++++++++++++++++++++++

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

5.0 Scenario Implementation
+++++++++++++++++++++++++++

5.1 Reference Scenario
----------------------

**Treatment Availability:**
- Minimal early-stage treatment (standard of care)
- Late-stage symptomatic treatment only
- Limited population-level impact
- Current real-world treatment patterns

5.2 Alternative Scenario 2 (BBBM Testing + Treatment)
-----------------------------------------------------

**Enhanced Treatment Access:**
- Early treatment following BBBM+ diagnosis
- 80% initiation rate among BBBM+ individuals
- Population-level early intervention program
- Integrated testing and treatment pathway

**Implementation Characteristics:**
- Immediate treatment eligibility upon BBBM+ result
- No additional diagnostic requirements
- Simplified treatment pathway
- Population health intervention model

6.0 Expected Outcomes
+++++++++++++++++++++

**Primary Effectiveness Measures:**
- Delayed progression through disease stages
- Increased time in preclinical and MCI states
- Reduced incidence of clinical dementia
- Extended cognitively normal lifespan

**Treatment Utilization Metrics:**
- Person-years of treatment by disease stage
- Treatment initiation rates by population subgroups
- Discontinuation patterns and duration of exposure

**Economic Inputs:**
- Total treatment volume for cost calculations
- Averted healthcare costs from delayed progression
- Reduced caregiver burden and productivity losses

7.0 Evidence Base and Validation
+++++++++++++++++++++++++++++++++

7.1 Clinical Trial Evidence
----------------------------

**Lecanemab Trial Results (van Dyck et al. 2023):**
- 27% reduction in cognitive decline rate
- Early-stage (mild cognitive impairment and mild dementia) population
- 18-month treatment duration in trial
- Translated to 20% progression rate reduction in model

**Treatment Effect Translation:**
- Clinical endpoint (cognitive decline) mapped to disease progression
- Conservative assumption of 20% vs. observed 27% reduction
- Applied uniformly across disease states
- Extended beyond trial population to all disease stages

7.2 External Validation
-----------------------

**Treatment Effectiveness Validation:**
Phase 3 RCT evidence shows 27% reduction in cognitive decline [vanDyck2023]_, providing validation for our 20% progression rate reduction assumption. Direct methodological comparison through simulation modeling of early AD intervention [Long2022]_ validates our treatment pathway modeling approach.

**Economic Validation:**
Cost-effectiveness analysis showing $183,000-$204,000 per evLY gained [ICER2023]_ provides benchmarks for intervention cost-effectiveness modeling.

**Safety and Adherence:**
Real-world evidence for treatment discontinuation patterns and adherence in AD clinical trials [Honig2018]_ validates our 10% annual discontinuation rate.

8.0 Assumptions and Limitations
+++++++++++++++++++++++++++++++

8.1 Key Assumptions
-------------------

**Treatment Effectiveness:**
- Uniform treatment effectiveness across all disease transitions
- Immediate onset of treatment effects
- No carryover effects after discontinuation
- Perfect medication adherence while "on treatment"
- No diminishing effectiveness over time
- No treatment resistance or tolerance development

**Implementation Assumptions:**
- Perfect healthcare system implementation
- No supply or capacity constraints
- Uniform access within healthcare systems
- No systematic variation in treatment response

8.2 Model Limitations
---------------------

**Biological Complexity:**
- Does not account for side effects or contraindications
- Simplified discontinuation model (single rate across populations)
- No dose-response relationships
- Assumes constant effectiveness over time
- No modeling of individual treatment response variation

**Healthcare System Realism:**
- No capacity constraint modeling
- Simplified access and implementation assumptions
- No provider training or adoption curve modeling
- No real-world implementation barriers

9.0 V&V Criteria
++++++++++++++++

9.1 Treatment Effect Validation
-------------------------------

**Treatment Pathway Validation:**
- Initiation rates match specified parameters (80%)
- Discontinuation follows exponential pattern (10% annually)
- Progression rate reduction achieved in treated population

**Effectiveness Validation:**
- 20% reduction in transition rates for treated individuals
- Maintained effectiveness while on treatment
- Return to baseline rates after discontinuation

9.2 Population Impact Validation
--------------------------------

**Population-Level Impact:**
- Delayed age at onset of clinical symptoms
- Reduced prevalence of advanced disease stages
- Increased quality-adjusted survival

**Coverage and Adherence:**
- Treatment initiation rate validation (80%)
- Discontinuation rate validation (10% annually)
- Population coverage over time
- Healthcare system utilization patterns

10.0 References
+++++++++++++++

.. [Long2022] Long JM, et al. "Long-Term Health Outcomes of Lecanemab in Patients with Early Alzheimer's Disease Using Simulation Modeling." *Neurology and Therapy* 2022; 11(3):1143-1158.

.. [Honig2018] Honig LS, et al. "Trial of Solanezumab for Mild Dementia Due to Alzheimer's Disease." *New England Journal of Medicine* 2018; 378(4):321-330.