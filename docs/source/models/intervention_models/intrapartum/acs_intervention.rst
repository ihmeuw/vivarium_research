.. _acs_intervention:

=======================================================
Antenatal corticosteroids for treating preterm with RDS
=======================================================

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - BEmONC
    - Basic emergency obstetric and neonatal care
    - Operationalized as facilities without C-section capabilities
  * - CEmONC
    - Comprehensive emergency obstetric and neonatal care
    - Operationalized as facilities with capabilities to perform  C-section
  * - PAF
    - Population Attributable Fraction
    - 
  * - RR
    - Relative Risk
    - 
  * - Antenatal corticosteroids
    - ACS
    - In some references, the acronym 'ANS' is used instead (i.e., antenatal steroids), but for consistency across all
      relevant documentation, we use 'ACS'.
  * - Respiratory Distress Syndrome
    - RDS
    - See the :ref:`Preterm cause model <2021_cause_preterm_birth_mncnh>` for more details on how we are modeling preterm mortality
      with RDS.
  * - Gestational Age
    - GA
    -

Intervention Overview
-----------------------

Antenatal corticosteroid (ACS) therapy is an intrapartum intervention that ensures rapid maturation of the preterm fetal lung,
thus preventing respiratory distress syndrome (RDS) in preterm infants. 

Current WHO guidance ([WHO-2022]_) recommends ACS therapy for women and birthing parents at risk of imminent preterm birth from 
24 to 34 weeks of gestation when the following 5 conditions are met: 

  1. Accurate gestational age (GA) assessment 
  2. Preterm birth is imminent (within 7 days)
  3. No clinical evidence of maternal infection exists
  4. Adequate childbirth care is available
  5. Adequate preterm newborn care is available (including infection treatment and CPAP as needed)

[WHO-2022]_ recommends a single dose of intramuscular dexamethasone (for early preterm births in particular - see [Oladapo-et-al-2020]_) or 
intramuscular betamethasone (for late preterm births in particular - see [Gyamfi-Bannerman-et-al-2023]_) as the ACS regimen of choice. In our 
simulation, we will specifically model the impact of dexamethasone on the mortality of preterm infants with RDS (based on [Brownfoot-et-al-2013]_
which found that dexamethasone was more effective.)

.. note:: 

  You may notice in subsequent sections of this document that our eligibility criteria to receive ACS based on GA differs from these WHO guidelines.
  This is based on clinical insight from BMGF that early or moderate preterm pregnancies (26-33 weeks of GA) are provided ACS. See limitations section 
  for more details.

