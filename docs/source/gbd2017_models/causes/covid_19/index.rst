.. _covid_19:

=========================================
Covid-19 Custom SEIR Vivarium Cause Model
=========================================

.. contents::
   :local:
   :depth: 2

Disease Overview
----------------

.. todo::

   Add a general clinical overview of the covid-19, any relevant research.

:math:`R_{0}` will be defined here as the population level average number of infections a single individual with covid-19 will transmit over the entire infectious period assuming a completely susceptible population and *typical* mobility and population density.

  Notably, :math:`R_0` is approximately equal to the average number of social contacts per person per day multiplied by the transmission probability of a contact between an infectious individual multiplied by the average duration of the infectious period.

:math:`R_{0}'` will be defined here as the population level average number of infectiouns a single individual with covid-19 will transmit over the entire infectious period assuming a completely susceptible population and a *given level* of mobility and population density.

:math:`R_{t}` (or effective :math:`R`) will be defined here as the population average number of infections a single individual with covid-19 will transmit over the entire infectious period at a given point in time.

Notably, while :math:`R_{0}`, :math:`R_{0}'`, and :math:`R_{t}` are population level average parameters, the distribution of these parameters at the *individual level* will be highly right skewed, indicating that many infectious individuals will transmit fewer infections than the population mean R value, while some individuals will transmit many more infections that the population mean value (e.g. mass transmission events).

IHME Covid Team Modeling Strategy
---------------------------------

Covid-19 is not included in currently available GBD study data. Rather, we will use custom data for all parameters in this cause model using available data from the existing IHME covid-19 forecasting model.

IHME's existing covid-19 models have fit covariate estimates for **population density,  relative mobility, testing capacity, seasonality, mask use, and others** values over time. Below is a brief overview of the SEIR component of the IHME forecast model.

.. note::

	The list of covariates used in the IHME model evolves over time and the coviariates available for use in our modeling strategy will need to be cross referenced with the currently available coviates in the IHME forecast model.

The steps that the SEIR component of the forecast model follows are:

#. Fit an SEIR model (e.g. fit :math:`\beta(t)`) to past and recent death model output for all locations

#. Regress :math:`\beta(t)` on available covariates

#. Forecast time-varying covariates into the future

#. Combine regression with forecasts to forecast :math:`\beta(t)`

#. Run forecasted :math:`\beta(t)` through SEIR model to forecast infections

#. Calculate deaths from infections and infection fatality ratio (IFR)

Notably, the IHME forecast SEIR component includes a dual infectious state, :math:`I_{1}` and :math:`I_{2}`. The following equations represent the differential equations for each state in the SEIR component used in the IHME forecast model:

			:math:`S` --> :math:`E` --> :math:`I_1` --> :math:`I_2` --> :math:`R`

:math:`dS/dt = -(\beta(t)S(I_1+I_2)^\alpha)/N`

:math:`dE/dt = (\beta(t)S(I_1+I_2)^\alpha)/N - \sigma E`

:math:`dI_1/dt = \sigma E - \gamma_1 I_1`

:math:`dI_2/dt = \gamma_1 I_1 - \gamma_2 I_2`

:math:`dR/dt = \gamma_2 I_2`

Where,

.. list-table:: Parameter Definitions
   :widths: 5 25
   :header-rows: 1

   * - Parameter
     - Definition
   * - :math:`S`
     - Number of susceptible individuals in the population
   * - :math:`E`
     - Number of exposed individuals in the population
   * - :math:`I_1`
     - Number of individuals in the population in the pre-symptomatic phase of the infectious state
   * - :math:`I_2`
     - Number of individuals in the population in the symptomatic phase of the infectious state
   * - :math:`R`
     - Number of recovered individuals in the population
   * - :math:`N`
     - Number of individuals in all model states
   * - :math:`\beta(t)`
     - Degree of transmission (fit to/driven by model covariates). Approximately average number of contacts per person per time multiplied by the disease transmission probability of a contact between an infectious and susecptible individual
   * - :math:`\alpha`
     - Parameter to account for cluster nature of population transmission network. Ex: if alpha < 1, when the infectious population is large  the force of infection is attenuated
   * - :math:`\sigma`
     - Rate at which an exposed person becomes infectious (enters the :math:`I_1` state), i.e. :math:`1/\text{duration}_{E}`
   * - :math:`\gamma_1`
     - Rate at which an individual transitions from :math:`I_1` to :math:`I_2`, i.e. :math:`1/\text{duration}_{I_{1}}`
   * - :math:`\gamma_2`
     - Rate at which an infectious individual (:math:`I_2`) recovers, i.e. :math:`1/\text{duration}_{I_{2}}`

