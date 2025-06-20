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

.. _2024_vivarium_mncnh_portfolio_maternal_disorders_module:

======================================
Maternal disorders module
======================================

.. contents::
  :local:
  :depth: 2

1.0 Overview
++++++++++++

This module is part of the intrapartum component and reads inputs that affect maternal disorders incidence/mortality (such as azithromycin coverage, hemoglobin exposure for wave II) and outputs incident and fatal cases of maternal disorders.

2.0 Module Diagram and Data
+++++++++++++++++++++++++++++++

There is no specific decision tree diagram for this module. Rather, the individual maternal disorders cause model documents are linked below:

* :ref:`Overall maternal disorders <2021_cause_maternal_disorders_mncnh>` and the following subcauses:

  * :ref:`Maternal Hemorrhage <2021_cause_maternal_hemorrhage_mncnh>`
  * :ref:`Maternal Sepsis <2021_cause_maternal_sepsis_mncnh>`
  * :ref:`Obstructed Labor <2021_cause_obstructed_labor_mncnh>`
  * Maternal hypertension

There are specific variables that will affect these cause models, summarized in the table below. Note that the factors included in this table are required inputs to the maternal disorders module.

.. list-table:: Factors that affect maternal disorders models
  :header-rows: 1

  * - Variable
    - Source module
    - Affected outcome
    - Instructions
    - Note
  * - Azithromycin coverage
    - :ref:`Intrapartum interventions <2024_vivarium_mncnh_portfolio_intrapartum_interventions_module>`
    - Maternal sepsis incidence rate
    - See the :ref:`Azithromycin intervention page <azithromycin_intervention>`
    - 
  * - Misoprostol coverage
    - :ref:`Intrapartum interventions <2024_vivarium_mncnh_portfolio_intrapartum_interventions_module>`
    - Maternal hemorrhage incidence rate
    - See the :ref:`Misoprostol intervention page <misoprostol_intervention>`
    - 
  * - Hemoglobin at birth
    - :ref:`Hemoglobin component <2024_vivarium_mncnh_portfolio_hemoglobin_module>`
    - Maternal sepsis, maternal hemorrhage, maternal depressive disorders, maternal hypertensive disorders
    - See :ref:`hemoglobin risk effects document <2023_hemoglobin_effects>`
    - For wave II

.. note::

  Future factors that will affect maternal disorders in wave II of the simulation will include cesarean sections

2.4: Module Outputs
-----------------------

Incidence, mortality, YLDs, and YLLs due to cause-specific maternal disorders.

3.0 Assumptions and limitations
++++++++++++++++++++++++++++++++

* There are many other maternal disorders which we do not plan to individually model. 

4.0 Verification and Validation Criteria
+++++++++++++++++++++++++++++++++++++++++

* Confirm outcomes for each maternal disorder (OL, sepsis, and hemorrhage) matches GBD data 
* See :ref:`the azithromycin intervention documentation page <azithromycin_intervention>` and :ref:`misoprostol intervention documentation page <misoprostol_intervention>` for V&V criteria specific to azithromycin intervention model

5.0 References
+++++++++++++++

