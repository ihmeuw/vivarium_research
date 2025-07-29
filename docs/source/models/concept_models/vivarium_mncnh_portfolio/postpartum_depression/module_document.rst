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

.. _2024_vivarium_mncnh_portfolio_ppd_module:

======================================
Postpartum depression module
======================================

.. contents::
  :local:
  :depth: 2

1.0 Overview
++++++++++++

This module will enact the postpartum depression cause model, which is an affected outcome of the hemoglobin risk factor. Notably, only simulants who survive to the postpratum period (did not die of a maternal disorder) are eligible for postpartum depression.

2.0 Module Diagram and Data
+++++++++++++++++++++++++++++++

This module contains the following cause models:

- :ref:`Postpartum depression cause model document <2021_cause_postpartum_depression_mncnh>`

The incidence of postpartum depression is affected by hemoglobin exposure at birth.
  - Hemoglobin exposure at birth is informed by the :ref:`Hemoglobin module <2024_vivarium_mncnh_portfolio_hemoglobin_module>`
  - Hemoglobin risk effect on postpartum depression is informed by the :ref:`hemoglobin risk effects document <2023_hemoglobin_effects>`

3.0 Assumptions and limitations
++++++++++++++++++++++++++++++++

- We use hemoglobin exposure at birth to assess the risk of postpartum depression rather than postpartum hemoglobin. While postpartum hemoglobin is likely the more relevant exposure measure, we use hemoglobin exposure at birth the hemoglobin risk effects were assessed using exposures measured during pregnancy rather than in the postpartum period.

4.0 Verification and Validation Criteria
+++++++++++++++++++++++++++++++++++++++++

See V&V criteria on the following pages:
- :ref:`Postpartum depression cause model document <2021_cause_postpartum_depression_mncnh>`
- :ref:`hemoglobin risk effects document <2023_hemoglobin_effects>`

5.0 References
+++++++++++++++

