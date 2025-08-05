.. _intervention_iv_iron_antenatal_mncnh:

=====================================================
Antenatal Intravenous Iron - MNCNH Portfolio Model
=====================================================

.. contents::
   :local:
   :depth: 2

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - IV
    - Intravenous
    - 
  * - LBWSG
    - Low birth weight and short gestation
    - Name of the GBD risk factor
  * - GA
    - Gestational age
    - Refers to gestational age at birth in this document
  * - BW
    - Birth weight
    - 
  * - PTB
    - Preterm birth
    - Refers to gestational age at birth < 37 weeks in this document
  * - LBW
    - Low birth weight
    - Refers to birth weight < 2500 grams in this document

Intervention Overview
-----------------------

The antenatal IV iron intervention is intended to treat moderate and severe iron-deficiency anemia in pregnancy. It is administered to those in their 2nd or 3rd trimester of pregnancy who have a hemoglobin level less than 100 grams per liter and low ferritin levels.

Baseline Coverage Data
++++++++++++++++++++++++

IV iron treatment for iron-definiciency anemia pregnancy remains a relatively new intervention, and as such, coverage remains relatively low in low- and middle-income countries, such as Nigeria (see [Akinajo-et-al-2024]_). 
As such, we will assume a baseline coverage of 0% for all locations for the IV iron intervention. 

Vivarium Modeling Strategy
--------------------------

The IV iron intervention is included in the :ref:`hemoglobin module <2024_vivarium_mncnh_portfolio_hemoglobin_module>` of in the pregnancy component of the :ref:`MNCNH porfolio simulation <2024_concept_model_vivarium_mncnh_portfolio>`.

We will model the following eligibility for the antenatal IV iron intervention:

#. Attends later prenancy ANC visit (according to the :ref:`antenatal care attendance module <2024_vivarium_mncnh_portfolio_anc_module>`)
#. Low hemoglobin exposure according to the :ref:`anemia screening test result <anemia_screening>` tracked in the :ref:`hemoglobin module <2024_vivarium_mncnh_portfolio_hemoglobin_module>`
#. Low ferritin exposure according to the :ref:`anemia screening test result <anemia_screening>` tracked in the :ref:`hemoglobin module <2024_vivarium_mncnh_portfolio_hemoglobin_module>`

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
    - Yes
    - 100% mediated through hemoglobin
  * - Gestational age at birth
    - Shifts population mean (magnitude of effect is dependent on pre-IV iron hemoglobin exposure)
    - Yes
    - 100% mediated through hemoglobin
  * - Pregnancy outcome
    - Affected probability of stillbirth (magnitude of effect is dependent on pre-IV iron hemoglobin exposure)
    - Yes
    - 100% mediated through hemoglobin

Hemoglobin exposure
+++++++++++++++++++++

.. todo::

  - Decide how we want to model uncertainty in the effect size of IV iron on hemoglobin concentrations.
  - Decide which REVAMP study we should use for Nigeria and Ethiopia - one study looks at second trimester and one looks at third trimester IV iron administration (the latter [Pasricha-et-al-2025]_ reported a smaller effect size of 17.5g/dL). Currently we are using the second trimester study.
  - [Pasricha-et-al-2023]_ reports ferritin as an outcome of their RCT, but ferritin was not included as an eligibility criterium for receiving IV iron.
    This contradicts our assumption that IV iron is only administered to those with low ferritin levels and we need to decide how we want to handle this discrepancy.
  - Assume no individual level heterogeneity despite having some data on this. (We chose not to model this in order to simplify the data prep for this model)

.. list-table:: Maternal hemoglobin effect size
  :header-rows: 1

  * - Population
    - Location
    - Effect size
    - Parameter uncertainty
    - Stochastic uncertainty
    - Note
  * - Pregnant simulants who attend later pregnancy ANC with test hemoglobin levels less than 100 g/L and test low ferritin levels
    - Nigeria and Ethiopia
    - +20.2 g/L
    - 
    - 
    - From the REVAMP study (second trimester) [Pasricha-et-al-2023]_
  * - Pregnant simulants who attend later pregnancy ANC with test hemoglobin levels less than 100 g/L and test low ferritin levels
    - Pakistan
    - +26.3 g/L
    - 
    - 
    - From the RAPID study [Derman-et-al-2025]_. Unlike the REVAMP study, this study did include ferritin levels (serum ferritin <30 ng/mL) as an eligibility criterium for receiving IV iron, which is consistent with our assumption that IV iron is only administered to those with low ferritin levels.


