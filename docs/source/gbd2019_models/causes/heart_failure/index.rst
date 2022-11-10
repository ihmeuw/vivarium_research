.. _2019_cause_heart_failure:

=============
Heart Failure
=============

In the GBD, heart failure is considered an impairment and the fatal and nonfatal burden is 
assigned to the causes identified as etiologies for the impairment. For this project, we 
are modeling HF due to :ref:`ischemic heart disease <2019_cause_ihd>` as part of the cause. 
The remainder of heart failure is modeled as a separate "cause". This document describes the 
overall heart failure modeling process and provides details for the simulation inputs for 
the residual category. Residual in this case refers to all heart failure that is NOT a 
result of IHD. 

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - HF
    - Heart failure
    - 

Disease Overview
----------------

Heart failure is a condition in which the heart can't pump enough blood to meet the body's needs. In some cases, the heart can't fill with enough blood, while in others, the heart can't pump blood to the rest of the body with enough force. Some people have both problems. 

Heart failure develops over time as the heart's pumping action grows weaker. It can affect one or both sides of your heart. Right-side heart failure occurs if the heart can't pump enough blood to the lungs to pick up oxygen. Left-side heart failure occurs if the heart can't pump enough oxygen-rich blood to the rest of the body. Left-sided and right-sided heart failure may have different causes. Right-side heart failure may cause fluid to build up in the feet, ankles, legs, liver, abdomen, and the veins in the neck. Right-side and left-side heart failure also may cause shortness of breath and fatigue (tiredness). 

The leading causes of heart failure are diseases that damage the heart. Examples include ischemic heart disease, high blood pressure, and chronic obstructive pulmonary disease. 

[NHLBI-HF]_
[AHA-HF]_


GBD 2019 Modeling Strategy
--------------------------

GBD 2019 Non-Fatal Modeling Strategy
++++++++++++++++++++++++++++++++++++

**Case definitions:**\

Heart failure was diagnosed clinically using structured criteria such as the Framingham or European Society of Cardiology criteria. Previous iterations of GBD modelled symptomatic (i.e., NYHA Class II and above) episodes of HF only. Beginning in GBD 2016, we used ACC/AHA Stage C and above to capture both persons who are currently symptomatic and those who have been diagnosed with heart failure but are currently asymptomatic. 

Framingham Criteria: Must fulfill two major criteria or one major and two minor criteria.

Major criteria: Paroxysmal nocturnal dyspnoea, neck vein distention, rales, radiographic cardiomegaly, acute pulmonary oedema, S3 gallop, increased central venous pressure (>16 cm H\ :sub:`2`\O at right atrium), hepatojugular reflux; weight loss >4.5 kg in 5 days in response to treatment

Minor criteria: bilateral ankle oedema, nocturnal cough, dyspnoea on ordinary exertion, hepatomegaly, pleural effusion, decrease in vital capacity by one-third from maximum recorded, tachycardia (heart rate>120 beats/min).  
[Framingham-HF]_

European Society of Cardiology: Typical signs (elevated jugular venous pressure, pulmonary crackles and peripheral oedema) and symptoms (eg, breathlessness, ankle swelling, and fatigue) caused by a structural and/or functional cardiac abnormality, resulting in a reduced cardiac output and/or elevated intracardiac pressures at rest or during stress. 
[Cardiology-HF]_

**Input data and data processing:**\

We used literature data plus inpatient hospital data and claims to model the overall heart failure envelope. Additionally, we used the following data sources to estimate the proportion of heart failure attributable to each etiology: Vital Registry data from Mexico, Brazil, Taiwan, Colombia, and the US; Inpatient admissions from Friuli Venezia, Italy; and Linked Vital Registry data from Friuli Venezia, Italy. 

**Modelling strategy:**\

To estimate the burden of heart failure due to each of the underlying causes 
of heart failure, we first estimated the overall prevalence of heart failure 
and then the proportion of heart failure that could be attributed to each cause. 
The latter process includes an initial assessment of the fraction of heart 
failure cases attributable to each of six high‐level parent cause groupings, 
followed by further division into the detailed causes within each of these groupings. 

Etiological fraction estimation:

To estimate the proportion of heart failure attributable to each cause, we used Equation 1 to calculate the prevalence of heart failure due to each etiology, which was then scaled into a proportion. 

Equation 1:
:math:`\text{Prevalence}_{HF due to aetiology} = \frac{\text{Cause Specific Mortality Rate}_{HF due to aetiology}}{\text{Excess Mortaltiy Rate}_{HF due to aetiology}}`

First, we calculated the Cause Specific Mortality Rate (CSMR) for heart failure due to each etiology. We used age-, sex-, and location-specific CSMR (post CoDCorrect) for each etiology, multiplied by the fraction of deaths that also involved heart failure (Equation 2). This fraction was a modeled quantity, informed by person-level vital registry (VR) data from the United States, Mexico, Brazil, Taiwan, and Colombia, data sources which contained the underly­­ing cause of death as well as all codes in the causal chain. From these sources, we calculated the fraction of underlying deaths from each etiology in which heart failure was coded in the causal chain. These data were modeled in MR-BRT to generate age- and sex-specific estimates of this proportion. For Hypertensive Heart Disease, Alcoholic Cardiomyopathy, and Other Cardiomyopathy, we set the proportion to be 1, as all deaths due to these causes involve heart failure.  

