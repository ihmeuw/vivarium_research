.. _2017_cancer_model_cervical_cancer:

===============
Cervical Cancer
===============

.. contents::
  :local:

Disease Overview
++++++++++++++++

.. todo::

   Add definition of cervical cancer. In particular, find data about global 
   prevalence and disease fatal and non fatal description.

.. list-table:: ICD codes for cervical cancer
   :widths: 5 10 10
   :header-rows: 1

   * - Cause
     - ICD10
     - IDC9
   * - Benign cervical cancer
     - D06 (D06.0, D06.1, D06.7, D06.9), D26.0
     - 219.0, 233.1
   * - Invasive cervical cancer
     - C53 (C53.0, C53.1, C53.3, C53.4, C53.8, C53.9)
     - 180 (180.0-180.9 except 180.7)


GBD 2017 Modeling Strategy
++++++++++++++++++++++++++

The cervical cancer model includes both benign and invasive state. Benign 
cervival cancer is modelled together with uterine cancer, namely `benign and in 
situ cervical and uterine neoplasms`. GBD directly processed the combined 
clinical informatics data in DisMod so they don’t have a way to split it in 
cause level. However, it seems doable if the clinical informatics team could 
remap this cause to benign cervical and uterine separately in next round.

.. list-table:: Cervical cancer states
   :widths: 5 25 10
   :header-rows: 1

   * - State name
     - Definition
     - Notes
   * - Benign cervical cancer (BCC)
     - The carcinoma has not extended beyond the pelvic wall.
     - Stage 1 to 3 according to [FIGO staging of cancer of the cervix uteri]_
   * - Invasive cervival cancer (ICC)
     - The carcinoma has extended beyond the true pelvis and spread to adjacent pelvic organs or distant organs.
     - Stage 4 according to [FIGO staging of cancer of the cervix uteri]_   


Cause hierarchy of cervical cancer in GBD
-----------------------------------------

.. list-table:: GBD cervical cancer cause hierarchy
   :widths: 5 5 5 10
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
     - diagnosis_and_primary_therapy_phase_of_cervical_cancer (s_282)
     - controlled_phase_of_cervical_cancer (s_283)
     - metastatic_phase_of_cervical_cancer (s_284)
     - terminal_phase_of_cervical_cancer (s_285)

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
2. After diagnosis of invasive cervical cancer if a patient survives more than 10 years, they are considered cured for calculating disability. Additionally, per GBD 2017, the patients also do not have excess mortality rate after 10 years. In vivarium simulation model, we will remit them back to a recovered state.
3. Keep simulants in benign cervical cancer state and don't go into remission after successful treatment unless literature tells us otherwise.

.. todo::

   Add more assumptions and limitations.


Compartmental Diagram
+++++++++++++++++++++

  .. image:: cervical_cancer_cause_model_diagram.svg


State and Transition Data Tables
++++++++++++++++++++++++++++++++

.. list-table:: State Data
   :widths: 10 10 30 20
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - S
     - prevalence
     - 1 - (prev_BCC + prev_c432)
     - derived, used only at initialization
   * - S
     - excess mortality rate
     - 0
     - No EMR for S state
   * - S
     - disabilty weights
     - 0
     - No disability weights for S state
   * - Benign cervical cancer (BCC)
     - prevalence
     - crude prevalence ratio of BCC x prev_c432
     - used only at initialization
   * - Benign cervical cancer (BCC)
     - excess mortality rate
     - 0
     - assume no EMR in BCC state
   * - Benign cervical cancer (BCC)
     - disability weight
     - 0
     - 
   * - Cervical cancer
     - prevalence
     - prev_c432
     - use forecasted prev to calculate EMR for future years
   * - Cervical cancer
     - excess mortality rate
     - :math:`\frac{\text{csmr_c432}}{\text{prev_c432}}`
     - csmr_c432 = deaths_c432 / population
   * - Cervical cancer  
     - disability weights
     - :math:`\displaystyle{\sum_{s\in\text{s_c432}}}\scriptstyle{\text{disability_weight}_s\,\times\,\text{prev}_s}`
     - total cervical cancer disability weight over all sequelae including ids s_282, s_283, s_284, s_285

.. list-table:: Transition Data
   :widths: 5 5 5 30 30
   :header-rows: 1

   * - Transition
     - Source state
     - Sink state
     - Value
     - Notes
   * - i1
     - S
     - Benign cervical cancer (BCC)
     - :math:`\frac{\text{prev_c432}\times\text{crude prevalence ratio of BCC}}{\text{duration_BCC}}`
     - prev_c432 comes from forecast data for 2020-2040
   * - i2
     - Benign cervical cancer (BCC)
     - Cervical cancer
     - :math:`\frac{\text{incidence_c432}}{\text{prev_BCC}}`
     - incidence_c432 comes from forecast data for 2020-2040
   * - r
     - Cervical cancer
     - Recovered
     - 0.1 per person-years regardless of age
     - remission rate from Cervical cancer to R = 1 divided by duration of cervical cancer (10 years)

.. list-table:: Data sources
   :widths: 30 30 30
   :header-rows: 1
   
   * - Measure
     - Sources
     - Notes
   * - prev_BCC 
     - derived from crude prevalence ratio of BCC and prev_c432
     - 
   * - duration_BCC
     - extracted from literature
     - temporarily use ? years
   * - Incidence_BCC
     - derived from prev_BCC and duration_BCC
     - 
   * - crude-prevalence ratio of BCC
     - derived from marketscan data
     - see below for prevalence ratio calculation
   * - prev_c432
     - forecasted for future years 2020-2040
     - forcasted data filepath: /ihme/costeffectiveness/vivarium_csu_cancer
   * - csmr_c432
     - forecasted for future years 2020-2040
     - forcasted data filepath: /ihme/costeffectiveness/vivarium_csu_cancer
   * - incidence_c432
     - forecasted for future years 2020-2040
     - forcasted data filepath: /ihme/costeffectiveness/vivarium_csu_cancer
   * - remission_c432
     - GBD 2017
     - remission rate of cervical cancer = 1/10 per person-years for all ages 
   * - Disability weights for cervical cancer sequelae
     - GBD 2017 YLD appendix
     - total breast cancer disability weight over all sequelae with ids s_282, s_283, s_284, s_285
   * - ACMR
     - forecasted for future years 2020-2040 
     - forcasted data filepath: /ihme/costeffectiveness/vivarium_csu_cancer
   * - Population
     - demography for 2017 
     - mid-year population

.. todo::

  add details for crude prevalence ratio calculation

.. note::

  - add details


Validation Criteria
+++++++++++++++++++

Fatal outcomes
 - Deaths
     - EMR_BCC = 0
     - ACMR = CSMR_c432 + CSMR_other
 - YLLs
     - YLLs_BCC = 0
     - YLLs_total = YLLs_c432 + YLLs_other

Non-fatal outcomes
 - YLDs
     - YLDs_BCC = YLDs_other = 0
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

.. [GBD-2017-YLD-Capstone-Appendix-Cervical-Cancer]
   Supplement to: GBD 2017 Disease and Injury Incidence and Prevalence
   Collaborators. Global, regional, and national incidence, prevalence, and
   years lived with disability for 354 diseases and injuries for 195 countries
   and territories, 1990–2017: a systematic analysis for the Global Burden of
   Disease Study 2017. Lancet 2018; 392: 1789–858 (pp. 310-317)
.. [FIGO staging of cancer of the cervix uteri] FIGO Cancer Report 2018: Cancer of the cervix uteri
   https://obgyn.onlinelibrary.wiley.com/doi/epdf/10.1002/ijgo.12611
