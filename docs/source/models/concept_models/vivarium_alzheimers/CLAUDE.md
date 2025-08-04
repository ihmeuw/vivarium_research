# Vivarium Alzheimer's Disease Early Detection Simulation - CLAUDE.md

## Project Overview

This project uses IHME's Vivarium microsimulation platform to model the health and economic impacts of early detection and intervention for Alzheimer's disease using blood-based biomarkers (BBBM). The simulation evaluates population-level screening programs and hypothetical disease-modifying therapies across 10 priority locations.

**Key Objectives:**
- Simulate patient journey from biomarker testing through intervention and outcomes
- Compare health and economic impacts across reference and alternative scenarios  
- Provide evidence for early detection strategies and disease-modifying therapies

**Funding:** Client Services Unit (CSU) project focusing on health and economic impact assessment

## Model Architecture

### Core Disease Progression Model
- **6 Health States:** Susceptible → Preclinical AD → MCI due to AD → Mild AD → Moderate AD → Severe AD
- **Age Range:** 30-120 years (observation), 0-120 years (initialization)
- **Time Horizon:** 2020-2100 (80-year simulation)
- **Population:** 100,000 simulants per draw, 100 draws for uncertainty
- **Timestep:** 1 month for precise progression modeling

### Scenarios
1. **Reference:** Current standard of care with minimal BBBM, existing CSF/PET diagnostic pathways
2. **Alternative 1:** 5% annual BBBM uptake (ages 30-44), no intervention
3. **Alternative 2:** BBBM testing + 80% treatment initiation with 20% effectiveness

### Key Model Components

**Blood-Based Biomarker Testing Module:**
- Target: Ages 30-44 years, 5% annual uptake
- Performance: 95% sensitivity, 90% specificity  
- Test correlation: 75-85% chance of same result on repeat testing (5-year window)
- Direct pathway to preclinical AD diagnosis (includes false positives)

**Intervention Module:**
- Treatment initiation: 80% of diagnosed individuals
- Effectiveness: 20% reduction in all progression rates (based on lecanemab trials)
- Discontinuation: 10% annually (exponential survival model)
- Applies uniformly across disease transitions

**Economic Impact Module:**
- Direct healthcare costs, long-term care, informal caregiving
- Productivity losses for patients and caregivers
- Stage-specific cost profiles ($2K-$135K annually from preclinical to severe AD)
- 3% discount rate, 80-year time horizon, costs in 2024 USD

## Key Parameters

### Disease Progression
- Transition rates between health states (age-, sex-, location-specific)
- ~15-year progression span from preclinical to severe AD
- Mortality incorporated at each stage

### Testing Parameters
- BBBM uptake: 5% (range: 3-10%)
- Sensitivity: 95% (range: 90-98%)
- Specificity: 90% (range: 85-95%)
- Test correlation: 75-85% (range: 70-90%)

### Treatment Parameters
- Initiation: 80% (range: 70-90%)
- Effectiveness: 20% reduction (range: 10-40%)
- Discontinuation: 10% annually (range: 5-20%)

## Locations
10 priority locations representing diverse global contexts:
- **High-income:** France, Germany, Italy, Spain, UK, US, Japan
- **Middle-income:** China, Mexico, India

## Data Requirements

### Critical Data Needs
- Alzheimer's-specific (not combined dementia) incidence, prevalence, mortality
- Age-, sex-, location-specific transition rates between disease states
- Duration estimates for each health state
- Healthcare utilization patterns by disease stage

### Intervention Data
- Test performance by demographic groups
- Uptake rates considering supply constraints
- Treatment effectiveness and adherence patterns
- Cost parameters by location and time

## Key Outputs

### Health Outcomes
- Cases in each health state by demographics and year
- Disease progression rates and transitions
- Disability-adjusted life years (DALYs) by scenario
- Time to diagnosis and treatment

