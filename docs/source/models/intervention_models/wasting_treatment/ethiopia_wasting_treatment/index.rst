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

.. _intervention_wasting_treatment:

===============================================
Treatment and management for acute malnutrition
===============================================

.. contents::
   :local:
   :depth: 1


.. list-table:: Abbreviations
  :widths: 5 15
  :header-rows: 1

  * - Abbreviation
    - Definition
  * - FMOH
    - Federal ministry of health
  * - SAM
    - severe acute malnutrition
  * - MAM
    - moderate acute malnutrition
  * - DHS
    - demographic health survey
  * - IMNICI
    - Integrated Management of Newborn and Childhood illness
  * - HEWs
    - Health Extension Workers
  * - HDA
    - Health Development Army
  * - HDG
    - Health Development Group
  * - HP
    - Health post
  * - OTP
    - Outpatient Therapeutic Programme
  * - TSFP
    - Targeted Supplementary Feeding Programme
  * - SC
    - Stablisation Centre
  * - PSNP
    - Productive Safety Net Programme
  * - TSFP
    - Targeted Supplementary Feeding Programme
  * - BSFP
    - Blanket Supplementary Feeding Programme
  * - IYCF
    - Infant and young child feeding
  * - WFL
    - weight-for-length z-score (used in EMOH guideline)
  * - WFH
    - weight-for-height z-score (used in EMOH guideline)
  * - WLZ
    - weight-for-length z-score (used in GBD)
  * - WHZ
    - weight-for-height z-score (used in GBD)
  * - SQUEAC
    - Simplified Lot Quality Assurance Sampling Evaluation of Access and Coverage
  * - tx
    - Treated or treatment
  * - utx
    - Not treated
  * - EPI
    - Expanded programme on immunization
  * - CMAM
    - Community-based management of acute malnutrition
  * - CTC
    - Community-based therapeutic care

This documentation focuses on treatment and management of acute malnutrition in Ethiopia based on 2019 National Guideline for the Management of Acute Malnutrition. [EMOH]_

The prevalence of stunting in Ethiopia has declined from 58% in 2000 to 38% in 2016. However, the prevalence of wasting has remained fairly static at 12% in 2000 and 10% in 2016. To address malnutrition in all its forms, the Government is applying two programmatic approaches. The first focuses on increasing access to and availability of food through improved economic growth, better agricultural production systems along with promotion of good nutrition practices and prevention of malnutrition. The second approach aims to strengthen early warning systems and timely emergency response, including wide-scale delivery of services for the management of acute
malnutrition.

The Federal Ministry of Health (FMOH) developed the first Protocol for the Management of Severe Acute
Malnutrition (SAM) in 2007, and the Guideline for the Management of Moderate Acute Malnutrition (MAM)
in 2012. This is the latest National Guideline for the Management of Acute Malnutrition in Ethiopia (2019). It includes the latest World Health Organisation (WHO) guidelines and recommendations, and emerging national and international evidence. It is also aligned to the National Nutrition Programme (NNP) II 2016-2020, the National Food and Nutrition Policy and the Health Sector Transformation Plan (HSTP) 2015/16 - 2019/20.


.. _waste_tx1.0:

Intervention Overview
---------------------

This flow chart summarizes the core aspects of the care and treatment for SAM and MAM, and integration into the
routine health system.

.. image:: flow_chart_management_of_acute_malnutrition.svg
   :alt: Flow chart of management of acute malnutrition

.. todo::

   Add a general narrative overview of the intervention, including what it is, what outcomes it affects, if/how/when/where it has been used, etc.

.. _waste_tx1.1:

Health system delivery
++++++++++++++++++++++

Interventions for wasting treatment are delivered through different levels of the health system.

:underline:`Community and household level`

 Community outreach ensures early identification of SAM and MAM cases. Community outreach also aims to empower communities and families to understand the causes of malnutrition, and prevent and manage acute malnutrition in their communities. Health Extension Workers (HEWs) collaborate with the community-based structures such as health committees and engage with the Health Development Army (HDA)/Health Development Group (HDG) to screen and refer cases to the appropriate service for treatment.

:underline:`Health post level`

 The HPs provide primary health care services such as disease prevention and control, hygiene and environmental sanitation, family health services, and health education and communication. The service provider at the HP works closely with the network of the HDA/HDG to facilitate the management of SAM and MAM. The service provider diagnoses acute malnutrition and provides Outpatient Therapeutic Programme (OTP) and Targeted Supplementary Feeding Programme (TSFP) services. They also determine patients who have medical complications and refer them to the Stablisation Centre (SC).

:underline:`Health center level`

 The HC provides 24-hour SC for the management of SAM with medical complications. The HC also manages and provides technical support to a cluster of one to five HPs within its vicinity.

