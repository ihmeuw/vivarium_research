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

.. _2024_vivarium_mncnh_portfolio_pregnancy_module:

======================================
Pregnancy module
======================================

.. contents::
  :local:
  :depth: 2

1.0 Overview
++++++++++++

This module initializes a maternal age and determines basic pregnancy outcome information such as term length, child sex, etc.

2.0 Module Diagram and Data
+++++++++++++++++++++++++++++++

2.1 Module Diagram
----------------------

.. graphviz::

    digraph pregnancy {
      rankdir = LR;
      p [label="pregnant"]
      ft [label="full term\npregnancy*"]
      pt [label="partial term\npregnancy"]
      data [label="*assign sex,\ngestational age,\nand birthweight\n for full term\npregnancies", shape=box]

      ancipm [label="antenatal & \nintrapartum\nmodels + \nmaternal\ndisorders", shape=box, style=dashed]
      birth [label="full term\nbirth"]
      livebirth [label="live\nbirth"]
      stillbirth [label="stillbirth"]
      {rank=same; ft; pt; data}

      p -> ft 
      p -> pt 
      ft -> ancipm 
      ancipm -> birth 
      birth -> livebirth
      birth -> stillbirth
    }

.. note:: 

  This diagram does not include modification by other modules (e.g., effect of antenatal interventions on GA and BW).

All instructions are detailed on the :ref:`MNCNH portfolio pregnancy model document <other_models_pregnancy_closed_cohort_mncnh>`. This document also 
contains a list of model assumptions and limitations as well as verification and validation criteria.

The inputs and outputs for this module are summarized in the tables below. 

.. list-table:: Module required inputs
  :header-rows: 1

  * - Input
    - Source module
    - Application
    - Note
  * - LBWSG category propensity
    - :ref:`Initial attributes module <2024_vivarium_mncnh_portfolio_initial_attributes_module>`
    - Used to sample exposure value from the LBWSG exposure
      distribution. Ordering of the LBWSG exposure categories matters
      when sampling. See the :ref:`correlated propensities
      <facility_choice_correlated_propensities_section>` and
      :ref:`special ordering of the categories
      <facility_choice_special_ordering_of_categories_section>` sections
      of the :ref:`facility choice model document
      <2024_facility_model_vivarium_mncnh_portfolio>`.
    - 
  * - IFA/MMS coverage
    - :ref:`Hemoglobin module <2024_vivarium_mncnh_portfolio_hemoglobin_module>`
    - Affects birth outcome, birthweight, and gestational age
    - Will need to perform baseline calibration
  * - IV iron coverage
    - :ref:`Hemoglobin module <2024_vivarium_mncnh_portfolio_hemoglobin_module>`
    - Affects birth outcome, birthweight, and gestational age
    - 


.. list-table:: Module outputs
  :header-rows: 1

  * - Output
    - Value
    - Note
  * - A. Maternal age
    - point value in years
    - 
  * - B. Pregnancy term length
    - *partial* / *full*
    - 
  * - C. Birth outcome
    - *other* / *live_birth* / *stillbirth*
    - "Other" is equivalent to partial term pregnancies
  * - D. Sex of infant
    - *male* / *female*
    - 
  * - E. Gestational age
    - point value in days
    - N/A for partial term pregnancies. Assigned based on LBWSG
      category, which is correlated with other model variables as
      described in the :ref:`correlated propensities section
      <facility_choice_correlated_propensities_section>` of the facility
      choice model documentation.
  * - F. Birthweight
    - point value in grams
    - N/A for partial term pregnancies. Assigned based on LBWSG
      category, which is correlated with other model variables as
      described in the :ref:`correlated propensities section
      <facility_choice_correlated_propensities_section>` of the facility
      choice model documentation.
  * - G. Pregnancy duration
    - point value in weeks
    - Equal to gestational age for full term pregnancies
  * - H. Preterm status
    - *preterm* / *term*
    - Equals *preterm* if pregnancy duration is < 37 weeks, *term* if
      pregnancy duration is 37+ weeks. Preterm status will be used for
      validation of the :ref:`facility choice model
      <2024_facility_model_vivarium_mncnh_portfolio>`.

Starting in wave II of the simulation, there will be variables that influence pregnancy module outputs. These variables are listed below.

.. list-table:: Variables that affect pregnancy module outputs
  :header-rows: 1

  * - Variable
    - Affected outcome
    - Instructions for effect
    - Note
  * - IFA/MMS coverage (output from hemoglobin module)
    - * Birth outcome
      * Gestational age
      * Birthweight
    - See the :ref:`oral iron supplementation intervention document <oral_iron_antenatal>`
    - NOTE: as of 4/9/2025 this intervention model document is not updated and ready for implementation
  * - IV iron coverage
    - * Birth outcome
      * Gestational age
      * Birthweight
    - See the :ref:`IV iron intervention document <intervention_iv_iron_antenatal_mncnh>`
    - 
