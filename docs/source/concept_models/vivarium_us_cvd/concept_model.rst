.. _us_cvd_concept_model:
..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  +++++++++++++++++++++
  
  Section Level 2 (#.#)
  ---------------------

  Section Level 3 (#.#.#)
  ~~~~~~~~~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

====================================================
Vivarium - US Health Disparities - CVD Interventions
====================================================

.. contents::
  :local:

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


.. _uscvd1.0:

1.0 Background
++++++++++++++
We have shown that geographic disparities in cardiovascular disease (CVD) are large and have persisted over 
the past 40 years. For example, the age-standardized death rate due to ischemic heart disease in Oklahoma 
remains more than twice that of Minnesota (144 vs. 63 per 100,000). Alarmingly, many states have seen no 
further decline in CVD since 2010 and the gap in CVD between states has not improved. 

In a projection of CVD risk factors and mortality, we found that over 2 million premature deaths would 
be prevented with expanded control of risk factors. Our research also estimated that in the U.S., the 
absolute risk of premature CVD death would be reduced more than 4% if major risk factor targets are 
achieved by 2025. 

These results indicate that reducing risk factors would be very impactful in reducing CVD, however due to the 
geographic disparities, these national results have limited usefulness. A subnational evaluation of the impact 
of population-level evidence-based interventions is an important goal. 

The NIH has recognized the importance of studying health disparities, as required by the Minority Health and 
Health Disparities Research and Education Act. In its strategic plan, NHLBI has encouraged the investigation 
of “strategies that effectively address these differences,” asking the question “how can cardiometabolic risk 
be managed to improve health trajectories in specific populations?” 

We distinguish between two areas of research needed to understand population-level CVD trajectories: 
a) population health projections and b) health policy models. Population health projections are the result 
of a particular set of assumptions on future health trends. Health policy models are a subtype of projection 
that project future changes in health due to interventions after the efficacy of the intervention is 
established. Previous health policy models developed with NIH support operate only for only a single 
geographic region (usually the United States), and consider only a limited set of risks and outcomes.  

.. _uscvd2.0:

2.0 Modeling Aims and Objectives
++++++++++++++++++++++++++++++++

**Objective:** Model the effect of three different interventions on the development of cardiometabolic burden 
in the United States, contingent on each state’s current population characteristics, patterns of CVD risk, 
health care access, level of effective medication delivery, and differential effects of risk factor 
interventions by subgroups. 

- Intervetions are aimed at: 1) improving blood pressure and LDL-cholesterol control, 2) increasing exercise, 3) decreasing BMI/weight, and 4) improving control of fasting plasma glucose 
- Initial efforts will focus on the 50 US states and Washington DC  
- Comparisons will be with the GBD results of incidence, prevalence, and mortality for various causes and risks associated with CVD  

.. _uscvd3.0:

3.0 Concept Model
+++++++++++++++++


**Ideal Concept Model**

.. image:: concept_model_v2.svg


**Minimum Viable Model**

.. image:: concept_model_v3.svg


.. _uscvd3.1:

3.1 Simulation Scenarios
------------------------

#. **Baseline**  
#. **Medical Outreach 50% Coverage**  
#. **Medical Outreach 100% Coverage**
#. **Polypill 50% Coverage**  
#. **Polypill 100% Coverage**
#. **Lifestyle Modification 50% Coverage**
#. **Lifestyle Modification 100% Coverage**

**Baseline** is assumed to have no one enrolled in any intervention. 

**Medical Outreach 50% Coverage** assumes 50% of eligible simulants are enrolled in the outreach intervention. Scales 
linearly over 1 year such that there is 0% coverage at baseline and 50% at year 1. Remain at 50% coverage for 
the remainder of the simulation. 

**Medical Outreach 100% Coverage** assumes all eligible simulants are enrolled in the intervention. Scales 
linearly over 1 year such that there is 0% coverage at baseline and 100% at year 1. 

**Polypill 50% Coverage** assumes 50% of eligible simulants receive the polypill intervention. Scales 
linearly over 1 year such that there is 0% coverage at baseline and 50% at year 1. Remain at 50% coverage for 
the remainder of the simulation. 

**Polypill 100% Coverage** assumes all eligible simulants receive the polypill intervention. Scales 
linearly over 1 year such that there is 0% coverage at baseline and 100% at year 1.

**Lifestyle Modification 50% Coverage** assumes 50% of eligible simulants are enrolled in the lifestyle modification 
intervention. Scales linearly over 1 year such that there is 0% coverage at baseline and 50% at year 1. Remain at 50% 
coverage for the remainder of the simulation. 

**Lifestyle Modification 100% Coverage** assumes all eligible simulants are enrolled in the lifestyle modeification 
intervention. Scales linearly over 1 year such that there is 0% coverage at baseline and 100% at year 1. 

.. _uscvd3.2:

3.2 Simulation Timeframe and Intervention Start Dates
-----------------------------------------------------

.. list-table:: Developmental model CVD simulation timeframe and intervention dates
  :header-rows: 1

  * - Parameter
    - Value
  * - Date of simulation burn-in period start
    - January 1, 2021
  * - Date of simulation observation period start
    - January 1, 2023
  * - Date of intervention scale-up start
    - January 1, 2024
  * - Date of simulation end
    - December 31, 2040
  * - Simulation time step
    - 28 days
  * - Intervention scale-up rate
    - Linear scale-up over 1 year

.. _uscvd4.0:

4.0 Vivarium Modeling Components
++++++++++++++++++++++++++++++++

.. _uscvd4.1:

4.1 Vivarium Concept Model Diagram Components 
---------------------------------------------

.. _4.1.1:

4.1.1 Cause Models
~~~~~~~~~~~~~~~~~~
* :ref:`Hypertensive Heart Disease <2019_cause_hhd>`
* :ref:`Ischemic Heart Disease <2019_cause_ihd>`
* :ref:`Ischemic Stroke <2019_cause_Ischemic_Stroke>`
* :ref:`Intracerebral Hemorrhage <2019_cause_ich>`
* :ref:`Subarachnoid Hemorrhage <2019_cause_sah>`
* :ref:`Diabetes Mellitus <2019_cause_diabetes>`
* :ref:`Peripheral Arterial Disease <2019_cause_pad>`
* :ref:`Aortic Aneurysm <2019_cause_Aortic_Aneurysm>`
* :ref:`Atrial Fibrillation and Flutter <2019_cause_afib>`
* :ref:`Heart Failure <2019_cause_Heart_Failure>`
* :ref:`Chronic Obstructive Pulmonary Disease <2019_cause_copd>`

