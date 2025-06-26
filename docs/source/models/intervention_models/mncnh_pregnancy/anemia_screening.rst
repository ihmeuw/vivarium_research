.. _anemia_screening:

================
Anemia Screening
================

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - GBD
    - Global Burden of Disease
    - 

Intervention Overview
-----------------------

Hemoglobin Screening Accuracy Instructions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For decision node 7 (see :ref:`<2024_vivarium_mncnh_portfolio_hemoglobin_module>`_ for details), we will assess whether or not the result of a simulant's minimally invasive 
blood test hemoglobin screening is <100 g/L, which may be different than whether a simulant's *actual* hemoglobin exposure is <100 g/L. We will do this based on assumed 
sensitivity and specificity levels for the hemoglobin screening test as informed from the Gates Foundation and listed below:

- Sensitivity (percent of true positives that test positive): 85% 
- Specificity (percent of true negatives that test negative): 80%

Follow the steps below to determine the answer to decision node #7:

1. Assess a simulants "true" low hemoglobin status based on their hemoglobin exposure *after* action points I, II, and III have been executed (and *before* IV, V, and VI). Low hemoglobin 
    status corresponds to values of <100 g/L and adequate hemoglobin status corresponds to values of 100+ g/L.
2. For simulants that are truly low hemoglobin, assign tests low hemoglobin status to 85% (sensitivity value) and tests adequate hemoglobin status to 15% (100 - sensitivity value of 85)
3. For simulants that are truly adequate hemoglobin, assign tests adequate hemoglobin status to 80% (specificity) and tests low hemoglobin status to 20% (100 - specificty value of 80)
4. Use the test hemoglobin status to determine the answer to decision node 7 (answer is "yes" if they have test low hemoglobin status and "no" if they have test adequate hemoglobin status)
5. Record true and test hemoglobin exposures at the time of screening to outputs F and G (to be used for V&V in the interactive simulation)

Ferritin Screening Instructions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Research background:**

Ferritin is a protein that stores iron within the body and low blood ferritin levels can indicate low iron stores. Pregnancies that have hemoglobin less than 100 g/L based on the hemoglobin 
screen will also be screened for ferritin levels via a minimally invasive screening (finger prick). Pregnancies that have a hemoglobin level <100 g/L and a blood ferritin level below 15 ug/L 
(anemic AND iron deficient) are eligible for IV iron.

Notably, the GBD does not have any estimates related to ferritin exposure. However, the GBD assigns specific causes to all cases of anemia. Some of these causes of anemia are considered "iron 
responsive," indicating that they are iron deficiency anemia. An example of an iron deficiency anemia is anemia caused by maternal hemorrhage (caused by blood loss, decreasing systemic levels 
of both hemoglobin and iron). An example of a non-iron responsive anemia is sickle cell trait (low hemoglobin is due to a defect in hemoglobin protein rather than low iron levels). Notably, it 
is possible for non-iron-responsive anemias to also have low iron levels. See the :ref:`anemia impairment document <2019_anemia_impairment>` for a list of iron responsive and non iron responsive 
causes of anemia in the GBD.

Therefore, in our model we will use the severity-specific fraction of iron responsive anemia among all causes of anemia in GBD as a proxy measure for the fraction of anemia cases with low ferritin. 
This approach is limited in that we may slightly underestimate total eligibility by not considering the proportion of the population who has low hemoglobin due to an iron-non-responsive cause and 
also coincidentally has low ferritin.

.. note::

  Chris T. has suggested that we can use the fraction of iron deficiency anemia from the in-progress PRISMA study rather than GBD for this purpose. PRIMSA study results are expected in June or July of 2025.

`The notebook that was used to calculate these values can be found here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/data_prep/fraction_iron_responsive_anemia.ipynb>`_

**Modeling instructions:**

The probability of low ferritin screening is dependent on the simulant's location, age group, and anemia status at the time of screening. Anemia status at the time of screening should be based on their true 
hemoglobin exposure value *after* action points I, II, and III have been executed (and *before* IV, V, and VI). See the :ref:`anemia/hemoglobin exposure table here for reference <2019_anemia_impairment>` and 
remember to use the pregnancy-specific values.

`The probability of low ferritin specific to location, age, and anemia status can be found here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/data_prep/iron_responsive_fraction.csv>`_. 
Record assigned ferritin exposure to output G to be used for V&V in the interactive simulation.


Vivarium Modeling Strategy
---------------------------

This section describes how the anemia screening intervention (hemoglobin and ferritin screenings) can be implemented and calibrated for the :ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>`.

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


Baseline Coverage Data
++++++++++++++++++++++++

Baseline coverage 

.. list-table:: Outpatient neonatal antibiotic intervention baseline coverage
  :header-rows: 1

  * - Location
    - Population
    - Value
    - Reference
  * - Pakistan
    - All newborns (baseline coverage does not vary by delivery facility)
    - 0
    - `See Aga Khan University Medical College's seminar here <https://www.aku.edu/mcpk/paeds/Pages/psbi.aspx>`_ indicating no national guideline for PSBI management on an outpatient 
      basis in addition to [Nisar-et-al-2022]_ pilot program implementation in modeled location and lack of scaled-up programs
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

This intervention requires adding an attribute to all simulants to specify if a neonate has access to outpatient antibiotic programs for PSBI in newborns.  
Since the neonatal mortality model does not explicitly represent incidence of sepsis, we will not track explicitly if a simulant receives antibiotics.  
Instead the model will have different cause-specific mortality rates for sepsis for individuals with and without access to outpatient antibiotic programs 
(implemented with a slightly confusing application of our ``Risk`` and ``RiskEffect`` components from ``vivarium_public_health``).

