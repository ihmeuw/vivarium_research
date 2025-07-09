.. _intervention_neonatal_cpap:

==================================
CPAP for treating Preterm with RDS
==================================

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
    - 
  * - CEmONC
    - Comprehensive emergency obstetric and neonatal care
    - 
  * - CPAP
    - Continuous positive airway pressure
    - 
  * - RDS
    - Respiratory distress syndrome
    - 
  * - ACS
    - Antenatal corticosteroids
    - 

Intervention Overview
---------------------

CPAP is used for the prevention and treatment of respiratory distress syndrome. A recent (2020) Cochrane Review found that CPAP was associated with lower risk of treatment failure (death or use of assisted ventilation) and lower overall mortality with moderate‐certainty evidence.

This section describes how a CPAP intervention can be implemented and calibrated for the :ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>`.

.. list-table:: Affected Outcomes
  :widths: 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note (ex: is this relationship direct or mediated?)
  * - Preterm with RDS Mortality Probability :math:`\text{CSMRisk}_i^\text{RDS}`
    - Adjust multiplicatively using RR
    - Yes
    - For convenience, we will model this like a dichotomous risk factor; more details below

Baseline Coverage and RR Data
+++++++++++++++++++++++++++++

39.3% of CEmONC facilities and 7.5% of BEmONC facilities have CPAP, according to the 2016 Ethiopia EmONC Final Report.  Please use these as a placeholder for now while we try to find reliable values for Nigeria and Pakistan. 

We might be able to borrow strength from other locations and times by predicting coverage for more country-years simultaneously, perhaps even in combination with other key intervention technologies, based on sources such as existing `Service Provision Assessment (SPA) <https://www.dhsprogram.com/methodology/Survey-Types/SPA.cfm>`_ and `Service Availability and Readiness Assessment (SARA) <https://www.who.int/data/data-collection-tools/service-availability-and-readiness-assessment-(sara)>`_ data.

.. list-table:: Baseline Coverage of CPAP (placeholder values)
  :widths: 15 15 15 15
  :header-rows: 1

  * - Birth Facility
    - Coverage Mean (%)
    - Coverage Distribution (%)
    - Notes
  * - Home Birth
    - 0
    - Deterministic value (no uncertainty)
    - Assumption; need to double check if this is reasonable
  * - BEmONC Facilities
    - 7.5
    - :math:`\text{Normal}(7.5,2^2)`
    - placeholder value based on a single data point; uncertainty is an assumption without direct evidence
  * - CEmONC Facilities
    - 39.3
    - :math:`\text{Normal}(39.3,5^2)`
    - placeholder value based on a single data point; uncertainty is an assumption without direct evidence

To define individual-level coverage of CPAP and ACS (i.e., the RDS intervention bundle), please use the RDS intervention propensity 
value defined on the :ref:`Initial Attributes module page <2024_vivarium_mncnh_portfolio_initial_attributes_module>` to ensure the same
simulants are exposed to both interventions (i.e., if coverage of both CPAP and ACS is *x*%, then the same *x*% of simulants will be getting each intevention).
For more information on why we are bundling CPAP and ACS together, please see the :ref:`ACS intervention page <acs_intervention>`.

Vivarium Modeling Strategy
--------------------------

This intervention requires adding an attribute to all simulants to specify if a birth happens in a facility with access to CPAP.  Since the neonatal mortality model does not explicitly represent incidence of RDS, we will also not track who receives CPAP.  Instead the model will have different cause-specific mortality rates for RDS for individuals born with and without access to CPAP (implemented with our ``Risk`` and ``RiskEffect`` components).

We will use the decision tree below to find the PAF of RDS mortality without access to CPAP that is logically consistent with the baseline delivery facility rates and baseline CPAP coverage.

We will then add an attribute to each simulant indicating whether the birth occurs at a facility with access to CPAP (which will be dependent on the facility choice, i.e. no access for home births and lower access for BEmONC than CEmONC facilities).

We will then use the conditional probabilities for simulants with and without access to determine which simulants die from RDS.

A `2020 Cochrane review <https://pmc.ncbi.nlm.nih.gov/articles/PMC8094155/>`_ found a relative risk of 0.53 (95% CI 0.34-0.83) of overall mortality for neonates with access to CPAP.   (Note that the population that this effect size applies to is preterm infants with "respiratory failure becoming evident soon after birth".)

So specifically, the preterm with RDS cause-specific mortality risk for an individual simulant, :math:`i`, as derived from the :ref:`neonatal preterm birth cause model document <2021_cause_preterm_birth_mncnh>` (:math:`\text{CSMRisk}^{\text{preterm with RDS}}_{\text{BW},\text{GA}}`) should be further modified by CPAP intervention access as follows:

.. math::

  \text{CSMRisk}^{\text{preterm with RDS}}_{i} = \text{CSMRisk}^{\text{preterm with RDS}}_{\text{BW}_i,\text{GA}_i} * (1 - \text{PAF}) * \text{RR}_i

Where,

