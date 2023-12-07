.. _maternal_supplementation_intervention:

=================================================================================================================
Antenatal Supplementation: Iron-Folic Acid, Multiple Micronutrients, and Balanced Energy Proteins
=================================================================================================================

.. contents::
   :local:
   :depth: 2

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - BEP
    - Balanced Energy Protein
    - 
  * - MMS
    - Multiple Micronutrient Supplement
    - 
  * - IFA
    - Iron-folic acid
    - 
  * - BMI
    - Body Mass Index
    - 
  * - ANC
    - Antenatal coverage
    - 

Intervention Overview
-----------------------

.. note::

  This intervention has been previously modeled in Vivarium and documentation can be found :ref:`here <2017_concept_model_vivarium_gates_bep>`. 

Maternal supplementataion during the prenatal period is a critical intervention to support the increased nutritional demands due to the mother's changing physiology and fetal growth. Maternal supplementation in low and middle income country settings are often accessed through antenatal care (ANC) services and early initiation of supplementation has been associated with improved outcomes. There are various maternal supplementation regimens that provide varying combinations of micro- and macro-nutrients and therefore have varying impacts on both maternal and child health. Major classes of maternal supplementation regimens are outlined in the table below.

- **Iron and Folic Acid (IFA):** IFA affects outcomes including maternal anemia (which is a risk factor for maternal mortality) and infant birthweight (a risk factor for infant mortality). Additionally, folic acid deficiency is associated with haematological consequences and congenital malformations, however the effect on congenital malformations is sensitive to timing of administration relative to conception. The latest cochrane review of IFA trials was performed by [Pena-Rosas-et-al-2015]_; notably, as IFA is considered the current standard of care, there are few studies that compare IFA to placebo or no treatment.

- **Multiple Micronutrient Supplementation (MMS):** MMS is a combination of micronutrients that includes iron and folic acid as well as other nutrients such as vitamin A and zinc. The latest cochrane review on MMS (containing IFA) relative to IFA alone was performed by [Keats-et-al-2019-maternal-supplementation]_.

- **Balanced Energy Protein (BEP):** BEP is a type of supplement that provides macronutrients in addition to micronutrients provided by IFA and MMS. The macronutrients provided by BEP supplementation may aid in maternal weight gain, which may improve fetal outcomes, and may be particularly beneifcial to underweight pregnant women and their babies. Notably, there are several different formulations of BEP, which may vary in their effectiveness. The latest cochrane review on BEP supplementation was performed by [Ota-et-al-2015]_

In August of 2020, the :download:`World Health Organization updated their recommendation <who_guidance_positive_pregnancy_mms_2020.pdf>` on nutritional interventions during pregnancy to include MMS that includes iron and folic acid as part of routine antenatal care. Prior to this update, they recommended only IFA. Additionally, the :download:`WHO recommends BEP supplementation during pregnancy in undernourished populations <who_guidance_positive_pregnancy_2016.pdf>`.

.. note:: 

  According to the :download:`2016 WHO recommendations <who_guidance_positive_pregnancy_2016.pdf>`: Undernourishment is usually defined by a low BMI (i.e. being underweight). For adults, a 20–39% prevalence of underweight women is considered a high prevalence of underweight and 40% or higher is considered a very high prevalence (46). Mid-upper arm circumference (MUAC) may also be useful to identify protein–energy malnutrition in individual pregnant women and to determine its prevalence in this population (31). However, the optimal cut-off points may need to be determined for individual countries based on context-specific cost–benefit analyses (31).

IFA is widely used as a prenatal supplement in most areas of the world and is recommended by the WHO as part of routine antenatal care, although coverage and adherence levels vary. Given the relatively recent recommendation regarding MMS and the relatively high cost of BEP, the coverage of these inteventions at a wide scale is believed to be substantially lower.

.. todo::

  Fill out the following table with a additional known outcomes affected by the intervention.

.. list-table:: Affected Outcomes
  :header-rows: 1

  * - Outcome
    - Regimen(s)
    - Effect
    - Modeled?
    - Note
  * - Infant birthweight
    - IFA, MMS, BEP
    - Increases population mean
    - Yes
    - Differential effect by regimen. Effect modification by counterfactual birthweight (or proxy such as maternal nourishment)
  * - Maternal anemia
    - IFA, MMS, BEP
    - Increases population mean hemoglobin
    - Yes
    - Non-linear dose response likely. Differential effect by regimen. Effect modification by baseline hemoglobin likely.
  * - Maternal nourishment (BMI)
    - BEP
    - TBD
    - No
    - Needs more investigation
  * - Child wasting
    - BEP
    - Increases population mean WLZ
    - Yes (hypothesized effect in the :ref:`BEP simulation <2017_concept_model_vivarium_gates_bep>`). Should not be modeled in simulations using conservative evidence
    - Possible mediation through birthweight. Low quality evidence. 
  * - Child stunting
    - BEP
    - Increases population mean LAZ
    - Yes (hypothesized effect in the :ref:`BEP simulation <2017_concept_model_vivarium_gates_bep>`). Should not be modeled in simulations using conservative evidence
    - Possible mediation through birthweight/wasting. Low quality evidence.

.. _`maternal-supplementation-baseline-parameters`:

Baseline Coverage Data
++++++++++++++++++++++++

Given the low utilization of MMS and BEP relative to IFA, we assume that baseline coverage of MMS and BEP are zero. Baseline coverage of IFA varies by location, and Demographic Health Surveys are good data sources for the proportion of pregnant women who took iron supplementation during pregnancy. 

.. warning::

  Maternal supplementation interventions are typically delivered through antenatal care (ANC) visits. Therefore, maximum alternative scenario coverage should be considered to be equal to the proportion of pregnant women who attend ANC visits in the absence of an intervention to increase ANC attendance or an alternative maternal supplementation delivery program. 

