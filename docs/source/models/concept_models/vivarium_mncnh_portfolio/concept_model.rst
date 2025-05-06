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
  :depth: 1

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

.. list-table:: Pregnancy Component Modules
  :header-rows: 1

  * - Module
    - Inputs
    - Outputs
    - Nested subcomponents
  * - :ref:`Initial attributes <2024_vivarium_mncnh_portfolio_initial_attributes_module>`
    - 
    - * ANC propensity
      * LBWSG propensity
      * Delivery facility propensity
    - * :ref:`Facility choice propensity correlation <2024_facility_model_vivarium_mncnh_portfolio>`
  * - :ref:`Pregnancy <2024_vivarium_mncnh_portfolio_pregnancy_module>`
    - * LBWSG propensity
    - * Maternal age
      * Pregnancy term duration
      * Birth outcome
      * Child sex
      * Gestational age
      * Birthweight
      * Pregnancy duration
    - * :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
      * :ref:`LBWSG exposure <2019_risk_exposure_lbwsg>`
  * - :ref:`Antenatal care <2024_vivarium_mncnh_portfolio_anc_module>`
    - * ANC propensity
    - * ANC attendance
    - 
  * - :ref:`AI ultrasound <2024_vivarium_mncnh_portfolio_ai_ultrasound_module>`
    - * ANC attendance
      * Gestational age
    - * Ultrasound coverage
      * Believed gestational age
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
        * LBWSG propensity
        * Delivery facility propensity
      - * :ref:`Facility choice propensity correlation <2024_facility_model_vivarium_mncnh_portfolio>`
      - 
    * - :ref:`Pregnancy I <2024_vivarium_mncnh_portfolio_pregnancy_module>`
      - 
      - * Maternal age
        * Pregnancy term duration
        * Child sex
      - * :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
      - No changes to pregnancy module in wave I other than defining specified outputs at different points in ordering of modules
    * - :ref:`Antenatal care <2024_vivarium_mncnh_portfolio_anc_module>`
      - * ANC propensity
      - * ANC attendance
      - 
      - No change from wave I
    * - :ref:`Antenatal care detail <2024_vivarium_mncnh_portfolio_anc_detail_module>`
      - * ANC attendance
        * Pregnancy term duration
      - * First trimester ANC attendance
        * Later pregnancy ANC attendance
      - 
      - New module in wave II
    * - :ref:`Hemoglobin <2024_vivarium_mncnh_portfolio_hemoglobin_module>`
      - * First trimester ANC attendance
        * Later pregnancy ANC attendance
        * IFA/MMS coverage
        * IV iron coverage
      - * Hemoglobin at birth
        * Anemia outcomes (see output table)
      - * :ref:`Hemoglobin risk exposure <2023_hemoglobin_exposure>`
        * :ref:`Anemia impairment <2019_anemia_impairment>`
        * :ref:`Oral iron supplementation intervention (IFA/MMS) <maternal_supplementation_intervention>`
        * :ref:`IV iron intervention <intervention_iv_iron_antenatal>`
      - New wave II module
    * - :ref:`Pregnancy I <2024_vivarium_mncnh_portfolio_pregnancy_module>`
      - * LBWSG propensity
        * IFA/MMS coverage (affects birth outcome, gestational age, birthweight)
        * IV iron coverage (affects birth outcome, gestational age, birthweight)
      - * Birth outcome
        * Gestational age
        * Birthweight
        * Pregnancy duration
      - * :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
        * :ref:`LBWSG exposure <2019_risk_exposure_lbwsg>`
      - No changes to pregnancy module in wave I other than defining specified outputs at different points in ordering of modules other than impacts of IFA/MMS and IV Iron interventions on pregnancy module outputs
    * - :ref:`AI ultrasound <2024_vivarium_mncnh_portfolio_ai_ultrasound_module>`
      - * ANC attendance
        * Gestational age
      - * Ultrasound coverage
        * Believed gestational age
      - 
      - No changes from wave I

.. note::

  Only full term pregnancies (live or stillbirths, NOT abortions/miscarriages/ectopic pregnancies) will proceed to the intrapartum component. Therefore, pregnancy term length is a de facto input to all modules in the intrapartum component.

