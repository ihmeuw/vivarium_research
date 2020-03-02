.. _2017_cancer_model_cancers:

=======
Cancers
=======

This is a common document for the cancers that are modelled similarly in GBD. This document currently has information related to the following cancers:

- Tracheal, bronchus and lung cancer 
- Cervical cancer 
- Stomach Cancer
- Kidney cancer 
- Gallbladder and biliary tract cancer 
- Esophageal cancer 
- Pancreatic cancer 
- Thyroid cancer 
- Non-hodgkin lymphoma 
- Multiple myeloma 
- Other pharynx cancer 
- Nasopharynx cancer 
- Lip and oral cavity cancer 
- Ovarian cancer
- Uterine cancer

Any of the other cancers that have similar modelling strategy can be added to this list.


Disease Overview
----------------

.. todo::

   Add individual definitions of each cancer. In particular, find data about global prevalence and disease fatal and non fatal description.


GBD 2017 Modeling Strategy
--------------------------

Cancers in GBD 2017
+++++++++++++++++++

GBD 2017 uses similar modeling strategies to estimate the prevalence and
resulting disability of these categories of cancers [GBD-2017-YLD-Capstone-Appendix-1-Neoplasms]_.

Incidence is estimated directly from mortality using mortality to incidence ratios (MIR).

Prevalence for all these cancers are estimated for a maximum of ten years. To estimate the disability, total prevalence 
for each cancer is split into

1. Diagnosis and primary therapy
2. Controlled phase
3. Metastatic phase
4. Terminal phase

.. todo::

   Add more details about cancer modelingin GBD 2017.


Cause Hierarchy
++++++++++++++++

.. image:: cancers_hierarchy.svg


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

Assumptions and Limitations
+++++++++++++++++++++++++++

.. todo::

   Add assumptions and limitations.


Cause Model Diagram
+++++++++++++++++++

Within GBD 2017 data, the remission rate is not available which makes it difficult to transition through the states. 
So, due to data limitations we are simplifying the model.
 
Note: This simpliflication might over estimate the number of deaths. 

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
     - Susceptible to cancer
   * - I
     - Infected
     - Infected with cancer



.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - S
     - prevalence
     - 1 -- prevalence_c{id}
     - {id} = c_411, c_414, c_426, c_432, c_435, c_444, c_447, c_450, c_453, c_456, c_465, c_471, c_480, c_485, c_486
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
     - prevalence_c{id}
     - 
   * - I
     - excess mortality rate
     - :math:`\frac{\text{deaths_c{id}}}{\text{population} \times \text{prevalence_c{id}}}`
     - 
   * - I
     - disability weights
     - :math:`\displaystyle{\sum_{s\in \text{sequelae_c{id}}}} \scriptstyle{\text{disability_weight}_s \,\times\, \text{prevalence}_s}`
     - average disability weight over all sequelae.


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
     - :math:`\frac{\text{incidence_rate_c{id}}}{\text{1 - prevalence_c{id}}}`
     - Incidence rate in total population is divided by 1-prevalence to get incidence rate among the susceptible population.


.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Measure
     - Sources
     - Description
     - Notes
   * - prevalence_c{id}
     - como
     - Prevalence of cancer
     - 
   * - deaths_c{id}
     - codcorrect
     - Deaths from cancer
     - 
   * - population
     - demography
     - Mid-year population for given country
     - 
   * - incidence_rate_c{id}
     - como
     - Incidence rate for cancer
     - 
   * - disability_weight_s{`sid`}
     - YLD appendix
     - Disability weights associated with each sequelae
     - 
   * - prevalence_s{`sid`}
     - como
     - Prevalence of each sequelae
     - 



Model Assumptions and Limitations
+++++++++++++++++++++++++++++++++

.. todo::

   Add model assumptions and limitations.

Validation Criteria
+++++++++++++++++++

.. todo::

   Describe tests for model validation.


References
----------

.. [GBD-2017-YLD-Capstone-Appendix-1-Neoplasms]
   Supplement to: `GBD 2017 Disease and Injury Incidence and Prevalence
   Collaborators. Global, regional, and national incidence, prevalence, and
   years lived with disability for 354 diseases and injuries for 195 countries
   and territories, 1990–2017: a systematic analysis for the Global Burden of
   Disease Study 2017. Lancet 2018; 392: 1789–858`
   (pp. 310-317)
