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

.. note::

  As there is no modeled baseline coverage of this intervention in our simulation, we have written the modeling strategy without instructions for baseline calibration (via a PAF or otherwise). If we are to eventually update the baseline coverage of this intervention to be non-zero, we will need to update the modeling strategy below accordingly to include a strategy for baseline calibration.

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
    - +20.2 mg/L
    - Assumed normal distribution with 95% CI: [18.9, 21.5] mg/L
    - Assumed to be zero for simplicity
    - From the REVAMP study (second trimester) [Pasricha-et-al-2023]_
  * - Pregnant simulants who attend later pregnancy ANC with test hemoglobin levels less than 100 g/L and test low ferritin levels
    - Pakistan
    - +26.3 mg/L
    - Assumed normal distribution with 95% CI: [25.7, 26.9] mg/L
    - Assumed to be zero for simplicity
    - From the RAPID study [Derman-et-al-2025]_ 

.. note::

  Unlike the REVAMP study, the RAPID study did include ferritin levels (serum ferritin <30 ng/mL) as an eligibility criterion for receiving IV iron, but it is still not consistent with our assumption that IV iron is only administered to those with low ferritin levels, because low ferritin OR low hemoglobin was used to determine if a pregnant person was eligible for the intervention.
  The RAPID study therefore still has the same limitation regarding pre-intervention ferritin status (see Assumptions and limitations section below)

.. note::

  We calculated the 95% confidence intervals for the effect size of IV iron on hemoglobin concentrations using the following method: 
  
    1. SE = SD / sqrt(n)
    2. LCL = mean – 1.96 * SE
    3. UCL = mean + 1.96 * SE

  For the REVAMP trial, SD = 14.1 and n=430, and for the RAPID trial, SD = 12.0 and n=1462.

Assumptions and limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- We assume the effect of the intervention persists through the end of the period for which we track hemoglobin status
- We do not consider effect modification by baseline hemoglobin status. In reality, the effect of IV iron may be greater among women with lower baseline hemoglobin levels.
- We assume that the effect size of IV iron on hemoglobin concentrations as reported in the REVAMP study (which took place in Malawi) is representative of the effect size in Nigeria and Ethiopia, and that the value reported by the RAPID study (which took place in India) is representative of the effect size in Pakistan.
- We assume that the effect of IV iron among those with low ferritin levels (those eligible in our simulation) is the same as the effect of IV iron among people not screened for ferritin (the study population for both the RAPID and REVAMP studies). 
  In reality, we'd expect that people with low ferritin would benefit more, so we may underestimate the impact of the intervention.
- We assume that the change in hemoglobin concentrations from baseline to endline in the RAPID and REVAMP studies is more appropriate to use for our simulation than the comparison between the IV iron arm and the standard-of-care arm.
  This is because our standard of care (IFA) model in our simulation does not appropriately include the effect modification of IFA for the population eligible for IV iron (our model underestimates the effect of IFA among this population). 
  Therefore, if we used the difference between the arms we would be underestimating the total effect of IV iron among this population unless we updated our model of IFA. 
  So we use the difference between endline and baseline to more closely model the total effect of IV iron on hemoglobin. 
  The resulting limitation from this approach is that we will attribute some of the impact that actually comes from the standard-of-care intervention (IFA) to the IV iron intervention in our model, resulting in an overestimation of the impact of IV iron and an underestimation of the impact of MMS. 
- We do not consider effect modification by timing of IV iron administration, and thereby assume that pregnant people that receive IV iron in the second trimester of their pregnancy have the same effect size as those who receive it in the third trimester (despite [Pasricha-et-al-2025]_ reporting a lower effect size for the latter group).
  As such, we are likely overestimating the effect of IV iron for those who don't receive it until their third trimester. 
  Because we are not currently modeling (a) the timing of "later pregnancy" ANC visits or (b) the hemoglobin trajectory throughout pregnancy in enough detail to figure out exactly when the IV iron is administered to a simulant, we assume that we will get to them early (i.e., administer IV iron during second trimester) with the new minimally invasive screening protocol being scaled up in this simulation.
    
    * We have a `JIRA ticket to address this limitation <https://jira.ihme.washington.edu/browse/SSCI-2377>`_ if we choose to do so.
- We assume that there is no individual-level heterogeneity in the effect of IV iron on hemoglobin concentrations, despite having some data that could inform this. 
  We chose not to include stochastic uncertainty in order to simplify the data prep needed for this intervention model.

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

  Perform GBD 2023 update for effect size calculations (dependent on GBD 2023 LBWSG exposure and draw availability strategy will change)

The code to derive of IV iron's effect on gestational age and birth weight exposures as 100% mediated through hemoglobin is `hosted here <https://github.com/ihmeuw/vivarium_gates_mncnh/blob/main/src/vivarium_gates_mncnh/data/hemoglobin_effects/hgb_birth_effect_generation.py>`_ and a `notebook that steps through these functions can be found here <https://github.com/ihmeuw/vivarium_gates_mncnh/blob/main/src/vivarium_gates_mncnh/data/hemoglobin_effects/function_tester.ipynb>`_. 

The general steps of the derivation are summarized here:

1. Load the burden of proof estimates and convert the beta coefficients to relative risks by exponentiating. Duplicate the 250 draws available from the BoP model so that we have 500 working draws such that draw 0 has the same values as 250, etc.
2. Interpolate the RR values as a function of exposure and store the function with exposure values that are the same as those used in the :ref:`GBD hemoglobin risk effects model for maternal disorders <2023_hemoglobin_effects>`. Note that if we have to extrapolate beyond the bounds of the burden of proof exposure values, we assume "piecewise constant extrapolation" where the RRs for the exposure values beyond the bounds are equal to the RR value for the nearest exposure boundary value.
3. Transform the relative risk values to be relative to the hemgolobin TMREL value of 120 g/L by dividing all relative risk values by the exposure level closest to 120 g/L.
4. In a manner similar to the `GBD custom calculation for the PAF of a risk on the outcome as mediated through LBWSG <https://scicomp-docs.ihme.washington.edu/ihme_cc_paf_calculator/current/custom_pafs.html#mortality-paf-calculation-for-subcauses-of-the-aggregate-lbwsga-outcome>`_: for each hemoglobin exposure level, X, use optimization to solve for the shift in continuous GA or BW exposure between X and the hemoglobin TMREL that results in the observed relative risk of dichotomous PTB or LBW between X and the hemoglobin TMREL. This step is performed under the following assumptions:

  - The population at the hemoglobin TMREL exposure has the same LBWSG exposure distribution as the population-level GBD LBWSG exposure distribution
  - There are no differences in the shape of the LBWSG exposure distribution across hemoglobin exposure levels

5. Using the resulting GA and BW shift values for each hemoglobin exposure level relative to the hemoglobin TMREL from step #3, calculate the difference in shift values specific to each hemoglobin exposure level X and X + the effect size of IV iron on `Hemoglobin exposure`_ to calculate the effect of IV iron on GA and BW exposures specifc to the pre-IV iron hemoglobin exposure level X.

Effect size application
~~~~~~~~~~~~~~~~~~~~~~~~

For simulants who receive the IV iron intervention, the IV iron effect sizes for gestational age and birth weight specific to the simulant's "true" hemoglobin exposure at the time of anemia screening should be applied additively to the simulant's child's gestational age at birth and birth weight continuous exposures as initially sampled from the :ref:`GBD LBWSG exposure distribution <2019_risk_exposure_lbwsg>`.

`Effects can be found in .csv files here <https://github.com/ihmeuw/vivarium_gates_mncnh/tree/main/src/vivarium_gates_mncnh/data/hemoglobin_effects/iv_iron_lbwsg_shifts>`_. Each csv file contains data specific to a given draw and each file is stratified by outcome (gestational age, birth weight), location, sex, and hemoglobin "exposure" in grams per liter.

Data was only generated for the specific draws used in the MNCNH portfolio simulation. In generating the artifact, values for draws not used in the MNCNH portfolio simulation should ideally be filled with missing values or some illogical number like infinity so that we will notice an error if we attempt to run for a draw that does not contain valid data.

Verification and validation criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- The LBWSG exposure distribution should continue to meet V&V criteria in the baseline scenario
- In the interactive sim: the BW and GA exposures between the same individuals in a scenario with IV iron coverage and a scenario without should verify to the IV iron effect sizes on BW and GA specific to that individual's pre-IV iron hemoglobin exposure

Assumptions and limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- We do not utilize the effect estimates of hemoglobin on additional severities of dichotomous low birth weight and preterm birth outcomes (like "very low birth weight") despite the existence of such estimates
- We do not consider any correlation between hemoglobin and LBWSG exposures in the derivation of the estimates of IV iron's impact on LBWSG
- We assume that the GA and BW "shifts" attributable to hemoglobin apply equally to the entire LBWSG exposure distribution (in other words, assume no change in the shape of the LBWSG exposure distribution)

Stillbirth
+++++++++++++++++++++++++

Modeling strategy overview
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We will model an effect of IV iron on stillbirth (a birth outcome defined on the :ref:`MNCNH pregnancy model document <other_models_pregnancy_closed_cohort_mncnh>`) in the :ref:`MNCNH portfolio model <2024_concept_model_vivarium_mncnh_portfolio>` that is 100% mediated through IV iron's effect on `Hemoglobin exposure`_ and :ref:`hemoglobin's effect on stillbirth <2023_hemoglobin_effects>`. Because the effect of hemoglobin on stillbirth (as informed through the burden of proof continuous risk curves) is modified by hemoglobin exposure, the effect of IV iron on stillbirth will by modified by hemoglobin exposure at the time of IV iron administration.

Relative risk derivation
~~~~~~~~~~~~~~~~~~~~~~~~~~

Similar to the derivation of the effect of IV iron on birth weight and gestational age, the code to derive of IV iron's effect on stillbirth as 100% mediated through hemoglobin is `hosted here <https://github.com/ihmeuw/vivarium_gates_mncnh/blob/main/src/vivarium_gates_mncnh/data/hemoglobin_effects/hgb_birth_effect_generation.py>`_ and a `notebook that steps through these functions can be found here <https://github.com/ihmeuw/vivarium_gates_mncnh/blob/main/src/vivarium_gates_mncnh/data/hemoglobin_effects/function_tester.ipynb>`_. 

The general steps of this derivation are summarized below:

1. Follow steps #1 and #2 listed in the "Effect size derivation" section for the `Birth weight and gestational age`_ outcomes

2. Similar to step #5 in the "Effect size derivation" section for the `Birth weight and gestational age`_ outcomes, calculate the risk of stillbirth for each hemoglobin exposure level X + the effect size of IV iron on `Hemoglobin exposure`_ relative to that unadjusted hemoglobin exposure level X. This value represents the relative risk of stillbirth following IV iron administration specific to the pre-IV iron hemoglobin exposure level X.

Effect application
~~~~~~~~~~~~~~~~~~~

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

`Effects can be found in .csv file here <https://github.com/ihmeuw/vivarium_gates_mncnh/blob/main/src/vivarium_gates_mncnh/data/hemoglobin_effects/iv_iron_stillbirth_rrs.csv>`_. This csv file contains values for 250 draws stratified by location and hemoglobin "exposure" in grams per liter. To obtain values for the 500 draws to be added to the MNCNH simulation artifact, duplicate the values twice such that draw 0 has the same values as draw 250, etc.

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