.. _2019_risk_effect_bmi:

..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1
  ---------------

  Section Level 2
  +++++++++++++++

  Section Level 3
  ^^^^^^^^^^^^^^^

  Section Level 4
  ~~~~~~~~~~~~~~~

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.


======================================
Body Mass Index
======================================


.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

Body mass index (BMI) is a person’s weight in kilograms divided by the square of height in meters (weight (kg) / [height (m)]\ :sup:`2`\). BMI is an inexpensive and easy screening method; values are frequently divided into categories: underweight (<18.5 kg/m\ :sup:`2`\), healthy weight (18.5 to 24.9 kg/m\ :sup:`2`\), overweight (25.0 to 29.9 kg/m\ :sup:`2`\), and obese (>=30.0 kg/m\ :sup:`2`\). BMI does not measure body fat directly, but it is moderately correlated with more direct measures of body fat. BMI has also been shown to be correlated with various metabolic and disease outcomes. BMI can be a screening tool, but it does not diagnose the body fatness or health of an individual.
[CDC-BMI2]_

Obesity, and body fat are known to be associated with heart disease. 
"The mechanisms through which obesity increases CVD risk involve 
changes in body composition that can affect hemodynamics and alters 
heart structure." [Carbone_2019]_ While BMI is not a direct measure of 
excess fat, it is correlated and therefore a useful proxy and easy to 
measure across individuals. 

GBD 2019 Modeling Strategy
--------------------------

Risk exposure
+++++++++++++

:ref:`See risk exposure documentation for BMI <2019_risk_bmi>`

Relative risks
++++++++++++++

BMI is a risk factor for many causes which are listed in the table 
below. For the CVD model, BMI will affect ischemic heart disease, 
ischemic stroke, and heart failure. There were no updates to GBD 
modeling of BMI for these causes. 

RRs were reported per 5 kg/m\ :sup:`2`\  increase in BMI above the TMREL value 
(20–25 kg/m\ :sup:`2`\), calculated as in the equation below: 

:math:`\text{RR(x)} = {\text{RR}_0}^{\frac{\max\left((x-\text{TMREL}), 0\right)}{\text{5 kg/m2}}}`

Where RR(x) is the RR at exposure level x and RR\ :sub:`0`\  is the 
increase in RR for each 5 kg/m\ :sup:`2`\ above the TMREL. GBD used 
DisMod-MR 2.1 to pool effect sizes from included studies and generate 
a dose-response curve for each of the outcomes associated with high SBP. 
The tool enabled GBD to incorporate random effects across studies and 
include data with different age ranges. RRs were used universally for 
all countries and the meta-regression only helped to pool the three 
major sources and produce RRs with uncertainty and covariance across 
ages taking into account the uncertainty of the data points. 

Theoretical minimum-risk exposure level
+++++++++++++++++++++++++++++++++++++++

For this model, we use the TMREL from the 2019 GBD calculations. 
This was found to be a range of 20–25 kg/m\ :sup:`2`\ based on 
The Global BMI Mortality Collaboration paper [BMI_2016]_ which 
was a meta-analysis of 239 studies. Overall mortality was found 
to increase log-linearly after this range. To include the uncertainty 
in the TMREL, we took a random draw from the uniform distribution of 
the interval between 20–25 kg/m\ :sup:`2`\ each time the population 
attributable burden was calculated. 

Vivarium Modeling Strategy
--------------------------

The risk-outcome pairs listed below are standard GBD relationships. 
The relative risks stored in the database are not location- or 
year-specific. They are age- and sex-specific. Exposure to BMI 
affects the likelihood of both morbidity and mortality from all causes 
in the table below. We will model this in Vivarium such that exposure to 
BMI will impact the incidence rates of: ischemic heart disease, ischemic 
stroke, and heart failure. The excess mortality rate for all outcomes will 
be unaffected. 


