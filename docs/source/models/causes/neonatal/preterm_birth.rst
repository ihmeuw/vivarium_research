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

Preterm birth is a PAF-of-one cause, meaning it is 100% attributable to the :ref:`Low Birth Weight and Short Gestation (LBWSG) <2019_risk_effect_lbwsg>` risk factor.  It is important that only simulants with a gestational age of less than 37 weeks are able to accrue DALYs from this cause.

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
Note that these probabilities are not used directly in the model and are included here only for clarity.  If they end up being more confusing than enlightening, we should delete them.


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


Modeling Strategy
+++++++++++++++++

The Preterm Birth submodel requires only the birth-weight- and gestation-age-stratified cause specific mortality rates for preterm birth complications with and without respiratory distress syndrome during the early and late neonatal periods.

Since this is a PAF-of-one cause, the calculation must take into account the "structural zeros" representing no mortality risk for simulants with a gestational age of 37 or more weeks.

The way these CSMRs are used is the same for all subcauses, and therefore is included in the :ref:`Overall Neonatal Disorders Model <2021_cause_neonatal_disorders_mncnh>` page.  This page describes the birth-weight- and gestational-age-specific cause specific mortality rates that are used for this cause on that page, :math:`\text{CSMR}^{\text{preterm with RDS}}_{\text{BW},\text{GA}}` and :math:`\text{CSMR}^{\text{preterm without RDS}}_{\text{BW},\text{GA}}`. In both cases, the formula is:

.. math::
    \begin{align*}
    \text{CSMR}^{k}_{\text{BW},\text{GA}}
    &=
    \begin{cases}
    \text{CSMR}\cdot f_k \cdot \text{RR}_{\text{BW},\text{GA}} \cdot Z, & \text{if BW} < 37; \\
    0, & \text{if BW} \geq 37;
    \end{cases}
    \end{align*}

where :math:`k` is the subcause of interest (preterm birth with or without RDS),
:math:`\text{CSMR}` is the cause-specific mortality rate for preterm birth complications,
:math:`f_k` is the fraction of preterm deaths due to subsubcause :math:`k` (with or without RDS), :math:`\text{RR}_{\text{BW},\text{GA}}` is the relative risk of all-cause mortality for a birth weight of :math:`\text{BW}` and gestational age of :math:`\text{GA}`, and :math:`Z` is a normalizing constant selected so that :math:`\int_{\text{BW<37}} \int_{\text{GA}} \text{RR}_{\text{BW},\text{GA}} \cdot Z = 1`.

.. note::
  the choice to use :math:`\text{RR}_{\text{BW},\text{GA}}` in this equation is essentially arbitrary, and it could be replaced by any other nonnegative "weight function" :math:`w(\text{BW},\text{GA})` as long it doesn't lead to a negative "other causes" mortality hazard.
  
  If we get more specific data about RDS or non-RDS preterm death rates stratified by gestational age, we may want to change these weights to reflect that. The fact that the weight function is arbitrary from a mathematical perspective means that we have a lot of flexibility here to adjust things to work out how we want. Choosing the RRs for the weight function makes the conditional probability of death from this cause equal across (preterm) LBWSG categories, given that the neonate dies, which may or may not be what we want.

  Also, it is possible that the choice of :math:`\text{RR}_{\text{BW},\text{GA}}` might not work for every subcause. Since we're moving all the preterm mortality into the preterm categories, there is less room there for mortality from other causes, so depending on the hazards involved, we may need to shift mortality from some other causes into the non-preterm categories in order to avoid making things negative.
  It is even possible that there is no way to make this work consistently, meaning that any choice of weight function would lead to negative mortality hazards.  We expect that this will not be an issue, but we haven't actually tried it with the real data yet.

Each individual simulant :math:`i` has their own :math:`\text{CSMR}_i^k` that might be different from :math:`\text{CSMR}^k_{\text{BW}_i,\text{GA}_i}` (meaning the average birth-weight- and gestational-age-specific CSMR for simulants with the birth weight and gestational age matching simulant :math:`i`.  We recommend implementing this as a pipeline eventually because it will be modified by interventions (or access to interventions) relevant to this subcause.  (Until we implement those, we will have :math:`\text{CSMR}_{i}^k = \text{CSMR}^k_{\text{BW}_i,\text{GA}_i}`, though.)

The following table shows the data needed for these
calculations.

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
    * - :math:`\text{CSMR}`
      - cause-specific mortality rate of preterm birth complications
      - csmr_c381
      - from GBD (CodCorrect)
    * - :math:`f_\text{preterm w RDS}`
      - fraction of preterm deaths with RDS
      - 85%
      - This value is not available from GBD and will need to be estimated based on other data sources. Tentative value of 85% included here is based on Table 4 in `this paper <https://www.sciencedirect.com/science/article/pii/S2214109X19302207>`_.
    * - :math:`f_\text{preterm wo RDS}`
      - fraction of preterm deaths without RDS
      - :math:`1 - f_\text{preterm w RDS}`
      - fractions sum to 1.0.
    * - :math:`\text{RR}_{\text{BW},\text{GA}}`
      - Relative Risk of all-cause mortality for a birth weight of BW and gestational age of GA
      - interpolated from GBD data
      - See :ref:`Low Birth Weight and Short Gestation (LBWSG) <2019_risk_effect_lbwsg>` page for details.
    * - :math:`Z`
      - Normalizing constant
      - calculated from :math:`\text{RR}_{\text{BW},\text{GA}}` and LBWSG exposure distribution.
      - see above for details.


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

* No preterm deaths for simulants with LBWSG categories for gestational ages of 37 weeks or greater.

* Relative Risk of preterm with and without RDS deaths due to LBWSG should match overall neonatal mortality RR (when comparing between categories with :math:`GA < 37` weeks).

* Fraction of preterm deaths with RDS should match assumption in data table above.

References
----------

`GBD 2021 Non-fatal Neonatal Infections Modeling Strategy <https://www.healthdata.org/sites/default/files/methods_appendices/2021/Neonatal_nonfatal_GBD2020_final_RS_updated_Jul_11_AC.pdf>`_ (pages 1-12).


`GBD 2021 Neonatal Preterm Factsheet <https://www.healthdata.org/research-analysis/diseases-injuries-risks/factsheets/2021-neonatal-preterm-birth-level-4-disease>`_.
