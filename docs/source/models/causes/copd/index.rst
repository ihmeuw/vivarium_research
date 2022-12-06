.. _2019_cause_copd:

=====================================
Chronic Obstructive Pulmonary Disease
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
  * - COPD
    - Chronic obstructive pulmonary disease
    - 
  * - HF
    - Heart failure
    - 

Disease Overview
----------------

Chronic obstructive pulmonary disease (COPD) is a chronic inflammatory lung disease that causes obstructed airflow from the lungs due to one or more of the following: 1) the airways and air sacs of the lungs have lost their elastic quality; 2) the walls between a large number of air sacs in the lungs have been destroyed; 3) the walls of the airways have become thick and inflamed; and 4) the airways have become clogged due to overproduction of mucus. 

Symptoms include breathing difficulty, cough, mucus (sputum) production and wheezing. COPD is typically caused by long-term exposure to irritating gases or particulate matter, most often from cigarette smoke. People with COPD are at increased risk of developing heart disease, lung cancer and a variety of other conditions. 

Emphysema and chronic bronchitis are the two most common conditions that contribute to COPD. These two conditions usually occur together and can vary in severity among individuals with COPD. 

Chronic bronchitis is inflammation of the lining of the bronchial tubes, which carry air to and from the air sacs (alveoli) of the lungs. It's characterized by daily cough and mucus (sputum) production. 

Emphysema is a condition in which the alveoli at the end of the smallest air passages (bronchioles) of the lungs are destroyed as a result of damaging exposure to cigarette smoke and other irritating gases and particulate matter. 

Although COPD is a progressive disease that gets worse over time, it is treatable. With proper management, most people with COPD can achieve good symptom control and quality of life, as well as reduced risk of other associated conditions. 
[Mayo-Clinic]_

GBD 2019 Modeling Strategy
--------------------------

GBD 2019 Non-Fatal Modeling Strategy
++++++++++++++++++++++++++++++++++++

COPD is defined as in the Global Initiative for Chronic Obstructive Lung Disease (GOLD) classification: a measurement of <0.7 :math:`\text{FEV}_1`/FVC (one second of forceful exhalation/total forced expiration) on spirometry after bronchodilation. The severity grading of COPD follows this GOLD class definition:

.. list-table:: GOLD class definitions
   :widths: 10 10
   :header-rows: 1

   * - GOLD CLASS
     - :math:`\text{FEV}_1\text{Score}`
   * - I: Mild
     - >=80% of normal
   * - II: Moderate
     - 50-79% of normal
   * - IV: Severe
     - <50% of normal

The estimation of COPD burden has two distinct steps. In the first step, prevalence and incidence of overall COPD is estimated using DisMod. In the second, we estimate the proportion of COPD severities using GOLD class groupings in DisMod. The proportions are then used to split the overall estimates into sequelae. 

.. list-table:: Description of Health States and Disability Weights
   :widths: 10 25 10
   :header-rows: 1

   * - Health state
     - Lay description
     - DW (95% CI)
   * - Mild COPD
     - This person has cough and shortness of breath after heavy physical activity, but is able to walk long distances and climb stairs. 
     - 0.019 (0.011–0.033) 
   * - Moderate COPD
     - This person has cough, wheezing, and shortness of breath, even after light physical activity. The person feels tired and can walk only short distances or climb only a few stairs. 
     - 0.225 (0.153–0.31)
   * - Severe COPD
     - This person has cough, wheezing, and shortness of breath all the time. The person has great difficulty walking even short distances or climbing any stairs, feels tired when at rest, and is anxious. 
     - 0.408 (0.273–0.556)

[GBD-2019-Capstone-Appendix-COPD]_

GBD 2019 Fatal Modeling Strategy
++++++++++++++++++++++++++++++++++++

Vital registration and surveillance data were included in a standard CODEm modeling approach to generate estimates of cause-specific mortality from COPD. 

