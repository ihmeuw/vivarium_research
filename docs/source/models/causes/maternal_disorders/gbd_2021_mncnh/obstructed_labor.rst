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
     - 50 to 54 (ID=15)
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

References
----------
