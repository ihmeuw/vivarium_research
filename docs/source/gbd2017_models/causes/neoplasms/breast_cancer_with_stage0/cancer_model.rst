.. _2017_cancer_model_breast_cancer_with_stage_0:

==========================
Breast Cancer with stage 0
==========================

.. contents::
  :local:

Disease Overview
----------------

.. todo::

   Add definition of each cancer. In particular, find data about global prevalence and disease fatal and non fatal description.


GBD 2017 Modeling Strategy
--------------------------

[GBD-2017-YLD-Capstone-Appendix-1-Breast-Cancer-0]_

Breast cancer stage 1+ in GBD 2017 and stage 0 not in GBD
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

This breast cancer model includes both stage 0 and stage 1+. Stage 0 is not modelled in GBD 2017 while stage 1+ is. 

+------------------------------------------------------------------------------------------------------------------+
| Breast cancer types                                                                                              |
+===============+========================================================================+=============+===========+
| Disease stage | Definition                                                             | Sequaelae id| Notes     |
+---------------+------------------------------------------------------------------------+-------------+-----------+
| stage 0       | non-invasive breast cancers, such as DCIS or LCIS.                     |             | external  |
|               | Both cancerous and non-cancerous cells are within the boundaries of    |             | data need-|
|               | the part of the breast in which the tumor begins to grown and no       |             | ed for in |
|               | evidence found of their invasion in the surrounding tissues.           |             | situ brea-|
|               |                                                                        |             | st cancer |
+---------------+------------------------------------------------------------------------+-------------+-----------+
| stage 1+      | invasive breast cancer, it exists when abnormal cells from within the  | s_277,s_5486|           |
|               | lobules or milk ducts split out into close proximity of breast tissue. | s_5489,s_279|           |
|               | Cancer cells can pass through the breast to different parts of the body| s_280,s_5492|           |
|               | through immune system or the systemic circulation.                     |             |           |
+---------------+------------------------------------------------------------------------+-------------+-----------+

Cause Hierarchy of stage 1+ breast cancer in GBD
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  +-------------------------------------------------------------------------------------------------------------+
  | GBD breast cancer cause hierarchy                                                                           |
  +===============+======================+=======+=================================+============================+    
  | Cause name    | GBD cause id         | Level | Sequaelae                       |                            |    
  +---------------+----------------------+-------+---------------------------------+----------------------------+
  | All causes    | c_294                | 0     |                                 |                            |
  +---------------+----------------------+-------+---------------------------------+----------------------------+
  | All NCDs      | c_409                | 1     |                                 |                            |
  +---------------+----------------------+-------+---------------------------------+----------------------------+
  | Neoplasms     | C_410                | 2     |                                 |                            |
  +---------------+----------------------+-------+---------------------------------+----------------------------+
  | Breast cancer | C_429                | 3     | diagnosis_and_primary_therapy_phase_of_breast_cancer (s_277) |
  |               |                      |       | metastatic_phase_of_breast_cancer (s_279)                    |
  |               |                      |       | terminal_phase_of_breast_cancer (s_280)                      |
  |               |                      |       | controlled_phase_of_breast_cancer_with_mastectomy (s_5486)   |
  |               |                      |       | controlled_phase_of_breast_cancer_without_mastectomy (s_5489)| 
  |               |                      |       | mastectomy_from_breast_cancer_beyond_ten_years (s_5492)      |
  +---------------+----------------------+-------+--------------------------------------------------------------+

.. image:: breast_cancer_hierarchy.svg


Restrictions
~~~~~~~~~~~~

The following table describes any restrictions on the effects of this cause
(such as being only fatal or only nonfatal), as well as restrictions on the age
and sex of simulants to which different aspects of the cause model apply.

.. list-table:: Restrictions
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
--------------------------

Things to consider: 

1. Within GBD 2017 data, there is no remission rate for stage 1+ breast cancer.
2. Within GBD 2017, after diagnosis/treatment if a patient survives more than 10 years, they are considered cured for calculating disability. Additionally, per GBD 2017, the patients also do not have excess mortality rate after 10 years. For vivarium simulation models, this means we need to track how long patients have been in the breast cancer state. This should be easy for those who has a breast cancer incidence after sim start. For those who were iniatialized in the breast cancer state, we need to assign when breast cancer was diagnosised in the past. After their 10 years is up and they still havent died, we need to decide what susceptability state to remit them to. 

.. todo::

   Add more assumptions and limitations.


Compartmental Diagram
+++++++++++++++++++++

  .. image:: compartmental_model_simple.svg


State and Transition Data Tables
++++++++++++++++++++++++++++++++

+--------------------------------------------+
| State definitions                          |
+============+===============================+
| State      | State definitions             |                       
+------------+-------------------------------+
| S          | Susceptible                   | 
+------------+-------------------------------+
| DCIS       | with DCIS                     | 
+------------+-------------------------------+
| LCIS       | with LCIS                     | 
+------------+-------------------------------+
| BC         | with breast cancer            | 
+------------+-------------------------------+
| R          | recovered from breast cancer  | 
+------------+-------------------------------+

