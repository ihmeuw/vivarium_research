.. _alzheimers_economic_impact:

Economic Impact Assessment Module
=================================

This page details the methodology for translating health outcomes into economic impacts, including direct healthcare costs, productivity losses, and broader economic consequences of Alzheimer's disease.

Overview
--------

The economic impact module converts simulated health outcomes into comprehensive economic measures across the three key scenarios. The analysis captures direct healthcare spending, informal care costs, productivity losses, and broader societal economic impacts associated with Alzheimer's disease progression and early intervention strategies.

Key Economic Components
-----------------------

**Direct Healthcare Costs:**

- Medical services and hospitalizations
- Prescription medications and monitoring
- Diagnostic testing and confirmatory procedures
- Long-term care services and institutional placement

**Informal Care Costs:**

- Family caregiver time and opportunity costs
- Caregiver health impacts and healthcare utilization
- Lost productivity from caregiving responsibilities
- Early retirement and career modifications

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

*Note: These are illustrative values for demonstration. Actual values will be calibrated to location-specific data.*

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

**Healthcare Cost Variations:**

- Wage levels and healthcare prices by location
- Healthcare system efficiency and delivery models
- Currency conversion and purchasing power adjustments
- Healthcare financing and reimbursement patterns

**Economic Development Factors:**

- GDP per capita and economic growth rates
- Labor force participation and employment patterns
- Social protection systems and disability benefits
- Healthcare infrastructure and technology adoption

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
- Government productivity and tax revenue impacts

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

- Return on investment for early detection programs
- Payback periods for intervention investments
- Affordability thresholds and financing requirements
- Equity impacts and accessibility considerations

Validation and Calibration
--------------------------

**Calibration Targets:**

- Current Alzheimer's-related healthcare spending by location
- Published cost-of-illness studies
- Healthcare utilization patterns from administrative data
- Caregiver burden and informal care studies

**External Validation:**

- Comparison with existing economic evaluations
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