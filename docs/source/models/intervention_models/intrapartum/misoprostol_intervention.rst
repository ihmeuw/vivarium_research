.. _misoprostol_intervention:

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
  * - ANC
    - Antenatal Care 
    - 
  * - PPH
    - Postpartum Hemmorrhage
    - For consistency with GBD Causes, we use the term 'maternal hemorrhage' instead of PPH throughout the course of this document.

Intervention Overview
-----------------------

Misoprostol is an intramuscular prostaglandin that can be taken orally or sublingually during labor to prevent or reduce incidence of maternal hemorrhage. Because 
misoprostol is stable at ambient temperatures, can be taken orally or sublingually, and is inexpensive, it has been shown to be well-suited 
for the prevention of maternal hemorrhage in community or at-home settings where injectible conventional uterotonics are not available.[Alfirevic-et-al-2007-pph_prevention]_

In line with the WHO Essential Medicines List which approved misoprostol “for the prevention of PPH in settings where 
oxytocin is not available or cannot be safely used” ([WHO-2011]_), we will model a misoprostol intervention in which 
women who attend antenatal care (ANC) facilities are eligible to receive an advanced distribution of misoprostol for self-administration
during a home birth. Because misoprostol is not as effective as conventional uterotonics in prevention of maternal hemorrhage, we will
not model the distribution of misoprostol in BEmONC or CEmONC facilities where injectible uterotonics are more widely available.[Tunçalp-2012-Cochrane-Review]_

