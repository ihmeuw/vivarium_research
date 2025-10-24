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

This module determines basic pregnancy outcome information such as pregnancy duration, child sex, etc.

2.0 Module Diagram and Data
+++++++++++++++++++++++++++++++

2.1 Module Diagram
----------------------

.. If you are editing the following diagram,
  you probably want to edit the one on the pregnancy *model* page as well (other_models_pregnancy_closed_cohort_mncnh)

.. graphviz::

  digraph pregnancy {
    bgcolor="transparent";
    node [shape=box];

    start;
    choice [label="Pregnancy results in either a live birth or a stillbirth?"];
    birth_outcome [label=< <B>Assign birth outcome<br/>(live birth vs stillbirth)</B> >];
    gestational_age [label=< <B>Assign gestational age at end of pregnancy</B> >];
    sex [label=< <B>Assign sex of infant</B> >];
    lbwsg [label=< <B>Assign birthweight and gestational age at end of pregnancy</B> >];
    preterm [label=< <B>Assign preterm status</B> >]
    pregnancy_outcome [label=< <B>Assign pregnancy outcome<br/>(live birth vs stillbirth vs abortion/miscarriage/ectopic)</B> >]
    end;

    start -> choice;
    choice -> birth_outcome [label="Yes"];
    choice -> gestational_age [label="No"];
    gestational_age -> preterm;
    birth_outcome -> sex;
    sex -> lbwsg;
    lbwsg -> preterm;
    preterm -> pregnancy_outcome;
    pregnancy_outcome -> end;
  }

All instructions are detailed on the :ref:`MNCNH portfolio pregnancy model document <other_models_pregnancy_closed_cohort_mncnh>`. This document also 
contains a list of model assumptions and limitations as well as verification and validation criteria.

The inputs and outputs for this module are summarized in the tables below. 

.. list-table:: Module required inputs
  :header-rows: 1

  * - Input
    - Source module
    - Application
    - Note
  * - Broad pregnancy outcome
    - :ref:`Initial attributes module <2024_vivarium_mncnh_portfolio_initial_attributes_module>`
    - Affects pregnancy outcome (which is just a refinement of this input), gestational age
    -
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
  * - Pregnancy outcome
    - "live_birth", "stillbirth", or "abortion/miscarriage/ectopic"
    -
  * - Gestational age at end of pregnancy
    - point value in weeks
    - For live birth and stillbirth pregnancies, this is assigned based on LBWSG
      category, which is correlated with other model variables as
      described in the :ref:`correlated propensities section
      <facility_choice_correlated_propensities_section>` of the facility
      choice model documentation.
  * - Preterm status
    - "preterm" or "term"
    - Equals "preterm" if gestational age at end of pregnancy is < 37 weeks, "term" if
      gestational age at end of pregnancy is 37+ weeks. Preterm status will be used for
      validation of the :ref:`facility choice model
      <2024_facility_model_vivarium_mncnh_portfolio>`.
  * - Sex of infant
    - "male" or "female"
    - N/A for pregnancies resulting in abortion/miscarriage/ectopic pregnancy
  * - Birthweight
    - point value in grams
    - N/A for pregnancies resulting in abortion/miscarriage/ectopic pregnancy. Assigned based on LBWSG
      category, which is correlated with other model variables as
      described in the :ref:`correlated propensities section
      <facility_choice_correlated_propensities_section>` of the facility
      choice model documentation.
