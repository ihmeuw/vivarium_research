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

.. _engineering_files_rt:

=============================
Overview of Engineering Files
=============================

.. contents::
   :local:
   :depth: 2


This document is designed to provide an overview of the files found in the 
engineering repository and some examples of when you might need to use 
each file. This is NOT exhaustive as some files are less relevant 
for research team members, and the files included change between models. 

This page is organized in sections by the different folders found in engineering 
repositories and then the pages within folders, as relevant. 

.. todo::

  Add information on ownership of documents to this file. What is RT responsibility vs engineering. 


Project Folder
--------------

In the initial project folder, there are some files for information storage and 
documentation that are helpful to know about. These are not used in the actual 
model, but you might need to edit them in order to document your work. 

CHANGELOG
+++++++++

The :code:`CHANGELOG.rst` file is a way to track what has been run and what 
updates took place with each model run. This information should match the 
model runs seen in Vivarium Research documenation. When you run a model, 
be sure to update this. 

README
++++++

The :code:`README.rst` file is found in most GitHub repositories, not just 
on our team! It provides information on cloning and running the code stored 
in the repo, and how to setup your environment. This is a helpful resource 
to review when you first start on a project. 

Additionally, you might have to update and edit the :code:`README.rst` file 
while doing archiving, but more details on this can be found on 
the :ref:`archiving page <archiving_models_rt>`. 

Components
----------

The :code:`components` folder contains files on the information for each 
modeling "component". This includes things like disease models, 
risk factors, pregnancies, the health care system, 
interventions, or observers. 

The files included will be specific to your project rather than generalizable. 
Additionally, these files will mostly be maintained and written by the 
engineering team. For those reasons, we won't elaborate on these files here. 

Constants
---------

The :code:`constants` folder contains input information for the model. This includes 
things like data values, locations, file paths, draw counts, column 
names, and outputs needed. 

There are a few reasons you might use files from this folder - changing data inputs, 
adjusting information for the artifact, or validating file paths. The below files 
are not all inclusive, but represent most of what you should be aware of. 

data_keys
+++++++++

The :code:`data_keys.py` file dictates which keys are run to make the artifact. Any 
keys not included in the :code:`MAKE_ARTIFACTS_KEY_GROUPS` list at the bottom of the 
file will be ignored when making artifacts. More information on how and when to 
edit this can be found on the :ref:`artifact building page <artifact_building_rt>`. 

metadata
++++++++

The :code:`metadata.py` file stores metadata information for the model. For example, 
locations the model can be run for, age groups, draw counts, index columns or similar. 
Research will not be expected to edit this information for the most part, but may 
need to change the locations for artifact building, although this can also be done 
from the command line. More information 
can be found on the :ref:`artifact building page <artifact_building_rt>`.

paths
+++++

The :code:`paths.py` file contains the file paths for all input data. When editing input data (especially 
RT generated data), check to see if you need to update the file path or file name here. 

results
+++++++

The :code:`results.py` file contains the expected results columns and files. If 
you want to change what is included in the results, you'll need to edit this. More 
information on when and how to do that can be found on the :ref:`running simulations page <running_simulations_rt>`.

Data
----

The :code:`data` folder is tools and information on loading and creating the input 
data for the simulation. This includes loader functions for gathering 
GBD or RT generated data into artifact formatting. You will primarily 
interact with this folder when doing artifact generation. 

Here, we only specifically include the loader file, as this should be the 
primary one we work with. However, there might be other files like utilities or 
extra_gbd which contain supporting functions. If you need, trace functions back 
to these other files. 

loader
++++++

The :code:`loader.py` file loads all of the data for the simulation, formats it, and 
saves it to the artifact. At the top you will see a list of data keys that correspond 
to information in the artifact. At the end of each data keys is the name of a function 
that is used to generate that data. Many of the functions are included below in the 
remainder of the file, though notably not all. 

If you need to format data into the artifact, or adjust how information is pulled 
and saved, start by looking in this file. As mentioned above, some of the functions 
are stored elsewhere, so don't be surprised if there is information on another page. 

Model Specifications
--------------------

The :code:`model_specifications` folder contains information on 
running the model with :code:`simulate` or :code:`psimulate`. You 
will need to look through and adjust these files whenever you want 
to run the simulation. 

These files are .yaml files. There is general information on `YAML basics <https://vivarium.readthedocs.io/en/latest/concepts/model_specification/yaml_basics.html#model-specification-yaml-concept>`_ here.


Information included here:

- Which components (including observers) will be included in a model run (e.g., maybe you wish to run a model with interventions "turned off")
- Population size, seed count, and draw count
- The time the simulation runs for and time step size 
- Any stratifications for observers 

model_spec
++++++++++

The :code:`model_spec.yaml` file contains the majority of the information 
on what to include in a given model run. This includes things like what 
components to include, the population size, what draw and artifact to use, 
and stratifications for observers. 

Some of this information is only used if you run a single model run, 
rather than many model runs (1 draw, seed, location, and scenario). But more 
information on this can be found on the :ref:`running simulations page <running_simulations_rt>`.

Engineering notes can be found on this `model specs file page <https://vivarium.readthedocs.io/en/latest/concepts/model_specification/index.html>`_.

scenarios
+++++++++

The :code:`scenario.yaml` file, usually within the :code:`branches` folder, is used to determine what runs 
are needed. In it usually quite a short file and only includes things like draw 
count, seed count, and interventions to include. It is important to check this 
matches the needed run size for V&V runs. 

Engineering notes can be found on this `branches file page <https://vivarium-cluster-tools.readthedocs.io/en/latest/branch.html>`_.

Results Processing
------------------

The :code:`results_processing` folder contains the information and functions that are 
used after the model is run to process the outputs and create the results files 
researchers are used to receiving.

It's important to note that if there is a mismatch between components that are run 
and those are are requested in the results, you will get an error. It's good to check 
that what was run is the same as what is expected in the outputs. More on this can 
be found on the :ref:`running simulations page <running_simulations_rt>`.

process_results
+++++++++++++++

The :code:`process_results.py` file contains the information on what results to create and 
the functions to make those results. If you want to remove a component from the model, 
do so here as well or :code:`make_results` will fail. Otherwise, this is where 
functions to read in data, manipulate it, and create csvs are stored. 

Tools
-----

The :code:`tools` folder contains tools that work in the background of the simulation. Generally, 
you won't need to edit anything in this folder. However, there is some helpful information 
here. 

cli
+++

The :code:`cli.py` file contains some information on the commands for running simulations, 
making results, and making the artifact. However, this information is 
documented elsewhere is a more clear format, or you can run code in the command line 
to get this information. For example :code:`make_results --help`. 
