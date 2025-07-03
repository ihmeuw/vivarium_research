.. _intervention_iv_iron_antenatal:

==============================
Antenatal Intravenous Iron
==============================

.. todo::

  Add a brief introductory paragraph for this document.

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - IV
    - Intravenous
    - 

Intervention Overview
-----------------------

The antenatal IV iron intervention is intended to be administered to pregnant women who have a hemoglobin level less than 100 grams per liter as early in pregnancy as possible. Pregnant women will be screened for low hemoglobin level during antenatal care visits. 

.. list-table:: Affected Outcomes
  :widths: 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note (ex: is this relationship direct or mediated?)
  * - Hemoglobin concentration
    - Increases population mean
    - Yes
    - 
  * - Birthweight
    - Increases population mean
    - Not yet
    - 

Baseline Coverage Data
++++++++++++++++++++++++

Assume no baseline coverage in low and middle income countries.

Vivarium Modeling Strategy
--------------------------

We will model the following eligibility for the antenatal IV iron intervention:

#. Pregnant according to the :ref:`pregnancy model document <other_models_pregnancy>`
#. Hemoglobin level of less than 100 grams per liter (after the application of the pregnancy adjustment factor) according to the :ref:`hemoglobin model document <2019_hemoglobin_model>`

.. note::

  Women who receive IV iron should continue to be covered by the :ref:`maternal supplementation intervention <maternal_supplementation_intervention>` 

  A potential future eligibility criterion for this intervention may be antenatal care visit attendance if we include it as a modeled parameter.

  Women can recieve only one dose of IV iron during pregnancy.
  
.. todo::

  Consider adding a component to incorporate measurement error in maternal hemoglobin level to assess eligibility.

We assume that IV iron intervention coverage takes place at the start of pregnancy (i.e. upon transition into the pregnant state).

.. list-table:: Modeled Outcomes
  :widths: 15 15 15 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Outcome type
    - Outcome ID
    - Affected measure
    - Effect size measure
    - Effect size
    - Note 
  * - Hemoglobin
    - Modelable entity
    - 10487
    - Population mean hemoglobin concentration (as continuous measure)
    - Mean difference
    - +23 g/L
    - 
  * - Birthweight
    - Risk exposure
    - 339
    - Population mean birthweight (as continuous measure)
    - Mean difference
    - +50 grams
    - Assume no difference in gestational age

Hemoglobin level among pregnant and lactating women
+++++++++++++++++++++++++++++++++++++++++++++++++++++

.. list-table:: Maternal hemoglobin effect size
  :header-rows: 1

  * - Population
    - Effect size
    - Parameter uncertainty
    - Stochastic uncertainty
    - Note
  * - Pregnant women with hemoglobin levels less than 100 g/L
    - +23 g/L
    - None (for now)
    - Sample from a normal distribution with a mean=23, SD=14. If sampled value is less than 0 g/L, replace sampled value with 0 (aka, rectified normal distribution with lower bound of zero).
    - Effect applied at 15 weeks gestation (two weeks after start of the second trimester) through the end of the postpartum period. Effect size is from the BMGF ongoing trials relative to oral iron supplementation. Lower bound of zero chosen for biologic plausibility of non-response.

The effect of the IV iron intervention on maternal hemoglobin should be applied as an additive shift to the simulant's continuous hemoglobin exposure value two weeks after the start of the second trimester of pregnancy, or **at 15 weeks gestation**, after the application of the pregnancy adjustment factor. The effect of the intervention should be removed (subtracted from the hemoglobin exposure level) at the end of the postpartum period prior to the removal of the pregnancy adjustment factor.

Notably, the intervention will be *administered* at 13 weeks gestation, and the effect of the intervention on maternal hemoglobin will occur two weeks later at 15 weeks gestation. Mothers that receive a IV iron at 13 weeks gestation and give birth (or experience a miscarriage/etc.) prior to 15 weeks (rare, but possible) should *not* be eligible for at additional dose of postpartum IV iron at birth. The effect of the antenatal IV iron dose on maternal hemoglobin should still occur two weeks following administration and persist through the end of the postpartum period.

.. note::

  The impact of antenatal IV iron should persist despite other changes to the maternal hemoglobin level due to the maternal supplementation intervention, maternal hemorrhage incidence, or postpartum IV iron.

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- To align with the optomistic target profile from the BMGF, we assume that IV iron is administered at the start of the second trimester. This will overestimate the impact of the intervention given that not all women will receive the intervention at the earliest eligible timepoint.

.. todo::

  Consider updating this assumption

- We assume the effect of the intervention persists through the end of the postpartum period at which point the woman's hemoglobin concentration returns to its pre-pregnancy level.

- We do not consider effect modification by baseline hemoglobin status. In reality, the effect of IV iron may be greater among women with lower baseline hemoglobin levels.

- We currently assume no measurement error in maternal hemoglobin level

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Intervention coverage among the eligible population should verify to the scenario-specific level
- Intervention coverage should be zero among the non-eligible populations
- Hemoglobin level stratified by intervention coverage should reflect the intervention effect size

Infant birthweight
+++++++++++++++++++++++++++++++++++++++++++++++++++++

.. list-table:: Restrictions for the effect of intervention on birthweight
  :widths: 15 15 15
  :header-rows: 1

  * - Restriction
    - Value
    - Note
  * - Male only
    - False
    - 
  * - Female only
    - False
    - 
  * - Age group start
    - 164
    - Birth
  * - Age group end
    - 3
    - Post-neonatal
  * - Other
    - 
    - 

.. list-table:: Birthweight effect size
  :widths: 15 15 15 
  :header-rows: 1

  * - Population
    - Effect size
    - Note
  * - Infants
    - +50 grams
    - From BMGF optomistic target produt profile assumptions

The effect of antenatal IV iron on infant birthweight should be applied as an *additive shift* to a simulant's :ref:`low birthweight short gestation exposure value <2019_risk_exposure_lbwsg>` at birth.

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. todo::

  List assumptions and limitations

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- The mean birthweight stratified by intervention coverage (and additionally stratified by maternal anemia and BMI exposure that will confound the association, :ref:`as described here <2019_risk_correlation_maternal_bmi_hgb_birthweight>`) should replicate the expected effect size

Child Growth Failure
+++++++++++++++++++++++++++++++++++++++++++++++++++++

We will model the impact of the antenatal IV iron intervention on child growth failure mediated through birthweight in the exact same way as described in the child growth failure section of the :ref:`maternal supplementation intervention document <maternal_supplementation_intervention>` such that the :math:`S` shift in birthweight is equal to the total effect of all intervention coverage (or lack of baseline intervention coverage) on birthweight.

References
------------
