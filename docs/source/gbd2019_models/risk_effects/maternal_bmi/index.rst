.. _2019_risk_effect_maternal_bmi:

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

===========================
Maternal Body Mass Index
===========================

.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

Maternal body mass index (BMI) is associated with child health outcomes and is correlated with several other predictors of child health outcomes such as household food security. Maternal BMI is not a risk factor for child outcomes in GBD. Rather, we will implement a custom risk factor model of maternal BMI on child outcomes.

.. note::

   This section will describe the Vivarium modeling strategy for risk effects.
   For a description of Vivarium modeling strategy for risk exposure, see the
   :ref:`maternal BMI risk exposure <2019_risk_exposure_maternal_underweight>` page.

.. list-table:: Affected Entities
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

Vivarium Modeling Strategy
--------------------------

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

Birthweight (Crude effect)
++++++++++++++++++++++++++++

The birthweight exposure document :ref:`can be found here <2019_risk_exposure_lbwsg>`.

The maternal BMI risk exposure will affect the continuous birthweight expousure as an *additive shift*. The size of the association between maternal BMI and birthweight was estimated in a systematic review and meta-analysis performed for the :ref:`Balanced Energy Protein simulation model <2017_concept_model_vivarium_gates_bep>`.

.. note::

   The risk effect modeled for maternal BMI on birthweight for the purposes of 

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

