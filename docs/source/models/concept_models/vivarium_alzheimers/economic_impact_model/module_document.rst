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

.. _2024_vivarium_alzheimers_economic_impact_model:

========================================
Economic Impact Assessment Module
========================================

.. contents::
  :local:
  :depth: 2

1.0 Overview
++++++++++++

This module translates simulated health outcomes into comprehensive economic measures across three scenarios. Recent research reveals that direct medical spending represents only 20% of total dementia costs. Informal care provided by family and friends accounts for 80% of economic impact, totaling $224 billion annually in unpaid care costs. The analysis captures this full economic burden across disease progression stages and intervention strategies.

The module combines healthcare utilization patterns with rigorous economic modeling to assess cost-effectiveness of early detection and intervention programs. The framework provides essential inputs for healthcare planning, policy development, and investment decisions in Alzheimer's disease prevention.

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
  * - Disease state transitions
    - Alzheimer's disease model
    - Stage-specific cost assignment
    - Duration in each state drives costs
  * - Diagnosis status
    - Testing/diagnosis model
    - Cost pathway determination
    - Early diagnosis changes cost patterns
  * - Treatment status
    - Treatment model
    - Intervention cost tracking
    - Treatment costs and monitoring
  * - Demographics
    - Population model
    - Cost stratification
    - Age/sex/location-specific costs
  * - Healthcare utilization
    - Model calculations
    - Service volume quantification
    - Visits, procedures, admissions
  * - Caregiver involvement
    - Model calculations
    - Informal care cost calculation
    - Family caregiver time and burden

2.2 Module Outputs
-------------------

.. list-table:: Module outputs
  :header-rows: 1

  * - Output
    - Value
    - Application
    - Note
  * - Direct healthcare costs
    - USD by category and year
    - Healthcare system planning
    - Medical services, procedures, medications
  * - Long-term care costs
    - USD by setting and intensity
    - LTC system impact assessment
    - Formal care services and facilities
  * - Informal care costs
    - USD valued at opportunity cost
    - Social burden quantification
    - Family caregiver economic impact
  * - Productivity losses
    - USD by patient and caregiver
    - Economic impact assessment
    - Employment and earnings effects
  * - Intervention costs
    - USD by component and scenario
    - Cost-effectiveness analysis
    - Testing and treatment program costs
  * - Total economic burden
    - USD by scenario and year
    - Policy impact evaluation
    - Comprehensive societal costs

3.0 Care Pathways and Service Utilization
++++++++++++++++++++++++++++++++++++++++++

3.1 Healthcare Pathway Components
----------------------------------

**Diagnostic Pathways:**
- Biomarker testing and confirmatory procedures
- Neuropsychological assessment and imaging
- Specialist consultations and follow-up care
- Genetic counseling and family screening

**Treatment Pathways:**
- Medication management and monitoring
- Cognitive and behavioral interventions
- Caregiver education and support programs
- Care coordination and case management

**Long-term Care Pathways:**
- Community-based services and day programs
- Home health aide and personal care services
- Assisted living and memory care facilities
- Skilled nursing and hospice care

3.2 Healthcare Utilization by Disease Stage
--------------------------------------------

.. list-table:: Healthcare Service Utilization Patterns
  :header-rows: 1

  * - Disease Stage
    - Primary Care Visits
    - Specialist Consultations
    - Diagnostic Testing
    - Long-term Care Services
  * - Preclinical AD (Undiagnosed)
    - Standard primary care
    - Minimal neurology contact
    - Routine cognitive screening
    - None
  * - Preclinical AD (Diagnosed)
    - Increased monitoring visits
    - Regular neurology follow-up
    - Annual cognitive assessment
    - Preventive interventions
  * - MCI due to AD
    - Quarterly monitoring
    - Multidisciplinary clinics
    - Comprehensive testing
    - Early support services
  * - Mild AD
    - Monthly clinical visits
    - Psychiatry consultation
    - Safety evaluations
    - Part-time home services
  * - Moderate AD
    - Bi-weekly monitoring
    - Emergency room visits
    - Behavioral management
    - Full-time care assistance
  * - Severe AD
    - Weekly medical care
    - Frequent hospitalizations
    - End-of-life planning
    - 24-hour supervised care

4.0 Economic Modeling Framework
+++++++++++++++++++++++++++++++

4.1 Key Economic Components
---------------------------

**Direct Healthcare Costs:**
- Medical services and hospitalizations
- Prescription medications and monitoring
- Diagnostic testing and confirmatory procedures
- Long-term care services and institutional placement

**Informal Care Costs:**

Informal care represents the largest component of economic burden, with total costs five times higher than direct medical spending. Key impacts include:

- Family caregiver time valued at replacement wages
- Caregiver workforce impacts: 12% reduce work hours or quit jobs
- Lost productivity from missed workdays and reduced efficiency
- Early retirement and career modifications affecting lifetime earnings

