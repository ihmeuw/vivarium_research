.. _zinc_supplementation:

====================================================
Zinc Supplementation
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
  * - 
    - 
    - 

Intervention Overview
-----------------------

Zinc is a micronutrient important to child health. Zinc deficiency :ref:`exposure <2019_risk_exposure_zinc_deficiency>` and :ref:`effects <2019_risk_effect_zinc_deficiency>` are described on these respective pages. Zinc deficiency is most often a result of insufficient zinc consumption and can be prevented and addressed via zinc supplementation. Zinc supplementation can take the form of capsules, tablets, drops, syrups, or powders that either contain zinc alone or are packaged with additional micronutrients.

Notably, a recent Cochrane Review found that while zinc had significant positive effects among children older than six months of age, there was insufficient evidence to support the recommendation of zinc supplementation among infants aged zero to six months [Lassi-et-al-2020-zinc-supplementation]_. However, a more recent analysis reported potential important reductions in infant mortality associated with zinc supplementation [Rouhani-et-al-2022]_. Additionally, [Li-et-al-2022]_ published an "umbrella review" of health outcomes associated with zinc supplementation among all ages, including a dose-response analysis.

.. note::

  For the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>` we initially modeled the zinc supplementation intervention among all children 0-5 years of age and then updated the model to include only children 6 months to 5 years of age ([Lassi-et-al-2020-zinc-supplementation]_). However, this age restriction update was erroneously applied only to the baseline intervention and not to the intervention scale-up in the alternative scenarios, so we excluded zinc supplementation effects in our results via post-processing instead of the simulation implementation.

  Additionally, it is important to note that :ref:`small quantity lipid-based nutrient supplement <lipid_based_nutrient_supplements>` and formulations may contain zinc and therefore attention should be paid to ensure that effects of zinc supplementation are not double counted when included in the same model as SQ-LNS and other potentially similar interventions. 

  This strategy may want to be revisited if this intervention will be included in future simulation projects!

.. list-table:: Affected Outcomes
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note 
  * - Diarrheal diseases incidence rate
    - Decreases
    - Yes
    - 
  * - Diarrheal diseases duration
    - Decreases
    - Yes
    - 
  * - Diarrheal diseases severity
    - Decreases
    - No
    -  
  * - Zinc deficiency
    - Decreases
    - No
    - 

.. _`zinc-baseline-parameters`:

Baseline Coverage Data
++++++++++++++++++++++++

.. list-table:: Preventative zinc baseline coverage
  :header-rows: 1

  * - Location
    - Population
    - Value
    - Source
    - Note
  * - Ethiopia
    - Children 6 to 59 months 
    - 0
    - Optomistic assumption
    - Optomistic assumption chosen to maximize impact of zinc supplementation intervention given that expected impact in the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>` is small

.. list-table:: Therapeutic zinc baseline coverage
  :header-rows: 1

  * - Location
    - Population
    - Value
    - Source
    - Note
  * - Ethiopia
    - Children six to 59 months with recent episode of diarrhea
    - 0.499 (SD=0.143, normal distribution of uncertainty truncated at 0 and 1)
    - Ethiopia DHS 2016
    - Standard deviation calculated based on n=1227

.. todo::

  Update therapeutic zinc baseline coverage to more recent year based on GBD covariate/LBD data

Vivarium Modeling Strategy
--------------------------

