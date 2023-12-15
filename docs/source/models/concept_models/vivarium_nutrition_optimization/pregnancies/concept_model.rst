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

.. _2021_concept_model_vivarium_nutrition_optimization_pregnancies:

===================================================
Nutrition Optimization Concept Model: PREGNANCIES
===================================================

.. contents::
  :local:

1.0 Overview
++++++++++++

This is the concept model document for the pregnancy component of the Nutrition Optimization simulation model.
Documents that contain information specific to the overall model and the child subcomponent can be found here:

- :ref:`Overall nutrition optimization concept model document<2021_concept_model_vivarium_nutrition_optimization>`

- :ref:`Child subcomponent concept model document <2021_concept_model_vivarium_nutrition_optimization_children>`

.. _nutritionoptimizationpreg2.0:

1.1 Modeling aims and objectives
---------------------------------

.. todo::

  List modeling aims and objectives

1.2 Outstanding research questions/notes
-----------------------------------------

**Questions:**

- For stillbirths that become live births due to intervention impact, what should their LWBSG exposure be? Hypothetically near-stillbirths should have lower birth weights than others. Ask Nick K.! GBD may be estimating these outcomes directly? Current assumption is that they will have randomly sampled exposure. 

- How should we handle averted stillbirths in our optimization objectives? Note that because stillbirths do not accumulate any DALYs, an objective to minimize DALYs could disincentivize averting stillbirths, which would be inconsistent with improving outcomes. 

**Notes/reminders:**

- BMGF would like to assume that those who take BEP also take MMS. This does not change our health impact model at all, but will change our costing assumptions (add product price of MMS to that of BEP).

- The health systems team has not updated their iron supplementation in pregnancy coverage estimates from the values they provided for the IV iron simulation, so we will move forward with those estimates.

- According to Will G. (GBD anemia modeler), our hemoglobin distribution is not exactly replicating the GBD anemia impairment prevalence because we were not using most-detailed location IDs. Notably, he mentioned that very small differences are expected to remain due to slight changes in covariate estimates between the time at which the hemoglobin/anemia modeling occurred and now.

- We will remove background mortality from our pregnancy simulation so that simulants may only die due to maternal disorders.

2.0 Model design
++++++++++++++++

2.1 Concept model diagram
-------------------------

.. image:: nutrition_optimization_pregnancy_concept_model_diagram.png

2.2 Submodels
-------------

.. todo::

  Link individual model documents as they are completed and merged

.. note::

  Unless specifically noted, only change from the IV iron implementation is the update from GBD 2019 to GBD 2021 data

+---------------------+-----------------------------------------------------+---------------------+
| Category            | Model                                               | Note                |
+=====================+=====================================================+=====================+
|Demography           |:ref:`Population structure at                        |Change from IV iron  |
|                     |initialization                                       |due to closed cohort |
|                     |<other_models_pregnancy_demography>`                 |                     |
|                     +-----------------------------------------------------+                     |
|                     |:ref:`Pregnancy model (closed cohort)                |                     |
|                     |<other_models_pregnancy_closed_cohort>`              |                     |
+---------------------+-----------------------------------------------------+---------------------+
|Risk exposure        |:ref:`Hemoglobin/anemia                              |Wave II update to    |
|                     |<2019_hemoglobin_model>`                             |most detailed locs.  |
|                     +-----------------------------------------------------+---------------------+
|                     |:ref:`Pre-pregnancy/first trimester BMI              |Will need custom data|
|                     |<2019_risk_exposure_maternal_bmi_hgb>`               |update for 2021 (Ali)|
|                     +-----------------------------------------------------+---------------------+
|                     |:ref:`Birth weight and gestational age               |                     |
|                     |<2019_risk_exposure_lbwsg>`                          |                     |
+---------------------+-----------------------------------------------------+---------------------+
|Risk correlation     |:ref:`Hgb/BMI/LBWSG                                  |Will need custom data|
|                     |<2019_risk_correlation_maternal_bmi_hgb_birthweight>`|update for 2021 (Ali)|
+---------------------+-----------------------------------------------------+---------------------+
|Risk effects         |:ref:`Hemoglobin<2019_risk_effect_iron_deficiency>`  |Do not include effect|
|                     |, including effects on (1) maternal disorders, and   |on birth outcomes    |
|                     |(2) maternal hemorrhage incidence                    |(stillbirth), change |
|                     |                                                     |from IV iron. Will   |
|                     |                                                     |need custom data     |
|                     |                                                     |update for 2021 (Ali)|
|                     +-----------------------------------------------------+---------------------+
|                     |:ref:`Maternal hemorrhage effect on                  |                     |
|                     |hemoglobin                                           |                     |
|                     |<2019_risk_effect_maternal_hemorrhage>`              |                     |
+---------------------+-----------------------------------------------------+---------------------+
|Causes               |:ref:`Maternal disorders                             |                     |
|                     |<2021_cause_maternal_disorders>`                     |                     |
|                     +-----------------------------------------------------+---------------------+
|                     |:ref:`Maternal hemorrhage incidence                  |                     |
|                     |<2019_cause_maternal_hemorrhage_incidence>`          |                     |
|                     +-----------------------------------------------------+---------------------+
|                     |:ref:`Background morbidity due to other              |Modeled causes: r192 |
|                     |causes <other_causes>`                               |(anemia). See note   |
|                     |                                                     |regarding exclusion  |
|                     |                                                     |of c366 below. Change|
|                     |                                                     |from IV iron!        |
|                     +-----------------------------------------------------+---------------------+
|                     |Removal of background mortality due to               |Change from IV iron  |
|                     |other causes                                         |                     |
+---------------------+-----------------------------------------------------+---------------------+
|Interventions        |:ref:`Antenatal supplementation, including           |Change from IV iron! |
|                     |IFA, MMS, and BEP and their effects                  |New effects on       |
|                     |on antenatal hemoglobin, LBWSG, and                  |gestational age and  |
|                     |birth outcomes                                       |birth outcomes (no   |
|                     |<maternal_supplementation_intervention>`             |changes to hemoglobin|
|                     |                                                     |effects). Also,      |
|                     |                                                     |coverage algorithm is|
|                     |                                                     |updated              |
+---------------------+-----------------------------------------------------+---------------------+

