.. _intervention_neonatal_antibiotics:

==========================================================================================================
Program for outpatient antibiotic management of possible severe bacterial infections (PSBI) in newborns
==========================================================================================================

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - PSBI
    - Possible severe bacterial infection
    - 

Intervention Overview
-----------------------

Possible severe bacterial infections (PSBIs) in newborns are serious conditions that can lead 
to sepsis and death. According to the [WHO-PSBI-Guideline]_, clinical signs of PSBI include:

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
guideline, although not yet at scale [Nisar-et-al-2022]_. Additionally, some 
unpublished trials suggest that outpatient management for clinical severe 
infection and early hospital discharge for non-critical cases is as effective as 
full hospital management of PSBI. 

.. todo::

  Link unpublished data when it is ready.

Comparison one of the [PSBI-Cochrane-Review]_ evaluated trials that compared 
programs to initiate and/or complete community-based antibiotic management of 
newborn PSBI cases in newborns when hospital
referral was refused relative to the standard of care of hospital referral only.
This comparison included five trials and found a summary effect of such 
outpatient antibiotic programs on overall mortality of RR=0.82 (95% CI: 0.68 to 
0.99) with a high level of statistical heterogeneity (I^2 = 87%). Only two trials 
reported effects on sepsis-specific neonatal mortality, resulting in a summary 
relative risk of 0.78 (95% CI: 0.60 to 1.00).

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
information to derive such values (although the Bhandari et al. 2012 study comes
the closest).

A review by [Zaidi-et-al-2011]_ attempted to address this challenge of deriving an 
effect of antibiotics relative to no antibiotics that cannot be directly observed 
in an experimental study for the Lives Saved Tool (LiST). Through a Delphi process 
to reach expert consensus, they arrived at the following effects on neonatal 
sepsis mortality:

- RR=0.72 for oral antibiotics in a community setting
- RR=0.35 for injectable antibiotics is a community/clinic setting
- RR=0.2 for in-patient hospital management with antibiotics

We have conducted our own assessment of alternative strategies to arrive at such
values, `summarized in a few slides on sharepoint here <https://uwnetid.sharepoint.com/:p:/r/sites/ihme_simulation_science_team/_layouts/15/Doc.aspx?sourcedoc=%7BD2E9E7E0-6310-4F55-B3D5-83B3731A808F%7D&file=Neonatal%20antibiotics%20intervention%20overview.pptx&action=edit&mobileredirect=true>`_

Vivarium Modeling Strategy
---------------------------

This section describes how an outpatient program for newborn PSBI management intervention can be implemented and calibrated for the :ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>`.

.. list-table:: Affected Outcomes
  :widths: 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note (ex: is this relationship direct or mediated?)
  * - :ref:`Neonatal sepsis and other neonatal infections <2021_cause_neonatal_sepsis_mncnh>` Mortality Probability :math:`\text{CSMRisk}_i^\text{sepsis}`
    - Adjust multiplicatively using RR
    - Yes
    - 

**Research background**

Given the limitations of the approaches to estimating the effect of antibiotics
relative to no antibiotics for the management of PSBI, we have decided to instead
model the effect of an outpatient antibiotic program relative to the absence of 
such a program. This allows us to utilize the evidence from the [PSBI-Cochrane-Review]_
directly and avoids having to obtain specific estimates of antibiotics coverage.
However, this approach has several limitations, listed in the Assumptions and 
Limitations section of this page.

Baseline Coverage Data
++++++++++++++++++++++++

Ethiopia has integrated outpatient management of newborn PSBI cases into its national
health policy starting in 2012. [Tiruneh-et-al-2024]_ reviews the implementation experience of this
program in Ethiopia. According to this paper, the ability to manage newborn PSBI on 
an outpatient basis occurs at a national level in Ethiopia; however, between 60-98 
percent of facilities reported stockouts of gentamicin or amoxicillin over a three 
month period.

According to `this online resource <https://www.aku.edu/mcpk/paeds/Pages/psbi.aspx>`_, 
Pakistan does not have a national program to manage PSBI in newborns on an outpatient 
basis.

Based on the multi-country implementation study of outpatient antibiotic management 
programs for PSBI in newborns that conducted pilot programs [Nisar-et-al-2022]_, we 
assume that the baseline coverage of this intervention is zero in our modeled 
locations.

.. list-table:: Outpatient neonatal antibiotic intervention baseline coverage
  :header-rows: 1

  * - Location
    - Population
    - Value
    - Reference
  * - Pakistan
    - All newborns (baseline coverage does not vary by delivery facility)
    - 0
    - `See Aga Khan University Medical College's seminar here <https://www.aku.edu/mcpk/paeds/Pages/psbi.aspx>`_ indicating no national guideline for PSBI management on an outpatient basis in addition to [Nisar-et-al-2022]_ pilot program implementation in modeled location and lack of scaled-up programs
  * - Ethiopia
    - All newborns (baseline coverage does not vary by delivery)
    - 0.5
    - Assumption of 50% functional capacity to manage PSBI on an outpatient basis given on findings from [Tiruneh-et-al-2024]_ of frequent stock-outs and limited health worker capacity
  * - Nigeria
    - All newborns (baseline coverage does not vary by delivery facility)
    - 0
    - Assumption based on [Nisar-et-al-2022]_ pilot program implementation in modeled location and lack of scaled-up programs

