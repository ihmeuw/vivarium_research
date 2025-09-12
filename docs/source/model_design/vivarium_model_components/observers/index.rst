.. _models_observers:

======================
Simulation Observers
======================

Simulation observers are unlike other types of Vivarium model components in that rather than adding to what is included in a Vivarium simulation, simulation observers simply record what is already modeled in the simulation. Simulation observers do just what their name implies: they "observe" specific quantities within the simulation and record those values so that the results of a simulation can be analyzed. It is important that we design simulation observers carefully so that we have the results that we need from each simulation run. This page discusses general guidelines in the design of simulation observers and how to structure observer documentation.

.. contents::
  :local:

Observer background
-------------------

Observers are components in :code:`vivarium_public_health` and several standard observer packages are included in this repository (`see the documentation for these here <https://vivarium.readthedocs.io/projects/vivarium-public-health/en/latest/api_reference/results/index.html#module-vivarium_public_health.results>`_), but custom observers can also be written and included in vivarium simulations as well. As of August of 2025, the following table summarizes the standard observers available in :code:`vivarium_public_health` and the measures that they observe (termed observations).

.. list-table:: Vivarium Public Health Observers
  :header-rows: 1

  * - Observer
    - Observations 
    - Note
  * - MortalityObserver
    - * Deaths
      * Years of life lost (YLLs)
    - By default, this counts cause-specific deaths and years of life lost over the full course of the simulation.
  * - DisabilityObserver
    - * Years lived with disability (YLDs)
    - By default, this counts both aggregate and cause-specific years lived with disability over the full course of the simulation.
  * - DiseaseObserver
    - * Disease state person time
      * Disease state transitions
    - 
  * - CategoricalRiskObserver
    - * Risk exposure category person time
    - 

Two key features of vivarium simulation observers include:

- Observers record quantities that aggregate as sums (such as the sum of deaths or the sum of person time), and
- Observer counts can be stratified by key variables (such as simulant sex or age group)

An example of a standard vivarium observer is a mortality observer that records counts of deaths and years of life lost stratified by simulant sex and age group. Generally, sex and age group are standard strata for vivarium observers, but strata can easily be added and removed in the model specification file by following the instructions on the :ref:`common model changes page <common_model_changes>`.

An example of observer behavior
++++++++++++++++++++++++++++++++

To illustrate how Vivarium simulation observers work, we will step through an example. A population table for a hypothetical vivarium simulation that includes six simulants with assigned values for age, sex, and vital status at the beginning of the simulation (1/1/2025) is shown below. All simulants start the simulation alive.

.. list-table:: Population table, time 1/1/2025
  :header-rows: 1

  * - Simulant
    - Sex
    - Age
    - Vital status
  * - 1
    - Male
    - 25.2
    - Alive
  * - 2
    - Male
    - 76.7
    - Alive
  * - 3
    - Female
    - 51.0
    - Alive
  * - 4
    - Male
    - 98.4
    - Alive
  * - 5
    - Female
    - 71.3
    - Alive
  * - 6
    - Female
    - 37.2
    - Alive

After running the simulation for one year, the updated population table at 1/1/2026 is shown below. We can see that three simulants have died and all other simulants have aged one year.

.. list-table:: Population table, time 1/1/2026
  :header-rows: 1

  * - Simulant
    - Sex
    - Age (current or at time of death)
    - Vital status
  * - 1
    - Male
    - 26.2
    - Alive
  * - 2
    - Male
    - 76.7
    - **Dead**
  * - 3
    - Female
    - 52.0
    - Alive
  * - 4
    - Male
    - 98.4
    - **Dead**
  * - 5
    - Female
    - 71.3
    - **Dead**
  * - 6
    - Female
    - 38.2
    - Alive

Now let's advance one additional year to 1/1/2027. Here we see that one additional simulant has died and the surviving simulants have aged another year.

.. list-table:: Population table, time 1/1/2027
  :header-rows: 1

  * - Simulant
    - Sex
    - Age (current or at time of death)
    - Vital status
  * - 1
    - Male
    - 27.2
    - Alive
  * - 2
    - Male
    - 76.7
    - **Dead**
  * - 3
    - Female
    - 52.0
    - **Dead**
  * - 4
    - Male
    - 98.4
    - **Dead**
  * - 5
    - Female
    - 71.3
    - **Dead**
  * - 6
    - Female
    - 39.2
    - Alive