.. list-table:: Baseline coverage data
  :header-rows: 1

  * - Location
    - Subpopulation
    - Coverage parameter
    - Value
    - Note
  * - South Asia (location ID 159)
    - Pregnant population **at ANC**
    - Proportion who took *any* antenatal iron 
    - 0.83 (0.79, 0.87), assume normal distribution of uncertainty
    - `Calculated from GBD covariate data from the CIFF grant as provided by Nat Henry <https://github.com/ihmeuw/vivarium_research_iv_iron/tree/main/parameter_aggregation>`_: estimation excludes Bhutan (location ID=162), which is only 0.04 percent of total PLW in South Asia. Do not use this value for the :ref:`IV iron simulation <2019_concept_model_vivarium_iv_iron>`, rather, use the values in the .csv file on the :ref:`IV iron simulation landing page <2019_concept_model_vivarium_iv_iron>`.
  * - Sub-Saharan Africa (location ID 166)
    - Pregnant population **at ANC**
    - Proportion who took *any* antenatal iron
    - 0.74 (0.70, 0.78), assume normal distribution of uncertainty
    - `Calculated from same GBD covariate data as above <https://github.com/ihmeuw/vivarium_research_iv_iron/tree/main/parameter_aggregation>`_ regional aggregation was performed using a subset of countries with available data, representing approximately 60% of all PLW in SSA. Do not use this value for the :ref:`IV iron simulation <2019_concept_model_vivarium_iv_iron>`, rather, use the values in the .csv file on the :ref:`IV iron simulation landing page <2019_concept_model_vivarium_iv_iron>`.
  * - Ethiopia
    - Pregnant population
    - Proportion who took *any* antenatal iron
    - 0.598 (0.583, 0.613), normal distribution of uncertainty clipped between zero and one
    - Use this value for the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>`; DHS 2019
  * - Ethiopia
    - Pregnant population
    - Proportion who took antenatal iron for 90+ days
    - 0.106
    - DHS 2019. Don't use this value for Nutrition optimization! Will be provided on concept model document.
  * - India
    - Pregnant population
    - Proportion who took antenatal iron for 90+ days
    - 0.387
    - DHS 2017
  * - Mali
    - Pregnant population
    - Proportion who took antenatal iron for 90+ days
    - 0.28
    - DHS 2017
  * - Pakistan
    - Pregnant population
    - Proportion who took antenatal iron for 90+ days
    - 0.294
    - DHS 2017. Don't use this value for Nutrition optimization! Will be provided on concept model document.
  * - Tanzania
    - Pregnant population
    - Proportion who took antenatal iron for 90+ days
    - 0.214
    - DHS 2017

.. note::

  DHS has coverage data specific to women who took iron tablets for <60 and 60-89 days too as well as stratified by age, residence, region, education, and wealth quintile.

  The baseline percent of women taking any antenatal iron during pregnancy (59.8%) was chosen instead of the percent of women who took antenatal iron during pregnancy for 90 or more days (10.6%) to be conservative and due to the following finding in [Pena-Rosas-et-al-2015]_: 

    "Overall, for women receiving *any* intermittent iron regimen (with or without other vitamins and minerals) compared with a daily regimen there was no clear evidence of differences between groups for any infant primary outcomes: low birthweight (average risk ratio (RR) 0.82; 95% confidence interval (CI) 0.55 to 1.22; participants = 1898; studies = eight; low quality evidence), infant birthweight (mean difference (MD) 5.13 g; 95% CI ‐29.46 to 39.72; participants = 1939; studies = nine; low quality evidence), premature birth (average RR 1.03; 95% CI 0.76 to 1.39; participants = 1177; studies = five; low quality evidence), or neonatal death (average RR 0.49; 95% CI 0.04 to 5.42; participants = 795; studies = one; very low quality). None of the studies reported congenital anomalies." (Abstract)

  Note that the :ref:`BEP simulation <2017_concept_model_vivarium_gates_bep>` used the proportion of women who took antenatal iron for 90+ days for baseline coverage.

  For the proportion of women who took *any* antenatal iron in Ethiopia, the confidence interval was calculated using the formula :math:`1.96 \times \sqrt{\frac{p \times (1 - p)}{n}}`. Confidence intervals could/should be estimated in a similar way for the remaining estimates using the reported sample size of the survey if/when necessary.

Vivarium Modeling Strategy
--------------------------

The maternal supplementation intervention is administered to mothers and impacts both the mother and infant. To model the impact of the intervention on either child or maternal outcomes, simulant attributes for maternal nourishment exposure (BMI/x-factor) and maternal ANC attendance exposure are required. Additionally, to model the impact on child growth, child growth exposures are required. To model the impact on maternal mortality, a maternal hemoglobin exposure value is required. This intervention model requires the additional simulant attribute of maternal supplement regimen.

Coverage algorithms
+++++++++++++++++++

Individual product coverage algorithms
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For use in the :ref:`nutrition optimization simulation <2021_concept_model_vivarium_nutrition_optimization>`.

For our purposes, each individual antenatal supplementation product (IFA, MMS, and BEP) are mutually exclusive; in other words, a given simulant can only be covered by one of these three products for any given pregnancy. We do not consider changing antenatal supplementation products during a single pregnancy. Supplementation product coverage may depend on other simulant characteristics, such as antenatal care visit attendance or pre-pregnancy body mass index (BMI) exposure.

.. note::

  Although the supplementation products are mutually exclusive, it is important to remember that iron and folic acid (the nutrients present in IFA) are also present in MMS and BEP products. Similarly, the micronutrients present in MMS are assumed to also be present in BEP products. However, BEP contains additional macronutrients that are not provided with MMS or IFA, and likewise, MMS contains micronutrients that are not provided with IFA.

  Therefore, the intervention impacts of each intervention product "stack" upon one another such that the effect of BEP includes the effect of IFA relative to no supplementation, MMS relative to IFA, AND BEP relative to MMS. Specific instructions and details are provided in the following sections. 

Targeted intervention package coverage algorithm
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For use in the :ref:`Balanced energy protein simulation <2017_concept_model_vivarium_gates_bep>` and the :ref:`IV iron simulation <2019_concept_model_vivarium_iv_iron>`.

For the implementation of the intervention in an alterative scenarios, we will model BEP supplementation among undernourished mothers and MMS supplementation among adequately nourished mothers rather than IFA supplementation alone, as demonstrated in the following decision tree. The :ref:`maternal body mass index risk exposure <2019_risk_exposure_maternal_bmi>` should be used to determine maternal nourishment status for this intervention model (exposed=undernourished).

.. image:: coverage_decision_tree.svg


.. list-table:: Modeled Outcomes
  :widths: 15 15 15 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Outcome type
    - Outcome ID
    - Affected measure
    - Effect size measure
    - Effect size
    - Note 
  * - Hemoglobin
    - Modelable entity
    - 10487
    - Population mean hemoglobin concentration (as continuous measure)
    - Mean difference
    - Varies by supplement regimen
    - Related effect on anemia reduction
  * - Birthweight
    - Risk exposure
    - 339
    - Population mean birthweight (as continuous measure)
    - Mean difference
    - Varies by supplement regimen
    - Assume no difference in gestational age

Maternal Hemoglobin
+++++++++++++++++++++

All regimens in the maternal supplementation interventions affect the hemoglobin concentration of pregnant and lactating women who are covered by them. Notably, the intervention will not affect the hemoglobin level of women of reproductive age who are not pregnant or lactating because they will not be covered by this specific intervention. :ref:`The hemoglobin model document can be found here <2019_hemoglobin_model>`.

.. list-table:: Restrictions for intervention effect on hemoglobin
  :header-rows: 1

  * - Restriction
    - Value
    - Note
  * - Male only
    - False
    - 
  * - Female only
    - True
    - 
  * - Age group start
    - 10 to 14
    - Age group ID 7
  * - Age group end
    - 50 to 54
    - Age group ID 15
  * - Other
    - Pregnant and lactating women only
    - (see the :ref:`pregnancy model document <other_models_pregnancy>`)

.. list-table:: Supplementation effect on hemoglobin
  :header-rows: 1

  * - Population
    - Effect size (95% CI)
    - Note
    - Source
  * - IFA
    - +7.8 g/L (4.08, 11.52)
    - Relative to no supplementation 
    - [Oh-et-al-2020]_
  * - MMS
    - +0 g/L
    - Relative to IFA
    - 
  * - BEP
    - 0 g/L
    - Relative to IFA/MMS
    - Gates Trials

**How to sample and apply effect sizes:**

The intervention hemoglobin shifts should be applied at **eight weeks gestation** (assume pregnancy identification occurs at six weeks, intervention coverage begins at the time of pregnancy identification, and intervention effect on hemoglobin occurs two weeks after initiation of the intervention). The intervention hemoglobin shift should persist until six weeks postpartum, at which point the simulant's hemoglobin level should return to the pre-pregnancy value.

Additionally, the code block below walks through how to implement the following considerations:

- Assume a normal distribution of uncertainty when sampling from the effect size parameter confidence intervals
- Hemoglobin exposure values among PLW need to be calibrated to baseline IFA coverage in the baseline scenario
- Effect sizes in the table above are NOT relative to no supplementation and are assumed to be *additive* to one another. It is important that they are implemented in the method described below due to their overlapping confidence intervals to ensure that the effect of BEP>MMS/IFA in all draws.
- The effect of MMS and BEP in the alternative scenario depends on IFA coverage status in the baseline scenario

.. code-block:: python

  from scipy.stats import norm

  def sample_from_normal_distribution(mean, lower, upper):
      """Instructions on how to sample from a normal distribution given a mean value and
      95% confidence interval for a parameter"""
      std = (upper - lower) / 2 / 1.96
      dist = norm(mean, std)
      return dist.rvs()

  """A hemoglobin shift for each supplement regimen should be sampled independently
  for each simulation draw assuming a normal distribution of uncertainty"""
  for draw in draws:    
      for supplement in ['ifa','mmn','bep']:
          {supplement}_shift_draw = sample_from_normal_distribution({supplement}_mean, 
                                                                    {supplement}_lower, 
                                                                    {supplement}_upper)
      
      for i in simulants:

      """In the baseline scenario, we need to calibrate baseline coverage of IFA
      so that the difference between IFA supplemented and unsupplemented babies, on 
      average, equals to the ifa_shift AND that the population mean hemoglobin value
      among PLW from GBD is approximately unchanged.

      * hgb_{i} represents the assigned continuous hemoglobin exposure value for a 
      simulant sampled from GBD, after the application of the pregnancy adjustment factor
      and BEFORE consideration of the impact of maternal supplementation.

      * baseline_ifa_coverage represents the coverage proportion of IFA for a location and
      specific simulation draw"""
          if baseline_maternal_supplement_{i} == 'none':
              baseline_supplemented_hgb_{i} = hgb_{i} - baseline_ifa_coverage_draw * ifa_shift_draw
          elif baseline_maternal_supplement_i == 'ifa':
              baseline_supplemented_hgb_{i} = hgb_{i} + (1 - baseline_ifa_coverage_draw) * ifa_shift_draw

      """In the alternative scenario, the amount to shift a simulant's hemoglobin (if they are
      covered by MMS or BEP in the alternative scenario) depends on if they were already covered 
      by IFA in the baseline scenario"""
          alternative_supplemented_hgb_{i} = baseline_supplemented_hgb_{i}
          if alternative_maternal_supplement_{i} is in ['ifa', 'mmn', 'bep'] and baseline_maternal_supplement_{i} == 'none':
              alternative_supplemented_hgb_{i} =+ ifa_shift_draw
          if alternative_maternal_supplement_{i} is in ['mmn', 'bep']:
              alternative_supplemented_hgb_{i} =+ mmn_shift_draw
          if alternative_maternal_supplement_{i} == 'bep':
              alternative_supplemented_hgb_{i} =+ bep_shift_draw

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- We assume that pregnant women begin taking the supplementation intervention six weeks into their pregnancy. In reality, the average person may begin taking oral iron supplementation closer to the start of the second trimester. However, we have chosen six weeks in order to be conservative as the comparison intervention for the assessment of the impact of the intravenous iron intervention.
- We assume that the effect of the intervention persists for six weeks postpartum at which point hemoglobin returns to its pre-pregnancy value
- We assume no effect modification by baseline hemoglobin level. In reality, the individual hemoglobin shifts are likely greater among those who are anemic at baseline.

Verification and validation criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In the baseline scenario, the exposure distribution of hemoglobin and anemia among PLW and WRA as well as the maternal disorders cause model should match that of GBD. 

Hemoglobin exposures stratified by supplementation regimen should match supplementation effect sizes.

The relative risk of anemia by supplmentation regimen should validate to external sources.

.. todo::

  Cite external sources for these validations.

Birthweight
+++++++++++++++++++++

.. note::

  Note to software engineers: BEP intervention on birthweight has previously been implemented and is hosted `here <https://github.com/ihmeuw/vivarium_gates_bep>`_. 

