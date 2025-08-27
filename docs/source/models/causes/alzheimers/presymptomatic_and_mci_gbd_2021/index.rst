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
  * - FHS
    - Future Health Scenarios
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
    bbbm [label="BBBM-AD"]
    mci [label="MCI-AD"]
    ad [label="AD-dementia"]
    S -> bbbm [label="i_BBBM"]
    bbbm -> mci [label="i_MCI"]
    mci -> ad [label=i_AD]
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
  * - BBBM-AD
    - Blood-Based-Biomarker-presymptomatic Alzheimer's Disease
    - Simulant has presymptomatic Alzheimer's disease that is detectable
      using blood-based biomarkers
  * - MCI-AD
    - Mild Cognitive Impairment due to Alzheimer's Disease
    - Simulant has mild cognitive impairment due to Alzheimer's disease
  * - AD-dementia
    - Alzheimer's Disease dementia
    - Simulant has mild, moderate, or severe dementia due to Alzheimer's
      disease
  * - Death (not pictured)
    - Death
    - Simulant has died

.. list-table:: Transition Definitions
  :widths: 5 5 10 10
  :header-rows: 1

  * - Transition
    - Transition Name
    - Definition
    - Notes
  * - i_BBBM
    - BBBM incidence hazard
    - Incidence hazard of BBBM-AD
    - This will be equal to GBD's incidence rate of Alzheimer's disease
      and other dementias
  * - i_MCI
    - MCI incidence hazard
    - Incidence hazard of MCI due to AD
    - This will be a **time-dependent hazard rate**, depending on how
      long a simulant has been in the BBBM-Presymptomatic state, not a
      constant hazard like we usually use
  * - i_AD
    - AD dementia incidence hazard
    - Incidence hazard of Alzheimer's disease dementia
    - We will define this as a constant hazard rate for simulants in
      MCI-AD
  * - m_X (not pictured)
    - Mortality hazard in state X
    - Total mortality hazard for simulants in cause state X
    - X is a variable representing an arbitrary cause state

State and Transition Data
-------------------------

The tables in this section describe the data needed for the cause model
drawn in the `Cause Model Diagram`_ section above. The variables in the
tables are defined in the the `Data Values and Sources`_ section below.

The following table describes the data for each state if modeling only simulants
with AD or pre-dementia AD as described in the :ref:`Alzheimer's
population model <other_models_alzheimers_population>`:

.. list-table:: State data when modeling only simulants with AD or pre-dementia AD
  :header-rows: 1

  * - State
    - Initial prevalence
    - Entrance prevalence
    - Excess mortality rate
    - Disability weight
  * - S
    - 0
    - 0
    - 0
    - 0
  * - BBBM-AD
    - :math:`\Delta_\text{BBBM} / \Delta_\text{(all AD states)}`
    - 1
    - 0
    - 0
  * - MCI-AD
    - :math:`\Delta_\text{MCI} / \Delta_\text{(all AD states)}`
    - 0
    - 0
    - :math:`\text{DW}_\text{MCI}`
  * - AD-dementia
    - :math:`\Delta_\text{AD} / \Delta_\text{(all AD states)}`
    - 0
    - emr_c543
    - :math:`\text{DW}_\text{c543}`

..
  On the other hand, if we model the entire population including
  susceptible simulants, the following state data should be used:

  .. list-table:: State Data if modeling entire population including susceptible simulants
    :header-rows: 1

    * - State
      - Initial prevalence
      - Birth prevalence
      - Excess mortality rate
      - Disability weight
    * - S
      - :math:`1 - \left( \frac{\Delta_\text{BBBM}}{\Delta_\text{AD}}
        + \frac{\Delta_\text{MCI}}{\Delta_\text{AD}} + 1\right)
        \cdot \text{prevalence_c543}`
      - 1
      - 0
      - 0
    * - BBBM-AD
      - :math:`\frac{\Delta_\text{BBBM}}{\Delta_\text{AD}} \cdot \text{prevalence_c543}`
      - 0
      - 0
      - 0
    * - MCI-AD
      - :math:`\frac{\Delta_\text{MCI}}{\Delta_\text{AD}} \cdot \text{prevalence_c543}`
      - 0
      - 0
      - :math:`\text{DW}_\text{MCI}`
    * - AD-dementia
      - :math:`\text{prevalence_c543}`
      - 0
      - emr_c543
      - :math:`\text{DW}_\text{c543}`

  We will not need this table for Model 4, but we may want to try
  running the model with the full population at some point.

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
    - BBBM-AD
    - Not explicitly used because we're not modeling susceptible
      simulants
    -
  * - i_MCI
    - BBBM-AD
    - MCI-AD
    - :math:`h_\text{MCI}(t - T_\text{BBBM})`, where :math:`t` is the
      current time in the simulation, and :math:`T_\text{BBBM}` is the
      time the simulant entered the BBBM-AD state
    -
  * - i_AD
    - MCI-AD
    - AD
    - :math:`1 / \Delta_\text{MCI}`
    -
  * - m_X
    - X
    - Death
    - acmr --- csmr_c543 + emr_X
    - Computed by mortality component. X is a variable representing an
      arbitrary cause state.


