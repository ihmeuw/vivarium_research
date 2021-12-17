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

  A potential future eligibility criterion for this intervention may be antenatal care visit attendance if we include it as a modeled parameter
  
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
    - +10 g/L
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
  :widths: 15 15 15 
  :header-rows: 1

  * - Population
    - Effect size
    - Note
  * - Pregnant women with hemoglobin levels less than 100 g/L
    - +10 g/L 
    - Effect is present two weeks after start of pregnancy through the end of the postpartum period. Effect size is from the BMGF optomistic target product profile relative to oral iron supplementation

The effect of the IV iron intervention on maternal hemoglobin should be applied as an additive shift to the simulant's continuous hemoglobin exposure value two weeks after the start of pregnancy after the application of the pregnancy adjustment factor. The effect of the intervention should be removed (subtracted from the hemoglobin exposure level) at the end of the postpartum period prior to the removal of the pregnancy adjustment factor.

.. note::

  The impact of antenatal IV iron should persist despite other changes to the maternal hemoglobin level due to the maternal supplementation intervention, maternal hemorrhage incidence, or postpartum IV iron.

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- To align with the optomistic target profile from the BMGF, we assume that IV iron is administered at the very start of pregnancy. This will overestimate the impact of the intervention given this is unrealistically early for most women.

.. todo::

  Consider updating this assumption

- We assume the effect of the intervntion persists through the end of the postpartum period at which point the woman's hemoglobin concentration returns to its pre-pregnancy level.

- We do not consider effect modification by baseline hemoglobin status. In reality, the effect of IV iron may be greater among women with lower baseline hemoglobin levels.

- We currently assume no measurement error in maternal hemoglobin level

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Intervention coverage among the eligible population should verify to the scenario-specific level
- Intervention coverage should be zero among the non-eligible populations
- Hemoglobin level stratified by intervention coverage should reflect the intervention effect size

Infant birthweight
+++++++++++++++++++++++++++++++++++++++++++++++++++++

.. todo::

  Link to existing document of the affected outcome (ex: cause or risk exposure model document)

.. todo::

  Describe exactly what measure the intervention will affect

.. todo::

  Fill out the tables below

.. list-table:: Birthweight restrictions
  :widths: 15 15 15
  :header-rows: 1

  * - Restriction
    - Value
    - Note
  * - Male only
    - 
    - 
  * - Female only
    - 
    - 
  * - Age group start
    - 
    - 
  * - Age group end
    - 
    - 
  * - Other
    - 
    - 

.. list-table:: Birthweight effect size
  :widths: 15 15 15 
  :header-rows: 1

  * - Population
    - Effect size
    - Note
  * - 
    - 
    - 
.. todo::

  Describe exactly *how* to apply the effect sizes to the affected measures documented above

.. todo::

  Note research considerations related to generalizability of the effect sizes listed above as well as the strength of the causal criteria, as discussed on the :ref:`general research consideration document <general_research>`.

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

References
------------
