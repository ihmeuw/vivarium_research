.. _intervention_neonatal_antibiotics:

===================================================================================
Antibiotics for treating possible severe bacterial infections (PSBI) in newborns
===================================================================================

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

Intervention Overview
-----------------------

Possible severe bacterial infections (PSBIs) in newborns are serious conditions that can lead to sepsis and death. According to the [WHO-PSBI-Guideline]_, clinical signs of PSBI include:

- Clinical severe infection:

  - Severe chest indrawing
  - High body temperature
  - Low body temperature
  - Not feeding well
  - Movement only when stimulated

- Critical illness:

  - Unconscious
  - Apnoea
  - Unable to cry
  - Cyanosis
  - Bulging fontanelle
  - Persistent vomiting
  - No movement at all
  - Not able to feed at all
  - Convulsions
  - Active bleeding requiring transfusion

Management of PSBI starts with identification of at least one sign (by a family 
member or health professional) followed by confirmation by a community health 
worker or other health professional. To facilitate the identification of PSBI, 
WHO recommends that community health workers counsel families on recognition of 
danger signs for PSBI and assess infants for signs of PSBI during postnatal care 
visits. [WHO-PSBI-Guideline]_

The current WHO guideline on treatment for PSBI in infants less than 59 days old 
is referral to a hospital for inpatient management and a 7-10 day course of two 
injectable antibiotics - penicillin or ampicillin plus gentamicin 
[WHO-PSBI-Guideline]_. There is a separate WHO Guideline on the management of PSBI 
when hospital referral is not feasible, and recommends that infants of families 
who do not accept or cannot access hospital care are managed in an outpatient 
setting with intramuscular gentamicin (once daily for 2 or 7 days) and oral 
amoxicillin (twice daily for 7 days) [WHO-PSBI-Guideline]_.

The WHO guideline for PSBI management without hospital referral relies heavily on 
evidence included in a recent Cochrane review of community-based antibiotic 
management of PSBI [PSBI-Cochrane-Review]_. There has been evidence of successful 
implementation of outpatient management of PSBI in accordance with the WHO 
guideline, although not yet at scale [Wammanda-et-al-2020]_. Additionally, some 
unpublished trials suggest that outpatient management for clinical severe 
infection and early hospital discharge for non-critical cases is as effective as 
full hospital management of PSBI. 

.. todo::

  Link unpublished data when it is ready.

Notably, direct observation of mortality rates among a population with PSBI with 
no intervention (treatment or referral) by researchers is not ethical. As such, 
trials like those included in the [PSBI-Cochrane-Review]_ are designed so that the 
control arm is the standard of care hospital referral and the intervention arm is 
community based antibiotic administration in addition to hospital referral. 
Some portion of the population in these trials is expected to refuse 
referral and not receive antibiotics and could serve as a control group in the 
derivation of the effect of antibiotics on sepsis mortality relative to no 
antibiotics that we desire for use in our simulation. Unfortunately, however, none 
of the individual studies included in [PSBI-Cochrane-Review]_ report sufficient 
information to derive such values.

A review by [Zaidi-et-al-2011]_ attempted to address this challenge of deriving an 
effect of antibiotics relative to no antibiotics that cannot be directly observed 
in an experimental study for the Lives Saved Tool (LiST). Through a Delphi process 
to reach expert consensus, they arrived at the following effects on neonatal 
sepsis mortality:

- RR=0.72 for oral antibiotics in a community setting
- RR=0.35 for injectable antibiotics is a community/clinic setting
- RR=0.2 for in-patient hospital management with antibiotics

Vivarium Modeling Strategy
---------------------------

