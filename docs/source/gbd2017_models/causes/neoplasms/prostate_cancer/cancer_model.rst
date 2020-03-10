.. _2017_cancer_model_prostate_cancer:

===============
Prostate Cancer
===============

Disease Overview
----------------

.. todo::

   Add definition of prostate cancer. In particular, find data about global prevalence and disease fatal and non fatal description.


GBD 2017 Modeling Strategy
--------------------------

Prostate cancer in GBD 2017
+++++++++++++++++++++++++++

The GBD modelling strategy can be found in the GBD YLD Capstone Appendix [GBD-2017-YLD-Capstone-Appendix-1-Prostate-Cancer]_.

Incidence is estimated directly from mortality using mortality to incidence ratios (MIR).

Because of long-term disability associated with prostatectomy, prevalence for prostate cancer is estimated beyond ten years. To estimate the disability, 
total prevalence for prostate cancer is split into

#. Diagnosis and primary therapy
#. Controlled phase

   #. Controlled phase of prostate cancer, with impotence
   #. Controlled phase of prostate cancer, with incontinence
   #. Controlled phase of prostate cancer, without impotence or incontinence
#. Metastatic phase
#. Terminal phase
#. Impotence and Incontinence after 10-year survival from prostate cancer

   #. Impotence from prostate cancer, beyond 10 years
   #. Incontincence from prostate cancer, beyond 10 years

.. todo::

   Add more details about GBD modelling strategy of Prostate cancer.

Cause Hierarchy
+++++++++++++++

.. image:: prostate_cancer_hierarchy.svg


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
+++++++++++++++++++

Within GBD 2017 data, the remission rate is not available which makes it difficult to transition through the states. So, due to data limitations we are simplifying the model.

Note: This simpliflication might over estimate the number of deaths. See Model Assumptions and Limitations section for more information.


.. image:: cancer_cause_model.svg


State and Transition Data Tables
++++++++++++++++++++++++++++++++


.. list-table:: Definitions
   :widths: 15 20 30
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - Susceptible
     - Susceptible to prostate cancer
   * - I
     - Infected
     - Infected with prostate cancer


.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - S
     - prevalence
     - 1-prevalence_c438
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
     - prevalence_c438
     - 
   * - I
     - excess mortality rate
     - :math:`\frac{\text{deaths_c438}}{\text{population} \times \text{prevalence_c438}}`
     - 
   * - I
     - disability weights
     - :math:`\displaystyle{\sum_{s\in \text{sequelae_c438}}} \scriptstyle{\text{disability_weight}_s \,\times\, \text{prevalence}_s}`
     - total disability weight over all sequelae with ids s_290, s_5495, s_5498, s_5501, s_292, s_293, s_5504, s_5507
   * - ALL
     - cause specific mortality rate
     - :math:`\frac{\text{deaths_c438}}{\text{population}}`
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
     - :math:`\frac{\text{incidence_rate_c438}}{\text{1 - prevalence_c438}}`
     - Incidence rate in total population is divided by 1-prevalence_c438 to get incidence rate among the susceptible population.


.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Measure
     - Sources
     - Description
     - Notes
   * - prevalence_c438
     - como
     - Prevalence of cause prostate cancer
     - 
   * - deaths_c438
     - codcorrect
     - Deaths from prostate cancer
     - 
   * - population
     - demography
     - Mid-year population for given country
     - 
   * - incidence_rate_c438
     - como
     - Incidence rate for prostate cancer
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

.. [GBD-2017-YLD-Capstone-Appendix-1-Prostate-Cancer]
   Supplement to: `GBD 2017 Disease and Injury Incidence and Prevalence
   Collaborators. Global, regional, and national incidence, prevalence, and
   years lived with disability for 354 diseases and injuries for 195 countries
   and territories, 1990–2017: a systematic analysis for the Global Burden of
   Disease Study 2017. Lancet 2018; 392: 1789–858`
   (pp. 310-317)