.. list-table:: Wave I outstanding tasks
  :header-rows: 1

  * - Task
    - Dependencies
    - RT person
    - ST person
    - Note
  * - Model builds 0.0 through 1
    - .
    - Done! (Ali)
    - Done! (Patrick/Steve)
    - New content from IV iron
  * - Model builds 2-6
    - .
    - Docs ready, will need V&V (Ali)
    - In progress (Patrick/Steve)
    - No new content from IV iron (except one exclusion)
  * - Model build 7
    - .
    - Docs ready, will need V&V (Ali)
    - Patrick/Steve
    - New content from IV iron
  * - Production runs
    - . 
    - Ali
    - Patrick/Steve
    - Triple check everything is finalized and ready for next steps :) 

.. list-table:: Wave II outstanding tasks
  :header-rows: 1

  * - Task
    - Dependencies
    - RT person
    - ST person
    - Note
  * - Update hemoglobin distribution to most detailed locations
    - 
    - Needs documentation (Ali)
    - Patrick/Steve
    -
  * - General GBD 2021 update
    - Blocked by GBD timeline
    - Ali (needs custom data updates for hemoglobin)
    - Patrick/Steve
    - 
  * - Background morbidity
    - .
    - Ali
    - Patrick/Steve
    - Bonus task, not necessary for success
  * - Production runs
    - Awaiting completion of above tasks
    - Ali
    - Patrick/Steve
    - 

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
    - 10
    - May be increased for final runs
  * - Population size per draw
    - 100,000
    - Eventually to be refined based on test runs
  * - Cohort type
    - Closed
    - Change from IV iron!
  * - Sex
    - Female only!
    - 
  * - Age start (initialization)
    - 10
    -
  * - Age start (observation)
    - 10
    - 
  * - Age end (initialization)
    - 54 (inclusive)
    - 
  * - Exit age (observation)
    - Age at which postpartum period ends
    - 
  * - Simulation start date
    - 2025-01-01
    -
  * - Simulation observation start date
    - 2025-01-01
    - (No burn-in period)
  * - Simulation end date
    - 2025-12-31
    - Needs to accommodate maximum gestation of 42 weeks + 6 weeks postpartum. Note this was previously 2025-12-3 and was updated for model 3.0.
  * - Timestep
    - 1 week (7 days)
    - Note, could be increased to two weeks if duration of maternal disorders pregnancy state is updated.
  * - Randomness key columns
    - ['entrance_time', 'age']
    - 

.. _nutritionoptimizationpreg4.0:

2.4 Simulation scenarios
------------------------


