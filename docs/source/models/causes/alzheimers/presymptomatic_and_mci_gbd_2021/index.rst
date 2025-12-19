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
Alzheimer's disease  with presymptomatic and MCI stages (GBD 2023)
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

GBD 2023 Modeling Strategy
++++++++++++++++++++++++++

The IHME dementia modelers use DisMod to estimate the incidence, prevalence and
excess mortality of a "dementia envelope" (modelable entity ID 24351) comprising
all types of dementia combined, and then they estimate what proportion of
the envelope corresponds to each subtype of dementia. They attribute the proportions of
dementia due to stroke, Parkinson's disease, Down's syndrome, and traumatic
brain injury to those GBD causes, and then they use the remaining dementia
in the envelope for the GBD cause "Alzheimer's disease and
other dementias" (cause ID 543).

For this simulation, we use the dementia envelope prevalence and incidence
from GBD 2023 (release ID 16) and multiply by the proportion due to
Alzheimer's disease to obtain AD-specific estimates. See the
`Data Values and Sources`_ section for details.

Restrictions
------------

The following table describes restrictions in GBD 2023 on the effects of
the cause "Alzheimer's disease and other dementias" (such as being only
fatal or only nonfatal), as well as restrictions on the ages and sexes to
which the cause applies. We also list the implied age restriction on YLDs
for the MCI-AD state of the cause model below.

.. list-table:: GBD 2023 Cause Restrictions
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

This cause model extends GBD's Alzheimer's disease dementia with two
pre-dementia states: BBBM-AD (pre-clinical AD detectable via blood-based
biomarkers) and MCI-AD (mild cognitive impairment due to AD). GBD does not
model these pre-dementia states, so we :ref:`calibrate transition rates and
prevalences <2021_cause_alzheimers_rate_calibration>` using GBD data combined
with additional evidence on state durations.

To obtain Alzheimer's-specific estimates (excluding "other dementias"), we
multiply the GBD 2023 dementia envelope by the proportion due to Alzheimer's
disease. See the `Data Values and Sources`_ section for details.

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
    - :math:`\delta_\text{BBBM}`
    - 1
    - 0
    - 0
  * - MCI-AD
    - :math:`\delta_\text{MCI}`
    - 0
    - 0
    - :math:`\text{DW}_\text{MCI}`
  * - AD-dementia
    - :math:`1 - \delta_\text{BBBM} - \delta_\text{MCI}`
    - 0
    - emr_c543
    - :math:`\text{DW}_\text{c543}`

**Note:** The conditional prevalences :math:`\delta_\text{BBBM}` and
:math:`\delta_\text{MCI}` are obtained from the :ref:`rate calibration
<2021_cause_alzheimers_rate_calibration>` and represent the proportion of
all AD cases in each state.

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

  The :ref:`rate calibration <2021_cause_alzheimers_rate_calibration>` provides
  :math:`p`, the total prevalence of any AD state (BBBM + MCI + dementia) in
  the total population, along with conditional prevalences
  :math:`\delta_\text{BBBM}` and :math:`\delta_\text{MCI}`. The prevalence of
  each AD state in the total population is then :math:`p` multiplied by the
  corresponding conditional prevalence. The following table shows the resulting
  initial prevalences when modeling the total population, as well as the birth
  prevalences, which replace the entrance prevalences. The excess mortality rate
  and disability weight of each state remain the same.

  .. list-table:: State data when modeling entire population including susceptible simulants
    :header-rows: 1

    * - State
      - Initial prevalence
      - Birth prevalence
    * - S
      - :math:`1 - p`
      - 1
    * - BBBM-AD
      - :math:`p \cdot \delta_\text{BBBM}`
      - 0
    * - MCI-AD
      - :math:`p \cdot \delta_\text{MCI}`
      - 0
    * - AD-dementia
      - :math:`p \cdot (1 - \delta_\text{BBBM} - \delta_\text{MCI})`
      - 0

  .. note::

    The calibrated value of :math:`p` (total prevalence of any AD state) **is
    needed to compute the model scale and initialize the correct number of
    simulants in each demographic subgroup.** In the notation on the
    :ref:`Alzheimer's population model page <other_models_alzheimers_population>`,
    :math:`p` for a specific demographic subgroup :math:`g` and year :math:`t`
    corresponds to :math:`p_{g,t}` on that page.

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
    - prevalence_m24351 :math:`\times` proportion_AD
    -
  * - :math:`p`
    - Total prevalence of any AD state (BBBM + MCI + dementia) in total
      population
    - From :ref:`rate calibration <2021_cause_alzheimers_rate_calibration>`,
      artifact key ``cause.alzheimers_consistent.prevalence_any``
    -
  * - :math:`\delta_\text{BBBM}`, :math:`\delta_\text{MCI}`
    - Conditional prevalences of BBBM and MCI states among all AD cases
    - From :ref:`rate calibration <2021_cause_alzheimers_rate_calibration>`,
      artifact keys ``cause.alzheimers_consistent.bbbm_conditional_prevalence``
      and ``cause.alzheimers_consistent.mci_conditional_prevalence``
    - Prevalence of each state in the total population is :math:`p` times
      the conditional prevalence
  * - incidence_m24351
    - Total-population incidence rate for GBD 2023 dementia envelope
    - get_draws( source="epi", gbd_id_type = "modelable_entity_id",
      gbd_id=24351, release_id=16, year_id=2023, measure_id=6 )
    - Raw value from get_draws, different from susceptible-population
      incidence rate automatically calculated by Vivarium Inputs
  * - incidence_AD
    - Total-population incidence rate of AD dementia
    - incidence_m24351 :math:`\times` proportion_AD
    - Used in :ref:`AD population model
      <other_models_alzheimers_population>` to calculate BBBM-AD
      incidence. We are assuming the prevalence proportions can be
      applied to incidence. We are assuming the AD-dementia incidence
      rate is constant over time in each demographic group.
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

