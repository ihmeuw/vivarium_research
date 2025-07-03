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

This module models a hypothetical disease-modifying therapy for Alzheimer's disease, designed to evaluate the population-level impact of early intervention following blood-based biomarker testing. The treatment represents a class of therapies similar to recently approved anti-amyloid drugs, with enhanced effectiveness assumptions for early-stage intervention.

2.0 Module Objectives
+++++++++++++++++++++

**Primary Objectives:**
- Model disease-modifying treatment effects on AD progression
- Evaluate population-level impact of early intervention strategies
- Assess treatment adherence and discontinuation patterns
- Support cost-effectiveness analysis of early detection and treatment

**Key Features:**
- 20% reduction in all AD progression rates
- 80% treatment initiation rate among diagnosed individuals  
- 10% annual discontinuation rate with exponential survival model
- Uniform effectiveness across all disease state transitions
- Integration with blood-based biomarker testing pathway

3.0 Treatment Framework
+++++++++++++++++++++++

3.1 Treatment Characteristics
-----------------------------

.. list-table:: Hypothetical treatment parameters
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

3.2 Treatment Mechanism
-----------------------

**Disease Modification Approach:**
- Targets underlying disease pathophysiology
- Slows but does not stop disease progression
- Uniform effect across all disease state transitions
- No curative or disease-reversing effects modeled

**Progression Rate Effects:**
- Multiplicative effect on all transition rates (0.8× reduction)
- Applies to: Preclinical AD → MCI → Mild → Moderate → Severe AD
- No effect on initial disease incidence (Susceptible → Preclinical AD)
- Continuous effect while on treatment

4.0 Module Diagram and Data
+++++++++++++++++++++++++++

4.1 Module Inputs
-----------------

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

4.2 Module Outputs
------------------

.. list-table:: Module outputs
  :header-rows: 1

  * - Output
    - Value
    - Application
    - Note
  * - A. Treatment status
    - On treatment/Not on treatment
    - Disease progression modification
    - Time-varying status
  * - B. Treatment initiation events
    - Count by age/location/year
    - Healthcare utilization tracking
    - Links to diagnosis timing
  * - C. Treatment discontinuation events
    - Count by time on treatment
    - Adherence pattern analysis
    - Survival analysis framework
  * - D. Modified progression rates
    - Rate multiplier by individual
    - Disease model integration
    - 0.8× reduction for treated individuals
  * - E. Treatment duration
    - Time on therapy by individual
    - Cost calculation input
    - Discontinuation survival analysis
  * - F. Population treatment coverage
    - Proportion treated by demographics
    - Population impact assessment
    - Scenario comparison metrics

5.0 Treatment Implementation Strategy
+++++++++++++++++++++++++++++++++++++

5.1 Treatment Initiation
------------------------

**Eligibility Criteria:**
- Positive diagnosis from any pathway (BBBM+ or symptomatic)
- All disease states post-diagnosis (Preclinical AD through Severe AD)
- No age restrictions or contraindications modeled
- Immediate eligibility upon diagnosis

**Initiation Process:**
- 80% of diagnosed individuals initiate treatment
- No delay between diagnosis and treatment offer
- Random selection of initiators (no systematic patterns)
- Independent of disease stage at diagnosis

**Geographic and Demographic Variation:**
- Baseline initiation rate consistent across locations
- Potential variation by healthcare system capacity
- No modeled variation by age, sex, or socioeconomic status
- Equal access assumptions within healthcare systems

5.2 Treatment Discontinuation
-----------------------------

**Discontinuation Framework:**
- 10% annual discontinuation rate
- Exponential survival model implementation
- Independent of treatment duration (constant hazard)
- No re-initiation after discontinuation

**Discontinuation Reasons (Conceptual):**
- Side effects and tolerability issues
- Loss of efficacy perception
- Healthcare access changes
- Patient preference changes
- Note: Specific reasons not explicitly modeled

**Survival Analysis Implementation:**
- Monthly discontinuation probability: 1 - exp(-0.10/12)
- Time-to-discontinuation modeling
- Censoring at end of simulation or death
- Population-level adherence curves

5.3 Treatment Effects Modeling
------------------------------

**Progression Rate Modification:**
- Multiplicative effect: treated_rate = base_rate × 0.8
- Applied to all AD progression transitions
- Immediate effect upon treatment initiation
- Effect lost immediately upon discontinuation

**Uniform Effectiveness Assumption:**
- Same 20% reduction across all transitions
- No stage-specific treatment response variation
- No diminishing returns over time
- No tolerance or resistance development

6.0 Evidence Base and Calibration
+++++++++++++++++++++++++++++++++

6.1 Clinical Trial Evidence
---------------------------

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

6.2 Real-World Evidence Integration
-----------------------------------