Assumptions and limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- We assume the effect of the intervention persists through the end of the period for which we track hemoglobin status
- We do not consider effect modification by baseline hemoglobin status. In reality, the effect of IV iron may be greater among women with lower baseline hemoglobin levels.
- We assume that the effect size of IV iron on hemoglobin concentrations as reported in the REVAMP study (which took place in Malawi) is representative of the effect size in Nigeria and Ethiopia, and that the value reported by the RAPID study (which took place in India) is representative of the effect size in Pakistan.

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Intervention coverage among the eligible population should verify to the scenario-specific level
- Intervention coverage should be zero among the non-eligible populations
- Hemoglobin level stratified by intervention coverage should reflect the intervention effect size

Birth weight and gestational age
++++++++++++++++++++++++++++++++++++

Modeling strategy overview
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We will model the effect of IV iron on both gestational age at birth (GA) and birth weight (BW) exposures (see the :ref:`low birth weight and short gestation risk exposure document <2019_risk_exposure_lbwsg>`) in the :ref:`MNCNH portfolio model <2024_concept_model_vivarium_mncnh_portfolio>`. These effects are 100% mediated through IV iron's effect on `Hemoglobin exposure`_ and :ref:`hemoglobin's effect on preterm birth (PTB) and low birth weight (LBW) <2023_hemoglobin_effects>`. Estimates for the effect of hemoglobin on LBWSG exposure as provided by the IHME hemoglobin team are measured in terms of dichotomous exposures of preterm birth (<37 weeks gestational age at birth) and low birth weight (<2500 grams birth weight) and are continuous risk curves from burden of proof models. Therefore, we must modify these estimates in two key ways to be compatible for use in this model: (1) convert the effects on dichotomous measures of preterm birth and low birth weight to effects on continuous measures of gestational age and birth weight, and (2) transform the effects to be specific to the effect IV iron as 100% mediated by hemoglobin.

Effect size derivation
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. todo::

  Revisit this section once we discuss how we want to assign this task between research and engineering and inside versus outside of the simulation model repository.

A derivation of IV iron's effect on gestational age and birth weight exposures as 100% mediated through hemoglobin is `performed for a single sex/location/draw pair in this notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/data_prep/hemoglobin_mediation.ipynb>`_. The calculation for a single sex/location/draw pair for both outcomes took about 2.5 minutes, so about 75 hours of computation time is expected to derive these values for the entire MNCNH portfolio simulation across 3 locations, 2 sexes, and 250 draws. The code to produce these estimates should be included in the MNCNH portfolio simulation repository for transparency. 

The specific details of the code to derive the effects is found in the linked notebook. The general steps of the derivation are summarized here:

1. Load the burden of proof estimates and convert the beta coefficients to relative risks by exponentiating.
2. Transform the relative risk values to be relative to the hemgolobin TMREL value of 120 g/L by dividing all relative risk values by the exposure level closest to 120 g/L.
3. In a manner similar to the `GBD custom calculation for the PAF of a risk on the outcome as mediated through LBWSG <https://scicomp-docs.ihme.washington.edu/ihme_cc_paf_calculator/current/custom_pafs.html#mortality-paf-calculation-for-subcauses-of-the-aggregate-lbwsga-outcome>`_: for each hemoglobin exposure level, X, use optimization to solve for the shift in continuous GA or BW exposure between X and the hemoglobin TMREL that results in the observed relative risk of dichotomous PTB or LBW between X and the hemoglobin TMREL. This step is performed under the following assumptions:

  - The population at the hemoglobin TMREL exposure has the same LBWSG exposure distribution as the population-level GBD LBWSG exposure distribution
  - There are no differences in the shape of the LBWSG exposure distribution across hemoglobin exposure levels

4. Using the resulting GA and BW shift values for each hemoglobin exposure level relative to the hemoglobin TMREL from step #3, calculate the difference in shift values specific to each hemoglobin exposure level X and X + the effect size of IV iron on `Hemoglobin exposure`_ to calculate the effect of IV iron on GA and BW exposures specifc to the pre-IV iron hemoglobin exposure level X.

Effect size application
~~~~~~~~~~~~~~~~~~~~~~~~

For simulants who receive the IV iron intervention, the IV iron effect sizes for gestational age and birth weight specific to the simulant's "true" hemoglobin exposure at the time of anemia screening should be applied additively to the simulant's child's gestational age at birth and birth weight continuous exposures as initially sampled from the :ref:`GBD LBWSG exposure distribution <2019_risk_exposure_lbwsg>`.

