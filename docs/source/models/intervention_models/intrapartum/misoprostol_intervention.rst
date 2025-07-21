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

Misoprostol is a prophylactic prostaglandin that can be taken orally or sublingually during labor to prevent or reduce incidence of maternal hemorrhage. Because 
misoprostol is stable and water-soluble at ambient temperatures, can be taken orally or sublingually, and is inexpensive, it has been shown to be well-suited 
for the prevention of maternal hemorrhage in community or at-home settings where injectible conventional uterotonics are not available ([Alfirevic-et-al-2007-pph_prevention]_).

The most up-to-date WHO recommendation ([WHO-2020]_) on misoprostol use for maternal hemorrhage prevention states that "In settings where 
women give birth outside of a health facility and in the absence of skilled health personnel, a strategy of antenatal distribution of misoprostol
to pregnant women for self-administration is recommended for prevention of postpartum haemorrhage, only with targeted monitoring and evaluation." 
In line with this recommendation, we will model a misoprostol intervention in which women who attend antenatal care (ANC) facilities are eligible to 
receive an advanced distribution of misoprostol for self-administration during a home birth. Because misoprostol is not as effective as conventional 
uterotonics (i.e., oxytocin) in prevention of maternal hemorrhage, we will not model the distribution of misoprostol in BEmONC or CEmONC facilities where injectible 
uterotonics are more widely available ([Gallos-et-al-2018-Cochrane-Review]_). 

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
settings, so only simulants who delivery at home are eligible for the intervention. Simulants who delivery at BEmONC and CEmONC facilities 
are ineligible for ther intervention, as mothers and birthing parents should have access to more effective injectible uterotonics [Gallos-et-al-2018-Cochrane-Review]_. Currently our baseline value for at-home
administration of misoprostol is not directly data-backed, so we will need to update this once we find better data.

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
    - 0
    - N/A
    - This is an assumption based on literature evidence that community distribution of oral misoprostol 
      as not been widely implemented in Nigeria, Ethiopia, or Pakistan. (e.g. [Hobday-et-al-2017-misoprostol-scale-up]_ conducted a narrative 
      review of the scale-up of community-based misoprostol and found little evidence of scale-up.)

Vivarium Modeling Strategy
--------------------------

Intervention eligibility criteria (see :ref:`the intrapartum intervention module document <2024_vivarium_mncnh_portfolio_intrapartum_interventions_module>` for how to obtain this information in the MNCNH portfolio simulation):

  1. Attended ANC
  2. Delivers at home

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

   \text{IR}_i^\text{maternal hemorrhage} = \text{IR}^\text{maternal hemorrhage} \cdot (1 - \text{PAF}_\text{no misoprostol}) \cdot \text{RR}_i^\text{no misoprostol}

where :math:`\text{RR}_i^\text{no misoprostol}` is simulant *i*'s individual relative risk for "no misoprostol", meaning :math:`\text{RR}_i^\text{no misoprostol} = \text{RR}_\text{no misoprostol}` 
if simulant *i* does not receive misoprostol, and :math:`\text{RR}_i^\text{no misoprostol} = 1` if simulant *i* receives misoprostol. 

The relative risk value we will use is pulled from [Gallos-et-al-2018-Cochrane-Review]_, the most recent Cochrane Review of the effect of 
sublingually received misoprostol during labor on the prevention of maternal hemorrhage.