The ``Risk`` component adds an attribute to each simulant indicating whether the simulant has access to antibiotics during the neonatal period, which we 
assume will be closely related to the facility choice during birth, i.e. home births have much lower access than in-facility births, and births in BEmONC 
facilities have lower access than CEmONC facilities.

To make this work naturally with the ``RiskEffect`` component, it is best to think of the risk as "lack of access to antibiotics".  With this framing, 
the ``RiskEffect`` component requires data on (1) the relative risk of sepsis mortality for people with lack of access to antibiotics, and (2) the population 
attributable fraction (PAF) of sepsis due to lack of access to antibiotics.  We will use the decision tree below to find the probability of sepsis mortality 
with and without access to antibiotics that are logically consistent with the baseline delivery facility rates and baseline antibiotics coverage.

In Vivarium, this risk effect will modify the sepsis mortality pipeline, resulting in 

.. math::

   \text{CSMRisk}_i^\text{sepsis} = \text{CSMRisk}^\text{sepsis}_{\text{BW}_i, \text{GA}_i} \cdot (1 - \text{PAF}_\text{no antibiotics}) \cdot \text{RR}_i^\text{no antibiotics}

where :math:`\text{RR}_i^\text{no antibiotics}` is simulant *i*'s individual relative risk for "no antibiotics", meaning :math:`\text{RR}_i^\text{no antibiotics} = \text{RR}_\text{no antibiotics}` 
if simulant *i* accesses a facility without antibiotics, and :math:`\text{RR}_i^\text{no antibiotics} = 1` if simulant *i* accesses a facility *with* antibiotics.

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
    - :math:`\text{RR}^\text{no antibiotics} * (1 - p_\text{baseline coverage}) + p_\text{baseline coverage}`
    - :math:`p_\text{baseline coverage}` is baseline coverage proportion defined in the baseline coverage section above
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

  - Notably, of the two trials included in the [PSBI-Cochrane-Review]_  that reported sepsis-specific mortality effects, [Soofi-et-al-2012]_ was performed in rural districts in Pakistan and [Gill-et-al-2014]_ was performed in a rural district in Tanzania with no hospital in the district. Therefore, it is possible we will overestimate the effect of this intervention by applying to the population at large that includes population subgroups that may have greater access to hospitals (such as those in urban areas)

- There was significant heterogeneity in the effect of the intervention in the [PSBI-Cochrane-Review]_ and we do not model factors that may influence the effectiveness of the intervention
- The evidence in the [PSBI-Cochrane-Review]_ for this intervention was graded as low quality given the significant heterogeneity and the existence of interventions besides antibiotics administered alongside the community distribution of antibiotics interventions
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

.. [Gill-et-al-2014]

  `Gill CJ, MacLeod WB, Phiri-Mazala G, Guerina NG, Mirochnick M, Knapp AB, Hamer DH. Can traditional birth attendants be trained to accurately identify septic infants, initiate antibiotics, and refer in a rural African setting? Glob Health Sci Pract. 2014 Aug 31;2(3):318-27. doi: 10.9745/GHSP-D-14-00045. PMID: 25276591; PMCID: PMC4168634. <https://pubmed.ncbi.nlm.nih.gov/25276591/>`_

.. [Nisar-et-al-2022]

  `Nisar YB, Aboubaker S, Arifeen SE, Ariff S, Arora N, Awasthi S, Ayede AI, Baqui AH, Bavdekar A, Berhane M, Chandola TR, Leul A, Sadruddin S, Tshefu A, Wammanda R, Nigussie A, Pyne-Mercier L, Pearson L, Brandes N, Wall S, Qazi SA, Bahl R. A multi-country implementation research initiative to jump-start scale-up of outpatient management of possible serious bacterial infections (PSBI) when a referral is not feasible: Summary findings and implications for programs. PLoS One. 2022 Jun 13;17(6):e0269524. doi: 10.1371/journal.pone.0269524. PMID: 35696401; PMCID: PMC9191694. <https://pubmed.ncbi.nlm.nih.gov/35696401/>`_

.. [Soofi-et-al-2012]

  `Soofi S, Ahmed S, Fox MP, MacLeod WB, Thea DM, Qazi SA, Bhutta ZA. Effectiveness of community case management of severe pneumonia with oral amoxicillin in children aged 2-59 months in Matiari district, rural Pakistan: a cluster-randomised controlled trial. Lancet. 2012 Feb 25;379(9817):729-37. doi: 10.1016/S0140-6736(11)61714-5. Epub 2012 Jan 27. PMID: 22285055. <https://pubmed.ncbi.nlm.nih.gov/22285055/>`_

.. [Tiruneh-et-al-2024]

  `Tiruneh GT, Odwe G, Kamberos AH, K'Oduol K, Fesseha N, Moraa Z, Gwaro H, Emaway D, Magge H, Nisar YB, Hirschhorn LR. Optimizing integration of community-based management of possible serious bacterial infection (PSBI) in young infants into primary healthcare systems in Ethiopia and Kenya: successes and challenges. BMC Health Serv Res. 2024 Mar 5;24(1):280. doi: 10.1186/s12913-024-10679-9. PMID: 38443956; PMCID: PMC10916061. <https://pubmed.ncbi.nlm.nih.gov/38443956/>`_

.. [Zaidi-et-al-2011]

  `Zaidi AK, Ganatra HA, Syed S, Cousens S, Lee AC, Black R, Bhutta ZA, Lawn JE. Effect of case management on neonatal mortality due to sepsis and pneumonia. BMC Public Health. 2011 Apr 13;11 Suppl 3(Suppl 3):S13. doi: 10.1186/1471-2458-11-S3-S13. PMID: 21501430; PMCID: PMC3231886. <https://pmc-ncbi-nlm-nih-gov.offcampus.lib.washington.edu/articles/PMC3231886/>`_