.. todo::
  CKD does not currently exist in 2019 models, need to investigate and/or create 

.. _4.1.2:

4.1.2 Risk Exposure Models
~~~~~~~~~~~~~~~~~~~~~~~~~~
* :ref:`Systolic Blood Pressure <2019_risk_sbp>`
* :ref:`High LDL Cholesterol <2019_risk_exposure_ldl>`
* :ref:`Body Mass Index <2019_risk_bmi>`
* :ref:`Fasting Plasma Glucose <2019_risk_exposure_fpg>`

.. todo::
  Decide on inclusion of tobacco and create as needed  

.. _4.1.3:

4.1.3 Risk Effects Models
~~~~~~~~~~~~~~~~~~~~~~~~~~
* :ref:`Systolic Blood Pressure <2019_risk_effect_sbp>`
* :ref:`High LDL Cholesterol <2019_risk_effect_ldl>`

.. todo::
  Create risk effect models for BMI and FPG 

.. _4.1.4:

4.1.4 Intervention Models
~~~~~~~~~~~~~~~~~~~~~~~~~
.. note::
  Main intervention page will be deleted once information is transferred to individual pages 
  :ref:`Carbiometabolic Risk Management <intervention_crm_mgmt>`

Individual intervention pages: 

* :ref:`Outreach Intervention <intervention_crm_mgmt_outreach>`
* :ref:`Polypill Intervention <intervention_crm_mgmt_polypill>`
* :ref:`Lifestyle Modification Intervention <intervention_crm_mgmt_lifestyle>`

.. _4.1.5:

4.1.5 Other Models
~~~~~~~~~~~~~~~~~~
.. note::
  These are out of date and **should not be used** 

  * :ref:`Health Care Visit Types <intervention_crm_mgmt_visit>`
  * :ref:`Affected Outcomes <intervention_crm_mgmt_affected_outcomes>`
  * :ref:`Initialization <intervention_crm_mgmt_initialization>`


.. _uscvd4.2:

4.2 Demographics 
----------------

.. _uscvd4.2.1:

4.2.1 Population Description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Throughout model development and verification/validation:**

.. list-table:: CVD simulation model development population parameters
   :header-rows: 1

   * - Parameter
     - Value
     - Note
   * - Population size
     - 50,000
     - per draw 
   * - Number of draws
     - 10
     - 
   * - Cohort type
     - Closed
     - 
   * - Age start
     - 7 years
     - Minimum age at initialization was chosen to have youngest simulants be 25 at the end. Ages 7-25 will be modeled but not observed. 
   * - Age end
     - 125 years
     - Maximum age at initialization
   * - Sex restrictions
     - None 
     - 


**Final Model Run:**

.. list-table:: CVD simulation model population parameters
   :header-rows: 1

   * - Parameter
     - Value
     - Note
   * - Population size
     - TBD
     - per draw
   * - Number of draws
     - TBD
     - 
   * - Cohort type
     - Closed
     - 
   * - Age start
     - 7 years
     - Minimum age at initialization was chosen to have youngest simulants be 25 at the end. Ages 7-25 will be modeled but not observed. 
   * - Age end
     - 125 years
     - Maximum age at initialization
   * - Sex restrictions
     - None 
     - 

.. _uscvd4.2.2:

4.2.2 Location description
~~~~~~~~~~~~~~~~~~~~~~~~~~

**Locations**: All 50 US states and District of Columbia


.. _uscvd4.3:

4.3 Healthcare System Modeling
------------------------------

Within this model, simulants move through the healthcare system. The initialization parameters for screening visits 
are listed separately. Below are diagrams for how blood pressure and LDL-C measurement and medication are handled. 
Regardless of visit type (screening, follow-up, or emergency), simulants will move through the same pathway for both 
conditions at each visit. 

First, it is determined if the simulant will have a healthcare interaction in that time step. 

.. list-table:: Visit Interactions per Time Step 
  :widths: 3 15 15
  :header-rows: 1

  * - Visit Type 
    - Assignment to Visit  
    - Notes
  * - No Visit 
    - Default assignment   
    - 
  * - Screening 
    - If simulant does not have a follow-up scheduled or an emergency visit, use: outpatient_visits=HealthcareEntity (name='outpatient_visits', kind='healthcare_entity', gbd_id=me_id(19797), utilization=me_id(19797),). If a patient has a follow-up or emergency appointment, they will not have a screening appointment. 
    - Outpatient utilization envelope from GBD; will want to update to use NHANES data in future. This modelable entity only works for 2017, GBD round 5 
  * - Follow-up 
    - Scheduled at time of medication prescription or emergency event. If an emergency visit occurs, simulant will not have a follow-up appointment during that time step, even if one was previously scheduled. 
    - Scheduling of follow-up is pulled from uniform distribution ranging between 3 and 6 months. 
  * - Emergency 
    - If simulant has an acute event during this time step, 100% will have an emergency visit 
    - Acute events are ischemic stroke or acute myocardial infarction 

**Scheduling Appointments** 
The only appointment type that can be scheduled is a follow-up. A simulant can have a maximum of 1 follow-up 
scheduled at any time. If they have a follow-up previously scheduled and would be assigned a new follow-up 
after a screening or emergency visit, ignore the new assignment. The original follow-up scheduled will remain. 

If a simulant misses an appointment, they are assumed to be 'lost to follow-up' and will not have future 
appointments until they have a screening or emergency visit. 

If a simulant misses an appointment, they cannot have a screening appointment in that time step. 

If a simulant leaves a visit in the "no change" state but previously had a follow-up scheduled, they will 
keep that follow-up appointment. 

**Missing Appointments** 
For follow-up appointments only, a simulant has a probability of missing their appointment. For emergency 
visits, it is assumed the patient seeks medical care. For screening visits, the chance to not attend 
is covered by the probability of a visit. 

