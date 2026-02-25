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

The IHME dementia modelers use DisMod to estimate the prevalence and
incidence of a "dementia envelope" comprising all types of dementia
combined, and then they estimate what proportion of the envelope
corresponds to each subtype of dementia. The proportions of dementia due
to stroke, Parkinson's disease, Down's syndrome, and traumatic brain
injury are attributed to those GBD causes, and the remaining dementia in
the envelope is attributed to the GBD cause "Alzheimer's disease and
other dementias" (cause ID 543).

For further information, see the methods appendices and HUB page:

* `Alzheimer's disease and other dementias in the GBD 2021 fatal methods
  appendix <ADOD_2021_fatal_methods_appendix_>`_
* `Alzheimer's disease and other dementias in the GBD 2021 nonfatal
  methods appendix <ADOD_2021_nonfatal_methods_appendix_>`_
* `Alzheimer's/Dementia HUB page <ADOD_HUB_page_>`_

.. _ADOD_2021_fatal_methods_appendix:
  https://www.healthdata.org/gbd/methods-appendices-2021/alzheimers-disease-and-other-dementias

.. _ADOD_2021_nonfatal_methods_appendix:
  https://www.healthdata.org/gbd/methods-appendices-2021/alzheimers-disease-and-other-dementias-0

.. _ADOD_HUB_page:
  https://hub.ihme.washington.edu/spaces/BIRDS/pages/123831566/Alzheimers+Dementia

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
    - * 40 to 44 for AD-dementia cause state
      * No *a priori* age restriction for MCI-AD cause state
    - * Restriction to age_group_id = 13 (40 to 44) for AD-dementia
        cause state is from GBD. However, due to simulation dynamics, it is
        possible for simulants to enter this state before age 40.
      * In practice, the age start for MCI-AD will be age_group_id = 10
        (25 to 29) because we will be adding simulants at most 10.2
        years before AD incidence (so 40 -- 10.2 = 29.8, in the 25-29
        age group)
  * - YLD age group end
    - 95 plus
    - age_group_id = 235

Vivarium Modeling Strategy
++++++++++++++++++++++++++

For :ref:`Model 4 <2025_alzheimers_model_runs_table>` of the :ref:`CSU
Alzheimer's simulation <2025_concept_model_vivarium_alzheimers>`, we
will add two pre-dementia states to the Alzheimer's disease model. The
model still functions similar to an SI model, but now there are multiple
with-condition states, with unidirectional progression between them. In
Model 4 we used the incidence and prevalence for GBD's "Alzheimer's disease
and other dementias" (cause ID 543), so our numbers were inflated by
the "other dementias" part.

In :ref:`Model 5 <2025_alzheimers_model_runs_table>`, we remove the
"other dementias" from the disease model. To do this, the dementia
modelers recommended *not* using the published GBD data directly, but to
start with the GBD 2023 "dementia envelope" data from DisMod, and
multiply by proportion of the envelope due to Alzheimer's disease. The
estimates of the proportions of the envelope due to each dementia
subtype are unpublished as of September 2025, but the modelers shared a
.csv file we can use as long as we don't expose the raw numbers. See the
`Data Values and Sources`_ section below for details.

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

.. _2021_cause_alzheimers_presymptomatic_mci_state_data_table:

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
in cause state X, as defined in the :ref:`data values and sources table below
<2021_cause_alzheimers_presymptomatic_mci_data_sources_table>`.

.. _2021_cause_alzheimers_presymptomatic_mci_transition_data_table:

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
      time the simulant entered the BBBM-AD state. 
      Adjusted in :ref:`intervention_hypothetical_alzheimers_treatment` scenario.
  * - i_AD
    - MCI-AD
    - AD
    - :math:`1 / \Delta_\text{MCI}`
  * - m_X
    - X
    - Death
    - acmr --- csmr_c543 + emr_X

