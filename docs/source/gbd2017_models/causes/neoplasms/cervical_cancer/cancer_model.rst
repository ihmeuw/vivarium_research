.. _2017_cancer_model_cervical_cancer:

===============
Cervical Cancer
===============

.. contents::
  :local:

Disease Overview
++++++++++++++++

Cervical cancer is a female-specific cancer. It is prevalent globally, ranked 
as the fourth-most common cancer in women. In 2018, about 106,430 new cervical 
cancer cases are diagnosed in China and about 47,739 cervical cancer deaths occur 
annually in China. For women at 50-54 years of age, the incidence of cervical 
cancer reaches its maximum value, 30 cases per 100,000 person-years. The deaths 
due to cervical cancer increase over age, and have the highest value 29 per 
100,000 person-years in elder people who aged above 75 years. 
[HPV-and-related-disease-2019-summary-report]_

.. list-table:: ICD codes for cervical cancer
   :widths: 5 10
   :header-rows: 1

   * - Cause
     - ICD10
   * - Benign cervical cancer
     - D06 (D06.0, D06.1, D06.7, D06.9), N87.1
   * - Invasive cervical cancer
     - C53 (C53.0, C53.1, C53.3, C53.4, C53.8, C53.9)


GBD 2017 Modeling Strategy
++++++++++++++++++++++++++

The cervical cancer model includes both benign and invasive state. Benign 
cervival cancer is modelled together with uterine cancer, namely `benign and in 
situ cervical and uterine neoplasms`. GBD directly processed the combined 
clinical informatics data in DisMod so they don’t have a way to split it in 
cause level. However, it seems doable if the clinical informatics team could 
remap this cause to benign cervical and uterine separately in next round.

.. list-table:: State definition
   :widths: 5 25 10
   :header-rows: 1

   * - State name
     - Definition
     - Notes
   * - Susceptible
     - Individuals who don't have HPV infection nor benign cervical cancer. 
     - 
   * - hrHPV-infected
     - Individuals who are infected with HPV 16 or 18
     - Our model restricts high-risk HPV infection to be subtypes 16 and 18 only.
   * - Benign cervical cancer (BCC)
     - High grade cervical lesions or worse (CIN2+), including cervical 
       intraepithelial neoplasia grade 2-3 and cervical carcinoma without 
       invasion of basement membrane.
     - ICO/IARC HPV Information Centre
   * - Invasive cervival cancer (ICC)
     - The high-grade precancerous cells invade the basement membrane.
     - ICC stages range from 1 to 4 according to [FIGO-cancer-stage-2018-report]_
   * - Recovered
     - Recovered from invasive cervical cancer
     - 


Cause hierarchy of cervical cancer in GBD
-----------------------------------------

.. list-table:: GBD cervical cancer cause hierarchy
   :widths: 5 5 5 20
   :header-rows: 1

   * - Cause name
     - GBD cause id
     - Level
     - Sequelae
   * - All causes
     - c_294
     - 0
     - 
   * - All NCDs
     - c_409
     - 1
     -   
   * - Neoplasms
     - c_410
     - 2
     -   
   * - Cervical cancer
     - c_432
     - 3
     - diagnosis_and_primary_therapy_phase_of_cervical_cancer (s_282), controlled_phase_of_cervical_cancer (s_283), metastatic_phase_of_cervical_cancer (s_284), terminal_phase_of_cervical_cancer (s_285)
      
       
.. image:: cervical_cancer_hierarchy.svg


Restrictions
------------

The following table describes any restrictions on the effects of this cause 
(such as being only fatal or only nonfatal), as well as restrictions on the 
age and sex of simulants to which different aspects of the cause model apply.

.. list-table:: Restrictions
   :widths: 10 10 10
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     - False
     -
   * - Female only
     - True
     -
   * - YLL only
     - False
     -
   * - YLD only
     - False
     -
   * - YLL age group start
     - 15 to 19
     - GBD age group id 8
   * - YLL age group end
     - 95 plus
     - GBD age group id 235
   * - YLD age group start
     - 15 to 19
     - GBD age group id 8
   * - YLD age group end
     - 95 plus
     - GBD age group id 235