.. note::

	In standard SEIR models, the parameter :math:`\beta(t)` defined here is often a *constant* parameter that represents the average number of contacts per person per time multiplied by the transmission probability of a contact between an infectious and susceptible individual (equal to :math:`R_0` when unit time is equal to the duration of the infectious period).

	However, as described above, the :math:`\beta(t)` parameter is a function of time the considers the time-varying covariates used in the IHME forecasting model, which allows for the consideration of changes in relative mobility (which could be considered a proxy variable for the number of social contacts per person per time).

Covariates
++++++++++

Descriptions of IHME forecast model covariate definitions, data, and model influence.

Population Density
^^^^^^^^^^^^^^^^^^

Mobility
^^^^^^^^

Testing
^^^^^^^

Mask use
^^^^^^^^

Simulation Science Modeling Strategy
-------------------------------------

Modeling covid-19 will require a different strategy than our standard Vivarium cause models. The standard methodology for Vivarium cause models assumes event independence in that one simulant's disease incidence does not affect another simulant's chance of disease incidence. However, given the infectious nature of covid-19, this cause model document will outline a strategy to model the dependent infectious nature of the disease transmission.

Scope
+++++

The immediate intention of this cause model will be to aid in modeling various scenarios relating to varied population density, mobility, mask use, and other potential covid-19 control measures at the University of Washington and immediately surrounding areas/populations. This covid-19 Vivarium cause model is intended to make use of the data and framework of the existing IHME covid-19 forecast model SEIR component (briefly described above). The scope of this cause model document is intended to develop a basic strategy for an infectious SEIR cause model and will start with minimal complexity and can be expanded upon if it becomes necessary.

Notably, this is currently intended to be a **mortality-only** cause model and does not indend to measure years lived with disability (YLDs).

Main outcomes in this model will be the number of covid-19 infections and deaths in the model population.

Model Population/Demography
+++++++++++++++++++++++++++

The primary model population of interest is University of Washington students and staff. The secondary model population of interest is the non-University of Washington affiliated population in King and Snohomish counties. Our model will only track covid-19 infections that occur within the primary population of interest (Univeristy of Washington students and staff); it will allow for spread of covid-19 infections from the secondary population *into* the primary population, but NOT from the primary population to the secondary population.

The model population for the University of Washington will rely on external data (population size and age/sex structure reported from UW) and will be altered to fit various model scenarios. The model population for non-UW King and Snohomish county residents will be taken from the existing IHME model forecasts for this location without alteration.

.. todo::

	Document model population sizes and age structures for UW

Cause Model Diagram
+++++++++++++++++++

.. image:: cause_model_diagram.svg

.. list-table:: State Definitions
   :widths: 5 25
   :header-rows: 1

   * - Parameter
     - Definition
   * - :math:`S`
     - Susceptible
   * - :math:`S_Q`
     - Susceptible, quarantined
   * - :math:`E`
     - Exposed, but not infectious
   * - :math:`I_Q`
     - Infectious, quarantined
   * - :math:`I_A`
     - Infectious, asymptomatic for entire infectious period
   * - :math:`I_1`
     - Infectious, pre-symptomatic
   * - :math:`I_2`
     - Infectious, symptomatic
   * - :math:`R`
     - Recovered

