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



.. _2021_risk_exposure_wasting_with_complicated_sam:

====================================================================
Wasting dynamic transition model with complicated SAM (GBD 2021)
====================================================================

.. note::

  This page has been adapted from the :ref:`2021 wasting risk exposure page <2021_risk_exposure_wasting_state_exposure>`
  used in the :ref:`nutrition optimization child simulation <2021_concept_model_vivarium_nutrition_optimization_children>`.

  The wasting exposure model on this page has been extended to subdivide the severe acute malnutrition (SAM) exposure state into two separate exposures: uncomplicated and complicated SAM and is intended for use in the 
  :ref:`nutrition optimization extension simulation <nutrition_optimization_extension>`.

.. contents::
  :local:

Research background
++++++++++++++++++++

For brevity, background research information not specific to the complicated SAM state that is new to this version of the wasting model has been removed from this document. Consult the :ref:`2021 wasting risk exposure page <2021_risk_exposure_wasting_state_exposure>` for additional background information on child wasting/acute malnutrition.

Severe acute malnutrition (SAM) is classified by the following criteria:

- Weight-for-height z-score (WHZ) < -3, 
- Mid-upper arm circumference (MUAC) < 115 mm, or
- Bilateral pitting oedema

Among those classified as SAM, a subset of cases are further classified as complicated SAM, including those who:

- Fail an appetite test (failure to consume a specified amount of ready-to-eat therapeutic food (RUTF))
- Have an active severe infection
- Have high grade edema
- Metabolic issues such as hypoglycenmia, hypothermia, or dehydration
- Have another medical complication such as severe anemia, HIV, etc.

Generally, complicated cases will require inpatient care where they are fed with specially formulated milks (potentially via a feeding tube) and provided with additional supportive care as needed. Uncomplicated cases may be managed in an outpatient setting with solid RUTF.

Vivarium Modeling Strategy
++++++++++++++++++++++++++

**Risk exposure model diagram**

.. image:: wasting_sim_transitions.png

.. note::

  A summary of changes for the nutrition optimization extension model include:

    - Renaming of super/substates for clarity 
    - Separation of SAM superstate into complicated and uncomplicated substates
    - Subtraction of moderate wasting with oedema from MAM superstate prevalence
    - Addition of moderate wasting of oedema to SAM superstate prevalence 
    - Edits to the Initialization_ section to detail specific behavior for all modeled substates (substates treated the same as their superstates without any other structural or parameter changes to modeling strategy).

.. list-table:: Modeled wasting exposure states
  :header-rows: 1

  * - Parameter
    - Definition
    - Value
    - Note
  * - **cat4**
    - Child wasting TMREL (susceptible to child wasting)
    - gbd_cat4
    - No change from prior model
  * - **cat3**
    - Mild wasting
    - gbd_cat3
    - No change from prior model
  * - cat2_superstate 
    - Total moderate acute malnutrition
    - gbd_cat2 - moderate_wasting_with_oedema
    - Note cat2_superstate here refers to the combination of the "better" and "worse" MAM substates. Update from prior version includes subtraction of moderate wasting with oedema prevalence
  * - **cat2.5_better** MAM
    - "Better" moderate acute malnutrition
    - cat2_superstate * (1 - worse_fraction)
    - 
  * - **cat2.0_worse** MAM
    - "Worse" moderate acute malnutrition
    - cat2_superstate * worse_fraction
    - Note potential for confusion around "cat2" naming: at risk of confusing cat2 substate with superstate
  * - cat1_superstate
    - Total severe acute malnutrition
    - gbd_cat1 + moderate_wasting_with_oedema
    - Note this superstate is inclusive of the two cat1_uncomplicated and cat1_complicated substates. Update from prior version includes addition of moderate wasting with oedema prevalence
  * - **cat1_uncomplicated** SAM
    - Uncomplicated severe acute malnutrition (SAM)
    - cat1_superstate * (1 - complicated_fraction)
    - 
  * - **cat1_complicated** SAM 
    - Complicated severe acute malnutrition (SAM)
    - cat1_superstate * complicated_fraction
    - 
  
