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

.. _2021_concept_model_vivarium_nutrition_optimization_children:

===================================================
Nutrition Optimization Concept Model: CHILDREN
===================================================

.. contents::
  :local:

1.0 Overview
++++++++++++

This is the concept model document for the CHILD component of the Nutrition Optimization simulation model.
Documents that contain information specific to the overall model and the pregnancy subcomponent can be found here:

- :ref:`Overall nutrition optimization concept model document <2021_concept_model_vivarium_nutrition_optimization>`

- :ref:`Pregnancy subcomponent concept model <2021_concept_model_vivarium_nutrition_optimization_pregnancies>`

.. _nutritionoptimizationchild2.0:

1.1 Modeling aims and objectives
---------------------------------

1.2 Outstanding questions and/or high-level to-dos
-------------------------------------------------------

2.0 Model design
++++++++++++++++

2.1 Concept model diagram
-------------------------

.. image:: nutrition_optimization_child_concept_model.svg

2.2 Submodels
-------------

.. list-table:: Risk exposure subcomponents
  :header-rows: 1

  * - Component
    - Existing version
    - Wave I update
    - Wave II update
    - Note
  * - LBWSG exposure
    - :ref:`2019 docs<2019_risk_exposure_lbwsg>`, implemented in IV iron
    - Artifact rebuild
    - 
    - 
  * - Child wasting exposure
    - :ref:`2020 docs<2020_risk_exposure_wasting_state_exposure>`, implemented in wasting paper
    - Calibration will need to include stunting/underweight mortality effects
    - Transitions for 0-6 months
    - (Does not require separate 2021 update)
  * - Child stunting exposure
    - :ref:`2020 docs<2020_risk_exposure_child_stunting>`, implemented in IV iron, wasting paper
    - Artifact rebuild
    - 
    - (Does not require separate 2021 update)
  * - Child underweight exposure
    - No
    - New :ref:`child underweight exposure model <2020_risk_exposure_child_underweight>`, still in progress
    - 
    - (Does not require separate 2021 update)
  * - Target area
    - No
    - N/A
    - Needs to be created!
    - 
 
.. list-table:: Risk effects subcomponents
  :header-rows: 1

  * - Risk
    - Affected outcome
    - Existing version
    - Wave I update
    - Wave II update
    - Note
  * - LBWSG
    - Mortality
    - :ref:`Docs here<2019_risk_effect_lbwsg>`, implemented in IV iron
    - 
    - Will need PAF calculation for GBD 2021
    - 
  * - LBWSG
    - Wasting
    - Yes, docs part of :ref:`antenatal supplementation intervention CGF effects <maternal_supplementation_intervention>`. Implemented in IV iron
    - Use "static child wasting" effects from birth through initialization into the 6-11 month age group only; then wasting exposure model updates to transition model
    - Update to transition wasting model 0-6m
    - 
  * - LBWSG
    - Stunting
    - Yes, docs part of :ref:`antenatal supplementation intervention CGF effects <maternal_supplementation_intervention>`, implemented in IV iron
    - 
    - 
    - 
  * - CGF (wasting, stunting, and underweight)
    - Infectious disease
    - Only wasting is documented :ref:`found here <2019_risk_effect_wasting>`. Docs need updating
    - Update to 2021 values, add underweight risk effects, add malaria as affected outcome
    - None
    - (Does not require separate 2021 update)
  * - Target area
    - CGF
    - No
    - N/A
    - Needs to be created
    - 

.. list-table:: Intervention subcomponents
  :header-rows: 1

  * - Intervention
    - Existing version
    - Wave I update
    - Wave II update
    - Note
  * - SAM tx
    - :ref:`Docs here <intervention_wasting_treatment>`, implemented in wasting paper
    - :ref:`Updated modeling strategy (combined protocol data) found here <intervention_wasting_tx_combined_protocol>`
    - 
    - 
  * - MAM tx
    - :ref:`Docs here <intervention_wasting_treatment>`, implemented in wasting paper
    - :ref:`Updated modeling strategy (combined protocol data) found here <intervention_wasting_tx_combined_protocol>`
    - 
    - 
  * - SQLNS
    - :ref:`Docs here <lipid_based_nutrient_supplements>`, implemented in wasting paper
    - Need to double check lognormal distribution for effects and change duration of supplementation
    - 
    - 

.. list-table:: Cause subcomponents
  :header-rows: 1

  * - Cause
    - Existing version
    - Wave I update
    - Wave II update
    - Note
  * - Diarrheal diseases
    - :ref:`Docs here <2019_cause_diarrhea>`, implemented in IV iron
    -  
    - 
    - 
  * - Measles
    - :ref:`Docs here <2019_cause_measles>`, implemented in IV iron
    - 
    - 
    - 
  * - Lower respiratory infections (LRI)
    - :ref:`Docs here <2019_cause_lower_respiratory_infections>`, implemented in IV iron
    - 
    - 
    - 
  * - Malaria
    - No existing version
    - Needs to be created!
    - 
    - 
  * - Background morbidity
    - :ref:`Docs here <other_causes_ylds>`, but has not yet been implemented
    - 
    - 
    - Bonus model, not a high priority

