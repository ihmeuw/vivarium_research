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
  :widths: 3 15 15
  :header-rows: 1

  * - ID
    - Decision Information 
    - Notes
  * - 1
    - XX% of simulants will receive ANC care, based on their propensity 
    - Several details are still outstanding including: will ANC vary with age, subnational location or upstream factors, will ANC care propensity be correlated with delivery facility propensity
  * - 2
    - XX% of simulants will receive AI-assisted ultrasound, XX% will receive standard ultrasound, XX% will receive no ultrasound 
    - Need to determine if this is random or correlated with other outcomes. Need to find baseline and scenario values.
  * - 3
    - All patients are assigned a stated gestational age (GA). Their stated GA will be their real GA +/- an error margin randomly assigned within an interval. For AI assisted ultrasound, the interval is +/- XX weeks, for standard ultrasound XX weeks, for no ultrasound XX weeks. 
    - Check if distribution for error is random or more likely to be an over/underestimate. 
  * - 4
    - XX% of those who received AI-assisted ultrasound will be identified as SGA, XX% with standard ultrasound and XX% with no ultrasound. 
    - 


.. list-table:: Inputs to Pregnancy Decision Tree
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
  * - ANC Visit Propensity
    - Likely DHS 
    - Need to determine correlation if we want to use it 
  * - Gestational age at birth
    - GBD LBWSG
    - 
  * - Small for gestational age at birth 
    - GBD LBWSG
    - Need to find definition for SGA and determine percent, need to define overlap with gestational age if relevant


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
  * - Gestational age stated
    - Decision tree value
    - We should track both the real GA at birth and the believed GA 
  * - If identified as small for gestational age
    - Decision tree value
    - We should track both the real SGA status and the believed one


Limitations:

* Single cohort of pregnancies does not allow for cyclic effects such as improved ANC visit rates due to ultrasound presence 
* Unclear if we will be able to include upstream factors, but these are likely correlated with many things such as ANC visit rate, care available, or even outcome rates 
* We are not planning to include ANC timing. The timing of ANC visits impacts the ability to accurately estimate gestational age, so we will use an average instead. 
* The current version of the model does not include any false positive rates for pre-term of SGA. Since a false positive is unlikely to cause harm, only inclusion in higher level care, this seems sufficient. 

**Component 2**: The Intrapartum Model

.. image:: intrapartum_decision_tree_vr.svg


.. list-table:: Intrapartum Decision Tree
  :widths: 3 15 15
  :header-rows: 1

  * - ID
    - Decision Information 
    - Notes
  * - 1
    - XX% of simulants to attend each delivery facility type, based on their propensity 
    - Several details are still outstanding including: types of delivery facilities modeled, will facility propensity vary with age, subnational location or upstream factors, will ANC care propensity be correlated with delivery facility propensity
  * - 2
    - Type of delivery facility has an overall, documented impact on maternal disorders and outcomes 
    - Need to determine how we will include this (RR on all outcomes or subset, how will it overlap with other pathways, incidence vs mortality, etc.)
  * - 3
    - Need to figure out how we will determine which simulants need a c-section
    - 
  * - 4
    - XX% of each facility type have cesarian section capabilities
    -  
  * - 5
    - XX relative risk on incidence of hemorrhage and obstructed labor 
    - Outstanding items: how does c-section need overlap with hemorrhage/OL, what is the RR, how will we implement this with overlaps in total MD impact of facility type 
  * - 6
    - XX% of pregnancy receive in each delivery facility type
    - Confirm understanding that all pregnancies can/should receive this
  * - 7
    - XX relative risk of incidence of sepsis and other infections
    - Outstanding items: what is the RR, how will we implement this with overlaps in total MD impact of facility type 
  * - 8
    - XX% of pre-term or known SGA pregnancies will receive, split by delivery facility type
    - Outstanding items: data by delivery facility, is this for preterm, SGA, or both/combination; believe this only affected neonatal outcomes, confirm with BMGF


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
  * - Small for gestational age at birth 
    - GBD LBWSG
    - 
  * - If identified as small for gestational age
    - Decision tree value
    - 


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
  * - If identified as small for gestational age
    - Decision tree value
    - From pregnancy model


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
    - Need to determine who recevied probiotics - all newborns, only SGA, only preterm, etc. 
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
  * - If identified as small for gestational age
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
