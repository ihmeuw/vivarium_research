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

.. _alzheimers_data_challenges:

========================================
Critical Data Challenges and Strategies
========================================

.. contents::
  :local:
  :depth: 2

1.0 Overview
++++++++++++

This document outlines key data challenges identified for the Alzheimer's disease early detection simulation, with particular focus on two novel modeling requirements: (1) stage-specific cost profiles and (2) existing AD testing pathway modeling.

2.0 Stage-Specific Cost Modeling Challenge
+++++++++++++++++++++++++++++++++++++++++++

2.1 The Data Challenge
-----------------------

**Novel Requirement:** The model requires cost estimates for each of the 6 disease states, including preclinical Alzheimer's disease - a population that is largely undiagnosed and unstudied from a cost perspective.

**Why This is Challenging:**
- **Preclinical AD costs:** Essentially no existing data since this population is undiagnosed in current practice
- **Stage-specific granularity:** Most cost-of-illness studies focus on "mild," "moderate," "severe" dementia without fine-grained state definitions
- **Healthcare utilization variation:** Costs vary dramatically by diagnosis status, location, and healthcare system
- **Informal care integration:** Need to capture the 5:1 ratio of total:medical costs (per Lastuka et al. research)

2.2 Proposed Data Strategy
--------------------------

**Preclinical AD Cost Assumptions:**
- **Conservative approach:** Assume minimal excess costs above background population
- **Medical costs:** Standard age-appropriate healthcare utilization
- **Informal care:** Zero excess informal care (cognitively normal)
- **Monitoring costs:** Small additional cost for those who receive BBBM+ diagnosis

**MCI and Dementia Stage Costs:**
- **Literature synthesis:** Cost-of-illness studies by severity level
- **Location-specific adjustment:** Healthcare system and wage differences
- **Informal care scaling:** Apply 5:1 total:medical cost ratio from Lastuka methodology
- **Progression-based interpolation:** Smooth cost increases between documented stages

**Data Sources to Pursue:**
- ICER cost-effectiveness studies (2023) for benchmarking
- Alzheimer's Association cost reports by severity
- Medicare claims analysis for diagnosed AD patients
- International cost studies for location-specific parameters
- Caregiver burden surveys for informal care quantification

2.3 Research Priorities
-----------------------

**High Priority:**
1. **Preclinical cost assumptions validation** - Expert consultation on minimal excess cost assumption
2. **Stage-specific cost interpolation** - Methodology for smooth cost progression curves
3. **Location-specific cost scaling** - PPP adjustment and healthcare system differences

**Medium Priority:**
1. Caregiver burden variation by disease stage
2. Healthcare utilization patterns by diagnosis status
3. Social services and community support cost components

3.0 Existing AD Testing Pathway Challenge
++++++++++++++++++++++++++++++++++++++++++

3.1 The Data Challenge  
-----------------------

**Missing Component:** Current model framework lacks detailed modeling of existing AD diagnostic pathways (CSF biomarkers, PET imaging, clinical assessment), which is critical for:
- **Alternative Scenario 1 value proposition:** Quantifying expensive test avoidance with BBBM
- **Reference scenario realism:** Accurate baseline diagnostic timing and costs
- **Healthcare system impact:** Understanding current vs. alternative testing burden

**Why This is Challenging:**
- **Pathway complexity:** Multiple diagnostic routes with different triggers and timings
- **Healthcare system variation:** Dramatic differences in access and utilization by location
- **Cost heterogeneity:** CSF (~$1,500) vs. PET (~$5,000) vs. clinical assessment costs
- **Timing uncertainty:** Symptom onset to diagnosis delays vary widely

3.2 Proposed Data Strategy
--------------------------

**Testing Pathway Framework:**
- **Symptomatic triggers:** Model cognitive symptom thresholds for testing initiation
- **Healthcare access:** Location-specific testing availability and utilization rates
- **Sequential testing:** Clinical assessment → biomarker confirmation patterns
- **Diagnostic timing:** Age at diagnosis distributions by location and testing pathway

**Cost Framework:**
- **Direct testing costs:** CSF biomarker, PET imaging, clinical assessment fees
- **Healthcare utilization:** Specialist visits, repeat testing, follow-up care
- **Time costs:** Patient and caregiver time for testing procedures
- **Geographic variation:** Healthcare system differences in cost and access

**Data Sources to Pursue:**
- Medicare claims analysis for AD diagnostic codes and procedures
- Healthcare utilization surveys in target countries
- Clinical practice guidelines for AD diagnosis timing
- International Alzheimer's disease registry data
- Healthcare economic evaluations of diagnostic pathways

3.3 Implementation Strategy
---------------------------

**Simplified Approach (Phase 1):**
- **Binary testing status:** Tested vs. untested in reference scenario
- **Average testing costs:** Blended cost of current diagnostic pathways
- **Standard timing:** Literature-based age at diagnosis distributions
- **Location scaling:** Healthcare cost indices for international adaptation

**Enhanced Approach (Phase 2):**
- **Multiple testing pathways:** CSF vs. PET vs. clinical-only routes
- **Sequential testing decisions:** Risk-stratified diagnostic algorithms  
- **Dynamic timing:** Healthcare seeking behavior and access modeling
- **Capacity constraints:** Testing availability and waiting time effects

4.0 Economic Integration Considerations
++++++++++++++++++++++++++++++++++++++++

4.1 Division of Labor with Amy L's Team
---------------------------------------

**IHME Modeling Outputs:**
- Disease state prevalence and transitions by scenario
- Testing utilization by pathway and population
- Treatment uptake and discontinuation patterns
- DALYs and intermediate health outcomes

**Economic Team Integration Needs:**
- Stage-specific cost parameters and uncertainty ranges
- Testing pathway cost estimates by location
- Informal care cost methodology and data sources
- Healthcare utilization pattern assumptions

4.2 Data Handoff Strategy
-------------------------

**Required IHME Deliverables:**
- Population counts by disease state, age, sex, location, year, scenario
- Testing events by modality, timing, and population characteristics
- Treatment events and duration distributions
- Health outcome summaries (DALYs, mortality, progression)

**Economic Team Deliverables:**
- Cost parameters by disease state and location
- Testing cost estimates by pathway and location
- Informal care cost calculation methodology
- Total economic impact synthesis and uncertainty analysis

5.0 Timeline and Research Plan
++++++++++++++++++++++++++++++

5.1 Immediate Actions (Month 1-2)
---------------------------------

**Stage-Specific Costs:**
- Literature review of AD cost-of-illness studies
- Expert consultation on preclinical AD cost assumptions
- Initial cost parameter estimates for model calibration

**Testing Pathway Modeling:**
- Healthcare utilization literature review by location
- Simplified testing pathway framework development
- Initial cost estimates for current diagnostic approaches

5.2 Medium-Term Development (Month 3-6)
---------------------------------------

**Cost Model Refinement:**
- Location-specific cost parameter development
- Informal care cost integration methodology
- Cost uncertainty quantification and sensitivity analysis

**Testing Pathway Enhancement:**
- Detailed diagnostic pathway modeling by location
- Testing utilization pattern validation
- Healthcare system capacity and access modeling

5.3 Validation and Integration (Month 6+)
-----------------------------------------

**Economic Model Validation:**
- Cost estimates validation against published studies
- Total cost-of-illness benchmarking
- Scenario-specific cost-effectiveness validation

**Team Coordination:**
- Regular IHME-Economic team data exchange
- Joint validation of intermediate model outputs
- Coordinated uncertainty analysis and sensitivity testing