.. _2021_cause_residual_maternal_disorders_mncnh:

============================
Residual maternal disorders
============================

The residual maternal disorders cause is meant to capture outcomes due to 
maternal disorders that are not otherwise modeled in our simulation.

.. note::

  This modeling strategy is specific to the GBD 2023 computation hierarchy. A modeling strategy compatible with the GBD 2021 round or the GBD 2023 reporting hierarchy would exclude causes 1118 (gestational diabetes, new to GBD 2023 computation, absent in GBD reporting), 1119 (peripartum cardiomyopathy, new to GBD 2023 computation, absent in GBD 2023 reporting), and 379 (other direct maternal disorders, internal. Excludes burden due to gestational diabetes and peripartum cardiomyopathy) from the list of cause IDs to be covered in this document and replace them with cause ID 1160 (other direct maternal disorders inclusive of gestational diabetes and peripartum cardiomyopathy burden).

Disease Overview
----------------

The GBD modeling strategy for maternal disorders is discussed on the 
:ref:`maternal disorders document <2021_cause_maternal_disorders_mncnh>`.
The cause model hierarchy in GBD is also included here for reference.

- All causes (c_294) [level 0]

  - Communicable, maternal, neonatal, and nutritional diseases (c_295)

    - Maternal and neonatal disorders (c_962)

      - **Maternal disorders (c_366)** [level 3]

        - Maternal hemorrhage (c_367)

        - Maternal sepsis and other maternal infections (c_368)

        - Maternal hypertensive disorders (c_369)

        - Maternal obstructed labor and uterine rupture (c_370)

        - Gestational diabetes (c_1118)

        - Peripartum cardiomyopathy (c_1119)

        - Ectopic pregnancy (c_374)

        - Maternal abortion and miscarriage (c_995)

        - Other direct maternal disorders (c_379)

        - Indirect maternal deaths (c_375)

        - Late maternal deaths (c_376)

        - Maternal deaths aggravated by HIV/AIDs (c_741)

Restrictions
++++++++++++

The following table describes any restrictions in GBD 2023 on the
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

The goal of the residual maternal disorders model is to capture YLLs and YLDs due to
maternal disorders subcauses other than those included in the
:ref:`abortion/miscarriage/ectopic pregnancy maternal disorders subcauses <2021_cause_abortion_miscarriage_ectopic_pregnancy_causes_mncnh>`
that are not otherwise modeled in the MNCNH simulation.
Given that the maternal disorders subcauses specific to abortion/miscarriage/ectopic pregnancies are separately modeled 
(:ref:`abortion/miscarriage/ectopic pregnancy maternal disorders document <2021_cause_abortion_miscarriage_ectopic_pregnancy_causes_mncnh>`), 
we will only model residual maternal disorders among simulants who give (live or still) 
birth.

A list of maternal disorders subcauses and whether they are modeled elsewhere or will
be covered as part of the residual maternal disorders cause modeling strategy in this
document is included in the table below.

.. list-table::
  :header-rows: 1

  * - Subcause
    - Modeled?
    - Documentation link
  * - Maternal hemorrhage (c_367)
    - Modeled
    - :ref:`Maternal hemorrhage document <2021_cause_maternal_hemorrhage_mncnh>`
  * - Maternal sepsis and other maternal infections (c_368)
    - Modeled
    - :ref:`Maternal sepsis document <2021_cause_maternal_sepsis_mncnh>`
  * - Maternal hypertensive disorders (c_369)
    - **Unmodeled** (will eventually be modeled in wave III)
    - Covered in this document (:ref:`Future documentation page for hypertensive disorders <2021_cause_maternal_hypertension_mncnh>`)
  * - Maternal obstructed labor and uterine rupture (c_370)
    - Modeled
    - :ref:`Maternal obstructed labor and uterine rupture docs <2021_cause_obstructed_labor_mncnh>`
  * - Gestational diabetes (c_1118)
    - **Unmodeled**
    - Covered in this document
  * - Peripartum cardiomyopathy (c_1119)
    - **Unmodeled**
    - Covered in this document
  * - Ectopic pregnancy (c_374)
    - Modeled
    - Included in the :ref:`abortion/miscarriage/ectopic pregnancy cause docs <2021_cause_abortion_miscarriage_ectopic_pregnancy_causes_mncnh>`
  * - Maternal abortion and miscarriage (c_995)
    - Modeled
    - Included in the :ref:`abortion/miscarriage/ectopic pregnancy cause docs <2021_cause_abortion_miscarriage_ectopic_pregnancy_causes_mncnh>`
  * - Other direct maternal disorders (c_379)
    - **Unmodeled**
    - Covered in this document
  * - Indirect maternal deaths
    - **Unmodeled**
    - Covered in this document
  * - Late maternal deaths (c_376)
    - **Unmodeled**
    - Covered in this document
  * - Maternal deaths aggravated by HIV/AIDS (c_741)
    - **Unmodeled**
    - Covered in this document