The probability of missing a follow-up appointment is 8.68% for all simulants. [Hwang_2015]_ 


**SBP Treatment Ramp**

.. image:: sbp_ramp_all.svg

.. list-table:: SBP Treatment Inputs
  :widths: 3 15 15
  :header-rows: 1

  * - ID
    - Decision Information 
    - Notes
  * - A
    - SBP measurement error pulled from a normal distribution with mean=0 and SD=2.9 mm Hg
    - [Wallace_2011]_
  * - B
    - 41.76% will not start medication due to theraputic inertia. The others will start on one drug at half dose. 
    - [Ali_2021]_ [Liu_2017]_
  * - C
    - 41.76% will not start medication. Of those that start medication: 45% will receive two drugs at half dose and 55% will receive one drug at half dose  
    - [Byrd_2011]_ [Ali_2021]_ [Liu_2017]_
  * - D
    - Only adherent simulants will move up categories. 41.76% will not change medication due to theraputic inertia. The remainder will move to the next treatment category on the ladder. If a simulant is in the highest category, there will be no change.  
    - [Ali_2021]_ [Liu_2017]_
  * - E (outreach intervention scenarios)
    - If simulant is eligible, either 50% or 100% enrolled depending on scenario  
    - For 50% scenario, assignment is random 
  * - F (polypill intervention scenarios)
    - If simulant is prescribed two drugs at half dose or higher on SBP ladder and is eligible, either 50% or 100% are enrolled depending on scenario  
    - For 50% scenario, assignment is random 


**LDL-C Treatment Ramp**

.. image:: ldl_ramp_all.svg

.. list-table:: LDL-C Treatment Inputs
  :widths: 3 15 15
  :header-rows: 1

  * - ID
    - Decision Information 
    - Notes
  * - A
    - ASCVD = -19.5 + (0.043 * SBP) + (0.266 * Age) + (2.32 * Sex) where Sex=1 for males and Sex=0 for females 
    - 
  * - B
    - LDL-C measreument error pulled from a normal distribution with mean=0 and SD=0.08 mmol/L    
    - [McCormack_2020]_
  * - C
    - If simulant is in the acute or post MI or stroke states 
    - 
  * - D
    - 19.4% will not start medication. Of those that start medication, 42% will receive high intensity statin; 52% medium intensity; and 6% low intensity 
    - [Morales_2018]_ [Arnett_2019]_ [Nguyen_2015]_
  * - E
    - 19.4% will not start medication. Of those that start medication, 24% will receive high intensity statin; 66% medium intensity; and 10% low intensity 
    - [Morales_2018]_ [Arnett_2019]_ [Nguyen_2015]_
  * - F
    - 19.4% will not start medication. Of those that start medication, 15% will receive high intensity statin; 71% medium intensity; and 14% low intensity 
    - [Morales_2018]_ [Arnett_2019]_ [Nguyen_2015]_
  * - G
    - Only adherent simulants will move up categories. 19.4% will not move up medication categories due to theraputic inertia 
    - [Morales_2018]_ 
  * - H
    - If simulant is eligible, either 50% or 100% depending on scenario  
    - For 50% scenario, assignment is random 



.. _uscvd4.4:

4.4 Treatment Assignment and Effect Modeling
--------------------------------------------

Adherence
~~~~~~~~~

Adherence is a widely recognized issue both in the US and globally [Sabate_2003]_. Non-adherence to medication 
costs the US an estimated $170 billion annually in healthcare expenses, and is a major cause of negative 
patient outcomes [Fischer_2010]_. This can be especially pronounced in chronic conditions, such as hypertension and hyperlipidemia. 

In our modeling, we categorize adherence into dichotomous outcomes, where adherent simulants receive the full 
benefit of their medication and non-adherent simulants receive no benefit. The selection of an 80% cutoff matches 
current literature standards, and has been validated for both hypertension and hyperlipidemia [Baumgartner_2018]_. 

Adherence is categorized into three buckets: 

#. Primary nonadherent - simulant never fills their prescription 
#. Secondary nonadherent - simulant fills prescription for medication but has a percent of days covered (PDC) less than 0.8 
#. Adherent - simulant has a PDC greater than or equal to 0.8 

If a simulant is primary or secondary nonadherent, their adherence score in the model is 0. If they are 
adherent, their adherence score is 1. 

A simulant's adherence score **does NOT change** during the simulation and will be assigned at initialization. 
The below table shows the percent chance of being assigned different buckets of adherence. Adherence is 
randomly assigned to all simulants. 


 .. Note::
    The current adherence system is a placeholder for additional information to be added in later models. Ideally, we will utilize a first-hand dataset to create adherence by age, sex, and state. Adherence should be programmed in such a way that allowing for later changes is easy to implement. 


**LDL-C Treatments**

.. list-table:: Adherence Score Values 
  :widths: 10 10 10 
  :header-rows: 1

  * - Category
    - Percent of Simulants 
    - Notes
  * - Primary Non-adherence
    - 25%
    - [Cheen_2019]_
  * - Secondary Non-adherence
    - 9.75%
    - 
  * - Adherent
    - 65.25%
    - Medicare Part D Data


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
    - 10.08%
    - 
  * - Adherent
    - 73.92%
    - Medicare Part D Data




Treatment Assignments
~~~~~~~~~~~~~~~~~~~~~

**Blood Pressure Treatments** 

In general, blood pressure medication is prescribed "start low and go slow" where medication is started at a low level 
and slowly increased over subsequent visits when a patient is not reaching targets. This approach can lead to under 
medicating individuals, but is followed here to best simulate real world practice. [Arnett_2019]_

Further details about treatment assignment to simulants can be found in the healthcare visits above. At a high level, 
for simulants where theraputic inertia is overcome: 


- A new simulant with SBP >=130 and <140 is assigned to one medication at half dose 
- A new simulant with SBP >=140: 
  
  - 45% will receive two drugs at half dose 
  - 55% will receive one drug at half dose 
- A simulant already on medication with SBP >= 140 will move up one treatment category 
  
  - For example: a simulant receiving two drugs at standard dose will move to three drugs at half dose 
  - Once a simulant is receiving three drugs at standard dose, they will remain in the treatment category permanently 

