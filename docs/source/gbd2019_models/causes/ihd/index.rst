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


**Input data:**\

Other than inpatient hospital and inpatient claims data, we did not include any data from sources other than the literature for myocardial infarction. 

The primary input for the asymptomatic ischaemic heart disease following myocardial infarction model are 28-day survivors calculated from the excess mortality estimates for the myocardial infarction model. We included data for excess mortality and standardised mortality ratio to inform the estimates of survival after myocardial infarction.

For angina, the data sources used include literature data, survey data, and U.S. claims data (but we did not include inpatient hospital data from any locations). All outpatient data were excluded as they were implausibly low for all locations when compared with literature and claims data.

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

[GBD-2019-Capstone-Appendix-IHD]_

GBD 2019 Fatal Modeling Strategy
++++++++++++++++++++++++++++++++

**Input data:**\

Vital registration and verbal autopsy data were used to model ischaemic heart disease.

[GBD-2019-Capstone-Appendix-IHD]_

Cause Hierarchy
+++++++++++++++
.. image:: cause_hierarchy_ihd_NO_HF.svg

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

  a) Acute myocardial infarction ('Acute MI' or AMI) is a GBD sequela and simulants should have myocardial infarction at the GBD incidence rate. Vivarium's design of 'Acute MI' is modeled exactly after GBD 2019's 'Acute MI' case definition and informed by the GBD 2019 "Myocardial infarction due to ischemic heart disease - EMR comparison" DisMod model and sequelae.
  b) Post-MI is a state entered by survivors of AMI. Vivarium's design of 'Post MI' is modeled exactly after GBD 2019's 'Chronic IHD' case definition, which is captured in GBD as the "Asymptomatic Ischemic Heart Disease following myocardial infarction" DisMod model and sequelae.
  c) Angina (stable coronary artery disease) is a state entered by individuals based on the incidence rate of the "angina due to ischemic heart disease" DisMod model and sequelae.

Assumptions and Limitations
+++++++++++++++++++++++++++

The risk factor of BMI, SBP, LDL cholesterol, smoking, FPG, physical inactivity, total alcohol intake, processed meats, and sugar sweetened beverage could all affect the transition rates 1, 3, and 4, listed below, through the measures of incidence described in the table.

Cause Model Diagram
+++++++++++++++++++

.. image:: cause_model_ihd_simple_noHF.svg

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
     - Susceptible to IHD
   * - AMI
     - **A**\ cute **M**\ yocardial **I**\ nfarction (AMI)
     - Simulant that experiences acute MI symptoms
   * - P\ :sub:`AMI`\
     - **P**\ ost-**AMI**\  IHD
     - Simulant that experiences angina, heart failure due to IHD, and asymptomatic ischemic heart
       disease following myocardial infarction; survival to 28 days following
       incident MI
   * - S2
     - **S**\ usceptible
     - Susceptible to IHD
   * - SA
     - **S**\ table **A**\ ngina
     - Simulant that experiences angina symptoms

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
     - 1 - (prevalence_s378 + prevalence_s379 + prevalence_s1040)
     - 
   * - AMI
     - prevalence
     - :math:`\sum\limits_{s\in sequelae} \text{prevalence}_s`
     - There are 2 acute sequelae
   * - AMI
     - excess mortality rate
     - emr_m24694
     -
   * - AMI
     - disability weight
     - :math:`\frac{1}{\text{prevalence_s378 + prevalence_s379}} \times \sum\limits_{s\in sequelae} \text{disability_weight}_s \cdot \text{prevalence}_s`
     - There are 2 acute sequelae with disability weights
   * - P\ :sub:`AMI`\
     - prevalence
     - prevalence_s1040
     - This is the prevalence of post-MI; includes HF and some angina
   * - P\ :sub:`AMI`\
     - excess mortality rate
     - emr_m15755
     -
   * - P\ :sub:`AMI`\
     - disability weight
     - :math:`\frac{1}{\text{prevalence_s1040}} \times \sum\limits_{s \in sequelae} \text{disability_weight}_s \cdot \text{prevalence}_s`
     - There is one sequelae for asymptomatic IHD; does not quite match with what's being modeled in 15755
   * - S2
     - prevalence
     - 1 - (prevalence_s380 + prevalence_s381 + prevalence_s382 + prevalence_s953)
     - Summation of the prevalence of 4 angina sequelae
   * - SA
     - prevalence
     - :math:`\sum\limits_{s\in sequelae} \text{prevalence}_s`
     - There are 4 chronic sequelae that map to stable agnina
   * - SA
     - excess mortality rate
     - emr_m1817
     -
   * - SA
     - disability weight
     - :math:`\frac{1}{\text{prevalence_s380 + prevalence_s381 + prevalence_s382 + prevalence_s953}} \times \sum\limits_{s\in sequelae} \text{disability_weight}_s \cdot \text{prevalence}_s`
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
     - :math:`\frac{\text{incidence_m24694}}{(1-\text{prevalence_s378 + prevalence_s379})}`
     - Acute MI is prevalent enough in older ages to warrant including the correction from "population rate" to "susceptible rate"
   * - 2
     - AMI
     - P\ :sub:`AMI`\
     - 28 days
     - duration-based progression from acute state into post state
   * - 3
     - P\ :sub:`AMI`\
     - AMI
     - :math:`\frac{\text{incidence_m24694}}{(1-\text{prevalence_s378 + prevalence_s379})}`
     - Acute MI is prevalent enough in older ages to warrant including the correction from "population rate" to "susceptible rate"
   * - 4
     - S2
     - SA
     - :math:`\frac{\text{incidence_m1817}}{(1-\text{prevalence_s380 + prevalence_s381 + prevalence_s382 + prevalence_s953})}`
     - Stable angina is prevalent enough in older ages to warrant including the correction from "population rate" to "susceptible rate"