.. list-table:: Scenarios
  :header-rows: 1

  * - Scenario
    - IFA coverage
    - MMS coverage
    - BEP coverage
  * - Zero coverage
    - 0
    - 0
    - 0
  * - Baseline
    - Baseline
    - 0
    - 0
  * - 1: MMS
    - 0
    - 1
    - 0
  * - 2: IFA
    - 1
    - 0
    - 0
  * - 3: Targeted BEP/none
    - Baseline for adequate BMI pregnancies
    - 0
    - 1 for low BMI pregnancies
  * - 4: Targeted BEP/MMS
    - 0
    - 1 for adequate BMI pregnancies
    - 1 for low BMI pregnancies

Where: 

- **0** represents the minimum intervention coverage (0%, or no coverage)

- **1** represents the maximum intervention coverage (100%)

- **Baseline** represents location-specific baseline IFA coverage, `which can be found in location-specific .csv files here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/tree/data_prep/data_prep/antenatal_interventions/baseline_ifa_coverage>`_ (`note these values were calculated in this notebook <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/antenatal_interventions/Gestational%20age%20shifts.ipynb>`_

.. note::
  
  Scenario #2 was previously "Universal BEP" rather than IFA, but was updated to IFA on 10/23/23 prior to wave II production runs. Universal BEP is no longer a scenario of interest. 

2.5 Outputs
------------

There are two important categories of outputs for this model. The first is maternal health data obtained from observing the simulants in the pregnancy simulation that will be used to inform maternal health outcomes in the emulator. The second is data that will be used as inputs to the child simulation (including information such as LBWSG risk exposure). The maternal health data will be recorded at the aggregate level, but the child health data will be recorded at the individual level. 

Specific outputs for specific models are specified in the following section.

.. _nutritionoptimizationpreg3.0:

3.0 Models
++++++++++

.. note::

  Unless otherwise specified, all maternal outputs should be stratified by maternal age group

.. note::

  Models 2.0 through 6.0 do not contain any updates relative to the IV iron implementation (with the exception of the removal of the hemoglobin risk effect on birth outcomes/stillbirths). These model runs may be collapsed into fewer submodels if convenient for implementation. 

  If this is done, model output requests should be updated. 

.. list-table:: Model run requests
  :header-rows: 1

  * - Run
    - Description
    - Scenarios
    - Spec. mods
    - Maternal outputs
    - Child outputs
    - Note
  * - 0.0
    - Standard demography 
    - Baseline
    - None
    - * Deaths
      * YLLs
    - N/A
    - 
  * - 0.1
    - Pregnancy demography (:ref:`docs here <other_models_pregnancy_demography>`)
    - Baseline
    - None
    - * Deaths
      * YLLs
      * Pregnancy state person-time
    - N/A
    - All simulants initialized into the pregnancy state, but no other aspects of pregnancy model included
  * - 1.0
    - Pregnancy state transitions (:ref:`docs here <other_models_pregnancy_closed_cohort>`). For now, all pregnancies have duration of 40 weeks.
    - Baseline
    - None
    - * Deaths
      * YLLs
      * Pregnancy state person-time
      * Pregnancy transition counts
    - N/A
    - Note closed cohort change from IV iron pregnancy model. Custom observer exit at the end of postpartum period? (Bonus ask)
  * - 1.1 
    - Term length outputs (separation of full and partial term births). For now, full term pregnancies all have 40 weeks duration and partial term births have duration as specified in docs. 
    - Baseline
    - None
    - * Deaths
      * YLLs
      * Pregnancy state person-time
      * Pregnancy transition counts
      * Counts of births stratified by pregnancy term lengths
    - Full term births paired with maternal_ids
    -  
  * - 1.2
    - LBWSG outputs. Update pregnancy duration to reflect sex-specific LBWSG exposures and separate full term births into live birth and stillbirth outcomes.
    - Baseline
    - None
    - * Deaths
      * YLLs
      * Pregnancy state person-time, **stratified by birth outcome**
      * Pregnancy transition counts, **stratified by birth outcome**
      * Counts of birth outcomes
    - Live and still births with maternal_ids and LBWSG exposures
    - 
  * - 2.0
    - Maternal disorders and maternal hemorrhage cause models, removal of background mortality
    - Baseline
    - None
    - * Deaths
      * YLLs
      * YLDs
      * Pregnancy state person-time
      * Pregnancy transition counts
      * Incident maternal disorder counts
    - N/A
    - 
  * - 2.1
    - Maternal hemorrhage cause models
    - Baseline
    - None
    - * Deaths
      * YLLs
      * YLDs
      * Pregnancy state person-time
      * Pregnancy transition counts
      * Incident maternal disorder counts
      * Incident maternal hemorrhage counts
    - N/A
    - 
  * - 3.0
    - Hemoglobin/anemia exposure
    - Baseline
    - None
    - * YLDs
      * Anemia state person time, stratified by pregnancy state
    - N/A
    - 
  * - 3.1
    - Hemoglobin/anemia exposure with bugfixes
    - Baseline
    - None
    - * YLDs (anemia severity specific), stratified by pregnancy state
      * Anemia state person time, stratified by pregnancy state
    - N/A
    - 
  * - 4.0
    - Hemoglobin on maternal disorders, hemoglobin on maternal hemorrhage, and maternal hemorrhage on hemoglobin risk effects
    - Baseline
    - None
    - * Deaths
      * YLLs
      * YLDs
      * Pregnancy state person-time
      * Pregnancy transition counts
      * Anemia state person-time **stratified by pregnancy state**
      * Incident maternal disorder counts **stratified by anemia status at birth**
      * Incident maternal hemorrhage counts **stratified by anemia status at birth**
    - N/A
    - Do NOT include risk effect of hemoglobin on birth outcomes (which was included in IV iron). Data block for GBD 2021 update as of 6/23.
  * - 5.0
    - BMI exposure with correlation to hemoglobin and LBWSG
    - Baseline
    - None
    - * Deaths
      * YLLs
      * YLDs
      * BMI exposure, stratified by pregnancy state and anemia state
    - Live and still births with maternal_ids, infant sex, maternal BMI exposure, maternal hemoglobin above/below 100 g/L, and LBWSG exposures
    - Data block for GBD 2021 update as of 6/23.
  * - 6.0
    - Intervention effects on hemoglobin and birthweight
    - All
    - None
    - * Deaths
      * YLLs
      * YLDs
      * Pregnancy state person time
      * Pregnancy transition counts
      * Anemia state person time, stratified by intervention coverage
      * Intervention counts
    - Live and still births with maternal_ids, infant sex, maternal BMI exposure, maternal hemoglobin above/below 100 g/L, intervention coverage, and LBWSG exposures
    - Both of these intervention effects were implemented in IV iron and are not changed for this model
  * - 7.0
    - Intervention effects on gestational age and birth outcomes
    - All
    - None
    - * Deaths 
      * YLLs
      * YLDs
      * Pregnancy state person time
      * Pregnancy transition counts
      * Birth outcomes, stratified by intervention coverage
    - Live and still births with maternal_ids, infant sex, maternal BMI exposure, maternal hemoglobin above/below 100 g/L, intervention coverage, and LBWSG exposures
    - These intervention effects are new and were not implemented in IV iron
  * - 8.0
    - Background morbidity
    - All
    - None
    - * Deaths 
      * YLLs
      * YLDs, both cause-specific (including background morbidity) as well as for all causes combined
      * Pregnancy state person time
      * Pregnancy transition counts
    - N/A
    - 
  * - 8.1
    - 8.0bugfix
    - All
    - None
    - Same as 8.0
    - Same as 8.0
    - 
  * - 8.2
    - Birth outcome randomness bugfix, stratify YLDs by pregnancy status
    - All scenarios 
    - None
    - * Deaths
      * YLLs
      * YLDs, both cause-specific (including background morbidity due to other causes) as well as for all causes combined; all stratified by pregnancy state
      * Pregnancy state person time
      * Pregnancy transition counts
    - Same as 8.0
    - 
  * - 8.3
    - * `Update other causes DW value in accordance with this PR <https://github.com/ihmeuw/vivarium_research/pull/1313>`_,
      * `Resolve discrepancies between cause-specific and all cause YLD observers during the parturition state, as shown in this notebook (cell 92) <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/[…]_and_validation/pregnancy_model/model_8.2_interactive_sim.ipynb>`_
      * `Confirm that individual-level birth outcome changes between scenario are functioning as intended, as assessed in this notebook <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/[…]_and_validation/pregnancy_model/model_8.2_interactive_sim.ipynb>`_
    - All scenarios, including new "zero coverage" scenario
    - None
    - Same as 8.2
    - Same as 8.2
    - 
  * - 9.0
    - Production run test
    - All
    - 2,000,000 population size per draw, 5 draws
    - No age stratification and not cause-specific, BUT stratified by random seed:

      * Deaths 
      * YLLs
      * YLDs
      * Intervention counts
    - Live and still births with maternal_ids, infant sex, joint BMI/anemia exposure, intervention coverage, and LBWSG exposures
    - Will analyze to determine minimum viable population size for maternal outcomes (can later use child data to analyze for child outcomes)
  * - 9.1
    - Production runs
    - All
    - 1,600,000 population size per draw, 100 draws
    - Same as 9.0, but no longer stratified by random seed
    - Live and still births with maternal_ids, infant sex, joint BMI/anemia exposure, intervention coverage, and LBWSG exposures
    - NOTE: This population size has not yet been tested in the child model; however, as maternal mortality is more rare than child mortality it is expected to be sufficient 
  * - 9.2
    - Production runs with intervention count observer fix (just once at 6 weeks instead of every timestep)
    - All
    - Same as 9.1
    - Same as 9.1
    - Same as 9.1
    - 
  * - 10.0
    - Nigeria and Pakistan locations
    - All
    - 400,000 population size per draw, 20 draws
    - * Deaths, YLLs
      * YLDs, stratified by pregnancy state
      * Maternal disorder incident counts, stratified by anemia state
      * Maternal hemorrhage incident counts, stratified by anemia state
      * Anemia state person time, stratified by pregnancy state 
      * Pregnancy state person time, stratified by birth outcome
      * Pregnancy state transition counts, stratified by birth outcome
      * Counts of birth outcomes
      * Intervention counts
    - Same as 9.1
    - The underlying model should be identical to 9.1 except for locations and the modifications noted here
  * - 10.1
    - Production runs with live birth and still birth counts 
    - All
    - Same as 9.2
    - Same as 9.2 but including count of live births and still births 
    - Same as 9.2
    - 
  * - 11.0
    - GBD 2021 update?
    - Baseline
    - None
    - 
    - 
    - This model may be inserted earlier in the timeline, depending on when it is ready

.. note::

  Model build ordering determined with the following in mind https://blog.crisp.se/2016/01/25/henrikkniberg/making-sense-of-mvp


.. list-table:: Verification and validation tracking
  :header-rows: 1
  :widths: 1 5 5

  * - Model
    - V&V plan
    - V&V summary
  * - 0.0
    - Proportion of deaths in each age group is as expected from GBD ACMR estimates among WRA
    - Overall seems to be functioning as expected, but would like to add person-time observer to results. `Notebook can be found here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/pregnancy_model/model_0.0.ipynb>`_.
  * - 0.1
    - Check that distribution of observed person-time by age group matches distribution of pregnancies in GBD, check ACMR
    - Looks great! Some deviation from GBD ACMR at edge age groups as a result of small numbers, but not a concern. `Model 0.1 V&V notebooks can be found here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/pregnancy_model/model_0.1.ipynb>`_
  * - 1.0
    - Confirm pregnancy transitions occurring and at the expected intervals. For this model, all pregnancies hard coded for duration of 40 weeks. Postpartum period duration of 6 weeks.
    - Looks great! Note that pregnancy duration skews when evaluated at age-specific level, but this is not a bug in implementation, rather in analysis. `Model 1.0 V&V notebook can be found here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/pregnancy_model/model_1.0.ipynb>`_
  * - 1.1
    - Confirm that relative distribution of partial versus full term pregnancies is as expected, that partial term pregnancy duration implemented as expected, and that child data looks good
    - Looks great! `Model 1.1 V&V notebook can be found here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/pregnancy_model/model_1.1.ipynb>`_
  * - 1.2
    - * Check that average duration of "other" birth outcomes is 15 weeks in maternal outputs
      * Check that average duration of live and still birth outcomes is close to 38-39 weeks or so in maternal outputs
      * Check live birth to stillbirth ratio verifies to expected value
      * Check that LBWSG exposure in child outputs verifies to GBD exposure distribution
    - Looks good! `Model 1.2 V&V notebook can be found here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/pregnancy_model/model_1.2.ipynb>`_. Noted that infant sex should be added to child output data moving forward.
  * - 2.0
    - Verify incident and fatal maternal disorder rates as well as YLDs, confirm removal of background mortality
    - `Model 2.0 V&V notebook available here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/pregnancy_model/model_2.0_maternal_disorders.ipynb>`_

      * Background mortality successfully removed
      * Maternal disorders incidence looks great
      
      1. Maternal disorders mortality is overestimated

        * Accurately replicates :code:`cause.maternal_disoders.mortality_probability` artifact key values, but these values are not as expected. Could need artifact rebuild?

      2. `Additionally, duration of the postpartum state is looking too long <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/pregnancy_model/model_2.0_preg_states.ipynb>`_

      3. Artifact value for maternal disorders CSMR equals zero for 50-54 age group when it should not based on raw GBD values
  * - 2.1
    - Verify that maternal disorders CSMR has been fixed and that maternal hemorrhage incidence is as expected
    - `Model 2.1 V&V notebook available here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/pregnancy_model/model_2.1_maternal_disorders.ipynb>`_ 
      * Maternal disorders CSMR now validating, except for zero value for 50-55 year olds (see explanation in table below)
      * Maternal hemorrhage incidence is validating, except for zero value for 50-55 year olds (see explanation in table below)
  * - 3.0
    - Verify anemia prevalence and YLDs, postpartum state duration
    - Anemia prevalence looks good among pregnant population, too high among non-pregnant population. Anemia YLDs too high. Simulation duration extended to one year fixed postpartum duration oddities, now exactly equal to six weeks. `Model 3.0 V&V notebooks available here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/pull/29>`_
  * - 3.1 (3.0bugfix)
    - Verify no person time in the not-pregnant state, check anemia YLDs
    - Both look good! `Model 3.1 V&V notebooks available here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/pull/30>`_
  * - 4.0
    - Verify that:
        * Hemoglobin on maternal hemorrhage and maternal disorders incidence effects are as expected
        * Hemorrhage on postpartum hemoglobin effect is as expected
        * Maternal disorders and hemorrhage cause model V&V criteria are still met
    - `Model 4 V&V notebooks are available here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/pull/32>`_
        * Hemorrhage effect on postpartum hemoglobin effects are as expected (assessed via interactive sim)
        * Hemoglobin effect on maternal hemorrhage incidence is as expected. Maternal hemorrhage incidence still verifies as the population level. Note that there was a resolved bug where maternal *disorders* PAFs and RRs were applied to maternal hemorrhage, but this was resolved.
        * Hemoglobin on maternal disorders PAFs and RRs applied as expected, however, maternal disorders incidence (and therefore mortality) are slightly underestimated at the population level. This is due to risk-affected probabilities of an incident maternal disorder case greater than 1 for a substantial number of simulants with low hemoglobin levels. More details discussed in table below.
  * - 5.0
    - Verify that joint anemia/BMI risk exposure matches expected value and that exposure does not change over time with changing hemoglobin
    - Looks great! 
        * `Model 5.0 anemia exposure <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/pregnancy_model/model_5.0_maternal_disorders_anemia.ipynb>`_
        * `Model 5.0 joint anemia/BMI exposure prevalence <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/pregnancy_model/model_5_bmi_exposure.ipynb>`_
        * `Interactive sim to check that joint anemia/BMI exposure does not change over time <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/pregnancy_model/model_7_interactive_sim.ipynb>`_
  * - 6.0
    - Verify:
        * Scenario-specific intervention coverage
        * Intervention impacts on hemoglobin exposure
    - * `Intervention coverage looks good by scenario <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/pregnancy_model/model_6_intervention_coverage.ipynb>`_, and `confirmed to be appropriately targeted to BMI exposure in the interactive sim <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/pregnancy_model/model_7_interactive_sim.ipynb>`_
      * Draw-level uncertainty in intervention effect on hemoglobin erroneously applied as individual-level stochastic uncertainty, as shown in the interactive sim linked above
      * Baseline calibration of IFA effect on hemoglobin appears not to be performed correctly, as shown in the interactive sim linked above
  * - 7.0
    - Verify that intervention impacts on stillbirths were applied as expected
    - Looks great! `See the model 7 birth outcome V&V here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/pregnancy_model/model_7.0_preg_outcomes.ipynb>`_ 
  * - 8.0
    - * Check that model 6.0 V&V issues are resolved
      * Verify expected behavior of background morbidity implementation
    - * Intervention effect applications look as expected! `Model 8.0 interactive sim notebook available here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/pregnancy_model/model_8_interactive_sim.ipynb>`_
      * Implementation of background morbidity looks to be functioning as intended, but unexpected value for disability weight of other causes. `Model 8 YLDs notebook available here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/pregnancy_model/model_8.0_yld_checks.ipynb>`_
  * - 8.1
    - Verify that other causes disability weight is now as expected
    - * Looks good! Unable to verify that all_causes YLD observer is performing COMO adjustment (individual-level YLD data not available in the interactive sim and population-level observer results are not obviously indicating presence of COMO adjustment). Requesting observed YLDs to be stratified by pregnancy status as an attempt to remove influence of custom maternal disorders YLDs model to see if it becomes more obvious.
      * Also, noticed that while population-level intervention effects on birth outcomes is functioning as expected, the individual-level trajectories are not. At the population level, rate of "other" outcome stays approximately the same, live births increase, and stillbirths decrease with increasing intervention coverage, as expected. However, at the individual level, "other" outcomes become live births, and stillbirths become "other" outcomes. We believe this is due to the ordering of outcome choices in the random.choice call.
  * - 8.2
    - * Check for evidence of COMO adjustment functioning as expected between all-cause and cause-specific YLD observers in YLD results stratified by pregnancy state
      * Check that individual-level birth outcome transitions are logical between scenarios
    - * COMO adjustment between all-cause and cause-specific observers looks to be functioning as expected in all pregnancy states except for the parturition state
      * Unable to verify that individual-level birth outcome transitions are functioning as expected
  * - 8.3
    - * Check updated other causes DW value
      * Check resolution of CRN issue
      * Check resolution of all cause and cause-specific observer discrepancies in parturition state
    - All looks good! Ready to move to production :). `8.3 notebook available here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/pregnancy_model/model_8.3_yld_checks.ipynb>`_
  * - 10.0
    - * Check that model generally still looks as expected 
      * Check that anemia, maternal disorders and deaths match with target values 
      * Check that different scenarios visually appear to separated as expected 
    - All looks good! Ready to move to production runs. `Nigeria notebook <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/pregnancy_model/model_10.0_nigeria_maternal_disorders_anemia.ipynb>`_ and `Pakistan notebook <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/pregnancy_model/model_10.0_pakistan_maternal_disorders_anemia.ipynb>`_. Note for Pakistan notebook that the parent ID used was 159 which was different than expected. We are investigating this but think it is an issue with target data generation NOT with the model. 