.. list-table:: Intrapartum Component Modules
  :header-rows: 1

  * - Module
    - Inputs
    - Outputs
    - Nested subcomponents
  * - :ref:`Facility choice <2024_vivarium_mncnh_portfolio_facility_choice_module>`
    - * (Pregnancy term duration)
      * Delivery facility propensity
      * Believed gestational age
    - * Birth facility
    - * :ref:`Facility choice model <2024_facility_model_vivarium_mncnh_portfolio>`
  * - :ref:`Intrapartum interventions <2024_vivarium_mncnh_portfolio_intrapartum_interventions_module>`
    - * (Pregnancy term duration)
      * Birth facility
      * Believed gestational age
    - * Intrapartum azithromycin coverage
      * Antenatal corticosteroid coverage
      * Misoprostol coverage
    - TODO: create/link intervention model documents
  * - :ref:`Maternal disorders <2024_vivarium_mncnh_portfolio_maternal_disorders_module>`
    - * (Pregnancy term duration)
      * Intrapartum azithromycin coverage
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
      - * (Pregnancy term duration)
        * Delivery facility propensity
        * Believed gestational age
      - * Birth facility
      - * :ref:`Facility choice model <2024_facility_model_vivarium_mncnh_portfolio>`
      - 
    * - :ref:`Intrapartum interventions <2024_vivarium_mncnh_portfolio_intrapartum_interventions_module>`
      - * (Pregnancy term duration)
        * Birth facility
        * Believed gestational age
      - * Intrapartum azithromycin coverage
        * Antenatal corticosteroid coverage
        * Misoprostol coverage
      - TODO: create/link intervention model documents
      - 
    * - :ref:`Maternal disorders <2024_vivarium_mncnh_portfolio_maternal_disorders_module>`
      - * (Pregnancy term duration)
        * Intrapartum azithromycin coverage
        * Hemoglobin at birth
      - * Maternal disorders outcomes (see outcome table)
      - * :ref:`Overall maternal disorders <2021_cause_maternal_disorders_mncnh>`
        * :ref:`Maternal hemorrhage <2021_cause_maternal_hemorrhage_mncnh>`
        * :ref:`Maternal sepsis <2021_cause_maternal_sepsis_mncnh>`
        * :ref:`Maternal obstructed labor and uterine rupture <2021_cause_obstructed_labor_mncnh>`
      - Wave II changes: 

        * Hemoglobin at birth as a variable that impacts maternal disorders
        * Anemia sequelae excluded from maternal hemorrhage YLDs (see `vivarium research PR#1633 <https://github.com/ihmeuw/vivarium_research/pull/1633>`_)
    * - :ref:`Postpartum hemoglobin <2024_vivarium_mncnh_portfolio_postpartum_hemoglobin>`
      - * Hemoglobin at birth
        * Maternal hemorrhage incidence
      - * Postpartum anemia outcomes (see output table)
      - * :ref:`Hemoglobin risk exposure <2023_hemoglobin_exposure>`
        * :ref:`Anemia impairment <2019_anemia_impairment>`
        * :ref:`Maternal hemorrhage risk effects <2019_risk_effect_maternal_hemorrhage>` 
      - New module in wave II


.. note::

  Only live births proceed to the neonatal component. Therefore, birth outcome is a de facto input to all modules in the neonatal component.

.. list-table:: Neonatal Component Module
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
      * Antenatal corticosteroids
      * :ref:`LBWSG risk effects <2019_risk_effect_lbwsg>`


**Wave 1 Concept Model Map:**

.. image:: wave_1_full.svg

.. _mncnh_portfolio_3.1:

3.1 Scenario information
--------------------------

.. todo::

  Define hemoglobin-related baseline coverage

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
    - XXX
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
  * - 6. Antibiotics CEMONC-only scale-up
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 7. Antibiotics BEMONC-only scale-up
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
  * - 6. Antibiotics CEMONC-only scale-up
    - Baseline
    - Baseline
    - Baseline
    - 
  * - 7. Antibiotics BEMONC-only scale-up
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
    - 100% availability at BEMONC and CEMONC facilities
    - Baseline
    - 
  * - 6. Antibiotics CEMONC-only scale-up
    - Baseline
    - 100% at CEMONC, baseline at BEMONC
    - Baseline
    - 
  * - 7. Antibiotics BEMONC-only scale-up
    - Baseline
    - Baseline at CEMONC, 100% at BEMONC
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

.. _mncnh_portfolio_4.0:

4.0 Outputs/Observers
++++++++++++++++++++++

Specific observer outputs and their stratifications may vary by model run as needs change. Modifications to default will be noted in the model run requests tables. Note that the observers and outputs listed here are different from the module outputs above. The outputs of the module are intended to be intermediate values that may or may not be included as observed simulated outputs.

