.. _2019_risk_effect_ldl:

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
LDL Risk Effects
================

.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

Low-density lipoprotein (LDL) is one of the five major groups of lipoproteins which transport all fat molecules around the body in the extracellular water. LDL can contribute to atherosclerosis if it is oxidized within the walls of arteries.  

Lipid assay panels conducted on blood samples commonly report LDL-C. This is a calculated value, using the Friedewald equation with total cholesterol (TC), high-density lipoprotein (HDL), and triglycerides (TG) as inputs. It should be emphasized that LDL-C is not a measurement of actual LDL particles, rather it is an estimate (not measured from the individual’s blood sample) of how much cholesterol is being transported by all LDL particles. In the clinical context, these mathematically calculated estimates of LDL-C are commonly used as an estimate of how much low-density lipoproteins are driving progression of atherosclerosis. It is possible to measure the concentration of LDL particles directly using nuclear magnetic resonance spectroscopy; however, this is not typically done in population studies. 

[wikipedia-ldl]_
[cdc-ldl]_

Reduction of LDL cholesterol has been causally associated with a decrease in risk of atherosclerosis and cardiovascular disease endpoints in cohort studies and clinical trials. For this reason, LDL cholesterol is a primary treatment target in all major guidelines for both primary and secondary prevention. Studies have found that the association of elevated LDL cholesterol with myocardial infarction and ischaemic heart disease varies greatly with age, with the association being much stronger in younger than older individuals. 

[ctt]_
[sabatine]_
[mortensen]_

GBD 2019 Modeling Strategy
--------------------------

Risk exposure
+++++++++++++

:ref:`See risk exposure documentation for LDL <2019_risk_exposure_ldl>`

Relative risks
++++++++++++++

After a systematic search, we were unable to find relative risks for LDL that were reported by age and level of LDL. Given this evidence that the relative risks for LDL and TC are very similar and the strong linear correlation between TC and LDL at the individual level, we used relative risks reported for TC to approximate the relative risks for LDL. We used DisMod-MR 2.1 to pool effect sizes from included studies and generate a dose-response curve for each of the outcomes associated with LDL. The tool enabled us to incorporate random effects across studies and include data with different age ranges. RRs were used universally for all countries and produce RRs with uncertainty and covariance across ages, considering the uncertainty of the data points.  

[wilson]_

As in GBD 2017, RRs for IHD and ischaemic stroke are obtained from meta-regressions of pooled epidemiological studies: the Asia Pacific Cohort Studies Collaboration (APCSC) and the Prospective Studies Collaboration (PSC). RRs for IHD were modelled with log (RR) as the dependent variable and median age at event as the independent variable with an age intercept (RR equals 1) at age 110. For LDL and ischaemic stroke, a similar approach was used, except that there was no age intercept at age 110, due to the fact that there was no statistically significant relationship between LDL and stroke after age 70 with a mean RR less than one. We assumed that there is not a protective effect of LDL and therefore did not include an RR for ages 80+. 

[singh]_

Theoretical minimum-risk exposure level
+++++++++++++++++++++++++++++++++++++++

For GBD 2017, we reviewed the literature to select a TMREL for LDL. A meta-analysis of randomised trials has shown that outcomes can be improved even at low levels of LDL-cholesterol, below 1.3 mmol/L. Recent studies of PCSK-9 inhibitors support these results. We therefore used a TMREL with a uniform distribution between 0.7 and 1.3 mmol/L; this value remained unchanged for GBD 2019. 

[boekholdt]_
[sabatine-giugliano]_

Vivarium Modeling Strategy
--------------------------

The risk-outcome pairs listed below are standard GBD relationships. The relative risks stored in the database are not location- or year-specific. They are age- and sex-specific. The LDL risk factor affects the likelihood of both morbidity and mortality from ischemic stroke and ischemic heart disease. We will model this in Vivarium such that exposure to LDL will impact the incidence rate of ischemic stroke and acute myocardial infarction. The excess mortality rate for both outcomes will be unaffected. 

.. list-table:: Entities affected by LDL-C in GBD
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
     - Mortality and Morbidity (GBD YLLs and YLDs)
     - Cause-level is mortality only
   * - Ischemic stroke
     - Cause
     - 495
     - Mortality and Morbidity (GBD YLLs and YLDs)
     - 

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

