.. _2021_cause_neonatal_disorders_mncnh:

=============================================
Neonatal all-cause mortality: GBD 2021, MNCNH
=============================================

.. note::

    This page is adapted from the :ref:`Maternal disorders: GBD 2021, MNCNH <2021_cause_maternal_disorders_mncnh>` page and is also part of the :ref:`MNCNH Portfolio project
    <2024_concept_model_vivarium_mncnh_portfolio>`.  In this work we are modeling
    several neonatal subcauses (see `Modeled Subcauses`_) which is complicated because the :ref:`Low Birth Weight and Short Gestation (LBWSG) <2019_risk_effect_lbwsg>` risk factor in GBD acts on all-cause mortality during the neonatal period.

.. contents::
   :local:

This document describes neonatal disorders overall and
the strategy for capturing the burden of the neonatal subcauses in a manner that also is calibrated to match all-cause mortality and our continuous (interpolated) LBWSG risk effect on all-cause mortality.

Disease Overview
----------------
This model captures deaths due to any cause that occur during the first 28 days of life. The Low Birth Weight and Short Gestation (LBWSG) risk factor provides a single relative risk for all neonatal deaths, and this all-cause neonatal mortality model describes how we can include it in our simulations.

GBD 2021 Modeling Strategy
--------------------------

The all-cause neonatal mortality estimates are produced by the demographics research team.  The cause-specific mortality for neonatal subcauses are estimated using the Cause of Death Ensemble model (CODEm) process.  The low-birth weight and short gestation risk factor exposure and effect size was estimated by yet another GBD team.

Cause Hierarchy
+++++++++++++++

- All causes (c_294) [level 0]

  - Communicable, maternal, neonatal, and nutritional diseases (c_295)

    - Maternal and neonatal disorders (c_962)

      - **Neonatal disorders (c_380)** [level 3]

        - Neonatal preterm birth (c_381) [level 4]

        - Neonatal encephalopathy due to birth asphyxia and trauma (c_382) [level 4]

        - Neonatal sepsis and other neonatal infections (c_383) [level 4]

        - Hemolytic disease and other neonatal jaundice (c_384) [level 4]

        - Other neonatal disorders (c_385) [level 4]

Modeled Subcauses
-----------------

.. toctree::
    :maxdepth: 1

    neonatal_sepsis
    neonatal_encephalopathy
    preterm_birth


Restrictions
++++++++++++

The following table describes the restrictions from GBD 2021 and our intended use in our MNCNH model.

.. list-table:: GBD 2017 Cause Restrictions
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
     - True
     - **Note:** GBD estimates both YLLs and YLDs for neonatal disorders, but
       **we are ignoring YLDs for this model**.
   * - YLD only
     - False
     - See above.
   * - YLL age group start
     - Early Neonatal
     - [0, 7 days), age_group_id=2
   * - YLL age group end
     - Late Neonatal
     - [7 days, 28 days), age_group_id=3
   * - YLD age group start
     - Not applicable
     - 
   * - YLD age group end
     - Not applicable
     - 

Vivarium Modeling Strategy
--------------------------
This model is designed to estimate deaths and YLLs during the neonatal period that could be averted by interventions targeting sepsis, respiratory distress syndrome (RDS), and possibly encephalopathy, as well as :ref:`Low Birth Weight and Short Gestation (LBWSG) <2019_risk_effect_lbwsg>`. The model accounts for key neonatal sub-causes explicitly and groups all other causes of mortality during the neonatal period together.  It focuses only on fatal outcomes (no disability). The rationale for this design is as follows:

1. The LBWSG risk factor in GBD affects all-cause mortality during the neonatal period, so we need to model all-cause mortality and the LBWSG risk.

2. The nonfatal burden of neonatal causes is around 10% of the total burden. Excluding YLDs simplifies the model significantly without losing much accuracy. Most of this nonfatal burden is accrued throughout life, which complicates combining it with the prevalence DALYs construct.

