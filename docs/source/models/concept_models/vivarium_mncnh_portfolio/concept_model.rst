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

We plan to complete this work in 3 waves. 

* Wave 1 will include the basic model design, outlines of the healthcare system, and some interventions (AI ultrasound, higher level delivery facility interventions, RDS management). 
* Wave 2 will add in some antenatal supplements (MMS, IV iron), the hemoglobin risk for birthing parents, and all downstream causes affected by hemoglobin. 
* Wave 3 will add in gestational blood pressure and relevant causes and risks including pre-eclampsia care and downstream effects of high blood pressure. 

**Wave 1 Concept Model Map:**

.. image:: wave_1_full.svg

.. _mncnh_portfolio_3.1:

3.1 Model Components
--------------------

Our model will have 3 main "components" that each represent a part of the 
journey of a parent-child dyad. In this model, the simulants (note: simulant 
here is a parent-child dyad) will each run through 3 decision tree based "time 
steps", where future decisions are based on what the simulant previously experienced. 

For each phase of the model, we will provide inputs needed (in the form of  a "state table" of tracked values), 
outputs that need to be recorded for the next state table, and the decision tree that maps from inputs to outputs. Nodes in the decision trees are 
all labeled and additional information will be included below.

3.1.1 Wave 1 Model Components
-----------------------------

**Component 1**: The Pregnancy Model

.. image:: pregnancy_decision_tree_vr.svg

.. list-table:: Pregnancy Decision Tree
  :widths: 3 5 10 10 15
  :header-rows: 1

  * - ID
    - Decision Information 
    - Data Value 
    - Source
    - Notes
  * - 1
    - ANC1 rates
    - get_covariate_estimates(location_id=location_id, gbd_round_id=7, year_id=2021, decomp_step='iterative', covariate_id=7)
    - GBD covariate ID 7
    - This is location specific, but not age specific. Currently assume that there is no correlation of ANC with other factors. Engineers, you can pull these value straight from GBD, but expected values are as follows - Ethiopia: 75.7%, Nigeria: 74.3%, Pakistan: 90.8%
  * - 2
    - Ultrasound rate at ANC in baseline scenario
    - Ethiopia: 60.7%, Nigeria: 58.7%, Pakistan: 66.7%
    - `India ultrasound rate <https://dhsprogram.com/pubs/pdf/FR339/FR339.pdf>`_ (Table 8.12, averaged percentage of women attending ANC 1-3 times and 4+ times), `Ethiopia ultrasound rate <https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8905208/>`_ , `Nigeria ultrasound rate <https://www.researchgate.net/publication/51782476_Awareness_of_information_expectations_and_experiences_among_women_for_obstetric_sonography_in_a_south_east_Nigeria_population>`_  
    - These values are extracted from literature (see links in 'Source' column). For Pakistan, we currently use ultrasound utilization rates derived from the India DHS 2015-2016 as an imperfect proxy that can hopefully be improved with further research. The denominator of these values is: pregnant people who have attended an ANC. 
  * - 3
    - Gestational age (GA) estimate at ANC 
    - Real GA +/- a value from a normal distribution with a mean of zero and standard deviations of: 5 days for AI ultrasound, 20 days for standard ultrasound, and 45.5 days for no ultrasound 
    - Need further clarification on outstanding questions from BMGF, see `PR comments <https://github.com/ihmeuw/vivarium_research/pull/1525>`_. `Standard deviation value for no ultrasound <https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0272718#sec007>`_.
    - Values should be confirmed with further research and data anlaysis


.. list-table:: Inputs to Pregnancy Decision Tree
  :widths: 3 15 15
  :header-rows: 1

  * - Input
    - Data Source 
    - Notes
  * - Age 
    - :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
    - 
  * - ANC Visit Propensity
    - Likely DHS 
    - Need to determine correlation if we want to use it. For now use standard propensity values.
  * - Gestational age at birth
    - :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
    - 
  * - Birthweight
    - :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
    - 
  * - Pregnancy term (full term or partial term)
    - :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
    - 

The following table details outputs from the pregnancy model. Each row in this table should be a column in the population
state table outputted by the model. RT will tabulate the population table with the stratifications needed for V&V (e.g., age group, 
scenario, and input draw). The 'Use case' column in the table denotes what we will be using the output for: either as an input for a later modeling stage
(i.e., intrapartum or neonatal; this value does not explicitly need to be exported in the population table) or exported for V&V (we explicitly
need this value to be exported so we can check it looks right). For this specific model, all of the following outputs in the table are needed for V&V. 

