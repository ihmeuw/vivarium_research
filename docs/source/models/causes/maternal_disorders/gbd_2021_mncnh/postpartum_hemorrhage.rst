.. _2023_cause_postpartum_hemorrhage_mncnh:

=====================
Postpartum hemorrhage
=====================

Disease Overview
----------------

GBD 2023 Modeling Strategy
--------------------------

Cause Hierarchy
+++++++++++++++

Postpartum hemorrhage does not appear in the GBD cause hierarchy.
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

The goal of the postpartum hemorrhage model is to capture YLLs and YLDs due to
postpartum hemorrhage among people giving birth.
We only model postpartum hemorrhage among simulants who give (live or still) birth.
This page documents how to model the baseline burden of postpartum 
hemorrhage. Other simulation components such as c-sections will affect the 
rates of postpartum hemorrhage; such effects will be described on the pages 
for the corresponding :ref:`intervention <intervention_models>` or 
:ref:`risk effects <risk_effects_models>` model.

Summary of modeling strategy
++++++++++++++++++++++++++++

Because we can assume incident cases of postpartum hemorrhage all occur at the end of pregnancy,
we will not model postpartum hemorrhage as a state machine
with dynamic state transitions like our typical cause models. Rather,
all "transitions" in the model will be modeled as decisions made during
a single timestep. To obtain the decision probabilities,
we will convert GBD's annual rates
among females of reproductive age into conditional event rates.
We will track postpartum hemorrhage
deaths to calculate YLLs, and we will track incident cases by severity to calculate
YLDs.

Assumptions and Limitations
+++++++++++++++++++++++++++

Cause Model Diagram
+++++++++++++++++++

Although we're not modeling postpartum hemorrhage dynamically as a finite state
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
      - Parent simulant must have a live or stillbirth pregnancy as determined by the
        :ref:`pregnancy model
        <other_models_pregnancy_closed_cohort_mncnh>` (due to condition on the overall intrapartum component)
    * - hemorrhage
      - Parent simulant has postpartum hemorrhage
    * - moderate
      - Parent simulant has moderate postpartum hemorrhage (i.e., blood loss greater than 500 mL but less than 1 liter)
    * - severe
      - Parent simulant has severe postpartum hemorrhage (i.e., blood loss 1 liter or more)
    * - parent did not die of postpartum hemorrhage
      - Parent simulant did not die of postpartum hemorrhage
    * - parent died of postpartum hemorrhage
      - Parent simulant died of postpartum hemorrhage
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
      - The probability that a pregnant simulant gets postpartum hemorrhage
    * - severe_fraction
      - severe fraction
      - The probability that a simulant with postpartum hemorrhage has severe postpartum hemorrhage (i.e., blood loss of 1 liter or more)
    * - cfr
      - case fatality rate
      - The probability that a simulant with severe postpartum hemorrhage dies of that hemorrhage

Probabilities
+++++++++++++

The postpartum hemorrhage cause model requires three probabilities, the
incidence risk (ir) per birth, the severe fraction (severe_fraction), and the case fatality rate (cfr), for use
in the decision graph. The incidence risk per birth will be computed as

.. math::

    \text{ir} = \frac{\text{hemorrhage cases}}{\text{births}}
        = \frac{\text{(hemorrhage cases) / person-time}}
            {\text{births / person-time}}
        = \frac{\text{hemorrhage incidence rate}}{\text{birth rate}}.

The severe fraction will be computed as

.. math::

    \text{severe\_fraction} = \frac{\text{incidence\_s181}}{\text{incidence\_s181} + \text{incidence\_s180}}.

The case fatality rate (CFR) will be computed as

.. math::

    \begin{aligned}
    \text{cfr} &= \frac{\text{hemorrhage deaths}}{\text{severe hemorrhage cases}} \\\\
        &= \frac{\text{(hemorrhage deaths) / person-time}}
            {\text{(severe hemorrhage cases) / person-time}}
        = \frac{\text{hemorrhage cause specific mortality rate}}
            {\text{severe hemorrhage incidence rate}}.
    \end{aligned}

If this calculation results in a CFR exceeding 1, it should be clipped to 1.
However, we should record this somehow and revisit this strategy if it happens often.

Calculating years lived with disability
+++++++++++++++++++++++++++++++++++++++

We apply the YLDs per case for the corresponding severity level to each incident case to calculate YLDs.

.. math::

    \text{ylds\_per\_case\_severe} = \frac{\text{yld\_rate\_s181}}{\text{incidence\_s181}}

.. math::
  
    \text{ylds\_per\_case\_moderate} = \frac{\text{yld\_rate\_s180}}{\text{incidence\_s180}}

Note that we do *not* include YLDs for mild, moderate, or severe anemia due to postpartum hemorrhage (s_182, s_183, s_184) in our calculations because these
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
      - The exponentiated prediction of the GBD 2023 crosswalk model, age group specific using the age midpoint of the age group
      - Sample uncertainty from the normal distribution of uncertainty around the prediction.
        See https://github.com/ihmeuw/vivarium_gates_mncnh/pull/308 for data and details about how to extract this value.
        Note that there is a separate crosswalk for antepartum hemorrhage specifically, but there is no guarantee of the antepartum
        and postpartum fractions summing to 1 in the GBD data, so we will use the postpartum fraction from the overall maternal hemorrhage crosswalk to calculate the antepartum fraction as (1 - postpartum_fraction).
    * - ir
      - postpartum hemorrhage incidence risk per birth
      - postpartum_fraction * incidence_c367 / birth_rate
      - The value of ir is a probabiity in [0,1]. Denominator includes
        live births and stillbirths.
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
    * - yld_rate_s180
      - YLD rate per person-year due to moderate maternal hemorrhage
      - como
      - 
    * - yld_rate_s181
      - YLD rate per person-year due to severe maternal hemorrhage
      - como
      -

Validation Criteria
+++++++++++++++++++

In order to verify and validate the model, we should record at least the
following information:

- Number of simulants with live/stillbirth pregnancies in each age group
  before the maternal hemorrhage model is run
- Number of maternal hemorrhage cases and maternal hemorrhage deaths in each age
  group
- Number of maternal hemorrhage YLDs and YLLs in each age group

Using the above data, we should be able to verify/validate the
following:

- Validate the maternal hemorrhage incidence risk and case fatality rate in
  each age group against the corresponding quantities calculated from
  GBD data
- Validate the number of maternal hemorrhage deaths per population against
  the maternal hemorrhage CSMR from GBD
- Validate the total maternal hemorrhage YLDs and YLLs per population

Limitations
-----------

* Because we use the YLD rate and mortality rate of maternal hemorrhage overall, we are assuming that these are the same for postpartum hemorrhage as for antepartum hemorrhage.
* We assume that all postpartum hemorrhage fatalities occur among those with severe postpartum hemorrhage, which may not be the case in reality.
* We assume that postpartum hemorrhage is uncorrelated with antepartum hemorrhage, except for the causal effect through hemoglobin. In reality, there may be both confounding and a direct causal effect.
* Splitting out maternal hemorrhage (modeled as one cause in the GBD) into antepartum and postpartum hemorrhage (modeled as two separate causes in our model, with a vicious cycle between them through hemoglobin)
  will lead us to overestimate the total burden of maternal hemorrhage relative to GBD due to cases that have both antepartum and postpartum hemorrhage and have double-shifted hemoglobin.

References
----------