.. note::

  It is likely most appropriate to implement preventative and therapeutic zinc supplementation as separate interventions in Vivarium given that there are different values for baseline coverage of each intervention. However, since they use the same product, they should be considered the same product or the costing model.

  For the scale-up of therapuetic supplementation interventions for the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>`, therapuetic and preventative zinc should each scale-up from their respective baseline to target coverage values over the specified period described on the concept model document. However, **the same propensity should be used for coverage of both therapeutic and preventative zinc interventions** such that a simulant covered by the intervention with the lower coverage is guarenteed to be covered by the intervention with the higher coverage at any given time.

.. list-table:: Modeled Outcomes
  :header-rows: 1

  * - Outcome
    - Outcome type
    - Outcome ID
    - Affected measure
    - Effect size measure
    - Effect size
    - Note
  * - Diarrheal diseases
    - GBD cause
    - 302
    - Incidence rate
    - Relative risk
    - Defined below
    - 
  * - Diarrheal diseases
    - GBD cause
    - 302
    - Duration/remission rate
    - Mean difference in duration
    - Converted to a relative risk for remission rate
    - Note this will affect the diarrheal diseases cause model only and other outcomes assoicated with diarrheal disease remission rates/duration such as the wasting transition model, etc.

Preventative zinc supplementation effect on diarrheal diseases incidence rate
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Zinc supplementation is associated with decreased incidence of diarrheal diseases by a relative risk of **0.89 (95% CI: 0.82, 0.97; lognormal distribution of cuncertainty)** [Tam-et-al-2020]_. This risk effect should be applied multiplicatively to the incidence rate of diarrheal diseases for simulants who are covered by preventative zinc supplementation.

.. note::

  No baseline calibration is necessary for Ethiopia given that the baseline coverage of the intervention is zero. However, the following strategy may be used to be compatible with non-zero baseline coverage values if necessary:

    To calculate a PAF specific to the intervention, create a dichotomous "risk" factor for lack of preventative zinc supplementation with a risk exposure equal to 1-coverage of preventative zinc supplementation and a risk effect equal to 1/the relative risk of preventative zinc supplementation. Then, calculate the PAF according to the risk exposure and effect (should equal zero for Ethiopia). Then, incidence_rate_i = incidence_rate * (1-PAF) * RR_i.

Therapeutic zinc supplementation on diarrheal diseases remission rate
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

According to the Cochrane review performed by [Lazzerini-and-Wanzira-2016]_, zinc supplementation may shorten the average duration of diarrhea by around half a day (-11.46 hours; 95% CI: -19.72, -3.19). Notably, the effect appears to be greater in children with signs of malnutrition at (-26.39 hours; 95% CI: -36.54, -16.23).

Given that:

  duration = duration_covered * coverage + duration_uncovered * (1 - coverage)

  MD = duration_covered - duration_uncovered

Then:

  duration_uncovered = duration - (MD * coverage) 

  duration_covered = duration_covered + MD

And:

  remission_rate_uncovered = 1 / (duration_uncovered / 365)

  remission_rate_covered = 1 / (duration_covered / 365)

So:

  RR = remission_rate_covered / remission_rate_uncovered

  PAF = (coverage * RR + (1-coverage) - 1) / (coverage * RR + (1-coverage))

Then, the impact of the intervention can be applied in Vivarium like so:

  remission_rate_i = remission_rate * (1 - PAF) * RR_i

Where,

.. list-table::
  :header-rows: 1

  * - Parameter
    - Definition
    - Value
    - Note
  * - remission_rate
    - Diarrheal diseases remission rate (per person-year)
    - Defined on the :ref:`diarrheal diseases cause model document <2019_cause_diarrhea>`
    - 
  * - coverage
    - Baseline coverage of therapeutic zinc
    - Defined in the table above
    - 
  * - MD_hours 
    - Mean difference in diarrhea duration for therapeutic zinc in hours
    - -11.46 (95% CI: -19.72, -3.19; normal distribution of uncertainty)
    - From [Lazzerini-and-Wanzira-2016]_
  * - MD
    - Mean difference in diarrhea duration for therapeutic zinc in years
    - MD_hours / 24 / 365
    - 
  * - duration
    - Average duration of diarrhea in years
    - :ref:`diarrheal diseases cause model document <2019_cause_diarrhea>`
    - Will need to be converted to years (defined in days)
  * - RR_i
    - Diarrheal disease remission rate relative risk for an individual simulant dependant on their therapeutic zinc intervention coverage
    - RR as calculated above if covered by therapeutic zinc intervention; otherwise 1
    - 

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. The average duration of a diarrhea episode used in GBD is not estimated at the location-specific level.

#. We do not consider effect modification by baseline burden of zinc deficiency, level of zinc intake, or zinc fortification coverage. Notably, the PAF for zinc deficiency and diarrheal diseases in Ethiopia as estimated by GBD 2019 among children under five years of age is quite low. However, challenges around the definition and measurement of zinc deficiency may explain this finding. We chose to rather model the directly measured effect of zinc supplementation on diarrheal disease incidence, for which there may be an effect even among those who do not meet the criteria for zinc deficiency.

#. We do not consider the impact of zinc supplementation on diarrheal disease severity, including excess mortality rate or disability weights.

#. We do not consider effect modification of zinc supplementation by malnutrition status (nor do we consider the impact of malnutrition of diarrheal diseases remission or duration). This may underestimate the impact of the intervention of wasting in the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>`.

#. We assume a simple model of zinc supplementation uptake.

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. The diarrheal diseases incidence and remission rates in the baseline scenario should continue to match the artifact data

#. The coverage of preventative and therapeutic zinc interventions should match the expected values

#. Diarrheal diseases incidence rates stratified by preventative zinc coverage should replicate the expected effect size

#. Diarrheal disease remission rates stratified by therapeutic zinc coverage should replicate the expectede ffect size

References
------------

.. [Lassi-et-al-2020-zinc-supplementation]
  Lassi ZS, Kurji J, Oliveira CS, Moin A, Bhutta ZA. Zinc supplementation for the promotion of growth and prevention of infections in infants less than six months of age. Cochrane Database Syst Rev. 2020 Apr 8;4(4):CD010205. doi: 10.1002/14651858.CD010205.pub2. 

.. [Lazzerini-and-Wanzira-2016]
  Lazzerini, M., & Wanzira, H. (2016). Oral zinc for treating diarrhoea in children. The Cochrane database of systematic reviews, 12(12), CD005436. https://doi.org/10.1002/14651858.CD005436.pub5

.. [Li-et-al-2022]
  Li J, Cao D, Huang Y, Chen B, Chen Z, Wang R, Dong Q, Wei Q, Liu L. Zinc Intakes and Health Outcomes: An Umbrella Review. Front Nutr. 2022 Feb 8;9:798078. doi: 10.3389/fnut.2022.798078. 

.. [Rouhani-et-al-2022]
  Rouhani P, Rezaei Kelishadi M, Saneei P. Effect of zinc supplementation on mortality in under 5-year children: a systematic review and meta-analysis of randomized clinical trials. Eur J Nutr. 2022 Feb;61(1):37-54. doi: 10.1007/s00394-021-02604-1. Epub 2021 Jun 13. 

.. [Tam-et-al-2020]
  Tam, E., Keats, E. C., Rind, F., Das, J. K., & Bhutta, A. (2020). Micronutrient Supplementation and Fortification Interventions on Health and Development Outcomes among Children Under-Five in Low- and Middle-Income Countries: A Systematic Review and Meta-Analysis. Nutrients, 12(2), 289. https://doi.org/10.3390/nu12020289