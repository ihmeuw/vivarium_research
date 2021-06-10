.. _2019_cause_ischemic_stroke:

===============
Ischemic Stroke
===============

Disease Overview
----------------

A stroke occurs when the blood supply to part of your brain is interrupted or reduced, preventing brain tissue from getting oxygen and nutrients. There are two main causes of stroke: a blocked artery (ischemic stroke) or leaking or bursting of a blood vessel (intracerebral hemorrhage and subarachnoid hemorrhage (combination is referred to as hemorrhagic stroke). Some people may have only a temporary disruption of blood flow to the brain. This is known as a transient ischemic attack (TIA); symptoms of a TIA last less than 24 hours. While there are no long term-effects of TIAs, they have been shown to increase the risk of subsequent strokes. 

 
Ischemic stroke is the most common type of stroke, particularly in older adults. An ischemic stroke occurs when the blood vessels leading to or in the brain become narrowed or blocked, causing severely reduced blood flow. Blocked or narrowed blood vessels are caused by fatty deposits that build up in blood vessels or by blood clots or other debris that travel through your bloodstream and lodge in the blood vessels in your brain. 
[Mayo-Clinic-Stroke-Definition]_



GBD 2019 Modeling Strategy
--------------------------

**Non-Fatal Modeling Strategy**

Stroke was defined according to WHO criteria - rapidly developing clinical signs of focal (at times global) disturbance of cerebral function lasting more than 24 hours or leading to death with no apparent cause other than that of vascular origin. Data on transient ischemic attack (TIA) were not included. 
[WHO-Stroke-Definition]_ 
Ischemic stroke is defined by GBD as an episode of neurological dysfunction caused by focal cerebral, spinal, or retinal infarction. We model first ever strokes as acute events; recurrent strokes are captured in the chronic phase of the modeling process. 

For ischemic stroke, data using alternate definitions of incidence and excess mortality were adjusted relative to the reference case definition using MR-BRT. The reference case definition for ischemic stroke is first ever, subtype-specific data which also includes subjects who did not survive to hospital admission. We incorporate data from the scientific literature, registries, and administrative inpatient records in our analysis. 

Severity Splits

 Details on the severity levels for acute and chronic ischemic stroke in GBD and the associated disability weight (DW) with that severity. These values are valid only for results from GBD 2019 and GBD 2017



.. list-table:: Severity Distribution
   :widths: 1 1 10 1 1 2
   :header-rows: 1

   * - Severity level
     - Acute or Chronic
     - Lay description
     - Modified Rankin score
     - Cognitive status
     - DW (95% CI)
   * - Stroke, asymptomatic
     - Chronic only
     - 
     - 0
     - N/A
     - N/A
   * - Stroke, mild
     - Both
     - Has some difficulty in moving around and some weakness in one hand, but is able to walk without help.
     - 1
     - N/A
     - 0.019 (0.01–0.032)
   * - Stroke, moderate
     - Both
     - Has some difficulty in moving around, and in using the hands for lifting and holding things, dressing, and grooming.
     - 2, 3
     - MoCA>=24 or MMSE>=26
     - 0.07 (0.046–0.099)
   * - Stroke, moderate plus cognition problems
     - Both
     - Has some difficulty in moving around, in using the hands for lifting and holding things, dressing and grooming, and in speaking. The person is often forgetful and confused.
     - 2, 3
     - MoCA<24 or MMSE<26
     - 0.316 (0.206–0.437)
   * - Stroke, severe
     - Both
     - Is confined to bed or a wheelchair, has difficulty speaking, and depends on others for feeding, toileting, and dressing.
     - 4, 5
     - MoCA>=24 or MMSE>=26
     - 0.552 (0.377–0.707)
   * - Stroke, severe plus cognition problems
     - Both
     - Is confined to bed or a wheelchair, depends on others for feeding, toileting, and dressing, and has difficulty speaking, thinking clearly, and remembering things.
     - 
     - MoCA<24 or MMSE<26
     - 0.588 (0.411–0.744)


**Fatal Modeling Strategy**

Vital registration data were used as input data to model deaths from ischemic stroke in CODEm.  


Cause Hierarchy
+++++++++++++++

.. image:: cause_hierarchy_is.svg

Restrictions
++++++++++++

The following table describes any restrictions in GBD 2019 on the effects of this cause 
(such as being only fatal or only nonfatal), as well as restrictions on the ages and sexes to which the cause applies.

.. list-table:: GBD 2019 Cause Restrictions
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



Vivarium Modeling Strategy
--------------------------


Scope
+++++

This cause model is designed to simulate the occurrence of first and recurrent acute ischemic stroke. It is not designed to simulate recurrent events where the second event is a different type of stroke. When incorporating risk factors, BMI, SBP, LDL cholesterol, smoking, FPG, physical inactivity, and total alcohol consumption should affect transition rates 1 and 3 through the GBD measure of incidence for each stroke cause. 


Assumptions and Limitations
+++++++++++++++++++++++++++

Stroke cases are considered acute from the day of incidence of a first-ever stroke through day 28 following the event. The GBD category of chronic stroke includes the sequelae of an acute stroke AND all recurrent stroke events. Stroke cases are considered chronic beginning 28 days following the occurrence of an event. The incidence rate of first ever strokes and recurrent strokes are considered to be the same. 


Cause Model Diagram
+++++++++++++++++++

.. image:: cause_model_stroke.svg


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
   * - C
     - **C**\ hronic Ischemic Stroke
     - Simulant that has survived more than 28 days following their last
       ischemic stroke and who may be experiencing chronic elevated mortality
       and disability due to the event.


.. list-table:: State Data
   :widths: 1, 5, 5, 10
   :header-rows: 1

   * - State
     - Measure
     - Value
     - Notes
   * - All
     - cause-specific mortality rate (csmr)
     - :math:`\frac{\text{deaths_c495}}{\text{population}}`
     -
   * - D\ :sub:`A`
     - acute cause-specific mortality rate (csmr) 
     - :math:`\frac{\text{acute-deaths_c495}}{\text{population}}`
     - custom CSMR split 
   * - D\ :sub:`C`
     - chronic cause-specific mortality rate (csmr) 
     - :math:`\frac{\text{chronic-deaths_c495}}{\text{population}}`
     - custom CSMR split 
   * - S
     - prevalence
     - :math:`1 - \text{prev_c495}`
     -
   * - A
     - prevalence
     - :math:`\sum\limits_{s \in \text{acute_sequelae}} \text{prevalence}_s`
     - 
   * - C
     - prevalence
     - :math:`\sum\limits_{s \in \text{chronic_sequelae}} \text{prevalence}_s`
     -
   * - S
     - excess mortality rate (emr)
     - 0
     -
   * - A
     - excess mortality rate (emr)
     - emr_m24714
     -
   * - C
     - excess mortality rate (emr)
     - emr_m10837
     -
   * - S
     - disability weight
     - 0
     -
   * - A
     - disability weight
     - :math:`\frac{1}{\text{prevalence_c495}} \times \sum\limits_{s \in \text{acute-sequelae}} \text{disability_weight}_s \cdot \text{prevalence}_s`
     -
   * - C
     - disability weight
     - :math:`\frac{1}{\text{prevalence_c495}} \times \sum\limits_{s \in \text{chronic-sequelae}} \text{disability_weight}_s \cdot \text{prevalence}_s`
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
     - This is the population rate, not the susceptible rate 
   * - 2
     - A
     - C
     - 28 days
     - duration-based transition from acute state into chronic state 
   * - 3
     - C
     - A
     - incidence_c495
     - Assumption is that recurrent events have the same incidence rate as first ever events; population rate 
   * - 4
     - A
     - D\ :sub:`A`
     - emr_m24714
     - EMR from acute ischemic stroke with CSMR model 
   * - 5
     - C
     - D\ :sub:`C`
     - emr_m10837
     - EMR from chronic ischemic stroke with CSMR model 

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
     - This is the prevalence of acute + chronic sequelae 
   * - deaths_c495
     - codcorrect
     - Deaths from ischemic stroke
     - This is all deaths, regardless of whether people are in the acute or chronic state 
   * - acute_csmr_c495
     - custom csv saved here: '/share/scratch/projects/cvd_gbd/cvd_re/simulation_science/stroke_CSMR_data/' as 'GBD2019_acute_ischemic_csmr_2021-05-20.csv'
     - Deaths from ischemic stroke during the acute period 
     - Custom CSMR calculation
   * - chronic_csmr_c495
     - custom csv saved here: '/share/scratch/projects/cvd_gbd/cvd_re/simulation_science/stroke_CSMR_data/' as 'GBD2019_chronic_ischemic_csmr_2021-05-20.csv'
     - Deaths from ischemic stroke during the chronic period  
     - Custom CSMR calculation 
   * - incidence_c495
     - como
     - Incidence of ischemic stroke
     - This is the population incidence rate for first ever acute stroke 
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
     - excess mortality rate of chronic ischemic stroke with CSMR 
     -
   * - emr_m24714
     - dismod-mr 2.1
     - excess mortality rate of first ever acute ischemic stroke with CSMR 
     -
   * - acute_sequelae
     - sequelae definition
     - {s386, s387, s388, s389, s390}
     - GBD 2019 and earlier only 
   * - chronic_sequelae
     - sequelae definition
     - {s391, s392, s393, s394, s395, s946}
     - GBD 2019 and earlier only   



Validation Criteria
+++++++++++++++++++

1. Compare CSMR experienced by simulants to CSMR from CoDCorrect in GBD.


References
----------

.. [Mayo-Clinic-Stroke-Definition]
   `Stroke.` Mayo Clinic, Mayo Foundation for Medical Education and Research, 9 Feb. 2021, www.mayoclinic.org/diseases-conditions/stroke/symptoms-causes/syc-20350113. 

.. [WHO-Stroke-Definition]
   Hatano S. Experience from a multicentre stroke register: a preliminary report. Bull WHO 54, 541- 553. 1976. 
