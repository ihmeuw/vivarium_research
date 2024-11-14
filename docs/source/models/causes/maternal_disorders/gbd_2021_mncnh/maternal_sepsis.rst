.. _2021_cause_maternal_sepsis_mncnh:

=============================================
Maternal sepsis and other maternal infections
=============================================

.. contents::
    :local:

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

        - **Maternal sepsis and other maternal infections (c_368)**

          - Infertility due to puerperal sepsis (s_675)

          - Puerperal sepsis (s_937)

          - Other maternal infections (s_938)

*Maternal sepsis and other maternal infections (c_368)* ia a most
detailed cause, at level 4 of the GBD hierarchy. It has three sequelae,
detailed in the following table:

.. list-table:: Sequelae of maternal sepsis and other maternal infections
    :header-rows: 1
    :widths: 2 1 5 5

    * - Sequela
      - GBD ID
      - Health state and disability weight
      - Notes
    * - Infertility due to puerperal sepsis
      - s_675
      - infertility, secondary

        DW: 0.005 (0.002–0.011)
      - Modeled under the infertility impairment. Secondary infertility
        means inability to have a livebirth after you've already had at
        least one child.
    * - Puerperal sepsis
      - s_937
      - infectious disease, acute episode, severe

        DW: 0.133 (0.088–0.19)
      -
    * - Other maternal infections
      - s_938
      - infectious disease, acute episode, moderate

        DW: 0.051 (0.032–0.074)
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

The goal of the maternal sepsis model is to capture YLLs and YLDs due to
maternal sepsis (and other maternal infections) among women of
reproductive age. We only model maternal sepsis among simulants who give
(live or still) birth after a full term pregnancy. This page documents
how to model the baseline burden of maternal sepsis. Other simulation
components such as azithromycin and c-sections will affect the rates of
maternal sepsis; such effects will be described on the pages for the
corresponding :ref:`intervention <intervention_models>` or :ref:`risk
effects <risk_effects_models>` model.

Summary of modeling strategy
++++++++++++++++++++++++++++

Since the :ref:`MNCNH Portfolio project
<2024_concept_model_vivarium_mncnh_portfolio>` does not model the
passage of time, we will not model maternal sepsis as a state machine
with dynamic state transitions like our typical cause models. Rather,
all "transitions" in the model will be modeled as decisions made during
a single timestep. To obtain the decision probabilities of each incident
case or maternal sepsis death, we will convert GBD's annual incidence
and mortality rates among women of reproductive age into event rates
*per birth* (including stillbirths). We will track maternal sepsis
deaths to calculate YLLs, and we will track incident cases to calculate
YLDs.

Assumptions and Limitations
+++++++++++++++++++++++++++

Cause Model Decision Graph
++++++++++++++++++++++++++

Although we're not modeling sepsis dynamically as a finite state
machine, we can draw an analogous directed graph that can be interpreted
as a (collapsed) decision tree rather than a state transition diagram.
The main difference is that the values on the transition arrows
represent decision probabilities rather than rates per unit time. The
maternal sepsis decision graph drawn below should be inserted on the
"full term pregnancy" branch of the decision graph from the
:ref:`pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`,
between the intrapartum model and the birth of the child simulant. Solid
lines are the pieces added by the maternal sepsis model, while dashed
lines indicate pieces of the underlying pregnancy model.

.. todo::

    Put an explanation like the following (but with more precision) on
    some central page (rather than on each individual model page):

        To convert the graph to a decision tree, recursively split nodes
        with more than one incoming arrow until all nodes except the
        root have one incoming edge. Each time a node is split, all its
        outgoing edges are replicated, which may lead to additional
        downstream splits. Equivalently, the tree structure can be
        implicitly recovered by remembering the path taken to get to
        each node.

    Jira ticket: https://jira.ihme.washington.edu/browse/SSCI-2006

.. graphviz::

    digraph sepsis_decisions {
        rankdir = LR;
        ftp [label="full term\npregnancy,\npost ipm", style=dashed]
        ftb [label="full term\nbirth", style=dashed]
        alive [label="parent alive"]
        dead [label="parent dead"]

        ftp -> alive  [label = "1 - ir"]
        ftp -> sepsis [label = "ir"]
        sepsis -> alive [label = "1 - cfr"]
        sepsis -> dead [label = "cfr"]
        alive -> ftb  [label = "1", style=dashed]
        dead -> ftb  [label = "1", style=dashed]
    }

