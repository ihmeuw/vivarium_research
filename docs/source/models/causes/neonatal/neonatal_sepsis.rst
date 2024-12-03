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

Scope
+++++

The Level 4 neonatal conditions included in the MNCNH Portfolio model are closely linked to the 
:ref:`Overall Neonatal Disorders Model <2021_cause_neonatal_disorders_mncnh>`.  Since the LBWSG Risk Factor has an effect on overall neonatal mortality, this subcause will have a baseline mortality fraction that can be combined with the overall mortality risk to determine the population mortality risk for individuals with a given LBWSG exposure.  This might then be further individualized based on treatment coverage and efficacy, to ensure that individuals who have access to a treatment like antibiotics have a lower risk of mortality from neonatal sepsis than those who do not.


Assumptions and Limitations
+++++++++++++++++++++++++++

Our focus on YLLs only will underestimate the total burden of sepsis, and therefor also underestimate the DALYs averted by interventions that reduce the risk of sepsis.  However, we expect this to be an underestimate of less than 10%.

Our strategy of splitting overall mortality risk into subcause-specific mortality risk is an approximation that might over or underestimate the burden of sepsis, depending on the other causes that included and the order in which they are considered.  Since all of these mortality risks are small, we expect this to lead to an error of less than 1%.


Cause Model Diagram
+++++++++++++++++++

We are not modeling Neonatal Sepsis dynamically as a finite state machine, but we can draw an directed 
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
      - sepsis mortality risk
      - The probability that a simulant who was born alive dies from sepsis during the neonatal period


Data Tables
+++++++++++

The Neonatal Sepsis model requires only the probability of death (aka "mortality risk") for use
in the decision graph. This will be computed from the overall neonatal mortality risk and the cause-specific mortality fraction for sepsis.

.. math::
    \text{mr}_\text{sepsis} = \text{mr}_\text{total} \cdot (\text{cause-specific mortality fraction}).


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
      - fraction of all neonatal deaths due to neonatal sepsis
      - deaths_c383 / deaths_c380
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

Neonatal Sepsis death count and rate in simulation should match GBD estimates.

References
----------

`GBD 2021 Non-fatal Neonatal Infections Modeling Strategy <https://www.healthdata.org/sites/default/files/methods_appendices/2021/Neonatal_nonfatal_GBD2020_final_RS_updated_Jul_11_AC.pdf>`_ (pages 32-39).


`GBD 2021 Neonatal Sepsis and Other Neonatal Infections Factsheet <https://www.healthdata.org/research-analysis/diseases-injuries-risks/factsheets/2021-neonatal-sepsis-and-other-neonatal>`_.
