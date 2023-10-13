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

.. _intervention_wasting_tx_combined_protocol:

===================================================================
Treatment and management for acute malnutrition: Combined protocol
===================================================================

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
  * - CMAM
    - Community-based management of acute malnutrition

Intervention Overview
---------------------

This intervention model document builds off of the modeling strategy developed based on the Ethiopian national guideline for management of acute malnutrition, :ref:`found here<intervention_wasting_treatment>`. Changes to the modeling strategy for this document were made for the :ref:`nutrition optimization simulation <2021_concept_model_vivarium_nutrition_optimization>` and utilizes data from the COMPAS trial on wasting treatment [Bailey-et-al-2020]_.

The COMPAS trial is a non-inferiority trial that compared a "combined protocol" of SAM and MAM management to standard of care, which managed SAM and MAM separately. Rather than the standard of care to treat SAM cases with RUTF dosed to their current body weight (which increases as the child recovers) and MAM cases with RUSF, the combined protocol treats MAM cases with 1 sachet of RUTF per day until recovery and SAM cases with 2 sachets of RUTF per day until they reach MAM diagnostic criteria, at which case they will receive 1 sachet of RUTF per day until recovery from MAM (RUTF quantity decreases over time). The COMPAS trial showed that this combined protocol was not inferior to standard of care and required significantly less RUTF consumption (which has significant cost-savings implications).

Note that this trial used the MUAC definition of acute malnutrition rather than the WHZ definition as our simulation does.

An exhaustive list of changes to the modeling strategy from the previously implemented version include:

- Isolation of the :math:`\text{time to diagnosis}` parameter (now defined separately as part of the :math:`r_{SAM,tx}` and :math:`r_{MAM,tx}` parameters instead of being included within the time to recovery parameters directly)
- Updated value for :math:`\text{time to recovery}_\text{effectively treated SAM}`
- Updated value for :math:`\text{time to recovery}_\text{effectively treated SAM}`
- :math:`E_\text{MAM}` and :math:`E_\text{SAM}` parameters no longer vary by scenario
- Compatibility with new :ref:`wasting exposure transition model <2021_risk_exposure_wasting_state_exposure>`

Otherwise, the modeling strategy (and notably the intervention effects on wasting transition rate modeling strategy) remains the same.

Baseline Coverage Data
++++++++++++++++++++++

 **Coverage can be defined as the proportion of all people needing or eligible to receive a service who actually receive that service**.

  Treatment coverage = :math:`\frac{\text{Children with MAM/SAM recieving treatment}}{\text{Total number of MAM/SAM kids}}`

**Effectively covered** is the product of the treatment coverage and the treatment efficacy (proportion of the treated who were cured or 'cure-rate').

  - Effective coverage (EC) = :math:`\text{treatment coverage}\times\text{treatment efficacy}`

  - Not effectively covered = 1 - effective coverage

See the data tables in the following sections for coverage and effectiveness values for use in the model.

Vivarium Modeling Strategy
--------------------------

.. important::

  Any updates to this model will influence the :ref:`wasting risk exposure transitions rates <2021_risk_exposure_wasting_state_exposure>` and require them to be recalculated. 

  Note that the parameters/values in the "Annual recovery rate equations" and "Parameter Values" tables are used as inputs to the generation of the wasting risk exposure transition rates and will not be utilized in the simulation model directly.

  The parameters/values in the "Location-specific parameter values" table will be used directly in simulation implementation, but should use the draw-specific values linked in the table that were used in the generation of the wasting exposure transitions rate values.

.. list-table:: Annual recovery rate equations
  :header-rows: 1

  * - Parameter
    - Definition
    - Value
    - Note
  * - :math:`r_{SAM,tx}`
    - Annual transition rate from SAM to mild wasting among those effectively treated for SAM
    - :math:`365 / (\text{time to diagnosis} + \text{time to recovery}_\text{effectively treated SAM})`
    - See constant values in table below
  * - :math:`r_{MAM,tx}`
    - Annual transition rate from MAM to mild wasting among those effectively treated for MAM
    - :math:`365 / (\text{time to diagnosis} + \text{time to recovery}_\text{effectively treated MAM})`
    - See constant values in table below

