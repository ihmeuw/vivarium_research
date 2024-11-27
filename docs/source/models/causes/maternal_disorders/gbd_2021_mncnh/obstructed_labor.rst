.. 2021_cause_obstructed_labor_mncnh:

====================================
Obstructed labor and uterine rupture
====================================

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

        - **Obstructed labor and uterine rupture (c_370)**

            - Obstructed labor, acute event (s_188)

            - Rectovaginal fistula (s_189)

            - Vesicovaginal fistula (s_190)

*Obstructed labor and uterine rupture (c_370)* ia a most
detailed cause, at level 4 of the GBD hierarchy. It has three sequelae,
detailed in the following table:

.. list-table:: Sequelae of obstructed labor and uterine rupture
    :header-rows: 1
    :widths: 2 1 5 5

    * - Sequela
      - GBD ID
      - Health state and disability weight
      - Notes
    * - Obstructed labor, acute event 
      - s_188
      - abdominopelvic problem, severe 

        DW: 0.324 (0.22–0.442) 
      - 
    * - Rectovaginal fistula 
      - s_189
      - rectovaginal fistula 

        DW: 0.501 (0.339–0.657)
      - Rectovaginal fistula is defined as an abnormal opening between the vagina and 
        the rectum with involuntary escape of flatus and/or faeces 
        following childbirth.  The non-fatal burden of fistulas is included in the 
        non-fatal burden of obstructed labour in reporting, but estimation is 
        described in a separate appendix section on “Fistula – impairment.”
    * - Vesicovaginal fistula
      - s_190
      - vesicovaginal fistula

        DW: 0.342 (0.227–0.478) 
      - Vesicovaginal  fistula is defined as an abnormal opening between the vagina and 
        the bladder with involuntary escape of urine following childbirth.  The non-fatal 
        burden of fistulas is included in the non-fatal burden of obstructed labour in 
        reporting, but estimation is described in a separate appendix section on 
        “Fistula – impairment.”

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
     - 95 plus (ID=235)
     -

Vivarium Modeling Strategy
--------------------------

Scope
+++++

The goal of the obstructed labor (OL) model is to capture YLLs and YLDs due to
obstructed labor and uterine rupture among women of
reproductive age. We only model obstructed labor and uterine rupture among 
simulants who give (live or still) birth after a full term pregnancy. This 
page documents how to model the baseline burden of obstructed labor and 
uterine rupture. Other simulation components such as c-sections will affect 
the rates of obstructed labor; such effects will be described on the pages for the corresponding :ref:`intervention <intervention_models>`
or :ref:`risk effects <risk_effects_models>` model.

Summary of modeling strategy
++++++++++++++++++++++++++++

Since the :ref:`MNCNH Portfolio project
<2024_concept_model_vivarium_mncnh_portfolio>` does not model the
passage of time, we will not model obstructed labor and uterine rupture
as a state machine with dynamic state transitions like our typical cause 
models. Rather, all "transitions" in the model will be modeled as decisions 
made during a single timestep. To obtain the decision probabilities of each 
incident case or obstructed labor and uterine rupture death, we will convert 
GBD's annual incidence and mortality rates among women of reproductive age 
into event rates *per birth* (including stillbirths). We will track obstructed 
labor and uterine rupture deaths to calculate YLLs, and we will track incident 
cases to calculate YLDs.

Assumptions and Limitations
+++++++++++++++++++++++++++

Cause Model Decision Graph
++++++++++++++++++++++++++

Although we're not modeling obstructed labor and uterine rupture
dynamically as a finite state machine, we can draw an analogous directed 
graph that can be interpreted as a (collapsed) decision tree rather than 
a state transition diagram. The main difference is that the values on the 
transition arrows represent decision probabilities rather than rates per 
unit time. The obstructed labor and uterine rupture decision graph drawn 
below should be inserted on the "full term pregnancy" branch of the decision 
graph from the :ref:`pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`,
between the intrapartum model and the birth of the child simulant. Solid
lines are the pieces added by the obstructed labor and uterine rupture model, 
while dashed lines indicate pieces of the underlying pregnancy model.

