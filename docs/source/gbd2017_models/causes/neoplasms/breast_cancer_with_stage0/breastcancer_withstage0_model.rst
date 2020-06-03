.. _2017_cancer_model_breast_cancer_with_stage_0:

==========================
Breast Cancer with stage 0
==========================

Disease Overview
----------------

.. todo::

   Add definition of each cancer. In particular, find data about global prevalence and disease fatal and non fatal description.


GBD 2017 Modeling Strategy
--------------------------

Breast cancer in GBD 2017
++++++++++++++++++++++++++

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
++++++++++++++++++++++++++++++++++++++++++++++++

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
++++++++++++

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


Scope
+++++

.. todo::

   Add scope.

Model Assumptions and Limitations
+++++++++++++++++++++++++++++++++

1. Within GBD 2017, after diagnosis/ treatment if a patient survives more than 10 years, they are considered cured for calculating disability. 
For simulation models, this means that if the simulation is run for more than 10 years, then excess mortality rate exists due to cancer after 
10 years and the number of deaths increase. But as per GBD 2017, after 10 years, the patients do not have excess mortality rate. So, this model 
might over estimate deaths in that scenario.


.. todo::

   Add more assumptions and limitations.


Compartmental Diagram
+++++++++++++++++++++

:underline:`Compartmental model`

  .. image:: compartmental_model_simple.svg


State and Transition Data Tables
++++++++++++++++++++++++++++++++

+----------------------------------------------------------------------------+
| State definitions                                                         |
+=======================+================+===================================+ 
| State                 | State name     | Definition                        |
+-----------------------+----------------+-----------------------------------+
| S                     | Susceptible    | Susceptible to DCIS or LCIS       |
+-----------------------+----------------+-----------------------------------+
| DCIS                  | with condition | with condition DCIS               |
+-----------------------+----------------+-----------------------------------+
| LCIS                  | with condition | with condition LCIS               |
+-----------------------+----------------+-----------------------------------+
| BC                    | with condition | with condition breast cancer      |
+-----------------------+----------------+-----------------------------------+


.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Sources
     - Value
     - Notes
   * - S
     - prevalence
     - derived
     - 1- prev(DCIS+ LCIS+ BC)
     -
   * - S
     - excess mortality rate
     - 0
     - 
     -
     -
   * - S
     - disabilty weights
     - 0
     -
     -
   * - I
     - prevalence
     - prevalence_c429
     - 
     -
   * - I
     - excess mortality rate
     - :math:`\frac{\text{deaths_c429}}{\text{population} \times \text{prevalence_c429}}`
     - 
   * - I
     - disability weights
     - :math:`\displaystyle{\sum_{s\in \text{sequelae_c429}}} \scriptstyle{\text{disability_weight}_s \,\times\, \text{prevalence}_s}`
     - total disability weight over all sequelae with ids s_277, s_5486, s_5489, s_279, s_280, s_5492
   * - ALL
     - cause specific mortality rate
     - :math:`\frac{\text{deaths_c429}}{\text{population}}`
     - 


.. list-table:: Transition Data
   :widths: 10 10 10 30 30
   :header-rows: 1
   
   * - Transition
     - Source 
     - Sink 
     - Value
     - Notes
   * - i
     - S
     - I
     - :math:`\frac{\text{incidence_rate_c429}}{\text{1 - prevalence_c429}}`
     - Incidence rate in total population is divided by 1-prevalence_c429 to get incidence rate among the susceptible population.


.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Measure
     - Sources
     - Description
     - Notes
   * - prevalence_c429
     - como
     - Prevalence of cause breast cancer
     - 
   * - deaths_c429
     - codcorrect
     - Deaths from breast cancer
     - 
   * - population
     - demography
     - Mid-year population for given country
     - 
   * - incidence_rate_c429
     - como
     - Incidence rate for breast cancer
     - 
   * - disability_weight_s{`sid`}
     - YLD appendix
     - Disability weights associated with each sequelae
     - 
   * - prevalence_s{`sid`}
     - como
     - Prevalence of each sequelae
     - 



Validation Criteria
+++++++++++++++++++

.. todo::

   Describe tests for model validation.


References
----------

.. [GBD-2017-YLD-Capstone-Appendix-1-Breast-Cancer]
   Supplement to: `GBD 2017 Disease and Injury Incidence and Prevalence
   Collaborators. Global, regional, and national incidence, prevalence, and
   years lived with disability for 354 diseases and injuries for 195 countries
   and territories, 1990–2017: a systematic analysis for the Global Burden of
   Disease Study 2017. Lancet 2018; 392: 1789–858`
   (pp. 310-317)