Vivarium Modeling Strategy
--------------------------

This intervention requires adding an attribute to all simulants to specify if a neonate has access to outpatient antibiotic programs for PSBI in newborns.  Since the neonatal mortality model does not explicitly represent incidence of sepsis, we will not track explicitly if a simulant receives antibiotics.  Instead the model will have different cause-specific mortality rates for sepsis for individuals with and without access to outpatient antibiotic programs (implemented with a slightly confusing application of our ``Risk`` and ``RiskEffect`` components from ``vivarium_public_health``).

The ``Risk`` component adds an attribute to each simulant indicating whether the simulant has access to antibiotics during the neonatal period, which we assume will be closely related to the facility choice during birth, i.e. home births have much lower access than in-facility births, and births in BEmONC facilities have lower access than CEmONC facilities.

To make this work naturally with the ``RiskEffect`` component, it is best to think of the risk as "lack of access to antibiotics".  With this framing, the ``RiskEffect`` component requires data on (1) the relative risk of sepsis mortality for people with lack of access to antibiotics, and (2) the population attributable fraction (PAF) of sepsis due to lack of access to antibiotics.  We will use the decision tree below to find the probability of sepsis mortality with and without access to antibiotics that are logically consistent with the baseline delivery facility rates and baseline antibiotics coverage.

In Vivarium, this risk effect will modify the sepsis mortality pipeline, resulting in 

.. math::

   \text{CSMRisk}_i^\text{sepsis} = \text{CSMRisk}^\text{sepsis}_{\text{BW}_i, \text{GA}_i} \cdot (1 - \text{PAF}_\text{no antibiotics}) \cdot \text{RR}_i^\text{no antibiotics}

where :math:`\text{RR}_i^\text{no antibiotics}` is simulant *i*'s individual relative risk for "no antibiotics", meaning :math:`\text{RR}_i^\text{no antibiotics} = \text{RR}_\text{no antibiotics}` if simulant *i* accesses a facility without antibiotics, and :math:`\text{RR}_i^\text{no antibiotics} = 1` if simulant *i* accesses a facility *with* antibiotics.

If there are other interventions also affecting the CSMR of sepsis, the pipeline will combine these effects, and we can write out the math for this risk explicitly as 

.. math::

   \text{CSMRisk}^\text{sepsis}_{i, \text{updated}} = \text{CSMRisk}^\text{sepsis}_{i, \text{original}} \cdot (1 - \text{PAF}_\text{no antibiotics}) \cdot \text{RR}_i^\text{no antibiotics}

This reduces to the previous formula if there are no other interventions, and we would have 

.. math::

   \text{CSMRisk}^\text{sepsis}_{i, \text{original}} = \text{CSMRisk}^\text{sepsis}_{\text{BW}_i, \text{GA}_i}

Where:

.. list-table:: Risk Effect Parameters for Lack-of-Access-to-Intervention
  :header-rows: 1

  * - Parameter
    - Value
    - Notes
  * - :math:`\text{RR}^\text{no antibiotics}`
    - :math:`1/\text{RR}_\text{intervention}`
    - To be used in artifact in accordance with "lack of intervention" risk factor effect
  * - :math:`\text{RR}_\text{intervention}`
    - 0.78 (95% CI: 0.60 to 1.00), lognormal distribution of uncertainty (implemented as parameter uncertainty)
    - [PSBI-Cochrane-Review]_
  * - mean_rr
    - :math:`\text{RR} * p_\text{covered at baseline} + (1 - p_\text{covered at baseline})`
    - :math:`p_\text{covered at baseline}` is baseline coverage proportion defined in the baseline coverage section above
  * - PAF
    - (mean_rr - 1) / mean_rr
    - 

Scenarios
---------

Scenario-specific coverage of the outpatient neonatal antibiotic intervention for the MNCNH simulation can be found in the :ref:`neonatal component scenario table <MNCNH intrapartum component scenario table>`.

Generally, intervention-scenario coverage of this intervention should be 100%, indicating the presence of a fully functioning outpatient program to manage newborn PSBI with antibiotics. Note that this does not imply that 100% of newborn PSBI cases are treated with antibiotics, but rather that outpatient treatment occurs at the same rate as the trials included in the [PSBI-Cochrane-Review]_.


Assumptions and Limitations
---------------------------