Data Values and Sources
-----------------------

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
  * - population
    - Average population during specified year
    - loaded from ``population_agg.nc`` file provided by FHS Team
    - Numerically equal to person-years. Often interpreted as population
      at year's midpoint (which is approximately equal to person-years
      if we think the midpoint rule with a single rectangle gives a good
      estimate of the area under the population curve).
  * - deaths_c543
    - Deaths from Alzheimer's disease and other dementias
    - codcorrect
    -
  * - prevalence_c543
    - Prevalence of Alzheimer's disease and other dementias
    - como
    -
  * - incidence_rate_c543
    - GBD's "total population incidence rate" for Alzheimer's disease
      and other dementias
    - como
    - Raw GBD value, different from "susceptible incidence rate"
      automatically calculated by Vivarium Inputs
  * - acmr
    - All-cause mortality rate
    - loaded from ``_all.nc`` file provided by FHS Team
    -
  * - csmr_c543
    - Cause-specific mortality rate for Alzheimer's disease and other
      dementias
    - :math:`\frac{\text{deaths_c543}}{(\text{population}) \cdot (\text{1 year})}`
    - Calculated automatically by Vivarium Inputs
  * - emr_c543
    - Excess mortality rate for Alzheimer's disease and other dementias
    - :math:`\frac{\text{csmr_c543}}{\text{prevalence_c543}}`
    - Calculated automatically by Vivarium Inputs
  * - emr_X
    - Excess mortality rate in cause state X
    - Values listed in state data table above
    -
  * - m_X
    - Mortality hazard in cause state X
    - acmr --- csmr_c543 + emr_X
    -
  * - sequelae_c543
    - Sequelae of Alzheimer's disease and other dementias
    - Set of 3 sequelae: s452, s453, s454
    - Obtained from gbd_mapping.
      Sequela names are "Mild," "Moderate," or "Severe Alzheimer's
      disease and other dementias," respectively.
  * - :math:`\text{prevalence}_s`
    - Prevalence of sequela :math:`s`
    - como
    -
  * - :math:`\text{DW}_s`
    - Disability weight of sequela :math:`s`
    - YLD Appendix
    - For reference, the values are:

      - s452: 0.069 (0.046-0.099)
      - s453: 0.377 (0.252-0.508)
      - s454: 0.449 (0.304-0.595)
  * - :math:`\text{DW}_\text{c543}`
    - Average disability weight of AD-dementia
    - :math:`\sum_\limits{s\in \text{sequelae_c543}}
      \text{DW}_s \cdot \text{prevalence}_s`
    - Prevalence-weighted average disability weight over sequelae,
      computed automatically by Vivarium Inputs. Used to calculate
      YLDs.
  * - :math:`\text{DW}_\text{MCI}`
    - Disability weight of mild cognitive impairment
    - ?
    -
  * - :math:`T_X`
    - The time at which the simulant enters the cause state :math:`X`
    - Random variable for each simulant
    -
  * - :math:`D_\text{BBBM}`
    - Dwell time in cause state BBBM-AD
    - :math:`T_\text{MCI} - T_\text{BBBM}`
    - Random variable for each simulant, constructed implicitly through
      simulation dynamics to have a `gamma distribution`_ with shape
      parameter :math:`\alpha` and rate parameter :math:`\lambda`
  * - :math:`\alpha`, :math:`\lambda`
    - Shape and rate parameters, respectively, of gamma distribution for
      :math:`D_\text{BBBM}`
    - * :math:`\alpha = 468.75`
      * :math:`\lambda = 125`
    - Chosen so that :math:`P(3.5 < D_\text{BBBM} < 4) \approx 0.9`
      because client said, "The BBBM+ state lasts about 3.5--4 years
      before transitioning to MCI."
  * - gamma_dist
    - Python object representing the gamma distribution for
      :math:`D_\text{BBBM}`
    - scipy.stats.gamma(𝛼, scale=1/λ)
    - An instance of `SciPy's gamma distribution class`_
  * - :math:`h_\text{MCI}(t)`
    - Hazard function for transitioning into the MCI-AD state from BBBM-AD
    - gamma_dist.pdf(t) / gamma_dist.sf(t)
    - Equal to :math:`\frac{t^{\alpha-1}e^{-\lambda t}}{\int_t^\infty
      u^{\alpha-1} e^{-\lambda u}\, du}`, but can be computed more
      easily as the ratio of the probability density function to the
      survival function, using the methods of `SciPy's gamma
      distribution class`_
  * - :math:`\Delta_\text{BBBM}`
    - Average duration of BBBM-presymptomatic AD
    - :math:`\alpha / \lambda`
    - Mean of gamma distribution for :math:`D_\text{BBBM}`
  * - :math:`\Delta_\text{MCI}`
    - Average duration of MCI due to AD
    - 3.25 years
    - Value from `Potashman et al.`_, assuming a constant hazard rate.
      Corresponds to an annual probability of 0.735 of staying in
      MCI-AD, since :math:`\exp(-1 / 3.25) \approx 0.735`.  **Note:**
      The paper reports a 68.2% of staying in MCI and a 5.3% chance or
      returning to asymptomatic---these probabilities have been combined
      since our model assumes that a backwards transition is not
      possible.
  * - :math:`\Delta_\text{AD}`
    - Average duration of AD-dementia
    - 1 / m_AD
    -
  * - :math:`\Delta_\text{(all AD states)}`
    - Average duration of all stages of AD combined
    - :math:`\Delta_\text{BBBM} + \Delta_\text{MCI} + \Delta_\text{AD}`
    -

.. _gamma distribution:
  https://en.wikipedia.org/wiki/Gamma_distribution
.. _SciPy's gamma distribution class:
  https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.gamma.html
.. _Potashman et al.:
  https://doi.org/10.1007/s40120-021-00272-1
