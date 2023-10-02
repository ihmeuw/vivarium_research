.. _2019_risk_effect_sbp:

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

================
SBP Risk Effects
================

.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

Blood pressure is recorded as two numbers, systolic (SBP) and diastolic (DBP), and presented as the ratio of SBP/DBP. SBP indicates how much pressure the blood is exerting against the artery walls when the heart contracts, while DBP indicates how much pressure the blood is exerting against the artery walls while the heart is resting between beats. Typically, SBP rises with age due to increased stiffness in the larger arteries. SBP is usually given more attention as a major risk factor for cardiovascular diseases, but elevated DBP (even in the absence of elevated SBP) has also been shown to be associated with increased risk of cardiovascular disease. Thresholds for defining clinical hypertension (high blood pressure) vary between guidelines set by different bodies (AHA/ACC >130/80 mm Hg; ESC >140/90 mm Hg). 

[heart-sbp]_
[bakris-sbp]_

High systolic blood pressure is associated with the strongest evidence for causation and it has a high prevalence of exposure. 

“Observational studies have demonstrated graded associations between higher systolic blood pressure (SBP) and diastolic blood pressure (DBP) and increased CVD risk. In a meta-analysis of 61 prospective studies, the risk of CVD increased in a log-linear fashion from SBP levels <115 mmHg to>180mmHg and from DBP levels <75mmHg to >105 mm Hg. In that analysis, 20 mm Hg higher SBP and 10 mm Hg higher DBP were each associated with a doubling in the risk of death from stroke, heart disease, or other vascular disease. In a separate observational study including >1 million adult patients ≥30 years of age, higher SBP and DBP were associated with increased risk of CVD incidence and angina, myocardial infarction (MI), HF, stroke, peripheral artery disease (PAD), and abdominal aortic aneurysm, each evaluated separately. An increased risk of CVD associated with higher SBP and DBP has been reported across a broad age spectrum, from 30 years to >80 years of age. Although the relative risk of incident CVD associated with higher SBP and DBP is smaller at older ages, the correspond- ing high BP–related increase in absolute risk is larger in older persons (≥65 years) given the higher absolute risk of CVD at an older age.”  

[whelton]_

“Among the risk factors for CVD, high blood pressure (BP) is associated with the strongest evidence for causation and it has a high prevalence of exposure.” 

[fuchs]_

“Elevated blood pressure is the most important risk factor for death and disability worldwide, affecting more than one billion individuals and causing an estimated 9·4 million deaths every year. Prospective cohort studies have reported a continuous log-linear association between blood pressure and vascular events to a blood pressure of 115/75 mm Hg, with no apparent threshold. This association seems to exist across large and diverse population groups, including men and women, individuals aged 40–89 years, from different ethnicities, with and without established vascular disease.” 

[ettehad]_

GBD 2019 Modeling Strategy
--------------------------

Risk exposure
+++++++++++++

:ref:`See risk exposure documentation for SBP <2019_risk_sbp>`

Relative risks
++++++++++++++

No changes have been made to the relative risk estimates for blood pressure outcomes used since GBD 2016. RRs for chronic kidney disease are from the Renal Risk Collaboration meta-analysis of 2.7 million individuals in 106 cohorts. For other outcomes, we used data from two pooled epidemiological studies: the Asia Pacific Cohort Studies Collaboration (APCSC) and the Prospective Studies Collaboration (PSC). Additional estimates of RR for cardiovascular outcomes were used from the CALIBER study, a health-record linkage cohort study from the UK.

[APCS]_
[prospective]_
[rapsomaniki]_

For cardiovascular disease, epidemiological studies have shown that the RR associated with SBP declines with age, with the log (RR) having an approximately linear relationship with age and reaching a value of 1 between the ages of 100 and 120. RRs were reported per 10 mmHg increase in SBP above the TMREL value (115 mmHg), calculated as in the equation below: 

:math:`\text{RR(x)} = {\text{RR}_0}^{\frac{\max\left((x-\text{TMREL}), 0\right)}{\text{10 mmHg}}}`

