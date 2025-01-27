.. mncnh_interventions:

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
  * - CPAP
    - Continuous positive airway pressure
    - 
  * - RDS
    - respiratory distress syndrome
    - 

Intervention Overview
-----------------------

CPAP is used for the prevention and treatment of respiratory distress syndrome. A recent (2020) Cochrane Review found that CPAP was associated with lower risk of treatment failure (death or use of assisted ventilation) and lower overall mortality with moderate‐certainty evidence.

This section describes how a CPAP intervention can be implemented and calibrated for the :ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>`.

.. list-table:: Affected Outcomes
  :widths: 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note (ex: is this relationship direct or mediated?)
  * - Preterm with RDS Mortality Probability
    - Decrease multiplicatively
    - Yes
    - 

Baseline Coverage Data
++++++++++++++++++++++++

The :ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>` includes data on current coverage levels for the specific locations we are focused on modeling.  We might wish to enhance this by predicting coverage in additional locations, in correlation with other key intervention technologies, based on sources such as existing SPA and SARA data.

Vivarium Modeling Strategy
--------------------------

We will use the enhanced decision tree below to find the probability of RDS mortality with and without access to CPAP that are logically consistent with the baseline delivery facility rates and baseline CPAP coverage (and population level RDS mortality probability). Since the neonatal model includes timesteps for both the early and late neonatal periods, this calculation must be calculated for both time periods.

We will then add an attribute to each simulant indicating whether the birth occurs at a facility with access to CPAP (which will be dependent on the facility choice, i.e. no access for home births and lower access for BEmONC than CEmONC facilities).

We will then use the conditional probabilities for simulants with and without access to determine which simulants die from RDS.

.. todo::

  include the relative risk of RDS mortality with CPAP here and in the concept model document, without duplicating it (see recent PR to add quickstart docs in the readme for an example of how)


Calibration Strategy
--------------------

The following decision tree shows all of the paths from delivery facility choice to CPAP availability.  Distinct paths in the tree correspond to disjoint events, which we can sum over to find the population probability of RDS mortality.

.. graphviz::

    digraph CPAP {
        rankdir = LR;
        start [color="none"]
        facility [label="1"]
        home [label="p_RDS_without_CPAP"]
        BEmONC [label="7"]
        CEmONC [label="7"]
        BEmONC_wo [label="p_RDS_without_CPAP"] 
        BEmONC_w [label="p_RDS_with_CPAP"]
        CEmONC_wo [label="p_RDS_without_CPAP"] 
        CEmONC_w [label="p_RDS_with_CPAP"]

        start -> facility  [label = "delivery facility type"]
        facility -> home  [label = "home birth"]
        facility -> BEmONC  [label = "BEmONC"]
        facility -> CEmONC  [label = "CEmONC"]

        BEmONC -> BEmONC_w  [label = "CPAP available"]
        BEmONC -> BEmONC_wo  [label = "CPAP unavailable"]

        CEmONC -> CEmONC_w  [label = "CPAP available"]
        CEmONC -> CEmONC_wo  [label = "CPAP unavailable"]
    }

.. math::
    \begin{align*}
        p_\text{RDS} 
        &= \sum_{\text{paths without CPAP}} p(\text{path})\cdot p_\text{RDS_wo}\\
        &+ \sum_{\text{paths with CPAP}} p(\text{path})\cdot p_\text{RDS_w}\\[.1in]
        p_\text{RDS_w} &= RR_\text{CPAP} \cdot p_\text{RDS_wo}
    \end{align*}



When we fill in the location-specific values for delivery facility rates, CPAP coverage, relative risk of mortality with CPAP access, and mortality probability (which is also age-specific), this becomes a system of two linear equations have two unknown (p_RDS_w and p_RDS_wo), which we can solve analytically.

Scenarios
---------

The :ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>` includes specific scenarios that might change the importance of this intervention. This includes interventions that might lower the prevalence of RDS (like ACS), and might also include interventions that increase the coverage of CPAP or increase the rate of preterm delivery with access CPAP.


Assumptions and Limitations
---------------------------

- We assume that CPAP availability captures actual use, and not simply the machine being in the facility 
- We assume that the delivery facility is the final facility in the care continum for deliveries that are transferred due to complications
- We assume that the relative risk of RDS mortality with CPAP in practice is similar to that found in the Cochrane Review meta-analysis

Validation and Verification Criteria
------------------------------------

- Population-level mortality rate should be the same as when this intervention is not included in the model
- The ratio of RDS mortality rate among those without CPAP access divided by those with CPAP access should equal the relative risk from the Cochrane Review
- The baseline coverage of CPAP in each facility type should match the values in the artifact

References
------------

* https://pmc.ncbi.nlm.nih.gov/articles/PMC8094155/
