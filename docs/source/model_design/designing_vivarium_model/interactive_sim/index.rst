..
  Section title decorators for this document:
  
  ==============
  Document Title
  ==============
  Section Level 1
  ---------------
  Section Level 2
  +++++++++++++++
  Section Level 3
  ~~~~~~~~~~~~~~~
  Section Level 4
  ^^^^^^^^^^^^^^^
  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

.. _vivarium_interactive_simulation:

====================================
Utilizing the Interactive Simulation
====================================

.. contents::
   :local:
   :depth: 2

Intro to Interactive Simulations
--------------------------------

Interactive simulations are a way to step inside of a simulation instead of 
just receiving final outputs. This can be very helpful for a number of tasks 
including V&V, debugging, and generating primary outputs. These are described 
in detail :ref:`below <interactive_tasks>`. 

The interactive sim allows a user to see all of the data available for any simulant. 
For example, in the main simulation you might record the average BMI in the population 
by age and sex. In the interactive simulation, you can see each simulant's individual 
BMI as well as their propensity score for BMI. 

In addition, you can move the simulation forward in time to watch and record how 
simulants change and experience health events. 

However, since we don't parallelize runs in the interactive sim, we tend to use much 
smaller populations and generally only 1 draw and seed combination to limit run time. 
This makes some tasks more difficult to complete interactively. 

.. _interactive_process:

Setting up an Interactive Sim
-----------------------------

.. todo::

  Add how to: load the interactive sim, change parameters, and take steps 
  Also can include: how to comment out observers or change observers to get more grainularity with faster runs  

  Include: - `Vivarium InteractiveContext documentation <https://vivarium.readthedocs.io/en/latest/api_reference/interface/interactive.html?highlight=InteractiveContext#vivarium.interface.interactive.InteractiveContext>`_


.. _interactive_tasks:

Example Tasks Using the Interactive Sim
---------------------------------------

Below are some common tasks that use the interactive sim. Please note that several of 
these are related to V&V. For more general information and best practices on V&V, see this 
:ref:`vivarium page <vivarium_best_practices_results_processing>` 

.. todo::

  Add example notebooks to table below. For reference this is the old notebook from the prior V&V page: https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/maternal/interactive_simulations/Interactive%20simulation%20demo.ipynb 


.. list-table:: Common Interactive Simulation Tasks 
  :widths: 15 15 15
  :header-rows: 1

  * - Task 
    - Why is this done interactively? 
    - Example Notebook 
  * - V&V for Risks with Many Categories (E.g., LBWSG)
    - Stratifying simulation outcomes by many categories may be too much of a drain on computation time 
    - 
  * - V&V for Continuous Risks
    - Summary measures such as mean exposure or proportions below a threshold can be simulation outputs. Interactive sims can verify risk exposure standard deviation, look at spread, or check for outliers. 
    - 
  * - V&V for Events with Multiple Risk Factors
    - Stratifying event rates by many risk factors might not be computationally feasible; you can verify risk effects by calculating the event rate at the simulant level.
    - 
  * - V&V for Relative Risks based on Continuous Risks 
    - For continuous risks with risk effects, simulant level data is needed to validate risk and outcome rates. 
    - 
  * - Check for Simulant Level Continuity 
    - Can check that simulant values which are not meant to change, remain constant over time (example: propensities)
    - 
  * - Debugging 
    - This is very general, but simulant level data can be helpful in finding potential issues. Some examples include: propensity drift over time or finding problematic outliers. You can also "remove" parts of the sim to see where a problem might be. 
    - 
  * - Primary Output Graphs 
    - Creating visualizations when individual data is needed - such as simulant interactions with healthcare or continuous risk factor spreads over time. 
    - 

.. _interactive_challenges:

Common Challenges
-----------------

.. todo::

  Add information on: environment management, editable installs of packages within environments 
  If you remove observers or change things it can have weird effects - talk with engineering 

