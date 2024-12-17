.. _2021_cause_preterm_birth_mncnh:

======================
Neonatal Preterm Birth
======================

Disease Overview
----------------

Preterm birth is defined as live birth before 37 completed weeks of gestation. It is often subdivided further into three categories of preterm birth, based on gestational age: extremely preterm (<28 weeks), very preterm (28 to <32 weeks), and moderate to late preterm (32 to <37 weeks).

Respiratory distress syndrome (RDS) is a common complication of preterm birth, particularly in infants born before 28 weeks of gestation. It is caused by the insufficient production of surfactant, a substance that helps keep the lungs inflated. RDS can lead to severe breathing difficulties and requires immediate medical intervention, often including respiratory support and surfactant replacement therapy.

GBD 2021 Modeling Strategy
--------------------------

In GBD, "Preterm" is used to describe any newborn baby born at less than 37 completed weeks of gestation, while "short gestation" refers to all gestational ages below the theoretical minimal risk exposure level (TMREL) for the LBWSG risk. 

We focus on only the mortality due to this cause, which is estimated together with all other cause-specific mortality through the CODEm process.

The nonfatal part is described here:
`GBD 2021 Non-fatal Neonatal Infections Modeling Strategy <https://www.healthdata.org/sites/default/files/methods_appendices/2021/Neonatal_nonfatal_GBD2020_final_RS_updated_Jul_11_AC.pdf>`_ (pages 1-12).

Cause Hierarchy
+++++++++++++++


- All causes (c_294) [level 0]

  - Communicable, maternal, neonatal, and nutritional diseases (c_295)

    - Maternal and neonatal disorders (c_962)

      - Neonatal disorders (c_380)
          
        - **Neonatal preterm birth (c_381) [level 4]**


Restrictions
++++++++++++

The following table describes restrictions on the effects of this cause
(such as being only fatal), as well as restrictions on the age
and sex of simulants to which different aspects of the cause model apply.

.. list-table:: Restrictions
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
     -
   * - YLD only
     - False
     -
   * - YLL age group start
     - Early neonatal
     - GBD age group id 2
   * - YLL age group end
     - Post neonatal
     - GBD age group id 4

Vivarium Modeling Strategy
--------------------------

Preterm birth is a PAF-of-one cause, meaning it is 100% attributable to the :ref:`Low Birth Weight and Short Gestation (LBWSG) <2019_risk_effect_lbwsg>` risk factor.  It is important that only simulants with a gestational age of less than 38 weeks are able to accrue DALYs from this cause.

Key interventions in the MNCNH portfolio are expected to be relevant to preterm birth **with RDS** and therefore we further need to decompose preterm birth burden into "with RDS" and "without RDS" components.

Scope
+++++

The Level 4 neonatal conditions included in the MNCNH Portfolio model are closely linked via the 
:ref:`Overall Neonatal Disorders Model <2021_cause_neonatal_disorders_mncnh>`.  Since the LBWSG Risk Factor has a PAF-of-one relationship with this Preterm Birth cause, we will need to ensure that the risk-stratified cause-specific mortality rates are zero for non-preterm categories, and their weighted average matches the overall cause-specific mortality rate.  This will produce internally consistent mortality risk values for all neonatal subcauses and LBWSG exposure levels. These risks can then be further individualized based on treatment coverage and efficacy, to ensure that individuals who have access to a specific existing or hypothetical treatment have a lower risk of mortality.

Assumptions and Limitations
+++++++++++++++++++++++++++

Focusing solely on YLLs will likely underestimate the total burden of this cause and, consequently, the DALYs averted by interventions that reduce prevalence and mortality due to it. However, we anticipate this underestimation to be less than 10%.

GBD does not provide an estimate of the proportion of preterm births that are associated with RDS. We will need to make an assumption about this proportion based on data we obtain from another source.

We might need to include the prevalence of Preterm Birth Complications, in order to quantify the cost and impact of corticosteroids intervention, which prevents RDS incidence (as opposed to the CPAP intervention, which reduces on mortality among neonates who have RDS).

Cause Model Decision Graph
++++++++++++++++++++++++++

We are not modeling Preterm Birth dynamically as a finite state machine, but we can draw an directed 
graph to represent the collapsed decision tree  
representing this cause. Unlike a state machine representation, the values on the 
transition arrows represent decision probabilities rather than rates per 
unit time.