:underline:`Hospital level`

 Woreda, Zonal, Regional and referral Hospitals provide higher level referral points where further care can be provided to patients with SAM and more complex medical complications. The referral Hospitals have the facilities and expertise to manage situations that may require administration of oxygen, blood transfusion, and other critical care.

.. _waste_tx2.0:

Assessing and classifying acute malnutrition
--------------------------------------------

The classification and management of SAM and MAM comes from the 2019 National Guideline for the Management of Acute Malnutrition. [EMOH]_
which are based on the 2013 WHO guidelines on management of SAM in children and infant [WHO_2013_SAM_guidelines]_

:download:`2019 guidelines<guidelines_2019.pdf>`

.. note::

    - In GBD, SAM and MAM are classified as using WHZ score. In reality, GBD-MAM kids with oedema are treated as SAM kids. The proportion (sequelae) of GBD-MAM kids with oedema is approximately 2%. In our model these will be classified as MAM.

Notably, recent evidence has emerged that a revised treatment protocol that does not distinguish between MAM and uncomplicated SAM may be more desireable than traditional treatment protocols with ready to use supplementary foods (RUSF) and ready to use therapeutic foods (RUTF) used for SAM [Cazes-et-al-2022]_. However, we have not updated the treatment modeling strategy accordingly, which would involve updating the time to response of treated MAM parameter to be slightly less than the existing value from [Ackatia_Armah_2015tx]_.

Severe acute malnutrition (SAM)
+++++++++++++++++++++++++++++++

SAM in infants (0-6 months)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

:underline:`Classify SAM in infants`

* Any grade of bilateral pitting oedema (+, ++ or +++) OR
* WHZ < -3 zscore

Treatment of infants with SAM in the SC

NOTE: All infants 0-6 months of age with SAM with or without medical complications should be referred to the SC.


SAM in children (>6 months)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Since 2007, a new model of care called community-based therapetic care (CTC) or community-based management of acute malnutrition (CMAM) has been endorsed for the treatment of acute malnutrition which addresses the limitations of previous inpatient therapeutic feeding programmes. Patients with severe malnutrition, with good appetite and without medical complications are treated in the outpatient therapeutic programme (OTP) that provides ready-to-use therapeutic food (RUTF) and medicines to treat simple conditions. The food and medicines are taken home and patient attends OTP site weekly for monitoring and resupply.

Severely malnourished persons with medical complications and/or anorexia are treated in an inpatient stabilization center (SC) where they receive standard World Health Organization (WHO)- recommended initial care until they have enough appetite and are well enough to continue with outpatient care. Approximately 10-15% of children in CMAM programmes require inpatient care at the stabilisation centers and the average length-of-stay at an SC is 14 days before they are transferred out to an OTP. [Scott_2020]_ [Tekeste_2012]_

:underline:`Classify SAM without medical complications`

* Bilateral pitting oedema + or ++ OR
* WHZ <-3 z-scores AND
* Appetite test passed
* No medical complications
* Clinically well and alert

Treatment of children with SAM in OTP

- Admit in OTP (outpatient) programme
- Treatment and care are provided at home with weekly follow-up visits at a nearby health facility.
- Give routine medications.

:underline:`Classify SAM with medical complications`

* Any grade of bilateral pitting oedema (+, ++, +++) OR
* WHZ < -3 zscore OR
* Presence of any medical complications (see guideline for full list)

Treatment of children with SAM in SC

- Admit to SC (inpatient)
- Give antibiotics
- Stabilisation phase: F-75 for 7 days
- Transition phase: introduce RUTF gradually with F-75 or F-100 if cannot tolerate RUTF
- Rehabilitation phase: Child transfers from SC to OTP and recieves RUTF in OTP

Discharge criteria

 - Cured = Has reached discharge criteria for SAM treatment: WHZ ≥ -2 z-scores, no bilateral pitting oedema, clinically alert and well.
 - Died = Dies while receiving treatment in the OTP.
 - Defaulted = Absent for two consecutive visits.
 - Non-responder = Does not reach the SAM discharge criteria after 16 weeks (4 months) in treatment.
 - Transferred out = Condition has deteriorated or not responding to treatment according to action protocol and referred for treatment
   in the SC, or moved out to receive OTP in another facility


MAM in infants (0-6 months)
+++++++++++++++++++++++++++

:underline:`Classify MAM in infants`

* MUAC of lactatating mother of infant 0-6 months <23.0 cm
* WHZ ≥-3 to <-2 AND
* No bilateral pitting oedema AND
* No medical complications
* Clinically well and alert

Treatment of infants with MAM

Assess the infant’s feeding and counsel the mother or caregiver on appropriate IYCF practices. Emphasize on establishing effective exclusive breastfeeding. If feeding problems, follow up in 5 days. If no feeding problem, follow up in 30 days. Admit the mother to TSFP. Refer the mother for Productive Safety Net Programme (PSNP).


