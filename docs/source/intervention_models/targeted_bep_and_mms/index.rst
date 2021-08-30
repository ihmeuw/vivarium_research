.. _maternal_supplementation_intervention:

=================================================================================================================
Maternal Prenatal Supplementation: Iron-Folic Acid/Targeted Balanced Energy Protein and Multiple Micronutrients
=================================================================================================================

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - BEP
    - Balanced Energy Protein
    - 
  * - MMS
    - Multiple Micronutrient Supplement
    - 
  * - IFA
    - Iron-folic acid
    - 
  * - BMI
    - Body Mass Index
    - 
  * - ANC
    - Antenatal coverage
    - 

Intervention Overview
-----------------------

.. note::

  This intervention has been previously modeled in Vivarium and documentation can be found :ref:`here <2017_concept_model_vivarium_gates_bep>`. 

Maternal supplementataion during the prenatal period is a critical intervention to support the increased nutritional demands due to the mother's changing physiology and fetal growth. Maternal supplementation in low and middle income country settings are often accessed through antenatal care (ANC) services and early initiation of supplementation has been associated with improved outcomes. There are various maternal supplementation regimens that provide varying combinations of micro- and macro-nutrients and therefore have varying impacts on both maternal and child health. Major classes of maternal supplementation regimens are outlined in the table below.

- **Iron and Folic Acid (IFA):** IFA affects outcomes including maternal anemia (which is a risk factor for maternal mortality) and infant birthweight (a risk factor for infant mortality). Additionally, folic acid deficiency is associated with haematological consequences and congenital malformations, however the effect on congenital malformations is sensitive to timing of administration relative to conception. The latest cochrane review of IFA trials was performed by [Pena-Rosas-et-al-2015]_; notably, as IFA is considered the current standard of care, there are few studies that compare IFA to placebo or no treatment.

- **Multiple Micronutrient Supplementation (MMS):** MMS is a combination of micronutrients that includes iron and folic acid as well as other nutrients such as vitamin A and zinc. The latest cochrane review on MMS (containing IFA) relative to IFA alone was performed by [Keats-et-al-2019-maternal-supplementation]_.

- **Balanced Energy Protein (BEP):** BEP is a type of supplement that provides macronutrients in addition to micronutrients provided by IFA and MMS. The macronutrients provided by BEP supplementation may aid in maternal weight gain, which may improve fetal outcomes, and may be particularly beneifcial to underweight pregnant women and their babies. Notably, there are several different formulations of BEP, which may vary in their effectiveness. The latest cochrane review on BEP supplementation was performed by [Ota-et-al-2015]_

In August of 2020, the :download:`World Health Organization updated their recommendation <who_guidance_positive_pregnancy_mms_2020.pdf>` on nutritional interventions during pregnancy to include MMS that includes iron and folic acid as part of routine antenatal care. Prior to this update, they recommended only IFA. Additionally, the :download:`WHO recommends BEP supplementation during pregnancy in undernourished populations <who_guidance_positive_pregnancy_2016.pdf>`.

.. note:: 

  According to the :download:`2016 WHO recommendations <who_guidance_positive_pregnancy_2016.pdf>`: Undernourishment is usually defined by a low BMI (i.e. being underweight). For adults, a 20–39% prevalence of underweight women is considered a high prevalence of underweight and 40% or higher is considered a very high prevalence (46). Mid-upper arm circumference (MUAC) may also be useful to identify protein–energy malnutrition in individual pregnant women and to determine its prevalence in this population (31). However, the optimal cut-off points may need to be determined for individual countries based on context-specific cost–benefit analyses (31).

IFA is widely used as a prenatal supplement in most areas of the world and is recommended by the WHO as part of routine antenatal care, although coverage and adherence levels vary. Given the relatively recent recommendation regarding MMS and the relatively high cost of BEP, the coverage of these inteventions at a wide scale is believed to be substantially lower.

.. todo::

  Fill out the following table with a additional known outcomes affected by the intervention.

.. list-table:: Affected Outcomes
  :header-rows: 1

  * - Outcome
    - Regimen(s)
    - Effect
    - Modeled?
    - Note
  * - Infant birthweight
    - IFA, MMS, BEP
    - Increases population mean
    - Yes
    - Differential effect by regimen. Effect modification by counterfactual birthweight (or proxy such as maternal nourishment)
  * - Maternal anemia
    - IFA, MMS, BEP
    - Increases population mean hemoglobin
    - Not yet
    - Non-linear dose response likely. Differential effect by regimen. Effect modification by baseline hemoglobin likely.
  * - Maternal nourishment (BMI)
    - BEP
    - TBD
    - No
    - Needs more investigation
  * - Child wasting
    - BEP
    - Increases population mean WLZ
    - Yes
    - Possible mediation through birthweight. Low quality evidence.
  * - Child stunting
    - BEP
    - Increases population mean LAZ
    - Yes
    - Possible mediation through birthweight/wasting. Low quality evidence.

Baseline Coverage Data
++++++++++++++++++++++++

