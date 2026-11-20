.. _lsff_2026_nigeria_data:

============
Nigeria data
============

.. contents::
  :local:

Overview
++++++++

Nigeria's food fortification standards are set by the Standards Organisation of
Nigeria (SON) and regulated by the National Agency for Food and Drug
Administration and Control (NAFDAC) [Fisher-2023]_. Under NAFDAC's
Food Fortification Regulations in 2021, wheat flour, maize flour, semolina, and
composite flour must be fortified with vitamins A, B1, B2, B3, B6, B9 (folic
acid) and B12, iron and zinc. Sugar, vegetable oil, and margarine must be
fortified with vitamin A, and salt must be iodized [Fisher-2023]_.

In 2021, the Federal Ministry of Health's national micronutrient guidelines
identified bouillon and rice as additional vehicles under consideration for
large-scale fortification [FMoH-MNDC-2021]_. SON adopted a voluntary code of
practice for fortifying bouillon in 2024, covering iron, zinc, folic acid and
vitamin B12 [Tarini-2025]_. Rice fortification is
currently voluntary, and SON is still developing standards for fortified rice
kernels and fortified milled rice [GAIN-WFP-2022]_ [Nnabugwu-2025]_.

NFCMS 2021
++++++++++

The National Food Consumption and Micronutrient Survey (NFCMS) is a nationally
representative survey of food consumption and micronutrient status in Nigeria,
carried out in 2021 [NFCMS-2021]_. It reports results separately for three
population groups: non-pregnant women aged 15 to 49 years, pregnant women aged
15 to 49 years, and children aged 6 to 59 months.

The survey was run from February to July 2021 and led by the International
Institute of Tropical Agriculture (IITA) for the Federal Government of Nigeria.
For dietary intake, NFCMS collected a diet questionnaire, covering which
fortifiable vehicles households consume, and a 24-hour recall of what the
respondent ate the previous day. The final analysis sample was 5,326
non-pregnant women, 1,010 pregnant women and 5,079 children aged 6–59 months for
the diet questionnaire, and 5,241, 999 and 5,020 respectively for the 24-hour
recall. The survey uses sampling weights to represent Nigeria's population
rather than only the people sampled.

Data we use
+++++++++++

Share of people consuming the vehicle
-------------------------------------

NFCMS reports the share of people who consume each vehicle for non-pregnant
women, pregnant women, and children under five. For non-pregnant women it also
breaks this down by wealth quintile, and for children under five by sex. NFCMS
doesn't report the share consuming rice, so we use values provided by the Gates
Foundation from INTAKE, by wealth quintile.

.. note::

  Even though NFCMS reports three population groups, we use the non-pregnant
  women values, by wealth quintile, for everyone in our model.

Fortified fraction of the vehicle
---------------------------------

The fortified fraction of the vehicle (FFV) is the fraction of the vehicle that
is fortified, whether or not the fortification is effective. NFCMS records
whether respondents consumed food that is labelled as fortified. We estimate FFV
as:

.. math::

  \text{FFV} = \frac{\text{share who consumed the vehicle labelled as fortified}}
  {\text{share who consumed the vehicle}}

These values were reported for non-pregnant women, stratified by wealth
quintile, and we apply them to all population groups.

.. note::

  We only use NFCMS to estimate FFV for bouillon. NFCMS doesn't report rice, so
  it isn't included. The NFCMS values for wheat are very different from the
  Gates Foundation values, so we use the Gates Foundation values. NFCMS notes
  that FFV for wheat flour "may be underestimated as 10 percent of the
  households of the respondents could not report the brand of the consumed
  wheat flour" [NFCMS-2021]_ (p. 189). NFCMS values for salt only indicate
  iodine fortification, and don't include information on double fortified salt.

Fortification effectiveness
---------------------------

NFCMS measured RBC folate in women of reproductive age and found that 95% have
RBC folate insufficiency [NFCMS-2021]_ (p. 371, Figure 71). Given this, we
assume baseline effectiveness of folic acid fortification in Nigeria is 0%. We
apply this to every vehicle and every population group in the model.

Usual intake of the vehicle
---------------------------

NFCMS reports usual intake of each vehicle in grams per day, as a mean and an
interquartile range (IQR). NFCMS doesn't report a standard deviation (SD), so we
estimate it from the IQR. Assuming intake is normally distributed, the IQR is
about 1.35 SDs wide [Cochrane-Handbook-Ch6]_, so:

.. math::

  \text{SD} = \frac{\text{IQR}}{1.35}

For salt and bouillon we use this SD directly. For wheat flour and rice, the SDs
estimated from the IQR didn't fit the model's split between consumers and
non-consumers. Instead we calculate the coefficient of variation (CoV), the SD
divided by the mean, and apply it to intake among consumers.

