.. _models_risk_factors:

=====================
Modeling Risk Factors
=====================

.. todo::

  Add description of what's in this document.

  Also see the following sections in :ref:`Modeling Causes <models_cause>`:

  * Learning objectives
  * Why do we want a document that describes each cause model?

  It looks like most of that content is generalizable to both risks and causes.
  Should we put similar sections in both documents, or pull them out into a more
  general document about designing Vivarium models?

  On the other hand, it looks like the following sections in :ref:`Modeling
  Causes <models_cause>` have details that are specific to causes, but should
  have analogues for risks in this document:

  * How is a cause model incorporated into a larger model?
  * What does a model document look like?

.. contents::
  :local:

Overview
--------

What is a risk factor?
++++++++++++++++++++++

.. todo::

  Update this section once this page has been filled in further.

.. todo::

  Separate this into "in the field of epi", "in GBD", and "in vivarium"

A risk factor is any attribute whose measure is causally related to the measure
of an outcome. Such attributes can range widely, and are categorized by GBD into
environmental/occupational, behavioral, and metabolic risks. For example:

  * Environmental/occupational

    * The level of particulate matter in the air of an individual's environment

    * An individual's access or lack thereof to clear water

  * Behavioral

    * An individual's alcohol intake

    * A low level of physical activity

    * A history or lack thereof of childhood abuse

  * Metabolic

    * The blood pressure of an individual

    * Having or not having a high BMI

For our purposes, the outcomes of these risks will generally be a differential
probability of some cause of health loss. However, the outcome of a risk could
also be the differential probability of another risk exposure.

  For example, we might say that an individual with the attribute "is a daily
  smoker" is :math:`x_1` times more likely to develop lung cancer than if that same
  individual had the attribute "has never smoked". We quantify this more
  rigorously in our explanation of relative risk (RR) and theoretical minimum risk
  level (TMREL).

  We might also say that an individual with the attribute "mother had a BMI of 17
  during pregnancy" is :math:`x_2` times more likely to end up with the attribute "low
  birth weight" than if that same child, all other factors held constant, had the
  attribute "mother had a healthy BMI during pregnancy". We will then say that the
  attribute "low birth weight" causes the child to have a higher probability of
  experiencing a bout of diarrheal disease. We then attribute health loss to this
  bout of diarrheal disease.

Risk factors are implemented in epidemiological models as a risk exposure
that is mapped to a risk effect. For example, a categorical exposure to "having
a high BMI" is mapped to a higher differential probability of experiencing
chronic kidney disease (CKD).

Within the context of our models, a risk factor will be an attribute of a
simulant averaged over a timestep. This is in contrast to GBD, wherein a risk
factor is an attribute of a population, potentially for a given sex-age-location,
averaged over one year.

Risk exposures and effects are discussed in more detail in the proceeding
sections. Here we will note that when defining the relationship between
a risk effect and a risk exposure, the subset of a simulant's history
of exposure that ought to be associated with a risk effect will depend on the
risk factor.

	For example, consider the risk-outcome pairs *unsafe water
	source* and *diarrheal diseases*, versus *smoking* and *diabetes*. We see that
	only a simulant's recent exposure to an unsafe water source will affect their
	probability of suffering from diarrheal diseases in the next week. However, the
	probability of becoming diabetic in the next year will be affected by a
	simulant's entire history of smoking.


What is a causal relationship?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Confounding
""""""""""""

Intermediates
"""""""""""""

Effect Modification
"""""""""""""""""""

