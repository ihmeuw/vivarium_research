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
into one prescription and a single pill. For this research, the polypill will include: 
atorvastatin (10 mg), amlodipine (2.5 mg), losartan (25 mg), and hydrochlorothiazide (12.5 mg). 
All of these are hypertension medications, although there are trials that combine hypertension 
medications and statins. 

Today, few patients receive this option and adherence to medications is often low. This 
intervention will assess the impact of a polypill on SBP and CVD. 

Please note that as the polypill only includes hypertension medications, LDL-C adherence will
NOT be affected. For those assigned to the polypill, adherence will be redrawn to have the 
different percentages listed below. In addition, the polypill will place simulants on more medications 
which have higher efficacy. 


.. list-table:: Affected Outcome #1 Effect Size
  :widths: 15 15 15 
  :header-rows: 1

  * - OR for Adherence
    - Source 
    - Notes
  * - 1.33 
    - [Thom-2013]_ 
    - 

In addition, simulants on the polypill intervention will be assigned to either 
three drugs at half dose or three drugs at standard dose. This will "skip" steps 
on the treatment ladder for many simulants, causing higher benefit faster. 

Baseline Coverage Data
++++++++++++++++++++++++

Assume there is no coverage today. 


Vivarium Modeling Strategy
--------------------------

Eligibility and Initiation
++++++++++++++++++++++++++

- SBP >=140 mmHg OR SBP >= 130 and a history of myocardial infarction or stroke [Webster_2018]_
- Enrollment in the intervention only happens during interactions with healthcare, as shown :ref:`here <us_cvd_concept_model>`


Affected Outcomes
+++++++++++++++++

This intervention affects overall adherence to hypertension medications, which in turn will affect the 
simulants exposure to SBP. Adherence for LDL-C medications does not change. 

The 1.33 odds ratio listed above will decrease the number of simulants that are non-adherent compared to 
those who are not receiving the intervention. The the new adherence rates for simulants with the intervention are: 

In addition, the intervention will affect the treatment that simulants are assigned. 
All simulants will be assigned to either three drugs at half dose or three drugs at 
standard dose. 

**Blood Pressure Adherence**

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

**Blood Pressure Treatment Assignment**

Any simulant on 'three drugs at half dose' or lower on the ladder will be 
assigned to 'three drugs at half dose' when they are put on the polypill intervention. 
Those who were on 'three drugs at half dose' will continue on the same regimen. 
Use the efficacy normally assigned for this regimen. 

Any simulant at 'three drugs at standard dose' on the ladder will continue 
with the regimen they have while on the polypill intervention. 

Simulants on the polypill intervention can move up the ladder to three 
drugs at standard dose based on the usual treatment ramp shown :ref:`here <us_cvd_concept_model>`. 

Starting polypill as three drugs at half dose was decided based on `British Formulary <https://vnras.com/wp-content/uploads/2020/03/BNF-78-1.pdf>`_ which is the source of dosing used in our SBP 
treatment effect component (e.g., matches the other parts of this model). 

The polypill includes: 
- Amlodipine where the standard dose is 5 mg. Our polypill uses half standard dose or 2.5 mg. 
- Losartan where the standard dose is 50 mg. Our polypill uses half standard dose or 25 mg. 
- Hydrochlorothiazide is not used in isolation in the UK but is simialr to chlorthalidone in action and dosing, which has a standard dose of 25 mg. Our polypill uses half standard dose so that would map to 12.5 mg. 
- [Munoz-NEJM]_ includes atorvastatin as well which we would be ignoring. This limitation was noting and discussed with Greg. 


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

.. [Webster_2018] Webster, Ruth, Abdul Salam, H. Asita de Silva, Vanessa Selak, Sandrine Stepien, Senaka Rajapakse, Stanley Amarasekara, et al. 2018. “Fixed Low-Dose Triple Combination Antihypertensive Medication vs Usual Care for Blood Pressure Control in Patients With Mild to Moderate Hypertension in Sri Lanka: A Randomized Clinical Trial.” JAMA 320 (6): 566–79. 
  https://doi.org/10.1001/jama.2018.10359.