This section describes how an antibiotic-treatment intervention can be implemented and calibrated for the :ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>`.

.. list-table:: Affected Outcomes
  :widths: 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note (ex: is this relationship direct or mediated?)
  * - Neonatal sepsis and other neonatal infections Mortality Probability :math:`\text{CSMR}_i^\text{sepsis}`
    - Adjust multiplicatively using RR
    - Yes
    - For convenience, we will model this like a dichotomous risk factor; more details below

Baseline Coverage Data
++++++++++++++++++++++++

.. todo::

  Update this section. I think rather that making this delivery facility specific 
  we should utilize the GBD covariate for postnatal care visits because most cases 
  will be caught after hospital discharge unless they are hospital acquired. Maybe 
  we could also correlate coverage propensity with ANC or IFD propensity because 
  care seeking behavior here seems really relevant.

  We should also probably try to use different data than hospitals having 
  antibiotics to inform baseline coverage because it seems like adherence to 
  hospital referral is the more relevant variable here -- the trials in the 
  cochrane review are probably a good place to start. Ideally we will also have 
  some differentiation of outpatient/inpatient coverage as well as whether 
  outpatient management is oral or injectable.

These placeholder values come from two data sources, both for Ethiopia, both identified by the Health Systems team at IHME: the 2016 Ethiopia EmONC Final Report found 30.2% of BEmONC facilities and 76.8% of CEmONC facilities have neonatal antibiotics; the 2016-2018 SARA Report found 52.9% of BEmONC facilities and 97.2% of CEmONC facilities have neonatal antibiotics.  While we plan a data strategy to fill the gaps we have used a simple average.

.. list-table:: Baseline Coverage of Neonatal Antibiotics (placeholder values)
  :widths: 15 15 15 15
  :header-rows: 1

  * - Birth Facility
    - Coverage Mean (%)
    - Coverage Distribution (%)
    - Notes
  * - Home Birth
    - 5
    - :math:`\text{Uniform}(0,10)`
    - Assumption; need to investigate data sources for care seeking among children born outside of the hospital system 
  * - BEmONC Facilities
    - 41.55
    - :math:`\text{Uniform}(30.2,52.9)`
    - placeholder value based on two data points 
  * - CEmONC Facilities
    - 87.0
    - :math:`\text{Uniform}(76.8,97.2)`
    - placeholder value based on two data points 


Vivarium Modeling Strategy
--------------------------

This intervention requires adding an attribute to all simulants to specify if a neonate has access to a facility with access to antibiotics.  Since the neonatal mortality model does not explicitly represent incidence of sepsis, we will not track explicitly if a simulant receives antibiotics.  Instead the model will have different cause-specific mortality rates for sepsis for individuals with and without access to antibiotics (implemented with a slightly confusing application of our ``Risk`` and ``RiskEffect`` components from ``vivarium_public_health``).

The ``Risk`` component adds an attribute to each simulant indicating whether the simulant has access to antibiotics during the neonatal period, which we assume will be closely related to the facility choice during birth, i.e. home births have much lower access than in-facility births, and births in BEmONC facilities have lower access than CEmONC facilities.

To make this work naturally with the ``RiskEffect`` component, it is best to think of the risk as "lack of access to antibiotics".  With this framing, the ``RiskEffect`` component requires data on (1) the relative risk of sepsis mortality for people with lack of access to antibiotics, and (2) the population attributable fraction (PAF) of sepsis due to lack of access to antibiotics.  We will use the decision tree below to find the probability of sepsis mortality with and without access to antibiotics that are logically consistent with the baseline delivery facility rates and baseline antibiotics coverage.

In Vivarium, this risk effect will modify the sepsis mortality pipeline, resulting in 

.. math::

   \text{CSMR}_i^\text{sepsis} = \text{CSMR}^\text{sepsis}_{\text{BW}_i, \text{GA}_i} \cdot (1 - \text{PAF}_\text{no antibiotics}) \cdot \text{RR}_i^\text{no antibiotics}

where :math:`\text{RR}_i^\text{no antibiotics}` is simulant *i*'s individual relative risk for "no antibiotics", meaning :math:`\text{RR}_i^\text{no antibiotics} = \text{RR}_\text{no antibiotics}` if simulant *i* accesses a facility without antibiotics, and :math:`\text{RR}_i^\text{no antibiotics} = 1` if simulant *i* accesses a facility *with* antibiotics.

If there are other interventions also affecting the CSMR of sepsis, the pipeline will combine these effects, and we can write out the math for this risk explicitly as 

.. math::

   \text{CSMR}^\text{sepsis}_{i, \text{updated}} = \text{CSMR}^\text{sepsis}_{i, \text{original}} \cdot (1 - \text{PAF}_\text{no antibiotics}) \cdot \text{RR}_i^\text{no antibiotics}

This reduces to the previous formula if there are no other interventions, and we would have 

.. math::

   \text{CSMR}^\text{sepsis}_{i, \text{original}} = \text{CSMR}^\text{sepsis}_{\text{BW}_i, \text{GA}_i}

While we are searching the literature for an appropriate value for the relative risk, we will use a stand-in value with an origin I have failed to record.

.. todo::

  Update this section to use the RR=0.2 rather than 0.72 effect for hospital 
  quality antibiotic management (what we will be scaling up and also some portion 
  of existing baseline coverage). We will also use RR=0.35 and/or RR=0.72 for 
  baseline outpatient antibiotic management that is not yet in line with the new 
  guideline depending on what we find for baseline coverage.

  I really think that this is the best path forward, but am still open to 
  discussion if others disagree!

.. list-table:: Risk Effect Parameters for Lack-of-Access-to-Antibiotics
  :widths: 15 15 15 15
  :header-rows: 1

  * - Parameter
    - Mean
    - Distribution
    - Notes
  * - Relative Risk
    - 1.39
    - :math:`\text{Normal}(1.39,0.08^2)`
    - Based on placeholder relative risk of 0.72 (95% CI 0.64-0.80) of sepsis mortality for neonates with access to antibiotics 
  * - PAF
    - see below
    - see below
    - see `Calibration strategy` section below for details on how to calculate PAF that is consistent with RR, risk exposure, and facility choice model

Calibration Strategy
--------------------

The following decision tree shows all of the paths from delivery facility choice to antibiotics availability.  Distinct paths in the tree correspond to disjoint events, which we can sum over to find the population probability of sepsis mortality.  The goal here is to use internally consistent conditional probabilities of sepsis mortality for the subpopulations with and without access to antibiotics, so that the baseline scenario can track who has access to antibiotics and still match the baseline sepsis mortality rate.

.. graphviz::

    digraph antibiotics {
        rankdir = LR;
        facility [label="Facility type"]
        home [label="p_sepsis_without_antibiotics"]
        BEmONC [label="antibiotics?"]
        CEmONC [label="antibiotics?"]
        BEmONC_wo [label="p_sepsis_without_antibiotics"] 
        BEmONC_w [label="p_sepsis_with_antibiotics"]
        CEmONC_wo [label="p_sepsis_without_antibiotics"] 
        CEmONC_w [label="p_sepsis_with_antibiotics"]

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
        p(\text{sepsis}) 
        &= \sum_{\text{paths without antibiotics}} p(\text{path})\cdot p(\text{sepsis}|\text{no antibiotics})\\
        &+ \sum_{\text{paths with antibiotics}} p(\text{path})\cdot p(\text{sepsis}|\text{antibiotics})\\[.1in]
        p(\text{sepsis}|\text{no antibiotics}) &= \text{RR}_\text{no antibiotics} \cdot p(\text{sepsis}|\text{antibiotics})
    \end{align*}

where :math:`p(\text{sepsis})` is the probability of dying from sepsis in the general population, and :math:`p(\text{sepsis}|\text{antibiotics})` and :math:`p(\text{sepsis}|\text{no antibiotics})` are the probability of dying from sepsis in setting with and without access to antibiotics.  For each path through the decision tree, :math:`p(\text{path})` is the probability of that path; for example the path that includes the edges labeled BEmONC and unavailable occurs with probability that the birth is in a BEmONC facility times the probability that the facility has antibiotics available.

When we fill in the location-specific values for delivery facility rates, antibiotics coverage, relative risk of mortality with antibiotics access, and mortality probability (which is also age-specific), this becomes a system of two linear equations with two unknowns (:math:`p(\text{sepsis}|\text{antibiotics})` and :math:`p(\text{sepsis}|\text{no antibiotics})`), which we can solve analytically using the same approach as in the :ref:`cpap calibration <cpap_calibration>`.

**Alternative PAF Derivation**: An alternative, and possibly simpler derivation of the PAF that will calibrate this model comes from the observation that :math:`\text{PAF} = 1 - \frac{1}{\mathbb{E}(\text{RR})}`.  If we define 

.. math::

   p(\text{no antibiotics}) = \sum_{\text{paths without antibiotics}} p(\text{path}),

then can use this to expand the identity

.. math::

   \text{PAF}_\text{no antibiotics} = 1 - \frac{1}{\mathbb{E}(\text{RR})}.

Since our risk exposure has two categories,

.. math::

   \mathbb{E}(\text{RR}) = p(\text{no antibiotics}) \cdot \text{RR}_\text{no antibiotics} + (1 - p(\text{no antibiotics})) \cdot 1.



Scenarios
---------

.. todo::

  Describe our general approach to scenarios, for example set coverage to different levels in different types of health facilities; then the specific values for specific scenarios will be specified in the :ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>`.


