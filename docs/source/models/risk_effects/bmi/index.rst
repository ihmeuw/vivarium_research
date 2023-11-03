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

Mediation
---------

Mediation is included for BMI through SBP, LDL-C and FPG. We have generally 
followed the GBD approach to mediation, however we use slightly different 
equations based on math in the word doc below. 

:download:`Please see this word doc for details of the new math included <Mediation Notes.docx>`.

In cases where the RR for BMI is 1 or the mediators' (SBP, LDL-C or FPG) RR is 1, mediation 
will not be included for that risk since we assume no effect for one of risks. Note that we 
could still include mediation for other present risks. E.g., BMI RR = 1.2, SBP RR = 1 and FPG RR 
= 1.2, then we would NOT include mediation for BMI->SBP but would still include BMI->FPG. 

In theory, there could be a protective effect of mediation, but GBD does not include this 
so we follow the same logic. 

Mediation data is here: /mnt/team/simulation_science/costeffectiveness/artifacts/vivarium_nih_us_cvd/raw_data/mediation_matrix_draw_gbd_2021_edited.csv


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

:ref:`See ischemic heart disease documentation (combined with HF) <2019_cause_ihd>`

The relative risks apply to the incidence rates of acute 
myocardial infarction. These are arrows labeled 
1 on the IHD cause diagram. They should be 
applied using the formula: 

incidence(i) = incidence*(1-PAF\ :sub:`r370`\)*RR^{max((BMI_i - TMREL),0)/5} 

The association was evaluated at the cause level, but the 
associations should be applied to the incidence rates for 
both nonfatal components of ischemic heart disease. The 
relative risk for GBD 2019 is for a 5-unit increase in BMI.

PAFs and relative risks can be pulled using the following code::

  rrs = get_draws(gbd_id_type='rei_id', gbd_id=370, source='rr', year_id=2019, gbd_round_id=6, status='best', decomp_step='step4') 

  pafs = get_draws(gbd_id_type=['rei_id', 'cause_id'], gbd_id=[370, 493], source='burdenator', measure_id=2, metric_id=2, year_id=2019, gbd_round_id=6, status='best', decomp_step='step5') 

Once correlation and mediation are included in the model, find joint PAFs 
by using this :ref:`information <2023_sbp_ldlc_fpg_bmi>` instead of pulling 
values from GBD. 

Mediation
^^^^^^^^^

Mediation for IHD is included for FPG, SBP and LDL-C. Data for the 
mediation factors can be found in the csv file above. The rei_id for 
all is 370. The cause_id for IHD is 493. The med_ids are 105 for FPG, 
107 for SBP and 367 for LDL-C. The csv has data for individual draws 
that will be used. 

The math is written out in the equations below and example python code 
is also included. 

:math:`delta_\text{m} = \frac{log(MF_m * (RR_\text{BMI,unadjusted} -1)+1)} {log(RR_\text{m})}`

:math:`RR_\text{BMI,adjusted} = \frac{RR_\text{BMI,unadjusted}}{\prod_{m=1}^{n} {RR_\text{m}}^{delta_\text{m}}}`

Where :math:`MF_m` is the mediation factor and :math:`RR_\text{m}` is the unadjusted relative risk for each mediator :math:`m` in SBP, LDL-C, and FPG.

where the RR_unadjusted is from the get_draws code above and the 
RR_adjusted is what is used to find the risk of BMI on IHD. 

:: 

  delta_sbp = np.log((sbp_mf*(bmi_ihd_rr-1))+1)/np.log(sbp_ihd_rr)
  delta_ldl = np.log((ldl_mf*(bmi_ihd_rr-1))+1)/np.log(ldl_ihd_rr)
  delta_fpg = np.log((fpg_mf*(bmi_ihd_rr-1))+1)/np.log(fpg_ihd_rr)

  RR_adj=(bmi_ihd_rr)/((pow(sbp_ihd_rr, delta_sbp))*(pow(ldl_ihd_rr, delta_ldl))*(pow(fpg_ihd_rr, delta_fpg)))


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

Once correlation and mediation are included in the model, find joint PAFs 
by using this :ref:`information <2023_sbp_ldlc_fpg_bmi>` instead of pulling 
values from GBD. 

Mediation
^^^^^^^^^

Mediation for ischemic stroke is included for FPG, SBP and LDL-C. Data for the 
mediation factors can be found in the csv file above. The rei_id for 
all is 370. The cause_id for ischemic stroke is 495. The med_ids are 105 for FPG, 
107 for SBP and 367 for LDL-C. The csv has data for individual draws 
that will be used. 

The math is written out in the equations below and example python code 
is also included. 

:math:`delta_\text{m} = \frac{log(MF_m * (RR_\text{BMI,unadjusted} -1)+1)} {log(RR_\text{m})}`

:math:`RR_\text{BMI,adjusted} = \frac{RR_\text{BMI,unadjusted}}{\prod_{m=1}^{n} {RR_\text{m}}^{delta_\text{m}}}`

