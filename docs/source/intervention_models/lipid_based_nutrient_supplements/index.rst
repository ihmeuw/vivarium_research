.. role:: underline
    :class: underline
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
  ~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

.. _lipid_based_nutrient_supplements:

========================================================
Small quantity lipid based nutrient supplements (SQ-LNS)
========================================================

Ideally, infants are breastfed for two years or longer, with complementary food introduced at six months of age. Diets of infants and young children aged six to 23 months need to include a variety of nutrient-dense foods, preferably from local sources, to ensure their nutrient needs are met. However, children's diets are likely to be deficient in macronutrients and micronutrients, specifically essential fatty acids, when nutrient-rich diets are not available to them in resource-poor settings. Various interventions are recommended, or have been used, to improve child malnutrition. This document focuses on small quantity lipid based nutrient supplements (SQ-LNS) as an intervention to improve malnutrition, particularly child wasting and stunting. Particularly, it draws on the 2019 Cochrane Review by Das et. al. [DAS_Cochrane_Review_2019]_

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - LNS
    - lipid-based nutrient supplements
    -
  * - SQ
    - small quantity
    -
  * - FBF
    - fortified blended foods
    -
  * - CSB ++
    - corn soy blend plus
    -
  * - MNP
    - Multiple micronutrient powders
    -

Intervention Overview
-----------------------

:underline:`Lipid-based nutrient supplements`

Supplementary feeding is a strategy that includes provision of extra food to children beyond the normal ration of their home diets
and is aimed at improving the nutritional status or preventing the nutritional deterioration of the target population. One of the nutritional
interventions advocated to address malnutrition among children is **lipid-based nutrient supplements (LNS)**. LNS are a family of
products designed to deliver nutrients to vulnerable people. They are considered 'lipid-based' because most of the energy provided
by these products is from lipids (fats). All LNS provide a range of vitamins and minerals, but unlike most other micronutrient supplements,
LNS also provide *energy, protein and essential fatty acids*. LNS recipes can include a variety of ingredients, but typically have included vegetable fat, peanut or groundnut paste, milk powder and sugar. Based on the energy content, LNS can be small quantity (SQ LNS) providing ˜ 110 to 120 kcal/day (20 g dose), medium quantity (MQ LNS) providing ˜ 250 to 500 kcal/day (45 g to 90 g dose) or large-quantity (LQ LNS) providing
more than 280 kcal/day (> 90 g dose). Notably, MQ-LNS and LQ-LNS can be used in :ref:`management of acute malnutrition interventions <intervention_wasting_treatment>`. Additionally, :ref:`antenatal supplementation with balanced energy protein (BEP) <maternal_supplementation_intervention>` utilitizes LNS products. LNS are nutrient dense, require no cooking before use, and can be stored for months even in warm conditions.
[DAS_Cochrane_Review_2019]_

:underline:`Alternative recipes and formulations, other than LNS`

Alternative recipes and formulations, other than LNS, are currently being explored using cereals mixed with other ingredients, including
whey, soy protein isolate, dried skimmed milk, and sesame, cashew and chickpea paste, among others. These are
fortified with vitamins and minerals and are commonly called **fortified blended foods (FBF)**. An example of a commonly used FBF
is **corn soy blend plus (CSB ++)**, which is a cooked blend of milled, heat-treated corn and soybeans that is fortified with a vitamin and
mineral premix. **Multiple micronutrient powders (MNP)** are also an alternative way of providing micronutrients. These are single-dose
packets of vitamins and minerals in powder form that can be sprinkled onto any ready to eat semi-solid food consumed at home,
school or any other point of use. [DAS_Cochrane_Review_2019]_

:underline:`Description of intervention`

The intervention is the supplementation of children from aged **6 months to 23 months** with **LNS + complementary feeding** (intervention) compared with no intervention (control). The setting of the intervention is the community.

:underline:`Summary of existing intervention literature`

There have been several recent meta-analyses on the effects of SQ-LNS, outlined below:

- A cochrane systematic review and meta-analysis [DAS_Cochrane_Review_2019]_. Please see this memo for a summary of the studies and the effect sizes :download:`SQ-LNS interventions memo<sqlns_memo_das2019.docx>`

- A meta-analysis of RCTs on all-cause mortality [Stewart-et-al-2020]_

  - All-cause mortality was significantly lower in the SQLNS arm than the non-SQLNS arm (RR: 0.73; 95% CI: 0.59, 0.89; 13 trials)

