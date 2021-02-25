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
| MM    | Multiple myeloma           |
+-------+----------------------------+
| RRMM  | Relapsed/ Refractory MM    |
+-------+----------------------------+
| isa.  | Isatuximab                 |
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

The obejective of this project is to provide Sanofi with a simulation design and implementation solution for a MM clinical registry, we will simulate outcomes rates among different populations to aid in registry design. For a population level of scope, we will assess the impact of Isatuximab in the populaiton of intertes at the completion of simulation. Estimating the incidence, prevalence, and survival of MM to be overall in the US, and in key sub-populationss listed above, under a business-as-usual treatment scenario and an Isatuximab treatment sceanrio over 5 years. The outcomes will be stratified by age, sex, and relavant demographic. 
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

  - Location: United States
  - Cohort type: Prospective open cohort of 15 years and older
  - Size of largest starting population: 100,000 simulants
  - Time span: Jan 1, 2021 to Dec 31, 2025
  - Time step: X days (e.g. 28 days) to capture time interval of clinical MM to RRMM and duration of treatment


.. _5.2.2:

5.2.2 Sub-populations of interest
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 - Black/African American population 
 - Population with chronic obstructive pulmonary disease (COPD) 
 - Population with renal impairment (CKD)
 - *Registry population (e.g. 1,000 simulants)* 


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

5.3.4 Treatment model
~~~~~~~~~~~~~~~~~~~~~

Population for inclusion in the RCT on Isatuximab (ICARIA-MM):
 - Adult patients with relapsed and refractory multiple myeloma who had received 
   at least two previous lines of treatment, including lenalidomide and a 
   proteasome inhibitor.
Eligible to treatment criteria based on patients registry protocol sent by Sanofi:
  - 18 years and older
  - With relapsed/refractory multiple myeloma (RRMM according to IMWG definition)
  - First time using Isa (never received Isa for treatment of disease other than RRMM)
  - Haven’t diagnosed or treated for malignant cancer in recent 3 years
To simulate a MM clinical registry, we might include simulants who are 1) 18+; 
2) with RRMM and no personal history of other cancer; 3) had previous lines of 
treatment but new to Isatuximab treatment.


.. _5.4:

5.4 Desired outputs
-------------------

.. _5.5:

5.5 Output meta-table shell
---------------------------

.. list-table:: Output shell table
   :header-rows: 1

   * - Location
     - Year
     - Age group
     - Sex
     - Poulation group
     - Scenario
     - Outcome
   * - United States
     - 2021
     - 15 to 19
     - Female
     - General population
     - Baseline (standard treatment)
     - Incidence of multiple myeloma
   * - 
     - 2022
     - 20 to 24
     - Male
     - Black/African American population
     - Alternative (Isatuximab treatment)
     - Prevalence of multiple myeloma
   * - 
     - 2023
     - 25 to 29
     - 
     - Population with COPD
     - 
     - Survival rate of multiple myeloma
   * - 
     - 2024
     - ...
     - 
     - Population with CKD
     - 
     - Deaths due to multiple myeloma (internal only)
   * - 
     - 2025
     - 95 plus
     - 
     - 
     - 
     - YLDs and YLLs due to multiple myeloma (internal only)


.. _6.0:

6.0 Back of the envelope calculations
+++++++++++++++++++++++++++++++++++++


.. _7.0:

7.0 Limitations
+++++++++++++++

8.0 References
+++++++++++++++

.. [Dimopoulos-et-al-2020]
   Dimopoulos MA, Leleu X, Moreau P, et al. Isatuximab plus pomalidomide and 
   dexamethasone in relapsed/refractory multiple myeloma patients with renal 
   impairment: ICARIA-MM subgroup analysis. Leukemia 2021; 35: 562–72.

.. [Attal-et-al-2019]
   Attal M, Richardson PG, Rajkumar SV, et al. Isatuximab plus pomalidomide and 
   low-dose dexamethasone versus pomalidomide and low-dose dexamethasone in patients 
   with relapsed and refractory multiple myeloma (ICARIA-MM): a randomised, 
   multicentre, open-label, phase 3 study. Lancet 2019; 394: 2096–107.