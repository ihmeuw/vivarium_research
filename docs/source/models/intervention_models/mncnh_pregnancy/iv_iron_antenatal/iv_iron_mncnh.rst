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

The IV iron intervention has a direct effect on hemoglobin exposure in pregnancy and indirect effects 100% mediated through hemoglobin on birthweight, gestational age, and stillbirth. The relationship between hemoglobin and birthweight, gestational age, and stillbirth is summarized on the :ref:`hemoglobin risk effects document <2023_hemoglobin_effects>`. This page contains information on the effects specific to IV iron as mediated through hemoglobin.

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

Hemoglobin exposure
+++++++++++++++++++++

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

Stillbirth
+++++++++++++++++++++++++

Modeling strategy overview
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We will model an effect of IV iron on stillbirth (a birth outcome defined on the :ref:`MNCNH pregnancy model document <other_models_pregnancy_closed_cohort_mncnh>`) in the :ref:`MNCNH portfolio model <2024_concept_model_vivarium_mncnh_portfolio>` that is 100% mediated through IV iron's effect on `Hemoglobin exposure`_ and :ref:`hemoglobin's effect on stillbirth <2023_hemoglobin_effects>`. Because the effect of hemoglobin on stillbirth (as informed through the burden of proof continuous risk curves) is modified by hemoglobin exposure, the effect of IV iron on stillbirth will by modified by hemoglobin exposure at the time of IV iron administration.

Relative risk derivation
~~~~~~~~~~~~~~~~~~~~~~~~~~

Note that the derivation of the IV iron relative risks are dependent on the effect size of IV iron on hemoglobin, as defined in the `Hemoglobin exposure`_ section. The derivation of these RRs as described below should be done in the model repository so that the values can easily be updated if the effect size of IV iron on hemoglobin were to ever change.

The following steps detail how to obtain the IV iron-specific relative risks on stillbirth specific to a given hemoglobin exposure value.

1. Load the relative risk data from :code:`/mnt/team/anemia/pub/bop/sim_studies/stillbirth/inner_draws.csv`

.. code:: python

  import pandas as pd
  df = pd.read_csv('/mnt/team/anemia/pub/bop/sim_studies/stillbirth/inner_draws.csv')


2. Calculate the hemoglobin exposure increment between each of the exposure levels stored in the :code:`risk` column of the .csv

.. code:: python

  exposure_levels = df.risk.unique()
  exposure_increment = exposure_levels[1] - exposure_levels[0]

3. Calculate the number of hemoglobin exposure levels stored in the :code:`risk` columns of the .csv that correspond to IV iron's effect on hemoglobin exposure (:code:`iv_iron_mean_difference`), found in the `Hemoglobin exposure`_ section of this document.

.. code:: python

    iv_iron_exposure_increment = (iv_iron_mean_difference / exposure_increment).round(0).astype(int)

4. For each draw, n, calculate the IV iron effect on stillbirth for a given exposure level, i, by dividing the stillbirth RR value specific to the IV iron-shifted hemoglobin exposure by still birth RR value specific to the un-shifted hemoglobin exposure value.

.. code:: python
    
    iv_iron_stillbirth_rrs = []
    for i in df.index:
        iv_iron_stillbirth_rrs.append(df.iloc[i + iv_iron_exposure_increment].draw_n. / df.iloc[i].draw_n)

.. note::

    Feel free to find a more efficient way to do this than looping over index values and draws!

5. Now you have stillbirth relative risk values for IV iron, specific to pre-IV iron hemoglobin exposure values.

PAF calculation
~~~~~~~~~~~~~~~~~

.. todo::

    Add details on PAF calculation if it is determined that we have non-zero baseline coverage

Effect application
~~~~~~~~~~~~~~~~~~~

.. todo::

  Incorporate PAF strategy if PAF is determined to be non-zero

The relative risk for this risk factor will apply to the probability of experiencing still birth such that for a given hemoglobin exposure, :math:`\text{x}`:

.. math::

  \text{stillbirth probability}_\text{no IV iron, x} = \text{stillbirth probability}_\text{overall} 

  \text{stillbirth probability}_\text{IV iron, x} = \text{stillbirth probability}_\text{overall} * RR_\text{IV iron, x}

And the probabilities of experiencing the remaining birth outcomes are as follows:

.. math:: 

  \text{other probability}_\text{no IV iron, x} = \text{other probability}_\text{overall}

  \text{other probability}_\text{IV iron, x} = \text{other probability}_\text{overall} 

  \text{live birth probability}_\text{no IV iron, x} =  \text{live birth probability}_\text{overall}

  \text{live birth probability}_\text{IV iron, x} = 1 - \text{stillbirth probability}_\text{IV iron, x} - \text{other probability}_\text{overall}

Where, :math:`\text{stillbirth probability}_{overall}`, :math:`\text{live birth probability}_{overall}`, and :math:`\text{other probability}_{overall}` are defined on the :ref:`MNCNH pregnancy model document <other_models_pregnancy_closed_cohort_mncnh>` and :math:`RR_\text{IV iron, x}` is the IV iron relative risk of stillbirth for a given hemoglobin exposure :math:`\text{x}`.

Verification and validation criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- The rate of each birth outcome should continue to validate to input data in the baseline scenario
- Still birth rates should be lower, live birth rates should be higher, and partial term pregnancy rates should be unchanged in a scenario with IV iron coverage relative to a scenario without
- In the interactive simulation, rates of stillbirth binned by hemoglobin exposure should match expected shape of the relationship 

Assumptions and limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* We do not distinguish between intrapartum and earlier stillbirths in this intervention effect model

.. todo::

  Determine if/how we need to update this model to make it compatible with intrapartum vs. other stillbirths

References
------------
