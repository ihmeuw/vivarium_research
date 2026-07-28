.. _2023_cause_postpartum_hemorrhage_mncnh:

=====================
Postpartum hemorrhage
=====================

Disease Overview
----------------

GBD 2023 Modeling Strategy
--------------------------

Postpartum hemorrhage does not appear in the GBD cause hierarchy.
It is a *subset* of maternal hemorrhage (c_367), which is a most detailed cause in GBD 2023. 
GBD defines maternal hemorrhage (and therefore postpartum hemorrhage) as bleeding in excess of 500 mL within 24 hours after birth.
Note that in October 2025 the WHO issued new guidelines redefining postpartum hemorrhage as bleeding in excess of **300 mL**,
which has not yet been incorporated into GBD.

Cause Hierarchy
+++++++++++++++

The relevant portion of the GBD cause hierarchy is as follows:

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
we will use a combination of GBD data (which is relevant to the 500 mL definition of postpartum hemorrhage)
and data from the E-MOTIVE trial to inform the 300 mL threshold decisions.
We will convert GBD's annual rates
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
        start
        end
        alive
        dead

        start -> alive [label = "1 - ir_300mL"]
        start -> hemorrhage_300mL [label = "ir_300mL"]
        hemorrhage_300mL -> alive [label = "1 - ir_500mL"]
        hemorrhage_300mL -> hemorrhage_500mL [label = "ir_500mL"]
        hemorrhage_500mL -> alive [label = "1 - ir_1000mL"]
        hemorrhage_500mL -> hemorrhage_1000mL [label = "ir_1000mL"]
        hemorrhage_1000mL -> alive [label = "1 - cfr"]
        hemorrhage_1000mL -> dead [label = "cfr"]
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
        <other_models_pregnancy_closed_cohort_mncnh>` and not have died from antepartum hemorrhage (due to condition on the overall intrapartum component)
    * - hemorrhage_300ml
      - Parent simulant loses at least 300 mL of blood postpartum (WHO 2025 definition of postpartum hemorrhage)
    * - hemorrhage_500ml
      - Parent simulant loses at least 500 mL of blood postpartum (GBD 2023 definition of postpartum hemorrhage)
    * - hemorrhage_1000ml
      - Parent simulant loses at least 1000 mL (1 L) of blood postpartum (i.e., has severe postpartum hemorrhage)
    * - alive
      - Parent simulant did not die of postpartum hemorrhage
    * - dead
      - Parent simulant died of postpartum hemorrhage
    * - end
      -

.. list-table:: Transition Probability Definitions
    :widths: 1 5 20
    :header-rows: 1

    * - Symbol
      - Name
      - Definition
    * - ir_300ml
      - incidence risk of 300 mL postpartum hemorrhage
      - The probability that a pregnant simulant loses at least 300 mL of blood postpartum
    * - ir_500ml
      - incidence risk of 500 mL postpartum hemorrhage
      - The probability that a simulant who loses at least 300 mL of blood postpartum loses at least 500 mL
    * - ir_1000ml
      - incidence risk of 1000 mL postpartum hemorrhage
      - The probability that a simulant who loses at least 500 mL of blood postpartum has blood loss of 1000 mL or more (i.e., severe postpartum hemorrhage).
        Note that this is called :math:`\text{severe\_fraction}` in the antepartum hemorrhage cause model.
    * - cfr
      - case fatality rate
      - The probability that a simulant with 1000 mL postpartum hemorrhage dies of that hemorrhage

Probabilities
+++++++++++++

The postpartum hemorrhage cause model requires four probabilities, the
300 mL incidence risk (ir_300mL) per birth,
the 500 mL incidence risk (ir_500mL) per case of at least 300 mL blood loss,
the 1000 mL incidence risk (ir_1000ml) per case of at least 500 mL blood loss,
and the case fatality rate (cfr) per case of 1000 mL postpartum hemorrhage,
for use in the decision graph.

First, even though it won't directly be used, it is helpful to define the 500 mL incidence risk per birth (ir_500mL_per_birth)
using only GBD data (before incorporating the E-MOTIVE trial data) as follows:

.. math::

    \text{ir\_500mL\_per\_birth} = \frac{\text{postpartum hemorrhage cases}}{\text{births} - \text{antepartum hemorrhage deaths}}
        = \frac{\text{(postpartum hemorrhage cases) / person-time}}
            {\text{births / person-time} - \text{(antepartum hemorrhage deaths) / person-time}}
        = \frac{\text{maternal hemorrhage incidence rate} \times \text{postpartum\_fraction}}{\text{birth rate} - \text{antepartum hemorrhage cause-specific mortality rate}}.

Like all incidence risks, this is a probabiity in [0,1]. Its denominator includes
live births and stillbirths among parents who did not die from antepartum hemorrhage.

The 300 mL incidence risk per birth is then:

.. math::

    \text{ir\_300mL} = \text{ir\_500mL\_per\_birth} \times \frac{1}{\text{ir\_500mL}}.

We get the 500 mL incidence risk per case of at least 300 mL directly from the data, see table below.

The 1000 mL incidence risk per case of at least 500 mL blood loss will be computed as

.. math::

    \text{ir\_1000ml} = \frac{\text{incidence\_s181}}{\text{incidence\_s181} + \text{incidence\_s180}}.

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

    \text{ylds\_per\_case\_1000mL} = \frac{\text{yld\_rate\_s181}}{\text{incidence\_s181}}

.. math::
  
    \text{ylds\_per\_case\_500mL\_to\_1L} = \frac{\text{yld\_rate\_s180}}{\text{incidence\_s180}}
  
.. math::
  
    \text{ylds\_per\_case\_300mL\_to\_500mL} = \text{ylds\_per\_case\_500mL\_to\_1L} / 2

Note that we do *not* include YLDs for mild, moderate, or severe anemia due to postpartum hemorrhage (s_182, s_183, s_184) in our calculations because these
sequelae are already counted under the anemia cause model, and we want to avoid double counting.
We do, however, by including disability for the 300-500mL category, count more disability than GBD does.
The choice of half the YLDs for the 300mL-500mL category vs the YLDs for the 500mL-1L category is arbitrary,
picked between the logical bounds (0 and the YLDs for 500mL-1L).

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
      - The exponentiated prediction of the GBD 2023 postpartum hemorrhage crosswalk model, age group specific using the age midpoint of the age group
      - Sample uncertainty from the normal distribution of uncertainty around the prediction, before exponentiating.
        Clip to be no greater than 1 after exponentiating (which should very rarely occur).
        See `the notebook <https://github.com/ihmeuw/vivarium_gates_mncnh/blob/ec5b9d663a929beb1a9aefad3917fa1b03e29e01/src/vivarium_gates_mncnh/data/postpartum_hemorrhage_split/postpartum_hemorrhage_split.ipynb>`__ for more details about the crosswalk model and how to extract this value.
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
    * - antepartum_hemorrhage_csmr
      - cause-specific mortality rate of antepartum hemorrhage
      - csmr_c367 * (1 - postpartum_fraction)
      - See :ref:`antepartum hemorrhage document <2023_cause_antepartum_hemorrhage_mncnh>` for more details on how this value is calculated.
    * - ir_500mL_per_300mL_case
      - incidence risk of postpartum hemorrhage of at least 500 mL when postpartum hemorrhage of at least 300 mL has occurred
      - 45.33% (95% CI: 44.61%, 46.05%)
      - This value is derived from unpublished data shared with us by the E-MOTIVE trial team, along with published data from the trial report [E-MOTIVE]_, all of which can be found at :code:`J:\\Project\\simulation_science\\mnch_grant\\MNCNH portfolio\\EMOTIVE trial data.xlsx`.
        The confidence interval was calculated using the normal approximation to the binomial distribution (see spreadsheet for calculation).
        Assume a normal distribution of uncertainty when sampling values.

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
* The ratio between 300mL+ and 500mL+ blood loss is informed by the E-MOTIVE trial, which included only vaginal deliveries.
  This is likely to differ for cesarean deliveries, but we do not have any data about this.
* The choice of YLDs for the 300-500mL category is arbitrary, and we do not have any data to inform this choice.

References
----------

.. [E-MOTIVE]
  Gallos, Ioannis, et al. "Randomized trial of early detection and treatment of postpartum hemorrhage." New England Journal of Medicine 389.1 (2023): 11-21.
