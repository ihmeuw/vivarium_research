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
    - Incidence rate of Alzheimer's disease and other dementias
      (incident cases per susceptible person-year)

Data Tables
-----------

All data values are defined for a specified year, age group, sex and
location.

.. list-table:: Data Sources
  :widths: 20 25 25 25
  :header-rows: 1

  * - Variable
    - Source or value
    - Definition
    - Notes
  * - prevalence_c543
    - como
    - Prevalence of Alzheimer's disease and other dementias
    -
  * - deaths_c543
    - codcorrect
    - Deaths from Alzheimer's disease and other dementias
    -
  * - population
    - get_population
    - Average population during specified year
    -
  * - incidence_rate_c543
    - como
    - GBD's "total population" incidence rate for Alzheimer's disease
      and other dementias
    -
  * - csmr_c543
    - :math:`\frac{\text{deaths_c543}}{\text{population}}`
    - Cause-specific mortality rate for Alzheimer's disease and other
      dementias
    -

.. list-table:: State Data
  :widths: 20 25 30 30
  :header-rows: 1

  * - State
    - Measure
    - Value
    - Notes
  * - S
    - prevalence
    - 1 - prevalence_c543
    - Used for initial population at start of simulation
  * - S
    - birth prevalence
    - 1
    - Used for simulants born into the simulation
  * - S
    - excess mortality rate
    - 0
    -
  * - S
    - disability weight
    - 0
    -
  * - AD
    - prevalence
    - prevalence_c543
    - Used for initial population at start of simulation
  * - AD
    - birth prevalence
    - 0
    - Used for simulants born into the simulation
  * - AD
    - excess mortality rate
    - :math:`\frac{\text{deaths_c543}}{\text{population} \times \text{prevalence_c543}}`
    - = (cause-specific mortality rate) / prevalence
  * - AD
    - disability weight
    - 0.2
    - This is a made-up disability weight -- don't bother computing the
      average of the real disability weights because we will be modeling
      the sequelae separately in a future model version
  * - ALL
    - cause specific mortality rate
    - :math:`\frac{\text{deaths_c543}}{\text{population}}`
    -

.. list-table:: Transition Data
  :widths: 10 10 10 20 30
  :header-rows: 1

  * - Transition
    - Source State
    - Sink State
    - Value
    - Notes
  * - i_alz
    - S
    - AD
    - :math:`\frac{\text{incidence_rate_c543}}{\text{1 - prevalence_c543}}`
    - Compute susceptible population incidence rate from GBD's "total
      population incidence rate." Conversion is automatic when using
      load_standard_data function in Vivarium Public Health package.
