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

+------------------------------------+
| List of abbreviations              |
+=======+============================+
|       |                            |
+-------+----------------------------+

.. _uscvd1.0:

1.0 Background
++++++++++++++


.. _uscvd1.1:

1.1 Project overview
--------------------

We have shown previously that geographic disparities in the burden of cardiovascular disease (CVD) are large and have persisted over the past 40 years. For example, the age-standardized death rate due to ischemic heart disease in Oklahoma remains more than twice that of Minnesota (144 vs. 63 per 100,000). Alarmingly, many states have seen no further decline in CVD since 2010 and the gap in CVD between states has not improved, as shown by our recent work estimating long-term trends in CVD mortality. In a global projection model of CVD risk factors and mortality through the year 2025, we found that over 2 million premature deaths would be prevented with expanded control of risk factors. These results indicate that reducing the burden of CVD is a public health imperative but varying levels and trends in CVD and its risk factors were likely to affect the impact of different strategies to reduce exposure to CVD risk factors. 

Our research also estimated that, in the U.S., the absolute risk of premature CVD death would be reduced more than 4% if major risk factor targets are achieved by 2025. However, these national results have limited usefulness for reducing geographic disparities within the U.S., and a subnational evaluation of the impact of population-level evidence-based interventions is an important goal.  

The long-term trajectory for CVD at the state level in the U.S. is not known, and is likely to differ substantially between states. Prior efforts in projecting CVD have been limited only to the national level, which severely limits their relevance to reducing health disparities.  

The NIH has recognized the importance of studying health disparities, as required by the Minority Health and Health Disparities Research and Education Act. In its strategic plan, NHLBI has encouraged the investigation of “strategies that effectively address these differences,” asking the question “how can cardiometabolic risk be managed to improve health trajectories in specific populations?” We distinguish between two areas of research needed to understand population-level CVD trajectories, a) population health projections and b) health policy models. Population health projections are the result of a particular set of assumptions on future health trends. Health policy models are a subtype of projection that project future changes in health due to interventions after the efficacy of the intervention is established. Previous health policy models developed with NIH support included the IMPACT model, the CVD Policy Model, the ARCHIMEDES and CORE diabetes models, and single risk models for tobacco and hypertension. All of these models operate only for only a single geographic region (usually the United States), and consider only a limited set of risks and outcomes.  

The intent of this work is to develop new health policy models that use projections of CVD burden by state and race/ethnicity produced by population health models to quantify the impact of various CVD prevention strategies, contingent on each state’s current population characteristics, patterns of CVD risk, health care access, level of effective medication delivery, and differential effects of risk factor interventions by subgroups. 


.. _uscvd1.2:

1.2 Literature review
---------------------


.. _uscvd2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++

The intent of this simulation is to determine the effect of various interventions aimed at: 1) improving blood pressure and LDL-cholesterol control, 2) increasing exercise, 3) decreasing BMI/weight, 4) improving control of fasting plasma glucose, and 5) decreasing tobacco use. 

Initial efforts will focus on the 50 US states and Washington DC; when inputs are available for simulations by race/ethnicity groups within the US subnationals, we will transition to that level. 

Comparisons will be with the GBD results of incidence, prevalence, and mortality for the causes and risks included in the following sections. 

.. _uscvd3.0:

3.0 Causal framework
++++++++++++++++++++

.. _uscvd3.1:

3.1 Causal diagram
------------------
 
 .. note::
    link to DAGs page
    use round circles with DAGs

**Outcome (O)**:



**Most proximal determinant/exposure (E)**:
  


**Confounders (C)**:



**Effect modifiers**:


**Mediators (M)**:


.. _uscvd3.2:

3.2 Effect sizes
----------------



4.0 Intervention
++++++++++++++++



.. _uscvd4.1:

4.1 Simulation scenarios
------------------------

.. _4.1.1:

4.1.1 Outreach
~~~~~~~~~~~~~~
Under this scenario, the effectiveness of the delivery of SBP-lowering and LDL-c lowering therapies would increase through methods such as a phone call, app, or support clinic. 

**Source information:**

Black patients, when prescribed statin as a new medication within the past 1 year, receive automated phone calls and letters starting 1-2 weeks after prescribing, which encourages them to fill the prescription (primary adherence). Receiving this intervention increases fill and initiation of statin from 26% to 42% of patients. OR for intervention vs control was 2.16 (1.91-2.43). Effectively, patients were twice as likely to initiate medication during the first 30 days if intervention was delivered.  
[Derose-2013]_