Vivarium Modeling Strategy
++++++++++++++++++++++++++

Things to consider: 

1. Within GBD 2017 data, there is no remission rate for invasive cervical cancer.
2. After diagnosis of invasive cervical cancer if a patient survives more than 
   10 years, they are considered cured for calculating disability. Additionally, per GBD 2017, the patients also do not have excess mortality rate after 10 years. In vivarium simulation model, we will remit them back to a recovered state.
3. Keep simulants in benign cervical cancer state and don't go into remission 
   after successful treatment unless literature tells us otherwise.
4. Most of the benign cervical cancer cases are resutling from a disease state 
   called `hrHPV-infected`, where only high risk subtypes 16 and 18 of HPV 
   infection are considered in our model. Though we do include the transition 
   from susceptible state to benign cervical cancer state without high-risk HPV infection.

.. todo::

   Add more assumptions and limitations.


Compartmental Diagram
+++++++++++++++++++++

  .. image:: cervical_cancer_cause_model_diagram.svg

.. note::

   For BCC caused by hrHPV infection, should we include CIN regression only or 
   both CIN and HPV regression if we decided to add this parameter?


State and Transition Data Tables
++++++++++++++++++++++++++++++++

.. list-table:: State Data
   :widths: 10 10 30 20
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - Susceptible
     - prevalence
     - 1 - (prev_hrHPV + prev_BCC_and_S_hrHPV + prev_BCC_and_C_hrHPV + prev_ICC_and_S_hrHPV + prev_ICC_and_C_hrHPV)
     - derived, used only at initialization
   * - Susceptible
     - excess mortality rate
     - 0
     - No EMR for susceptible state
   * - Susceptible
     - disabilty weights
     - 0
     - No disability weights for susceptible state
   * - hrHPV-infected
     - prevalence
     - /ihme/costeffectiveness/vivarium_csu_cancer
     - used only at initialization
   * - hrHPV-infected
     - excess mortality rate
     - 0
     - assume zero death due to high risk HPV infection
   * - hrHPV-infected
     - disabilty weights
     - 0
     - 
   * - BCC, S_hrHPV
     - prevalence (prev_BCC_and_S_hrHPV)
     - :math:`\text{prev_BCC}\times(1-PAF\times\frac{\text{RR_hrHPV}}{\text{RR_hrHPV}-1})`
     - prev_BCC, PAF, and RR_hrHPV are specified in `Data sources`
   * - BCC, S_hrHPV
     - excess mortality rate
     - 0
     - assume no EMR in BCC state
   * - BCC, S_hrHPV
     - disability weight
     - 0
     - 
   * - BCC, C_hrHPV
     - prevalence (prev_BCC_and_C_hrHPV)
     - :math:`\text{prev_BCC}\times\text{PAF}\times\frac{\text{RR_hrHPV}}{\text{RR_hrHPV}-1}`
     - prev_BCC, PAF, and RR_hrHPV are specified in `Data sources`
   * - BCC, C_hrHPV
     - excess mortality rate
     - 0
     - assume no EMR in BCC state
   * - BCC, C_hrHPV
     - disability weight
     - 0
     - 
   * - ICC, S_hrHPV
     - prevalence (prev_ICC_and_S_hrHPV)
     - :math:`\text{prev_c432}\times(1-PAF\times\frac{\text{RR_hrHPV}}{\text{RR_hrHPV}-1})`
     - prev_c432, PAF, and RR_hrHPV are specified in `Data sources`
   * - ICC, S_hrHPV
     - excess mortality rate
     - :math:`\frac{\text{csmr_c432}}{\text{prev_c432}}`
     - 
   * - ICC, S_hrHPV  
     - disability weights
     - :math:`\frac{\displaystyle{\sum_{s\in\text{s_c432}}}\scriptstyle{\text{disability_weight}_s\,\times\,\text{prev}_s}}{\displaystyle{\sum_{s\in\text{s_c432}}}\scriptstyle{\text{prev}_s}}`
     - weighted average of cervical cancer disability weight over all sequelae including ids s_282, s_283, s_284, s_285
   * - ICC, C_hrHPV
     - prevalence (prev_ICC_and_C_hrHPV)
     - :math:`\text{prev_c432}\times\text{PAF}\times\frac{\text{RR_hrHPV}}{\text{RR_hrHPV}-1}`
     - prev_c432, PAF, and RR_hrHPV are specified in `Data sources`
   * - ICC, C_hrHPV
     - excess mortality rate
     - :math:`\frac{\text{csmr_c432}}{\text{prev_c432}}`
     - 
   * - ICC, C_hrHPV  
     - disability weights
     - :math:`\frac{\displaystyle{\sum_{s\in\text{s_c432}}}\scriptstyle{\text{disability_weight}_s\,\times\,\text{prev}_s}}{\displaystyle{\sum_{s\in\text{s_c432}}}\scriptstyle{\text{prev}_s}}`
     - weighted average of cervical cancer disability weight over all sequelae including ids s_282, s_283, s_284, s_285

