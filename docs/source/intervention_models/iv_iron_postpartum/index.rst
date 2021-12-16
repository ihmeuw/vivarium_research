.. _intervention_iv_iron_postpartum:

==============================
Postpartum Intravenous Iron
==============================

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - 
    - 
    - 

Intervention Overview
-----------------------

The postpartum IV iron intervention is intended to be administered to women with a hemoglobin level less than 100 grams per liter immediately following birth. Birthing women will be screened for low hemoglobin level immediately following birth if they delivered in a facility setting and/or if a skilled birth attendant was present for the birth.

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

Baseline Coverage Data
++++++++++++++++++++++++

Assume no baseline coverage in low and middle income countries.

Vivarium Modeling Strategy
--------------------------

We will model the following eligibility for the postpartum IV iron intervention:

#. Pregnant women at birth (i.e. the transition from the pregnant to postpartum states) according to the :ref:`pregnancy model document <other_models_pregnancy>`
#. Hemoglobin level of less than 100 grams per liter according to the :ref:`hemoglobin model document <2019_hemoglobin_model>` *after* the application of the pregnancy adjustment factor and any other factors that affect hemoglobin level such as pre-birth intervention coverage or maternal hemorrhage shift.

.. note::

  Women who receive IV iron should continue to be covered by the :ref:`maternal supplementation intervention <maternal_supplementation_intervention>` 

  Coverage by :ref:`antenatal IV iron <intervention_iv_iron_postpartum>` is not an exclusion criteria for coverage by postpartum IV iron

  A potential future eligibility criterion for this intervention may be in-facility delivery and/or skilled birth attendance if we include them as modeled parameters

We assume that IV iron intervention coverage takes place immediately following birth (i.e. upon transition into the postpartum state). Importantly, the intervention eligibility should be assessed following any birth-related changes to hemoglobin levels such as those related to maternal hemorrhage incidence.

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
    - +10 g/L
    - 

Hemoglobin level among pregnant and lactating women
+++++++++++++++++++++++++++++++++++++++++++++++++++++

.. list-table:: Maternal hemoglobin effect size
  :widths: 15 15 15 
  :header-rows: 1

  * - Population
    - Effect size
    - Note
  * - Immediately post-birth women with hemoglobin levels less than 100 g/L
    - +10 g/L 
    - Effect is present two weeks after birth through the end of the postpartum period. Effect size is from the BMGF optomistic target product profile 

The effect of the IV iron intervention on maternal hemoglobin should be applied as an additive shift to the simulant's continuous hemoglobin exposure *two weeks following birth birth*. The effect of the intervention should be removed (subtracted from the hemoglobin exposure level) at the end of the postpartum period prior to the removal of the pregnancy adjustment factor.

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- We assume the effect of the intervntion persists through the end of the postpartum period at which point the woman's hemoglobin concentration returns to its pre-pregnancy level. In reality, it may persist beyond the end of the postpartum period, in which case we may underestimate the intervention impact.

- We do not consider effect modification by baseline hemoglobin status. In reality, the effect of IV iron may be greater among women with lower baseline hemoglobin levels.

- We do not consider alternative intervention to IV iron such as blood transfusions, which may be preferable in the case of low post-birth hemoglobin level due to maternal hemorrhage.

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Intervention coverage among the eligible population should verify to the scenario-specific level
- Intervention coverage should be zero among the non-eligible populations
- Hemoglobin level stratified by intervention coverage should reflect the intervention effect size

References
------------