.. _2021_cause_neonatal_disorders_mncnh:

===================================
Neonatal disorders: GBD 2021, MNCNH
===================================

.. note::

    This page is adapted from the :ref:`Maternal disorders: GBD 2021, MNCNH <2021_cause_maternal_disorders_mncnh>` page and is also part of the :ref:`MNCNH Portfolio project
    <2024_concept_model_vivarium_mncnh_portfolio>`.  In this work we are modeling
    several neonatal subcauses (see Modeled
    Subcauses) which is complicated because the LBWSG risk factor in GBD acts on overall neonatal mortality.

.. contents::
   :local:

Modeled Subcauses
-----------------

.. toctree::
    :maxdepth: 1

    neonatal_sepsis
    neonatal_encephalopathy
    preterm_birth

The remainder of this document describes neonatal disorders overall and
the strategy for capturing the burden of the neonatal subcauses to calibrate to all-cause mortality, preterm paf-of-one, and LBWSG risk.

Disease Overview
----------------
This model captures deaths due to any cause that occur during the first 28 days of life. The Low Birth Weight and Short Gestation (LBWSG) risk factor provides a single relative risk for all neonatal deaths, and the way we plan to use it is by applying to this all-cause neonatal mortality model.

GBD 2021 Modeling Strategy
--------------------------

I guess this comes from the mortality team.

Cause Hierarchy
+++++++++++++++

- All causes (c_294) [level 0]

  - Communicable, maternal, neonatal, and nutritional diseases (c_295)

    - Maternal and neonatal disorders (c_962)

      - **Neonatal disorders (c_380)** [level 3]


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
     - True
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
This model is designed to estimate deaths and YLLs due to neonatal disorders that could be
averted by a suite of intervention that affect sepsis, respiratory stress disorder, and perhaps encephalopathy, as well as :ref:`Low Birth Weight and Short
Gestation (LBWSG) <2019_risk_effect_lbwsg>`. The model groups together all of the
neonatal sub-causes, and is fatal-only (no disability). The rationale for this
design is as follows:

1. The LBWSG risk factor in GBD acts on overall neonatal mortality, so we need to model all-cause neonatal mortality to calibrate to all-cause mortality, preterm paf-of-one, and LBWSG risk.

2. The nonfatal burden of neonatal causes is around 10% of the total burden, so we will have a much simpler model without missing too much by excluding YLDs.

Scope
+++++

1. Capture neonatal deaths, and the relationship with LBWSG.
2. Capture the deaths averted by interventions that reduce the cause-specific mortality rates of preterm with respiratory distress and sepsis (and perhaps encephalopathy).
3. Do not capture nonfatal burden.


Assumptions and Limitations
+++++++++++++++++++++++++++

The excluded nonfatal portion of the burden is small (around 10% of the total burden).

The evidence base for identifying the level 4 subcauses is not as solid as I would like.

Preterm must be split into with and without respiratory distress syndrome (RDS) outside of GBD, since GBD does not distinguish preterms deaths with and without RDS.

Cause Model Diagram
+++++++++++++++++++

We are not modeling neonatal disorders dynamically as a finite state machine, but we can draw an directed 
graph to represent the collapsed decision tree  
representing this cause. Unlike a state machine representation, the values on the 
transition arrows represent decision probabilities rather than rates per 
unit time.


.. graphviz::

    digraph OL_decisions {
        rankdir = LR;
        lb [label="live birth", style=dashed]
        nn_alive [label="neonate survived"]
        nn_dead [label="neonate died"]

        lb -> nn_alive  [label = "1 - mr"]
        lb -> nn_dead [label = "mr"]
    }

.. list-table:: State Definitions
    :widths: 7 20
    :header-rows: 1

    * - State
      - Definition
    * - live birth
      - The parent simulant has given birth to a live child simulant (which
        is determined in the
        intrapartum step of the :ref:`pregnancy model
        <other_models_pregnancy_closed_cohort_mncnh>`)
    * - neonate survived
      - The child simulant survived for the first 28 days of life
    * - neonate died
      - The child simulant died within the first 28 days of life

.. list-table:: Transition Probability Definitions
    :widths: 1 5 20
    :header-rows: 1

    * - Symbol
      - Name
      - Definition
    * - mr
      - mortality risk
      - The probability that a simulant who was born alive dies during the neonatal period


Data Tables
+++++++++++

The neonatal death model requires only the probability of death (aka "mortality risk") for use
in the decision graph. This will be computed as

.. math::
    \text{mr} = \frac{\text{neontal deaths}}{\text{live births}}
        = \frac{\text{(neonatal mortality rate)} \cdot  \text{(neonatal person-time)}}
            {\sum_{\text{age groups}} \text{ASFR} \cdot (\text{age-specific person-time})
            }.


The following table shows the data needed from GBD for these
calculations.

.. note::

  All quantities pulled from GBD in the following table are for a
  specific year, sex, age group, and location.

.. list-table:: Data values and sources
    :header-rows: 1

    * - Variable
      - Definition
      - Value or source
      - Note
    * - mr
      - neonatal mortality risk per live birth
      - deaths_c380 / live_births
      - The value of ir is a probabiity in [0,1]. Denominator includes
        live births only.
    * - deaths_c380
      - cause-specific deaths due to neonatal disorders
      - codcorrect
      - just for neonatal age groups
    * - live_births
      - birth rate (live births only)
      - sum(ASFR*population)
      - Units are total live births  per person-year
    * - ASFR
      - Age-specific fertility rate
      - get_covariate_estimates: coviarate_id=13
      - Assume lognormal distribution of uncertainty. Units in GBD are
        live births per person, or equivalently, per person-year.
    * - population
      - average population in a given year
      - get_population
      - Specific to age/sex/location/year demographic group. Numerically
        equal to person-time for the year.



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
