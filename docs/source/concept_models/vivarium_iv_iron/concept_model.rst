.. role:: underline
    :class: underline

..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  +++++++++++++++++++++

  Section Level 2 (#.#)
  ---------------------

  Section Level 3 (#.#.#)
  ~~~~~~~~~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

.. _2019_concept_model_vivarium_iv_iron:

===========================
Vivarium Intravenous Iron
===========================

.. contents::
  :local:

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - IV
    - Intravenous
    - 
  * - IDA
    - Iron deficiency anemia
    - 

1.0 Background
++++++++++++++

.. note::

  Gendered terms such as "maternal disorders" and "pregnant/lactating women" are used throughout this document as the existing terminology in the GBD and other literature sources rely on such terms. However, we acknowledge that not all pregnant individuals identify as female and we are working to incorporate more inclusive language such as pregnant indiviudals/parents, chestfeeding, etc. Additionally, our simulation will rely on data specific to male/female sex without consideration of intersex individuals or gender differences, which is a limitation of our analysis.

Anemia, a condition defined by low blood hemoglobin concentration, is a significant cause of morbidity and mortality globally, particularly in low and middle income countries and in sub-Saharan Africa and south Asia. Iron deficiency is a common cause of anemia, although other conditions such as hemoglobinopathies may also contribute to the condition.

Pregnancy is a time of increased iron demands to meet the needs of fetal development. Anemia during pregnancy has several health consequences, including increased risk of adverse health outcomes for mother and child.

Iron supplementation during pregnancy can help meet the increased iron demands during this period and prevent and/or remediate iron deficiency anemia (IDA). However, for those who are severely anemic during pregnancy, intravenous (IV) iron can be a more effective strategy for resolving IDA. Additionally, anemia during the postpartum period also has potential health consequences for mother and child and postpartum IV iron may be beneficial to those who are severely anemic immediately following birth.

.. _iviron2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++

**Objective:** Using the optimistic assumptions for the target product profiles from the Bill and Melinda Gates Foundation, estimate the cost effectiveness of a) IV iron use during pregnancy and b) IV iron use immediately postpartum under the following assumptions:

- Impact measured in terms of a) maternal anemia DALYs averted, and b) infant outcomes and stillbirths
- Assume no large-scale food fortification intervention. Comparator = routine anemia prevention/treatment in pregnancy and postpartum.
- Cost effectiveness estimates specific to all LMICs, disaggregated by region (separate estimates for South Asia and sub-Saharan Africa).

.. _iviron3.0:

3.0 Concept model
+++++++++++++++++

.. image:: concept_model.svg

This simulation will be built in a series of subgroups of model components that are summarized below.

.. list-table:: Concept model component subgroups
  :widths: 5 5 20 10
  :header-rows: 1

  * - Priority order
    - Color
    - Subgroup
    - Note
  * - 1
    - Green
    - Interventions and impacts on maternal morbidity and mortality due to maternal disorders and anemia
    - Women of reproductive age (WRA) population model only
  * - 2.0
    - Purple
    - Infant birthweight and its efect on child morbidity and mortality directly as well as through child growth failure and infectious diseases (without the positive feedback loop of infectious diseases on child growth failure)
    - Includes children under five in population model as well as WRA
  * - 2.1
    - N/A
    - Fertility component to familially link WRA to children under five.
    - May be swapped in implementation order with model 2.0.
  * - 3
    - Blue
    - Postpartum depression and breastfeeding behaviors
    - 
  * - 4
    - Yellow
    - Non-standard outcomes, including stillbirths, infertility, and cognition
    - 
  * - 5
    - Orange
    - Orphanhood, care-seeking behaviors, and positive feedback loop between infectious diseases and child wasting
    - 
  * - 6
    - Red
    - a) fertility model that includes birth interval information, b) access to care parameters (antenatal care and in-facility delivery) and correlation with other model components
    - 

.. _iviron3.1:

3.1 Simulation scenarios
------------------------

#. **Baseline:** baseline IFA coverage
#. **Oral iron:** MMS/BEP scale-up
#. **Antenatal IV iron:** MMS/BEP + antenatal IV iron scale-up
#. **Postpartum IV iron:** MMS/BEP + postpartum IV iron scale-up
#. **Antenatal and postpartum IV iron:** MMS/BEP + antenatal and postpartum IV iron scale-up

.. note::

  Scenario comparisons of interest to BMGF will be IV iron scenarios (antenatal IV iron, postpartum IV iron, antenatal + postpartum IV iron) relative to the oral iron scenario. However, all interventions will scale-up from baseline levels of intervention coverage.

.. list-table:: Intervention coverage by scenario
  :header-rows: 1

  * - Scenario
    - IFA coverage
    - MMS/BEP coverage
    - Antenatal IV iron coverage
    - Postpartum IV iron coverage
  * - Baseline
    - To be defined for locations of interest on the :ref:`maternal supplementation intervention document <maternal_supplementation_intervention>`
    - 0
    - 0
    - 0
  * - Oral iron scale-up
    - 0
    - :math:`T * ANC`
    - 0
    - 0
  * - Antenatal IV iron scale-up
    - 0
    - :math:`T * ANC`
    - :math:`T * ANC`
    - 0
  * - Postpartum IV iron scale-up
    - 0
    - :math:`T * ANC`
    - 0
    - :math:`T * IFD`
  * - Antenatal and postpartum IV iron scale-up
    - 0
    - :math:`T * ANC`
    - :math:`T * ANC`
    - :math:`T * IFD`