.. list-table:: Parameter Values
  :header-rows: 1

  * - Parameter
    - Value
    - Distribution
    - Note
    - Source
  * - :math:`\text{time to diagnosis}`
    - 14 days
    - Point value
    - Update from prior version
    - Average value under assumption of monthly screenings
  * - :math:`\text{time to recovery}_\text{effectively treated SAM}`
    - 126 days 
    - point value
    - Update from prior version
    - Median value ~18 weeks from S3 fig, WAITING ON NUMERIC UPDATE; [Bailey-et-al-2020]_
  * - :math:`\text{time to recovery}_\text{effectively treated MAM}`
    - 63 days
    - point value
    - Update from prior version
    - Median value ~9 weeks from S5 fig, WAITING ON NUMERIC UPDATE; [Bailey-et-al-2020]_

.. list-table:: Location-specific parameter values
  :header-rows: 1

  * - Parameter
    - Location
    - Value
    - Source
    - Note
  * - :math:`C_{SAM}` (baseline)
    - Ethiopia
    - 0.488 (95% CI:0.374-0.604), normal distribution of uncertainty (0 for those <6 months)
    - [Isanaka-et-al-2021]_
    - `Use draw-level values defined here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/cgf_correlation/ethiopia/treatment_data_draws.csv>`_
  * - :math:`C_{SAM}` (baseline)
    - Nigeria
    - 0.353 (95% CI: 0.263-0.443), normal distribution of uncertainty (0 for those <6 months)
    - [Isanaka-et-al-2021]_
    - TODO: generate draw-specific values
  * - :math:`C_{SAM}` (baseline)
    - Pakistan
    - 0.05 (point value); zero for those <6 months
    - CMAM 2021 Virtual Conference - Scaling Up Management of Wasting in South Asia: A Case Study. :download:`PDF available here <04_South Asia_CMAM_EN.pdf>`
    - Note acknowledged lack of data on CMAM coverage in South Asia. Reference was provided to us by KOL Indi Trehan.
  * - :math:`C_{MAM}` (baseline)
    - Ethiopia and Nigeria
    - 0.15 (95% CI: 0.1, 0.2), normal distribution of uncertainty (0 for those <6 months)
    - Informed through discussion with CIFF/UNICEF that reported there is not reliable data on this parameter, but that this appeared to be a plausible range
    - `Use draw-level values defined here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/cgf_correlation/ethiopia/treatment_data_draws.csv>`_
  * - :math:`C_{MAM}` (baseline)
    - Pakistan
    - 0.05 (point value); zero for those <6 months
    - Assumed to be the same as :math:`C_{SAM}` due to lack of data and fact that Pakistan national guideline suggests treatment for both SAM and MAM
    - 
  * - :math:`E_\text{SAM}`
    - Ethiopia
    - 0.70 (95% CI:0.64-0.76); normal distribution of uncertainty
    - [Bitew-et-al-2020]_
    - `Use draw-level values defined here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/cgf_correlation/ethiopia/treatment_data_draws.csv>`_
  * - :math:`E_{SAM}`
    - Nigeria
    - 0.712 (95% CI: 0.685–0.738); normal distribution of uncertainty
    - [Desyibelew-et-al-2020]_ Systematic review of sub-Saharan African countries as Nigerian-specific meta-analysis could not be found.  
    - TODO: generate draw-specific values
  * - :math:`E_{SAM}`
    - Pakistan
    - 0.88 (95% CI: 0.87, 0.89); normal distribution of uncertainty
    - [Aguayo-et-al-2020]_ NOTE: this value does not come from a meta-analysis, but a single study; uncertainty reflects only sample size of this study and no heterogeneity between studies.  
    - TODO: generate draw-specific values
  * - :math:`E_\text{MAM}`
    - Ethiopia, Nigeria, Pakistan
    - Location-specific :math:`E_\text{SAM}` value 
    - Assumption in lack of direct data
    - `Use draw-level values defined here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/cgf_correlation/ethiopia/treatment_data_draws.csv>`_

Affected Outcomes
+++++++++++++++++

The Vivarium modeling strategy above details how to solve for the transition rates among the covered and uncovered populations. However, the wasting treatment intervention will be implemented as a variable that affects the relative risk of certain transition rates between wasting states in the :ref:`dynamic wasting model <2021_risk_exposure_wasting_state_exposure>`. The following table details the relative risks for each dynamic wasting model transition rate that is affected by wasting treatment based on a given treatment category.