While it is fairly easy for us to track information about deaths among our simulants in this example by comparing the population tables, this would quickly become inefficient as the number of simulants, timesteps, and measures to track increases. To avoid having to save out the entire population table at various timepoints to track what is happening in the simulation, observers can more efficiently track specific information for us.

An observer to track deaths that occurred during the entire simulation (1/1/2025-1/1/2027) would record the total number of deaths that occurred across all timesteps: equal to 4 deaths in this example.

Age and sex are standard strata for vivarium observers. However, if we would like to examine observed data specific to any of our additional simulated attributes, we can stratify our them by such factors.

  * For instance, a death observer stratified by sex would return:

    - Males: 2 deaths
    - Females: 2 deaths

  * A death observer stratified by sex and year would return:

    * Males, 2025: 2 
    * Males, 2026: 0
    * Females, 2025: 1
    * Females, 2026: 1

General guidelines
------------------

Determining which measures to observe
+++++++++++++++++++++++++++++++++++++

A good place to start in determining what observations you will need for a given simulation is to make a list of all of the measures you will need in order to evaluate the simulation's verification and validation criteria (consult the V&V criteria sections in the relevant component model documents included in your simulation) and the overall results of interest for the simulation (often measures like DALYs averted between scenarios, but this will depend on your specific research question).

Once you have this list, remember that simulation observers record event **counts** rather than rates, so decompose all of the rates into the count measures of the numerators and denominators. For instance, in order to obtain the all-cause mortality rate (ACMR) in a simulation, you will need observations of deaths counts (the ACMR numerator) and person time counts (the ACMR denominator).

There are specific measures that may not obviously lend themselves well to count-type observation. For example, you may wish to observe information related the distribution of a continuous risk exposure included in your simulation. It may be that utilizing the :ref:`interactive context <vivarium_interactive_simulation>` will be a better tool to do this than simulation observers. However, if you do wish to observe the mean value of a continuous risk factor exposure, you can do so using the first moment of that continuous measure as defined below.

.. math::

    \text{First moment}_Y = \sum_{i}Y_i \times \text{person time}_i

    \text{person time} = \sum_{i} \text{person time}_i

    \text{Mean}_Y = \text{First moment}_Y / \text{person time}

Determining stratifying variables
++++++++++++++++++++++++++++++++++

Stratification of observers will likely be necessary for most simulations. However, adding many strata to simulation observers causes computation time to increase, so it is not ideal to add stratifying variables that are not needed. 

Common observer strata include age and sex, since GBD measures are often age- and sex-specific and we typically perform V&V at the age- and sex-specific level. So in order to observe age- and sex-specific ACMR in a vivarium simulation, we would stratify both the mortality and person time observers by sex and age-group.

Additionally, intervention coverage is another common observer stratification. Stratifying population-related observations (such as births or person time) by intervention coverage will enable calculating intervention coverage for V&V and stratifying outcome-related observations (such as deaths) will allow for calculating intervention-specific outcome rates to verify intervention effects.

There are certain variables that may not lend themselves well as observer strata. For instance, the :ref:`LBWSG risk factor <risk_exposure_lbwsg>` has 58 exposure categories and stratifying births and/or person time observers by LBWSG exposure category may result in slower than desired performance. In such cases, utilizing the :ref:`interactive context <vivarium_interactive_simulation>` to obtain such stratified results may be preferable, as it enables evaluation for a single draw/seed/timestep rather than repeating the same stratified observation for every draw/seed/timestep in a given simulation without having to modify the simulation model specifications to do.

An example of determining appropriate observers and strata
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Let's say we are designing observers for the `tutorial simulation`_. The concept model for the tutorial simulation is copied here for easy reference.

.. _tutorial simulation: ../../../onboarding_resources/tutorial/index.ipynb

.. include:: ../../../onboarding_resources/tutorial/index.ipynb
  :start-after: .. _concept_model:
  :end-before: .. _end_concept_model:

Let's say that in addition to modeling the child wasting risk exposure as a categorical variable, we also model the underlying continuous measure of weight-for-height z-score (WHZ). This will allow us to step through an example of observing the mean of a continuous variable.

Let's start by listing all of the measures we would like to output as results from this simulation. Measures marked with an asterisk (*) indicate that they are top-level results for the simulation whereas measures without an asterisk indicate that they will be used only for model verification and validation. For tips on how to generate this list, see the :ref:`Vivarium V&V and results processing page <vivarium_best_practices_results_processing>` that contains a general list of things to verify as well as the specific "Verification and Validation criteria" sections of the documents for all of the model components included in a simulation. 

- SQ-LNS coverage
- Child wasting exposure data, including:

  * Child wasting exposure category prevalence
  * Mean WHZ

- Diarrheal diseases data, including:

  * Prevalence
  * Incidence rate
  * Remission rate
  * Excess mortality rate
  * Cause-specific mortality rate
  * Years lived with disability*
  * Years of life lost

- All cause mortality rate*
- Years of life lost due to all causes*
- SQ-LNS effect on child wasting
- Child wasting effect on diarrheal diseases
 
The next step is decomposing these measures into their numerators and denominators that can be observed in the simulation. A few examples are highlighted in the table below:

.. list-table::
  :header-rows: 1

  * - Measure
    - Numerator
    - Denominator
    - Note
  * - SQ-LNS coverage
    - Person time spent covered by SQ-LNS
    - Overall person time
    - 
  * - Diarrheal diseases remission rate
    - Transitions from the infected to susceptible states of the diarrheal diseases cause model
    - Person time spent infected with diarrheal diseases
    - 
  * - Diarrheal diseases excess mortality rate
    - Deaths due to diarrheal diseases
    - Person time spent infected with diarrheal diseases
    - 
  * - All cause mortality rate
    - Deaths due to all causes
    - Overall person time
    - 
  * - Effect of SQ-LNS on child wasting exposure
    - Child wasting exposure among the population covered by SQ-LNS
    - Child wasting exposure among the population uncovered by SQ-LNS
    - Note that child wasting exposure is an observation of person time stratified by child wasting exposure category
  * - Effect of child wasting on diarrheal diseases incidence rate
    - Incidence rate of diarrheal diseases among a given child wasting exposure category
    - Incidence rate of diarrheal diseases among the child wasting TMREL category
    - Note that the incidence rate of diarrheal diseases is comprised of incidence diarrheal disease cases (numerator) and person time spent susceptible to diarrheal diseases (denominator)
  * - Mean WHZ
    - First moment of WHZ
    - Overall person time
    - First moment measure is defined in the `Determining which measures to observe`_ section

Finally, let's create a list of simulation observers and their strata for use in the simulation that will provide sufficient information to calculate our desired measures:

.. list-table:: Observations and their strata
  :header-rows: 1

  * - Observation
    - Vivarium observer
    - Strata
    - Note
  * - Deaths
    - MortalityObserver
    - * Age group
      * Sex
      * Cause of death (diarrheal diseases, other causes)
      * Child wasting exposure category
    - Note that the standard MortalityObserver stratifies by cause of death by default
  * - YLLs
    - MortalityObserver
    - * Age group
      * Sex
      * Cause of death (diarrheal diseases, other causes)
    - Note that the standard MortalityObserver stratifies by cause of death by default
  * - YLDs
    - DisabilityObserver
    - * Age group
      * Sex
    - Note that the standard DisabilityObserver reports cause-specific and total YLDs by default
  * - Wasting exposure
    - CategoricalRiskObserver
    - * Age group
      * Sex
      * SQ-LNS coverage
    - 
  * - Diarrheal diseases state transitions
    - DiseaseObserver
    - * Age group
      * Sex
      * Transition type (susceptible->infected, infected->susceptible)
      * Child wasting exposure category
    - Note that the standard DiseaseObserver stratifies results by transition type be default
  * - Diarrheal diseases state person time
    - DiseaseObserver
    - * Age group
      * Sex
      * Diarrheal diseases state (susceptible, infected)
      * Child wasting exposure category
    - Note that the standard DiseaseObserver stratifies results by disease state by default
  * - WHZ first moment
    - Custom
    - * Age group
      * Sex
    - 

