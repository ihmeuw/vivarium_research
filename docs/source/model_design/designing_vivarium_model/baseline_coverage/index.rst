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

.. _vivarium_best_practices_baseline_coverage_calibration:

====================================================
Accounting for Baseline Coverage of the Intervention
====================================================

.. contents::
   :local:
   :depth: 1

The interventions we model modify particular outcomes of interest. These outcomes of interest are usually GBD 'risk-factors'. From GBD, we can obtain an overall population estimates for these outcomes of interest. Sometimes the interventions we model are completely novel to the population OR the intervention already exist to some degree in the population and we are interested in the scaling-up the intervention to a higher coverage rate OR the intervention affects subgroups different (effect modification). In the latter two cases, we need to stratify the outcome distribution by these subgroup such that:  

  * The population-weighted average of the exposure distributions matches the overall population estimate from GBD (at least approximately), and

  * The differential exposure between the subpopulations matches the corresponding **crude** effect size for our intervention.

Situation with baseline coverage

 The overall population estimate of our outcome of interest (GBD risk-factor) include those who have baseline coverage. Let's say we want to scale-up a nutritional intervention given to mothers known to causally improve babies' birthweights (outcome). From GBD, we obtain an population-wide distribution of birthweights. A proportion of the population would already by consuming this nutritional intervention and therefore should have higher birthweight babies than those who did not recieve this intervention. We can obtain this baseline coverage rate from the literature. 

 When we scale-up this nutritional intervention, a proportion of people not covered at baseline would now be covered and would receive the benefit. Therefore, in order to properly measure the effects of our interventions, we must first stratify our population into those who are already covered vs. not covered by the intervention of interest. We then need to calculate the relevant exposure distribution in each coverage stratum to get a complete picture of the baseline population. For example, we will need to know the birthweight distribution among those who were covered as well as the birthweight distribution of not covered.

  For example, the relative ratios of the outcome between the covered and uncovered groups in our model should match the crude relative ratios riof the outcome between these two groups found in the literature, OR the crude risk difference between the covered and uncovered groups should match the mean difference between these groups found in the literature.

.. note:: 

  When we stratify the population in this way, we are assuming that the proportion of our outcome attributable to the absence of our intervention is the same in our model population as it is in our study population. (A necessary condition for this, and indeed for modeling the intervention at all, is that the effect sizes found in the literature are generalizable to the populations we are simulating.) For something like vitamin A deficiency, the outcome is pretty much all attributable to vitamin A intake. For something like haemoglobin on the other hand, the outcome is not necessarily all attributable to iron intake (because of non-iron-responsive anemias) — in this case we will need to do some extra work (essentially, additional stratification) to estimate what effect iron fortification will have on haemoglobin levels. The above assumption is valid for situations in which there are not many factors that cause the outcome other than the exposure at hand. However, it should be more carefully evaluated when there are multiple factors that can cause the outcome (for example, many things can cause low birth weight).

.. todo::

  Intro (link to or copy from LSFF description)

.. todo::

  Situation with effect modification by intervention

.. todo::

  use BEP example

Dichotomous Outcome
-------------------

.. todo::

  This section (link to or copy from LSFF description)

Continuous Outcome 
------------------
.. todo::

  This section (take from LSFF? Note that LSFF method could be improved; sample from opposite ends of existing distribution rather than shift entire distribution up/down)

Additional sub-groups with differential risks in baseline scenario
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. todo::

  This section. (Ex: maternal BMI example from BEP)