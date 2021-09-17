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

.. note::

   This section will describe the Vivarium modeling strategy for risk effects.
   For a description of Vivarium modeling strategy for risk exposure, see the
   {RISK_EXPOSURE_PAGE_LINK} page.

.. todo::

   Replace {RISK_EXPOSURE_PAGE_LINK} with a reference to the appropriate risk exposure page in the above note.

.. todo::

   List the risk-outcome relationships that will be included in the risk effects model for this risk factor. Note whether the outcome in a risk-outcome relationship is a standard GBD risk-outcome relationship or is a custom relationship we are modeling for our simulation.

.. list-table:: Risk Outcome Relationships for Vivarium
   :widths: 5 5 5 5 5
   :header-rows: 1

   * - Outcome
     - Outcome type
     - Outcome ID
     - Affected measure
     - Note
   * -
     -
     -
     -
     -

Risk Outcome Pair #1
++++++++++++++++++++

.. todo::

	Replace "Risk Outcome Pair #1" with the name of an affected entity for which a modeling strategy will be detailed. For additional risk outcome pairs, copy this section as many times as necessary and update the titles accordingly.

.. todo::

  Link to existing cause model document or other documentation of the outcome in the risk outcome pair.

.. todo::

  Describe which entitity the relative risks apply to (incidence rate, prevalence, excess mortality rate, etc.) and *how* to apply them (e.g. :code:`affected_measure * (1 - PAF) * RR`).

  Be sure to specify the exact PAF that should be used in the above equation and either how to calculate it (see the `Population Attributable Fraction` section of the :ref:`Modeling Risk Factors <models_risk_factors>` document) or pull it (:code:`vivarium_inputs.interface.get_measure(risk_factor.{risk_name}, 'population_attributable_fraction')`, noting which affected entity and measure should be used)

.. todo::

  Complete the following table to list the relative risks for each risk exposure category on the outcome. Note that if there are many exposure categories, another format may be preferable.

  Relative risks for a risk factor may be pulled from GBD at the draw-level using :code:`vivarium_inputs.interface.get_measure(risk_factor.{risk_name}, 'relative_risk')`. You can then calculate the mean value as well as 2.5th, and 97.5th percentiles across draws.

  The relative risks in the table below should be included for easy reference and should match the relative risks pulled from GBD using the above code. In this case, update the :code:`Note` below to include the appropriate :code:`{risk_name}`.

  If for any reason the modeling strategy uses non-GBD relative risks, update the :code:`Note` below to explain that the relative risks in the table are a custom, non-GBD data source and include a sampling strategy.

.. note::

  The following relative risks are displayed below for convenient reference. The relative risks in the table below should match the relative risks that can be pulled at the draw level using :code:`vivarium_inputs.interface.get_measure(risk_factor.{risk_name}, 'relative_risk')`.

.. list-table:: Relative Risks
   :widths: 5 5 5
   :header-rows: 1

   * - Exposure Category
     - Relative Risk
     - Note
   * -
     -
     -

Validation and Verification Criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. todo::

  List validation and verification criteria, including a list of variables that will need to be tracked and reported in the Vivarium simulation to ensure that the risk outcome relationship is modeled correctly

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. todo::

	List assumptions and limitations of this modeling strategy, including any potential issues regarding confounding, mediation, effect modification, and/or generalizability with the risk-outcome pair.

Bias in the Population Attributable Fraction
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As noted in the `Population Attributable Fraction` section of the :ref:`Modeling Risk Factors <models_risk_factors>` document, using a relative risk adjusted for confounding to compute a population attributable fraction at the population level will introduce bias.

.. todo::

	Outline the potential direction and magnitude of the potential PAF bias in GBD based on what is understood about the relationship of confounding between the risk and outcome pair using the framework discussed in the `Population Attributable Fraction` section of the :ref:`Modeling Risk Factors <models_risk_factors>` document.

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