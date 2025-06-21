.. _alzheimers_economic_impact:

Economic Impact Assessment Module
=================================

This page details the methodology for translating health outcomes into economic impacts, including direct healthcare costs, productivity losses, and broader economic consequences of Alzheimer's disease.

Overview
--------

The economic impact module converts simulated health outcomes into comprehensive economic measures across the three key scenarios. Recent research reveals that direct medical spending represents only 20% of total dementia costs. Informal care provided by family and friends accounts for 80% of economic impact, totaling $224 billion annually in unpaid care costs. The analysis captures this full economic burden across disease progression stages and intervention strategies.

Key Economic Components
-----------------------

**Direct Healthcare Costs:**

- Medical services and hospitalizations
- Prescription medications and monitoring
- Diagnostic testing and confirmatory procedures
- Long-term care services and institutional placement

**Informal Care Costs:**

Informal care represents the largest component of economic burden, with total costs five times higher than direct medical spending alone. Key impacts include:

- Family caregiver time and opportunity costs (valued at replacement wages)
- Caregiver workforce impacts: 12% reduce work hours or quit jobs entirely
- Lost productivity from missed workdays and reduced workplace efficiency  
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

Economic Modeling Framework
---------------------------

**Cost Categories and Calculation Methods:**

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

Disease Stage-Specific Cost Profiles
------------------------------------

**Cost Progression by Disease Stage:**

.. list-table:: Annual Economic Impact by Disease Stage (USD, 2024)
  :header-rows: 1

  * - Disease Stage
    - Direct Medical
    - Long-term Care
    - Informal Care
    - Productivity Loss
    - Total Annual Cost
  * - Preclinical AD (Undiagnosed)
    - $2,000
    - $0
    - $0
    - $0
    - $2,000
  * - Preclinical AD (Diagnosed)
    - $5,000
    - $1,000
    - $2,000
    - $3,000
    - $11,000
  * - MCI due to AD
    - $8,000
    - $5,000
    - $8,000
    - $10,000
    - $31,000
  * - Mild AD
    - $15,000
    - $15,000
    - $20,000
    - $15,000
    - $65,000
  * - Moderate AD
    - $25,000
    - $35,000
    - $40,000
    - $5,000
    - $105,000
  * - Severe AD
    - $40,000
    - $70,000
    - $25,000
    - $0
    - $135,000

*Note: These are illustrative values for demonstration. We will use our own research and GBD estimates, which we will compare with established cost-of-illness studies [Hurd2013]_.*

Intervention Cost-Effectiveness Analysis
----------------------------------------

**Cost-Effectiveness Metrics:**

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

**Scenario-Specific Analysis:**

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

Location-Specific Economic Parameters
-------------------------------------

**Geographic Cost Disparities:** Economic burden varies dramatically by location, with some of the poorest regions experiencing the highest total costs due to limited formal care infrastructure.

**Cost Variation Drivers:**
- Formal care availability determines informal care burden
- Healthcare system capacity affects family caregiver hours
- Community support programs (adult day care, Meals on Wheels) reduce family costs
- Wage levels influence opportunity costs of informal care time

**Healthcare System Factors:**
- Healthcare price levels and reimbursement policies
- Long-term care infrastructure and workforce availability  
- Technology adoption rates for diagnostic and monitoring tools
- Cultural attitudes toward family versus institutional care

.. list-table:: Location-Specific Economic Factors
  :header-rows: 1

  * - Location
    - Healthcare Cost Index
    - Wage Level Index
    - Technology Adoption
    - Notes
  * - United States
    - 2.5
    - 1.8
    - High
    - High-cost healthcare system
  * - Germany
    - 1.4
    - 1.5
    - High
    - Social insurance model
  * - China
    - 0.8
    - 0.6
    - Medium
    - Rapid healthcare expansion
  * - India
    - 0.3
    - 0.3
    - Low-Medium
    - Limited formal care systems
  * - Mexico
    - 0.6
    - 0.5
    - Medium
    - Mixed public-private system

Budget Impact Analysis
----------------------

**Healthcare System Perspectives:**

- Public payer costs (Medicare, Medicaid, national health systems)
- Private insurance and out-of-pocket expenses
- Long-term care financing and family costs
- Government productivity and tax revenue impacts, validated against global cost studies [Wimo2017]_

**Implementation Costs:**

- Biomarker testing program infrastructure
- Healthcare provider training and education
- Quality assurance and monitoring systems
- Population outreach and education campaigns

**Dynamic Economic Effects:**

- Learning curves and cost reductions over time
- Market competition and price changes
- Healthcare system adaptation and efficiency gains
- Spillover effects on related healthcare services

