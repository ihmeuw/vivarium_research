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
  * - YLD
    - Years Lived with Disability
    -
  * - YLL
    - Years of Life Lost
    -

Disease Overview
++++++++++++++++

GBD 2021 Modeling Strategy
++++++++++++++++++++++++++

Restrictions
------------

The following table describes any restrictions in GBD 2021 on the
effects of this cause (such as being only fatal or only nonfatal), as
well as restrictions on the ages and sexes to which the cause applies.

.. list-table:: GBD 2021 Cause Restrictions
  :widths: 15 15 20
  :header-rows: 1

  * - Restriction Type
    - Value
    - Notes
  * - Male only
    - False
    -
  * - Female only
    - False
    -
  * - YLL only
    - False
    -
  * - YLD only
    - False
    -
  * - YLL age group start
    - 40 to 44
    - age_group_id = 13
  * - YLL age group end
    - 95 plus
    - age_group_id = 235
  * - YLD age group start
    - 40 to 44
    - age_group_id = 13
  * - YLD age group end
    - 95 plus
    - age_group_id = 235

Vivarium Modeling Strategy
++++++++++++++++++++++++++

For :ref:`Model 1 <2025_alzheimers_model_runs_table>` of the
:ref:`Alzheimer's simulation <2025_concept_model_vivarium_alzheimers>`,
we will model Alzheimer's disease as a simple SI model using GBD data
for the cause "Alzheimer's disease and other dementias" (cause ID 543).

Cause Model Diagram
-------------------

.. graphviz::

  digraph AlzheimersDisease {
    rankdir=LR;
    S -> AD [label=i_AD]

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
  * - i_AD
    - Alzheimer's Incidence
    - Incidence rate of Alzheimer's disease and other dementias
      (incident cases per susceptible person-year)

Data Tables
-----------

All data values are defined for a specified year, location, age group,
and sex.

.. list-table:: Data Sources
  :widths: 20 30 25 25
  :header-rows: 1

  * - Variable
    - Definition
    - Source or value
    - Notes
  * - prevalence_c543
    - Prevalence of Alzheimer's disease and other dementias
    - como
    -
  * - deaths_c543
    - Deaths from Alzheimer's disease and other dementias
    - codcorrect
    -
  * - population
    - Average population during specified year
    - loaded from `population_agg.nc` file provided by FHS Team
    - Numerically equal to person-years. Often interpreted as population
      at year's midpoint (which is approximately equal to person-years
      if we think the midpoint rule with a single rectangle gives a good
      estimate of the area under the population curve).
  * - incidence_rate_c543
    - GBD's "total population incidence rate" for Alzheimer's disease
      and other dementias
    - como
    - Raw GBD value, different from "susceptible incidence rate"
      automatically calculated by Vivarium Inputs
  * - csmr_c543
    - Cause-specific mortality rate for Alzheimer's disease and other
      dementias
    - :math:`\frac{\text{deaths_c543}}{(\text{population}) \cdot (\text{1 year})}`
    - Calculated automatically by Vivarium Inputs
  * - emr_c543
    - Excess mortality rate for Alzheimer's disease and other dementias
    - :math:`\frac{\text{csmr_c543}}{\text{prevalence_c543}}`
    - Calculated automatically by Vivarium Inputs
  * - sequelae_c543
    - Sequelae of Alzheimer's disease and other dementias
    - Set of 3 sequelae: s452, s453, s454
    - Obtained from gbd_mapping.
      Sequela names are "Mild," "Moderate," or "Severe Alzheimer's
      disease and other dementias," respectively.
  * - :math:`\text{disability_weight}_s`
    - Disability weight of sequela :math:`s`
    - YLD Appendix
    - For reference, the values are:

      - s452: 0.069 (0.046-0.099)
      - s453: 0.377 (0.252-0.508)
      - s454: 0.449 (0.304-0.595)
  * - :math:`\text{prevalence}_s`
    - Prevalence of sequela :math:`s`
    - como
    -

The following two tables describe the data needed for the cause model
drawn in the previous section in terms of the data values in the above
table.

.. list-table:: State Data
  :widths: 20 25 30 30
  :header-rows: 1

  * - State
    - Measure
    - Value
    - Notes
  * - S
    - prevalence
    - * 1 - prevalence_c543 (if modeling entire population including
        susceptible simulants), or
      * 0 (if modeling only simulants with AD as described in the
        :ref:`Alzheimer's population model
        <other_models_alzheimers_population>`)
    - Used for initial population at start of simulation
  * - S
    - birth prevalence
    - 1
    - Used for simulants born into the simulation
  * - S
    - excess mortality rate
    - 0
    - Added onto mortality hazard for susceptible simulants
  * - S
    - disability weight
    - 0
    - Used to calculate YLDs
  * - AD
    - prevalence
    - * prevalence_c543 (if modeling entire population including
        susceptible simulants), or
      * 1 (if modeling only simulants with AD as described in the
        :ref:`Alzheimer's population model
        <other_models_alzheimers_population>`)
    - Used for initial population at start of simulation
  * - AD
    - birth prevalence
    - 0
    - Used for simulants born into the simulation
  * - AD
    - excess mortality rate
    - emr_c543
    - Added onto mortality hazard for simulants with AD
  * - AD
    - disability weight
    - :math:`\sum_\limits{s\in \text{sequelae_c543}}
      \text{disability_weight}_s \cdot \text{prevalence}_s`
    - Prevalence-weighted average disability weight over sequelae,
      computed automatically by Vivarium Inputs. Used to calculate
      YLDs.
  * - ALL
    - cause specific mortality rate
    - csmr_c543
    - Subtracted from all-cause mortality hazard to get cause-deleted
      mortality hazard in all cause states

.. list-table:: Transition Data
  :widths: 10 10 10 20 30
  :header-rows: 1

  * - Transition
    - Source State
    - Sink State
    - Value
    - Notes
  * - i_AD
    - S
    - AD
    - :math:`\frac{\text{incidence_rate_c543}}{\text{1 - prevalence_c543}}`
    - Compute susceptible population incidence rate from GBD's "total
      population incidence rate." Conversion is automatic when using
      the get_measure function in Vivarium Inputs.
