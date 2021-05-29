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

**The available data for deriving relative risk was only for all-cause
mortality.**
For each location, data were pooled across years, and the risk of all-cause
mortality at the **early neonatal period** and **late neonatal period** at joint
birthweight and gestational age combinations was calculated. In all datasets
except for the USA, sex-specific data were combined to maximise sample size. The
USA analyses were sex-specific.
**Relative risks of all-cause mortality were calculated for each 500g and 2wk
category of birthweight and gestational age.**
[GBD-2019-Risk-Factors-Appendix-LBWSG-Risk-Effects]_

Details of Relative Risk Estimation
+++++++++++++++++++++++++++++++++++

In the Norway, New Zealand, and USA Linked Birth/Death Cohort microdata
datasets, livebirths are reported with gestational age, birthweight, and an
indicator of death at 7 days and 28 days. For this analysis, gestational age was
grouped into two-week categories, and birthweight was grouped into 500-gram
categories. The Taiwan, Japan, and Singapore datasets were prepared in
tabulations of joint 500-gram and two-week categories. A pooled country analysis
of mortality risk in the early neonatal period and late neonatal period by
“small for gestational age” category in developing countries in Asia and
sub-Saharan Africa were also used to inform the relative risk analysis.

To calculate relative risk at each 500-gram and two-week combination, logistic
regression was first used to calculate mortality odds for each joint two-week
gestational age and 500-gram birthweight category. Mortality odds were smoothed
with Gaussian process regression, with the independent distributions of
mortality odds by birthweight and mortality odds by gestational age serving as
priors in the regression. A pooled country analysis of mortality risk in the
early neonatal period and late neonatal period by SGA category in developing
countries in Asia and sub-Saharan Africa were also converted into 500-gram and
two-week bin mortality odds surfaces.

The relative risk surfaces produced from microdata and the Asia and Africa
surfaces produced from the pooled country analysis were meta-analysed, resulting
in a meta- analysed mortality odds surface for each location. The meta-analysed
mortality odds surface for each location was smoothed using Gaussian process
regression and then converted into mortality risk.

To calculate mortality relative risks, the risk of each joint two-week
gestational age and 500-gram birthweight category were divided by the risk of
mortality in the joint gestational age and birthweight category with the lowest
mortality risk. [GBD-2019-Risk-Factors-Appendix-LBWSG-Risk-Effects]_

.. note::

  Although the above description from the GBD 2019 risk appendix sometimes
  refers to location-specific mortality risks, the relative risks in GBD 2019
  are the same for all locations. Pulling LBWSG RR's with ``get_draws`` for any
  location returns RR's with location_id = 1 (Global), and they are stratified
  by year/age_group/sex. If we need clarification on exactly how the relative
  risks were calculated, we should consult the GBD modelers.

Affected Outcomes
+++++++++++++++++

The available data for deriving relative risk was only for *all-cause mortality*
rather than for cause-specific outcomes. The exception was the USA linked infant
birth-death cohort data, which contained three-digit ICD causes of death, but
also had nearly 30% of deaths coded to causes that are ill-defined, or
intermediate, in the GBD cause classification system.

Therefore, the GBD modelers analysed the relative risk of all-cause mortality
across all available sources and selected outcomes based on criteria of
biological plausibility. **Some causes, most notably congenital birth defects,
haemoglobinopathies, malaria, and HIV/AIDS, were excluded based on the criteria
that reverse causality could not be excluded.**
[GBD-2019-Risk-Factors-Appendix-LBWSG-Risk-Effects]_

.. list-table:: Entities Affected by LBWSG in GBD 2019
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

.. note::

  There are 12 causes affected by LBWSG in GBD 2019, whereas GBD 2017 included
  15 affected causes. The only difference is that meningitis (c332) had four
  subcauses in GBD 2017 (c333, c334, c335, c336, corresponding to different
  etiologies), whereas in GBD 2019, c332 is the most detailed cause, and the
  subcauses have been removed.

Restrictions
++++++++++++