Sensitivity and Uncertainty Analysis
------------------------------------

**Key Parameters for Sensitivity Analysis:**

- Discount rates (0%, 3%, 5%)
- Treatment effectiveness (10%, 20%, 40%)
- Test performance (sensitivity, specificity)
- Cost parameters (±50% variation)
- Time horizon (20, 40, 80 years)

**Probabilistic Sensitivity Analysis:**

- Parameter uncertainty distributions
- Monte Carlo simulation with 1,000 iterations
- Cost-effectiveness acceptability curves
- Value of information analysis

**Scenario Analysis:**

- Alternative testing strategies (age ranges, frequencies)
- Different treatment profiles (effectiveness, costs)
- Healthcare system variations
- Economic development scenarios

Output Specifications
---------------------

**Primary Economic Outputs:**

- Total economic impact by scenario and location
- Cost-effectiveness ratios and net monetary benefits
- Budget impact projections for healthcare systems
- Distributional analysis by population subgroups

**Detailed Cost Breakdowns:**

- Healthcare spending by service category and payer
- Informal care costs and family financial burden
- Productivity losses by sector and age group
- Testing and treatment program costs

**Decision-Support Metrics:**

- Return on investment for early detection programs, which we will compare with prevention trial economic evaluations [Wimo2023]_
- Payback periods for intervention investments
- Affordability thresholds and financing requirements
- Equity impacts and accessibility considerations

Cost Data Strategy
------------------

**Primary Cost Components:** Economic analysis requires comprehensive data spanning formal healthcare costs and informal care valuations.

**Direct Cost Sources:**
- Healthcare claims and administrative data by disease stage
- Long-term care facility costs and utilization rates
- Diagnostic testing costs including blood biomarkers, CSF, and PET
- Prescription drug costs for disease-modifying therapies

**Informal Care Valuation:**
- Time-use surveys quantifying care hours by disease severity
- Wage data for replacement cost method of care valuation  
- Caregiver workforce participation and productivity impacts
- Geographic variation in care hours and availability of formal services

**Implementation Team:** IHME provides health outcomes (DALYs) and intermediate model outputs. Amy Lastuka's economic team translates these outputs into comprehensive cost estimates including direct healthcare spending, lost wages for patients and caregivers, and testing/treatment program costs.

Validation and Calibration
--------------------------

**Calibration Targets:**

- Total economic burden aligning with 5:1 informal-to-medical cost ratio
- State-specific cost variations reflecting care infrastructure differences
- Published cost-of-illness studies with comprehensive informal care estimates
- Healthcare utilization patterns from administrative data
- Caregiver burden studies quantifying workforce impacts

**External Validation:**

- Comparison with Lastuka et al. findings on unpaid care burden ($224B annually)
- Cross-validation with alternative modeling approaches
- Expert review and stakeholder feedback
- Policy maker and payer input on assumptions

Limitations and Future Enhancements
-----------------------------------

**Current Limitations:**

- Limited data on preclinical AD economic impacts
- Simplified modeling of caregiver economics
- Static cost parameters without technological change
- Uncertainty in long-term intervention effects

**Future Model Enhancements:**

- Dynamic cost modeling with technological progress
- Heterogeneous economic impacts by population subgroups
- Integration with broader economic and demographic models
- Real-world evidence integration and model updating

External Validation References
-------------------------------

**Economic Burden Validation:**

Comprehensive US economic analysis showing $832 billion total annual indirect costs validates our cost structure and caregiver burden estimates. Foundational cost-of-illness studies [Hurd2013]_ provide baseline healthcare utilization patterns and direct cost estimates by disease stage.

**Cost-Effectiveness Validation:**

Lifetime Markov model preventing 1,623 dementia cases per 100,000 people [Wimo2023]_ provides population-level intervention impact benchmarks. Authoritative cost-effectiveness analysis [ICER2023]_ provides methodology validation and DALY-based economic evaluation benchmarks.

**International Cost Comparisons:**

Global cost analysis [Wimo2017]_ provides location-specific economic factors and cross-country validation targets for our multi-location economic modeling.

.. [Wimo2023] Wimo A, et al. "Dementia prevention: The potential long-term cost-effectiveness of the FINGER prevention program." *Alzheimer's & Dementia* 2023; 19(4):1342-1352.

.. [Hurd2013] Hurd MD, et al. "Monetary costs of dementia in the United States." *New England Journal of Medicine* 2013; 368(14):1326-34.


.. [Wimo2017] Wimo A, et al. "The worldwide costs of dementia 2015 and comparisons with 2010." *Alzheimer's & Dementia* 2017; 13(1):1-7.