For all medication prescriptions and increases, theraputic inertia must be overcome. 


**LDL-C Treatments** 

LDL-C treatments follow a similar pattern as the blood pressure ramp decribed above. The decision to assign a 
simulant treatment is completed in the healthcare visits above. The choice of intensity is determined by the 
simulant's ASCVD score and LDL-C. For simulants where theraputic inertia is overcome, the treatment assignements
are summarized below. [Arnett_2019]_

- LDL-C value, ASCVD risk and medical history all contribute to a simulants's statin prescription. 

- A simulant already on medication with LDL-C > 1.81 mmol/L will move up one treatment category 
  
  - For example: a simulant receiving a high intensity statin will move to a low/medium intensity statin with a non-statin medication 
  - Once a simulant is receiving a high intensity statin with a non-statin therapy, they will remain in the treatment category permanently 

For all medication prescriptions and increases, theraputic inertia must be overcome. 


Treatment Effects
~~~~~~~~~~~~~~~~~

**Blood Pressure Treatments**  

Blood pressure treatments are split into 6 categories based on the number of medications and dosage. It 
is assumed that different medications have a similar impact and therefore are not modeled individually. 

.. list-table:: SBP Treatments 
  :widths: 10 
  :header-rows: 1

  * - Medication Group 
  * - One Drug at Half Dose 
  * - One Drug at Standard Dose 
  * - Two Drugs at Half Dose 
  * - Two Drugs at Standard Dose 
  * - Three Drugs at Half Dose 
  * - Three Drugs at Standard Dose 


Decrease in SBP is dependent on a simulant's starting SBP value. Full efficacy data is here:
/share/scratch/projects/cvd_gbd/cvd_re/simulation_science/drug_efficacy_sbp_new.csv [Law_2009]_

Due to lack of data, the same efficacy value for SBP will be used for all simulants. 
**Please note that this is intentionally different than for LDL-C medication.** 

SBP decrease for an individual simulant can be calculated as: 

 :math:`SBP Decrease = Treatment Efficacy * Adherence Score`

Where adherence score = 0 for primary or secondary nonadherent; and adherence score = 1 for adherent 

**LDL-C Treatments** 

LDL-C treatment is split into 5 categories based on the intensity of statins prescribed, 
and the inclusion of ezetimibe. This assumes that the impact of different therapies is 
similar and therefore are not modeled individually. 

.. list-table:: LDL-C Treatments 
  :widths: 10 
  :header-rows: 1

  * - Medication Group 
  * - Low Intensity Statins
  * - Medium Intensity Statins 
  * - Low/Medium Intensity Statins with ezetimibe 
  * - High Intensity Statins
  * - High Intensity Statins with ezetimibe 


LDL-C treatment efficacy is a **percent reduction** in LDL-C level. This means that simulants with higher 
initial LDL-C levels will see a higher total reduction. The full efficacy data is here: 
/share/scratch/projects/cvd_gbd/cvd_re/simulation_science/drug_efficacy_ldl.csv [Law_2003]_ [Goff_2014]_ [Descamps_2015]_

For each draw, a parameter value for efficacy will be selected based on the mean and 95% confidence 
interval provided in the table above. Assume a normal distribution for the parameter value. 
This average value for efficacy by category will be used for all simulants. This accounts 
for parameter uncertainity only. Variation in the simulant response is assumed 
to not affect the population measures used as outputs from this simulation. 

LDL-C decrease for an individual simulant can be calculated as: 

 :math:`LDL Decrease = Treatment Efficacy * Adherence Score` 

Where adherence score = 0 for primary or secondary nonadherent; and adherence score = 1 for adherent 

.. _uscvd4.5:

4.5 Initialization Parameters
-----------------------------


.. list-table:: Key parameters for initialization
  :widths: 5 5 10 10
  :header-rows: 1

  * - Parameter
    - Reference
    - Data Source for Simulation
    - Notes
  * - Baseline Coverage Data for Medication of SBP or LDL-C 
    - See below code and equations 
    - Generated from NHANES data 
    - 
  * - SBP baseline coverage rate for each ramp position
    - [An_2021]_
    - 43% receive two drugs at half dose; 57% one drug at half dose 
    - Burn in period will allow some simulants to move to different medication buckets prior to sim start 
  * - LDL-C baseline coverage rate
    - [Garcia-Gil_2016]_
    - 3.82% receive low intensity; 71.94% medium intensity; 24.24% high intensity 
    - Burn in period will allow some simulants to move to different medication buckets prior to sim start 
  * - Follow-up visit initialization 
    - 
    - All simulants initialized in the "acute" state will receive an appointment immediately. All other simulants that are either on SBP medication, LDL-C medication, or in "post myocaridal infarction" or "chronic stroke" states will receive a follow-up appointment scheduled. 
    - Burn in period will allow some simulants to have appointments for hypertension or hyperlipidemia prior to sim start 
  * - Follow-up visit time distribution  
    - 
    - All simulants will be assigned a follow-up from a uniform distribution of 0-3 months 
    - Burn in period will allow the distribution of follow-up appointments to reach equilibrium prior to time start 


Creation of "Untreated" SBP Values on Initializaiton
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
GBD values for SBP which are used in this sim reflect the US distribution of SBP **including** medication benefits. 
Therefore, by later applying treatment benefits to certain simulants, we are double counting the population level 
benefit of treatment. To avoid this, we must add SBP at initialization to create an "untreated" SBP level. 

To do this, we will add a percent increase in SBP to all simulants who are assigned SBP medication at 
initialization **AND** are adherent. The section below includes details on who will receive medication. 

In itialization simulants are also assigned to one drug or two drugs. Based on this assignment, a percent increase 
in SBP level will be given to each. The percent increase **only applies to adherent simulants**.

.. list-table:: Percent Increase in SBP 
  :widths: 10 10 
  :header-rows: 1

  * - Medication Assigned 
    - Percent Increase in SBP  
  * - One Drug  
    - 5.1% 
  * - Two Drugs  
    - 12%  


