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

.. image:: cause_model_pad.svg


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
     - **S**\ usceptible to PAD 
     - Simulant that has not been diagnosed with PAD. 
   * - P
     - **P**\ eripheral arterial disease 
     - Simulant with prevalent PAD (ankle-brachial index <=0.9)  
   * - D
     - **D**\ eath
     - Simulant that has experienced death at the rate of the EMR from the DisMod model 


States Data
"""""""""""

.. list-table:: States Data
   :widths: 20 25 30 320
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - All
     - cause-specific mortality (CSMR) 
     - :math:`\frac{\text{deaths_c502}}{\text{population}}`
     - Post CoDCorrect cause-level CSMR
   * - S
     - prevalence
     - :math:`1 - \text{prevalence_c502}`
     - 
   * - P
     - prevalence
     - :math:`\sum\limits_{s \in \text{sequelae}} \text{prevalence}_s`
     - There are two chronic sequalae 
   * - D
     - prevalence
     - 0
     -
   * - S
     - excess mortality
     - 0
     - 
   * - P
     - excess mortality
     - :math:`\text{emr_m2532}`
     - 
   * - S
     - disability weight
     - 0
     - 
   * - P
     - disability weights
     - :math:`\frac{1}{\text{prevalence_c502}} \times \sum\limits_{s \in \text{sequelae}} \text{disability_weight}_s \cdot \text{prevalence}_s`
     - 
   * - D
     - disability weight
     - 0
     - 

Transition Data
"""""""""""""""

.. list-table:: Transition Data
   :widths: 10 10 10 20 30
   :header-rows: 1
   
   * - State
     - Source State
     - Sink State
     - Value
     - Notes
   * - 1
     - S
     - P
     - incidence_c502
     - This is cause-level incidence which is equivalent to the “population rate” 
   * - 2
     - P
     - D
     - emr_m2532
     - 
 

Data Sources
""""""""""""

This table contains the data sources for all the measures. The table structure and common measures are as below:

.. list-table:: Data Sources and Definitions
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Value
     - Sources
     - Description
     - Notes
   * - prevalence_c502
     - como 
     - Prevalence of peripheral arterial disease 
     - 
   * - deaths_c502
     - codcorrect 
     - Deaths from peripheral arterial disease 
     -
   * - incidence_c502
     - como
     - Incidence of ischemic stroke 
     - This is the population incidence rate for peripheral arterial disease 
   * - population
     - demography
     - Mid-year population for given age/sex/year/location 
     - 
   * - sequelae_c502
     - gbd_mapping 
     - List of 2 sequelae for peripheral arterial disease 
     - 
   * - prevalence_s{`sid`}
     - como
     - Prevalence of sequela with id sid 
     - 
   * - disability_weight_s{`sid`}
     - YLD appendix 
     - Disability weight of sequela with id sid 
     - 
   * - emr_m2532
     - dismod-mr 2.1 
     - excess mortality rate of peripheral arterial disease 
     - 
   * - sequelae
     - sequelae definition
     - {s964, s1041} 
     - 


Validation Criteria
+++++++++++++++++++

1. Compare CSMR experienced by simulants to CSMR from CoDCorrect in GBD 

2. Compare prevalence experienced by simulants to post-COMO prevalence in GBD


References
----------

.. [PAD-Definition]
Zemaitis MR, Boll JM, Dreyer MA. :title:`Peripheral Arterial Disease.` [Updated 2021 Mar 17]. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2021 Jan-. Available from: https://www.ncbi.nlm.nih.gov/books/NBK430745/

.. [ABI-Definition]
:title:`Ankle-Brachial Index.` Mayo Clinic, Mayo Foundation for Medical Education and Research, 13 Feb. 2020. Available from: https://www.mayoclinic.org/tests-procedures/ankle-brachial-index/about/pac-20392934 
