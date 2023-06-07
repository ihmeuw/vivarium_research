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
Here you can provide an introduction and overview to the project. Information to include
in this section might include the following: 

* Brief background of topic
* Purpose or aims
* Funder information
* Examples of similar analyses

.. _{YOUR_MODEL_SHORT_NAME}2.0:

2.0 Simulation Design
++++++++++++++++++++++

.. _{YOUR_MODEL_SHORT_NAME}2.1:

2.1 Default specifications 
--------------------------

The below table is intended for outlining the default specifications of your simulation. 
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


.. _{YOUR_MODEL_SHORT_NAME}3.0:

3.0 Causal framework
++++++++++++++++++++

.. _{YOUR_MODEL_SHORT_NAME}3.1:

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


.. _{YOUR_MODEL_SHORT_NAME}3.2:

3.2 Effect sizes
----------------



4.0 Intervention
++++++++++++++++



.. _{YOUR_MODEL_SHORT_NAME}4.1:

4.1 Simulation scenarios
------------------------


.. _{YOUR_MODEL_SHORT_NAME}5.0:

5.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _{YOUR_MODEL_SHORT_NAME}5.1:

5.1 Vivarium concept model 
--------------------------

.. note::
  This is our standard vivarium concept model diagram we are used to seeing

.. _{YOUR_MODEL_SHORT_NAME}5.2:

5.2 Demographics
----------------

.. _{YOUR_MODEL_SHORT_NAME}5.2.1:

5.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  - cohort type
  - cohort length
  - age and sex structure
  - time step
  - fertility
  - stratifications 


.. _{YOUR_MODEL_SHORT_NAME}5.2.2:

5.2.2 Location description
~~~~~~~~~~~~~~~~~~~~~~~~~~



.. _{YOUR_MODEL_SHORT_NAME}5.3:

5.3 Models
----------

.. note::
  here we use the compartmental (SEIR) models with squares
  
.. list-table:: Model runs
  :header-rows: 1

  * - Run
    - Description
    - Scenarios
    - Specification modifications
    - Stratificaction modifications
    - Note
  * - 
    - 
    - 
    - 
    - 
    - 


.. _{YOUR_MODEL_SHORT_NAME}5.3.1:

5.3.1 Model 1
~~~~~~~~~~~~~

.. todo::

  - add verification and validation strategy
  - add python-style pseudo code to summarize model algorithm if necessary

.. list-table:: Model verification and validation tracking
   :widths: 3 10 20
   :header-rows: 1

   * - Model
     - Description
     - V&V summary
   * - 1.0 
     - 
     - V&V notebooks for model 1.0 can be found here [insert Github link here]
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


.. _{YOUR_MODEL_SHORT_NAME}5.4:

5.4 Desired outputs
-------------------

.. list-table:: Requested Count Data Outputs and Stratifications
  :header-rows: 1

  * - Output
    - Include strata
    - Exclude strata
  * - Deaths and YLLs (cause-specific)
    - 
    - 
  * - YLDs (cause-specific)
    - 
    - 
  * - Cause state person time
    - 
    - 
  * - Cause state transition counts
    - 
    - 
  * - Mortality hazard first moment
    - 
    - 

.. _{YOUR_MODEL_SHORT_NAME}5.5:

5.5 Output meta-table shell
---------------------------

.. todo::
  - add special stratifications if necessary

.. _{YOUR_MODEL_SHORT_NAME}6.0:

6.0 Back of the envelope calculations
+++++++++++++++++++++++++++++++++++++


.. _{YOUR_MODEL_SHORT_NAME}7.0:

7.0 Limitations
+++++++++++++++