.. list-table:: State Data
   :widths: 10 25 25 40
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - S
     - prevalence
     - 1 - (prev_DCIS + prev_LCIS + prev_c429)
     - derived, used only at initialization
   * - S
     - excess mortality rate
     - 0
     - No EMR for S state
   * - S
     - disabilty weights
     - 0
     - No disability weights for S state
   * - DCIS
     - prevalence
     - crude prevalence ratio of DCIS x prev_c429
     - used only at initialization
   * - DCIS 
     - excess mortality rate
     - 0
     - assume no EMR in DCIS state, add reference to this assumption
   * - DCIS 
     - disability weight
     - 0
     - 
   * - LCIS 
     - prevalence
     - crude prevalence ratio of LCIS x prev_c429
     - used only at initialization
   * - LCIS 
     - excess mortality rate
     - 0
     - assume no EMR in LCIS state, add reference to this assumption
   * - LCIS 
     - disability weight
     - 0
     - 
   * - BC
     - prevalence
     - prev_c429
     - use forecasted prev to calculate EMR for future years
   * - BC
     - excess mortality rate
     - :math:`\frac{\text{deaths_c429}}{\text{population}\times\text{prev_c429}}`
     - 
   * - BC  
     - disability weights
     - :math:`\displaystyle{\sum_{s\in\text{s_c429}}}\scriptstyle{\text{disability_weight}_s\,\times\,\text{prev}_s}`
     - total breast cancer disability weight over all sequelae with ids s_277, s_5486, s_5489, s_279, s_280, s_5492
   * - BC
     - cause specific mortality rate
     - csmr_c429= :math:`\frac{\text{deaths_c429}}{\text{population}}`
     - 
   * - R
     - prevalence
     - 0
     - No initialization for recovered state
   * - R
     - excess mortality rate
     - 0
     - 
   * - R
     - disability weights
     - 0
     - 

.. list-table:: Transition Data
   :widths: 5 5 5 30 30
   :header-rows: 1

   * - Transition
     - Source state
     - Sink state
     - Value
     - Notes
   * - i_DCIS
     - S
     - DCIS
     - :math:`\frac{\text{prev_c429}\times\text{crude prevalence ratio of DCIS}}{\text{duration_DCIS}}`
     - prev_c429 comes from forecast data for 2020-2040
   * - i_LCIS
     - S
     - LCIS
     - :math:`\frac{\text{prev_c429}\times\text{crude prevalence ratio of LCIS}}{\text{duration_LCIS}}`
     - prev_c429 comes from forecast data for 2020-2040
   * - i_BC|DCIS
     - DCIS
     - BC
     - :math:`\frac{\text{incidence_c429}}{\text{prev_DCIS+prev_LCIS}}`
     - i_BC|DCIS = i_BC / prev_(DCIS+LCIS)
   * - i_BC|LCIS
     - LCIS
     - BC
     - :math:`\frac{\text{incidence_c429}}{\text{prev_DCIS+prev_LCIS}}`
     - i_BC|LCIS = i_BC / prev_(DCIS+LCIS)
   * - r_BC
     - BC
     - R
     - 0.1 per person-years regardless of age
     - No transition out of recovered state

.. list-table:: Data sources
   :widths: 30 30 30
   :header-rows: 1
   
   * - Measure
     - Sources
     - Notes
   * - prev_DCIS 
     - derived from DCIS prevalence ratio and prev_c429
     - see below for prevalence ratio calculation
   * - prev_LCIS
     - derived from LCIS prevalence ratio and prev_c429
     - see below for prevalence ratio calculation
   * - duration_DCIS
     - extracted from literature
     - temporarily use 3 years
   * - duration_LCIS
     - extracted from literature
     - temporarily use 5 years
   * - crude-prevalence ratio 
     - derived from external data
     - see below for prevalence ratio calculation
   * - prev_c429
     - como for 2017 and forecasted for future years 2020-2040
     - forcasted data filepath :download:`prev_c429 <filepaths_c429_forecast.xlsx>`
   * - deaths_c429
     - codcorrect for 2017 deaths
     - future deaths 2020-2040 need to be derived from forecasted csmr_c429 and population size
   * - csmr_c429
     - csmr forecasted for future years 2020-2040
     - forcasted data filepath :download:`csmr_c429 <filepaths_c429_forecast.xlsx>` 
   * - incidence_c429
     - como for 2017 and forecasted for future years 2020-2040
     - forcasted data filepath :download:`incidence_c429 <filepaths_c429_forecast.xlsx>` 
   * - Disability weights for breast cancer sequelae
     - YLD appendix
     - total breast cancer disability weight over all sequelae with ids s_277, s_5486, s_5489, s_279, s_280, s_5492
   * - remission_c429
     - GBD 2017
     - remission rate of breast cancer = 1 / duration of breast cancer = 1/10 per person-years for all ages 
   * - Population
     - demography for 2017 
     - mid-year population