Scope
+++++

1. Capture deaths by any cause during the neonatal, and the relationship between all-cause mortality and LBWSG.
2. Capture the deaths averted by interventions that reduce the cause-specific mortality of preterm with respiratory distress and sepsis (and perhaps encephalopathy).
3. Do not capture nonfatal burden.


Assumptions and Limitations
+++++++++++++++++++++++++++

The excluded nonfatal portion of the burden is small (around 10% of the total burden).

The evidence base for identifying the level 4 subcauses is not as solid as I would like.

Preterm must be split into with and without respiratory distress syndrome (RDS) outside of GBD, since GBD does not distinguish preterms deaths with and without RDS.

Cause Model Decision Graph
++++++++++++++++++++++++++

We are not modeling neonatal disorders dynamically as a finite state machine, but we can draw an directed 
graph to represent the collapsed decision tree  
representing this cause. Unlike a state machine representation, the values on the 
transition arrows represent decision probabilities rather than rates per 
unit time.


.. graphviz::

    digraph NN_decisions {
        rankdir = TB;
        lb [label="live birth", style=dashed]
        enn_alive [label="neonate survived\nfirst 7 days"]
        lnn_alive [label="neonate survived\nfirst 28 days"]
        dead [label="neonate died"]
        died_of_subcause_0 [label="neonate died\nof subcause 0"]
        died_of_subcause_1 [label="neonate died\nof subcause 1"]
        died_of_subcause_K [label="neonate died\nof subcause K"]

        {rank=same;
        died_of_subcause_0
        died_of_subcause_1
        died_of_subcause_K
        }

        lb -> enn_alive  [label = "1 - enn_mr"]
        lb -> dead [label = "enn_mr"]
        enn_alive -> lnn_alive [label = "1 - lnn_mr"]
        enn_alive -> dead [label = "lnn_mr"]
        dead -> died_of_subcause_0 [label="p_0"]
        dead -> died_of_subcause_1 [label="p_1"]
        dead -> died_of_subcause_K [label="p_K"]
        died_of_subcause_1 -> died_of_subcause_K [color="none", label="..."]
    }

.. list-table:: Decision Point Definitions
    :widths: 7 20
    :header-rows: 1

    * - Decision
      - Definition
    * - live birth
      - The parent simulant has given birth to a live child simulant (which
        is determined in the
        intrapartum step of the :ref:`pregnancy model
        <other_models_pregnancy_closed_cohort_mncnh>`)
    * - neonate survived first 7 days
      - The simulant survived for the first 7 days of life
    * - neonate survived first 28 days
      - The simulant survived for the first 28 days of life
    * - neonate died
      - The simulant died during the first 28 days of life
    * - neonate died of subcause k
      - The simulant died due to cause :math:`k` for :math:`k = 0, 1, \ldots, K`. (Here :math:`k = 0` denotes a residual "all other causes" category.)

.. list-table:: Transition Probability Definitions
    :widths: 1 5 20
    :header-rows: 1

    * - Symbol
      - Name
      - Definition
    * - enn_mr
      - mortality risk during the early neonatal period
      - The probability that a simulant who was born alive dies during the first 7 days
    * - lnn_mr
      - mortality risk during the late neonatal period
      - The probability that a simulant who was born alive dies between day 8 to 28 of life
    * - p_k
      - cause-specific mortality fraction
      - The probability that a simulant death was due to cause :math:`k`


Modeling Strategy
+++++++++++++++++

The neonatal death model requires only the probability of death (aka "mortality risk") for the early and late neonatal time periods. Rather than using GBD mortality rates and converting them into probability of deaths, we will use mortality risk as direct input data into our model. We will calculate mortality risk input data as age-specific death counts divided by live birth counts from GBD.

Note that this strategy does not require any conversion between rates to probabilities NOR does it require any scaling to the duration of the age group. The mortality risk calculated as described below already represents the probability of dying within a neonatal age group and can be used directly as such in the simulation.

