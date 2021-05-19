.. _2019_risk_effect_lbwsg:

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

================================================
Low Birthweight and Short Gestation Risk Effects
================================================

.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

.. todo::

	Provide a brief description of the risk, including potential opportunities for confounding (factors that may cause or be associated with the risk exposure), effect modification/generalizability, etc. by any relevant variables. Note that literature reviews and speaking with the GBD risk modeler will be good resources for this.

GBD 2019 Modeling Strategy
--------------------------

.. note::

	This section will describe the GBD modeling strategy for risk effects. For a description of GBD modeling strategy for risk exposure, see the :ref:`risk exposure <2019_risk_exposure_lbwsg>` page.

**The available data for deriving relative risk was only for all-cause mortality.**
For each location, data were pooled across years, and the risk of all-cause mortality at the **early neonatal period** and **late neonatal period** at joint birthweight and gestational age combinations was calculated.
In all datasets except for the USA, sex-specific data were combined to maximise sample size. The USA analyses were sex-specific.
**Relative risks of all-cause mortality were calculated for each 500g and 2wk category of birthweight and gestational age.** [GBD-2019-Risk-Factors-Appendix-LBWSG-Risk-Effects]_

Details of Relative Risk Estimation
+++++++++++++++++++++++++++++++++++

In the Norway, New Zealand, and USA Linked Birth/Death Cohort microdata datasets, livebirths are reported with gestational age, birthweight, and an indicator of death at 7 days and 28 days. For this analysis, gestational age was grouped into two-week categories, and birthweight was grouped into 500-gram categories. The Taiwan, Japan, and Singapore datasets were prepared in tabulations of joint 500-gram and two-week categories. A pooled country analysis of mortality risk in the early neonatal period and late neonatal period by “small for gestational age” category in developing countries in Asia and sub-Saharan Africa were also used to inform the relative risk analysis.

To calculate relative risk at each 500-gram and two-week combination, logistic regression was first used to calculate mortality odds for each joint two-week gestational age and 500-gram birthweight category. Mortality odds were smoothed with Gaussian process regression, with the independent distributions of mortality odds by birthweight and mortality odds by gestational age serving as priors in the regression.
A pooled country analysis of mortality risk in the early neonatal period and late neonatal period by SGA category in developing countries in Asia and sub-Saharan Africa were also converted into 500-gram and two-week bin mortality odds surfaces.

The relative risk surfaces produced from microdata and the Asia and Africa surfaces produced from the pooled country analysis were meta-analysed, resulting in a meta- analysed mortality odds surface for each location. The meta-analysed mortality odds surface for each location was smoothed using Gaussian process regression and then converted into mortality risk.

To calculate mortality relative risks, the risk of each joint two-week gestational age and 500-gram birthweight category were divided by the risk of mortality in the joint gestational age and birthweight category with the lowest mortality risk. [GBD-2019-Risk-Factors-Appendix-LBWSG-Risk-Effects]_

.. note::

  Although the above description from the GBD 2019 risk appendix sometimes refers to location-specific mortality risks, the relative risks in GBD 2019 are the same for all locations. Pulling LBWSG RR's with ``get_draws`` for any location returns RR's with location_id = 1 (Global), and they are stratified by year/age_group/sex.

Affected Outcomes
+++++++++++++++++

The available data for deriving relative risk was only for *all-cause mortality* rather than for cause-specific outcomes. The exception was the USA linked infant birth-death cohort data, which contained three-digit ICD causes of death, but also had nearly 30% of deaths coded to causes that are ill-defined, or intermediate, in the GBD cause classification system.

Therefore, the GBD modelers analysed the relative risk of all-cause mortality across all available sources and selected outcomes based on criteria of biological plausibility. **Some causes, most notably congenital birth defects, haemoglobinopathies, malaria, and HIV/AIDS, were excluded based on the criteria that reverse causality could not be excluded.** [GBD-2019-Risk-Factors-Appendix-LBWSG-Risk-Effects]_

.. list-table:: Affected Entities
   :widths: 5 5 5 5 5
   :header-rows: 1

   * - Outcome
     - Outcome type
     - Outcome ID
     - Affected measure
     - Note
   * - Diarrheal diseases
     - Cause
     - 302
     - Mortality (GBD YLLs)
     -
   * - Lower respiratory infections
     - Cause
     - 322
     - Mortality (GBD YLLs)
     -
   * - Upper respiratory infections
     - Cause
     - 328
     - Mortality (GBD YLLs)
     -
   * - Otitis media
     - Cause
     - 329
     - Mortality (GBD YLLs)
     -
   * - Meningitis
     - Cause
     - 332
     - Mortality (GBD YLLs)
     -
   * - Encephalitis
     - Cause
     - 337
     - Mortality (GBD YLLs)
     -
   * - Neonatal preterm birth
     - Cause (PAF-of-1)
     - 381
     - Mortality and Morbidity (GBD YLLs and YLDs)
     - 100% attributable to Low birthweight and short gestation
   * - Neonatal encephalopathy due to birth asphyxia and trauma
     - Cause
     - 382
     - Mortality (GBD YLLs)
     -
   * - Neonatal sepsis and other neonatal infections
     - Cause
     - 383
     - Mortality (GBD YLLs)
     -
   * - Hemolytic disease and other neonatal jaundice
     - Cause
     - 384
     - Mortality (GBD YLLs)
     -
   * - Other neonatal disorders
     - Cause
     - 385
     - Mortality (GBD YLLs)
     -
   * - Sudden infant death syndrome
     - Cause
     - 686
     - Mortality (GBD YLLs)
     -