.. list-table:: CPAP intervention parameters
  :header-rows: 1

  * - Parameter
    - Definition
    - Value
    - Note
  * - :math:`\text{CSMRisk}^{\text{preterm with RDS}}_{i}`
    - Mortality risk due to preterm with RDS for a given simulant :math:`i` following modification from the CPAP intervention
    - See equation above
    - 
  * - :math:`\text{CSMRisk}^{\text{preterm with RDS}}_{\text{BW}_i,\text{GA}_i}`
    - Mortality risk due to preterm with RDS for a given simulant :math:`i` with a given birth weight and gestational age exposure before modification from the CPAP intervention
    - Derived from instruction on the :ref:`neonatal preterm birth cause model document <2021_cause_preterm_birth_mncnh>`
    - 
  * - :math:`\text{PAF}`
    - Population attributable fraction of mortality due to preterm with RDS from access to CPAP intervention
    - See instructions on how to calculate PAF below
    - 
  * - :math:`\text{RR}_i`
    - Relative risk for a given simulant :math:`i`
    - For simulants without access to CPAP intervention: :math:`1/\text{RR}_\text{CPAP}`

      For simulants with access to CPAP intervention: :math:`1`
    - 
  * - :math:`\text{RR}_\text{CPAP}`
    - Relative risk of CPAP intervention on RDS mortality 
    - 0.53 (95% CI 0.34-0.83). Uncertaintly interval implemented as parameter uncertainty following a lognormal distribution
    - `2020 Cochrane review <https://pmc.ncbi.nlm.nih.gov/articles/PMC8094155/>`_. Note that this effect was measured for all cause mortality.

.. _cpap_calibration:

Calibration Strategy
--------------------

The following decision tree shows all of the paths from delivery facility choice to CPAP availability.  Distinct paths in the tree correspond to disjoint events, which we can sum over to find the population probability of RDS mortality.  The goal here is to find internally consistent probabilities of RDS mortality for the subpopulations with and without access to CPAP, so that the baseline scenario can track who has access to CPAP and still match the baseline RDS mortality rate.

