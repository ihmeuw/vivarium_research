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

The **theoretical minimum risk exposure level (TMREL)** is the level of risk exposure that would minimize the risk of an adverse outcome for an individual. For example, in GBD 2017, the TMREL for radon exposure is taken to be 10 `becquerels <https://en.wikipedia.org/wiki/Becquerel>`_ per cubic meter, which is equivalent to the outdoor concentration of radon.
The **theoretical minimum risk exposure distribution (TMRED)** for a
population is the distribution of risk exposure that would yield the lowest
possible population risk [WHO-Global-Health-Risks-Annex]_.

Typically we imagine that everyone in the population has the same TMREL, and often this exposure level is *zero*, or *no exposure*. For example, the TMREL for smoking would be "has never smoked." In this case, the corresponding TMRED is the trivial probability distribution assigning the entire population to the single TMREL. However, for continuous risk exposure variables such as hemoglobin or systolic blood pressure, it may be impossible to define a single TMREL, as we expect different individuals to have different hemoglobin levels or blood pressures, even in a theoretical population where risk is minimized. We will further discuss this point below.

Recall from `What is a causal relationship?`_ that counterfactual analysis is
often used to describe the causal relationship between a risk factor and an
outcome. The TMRED is a particular choice of counterfactual exposure
distribution used for the causal attribution of disease burden to a particular
risk factor (see `Population Attributable Fraction (PAF)`_). Other choices of
counterfactual include the *plausible* minimum risk, *feasible* minimum risk,
and *cost-effective* minimum risk, all of which can obviously depend on specific
attributes of the population under consideration. On the other hand, Murray et
al. state [Comparative-quantification-health-risks]_:

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




Relative Risk (RR)
++++++++++++++++++

Population Attributable Fraction (PAF)
++++++++++++++++++++++++++++++++++++++

References
++++++++++

.. [WHO-Global-Health-Risks-Annex]

  https://www.who.int/healthinfo/global_burden_disease/GlobalHealthRisks_report_annex.pdf, p. 33

.. [WHO-Global-Health-Risks]

  https://www.who.int/healthinfo/global_burden_disease/global_health_risks/en/

.. [Comparative-quantification-health-risks]

  Murray, C.J., Ezzati, M., Lopez, A.D. et al. Comparative quantification of
  health risks: Conceptual framework and methodological issues. Popul Health
  Metrics 1, 1 (2003). https://doi.org/10.1186/1478-7954-1-1
