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

.. todo::

  Replace the above ".. _concept_model_template:" with ".. _{YOUR_MODEL_NAME}:""

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

2.2 Scenario descriptions
-------------------------

In this section, include descriptions of the different scenarios in your model, and what the
differences are between each scenario (e.g., intervention coverage scale-up). You could do this
in table or subheading form, depending on what works best for you and your model!

For an example of what you might put in this section, see the table below, taken from the :ref:`Vivarium
wasting paper simulation <2020_concept_model_vivarium_ciff_sam>`.  

.. list-table:: Intervention coverage and efficacy parameters
  :header-rows: 1

  * - Intervention
    - Baseline
    - Target
    - Zero coverage (*)
  * - 1: SAM treatment
    - Baseline values for :math:`C_{SAM}` and :math:`E_{SAM}`, :ref:`defined here <wasting-treatment-baseline-parameters>`
    - :math:`C_{SAM} = 0.7`

      :math:`E_{SAM} = 0.75`
    - :math:`C_{SAM} = 0`
      
      :math:`E_{SAM} = \text{baseline value}`
  * - 2: MAM treatment
    - Baseline values for :math:`C_{MAM}` and :math:`E_{MAM}`, :ref:`defined here <wasting-treatment-baseline-parameters>`
    - :math:`C_{MAM} = 0.7`
      
      :math:`E_{MAM} = 0.75`
    - :math:`C_{MAM} = 0`
      
      :math:`E_{MAM} = \text{baseline value}`
  * - 3: SQ-LNS (all sub-interventions)
    - :math:`C_{SQLNS} = 0`
    - :math:`C_{SQLNS} = 0.7` (*)
    - :math:`C_{SQLNS} = 0`

.. _{YOUR_MODEL_SHORT_NAME}2.3:

2.3 Default specifications 
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
    - Desired number of draws that a given simulation is to be run for. (Generally, this should be a number between 1 and 1,000.)
    - e.g. 50 draws 
    - Read more about draws in Vivarium :ref:`here <vivarium_best_practices_monte_carlo_uncertainty>`.
  * - Population size per draw
    - Desired simulated population size per draw for a given simulation. 
    - e.g. 100,000 simulants
    - Read more about how to determine a reasonable population size for your simulation 
      :ref:`here <vivarium_best_practices_monte_carlo_uncertainty>`. Note that engineers will
      decide how many random seeds to use to achieve the specified population size per draw.
  * - Age start (initialization)
    - Minimum age that simulants are initialized at when the simulation begins.
    - e.g. 0 months
    - Simulants might be initialized into the simulaiton before they are included in observers.
      See to-do note below. 
  * - Age start (observation)
    - Age at which simulants begin to be included in observers.
    - e.g. 6 months
    - See to-do note below.
  * - Age end
    - Age at which simulants are no longer included in observers. 
    - e.g. 5 years
    -
  * - Exit age
    - Age at which simulants age out of the simulation. 
    - e.g. 5 years
    -
  * - Simulation start date
    - Date at which simulation begins.
    - e.g. 2020-01-01
    - Sometimes, the simulation needs to be initialized with a burn-in period to ensure the simulation
      is in a steady state by the time observation begins. See to-do note below. 
  * - Simulation observation start date
    - Date at which observation begins.
    - e.g. 2022-01-01
    - As noted above, in some cases there is a delay between the simulation start date and the observation
      start date. See to-do note below. 
  * - Simulation end date
    - 
    - e.g. 2026-12-31
    -
  * - Timestep
    - Amount of time that passes in simulation between each "step," which is when events and observations can happen.
    - e.g. 4 days
    - Read more about how to determine a reasonable timestep for your simulation 
      :ref:`here <vivarium_best_practices_time_steps>`.
  * - Randomness key columns
    - Parameters used to identify identical simulants across scenarios
    - e.g. ['entrance_time', 'maternal_id', 'sex']
    - Entrance time is currently required as a randomness key column 


.. todo::

  For 'Age start (initialization)' and 'Age start (observation)', add links to documentation pages that explain age start
  and start date in more detail once they have been written. 


.. _{YOUR_MODEL_SHORT_NAME}2.3.1:

2.3.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Describe the simulated population demographics here. Information in this section might include: 
  - Cohort type
  - Cohort length
  - Age and sex structure
  - Time step
  - Fertility
  - Stratifications 

.. _{YOUR_MODEL_SHORT_NAME}2.3.2:

2.3.2 Location description
~~~~~~~~~~~~~~~~~~~~~~~~~~

Describe the location (country and/or region(s)) of the simulation here.


.. _{YOUR_MODEL_SHORT_NAME}2.4:

2.4 Links to model components 
--------------------------------------

Please add here links to the different components of your model, including:
  - Intervention model(s)
  - Cause model(s)
  - Risk exposure model(s)
  - Risk-attributable cause model(s)
  - Risk effects model(s)
  - Risk correlation model(s)
  - Other 