The maternal supplementation intervention (all regimens) affect child birthweight exposures, :ref:`which are documented here <2019_risk_exposure_lbwsg>`. The intervention should result in an **additive change to a simulant's continuous birthweight exposure value at birth (or upon initialization into the early or late neonatal age groups).** We assume changes in simulant birthweight are independent from changes in their gestational age exposure value at birth.

.. list-table:: Restrictions for intervention effect on birthweight
  :header-rows: 1

  * - Restriction
    - Value
    - Note
  * - Male only
    - False
    - 
  * - Female only
    - False
    - 
  * - Age group start
    - Birth
    - 
  * - Age group end
    - Late neonatal
    - 
  * - Other
    - 
    - 

.. list-table:: Supplementation effect on birthweight
  :header-rows: 1

  * - Population
    - Effect size (95% CI)
    - Note
    - Source
  * - Unsupplemented mothers
    - 0
    - 
    - N/A
  * - IFA supplemented mothers (overall)
    - +57.73 g (7.66 to 107.79)
    - Relative to no supplementation 
    - [Pena-Rosas-et-al-2015]_
  * - MMN supplemented mothers (overall)
    - +45.16 (32.31 to 58.02) 
    - Relative to IFA
    - Meta-analysis of 13 trials from [Keats-et-al-2019-maternal-supplementation]_, linked as a memo in :ref:`BEP concept model document <2017_concept_model_vivarium_gates_bep>`
  * - BEP supplemented mothers (undernourished)
    - +66.96g (13.13 to 120.78)
    - Relative to MMN
    - [Ota-et-al-2015]_