MAM in children >6 months
+++++++++++++++++++++++++

:underline:`Classify MAM in children`

* WHZ ≥ -3 to <-2 z scores AND
* No bilateral pitting oedema
* No medical complications
* Clinically well and alert

Treatment of children with MAM

Admit in TSFP (preferably with RUSF) and counsel on appropriate IYCF practices.


Costs
+++++

A full literature review of costs for CMAM programme is in [Njuguna_2020]_.

1. Cost per child (>6 months) treated for SAM $134.88 2007 USD [Tekeste_2012]_
2. Cost per child (>6 months) treated for MAM using RUSF $38.10 2015 USD [Isanaka_cost_2019]_

For MAM, total costs of MAM treatment were calculated for 5 weeks of follow-up because the mean time to recovery was between 4 and 5 weeks. [Isanaka_cost_2019]_


No acute malnutrition
+++++++++++++++++++++

:underline:`Classify no acute malnutrition in infants`

* WHZ ≥-2 zscores AND
* No bilateral pitting oedema

**Treatment**

Congratulate and counsel the mother on appropriate IYCF practices.

.. todo::
    What about MAM with oedema? Are they treated as SAM or MAM?
    Answer: they are treated as MAM in GBD, but in reality, probably SAM. MAM with oedema is approximately 2% of MAM.

:underline:`Classify no acute malnutrition children`

* WHZ ≥ -2 z score AND
* No bilateral pitting oedema

**Treatment**
Congratulate and counsel the mother on appropriate IYCF practices.


.. todo::

  Fill out the following table with a list of known outcomes affected by the intervention, regardless of if they will be included in the simulation model or not, as it is important to recognize potential unmodeled effects of the intervention and note them as limitations as applicable.

.. list-table:: Affected Outcomes
  :widths: 15 15 15 30
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note (ex: is this relationship direct or mediated?)
  * - Time-to-recovery
    - Decreases
    - Yes
    - Direct relationship
  * - Death rate
    - Decreases death rate among the treated
    - No
    - Currently we do not have the relative risk of death of treated/untreated. We will capture some of the effect of tx on death by having the simulants recover faster, therefore leave the high risk wasting states faster. However, by assigning tx simulants the mean death rate when they should have a lower death rate, we are killing more than we should in our sim, hence we might be under-estimating the effect of treatment. (For untreated ppl, we are assigning them the mean death rate when in reality they would have a higher death rate. We under-estimate the harm of not-treating)
  * - Treatment coverage (C)
    - Increases
    - Yes
    - We increase from baseline to 90%.  1-C is uncovered population. (Can do more sensitivity analysis on this)
  * - Efficacy of treatment (E)
    - Increases
    - Yes
    - 'treatment coverage (C)' x 'treatment efficacy (E)' is the 'Effective treatment coverage (CE)'.
  * - Proportion defaulted/unresponsive during programme
    - Decreases
    - Yes
    - As E increases, the porportion not *effectively* covered (C-CE) decreases.


Baseline Coverage Data
++++++++++++++++++++++

The aim and priority in community-based services for the management of acute malnutrition is to reach as many of those affected as possible and to access acutely malnourished children in the *early stages* of their disease. Achieving these goals will maximise impact and the capacity of the service to meet need. Good coverage is a key determinant in **meeting need**. It is important therefore to evaluate coverage, not just  to  assess  the  degree  to  which  need  is  being  met,  but  also  to  understand  what  factors  affect  access and  uptake  of  services,  in  order  to  initiate  action  to  ensure  the  greatest  number  of  people  needing treatment are able to benefit from it. **Coverage can  be  defined  as  the  proportion  of  all  people  needing  or  eligible  to  receive  a  service  who actually  receive  that  service**. [CMAM_Forum_coverage]_

  Treatment coverage = :math:`\frac{\text{Children with MAM/SAM recieving treatment}}{\text{Total number of MAM/SAM kids}}`

Treatment coverage should not be confused with geographical coverage.

  Geographical coverage (GC) = :math:`\frac{\text{Healthcare facilities/communities delivering MAM/SAM treatments}}{\text{Total number of facilities/communities}}`

Geographic coverage attempts to measure the *availability* of services which does not equate with the *service access* and *uptake*.

**Effectively covered** is the product of the treatment coverage and the treatment efficacy (proportion of the treated who were cured or 'cure-rate').

  - Effective coverage (EC) = :math:`\text{treatment coverage}\times\text{treatment efficacy}`

  - Not effectively covered = 1 - effective coverage

.. image:: effective_coverage_figure.svg