.. list-table:: Outstanding V&V issues
  :header-rows: 1
  :widths: 5 20 15 5

  * - Issue
    - Explanation
    - Action plan
    - Timeline
  * - Zero values for 50-55 year old age group
    - Vivarium inputs fills maternal disorders deaths and maternal hemorrhage incidence with zeros due to :code:`age_end` parameter in :code:`gbd_mapping`, despite raw GBD estimates for these parameters being non-zero for this age group
    - Acceptable limitation given very low pregnancy incidence in this age group
    - N/A
  * - Slight underestimation of maternal disorders incidence and mortality
    - GBD maternal disorders parent cause is equal to the *sum* of maternal disorders sub-causes. Therefore, the incidence of the aggregate maternal disorders cause is quite high relative to the rate of pregnancies and when it is increased due to risk effects from hemoglobin, the calculated probability of an incident case can be greater than one. Since these probabilities are capped at one, we end up underestimating the incidence rate of maternal disorders at a population level. Note that this issue was present in the IV iron implementation; however, in the nutrition optimization implementation, maternal disorders mortality is conditional on maternal disorders incidence (whereas mortality was correlated with incidence, but not conditional on incidence in the IV iron implementation). Therefore, we are slightly underestimating maternal disorders mortality in this model.
    - As the underestimation is slight, we will move forward despite this limitation. In the meantime, we will investigate possible solutions to address this issue (in particular, modeling each individual maternal disorders sub-cause within the simulation), which we may consider incorporating into the model after other higher priority updates are made (such as intervention implementations in models 6 and 7)
    - TBD


