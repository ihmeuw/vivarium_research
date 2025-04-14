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

.. _2024_vivarium_mncnh_portfolio_facility_choice_module:

======================================
Facility choice module
======================================

.. note::

  The following information was implemented as a placeholder prior to completion of the final facility choice model. It is retained in this note for reference.

  The placeholder delivery facility probabilities are as follows:

    - Home: 68.3%

    - Hospital (CEMONC): 26.6%

    - Clinic/low-level facility (BEMONC): 5.1%

  The placeholder values are from `this paper on Ethiopia <https://link.springer.com/article/10.1186/s12884-020-03002-x#Tab2>`_.

  Eventually location-specific values from DHS will be used for this parameter. Note that denominator in DHS is all births (live and stillbirths) to interviewed women in the two years preceeding the survey.

  V&V: Confirm attendance rate for each type of delivery facility matches inputs

  Limitation: Moving to a higher level care facility during the intrapartum period is common (referred up once labor begins if there is an issue) and the ability to do this is often a result of transport available, distance to clinics, etc. We will not include this and instead have simulants remain at a single facility for the whole intrapartum period. 

  TODO: update to be consistent with BEMONC/CEMONC terminology?



.. contents::
  :local:
  :depth: 2

1.0 Overview
++++++++++++

This module uses the delivery facility propensity (an output from the initial attributes model that is correlated with propensity values for ANC attendance and LBWSG exposure) as well as believed gestational age to assign a delivery facility exposure in the intrapartum component of the simulation. 

2.0 Module Diagram and Data
+++++++++++++++++++++++++++++++

There is a significant amount of background research and analysis that has gone into the facility choice model, which is detailed on the :ref:`facility choice model document <2024_facility_model_vivarium_mncnh_portfolio>`. The information on this page highlights the necessary information for implementation only, with module inputs and outputs described in the tables below.

.. list-table:: Module required inputs
  :header-rows: 1

  * - Input
    - Source module
    - Application
    - Note
  * - Delivery facility propensity value
    - :ref:`Initial attributes module <2024_vivarium_mncnh_portfolio_initial_attributes_module>`
    - Used to determine home birth exposure by comparing to the believed gestational age-specific delivery facility probability values located in the "Conditional delivery facility probabilities" section of the :ref:`facility choice model document <2024_facility_model_vivarium_mncnh_portfolio>`. Note that ordering of the delivery facilities is important: see the "Special ordering of the categories" section of the facility choice model document.
    - 
  * - Believed gestational age
    - :ref:`AI ultrasound module <2024_vivarium_mncnh_portfolio_ai_ultrasound_module>`
    - Determines which delivery facility probabily values to use (values found in the "Conditional delivery facility probabilities" section of the :ref:`facility choice model document <2024_facility_model_vivarium_mncnh_portfolio>`). If <37 weeks, use believed preterm values. If 37+ weeks use the believed term values.
    - 

.. list-table:: Module outputs
  :header-rows: 1

  * - Output
    - Value
    - Instructions
    - Note
  * - A. Delivery facility
    - *home* / *bemonc* / *cemonc*
    - Use delivery facility propensity and believed gestational age input values to assign delivery facility exposure as described in the "Application" column of the module input table
    - 


3.0 Assumptions and limitations
++++++++++++++++++++++++++++++++

See the :ref:`facility choice model document <2024_facility_model_vivarium_mncnh_portfolio>`.

Additionally, we do not currently consider facility transfers.

4.0 Verification and Validation Criteria
+++++++++++++++++++++++++++++++++++++++++

* Delivery facility exposure distribution stratified by believed preterm status should match expectations.

5.0 References
+++++++++++++++