Where RR(x) is the RR at exposure level x and RR\ :sub:`0`\  is the increase in RR for each 10 mmHg above the TMREL. We used DisMod-MR 2.1 to pool effect sizes from included studies and generate a dose-response curve for each of the outcomes associated with high SBP. The tool enabled us to incorporate random effects across studies and include data with different age ranges. RRs were used universally for all countries and the meta-regression only helped to pool the three major sources and produce RRs with uncertainty and covariance across ages taking into account the uncertainty of the data points. 

Theoretical minimum-risk exposure level
+++++++++++++++++++++++++++++++++++++++

No changes have been made to the TMREL used for systolic blood pressure since GBD 2015. We estimated that the TMREL of SBP ranges from 110 to 115 mmHg based on pooled prospective cohort studies that show risk of mortality increases for SBP above that level. Our selection of a TMREL of 110–115 mmHg is consistent with the GBD study approach of estimating all attributable health loss that could be prevented even if current interventions do not exist that can achieve such a change in exposure level, for example a tobacco smoking prevalence of zero percent. To include the uncertainty in the TMREL, we took a random draw from the uniform distribution of the interval between 110 mmHg and 115 mmHg each time the population attributable burden was calculated. 

[APCS]_
[singh-sbp]_

Vivarium Modeling Strategy
--------------------------

The risk-outcome pairs listed below are standard GBD relationships. The relative risks stored in the database are not location- or year-specific. They are age- and sex-specific. Exposure to SBP affects the likelihood of both morbidity and mortality from: ischemic heart disease, ischemic stroke, intracerebral hemorrhage, subarachnoid hemorrhage, hypertensive heart disease, atrial fibrillation and flutter, aortic aneurysm, peripheral arterial disease, chronic kidney disease, and heart failure. We will model this in Vivarium such that exposure to SBP will impact the incidence rates of ischemic heart disease, ischemic stroke, and heart failure. The excess mortality rate for all outcomes will be unaffected. 

.. list-table:: Entities affected by SBP in GBD
   :widths: 5 5 5 5 5
   :header-rows: 1

   * - Outcome
     - Outcome type
     - Outcome ID
     - Affected measure
     - Note
   * - Ischemic heart disease
     - Cause
     - 493
     - Mortality and Morbidity (GBD YLLS and YLDs)
     -
   * - Ischemic stroke
     - Cause
     - 495
     - Mortality and Morbidity (GBD YLLS and YLDs)
     -
   * - Intracerebral hemorrhage
     - Cause
     - 496
     - Mortality and Morbidity (GBD YLLS and YLDs)
     -
   * - Subarachnoid hemorrhage
     - Cause
     - 497
     - Mortality and Morbidity (GBD YLLS and YLDs)
     -
   * - Hypertensive heart disease
     - Cause
     - 498
     - Mortality and Morbidity (GBD YLLS and YLDs)
     - PAF=1; do have RR for the association from GBD 2020
   * - Atrial fibrillation and flutter
     - Cause
     - 500
     - Mortality and Morbidity (GBD YLLS and YLDs)
     -
   * - Aortic aneurysm
     - Cause
     - 501
     - Mortality only (GBD YLLs)
     - No non-fatal component
   * - Peripheral arterial disease
     - Cause
     - 502
     - Mortality and Morbidity (GBD YLLS and YLDs)
     -
   * - Chronic kidney disease
     - Cause
     - 589
     - Mortality and Morbidity (GBD YLLS and YLDs)
     - Parent CKD; have RR for the association from GBD 2020; RR from GBD 2019 are essentially the same for all subtypes
   * - Heart failure
     - REI
     - 196
     - Mortality and Morbidity (GBD YLDs only, YLLs previously included in other causes)
     - Impairment in GBD, RR is pulled from literature 

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
   * - YLL only
     - False
     -
   * - YLD only
     - False
     -
   * - Age group start
     - 10
     - [25, 29)
   * - Age group end
     - 235
     - [95, 125 years)

Risk Outcome Pair #1: Ischemic heart disease
++++++++++++++++++++++++++++++++++++++++++++

:ref:`See ischemic heart disease documentation (combined with HF) <2019_cause_ihd>`

The relative risks apply to the incidence rates of acute myocardial infarction. They should be applied using the formula incidence(i) = incidence*(1-PAF\ :sub:`r107`\)*RR^{max((SBP_i - TMREL),0)/10}. The association was evaluated at the cause level, but the associations should be applied to the incidence rates for both nonfatal components of ischemic heart disease. The relative risk for GBD 2019 is for a 10-unit increase in mm Hg.

