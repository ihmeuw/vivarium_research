.. _intervention_neonatal_antibiotics:

=============================================
Antibiotics for treating bacterial infections
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
    - 
  * - CEmONC
    - Comprehensive emergency obstetric and neonatal care
    - 

Intervention Overview
-----------------------

Antibiotics are used to treat bacterial infections in neonates, reducing the risk mortality.

This section describes how an antibiotic-treatment intervention can be implemented and calibrated for the :ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>`.

.. list-table:: Affected Outcomes
  :widths: 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note (ex: is this relationship direct or mediated?)
  * - Neonatal sepsis and other neonatal infections Mortality Probability
    - Decrease multiplicatively
    - Yes
    - 

Baseline Coverage Data
++++++++++++++++++++++++

X% of CEmONC facilities and Y% of BEmONC facilities have antibiotics for neonatal sepsis.  Please use placeholder values for now while we try to find reliable values.  We might be able to borrow strength from other locations and times by predicting coverage more country-years simultaneously, perhaps even in combination with other key intervention technologies, based on sources such as existing `Service Provision Assessment (SPA) <https://www.dhsprogram.com/methodology/Survey-Types/SPA.cfm>`_ and `Service Availability and Readiness Assessment (SARA) <https://www.who.int/data/data-collection-tools/service-availability-and-readiness-assessment-(sara)>`_ data.

Vivarium Modeling Strategy
--------------------------

This intervention requires adding an attribute to all simulants to specify if a birth happens in a facility with access to antibiotics.  Since the neonatal mortality model does not explicitly represent incidence of sepsis, we will also not track who receives antibiotics.  Instead the model will have different cause-specific mortality rates for sepsis for individuals born with and without access to antibiotics.

We will use the decision tree below to find the probability of sepsis mortality with and without access to antibiotics that are logically consistent with the baseline delivery facility rates and baseline antibiotics coverage (and population level sepsis mortality probability). Since the neonatal model includes different mortality probabilities for both the early and late neonatal periods, this calculation must be performed for both time periods as well.

We will then add an attribute to each simulant indicating whether the birth occurs at a facility with access to antibiotics (which will be dependent on the facility choice, i.e. no access for home births and lower access for BEmONC than CEmONC facilities).

We will then use the conditional probabilities for simulants with and without access to determine which simulants die from sepsis.

While we are searching the literature, we will use a placeholder relative risk of 0.72 (95% CI 0.64-0.80) of sepsis mortality for neonates with access to antibiotics.


Calibration Strategy
--------------------

The following decision tree shows all of the paths from delivery facility choice to antibiotics availability.  Distinct paths in the tree correspond to disjoint events, which we can sum over to find the population probability of sepsis mortality.  The goal here is to find internally consistent probabilities of sepsis mortality for the subpopulations with and without access to antibiotics, so that the baseline scenario can track who has access to antibiotics and still match the baseline sepsis mortality rate.

.. graphviz::

    digraph antibiotics {
        rankdir = LR;
        facility [label="Facility type"]
        home [label="p_sepsis_without_antibiotics"]
        BEmONC [label="antibiotics"]
        CEmONC [label="antibiotics"]
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
        p(\text{sepsis}|\text{antibiotics}) &= \text{RR}_\text{antibiotics} \cdot p(\text{sepsis}|\text{no antibiotics})
    \end{align*}

where :math:`p(\text{sepsis})` is the probability of dying from sepsis in the general population, and :math:`p(\text{sepsis_w})` and :math:`p(\text{sepsis_wo})` are the probability of dying from sepsis in setting with and without access to antibiotics.  For each path through the decision tree, :math:`p(\text{path})` is the probability of that path; for example the path that includes the edges labeled BEmONC and unavailable occurs with probability that the birth is in a BEmONC facility times the probability that the facility has antibiotics available.

When we fill in the location-specific values for delivery facility rates, antibiotics coverage, relative risk of mortality with antibiotics access, and mortality probability (which is also age-specific), this becomes a system of two linear equations have two unknown (p_sepsis_w and p_sepsis_wo), which we can solve analytically.

Scenarios
---------

.. todo::

  Describe our general approach to scenarios, for example set coverage to different levels in different types of health facilities; then the specific values for specific scenarios will be specified in the :ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>`.


Assumptions and Limitations
---------------------------

- We assume that antibiotics availability captures actual use, and not simply the treatment being in the facility 
- We assume that the delivery facility is the final facility in the care continum for deliveries that are transferred due to complications
- We assume that the relative risk of sepsis mortality with antibiotics in practice is a value that we can find in the literature
- We have excluded the effect of antibiotics on pneumonia mortality, because this cause is currently lumped with 'other causes'

Validation and Verification Criteria
------------------------------------

- Population-level mortality rate should be the same as when this intervention is not included in the model
- The ratio of sepsis deaths per birth among those without antibiotics access divided by those with antibiotics access should equal the relative risk parameter used in the model
- The baseline coverage of antibiotics in each facility type should match the values in the artifact
- Validation: how does the sepsis moratlity rate in a counterfactual scenario with 100% antibiotic access compare to sepsis mortality rates in high-income countries?  They should be close, and the counterfactual should not be lower.

References
------------

* 
