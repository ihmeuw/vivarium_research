.. _2017_cancer_model_multiple_myeloma:

=============
Multiple Myeloma
=============

Disease Overview
----------------

Multiple myeloma (MM) is a clonal plasma cell neoplasm with substantial morbidity and mortality, characterized by end organ damage—renal 
impairment, hypercalcemia, lytic bony lesions, and anemia. 
According to Global Burden of Multiple Myeloma [Cowan et al. 2018], in 2016 there were 138 509 (95% UI, 121 000-155 480) incident cases of MM, 
with an age-standardized incidence rate (ASIR) of 2.1 per 100 000 persons (95% UI, 1.8-2.3). Multiple myeloma was responsible for 98 437 (95% UI, 87 383-109 815) 
deaths globally with an age-standardized death rate (ASDR) of 1.5 per 100 000 persons (95% UI, 1.3-1.7). Multiple myeloma was responsible for 2.1 million (95% UI, 1.9-2.3 million) 
DALYs at the global level in 2016, with an age-standardized rate of 30.5 (95% UI, 27.4-33.9) DALYs per 100 000 person-years. From 1990 to 2016, MM incident cases 
increased by 126%, and deaths increased by 94%. Among SDI quintiles, the largest increase (192%) was seen in middle SDI countries (from 7974 [95% UI, 7233-8821] in 
1990 to 23 273 [95% UI, 21 136-26 947] in 2016). Of the 126% increase in incident cases at the global level, population growth contributed 40.4%, an aging world population contributed 
52.9%, and increases in age-specific incidence rates contributed 32.6%. Among the regions, the largest increase in incident cases from 1990 to 2016 was seen in East Asia 
(China, North Korea, and Taiwan), with a rise of 262% (from 4760 [95% UI, 4271-5575] in 1990 to 17 218 [95% UI, 14 482-19 093] in 2016). The largest contributor to this increase was a 
rise in age-specific incidence rates (contributing 157%), followed by an aging population (contributing 85%) and population growth (contributing 20%).

With the development of better therapies, myeloma has changed from an untreatable 
ailment to one that is still not curable but treatable with mostly outpatient therapy . 
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
