.. role:: underline
    :class: underline


..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  +++++++++++++++++++++
  
  Section Level 2 (#.#)
  ---------------------

  Section Level 3 (#.#.#)
  ~~~~~~~~~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.


.. _2017_concept_model_vivarium_gates_bep:

======================================
Vivarium Gates Balanced Energy Protein 
======================================

.. contents::
  :local:

+------------------------------------+
| List of abbreviations              |
+=======+============================+
| LAZ   | Length-for-age Z-score     |
+-------+----------------------------+
| WLZ   | Weight-for-length Z-score  |
+-------+----------------------------+
| BEP   | Balanced energy protein    |
+-------+----------------------------+
| IFA   | iron and folic acid        |
+-------+----------------------------+
| MMN   | multi-nutrient             |
+-------+----------------------------+


.. _1.0:

1.0 Background
++++++++++++++

Pregnancy is a period of increased energy demands from the women’s changing physiology and fetus’ growing requirements. Inadequate maternal nutrition or energy are common among women residing in low- and middle-income countries. Nutritional deficiencies can result in poor maternal and infant outcomes. 

Iron and folic acid (IFA): Worldwide prevalence of iron deficiency anaemia in pregnancy is about 20%. Maternal anemia due to iron deficiency is associated with increased risk of maternal mortality, perinatal mortality and infants with low birth weight (LBW). Folic acid deficiency can lead to haematological consequences and congenital malformations; however, association with other birth outcomes is equivocal. WHO recommends iron and folic acid (IFA) supplementation for women during the antenatal period as part of routine antenatal care (ANC). The recommended dose of iron ranges from 30 mg to 60 mg. Despite its provision as part of national antenatal care programs for the last few decades in most low- and middle-income countries, coverage with the supplement is low. 

Multi-micronutrients (MMN): Vitamin A deficiency is measured in night blindness and serum retinol levels. Globally, around 15% of pregnant women are deficient in vitamin A. Supplementation during pregnancy has been shown to reduce risk of maternal anaemia, infection and night blindness, but not on birth outcomes. Zinc deficiency has been associated with complications of pregnancy and delivery such as pre-eclampsia, premature rupture of membranes and congenital abnormalities. However, a review of trials of zinc supplementation showed a reduction in pre-term births only. (other micro-nutrients not reviewed here as they are not GBD risk factors). There is some evidence of additional benefit of MMN supplements containing 13–15 different micronutrients (including iron and folic acid) over iron and folic acid supplements alone, but there is also some evidence of risk, and some important gaps in the evidence. As such, WHO does not currently recommend a multi-nutrient supplement for pregnant women to improve maternal and perinatal outcomes. 

Balanced energy protein (BEP): Under-nourished women are negatively associated with fetal growth and have increased risk of preterm birth. Balanced protein (where protein content provides less than 25% of total energy content) supplementation during pregnancy may help with gestational weight gain and subsequently avert adverse pregnancy outcomes, but the benefits are unclear. WHO recommends BEP for populations or settings with a high prevalence of undernourished pregnant women (not for individual pregnant women identified as being undernourished) to reduce the risk of stillbirths and small for-gestational-age neonates. Undernourishment is usually defined by a low BMI (i.e. being underweight BMI<18.5). For adults, a 20–39% prevalence of underweight women is considered a high prevalence of underweight and 40% or higher is considered a very high prevalence. MUAC may also be useful to identify protein–energy malnutrition in individual pregnant women and to determine its prevalence in this population. However, the optimal cut-off points may need to be determined for individual countries based on context-specific cost–benefit analyses. 


.. _1.1:

1.1 Project overview
--------------------

There is belief that benefits of BEP supplementation are currently underestimated and that targeting individual pregnant women with low BMI may be more cost beneficial. There are currently on-going Gates funded clinical trials evaluating the impact of BEP in India, Pakistan, Mali and Tanzania. This simulation project aims to estimate the cost benefits of universal or targeted offer of BEP if the anticipated improvement in infant outcomes are achieved. 


.. _1.2:

1.2 Literature review
---------------------


.. _2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++

To understand the cost-effectiveness of BEP and MMN supplementation for pregnant and lactating women (PLW) on child health outcomes. We will consider the costs and DALYs of baseline, and all scenarios

Objective 1: Comparing the cost-effectiveness of BEP, MMN, and IFA
This objective will compare MMN scenario vs baseline, and IFA vs MMN scenario

Objective 2:  Comparing the cost-effectiveness of universal vs. targeted BEP administration
This objective will compare scenario with targeted BEP vs scenario with universal BEP


.. _3.0:

3.0 Causal framework
++++++++++++++++++++

.. _3.1:

3.1 Causal diagram
------------------

  .. image:: causal_dag_bep_scenarios.svg

**Outcome (O)**:

  - (1) birthweight in grams
  - (2) LAZ score
  - (3) WLZ score


**Effect modifiers**:

  - The effect of BEP on birthweight is differential according to maternal BMI

:underline:`Current evidence scenarios`

• Under the current evidence scenarios, the intervention BEP affects only birthweight. It does so differentially by maternal BMI status (Ota 2015). BMI is an effect modifier on the relationship between BEP and birthweight. 

• BMI should have an effect on LAZ and WLZ scores suggested by the literature (and Gates) but we are not intervening on BMI, and so simply correlatng birthweight and LAZ / WLZ will capture the relationship between BMI and LAZ/WLZ.
• note x represents a crude effect size because we are not intervening on BMI and we only use this effect in baseline. (ideally crude mean shift birthweight by maternal BMI)  
• Originally Gates wanted us to model an effect size of RR=2 for BMI on LAZ and WLZ scores, which we did in our februrary model. However, since we are not intervening on BMI, we do not need to model this causal effect. We only want the baseline LAZ and WLZ scores by BMI status and this relationship should be captured by the correlation co-efficient between birthweight and LAZ and WLZ score.
• BEP only affects pregnancy weight-gain (given during pregnancy at ANC) and not pre-pregnancy BMI, hence no causal arrow from BEP to BMI (pre-pregnancy).

:underline:`Hopes and dreams scenarios`

• Current evidence does not show an effect between BEP and LAZ or WLZ scores (Ota 2015). But there is reason to believe it should affect child growth and hence we are modelling this effect in the hopes and dreams scenario. This is the effect that gates is trying to find in their current trials.
• Potential reasons why current literature may not capture the effect of BEP on WLZ/LAZ
  o While the literature has strong evidence there is some causal effect size between birthweight LAZ n WLZ (Harding 2017), the effect from BEP through birthweight might not be big enough to show an effect in LAZ or WLZ through birthweight or the studies might not be powerful enough to detect a difference. 
  o Following up to child-growth failure outcomes require a long follow-up period, hence this outcome might not be measured accurately in current studies.


:download:`causal_dag_memo.docx`

.. _3.2:

3.2 Effect sizes
----------------

.. list-table::
   :widths: 5 20 20 20 10 20
   :header-rows: 1

   * - Effect
     - Description
     - Current evidence
     - Source
     - Hopes and dreams
     - Source 
   * - a
     - IFA vs no IFA or placebo on birthweight in g
     - +57.73 g (7.66 to 107.79)
     - Pena 2015 Cochrane review
     - same
     - same 
   * - b
     - MMN vs IFA on birthweight in g
     - +51.24 (43.71 to 58.76)
     - fixed effects meta analysis of 13 trials from Keats 2019 :download:`memo <meta-analysis_MMN_vs_IFA_memo.docx>`
     - same
     - same 
   * - d1
     - BEP vs IFA on birthweight in g among low BMI women
     - +66.96g (13.13 to 120.78)
     - Ota 2015 Cochrane review
     - +100g (±10)  
     - TPP target
   * - d0
     - BEP vs IFA on birthweight in g among normal BMI women
     - +40.96g (4.66,77.26)
     - Ota 2015 Cochrane review
     - +75g (±10)   
     - TPP target
   * - x
     - crude birthweight in g shift between low and normal BMI women
     - -160.44g (-196.65 to -124.23) fixed effect *or* -142.93g (-232.68 to -53.18) random effects
     - meta analysis of 3 studies :download:`memo <meta-analysis_BMI_vs_birthweight_memo.docx>`
     - same
     - same
   * - E_laz
     - BEP vs. nothing on LAZ score at 6 months
     - none
     - none
     - +0.3 (±0.1)
     - TPP target
   * - E_wlz
     - BEP vs. nothing on WLZ score at 6 months
     - none
     - none
     - +0.3 (±0.1)
     - TPP target
   * - *c_laz*
     - Spearman correlation co-efficient for birthweight and LAZ
     - :download:`spreadsheet <child_growth_birthweight_correlations.xlsx>`
     - MAL-ED study
     - same
     - same  
   * - *c_wlz*
     - Spearman correlation co-efficient for birthweight and LAZ
     - :download:`spreadsheet <child_growth_birthweight_correlations.xlsx>`
     - MAL-ED study
     - same
     - same  



.. _4.0:

4.0 Intervention
++++++++++++++++

• IFA: Iron and folic acid supplementation 
- Dosage: Combined pill or separate pill (30-60 mg iron, 400 μg folic acid)
- Duration: as soon as possible during pregnancy 
- Infant outcomes affected: increases birthweight(g)

• MMN: multi-micro nutrient supplementation
- Multiple micronutrients defined as supplementation with at least 5 micronutrients including the UNIMMAP formulation: 2 mg copper, 65 μg selenium, 800 μg RE vitamin A, 1.4 mg vitamin B1, 1.4 mg vitamin B2, 18 mg niacin, 1.9 mg vitamin B6, 2.6 μg vitamin B12, 70 mg vitamin C, 5 μg vitamin D, 10 mg vitamin E and 150 μg iodine, 30 mg iron, 400 μg folic acid, 15 mg zinc
- Infant outcomes affected (MMN): reduces preterm births (<37 weeks)-CIs slightly spans 1, reduces low birth weight, increases birthweight(g), reduces small-for gestational age 

• BEP:  balanced energy protein supplementation
- Dosage: supplements in which protein provides less than 25% of the total energy content
- Duration: administered 6 months during pregnancy and 6 months during lactation
- Infant outcomes affected:  increases birthweight(g), reduces small for gestational age

*The intervention ‘MMN’ refers to a single pill that includes iron and folic acid and intervention ‘BEP’ refers to a nutrient bar that includes micronutrients as well as iron and folic


.. _4.1:

4.1 Simulation scenarios
------------------------

• Baseline: Offering IFA to any women attending ANC (at empirical baseline coverage of IFA)
• Scenario 1: Offering MMN to any women attending ANC (intervention at target 90% coverage at ANC)
• Scenario 2: Offering BEP (current evidence effect size) to any women attending ANC (intervention at target 90% coverage at ANC)
• Scenario 3: Offering BEP (current evidence effect size) to targeted undernourished women, and MMN to any other women attending ANC (intervention at target 90% coverage at ANC)
• Scenario 4: Offering BEP (hope and dreams effect size) to any women attending ANC (intervention at target 90% coverage at ANC)
• Scenario 5: Offering BEP (hope and dreams effect size) to targeted undernourished women, and MMN to any other women attending ANC (intervention at target 90% coverage at ANC)

.. _5.0:

5.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _5.1:

5.1 Vivarium concept model 
--------------------------

  .. image:: vivarium_conceptdiagram_bep.svg

Green arrow indicates target effect sizes given by Gates TPP targets; dotted arrows indicate a correlation 

.. _5.2:

5.2 Demographics
----------------

• Population: closed prospective cohort of infants born from birth to 2-years old
• Exclusion criteria: None  
• Start and end year: 2020-2022
• Simulation time step: 1 day 
• Location: India, Pakistan, Mali, Tanzania
• Size of largest starting population: Number of live births
• Youngest start-age and oldest end age: 0-2 years
• Fertility: none
• Other: % of women who are thin according to BMI at baseline
 


.. _5.3:

5.3 Models
----------

.. _5.3.1:

5.3.1 model 1
~~~~~~~~~~~~~




.. _5.3.2:

5.3.2 model 2
~~~~~~~~~~~~~



.. _5.3.3:

5.3.3 model 3
~~~~~~~~~~~~~



.. _5.3.4:

5.3.4 model 4
~~~~~~~~~~~~~


.. _5.3.5:

5.3.5 model 5
~~~~~~~~~~~~~





.. _5.4:

5.4 Desired outputs
-------------------


.. _5.5:

5.5 Output meta-table shell
---------------------------

:download:`output table shell<xxx.xlsx>`



.. _5.6:

5.6 Validation and verification
-------------------------------



.. _6.0:

6.0 Back-of-envelope calculations
+++++++++++++++++++++++++++++++++

.. _7.0:

7.0 Limitations
+++++++++++++++