Equation 2: 
:math:`\text{CSMR}_{HF due to aetiology} = \text{CSMR}_{aetiology} \times \text{Proportion deaths with HF}_{aetiology}`

Next, we estimated the Excess Mortality Rate (EMR) for heart failure due to each etiology. We used uniquely identified person-level hospital discharge data for the entire Italian region of Friuli Venezia Giulia, linked to all death records from the region. Inpatient data contained all primary and non-primary diagnoses associated with the visit, and mortality data contained the underlying cause of death as well as all codes in the causal chain. We identified patients with heart failure due to each etiology as individuals with hospital coded heart failure concurrent or after a hospital code of the etiology. Excess Mortality Rate for heart failure due to each etiology was calculated by subtracting the background mortality rate from the mortality rate of persons with heart failure due to that etiology. We modelled this quantity in MR-BRT to generate age- and sex-specific estimates of this value. Due to small number of deaths in younger ages, we assumed equal EMR across etiologies for ages under 45. 

We calculated the prevalence of Heart Failure due to each etiology using Equation 1. These were scaled to sum to one, generating the estimated proportions of Heart Failure due to each etiology.

These proportions, along with literature data, were used to inform DisMod models for the six broadest and mutually exclusive and collectively exhaustive cause groupings: ischemic heart disease, hypertensive heart disease, cardiomyopathy and myocarditis, rheumatic heart disease, cardiopulmonary disease, and other cardiovascular and circulatory diseases. An exception to this approach was made for sub-Saharan Africa, where we excluded the proportion estimates generated from death data, relying instead on published literature to determine the proportions of heart failure etiologies. This decision was based on expert opinion that local patterns differed significantly from what would have been determined from death data. The THESUS‐HF study, a large-scale, prospective, echocardiographic study of heart failure etiologies in multiple African countries, provided these proportions.  
[THESUS-HF]_

The results of these six proportion models were scaled to sum to one.  

For heart failure due to cardiopulmonary disease, heart failure due to cardiomyopathy and myocarditis, and heart failure due to other causes, we calculated the proportion for each sub-cause according to the proportion of that cause within each larger aggregate group. 

**Severity splits and disability weights:**\

These estimates were then split into: treated (same as controlled or medically managed); mild; moderate; and severe heart failure based on an analysis of MEPS data. 

.. list-table:: Severity levels for Heart Failure in GBD 2019 and the associated disability weight (DW)
   :widths: 15 25 12
   :header-rows: 1

   * - Severity level
     - Lay description
     - DW (95% CI)
   * - Treated (also seen as controlled, medically managed)
     - Has been diagnosed with clinical heart failure, a chronic disease that requires medication every day and causes some worry but minimal interference with daily activities. 
     - 0.049 (0.031-0.072)
   * - Mild
     - Is short of breath and easily tires with moderate physical activity, such as walking uphill or more than a quarter‐mile on level ground. The person feels comfortable at rest or during activities requiring less effort.  
     - 0.041 (0.026-0.062)
   * - Moderate
     - Is short of breath and easily tires with minimal physical activity, such as walking only a short distance. The person feels comfortable at rest but avoids moderate activity.  
     - 0.072 (0.047-0.103)
   * - Severe
     - Is short of breath and feels tired when at rest. The person avoids any physical activity, for fear of worsening the breathing problems.  
     - 0.179 (0.122-0.251)

GBD 2019 Fatal Modeling Strategy
++++++++++++++++++++++++++++++++

In GBD, heart failure is an impairment; deaths coded to heart failure by the reporting organization are reassigned to the underlying etiology by a process of redistribution. No estimates of mortality due to heart failure are produced by CODEm or CoDCorrect.

For this simulation, as simulants will be assigned to the heart failure state with an associated EMR, there will be deaths due to heart failure. This does not have a direct GBD comparison and should be validated carefully to ensure it matches expectations. 

Restrictions
++++++++++++

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
     - True
     -
   * - YLL age group start
     - N/A
     -
   * - YLL age group end
     - N/A
     -
   * - YLD age group start
     - 0
     - [0, 7 days), age_group_id=2
   * - YLD age group end
     - 125
     - [95, 125 years), age_group_id=235

Vivarium Modeling Strategy
--------------------------

Scope
+++++

Heart failure incidence rate will be from the heart failure envelope DisMod model 
multiplied by the proportion of incidence that is due to all causes other than 
ischemic heart disease. Heart failure due to IHD is included in IHD instead. 
Individuals will then experience the EMR from the heart failure envelope model 
once they are in this state. They will receive the HF disability weights while 
in this state.  

Heart failure incidence should be modified by SBP levels as per the following age-specific 
pooled cohort analysis_. LDL-C level is assumed not to affect heart failure in this simulation. 


