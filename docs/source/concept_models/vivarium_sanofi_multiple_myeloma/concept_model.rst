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

.. _2017_concept_model_vivarium_sanofi_multiple_myeloma:

=======================================================
Vivarium - CSU - Simulating Multiple Myeloma registries
=======================================================

.. contents::
  :local:

+------------------------------------+
| List of abbreviations              |
+=======+============================+
|   MM  | Multiple myeloma           |
+-------+----------------------------+
| RRMM  | Relapsed/ Refractory MM    |
+-------+----------------------------+
|   isa.| Isatuximab                 |
+-------+----------------------------+


.. _1.0:

1.0 Background
++++++++++++++
For this project, we are interested in the expected impact of Isatuximab on the overall Unites States population, among a registry population, and in key-subpopulations listed below, in comparison to a business as usual treatment scenario over 5 years.

Key sub-populations agreed upon include: 

* Black/African American population 

* Population with COPD 

* Population with renal impairment 

In the absence of data on treatment effects for sub-groups we will need to make assumptions with client guidance. A strength of this project is that we will be able to iteratively update such assumptions as we get real world data from registries and re-run the simulation. 

.. _1.1:

1.1 Project overview
--------------------
This project intends to model the impact of a new treatment option for RRMM, Isatuximab, from 2021 to 2026 among the general population, key subpopulations listed above, and a registry population within the United States. The model will make use of the current multiple myeloma treatment guidelines in the United States, which are dependent on cancer stage, age, comorbidities, eligibility for stem cell transplantation, and risk category.  


.. _1.2:

1.2 Literature review
---------------------

There is one randomized controlled trial on Isatuximab treatment that is currently active and is briefly described below.

.. list-table:: RCT Summaries
   :header-rows: 1

   * - Study Name
     - Recent Publication(s)
     - Location
     - Intervention arm
     - Control arm
     - Eligible population
     - Length of follow-up
   * - Multinational Clinical Study Comparing Isatuximab, Pomalidomide, and Dexamethasone to Pomalidomide and Dexamethasone in Refractory or Relapsed and Refractory Multiple Myeloma Patients (ICARIA-MM)
     - (1.) Dimopoulos, M.A., Leleu, X., Moreau, P. et al. 2020; (2.) Attal, Richardson, Rajkumar, San-Miguel, Beksac, Spicka, et al. 2019 
     - 102 sites in 24 countries
     - IPd (isatuximab + pomalidomide + dexamethasone)
     - Pd (pomalidomide + dexamethasone)
     - Adult patients with relapsed and refractory multiple myeloma who had received at least two previous lines of treatment, including lenalidomide and a proteasome inhibitor.
     - 28-day treatment cycle




.. _2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++

The sub-aim for this project is to create a 'power calculation' of how many patients would need to be in a registry population in order to observe a significant effect of a given magnitude, and how many patients per year out of all patients per year would need to be enrolled over X years in order to reach that target.

.. _3.0:

3.0 Causal framework
++++++++++++++++++++

.. _3.1:

3.1 Causal diagram
------------------

 .. note::
    link to DAGs page
    use round circles with DAGs

**Outcome (O)**:



**Most proximal determinant/exposure (E)**:



**Confounders (C)**:



**Effect modifiers**:


**Mediators (M)**:


.. _3.2:

3.2 Effect sizes
----------------



4.0 Intervention
++++++++++++++++



.. _4.1:

4.1 Simulation scenarios
------------------------


.. _5.0:

5.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _5.1:

5.1 Vivarium concept model 
--------------------------

.. note::
  This is our standard vivarium concept model diagram we are used to seeing

.. _5.2:

5.2 Demographics
----------------

.. _5.2.1:

5.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  - cohort type
  - cohort length
  - age and sex structure
  - time step
  - fertility
  - stratifications 


.. _5.2.2:

5.2.2 Location description
~~~~~~~~~~~~~~~~~~~~~~~~~~



.. _5.3:

5.3 Models
----------

.. note::
  here we use the compartmental (SEIR) models with squares


.. _5.3.1:

5.3.1 Model 1
~~~~~~~~~~~~~

.. todo::

  - add verification and validation strategy
  - add python-style pseudo code to summarize model algorithm if necessary

.. _5.3.2:

5.3.2 Model 2
~~~~~~~~~~~~~

.. todo::

  - add verification and validation strategy
  - add python-style pseudo code to summarize model algorithm if necessary

.. _5.3.3:

5.3.3 Model 3
~~~~~~~~~~~~~

.. todo::

  - add verification and validation strategy
  - add python-style pseudo code to summarize model algorithm if necessary

.. _5.3.4:

5.3.4 Model 4
~~~~~~~~~~~~~

.. todo::

  - add verification and validation strategy
  - add python-style pseudo code to summarize model algorithm if necessary


.. _5.4:

5.4 Desired outputs
-------------------

.. _5.5:

5.5 Output meta-table shell
---------------------------

.. todo::
  - add special stratifications if necessary

.. _6.0:

6.0 Back of the envelope calculations
+++++++++++++++++++++++++++++++++++++


.. _7.0:

7.0 Limitations
+++++++++++++++

8.0 References
+++++++++++++++

.. todo::
  - add references as needed