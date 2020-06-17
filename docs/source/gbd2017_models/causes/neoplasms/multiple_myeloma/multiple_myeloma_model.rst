.. _2017_cancer_model_multiple_myeloma:

=============
Multiple Myeloma
=============

Disease Overview
----------------

.. todo::

   Add definition of multiple myeloma. 

GBD 2017 Modeling Strategy
--------------------------

Multiple myeloma in GBD 2017
++++++++++++++++++++++++++

The GBD modelling strategy can be found in the GBD YLD Capstone Appendix [GBD-2017-YLD-Capstone-Appendix-1-Multiple-Myeloma]_.

.. todo:: fill incidence and prevalence information of GBD 2017

Cause Hierarchy
++++++++++++++++

.. todo:: fill in hierarchy figure 



Restrictions
++++++++++++

.. todo:: get restrictions from GBD mapping 

Vivarium Modeling Strategy
--------------------------

Scope
+++++

.. todo::

   Add scope.

Model Assumptions and Limitations
+++++++++++++++++++++++++++++++++


.. todo::

   Add assumptions and limitations.


Cause Model Diagram
+++++++++++++++++++


.. todo:: fill in transition figure 


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
     - 
   * - I
     - Infected
     - 


.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - S
     - prevalence
     - 
     - 
   * - S
     - excess mortality rate
     - 
     - 
   * - S
     - disabilty weights
     - 
     -
   * - I
     - prevalence
     - 
     - 
   * - I
     - excess mortality rate
     - 
     - 
   * - I
     - disability weights
     - 
     - 
   * - ALL
     - cause specific mortality rate
     - 
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
     - 
     - 


.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Measure
     - Sources
     - Description
     - Notes
   * - 
     - 
     - 
     - 
   * - 
     - 
     - 
     - 
   * - 
     - 
     - 
     - 
   * - 
     - 
     - 
     - 
   * - 
     - 
     - 
     - 
   * - 
     - 
     - 
     - 


Validation Criteria
+++++++++++++++++++

.. todo::

   Describe tests for model validation.


References
----------

.. [GBD-2017-YLD-Capstone-Appendix-1-Multiple-Myeloma]
   Supplement to: `GBD 2017 Disease and Injury Incidence and Prevalence
   Collaborators. Global, regional, and national incidence, prevalence, and
   years lived with disability for 354 diseases and injuries for 195 countries
   and territories, 1990–2017: a systematic analysis for the Global Burden of
   Disease Study 2017. Lancet 2018; 392: 1789–858`
   (pp. 310-317)
