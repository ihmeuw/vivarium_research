.. _2021_cause_neonatal_encephalopathy_mncnh:

==============================================================
Neonatal encephalopathy due to birth asphyxia and birth trauma
==============================================================

Disease Overview
----------------
Neonatal encephalopathy (NE) due to birth asphyxia and birth trauma, also called
hypoxic-ischaemic encephalopathy, is defined as injury to the brain in the first
few moments or days of life in an infant born at term. NE has multiple
aetiologies and is defined more by its symptoms -- abnormal neurological
function, including reduced level of consciousness, seizures, depression of tone
and reflexes, or difficulty maintaining respiration -- than its origin. NE can
occur when an infant is deprived of oxygen during delivery or sustains physical
trauma to the head, among other causes.

.. todo::

   Add more information about neonatal encephalopathy. Here are some informative
   links, found by googling "neonatal encephalopathy":

   - https://www.rileychildrens.org/health-info/neonatal-encephalopathy
   - https://www.uptodate.com/contents/clinical-features-diagnosis-and-treatment-of-neonatal-encephalopathy
   - https://pediatrics.aappublications.org/content/133/5/e1482
   - https://en.wikipedia.org/wiki/Neonatal_encephalopathy

GBD 2021 Modeling Strategy
--------------------------

We focus on only the mortality due to this cause, which is estimated together with all other cause-specific mortality through the CODEm process.

The nonfatal part is described here:
`GBD 2021 Non-fatal Neonatal Infections Modeling Strategy <https://www.healthdata.org/sites/default/files/methods_appendices/2021/Neonatal_nonfatal_GBD2020_final_RS_updated_Jul_11_AC.pdf>`_ (pages 13-21).

Cause Hierarchy
+++++++++++++++


- All causes (c_294) [level 0]

  - Communicable, maternal, neonatal, and nutritional diseases (c_295)

    - Maternal and neonatal disorders (c_962)

      - Neonatal disorders (c_380)
          
        - **Neonatal encephalopathy due to birth asphyxia and birth trauma (c_382) [level 4]**


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

Scope
+++++

The Level 4 neonatal conditions included in the MNCNH Portfolio model are closely linked to the 
:ref:`Overall Neonatal Disorders Model <2021_cause_neonatal_disorders_mncnh>`.  Since the LBWSG Risk Factor has an effect on overall neonatal mortality, this subcause will define a birth-weight- and gestational-age-specific cause specific mortality rate that the Overall Neonatal Disorders Model can use.  This risk-specific CSMR might then be further individualized based on treatment coverage and efficacy, to ensure that individuals who have access to a treatment like emergency C-section have a lower risk of mortality from neonatal encephalopathy than those who do not.


Assumptions and Limitations
+++++++++++++++++++++++++++

Focusing solely on YLLs will likely underestimate the total burden of this cause and, consequently, the DALYs averted by interventions that reduce prevalence and mortality due to it. However, we anticipate this underestimation to be less than 10%.

We assume that the relationship between LBWSG and encephalopathy CSMR follow the relationship between LBWSG and all-cause mortality during the neonatal period, and could be refined with additional data.

Cause Model Decision Graph
++++++++++++++++++++++++++

We are not modeling Neonatal Encephalopathy dynamically as a finite state machine, but we can draw an directed 
graph to represent the collapsed decision tree  
representing this cause. Unlike a state machine representation, the values on the 
transition arrows represent decision probabilities rather than rates per 
unit time.
Note that these probabilities are not used directly in the model and are included here only for clarity.  If they end up being more confusing than enlightening, we should delete them.