.. todo::

  Decide whether to use one method (SD from IQR, or CoV among consumers) for
  all vehicles in Nigeria, and expand the explanation of why the wheat flour and
  rice SDs didn't fit the consumer/non-consumer split.

The model needs usual intake by wealth quintile, age, and sex. NFCMS reports
intake for non-pregnant women, pregnant women, and children under five. Intake
by wealth quintile is only reported for non-pregnant women. Children under five
don't have quintile-specific values, so we spread their mean and SD across
quintiles using the wealth pattern of non-pregnant women.

NFCMS has no values for ages 5–15, so we use the average of the values for
children under five and for non-pregnant women. We don't model children under
five in this part of the model, so the under-five values are only used to
calculate this average, which gives consumption for women aged 10–14 in the
pregnancy simulation. NFCMS reports intake by sex only for children under five.
For men aged 15 and over, we multiply the non-pregnant women values by the ratio
of male to female intake among children under five.

.. note::

  The usual intake values for men are calculated but not currently used. The
  non-pregnant anemia model doesn't need consumption amounts, because the effect
  on hemoglobin doesn't depend on how many grams of the vehicle are eaten. The
  usual intake values for pregnant women are not currently used.

.. todo::

  Decide whether the pregnant women intake values should be mentioned here at
  all, given they aren't used, and whether to keep calculating intake for men,
  given it isn't used.

Assumptions and limitations
+++++++++++++++++++++++++++

Several assumptions above affect the results and should be kept in mind when
interpreting them:

- Non-pregnant women's values for the share consuming the vehicle and FFV are
  used for all population groups.
- Intake is assumed to be normally distributed, so the SD can be estimated from
  the IQR. However, NFCMS states that nutrient intake distributions tend to be
  skewed.
- Intake for ages 5–15 is the average of the under-five and non-pregnant women
  values.
- Children under five have the same wealth pattern in intake as non-pregnant
  women.

References
++++++++++

.. [Cochrane-Handbook-Ch6]
  Higgins JPT, Li T, Deeks JJ (editors). Chapter 6: Choosing effect measures
  and computing estimates of effect. In: Cochrane Handbook for Systematic
  Reviews of Interventions. Cochrane.
  `<https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-06>`_

.. [Fisher-2023]
  Fisher L, McDonald S, Jones A. Policy and Regulatory Determinants of
  Nutrition Labelling to Support Large-Scale Food Fortification: An Examination
  of 11 Geographies (Nigeria chapter, pp. 60–65). Sydney: The George Institute
  for Global Health; 2023.
  `<https://www.georgeinstitute.org/our-research/areas/food-policy/how-can-nutrition-labelling-support-large-scale-food-fortification>`_

.. [FMoH-MNDC-2021]
  Federal Ministry of Health, Nigeria. National Guidelines for the Prevention
  and Control of Micronutrient Deficiencies. Abuja: Federal Ministry of Health;
  2021.
  `<https://nationalqoc.fmohconnect.gov.ng/wp-content/uploads/2023/07/2021-MNDC-Guidelines.pdf>`_

.. [GAIN-WFP-2022]
  Global Alliance for Improved Nutrition (GAIN) and World Food Programme (WFP).
  Towards the Adoption of Rice Fortification in Nigeria: Landscape Analysis
  Report. 2022.
  `<https://docs.wfp.org/api/documents/WFP-0000143916/download>`_

.. [NFCMS-2021]
  Federal Government of Nigeria (FGoN) and International Institute of Tropical
  Agriculture (IITA). National Food Consumption and Micronutrient Survey 2021:
  Final Report. Abuja and Ibadan, Nigeria: FGoN and IITA; 2024.
  ISBN 978-978-131-414-8.
  `<https://www.unicef.org/nigeria/reports/national-food-consumption-and-micronutrient-survey-2021>`_

.. [Nnabugwu-2025]
  Nnabugwu CD, et al. Workforce Nutrition and Large-Scale Food Fortification:
  A Synergistic Approach to Combating Malnutrition in Nigeria. GAIN Convening
  Paper #20. Global Alliance for Improved Nutrition (GAIN); 2025.
  `<https://www.gainhealth.org/sites/default/files/publications/documents/gain-convening-paper-20_workforce-nutrition-and-large-scale-food-fortification-nutrition-dialogue.pdf>`_

.. [Tarini-2025]
  Tarini A, et al. Advancing the use of evidence in bouillon fortification
  policy discussions: Burkina Faso, Nigeria, and Senegal. Annals of the New
  York Academy of Sciences. 2025.
  `<https://doi.org/10.1111/nyas.70006>`_
