.. _breastfeeding_promotion:

====================================================
Breastfeeding Promotion and Education
====================================================

.. contents::
   :local:
   :depth: 2

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - IYCF
    - Infant and young child feeding
    - 
  * - WBTi
    - World Breastfeeding Trend Initiative
    - 
  * - EBF
    - Exclusive breastfeeding
    - 
  * - NEBF
    - Non-exclusive breastfeeding
    - 

Intervention Overview
-----------------------

A systematic review on the impacts of infant and young child feeding (IYCF) nutrition interventions on breasfeeding practices, growth, and mortality in low- and middle-income countries was recently performed by [Lassi-et-al-2020]_. [Lassi-et-al-2020]_ reviewed several types of interventions related to IYCF practices, including interventions to promote a) early (within an hour of birth), b) exclusive breastfeeding (measured at three and six months), and b) continued breastfeeding (measured at 12, 18, and 24 months). Notably, of the 38 studies related to breastfeeding education interventions, none reported outcomes specific to continued breastfeeding. Based on six studies (very low quality evidence), breastfeeding interventions were associated with 2.02 (95% CI: 1.88, 2.17) times exclusive breastfeeding at three months; sensitivity analysis for allocation concealment removed five studies and yielded an RR=1.65 (95% CI: 1.49, 1.84). Based on 19 studies (very low quality evidence), breastfeeding education interventions were associated with 1.53 (95% CI: 1.47, 1.58) times the rate of exclusive breastfeeding at six months; sensitivity analaysis for allocation concealment removed five studies and yielded an RR=1.37 (95% CI: 1.32, 1.42).

Additionally, a *cluster* randomized controlled trial on breastfeeding education and support in a rural Ethiopian setting was recently conducted by [Abdulahi-et-al-2021]_. [Abdulahi-et-al-2021]_ discusses that in Ethiopia, the National Nutrition Program set a target to increase the rate of exclusive breastfeeding by 22% between 2016 and 2020, although only a one percent increase was achieved by 2019. The current routine care practice regarding IYCF practices in Ethiopia includes perinatal care packages provided at health facilities for four focused antenatal visits, delivery care, and five contacts of postnatal care. As part of newborn care immediately after birth women are encouraged to initiate breastfeeding within one hour and are counselled on correct positioning. They are advised to exclusively breastfeed for the first six months at each postnatal contact. However, a barrier to these care services is low attendance of facility delivery rates and postnatal visits, particularly for rural mothers. Outreach programs for such women exist as part of the current community-based nutrition program in Ethiopia, which includes health extension workers and local women peer-educators, also known as the Women Development Army leaders; however, these workers are overburdened with assigned tasks and are hindered in provided support that lactating mothers need, particularly during the immediate postpartum period. 

The study conducted by [Abdulahi-et-al-2021]_ evaluated a community-based peer-led breastfeeding education and support intervention delivered during the prenatal and postnatal period through the established Women Development Army system in comparison to routine care. The study was conducted in Manna district located in Jimma Zone in southwest Ethiopia in rural setting. Allocation of study arms was conducted at the sub-district level among 36 sub-districts in the study location. Women were recruited during their second or third trimester of pregnancy. Peer-supporters made visits to women in the intervention arm twice in the last trimester of pregnancy (during the 8th and 9th month); on the 1st or 2nd, 6th or 7th, and 15th day after delivery; and thereafter monthly until the infant was five months old. Women in the control arm received routine care from health extension workers (described above).

[Abdulahi-et-al-2021]_ found that 68.3% of women in the intervention arm and 54.8% in the control arm were practicing exclusive breastfeeding at six months postpartum and reported a 14.6% (95% CI: 3.77, 25.5) adjusted risk difference. The implied relative risk is equal to 1.25 (calculated as 0.683 / 0.548). Notably, the rates of exclusive breastfeeding among infants under six months of age as estimated by the 2020 GBD in Ethiopia is approximately 61%, which is similar to although slightly higher than the estimate of exclusive breastfeeding rates among the population receiving routine care in this study.

Relative risk calculation
++++++++++++++++++++++++++

The study conducted by [Abdulahi-et-al-2021]_ was cluster randomized at the sub-district level. Risk difference in exclusive breastfeeding rates between study arms were estimated using linear probability models, applying a robust standard error estimation that accounted for clustering by sub-district.

[Abdulahi-et-al-2021]_ reported that the intevention arm had 249 subjects, 68.3 percent of whom were exclusively breastfeeding at six months postpartum. The control arm had 219 subjects, 54.8 percent of whom were exclusively breastfeeding at six months. The unadjusted risk difference between study arms in rates of breastfeeding was 14.4 percent (95% CI: 3.91, 24.8); the adjusted risk difference was 14.6 percent (95% CI: 3.77, 25.5) (model covariates included maternal age, educational status, wealth index, parity, and Iowa Infant Feeding Attitude Scale at baseline).