.. list-table:: All Risk-Outcome Pairs for BMI
   :widths: 11 25
   :header-rows: 1

   * - Risk
     - Outcome
   * - High Body-Mass Index
     - Esophageal cancer
   * - High Body-Mass Index
     - Liver cancer due to hepatitis B
   * - High Body-Mass Index
     - Liver cancer due to hepatitis C
   * - High Body-Mass Index
     - Liver cancer due to alcohol use
   * - High Body-Mass Index
     - Liver cancer due to other causes (internal)
   * - High Body-Mass Index
     - Breast cancer
   * - High Body-Mass Index
     - Uterine cancer
   * - High Body-Mass Index
     - Colon and rectum cancer
   * - High Body-Mass Index
     - Gallbladder and biliary tract cancer
   * - High Body-Mass Index
     - Pancreatic cancer
   * - High Body-Mass Index
     - Ovarian cancer
   * - High Body-Mass Index
     - Kidney cancer
   * - High Body-Mass Index
     - Thyroid cancer
   * - High Body-Mass Index
     - Multiple myeloma
   * - High Body-Mass Index
     - Ischemic heart disease
   * - High Body-Mass Index
     - Ischemic stroke
   * - High Body-Mass Index
     - Intracerebral hemorrhage
   * - High Body-Mass Index
     - Subarachnoid hemorrhage
   * - High Body-Mass Index
     - Hypertensive heart disease
   * - High Body-Mass Index
     - Atrial fibrillation and flutter
   * - High Body-Mass Index
     - Asthma
   * - High Body-Mass Index
     - Gallbladder and biliary diseases
   * - High Body-Mass Index
     - Alzheimer's disease and other dementias
   * - High Body-Mass Index
     - Chronic kidney disease due to hypertension
   * - High Body-Mass Index
     - Chronic kidney disease due to glomerulonephritis
   * - High Body-Mass Index
     - Chronic kidney disease due to other and unspecified causes
   * - High Body-Mass Index
     - Low back pain
   * - High Body-Mass Index
     - Gout
   * - High Body-Mass Index
     - Cataract
   * - High Body-Mass Index
     - Acute lymphoid leukemia
   * - High Body-Mass Index
     - Chronic lymphoid leukemia
   * - High Body-Mass Index
     - Acute myeloid leukemia
   * - High Body-Mass Index
     - Chronic myeloid leukemia
   * - High Body-Mass Index
     - Other leukemia
   * - High Body-Mass Index
     - Diabetes mellitus type 2
   * - High Body-Mass Index
     - Chronic kidney disease due to diabetes mellitus type 2
   * - High Body-Mass Index
     - Burkitt lymphoma
   * - High Body-Mass Index
     - Other non-Hodgkin lymphoma
   * - High Body-Mass Index
     - Osteoarthritis hip
   * - High Body-Mass Index
     - Osteoarthritis knee

[GBD-2019-Capstone-Appendix-BMI2]_

.. list-table:: Restrictions
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
   * - YLD only
     - False
     -
   * - YLL only
     - False
     -
   * - Age group start
     - 9
     - [20, 24 years)
   * - Age group end
     - 235
     - [95, 125 years)


Risk Outcome Pair #1: Ischemic heart disease
++++++++++++++++++++++++++++++++++++++++++++

:ref:`See ischemic heart disease documentation <2019_cause_ihd>`

The relative risks apply to the incidence rates of acute 
myocardial infarction and stable angina. These are arrows 
1, 3, and 4 on the IHD cause diagram. They should be 
applied using the formula: 

incidence(i) = incidence*(1-PAF\ :sub:`r370`\)*RR^{max((BMI_i - TMREL),0)/5} 

The association was evaluated at the cause level, but the 
associations should be applied to the incidence rates for 
both nonfatal components of ischemic heart disease. The 
relative risk for GBD 2019 is for a 5-unit increase in BMI.

PAFs and relative risks can be pulled using the following code::

  rrs = get_draws(gbd_id_type='rei_id', gbd_id=370, source='rr', year_id=2019, gbd_round_id=6, status='best', decomp_step='step4') 

  pafs = get_draws(gbd_id_type=['rei_id', 'cause_id'], gbd_id=[370, 493], source='burdenator', measure_id=2, metric_id=2, year_id=2019, gbd_round_id=6, status='best', decomp_step='step5') 

**Mediation with FPG**

The relative risks are then adjusted to account for mediation through FPG. 
To find the new relative risk, this equation can be used: 

RR_adjusted = (1 - 0.149278039) * (RR_unadjusted - 1) + 1

where the RR_unadjusted is from the get_draws code above and the 
RR_adjusted is what is used to find the risk of BMI on IHD. 

The mediation matrix is found on this `Hub page <https://hub.ihme.washington.edu/pages/viewpage.action?spaceKey=GBD2020&title=GBD+2021+Risk+factors+mediation>`_ 


Risk Outcome Pair #2: Ischemic stroke
+++++++++++++++++++++++++++++++++++++

:ref:`See ischemic stroke documentation <2019_cause_ischemic_stroke>`

The relative risks apply to the incidence rates of acute 
ischemic stroke. These are arrows 1 and 3 on in the ischemic 
stroke cause model. They should be applied using the formula: 

incidence(i) = incidence*(1-PAF\ :sub:`r370`\)*RR^{max((BMI_i - TMREL),0)/5} 

The relative risk for GBD 2019 is for a 5-unit increase in BMI. 

PAFs and relative risks can be pulled using the following code:: 

  rrs = get_draws(gbd_id_type='rei_id', gbd_id=370, source='rr', year_id=2019, gbd_round_id=6, status='best', decomp_step='step4') 

  pafs = get_draws(gbd_id_type=['rei_id', 'cause_id'], gbd_id=[370, 495], source='burdenator', measure_id=2, metric_id=2, year_id=2019, gbd_round_id=6, status='best', decomp_step='step5') 

**Mediation with FPG**

