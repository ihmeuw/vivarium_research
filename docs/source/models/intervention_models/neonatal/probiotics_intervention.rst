.. _intervention_neonatal_probiotics:

=============================================
Probiotics for treating bacterial infections
=============================================

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

**Research Background**

Preterm infants are susceptible to a serious disease of the gastrointestinal tract called necrotizing enterocolitis (NEC). While the pathogeneis of NEC is not entirely understood, it is hypothesized that the paucity of normal enteric bacteria and the delayed onset of bacterial colonization in preterm infants relative to term infants leave preterm infants susceptible to NEC infection. Probiotic supplements have been shown to reduce the risk of NEC incidence among preterm infants in a 2014 Cochrance review [Cochrane-Review-Probiotics]_ and a recent meta-analysis from 2025 [Lee-Him-et-al-2025]_. 

The Cochrane review found that "probiotics supplementation significantly reduced the incidence of severe NEC (stage II or more) (typical relative risk (RR) 0.43, 95% confidence interval (CI) 0.33 to 0.56; 20 studies, 5529 infants) and mortality (typical RR 0.65, 95% CI 0.52 to 0.81; 17 studies, 5112 infants). There was no evidence of significant reduction of nosocomial sepsis (typical RR 0.91, 95% CI 0.80 to 1.03; 19 studies, 5338 infants)." [Cochrane-Review-Probiotics]_

The 2025 review found: "Probiotic supplementation reduced the risk of NEC by
61% (95% CI: 51–69%), the risk of all-cause neonatal
mortality by 25%(95% CI: 8–39%), and the risk of invasive
infection by 19% (95% CI: 9–28%) in preterm newborns,
when compared to control. There were significant subgroup
differences in the risk of NEC by probiotic type. The
risk of NEC was reduced by all types of probiotics;
however, the greatest reduction was found for Bifidobacteriumspp.
by 84% (95% CI: 69–92%), and the smallest
reduction was found for Saccharomyces spp. by 7% (95%
CI: 55% reduction to 94% increase), though this was not
statistically significant when compared to control or placebo.
However, there were no significant differences in
mortality or invasive infection by probiotic type."" [Lee-Him-et-al-2025]_

The Gates Foundation has specifically been interested in probiotic supplementation with *Bifidobacterium infantis* (*B. infantis*), which has been found to be a particularly effective probiotic strain for reducing NEC incidence [Lee-Him-et-al-2025]_. However, given there were no significant differences in effect on invasive infection by probiotic type, we will use the summary effect of all probiotics on invasive infection as our modeled effect of probiotic supplementation on sepsis mortality among preterm infants for our simulation.

Vivarium Modeling Strategy
----------------------------