Given the low utilization of MMS and BEP relative to IFA, we assume that baseline coverage of MMS and BEP are zero. Baseline coverage of IFA varies by location, and Demographic Health Surveys are good data sources for the proportion of pregnant women who took iron supplementation during pregnancy. 

.. list-table:: Baseline coverage data
  :header-rows: 1

  * - Location
    - Subpopulation
    - Coverage parameter
    - Value
    - Note
  * - Ethiopia
    - General population
    - Percent who took antenatal iron for 90+ days
    - 10.6
    - DHS 2019
  * - India
    - General population
    - Percent who took antenatal iron for 90+ days
    - 38.7
    - DHS 2017
  * - Mali
    - General population
    - Percent who took antenatal iron for 90+ days
    - 28.0
    - DHS 2017
  * - Pakistan
    - General population
    - Percent who took antenatal iron for 90+ days
    - 29.4
    - DHS 2017
  * - Tanzania
    - General population
    - Percent who took antenatal iron for 90+ days
    - 21.4
    - DHS 2017

.. note::

  DHS has coverage data specific to women who took iron tablets for <60 and 60-89 days too as well as stratified by age, residence, region, education, and wealth quintile.


Vivarium Modeling Strategy
--------------------------

The maternal supplementation intervention is administered to mothers and impacts both the mother and infant. To model the impact of the intervention on either child or maternal outcomes, simulant attributes for maternal nourishment exposure (BMI/x-factor) and maternal ANC attendance exposure are required. Additionally, to model the impact on child growth, child growth exposures are required. To model the impact on maternal mortality, a maternal hemoglobin exposure value is required. This intervention model requires the additional simulant attribute of maternal supplement regimen.

For the implementation of the intervention in an alterative scenarios, we will model BEP supplementation among undernourished mothers and MMS supplementation among adequately nourished mothers rather than IFA supplementation alone, as demonstrated in the following decision tree.

.. note::

  This decision tree assumes a complete transition from IFA to targeted BEP/MMS. Alternative intervention implementations may be considered.

.. image:: coverage_decision_tree.svg

.. list-table:: Modeled Outcomes
  :widths: 15 15 15 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Outcome type
    - Outcome ID
    - Affected measure
    - Effect size measure
    - Effect size
    - Note
  * - 
    - 
    - 
    - 
    - 
    - 
    - 

Birthweight
+++++++++++++++++++++

.. important::

  Copy and paste this section for each affected outcome included in this document

.. todo::

  Replace "Risk Outcome Pair #1" with the name of an affected entity for which a modeling strategy will be detailed. For additional risk outcome pairs, copy this section as many times as necessary and update the titles accordingly.

.. todo::

  Link to existing document of the affected outcome (ex: cause or risk exposure model document)

.. todo::

  Describe exactly what measure the intervention will affect

.. todo::

  Fill out the tables below

.. list-table:: Affected Outcome #1 Restrictions
  :widths: 15 15 15
  :header-rows: 1

  * - Restriction
    - Value
    - Note
  * - Male only
    - 
    - 
  * - Female only
    - 
    - 
  * - Age group start
    - 
    - 
  * - Age group end
    - 
    - 
  * - Other
    - 
    - 

.. list-table:: Affected Outcome #1 Effect Size
  :widths: 15 15 15 
  :header-rows: 1

  * - Population
    - Effect size
    - Note
  * - 
    - 
    - 
  * - 
    - 
    - 

.. todo::

  Describe exactly *how* to apply the effect sizes to the affected measures documented above

.. todo::

  Note research considerations related to generalizability of the effect sizes listed above as well as the strength of the causal criteria, as discussed on the :ref:`general research consideration document <general_research>`.

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

References
------------

.. [Keats-et-al-2019-maternal-supplementation]
  Keats  EC, Haider  BA, Tam  E, Bhutta  ZA. Multiple‐micronutrient supplementation for women during pregnancy. Cochrane Database of Systematic Reviews 2019, Issue 3. Art. No.: CD004905. DOI: 10.1002/14651858.CD004905.pub6. Accessed 30 August 2021. `https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD004905.pub6/full <https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD004905.pub6/full>`_

.. [Ota-et-al-2015]
  Ota  E, Hori  H, Mori  R, Tobe‐Gai  R, Farrar  D. Antenatal dietary education and supplementation to increase energy and protein intake. Cochrane Database of Systematic Reviews 2015, Issue 6. Art. No.: CD000032. DOI: 10.1002/14651858.CD000032.pub3. Accessed 30 August 2021. `https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD000032.pub3/full <https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD000032.pub3/full>`_

.. [Pena-Rosas-et-al-2015]
  Peña‐Rosas  JP, De‐Regil  LM, Gomez Malave  H, Flores‐Urrutia  MC, Dowswell  T. Intermittent oral iron supplementation during pregnancy. Cochrane Database of Systematic Reviews 2015, Issue 10. Art. No.: CD009997. DOI: 10.1002/14651858.CD009997.pub2. Accessed 30 August 2021. `https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD009997.pub2/full <https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD009997.pub2/full>`
