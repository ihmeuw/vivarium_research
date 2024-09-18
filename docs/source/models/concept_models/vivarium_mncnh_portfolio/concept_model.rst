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
* Wave 2 will add in some antenatal supplements(MMS, IV iron), the hemoglobin risk for birthing parents, and all downstream causes affected by hemoglobin. 
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
    - Ethiopia: 60.7%, Nigeria: 58.7%, Pakistan: 61.4%
    - `India ultrasound rate <https://dhsprogram.com/pubs/pdf/FR339/FR339.pdf>`_, `Ethiopia ultrasound rate <https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8905208/>`_ , `Nigeria ultrasound rate <https://www.researchgate.net/publication/51782476_Awareness_of_information_expectations_and_experiences_among_women_for_obstetric_sonography_in_a_south_east_Nigeria_population>`_  
    - These values are extracted from literature (see links in 'Source' column). For Pakistan, we currently use ultrasound utilization rates derived from the India DHS 2015-2016 as an imperfect proxy that can hopefully be improved with further research.
  * - 3
    - Stated gestational age (GA) at ANC 
    - Real GA +/- a value from a normal distribution with a mean of zero and standard deviations of: 5 days for AI ultrasound, 20 days for standard ultrasound, and 45.5 days for no ultrasound 
    - Need further clarification on outstanding questions from BMGF, see `PR comments <https://github.com/ihmeuw/vivarium_research/pull/1525>`_. `Standard deviation value for no ultrasound <https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0272718#sec007>`_.
    - Values should be confirmed with further research and data anlaysis
  * - 4
    - Successful identification of LBW
    - 80% for AI ultrasound, 61% with standard ultrasound, 10% with no ultrasound 
    - Need to get AI ultrasound value from BMGF, `61% from this study <https://link.springer.com/article/10.1186/s12884-023-05866-1>`_, 10% is made-up stand-in value, needs to be replaced
    - We will not be including false positives at this time. 


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
  * - Low birthweight status
    - :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
    - 
  * - Pregnancy term (full term or partial term)
    - :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
    - 


.. list-table:: Outputs from Pregnancy Decision Tree
  :widths: 3 15 15
  :header-rows: 1

  * - Input
    - Data Source 
    - Notes
  * - ANC attendance
    - Decision tree point
    - 
  * - Ultrasound status (AI assisted, standard, none)
    - Decision tree point
    - 
  * - Gestational age at birth
    - :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
    - 
  * - Gestational age stated
    - Decision tree value
    - We should track both the real GA at birth and the believed GA 
  * - Birthweight
    - :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
    - 
  * - Low birthweight status
    - :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
    - 
  * - If identified as low birthweight
    - Decision tree value
    - We should track both the real LBW status and the believed one
  * - Pregnancy term (full term or partial term)
    - :ref:`Pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`
    - 


Limitations:

* Single cohort of pregnancies does not allow for cyclic effects such as improved ANC visit rates due to ultrasound presence 
* Unclear if we will be able to include upstream factors, but these are likely correlated with many things such as ANC visit rate, care available, or even outcome rates 
* We are not planning to include ANC timing. The timing of ANC visits impacts the ability to accurately estimate gestational age, so we will use an average instead. 
* The current version of the model does not include any false positive rates for pre-term or LBW. Since a false positive is unlikely to cause harm, only inclusion in higher level care, this seems sufficient. 
* We are not planning to include twins or multiple pregnancies, which has limitations as twins are more likely to preterm and have birth complications. 

V&V Checks:

* Confirm ANC visit rate matches expectations 
* Confirm ultrasound rates matches inputs for all scenarios 
* Confirm stated gestational age and real gestational age have the correct margin of error based on ultrasound type 
* Confirm that rate of identifying low birthweight is correct based on ultrasound type


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
    - get_draws(gbd_round_id=7, location_id=location_id, gbd_id_type='cause_id', gbd_id=[995,374], source='como', measure_id=6, metric_id=3, age_group_id=24, sex_id=2, year_id=2021, decomp_step='iterative')
    - incidence_c374 + incidence_c995
    - These simulants will NOT continue in the model. Use the `total population incidence <Total Population Incidence Rate>`_ rate directly from GBD and do not rescale this parameter to susceptible-population incidence rate using condition prevalence. 
  * - 1
    - % of simulants to attend each delivery facility type, based on their propensity
    - At home (68.3%), in public/governmental health facility (26.6%), in private for-profit health facility (2.5%), in private not-for-profit health facility (0.8%), and other (1.8%) 
    - DHS for each location; placeholder values are from `this Ethiopia paper <https://link.springer.com/article/10.1186/s12884-020-03002-x#Tab2>`_.
    - Denominator in DHS is all births (live and stillbirths) to interviewed women in the 2 years preceding the survey. The above values are placeholders until we do a more in-depth analysis. We would like this to be location specific, please code accordingly. 
  * - 2
    - Need to figure out how we will determine which simulants need a c-section
    -
    - 
    -    
  * - 3
    - % of each facility type have cesarian section capabilities
    - Public/governmental health facility (62%), private for-profit health facility (60%), at home  (0%), private not-for-profit health facility (86%), other (10%)  
    - EmONC (Ethiopia; saved at J:\Project\simulation_science\optimization_model_data\EmONC 2016_Master Dataset_Final\ETH_EmONC Assessment 2016_Final Report Jan11 2018.pdf) 
    - We want these to be location specific, please code accordingly. These are placeholder values for now (extracted from the EmONC Final Report, link in 'Source' column; the 'other' value is made-up), hopefully we will be able to find similar data available for Pakistan and Nigeria.   
  * - 4a
    - Relative risk of c-section on incidence of hemorrhage
    - 2.05 (1.84-2.29)
    - https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7887994/
    - This value is a stand-in from this population-based study in Tibet (see 'Source' column), in which the authors reported an odds ratio rather than a relative risk. With further research and analysis we will likely update this value. Outstanding items: how does c-section need overlap with hemorrhage/OL, what is the RR, how will we implement this with overlaps in total MD impact of facility type
  * - 4b
    - Relative risk of c-section on incidence of obstructed labor 
    - 
    - 
    - Outstanding items: how does c-section need overlap with hemorrhage/OL, what is the RR, how will we implement this with overlaps in total MD impact of facility type  
  * - 5
    - % of pregnancy receive azithromycin in each delivery facility type
    - At home (10%), in public/governmental health facility (41%), in private for-profit health facility (10%), private not-for-profit health facility (10%), other (10%)  
    - SARA (Ethiopia; Table 3.8.2)
    - These are placeholder values and will be updated with further analysis. We want these to be location specific, please code accordingly.  
  * - 6
    - Relative risk of azithromycin on incidence of sepsis and other infections
    - 0.65 (0.55, 0.77)
    - https://www.ajog.org/article/S0002-9378(22)02210-4/fulltext#undfig1 
    - Outstanding items: how will we implement this with overlaps in total MD impact of facility type 
  * - 7
    - % of pre-term or known LBW pregnancies will receive antenatal corticosteroids, split by delivery facility type
    - At home (10%), in public/governmental health facility (2%), in private for-profit health facility (22%), and private not-for-profit health facility (4%), other (10%)  
    - EmONC (Ethiopia; Table 10.5.4A)
    - Outstanding items: is this for preterm, LBW, or both/combination; believe this only affected neonatal outcomes, confirm with BMGF
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


.. list-table:: Outputs from Intrapartum Decision Tree
  :widths: 3 15 15
  :header-rows: 1

  * - Input
    - Data Source 
    - Notes
  * - Delivery facility type
    - Decision tree point
    - 
  * - Interventions received (c-section, azithromycin, corticosteroids)
    - Decision tree values
    - 
  * - Count of maternal disorders
    - Simulant experiences in model
    - 
  * - Maternal outcomes
    - Simulant experiences in model
    - To be defined, YLLs, YLDs, deaths, etc. 
  * - Type of birth
    - Simulant experiences in model
    - E.g., live, still 
  * - Gestational age at birth
    - GBD LBWSG
    - 
  * - Birthweight
    - GBD LBWSG
    - 
  * - If identified as low birthweight
    - Decision tree value
    - From pregnancy model
  * - Pregnancy end
    - GBD
    - Sum of GBD ectopic and abortion and miscarriage rates


Limitations:

* Only have one cohort, will not allow for downstream effects through pregnancies (c-sections likely to get another c-section in the future, losing a child might impact delivery facility, etc.)
* Moving to a higher level care facility during the intrapartum period is common (referred up once labor begins if there is an issue) and the ability to do this is often a result of transport available, distance to clinics, etc. We will not include this and instead have simulants remain at a single facility for the whole intrapartum period. 
* There are many other maternal disorders which we do not plan to individually model. 


**Component 3**: The Neonatal Model

.. image:: neonatal_decision_tree_vr.svg


.. list-table:: Neonatal Decision Tree
  :widths: 3 15 15
  :header-rows: 1

  * - ID
    - Decision Information 
    - Notes
  * - 0
    - XX% of simulants are stillborn
    - These simulants will NOT continue in the model
  * - 1
    - Input value from intrapartum model
    - 
  * - 2
    - XX% of each type of facility have antibiotics available
    - 
  * - 3
    - XX relative risk on mortality from sepsis or other neonatal infections
    - Need to confirm this will impact mortality not incidence. Also need to determine how neonatal mortality in general will be modeled and how we will handle overlaps with preterm and LBWSG RR's on all cause mortality
  * - 4
    - XX% of each type of facility have probiotics available
    - Need to determine who recevied probiotics - all newborns, only LBW, only preterm, etc. 
  * - 5
    - XX relative risk on incidence of sepsis or other neonatal infections
    - Need to confirm this will impact incidence not mortality. Also need to determine how neonatal mortality in general will be modeled and how we will handle overlaps with preterm and LBWSG RR's on all cause mortality
  * - 6
    - XX relative risk on incidence of encephalopathy if birthing parent experiences obstructed labor
    - Need to determine how neonatal mortality in general will be modeled and how we will handle overlaps with preterm and LBWSG RR's on all cause mortality
  * - 7
    - XX% of each type of facility have CPAP or NICU capabilities
    - 
  * - 8
    - XX relative risk for RDS mortality 
    - Need to confirm this will impact mortality not incidence. Also need to determine how neonatal mortality in general will be modeled and how we will handle overlaps with preterm and LBWSG RR's on all cause mortality
  * - 9
    - XX relative risk for RDS incidence based on birthing parent receiving antenatal corticosteroids
    - Need to confirm this will impact incidence not mortality. Also need to determine how neonatal mortality in general will be modeled and how we will handle overlaps with preterm and LBWSG RR's on all cause mortality


.. list-table:: Inputs to Neonatal Decision Tree
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
  * - If identified as low birthweight
    - Decision tree value
    - From pregnancy model
  * - If birth parent experienced obstructive labor
    - From intrapartum model
    - 
  * - If birth parent received antenatal corticosteroids
    - From intrapartum model
    - 


.. list-table:: Outputs from Neonatal Decision Tree
  :widths: 3 15 15
  :header-rows: 1

  * - Input
    - Data Source 
    - Notes
  * - Interventions received (antibiotics, probiotics, RDS treatment)
    - Decision tree values
    - 
  * - Count of neonatal disorders
    - Simulant experiences in model
    - 
  * - Neonatal outcomes
    - Simulant experiences in model
    - To be defined, YLLs, YLDs, deaths, etc.
  * - Type of birth
    - Simulant experiences in model
    - E.g., live, still 
  * - Gestational age at birth
    - GBD LBWSG
    - 
  * - Birthweight
    - GBD LBWSG
    - 

Limitations:

* Need to further determine how neonatal mortality will be managed. In GBD, LBWSG impacts all cause mortality, which overlaps with the other neonatal causes. The method for handling this is yet to be fully determined and therefore this limitation will be updated later. 
* At current, we are not including lung surfactant or kangaroo care which are closely tied to the CPAP/NICU intervention. We ight add these to the model later, but they are not present at this time. 

  
.. _mncnh_portfolio_3.2:

3.2 Submodels
-------------

.. todo::

  Add in tables with all risk exposures, risk effects, causes, interventions, etc. 


.. _mncnh_portfolio_4.0:

4.0 Data Inputs
+++++++++++++++

.. todo::

  Fill in this section as we continue to work


.. _mncnh_portfolio_5.0:

5.0 Model run requests
++++++++++++++++++++++

.. todo::

  Fill in this section as we continue to work


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