PAFs and relative risks can be pulled using the following code: 

rrs = get_draws(gbd_id_type='rei_id', gbd_id=107, source='rr', year_id=2019, gbd_round_id=6, status='best', decomp_step='step4') 

pafs = get_draws(gbd_id_type=['rei_id', 'cause_id'], gbd_id=[107, 493], source='burdenator', measure_id=2, metric_id=2, year_id=2019, gbd_round_id=6, status='best', decomp_step='step5') 

Once correlation is included in the model, find joint PAFs 
by using this :ref:`information <2023_sbp_ldlc_fpg_bmi>` instead of pulling 
values from GBD. 

Risk Outcome Pair #2: Ischemic stroke
+++++++++++++++++++++++++++++++++++++

:ref:`See ischemic stroke documentation <2019_cause_ischemic_stroke>`

The relative risks apply to the incidence rates of acute ischemic stroke. They should be applied using the formula incidence(i) = incidence*(1-PAF\ :sub:`r107`\)*RR^{max((SBP_i - TMREL),0)/10}. The relative risk for GBD 2019 is for a 10-unit increase in mm Hg. 

PAFs and relative risks can be pulled using the following code: 

rrs = get_draws(gbd_id_type='rei_id', gbd_id=107, source='rr', year_id=2019, gbd_round_id=6, status='best', decomp_step='step4') 

pafs = get_draws(gbd_id_type=['rei_id', 'cause_id'], gbd_id=[107, 495], source='burdenator', measure_id=2, metric_id=2, year_id=2019, gbd_round_id=6, status='best', decomp_step='step5') 

Once correlation is included in the model, find joint PAFs 
by using this :ref:`information <2023_sbp_ldlc_fpg_bmi>` instead of pulling 
values from GBD. 

Risk Outcome Pair #3: Intracerebral hemorrhage
++++++++++++++++++++++++++++++++++++++++++++++

:ref:`See intracerebral hemorrhage documentation <2019_cause_ich>`

The relative risks apply to the incidence rates of acute intracerebral hemorrhage. They should be applied using the formula incidence(i) = incidence*(1-PAF\ :sub:`r107`\)*RR^{max((SBP_i - TMREL),0)/10}. The relative risk for GBD 2019 is for a 10-unit increase in mm Hg. 


PAFs and relative risks can be pulled using the following code: 

rrs = get_draws(gbd_id_type='rei_id', gbd_id=107, source='rr', year_id=2019, gbd_round_id=6, status='best', decomp_step='step4') 

pafs = get_draws(gbd_id_type=['rei_id', 'cause_id'], gbd_id=[107, 496], source='burdenator', measure_id=2, metric_id=2, year_id=2019, gbd_round_id=6, status='best', decomp_step='step5') 

Risk Outcome Pair #4: Subarachnoid hemorrhage
+++++++++++++++++++++++++++++++++++++++++++++

:ref:`See subarachnoid hemorrhage documentation <2019_cause_sah>`

The relative risks apply to the incidence rates of acute subarachnoid hemorrhage. They should be applied using the formula incidence(i) = incidence*(1-PAF\ :sub:`r107`\)*RR^{max((SBP_i - TMREL),0)/10}. The relative risk for GBD 2019 is for a 10-unit increase in mm Hg. 

PAFs and relative risks can be pulled using the following code: 

rrs = get_draws(gbd_id_type='rei_id', gbd_id=107, source='rr', year_id=2019, gbd_round_id=6, status='best', decomp_step='step4') 

pafs = get_draws(gbd_id_type=['rei_id', 'cause_id'], gbd_id=[107, 497], source='burdenator', measure_id=2, metric_id=2, year_id=2019, gbd_round_id=6, status='best', decomp_step='step5') 

Risk Outcome Pair #5: Hypertensive heart disease
++++++++++++++++++++++++++++++++++++++++++++++++

:ref:`See hypertensive heart diease documentation <2019_cause_hhd>`

Hypertensive heart disease has a PAF of 1 for SBP. There was no relative risk calculated for GBD 2019; however, there was a relative risk calculated for GBD 2020. 

