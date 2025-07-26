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

.. _2024_vivarium_alzheimers_population_model:

======================================
Population Model (2020-2100)
======================================

.. contents::
  :local:
  :depth: 2

1.0 Overview
++++++++++++

This module implements a comprehensive population model spanning the 80-year simulation period from 2020 to 2100. The model tracks demographic changes including births, deaths, and net migration to maintain realistic population structures for Alzheimer's disease modeling across all 10 priority locations.

2.0 Module Objectives
+++++++++++++++++++++

**Primary Objectives:**
- Provide accurate population forecasting for 80-year time horizon (2020-2100)
- Maintain realistic age and sex distributions across all simulation years
- Support fertility and mortality dynamics for population sustainability
- Enable accurate Alzheimer's disease prevalence and incidence projections

**Key Features:**
- Age range: 0-120 years (initialization and observation)
- Time period: 2020-2100 (80-year simulation)
- Population size: 100,000 simulants per draw, 100 draws
- Monthly timesteps for precise demographic modeling
- Location-specific demographic parameters

3.0 Module Diagram and Data
+++++++++++++++++++++++++++++++

3.1 Module Inputs
------------------

.. list-table:: Module required inputs
  :header-rows: 1

  * - Input
    - Source
    - Application
    - Note
  * - Age-specific fertility rates (ASFR)
    - GBD forecasting data
    - Births by maternal age (15-49 years)
    - Location- and year-specific forecasts
  * - Age-sex-specific mortality rates
    - GBD forecasting data  
    - All-cause mortality by age/sex/year
    - Separate from Alzheimer's-specific mortality
  * - Net migration rates
    - GBD forecasting data
    - Population flows by age/sex/year
    - Optional parameter based on location needs
  * - Initial population structure
    - GBD 2020 population data
    - Starting age/sex distribution
    - Calibrated to GBD 2020 baseline

3.2 Module Outputs
-------------------

.. list-table:: Module outputs
  :header-rows: 1

  * - Output
    - Value
    - Application
    - Note
  * - A. Population size by age/sex/year
    - Count by demographic strata
    - Denominators for AD prevalence/incidence
    - Monthly updates throughout simulation
  * - B. Birth events
    - Count by year
    - New simulants entering population
    - Maternal age distribution maintained
  * - C. Non-AD death events
    - Count by age/sex/year
    - Background mortality (excluding AD)
    - Input to overall mortality calculations
  * - D. Migration events
    - Count by age/sex/year
    - Net population flows
    - May be zero for some locations
  * - E. Person-years of observation
    - Time-at-risk by age/sex
    - Denominators for rate calculations
    - Critical for accurate incidence/prevalence

4.0 Model Implementation Strategy
+++++++++++++++++++++++++++++++++

4.1 Population Forecasting Approach
------------------------------------

**Strategy Decision:** Use population-based forecasting rather than complex Future Health Scenarios (FHS) integration based on evidence that age/sex-specific Alzheimer's disease rates remain stable over time.

**Implementation:**
- GBD forecasting provides fertility, mortality, and migration projections
- Age/sex-specific AD rates applied to forecasted population structure
- Monthly population updates maintain demographic accuracy
- Separate tracking of AD vs. non-AD mortality to avoid double-counting

4.2 Fertility Modeling
----------------------

**Critical Requirement:** 80-year time horizon necessitates fertility modeling to maintain realistic age structures (cannot rely solely on tracking older cohorts).

**Parameters:**
- Age-specific fertility rates (ages 15-49)
- Location-specific fertility forecasts through 2100
- Sex ratio at birth (approximately 1.05 male:female)
- Maternal age distribution effects on offspring characteristics

4.3 Mortality Framework
-----------------------

**All-Cause Mortality Components:**
- Background mortality (non-Alzheimer's causes)
- Alzheimer's-specific mortality (handled in disease progression module)
- Competing risks framework to avoid double-counting
- Age/sex/location/year-specific rates

**Implementation Notes:**
- Background mortality rates exclude Alzheimer's disease deaths
- Disease progression module adds AD-specific mortality risk
- Monthly probability calculations from annual rates
- Proper rate-to-probability conversions for timestep accuracy

5.0 Data Requirements and Sources
+++++++++++++++++++++++++++++++++

5.1 Primary Data Sources
-------------------------

**GBD Forecasting Hub:**
- Fertility forecasts by location and year
- Mortality forecasts by age/sex/location/year  
- Migration forecasts by age/sex/location/year
- Population structure forecasts

**Validation Targets:**
- UN World Population Prospects (external validation)
- Location-specific demographic surveys
- Official national population projections

5.2 Location-Specific Parameters
---------------------------------

.. list-table:: Location-specific data requirements
  :header-rows: 1

  * - Location Category
    - Example Locations
    - Data Considerations
    - Special Requirements
  * - High-income countries
    - France, Germany, Italy, Spain, UK, US, Japan
    - Low fertility, aging populations
    - Migration may be significant
  * - Middle-income countries  
    - China, Mexico, India
    - Demographic transition in progress
    - Rapid population aging expected

6.0 Validation Framework
++++++++++++++++++++++++

6.1 Population Structure Validation
------------------------------------

**Age Distribution Checks:**
- Population pyramids by location and decade
- Dependency ratios (elderly:working age)
- Median age progression over time
- Comparison to UN Population Division forecasts

**Demographic Transition Validation:**
- Total fertility rate trajectories
- Life expectancy progressions
- Age-standardized mortality rate trends
- Population growth rate validation

6.2 Internal Consistency Checks
--------------------------------

**Balance Equation Validation:**
- Population(t+1) = Population(t) + Births - Deaths + Net Migration
- Monthly population updates sum to annual totals
- Age progression consistency (cohort tracking)
- No negative population values in any age/sex group

7.0 Model Assumptions and Limitations
+++++++++++++++++++++++++++++++++++++

7.1 Key Assumptions
-------------------

**Demographic Stability:**
- Age/sex-specific Alzheimer's rates constant over time
- Fertility/mortality forecasts are reliable through 2100
- Migration patterns follow historical trends
- No major demographic disruptions (pandemics, wars, climate)

**Methodological Assumptions:**
- Monthly timesteps provide sufficient demographic precision
- GBD forecasting methodology remains consistent
- Population closed to external shocks beyond modeled parameters

7.2 Known Limitations
---------------------

**Forecasting Uncertainty:**
- 80-year horizon introduces substantial uncertainty
- Climate change impacts not explicitly modeled
- Economic disruption effects not captured
- Political instability impacts not included

**Technical Limitations:**
- Static migration patterns may not reflect future changes
- No feedback between AD burden and demographic parameters
- Simplified fertility-mortality interactions

8.0 Future Enhancements
+++++++++++++++++++++++

8.1 Potential Model Extensions
-------------------------------

**Advanced Demographics:**
- Educational attainment stratification
- Urban/rural population dynamics
- Household composition modeling
- Socioeconomic status integration

**Dynamic Interactions:**
- Alzheimer's burden effects on fertility/migration
- Healthcare system capacity constraints
- Economic feedback mechanisms
- Climate adaptation scenarios

8.2 Data Enhancement Opportunities
-----------------------------------

**Improved Forecasting:**
- Machine learning approaches to demographic forecasting
- Uncertainty quantification improvements
- Real-time demographic data integration
- Subnational population disaggregation