For use in our simulation, we are interested in estimating the relative risk of the intervention rather than the risk difference. While we can calculate a crude relative risk from the information reported in the paper, we cannot calculate a relative risk that adjusts for clustering of subjects by sub-district. 

.. list-table::
  :header-rows: 1

  * - Study arm
    - EBF (proportion)
    - EBF (n)
    - Total (n)
  * - Intervention
    - p1 = 0.683
    - x1 = 170
    - n1 = 249
  * - Control
    - p2 = 0.548
    - x2 = 120
    - n2 = 219

**(1).** Estimate risk difference and confidence interval without clustering adjustment to compare to adjusted estimate:

.. math::

  p_1 - p_2 \pm z \sqrt{\frac{p_1-(1-p_1)}{n_1}+\frac{p_2-(1-p_2)}{n_2}}

Given z=1.96, the resulting unadjusted risk difference equals 13.5 percent (95% CI: 4.73, 22.27). The width of the calculated confidence interval is 17.5 percentage points, compared to the 20.9 percentage point width of the reported confidence interval. In other words, the reported confidence interval (accounting for clustering) is 20% wider than the calculated confidence interval that does not account for clustering. 

.. note:: 

  The magnitude of the calculated risk difference is slightly less than that of the reported risk difference adjusted for clustering. This is a limitation of our approach that will conservatively underestimate the impact of the intervention.

**(2).** Calculate the relative risk and confidence interval of *non*-exclusive breastfeeding among the intervention relative to control arms of the study (note that non-exclusive breastfeeding is selected as the outcome of interest rather than exclusive breastfeeding so that the relative risk is <1 so that the application of the risk effect may never result in a risk exposure greater than one):

.. math::

  RR = \frac{1-p_1}{1-p_2}

.. math::

  ln(RR) \pm z * \sqrt{\frac{(n_1-x_1)/x_1}{n_1}+\frac{(n_2-x_2)/x_2}{n_2}} 

The resulting estimate is: 0.702 (95% CI: 0.606, 0.813).

**(3).** Inflate the estimated confidence interval about the calculated relative risk by 20% in either direction in accordance with the inflated magnitude of the confidence interval in the comparison in step (1).

  Lower bound:

  - lower bound difference: 0.702 - 0.606 = 0.096 
  - inflated lower bound difference: 0.096 * 1.2 = 0.115
  - updated lower bound: 0.702 - 0.115 = 0.587

  Upper bound:

  - upper bound difference: 0.813 - 0.702 = 0.111
  - inflated upper bound difference = 0.111 * 1.2 = 0.133
  - updated upper bound: 0.702 + 0.133 = 0.835

So, the resulting relative risk and confidence interval are equal to **0.702 (95% CI: 0.587, 0.835)**.

.. _breastfeeding_intervention_baseline_data:

Baseline Coverage Data
++++++++++++++++++++++++

According to its website, the `World Breastfeeding Trends Initiative (WTBi) <https://www.worldbreastfeedingtrends.org/>`_ "assists countries to assess the status of and benchmark the progress in implementation of the Global Strategy for Infant and Young Child Feeding in a standard way." The :download:`most recent WTBi report for Ethiopia <WBTi-Ethiopia-2013.pdf>` was conducted in 2013 and reported that  "Individual counselling and group education services related to
infant and young child feeding [were] available within the
health/nutrition care system or through community outreach ... **to some degree**" (p 23). 

Given the landscape of breastfeeding education and support in Ethiopia as described by [Abdulahi-et-al-2021]_ and the proposed changes to the protocol in the intervention arm of this study, we will model **zero baseline coverage of the improved breastfeeding support intervention** (as the intervention arm in [Abdulahi-et-al-2021]_) and 100% coverage of routine care (control arm in [Abdulahi-et-al-2021]_) in Ethiopia and use the implied effect size associated with the transition from existing routine care to the improved intervention protocol from [Abdulahi-et-al-2021]_.

Vivarium Modeling Strategy
---------------------------

Suboptimal breastfeeding
++++++++++++++++++++++++++

Given the lack of evidence of breastfeeding education and support interventions on rates of continued breastfeeding between six and 24 months, we will model an impact of the breastfeeding education and support intervention on rates of exclusive breastfeeding in the first six months of life only. We will inform the intervention effect size from [Abdulahi-et-al-2021]_ and apply it from birth until six months postpartum. Since intervention impact is measured in terms of exclusive breastfeeding rates only with no consideration of predominant/partial/or no breastfeeding types of nonexclusive breastfeeding, we will conservatively assume that the increase in exclusive breastfeeding rates results in a reduction in the rates of predominant breastfeeding first followed by partial and no breastfeeding as appropriate.

.. note::

  From Abie: If it turns out that the relative impact of BFP is small, we might want to flip these assumptions to the most generous (rather than the most conservative) so that we can say that even with the most generous assumptions, BFP does not have much impact. 