2.2.1 Task tracking for each wave
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table:: Wave I outstanding tasks
  :header-rows: 1

  * - Task
    - Dependencies
    - Research person
    - Engineering person
  * - 1: computational resource scoping
    - .
    - Done! (Ali)
    - Done! (Rajan)
  * - 2: Timestep increase strategy
    - Delayed to wave II based on task 1 findings
    - .
    - .
  * - 3: Child underweight exposure model
    - Need DHS data
    - Ali
    - TBD
  * - 4: Child wasting exposure calibration equation updates (to include underweight, stunting mortality effects)
    - After task 3
    - Ali
    - TBD
  * - 5: 2021 CGF risk effects
    - .
    - Syl
    - TBD
  * - 6: Malaria cause model
    - .
    - Syl
    - TBD
  * - 7: Update SAM and MAM tx effects to COMPAS
    - .
    - Done (Ali)
    - TBD
  * - 8: Update SQLNS docs for lognormal dist, supplementation duration
    - .
    - Ali
    - TBD
  * - 9: Clarify LBWSG on wasting risk effect
    - .
    - Ali
    - TBD
  * - 10: Artifact rebuilds
    - None; ask Ali about which parameters need rebuilds if we run into any problems
    - .
    - TBD
  * - 11: LBWSG PAF recalculation
    - After task 1
    - .
    - TBD

.. list-table:: Wave II outstanding tasks
  :header-rows: 1

  * - Task
    - Dependencies
    - Research person
    - Engineering person
  * - 1: Wasting transition model for 0-6 months
    - .
    - Latera (Ali to provide context)
    - TBD
  * - 2: Update LBWSG effect on wasting for transitions among 0-6 months
    - After step 1
    - TBD
    - TBD
  * - 3: Target area risk exposure
    - .
    - TBD
    - TBD
  * - 4: Target area risk effects
    - After task 3
    - TBD
    - TBD
  * - 5: General 2021 update, location expansion
    - GBD timeline
    - TBD (tasks are .csv data file updates; modeling strategy updates already complete)
    - TBD (tasks are artifact updates)
  * - 6: Implement some strategy to increase timestep (YLD/YLL-only or variable timestep)
    - TBD on whether this is necessary. Depends on how fast simulations are running and timeline details
    - TBD
    - TBD

2.3 Default specifications
--------------------------

.. list-table::
  :header-rows: 1

  * - Parameter
    - Value
    - Note
  * - Location(s)
    - Ethiopia (ID: 179)
    - Eventually will also add Nigeria (214) and Pakistan (164)
  * - Number of draws
    - Same as pregnancy sim output data
    - 
  * - Population size per draw
    - Same as pregnancy sim output data
    - 
  * - Cohort type
    - Closed
    - 
  * - Sex
    - Male and female
    - 
  * - Age start (initialization)
    - 0
    -
  * - Age start (observation)
    - 0
    - 
  * - Age end (initialization)
    - 0
    - All simulants initialized at birth
  * - Exit age (observation)
    - 5
    - years
  * - Simulation start date
    - 2025-01-01
    - All simulants enter simulation at the same time
  * - Simulation observation start date
    - 2025-01-01
    - 
  * - Simulation end date
    - 2029-12-31
    - 
  * - Timestep
    - 4 days
    - May eventually update to variable or 28 days with YLL/YLD-only modeling strategy (likely not for wave I)
  * - Randomness key columns
    - ['entrance_time', 'maternal_id']
    - Entrance time should be identical for all simulants despite simulants having different birth dates/times from the pregnancy simulation

.. _nutritionoptimizationchild4.0:

2.4 Simulation scenarios
------------------------

As of June, 2023, there are a total of 5 scenarios in the pregnancy simulation, :ref:`which can be found here <nutritionoptimizationpreg4.0>`. With the exception of the baseline scenario, all of the following child scenarios should be run on the outputs for each pregnancy scenario.

Wave I:

- 1 location

- Baseline scenario as well as scenarios 0 through 8

- Total number of scenarios = (5 pregnancy :math:`\times` 9 child :math:`+` 1 baseline) :math:`\times` 1 location :math:`=` **46 scenarios** 

Wave II:

- 3 locations

- Baseline scenario as well as scenarios 0 through 18

- Total number of scenarios = (5 pregnancy :math:`\times` 19 child :math:`+` 1 baseline) :math:`\times` 3 locations :math:`=` **288 scenarios** 

- It is possible we decide to exclude scenarios 13-18 from wave II, reducing the number of child scenarios from 19 to 13 and the total number of scenarios to 66/location for **198 scenarios**

