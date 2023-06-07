.. role:: underline
    :class: underline

..
  RST needs unique labels for its reference targets (the things you make with
  ".. my_link_name:").  This document has several pre-defined reference target
  templates you should do a find and replace on when you copy this document.
  They are {YOUR_MODEL_TITLE} which you should replace with a title-case version
  of your model name, {YOUR_MODEL_UNDERSCORE} which you should replace with an
  underscore-separated all lowercase version of your model name, and
  {YOUR_MODEL_SHORT_NAME} which you should replace with an abbreviation of your
  model title.  For instance, if you were doing a model of severe acute malnutrition
  for the Children's Investment Fund Foundation based on GBD 2019, we might have

    YOUR_MODEL_TITLE = Vivarium CIFF Severe Acute Malnutrition
    YOUR_MODEL_UNDERSCORE = 2019_concept_model_vivarium_ciff_sam
    YOUR_MODEL_SHORT_NAME = ciff_sam

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




.. _concept_model_template:

=======================
Concept Model Template
=======================

The following template is intended to make your life easier as you start documenting 
the concept model for a project. Feel free to move around the order of subheadings/content
as needed!

Each of the tables or sub-headings on this page include a brief description and an example
of what information is intended to go where. Make sure to remove those as you begin filling
out the template! 

.. todo::
  Replace the title above with your model title.

.. contents::
  :local:

+------------------------------------+
| List of abbreviations              |
+=======+============================+
|       |                            |
+-------+----------------------------+

.. _{YOUR_MODEL_SHORT_NAME}1.0:

1.0 Project overview
++++++++++++++++++++
Here you can provide an introduction and overview to the project. Information
in this section might include the following: 

* Brief background of topic
* Purpose or aims
* Funder information
* Examples of similar analyses

.. _{YOUR_MODEL_SHORT_NAME}2.0:

2.0 Simulation Design
++++++++++++++++++++++

This section is intended as the main body of documentation of your simulation. Information
in this section might include the following: 

* Concept model diagram 
* Links to relevant components of diagram
* Scenario descriptions
* Default specifications 
* Demographics
* Location description
* Effect size

.. _{YOUR_MODEL_SHORT_NAME}2.1:

2.1 Concept model diagram 
-------------------------

.. _{YOUR_MODEL_SHORT_NAME}2.2:

2.2 Default specifications 
--------------------------

The below table is intended to outline the default specifications of your simulation. 
Included in the table is a column of parameter definitions. Please delete this column as you 
fill out the table. 

.. list-table:: Default simulation specifications
  :header-rows: 1

  * - Parameter
    - Definition
    - Value
    - Note
  * - Location(s)
    - Target/simulated region & GBD ID 
    - e.g. Ethiopia (ID: 179)
    -
  * - Number of draws
    - Desired number of draws that a given simulation is to be run for. (Generally, this should be a number between 0 and 999.)
    - e.g. 50 draws 
    - Read more about draws in Vivarium :ref:`here <vivarium_best_practices_monte_carlo_uncertainty>`.
  * - Population size per draw
    - Desired simulated population size per draw for a given simulation. 
    - e.g. 100,000 simulants
    - Read more about how to determine a reasonable population size for your simulation 
      :ref:`here <vivarium_best_practices_monte_carlo_uncertainty>`.
  * - Age start (initialization)
    - If sim duration > age start for observation, age_start at initialization will be zero and
      fertility will need to be included. Otherwise, age start at initialization will be age start for 
      observation minus simulation duration and a closed cohort (no fertility).
    - e.g. 0 months
    - Currently vivarium can only have new simulants enter the simulation at age zero, although 
      changing this could be a potential framework improvement. 
  * - Age start (observation)
    - Age at which simulants are included in observer.
    - e.g. 6 months
    -
  * - Age end
    - Age at which simulants are no longer included in observer. 
    - e.g. 5 years
    -
  * - Exit age
    - Age at which simulants age out of the simulation. 
    - e.g. 5 years
    -
  * - Simulation start date
    - 
    - e.g. 2021-07-01
    -
  * - Simulation observation start date
    - 
    - e.g. 2022-01-01
    -
  * - Simulation end date
    - 
    - e.g. 2026-12-31
    -
  * - Timestep
    - Amount of time that passes in simulation between each observer.
    - e.g. 4 days
    - Read more about how to determine a reasonable timestep for your simulation 
      :ref:`here <vivarium_best_practices_time_steps>`.

.. _{YOUR_MODEL_SHORT_NAME}2.4:

2.4 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~

Describe the simulated population demographics here. Information in this section might include: 
  - Cohort type
  - Cohort length
  - Age and sex structure
  - Time step
  - Fertility
  - Stratifications 

.. _{YOUR_MODEL_SHORT_NAME}5.2.2:

2.5 Location description
~~~~~~~~~~~~~~~~~~~~~~~~

Describe the location (country and/or region(s)) of the simulation here.

.. _{YOUR_MODEL_SHORT_NAME}3.0:

3.0 Verification & validation (V&V) tracking
--------------------------------------------

This section is intended for tracking the progress of V&V of simulation
results. 

The below tables can be filled out iteratively as new model runs are requested and later V&V'd. 
 
.. list-table:: Model runs
  :header-rows: 1

  * - Run number
    - Run description
    - Scenarios
    - Specification modifications
    - Stratification modifications
  * - e.g. 1.0
    - e.g. Baseline concept model updates
    - e.g. 50 draws; 200,000 pop size
    - e.g. Count data results stratified by random seed for optimization
    - e.g. Remove children under 6 months from observers

.. note::

  Depending on your simulation and preference, the above table could also be converted to a subheading format
  (i.e., in the event the table gets too lengthy!)

.. list-table:: Model verification and validation tracking
   :widths: 3 10 20
   :header-rows: 1

   * - Run number
     - V&V criteria
     - V&V summary
   * - e.g. 1.0 
     - e.g. 
     - e.g. V&V notebooks for model 1.0 can be found here [insert Github link]
   * - 2.0
     - 
     - 
   * - 3.0
     - 
     - 
     
.. list-table:: Outstanding verification and validation issues
   :header-rows: 1

   * - Issue
     - Explanation
     - Action plan
     - Timeline
   * - 
     - 
     - 
     - 


.. _{YOUR_MODEL_SHORT_NAME}4.0:

4.0 Miscellaneous
+++++++++++++++++

This section is intended for any other components to your new project that need to be tracked!
Information in this section may include: 

* Causal framework
* Additional subject background/context
* Back-of-the-envelope calculations
* Model limitations 

.. _{YOUR_MODEL_SHORT_NAME}4.1:

4.1 Causal framework
--------------------
 
 .. note::
    link to DAGs page
    use round circles with DAGs

**Outcome (O)**:



**Most proximal determinant/exposure (E)**:
  


**Confounders (C)**:



**Effect modifiers**:


**Mediators (M)**:

.. _{YOUR_MODEL_SHORT_NAME}4.2:

4.2 Additional background
-------------------------

.. _{YOUR_MODEL_SHORT_NAME}4.3:

4.3 Back-of-the-envelope calculations
-------------------------------------

.. _{YOUR_MODEL_SHORT_NAME}4.4:

4.4 Limitations
---------------