S_ = susceptible; C_ = with condition

.. list-table:: Transition Data
   :widths: 5 5 5 30 30
   :header-rows: 1

   * - Transition
     - Source state
     - Sink state
     - Value
     - Notes
   * - i_hrHPV
     - Susceptible
     - hrHPV-infected
     - hrHPV incidence
     - i_hrHPV is specified in `Data sources`.
   * - r_hrHPV
     - hrHPV-infected
     - Susceptible
     - hrHPV clearance/remission
     - r_hrHPV is specified in `Data sources`.
   * - i_BCC_hrHPV+
     - hrHPV-infected
     - BCC, C_hrHPV
     - :math:`\text{incidence_BCC}\times(1-PAF)\times\text{RR_hrHPV}`
     - incidence_BCC, PAF, and RR_hrHPV are specified in `Data sources`.
   * - r_BCC_hrHPV+
     - BCC, C_hrHPV
     - Susceptible
     - BCC_C_hrHPV regression rate
     - r_BCC_hrHPV+ is specified in `Data sources`.
   * - i_BCC_hrHPV-
     - Susceptible
     - BCC, S_hrHPV
     - :math:`\text{incidence_BCC}\times(1-PAF)`
     - incidence_BCC and PAF are specified in `Data sources`.
   * - r_BCC_hrHPV-
     - BCC, S_hrHPV
     - Susceptible
     - BCC_S_hrHPV regression rate
     - r_BCC_hrHPV- is specified in `Data sources`.
   * - i_hrHPV
     - BCC, S_hrHPV
     - BCC, C_hrHPV
     - hrHPV incidence
     - 
   * - r_hrHPV
     - BCC, C_hrHPV
     - BCC, S_hrHPV
     - hrHPV clearance/remission
     - 
   * - i_ICC
     - BCC, S_hrHPV
     - ICC, S_hrHPV
     - 1 / duration_BCC
     - duration_BCC is specified in `Data sources`.
   * - i_ICC
     - BCC, C_hrHPV
     - ICC, C_hrHPV
     - 1 / duration_BCC
     - duration_BCC is specified in `Data sources`.
   * - i_hrHPV
     - ICC, S_hrHPV
     - ICC, C_hrHPV
     - hrHPV incidence
     - 
   * - r_hrHPV
     - ICC, C_hrHPV
     - ICC, S_hrHPV
     - hrHPV clearance/remission
     - 
   * - r
     - ICC, S_hrHPV
     - Recovered
     - 0.1 per person-years regardless of age
     - remission rate from ICC to R = 1 divided by duration of cervical cancer (10 years) = 0.1 per person-years regardless of age
   * - r
     - ICC, C_hrHPV
     - Recovered
     - 0.1 per person-years regardless of age
     - remission rate from ICC to R = 1 divided by duration of cervical cancer (10 years) = 0.1 per person-years regardless of age

prev_ = prevalence; i_ = incidence; r_ = remission; RR_ = relative risk; PAF = population attributable fraction