.. note::

  The :math:`E_{SAM}` and :math:`E_{MAM}` parameters will **NOT** vary between baseline and alterantive scenarios for the nutrition optimization model as they did for the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>`. 

  Because of this, the rate at which simulants covered by MAM/SAM treatment transition through the treated and untreated pathways will not vary by scenario as they did for the CIFF project. 

  We made this decision as there was no significant difference in response rate between standard of care and combined protocol arms of the COMPAS trial [Bailey-et-al-2020]_.

.. important::

  Treatment effects should only be applied to those 6-59 months of age and **not** to infants less than six months of age.

.. list-table:: Wasting transition rate relative risks for wasting treatment
  :header-rows: 1

  * - Transition
    - Treatment category
    - Value
    - Note
  * - rem_rate_mam
    - Untreated/uncovered by :math:`C_{MAM}`
    - :math:`\frac{r_{MAM,ux}}{r_{MAM,tx} * E_{MAM} + r_{MAM,ux} * (1 - E_{MAM})}`
    -
  * - tx_rem_rate_sam
    - Untreated/uncovered by :math:`C_{SAM}`
    - 0
    - :math:`\frac{0 * r_{SAM,tx}}{E_{SAM} * r_{SAM,tx}}`
  * - ux_rem_rate_sam
    - Untreated/uncovered by :math:`C_{SAM}`
    - :math:`1 / (1 - E_{SAM})`
    - :math:`\frac{r_{SAM,ux} * 1}{r_{SAM,ux} * (1 - E_{SAM})}`
  * - rem_rate_mam
    - Treated/covered by :math:`C_{MAM}`
    - 1
    -
  * - tx_rem_rate_sam
    - Treated/covered by :math:`C_{SAM}`
    - 1
    -
  * - ux_rem_rate_sam
    - Treated/covered by :math:`C_{SAM}`
    - 1
    -

**How to apply treatment effects at the simulant level**

For rate, :math:`r`, in [rem_rate_mam, ux_rem_rate_sam, tx_rem_rate_sam]:

.. math::

  r_i = r * (1 - PAF_{r}) * RR_\text{r, i (given C_i)}

Given,

.. math::

  PAF_{r} = \frac{\overline{RR_{r}} - 1}{\overline{RR_{r}}}

and

.. math::

  \overline{RR_{r}} = C * RR_{r, treated} + (1 - C) * RR_{r, untreated}

.. _WastingPropensityNote:

Coverage Propensities
++++++++++++++++++++++

The coverage propensity for wasting treatment parameter :math:`C` for any given simulant should update upon each transition between wasting states (in other words: a new propensity should be drawn from a independent uniform distribution). There should be no correlation between MAM and SAM treatment parameter propensity values.

.. note::

  This strategy was desgined to avoid the lower wasting treatment coverage among SAM/MAM states than among mild/TMREL states, `as shown here with fixed wasting treatment coverage propensities <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/2021_10_29a_ciff_sam_v4.1_vv_wasting_treatment_coverage.ipynb>`_.

  This strategy assumes that simulants who are treated for MAM and SAM once are no more likely to be treated again than simulants who have never been treated for SAM or MAM (despite need).

Targeted Coverage for MAM Treatment
+++++++++++++++++++++++++++++++++++

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
#. We are generalizing across the whole country. There is likely to be a lot of heterogeneity within the country.
#. We assume that MAM and SAM treatment effectivenesses are independent from one another.
#. We assume that individual simulant's propensity to respond to wasting treatment is independent of their previous response/non-response to treatment. According to [Bitew-et-al-2020]_, SAM treatment response rates are associated with diarrhea, oedema, and use of antibiotics in the treament course in Ethiopia. Additionally, vitamin A supplementation and distance from the treatment center may be associated with SAM treatment response rates, although direct evidence was not provided [Bitew-et-al-2020]_. We chose to make this assumption given the non-deterministic nature of these factors.
#. We assume that individuals who receive wasting treatment (according to parameter :math:`C`) but who do not respond to treatment according to parameters (according to parameter :math:`E_{SAM}` and :math:`E_{MAM}`) will exit the SAM state either through the :math:`r_{SAM,ux}` transition rate to the MAM state or the SAM-specific mortality rate and will exit the MAM state either through the :math:`r_{MAM,ux}` transition rate to mild wasting or the MAM-specific mortality rate. However, treatment non-responders (defined as not reaching recovery after two months of treatment) may represent especially complicated cases of MAM/SAM that may take longer to recovery and/or may have a higher mortality rate.
#. We are limited in that the estimate of the average duration of SAM in 6-59 month old children from the [Isanaka_2021]_ paper relies on survey estimates of SAM treatment coverage, which may be subject to bias.
#. We apply data of acute malnutrition measured using MUAC to our model that defines acute malnutrition according to WHZ scores. We assume that these definitions of acute malnutrition are good proxies of one another.

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Verify the relative risks for MAM and SAM *recovery* rates by treatment coverage status in the *Wasting transition rate relative risks for wasting treatment* table. 

#. Verify that the wasting *incidence* rates do not vary by treatment coverage. Incidence rates for this verification should be calculated as :math:`\frac{\text{incident MAM/SAM cases|treatment coverage status}}{\text{person time in mild/MAM wasting states|treatment coverage status}}` (note denominator is not total person time for treatment coverage status, which may differ between treatment coverage categories).

#. Validate child mortality rates stratified by SAM treatment coverage to the external data source [Laillou-et-al-2022-combined]_.

#. Verify that MAM and SAM prevalence among simulants covered by wasting treatment is less than MAM and SAM prevalence among simulants not covered by wasting treatment, such that, separately for each simulation scenario:

.. math::

  \frac{prevalence_\text{MAM|covered}}{prevalence_\text{MAM|uncovered}} \approx \frac{\text{time to recovery}_\text{effectively treated MAM} * E_\text{MAM} + \text{time to recovery}_\text{untreated MAM} * (1 - E_{MAM})}{\text{time to recovery}_\text{untreated MAM}}

and

.. math::

  \frac{prevalence_\text{SAM|covered}}{prevalence_\text{SAM|uncovered}} \approx \frac{\text{time to recovery}_\text{effectively treated SAM} * E_{SAM} + \text{time to recovery}_\text{untreated SAM} * (1 - E_{SAM})}{\text{time to recovery}_\text{untreated SAM}}

.. note::

  This verification criteria should be examined by age/sex/year strata as well as overall

References
----------

.. [Aguayo-et-al-2020]

  Aguayo VM, Badgaiyan N, Qadir SS, Bugti AN, Alam MM, Nishtar N, Galvin M. Community management of acute malnutrition (CMAM) programme in Pakistan effectively treats children with uncomplicated severe wasting. Matern Child Nutr. 2018 Nov;14 Suppl 4(Suppl 4):e12623. doi: 10.1111/mcn.12623. PMID: 30499254; PMCID: PMC6866122.

.. [Bailey-et-al-2020]

  Bailey J, Opondo C, Lelijveld N, Marron B, Onyo P, Musyoki EN, Adongo SW, Manary M, Briend A, Kerac M. A simplified, combined protocol versus standard treatment for acute malnutrition in children 6-59 months (ComPAS trial): A cluster-randomized controlled non-inferiority trial in Kenya and South Sudan. PLoS Med. 2020 Jul 9;17(7):e1003192. doi: 10.1371/journal.pmed.1003192. PMID: 32645109; PMCID: PMC7347103. https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1003192#sec018

.. [Bitew-et-al-2020]

  View `Bitew et al. 2020`_

    Treatment outcomes of severe acute malnutrition and predictors of recovery in under-five children treated within outpatient therapeutic programs in Ethiopia: a systematic review and meta-analysis

.. _`Bitew et al. 2020`: https://pubmed.ncbi.nlm.nih.gov/32631260

.. [Desyibelew-et-al-2020] 

  View `Desyibelew et al. 2020`_

    Desyibelew HD, Bayih MT, Baraki AG, Dadi AF. The recovery rate from severe acute malnutrition among under-five years of children remains low in sub-Saharan Africa. A systematic review and meta-analysis of observational studies. PLoS One. 2020 Mar 18;15(3):e0229698. doi: 10.1371/journal.pone.0229698. PMID: 32187182; PMCID: PMC7080262.

.. _`Desyibelew et al. 2020`: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7080262/

.. [Isanaka-et-al-2021]

  View `Isanaka et al. 2021`_

    Improving estimates of the burden of severe wasting: analysis of secondary prevalence and incidence data from 352 sites

.. _`Isanaka et al. 2021`: https://gh.bmj.com/content/6/3/e004342


.. [Laillou-et-al-2022-combined]

  View `Laillou et al. 2022 <https://pubmed.ncbi.nlm.nih.gov/35349221/>`_

    Laillou A, Baye K, Guerrero Oteyza SI, Abebe F, Daniel T, Getahun B, Chitekwe S. Estimating the number of deaths averted from 2008 to 2020 within the Ethiopian CMAM programme. Matern Child Nutr. 2022 Mar 29:e13349. doi: 10.1111/mcn.13349. Epub ahead of print. PMID: 35349221.