**Productivity Losses:**
- Patient employment impacts by disease stage
- Reduced work capacity and wage penalties
- Premature retirement and disability benefits
- Reduced economic output and tax revenue

**Intervention-Specific Costs:**
- Blood-based biomarker testing programs
- Disease-modifying therapy medications
- Enhanced monitoring and care coordination
- Infrastructure and training costs

4.2 Cost Calculation Methods
-----------------------------

.. list-table:: Economic Impact Components
  :header-rows: 1

  * - Cost Category
    - Calculation Method
    - Data Sources
    - Key Assumptions
  * - Direct Medical Costs
    - Service units × Unit costs
    - Claims data, Medicare rates
    - Current price levels
  * - Long-term Care
    - Care hours × Wage rates
    - Labor statistics, surveys
    - Market wage approach
  * - Informal Care
    - Care hours × Opportunity cost
    - Time-use studies, wages
    - Replacement cost method
  * - Productivity Losses
    - Lost work days × Daily wages
    - Employment surveys, wages
    - Human capital approach
  * - BBBM Testing
    - Tests performed × Test cost
    - Technology assessments
    - Projected cost scenarios
  * - Treatment Costs
    - Person-years × Annual cost
    - Pharmaceutical data
    - List price assumptions

**Discount Rates and Time Horizon:**
- 3% annual discount rate for costs and health outcomes
- 80-year time horizon (2020-2100)
- Sensitivity analysis with 0% and 5% discount rates
- All costs expressed in 2024 USD

5.0 Disease Stage-Specific Cost Profiles
+++++++++++++++++++++++++++++++++++++++++

5.1 Comprehensive Cost and Care Analysis
-----------------------------------------

.. list-table:: Care Burden and Economic Impact by Disease Stage
  :header-rows: 1

  * - Disease Stage
    - Informal Care Hours/Week
    - Professional Care Hours/Week
    - Direct Medical (Annual)
    - Long-term Care (Annual)
    - Informal Care (Annual)
    - Productivity Loss (Annual)
    - Total Annual Cost
  * - Preclinical AD (Undiagnosed)
    - 0-2
    - 0
    - $2,000
    - $0
    - $0
    - $0
    - $2,000
  * - Preclinical AD (Diagnosed)
    - 2-5
    - 0-2
    - $5,000
    - $1,000
    - $2,000
    - $3,000
    - $11,000
  * - MCI due to AD
    - 2-8
    - 0-5
    - $8,000
    - $5,000
    - $8,000
    - $10,000
    - $31,000
  * - Mild AD
    - 8-20
    - 5-15
    - $15,000
    - $15,000
    - $20,000
    - $15,000
    - $65,000
  * - Moderate AD
    - 20-40
    - 15-35
    - $25,000
    - $35,000
    - $40,000
    - $5,000
    - $105,000
  * - Severe AD
    - 40+ or institutional
    - 35+ or 24-hour
    - $40,000
    - $70,000
    - $25,000
    - $0
    - $135,000

*Note: These illustrative values demonstrate the cost escalation pattern. Final values will incorporate GBD estimates and location-specific cost data.*

5.2 Cost Escalation Patterns
-----------------------------

**Early Stage Economic Impact:**
Early diagnosis creates immediate cost increases through enhanced monitoring and preventive interventions. However, these costs remain modest compared to later-stage care requirements.

**Caregiver Burden Progression:**
Informal care burden follows a distinctive pattern: rising through mild-to-moderate stages, then declining in severe stages as institutional care replaces family caregiving. This transition represents both cost shifting and family burden relief.

**Healthcare Intensity Growth:**
Direct medical costs increase exponentially with disease progression. Emergency department visits and hospitalizations drive cost acceleration in moderate-to-severe stages.

6.0 Intervention Cost-Effectiveness Analysis
+++++++++++++++++++++++++++++++++++++++++++++

6.1 Cost-Effectiveness Metrics
-------------------------------

.. list-table:: Economic Evaluation Measures
  :header-rows: 1

  * - Metric
    - Definition
    - Calculation
    - Interpretation
  * - Incremental Cost
    - Additional costs vs. reference
    - Cost_intervention - Cost_reference
    - Net cost of intervention
  * - Incremental Effectiveness
    - Averted DALYs vs. reference
    - DALY_reference - DALY_intervention
    - Net health benefit
  * - ICER
    - Cost per DALY averted
    - Incremental cost / Incremental DALYs averted
    - Cost-effectiveness ratio
  * - Net Monetary Benefit
    - Monetized health benefit minus costs
    - (WTP × DALYs averted) - Incremental costs
    - Overall net benefit

6.2 Scenario Comparison Framework
---------------------------------

