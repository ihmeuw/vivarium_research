.. _2017_cancer_model_multiple_myeloma:

=============
Multiple Myeloma
=============

Disease Overview
----------------

Multiple myeloma (MM) is a clonal plasma cell neoplasm with substantial morbidity and mortality, characterized by end organ damage—renal 
impairment, hypercalcemia, lytic bony lesions, and anemia. With the development of better therapies, myeloma has changed from an untreatable 
ailment to one that is still not curable but treatable with mostly outpatient therapy [Cowan et al. 2018]. 

Although several new treatment options for multiple
myeloma are now available, there is no cure for this disease.
Additionally, despite therapeutic advances, relapse is an inevitable feature of multiple myeloma, resulting in a continued need for new active treatments.
The combination of pomalidomide and low-dose dexamethasone is an approved and established option for the treatment of relapsed and refractory myeloma in
patients who have received at least two previous therapies. A randomised, multicentre, open-label, phase 3 study [Attal et al. 2019]
was taken to compare isatuximab plus pomalidomide and dexamethasone 
with pomalidomide and dexamethasone in patients with relapsed and refractory multiple myeloma. Result shows that the addition of isatuximab to pomalidomide and dexamethasone was associated with a significant and
clinically meaningful benefit in progression-free survival in heavily treated patients with relapsed and refractory multiple myeloma with results from both the investigators
and an independent response committee being consistent.

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

..[Attal et al. 2019]
   Attal M, Richardson PG, Rajkumar SV, et al. Isatuximab plus pomalidomide and low-dose 
   dexamethasone versus pomalidomide and low-dose dexamethasone in patients with relapsed 
   and refractory multiple myeloma (ICARIA-MM): a randomised, multicentre, open-label, phase 
   3 study. Lancet 2019; 394: 2096–107.

..[Cowan et al. 2018]
   Cowan AJ, Allen C, Barac A, et al. Global Burden of Multiple Myeloma: A Systematic 
   Analysis for the Global Burden of Disease Study 2016. JAMA Oncol 2018; 4: 1221–7.

..[GBD-2017-YLD-Capstone-Appendix-1-Multiple-Myeloma]
   Supplement to: `GBD 2017 Disease and Injury Incidence and Prevalence
   Collaborators. Global, regional, and national incidence, prevalence, and
   years lived with disability for 354 diseases and injuries for 195 countries
   and territories, 1990–2017: a systematic analysis for the Global Burden of
   Disease Study 2017. Lancet 2018; 392: 1789–858`
   (pp. 310-317)
