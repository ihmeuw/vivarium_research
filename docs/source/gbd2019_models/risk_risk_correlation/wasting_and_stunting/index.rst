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

Vivarium Modeling Strategy
----------------------------

Correlation
+++++++++++++

Causation
++++++++++++

Assumptions and Limitations
+++++++++++++++++++++++++++++

Validation Criteria
+++++++++++++++++++++

References
-----------

.. [Myatt-et-al-2018]
  Myatt M, Khara T, Schoenbuchner S, Pietzsch S, Dolan C, Lelijveld N, Briend A. Children who are both wasted and stunted are also underweight and have a high risk of death: a descriptive epidemiology of multiple anthropometric deficits using data from 51 countries. Arch Public Health. 2018 Jul 16;76:28. doi: 10.1186/s13690-018-0277-1. PMID: 30026945; PMCID: PMC6047117.

.. [Richard-et-al-2012]
  Richard SA, Black RE, Gilman RH, Guerrant RL, Kang G, Lanata CF, Mølbak K, Rasmussen ZA, Sack RB, Valentiner-Branth P, Checkley W; Childhood Infection and Malnutrition Network. Wasting is associated with stunting in early childhood. J Nutr. 2012 Jul;142(7):1291-6. doi: 10.3945/jn.111.154922. Epub 2012 May 23. PMID: 22623393; PMCID: PMC3374667.

.. [Thurstans-et-al-2021]
  Thurstans S, Sessions N, Dolan C, Sadler K, Cichon B, Isanaka S, Roberfroid D, Stobaugh H, Webb P, Khara T. The relationship between wasting and stunting in young children: A systematic review. Matern Child Nutr. 2021 Sep 5:e13246. doi: 10.1111/mcn.13246. Epub ahead of print. PMID: 34486229.
