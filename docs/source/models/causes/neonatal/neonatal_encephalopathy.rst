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
:ref:`Overall Neonatal Disorders Model <2021_cause_neonatal_disorders_mncnh>`.  Since the LBWSG Risk Factor has an effect on overall neonatal mortality, this subcause will have a baseline mortality fraction that can be combined with the overall mortality risk to determine the population mortality risk for individuals with a given LBWSG exposure.  This might then be further individualized based on treatment coverage and efficacy, to ensure that individuals who have access to a specific existing or hypothetical treatment have a lower risk of mortality.



Assumptions and Limitations
+++++++++++++++++++++++++++

Focusing solely on YLLs will likely underestimate the total burden of this cause and, consequently, the DALYs averted by interventions that reduce prevalence and mortality due to it. However, we anticipate this underestimation to be less than 10%.

Our approach of dividing overall mortality risk into subcause-specific mortality risks is an approximation that may either overestimate or underestimate the burden of this cause, depending on the other included causes and their order of consideration. Given that these mortality risks are relatively small, we expect this to result in an error of less than 1%.

Cause Model Decision Graph
++++++++++++++++++++++++++

We are not modeling Neonatal Encephalopathy dynamically as a finite state machine, but we can draw an directed 
graph to represent the collapsed decision tree  
representing this cause. Unlike a state machine representation, the values on the 
transition arrows represent decision probabilities rather than rates per 
unit time.


.. graphviz::

    digraph NN_encephalopathy_decisions {
        rankdir = LR;
        lb [label="live birth", style=dashed]
        nn_alive [label="neonate didn't die\nof encephalopathy"]
        nn_dead [label="neonate died of\nencephalopathy"]

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
    * - neonate didn't die of encephalopathy
      - The child simulant survived for the first 28 days of life
    * - neonate died of encephalopathy
      - The child simulant died within the first 28 days of life

.. list-table:: Transition Probability Definitions
    :widths: 1 5 20
    :header-rows: 1

    * - Symbol
      - Name
      - Definition
    * - mr
      - encephalopathy mortality risk
      - The probability that a simulant who was born alive dies from this cause during the neonatal period


Data Tables
+++++++++++

The Neonatal Encephalopathy model requires only the probability of death (aka "mortality risk") for use
in the decision graph. This will be computed from the overall neonatal mortality risk and the cause-specific mortality fraction.

.. math::
    \text{mr}_\text{cause} = \text{mr}_\text{total} \cdot (\text{cause-specific mortality fraction}).


The following table shows the data needed for these
calculations.

.. note::

  All quantities pulled from GBD in the following table are for a
  specific year, sex, and location, for the age range 0 to 28 days.

.. list-table:: Data values and sources
    :header-rows: 1

    * - Variable
      - Definition
      - Value or source
      - Note
    * - mr_total
      - neonatal mortality risk per live birth
      - The mortality risk from the :ref:`Overall Neonatal Disorders Model <2021_cause_neonatal_disorders_mncnh>`
      - The value of mr is a probabiity in [0,1]. Denominator includes live births only.
    * - cause-specific mortality fraction
      - fraction of all neonatal deaths due to neonatal encephalopathy
      - deaths_c382 / deaths_c380
      -
        
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

* Neonatal Encephalopathy death count and rate in simulation should match GBD estimates.

* Relative Risk of Neonatal Encephalopathy death due to LBWSG should match overall neonatal mortality RR.

References
----------

`GBD 2021 Non-fatal Neonatal Infections Modeling Strategy <https://www.healthdata.org/sites/default/files/methods_appendices/2021/Neonatal_nonfatal_GBD2020_final_RS_updated_Jul_11_AC.pdf>`_ (pages 13-21).


`GBD 2021 Neonatal Encephalopathy Factsheet <https://www.healthdata.org/research-analysis/diseases-injuries-risks/factsheets/2021-neonatal-encephalopathy-due-birth>`_.