This section describes how an ACS intervention can be implemented and calibrated for the :ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>`.
See the :ref:`Preterm cause model <2021_cause_preterm_birth_mncnh>` for more information (such as how we are separating the GBD cause 'preterm' into 'preterm with RDS' and 'preterm
without RDS').

.. list-table:: Affected Outcomes
  :widths: 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note (ex: is this relationship direct or mediated?)
  * - Preterm with RDS Mortality Risk :math:`\text{CSMRisk}_i^\text{preterm with RDS}`
    - Adjust multiplicatively using RR
    - Yes 
    - 
      - :ref:`Preterm cause model <2021_cause_preterm_birth_mncnh>` 
      - For convenience, we will model this like a dichotomous risk factor; more details below

Baseline Coverage Data
++++++++++++++++++++++++

We will model scaling up of the CPAP and ACS interventions together (both target preterm with RDS), based on insight from the BMGF team as well as the WHO guidelines listed above.
As such, our ACS intervention will have the same baseline coverage values as the CPAP intervention, so please see 
the :ref:`CPAP intervention baseline coverage section <intervention_neonatal_cpap>` for reference. 

To define individual-level coverage of ACS and CPAP (i.e., the RDS intervention bundle), please use the RDS intervention propensity 
value defined on the :ref:`Initial Attributes module page <2024_vivarium_mncnh_portfolio_initial_attributes_module>` to ensure the same
simulants are exposed to both interventions (i.e., if coverage of both CPAP and ACS is x%, then the same x% of simulants will be getting each intevention).

Vivarium Modeling Strategy
--------------------------

To be eligible to receive the ACS intervention (see the :ref:`intrapartum intervention module document <2024_vivarium_mncnh_portfolio_intrapartum_interventions_module>` 
for how to obtain this information in the MNCNH portfolio simulation), a simulant must be expected to give birth to a early or moderate preterm infant with a believed GA
of 26 to 33 weeks.

This intervention requires adding an attribute to all simulants who expect to give birth to a preterm infant (i.e., based on believed GA if 26 to 33 weeks from 
pregnancy module output)  to specify if a parent-child dyad receives ACS or not.  We will track this and the model will 
have different mortality rates for preterm with RDS for parent-child dyads with and without ACS (implemented with a slightly confusing application 
of our ``Risk`` and ``RiskEffect`` components from ``vivarium_public_health``).

The ``Risk`` component adds an attribute to each simulant indicating whether the simulant has received ACS during the intrapartum period. 

To make this work naturally with the ``RiskEffect`` component, it is best to think of the risk as "no ACS".  With this framing, the ``RiskEffect`` 
component requires data on (1) the relative risk of preterm with RDS mortality for people who did not receive ACS, and (2) the population attributable fraction (PAF) of preterm with
RDS deaths due to not receiving ACS.  We will use the decision tree below to estimate the probability of preterm with RDS mortality with and without the use of ACS, ensuring consistency
with the baseline delivery facility rates and baseline ACS coverage.

In Vivarium, this risk effect will modify the preterm with RDS mortality pipeline, resulting in 

.. math::

   \text{CSMRisk}_i^\text{preterm with RDS} = \text{CSMRisk}^\text{preterm with RDS} \cdot (1 - \text{PAF}_\text{no ACS}) \cdot \text{RR}_i^\text{no ACS}

where :math:`\text{RR}_i^\text{no ACS}` is simulant *i*'s individual relative risk for "no ACS", meaning :math:`\text{RR}_i^\text{no ACS} = \text{RR}_\text{no ACS}` 
if simulant *i* does not receive ACS, and :math:`\text{RR}_i^\text{no ACS} = 1` if simulant *i* receives ACS. 

The relative risk value we will use is pulled from [Oladapo-et-al-2020]_, a BMGF-funded multicountry RCT which investigated the impact
of ACS for pregnant women and people at imminent risk of preterm delivery.


.. list-table:: Risk Effect Parameters for No ACS
  :widths: 15 15 15 15
  :header-rows: 1

  * - Parameter
    - Value
    - Source
    - Notes
  * - :math:`\text{RR}^\text{no ACS}`
    - :math:`1/\text{RR}^\text{ACS}`
    - N/A
    - Value to be used in sim for lack of access to ACS (i.e. for both :math:`\text{RR_ACS | CPAP}` and :math:`\text{RR_ACS | no CPAP}`, for more
      on why we have the assumption that :math:`\text{RR_ACS | CPAP} =  \text{RR_ACS | no CPAP}`, please see the limitations section below.)
  * - :math:`\text{RR}^\text{ACS}`
    - RR = 0.84 (95% CI 0.72-0.97). Parameter uncertainty implemented as a lognormal distribution: :code:`get_lognorm_from_quantiles(0.84, 0.72, 0.97)`
    - [Oladapo-et-al-2020]_
    - 
  * - PAF
    - see below
    - see below
    - see the :ref:`CPAP intervention Calibration Strategy <intervention_neonatal_cpap>` for details on how to calculate PAF that is consistent with RR, risk exposure, and facility choice model.
      No adjustments are needed to the PAF calculation for ACS, as it is the same as the CPAP intervention.

Assumptions and Limitations
---------------------------

- We assume that ACS availability estimates provided to us by the HS team captures actual use of dexamethasone, and not simply the treatment being in the facility. 
- We assume that the delivery facility is also the facility where a mother or birthing person will seek care for their preterm infant with RDS.
- We assume that the relative risk of preterm with RDS mortality with ACS in practice is a value that we can find in the literature. Note: 
  the value we are using is from [Oladapo-et-al-2020]_, a BMGF-funded multicountry RCT which compared neonatal mortality for women at imminent
  risk of preterm birth (i.e., expected to give birth in next 48 hours) that received intramuscular dexamethasone (6mg dosage) versus a placebo. 
  Both groups (test and control groups) in the trial had access to CPAP, so the effect size reported for ACS is specific to ACS in the presence of
  CPAP, rather than pertaining to the cumulative effect size of ACS and CPAP together. 
- We assume that ``(RR_ACS | CPAP) = (RR_ACS | no CPAP)``. This is because of the assumption that ACS affects RDS incidence while CPAP affects RDS 
  case fatality, so by definition CPAP could not modify the effect of RDS under these assumptions it comes too late in the causal chain.
- We assume that the baseline coverage of ACS in the delivery facility is the same as the baseline coverage of CPAP in the delivery facility, 
  which is based on the [WHO-2022]_ recommendation that ACS only be administered where adequate preterm childcare is available, including CPAP.
- We assume that the observed reduction in neonatal deaths in this RCT are due to a decrease in incidence of respiratory distress. We currently 
  use [Oladapo-et-al-2020]_'s RR value for early neonatal death, but could instead use their RR for severe respiratory distress at 24 hours, 
  which is a significantly more impactful value (0.56, 0.37-0.85), however is not explicitly about mortality, which is what we are modeling. 
  The RR for severe respiratory distress at 1 week is more similar to the value we currently use (0.81, 95% CI 0.37-0.85). 
- This paper also reported a statistically significant effect on neonatal hypoglycemia incidence, but this conflicts with other literature findings 
  (e.g. [Gyamfi-Bannerman-et-al-2023]_), so we are not including this effect. 
- [Oladapo-et-al-2020]_ also reports country-specific RR values, including Pakistan and Nigeria. For now however, we use the mean value across the 
  6 countries included in their analysis, for simplicity. Lastly, [Oladapo-et-al-2020]_ provides an effect size for ACS on early preterm birth 
  (26-33 weeks of gestation), but if we want to specifically model the impact on late preterm birth (34-36 weeks of gestation) we could use the 
  estimates reported in [Gyamfi-Bannerman-et-al-2023]_ which looked at the use of betamethasone instead of dexamethasone.
- We assume that the Health Systems estimates processed from various Ethiopian healthcare assessments (see Baseline Coverage section
  for more details) provide an accurate overview of ACS use in our locations of interest.
- We assume that baseline coverage for ACS in home births is 0% (given the WHO 2022 recommendation that ACS only be administered where adequate
  preterm childcare is available, including CPAP).
- We use the same propensity values for the CPAP and ACS interventions such that the same simulants will be exposed to both, given the WHO 2022 
  recommendation that ACS only be administered where adequate preterm childcare is available, including CPAP.
- We use the [WHO-2022]_ recommendations on ACS use for improving preterm births as the basis of ACS eligibility criteria. However, [Greensides-et-al-2018]_ 
  reviewed country-specific guidelines for ACS use and found that neither Nigeria nor Ethiopia national documents (all 2015 or older) stated that GA must be accurately undertaken 
  (see Table 4 in their publication), therefore we simply use the believed GA from the pregnancy module, regardless of how accurate we think the estimate was (i.e. if birthing parent got an ultrasound).
  We do not consider anything related to ultrasound exposure for the 'accurate GA dating' criteria in the [WHO-2022]_ recommendations.
- Despite the fact that our preterm cause model (based on the GBD cause) considers under 37 weeks of gestation, and despite the [WHO-2022]_ recommendations 
  that infants with 24-34 weeks of gestation receive ACS, we will only apply the ACS intervention to simulants with 26-33 weeks of gestation, based BMGF assumptions (see email from CT on 6/30/2025).

.. todo::

  - If we can find more suitable baseline coverage data for ACS use for all of our locations (particularly Nigeria and Pakistan), we will update accordingly. 
  - Decide we want to use a different RR value than what we're currently using, we need to update that accordingly.

.. note:: 

  There is a trial called ACTION-3 that has an anticipated readout this year that will inform the effectiveness of ACS for late preterm (34-36 weeks)
  which BMGF team will share with us when possible. We will adjust our effect size accordingly when that information is received.

Validation and Verification Criteria
------------------------------------

**Model validation**
- Using the interactive sim, check RDS and all-cause mortality rates between 33 weeks with ACS coverage and 34 weeks (no ACS coverage due to ineligibility). If mortality is LOWER in the 33 week with ACS than 34 weeks, we may need to revisit our strategy of assigning the fraction of RDS among preterm births in a way that does not consider gestational age at birth (logically early preterm births should have more RDS than late preterm births).

**Model verification**
- Population-level neonatal mortality rate of preterm birth with RDS in the baseline scenario should continue to validate.
- The ratio of preterm with RDS mortality among those without ACS divided by those with ACS should equal the relative risk parameter used in the model.
- The baseline coverage of ACS in each facility type should match the values in the artifact.
- Confirm that the same propensity value is used for ACS and CPAP (when coverage is equal, there should be no eligible simulants who have one intervention and not the other).
- In the interactive sim, make sure there is no coverage of ACS outside of the eligible gestational age range.

References
------------

.. [Brownfoot-et-al-2013]
  Brownfoot FC, Gagliardi DI, Bain E, Middleton P, Crowther CA. Different corticosteroids and regimens for accelerating fetal lung maturation for women at risk of preterm birth. Cochrane Database of Systematic Reviews 2013, Issue 8. Art. No.: CD006764. DOI: 10.1002/14651858.CD006764.pub3.

.. [Gyamfi-Bannerman-et-al-2023]
  Gyamfi-Bannerman C, Thom EA, Blackwell SC, Tita AT, Reddy UM, Saade GR, Rouse DJ, McKenna DS, Clark EA, Thorp JM Jr, Chien EK, Peaceman AM, Gibbs RS, Swamy GK, Norton ME, Casey BM, Caritis SN, Tolosa JE, Sorokin Y, VanDorsten JP, Jain L; NICHD Maternal–Fetal Medicine Units Network. Antenatal Betamethasone for Women at Risk for Late Preterm Delivery. N Engl J Med. 2016 Apr 7;374(14):1311-20. doi: 10.1056/NEJMoa1516783. Epub 2016 Feb 4. Erratum in: N Engl J Med. 2023 May 4;388(18):1728. doi: 10.1056/NEJMx220010. PMID: 26842679; PMCID: PMC4823164.

.. [Greensides-et-al-2018]
  Greensides D, Robb-McCord J, Noriega A, Litch JA. Antenatal Corticosteroids for Women at Risk of Imminent Preterm Birth in 7 sub-Saharan African Countries: A Policy and Implementation Landscape Analysis. Glob Health Sci Pract. 2018 Dec 27;6(4):644-656. doi: 10.9745/GHSP-D-18-00171. PMID: 30573455; PMCID: PMC6370350.

.. [Oladapo-et-al-2020]
  WHO ACTION Trials Collaborators; Oladapo OT, Vogel JP, Piaggio G, Nguyen MH, Althabe F, Gülmezoglu AM, Bahl R, Rao SPN, De Costa A, Gupta S, Baqui AH, Khanam R, Shahidullah M, Chowdhury SB, Ahmed S, Begum N, D Roy A, Shahed MA, Jaben IA, Yasmin F, Rahman MM, Ara A, Khatoon S, Ara G, Akter S, Akhter N, Dey PR, Sabur MA, Azad MT, Choudhury SF, Matin MA, Goudar SS, Dhaded SM, Metgud MC, Pujar YV, Somannavar MS, Vernekar SS, Herekar VR, Bidri SR, Mathapati SS, Patil PG, Patil MM, Gudadinni MR, Bijapure HR, Mallapur AA, Katageri GM, Chikkamath SB, Yelamali BC, Pol RR, Misra SS, Das L, Nanda S, Nayak RB, Singh B, Qureshi Z, Were F, Osoti A, Gwako G, Laving A, Kinuthia J, Mohamed H, Aliyan N, Barassa A, Kibaru E, Mbuga M, Thuranira L, Githua NJ, Lusweti B, Ayede AI, Falade AG, Adesina OA, Agunloye AM, Iyiola OO, Sanni W, Ejinkeonye IK, Idris HA, Okoli CV, Irinyenikan TA, Olubosede OA, Bello O, Omololu OM, Olutekunbi OA, Akintan AL, Owa OO, Oluwafemi RO, Eniowo IP, Fabamwo AO, Disu EA, Agbara JO, Adejuyigbe EA, Kuti O, Anyabolu HC, Awowole IO, Fehintola AO, Kuti BP, Isah AD, Olateju EK, Abiodun O, Dedeke OF, Akinkunmi FB, Oyeneyin L, Adesiyun O, Raji HO, Ande ABA, Okonkwo I, Ariff S, Soofi SB, Sheikh L, Zulfiqar S, Omer S, Sikandar R, Sheikh S, Giordano D, Gamerro H, Carroli G, Carvalho J, Neilson J, Molyneux E, Yunis K, Mugerwa K, Chellani HK. Antenatal Dexamethasone for Early Preterm Birth in Low-Resource Countries. N Engl J Med. 2020 Dec 24;383(26):2514-2525. doi: 10.1056/NEJMoa2022398. Epub 2020 Oct 23. PMID: 33095526; PMCID: PMC7660991.

.. [WHO-2022]
  WHO recommendations on antenatal corticosteroids for improving preterm birth outcomes. Geneva: World Health Organization; 2022. Licence: CC BY-NC-SA 3.0 IGO. https://iris.who.int/bitstream/handle/10665/363131/9789240057296-eng.pdf?sequence=1