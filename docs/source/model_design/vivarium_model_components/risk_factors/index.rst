.. _models_risk_factors:

=====================
Modeling Risk Factors
=====================

This document contains information on risk factors as they relate to modeling in vivarium, including definitional overviews as well as more detailed descriptions of sub-topics related to modeling risk factors (such as risk exposures, effects, correlation, etc.).

For our purposes, a risk factor is any attribute that is associated with some outcome. The presence of this attribute, what we term the **risk exposure**, may be measured in various ways, including the dichotomous, categorical, or continuous measures. This association between the risk factor and outcome, what we term the **risk effect**, can be causal and/or non-causal, may be of large or small magnitude, and may take a linear or non-linear shape. The **population attributable fraction (PAF)** is a summary measure of how a risk factor causally relates to an outcome. Causes that are entirely attributable to a risk factor are termed **risk-attributable causes** or **PAF-of-one causes**. Additionally, risk **correlation** and **mediation** are ways in which multiple risk factors may relate to each other.

See the following pages for more information on these risk factor sub-components:

.. toctree::
   :maxdepth: 1
   :glob:

   risk_exposure/index
   risk_effects/index
   population_attributable_fraction/index
   risk_attributable_causes/index
   risk_correlation/index
   risk_mediation/index
   residual_confounding/index

Risk factors in GBD
^^^^^^^^^^^^^^^^^^^

The Global Burden of Disease study models risk factors and their effects on specific outcomes that meet the burden of proof for causality. The effort to assess the quality of evidence on causality is described in publications such as [Zheng-et-al-2022]_ and summarized on the `Burden of Proof Data Visualization webpage <https://vizhub.healthdata.org/burden-of-proof/>`_. The `GBD 2019 risk factors capstone publication can be found here <https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30752-2/fulltext>`_ and can also be explored one the `GBD compare data visualization webpage <https://vizhub.healthdata.org/gbd-compare/>`_

The GBD categorizes risk factors it models into environmental/occupational, behavioral, and metabolic risks. For example:

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

Some examples and additional considerations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

.. note::

  For information regarding the definition of **causal relationships**, see the :ref:`Causal Diagrams Page <general_dags>` page.

References
----------

.. [WHO-Global-Health-Risks-Annex]
  `Annex A: Data and methods
  <https://www.who.int/healthinfo/global_burden_disease/GlobalHealthRisks_report_annex.pdf>`_
  in :title:`Global Health Risks: Mortality and burden of disease attributable
  to selected major risks`. World Health Organization. 2009.
  https://www.who.int/healthinfo/global_burden_disease/global_health_risks/en/

.. [Comparative-quantification-health-risks-2003]
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

.. [GBD-2017-Risk-Appendix-Modeling-Risk-Factors]
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

.. [Zheng-et-al-2022]
  Zheng, P., Afshin, A., Biryukov, S. et al. The Burden of Proof studies: assessing the evidence of risk. Nat Med 28, 2038–2044 (2022). https://doi.org/10.1038/s41591-022-01973-2