### Economic Outcomes  
- Healthcare spending by service category and payer
- Informal care costs and caregiver burden
- Productivity losses by sector and age group
- Cost-effectiveness ratios and net monetary benefits

### Stratification
All outputs stratified by: age group (5-year bands), sex, location, diagnosis status, scenario, year

## Validation Framework

### External Validation Targets
- Disease progression rates: ADNI cohort data (Jedynak et al. 2012)
- Blood biomarker performance: Clinical validation studies (Janelidze et al. 2024)
- Treatment effectiveness: RCT evidence (van Dyck et al. 2023) 
- Economic outcomes: ICER cost-effectiveness studies (2023)
- Population impacts: Prevention trial data (Wimo et al. 2023)

### Model Verification
- Testing uptake matches specifications (5%)
- Diagnostic accuracy aligns with parameters (95%/90%)
- Treatment effects achieve 20% progression reduction
- Economic calculations match cost-of-illness benchmarks

## Key Assumptions and Limitations

### Assumptions
- Test performance constant over time
- Uniform treatment effectiveness across transitions
- Independent biomarker tests (except for correlation modeling)
- Linear disease progression within states
- Healthcare access consistent within locations

### Limitations
- Simplified caregiver burden modeling
- No side effects or contraindications modeled
- Limited preclinical AD economic impact data
- Static cost parameters without technological change

## Important References

### Methodology
- Green et al. (2017): Microsimulation approaches for dementia
- Sukkar et al. (2013): Markov models for disease progression
- Jedynak et al. (2012): AD progression timing (~15 years)

### Validation Data
- van Dyck et al. (2023): Lecanemab efficacy (27% cognitive decline reduction)
- Janelidze et al. (2024): Blood biomarker accuracy (90% diagnostic accuracy)
- ICER (2023): Cost-effectiveness methodology and benchmarks
- Prada et al. (2023): Caregiver burden ($599B annually in productivity losses)

## File Structure
- **concept_model.rst**: Main model specification and overview
- **blood_biomarker_testing.rst**: BBBM testing module details
- **intervention_treatment.rst**: Treatment and effectiveness modeling
- **care_pathways.rst**: Healthcare utilization patterns
- **economic_impact.rst**: Cost and economic analysis methodology

## Economic Methodology - Unpaid Care Integration

### Key Insights from Lastuka et al. Research
**True Cost of Dementia Care:** Direct medical spending ($53B annually) represents only ~20% of total dementia costs. When unpaid family/friend care is valued, total costs increase 5-fold to $277B annually.

**Geographic Cost Disparities:** State-level variation is dramatic:
- Lowest cost: Washington DC ($37K per person annually) 
- Highest cost: West Virginia ($61K per person annually)
- Poorest states often have highest total costs due to unpaid care hours

**Caregiver Economic Impact:**
- 12% of caregivers reduce work hours or quit jobs
- Workforce caregivers miss work days and have reduced productivity
- Non-working caregivers sacrifice volunteer work and leisure time

**Unpaid Care Drivers:**
- Comorbid chronic conditions (diabetes, etc.) increase care needs
- Dementia severity progression (mild → moderate → severe)
- Limited community support infrastructure (Meals on Wheels, adult day centers)
- Geographic variation in home health worker availability

### Model Integration Implications
**Cost Structure Alignment:** Our stage-specific cost profiles should reflect the 5:1 ratio of total:medical costs, with informal care representing the largest component in moderate-severe stages.

**Location-Specific Parameters:** Cost variations by location should account for:
- Different informal care hour requirements
- Healthcare infrastructure availability  
- Community support program accessibility
- State-level chronic disease comorbidity rates

**Intervention Value Proposition:** Early detection and treatment that delays progression could provide substantial indirect cost savings by:
- Reducing total unpaid care hours needed
- Maintaining caregiver workforce participation
- Preventing premature caregiver job exits

## Data Strategy and Critical Modeling Decisions

