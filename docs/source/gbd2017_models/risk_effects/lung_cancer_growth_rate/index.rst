.. _2017_risk_effect_lung_cancer_growth:

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

====================================
Lung Cancer Growth Rate Risk Effects
====================================

.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

.. todo::

	Provide a brief description of the risk, including potential opportunities for confounding (factors that may cause or be associated with the risk exposure), effect modification/generalizability, etc. by any relevant variables. Note that literature reviews and speaking with the GBD risk modeler will be good resources for this.

GBD 2017 Modeling Strategy
--------------------------

The lung cancer growth rate risk factor is not modeled in GBD and is a custom risk factor developed for use in the :ref:`SwissRe Lung Cancer Screening Model <lung_cancer_cancer_concept_model>`.

Vivarium Modeling Strategy
--------------------------

.. note::

	This section will describe the Vivarium modeling strategy for risk effects. For a description of Vivarium modeling strategy for risk exposure, see the :ref:`risk exposure <2017_risk_exposure_lung_cancer_growth_rate>` page.

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
   * - Lung cancer mean sojourn time (MST)
     - Custom parameter
     - N/A
     - Duration
     - MST is defined in the :ref:`lung cancer cause model document <2017_lung_cancer>`

Lung Cancer Mean Sojourn Time
+++++++++++++++++++++++++++++

The outcome effected by the lung cancer growth rate risk factor is a component of the lung cancer cause model, documented :ref:`here <2017_lung_cancer>`.

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

.. todo::

  Update the GBD 2017 Risk Factor Methods appendix citation to be unique to your risk effects page (replace 'Risk-Effects-Model-Template' with '{Risk Name}-Effects')

  Update the appropriate page numbers in the GBD risk factors methods appendix below

  Add additional references as necessary 

.. [GBD-2017-Risk-Factors-Appendix-Risk-Effects-Model-Template]

   Pages ???-??? in `Supplementary appendix 1 to the GBD 2017 Risk Factors Capstone <risk_factors_methods_appendix_>`_:

     **(GBD 2017 Risk Factors Capstone)** GBD 2017 Risk Factor Collaborators. :title:`Global, regional, and national comparative risk assessment of 84 behavioural, environmental and occupational, and metabolic risks or clusters of risks for 195 countries and territories, 1990–2017: a systematic analysis for the Global Burden of Disease Study 2017`. Lancet 2018; 392: 1923-1994. DOI:
     https://doi.org/10.1016/S0140-6736(18)32225-6

.. _risk_factors_methods_appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32225-6/attachment/be595013-2d8b-4552-86e3-6c622827d2e9/mmc1.pdf