Assumptions and Limitations
---------------------------

- This intervention applies to the first two months of life according to the WHO guideline and we only model the first month of life, so we will not capture any averted deaths in the second month of life due to this intervention, therefore underestimating total impact.
- We assume that antibiotics availability captures actual use, and not simply the treatment being in the facility 
- We assume that the delivery facility is also the facility where a sick neonate will seek care for sepsis
- We assume that the relative risk of sepsis mortality with antibiotics in practice is a value that we can find in the literature
- We have excluded the effect of antibiotics on pneumonia mortality, because this cause is currently lumped with 'other causes'
- Baseline coverage data for antibiotics in CEmONC and BEmONC is only reflective of Ethiopian health systems in 2015-2018. (These placeholder values come 
  from two data sources, both for Ethiopia, both identified by the Health Systems team at IHME: the 2016 Ethiopia EmONC Final 
  Report found 30.2% of BEmONC facilities and 76.8% of CEmONC facilities have neonatal antibiotics; the 2016-2018 SARA Report 
  found 52.9% of BEmONC facilities and 97.2% of CEmONC facilities have neonatal antibiotics.  While we plan a data strategy to 
  fill the gaps we have used a simple average.)
- We assume that baseline coverage for antibiotics in home births is 5% (this is not data-backed).
- We are currently using a placeholder value for the relative risk of Lack-of-Access-to-Antibiotics on neonatal sepsis mortality, which is not 
  backed by literature. Further research is needed to find an appropriate value.

