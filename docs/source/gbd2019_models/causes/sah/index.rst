.. _2019_cause_sah:

==============================
Subarachnoid Hemorrhage
==============================

.. contents::
   :local:
   :depth: 1

Disease Overview
----------------

A stroke occurs when the blood supply to part of your brain is interrupted or reduced, preventing brain tissue from getting oxygen and nutrients. There are two main causes of stroke: a blocked artery (ischemic stroke) or leaking or bursting of a blood vessel (intracerebral hemorrhage and subarachnoid hemorrhage (combination is referred to as hemorrhagic stroke)). Some people may have only a temporary disruption of blood flow to the brain. This is known as a transient ischemic attack (TIA); symptoms of a TIA last less than 24 hours. While there are no long term-effects of TIAs, they have been shown to increase the risk of subsequent strokes. 

Subarachnoid hemorrhage is the occurrence of bleeding into the space between the surface of the brain, or pia mater, and the arachnoid, one of three coverings of the brain.
[Mayo-Clinic]_
[UCLA-Health]_

GBD 2019 Modeling Strategy
--------------------------

GBD 2019 Non-Fatal Modeling Strategy
++++++++++++++++++++++++++++++++++++

Stroke was defined according to WHO criteria - rapidly developing clinical signs of focal (at times global) disturbance of cerebral function lasting more than 24 hours or leading to death with no apparent cause other than that of vascular origin. Data on transient ischemic attack (TIA) were not included. [WHO-Stroke-Definition]_. Subarachnoid hemorrhage is defined by GBD as bleeding into the subarachnoid space (the space between the arachnoid membrane and the pia mater of the brain or spinal cord) that is not caused by trauma. We model first ever strokes as acute events; recurrent strokes are captured in the chronic phase of the modeling process. 

For subarachnoid hemorrhage, data using alternate definitions of incidence and excess mortality were adjusted relative to the reference case definition using MR-BRT. The reference case definition for subarachnoid hemorrhage is first ever, subtype-specific data which also includes subjects who did not survive to hospital admission. We incorporate data from scientific literature, registries, and administrative inpatient records in our analysis.

**Severity split inputs:**\

See below for the details on the severity levels for acute and chronic subarachnoid hemorrhage in GBD and the associated disability weight (DW) with that severity. These values are valid only for results from GBD 2019 and GBD 2017. 

.. list-table:: Severity distribution for subarachnoid hemorrhage
   :widths: 10 8 25 5 8 10
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
     - 0
   * - Stroke, mild
     - Both
     - Has some difficulty in moving around and some weakness in one hand, but is able to walk without help
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

[GBD-2019-Capstone-Appendix]_

GBD 2019 Fatal Modeling Strategy
++++++++++++++++++++++++++++++++++++

Vital registration data were used as input data to model deaths from subarachnoid hemorrhage in CODEm.
[GBD-2019-Capstone-Appendix]_ 

Cause Hierarchy
+++++++++++++++

.. image:: cause_hierarchy_sah.svg

Restrictions
++++++++++++

The following table describes any restrictions in GBD 2019 on the effects of
this cause (such as being only fatal or only nonfatal), as well as restrictions
on the ages and sexes to which the cause applies.

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

This cause model is designed to simulate the occurrence of first and recurrent acute subarachnoid hemorrhage. It is not designed to simulate recurrent events where the second event is a different type of stroke. When incorporating risk factors, BMI, SBP, LDL cholesterol, smoking, FPG, physical inactivity, and total alcohol consumption should affect transition rates 1 and 3 through the GBD measure of incidence for each stroke cause. 

Assumptions and Limitations
+++++++++++++++++++++++++++

Stroke cases are considered acute from the day of incidence of a first-ever stroke through day 28 following the event. The GBD category of chronic stroke includes the sequelae of an acute stroke AND all recurrent stroke events. Stroke cases are considered chronic beginning 28 days following the occurrence of an event. The incidence rate of first ever strokes and recurrent strokes are considered to be the same. 

Cause Model Diagram
+++++++++++++++++++

.. image:: cause_model_stroke.svg

State and Transition Data Tables
++++++++++++++++++++++++++++++++

Definitions
"""""""""""

.. list-table:: State Definitions
   :widths: 5 5 20
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - **S**\usceptible to Subarachnoid Hemorrhage
     - Simulant that has not already had an subarachnoid hemorrhage
   * - A
     - **A**\cute Subarachnoid Hemorrhage
     - Simulant that is in duration-based period starting day of incidence of a first-ever stroke through day 28 following the event
   * - C
     - **C**\hronic Subarachnoid Hemorrhage
     - Simulant that has survived more than 28 days following their last subarachnoid hemorrhage and who may be experiencing chronic elevated mortality and disability due to the event. 


States Data
"""""""""""

