.. _2023_cause_pre_eclampsia_syndrome_mncnh:

======================================================================
Pre-eclampsia syndrome
======================================================================

Disease Overview
----------------

The pre-eclampsia *syndrome* (the underlying disease process) is dysfunction of multiple organs
that occurs during pregnancy and originates from placental stress.
The placenta becomes stressed when its blood supply can't keep up with its needs,
and it then releases harmful substances into the bloodstream.
The syndrome often causes no symptoms, but it can rapidly progress to severe illness,
causing seizures, stroke, and death of the pregnant person or fetus.
There are several diagnostic categories that describe how the syndrome is showing up:

* "Pre-eclampsia" (used as a diagnostic term and not for the overall syndrome) when there is new high blood pressure (because the syndrome affects the blood vessels) and at least one sign of organ dysfunction.
* "Pre-eclampsia with severe features" when, in addition to the pre-eclampsia criteria, blood pressure reaches very high levels, certain signs of organ dysfunction become severe, or there are symptoms showing the brain is affected.
* "Eclampsia" when the syndrome causes seizures.
* "HELLP" when the syndrome damages the liver and the blood's ability to clot, which can cause severe bleeding.

Because it can rapidly progress, the syndrome should be closely monitored
even when it causes no symptoms.
However, in practice in LMICs it is not always detected promptly due to a lack of healthcare utilization and testing in healthcare settings.
Two key signs of asymptomatic cases, blood pressure and proteinuria,
can be detected with a blood pressure cuff and urine dipstick respectively,
but others require a blood sample.

The only cure for the pre-eclampsia syndrome is delivery of the placenta,
and even then it can take days or weeks to resolve.
Until delivery, treatment focuses on preventing complications like stroke and seizures.

Most pre-eclampsia starts late in the third trimester, with median onset at 35-37 weeks gestation
and about a third of cases beginning before 34 weeks (Magee et al 2019, Table 3). TODO https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1002783
Early-progressing and late-progressing pre-eclampsia syndrome tend to have different causes;
the former is more associated with abnormal placental development.

GBD 2023 Modeling Strategy
--------------------------

Pre-eclampsia does not appear in the GBD cause hierarchy.
It is a *subset* of maternal hypertensive disorders (c_369), which is a most detailed cause in GBD 2023 (also called "hypertensive disorders of pregnancy" in some places in the GBD methods appendix).
The GBD cause also includes gestational hypertension (high blood pressure without any of the other signs of pre-eclampsia),
which is *not* included in this cause model.

Cause Hierarchy
+++++++++++++++

The relevant portion of the GBD cause hierarchy is as follows:

- All causes (c_294) [level 0]

  - Communicable, maternal, neonatal, and nutritional diseases (c_295)

    - Maternal disorders and neonatal disorders (c_962)

      - Maternal disorders (c_366)

        - Maternal hypertensive disorders (c_369)

          - Severe pre-eclampsia (s_185)

          - Eclampsia (s_186)

          - Other hypertensive disorders of pregnancy (s_676)

          - Long term sequelae of severe pre-eclampsia (s_187)

          - Long term sequelae of eclampsia (s_677)

The sequelae are detailed in the following table:

.. list-table:: Sequelae of maternal hypertensive disorders
    :header-rows: 1
    :widths: 2 1 5 5

    * - Sequela
      - GBD ID
      - Health state and disability weight
      - Notes
    * - Severe pre-eclampsia
      - s_185
      - Moderate abdominal pain, tension-type headaches, mild motor plus cognitive impairment

        DW: 0.174 (0.120–0.239) 
      - 
    * - Eclampsia
      - s_186
      - Moderate abdominal pain and severe epilepsy

        DW: 0.602 (0.427–0.753)
      -
    * - Long term sequelae of severe pre-eclampsia
      - s_187
      - Tension-type headaches, mild motor plus cognitive impairment

        DW: 0.067 (0.041–0.103)
      -
    * - Long term sequelae of eclampsia
      - s_677
      - Tension-type headaches, mild motor plus cognitive impairment

        DW: 0.067 (0.041–0.103)
      -
    * - Other hypertensive disorders of pregnancy
      - s_676
      - Generic uncomplicated disease: worry and daily medication

        DW: 0.049 (0.031–0.072)
      -

Restrictions
++++++++++++

The following table describes any restrictions in GBD 2023 on the
effects of this cause (such as being only fatal or only nonfatal), as
well as restrictions on the ages and sexes to which the cause applies.

.. list-table:: GBD 2023 Cause Restrictions
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

Summary of modeling strategy
++++++++++++++++++++++++++++

We only model pre-eclampsia syndrome among simulants who give (live or still) birth.
We will not model pre-eclampsia syndrome as a state machine
with dynamic state transitions like our typical cause models.
Rather, all "transitions" in the model will be modeled as decisions made during
a single timestep, which represent that state being reached at any point during pregnancy.
To obtain the decision probabilities,
we augment GBD data with literature values.

Due to a lack of data on the underlying syndrome progression, which is difficult to measure,
we model decisions of meeting the criteria of particular diagnostic categories.
Note that we are not modeling only those who are actually diagnosed; these decisions represent
whether those criteria are actually *met*, regardless of whether the individual is tested.
We assume that GBD (and other data sources) represent this underlying reality.

Cause Model Diagram
+++++++++++++++++++

Although we're not modeling pre-eclampsia syndrome dynamically as a finite state
machine, we can draw an analogous directed graph that can be interpreted
as a (collapsed) decision tree rather than a state transition diagram.
The main difference is that the values on the transition arrows
represent decision probabilities rather than rates per unit time.

