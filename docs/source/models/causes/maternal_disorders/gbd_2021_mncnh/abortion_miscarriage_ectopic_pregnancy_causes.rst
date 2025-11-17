.. _2021_cause_abortion_miscarriage_ectopic_pregnancy_causes_mncnh:

======================================================================
Abortion, miscarriage, and ectopic pregnancy maternal disorders causes
======================================================================

This model is meant to capture morbidity and mortality specifically among pregnancies that do not end in live or still births according to the :ref:`pregnancy model document <other_models_pregnancy_closed_cohort_mncnh>` in the MNCNH portfolio simulation. Relevant causes of morbidity and mortality among this group as modeled in GBD are "maternal abortion and miscarriage" (c_995) and "ectopic pregnancy" (c_374).

.. note::

  There were no updates to this model between GBD 2021 and GBD 2023 so this document can be used for both GBD rounds

Disease Overview
----------------

- All causes (c_294) [level 0]

  - Communicable, maternal, neonatal, and nutritional diseases (c_295)

    - Maternal and neonatal disorders (c_962)

      - Maternal disorders (c_366)

        - **Ectopic pregnancy** (c_374)

          - Ectopic pregnancy (s_5165)

        - **Maternal abortion and miscarriage** (c_995)

          - Maternal abortive outcome (s_191)

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

Scope
+++++

The goal of this model is to capture YLLs and YLDs due to
maternal disorders subcauses that are specific to pregnancies that end in outcomes
other than a live or still birth, including YLDs and YLLs due to ectopic pregnancy
as well as abortion/miscarriage maternal disorders subcauses.

Summary of modeling strategy
++++++++++++++++++++++++++++

Given that the :ref:`pregnancy model <other_models_pregnancy_closed_cohort_mncnh>` used in the MNCNH simulation already assigns
a broad pregnancy outcome according to the incidence rates of the GBD causes of
ectopic pregnancy and abortion/miscarriage, we assume that 100% of
pregnancies with the "abortion/miscarriage/ectopic" broad pregnancy outcome
in the MNCNH simulation are "incident cases" and therefore all are
are subject to the case fatality rate and YLD rate associated with this cause as defined below.

Assumptions and Limitations
+++++++++++++++++++++++++++

- We do not model mortality or morbidity due to ectopic pregnancies or abortion/miscarriage separately and rather model a summary measure across both of these causes. Therefore, if we were ever to model an intervention that acts on either of these subcauses, we would need to update our modeling strategy to separate these subcauses from this single cause model.

Cause Model Diagram
+++++++++++++++++++

.. note::

  The cause model diagram shown below and used in this modeling strategy has been designed to have a consistent structure with the existing implementation of the `MaternalDisorder component <http://github.com/ihmeuw/vivarium_gates_mncnh/blob/main/src/vivarium_gates_mncnh/components/maternal_disorders.py>`_ used in the MNCNH simulation that has been used to model other maternal disorders subcauses such as :ref:`maternal sepsis <2021_cause_maternal_sepsis_mncnh>`. 

  Notably, as the incidence risk (ir) used for the abortion/miscarriage/ectopic maternal disorders cause model is set to a value of 1, there are no simulants who will travel through the "1 - ir" arrow between the "Abortion/miscarriage/ectopic pregnancy" and the "parent did not die of abortion/miscarriage/ectopic pregnancy maternal disorders" states. While it may be confusing to include an arrow in this diagram that will not apply to any simulants in our model, we include it for consistency with other cause models that utilize the `MaternalDisorder component <http://github.com/ihmeuw/vivarium_gates_mncnh/blob/main/src/vivarium_gates_mncnh/components/maternal_disorders.py>`_. Additionally, if we ever decide that we would like to model the subcauses of this cause model separately, we could more easily update this cause model to handle ir values that do not equal 1.

  For a conceptual respresentation of a similar cause modeling strategy that does not include the "1 - ir" arrow, see the :ref:`residual maternal disorders cause model document <2021_cause_residual_maternal_disorders_mncnh>`.

