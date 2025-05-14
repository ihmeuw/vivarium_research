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
    - Operationalized as facilities without C-section capabilities
  * - CEmONC
    - Comprehensive emergency obstetric and neonatal care
    - Operationalized as facilities with capabilities to perform  C-section
  * - PAF
    - Population Attributable Fraction
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
  * - Neonatal sepsis and other neonatal infections Mortality Probability :math:`\text{CSMR}_i^\text{sepsis}`
    - Adjust multiplicatively using RR
    - Yes
    - For convenience, we will model this like a dichotomous risk factor; more details below

Baseline Coverage Data
++++++++++++++++++++++++

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


Because there are no RCTs that have attempted to quantify the effect size of antibiotics on neonatal mortality due to sepsis (due 
to significant ethical considerations), we used GBD estimates to calculate an approximated relative risk value. To do this, we looked at 
the neonatal sepsis mortality rate from all locations from 2015-2021, and divided the 80th percentile value by the 20th percentile. We 
also conducted a sensitivity analysis by comparing the resulting RR values with 70/30 percentiles and 90/10 percentiles. These calculations
were done in `this notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/data_prep/nn_antibiotics_effect_size.ipynb>`_. 

.. list-table:: Risk Effect Parameters for Lack-of-Access-to-Antibiotics
  :widths: 15 15 15 15
  :header-rows: 1

  * - Parameter
    - Mean
    - Distribution
    - Notes
  * - Relative Risk
    - 38.0
    - :math:`\text{Normal}(1.39,0.08^2)`
    - Based on relative risk of 0.0263 (95% CI 0.0227-0.0305) of sepsis mortality for neonates with access to antibiotics 
  * - PAF
    - see below
    - see below
    - see `Calibration strategy` section below for details on how to calculate PAF that is consistent with RR, risk exposure, and facility choice model


.. todo:: 

  Check with an expert that this relative risk value seems reasonable - it is a lot higher than any of the other interventions RRs we've used in this simulation so far!

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
- Due to significant ethical considerations, there is no relative risk value reported in scientific literature for the effect of antibiotics on 
  mortality due to neonatal sepsis and other infections. We used GBD estimates of NN sepsis CSMRs from all country-year pairs from 2015 to 2021 to 
  approximate our own value. We assume that the 20th percentile value is representative of a location with less or no antibiotic access, and the 80th
  percentile represents locations with more antibiotic access for neonates.

.. todo::

  If more suitable baseline coverage data for antibiotics for neonatal sepsis at all facility types in all 3 locations, we should use that data instead and update 
  this documentation accordingly. 

Validation and Verification Criteria
------------------------------------

- Population-level mortality rate should be the same as when this intervention is not included in the model
- The ratio of sepsis deaths per birth among those without antibiotics access divided by those with antibiotics access should equal the relative risk parameter used in the model
- The baseline coverage of antibiotics in each facility type should match the values in the artifact
- Validation: how does the sepsis moratlity rate in a counterfactual scenario with 100% antibiotic access compare to sepsis mortality rates in high-income countries?  They should be close, and the counterfactual should not be lower.

References
------------

* https://chatgpt.com/share/67c1c7cf-f294-8010-8e65-261f87039e3b
* https://chatgpt.com/share/67c1c7f9-8230-8010-9ade-30ed07b06bd0