.. _2021_cause_alzheimers_rate_calibration:

Calibrating Consistent Rates
----------------------------

GBD provides dementia prevalence, incidence, and mortality, but our model
includes presymptomatic states (BBBM-AD and MCI-AD) not directly measured by
GBD. To derive internally consistent rates for these states, we use Bayesian
inference with NumPyro/JAX to fit disease progression rates to GBD data while
enforcing ODE-based consistency constraints.

The calibration is implemented in ``consistent_rates.py`` in the
vivarium_csu_alzheimers repository. We fit separate models for males and
females.

**Model Parameters.** The NumPyro model defines 7 age-varying parameters, each
with truncated normal priors on :math:`[0, 1]`:

- :math:`p`: Total prevalence of any AD state
- :math:`\delta_\text{BBBM}`, :math:`\delta_\text{MCI}`: Conditional
  prevalences of BBBM and MCI states among AD cases
- :math:`h_{S \to \text{BBBM}}`: Transition rate from susceptible to BBBM
- :math:`i`: Population incidence rate of dementia
- :math:`f`: Excess mortality rate
- :math:`m`: Background (non-AD) mortality rate

**Key Relationships.** Dementia prevalence derives from total AD prevalence:

.. math::

  p_\text{dementia}(a) = p(a) \cdot \left(1 - \delta_\text{BBBM}(a) - \delta_\text{MCI}(a)\right)

All-cause mortality combines background mortality with excess mortality
weighted by dementia prevalence:

.. math::

  m_\text{all}(a) = m(a) + f(a) \cdot p_\text{dementia}(a)

**ODE Consistency Constraints.** The calibration enforces consistency by
solving a 5-compartment ODE system (S, BBBM, MCI, D, cumulative incident
dementia) from age :math:`a` to :math:`a + 5` and penalizing deviations between
ODE-predicted values and calibrated parameters. The transition rates
:math:`h_{\text{BBBM} \to \text{MCI}} = 1 / \Delta_\text{BBBM}` and
:math:`h_{\text{MCI} \to \text{dementia}} = 1 / \Delta_\text{MCI}` are fixed based on
literature values in the data values table above.

**Numerical Methods.** We solve the ODE using diffrax (Dopri5) and sample using
NUTS with 500 warmup and 500 sample iterations.

.. list-table:: Calibration Input Data
  :widths: 15 35 30 20
  :header-rows: 1

  * - Variable
    - Definition
    - Artifact key
    - Year
  * - p_dementia
    - Prevalence of Alzheimer's disease dementia
    - ``cause.alzheimers.prevalence``
    - 2023
  * - i_dementia
    - Population incidence rate of dementia
    - ``cause.alzheimers.population_incidence_rate``
    - 2023
  * - f
    - Excess mortality rate for dementia
    - ``cause.alzheimers_disease_and_other_dementias.excess_mortality_rate``
    - 2021
  * - m_all
    - All-cause mortality rate
    - ``cause.all_causes.cause_specific_mortality_rate``
    - 2025

.. list-table:: Calibrated Outputs (written to artifact for year 2025)
  :widths: 25 75
  :header-rows: 1

  * - Artifact key
    - Description
  * - ``cause.alzheimers_consistent.population_incidence_any``
    - :math:`h_{S \to \text{BBBM}}`: S to BBBM transition rate
  * - ``cause.alzheimers_consistent.prevalence_any``
    - :math:`p`: Total prevalence of any AD state
  * - ``cause.alzheimers_consistent.population_incidence_dementia``
    - :math:`i`: Population incidence rate of dementia
  * - ``cause.alzheimers_consistent.excess_mortality_rate``
    - :math:`f`: Excess mortality rate
  * - ``cause.alzheimers_consistent.bbbm_conditional_prevalence``
    - :math:`\delta_\text{BBBM}`: Proportion of AD cases in BBBM state
  * - ``cause.alzheimers_consistent.mci_conditional_prevalence``
    - :math:`\delta_\text{MCI}`: Proportion of AD cases in MCI state
  * - ``cause.alzheimers_consistent.ode_errors``
    - ODE consistency residuals (should be < 0.01)

**Running the Calibration:**

.. code-block:: python

  from vivarium.framework.artifact import Artifact
  from vivarium_csu_alzheimers.data.consistent_rates import generate_consistent_rates

  art = Artifact("path/to/artifact.hdf")
  generate_consistent_rates(art)  # Takes several minutes

.. _alzheimers_mci_disability_weight_derivation:

Deriving a disability weight for MCI
------------------------------------

.. todo::

  Derive the formula for the disability weight of MCI, and include Abie's plot
  comparing DWs of various relevant health states.