- A series of individual participant data meta-analyses (with analysis of effect modification), as summarized by [Dewey-et-al-2021a]_. These papers included eligible studies from the review published by [DAS_Cochrane_Review_2019]_ as well as additional data published following the publication of the cochrane review. Minimum supplementation duration for inclusion was three months between the ages of six and 24 months of age. Most studies began supplementation at six months of age with intended supplementation duration of 6-18 months. The series included individual analyses on the following outcomes:

  - Growth outcomes: [Dewey-et-al-2021b]_

    - Stunting prevalence ratio: 0.88 (95% CI: 0.85, 0.91)

    - Wasting prevalence ratio: 0.86 (95% CI: 0.80, 0.93) and acute malnutrition prevalence ratio: 0.86 (95% CI: 0.80, 0.93)

      - Effect modified by sex

  - Anemia and micronutrient status: [Wessells-et-al-2021]_

    - Significantly decreased anemia and vitamin A deficiency

    - No effect on plasma zinc or retinol

  - Developmental outcomes: [Prado-et-al-2021]_

    - Increased mean language, social-emotional, and motor scores.

    - Increased prevalence of walking without support at 12 months

.. _`sqlns-baseline-parameters`:

Baseline Coverage Data
++++++++++++++++++++++++

No baseline coverage of SQ-LNS (0%)

Vivarium Modeling Strategy
--------------------------

Coverage algorithms
+++++++++++++++++++

There are various SQ-LNS coverage algorithms that may be desired under differing scenarios. They include:

- **Universal coverage:** All covered simulants begin recive effects starting at six months of age.
- **Targeted to AM treatment:** Covered simulants who transition from MAM or SAM to mild wasting will receive intervention effects starting at that timestep.
- **Targeted to mild wasting:** Covered simulants who are initialized into or transition into the mild wasting state will receive intervention effects starting at that timestep.

All effects will persist until 24 months of age.

.. list-table:: Affected Outcome Restrictions
  :widths: 15 15 15
  :header-rows: 1

  * - Restriction
    - Value
    - Note
  * - Male only
    - No
    -
  * - Female only
    - No
    -
  * - Age group start
    - 389 (6-11mo)
    - intervention starts at 6 months
  * - Age group end (exclusive)
    - 34 (2-4yr)
    - children >24 months of age **not** eligible to begin coverage
  * - Other
    -
    -

Affected Outcomes
+++++++++++++++++

Wasting
~~~~~~~

**Research background**

For the outcome moderate wasting, [DAS_Cochrane_Review_2019]_ compared prevalence of **moderate wasting** at 18 or 24 months between intervention and control children. LNS plus complementary feeding reduced the prevalence of moderate wasting by 18% (RR 0.82, 95% CI 0.74 to 0.91; eight studies; 13,172 participants; moderate-quality evidence). There was *no impact* of LNS plus complementary feeding on **severe wasting** (RR 1.27, 95% CI 0.66 to 2.46; three studies, 2329 participants)

[Dewey-et-al-2021b]_ found a the prevalence ratio of wasting (not severity-specific) equal to  0.86 (95% CI: 0.80, 0.93). Given that the review by Dewey et al. contained more data than the review by Das et al., we will use the effect size from Dewey et al. for our purposes.

We will apply the relative risk ratio as a relative rate ratio on the incidence of MAM from MILD (i2) starting from the age-start of the intervention starts (6 months). This is because we assume that the intervention does not affect the duration of disease and hence:

| Prevalence_intervention
| = PR x (prevalence_baseline_6mo)
| = PR x (incidence_baseline_6mo) x Duration_baseline

.. important::

  Note that when we apply this incidence reduction to the incidence of MAM from Mild, we will inadvertently reduce SAM prevalence. This is because less people will be transitioning into SAM. Although the Das 2019 Cochrane Review says the intervention has no effect on SAM (in fact, it seems like it may increase SAM prevalence based on the mean prevalence RR!), we are assuming 'an absence of evidence is not evidence of absence' - quote Abie. Logically, it should reduce SAM prevalence. We should discuss this in our methods in the manuscript and see how much of SAM prevalence is decreased.

**Modeling details**

.. note::

  These values *did* change since the 2021 implementation

The intervention effect in the table below should be applied to the :code:`i2` transition rate in the :ref:`dynamic wasting transition model <2020_risk_exposure_wasting_state_exposure>` between mild and moderate wasting states. The intervention effect should apply immediately upon coverage of the intervention and should be applied *multiplicatively* to the affected measure.

.. todo::

  Decide if we should use sex-specific effects


