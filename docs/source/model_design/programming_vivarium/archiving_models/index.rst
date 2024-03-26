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

.. _archiving_models_rt:

================
Archiving Models
================

.. contents::
   :local:
   :depth: 1

The archival process is documented quite well by engineering on this `archiving a simulation Hub page <https://hub.ihme.washington.edu/pages/viewpage.action?spaceKey=SSE&title=Archiving+a+Simulation+Model+Repository>`_. Therefore, 
this page will not go into as much depth to avoid duplicating information.

Archiving a project is the process of storing information and data 
in order to make it publically available. Zenodo is an open repository 
we use to accomplish this. Basically, archiving a repository is 
adding data to the repo, checking to make sure the information is 
intelligible and correct for non-simulation science individuals, and 
creating a referenceable version of the GitHub repo on Zenodo. 

The archiving process can be summarized in 4 steps: 

#. Adding artifacts 
#. Updating repository information
#. Running a replication test 
#. Obtaining a DOI from Zenodo 

Some more background and callouts for each step is included below. 

Adding Artifacts
----------------

When building simulations, we store artifacts on the cluster instead of on 
the GitHub repository because storing large files on GitHub is difficult 
and can make cloning and working on the repo much slower. 
Therefore, once the model is complete we need to add the artifacts 
to repo so that external users can run the model without cluster access. 

This process is well documented on the `archiving a simulation Hub page <https://hub.ihme.washington.edu/pages/viewpage.action?spaceKey=SSE&title=Archiving+a+Simulation+Model+Repository>`_. 
With some helpful tips on the `sim sci tip sheet <https://hub.ihme.washington.edu/pages/viewpage.action?pageId=234493419>`_. 

Updating Repository Information
-------------------------------

There are 2 files you should check for accuracy at this point: 

#. :code:`.zenodo.json` which needs to include the Orcid IDs for everyone who worked on the project. A list of Orcid IDs can be found at :code:`/mnt/team/simulation_science/priv/orcid.json` 
#. :code:`README.rst` which needs to be accurate to the actual steps needed for running a simulation. The goal is that someone can read these instructions and successfully clone the repo and run a simulation. This file is best updated in tandem with step 3 - running a replication test. 

Running a Replication Test
--------------------------

Once the artifacts are in the repository, you should then be able to run a 
simulation with only the data and information in the repository. Essentially, 
if you follow the instructions in the :code:`README.rst` exactly, without cluster 
or VPN access, can you run a simulation? If you can't, you need to update the 
:code:`README.rst` to reflect needed updates and changes. 

More information on running a simulation, which might be needed to successfully 
update things, can be found on the :ref:`running simulations page <running_simulations_rt>`.

You'll need to run the replication test twice, once on your archiving branch 
and once after you merge to main. Therefore the order of operations is: 

#. Add the artifacts on an archiving branch 
#. Iterate with updates to the repo and test runs until you can run the simulation from the archiving branch and the :code:`README.rst` is reflective of the process you're using to run the model
#. Post a PR, and merge once you have approvals 
#. Do another test run from the main branch 

Obtaining a DOI from Zenodo
---------------------------

Once everything is complete and you feel confident that the model runs, 
all data is included, and the instructions are reflective of best 
practices, you are ready to upload the GitHub repository to Zenodo. 

This process is also outlined on the `archiving a simulation Hub page <https://hub.ihme.washington.edu/pages/viewpage.action?spaceKey=SSE&title=Archiving+a+Simulation+Model+Repository>`_, but 
the process steps can be a bit confusing, so they are outlined below. 

#. Log into GitHub with the vivarium development account on a browser where you are not currently logged into GitHub yourself. The credentials are on the Hub page above.
#. Ask for help with passwords and 2FA as needed for this step! 
#. Once you're logged into GitHub, then go to Zenodo and click on login with GitHub which should automatically log you in. 
#. Follow the instructions only for authorizing and setting up Zenodo. Note that you will need to set up a release and tag on GitHub to do this. A tag and release essentially just stores a version of the repository at a single moment in time. So if you continued to update the repository - say for wave 2 of a project - someone could reference the wave 1 version that created a particular set of model results later. 