The relative risks are then adjusted to account for mediation through FPG. 
To find the new relative risk, this equation can be used: 

RR_adjusted = (1 - 0.216637902) * (RR_unadjusted - 1) + 1

where the RR_unadjusted is from the get_draws code above and the 
RR_adjusted is what is used to find the risk of BMI on ischemic stroke. 

The mediation matrix is found on this `Hub page <https://hub.ihme.washington.edu/pages/viewpage.action?spaceKey=GBD2020&title=GBD+2021+Risk+factors+mediation>`_ 

Risk Outcome Pair #10: Heart failure
++++++++++++++++++++++++++++++++++++

:ref:`See heart failure documentation <2019_cause_heart_failure>`

In GBD, heart failure is an impairment and does not 
have a mortality associated with it. For our model, 
heart failure is a cause that simulants can have and 
die from. However, the effect of BMI is for incidence 
rather than for mortality. Below are the relative risks, 
these are from the literature analysis_. [Kenchaiah_2008]_

.. _analysis: https://www.ahajournals.org/doi/full/10.1161/CIRCULATIONAHA.108.807289

The relative risk for heart failure is 1.14 (1.12, 1.16). 

The relative risks apply to the incidence rates of heart failure.
They should be applied using the formula: 

incidence(i) = incidence*(1-PAF\ :sub:`r370`\)*RR^{max((BMI_i - TMREL),0)} 

The relative risk for heart failure is per 1-unit increase in BMI. 
**Please note that this is different than the other relative risks.** 

**Mediation with FPG**

The relative risks are then adjusted to account for mediation through FPG. 
To find the new relative risk, this equation can be used: 

RR_adjusted = (1 - MF) * (RR_unadjusted - 1) + 1

where the RR_unadjusted is 1.14 (1.12, 1.16) and the 
RR_adjusted is what is used to find the risk of BMI on heart failure. 

The MF is the mediation factor. This can be found in the table below. 

.. csv-table:: Mediation Factor 
  :file: heart_failure_MF.csv
  :widths: 40 30 30 
  :header-rows: 1 

This mediation factor is calculated in this `workbook <https://github.com/ihmeuw/vivarium_research_nih_us_cvd/blob/main/risk_mediation.ipynb>`_ 

Assumptions and Limitations
+++++++++++++++++++++++++++

The quantity of interest is exposure to the mean BMI level; we assume full reversibility of risk and do not account for duration of exposure to BMI values above the range of the TMREL. 

For this project, we are not including the mediation between BMI 
and SBP/LDL-C. In the current model, we do not include any interventions 
that affect both BMI and SBP/LDL-C simultaneously. Therefore, 
modeling the effects separately should capture the needed 
information. However, this limits the future scenarios we can run, 
and any additional scenarios should be assessed to see if mediation 
would be needed. 

In GBD relative risks and PAFs for BMI, there are occasional values less than 
1 and 0 respectively. These are isolated in older (80+) and the youngest age group. 
For elderly people, this likely shows a real protective effect. The rate of these 
values is low: 45 per 1,000. For the purpose of this model, these values are reset to 
1 and 0 for the RRs and PAFs. This might be a slight oversimplification but is unlikely 
to affect the model significantly. 


Validation Criteria
+++++++++++++++++++

Does the relative risk of BMI match the GBD or literature values? 


References
----------

.. [BMI_2016] “Body-Mass Index and All-Cause Mortality: Individual-Participant-Data Meta-Analysis of 239 Prospective Studies in Four Continents - The Lancet.” n.d. Accessed October 11, 2022. https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(16)30175-1/fulltext. 

.. [Carbone_2019] Carbone, Salvatore, Justin M Canada, Hayley E Billingsley, Mohammad S Siddiqui, Andrew Elagizi, and Carl J Lavie. 2019. “Obesity Paradox in Cardiovascular Disease: Where Do We Stand?” Vascular Health and Risk Management 15 (May): 89–100. https://doi.org/10.2147/VHRM.S168946. 

.. [CDC-BMI2] About Adult BMI. Centers for Disease Control and Prevention, Centers for Disease Control and Prevention, 17 Sept. 2020.
	Retrieved 19 April 2021.
	https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/index.html 

.. [GBD-2019-Capstone-Appendix-BMI2]
   Appendix_ to: `GBD 2019 Risk Factors Collaborators. Global burden of 87 risk factors in 204 countries and territories, 1990–2019; a systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 17 Oct 2020;396:1223-1249`
  

.. [Kenchaiah_2008] Kenchaiah, Satish, Howard D. Sesso, and J. Michael Gaziano. 2009. “Body Mass Index and Vigorous Physical Activity and the Risk of Heart Failure Among Men.” Circulation 119 (1): 44–52. https://doi.org/10.1161/CIRCULATIONAHA.108.807289. 

.. _Appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30752-2/attachment/54711c7c-216e-485e-9943-8c6e25648e1e/mmc1.pdf