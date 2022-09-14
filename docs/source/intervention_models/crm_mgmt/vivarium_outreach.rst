.. _intervention_crm_mgmt_outreach:

=====================
Outreach Intervention
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

Primary adherence to SBP and LDL-C lowering therapies would increase through patient outreach. Methods for outreach include 
regular phone calls between provider and patient, a mobile app with reminders and guidance, or a patient support clinic.

Today, few patients receive this support and adherence to medications is often low. This intervention will assess the 
impact of an outreach intervention on risk factors and CVD. 


.. list-table:: Affected Outcome #1 Effect Size
  :widths: 15 15 15 
  :header-rows: 1

  * - OR for Primary Adherence
    - Source 
    - Notes
  * - 2.16 
    - [Derose-2013]_ 
    - 


Baseline Coverage Data
++++++++++++++++++++++++

Assume there is no coverage today. 


Vivarium Modeling Strategy
--------------------------

Eligibility and Initiation
++++++++++++++++++++++++++

- SBP >=130 mmHg and/or LDL-c >= 1.8 mmol/L 
- Enrollment in the intervention only happens during interactions with healthcare, as shown :ref:`here <us_cvd_concept_model>`


Affected Outcomes
+++++++++++++++++

.. note::
  There is data by age strata in this paper if adherence was separated in the future 


This intervention affects primary adherence to medications, which in turn will affect the simulants exposure to SBP and LDL-C. 


This odds ratio above will approximately halve the number of simulants that are primary non-adherent. All simulants that 
are no longer primary non-adherent, are assumed to be adherent. This means that the new adherence rates for simulants 
with the intervention are: 

**LDL-C Treatments**

.. list-table:: Adherence Score Values 
  :widths: 10 10 10 
  :header-rows: 1

  * - Category
    - Percent of Simulants 
    - Notes
  * - Primary Non-adherence
    - 13.37%
    - [Cheen_2019]_ [Derose-2013]_
  * - Secondary Non-adherence
    - 9.75%
    - 
  * - Adherent
    - 76.88%
    - Medicare Part D Data


**Blood Pressure Treatments**

.. list-table:: Adherence Score Values 
  :widths: 10 10 10 
  :header-rows: 1

  * - Category
    - Percent of Simulants 
    - Notes
  * - Primary Non-adherence
    - 8.1%
    - [Cheen_2019]_ [Derose-2013]_
  * - Secondary Non-adherence
    - 10.08%
    - 
  * - Adherent
    - 81.82%
    - Medicare Part D Data


Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- We assume that all those simulants who become primary adherent are then adherent to the medication moving forward. This is likely to overestimate the effect of the results. 

- Currently the same probability of being adherent is used for all simulants. In future iterations, we will try to separate this by age, sex, race, or other simulant characteristics. 


Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Intervention coverage among the eligible population should verify to the scenario-specific level
- Intervention coverage should be zero among the non-eligible populations
- SBP or LDL-C effects stratified by intervention coverage should reflect the intervention effect size

References
------------

.. [Derose-2013] Derose, Stephen F., et al. "Automated outreach to increase primary adherence to cholesterol-lowering medications." JAMA internal medicine 173.1 (2013): 38-43.
  https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/1399850
