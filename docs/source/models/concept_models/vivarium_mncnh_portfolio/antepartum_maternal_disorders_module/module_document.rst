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

.. _2024_vivarium_mncnh_portfolio_antepartum_maternal_disorders_module:

======================================
Antepartum maternal disorders module
======================================

.. contents::
  :local:
  :depth: 2

1.0 Overview
++++++++++++

This module represents
the :ref:`abortion/miscarriage/ectopic pregnancy maternal disorders model <2021_cause_abortion_miscarriage_ectopic_pregnancy_causes_mncnh>`
which is applied during the pregnancy component.

2.0 Module Diagram and Data
+++++++++++++++++++++++++++++++

All instructions are detailed on
the :ref:`Abortion/miscarriage/ectopic pregnancy maternal disorders model document <2021_cause_abortion_miscarriage_ectopic_pregnancy_causes_mncnh>`.
This document also contains a list of model assumptions and limitations as well as verification and validation criteria.

**Abortion/miscarriage/ectopic pregnancy maternal disorders should only be applied to pregnancies that end in abortion/miscarriage/ectopic pregnancy.**

The inputs and outputs for this module are summarized in the tables below.

.. list-table:: Module required inputs
  :header-rows: 1

  * - Input
    - Source module
    - Application
    - Note
  * - Broad pregnancy outcome
    - :ref:`Initial attributes module <2024_vivarium_mncnh_portfolio_initial_attributes_module>`
    - Used to apply abortion/miscarriage/ectopic pregnancy maternal disorders only to pregnancies that do end in abortion/miscarriage/ectopic pregnancy
    -
  * - Maternal age at end of pregnancy
    - :ref:`Initial attributes module <2024_vivarium_mncnh_portfolio_initial_attributes_module>`
    - Used for age-specific risk of abortion/miscarriage/ectopic pregnancy maternal disorders
    - 

.. list-table:: Module outputs
  :header-rows: 1

  * - Output
    - Value
    - Note
  * - Abortion/miscarriage/ectopic pregnancy maternal disorders YLDs
    - Non-negative real number
    - 
  * - Abortion/miscarriage/ectopic pregnancy maternal disorders death
    - Binary (yes/no)
    -
  * - Abortion/miscarriage/ectopic pregnancy maternal disorders YLLs
    - Non-negative real number
    -

