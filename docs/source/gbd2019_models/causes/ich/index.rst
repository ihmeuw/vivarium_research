.. _2019_cause_ich:

==============================
Intracerebral Hemorrhage
==============================

.. contents::
   :local:
   :depth: 1


Disease Overview
----------------

A stroke occurs when the blood supply to part of your brain is interrupted or reduced, preventing brain tissue from getting oxygen and nutrients. There are two main causes of stroke: a blocked artery (ischemic stroke) or leaking or bursting of a blood vessel (intracerebral hemorrhage and subarachnoid hemorrhage (combination is referred to as hemorrhagic stroke)). Some people may have only a temporary disruption of blood flow to the brain. This is known as a transient ischemic attack (TIA); symptoms of a TIA last less than 24 hours. While there are no long term-effects of TIAs, they have been shown to increase the risk of subsequent strokes. 

Intracerebral hemorrhage is a sudden leakage of blood into the brain, causing injury to the tissue and resulting in the symptoms of a stroke as described above.
[Mayo-Clinic]_
[UCLA-Health]_


GBD 2019 Modeling Strategy
--------------------------

GBD 2019 Non-Fatal Modeling Strategy
++++++++++++++++++++++++++++++++++++

Stroke was defined according to WHO criteria - rapidly developing clinical signs of focal (at times global) disturbance of cerebral function lasting more than 24 hours or leading to death with no apparent cause other than that of vascular origin. Data on transient ischemic attack (TIA) were not included. [WHO-Stroke-Definition]_. Intracerebral hemorrhage is defined by GBD as a focal collection of blood within the brain parenchyma or ventricular system that is not caused by trauma. We model first ever strokes as acute events; recurrent strokes are captured in the chronic phase of the modeling process. 

For intracerebral hemorrhage, data using alternate definitions of incidence and excess mortality were adjusted relative to the reference case definition using MR-BRT. The reference case definition for intracerebral hemorrhage is first ever, subtype-specific data which also includes subjects who did not survive to hospital admission. We incorporate data from scientific literature, registries, and administrative inpatient records in our analysis. 

**Severity split inputs:**\

See below for the details on the severity levels for acute and chronic intracerebral hemorrhage in GBD and the associated disability weight (DW) with that severity. These values are valid only for results from GBD 2019 and GBD 2017. 

.. list-table:: Severity distribution for intracerebral hemorrhage
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
++++++++++++++++++++++++++++++++

Vital registration data were used as input data to model deaths from intracerebral hemorrhage in CODEm. 
[GBD-2019-Capstone-Appendix]_ 

Cause Hierarchy
+++++++++++++++
.. image:: cause_hierarchy_ich.svg

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

.. todo::

  Describe which aspects of the disease this cause model is designed to
  simulate, and which aspects it is **not** designed to simulate.

Assumptions and Limitations
+++++++++++++++++++++++++++

.. todo::

  Describe the clinical and mathematical assumptions made for this cause model,
  and the limitations these assumptions impose on the applicability of the
  model.

Cause Model Diagram
+++++++++++++++++++

State and Transition Data Tables
++++++++++++++++++++++++++++++++

This section gives necessary information to software engineers for building the model. 
This section usually contains four tables: Definitions, State Data, Transition Data and Data Sources.

Definitions
"""""""""""

This table contains the definitions of all the states in **cause model diagram**. 

.. list-table:: State Definitions
   :widths: 5 5 20
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - 
     - 
     - 
   * - 
     - 
     - 

For example, the *Definitions* table for *SIR* and *With-Condition and Free of Condition Model* models are as below:

**SIR Model**

.. list-table:: State Definitions
   :widths: 5 5 20
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - Susceptible
     - Susceptible to {cause name}
   * - I
     - Infected
     - Infected with {cause name}
   * - R
     - Recovered
     - Infected with {cause name}


**With-Condition and Free of Condition Model**

.. list-table:: State Definitions
   :widths: 1, 5, 10
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - C
     - With **C**\ ondition
     - Born with {cause name}
   * - F
     - **F**\ ree of Condition
     - Born without {cause name}

Include states, their names and definitions appropriate to your model.

States Data
"""""""""""

This table contains the **measures** and their **values** for each state in cause-model diagram. This information is used to 
initialize the model. The common measures in each state are prevalence, birth prevalence, excess mortality rate and disability weights. 
Cause specific mortality rate is the common measure for all states. In most of the models either prevalence or birth prevalence is used. 
But in some rare cases like neonatal models both prevalence and birth prevalence are used in model initialization. The Value column contains the formula to calculate 
the measure in each state.

The structure of the table is as below. For each state, the measures and values must be included.

.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - State
     - prevalence
     - 
     - 
   * - State
     - birth prevalence
     - 
     - 
   * - State
     - excess mortality rate
     - 
     - 
   * - State
     - disabilty weights
     - 
     -
   * - ALL
     - cause specific mortality rate
     - 
     - 

An example of SI model with both prevalence and birth prevalence in the initialization is given below to explain better. 


