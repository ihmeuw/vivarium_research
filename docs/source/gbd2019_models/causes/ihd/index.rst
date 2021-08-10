.. _2019_cause_ihd:

======================
Ischemic Heart Disease
======================

.. contents::
   :local:
   :depth: 1


.. list-table:: Abbreviations
   :widths: 15 15 15
   :header-rows: 1

   * - Abbreviation
     - Definition
     - Notes
   * - IHD
     - Ischemic heart disease
     - 
   * - MI
     - Myocardial infarction
     - 
   * - AMI
     - Acute myocardial infarction
     - 
   * - HF
     - Heart failure
     - 
   * - SA
     - Stable angina
     - 


Disease Overview
----------------

Ischemic heart disease (IHD) is a non-communicable cardiovascular disease which occurs when the arteries of the heart cannot deliver enough oxygen-rich blood to the heart. IHD is also referred to as coronary artery disease or coronary heart disease and is often caused by the buildup of plaque, a waxy substance, inside the lining of larger coronary arteries. This buildup can partially or totally block blood flow in the large arteries of the heart. Some types of this condition may be caused by disease or injury affecting how the arteries work in the heart.

Symptoms of coronary heart disease may be different from person to person even if they have the same type of coronary heart disease. Acute coronary events may cause symptoms such as angina, cold sweats, dizziness, nausea, neck pain, shortness of breath, sleep disturbances, or weakness. Chronic ischemic heart disease can cause signs and symptoms such as angina, anxiety or nervousness, fatigue, or neck pain. Symptoms may get worse as the buildup of plaque continues to narrow the coronary arteries. However, because many people have no symptoms, they do not know they have coronary heart disease until they have chest pain, a heart attack, or sudden cardiac arrest. 

Coronary microvascular disease is another type of coronary heart disease. It occurs when the heart’s tiny blood vessels do not work normally.

[NIH_IHD]_

GBD 2019 Modeling Strategy
--------------------------

GBD 2019 Non-Fatal Modeling Strategy
++++++++++++++++++++++++++++++++++++

**Case definitions:**\

1. Acute myocardial infarction (MI): Definite and possible MI according to the fourth universal definition of myocardial infarction:
  
  a. When there is clinical evidence of myocardial necrosis in a clinical setting consistent with myocardial ischaemia or
  b. Detection of a rise and/or fall of cardiac biomarker values and with at least one of the following: i) symptoms of ischaemia, ii) new or presumed new ST-segment-T wave changes or new left bundle branch block, iii) development of pathological Q waves in the ECG, iv) imaging evidence of new loss of viable myocardium or new regional wall motion abnormality, or v) identification of an intracoronary thrombus by angiography or autopsy.
  c. Sudden (abrupt) unexplained cardiac death, involving cardiac arrest or no evidence of a non-coronary cause of death
  d. Prevalent MI is considered to last from the onset of the event to 28 days after the event and is divided into an acute phase (0-2 days) and subacute (3-28 days).

2. Chronic IHD:
  
  a. Angina; clinically diagnosed stable exertional angina pectoris or definite angina pectoris according to the Rose Angina Questionnaire, physician diagnosis, or taking nitrate medication for the relief of chest pain.
  b. Asymptomatic ischaemic heart disease following myocardial infarction; survival to 28 days following incident MI. The GBD study does not use estimates based on ECG evidence for prior MI, due to its limited specificity and sensitivity.
  c. Heart failure due to ischemic heart disease; The GBD case definition for heart failure impairment data sources includes studies in which heart failure was diagnosed clinically using structured criteria such as the Framingham or European Society of Cardiology criteria. Beginning in GBD 2016, we used ACC/AHA Stage C and above to capture both persons who are currently symptomatic and those who have been diagnosed with heart failure but are currently asymptomatic. 

[Framingham]_
[Cardiology]_

**Input data:**\

Other than inpatient hospital and inpatient claims data, we did not include any data from sources other than the literature for myocardial infarction. 

The primary input for the asymptomatic ischaemic heart disease following myocardial infarction model are 28-day survivors calculated from the excess mortality estimates for the myocardial infarction model. We included data for excess mortality and standardised mortality ratio to inform the estimates of survival after myocardial infarction.

For angina, the data sources used include literature data, survey data, and U.S. claims data (but we did not include inpatient hospital data from any locations). All outpatient data were excluded as they were implausibly low for all locations when compared with literature and claims data.

