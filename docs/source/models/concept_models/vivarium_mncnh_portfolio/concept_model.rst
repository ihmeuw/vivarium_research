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

.. _2024_concept_model_vivarium_mncnh_portfolio:

===============
MNCNH Portfolio
===============

.. contents::
  :local:

.. list-table:: Abbreviations
  :widths: 5 15
  :header-rows: 1

  * - Abbreviation
    - Definition
  * - ACMR
    - All-Cause Mortality Rate
  * - ACS
    - Antenatal Corticosteroids
  * - AI ultrasound
    - Artificial Intelligence assisted ultrasound
  * - ANC
    - Antenatal Care
  * - ASFR
    - Age-Specific Fertility Rate
  * - BEmONC
    - Basic Emergency Obstetric and Newborn Care
  * - CEmONC
    - Comprehensive Emergency Obstetric and Newborn Care
  * - CPAP
    - Continuous Positive Airway Pressure
  * - CSMR
    - Cause-Specific Mortality Rate
  * - ENN
    - Early Neonatal
  * - GBD
    - Global Burden of Disease
  * - IFA
    - Iron and Folic Acid
  * - IFD
    - In-Facility Delivery
  * - IV iron
    - Intravenous iron
  * - LBW
    - Low Birth Weight
  * - LBWSG
    - Low Birth Weight and Short Gestation
  * - LNN
    - Late Neonatal
  * - MMS
    - Multiple Micronutrient Supplements
  * - MNCNH
    - Maternal, Newborn, and Child Nutrition and Health
  * - OL
    - Obstructed Labor
  * - PAF
    - Population Attributable Fraction
  * - PPD
    - Postpartum Depression
  * - PTB
    - Preterm Birth
  * - RDS
    - Respiratory Distress Syndrome
  * - RR
    - Relative Risk
  * - RT
    - Research Team
  * - SBR
    - Stillbirth (to live birth) Ratio
  * - V&V
    - Verification and Validation
  * - WRA
    - Women of Reproductive Age
  * - YLDs
    - Years Lived with Disability
  * - YLLs
    - Years of Life Lost

1.0 Overview
++++++++++++

This document is the overall page for the MNCNH Portfolio simulation and 
contains information that relates to all modeled subcomponents included in 
the simulation.

.. _mncnh_portfolio_2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++

**Objective:** Expand on prior MNCH simulation work to be able to include 
all MNCNH portfolio products. Compare health gains and costs for each 
intervention set and help in determining prioritization. Expand the capabilities of 
the simulation to include more risks and causes, more details on healthcare systems, 
and details on the intrapartum and neonatal time periods.

.. _mncnh_portfolio_3.0:

3.0 Concept model diagram and submodels
+++++++++++++++++++++++++++++++++++++++

A table of contents for all modules in this simulation is included below

.. toctree::
   :maxdepth: 1
   :glob:

   */module_document*

.. note::

  This concept model diagram was reorganized in April 2025 after much of wave I had been implemented. A record of the PRs for this reorganization are listed below:

  * Pregnancy component reorganization: `https://github.com/ihmeuw/vivarium_research/pull/1615 <https://github.com/ihmeuw/vivarium_research/pull/1615>`_
  * Intrapartum component reorganization: `https://github.com/ihmeuw/vivarium_research/pull/1617 <https://github.com/ihmeuw/vivarium_research/pull/1617>`_
  * Neonatal component reorganization: `https://github.com/ihmeuw/vivarium_research/pull/1619 <https://github.com/ihmeuw/vivarium_research/pull/1619>`_


We plan to complete this work in 3 waves. 

* Wave 1 will include the basic model design, outlines of the healthcare system, and some interventions (AI ultrasound, higher level delivery facility interventions, RDS management). 
* Wave 2 will add in some antenatal supplements (MMS, IV iron), the hemoglobin risk for birthing parents, and all downstream causes affected by hemoglobin. 
* Wave 3 will add in gestational blood pressure and relevant causes and risks including pre-eclampsia care and downstream effects of high blood pressure. 

The model is further subdivided into three components:

1. Pregnancy component
2. Intrapartum component
3. Neonatal component

Each component will consist of several modules, which will convert certain module 
inputs to module outputs via decision tree-based instructions. Module outputs may be 
used as inputs to other modules and/or serve as information for verification and 
validation and/or simulation results.

The following tables link to each simulation module and provide a summary of module 
input and output variables. Notably, the ordering of modules in the table is 
significant: the order of operations for implementation moves from top to bottom. 
Specically, each variable must be defined as a module output in a row prior to being 
defined as a module input in a subsequent row.

.. _mncnh_portfolio_pregnancy_component_modules:

.. list-table:: Pregnancy Component Modules
  :header-rows: 1

  * - Module
    - Inputs
    - Outputs
    - Nested subcomponents
  * - :ref:`Initial attributes <2024_vivarium_mncnh_portfolio_initial_attributes_module>`
    - 
    - * ANC propensity
      * LBWSG category propensity
      * IFD propensity
      * RDS intervention propensity
    - * :ref:`Facility choice propensity correlation <facility_choice_correlated_propensities_section>`
  * - :ref:`Pregnancy <2024_vivarium_mncnh_portfolio_pregnancy_module>`
    - * LBWSG category propensity
    - * Maternal age
      * Pregnancy term length
      * Birth outcome
      * Sex of infant
      * Gestational age
      * Birthweight
      * Pregnancy duration
      * Preterm status
    - * :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
      * :ref:`LBWSG exposure <2019_risk_exposure_lbwsg>`
  * - :ref:`Antenatal care <2024_vivarium_mncnh_portfolio_anc_module>`
    - * ANC propensity
    - * ANC attendance
    - 
  * - :ref:`AI ultrasound <2024_vivarium_mncnh_portfolio_ai_ultrasound_module>`
    - * ANC attendance
      * Gestational age
    - * Ultrasound type
      * Estimated gestational age
      * Believed preterm status
    - 

.. note::

  Below is a draft of the pregnancy module table for wave II of the simulation. This will remain as a draft/note until wave II is ready for implementation to avoid conflicts with existing wave I documenation currently being used for implementation.  

  .. list-table:: Draft Wave II Pregnancy Component Modules
    :header-rows: 1

    * - Module
      - Inputs
      - Outputs
      - Nested subcomponents
      - Note
    * - :ref:`Initial attributes <2024_vivarium_mncnh_portfolio_initial_attributes_module>`
      - 
      - * ANC propensity
        * LBWSG category propensity
        * IFD propensity
      - * :ref:`Facility choice propensity correlation <facility_choice_correlated_propensities_section>`
      - 
    * - :ref:`Pregnancy I <2024_vivarium_mncnh_portfolio_pregnancy_module>`
      - 
      - * Maternal age
        * Pregnancy term length
        * Sex of infant
      - * :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
      - No changes to pregnancy module in wave I other than defining specified outputs at different points in ordering of modules
    * - :ref:`Antenatal care <2024_vivarium_mncnh_portfolio_anc_module>`
      - * ANC propensity
      - * ANC attendance and timing
      - 
      - Added first trimester and later pregnancy timing of ANC visit in wave 2
    * - :ref:`Hemoglobin <2024_vivarium_mncnh_portfolio_hemoglobin_module>`
      - * First trimester ANC attendance
        * Later pregnancy ANC attendance
        * IFA/MMS coverage
        * IV iron coverage
      - * Hemoglobin at start of pregnancy
        * Hemoglobin at birth
      - * :ref:`Hemoglobin risk exposure <2023_hemoglobin_exposure>`
        * :ref:`Oral iron supplementation intervention (IFA/MMS) <oral_iron_antenatal>`
        * :ref:`IV iron intervention <intervention_iv_iron_antenatal_mncnh>`
      - New wave II module
    * - :ref:`Pregnancy II <2024_vivarium_mncnh_portfolio_pregnancy_module>`
      - * LBWSG category propensity
        * IFA/MMS coverage (affects birth outcome, gestational age, birthweight)
        * IV iron coverage (affects birth outcome, gestational age, birthweight)
      - * Birth outcome
        * Gestational age at birth
        * Birthweight
        * Pregnancy duration
        * Preterm status
      - * :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
        * :ref:`LBWSG exposure <2019_risk_exposure_lbwsg>`
        * :ref:`Oral iron supplementation intervention (IFA/MMS) <oral_iron_antenatal>`
        * :ref:`IV iron intervention <intervention_iv_iron_antenatal>`
      - No changes to pregnancy module in wave I other than defining specified outputs at different points in ordering of modules other than impacts of IFA/MMS and IV Iron interventions on pregnancy module outputs
    * - :ref:`AI ultrasound <2024_vivarium_mncnh_portfolio_ai_ultrasound_module>`
      - * ANC attendance
        * Gestational age
      - * Ultrasound type
        * Estimated gestational age
        * Believed preterm status
      - 
      - No changes from wave I

.. note::

  Only full term pregnancies (live or stillbirths, NOT abortions/miscarriages/ectopic pregnancies) will proceed to the intrapartum component. Therefore, pregnancy term length is a de facto input to all modules in the intrapartum component.

.. warning::

  As currently designed, the intrapartum component models an intervention for misoprostol to 
  prevent postpartum hemorrhage (PPH) in home birth settings only. We do not consider any
  interventions for PPH prevention at facility settings nor do we model the expected greater
  incidence of PPH in home settings relative to facility settings. 

  Therefore, as written, the incidence of PPH by delivery setting will be miscalibrated to
  the expectation in reality. We plan to continue with the implementing the model as written while
  noting this limitation until we implement a strategy to address this (`see related 
  ticket here <https://jira.ihme.washington.edu/browse/SSCI-2310>`_)

