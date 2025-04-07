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

There is no diagram necessary for the pregnancy module. Instead, all instructions are detailed on the :ref:`MNCNH portfolio pregnancy model document <other_models_pregnancy_closed_cohort_mncnh>`. This document also contains a list of model assumptions and limitations as well as verification and validation criteria.

Module outputs are summarized in the table below. 

.. list-table:: Module outputs
  :header-rows: 1

  * - Output
    - Value
    - Note
  * - A. Maternal age
    - point value in years
    - 
  * - B. Pregnancy term duration
    - *partial* / *full*
    - 
  * - C. Birth outcome
    - *other* / *live_birth* / *stillbirth*
    - "Other" is equivalent to partial term pregnancies
  * - D. Child sex
    - *male* / *female*
    - 
  * - E. Gestational age
    - point value in days
    - N/A for partial term pregnancies
  * - F. Birthweight
    - point value in grams
    - N/A for partial term pregnancies
  * - G. Pregnancy duration
    - point value in weeks
    - Equal to gestational age for full term pregnancies