.. list-table:: Economic Comparison Across Scenarios
  :header-rows: 1

  * - Scenario
    - Total Costs
    - Total DALYs
    - Net Costs vs Reference
    - ICER vs Reference
  * - Reference
    - Baseline
    - Baseline
    - --
    - --
  * - Alternative 1 (BBBM only)
    - Baseline + Testing costs
    - Baseline - Early diagnosis benefit
    - Testing costs
    - Cost per DALY averted of early diagnosis
  * - Alternative 2 (BBBM + Treatment)
    - Alt 1 + Treatment costs
    - Alt 1 - Treatment benefit
    - Testing + Treatment costs
    - Cost per DALY averted of full intervention

7.0 Geographic and System Variations
+++++++++++++++++++++++++++++++++++++

7.1 Location-Specific Economic Parameters
------------------------------------------

**Healthcare System Differences:**
Healthcare costs vary substantially across the 10 priority locations due to different healthcare systems, wage levels, and care delivery models. These variations affect both direct medical costs and informal care valuations.

**Cost Index Adjustments:**
- United States: Reference cost base (index = 1.0)
- High-income Europe (France, Germany, Italy, Spain, UK): 0.8-1.2 relative to US
- Japan: 0.9 relative to US costs
- Middle-income countries (China, Mexico, India): 0.2-0.4 relative to US

**Informal Care Valuation:**
Opportunity costs for informal caregiving vary by local wage levels and employment patterns. Countries with larger informal economies require adjusted valuation methods.

7.2 Healthcare System Integration
---------------------------------

**Capacity and Access Determinants:**
- Healthcare system capacity affects service availability and costs
- Geographic access to specialized testing influences cost patterns
- Insurance coverage variations affect patient cost-sharing
- Provider training and technology adoption influence service efficiency

**Implementation Considerations:**
Different healthcare systems require tailored implementation strategies that affect program costs and effectiveness. Centralized systems may achieve lower per-unit costs but require different organizational approaches.

8.0 Budget Impact and Implementation
++++++++++++++++++++++++++++++++++++

**Population-Level Cost Projections:**
Implementation of blood-based biomarker testing programs requires substantial upfront investment in testing infrastructure, provider training, and care coordination systems. However, these costs may be offset by delayed institutionalization and reduced family caregiver burden.

**Healthcare System Budget Impact:**
Early detection programs shift costs from emergency-driven care to planned prevention and monitoring. This transition requires healthcare system adaptation but may improve care quality while controlling total costs.

9.0 Assumptions and Limitations
+++++++++++++++++++++++++++++++

9.1 Key Assumptions
-------------------

**Economic Modeling:**
- Constant prices over time (no inflation modeling)
- Uniform cost patterns within demographic groups
- Perfect cost measurement and assignment accuracy
- Linear relationship between care intensity and costs

**Geographic Assumptions:**
- Stable healthcare system structures over time
- Uniform access within countries/regions
- Consistent cost reporting and measurement across locations

9.2 Known Limitations
---------------------

**Data Limitations:**
- Limited stage-specific cost data for preclinical AD
- Uncertain informal care valuation methods
- Incomplete productivity loss measurement
- Variable cost data quality across locations

**Modeling Simplifications:**
- Simplified healthcare utilization patterns
- Static cost relationships over time
- Limited modeling of cost feedback effects
- No consideration of technological cost changes

10.0 V&V Criteria
++++++++++++++++++

10.1 Economic Validation
------------------------

**Cost Structure Validation:**
- Total cost distributions align with published cost-of-illness studies
- Stage-specific cost progression matches empirical patterns
- Geographic cost variations consistent with international comparisons
- Informal care cost proportions match research findings (80% of total burden)

**Cost-Effectiveness Validation:**
- ICER calculations compare favorably with established intervention benchmarks
- Net monetary benefit calculations align with willingness-to-pay thresholds
- Sensitivity analysis demonstrates robust cost-effectiveness conclusions

10.2 Implementation Validation
------------------------------

**Budget Impact Assessment:**
- Healthcare system cost projections align with capacity constraints
- Implementation cost estimates reflect realistic program requirements
- Cost-offset timelines consistent with disease progression patterns

11.0 References
+++++++++++++++

**Economic Validation:**

Comprehensive dementia cost-of-illness studies provide validation targets for our economic modeling framework [Hurd2013]_. These studies establish the 5:1 ratio of total economic costs to direct medical spending, validating our emphasis on informal care costs.

Recent productivity loss research [Prada2023]_ quantifies $599 billion annually in caregiver productivity losses, providing benchmarks for our caregiver economic impact calculations.

Cost-effectiveness research for lecanemab [ICER2023]_ provides validation targets for intervention cost-effectiveness ratios and health economic evaluation methods.

.. [Hurd2013] Hurd MD, et al. "Monetary costs of dementia in the United States." *New England Journal of Medicine* 2013; 368(14):1326-1334.

.. [Prada2023] Prada SI, et al. "Indirect Costs of Alzheimer's Disease: Unpaid Caregiver Burden and Patient Productivity Loss." *Value in Health* 2024; 27(6):759-767.