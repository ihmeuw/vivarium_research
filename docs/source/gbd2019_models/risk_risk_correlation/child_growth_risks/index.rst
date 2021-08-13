.. _2019_risk_correlation_child_growth:

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
Child Growth Failure Risk Correlations
=================================================

Risk Exposures Overview
------------------------

Child anthropometry is measured through several different correlated metrics, generally related to length/height, weight, and age. Relevant metrics include:

.. list-table:: Child Anthropometry Metrics
   :header-rows: 1

   * - Metric
     - Typical threshold value
   * - Gestational age
     - Preterm birth: <37 weeks
   * - Birthweight
     - Low birthweight: <2500 grams
   * - Length/height for age (LAZ/HAZ)
     - Stunted: 2+ standard deviations below mean
   * - Weight for length/height (WLZ/WHZ)
     - Wasted: 2+ standard deviations below mean
   * - Weight for age (WAZ)
     - Underweight: 2+ standard deviations below mean

Notably, these metrics tend to be highly correlated, with the magnitude of correlation varying with age. The metrics are related both through common causes as well as through suspected direct causal influences in some cases. The below diagram represents a causal framework for child growth metrics at birth as they relate to child growth metrics throughout the pre- and post-natal periods, as presented by [Na-et-al-2020]_.

.. image:: dag_framework.png

Notably, it is critical to distinguish between the correlation between these metrics attributable to shared common causes between them from correlation between these metrics attributable to direct causal relationships. However, the influence of confounding factors in the estimation of the causal relationship between these factors must be carefully considered due to the high correlation between them and the observational nature of child antropometry studies. Additionally, child age should be considered as an important effect modifier in the associations between each of these metrics, as discussed by [Alderman-and-Headey-2018]_.

Correlation
++++++++++++

Spearman correlation coefficients between birthweight and LAZ, WAZ, and WLZ among the first two years of age were estimated from the MAL-ED study [MAL-ED-investigators-2014]_, available in :download:`this spreadsheet <child_growth_birthweight_correlations.xlsx>` and presented in the figures below.

.. image:: bw_laz_correlation_plot.png

.. image:: bw_waz_correlation_plot.png

.. image:: bw_wlz_correlation_plot.png

.. note::

   These correlation coefficients were estimated by Chris for previous work on the :ref:`risk correlation proposal <2017_risk_models>` for the :ref:`Balanced Energy Protein simulation <2017_concept_model_vivarium_gates_bep>`.

.. todo::

  Confirm if the following hypotheses are true:

   The figures are shown for birthweight rather than small for gestational age. Additionally, the figures above for LAZ and WAZ are based on chronological age since birth without consideration for gestational age at birth. Since birthweight and gestational age are highly correlated and the above figures do not consider this, the high correlations seen between birthweight and LAZ and WAZ in the first few months of life in the above figures may be partially attributable to preterm birth, with the signficance of this influence waning over time.

   The correlation between birthweight and WHZ increases in magnitude over time, which may be a result of the burden of wasting typically reaching a peak at around 12 months of age [Alderman-and-Headey-2018]_ as well as the autocorrelation between previous episodes of wasting and future episodes of wasting among individual children.

Causation
+++++++++++

Birthweight and Wasting
^^^^^^^^^^^^^^^^^^^^^^^^

On 8/12/2021, we performed a literature search on PubMed using the search terms ("birthweight" and "wasting"), which yielded :download:`380 results <bw wasting correlation lit search.xlsx>`. After screening the paper titles and abstracts and reviewing relevant studies, the most relevant source or the causal association between birthweight and child wasting is an analysis of twin pairs using DHS data performed by [McGovern-et-al-2019]_. 

[McGovern-et-al-2019]_ reports that **the marginal effect of a 200g increase in birthweight (at 2500g) is associated with a 1.1-2.3 percentage point decrease in the probability of wasting.** [McGovern-et-al-2019]_ was selected as a desireable data source as it is an analysis of twins and sibling pairs, a study design that is particularly advantageous for the control for confounding due to familial influence, and also provides continous estimates of the association between birthweight and wasting status. While this analysis was not confounded by gestational age due to the study design of evaluating twins, effect modification by gestational age was not considered. Additionally, the effect of birthweight on wasting was measured among a population of children five years of age and younger, although [McGovern-et-al-2019]_ reports that the association was strongest among younger children. Due to the heterogenety of effects by age as well as the mortality selection bias, the effect of birthweight on wasting obtained from [McGovern-et-al-2019]_ may be an underestimate, particularly as it applies to the youngest age groups. Further, [McGovern-et-al-2019]_ modeled a quadratic term for birthweight and reported the marginal effect at 2500g.