**Crude prevalence ratios**

GBD does not give us any information on the prevalence or incidence of DCIS or LCIS. Hence we need to infer using data from another population, namely from MarketScan outpatient data from 2016 to 2017 in USA for age 15 plus. From MarketScane, we obtain the a non-age specific ratio of DCIS prevalence and breast cancer prevalence among those tested. Applying this ratio to the prevalence of breast cancer in our population gives us an estimate of the prevalence of DCIS or LCIS in our population. 

**DCIS**

   - Crude prevalence ratio of DCIS = :math:`\frac{\text{proportion of DCIS among those tested}}{\text{proportion of stage 1+ breast cancer among those tested}}` = 0.33 (SD=0.10)

   - Prevalence of DCIS 

      = Crude prevalence ratio of DCIS x prevalence of breast cancer (prev_c429)

**LCIS**

   - Crude prevalence ratio of LCIS = :math:`\frac{\text{proportion of LCIS among those tested}}{\text{proportion of stage 1+ breast cancer among those tested}}` = 0.07 (SD=0.06)

   - Prevalence of LCIS 

      = Crude prevalence of ratio of LCIS X prevalence of breast cancer (prev_c429)


.. note::

    - Currently we have applied non-age specific DCIS and LCIS prevalence ratios
      from marketscan to inform DCIS and LCIS prevalence in 2020-2040.
    - A major assumption of this method of using marketscan ratios is that the
      ratio of DCIS or LCIS to breast cancer in the US population is the same as
      that in the Chinese population we are modelling. This could be a limitation
      if breast cancer manifests differently among racial groups.
    - We believe that the crude prevalence ratio of DCIS and crude prevalence
      ratio of LCIS are independent, meaning no correlation between these two
      ratios.
    - The draw-level DCIS and LCIS prevalence ratios can be generated based on
      a truncated normal distirbution (lower bound = 0) with given mean and
      standard deviation. 
    - For those who are treated successfully, we assume they will stay in stage
      0 rather than remit back to susceptible.
    - We might overestimate the total number of deaths due to breast cancer.
      According to GBD definition, patients are considered cured if they have
      survived more than 10 years after the mastectomy. However, the excess
      mortality rate still exists in simulation and generates extra deaths if
      we plan to run the model over 10 years. The way we handle this problem is
      to send patients to a recovered state (R) with transition rate from bresat
      cancer to R calculated as 1 divided by duration of breast cancer (10 years).



Validation Criteria
+++++++++++++++++++

Fatal outcomes
 - Deaths
     - EMR_DCIS = EMR_LCIS = 0
     - ACMR = CSMR_BC + CSMR_other
 - YLLs
     - YLLs_DCIS = YLLs_LCIS = 0
     - YLLs_total = YLLs_BC + YLLs_other

Non-fatal outcomes
 - YLDs
     - YLDs_DCIS = YLDs_LCIS = YLDs_other = 0
     - YLDs_total = YLDs_BC
 - Prevalence
     - Crude prevalence ratio of DCIS = PREV_DCIS / PREV_BC = 0.33
     - Crude prevalence ratio of LCIS = PREV_LCIS / PREV_BC = 0.07
     - PREV_DCIS / PREV_LCIS = 4.7
 - Incidence
     - Crude prevalence ratio of DCIS = INCIDENCE_DCIS / INCIDENCE_BC = 0.33
     - Crude prevalence ratio of LCIS = DENCE_LCIS / INCIDENCE_BC = 0.07
     - INCIINCIDENCE_DCIS / INCIDENCE_LCIS = 4.7

.. todo::

   1. Compare forecast data in 2020 against GBD 2017 (2019) results.
   2. Compare prevalence, incidence, CSMR of breast cancer, and ACMR over year
      with GBD age-/sex- stratification that calculated from simulation baseline
      to forecast data.
   3. Check outcomes such as YLDs and YLLs in 2020 yield from simulation baseline
      against GBD 2017 (2019) all causes and breast cancer results.
   4. Compare prevalence ratio of DCIS or LCIS to breast cancer and incidence
      ratio of DCIS or LCIS to breast cancer yield from simulation baseline to
      ratios from marketscan and literature evidence in China.



References
----------

.. [GBD-2017-YLD-Capstone-Appendix-1-Breast-Cancer-0]
   Supplement to: `GBD 2017 Disease and Injury Incidence and Prevalence
   Collaborators. Global, regional, and national incidence, prevalence, and
   years lived with disability for 354 diseases and injuries for 195 countries
   and territories, 1990–2017: a systematic analysis for the Global Burden of
   Disease Study 2017. Lancet 2018; 392: 1789–858`
   (pp. 310-317)