.. list-table:: State Definitions
    :widths: 7 20
    :header-rows: 1

    * - State
      - Definition
    * - full term pregnancy, post ipm
      - Parent simulant has a full term pregnancy as determined by the
        :ref:`pregnancy model
        <other_models_pregnancy_closed_cohort_mncnh>`, **and** has
        already been through the antenatal and intrapartum models ("post
        ipm" stands for "post intrapartum model")
    * - sepsis
      - Parent simulant has maternal sepsis or another maternal
        infection
    * - parent alive
      - Parent simulant is still alive
    * - parent dead
      - Parent simulant died of maternal sepsis or another maternal
        infection
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
      - The probability that a pregnant simulant gets maternal sepsis or
        another maternal infection
    * - cfr
      - case fatality rate
      - The probability that a simulant with sepsis or another maternal
        infection dies of that infection

Data Tables
+++++++++++

The maternal sepsis cause model requires two probabilities, the
incidence risk (ir) per birth and the case fatality rate (cfr), for use
in the decision graph. The incidence risk per birth will be computed as

.. math::

    \text{ir} = \frac{\text{sepsis cases}}{\text{births}}
        = \frac{\text{(sepsis cases) / person-time}}
            {\text{births / person-time}}
        = \frac{\text{sepsis incidence rate}}{\text{birth rate}}.

The case fatality rate will be computed as

.. math::

    \begin{align*}
    \text{cfr} &= \frac{\text{sepsis deaths}}{\text{sepsis cases}} \\
        &= \frac{\text{(sepsis deaths) / person-time}}
            {\text{(sepsis cases) / person-time}}
        = \frac{\text{sepsis cause specific mortality rate}}
            {\text{sepsis incidence rate}}.
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
      - maternal sepsis incidence risk per birth
      - incidence_c368 / birth_rate
      - The value of ir is a probabiity in [0,1]. Denominator includes
        live births and stillbirths.
    * - cfr
      - case fatality rate of maternal sepsis
      - csmr_c368 / incidence_368
      - The value of cfr is a probabiity in [0,1]
    * - incidence_c368
      - incidence rate of maternal sepsis and other maternal infections
      - como
      - Use the :ref:`total population incidence rate <total population
        incidence rate>` directly from GBD and do not rescale this
        parameter to susceptible-population incidence rate using
        condition prevalence. Total population person-time is used in
        the denominator in order to cancel out with the person-time in
        the denominators of birth_rate and csmr_c368.
    * - csmr_c368
      - maternal sepsis cause-specific mortality rate
      - deaths_c368 / population
      - Note that deaths / (average population for year) = deaths / person-time
    * - deaths_c368
      - count of deaths due to maternal sepsis and other maternal
        infections
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
    * - yld_rate_c368
      - rate of maternal sepsis YLDs per person-year
      - como
      -
    * - ylds_per_case_c368
      - YLDs per case of maternal sepsis
      - yld_rate_c368 / incidence_c368
      -


Calculating Burden
++++++++++++++++++

Years of life lost
"""""""""""""""""""

The years of life lost (YLLs) due to maternal sepsis for a simulant who
dies of maternal sepsis or other maternal infections at age :math:`a`
should equal :math:`\operatorname{TMRLE}(a) - a`, where
:math:`\operatorname{TMRLE}(a)` is the theoretical minimum risk life
expectancy for a person of age :math:`a`.

Years lived with disability
"""""""""""""""""""""""""""

For simplicity, each simulant with an incident case of maternal sepsis
or other maternal infections in a given age group  will accrue the same
number of years lived with disability (YLDs). Specifically, the total
number of maternal sepsis YLDs accrued by each infected simulant should
be the average number of YLDs per case of maternal sepsis in the
simulant's age group, which is defined in the above data table as

.. math::

    \begin{align*}
    \text{ylds_per_case_c368}
        &= \frac{\text{sepsis YLDs}}{\text{sepsis cases}}\\
        &= \frac{\text{(sepsis YLDs) / person-time}}
            {\text{(sepsis cases) / person-time}}
        = \frac{\text{sepsis YLD rate}}{\text{sepsis incidence rate}}.
    \end{align*}

We are using the fact that  each simulant can get at most one case of
maternal sepsis during the simulation, so the average number of YLDs per
infected simulant is the same as the average number of YLDs per case.
Simulants with a case of sepsis should accrue YLDs whether or not they
die.

.. admonition:: Limitation

    The above strategy of computing average maternal sepsis YLDs per
    case should correctly capture total YLDs for the acute sequelae
    "puerperal_sepsis" and "other_maternal_infections". However, **when
    we compute averted YLDs, the above calculation will not correctly
    count secondary infertility YLDs from the long-term sequela
    "infertility_due_to_puerperal_sepsis"**, for two reasons:

    #. Infertility YLDs for a given age group will include infertility
       triggered not only by sepsis cases caused by current births, but
       by sepsis cases caused by prior births. This means that we are
       assigning extra YLDs to each current sepsis case that are
       actually being accrued by other, nonpregnant people in the
       population who have lasting impacts of a previous birth and have
       nothing to do with the sepsis case we are modeling.

    #. If the modeled birth and puerperal sepsis case *does* cause
       infertility, the total infertility YLDs will be spread out over
       the simulant's remaining reproductive years, occurring in later
       age groups, not entirely in the simulant's current age group.
       Thus we will be "missing" a large portion of the YLDs caused by
       the current birth events when we tally up YLDs for births in the
       simulant's current age group.

    Thus, if we avert a case of sepsis, we will be simultaneously
    averting *extra* YLDs that we shouldn't be, because we are counting
    YLDs that don't actually belong to the simulant whose case was
    averted, as well as *missing* YLDs that should have been averted
    because we are only counting YLDs in the simulant's current age
    group, and not the YLDs that they would accrue in later years. Since
    births and hence incident cases of maternal sepsis `generally
    decrease with age <http://ihmeuw.org/6q63>`_, while cases of
    secondary infertility `generally increase with age
    <http://ihmeuw.org/6q62>`_, we will probably be systematically
    *undercounting* the YLDs that would be averted by each averted case
    of sepsis, because for a sepsis case, the missed YLDs for the
    simulant in question will on average be greater than the extraneous
    YLDs from other simulants in the same age group.

    It may be possible to develop a different strategy of counting YLDs
    that would help correct this bias, but the discrepancy will likely
    be a relatively small proportion of total DALYs, so we are willing
    to accept this limitation for now.

Validation Criteria
+++++++++++++++++++

References
----------