4.0 Research background and limitations
++++++++++++++++++++++++++++++++++++++++

.. _MDYLDNote:

4.1 A note on years lived with disability and maternal disorders
-----------------------------------------------------------------

This simulation has taken a particular modeling strategy regarding years lived with disability due to :ref:`maternal disorders <2021_cause_maternal_disorders>` that involved integrating it into the :ref:`pregnancy model <other_models_pregnancy_closed_cohort>`. 

While described in more detail on the individual model documents, the main strategic decisions made in the design of this model are outlined below, with explanations:

- Modeling a specific "maternal disorders" state in the pregnancy model document with a duration of a single timestep that occurs between the pregnancy and postpartum states in which a simulant is either affected or unaffected by the maternal disorders cause. 

  - Modeling the maternal disorders state with the duration of one timestep (rather than an instantaneous moment at birth) allowed us to take advantage of standard vivarium behavior for accruing YLDs over the duration of time spent in the state according to a state-specific disability weight (custom calculated in this case).

- Modeling YLDs due to maternal disorders according to a custom calculated "disability weight" equal to the annual amount of YLDs due to maternal disorders per non-fatal case of maternal disorders rather than the typical strategy of prevalence-weighted average of sequela-specific disability weights.  

  - We took this strategy because the maternal disorders cause is a composite parent cause of many maternal disorders subcauses (see :ref:`the maternal disorders document<2021_cause_maternal_disorders>`). These subcauses all have differing disability weights as well as average durations. Therefore, by using the GBD COMO-adjusted YLD estimates to back-calculate a "disability weight" for the composite maternal disorders parent cause that results, we can produce the appropriate COMO-adjusted annual baseline rate of maternal disorders YLDs without needing to account for the differential DWs and durations of each of the maternal disorder subcauses to appropriately replicate the COMO adjustment within the simulation.

    - Note that a limitation of this strategy is that there are some sequelae within the maternal disorders cause that last for longer than one year. Because of this, some of the YLDs in the GBD estimate of the COMO-adjusted annual YLD rate due to maternal disorders will be due to births that occurred in the year prior to our index year; we will therefore assign some of these YLDs due to prevalent cases to incident cases in our simulation. However, we are additionally limited in that we do not consider disability due to incident maternal disorder cases beyond one year after birth. Note that for the baseline scenario, these two limitations should cancel out so long as the incidence of these long-lasting sequelae are stable over time after adjusting for changing fertility rates. 