.. note::

  There is not one unique solution to the designing the set of simulation observers and strata that are sufficient for producing desired simulation results. For instance, here we used the standard DiseaseObserver to return both diarrheal disease transition types, both of which will be stratified by child wasting exposure. However, could also use two custom observers: one to observe incident counts and the other to observer remission counts. This change would allow us to specify different stratifying variables for the different transition types as desired -- for instance, while it is not directly necessary for model results or V&V, perhaps we are interested to see the diarrheal diseases incidence rate stratified by SQ-LNS coverage. Having separate observers for incident and recovery transition counts would allow us to stratify incident counts without also stratifying recovery counts, thus saving computation time and resources.

  Selecting the appropriate balance between fewer observers with more stratification and more observers with fewer strata may depend on the computational expense of your simulation, developmental lift of design, and results processing convenience and may be a topic of open discussion among and between the research and engineering teams for a given project.

See the pseudo code below for examples on how the results from the observers/strata listed above can be used to calculate measures of interest for this simulation:

.. code-block:: python
  
  # get age- and sex-specific all-cause mortality rate by aggregating the deaths and person time observers 
  # over other stratifying variables
  age_and_sex_specific_acmr = (deaths.groupby(['age_group','sex']).sum() 
                              / wasting_state_person_time.groupby(['age_group','sex']).sum())
                              # note that either wasting_state_person_time or diarrheal_diseases_state_person_time 
                              # could be used here because when the former is aggregated over wasting exposure 
                              # category and the latter is aggregated over diarrheal diseases state, each will 
                              # represent total population person time

  # get age- and sex-specific diarrheal diseases cause-specific mortality rate by filtering to deaths due to diarrheal 
  # diseases and aggregating over other variables
  age_and_sex_specific_dd_csmr = (deaths.loc[deaths.cause=='diarrheal_diseases'].groupby(['age_group','sex']).sum() 
                                  / wasting_state_person_time.groupby(['age_group','sex']).sum())

  # get overall population SQ-LNS coverage:
  sqlns_coverage = (wasting_state_person_time.loc[wasting_state_person_time.sqlns=='covered'].sum() 
                    / wasting_state_person_time.sum())

  # get relative risks of child wasting on diarrheal diseases incidence rates
  # first, calculate wasting category-specific diarrheal diseases incidence rates
  dd_incidence_by_wasting_category = (
                                      (dd_transitions.loc[dd_transitions.transition=='suspectible_to_infected']
                                       .groupby(['age_group','sex','wasting_category']).sum())
                                      /
                                      (diarrheal_diseases_state_person_time.loc[diarrheal_diseases_state_person_time.diarrheal_diseases=='susceptible']
                                       .groupby(['age_group','sex','wasting_category']).sum())
                                      )
  # next, get diarrheal diseases incidence among the wasting TMREL
  dd_incidence_wasting_tmrel = (dd_incidence_by_wasting_category.loc[dd_incidence_by_wasting_category=='tmrel']
                                .drop(columns='wasting_category'))
  # now calculate diarrheal diseases incidence rate relative to wasting TMREL
  dd_incidence_rrs = dd_incidence_by_wasting_category / dd_incidence_wasting_tmrel

  # get mean WHZ 
  mean_whz = (whz_first_moment.groupby(['age_group','sex']).sum()
              / wasting_state_person_time.groupby(['age_group','sex']).sum())


Documenting simulation observer requests
-----------------------------------------------

Documentation of simulation observers will occur in the concept model document for a given simulation. Specifically:

- In :ref:`section 2.5 in the concept model template <{YOUR_MODEL_SHORT_NAME}2.5>`, you will document:

  - The default strata for all observers in your simulation, and 
  - The list of all observers to be included in your simulation and and default strata for those observers that are different from the global defaults

- Then for each model run request included in the :ref:`model run request table of the concept model template <{YOUR_MODEL_SHORT_NAME}3.0>`, you can note:

  - Any which observers need to be added or removed for a specific model run (for example: for model 1.0, "Add the death observer, to be included for all future model runs") in the "Observer modifications" column, and 
  - Any changes to observer strata for a specific model run (for example: for model 5.0, "Add intervention coverage stratification to the death observer for V&V") in the "Stratification modifications" column