.. list-table:: Child scenarios, implemented for each pregnancy scenario
  :header-rows: 1

  * - Pregnancy scenario
    - Child scenario
    - SAM tx coverage
    - MAM tx coverage
    - SQ-LNS coverage
  * - 0
    - Baseline
    - baseline
    - baseline
    - baseline (0)
  * - All
    - 0: Zero coverage
    - 0
    - 0
    - 0
  * - All
    - 1: SAM tx
    - 1
    - 0
    - 0
  * - All
    - 2: MAM tx
    - 0
    - 1
    - 0
  * - All
    - 3: SQ-LNS
    - 0
    - 0
    - 1
  * - All
    - 5: SAM and MAM
    - 1
    - 1
    - 0
  * - All
    - 6: SAM and SQLNS
    - 1
    - 0
    - 1
  * - All
    - 7: MAM and SQLNS
    - 0
    - 1
    - 1
  * - All
    - 8: All
    - 1
    - 1
    - 1
  * - All
    - 9: targeted SQLNS
    - 0
    - 0
    - 1 for target group; 0 for others
  * - All
    - 10: targeted SQLNS and SAM
    - 1
    - 0
    - 1 for target group; 0 for others
  * - All
    - 11: targeted SQLNS and MAM
    - 0
    - 1
    - 1 for target group; 0 for others
  * - All
    - 12: targeted SQLNS and SAM and MAM
    - 1
    - 1
    - 1 for target group; 0 for others
  * - All
    - 13: targeted MAM
    - 0
    - 1 for target group; 0 for others
    - 0
  * - All
    - 14: SAM and targeted MAM
    - 1
    - 1 for target group; 0 for others
    - 0
  * - All
    - 15: SQLNS and targeted MAM
    - 0
    - 1 for target group; 0 for others
    - 1
  * - All
    - 16: SQLNS and SAM and targeted MAM
    - 1
    - 1 for target group; 0 for others
    - 1
  * - All
    - 17: targeted MAM and targeted SQLNS
    - 0 
    - 1 for target group; 0 for others
    - 1 for target group; 0 for others
  * - All
    - 18: SAM plus targeted MAM and targeted SQLNS
    - 1
    - 1 for target group; 0 for others
    - 1 for target group; 0 for others

Where:

- **0** is zero coverage

- **baseline** is baseline coverage

- **1** is 100% coverage 

.. todo::

    Link relevant parameters for coverage (C_SAM, C_MAM, E_SAM, E_MAM, SQ-LNS cov)

2.5 Outputs
------------

.. todo::

  Include more info

2.6 Computational resource scoping
------------------------------------

Since this project requires running across many more scenarios than typical vivarium simulations, we ran some back-of-the-envelope calculations on the magnitude of computing resources to run all scenarios across all projects. The following assumptions went into these calculations:

- 46 scenarios in wave I (no targeting of SQLNS or MAM tx and 1 location) and 288 scenraios in wave II (including targeting of SQLNS and MAM treatment as well AND 3 locations)
- 4 day timestep in the child simulation if no "timestep inrease strategy" (such as variable timesteps or YLD/YLL-only modeling strategy) is implemented and 28 day timestep if we do implement one of these strategies
- Simulation takes 32 seconds per timestep. This assumption was informed by the "emulator test runs" of the wasting paper simulation that output only the necessary measures with no stratifications by year, age, or sex
- Assume 15,000 threads available on all.q

Under these assumptions, a full run of wave I will take 3.8 cluster-hours with 4-day timesteps and 0.6 cluster-hours with 28-day timesteps. A full run of wave II will take 23.5 cluster-hours with 4-day timesteps and 3.5 cluster-hours with 28-day timesteps.

:download:`Calculations of these estimated resource requirements can be found in this excel file <timestep scaling.xlsx>`

Notably, the run time of this simulation may increase as we add complexity to our model, particularly with respect to the additional risk factor of child underweight exposure and the additional cause model of malaria, which were not present in our test runs.


.. _nutritionoptimizationchild3.0:

3.0 Models
++++++++++

.. todo::

  Detail additional logical model builds with engineers, with the following in mind: https://blog.crisp.se/2016/01/25/henrikkniberg/making-sense-of-mvp

.. list-table:: Model run requests
  :header-rows: 1

  * - Run
    - Description
    - Pregnancy scenario(s)
    - Child scenario(s)
    - Spec. mods
    - Outputs
    - Note
  * - 
    -  
    - 
    - 
    - 
    - 
    - 

.. list-table:: Verification and validation tracking
  :header-rows: 1

  * - Model
    - V&V plan
    - V&V summary
  * - 
    - 
    - 

.. list-table:: Outstanding V&V issues
  :header-rows: 1

  * - Issue
    - Explanation
    - Action plan
    - Timeline
  * - 
    - 
    - 
    - 