There are several additional studies that report the association bewteen low birthweight and wasting status with attempted control for confounding factors such as maternal characteristics, socioeconomic status, etc. Examples of such analyses include a study by [Christian-et-al-2013]_ that found low birthweight to be associated with 2.3-3.5 the odds of childhood wasting.

Wasting and Stunting
^^^^^^^^^^^^^^^^^^^^^^

.. todo::

   Detail information reported by [Schoenbucher-et-al-2019]_ when necessary

Risk Exposures in GBD
-----------------------

Birthweight and Wasting
++++++++++++++++++++++++

Correlation
^^^^^^^^^^^^

Causation
^^^^^^^^^^^

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Validation Criteria
^^^^^^^^^^^^^^^^^^^^^

References
-----------

.. [Alderman-and-Headey-2018]
  Alderman H, Headey D. The timing of growth faltering has important implications for observational analyses of the underlying determinants of nutrition outcomes. PLoS One. 2018 Apr 25;13(4):e0195904. doi: 10.1371/journal.pone.0195904. PMID: 29694431; PMCID: PMC5919068. `https://pubmed.ncbi.nlm.nih.gov/29694431 <https://pubmed.ncbi.nlm.nih.gov/29694431/>`_.

.. [Christian-et-al-2013]
   Christian P, Lee SE, Donahue Angel M, Adair LS, Arifeen SE, Ashorn P, Barros FC, Fall CH, Fawzi WW, Hao W, Hu G, Humphrey JH, Huybregts L, Joglekar CV, Kariuki SK, Kolsteren P, Krishnaveni GV, Liu E, Martorell R, Osrin D, Persson LA, Ramakrishnan U, Richter L, Roberfroid D, Sania A, Ter Kuile FO, Tielsch J, Victora CG, Yajnik CS, Yan H, Zeng L, Black RE. Risk of childhood undernutrition related to small-for-gestational age and preterm birth in low- and middle-income countries. Int J Epidemiol. 2013 Oct;42(5):1340-55. doi: 10.1093/ije/dyt109. Epub 2013 Aug 6. PMID: 23920141; PMCID: PMC3816349. `https://pubmed.ncbi.nlm.nih.gov/23920141/ <https://pubmed.ncbi.nlm.nih.gov/23920141/>`_

.. [MAL-ED-investigators-2014]
  The MAL-ED Network Investigators, The MAL-ED Study: A Multinational and Multidisciplinary Approach to Understand the Relationship Between Enteric Pathogens, Malnutrition, Gut Physiology, Physical Growth, Cognitive Development, and Immune Responses in Infants and Children Up to 2 Years of Age in Resource-Poor Environments, Clinical Infectious Diseases, Volume 59, Issue suppl_4, November 2014, Pages S193–S206, `https://doi.org/10.1093/cid/ciu653 <https://doi.org/10.1093/cid/ciu653/>`_

.. [McGovern-et-al-2019]
  McGovern, M. E. (2019). How much does birth weight matter for child health in developing countries? Estimates from siblings and twins. Health economics, 28(1), 3-22. `https://pubmed.ncbi.nlm.nih.gov/30239053 <https://pubmed.ncbi.nlm.nih.gov/30239053/>`_.

.. [Na-et-al-2020]
  Na M, Shamim AA, Mehra S, Labrique A, Ali H, Wu LS, Shaikh S, Klemm R, Christian P, West KP. Maternal nutritional status mediates the linkage between household food insecurity and mid-infancy size in rural Bangladesh. Br J Nutr. 2020 Jun 28;123(12):1415-1425. doi: 10.1017/S0007114520000707. Epub 2020 Feb 27. PMID: 32102702. `https://pubmed.ncbi.nlm.nih.gov/32102702 <https://pubmed.ncbi.nlm.nih.gov/32102702/>`_.

.. [Schoenbucher-et-al-2019]
  Simon M Schoenbuchner, Carmel Dolan, Martha Mwangome, Andrew Hall, Stephanie A Richard, Jonathan C Wells, Tanya Khara, Bakary Sonko, Andrew M Prentice, Sophie E Moore, The relationship between wasting and stunting: a retrospective cohort analysis of longitudinal data in Gambian children from 1976 to 2016, The American Journal of Clinical Nutrition, Volume 110, Issue 2, August 2019, Pages 498–507. `https://doi.org/10.1093/ajcn/nqy326 <https://doi.org/10.1093/ajcn/nqy326>`_.