Relative risks can be pulled using the following code; please note that this will pull GBD 2020 Release 1 results: 

rrs = get_draws(gbd_id_type='rei_id', gbd_id=107, source='rr', year_id=2019, gbd_round_id=7, status='best', decomp_step='iterative') 

Risk Outcome Pair #6: Atrial fibrillation and flutter
+++++++++++++++++++++++++++++++++++++++++++++++++++++

:ref:`See atrial fibrillation and flutter documentation <2019_cause_afib>`

The relative risks apply to the incidence rates of atrial fibrillation and flutter. They should be applied using the formula incidence(i) = incidence*(1-PAF\ :sub:`r107`\)*RR^{max((SBP_i - TMREL),0)/10}. The relative risk for GBD 2019 is for a 10-unit increase in mm Hg. 

PAFs and relative risks can be pulled using the following code: 

rrs = get_draws(gbd_id_type='rei_id', gbd_id=107, source='rr', year_id=2019, gbd_round_id=6, status='best', decomp_step='step4') 

pafs = get_draws(gbd_id_type=['rei_id', 'cause_id'], gbd_id=[107, 500], source='burdenator', measure_id=2, metric_id=2, year_id=2019, gbd_round_id=6, status='best', decomp_step='step5') 

Risk Outcome Pair #7: Aortic aneurysm
+++++++++++++++++++++++++++++++++++++

:ref:`See aortic aneurysm documentation <2019_cause_aortic_aneurysm>`

We do not model nonfatal aortic aneurysm for GBD; thus, there is no incidence rate that is modified by SBP level. Attributable burden is calculated for YLLs only. 

PAFs and relative risks can be pulled using the following code: 

rrs = get_draws(gbd_id_type='rei_id', gbd_id=107, source='rr', year_id=2019, gbd_round_id=6, status='best', decomp_step='step4') 

pafs = get_draws(gbd_id_type=['rei_id', 'cause_id'], gbd_id=[107, 501], source='burdenator', measure_id=2, metric_id=2, year_id=2019, gbd_round_id=6, status='best', decomp_step='step5') 

Risk Outcome Pair #8: Peripheral arterial disease
+++++++++++++++++++++++++++++++++++++++++++++++++

:ref:`See peripheral arterial disease documentation <2019_cause_pad>`

They should be applied using the formula incidence(i) = incidence*(1-PAF\ :sub:`r107`\)*RR^{max((SBP_i - TMREL),0)/10}. The relative risk for GBD 2019 is for a 10-unit increase in mm Hg. 

PAFs and relative risks can be pulled using the following code: 

rrs = get_draws(gbd_id_type='rei_id', gbd_id=107, source='rr', year_id=2019, gbd_round_id=6, status='best', decomp_step='step4') 

pafs = get_draws(gbd_id_type=['rei_id', 'cause_id'], gbd_id=[107, 502], source='burdenator', measure_id=2, metric_id=2, year_id=2019, gbd_round_id=6, status='best', decomp_step='step5') 

Risk Outcome Pair #9: Chronic kidney disease
++++++++++++++++++++++++++++++++++++++++++++

:ref:`See chronic kidney disease documentation <2019_cause_ckd>`

The relative risks apply to the incidence rates of chronic kidney disease. They should be applied using the formula incidence(i) = incidence*(1-PAF\ :sub:`r107`\)*RR^{max((SBP_i - TMREL),0)/10}. The relative risk for GBD 2019 is for a 10-unit increase in mm Hg. This is the incidence at the parent cause level; we do not currently have independent relative risks for the etiologies of CKD (type 1 DM, type 2 DM, glomerulonephritis, hypertension, other). 

PAFs and relative risks can be pulled using the following code: 

rrs = get_draws(gbd_id_type='rei_id', gbd_id=107, source='rr', year_id=2019, gbd_round_id=6, status='best', decomp_step='step4') 

For relative risks, will need to subset to cause_id=592; this is CKD due to glomerulonephritis, but the RR estimates are almost identical across etiologies. 

pafs = get_draws(gbd_id_type=['rei_id', 'cause_id'], gbd_id=[107, 589], source='burdenator', measure_id=2, metric_id=2, year_id=2019, gbd_round_id=6, status='best', decomp_step='step5') 