Therefore, the residual maternal disorders cause modeling strategy will include
outcomes due to the causes included in the following table (along with a summary of the estimates
available for each cause).

.. list-table:: Included causes
  :header-rows: 1

  * - Cause
    - Cause ID
    - YLLs
    - YLDs
    - Incidence
    - Note
  * - Maternal hypertensive disorders
    - 369
    - True
    - True
    - True
    - Note this cause will eventually be excluded from the residual maternal disorders cause model
  * - Gestational diabetes
    - 1118
    - True
    - True
    - True
    - 
  * - Peripartum cardiomyopathy
    - True
    - True
    - True
    - 
  * - Indirect maternal deaths
    - 375
    - True
    - False
    - False
    - 
  * - Other direct maternal disorders 
    - 379
    - True
    - True
    - False
    - 
  * - Late maternal deaths 
    - 376
    - True
    - False
    - False
    - 
  * - Maternal deaths aggravated by HIV/AIDs
    - 741
    - True
    - False
    - False
    - 

Summary of modeling strategy
++++++++++++++++++++++++++++

We will model morbidity and mortality due to residual maternal disorders (inclusive of all maternal disorders
subcauses that are otherwise unmodeled in our simulation) that
occurs at an equal probability among all pregnancies that end in live or still birth (according to the :ref:`pregnancy model document <other_models_pregnancy_closed_cohort_mncnh>`). 
We do not require tracking incident cases of residual maternal disorders, nor any quantities specific to 
subcauses included in the residual maternal disorders cause model.

Assumptions and Limitations
+++++++++++++++++++++++++++

- We apply morbidity due to subcauses of residual maternal disorders equally across all live/stillbirth pregnancies rather than applying the value of YLDs per incident case to a subset of incident cases

Cause Model Diagram
+++++++++++++++++++

Conceptually, the modeling strategy for the residual maternal disorders cause can be summarized with the diagram below. All live/stillbirth pregnancies will be assigned an amount of YLDs due to residual maternal disorders at the conclusion of the intrapartum period. Some of these pregnancies will die from residual maternal disorders in accordance with the calculated fatality rate (fr) of residual maternal disorders. Regardless of whether the parent dies due to residual maternal disorders, the intrapartum period will conclude with a live or still birth outcome.

**Conceptual cause model diagram**

.. graphviz::

    digraph RMD_decisions {
        rankdir = LR;
        start [label="start"]
        end [label="end"]
        alive [label="parent did not\ndie of residual maternal\ndisorders"]
        dead [label="parent died of residual\nmaternal disorders"]
        RMD [label="assign YLDs due to\nresidual maternal disorders"]

        start -> alive  [label = "1 - ir"]
        start -> RMD [label = "ir"]
        RMD -> alive [label = "1 - cfr"]
        RMD -> dead [label = "cfr"]
        alive -> end  [label = "1"]
        dead -> end  [label = "1"]
    }

Where,

.. list-table:: Conceptual Cause Model Diagram Parameter Definitions
    :widths: 7 20
    :header-rows: 1

    * - State
      - Definition
    * - start
      - Parent simulant has a live birth or stillbirth pregnancy as determined by the
        :ref:`pregnancy model
        <other_models_pregnancy_closed_cohort_mncnh>`, **and** has
        already been through the pregnancy and intrapartum components (this is handled by the setup of the postpartum component)
    * - assign YLDs due to residual maternal disorders
      - state in which YLDs due to residual maternal disorders are accrued
    * - parent did not die of residual maternal disorders
      - Parent simulant did not die of residual maternal disorders
    * - parent died of residual maternal disorders
      - Parent simulant died of residual maternal disorders
    * - end
      -
    * - fr (fatality rate)
      - The rate of death due to residual maternal disorders among all pregnancies resulting in live or still births 

While the above diagram represents the conceptual aims of the residual maternal disorders cause model, there are some convenient adjustments we can make to this diagram so that it continues to achieve the aims of our cause model while also achieving compatibility with the existing implementation of the `MaternalDisorder component <http://github.com/ihmeuw/vivarium_gates_mncnh/blob/main/src/vivarium_gates_mncnh/components/maternal_disorders.py>`_ used in the MNCNH simulation that has been used to model other maternal disorders subcauses such as :ref:`maternal sepsis <2021_cause_maternal_sepsis_mncnh>`. Specifically, although our modeling strategy for maternal disorders does not involve modeling incident cases, we can implement a :code:`MaternalDisorder` component model as represented in the diagram below with an incidence risk (ir) value equal to 1.

**Implementation-driven cause model diagram:**