State and Transition Data Tables
++++++++++++++++++++++++++++++++

Initialization
^^^^^^^^^^^^^^

Simulants will be initialized into covid-19 disease model states based on the forecasted IHME covid-19 model estimates of both King and Snohomish counties as well as the locations from which students may be traveling from.

.. todo::

	Detail specific data source and values

Transitions
^^^^^^^^^^^

.. list-table:: Transitions
   :widths: 5 5 5 10 10
   :header-rows: 1

   * - Source State
     - Sink State
     - Transition Type
     - Value
     - Note
   * - :math:`S`
     - :math:`S_Q`
     - Incidence rate
     - :math:`q_S`
     - False-positive contact tracing probability
   * - :math:`S_Q`
     - :math:`S`
     - Duration
     - 14 days
     - Recommended quarantine duration
   * - :math:`S`
     - :math:`E`
     - Incidence rate
     - See below
     - 
   * - :math:`E`
     - :math:`I_Q`
     - Probabilistic duration
     - Duration: :math:`1/\sigma`, probability: :math:`q_E`
     - :math:`\sigma` from IHME forecast model
   * - :math:`E`
     - :math:`I_A`
     - Probabilistic duration
     - Duration: :math:`1/\sigma`, probability: :math:`(1-q_E)*e_A`
     - :math:`\sigma` from IHME forecast model
   * - :math:`E`
     - :math:`I_1`
     - Probabalistic duration
     - Duration: :math:`1/\sigma`, probability: :math:`(1-q_E)*e_I`
     - :math:`\sigma` from IHME forecast model
   * - :math:`I_A`
     - :math:`I_Q`
     - Incidence rate
     - :math:`q_A`
     - Contact tracing
   * - :math:`I_1`
     - :math:`I_Q`
     - Incidence rate
     - :math:`q_{I1}`
     - Contact tracing
   * - :math:`I_2`
     - :math:`I_Q`
     - Incidence rate
     - :math:`q_{I2}`
     - Contact tracing and/or self-quarantine
   * - :math:`I_1`
     - :math:`I_2`
     - Duration
     - :math:`1/\gamma_1`
     - For those who did not already transition to :math:`I_Q`; :math:`\gamma_1` from IHME forecast model
   * - :math:`I_2`
     - :math:`R`
     - Duration
     - :math:`1/\gamma_2`
     - For those who did not already transition to :math:`I_Q`; :math:`\gamma_2` from IHME forecast model
   * - :math:`I_Q`
     - :math:`R`
     - Duration
     - :math:`1/\gamma_1 + 1/\gamma_2 - \text{time spent in IA or I1 and I2}`
     - 

.. list-table:: Transition Constants
   :widths: 5 5 5 5
   :header-rows: 1

   * - Parameter
     - Definition
     - Value
     - Note
   * - :math:`q_S`
     - Rate of contact tracing in susceptible population
     - XXX
     - 
   * - :math:`q_E`
     - Rate of contact tracing in the exposed population
     - XXX
     - 
   * - :math:`q_A`
     - Rate of contact tracing in the infectious asymptomatic population
     - XXX
     -
   * - :math:`q_{I1}`
     - Rate of contact tracing in the infectious asymptomatic population
     - :math:`q_A`
     -
   * - :math:`q_{12}`
     - Rate of contact tracing or self-quarantine in the infectious symptomatic population
     - XXX
     - 
   * - :math:`e_A`
     - Probability of asymptomatic course of covid-19
     - 0
     - Zero for now because not yet included in IHME forecast model
   * - :math:`e_I`
     - Probability of symptomatic course of covid-19
     - 1
     - See above note
   * - :math:`\sigma`
     - Rate of transition from :math:`E` to :math:`I_1`
     - XXX
     - From IHME forecast model assumptions
   * - :math:`\gamma_1`
     - Rate of transition from :math:`I_1` to :math:`I_2`
     - XXX
     - From IHME forecast model assumptions
   * - :math:`\gamma_2`
     - Rate of transition from :math:`I_2` to :math:`R`
     - XXX
     - From IHME forecast model assumptions

