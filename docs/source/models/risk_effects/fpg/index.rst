.. _2019_risk_effect_fpg:

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


======================
Fasting Plasma Glucose 
======================


.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

Glucose is the primary energy source of the cells of the human body. Homeostasis of glucose metabolism is assessed by measuring plasma glucose levels either by 
measuring fasting plasma glucose (FPG), performing an oral glucose tolerance test (OGTT), or analyzing glycated hemoglobin (HbA1c). These measurements can be used 
to classify subjects as having normal glucose metabolism (FPG <100 mg/dL, OGTT <140 mg/dL, HbA1c <5.7%), impaired glucose metabolism (FPG 100 to <126 mg/dL, 
OGTT 140 to 199 mg/dL, HbA1c 5.7 to 6.4%), or diabetes mellitus (FPG >=126 mg/dL, OGTT >=200 mg/dL, HbA1c >=6.5%). HbA1c is specific for diabetes but not very sensitive 
and has greater utility to monitor diabetes control over 2 to 3 months.

[Normal-FPG-Levels_effects]_

GBD 2019 Modeling Strategy
--------------------------

Risk exposure
+++++++++++++

:ref:`See risk exposure documentation for FPG <2019_risk_exposure_fpg>`

Relative risks
++++++++++++++

FPG is a risk factor for many causes which are listed in the table 
below. For the CVD model, FPG will affect ischemic heart disease, 
and ischemic stroke. There were no updates to GBD modeling of FPG for these causes. 

RRs were reported per 1 mmol/L increase in FPG above the TMREL value 
(4.8-5.4 mmol/L), calculated as in the equation below: 

:math:`\text{RR(x)} = {\text{RR}_0}^{\max\left((x-\text{TMREL}), 0\right)}`

Where RR(x) is the RR at exposure level x and RR\ :sub:`0`\  is the 
increase in RR for each 1 mmol/L above the TMREL. GBD used 
DisMod-MR 2.1 to pool effect sizes from included studies and generate 
a dose-response curve for each of the outcomes associated with high FPG. 
The tool enabled GBD to incorporate random effects across studies and 
include data with different age ranges. RRs were used universally for 
all countries and the meta-regression only helped to pool the three 
major sources and produce RRs with uncertainty and covariance across 
ages taking into account the uncertainty of the data points. 



Theoretical minimum-risk exposure level
+++++++++++++++++++++++++++++++++++++++

The theoretical minimum-risk exposure level (TMREL) for FPG is 4.8-5.4 mmol/L for those risk-outcome pairs where risk is assessed on a continuous basis. To include the uncertainty 
in the TMREL, we took a random draw from the uniform distribution of 
the interval between 4.8-5.4 mmol/L each time the population 
attributable burden was calculated. This was calculated by taking the person-year 
weighted average of the levels of FPG that were associated with the lowest risk of mortality in the pooled analyses of prospective cohort studies. The TMREL is no diabetes for those outcomes where risk 
is assessed on a categorical basis. The risk-outcome pairs are listed below, along with whether they are continuous or categorical.  

[Prospective-cohort-studies_effects]_

Vivarium Modeling Strategy
--------------------------

The risk-outcome pairs listed below are standard GBD relationships. 
The relative risks stored in the database are not location- or 
year-specific. They are age- and sex-specific. Exposure to FPG 
affects the likelihood of both morbidity and mortality from all causes 
in the table below. We will model this in Vivarium such that exposure to 
FPG will impact the incidence rates of: ischemic heart disease and ischemic 
stroke. The excess mortality rate for all outcomes will 
be unaffected. 

.. list-table:: FPG Risk-Outcomes Pairs
   :widths: 15 20
   :header-rows: 1

   * - Type
     - Outcome
   * - Continuous
     - Ischemic heart disease
   * - Continuous
     - Ischemic stroke
   * - Continuous
     - Subarachnoid hemorrhage
   * - Continuous
     - Intracerebral hemorrhage
   * - Continuous
     - Peripheral vascular disease
   * - Continuous
     - Type 1 diabetes
   * - Continuous
     - Type 2 diabetes
   * - Continuous
     - Chronic kidney disease due to Type 1 diabetes
   * - Continuous
     - Chronic kidney disease due to Type 2 diabetes
   * - Categorical
     - Drug-resistant tuberculosis
   * - Categorical
     - Drug-susceptible tuberculosis
   * - Categorical
     - Multidrug-resistant tuberculosis without extensive drug resistance
   * - Categorical
     - Extensively drug-resistant tuberculosis
   * - Categorical
     - Liver cancer due to NASH
   * - Categorical
     - Liver cancer due to other causes
   * - Categorical
     - Pancreatic cancer
   * - Categorical
     - Ovarian cancer
   * - Categorical
     - Colorectal cancer
   * - Categorical
     - Bladder cancer
   * - Categorical
     - Lung cancer
   * - Categorical
     - Breast cancer
   * - Categorical
     - Glaucoma
   * - Categorical
     - Cataracts
   * - Categorical
     - Dementia

[GBD-2019-Capstone-Appendix-FPG2]_

.. list-table:: GBD 2019 Restrictions
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
     - 10
     - [25, 29 years) 
   * - Age group end
     - 235
     - [95, 125 years) 

Mediation data is here: /ihme/costeffectiveness/artifacts/vivarium_nih_us_cvd/raw_data/mediation_matrix_draw_gbd_2021_edited.csv

Risk Outcome Pair #1: Ischemic heart disease
++++++++++++++++++++++++++++++++++++++++++++

:ref:`See ischemic heart disease documentation <2019_cause_ihd>`

The relative risks apply to the incidence rates of acute 
myocardial infarction. These are arrows labeled 1 on the IHD cause diagram. They should be 
applied using the formula: 

