.. _2019_risk_correlation_maternal_bmi_birthweight:

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
Maternal BMI and Birthweight Risk Correlations
=================================================

Risk Exposures Overview
------------------------

Maternal body mass index (BMI) is associated with child health outcomes and is correlated with several other predictors of child health outcomes such as household food security. 

Correlation
++++++++++++

For the :ref:`balanced energy protein simulation <2017_concept_model_vivarium_gates_bep>` publication we performed a systematic review and meta-analysis of the crude weighted mean difference in birthweight (grams) among babies born to mothers with a BMI less than 18.5 relative to those born to mothers with BMI of 18.5 or greater in low and middle income countries (LMICs). *Crude* birthweight differences were extracted in order to estimate the correlation between maternal BMI and birthweight in LMICs rather than the causal relationship adjusted for confounding factors. Details of this analysis are included in the publication draft currently under peer review.

Causation
+++++++++++

We are not currently modeling the direct causal impact of maternal BMI on bithweight. Rather, we will model interventions that affect infant birthweight through changes in maternal BMI directly without modeling the intermediate changes in maternal BMI risk exposure, such as in the :ref:`maternal supplementation intervention model <maternal_supplementation_intervention>`.

Risk Exposures in GBD
-----------------------

Links to documentation for relevant risk exposure pages include:

- :ref:`GBD 2019 Low birthweight short gestation risk exposure <2019_risk_exposure_lbwsg>`

- :ref:`Custom maternal BMI risk exposure <2019_risk_exposure_maternal_bmi>`

Vivarium Modeling Strategy
----------------------------

Correlation
++++++++++++

.. note::

   The strategy for modeling risk-risk correlations related to child anthropometry in this document was developed for the needs of the :ref:`balanced energy protein simulation <2017_concept_model_vivarium_gates_bep>` and the :ref:`acute malnutrition treatment and prevention simulation <2019_concept_model_vivarium_ciff_sam>`. Different strategies may be more appropriate for different project needs and should be reevaluated when necessary.

Given that the maternal BMI risk exposure is modeled as dichotomous, we will model differential birthweight exposures between the two maternal BMI strata as a population mean difference rather than a correlation coefficient between two continuous measures. The difference in population mean birthweight among the exposed population (maternal BMI < 18.5) relative to the TMREL (maternal BMI >= 18.5), referred to as :math:`BW_\text{exposed - TMREL}`, should be **-138.46 (95% CI: -174.68, -102.25).** Assume a normal distribution of uncertainty within the reported confidence interval.

Given that,

.. math::

   BW_\text{exposed - TMREL} = \overline{BW}_\text{exposed} - \overline{BW}_\text{TMREL}

.. math::

   \overline{BW}_{GBD} = p_\text{exposed} * \overline{BW}_\text{exposed} + p_\text{TMREL} * \overline{BW}_\text{TMREL}

Then the difference between maternal BMI strata and the population mean from GBD can be represented as:

.. math::

   BW_\text{TMREL - GBD} = -p_\text{exposed} * BW_\text{exposed - TMREL}

and

.. math::

   BW_\text{exposed - GBD} = (1 - p_\text{exposed}) * BW_\text{exposed - TMREL}

Where :math:`p_\text{exposed}` represents the exposure prevalence of maternal BMI < 18.5.

Therefore, the association bewteen maternal BMI risk exposure and birthweight risk exposure should be implemented according to the following steps:

#. Assign maternal BMI risk exposure values as described on the :ref:` maternal BMI risk exposure page <2019_risk_exposure_maternal_bmi>`

#. Assign a continuous birthweight exposure page as described on the :ref:`GBD 2019 Low birthweight short gestation risk exposure page <2019_risk_exposure_lbwsg>`

#. Apply a shift to the assigned birthweight exposure value from step 2 based on the assigned maternal BMI exposure such that:

.. math::

   BW_\text{i, shifted} = BW_\text{i, unshifted} + BW_\text{maternal BMI exposure(i) - GBD}

Causation
++++++++++++

We are not currently modeling a direct causal relationship between changes in maternal BMI exposure and changes in birthweight exposure.

Assumptions and Limitations
++++++++++++++++++++++++++++++

#. We are limited in that we apply the birthweight shift between maternal BMI strata estimated from a random effects model of serveral populations from the literature to specific modeled populations even though there is evidence of significant heterogeneity between populations. 

#. We are limited in that we consider only the population mean difference in birthweight between maternal BMI strata due to our dichotomous measure of maternal BMI risk exposure rather than a continuous measure of maternal BMI which would allow for a more detailed association between the two risk exposures.

Validation Criteria
+++++++++++++++++++++

#. The exposure distribution of birthweight in the baseline scenario should continue to validate to the GBD birthweight exposure distribution

#. The difference in population mean birthweight in the exposed maternal BMI category and the TMREL maternal BMI category should approximately equal :math:`BW_\text{exposed-TMREL}`

References
-----------

.. todo::

   Cite the BEP paper with the maternal BMI meta-analysis supplement if/when available.