.. list-table:: Wasting outcome effect sizes
  :header-rows: 1

  * - Outcome
    - Effect size measure
    - Effect size
    - Note
  * - i2 incidence rate from mild to moderate wasting
    - Relative risk
    - 0.86 (95% CI 0.80 to 0.93), lognormal distribution of uncertainty
    - Total population effect size from [Dewey-et-al-2021b]_
  * - i2 incidence rate from mild to moderate wasting
    - Relative risk
    - 0.91 (0.88, 0.95), lognormal distribution of uncertainty
    - Male-specific effect size from [Dewey-et-al-2021b]_
  * - i2 incidence rate from mild to moderate wasting
    - Relative risk
    - 0.84 (0.80, 0.88), lognormal distribution of uncertainty
    - Female-specific effect size from [Dewey-et-al-2021b]_

Stunting
~~~~~~~~~

**Research background**

In the [DAS_Cochrane_Review_2019]_ LNS plus complementary feeding reduced the prevalence of **moderate stunting** by 7% (risk ratio (RR) 0.93, 95% confidence interval (CI) 0.88 to 0.98; nine studies, 13,372 participants; moderate-quality evidence), **severe stunting** by 15% (RR 0.85, 95% CI 0.74 to 0.98; five studies, 6151 participants; moderate-quality evidence),

[Dewey-et-al-2021b]_ found a stunting prevalence ratio equal to 0.88 (95% CI: 0.85, 0.91).

Given that the result from [Dewey-et-al-2021b]_ is similar in magnitude to the severity-specific estimates from [DAS_Cochrane_Review_2019]_, we will use the severity-specific findings from [DAS_Cochrane_Review_2019]_ for use in our model.

**Modeling details**

.. note:: 

  These values have not changed since the 2021 implementation

We will apply the relative risk ratio on the propensity of :ref:`child stunting risk exposure <2020_risk_exposure_child_stunting>` starting from the age-start of the intervention starts. See below example for male, age 6mo-11mo, 2020 stunting prevalence.

.. image:: viviarium_strategy_stunting.svg

.. list-table:: Stunting outcome effect sizes
  :header-rows: 1

  * - Outcome
    - Effect size measure
    - Effect size
    - Note
  * - Moderate (cat2) stunting exposure
    - Prevalence ratio
    - 0.93 (95% CI: 0.88, 0.98), lognormal distribution of uncertainty
    - 
  * - Severe (cat1) stunting exposure
    - Prevalence ratio
    - 0.85 (95% CI: 0.74, 0.98), lognormal distribution of uncertainty
    - 

Mortality
~~~~~~~~~~

.. todo::
    
  Determine if necessary to include in model... we think no, but this should be discussed in limitations/assumptions of the simulation

Hemoglobin/Anemia
~~~~~~~~~~~~~~~~~~

Not currently modeled as part of the :ref:`wasting simulation <2020_concept_model_vivarium_ciff_sam>` given that only YLDs will be affected.

Vitamin A Deficiency
~~~~~~~~~~~~~~~~~~~~

Not currently modeled as part of the :ref:`wasting simulation <2020_concept_model_vivarium_ciff_sam>` as this is not a primary outcome of interest and any downstream effects on mortality will be included in the `Mortality`_ outcome above.

Cost Model
+++++++++++

Assumptions and Limitations
++++++++++++++++++++++++++++

Validation and Verification Criteria
+++++++++++++++++++++++++++++++++++++

- verification: coverage of SQ-LNS as a function of time and eligible populations in baseline and intervention scenario
- verification: prevalence of stunting in supplemented vs non-supplemented group
- verification: incidence of moderate wasting from mild in supplemented vs non-supplemented group
- validation: check that the prevalence of moderate wasting in supplemented vs non-supplemented group agrees with the prevalence RR that we applied to the incidence instead.
- validation: check to see how much of SAM prevalence decreases from reduction in MAM incidence from MILD.

.. csv-table:: SQ-LNS intervention output table shell for v & v (Ethiopia)
   :file: sqlns_vv_output_shell.csv
   :widths: 20, 20, 10, 10, 10, 20, 20, 10
   :header-rows: 1

References
-----------

.. [DAS_Cochrane_Review_2019]

  View `DAS Cochrane Review 2019`_

    Preventive lipid‐based nutrient supplements given with complementary foods to infants and young children 6 to 23 months of age for health, nutrition, and developmental outcomes

.. _`DAS Cochrane Review 2019`: https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD012611.pub3/full

.. [Dewey-et-al-2021a]

  View `Dewey et al 2021a <https://pubmed.ncbi.nlm.nih.gov/34590696/>`_

    Dewey KG, Stewart CP, Wessells KR, Prado EL, Arnold CD. Small-quantity lipid-based nutrient supplements for the prevention of child malnutrition and promotion of healthy development: overview of individual participant data meta-analysis and programmatic implications. Am J Clin Nutr. 2021 Nov 2;114(Suppl 1):3S-14S. doi: 10.1093/ajcn/nqab279. PMID: 34590696; PMCID: PMC8560310.

