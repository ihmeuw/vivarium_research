.. _2023_cause_antepartum_hemorrhage_mncnh:

=====================
Antepartum hemorrhage
=====================

Disease Overview
----------------

GBD 2023 Modeling Strategy
--------------------------

Cause Hierarchy
+++++++++++++++

Antepartum hemorrhage does not appear in the GBD cause hierarchy.
It is a *subset* of maternal hemorrhage (c_367), which is a most detailed cause in GBD 2023. The relevant portion of the GBD hierarchy is as follows:

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

*Maternal hemorrhage (c_367)* is a most detailed cause, at level 4 of the GBD hierarchy. 
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

The goal of the antepartum hemorrhage model is to capture YLLs and YLDs due to
antepartum hemorrhage among pregnant people.
This page documents how to model the baseline burden of antepartum 
hemorrhage.
Hemoglobin after the later ANC visit will affect the rates of antepartum hemorrhage;
such effects are described on the relevant risk effects model page.

Summary of modeling strategy
++++++++++++++++++++++++++++

We will not model antepartum hemorrhage as a state machine, but as a one-time decision.
We will choose whether the pregnant person has antepartum hemorrhage at *some* time between the later ANC visit (if there is one) and the end of pregnancy.
To obtain the decision probabilities,
we will convert GBD's annual rates
among females of reproductive age into conditional event rates.
We will track antepartum hemorrhage
deaths to calculate YLLs, and we will track incident cases by severity to calculate
YLDs.

Cause Model Diagram
+++++++++++++++++++

Although we're not modeling antepartum hemorrhage dynamically as a finite state
machine, we can draw an analogous directed graph that can be interpreted
as a (collapsed) decision tree rather than a state transition diagram.
The main difference is that the values on the transition arrows
represent decision probabilities rather than rates per unit time.

.. graphviz::

    digraph hemorrhage_decisions {
        rankdir = LR;
        start [label="start"]
        end [label="end"]
        alive [label="parent did not die of hemorrhage"]
        dead [label="parent died of hemorrhage"]

        start -> alive  [label = "1 - ir"]
        start -> hemorrhage [label = "ir"]
        hemorrhage -> moderate [label = "1 - severe_fraction"]
        hemorrhage -> severe [label = "severe_fraction"]
        severe -> alive [label = "1 - cfr"]
        severe -> dead [label = "cfr"]
        moderate -> alive [label = "1"]
        alive -> end  [label = "1"]
        dead -> end  [label = "1"]
    }

.. list-table:: State Definitions
    :widths: 7 20
    :header-rows: 1

    * - State
      - Definition
    * - start
      -
    * - hemorrhage
      - Parent simulant has antepartum hemorrhage
    * - moderate
      - Parent simulant has moderate antepartum hemorrhage (i.e., blood loss greater than 500 mL but less than 1 liter)
    * - severe
      - Parent simulant has severe antepartum hemorrhage (i.e., blood loss 1 liter or more)
    * - parent did not die of antepartum hemorrhage
      - Parent simulant did not die of antepartum hemorrhage
    * - parent died of antepartum hemorrhage
      - Parent simulant died of antepartum hemorrhage
    * - end
      -

.. list-table:: Transition Probability Definitions
    :widths: 1 5 20
    :header-rows: 1

    * - Symbol
      - Name
      - Definition
    * - ir
      - incidence risk
      - The probability that a pregnant simulant gets antepartum hemorrhage
    * - severe_fraction
      - severe fraction
      - The probability that a simulant with antepartum hemorrhage has severe antepartum hemorrhage (i.e., blood loss of 1 liter or more)
    * - cfr
      - case fatality rate
      - The probability that a simulant with severe antepartum hemorrhage dies of that hemorrhage

Probabilities
+++++++++++++

The antepartum hemorrhage cause model requires three probabilities, the
incidence risk (ir) per pregnancy, the severe fraction (severe_fraction), and the case fatality rate (cfr), for use
in the decision graph. The incidence risk per pregnancy will be computed as

.. math::

    \text{ir} = \frac{\text{hemorrhage cases}}{\text{pregnancies}}
        = \frac{\text{(hemorrhage cases) / person-time}}
            {\text{pregnancies / person-time}}
        = \frac{\text{hemorrhage incidence rate}}{\text{pregnancy rate}}.

The severe fraction will be computed as

.. math::

    \text{severe_fraction} = \frac{\text{incidence_s181}}{\text{incidence_s181} + \text{incidence_s180}}.

The case fatality rate will be computed as