### Population Dynamics (80-Year Simulation Challenge)
**Fertility Requirements:** 80-year time horizon (2020-2100) with ages 30-120 requires fertility modeling to maintain realistic age structures. Cannot use CVD model approach of tracking younger cohorts only.
- **Need:** Forecasted fertility data for all 10 locations
- **Solution:** Population-based forecasting may be sufficient if age/sex-specific AD rates are stable over time

### Alzheimer's-Specific Cause Definition
**GBD Data Separation:** Current GBD estimates include "Alzheimer's and other dementias" - need to extract AD-only estimates
- **Research Finding:** AD represents ~60-80% of dementia cases (varies by age/sex)
- **IHME Resource:** Jaimie Steinmetz's work on clinical dementia subtypes provides estimates
- **Implementation:** May need custom cause definition for AD vs. other dementias

### Preclinical AD Definition and Progression
**Key Challenge:** Define who tests positive on BBBM and their progression probability to clinical AD
- **Literature Base:** Well-established research on preclinical AD progression patterns
- **Approach:** Back-calculate preclinical population from clinical progression data
- **Calibration Target:** Must align with GBD prevalence by severity while maintaining realistic stage durations

### Disease Progression Forecasting
**Trend Analysis:** Age/sex-specific AD incidence rates appear stable over time (GBD Compare analysis)
- **Implication:** Population-level forecasting may be sufficient without complex Future Health Scenarios (FHS) integration
- **Validation:** IHME forecasting paper confirms minimal change in age/sex-specific rates

### Testing Implementation Strategy
**BBBM Uptake Modeling:** Client defines this flexibly (e.g., "20% of at-risk population identified at age 30")
- **Complexity Level:** Can implement more simply than initially specified
- **Risk Stratification:** Consider family history correlation for testing likelihood
- **Alternative Scenario 1 Value:** Include existing testing (PET, CSF) to quantify expensive test avoidance

### Treatment Scope Decisions
**Symptom vs. Disease-Modifying Drugs:** Exclude symptom-management drugs (don't affect progression)
- **Focus:** Only hypothetical disease-modifying therapy (Lily treatment equivalent)
- **Parameters Needed:** Uptake, effectiveness, adherence, discontinuation (vary by demographics/location/year)

### Economic Analysis Assignment
**Division of Labor:** Joe's team (Managing Research Scientist Amy L) handles economic translation
- **IHME Output:** DALYs and intermediate model outputs
- **Economic Team Input:** Direct healthcare spending, lost wages (patients/caregivers), testing/treatment costs

## Development Notes  
**Materials Integrated:**
- ✅ Colleague's article on unpaid care cost methodology (Lastuka et al.)
- ✅ Data strategy notes and modeling decisions
- ⏳ Planning document details

**Critical Data Needs Identified:**
- Forecasted fertility data for 10 locations (2020-2100)
- AD-specific proportion of "Alzheimer's and other dementias" by age/sex
- Preclinical AD progression probabilities and durations
- Stage-specific duration estimates for calibration
- Testing uptake patterns by demographics and location
- **Stage-specific cost profiles** - NEW DATA CHALLENGE: Limited data on costs by disease state, especially preclinical AD
- **Existing AD testing timing and costs** - Need data strategy for current CSF/PET diagnostic pathways

**Modeling Decision Points:**
- Use population forecasting vs. FHS integration for 80-year horizon
- Implement simple vs. complex BBBM uptake modeling
- Define preclinical AD population and progression parameters
- Scope of existing testing modalities to include in scenarios

**Next Steps:**
- Finalize population forecasting approach
- Obtain Jaimie Steinmetz dementia subtype estimates  
- Literature review for preclinical AD progression parameters
- **Develop data strategy for stage-specific cost modeling** - especially challenging for preclinical AD costs
- **Design approach for existing testing pathway costs/timing** - CSF, PET diagnostic workflow modeling
- Coordinate with Amy L's team on economic methodology alignment