- Pausing accumulation of YLDs due to causes other than maternal disorders (specifically anemia, other causes) while simulants occupy the maternal disorders state in the pregnancy model.

  - We took this strategy because the maternal disorders YLDs as calculated above are already COMO adjusted. Therefore, we do not wish to further adjust these YLDs for comorbid causes that a simulant may possess.

    - Note that this causes underestimation of YLDs due to causes other than maternal disorders from the start of pregnancy until six weeks postpartum by roughly a factor of 1/38 (~2.16 percent) for this simulation given a timestep of one week and an average pregnancy + postpartum combined duration of approximately 38 weeks (6 weeks postpartum + 32 weeks of pregnancy, weighted average of full and partial term pregnancies).
      - We have addressed this limitation during post-processing for the IV iron simulation by multiplying YLDs due to anemia accrued during the postpartum state by :code:`6/5` given that the duration of the maternal disorders state was one week and the duration of the postpartum state was 5 weeks. 

.. todo:: 
  
  Determine if we wish to replicate this anemia YLD re-scaling strategy for this simulation (trade off between observer stratification and associated increases in run time). Will need to update final output/stratification requests if desired. 

- Not including maternal disorders as a "modeled cause" in the model of morbidity due to "other causes," :ref:`as discussed on this page <other_causes_ylds>`.

  - This allows us to adjust YLDs due to causes other than maternal disorders to be COMO-adjusted for maternal disorders, since this adjustment will not be done within the simulation despite the fact that we are modeling maternal disorders due to our unique modeling strategy for this cause. Note that YLDs due to maternal disorders in our simulation are already COMO-adjusted for all other causes because we are using the GBD COMO-adjusted YLD estimate to calculate the maternal disorders disability weight, as described above.

    - Note that this modeling strategy does not allow for intervention-associated reductions in YLDs due to maternal disorders to cause *increases* in YLDs due to causes other than maternal disorders (which should occur for comorbid causes, :ref:`as discussed on this page <other_causes_ylds>`) and vise versa (reductions in YLDs due to anemia will not increase comorbid YLDs due to maternal disorders). However, given that each of these individual causes represents a small portion of all cause YLDs for our modeled demographic groups, the impact of this limitation will be small. 

- Modeling YLDs and YLLs due to :ref:`maternal hemorrhage <2019_cause_maternal_hemorrhage_incidence>` as part of the :ref:`maternal disorders <2021_cause_maternal_disorders>` composite cause rather than part of the maternal hemorrhage incidence cause (which has no associated morbidity or mortality).

  - We did this in order to remain consistent with GBD. The GBD hemoglobin risk effect applies equally to all maternal disorders subcauses (in other words, the hemoglobin relative risks are specific to *all* maternal disorders and we do not have data for cause-specific hemoglobin risk effects). Therefore, we model the risk effect of hemoglobin on maternal disorders as a composite cause (including hemorrhage) and model maternal hemorrhage incidence **only** as a way to estimate the impact of pregnancy hemoglobin on postpartum hemoglobin as mediated through hemorrhage at birth. 

    - Note that it is possible that we could use the more specific hemoglobin on maternal hemorrhage risk effects obtained from the literature to apply to maternal hemorrhage morbidity and mortality, but we chose to remain consistent with GBD rather than model more detailed risk effects for this single specific subcause of maternal disorders. 
