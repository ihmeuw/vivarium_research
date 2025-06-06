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
    - Postpartum Hemorrhage
    - For consistency with the official GBD Cause list and our :ref:`Maternal hemorrhage cause model <2021_cause_maternal_hemorrhage_mncnh>`,
      we use the term 'maternal hemorrhage' instead of PPH throughout the course of this document.

Intervention Overview
-----------------------

Misoprostol is an intramuscular prophylactic prostaglandin that can be taken orally or sublingually during labor to prevent or reduce incidence of maternal hemorrhage. Because 
misoprostol is stable and water-soluble at ambient temperatures, can be taken orally or sublingually, and is inexpensive, it has been shown to be well-suited 
for the prevention of maternal hemorrhage in community or at-home settings where injectible conventional uterotonics are not available ([Alfirevic-et-al-2007-pph_prevention]_).

The most up-to-date WHO recommendation ([WHO-2020]_) on misoprostol use for maternal hemorrhage prevention states that "In settings where 
women give birth outside of a health facility and in the absence of skilled health personnel, a strategy of antenatal distribution of misoprostol
to pregnant women for self-administration is recommended for prevention of postpartum haemorrhage, only with targeted monitoring and evaluation." 
In line with this recommendation, we will model a misoprostol intervention in which women who attend antenatal care (ANC) facilities are eligible to 
receive an advanced distribution of misoprostol for self-administration during a home birth. Because misoprostol is not as effective as conventional 
uterotonics (i.e., oxytocin) in prevention of maternal hemorrhage, we will not model the distribution of misoprostol in BEmONC or CEmONC facilities where injectible 
uterotonics are more widely available ([Tunçalp-2012-Cochrane-Review]_). 

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
    - This is a placeholder value that we will replace after further investigation of data sources for care seeking those giving birth outside of the hospital system.
      This will be a location-specific value, please code accordingly. 
  * - All (Ethiopia, Nigeria, Pakistan)
    - BEmONC and CEmONC Facilities
    - 0
    - N/A
    - We are only interested in modeling the impact of misoprostol on home births, not in-facility births, where mothers
      and birthing parents should have access to more effective injectible uterotonics. [Tunçalp-2012-Cochrane-Review]_

.. todo:: 

  Replace placeholder baseline coverage with data-backed estimate once we find a better data source. 

Vivarium Modeling Strategy
--------------------------

This intervention requires adding an attribute to all simulants who attended ANC facilities during their pregnancy and give birth at home to specify if a pregnant person 
receives misoprostol during labor or not.  We will track this and the model will have different incidence rates for maternal hemorrhage for individuals with and without 
misoprostol (implemented with a slightly confusing application of our ``Risk`` and ``RiskEffect`` components from ``vivarium_public_health``).

The ``Risk`` component adds an attribute to each simulant indicating whether the simulant has received misoprostol during the intrapartum period. Only simulants who attended ANC
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
:math:`p(\text{maternal_hemorrhage}|\text{no misoprostol})` are the probability of contracting maternal hemorrhage with and without receiving misoprostol.  For each 
path through the decision tree, :math:`p(\text{path})` is the probability of that path; for example the path that includes the edges labeled Home and 
not received occurs with probability that the birth is at home times the probability that the simulant receives misoprostol.

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

- We assume that the relative risk of maternal hemorrhage incidence with misoprostol in practice is a value that we can find in the literature (Note: 
  the value we are using is from [Tunçalp-2012-Cochrane-Review]_.)
- We only consider the use of misoprostol in the prevention of maternal hemorrhage, despite other documented clinical uses of misoprostol,
  such as for therapeutic abortion.
- We currenty do not model the increased risk of hyperpyrexia due to misoprostol consumption, because this adverse effect is most likely to occur 
  when dosage is higher than the recommended 600 micrograms of misoprostol. (Note: [Hofmeyr-et-al-2013-Cochrane-Review]_ found that "Pyrexia (defined as body temperature over 38°C) was increased with misoprostol compared 
  with controls (56 studies, 2776/25,647 (10.8%) versus 614/26,800 (2.3%); average RR 3.97, 95% CI 3.13 to 5.04; Tau² = 0.47, I² = 80%). The effect 
  was greater for trials using misoprostol 600 µg or more (27 studies; 2197/17,864 (12.3%) versus 422/18,161 (2.3%); average RR 4.64; 95% CI 3.33 to 
  6.46; Tau² = 0.51, I² = 86%) than for those using misoprostol 400 µg or less (31 studies; 525/6751 (7.8%) versus 185/7668 (2.4%); average RR 3.07; 
  95% CI 2.25 to 4.18; Tau² = 0.29, I² = 58%)".)
- We assume that baseline coverage for misoprostol in home births is 0%, based on literature evidence that community distribution of oral misoprostol 
  has not been widely implemented in Nigeria, Ethiopia, or Pakistan. (e.g. [Hobday-et-al-2017-misoprostol-scale-up]_ conducted a narrative 
  review of the scale-up of community-based misoprostol and found little evidence of scale-up.)
- We do not model use of misoprostol for prevention of maternal hemorrhage in BEmONC and CEmONC facilities based on the [WHO-2020]_ recommendation and with
  the assumption that BEmONC and CEmONC facilities in our locations of interest have injectible uterotonics such as oxytocin widely available for the 
  prevention of maternal hemorrhage. (Note: in 2020, our team did a literature review of uterotonic coverage in facility settings in LMICs, the DRC, India, 
  Kenya, and Nigeria, and found 0-1% of facilities had misoprostol available for PPH prevention and 43-94% of facilities had oxytocin available. For more
  details on the findings of this literature review, see the final technical report saved in ``J:\Project\simulation_science\hsc_pph``.)
- We assume that the programmes of advanced misoprostol distribution that we are modeling have been appropriately implemented in accordance with the [WHO-2020]_ recommendation,
  such that women and birthing parents have been properly trained with how to use it (e.g., timing, dosage of 400-600 micrograms).

.. todo::

  - If more suitable baseline coverage data for misoprostol use for maternal hemorrhage in home settings  
  - Decide if we should model baseline coverage of injectible oxytocin in facility settings? Or some baseline coverage of misoprostol in facility settings? 

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

.. [Hobday-et-al-2017-misoprostol-scale-up]
  Hobday, K., Hulme, J., Belton, S., Homer, C. S., & Prata, N. (2017). Community-based misoprostol for the prevention of post-partum haemorrhage: A narrative review of the evidence base, challenges and scale-up. Global Public Health, 13(8), 1081–1097. https://doi.org/10.1080/17441692.2017.1303743

.. [Hofmeyr-et-al-2013-Cochrane-Review]
  Hofmeyr GJ, Gülmezoglu AM, Novikova N, Lawrie TA. Postpartum misoprostol for preventing maternal mortality and morbidity. Cochrane Database of Systematic Reviews 2013, Issue 7. Art. No.: CD008982. DOI: 10.1002/14651858.CD008982.pub2. 
    
.. [Tunçalp-2012-Cochrane-Review]
  Tunçalp Ö, Hofmeyr GJ, Gülmezoglu AM. Prostaglandins for preventing postpartum haemorrhage. Cochrane Database of Systematic Reviews 2012, Issue 8. Art. No.: CD000494. DOI: 10.1002/14651858.CD000494.pub4.

.. [WHO-2020]
  WHO recommendation on advance misoprostol distribution to pregnant women for prevention of postpartum haemorrhage. Geneva: World Health Organization; 2020. Licence: CC BY-NC-SA 3.0 IGO. https://iris.who.int/bitstream/handle/10665/336310/9789240013902-eng.pdf?sequence=1 