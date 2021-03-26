.. _2019_cause_ischemic_stroke:

===============
Ischemic Stroke
===============

.. todo::

  Add a brief introductory paragraph for this document.

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - 
    - 
    - 

.. todo::

  Fill out table with any abbreviations and their definitions used in this document.

Disease Overview
----------------

Disease Description
-------------------

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
   :widths: 5 5 30 5 5 10
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

.. todo::

  Add an overview of the Vivarium modeling section.

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

According to GBD 2019, stroke cases are considered acute from the day of incidence of a first-ever stroke through day 28 following the event. Post, also known as chronic, stroke includes the sequelae of an acute stroke AND all recurrent stroke events. Stroke cases are considered post beginning 28 days following the occurrence of an event. Post stroke includes the sequelae of an acute stroke AND all recurrent stroke events.’’ 

 

The risk factor of BMI, SBP, LDL cholesterol, smoking, FPG, physical inactivity, total alcohol inactivity, should all affect the transition rates 1 and 3 through the GBD measure of incidence for each stroke cause. 

.. image:: cause_model_is.svg


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

Definitions
"""""""""""


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

.. [Mayo-Clinic-Stroke-Definition]
   `Stroke.` Mayo Clinic, Mayo Foundation for Medical Education and Research, 9 Feb. 2021, www.mayoclinic.org/diseases-conditions/stroke/symptoms-causes/syc-20350113. 




.. todo::

  Update references to GBD 2019 once published

.. [GBD-2017-YLD-Appendix-Cause-Model-Template]

   Pages ???-??? in `Supplementary appendix 1 to the GBD 2017 YLD Capstone <YLD
   appendix on ScienceDirect_>`_:

     **(GBD 2017 YLD Capstone)** GBD 2017 Disease and Injury Incidence and
     Prevalence Collaborators. :title:`Global, regional, and national incidence,
     prevalence, and years lived with disability for 354 diseases and injuries
     for 195 countries and territories, 1990–2017: a systematic analysis for the
     Global Burden of Disease Study 2017`. Lancet 2018; 392: 1789–858. DOI:
     https://doi.org/10.1016/S0140-6736(18)32279-7

.. _YLD appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322797-mmc1.pdf
.. _YLD appendix on Lancet.com: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32279-7/attachment/6db5ab28-cdf3-4009-b10f-b87f9bbdf8a9/mmc1.pdf


.. [GBD-2017-CoD-Appendix-Cause-Model-Template]

   Pages ???-??? in `Supplementary appendix 1 to the GBD 2017 CoD Capstone <CoD
   appendix on ScienceDirect_>`_:

     **(GBD 2017 CoD Capstone)** GBD 2017 Causes of Death Collaborators.
     :title:`Global, regional, and national age-sex-specific mortality for 282
     causes of death in 195 countries and territories, 1980–2017: a systematic
     analysis for the Global Burden of Disease Study 2017`. Lancet 2018; 392:
     1736–88. DOI: http://dx.doi.org/10.1016/S0140-6736(18)32203-7

.. _CoD appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322037-mmc1.pdf
.. _CoD appendix on Lancet.com: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32203-7/attachment/5045652a-fddf-48e2-9a84-0da99ff7ebd4/mmc1.pdf

