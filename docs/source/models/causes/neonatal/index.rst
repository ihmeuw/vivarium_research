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

- The excluded nonfatal portion of the burden is small (around 10% of the total burden).

- The evidence base for identifying the level 4 subcauses is not as solid as I would like.

- Preterm must be split into with and without respiratory distress syndrome (RDS) outside of GBD, since GBD does not distinguish preterms deaths with and without RDS.

- We assume the LBWSG RR values represent both the correlation between LBWSG exposure and all-cause neonatal mortality at baseline as well as the causal impact of LBWSG on cause-specific mortality for causes affected by LBWSG

- We assume that the LBWSG exposure distribution prior to applying intervention effects is the same as the LBWSG exposure distribution at baseline. These distributions will slightly diverge due to the baseline calibration of the :ref:`oral iron intervention <oral_iron_antenatal>` (and any other future modeled interventions that are present at baseline and affect LBWSG exposure), but should be roughly similar.

- We "cap" LBWSG RR values at a certain value in an attempt to eliminate the occurrence of individual all-cause mortality risk values greater than 1 on in our simulation (and therefore avoiding an associated underestimation of neonatal mortality) while also maintaining:

  - The relative difference in mortality risk values between LBWSG exposures that are not capped, and

  - Mortality risk values very close to 1 for the individuals with the highest risk LBWSG exposures

  However, in this implementation, we do not consider how modeled interventions may further increase individual-level mortality risk beyond the modifications from the LBWSG risk factor, so it is possible that we continue to have some mortality risk values greater that 1 in our simulation. 

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

        lb -> enn_alive  [label = "1 - acmrisk_enn"]
        lb -> dead [label = "acmrisk_enn"]
        enn_alive -> lnn_alive [label = "1 - acmrisk_lnn"]
        enn_alive -> dead [label = "acmrisk_lnn"]
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
    * - acmrisk_enn
      - mortality risk due to all causes during the early neonatal period
      - The probability that a simulant who was born alive dies during the first 7 days
    * - acmrisk_lnn
      - mortality risk due to all causes during the late neonatal period
      - The probability that a simulant who survived the first 7 days dies between day 8 to 28 of life
    * - p_k
      - cause-specific mortality fraction
      - The probability that a simulant death was due to cause :math:`k`


Modeling Strategy
+++++++++++++++++

The neonatal death model requires only the probability of death (aka "mortality risk") for the early and late neonatal time periods.
These mortality risks are age-group-, sex-, and location-specific.
For brevity, sex and location subscripts are omitted in all equations.

Rather than using GBD mortality rates and converting them into probability of deaths, we will use mortality risk as direct input data into our model. We will calculate mortality risk input data as age-specific death counts divided by live birth counts from GBD.

Note that this strategy does not require any conversion between rates to probabilities NOR does it require any scaling to the duration of the age group. The mortality risk calculated as described below already represents the probability of dying within a neonatal age group and can be used directly as such in the simulation.

To avoid confusion with mortality *rates* (typically referred to as the all-cause mortality rate, ACMR, or cause-specific mortality rates, CSMRs), we will refer to mortality *risk* as ACMRisk (all-cause mortality risk) and CSMRisk (cause-specific mortality risk), where:

.. math::

  \text{ACMRisk}_\text{ENN} = \frac{\text{deaths due to all causes in the ENN age group}}{\text{live births}}

  \text{ACMRisk}_\text{LNN} = \frac{\text{deaths due to all causes in the LNN age group}}{\text{live births} - \text{deaths due to all causes in the ENN age group}}

and for a given cause of death:

.. math::

  \text{CSMRisk}_\text{ENN} = \frac{\text{cause-specific deaths in the ENN age group}}{\text{live births}}

  \text{CSMRisk}_\text{LNN} = \frac{\text{cause-specific deaths in the LNN age group}}{\text{live births} - \text{deaths due to all causes in the ENN age group}}


