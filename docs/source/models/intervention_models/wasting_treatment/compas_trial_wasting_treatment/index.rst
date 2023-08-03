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

Changes to the modeling strategy from the previously implemented version include:

- Isolation of the :math:`\text{time to diagnosis}` parameter
- Updated value for :math:`\text{time to recovery}_\text{effectively treated SAM}`
- Updated value for :math:`\text{time to recovery}_\text{effectively treated SAM}`
- :math:`E_\text{MAM}` and :math:`E_\text{SAM}` parameters no longer vary by scenario

Otherwise, the modeling strategy remains the same.

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

.. list-table:: Annual recovery rate equations
  :header-rows: 1

  * - Parameter
    - Definition
    - Value
    - Note
  * - :math:`r_{SAM,ux}`
    - Annual transition rate from SAM to MAM among those not effectively covered by SAM treatment
    - :math:`\frac{k - r_{SAM,tx} * C_{SAM} * E_{SAM} - mortality_{SAM|a,s,l,y}}{1 - C_{SAM} * E_{SAM}}`
    - See constant values in table below and the :ref:`Ethiopian program CMAM page<intervention_wasting_treatment>` for details on equation derivation. Previously referred to as :math:`r2_{ux}`
  * - :math:`r_{SAM,tx}`
    - Annual transition rate from SAM to mild wasting among those effectively treated for SAM
    - :math:`365 / (\text{time to diagnosis} + \text{time to recovery}_\text{effectively treated SAM})`
    - See constant values in table below. Previously referred to as :math:`t1_{SAM}`
  * - :math:`r_{MAM,ux}`
    - Annual transition rate from MAM to mild wasting among those not effectively covered by MAM treatment
    - :math:`365 / \text{time to recovery}_\text{untreated MAM}`
    - See constant values in table below. Previously referred to as :math:`r3_{ux}`
  * - :math:`r_{MAM,tx}`
    - Annual transition rate from MAM to mild wasting among those effectively treated for MAM
    - :math:`365 / (\text{time to diagnosis} + \text{time to recovery}_\text{effectively treated MAM})`
    - See constant values in table below. Previously referred to as :math:`t2_{MAM}`

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
  * - :math:`\text{time to recovery}_\text{untreated MAM}`
    - 147 
    - point value
    - No update
    - Transition rate of 1/21 weeks derived from [James-et-al-2016]_ (Ethiopia) `in this notebook <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/wasting_transitions/alibow_ki_database_rates/Calculation%20of%20James%20paper%20MAM%20to%20mild%20rate.ipynb>`_
  * - :math:`\text{time to recovery}_\text{effectively treated MAM}`
    - 63 days
    - point value
    - Update from prior version
    - Median value ~9 weeks from S5 fig, WAITING ON NUMERIC UPDATE; [Bailey-et-al-2020]_
  * - :math:`k`
    - 3.5 (95% CI: 3.1-3.9)
    - lognormal
    - See notes on uncertainty distribution and interpretation of this value below on the :ref:`Ethiopian program CMAM page<intervention_wasting_treatment>`
    - [Isanaka-et-al-2021]_
  * - :math:`mortality_{SAM|a,s,l,y}`
    - Mortality rate among SAM wasting state
    - N/A
    - :ref:`Defined on the wasting documentation <2021_risk_exposure_wasting_state_exposure>`
    - GBD

.. list-table:: Location-specific parameter values
  :header-rows: 1

  * - Parameter
    - Location
    - Value
    - Source
  * - :math:`C_{SAM}` (baseline)
    - Ethiopia
    - 0.488 (95% CI:0.374-0.604), normal distribution of uncertainty
    - [Isanaka-et-al-2021]_
  * - :math:`C_{MAM}` (baseline)
    - Ethiopia
    - 0.15 (95% CI: 0.1, 0.2), normal distribution of uncertainty
    - Informed through discussion with CIFF/UNICEF that reported there is not reliable data on this parameter, but that this appeared to be a plausible range
  * - :math:`E_\text{SAM}`
    - Ethiopia
    - 0.70 (95% CI:0.64-0.76); normal distribution of uncertainty
    - [Bitew-et-al-2020]_
  * - :math:`E_\text{MAM}`
    - Ethiopia
    - :math:`E_\text{SAM}` value for Ethiopia
    - Assumption in lack of direct data

