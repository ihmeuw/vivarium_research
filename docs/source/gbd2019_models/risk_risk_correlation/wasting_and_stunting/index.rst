.. _2019_risk_correlation_wasting_stunting:

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

=================================================
Child Wasting and Stunting
=================================================

Risk Exposures Overview
------------------------

.. note::

  Links to documentation for relevant risk exposure pages include:

  - :ref:`GBD 2020 Wasting risk exposure <2020_risk_exposure_wasting_state_exposure>`

  - :ref:`GBD 2020 Child stunting risk exposure <2020_risk_exposure_child_stunting>`

Child wasting and stunting are two measures related to childhood malnutrition. Child wasting is often defined as a weight-for-length/weight-for height z-score (WLZ/WHZ) less than -2. Child stunting is often defined as a length-for-age/height-for-age z-score (LAZ/HAZ) below -2. The two measures are related, but distinct, and the relationship was summarized in a recent systematic review performed by [Thurstans-et-al-2021]_ as an update to a systematic review on the same topic performed in 2014 and reported :download:`technical briefing paper by the Emergency Nutrition Network <ENN_2014.pdf>`. The [Thurstans-et-al-2021]_ systematic review included studies that examined both wasting and stunting exposures among children aged 0-59 months in low and middle income countries.

As discussed by [Thurstans-et-al-2021]_, wasting is generally considered an acute condition, with cross-sectional prevalence substantially lower than measures of cumulative incidence, making it difficult to measure the true burden of wasting in traditional cross-sectional analyses. This difficultly is exacerbated due to seasonal variations in wasting prevalence. Stunting, however, is less subject to this challenge.

In general, it is understood that wasting is driven primarily by depleted fat stores. However, adequate fat stores along are not sufficient for driving linear growth and micronutrient deficiencies in the presence of adequate fat stores can drive child stunting. Therefore, the association between wasting and stunting varies by location and context, with some areas experiencing by high concurrent wasting and stunting burdens while others may experience low wasting burden while maintaining a high stunting burden. [Thurstans-et-al-2021]_

As reported by [Thurstans-et-al-2021]_, wasting and stunting were historically considered unrelated conditions as population-level analyses in the past had failed to demonstrate consistent associations between the measures, partially due to the challenges of studying wasting in cross-sectional settings. More recent analyses have demonstrated a evidence to support an association between childhood wasting and stunting, however, it is understood that further research in this area is still warranted.

Correlation
++++++++++++

An analysis by [Myatt-et-al-2018]_ found a significant and positive association between wasting and stunting in 37 of 51 countries analyzed. [Myatt-et-al-2018]_ reports the cross-sectional association between wasting and stunting as odds ratios for being stunted given wastedness (which is equivalent to the odds ratio for being wasted given stuntedness). As the relationship between wasting and stunting will vary by context-specific burdens of micro- and macro-nutritional deficiencies, the association between these two factors varied by location.

Additionally, [Richard-et-al-2012]_ reports the cross-sectional correlation coefficient between LAZ and WLZ among a pooled analysis of eight cohort studies, and found that the magnitude of this association was modified by age. There was no positive correlation before six months of age, but wasting and stunting were positively correlated among children between 6 and 23 months of age with the magnitude of association increasing with age (see the figure below).

.. image:: wasting_stunting_correlation_by_age_figure.PNG

Causation
+++++++++++

[Thurstans-et-al-2021]_ reviewed the evidence that wasting can lead to stunting as well as evidence that stunting can lead to wasting. The causal relationship of wasting on stunting is supported by evidence of the mechanism that adequate weight is necessary for linear growth to occur [Thurstans-et-al-2021]_. This relationship is supported by evidence that linear groth occurs only after recovery from severe wasting episodes [Isanaka-et-al-2019-wasting-stunting]_, [Ngari-et-al-2019]_, . However, evidence measuring the exact causal impact of wasting episodes on stunting exposure remains limited. Additionally, while the evidence suggests that repeated and/or severe episodes of wasting can contribute to stunting, there are many risk factors for stunting and it cannot be entirely explained by previous wasting episodes.

[Saaka-and-Galaa-2016]_ performed an analysis of cross-sectional 2014 Ghana Demongraphic and Health Survey data to investigate the association between wasting and stunting after adjustment for maternal factors including weight and height, parity, education, place of delivery, and prenatal care utilization as well as child factors including sex, birth weight, malaria infection, dietary intake, and household wealth index. This study found that a unit increase in WHZ was associated with a 0.07 (95% CI: 0.03, 0.15) unit increase in HAZ and that the effect was modified by age (interaction term: 0.12; 95% CI: 0.10, 0.21; age group exposure definitions in months: 0-5, 6-11, 12-23, 24-35, 36-47, 48-59). Although this study adjusts for potential confounding factors, it is limited in its cross-sectional nature, which limits conclusions about causality between wasting and stunting.