.. graphviz::

    digraph OL_decisions {
        rankdir = LR;
        ftp [label="full term\npregnancy, post\nintrapartum", style=dashed]
        ftb [label="full term\nbirth", style=dashed]
        alive [label="parent did not\ndie of OL"]
        dead [label="parent died\nof OL"]

        ftp -> alive  [label = "1 - ir"]
        ftp -> OL [label = "ir"]
        OL -> alive [label = "1 - cfr"]
        OL -> dead [label = "cfr"]
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
    * - OL
      - Parent simulant experiences obstructed labor or uterine rupture
    * - parent did not die of OL 
      - Parent simulant did not die of obstructed labor or uterine rupture
    * - parent died of OL
      - Parent simulant died of obstructed labor or uterine rupture
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
      - The probability that a pregnant simulant experiences obstructed 
        labor or uterine rupture
    * - cfr
      - case fatality rate
      - The probability that a simulant who experiences obstructed labor or uterine rupture dies of that 
        event


Data Tables
+++++++++++

The obstructed labor and uterine rupture cause model requires two probabilities, the
incidence risk (ir) per birth and the case fatality rate (cfr), for use
in the decision graph. The incidence risk per birth will be computed as

.. math::
    \text{ir} = \frac{\text{OL cases}}{\text{births}}
        = \frac{\text{(OL cases) / person-time}}
            {\text{births / person-time}}
        = \frac{\text{OL incidence rate}}{\text{birth rate}}.

  The case fatality rate will be computed as

.. math::
    \begin{align*}
    \text{cfr} &= \frac{\text{OL deaths}}{\text{OL cases}} \\
        &= \frac{\text{(OL deaths) / person-time}}
            {\text{(OL cases) / person-time}}
        = \frac{\text{OL cause specific mortality rate}}
            {\text{OL incidence rate}}.
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
      - obstructed labor and uterine rupture incidence risk per birth
      - incidence_c370 / birth_rate
      - The value of ir is a probabiity in [0,1]. Denominator includes
        live births and stillbirths.
    * - cfr
      - case fatality rate of obstructed labor and uterine rupture
      - csmr_c370 / incidence_368
      - The value of cfr is a probabiity in [0,1]
    * - incidence_c370
      - incidence rate of obstructed labor and uterine rupture
      - como
      - Use the :ref:`total population incidence rate <total population
        incidence rate>` directly from GBD and do not rescale this
        parameter to susceptible-population incidence rate using
        condition prevalence. Total population person-time is used in
        the denominator in order to cancel out with the person-time in
        the denominators of birth_rate and csmr_c370.
    * - csmr_c370
      - obstructed labor and uterine rupture cause-specific mortality rate
      - deaths_c370 / population
      - Note that deaths / (average population for year) = deaths / person-time
    * - deaths_c370
      - count of deaths due to obstructed labor and uterine rupture
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
    * - yld_rate_c370
      - rate of obstructed labor and uterine rupture YLDs per person-year
      - como
      -
    * - ylds_per_case_c370
      - YLDs per case of obstructed labor and uterine rupture
      - yld_rate_c370 / incidence_c370
      -

Calculating Burden
++++++++++++++++++

Years of life lost
"""""""""""""""""""

The years of life lost (YLLs) due to obstructed labor or uterine rupture
for a simulant who dies of obstructed labor or uterine rupture at age :math:`a`
should equal :math:`\operatorname{TMRLE}(a) - a`, where
:math:`\operatorname{TMRLE}(a)` is the theoretical minimum risk life
expectancy for a person of age :math:`a`.

Years lived with disability
"""""""""""""""""""""""""""

For simplicity, each simulant with an incident case of obstructed labor
or uterine rupture in a given age group  will accrue the same
number of years lived with disability (YLDs). Specifically, the total
number of obstructed labor YLDs accrued by each affected simulant should
be the average number of YLDs per case of obstructed labor or uterine 
rupture in the simulant's age group, which is defined in the above data 
table as

.. math::

    \begin{align*}
    \text{ylds_per_case_c368}
        &= \frac{\text{OL YLDs}}{\text{OL cases}}\\
        &= \frac{\text{(OL YLDs) / person-time}}
            {\text{(OL cases) / person-time}}
        = \frac{\text{OL YLD rate}}{\text{OL incidence rate}}.
    \end{align*}

We are using the fact that  each simulant can get at most one case of
obstructed labor or uterine rupture during the simulation, so the average 
number of YLDs per affected simulant is the same as the average number of 
YLDs per case. Simulants with a case of obstructed labor or uterine rupture
should accrue YLDs whether or not they die.

.. admonition:: Limitation

    The above strategy of computing average OL YLDs per
    case should correctly capture total YLDs for the acute sequela
    "obstructed labor, acute event". However, **when
    we compute averted YLDs, the above calculation will not correctly
    count uncured or untreated fistula YLDs from the long-term sequelae 
    "rectovaginal_fistula" or "vesicovaginal_fistula"**, for two reasons:

    #. Fistula YLDs for a given age group will include not only OL or 
       uterine ruptures caused by current births, but by OL or 
       uterine ruptures caused by prior births. This means that we are 
       assigning extra YLDs to each current OL or uterine rupture case
       that are actually being accrued by other, nonpregnant people in
       the population who have lasting impacts of a previous birth and 
       have nothing to do with the OL or uterine rupture case we are modeling.

    #. If the modeled birth and uterine rupture case *does* lead to an
       uncured or untreated fistula, the total fistula YLDs will be spread 
       out over the simulant's remaining lifetime, occurring in later
       age groups, not entirely in the simulant's current age group (when using the "prevalence YLD" approach currently employed by GBD).
       Thus we will be missing a portion of the YLDs caused by
       the current birth events when we tally up YLDs for births in the
       simulant's current age group.

    Thus, if we avert a case of OL or uterine rupture, we will be simultaneously
    averting *extra* YLDs that we shouldn't be, because we are counting
    YLDs that don't actually belong to the simulant whose case was
    averted, as well as *missing* YLDs that should have been averted
    because we are only counting YLDs in the simulant's current age
    group, and not the YLDs that they would accrue in later years. Since
    births and hence incident cases of OL or uterine rupture `generally
    decrease with age <https://vizhub.healthdata.org/gbd-compare/#>`_, while cases of
    uncured or untreated fistulas increase with age until age group 11 (and fistula YLDs can
    continue accruing all the way through the 95+ age group, unlike YLDs caused by sepsis
    or hemorrhage), we *might* be systematically *undercounting* the YLDs that would be 
    averted by each averted case of OL, because for a OL case, the missed 
    YLDs for the simulant in question will on average be greater than 
    the extraneous YLDs from other simulants in the same age group. 

    It may be possible to develop a different strategy of counting YLDs (such as switching to "incidence YLDs")
    that would help correct this bias, but the discrepancy will likely
    be a relatively small proportion of total DALYs, so we are willing
    to accept this limitation for now.

Validation Criteria
+++++++++++++++++++

In order to verify and validate the model, we should record at least the
following information:

- Number of simulants with full term pregnancies in each age group
  before the OL and uterine rupture model is run
- Number of OL and uterine rupture cases and OL and uterine rupture deaths in each age
  group
- Number of OL and uterine rupture YLDs and YLLs in each age group

Using the above data, we should be able to verify/validate the
following:

- Validate the OL and uterine rupture incidence risk and case fatality rate in
  each age group against the corresponding quantities calculated from
  GBD data
- Validate the number of OL and uterine rupture deaths per population against
  the OL and uterine rupture CSMR from GBD
- Validate the total OL and uterine rupture YLDs and YLLs per population
  against the rates from GBD

References
----------
