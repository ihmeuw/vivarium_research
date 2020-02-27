.. _2017_cause_ckd:

============================
Chronic Kidney Disease (CKD)
============================

Chronic kidney disease (CKD) is defined by NIH as kidneys that are damaged and can’t filter blood the way they should. The main risk factors for developing kidney disease are diabetes, high blood pressure, heart disease, and a family history of kidney failure. National Kidney Foundation (NKF) adds that CKD is also known as chronic renal disease. You may develop complications like high blood pressure, anemia (low blood count), weak bones, poor nutritional health and nerve damage. Also, kidney disease increases your risk of having heart and blood vessel disease. These problems may happen slowly over a long period of time. Early detection and treatment can often keep chronic kidney disease from getting worse. When kidney disease progresses, it may eventually lead to kidney failure, which requires dialysis or a kidney transplant to maintain life. [National-Institute-Of-Diabetes-And-Digestive-And-Kidney-Diseases]_, [National-Kidney-Foundation]_

GBD 2017 Modeling Strategy
--------------------------

According to GBD 2017, Chronic kidney disease (CKD) is defined as a permanent loss of renal function as indicated by estimated glomerular filtration rate (eGFR) and urinary albumin to creatinine ratio (ACR). The GBD study considers six stages of CKD as defined by degree of loss of renal function or receipt of renal replacement therapy: Albuminuria (eGFR > 60ml/min/1.73m2 and ACR > 30 mg/g), CKD Stage III (eGFR 30-60ml/min/1.73m2), CKD Stage IV (eGFR 15-30ml/min/1.73m2), CKD Stage V (eGFR <15ml/min/1.73m2, not on renal replacement therapy), maintenance dialysis, and renal transplantation.

Impaired Kidney Function (IKF) in GBD 2017
++++++++++++++++++++++++++++++++++++++++++

Impaired kidney function (IKF) is a risk factor in GBD 2017 with:

  * distribution of exposure data: categorical ordered polytomous model

  * rei_id_341
  
  * PAF of 1 relationship between IKF and CKD 

.. list-table:: GBD 2017 Risk Factor IKF Restrictions
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
     - Post Neonatal
     - (28, 364 days], age_group_id = 2
   * - YLL age group end
     - 95 plus
     - (95, 125], age_group_id = 235
   * - YLD age group start
     - Post Neonatal
     - (28, 364 days], age_group_id = 2
   * - YLD age group end
     - 95 Plus
     - (95, 125], age_group_id = 235

.. list-table:: GBD 2017 Risk Factor IKF Categories
   :widths: 15 15 
   :header-rows: 1

   * - Category Name
     - Description
   * - cat1
     - Stage V chronic kidney disease annual exposure
   * - cat2
     - Stage IV chronic kidney disease annual exposure
   * - cat3
     - Stage III chronic kidney disease annual exposure
   * - cat4
     - Albuminuria annual exposure
   * - cat5
     - Unexposed

Cause Hierarchy
+++++++++++++++

.. image:: cause_hierarchy_ckd.svg

Restrictions
++++++++++++

The following table describes any restrictions in GBD 2017 on the effects of
this cause (such as being only fatal or only nonfatal), as well as restrictions
on the ages and sexes to which the cause applies.

.. todo:: Check in with SE / RT team if Restrictions should be stratified by CKD sub_causes (six stages of CKD).

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
     - Post Neonatal
     - (28, 364 days], age_group_id = 4
   * - YLL age group end
     - 95 plus
     - (95, 125], age_group_id = 235
   * - YLD age group start
     - Post Neonatal
     - (28, 364 days], age_group_id = 4
   * - YLD age group end
     - 95 Plus
     - (95, 125], age_group_id = 235

Vivarium Modeling Strategy
--------------------------

Scope
+++++