.. _analysis: https://www.jacc.org/doi/full/10.1016/j.jacc.2019.03.529

The relative risks can be utilized by SBP group based on this tables: 

.. list-table:: Relative risk of heart failure for SBP 
   :widths: 5 5 20
   :header-rows: 1

   * - SBP Group 
     - Relative Risk 
     - Notes 
   * - <120
     - Reference group  
     - 
   * - 120-129 
     - 1.27 (1.13, 1.43) 
     - 
   * - 130-139 
     - 1.5 (1.3, 1.73) 
     - 
   * - 140+ 
     - 1.76 (1.43, 2.17) 
     - 

.. todo::
  
  Add in heart failure due to BMI and FPG 


Assumptions and Limitations
+++++++++++++++++++++++++++

The excess mortality for all simulants with HF will be the EMR of the HF envelope, undifferentiated by etiology.  

Cause Model Diagram
+++++++++++++++++++

.. image:: cause_model_hf_residual.svg

State and Transition Data Tables
++++++++++++++++++++++++++++++++

Definitions
"""""""""""

.. list-table:: State Definitions
   :widths: 5 5 20
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - **S**\ usceptible to HF
     - Simulant that has not already had a HF event
   * - HF
     - **H**\ eart **F**\ ailure
     - HF is a chronic condition that does not remit and can only be left by death


States Data
"""""""""""

.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - S
     - prevalence
     - :math:`\text{1−(prevalence_m2412} \times \text{propHF_RESID)}` 
     - 
   * - HF
     - prevalence
     - :math:`\text{prevalence_m2412} \times \text{propHF_RESID}`
     - Proportion of prevalence from the overall HF envelope due to the residual category
   * - HF
     - emr
     - emr_m2412
     - Excess mortality rate of the overall HF envelope
   * - HF
     - disabilty weights
     - :math:`\frac{1}{\text{prevalence_m2412} \cdot \text{propHF_RESID}} \cdot \sum\limits_{r\in rei_groups} \text{disability_weight}_r \cdot \text{prevalence}_r` 
     - 

Transition Data
"""""""""""""""

.. list-table:: Transition Data
   :widths: 10 10 10 20 30
   :header-rows: 1
   
   * - Transition
     - Source 
     - Sink 
     - Value
     - Notes
   * - 1
     - S
     - HF
     - :math:`\text{incidence_m2412} \times \text{propHF_RESID}`
     - 

Data Sources
""""""""""""

.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Measure
     - Sources
     - Description
     - Notes
   * - prevalence_m2412
     - como
     - Prevalence of HF
     - All HF-related sequelae
   * - incidence_m2412
     - como
     - Incidence of overall HF
     -
   * - propHF_RESID
     - CVD team
     - Proportion of HF that is due to the residual category
     - `Proportion file here <https://github.com/ihmeuw/vivarium_nih_us_cvd/tree/main/src/vivarium_nih_us_cvd/data>`_  
   * - population
     - demography
     - Mid-year population for given age/sex/year/location
     - 
   * - rei_RESID
     - gbd_mapping
     - List of HF rei groups 
     - 
   * - prevalence_r{`rei_id`}
     - como
     - Prevalence of rei_ids: 379, 217, 218, 219
     - 
   * - disability_weight_r{`rei_id`}
     - YLD appendix
     - Disability weight of rei_ids: 379, 217, 218, 219 
     - 
   * - emr_m2412
     - dismod-mr 2.1
     - excess mortality rate of heart failure
     - This is the EMR value for the overall HF envelope
   * - Rei IDs 
     - Impariment definition
     - LList of HF rei’s for the combined etiologies 
     - 379, 217, 218, 219 for treated, mild, moderate, and severe 


Validation Criteria
+++++++++++++++++++

1. Comparison with HF prevalence from GBD 2019 for all causes except for IHD 
2. Comparison of heart failure deaths with cause-specific mortality estimates from the HF DisMod envelope 

References
----------

.. [NHLBI-HF] Heart Failure. National Health Lung and Blood Institute, U.S. Department of Health.
   Retrieved 13 August 2021.
   https://www.nhlbi.nih.gov/health-topics/heart-failure#:~:text=Heart%20failure%20is%20a%20condition,Some%20people%20have%20both%20problems

.. [AHA-HF] What is Heart Failure? www.heart.org, American Heart Association.
   Retrieved 13 August 2021.
   https://www.heart.org/en/health-topics/heart-failure/what-is-heart-failure

.. [Framingham-HF] McKee et al. N Engl J Med 1971; 285:1441-1446.

.. [Cardiology-HF] Eur Heart J 2016; 37 (27): 2129-2200.

.. [THESUS-HF] Damasceno, A., Mayosi, B. M., Sani, M., Ogah, O. S., Mondo, C., Ojji, D., ... & Sliwa, K. (2012). 
   The causes, treatment, and outcome of acute heart failure in 1006 Africans from 9 countries: results of the sub-Saharan Africa survey of heart failure. Archives of internal medicine, 172(18), 1386-1394.
   https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/1356531