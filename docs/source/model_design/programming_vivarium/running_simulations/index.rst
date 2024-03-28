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

.. _running_simulations_rt:

===================
Running Simulations
===================

.. contents::
   :local:
   :depth: 1

Once you have your model completed, you'll need to actually run a simulation. 
There is documentation on an `engineering page <https://vivarium.readthedocs.io/en/latest/tutorials/running_a_simulation/index.html>`_ and `on the Hub <https://hub.ihme.washington.edu/pages/viewpage.action?spaceKey=SSE&title=Running+a+parallel+simulation>`_ about 
running the simulation, but here 
will make a how-to guide for running simulations for a research team 
audience. The below sections are meant to guide someone through running 
a simulation and the various sub-steps. 

Data Inputs and Model Spec Files
--------------------------------

Prior to running a simulation, check all the input data and 
parameters match the run you want. 

Data Inputs
+++++++++++

The data inputs for the simulation should all be in the artifact. Check 
out our page on :ref:`building the artifact <artifact_building_rt>` if 
you need more information on this. 

The model_spec File
+++++++++++++++++++

The :code:`model_spec.yaml` file contains the majority of the parameters 
for a given model run. This includes things like what 
components to include, the population size, what draw and artifact to use, 
and stratifications for observers. The research team now owns this file. 

Engineering notes can be found on this `model specs file page <https://vivarium.readthedocs.io/en/latest/concepts/model_specification/index.html>`_.

At the top, there is a section titled :code:`components` which lists the 
components in the model. You might see subheadings, which refer to the 
names of specific packages, and within those packages are the components 
themselves. Most of the components will be in the engineering repository, 
however some are often from :code:`vivarium_public_health` as they are used in 
multiple simulations. 

Generally, research will not be responsible for writing or maintaining 
components, though this might change in the future. You'll mainly use this 
section to turn on or off components. 

Below is the :code:`configuration` section, which contains the specifications 
for a single model run, including the draw number, artifact path, population, 
scenario, time period, and any stratifications. This should largely be 
familiar as RT members edit this frequently for interactive sim runs. 

Match this information to the run specified in the vivarium research 
documentation. 

The scenarios File
++++++++++++++++++

The :code:`branches/scenarios.yaml` file contains information for when you 
want to do multiple model runs. When we say multiple model runs - we mean 
running on multiple draws/seeds/scenarios. Therefore we will use this on the 
majority of our simulation runs. 

The information in this file is limited. It contains the number of draws, seeds, 
and scenarios to include in a simulation run. Check that this information 
matches the run specified in the vivarium research documentation. 

Running a Simulation on the Command Line
----------------------------------------

Once you've confirmed that your artifact is correct, and that your 
:code:`model_spec.yaml` and :code:`branches/scenarios.yaml` files 
are up to date, you're ready to run the model! 

Creating an Environment
+++++++++++++++++++++++

First, you will need to create an environment. This will be the same
as creating usual environments, except when you install the project repo,
you'll need to do a special editable install. The command looks like this :code:`pip install -e.[dev]`. Note that this is DIFFERENT than what is required for artifact building. 

Additionally you'll need to install redis with :code:`conda install redis`.
Some other packages can be helpful here as well like :code:`ipython` for
debugging. 

Generally, the project repo and redis are the only things you will need to install,
but check with the engineers if there are updates to other vivarium
packages you should be aware of - like :code:`vivarium_inputs`,
:code:`vivarium_public_health`, or :code:`vivarium_gbd_access`.

Simulate
++++++++

The :code:`simulate` run will run a single simulation based on the 
:code:`model_spec.yaml` file. Since you're only running one simulation, 
it won't look at the :code:`branches/scenarios.yaml` file at all. While 
we mostly will need to use :code:`psimulate`, running a :code:`simulate` 
run can be very helpful in debugging as it is much faster and will reveal 
any bugs in the code. 

Here is an example :code:`simulate` run and an explanation of the flags. 

.. code-block:: bash 
  :linenos:

  $ simulate <PATH_TO_MODEL_SPEC> -vvv --pdb --proj_simscience_prod -o /mnt/team/simulation_science/pub/models/<PROJCET_NAME>/results/<MODEL_NUMBER>/ -i '<PATH_TO_ARTIFACT>' 