Data Sources
""""""""""""

.. list-table:: Data Sources and Definitions
   :widths: 10 10 20 20
   :header-rows: 1

   * - Variable
     - Source
     - Description
     - Notes
   * - population
     - demography
     - Mid-year population for given sex/age/year/location
     -
   * - prevalence_c493
     - como
     - prevalence of ischemic heart disease
     -
   * - deaths_c493
     - codcorrect
     - Count of deaths due to ischemic heart disease
     -
   * - prevalence_s378 + prevalence_s379
     - como
     - Prevalence of AMI
     -
   * - prevalence_s378 + prevalence_s379 + prevalence_s1040
     - como
     - Prevalence of AMI + P\ :sub:`AMI`\
     -
   * - prevalence_s380 + prevalence_s381 + prevalence_s382 + prevalence_s953
     - como
     - Prevalence of SA
     - Stable angina
   * - disability_weight_s{sid}
     - YLD appendix
     - Disability weight of sequela with id {id}
     -
   * - :math:`\frac{\text{incidence_m24694}}{(1-\text{prevalence_s378 + prevalence_s379})}`
     - dismod-mr, como
     - Incidence of MI due to ischemic heart disease
     - IHD is prevalent enough in older ages to warrant including the correction from "population rate" to "susceptible rate"
   * - :math:`\frac{\text{incidence_m1817}}{(1-\text{prevalence_s380 + prevalence_s381 + prevalence_s382 + prevalence_s953})}`
     - dismod-mr, como
     - Incidence of angina due to ischemic heart disease
     - IHD is prevalent enough in older ages to warrant including the correction from "population rate" to "susceptible rate"
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
   * - AMI sequelae
     - model assumption
     - {s378, s379}
     -
   * - P\ :sub:`AMI`\  sequelae
     - model assumption
     - {s1040}
     -
   * - SA sequelae
     - model assumption
     - {s380, s381, s382, s953}
     - Stable angina


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

.. [GBD-2019-Capstone-Appendix-IHD]
  Appendix_ to: `GBD 2019 Diseases and Injuries Collaborators. Global burden of 369 diseases and injuries in 204 countries and territories, 1990–2019: a systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 17 Oct 2020;396:1204-1222` 

.. _Appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30925-9/attachment/deb36c39-0e91-4057-9594-cc60654cf57f/mmc1.pdf