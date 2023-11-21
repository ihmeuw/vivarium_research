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


2.2 Emulator Design
-------------------

The emulator is designed to take in the results from the simulation and costing 
functions and output an optimized approach for each budget. Below is more details 
about how the emulator works, its input parameters, and limitations. 

2.2.1 General Emulator Strategy
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To find optimized results, we will: 

#. Simulate a scenario for each possible combination of modeled interventions either at 0% or 100% coverage.
#. Define cost functions for each intervention. 
#. External to vivarium, pair the simulated results of these scenarios with the intervention costing function and solve for combination of scenarios that maximizes health impact. 

Further details can be found in the below sections. 

Step 1 in this process is detailed in the :ref:`pregnancy<2021_concept_model_vivarium_nutrition_optimization_pregnancies>` and :ref:`child<2021_concept_model_vivarium_nutrition_optimization_children>` concept model documents. 


2.2.2 Input Parameters
~~~~~~~~~~~~~~~~~~~~~~

We expect that the emulator will have the following input parameters 
that are configurable for each run: 

.. list-table:: Input Parameters
  :header-rows: 1

  * - Parameter
    - Options to include 
    - Notes
  * - Results directory
    - 
    - This will include results for only one location. The emulator will be rerun each location.
  * - Location ID 
    - 
    - Accepts exactly one location ID 
  * - Optimization Measure 
    - Deaths, DALYs, cases averted (stunting for example), total population (alive, not stunted, etc.)
    - 
  * - Population to optimize for
    - Maternal, child, all 
    - This only applies to some measures e.g., deaths could be any population, stunting cases averted is by definition for children only.  
  * - Budget(s)
    - A set of budgets or single budget to optimize for 
    - We will plan to include some "help" for selecting a budget such as the cost of maximizing all interventions or the current baseline budget 
  * - Stillbirth inclusion in YLLs 
    - Stillbirths included in YLLs, stillbirths NOT included in YLLs
    - 

We have considered some other possible input parameters, but at this time 
are planning to have these be pre-set in the emulator. We can choose to change 
these to be configurable on each run if the need arises. 

Additional parameters: 

#. Draw-specific results vs summarized results. Currently we are planning to have results be draw-specific. 
#. Rate vs total population. Currently we will generate results for the total population. E.g., all deaths averted in Ethiopia.
#. Additional constraints in the optimization. E.g., running the emulator allowing for operationally infeasible cases and not allowing for them. 
#. Changing saturation coverage limits. 


2.2.3 Constraints and Assumptions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Constraints: 

- Total cost of resulting combination of interventions cannot exceed some set budget
- Coverage of any one intervention cannot exceed that intervention-specific saturation coverage level
- Avoid operationally infeasible coverage recommendations (for example: separate antenatal care intervention product based on whether child nutrition saturation coverage has already been maxxed out)

Assumptions: 

- All interventions have the same coverage propensities. See the `6.0 Limitations`_ section for a discussion of this assumption. 


2.2.4 Emulator Versions
~~~~~~~~~~~~~~~~~~~~~~~

.. list-table:: Emulator Versions 
  :header-rows: 1

  * - Version Number
    - Description
    - Link
    - Notes
  * - 1
    - Emulator with two step optimization 
    - `Emulator version 1 <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/98bab97f05bdbb0277f84f48f220294cb59f1245/emulator/emulator%20rough%20draft_20230607.ipynb>`_  
    - We have not progressed the two step optimization version at this time 
  * - 2
    - Replicate results with single step optimization 
    - `Emulator version 2 <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/98bab97f05bdbb0277f84f48f220294cb59f1245/emulator/emulator_draft_20230628.ipynb>`_  
    - Successfully replicated prior results 
  * - 3
    - Removing hard coded information 
    - `Emulator version 3 <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/98bab97f05bdbb0277f84f48f220294cb59f1245/emulator/emulator_draft_20230724.ipynb>`_  
    - 
  * - 4
    - Converted to .py files 
    - `Emulator version 4 <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/d667cd01cd0ddc63137fe55798cc6d04831701d0/emulator/emulator_with_py_files_20230810.ipynb>`_ and `py files version 4 <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/d667cd01cd0ddc63137fe55798cc6d04831701d0/emulator/emulator_with_py_files_20230810.ipynb>`_  
    - 
  * - 5
    - Adding maternal interventions  
    - 
    - 
  * - 6
    - Allowing optimization to different parameters 
    - 
    - 
  * - 7
    - Add in additional constraints for unfeasible scenarios 
    - 
    - 
  * - 8
    - Adjusting to fit final model outputs 
    - 
    - 
  * - 9
    - Adding non-linear costs  
    - 
    - 


2.3 Submodels
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
    - Completed 
  * - 3: Clean emulator and remove hardcoded information 
    - 
    - Syl 
    - Completed 
  * - 4: Allow for optimization to multiple outcomes 
    - 
    - Syl
    - Example: deaths, DALYs, SAM cases 
  * - 5: Add maternal interventions 
    - Blocked by simulation progress 
    - Syl
    - WIP
  * - 6: Test for robustness to different initial values 
    - 
    - TBD
    - 
  * - 7: Test non-linear cost functions 
    - 
    - TBD
    - Not technically needed for wave 1 but would good to keep in mind during emulator design and building
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

4.0 2021 Data Notes
++++++++++++++++++++++++

