.. _2017_cancer_model_bladder_cancer:

==============
Bladder Cancer
==============

Disease Overview
----------------

.. todo::

   Add definition of bladder cancer. In particular, find data about global prevalence and disease fatal and non fatal description.


GBD 2017 Modeling Strategy
--------------------------

Bladder cancer in GBD 2017
++++++++++++++++++++++++++

The GBD modelling strategy can be found in the GBD YLD Capstone Appendix [GBD-2017-YLD-Capstone-Appendix-1-Bladder-Cancer]_.


Incidence is estimated directly from mortality using mortality to incidence ratios (MIR).

Because of long-term disability associated with cystectomy, prevalence for bladder cancer is estimated beyond ten years. To estimate the disability, 
total prevalence for bladder cancer is split into

#. Diagnosis and primary therapy
#. Controlled phase

   #. Controlled phase of bladder cancer, with incontinence
   #. Controlled phase of bladder cancer, without incontinence
#. Metastatic phase
#. Terminal phase
#. Incontinence from bladder cancer, beyond 10 years

.. todo::

   Add more details about GBD modelling strategy of bladder cancer.

Cause Hierarchy
++++++++++++++++

.. image:: bladder_cancer_hierarchy.svg


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

Within GBD 2017 data, the remission rate is not available which makes it difficult to transition through the states.  So, due to data limitations we are simplifying the model.
 
Note: This simpliflication might over estimate the number of deaths. See Model Assumptions and Limitations section for more information.

.. image:: cancer_cause_model.svg


State and Transition Data Tables
++++++++++++++++++++++++++++++++

.. todo::

   Add state and transitions data tables.


Validation Criteria
+++++++++++++++++++

.. todo::

   Describe tests for model validation.


References
----------

.. [GBD-2017-YLD-Capstone-Appendix-1-Bladder-Cancer]
   Supplement to: `GBD 2017 Disease and Injury Incidence and Prevalence
   Collaborators. Global, regional, and national incidence, prevalence, and
   years lived with disability for 354 diseases and injuries for 195 countries
   and territories, 1990–2017: a systematic analysis for the Global Burden of
   Disease Study 2017. Lancet 2018; 392: 1789–858`
   (pp. 310-317)