.. graphviz::

    digraph hemorrhage_decisions {
        rankdir = LR;
        start;
        end;
        alive [label="parent did not\ndie of residual maternal\ndisorders"]
        dead [label="parent died of residual\nmaternal disorders"]
        RMD [label="affected with residual\nmaternal disorders"]

        start -> alive  [label = "1 - ir"]
        start -> RMD [label = "ir"]
        RMD -> alive [label = "1 - cfr"]
        RMD -> dead [label = "cfr"]
        alive -> end  [label = "1", style=dashed]
        dead -> end  [label = "1", style=dashed]
    }

.. list-table:: Implementation-Driven Cause Model Diagram Parameter Definitions
    :widths: 7 20
    :header-rows: 1

    * - State
      - Definition
    * - start
      - Parent simulant has a live birth or stillbirth pregnancy as determined by the
        :ref:`pregnancy model
        <other_models_pregnancy_closed_cohort_mncnh>`, **and** has
        already been through the pregnancy and intrapartum components (this is handled by the setup of the postpartum component)
    * - affected with residual maternal disorders
      - Parent is "affected with" residual maternal disorders 
    * - parent did not die of residual maternal disorders
      - Parent simulant did not die of residual maternal disorders
    * - parent died of residual maternal disorders
      - Parent simulant died of residual maternal disorders
    * - end
      -
    * - ir (incidence risk)
      - The probability that a pregnancy resulting in live or still birth becomes "affected with" residual maternal disorders and experiences associated morbidity
    * - cfr (case fatality rate)
      - The rate of death due to residual maternal disorders among those "affected with" residual maternal disorders

.. note::

  The concept of being "affected with" residual maternal disorders as shown in this diagram does exists only for convenience of implementation, as we do not have relevant data to inform the incidence of residual maternal disorders. Setting the ir parameter to 1 allows all pregnancies resulting in live or still birth to be subject to equal rates of morbidity and mortality due to residual maternal disorders, which is the aim of our modeling strategy for this cause.

Data Tables
+++++++++++

.. note::

    All quantities pulled from GBD in the following table are for a
    specific year, sex, age group, and location unless otherwise noted
    (e.g., SBR). Our simulation only includes pregnant women of
    reproductive age, so the sex will always be female. However, even
    though all of our simulants will be pregnant, we still pull each
    quantity for *all* females in a given year, age group, and location,
    because this is the default behavior of GBD. Since we are using the
    same total population in all the denominators, the person-time will
    cancel out in the above calculations to give us the probabilities we
    want.

.. list-table:: Data values and sources
    :header-rows: 1

    * - Variable
      - Definition
      - Value or source
      - Note
    * - ir
      - the probability that a simulant whose pregnancy results in live or stillbirth is eligible for residual maternal disorders burden
      - 1
      - model assumption
    * - cfr
      - "case" fatality rate of residual maternal disorders
      - csmr / birth_rate
      - The value of cfr is a probabiity in [0,1]. Note that this value of the cfr (shown in the "implementation-driven cause model diagram") is equivalent to the fr parameter shown in the "conceptual cause model diagram" 
    * - csmr
      - cause-specific mortality rate of residual maternal disorders
      - sum of cause-specific mortality rates across causes [375, 1118, 1119, 379, 376, 741, 369]
      - note that cause-specific mortality rates are a measure of deaths (from source='codcorrect') divided by population
    * - birth_rate
      - birth rate (live or still)
      - ASFR + ASFR * SBR
      - Units are total births (live or still) per person-year
    * - ASFR
      - Age-specific fertility rate
      - get_covariate_estimates: coviarate_id=13
      - Assume lognormal distribution of uncertainty. Units in GBD are
        live births per person, or equivalently, per person-year.
    * - SBR
      - Stillbirth to live birth ratio
      - get_covariate_estimates: covariate_id=2267
      - Parameter is not age specific and has no draw-level uncertainty.
        Use mean_value as location-specific point parameter.
    * - yld_rate
      - Rate of YLDs due to all residual maternal disorders subcauses among the total population
      - sum of cause-specific mortality rates across causes [375, 1118, 1119, 379, 376, 741, 369]. Note that only causes 379 and 369 have YLDs.
      - source=como
    * - ylds_per_case
      - YLDs accumulated due to residual maternal disorders per case of residual maternal disorders (live/stillbirth pregnancy)
      - yld_rate / birth_rate
      - 

- The ylds_per_case parameter should be applied to all simulants affected by residual maternal disorders (equivalent to all live or still birth pregnancies)
- The cfr (case fatality rate) parameter should be applied to all simulants affected by residual maternal disorders (equivalent to all live or still birth pregnancies)

Validation Criteria
+++++++++++++++++++

- Deaths due to residual maternal disorders should occur among pregnancies that end in live or still births only
- Mortality, YLL, and YLDs rate due to residual maternal disorders should match expectation in the baseline scenario

References
----------