Example of Implementation for a Single Simulant: 
- Raw SBP value from GBD is 140 
- Assigned to treatment 
- Assigned to two therapies 
- Is adherent 
New "Untreated" SBP = Raw SBP * (1.12) = 140 * 1.12 = 156.8 

As simulants move age categories and change SBP, the **same percent increase in SBP** from initialization 
will be applied. For the example above, if this simulant above ages into a new category and their raw SBP 
is now 145, their untreated SBP will be 145 * 1.12 = 162.4 regardless of their current treatment category.  

Sources: NHANES Data for Medication Initialization; [An_2021]_; [Law_2009]_ 


Creation of "Untreated" LDL-C Values on Initializaiton
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Similar to SBP, GBD values for LDL-C reflect the US distribution of LDL-C **including** medication benefits. 
Therefore, we again add LDL-C at initialization to create an "untreated" LDL-C level. To do this, we will 
add a percent increase in LDL-C  to all simulants who are assigned medication at initialization. 

In itialization simulants are also assigned to a statin intensity level. Based on this assignment, a percent 
increase in LDL-C level will be given to each. 

.. list-table:: Percent Increase in LDL-C 
  :widths: 10 10 
  :header-rows: 1

  * - Medication Assigned 
    - Percent Increase  
  * - Low Intensity
    - 24.67% 
  * - Medium Intensity
    - 36.2% 
  * - High Intensity
    - 51.25% 

Example of Implementation for a Single Simulant: 
- Raw LDL-C value from GBD is 2  
- Assigned to treatment 
- Assigned to medium intensity statin 
- Is adherent 
New "Untreated" LDL-C = Raw LDL-C * (1.362) = 2 * 1.362 = 2.724 

As simulants move age categories and change LDL-C, the **same percent increase in LDL-C** from initialization 
will be applied. For the example above, if this simulant above ages into a new category and their raw LDL-C 
is now 2.4, their untreated SBP will be 2.4 * 1.362 = 3.2688 regardless of their current treatment category.  

Sources: NHANES Data for Medication Initialization; [Garcia-Gil_2016]_; [Law_2003]_ 


Medication Coverage of SBP or LDL-C at Initialization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Baseline coverage of treatment for elevated SBP and elevated LDL-c is substantial and expected to vary by age, sex, and time. To initialize simulants, the research team has fit a multinomial regression to NHANES data. The code used to generate this data is below, but not needed for initialization. The system of equations provided gives the probabilities for each simulant being on the different types of medicaiton. 

**Covariate Values:** 

These covariate values are calculated for each simulant and are then plugged into the below equations to provide the individual probabilities. 

 :math:`SBP_{i} = exp((-6.75) + (0.025 * SBP_{level}) + (-0.0045 * LDL_{level}) + (0.05 * age_{(yrs)}) + (0.16 * sex))` 

 :math:`LDL_{i} = exp((-4.23) + (-0.0026 * SBP_{level}) + (-0.005 * LDL_{level}) + (0.062 * age_{(yrs)}) + (-0.19 * sex))` 

 :math:`Both_{i} = exp((-6.26) + (0.018 * SBP_{level}) + (-0.014 * LDL_{level}) + (0.069 * age_{(yrs)}) + (0.13 * sex))` 

Where sex = 1 for men and 2 for women 


**Calculating Probabilities:** 

 :math:`P(tx=SBPonly) = \frac{SBP_{i}}{SBP_{i} + LDL_{i} + Both_{i} + 1}`

 :math:`P(tx=LDLonly) = \frac{LDL_{i}}{SBP_{i} + LDL_{i} + Both_{i} + 1}`

 :math:`P(tx=Both) = \frac{Both_{i}}{SBP_{i} + LDL_{i} + Both_{i} + 1}`

 :math:`P(tx=none) = \frac{1}{SBP_{i} + LDL_{i} + Both_{i} + 1}`


Code is below for reference 

 .. code-block:: R

  ###### Setup ######
  rm(list=ls())

  suppressMessages(library(data.table))
  library(ggplot2)
  library(nnet)

  ###### Files and paths ######
  file_path <- "/share/scratch/projects/cvd_gbd/cvd_re/simulation_science/nhanes/"

  ###### Read in file ######
  load(paste0(file_path, "nhanes_microdata.rdata"))

  # Recode treatment variables to account for skip pattern
  data[,sbptx:=ifelse(highbp==0 & is.na(bpmeds), 0, bpmeds)]
  data[,choltx:=ifelse(highchol==0 & is.na(cholmeds), 0, cholmeds)]
  data[,tx:=ifelse(sbptx==0 & choltx==0, "none", ifelse(sbptx==1 & choltx==0, "bponly", 
      ifelse(sbptx==0 & choltx==1, "cholonly", ifelse(sbptx==1 & choltx==1, "both", NA))))]
  data[,tx2:=factor(tx, levels=c("none", "bponly", "cholonly", "both"))]

  meds <- multinom(tx2 ~ bpsys + lbdldl + sex_id + age_year, data=data)

  # weights:  24 (15 variable)
  initial  value 21425.179351 
  iter  10 value 16793.908492
  iter  20 value 14903.770849
  final  value 14903.720511 
  converged

  summary(meds)
  Call: multinom(formula = tx2 ~ bpsys + lbdldl + sex_id + age_year, 
    data = data)

  Coefficients:
           (Intercept)        bpsys       lbdldl     sex_id   age_year
  bponly     -6.746432  0.024905946 -0.004474287  0.1578084 0.05006270
  cholonly   -4.234380 -0.002564668 -0.005063271 -0.1900133 0.06173726
  both       -6.262507  0.018470096 -0.013548739  0.1326292 0.06909707

  Std. Errors:
           (Intercept)       bpsys       lbdldl     sex_id    age_year
  bponly     0.1863489 0.001265926 0.0006439986 0.04686429 0.001632670
  cholonly   0.2665387 0.001872484 0.0009045871 0.06485975 0.002270549
  both       0.2067298 0.001371421 0.0007557389 0.05139671 0.001875866

  Residual Deviance: 29807.44 
  AIC: 29837.44 


.. _uscvd4.6:

4.6 Models
----------

 .. note::
    Simulation results in the R-Shiny below are from a prior version of the project and have not been updated with new data 

`Simulation Results <https://shiny.ihme.washington.edu/content/416/>`_
    

