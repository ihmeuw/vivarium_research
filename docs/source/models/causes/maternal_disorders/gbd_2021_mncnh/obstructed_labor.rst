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

Years lived with disability
"""""""""""""""""""""""""""

Validation Criteria
+++++++++++++++++++

In order to verify and validate the model, we should record at least the
following information:

- Number of simulants with full term pregnancies in each age group
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
  against the rates from GBD

References
----------
