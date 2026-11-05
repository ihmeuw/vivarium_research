.. _2023_cause_hypertensive_disorders_of_pregnancy_mncnh:

======================================================================
Hypertensive disorders of pregnancy, including pre-eclampsia syndrome
======================================================================

Disease Overview
----------------

Hypertensive disorders of pregnancy are conditions that occur during pregnancy and are characterized by high blood pressure.
Pre-eclampsia syndrome is one underlying disease process associated with hypertension during pregnancy, and it is the main focus of this cause model.

Pre-eclampsia syndrome is dysfunction of multiple organs
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
and about a third of cases beginning before 34 weeks ([Magee_2019]_, Table 3).
Early-progressing and late-progressing pre-eclampsia syndrome tend to have different causes;
the former is more associated with abnormal placental development.

GBD 2023 Modeling Strategy
--------------------------

Hypertensive disorders of pregnancy is equivalent to the most-detailed cause ID 369 in GBD 2023,
which is primarily referred to as "maternal hypertensive disorders" but is also called "hypertensive disorders of pregnancy" in some places in the GBD methods appendix.
The cause has sequelae for *severe* pre-eclampsia and eclampsia, as well as long-term sequelae for both of those conditions,
but a single sequela covering both non-severe pre-eclampsia and gestational hypertension.

The case definition is as follows in the methods appendix:

#. **Hypertensive disorders of pregnancy** includes several
   subcategories:

   a. Gestational hypertension is the new onset of hypertension in a
      pregnant person after 20 weeks’ gestation, as defined by having a
      blood pressure measured >140/90 mmHg on more than one occasion.
   #. Preeclampsia is defined by hypertension [>140/90 mmHg] and
      proteinuria [≥0.3 g/l], with or without signs of end-organ damage.
   #. Severe preeclampsia is defined by preeclampsia with severe
      hypertension [>160/100 mmHg] or other signs of end organ damage
      [liver: low platelets, elevated liver enzymes, coagulation issues;
      kidney: elevated creatinine; central nervous system: headaches or
      visual disturbances], syndrome of hypertension, elevated liver
      enzymes, low platelets [HELLP syndrome]).
   #. Eclampsia is defined as hypertension and seizures, with or without
      proteinuria. This definition excludes chronic hypertension in a
      pregnant person (hypertension present prior to 20 weeks’
      gestation) unless superimposed preeclampsia develops.

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

We only model hypertensive disorders of pregnancy among simulants who give (live or still) birth.
We will not model hypertensive disorders of pregnancy as a state machine
with dynamic state transitions like our typical cause models.
Rather, all "transitions" in the model will be modeled as decisions made during
a single timestep, which represent that state being reached at any point during pregnancy.
To obtain the decision probabilities,
we augment GBD data with literature values.

Due to a lack of data on progression of underlying disease, which is difficult to measure,
we model decisions of meeting the criteria of particular diagnostic categories.
Note that we are not modeling only those who are actually diagnosed; these decisions represent
whether those criteria are actually *met*, regardless of whether the individual is tested.
We assume that GBD (and other data sources) are representative of this underlying reality.

Cause Model Diagram
+++++++++++++++++++

Although we're not modeling hypertensive disorders of pregnancy dynamically as a finite state
machine, we can draw an analogous directed graph that can be interpreted
as a (collapsed) decision tree rather than a state transition diagram.
The main difference is that the values on the transition arrows
represent decision probabilities rather than rates per unit time.