The aspects of the disease this cause model is designed to simulate is the basic structure of the disease, its sub causes, associated measures (deaths, prevalence, incidence, emr), associated sequelae, and associated disability weights. The aspects of the disease this cause model is not designed to simulate is the disease progression of CKD, as this model does not contain transitions between CKD states/stages. This cause model is designed differently, with a transient disease state titled 'With Condition' based on incidence of CKD. From there, the sub causes and sequelae are categorized within either a 'moderate' or 'severe' CKD state. Across the 5 CKD sub causes, some of the associated sequelae will either be grouped into the 'Moderate' or 'Severe' CKD state. The sequelae which map to 'Severe' CKD state include end stage renal disease sequelae and all Stage V CKD sequelae. All other sequelae are included in the 'Moderate' CKD. The associated sequelae in each state can be found below in the 'State Severity Split Definitions' table.

Vivarium Modeling Strategy for Risk Factor Impaired Kidney Function (IKF) 
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

In this model, simulants are initialized as "susceptible" or "with specific sequelae-level condition" through the following process: simulants will be assigned directly to a CKD sequelae ("with condition" state) based on each sequelae prevalence. Those not assigned to a sequelae will be initialized to the "susceptible" state. Each sequelae will then be mapped back to the distribution of IKF based on sequelae based severity splits. The result will be an IKF value for each simulant that is consistent with sub-cause prevalence. This structure means there's no impact of SBP on CKD.

Mapping CKD States to IKF Categories in Vivarium
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table:: Disease State to Risk Factor Exposure Category Map Table
   :widths: 10 15 10 30 10 
   :header-rows: 1

   * - Disease State 
     - Sequelae Group 
     - IKF Risk Exposure Category
     - Sequelae Group Id
     - Notes
   * - **M**\ oderate CKD
     - albuminuria (stage I and II) sequelae
     - cat4
     - [s_5540, s_5543, s_5549, s_5546, s_5552]
     - All Albuminuria sequelae values due to CKD sub_causes 
   * - **M**\ oderate CKD
     - stage III sequelae
     - cat3
     - [s_5225, s_5219, s_5213, s_5228, s_5222, s_5216, s_1024, s_1025, s_1026, s_1016, s_1017, s_1018, s_1032, s_1033, s_1034, s_5231, s_5234, s_1027, s_1019, s_1035]
     - All Stage III sequelae values due to CKD sub_causes
   * - **M**\ oderate CKD
     - stage IV sequelae
     - cat2
     - [s_5249, s_5243, s_5237, s_5252, s_5246, s_5240, s_1433, s_1436, s_1439, s_1421, s_1424, s_1427, s_1445, s_1448, s_1451, s_5255, s_5258, s_1430, s_1418, s_1442]
     - All Stage IV sequelae values due to CKD sub_causes
   * - **S**\ evere CKD
     - stage V sequelae
     - cat1
     - [s_5273, s_5267, s_5261, s_5276, s_5270, s_5264, s_1385, s_1388, s_1391, s_1373, s_1376, s_1379, s_1397, s_1400, s_1403, s_5279, s_5282, s_1382, s_1370, s_1394]
     - All Stage V sequelae values due to CKD sub_causes

Assumptions and Limitations
+++++++++++++++++++++++++++

Presently, we are using prevalence for each stage of CKD to assign the each person in the population a CKD severity state. We are assuming (for now) that there is no transition between states. As a result, we should expect the prevalence for early stage CKD to swell as the simulation runs, since there is nowhere for these new incident cases to go. If we had remission (which is actually the term used for "progression") rates, we could use these as inter-stage incidence rates.

Cause Model Diagram
-------------------

.. image:: cause_model_ckd.svg


Data Description
----------------

State and Transition Data Tables
++++++++++++++++++++++++++++++++

.. list-table:: State Definitions
   :widths: 1, 10, 10
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - **S**\ usceptible
     - Susceptible to CKD
   * - C
     - With **C**\ ondition of chronic kidney disease
     - Has CKD, regardless of moderate or severe CKD
   * - M
     - **M**\ oderate CKD
     - Has moderate CKD (not severe, not fatal)
   * - Sev
     - **S**\ evere CKD
     - Has severe CKD (fatal)