.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - S
     - prevalence
     - 1-prevalence_cid
     - 
   * - S
     - birth prevalence
     - 1-birth_prevalence_cid
     - 
   * - S
     - excess mortality rate
     - 0
     - 
   * - S
     - disabilty weights
     - 0
     -
   * - I
     - prevalence
     - prevalence_cid
     - 
   * - I
     - birth prevalence
     - birth_prevalence_cid
     - 
   * - I
     - excess mortality rate
     - :math:`\frac{\text{deaths_cid}}{\text{population} \times \text{prevalence_cid}}`
     - = (cause-specific mortality rate) / prevalence
   * - I
     - disability weights
     - :math:`\displaystyle{\sum_{s\in \text{sequelae_cid}}} \scriptstyle{\text{disability_weight}_s \,\times\, \text{prevalence}_s}`
     - = total disability weight over all sequelae
   * - ALL
     - cause specific mortality rate
     - :math:`\frac{\text{deaths_cid}}{\text{population}}`
     - 

Transition Data
"""""""""""""""

This table contains the measures needed for transition from one state to other in the cause model. The common measures used are *incident rate* to 
move from Susceptible to Infected and *remission rate* to move from Infected to Susceptible or Recovered states. Some times there may not be transition 
between states as in Neonatal disorders.

The structure of the table is as below. 

.. list-table:: Transition Data
   :widths: 10 10 10 20 30
   :header-rows: 1
   
   * - Transition
     - Source 
     - Sink 
     - Value
     - Notes
   * - i
     - S
     - I
     - 
     - 
   * - r
     - I
     - R
     - 	
     - 
 

An example, if the data is present in GBD,

.. list-table:: Transition Data
   :widths: 10 10 10 20 30
   :header-rows: 1
   
   * - Transition
     - Source 
     - Sink 
     - Value
     - Notes
   * - i
     - S
     - I
     - :math:`\frac{\text{incidence_rate_cid}}{\text{1 - prevalence_cid}}`
     - 
   * - r
     - I
     - R
     - remission_rate_cid
     - 

Sometimes, we might need to use *modelable entity id* to get data. Sometimes, we might need to calculate remission rate 
based on average case duration. In that case, the row would look like,

.. list-table:: Transition Data
   :widths: 10 10 10 20 30
   :header-rows: 1
   
   * - Transition
     - Source 
     - Sink 
     - Value
     - Notes
   * - r
     - I
     - R
     - remission_rate_cid :math:`= \frac{\text{365 person-days}}{\text{average case duration in days} \times \text{1 year}}`
     - 
	 

Data Sources
""""""""""""

This table contains the data sources for all the measures. The table structure and common measures are as below:

.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Measure
     - Sources
     - Description
     - Notes
   * - prevalence_cid
     - 
     - 
     - 
   * - birth_prevalence_cid
     - 
     - 
     -
   * - deaths_cid
     - 
     - 
     - 
   * - population
     - 
     - 
     - 
   * - sequelae_cid
     - 
     - 
     - 
   * - incidence_rate_cid
     - 
     - 
     - 
   * - remission_rate_m1594
     - 
     - 
     - 
   * - disability_weight_s{`sid`}
     - 
     - 
     - 
   * - prevalence_s{`sid`}
     - 
     - 
     - 

An example, that contains common sources for the measures,

.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Measure
     - Sources
     - Description
     - Notes
   * - prevalence_cid
     - como
     - Prevalence of cause
     - 
   * - birth_prevalence_cid
     - como
     - Birth prevalence of cause
     -
   * - deaths_cid
     - codcorrect
     - Deaths from cause
     - 
   * - population
     - demography
     - Mid-year population for given age/sex/year/location
     - 
   * - sequelae_cid
     - gbd_mapping
     - List of sequelae
     - 
   * - incidence_rate_cid/mid
     - como/dismod
     - Incidence rate for cause
     - 
   * - remission_rate_cid/mid
     - como/dismod
     - Remission rate for cause
     - 
   * - disability_weight_s{`sid`}
     - YLD appendix
     - Disability weight of sequela with id `sid`
     - 
   * - prevalence_s{`sid`}
     - como
     - Prevalence of sequela with id `sid`
     - 


Validation Criteria
+++++++++++++++++++

References
----------

.. [Mayo-Clinic] Stroke. Mayo Clinic, Mayo Foundation for Medical Education and Research, 9 Feb 2021.
	Retrieved 25 March 2021.
	https://www.mayoclinic.org/diseases-conditions/stroke/symptoms-causes/syc-20350113

.. [UCLA-Health] Intracerebral Hemorrhage. Intracerebral Hemorrhage - UCLA Neuorsurgery, Los Angeles, CA, UCLA Health.
	Retrieved 25 March 2021.
	https://www.uclahealth.org/neurosurgery/intracerebral-hemorrhage

.. [WHO-Stroke-Definition] Hatano S. Experience from a multicentre stroke register: a preliminary report. Bull WHO 54, 541- 553. 1976. 

.. [GBD-2019-Capstone-Appendix]
	Appendix_ to: `GBD 2019 Diseases and Injuries Collaborators. Global burden of 369 diseases and injuries in 204 countries and territories, 1990–2019: a systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 17 Oct 2020;396:1204-1222` 

.. _Appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30925-9/attachment/deb36c39-0e91-4057-9594-cc60654cf57f/mmc1.pdf
