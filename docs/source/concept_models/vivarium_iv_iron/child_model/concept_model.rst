.. role:: underline
    :class: underline

..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  +++++++++++++++++++++

  Section Level 2 (#.#)
  ---------------------

  Section Level 3 (#.#.#)
  ~~~~~~~~~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

.. _2019_concept_model_vivarium_iv_iron_child_sim:

=================================================
Vivarium Intravenous Iron - Children under five
=================================================

.. contents::
  :local:

.. list-table:: Abbreviations
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - IV
    - Intravenous
    - 
  * - IDA
    - Iron deficiency anemia
    - 
  * - WRA
    - Women of reproductive age
    - 
  * - PLW
    - Pregnant and lactating women
    - 
  * - IFA
    - Iron and folic acid
    - 
  * - MMS
    - Multiple micronutrient supplementation
    - 
  * - BEP
    - Balanced energy protein
    - 
  * - BMGF
    - Bill and Melinda Gates Foundation
    - 
  * - ANC
    - Antenatal care
    - 
  * - IFD
    - In-facility delivery
    - 
  * - LMICs
    - Low and middle income countries
    - 

1.0 Background
++++++++++++++

.. _ivironU52.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++

.. _ivironU53.0:

3.0 Concept model
+++++++++++++++++

3.2 Simulation timeframe and intervention start dates
------------------------------------------------------

**Throughout model development and verification/validation:**

.. list-table:: Developmental model child simulation timeframe and intervention dates
  :header-rows: 1

  * - Parameter
    - Value
  * - Date of simulation burn-in period start
    - N/A: no burn-in period
  * - Date of simulation observation period start
    - January 1, 2022 (only model births that occur on or after this date)
  * - Date of intervention scale-up start
    - N/A: defined for maternal simulation
  * - Date of simulation end
    - December 31, 2026 (run beyond end of maternal simulation so we can see impact of older children covered by intervention)
  * - Simulation time step
    - 4 days
  * - Intervention scale-up rate
    - N/A: defined for maternal simulation

**For final model results:**

.. list-table:: Final model child simulation timeframe and intervention dates
  :header-rows: 1

  * - Parameter
    - Value
  * - Date of simulation burn-in period start
    - N/A: defined for maternal simulation (5 year burn-in period if age end == 5)
  * - Date of simulation observation period start
    - January 1, 2025
  * - Date of intervention scale-up start
    - N/A: defined for maternal simulation
  * - Date of simulation end
    - December 31, 2040
  * - Simulation time step
    - 4 days
  * - Intervention scale-up rate
    - N/A: defined for maternal simulation

.. _ivironU54.0:

4.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _ivironU54.1:

4.1 Vivarium concept model diagram components
----------------------------------------------

4.1.1 Cause Models
~~~~~~~~~~~~~~~~~~

.. note::

  For this simulation, we want to implement custom age restrictions for the LRI cause model so that age start for the cause model is the postneonatal age group (age_group_id=4) and the age end is the 1-4 year age group (age_group_id=5). For the early and late neonatal age groups (age_group_id=[2,3]), LRI should be included as an unmodeled cause affected by the LBWSG risk factor.

* :ref:`Diarrheal diseases (GBD 2019) <2019_cause_diarrhea>`
* :ref:`Lower respiratory infections (GBD 2019) <2019_cause_lower_respiratory_infections>`
* :ref:`Measles (GBD 2019) <2019_cause_measles>`

4.1.2 Joint Cause-Risk Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Static child wasting risk exposure and protein energy malnutrition <2019_risk_exposure_static_wasting>`

4.1.3 Risk Exposure Models
~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Child Stunting <2020_risk_exposure_child_stunting>`: use GBD 2019 data, but follow modeling strategy on this 2020 risk exposure page

.. note::

  :ref:`Low Birthweight and Short Gestation (GBD 2019) <2019_risk_exposure_lbwsg>` risk exposure will be modeled as part of the :ref:`IV iron women of reproductive age simulation <2019_concept_model_vivarium_iv_iron_maternal_sim>` and subsequently assigned to simulants in the child simulation.

  :ref:`Suboptimal breastfeeding (GBD 2020) <2020_risk_suboptimal_breastfeeding>` will not be modeled for now


4.1.4 Risk Effects Models
~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Child Wasting Risk Effects <2019_risk_effect_wasting>` (NOTE: use the modeling strategy specific to LRI and measles on this document for all affected causes, including diarrheal diseases): use GBD 2019 data, but follow modeling strategy on this page
* Child stunting risk effects: use 2019 data
* :ref:`Low Birthweight and Short Gestation Risk Effects (GBD 2019) <2019_risk_effect_lbwsg>`

.. note::

  :ref:`Suboptimal breastfeeding <2020_risk_suboptimal_breastfeeding>` risk effects will not be modeled for now

4.1.5 Risk-Risk Correlation Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. todo::

  Update this section to reflect the documentation of the causal effect of BW and CGF as described on the maternal supplementation intervention document

* :ref:`Birthweight and child wasting risk-risk correlation <2019_risk_correlation_birthweight_wasting>`
* :ref:`Birthweight and child stunting risk-risk correlation <2019_risk_correlation_birthweight_stunting>`

.. note::

  *Causation* portion of these risk correlation models should be prioritized over the correlation portion.

4.1.7 Intervention Models
~~~~~~~~~~~~~~~~~~~~~~~~~

Intervention models modeled as part of the :ref:`IV iron women of reproductive age simulation <2019_concept_model_vivarium_iv_iron_maternal_sim>`

.. _ivironU54.2:

4.2 Demographics
----------------

4.2.1 Locations
~~~~~~~~~~~~~~~

Location aggregation
^^^^^^^^^^^^^^^^^^^^^^

Details on how to calculate weighted averages for specific simulation parameters are shown in the tables below.

.. list-table:: Weighted average calculation instructions
   :header-rows: 1

   * - Parameter
     - Parameter ID
     - Available location IDs
     - Weighting unit
     - Age-specific?
     - Sex-specific?
     - Note
   * - Categorical risk exposures
     - REI IDs 240 (wasting), 241 (stunting), 136 (non-exclusive breastfeeding), 137 (discontinued breastfeeding)
     - 159, 166 (get_draws not available for 44577 or 44578)
     - population
     - Yes
     - Yes
     - Weight each exposure category within a risk factor exposure distribution separately
   * - Relative risks
     - REI IDs 240 (wasting), 241 (stunting), 136 (non-exclusive breastfeeding), 137 (discontinued breastfeeding)
     - Not location-specific
     - N/A
     - Yes
     - Yes
     - 
   * - Risk factor PAFs
     - REI IDs 240 (wasting), 241 (stunting), 136 (non-exclusive breastfeeding), 137 (discontinued breastfeeding)
     - 159, 166, 44577, 44578
     - N/A
     - Yes
     - Yes
     -  
   * - Cause parameters
     - Cause IDs 302 (diarrheal diseases), 341 (measles), 322 (lower respiratory infections), 387 (protein energy malnutrition)
     - 159, 166, 44577, 44578
     - N/A
     - Yes
     - Yes
     - 

.. _ivironU54.2.1:

4.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table:: Simulation population parameters throughout model development
   :header-rows: 1

   * - Parameter
     - Value
     - Note
   * - Population size
     - 100,000
     - 
   * - Number of draws
     - 66
     - 
   * - Number of random seeds
     - 10
     - 
   * - Cohort type
     - Open
     - 
   * - Age start
     - 0
     - 
   * - Age end
     - 5 years
     - 
   * - Exit age
     - 5 years
     - 
   * - Sex restrictions
     - None
     - 

.. todo::

  Determine if it is necessary to have an initialized population of U5 year olds at the start of the simulation. Doing so will be helpful to maintain continuity in the way that we assign LBWSG exposure for simulants who are born into the sim and those who are initialized into the sim, but would require post-processing transformations to measure total DALYs among children under five in the beginning years of the simulation (although we would have an accurate measure of DALYs averted). Alternative strategies include a five year burn-in period (long) or discontinitous assignment of LBWSG among the initialized population (which would be harder for the software engineers, but especially with a month long burn-in period would seem to have a small impact on model results).

.. list-table:: Simulation population parameters for final model version
   :header-rows: 1

   * - Parameter
     - Value
     - Note
   * - Population size
     - Informed from maternal sim
     - 
   * - Number of draws
     - Informed from WRA simulation outputs
     - 
   * - Number of random seeds
     - Informed from WRA simulation outputs
     - 
   * - Cohort type
     - Open
     - Births into cohort are informed by births from maternal simulation output
   * - Age start
     - 0
     - 
   * - Age end
     - 5 years
     - 
   * - Exit age
     - 5 years
     - 
   * - Sex restrictions
     - None
     - 

.. _ivironU54.3:

4.3 Models
----------

.. list-table:: Model verification and validation tracking
   :widths: 3 10 20
   :header-rows: 1

   * - Model
     - Description
     - V&V summary
   * - 1.0.0
     - Cause models (infectious diseases)
     - `Simulation validation notebook can be found here <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_1/model_1.0.0_cause_data_validation.ipynb>`_. [1] underestimation of diarrheal diseases and lower respiratory infections remission rates. [2] underestimation of lower respiratory infections burden in neonatal age groups. [3] GBD 2019 age groups (does not include new GBD 2020 age groups). NOTE: still need to validate DALYs, YLLs, YLDs once environment issue is solved.
   * - 2.0.0
     - Wasting and stunting, without PEM and without stratification by wasting or stunting
     - `Overestimating excess mortality rates for all causes <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_2/model_2.0.0_cause_data_validation.ipynb>`_
   * - 2.0.1
     - Wasting and stunting, without PEM. Results stratified by stunting
     - [1] `Overstimation of excess mortality rates due to diarrheal diseases, LRI, and mealses <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_2/model_2.0.1_cause_data_validation.ipynb>`_. [2] `Stunting risk exposure looks good <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_2/stunting_validation_model_2.0.1.ipynb>`_. [3] `Stunting risk effects on incidence rates look good <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_2/stunting_validation_model_2.0.1.ipynb>`_. Need to verify that stunting is *not* affecting diarrheal diseases excess mortality (hard to tell given stocastic variation). **Can now remove stunting stratification of disease transitions and state person time**.
   * - 2.1.0
     - Wasting and stunting, with PEM. Results stratified by wasting
     - [1] Still have the `overstimation of mortality rates of our causes <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_2/model_2.1.0_cause_model_validation.ipynb>`_. [2] `Wasting risk exposure and PEM prevalence looks good <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_2/model_2.1.0_cause_model_validation.ipynb>`_. [3] `Wasting risk effects on incidence rates look good <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_2/wasting_validation_model_2.1.0.ipynb>`_. [4] No deaths due to PEM in deaths count data... also wasn't expecting outputs of PEM transition counts. **Keep stratification by wasting for now until we finish validating PEM deaths**
   * - 2.1.1
     - Experimental fixes to the excess mortality issue
     - [1] `Overestimation of EMR fixed! <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_2/model_2.1.1_cause_model_validation.ipynb>`_ For both locations. [2] PEM model looks good. **Can remove wasting stratification moving forward**
   * - 3.0.1
     - LBWSG implementation. Using PAFs for Ethiopia.
     - `Implementation of LBWSG risk effects on cause models in the neonatal age groups looks as expected given the reliance on Ethiopia PAFs <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_3/model_3.0.1_cause_model_validation.ipynb>`_. ACMR and diarrheal diseases CSMR look good for Ethiopia (save the diarrheal diseases CSMR in the ENN age group, as expected) and are closer to validation targets for Sub-Saharan Africa than for South Asia, which is expected given that the LBWSG PAF for Ethiopia is more similar to that for Sub-Saharan Africa than South Asia. Additionally, `the proportion under 2500 grams is slightly underestimated in our simulation relative to the artifact, but by an acceptable margin <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_3/model_3.0.1_lbwsg_exposure.ipynb>`_.
   * - 3.1.1
     - Update diarrheal diseases and LRI duration values and prevalence calculation in an effort to fix underestimation of CSMRs in the early neonatal age group (updated values will result in higher calculated EMR)
     - `Validation notebook for model 3.1.1 is available here <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_3/model_3.1.1_cause_model_validation.ipynb>`_. Note that the artifact values have been overwritten with an updated version of the artifact. We realized that while the duration and prevalence values were updated, the artifact EMR values were not updated, so there was not an associated change in CSMR.
   * - 3.1.2
     - Update EMR artifact values based on changes to duration and remission above and rerun.
     - `Validation notebook for model 3.1.2 is available here <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_3/model_3.1.2_cause_model_validation.ipynb>`_. Diarrheal diseases CSMR now looking as expected in the early neonatal age group - validating for Ethiopia (compatible PAF being used), and more off for South Asia than Sub-Saharan Africa (as expected due to more similar PAF of SSA to Ethiopia than SA to Ethiopia). However, for LRI, we realized we were using a high value for birth prevalence in the calculation of early neonatal prevalence when we actualy wanted to use zero, so we're still off there.
   * - 3.1.3
     - Fix LRI birth prevalence value and re-run
     - `Validation notebook for model 3.1.3 is available here <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_3/model_3.1.3_cause_model_validation.ipynb>`_. Underestimating LRI EMR in the early and late neonatal age group. Not exactly sure why... could it be stochastic variation? Abie has verified in the interactive simulation that the pipeline value matches the artifact and that the simulant-level values average out to the pipeline value when the correct LBWSG PAF value is used.
   * - 3.2.0 updated LBWSG PAFs
     - Calculated and used custom LBWSG PAFs for Sub-Saharan Africa and South Asia rather than rely on Ethiopia PAF values
     - `Validation notebook for model 3.2.0 is available here <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_3/model_3.2.0_cause_model_validation.ipynb>`_. Diarrheal diseases CSMR now validating for all locations rather than just Ethiopia (yay). Still seeing the underestimation of LRI EMR in the early and late neonatal age groups. Will try running sim with only early neonates to see if this is an issue of stocastic variation or something else.
   * - 3.2.1 ENN only
     - Reran simulation with early neonates only to test hypothesis that we were underestimating LRI EMR due to stochastic variation.
     - We are still underestimating LRI EMR to the same degree in this run. We think that the underestimation may instead be caused by the equation used to convert rates into probabilities on a given timestep, for which the values do not approximate each other well when the rate is high relative to the duration of the timestep. This problem is exacerbated by the implementation of the LBWSG risk factor, which makes the LRI EMR very high for simulants in high risk LBWSG categories, causing us to significantly underestimate the probability of death on a given timestep. We wil run a test run of the simulation with a timestep of 0.1 days rather than 0.5 days to investigate this hypothesis. 
   * - 3.2.1.1 ENN only, 0.1 day timestep
     - Re-ran simulation with early neonates only and 0.1 rather than 0.5 day timestep to test hypothesis that we were underestimating LRI EMR due to bad approximation between rates and probabilities when rates are very high relative to timestep duration (which is excacerbated by LBWSG risk effects).
     - LRI EMR was still significantly underestimated, although it increased from 50.1 to 54.6 for early neonatal males in South Asia.
   * - 4.0 Line list demography from maternal outputs
     - Simulation run from line list demography fertility component from maternal model 8.0 simulation outputs
     - [1] `LBWSG exposure data for South Asia from the maternal outputs was used for both SA and SSA in this run, so the exposure does not validate for SSA but looks good for SA, as expected <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_4/model_4.0_lbwsg_exposure.ipynb>`_ [2] `Probability of male at birth is slightly underestimated and does not significantly vary by location (appears to just be 50/50... follow-up with maternal sim request). <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_4/model_4.0_population_structure.ipynb>`_ [3] `Population age structure looks as expected by the sixth year of the simulation (as expected). <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_4/model_4.0_population_structure.ipynb>`_ [4] `Cause models look off, as expected due to LBWSG calibration issues. <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_4/model_4.0_cause_model_validation.ipynb>`_
   * - `5.1 through 5.3 <https://github.com/ihmeuw/vivarium_research_iv_iron/tree/main/validation/child/model_5>`_
     - Series of subruns, run with only maternal supplementation intervention effects (model 5.1), antenatal IV iron effects (model 5.2), joint pregnancy BMI/HGB effects (model 5.3) for select scenarios
     - `Intervention effects <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_5/Intervention%20effects%20on%20BW%2C%205.1%2C%205.2%2C%20and%205.3.ipynb>`_ and coverage look as expected
   * - `5.4.1 <https://github.com/ihmeuw/vivarium_research_iv_iron/tree/main/validation/child/model_5>`_
     - Effect of BW on CGF for baseline and antenatal IV iron scenarios
     - `Looks generally as expected <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_5/bw_on_cgf_effect_5.4.1.ipynb>`_
   * - `5.5.0 <https://github.com/ihmeuw/vivarium_research_iv_iron/tree/main/validation/child/model_5>`_
     - All components, 2022-2027
     - `Differences in DALYs between scenarios was looking less than expected <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_5/Deaths%20and%20dalys%20averted%20(pre%20LBWSG%20unmodeled%20affected%20cause%20addition).ipynb>`_. Realized that we had not included a cause for unmodeled causes affected by LBWSG in this model, so changes in BW were not impacting neonatal mortality as expected.
   * - `5.5.1 <https://github.com/ihmeuw/vivarium_research_iv_iron/tree/main/validation/child/model_5>`_
     - All components, with unmodeled affected LBWSG causes, 2022-2027
     - Impacts of BW changes are matching expected magnitude now
   * - 6.0 (neonatal only)
     - All components, 2024 to 2040, neonatal ages only due to runtime constraints 
     - `Looks as expected <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_6/>`_
   * - 6.0 .one_draw_full_model
     - Single draw, all components, 0-5 year olds, 2024-2040
     - `Overall looks as expected <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_6/Full%20CGF%20run%2C%20single%20draw.ipynb>`_. For SSA, inclusion of 1 month to 5 year olds represents and additional ~7 percent of averted burden in IV iron scenario relative to baseline. But relative to oral iron, effect is smaller at ~2%. (To continue to expand on explanation, as started in the `BOE notebook <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/misc_investigations/BW%20on%20CGF%20BOE.ipynb>`_)
   * - `6.1 diarrhea neonatal split <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/model_6/NN%20diarrhea%20and%20timestep%20run.ipynb>`_
     - All components, diarrheal diseases age_start changed to post_neonatal, 25 draws, 200 seeds. Testing multiple time-step durations: 0.5, 2, 3, and 4 days.
     -  * For 0.5 day timestep, all looks as expected -- diarrheal diseases age restriction appears to be implemented correctly (NOTE: need make sure LBWSG is affecting LRI and DD mortality in interactive sim). 
        * Neonatal mortality is still validating with the 2 day timestep. However, LRI and diarrheal diseases remission rate calculation did not appear to update according to timestep change, causing an underestimation of the remission rate and an overestimation of prevalence and associated burden.
        * For 3 day timestep, fix was implemented to update diarrheal diseases and LRI remission rates, and cause models are now validating. Mortality in the neonatal ages also still validating, so will move on to 4 day timestep.
        * For 4 day timestep, validation for South Asia looks good. For SSA, it's a bit farther off, but no farther than 0.5 day timestep. Will move forward with 4 day timestep for future runs.

.. list-table:: Outstanding model verification and validation issues
  :header-rows: 1

  * - Issue
    - Explanation
    - Action plan
    - Timeline
  * -  
    -  
    -  
    -  

.. _ivironU54.4:

4.4 Desired outputs
-------------------

For model version II:

#. DALYs (YLLs and YLDs) among children under five (due to LBWSG-affected causes, measles, LRI, diarrheal diseases, PEM)
#. Mean birthweight at birth
#. Prevalence of low birthweight babies (<2500 grams)
#. Risk exposure of child wasting and child stunting

.. _ivironU54.5:

4.5 Simulation output table
---------------------------

.. csv-table:: Child simulation output table
   :file: output_table.csv
   :header-rows: 1

.. note::
  
  Stratification by IFA coverage should be done in the baseline scenario for validation and verification and then can be removed once we confirm that it is working correctly.

5.0 Back of the envelope calculations
+++++++++++++++++++++++++++++++++++++


6.0 Limitations
+++++++++++++++


7.0 References
+++++++++++++++