Patients, age 30-60 without IHD, but who met any of the following criteria: current tobacco smoker, LDL-c > 3.37 mmol/L, or SBP >140 mmHg, received access to a non-clinical community health center with nurse-practitioner counseling on diet, tobacco use, and exercise. Telephone follow-up and free YMCA exercise sessions were offered. The comparison group received standard of care. Both groups had medication copays covered. At 1 year, statin adherence had a relative odds of 2.2 (95% CI 1.11-4.2) and blood pressure medication adherence had a relative odds of 2.3 (95% CI 1.39-3.88) compared to the control group. 
[Becker-2005]_

**Implementation:**

For the first 30 days, new statin and blood pressure prescription adherence is increased according to Derose 2013. Adherence to the medications over 1 year after initiation should be increased according to Becker 2005. Effect can persist beyond the length of study.  

**Scenarios:**
	- Outreach 1.0: Following a prescription of new statin or blood pressure-lowering medication, the initial medication fill rate is increased by 2x and the medication adherence each month is increased 2x.  
	- Outreach 0.5: Outreach at 50% efficacy and coverage (1.5x increase in the initial medication fill rate for a random 50% of simulants receiving new prescribed medication, 1.5x increase in the medication adherence for the same 50% of simulants on medications) 

.. _4.1.2:

4.1.2 Polypill
~~~~~~~~~~~~~~
This scenario involves fixed dose combination medication (blood pressure lowering and lipid lowering), which lead to an expected reduction in SPB and LDL-c.  

**Source information:**

Individuals with prevalent IHD, past ischemic stroke, prevalent PAD, or 5-year CVD risk of 15% or greater received a free 6-month-at-a-time supply of a polypill of either version 1 (aspirin, 75 mg; simvastatin, 40 mg; lisinopril, 10 mg; and atenolol, 50 mg) or version 2 (aspirin, 75 mg; simvastatin, 40 mg; lisinopril, 10 mg; and hydrochlorothiazide, 12.5 mg). Compared with usual care, at 12 months, the polypill group was more likely to be adherent with medications (adjRR 1.13, 95% CI 1.08-1.18). 
[Thom-2013]_ 

**Implementation:**

Adherence to blood pressure lowering and statin medications over 1 year after initiation should be increased according to the above study, though in this scenario we will actually deliver the following combination: atorvastatin (10 mg), amlodipine (2.5 mg), losartan (25 mg), and hydrochlorothiazide (12.5 mg). Effect can persist beyond the length of the study.  
[Munoz-NEJM]_ 

**Scenarios:**
	- Polypill 1.0: All individuals with IHD, past ischemic stroke, or prevalent PAD (who are not already on medications) receive atorvastatin (10 mg), amlodipine (2.5 mg), losartan (25 mg), and hydrochlorothiazide (12.5 mg) regardless of SBP or LDL-c levels. Medications lead to expected reduction in SBP and LDL-c. Adherence is increased 13% following receipt of those medications.  
	- Polypill 0.5: Above scenario with, but a reduction to 50% of individuals meeting criteria receiving prescription for atorvastatin (10 mg), amlodipine (2.5 mg), losartan (25 mg), and hydrochlorothiazide (12.5 mg) regardless of SBP or LDL-c levels). Medications lead to expected reduction in SBP and LDL-c. Adherence among individuals receiving therapy is increased 13% following receipt of those medications. 

.. _4.1.3:

4.1.3 Lifestyle modification education
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Under this scenario, lifestyle modification education regarding physical activity, healthy eating, weight loss, and tobacco cessation is utilized.  

**Source information:**

Individuals were enrolled in the diabetes prevention program if their BMI was >= 25, they had no known DM2, and their FPG was 100-125mg/dl (or HgbA1C 5.7-6.4). They attended a median of 14 community-based sessions over a median of 134 days. Sessions included lifestyle and behavior counselling with a focus on increasing moderate physical activity, healthy eating, and weight loss. Each additional session attended led to 0.31% loss of body weight.  
[Ely-2017]_  

Variations on the above intervention increased support time or added meal replacements for the first month or full year  
[Metz-et-al-2000]_ 

**Scenarios:**
	- Lifestyle 1.0: Enrollment will occur following a routine health facility or primary care visit. Individuals with BMI >= 25 or FPG 100-125 mg/dl at the time of the visit will receive weekly sessions for 6 months followed by monthly sessions for 6 months. Each session attended will result in 0.3% loss of body weight (initially represented as BMI, but eventually to use weight when available). Adherence will decline in a linear fashion, with 50% of individuals continuing sessions at 6 months and all completing sessions by 1 year.  
	- Lifestyle 0.5: Scenario described above but with 50% of adherence at initiation; adherence will decline in a linear fashion from that point. 


.. _4.1.4:

4.1.4 Combined scenarios
~~~~~~~~~~~~~~~~~~~~~~~~
	- Combination 1.0: Combination of outreach 1.0, polypill 1.0, and lifestyle 1.0  
	- Combination 0.5: Combination of outreach 0.5, polypill 0.5, and lifestyle 0.5 


.. _uscvd5.0:

5.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _uscvd5.1:

5.1 Vivarium concept model 
--------------------------

.. note::
  This is our standard vivarium concept model diagram we are used to seeing

.. _uscvd5.2:

5.2 Demographics
----------------

.. _uscvd5.2.1:

5.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  - Cohort type: 
  	- Prospective closed cohort starting at age 3. Youngest simulants will be turning 25 when the simulation ends. Ages 3-25 will be modeled but not observed.
  	- Size of largest tracked population: 100,000 simulants
  - Cohort length:
  	- year_start: January 1, 2019
  	- year_end: December 31, 2040
  - Age and sex structure:
  	- Sex: male/female/both
  	- Age range: age_start=25, age_end=125
  - Time step:
  	- One month
  - Fertility:
  	- Not applicable
  - Stratifications:
  	- P\ :sub:`1`\: healthy individuals
  	- P\ :sub:`2`\: new initiators, elevated risk factor detected at office visit
  	- P\ :sub:`3`\: new initiators, event (acute MI, acute stroke)
  	- P\ :sub:`4`\: previous diagnosis; change in medication


.. _uscvd5.2.2:

5.2.2 Location description
~~~~~~~~~~~~~~~~~~~~~~~~~~

**Locations**: All 50 US states and District of Columbia

.. _uscvd5.3:

5.3 Models
----------

.. note::
  here we use the compartmental (SEIR) models with squares
  

.. _uscvd5.3.1:

5.3.1 Model 1
~~~~~~~~~~~~~

.. todo::

  - add verification and validation strategy
  - add python-style pseudo code to summarize model algorithm if necessary

.. _uscvd5.3.2:

5.3.2 Model 2
~~~~~~~~~~~~~

.. todo::

  - add verification and validation strategy
  - add python-style pseudo code to summarize model algorithm if necessary

.. _uscvd5.3.3:

5.3.3 Model 3
~~~~~~~~~~~~~

.. todo::

  - add verification and validation strategy
  - add python-style pseudo code to summarize model algorithm if necessary

.. _uscvd5.3.4:

5.3.4 Model 4
~~~~~~~~~~~~~

.. todo::

  - add verification and validation strategy
  - add python-style pseudo code to summarize model algorithm if necessary


.. _uscvd5.4:

5.4 Desired outputs
-------------------

.. _uscvd5.5:

5.5 Output meta-table shell
---------------------------

.. todo::
  - add special stratifications if necessary

.. _uscvd6.0:

6.0 Back of the envelope calculations
+++++++++++++++++++++++++++++++++++++


.. _uscvd7.0:

7.0 Limitations
+++++++++++++++



.. _uscvd8.0:

8.0 References
++++++++++++++

.. [Derose-2013] Derose, Stephen F., et al. "Automated outreach to increase primary adherence to cholesterol-lowering medications." JAMA internal medicine 173.1 (2013): 38-43.
	https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/1399850

.. [Becker-2005] Becker, Diane M., et al. "Impact of a community-based multiple risk factor intervention on cardiovascular risk in black families with a history of premature coronary disease." Circulation 111.10 (2005): 1298-1304.
	https://www.ahajournals.org/doi/10.1161/01.CIR.0000157734.97351.B2

.. [Thom-2013] Thom, Simon, et al. "Effects of a fixed-dose combination strategy on adherence and risk factors in patients with or at high risk of CVD: the UMPIRE randomized clinical trial." Jama 310.9 (2013): 918-929.
	https://jamanetwork.com/journals/jama/fullarticle/1734704

.. [Munoz-NEJM] Muñoz, Daniel, et al. "Polypill for cardiovascular disease prevention in an underserved population." New England Journal of Medicine 381.12 (2019): 1114-1123.
	https://www.nejm.org/doi/10.1056/NEJMoa1815359

.. [Ely-2017] Ely, Elizabeth K., et al. "A national effort to prevent type 2 diabetes: participant-level evaluation of CDC’s National Diabetes Prevention Program." Diabetes care 40.10 (2017): 1331-1341.
	https://care.diabetesjournals.org/content/40/10/1331

.. [Metz-et-al-2000] Metz, Jill A., et al. "A randomized trial of improved weight loss with a prepared meal plan in overweight and obese patients: impact on cardiovascular risk reduction." Archives of internal medicine 160.14 (2000): 2150-2158.
	https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/485403