.. todo::

	Provide values for XXX placeholders

Susceptible to Exposed Transition
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The transition from the :math:`S` state to the :math:`E` state in our model will make use of the transition probability used in the IHME forecast model such that the **incidence rate for an individual simulant at time-step t is defined as:**

.. math:: P*\frac{\beta(t)S(I_1+I_2)^\alpha}{N} + (1-P)*\beta(t)'(I_{1'}+I_{2'})^\alpha

Where,

.. list-table:: Parameter Definitions
   :widths: 5 25
   :header-rows: 1

   * - Parameter
     - Definition
   * - :math:`S`
     - Number of simulants in the :math:`S` state at time-step :math:`t`
   * - :math:`I_1`
     - Number of simulants in the :math:`I_1` state at time-step :math:`t`
   * - :math:`I_2`
     - Number of simulants in the :math:`I_2` state at time-step :math:`t`
   * - :math:`N`
     - Total number of simulants in the model at time-step :math:`t`
   * - :math:`\beta(t)`
     - Taken from IHME forecast model under given covariate assumptions for UW population
   * - :math:`\beta(t)'`
     - Taken from IHME forecast model for general King and Snohomish county populations
   * - :math:`I_{1'} + I_{2'}`
     - The number of infectious individuals in the non-modeled King and Snohomish county population from the IHME forecast model
   * - :math:`P`
     - Proportion of all contacts among UW population members that occur within the UW population
   * - :math:`\alpha`
     - Taken from IHME forecast model under stated assumptions

.. note::

	This method assumes random mixing of the UW population (except for as determined by the :math:`\alpha` parameter) and assumes homogeneous transmission probability across all demographic groups within the UW population.

Mortality
^^^^^^^^^

We will model covid-19 mortality using an age-dependent infection fatality ratio (IFR), as consistent with the IHME forecast model. There will be two steps to this piece of the model, the first being the determination of if an individual dies due to covid-19 (described here), and the second being determining *when* they exit their current model state (decribed in the Transition_ section).

In the same time-step for which a simulant is initialized into the :math:`E`, :math:`I_Q`, :math:`I_A`, :math:`I_1`, or :math:`I_2` model states or transitions into the :math:`E` model state, the age-specific IFR should be used to determine if that simulant will die of covid-19, such that the IFR shown in the table below represents the probability that an infected individual dies from covid-19. 

.. csv-table:: Infection Fatality Ratios
	:file: ifr_data.csv
	:header-rows: 1

.. note::

	This data was obtained from an email communication with Abie from May 5, 2020. These values may need to be updated as more recent numbers become available.  

If it is determined that a simulant will die due to covid-19 (as described above), assume that the individual dies at the instant they would have transitioned into the :math:`R` state.

.. todo::

	Investigate if we have an ability to evaluate with race stratification.

Assumptions and Limitations
+++++++++++++++++++++++++++

There are several assumptions used in this cause model:

- Recovered individuals are no longer susceptible to covid-19

- There is no birth prevalence of covid-19

- These is random mixing of the UW population (unless :math:`\alpha` parameter is not equal to one or correlated mixing structure is introduced)

- The transmission probability is homogenous across demographic groups. Students and staff are equally likely to be exposed with covid-19.

This cause model document so far is limited in that it currently:

- Does not account for the individual level heterogeneity of the infectious number R which is skewed and leads to mass transmission events

Validation Criteria
+++++++++++++++++++

This cause model should replicate the IHME forecast model at the population level when the same assumptions and parameter values are used.

Scenarios
+++++++++

The University of Washington is interested in estimating the impact of various conditions for re-opening the University in the fall. The conditions under consideration are listed below.

- Population density (e.g. 30% of students return in-person)
- Mask use (100% in all scenarios)
- Testing  
- Mobility (?)
- Contact tracing (?)
- Symptom attestation (?)

References
----------