.. graphviz::

    digraph pre_eclampsia_decisions {
        start
        end
        alive
        dead

        start -> alive [label = "1 - ir_pre_eclampsia"]
        start -> pre_eclampsia [label = "ir_pre_eclampsia"]
        pre_eclampsia -> non_severe_pre_eclampsia [label = "1 - ir_severe_pre_eclampsia"]
        pre_eclampsia -> severe_pre_eclampsia [label = "ir_severe_pre_eclampsia"]
        severe_pre_eclampsia -> severe_pre_eclampsia_without_eclampsia [label = "1 - ir_eclampsia_from_severe"]
        severe_pre_eclampsia -> eclampsia [label = "ir_eclampsia_from_severe"]
        severe_pre_eclampsia_without_eclampsia -> alive [label = "1 - cfr_severe_pre_eclampsia"]
        severe_pre_eclampsia_without_eclampsia -> dead [label = "cfr_severe_pre_eclampsia"]
        non_severe_pre_eclampsia -> eclampsia [label = "ir_eclampsia_from_non_severe"]
        non_severe_pre_eclampsia -> non_severe_pre_eclampsia_without_eclampsia [label = "1 - ir_eclampsia_from_non_severe"]
        non_severe_pre_eclampsia_without_eclampsia -> alive [label = "1 - cfr_non_severe_pre_eclampsia"]
        non_severe_pre_eclampsia_without_eclampsia -> dead [label = "cfr_non_severe_pre_eclampsia"]
        eclampsia -> alive [label = "1 - cfr_eclampsia"]
        eclampsia -> dead [label = "cfr_eclampsia"]
        alive -> end  [label = "1"]
        dead -> end  [label = "1"]
    }

.. list-table:: State Definitions
    :header-rows: 1

    * - State
      - Definition
    * - start
      - Parent simulant must have a live or stillbirth pregnancy as determined by the
        :ref:`pregnancy model
        <other_models_pregnancy_closed_cohort_mncnh>`
    * - pre_eclampsia
      - Parent simulant meets the pre-eclampsia diagnostic criteria at some point during pregnancy
    * - severe_pre_eclampsia
      - Parent simulant meets the diagnostic criteria for "pre-eclampsia with severe features" at some point during pregnancy
    * - non_severe_pre_eclampsia
      - Parent simulant meets the pre-eclampsia diagnostic criteria at some point during pregnancy but never meets the criteria for "pre-eclampsia with severe features"
    * - non_severe_pre_eclampsia_without_eclampsia
      - Parent simulant meets the pre-eclampsia criteria at some point during pregnancy but never meets the diagnostic criteria for "pre-eclampsia with severe features" or has eclampsia
    * - severe_pre_eclampsia_without_eclampsia
      - Parent simulant meets the diagnostic criteria for "pre-eclampsia with severe features" at some point during pregnancy but never has eclampsia
    * - eclampsia
      - Parent simulant has eclampsia at some point during pregnancy
    * - alive
      - Parent simulant did not die of pre-eclampsia syndrome
    * - dead
      - Parent simulant died of pre-eclampsia syndrome
    * - end
      -

.. list-table:: Transition Probability Definitions
    :widths: 1 5 20
    :header-rows: 1

    * - Symbol
      - Name
      - Definition
    * - ir_pre_eclampsia
      - incidence risk of pre-eclampsia
      - The probability that a pregnant simulant develops pre-eclampsia at some point during pregnancy
    * - ir_severe_pre_eclampsia
      - incidence risk of severe pre-eclampsia
      - The probability that a pregnant simulant who has pre-eclampsia at some point during pregnancy develops severe pre-eclampsia
    * - ir_eclampsia_from_non_severe
      - incidence risk of eclampsia from non-severe pre-eclampsia
      - The probability that a pregnant simulant who has non-severe pre-eclampsia at some point during pregnancy develops eclampsia
    * - ir_eclampsia_from_severe
      - incidence risk of eclampsia from severe pre-eclampsia
      - The probability that a pregnant simulant who has severe pre-eclampsia at some point during pregnancy develops eclampsia
    * - cfr_non_severe_pre_eclampsia
      - case fatality risk for non-severe pre-eclampsia
      - The probability that a simulant with non-severe pre-eclampsia (and not eclampsia) dies of it
    * - cfr_severe_pre_eclampsia
      - case fatality risk for severe pre-eclampsia
      - The probability that a simulant with severe pre-eclampsia (and not eclampsia) dies of it
    * - cfr_eclampsia
      - case fatality risk for eclampsia
      - The probability that a simulant with eclampsia dies of it

Probabilities
+++++++++++++

.. todo::
  This section.

Data Tables
+++++++++++

.. todo::
  This section.

Validation Criteria
+++++++++++++++++++

Limitations
-----------

* We do not currently model disability/morbidity/YLDs due to pre-eclampsia syndrome.

References
----------

.. note::

  The modeling strategy for the :ref:`residual maternal disorders cause <2021_cause_residual_maternal_disorders_mncnh>` was developed to include mortality due to maternal hypertensive disorders as the hypertensive disorders cause was not modeled in the MNCNH portfolio simulation at the time that the residual maternal disorders cause was implemented. 

  When the maternal hypertensive disorders cause is added to the MNCNH simulation, the :ref:`residual maternal disorders cause <2021_cause_residual_maternal_disorders_mncnh>` modeling strategy will need to be updated to exclude mortality due to maternal hypertensive disorders so that we do not double count these deaths in our simulation.