To avoid confusion with mortality *rates* (typically referred to as the all-cause mortality rate, ACMR, or cause-specific mortality rates, CSMRs), we will refer to mortality *risk* as AMR (all mortality risk) and CMR (cause mortality risk), where:

.. math::

  AMR_{ENN} = \frac{\text{deaths due to all causes in the ENN age group}}{\text{live births}}

  AMR_{LNN} = \frac{\text{deaths due to all causes in the LNN age group}}{\text{live births} - \text{deaths due to all causes in the ENN age group}}

and 

.. math::

  CMR_{ENN} = \frac{\text{deaths due to cause C in the ENN age group}}{\text{live births}}

  CMR_{LNN} = \frac{\text{deaths due to cause C in the LNN age group}}{\text{live births} - \text{deaths due to all causes in the ENN age group}}


Note that this strategy was updated in May of 2025 from a prior strategy of converting GBD mortality rates to probabilities. `The pull request that updated this strategy can be found here for reference. <https://github.com/ihmeuw/vivarium_research/pull/1654>`_ This strategy update was pursued following verification and validation issues in neonatal mortality and an exploration of potential solutions in model runs 6.1 through 6.4. Ultimately, a change from mortality rates to mortality risk was preferred given that it is the more policy relevant measure in the context of neonates, and accurately apportioning person time alive within the neonatal age group given the input data available to us was a challenge we judged to be unnecessary.

The calculation of :math:`\text{AMR}_i` is a bit complicated, however. We begin with a population AMR and use the LBWSG PAF to derive a risk-deleted AMR to which we can then apply the relative risk of LBWSG matching any risk exposure level.  Mathematically this is achieved by the following formula:

.. math::
    \begin{align*}
    \text{AMR}_{\text{BW},\text{GA}} &= \text{AMR} \times (1 - \text{PAF}_{\text{LBWSG}}) \times \text{RR}_{\text{BW},\text{GA}},
    \end{align*}

where :math:`\text{AMR}_{\text{BW},\text{GA}}` is the all-cause mortality rrisk for a population with birth weight :math:`\text{BW}` and gestational age :math:`\text{GA}`, :math:`\text{AMR}` is the all-cause mortality risk for the total population, :math:`\text{PAF}_{\text{LBWSG}}` is the population attributable fraction for LBWSG, and :math:`\text{RR}_{\text{BW},\text{GA}}` is the relative mortality risk for a specific birth weight :math:`\text{BW}` and gestational age :math:`\text{GA}`.

To obtain the AMR for a specific simulant, we subtract off the *population* CMRs for each modeled subcause for the birth weight and gestational age of the simulant, and then add back in the (potentially pipeline-modified) *individual* CMRs for the specific simulant, which might differ from baseline due to intervention coverage:

.. math::
    \begin{align*}
    \text{AMR}_i &= \text{AMR}_{\text{BW}_i,\text{GA}_i} - \sum_k \text{CSMR}_{\text{BW}_i,\text{GA}_i}^{k}
    + \sum_k \text{CMR}_{i}^{k},
    \end{align*}

where :math:`\text{BW}_i` and :math:`\text{GA}_i` are the birth weight and gestational age for simulant :math:`i`,
:math:`\text{CMR}_{\text{BW}_i,\text{GA}_i}^{k}` is the cause-specific mortality risk for subcause :math:`k` for a population with the same gestational age and birth weight as this simulant,
and :math:`\text{CMR}_{i}^{k}` is the cause-specific mortality risk for subcause :math:`k` for simulant :math:`i` (both detailed in the `Modeled Subcauses`_
linked from this page).


In addition to determining which simulants die due to any cause, we also need to determine which subcause is underlying the death.  This is done by sampling from a categorical distribution obtained by renormalizing the CMRs:

.. math::
    \begin{align*}
    \text{Pr}[\text{subcause} = k\;|\;\text{neonate died}] &= \frac{\text{CMR}_{i}^{k}}
    {\text{AMR}_i},
    \end{align*}

