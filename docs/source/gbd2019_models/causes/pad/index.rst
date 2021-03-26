.. _2019_cause_pad:


===========================
Peripheral Arterial Disease
===========================

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 10 15 20
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - PAD
    - Peripheral Arterial Disease
    - 
  * - ABI
    - Ankle-Brachial Index
    - The ankle-brachial index test compares the blood pressure measured at your ankle with the blood pressure measured at your arm. It is a method of checking for PAD.

[ABI-Definition]_  


Disease Overview
----------------
Patients with peripheral arterial disease (PAD) have decreased lower extremity arterial perfusion which is commonly referred to as “poor circulation.” In most cases of PAD, atherosclerotic plaques narrow the arterial flow lumen which restricts blood flow to the distal extremity. 
Reduced blood flow can cause thigh or calf pain with walking due to temporary ischemia of the leg muscles during exertion. 
Walking pain from PAD is referred to as intermittent claudication which means “to limp.” Many patients with PAD have either no symptoms or atypical complaints that do not strictly conform to the definition of claudication. 
Others may develop limb-threatening compromise of blood flow, necessitating emergent surgery. PAD acts as a marker for systemic atherosclerosis. PAD usually involves atherosclerotic disease in the abdominal aorta, iliac, and femoral arteries. 
The pathophysiology of atherosclerosis involves complex interactions between cholesterol and vascular cells. 
Atherosclerotic plaque builds up slowly on the inside of arteries. In the early stages of PAD, the arteries compensate for the plaque buildup by dilating to preserve flow through the vessel. 
Eventually, the artery cannot dilate any further, and the atherosclerotic plaque starts to narrow the arterial flow lumen.
[PAD-Definition]_



GBD 2019 Modeling Strategy
--------------------------

**Non-Fatal Modeling Strategy**

Peripheral arterial disease was defined as having an ankle-brachial index (ABI) < 0.9. Intermittent claudication was defined clinically. Administrative claims data were adjusted to the reference (prevalence of PAD based on directly-measured ABI values) using MR-BRT.  


We used the proportion of intermittent claudication to split the overall prevalence of peripheral arterial disease into symptomatic and asymptomatic peripheral vascular disease. The table below illustrates these values: 

Details on the severity levels for Peripheral Arterial Disease in GBD 2019 and the associated disability weight (DW) with that severity.  


.. list-table:: Severity Distribution
   :widths: 15 30 15
   :header-rows: 1

   * - Severity level 
     - Lay description 
     - DW (95% CI) 
   * - Asymptomatic
     - No symptoms 
     - No DW assigned 
   * - Symptomatic 
     - Has cramping pains in the legs after walking a medium distance. The pain goes away after a short rest. 
     - 0.014 (0.007–0.025) 



DisMod-MR 2.1 was used to model both the overall prevalence of PAD and the proportion of peripheral arterial disease with intermittent claudication. 
To obtain final estimates for the sequelae of interest, we multiplied the prevalence model by the proportion model at the draw level to generate the prevalence of symptomatic and asymptomatic peripheral vascular disease. 


**Fatal Modeling Strategy**

We included vital registration data in a standard CODEm approach to model peripheral artery disease.


Cause Hierarchy
+++++++++++++++

.. image:: cause_hierarchy_pad.svg

Restrictions
++++++++++++

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
     - 40
     - [40, 44 years), age_group_id=13 
   * - YLL age group end
     - 125
     - [95, 125 years), age_group_id=235 
   * - YLD age group start
     - 40
     - [40, 44 years), age_group_id=13 
   * - YLD age group end
     - 125
     - [95, 125 years), age_group_id=235 


Vivarium Modeling Strategy
--------------------------


Scope
+++++

PAD should occur at the incidence of PAD in the DisMod model. PAD is then a chronic state without remission. 
Transition from prevalent PAD to death should occur at the GBD EMR rate for PAD from the PAD DisMod model. 
The transition rate from the susceptible state to the prevalent state should be modified by fasting plasma glucose, smoking, systolic blood pressure, and impaired kidney function.


Assumptions and Limitations
+++++++++++++++++++++++++++

PAD is highly comorbid with ischemic heart disease (IHD). 
Because of this, persons with PAD have high with-condition mortality, but low cause-specific mortality.


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

.. [PAD-Definition]
Zemaitis MR, Boll JM, Dreyer MA. :title:`Peripheral Arterial Disease.` [Updated 2021 Mar 17]. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2021 Jan-. Available from: https://www.ncbi.nlm.nih.gov/books/NBK430745/

.. [ABI-Definition]
:title:`Ankle-Brachial Index.` Mayo Clinic, Mayo Foundation for Medical Education and Research, 13 Feb. 2020. Available from: https://www.mayoclinic.org/tests-procedures/ankle-brachial-index/about/pac-20392934 

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
