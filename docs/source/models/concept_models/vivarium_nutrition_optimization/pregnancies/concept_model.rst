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

.. todo::

  Link child page

.. _nutritionoptimizationpreg2.0:

1.1 Modeling aims and objectives
---------------------------------

.. todo::

  List modeling aims and objectives

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
    - ANC1
    - 0
  * - 2: Universal BEP
    - 0
    - 0
    - ANC1
  * - 3: Targeted BEP/none
    - Baseline for adequate BMI pregnancies
    - 0
    - ANC1 for low BMI pregnancies
  * - 4: Targeted BEP/MMS
    - 0
    - ANC1 for adequate BMI pregnancies
    - ANC1 for low BMI pregnancies

Where: 

- **0** represents the minimum intervention coverage (no coverage), 

- **ANC1** represents the maximum intervention coverage equal to the proportion of pregnancies that attend at least one antenatal care visit which can be pulled with :code:`get_covariate_estimates(covariate_id=7, decomp_step='iterative')`

- **Baseline** represents location-specific baseline IFA coverage, defined in the table below

.. list-table:: Baseline IFA coverage
  :header-rows: 1

  * - Location
    - Value
    - Note
  * - Ethiopia
    - 
    - 
  * - Nigeria
    - 
    - 
  * - Pakistan
    - 
    - 

.. todo::

  Fill in coverage levels (need to seek 2021 estimates and adjust for ANC values)

2.5 Outputs
------------

.. todo::

  Detail requested observers/outputs both for:

    - maternal results
    - child input data

.. _nutritionoptimizationpreg5.0:

3.0 Models
++++++++++

.. list-table:: Model run requests
  :header-rows: 1

  * - Run
    - Description
    - Scenarios
    - Specification modifications
    - Output modifications
    - Stratificaction modifications
    - Note
  * - 0.0
    - Standard demography 
    - Baseline
    - None
    - Person-time and deaths
    - Age only
    - 
  * - 0.1
    - Pregnancy demography (:ref:`docs here <other_models_pregnancy_demography>`)
    - Baseline
    - None
    - Person-time and deaths
    - Age only
    - 
  * - 1
    - Pregnancy (:ref:`docs here <other_models_pregnancy_closed_cohort>`)
    - Baseline
    - None
    - Person-time, birth outcomes
    - Age and pregnancy status
    - Note closed cohort change from IV iron pregnancy model. Custom observer exit at the end of postpartum period? (Bonus ask)

.. todo::

  Detail additional logical model builds with engineers, with the following in mind: https://blog.crisp.se/2016/01/25/henrikkniberg/making-sense-of-mvp


.. list-table:: Verification and validation tracking
  :header-rows: 1

  * - Model
    - Description
    - V&V summary
  * - 0.0: Standard demography
    - Mortality model for standard cohort of WRA
    - Overall seems to be functioning as expected, but would like to add person-time observer to results. `Notebook can be found here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/verification_and_validation/model_0.0.ipynb>`_.

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