.. note::

  Adequately nourished BEP supplemented mothers relative to MMN supplemented mothers birthweight shift is +15.93 grams (-20.83 to 52.69) according to [Ota-et-al-2015]_, but this value should not be used for targeted BEP scenarios given that BEP is only recommended for undernourished mothers

**How to sample and apply effect sizes:**

The code block below walks through how to implement the following considerations:

- Assume a normal distribution of uncertainty when sampling from the effect size parameter confidence intervals
- Birthweight exposure values need to be calibrated to baseline IFA coverage in the baseline scenario
- Effect sizes in the table above are NOT relative to no supplementation and are assumed to be *additive* to one another. It is important that they are implemented in the method described below due to their overlapping confidence intervals to ensure that the effect of BEP>MMN>IFA in all draws.
- The effect of MMN and BEP in the alternative scenario depends on IFA coverage status in the baseline scenario

.. code-block:: python

  from scipy.stats import norm

  def sample_from_normal_distribution(mean, lower, upper):
      """Instructions on how to sample from a normal distribution given a mean value and
      95% confidence interval for a parameter"""
      std = (upper - lower) / 2 / 1.96
      dist = norm(mean, std)
      return dist.rvs()

  """A birthweight shift for each supplement regimen should be sampled independently
  for each simulation draw assuming a normal distribution of uncertainty"""
  for draw in draws:    
      for supplement in ['ifa','mmn','bep']:
          {supplement}_shift_draw = sample_from_normal_distribution({supplement}_mean, 
                                                                    {supplement}_lower, 
                                                                    {supplement}_upper)
      
      for i in simulants:

      """In the baseline scenario, we need to calibrate baseline coverage of IFA
      so that the difference between IFA supplemented and unsupplemented babies, on 
      average, equals to the ifa_shift AND that the population mean birthweight value
      from GBD is approximately unchanged.

      * bw_{i} represents the assigned continuous birthweight exposure value for a 
      simulant sampled from GBD, which may or may not have already been affected by other 
      factors such as maternal BMI, etc. BEFORE consideration of the impact of 
      maternal supplementation.

      * baseline_ifa_coverage represents the coverage proportion of IFA for a location and
      specific simulation draw"""
          if baseline_maternal_supplement_{i} == 'none':
              baseline_supplemented_bw_{i} = bw_{i} - baseline_ifa_coverage_draw * ifa_shift_draw
          elif baseline_maternal_supplement_i == 'ifa':
              baseline_supplemented_bw_{i} = bw_{i} + (1 - baseline_ifa_coverage_draw) * ifa_shift_draw

      """In the alternative scenario, the amount to shift a simulant's birthweight (if they are
      covered by MMS or BEP in the alternative scenario) depends on if they were already covered 
      by IFA in the baseline scenario"""
          alternative_supplemented_bw_{i} = baseline_supplemented_bw_{i}
          if alternative_maternal_supplement_{i} is in ['ifa', 'mmn', 'bep'] and baseline_maternal_supplement_{i} == 'none':
              alternative_supplemented_bw_{i} =+ ifa_shift_draw
          if alternative_maternal_supplement_{i} is in ['mmn', 'bep']:
              alternative_supplemented_bw_{i} =+ mmn_shift_draw
          if alternative_maternal_supplement_{i} == 'bep':
              alternative_supplemented_bw_{i} =+ bep_shift_draw

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- We assume that the birthweight shifts of maternal supplementation interventions are equal across the counterfactual unsupplemented birthweight exposure distribution. In reality the impact may be greater among the lower end of the birthweight distribution. Because the same shift in the birthweight among the lower end of the distribution is associated with a greater magnitude of mortality risk reduction than among the higher end of the distribution, we may underestimate the effect of the intervention. 

- We assume that the birthweight shift for BEP reported by [Ota-et-al-2015]_ is relative to MMN, although it is actually relative to a reference group with mixed supplementation regimens. Due to the belief that the effect size of BEP may be underestimated (see discussion in the :ref:`BEP concept model document and manuscript <2017_concept_model_vivarium_gates_bep>`), this may not be a problematic assumption.

- We do not consider effect modification by maternal anemia status.