including a special :math:`k=0` for the residual "all other causes" category defined by :math:`\text{CMR}_{i}^{0} = \text{AMR}_i - \sum_{k=1}^K \text{CMR}_{i}^{k}.`


Data Tables
+++++++++++

.. note::

  All quantities pulled from GBD in the following table are for a
  specific year, sex, age group, and location.

.. list-table:: Data values and sources
    :header-rows: 1

    * - Variable
      - Definition
      - Value or source
      - Note
    * - enn_all_cause_death_count
      - Death count in the early neonatal age group
      - GBD: source='codcorrect', metric_id=1, cause_id=294
      - 
    * - lnn_all_cause_death_count
      - Death count in the early neonatal age group due to all causes
      - GBD: source='codcorrect', metric_id=1, cause_id=294
      - 
    * - enn_cause_specific_death_count
      - Count of deaths due to cause C in the early neonatal age group
      - GBD: source='codcorrect', metric_id=1
      - 
    * - lnn_cause_specific_death_count
      - Count of deaths due to cause C in the late neonatal age group
      - GBD: source='codcorrect', metric_id=1
      - 
    * - live_birth_count
      - Count of live births
      - GBD: covariate_id = 1106
      - 
    * - enn_amr
      - all-cause mortality risk in the early neonatal age group
      - enn_all_cause_death_count / live_birth_count
      - 
    * - lnn_amr
      - all-cause mortality risk in the late neonatal age group
      - lnn_all_cause_death_count / (live_birth_count - enn_all_cause_death_count)
      - 
    * - enn_cmr
      - Cause-specific mortality risk in the early neonatal age group
      - enn_cause_specific_death_count / live_birth_count
      - 
    * - lnn_cmr
      - Cause-specific mortality risk in the late neonatal age group
      - lnn_cause_specific_death_count / (live_birth_count - enn_all_cause_death_count)
      - 
    * - :math:`\text{PAF}_\text{LBWSG}`
      - population attributable fraction of all-cause mortality for low birth weight and short gestation
      - computed so that PAF = 1 - 1 / E(RR) from the interpolated relative risk function (with expectation taken over the distribution of LBWSG exposure)
      -
    * - :math:`\text{RR}_{\text{BW},\text{GA}}`
      - relative risk of all-cause mortality for low birth weight and short gestation
      - interpolated from GBD values, as described in :ref:`Low Birth Weight and Short Gestation (LBWSG) <2019_risk_effect_lbwsg>` docs
      -
    * - :math:`\text{CMR}^k_{\text{BW},\text{GA}}`
      - cause-specific mortality risk for subcause k, for population with birth weight BW and gestational age GA
      - GBD + assumption about relative risks
      - see subcause models for details
    * - :math:`\text{CMR}^k_i`
      - cause-specific mortality risk for subcause k, for individual i
      - GBD + assumption about relative risks + intervention model effects
      - see subcause models for details



Calculating Burden
++++++++++++++++++

Years of life lost
"""""""""""""""""""

The years of life lost (YLLs) due to neonatal disorders
are calculated assuming age :math:`a=14 \text{ days}`, and 
equals :math:`\operatorname{TMRLE}(a) - a`, where
:math:`\operatorname{TMRLE}(a)` is the theoretical minimum risk life
expectancy for a person of age :math:`a`.

Years lived with disability
"""""""""""""""""""""""""""

For simplicity, we will not include YLDs in this model.


Validation Criteria
+++++++++++++++++++

Neonatal deaths per live birth in simulation should match corresponding quantity as derived from GBD estimates.

Relative Risk of neonatal death at specific categories of LBWSG exposure should be within 10% of same ratio derived from GBD.  (We don't expect it to match exactly because of (1) our interpolation of the RRs, and (2) we use a constant mortality hazard at each BW-GA level, rather than the GBD's more complex model.)

References
----------