.. list-table:: Model verification and validation tracking
  :widths: 3 10 20
  :header-rows: 1

  * - Model
    - Description
    - V&V summary
  * - 1.0
    - Cause model for myocardial infarction and ischemic stroke in Alabama 
    - `Validation workbook Model 1 <https://github.com/ihmeuw/vivarium_research_nih_us_cvd/blob/main/Model1_VV-withMI.ipynb>`_ Incidence and prevalance match GBD and artifact values. CSMR, EMR and DALYs compared to GBD/the artifact are slightly off for MI, likely due to implementation of IHD data. ACMR is correctly, need to continue to confirm this as other IHD causes are added. Results appear sensitive to small sample sizes. 
  * - 2.0
    - Adding SBP and LDL-C risk factors 
    - `Validation workbook Model 2 <https://github.com/ihmeuw/vivarium_research_nih_us_cvd/blob/main/Model2_VV_SBP.ipynb>`_ `And interactive sim <https://github.com/ihmeuw/vivarium_research_nih_us_cvd/blob/main/Interactive_Model2_VV.ipynb>`_ Cause model is identical to Model 1 with same pieces correct and the same discrepancies. Risk factors match for exposure, standard deviation and relative risk. Outstanding issue with individual simulant outliers in SBP and incidence. 
  * - 3.0
    - Adding angina as a cause    
    - `Validation workbook Model 3 <https://github.com/ihmeuw/vivarium_research_nih_us_cvd>`_ Cause model is identical to prior models with same pieces correct and the same discrepancies. Risk factors match for exposure, standard deviation and relative risk. Outstanding issue with individual simulant outliers in SBP and incidence. Seems that angina relative risk is highly susceptible to low n-size and leads to high variation. 
  * - 4.0
    - Adding in healthcare system visits 
    - Planned V&V: stable rate of appointments per CVD case in the population; percent of simulants with a follow-up scheduled is reasonably stable; percent of appointments that are follow-up visits is stable. Source: [Rodgers_2009]_
  * - 5.0
    - Adding medications for SBP and LDL-C  
    - Planned V&V: rate of medication per simulant with risk factor might increase but should be in line with published data [Gu_2012]_; total percent of population that is medicated; types of medication used over time (combo vs mono) should be stable [Derington_2020]_
  * - 6.0
    - Adding in the outreach intervention 
    -  

Model 3 V&V for the relative risk with angina showed a lot of variability: 
    .. image:: Model3_VV_Angina.png

  
.. _uscvd4.7:

4.7 Desired outputs
-------------------

Outputs:

#. Total population 
#. Person-time 
#. YLLs and YLDs
#. Deaths 
#. Transitions for each cause 
#. Total exposure value * person time for all risk factors 
#. Person time at or below target values for SBP and LDL-C 
#. Healthcare appointments 
#. Missed appointments 
#. Person time on medication 
#. Medication effect - exposure levels stratified by medication time 
#. Numbers of interventions 


Stratifications for All: 

#. Year 
#. Age-group 
#. Sex 
#. State (Alabama, Alaska, etc)
#. Scenario 
#. Race (note: not included in minimum viable model, to be added later)

.. _uscvd4.8:

4.8 Output meta-table shell
---------------------------

.. list-table:: Model Outputs 
  :widths: 5 15 15 
  :header-rows: 1

  * - Output 
    - Notes
    - Additional Stratifications Needed 
  * - Population  
    - 
    -  
  * - Person-time  
    - sum of total person time
    - By state for each cause (i.e., suscepitble vs acute for myocardial infarction)
  * - YLLs  
    - sum of YLLs for cause i 
    - Stratify by cause 
  * - YLDs  
    - sum of YLDs for cause i 
    - Stratify by cause 
  * - Deaths 
    - sum of deaths for cause i 
    - Stratify by cause 
  * - Transitions between states 
    - sum of transitions between states within cause i 
    - i.e., transition from susceptible to acute MI, stratified by cause 
  * - Mean SBP 
    - sum of SBP * person time
    - Split by medication category
  * - Mean LDL-C
    - sum of LDL-C * person time
    - Split by medication category
  * - Mean BMI 
    - sum of BMI * person time *NOTE: NOT IN CURRENT MODEL*
    - 
  * - Mean FPG 
    - sum of FPG * person time *NOTE: NOT IN CURRENT MODEL*
    - 
  * - Population achieving target LDL-C
    - sum of person time at or below 1.81 LDL-C 
    - 
  * - Population achieving target SBP
    - sum of person time at or below 130 SBP  
    - 
  * - Healthcare appointments 
    - sum of healthcare appointments 
    - Split by type of appointment - follow-up vs emergency vs screening as well as usual age/sex/state/etc.
  * - Missed follow-up appointments 
    - sum of missed follow-up appointments 
    - Split by age/sex/state/etc. 
  * - Population on SBP medication 
    - sum of person time on SBP medication 
    - Split by primary non-adherent, secondary non-adherent, and adherent; and split by medication category 
  * - Population on LDL-C medication 
    - sum of person time on LDL-C medication 
    - Split by primary non-adherent, secondary non-adherent, and adherent; and split by medication category 
  * - Number of interventions 
    - sum of interventions given 
    - Split by intervention type 



.. _uscvd5.0:

5.0 Back of the Envelope Calculations
+++++++++++++++++++++++++++++++++++++

Workbook for the back of the envelope calculations is `here <https://github.com/ihmeuw/vivarium_research_nih_us_cvd/blob/main/Back_of_envelope.ipynb>`_.

In general, the calculations seemed to show a relatively small impact from the outreach intervention. This is 
likely because the intervention only affects primary adherence for folks on SBP or LDL-C medciations, which 
is a small subset of folks. Assuming about 37.5% of people are medicated, 96% would not be affected 
by this intervention. Making a stronger impact would require more folks to be affected. 

However, this did show about 2% of heart attacks and 1.5% of strokes could be avoided 
annually in the United States with this intervention, which is a considerable number. 

Some limitations of this analysis include: 