.. list-table:: Age, Sex, and Outcome Restrictions for LBWSG Relative Risks in GBD 2019
  :widths: 15 15 20
  :header-rows: 1

  * - Restriction Type
    - Value
    - Notes
  * - Male only
    - False
    -
  * - Female only
    - False
    -
  * - YLL only
    - True
    - Except for Neonatal preterm birth; see :ref:`note <note_on_preterm_birth_DALYs>` below
  * - YLD only
    - False
    -
  * - Age group start
    - Early neonatal (0-7 days, age_group_id = 2)
    -
  * - Age group end
    - Late neonatal (7-28 days, age_group_id = 3)
    - Except for Neonatal preterm birth; see :ref:`note <note_on_preterm_birth_DALYs>` below

.. _note_on_preterm_birth_DALYs:

.. note::

  GBD attributes 100% of the DALYs due to Neonatal Preterm Birth to the LBWSG
  risk factor. In particular, the attribution includes YLDs as well as YLLs, and
  the age restrictions for the LBWSG-attributable DALYs are the same as the age
  restrictions for Neonatal Preterm Birth.

  * **YLLs due to Neonatal preterm birth**, 100% attributable to LBWSG:

    - Age group start = 2 (Early neonatal, 0-7 days)
    - Age group end = 5 (1 to 4)

  * **YLDs due to Neonatal preterm birth**, 100% attributable to LBWSG:

    - Age group start = 2 (Early neonatal, 0-7 days)
    - Age group end = 235 (95+)

  Note that this attribution of DALYs is **not** based on the relative risks for
  all-cause mortality, but instead is based on the logic that all preterm births
  are due to short gestation by definition. Thus, if we include Neonatal Preterm
  Birth in our models, the relative risks likely must be handled differently for
  this cause.

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

Validation of Mortality Rates, Relative Risks, and Exposure
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Here is a validation that can be run in isolation prior to putting the LBWSG model into a full simulation with other model components:

#.  Initialize a birth cohort with birthweights and gestational ages
    distributed according to the LBWSG exposure distribution at birth
    (age_group_id=164).

#.  Age the population to 7 days and to 28 days, subjecting the population to
    the LBWSG relative risks of all-cause mortality based on their LBWSG
    category.

#.  Record the person-time in the early neonatal age group (0-7 days) and late
    neonatal age group (7-28 days) **in each of the 58 LBWSG categories**. Use
    the person time to compute the average prevalence of each LBWSG catgory in
    each age group, and compare the simulated prevalences with the ENN and LNN
    category prevalences pulled from GBD.

#.  Record deaths in the ENN and LNN age groups, and compare the mortality
    rates with the corresponding all-cause mortality rates in GBD. Deaths could
    also be stratified by LBWSG category to verify simulated RRs against the RR
    input data.

This validation could be run with increasing degrees of complexity:

a.  Apply the RRs directly to the all-cause mortality rate of the simulants.

b.  Do not explicitly model any causes, but distinguish between causes affected
    by LBWSG vs. unaffected by LBWSG, and apply the RRs only to the CSMRs of the
    affected causes.

c.  Add in one or more explicitly modeled causes, and apply the the RRs to the
    EMR or CSMR of the affected causes, depending on whether the cause is
    explicitly modeled.

d.  The validation could also be done by initializing a cohort in the ENN age
    group or LNN age group based on GBD prevalences, to ensure that the LBWSG
    relative risks will work correctly for simulants initialized into these age
    groups in our models.

This validation strategy requires recording outputs stratified by all 58 LBWSG
exposure categories, so it would be best to do the validation with as few model
components as possible, then remove the stratified outputs once satisfactory
behavior has been verified. In fact, it would be worth writing a reusable
simulation specifically to do the (a), (b), and (d) validations above,
independent of any specific project we're working on, and do the (c) validation
for each project that uses LBWSG, depending on which causes are modeled.

.. note::

  It would be worth checking with the GBD modelers to see whether it is accurate
  to interpret the ENN exposure and LNN exposure as average LBWSG category
  prevalences for the 0-7 day period and 7-28 day period (or equivalently(?),
  the point prevalence at the midpoint of each interval).

  Also, it would be worth finding out whether the modelers have data on the
  LBWSG category prevalences **at** 7 days and 28 days, as the risk appendix
  indicates that these point prevalences were estimated as part of the analysis.
  If so, these would provide additional data to validate against.

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
