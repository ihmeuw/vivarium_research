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
resulting disability and mortality of these categories of cancers [GBD-2017-YLD-Capstone-Appendix-1-Neoplasms]_.

Prevalence for all these cancers are estimated for a maximum of ten years. To estimate the disability, total prevalence for each cancer is split into
1. Diagnosis and primary therapy
2. Controlled phase
3. Metastatic phase
4. Terminal phase

Incidence is estimated directly from mortality using mortality to incidence ratios (MIR).

Cause Hierarchy
++++++++++++++++

.. todo::

   Add hierarchy diagram.


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
-------------------

According to GBD 2017, cancer cases are considered cured if the patient survives more than 10 years. But, there is no data available for remission rate 
which makes it difficult to transition through the states. So, due to data limitations we are simplifying the model.
 
Note: This simpliflication might over estimate the number of deaths. 

.. image:: cancer_cause_model.svg


State and Transition Data Tables
--------------------------------


.. todo::

   Add state and transitions  data tables.


Model Assumptions and Limitations
---------------------------------

.. todo::

   Add model assumptions and limitations.

Validation Criteria
-------------------

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