**Adherence and Discontinuation:**
- Real-world therapy discontinuation rates (10% annually)
- Clinical trial vs. real-world adherence differences
- Long-term treatment sustainability considerations
- Healthcare system implementation challenges

**Population-Level Implementation:**
- Treatment initiation rates in clinical practice (80%)
- Healthcare system capacity and access considerations
- Cost and reimbursement effects on uptake
- Provider and patient acceptance patterns

7.0 Scenario-Specific Implementation
++++++++++++++++++++++++++++++++++++

7.1 Reference Scenario
----------------------

**Treatment Availability:**
- Minimal early-stage treatment (standard of care)
- Late-stage symptomatic treatment only
- Limited population-level impact
- Current real-world treatment patterns

7.2 Alternative Scenario 2
--------------------------

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

8.0 Economic Integration
++++++++++++++++++++++++

8.1 Cost Framework
------------------

**Treatment Costs:**
- Annual treatment cost per patient
- Administration and monitoring costs
- Adverse event management costs
- Healthcare utilization changes

**Cost-Effectiveness Inputs:**
- Treatment duration distributions
- Disease progression delay benefits
- Quality-adjusted life year (QALY) impacts
- Healthcare cost offsets from delayed progression

8.2 Budget Impact Modeling
--------------------------

**Population-Level Costs:**
- Total treated population over time
- Treatment cost trajectories by scenario
- Healthcare system budget impact
- Cost per quality-adjusted life year (QALY) gained

9.0 Validation Framework
++++++++++++++++++++++++

9.1 Treatment Effect Validation
-------------------------------

**Progression Rate Changes:**
- Treated vs. untreated progression rates
- 20% reduction validation across all transitions
- Population-level progression delay measurement
- Time to disease milestones analysis

**Population Impact Validation:**
- Reduction in severe disease prevalence
- Delayed institutionalization patterns
- Mortality impact assessment
- Quality of life preservation

9.2 Implementation Validation
-----------------------------

**Coverage and Adherence:**
- Treatment initiation rate validation (80%)
- Discontinuation rate validation (10% annually)
- Population coverage over time
- Healthcare system utilization patterns

**Scenario Comparison:**
- Reference vs. alternative scenario outcomes
- Incremental treatment effects
- Cost-effectiveness ratio validation
- Population health impact metrics

10.0 Model Assumptions and Limitations
++++++++++++++++++++++++++++++++++++++

10.1 Key Assumptions
--------------------

**Treatment Effectiveness:**
- Uniform 20% progression reduction across all states
- No diminishing effectiveness over time
- No treatment resistance or tolerance development
- Immediate effect upon initiation and loss upon discontinuation

**Implementation Assumptions:**
- Perfect healthcare system implementation
- No supply or capacity constraints
- Uniform access within healthcare systems
- No systematic variation in treatment response

10.2 Known Limitations
----------------------

**Biological Complexity:**
- Simplified treatment mechanism
- No modeling of individual treatment response variation
- No adverse event or contraindication modeling
- No drug-drug interaction considerations

**Healthcare System Realism:**
- No capacity constraint modeling
- Simplified access and implementation assumptions
- No provider training or adoption curve modeling
- No real-world implementation barriers

11.0 Sensitivity Analysis Framework
+++++++++++++++++++++++++++++++++++

11.1 Key Parameter Variations
-----------------------------

**Treatment Effectiveness:**
- Range: 10-40% progression reduction
- Impact on population-level outcomes
- Cost-effectiveness sensitivity
- Threshold analysis for meaningful impact

**Implementation Parameters:**
- Initiation rate: 70-90%
- Discontinuation rate: 5-20% annually
- Combined parameter variation
- Scenario-specific sensitivity analysis

11.2 Uncertainty Quantification
-------------------------------

**Parameter Uncertainty:**
- Monte Carlo simulation across parameter ranges
- Uncertainty propagation through model
- Confidence intervals for population outcomes
- Value of information analysis

12.0 Future Enhancements
++++++++++++++++++++++++

12.1 Treatment Model Sophistication
-----------------------------------

**Advanced Treatment Modeling:**
- Multiple treatment options and combinations
- Personalized treatment response modeling
- Adverse event and safety considerations
- Treatment switching and sequencing strategies

**Biological Realism:**
- Mechanism-specific treatment effects
- Individual variation in treatment response
- Biomarker-guided treatment selection
- Resistance and tolerance development

12.2 Healthcare System Integration
----------------------------------

**Implementation Realism:**
- Healthcare system capacity constraints
- Provider training and adoption modeling
- Real-world implementation barriers
- Health technology assessment integration

**Economic Sophistication:**
- Dynamic pricing and cost modeling
- Reimbursement policy effects
- Healthcare system budget constraints
- Value-based care model integration