- For the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>` that uses the baseline coverage value of women that took any antenatal iron: We assume that taking any iron supplement is equally as effective as taking daily a iron supplement in the baseline scenario. If it is in fact less effective, we will overestimate the impact of the baseline IFA coverage and therefore underestimate the impact of the MMS and BEP interventions.

- For the :ref:`BEP simulation <2017_concept_model_vivarium_gates_bep>` that uses the baseline coverage value of women that took antenatal iron for 90+ days: We assume that taking antenatal iron for <90 days in the baseline scenario has no impact on birthweight. This assumption may cause us to underestimate (partial) baseline coverage of IFA and therefore overestimate the impact of the MMS and BEP interventions. 

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In the baseline scenario, the exposure distribution of birthweight (mean birthweight, if available) as well as the mortality rates among the neonatal age groups should match that of GBD. 

If birthweight exposures are stratified by supplementation regimen and maternal nourishment strata, then birthweight differences between regimens should match the effect sizes within a given maternal nourishment exposure strata.

Gestational age
+++++++++++++++++++

.. note::

  This outcome has been added in June of 2023, and will be first incorporated into the :ref:`nutrition optimization <2021_concept_model_vivarium_nutrition_optimization>` model and has not been included in the :ref:`IV iron <2019_concept_model_vivarium_iv_iron>` or :ref:`BEP <2017_concept_model_vivarium_gates_bep>` simulations. 

Research background
~~~~~~~~~~~~~~~~~~~

The antenatal supplementation products affect child gestational age at birth exposures, :ref:`which are documented here <2019_risk_exposure_lbwsg>`. While we measure LBWSG exposures at the continuous level (including a joint birth weight and gestational age at birth value), the literature tends to report the effect of antenatal supplementation products on gestational age at birth in terms of a relative risk of preterm birth (less than 37 weeks gestational age at birth) or very preterm birth (less than 32 weeks gestational age at birth), which are summarized in the table below.

.. list-table:: Dichotomous effect of antenatal supplementation on preterm birth
  :header-rows: 1

  * - Product
    - Relative to 
    - Outcome
    - Value
    - Source
  * - IFA
    - No IFA
    - Preterm birth, <37 weeks
    - OR = 0.9 (95% CI: 0.86, 0.95)
    - [Li-et-al-2019-antenatal-supplementation]_
  * - MMS
    - IFA
    - Preterm birth, <37 weeks
    - RR = 0.91 (95% CI: 0.84, 0.99)
    - [Gomes-et-al-2023-antenatal-supplementation]_, effect with *prospective* last menstrual period and/or ultrasound-based pregnancy dating (rather than *retrospective* last menstrual period dating). Note that this value was updated between wave I and wave II of the N.O. project from 0.95 (0.90, 1.01) from [Keats-et-al-2019-maternal-supplementation]_, which did not conduct the outcome assessment quality sensitivity analysis.
  * - MMS
    - IFA
    - Very preterm birth, <32 weeks
    - RR = 0.81 (95% CI: 0.71, 0.93)
    - [Keats-et-al-2019-maternal-supplementation]_
  * - BEP
    - MMS
    - Preterm birth, <37 weeks
    - 0.96 (0.80, 1.16); assume no effect
    - [Ota-et-al-2015]_

In order to make these effects compatible with our continuous exposure modeling strategy for LBWSG, we have converted these relative risks of dichotomous outcomes to continuous gestational age "shifts" that result in preterm (and very preterm, if applicable) birth prevalence that replicates the appropriate dichotomous measure of effect. 

The methodology for this conversion was inspired in part by the methodology of the air pollution GBD team in calculating the impact of the risk on LWBSG exposures. As with GBD, we assume that these shifts are independent of any shifts in birth weight. However, rather than implement the conversion using the LBWSG exposure distribution specific to the individual study included in a meta-analysis of the overall effect to find a global shift as GBD did, we used the meta-analyzed global relative risks and applied the conversion for each of our modeled locations, resulting in location-specific continuous shifts that replicate the global dichotomous effect.
In the case of birth weight shifts, it may be more accurate to assume that the relative risks are generalizable across locations.

Additionally, our methods differ from GBD's in that we estimated two separate GA shifts, conditional on baseline GA exposure, for the effect of MMS relative to IFA rather than a single shift applied equally to the entire distribution. This approach allowed us to replicate the literature-reported relative risks of MMS on both preterm birth (<37 weeks) as well as very preterm birth (<32 weeks). This "dual shift" approach follows these steps:

1. Find and apply a shift to the entire distribution that results in the replication of the very preterm birth dichotomous effect

2. Find and apply a second shift that replicates the preterm birth dichotomous effect when applied only to the portion of the distribution with baseline gestational age exposures that are *greater* than 32 (the very preterm birth threshold) *minus* this second shift. Note that the second shift will be negative in direction.

`The estimation of the antenatal supplementation gestational age shifts as described was performed in this notebook <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/antenatal_interventions/Gestational%20age%20shifts.ipynb>`_

Assumptions and limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~

- In the case of IFA, we assume that the entire distribution experiences the same constant shift in gestational age. It is more likely that the lower end of the distribution experiences a greater shift and that the upper end experiences little to no shift (as supported from the MMS evidence). This limitation will result in an underestimation of the impact of the lower end of the distribution (which has a high magnitude of risk, but a low overall exposure) and an overestimation of the impact on the upper end of the distribution (which has lower risk magnitude, but higher overall exposure). However, we have limited data on how to better apply such a shift.

- In the case of MMS, although we have improved the assumption of a single shift applied to the entire distribution through our "dual shift" strategy, it is still limited in that the true shift is likely more of a continuous function with baseline gestational age rather than two conditional values. In particular, a limitation of this approach is the illogical implication that the effect of treatment on a birth that would have been 31.9 weeks without treatment leads to a longer gestation than the effect of the same treatment on a birth that would have been 32.1 weeks without treatment.

  We have some ideas for how we might improve this limitation, including:

    1) Create a function of the dichotomous effect of MMS relative to IFA as a function of baseline gestational age exposure by assuming a linear relationship between the points (32, log(very preterm birth RR)) and (37, log(preterm birth RR)), potentially with some additional constraints (such as constant dichotomous effects above or below some thresholds).

    2) Find gestational age shifts as a function of baseline gestational age that replicates the relative risk values along the line developed in step 1.

  However, we will remain limited by the lack of reported information on the true shape of the association between these "gestational age shifts" and baseline gestational age exposure.

Modeling strategy
~~~~~~~~~~~~~~~~~

The supplementation intervention (all regimens) affects infant gestational age at birth exposures, :ref:`which are documented here <2019_risk_exposure_lbwsg>`. 

Antenatal supplementation intervention should result in an **additive change to a simulant's continuous gestational age exposure value at birth (or upon initialization into the early or late neonatal age groups).** :ref:`The LBWSG risk exposure document can be found here <2019_risk_exposure_lbwsg>`. We assume changes in simulant gestational age exposure values are independent from changes in their birth weight exposure values.

.. list-table:: Restrictions for intervention effect on birthweight
  :header-rows: 1

  * - Restriction
    - Value
    - Note
  * - Male only
    - False
    - 
  * - Female only
    - False
    - 
  * - Age group start
    - Birth
    - 
  * - Age group end
    - Late neonatal
    - 
  * - Other
    - 
    - 

.. list-table:: Supplementation effect on gestational age
  :header-rows: 1

  * - Product
    - Relative to
    - Subpopulation
    - Shift
    - Note
  * - IFA
    - No supplementation
    - Overall
    - IFA_SHIFT
    - 
  * - MMS
    - IFA
    - IFA-shifted GA < (32 - MMS_SHIFT_2)
    - MMS_SHIFT_1
    - 
  * - MMS
    - IFA
    - IFA-shifted GA >= (32 - MMS_SHIFT_2)
    - MMS_SHIFT_1 + MMS_SHIFT_2
    - 
  * - BEP 
    - MMS
    - Overall
    - 0
    - Note effect of BEP is equivalent to effect of MMS relative to IFA or no supplementation

Where,

.. list-table:: Gestational age shift values
  :header-rows: 1

  * - Parameter
    - Value
  * - IFA_SHIFT
    - `Location-specific .csv files of IFA_SHIFT values can be found here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/tree/data_prep/data_prep/antenatal_interventions/ifa_gestational_age_shifts>`_
  * - MMS_SHIFT_1
    - `Location-specific .csv files of MMS_SHIFT_1 values can be found here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/antenatal_interventions/updated_mms_shifts.csv>`_
  * - MMS_SHIFT_2
    - `Location-specific .csv files of MMS_SHIFT_2 values can be found here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/antenatal_interventions/updated_mms_shifts.csv>`_

Verification and validation criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In the baseline scenario, the LBWSG exposure distribution as well as the mortality rates among the neonatal age groups should match that of GBD. 

When birthweight exposures are stratified by supplementation regimen and maternal nourishment strata, then birthweight differences between regimens should match the effect sizes within a given maternal nourishment exposure strata.

The dichotomous measures of effects should also replicate the intended values.

Birth outcomes
++++++++++++++++++

Antenatal supplementation interventions will affect the risk of stillbirth for full term pregnancies (NOTE: not necessary to apply to partial term pregnancies), as described in the :ref:`pregnancy model document <other_models_pregnancy>`. Notably, it is assumed that increased risk of stillbirth will result in decreased risk of live birth and vise versa, with no impact on the risk of abortion/miscarriage or ectopic pregnancy.

The observed effect of each antenatal supplementation product on the risk of stillbirth is summarized below:

.. list-table:: Stillbirth effects
  :header-rows: 1

  * - Supplementation product
    - Stillbirth RR
    - Source
  * - IFA
    - 1
    - Lack of evidence
  * - MMS
    - 0.91 (95% CI: 0.71, 0.93), lognormal distribution of uncertainty
    - Relative to no supplementation/IFA [Oh-et-al-2020]_
  * - BEP
    - 0.39 (95% CI: 0.19, 0.80), lognormal distribution of uncertainty
    - Relative to no supplementation/IFA, [Lassi-et-al-2020-antenatal-supplementation]_

Because there is no effect of IFA on stillbirths and we assume there is no baseline coverage of MMS or BEP, there is no differentiation in stillbirth rate due to baseline coverage of antenatal supplementation products in our modeled populations. Therefore, we can simply apply the relative risk of stillbirth directly to the baseline stillbirth rate without accounting for calibration of baseline coverage (in other words, the PAF of antenatal supplementation on stillbirths is equal to 0).

The relative risk for this risk factor will apply to the probability of experiencing still birth such that:

.. math::

  \text{stillbirth probability}_\text{no supplementation} = \text{stillbirth probability}_{overall} 

  \text{stillbirth probability}_\text{supplement} = \text{stillbirth probability}_{overall} * RR_\text{supplement}

And the probabilities of experiencing the remaining birth outcomes are as follows:

.. math:: 

  \text{other probability}_\text{no supplementation} = \text{other probability}_{overall}

  \text{other probability}_\text{supplement} = \text{other probability}_{overall} 

  \text{live birth probability}_\text{no supplementation} =  \text{live birth probability}_{overall}

  \text{live birth probability}_\text{supplement} = 1 - \text{stillbirth probability}_\text{supplement} - \text{other probability}_{overall}

Where, :math:`\text{stillbirth probability}_{overall}`, :math:`\text{live birth probability}_{overall}`, and :math:`\text{other probability}_{overall}` are defined on the :ref:`closed cohort pregnancy model document <other_models_pregnancy>` and :math:`RR_\text{supplement}` is the supplementation product-specific relative risk of stillbirth, as defined in the table above.

Validation and verification criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- The rate of each birth outcome should continue to validate to input data in the baseline scenario
- Birth outcome rates stratified by the intervention coverage should verify to the magnitude of the risk effect

Assumptions and limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- There is an observed association between severe anemia during pregnancy and stillbirth, as shown in [Young-et-al-2019]_. Therefore, there should hypothetically be some effect of IFA on stillbirth given that it improves hemoglobin concentration during pregnancy; however, we do not consider this effect due to lack of evidence that shows a direct effect of IFA on stillbirth outcomes.

Child Growth Failure (CGF)
+++++++++++++++++++++++++++

While there is little to no evidence that maternal supplementation interventions during pregnancy have a direct effect on CGF exposure, there is evidence that birthweight is causally related to CGF, as discussed on the risk-risk correlation and causation pages for :ref:`birthweight and wasting <2019_risk_correlation_birthweight_wasting>` and :ref:`birthweight and stunting <2019_risk_correlation_birthweight_stunting>`. Therefore maternal supplementation interventions during pregnancy may influence CGF exposures through the pathway 100% mediated through birthweight. Notably, it is possible that BEP supplementation *during lactation* (rather than pregnancy) is directly causally related to CGF exposure, although there is little available evidence on this association (although there are expected measures of association in currently unpublished BMGF trials), but we will not consider this pathway in our simulation until more evidence is available.

Existing evidence that antenatal supplementation is related to CGF exposure later in life includes a recent analysis that found IFA supplementation was associated with reduced risk of stunting among children less than two years of age [Nisar-et-al-2020]_ (RR: 0.92, 95% CI: 0.89, 0.95).

The modeling strategy for the causal impact of maternal supplementation during pregnancy on child growth failure will be informed entirely through the impact on infant birthweight (described above) and the evidence of the impact of birthweight on child growth failure, as informed from [McGovern-et-al-2019-maternal-supplementation]_ (see the risk-risk correlation and causation pages for :ref:`birthweight and wasting <2019_risk_correlation_birthweight_wasting>` and :ref:`birthweight and stunting <2019_risk_correlation_birthweight_stunting>` for more details on the literature evidence and research background).

.. note::
  
  Reasons that studies of maternal supplementation interventions have not shown evidence of an impact on child growth failure exposure include smaller sample sizes that required to measure small effects and lack of sufficient follow-up periods in maternal supplementation trials with primary outcomes of interest involving birth outcomes. Therefore, we will model the impact of maternal supplementation interventions mediated through birthweight for the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>` despite lack of evidence of this association in the literature.