This section describes how a probiotic-treatment intervention can be implemented and calibrated for the 
:ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>`.

.. list-table:: Affected Outcomes
  :widths: 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note (ex: is this relationship direct or mediated?)
  * - :ref:`Neonatal sepsis and other neonatal infections <2021_cause_neonatal_sepsis_mncnh>`_ Mortality Probability :math:`\text{CSMRisk}_i^\text{sepsis}`
    - Adjust multiplicatively using RR
    - Yes
    - 

Baseline Coverage Data
++++++++++++++++++++++++

Baseline coverage for probiotics availability at health facilities should be 0% for both BEMONC and CEMONC 
facilities. 

.. list-table:: Baseline Coverage of Neonatal Probiotics (placeholder values)
  :widths: 15 15 15 15
  :header-rows: 1

  * - Birth Facility
    - Coverage Mean (%)
    - Coverage Distribution (%)
    - Notes
  * - Home Birth
    - 0
    - N/A
    - 
  * - BEmONC Facilities
    - 0
    - N/A
    - 
  * - CEmONC Facilities
    - 0
    - N/A
    -  


Vivarium Modeling Strategy
--------------------------

This intervention requires adding an attribute to all simulants to specify if a neonate has access to a facility with access to probiotics.  
Since the neonatal mortality model does not explicitly represent incidence of sepsis, we will not track explicitly if a simulant receives 
probiotics.  Instead the model will have different cause-specific mortality rates for sepsis for individuals with and without access to probiotics 
(implemented with a slightly confusing application of our ``Risk`` and ``RiskEffect`` components from ``vivarium_public_health``).

In order to be eligible for this intervention, simulants must be in the early neonatal age group and born preterm (<37 weeks old). This eligibility
is based on an impact table for Bifidobacterium infantis (B. infantis) provided to us by the BMGF team. 

.. graphviz::

    digraph probiotics {
        
        rankdir = LR;
        nodesep = 1.0;
        ranksep = 1.2;
        
        node [shape=box]
        rankdir = LR;
        birth [label="Simulant is born"]
        preterm [label="Simulant is preterm (<37 weeks)"]
        not_preterm [label="Simulant is not preterm"]
        preterm_wo [label="Simulant is eligible but does not have access to probiotics"] 
        preterm_w [label="Simulant is eligible and has access to probiotics"]
        not_preterm_wo [label="Simulant is not eligible for probiotics"]
      
        birth -> preterm 
        birth -> not_preterm
        
        preterm -> preterm_wo
        preterm -> preterm_w

        not_preterm -> not_preterm_wo
    }

The ``Risk`` component adds an attribute to each simulant indicating whether the simulant (if in the target population) has access to probiotics during the neonatal period, 
which we assume to be 0.0% regardless of birth facility choice in our baseline scenario.
births in BEmONC facilities have lower access than CEmONC facilities.

To make this work naturally with the ``RiskEffect`` component, it is best to think of the risk as "lack of access to probiotics".  
With this framing, the ``RiskEffect`` component requires data on (1) the relative risk of sepsis mortality for people with lack of access to 
probiotics, and (2) the population attributable fraction (PAF) of sepsis due to lack of access to probiotics.  We will use the decision tree 
below to find the probability of sepsis mortality with and without access to probiotics that are logically consistent with the baseline delivery 
facility rates and baseline probiotics coverage.

In Vivarium, this risk effect will modify the sepsis mortality pipeline, resulting in 

.. math::

   \text{CSMRisk}_i^\text{sepsis} = \text{CSMRisk}^\text{sepsis}_{\text{BW}_i, \text{GA}_i} \cdot (1 - \text{PAF}_\text{no probiotics}) \cdot \text{RR}_i^\text{no probiotics}

where :math:`\text{RR}_i^\text{no probiotics}` is simulant *i*'s individual relative risk for "no probiotics", meaning :math:`\text{RR}_i^\text{no probiotics} = \text{RR}_\text{no probiotics}` 
if simulant *i* accesses a facility without probiotics, and :math:`\text{RR}_i^\text{no probiotics} = 1` if simulant *i* accesses a facility *with* probiotics.

If there are other interventions also affecting the CSMR of sepsis, the pipeline will combine these effects, and we can write out the math for 
this risk explicitly as 

.. math::

   \text{CSMRisk}^\text{sepsis}_{i, \text{updated}} = \text{CSMRisk}^\text{sepsis}_{i, \text{original}} \cdot (1 - \text{PAF}_\text{no probiotics}) \cdot \text{RR}_i^\text{no probiotics}

This reduces to the previous formula if there are no other interventions, and we would have 

.. math::

   \text{CSMRisk}^\text{sepsis}_{i, \text{original}} = \text{CSMRisk}^\text{sepsis}_{\text{BW}_i, \text{GA}_i}

.. list-table:: Risk Effect Parameters for Lack-of-Access-to-probiotics
  :widths: 15 15 15 15
  :header-rows: 1

  * - Parameter
    - Mean
    - Source
    - Notes
  * - :math:`\text{RR}^\text{no probiotics}`
    - :math:`1/\text{RR}^\text{probiotics}`
    - N/A
    - Value to be used in sim
  * - :math:`1/\text{RR}^\text{probiotics}`
    - RR = 0.81 (95% CI: 0.72 to 0.91). Parameter uncertainty implemented as a lognormal distribution: :code:`get_lognorm_from_quantiles(0.81, 0.72, 0.91)`
    - [Lee-Him-et-al-2025]_
    - 
  * - PAF
    - see below
    - see below
    - see `Calibration strategy` section below for details on how to calculate PAF that is consistent with RR, risk exposure, and facility choice model

Calibration Strategy
--------------------

The following decision tree shows all of the paths from delivery facility choice to probiotics availability.  Distinct paths in the tree correspond to disjoint events, 
which we can sum over to find the population probability of sepsis mortality.  The goal here is to use internally consistent conditional probabilities of sepsis mortality 
for the subpopulations with and without access to probiotics, so that the baseline scenario can track who has access to probiotics and still match the baseline sepsis 
mortality rate.

.. graphviz::

    digraph probiotics {
        rankdir = LR;
        facility [label="Facility type"]
        home [label="p_sepsis_without_probiotics"]
        BEmONC [label="probiotics?"]
        CEmONC [label="probiotics?"]
        BEmONC_wo [label="p_sepsis_without_probiotics"] 
        BEmONC_w [label="p_sepsis_with_probiotics"]
        CEmONC_wo [label="p_sepsis_without_probiotics"] 
        CEmONC_w [label="p_sepsis_with_probiotics"]

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
        &= \sum_{\text{paths without probiotics}} p(\text{path})\cdot p(\text{sepsis}|\text{no probiotics})\\
        &+ \sum_{\text{paths with probiotics}} p(\text{path})\cdot p(\text{sepsis}|\text{probiotics})\\[.1in]
        p(\text{sepsis}|\text{no probiotics}) &= \text{RR}_\text{no probiotics} \cdot p(\text{sepsis}|\text{probiotics})
    \end{align*}

where :math:`p(\text{sepsis})` is the probability of dying from sepsis in the general population, and :math:`p(\text{sepsis}|\text{probiotics})` 
and :math:`p(\text{sepsis}|\text{no probiotics})` are the probability of dying from sepsis in setting with and without access to probiotics.  
For each path through the decision tree, :math:`p(\text{path})` is the probability of that path; for example the path that includes the edges 
labeled BEmONC and unavailable occurs with probability that the birth is in a BEmONC facility times the probability that the facility has probiotics 
available.

When we fill in the location-specific values for delivery facility rates, probiotics coverage, relative risk of mortality with probiotics access, 
and mortality probability (which is also age-specific), this becomes a system of two linear equations with two unknowns (:math:`p(\text{sepsis}|\text{probiotics})` 
and :math:`p(\text{sepsis}|\text{no probiotics})`), which we can solve analytically using the same approach as in the :ref:`cpap calibration <cpap_calibration>`.

**Alternative PAF Derivation**: An alternative, and possibly simpler derivation of the PAF that will calibrate this model comes from the observation that 
:math:`\text{PAF} = 1 - \frac{1}{\mathbb{E}(\text{RR})}`.  If we define 

.. math::

   p(\text{no probiotics}) = \sum_{\text{paths without probiotics}} p(\text{path}),

then can use this to expand the identity

.. math::

   \text{PAF}_\text{no probiotics} = 1 - \frac{1}{\mathbb{E}(\text{RR})}.

Since our risk exposure has two categories,

.. math::

   \mathbb{E}(\text{RR}) = p(\text{no probiotics}) \cdot \text{RR}_\text{no probiotics} + (1 - p(\text{no probiotics})) \cdot 1.



Scenarios
---------

.. todo::

  Describe our general approach to scenarios, for example set coverage to different levels in different types of health facilities; then the specific values 
  for specific scenarios will be specified in the :ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>`.


