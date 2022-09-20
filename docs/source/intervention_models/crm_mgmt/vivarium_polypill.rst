.. _intervention_crm_mgmt_polypill:


=====================
Polypill Intervention
=====================

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - SBP
    - Systolic Blood Pressure
    - 
  * - LDL-C
    - Low-Density Lipoprotein Cholesterol
    - 
  * - CVD
    - Cardiovascular Disease 
    - 


Intervention Overview
---------------------

The polypill intervention combines multiple medications that would have been taken separately 
into one prescription and a single pill. For this research, the polypill with include: 
atorvastatin (10 mg), amlodipine (2.5 mg), losartan (25 mg), and hydrochlorothiazide (12.5 mg). 
All of these are hypertension medications, although there are trials that combine hypertension 
medications and statins. 

Today, few patients receive this option and adherence to medications is often low. This 
intervention will assess the impact of a polypill on SBP and CVD. 

Please note that as the polypill only includes hypertension medications, LDL-C adherence will
NOT be affected. 


.. list-table:: Affected Outcome #1 Effect Size
  :widths: 15 15 15 
  :header-rows: 1

  * - OR for  Adherence
    - Source 
    - Notes
  * - 1.33 
    - [Thom-2013]_ 
    - 


Baseline Coverage Data
++++++++++++++++++++++++

Assume there is no coverage today. 


Vivarium Modeling Strategy
--------------------------

Eligibility and Initiation
++++++++++++++++++++++++++

- SBP >=130 mmHg 
- Simulant has 2 or more hypertension drugs (e.g., simulant is in treatment category "two drugs at half dose" or above on the treatment ladder)
- Enrollment in the intervention only happens during interactions with healthcare, as shown :ref:`here <us_cvd_concept_model>`


Affected Outcomes
+++++++++++++++++

This intervention affects overall adherence to hypertension medications, which in turn will affect the 
simulants exposure to SBP. Adherence for LDL-C medications does not change. 

The 1.33 odds ratio listed above will decrease the number of simulants that are  non-adherent compared to 
those who are not receiving the intervention. The the new adherence rates for simulants with the intervention are: 


**Blood Pressure Treatments**

.. list-table:: Adherence Score Values 
  :widths: 10 10 10 
  :header-rows: 1

  * - Category
    - Percent of Simulants 
    - Notes
  * - Primary Non-adherence
    - 16%
    - [Cheen_2019]_ 
  * - Secondary Non-adherence
    - 4.9%
    - 
  * - Adherent
    - 79.1%
    - Medicare Part D Data [Thom-2013]_


Please note that the intervention works on the overall level of adherence (% adherent in the table above). 
The percents for primary and secondary nonadherence are now arbitrary.  

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Currently the same probability of being adherent is used for all simulants. In future iterations, we will try to separate this by age, sex, race, or other simulant characteristics. 


Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Intervention coverage among the eligible population should verify to the scenario-specific level
- Intervention coverage should be zero among the non-eligible populations
- SBP effects stratified by intervention coverage should reflect the intervention effect size

References
------------

[Thom-2013]_ 

[Munoz-NEJM]_ 