For heart failure, the data sources used include literature data, survey data, and administrative hospital and claims data.

**Severity split inputs:**\

Acute myocardial infarction was split into two severity levels by length of time since the event – days 1 and 2 versus days 3 through 28. Disability weights were established for these two severities using the standard approach for GBD. 

.. list-table:: Severity distribution for acute myocardial infarction
   :widths: 15 25 12
   :header-rows: 1

   * - Severity level
     - Lay description
     - DW (95% CI)
   * - Acute myocardial infarction, days 1-2
     - Has severe chest pain that becomes worse with any physical activity. The person feels nauseated, short of breath, and very anxious
     - 0.432 (0.288–0.579)
   * - Acute myocardial infarction, days 3-28 
     - Gets short of breath after heavy physical activity, and tires easily, but has no problems when at rest. The person has to take medication every day and has some anxiety. 
     - 0.074 (0.049–0.105)

Asymptomatic ischaemic heart disease following myocardial infarction was all assigned to the asymptomatic severity level. No disability weight is assigned to this level. 

.. list-table:: Severity distribution for asymptomatic ischaemic heart disease following myocardial infarction
   :widths: 15 25 12
   :header-rows: 1

   * - Severity level
     - Lay description
     - DW (95% CI)
   * - Asymptomatic ischaemic heart disease
     - 
     - 0.0

Angina was split into asymptomatic, mild, moderate, and severe groups using information from MEPS. Disability weights were established for these severities using the standard approach for GBD 2019. 

.. list-table:: Severity distribution for angina pectoris
   :widths: 15 25 12
   :header-rows: 1

   * - Severity level
     - Lay description
     - DW (95% CI)
   * - Asymptomatic angina
     - 
     - 0.0
   * - Mild angina
     - Has chest pain that occurs with strenuous physical activity, such as running or lifting heavy objects. After a brief rest, the pain goes away.
     - 0.033 (0.02–0.052)
   * - Moderate angina
     - Has chest pain that occurs with moderate physical activity, such as walking uphill or more than half a kilometer (around a quarter-mile) on level ground. After a brief rest, the pain goes away.
     - 0.08 (0.052–0.113)
   * - Severe angina
     - Has chest pain that occurs with minimal physical activity, such as walking only a short distance. After a brief rest, the pain goes away. The person avoids most physical activities because of the pain.
     - 0.167 (0.11–0.24)

Heart failure estimates were split into asymptomatic, mild, moderate, and severe heart failure based on the standard GBD 2019 approach to  analysis of MEPS data, with the exception of Chagas disease. MEPS is the only available population-based source that links EQ5D to ICD codes, allowing the application of GBD’s standard disability methods. For Chagas, which is not represented in MEPS, we based the severity splits on a meta-analysis of NYHA class among persons diagnosed with heart failure due to Chagas disease in areas where Chagas is endemic. Disability weights were established for these severities using the standard approach for GBD 2020.

.. list-table:: Severity distribution for heart failure
   :widths: 15 25 12
   :header-rows: 1

   * - Severity level
     - Lay description
     - DW (95% CI)
   * - Controlled, medically managed heart failure
     - Has been diagnosed with clinical heart failure, a chronic disease that requires medication every day and causes some worry but minimal interference with daily activities.
     - 0.049 (0.031-0.072)
   * - Mild heart failure
     - Is short of breath and easily tires with moderate physical activity, such as walking uphill or more than a quarter‐mile on level ground. The person feels comfortable at rest or during activities requiring less effort. 
     - 0.041 (0.026–0.062)
   * - Moderate heart failure
     - Is short of breath and easily tires with minimal physical activity, such as walking only a short distance. The person feels comfortable at rest but avoids moderate activity.
     - 0.072 (0.047–0.103)
   * - Severe heart failure
     - Is short of breath and feels tired when at rest. The person avoids any physical activity, for fear of worsening the breathing problems. 
     - 0.179 (0.122–0.251)

[endemic]_

[GBD-2019-Capstone-Appendix-IHD]_

GBD 2019 Fatal Modeling Strategy
++++++++++++++++++++++++++++++++

**Input data:**\

Vital registration and verbal autopsy data were used to model ischaemic heart disease.

[GBD-2019-Capstone-Appendix-IHD]_

Cause Hierarchy
+++++++++++++++
.. image:: cause_hierarchy_ihd.svg

Restrictions
++++++++++++

