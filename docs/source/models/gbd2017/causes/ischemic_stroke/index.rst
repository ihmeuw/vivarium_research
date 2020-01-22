.. _2017_cause_ischemic_stroke:

===============
Ischemic Stroke
===============

Disease Description
-------------------

.. todo::

   Add more information and references. In particular, find data about global prevalence and relation to disease fatal and non-fatal description.





GBD 2017 Modeling Strategy
--------------------------

Strokes in GBD 2017
+++++++++++++++++++


Cause Hierarchy
++++++++++++++++
.. image:: cause_hierarchy_is.svg

Restrictions
++++++++++++

The following table describes any restrictions in GBD 2017 on the effects of
this cause (such as being only fatal or only nonfatal), as well as restrictions
on the ages and sexes to which the cause applies.

.. list-table:: GBD 2017 Cause Restrictions
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     - False
     -
   * - Female only
     - False
     -
   * - YLL only
     - False
     -
   * - YLD only
     - False
     -
   * - YLL age group start
     - Early Neonatal
     - [0, 7 days), age_group_id=2
   * - YLL age group end
     - 95 plus
     - [95, 125 years), age_group_id=235
   * - YLD age group start
     - Early Neonatal
     - [0, 7 days), age_group_id=2
   * - YLD age group end
     - 95 plus
     - [95, 125 years), age_group_id=235

.. todo::

   Describe more assumptions and limitations of the model.

Vivarium Modeling Strategy
--------------------------

Scope
+++++

Model Assumptions and Limitations
+++++++++++++++++++++++++++++++++

Cause Model Diagram
-------------------

According to GBD 2017, stroke cases are considered acute from the day of incidence of a first-ever stroke through day 28 following the event. Chronic stroke includes the sequelae of an acute stroke AND all recurrent stroke events. Stroke cases are considered chronic beginning 28 days following the occurrence of an event. Chronic stroke includes the sequelae of an acute stroke AND all recurrent stroke events.

.. image:: ischemic_stroke_transitions.svg


Data Description
----------------

State and Transition Data Tables
++++++++++++++++++++++++++++++++

.. list-table:: State Definitions
   :widths: 1, 5, 20
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - A
     - **A**\ cute Ischemic Stroke
     - Simulant that is in duration-based period starting day of incidence of a first-ever stroke through day 28 following the event
   * - C
     - **C**\ hronic Ischemic Stroke
     - Simulant that is in duration-based period beginning 28 days following the occurrence of a stroke event

.. todo::

   Discuss with the RT/SE team how to correctly assign ids into state data and transition equations, based on case definition of IS states.

.. list-table:: State Data
   :widths: 1, 5, 5, 10
   :header-rows: 1

   * - State
     - Measure
     - Value
     - Notes
   * - A
     - prevalence
     - prevalence_s6116
     -
   * - C
     - prevalence
     - prevalence_s6248
     -
   * - A
     - excess mortality rate
     - :math:`\frac{\text{deaths_s6116}}{\text{population} \,\times\, \text{prevalence_s6116}}`
     - = (cause-specific mortality rate) / prevalence or should we just use emr_meid9310 (from htn diagram)
   * - A
     - disability weight
     - :math:`\displaystyle{\sum_{s\in \text{s6116}}} \scriptstyle{\text{disability_weight}_s \,\times\, \text{prevalence}_s}`
     - = average disability weight over all sequelae (but since only sequela for acute IS is s6116, do we need to update this state?)
   * - C
     - excess mortality rate
     - 0
     -
   * - C
     - disability weight
     - :math:`\displaystyle{\sum_{s\in \text{sequelae in c_495}}} \scriptstyle{\text{disability_weight}_s \,\times\, \text{prevalence}_s}`
     - = average disability weight over all sequelae
   * - All A
     - cause-specific mortality rate
     - :math:`\frac{\text{deaths_s6116}}{\text{population}}`
     -
   * - All C
     - cause-specific mortality rate
     - :math:`\frac{\text{deaths_s6248}}{\text{population}}`
     -

.. list-table:: Transition Data
   :widths: 1, 1, 1, 5, 10
   :header-rows: 1

   * - Transition
     - Source State
     - Sink State
     - Value
     - Notes
   * - i
     - S 
     - A 
     - incidence_c495
     - 
   * - duration-based
     - A 
     - C 
     - 28-day duration in acute state then progress
     - 
   * - i
     - C
     - A 
     - incidence_c495
     - 

.. list-table:: Data Sources and Definitions
   :widths: 1, 3, 10, 10
   :header-rows: 1

   * - Value
     - Source
     - Description
     - Notes
   * - prevalence_s6116
     - dismod
     - Prevalence of first ever acute ischemic stroke with CSMR
     - Confirm if dismod or como, as referred to GBD 2017 to assign source
   * - prevalence_s6248
     - dismod
     - Prevalence of chronic ischemic stroke with CSMR
     - Confirm if dismod or como, as referred to GBD 2017 to assign source
   * - deaths_s6116
     - codcorrect
     - Deaths from acute ischemic stroke
     -
   * - deaths_s6248
     - codcorrect
     - Deaths from chronic ischemic stroke
     -
   * - incidence_c495
     - dismod
     - Incidence of ischemic stroke
     -
   * - population
     - demography
     - Mid-year population for given age/sex/year/location
     -
   * - sequelae_c495
     - gbd_mapping
     - List of 11 sequelae for ischemic stroke
     -
   * - prevalence_s{`sid`}
     - como
     - Prevalence of sequela with id `sid`
     - Confirm if needed, as GBD 2017 states that chronic IS includes ALL sequelae of IS
   * - disability_weight_s{`sid`}
     - YLD Appendix
     - Disability weight of sequela with id `sid`
     -


Model Assumptions and Limitations
---------------------------------

Validation Criteria
-------------------

.. todo::

   Describe tests for model validation.


References
----------