.. graphviz::

    digraph NN_preterm_decisions {
        rankdir = LR;
        lb [label="live birth", style=dashed]
        nn_alive [label="neonate did not\ndie of preterm"]
        nn_dead_RDS [label="neonate died\nof preterm with RDS"]
        nn_dead_no_RDS [label="neonate died\nof preterm without RDS"]

        lb -> nn_alive  [label = "1 - mr_w - mr_wo"]
        lb -> nn_dead_RDS [label = "mr_w"]
        lb -> nn_dead_no_RDS [label = "mr_wo"]
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
    * - neonate did not die of preterm
      - The child simulant did not die of preterm birth complications during the first 28 days of life
    * - neonate died with RDS
      - The child simulant died due to preterm birth with respiratory distress syndrome within the first 28 days of life
    * - neonate died without RDS
      - The child simulant died due to preterm birth **without** respiratory distress syndrome within the first 28 days of life

.. list-table:: Transition Probability Definitions
    :widths: 1 5 20
    :header-rows: 1

    * - Symbol
      - Name
      - Definition
    * - mr_w
      - preterm mortality risk
      - The probability that a simulant who was born alive dies from preterm with RDS during the neonatal period
    * - mr_wo
      - preterm mortality risk
      - The probability that a simulant who was born alive dies from preterm without RDS during the neonatal period


Data Tables
+++++++++++

The Preterm Birth model requires only the probability of death (aka "mortality risk") for use
in the decision graph. This will be computed from the overall neonatal mortality risk and the cause-specific mortality fraction.

Since this is a PAF-of-one cause, the calculation must take into account the "structural zeros" representing no mortality risk for simulants with a gestational age of 38 or more weeks.

The details of this calculation require information about other subcauses as well as preterm, and therefore are included in the :ref:`Overall Neonatal Disorders Model <2021_cause_neonatal_disorders_mncnh>` page.  This page describes the birth-weight- and gestational-age-specific cause specific mortality rates that are used for this cause on that page, :math:`\text{CSMR}^{\text{preterm with RDS}}_{\text{BW},\text{GA}}` and :math:`\text{CSMR}^{\text{preterm without RDS}}_{\text{BW},\text{GA}}`. In both cases, the formula is:

.. math::
    \begin{align*}
    \text{CSMR}^{k}_{\text{BW},\text{GA}}
    &=
    \begin{cases}
    \text{CSMR}\cdot f_k \cdot \text{RR}_{\text{BW},\text{GA}} \cdot Z, & \text{if BW} < 38; \\
    0, & \text{if BW} \geq 38;
    \end{cases}
    \end{align*}

where :math:`k` is the subcause of interest (preterm birth with or without RDS),
:math:`\text{CSMR}` is the cause-specific mortality rate for preterm birth complications,
:math:`f_k` is the fraction of preterm deaths due to subsubcause :math:`k` (with or without RDS), :math:`\text{RR}_{\text{BW},\text{GA}}` is the relative risk of all-cause mortality for a birth weight of :math:`\text{BW}` and gestational age of :math:`\text{GA}`, and :math:`Z` is a normalizing constant selected so that :math:`\int_{\text{BW<38}} \int_{\text{GA}} \text{RR}_{\text{BW},\text{GA}} \cdot Z = 1`.

The following table shows the data needed for these
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
    * - mr_total
      - neonatal mortality risk per live birth
      - The mortality risk from the :ref:`Overall Neonatal Disorders Model <2021_cause_neonatal_disorders_mncnh>`
      - The value of mr is a probability in [0,1]. Denominator includes live births only.
    * - CSMR
      - cause-specific mortality rate of preterm birth complications
      - csmr_c381
      - from GBD (CodCorrect)
    * - frac_rds
      - fraction of preterm deaths with RDS
      - XX%
      - This value is not available from GBD and will need to be estimated based on other data sources.
    * - RR_BW_GA
      - Relative Risk of all-cause mortality for a birth weight of BW and gestational age of GA
      - interpolated from GBD data
      - See :ref:`Low Birth Weight and Short Gestation (LBWSG) <2019_risk_effect_lbwsg>` page for details.
    * - Z
      - Normalizing constant
      - calculated from RR_BW_GA
      - (This also needs the LBWSG exposure distribution, doesn't it?)


Calculating Burden
++++++++++++++++++

Years of life lost
"""""""""""""""""""

The years of life lost (YLLs) due to Preterm Birth (with and without RDS)
are calculated assuming age :math:`a=14 \text{ days}`, and 
equals :math:`\operatorname{TMRLE}(a) - a`, where
:math:`\operatorname{TMRLE}(a)` is the theoretical minimum risk life
expectancy for a person of age :math:`a`.

Years lived with disability
"""""""""""""""""""""""""""

For simplicity, we will not include YLDs in this model.


Validation Criteria
+++++++++++++++++++

* Preterm deaths per live birth in simulation should match GBD estimates.

* No preterm deaths for simulants with LBWSG categories for gestational ages of 38 weeks or greater.

References
----------

`GBD 2021 Non-fatal Neonatal Infections Modeling Strategy <https://www.healthdata.org/sites/default/files/methods_appendices/2021/Neonatal_nonfatal_GBD2020_final_RS_updated_Jul_11_AC.pdf>`_ (pages 1-12).


`GBD 2021 Neonatal Preterm Factsheet <https://www.healthdata.org/research-analysis/diseases-injuries-risks/factsheets/2021-neonatal-preterm-birth-level-4-disease>`_.
