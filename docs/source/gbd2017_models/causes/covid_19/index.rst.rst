.. _2017_covid_19:

====================================
Covid-19 Custom Vivarium Cause Model
====================================

.. contents::
   :local:
   :depth: 1

Disease Overview
----------------

.. todo::

   Add a general clinical overview of the cause.

   Define :math:`R_{0}`.


GBD 2017 Modeling Strategy
--------------------------

Covid-19 is not included in GBD 2017. Rather, we will use custom data for all parameters in this cause model.

.. todo::

  Obtain precise definition of assumptions included in IHME's estimation of R_0

Vivarium Modeling Strategy
--------------------------

Modeling covid-19 in Vivarium will require a different strategy than our standard cause models. The standard methodology for Vivarium cause models assumes event independence in that one simulant's disease incidence does not affect another simulant's chance of disease incidence. However, given the infectious nature of covid-19, this cause model document will outline a strategy to model the dependent infectious nature of the disease transmission.

Scope
+++++

This cause model requires data exogenous to the model:

- :math:`R_{0}` for covid-19
- Initial prevalence of each disease state

This cause model strategy aims to model the following parameters:

- Susceptible/Exposed/Infected/Recovered disease states
- Symptomatic/Asymptomatic infected disease states
- Age- and comorbidity-specific mortality
- Transmission related parameters, including

  * Self-quarentine of symptomatic individuals, highly susceptible individuals, etc.
  * Contact tracing of exposed individuals
  * Self-protection measures such as wearing a mask

Assumptions and Limitations
+++++++++++++++++++++++++++

Assumptions: 

- No birth prevalence of covid-19
- Individuals are infectious only when they occupy the I (infected) disease state
- Self-quarentined individuals will not result

Cause Model Diagram
+++++++++++++++++++

S -> E -> I -> R

State and Transition Data Tables
++++++++++++++++++++++++++++++++

This section gives necessary information to software engineers for building the model. 
This section usually contains four tables: Definitions, State Data, Transition Data and Data Sources.

Definitions
"""""""""""

This table contains the definitions of all the states in **cause model diagram**. 

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
     - Infected
     - Infected with covid-19; symptomatic OR asymptomatic
   * - R
     - Recovered
     - Recovered from covid-19, no longer susceptible

Indicator variables:

.. list-table:: Indicator Variable Definitions
   :widths: 5 5 20
   :header-rows: 1

   * - Variable
     - State Name
     - Definition
   * - symptomatic
     - 1 = symptomatic
       0 = asymptomatic
     - 
   * - self_quarentine
     - 2 = strict self quarentine
       1 = self quarentine
       0 = no self quarentine
     - 
   * - traced
     - 1 = contact traced
       0 = not contact traced
    - 

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
     - 
   * - S
     - excess mortality rate
     - 0
     - 
   * - S
     - symptomatic
     - 0
     - NOTE: may revisit to include flu-like symptoms from causes other than covid-19
   * - S
     - traced
     - XXX
     - 
   * - E
     - prevalence
     - XXX
     - 
   * - E
     - excess mortality rate
     - 0
     - 
   * - E
     - symptomatic
     - 0
     - NOTE: may revisit to include flu-like symptoms from causes other than covid-19
   * - E
     - traced
     - XXX
     - 
   * - I
     - prevalence
     - XXX
     - 
   * - I
     - excess mortality rate
     - XXX
     - 
   * - I
     - traced
     - XXX
     - 
   * - I 
     - symptomatic
     - XXX
     - 
   * - R
     - prevalence
     - XXX
     - 
   * - R
     - excess mortality rate
     - 0
     - 
   * - R
     - traced
     - N/A
     - 
   * - R
     - symptomatic
     - 0
     - 


self_quarentine prevalence (regardless of state):

  if traced=1 and symptomatic=1, XXX
  if traced=1 and symptomatic=0, XXX
  if traced=0 and symptomatic=1, XXX
  if traced=0 and symptomatic=0, XXX

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

:math:`R_{0}` = XXX

For each individual in the infected state for which self_quarentine=0, sample from the pool of num_i values for *all* simulants :math:`R_{0}` times. 

For the simulant corresponding to each of the selected num_i value transition from the S to E state if the following conditions are met:

- Simulant is in the S state
- self_quarentine = 0

Data Sources
""""""""""""

.. todo::

  Define data sources/tables

Validation Criteria
+++++++++++++++++++

References
----------