#. Once medicated your exposure decreases to the TMREL. This is not always the case (non-responders, minimal benefit folks) and would lead to an overestimation of the effect 
#. Assumes that medication is randomly distributed across age/sex/starting SBP level. This is not true, the most in need would be more likely to receive medication which would lead to an underestimation of effect 
#. Percent of folks are medicated today does not have good starting data 
#. Some simulants might survive with the intervention when they would have died, or delay a heart attack/stroke but still ultimately experience one. These dynamic changes will be captured by the simulation but are not captured here. 

.. _uscvd6.0:

6.0 Limitations
+++++++++++++++

**Treatments for SBP and LDL-C**

#. We are using treatment categories only, not individual treatments as different types of treatments have similar efficacy values. This also means a patient cannot "switch" medications 
#. There is no option for dicontinuation of medications or take fewer medications (i.e., "move down" treatment categories)
#. All simulants receive the average efficacy from medications, there is no indiviual variation in response 
#. SBP does not have a parameter uncertainity value 

**Adherence**

#. All simulants receive an adherence that does not change, this means persistance is not simulanted (continued adherence)

**Healthcare Interactions**

#. Data for screening appointments is pulled from GBD envelope "outpatient visits". It is not clear where this data was derived and while it does vary by age and sex, the trend is not continuous. This is an area for refinement. 
#. Outpatient visits does not have a well defined variation right now. It is likely that this is not a true Poisson distribution, and is overdispersed and/or bimodal.  
#. The "no-show" rate for appointments is based on multiple research papers and is an approximate value. This is an area for refinement. 

**Other Limitations**

#. There are many lifestyle factors that contribute significantly to heart disease but aren't included here 
#. Simulants do not have a natural biologic variation in SBP or LDL-C as they might in real life due to stress, seasons, or other factors. This might lead to "jumps" for individual simulants in exposure values at age group jumps 
#. Counter to GBD, simulants can experience multiple causes of heart disease simultaneously, such as myocaridal infarction and angina. Since categories are no longer mutually exclusive, there might be an understimation of overall heart disease compared with GBD 
#. Current documentation does not include enough information to have interventions run concurrently. This decision was made by the sim science team and Greg as it allows for multiple simplifying assumptions and removes the need for risk mediation. 

.. _uscvd7.0:

7.0 References
++++++++++++++

.. [Ali_2021] Ali, Dalia H., Birsen Kiliç, Huberta E. Hart, Michiel L. Bots, Marion C. J. Biermans, Wilko Spiering, Frans H. Rutten, and Monika Hollander. 2021. “Therapeutic Inertia in the Management of Hypertension in Primary Care.” Journal of Hypertension 39 (6): 1238–45. 
  https://doi.org/10.1097/HJH.0000000000002783.

.. [An_2021] An, Jaejin, Tiffany Luong, Lei Qian, Rong Wei, Ran Liu, Paul Muntner, Jeffrey Brettler, Marc G. Jaffe, Andrew E. Moran, and Kristi Reynolds. 2021. “Treatment Patterns and Blood Pressure Control With Initiation of Combination Versus Monotherapy Antihypertensive Regimens.” Hypertension 77 (1): 103–13. 
  https://doi.org/10.1161/HYPERTENSIONAHA.120.15462.

.. [Arnett_2019] Arnett, Donna K., Roger S. Blumenthal, Michelle A. Albert, Andrew B. Buroker, Zachary D. Goldberger, Ellen J. Hahn, Cheryl Dennison Himmelfarb, et al. 2019. “2019 ACC/AHA Guideline on the Primary Prevention of Cardiovascular Disease: Executive Summary: A Report of the American College of Cardiology/American Heart Association Task Force on Clinical Practice Guidelines.” Circulation 140 (11). 
  https://doi.org/10.1161/CIR.0000000000000677  

.. [Baumgartner_2018] Baumgartner, Pascal C., R. Brian Haynes, Kurt E. Hersberger, and Isabelle Arnet. 2018. “A Systematic Review of Medication Adherence Thresholds Dependent of Clinical Outcomes.” Frontiers in Pharmacology 9. 
  https://www.frontiersin.org/articles/10.3389/fphar.2018.01290 

.. [Byrd_2011] Byrd, James B., Chan Zeng, Heather M. Tavel, David J. Magid, Patrick J. O’Connor, Karen L. Margolis, Joe V. Selby, and P. Michael Ho. 2011. “Combination Therapy as Initial Treatment for Newly Diagnosed Hypertension.” American Heart Journal 162 (2): 340–46. 
  https://doi.org/10.1016/j.ahj.2011.05.010.

.. [Cheen_2019] Cheen, McVin Hua Heng, Yan Zhi Tan, Ling Fen Oh, Hwee Lin Wee, and Julian Thumboo. 2019. “Prevalence of and Factors Associated with Primary Medication Non-Adherence in Chronic Disease: A Systematic Review and Meta-Analysis.” International Journal of Clinical Practice 73 (6): e13350. 
  https://doi.org/10.1111/ijcp.13350

.. [Derington_2020] Derington, Catherine G., Jordan B. King, Jennifer S. Herrick, Daichi Shimbo, Ian M. Kronish, Joseph J. Saseen, Paul Muntner, Andrew E. Moran, and Adam P. Bress. 2020. “Trends in Antihypertensive Medication Monotherapy and Combination Use Among US Adults, National Health and Nutrition Examination Survey 2005–2016.” Hypertension 75 (4): 973–81. 
  https://doi.org/10.1161/HYPERTENSIONAHA.119.14360.

.. [Descamps_2015] Descamps, Olivier, Joanne E. Tomassini, Jianxin Lin, Adam B. Polis, Arvind Shah, Philippe Brudi, Mary E. Hanson, and Andrew M. Tershakovec. 2015. “Variability of the LDL-C Lowering Response to Ezetimibe and Ezetimibe + Statin Therapy in Hypercholesterolemic Patients.” Atherosclerosis 240 (2): 482–89. 
  https://doi.org/10.1016/j.atherosclerosis.2015.03.004.

.. [Ely-2017] Ely, Elizabeth K., et al. "A national effort to prevent type 2 diabetes: participant-level evaluation of CDC’s National Diabetes Prevention Program." Diabetes care 40.10 (2017): 1331-1341.
  https://care.diabetesjournals.org/content/40/10/1331