Risk Outcome Pair #10: Heart failure
++++++++++++++++++++++++++++++++++++

:ref:`See heart failure documentation (combined with IHD) <2019_cause_ihd>`

In GBD, heart failure is an impairment and does not have a mortality associated with it. For our model, 
heart failure is a cause that simulants can have and die from. However, the effect of SBP is for incidence 
rather than for mortality. Below are the relative risks, these are from the literature analysis_. 

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

The PAFs were then calculated for SBP to Heart Failure based on the relative 
risks above. The calculations can be found in `this workbook <https://github.com/ihmeuw/vivarium_research_nih_us_cvd/blob/main/PAF_calculations.ipynb>`_. 

For the Alabama population, the PAF is 0.205025 with a confidence interval of 
(0.125341, 0.282451). Note that this is for the Alabama population ONLY. 

Once correlation is included in the model, find joint PAFs 
by using this :ref:`information <2023_sbp_ldlc_fpg_bmi>` instead of pulling 
values from GBD. 

Validation and Verification Criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The relative risk for IHD is calculated based on studies which use a variety of outcomes (AMI only, major adverse cardiovascular events, composite IHD outcome); most of these outcomes map imperfectly to the GBD case definition for IHD. 

As noted in the Population Attributable Fraction section of the Modeling Risk Factors document, using a relative risk adjusted for confounding to compute a population attributable fraction at the population level will introduce bias. 

References
----------

.. [heart-sbp] Understanding Blood Pressure Readings. American Heart Association, www.heart.org.
	Retrieved 17 Sept 2021.
	https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings

.. [bakris-sbp] Bakris, G., Ali, W., & Parati, G. (2019). 
	ACC/AHA versus ESC/ESH on hypertension guidelines: JACC guideline comparison. Journal of the American College of Cardiology, 73(23), 3018-3026.
	https://www.jacc.org/doi/full/10.1016/j.jacc.2019.03.507

.. [whelton] Whelton, P. K., Carey, R. M., Aronow, W. S., Casey, D. E., Collins, K. J., Dennison Himmelfarb, C., ... & Wright, J. T. (2018). 
	2017 ACC/AHA/AAPA/ABC/ACPM/AGS/APhA/ASH/ASPC/NMA/PCNA guideline for the prevention, detection, evaluation, and management of high blood pressure in adults: a report of the American College of Cardiology/American Heart Association Task Force on Clinical Practice Guidelines. Journal of the American College of Cardiology, 71(19), e127-e248.
	https://doi.org/10.1161/HYP.0000000000000065

.. [fuchs] Fuchs, F. D., & Whelton, P. K. (2020). 
	High blood pressure and cardiovascular disease. Hypertension, 75(2), 285-292.
	https://doi.org/10.1161/HYPERTENSIONAHA.119.14240

.. [ettehad] Ettehad, D., Emdin, C. A., Kiran, A., Anderson, S. G., Callender, T., Emberson, J., ... & Rahimi, K. (2016). 
	Blood pressure lowering for prevention of cardiovascular disease and death: a systematic review and meta-analysis. The Lancet, 387(10022), 957-967.
	https://doi.org/10.1016/S0140-6736(15)01225-8

.. [APCS] Collaboration APCS, others. 
	Blood pressure and cardiovascular disease in the Asia Pacific region. J Hypertens 2003; 21: 707–16.

.. [prospective] Prospective Studies Collaboration. 
	Age-specific relevance of usual blood pressure to vascular mortality: a meta-analysis of individual data for one million adults in 61 prospective studies. The Lancet 2002; 360: 1903–13.

.. [rapsomaniki] Rapsomaniki E, Timmis A, George J, et al. 
	Blood pressure and incidence of twelve cardiovascular diseases: lifetime risks, healthy life-years lost, and age-specific associations in 1·25 million people. Lancet Lond Engl 2014; 383: 1899–911.

.. [singh-sbp] Singh GM, Danaei G, Farzadfar F, et al. 
	The age-specific quantitative effects of metabolic risk factors on cardiovascular diseases and diabetes: a pooled analysis. PloS One 2013; 8: e65174.