- This intervention applies to the first two months of life according to the WHO guideline and we only model the first month of life, so we will not capture any averted deaths in the second month of life due to this intervention, therefore underestimating total impact.
- We assume 50% functional capacity of the outpatient newborn PSBI management program in Ethiopia in accordance with frequent stock-outs and limited health worker capacity reported in [Tiruneh-et-al-2024]_ and hypothesize that these issues can be resolved in an intervention scenario
- We do not model the effect of this intervention on pneumonia mortality (note that according to the WHO guideline these cases do not require inpatient treatment and outpatient management programs are expected to have a different effect on pneumonia mortality than sepsis mortality)
- Our modeling strategy does not allow for differential impact by location due to factors such as existing level of inpatient PSBI treatment rates 
- There was significant heterogeneity in the effect of the intervention in the [PSBI-Cochrane-Review]_ and we do not model factors that may influence the effectiveness of the intervention
- Many of the trials in the [PSBI-Cochrane-Review]_ included additional services alongside the ability to treat PSBI on an outpatient basis, which may confound the estimate of the intervention effect (however, we lessen the degree of this bias by using the sepsis-specific mortality estimate rather than the all cause mortality estimate)
- Although the trials in the [PSBI-Cochrane-Review]_ were measured specifically among the population visited by community health workers participated in the study, we do not limit the intervention effect only to those who receive postnatal care visits. This is because even if a family does not receive a PNC visit, it is possible that they will seek care if/when their newborn displays signs of illness. However, by not modeling decreased coverage among the population who does not receive PNC visits, we may overestimate the effect of the intervention.

.. todo::

  Consider adding pneumonia as additional affected cause?

  Determine if we want to make the eligible population those who recieve postnatal care visits according to the GBD covariate value. This would require us to add PNC as an additional attribute to the model and would allow us to correlate it with ANC/IFD attributes. 

Validation and Verification Criteria
------------------------------------

- Population-level mortality rate should be the same as when this intervention is not included in the model
- The ratio of sepsis deaths per birth among those without antibiotics access divided by those with antibiotics access should equal the relative risk parameter used in the model
- The baseline coverage of antibiotics in each facility type should match the values in the artifact

References
------------

.. [WHO-PSBI-Guideline]

  Guideline: managing possible serious bacterial infection in young infants when referral is not feasible `https://www.who.int/publications/i/item/9789241509268 <https://www.who.int/publications/i/item/9789241509268>`_

.. [PSBI-Cochrane-Review]

  `Duby J, Lassi ZS, Bhutta ZA. Community-based antibiotic delivery for possible serious bacterial infections in neonates in low- and middle-income countries. Cochrane Database Syst Rev. 2019 Apr 11;4(4):CD007646. doi: 10.1002/14651858.CD007646.pub3. PMID: 30970390; PMCID: PMC6458055. <https://pubmed.ncbi.nlm.nih.gov/30970390/>`_

.. [Nisar-et-al-2022]

  `Nisar YB, Aboubaker S, Arifeen SE, Ariff S, Arora N, Awasthi S, Ayede AI, Baqui AH, Bavdekar A, Berhane M, Chandola TR, Leul A, Sadruddin S, Tshefu A, Wammanda R, Nigussie A, Pyne-Mercier L, Pearson L, Brandes N, Wall S, Qazi SA, Bahl R. A multi-country implementation research initiative to jump-start scale-up of outpatient management of possible serious bacterial infections (PSBI) when a referral is not feasible: Summary findings and implications for programs. PLoS One. 2022 Jun 13;17(6):e0269524. doi: 10.1371/journal.pone.0269524. PMID: 35696401; PMCID: PMC9191694. <https://pubmed.ncbi.nlm.nih.gov/35696401/>`_

.. [Tiruneh-et-al-2024]

  `Tiruneh GT, Odwe G, Kamberos AH, K'Oduol K, Fesseha N, Moraa Z, Gwaro H, Emaway D, Magge H, Nisar YB, Hirschhorn LR. Optimizing integration of community-based management of possible serious bacterial infection (PSBI) in young infants into primary healthcare systems in Ethiopia and Kenya: successes and challenges. BMC Health Serv Res. 2024 Mar 5;24(1):280. doi: 10.1186/s12913-024-10679-9. PMID: 38443956; PMCID: PMC10916061. <https://pubmed.ncbi.nlm.nih.gov/38443956/>`_

.. [Zaidi-et-al-2011]

  `Zaidi AK, Ganatra HA, Syed S, Cousens S, Lee AC, Black R, Bhutta ZA, Lawn JE. Effect of case management on neonatal mortality due to sepsis and pneumonia. BMC Public Health. 2011 Apr 13;11 Suppl 3(Suppl 3):S13. doi: 10.1186/1471-2458-11-S3-S13. PMID: 21501430; PMCID: PMC3231886. <https://pmc-ncbi-nlm-nih-gov.offcampus.lib.washington.edu/articles/PMC3231886/>`_
