.. _intervention_crm_mgmt_outreach:

Vivarium Modeling Strategy - Outreach Intervention 
**************************************************

Overview
++++++++

Adherence to SBP and LDL-C lowering therapies would increase through patient outreach. Methods for outreach include 
regular phone calls between provider and patient, a mobile app with reminders and guidance, or a patient support clinic.

Today, few patients receive this support and adherence to medications is often low. This intervention will assess the 
impact of an outreach intervention on risk factors and CVD. 


Eligibility and Initiation
++++++++++++++++++++++++++

- SBP >=130 mmHg and/or LDL-c >= 1.8 mmol/L 
- Enrollment in the intervention only happens during interactions with healthcare, as shown :ref:`here <us_cvd_concept_model>`


Affected Outcomes
+++++++++++++++++

.. note::
  There is data by age strata in this paper if adherence was separated in the future 


This intervention affects primary adherence to medications, which in turn will affect the simulants exposure to SBP and LDL-C. 


.. list-table:: Affected Outcome #1 Effect Size
  :widths: 15 15 15 
  :header-rows: 1

  * - OR for Primary Adherence
    - Source 
    - Notes
  * - 2.16 
    - [Derose-2013]_ 
    - 


This odds ratio will effectivly halve the number of simulants that are primary non-adherent. All simulants that 
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



**Source information:**

Kaiser patients, when prescribed statin as a new medication within the past 1 year, receive automated phone calls and letters starting 1-2 weeks after prescribing, which encourages them to fill the prescription (primary adherence). Receiving this intervention increases fill and initiation of statin from 26% to 42% of patients. OR for intervention vs control was 2.16 (1.91-2.43). Effectively, patients were twice as likely to initiate medication during the first 30 days if intervention was delivered.  
[Derose-2013]_


A trial by [Becker-2005]_ had similar results but did not report an effect on adherence. 