.. list-table:: Exposure parameter data values
  :header-rows: 1

  * - Parameter
    - Definition
    - Value
    - Note
  * - gbd_cat4
    - GBD prevalence of no child wasting (TMREL)
    - ``get_draws(source='exposure', gbd_id_type='rei_id', gbd_id=240)['parameter'=='cat4]``
    - 
  * - gbd_cat3
    - GBD prevalence of mild child wasting
    - ``get_draws(source='exposure', gbd_id_type='rei_id', gbd_id=240)['parameter'=='cat3]``
    - 
  * - gbd_cat2
    - GBD prevalence of moderate child wasting
    - ``get_draws(source='exposure', gbd_id_type='rei_id', gbd_id=240)['parameter'=='cat2]``
    - 
  * - gbd_cat4
    - GBD prevalence of no child wasting (TMREL)
    - ``get_draws(source='exposure', gbd_id_type='rei_id', gbd_id=240)['parameter'=='cat1]``
    - 
  * - moderate_wasting_with_oedema
    - GBD prevalence of the moderate protein energy malnutrition with oedma sequela
    - ``get_draws(source='como', measure_id=5, gbd_id_type='sequela', gbd_id=190)``
    - 
  * - worse_fraction
    - Fraction of MAM cases in "worse" substate
    - Values found in `simulation repository raw data directory here <https://github.com/ihmeuw/vivarium_gates_nutrition_optimization_child/blob/main/src/vivarium_gates_nutrition_optimization_child/data/raw/worse_exp_frac_only_loc.csv>`__. No changes required for nutrition optimization extension simulation.
    - See detail of the derivation of this parameter on the :ref:`2021 wasting risk exposure page <2021_risk_exposure_wasting_state_exposure>`
  * - complicated_sam_fraction
    - Fraction of SAM cases in the "complicated" substate
    - Values will be output at the draw/age/sex/subnational-specific level from the wasting calibration. TODO: post link when ready
    - `See placeholder values here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/0acb49fac8[…]lation/nigeria/kebbi-copied-dummy-transitions-all-locations.csv>`__ parameter == 'comp_frac'

.. todo::

  Add data for complicated_sam_fraction parameter

Initialization
--------------

Simulants will be initialized into a wasting state **at birth** according to the wasting risk exposure
distribution specific to the 1-5 month (ID 388) age group.

Wasting state at initialization will be entirely dependent on :ref:`infant LBWSG exposure <2019_risk_exposure_lbwsg>`, 
such that low birth weight (LBW) infants with birth weight exposures equal to or below 2,500 grams will have a greater 
probability of being wasted than adequate birth weight (ABW) infants with birth weight exposures greater than 2,500 grams.

.. list-table:: Parameter definitions
  :header-rows: 1

  * - Parameter
    - Definition
    - Note
  * - :math:`p_\text{cat(i)}` for i in [4, 3, 2.5_better, 2.0_worse, 1_uncomplicated, 1_complicated]
    - Population level prevalence of wasting category i in the 1-5 month age group (ID=388)
    - 
  * - :math:`p_\text{cat(i),LBW}`
    - Prevalence of wasting category i among the low birth weight population
    - Low birth weight as BW =< 2,500 grams
  * - :math:`p_\text{cat(i),ABW}`
    - Prevalence of wasting catgory i among the adequate birth weight population
    - Adequate birth weight as BW > 2,500 grams
  * - RR
    - Relative risk of wasting (cat1 and cat2 combined) at 30 days of life among LBW relative to ABW babies
    - 
  * - :math:`p_\text{LBW}`
    - Prevalence of low birth weight among infants who survive to 30 days of life
    - This value is specific to the baseline scenario

Given the following equations:

1. :math:`p_\text{cat1,LBW} * p_\text{LBW} + p_\text{cat1,ABW} * (1 - p_\text{LBW}) = p_\text{cat1}`

2. :math:`RR = p_\text{cat1,LBW} / p_\text{cat1,ABW}` 

We can then solve for the ABW and LBW probabilities of initialization into wasting categories 1 and 2. We then assume that the difference between the ABW and LBW probabilities for categories 1 and 2 with the population-level probabilities is equally distributed amongst categories 3 and 4.

.. list-table:: Wasting state probabilities by birth weight status
  :header-rows: 1

  * - Wasting category
    - Birth weight status
    - Wasting exposure
  * - cat1_superstate
    - ABW
    - :math:`p_\text{cat1superstate} / (RR * p_\text{LBW} + (1 - p_\text{LBW}))`
  * - cat1_superstate
    - LBW
    - :math:`p_\text{ABW,cat1superstate} * RR`
  * - cat2_superstate
    - ABW
    - :math:`p_\text{cat2superstate} / (RR * p_\text{LBW} + (1 - p_\text{LBW}))`
  * - cat2_superstate
    - LBW
    - :math:`p_\text{ABW,cat2superstate} * RR`
  * - cat3
    - ABW
    - :math:`(p_\text{cat1superstate} + p_\text{cat2superstate} - p_\text{ABW,cat1superstate} - p_\text{ABW,cat2superstate}) * p_\text{cat3} / (p_\text{cat3} + p_\text{cat4}) + p_\text{cat3}`
  * - cat3
    - LBW
    - :math:`(p_\text{cat1superstate} + p_\text{cat2superstate} - p_\text{LBW,cat1superstate} - p_\text{LBW,cat2superstate}) * p_\text{cat3} / (p_\text{cat3} + p_\text{cat4}) + p_\text{cat3}`
  * - cat4
    - ABW
    - :math:`(p_\text{cat1superstate} + p_\text{cat2superstate} - p_\text{ABW,cat1superstate} - p_\text{ABW,cat2superstate}) * p_\text{cat4} / (p_\text{cat3} + p_\text{cat4}) + p_\text{cat4}`
  * - cat4
    - LBW
    - :math:`(p_\text{cat1superstate} + p_\text{cat2superstate} - p_\text{LBW,cat1superstate} - p_\text{LBW,cat2superstate}) * p_\text{cat4} / (p_\text{cat3} + p_\text{cat4}) + p_\text{cat4}`
  * - cat1_uncomplicated
    - ABW
    - :math:`p_\text{ABW,cat1superstate} * (1 - \text{complicated fraction})`
  * - cat1_uncomplicated
    - LBW
    - :math:`p_\text{LBW,cat1superstate} * (1 - \text{complicated fraction})`
  * - cat1_complicated
    - ABW
    - :math:`p_\text{ABW,cat1superstate} * \text{complicated fraction}`
  * - cat1_complicated
    - LBW
    - :math:`p_\text{LBW,cat1superstate} * \text{complicated fraction}`
  * - cat2.5_better
    - ABW
    - :math:`p_\text{ABW,cat2superstate} * (1 - \text{worse fraction})`
  * - cat2.5_better
    - LBW
    - :math:`p_\text{LBW,cat2superstate} * (1 - \text{worse fraction})`
  * - cat2.0_worse
    - ABW
    - :math:`p_\text{ABW,cat2superstate} * \text{worse fraction}`
  * - cat2.0_worse
    - LBW
    - :math:`p_\text{LBW,cat2superstate} * \text{worse fraction}`

.. note::

  The values in the *Wasting state probabilities by birth weight status* should **not**
  change between scenarios as LBWSG exposures change.

  ^This note is intended to mean that the probability of a given wasting exposure conditional on birthweight status should be calibrated to the values in the baseline scenario and not be recalculated in each scenario. However, as LBWSG exposure changes between scenario (and shifts individual-level low vs. adequate birth weight status), wasting exposure at birth may change between scenarios. This is not a change from the original nutrition optimization model.

.. list-table:: Parameter values
  :header-rows: 1

  * - Parameter
    - Value
    - Note/Source
  * - RR
    - 1.82 (95% CI: 1.35, 2.45), assume a lognormal distribution of uncertainty
    - Calculated using meta-analysis of most recent available DHS round 7 or 8 as of 10/2023. `Analysis performed and resulting forest plot can be found here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/pull/95>`_
  * - :math:`p_\text{LBW}`
    - Exposure of LBWSG categories with BW < 2500 grams for the late neonatal age group in GBD
        * :code:`get_draws(source='exposure', rei_id=339, age_group_id=3)`
        * decomp_step='step4' for GBD 2019
        * Sum over the following categories: *['cat10', 'cat106', 'cat11', 'cat116', 'cat117', 'cat123', 'cat124', 'cat14', 'cat15', 'cat17', 'cat19', 'cat2', 'cat20', 'cat21', 'cat22', 'cat23', 'cat24', 'cat25', 'cat26', 'cat27', 'cat28', 'cat29', 'cat30', 'cat31', 'cat32', 'cat34', 'cat35', 'cat36', 'cat8', 'cat80']*
    - :ref:`LBWSG exposure document found here for reference <2019_risk_exposure_lbwsg>`. List of LBW categories was `generated from this notebook <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/LBW%20categories.ipynb>`_


Transitions
------------

`See placeholder values here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/0acb49fac8[…]lation/nigeria/kebbi-copied-dummy-transitions-all-locations.csv>`__


.. list-table:: Transition Data
 :header-rows: 1

 * - Transition
   - Source State
   - Sink State
   - Name in output calibration
   - Note
 * - ux_rem_rate_sam
   - cat1_uncomplicated
   - cat2_superstate
   - r2
   - * Source state updated from cat1_superstate to cat1_uncomplicated
     * Same rate applies to both MAM substates, strategy unchanged from N.O. implementation, but docs updated for clarity
 * - tx_rem_rate_sam
   - cat1_uncomplicated
   - cat3
   - t1
   - * Source state updated from cat1_superstate to cat1_uncomplicated
 * - rem_rate_mam
   - cat2_superstate
   - cat3
   - r3
   - * Same rate applies to both MAM substates, strategy unchanged from N.O. implementation, but docs updated for clarity
 * - rem_rate_mild
   - cat3
   - cat4
   - r4
   - 
 * - inc_rate_sam
   - cat2_superstate
   - cat1_uncomplicated
   - i1
   - * Sink state updated from cat1_superstate to cat1_uncomplicated
     * Same rate applies to both MAM substates, strategy unchanged from N.O. implementation, but docs updated for clarity
 * - inc_rate_mam
   - cat3
   - cat2_superstate
   - i2
   - * Same rate applies to both MAM substates, strategy unchanged from N.O. implementation, but docs updated for clarity
 * - inc_rate_mild
   - cat4
   - cat3
   - i3
   - 
 * - inc_rate_complicated_sam***
   - cat1_uncomplicated
   - cat1_complicated
   - ic
   - New transition for the N.O. extension simulation
 * - rem_rate_complicated_sam***
   - cat1_complicated
   - cat1_uncomplicated
   - r1
   - New transition for the N.O. extension simulation

Validation 
++++++++++

Wasting model

  - prevalence of all wasting exposure states
  - model transition rates

Note that validation of this model is dependent on validation of wasting-specific mortality rates, which are dependent on the following models meeting their individual validation criteria:

  - Stunting and underweight exposure models
  - CGF risk exposure correlation
  - CGF risk effects
  - Cause-specific and all-cause mortality rates

Deriving the wasting transition rates
--------------------------------------

We utilized information from several sources to develop a wasting transition model.

- **Wasting-exposures:** 

  - GBD 2021 child wasting risk exposure
  - Prevalence of moderate wasting with oedema sequela from GBD 2021
  - WHZ exposure data from DHS to inform the relative prevalence of the better and worse MAM substates
  - Reports from the literature to inform the relative prevalence of the complicated and uncomplicated SAM substates

- **Wasting-specific mortality rates:** detailed on the WASTING-ATTRIBUTABLE MORTALITY DOCUMENT TODO: LINK WHEN READY

- **Treated recovery rates for acute malnutrition:** detailed on the WASTING TREATMENT DOCUMENT TODO: LINK WHEN READY

- **Incidence rates from less to more severe wasting categories:** 

  - GF Knowledge Integration (KI) longitudinal database for transitions into mild wasting, MAM, and uncomplicated SAM. `A description of included studies is available here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/cgf_correlation/ethiopia/KI%20studies.xlsx>`_

  - Literature-based reports on the proportion of cases in treatment for outpatient uncomplicated SAM who deteriorate to complicated SAM prior to discharge (see table below)

However, recovery from MAM and SAM states for those who do not receive treatment is very limited in the case of MAM and not observable in the case of SAM as it would be unethical for researchers to track the natural history of SAM without providing access to treatment. Therefore, we utilized a Markov model to solve for the untreated wasting recovery rates that would result in a steady state equilibrium of the system below and the values from the sources described above.

:download:`See this word document for a description of these parameters and the equations used to solve the system <WASTING CALIBRATION.docx>`

.. image:: calibration_transitions.svg

The process of generating draw-level values for all wasting transitions is outlined below. See the code for generating draw-specific transition values in this notebook here: TODO: link when ready/merged

1. Load all pre-defined input data values (in accordance with documentation linked above). These include:

  - Wasting superstate exposures
  - GBD all-cause mortality rate
  - Wasting state-speciifc mortality rates due to modeled causes

2. Exclude studies in the KI database that have inappropriate study populations. A list of excluded studies and there reasons for exclusion are provided below.

  - AKU_EE: Infants with insufficient response to RUTF
  - DIVIDS: Small for gestational age infants, not SAM, not ill
  - Ilins-Dose: LNS supplementation
  - Ilins-Dyad: LNS supplementation
  - SAS_LBW: LBW babies

3. At the sex, age, and draw-specific level, randomly sample values from the uncertainty distribution for the following parameters:

  - Case fatality rate of uncomplicated SAM
  - Case fatality rate of complicated SAM
  - Time to treatment initialization for complicated SAM
  - Inpatient stabilization time for complicated SAM
  - Complicated SAM fraction
  - Baseline coverage of AM treatment (separately for MAM, outpatient SAM, and inpatient SAM)
  - Proportion of cases that deteriorate from uncomplicated to complicated SAM during outpatient treatment
  - Incidence rates from the KI database for transitions into mild wasting, MAM, and uncomplicated SAM

.. todo::

  Include data table for all of these parameters (Tyler to make PR with table, values, and references)

4. Using the randomly sampled values from step #3, calculate the daily probabilities for all transitions in the steady state system (see linked word document for specific equations), including: 

  - State mortality rates (d variables)
  - Untreated recovery rates (r variables)
  - Incidence rate of uncomplicated to complicated SAM (ic variable)


6. Assess validity of results according to the following rules:

  - All transition rates must be positive
  - Treated recovery rates must be faster than untreated recovery rates
  - Coverage of inpatient SAM treatment must be greater or equal to coverage of outpatient SAM treatment, which must be greater or equal to coverage of MAM treatment
  - result for r3 value solved by two different methods must be within 10% of one another

7. If any of the rules in step #6 fail, begin again at step #3 until valid result is obtained. Repeat until valid result is obtained.

8. Convert daily probabilities to annual rates and output as .csv

Assumptions and Limitations
---------------------------

- We do not consider seasonal variation in wasting exposure or transition rates

- We do not consider individual heterogeneity in wasting transition rates (we do not capture relapse dynamics)

- Our model does not consider MUAC exposure and therefore may underestimate the prevalence of acute malnutrition

- We cannot directly observe recovery time of untreated wasting as it would be unethical. Therefore, we must indirectly estimate this parameter

- We assume that those successfully treated for uncomplicated SAM transition directly to the mild wasting state without transitioning through the MAM state. By definition, a transition through the MAM state must occur in reality. However, this design was selected for convenient compatibility with the standard discharge criteria for uncomplicated SAM treatment used in studies that report treated SAM recovery rates. Additionally, there is some data to suggest that immunologic recovery (and therefore reduction in mortality risk) of uncomplicated SAM cases lags behind anthropomorphic recovery. 

- We are modeling *total* mortality that occurs while in the SAM state (both complicatcated and uncomplicated) without differentiating between mortality that occurs while in SAM and mortality that occurs *due to* SAM. Our calibration strategy is expected to accurately reflect the average total impact of SAM treatment reflected in the literature due to direct calibration with reported SAM treatment mortality outcomes. It is important to note that SAM treatment (and particularly inpatient treatment for complicated SAM) is expected to reduce total mortality within SAM and not only mortality directly *caused by* SAM as the intervention may include additional treatments beyond just therapeutic foods such as antibiotics for infection, blood transfusions for severe anemia, fluids for severe dehydration, support for HIV, etc., etc. 

  However, our model will be limited in that it will not capture potential differences in impact in populations that do not generalize well to the study populations of the SAM treatment literature. As much of the SAM treatment studies are based in Africa, this is a particular risk for modeling populations outside of the continent and/or for populations with HIV prevalence that differs significantly from that found in the SAM treatment literature.

  Additionally, our model will assume that mortality risk of SAM cases will be reduced to background levels following recovery from SAM. However, in reality, it would be expected that mortality risk experienced within but not due to SAM would remain elevated for these cases (excess mortality due to HIV, which is correlated with both malnutrition and mortality, for example). Therefore, our model will overestimate the impact of interventions that reduce SAM prevalence. `See this document <https://uwnetid.sharepoint.com/:w:/r/sites/ihme_simulation_science_team/Shared%20Documents/Research/BMGF_MNCH/Nutrition%20Optimization/01_Planning/SAM%20mortality%20modeling%20strategies.docx?d=w6d360798378a4b8597a9e76ec2d5b67f&csf=1&web=1&e=C18VoT>`__ for more discussion of why this modeling strategy was chosen and a potential approach for addressing this limitation if/when we are able.

- There is little quality data available on the baseline coverage of acute malnutrition, particularly at the subnational level. Therefore, we model wide ranges of possibility for this parameter.

.. todo::

  Post an analysis of how influential baseline coverage rates are on our calibration results

- Our model of complicated and uncomplicated SAM as it relates to infectious diseases is illogical at the individual level. For instance, it is possible in our model for a simulant to occupy the uncomplicated SAM state while infected with diarrheal diseases, LRI, measles, or malaria, despite the fact that the active infection while classified as SAM by WHZ/MUAC/edema status would classify the case as complicated SAM. This is a limitation of our model chosen for modeling convenience and will cause us to underestimate the impact of inpatient SAM treatment and overestimate the impact of outpatient SAM treatment on YLDs due to infectious diseases in our simulation. 

- Our model does not include a transition rate directly from MAM to complicated SAM depsite this transition exisiting in reality. For instance, by definition, an HIV-positive MAM case who deteriorates to SAM would transition directly from MAM to complicated SAM. 

References
++++++++++

.. todo::

  Link GBD 2021 methods appendix and all of our input data sources