.. list-table:: Intrapartum Component Modules
  :header-rows: 1

  * - Module
    - Inputs
    - Outputs
    - Nested subcomponents
  * - :ref:`Facility choice <2024_vivarium_mncnh_portfolio_facility_choice_module>`
    - * (Pregnancy term length)
      * IFD propensity
      * Believed preterm status
    - * IFD status
      * Birth facility
    - * :ref:`Facility choice model <2024_facility_model_vivarium_mncnh_portfolio>`
  * - :ref:`Intrapartum interventions <2024_vivarium_mncnh_portfolio_intrapartum_interventions_module>`
    - * (Pregnancy term duration)
      * Birth facility
      * Believed gestational age
      * ANC attendance
      * RDS intervention propensity
    - * Intrapartum azithromycin coverage
      * Antenatal corticosteroid coverage
      * Misoprostol coverage
    - * :ref:`Intrapartum azithromycin intervention <azithromycin_intervention>` 
      * :ref:`Misoprostol intervention <misoprostol_intervention>`
      * :ref:`Antenatal corticosteroids <acs_intervention>`
  * - :ref:`Maternal disorders <2024_vivarium_mncnh_portfolio_maternal_disorders_module>`
    - * (Pregnancy term duration)
      * Intrapartum azithromycin coverage
      * Misoprostol coverage
    - * Maternal disorders outcomes (see outcome table)
    - * :ref:`Overall maternal disorders <2021_cause_maternal_disorders_mncnh>`
      * :ref:`Maternal hemorrhage <2021_cause_maternal_hemorrhage_mncnh>`
      * :ref:`Maternal sepsis <2021_cause_maternal_sepsis_mncnh>`
      * :ref:`Maternal obstructed labor and uterine rupture <2021_cause_obstructed_labor_mncnh>`

.. note::

  .. list-table:: Draft Wave II Intrapartum Component Modules
    :header-rows: 1

    * - Module
      - Inputs
      - Outputs
      - Nested subcomponents
      - Note
    * - :ref:`Facility choice <2024_vivarium_mncnh_portfolio_facility_choice_module>`
      - * (Pregnancy term length)
        * IFD propensity
        * Believed preterm status
      - * IFD status
        * Birth facility
      - * :ref:`Facility choice model <2024_facility_model_vivarium_mncnh_portfolio>`
      - 
    * - :ref:`Intrapartum interventions <2024_vivarium_mncnh_portfolio_intrapartum_interventions_module>`
      - * (Pregnancy term duration)
        * Birth facility
        * Believed gestational age
        * ANC attendance
      - * Intrapartum azithromycin coverage 
        * Antenatal corticosteroid coverage
        * Misoprostol coverage
      - * :ref:`Intrapartum azithromycin <azithromycin_intervention>` 
        * :ref:`Misoprostol coverage <misoprostol_intervention>`
        * :ref:`Antenatal corticosteroids <acs_intervention>`
      - 
    * - :ref:`Maternal disorders <2024_vivarium_mncnh_portfolio_maternal_disorders_module>`
      - * (Pregnancy term duration)
        * :ref:`Intrapartum azithromycin coverage <azithromycin_intervention>`
        * Hemoglobin at birth
      - * Maternal disorders outcomes (see outcome table)
      - * :ref:`Overall maternal disorders <2021_cause_maternal_disorders_mncnh>`
        * :ref:`Maternal hemorrhage <2021_cause_maternal_hemorrhage_mncnh>`
        * :ref:`Maternal sepsis <2021_cause_maternal_sepsis_mncnh>`
        * :ref:`Maternal obstructed labor and uterine rupture <2021_cause_obstructed_labor_mncnh>`
      - Wave II changes: 

        * Hemoglobin at birth as a variable that impacts maternal disorders causes
        * Anemia sequelae excluded from maternal hemorrhage YLDs (see `vivarium research PR#1633 <https://github.com/ihmeuw/vivarium_research/pull/1633>`_)

.. note::

  Only live births proceed to the neonatal component. Therefore, birth outcome is a de facto input to all modules in the neonatal component.

.. list-table:: Neonatal Component Modules
  :header-rows: 1

  * - Module
    - Inputs
    - Outputs
    - Nested subcomponents
  * - :ref:`Neonatal module <2024_vivarium_mncnh_portfolio_neonatal_module>`
    - * (Birth outcome)
      * Birth facility
      * Birth weight
      * Gestational age
      * RDS intervention propensity
      * Hemoglobin exposure at birth (affects neonatal sepsis)
    - * Neonatal probiotics coverage
      * CPAP coverage
      * Neonatal mortality outcomes (see outcome table)
    - * :ref:`Neonatal Mortality Model <2021_cause_neonatal_disorders_mncnh>`
      * :ref:`Neonatal Sepsis and Other Infections Model <2021_cause_neonatal_sepsis_mncnh>`
      * :ref:`Neonatal Encephalopathy Model <2021_cause_neonatal_encephalopathy_mncnh>`
      * :ref:`Preterm Birth <2021_cause_preterm_birth_mncnh>`
      * :ref:`Antibiotics for treating bacterial infections <intervention_neonatal_antibiotics>`
      * :ref:`CPAP for treating Preterm with RDS <intervention_neonatal_cpap>`
      * :ref:`Neonatal probiotics <intervention_neonatal_probiotics>`
      * :ref:`Antenatal corticosteroids <acs_intervention>`
      * :ref:`LBWSG risk effects <2019_risk_effect_lbwsg>`
      * :ref:`Hemoglobin risk effects <2023_hemoglobin_effects>`

.. list-table:: Postpartum Component Modules
  :header-rows: 1

  * - Module
    - Inputs
    - Outputs
    - Nested subcomponents
    - Wave II updates
  * - :ref:`Postpartum hemoglobin <2024_vivarium_mncnh_portfolio_postpartum_hemoglobin>`
    - * Hemoglobin at birth
      * Maternal hemorrhage incidence
    - * Postpartum hemoglobin
    - * :ref:`Hemoglobin risk exposure <2023_hemoglobin_exposure>`
      * :ref:`Maternal hemorrhage risk effects <2019_risk_effect_maternal_hemorrhage>` 
    - New module in wave II
  * - :ref:`Anemia YLDs <2024_vivarium_mncnh_portfolio_anemia_module>`
    - * Hemoglobin at start of pregnancy
      * Hemoglobin at birth
      * Postpartum hemoglobin
      * IFA/MMS coverage
      * IV iron coverage
      * First trimester ANC attendance
      * Pregnancy duration
    - * Anemia YLDs
    - * :ref:`Anemia impairment <2019_anemia_impairment>`
    - New module in wave II
  * - * :ref:`Postpartum depression <2024_vivarium_mncnh_portfolio_ppd_module>`
    - * Hemoglobin at birth
    - * Maternal disorders outcomes (see outcome table)
    - * :ref:`Postpartum depression <2021_cause_postpartum_depression_mncnh>`
      * :ref:`Hemoglobin risk effects document <2023_hemoglobin_effects>`
    - New module in wave II

**Wave 1 Concept Model Map:**

.. image:: wave_1_full.svg

.. _mncnh_portfolio_3.1:

3.1 Scenario information
--------------------------

.. todo::

  Define hemoglobin-related baseline coverage

.. todo::

  When designing our intervention coverage across scenarios, we will need to account for the mutually exclusive nature of the :ref:`IFA and MMS interventions <oral_iron_antenatal>`.


.. _MNCNH pregnancy component scenario table:

.. list-table:: Pregnancy component scenario-dependent variables
  :header-rows: 1

  * - Scenario
    - Ultrasound coverage
    - Ultrasound type
    - IFA/MMS coverage
    - Anemia screening coverage
    - IV iron coverage
    - Note
  * - 1. Baseline
    - Defined in the baseline coverage section of the :ref:`AI ultrasound module page <2024_vivarium_mncnh_portfolio_ai_ultrasound_module>`
    - Defined in the baseline coverage section of the :ref:`AI ultrasound module page <2024_vivarium_mncnh_portfolio_ai_ultrasound_module>`
    - Defined in the baseline coverage section of the :ref:`oral iron supplementation page <oral_iron_antenatal>`
    - XXX
    - XXX
    - 
  * - 2. CPAP total scale-up
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 3. CPAP CEMONC-only scale-up
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    -  
  * - 4. CPAP BEMONC-only scale-up
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 5. Antibiotics total scale-up
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 8. Probiotics total scale-up
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 9. Probiotics CEMONC-only scale-up
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 10. Probiotics BEMONC-only scale-up
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 11. Azithromycin V&V
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 12. Misoprostol V&V
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 13. Azithromycin results
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 14. No ACS and total CPAP V&V
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 15. Total ACS and CPAP V&V
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 16. Total ACS and no CPAP V&V
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - 

.. _MNCNH intrapartum component scenario table:

