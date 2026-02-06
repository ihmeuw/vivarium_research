.. _2021_cause_maternal_hemorrhage_mncnh:

===================
Maternal hemorrhage
===================

.. note::

  There were no updates to this modeling strategy between GBD 2021 and GBD 2023 so this document can be used for both GBD rounds

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
hemorrhage among simulants who give (live or still) birth.
This page documents how to model the baseline burden of maternal 
hemorrhage. Other simulation components such as c-sections will affect the 
rates of maternal hemorrhage; such effects will be described on the pages 
for the corresponding :ref:`intervention <intervention_models>` or 
:ref:`risk effects <risk_effects_models>` model.

Summary of modeling strategy
++++++++++++++++++++++++++++

Because we can assume incident cases of maternal hemorrhage all occur at the end of pregnancy,
we will not model maternal hemorrhage as a state machine
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
        hemorrhage -> alive [label = "1 - cfr"]
        hemorrhage -> dead [label = "cfr"]
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
      - Parent simulant has maternal hemorrhage
    * - parent not dead of maternal hemorrhage
      - Parent simulant did not die of maternal hemorrhage
    * - parent died of maternal hemorrhage
      - Parent simulant died of maternal hemorrhage
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
      - The probability that a pregnant simulant gets maternal hemorrhage
    * - cfr
      - case fatality rate
      - The probability that a simulant with hemorrhage dies of that hemorrhage

Data Tables
+++++++++++

The maternal hemorrhage cause model requires two probabilities, the
incidence risk (ir) per birth and the case fatality rate (cfr), for use
in the decision graph. The incidence risk per birth will be computed as

.. math::

    \text{ir} = \frac{\text{hemorrhage cases}}{\text{births}}
        = \frac{\text{(hemorrhage cases) / person-time}}
            {\text{births / person-time}}
        = \frac{\text{hemorrhage incidence rate}}{\text{birth rate}}.

The case fatality rate will be computed as

.. math::

    \begin{align*}
    \text{cfr} &= \frac{\text{hemorrhage deaths}}{\text{hemorrhage cases}} \\\\
        &= \frac{\text{(hemorrhage deaths) / person-time}}
            {\text{(hemorrhage cases) / person-time}}
        = \frac{\text{hemorrhage cause specific mortality rate}}
            {\text{hemorrhage incidence rate}}.
    \end{align*}

The following table shows the data needed from GBD for these
calculations as well as for the calculation of YLDs in the next section.

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
      - maternal hemorrhage incidence risk per birth
      - incidence_c367 / birth_rate
      - The value of ir is a probabiity in [0,1]. Denominator includes
        live births and stillbirths.
    * - cfr
      - case fatality rate of maternal hemorrhage
      - csmr_c367 / incidence_c367
      - The value of cfr is a probabiity in [0,1]
    * - incidence_c367
      - incidence rate of maternal hemorrhage
      - como
      - Use the :ref:`total population incidence rate <total population
        incidence rate>` directly from GBD and do not rescale this
        parameter to susceptible-population incidence rate using
        condition prevalence. Total population person-time is used in
        the denominator in order to cancel out with the person-time in
        the denominators of birth_rate and csmr_c367.
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
    * - yld_rate_c367
      - rate of maternal hemorrhage YLDs per person-year
      - como
      -
    * - anemia_yld_rate_c367
      - rate of YLDs due to anemia caused by maternal hemorrhage per person-year
      - como, sum of YLDs per person year across sequela 182, 183, and 184
      - 
    * - ylds_per_case_c367
      - YLDs per case of maternal hemorrhage
      - (yld_rate_c367 - anemia_yld_rate_c367) / incidence_c367
      - Note that YLDs due to anemia will be calculated in the hemoglobin/anemia model and therefore should not be double-counted in this cause model

Calculating Burden
++++++++++++++++++

Years of life lost
"""""""""""""""""""

Years lived with disability
"""""""""""""""""""""""""""

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

References
----------