Dynamic child wasting
~~~~~~~~~~~~~~~~~~~~~~~

This modeling strategy is intended to work in tandem with the :ref:`dynamic transition model of child wasting <2020_risk_exposure_wasting_state_exposure>`. The effect of birthweight improvements due to maternal supplementation on child wasting exposure will be applied to the wasting state that the simulant is initialized into. We will conservatively assume that birthweight improvements due to maternal supplementation does not have an impact on x-factor exposure status and/or wasting exposure transition rates.

.. note::

  We may eventually revisit the modeling strategy to follow less conservative assumptions

For each gram increase in a simulant's birthweight due to a maternal supplementation intervention (:math:`S`), the category 1 (severe wasting/SAM) and category 2 (moderate wasting/MAM) exposures used to determine the probability of initialization into those states should be reduced proportionately such that the total reduction in moderate and severe wasting exposure prevalence is equal to 0.0115 / 200 = 0.0000575. The exposure prevalence of category 3 (mild wasting) should be increased by 0.0115 / 200 = 0.0000575. The figure below demonstrates how to implement this change visually. 

For the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>`, the impact of maternal supplementation interventions on CGF exposures can be implemented for simulants born into the simulation only given the six month burn-in period.

.. note::

  For baseline calibration of IFA coverage and wasting initialization state:

    The :math:`S` shift applied to the wasting initialization probabilities according to baseline IFA coverage should be the following:

      uncovered = -(IFA_bw_shift * baseline_IFA_coverage)

      covered = -(IFA_bw_shift * baseline_IFA_coverage) + IFA_bw_shift

  Then, the :math:`S` shift in the intervention scenario should be equal to the sum of all maternal supplementation intervention impacts on birthweight.

.. image:: wasting_exposure_dist.svg

Assumptions and limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The application of the size from [McGovern-et-al-2019-maternal-supplementation]_ makes the following assumptions:

- The effect size is entirely causal and not subject to confounding

- The effect between BW and wasting measured among children under five is applied to prevalent wasting status at six months of age only and does not affect future wasting exposure trajectories (aside from any associated vicious cycle effects). This is a conservative underestimation of the impact of birthweight on child wasting burden.

- The effect of BW on wasting applies proportionately to moderate and severe wasting

Verification and validation criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Verification and validation criteria for the :ref:`dynamic transition model of child wasting <2020_risk_exposure_wasting_state_exposure>` should continue to be met in the baseline scenario

- The effect of the maternal supplementation intervention on birthweight (described in the above section) should continue to meet its validation and verification crtiera

- Wasting exposure state prevalence in the age groups less than six months of age (which should be reflective of initialization wasting state) stratified by maternal supplementation regimen should match the expected effect sizes

Static child wasting
~~~~~~~~~~~~~~~~~~~~~

This modeling strategy is intended to work in tandem with the :ref:`STATIC model of child wasting <2020_risk_exposure_static_wasting>` and should be used for the :ref:`IV iron child simulation <2019_concept_model_vivarium_iv_iron_child_sim>`.

For each gram increase in a simulant's birthweight due to a maternal supplementation intervention (:math:`S`), the category 1 (severe wasting/SAM) and category 2 (moderate wasting/MAM) exposures should be reduced proportionately such that the total reduction in moderate and severe wasting exposure prevalence is equal to 0.0115 / 200 = 0.0000575. The exposure prevalence of category 3 (mild wasting) should be increased by 0.0115 / 200 = 0.0000575. The figure below demonstrates how to implement this change visually. This effect should persist across all ages under five.

.. note::

  For baseline calibration of IFA coverage and wasting initialization state:

    The :math:`S` shift applied to the wasting initialization probabilities according to baseline IFA coverage should be the following:

      uncovered = -(IFA_bw_shift * baseline_IFA_coverage)

      covered = -(IFA_bw_shift * baseline_IFA_coverage) + IFA_bw_shift

  Then, the :math:`S` shift in the intervention scenario should be equal to the sum of all maternal supplementation intervention impacts on birthweight.

.. image:: wasting_exposure_dist.svg

Assumptions and limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The application of the size from [McGovern-et-al-2019-maternal-supplementation]_ makes the following assumptions:

- The effect size is entirely causal and not subject to confounding

- The effect between BW and wasting measured among children under five is applied to prevalent wasting status at six months of age only and does not affect future wasting exposure trajectories (aside from any associated vicious cycle effects). This is a conservative underestimation of the impact of birthweight on child wasting burden.

- The effect of BW on wasting applies proportionately to moderate and severe wasting

Verification and validation criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Verification and validation criteria for the :ref:`static model of child wasting <2020_risk_exposure_static_wasting>` should continue to be met in the baseline scenario

- The effect of the maternal supplementation intervention on birthweight (described in the above section) should continue to meet its validation and verification crtiera

- Wasting exposure state prevalence stratified by maternal supplementation regimen should match the expected effect sizes

Child stunting
~~~~~~~~~~~~~~

For each gram increase in a simulant's birthweight due to a maternal supplementation intervention (including the lack of baseline IFA coverage), the category 1 (severe stunting) and category 2 (moderate stunting) exposures used to determine the probability of initialization into those states should be reduced proportionately such that the total reduction in moderate and severe stunting exposure prevalence is equal to :math:`Y` (defined in the table below). The exposure prevalence of category 3 (mild stunting) should be increased by :math:`Y`. The figure below demonstrates how to implement this change visually. This change in the stunting expousure distribution thresholds attributable to a change in birthweight should be implemented **at birth**, after the calculation of the simulant's stunting initialization propensity correlated with their birthweight percentile, as described above.

.. list-table:: Child Anthropometry Metrics
   :header-rows: 1

   * - Parameter
     - Value
     - Note
     - Source
   * - :math:`Y`
     - 0.0001 (SD: 0.00003)
     - Assume a normal distribution of uncertainty.
     - [McGovern-et-al-2019-maternal-supplementation]_; 200g increase in birthweight associated with a 2.0 (SD: 0.6) percentage decrease in stunting exposure, scaled to a a single gram increase in birthweight. 2.0 was selected instead of 2.3 in order to be conservative.


.. note::

  Similar to child wasting, for baseline calibration of IFA coverage and wasting initialization state:

    The :math:`S` shift applied to the stunting risk exposure probabilities according to baseline IFA coverage should be the following:

      uncovered = -(IFA_bw_shift * baseline_IFA_coverage)

      covered = -(IFA_bw_shift * baseline_IFA_coverage) + IFA_bw_shift

  Then, the :math:`S` shift in the intervention scenario should be equal to the sum of all maternal supplementation intervention impacts on birthweight.

.. image:: stunting_exposure_dist.svg

Assumptions and limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The application of the size from [McGovern-et-al-2019-maternal-supplementation]_ makes the following assumptions:

- The effect size is entirely causal and not subject to confounding

- The effect of BW on stunting applies proportionately to moderate and severe stunting

- We apply the average effect of birthweight on stunting exposure for all ages under 5 years and do not consider effect modification by age, although [McGovern-et-al-2019-maternal-supplementation]_ suggests that the effect is likely larger among younger ages.

Verification and validation criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Verification and validation criteria for the :ref:`child stunting risk exposure <2020_risk_exposure_child_stunting>` component should continue to be met in the baseline scenario

- The effect of the maternal supplementation intervention on birthweight (described in the above section) should continue to meet its validation and verification crtiera

- Stunting exposure state in all age groups stratified by maternal supplementation regimen should match the expected effect sizes

- Model results should be compared to external validation criteria such as [Nisar-et-al-2020]_ and Christian et al. 2013 (discussed on the :ref:`child stunting risk exposure page <2020_risk_exposure_child_stunting>`)

References
------------

.. [Gomes-et-al-2023-antenatal-supplementation]
  Gomes F, Askari S, Black RE, Christian P, Dewey KG, Mwangi MN, Rana Z, Reed S, Shankar AH, Smith ER, Tumilowicz A. Antenatal multiple micronutrient supplements versus iron-folic acid supplements and birth outcomes: Analysis by gestational age assessment method. Matern Child Nutr. 2023 Jul;19(3):e13509. `https://doi.org/10.1111/mcn.13509 <https://doi.org/10.1111/mcn.13509>`_

