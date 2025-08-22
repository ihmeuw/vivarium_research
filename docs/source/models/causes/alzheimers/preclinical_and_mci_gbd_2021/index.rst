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

.. _2021_cause_alzheimers_preclinical_mci:

===============================================================
Alzheimer's disease  with preclinical and MCI stages (GBD 2021)
===============================================================

.. contents::
  :local:

.. list-table:: Abbreviations
  :header-rows: 1

  * - Abbreviation
    - Definition
  * - AD
    - Alzheimer's Disease
  * - BBBM
    - Blood-Based Biomarker
  * - CSU
    - Client Services Unit
  * - MCI
    - Mild Cognitive Impairment
  * - YLD
    - Years Lived with Disability
  * - YLL
    - Years of Life Lost

Disease Overview
++++++++++++++++

GBD 2021 Modeling Strategy
++++++++++++++++++++++++++

Restrictions
------------

The following table describes any restrictions in GBD 2021 on the
effects of the cause "Alzheimer's disease and other dementias" (such as
being only fatal or only nonfatal), as well as restrictions on the ages
and sexes to which the cause applies.

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

For :ref:`Model 4 <2025_alzheimers_model_runs_table>` of the :ref:`CSU
Alzheimer's simulation <2025_concept_model_vivarium_alzheimers>`, we
will add two pre-dementia states to the Alzheimer's disease model. The
model still functions similar to an SI model, but now there are multiple
with-condition states, with unidirectional progression between them.

Conceptually, this cause model only includes Alzheimer's disease and its
precursors, not other types of dementia. However, for now we are still
using the total incidence and prevalence for GBD's "Alzheimer's disease
and other dementias" (cause ID 543), so our numbers will be inflated by
the "other dementias" part. In a future model version we will remove the
"other dementias" portion  to correct this issue.

Cause Model Diagram
-------------------

.. graphviz::

  digraph AlzheimersDisease {
    rankdir=LR;
    bbbm_preclinical [label="BBBM-Preclinical"]
    S -> bbbm_preclinical [label="i_BBBM"]
    bbbm_preclinical -> MCI [label="i_MCI"]
    MCI -> AD [label=i_AD]
  }

.. list-table:: State Definitions
  :widths: 5 5 20
  :header-rows: 1

  * - State
    - State Name
    - Definition
  * - S
    - Susceptible
    - Simulant does not have Alzheimer's disease or any of its
      precursors
  * - BBBM-Preclinical
    - Blood-Based-Biomarker-Preclinical
    - Simulant has preclinical Alzheimer's disease that is detectable
      using blood-based biomarkers
  * - MCI
    - Mild Cognitive Impiarment
    - Simulant has mild cognitive impairment due to Alzheimer's disease
  * - AD
    - Alzheimer's Disease
    - Simulant has mild, moderate, or severe dementia due to Alzheimer's
      disease

.. list-table:: Transition Definitions
  :widths: 5 5 10 10
  :header-rows: 1

  * - Transition
    - Transition Name
    - Definition
    - Notes
  * - i_BBBM
    - BBBM incidence hazard
    - Incidence hazard of BBBM-Preclinical AD
    - This will be equal to GBD's incidence rate of Alzheimer's disease
      and other dementias
  * - i_MCI
    - MCI incidence hazard
    - Incidence hazard of MCI due to AD
    - This will be a **time-dependent hazard rate**, depending on how
      long a simulant has been in the BBBM-Preclinical state, not a
      constant hazard like we usually use
  * - i_AD
    - Alzheimer's incidence hazard
    - Incidence hazard of Alzheimer's disease
    - We will define this as a constant hazard rate for simulants in MCI
