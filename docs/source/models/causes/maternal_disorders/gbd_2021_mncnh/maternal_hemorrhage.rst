.. _2021_cause_maternal_hemorrhage_mncnh:

===================
Maternal hemorrhage
===================

Disease Overview
----------------

GBD 2021 Modeling Strategy
--------------------------

Cause Hierarchy
+++++++++++++++

- All causes (c_294) [level 0]

  - Communicable, maternal, neonatal, and nutritional diseases (c_295)

    - Maternal disorders and neonatal disorders (c_962)

      - Maternal disorders (c_366)

        - Maternal hemorrhage (c_367)

          - Maternal hemorrhage with less than 1 liter blood loss (s_180)

          - Maternal hemorrhage with greater than 1 liter blood loss (s_181)

          - Mild anemia due to maternal hemorrhage (s_182)

          - Moderate anemia due to maternal hemorrhage (s_183)

          - Severe anemia due to maternal hemorrhage (s_184)

*Maternal hemorrhage (c_367)* ia a most detailed cause, at level 4 of the GBD hierarchy. 
It has five sequelae, detailed in the following table:

.. list-table:: Sequelae of maternal hemorrhage
    :header-rows: 1
    :widths: 2 1 5 5

    * - Sequela
      - GBD ID
      - Health state and disability weight
      - Notes
    * - Maternal hemorrhage with less than 1 liter blood loss
      - s_180
      - abdominopelvic problem, moderate 

        DW: 0.114 (0.078–0.159) 
      - 
    * - Maternal hemorrhage with greater than 1 liter blood loss
      - s_181
      - abdominopelvic problem, severe 

        DW: 0.324 (0.22–0.442) 
      -
    * - Mild anaemia due to maternal haemorrhage 
      - s_182
      - anaemia, mild 

        DW: 0.004 (0.001–0.008) 
      -
    * - Moderate anaemia due to maternal haemorrhage 
      - s_183
      - anaemia, moderate

        DW: 0.052 (0.034–0.076)
      -
    * - Severe anaemia due to maternal haemorrhage 
      - s_184
      - anaemia, severe

        DW: 0.149 (0.101–0.209)
      -

Restrictions
++++++++++++

The following table describes any restrictions in GBD 2021 on the
effects of this cause (such as being only fatal or only nonfatal), as
well as restrictions on the ages and sexes to which the cause applies.

.. list-table:: GBD 2021 Cause Restrictions
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     - False
     -
   * - Female only
     - True
     -
   * - YLL only
     - False
     -
   * - YLD only
     - False
     -
   * - YLL age group start
     - 10 to 14 (ID=7)
     -
   * - YLL age group end
     - 50 to 54 (ID=15)
     -
   * - YLD age group start
     - 10 to 14 (ID=7)
     -
   * - YLD age group end
     - 50 to 54 (ID=15)
     -

Vivarium Modeling Strategy
--------------------------

Scope
+++++

The goal of the maternal hemorrhage model is to capture YLLs and YLDs due to
maternal hemorrhage among women of reproductive age. We only model maternal 
hemorrhage among simulants who give (live or still) birth after a full term 
pregnancy. This page documents how to model the baseline burden of maternal 
hemorrhage. Other simulation components such as c-sections will affect the 
rates of maternal hemorrhage; such effects will be described on the pages 
for the corresponding :ref:`intervention <intervention_models>` or 
:ref:`risk effects <risk_effects_models>` model.

Summary of modeling strategy
++++++++++++++++++++++++++++

Since the :ref:`MNCNH Portfolio project
<2024_concept_model_vivarium_mncnh_portfolio>` does not model the
passage of time, we will not model maternal hemorrhage as a state machine
with dynamic state transitions like our typical cause models. Rather,
all "transitions" in the model will be modeled as decisions made during
a single timestep. To obtain the decision probabilities of each incident
case or maternal hemorrhage death, we will convert GBD's annual incidence
and mortality rates among women of reproductive age into event rates
*per birth* (including stillbirths). We will track maternal hemorrhage
deaths to calculate YLLs, and we will track incident cases to calculate
YLDs.

Assumptions and Limitations
+++++++++++++++++++++++++++

Cause Model Diagram
+++++++++++++++++++

Although we're not modeling hemorrhage dynamically as a finite state
machine, we can draw an analogous directed graph that can be interpreted
as a (collapsed) decision tree rather than a state transition diagram.
The main difference is that the values on the transition arrows
represent decision probabilities rather than rates per unit time. The
maternal hemorrhage decision graph drawn below should be inserted on the
"full term pregnancy" branch of the decision graph from the
:ref:`pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`,
between the intrapartum model and the birth of the child simulant. Solid
lines are the pieces added by the maternal hemorrhage model, while dashed
lines indicate pieces of the underlying pregnancy model.

.. graphviz::

    digraph hemorrhage_decisions {
        rankdir = LR;
        ftp [label="full term\npregnancy, post\nintrapartum", style=dashed]
        ftb [label="full term\nbirth", style=dashed]
        alive [label="parent did not die of hemorrhage"]
        dead [label="parent died of hemorrhage"]

        ftp -> alive  [label = "1 - ir"]
        ftp -> hemorrhage [label = "ir"]
        hemorrhage -> alive [label = "1 - cfr"]
        hemorrhage -> dead [label = "cfr"]
        alive -> ftb  [label = "1", style=dashed]
        dead -> ftb  [label = "1", style=dashed]
    }

.. list-table:: State Definitions
    :widths: 7 20
    :header-rows: 1

    * - State
      - Definition
    * - full term pregnancy, post intrapartum
      - Parent simulant has a full term pregnancy as determined by the
        :ref:`pregnancy model
        <other_models_pregnancy_closed_cohort_mncnh>`, **and** has
        already been through the antenatal and intrapartum models
    * - hemorrhage
      - Parent simulant has maternal hemorrhage
    * - parent not dead of maternal hemorrhage
      - Parent simulant did not die of maternal hemorrhage
    * - parent died of maternal hemorrhage
      - Parent simulant died of maternal hemorrhage
    * - full term birth
      - The parent simulant has given birth to a child simulant (which
        may be a live birth or a still birth, to be determined in the
        next step of the :ref:`pregnancy model
        <other_models_pregnancy_closed_cohort_mncnh>`)

.. list-table:: Transition Probability Definitions
    :widths: 1 5 20
    :header-rows: 1

    * - Symbol
      - Name
      - Definition
    * - ir
      - incidence risk
      - The probability that a pregnant simulant gets maternal hemorrhage
    * - cfr
      - case fatality rate
      - The probability that a simulant with hemorrhage dies of that hemorrhage

Data Tables
+++++++++++

Calculating Burden
++++++++++++++++++

Years of life lost
"""""""""""""""""""

Years lived with disability
"""""""""""""""""""""""""""

Validation Criteria
+++++++++++++++++++

References
----------
