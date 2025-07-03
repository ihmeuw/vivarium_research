.. _intervention_iv_iron_antenatal_mncnh:

=====================================================
Antenatal Intravenous Iron - MNCNH Portfolio Model
=====================================================

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

The antenatal IV iron intervention is intended to treat moderate and severe iron-deficiency anemia in pregnancy. It is administered those in their 2nd or 3rd trimester of pregnancy who have a hemoglobin level less than 100 grams per liter and low ferritin levels.

Baseline Coverage Data
++++++++++++++++++++++++

.. todo::

  Update baseline coverage data 

Vivarium Modeling Strategy
--------------------------

The IV iron intervention is included in the :ref:`hemoglobin module <2024_vivarium_mncnh_portfolio_hemoglobin_module>` of in the pregnancy component of the :ref:`MNCNH porfolio simulation <2024_concept_model_vivarium_mncnh_portfolio>`.

We will model the following eligibility for the antenatal IV iron intervention:

#. Attends later prenancy ANC visit (according to the :ref:`antenatal care attendance module <2024_vivarium_mncnh_portfolio_anc_module>`)
#. Test hemoglobin exposure of less than 100 grams per liter (according to the :ref:`anemia screening intervention <anemia_screening>` result tracked in the :ref:`hemoglobin module <2024_vivarium_mncnh_portfolio_hemoglobin_module>`)
#. Tests low ferritin exposure (according to the :ref:`anemia screening intervention <anemia_screening>` result tracked in the :ref:`hemoglobin module <2024_vivarium_mncnh_portfolio_hemoglobin_module>`)

The IV iron intervention has a direct effect on hemoglobin exposure in pregnancy and indirect effects 100% mediated through hemoglobin on birthweight, gestational age, and stillbirth. The relationship between hemoglobin and birthweight, gestational age, and stillbirth is summarized on the :ref:`hemoglobin risk effects document <>`. This page contains information on the effects specific to IV iron as mediated through hemoglobin.

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
    - Direct effect
  * - Birthweight
    - Shifts population mean (magnitude of effect is dependent on pre-IV iron hemoglobin exposure)
    - Not yet
    - 100% mediated through hemoglobin
  * - Gestational age at birth
    - Shifts population mean (magnitude of effect is dependent on pre-IV iron hemoglobin exposure)
    - Not yet
    - 100% mediated through hemoglobin
  * - Pregnancy outcome
    - Affected probability of stillbirth (magnitude of effect is dependent on pre-IV iron hemoglobin exposure)
    - Yes
    - 100% mediated through hemoglobin

Hemoglobin level among pregnant and lactating women
+++++++++++++++++++++++++++++++++++++++++++++++++++++

.. todo::

  Update IV iron effect size to be consistent with new data from Chris T.
  Also, assume no individual level heterogeneity despite having some data on this. (We chose not to model this in order to simplify the data prep for this model)

.. list-table:: Maternal hemoglobin effect size
  :header-rows: 1

  * - Population
    - Effect size
    - Parameter uncertainty
    - Stochastic uncertainty
    - Note
  * - Pregnant simulants who attend later pregnancy ANC with test hemoglobin levels less than 100 g/L and test low ferritin levels
    - 
    - 
    - 
    - 

Assumptions and limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- We assume the effect of the intervention persists through the end of the period for which we track hemoglobin status
- We do not consider effect modification by baseline hemoglobin status. In reality, the effect of IV iron may be greater among women with lower baseline hemoglobin levels.

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Intervention coverage among the eligible population should verify to the scenario-specific level
- Intervention coverage should be zero among the non-eligible populations
- Hemoglobin level stratified by intervention coverage should reflect the intervention effect size

.. todo::

  Include subsections for effects on stillbirth, gestational age, and birth weight

References
------------