.. list-table:: State Data
   :widths: 5 10 10 20
   :header-rows: 1

   * - State
     - Measure
     - Value
     - Notes
   * - All
     - cause-specific mortality rate (csmr)
     - :math:`\frac{\text{deaths_c497}}{\text{population}}`
     -
   * - :math:`\text{D}_A`
     - acute cause-specific mortality rate (csmr)
     - :math:`\frac{\text{acute_deaths_c497}}{\text{population}}`
     - custom CSMR split
   * - :math:`\text{D}_C`
     - chronic cause-specific mortality rate (csmr)
     - :math:`\frac{\text{chronic_deaths_c497}}{\text{population}}`
     - custom CSMR split
   * - S
     - prevalence
     - :math:`1-\text{prevalence_c497}`
     - 
   * - A
     - prevalence
     - :math:`\sum\limits_{s \in sequelae} \text{acute_prevalence}_s`
     - 
   * - C
     - prevalence
     - :math:`\sum\limits_{s \in sequelae} \text{chronic_prevalence}_s`
     - 
   * - S
     - excess mortality rate (emr)
     - 0
     - 
   * - A
     - excess mortality rate (emr)
     - emr_m24710
     - 
   * - C
     - excess mortality rate (emr)
     - emr_m18733
     - 
   * - S
     - disability weight
     - 0
     - 
   * - A
     - disability weight
     - :math:`\frac{1}{\text{acute_prevalence_c497}} \times \sum\limits_{s \in sequelae} \text{disability_weight}_s \times \text{acute_prevalence}_s`
     - 
   * - C
     - disability weight
     - :math:`\frac{1}{\text{chronic_prevalence_c497}} \times \sum\limits_{s \in sequelae} \text{disability_weight}_s \times \text{chronic_prevalence}_s`
     - 

Transition Data
"""""""""""""""

.. list-table:: Transition Data
   :widths: 10 10 10 20 30
   :header-rows: 1
   
   * - Transition
     - Source 
     - Sink 
     - Value
     - Notes
   * - 1
     - S
     - A
     - incidence_c497
     - This is the population rate, not the susceptible rate
   * - 2
     - A
     - P
     - 28 days
     - Duration-based transition from acute state into chronic state
   * - 3
     - C
     - A
     - incidence_c497
     - Assumption is that recurrent events have the same incidence rate as first ever events; population rate
   * - 4
     - A
     - :math:`\text{D}_A`
     - emr_m24710
     - Excess mortality rate for acute subarachnoid hemorrhage w/ CSMR
   * - 5
     - C
     - :math:`\text{D}_C`
     - emr_m18733
     - Excess mortality rate for chronic subarachnoid hemorrhage w/ CSMR

Data Sources
""""""""""""

.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Measure
     - Sources
     - Description
     - Notes
   * - prevalence_c497
     - como
     - Prevalence of subarachnoid hemorrhage
     - This is the prevalence of acute + chronic sequelae
   * - deaths_c497
     - codcorrect
     - Deaths from subarachnoid hemorrhage
     - This is all deaths, regardless of whether the people are in the acute or chronic state
   * - acute_csmr_c497
     - custom csv saved here: '/share/scratch/projects/cvd_gbd/cvd_re/simulation_science/stroke_CSMR_data/' as 'GBD2019_acute_subarachnoid_csmr_2021-05-20.csv'
     - Deaths from subarachnoid hemorrhage during the acute period 
     - Custom CSMR calculation
   * - chronic_csmr_c497
     - custom csv saved here: '/share/scratch/projects/cvd_gbd/cvd_re/simulation_science/stroke_CSMR_data/' as 'GBD2019_chronic_subarachnoid_csmr_2021-05-20.csv'
     - Deaths from subarachnoid hemorrhage during the chronic period 
     - Custom CSMR calculation
   * - incidence_c497
     - como
     - Incidence of subarachnoid hemorrhage
     - This is the population incidence rate for first ever acute stroke
   * - Population
     - demography
     - Mid-year population for given age/sex/year/location 
     - 
   * - sequelae_c497
     - gbd_mapping
     - List of 11 sequelae for subarachnoid hemorrhage
     - 
   * - prevalence_s{`sid`}
     - como
     - Prevalence of sequela with id *sid* 
     - 
   * - disability_weight_s{`sid`}
     - YLD appendix
     - Disability weight of sequela with id *sid*
     - 
   * - emr_m18733
     - dismod-mr 2.1
     - excess mortality rate of chronic subarachnoid hemorrhage with CSMR
     - 
   * - emr_m24710
     - dismod-mr 2.1
     - excess mortality rate of first ever acute subarachnoid hemorrhage with CSMR
     - 
   * - acute_sequelae
     - sequelae definition
     - {s5168, s5171, s5174, s5177, s5180}
     - GBD 2019 and earlier only
   * - chronic_sequelae
     - sequelae definition
     - {s5186, s5189, s5192, s5195, s5198, s5183} 
     - GBD 2019 and earlier only

Validation Criteria
+++++++++++++++++++

Compare CSMR experienced by simulants to CSMR from CoDCorrect in GBD

References
----------

.. [Mayo-Clinic] Stroke. Mayo Clinic, Mayo Foundation for Medical Education and Research, 9 Feb 2021.
	Retrieved 25 March 2021.
	https://www.mayoclinic.org/diseases-conditions/stroke/symptoms-causes/syc-20350113

.. [UCLA-Health] Subarachnoid Hemorrhage. Subarachnoid Hemorrhage - UCLA Neuorsurgery, Los Angeles, CA, UCLA Health.
	Retrieved 25 March 2021.
	https://www.uclahealth.org/neurosurgery/subarachnoid-hemorrhage

.. [WHO-Stroke-Definition] Hatano S. Experience from a multicentre stroke register: a preliminary report. Bull WHO 54, 541- 553. 1976. 

.. [GBD-2019-Capstone-Appendix]
	Appendix_ to: `GBD 2019 Diseases and Injuries Collaborators. Global burden of 369 diseases and injuries in 204 countries and territories, 1990–2019: a systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 17 Oct 2020;396:1204-1222` 

.. _Appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30925-9/attachment/deb36c39-0e91-4057-9594-cc60654cf57f/mmc1.pdf