| SAM programme treatment coverage: 48.8% (37.4-60.4) (this is a point coverage; assumes programmes are not good at case finding) [Isanaka_2021]_
| MAM programme treatment coverage: Per discussion with CIFF/UNICEF, there is not reliable data avilable for this parameter, but it may be between 10 and 20 percent and often scales-up in response to emergencies. Note: this website tracks measures related to SAM coverage: https://acutemalnutrition.org/en/countries

.. todo::

  Discuss how coverage is estimated (SQUEAC surveys). Discuss difference in point-coverage and period-coverage.

See the `parameter values table`_ for coverage and effictiveness values for use in the model.

.. note::

  I would like to understand from SWEs what happens when they change age groups, do those on the cusp spontaneously recover? I guess that would make sense...those who survive are stronger than those who died; also prevalence doesn't change that much between 28day-5 years.


.. _waste_tx3.0:

Vivarium Modeling Strategy
--------------------------

**Wasting treatment will be modeled among children aged 6 months to five years of age.**

.. todo::

  Consider sensitivity analysis that includes infants less than 6 months of age in wasting treatment episode. Due to sparse data on wasting treatment in this age group, this sensitivity analysis will require assumptions such as "what if" wasting treatment were half as effective among infants less than six months of age as it is among children 6-59 months and could be run as an additional simulation scenario.

.. image:: treatment_diagram.svg
   :alt: Compartmental diagram with treatment

So,

 - :math:`r2_{ux} = r_{SAM,ux} = \frac{t}{\text{median time-to-recovery (days) of utx SAM}}`
 - :math:`t1_{sam} = r_{SAM,tx} = \frac{t}{\text{median time-to-recovery (days) of tx SAM}}`
 - :math:`r3_{ux} = r_{MAM,ux} = \frac{t}{\text{median time-to-recovery (days) of utx MAM}}`
 - :math:`t2_{mam} = r_{MAM,tx} = \frac{t}{\text{median time-to-recovery (days) of tx MAM}}`

where t is the period for which transition the is estimated (a year) eg. 365 days using days as the unit and the duration of time-to-recovery is age-specific and "treated" refers to *effective* treatment.

.. todo::

  Update figure to new parameter names. Update was made to distinguish difference between these parameters (for wasting treatment model) and the related parameters for the wasting exposure model.

.. _untreated-sam-time-to-recovery-reference-label:

.. list-table:: Annual recovery rate equations
  :header-rows: 1

  * - Parameter
    - Value
    - Note
  * - :math:`r_{SAM,ux}`
    - :math:`\frac{k - r_{SAM,tx} * C_{SAM} * E_{SAM} - mortality_{SAM|a,s,l,y}}{1 - C_{SAM} * E_{SAM}}`
    - See constant values in table below and equation derivation below table. Ali to confirm and potentially update this equation. Previously referred to as :math:`r2_{ux}`
  * - :math:`r_{SAM,tx}`
    - :math:`365 / \text{time to recovery}_\text{effectively treated SAM}`
    - See constant values in table below. Previously referred to as :math:`t1_{SAM}`
  * - :math:`r_{MAM,ux}`
    - :math:`365 / \text{time to recovery}_\text{untreated MAM}`
    - See constant values in table below. Previously referred to as :math:`r3_{ux}`
  * - :math:`r_{MAM,tx}`
    - :math:`365 / \text{time to recovery}_\text{effectively treated MAM}`
    - See constant values in table below. Previously referred to as :math:`t2_{MAM}`

.. _`parameter values table`:

.. _`wasting-treatment-baseline-parameters`:

.. note::

  We may increase the :math:`\text{time to recovery}` parameters to reflect some amount of time it takes to access MAM and SAM treatment after meeting the clinical criteria for each respective condition. This will be done in tandem with validation of the wasting transition rates from our simulation with those observed in the KI database (from BMGF).

