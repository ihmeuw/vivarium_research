.. _2019_cause_diabetes:

=====================================
Diabetes Mellitus (PAF of 1 with FPG)
=====================================

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - DM
    - Diabetes Mellitus
    - 
  * - FPG
    - Fasting Plasma Glucose
    - 

Disease Overview
----------------

Diabetes is a disease that occurs when your blood glucose is too high. Blood glucose is your main source of energy and comes from the food you eat. Insulin, a hormone made by the pancreas, helps glucose from food get into your cells to be used for energy. Sometimes your body doesn’t make enough—or any—insulin or doesn’t use insulin well. Glucose then stays in your blood and doesn’t reach your cells. 

There are several types of diabetes, each with distinct characteristics. In type 1 diabetes, the cells in the pancreas that make insulin have been destroyed by the immune system. Type 1 diabetes is usually diagnosed in children and young adults, although it can appear at any age. Individuals with type 1 diabetes require daily insulin injections to survive. In type 2 diabetes, either the pancreas produces sufficient insulin, but cells are not able to properly use it to metabolize glucose or insulin production is insufficient. Depending on the severity of the disease, type 2 diabetes can be treated by oral medications, or individuals may require treatment with insulin. Type 2 is the most common type of diabetes. While it can develop at any age, it is most common in middle-aged and older people.  

A third type is gestational diabetes, which develops in some women during pregnancy. Usually, gestational diabetes resolves after birth. Gestational diabetes increases the risk of developing type 2 diabetes later in life.  
[NIDDK]_

GBD 2019 Modeling Strategy
--------------------------

GBD 2019 Non-Fatal Modeling Strategy
++++++++++++++++++++++++++++++++++++

**Diabetes prevalence and incidence**\

.. list-table:: Diabetes Definitions
   :widths: 12 28
   :header-rows: 1

   * - Diabetes Type
     - Definition
   * - Diabetes Mellitus parent
     - Fasting plasma glucose (FPG) >= 126 mg/dL (7 mmol/L), or reporting to be on treatment with drugs or insulin for diabetes, or persons <15 years who are diagnosed by physicians and identified through a diabetic registry or hospital records
   * - Diabetes Mellitus Type 1
     - Cases of type 1 DM diagnosed by physicians and identified through a diabetic registry or hospital records
   * - Diabetes Mellitus Type 2
     - Fasting plasma glucose (FPG) >= 126 mg/dL (7 mmol/L) or reporting to be on drug or insulin treatment for type 2 diabetes

We model overall DM and type 1 DM in DisMod-MR. Diabetes mellitus estimates are commonly not available by type. Furthermore, while sources will report their estimates as type 2, the diagnostic criteria in the methodological sections are often not sufficiently specific. We therefore calculated estimates of DM type 2 by subtracting the estimates of DM type 1 from the estimates for overall DM for each year, age, sex, and location. 

**Diabetes Outcomes**\

We estimated amputation due to DM, diabetic neuropathy, and diabetic foot for DM type 1 and DM type 2 using DisMod MR‐2.1. Vision loss due to DM is calculated as part of the vision impairment process. We then multiply all proportion draws from neuropathy/foot/amputation models by the parent diabetes model so that all estimates are in the same population‐space. The sum of all DM outcomes cannot exceed 90% of the prevalence of total prevalence for type 1 and type 2.  

Disability weights are calculated for each of the diabetes sequela.  

**Severity distributions**\

We determined the disability weights for each sequela from the GBD disability weight survey. The table below illustrates the severity levels, lay descriptions, and associated disability weights applicable for outcomes related to DM type 1 and DM type 2: 

