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

This module exists to model hemoglobin and anemia outcomes in the postpartum period among birthing parents who survive labor and is part of the postpartum component of the simulation. Notably, postpartum hemoglobin is determined from hemoglobin at end of pregnancy (an output of the pregnancy component hemoglobin module) and whether a simulant experienced postpartum hemorrhage.

2.0 Module Diagram and Data
+++++++++++++++++++++++++++++++

Follow the steps below to model the postpartum hemoglobin module. Module inputs and outputs are summarized in the tables below.

1. Determine if simulant survived labor and progressed to the postpartum period
2. Among surviving simulants, assign hemoglobin exposure for the first six weeks after delivery equal to hemoglobin exposure at birth
3. Shift hemoglobin exposures for incident cases of maternal hemorrhage according to the :ref:`maternal hemorrhage risk effects document <2023_risk_effect_maternal_hemorrhage>` effect on the first six weeks after the end of pregnancy
4. Among surviving simulants, assign the hemoglobin exposure between 6 weeks and 9 months postpartum
   using the non-pregnant hemoglobin distribution (MEID 27596, GBD 2023 version mv_20250804_flash_regal_snake)
   and the *same* propensity that was used to assign the simulant their initial hemoglobin exposure.
5. Shift hemoglobin exposures for incident cases of maternal hemorrhage according to the :ref:`maternal hemorrhage risk effects document <2023_risk_effect_maternal_hemorrhage>` effect on the period from 6 weeks to 9 months after the end of pregnancy

.. list-table:: Module required inputs
  :header-rows: 1

  * - Input
    - Source module
    - Application
    - Note
  * - Hemoglobin at end of pregnancy
    - :ref:`Hemoglobin module <2024_vivarium_mncnh_portfolio_hemoglobin_module>`
    - Informs postpartum and post-postpartum hemoglobin exposure
    - 
  * - Maternal hemorrhage incidence
    - :ref:`Maternal disorders module <2024_vivarium_mncnh_portfolio_maternal_disorders_module>`
    - Incident maternal hemorrhage cases decrease postpartum and post-postpartum hemoglobin exposure
    - 


.. list-table:: Module outputs
  :header-rows: 1

  * - Output
    - Value
    - Dependencies
  * - Postpartum hemoglobin
    - Point value
    - Used for V&V of maternal hemorrhage effect on postpartum hemoglobin


3.0 Assumptions and limitations
++++++++++++++++++++++++++++++++

* We assume the pregnancy-specific hemoglobin thresholds for anemia apply to the first six weeks after the end of pregnancy
* We apply the effect of maternal hemorrhage on hemoglobin to the first six weeks after the end of pregnancy and the period from 6 weeks to 9 months after the end of pregnancy as discrete timesteps,
  which does not capture the continuous nature of hemoglobin changes over time
* We assume that all modifications that have been made to hemoglobin during pregnancy last only until six weeks after the end of pregnancy,
  *except* for the effect of maternal hemorrhage

4.0 Verification and Validation Criteria
+++++++++++++++++++++++++++++++++++++++++

* Effect of maternal hemorrhage on postpartum hemoglobin (postpartum hemoglobin stratified by maternal hemorrhage incidence) should be as expected

5.0 References
+++++++++++++++