.. list-table:: Parameter Values
  :header-rows: 1

  * - Parameter
    - Population
    - Value
    - Distribution
    - Note
    - Source
  * - :math:`\text{time to recovery}_\text{effectively treated SAM}`
    - 6-59 months old
    - 48.3 + 14 = **62.3**
    - point value
    - Studies censored participants who did not recover in estimation of median time to recovery. 48.3 value is a weighted average between seven studies reported by [Zw_2020tx]_. Assume an average two week treatment delay. Random effects meta analysis would improve this estimate (see todo note below).
    - [Zw_2020tx]_; Ethiopia
  * - :math:`\text{time to recovery}_\text{untreated MAM}`
    - 6-59 months old
    - 147 
    - point value
    - Used MUAC definition of malnutrition.
    - Transition rate of 1/21 weeks derived from [James_2016]_ (Ethiopia) `in this notebook <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/wasting_transitions/alibow_ki_database_rates/Calculation%20of%20James%20paper%20MAM%20to%20mild%20rate.ipynb>`_
  * - :math:`\text{time to recovery}_\text{effectively treated MAM}`
    - 6-59 months old
    - 41.3 (95% CI: 34.4, 49) + 14 = **55.3 (95% CI: 48.4, 63)**
    - normal
    - Censored participants who did not recover in estimation of median time to recovery.
    - [Ackatia_Armah_2015tx]_ (Mali). Added an assumed average 2 week time to treatment delay.
  * - :math:`C_{SAM}`
    - 6-59 months old
    - 0.488 (95% CI:0.374-0.604)
    - normal
    - Baseline scenario value; defined as the number in the program / number that should be in the program 
    - [Isanaka_2021]_
  * - :math:`C_{MAM}`
    - 6-59 months old
    - 0.15 (95% CI: 0.1, 0.2)
    - normal
    - Baseline scenario value. 
    - Informed through discussion with CIFF/UNICEF that reported there is not reliable data on this parameter, but that this appeared to be a plausible range
  * - :math:`E_\text{SAM}`
    - 6-59 months old
    - 0.70 (95% CI:0.64-0.76)
    - normal
    - baseline scenario value
    - [Zw_2020tx]_
  * - :math:`E_\text{MAM}`
    - 6-59 months old
    - 0.731 (95% CI:0.585-0.877)
    - normal
    - baseline scenario value
    - [Ackatia_Armah_2015tx]_
  * - :math:`k`
    - 6-59 months old
    - 3.5 (95% CI: 3.1-3.9)
    - lognormal
    - See notes on uncertainty distribution and interpretation of this value below. 
    - [Isanaka_2021]_
  * - :math:`mortality_{SAM|a,s,l,y}`
    - GBD demographic group
    - Mortality rate among SAM wasting state
    - N/A
    - :ref:`defined on the wasting documentation <2020_risk_exposure_wasting_state_exposure>`
    - GBD

.. note::

  A note on the incidence correction factor, :math:`k`:

    The incidence correction factor :math:`k` is = :math:`\frac{t}{\text{average duration of disease}}`, where :math:`t` is the period for which incidence is estimated (a year) eg. 365 days using days as the unit. Note that the average duration of disease in this equation is **not** conditional on recovery from SAM, unlike the :math:`\text{time to recovery}` parameters. Therefore, the average duration of disease is *lower* and :math:`k` is greater than it would be if it were conditional on recovery from SAM in the same manner as the :math:`\text{time to recovery}` parameters.

    k = :math:`\frac{\text{number of incident cases}}{\text{number of prevalent cases}}` see [Isanaka_2021]_ for full proof and equations.

    Number of incident cases = :math:`\frac{\text{annual programme admissions}}{\text{treatment coverage}}`

    Note: [Isanaka_2021]_ relies on estimates of SAM treatment coverage to estimate the incidence correction factor/average duration of disease in Ethiopia. SAM treatment coverage is a parameter that is difficult to estimate and measurement may be prone to bias. SAM treatment coverage in the [Isanaka_2021]_ is estimated through standardized surveys [SQUEAC-SLEAC]_

    **We have chosen to use the global average value of 3.5 (95% CI: 3.1-3.9) rather than the value specific to Ethiopia of 6.7(95% CI: 5.3-8.4) for this parameter from [Isanaka_2021]_ given that it results in wasting transition rates that are more similar to those observed in the KI database in a sensitivity analysis for model validation, `shown in this notebook <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/wasting_transitions/alibow_ki_database_rates/KI_rates_5.3.3.ipynb>`_**

.. note::

  To define an appropriate lognormal distribution for the uncertainty in
  :math:`k`, we will assume that the distribution has geometric mean 6.7 with a
  central 95% confidence interval approximately equal to (5.3, 8.4). This is a
  reasonable assumption since

  .. math::
    \sqrt{5.3 \times 8.4} = 6.672330927044911... \approx 6.7,

  whereas :math:`(5.3+8.4)/2 = 6.85>6.7`, so the confidence interval is
  asymmetric, with 6.7 being closer to the geometric mean of the endpoints than
  to the arithmetic mean. To create an appropriate lognormal distribution, see
  the :ref:`algorithm for fitting a lognormal distribution
  <lognorm_from_median_lower_upper_code_block>` to a specified median and
  confidence interval on the :ref:`Statistical Distributions of Uncertainty
  <vivarium_best_practices_statistical_distributions>` page (note that the
  median of a lognormal distribution equals its geometric mean).

.. todo::

    Confirm validity of uncertainty distribution assumptions.

    Try to update the weighted time-to-recovery for SAM children admitted to OTP. There are 7 studies from the Zw 2020 paper that reports median (IQR) time to recovery in table 1. The 48.3 days currently in the table is just a weighted average. It would be better to find a way to get the summary value (random effects?) with the uncertainty distribution. Nathanial might have a way to do this.

Deriving :math:`r_{SAM,ux}` using the following equations:

#. :math:`r_{SAM,ux} = 1 / \text{time to recovery}_\text{untreated SAM}`