.. list-table:: Risk Effect Parameters for No Misoprostol
  :widths: 15 15 15 15
  :header-rows: 1

  * - Parameter
    - Value
    - Source
    - Notes
  * - :math:`\text{RR}^\text{no misoprostol}`
    - :math:`1/\text{RR}^\text{misoprostol}`
    - N/A
    - Value to be used in sim
  * - :math:`1/\text{RR}^\text{misoprostol}`
    - RR = 0.61 (95% CI: 0.50 to 0.74). Parameter uncertainty implemented as a lognormal distribution: :code:`get_lognorm_from_quantiles(0.61, 0.50, 0.74)`
    - [Gallos-et-al-2018-Cochrane-Review]_
    - 
  * - mean_rr
    - :math:`\text{RR}^\text{no misoprostol} * (1 - p_\text{baseline coverage}) + p_\text{baseline_coverage}`
    - N/A
    - Despite intervention eligibility criteria of attending ANC, we will use :math:`p_\text{baseline coverage}` defined in the baseline coverage section above among all home births (regardless of ANC attendance) to calculate the mean_rr and PAF values
  * - PAF
    - (mean_rr - 1) / mean_rr
    - N/A
    - 

Assumptions and Limitations
---------------------------

- We assume that the relative risk of maternal hemorrhage incidence with misoprostol in practice is a value that we can find in the literature (Note: 
  the value we are using is from [Gallos-et-al-2018-Cochrane-Review]_.)
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
- We assume that misoprostol will be administered at ANC visits and that only those who attend ANC are eligible for the misoprostol intervention and that it is not possible to obtain misoprostol through other means.

.. todo::

  - If more suitable baseline coverage data for misoprostol use for maternal hemorrhage in home settings  
  - Decide if we should model baseline coverage of injectible oxytocin in facility settings? Or some baseline coverage of misoprostol in facility settings? 

Validation and Verification Criteria
------------------------------------

- Population-level incidence rate should be the same as when this intervention is not included in the model.
- The ratio of maternal hemorrhage incidence among those without misoprostol divided by those with misoprostol
  should equal the relative risk parameter used in the model.
- The baseline coverage of misoprostol in each facility type should match the values in the artifact.
- Only simulants who attend ANC and deliver at home receive misoprostol

References
------------

.. [Alfirevic-et-al-2007-pph_prevention]
  Alfirevic, Z., Blum, J., Walraven, G., Weeks, A. and Winikoff, B. (2007), Prevention of postpartum hemorrhage with misoprostol. International Journal of Gynecology & Obstetrics, 99: S198-S201. https://doi.org/10.1016/j.ijgo.2007.09.012

.. [Hobday-et-al-2017-misoprostol-scale-up]
  Hobday, K., Hulme, J., Belton, S., Homer, C. S., & Prata, N. (2017). Community-based misoprostol for the prevention of post-partum haemorrhage: A narrative review of the evidence base, challenges and scale-up. Global Public Health, 13(8), 1081–1097. https://doi.org/10.1080/17441692.2017.1303743

.. [Hofmeyr-et-al-2013-Cochrane-Review]
  Hofmeyr GJ, Gülmezoglu AM, Novikova N, Lawrie TA. Postpartum misoprostol for preventing maternal mortality and morbidity. Cochrane Database of Systematic Reviews 2013, Issue 7. Art. No.: CD008982. DOI: 10.1002/14651858.CD008982.pub2. 
    
.. [Gallos-et-al-2018-Cochrane-Review]
  Gallos ID, Williams HM, Price MJ, Merriel A, Gee H, Lissauer D, Moorthy V, Tobias A, Deeks JJ, Widmer M, Tunçalp Ö, Gülmezoglu AM, Hofmeyr GJ, Coomarasamy A. Uterotonic agents for preventing postpartum haemorrhage: a network meta-analysis. Cochrane Database Syst Rev. 2018 Apr 25;4(4):CD011689. doi: 10.1002/14651858.CD011689.pub2. Update in: Cochrane Database Syst Rev. 2018 Dec 19;12:CD011689. doi: 10.1002/14651858.CD011689.pub3. PMID: 29693726; PMCID: PMC6494487.

.. [WHO-2020]
  WHO recommendation on advance misoprostol distribution to pregnant women for prevention of postpartum haemorrhage. Geneva: World Health Organization; 2020. Licence: CC BY-NC-SA 3.0 IGO. https://iris.who.int/bitstream/handle/10665/336310/9789240013902-eng.pdf?sequence=1 