.. _{YOUR_MODEL_SHORT_NAME}2.5:

2.5 Simulation Observers
-------------------------

Specific observer outputs and their stratifications may vary by model run as needs change. Modifications to default will be noted in the model run requests tables. Note that the observers and outputs listed here are different from the module outputs above. The outputs of the module are intended to be intermediate values that may or may not be included as observed simulated outputs.

Default stratifications for all observers should include:

  - Input draw
  - Scenario

.. todo:: 

  Update default stratifications for all observers accordingly

.. list-table:: Simulation observers
  :header-rows: 1

  * - Number 
    - Observer
    - Default stratifications
    - Note
  * - 1
    - Person time
    - age group, sex
    - 
  * - 2
    - Death counts
    - cause of death, age group, sex
    - 

.. todo::

  Update simulation observer table to fit the needs of your simulation

.. _{YOUR_MODEL_SHORT_NAME}3.0:

3.0 Verification & validation (V&V) tracking
++++++++++++++++++++++++++++++++++++++++++++

This section is intended for tracking the progress of V&V of simulation
results. 

The below tables can be filled out iteratively as new model runs are requested and later V&V'd. 

.. note::

  **Best Practices for V&V Tracking:**

  Below is a summary of each of the tables in the V&V tracking section and best practices for using them. Generally, every single model run should be included in these tables for a complete record of model versions. This can be very helpful if prior model runs need to be revisited to identify when a particular bug may have arisen.

  .. list-table:: V&V Tracking Table Metadata
    :header-rows: 1

    * - Table
      - Purpose
      - Best practice notes
    * - Model runs
      - To log the specifications for each run of the model that is performed
      - * Details of a particular model run should be posted in a PR *before* the run is launched. This information is meant to communicate desired details of a model run to the engineers (if engineering is running them) or to align on a plan among researchers (if research is running them)
        * The modification columns should be filled in with "Default" if default behavior is desired rather than leaving them blank (this indicates that they were not erroneously left blank)
    * - V&V tracking
      - To detail the V&V criteria and findings for each model run
      - * V&V criteria for a given model run should be posted *before* the run is launched (and ideally at the same time as the model run is added to the model runs table). This helps the writer and reviewer evaluate whether the requested model specifications (e.g. observer and scenario requests) are appropriate for the aims of the model run
        * A summary of V&V conclusions should be listed after completing V&V for the given model run and each finding should link to a notebook that demonstrates that finding
    * - Outstanding V&V issues
      - To keep a log of current V&V criteria that are not met so that they are not lost and to communicate the status/plan for addressing each issue to the larger team
      - Each V&V issue (no matter how small!) should be added to this table when it is identified and can be deleted (or moved to a separate "resolved V&V issue" table if desired) when resolved

  **Best practices in model naming/organization:**

  * Consistency in model versioning names across the concept model, engineering development, artifacts, and V&V notebooks is very helpful. Best practice is to define a model version name in the model runs table (ex: 2.1) and use that model version name across all other instances where that model version is referenced (including the directory where the model results are written, the notebook name where V&V is conducted, etc.).

  * Model version integer increases (1.0 to 2.0, for example) are generally used for major updates to the model (ex: including risks as well as causes or adding an intervention)

  * Model version decimal point increases (1.0 to 1.1, for example) are generally used for bugfixes in implementation

  * Model version second decimal point increases (1.1 to 1.1.1, for example) are generally used for trivial changes (like a quick equation fix, or rerunning with a new observer)

  * It is best practice for model versions to generally follow sequential numerical ordering

 
.. list-table:: Model runs
  :header-rows: 1

  * - Run number
    - Run description
    - Scenarios
    - Specification modifications
    - Stratification modifications
    - Observer modifications
  * - e.g. 1.0
    - e.g. Baseline concept model updates
    - e.g. Baseline only 
    - e.g. Default
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
     - e.g. Confirm that there is no variation in person-time quantity between different observers of same measure.
     - e.g. V&V notebooks for model 1.0 can be found here [insert Github link]. V&V criteria satisfied. 


.. list-table:: Outstanding verification and validation issues
   :header-rows: 1

   * - Issue
     - Explanation
     - Action plan
     - Timeline
   * - e.g. Simulants aged 0-6 months not present at initialization, resulting in missing age cohort over time.
     - e.g. Discrepancy between age start and entrance age.
     - e.g. Set age start value to 0 (instead of 6 months)
     - e.g. For next model run 


.. _{YOUR_MODEL_SHORT_NAME}4.0:

4.0 Miscellaneous
+++++++++++++++++

This section is intended for any other components to your new project that need to be tracked, but aren't necessarily
things that the engineering team needs to know in order to implement the proposed design. Anything that needs to be 
specifically highlighted for engineering should go in 'Simulation Design' above. 

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