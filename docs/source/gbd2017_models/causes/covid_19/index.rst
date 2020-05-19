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

IHME's existing covid-19 models have fit covariate estimates for **population density,  relative mobility, testing capacity, and temperature.** values over time. Below is a brief overview of the SEIR component of the IHME forecast model.

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
     - Number of infectious individuals in the first infectious state in the population 
   * - :math:`I_2`
     - Number of infectious individuals in the second infectious state in the population
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

.. todo::

  Obtain precise definition of :math:`I_1` versus :math:`I_2`

.. note::

	In standard SEIR models, the parameter :math:`\beta(t)` defined here is often a *constant* parameter that represents the average number of contacts per person per time multiplied by the transmission probability of a contact between an infectious and susceptible individual (equal to :math:`R_0` when unit time is equal to the duration of the infectious period).

	However, as described above, the :math:`\beta(t)` parameter is a function of time the considers the time-varying covariates used in the IHME forecasting model, which allows for the consideration of changes in relative mobility (which could be considered a proxy variable for the number of social contacts per person per time).

Vivarium Modeling Strategy
--------------------------

Modeling covid-19 in Vivarium will require a different strategy than our standard Vivarium cause models. The standard methodology for Vivarium cause models assumes event independence in that one simulant's disease incidence does not affect another simulant's chance of disease incidence. However, given the infectious nature of covid-19, this cause model document will outline a strategy to model the dependent infectious nature of the disease transmission.

Scope
+++++

The immediate intention of this cause model will be to aid in modeling various scenarios relating to varied population density, mobility, and other potential covid-19 control measures at the University of Washington and immediately surrounding areas/populations. This covid-19 Vivarium cause model is intended to make use of the data and framework of the existing IHME covid-19 forecast model SEIR component (briefly described above). The scope of this cause model document is intended to develop a basic strategy for an infectious SEIR cause model and will start with minimal complexity and can be expanded upon if it becomes necessary.

Notably, this is currently intended to be a **mortality-only** cause model and does not indend to measure years lived with disability (YLDs).


Model Population/Demography
+++++++++++++++++++++++++++

.. todo::

	Define demographic model

Cause Model Diagram
+++++++++++++++++++


			:math:`S` --> :math:`E` --> :math:`I_1` --> :math:`I_2` --> :math:`R`

.. list-table:: State Definitions
   :widths: 5 25
   :header-rows: 1

   * - Parameter
     - Definition
   * - :math:`S`
     - Susceptible
   * - :math:`E`
     - Exposed, but not infectious
   * - :math:`I_1`
     - Infectious (define first stage)
   * - :math:`I_2`
     - Infectious (define second stage)
   * - :math:`R`
     - Recovered

State and Transition Data Tables
++++++++++++++++++++++++++++++++

State Data
^^^^^^^^^^

Prevalence
""""""""""

Simulants will be initialized into covid-19 disease model states based on the forecasted IHME covid-19 model estimates. 

.. todo::

	Detail specific data source and values

Mortality
"""""""""

We will model covid-19 mortality using an age-dependent infection fatality ratio (IFR), as consistent with the IHME forecast model. There will be two steps to this piece of the model, the first being the determination of if an individual dies due to covid-19 (described here), and the being determining *when* they exit their current model state (decribed in the `Transition Data`_ section).

In the same time-step for which a simulant is initialized into the :math:`E`, :math:`I_1`, or :math:`I_2` covid-19 model states or transitions into the :math:`E` model state, the age-specific IFR should be used to determine if that simulant will die of covid-19, such that the IFR shown in the table below represents the probability that an infected individual dies from covid-19. 

.. csv-table:: Infection Fatality Ratios
	:file: ifr_data.csv
	:header-rows: 1

.. note::

	This data was obtained from an email communication with Abie from May 5, 2020. These values may need to be updated as more recent numbers become available.  

Transition Data
^^^^^^^^^^^^^^^

