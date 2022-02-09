.. _intervention_crm_mgmt:

==================================================
Cardiometabolic Risk Management Intervention Model
==================================================

This model includes behavioral and pharmaceutical interventions aimed at: 1) improving blood pressure and LDL-cholesterol control via increased adherence to prescribed medication; 2) increasing exercise; 3) decreasing BMI/weight; 4) improving control of fasting plasma glucose; 5) decreasing tobacco use. 

Altering an individual's risk factor exposures is expect to improve outcomes for many cardiometabolic conditions, including coronary artery disease and ischemic stroke.

This model requires a simulant to have attributes of: age, sex, SBP, LDL-C, BMI, FPG, cigarette smoking.

It adds attributes of: untreated SBP, untreated LDL-C, untreated BMI, untreated FPG, untreated smoking, polypill prescription, hypertension prescription ramp position, prescription for lipid-lowering therapies, lifestyle modification, education status, medication outreach status, adherence propensity, adherence status, last measured SBP, last measured LDL-C, follow-up, visit propensity, LDL-C prescription initiation propensity, SBP prescription initiation propensity, polypill initiation propensity.

*[group types of variables]*

This document contains an overview of the interventions and the simulation design; for specifics, please see the sections linked in the table of contents below.

.. list-table:: Definitions of terms and abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Term or Abbreviation
    - Definition
    - Note
  * - BMI
    - Body Mass Index
    - Risk Factor
  * - FPG
    - Fasting Plasma Glucose
    - Risk Factor
  * - HbA1c
    - Hemoglobin A1c
    - Measures blood glucose control over the last 2-3 months
  * - LDL-C
    - Low Density Lipoprotein Cholesterol
    - Risk Factor
  * - SBP
    - Systolic blood pressure
    - Risk Factor
  * - DBP
    - Diastolic blood pressure
    - Risk Factor; not currently modeled as part of GBD, but used clinically to define hypertension
  * - Stage 1 hypertension
    - SBP 130-139 OR DBP 80-89
    - American Heart Association/American College of Cardiology guidelines
  * - Stage 2 hypertension
    - SBP 140 or higher OR DBP 90 or higher
    - American Heart Association/American College of Cardiology guidelines
  * - PDC
    - Percent days covered
    - :math:`\frac{Number\ of\ days\ in\ period\ medication\ taken}{Number\ of\ days\ in\ period}`


.. list-table:: Affected Outcomes
  :widths: 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note (ex: is this relationship direct or mediated?)
  * - SBP
    - additive shift
    - yes
    - there is a “ramp” of increasing intensity of treatments
  * - LDL-C
    - multiplicative shift
    - yes
    - options include not on treatment, low-intensity statin, high-intensity statin;
  * - BMI
    - multiplicative (% BMI lost)
    - yes
    - [[need more detail on this effect; how to handle mediation]]
  * - FPG
    - additive
    - yes
    - 
  * - Tobacco
    - ?
    - yes
    - 
  * - Adherence
    - 
    - 
    - which interventions affect this



Intervention Overview
-----------------------

The interventions included in this model include
  
  1) Outreach
  2) Polypill (fixed dose combination)
  3) Lifestyle modification  


The outreach intervetion is intended to increase adherence to antihypertensives and lipid-lowering therapies to treat elevated SBP and/or LDL-C. The polypill intervention is also intended to increase adherence, in this case to antihypertensive medication, by replacing multiple individual medications with a single fixed-dose combination pill containing multiple classes of antihypertensive medication. For both of these interventions, simulants are considered adherent to their prescribed medication(s) if their PDC value for the timestep is 80% or greater.

The lifestyle modification intervention is aimed at lowering FPG/HbA1c values and reducing BMI. This is accomplished via enrollment into a structured diet and exercise program consisting of
    1) A CDC-approved curriculum with lessons, handouts, and other resources to help you make healthy changes.
    2) A lifestyle coach, specially trained to lead the program, to help you learn new skills, encourage you to set and meet goals, and keep you motivated. The coach will also facilitate discussions and help make the program fun and engaging.
    3) A support group of people with similar goals and challenges. Together, you can share ideas, celebrate successes, and work to overcome obstacles. In some programs, the participants stay in touch with each other during the week. It may be easier to make changes when you’re working as a group than doing it on your own. [https://www.cdc.gov/diabetes/prevention/lcp-details.html]_
 
.. toctree::
   :maxdepth: 1

   scenarios

.. todo::

  Add to the following table to include known outcomes affected by the intervention, which are **not** in the simulation model, as it is important to recognize potential unmodeled effects of the intervention and note them as limitations as applicable.

Baseline Coverage Data
--------------------------

Baseline coverage of treatments for LDL-C and SBP are substantial and expected to vary by age, sex, and time.  To initialize simulants, researchers will fit a multinomial regression to NHANES data to use as a prediction of the probability of each treatment for a simulant with a known age, sex, and measured LDL-C and SBP level. [[Should this also predict which simulants are non-adherent to treatment?]] 

This initialization scheme will also allow initialization of "untreated LDL-C" and "untreated SBP" attributes, which refer to what a simulants risk exposure would be, if they were not receiving treatment. Individuals who are initialized to be receive treatment will also need to be initialized to have a follow-up visit date somehow.

Baseline coverage of polypill, medication outreach, and lifestyle modification education are all low, and we will assume that they are 0%. (This means that we will can initialize the untreated BMI, FPG, and smoking risk exposures to be equal to the actual BMI, FPG, and smoking exposures.)

Parameter tables and additional information can be found in the initialization document.


.. toctree::
   :maxdepth: 1

   initialization
   

Vivarium Modeling Strategy
--------------------------
The purpose of this simulation is to assess the impact of three interventions on cardiometabolic outcomes. The three interventions are: outreach, and polypill, and lifestyle. [Additional detail useful here?]

Detailed information for each intervention can be found in the three sections linked below.

.. toctree::
   :maxdepth: 1

   vivarium_outreach
   vivarium_polypill
   vivarium_lifestyle

.. list-table:: Modeled Outcomes
  :widths: 15 15 15 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Outcome type
    - Outcome ID
    - Affected measure
    - Effect size measure
    - Effect size
    - Note
  * - SBP
    - Risk exposure
    - 107
    - Measure of SBP
    - absolute decrease
    - Dependent on drug class and dosage; given in parameter table in initialization document
    - 
  * - LDL-c
    - Risk exposure
    - 367
    - Measure of LDL-c
    - absolute decrease
    - Dependent on drug class and dosage; given in parameter table in initialization document
    - 
  * - BMI
    - Risk exposure
    - 108
    - Measure of BMI
    - absolute decrease
    - Dependent on adherence to lifestyle intervention
    - 
  * - FPG
    - Risk exposure
    - 105
    - measure of FPG
    - absolute decrease
    - Dependent on adherence to lifestyle intervention
    - 
  * - Tobacco
    - Risk exposure
    - 98
    - absolute decrease; cessation
    - Dependent on adherence to lifestyle intervention
    - 
    - 

Affected Outcomes
--------------------------

.. toctree::
   :maxdepth: 1

   affected_outcomes


Assumptions and Limitations
---------------------------

Validation and Verification Criteria
------------------------------------

References
--------------------------
