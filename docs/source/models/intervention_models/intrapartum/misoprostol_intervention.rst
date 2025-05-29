.. _azithromycin_intervention:

============================================
Misoprostol for treating maternal hemorrhage
============================================

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

Intervention Overview
-----------------------

Misoprostol is used to prevent maternal hemorrhage in the intrapartum period, reducing the risk incidence.

This section describes how the misoprostol intervention can be implemented and calibrated for the :ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>`.

.. list-table:: Affected Outcomes
  :widths: 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note (ex: is this relationship direct or mediated?)
  * - Maternal Hemorrhage Incidence Probability :math:`\text{IR}_i^\text{hemorrhage}`
    - Adjust multiplicatively using RR
    - Yes
    - For convenience, we will model this like a dichotomous risk factor; more details below

Baseline Coverage Data
++++++++++++++++++++++++

Baseline coverage data for azithromycin in CEmONC and BEmONC is only reflective of Ethiopian health systems in 2015-2018. These 
placeholder values come from three data sources, all for Ethiopia, all identified by the Health Systems team at IHME: the 2016 
Ethiopia EmONC Final Report found 39.2% of BEmONC facilities and 90.4% of CEmONC facilities have azithromycin; the 2016 SARA Report 
found 68.4% of BEmONC facilities and 90.5% of CEmONC facilities have azithromycin; the 2018 SARA Report found 75.9% of BEmONC 
facilities and 98.0% of CEmONC facilities have azithromycin. While we plan a data strategy to fill the gaps we have used a simple 
average.

.. list-table:: Baseline Coverage of intrapartum azithromycin
  :widths: 15 15 15 15
  :header-rows: 1

  * - Birth Facility
    - Coverage Mean (%)
    - Coverage Distribution (%)
    - Notes
  * - Home Birth
    - 5
    - :math:`\text{Uniform}(0,10)`
    - Assumption; need to investigate data sources for care seeking those giving birth outside of the hospital system 
  * - BEmONC Facilities
    - 61.2
    - :math:`\text{Uniform}(39.2,75.9)`
    - placeholder value based on three data points 
  * - CEmONC Facilities
    - 93.0
    - :math:`\text{Uniform}(90.4,98.0)`
    - placeholder value based on three data points 


Vivarium Modeling Strategy
--------------------------

This intervention requires adding an attribute to all simulants to specify if a pregnant person has access to a facility with access to azithromycin.  We will track if a simulant has access to azithromycin 
and the model will have different incidence rates for sepsis for individuals with and without access to azithromycin (implemented with a slightly confusing application of our ``Risk`` and ``RiskEffect`` 
components from ``vivarium_public_health``).

The ``Risk`` component adds an attribute to each simulant indicating whether the simulant has access to azithromycin during the intrapartum period, which we assume will be closely 
related to the facility choice during birth, i.e. home births have much lower access than in-facility births, and births in BEmONC facilities have lower access than CEmONC 
facilities.

To make this work naturally with the ``RiskEffect`` component, it is best to think of the risk as "lack of access to azithromycin".  With this framing, the ``RiskEffect`` 
component requires data on (1) the relative risk of sepsis incidence for people with lack of access to azithromycin, and (2) the population attributable fraction (PAF) of sepsis 
due to lack of access to azithromycin.  We will use the decision tree below to find the probability of sepsis incidence with and without access to azithromycin that are logically 
consistent with the baseline delivery facility rates and baseline azithromycin coverage.

In Vivarium, this risk effect will modify the sepsis incidence pipeline, resulting in 

.. math::

   \text{IR}_i^\text{sepsis} = \text{IR}^\text{sepsis}_ \cdot (1 - \text{PAF}_\text{no azithromycin}) \cdot \text{RR}_i^\text{no azithromycin}

where :math:`\text{RR}_i^\text{no azithromycin}` is simulant *i*'s individual relative risk for "no azithromycin", meaning :math:`\text{RR}_i^\text{no azithromycin} = \text{RR}_\text{no azithromycin}` 
if simulant *i* accesses a facility without azithromycin, and :math:`\text{RR}_i^\text{no azithromycin} = 1` if simulant *i* accesses a facility *with* azithromycin.

If there are other interventions also affecting the IR of sepsis, the pipeline will combine these effects, and we can write out the math for this risk explicitly as 

.. math::

   \text{IR}^\text{sepsis}_{i, \text{updated}} = \text{IR}^\text{sepsis}_{i, \text{original}} \cdot (1 - \text{PAF}_\text{no azithromycin}) \cdot \text{RR}_i^\text{no azithromycin}

This reduces to the previous formula if there are no other interventions, and we would have 

.. math::

   \text{IR}^\text{sepsis}_{i, \text{original}} = \text{IR}^\text{sepsis}_

The relative risk value we will use is pulled from `this 2024 systematic review/meta-analysis <https://bmcpregnancychildbirth.biomedcentral.com/articles/10.1186/s12884-024-06390-6#:~:text=Primary%20outcomes,-Among%20the%20six&text=The%20incidence%20of%20maternal%20sepsis%20was%20significantly%20lower%20in%20the,was%20analysed%20in%20three%20studies.>`_ 
that investigated the effect of azithromycin during labor.