For all calls in the following table, relevant values for:

  - :code:`age_group_id`
  - :code:`location_id`
  - :code:`sex_id`
  - :code:`gbd_id`

Will need to be filled in as appropriate.

Also, the following packages must be imported as so:

.. code-block::

  from get_draws.api import get_draws
  from db_queries import get_population, get_covariate_estimates

As of 10/16/2023:

.. list-table:: GBD 2021 Data Update Needs
  :header-rows: 1

  * - Category
    - Details
    - Status
    - Call
    - Note
  * - Demographics
    - Used for age structure at initialization, to convert codcorrect results from counts to rates
    - Ready
    - :code:`get_population(gbd_round_id=7, #2021`
      
      :code:`year_id=2021,` 
      
      :code:`decomp_step='iterative',` 
      
      :code:`run_id=359)`
    - `Run ID obtained here <https://hub.ihme.washington.edu/display/GBD2020/GBD+2021+Estimation>`_
  * - Mortality
    - Deaths to be used to calculate CSMRs
    - Ready
    - :code:`get_draws(gbd_round_id=7,`

      :code:`year_id=2021,`

      :code:`source='codcorrect',`

      :code:`gbd_id_type='cause_id',`

      :code:`gbd_id=CAUSE_IDS,`

      :code:`decomp_step='step3',`

      :code:`version_id=363,`

      :code:`measure_id=1)`
    - Returns counts that will need to be converted to rate. `Codcorrect version ID obtained here <https://hub.ihme.washington.edu/display/GBD2020/GBD+2021+CodCorrect+Tracking>`_
  * - Incidence
    - Incidence rates
    - Ready
    - :code:`get_draws(gbd_round_id=7,`

      :code:`year_id=2021,`

      :code:`source='como',`

      :code:`gbd_id_type='cause_id',`

      :code:`gbd_id=CAUSE_IDS,`

      :code:`decomp_step='iterative',`

      :code:`version_id=1469,`

      :code:`measure_id=6)`
    - Returns per person-year rate. `Final COMO version ID obtained here <https://hub.ihme.washington.edu/display/GBD2020/COMO+tracking>`_
  * - Risk exposure
    - Hemoglobin mean/standard deviation
    - Ready
    - :code:`get_draws(gbd_round_id=7,`

      :code:`year_id=2021,`

      :code:`source='epi',`

      :code:`gbd_id_type='modelable_entity_id',`

      :code:`gbd_id=MEID,`

      :code:`decomp_step='iterative')`
    - 
  * - Risk exposure
    - LBWSG and CGF
    - Already updated for CGF, ready for LBWSG
    - :code:`get_draws(gbd_round_id=7,`

      :code:`year_id=2021,`

      :code:`source='exposure',`

      :code:`gbd_id_type='rei_id',`

      :code:`gbd_id=REI_IDS,`

      :code:`decomp_step='iterative')`
    - 
  * - Relative risk
    - Hemoglobin on maternal disorders, LBWSG and CGF
    - Already updated for CGF, ready for hemoglobin and LBWSG
    - :code:`get_draws(gbd_round_id=7,`

      :code:`year_id=2021,`

      :code:`source='rr',`

      :code:`gbd_id_type='rei_id',`

      :code:`gbd_id=REI_IDS,`

      :code:`decomp_step='iterative')`
    - 
  * - Covariates
    - ASFR, SBR
    - Ready
    - :code:`get_covariate_estimates(gbd_round_id=7,`

      :code:`year_id=2021,`

      :code:`decomp_step='iterative',`

      :code:`covariate_id=COVARIATE_ID)`
    - 

**Additional dependencies:**

- There are no PAFs in the table above as all PAFs are custom-calculated in this model, including:

  - `Hemoglobin on maternal disorders and maternal hemorrhage PAFs <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/hemoglobin_maternal_disorder_pafs/hemoglobin_and_maternal_disorders_pafs.csv>`_

  - LBWSG PAFs have been calculated by the engineers (unblocked)

  - CGF PAFs calculated by the research team (blocked by 2021 cause data artifact keys)

- `Prevalence of hemoglobin below 100 g/L among the pregnant population <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/parameter_aggregation/pregnant_proportion_with_hgb_below_100_age_specific.csv>`_

  - Overall (not age specific) values available here for use in the child simulation (to be calculated by research team, unblocked)

- `Prevalence of hemoglobin below 70 g/L among the pregnant population <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/parameter_aggregation/pregnant_proportion_with_hgb_below_100_age_specific.csv>`_

  - Overall (not age specific) values available here for use in the child simulation (to be calculated by research team, unblocked)

- Joint BMI/hemoglobin exposure, as calculated by the research team 

  - `Prevalence of low BMI given hemoglobin above 10 g/dL <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/misc_investigations/prevalence_of_low_bmi_given_hemoglobin_above_10.csv>`_

    - Overall (note age specific) values available here for use in the child simulation (to be calculated by research team, unblocked)

  - `Prevalence of low BMI given hemoglobin below 10 g/dL <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/misc_investigations/prevalence_of_low_bmi_given_hemoglobin_above_10.csv>`_

    - Overall (note age specific) values available here for use in the child simulation (to be calculated by research team, unblocked)

- Child growth failure accessory data (wasting transitions and correlated underweight exposure distributions) calculated by the research team (blocked by 2021 cause data artifact keys)

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