#. :math:`r_{SAM,tx} = 1 / \text{time to recovery}_\text{effectively treated SAM}`

#. 

.. math::

  1 / \text{time to recovery}_\text{overall SAM} =  

  1 / \text{time to recovery}_\text{effectively treated SAM} * C_{SAM} * E_{SAM} 

  + 1 / \text{time to recovery}_\text{untreated SAM} * (1 - C_{SAM} * E_{SAM})

4. :math:`1 / duration_\text{overall SAM} = 1 / \text{time to recovery}_\text{overall SAM} + mortality_{SAM|a,s,l,y}`

5. :math:`duration_\text{overall SAM} = 365 / k`

So...

  :math:`1 / duration_\text{overall SAM} - mortality_{SAM|a,s,l,y} = r_{SAM,tx} * C_{SAM} * E_{SAM} + r_{SAM,ux} * (1 - C_{SAM} * E_{SAM})`

  ...

  :math:`k / 365 = r_{SAM,tx} * C_{SAM} * E_{SAM} + r_{SAM,ux} * (1 - C_{SAM} * E_{SAM}) + mortality_{SAM|a,s,l,y}`

  ...

  :math:`r_{SAM,ux} = \frac{k/365 - r_{SAM,tx} * C_{SAM} * E_{SAM} - mortality_{SAM|a,s,l,y}}{1 - C_{SAM} * E_{SAM}}`

.. note::

  A note about modeling wasting treatment in infants under six months of age.

  The following parameter values were identified prior to the decision to exclude infants under six months of age from the wasting treatment model and are included below for reference.

  .. list-table:: Parameter Values Among Infants <6 months (not modeled)
    :header-rows: 1

    * - Parameter
      - Population
      - Value
      - Distribution
      - Note
      - Source  
    * - :math:`\text{time to recovery}_\text{effectively treated SAM}`
      - 0-6 months old
      - mean: 13.3, sd: 6.9
      - normal
      - NOTE: this study reports mean duration of stay in the inpatient therapeutic feeding center rather than time to recovery. It is currently being implemented as time to recovery in our model. Of note, 85% of participants were successfully discharged in this study.
      - [Vygen_2013]_; Niger
    * - :math:`\text{time to recovery}_\text{effectively treated MAM}`
      - 0-6 months old
      - 20.8
      - point value
      - NOTE: this study reports mean duration of therapy without specifying if this duration is conditional on recovery. It is currently being implemented as time to recovery in our model. Of note, 81% of participants were successfully discharged in this study.
      - [Woeltje_2020]_; Malawi


Affected Outcomes
+++++++++++++++++

The Vivarium modeling strategy above details how to solve for the transition rates among the covered and uncovered populations. However, the wasting treatment intervention will be implemented as a variable that affects the relative risk of certain transition rates between wasting states in the :ref:`dynamic wasting model <2020_risk_exposure_wasting_state_exposure>`. The following table details the relative risks for each dynamic wasting model transition rate that is affected by wasting treatment based on a given treatment category.