.. list-table:: Severity distribution for diabetes
   :widths: 15 25 12
   :header-rows: 1

   * - Severity level
     - Lay description
     - DW (95% CI)
   * - Uncomplicated Diabetes Mellitus
     - Has a chronic disease that requires medication every day and causes some worry, but minimal interference with daily activities
     - 0.049 (0.031 - 0.072)
   * - Diabetic neuropathy
     - Has pain, tingling, and numbness in the arms, legs, hands, and feet. The person sometimes gets cramps and muscle weakness. 
     - 0.133 (0.089 - 0.187)
   * - Diabetic neuropathy with diabetic foot
     - Has a sore on the foot that is swollen and causes some difficulty in walking. 
     - 0.15 (0.102 - 0.208)
   * - Diabetic neuropathy with treated amputation
     - Has lost part of one leg, leaving pain and tingling in the stump. The person has an artificial leg that helps in moving around. 
     - 0.167 (0.114 - 0.229)
   * - Diabetic neuropathy with untreated amputation   
     - Has lost part of one leg, leaving pain and tingling in the stump. The person does not have an artificial leg, has frequent sores, and uses crutches. 
     - 0.282 (0.198 - 0.379)
   * - Moderate vision loss due to Diabetes Mellitus
     - Has vision problems that make it difficult to recognize faces or objects across a room. 
     - 0.031 (0.019 - 0.049)
   * - Severe vision loss due to Diabetes Mellitus   
     - Has severe vision loss, which causes difficulty in daily activities, some emotional impact (for example worry), and some difficulty going outside the home without assistance.  
     - 0.184 (0.125 - 0.259)
   * - Blindness due to Diabetes Mellitus
     - Is completely blind, which causes great difficulty in some daily activities, worry and anxiety, and great difficulty going outside the home without assistance.
     - 0.187 (0.124 - 0.26)

[GBD-2019-Capstone-Appendix-diabetes]_

GBD 2019 Fatal Modeling Strategy
++++++++++++++++++++++++++++++++++++

We included vital registration and verbal autopsy data in CODEm to model deaths directly attributed to DM for type 1 and type 2 combined. For verbal autopsy data, we outliered data points from sources where there were zero deaths estimated in an age group as this was not realistic for deaths due to diabetes and we determined that these data sources were unreliable. We outliered all vital registration data from the India Medical Certification of Cause of Death report since the source of the data was unreliable according to expert opinion. We also outliered vital registration data which used the ICD9BTL coding system and that were inconsistent with the rest of the data series and created unlikely time trends.  

Type-specific diabetes mellitus mortality was estimated using deaths from vital registration sources in ICD-10 codes only. Diabetes type-specific information was not available in ICD-9 codes or deaths determined by verbal autopsy.  

[GBD-2019-Capstone-Appendix-diabetes]_

Fasting plasma glucose (FPG)
++++++++++++++++++++++++++++

The GBD study used an ensemble distribution methodology to estimate the prevalence of diabetes based on mean FPG values in locations where data on the prevalence of diabetes was not available. The same ensemble methodology was used to predict mean FPG from diabetes prevalence. 

Cause Hierarchy
+++++++++++++++

.. image:: cause_hierarchy_diabetes_2.svg

Restrictions
++++++++++++

The following table describes any restrictions in GBD 2019 on the effects of
this cause (such as being only fatal or only nonfatal), as well as restrictions
on the ages and sexes to which the cause applies.

.. list-table:: GBD 2019 Cause Restrictions for DM type 2
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
     - 15
     - [15, 19 years), age_group_id=8
   * - YLL age group end
     - 125
     - [95, 125 years), age_group_id=235
   * - YLD age group start
     - 15
     - [15, 19 years), age_group_id=8
   * - YLD age group end
     - 125
     - [95, 125 years), age_group_id=235


Vivarium Modeling Strategy
--------------------------

Scope
+++++

DM type 2 should occur at the incidence of overall DM from the DisMod model. Transition from prevalent DM to death should occur at the EMR rate calculated using DM type 2 specific CSMR and prevalence for DM type 2. Remission should occur at the value from the overall DM model. The transition rate from the susceptible state to the prevalent state should be modified by tobacco and high body mass index. There is a PAF of one for DM and FPG. 

Modeling Strategy for Fasting Plasma Glucose
++++++++++++++++++++++++++++++++++++++++++++

This cause model is designed to simulate the basic structure of the risk factor (FPG) continuous exposure ensemble distribution model. The FPG distribution will range from the theoretical minimum-risk exposure level (TMREL) of 4.5-5.4 mmol/L to the maximum FPG value for each location/sex/age group. For simulants that are in the “Susceptible” state in the vivarium model, the model will randomly draw a value of FPG that is equal to or greater than the TMREL and less than 7.0 mmol/L (case definition for overall DM). For simulants that are included in the prevalent diabetes state, the model will randomly draw a value of FPG that is equal to or greater than 7.0 mmol/L.  

