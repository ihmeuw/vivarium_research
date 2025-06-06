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

.. todo::

  Discuss if there is a better way to introduce the concept of an observer? Are they actually VPH components?

  Do we think they need a mathematical definition? Or is this description sufficient?

Two key features of vivarium simulation observers include:

- Observers record event **counts**, and
- Observer counts can be stratified by key variables

An example of a standard vivarium observer is a mortality observer that records death counts statified by simulant sex and age group. Generally, sex and age group are standard stratifications for vivarium observers, but stratifications can easily be added and removed in the model spec file by following the instructions on the :ref:`common model changes page <common_model_changes>`.

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

    \text{Standard Deviation}_Y = \text{Second moment}_Y / \text{person time}

Determining stratifying variables
++++++++++++++++++++++++++++++++++

Stratification of observers will likely be necessary for most simulations. However, adding many stratifications to simulation observers causes computation time to increase, so it is not ideal to add stratification variables that are not needed. 

Common observer stratifications include age and sex, since GBD measures are often age- and sex-specific and so we typically perform V&V at the age- and sex-specific level. So in order to observer age- and sex-specific ACMR in a vivarium simulation, we would stratify both the death and person time observers by sex and age-group.

Additionally, intervention coverage is another common observer stratification. Stratifying population-related observers (such as births or person time) by intervention coverage will enable calculating intervention coverage for V&V and stratifying outcome-related observers (such as deaths) will allow for calculating intervention-specific outcome rates to verify intervention effects.

There are certain variables that may not lend themselves well as observer stratifications. For instance, the LBWSG risk factor has 52 exposure categories and stratifying births and/or person time observers by LBWSG exposure category may result in slower than desired performance. In such cases, utilizing the :ref:`interactive context <vivarium_interactive_simulation>` to obtain such stratified results may be preferable.

Documenting simulation obsserver requests
-----------------------------------------------

Documentation of simulation observers will occur in the concept model document for a given simulation. Specifically:

- In :ref:`section 2.5 in the concept model template <{YOUR_MODEL_SHORT_NAME}2.5>`, you will document:

  - The default stratifications for all observers in your simulation, and 
  - The list of all observers to be included in your simulation and and default stratifications for those observers that are different from the global defaults

- Then for each model run request included in the :ref:`model run request table of the concept model template <{YOUR_MODEL_SHORT_NAME}3.0>`, you can note:

  - Any which observers need to be added or removed for a specific model run (for example: for model 1.0, "Add the death observer, to be included for all future model runs") in the "Observer modifications" column, and 
  - Any changes to observer stratifications for a specific model run (for example: for model 5.0, "Add intervention coverage stratification to the death observer for V&V") in the "Stratification modifications" column