.. graphviz::

    digraph hypertensive_disorders_decisions {
        start
        end
        alive
        dead

        start -> alive [label = "1 - ir_gestational_hypertension"]
        start -> gestational_hypertension [label = "ir_gestational_hypertension"]
        gestational_hypertension -> gestational_hypertension_without_pre_eclampsia [label = "1 - ir_pre_eclampsia"]
        gestational_hypertension -> pre_eclampsia [label = "ir_pre_eclampsia"]
        pre_eclampsia -> non_severe_pre_eclampsia [label = "1 - ir_severe_pre_eclampsia"]
        pre_eclampsia -> severe_pre_eclampsia [label = "ir_severe_pre_eclampsia"]
        severe_pre_eclampsia -> severe_pre_eclampsia_without_eclampsia [label = "1 - ir_eclampsia_from_severe"]
        severe_pre_eclampsia -> eclampsia [label = "ir_eclampsia_from_severe"]
        severe_pre_eclampsia_without_eclampsia -> alive [label = "1 - cfr_severe_pre_eclampsia"]
        severe_pre_eclampsia_without_eclampsia -> dead [label = "cfr_severe_pre_eclampsia"]
        non_severe_pre_eclampsia -> eclampsia [label = "ir_eclampsia_from_non_severe"]
        non_severe_pre_eclampsia -> non_severe_pre_eclampsia_without_eclampsia [label = "1 - ir_eclampsia_from_non_severe"]
        gestational_hypertension_without_pre_eclampsia -> alive [label = "1 - cfr_gestational_hypertension"]
        gestational_hypertension_without_pre_eclampsia -> dead [label = "cfr_gestational_hypertension"]
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
    * - gestational_hypertension
      - Parent simulant has gestational hypertension at some point during pregnancy
    * - pre_eclampsia
      - Parent simulant meets the pre-eclampsia diagnostic criteria at some point during pregnancy
    * - severe_pre_eclampsia
      - Parent simulant meets the diagnostic criteria for "pre-eclampsia with severe features" at some point during pregnancy
    * - gestational_hypertension_without_pre_eclampsia
      - Parent simulant has gestational hypertension at some point during pregnancy but never meets the criteria for pre-eclampsia.
        Simulants who pass through this state will have their most severe category set to "gestational hypertension".
    * - non_severe_pre_eclampsia
      - Parent simulant meets the pre-eclampsia diagnostic criteria at some point during pregnancy but never meets the criteria for "pre-eclampsia with severe features."
    * - non_severe_pre_eclampsia_without_eclampsia
      - Parent simulant meets the pre-eclampsia criteria at some point during pregnancy but never meets the diagnostic criteria for "pre-eclampsia with severe features" or has eclampsia.
        Simulants who pass through this state will have their most severe category set to "non-severe pre-eclampsia".
    * - severe_pre_eclampsia_without_eclampsia
      - Parent simulant meets the diagnostic criteria for "pre-eclampsia with severe features" at some point during pregnancy but never has eclampsia.
        Simulants who pass through this state will have their most severe category set to "severe pre-eclampsia".
    * - eclampsia
      - Parent simulant has eclampsia at some point during pregnancy.
        Simulants who pass through this state will have their most severe category set to "eclampsia".
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
    * - ir_gestational_hypertension
      - incidence risk of gestational hypertension
      - The probability that a pregnant simulant develops gestational hypertension at some point during pregnancy
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
    * - cfr_gestational_hypertension
      - case fatality risk for gestational hypertension
      - The probability that a simulant with gestational hypertension (and not pre-eclampsia or eclampsia) dies of it
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

Pre-simulation data checks:

* All transition probabilities are between 0 and 1.

.. todo::
  For any literature values that get saved in the artifact, we will want to check that the mean and uncertainty (confidence interval, standard error, etc.) match extracted values.

From observed outputs:

* The simulation's incidence risk (cases divided by pregnancies) of *any* level of hypertensive disorders of pregnancy
  should be approximately equal to the GBD 2023 incidence risk of the hypertensive disorders of pregnancy cause (incidence rate divided by pregnancy incidence rate), for each age group and draw.
* The simulation's mortality risk (hypertensive disorders of pregnancy deaths divided by pregnancies) should be approximately equal to GBD 2023 hypertensive disorder mortality risk per pregnancy (CSMR divided by pregnancy incidence rate), for each age group and draw.

.. todo::
  We will want to validate that the ratios between the different severity levels match ratios we extract (if we extract ratios), or more generally that our data on severity split is respected by the simulation.
  We will do this for both incidence and mortality.

Limitations
-----------

* We do not currently model disability/morbidity/YLDs due to hypertensive disorders of pregnancy, despite GBD modeling this.
* We model pre-eclampsia as only occurring when gestational hypertension diagnostic criteria are met, but in practice pre-eclampsia can occur without meeting those criteria (when the required hypertension is not *new*).
* We model eclampsia as only occurring when pre-eclampsia diagnostic criteria are met, but in practice eclampsia can occur without meeting those criteria ("atypical eclampsia").

References
----------

.. [Magee_2019]
  Magee, Laura A., et al. "The incidence of pregnancy hypertension in India, Pakistan, Mozambique, and Nigeria: a prospective population-level analysis." PLoS medicine 16.4 (2019): e1002783.