The following table describes any restrictions in GBD 2019 on the effects of
this cause (such as being only fatal or only nonfatal), as well as restrictions
on the ages and sexes to which the cause applies.

.. list-table:: GBD 2019 Cause Restrictions
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     - False
     -
   * - Female only
     - False
     -
   * - YLL only
     - False
     -
   * - YLD only
     - False
     -
   * - YLL age group start
     - 15
     - [15, 20), age_group_id=8
   * - YLL age group end
     - 125
     - [95, 125 years), age_group_id=235
   * - YLD age group start
     - 15
     - [15, 20), age_group_id=8
   * - YLD age group end
     - 125
     - [95, 125 years), age_group_id=235


Vivarium Modeling Strategy
--------------------------

Scope
+++++

The aspects of the disease this cause model is designed to simulate are the states, transitions, and sequelae. The Vivarium model of IHD has been of a similar design to GBD 2019 by modeling IHD using MI sequelae to estimate the prevalence of IHD. Like GBD 2019, Vivarium's design includes several states:

  a) Acute myocardial infarction ('Acute MI' or AMI) is captured by two GBD sequelae and simulants should have myocardial infarction at the GBD IHD cause-level incidence rate. Vivarium's design of 'Acute MI' is modeled exactly after GBD 2019's 'Acute MI' case definition and informed by the GBD 2019 "Myocardial infarction due to ischemic heart disease - EMR comparison" DisMod model and sequelae.
  b) Post-MI is a state entered by survivors of AMI. Vivarium's design of 'Post MI' is modeled after part B of GBD 2019's 'Chronic IHD' case definition, which is captured in GBD as the "Asymptomatic Ischemic Heart Disease following myocardial infarction" DisMod model and sequelae.
  c) Angina, or stable coronary artery disease, is modeled after part A of GBD 2019's 'Chronic IHD' case definition. It is a state entered by individuals based on the incidence rate of the "angina due to ischemic heart disease" DisMod model and sequelae.
  d) Heart failure due to IHD, also known as ischemic cardiomyopathy, is modeled after part C of GBD 2019's 'Chronic IHD' case definition. It is a state entered by individuals based on the incidence rate of the 'Heart failure impairment envelope' multiplied by the proportion of incidence of heart failure that is due to ischemic heart disease.

Assumptions and Limitations
+++++++++++++++++++++++++++

The risk factor of BMI, SBP, LDL cholesterol, smoking, FPG, physical inactivity, total alcohol intake, processed meats, and sugar sweetened beverage could all affect the transition rates 1, 3, and 4, listed below, through the measures of incidence described in the table.

Cause Model Diagram
+++++++++++++++++++

MI
"""""""""""

.. image:: cause_model_ami.svg

Angina
"""""""""""

.. image:: cause_model_angina.svg

Heart Failure due to IHD
"""""""""""""""""""""""""""""""""

.. image:: cause_model_hf_ihd.svg

State and Transition Data Tables
++++++++++++++++++++++++++++++++

Definitions
"""""""""""

.. list-table:: State Definitions
   :widths: 1, 10, 15
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S1
     - **S**\ usceptible
     - Susceptible to IHD; S1 used in the AMI cause diagram, currently do not model natural history for IHD so do not track how people enter the AMI state (e.g. as first clinical event or following a diagnosis of angina)
   * - AMI
     - **A**\ cute **M**\ yocardial **I**\ nfarction (AMI)
     - Simulant that experiences acute MI symptoms
   * - P
     - **P**\ ost-MI IHD
     - Simulant that experiences angina and asymptomatic ischemic heart
       disease following myocardial infarction; survival to 28 days following
       incident MI
   * - S2
     - **S**\ usceptible
     - Susceptible to IHD; S2 used in the angina cause diagram, currently do not model natural history for IHD so do not track how people enter the angina state (e.g. as first clinical diagnosis of stable coronary artery disease or following an AMI)
   * - SA
     - **A**\ ngina
     - Simulant that experiences anginal symptoms
   * - S3
     - **S**\ usceptible
     - Susceptible to IHD; S3 used in the HF due to IHD cause diagram, currently do not model natural history for IHD so do not track how people enter the HF state (e.g. as first clinical diagnosis of coronary artery disease or following an AMI)
   * - HF\ :sub:`IHD`
     - **H**\ eart **F**\ ailure
     - Simulant that experiences symptoms of heart failure consistent with Framingham, European Society of Cardiology, or other structured criteria. This model is explicitly for HF due to IHD/coronary artery disease, also referred to as ischemic cardiomyopathy.