.. [Dewey-et-al-2021b]

  View `Dewey et al 2021b <https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8560308/pdf/nqab278.pdf>`_

    Dewey KG, Wessells KR, Arnold CD, Prado EL, Abbeddou S,
    Adu-Afarwuah S, Ali H, Arnold BF, Ashorn P, Ashorn U, et al.
    Characteristics that modify the effect of small-quantity lipid-based
    nutrient supplementation on child growth: an individual participant
    data meta-analysis of randomized controlled trials. Am J Clin Nutr
    2021;114(Suppl 11):15S–42S.

.. [Prado-et-al-2021]

  View `Prado et al. 2021 <https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8560311/pdf/nqab277.pdf>`_

    Prado EL, Arnold CD, Wessells KR, Stewart CP, Abbeddou S, Adu-
    Afarwuah S, Arnold BF, Ashorn U, Ashorn P, Becquey E, et al. Smallquantity
    lipid-based nutrient supplements for children age 6–24 months:
    a systematic review and individual participant data meta-analysis of
    effects on developmental outcomes and effect modifiers. Am J Clin
    Nutr2021;114(Suppl 11):43S–67S.

.. [Stewart-et-al-2020]

  View `Stewart et al 2021 <https://watermark.silverchair.com/nqz262.pdf?token=AQECAHi208BE49Ooan9kkhW_Ercy7Dm3ZL_9Cf3qfKAc485ysgAAAsEwggK9BgkqhkiG9w0BBwagggKuMIICqgIBADCCAqMGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMNfzzSOuNA_O5csENAgEQgIICdA1cPJoXkuhoGC0vdAEuSzMBvtykfenT7Y5u-ZIhoUdkM5b2LI8qwA6-hYJOp0nFwcTrxm6y4IQsCgV_jf2wU78QPZ_xUxcxbaWI6E8ZnZ2sQNiKcYKaQv3435Sa2P1mkCakCXbi7NcTaGai50ULqRoz4F1DN2sg3J8sWUTbvveMYV4y2mfPY3bju8lncm5wssAPrNhBMtjHqopg-6dTj7nQD4mylP8Zk_Vum0mslWjzGs-jwR58jSmZ0uyitMd8zHHY9GbZAjx7oGjZtZOWWzA_E3c_kmfqvbPtBLM3F0Cq3q_EoXEcdG4y-oTx_2uQ340xC77eOxVJNPMuugdZ7PhPJ3YlDmBWCK0pPsoqcdvQvxyI6_jHZrYinjHHbg3eqjz0YTJpNWhwm5slJZ5a41tNFLx8V6O3zytAaquen0PkCa7gsrsj0K5v7017xDWWXeSe91E7KUKtVDsnzBLhtzLFziDup_sp1wRa2MAQ_AYYPj_pjwfLc2ylmo2WVquVe71tipQOcJJvoiYKheF4AjLOYpnH8kUs-cCsAcDz9vaC9sM25v6Cyg8yHSsOYo6Aq39Tm9bgoeG7JmIU5f5kRs1MsfjtDsvQL0YR9pK2aO0Qz-L_qQOHaTexFFV5QdgxTVIAsUzIfNnOFfH_MTF0jbQYagVFwYprlFWZH4Me-5i1VEVUd7_ukic60AuaPH66AqQV_5saJGPja9vhxuieE-SEsie9KrOxdIuUfL_d5CWg5d7NYH5aZnUH1VmAcLM91LJ7fnbBFLiNVt01QUJYRjSMBDeUV4yCRc7JkRpakS82yglg7V53yWb5lgcPKRup5PjHmHs>`_

    Stewart CP,Wessells KR, Arnold CD, Huybregts L, Ashorn P, Becquey
    E, Humphrey JH, Dewey KG. Lipid-based nutrient supplements and
    all-cause mortality in children 6–24 months of age: a meta-analysis of
    randomized controlled trials. Am J Clin Nutr 2020;111:207–18.

.. [Wessells-et-al-2021]

  View `Wessels et al 2021 <https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8560313/pdf/nqab276.pdf>`_

    Wessells K, Arnold C, Stewart C, Prado E, Abbeddou S, Adu-
    Afarwuah S, Arnold BF, Ashorn P, Ashorn U, Becquey E, et al.
    Characteristics that modify the effect of small-quantity lipid-based
    nutrient supplementation on child anemia and micronutrient status:
    an individual participant data meta-analysis of randomized controlled
    trials. Am J Clin Nutr2021;114(Suppl 11):68S–94S.