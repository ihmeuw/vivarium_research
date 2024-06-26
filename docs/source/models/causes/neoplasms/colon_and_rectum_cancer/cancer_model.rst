.. _2017_cancer_model_colon_and_rectum_cancer:

=======================
Colon and Rectum Cancer
=======================

.. contents::
  :local:

Disease Overview
++++++++++++++++

Colon and Rectum Cancer (CRC) usually develops from an early stage precancerous 
polyps, this has allowed for screening and detection of benign tumors before they 
become invasive. Early screening for CRC has reduced the incidence and mortality 
of colon and rectum cancer. In GBD 2019 summary, there were 2.17 million (95% UI 
2.00–2.34) incident cases and 1.09 million (1.00–1.15) deaths, due to colon and 
rectum cancer globally. Several risk factors are associated with an increased 
risk for developing CRC. Some of them are modifable and modeled in GBD, such as 
diet, high-BMI, and alcohol use. Other risk factors are non-modifable, such as 
family history of CRC or personal history of adenoma polyps. For more information 
of CRC development and advances in screening, please read `this article <https://pubmed.ncbi.nlm.nih.gov/27486317/>`_

.. list-table:: Malignant neoplasm of colon and rectum cancer 
   :widths: 10 10
   :header-rows: 1

   * - ICD 10
     - ICD 9
   * - C18-C19.0, C20, C21-C21.8, Z12.1-Z12.13 (Z*=screening)
     - 153-154.9, V76.41, V76.5-V76.52 (V*=screening)


GBD 2017 Modeling Strategy
++++++++++++++++++++++++++

See [GBD-2017-CoD-Appendix]_ and [GBD-2017-YLD-Appendix]_ for GBD 2017 fatal 
and non-fatal modeling methods.


Cause Hierarchy
------------------------------------------
       
.. image:: colon_and_rectum_cancer_cause_hierarchy.svg


Restrictions
------------

The following table describes any restrictions on the effects of this cause 
(such as being only fatal or only nonfatal), as well as restrictions on the 
age and sex of simulants to which different aspects of the cause model applies.

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
++++++++++++++++++++++++++

Scope
-----
The Vivarium cause model is designed to include both preclinical 
screening-detecable (asymptomatic) state of colorectal cancer and clinical 
(symptomatic) state of colorectal cancer. This design intends to allow for 
colorectal cancer diagnosis through symptomatic presentation. This model will 
use GBD forecasts of cancer incidence, prevalence, and cause-specific mortality 
from 2020 to 2040 as disease input.

Assumptions and Limitations
---------------------------
1. To avoid overestimate deaths due to colorectal cancer after 10 years stay in 
   clinical state, we will model a "recovered" state and use 10 years for 
   duration of remission from clinical colorectal cancer to its recovery.
2. We might consider exlude sequalae `stoma from colon and rectum cancer beyond 
   ten years` when calculating YLDs contributable to colon and rectum cancer.
3. We assume that GBD forecasted incidence of colorectal cancer corresponds to 
   the incidence of preclinical colorectal cancer rather than clinical colorectal 
   cancer. The incidence of clinical colorectal cancer will lag behind forecasted 
   incidence by a interval of mean sojourn time (MST).
4. The precancerous state `Adenoma` will not be modeled in Vivarium due to lack 
   of transitional rates for regression, persistence, and progression. 
   Alternatively, we will model it as a risk factor for colorectal cancer.


Compartmental Diagram
+++++++++++++++++++++

  .. image:: colon_and_rectum_cancer_cause_model_diagram.svg


State and Transition Data Tables
++++++++++++++++++++++++++++++++

.. list-table:: State Definitions
   :widths: 5 10 20
   :header-rows: 1
   
   * - State
     - State name
     - Definition
   * - S
     - Susceptible 
     - Healthy OR with asymptomatic condition, but not screen-detectable
   * - PC
     - Pre-clinical screen-detectable colon and rectum cancer
     - with asymptomatic condition and screen-detectable
   * - C
     - Clinical colon and rectum cancer
     - With symptomatic condition
   * - R
     - Recovered
     - Recovered from clinical colon and rectum cancer, not susceptible

