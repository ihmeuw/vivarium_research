.. _covid_19:

====================================
Covid-19 Custom Vivarium Cause Model
====================================

.. contents::
   :local:
   :depth: 1

Disease Overview
----------------

.. todo::

   Add a general clinical overview of the covid-19, any relevant research.

:math:`R_{0}` will be defined here as the population level average number of infections a single individual with covid-19 will transmit over the entire infectious period assuming a completely susceptible population and typical mobility and population density.

:math:`R_{0}'` will be defined here as the population level average number of infectiouns a single individual with covid-19 will transmit over the entire infectious period assuming a completely susceptible population and a given level of mobility and population density.

:math:`R_{t}` (effective :math:`R`) will be defined here as the population average number of infections a single individual with covid-19 will transmit over the entire infectious period at a given point in time.

Notably, while :math:`R_{0}`, :math:`R_{0}'`, and :math:`R_{t}` are population level average parameters, the distribution of these parameters at the *individual level* will be highly right skewed, indicating that many infectious individuals will transmit fewer infections than the population mean R value, while some individuals will transmit many more infections that the population mean value (e.g. mass transmission events).

GBD 2017 Modeling Strategy
--------------------------

Covid-19 is not included in GBD 2017. Rather, we will use custom data for all parameters in this cause model.

IHME's existing covid-19 models have fit covariate estimates for population density,  relative mobility, testing capacity, etc. using reported covid-19 deaths and extrapolated covid-19 :math:`R_{t}` values over time.

Vivarium Modeling Strategy
--------------------------

Modeling covid-19 in Vivarium will require a different strategy than our standard cause models. The standard methodology for Vivarium cause models assumes event independence in that one simulant's disease incidence does not affect another simulant's chance of disease incidence. However, given the infectious nature of covid-19, this cause model document will outline a strategy to model the dependent infectious nature of the disease transmission.

The general strategy of the covid-19 cause model in Vivarium will be to utilize the population density and relative mobility covariates in the existing IHME covid-19 model for a specific location (ideally the smallest unit) that have been fit to the derived :math:`R_{t}` value. We can do this by evaluating how hypothetical changes in population density and relative mobility will impact :math:`R_{t}`. The modeling strategy proposed in this document requires the use of :math:`R_{0}` (infectious number given typical mobility/population density and a 100% susceptible population); therefore, this modeling strategy is dependent on the derivation of :math:`R_{0}` from the existing IHME covid-19 models.

Scope
+++++

This cause model requires data exogenous to the model:

- :math:`R_{0}` for covid-19 (derived from IHME model)

  * Notably, :math:`R_{0}'` can be used to model counterfactual scenarios

- Initial prevalence of each disease state (from IHME model forecasts)

Additionally, this cause model strategy aims to model the following parameters (which also require exogenous data sources):

- Susceptible/Exposed/Infectious/Recovered disease states
- Symptomatic/Asymptomatic infectious disease states
- Age- and comorbidity-specific mortality rates
- Transmission related parameters, including

  * Self-quarantine of symptomatic individuals, highly susceptible individuals, etc.
  * Contact tracing/testing of exposed/infected individuals
  * Self-protection measures such as wearing a mask

Assumptions and Limitations
+++++++++++++++++++++++++++

Assumptions: 

- No birth prevalence of covid-19
- Self-quarantined individuals will not become exposed to covid-19
- Random mixing of the population

.. note::

  The last two assumptions may be revisited by incorporating additional complexity

Model Population/Demography
+++++++++++++++++++++++++++

.. todo::

  This section

Cause Model Diagram
+++++++++++++++++++

S -> E -> I -> R

.. list-table:: State Definitions
   :widths: 5 5 20
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - Susceptible
     - Susceptible to covid-19
   * - E
     - Exposed
     - Exposed to covid-19, but not yet infected
   * - I
     - Infectious
     - Infectious with covid-19; symptomatic OR asymptomatic
   * - R
     - Recovered
     - Recovered from covid-19, no longer susceptible

State and Transition Data Tables
++++++++++++++++++++++++++++++++
 
Indicator variables:

.. list-table:: Indicator Variable Definitions
   :widths: 5 5 20
   :header-rows: 1

   * - Variable
     - Values
     - Definition
   * - symptomatic
     - 1 = symptomatic
       
       0 = asymptomatic
     - An individual is expressing covid-19 symptoms
   * - self_quarantine
     - 1 = self quarantine

       0 = no self quarantine
     - An individual is self isolating in their home
   * - traced
     - 1 = contact traced or tested

       0 = not contact traced or tested
     - An individual has been identified as exposed or infected with covid-19 by a public health official

States Data
"""""""""""

.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - S
     - prevalence
     - XXX
     - From IHME forecasts
   * - S
     - excess mortality rate
     - 0
     - N/A
   * - S
     - symptomatic
     - 0
     - NOTE: may revisit to include flu-like symptoms from causes other than covid-19
   * - S
     - traced
     - XXX
     - This will be an experimental variable under various scenarios
   * - E
     - prevalence
     - XXX
     - From IHME forecasts
   * - E
     - excess mortality rate
     - 0
     - N/A
   * - E
     - symptomatic
     - 0
     - NOTE: may revisit to include flu-like symptoms from causes other than covid-19
   * - E
     - traced
     - XXX
     - This will be an experimental variable under various scenarios
   * - I
     - prevalence
     - XXX
     - From IHME forecasts
   * - I
     - excess mortality rate
     - XXX
     - Age-dependent... use IHME data source
   * - I
     - traced
     - XXX
     - This will be an experimental variable under various scenarios
   * - I 
     - symptomatic
     - XXX
     - Age-dependent... does IHME have data source?
   * - R
     - prevalence
     - XXX
     - From IHME forecasts
   * - R
     - excess mortality rate
     - 0
     - Revist based on complications if enough data?
   * - R
     - traced
     - N/A
     - N/A
   * - R
     - symptomatic
     - N/A
     - N/A

self_quarantine prevalence (regardless of state):

  if traced=1 and symptomatic=1, XXX

  if traced=1 and symptomatic=0, XXX

  if traced=0 and symptomatic=1, XXX

  if traced=0 and symptomatic=0, XXX

.. note:: 

  Can make this age- and comorbidity-dependent

Transition Data
"""""""""""""""

.. list-table:: Transition Data
   :widths: 10 10 10 20 30
   :header-rows: 1
   
   * - Transition
     - Source 
     - Sink 
     - Value
     - Notes
   * - e
     - S
     - E
     - See below
     - 
   * - i
     - E
     - I
     - XXX
     - Duration-based transition
   * - r
     - I 
     - R
     - XXX
     - Duration-based transition dependent on age and comorbidities

For the transition between S --> E

Assign each simulant an integer value, num_i 

:math:`R_{0}` = XXX (with skewed distribution)

For each individual in the infected state for which self_quarantine=0, sample from the pool of num_i values for *all* simulants :math:`R_{0}` times. 

For the simulant corresponding to each of the selected num_i value transition from the S to E state if the following conditions are met:

- Simulant is in the S state
- self_quarantine = 0

Data Sources
""""""""""""

.. todo::

  Define data sources/tables

Validation Criteria
+++++++++++++++++++

For self-quarantine prevalence data for the baseline scenario should be chose to accurately reflect the mobility data in the existing IHME forecast model. The microsimulation results should compare to the IHME forecasts assuming that this is the case.

References
----------