.. list-table:: Intrapartum component scenario-dependent variables
  :header-rows: 1

  * - Scenario
    - Azithromycin coverage
    - Corticosteroid coverage
    - Misoprostol coverage
    - Note
  * - 1. Baseline
    - Defined on :ref:`intrapartum intervention model document <2024_vivarium_mncnh_portfolio_intrapartum_interventions_module>`
    - Defined on :ref:`intrapartum intervention model document <2024_vivarium_mncnh_portfolio_intrapartum_interventions_module>`
    - Defined on :ref:`intrapartum intervention model document <2024_vivarium_mncnh_portfolio_intrapartum_interventions_module>`
    - 
  * - 2. CPAP total scale-up
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 3. CPAP CEMONC-only scale-up
    - Baseline
    - Baseline
    - Baseline
    -  
  * - 4. CPAP BEMONC-only scale-up
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 5. Antibiotics total scale-up
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 8. Probiotics total scale-up
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 9. Probiotics CEMONC-only scale-up
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 10. Probiotics BEMONC-only scale-up
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 11. Azithromycin V&V
    - 50% at BEmONC and CEmONC, baseline at home
    - 0%
    - 0%
    - 
  * - 12. Misoprostol V&V
    - 0%
    - 0%
    - 50% among eligible population (attends ANC and delivers at home)
    - 
  * - 13. Azithromycin results
    - 100% at BEmONC and CEmONC, baseline at home
    - Baseline
    - Baseline
    - 
  * - 14. No ACS and total CPAP V&V
    - Baseline
    - 0% coverage at all delivery location types 
    - Baseline
    - CPAP should have 100% coverage at BEmONC and CEmONC facilities, baseline at home
  * - 15. Total ACS and CPAP V&V
    - Baseline
    - 100% coverage at BEmONC and CEmONC facilities, baseline at home
    - Baseline
    - CPAP should also have 100% coverage at BEmONC and CEmONC facilities, baseline at home
  * - 16. Total ACS and no CPAP V&V
    - Baseline
    - 100% coverage at BEmONC and CEmONC facilities, baseline at home
    - Baseline
    - CPAP should have 0% coverage at all delivery location types      

.. _MNCNH neonatal component scenario table:

.. list-table:: Neonatal component scenario-dependent variables
  :header-rows: 1

  * - Scenario
    - CPAP coverage
    - Antibiotics coverage
    - Probiotics coverage
    - Note
  * - 1. Baseline
    - Defined on the :ref:`CPAP intervention model document <intervention_neonatal_cpap>`
    - Defined on the :ref:`neonatal antibiotic intervention document <intervention_neonatal_antibiotics>`
    - Defined on the :ref:`probiotics intervention model document <intervention_neonatal_probiotics>`
    - Baseline coverage values are delivery facility-specific
  * - 2. CPAP total scale-up
    - 100% availability at BEMONC and CEMONC facilities
    - Baseline
    - Baseline
    - 
  * - 3. CPAP CEMONC-only scale-up
    - 100% at CEMONC, baseline at BEMONC
    - Baseline
    - Baseline
    -  
  * - 4. CPAP BEMONC-only scale-up
    - Baseline at CEMONC, 100% at BEMONC
    - Baseline
    - Baseline
    - 
  * - 5. Antibiotics total scale-up
    - Baseline
    - 100% coverage
    - Baseline
    - 
  * - 8. Probiotics total scale-up
    - Baseline
    - Baseline
    - 100% availability at CEMONC and BEMONC facilities
    - 
  * - 9. Probiotics CEMONC-only scale-up
    - Baseline
    - Baseline
    - 100% availability at CEMONC, baseline at BEMONC
    - 
  * - 10. Probiotics BEMONC-only scale-up
    - Baseline
    - Baseline
    - Baseline at CEMONC, 100% at BEMONC
    - 
  * - 11. Azithromycin V&V
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 12. Misoprostol V&V
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 13. Azithromycin Results
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 14. No ACS and total CPAP V&V
    - 100% coverage at BEmONC and CEmONC facilities, baseline at home
    - Baseline
    - Baseline
    - ACS should have 0% coverage at all delivery location types 
  * - 15. Total ACS and CPAP V&V
    - 100% coverage at BEmONC and CEmONC facilities, baseline at home
    - Baseline
    - Baseline
    - ACS should also have 100% coverage at BEmONC and CEmONC facilities, baseline at home
  * - 16. Total ACS and no CPAP V&V
    - 0% coverage at all delivery location types 
    - Baseline
    - Baseline
    - ACS should have 100% coverage at BEmONC and CEmONC facilities, baseline at home  

.. _mncnh_portfolio_4.0:

4.0 Outputs/Observers
++++++++++++++++++++++

Specific observer outputs and their stratifications may vary by model run as needs change. Modifications to default will be noted in the model run requests tables. Note that the observers and outputs listed here are different from the module outputs above. The outputs of the module are intended to be intermediate values that may or may not be included as observed simulated outputs.

Default stratifications to all observers should include scenario and input draw.
 
.. todo:: 

  Confirm whether we want to continue stratifying by random seed? Currently all of the results dataframes are.

.. list-table:: Simulation observers
  :header-rows: 1

  * - Observer
    - Default stratifications
    - Note
  * - 1. Maternal disorders burden: cause-specific cases, deaths, YLLs, and YLDs
    - * Maternal age group
      * Pregnancy outcome
      * Delivery facility
      * Azithromycin coverage
      * Misoprostol coverage
    - 
  * - 2. Births (this observer includes ALL pregnancy outcomes, including partial term pregnancies that may not typically be considered "births")
    - * Pregnancy outcome
      * Child sex
      * Delivery facility type
      * Antibiotics availability
      * Probiotics availability
      * CPAP availability
      * Corticosteroid coverage
      * ACS eligibility (dichotomous, 'eligible' if believed gestational age is between 26-33 weeks, 'not eligible' if gestational age is outside of this range)
    - Included, except for corticosteroid coverage which has yet to be added
  * - 3. Neonatal deaths (cause-specific)
    - * Child sex
      * Child age group
      * Delivery facility type
      * CPAP availability
      * Antibiotics availability
      * Probiotics availability
      * Corticosteroid coverage
      * ACS eligibility (dichotomous, 'eligible' if believed gestational age is between 26-33 weeks, 'not eligible' if gestational age is outside of this range)
    - Included, except for corticosteroid coverage which has yet to be added
  * - 4. Antibiotics eligible birth counts
    - * Delivery facility type
    - Included. Confirm this represents "eligible birth counts"?
  * - 5. CPAP eligible birth counts
    - * Delivery facility type
    - Included. Confirm this represents "eligible birth counts"?
  * - 6. Probiotics eligible birth counts
    - * Delivery facility type
    - Included. Confirm this represents "eligible birth counts"?
  * - 7. Maternal population counts
    - * Maternal age group
      * Pregnancy outcome
      * ANC first trimester attendance (dichotomous)
      * ANC later pregnancy attendance (dichotomous)
      * ANC attendance (polychotomous)
      * Ultrasound coverage
      * Azithromycin coverage
      * Misoprostol coverage
      * Hemoglobin screening coverage
      * Ferritin screening coverage
      * True hemoglobin exposure (dichotomous,  'low' if truly low hemoglobin and 'adequate' if truly adequate hemoglobin)
      * Test hemoglobin exposure (dichotomous, 'low' if tested low hemoglobin,'adequate' if tested adequate hemoglobin, N/A if not tested)
      * Ferritin status (dichotomous, 'low' if low ferritin, 'adequate' if adequate ferritin, N/A if not tested)
      * Delivery facility
      * Preterm status
      * Believed preterm status
      * ACS eligibility (dichotomous, 'eligible' if believed gestational age is between 26-33 weeks, 'not eligible' if gestational age is outside of this range)
    - 

.. todo::

  Determine whether we want to continue to have duplicate information like:

    - Stratifying the birth observer by neonatal interventions,

    - AND separately observing neonatal intervention counts

.. note::

  Additional outputs to add for wave II include:

  * Anemia status at birth counts (none/mild/moderate/severe)
  * YLDs due to anemia in pregnancy
  * Postpartum anemia status counts (non/mild/moderate/severe)
  * YLDs due to anemia in the postpartum period
  * First trimster ANC attendance (stratified by pregnancy term duration)
  * Later pregnancy ANC attendance (stratified by pregnancy term duration)
  * Hemoglobin and ferritin screening counts
  * MMS/IFA intervention counts
  * IV iron intervention counts

  Measures to check in the interactive sim include:

  * True hemoglobin exposure
  * Measured hemoglobin exposure
  * Ferritin exposure

.. _mncnh_portfolio_5.0:

5.0 Model run requests
++++++++++++++++++++++

.. list-table:: Default simulation specifications
  :header-rows: 1

  * - Parameter
    - Value
    - Note
  * - Location(s)
    - * Ethiopia (ID: 179)
      * Nigeria (ID: 214)
      * Pakistan (ID: 165)
    -
  * - Number of draws
    - 10
    - See next row for which specific draws to be used. Based on calculations from the `Nutrition Optimization project <https://vivarium-research.readthedocs.io/en/latest/models/concept_models/vivarium_nutrition_optimization/kids/concept_model.html#production-run-specifications>`_: production run number divided in half for default V&V runs
  * - Draw numbers
    - 115, 60, 368, 197, 79, 244, 272, 167, 146, 71, 278, 406, 94, 420, 109, 26, 35, 114, 428, 170
    - The :ref:`hemoglobin exposure <2023_hemoglobin_exposure>` model only has 100 draws. The standard number of draws for other models in this simulation is 500. To resolve this discrepancy, we have repeated the hemoglobin exposure draws five times so that draw 1, 101, 201, 301, and 401 all have the same value, etc. To ensure that we do not sample multiple draws that have the same values for hemoglobin exposure, we will pre-specify which draws to select according to the numbers listed here. This list of numbers was generated by sampling a random number between 0 and 499 and resampling when a number was generated that had the same remainder after dividing by 100 as a number that was already in the list. 20 draws have been listed although the default number of draws for V&V model runs is 10 - the first 10 numbers in this list should be used for V&V runs. Note that draws were not pre-specified according to this list prior to model version 11.0.
  * - Population size per draw
    - 100,000
    - Based on calculations from the `Nutrition Optimization project <https://vivarium-research.readthedocs.io/en/latest/models/concept_models/vivarium_nutrition_optimization/kids/concept_model.html#production-run-specifications>`_: production run number divided in half for default V&V runs
  * - Randomness key columns
    - ['entrance_time','age']
    - Note that each row of the population table in this simulation contains a pregnant simulant AND the outcome of that simulant's pregnancy. Therefore, the conversion of a stillbirth to a live birth between simulated scenarios in this simulation will not result in a new row added to the simulation state table and therefore will not change the state table index value of other simulants like occured in the IV iron simulation and resulted in disruptions to common random numbers between scenarios. Therefore, these randomness key columns are expected to be sufficient for this simulation.
  * - Age start (initialization) 
    - 10
    - Applies to pregnant population only
  * - Age end (initialization)
    - 54
    - Applies to pregnant population only
  * - Age start (observation)
    - N/A. All pregnant simulants observed from start of pregnancy. All neonatal simulants observed from birth.
    - 
  * - Age end (observation)
    - N/A; All pregnant simulants observed through conclusion of relevant modeled outcomes. All neonatal simulants observed until 28 days (end of late neonatal age group)
    - Pregnant/birthing simulants do not age in this simulation