Where :math:`MF_m` is the mediation factor and :math:`RR_\text{m}` is the unadjusted relative risk for each mediator :math:`m` in SBP, LDL-C, and FPG.

where the RR_unadjusted is from the get_draws code above and the 
RR_adjusted is what is used to find the risk of BMI on stroke. 

:: 

  delta_sbp = np.log((sbp_mf*(bmi_stroke_rr-1))+1)/np.log(sbp_stroke_rr)
  delta_ldl = np.log((ldl_mf*(bmi_stroke_rr-1))+1)/np.log(ldl_stroke_rr)
  delta_fpg = np.log((fpg_mf*(bmi_stroke_rr-1))+1)/np.log(fpg_stroke_rr)

  RR_adj=(bmi_stroke_rr)/((pow(sbp_stroke_rr, delta_sbp))*(pow(ldl_stroke_rr, delta_ldl))*(pow(fpg_stroke_rr, delta_fpg)))

Risk Outcome Pair #10: Heart failure
++++++++++++++++++++++++++++++++++++

:ref:`See heart failure documentation (combined with IHD) <2019_cause_ihd>`

In GBD, heart failure is an impairment and does not 
have a mortality associated with it. For our model, 
heart failure is a cause that simulants can have and 
die from. However, the effect of BMI is for incidence 
rather than for mortality. This is applied to arrows 3 
and 4 in the cause model. Below are the relative risks, 
these are from the literature analysis_. [Kenchaiah_2008]_

.. _analysis: https://www.ahajournals.org/doi/full/10.1161/CIRCULATIONAHA.108.807289

The relative risk for heart failure is 1.14 (1.12, 1.16). 

The relative risks apply to the incidence rates of heart failure.
They should be applied using the formula: 

incidence(i) = incidence*(1-PAF\ :sub:`r370`\)*RR^{max((BMI_i - TMREL),0)} 

The relative risk for heart failure is per 1-unit increase in BMI. 
**Please note that this is different than the other relative risks.** 

**PAF Calculations**

The PAF for heart failure for the unmediated and uncorrelated runs will be 
calculated once, based on an initialized population and then saved to the 
artifact for future use. 

To do this, follow the below steps: 

#. Initialize a population of 100,000*
#. Truncate the exposure of BMI at 40.8** 
#. Find the simulant level RR with this equation: :math:`RR\text{simulant} = RR^{max((BMI_i - TMREL),0)}` 
#. Find the mean RR for each age/sex group 
#. Find the PAF for each age/sex group with this equation: :math:`PAF(i) = (RR\text{mean}(i) - 1) / RR\text{mean}(i)`

An example of this calculation can be found in the `workbook here <https://github.com/ihmeuw/vivarium_research_nih_us_cvd/blob/main/PAF_BMI_to_HF.ipynb>`_

Notes: 

- (*) The population of 100,000 was determined by testing the standard deviation across draws to see where variation stabilized. This testing was completed `in this workbook <https://github.com/ihmeuw/vivarium_research_nih_us_cvd/blob/main/heart_failure_pafs_pop_profiling.ipynb>`_. We found that the standard deviation was comparable for 10,000, 100,000 and 1,000,000 for most age/sex groups. However, for some groups 100,000 was significantly better than 10,000 so we will use 100,000. 
- (**) We truncate the exposures of BMI as this calculation is based on literature values that have limited applicability in our model. 40.8 is 3 standard deviations above the mean BMI exposure for obese individuals in the paper being used. [Kenchaiah_2008]_ Without this truncation, there would be RR's that are 2000+ which makes mean PAF values very close to 1. We do not want to assume a continued relationship in BMI to RR for values 40 BMI units above the max used in the paper. 


Once correlation and mediation are included in the model, find joint PAFs 
by using this :ref:`information <2023_sbp_ldlc_fpg_bmi>` instead of pulling 
values from GBD. 

Mediation
^^^^^^^^^

Mediation for heart failure is included for SBP only. LDL-C and FPG do 
not have a direct effect on heart failure, so they are not needed as mediation 
factors here. Data for the mediation factors can be found in the csv file path below. 

Mediation data is here: /mnt/team/simulation_science/costeffectiveness/artifacts/vivarium_nih_us_cvd/raw_data/heart_failure_deltas_all_draws.csv

:math:`RR_\text{BMI,adjusted} = \frac{RR_\text{BMI,unadjusted}}{{RR_\text{SBP}}^{delta_\text{SBP}}}`

where the RR_unadjusted is 1.14 (1.12, 1.16) and the 
RR_adjusted is what is used to find the risk of BMI on heart failure. For age groups 
90+ and <25, use the closest age group. 

The delta can be found in the table below. 

.. csv-table:: Delta Values 
  :file: heart_failure_deltas.csv
  :widths: 40 30 30 30
  :header-rows: 1 

This mediation factor is calculated in this `workbook <https://github.com/ihmeuw/vivarium_research_nih_us_cvd/blob/main/risk_mediation_2.ipynb>`_ 


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