The effect of the breastfeeding promotion intervention should be applied in order to measure a decrease in the combined risk exposure of NEBF categories other than the TMREL (exclusive breastfeeding/cat4) as shown below, where RR_nebf = 0.702 (95% CI: 0.587, 0.835; lognormal distribution of uncertainty):

.. code-block:: python

  NEBF_exposure_uncovered = exposure_cat1_gbd + exposure_cat2_gbd + exposure_cat3_gbd
  NEBF_exposure_covered = NEBF_exposure_uncovered * RR_nebf
  NEBF_exposure_reduction = NEBF_exposure_uncovered - NEBF_exposure_covered

Changes to individual simulant NEBF risk exposures should then be made in the following fashion:

  For simulants covered by the intervention, their breastfeeding exposure propensity should not change, but the exposure threshold values used to determine the exposure category for that simulant should change according to the code block below. This strategy should be followed for all eligible age groups. Simulants who are not covered by the intervention should use the same exposure category threshold values as implied from the GBD risk exposure. A table of the risk exposure categories for the exclusive breastfeeding risk factor (REI ID 136) is included below for reference.

.. note::

  The exposure prevalence of cat3/predominant breastfeeding in Ethiopia is approximately equal to 28% and therefore the effect shift should be less than the exposure prevalence of cat3. However, in the event that is not true for a specific draw, the following strategy should be followed:

.. code-block:: python


  effect_shift = NEBF_exposure_reduction
  exposure_cat4_intervention = exposure_cat4_gbd + effect_shift

  if effect_shift > exposure_cat3_gbd:
    exposure_cat3_intervention = 0
    
    if effect_shift > exposure_cat3_gbd + exposure_cat2_gbd:
      exposure_cat2_intervention = 0
      exposure_cat1_intervention = exposure_cat1_gbd - (effect_shift - exposure_cat3_gbd - exposure_cat2_gbd)

    else:
      exposure_cat2_intervention = exposure_cat2_gbd - (effect_shift - exposure_cat3_gbd)
      exposure_cat1_intervention = exposure_cat1_gbd

  else:
    exposure_cat3_intervention = exposure_cat3_gbd - effect_shift
    exposure_cat2_intervention = exposure_cat2_gbd
    exposure_cat1_intervention = exposure_cat1_gbd

.. list-table:: Exclusive breastfeeding (REI ID 136) exposure categories
  :header-rows: 1

  * - Category
    - Definition
    - Note
  * - cat4
    - Exclusive breastfeeding
    - TMREL
  * - cat3
    - Predominant breastfeeding
    - 
  * - cat2
    - Partial breastfeeding
    - 
  * - cat1
    - No breastfeeding
    -
  
Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Effect size taken from [Abdulahi-et-al-2021]_ was not evaluated in a nationally representative study population.
#. We conservatively assume that an increase in exclusive breastfeeding is paired with a decrease in the next-lowest risk exposure category (ordered as predominant, partial, and no breastfeeding). In other words, the intervention will not have an impact on the rates of no breastfeeding.
#. We assume the intervention effect is constant from birth until six months postpartum.
#. We are limited by lack of data regarding interventions on rates of continued breastfeeding.
#. We are limited in using a risk difference as reported by [Abdulahi-et-al-2021]_ specific to a control population that has slightly lower rates of exclusive breastfeeding than the simulated population as estimated by GBD.
#. We are limited in that we cannot estimate the intervention relative risk on exclusive breastfeeding in a way that considers the impact of clustering of exclusive breastfeeding rates among study subjects by sub-district. However, we have attempted to inflate the uncertainty about our calculated relative risk in order to account for this limitation. Additionally, given that the crude risk difference was lower in magnitude than the clustering-adjusted risk difference reported by [Abdulahi-et-al-2021]_, bias introduced by this limitation is likely conservative in terms of the estimation of intervention impact (biased towards the null).

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Suboptimal breastfeeding risk exposure should continue to validate to GBD in the baseline scenario
- Rates of exclusive breastfeeding among those covered by the intervention should increase by the effect size. Remaining exposure categories should change according to the expected pattern.

References
------------

.. [Abdulahi-et-al-2021]
  Abdulahi, M., Fretheim, A., Argaw, A., & Magnus, J. H. (2021). Breastfeeding Education and Support to Improve Early Initiation and Exclusive Breastfeeding Practices and Infant Growth: A Cluster Randomized Controlled Trial from a Rural Ethiopian Setting. Nutrients, 13(4), 1204. https://doi.org/10.3390/nu13041204

.. [Lassi-et-al-2020]
  Lassi, Z. S., Rind, F., Irfan, O., Hadi, R., Das, J. K., & Bhutta, Z. A. (2020). Impact of Infant and Young Child Feeding (IYCF) Nutrition Interventions on Breastfeeding Practices, Growth and Mortality in Low- and Middle-Income Countries: Systematic Review. Nutrients, 12(3), 722. https://doi.org/10.3390/nu12030722