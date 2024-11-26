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

Assumptions and Limitations
+++++++++++++++++++++++++++

Cause Model Diagram
+++++++++++++++++++

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

Years lived with disability
"""""""""""""""""""""""""""

Validation Criteria
+++++++++++++++++++

References
----------
