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

.. _2024_vivarium_mncnh_portfolio_antepartum_hemorrhage_module:

======================================
Antepartum hemorrhage module
======================================

.. contents::
  :local:
  :depth: 2

1.0 Overview
++++++++++++

This module represents the portion of the GBD "maternal hemorrhage" cause *not*
captured by the :ref:`postpartum hemorrhage cause model <2023_cause_postpartum_hemorrhage_mncnh>`.
It is part of the pregnancy component, applying to all pregnant simulants (not only those who have a still or livebirth).

2.0 Module Diagram and Data
+++++++++++++++++++++++++++++++

All instructions are detailed on the :ref:`MNCNH portfolio antepartum hemorrhage model document <2023_cause_antepartum_hemorrhage_mncnh>`
and :ref:`Hemoglobin risk effects model document <2023_hemoglobin_effects>`.
These documents also contain a list of model assumptions and limitations as well as verification and validation criteria.

The inputs and outputs for this module are summarized in the tables below.

.. list-table:: Module required inputs
  :header-rows: 1

  * - Input
    - Source module
    - Application
    - Note
  * - Maternal age at end of pregnancy
    - :ref:`Initial attributes module <2024_vivarium_mncnh_portfolio_initial_attributes_module>`
    - Used for age-specific risk of antepartum hemorrhage
    - 
  * - Hemoglobin after later ANC visit
    - :ref:`Hemoglobin after later ANC visit module <2024_vivarium_mncnh_portfolio_hemoglobin_module>`
    - Used for hemoglobin effects on antepartum hemorrhage risk
    - 

.. list-table:: Module outputs
  :header-rows: 1

  * - Output
    - Value
    - Note
  * - Antepartum hemorrhage incidence
    - Binary (yes/no)
    - 
  * - Antepartum hemorrhage death
    - Binary (yes/no)
    - 

