.. _models_observers:

======================
Simulation Observers
======================

Simulation observers are unlike other types of vivarium model components in that rather than adding to what is included in a vivarium simulation, simulation observers simply record what is already modeled in the simulation. Simulation observers do just what their name implies: they "observe" specific events that happen within the simulation and record those events so that the results of a simulation can be analyzed. It is important that we design simulation observers carefully so that we have the results that we need from each simulation run. This page discusses general guidelines in the design of simulation observers and how to structure observer documentation.

.. contents::
  :local:

Observer background
-------------------

Observers are components in :code:`vivarium_public_health` and several standard observer packages are included in this repository (`see the documentation for these here <https://vivarium.readthedocs.io/projects/vivarium-public-health/en/latest/api_reference/results/index.html#module-vivarium_public_health.results>`_), but custom observers can also be written and included in vivarium simulations as well.

Two key features of vivarium simulation observers include:

- Observers record quantities that aggregate as sums (such as the sum of deaths or the sum of person time), and
- Observer counts can be stratified by key variables (such as simulant sex or age group)

An example of a standard vivarium observer is a mortality observer that records death counts statified by simulant sex and age group. Generally, sex and age group are standard stratifications for vivarium observers, but stratifications can easily be added and removed in the model spec file by following the instructions on the :ref:`common model changes page <common_model_changes>`.

An example
-------------

To illustrate how Vivarium simulation observers work, we will step through an example. A population table for a hypothetical vivarium simulation that includes six simulants with assined values for age, sex, and vital status at the beginning of the simulation (1/1/2025) is shown below. All simulants start the simulation alive.

.. list-table:: Population table, time 1/1/2025
  :header-rows: 1

  * - Simulant
    - Sex
    - Age
    - Vital status
  * - 1
    - Male
    - 25
    - Alive
  * - 2
    - Male
    - 76
    - Alive
  * - 3
    - Female
    - 51
    - Alive
  * - 4
    - Male
    - 98
    - Alive
  * - 5
    - Female
    - 71
    - Alive
  * - 6
    - Female
    - 37
    - Alive

After running the simulation for one year, the updated population table at 1/1/2026 is shown below. We can see that all simulants have aged one year and that three simulants have died.

.. todo::

  Determine if it is confusing to have simulants who died also age by one year? I think this is actually not how it works in vivarium, but I'd actually rather not get into that detail here?

  Or maybe actually it is important to cover? I am not sure.

.. list-table:: Population table, time 1/1/2026
  :header-rows: 1

  * - Simulant
    - Sex
    - Age
    - Vital status
  * - 1
    - Male
    - 26
    - Alive
  * - 2
    - Male
    - 77
    - **Dead**
  * - 3
    - Female
    - 52
    - Alive
  * - 4
    - Male
    - 99
    - **Dead**
  * - 5
    - Female
    - 72
    - **Dead**
  * - 6
    - Female
    - 38
    - Alive

Now let's advance one additional year to 1/1/2027. Here we see that simulants who were alive on 1/1/2026 have aged by one year and one additional simulant (simulant #3) has died.

.. list-table:: Population table, time 1/1/2027
  :header-rows: 1

  * - Simulant
    - Sex
    - Age
    - Vital status
  * - 1
    - Male
    - 27
    - Alive
  * - 2
    - Male
    - 77
    - **Dead**
  * - 3
    - Female
    - 53
    - **Dead**
  * - 4
    - Male
    - 99
    - **Dead**
  * - 5
    - Female
    - 72
    - **Dead**
  * - 6
    - Female
    - 39
    - Alive

While it is fairly easy for us to track information about deaths among our simulants in this example by comparing the two population tables, you can see how this would quickly become inefficient as the number of simulants, timesteps, and quantities to track increases. To avoid having to save out the entire population table at various timepoints to track what is happening in the simulation, observers can more efficiently track specific information for us.

An observer to track mortality that occured during the entire simulation (1/1/2025-1/1/2027) would record the total number of deaths that occurred across all timesteps: equal to 4 deaths in this example.