.. note::

  The "Directory" column in the table below lists the subdirectory nested within ``mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/`` where results specific to that model run can be found.

  Model numbers with an asterisk indicate planned model runs that are not yet ready to be implemented. 

.. list-table:: Model runs
  :header-rows: 1

  * - Number
    - Run
    - Scenarios
    - Directory
    - Specification mods
    - Stratification mods
    - Observer mods
  * - 1
    - Wave I Pregnancy V&V
    - Baseline
    - ``pregnancy``
    - 
    -
    -
  * - 2
    - Wave I Maternal disorders V&V
    - Baseline
    - ``maternal_disorders``
    - 
    - 
    - 
  * - 3
    - Wave I Neonatal disorders V&V
    - Baseline
    - ``neonatal_disorders``
    - 
    - 
    - 
  * - 3.1
    - Wave I Neonatal disorders V&V with correct LBWSG distribution
    - Baseline
    - ``neonatal_disorders``
    - 
    -
    -
  * - 3.2
    - Wave I Neonatal disorders V&V with LBWSG component removed
    - Baseline
    - ``no_lbwsg``
    - 
    - 
    - 
  * - 3.3
    - Wave I Neonatal disorders V&V with early NN observer bugfix
    - Baseline
    - ``risk_effects``
    - 
    - 
    - 
  * - 4.1
    - Wave I CPAP 
    - Baseline
    - ``cpap``
    - 
    - 
    - 
  * - 4.2
    - Wave I CPAP with observer for counts per facility type
    - Baseline
    - ``cpap_2``
    - 
    - 
    - 
  * - 4.3
    - Wave I CPAP with addition of a delivery facility column in births observer and CPAP availability stratification
      in neonatal burden observer
    - Baseline
    - ``cpap_3``
    - 
    - 
    - 
  * - 4.4
    - Wave I CPAP with updated determination of delivery facility type
    - Baseline
    - ``cpap_4``
    - 
    - 
    - 
  * - 4.5
    - Wave I CPAP with bugfix for negative other causes mortality rates
    - Baseline
    - ``cpap_5``
    - 
    - 
    - 
  * - 4.6
    - Wave I CPAP with scale-up scenarios 
    - Baseline and alternative scenarios 2, 3, and 4
    - ``cpap_full_scenarios``
    - 
    - 
    - 
  * - 4.7
    - Correct pregnancy duration for partial term pregnancies
    - Baseline and alternative scenarios 2, 3, and 4
    - ``birth_exposure_2``
    - 
    - 
    - 
  * - 5.0
    - Wave I neonatal antibiotics with scale-up scenarios 
    - Baseline and alternative scenarios 2 - 7 
    - ``antibiotics``
    - 
    - 
    - 
  * - 5.1
    - Wave I neonatal antibiotics with scale-up scenarios; engineer refactor 
    - Baseline and alternative scenarios 2 - 7 
    - ``children_mapped``
    - 
    - 
    - 
  * - 6.0
    - Wave I neonatal probiotics with scale-up scenarios 
    - Baseline and alternative scenarios 2 - 10 
    - ``probiotics``
    - 
    - 
    - 
  * - 6.0.1
    - Wave I neonatal disorders ACMR with 200k population without interventions
    - Baseline 
    - ``/no_interventions/``
    - Population increased 10 fold (random seed population size changed from 20k to 200k)
    - 
    - 
  * - 6.0.2
    - Wave I neonatal disorders ACMR with 2 million population
    - Baseline
    - ``/acmr-2mil/``
    - Population increased 100 fold (random seed population size changed from 20k to 2 million)
    - 
    - 
  * - 6.0.3
    - Wave I neonatal disorders ACMR with rate to probability conversion
    - Baseline 
    - ``/rate_conversion/``
    - 
    - 
    - 
  * - 6.0.4
    - Wave I neonatal disorders ACMR with raw CMSR
    - Baseline
    - ``/raw_csmr/``
    - 
    - 
    - 
  * - 6.1
    - Rerun with LBWSG PAF changes for Ethiopia: (1) fix sex-specificity bug in LBWSG PAF calculation, and (2) use LBWSG exposure at birth for calculation of the ENN LBWSG PAF
    - All scenarios
    - ``model6.1``
    - 
    - 
    - 
  * - 6.2
    - Same specifications as model 6.1, but this time with the exponential rate-to-probability conversion (:math:`p= 1 - e^{(-\text{rate} * \text{duration scaling factor})}`) in `this function <https://github.com/ihmeuw/vivarium_gates_mncnh/blob/29fe810c2f1abf5b358a452d3f59ffdda266afe8/src/vivarium_gates_mncnh/utilities.py#L187-L193>`_
    - Baseline
    - ``model6.2``
    - 
    - 
    - Birth observer updated from output of state table (single row per simulant) to observer detailed in the observer section for all subsequent model runs
  * - 6.2.1
    - Same as 6.2, but with a fix for `this rate to probability equation transcription error <https://github.com/ihmeuw/vivarium_gates_mncnh/commit/fc12ab5063dc363a4b8d14e5b85ecb794cd19598>`_ (add back in the duration_scaling_factor) and include partial term pregnancy fix to bith observer
    - Baseline
    - ``model6.2.1``
    -
    - 
    - 
  * - 6.3
    - Same specifications as model 6.2 (including the exponential rate-to-probability calculation), but with ENN LBWSG PAF updated to use the ENN LBWSG exposure prevalence rather than the LBWSG exposure at birth
    - Baseline
    - ``model6.3``
    -
    - 
    - 
  * - 6.4
    - Same specifications as model 6.3 (including the ENN LBWSG PAF using ENN exposure), but with the revision of the rate-to-probability calculation back to :math:`p = \text{rate} * \text{duration scaling factor}`
    - Baseline
    - ``model6.4``
    -
    - 
    - 
  * - 6.5
    - * Use the birth prevalence to calculate the LBWSG PAF for the early neonatal age group (like in model run 6.1). Use this until otherwise noted.
      * Use the linear rate-to-probability equation (like in model run 6.1). Use this until otherwise noted.
      * Add in observer #7 (maternal population observer)
    - All scenarios
    - ``model6.5``
    - Default
    - Default
    - Maternal population observer added for this run and to be included in all subsequent runs
  * - 7.0
    - Wave I neonatal probiotics with scale-up scenarios, same as model 6.0 but with `effective coverage (only preterm neonates receive probiotics) <https://github.com/ihmeuw/vivarium_research/pull/1643>`_ 
    - Baseline and alternative scenarios 2 - 10 
    - ``model7.0``
    - Default
    - Stratify probiotics observer (#6) with gestational age above/below 37 weeks for V&V
    - Default
  * - 7.0.1
    - Same specifications as 7.0, but with preterm stratification for the probiotics observer included (left out of last run) and fix to the intervention observers to not count stillbirths
    - All scenarios
    - ``model7.0.1``
    - Default
    - * Stratify probiotics observer (#6) by gestational age above/below 37 weeks for V&V
      * Stratify births observer by gestational age above/below 37 weeks
      * Stratify neonatal deaths observer by gestational age above/below 37 weeks
    - Default
  * - 7.0.2
    - Update :math:`p_\text{preterm}` parameter used in the :ref:`preterm cause model <2021_cause_preterm_birth_mncnh>` to use birth exposure rather than age-specific exposure 
    - All scenarios
    - ``model7.0.2``
    - Default
    - Default
    - Default
  * - 7.1
    - Update neonatal mortality rates to mortality risks 

      * Update mortality input data and remove rate to probability conversion: `see this PR for full details and accounting of updates <https://github.com/ihmeuw/vivarium_research/pull/1654>`_
      * Use the birth LBWSG exposure for calculation of the ENN LBWSG PAF
      * Use the LNN LBWSG exposure for calculation of the LNN LBWSG PAF. Note that this is incorrect, but an acceptable placeholder until we update in model run 7.2
    - Baseline
    - ``model7.1``
    - Default
    - Same modifications as run 7.0.1:

      * Stratify probiotics observer (#6) by gestational age above/below 37 weeks for V&V
      * Stratify births observer by gestational age above/below 37 weeks
      * Stratify neonatal deaths observer by gestational age above/below 37 weeks
    - Default
  * - 7.1.1
    - Add parameter uncertainty interval for CPAP effect size
    - All scenarios
    - ``model7.1.1``
    - Default
    - Same as 7.0.1
    - Default
  * - 8.0
    - Wave I azithromycin 
    - All scenarios (note new azithromycin scale-up scenario #11)
    - ``model8.0``
    - Default
    - Azithromycin stratifications added to observers #1 and #7 (maternal burden and maternal population observers) - to be continued as defaults for all future runs
    - Default
  * - 8.1
    - * Implement LBWSG RR caps (applied to both the ENN and LNN age groups)
      * Recalculate LBWSG PAFs with capped RRs
    - Baseline
    - ``model8.1``
    - Default
    - Same modifications as run 7.0.1
    - Default
  * - 8.2
    - Update neonatal probiotics intervention effect size in accordance with `line #183 in this PR <https://github.com/ihmeuw/vivarium_research/pull/1672>`_
    - All scenarios
    - ``model8.2``
    - Default
    - Same modifications as run 7.0.1
    - Default
  * - 8.3
    - `Update neonatal antibiotics intervention modeling strategy in accordance with this PR <https://github.com/ihmeuw/vivarium_research/pull/1670>`_
    - All scenarios (note that scenarios #6 and #7 have been deleted as they are no longer relevant and scenario #5 no longer has delivery facility-specific coverage)
    - ``model8.3``
    - Default
    - Default
    - Default
  * - 9.0
    - Wave I misoprostol
    - Baseline and #12
    - ``model9.0``
    - Default
    - Note misoprostol coverage added as a stratifying variable to maternal disorders burden and maternal population observers and delivery facility as a stratifying variable for the maternal disorders burden observer
    - Default
  * - 9.1
    - Bugfix to scale up neonatal antibiotics intervention among home deliveries as well 
    - All scenarios
    - ``model9.1``
    - Default
    - Default
    - Default
  * - 9.2
    - Larger population size to confirm maternal obstructed labor is not affected by azithromycin
    - All scenarios
    - ``model9.2``
    - 10x larger population size (100 seeds of 20_000 population size each = 2_000_000 population size per draw) and 2x as many draws for a total of 20 draws
    - Default
    - Default
  * - 9.3
    - Additional stratifications and updated intervention scenario coverage for intrapartum intervention V&V
    - All scenarios -- Note changes to scenario numbers 11 and 12
    - ``model9.3``
    - Same population size as 9.2
    - Make sure maternal disorders burden is stratified by delivery facility and pregnancy outcome as specified
    - Default 
  * - 10.0
    - :ref:`Postpartum depression <2021_cause_postpartum_depression_mncnh>` added as new maternal disorder cause
    - Baseline
    - ``model10.0``
    - Default
    - Default
    - Note that postpartum depression cause should be added to the maternal disorders burden observer
  * - 10.1
    - Run with no effect between LBWSG risk factor and Neonatal encephalopathy due to birth asphyxia and birth trauma (but keep LBWSG effects on all other outcomes)
    - All scenarios
    - ``model10.1``
    - Default
    - Default
    - Default
  * - 10.2
    - Same as 10.0 but with additional scenario #13 (azithromycin results)
    - All scenarios
    - ``model10.2``
    - Default
    - Default
    - Default
  * - 11.0
    - Add :ref:`Hemoglobin risk exposure model <2023_hemoglobin_exposure>`. Note that this will be the starting point for the larger :ref:`wave II hemoglobin module <2024_vivarium_mncnh_portfolio_hemoglobin_module>`, which will be built out in future model runs
    - Baseline
    - ``model11.0``
    - Default
    - Default
    - Default (no new hemoglobin observer required)
  * - 11.1
    - Bugfix to VPH LBWSG refactor to ensure that LBWSG exposure **at birth** (rather than the early neonatal exposure) is used for initializing LBWSG exposures in the simulation. Note that this VPH refactor was introduced between models 8.2/8.3 and 9.0 and persisted until this run.
    - Baseline
    - ``model11.1``
    - Default
    - Default
    - Default
  * - 11.2
    - `Update draws in accordance with this PR <https://github.com/ihmeuw/vivarium_research/pull/1697>`_
    - Baseline
    - ``model11.2``
    - Default
    - Default
    - Default
  * - 12.0
    - Capped LBWSG RRs and new late neonatal LBWSG PAF calculation, in accordance with `vivarium research PR #1681 <https://github.com/ihmeuw/vivarium_research/pull/1681>`_ and `subsequent update in PR #1716 <https://github.com/ihmeuw/vivarium_research/pull/1716>`_
    - Baseline
    - ``model12.0``
    - Default
    - Default
    - Default
  * - 12.1
    - Bugfix to calculation of prevalence of preterm, to ensure we include categories with an upper bound of 37 weeks
    - Baseline
    - ``model12.1``
    - Default
    - Default
    - Default
  * - 12.1.1
    - Update to LBWSG PAF calculation for the late neonatal age group. In model 12.0, the PAF calculation for the late neonatal age group did not use the PAF as calculated for the early neonatal age group in the determination of mortality among the early neonatal age group (the PAF using capped and interpolated RRs), as specified in the documentation. This model run will update the LNN LBWSG PAF calculation to utilize the custom calculated ENN LBWSG PAF as specified in the documentation.
    - Baseline
    - ``model12.1.1``
    - Default
    - Default
    - Default
  * - 13.0
    - `Hemoglobin risk effects on maternal disorders <https://vivarium-research.readthedocs.io/en/latest/models/concept_models/vivarium_mncnh_portfolio/maternal_disorders_module/module_document.html#id1>`_
    - Baseline
    - ``model13.0``
    - Default
    - Default
    - Default
  * - 14.0
    - Wave II updates to the :ref:`antenatal care attendance module <2024_vivarium_mncnh_portfolio_anc_module>`
    - Baseline
    - ``model14.0``
    - Default
    - Default
    - Default, note that we would like the 4-category ANC attendance variable observed
  * - 15.0
    - :ref:`Delivery facility choice model
      <2024_facility_model_vivarium_mncnh_portfolio>`, including updates
      to the :ref:`AI Ultrasound module
      <2024_vivarium_mncnh_portfolio_ai_ultrasound_module>`
    - Baseline
    - ``model15.0``
    - Default
    - Added preterm status and believed preterm status to maternal
      population observer (#7)
    - Default
  * - 16.0
    - Wave I antenatal corticosteroids
    - Baseline
    - ``model16.0``
    - Default
    - Default, note that we would like additional stratifications based on believed gestational age in the maternal population, births, and neonatal burden observers
    - Default

.. note:: 

  Some of the notebook URLs for the older runs might be out-of-date. If you click one of these links and it gives
  you a 404 error, add to your URL `/old_vnv_notebooks/` after `verification_and_validation`, and that should take you
  to the right place!

.. list-table:: V&V tracking 
  :header-rows: 1

  * - Model number
    - V&V plan
    - V&V summary
    - Link to notebook
  * - 1.0
    - 
      - Confirm ANC visit rate matches expectations
      - Confirm ultrasound rates matches inputs for all scenarios
      - Confirm gestational age estimate and real gestational age have the correct margin of error based on ultrasound type
      - Confirm birth rates (live, still, partial) match GBD
      - Confirm pregnancy population is within expected WRA age group (15-49 years) 
    - All checks passed except last one; RT is updating our observer output requests to add an observer for pregnant person age.
    - `Notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/pregnancy_model.ipynb>`__ 
  * - 2.0
    - 
       - For each modeled maternal disorder (sepsis, hemorrhage, and OL/uterine rupture), we need to: 
          - Validate the cause-specific incidence risk and case fatality rate in
            each age group against the corresponding quantities calculated from
            GBD data
          - Validate the number of cause-specific deaths per population against
            the CSMR from GBD
          - Validate the total YLDs and YLLs per case
       - Confirm the overall mortality rate of all maternal disorders lines up with GBD expectations. 
    - All checks passed except error found in GBD 2021 for Pakistan fistula modeling - need to update the artifact for Pakistan OL prevalence values from 
      GBD 2021 to GBD 2023. Did not explicitly check YLLs yet.
    - `Notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/maternal_disorders_refactored.ipynb>`__
  * - 3.0
    - For each modeled neonatal disorder (sepsis, hemorrhage, and OL/uterine rupture), we need to: 
       - Validate the cause-specific incidence risk and case fatality rate in
          each age group against the corresponding quantities calculated from
          GBD data
       - Validate the number of cause-specific deaths per population against
          the CSMR from GBD 
    - Found an error in LBWSG distribution in artifact, which might be the cause of some of the other checks that weren't passing, including the ACMR 
      for the late neonatal group and the CSMR for preterm 
    - `Notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/neonatal_disorders.ipynb>`__
  * - 3.1
    - Validate LBWSG exposure distribution
    - LBWSG distributions in artifact, GBD, and simulation are now matching, but preterm deaths still look too low in the simulation
    - `Notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/old_vnv_notebooks/lbwsg_distribution.ipynb>`__
  * - 3.2
    - Validate all-cause mortality for early and late neonatal age groups with LBWSG component removed
    - Early neonatal mortality is still being overestimated in the simulation 
    - `Notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_2_26_vnv_neonatal_acmr.ipynb>`__
  * - 3.3
    - 
      - Validate all-cause mortality for early neonatal age group with observer bugfix
      - Validate that individual RRs vary with LBWSG exposure 
      - Validate that individual RRs affect mortality rates appropriately
      - Validate that no non-preterm babies are dying of preterm
    - Early neonatal mortality is validating now! 
      Note: Ali noticed in the LBWSG interactive sim that the state table and pipeline values for LBWSG exposure don't match, but engineers confirmed this is okay,
      the pipeline values refresh after being recorded in the state table (and then are not used again).
    - 
      - `Notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/old_vnv_notebooks/2025_2_27_vnv_neonatal_acmr.ipynb>`__
      - `LBWSG interactive sim <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/20250313_lbwsg_effects_interactive_simulation.ipynb>`__
  * - 4.1
    - Validate RR of CPAP on RDS preterm (and confirm other causes are unchanged)
    - Cannot validate, need observer with counts per facility type 
    - 
      - `Full run notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_03_18a_vnv_cpcp_full_run.ipynb>`__
      - `ACMR notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_03_18b_vnv_neonatal_acmr-w_cpap.ipynb>`__
      - `CSMR notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_03_18c_vnv_neonatal_csmr_w_cpap.ipynb>`__

  * - 4.2
    - Validate RR of CPAP on RDS preterm (and confirm other causes are unchanged)
    - Cannot validate, need to add delivery facility column in births observer and stratification for CPAP availability 
    - 
      - `Full run notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_03_18a_vnv_cpcp_full_run.ipynb>`__
      - `ACMR notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_03_18b_vnv_neonatal_acmr-w_cpap.ipynb>`__
      - `CSMR notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_03_18c_vnv_neonatal_csmr_w_cpap.ipynb>`__

  * - 4.3
    - Validate RR of CPAP on RDS preterm (and confirm other causes are unchanged)
    - Not validating, need to update how we determine which delivery facility type a simulant will go to 
    - 
      - `Full run notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_03_18a_vnv_cpcp_full_run.ipynb>`__
      - `ACMR notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_03_18b_vnv_neonatal_acmr-w_cpap.ipynb>`__
      - `CSMR notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_03_18c_vnv_neonatal_csmr_w_cpap.ipynb>`__

  * - 4.4
    - Validate RR of CPAP on RDS preterm (and confirm other causes are unchanged)
    - Not validating, we are seeing negative mortality rates for Other causes 
    - 
      - `Full run notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_03_18a_vnv_cpcp_full_run.ipynb>`__
      - `ACMR notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_03_18b_vnv_neonatal_acmr-w_cpap.ipynb>`__
      - `CSMR notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_03_18c_vnv_neonatal_csmr_w_cpap.ipynb>`__

  * - 4.5
    - Validate RR of CPAP on RDS preterm (and confirm other causes are unchanged)
    - CSMRs and ACMR are all validating now, with the bugfix to adjust all negative values to 0 and rescale the rest of the RRs to add up to 1
    - 
      - `Full run notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_03_18a_vnv_cpcp_full_run.ipynb>`__
      - `ACMR notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_03_18b_vnv_neonatal_acmr-w_cpap.ipynb>`__
      - `CSMR notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_03_18c_vnv_neonatal_csmr_w_cpap.ipynb>`__

  * - 4.7
    - Validate partial term pregnancy duration is between 6 and 24 weeks and uniformly distributed. 
    - Validated for all 3 locations
    - `Notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_04_07a_vnv_partial_term_preg.ipynb>`__
  * - 5.0
    - Validate RR of antibiotics on sepsis (and confirm other causes are unchanged)
    - Everything is validating - RR on sepsis aligns with expected value; other causes, non-RDS preterm, and encephalopathy all have the expected RRs of 1 from antibiotics.
      There's an RR of 0.78 for antibiotics on preterm with RDS, but we confirmed that when we group this by facility type, there is the expected RR of 1. This is because
      the probability of a simulant receiving CPAP and the probability of receiving antibiotics are not independent (both related to facility choice).
    - `Notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_03_31a_vnv_and_scenario_results_antibiotics.ipynb>`__
  * - 5.1
    - Validate maternal and neonatal disorders and intervention effect sizes after refactor
    - Everything is validating! We noticed the maternal disorders incidence parquet files were mislabeled, the fix for that has already been implemented. 
    - 
      - `Maternal disorders notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_04_09a_vnv_maternal_disorders_refactor.ipynb>`__
      - `Neonatal disorders notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_04_09b_vnv_neonatal_disorders_refactor.ipynb>`__
      - `Antibiotics & ACMR notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_04_09c_vnv_neonatal_acmr-w_antibiotics_refactor.ipynb>`__
      - `Antibiotics & CSMR notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_04_09e_vnv_neonatal_csmr_w_antibiotics_refactor.ipynb>`__
  * - 6.0
    - Validate coverage, RR of probiotics on sepsis (and confirm other causes are unchanged)
    - Neonatal ACMR looks off, residuals have gotten increasingly worse with additional interventions
    - `ACMR notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_04_10a_vnv_neonatal_acmr-w_probiotics.ipynb>`__
      `Notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_04_10b_vnv_and_scenario_results_probiotics.ipynb>`__
  * - 6.0.1
    - Validate neonatal disorders ACMR with 200k population without interventions
    - Used the attached notebook and spreadsheet to figure out which runs were validating with ACMR and which were not
    - 
      - `Source of truth notebook for testing neonatal disorders ACMR here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_04_28a_vnv_neonatal_acmr.ipynb>`_
      - `Excel spreadsheet of neonatal ACMR V&V run list here <https://uwnetid.sharepoint.com/:x:/r/sites/ihme_simulation_science_team/_layouts/15/Doc.aspx?sourcedoc=%7B1DCEBE2A-AC51-49D3-8553-B0FBBEA276B1%7D&file=Neonatal%20Disorders%20ACMR%20Model%20Run%20List.xlsx&action=default&mobileredirect=true>`_
  * - 6.0.2
    - Validate neonatal disorders ACMR in baseline scenario with 2 million population
    - Used the attached notebook and spreadsheet to figure out which runs were validating with ACMR and which were not
    - 
      - `Source of truth notebook for testing neonatal disorders ACMR here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_04_28a_vnv_neonatal_acmr.ipynb>`_
      - `Excel spreadsheet of neonatal ACMR V&V run list here <https://uwnetid.sharepoint.com/:x:/r/sites/ihme_simulation_science_team/_layouts/15/Doc.aspx?sourcedoc=%7B1DCEBE2A-AC51-49D3-8553-B0FBBEA276B1%7D&file=Neonatal%20Disorders%20ACMR%20Model%20Run%20List.xlsx&action=default&mobileredirect=true>`_
  * - 6.0.3
    - Validate neonatal disorders ACMR when reverting the rate to probability conversion for mortality rates when choosing when neonates die
    - Used the attached notebook and spreadsheet to figure out which runs were validating with ACMR and which were not
    - 
      - `Source of truth notebook for testing neonatal disorders ACMR here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_04_28a_vnv_neonatal_acmr.ipynb>`_
      - `Excel spreadsheet of neonatal ACMR V&V run list here <https://uwnetid.sharepoint.com/:x:/r/sites/ihme_simulation_science_team/_layouts/15/Doc.aspx?sourcedoc=%7B1DCEBE2A-AC51-49D3-8553-B0FBBEA276B1%7D&file=Neonatal%20Disorders%20ACMR%20Model%20Run%20List.xlsx&action=default&mobileredirect=true>`_
  * - 6.0.4
    - Validate neonatal disorders ACMR when using raw CSMRs for the non-preterm neonatal causes, removed LBWSG RRs on those neonatal causes
    - Used the attached notebook and spreadsheet to figure out which runs were validating with ACMR and which were not
    - 
      - `Source of truth notebook for testing neonatal disorders ACMR here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_04_28a_vnv_neonatal_acmr.ipynb>`_
      - `Excel spreadsheet of neonatal ACMR V&V run list here <https://uwnetid.sharepoint.com/:x:/r/sites/ihme_simulation_science_team/_layouts/15/Doc.aspx?sourcedoc=%7B1DCEBE2A-AC51-49D3-8553-B0FBBEA276B1%7D&file=Neonatal%20Disorders%20ACMR%20Model%20Run%20List.xlsx&action=default&mobileredirect=true>`_
  * - 6.1
    - Check ENN mortality ratio compared to GBD
    - Neonatal mortality ratios are now slightly underestimated (rather than the previous overestimation). Note that calculation of the mortality ratio of the LNN age group has been updated in this notebook to be [deaths in LNN age group] / [population at the start of the LNN age group], rather than a denominator of live births so that LNN mortality is not dependent on ENN mortality.
    - * `Model 6.1 neonatal mortality validation notebook for all locations and draws <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_6.1_nn_mortality_full_locations_and_draws.ipynb>`_. 
      * `Model 6.1 neonatal mortality validation notebook for a single draw run <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_6.1_nn_mortality_single_draw.ipynb>`_
      * `Notebook comparing model 6.1 to 6.1-6.4 <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_6.1_through_6.4_nn_mortality_comparison.ipynb>`_
  * - 6.2
    - Check ENN mortality ratio compared to GBD
    - Neonatal mortality ratios are now dramatically overestimated. Note that while the birth observer has changed between models 6.1 and 6.2, it has been verified that birth counts do not vary between these runs and that greater death count values are driving the difference between neonatal mortality ratios in 6.1 and 6.2
    - * `Model 6.2 neonatal mortality validatio notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_6.2_nn_mortality.ipynb>`_
      * Birth observer has zero counts for all partial term pregnancy outcomes
  * - 6.2.1
    - Check ENN mortality ratio compared to GBD, check that birth observer is recording partial term pregnancies 
    - * neonatal mortality ratios are within the expected range (underestimated to a degree greater than 6.1)
      * birth observer is functioning as expected
    - * `Model 6.2.1 vv notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_6.2.1_nn_mortality.ipynb>`_
      * `Notebook comparing model 6.1 and 6.2.1 <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_6.1_through_6.4_nn_mortality_comparison.ipynb>`_
  * - 6.3
    - Check ENN mortality ratio compared to GBD and models 6.1-6.4
    - Mortality is slightly overestimated. It appears that overestimation in 6.3 is slightly larger in magnitude than the underestimation of 6.1. 
    - `Notebook comparing model 6.3 to 6.1-6.4 <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_6.1_through_6.4_nn_mortality_comparison.ipynb>`_
  * - 6.4
    - Check ENN mortality ratio compared to GBD and models 6.1-6.4
    - Mortality is overestimated to a degree greater than 6.3
    - `Notebook comparing model 6.4 to 6.1-6.4 <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_6.1_through_6.4_nn_mortality_comparison.ipynb>`_
  * - 6.5
    - * Check that the neonatal mortality ratio is as expected in line with model 6.1
      * Check that the new observer #7 is as expected
      * Check that the pregnant population age structure looks as expected in new observer
    - * Neonatal mortality ratio in expected range for all cause mortality (slightly underestimated, same as model 6.1)
      * Neonatal mortality ratio in expected range for cause-spcific mortality other than preterm birth (slightly underestimated, same as all-cause mortality)
      * Neonatal mortality ratio due to preterm birth is slightly overestimated
      * Maternal population observer looks good!
      * Age structure looks as expected
    - `Model 6.5 VV notebook available here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_6.5_nn_mortality_and_observer_check.ipynb>`_
  * - 7.0
    - * Check that probiotics are only received by preterm neonates
      * Check that coverage at each facility type is as expected
    - * Probiotics observer not stratified by preterm birth, so we will need to rerun or do coverage V&V in the interactive sim
      * Neonatal intervention observers appear to be counting stillbirths, but should only be counting live births
      * Neonatal mortality looks as expected (same as model 6.5)
    - * `Intervention coverage bug for 7.0 here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_7.0_results_check.ipynb>`_
      * `Neonatal mortality check and missing observer stratification notebook for 7.0 available here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_7.0_nn_mortality_and_observer_check.ipynb>`_
  * - 7.0.1
    - * Check that probiotics are only received by preterm neonates
      * Check that coverage at each facility type is as expected
      * Check that intervention observers are no longer counting stillbirths
      * Check probiotics effect size is as expected among preterm infants
    - All specified V&V criteria looks great! Did notice that CPAP relative risk in artifact is a point value despite having uncertainty specified in documentation.
    - `Notebook for model 7.0.1 neonatal V&V found here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_7.0.1_nn_checks.ipynb>`_
  * - 7.0.2
    - Check that preterm birth mortality is as expected: we should change from a slight overestimation to a slight underestimation. A slight underestimation is expected due to known mortality probabilities greater than 1, which will be addressed in future model runs.
    - The overestimation of preterm birth mortality is of lower magnitude than in 7.0.1, indicating that the update of the preterm prevalence term improved the model. However, preterm birth mortality remains slightly overestimated on average rather than the expected slight underestimation.
    - `Model 7.0.2 neonatal V&V notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_7.0.2_nn_checks.ipynb>`_
  * - 7.1
    - * Neonatal mortality (all cause and cause-specific) is expected to remain slightly underestimated in the baseline scenario (by the same magnitude of model run 6.1). This is expected as we have not yet implemented a strategy to account for known probabilities greater than 1.
      * Recheck LBWSG Effects
      * Check that intervention effect sizes are maintained
    - * Neonatal mortality is in expected range
      * LBWSG risk factor is affecting mortality pipeline values as expected (checked in the interactive sim)
    - * `Neonatal mortality and intervention notebook for model 7.1 <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_7.1_nn_checks.ipynb>`_
      * `Recheck of LBWSG effects for model 7.1 <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_7.1_lbwsg_effects_interactive_simulation.ipynb>`_
  * - 7.1.1
    - * Check that artifact values for the CPAP relative risk have been updated
      * Check that CPAP intervention effect size is as expected
      * Check that preterm birth mortality is as expected
    - All looks good except the artifact values for the CPAP relative risk are not quite as expected due to `issue raised in this comment <https://github.com/ihmeuw/vivarium_gates_mncnh/pull/68#discussion_r2130230902>`_
    - `Model 7.1.1 notebook available here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_7.1.1_nn_checks.ipynb>`_
  * - 8.0
    - * Check baseline and intervention coverage of azithromycin intervention
      * Check that maternal disorders burden (particularly sepsis) still verifies at the population level in the baseline scenario
      * Check that the effect size of the azithromycin intervention verifies
      * Check that CPAP intervention effect size has been appropriately updated
    - * Azithromycin intervention coverage looks good
      * Maternal sepsis incidence and mortality in the baseline scenario still validates
      * Can't fully confirm azithromycin coverage by delivery facility and pregnancy outcome due to insufficient stratifications
      * Azithromycin effect on maternal sepsis looks good
      * It appears that azithromycin is also affecting maternal obstructed labor, which should not be the case
      * CPAP intervention effect size looks good
    - * `Model 8.0 maternal notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_8.0_maternal_checks.ipynb>`_
      * `Model 8.0 neonatal notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_8.0_nn_checks.ipynb>`_
  * - 8.1
    - * Early neonatal mortality is expected to validate to GBD targets (no longer be underestimated!). Note that LNN mortality may not exactly validate because we have not yet updated the LNN LBWSG PAF calculation to use exposure specific to the population at 7 days of life.
      * Check that LBWSG effects are updated and functioning as expected
      * Check that intervention effect sizes are maintained too
    - * All cause mortality in the ENN age group is looking good! Great!
      * All cause mortality in the LBB age group is a little overestimated, but this is expected to be off because we have not updated the PAFs.
      * Cause-specific mortality still looks a little less than ideal
    - * `Model 8.1 neonatal notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_8.1_nn_checks.ipynb>`_
      * `Model 8.1 LBWSG RR checks <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_8.1_lbwsg_effects_interactive_simulation.ipynb>`_
  * - 8.2
    - * Check that neonatal mortality remains as expected
      * Check that probiotics intervention effect is as expected
    - All looks good!
    - `Model 8.2 V&V notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_8.2_nn_checks.ipynb>`_
  * - 8.3
    - * Check that baseline neonatal mortality remains as expected
      * Check antibiotics coverage by scenario is as expected (and no longer varies by delivery facility)
      * Check that NN sepsis mortality between the baseline scenario and scenario #5 (full antibiotics scale-up) reflects the RR for the neonatal outpatient antibiotics intervention for Pakistan and Nigeria. For Ethiopia (which has baseline coverage), check that the intervention effect is reflected in the covered and uncovered populations
    - All looks good, except antibiotics coverage is not being scaled up among those who deliver at home as it should be
    - `Model 8.3 V&V notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_8.3_nn_checks.ipynb>`_
  * - 9.0
    - * Check maternal hemorrhage still verifies in baseline scenario
      * Check that misoprostol coverage is as expected among eligible population in baseline and intervention scenarios
      * Check that only eligible population (attends ANC and delivers at home) receives misoprostol
      * Check effect size of misoprostol on maternal hemorrhage incidence
    - * Intrapartum intervention demonstrated expected behavior in the interactive sim, but unable to verify in simulation outputs
      * Maternal disorders burden still verifies in baseline scenario
      * Misoprostol coverage by scenario looks good
      * Neonatal all cause mortality reverted to underestimate in this model run after being resolved in last model run of 8.3
    - * `Model 9.0 maternal V&V notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_9.0_maternal_checks.ipynb>`_
      * `Model 9.0 interactive sim V&V notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_9.0_interactive_sim_maternal_interventions.ipynb>`_
      * `Model 9.0 neonatal notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_9.0_neonatal_checks.ipynb>`_
  * - 9.1
    - * Confirm neonatal antibiotics intervention coverage is appropriately scaled up in home births
    - * Looks good in the "antibiotics" scenario
      * No need for the "antibiotics_home" scenario, which can be deleted/removed
    - `Model 9.1 neonatal V&V notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_9.1_nn_checks.ipynb>`_
  * - 9.2
    - * Confirm that there is no effect of azithromycin on maternal obstructed labor
      * Confirm maintained effect of azithromycin on maternal sepsis
      * Confirm maternal disorders still validate in baseline scenario
    - Same conclusions as 9.0
    - `Model 9.2 V&V notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_9.2_maternal_checks.ipynb>`_
  * - 9.3
    - Confirm intrapartum interventions are meeting V&V criteria
    - Intrapartum intervention coverage and effects are looking just as expected :) 
    - `Model 9.3 V&V notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_9.3_maternal_checks.ipynb>`_
  * - 10.0
    - * Check PPD incidence ratio in baseline scenario matches expectation
      * Confirm PPD is non-fatal
      * Confirm PPD YLD rate matches expectation
    - All looks great!
    - `Model 10.0 vv notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_10.0_maternal_checks.ipynb>`_
  * - 10.1
    - Check if cause-specific neonatal mortality validates
    - * NN enceph. mortality severely underestimated
      * NN other causes and preterm birth tends to be overestimated
      * NN sepsis mortality tends to be underestimated 
    - `Model 10.1 vv notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_10.1_neonatal_checks.ipynb>`_
  * - 10.2
    - Confirm baseline mortality is as expected, scenario-specific intervention coverage is as expected
    - Looks as expected (including persistent NN mortality underestimation that arose in model 9.0)
    - `Model 10.2 vv notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_10.2_neonatal_checks.ipynb>`_
  * - 11.0
    - * Use the interactive sim to verify the hemoglobin distribution in pregnancy matches expectation
      * Confirm maternal disorders burden still matches expectation
    - All looks good! However, we are not using the draw numbers `pre-specified in this PR <https://github.com/ihmeuw/vivarium_research/pull/1697>`_. The draws that have been run include duplicate hemoglobin exposure values.
    - * `Model 11.0 interactive sim notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_11_interactive_simulation.ipynb>`_
      * `Model 11.0 maternal checks notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_11.0_maternal_checks.ipynb>`_
  * - 11.1
    - * Check neonatal all cause mortality (among early neonatal age group) validates
    - Looks good!
    - `Model 11.1 neonatal checks notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_11.1_neonatal_checks.ipynb>`_ 
  * - 11.2
    - Check that draw numbers have been updated
    - Looks good!
    - `Model 11.2 notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_11.2_maternal_checks.ipynb>`_
  * - 12.0
    - * Confirm neonatal all-cause mortality risks match expectation
      * Confirm LBWSG risk effects are working as expected
    - * Neonatal all cause mortality risks are within "10% target range," but late neonatal all cause mortality varies more than early neonatal
      * LBWSG Risk effects and PAF values yet to be directly verified
    - * `Model 12.0 neonatal notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/model_12.0_neonatal_checks.ipynb>`_
  * - 12.1
    - * Confirm neonatal cause-specific mortality risks match expectation for each preterm subcause
      * Confirm LBWSG risk effects are working as expected
      * Check whether neonatal cause-specific mortality risks match expectation for non-preterm causes
    - 
    - 
  * - 12.1.1
    - * Confirm neonatal all-cause mortality risks match expectation
      * Confirm that neonatal cause-specific mortality matches expectation
      * Confirm LBWSG risk effects are working as expected
      * Confirm that LBWSG PAF values match expectation through independent replication
    - 
    - 
  * - 13.0
    - * Confirm baseline maternal disorders burden still validates
      * Confirm hemoglobin exposure appropriately modifies maternal disorders incidence ratios (using the interactive sim), but no case fatality rates
    - 
    - 
  * - 14.0
    - * Confirm ANC attendance exposure varies as expected by pregnancy term length
      * Confirm ANC attendance exposure matches expectation
      * Confirm AI ultrasound exposure categories is consistent with ANC attendance categories (ex: no ultrasound coverage if no ANC coverage)
    - 
    - 
  * - 15.0
    - Note 1
        For these checks, "verify" means we are comparing the simulation
        output to a value that was input directly (e.g., the LBWSG
        distribution), whereas "validate" means we are expecting the sim
        to indirectly reproduce a value that was not input directly
        (e.g., matching GBD's IFD proportion by using the specified
        causal probabilities for facility choice)

      Note 2
        The calculation of several of the validation targets requires
        running Nathaniel's facility choice nanosim or its
        data-processing code. The necessary validation targets are
        computed in the `facility choice validation targets notebook`_
        and are saved in the `facility choice validation targets .csv
        file`_

      **Checks using observer outputs:**

      * Validate rates of preterm birth given in-facility status against
        optimization targets (calculated in `facility choice validation
        targets notebook`_)
      * Validate rates of in-facility delivery given ANC status against
        optimization targets (calculated in `facility choice validation
        targets notebook`_)
      * Validate rates of in-facility delivery against GBD covariate 51
      * Verify preterm birth rates (overall, not sex-specific) match
        GBD preterm rates calculated from LBWSG data
      * Verify proportions of male and female births match GBD (using
        either the "live births by sex" covariate 1106, or
        get_population with the "Birth" age group 164)
      * Verify rates of ANC1 match GBD covariate 7
      * Verify rates of BEmONC vs. CEmONC match input data on
        :ref:`facility choice model page
        <2024_facility_model_vivarium_mncnh_portfolio>`
      * Verify rates of standard ultrasound given ANC1 status match
        baseline coverage from :ref:`AI Ultrasound module
        <2024_vivarium_mncnh_portfolio_ai_ultrasound_module>`
      * Validate observed probabilities of IFD given believed preterm
        status against observed probabilities in `facility choice
        nanosim`_
      * Validate confusion matrix of preterm status vs. believed preterm
        status against observed probabilities in `facility choice
        nanosim`_
      * Validate P( believed preterm | preterm status, ultrasound type )
        against observed probabilities in `facility choice nanosim`_

      Note 3
        The following checks in the interactive sim are probably only
        necessary if some of the above checks are failing, although it
        might be a good idea to do at least the first two (LBWSG
        distribution and GA error distribution) since these components
        are getting modified for this model run

      **Checks using interactive sim:**

      * Verify sex-specific LBWSG distribution against GBD
      * Verify that the distribution of gestational age estimation
        errors, stratified by ultrasound type, matches the normal
        distributions specified in the :ref:`AI Ultrasound module
        <2024_vivarium_mncnh_portfolio_ai_ultrasound_module>`
      * Verify that correlations between the LBWSG category, ANC, and
        IFD propensities match the :ref:`correlations specified on the
        facility choice model page
        <facility_choice_correlated_propensities_section>` (also saved
        in the `facility choice optimization results .csv file`_)
      * Verify that the sim is using the specified :ref:`causal
        probabilities of IFD given believed preterm status
        <facility_choice_causal_probabilities_section>` (also saved in
        the `facility choice optimization results .csv file`_)
    -
    -
  * - 16.0
    - * Use the interactive sim to confirm RDS and all-cause mortality rates between 33 weeks with ACS coverage and 34 weeks (no ACS coverage due to ineligibility).
      * Confirm neonatal mortality rate of preterm birth with RDS in baseline scenario still validates.
      * Confirm ratio of preterm with RDS mortality among those without ACS divided by those with ACS equals the relative risk parameter specified in the :ref:`ACS intervention page <acs_intervention>`.
      * Confirm that baseline coverage of ACS is equal to that of CPAP as specified in the :ref:`CPAP intervention page <intervention_neonatal_cpap>`.
      * Confirm that the same propensity value is used for ACS and CPAP.
      * Use the interactive sim to confirm there is no coverage of ACS outside of the eligible gestational age range.
    - 
    - 

.. _facility choice code:
  https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/tree/main/facility_choice
.. _facility choice validation targets notebook:
  https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/facility_choice/facility_choice_validation_targets.ipynb
.. _facility choice validation targets .csv file:
  https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/facility_choice/facility_choice_validation_targets.csv
.. _facility choice nanosim:
  `facility choice validation targets notebook`_
.. _facility choice optimization results .csv file:
  https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/facility_choice/facility_choice_optimization_results.csv

.. list-table:: Outstanding model verification and validation issues
  :header-rows: 1

  * - Issue
    - Explanation
    - Action plan
    - Timeline
  * - Issue with LBWSG PAF calculation for the late neonatal age group
    - See the summary in the model 12.1.1 run request
    - Hussain to update and rerun, Ali to do independent replication of PAF calculation verification
    - Model 12.1.1
  * - Neonatal mortality due to preterm birth slightly overestimated and remaining cause-specific mortality is generally underestimated despite this being resolved for all-cause mortality
    - Unknown -- could be something to do with the neonatal mortality math? Removing the risk effect of LBWSG on NN enceph. did not seem to resolve the issue.
    - Research team to discuss and consider 
    - None for now
  * - In model 2: Found an error in GBD 2021 for Pakistan fistula modeling - need to come back in a future V&V run after we update the Pakistan OL prevalence values from GBD 2021 to GBD 2023. 
    - 
    - Revist following GBD 2023 update
    - On hold until GBD 2023 update


.. _mncnh_portfolio_6.0:

6.0 Limitations
+++++++++++++++

* Unclear if we will be able to include upstream factors, but these are likely correlated with many things such as ANC visit rate, care available, or even outcome rates 

* We currently do not consider the potential impact of pregnancy outcome, mode of delivery, or preterm status on postpartum depression incidence (although we do model the impact of hemoglobin on PPD incidence). This may cause us to underestimate the impact of interventions that work through these mechanisms on postpartum depression burden. 

* Factors such as birth asphyxia have been shown to predisopose infants to infection which can result in sepsis [Tikmani-et-al-2016]_. We do not model a relationship between birth asphyxia and sepsis, so we do not capture any indirect effects of interventions to reduce birth asphyxia (like cesarean sections) on sepsis as mediated through reductions in birth asphyxia. 

* By not modeling mortality due to all maternal disorders, we will overestimate YLDs due to postpartum depression and YLDs due to anemia in the postpartum period as more simulants will survive to the postpartum period in our simulation than would be expected in reality.

* We track certain outcomes among partial term pregnancies (abortion/miscarriage and ectopic pregnancy) in this model, including first trimester ANC attendance and associated interventions, anemia YLDs, and postpartum depression. However, these pregnancies are not given special consideration other than their premature end and we do not consider how this population may differ from pregnancies that end in live or still births in terms of their ANC attendance rates or other attributes. Additionally, we do not model any variation in these attributes by subtype of partial term pregnancy (abortion vs. miscarriage vs. ectopic pregnancy), despite there being expected differences in behavior between these groups.

* We do not model an underlying correlation between hemoglobin exposure and stillbirth rates, despite evidence that such an association exists. Therefore, our IV iron intervention model, which is targeted to those with low hemoglobin, will be misaligned with respect to the stillbirth rate among the IV iron intervention target population.
  
  * We could use the GBD risk effects between hemoglobin and stillbirth to model baseline correlation only and not model updates in stillbirth rates in response to changes in hemoglobin exposure to address this limitation (as these effects are captured in the impact of the hemoglobin-affecting interventions IV Iron and IFA/MMS already). However, this model upgrade is not highest priority. `See this backlog JIRA ticket #2343 <https://jira.ihme.washington.edu/browse/SSCI-2343>`_

.. _mncnh_portfolio_7.0:

7.0 References/Other
++++++++++++++++++++

.. [Tikmani-et-al-2016]

  See the "("Darmstadt 2011" reference in: Tikmani SS, Muhammad AA, Shafiq Y, Shah S, Kumar N, Ahmed I, Azam I, Pasha O, Zaidi AK. Ambulatory Treatment of Fast Breathing in Young Infants Aged <60 Days: A Double-Blind, Randomized, Placebo-Controlled Equivalence Trial in Low-Income Settlements of Karachi. Clin Infect Dis. 2017 Jan 15;64(2):184-189. doi: 10.1093/cid/ciw690. Epub 2016 Oct 19. PMID: 27941119; PMCID: PMC5853586.