Affected Outcomes
+++++++++++++++++

The Vivarium modeling strategy above details how to solve for the transition rates among the covered and uncovered populations. However, the wasting treatment intervention will be implemented as a variable that affects the relative risk of certain transition rates between wasting states in the :ref:`dynamic wasting model <2021_risk_exposure_wasting_state_exposure>`. The following table details the relative risks for each dynamic wasting model transition rate that is affected by wasting treatment based on a given treatment category.

.. note::

  The :math:`E_{SAM}` and :math:`E_{MAM}` parameters will **NOT** vary between baseline and alterantive scenarios for the nutrition optimization model as they did for the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>`. 

  Because of this, the rate at which simulants covered by MAM/SAM treatment transition through the treated and untreated pathways will not vary by scenario as they did for the CIFF project. 

  We made this decision as there was no significant difference in response rate between standard of care and combined protocol arms of the COMPAS trial [Bailey-et-al-2020]_.

.. list-table:: Wasting transition rate relative risks for wasting treatment
  :header-rows: 1

  * - Transition
    - Treatment category
    - Value
    - Note
  * - r3
    - Untreated/uncovered by :math:`C_{MAM}`
    - :math:`\frac{r_{MAM,ux}}{r_{MAM,tx} * E_{MAM} + r_{MAM,ux} * (1 - E_{MAM})}`
    -
  * - t1
    - Untreated/uncovered by :math:`C_{SAM}`
    - 0
    - :math:`\frac{0 * r_{SAM,tx}}{E_{SAM} * r_{SAM,tx}}`
  * - r2
    - Untreated/uncovered by :math:`C_{SAM}`
    - :math:`1 / (1 - E_{SAM})`
    - :math:`\frac{r_{SAM,ux} * 1}{r_{SAM,ux} * (1 - E_{SAM})}`
  * - r3
    - Treated/covered by :math:`C_{MAM}`
    - 1
    -
  * - t1
    - Treated/covered by :math:`C_{SAM}`
    - 1
    -
  * - r2
    - Treated/covered by :math:`C_{SAM}`
    - 1
    -

**How to apply treatment effects at the simulant level**

For rate, :math:`r`, in [r3, r2, t1]:

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

.. [Bailey-et-al-2020]

  Bailey J, Opondo C, Lelijveld N, Marron B, Onyo P, Musyoki EN, Adongo SW, Manary M, Briend A, Kerac M. A simplified, combined protocol versus standard treatment for acute malnutrition in children 6-59 months (ComPAS trial): A cluster-randomized controlled non-inferiority trial in Kenya and South Sudan. PLoS Med. 2020 Jul 9;17(7):e1003192. doi: 10.1371/journal.pmed.1003192. PMID: 32645109; PMCID: PMC7347103. https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1003192#sec018

.. [Bitew-et-al-2020]

  View `Bitew et al. 2020`_

    Treatment outcomes of severe acute malnutrition and predictors of recovery in under-five children treated within outpatient therapeutic programs in Ethiopia: a systematic review and meta-analysis

.. _`Bitew et al. 2020`: https://pubmed.ncbi.nlm.nih.gov/32631260

.. [Isanaka-et-al-2021]

  View `Isanaka et al. 2021`_

    Improving estimates of the burden of severe wasting: analysis of secondary prevalence and incidence data from 352 sites

.. _`Isanaka et al. 2021`: https://gh.bmj.com/content/6/3/e004342

.. [James-et-al-2016]

  View `James 2016`_

    Children with Moderate Acute Malnutrition with No Access to Supplementary Feeding Programmes Experience High Rates of Deterioration and No Improvement

.. _`James 2016`: https://pubmed.ncbi.nlm.nih.gov/PMC4839581

.. [Laillou-et-al-2022-combined]

  View `Laillou et al. 2022 <https://pubmed.ncbi.nlm.nih.gov/35349221/>`_

    Laillou A, Baye K, Guerrero Oteyza SI, Abebe F, Daniel T, Getahun B, Chitekwe S. Estimating the number of deaths averted from 2008 to 2020 within the Ethiopian CMAM programme. Matern Child Nutr. 2022 Mar 29:e13349. doi: 10.1111/mcn.13349. Epub ahead of print. PMID: 35349221.