.. list-table:: Outputs from Pregnancy Decision Tree
  :widths: 3 15 15
  :header-rows: 1

  * - Output
    - Data Source
    - Use case 
  * - ANC attendance (true if attended ANC, false if not)
    - Decision tree point
    - Input for later modeling stage & export for V&V
  * - Ultrasound status (AI assisted, standard, none)
    - Decision tree point
    - Input for later modeling stage & export for V&V
  * - Gestational age at birth (weeks)
    - :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
    - Input for later modeling stage & export for V&V
  * - Gestational age estimate (weeks)
    - Decision tree point
    - Input for later modeling stage and & export for V&V 
  * - Birthweight (grams)
    - :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
    - Input for later modeling stage & export for V&V  
  * - Pregnancy term (full term or partial term)
    - :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
    - Input for later modeling stage & export for V&V
  * - GBD age group of pregnant simulant
    - :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
    - Export for V&V 

.. note::

    We should track both the real GA at birth and the believed GA.

Limitations:

* Single cohort of pregnancies does not allow for cyclic effects such as improved ANC visit rates due to ultrasound presence 
* Unclear if we will be able to include upstream factors, but these are likely correlated with many things such as ANC visit rate, care available, or even outcome rates 
* We are not planning to include ANC timing. The timing of ANC visits impacts the ability to accurately estimate gestational age, so we will use an average instead. 
* The current version of the model does not include any false positive rates for pre-term or LBW. Since a false positive is unlikely to cause harm, only inclusion in higher level care, this seems sufficient. 
* We are not planning to include twins or multiple pregnancies, which has limitations as twins are more likely to preterm and have birth complications. 

V&V Checks:

* Confirm ANC visit rate matches expectations 
* Confirm ultrasound rates matches inputs for all scenarios 
* Confirm gestational age estimate and real gestational age have the correct margin of error based on ultrasound type 
* Confirm that rate of identifying low birthweight is correct based on ultrasound type
* Confirm that all pregnant simulants fall within WHO definition of WRA (15-49yrs)


**Component 2**: The Intrapartum Model

.. image:: intrapartum_decision_tree_vr.svg


.. list-table:: Intrapartum Decision Tree
  :widths:  3 5 10 10 15
  :header-rows: 1

  * - ID
    - Decision Information 
    - Data Value 
    - Source
    - Notes
  * - 0
    - Incidence of ectopic pregnancies, abortion or miscarriage
    - incidence_c374 + incidence_c995
    - get_draws(gbd_round_id=7, location_id=location_id, gbd_id_type='cause_id', gbd_id=[995,374], source='como', measure_id=6, metric_id=3, age_group_id=24, sex_id=2, year_id=2021, decomp_step='iterative')
    - These simulants will NOT continue in the model. Use the `total population incidence <Total Population Incidence Rate>`_ rate directly from GBD and do not rescale this parameter to susceptible-population incidence rate using condition prevalence.
  * - 1
    - % of simulants to attend each delivery facility type, based on their propensity
    - At home (68.3%), in hospital (26.6%), in clinic/low-level facility (5.1%) 
    - DHS for each location; placeholder values are from `this Ethiopia paper <https://link.springer.com/article/10.1186/s12884-020-03002-x#Tab2>`_.
    - Denominator in DHS is all births (live and stillbirths) to interviewed women in the 2 years preceding the survey. The above values are placeholders until we do a more in-depth analysis. We would like this to be location specific, please code accordingly. 
  * - 2
    - Need to figure out how we will determine which simulants need a c-section
    -
    - 
    -    
  * - 3
    - % of each facility type have cesarian section capabilities
    - At home (0%), in hospital(94%), in clinic/low-level facility (1%)
    - SARA (Ethiopia; filepath saved `on SharePoint <https://uwnetid.sharepoint.com/:w:/r/sites/ihme_simulation_science_team/_layouts/15/Doc.aspx?sourcedoc=%7B63F98143-C6C3-4CF7-BF62-969344726A87%7D&file=ethiopia_data_received_notes.docx&action=default&mobileredirect=true>`_.) 
    - We want these to be location specific, please code accordingly. These are placeholder values for now (extracted from the SARA Final Report, link in 'Source' column; the 'other' value is made-up), hopefully we will be able to find similar data available for Pakistan and Nigeria.   
  * - 4a
    - Relative risk of c-section on incidence of hemorrhage
    - 2.05 (1.84-2.29)
    - `Pubu et al 2021 <https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7887994/>`_ 
    - This value is a stand-in from this population-based study in Tibet (see 'Source' column), in which the authors reported an odds ratio rather than a relative risk. With further research and analysis we will likely update this value. Outstanding items: how does c-section need overlap with hemorrhage/OL, what is the RR, how will we implement this with overlaps in total MD impact of facility type 
  * - 5
    - % of pregnancy receive azithromycin in each delivery facility type
    - At home (10%), in hospital (67.7%), in clinic/low-level facility (18.5%)
    - SARA (Ethiopia; Table 3.8.2)
    - These are placeholder values (percentage of each facility type that have azithromycin, not the percentage of pregnancies that receive it) and will be updated with further analysis. We want these to be location specific, please code accordingly.  
  * - 6
    - Relative risk of azithromycin on incidence of sepsis and other infections
    - 0.65 (0.55, 0.77)
    - `Tita et al 2023 <https://www.ajog.org/article/S0002-9378(22)02210-4/fulltext#undfig1>`_ 
    - Outstanding items: how will we implement this with overlaps in total MD impact of facility type 
  * - 7
    - % of pre-term or known LBW pregnancies will receive antenatal corticosteroids, split by delivery facility type
    - At home (1%), in  hospital (12%), in clinic/low-level facility (2%)
    - EmONC (Ethiopia; Table 10.5.4A)
    - These are placeholder values and will be updated with further analysis. We want these to be location specific, please code accordingly. The denominator for these values is LBW and preterm births. Outstanding items: believe this only affected neonatal outcomes, confirm with BMGF
  * - 8
    - % of those who receive intrapartum sensors that get identified as needing a c-section
    - 
    - 
    - Outstanding items: which facility types have intrapartum sensors? Is there anything else that an intrapartum sensor should influence (e.g. who receives ACS, can someone be identified as high risk from an intrapartum sensor and be moved to a higher level facility in time for birth)?
    