.. warning::

  The :math:`E_{SAM}` and :math:`E_{MAM}` parameters vary between baseline and alterantive scenarios for the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>` (see the :ref:`alternative scenario values here <wasting-treatment-alterative-scenario-values>`). This will cause the rate at which simulants covered by MAM/SAM treatment transition through the treated and untreated pathways to vary by scenario (the treated pathway transition rate will be greater and the untreated pathway transition rate will be lower in the alternative scenario relative to the the baseline scenario). This should be reflected in the implementation of the treatment model (such as separate intervention "risk factor" components for baseline and alternative treatments).

  Also, :math:`E_{SAM}` and :math:`E_{MAM}` fractions may depend on diarrheal status in later model builds.

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

Coverage Propensities
++++++++++++++++++++++

The coverage propensity for wasting treatment parameter :math:`C` for any given simulant should update upon each transition between wasting states (in other words: a new propensity should be drawn from a independent uniform distribution). There should be no correlation between MAM and SAM treatment parameter propensity values.

.. note::

  This strategy was desgined to avoid the lower wasting treatment coverage among SAM/MAM states than among mild/TMREL states, `as shown here with fixed wasting treatment coverage propensities <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/2021_10_29a_ciff_sam_v4.1_vv_wasting_treatment_coverage.ipynb>`_.

  This strategy assumes that simulants who are treated for MAM and SAM once are no more likely to be treated again than simulants who have never been treated for SAM or MAM (despite need).

Restrictions
++++++++++++

For treatment of SAM and MAM, we model treatment starting at six months of age. This is true for both baseline and treatment scale-up scenarios. 

Note that for the exposure, we model a 'birth prevalence' which is the prevalence of wasting of the XXX age group extrapolated to the neonatal age groups. This is to ensure our XXX age groups initialize at the correct prevalences to start the wasting transitions.

Also note that since wasting and LBWSG are correlated, those with more severe wasting will have higher likelihood to die in the first six months of life as those with lower birthweights have higher risk of death. This might lead to a bias in our wasting exposures at the post-neonatal age groups to favour healthier babies and should be investigated in model results.

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
  * - Note
    -
    -

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. We are not applying a differential death rate to those effectively covered vs not effectively covered. Potential excess mortality associated with untreated SAM relative to treated SAM is analyzed in an analysis by [Laillou-et-al-2022]_, which suggests it may be equal to 138.52 per 1,000 child-years. 
#. We are generalizing across the whole country. There is likely to be a lot of heterogeneity within the country.
#. We assume that MAM treatment coverage is equal to SAM treatment coverage. Given that SAM treatment is more intensive than MAM treatment, we may underestimate MAM treatment coverage as a result of this assumption.
#. We assume that MAM and SAM treatment effectivenesses are independent from one another.
#. We assume that individual simulant's propensity to respond to wasting treatment is independent of their previous response/non-response to treatment. According to [Zw_2020tx]_, SAM treatment response rates are associated with diarrhea, oedema, and use of antibiotics in the treament course in Ethiopia. Additionally, vitamin A supplementation and distance from the treatment center may be associated with SAM treatment response rates, although direct evidence was not provided [Zw_2020tx]_. We chose to make this assumption given the non-deterministic nature of these factors.
#. We assume that individuals who receive wasting treatment (according to parameter :math:`C`) but who do not respond to treatment according to parameters (according to parameter :math:`E_{SAM}` and :math:`E_{MAM}`) will exit the SAM state either through the :math:`r_{SAM,ux}` transition rate to the MAM state or the SAM-specific mortality rate and will exit the MAM state either through the :math:`r_{MAM,ux}` transition rate to mild wasting or the MAM-specific mortality rate. However, treatment non-responders (defined as not reaching recovery after two months of treatment) may represent especially complicated cases of MAM/SAM that may take longer to recovery and/or may have a higher mortality rate.
#. We are limited in that the estimate of the average duration of SAM in 6-59 month old children from the [Isanaka_2021]_ paper relies on survey estimates of SAM treatment coverage, which may be subject to bias.
#. We assume that there is no MAM or SAM treatment among infants less than six months. (Potential sensitivity analysis to follow)

.. note::

  Additional assumption if we were to model wasting treatment among infants under six months of age given currently available and identified data: The time to recovery of treated MAM and SAM among 0-6 month old infants in our model is informed by studies that reported mean duration of treatment without specifying if deaths/non-response to treatment/lost to follow-up were censored in the calculation [Vygen_2013]_, [Woeltje_2020]_. The structure of our model treats the time to recovery of treated MAM/SAM variables as the time to recovery *among individuals who recovered*. 15% and 19% of patients in the respective studies did not recover, which could cause duration of treatment among all treated individuals to differ from duration of treatment (time to recovery) among treated individuals who recovered, which would bias our model.

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Verify the relative risks for MAM and SAM *recovery* rates by treatment coverage status in the *Wasting transition rate relative risks for wasting treatment* table. Note that the relative risks will vary between the baseline and alternative scenarios given the reliance of the relative risks on :math:`E_{MAM}` and :math:`E_{SAM}` values, which vary between simulation scenarios.


#. Verify that the wasting *incidence* rates do not vary by treatment coverage. Incidence rates for this verification should be calculated as :math:`\frac{\text{incident MAM/SAM cases|treatment coverage status}}{\text{person time in mild/MAM wasting states|treatment coverage status}}` (note denominator is not total person time for treatment coverage status, which may differ between treatment coverage categories).

#. Validate child mortality rates stratified by SAM treatment coverage to the external data source [Laillou-et-al-2022]_.

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

.. [EMOH] Government of Ethiopia, Federal Ministry of Health. 2019.
   National Guideline for the Management of Acute
   Malnutrition. Addis Ababa: FMOH.


.. [WHO_2013_SAM_guidelines]

  View `WHO 2013 SAM guidelines`_

    Updates on the management of severe acute malnutrition in infants and children

.. _`WHO 2013 SAM guidelines`: https://www.who.int/publications/i/item/9789241506328


.. [Isanaka_2021]

  View `Isanaka 2021`_

    Improving estimates of the burden of severe wasting: analysis of secondary prevalence and incidence data from 352 sites

.. _`Isanaka 2021`: https://gh.bmj.com/content/6/3/e004342


.. [Cazes-et-al-2022]
  View `Cazes et al. 2022 <https://pubmed.ncbi.nlm.nih.gov/35303461/>`_

  Cazes C, Phelan K, Hubert V, Boubacar H, Bozama LI, Sakubu GT, Tshiala BK, Tusuku T, Alitanou R, Kouamé A, Yao C, Gabillard D, Kinda M, Daures M, Augier A, Anglaret X, Shepherd S, Becquet R. Simplifying and optimising the management of uncomplicated acute malnutrition in children aged 6-59 months in the Democratic Republic of the Congo (OptiMA-DRC): a non-inferiority, randomised controlled trial. Lancet Glob Health. 2022 Apr;10(4):e510-e520. doi: 10.1016/S2214-109X(22)00041-9. Erratum in: Lancet Glob Health. 2022 May;10(5):e626. 