.. todo::

  If more suitable baseline coverage data for antibiotics for neonatal sepsis at all facility types in all 3 locations, we should use that data instead and update 
  this documentation accordingly. We also need to find a more trustworthy value for the relative risk of antibiotics on neonatal sepsis.


Validation and Verification Criteria
------------------------------------

- Population-level mortality rate should be the same as when this intervention is not included in the model
- The ratio of sepsis deaths per birth among those without antibiotics access divided by those with antibiotics access should equal the relative risk parameter used in the model
- The baseline coverage of antibiotics in each facility type should match the values in the artifact
- Validation: how does the sepsis moratlity rate in a counterfactual scenario with 100% antibiotic access compare to sepsis mortality rates in high-income countries?  They should be close, and the counterfactual should not be lower.

References
------------

.. [WHO-PSBI-Guideline]

  Guideline: managing possible serious bacterial infection in young infants when referral is not feasible `https://www.who.int/publications/i/item/9789241509268 <https://www.who.int/publications/i/item/9789241509268>`_

.. [PSBI-Cochrane-Review]

  `Duby J, Lassi ZS, Bhutta ZA. Community-based antibiotic delivery for possible serious bacterial infections in neonates in low- and middle-income countries. Cochrane Database Syst Rev. 2019 Apr 11;4(4):CD007646. doi: 10.1002/14651858.CD007646.pub3. PMID: 30970390; PMCID: PMC6458055. <https://pubmed.ncbi.nlm.nih.gov/30970390/>`_

.. [Wammanda-et-al-2020]

  `Wammanda RD, Adamu SA, Joshua HD, Nisar YB, Qazi SA, Aboubaker S, Bahl R. Implementation of the WHO guideline on treatment of young infants with signs of possible serious bacterial infection when hospital referral is not feasible in rural Zaria, Nigeria: Challenges and solutions. PLoS One. 2020 Mar 10;15(3):e0228718. doi: 10.1371/journal.pone.0228718. PMID: 32155155; PMCID: PMC7064229. <https://pubmed.ncbi.nlm.nih.gov/32155155/>`_

.. [Zaidi-et-al-2011]

  `Zaidi AK, Ganatra HA, Syed S, Cousens S, Lee AC, Black R, Bhutta ZA, Lawn JE. Effect of case management on neonatal mortality due to sepsis and pneumonia. BMC Public Health. 2011 Apr 13;11 Suppl 3(Suppl 3):S13. doi: 10.1186/1471-2458-11-S3-S13. PMID: 21501430; PMCID: PMC3231886. <https://pmc-ncbi-nlm-nih-gov.offcampus.lib.washington.edu/articles/PMC3231886/>`_