.. list-table:: Inputs to Intrapartum Decision Tree
  :widths: 3 15 15
  :header-rows: 1

  * - Input
    - Data Source 
    - Notes
  * - Age 
    - GBD and fertility model 
    - Will be the same population generation as used in nutrition optimization pregnancy model 
  * - Upstream factors
    - Likely DHS 
    - Need to decide what if anything we want to include
  * - Delivery facility Propensity
    - Likely DHS 
    - Need to determine correlation if we want to use it 
  * - ANC attendance
    - Decision tree point
    - 
  * - Gestational age at birth
    - GBD LBWSG
    - 
  * - Gestational age stated
    - Decision tree value
    - 
  * - Low birthweight 
    - GBD LBWSG
    - 
  * - If identified as low birthweight
    - Decision tree value
    - 
  * - Pregnancy end
    - GBD
    - Sum of GBD ectopic and abortion and miscarriage rates


Requested outputs for V&V from the intrapartum model are described in the following table.
For these V&V observers we'd like count data, as described. For information on what from the 
intrapartum model will be used as input to the neonatal model, please see the table
:ref:`Inputs to neonatal decision tree <inputs_to_neonatal_decision_tree_table>` in the next section.

.. list-table:: V&V Outputs from Intrapartum Decision Tree 
  :widths: 10 10 10
  :header-rows: 1

  * - Output
    - Data Source
    - Stratifications
  * - Counts of simulants attending each delivery facility type
      (BeMONC, CeMONC, home)
    - Decision tree point
    - None
  * - Counts of simulants receiving each intervention (azithromycin, corticosteroids; 
      c-sections will be added in a later wave)
    - Decision tree point
    - Facility type
  * - Obstructed labor outcomes (deaths, YLLs, YLDs, incident counts)
    - :ref:`Obstructed labor and uterine rupture model <2021_cause_obstructed_labor_mncnh>`
    - Facility type, age
  * - Hemorrhage outcomes (deaths, YLLs, YLDs, incident counts)
    - :ref:`Maternal hemorrhage model <2021_cause_maternal_hemorrhage_mncnh>`
    - Facility type, age
  * - Sepsis outcomes (deaths, YLLs, YLDs, incident counts)
    - :ref:`Maternal sepsis model <2021_cause_maternal_sepsis_mncnh>`
    - Facility type, age, whether given azithromycin or not


Limitations:

* Only have one cohort, will not allow for downstream effects through pregnancies (c-sections likely to get another c-section in the future, losing a child might impact delivery facility, etc.)
* Moving to a higher level care facility during the intrapartum period is common (referred up once labor begins if there is an issue) and the ability to do this is often a result of transport available, distance to clinics, etc. We will not include this and instead have simulants remain at a single facility for the whole intrapartum period. 
* There are many other maternal disorders which we do not plan to individually model. 