Mediation
"""""""""

What is a risk exposure?
++++++++++++++++++++++++

What is a risk effect?
++++++++++++++++++++++

Definitions
-----------

Theoretical Minimum Risk Exposure Level/Distribution (TMREL/D)
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

The **theoretical minimum risk exposure level (TMREL)** is the level of risk
exposure that would minimize the risk of an adverse outcome for an individual.
For example, the TMREL for smoking would be "has never smoked." The
corresponding concept on the population level is the **theoretical minimum risk
exposure distribution (TMRED)**, which is the distribution of risk exposure that
would yield the lowest possible population risk. For smoking, the TMRED would be
the trivial probability distribution assigning everyone in the population to the
TMREL category "has never smoked." [WHO-Global-Health-Risks-Annex]_,
[GBD-2017-Risk-Appendix]_

Recall from the `causality section <What is a causal relationship?_>`_ that
counterfactual analysis is used to describe the causal relationship between a
risk factor and an outcome. **The TMRED is a particular choice of counterfactual
exposure distribution** used for the causal attribution of disease burden to a
given risk factor in a population (see `Population Attributable Fraction
(PAF)`_). Other choices of counterfactual include the *plausible* minimum risk,
*feasible* minimum risk, and *cost-effective* minimum risk, each of which can
obviously depend on specific attributes of the population under consideration.
On the other hand, Murray et al. state
[Comparative-quantification-health-risks]_:

  Biological principles as well as considerations of equity would necessitate
  that, **although the exposure distribution for theoretical minimum risk may
  depend on age and sex, it should in general be independent of geographical
  region or population.**

However, they go on to add:

  Exceptions to this are however unavoidable. An example would be the case of
  alcohol consumption, which in limited quantities and certain patterns, has
  beneficial effects on cardiovascular mortality, but is always harmful for
  other diseases such as cancers and accidents. In this case, the composition of
  the causes of death as well as drinking patterns in a region would determine
  the theoretical minimum distribution.

.. todo::

  Is there an updated/better example of TMRED depending on population, since the
  latest research says that that there is no safe amount of alcohol?

The smoking example `above <Theoretical Minimum Risk Exposure Level/Distribution
(TMREL/D)_>`_ illustrates two features of the TMREL that are typical of many
risk factors:

1. We imagine that everyone in the population has the same TMREL
2. The TMREL is *zero* or *no exposure*

However, neither of these conditions is necessary. In some cases, particularly
for continuous risk exposure variables, the TMREL may be a nonzero exposure
level. Moreover, there may be multiple TMRELs experienced by different members
of the population. For example, in GBD 2017 [GBD-2017-Risk-Appendix]_:

1.  The TMREL for radon exposure is taken to be 10 `Bq
    <https://en.wikipedia.org/wiki/Becquerel>`_/m\ :superscript:`3`, which is
    equivalent to the average outdoor concentration of radon [ICRP]_.
2.  The :ref:`Low Birth Weight and Short Gestation <2017_risk_lbwsg>` risk
    factor has multiple TMREL categories since healthy babies have many
    different birth weights and gestational ages.

These examples illustrate some complexities in defining the TMREL and TMRED for
a given risk factor. For continuous risk exposure variables --- such as radon
exposure, or hemoglobin concentration, or systolic blood pressure --- it may be
impossible to define a single TMREL for the population, as we expect different
individuals to have different radon exposure levels or hemoglobin levels or
blood pressures, even in a theoretical population where risk is minimized. In
this case the TMRED will be a nontrivial probability distribution. For example,
a plausible TMRED for radon exposure would be some probability distribution of
positive radon exposure levels concentrated near the point 10 Bq/m\
:superscript:`3`. We will further discuss this point below.

.. todo::

  Add a more in-depth discussion of TMREDs for continuous exposure variables,
  based on systolic blood pressure example in [Estimating-Attributable-Burden]_.

  Also, say something about whether there should be different TMRELs for
  different risk-outcome pairs, and how GBD handles this.

Relative Risk (RR)
++++++++++++++++++

Population Attributable Fraction (PAF)
++++++++++++++++++++++++++++++++++++++

References
----------

.. [WHO-Global-Health-Risks-Annex]

  `Annex A: Data and methods
  <https://www.who.int/healthinfo/global_burden_disease/GlobalHealthRisks_report_annex.pdf>`_
  in :title:`Global Health Risks: Mortality and burden of disease attributable
  to selected major risks`. World Health Organization. 2009.
  https://www.who.int/healthinfo/global_burden_disease/global_health_risks/en/

.. [Comparative-quantification-health-risks]

  Murray, C.J., Ezzati, M., Lopez, A.D. et al. Comparative quantification of
  health risks: Conceptual framework and methodological issues. :title:`Popul
  Health Metrics` 1, 1 (2003). https://doi.org/10.1186/1478-7954-1-1

.. [Estimating-Attributable-Burden]

  `Chapter 25: Estimating attributable burden of disease from exposure and
  hazard data
  <http://www9.who.int/publications/cra/chapters/volume2/2129-2140.pdf>`_ by
  Stephen Vander Hoorn, Majid Ezzati, Anthony Rodgers, Alan D. Lopez and
  Christopher J.L. Murray. In :title:`Comparative Quantification of Health
  Risks: Global and Regional Burden of Disease Attribution to Selected Major
  Risk Factors`. World Health Organization. 2004.
  http://www9.who.int/publications/cra/en/

.. [GBD-2017-Risk-Appendix]

  `Supplementary appendix 1 <Risk appendix on ScienceDirect_>`_ to the **GBD
  2017 Risk Factors Capstone**: GBD 2017 Risk Factor Collaborators. Global,
  regional, and national comparative risk assessment of 84 behavioural,
  environmental and occupational, and metabolic risks or clusters of risks for
  195 countries and territories, 1990–2017: a systematic analysis for the Global
  Burden of Disease Study 2017. :title:`The Lancet`. 8 Nov 2018; 392: 1923-94.
  doi: http://dx.doi.org/10.1016/S0140-6736(18)32225-6.

.. _Risk appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322256-mmc1.pdf

.. [ICRP]

  `Radon: Units of Measure <http://icrpaedia.org/Radon:_Units_of_Measure>`_.
  International Commission on Radiological Protection.