.. [CMAM_Forum_coverage]

  View `CMAM Forum coverage`_

    Assessment of Coverage of Community-based Management of Acute Malnutrition

.. _`CMAM Forum coverage`: https://www.ennonline.net/assessmentofcmamcoveragev2


.. [Isanaka_cost_2019]

  View `Isanaka 2019`_

    Cost-effectiveness of community-based screening and treatment of moderate acute malnutrition in Mali

.. _`Isanaka 2019`: http://www.ncbi.nlm.nih.gov/pubmed/31139441


.. [Laillou-et-al-2022]

  View `Laillou et al. 2022 <https://pubmed.ncbi.nlm.nih.gov/35349221/>`_

    Laillou A, Baye K, Guerrero Oteyza SI, Abebe F, Daniel T, Getahun B, Chitekwe S. Estimating the number of deaths averted from 2008 to 2020 within the Ethiopian CMAM programme. Matern Child Nutr. 2022 Mar 29:e13349. doi: 10.1111/mcn.13349. Epub ahead of print. PMID: 35349221.

.. [Scott_2020]

  View `Scott 2020`_

    Ending malnutrition in all its forms requires scaling up proven nutrition interventions and much more: a 129-country analysis

.. _`Scott 2020`: http://www.ncbi.nlm.nih.gov/pubmed/33183301


.. [Tekeste_2012]

  View `Tekeste 2012`_

    Cost effectiveness of community-based and inpatient therapeutic feeding programs to treat severe acute malnutrition in Ethiopia

.. _`Tekeste 2012`: http://www.ncbi.nlm.nih.gov/pubmed/PMC3323427


.. [Njuguna_2020]

  View `Njuguna 2020`_

    Cost and cost-effectiveness analysis of treatment for child undernutrition in low- and middle-income countries: A systematic review

.. _`Njuguna 2020`: http://www.ncbi.nlm.nih.gov/pubmed/33102783


.. [Vygen_2013]

  View `Vygen 2013`_

    Treatment of Severe Acute Malnutrition in Infants Aged <6 Months in Niger

.. _`Vygen 2013`: https://pubmed.ncbi.nlm.nih.gov/33102783


.. [Ackatia_Armah_2015tx]

  View `Ackatia Armah 2015tx`_

    Malian children with moderate acute malnutrition who are treated with lipid-based dietary supplements have greater weight gains and recovery rates than those treated with locally produced cereal-legume products: a community-based, cluster-randomized trial

.. _`Ackatia Armah 2015tx`: https://pubmed.ncbi.nlm.nih.gov/25733649


.. [Zw_2020tx]

  View `Zw 2020tx`_

    Treatment outcomes of severe acute malnutrition and predictors of recovery in under-five children treated within outpatient therapeutic programs in Ethiopia: a systematic review and meta-analysis

.. _`Zw 2020tx`: https://pubmed.ncbi.nlm.nih.gov/32631260


.. [James_2016]

  View `James 2016`_

    Children with Moderate Acute Malnutrition with No Access to Supplementary Feeding Programmes Experience High Rates of Deterioration and No Improvement

.. _`James 2016`: https://pubmed.ncbi.nlm.nih.gov/PMC4839581


.. [Woeltje_2020]

  View `Woeltje 2020`_

    Community-Based Management of Acute Malnutrition in Infants Under 6 Months of Age

.. _`Woeltje 2020`: https://academic.oup.com/cdn/article/4/Supplement_2/1102/5845720?login=true

.. [SQUEAC-SLEAC]

  View `SQUEAC-SLEAC Technical Reference`_ 

  Myatt M, Guevarra E, Fieschi L. Semi-Quantitative Evaluation of
  Access and Coverage (SQUEAC)/ Simplified Lot Quality Assurance
  Sampling Evaluation of Access and Coverage (SLEAC) Technical
  Reference. USAID Food and Nutrition Technical Assistance III 2012.

.. _`SQUEAC-SLEAC Technical Reference`: https://www.spring-nutrition.org/publications/tool-summaries/semi-quantitative-evaluation-access-and-coverage-squeacsimplified-lot#:~:text=Brief%20Description%3A%20The%20semi%2Dquantitative,essential%20determinants%20of%20quality%20community%2D