[Schoenbuchner-et-al-2019]_ performed a retrospective cohort analysis of longitudinal data and investigated the association between wasting on stunting status on future wasting and stunting status. [Schoenbuchner-et-al-2019]_ reported an odds ratio of wasting on stunting three months later adjusted for sex, age, and current stunting status of 3.2 (95% CI: 2.7, 3.9). Further, the odds ratio of stunting on wasting three months later adjusted for sex, age, and current wasting status was 1.5 (95% CI: 1.3, 1.7). While this analysis benefits from its longitudinal design and incorporation of time-lagged effects, it does not adjust for confounding factors that may be present and therefore conclusions about causality between wasting and stunting exposures are limited.

Vivarium Modeling Strategy
----------------------------

Correlation
+++++++++++++

We currently do not plan to directly model an association between wasting and stunting in our simulation. However, the age-specific correlation between wasting and stunting (as induced through the risk-risk correlation between :ref:`birthweight and wasting <2019_risk_correlation_birthweight_wasting>` as well as :ref:`birthweight and stunting <2019_risk_correlation_birthweight_stunting>`) should be evaluated in the simulation output, using the values reported by [Myatt-et-al-2018]_ and [Richard-et-al-2012]_ as external validation data sources. 

Causation
++++++++++++

Given the limitations of the available data that measures the causal impact of wasting on stunting, we do not currently model this relationship.

.. note::  

  A model of height and weight trajectories rather than wasting and stunting trajectories may allow for modeling a pause in linear growth associated with a weight below a given threshold that is in line with the suggested causal link between wasting and stunting in the absence of robust data that quantifies the specific magnitude of the impact.

Likewise, we do not explicitly model a direct causal impact of stunting on wasting in our simulation. However, improvements in stunting exposure will result in slight improvements in wasting exposure in the :ref:`acute malnutrition treatment and prevention simulation <2019_concept_model_vivarium_ciff_sam>` through the positive feedback look between wasting and diarrheal diseases, given that stunting affects diarrheal diseases in GBD.

Assumptions and Limitations
+++++++++++++++++++++++++++++

Validation Criteria
+++++++++++++++++++++

References
-----------

.. [Isanaka-et-al-2019-wasting-stunting]
  Isanaka S, Hitchings MDT, Berthé F, Briend A, Grais RF. Linear growth faltering and the role of weight attainment: Prospective analysis of young children recovering from severe wasting in Niger. Matern Child Nutr. 2019 Oct;15(4):e12817. doi: 10.1111/mcn.12817. Epub 2019 Apr 29. PMID: 30903806; PMCID: PMC6849732.

.. [Myatt-et-al-2018]
  Myatt M, Khara T, Schoenbuchner S, Pietzsch S, Dolan C, Lelijveld N, Briend A. Children who are both wasted and stunted are also underweight and have a high risk of death: a descriptive epidemiology of multiple anthropometric deficits using data from 51 countries. Arch Public Health. 2018 Jul 16;76:28. doi: 10.1186/s13690-018-0277-1. PMID: 30026945; PMCID: PMC6047117.

.. [Ngari-et-al-2019]
  Ngari MM, Iversen PO, Thitiri J, Mwalekwa L, Timbwa M, Fegan GW, Berkley JA. Linear growth following complicated severe malnutrition: 1-year follow-up cohort of Kenyan children. Arch Dis Child. 2019 Mar;104(3):229-235. doi: 10.1136/archdischild-2018-315641. Epub 2018 Sep 28. PMID: 30266874; PMCID: PMC6556974.

.. [Richard-et-al-2012]
  Richard SA, Black RE, Gilman RH, Guerrant RL, Kang G, Lanata CF, Mølbak K, Rasmussen ZA, Sack RB, Valentiner-Branth P, Checkley W; Childhood Infection and Malnutrition Network. Wasting is associated with stunting in early childhood. J Nutr. 2012 Jul;142(7):1291-6. doi: 10.3945/jn.111.154922. Epub 2012 May 23. PMID: 22623393; PMCID: PMC3374667.

.. [Saaka-and-Galaa-2016]
  Saaka M, Galaa SZ. Relationships between Wasting and Stunting and Their Concurrent Occurrence in Ghanaian Preschool Children. J Nutr Metab. 2016;2016:4654920. doi: 10.1155/2016/4654920. Epub 2016 Jun 9. PMID: 27379184; PMCID: PMC4917721.

.. [Schoenbuchner-et-al-2019]
  Schoenbuchner SM, Dolan C, Mwangome M, Hall A, Richard SA, Wells JC, Khara T, Sonko B, Prentice AM, Moore SE. The relationship between wasting and stunting: a retrospective cohort analysis of longitudinal data in Gambian children from 1976 to 2016. Am J Clin Nutr. 2019 Aug 1;110(2):498-507. doi: 10.1093/ajcn/nqy326. PMID: 30753251; PMCID: PMC6669055.

.. [Thurstans-et-al-2021]
  Thurstans S, Sessions N, Dolan C, Sadler K, Cichon B, Isanaka S, Roberfroid D, Stobaugh H, Webb P, Khara T. The relationship between wasting and stunting in young children: A systematic review. Matern Child Nutr. 2021 Sep 5:e13246. doi: 10.1111/mcn.13246. Epub ahead of print. PMID: 34486229.