incidence(i) = incidence*(1-PAF\ :sub:`r105`\)*RR^{max((FPG_i - TMREL),0)} 

The relative risk for GBD 2019 is for a 1-unit increase in FPG.

PAFs and relative risks can be pulled using the following code::

  rrs = get_draws(gbd_id_type='rei_id', gbd_id=105, source='rr', year_id=2019, gbd_round_id=6, status='best', decomp_step='step4') 

  pafs = get_draws(gbd_id_type=['rei_id', 'cause_id'], gbd_id=[105, 493], source='burdenator', measure_id=2, metric_id=2, year_id=2019, gbd_round_id=6, status='best', decomp_step='step5') 

Mediation
^^^^^^^^^

Mediation for IHD is included for LDL-C. Data for the 
mediation factor can be found in the csv file above. The rei_id for 
FPG is 105. The cause_id for IHD is 493. The med_id is 367 for LDL-C. 
The csv has data for individual draws that will be used. 

The math is written out in the equations below and example python code 
is also included. 

:math:`delta_\text{LDL} = \frac{log(MF_\text{LDL} * (RR_\text{FPG,unadjusted} -1)+1)} {log(RR_\text{LDL})}`

:math:`RR_\text{FPG,adjusted} = \frac{RR_\text{FPG,unadjusted}}{{RR_\text{LDL}}^{delta_\text{LDL}}}`

Where :math:`MF_\text{LDL}` is the mediation factor for LDL-C, :math:`RR_\text{unadjusted}` 
is from the get_draws code above and the :math:`RR_\text{adjusted}` is what is used to 
find the risk of FPG on IHD. 

:: 

  delta_ldl = np.log((ldl_mf*(fpg_ihd_rr-1))+1)/np.log(ldl_ihd_rr)

  RR_adj=(fpg_ihd_rr)/(pow(ldl_ihd_rr, delta_ldl))

Risk Outcome Pair #2: Ischemic stroke
+++++++++++++++++++++++++++++++++++++

:ref:`See ischemic stroke documentation <2019_cause_ischemic_stroke>`

The relative risks apply to the incidence rates of acute 
ischemic stroke. These are arrows 1 and 3 on in the ischemic 
stroke cause model. They should be applied using the formula: 

incidence(i) = incidence*(1-PAF\ :sub:`r105`\)*RR^{max((FPG_i - TMREL),0)} 

The relative risk for GBD 2019 is for a 1-unit increase in FPG. 

PAFs and relative risks can be pulled using the following code:: 

  rrs = get_draws(gbd_id_type='rei_id', gbd_id=105, source='rr', year_id=2019, gbd_round_id=6, status='best', decomp_step='step4') 

  pafs = get_draws(gbd_id_type=['rei_id', 'cause_id'], gbd_id=[105, 495], source='burdenator', measure_id=2, metric_id=2, year_id=2019, gbd_round_id=6, status='best', decomp_step='step5') 

Mediation
^^^^^^^^^

Mediation for ischemic stroke is included for LDL-C. Data for the 
mediation factor can be found in the csv file above. The rei_id for 
FPG is 105. The cause_id for IHD is 495. The med_id is 367 for LDL-C. 
The csv has data for individual draws that will be used. 

The math is written out in the equations below and example python code 
is also included. 

:math:`delta_\text{LDL} = \frac{log(MF_\text{LDL} * (RR_\text{FPG,unadjusted} -1)+1)} {log(RR_\text{LDL})}`

:math:`RR_\text{FPG,adjusted} = \frac{RR_\text{FPG,unadjusted}}{{RR_\text{LDL}}^{delta_\text{LDL}}}`

Where :math:`MF_\text{LDL}` is the mediation factor for LDL-C, :math:`RR_\text{unadjusted}` 
is from the get_draws code above and the :math:`RR_\text{adjusted}` is what is used to 
find the risk of FPG on stroke. 

:: 

  delta_ldl = np.log((ldl_mf*(fpg_stroke_rr-1))+1)/np.log(ldl_stroke_rr)

  RR_adj=(fpg_stroke_rr)/(pow(ldl_stroke_rr, delta_ldl))

Assumptions and Limitations
+++++++++++++++++++++++++++

The quantity of interest is exposure to the mean FPG level; we assume full reversibility of risk and do not account for duration of exposure to FPG values above the range of the TMREL. 

We are not including diabetes as a cause in our model, which is a PAF-of-one 
cause with FPG. This means that while FPG affects IHD and stroke, we will 
be missing any YLLs and YLDs associated directly with diabetes. 

We are not including an effect of FPG on heart failure for this model, based 
on feedback from the CVD modeling team. 

Validation Criteria
+++++++++++++++++++

Does the relative risk of FPG match the GBD or literature values? 


References
----------

.. [GBD-2019-Capstone-Appendix-FPG2]
   Appendix to: `GBD 2019 Risk Factors Collaborators. Global burden of 87 risk factors in 204 countries and territories, 1990–2019; a systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 17 Oct 2020;396:1223-1249`

.. [Normal-FPG-Levels_effects]
    Gurung, Purnima. `Plasma Glucose.` StatPearls [Internet]., U.S. National Library of Medicine, 2 Sept. 2020, www.ncbi.nlm.nih.gov/books/NBK541081/. 

.. [Prospective-cohort-studies_effects]
    Singh GM, Danaei G, Farzadfar F, Stevens GA, Woodward M, Wormser D, et al. (2013) `The Age-Specific Quantitative Effects of Metabolic Risk Factors on Cardiovascular Diseases and Diabetes: A Pooled Analysis.` PLoS ONE 8(7): e65174. https://doi.org/10.1371/journal.pone.0065174