.. math::

    \begin{align*}
    \text{cfr} &= \frac{\text{hemorrhage deaths}}{\text{hemorrhage cases}} \\\\
        &= \frac{\text{(hemorrhage deaths) / person-time}}
            {\text{(hemorrhage cases) / person-time}}
        = \frac{\text{hemorrhage cause specific mortality rate}}
            {\text{hemorrhage incidence rate}}.
    \end{align*}

Calculating years lived with disability
+++++++++++++++++++++++++++++++++++++++

We apply the YLDs per case for the corresponding severity level to each incident case to calculate YLDs.

.. math::

    \text{ylds_per_case_severe} = \frac{\text{yld_rate_s181}}{\text{incidence_s181}}

.. math::
  
    \text{ylds_per_case_moderate} = \frac{\text{yld_rate_s180}}{\text{incidence_s180}}

Note that we do *not* include YLDs for mild, moderate, or severe anemia due to antepartum hemorrhage (s_182, s_183, s_184) in our calculations because these
sequelae are already counted under the anemia cause model, and we want to avoid double counting.

Data table
++++++++++

The following table shows the data needed from GBD for these
calculations.

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
    * - postpartum_fraction
      - fraction of maternal hemorrhage cases that are postpartum
      - 0.507
      - GBD 2023 crosswalk intercept of -0.68, exponentiated
    * - ir
      - antepartum hemorrhage incidence risk per pregnancy
      - (1 - postpartum_fraction) * incidence_c367 / pregnancy_rate
      - The value of ir is a probabiity in [0,1]. Denominator includes
        all pregnancies.
    * - incidence_c367
      - incidence rate of maternal hemorrhage
      - como
      - Use the :ref:`total population incidence rate <total population
        incidence rate>` directly from GBD and do not rescale this
        parameter to susceptible-population incidence rate using
        condition prevalence. Total population person-time is used in
        the denominator in order to cancel out with the person-time in
        the denominators of birth_rate and csmr_c367.
    * - incidence_s181
      - incidence rate of severe maternal hemorrhage
      - como
      -
    * - incidence_s180
      - incidence rate of moderate maternal hemorrhage
      - como
      -
    * - csmr_c367
      - maternal hemorrhage cause-specific mortality rate
      - deaths_c367 / population
      - Note that deaths / (average population for year) = deaths / person-time
    * - deaths_c367
      - count of deaths due to maternal hemorrhage
      - codcorrect
      -
    * - population
      - average population in a given year
      - get_population
      - Specific to age/sex/location/year demographic group. Numerically
        equal to person-time for the year.
    * - pregnancy_rate
      - pregnancy rate
      - (1 + SBR) * ASFR + incidence_c995 + incidence_c374
      - Units are total pregnancies per person-year
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
    * - incidence_c995
      - Incidence rate per person-year of abortion and miscarriage
      - como
      - 
    * - incidence_c374
      - Incidence rate per person-year of ectopic pregnancy
      - como
      -
    * - yld_rate_s180
      - YLD rate per person-year due to moderate maternal hemorrhage
      - como
      - 
    * - yld_rate_s181
      - YLD rate per person-year due to severe maternal hemorrhage
      - como
      -

.. todo::
  Get data from the GBD team to more precisely define the postpartum_fraction parameter and include uncertainty.

Validation Criteria
+++++++++++++++++++

Limitations
-----------

* Because we use the severity split and mortality rate of maternal hemorrhage overall, we are assuming that these are the same for postpartum hemorrhage as for antepartum hemorrhage.
  In reality, postpartum hemorrhage is likely to be more severe.
* We assume that the impact of antepartum hemorrhage on hemoglobin is the same as the impact of postpartum hemorrhage on hemoglobin, which is likely not true.
  We suspect that APH would have a smaller impact on average; however, the MarketScan data the GBD effect is calculated from are
  from PPH in the US, so may already be capturing a smaller average impact than we would expect from PPH in a lower-resource setting.
* We assume that all antepartum hemorrhage fatalities occur among those with severe antepartum hemorrhage, which may not be the case in reality.
* We assume that postpartum hemorrhage is uncorrelated with antepartum hemorrhage, except for the causal effect through hemoglobin. In reality, there may be both confounding and a direct causal effect.
* We assume that when a simulant has both antepartum hemorrhage and a later ANC visit, the ANC visit occurs before the onset of antepartum hemorrhage.
  Antepartum hemorrhage typically occurs late in pregnancy, so this would often be the case.
  Also, in real life, antepartum hemorrhage may lead directly to delivery, even if the fetus is premature,
  so we don't think there are likely to be many cases of ANC visits occurring after the onset of antepartum hemorrhage.
* We assume that antepartum hemorrhage is uncorrelated with the length of pregnancy and the probability of stillbirth (except through hemoglobin),
  which is likely not true.

References
----------
