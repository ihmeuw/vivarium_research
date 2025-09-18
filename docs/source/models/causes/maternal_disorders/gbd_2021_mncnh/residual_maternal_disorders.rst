.. _2021_cause_residual_maternal_disorders_mncnh:

============================
Residual maternal disorders
============================

The residual maternal disorders cause is meant to capture outcomes due to 
maternal disorders that are not otherwise modeled in our simulation.

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

        - Ectopic pregnancy (c_374)

        - Maternal abortion and miscarriage (c_995)

        - Other direct maternal disorders (c_379)

        - Indirect maternal deaths (c_375)

        - Late maternal deaths (c_376)

        - Maternal deaths aggravated by HIV/AIDs (c_741)

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

The goal of the residual maternal disorders model is to capture YLLs and YLDs due to
maternal disorders subcauses that are not otherwise modeled in the MNCNH simulation.
Given that the maternal disorders subcauses specific to partial term pregnancies are 
separately modeled 
(:ref:`partial term pregnancy maternal disorders document <2021_cause_partial_term_pregnancy_causes_mncnh>`), 
we will only model residual maternal disorders among simulants who give (live or still) 
birth after a full term pregnancy.

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
  * - Ectopic pregnancy (c_374)
    - Modeled
    - Included in the :ref:`partial term pregnancy cause docs <2021_cause_partial_term_pregnancy_causes_mncnh>`
  * - Maternal abortion and miscarriage (c_995)
    - Modeled
    - Included in the :ref:`partial term pregnancy cause docs <2021_cause_partial_term_pregnancy_causes_mncnh>`
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
  * - Maternal hypertensive disorders
    - 369
    - True
    - True
    - True
    - Note this cause will eventually be excluded from the residual maternal disorders cause model

Summary of modeling strategy
++++++++++++++++++++++++++++

We will assume a residual maternal disorders incidence ratio equal to 1 for all "full term" pregnancies that 
result in live and still births in our simulation. This will easily allow us to apply both mortality and 
morbidity due to residual maternal disorders to this population without having to directly model residual
maternal disorders incident cases.

Notably, this strategy will apply morbidity due to subcauses of residual maternal disorders equally across
all full term pregnancies rather than applying the value of YLDs per incident case to a subset of incident 
cases. However, this strategy does allow us to model YLDs due to the "other direct maternal disorders" subcause
which has YLD estimates but not incidence estimates.

Assumptions and Limitations
+++++++++++++++++++++++++++

- We apply morbidity due to subcauses of residual maternal disorders equally across all full term pregnancies rather than applying the value of YLDs per incident case to a subset of incident cases

Cause Model Diagram
+++++++++++++++++++

.. graphviz::

    digraph hemorrhage_decisions {
        rankdir = LR;
        ftp [label="full term\npregnancy, post\nintrapartum", style=dashed]
        ftb [label="full term\nbirth", style=dashed]
        alive [label="parent did not\ndie of residual maternal\ndisorders"]
        dead [label="parent died of residual\nmaternal disorders"]
        RMD [label="affected with residual\nmaternal disorders"]

        ftp -> alive  [label = "1 - ir"]
        ftp -> RMD [label = "ir"]
        RMD -> alive [label = "1 - cfr"]
        RMD -> dead [label = "cfr"]
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
    * - parent did not die of residual maternal disorders
      - Parent simulant did not die of residual maternal disorders
    * - parent died of residual maternal disorders
      - Parent simulant died of residual maternal disorders
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
      - the probability that a simulant who experiences a full term pregnancy outcome is eligible for residual maternal disorders burden
    * - cfr
      - fatality rate
      - The probability that a simulant who experiences a full term pregnancy outcome dies of residual maternal disorders

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
      - the probability that a simulant who experiences a full term pregnancy outcome is eligible for residual maternal disorders burden
      - 1
      - model assumption
    * - cfr
      - "case" fatality rate of residual maternal disorders
      - csmr / birth_rate
      - The value of cfr is a probabiity in [0,1]
    * - csmr
      - cause-specific mortality rate of residual maternal disorders
      - sum of cause-specific mortality rates across causes [375, 379, 376, 741, 369]
      - note that cause-specific mortality rates are a measure of deaths (from source='codcorrect') divided by population
    * - birth_rate
      - birth rate (live or still)
      - (1 + SBR) ASFR
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
      - sum of cause-specific mortality rates across causes [375, 379, 376, 741, 369]. Note that only causes 379 and 369 have YLDs.
      - source=como
    * - ylds_per_case
      - YLDs accumulated due to residual maternal disorders per case of residual maternal disorders (full term pregnancy)
      - yld_rate / birth_rate
      - 

- The ylds_per_case parameter should be applied to all simulants affected by residual maternal disorders (all full term pregnancies)

Validation Criteria
+++++++++++++++++++

- Deaths due to residual maternal disorders should occur among pregnancies that end in live or still births only
- Mortality, YLL, and YLDs rate due to residual maternal disorders should match expectation in the baseline scenario

References
----------
