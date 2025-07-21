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

.. _2024_vivarium_mncnh_portfolio_intrapartum_interventions_module:

======================================
Intrapartum intervention module
======================================

.. contents::
  :local:
  :depth: 2

1.0 Overview
++++++++++++

.. todo::

  Update this page to include the misoprostol intervention

This module in the intrapartum component determines coverage of intrapartum interventions, including azithromycin and corticosteroids (and eventually intrapartum sensors in wave II). Coverage availability/eligibility will depend on birth facility and believed gestational age.

2.0 Module Diagram and Data
+++++++++++++++++++++++++++++++

2.1 Module Diagram
----------------------

.. image:: intrapartum_intervention_module_diagram.png

2.2 Module Inputs
---------------------

.. list-table:: Module required inputs
  :header-rows: 1

  * - Input
    - Source module
    - Application
    - Note
  * - Pregnancy term
    - :ref:`Pregnancy module <2024_vivarium_mncnh_portfolio_pregnancy_module>`
    - Partial term pregnancies do not proceed through this module
    - 
  * - Delivery facility
    - :ref:`Facility choice <2024_vivarium_mncnh_portfolio_facility_choice_module>`
    - Determines intervention availability
    - * Coverage of azithromycin and antenatal corticosteroids is delivery facility-specific (see decision nodes #1 and #3)
      * Only home births are eligible for misoprostol intervention (decision node #5)
  * - Believed gestational age
    - :ref:`AI ultrasound <2024_vivarium_mncnh_portfolio_ai_ultrasound_module>`
    - Affects antenatal corticosteroid coverage (decision node #2)
    - Only births believed to be preterm are eligible for coverage
  * - ANC attendance
    - :ref:`ANC attendance module <2024_vivarium_mncnh_portfolio_anc_module>`
    - Determines misoprostol intervention eligibility (decision node #4)
    - Only those who attend ANC can receive misoprostol
  * - RDS intervention propensity
    - :ref:`Initial attributes module <2024_vivarium_mncnh_portfolio_initial_attributes_module>`
    - Used to determine which simulants receive each RDS intervention (:ref:`CPAP <intervention_neonatal_cpap>` and :ref:`ACS <acs_intervention>`)
    - 


2.3 Module Decision Nodes
-----------------------------

.. list-table:: Module decision nodes
  :header-rows: 1

  * - Decision node
    - Description
    - Information
    - Note
  * - 1
    - Receives intrapartum azithromycin?
    - Scenario-dependent variable: :ref:`intrapartum component scenario table <MNCNH intrapartum component scenario table>` for values (and baseline coverage section below for baseline coverage)
    - 
  * - 2
    - Believed to be preterm?
    - Believed gestational age (from pregnancy module output) < 37 weeks
    - Note necessary unit conversion between days and weeks
  * - 3
    - Receives antenatal corticosteroids
    - Scenario-dependent variable: :ref:`intrapartum component scenario table <MNCNH intrapartum component scenario table>` for values (and baseline coverage section below for baseline coverage)
    - 
  * - 4
    - Attends ANC?
    - ANC attendance == True based on module input
    - 
  * - 5
    - Delivers at home?
    - Delivery facility == home based on module input
    - 

2.3.1 Baseline coverage
~~~~~~~~~~~~~~~~~~~~~~~~~

**Misoprostol:**

Please see :ref:`the misoprostol intervention documentation page <misoprostol_intervention>` for baseline coverage values.

**Intrapartum azithromycin:** 

Please see :ref:`the azithromycin intervention documentation page <azithromycin_intervention>` for baseline coverage values for births at 
home and in BEmONC and CEmONC facilities. 

**Antenatal corticosteroids:** 

Please see :ref:`the CPAP intervention documentation page <intervention_neonatal_cpap>` for baseline coverage values for births at 
home and in BEmONC and CEmONC facilities. CPAP is a neonatal intervention, but like ACS, it treats RDS and we make the assumption 
that the coverage of ACS in the delivery facility is the same as the baseline coverage of CPAP in the delivery facility. See the 
:ref:`ACS intervention documentation page <acs_intervention>` for more information on this assumption.

.. todo::

  Update terminology to be consistent with BEMONC/CEMONC?

2.4 Module Action Points
---------------------------

.. list-table:: Module action point
  :header-rows: 1

  * - Action point
    - Description
    - Information
    - Note
  * - I
    - Record receipt of intrapartum azithromycin
    - Record to output A
    - 
  * - II
    - Record receipt of antenatal corticosteroids
    - Record to output B
    - 
  * - III
    - Record receipt of misoprostol
    - Record to output C
    - 

2.4: Module Outputs
-----------------------

.. list-table:: Module outputs
  :header-rows: 1

  * - Output
    - Value
    - Note
  * - A. Intrapartum azithromycin coverage
    - *True* / *False*
    - 
  * - B. Antenatal corticosteroid coverage
    - *True* / *False*
    - Coverage can only be *True* if gestational age is believed to be between 26 and 33 weeks
  * - C. Misoprostol
    - *True* / *False*
    - Coverage can only be *True* if simulant attended ANC and delivered at home

3.0 Assumptions and limitations
++++++++++++++++++++++++++++++++

.. todo::

  List module assumptions and limitations

4.0 Verification and Validation Criteria
+++++++++++++++++++++++++++++++++++++++++

* See :ref:`the azithromycin intervention documentation page <azithromycin_intervention>` and  :ref:`the misoprostol intervention documentation page <misoprostol_intervention>` for V&V criteria.

* Confirm no simulants believed to be outside of 26 and 33 weeks of gestational age at birth recieve corticosteroids

5.0 References
+++++++++++++++