.. list-table:: Simulation observers
  :header-rows: 1

  * - Outcome
    - Default stratifications
  * - ANC attendance counts
    - 
  * - Ultrasound coverage counts (AI-assisted, standard, none)
    - 
  * - Birth counts
    - Delivery facility type, pregnancy outcome, child sex, scenario, and input draw
  * - Pregnancy term counts (full or partial)
    - 
  * - Maternal GBD age group counts
    - 
  * - Delivery facility type counts (BeMONC, CeMONC, home)
    - 
  * - Azithromycin coverage counts
    - 
  * - Corticosteroid coverage counts
    - 
  * - Misoprostol coverage counts
    - 
  * - Maternal obstructed labor outcomes (deaths, YLLs, YLDs, incident cases)
    - 
  * - Maternal hemorrhage outcomes (deaths, YLLs, YLDs, incident cases)
    - 
  * - Maternal sepsis outcomes (deaths, YLLs, YLDs, incident cases)
    - 
  * - Count of neonatal deaths and YLLs by cause
    - 
  * - Neonatal antibioitics availability/coverage counts
    - 
  * - Neonatal probiotics availability/coverage counts
    - 
  * - CPAP availability/coverage counts
    - 

.. todo::

  Figure out whether we want any of these count data to be stratified by LBW or preterm status, 
  and what our V&V plan would be for this if so (e.g., interactive sim to compare risk ratios for OL
  of people with LBWSG babies or not?).

.. note::

  Additional outputs to add for wave II include:

  * Anemia status at birth counts (none/mild/moderate/severe)
  * YLDs due to anemia in pregnancy
  * Postpartum anemia status counts (non/mild/moderate/severe)
  * YLDs due to anemia in the postpartum period
  * First trimster ANC attendance (stratified by pregnancy term duration)
  * Later pregnancy ANC attendance (stratified by pregnancy term duration)

.. _mncnh_portfolio_5.0:

5.0 Model run requests
++++++++++++++++++++++

