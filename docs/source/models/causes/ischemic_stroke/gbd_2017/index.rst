.. _2017_cause_ischemic_stroke:

=========================
Ischemic Stroke: GBD 2017
=========================


Disease Description
-------------------

Stroke was defined according to WHO criteria - rapidly developing clinical
signs of focal (at times global) disturbance of cerebral function lasting more
than 24 hours or leading to death with no apparent cause other than that of
vascular origin. Data on transient ischaemic attack (TIA) were not included.
[WHO-Stroke-Definition]_


.. todo::

   Add more information and references. In particular, find data about global
   prevalence and relation to disease fatal and non-fatal description.


GBD 2017 Modeling Strategy
--------------------------


Strokes in GBD 2017
+++++++++++++++++++

Ischemic stroke is defined by GBD 2017 as an episode of neurological
dysfunction caused by focal cerebral, spinal, or retinal infarction.
[GBD-2017-YLD-Capstone-Appendix-1-Ischemic-Stroke]_


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
     - 0
     - [0, 7 days), age_group_id=2
   * - YLL age group end
     - 125
     - [95, 125 years), age_group_id=235
   * - YLD age group start
     - 0
     - [0, 7 days), age_group_id=2
   * - YLD age group end
     - 125
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

According to GBD 2017, stroke cases are considered acute from the day of
incidence of a first-ever stroke through day 28 following the event. Post,
also known as chronic, stroke includes the sequelae of an acute stroke AND all
recurrent stroke events. Stroke cases are considered post beginning 28 days
following the occurrence of an event. Post stroke includes the sequelae of an
acute stroke AND all recurrent stroke events.

.. image:: cause_model_is.svg


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
   * - S
     - **S**\ usceptible to Ischemic Stroke
     - Simulant that has not already had an ischemic stroke event
   * - A
     - **A**\ cute Ischemic Stroke
     - Simulant that is in duration-based period starting day of incidence of
       a first-ever stroke through day 28 following the event
   * - P
     - **P**\ ost Ischemic Stroke
     - Simulant that has survived more than 28 days following their last
       ischemic stroke and who may be experiencing chronic elevated mortality
       and disability due to the event.

.. todo::

   Discuss with the RT/SE team how to correctly assign ids into state data and
   transition equations, based on case definition of IS states.

.. list-table:: State Data
   :widths: 1, 5, 5, 10
   :header-rows: 1

   * - State
     - Measure
     - Value
     - Notes
   * - -
     - cause-specific mortality rate (csmr)
     - :math:`\frac{\text{deaths_c495}}{\text{population}}`
     -
   * - P
     - excess mortality rate (emr)
     - emr_m10837
     -
   * - A
     - excess mortality rate (emr)
     - emr_m9310
     -
   * - S
     - excess mortality rate (emr)
     - 0
     -
   * - P
     - disability weight
     - :math:`\frac{1}{\text{prevalence_c495}} \times \sum\limits_{s \in \text{chronic-sequelae}} \text{disability_weight}_s \cdot \text{prevalence}_s`
     -
   * - A
     - disability weight
     - :math:`\frac{1}{\text{prevalence_c495}} \times \sum\limits_{s \in \text{acute-sequelae}} \text{disability_weight}_s \cdot \text{prevalence}_s`
     -
   * - S
     - disability weight
     - 0
     -
   * - P
     - prevalence
     - :math:`\sum\limits_{s \in \text{chronic-sequelae}} \text{prevalence}_s`
     -
   * - A
     - prevalence
     - :math:`\sum\limits_{s \in \text{acute-sequelae}} \text{prevalence}_s`
     -
   * - S
     - prevalence
     - :math:`1 - \text{prev_c495}`
     -

.. list-table:: Transition Data
   :widths: 1, 1, 1, 5, 10
   :header-rows: 1

   * - Transition
     - Source State
     - Sink State
     - Value
     - Notes
   * - 1
     - S
     - A
     - incidence_c495
     -
   * - 2
     - A
     - P
     - 28 days
     - duration-based transition from acute state then progress into post state
   * - 3
     - P
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
   * - prevalence_c495
     - como
     - Prevalence of ischemic stroke
     -
   * - deaths_c495
     - codcorrect
     - Deaths from ischemic stroke
     -
   * - incidence_c495
     - como
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
     -
   * - disability_weight_s{`sid`}
     - YLD appendix
     - Disability weight of sequela with id `sid`
     -
   * - emr_m10837
     - dismod-mr 2.1
     - excess mortality rate of post ischemic stroke with CSMR
     -
   * - emr_m9310
     - dismod-mr 2.1
     - excess mortality rate of first ever acute ischemic stroke with CSMR
     -
   * - acute-sequelae
     - sequelae definition
     - {s386, s387, s388, s389, s390}
     -
   * - chronic-sequelae
     - sequelae definition
     - {s391, s392, s393, s394, s395, s946}
     -


Model Assumptions and Limitations
---------------------------------

Validation Criteria
-------------------

.. todo::

   Describe tests for model validation.


References
----------

.. [WHO-Stroke-Definition]
   Hatano S. Experience from a multicentre stroke register: a preliminary
   report. Bull WHO 54, 541- 553. 1976.

.. [GBD-2017-YLD-Capstone-Appendix-1-Ischemic-Stroke]
   Supplement to: `GBD 2017 Disease and Injury Incidence and Prevalence
   Collaborators. Global, regional, and national incidence, prevalence, and
   years lived with disability for 354 diseases and injuries for 195 countries
   and territories, 1990–2017: a systematic analysis for the Global Burden of
   Disease Study 2017. Lancet 2018; 392: 1789–858`
   (pp. 340-352)