Verification and validation criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- The LBWSG exposure distribution should continue to meet V&V criteria in the baseline scenario
- In the interactive sim: the BW and GA exposures between the same individuals in a scenario with IV iron coverage and a scenario without should verify to the IV iron effect sizes on BW and GA specific to that individual's pre-IV iron hemoglobin exposure

Assumptions and limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- We do not utilize the effect estimates of hemoglobin on additional severities of dichotomous low birth weight and preterm birth outcomes (like "very low birth weight") despite the existence of such estimates
- We do not consider any correlation between hemoglobin and LBWSG exposures in the derivation of the estimates of IV iron's impact on LBWSG
- We assume that the GA and BW "shifts" attributable to hemoglobin apply equally to the entire LBWSG exposure distribution (in other words, assume no change in the shape of the LBWSG exposure distribution).

Stillbirth
+++++++++++++++++++++++++

Modeling strategy overview
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We will model an effect of IV iron on stillbirth (a birth outcome defined on the :ref:`MNCNH pregnancy model document <other_models_pregnancy_closed_cohort_mncnh>`) in the :ref:`MNCNH portfolio model <2024_concept_model_vivarium_mncnh_portfolio>` that is 100% mediated through IV iron's effect on `Hemoglobin exposure`_ and :ref:`hemoglobin's effect on stillbirth <2023_hemoglobin_effects>`. Because the effect of hemoglobin on stillbirth (as informed through the burden of proof continuous risk curves) is modified by hemoglobin exposure, the effect of IV iron on stillbirth will by modified by hemoglobin exposure at the time of IV iron administration.

Relative risk derivation
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. todo::

  Revisit this section once we discuss where these derivations should be performed and by whom

Note that the derivation of the IV iron relative risks are dependent on the effect size of IV iron on hemoglobin, as defined in the `Hemoglobin exposure`_ section. The derivation of these RRs as described below should be done in the model repository so that the values can easily be updated if the effect size of IV iron on hemoglobin were to ever change.

The following steps detail how to obtain the IV iron-specific relative risks on stillbirth specific to a given hemoglobin exposure value.

1. Load and transform the relative risk data from :code:`/mnt/team/anemia/pub/bop/sim_studies/stillbirth/inner_draws.csv`

.. code:: python

  import pandas as pd, numpy as np
  df = pd.read_csv('/mnt/team/anemia/pub/bop/sim_studies/stillbirth/inner_draws.csv')
  df = np.exp(df.set_index('risk')).reset_index()


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

.. [Akinajo-et-al-2024]

  Akinajo, O.R., Babah, O.A., Banke-Thomas, A. et al. Acceptability of IV iron treatment for iron deficiency anaemia in pregnancy in Nigeria: a qualitative study with pregnant women, domestic decision-makers, and health care providers. Reprod Health 21, 22 (2024). https://doi.org/10.1186/s12978-024-01743-y

.. [Derman-et-al-2025]

  Derman RJ, Bellad MB, Somannavar MS, Bhandari S, Mehta S, Mehta S, Sharma DK, Yogeshkumar S, Charantimath U, Patil AP, Mallapur AA, Ramadurg U, Sangavi R, Patil PS, Roy S, Vastrad P, Shekhar C, Leiby BE, Hartman RL, Georgieff M, Mennemeyer S, Aghai Z, Thind S, Boelig RC; RAPIDIRON Trial Group (Appendix). Single-dose intravenous iron vs oral iron for treatment of maternal iron deficiency anemia: a randomized clinical trial. Am J Obstet Gynecol. 2025 Aug;233(2):120.e1-120.e18. doi: 10.1016/j.ajog.2025.01.037. Epub 2025 Feb 3. PMID: 39909327.

.. [Pasricha-et-al-2023]

  Pasricha, S.R., Mwangi, M.N., Moya, E., Ataide, R., Mzembe, G., Harding, R., et al. (2023). Ferric carboxymaltose versus standard-of-care oral iron to treat second-trimester anaemia in Malawian pregnant women: a randomised controlled trial. The Lancet 401, 10388, P1595-1609 (2023). https://doi.org/10.1016/S0140-6736(23)00278-7 

.. [Pasricha-et-al-2025]

  Pasricha, SR., Moya, E., Ataíde, R. et al. Ferric carboxymaltose for anemia in late pregnancy: a randomized controlled trial. Nat Med 31, 197–206 (2025). https://doi.org/10.1038/s41591-024-03385-w