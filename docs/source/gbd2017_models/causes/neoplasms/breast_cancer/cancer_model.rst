.. _2017_cancer_model_breast_cancer:

=============
Breast Cancer
=============

Disease Overview
----------------

.. todo::

   Add definition of each cancer. In particular, find data about global prevalence and disease fatal and non fatal description.


GBD 2017 Modeling Strategy
--------------------------

Breast cancer in GBD 2017
++++++++++++++++++++++++++

The GBD modelling strategy can be found in the GBD YLD Capstone Appendix [GBD-2017-YLD-Capstone-Appendix-1-Breast-Cancer]_.


Incidence is estimated directly from mortality using mortality to incidence ratios (MIR).

Because of long-term disability associated with mastectomy, prevalence for breast cancer is estimated beyond ten years. To estimate the disability, 
total prevalence for breast cancer is split into

#. Diagnosis and primary therapy
#. Controlled phase

   #. Controlled phase of breast cancer, with mastectomy
   #. Controlled phase of breast cancer, without mastectomy
#. Metastatic phase
#. Terminal phase


.. todo::

   Add more details about GBD modelling strategy of Breast cancer.

Cause Hierarchy
++++++++++++++++

.. image:: breast_cancer_hierarchy.svg


Restrictions
++++++++++++

.. todo::

   Add restrictions table.


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


Cause Model Diagram
-------------------

Within GBD 2017 data, the remission rate is not available which makes it difficult to transition through the states. So, due to data limitations we are simplifying the model.
 
Note: This simpliflication might over estimate the number of deaths. See Model Assumptions and Limitations section for more information. 

.. image:: cancer_cause_model.svg


State and Transition Data Tables
--------------------------------

.. list-table:: Definitions
   :widths: 15 20 30
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - Susceptible
     - Susceptible to breast cancer
   * - I
     - Infected
     - Infected with breast cancer


.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - S
     - prevalence
     - 1-prevalence_c429
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
     - prevalence_c429
     - 
   * - I
     - excess mortality rate
     - :math:`\frac{\text{deaths_c429}}{\text{population} \times \text{prevalence_c429}}`
     - 
   * - I
     - disability weights
     - :math:`\displaystyle{\sum_{s\in \text{sequelae_c429}}} \scriptstyle{\text{disability_weight}_s \,\times\, \text{prevalence}_s}`
     - average disability weight over all sequelae with ids s_277, s_5486, s_5489, s_279, s_280, s_5492
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
     - Incidence rate in total population is divided by 1-prevalence_c429 to get incidence rate among the recovered and susceptible population.


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
-------------------

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
