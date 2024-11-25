.. 2021_cause_obstructed_labor_mncnh:

====================================
Obstructed labor and uterine rupture
====================================

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

        - **Obstructed labor and uterine rupture (c_370)**

            - Obstructed labor, acute event (s_188)

            - Rectovaginal fistula (s_189)

            - Vesicovaginal fistula (s_190)

*Obstructed labor and uterine rupture (c_370)* ia a most
detailed cause, at level 4 of the GBD hierarchy. It has three sequelae,
detailed in the following table:

.. list-table:: Sequelae of obstructed labor and uterine rupture
    :header-rows: 1
    :widths: 2 1 5 5

    * - Sequela
      - GBD ID
      - Health state and disability weight
      - Notes
    * - Obstructed labor, acute event 
      - s_188
      - abdominopelvic problem, severe 

        DW: 0.324 (0.22–0.442) 
      - 
    * - Rectovaginal fistula 
      - s_189
      - rectovaginal fistula 

        DW: 0.501 (0.339–0.657)
      - Rectovaginal fistula is defined as an abnormal opening between the vagina and 
        the rectum with involuntary escape of flatus and/or faeces 
        following childbirth.  The non-fatal burden of fistulas is included in the 
        non-fatal burden of obstructed labour in reporting, but estimation is 
        described in a separate appendix section on “Fistula – impairment.”
    * - Vesicovaginal fistula
      - s_190
      - vesicovaginal fistula

        DW: 0.342 (0.227–0.478) 
      - Vesicovaginal  fistula is defined as an abnormal opening between the vagina and 
        the bladder with involuntary escape of urine following childbirth.  The non-fatal 
        burden of fistulas is included in the non-fatal burden of obstructed labour in 
        reporting, but estimation is described in a separate appendix section on 
        “Fistula – impairment.”

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

The goal of the obstructed labor (OL) model is to capture YLLs and YLDs due to
obstructed labor and uterine rupture among women of
reproductive age. We only model obstructed labor and uterine rupture among 
simulants who give (live or still) birth after a full term pregnancy. This 
page documents how to model the baseline burden of obstructed labor and 
uterine rupture. Other simulation components such as c-sections will affect 
the rates of obstructed labor; the pages for the corresponding :ref:`intervention <intervention_models>`
or :ref:`risk effects <risk_effects_models>` model.

Summary of modeling strategy
++++++++++++++++++++++++++++

Since the :ref:`MNCNH Portfolio project
<2024_concept_model_vivarium_mncnh_portfolio>` does not model the
passage of time, we will not model obstructed labor and uterine rupture
as a state machine with dynamic state transitions like our typical cause 
models. Rather, all "transitions" in the model will be modeled as decisions 
made during a single timestep. To obtain the decision probabilities of each 
incident case or obstructed labor and uterine rupture death, we will convert 
GBD's annual incidence and mortality rates among women of reproductive age 
into event rates *per birth* (including stillbirths). We will track obstructed 
labor and uterine rupture deaths to calculate YLLs, and we will track incident 
cases to calculate YLDs.

Assumptions and Limitations
+++++++++++++++++++++++++++

Cause Model Decision Graph
++++++++++++++++++++++++++

Although we're not modeling obstructed labor and uterine rupture
dynamically as a finite state machine, we can draw an analogous directed 
graph that can be interpreted as a (collapsed) decision tree rather than 
a state transition diagram. The main difference is that the values on the 
transition arrows represent decision probabilities rather than rates per 
unit time. The obstructed labor and uterine rupture decision graph drawn 
below should be inserted on the "full term pregnancy" branch of the decision 
graph from the :ref:`pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`,
between the intrapartum model and the birth of the child simulant. Solid
lines are the pieces added by the obstructed labor and uterine rupture model, 
while dashed lines indicate pieces of the underlying pregnancy model.

.. graphviz::

    digraph OL_decisions {
        rankdir = LR;
        ftp [label="full term\npregnancy, post\nintrapartum", style=dashed]
        ftb [label="full term\nbirth", style=dashed]
        alive [label="parent did not die of OL"]
        dead [label="parent died of OL"]

        ftp -> alive  [label = "1 - ir"]
        ftp -> OL [label = "ir"]
        OL -> alive [label = "1 - cfr"]
        OL -> dead [label = "cfr"]
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
    * - OL
      - Parent simulant experiences obstructed labor or uterine rupture
    * - parent alive
      - Parent simulant is still alive
    * - parent dead
      - Parent simulant died of obstructed labor or uterine rupture
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
      - The probability that a pregnant simulant experiences obstructed 
        labor or uterine rupture
    * - cfr
      - case fatality rate
      - The probability that a simulant with  experiences dies of that 
        event


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