If we would like to examine deaths specific to any of our additional simulated attributes, we could stratify our mortality observer by these factors.

  * For instance, a mortality observer stratified by sex would return:

    - Males: 2 deaths
    - Females: 2 deaths

  * A mortality observer stratified by sex and year would return:

    * Males, 2025: 2 
    * Males, 2026: 0
    * Females, 2025: 1
    * Females, 2026: 1

General guidelines
------------------

Determining which measures to observe
+++++++++++++++++++++++++++++++++++++

A good place to start in determining what observers you will need for a given simulation is to make a list of all of the measures you will need in order to evaluate the simulation's verification and validation criteria (consult the V&V criteria sections in the relevant component model documents included in your simulation) and the overall results of interest for the simulation (often measures like DALYs averted between scenarios, but this will depend on your specific research question).

Once you have this list, remember that simulation observers record event **counts** rather than rates, so decompose all of the rates into the count measures in the numerators and denominators. For instance, in order to obtain the all-cause mortality rate (ACMR) in a simulation, you will need an observer to observe deaths counts (the ACMR numerator) and person time counts (the ACMR denominator).

There are specific measures that may not obviously lend themselves well to count-type observation. For example, you may wish to observe information related the distribution of a continuous risk exposure included in your simulation. It may be that utilizing the :ref:`interactive context <vivarium_interactive_simulation>` will be a better tool to do this than simulation observers. However, if you wish to observe measures such as the mean and standard deviation of a continuous risk factor exposure, you can do so using the first and second moment of that continuous measure as defined below.

.. math::

    \text{First moment}_Y = \sum_{i}Y_i \times \text{person time}_i

    \text{Second moment}_Y = \sum_{i}Y_i^2 \times \text{person time}_i

    \text{person time} = \sum_{i} \text(person time)_i

    \text{Mean}_Y = \text{First moment}_Y / \text{person time}

    \text{Standard Deviation}_Y = \sqrt{\text{Second moment}_Y / \text{person time}}

Determining stratifying variables
++++++++++++++++++++++++++++++++++

Stratification of observers will likely be necessary for most simulations. However, adding many stratifications to simulation observers causes computation time to increase, so it is not ideal to add stratification variables that are not needed. 

Common observer stratifications include age and sex, since GBD measures are often age- and sex-specific and so we typically perform V&V at the age- and sex-specific level. So in order to observe age- and sex-specific ACMR in a vivarium simulation, we would stratify both the death and person time observers by sex and age-group.

Additionally, intervention coverage is another common observer stratification. Stratifying population-related observers (such as births or person time) by intervention coverage will enable calculating intervention coverage for V&V and stratifying outcome-related observers (such as deaths) will allow for calculating intervention-specific outcome rates to verify intervention effects.

There are certain variables that may not lend themselves well as observer stratifications. For instance, the :ref:`LBWSG risk factor <risk_exposure_lbwsg>` has 58 exposure categories and stratifying births and/or person time observers by LBWSG exposure category may result in slower than desired performance. In such cases, utilizing the :ref:`interactive context <vivarium_interactive_simulation>` to obtain such stratified results may be preferable, as it allows for

Documenting simulation obsserver requests
-----------------------------------------------

Documentation of simulation observers will occur in the concept model document for a given simulation. Specifically:

- In :ref:`section 2.5 in the concept model template <{YOUR_MODEL_SHORT_NAME}2.5>`, you will document:

  - The default stratifications for all observers in your simulation, and 
  - The list of all observers to be included in your simulation and and default stratifications for those observers that are different from the global defaults

- Then for each model run request included in the :ref:`model run request table of the concept model template <{YOUR_MODEL_SHORT_NAME}3.0>`, you can note:

  - Any which observers need to be added or removed for a specific model run (for example: for model 1.0, "Add the death observer, to be included for all future model runs") in the "Observer modifications" column, and 
  - Any changes to observer stratifications for a specific model run (for example: for model 5.0, "Add intervention coverage stratification to the death observer for V&V") in the "Stratification modifications" column