V&V Checks:

* Confirm attendance rate for each type of delivery facility matches inputs
* Confirm rates of simulants receiving azithromycin and corticosteroid matches inputs
* Confirm outcomes for each maternal disorder (OL, sepsis, and hemorrhage) matches GBD data 
* Confirm that relative risk of azithromycin on sepsis outcomes matches expectations

.. todo::

  Figure out whether we want any of these count data to be stratified by LBW or preterm status, 
  and what our V&V plan would be for this if so (e.g., interactive sim to compare risk ratios for OL
  of people with LBWSG babies or not?).

**Component 3**: The Neonatal Model

.. image:: neonatal_decision_tree_vr.svg


.. list-table:: Neonatal Decision Tree
  :widths: 3 15 15
  :header-rows: 1

  * - ID
    - Decision Information 
    - Notes
  * - 0
    - Pregnancy outcome (live birth or not) value from :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
    - Only live birth outcomes continue in the model
  * - 1
    - Delivery facility type (home, BEmONC, CEmONC) value from intrapartum model
    - 
  * - 2
    - XX% of each type of facility have antibiotics available
    - 
  * - 3
    - XX relative risk on mortality from sepsis or other neonatal infections
    - It seems like this relative risk will be hard to find in the literature, and we might need to use a sensitivity-analysis approach.
  * - 4
    - XX% of each type of facility have probiotics available
    - Need to determine who recevied probiotics - all newborns, only LBW, only preterm, etc. ; the coverage is probably zero in current practice, and we will model scenarios where it is nonzero.
  * - 5
    - XX relative risk on incidence of sepsis or other neonatal infections
    - Need to confirm this will impact incidence not mortality. Also need to determine how neonatal mortality in general will be modeled and how we will handle overlaps with preterm and LBWSG RR's on all cause mortality
  * - 6
    - XX relative risk on incidence of encephalopathy if birthing parent experiences obstructed labor
    - Need to determine how neonatal mortality in general will be modeled and how we will handle overlaps with preterm and LBWSG RR's on all cause mortality
  * - 7
    - Percentage of each facility type that have CPAP capabilities: CMONC - 39.3% and BMONC - 7.5% 
    - These values are from the 2016 EmONC Final Report and are therefore only reflective of Ethiopian health system a decade ago. Please use these as a placeholder for now while we 
      try to find reliable values for Nigeria and Pakistan. 
  * - 8
    - 0.64 (95% CI 0.50-0.82) relative risk on RDS mortality of facility having CPAP 
    - Note that we might want RR for NICU, but this value is for CPAP. 
      Source: `2020 Cochrane review <https://pmc.ncbi.nlm.nih.gov/articles/PMC8094155/>`_
  * - 9
    - 0.69 (95% CI 0.59-0.81) relative risk for RDS mortality based on birthing parent receiving antenatal corticosteroids
    - This value is for RDS mortality, however there is also an RR on RDS incidence (0.66, 95% CI 0.56-0.77). Study recipients
      of RDS intervention included "women, with a singleton or multiple pregnancy, expected to deliver preterm as a result of either 
      spontaneous preterm labour, preterm prelabour rupture of the membranes or planned preterm delivery."
      Source: `2017 Cochrane review <https://pubmed.ncbi.nlm.nih.gov/28321847/>`_
  * - 10
    - Percentage of preterm deaths caused by RDS: Ethiopia - 45.3%; Nigeria - 52.4%; Pakistan - 35.6% 
    - Ethiopia source: `Major causes of death in preterm infants in selected hospitals in Ethiopia <https://www.sciencedirect.com/science/article/pii/S2214109X19302207>`_
      Nigeria source: `Current Trends in Neonatal Morbidity and Mortality - Experiences from a Tertiary Center in Lagos, Nigeria <https://pmc.ncbi.nlm.nih.gov/articles/PMC9490664/>`_
      Pakistan source: `Birth asphyxia is under-rated as a cause of preterm neonatal mortality in low- and middle-income countries <https://obgyn.onlinelibrary.wiley.com/doi/10.1111/1471-0528.17220>`_

      
.. _inputs_to_neonatal_decision_tree_table:

.. list-table:: Inputs to Neonatal Decision Tree
  :widths: 3 15 15
  :header-rows: 1

  * - Input
    - Data Source 
    - Notes
  * - Birth delivery facility
    - From intrapartum model
    - 
  * - Type of birth
    - From intrapartum model
    - E.g., live, still 
  * - Gestational age at birth
    - From intrapartum model
    - 
  * - Birthweight
    - From intrapartum model
    - 
  * - If birth parent experienced obstructive labor
    - From intrapartum model
    - 
  * - If birth parent received antenatal corticosteroids
    - From intrapartum model
    - 
  * - If birth parent received azithromycin
    - From intrapartum model
    - 