.. list-table:: State Data
   :widths: 5 5 20 20
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - S
     - prevalence
     - (1 - prev_PC - prev_C - prev_R)
     - 
   * - S
     - excess mortality rate
     - 0
     - 
   * - S
     - disabilty weights
     - 0
     - 
   * - PC
     - prevalence
     - :math:`\frac{\text{i_PC} \times MST}{1 - \text{prev_c441}}`
     - We scale the prevalence of PC state by (1 - prev_c441) to account for zero 
       prev_C at initialization. Formula used to calculate `i_PC` is specified 
       in `Transition Data` table.
   * - PC
     - excess mortality rate
     - 0
     - 
   * - PC
     - disabilty weights
     - 0
     - 
   * - C
     - prevalence
     - 0
     - Assume zero clinical cases for insured population at initialization 
   * - C
     - excess mortality rate
     - :math:`\frac{\text{csmr_c441}}{\text{prev_c441}}`
     - 
   * - C
     - disabilty weights
     - :math:`\frac{\displaystyle{\sum_{s\in\text{s_c441}}}\scriptstyle{\text{disability_weight}_s\,\times\,\text{prev}_s}}{\displaystyle{\sum_{s\in\text{s_c441}}}\scriptstyle{\text{prev}_s}}`
     - weighted average of colon and rectum cancer disability weight over all 
       sequelae including ids s_296, s_298, s_299, s_5519, s_5522, s_5525
   * - R
     - prevalence
     - 0
     - No initialization in R state
   * - R
     - excess mortality rate
     - 0
     - 
   * - R
     - disabilty weights
     - 0
     - 

.. list-table:: Transition Data
   :widths: 5 5 5 20 20
   :header-rows: 1

   * - Transition
     - Source state
     - Sink state
     - Value
     - Notes
   * - i_pc
     - S
     - PC
     - :math:`\frac{\text{incidence_c441(age + MST)}}{1-\text{prev_c441}}`
     - incidence of PC state among susceptible population
   * - i_c
     - PC
     - C
     - 1 / MST
     - 
   * - r
     - C
     - R
     - 0.1 per person-year for all ages and sexes
     - 

.. list-table:: Data sources
   :widths: 5 20 20
   :header-rows: 1
   
   * - Measure
     - Sources
     - Notes
   * - prev_c441
     - forecasted for future years 2020-2040
     - forcasted data filepath: /ihme/csu/swiss_re/forecast/441_prevalence_12_29_ng_smooth_13.csv
   * - incidence_c441
     - forecasted for future years 2020-2040
     - forcasted data filepath: /ihme/csu/swiss_re/forecast/441_incidence_12_29_ng_smooth_13.csv
   * - csmr_c441
     - forecasted for future years 2020-2040
     - forcasted data filepath: /ihme/csu/swiss_re/forecast/441_deaths_12_29_ng_smooth_13.csv
   * - remission_c441
     - GBD 2017
     - remission rate of cervical cancer = 0.1 per person-years for all ages 
       and sexes 
   * - Disability weights for colon and rectum cancer
     - [GBD-2017-YLD-Appendix]_
     - weighted average of colon and rectum cancer disability weight over all 
       sequelae with ids s_296, s_298, s_299, s_5519, s_5522, s_5525
   * - ACMR
     - forecasted for future years 2020-2040 
     - forcasted data filepath: /ihme/csu/swiss_re/forecast/294_deaths_12_29_ng_smooth_13.csv
   * - Population
     - demography for 2017 
     - mid-year population
   * - MST
     - 4.5-5.8 years (Brenner et al.)
     - Let's use **5 years** as age-standardized value.


Validation Criteria
+++++++++++++++++++

Fatal outcomes
 - Deaths
     - EMR_PC = 0
     - ACMR = CSMR_c441 + CSMR_other
 - YLLs
     - YLLs_PC = 0
     - YLLs_total = YLLs_c441 + YLLs_other

Non-fatal outcomes
 - YLDs
     - YLDs_PC = YLDs_other = 0
     - YLDs_total = YLDs_c441

.. todo::

   1. Compare forecast data in 2020 against GBD 2019 results.
   2. Compare prevalence, incidence, CSMR of colon and rectum cancer, and ACMR 
      over year with GBD age-/sex- stratification that calculated from simulation baseline to forecast data.
   3. Check outcomes such as YLDs and YLLs in 2020 yield from simulation baseline
      against GBD 2019 all causes and colon and rectum cancer results.


References
++++++++++

.. [GBD-2017-YLD-Appendix]
   Supplement to: GBD 2017 Disease and Injury Incidence and Prevalence
   Collaborators. Global, regional, and national incidence, prevalence, and
   years lived with disability for 354 diseases and injuries for 195 countries
   and territories, 1990–2017: a systematic analysis for the Global Burden of
   Disease Study 2017. Lancet 2018; 392: 1789–858 (pp. 310-317)
.. [GBD-2017-CoD-Appendix]
   Supplement to: GBD 2017 Causes of Death Collaborators. Global, regional, and 
   national age-sex-specific mortality for 282 causes of death in 195 countries 
   and territories, 1980–2017: a systematic analysis for the Global Burden of 
   Disease Study 2017. Lancet 2018; 392: 1736–88. (pp. 180-186)
