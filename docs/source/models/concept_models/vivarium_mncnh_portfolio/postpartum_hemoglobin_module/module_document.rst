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

.. _2024_vivarium_mncnh_portfolio_postpartum_hemoglobin:

======================================
Postpartum hemoglobin module
======================================

.. contents::
  :local:
  :depth: 2

1.0 Overview
++++++++++++

This module exists to model hemoglobin and anemia outcomes in the postpartum period following birth and is part of the intrapartum component of the simulation. Notably, postpartum hemoglobin is determined from hemoglobin at birth (an output of the pregnancy component hemoglobin module) and whether a simulant experienced postpartum hemorrhage.

2.0 Module Diagram and Data
+++++++++++++++++++++++++++++++

Follow the steps below to model the postpartum hemoglobin module. Module inputs and outputs are summarized in the tables below.

1. Assign postpartum hemoglobin exposure equal to hemoglobin exposure at birth
2. Scale postpartum hemoglobin exposure for incident cases of maternal hemorrhage according to the :ref:`maternal hemorrhage risk effects document <2019_risk_effect_maternal_hemorrhage>`
3. Assess postpartum anemia level according to the relationship between hemoglobin and anemia *specific to pregnant individuals* on the :ref:`anemia impairment document <2019_anemia_impairment>`. Note that the pregnant-specific threshold values are used to assess anemia status for the first six weeks postpartum.
4. Calculate anemia YLDs in the postpartum period by multiplying the anemia severity-specific disability weights found on the :ref:`anemia impairment document <2019_anemia_impairment>` by a six week duration (modeled period for postpartum anemia).

.. todo::

  Confirm whether we want to measure anemia YLDs on a different timescale than the six weeks postpartum that we have used for similar models in the past.

.. list-table:: Module required inputs
  :header-rows: 1

  * - Input
    - Source module
    - Application
    - Note
  * - Hemoglobin at birth
    - :ref:`Hemoglobin module <2024_vivarium_mncnh_portfolio_hemoglobin_module>`
    - Informs postpartum hemoglobin exposure
    - 
  * - Maternal hemorrhage incidence
    - :ref:`Maternal disorders module <2024_vivarium_mncnh_portfolio_maternal_disorders_module>`
    - Incident maternal hemorrhage cases decrease postpartum hemoglobin exposure
    - 


.. list-table:: Module outputs
  :header-rows: 1

  * - Output
    - Value
    - Dependencies
  * - A. Postpartum anemia YLDs
    - Point value
    - Simulation result
  * - B. Postpartum hemoglobin
    - Point value
    - Used for V&V of maternal hemorrhage effect on postpartum hemoglobin


3.0 Assumptions and limitations
++++++++++++++++++++++++++++++++

* We assume the pregnancy-specific hemoglobin thresholds for anemia apply to the first six weeks of the postartum period

* We do not track YLDs due to anemia beyond six weeks postpartum

4.0 Verification and Validation Criteria
+++++++++++++++++++++++++++++++++++++++++

* Effect of maternal hemorrhage on postpartum hemoglobin (postpartum hemoglobin stratified by maternal hemorrhage incidence) should be as expected

5.0 References
+++++++++++++++