States Data
"""""""""""

.. list-table:: State Data
   :widths: 5 10 10 20
   :header-rows: 1

   * - State
     - Measure
     - Value
     - Notes
   * - All
     - cause-specific mortality rate
     - :math:`\frac{\text{deaths_c493}}{\text{population}}`
     - Post-CoDCorrect CSMR
   * - S1
     - prevalence
     - :math:`\text{1−(prevalence_s378 + prevalence_s379 + prevalence_s1040)}`
     - Simulants without prevalent AMI or PostMI; may have other forms of acute or chronic IHD
   * - AMI
     - prevalence
     - :math:`\sum\limits_{s\in acute-sequelae} \text{prevalence}_s`
     - There are two acute sequelae
   * - AMI
     - excess mortality rate
     - emr_m24694
     -
   * - AMI
     - disability weight
     - :math:`\frac{1}{\text{prevalence_s378 + prevalence_s379}} \cdot \sum\limits_{s\in acute-sequelae} \text{disability_weight}_s \cdot \text{prevalence}_s`
     -
   * - P
     - prevalence
     - :math:`\sum\limits_{s\in post-mi-sequelae} \text{prevalence}_s`
     - this is the prevalence generated after exclusivity adjustment for 
   * - P
     - excess mortality rate
     - emr_m15755
     -
   * - P
     - disability weight
     - :math:`\frac{1}{\text{prevalence_s1040}} \cdot \sum\limits_{s\in post-AMI-sequelae} \text{disability_weight}_s \cdot \text{prevalence}_s`
     -
   * - S2
     - prevalence
     - :math:`\text{1−(prevalence_s953 + prevalence_s380 + prevalence_s381 + prevalence_s382)}`
     - Simulants without prevalent angina; may have other forms of acute or chronic IHD
   * - SA
     - prevalence
     - :math:`\sum\limits_{s\in angina-sequelae} \text{prevalence}_s`
     - sum of the angina sequelae
   * - SA
     - excess mortality rate
     - emr_m1817
     -
   * - SA
     - disability weight
     - :math:`\frac{1}{\text{prevalence_s953 + prevalence_s380 + prevalence_s381 + prevalence_s382}} \cdot \sum\limits_{s\in angina-sequelae} \text{disability_weight}_s \cdot \text{prevalence}_s`
     -
   * - S3
     - prevalence
     - :math:`\text{1−(prevalence_s5726 + prevalence_s383 + prevalence_s384 + prevalence_s385)}`
     - Simulants without prevalent heart failure; may have other forms of acute or chronic IHD
   * - HF\ :sub:`IHD`
     - prevalence
     - :math:`\sum\limits_{s\in HF-sequelae} \text{prevalence}_s`
     - sum of the HF due to IHD sequelae
   * - HF\ :sub:`IHD`
     - excess mortality rate
     - emr_m2412
     - assumption is that excess mortality is similar across etiologies
   * - HF\ :sub:`IHD`
     - disability weight
     - :math:`\frac{1}{\text{prevalence_s5726 + prevalence_s383 + prevalence_s384 + prevalence_s385}} \cdot \sum\limits_{s\in HF-sequelae} \text{disability_weight}_s \cdot \text{prevalence}_s`
     -  

Transition Data
"""""""""""""""

.. list-table:: Transition Data
   :widths: 10 10 10 10 10
   :header-rows: 1

   * - Transition
     - Source State
     - Sink State
     - Value
     - Notes
   * - 1
     - S1
     - AMI
     - :math:`\frac{\text{incidence_m24694}}{1-\text{(prevalence_s378 + prevalence_s379})}`
     - 
   * - 2
     - AMI
     - P
     - 28 days
     - duration-based transition from acute state then progress into post state
   * - 3
     - P
     - AMI
     - :math:`\frac{\text{incidence_m24694}}{1-\text{(prevalence_s378 + prevalence_s379})}`
     - current assumption is that rates 1 and 3 are equal
   * - 4
     - S2
     - SA
     - :math:`\frac{\text{incidence_m1817}}{1-\text{(prevalence_s953 + prevalence_s380 + prevalence_s381 + prevalence_s382)})}`
     - 
   * - 5
     - S3
     - HF\ :sub:`IHD`
     - :math:`\frac{\text{incidence_m2412}}{(1-\text{(prevalence_s5726 + prevalence_s383 + prevalence_s384 + prevalence_s385)})} \cdot` propHF\ :sub:`IHD`
     - 