.. [Keats-et-al-2019-maternal-supplementation]
  Keats  EC, Haider  BA, Tam  E, Bhutta  ZA. Multiple‐micronutrient supplementation for women during pregnancy. Cochrane Database of Systematic Reviews 2019, Issue 3. Art. No.: CD004905. DOI: 10.1002/14651858.CD004905.pub6. Accessed 30 August 2021. `https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD004905.pub6/full <https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD004905.pub6/full>`_

.. [Lassi-et-al-2020-antenatal-supplementation]
  Lassi ZS, Padhani ZA, Rabbani A, Rind F, Salam RA, Das JK, Bhutta ZA. Impact of Dietary Interventions during Pregnancy on Maternal, Neonatal, and Child Outcomes in Low- and Middle-Income Countries. Nutrients. 2020 Feb 19;12(2):531. doi: 10.3390/nu12020531. PMID: 32092933; PMCID: PMC7071393.

.. [Li-et-al-2019-antenatal-supplementation]
  Li, B., Zhang, X., Peng, X., Zhang, S., Wang, X., & Zhu, C. (2019). Folic Acid and Risk of Preterm Birth: A Meta-Analysis. Frontiers in Neuroscience, 13, 1284. https://doi.org/10.3389/fnins.2019.01284

.. [McGovern-et-al-2019-maternal-supplementation]
  McGovern, M. E. (2019). How much does birth weight matter for child health in developing countries? Estimates from siblings and twins. Health economics, 28(1), 3-22. `https://pubmed.ncbi.nlm.nih.gov/30239053 <https://pubmed.ncbi.nlm.nih.gov/30239053/>`_.

