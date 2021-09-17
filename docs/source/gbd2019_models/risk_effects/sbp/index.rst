.. _2019_risk_effect_sbp:

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

================
SBP Risk Effects
================

.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

Blood pressure is recorded as two numbers, systolic (SBP) and diastolic (DBP), and presented as the ratio of SBP/DBP. SBP indicates how much pressure the blood is exerting against the artery walls when the heart contracts, while DBP indicates how much pressure the blood is exerting against the artery walls while the heart is resting between beats. Typically, SBP rises with age due to increased stiffness in the larger arteries. SBP is usually given more attention as a major risk factor for cardiovascular diseases, but elevated DBP (even in the absence of elevated SBP) has also been shown to be associated with increased risk of cardiovascular disease. Thresholds for defining clinical hypertension (high blood pressure) vary between guidelines set by different bodies (AHA/ACC >130/80 mm Hg; ESC >140/90 mm Hg). 

[heart-sbp]_
[bakris-sbp]_

High systolic blood pressure is associated with the strongest evidence for causation and it has a high prevalence of exposure. 

“Observational studies have demonstrated graded associations between higher systolic blood pressure (SBP) and diastolic blood pressure (DBP) and increased CVD risk. In a meta-analysis of 61 prospective studies, the risk of CVD increased in a log-linear fashion from SBP levels <115 mmHg to>180mmHg and from DBP levels <75mmHg to >105 mm Hg. In that analysis, 20 mm Hg higher SBP and 10 mm Hg higher DBP were each associated with a doubling in the risk of death from stroke, heart disease, or other vascular disease. In a separate observational study including >1 million adult patients ≥30 years of age, higher SBP and DBP were associated with increased risk of CVD incidence and angina, myocardial infarction (MI), HF, stroke, peripheral artery disease (PAD), and abdominal aortic aneurysm, each evaluated separately. An increased risk of CVD associated with higher SBP and DBP has been reported across a broad age spectrum, from 30 years to >80 years of age. Although the relative risk of incident CVD associated with higher SBP and DBP is smaller at older ages, the correspond- ing high BP–related increase in absolute risk is larger in older persons (≥65 years) given the higher absolute risk of CVD at an older age.”  

[whelton]_

“Among the risk factors for CVD, high blood pressure (BP) is associated with the strongest evidence for causation and it has a high prevalence of exposure.” 

[fuchs]_

“Elevated blood pressure is the most important risk factor for death and disability worldwide, affecting more than one billion individuals and causing an estimated 9·4 million deaths every year. Prospective cohort studies have reported a continuous log-linear association between blood pressure and vascular events to a blood pressure of 115/75 mm Hg, with no apparent threshold. This association seems to exist across large and diverse population groups, including men and women, individuals aged 40–89 years, from different ethnicities, with and without established vascular disease.” 

[ettehad]_

GBD 2019 Modeling Strategy
--------------------------

.. note::

   This section will describe the Vivarium modeling strategy for risk effects.
   For a description of Vivarium modeling strategy for risk exposure, see the
   {RISK_EXPOSURE_PAGE_LINK} page.

.. todo::

	Replace {RISK_EXPOSURE_PAGE_LINK} with a reference to the appropriate risk exposure page in the above note.

.. todo::

	Provide a brief overview of how the risk affects different outcomes, including data sources used by GBD, GBD assumptions, etc. Note that the [GBD-2019-Risk-Factors-Appendix-Risk-Effects-Model-Template]_ is a good source for this information in addition to the GBD risk modeler.

.. todo::

	Fill out the following table so that it reflects *all* entities affected by the risk in GBD 2019.

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

.. note::

   This section will describe the Vivarium modeling strategy for risk effects.
   For a description of Vivarium modeling strategy for risk exposure, see the
   {RISK_EXPOSURE_PAGE_LINK} page.

.. todo::

   Replace {RISK_EXPOSURE_PAGE_LINK} with a reference to the appropriate risk exposure page in the above note.

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

.. [heart-sbp] Understanding Blood Pressure Readings. American Heart Association, www.heart.org.
	Retrieved 17 Sept 2021.
	https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings

.. [bakris-sbp] Bakris, G., Ali, W., & Parati, G. (2019). 
	ACC/AHA versus ESC/ESH on hypertension guidelines: JACC guideline comparison. Journal of the American College of Cardiology, 73(23), 3018-3026.
	https://www.jacc.org/doi/full/10.1016/j.jacc.2019.03.507

.. [whelton] Whelton, P. K., Carey, R. M., Aronow, W. S., Casey, D. E., Collins, K. J., Dennison Himmelfarb, C., ... & Wright, J. T. (2018). 
	2017 ACC/AHA/AAPA/ABC/ACPM/AGS/APhA/ASH/ASPC/NMA/PCNA guideline for the prevention, detection, evaluation, and management of high blood pressure in adults: a report of the American College of Cardiology/American Heart Association Task Force on Clinical Practice Guidelines. Journal of the American College of Cardiology, 71(19), e127-e248.
	https://doi.org/10.1161/HYP.0000000000000065

.. [fuchs] Fuchs, F. D., & Whelton, P. K. (2020). 
	High blood pressure and cardiovascular disease. Hypertension, 75(2), 285-292.
	https://doi.org/10.1161/HYPERTENSIONAHA.119.14240

.. [ettehad] Ettehad, D., Emdin, C. A., Kiran, A., Anderson, S. G., Callender, T., Emberson, J., ... & Rahimi, K. (2016). 
	Blood pressure lowering for prevention of cardiovascular disease and death: a systematic review and meta-analysis. The Lancet, 387(10022), 957-967.
	https://doi.org/10.1016/S0140-6736(15)01225-8