Assumptions and Limitations
+++++++++++++++++++++++++++

- We assume that all incident cases of diabetes in ages 25+ are due to DM type 2.  
- We do not correctly account for the disease burden due to “controlled” diabetes rather than true susceptible status. 
- We do not account for the increased risk of death, ischemic heart disease, and other conditions associated with impaired fasting plasma glucose (between 5.6 and 6.9 mmol/L). 
- We do not account for simulants to progress through increasing levels of severity of diabetes complications. 
- The GBD estimates do not include gestational diabetes. 

Cause Model Diagram
+++++++++++++++++++

.. image:: diabetes_cause_model_option_1.svg

State and Transition Data Tables
++++++++++++++++++++++++++++++++

Definitions
"""""""""""

.. list-table:: State Definitions
   :widths: 1, 5, 10
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - **S**\usceptible to DM type 2
     - Simulant that has not been diagnosed with DM type 2
   * - P
     - **P**\revalent DM type 2
     - Simulant with prevalent DM type 2

States Data
"""""""""""

.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - All
     - cause-specific mortality rate (CSMR)
     - :math:`\frac{\text{deaths_c976}}{\text{population}}`
     - Post CoDCorrect cause-level CSMR, type 2 only
   * - S
     - prevalence
     - 1-prevalence_c976
     - 
   * - P
     - prevalence
     - :math:`\sum\limits_{s \in sequelae} \text{prevalence}_s`
     - There are 8 sequelae
   * - S
     - excess mortality rate
     - 0
     - 
   * - P
     - excess mortality rate
     - :math:`\frac{\text{csmr_976}}{\text{prevalence_976}}`
     - Cannot use EMR from overall DM model as it represents combination of risk for type 1 and type 2
   * - S
     - disabilty weights
     - 0
     -
   * - P
     - disability weights
     - :math:`\frac{1}{\text{prevalence_c976}} \times \sum\limits_{s \in sequelae} \text{disability_weight}_s \times \text{prevalence}_s`
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
     - P
     - incidence_m2005
     - This is the incidence from the overall DM model; assuming that incidence among people 25+ is almost entirely type 2
   * - 2
     - P
     - S
     - remission_m2005
     - This is remission from the overall DM model; remission is only allowed among those 15+ and represents glucose control among persons with type 2 DM as remission is not possible for type 1

Data Sources
""""""""""""

.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Measure
     - Sources
     - Description
     - Notes
   * - prevalence_c976
     - como
     - Prevalence of DM type 2
     - 
   * - deaths_c976
     - codcorrect
     - Deaths from DM type 2
     -
   * - incidence_m2005
     - como
     - Incidence of DM type 2
     - Assuming that the vast majority of incident DM cases among those 25+ are type 2
   * - population
     - demography
     - Mid-year population for given age/sex/year/location
     - 
   * - sequelae_c976
     - gbd_mapping
     - List of 8 sequelae for DM type 2
     - 
   * - prevalence_s{`sid`}
     - como
     - Prevalence of sequela with id `sid`
     - 
   * - disability_weight_s{`sid`}
     - YLD appendix
     - Disability weight of sequela with id `sid`
     - 
   * - sequelae
     - sequelae definition
     - {s5465, s5456, s5453, s5459, s5462, s5468, s5471, s5474}
     - 


Validation Criteria
+++++++++++++++++++

1. Compare CSMR explained by simulants to CSMR from CoDCorrect in GBD
2. Compare prevalence experienced by simulants to post-COMO prevalence in GBD

References
----------

.. [NIDDK] What is Diabetes? National Institute of Diabetes and Digestive and Kidney Diseases, U.S. Department of Health and Human Services.
  Retrieved 22 June 2021.
  https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes.

.. [GBD-2019-Capstone-Appendix-diabetes]
  Appendix_ to: `GBD 2019 Diseases and Injuries Collaborators. Global burden of 369 diseases and injuries in 204 countries and territories, 1990–2019: a systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 17 Oct 2020;396:1204-1222` 

.. _Appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30925-9/attachment/deb36c39-0e91-4057-9594-cc60654cf57f/mmc1.pdf