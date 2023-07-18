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

Setting up an interactive sim for the first time can be confusing. To help guide you 
through this, follow these instructions along with the example notebook included. 
Another useful resource is the `Vivarium InteractiveContext documentation <https://vivarium.readthedocs.io/en/latest/api_reference/interface/interactive.html?highlight=InteractiveContext#vivarium.interface.interactive.InteractiveContext>`_. 

**Step 1: General Prep**

  - Ensure that you have cloned the engineer's GitHub repo and have pulled the latest version of the simulation.  
  - Check that you have 'vivarium' installed in your environment and can import 'InteractiveContext' in a Jupyter notebook. 
  - If you need more general help with Git or environments for this part, see these :ref:`computing resources <computing>`.

In Jupyter: 

:: 

  from vivarium import InteractiveContext 


**Step 2: Creating a Simulation** 

Now that you're prepped and able to run a simulation, we can actually load the sim! To 
do this, we will use the 'InteractiveContext' function in Vivarium. 

First, you'll need to locate the model specs file. It will be in the engineering repo usually 
in a file path similar to: :code:`<project_repo_name>/src/<project_repo_name>/model_specifications/`. 
It will be a .yaml file. 

If you can't locate the proper model specs file or are unsure - ask the engineers for help! 

Once you have that, you can follow this code to create a simulation 

::
  path = Path('<file_path_for_model_spec_file>')
  sim = InteractiveContext(Path(path), setup=False)

This creates an object called 'sim' that is the simulation. 

**Step 3: Updating the Simulation Parameters**

Often, you will want to ues slightly different parameters than are the standard in the model 
spec. For example, you might want to change the population size. To do this, you can use 
'configuration.update'. 

Below is an example of changing the population size to be 50,000. You 
can use this to help change anything in the 'configuration' section of the model spec. 

From the model spec file: 

:: 
  configuration: 
    population: 
      population_size: 100_000
      age_start: 5 
      age_end: 125 

To update the population_size variable to be 50,000: 
::
  sim.configuration.update({
                          'population':
                              {'population_size': 50_000,
                              },
                          }
                        )

Instead of using 'configuration.update' you can just directly change the values in the 
model spec file. However, since this file exists in the engineering repo, changing it on 
your local machine can cause errors and confusion. Also, whenever you pull from main, 
your updates would be removed. Therefore, we do NOT recommend this approach. 

**Step 4: Loading Data from the Simulation** 

Now that you have the parameters set-up, you're ready to start getting data from the simulation! 
The first step is to run 'sim.setup'. Running this command will take some time and possibly generate 
some pink warning text. Don't worry! Just wait for the cell to finish running. 

Once it's done, you will have a simulated population. You can use 'get_population' to create a dataset 
with your population. Some simulant data automatically gets recorded for your sim. To find a list of these, 
list the columns in your dataset. Other simulant data does not automatically get added, but can also 
be saved. To find a list of additional sim data available, use 'list_values'. If you find 
something from the list that you want included in your data, just add it using 'get_value'. 

The below will show using all of these in practice: 

:: 
  sim.setup() # Sets up the simulation 
  pop0 = sim.get_population() # Generates a dataset with some simulant data included 
  pop0.columns # Lists the columns in your simulant dataset 
  sim.list_values() # Lists the additional columns you can add to the dataset 
  sim.get_value('<variable_from_list_values>')(pop0.index) #Pulls data for all simulants 

The example notebook at the bottom will include how to utilize these in practice to 
create datasets. 

**Step 5: Taking a Step Forward** 

The above steps only include a base population. You can also run the simulation forward 
by taking time steps. The most popular way to do this is using the 'step' function. This 
function takes a single step forward in the simulation. Most commonly, researchers will 
take a single step and record needed information and then take another step. An example 
of this is in the notebook below. 

There are other methods to run a simulation forward which are shown in the docstring 
above such as 'run_for' and 'run_until'. These are designed to run the simulation forward 
without recording data. These can be useful for burn-in periods. 

:: 
  sim.step() 

**Example notebook**

This :ref:`notebook <https://github.com/ihmeuw/vivarium_research_nih_us_cvd/blob/main/interactive_sim_example_setup.ipynb>`_ includes all of the steps seen above. 

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