**Note:** :math:`h_\text{MCI}` is the time-dependent hazard function for
transitioning into MCI-AD, defined in the :ref:`data values and sources table
below <2021_cause_alzheimers_presymptomatic_mci_data_sources_table>`.

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
  each AD state in the :ref:`above state data table
  <2021_cause_alzheimers_presymptomatic_mci_state_data_table>` by
  :math:`p_\text{(all AD states)}` gives the prevalence of that state in
  the entire population. Since we know that

  .. math::

    \begin{align*}
    p_\text{AD}
    &= \text{prevalence_AD} \\
    &= \text{prevalence_m24351} \times \text{proportion_AD},
    \end{align*}

  the prevalence of AD dementia computed from GBD's dementia envelope
  (see :ref:`data values and sources table below
  <2021_cause_alzheimers_presymptomatic_mci_data_sources_table>`), we
  can solve to obtain

  .. math::
    :label: prevalence_all_AD_states_eq

    p_\text{(all AD states)}
    = \frac{\Delta_\text{(all AD states)}}{\Delta_\text{AD}}
      \cdot \text{prevalence_AD}
    \quad\text{(for ages 40+)}.

  Note that since the GBD prevalence applies to a given demographic
  group, so does the formula for :math:`p_\text{(all AD states)}`. The
  above formula applies to age groups 40+ since this is where
  prevalence_AD and :math:`\Delta_\text{AD}` are nonzero. For ages
  30--39, use the value of :math:`p_\text{(all AD states)}` for age
  group 40--44; for ages <30, set :math:`p_\text{(all AD states)} = 0`.
  The following state data table shows the resulting initial prevalences
  when modeling the total population, as well as the birth prevalences,
  which replace the entrance prevalences. The excess mortality rate and
  disability weight of each state remain the same.

  .. list-table:: State data when modeling entire population including susceptible simulants
    :header-rows: 1

    * - State
      - Initial prevalence
      - Birth prevalence
    * - S
      - :math:`1 - p_\text{(all AD states)}`
      - 1
    * - BBBM-AD
      - :math:`\frac{\Delta_\text{BBBM}}{\Delta_\text{(all AD states)}}
        \cdot p_\text{(all AD states)}`
      - 0
    * - MCI-AD
      - :math:`\frac{\Delta_\text{MCI}}{\Delta_\text{(all AD states)}}
        \cdot p_\text{(all AD states)}`
      - 0
    * - AD-dementia
      - :math:`\frac{\Delta_\text{AD}}{\Delta_\text{(all AD states)}}
        \cdot p_\text{(all AD states)}`
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
    hand, if we compute prevalence_AD for a specific demographic subgroup
    :math:`g` (e.g., a single age group and sex) and year :math:`t`, then
    :math:`p_\text{(all AD states)}` as computed in
    :eq:`prevalence_all_AD_states_eq` corresponds to :math:`p_{g,t}` on the
    Alzheimer's population model page.

Data Values and Sources
-----------------------

Unless otherwise noted, all data values depend on year, location, age group,
and sex, as defined by GBD.

The following paths on the cluster contain the data files listed in the
table below:

* :file:`population_agg.nc` and :file:`mortality_all.nc` from FHS team
* :file:`squeezed_proportions_to_sim_sci.csv` from dementia modelers
* :file:`all.hdf` disability weight file saved by Simulation Science team

.. code-block:: bash

  # Data folder for Alzheimer's sim, including data from FHS team and
  # dementia modelers (see README.txt for data provenance)
  /mnt/team/simulation_science/pub/models/vivarium_csu_alzheimers/data

  # Disability weights saved by Simscience team:
  /mnt/team/simulation_science/costeffectiveness/auxiliary_data/GBD_2021/02_processed_data/disability_weight/sequela/all/all.hdf

.. _2021_cause_alzheimers_presymptomatic_mci_data_sources_table:

.. list-table:: Data values and sources
  :widths: 20 30 25 25
  :header-rows: 1

  * - Variable
    - Definition
    - Source or value
    - Notes
  * - proportion_AD
    - The proportion of the dementia envelope that is Alzheimer's
      disease dementia
    - :file:`squeezed_proportions_to_sim_sci.csv`
    - Point estimate stratified by age group and sex for ages 40+.
      Includes proportions for all subtypes of dementia --- filter to
      type_label == "Alzheimer's disease".

      **Note:** These estimates were provided by the dementia modelers
      and are not yet published, so they should not be stored directly
      in the Artifact or any other public location.
  * - proportion_mixed
    - The proportion of the dementia envelope that is due to mixed
      dementia (i.e. more than one type of dementia simultaneously)
    - :file:`squeezed_proportions_to_sim_sci.csv`
    - Point estimate stratified by age group and sex for ages 40+.
      Includes proportions for all subtypes of dementia --- filter to
      type_label == "Mixed dementia".

      **Note:** These estimates were provided by the dementia modelers
      and are not yet published, so they should not be stored directly
      in the Artifact or any other public location.
  * - prevalence_m24351
    - Prevalence of GBD 2023 dementia envelope
    - get_draws( source="epi", gbd_id_type = "modelable_entity_id",
      gbd_id=24351, release_id=16, year_id=2023, measure_id=5 )
    - The dementia envelope represents the combined prevalence all types
      of dementia. By contrast, the GBD cause "Alzheimer's disease and
      other dementias" (c543) does not include certain dementias that
      result from other modeled GBD causes.
  * - prevalence_AD
    - Prevalence of AD dementia in total population
    - prevalence_m24351 :math:`\cdot` (proportion_AD + 0.94
      :math:`\cdot` proportion_mixed)
    - We assume that 94% of mixed dementias include Alzheimer's disease,
      based on this `mixed dementias presentation`_ from the dementia
      modelers
  * - :math:`p_\textsf{X}`
    - Prevalence of cause state X in total population
    - Defined in the "Initial prevalence" column of the state data table
      in the :ref:`Attention box above
      <alzheimers_cause_state_data_including_susceptible_note>`
    - By definition, :math:`p_\text{AD} =` prevalence_AD, and
      :math:`p_\text{BBBM}` and :math:`p_\text{MCI}` are derived from
      this
  * - :math:`p_\text{(all AD states)}`
    - Prevalence of all stages of AD combined
    - Defined in :eq:`prevalence_all_AD_states_eq` above
    - Equals :math:`p_\text{BBBM} + p_\text{MCI} + p_\text{AD}`
  * - incidence_m24351
    - Total-population incidence rate for GBD 2023 dementia envelope
    - get_draws( source="epi", gbd_id_type = "modelable_entity_id",
      gbd_id=24351, release_id=16, year_id=2023, measure_id=6 )
    - Raw value from get_draws, different from susceptible-population
      incidence rate automatically calculated by Vivarium Inputs
  * - incidence_AD
    - Total-population incidence rate of AD dementia
    - incidence_m24351 :math:`\cdot` (proportion_AD + 0.94
      :math:`\cdot` proportion_mixed)
    - Used in :ref:`AD population model
      <other_models_alzheimers_population>` to calculate BBBM-AD
      incidence. We are assuming the prevalence proportions can be
      applied to incidence. We are assuming the AD-dementia incidence
      rate is constant over time in each demographic group. We assume
      94% of mixed dementias include Alzheimer's, based on this `mixed
      dementias presentation`_ from the dementia modelers.
  * - acmr
    - All-cause mortality rate
    - :file:`mortality_all.nc`
    - Draw-level, age-specific forecasts from GBD 2021 Forecasting
      Capstone. See `Abie's population and mortality forecasts
      notebook`_ for a demonstration of how to load and transform the
      ``.nc`` file
  * - population_forecast
    - Forecasted average population during specified year
    - :file:`population_agg.nc`
    - Draw-level, age-specific forecasts from GBD 2021 Forecasting
      Capstone. Numerically equal to person-years. Used in :ref:`AD
      population model <other_models_alzheimers_population>` to
      calculate BBBM-AD incidence counts. See `Abie's population and
      mortality forecasts notebook`_ for a demonstration of how to load
      and transform the ``.nc`` file.
  * - :math:`\text{population}_{2021}`
    - Average population during the year 2021
    - get_population
    - Point estimate. Used only for the calculation of csmr_c543 by
      Vivarium Inputs
  * - :math:`\text{deaths_c543}_{2021}`
    - Deaths from Alzheimer's disease and other dementias in 2021
    - codcorrect
    - Used only for the calculation of csmr_c543 by Vivarium Inputs
  * - csmr_c543
    - Cause-specific mortality rate for Alzheimer's disease and other
      dementias
    - :math:`\frac{\text{deaths_c543}_{2021}}{(\text{population}_{2021})
      \cdot (\text{1 year})}`
    - Calculated automatically by Vivarium Inputs. Assumed to remain
      constant over time in each demographic group.
  * - :math:`\text{prevalence_c543}_{2021}`
    - Prevalence of Alzheimer's disease and other dementias in 2021
    - como
    - Used only for calculation of emr_c543 by Vivarium Inputs
  * - emr_c543
    - Excess mortality rate for Alzheimer's disease and other dementias
    - :math:`\frac{\text{csmr_c543}}{\text{prevalence_c543}_{2021}}`
    - Calculated automatically by Vivarium Inputs. Assumed to remain
      constant over time in each demographic group.
  * - emr_X
    - Excess mortality rate in cause state X
    - Values listed in "Excess mortality rate" column of :ref:`state
      data table above
      <2021_cause_alzheimers_presymptomatic_mci_state_data_table>`
    - * emr_S, emr_BBBM, emr_MCI, emr_AD
  * - m_X
    - Mortality hazard in cause state X
    - acmr --- csmr_c543 + emr_X
    - * m_S, m_BBBM, m_MCI, m_AD
      * See :ref:`Mortality Impacts <models_cause_mortality_impacts>`
        section of cause model design page
  * - sequelae_c543
    - Sequelae of Alzheimer's disease and other dementias
    - Set of 3 sequelae: s452, s453, s454
    - Obtained from gbd_mapping.
      Sequela names are "Mild," "Moderate," or "Severe Alzheimer's
      disease and other dementias," respectively. Same for all years,
      locations, age groups, and sexes.
  * - :math:`\text{prevalence}_s`
    - Prevalence of sequela :math:`s`
    - como
    -
  * - :math:`\text{DW}_s`
    - Disability weight of sequela :math:`s`
    - :file:`all.hdf` disability weight file in our team's auxiliary data
    - Disability weights are stored as draws and do not vary by year, location,
      age group, or sex. For reference, the values are:

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
    - :file:`all.hdf` disability weight file in our team's auxiliary data
    - Disability weights are stored as draws and do not vary by year, location,
      age group, or sex. See `Abie's disability weight notebook`_ for details
      on pulling the correct value.
  * - :math:`\text{DW}_\text{motor+cog}`
    - Disability weight for  health state "motor plus cognitive
      impairments, mild"
    - :file:`all.hdf` disability weight file in our team's auxiliary data
    - Disability weights are stored as draws and do not vary by year, location,
      age group, or sex. See `Abie's disability weight notebook`_ for details
      on pulling the correct value.
  * - :math:`\text{DW}_\text{MCI}`
    - Disability weight of mild cognitive impairment
    - :math:`\frac{\text{DW}_\text{motor+cog} -
      \text{DW}_\text{motor}} {1 - \text{DW}_\text{motor}}`
    - Disability weights are stored as draws and do not vary by location, age
      group, or sex. For reference, the value is

      * 0.021 (0.013, 0.032)

      Obtained by removing DW of "motor impairment, mild" from DW of "motor
      plus cognitive impairments, mild," at the draw level. See `Abie's
      disability weight notebook`_ for details, and see the :ref:`derivation
      below <alzheimers_mci_disability_weight_derivation>` for further
      explanation.
  * - :math:`T_X`
    - The time at which a simulant enters the cause state :math:`X`
    - Determined within the simulation
    - Random variable for each simulant. :math:`T_\text{BBBM}` is used to
      determine how long a simulant has been in the BBBM-AD state, in order to
      compute the hazard rate of transitioning to MCI-AD at a given simulation
      time :math:`t`.
  * - :math:`D_\text{BBBM}`
    - Dwell time in cause state BBBM-AD
    - :math:`T_\text{MCI} - T_\text{BBBM}`
    - Random variable for each simulant, constructed implicitly through
      simulation dynamics to have approximately a `Weibull
      distribution`_ with shape parameter :math:`k` and scale parameter
      :math:`\lambda`
  * - :math:`k`, :math:`\lambda`
    - Shape and scale parameters, respectively, of Weibull distribution for
      :math:`D_\text{BBBM}`
    - * :math:`k = 1.22`
      * :math:`\lambda = 6.76`
    - Chosen to match client's specification for :math:`D_\text{BBBM}`:
      The probability of progression from BBBM-AD to MCI-AD is about 50%
      at 5 years and 80% at 10 years, corresponding to an average annual
      rate of progression of approximately 15% . Use the same parameters
      for all years, locations, age groups, and sexes.
  * - bbbm_dist
    - Python object representing the Weibull distribution for
      :math:`D_\text{BBBM}`
    - scipy.stats.weibull_min(k, scale=λ)
    - An instance of `SciPy's Weibull distribution class`_.
  * - :math:`h_\text{MCI}(t)`
    - Hazard function for transitioning into the MCI-AD state from BBBM-AD
    - * bbbm_dist.pdf(t) / bbbm_dist.sf(t), or
      * exp( bbbm_dist.logpdf(t) --- bbbm_dist.logsf(t) ), an
        equivalent expression that may help avoid underflow
    - Equal to :math:`\frac{k}{\lambda}
      \left(\frac{t}{\lambda}\right)^{k-1}`, but can also be computed as
      the ratio of the probability density function to the survival
      function, using the methods defined in `SciPy's Weibull
      distribution class`_
  * - :math:`\Delta_\text{BBBM}`
    - Average duration of BBBM-presymptomatic AD in the absence of
      mortality
    - bbbm_dist.mean()
    - Equal to :math:`\lambda \Gamma(1 + 1/k)`, where :math:`\Gamma` is
      the `gamma function`_.  Can be computed using
      `scipy.special.gamma`_, but using bbbm_dist.mean() is more general
      if we update the underlying distribution. Does not vary by year,
      location, age group, or sex.
  * - :math:`\Delta_\text{MCI}`
    - Average duration of MCI due to AD in the absence of mortality
    - 3.85 years
    - Obtained from Table 3 in `Potashman et al.`_, assuming a constant
      hazard rate of transitioning to AD-dementia. Corresponds to an
      annual conditional probability of 0.771 of staying in MCI-AD given
      that you don't die within one year, since :math:`\exp(-1 / 3.85)
      \approx 0.771`. Does not vary by year, location, age group, or
      sex.

      **Note:** The paper reports a 68.2% chance of staying in MCI and a
      5.3% chance of returning to asymptomatic---these probabilities
      have been combined to get an annual probability of 73.5% of
      staying in MCI since our model assumes that a backwards transition
      is not possible. The conditional probability above is computed as
      :math:`0.771 = 0.735 / (1 - 0.047)` since the paper reports a 4.7%
      chance of dying within a year when starting in the MCI state.
  * - :math:`\Delta_\text{AD}`
    - Average duration of AD-dementia
    - * prevalence_AD / incidence_AD for ages 40+
      * 0 for ages under 40
    - Follows from the steady-state equation (prevalent cases) = (incident
      cases) x (average duration). Note that the denominator is the **raw
      total-population incidence rate from GBD**, not the
      susceptible-population incidence rate usually returned by Vivarium
      Inputs. This is because we want the total-population person-time in the
      denominators of prevalence and incidence to cancel out, leaving a ratio
      of counts.
  * - :math:`\Delta_\text{(all AD states)}`
    - Average duration of all stages of AD combined if there is no
      mortality in the BBBM-AD and MCI-AD stages
    - :math:`\Delta_\text{BBBM} + \Delta_\text{MCI} + \Delta_\text{AD}`
    -

.. _mixed dementias presentation:
  https://uwnetid.sharepoint.com/:p:/r/sites/ihme_simulation_science_team/Shared%20Documents/Research/Alzheimer%27s%20CSU/01_planning/Mixed%20Dementia%20GV%20Follow-Up%20TV%20EN%20-%20to%20Sim%20Sci.pptx?d=wdc4e17c5661f40a7816768c2fd0c1e2d&csf=1&web=1&e=vhPSJa
.. _Abie's population and mortality forecasts notebook:
  https://github.com/ihmeuw/vivarium_csu_alzheimers/blob/39fe76203a8031da7983bcb5d8824216a61b5d43/src/vivarium_csu_alzheimers/data/population_forecasts/2025_08_12a_alz_artifact_forecast_population_and_mortality.ipynb
.. _Abie's disability weight notebook:
  https://github.com/ihmeuw/vivarium_research_alzheimers/blob/4d5dde0b74eb09ea997af7c2de88b81670ba7d61/2025_08_03a_alz_dw_explore.ipynb
.. _gamma distribution:
  https://en.wikipedia.org/wiki/Gamma_distribution
.. _Weibull distribution:
  https://en.wikipedia.org/wiki/Weibull_distribution
.. _SciPy's gamma distribution class:
  https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.gamma.html
.. _SciPy's Weibull distribution class:
  https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.weibull_min.html
.. _gamma function:
  https://en.wikipedia.org/wiki/Gamma_function
.. _scipy.special.gamma:
  https://docs.scipy.org/doc/scipy/reference/generated/scipy.special.gamma.html
.. _Potashman et al.:
  https://doi.org/10.1007/s40120-021-00272-1

.. _alzheimers_mci_disability_weight_derivation:

Deriving a disability weight for MCI
------------------------------------

.. todo::

  Derive the formula for the disability weight of MCI, and include Abie's plot
  comparing DWs of various relevant health states.