.. list-table:: Data sources
   :widths: 30 30 30
   :header-rows: 1
   
   * - Measure
     - Sources
     - Notes
   * - crude-prevalence ratio of BCC
     - derived from marketscan data
     - see below for prevalence ratio calculation
   * - prev_BCC 
     - derived from incidence_c432 and duration of BCC
     - prev_BCC(age) = incidence_c432(age) * duration_BCC
   * - duration_BCC
     - extracted from [Burger-et-al-2020]_
     - 10 years
   * - incidence_BCC
     - derived from incidence_c432
     - incidence_BCC(age) = incidence_c432(age + duration_BCC)
   * - r_BCC_hrHPV+
     - 
     - add data filepath
   * - r_BCC_hrHPV-
     - 
     - add data filepath
   * - prev_c432
     - forecasted for future years 2020-2040
     - /ihme/costeffectiveness/vivarium_csu_cancer
   * - csmr_c432
     - forecasted for future years 2020-2040
     - /ihme/costeffectiveness/vivarium_csu_cancer
   * - incidence_c432
     - forecasted for future years 2020-2040
     - /ihme/costeffectiveness/vivarium_csu_cancer
   * - remission_c432
     - GBD 2017
     - remission rate of cervical cancer = 1/10 per person-years for all ages 
   * - Disability weights for cervical cancer sequelae
     - [GBD-2017-YLD-Appendix-Cervical-Cancer]_
     - total breast cancer disability weight over all sequelae with ids s_282, s_283, s_284, s_285
   * - ACMR
     - forecasted for future years 2020-2040 
     - /ihme/costeffectiveness/vivarium_csu_cancer
   * - Population
     - demography for 2017 
     - mid-year population
   * - prev_hrHPV
     - derived from Abie's dismod
     - /ihme/costeffectiveness/vivarium_csu_cancer
   * - incidence_hrHPV
     - derived from Abie's dismod
     - /ihme/costeffectiveness/vivarium_csu_cancer
   * - remission_hrHPV
     - derived from Abie's dismod
     - /ihme/costeffectiveness/vivarium_csu_cancer
   * - RR_hrHPV
     - extracted from [Naucler-et-al-2007]_
     - relative risk of HPV 16/18 causing CIN2+ = 27.4 (95%CI 19.7 to 38.0)
   * - PAF
     - derived from prev_hrHPV and RR_hrHPV
     - PAF = :math:`\frac{\text{prev_hrHPV}\times(\text{RR_hrHPV}-1)}{\text{prev_hrHPV}\times(\text{RR_hrHPV}-1)+1}`

.. todo::

  Describe dismod approach to estimate consistent rates for:
   - prevalence, incidence, and remission of high risk HPV infection.
   - prevalence, incidence, and regression of benign cervical cancer

Prevalence ratio calculation:

1. MarketScan research databases capture person-specific clinical utilization, expenditures, and enrollment across inpatient, outpatient, prescription drug and carve-out services. 
   Currently GBD estimates bundle benign and in situ cervical and uterine neoplasms. Thus, we use external marketScan data source to calculate ratio of benign to malignant cervical cancer. 
2. Outpatient year 2016 and 2017 data were pulled with following ICD 10 codes: C53 Malignant neoplasm of cervix uteri, C53.0 Malignant neoplasm of endocervix, C53.1 Malignant neoplasm 
   of exocervix, C53.8 Malignant neoplasm of overlapping sites of cervix uteri, C53.9 Malignant neoplasm of cervix uteri, D06  (CIN3) Carcinoma in situ of cervix uteri, D06.0 Carcinoma in situ of 
   endocervix, D06.1 Carcinoma in situ of exocervix, D06.7 Carcinoma in situ of other parts of cervix, D06.9 Carcinoma in situ of cervix, N87.1 (CIN2) Moderate cervical dysplasia, Z12.4 
   Encounter for screening for malignant neoplasm of cervix. 
