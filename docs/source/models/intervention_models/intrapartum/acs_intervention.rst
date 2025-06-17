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
intramuscular betamethasone (for late preterm births in particular - see [Gyamfi-Bannerman-et-al-2023]_) as the ACS regimen of choice.

This section describes how an ACS intervention can be implemented and calibrated for the :ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>`.
See the :ref:`Preterm cause model <2021_cause_preterm_birth_mncnh>` for more information (such as how we are separating the GBD Cause 'preterm' into 'preterm with RDS' and 'preterm
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

As we continue to seek data for all locations of interest, we will use estimates that the Health
Systems team has processed and sent to us from a variety of Ethiopian data sources, including: 

- Ethiopian Emergency Obstetric and Newborn Care (EmONC) Assessment 2016
- Performance Monitoring for Action (PMA) 2019-2023
- Services Availability and Readiness Assessment (SARA) 2016 and 2018
- Service Provision Assessment (SPA) 2014 and 2021

.. list-table:: Baseline Coverage of ACS
  :widths: 15 15 15 15 15
  :header-rows: 1

  * - Location
    - Birth Facility
    - Coverage Mean (%)
    - Coverage Distribution (%)
    - Notes
  * - All (Ethiopia, Nigeria, Pakistan)
    - Home Birth
    - 0
    - N/A
    - Assumption based on WHO 2022 recommendation requiring adequate preterm childcare such as CPAP 
  * - All (Ethiopia, Nigeria, Pakistan)
    - BEmONC Facilities
    - 12.85
    - :math:`\text{Uniform}(2.19,25.60)`
    - From Health Systems team estimates saved at ``/snfs1/Project/simulation_science/mnch_grant/MNCNH portfolio/sim_science_estimates.csv``
  * - All (Ethiopia, Nigeria, Pakistan)
    - CEmONC Facilities
    - 76.29
    - :math:`\text{Uniform}(66.63,89.23)`
    - From Health Systems team estimates saved at ``/snfs1/Project/simulation_science/mnch_grant/MNCNH portfolio/sim_science_estimates.csv``


Vivarium Modeling Strategy
--------------------------

Intervention eligibility criteria (see the intrapartum intervention module document for how to obtain this information in the MNCNH portfolio simulation):

This intervention requires adding an attribute to all simulants to specify if a pregnant person receives ACS during labor or not.  We will track this
and the model will have different mortality rates for maternal sepsis for individuals with and without ACS (implemented with a slightly confusing application of our ``Risk`` and ``RiskEffect`` 
components from ``vivarium_public_health``).

The ``Risk`` component adds an attribute to each simulant indicating whether the simulant has ACS during the intrapartum period, which we assume will be closely 
related to the facility choice during birth, i.e. home births have much lower access than in-facility births, and births in BEmONC facilities have lower access than CEmONC 
facilities.

To make this work naturally with the ``RiskEffect`` component, it is best to think of the risk as "no ACS".  With this framing, the ``RiskEffect`` 
component requires data on (1) the relative risk of maternal sepsis incidence for people who did not receive ACS before labor began, and (2) the population attributable fraction (PAF) of maternal sepsis 
due to not receiving ACS.  We will use the decision tree below to estimate the probability of maternal sepsis incidence with and without the use of ACS, ensuring consistency
with the baseline delivery facility rates and baseline ACS coverage.

In Vivarium, this risk effect will modify the maternal sepsis incidence pipeline, resulting in 

.. math::

   \text{IR}_i^\text{maternal sepsis} = \text{IR}^\text{maternal sepsis}_ \cdot (1 - \text{PAF}_\text{no ACS}) \cdot \text{RR}_i^\text{no ACS}

where :math:`\text{RR}_i^\text{no ACS}` is simulant *i*'s individual relative risk for "no ACS", meaning :math:`\text{RR}_i^\text{no ACS} = \text{RR}_\text{no ACS}` 
if simulant *i* does not receive ACS, and :math:`\text{RR}_i^\text{no ACS} = 1` if simulant *i* receives ACS. 

The relative risk value we will use is pulled from [Ye-et-al-2024-ACS-during-labor]_, a 2024 systematic review that investigated the effect of 
ACS during labor.

.. list-table:: Risk Effect Parameters for No ACS
  :widths: 15 15 15 15
  :header-rows: 1

  * - Parameter
    - Mean
    - Distribution
    - Notes
  * - Relative Risk
    - 1.19
    - Parameter uncertainty implemented as a lognormal distribution: :code:`get_lognorm_from_quantiles(1.19, 1.03, 1.39)`
    - Based on relative risk of 0.84 (95% CI 0.72-0.97) on neonatal mortality for parent-child dyads receiving ACS [Oladapo-et-al-2020]_.
  * - PAF
    - see below
    - see below
    - see `Calibration strategy` section below for details on how to calculate PAF that is consistent with RR, risk exposure, and facility choice model

Calibration Strategy
--------------------

The following decision tree shows all of the paths from delivery facility choice to ACS use.  Distinct paths in the tree correspond to disjoint events, 
which we can sum over to find the population probability of maternal sepsis incidence.  The goal here is to use internally consistent conditional probabilities of maternal sepsis incidence
for the subpopulations that receive or do not receive ACS, so that the baseline scenario can track who receives ACS and still match the baseline maternal sepsis 
incidence rate.

.. graphviz::

    digraph ACS {
        rankdir = LR;
        facility [label="Facility type"]
        home [label="p_maternal_sepsis_without_ACS"]
        BEmONC [label="ACS?"]
        CEmONC [label="ACS?"]
        BEmONC_wo [label="p_maternal_sepsis_without_ACS"] 
        BEmONC_w [label="p_maternal_sepsis_with_ACS"]
        CEmONC_wo [label="p_maternal_sepsis_without_ACS"] 
        CEmONC_w [label="p_maternal_sepsis_with_ACS"]

        facility -> home  [label = "home birth"]
        facility -> BEmONC  [label = "BEmONC"]
        facility -> CEmONC  [label = "CEmONC"]

        BEmONC -> BEmONC_w  [label = "available"]
        BEmONC -> BEmONC_wo  [label = "unavailable"]

        CEmONC -> CEmONC_w  [label = "available"]
        CEmONC -> CEmONC_wo  [label = "unavailable"]
    }

.. math::
    \begin{align*}
        p(\text{maternal_sepsis}) 
        &= \sum_{\text{paths without ACS}} p(\text{path})\cdot p(\text{maternal_sepsis}|\text{no ACS})\\
        &+ \sum_{\text{paths with ACS}} p(\text{path})\cdot p(\text{maternal_sepsis}|\text{ACS})\\[.1in]
        p(\text{maternal_sepsis}|\text{no ACS}) &= \text{RR}_\text{no ACS} \cdot p(\text{maternal_sepsis}|\text{ACS})
    \end{align*}

where :math:`p(\text{maternal_sepsis})` is the probability of contracting maternal sepsis in the general population, and :math:`p(\text{maternal_sepsis}|\text{ACS})` and
:math:`p(\text{maternal_sepsis}|\text{no ACS})` are the probability of contracting maternal sepsis in settings with and without receiving ACS.  For each 
path through the decision tree, :math:`p(\text{path})` is the probability of that path; for example the path that includes the edges labeled BEmONC and 
unavailable occurs with probability that the birth is in a BEmONC facility times the probability that the simulant receives ACS.

When we fill in the location-specific values for delivery facility rates, ACS coverage, relative risk of maternal sepsis incidence with ACS, 
and maternal sepsis incidence probability (which is also age-specific), this becomes a system of two linear equations with two unknowns (:math:`p(\text{maternal_sepsis}|\text{ACS})` 
and :math:`p(\text{maternal_sepsis}|\text{no ACS})`), which we can solve analytically using the same approach as in the :ref:`cpap calibration <cpap_calibration>`.

**Alternative PAF Derivation**: An alternative, and possibly simpler derivation of the PAF that will calibrate this model comes from the observation that
:math:`\text{PAF} = 1 - \frac{1}{\mathbb{E}(\text{RR})}`.  If we define 

.. math::

   p(\text{no ACS}) = \sum_{\text{paths without ACS}} p(\text{path}),

then can use this to expand the identity

.. math::

   \text{PAF}_\text{no ACS} = 1 - \frac{1}{\mathbb{E}(\text{RR})}.

Since our risk exposure has two categories,

.. math::

   \mathbb{E}(\text{RR}) = p(\text{no ACS}) \cdot \text{RR}_\text{no ACS} + (1 - p(\text{no ACS})) \cdot 1.




Assumptions and Limitations
---------------------------

- We assume that ACS availability captures actual use, and not simply the treatment being in the facility. 
- We assume that the delivery facility is also the facility where a mother or birthing person will seek care for maternal sepsis.
- We assume that the relative risk of maternal sepsis incidence with ACS in practice is a value that we can find in the literature (Note: 
  the value we are using is from [Ye-et-al-2024-ACS-during-labor]_.)
- We have excluded the effect of ACS on pneumonia incidence/mortality, because this cause is currently lumped with 'other causes'.
- We currenty do not model the impact of ACS taken during pregnancy on the incidence of preterm births, despite *some* literature
  evidence that suggests there may be a significant impact. Currently, we are ony modeling the impact of ACS taken during labor, rather
  than during pregnancy. We may include in a future iteration of this model the use of ACS during pregnancy as a treatment for sexually
  transmitted infections, in which case we may reassess this limitation. For reference, [Hume-Nizon-et-al-2021-ACS-during-pregnancy]_
  found an RR of 0.79 (95% CI 0.68-0.93) for LBW and an RR of 0.87 (95% CI 0.78-0.98) for premature births. They also reported an 
  increase in stillbirth incidence. However, more recent publications (the 2024 review referenced above and [Antonucci-et-al-2022-ACS-during-pregnancy]_) 
  have reported that there is no conclusive evidence to support that ACS use by pregnant women causes adverse 
  neonatal outcomes. 
- We also do not currently model the impact intrapartum ACS has on preventing maternal sepsis in partial term pregnancies. In our 
  :ref:`Maternal sepsis and other maternal infections cause model <2021_cause_maternal_sepsis_mncnh>`, we only model full term pregnancies as 
  at-risk for maternal sepsis.
- We assume that [Saleem-et-al-2025-intrapartum-antibiotic-use]_ provides an accurate overview of prophylactic intrampratum antibiotic use in our locations of interest.
  As such, we assume baseline coverage of intrapartum ACS use in African sites is basically zero (despite EmONC 2016, SARA 2016, and SARA 2018 reporting the
  presence of intrapartum antibiotics in hospitals to be nonzero - we assume these are given to mothers or birthing parents after delivery, which is not the intervention
  we are modeling here). There was a baseline coverage of 20.3% for Pakistan hospitals though, which we assume is accurate.
- We assume that baseline coverage for ACS in home births is 0% (this is not data-backed).

.. todo::

  - If more suitable baseline coverage data for ACS use for maternal sepsis in CEmONC settings for Nigeria and Ethiopia or BEmONC settings for all locations, 
    we will update accordingly.
  - We need to decide if/how we would model the effect of intrapartum ACS on preterm incidence. 

Validation and Verification Criteria
------------------------------------

- Population-level incidence rate should be the same as when this intervention is not included in the model.
- The ratio of maternal sepsis incidence among those without ACS divided by those with ACS
  should equal the relative risk parameter used in the model.
- The baseline coverage of ACS in each facility type should match the values in the artifact.

References
------------

.. [Gyamfi-Bannerman-et-al-2023]
  Gyamfi-Bannerman C, Thom EA, Blackwell SC, Tita AT, Reddy UM, Saade GR, Rouse DJ, McKenna DS, Clark EA, Thorp JM Jr, Chien EK, Peaceman AM, Gibbs RS, Swamy GK, Norton ME, Casey BM, Caritis SN, Tolosa JE, Sorokin Y, VanDorsten JP, Jain L; NICHD Maternal–Fetal Medicine Units Network. Antenatal Betamethasone for Women at Risk for Late Preterm Delivery. N Engl J Med. 2016 Apr 7;374(14):1311-20. doi: 10.1056/NEJMoa1516783. Epub 2016 Feb 4. Erratum in: N Engl J Med. 2023 May 4;388(18):1728. doi: 10.1056/NEJMx220010. PMID: 26842679; PMCID: PMC4823164.

.. [Oladapo-et-al-2020]
  WHO ACTION Trials Collaborators; Oladapo OT, Vogel JP, Piaggio G, Nguyen MH, Althabe F, Gülmezoglu AM, Bahl R, Rao SPN, De Costa A, Gupta S, Baqui AH, Khanam R, Shahidullah M, Chowdhury SB, Ahmed S, Begum N, D Roy A, Shahed MA, Jaben IA, Yasmin F, Rahman MM, Ara A, Khatoon S, Ara G, Akter S, Akhter N, Dey PR, Sabur MA, Azad MT, Choudhury SF, Matin MA, Goudar SS, Dhaded SM, Metgud MC, Pujar YV, Somannavar MS, Vernekar SS, Herekar VR, Bidri SR, Mathapati SS, Patil PG, Patil MM, Gudadinni MR, Bijapure HR, Mallapur AA, Katageri GM, Chikkamath SB, Yelamali BC, Pol RR, Misra SS, Das L, Nanda S, Nayak RB, Singh B, Qureshi Z, Were F, Osoti A, Gwako G, Laving A, Kinuthia J, Mohamed H, Aliyan N, Barassa A, Kibaru E, Mbuga M, Thuranira L, Githua NJ, Lusweti B, Ayede AI, Falade AG, Adesina OA, Agunloye AM, Iyiola OO, Sanni W, Ejinkeonye IK, Idris HA, Okoli CV, Irinyenikan TA, Olubosede OA, Bello O, Omololu OM, Olutekunbi OA, Akintan AL, Owa OO, Oluwafemi RO, Eniowo IP, Fabamwo AO, Disu EA, Agbara JO, Adejuyigbe EA, Kuti O, Anyabolu HC, Awowole IO, Fehintola AO, Kuti BP, Isah AD, Olateju EK, Abiodun O, Dedeke OF, Akinkunmi FB, Oyeneyin L, Adesiyun O, Raji HO, Ande ABA, Okonkwo I, Ariff S, Soofi SB, Sheikh L, Zulfiqar S, Omer S, Sikandar R, Sheikh S, Giordano D, Gamerro H, Carroli G, Carvalho J, Neilson J, Molyneux E, Yunis K, Mugerwa K, Chellani HK. Antenatal Dexamethasone for Early Preterm Birth in Low-Resource Countries. N Engl J Med. 2020 Dec 24;383(26):2514-2525. doi: 10.1056/NEJMoa2022398. Epub 2020 Oct 23. PMID: 33095526; PMCID: PMC7660991.

.. [WHO-2022]
  WHO recommendations on antenatal corticosteroids for improving preterm birth outcomes. Geneva: World Health Organization; 2022. Licence: CC BY-NC-SA 3.0 IGO. https://iris.who.int/bitstream/handle/10665/363131/9789240057296-eng.pdf?sequence=1