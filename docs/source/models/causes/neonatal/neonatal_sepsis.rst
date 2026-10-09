.. _2021_cause_neonatal_sepsis_mncnh:

=============================================
Neonatal sepsis and other neonatal infections
=============================================

Disease Overview
----------------
Neonatal sepsis and other neonatal infections are infections during the neonatal period that advance to
a systemic bloodstream infection (sepsis) and infections that occur during the neonatal period that are
not already modelled separately in the GBD.  For the MNCNH portfolio, we will include only mortality and not morbidity from this cause.

.. todo::

   decide if for this model it would be appropriate to also include LRI and diarrheal diseases in this cause; decide based on evidence for antibiotics as a treatment for these conditions in neonates.

GBD 2021 Modeling Strategy
--------------------------

We focus on only the mortality due to this cause, which is estimated together with all other cause-specific mortality through the CODEm process.

The nonfatal part is described here:
`GBD 2021 Non-fatal Neonatal Infections Modeling Strategy <https://www.healthdata.org/sites/default/files/methods_appendices/2021/Neonatal_nonfatal_GBD2020_final_RS_updated_Jul_11_AC.pdf>`_ (pages 32-39).

Cause Hierarchy
+++++++++++++++

- All causes (c_294) [level 0]

  - Communicable, maternal, neonatal, and nutritional diseases (c_295)

    - Maternal and neonatal disorders (c_962)

      - Neonatal disorders (c_380)
          
        - **Neonatal sepsis and other neonatal infections (c_383) [level 4]**



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

Assumptions and Limitations
+++++++++++++++++++++++++++

Focusing solely on YLLs will likely underestimate the total burden of sepsis and, consequently, the DALYs averted by interventions that reduce sepsis risk. However, we anticipate this underestimation to be less than 10%.

We assume that the relationship between LBWSG and sepsis CSMR follow the relationship between LBWSG and all-cause mortality during the neonatal period, and could be refined with additional data.


Cause Model Decision Graph
++++++++++++++++++++++++++

We are not modeling Neonatal Sepsis dynamically as a finite state machine, but we can draw an directed 
graph to represent the collapsed decision tree  
representing this cause. Unlike a state machine representation, the values on the 
transition arrows represent decision probabilities rather than rates per 
unit time.
Note that these probabilities are not used directly in the model and are included here only for clarity.  If they end up being more confusing than enlightening, we should delete them.


.. graphviz::

    digraph NN_sepsis_decisions {
        rankdir = LR;
        lb [label="live birth", style=dashed]
        nn_alive [label="neonate did not \ndie of sepsis"]
        nn_dead [label="neonate died \nof sepsis"]

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
    * - neonate did not die of sepsis
      - The child simulant did not die of sepsis within the first 28 days of life
    * - neonate died of sepsis
      - The child simulant died of sepsis within the first 28 days of life

.. list-table:: Transition Probability Definitions
    :widths: 1 5 20
    :header-rows: 1

    * - Symbol
      - Name
      - Definition
    * - csmrisk
      - sepsis mortality risk
      - The probability that a simulant who was born alive dies from this cause during the neonatal period


Modeling Strategy
+++++++++++++++++

The Neonatal Sepsis submodel needs to produce cause-specific mortality risks (CSMRisks) for sepsis for each simulant.

The way these CSMRisks are used is the same for all subcauses, and therefore is included in the :ref:`Overall Neonatal Disorders Model <2021_cause_neonatal_disorders_mncnh>` page.
This page describes the CSMRisks modified by birth weight and gestational age,
but not modified by interventions, :math:`\text{CSMRisk}_{i,\text{sepsis}}^0`.
The other value used in the overall neonatal disorders model is
:math:`\text{CSMRisk}_{i,\text{sepsis}}`, which is the value after direct modifications by interventions.
These modifications are described on the relevant intervention pages.

The formula for :math:`\text{CSMRisk}_{i,\text{sepsis}}^0` is:

.. math::
    \text{CSMRisk}_{i,\text{sepsis}}^0
    =
    \text{LBWSG}(\text{CSMRisk}_{\text{age}_i,\text{sex}_i}, \text{BW}_i, \text{GA}_i)

where
:math:`\text{LBWSG}` is a function defined on the :ref:`Overall Neonatal Disorders Model <2021_cause_neonatal_disorders_mncnh>` page which applies the risk effects of LBWSG,
:math:`\text{CSMRisk}_{\text{age},\text{sex}}` is the population-level cause-specific mortality risk for sepsis for a given age group and sex,
:math:`\text{age}_i` and :math:`\text{sex}_i` are the age group and sex of simulant :math:`i`,
and :math:`\text{BW}_i` and :math:`\text{GA}_i` are the birth weight and gestational age respectively of simulant :math:`i` (after intervention effects have been applied).

As described on the :ref:`Overall Neonatal Disorders Model <2021_cause_neonatal_disorders_mncnh>`
page, the :math:`\text{LBWSG}` function makes use of the GBD relative risks of LBWSG (which are the
same across all affected causes, including neonatal sepsis) and a custom-calculated PAF derived from
these relative risks.
GBD uses all-cause mortality data without adjustment for confounding to inform these relative risks,
but assumes they represent the *causal* effect of LBWSG on each affected cause, and we do the same here.

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
      - Count of deaths due to cause neonatal sepsis in the early neonatal age group
      - GBD: source='codcorrect', metric_id=1, cause_id=383
      - 
    * - lnn_death_count
      - Count of deaths due to cause neonatal sepsis in the late neonatal age group
      - GBD: source='codcorrect', metric_id=1, cause_id=383
      - 
    * - live_birth_count
      - Count of live births
      - GBD: covariate_id = 1106
      - 
    * - csmrisk_enn
      - neonatal sepsis mortality risk in the early neonatal age group
      - enn_death_count / live_birth_count
      - 
    * - csmrisk_lnn
      - neonatal sepsis mortality risk in the late neonatal age group
      - lnn_death_count / (live_birth_count - enn_all_cause_death_count)
      - 
    * - :math:`\text{CSMRisk}`
      - neonatal sepsis mortality risk
      - either csmrisk_enn or csmrisk_lnn depending on the simulant's age group
      - 

Calculating Burden
++++++++++++++++++

Years of life lost
"""""""""""""""""""

The years of life lost (YLLs) due to Neonatal Sepsis
are calculated assuming age :math:`a=14 \text{ days}`, and 
equals :math:`\operatorname{TMRLE}(a) - a`, where
:math:`\operatorname{TMRLE}(a)` is the theoretical minimum risk life
expectancy for a person of age :math:`a`.

Years lived with disability
"""""""""""""""""""""""""""

For simplicity, we will not include YLDs in this model.


Validation Criteria
+++++++++++++++++++

For the MNCNH simulation, neonatal mortality V&V criteria are documented on :ref:`the neonatal mortality page <2021_cause_neonatal_disorders_mncnh>`.

References
----------

`GBD 2021 Non-fatal Neonatal Infections Modeling Strategy <https://www.healthdata.org/sites/default/files/methods_appendices/2021/Neonatal_nonfatal_GBD2020_final_RS_updated_Jul_11_AC.pdf>`_ (pages 32-39).


`GBD 2021 Neonatal Sepsis and Other Neonatal Infections Factsheet <https://www.healthdata.org/research-analysis/diseases-injuries-risks/factsheets/2021-neonatal-sepsis-and-other-neonatal>`_.
