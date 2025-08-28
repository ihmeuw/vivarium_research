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
  * - DW
    - Disability Weight
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
      * No *a priori* age restriction for MCI-AD cause state
    - * Restriction to age_group_id = 13 (40 to 44) for AD cause state
        is from GBD
      * In practice, the age start for MCI-AD will be age_group_id = 11
        (30 to 34) because we will be adding simulants at most 7 years
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
      and other dementias, but with the age group and year shifted
      backward by the average duration of the BBBM-AD and MCI-AD states
      combined, and inflated to account for deaths in those two states
  * - i_MCI
    - MCI incidence hazard
    - Incidence hazard of MCI due to AD
    - This will be a **time-dependent hazard rate**, depending on how
      long a simulant has been in the BBBM-AD state, not a constant
      hazard like we usually use
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

The following tables describe the data for each state and transition if
modeling only simulants with AD dementia or pre-dementia AD as described
in the :ref:`Alzheimer's population model
<other_models_alzheimers_population>`:

.. list-table:: State data when modeling only simulants with AD dementia or pre-dementia AD
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

**Note:** The variable :math:`\Delta_\textsf{X}` denotes the average duration
in cause state X, as defined in the Data Sources table below.

.. list-table:: Transition Data
  :header-rows: 1

  * - Transition
    - Source State
    - Sink State
    - Value
  * - i_BBBM
    - S
    - BBBM-AD
    - Not explicitly used because we're not modeling susceptible
      simulants. Defined implicitly in the :ref:`Alzheimer's population
      model <other_models_alzheimers_population>`, which computes how
      many simulants to add into the BBBM-AD state on each time step.
  * - i_MCI
    - BBBM-AD
    - MCI-AD
    - :math:`h_\text{MCI}(t - T_\text{BBBM})`, where :math:`t` is the
      current time in the simulation, and :math:`T_\text{BBBM}` is the
      time the simulant entered the BBBM-AD state
  * - i_AD
    - MCI-AD
    - AD
    - :math:`1 / \Delta_\text{MCI}` --- m_MCI
  * - m_X
    - X
    - Death
    - acmr --- csmr_c543 + emr_X

**Note:** :math:`h_\text{MCI}` is the time-dependent hazard function for
transitioning into MCI-AD, defined in the Data Sources table below.

Because i_MCI is defined in terms of a non-constant hazard function
:math:`h_\text{MCI}`, simulants initialized into the BBBM-AD state will need to
be assigned a value for :math:`T_\text{BBBM}` to determine how long they have
been in that state. For simulants in BBBM-AD at time :math:`t=0`, assign
:math:`T_\text{BBBM}` uniformly in the interval :math:`[-\Delta_\text{BBBM},\,
0]`.

.. _alzheimers_cause_state_data_including_susceptible_note:

.. attention::

  If we model the entire population including susceptible simulants, the
  state data should be modified as follows.

  Define :math:`p_\textsf{X}` to be the prevalence of cause state X in
  the total population including susceptible simulants, and define
  :math:`p_\text{(all AD states)}` to be the sum of :math:`p_\textsf{X}`
  for the three AD cause states X. Then multiplying the prevalence of
  each AD state in the above state data table by
  :math:`p_\text{(all AD states)}`
  gives the prevalence of that state in the entire population. Since we
  know that :math:`p_\text{AD} = \text{prevalence_c543}` (the GBD
  prevalence of Alzheimer's disease and other dementias), we can solve
  to obtain

  .. math::
    :label: prevalence_all_AD_states_eq

    p_\text{(all AD states)}
    = \frac{\Delta_\text{(all AD states)}}{\Delta_\text{AD}}
      \cdot \text{prevalence_c543}.

  Note that since the GBD prevalence applies to a given demographic
  group, so does the formula for :math:`p_\text{(all AD states)}`. The
  following state data table shows the resulting initial prevalences
  when modeling the total population, as well as the birth prevalences,
  which replace the entrance prevalences. The excess mortality rate and
  disability weight of each state remain the same.

  .. list-table:: State data when modeling entire population including susceptible simulants
    :header-rows: 1

    * - State
      - Initial prevalence
      - Birth prevalence
    * - S
      - :math:`1 - \frac{\Delta_\text{(all AD states)}}
        {\Delta_\text{AD}} \cdot \text{prevalence_c543}`
      - 1
    * - BBBM-AD
      - :math:`\frac{\Delta_\text{BBBM}}{\Delta_\text{AD}} \cdot \text{prevalence_c543}`
      - 0
    * - MCI-AD
      - :math:`\frac{\Delta_\text{MCI}}{\Delta_\text{AD}} \cdot \text{prevalence_c543}`
      - 0
    * - AD-dementia
      - :math:`\text{prevalence_c543}`
      - 0

  .. note::

    Although we will not need all the values in this table for Model 4, the
    value of :math:`p_\text{(all AD states)}` defined in
    :eq:`prevalence_all_AD_states_eq` **will be needed in order to compute the
    model scale and initialize the correct number of simulants in each
    demographic subgroup.** Note that in the notation on the :ref:`Alzheimer's
    population model page <other_models_alzheimers_population>`,
    :math:`p_\text{(all AD states)}` refers to the prevalence within the entire
    population of a location, including all age groups and sexes. On the other
    hand, if we pull prevalence_c543 for a specific demographic subgroup
    :math:`g` (e.g., a single age group and sex) and year :math:`t`, then
    :math:`p_\text{(all AD states)}` as computed in
    :eq:`prevalence_all_AD_states_eq` corresponds to :math:`p_{g,t}` on the
    Alzheimer's population model page.

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
    - ``dw_full.csv``
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
  * - :math:`\text{DW}_\text{motor}`
    - Disability weight for health state "motor impairment, mild"
    - ``dw_full.csv``
    - Disability weights are stored as draws. See `Abie's disability
      weight notebook`_ for details.
  * - :math:`\text{DW}_\text{motor+cog}`
    - Disability weight for  health state "motor plus cognitive
      impairments, mild"
    - ``dw_full.csv``
    - Disability weights are stored as draws. See `Abie's disability
      weight notebook`_ for details.
  * - :math:`\text{DW}_\text{MCI}`
    - Disability weight of mild cognitive impairment
    - :math:`\frac{\text{DW}_\text{motor+cog} -
      \text{DW}_\text{motor}} {1 - \text{DW}_\text{motor}}`
    - For reference, the value is

      * 0.021 (0.013, 0.032)

      Obtained by removing DW of "motor impairment, mild" from DW of
      "motor plus cognitive impairments, mild," at the draw level. See
      `Abie's disability weight notebook`_ for details, and see below
      for further explanation.
  * - :math:`T_X`
    - The time at which a simulant enters the cause state :math:`X`
    - Random variable for each simulant
    - :math:`T_\text{BBBM}` is used to determine how long a simulant has
      been in the BBBM-AD state, in order to compute the hazard rate of
      transitioning to MCI-AD at a given simulation time :math:`t`
  * - :math:`D_\text{BBBM}`
    - Dwell time in cause state BBBM-AD
    - :math:`T_\text{MCI} - T_\text{BBBM}`
    - Random variable for each simulant, constructed implicitly through
      simulation dynamics to have approximately a `gamma distribution`_
      with shape parameter :math:`\alpha` and rate parameter
      :math:`\lambda`
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
    - An instance of `SciPy's gamma distribution class`_. Note that
      SciPy accepts a scale parameter, which is the reciprocal of the
      rate parameter.
  * - :math:`h_\text{MCI}(t)`
    - Hazard function for transitioning into the MCI-AD state from BBBM-AD
    - gamma_dist.pdf(t) / gamma_dist.sf(t)
    - Equal to :math:`\frac{t^{\alpha-1}e^{-\lambda t}}{\int_t^\infty
      u^{\alpha-1} e^{-\lambda u}\, du}`, but can be computed more
      easily as the ratio of the probability density function to the
      survival function, using the methods defined in `SciPy's gamma
      distribution class`_
  * - :math:`\Delta_\text{BBBM}`
    - Average duration of BBBM-presymptomatic AD
    - :math:`\alpha / \lambda`
    - Mean of gamma distribution for :math:`D_\text{BBBM}`.

      **Note:** This will slightly overestimate the true average
      duration because we are not taking mortality into account. We
      think this will not be too much of an issue because BBBM will be
      mostly in younger age groups where mortality is relatively small.
  * - :math:`\Delta_\text{MCI}`
    - Average duration of MCI due to AD
    - 3.25 years
    - Obtained from Table 3 in `Potashman et al.`_, assuming a constant
      hazard rate. Corresponds to an annual probability of 0.735 of
      staying in MCI-AD, since :math:`\exp(-1 / 3.25) \approx 0.735`.

      **Note:** The paper reports a 68.2% chance of staying in MCI and a 5.3%
      chance of returning to asymptomatic---these probabilities have
      been combined since our model assumes that a backwards transition
      is not possible.
  * - :math:`\Delta_\text{AD}`
    - Average duration of AD-dementia
    - :math:`\min \{1 / \textsf{m_AD},\, \text{5 years} \}`
    - This is an approximation to ensure we have an average duration that is of
      the same order of magnitude as :math:`\Delta_\text{BBBM}` and
      :math:`\Delta_\text{MCI}` for younger age groups (rather than having an
      exorbitantly long duration of :math:`\Delta_\text{AD}`). The only ways to
      leave the AD-dementia state are through death or aging into the next age
      bin. Since the age bins are 5 years, the average duration within an age
      bin can be at most 5 years. If the death rate is high, the duration wil
      be shorter.
  * - :math:`\Delta_\text{(all AD states)}`
    - Average duration of all stages of AD combined
    - :math:`\Delta_\text{BBBM} + \Delta_\text{MCI} + \Delta_\text{AD}`
    -

.. _Abie's disability weight notebook:
  https://github.com/ihmeuw/vivarium_research_alzheimers/blob/4d5dde0b74eb09ea997af7c2de88b81670ba7d61/2025_08_03a_alz_dw_explore.ipynb
.. _gamma distribution:
  https://en.wikipedia.org/wiki/Gamma_distribution
.. _SciPy's gamma distribution class:
  https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.gamma.html
.. _Potashman et al.:
  https://doi.org/10.1007/s40120-021-00272-1
