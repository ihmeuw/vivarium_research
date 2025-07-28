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

.. _2021_cause_alzheimers_disease:

==============================
Alzheimer's Disease (GBD 2021)
==============================

.. contents::
  :local:

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - AD
    - Alzheimer's Disease
    -

Disease Overview
++++++++++++++++

GBD 2021 Modeling Strategy
++++++++++++++++++++++++++

Vivarium Modeling Strategy
++++++++++++++++++++++++++

For Model 1 of the Alzheimer's simulation, we will model Alzheimer's
disease as a simple SI model using GBD data for the cause "Alzheimer's
disease and other dementias" (cause ID 543).

Cause Model Diagram
-------------------

.. graphviz::

  digraph AlzheimersDisease {
    rankdir=LR;
    S -> AD [label=i_alz]

  }

.. list-table:: State Definitions
  :widths: 5 5 20
  :header-rows: 1

  * - State
    - State Name
    - Definition
  * - S
    - Susceptible
    - Simulant does not have Alzheimer's disease or another dementia
  * - AD
    - Alzheimer's Disease
    - Simulant has Alzheimer's disease or another dementia

.. list-table:: Transition Definitions
  :widths: 5 5 20
  :header-rows: 1

  * - Transition
    - Transition Name
    - Definition
  * - i_alz
    - Alzheimer's Incidence
    - Incidence rate of Alzheimer's disease and other dementias (incident cases per
      susceptible person-year)
