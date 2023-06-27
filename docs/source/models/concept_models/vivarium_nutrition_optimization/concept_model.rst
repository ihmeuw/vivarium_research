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

.. _2021_concept_model_vivarium_nutrition_optimization:

===========================
Nutrition Optimization
===========================

.. contents::
  :local:
  :depth: 1

1.0 Overview
++++++++++++

This document is the overall page for the Nutrition Optimization simulation and contains information that relates to all modeled subcomonents included in the simulation.

Documents that contain information specific to the subcomponents of this simulation can be found here:

.. toctree::
   :maxdepth: 2
   :glob:

   */concept_model*

.. _nutritionoptimization2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++

**Objective:** For a given fiscal envelope, determine the optimal funding allocation across select nutrition-related intervention products for maternal and child health. "Optimal" is defined with respect to some specified outcome such as the funding allocation that minimizes DALYs or maximizes the number of alive, non-stunted children.

.. note::
  
  We must be careful in optimizing for "minimizing" the prevalence of some risk such as child growth failure. This is because prevalence of such risks could be decreased via decreasing incidence (positive health impact) *or* via increasing risk-related mortality (negative health impact). That is why we choose to *maximize* the number of alive non-stunted children rather than minimize the prevalence of child growth failure.

  Note that an alternative strategy here would be to minimize DALYs due to CGF. It is important to note that the former straegy would favor interventions that increase fertility even in the absence of decreased CGF exposure. When modeling interventions that have the potential to affect fertility (either directly, through averted pregnancy-related deaths resulting in future births, or through averted stillbirths or miscarriages), it is important to think through the implications of the optimization objective as it relates to fertility.

.. todo::

  Detail strategy for how to handle stillbirths in optimization objective. Note that assigning DALYs to stillbirths is not acceptable practice by convention.


2.1 General modeling strategy
-----------------------------

2.1.1 Conceptualizing "mixed" intervention coverage
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To achieve the general modeling objective of determining the most cost effective combination of interventions for a given budget size. When we think about "*combinations* of interventions," it is important to distinguish between two modes in which coverage of more than one intervention may occur. For example, imagine a scenario in which we have 50% population coverage of intervention A and 50% population coverage of intervention B. Any of the following could be true:

1. Combined intervention coverage among the same individuals: 50% of the population is covered by intervention A and B, 50% of the population is covered by neither intervention A nor B

2. Combined intervention coverage among separate individuals: 50% of the population is covered by intervention A and not B, 50% of the population is covered by intervention B and not A

3. Some combination of 1 and 2


**In the case of the first situation:**

  There may be important interactions between the *simultaneous* coverage of intervention A and B in the same subpopulation. For example:

  - An infant who was covered by antenatal supplementation may survive the neonatal period due to associated improvements to their LBWSG exposure and therefore survive to benefit from SQLNS supplementation later in life
  - A child who may have benefitted from SAM treatment alone may no longer need to be treated for SAM if they are covered by MAM treatment as well as SAM treatment
  - Etc.

  These interactions may be difficult to quantify directly and therefore we will plan to estimate the effect of joint coverage of multiple interventions on maternal and child health from within our simulation.

**In the case of the second situation:**

  For our purposes, we assume that the situation described in point #2 above is equivalent to the weighted average of 50% an identical population with 100% coverage of intervention A and 50% an identical population with 100% coverage of intervention B. 

    NOTE: see a discussion of the potential limitations of this assumption as it relates to simulated common random numbers in the `6.0 Limitations`_ section.

  As this assumption requires only a weighted average, we can perform this calculation outside of our simulation so long as we have quantified the impacts of intervention A and B within our simulation already.

.. todo::

  Create and link to notebook that shows how this strategy compares to actual simulated results

**In the case of the third situation:**

  Then, we can combine our strategies for the first two situations so that we may estimate more complex combinations of joint intervention coverage (for example: 50% of the population covered by A and B, 25% covered by A, 25% covered by neither, for total population coverage of 75% for A, 50% for B).

    In this case, we would simulate 3 scenarios (1: 100% coverage of A and B, 2: 100% coverage of A, 3: no coverage) and then estimate the overall impact of the described intervention coverage combination as 0.5 * scenario_1 + 0.25 * scenario_2 + 0.25 * scenario_3.

2.1.1 Process in practice
~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Simulate 1 scenario for each possible combination of modeled interventions either at 0% or 100% coverage.