Data Sources
""""""""""""

.. list-table:: Data Sources and Definitions
   :widths: 10 10 20 20
   :header-rows: 1

   * - Variable
     - Source
     - Description
     - Notes
   * - prevalence_c493
     - como
     - prevalence of ischemic heart disease
     -
   * - deaths_c493
     - codcorrect
     - Count of deaths due to ischemic heart disease
     -
   * - population
     - demography
     - Mid-year population for given sex/age/year/location
     -
   * - prevalence_s{sid}
     - como
     - Prevalence of sequela with id {id}
     -
   * - disability_weight_s{sid}
     - YLD appendix
     - Disability weight of sequela with id {id}
     -
   * - :math:`\frac{\text{incidence_m24694}}{(1-\text{(prevalence_s378 + prevalence_s379)})}`
     - dismod-mr, como
     - Incidence of MI due to ischemic heart disease
     - 
   * - :math:`\frac{\text{incidence_m1817}}{(1-\text{(prevalence_s953 + prevalence_s380 + prevalence_s381 + prevalence_s382)})}`
     - dismod-mr, como
     - Incidence of angina due to ischemic heart disease
     - 
   * - :math:`\frac{\text{incidence_m2412}}{(1-\text{(prevalence_s5726 + prevalence_s383 + prevalence_s384 + prevalence_s385)})} \cdot` propHF\ :sub:`IHD`
     - dismod-mr, como
     - Incidence of heart failure due to ischemic heart disease
     - 
   * - emr_m15755
     - dismod-mr
     - excess-mortality rate of post-MI ischemic heart disease
     -
   * - emr_m24694
     - dismod-mr
     - excess-mortality rate of MI due to ischemic heart disease
     -
   * - emr_m1817
     - dismod-mr
     - excess-mortality rate of angina due to ischemic heart disease
     -
   * - emr_m2412
     - dismod-mr
     - excess-mortality rate of overall heart failure
     -
   * - AMI sequelae
     - model assumption
     - {s378, s379}
     -
   * - PostMI sequelae
     - model assumption
     - {s1040}
     -
   * - Stable Angina sequelae
     - model assumption
     - {s380, s381, s382, s953}
     -
   * - Heart failure due to IHD sequelae
     - model assumption
     - {s383, s384, s385, s5726}
     -

Validation Criteria
+++++++++++++++++++

At the IHD cause level:

  - Validate that the simulation comes up with rates within X% of the GBD estimates for age-/sex-specific incidence, prevalence, excess mortality, cause-specific mortality, and all-cause mortality rates
  - Is CSMR close to last known GBD2019 CSMR? Is it close to FHS CSMR for the same year?

References
----------

.. [NIH_IHD] Coronary Heart Disease. National Health Lung and Blood Institute, U.S. Department of Health.
   Retrieved 28 June 2021.
   https://www.nhlbi.nih.gov/health-topics/coronary-heart-disease.

.. [Framingham] McKee et al. N Engl J Med 1971; 285:1441-1446.

.. [Cardiology] Eur Heart J 2016; 37 (27): 2129-2200.

.. [endemic] Sabino EC, Ribeiro AL, et al, 
   Ten-year incidence of Chagas cardiomyopathy among asymptomatic Trypanosoma cruzi-seropositive former blood donors. Circulation. 2013 Mar 12;127(10):1105-15. Ribeiro AL et al. Brain natriuretic peptide and left ventricular dysfunction in Chagas' disease.  Lancet. 2002 Aug 10;360(9331):461-2. Ribeiro AL, personal communication. NYHA Class Information in a Cohort of Chagas dilated cardiomyopathy; Hospital das Clínicas da UFMG. Ribeiro AL, personal communication. Cohort of patients  attending the Chagas’ disease outpatient clinic of Evandro Chagas Hospital (Oswaldo Cruz Foundation, Rio de Janeiro, Brazil).

.. [GBD-2019-Capstone-Appendix-IHD]
   Appendix_ to: `GBD 2019 Diseases and Injuries Collaborators. Global burden of 369 diseases and injuries in 204 countries and territories, 1990–2019: a systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 17 Oct 2020;396:1204-1222`

.. _Appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30925-9/attachment/deb36c39-0e91-4057-9594-cc60654cf57f/mmc1.pdf