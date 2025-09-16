.. _2021_cause_partial_term_pregnancy_causes_mncnh:

================================================
Partial term pregnancy maternal disorders causes
================================================


The partial term pregnancy maternal disorders cause is meant to capture morbidity and mortality specifically among "partial term pregnancies" (pregnancies that do not end in live or still births according to the :ref:`pregnancy model document <other_models_pregnancy_closed_cohort_mncnh>`) in the MNCNH portfolio simulation. Relevant causes of morbidity and mortality among this group as modeled in GBD include "maternal abortion and miscarriage" (c_995) and "ectopic pregnancy" (c_374).

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
maternal disorders subcauses that are specific to pregnancies that end in outcomes
other than a live or still birth, including YLDs and YLLs due to ectopic pregnancy
as well as abortion/miscarriage maternal disorders subcauses.

Summary of modeling strategy
++++++++++++++++++++++++++++

Given that the :ref:`pregnancy model <>` used in the MNCNH simulation already assigns
partial term pregnancy outcomes according to the incidence rates of the GBD causes of
ectopic pregnancy and abortion/miscarriage, we assume that 100% of partial term pregnancies
in the MNCNH simulation are "incident cases" and therefore all partial term pregnancies
are subject to the case fatality rate and YLD rate associated with the partial term 
pregnancy maternal disorders cause as defined below.

Assumptions and Limitations
+++++++++++++++++++++++++++

- We do not model mortality or morbidity due to ectopic pregnancies or abortion/miscarriage separately and rather model a summary measure across both of these causes. Therefore, if we were ever to model an intervention that acts on either of these subcauses, we would need to update our modeling strategy to separate these subcauses from this single cause model.

Cause Model Diagram
+++++++++++++++++++

.. graphviz::

    digraph hemorrhage_decisions {
        rankdir = LR;
        ptp [label="partial term\npregnancy, post\nantenatal models", style=dashed]
        alive [label="parent did not die of partial term pregnancy maternal disorders"]
        dead [label="parent died of partial term pregnancy maternal disorders"]
        PTPMD [label="affected with partial term pregnancy maternal disorders"]

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
    * - partial term pregnancy
      - Parent simulant has a partial term pregnancy as determined by the
        :ref:`pregnancy model
        <other_models_pregnancy_closed_cohort_mncnh>`, **and** has
        already been through the antenatal model
    * - affected with partial term pregnancy maternal disorders
      - Parent simulant has is affected with maternal disorders of partial term pregnancies
    * - parent not dead of partial term pregnancy maternal disorders
      - Parent simulant did not die of partial term pregnancy maternal disorders
    * - parent died of partial term pregnancy maternal disorders
      - Parent simulant died of partial term pregnancy maternal disorders

.. list-table:: Transition Probability Definitions
    :widths: 1 5 20
    :header-rows: 1

    * - Symbol
      - Name
      - Definition
    * - ir
      - incidence risk
      - The probability that a pregnant simulant gets partial term pregnancy maternal disorders
    * - cfr
      - case fatality rate
      - The probability that a simulant with partial term pregnancy maternal disorders dies of that partial term pregnancy maternal disorders

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
      - partial term pregnancy maternal disorders incidence risk per partial term pregnancy
      - 1
      - Artifact of the modeling strategy that assings partial term pregnancy outcomes (in the :ref:`pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`) according to the incidence of the GBD causes included in this cause model document
    * - cfr
      - case fatality rate of maternal hemorrhage
      - (csmr_c374 + csmr_c995) / (incidence_c374 + incidence_c995)
      - The value of cfr is a probabiity in [0,1]
    * - incidence_c374, incidence_c995
      - incidence rate of ectopic pregnancy, abortion/miscarriage
      - como
      - Use the :ref:`total population incidence rate <total population
        incidence rate>` directly from GBD and do not rescale this
        parameter to susceptible-population incidence rate using
        condition prevalence. Total population person-time is used in
        the denominator in order to cancel out with the person-time in
        the cause-specific mortality rate denominator.
    * - csmr_c374, csmr_c995
      - cause-specific mortality rate of ectopic pregnancy, abortion/miscarriage
      - deaths_c374 / population, deaths_c995 / population
      - Note that deaths / (average population for year) = deaths / person-time
    * - deaths_c374, deaths_c995
      - count of deaths due to ectopic pregnancy, abortion/miscarriage
      - codcorrect
      -
    * - population
      - average population in a given year
      - get_population
      - Specific to age/sex/location/year demographic group. Numerically
        equal to person-time for the year.
    * - yld_rate_c374, yld_rate_995
      - rate of ectopic pregnancy, abortion/miscarriage YLDs per person-year
      - como
      -
    * - ylds_per_case
      - YLDs per case of partial term pregnancy maternal disorders
      - (yld_rate_c374 + yld_rate_c995) / (incidence_c374 + incidence_c995)
      - 

- The ylds_per_case parameter should be applied to all simulants affected by residual maternal disorders (all full term pregnancies)

Validation Criteria
+++++++++++++++++++

- Deaths due to partial term pregnancy maternal disorders should occur among partial term pregnancies only
- Rate of partial term pregnancy maternal disorders incidence, death, YLLs, and YLDs should match expectation in the baseline scenario

References
----------
