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

.. _2024_vivarium_mncnh_portfolio_neonatal_module:

======================================
Neonatal module
======================================

.. contents::
  :local:
  :depth: 2

1.0 Overview
++++++++++++

The neonatal component of the MNCNH portfolio simulation is comprised of one single module. This module functions more similarly to standard vivarium simulations and is comprised of cause models, risk models, and intervention models (all of which are linked below).

2.0 Module Diagram and Data
+++++++++++++++++++++++++++++++

2.1 Module Inputs
---------------------

.. list-table:: Module required inputs
  :header-rows: 1

  * - Input
    - Source module
    - Application
    - Note
  * - Birth outcome
    - Pregnancy module
    - Only live births proceed through the neonatal module
    - 
  * - Gestational age
    - Pregnancy module
    - LBWSG risk effects
    - 
  * - Birth weight
    - Pregnancy module
    - LBWSG risk effects
    - 
  * - Child sex
    - Pregnancy module
    - Neonatal mortality rates
    - 
  * - Antenatal corticosteroid coverage
    - Intrapartum intervention module
    - 
    - 
  * - RDS intervention propensity
    - Initial attributes module
    - Determines which simulants receive each RDS interventions (CPAP and ACS) 
    - 
  * - Hemoglobin exposure at birth
    - Hemoglobin module
    - Affects neonatal sepsis risk
    - 

2.2 Cause models
-----------------

:ref:`Neonatal Mortality Model <2021_cause_neonatal_disorders_mncnh>`

* :ref:`Neonatal Sepsis and Other Infections Model <2021_cause_neonatal_sepsis_mncnh>`
* :ref:`Neonatal Encephalopathy Model <2021_cause_neonatal_encephalopathy_mncnh>`
* :ref:`Preterm Birth <2021_cause_preterm_birth_mncnh>`

2.3 Risk models
----------------

The following risk factors affect neonatal causes:

* Low birth weight and short gestation

  * **Risk exposure:** informed as an output from the pregnancy module

  * **Risk effects:** instructions for how to apply LBWSG risk effects are described on the :ref:`Neonatal Mortality Model <2021_cause_neonatal_disorders_mncnh>`. Additional information can be found on the :ref:`LBWSG risk effects document <2019_risk_effect_lbwsg>`

* Hemoglobin at birth

  * **Risk exposure:** informed as an output from the hemoglobin module

  * **Risk effects:** affects neonatal sepsis according to the instructions on the :ref:`hemoglobin risk effects document <2023_hemoglobin_effects>`

2.4 Intervention models
------------------------

* :ref:`Antibiotics for treating bacterial infections <intervention_neonatal_antibiotics>`
* :ref:`CPAP for treating Preterm with RDS <intervention_neonatal_cpap>`
* :ref:`Neonatal probiotics <intervention_neonatal_probiotics>`
* Antenatal corticosteroids (coverage assumed equal to CPAP coverage, see below)


2.5: Module Outputs
-----------------------

See observer/outputs section on main concept model document.

3.0 Assumptions and limitations
++++++++++++++++++++++++++++++++

* In GBD, LBWSG impacts all-cause mortality, which overlaps with the other neonatal causes. The method for handling this is complex, since preterm birth is a PAF-of-one cause, that we want to split into preterm with and without RDS, and other causes must have a RR with LBWSG to make the all-cause RR calibrate.
* In this phase of model building, we are not including lung surfactant or kangaroo care which are closely tied to the CPAP/NICU intervention. We might add these to the model in a later phase. 

4.0 Verification and Validation Criteria
+++++++++++++++++++++++++++++++++++++++++

* Confirm ACMR in sim matches ACMR in artifact
* Confirm LBWSG exposure match
* Confirm LBWSG RR on ACMR matches
* Confirm CSMR matches for preterm, sepsis, encephalopathy
* Confirm that RDS incidence and mortality match expectations
* Confirm that interventions have expected efficacy and coverage rates

5.0 References
+++++++++++++++