.. list-table:: Risk Effect Parameters for Lack-of-Access-to-Azithromycin
  :widths: 15 15 15 15
  :header-rows: 1

  * - Parameter
    - Mean
    - Distribution
    - Notes
  * - Relative Risk
    - 1.54
    - :math:`\text{Normal}(1.54,0.08^2)`
    - Based on placeholder relative risk of 0.65 (95% CI 0.55-0.77) on sepsis incidence for pregnant people with access to azithromycin
  * - PAF
    - see below
    - see below
    - see `Calibration strategy` section below for details on how to calculate PAF that is consistent with RR, risk exposure, and facility choice model

Calibration Strategy
--------------------

The following decision tree shows all of the paths from delivery facility choice to azithromycin availability.  Distinct paths in the tree correspond to disjoint events, 
which we can sum over to find the population probability of sepsis incidence.  The goal here is to use internally consistent conditional probabilities of sepsis incidence
for the subpopulations with and without access to azithromycin, so that the baseline scenario can track who has access to azithromycin and still match the baseline sepsis 
incidence rate.

.. graphviz::

    digraph azithromycin {
        rankdir = LR;
        facility [label="Facility type"]
        home [label="p_sepsis_without_azithromycin"]
        BEmONC [label="azithromycin?"]
        CEmONC [label="azithromycin?"]
        BEmONC_wo [label="p_sepsis_without_azithromycin"] 
        BEmONC_w [label="p_sepsis_with_azithromycin"]
        CEmONC_wo [label="p_sepsis_without_azithromycin"] 
        CEmONC_w [label="p_sepsis_with_azithromycin"]

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
        &= \sum_{\text{paths without azithromycin}} p(\text{path})\cdot p(\text{sepsis}|\text{no azithromycin})\\
        &+ \sum_{\text{paths with azithromycin}} p(\text{path})\cdot p(\text{sepsis}|\text{azithromycin})\\[.1in]
        p(\text{sepsis}|\text{no azithromycin}) &= \text{RR}_\text{no azithromycin} \cdot p(\text{sepsis}|\text{azithromycin})
    \end{align*}

where :math:`p(\text{sepsis})` is the probability of contracting sepsis in the general population, and :math:`p(\text{sepsis}|\text{azithromycin})` and
 :math:`p(\text{sepsis}|\text{no azithromycin})` are the probability of contracting sepsis in settings with and without access to azithromycin.  For each 
 path through the decision tree, :math:`p(\text{path})` is the probability of that path; for example the path that includes the edges labeled BEmONC and 
 unavailable occurs with probability that the birth is in a BEmONC facility times the probability that the facility has azithromycin available.

When we fill in the location-specific values for delivery facility rates, azithromycin coverage, relative risk of sepsis incidence with azithromycin access, 
and sepsis incidence probability (which is also age-specific), this becomes a system of two linear equations with two unknowns (:math:`p(\text{sepsis}|\text{azithromycin})` 
and :math:`p(\text{sepsis}|\text{no azithromycin})`), which we can solve analytically using the same approach as in the :ref:`cpap calibration <cpap_calibration>`.

**Alternative PAF Derivation**: An alternative, and possibly simpler derivation of the PAF that will calibrate this model comes from the observation that
:math:`\text{PAF} = 1 - \frac{1}{\mathbb{E}(\text{RR})}`.  If we define 

.. math::

   p(\text{no azithromycin}) = \sum_{\text{paths without azithromycin}} p(\text{path}),

then can use this to expand the identity

.. math::

   \text{PAF}_\text{no azithromycin} = 1 - \frac{1}{\mathbb{E}(\text{RR})}.

Since our risk exposure has two categories,

.. math::

   \mathbb{E}(\text{RR}) = p(\text{no azithromycin}) \cdot \text{RR}_\text{no azithromycin} + (1 - p(\text{no azithromycin})) \cdot 1.



Scenarios
---------

.. todo::

  Describe our general approach to scenarios, for example set coverage to different levels in different types of health facilities; then the specific values for specific scenarios will be specified in the :ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>`.


Assumptions and Limitations
---------------------------

- We assume that azithromycin availability captures actual use, and not simply the treatment being in the facility. 
- We assume that the delivery facility is also the facility where a mother or birthing person will seek care for sepsis.
- We assume that the relative risk of sepsis incidence with azithromycin in practice is a value that we can find in the literature (Note: 
  the value we are using is from `this 2024 systematic review <https://bmcpregnancychildbirth.biomedcentral.com/articles/10.1186/s12884-024-06390-6#:~:text=Primary%20outcomes,-Among%20the%20six&text=The%20incidence%20of%20maternal%20sepsis%20was%20significantly%20lower%20in%20the,was%20analysed%20in%20three%20studies.>`_)
- We have excluded the effect of azithromycin on pneumonia incidence/mortality, because this cause is currently lumped with 'other causes'.
- We currenty do not model the impact of intrapartum azithromycin on the incidence of preterm births, despite *some* literature
  evidence that suggests there may be a significant impact. For reference, this `2021 systematic review <https://pmc.ncbi.nlm.nih.gov/articles/PMC8436060/>`_
  found an RR of 0.79 (95% CI 0.68-0.93) for LBW and an RR of 0.87 (95% CI 0.78-0.98) for premature births. They also reported an 
  increase in stillbirht incidence. However, more recent publications (the 2024 review referenced above and  `this 2022 paper <https://link.springer.com/article/10.1007/s40261-022-01203-0>`_) 
  have reported that there is no conclusive evidence to support that azithromycin use by pregnant women causes adverse 
  neonatal outcomes.
- Baseline coverage data for azithromycin in CEmONC and BEmONC is only reflective of Ethiopian health systems in 2015-2018. These placeholder values come 
  from three data sources, all for Ethiopia, all identified by the Health Systems team at IHME: the 2016 Ethiopia EmONC Final 
  Report found 39.2% of BEmONC facilities and 90.4% of CEmONC facilities have azithromycin; the 2016 SARA Report 
  found 68.4% of BEmONC facilities and 90.5% of CEmONC facilities have azithromycin; the 2018 SARA Report found 75.9% of BEmONC facilities
  and 98.0% of CEmONC facilities have azithromycin. While we plan a data strategy to fill the gaps we have used a simple average.
- We assume that baseline coverage for azithromycin in home births is 5% (this is not data-backed).

.. todo::

  If more suitable baseline coverage data for azithromycin for maternal sepsis at all facility types for Nigeria and Pakistan, we should use that data instead and update 
  this documentation accordingly. We also need to decide if/how we would model the effect of intrapartum azithromycin on preterm incidence. 

Validation and Verification Criteria
------------------------------------

- Population-level incidence rate should be the same as when this intervention is not included in the model
- The ratio of maternal sepsis incidence among those without azithromycin access divided by those with azithromycin access 
  should equal the relative risk parameter used in the model
- The baseline coverage of azithromycin in each facility type should match the values in the artifact
- Validation: how does the sepsis incidence rate in a counterfactual scenario with 100% antibiotic access compare to sepsis incidence rates in high-income countries?  They should be close, and the counterfactual should not be lower.

References
------------

* https://chatgpt.com/share/67c1c7cf-f294-8010-8e65-261f87039e3b
* https://chatgpt.com/share/67c1c7f9-8230-8010-9ade-30ed07b06bd0
* https://bmcpregnancychildbirth.biomedcentral.com/articles/10.1186/s12884-024-06390-6#:~:text=Primary%20outcomes,-Among%20the%20six&text=The%20incidence%20of%20maternal%20sepsis%20was%20significantly%20lower%20in%20the,was%20analysed%20in%20three%20studies.
* https://pmc.ncbi.nlm.nih.gov/articles/PMC8436060/ 
* https://link.springer.com/article/10.1007/s40261-022-01203-0