Where,

.. list-table:: Intervention coverage parameter definitions
  :header-rows: 1

  * - Parameter
    - Description  
    - Value
    - Note
  * - :math:`T`
    - Target coverage
    - 0.9
    - Subject to change after confirmation with BMGF. Not location-specific.
  * - :math:`ANC`
    - Coverage of single antenatal care visit
    - GBD covariate*
    - Location-specific
  * - :math:`IFD`
    - In-facility delivery proportion
    - GBD covariate*
    - Location-specific

.. todo::

  Detail strategy to weight national-level GBD covariates estimates to regional locations of interest

.. _iviron3.2:

3.2 Simulation timeframe and intervention start dates
-----------------------------------------------------

We will model an *immediate* scale-up of intervention coverage from the baseline level to the target level rather than a gradual scale-up over time.

Date of simulation start: January 1, 2022
Date of intervention scale-up: Janary 1, 2023
Date of intervention end: December 31, 2024

.. _ivron4.0:

4.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _iviron4.1:

4.1 Vivarium concept model diagram components
----------------------------------------------

4.1.1 Cause Models
~~~~~~~~~~~~~~~~~~

* :ref:`Maternal disorders <2019_cause_maternal_disorders>`
* :ref:`Maternal hemorrhage incidence <2019_cause_maternal_hemorrhage_incidence>`

For later model versions: 

  * :ref:`Diarrheal diseases <2019_cause_diarrhea>`
  * :ref:`Lower respiratory infections <2019_cause_lower_respiratory_infections>`
  * :ref:`Measles <2019_cause_measles>`
  * Postpartum depression

4.1.2 Joint Cause-Risk Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Hemoglobin, anemia, and iron deficiency model <2019_hemoglobin_anemia_and_iron_deficiency>`

.. todo::

  Add more detail on exactly which components/strategies to include in this simulation specifically

For later model versions:

  * Child wasting and protein energy malnutrition (NOTE: static propensity model for subgroups 2-4, :ref:`dynamic transition model for subgroups 5+ <2020_risk_exposure_wasting_state_exposure>`)

4.1.3 Risk Exposure Models
~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Maternal Body Mass Index <2019_risk_exposure_maternal_bmi>`

For later model versions:

  * :ref:`Low Birthweight and Short Gestation (GBD 2019) <2019_risk_exposure_lbwsg>`
  * :ref:`Child Stunting (GBD 2020) <2020_risk_exposure_child_stunting>`
  * :ref:`Suboptimal breastfeeding <2020_risk_suboptimal_breastfeeding>`
  * Orphanhood

4.1.4 Risk Effects Models
~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Hemoglobin/Iron deficiency risk effects <2019_risk_effect_iron_deficiency>`
* Maternal hemorrhage risk effects

For later model versions:

  * :ref:`Child Wasting Risk Effects <2019_risk_effect_wasting>` (NOTE: consider affected measure for diarrheal diseases for model versions before and after subgroup 5/vicious cycle implementation)
  * Child stunting risk effects
  * :ref:`Low Birthweight and Short Gestation Risk Effects (GBD 2019) <2019_risk_effect_lbwsg>`
  * :ref:`Diarrheal Diseases Risk Effects <2019_risk_effect_diarrheal_diseases>`
  * Suboptimal breastfeeding risk effects (note: separate risk exposure and effects model)
  * Postpartum depression risk effects
  * Orphanhood risk effects

4.1.5 Risk-Risk Correlation Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For later model versions:

  * :ref:`Birthweight and child wasting risk-risk correlation <2019_risk_correlation_birthweight_wasting>`
  * :ref:`Birthweight and child stunting risk-risk correlation <2019_risk_correlation_birthweight_stunting>`
  * :ref:`Maternal BMI and birthweight <2019_risk_correlation_maternal_bmi_birthweight>`

4.1.6 Non-standard outcomes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For later model versions:

  * Stillbirth
  * Infertility
  * Cognition

4.1.7 Intervention Models
~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Maternal supplementation <maternal_supplementation_intervention>`
* Antenatal IV iron
* Postpartum IV iron

.. todo::

  Move hemoglobin outcomes of maternal supplmentation to the linked page from :ref:`this current page <maternal_anemia_intervention>`

For later model versions:

  * :ref:`Acute malnutrition management and treatment <intervention_wasting_treatment>` (NOTE: will need to be updated to locations of interest)
  * Childhood vaccinations

.. _iviron4.2:

4.2 Demographics
----------------

.. _iviron4.2.1:

4.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~


.. _iviron4.2.2:

4.2.2 Population of interest
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. _iviron4.3:

4.3 Models
----------


.. _iviron4.4:

4.4 Desired outputs
-------------------


.. _iviron4.5:

4.5 Simulation output table
---------------------------

.. _iviron5.0:

5.0 Back of the envelope calculations
+++++++++++++++++++++++++++++++++++++

.. _iviron6.0:

6.0 Limitations
+++++++++++++++

7.0 References
+++++++++++++++