.. list-table:: State Severity Split Definitions
   :widths: 1, 10, 10
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - **S**\ usceptible
     - 
   * - C
     - With **C**\ ondition of chronic kidney disease
     - 
   * - M
     - **M**\ oderate CKD
     - sequelae_mod = [s_5225, s_5219, 5213, s_5231, s_5249, s_5243, s_5237, s_5255, s_5540, s_5228, s_5222, s_5216, s_5234, s_5252, s_5246, s_5240, s_5258, s_5543, s_1024, s_1025, s_1026, s_1027, s_1433, s_1436, s_1439, s_1430, s_5549, s_1016, s_1017, s_1018, s_1019, s_1421, s_1424, s_1427, s_1418, s_5546, s_1032, s_1033, s_1034, s_1035, s_1445, s_1448, s_1451, s_1442, s_5552] 
   * - Sev
     - **S**\ evere CKD
     - sequelae_sev = [s_5201, s_5207, s_5273, s_5267, s_5261, s_5279, s_5204, s_5210, s_5276, s_5270, s_5264, s_5282, s_504, s_505, s_1385, s_1388, s_1391, s_1382, s_501, s_502, s_1373, s_1376, s_1379, s_1370, s_507, s_508, s_1397, s_1400, s_1403, s_1394] 
.. list-table:: State Data
   :widths: 5 10 10 20
   :header-rows: 1

   * - State
     - Measure
     - Value
     - Notes
   * - S
     - simulants not prevalent with CKD
     - 1-prevalence_c589
     -
   * - C
     - prevalence
     - 0
     -
   * - M
     - prevalence
     - :math:`{\sum_{s\in \text{prevalence_sequelae_mod.sub_causes.c589}}}`
     - = prevalence of Albuminuria sequelae + CKD stage III sequelae + CKD stage IV sequelae
   * - Sev
     - prevalence
     - :math:`{\sum_{s\in \text{prevalence_sequelae_sev.sub_causes.c589}}}`
     - = prevalence of CKD stage V sequelae + CKD end stage sequelae
   * - Sev
     - excess mortality rate (EMR) of severe CKD
     - :math:`\frac{\text{CSMR_c589}}{\text{prevalence_sequelae_severe.sub_causes.c589}}`
     - 
   * - M
     - excess mortality rate (EMR) of moderate CKD
     - :math:`\frac{\text{CSMR_c589}}{\text{prevalence_sequelae_mod.sub_causes.c589}}`
     - 
   * - M
     - disability weight
     - :math:`\frac{{\sum_{s\in \text{sequelae_mod}}} \scriptstyle{\text{disability_weight}_s \times\ \text{prevalence}_s}}{\text{prevalence_c589}}`
     -
   * - Sev
     - disability weight
     - :math:`\frac{{\sum_{s\in \text{sequelae_sev}}} \scriptstyle{\text{disability_weight}_s \times\ \text{prevalence}_s}}{\text{prevalence_c589}}`
     -
   * - All
     - cause-specific mortality rate
     - :math:`\frac{\text{deaths_c589}}{\text{population}}`
     -


.. list-table:: Data Sources and Definitions
   :widths: 10 10 20 20
   :header-rows: 1

   * - Variable
     - Source
     - Description
     - Notes
   * - prevalence_c589
     - como
     - prevalence of chronic kidney disease
     -
   * - deaths_c589
     - codcorrect
     - Count of deaths due to chronic kidney disease
     - 
   * - population
     - demography
     - Mid-year population for given sex/age/year/location
     - 
   * - prevalence_s{sid}
     - como
     - Prevalence of sequela with id {id}
     - 
   * - disability_weight_s{sid}
     - YLD appendix
     - Disability weight of sequela with id {id}
     - 
   * - incidence_c589
     - como
     - Incidence of chronic kidney disease
     -   
        
Validation Criteria
-------------------

* prevalence_moderate_CKD + prevalence_severe_CKD = 1

* prevalence_CKD = sum of prevalence_sequelae_CKD

References
----------

.. [National-Institute-Of-Diabetes-And-Digestive-And-Kidney-Diseases]
    Retrieved 7 Feb 2020.
    https://www.niddk.nih.gov/health-information/kidney-disease/chronic-kidney-disease-ckd
  
.. [National-Kidney-Foundation]
    Retrieved 7 Feb 2020.
    https://www.kidney.org/atoz/content/about-chronic-kidney-disease