[GBD-2019-Capstone-Appendix-COPD]_

Cause Hierarchy
+++++++++++++++

.. image:: cause_hierarchy_copd.svg

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
     - 0.1
     - [28 days, 364 days), age_group_id=4
   * - YLL age group end
     - 125
     - [95, 125 years), age_group_id=235
   * - YLD age group start
     - 0.1
     - [28 days, 364 days), age_group_id=4
   * - YLD age group end
     - 125
     - [95, 125 years), age_group_id=235

Vivarium Modeling Strategy
--------------------------

Scope
+++++

COPD should occur at the cause-level incidence. COPD is chronic state without remission. Cause-specific mortality should occur at the EMR rate for COPD from the overall COPD model. The transition rate from the susceptible state to the prevalent state should be modified by tobacco exposure; this relationship is described in the overall concept model document. 

Assumptions and Limitations
+++++++++++++++++++++++++++

Cause Model Diagram
+++++++++++++++++++

.. image:: cause_model_copd.svg

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
     - **S**\usceptible to COPD
     - Simulant that has not been diagnosed with COPD
   * - C
     - **C**\OPD
     - Simulant with prevalent COPD

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
     - cause-specific mortality (CSMR)
     - :math:`\frac{\text{deaths_c509}}{\text{population}}`
     - Post CoDCorrect cause-level CSMR
   * - S
     - prevalence
     - :math:`1-\text{prevalence_c509}`
     - 
   * - C
     - prevalence
     - :math:`\sum\limits_{s \in sequelae} \text{prevalence}_s`
     - 
   * - S
     - excess mortality
     - 0
     -
   * - C
     - excess mortality
     - emr_m24543
     - 
   * - S
     - disability weight
     - 0
     -
   * - C
     - disability weight
     - :math:`\frac{1}{\text{prevalence_c509}} \times \sum\limits_{s \in sequelae} \text{disability_weight}_s \times \text{prevalence}_s`
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
     - C
     - incidence_c509
     - This is cause-level incidence which is equivalent to the "population rate"

Data Sources
""""""""""""

.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Measure
     - Sources
     - Description
     - Notes
   * - prevalence_c509
     - como
     - Prevalence of COPD
     - 
   * - deaths_c509
     - codcorrect
     - Deaths from COPD
     - 
   * - incidence_c509
     - como
     - Incidence of COPD
     - This is the population incidence rate for COPD
   * - population
     - demography
     - Mid-year population for given age/sex/year/location
     - 
   * - sequelae_c509
     - gbd_mapping
     - List of sequelae for COPD
     - 
   * - prevalence_s{`sid`}
     - como
     - Prevalence of sequela with id *sid*
     - 
   * - disability_weight_s{`sid`}
     - YLD appendix
     - Disability weight of sequela with id *sid*
     - 
   * - emr_m24543
     - dismod-mr 2.1
     - Excess mortality rate of COPD
     - 
   * - sequelae
     - sequelae definition
     - {s929, s421, s422, s983, s5774, s980, s981, s982}
     - Includes HF due to severe COPD sequelae

Validation Criteria
+++++++++++++++++++

The prevalence and cause-specific mortality estimates should be compared with those from GBD 2019.

References
----------

.. [Mayo-Clinic] COPD. Mayo Clinic, Mayo Foundation for Medical Education and Research, 15 Apr 2020.
	Retrieved 25 March 2021.
	https://www.mayoclinic.org/diseases-conditions/copd/symptoms-causes/syc-20353679.

.. [GBD-2019-Capstone-Appendix-COPD]
  Appendix_ to: `GBD 2019 Diseases and Injuries Collaborators. Global burden of 369 diseases and injuries in 204 countries and territories, 1990–2019: a systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 17 Oct 2020;396:1204-1222` 

.. _Appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30925-9/attachment/deb36c39-0e91-4057-9594-cc60654cf57f/mmc1.pdf