.. [Fischer_2010] Fischer, Michael A., Margaret R. Stedman, Joyce Lii, Christine Vogeli, William H. Shrank, M. Alan Brookhart, and Joel S. Weissman. 2010. “Primary Medication Non-Adherence: Analysis of 195,930 Electronic Prescriptions.” Journal of General Internal Medicine 25 (4): 284–90. 
  https://doi.org/10.1007/s11606-010-1253-9 

.. [Garcia-Gil_2016] García-Gil, Maria, Jordi Blanch, Marc Comas-Cufí, Josep Daunis-i-Estadella, Bonaventura Bolíbar, Ruth Martí, Anna Ponjoan, Lia Alves-Cabratosa, and Rafel Ramos. 2016. “Patterns of Statin Use and Cholesterol Goal Attainment in a High-Risk Cardiovascular Population: A Retrospective Study of Primary Care Electronic Medical Records.” Journal of Clinical Lipidology 10 (1): 134–42. 
  https://doi.org/10.1016/j.jacl.2015.10.007.

.. [Goff_2014] Goff, David C., Donald M. Lloyd-Jones, Glen Bennett, Sean Coady, Ralph B. D’Agostino, Raymond Gibbons, Philip Greenland, et al. 2014. “2013 ACC/AHA Guideline on the Assessment of Cardiovascular Risk.” Circulation 129 (25_suppl_2): S49–73. 
  https://doi.org/10.1161/01.cir.0000437741.48606.98

.. [Gu_2012] Gu, Qiuping, Vicki L. Burt, Charles F. Dillon, and Sarah Yoon. 2012. “Trends in Antihypertensive Medication Use and Blood Pressure Control Among United States Adults  With Hypertension.” Circulation 126 (17): 2105–14. 
  https://doi.org/10.1161/CIRCULATIONAHA.112.096156. 

.. [Hwang_2015] Hwang, Andrew S., Steven J. Atlas, Patrick Cronin, Jeffrey M. Ashburner, Sachin J. Shah, Wei He, and Clemens S. Hong. 2015. “Appointment ‘No-Shows’ Are an Independent Predictor of Subsequent Quality of Care and Resource Utilization Outcomes.” Journal of General Internal Medicine 30 (10): 1426–33. 
  https://doi.org/10.1007/s11606-015-3252-3.

.. [Law_2009] Law, M. R., J. K. Morris, and N. J. Wald. 2009. “Use of Blood Pressure Lowering Drugs in the Prevention of Cardiovascular Disease: Meta-Analysis of 147 Randomised Trials in the Context of Expectations from Prospective Epidemiological Studies.” BMJ 338 (May): b1665. 
  https://doi.org/10.1136/bmj.b1665

.. [Law_2003] Law, M. R., N. J. Wald, and A. R. Rudnicka. 2003. “Quantifying Effect of Statins on Low Density Lipoprotein Cholesterol, Ischaemic Heart Disease, and Stroke: Systematic Review and Meta-Analysis.” BMJ 326 (7404): 1423. 
  https://doi.org/10.1136/bmj.326.7404.1423.

.. [Liu_2017] Liu, Xuefeng, Tinghui Zhu, Milisa Manojlovich, Hillel W. Cohen, and Dennis Tsilimingras. 2017. “Racial/Ethnic Disparity in the Associations of Smoking Status with Uncontrolled Hypertension Subtypes among Hypertensive Subjects.” PloS One 12 (8): e0182807. 
  https://doi.org/10.1371/journal.pone.0182807.

.. [McCormack_2020] McCormack, James P., and Daniel T. Holmes. 2020. “Your Results May Vary: The Imprecision of Medical Measurements.” BMJ 368 (February): m149. 
  https://doi.org/10.1136/bmj.m149.

.. [Metz-et-al-2000] Metz, Jill A., et al. "A randomized trial of improved weight loss with a prepared meal plan in overweight and obese patients: impact on cardiovascular risk reduction." Archives of internal medicine 160.14 (2000): 2150-2158.
  https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/485403

.. [Morales_2018] Morales, Clotilde, Núria Plana, Anna Arnau, Laia Matas, Marta Mauri, Àlex Vila, Lluís Vila, et al. 2018. “Causas de no consecución del objetivo terapéutico del colesterol de las lipoproteínas de baja densidad en pacientes de alto y muy alto riesgo vascular controlados en Unidades de Lípidos y Riesgo Vascular. Estudio EROMOT.” Clín. investig. arterioscler. (Ed. impr.), 1–9.

.. [Munoz-NEJM] Muñoz, Daniel, et al. "Polypill for cardiovascular disease prevention in an underserved population." New England Journal of Medicine 381.12 (2019): 1114-1123.
  https://www.nejm.org/doi/10.1056/NEJMoa1815359

.. [Nguyen_2015] Nguyen, Vincent, Emil M. deGoma, Erik Hossain, and Douglas S. Jacoby. 2015. “Updated Cholesterol Guidelines and Intensity of Statin Therapy.” Journal of Clinical Lipidology 9 (3): 357–59. 
  https://doi.org/10.1016/j.jacl.2014.12.009.

.. [Rodgers_2009] “ACC 2009 Survey Results and Recommendations: Addressing the Cardiology Workforce Crisis.” n.d. Accessed September 12, 2022. 
  https://doi.org/10.1016/j.jacc.2009.08.001. 

.. [Sabate_2003] Sabaté, Eduardo, and World Health Organization, eds. 2003. Adherence to Long-Term Therapies: Evidence for Action. Geneva: World Health Organization. 

.. [Thom-2013] Thom, Simon, et al. "Effects of a fixed-dose combination strategy on adherence and risk factors in patients with or at high risk of CVD: the UMPIRE randomized clinical trial." Jama 310.9 (2013): 918-929.
	https://jamanetwork.com/journals/jama/fullarticle/1734704

.. [Wallace_2011] Wallace, Emma, and Tom Fahey. 2011. “Measuring Blood Pressure in Primary Care: Identifying ‘White Coat Syndrome’ and Blood Pressure Device Comparison.” The British Journal of General Practice 61 (590): 544–45.
  https://doi.org/10.3399/bjgp11X593749. 
