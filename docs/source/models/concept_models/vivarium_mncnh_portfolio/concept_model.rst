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

3.0 Concept model and submodels
+++++++++++++++++++++++++++++++

We plan to complete this work in 3 waves. 

* Wave 1 will include in basic model design, outlines of the healthcare system, and some interventions (AI ultrasound, higher level delivery facility interventions, RDS management). 
* Wave 2 will some antenatal supplements(MMS, IV iron), the hemoglobin risk for birthing parents, and all downstream causes affected by hemoglobin. 
* Wave 3 will add in gestational blood pressure and relevant causes and risks including pre-eclampsia care and downstream effects of high blood pressure. 

**Wave 1 Concept Model Map:**

.. image:: wave_1_full.svg

.. _mncnh_portfolio_3.1:

3.1 Model Components
--------------------

Our model will have 3 main "components" that each represent a part of a 
parent and child dyad's journey. In this model, the simulants (note: simulant 
here is a parent child dyad) will each run through 3 decision tree based "time 
steps", where future decisions are based on what the simulant previously experienced. 

For each phase of the model, we will provide inputs needed (state table tracked values), 
outputs that need to be recorded, and the decision tree. Nodes in the decision trees are 
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
    - Several details are still outstanding including: will ANC vary with age, subnational location or upstream factors, will ANC care propensity by correlated with delivery facility propensity
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

**Component 2**: The Intrapartum Model

ADD IN IMAGE 

ADD IN TABLE WITH DETAILS 


**Component 3**: The Neonatal Model

ADD IN IMAGE 

ADD IN TABLE WITH DETAILS 

  
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