.. graphviz::

    digraph hemorrhage_decisions {
        rankdir = LR;
        ptp [label="abortion/miscarriage/ectopic\npregnancy", style=dashed]
        alive [label="parent did not die\nof abortion/miscarriage/ectopic pregnancy\nmaternal disorders"]
        dead [label="parent died of abortion/miscarriage/ectopic\npregnancy maternal disorders"]
        PTPMD [label="affected with\nabortion/miscarriage/ectopic pregnancy\nmaternal disorders"]

        ptp -> alive  [label = "1 - ir"]
        ptp -> PTPMD [label = "ir"]
        PTPMD -> alive [label = "1 - cfr"]
        PTPMD -> dead [label = "cfr"]
    }


.. list-table:: State Definitions
    :widths: 7 20
    :header-rows: 1

    * - State
      - Definition
    * - abortion/miscarriage/ectopic pregnancy
      - Parent simulant has an abortion/miscarriage/ectopic pregnancy as determined by the
        :ref:`pregnancy model
        <other_models_pregnancy_closed_cohort_mncnh>`, **and** has
        already been through the pregnancy component
    * - affected with abortion/miscarriage/ectopic pregnancy maternal disorders
      - Parent simulant has is affected with maternal disorders of abortion/miscarriage/ectopic pregnancies
    * - parent did not die of abortion/miscarriage/ectopic pregnancy maternal disorders
      - Parent simulant did not die of abortion/miscarriage/ectopic pregnancy maternal disorders
    * - parent died of abortion/miscarriage/ectopic pregnancy maternal disorders
      - Parent simulant died of abortion/miscarriage/ectopic pregnancy maternal disorders

.. list-table:: Transition Probability Definitions
    :widths: 1 5 20
    :header-rows: 1

    * - Symbol
      - Name
      - Definition
    * - ir
      - incidence risk
      - The probability that a pregnant simulant gets abortion/miscarriage/ectopic pregnancy maternal disorders
    * - cfr
      - case fatality rate
      - The probability that a simulant with abortion/miscarriage/ectopic pregnancy maternal disorders dies of the abortion/miscarriage/ectopic pregnancy maternal disorders

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
      - abortion/miscarriage/ectopic pregnancy maternal disorders incidence risk per abortion/miscarriage/ectopic pregnancy
      - 1
      - Artifact of the modeling strategy that assigns broad pregnancy outcomes (in the :ref:`pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`) according to the incidence of the GBD causes included in this cause model document
    * - cfr
      - case fatality rate of abortion/miscarriage/ectopic pregnancy maternal disorders
      - (csmr_c374 + csmr_c995) / (incidence_c374 + incidence_c995)
      - The value of cfr is a probabiity in [0,1]
    * - incidence_c374, incidence_c995
      - incidence rate of ectopic pregnancy, abortion/miscarriage (respectively)
      - como
      - Use the :ref:`total population incidence rate <total population
        incidence rate>` directly from GBD and do not rescale this
        parameter to susceptible-population incidence rate using
        condition prevalence. Total population person-time is used in
        the denominator in order to cancel out with the person-time in
        the cause-specific mortality rate denominator.
    * - csmr_c374, csmr_c995
      - cause-specific mortality rate of ectopic pregnancy, abortion/miscarriage (respectively)
      - deaths_c374 / population, deaths_c995 / population
      - Note that deaths / (average population for year) = deaths / person-time
    * - deaths_c374, deaths_c995
      - count of deaths due to ectopic pregnancy, abortion/miscarriage (respectively)
      - codcorrect
      -
    * - population
      - average population in a given year
      - get_population
      - Specific to age/sex/location/year demographic group. Numerically
        equal to person-time for the year.
    * - yld_rate_c374, yld_rate_995
      - rate of ectopic pregnancy, abortion/miscarriage (respectively) YLDs per person-year
      - como
      -
    * - ylds_per_case
      - YLDs per case of abortion/miscarriage/ectopic pregnancy maternal disorders
      - (yld_rate_c374 + yld_rate_c995) / (incidence_c374 + incidence_c995)
      - 

- The ylds_per_case parameter should be applied to all simulants affected by abortion/miscarriage/ectopic maternal disorders (all abortion/miscarriage/ectopic pregnancies)

Validation Criteria
+++++++++++++++++++

- Deaths due to abortion/miscarriage/ectopic pregnancy maternal disorders should occur among abortion/miscarriage/ectopic pregnancies only
- Rate of abortion/miscarriage/ectopic pregnancy maternal disorders incidence, death, YLLs, and YLDs should match expectation in the baseline scenario

References
----------
