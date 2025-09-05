.. _azithromycin_intervention:

=========================================
Azithromycin for treating maternal sepsis
=========================================

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
  * - SARA
    - Services Availabiity and Readiness Assessment
    - 

Intervention Overview
-----------------------

Azithomycin is an oral or intravenous single-dose antibiotic that can be taken before or during labour to prevent or reduce incidence of maternal sepsis and other maternal infections. 

This section describes how a prophylactic azithromycin intervention can be implemented and calibrated for the :ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>`.
See the :ref:`Maternal sepsis and other maternal infections cause model <2021_cause_maternal_sepsis_mncnh>` for relevant details.

.. list-table:: Affected Outcomes
  :widths: 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note (ex: is this relationship direct or mediated?)
  * - Maternal sepsis and other maternal infections Incidence Probability :math:`\text{IR}_i^\text{maternal sepsis}`
    - Adjust multiplicatively using RR
    - Yes 
    - 
      - :ref:`Maternal sepsis cause model <2021_cause_maternal_sepsis_mncnh>` 
      - For convenience, we will model this like a dichotomous risk factor; more details below

Baseline Coverage Data
++++++++++++++++++++++++

It appears rare for prophylactic azithromycin during labor to be offered in African settings, so for both BEmONC and CEmONC in Nigeria and Ethiopia, we will use 
a baseline coverage of 0% as a stand-in value while we search for additional evidence. Pakistan BEmONC settings also have a baseline coverage of 0%, but CEmONC
settings in Pakistan should have a baseline coverage of 20.3% according to [Saleem-et-al-2025-intrapartum-antibiotic-use]_.


.. list-table:: Baseline Coverage of intrapartum azithromycin
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
    - Assumption; need to investigate data sources for care seeking those giving birth outside of the hospital system 
  * - All (Ethiopia, Nigeria, Pakistan)
    - BEmONC Facilities
    - 0
    - N/A
    - 
  * - Ethiopia and Nigeria
    - CEmONC Facilities
    - 0
    - N/A
    - 
  * - Pakistan
    - CEmONC Facilities
    - 20.3
    - :math:`\text{Uniform}(15.3,25.3)`
    - Value pulled from [Saleem-et-al-2025-intrapartum-antibiotic-use]_


Vivarium Modeling Strategy
--------------------------

This intervention requires adding an attribute to all simulants to specify if a pregnant person receives prophylactic azithromycin during labor or not.  We will track this
and the model will have different incidence rates for maternal sepsis for individuals with and without prophylactic azithromycin (implemented with a slightly confusing application of our ``Risk`` and ``RiskEffect`` 
components from ``vivarium_public_health``).

The ``Risk`` component adds an attribute to each simulant indicating whether the simulant has prophylactic azithromycin during the intrapartum period, which we assume will be closely 
related to the facility choice during birth, i.e. home births have much lower access than in-facility births, and births in BEmONC facilities have lower access than CEmONC 
facilities.

To make this work naturally with the ``RiskEffect`` component, it is best to think of the risk as "no azithromycin".  With this framing, the ``RiskEffect`` 
component requires data on (1) the relative risk of maternal sepsis incidence for people who did not receive azithromycin before labor began, and (2) the population attributable fraction (PAF) of maternal sepsis 
due to not receiving prophylactic azithromycin.  We will use the decision tree below to estimate the probability of maternal sepsis incidence with and without the use of prophylactic azithromycin, ensuring consistency
with the baseline delivery facility rates and baseline azithromycin coverage.

In Vivarium, this risk effect will modify the maternal sepsis incidence pipeline, resulting in 

.. math::

   \text{IR}_i^\text{maternal sepsis} = \text{IR}^\text{maternal sepsis}_ \cdot (1 - \text{PAF}_\text{no azithromycin}) \cdot \text{RR}_i^\text{no azithromycin}

where :math:`\text{RR}_i^\text{no azithromycin}` is simulant *i*'s individual relative risk for "no azithromycin", meaning :math:`\text{RR}_i^\text{no azithromycin} = \text{RR}_\text{no azithromycin}` 
if simulant *i* does not receive prophylactic azithromycin, and :math:`\text{RR}_i^\text{no azithromycin} = 1` if simulant *i* receives prophylactic azithromycin. 

The relative risk value we will use is pulled from [Ye-et-al-2024-azithromycin-during-labor]_, a 2024 systematic review that investigated the effect of 
prophylactic azithromycin during labor.

.. list-table:: Risk Effect Parameters for No Prophylactic Azithromycin
  :widths: 15 15 15 15
  :header-rows: 1

  * - Parameter
    - Mean
    - Distribution
    - Notes
  * - Relative Risk
    - 1.54
    - Parameter uncertainty implemented as a lognormal distribution: :code:`get_lognorm_from_quantiles(1.54, 1.30, 1.82)`
    - Based on relative risk of 0.65 (95% CI 0.55-0.77) on maternal sepsis incidence for pregnant people receiving prophylactic azithromycin [Ye-et-al-2024-azithromycin-during-labor]_
  * - PAF
    - see below
    - see below
    - see `Calibration strategy` section below for details on how to calculate PAF that is consistent with RR, risk exposure, and facility choice model

Calibration Strategy
--------------------

The following decision tree shows all of the paths from delivery facility choice to prophylactic azithromycin use.  Distinct paths in the tree correspond to disjoint events, 
which we can sum over to find the population probability of maternal sepsis incidence.  The goal here is to use internally consistent conditional probabilities of maternal sepsis incidence
for the subpopulations that receive or do not receive azithromycin, so that the baseline scenario can track who receives azithromycin and still match the baseline maternal sepsis 
incidence rate.

.. graphviz::

    digraph azithromycin {
        rankdir = LR;
        facility [label="Facility type"]
        home [label="p_maternal_sepsis_without_azithromycin"]
        BEmONC [label="azithromycin?"]
        CEmONC [label="azithromycin?"]
        BEmONC_wo [label="p_maternal_sepsis_without_azithromycin"] 
        BEmONC_w [label="p_maternal_sepsis_with_azithromycin"]
        CEmONC_wo [label="p_maternal_sepsis_without_azithromycin"] 
        CEmONC_w [label="p_maternal_sepsis_with_azithromycin"]

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
        &= \sum_{\text{paths without azithromycin}} p(\text{path})\cdot p(\text{maternal_sepsis}|\text{no azithromycin})\\
        &+ \sum_{\text{paths with azithromycin}} p(\text{path})\cdot p(\text{maternal_sepsis}|\text{azithromycin})\\[.1in]
        p(\text{maternal_sepsis}|\text{no azithromycin}) &= \text{RR}_\text{no azithromycin} \cdot p(\text{maternal_sepsis}|\text{azithromycin})
    \end{align*}

where :math:`p(\text{maternal_sepsis})` is the probability of contracting maternal sepsis in the general population, and :math:`p(\text{maternal_sepsis}|\text{azithromycin})` and
:math:`p(\text{maternal_sepsis}|\text{no azithromycin})` are the probability of contracting maternal sepsis in settings with and without receiving prophylactic azithromycin.  For each 
path through the decision tree, :math:`p(\text{path})` is the probability of that path; for example the path that includes the edges labeled BEmONC and 
unavailable occurs with probability that the birth is in a BEmONC facility times the probability that the simulant receives prophylactic azithromycin.

When we fill in the location-specific values for delivery facility rates, azithromycin coverage, relative risk of maternal sepsis incidence with azithromycin, 
and maternal sepsis incidence probability (which is also age-specific), this becomes a system of two linear equations with two unknowns (:math:`p(\text{maternal_sepsis}|\text{azithromycin})` 
and :math:`p(\text{maternal_sepsis}|\text{no azithromycin})`), which we can solve analytically.

As mentioned above, it is convenient to model this intervention like a dichotomous risk factor, so that we can reuse the
:class:`Risk<vivarium_public_health.risks.base_risk.Risk>`
and :class:`RiskEffect<vivarium_public_health.risks.effect.RiskEffect>` components in Vivarium Public Health,
rather than having to write new components from scratch.
Calling the intervention a risk factor can sound a bit confusing because intervention access is a good thing, so it doesn't sound "risky."
Instead, we flip it so the risk factor is "*lack* of access to the intervention."
The :code:`RiskEffect` component expects a relative risk (RR) and a population-attributable fraction (PAF).
Because we are flipping the direction of the risk factor, we need to use the inverse of our original RR, so:

.. math::
    \text{RR}_{\text{no intervention}} = \frac{1}{\text{RR}_{\text{intervention}}}

The PAF is the proportion of deaths due to the outcome that would not occur if all births had access to the intervention.
Since we use the equation :math:`p(\text{outcome}|\text{intervention}) = (1 - \text{PAF}_\text{no intervention}) \cdot p(\text{outcome})`
in the :code:`RiskEffect` component, we solve for :math:`\text{PAF}_\text{no intervention}` as follows:

.. math::
    \text{PAF}_{\text{no intervention}} = 1 - \frac{p(\text{outcome}|\text{intervention})}{p(\text{outcome})}

where the terms on the right hand side can be obtained by solving the system of equations above.

Here is some pseudocode for deriving the PAF and RR of "lack of access to the intervention"::

.. code:: python
  
  p_sepsis = maternal_sepsis_incidence_rate
  relative_risk = 1/RR_azithromycin # this represents the RR of lack of access to azithromycin
  p_sepsis_azith = p_sepsis / (
  (p_home * (1 - p_azith_home) * relative_risk)
  + (p_home * p_azith_home)
  + (p_BEmONC * (1 - p_azith_BEmONC) * relative_risk)
  + (p_CEmONC * (1 - p_azith_CEmONC) * relative_risk)
  + (p_BEmONC * p_azith_BEmONC)
  + (p_CEmONC * p_azith_CEmONC))
  paf_no_azith = 1 - (p_sepsis_azith / p_sepsis)


.. note::

  The above strategy was used for the implementation of this intervention model in the MNCNH portfolio. Note that the value of "p_sepsis" is arbitrary and does not directly affect the resulting PAF value. Documentation for the implemented strategy above and an alternative simpler strategy below (including links to relevant parameters used in the above strategy) are both included here for reference.

**Alternative PAF Derivation**: An alternative, and possibly simpler derivation of the PAF that will calibrate this model is shown below:

.. math::

  p_\text{intervention} = \sum_\text{facility type} p_\text{facility type} * p_{\text{intervention} | \text{facility type}}

  E(\text{RR}_\text{no intervention}) = p_\text{intervention} + (1 - p_\text{intervention}) * \text{RR}_\text{no intervention} 

  \text{PAF}_\text{no intervention} = \frac{E(\text{RR}) - 1}{E(\text{RR})}


Where,

.. list-table:: PAF calculation parameters
  :header-rows: 1 

  * - Parameter
    - Definition
    - Value
    - Note
  * - :math:`p_\text{facility type}`
    - Proportion of population that delivers in a given facility type
    - Defined in the :ref:`Overall delivery setting rate section <facility_setting_rates>` of the :ref:`Facility choice model document <2024_facility_model_vivarium_mncnh_portfolio>`
    - 
  * - :math:`p_{\text{intervention} | \text{facility type}}`
    - Proportion of eligible population in a giving facility type that receives the intervention at baseline 
    - Defined in the `Baseline Coverage Data`_ section of this document
    - 

Assumptions and Limitations
---------------------------

- We assume that azithromycin availability captures actual use, and not simply the treatment being in the facility. 
- We assume that the delivery facility is also the facility where a mother or birthing person will seek care for maternal sepsis.
- We assume that the relative risk of maternal sepsis incidence with azithromycin in practice is a value that we can find in the literature (Note: 
  the value we are using is from [Ye-et-al-2024-azithromycin-during-labor]_.)
- We have excluded the effect of azithromycin on pneumonia incidence/mortality, because this cause is currently lumped with 'other causes'.
- We currenty do not model the impact of azithromycin taken during pregnancy on the incidence of preterm births, despite *some* literature
  evidence that suggests there may be a significant impact. Currently, we are ony modeling the impact of azithromycin taken during labor, rather
  than during pregnancy. We may include in a future iteration of this model the use of azithromycin during pregnancy as a treatment for sexually
  transmitted infections, in which case we may reassess this limitation. For reference, [Hume-Nizon-et-al-2021-azithromycin-during-pregnancy]_
  found an RR of 0.79 (95% CI 0.68-0.93) for LBW and an RR of 0.87 (95% CI 0.78-0.98) for premature births. They also reported an 
  increase in stillbirth incidence. However, more recent publications (the 2024 review referenced above and [Antonucci-et-al-2022-azithromycin-during-pregnancy]_) 
  have reported that there is no conclusive evidence to support that azithromycin use by pregnant women causes adverse 
  neonatal outcomes. 
- We also do not currently model the impact intrapartum azithromycin has on preventing maternal sepsis in partial term pregnancies. In our 
  :ref:`Maternal sepsis and other maternal infections cause model <2021_cause_maternal_sepsis_mncnh>`, we only model full term pregnancies as 
  at-risk for maternal sepsis.
- We assume that [Saleem-et-al-2025-intrapartum-antibiotic-use]_ provides an accurate overview of prophylactic intrampratum antibiotic use in our locations of interest.
  As such, we assume baseline coverage of intrapartum azithromycin use in African sites is basically zero (despite EmONC 2016, SARA 2016, and SARA 2018 reporting the
  presence of intrapartum antibiotics in hospitals to be nonzero - we assume these are given to mothers or birthing parents after delivery, which is not the intervention
  we are modeling here). There was a baseline coverage of 20.3% for Pakistan hospitals though, which we assume is accurate.
- We assume that baseline coverage for azithromycin in home births is 0% (this is not data-backed).

.. todo::

  - If more suitable baseline coverage data for prophylactic azithromycin use for maternal sepsis in CEmONC settings for Nigeria and Ethiopia or BEmONC settings for all locations, 
    we will update accordingly.
  - We need to decide if/how we would model the effect of intrapartum azithromycin on preterm incidence. 

Validation and Verification Criteria
------------------------------------

- Population-level incidence rate should be the same as when this intervention is not included in the model.
- The ratio of maternal sepsis incidence among those without azithromycin divided by those with azithromycin
  should equal the relative risk parameter used in the model.
- The baseline coverage of azithromycin in each facility type should match the values in the artifact.

References
------------

.. [Ye-et-al-2024-azithromycin-during-labor]
  Ye, H., Hu, J., Li, B. et al. Can the use of azithromycin during labour reduce the incidence of infection among puerperae and newborns? A systematic review and meta-analysis of randomized controlled trials. BMC Pregnancy Childbirth 24, 200 (2024). `<https://doi.org/10.1186/s12884-024-06390-6>`_

.. [Hume-Nizon-et-al-2021-azithromycin-during-pregnancy]
  Hume-Nixon M, Quach A, Reyburn R, Nguyen C, Steer A, Russell F. A Systematic Review and meta-analysis of the effect of administration of azithromycin during pregnancy on perinatal and neonatal outcomes. EClinicalMedicine. 2021 Sep 9;40:101123. doi: 10.1016/j.eclinm.2021.101123. PMID: 34541478; PMCID: PMC8436060.

.. [Antonucci-et-al-2022-azithromycin-during-pregnancy]
  Antonucci, R., Cuzzolin, L., Locci, C. et al. Use of Azithromycin in Pregnancy: More Doubts than Certainties. Clin Drug Investig 42, 921–935 (2022). https://doi.org/10.1007/s40261-022-01203-0

.. [Saleem-et-al-2025-intrapartum-antibiotic-use]
  Saleem S, Yasmin H, Moore JL, Rahim A, Shakeel I, Lokangaka A, et al. Intrapartum and postpartum antibiotic use in seven low- and middle-income countries: Findings from the A-PLUS trial. BJOG. 2025; 132(1): 72–80. https://doi-org.offcampus.lib.washington.edu/10.1111/1471-0528.17930