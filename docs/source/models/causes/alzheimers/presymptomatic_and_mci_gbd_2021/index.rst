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

.. _2021_cause_alzheimers_presymptomatic_mci:

==================================================================
Alzheimer's disease  with presymptomatic and MCI stages (GBD 2021)
==================================================================

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
and sexes to which the cause applies. We also list the implied age
restriction on YLDs for the MCI-AD state of the cause model below.

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
    - * 40 to 44 for AD cause state
      * 30 to 34 for MCI-AD cause state
    - * Restriction to age_group_id = 13 (40 to 44) for AD cause state
        is from GBD
      * Restriction to age_group_id = 11 (30 to 34) for MCI-AD cause
        state is because we will be adding simulants at most 7 years
        before AD incidence (so 40 - 7 = 33, in the 30-34 age group)
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
    bbbm_presymptomatic [label="BBBM-Presymptomatic"]
    mci [label="MCI-AD"]
    S -> bbbm_presymptomatic [label="i_BBBM"]
    bbbm_presymptomatic -> mci [label="i_MCI"]
    mci -> AD [label=i_AD]
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
  * - BBBM-Presymptomatic
    - Blood-Based-Biomarker-Presymptomatic
    - Simulant has presymptomatic Alzheimer's disease that is detectable
      using blood-based biomarkers
  * - MCI-AD
    - Mild Cognitive Impairment due to Alzheimer's Disease
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
    - Incidence hazard of BBBM-Presymptomatic AD
    - This will be equal to GBD's incidence rate of Alzheimer's disease
      and other dementias
  * - i_MCI
    - MCI incidence hazard
    - Incidence hazard of MCI due to AD
    - This will be a **time-dependent hazard rate**, depending on how
      long a simulant has been in the BBBM-Presymptomatic state, not a
      constant hazard like we usually use
  * - i_AD
    - Alzheimer's incidence hazard
    - Incidence hazard of Alzheimer's disease
    - We will define this as a constant hazard rate for simulants in
      MCI-AD

Data Tables
-----------

All data values are defined for a specified year, location, age group,
and sex.

The ``population_agg.nc`` file from the Future Health Scenarios (FHS)
team is located in the following folder:

``/mnt/share/forecasting/data/9/future/population/
20240320_daly_capstone_resubmission_squeeze_soft_round_shifted_hiv_shocks_covid_all_who_reagg/``

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
    - * get_population (if using standard GBD data), or
      * loaded from ``population_agg.nc`` file provided by FHS Team (if
        using forecasted data)
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
    - * 1 - prevalence_all_AD_stages (if
        modeling entire population including susceptible simulants), or
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
  * - BBBM-Presymptomatic
    - prevalence
    - * prevalence_BBBM (if modeling entire population including
        susceptible simulants), or
      * prevalence_BBBM / prevalence_all_AD_stages (if modeling only
        simulants with AD or pre-dementia AD as described in the
        :ref:`Alzheimer's population model
        <other_models_alzheimers_population>`)
    - Used for initial population at start of simulation
  * - BBBM-Presymptomatic
    - birth prevalence
    - 0
    - Used for simulants born into the simulation
  * - BBBM-Presymptomatic
    - excess mortality rate
    - 0
    - Added onto mortality hazard for BBBM-Presymptomatic simulants
  * - BBBM-Presymptomatic
    - disability weight
    - 0
    - Used to calculate YLDs
  * - MCI-AD
    - prevalence
    - * prevalence_MCI (if modeling entire population including
        susceptible simulants), or
      * prevalence_MCI / prevalence_all_AD_stages (if modeling only
        simulants with AD or pre-dementia AD as described in the
        :ref:`Alzheimer's population model
        <other_models_alzheimers_population>`)
    - Used for initial population at start of simulation
  * - MCI-AD
    - birth prevalence
    - 0
    - Used for simulants born into the simulation
  * - MCI-AD
    - excess mortality rate
    - 0
    - Added onto mortality hazard for simulants with MCI-AD
  * - MCI-AD
    - disability weight
    - disability_weight_MCI
    - Custom disability weight (see data sources table above). Used to
      calculate YLDs.
  * - AD
    - prevalence
    - * prevalence_c543 (if modeling entire population including
        susceptible simulants), or
      * prevalence_c543 / prevalence_all_AD_stages (if modeling only
        simulants with AD or pre-dementia AD as described in the
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
  * - i_BBBM
    - S
    - BBBM-Presymptomatic
    -
    -
  * - i_MCI
    - BBBM-Presymptomatic
    - MCI-AD
    -
    -
  * - i_AD
    - MCI-AD
    - AD
    - :math:`\frac{\text{incidence_rate_c543}}{\text{1 - prevalence_c543}}`
    - Compute susceptible population incidence rate from GBD's "total
      population incidence rate." Conversion is automatic when using
      the get_measure function in Vivarium Inputs.