.. list-table:: Outputs from Neonatal Decision Tree
  :widths: 3 15 15
  :header-rows: 1

  * - Input
    - Data Source 
    - Notes
  * - Interventions available (antibiotics, probiotics, RDS treatment)
    - Decision tree values
    - 
  * - Interventions received (antibiotics, probiotics, RDS treatment)
    - Decision tree values
    - 
  * - Count of neonatal deaths by cause
    - Neonatal disorder models
    - 
  * - Burden of Neonatal deaths by cause
    - Neonatal disorder model
    - YLLs
  * - Gestational age at birth
    - From intrapartum model
    - 
  * - Birthweight
    - From intrapartum model
    - 

Limitations:

* In GBD, LBWSG impacts all-cause mortality, which overlaps with the other neonatal causes. The method for handling this is complex, since preterm birth is a PAF-of-one cause, that we want to split into preterm with and without RDS, and other causes must have a RR with LBWSG to make the all-cause RR calibrate.

* In this phase of model building, we are not including lung surfactant or kangaroo care which are closely tied to the CPAP/NICU intervention. We might add these to the model in a later phase. 


V&V Checks:

* Confirm ACMR in sim matches ACMR in artifact
* Confirm LBWSG exposure match
* Confirm LBWSG RR on ACMR matches
* Confirm CSMR matches for preterm, sepsis, encephalopathy
* Confirm that RDS incidence and mortality match expectations
* Confirm that interventions have expected efficacy and coverage rates


  
.. _mncnh_portfolio_3.2:

3.2 Submodels
-------------

1. :ref:`Pregnancy Model <other_models_pregnancy_closed_cohort_mncnh>`

  a. :ref:`Maternal Hemorrhage <2021_cause_maternal_hemorrhage_mncnh>`
  b. :ref:`Maternal Sepsis <2021_cause_maternal_sepsis_mncnh>`
  c. :ref:`Obstructed Labor <2021_cause_obstructed_labor_mncnh>`
  d. Maternal hypertensive disorders

2. :ref:`Neonatal Mortality Model <2021_cause_neonatal_disorders_mncnh>`

  a. :ref:`Neonatal Sepsis and Other Infections Model <2021_cause_neonatal_sepsis_mncnh>`
  b. :ref:`Neonatal Encephalopathy Model <2021_cause_neonatal_encephalopathy_mncnh>`
  c. :ref:`Preterm Birth <2021_cause_preterm_birth_mncnh>`

    i. with Respiratory Distress Syndrome (RDS)
    ii. without RDS 

3. Low Birthweight/Short Gestation Risk Exposure
4. Low Birthweight/Short Gestation Risk Effect on Neonatal Moratlity Model
5. Hemoglobin Risk Exposure
6. Hemoglobin Risk Effect on Maternal Hemorrhage

.. todo::

  * Add in components that Abie missed
  
.. _mncnh_portfolio_4.0:

4.0 Data Inputs
+++++++++++++++

.. todo::

  Fill in this section as we continue to work


.. _mncnh_portfolio_5.0:

5.0 Model run requests
++++++++++++++++++++++

.. list-table:: Model run plan as of October 4, 2024
  :header-rows: 1

  * - Number
    - Run
    - Status
    - Priority
    - Number of draws
    - Population size per draw
    - Note
  * - 1
    - Wave I Pregnancy V&V
    - Incomplete
    - N/A
    - 10
    - 100,000
    - Locations include Pakistan, Nigeria, and Ethiopia. 10 seeds * 10,000 simulants = 100,000 total population.

.. note:: 
  
  The above numbers are based on calculations from the `Nutrition Optimization project <https://vivarium-research.readthedocs.io/en/latest/models/concept_models/vivarium_nutrition_optimization/kids/concept_model.html#production-run-specifications>`_)
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
      - Confirm pregnancy population is within expected WRA age group (15-49 years) 
    - All checks passed except last one; RT is updating our observer output requests to add an observer for pregnant person age.
    - `Notebook linked here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/pregnancy_model.ipynb>`_ 


.. _mncnh_portfolio_6.0:

6.0 Limitations
+++++++++++++++

.. todo::

  Fill in this section as we continue to work


.. _mncnh_portfolio_7.0:

7.0 References/Other
++++++++++++++++++++

.. todo::

  Fill in this section as we continue to work