The relative risks apply to the incidence rates of acute myocardial infarction and stable angina. They should be applied using the formula incidence(i) = incidence*(1-PAF\ :sub:`r107`\)*RR^{max((LDL-C_i - TMREL),0)}. The association was evaluated at the cause level, but the associations should be applied to the incidence rates for both nonfatal components of ischemic heart disease. 

PAFs and relative risks can be pulled using the following code: 

rrs = get_draws(gbd_id_type='rei_id', gbd_id=367, source='rr', year_id=2019, gbd_round_id=6, status='best', decomp_step='step4') 

pafs = get_draws(gbd_id_type=['rei_id', 'cause_id'], gbd_id=[367, 493], source='burdenator', measure_id=2, metric_id=2, year_id=2019, gbd_round_id=6, status='best', decomp_step='step5') 

Once correlation is included in the model, find joint PAFs 
by using this :ref:`information <2023_sbp_ldlc_fpg_bmi>` instead of pulling 
values from GBD. 


Risk Outcome Pair #2: Ischemic stroke
+++++++++++++++++++++++++++++++++++++

:ref:`See ischemic stroke documentation <2019_cause_ischemic_stroke>`

The relative risks apply to the incidence rates of acute ischemic stroke. They should be applied using the formula They should be applied using the formula incidence(i) = incidence*(1-PAF\ :sub:`r107`\)*RR^{max((LDL-C_i - TMREL),0)}.

PAFs and relative risks can be pulled using the following code: 

rrs = get_draws(gbd_id_type='rei_id', gbd_id=367, source='rr', year_id=2019, gbd_round_id=6, status='best', decomp_step='step4') 

pafs = get_draws(gbd_id_type=['rei_id', 'cause_id'], gbd_id=[367, 495], source='burdenator', measure_id=2, metric_id=2, year_id=2019, gbd_round_id=6, status='best', decomp_step='step5') 

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

.. [wikipedia-ldl] Low-Density Lipoprotein. Wikipedia, Wikimedia Foundation, 14 Sept 2021.
	Retrieved 17 Sept 2021.
	https://en.wikipedia.org/wiki/Low-density_lipoprotein

.. [cdc-ldl] LDL & HDL: Good & Bad Cholesterol. CDC, Centers for Disease Control and Prevention, 31 Jan 2020.
	Retrieved 17 Sept 2021.
	https://www.cdc.gov/cholesterol/ldl_hdl.htm	

.. [ctt] Cholesterol Treatment Trialists’ (CTT) Collaboration. 
	Efficacy and safety of more intensive lowering of LDL cholesterol: a metaanalysis of data from 170 000 participants in 26 randomised trials. Lancet 2010; 376: 1670–81. 

.. [sabatine] Sabatine MS, Wiviott SD, Im K, Murphy SA, Giugliano RP. 
	Efficacy and safety of further lowering of low-density lipoprotein cholesterol in patients starting with very low levels: a meta-analysis. JAMA Cardiol 2018; 3: 823–28. 

.. [mortensen] Mortensen, M. B., & Nordestgaard, B. G. (2020). 
	Elevated LDL cholesterol and increased risk of myocardial infarction and atherosclerotic cardiovascular disease in individuals aged 70–100 years: a contemporary primary prevention cohort. The Lancet, 396(10263), 1644-1652.
	https://doi.org/10.1016/S0140-6736(20)32233-9

.. [wilson] Wilson PF, D'Agostino RB, Levy D, Belanger AM, Silbershatz H, Kannel WB. 
	Prediction of Coronary Heart Disease Using Risk Factor Categories. Circulation. 1998; 97:1837-1847.

.. [singh] Singh GM, Danaei G, Farzadfar F, et al. 
	The age-specific quantitative effects of metabolic risk factors on cardiovascular diseases and diabetes: a pooled analysis. PloS One 2013; 8: e65174.

.. [boekholdt] Boekholdt SM, Hovingh GK, Mora S, et al. 
	Very Low Levels of Atherogenic Lipoproteins and the Risk for Cardiovascular EventsA Meta-Analysis of Statin Trials. J Am Coll Cardiol 2014; 64: 485–94.

.. [sabatine-giugliano] Sabatine MS, Giugliano RP, Keech AC, et al. 
	Evolocumab and Clinical Outcomes in Patients with Cardiovascular Disease. N Engl J Med. 2017; 376:1713-1722.