Susceptible to Exposed
""""""""""""""""""""""

Method One
~~~~~~~~~~

This method of modeling the susceptible to exposed state transition in the covid-19 model will be a replication of the transition probability used in the IHME forecast model such that the **incidence rate for an individual simulant at time-step t is defined as:**

.. math:: \frac{\beta(t)S(I_1+I_2)^\alpha}{N}

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
     - Taken from IHME forecast model under stated assumptions regarding covariates
   * - :math:`\alpha`
     - Taken from IHME forecast model under stated assumptions

.. note::

	This method assumes random mixing of the population and assumes homogeneous transmission probability across all demographic groups.

Method Two
~~~~~~~~~~

This method of modeling the susceptible to exposed state transition in the covid-19 model uses the :math:`\beta(t)` parameter *scaled to the average duration of the infectious period* OR :math:`R_t` from the IHME forecast model under stated assumptions regarding coviariates as the simulation's :math:`R_0` value under those same stated assumptions.

.. warning::

	This method requires careful scrutiny of the value that will be used for the simulation's :math:`R_0` to ensure that it is being applied in a consistent way

At each time-step, for each simulant in the :math:`I_1` and :math:`I_2` covid-19 model states, sample the following number of simulants from the *entire simulant pool* (see *Important* note below for exception):

.. math:: n_\text{simulants to sample} = R_0 * (\gamma_1 + \gamma_2) * duration_{\text{time step}}

.. important::

	If :math:`R_t` from the IHME forecast model is being used as the simulation :math:`R_0` value, simulants should only be drawn from the pool of simulants who were initialized into the population in the :math:`S` state. Notably, if a simulant is initialized into the :math:`S` state and later progresses to later model states, they are still eligible to be sampled.

Then, if a sampled simulant's current model state is :math:`S`, that simulant should be transitioned to model state :math:`E`. If a sampled simulant's current model state is not :math:`E`, no change should be made.

.. note::

	This method can be expanded to include correlated mixing structures so that certain simulants are more likely to "mix" with others on the basis of age, location, and/or disease state.

	Any correlated mixing structure will need to be expanded upon to instruct how to sample simulants based on these variables. 

Duration Based Transitions
""""""""""""""""""""""""""

The transistions from model states :math:`E` --> :math:`I_1`, :math:`I_1` --> :math:`I_2`, :math:`I_2` --> :math:`R` will be modeled as duration-based transitions. Notably, the duration of each of these states will be dependent on whether a simulant has been determined to die due to covid-19 at the onset of their infection (as described in the Mortality_ section).

The following table defines the state durations before a simulant will transition to the next state given that they were determined **not** to die due to covid-19:

.. list-table:: State Durations
   :widths: 5 5 10
   :header-rows: 1

   * - Source State
     - Duration
     - Note
   * - :math:`E`
     - :math:`1/\sigma`
     - :math:`\sigma` obtained from IHME forecast model
   * - :math:`I_1`
     - :math:`1/\gamma_1`
     - :math:`\gamma_1` obtained from IHME forecast model
   * - :math:`I_2`
     - :math:`1/\gamma_2`
     - :math:`\gamma_2` obtained from IHME forecast model

If it **was** determined that a simulant will die due to covid-19 (as described in the Mortality_ section), assume that the individual dies a the duration of the :math:`1_2` model state instead of transitioning them to the :math:`R` state.

.. warning::

	Determine if these values from IHME forecast model include cases of mortality and update methodology accordingly

Assumptions and Limitations
+++++++++++++++++++++++++++

There are several assumptions used in this cause model:

- Recovered individuals are no longer susceptible to covid-19

- There is no birth prevalence of covid-19

- These is random mixing of the population (unless :math:`\alpha` parameter is not equal to one or correlated mixing structure is introduced)

- The transmission probability is homogenous across demographic groups

This cause model document so far is limited in that it currently:

- Does not account for the individual level heterogeneity of the infectious number R which is skewed and leads to mass transmission events

Validation Criteria
+++++++++++++++++++

This cause model using `Method One`_ for the transition from susceptible to exposed should replicate the IHME forecast model at the population level when the same assumptions and parameter values are used.

This cause model using `Method Two`_ for the transition from susceptible to exposed should replicate the IHME forecast model at the population level when the same assumptions and parameter values are used **AND** when the :math:`\alpha` parameter in the IHME forecast model is set to one *or* when an equivalent correlated mixing structure is considered in the Vivarium cause model. 

References
----------