.. graphviz::

    digraph NN_encephalopathy_decisions {
        rankdir = LR;
        lb [label="live birth", style=dashed]
        nn_alive [label="neonate did not die\nof encephalopathy"]
        nn_dead [label="neonate died of\nencephalopathy"]

        lb -> nn_alive  [label = "1 - csmrisk"]
        lb -> nn_dead [label = "csmrisk"]
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
    * - neonate did not die of encephalopathy
      - The child simulant did not die of encephalopathy within the first 28 days of life
    * - neonate died of encephalopathy
      - The child simulant died of encephalopathy within the first 28 days of life

.. list-table:: Transition Probability Definitions
    :widths: 1 5 20
    :header-rows: 1

    * - Symbol
      - Name
      - Definition
    * - csmrisk
      - encephalopathy mortality risk
      - The probability that a simulant who was born alive dies from this cause during the neonatal period


Modeling Strategy
+++++++++++++++++

The Neonatal Encephalopathy submodel requires only the birth-weight- and gestation-age-stratified cause specific mortality risk during the early and late neonatal periods.

The way these CSMRisks are used is the same for all subcauses, and therefore is included in the :ref:`Overall Neonatal Disorders Model <2021_cause_neonatal_disorders_mncnh>` page.  This page describes the birth-weight- and gestational-age-specific cause specific mortality risks that are used for this cause on that page, :math:`\text{CSMR}^{\text{encephalopathy}}_{\text{BW},\text{GA}}`.
The formula is:

.. math::
    \begin{align*}
    \text{CSMRisk}_{\text{BW},\text{GA}}
    &=
    \text{CSMRisk} \cdot \text{RR}_{\text{BW},\text{GA}} \cdot Z
    \end{align*}

where 
:math:`\text{CSMRrisk}` is the cause-specific mortality risk for encephalopathy,
:math:`\text{RR}_{\text{BW},\text{GA}}` is the relative risk of all-cause mortality for a birth weight of :math:`\text{BW}` and gestational age of :math:`\text{GA}`, and :math:`Z` is a normalizing constant selected so that :math:`\int_{\text{BW}} \int_{\text{GA}} \text{RR}_{\text{BW},\text{GA}} \cdot Z = 1`.

.. note::
  the choice to use :math:`\text{RR}_{\text{BW},\text{GA}}` in this equation is essentially arbitrary, and it could be replaced by any other nonnegative "weight function" :math:`w(\text{BW},\text{GA})` as long it doesn't lead to a negative "other causes" mortality hazard.  But with this choice, :math:`Z` is equal to the :math:`1-\text{PAF}` of LBWSG on all-cause mortality.

Each individual simulant :math:`i` has their own :math:`\text{CSMRisk}_i` that might be different from :math:`\text{CSMRisk}_{\text{BW}_i,\text{GA}_i}` (meaning the average birth-weight- and gestational-age-specific CSMRisk for simulants with the birth weight and gestational age matching simulant :math:`i`.  We recommend implementing this as a pipeline eventually because it will be modified by interventions (or access to interventions) relevant to this subcause.  (Until we implement those, we will have :math:`\text{CSMRisk}_{i} = \text{CSMRisk}_{\text{BW}_i,\text{GA}_i}`, though.)

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
    * - enn_all_cause_death_count
      - Count of deaths due to all causes in the early neonatal age group
      - GBD: source='codcorrect', metric_id=1, cause_id=294
      - 
    * - enn_death_count
      - Count of deaths due to cause neonatal encephalopathy in the early neonatal age group
      - GBD: source='codcorrect', metric_id=1, cause_id=382
      - 
    * - lnn_death_count
      - Count of deaths due to cause neonatal encephalopathy in the late neonatal age group
      - GBD: source='codcorrect', metric_id=1, cause_id=382
      - 
    * - live_birth_count
      - Count of live births
      - GBD: covariate_id = 1106
      - 
    * - csmrisk_enn
      - neonatal encephalopathy mortality risk in the early neonatal age group
      - enn_death_count / live_birth_count
      - 
    * - csmrisk_lnn
      - neonatal encephalopathy mortality risk in the late neonatal age group
      - lnn_death_count / (live_birth_count - enn_all_cause_death_count)
      - 
    * - :math:`CSMRisk`
      - neonatal encephalopathy mortality risk
      - either csmrisk_enn or csmrisk_lnn depending on the simulant's age group
      - 
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

The years of life lost (YLLs) due to Neonatal Encephalopathy
are calculated assuming age :math:`a=14 \text{ days}`, and 
equals :math:`\operatorname{TMRLE}(a) - a`, where
:math:`\operatorname{TMRLE}(a)` is the theoretical minimum risk life
expectancy for a person of age :math:`a`.

Years lived with disability
"""""""""""""""""""""""""""

For simplicity, we will not include YLDs in this model.


Validation Criteria
+++++++++++++++++++

* Neonatal Encephalopathy deaths per live birth in simulation should match GBD estimates.

* Relative Risk of Neonatal Encephalopathy death due to LBWSG should match overall neonatal mortality RR.

References
----------

`GBD 2021 Non-fatal Neonatal Infections Modeling Strategy <https://www.healthdata.org/sites/default/files/methods_appendices/2021/Neonatal_nonfatal_GBD2020_final_RS_updated_Jul_11_AC.pdf>`_ (pages 13-21).


`GBD 2021 Neonatal Encephalopathy Factsheet <https://www.healthdata.org/research-analysis/diseases-injuries-risks/factsheets/2021-neonatal-encephalopathy-due-birth>`_.