3. Non-medicare (age 0-65) & medicare (subset age 65+ only) were merged together to include all ages and limited to screened female patients only. After concatenating 2016& 2017 outpatient 
   data, duplicates were removed based on enrolid and data were grouped by 5-year age band to align with GBD age pattern. Prevalence ratio was calculated using benign cervical cancer counts 
   over invasive cervical cancer counts within each age group. Result shows younger age groups have larger ratio with wider uncertainty level. This ratio pattern is consistent with a study [Sun-et-al-2010]_ , 
   that is BCC prevalence is higher than ICC prevalence for younger and middle age groups, but the specific ratio values are a little off.

.. list-table:: prevalence ratio
   :widths: 20 20
   :header-rows: 1

   * - Age Group
     - Prevalence Ratio
   * - 15_to_19
     - 26.5    
   * - 20_to_24
     - 89.6  
   * - 25_to_29
     - 36.8  
   * - 30_to_34
     - 22.2  
   * - 35_to_39
     - 11.5 
   * - 40_to_44
     - 7.2  
   * - 45_to_49
     - 4.98 
   * - 50_to_54
     - 3.75 
   * - 55_to_59
     - 2.5
   * - 60_to_64
     - 1.92  
   * - 65_to_69
     - 1.26
   * - 70_to_74
     - 0.71
   * - 75_to_79
     - 0.48
   * - 80 plus 0.5
     - 0.5
   * - all ages
     - 8.83


Validation Criteria
+++++++++++++++++++

Fatal outcomes
 - Deaths
     - EMR_hrHPV = EMR_BCC = 0
     - ACMR = CSMR_c432 + CSMR_other
 - YLLs
     - YLLs_hrHPV = YLLs_BCC = 0
     - YLLs_total = YLLs_c432 + YLLs_other

Non-fatal outcomes
 - YLDs
     - YLDs_hrHPV = YLDs_BCC = YLDs_other = 0
     - YLDs_total = YLDs_c432
 - Prevalence
     - add formula here once we identified marketscan data
 - Incidence
     - add formula here once we identified marketscan data

.. todo::

   1. Compare forecast data in 2020 against GBD 2017 (2019) results.
   2. Compare prevalence, incidence, CSMR of cervical cancer, and ACMR over year
      with GBD age-/sex- stratification that calculated from simulation baseline
      to forecast data.
   3. Check outcomes such as YLDs and YLLs in 2020 yield from simulation baseline
      against GBD 2017 (2019) all causes and cervical cancer results.


References
++++++++++

.. [GBD-2017-YLD-Appendix-Cervical-Cancer]
   Supplement to: GBD 2017 Disease and Injury Incidence and Prevalence
   Collaborators. Global, regional, and national incidence, prevalence, and
   years lived with disability for 354 diseases and injuries for 195 countries
   and territories, 1990–2017: a systematic analysis for the Global Burden of
   Disease Study 2017. Lancet 2018; 392: 1789–858 (pp. 310-317)
.. [FIGO-cancer-stage-2018-report] 
   FIGO Cancer Report 2018: Cancer of the cervix uteri 
   https://obgyn.onlinelibrary.wiley.com/doi/epdf/10.1002/ijgo.12611
.. [HPV-and-related-disease-2019-summary-report] 
   Ferlay J, Ervik M, Lam F, Colombet M, Mery L, Piñeros M, Znaor A, Soerjomataram 
   I, Bray F (2018). Global Cancer Observatory: Cancer Today. Lyon, France: 
   International Agency for Research on Cancer.
.. [Sun-et-al-2010]
   Sun Z-R, Ji Y-H, Zhou W-Q, Zhang S-L, Jiang W-G, Ruan Q. Characteristics of HPV 
   prevalence among women in Liaoning province, China. International Journal of 
   Gynecology & Obstetrics 2010; 109: 105–9.
.. [Burger-et-al-2020]
   Burger EA, de Kok IMCM, Groene E, et al. Estimating the Natural History of 
   Cervical Carcinogenesis Using Simulation Models: A CISNET Comparative Analysis. 
   J Natl Cancer Inst 2020; 112: 955–63.
.. [Naucler-et-al-2007]
   Naucler P, Ryd W, Törnberg S, et al. HPV type-specific risks of high-grade CIN 
   during 4 years of follow-up: a population-based prospective study. Br J Cancer 
   2007; 97: 129–32.