Restrictions
++++++++++++

Risk Exposure Categories and TMREL
++++++++++++++++++++++++++++++++++

Vivarium Modeling Strategy
--------------------------

.. note::

	This section will describe the Vivarium modeling strategy for risk effects. For a description of Vivarium modeling strategy for risk exposure, see the :ref:`risk exposure <2019_risk_exposure_lbwsg>` page.

.. todo::

  List the risk-outcome relationships that will be included in the risk effects model for this risk factor. Note whether the outcome in a risk-outcome relationship is a standard GBD risk-outcome relationship or is a custom relationship we are modeling for our simulation.

.. list-table:: Risk Outcome Relationships for Vivarium
   :widths: 5 5 5 5 5
   :header-rows: 1

   * - Outcome
     - Outcome type
     - Outcome ID
     - Affected measure
     - Note
   * -
     -
     -
     -
     -

Risk Outcome Pair #1
++++++++++++++++++++

.. todo::

	Replace "Risk Outcome Pair #1" with the name of an affected entity for which a modeling strategy will be detailed. For additional risk outcome pairs, copy this section as many times as necessary and update the titles accordingly.

.. todo::

  Link to existing cause model document or other documentation of the outcome in the risk outcome pair.

.. todo::

  Describe which entitity the relative risks apply to (incidence rate, prevalence, excess mortality rate, etc.) and *how* to apply them (e.g. :code:`affected_measure * (1 - PAF) * RR`).

  Be sure to specify the exact PAF that should be used in the above equation and either how to calculate it (see the `Population Attributable Fraction` section of the :ref:`Modeling Risk Factors <models_risk_factors>` document) or pull it (:code:`vivarium_inputs.interface.get_measure(risk_factor.{risk_name}, 'population_attributable_fraction')`, noting which affected entity and measure should be used)

.. todo::

  Complete the following table to list the relative risks for each risk exposure category on the outcome. Note that if there are many exposure categories, another format may be preferable.

  Relative risks for a risk factor may be pulled from GBD at the draw-level using :code:`vivarium_inputs.interface.get_measure(risk_factor.{risk_name}, 'relative_risk')`. You can then calculate the mean value as well as 2.5th, and 97.5th percentiles across draws.

  The relative risks in the table below should be included for easy reference and should match the relative risks pulled from GBD using the above code. In this case, update the :code:`Note` below to include the appropriate :code:`{risk_name}`.

  If for any reason the modeling strategy uses non-GBD relative risks, update the :code:`Note` below to explain that the relative risks in the table are a custom, non-GBD data source and include a sampling strategy.

.. note::

  The following relative risks are displayed below for convenient reference. The relative risks in the table below should match the relative risks that can be pulled at the draw level using :code:`vivarium_inputs.interface.get_measure(risk_factor.{risk_name}, 'relative_risk')`.

.. list-table:: Relative Risks
   :widths: 5 5 5
   :header-rows: 1

   * - Exposure Category
     - Relative Risk
     - Note
   * -
     -
     -

Validation and Verification Criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. todo::

  List validation and verification criteria, including a list of variables that will need to be tracked and reported in the Vivarium simulation to ensure that the risk outcome relationship is modeled correctly

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. todo::

	List assumptions and limitations of this modeling strategy, including any potential issues regarding confounding, mediation, effect modification, and/or generalizability with the risk-outcome pair.

Bias in the Population Attributable Fraction
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As noted in the `Population Attributable Fraction` section of the :ref:`Modeling Risk Factors <models_risk_factors>` document, using a relative risk adjusted for confounding to compute a population attributable fraction at the population level will introduce bias.

.. todo::

	Outline the potential direction and magnitude of the potential PAF bias in GBD based on what is understood about the relationship of confounding between the risk and outcome pair using the framework discussed in the `Population Attributable Fraction` section of the :ref:`Modeling Risk Factors <models_risk_factors>` document.

References
----------

.. [GBD-2019-Risk-Factors-Appendix-LBWSG-Risk-Effects]

 Pages 167-177 in `Supplementary appendix 1 to the GBD 2019 Risk Factors Capstone <2019_risk_factors_methods_appendix_>`_:

   **(GBD 2019 Risk Factors Capstone)** GBD 2019 Risk Factors Collaborators.
   :title:`Global burden of 87 risk factors in 204 countries and territories,
   1990–2019: a systematic analysis for the Global Burden of Disease Study
   2019`. Lancet 2020; **396:** 1223–49. DOI:
   https://doi.org/10.1016/S0140-6736(20)30752-2

.. _2019_risk_factors_methods_appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30752-2/attachment/54711c7c-216e-485e-9943-8c6e25648e1e/mmc1.pdf
