.. role:: underline
    :class: underline

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
  ~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

.. _intervention_wasting_tx_inpatient_sam:

===================================================================================================
Treatment and management for acute malnutrition, including inpatient treatment for complicated SAM
===================================================================================================

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 5 15
  :header-rows: 1

  * - Abbreviation
    - Definition
  * - SAM
    - severe acute malnutrition
  * - MAM
    - moderate acute malnutrition

Overview
---------------------

This intervention model document builds off of the modeling strategy for management of acute malnutrition, :ref:`found here<intervention_wasting_tx_combined_protocol>` used in the :ref:`Nutrition Optimization Simulation <2021_concept_model_vivarium_nutrition_optimization>`. Changes to the modeling strategy for this document were made for the :ref:`nutrition optimization inpatient SAM extension simulation <nutrition_optimization_extension>`.

This page will detail the modeling strategy for the following interventions:

.. list-table:: Intervention definitions
  :header-rows: 1

  * - Intervention
    - Description
    - Relevant scenario applications
    - Changes from prior model
  * - MAM treatment
    - Outpatient treatment for MAM through anthropometric recovery to mild wasting
    - * Coverage for a subset of high-risk MAM cases in ``targeted_mam_tx`` scenarios
      * Coverage for all MAM cases in ``universal_mam_tx`` scenarios
    - * Parameter updates to c_mam, e_mam, and treated and untreated MAM recovery rates
      * Reworking of the ``load_mam_treatment_rr`` function
  * - Uncomplicated SAM treatment
    - Outpatient treatment for uncomplicated SAM through anthropometric recovery to mild wasting
    - * Coverage of all uncomplicated SAM cases in ``uncomplicated_sam_tx`` scenarios
      * Coverage specifically for simulants who transitioned to uncomplicated SAM following inpatient treatment (and no coverage for other uncomplicated SAM cases) for complicated SAM in ``complicated_sam_recovery`` scenarios
    - Parameter updates to C_SAM and E_SAM values only (we've also renamed it from "SAM treatment" to "Uncomplicated SAM treatment" in these docs)
  * - Complicated SAM treatment
    - Inpatient treatment for complicated SAM through stabilization to uncomplicated SAM
    - * Coverage of all complicated SAM cases in ``complicated_sam_stabilization`` scenarios
      * Coverage of all complicated SAM cases in ``complicated_sam_recovery`` scenarios
    - New intervention; can apply same structure of effect on the transition rate from complicated to uncomplicated SAM as the MAM treatment intervention does on the transition rate from MAM to mild wasting (after making the updates to the ``load_mam_treatment_rr`` function)

Vivarium Modeling Strategy
--------------------------

The wasting treatment intervention will be implemented as a variable that affects the relative risk of certain transition rates between wasting states in the :ref:`dynamic wasting model <2021_risk_exposure_wasting_with_complicated_sam>`. The following table details the relative risks for each dynamic wasting model transition rate that is affected by wasting treatment based on a given treatment category.

All parameters for this intervention model discussed on this page as well as baseline coverage levels for all interventions should come from the custom data .csv output from the wasting calibration model. Parameter names in this table should match parameter names in that file.

.. important::

  All wasting treatment interventions are for children 6 months to five years of age only -- there should be no intervention coverage or effects for those less than six months of age.

.. list-table:: Wasting transition rate relative risks for wasting treatment
  :header-rows: 1

  * - Transition
    - Relevant intervention
    - Uncovered RR
    - Note
  * - rem_rate_mam
    - MAM treatment
    - ux_rem_rate_mam / (tx_rem_rate_mam * e_mam + ux_rem_rate_mam * (1 - e_mam))
    - See expanded note at the end of this section
  * - rem_rate_complicated_sam
    - Complicated SAM treatment
    - ux_rem_rate_complicated_sam / (tx_rem_rate_complicated_sam * e_complicated_sam + ux_rem_rate_complicated_sam * (1 - e_complicated_sam))
    - Did not exist in prior models, but has exactly the same structure as the MAM treatment effects in the row above
  * - tx_rem_rate_sam
    - Uncomplicated SAM treatment
    - 0 (= 0 * tx_rem_rate_sam / e_sam * tx_rem_rate_sam)
    - No change to prior models
  * - ux_rem_rate_sam
    - Uncomplicated SAM treatment
    - 1/(1 - e_sam)
    - No change from prior models except for parameter updates to e_sam

Where ``e`` represents intervention "efficacy" as the proportion of the population who does not refuse or otherwise drop out of treatment. Those who refuse or otherwise drop out of treatment are assumed to recover via the untreated recovery rates. Intervention-specific values are shown below and were chosen to be compatible with the SPHERE standard default rate for acute malnutrition management of <15% and an assumption that default rates will decrease with increasing acute malnutrition severity.

- e_mam = 0.85
- e_sam = 0.90
- e_complicated_sam = 0.95

.. note::

  In the above table, the RR for the treated category is 1 for all rows. Additionally, in the implementation of these relative risks, the code is structured to generalize to any treatment exposure category with a defined ``e_`` value, with no treatment having a value of 0. Implementation of those equations should be mathematically equivalent to the documentation here, but note that they appear to differ at first pass!

**How to apply treatment effects at the simulant level**

For rate, :math:`r`, in [rem_rate_mam, ux_rem_rate_sam, tx_rem_rate_sam, rem_rate_complicated_sam]:

.. math::

  \text{r}_\text{i} = r * (1 - \text{PAF}_\text{r}) * \text{RR}_\text{r, i}

Given,

.. math::

  PAF_\text{r} = \frac{\overline{RR_\text{r}} - 1}{\overline{RR_\text{r}}}

and

.. math::

  \overline{RR_\text{r}} = C * RR_\text{r, treated} + (1 - C) * RR_\text{r, untreated}


.. note::

  Here is a list of oddities in the code that need to be addressed or that we should be aware of while updating this model:

  * The ``load_mam_treatment_rr`` function (`seen here <https://github.com/ihmeuw/vivarium_gates_nutrition_optimization_child/blob/2c0bc125fe14967700f1019c40d25d48faaa84c7/src/vivarium_gates_nutrition_optimization_child/data/loader.py#L1355>`__) calculates the RR based on durations rather than rates. These are not equivalent when E_MAM != 1. **We should update this equation to use treated/untreated transition rates provided in the custom data input file rather than the durations.** However, when informing the currently named ``mam_tx_duration`` and ``mam_ux_duration`` variables as rates rather than durations, it requires us to either (1) switch all instances of ``mam_ux_duration`` to ``mam_tx_duration`` and vise versa, OR (2) add a line where ``rr = 1/rr``.

    - Note that this does not apply for the ``load_sam_treatment_rr`` function (`seen here <https://github.com/ihmeuw/vivarium_gates_nutrition_optimization_child/blob/2c0bc125fe14967700f1019c40d25d48faaa84c7/src/vivarium_gates_nutrition_optimization_child/data/loader.py#L1305>`__) as this equation does not use the transitions rates directly and is only a function of the E_SAM parameter.

  * The ``load_mam_treatment_rr`` and ``load_sam_treatment_rr`` functions are structured to support a three-category wasting treatment exposure (a legacy from the CIFF simulation implementation) with the following exposure definitions:

    - cat1: no treatment
    - cat2: baseline treatment with baseline E parameter value
    - cat3: improved treatment with alternative E parameter value (`values defined here <https://github.com/ihmeuw/vivarium_gates_nutrition_optimization_child/blob/2c0bc125fe14967700f1019c40d25d48faaa84c7/src/vivarium_gates_nutrition_optimization_child/constants/data_values.py#L115>`__)

    Given that all scenarios of the cat3 treatment category should have an exposure of zero, it should not affect our results, but please note that it will make the wasting treatment RR and PAF values in the artifact less interpretable. We could set the alterantive values to 1 to aid interpretation.

  * The following parameters related to wasting treatment have been defined in the ``constants/data_values.py`` file rather than from the custom data that comes out of the wasting calibration. 

    * ``MAM_UX_RECOVERY_TIME_OVER_6MO``. Instead, inform this parameter using ``ux_rem_rate_mam`` from the custom data file

    * ``MAM_TX_RECOVERY_TIME_OVER_6MO``. Instead, inform this paraemter using ``tx_rem_rate_mam`` from the custom data file


Coverage Propensities
++++++++++++++++++++++

The coverage propensity for wasting treatment parameter :math:`C` for any given simulant should update upon each transition between wasting states (in other words: a new propensity should be drawn from a independent uniform distribution). There should be no correlation between MAM and SAM treatment parameter propensity values.

**NEW TO INPATIENT SAM MODEL EXTENSION:**

  The wasting treatment coverage propensity resetting should be overwritten specifically for simulants who transition from complicated to uncomplicated SAM while covered for complicated SAM treatment. In scenarios with coverage of "Complicated SAM recovery" intervention, these simulants should automatically receive outpatient SAM intervention coverage.

.. note::

  This strategy was desgined to avoid the lower wasting treatment coverage among SAM/MAM states than among mild/TMREL states, `as shown here with fixed wasting treatment coverage propensities <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/2021_10_29a_ciff_sam_v4.1_vv_wasting_treatment_coverage.ipynb>`_.

  This strategy assumes that simulants who are treated for MAM and SAM once are no more likely to be treated again than simulants who have never been treated for SAM or MAM (despite need).

Targeted Coverage for MAM Treatment
+++++++++++++++++++++++++++++++++++

.. note::

  No changes to this section of the documentation for the inpatient SAM extension model

In accordance with `new guidelines from the WHO <https://files.magicapp.org/guideline/a3fe934f-6516-460d-902f-e1c7bbcec034/published_guideline_7330-1_1.pdf>`_ on the prevention and management of acute 
malnutrition, we are including an option for targeted MAM treatment. The guidelines for 
receiving MAM treatment include numerous factors for children to be consider for MAM 
treatment including the presence of *any* of the following criteria:

- WAZ z-score <-3 
- Age <24 months
- MUAC between 115-119 
- Failing to recover from MAM after receiving other interventions
- History of SAM
- Comorbidities (like HIV, TB, some physical/mental disability)
- Severe personal circumstances, such as mother died or poor maternal health and well-being 
- Recent on ongoing humanitarian crisis

Currently, we will be using the first two of these (WAZ and/or age) plus an analogy of the third
to WHZ scores (WHZ between -2.5 and -3) for MAM targeting in our model. These three targets
combined are thought to comprise approximately 67% of all MAM cases among children 6-59 months
of age, `as investigated in this notebook. <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/cgf_correlation/ethiopia/mam_target_sizes.ipynb>`_

In modeling, the targeted MAM intervention will be given to children who fall in the MAM category for wasting (WHZ z-score < -2 to -3) AND:

- Are aged 6-24 months, 
- OR are severely :ref:`underweight <2020_risk_exposure_child_underweight>` with WAZ z-score < -3 (WAZ cat1)
- OR are in the "Worse" MAM/cat2.0 :ref:`wasting exposure state <2021_risk_exposure_wasting_state_exposure>`

Restrictions
++++++++++++

For treatment of SAM and MAM, we model treatment starting at six months of age. This is true for both baseline and treatment scale-up scenarios. 

.. list-table:: Affected outcomes restrictions
  :widths: 20 20 20
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
    - 6-11 months, age_group_id = 389
    - (GBD 2019 does not have age_group_id=389. Use six months of age within the postneontal age group (1 month - 1 year) when using GBD 2019 results rather than GBD 2020)
  * - Age group end
    - 2 - 4 years age_group_id = 34
    - 2y-4y = 34 GBD 2020; 1y-4y = 5 GBD 2019
  * - Other
    -
    -

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. We are not applying a differential death rate to those effectively covered vs not effectively covered. Potential excess mortality associated with untreated SAM relative to treated SAM is analyzed in an analysis by [Laillou-et-al-2022-combined]_, which suggests it may be equal to 138.52 per 1,000 child-years. 
#. We assume that individual simulant's propensity to respond to wasting treatment is independent of their previous response/non-response to treatment. According to [Bitew-et-al-2020]_, SAM treatment response rates are associated with diarrhea, oedema, and use of antibiotics in the treament course in Ethiopia. Additionally, vitamin A supplementation and distance from the treatment center may be associated with SAM treatment response rates, although direct evidence was not provided [Bitew-et-al-2020]_. We chose to make this assumption given the non-deterministic nature of these factors.
#. We assume that individuals who receive wasting treatment (according to parameter :math:`C`) but who do not respond to treatment according to parameters (according to parameter :math:`E_{SAM}` and :math:`E_{MAM}`) will exit the SAM state either through the :math:`r_{SAM,ux}` transition rate to the MAM state or the SAM-specific mortality rate and will exit the MAM state either through the :math:`r_{MAM,ux}` transition rate to mild wasting or the MAM-specific mortality rate. However, treatment non-responders (defined as not reaching recovery after two months of treatment) may represent especially complicated cases of MAM/SAM that may take longer to recovery and/or may have a higher mortality rate.
#. We apply data of acute malnutrition measured using MUAC to our model that defines acute malnutrition according to WHZ scores. We assume that these definitions of acute malnutrition are good proxies of one another.



Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Verifications:**

At the age/sex/location/draw-specific level: 

1. Verify the expected application of wasting treatment interventions on recovery rates in the wasting exposure model. Specifically:

  - rate from {better/worse}_MAM to mild child wasting among those uncovered by MAM treatment == ux_rem_rate_mam from custom input data
  - rate from {better/worse}_MAM to mild child wasting among those covered by MAM treatment == tx_rem_rate_mam * E_MAM + ux_rem_rate_mam * (1 - E_MAM) from custom input data
  - rate from uncomplicated SAM to mild child wasting among those uncovered by uncomplicated SAM treatment == 0
  - rate from uncomplicated SAM to mild child wasting among those covered by uncomplicated SAM treatment == tx_rem_rate_sam * E_SAM 
  - rate from uncomplicated SAM to {better/worse}_MAM among those uncovered by uncomplicated SAM treatment == ux_rem_rate_sam
  - rate from uncomplicated SAM to {better/worse}_MAM among those covered by uncomplicated SAM treatment == ux_rem_rate_sam * (1 - E_SAM)
  - rate from complicated SAM to uncomplicated SAM among those covered by complicated SAM treatment == tx_rem_rate_complicated_sam * E_SAM_INPATIENT * ux_rem_rate_complicated_sam * (1 - E_SAM_INPATIENT) 
  - rate from complicated SAM to uncomplicated SAM among those uncovered by complicated SAM treatment == ux_rem_rate_complicated_sam 

2. Verify expected levels of baseline coverage 

3. Verify intervention coverage in the alternative scenarios. Specifically:

  - In ``targeted_mam`` scenarios, confirm all covered MAM cases have age < 24 months or WAZ < -3 or "worse" MAM exposure and no coverage otherwise (likely best suited for the interactive simulation)

  - Confirm total coverage of MAM treatment for all MAM cases in ``universal_mam`` scenarios

  - Confirm total coverage of uncomplicated SAM treatment for uncomplicated SAM cases in ``uncomplicated_sam`` scenarios

  - Confirm total coverage of complicated SAM treatment for complicated SAM cases in ``complicated_sam_stabilization`` and ``complicated_sam_recovery`` scenarios

  - In the interactive simulation: In ``complicated_sam_recovery`` scenarios, confirm that simulants who transition from complicated to uncomplicated SAM while covered by the complicated SAM treatment intervention are subsequently covered by the uncomplicated SAM treatment intervention and that no other simulants are covered by the uncomplicated SAM treatment intervention

**Validations:**

Estimates of the fatality of pooled SAM in the absence of treatment:

  - `Laillou et al. (2022) assumes CFR of 10-20% for SAM cases (not differentiated by complicated/uncomplicated status) without access to treatment, informed by indirect data from the 80s and 90s <https://pmc-ncbi-nlm-nih-gov.offcampus.lib.washington.edu/articles/PMC11258777/#mcn13349-fig-0001>`__
  - `CIFF (Children's Investment Fund Foundation, a leader in the child malnutrition realm) claims that "up to 10%" of SAM cases (not differentiated by complicated/uncomplicated status) without access to treatment will die <https://ciff.org/impact/nigeria-treating-severe-acute-malnutrition/>`__

  * To compare how our model validates to these estimates: divide total mortality counts that occur in the SAM substates in our model by person time spent in the SAM superstate in our model among the uncovered population (at the national level)

`Tekeste et al. 2012 <https://link-springer-com.offcampus.lib.washington.edu/article/10.1186/1478-7547-10-4>`__ found that an program with higher coverage of uncomplicated SAM treatment (outpatient/community treatment) had ~3 times lower complication rates than a program with lower coverage of uncomplicated SAM treatemnt (facility-based treatment).

  * To evaluate how our model validates to this finding, we can compare the ratio of complicated SAM prevalence to total SAM prevalence in a scenario without treatment for uncomplicated SAM to a scenario with treatment for uncomplicated SAM. We would expect the difference to be >3 times as our modeled coverage differences are larger than what is expected in this publication.

References
----------