2. External to vivarium, pair the simulated results of these scenarios with an intervention costing function and solve for combination of scenarios that maximizes health impact under the following constraints/assumptions:

  - Constraint: total cost of resulting combination of interventions cannot exceed some set budget
  - Constraint: total coverage of any one intervention cannot exceed that intervention-specific saturation coverage level
  - Assumption: all interventions have the same coverage propensities. See the `6.0 Limitations`_ section for a discussion of this assumption.  
  - Pending constraint: avoid operationally infeasible coverage recommendations (for example: separate antenatal care intervention product based on whether child nutrition saturation coverage has already been maxxed out)

Step 1 in this process is detailed in the :ref:`pregnancy<2021_concept_model_vivarium_nutrition_optimization_pregnancies>` and :ref:`child<2021_concept_model_vivarium_nutrition_optimization_children>` concept model documents. Step 2 in this process will be performed using the outputs from step 1 and `can be found here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/tree/data_prep/emulator>`_

.. todo::

  More specific emulator documentation


2.2 Submodels
-------------

.. list-table:: Wave I outstanding tasks for costing and emulator
  :header-rows: 1

  * - Task
    - Dependencies
    - RT person
    - Note
  * - 1: Confirm mixed coverage approach 
    - 
    - Ali 
    - Completed 
  * - 2: Emulator design choice 
    - 
    - Full team 
    - 
  * - 3: Clean emulator and remove hardcoded information 
    - 
    - Syl 
    - 
  * - 4: Allow for optimization to multiple outcomes 
    - 
    - TBD
    - Example: deaths, DALYs, SAM cases 
  * - 5: Add maternal interventions 
    - 
    - TBD
    - 
  * - 6: Test for robustness to different initial values 
    - 
    - TBD
    - 
  * - 7: Add non-linear cost functions 
    - 
    - TBD
    - 
  * - 8: Decide on costing approach and priorities 
    - 
    - Syl and Latera
    -  


.. list-table:: Wave II outstanding tasks for costing and emulator
  :header-rows: 1

  * - Task
    - Dependencies
    - RT person
    - Note
  * - 1: Literature search for cost information  
    - All wave II tasks are dependent on 8 above 
    - TBD
    -  
  * - 2: Identify and request any cost datasets  
    - 
    - TBD
    - 
  * - 3: Data analysis got costing 
    - Dependent on what data is identified 
    - TBD
    - 
  * - 4: Finalizaing cost functions 
    - 
    - TBD
    - 
  * - 5: Integrate costs into emulator 
    - 
    - TBD
    - 


.. _nutritionoptimization3.0:

3.0 Concept model and submodels
+++++++++++++++++++++++++++++++

.. todo::

  Insert colorful full concept model

.. _nutritionoptimization4.0:

4.0 Simulation scenarios
++++++++++++++++++++++++



.. _nutritionoptimization5.0:

5.0 Model run requests
++++++++++++++++++++++

.. note::

  This table refers to model runs for all subpopulations included in the nutrition optimization simulation (pregnancies, infants, and kids). Runs specific to each subpopulation for V&V of these submodels will be managed on their respective pages.

.. list-table:: Model run requests
  :header-rows: 1

  * - Run
    - Description
    - Scenarios
    - Specification modifications
    - Stratificaction modifications
    - Note
  * - 
    - 
    - 
    - 
    - 
    - 



.. _nutritionoptimization6.0:

6.0 Limitations
+++++++++++++++

.. todo::
  
  Discuss CRN issue Zeb raised... does it matter that for "situation 2" we are taking data from simulated population of some set size under various different intervention regimens (due to CRNs, this is the "same" identical population across all our scenarios with differing intervention coverage) and then using several "copies" of this population to produce a weighted average to represent a hypothetical mixture of scenarios among a population of the same size as our initial simulated population. Note that for a 50/50 combination we are in effect compressing data from say 100,000 individuals under intervention A and intervention B scenarios to represent 50,000 individuals respectively in our resulting "mixed" coverage scenario. How does CRN modify the impact of this assumption?

  Also discuss fixed coverage propensity assumption


.. _nutritionoptimization7.0:

7.0 References/Other
++++++++++++++++++++

.. list-table:: Abbreviations
  :header-rows: 1

  * - Abbreviation
    - Definition
  * - IFA
    - Iron and folic acid
  * - MMS
    - Multiple micronutrient supplementation
  * - BEP
    - Balanced energy protein
  * - RUSF
    - Ready-to-use supplementary food
  * - RUTF
    - Ready-to-use therapeutic food
  * - SQ-LNS
    - Small quantity lipid-based nutrient supplement
  * - SAM
    - Severe acute malnutrition
  * - MAM
    - Moderate acute malnutrition
  * - ANC
    - Antenatal care
  * - CMAM
    - Community management of acute malnutrition