Note that this strategy was updated in May of 2025 from a prior strategy of converting GBD mortality rates to probabilities. `The pull request that updated this strategy can be found here for reference. <https://github.com/ihmeuw/vivarium_research/pull/1654>`_ This strategy update was pursued following verification and validation issues in neonatal mortality and an exploration of potential solutions in model runs 6.1 through 6.4. Ultimately, a change from mortality rates to mortality risk was preferred given that it is the more policy relevant measure in the context of neonates, and accurately apportioning person time alive within the neonatal age group given the input data available to us was a challenge we judged to be unnecessary.

The calculation of :math:`\text{ACMRisk}_i` (the all-cause mortality risk for a single simulant, :math:`i`) is a bit complicated, however. First, we must decompose the population ACMRisk into two groups: causes affected by the :ref:`LBWSG risk factor <2021_risk_effect_lbwsg>` (:math:`\sum_{\text{c} \in \text{affected}} \text{CSMRisk}_c`) and those unaffected by it (:math:`\sum_{\text{c} \in \text{affected}} \text{CSMRisk}_c`). This decomposition allows us to apply the effects of improved LBWSG exposures to the group of causes affected by LBWSG only (by using the LBWSG PAF to derive a risk-deleted mortality risk and multiplying by the relative risk of LBWSG matching any risk exposure level) without modeling corresponding changes to causes unaffected by LBWSG. We do still model some correlation between LBWSG and mortality due to the group of causes unaffected by LBWSG, though. This is achieved by applying the LBWSG risk effects to these causes based on baseline LBWSG exposure only (whereas the risk effects corresponding to intervention-affected LBWSG exposures are applied to mortality due to LBWSG-affected causes of death). This strategy takes advantage of the fact that the LBWSG RR values were derived using all-cause mortality data, but are only applied *causally* to a subset of affected causes. We assume that the LBWSG RR values can represent the baseline *correlation* between LBWSG exposures and all cause mortality as they are derived from all-cause mortality data without adjustment for confounding. We also assume that these LBWSG RR values represent the causal effect of LBWSG on the subset of specific affected causes (in line with GBD assumptions). So by applying RRs associated with pre-intervention modified LBWSG exposure to unaffected causes and RRs associated with post-intervention modified LBWSG exposure to affected causes, our simulation will both:

  - apply the change in mortality risk to the causes affected by LBWSG associated with intervention impact on LBWSG exposures that is in line with GBD assumptions,
  - and also reflect the expected correlation between LBWSG exposures and mortality at baseline (improving the accuracy of background mortality rates across the LBWSG exposure distribution, which may influence our estimates of impact for interventions that are targeted by LBWSG exposure).

To avoid the need to write out data between simulated scenarios for ease of implementation, we will assume that pre-intervention modified LBWSG exposure represents baseline LBWSG exposure.

Mathematically this is achieved by the following formula.
Starting with this equation, we omit age group subscripts for brevity; all quantities are still age-, sex-, and location-specific.

.. math::
    \begin{align*}
    \text{ACMRisk}_{\text{BW},\text{GA}}^{\text{BW}^0,\text{GA}^0} &= \sum_{\text{c} \in \text{affected}} \text{CSMRisk}_c \times (1 - \text{PAF}_{\text{LBWSG}}) \times \text{RR}_{\text{BW},\text{GA}} \\
    & + (\text{ACMRisk} - \sum_{\text{c} \in \text{affected}} \text{CSMRisk}_c) \times (1 - \text{PAF}_{\text{LBWSG}}) \times \text{RR}_{\text{BW}^0,\text{GA}^0}
    \end{align*}

Where:

- :math:`\text{ACMRisk}_{\text{BW},\text{GA}}^{\text{BW}^0,\text{GA}^0}` is the all-cause mortality risk for a population with a pre-intervention-modified birth weight of :math:`\text{BW}^0` and gestational age :math:`\text{GA}^0` and a post-intervention-modified birth weight of :math:`\text{BW}` and gestational age of :math:`\text{GA}`,
- :math:`\sum_{\text{c} \in \text{affected}} \text{CSMRisk}_c` is the sum of the cause-specific mortality risk values of all causes affected by LBWSG (see the :ref:`LBWSG risk effects document for a list of affected causes <2021_risk_effect_lbwsg>`)
- :math:`\text{ACMRisk}` is the all-cause mortality risk for the total population in one of the neonatal age groups (i.e., :math:`\text{ACMRisk}` equals :math:`\text{ACMRisk}_\text{ENN}` or :math:`\text{ACMRisk}_\text{LNN}` as defined above), 
- :math:`\text{PAF}_{\text{LBWSG}}` is the population attributable fraction for LBWSG, 
- :math:`\text{RR}_{\text{BW},\text{GA}}` is the relative mortality risk for a specific birth weight :math:`\text{BW}` and gestational age :math:`\text{GA}` according to the exposure values in the current scenario, and 
- :math:`\text{RR}_{\text{BW}^0,\text{GA}^0}` is the relative mortality risk for a specific birth weight :math:`\text{BW}` and gestational age :math:`\text{GA}` according to the exposure value prior to the application of any intervention effects on LBWSG exposure.

To obtain the ACMRisk for a specific simulant (:math:`\text{ACMRisk}_i`), we subtract off the *population* CSMRisks for each modeled subcause :math:`k` for the birth weight and gestational age of the simulant, and then add back in the (potentially pipeline-modified) *individual* CSMRisks for the specific simulant, which might differ from baseline due to intervention coverage:

.. math::
    \begin{align*}
    \text{ACMRisk}_i &= \text{ACMRisk}_{\text{BW}_i,\text{GA}_i}^{\text{BW}_i^0,\text{GA}_i^0} - \sum_{k \in \text{affected}} \text{CSMRisk}_{\text{BW}_i,\text{GA}_i}^{k} \\
    & - \sum_{k \in \text{unaffected}} \text{CSMRisk}_{\text{BW}_i^0,\text{GA}_i^0}{k}
    + \sum_k \text{CSMRisk}_{i}^{k}
    \end{align*}

where:

- :math:`\text{BW}_i` and :math:`\text{GA}_i` are the birth weight and gestational age for simulant :math:`i` after intervention effects have been applied to LBWSG exposure,
- :math:`\text{BW}_i^0` and :math:`\text{GA}_i^0` are the birth weight and gestational age for simulant :math:`i` prior to intervention effects being applied to LBWSG exposure,
- :math:`\text{CSMRisk}_{\text{BW}_i,\text{GA}_i}^{k}` is the cause-specific mortality risk for subcause :math:`k` that is affected by LBWSG (according to the :ref:`LBWSG risk effects document <2021_risk_effect_lbwsg>`) for a population with the same gestational age and birth weight as this simulant (after intervention effects have been applied to that simulant's BW and GA exposures), 

  - Note that `Modeled Subcauses`_ preterm birth, neonatal sepsis, and neonatal encephalopathy are all affected by the LBWSG risk factor

- :math:`\text{CSMRisk}_{\text{BW}_i^0,\text{GA}_i^0}^{k}` is the cause-specific mortality risk for subcause :math:`k` that is unaffected by LBWSG (according to the :ref:`LBWSG risk effects document <2021_risk_effect_lbwsg>`) for a population with the same gestational age and birth weight as this simulant before intervention effects have been applied to that simulant's BW and GA exposures,
- and :math:`\text{CSMRisk}_{i}^{k}` is the cause-specific mortality risk for subcause :math:`k` for simulant :math:`i` (both detailed in the `Modeled Subcauses`_ linked from this page).

In addition to determining which simulants die due to any cause, we also need to determine which subcause is underlying the death.  This is done by sampling from a categorical distribution obtained by renormalizing the CSMRisks:

.. math::
    \begin{align*}
    \text{Pr}[\text{subcause} = k\;|\;\text{neonate died}] &= \frac{\text{CSMRisk}_{i}^{k}}
    {\text{ACMRisk}_i},
    \end{align*}

including a special :math:`k=0` for the residual "all other causes" category defined by :math:`\text{CSMRisk}_{i}^{0} = \text{ACMRisk}_i - \sum_{k=1}^K \text{CSMRisk}_{i}^{k}.`


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
    * - acmrisk_enn
      - all-cause mortality risk in the early neonatal age group
      - enn_all_cause_death_count / live_birth_count
      - 
    * - acmrisk_lnn
      - all-cause mortality risk in the late neonatal age group
      - lnn_all_cause_death_count / (live_birth_count - enn_all_cause_death_count)
      - 
    * - csmrisk_enn
      - Cause-specific mortality risk in the early neonatal age group
      - enn_cause_specific_death_count / live_birth_count
      - 
    * - csmrisk_lnn
      - Cause-specific mortality risk in the late neonatal age group
      - lnn_cause_specific_death_count / (live_birth_count - enn_all_cause_death_count)
      - 
    * - :math:`\text{ACMRisk}`
      - All-cause mortality risk
      - either acmrisk_enn or acmrisk_lnn depending on the simulant's age group
      - 
    * - :math:`\text{CSMRisk}`
      - Cause-specific mortality risk
      - either csmrisk_enn or csmrisk_lnn depending on the simulant's age group
      - 
    * - :math:`\text{PAF}_\text{LBWSG}`
      - population attributable fraction of all-cause mortality for low birth weight and short gestation
      - See note below for how to calculate
      - Note that the relative risks used to calculate the PAFs are capped below the :math:`\text{RR}_\text{max}` value
    * - :math:`\text{RR}_{\text{BW},\text{GA}}`
      - relative risk of all-cause mortality for low birth weight and short gestation, capped at the specified maximum value
      - :math:`\min(\text{RR}_\text{max}, \text{RR}_\text{LBWSG})`
      - 
    * - :math:`\text{RR}_\text{LBWSG}`
      - relative risk of all-cause mortality for low birth weight and short gestation, as interpolated from GBD
      - interpolated from GBD values, as described in :ref:`Low Birth Weight and Short Gestation (LBWSG) <2019_risk_effect_lbwsg>` docs
      - 
    * - :math:`\text{RR}_\text{max}`
      - Enforced maximum value for LBWSG relative risk 
      - Location/draw/age group/sex-specific value `calculated according to process in this notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/data_prep/lbwsg_rr_caps.ipynb>`_
      - Capping of LBWSG RRs is intended to guarentee that there will be no individual mortality risk value is greater than 1 in our simulation 
    * - :math:`\text{CSMRisk}^k_{\text{BW},\text{GA}}`
      - cause-specific mortality risk for subcause k, for population with birth weight BW and gestational age GA
      - GBD + assumption about relative risks
      - see subcause models for details
    * - :math:`\text{CSMRisk}^k_i`
      - cause-specific mortality risk for subcause k, for individual i
      - GBD + assumption about relative risks + intervention model effects
      - see subcause models for details

.. _details_of_the_lbwsg_paf_calculation:

Details of the LBWSG PAF calculation
++++++++++++++++++++++++++++++++++++

As stated in the table above, :math:`\text{PAF}_\text{LBWSG}` is the population attributable fraction of all-cause mortality for low birth weight and short gestation. It is computed so that PAF = 1 - 1 / E(:math:`\text{RR}_{\text{BW},\text{GA}}`) from the capped interpolated relative risk function (with expectation taken over the distribution of LBWSG exposure). 

For the early neonatal age group, the LBWSG exposure at birth is used. For the late neonatal age group, we will use the LBWSG exposure at 8 days of life (start of the late neonatal age group after all early neonatal deaths have occurred). This LBWSG exposure is not directly available from GBD. Therefore, we will need to produce it ourselves according to the following steps:

Using the `LBWSG PAF calculation simulation <https://github.com/ihmeuw/vivarium_gates_mncnh/blob/main/src/vivarium_gates_mncnh/data/lbwsg_paf.yaml>`_:

  * **For the calculation of the early neonatal PAF:**

    - Population size = use that specified on the :ref:`preterm birth cause model document <2021_cause_preterm_birth_mncnh>` (see note about the calculation of the normalizing constant)
    - LBWSG exposure specific to birth age group
    - LBWSG relative risk values are interpolated and capped at the location/draw/age group/sex-specific maximum RR value (:math:`\text{RR}_\text{max}`)

  * **For the calculation of the late neonatal PAF:**

    1. Assign all-cause mortality risk values to each simulated individual using the early neonatal LBWSG RR values (interpolated and capped), early neonatal LBWSG PAF (as calculated above), and early neonatal all-cause mortality risk
    2. Take a "time step" of ~7 days that advances the population past the early neonatal mortality application, but before late neonatal mortality has been applied. Mortality should be applied (simulants should die) according to their LBWSG-affected all-cause mortality risk values (no need to consider cause-specific mortality and/or interventions in this step).
    3. Record the number of deaths that occur in each LBWSG exposure category :math:`\text{cat}` as :math:`n^\text{deaths}_\text{cat}`
    4. Among the surviving simulants, re-assign LBWSG RR values using the late neonatal interpolated RR values and the late neonatal-specific RR caps
    5. Use the RR values from step 4 (among surviving simulants only) for the calculation of the mean relative risk among the given LBWSG exposure category, :math:`E(\text{RR})_\text{cat}`
    6. To calculate the overall population mean RR (:math:`E(\text{RR})_\text{population}`), take a weighted average of the category-specific mean relative risk values weighted by the category-specific LBWSG exposure prevalence AT BIRTH (:math:`p^\text{birth}_\text{cat}`) multiplied by the fraction of simulants who survived past the early neonatal age group, equal to: :math:`\frac{n_\text{cat} - n^\text{deaths}_\text{cat}}{n_\text{cat}}`, where :math:`n_\text{cat}` is the number of simulants initialized into each category before mortality was applied (the number of grid points in each category). Note that :math:`n_\text{cat}` will not vary by LBWSG exposure category.

So,

.. _details_of_the_lbwsg_paf_calculation_equation:

.. math::

  E(\text{RR})_\text{population} = \frac{\sum_{\text{cat}} E(\text{RR})_\text{cat} \times p^\text{birth}_\text{cat} \times \frac{n_\text{cat} - n^\text{deaths}_\text{cat}}{n_\text{cat}}}{\sum_{\text{cat}} p^\text{birth}_\text{cat} \times \frac{n_\text{cat} - n^\text{deaths}_\text{cat}}{n_\text{cat}}}

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

Neonatal mortality risk (due to all causes and at the cause-specific level) in simulation should match corresponding quantity as derived from GBD estimates.

Relative Risk of neonatal death at specific categories of LBWSG exposure should be within 10% of same ratio derived from GBD.  (We don't expect it to match exactly because of (1) our interpolation of the RRs, and (2) we use a constant mortality hazard at each BW-GA level, rather than the GBD's more complex model.)

Using the interactive simulation, verify that other causes mortality (and/or any future modeled unaffected subcauses) varies by LBWSG exposure but does not change in a scenario with added coverage of a LBWSG-affecting intervention such as IFA/MMS or IV iron. Additionally, verify that mortality due to modeled affected causes (including preterm, sepsis, and encephalopathy) varies as expected according to LBWSG exposure and is appropriately modified by new LBWSG-affecting intervention coverage.

References
----------