Flags: 
  - -vvv is for the verbosity, the vvv is standard on the team
  - --pdb has you reach the python debugger if there are any errors
  - --proj_simscience_prod has you run on the production project on the cluster, which has higher priority than other projects. You might need to be added to access this project! 
  - -o is where to put the output results
  - -i is the location of the artifact

The simulate run should be relatively quick and won't take a tremendous amount 
of data to run or store results. 

Psimulate
+++++++++

The :code:`psimulate` run will run multiple simulations, using information 
from both the :code:`model_spec.yaml` and :code:`branches/scenarios.yaml` files.
One way to think about this is that the :code:`branches/scenarios.yaml` 
file with supersede the :code:`model_spec.yaml`, so anything 
present there - draws count, seed count, or scenarios for example, 
will therefore overwrite the corresponding lines in the :code:`model_spec.yaml`. 

Since the :code:`psimulate` run is quite large, you'll need to start 
by getting a large :code:`srun` going. There is pretty good documentation 
of this `on the Hub <https://hub.ihme.washington.edu/pages/viewpage.action?spaceKey=SSE&title=Running+a+parallel+simulation>`_. 

We have included an example :code:`srun` command here as well though. 

.. code-block:: bash 
  :linenos:

  $ srun --mem=70G -c <NUMBER_OF_THREADS> -A proj_simscience_prod -p all.q --pty bash
 
Flags: 
  - --mem=70G this is standard for running simulation, though check with engineering if you're doing a particularly large run 
  - -c is the number of threads, how to find this is covered on the Hub page above 
  - -A is the project, for simulation runs we can use :code:`proj_simscience_prod`
  - -p is the queue. Here we use all.q but long.q would also work 
  - --pty tells the cluster to use your bash files for settings 

Now that you have your srun going, you can run :code:`psimulate`. 
An example of the command is below 

.. code-block:: bash 
  :linenos:

  $ psimulate run <PATH_TO_MODEL_SPEC> <PATH_TO_SCENARIOS_FILE> -vvv --pdb --proj_simscience_prod -o /mnt/team/simulation_science/pub/models/<PROJCET_NAME>/results/<MODEL_NUMBER>/ -i '<PATH_TO_ARTIFACT>' 

Flags: 
  - run runs that model as defined in the model_spec and scenario files
  - -vvv is for the verbosity, the vvv is standard on the team
  - --pdb has you reach the python debugger if there are any errors
  - --proj_simscience_prod has you run on the production project on the cluster, which has higher priority than other projects. You might need to be added to access this project! 
  - -o is where to put the output results
  - -i is the location of the artifact

In addition to running the model, :code:`psimulate` can also restart a 
run and expand a run. Restarting a run is very helpful if some jobs failed. 
It will automatically check what draw/seed/scenario are missing, and only 
run those jobs. Sometimes jobs fail due to cluster limitations, even if there 
aren't any bugs in the code, so this is helpful to try if only a few things 
failed. 

.. code-block:: bash 
  :linenos:

  $ psimulate restart <PATH_TO_CURRENT_RESULTS> -vvv --pdb --proj_simscience_prod 

Flags: 
  - restart checks what isn't included in the current results and restarts them 
  - -vvv is for the verbosity, the vvv is standard on the team
  - --pdb has you reach the python debugger if there are any errors
  - --proj_simscience_prod has you run on the production project on the cluster, which has higher priority than other projects. You might need to be added to access this project! 

.. todo::

  Add an example psimulate expand call and the flags 


Debugging
---------

When you run models, they will almost certainly fail at some point. 
Knowing how to debug them is an important part of how to run them!

If only a few jobs fail - try restarting the run as it might well 
be a cluster issue. If a larger chunk of your jobs fail, it's time to 
debug. 

First, locate a log file for a job that failed. The logs files will be 
in the same base directory as you saved your results and then in 
:code:`logs/<RUN_NUMBER>/cluster_logs` and you should see a lot of files 
here. If all your jobs failed, just select any of the files. If only a subset failed, 
go to your cluster log directory on a command line and enter 
:code:`grep "Error" *` which should then tell you which logs are failing. 

Once you have a log that failed open, look through and find the error 
message and stack trace. If you can figure out what's causing the issue, 
try to fix it. If the error message is inscrutable, ask for help! 

Also, check the docs `on the Hub <https://hub.ihme.washington.edu/pages/viewpage.action?spaceKey=SSE&title=Running+a+parallel+simulation>`_ 
as these include specific failure messages that indicate types of 
failures, such as memory or node issues. 


