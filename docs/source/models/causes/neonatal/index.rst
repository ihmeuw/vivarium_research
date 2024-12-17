.. _2021_cause_neonatal_disorders_mncnh:

=============================================
Neonatal all-cause mortality: GBD 2021, MNCNH
=============================================

.. note::

    This page is adapted from the :ref:`Maternal disorders: GBD 2021, MNCNH <2021_cause_maternal_disorders_mncnh>` page and is also part of the :ref:`MNCNH Portfolio project
    <2024_concept_model_vivarium_mncnh_portfolio>`.  In this work we are modeling
    several neonatal subcauses (see Modeled
    Subcauses) which is complicated because the LBWSG risk factor in GBD acts on all-cause mortality during the neonatal period.

.. contents::
   :local:

This document describes neonatal disorders overall and

the strategy for capturing the burden of the neonatal subcauses in a manner that also is calibrated to match all-cause mortality and the LBWSG risk effect on all-cause mortality.

Disease Overview
----------------
This model captures deaths due to any cause that occur during the first 28 days of life. The Low Birth Weight and Short Gestation (LBWSG) risk factor provides a single relative risk for all neonatal deaths, and the way we plan to use it is by applying to this all-cause neonatal mortality model.

GBD 2021 Modeling Strategy
--------------------------

I guess this comes from the demographics research team.

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
2. Capture the deaths averted by interventions that reduce the cause-specific mortality rates of preterm with respiratory distress and sepsis (and perhaps encephalopathy).
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
        graph [size="7,5"]
        rankdir = LR;
        lb [label="live birth", style=dashed]
        enn_alive [label="neonate survived\nfirst 7 days"]
        enn_dead [label="neonate died\nduring first 7 days"]
        lnn_alive [label="neonate survived\nfirst 28 days"]
        lnn_dead [label="neonate died\nduring first 28 days"]

        lb -> enn_alive  [label = "1 - enn_mr"]
        lb -> enn_dead [label = "enn_mr"]
        enn_alive -> lnn_alive [label = "1 - lnn_mr"]
        enn_alive -> lnn_dead [label = "lnn_mr"]
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
      - The child simulant survived for the first 7 days of life
    * - neonate died during first 7 days
      - The child simulant died within the first 7 days of life
    * - neonate survived first 28 days
      - The child simulant survived for the first 28 days of life
    * - neonate died during first 28 days
      - The child simulant died between day 8 and 28 of life

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


Data Tables
+++++++++++

The neonatal death model requires only the probability of death (aka "mortality risk") for the early and late neonatal time periods.  But computing this for an individual simulant is a bit complicated.  It will follow the pattern from the general mortality component in :code:`vivarium_public_health`, and work in rate space to make the math simpler.  The final step will be converting from rates to risks.

.. math::
    \begin{align*}
    \text{mr}_i &= 1-\exp(-\text{ACMR}_i \Delta t),
    \end{align*}

where :math:`\text{mr}_i` is the probability of mortality for simulant :math:`i` during the early or late neonatal period, :math:`\text{ACMR}_i` is the all-cause mortality rate for the early or late neonatal period, and :math:`\Delta t` is length of that period in years.

The calculation of :math:`\text{ACMR}_i` is a bit complicated, however. We begin with a population ACMR and use the LBWSG PAF to derive a risk-deleted ACMR to which we can then apply the relative risk of LBWSG matching each risk exposure category.  Mathematically this is achieved by the following formula:

.. math::
    \begin{align*}
    \text{ACMR}_j &= \text{ACMR} \times (1 - \text{PAF}_{\text{LBWSG}}) \times \text{RR}_{\text{LBWSG},j},
    \end{align*}

where :math:`\text{ACMR}_j` is the all-cause mortality rate for the population with LBWSG exposure category :math:`j`, :math:`\text{ACMR}` is the all-cause mortality rate for the total population, :math:`\text{PAF}_{\text{LBWSG}}` is the population attributable fraction for LBWSG, and :math:`\text{RR}_{\text{LBWSG},j}` is the relative mortality rate for LBWSG.

To obtain the ACMR for a specific simulant, we subtract off the *population* CSMRs for each modeled subcause for the LBWSG exposure level of the simulant, and then add back in the (potentially pipeline-modified) *individual* CSMRs for the specific simulant, which might differ from baseline due to intervention coverage.

.. math::
    \begin{align*}
    \text{ACMR}_i &= \text{ACMR}_j - \sum_k \text{CSMR}_{k,j}^{\text{population}}
    + \sum_k \text{CSMR}_{k,i},^{\text{individual}}
    \end{align*}

where :math:`\text{CSMR}_{k,j}^{\text{population}}` is the cause-specific mortality rate for subcause :math:`k` for the population with LBWSG exposure category :math:`j`, and :math:`\text{CSMR}_{k,i}^{\text{individual}}` is the cause-specific mortality rate for subcause :math:`k` for simulant :math:`i` (both detailed in the subcause models linked from this page). (Also note that simulant :math:`i` is assumed to be in LBWSG exposure category :math:`j`.)

In addition to determining which simulants die due to any cause, we also need to determine which subcause is underlying the death.  This is done by sampling from a categorical distribution obtained by renormalizing the CSMRs:

.. math::
    \begin{align*}
    \text{Pr}[\text{subcause} = k\;|\;\text{neonate died}] &= \frac{\text{CSMR}_{k,i}^{\text{individual}}}
    {\text{ACMR}_i},
    \end{align*}

including a special :math:`k=0` for the residual "all other causes" category.
.. note::

  All quantities pulled from GBD in the following table are for a
  specific year, sex, age group, and location.

.. list-table:: Data values and sources
    :header-rows: 1

    * - Variable
      - Definition
      - Value or source
      - Note
    * - ACMR
      - all-cause mortality rate (per person year)
      - GBD
      -
    * - PAF_LBWSG
      - population attributable fraction of all-cause mortality for low birth weight and short gestation
      - Computed to be consistent with GBD
      -
    * - RR_LBWSG
      - relative risk of all-cause mortality for low birth weight and short gestation
      - GBD
      -
    * - CSMR_k,j_population
      - cause-specific mortality rate for subcause k, for LBWSG exposure j at the population level
      - GBD + assumption about relative risks
      - see subcause models for details
    * - CSMR_k,i_individual
      - cause-specific mortality rate for subcause k, for individual i
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

Neonatal mortality counts and rate in simulation should match GBD estimates.

References
----------