Assumptions and Limitations
---------------------------

- We assume that probiotics availability captures actual use, and not simply the treatment being in the facility 
- We assume that the delivery facility is also the facility where preterm infants will receive prophylactic probiotic supplementation
- We assume that the relative risk of sepsis mortality with probiotics in practice is a value that we can find in the literature
- We do not specifically measure the impact of this intervention on NEC, the condition directly affected by the intervention, because it is not modeled by GBD. We use the less specific neonatal sepsis and other neonatal infections cause in GBD instead.

Validation and Verification Criteria
------------------------------------

- Population-level mortality rate should be the same as when this intervention is not included in the model
- The ratio of sepsis deaths per birth among those without probiotics access divided by those with probiotics access should equal the relative risk parameter used in the model
- The baseline coverage of probiotics in each facility type should match the values in the artifact

References
------------

.. [Cochrane-Review-Probiotics]

  `AlFaleh K, Anabrees J. Probiotics for prevention of necrotizing enterocolitis in preterm infants. Cochrane Database of Systematic Reviews 2014, Issue 4. Art. No.: CD005496. DOI: 10.1002/14651858.CD005496.pub4. Accessed 05 June 2025. <https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD005496.pub4/full>`_

.. [Lee-Him-et-al-2025]

  `Lee Him R, Rehman S, Sihota D, Yasin R, Azhar M, Masroor T, Naseem HA, Masood L, Hanif S, Harrison L, Vaivada T, Sankar MJ, Dramowski A, Coffin SE, Hamer DH, Bhutta ZA. Prevention and Treatment of Neonatal Infections in Facility and Community Settings of Low- and Middle-Income Countries: A Descriptive Review. Neonatology. 2025;122(Suppl 1):173-208. doi: 10.1159/000541871. Epub 2024 Nov 12. PMID: 39532080; PMCID: PMC11875423. <https://pubmed.ncbi.nlm.nih.gov/39532080/>`_