.. graphviz::

    digraph CPAP {
        rankdir = LR;
        facility [label="Facility type"]
        home [label="p_RDS_without_CPAP"]
        BEmONC [label="CPAP"]
        CEmONC [label="CPAP"]
        BEmONC_wo [label="p_RDS_without_CPAP"] 
        BEmONC_w [label="p_RDS_with_CPAP"]
        CEmONC_wo [label="p_RDS_without_CPAP"] 
        CEmONC_w [label="p_RDS_with_CPAP"]

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
        p(\text{RDS})
        &= \sum_{\text{paths without CPAP}} p(\text{path})\cdot p(\text{RDS}|\text{no CPAP})\\
        &+ \sum_{\text{paths with CPAP}} p(\text{path})\cdot p(\text{RDS}|\text{CPAP})\\[.1in]
        p(\text{RDS}|\text{CPAP}) &= \text{RR}_\text{CPAP} \cdot p(\text{RDS}|\text{no CPAP})
    \end{align*}

where :math:`p(\text{RDS})` is the probability of dying from Preterm with RDS in the general population, and :math:`p(\text{RDS}|\text{CPAP})` and :math:`p(\text{RDS}|\text{no CPAP})` are the probability of dying from Preterm with RDS in setting with and without access to CPAP.  For each path through the decision tree, :math:`p(\text{path})` is the probability of that path; for example the path that includes the edges labeled BEmONC and unavailable occurs with probability that the birth is in a BEmONC facility times the probability that the facility has CPAP available (7.5% in Ethiopia in 2016)

When we fill in the location-specific values for delivery facility rates, CPAP coverage by facility type, relative risk of mortality with CPAP access, and mortality probability (which is also age-specific), this becomes a system of two linear equations with two unknowns (:math:`p(\text{RDS}|\text{CPAP})` and :math:`p(\text{RDS}|\text{no CPAP})`), which we can solve analytically.

As mentioned above, it is convenient to model this intervention like a dichotomous risk factor, so that we can reuse the
:class:`Risk<vivarium_public_health.risks.base_risk.Risk>`
and :class:`RiskEffect<vivarium_public_health.risks.effect.RiskEffect>` components in Vivarium Public Health,
rather than having to write new components from scratch.
Calling CPAP a risk factor can sound a bit confusing because CPAP access is a good thing, so it doesn't sound "risky."
Instead, we flip it so the risk factor is "*lack* of access to CPAP."

The :code:`RiskEffect` component expects a relative risk (RR) and a population-attributable fraction (PAF).
Because we are flipping the direction of the risk factor, we need to use the inverse of our original RR, so:

.. math::
    \text{RR}_{\text{no CPAP}} = \frac{1}{\text{RR}_{\text{CPAP}}}

The PAF is the proportion of deaths due to preterm with RDS that would not occur if all births had access to CPAP.
Since we use the equation :math:`p(\text{RDS}|\text{CPAP}) = (1 - \text{PAF}_\text{no CPAP}) \cdot p(\text{RDS})`
in the :code:`RiskEffect` component, we solve for :math:`\text{PAF}_\text{no CPAP}` as follows:

.. math::
    \text{PAF}_{\text{no CPAP}} = 1 - \frac{p(\text{RDS}|\text{CPAP})}{p(\text{RDS})}

where the terms on the right hand side can be obtained by solving the system of equations above.

Here is some pseudocode for deriving the PAF and RR of "lack of access to CPAP" from data::

  # TODO: replace these stand-in values
  # with appropriate artifact draws
  p_RDS = .1
  p_home = .5
  p_BEmONC = .1
  p_CEmONC = .4
  p_CPAP_BEmONC = 0.075
  p_CPAP_CEmONC = 0.393
  RR_CPAP = 0.53

  p_RDS_w_CPAP = ... # solve system of equations from previous section
  p_RDS_wo_CPAP = # TODO: fill this in explicitly

  RR_no_CPAP = 1 / RR_CPAP
  # p_RDS_w_CPAP = (1 - PAF_no_CPAP) * p_RDS
  PAF_no_CPAP = 1 - p_RDS_w / p_RDS # solved equation in previous line for PAF

**Alternative PAF Derivation**: An alternative, and possibly simpler derivation of the PAF that will calibrate this model comes from the observation that :math:`\text{PAF} = 1 - \frac{1}{\mathbb{E}(\text{RR})}`.
The math for this can be found :ref:`on the antibiotics page <intervention_neonatal_antibiotics>`
and the pseudocode would look as follows::
  
  population_average_RR = RR_no_CPAP * p_no_CPAP + 1 * p_CPAP
  PAF_no_CPAP = 1 - 1 / population_average_RR


Scenarios
---------

.. todo::

  Describe our general approach to scenarios, for example set coverage to different levels in different types of health facilities; then the specific values for specific scenarios will be specified in the :ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>`.
  
  This is because specific scenarios might combine interventions, such as scaling up both an intervention like Antenatal corticosteroids (ACS) that lowers the prevalence of RDS together with increased coverage of CPAP.


Assumptions and Limitations
---------------------------

- We assume that CPAP availability captures actual use, and not simply the machine being in the facility 
- We assume that the delivery facility is the final facility in the care continum for deliveries that are transferred due to complications
- We assume that the relative risk of RDS mortality with CPAP in practice is similar to that found in the Cochrane Review meta-analysis. Given that the review assessed overall mortality rather than RDS mortality, it is likely that we will underestimate the overall impact of CPAP on mortality in our simulation.
- We do not model effect modification by birthweight as found in the Cochrane review, which found a stronger impact of CPAP on mortality for babies with greater than 1500 gram birthweight and a weaker and non-significant impact among babies with birth weights less than 1500 grams.
- Baseline coverage data for CPAP in CEmONC and BEmONC is only reflective of Ethiopian health systems in 2015-2016 based on the EmONC Final Report. 
  We assume that Nigeria and Pakistan health systems have the same CPAP availability.
- We assume no effect modification by ACS on the effect size of CPAP on mortality due to RDS with preterm (i.e., that ``(RR_CPAP | ACS) = (RR_CPAP | no ACS)``).  
  Despite the fact that ACS acts on outcomes that come earlier in the causal chain than CPAP, and could thereby decrease the effect size of CPAP, there is a lack 
  of literature evidence to substantiate including it in our model. Further supporting this assumption, [Abdallah-et-al-2023]_ suggests that ACS use was not 
  significantly associated with CPAP success in RDS treatment.

.. todo::

  - If more suitable baseline coverage data for CPAP availability at BEmONC and CEmONC for Nigeria or Pakistan, we should use that data instead and update 
    this documentation accordingly.
  - If we find literature evidence or otherwise find reason to model an effect modification of ACS on CPAP (i.e. if we determine ``(RR_CPAP | ACS) =/= (RR_CPAP | no ACS)``),
    we will need to adjust our modeling strategy and current assumption that ``(RR_CPAP | ACS) == (RR_CPAP | no ACS)``.

Validation and Verification Criteria
------------------------------------

- Population-level mortality rate should be the same as when this intervention is not included in the model
- The ratio of RDS deaths per birth among those without CPAP access divided by those with CPAP access should equal the relative risk from the Cochrane Review
- The baseline coverage of CPAP in each facility type should match the values in the artifact

References
------------

* https://pmc.ncbi.nlm.nih.gov/articles/PMC8094155/
* https://chatgpt.com/share/67c1c86e-3194-8010-9fe7-aadd3e15c4d0

.. [Abdallah-et-al-2023]
  Abdallah Y, Mkony M, Noorani M, Moshiro R, Bakari M, Manji K. CPAP failure in the management of preterm neonates with respiratory distress syndrome where surfactant is scarce. A prospective observational study. BMC Pediatr. 2023 May 3;23(1):211. doi: 10.1186/s12887-023-04038-6. PMID: 37138252; PMCID: PMC10155133.