.. [Nisar-et-al-2020]
  Nisar YB, Aguayo VM, Billah SM, Dibley MJ. Antenatal Iron-Folic Acid Supplementation Is Associated with Improved Linear Growth and Reduced Risk of Stunting or Severe Stunting in South Asian Children Less than Two Years of Age: A Pooled Analysis from Seven Countries. Nutrients. 2020 Aug 28;12(9):2632. doi: 10.3390/nu12092632. `https://pubmed.ncbi.nlm.nih.gov/32872329/ <https://pubmed.ncbi.nlm.nih.gov/32872329/>`_

.. [Oh-et-al-2020]
  Oh, C., Keats, E. C., & Bhutta, Z. A. (2020). Vitamin and Mineral Supplementation During Pregnancy on Maternal, Birth, Child Health and Development Outcomes in Low- and Middle-Income Countries: A Systematic Review and Meta-Analysis. Nutrients, 12(2), 491. https://doi.org/10.3390/nu12020491

.. [Ota-et-al-2015]
  Ota  E, Hori  H, Mori  R, Tobe‐Gai  R, Farrar  D. Antenatal dietary education and supplementation to increase energy and protein intake. Cochrane Database of Systematic Reviews 2015, Issue 6. Art. No.: CD000032. DOI: 10.1002/14651858.CD000032.pub3. Accessed 30 August 2021. `https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD000032.pub3/full <https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD000032.pub3/full>`_

.. [Pena-Rosas-et-al-2015]
  Peña‐Rosas  JP, De‐Regil  LM, Gomez Malave  H, Flores‐Urrutia  MC, Dowswell  T. Intermittent oral iron supplementation during pregnancy. Cochrane Database of Systematic Reviews 2015, Issue 10. Art. No.: CD009997. DOI: 10.1002/14651858.CD009997.pub2. Accessed 30 August 2021. `https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD009997.pub2/full <https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD009997.pub2/full>`