.. list-table:: Model run plan as of October 4, 2024
  :widths: 3 3 3 3 3 3 3 5 15
  :header-rows: 1

  * - Number
    - Run
    - Status
    - Number of draws
    - Population size per draw
    - Scenarios
    - File path 
    - Note
  * - 1
    - Wave I Pregnancy V&V
    - Complete
    - 10
    - 100,000
    - Baseline only
    - ``mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/pregnancy``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.
  * - 2
    - Wave I Maternal disorders V&V
    - Complete
    - 10
    - 100,000
    - Baseline only
    - ``mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/maternal_disorders``
    - Found an error in GBD 2021 for Pakistan fistula modeling - need to come back in a future V&V run after we update 
      the Pakistan OL prevalence values from GBD 2021 to GBD 2023. Locations include Pakistan, Nigeria, and Ethiopia. 
      10 seeds * 10,000 simulants = 100,000 total population.
  * - 3
    - Wave I Neonatal disorders V&V
    - Complete
    - 10
    - 100,000
    - Locations include Pakistan, Nigeria, and Ethiopia. 
      10 seeds * 10,000 simulants = 100,000 total population.
    - Baseline only
    - ``mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/neonatal_disorders``
  * - 3.1
    - Wave I Neonatal disorders V&V with correct LBWSG distribution
    - Complete
    - 10
    - 100,000
    - Baseline only
    - ``mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/neonatal_disorders``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.
  * - 3.2
    - Wave I Neonatal disorders V&V with LBWSG component removed
    - Complete
    - N/A
    - 10
    - 100,000
    - Baseline only
    - ``mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/no_lbwsg``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.
  * - 3.3
    - Wave I Neonatal disorders V&V with early NN observer bugfix
    - Complete
    - N/A
    - 10
    - 100,000
    - Baseline only
    - ``mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/risk_effects``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.
  * - 4.1
    - Wave I CPAP 
    - Complete
    - 10
    - 100,000
    - Baseline only
    - ``mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/cpap``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.
  * - 4.2
    - Wave I CPAP with observer for counts per facility type
    - Complete
    - 10
    - 100,000
    - Baseline only
    - ``mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/cpap_2``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.
  * - 4.3
    - Wave I CPAP with addition of a delivery facility column in births observer and CPAP availability stratification
      in neonatal burden observer
    - Complete
    - 10
    - 100,000
    - Baseline only
    - ``mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/cpap_3``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.
  * - 4.4
    - Wave I CPAP with updated determination of delivery facility type
    - Complete
    - 10
    - 100,000
    - Baseline only
    - ``mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/cpap_4``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.
  * - 4.5
    - Wave I CPAP with bugfix for negative other causes mortality rates
    - Complete
    - 10
    - 100,000
    - Baseline only
    - ``mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/cpap_5``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.
  * - 4.6
    - Wave I CPAP with scale-up scenarios 
    - Complete
    - 10
    - 100,000
    - Baseline and alternative scenarios 2, 3, and 4
    - ``mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/cpap_full_scenarios``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.
  * - 4.7
    - Correct pregnancy duration for partial term pregnancies
    - Complete
    - 10
    - 100,000
    - Baseline and alternative scenarios 2, 3, and 4
    - ``mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/birth_exposure_2``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.
  * - 5.0
    - Wave I neonatal antibiotics with scale-up scenarios 
    - Complete
    - 10
    - 100,000
    - Baseline and alternative scenarios 2 - 7 
    - ``mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/antibiotics``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.
  * - 5.1
    - Wave I neonatal antibiotics with scale-up scenarios; engineer refactor 
    - Complete
    - 10
    - 100,000
    - Baseline and alternative scenarios 2 - 7 
    - ``mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/children_mapped``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.
  * - 6.0
    - Wave I neonatal probiotics with scale-up scenarios 
    - Complete
    - 10
    - 100,000
    - Baseline and alternative scenarios 2 - 10 
    - ``mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/probiotics``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.
  * - 6.0.1
    - Wave I neonatal disorders ACMR with 200k population without interventions
    - Complete
    - 10
    - 100,000
    - Baseline 
    - ``/mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/no_interventions/``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.
  * - 6.0.2
    - Wave I neonatal disorders ACMR with 2 million population
    - Complete
    - 10
    - 100,000
    - Baseline
    - ``/mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/acmr-2mil/``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.
  * - 6.0.3
    - Wave I neonatal disorders ACMR with rate to probability conversion
    - Complete
    - 10
    - 100,000
    - Baseline 
    - ``/mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/rate_conversion/``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.
  * - 6.0.4
    - Wave I neonatal disorders ACMR with raw CMSR
    - Complete
    - 10
    - 100,000
    - Baseline
    - ``/mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/raw_csmr/``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.
  * - 6.1
    - Rerun LBWSG PAF calculation for Ethiopia
    - Incomplete
    - N/A
    - N/A -- will do verification in the interactive sim to start
    - N/A -- will do verification in the interactive sim to start
    - N/A -- will do verification in the interactive sim to start
    - Rerun LBWSG PAF calculation for Ethiopia using a population size of 389_992 (approximately twice the prior value while still following the relevant requirements) and save to a new artifact to be used in interactive sim V&V.
  * - 7.0
    - Wave I azithromycin 
    - Incomplete
    - 10
    - 100,000
    - Baseline
    - ``mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/7_0``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.
  * - 8.0
    - Wave I misoprostol
    - Incomplete
    - 10
    - 100,000
    - Baseline 
    - ``mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/8_0``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.
  * - 9.0
    - Wave I antenatal corticosteroids
    - Incomplete
    - 10
    - 100,000
    - Baseline
    - ``mnt/team/simulation_science/pub/models/vivarium_gates_mncnh/results/9_0``
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.

.. note:: 
  
  The above numbers are based on calculations from the `Nutrition Optimization project <https://vivarium-research.readthedocs.io/en/latest/models/concept_models/vivarium_nutrition_optimization/kids/concept_model.html#production-run-specifications>`_
  that found the appropriate seed and draw count for production runs, then divided in half for V&V runs. 

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
    - 
      - `ACMR notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_04_10a_vnv_neonatal_acmr-w_probiotics.ipynb>`__
      - `Notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/2025_04_10b_vnv_and_scenario_results_probiotics.ipynb>`__
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

.. note:: 

  Some of the notebook URLs for the older runs might be out-of-date. If you click one of these links and it gives
  you a 404 error, add to your URL `/old_vnv_notebooks/` after `verification_and_validation`, and that should take you
  to the right place!

.. list-table:: Outstanding model verification and validation issues
  :header-rows: 1

  * - Issue
    - Explanation
    - Action plan
    - Timeline
  * - 
    - 
    -  
    -  


.. _mncnh_portfolio_6.0:

6.0 Limitations
+++++++++++++++

* Unclear if we will be able to include upstream factors, but these are likely correlated with many things such as ANC visit rate, care available, or even outcome rates 

.. _mncnh_portfolio_7.0:

7.0 References/Other
++++++++++++++++++++

.. todo::

  Fill in this section as we continue to work
