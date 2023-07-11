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

+---------------------+-------------------------------------------+---------------------+
| Category            | Model                                     | Note                |
+=====================+===========================================+=====================+
|Demography           |:ref:`Population structure at              |Change from IV iron  |
|                     |initialization                             |due to closed cohort |
|                     |<other_models_pregnancy_demography>`       |                     |
|                     +-------------------------------------------+                     |
|                     |:ref:`Pregnancy model (closed cohort)      |                     |
|                     |<other_models_pregnancy_closed_cohort>`    |                     |
+---------------------+-------------------------------------------+---------------------+
|Risk exposure        |Hemoglobin/anemia                          |                     |
|                     +-------------------------------------------+---------------------+
|                     |Pre-pregnancy/first trimester BMI          |                     |
|                     +-------------------------------------------+---------------------+
|                     |Birth weight and gestational age           |                     |
+---------------------+-------------------------------------------+---------------------+
|Risk correlation     |Hgb/BMI/LBWSG                              |                     |
+---------------------+-------------------------------------------+---------------------+
|Risk effects         |Hemoglobin, including effects on:          |Do not include effect|
|                     | - Maternal disorders                      |on birth outcomes    |
|                     | - Maternal hemorrhage incidence           |(stillbirth). Change |
|                     |                                           |from IV iron         |
|                     +-------------------------------------------+---------------------+
|                     |:ref:`Maternal hemorrhage effect on        |                     |
|                     |hemoglobin                                 |                     |
|                     |<2019_risk_effect_maternal_hemorrhage>`    |                     |
+---------------------+-------------------------------------------+---------------------+
|Causes               |:ref:`Maternal disorders                   |                     |
|                     |<2021_cause_maternal_disorders>`           |                     |
|                     +-------------------------------------------+---------------------+
|                     |:ref:`Maternal hemorrhage incidence        |                     |
|                     |<2019_cause_maternal_hemorrhage_incidence>`|                     |
|                     +-------------------------------------------+---------------------+
|                     |:ref:`Background morbidity due to other    |Modeled causes: c366,|
|                     |causes <other_causes>`                     |r192. Change from    |
|                     |                                           |IV iron!             |
|                     +-------------------------------------------+---------------------+
|                     |Removal of background mortality due to     |Change from IV iron  |
|                     |other causes                               |                     |
+---------------------+-------------------------------------------+---------------------+
|Interventions        |:ref:`Antenatal supplementation, including |Change from IV iron! |
|                     |IFA, MMS, and BEP and their effects        |New effects on       |
|                     |on antenatal hemoglobin, LBWSG, and        |gestational age and  |
|                     |birth outcomes                             |birth outcomes (no   |
|                     |<maternal_supplementation_intervention>`   |changes to hemoglobin|
|                     |                                           |effects). Also,      |
|                     |                                           |coverage algorithm is|
|                     |                                           |updated              |
+---------------------+-------------------------------------------+---------------------+

.. list-table:: Wave I outstanding tasks
  :header-rows: 1

  * - Task
    - Dependencies
    - RT person
    - ST person
    - Note
  * - Model builds 0.0 through 1
    - .
    - Docs ready, will need V&V (Ali)
    - In progress (Patrick/Steve)
    - New content from IV iron
  * - Model builds 2-6
    - .
    - Docs ready, will need V&V (Ali)
    - Patrick/Steve
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
  * - General GBD 2021 update
    - Ali blocked by hemoglobin distribution questions, team blocked by GBD timeline
    - Ali
    - Patrick/Steve
    - 
  * - Background morbidity
    - .
    - Ali
    - Patrick/Steve
    - Bonus task, not necessary for success

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
    - Need to confirm with engineers
  * - Simulation start date
    - 2025-01-01
    -
  * - Simulation observation start date
    - 2025-01-01
    - (No burn-in period)
  * - Simulation end date
    - 2025-12-3
    - Assumes maximum pregnancy duration of 42 weeks + 6 weeks postpartum + 1 day. 2025 is not a leap year
  * - Timestep
    - 1 week (7 days)
    - Note, could be increased to two weeks if duration of maternal disorders pregnancy state is updated.
  * - Randomness key columns
    - ['entrance_time', 'age']
    - 

.. _nutritionoptimizationpreg4.0:

2.4 Simulation scenarios
------------------------

.. note::

  Scenarios subject to change, but will follow similar structure

  Note that while IFA must be included in the model for baseline calibration, it will *not* be included as a scale-up intervention to include in the optimization process. Therefore, we will not "zero" out IFA coverage in the "zero coverage" scenario and we will not scale-up IFA coverage to its maximum value independently. IFA coverage may only remain at its baseline coverage level *or* be reduced to zero when it is replaced with MMS or BEP.

.. list-table:: Scenarios
  :header-rows: 1

  * - Scenario
    - IFA coverage
    - MMS coverage
    - BEP coverage
  * - Baseline/zero coverage
    - Baseline
    - 0
    - 0
  * - 1: MMS
    - 0
    - 1
    - 0
  * - 2: Universal BEP
    - 0
    - 0
    - 1
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

2.5 Outputs
------------

There are two important categories of outputs for this model. The first is maternal health data obtained from observing the simulants in the pregnancy simulation that will be used to inform maternal health outcomes in the emulator. The second is data that will be used as inputs to the child simulation (including information such as LBWSG risk exposure). The maternal health data will be recorded at the aggregate level, but the child health data will be recorded at the individual level. 

Specific outputs for specific models are specified in the following section.

.. _nutritionoptimizationpreg5.0:

3.0 Models
++++++++++

.. note::

  Unless otherwise specified, all maternal outputs should be stratified by maternal age group

.. todo::

  Determine which model we will plan to remove mortality due to "other causes" and add to V&V plan

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
    - Maternal disorders and maternal hemorrhage cause models
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
      * YLDs
      * Pregnancy state person time
      * Pregnancy transition counts
    - N/A
    - 
  * - 9.0
    - Production run test
    - 1-4
    - (some larger number of draws and seeds, tbd)
    - No age stratification:
      
      * Deaths
      * YLLs
      * YLDs
      * Intervention counts
    - Live and still births with maternal_ids, infant sex, intervention coverage, and LBWSG exposures
    - 
  * - 9.1
    - Production runs
    - 1-4
    - (some larger number of draws and seeds, tbd)
    - No age stratification:
      
      * Deaths
      * YLLs
      * YLDs
      * Intervention counts
    - Live and still births with maternal_ids, infant sex, intervention coverage, and LBWSG exposures
    - 
  * - 10.0
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
    - Looks good! `Model 1.2 V&V notebook can be found here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/pregnancy_model/model_1.2.ipynb>`. Noted that infant sex should be added to child output data moving forward.
  * - 2.0
    - Verify incident and fatal maternal disorder and maternal hemorrhage (incident only) rates
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