This section describes how a misoprostol intervention can be implemented and calibrated for the :ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>`.
See the :ref:`Maternal hemorrhage cause model <2021_cause_maternal_hemorrhage_mncnh>` for relevant details.

.. list-table:: Affected Outcomes
  :widths: 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note (ex: is this relationship direct or mediated?)
  * - Maternal Hemorrhage Incidence Probability :math:`\text{IR}_i^\text{maternal hemorrhage}`
    - Adjust multiplicatively using RR
    - Yes 
    - 
      - :ref:`Maternal hemorrhage cause model <2021_cause_maternal_hemorrhage_mncnh>` 
      - For convenience, we will model this like a dichotomous risk factor; more details below

Baseline Coverage Data
++++++++++++++++++++++++

We are only interested in modeling the impact of misoprostol distribution in the prevention of maternal hemorrhage in at-home 
settings, so baseline coverage of all BEmONC and CEmONC facilities should be zero. Currently our baseline value for at-home
administration of misoprostol is not data-backed, so we will need to update this once we find better data.


.. list-table:: Baseline Coverage of intrapartum misoprostol
  :widths: 15 15 15 15 15
  :header-rows: 1

  * - Location
    - Birth Facility
    - Coverage Mean (%)
    - Coverage Distribution (%)
    - Notes
  * - All (Ethiopia, Nigeria, Pakistan)
    - Home Birth
    - 5
    - N/A
    - Assumption; need to investigate data sources for care seeking those giving birth outside of the hospital system 
  * - All (Ethiopia, Nigeria, Pakistan)
    - BEmONC and CEmONC Facilities
    - 0
    - N/A
    - We are only interested in modeling the impact of misoprostol on home births, not in-facility births, where mothers
    and birthing parents should have access to more effective injectible uterotonics.[Tunçalp-2012-Cochrane-Review]_

.. todo:: 

  Replace placeholder baseline coverage with data-backed estimate once we find a better data source. 

Vivarium Modeling Strategy
--------------------------

This intervention requires adding an attribute to all simulants who attended ANC facilities during their pregnancy and give birth at home to specify if a pregnant person 
receives misoprostol during labor or not.  We will track this and the model will have different incidence rates for maternal hemorrhage for individuals with and without 
misoprostol (implemented with a slightly confusing application of our ``Risk`` and ``RiskEffect`` components from ``vivarium_public_health``).

The ``Risk`` component adds an attribute to each simulant indicating whether the simulant has misoprostol during the intrapartum period. Only simulants who attended ANC
during pregnancy and who give birth at home are eligible for this intervention.

To make this work naturally with the ``RiskEffect`` component, it is best to think of the risk as "no misoprostol".  With this framing, the ``RiskEffect`` 
component requires data on (1) the relative risk of maternal hemorrhage incidence for people who did not receive misoprostol before labor began, and (2) the population attributable fraction (PAF) of maternal hemorrhage 
due to not receiving misoprostol.  We will use the decision tree below to estimate the probability of maternal hemorrhage incidence with and without the use of misoprostol, ensuring consistency
with the baseline delivery facility rates and baseline misoprostol coverage.

In Vivarium, this risk effect will modify the maternal hemorrhage incidence pipeline, resulting in 

.. math::

   \text{IR}_i^\text{maternal hemorrhage} = \text{IR}^\text{maternal hemorrhage}_ \cdot (1 - \text{PAF}_\text{no misoprostol}) \cdot \text{RR}_i^\text{no misoprostol}

where :math:`\text{RR}_i^\text{no misoprostol}` is simulant *i*'s individual relative risk for "no misoprostol", meaning :math:`\text{RR}_i^\text{no misoprostol} = \text{RR}_\text{no misoprostol}` 
if simulant *i* does not receive misoprostol, and :math:`\text{RR}_i^\text{no misoprostol} = 1` if simulant *i* receives misoprostol. 

The relative risk value we will use is pulled from [Tunçalp-2012-Cochrane-Review]_, the most recent Cochrane Review of the effect of 
sublingually received misoprostol during labor on the prevention of maternal hemorrhage.

.. list-table:: Risk Effect Parameters for No Misoprostol
  :widths: 15 15 15 15
  :header-rows: 1

  * - Parameter
    - Mean
    - Distribution
    - Notes
  * - Relative Risk
    - 1.52
    - :math:`\text{Normal}(1.52,0.08^2)`
    - Based on relative risk of 0.66 (95% CI 0.10-0.94) on maternal hemorrhage incidence for pregnant people receiving misoprostol
  * - PAF
    - see below
    - see below
    - see `Calibration strategy` section below for details on how to calculate PAF that is consistent with RR, risk exposure, and facility choice model

Calibration Strategy
--------------------

The following decision tree shows all of the paths from delivery facility choice to misoprostol use.  Distinct paths in the tree correspond to disjoint events, 
which we can sum over to find the population probability of maternal hemorrhage incidence.  The goal here is to use internally consistent conditional probabilities of maternal hemorrhage incidence
for the subpopulations that receive or do not receive misoprostol, so that the baseline scenario can track who receives misoprostol and still match the baseline maternal hemorrhage 
incidence rate.

.. graphviz::

    digraph misoprostol {
        rankdir = LR;
        ANC [label="Attended ANC?"]
        no [label="p_maternal_hemorrhage_without_misoprostol"]
        yes [label="Facility type"]
        home_w [label="p_maternal_hemorrhage_with_misoprostol"]
        home_wo [label="p_maternal_hemorrhage_without_misoprostol"] 
        BEmONC [label="p_maternal_hemorrhage_without_misoprostol"] 
        CEmONC [label="p_maternal_hemorrhage_without_misoprostol"]

        ANC -> yes [label = "Yes"]
        ANC -> no [label = "No"]
         

        yes -> home  [label = "home birth"]
        yes -> BEmONC  [label = "BEmONC"]
        yes -> CEmONC  [label = "CEmONC"]

        home -> home_w [label = "received"]
        home -> home_wo [label = "not received"]
    }


.. math::
    \begin{align*}
        p(\text{maternal_hemorrhage}) 
        &= \sum_{\text{paths without misoprostol}} p(\text{path})\cdot p(\text{maternal_hemorrhage}|\text{no misoprostol})\\
        &+ \sum_{\text{paths with misoprostol}} p(\text{path})\cdot p(\text{maternal_hemorrhage}|\text{misoprostol})\\[.1in]
        p(\text{maternal_hemorrhage}|\text{no misoprostol}) &= \text{RR}_\text{no misoprostol} \cdot p(\text{maternal_hemorrhage}|\text{misoprostol})
    \end{align*}

where :math:`p(\text{maternal_hemorrhage})` is the probability of contracting maternal hemorrhage in the general population, and :math:`p(\text{maternal_hemorrhage}|\text{misoprostol})` and
:math:`p(\text{maternal_hemorrhage}|\text{no misoprostol})` are the probability of contracting maternal hemorrhage in settings with and without receiving misoprostol.  For each 
path through the decision tree, :math:`p(\text{path})` is the probability of that path; for example the path that includes the edges labeled BEmONC and 
unavailable occurs with probability that the birth is in a BEmONC facility times the probability that the simulant receives misoprostol.

When we fill in the location-specific values for delivery facility rates, misoprostol coverage, relative risk of maternal hemorrhage incidence with misoprostol, 
and maternal hemorrhage incidence probability (which is also age-specific), this becomes a system of two linear equations with two unknowns (:math:`p(\text{maternal_hemorrhage}|\text{misoprostol})` 
and :math:`p(\text{maternal_hemorrhage}|\text{no misoprostol})`), which we can solve analytically using the same approach as in the :ref:`cpap calibration <cpap_calibration>`.

**Alternative PAF Derivation**: An alternative, and possibly simpler derivation of the PAF that will calibrate this model comes from the observation that
:math:`\text{PAF} = 1 - \frac{1}{\mathbb{E}(\text{RR})}`.  If we define 

.. math::

   p(\text{no misoprostol}) = \sum_{\text{paths without misoprostol}} p(\text{path}),

then can use this to expand the identity

.. math::

   \text{PAF}_\text{no misoprostol} = 1 - \frac{1}{\mathbb{E}(\text{RR})}.

Since our risk exposure has two categories,

.. math::

   \mathbb{E}(\text{RR}) = p(\text{no misoprostol}) \cdot \text{RR}_\text{no misoprostol} + (1 - p(\text{no misoprostol})) \cdot 1.




Assumptions and Limitations
---------------------------

- We assume that misoprostol availability captures actual use, and not simply the treatment being in the facility. 
- We assume that the delivery facility is also the facility where a mother or birthing person will seek care for maternal hemorrhage.
- We assume that the relative risk of maternal hemorrhage incidence with misoprostol in practice is a value that we can find in the literature (Note: 
  the value we are using is from [Ye-et-al-2024-misoprostol-during-labor]_.)
- We have excluded the effect of misoprostol on pneumonia incidence/mortality, because this cause is currently lumped with 'other causes'.
- We currenty do not model the impact of misoprostol taken during pregnancy on the incidence of preterm births, despite *some* literature
  evidence that suggests there may be a significant impact. Currently, we are ony modeling the impact of misoprostol taken during labor, rather
  than during pregnancy. We may include in a future iteration of this model the use of misoprostol during pregnancy as a treatment for sexually
  transmitted infections, in which case we may reassess this limitation. For reference, [Hume-Nizon-et-al-2021-misoprostol-during-pregnancy]_
  found an RR of 0.79 (95% CI 0.68-0.93) for LBW and an RR of 0.87 (95% CI 0.78-0.98) for premature births. They also reported an 
  increase in stillbirth incidence. However, more recent publications (the 2024 review referenced above and [Antonucci-et-al-2022-misoprostol-during-pregnancy]_) 
  have reported that there is no conclusive evidence to support that misoprostol use by pregnant women causes adverse 
  neonatal outcomes. 
- We also do not currently model the impact intrapartum misoprostol has on preventing maternal hemorrhage in partial term pregnancies. In our 
  :ref:`Maternal hemorrhage and other maternal infections cause model <2021_cause_maternal_hemorrhage_mncnh>`, we only model full term pregnancies as 
  at-risk for maternal hemorrhage.
- We assume that [Saleem-et-al-2025-intrapartum-antibiotic-use]_ provides an accurate overview of prophylactic intrampratum antibiotic use in our locations of interest.
  As such, we assume baseline coverage of intrapartum misoprostol use in African sites is basically zero (despite EmONC 2016, SARA 2016, and SARA 2018 reporting the
  presence of intrapartum antibiotics in hospitals to be nonzero - we assume these are given to mothers or birthing parents after delivery, which is not the intervention
  we are modeling here). There was a baseline coverage of 20.3% for Pakistan hospitals though, which we assume is accurate.
- We assume that baseline coverage for misoprostol in home births is 0% (this is not data-backed).

.. todo::

  - If more suitable baseline coverage data for misoprostol use for maternal hemorrhage in CEmONC settings for Nigeria and Ethiopia or BEmONC settings for all locations, 
    we will update accordingly.
  - We need to decide if/how we would model the effect of intrapartum misoprostol on preterm incidence. 

Validation and Verification Criteria
------------------------------------

- Population-level incidence rate should be the same as when this intervention is not included in the model.
- The ratio of maternal hemorrhage incidence among those without misoprostol divided by those with misoprostol
  should equal the relative risk parameter used in the model.
- The baseline coverage of misoprostol in each facility type should match the values in the artifact.

References
------------

.. [Alfirevic-et-al-2007-pph_prevention]
  Alfirevic, Z., Blum, J., Walraven, G., Weeks, A. and Winikoff, B. (2007), Prevention of postpartum hemorrhage with misoprostol. International Journal of Gynecology & Obstetrics, 99: S198-S201. https://doi.org/10.1016/j.ijgo.2007.09.012

.. [Tunçalp-2012-Cochrane-Review]
  Tunçalp Ö, Hofmeyr GJ, Gülmezoglu AM. Prostaglandins for preventing postpartum haemorrhage. Cochrane Database of Systematic Reviews 2012, Issue 8. Art. No.: CD000494. DOI: 10.1002/14651858.CD000494.pub4. Accessed 02 June 2025.
  
.. [WHO-2011]
  WHO Expert Committee on Essential Medicines. Unedited report of the 18th Expert Committee on the Selection and Use of Essential Medicines. WHO, 2011.