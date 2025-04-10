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

.. _artifact_building_rt:

=================
Artifact Building
=================

.. contents::
   :local:
   :depth: 2

A data artifact is a bundle of input data associated with a particular
model. It is typically stored as an :code:`hdf` file on disk with very
particular formatting. This file is then used by the vivarium simulations
to fill in all the relevant parameter data.

There are also artifact building instructions in the `vivarium tutorial docs <https://vivarium.readthedocs.io/en/latest/tutorials/artifact.html>`_. However,
these are largely written for a software developer, so here we endeavor to
create documentation from a research team perspective.

Another helpful resource to use is the `vivarium research template <https://github.com/ihmeuw/vivarium_research_template>`_ which is the code present when starting 
a new project repository. This inlcudes baseline information and functions. 

Understanding Data Keys
-----------------------

A data key in a simulation is a key word that defines a set of
data to be saved in the artifact. For example, :code:`population.location`,
:code:`cause.measles.prevalence`, or :code:`risk_factor.child_wasting.exposure`.

You should be used to seeing data keys like this in the artifact, since
research team members often use these in V&V. In fact, this is how the data
is called to create the artifact, and called from the artifact by research to
test the model.

These data keys show up in two places:

#. The :code:`constants/data_keys.py` file
#. The :code:`data/loader.py` file

In :code:`constants/data_keys.py`, all data keys are defined. At the bottom in
the :code:`MAKE_ARTIFACT_KEY_GROUPS` you'll see the data key groups -
things like :code:`POPULATION`, :code:`MEASLES`, or :code:`WASTING`
from the examples above. The code above in the rest of the documentation
is designed to take inputs from :code:`data/loader.py` and return the correct
data key string.

At the top of :code:`data/loader.py` you will see :code:`mapping`. The map provides
inputs for :code:`constants/data_keys.py` which returns the data key name. The second
part of the line in :code:`mapping` is the function where the data key
serves as an input. These functions are written below :code:`mapping`.

Writing or Editing Data Keys
----------------------------

If you need to edit how data is loaded into a key, you can locate the corresponding function from
:code:`mapping` at the top of :code:`data/loader.py` and simply edit the function
to match your needs.

It is important to note that some of the more common
functions are stored in other repositories like :code:`vivarium_inputs`.
If you want more information on loading data and :code:`vivarium_inputs`, 
look at the :ref:`pulling data page in vivarium research <data>`.

Looking at engineering repositories can be helpful in understanding how the data is
being pulled. However, generally RT should not edit functions in other
engineering repositories. Talk to engineering if you think a function needs
new functionality or try to add the needed updates in the :code:`data/loader.py` function instead.

Another important call-out is that most of these functions are used for
more than one data key. Check if you want to change how data is pulled for
all data keys using that function, or only one, and edit accordingly.

If you're being asked to add a new data key, or write an artifact from scratch,
a good place to start is from the `vivarium research template <https://github.com/ihmeuw/vivarium_research_template>`_. In this repo's version of :code:`data/loader.py`
you can find some basic examples of creating the loader functions.

Most of the time, data is loaded using the :code:`load_standard_data` function,
which pulls data from GBD into Vivarium formatting. However, there might be
alternative functions for population data keys, or if you want data in non-standard
formatting.

Additionally, consider if you need all of the data to be saved. For
example, in the child nutrition model, we don't use data for age
groups over 5 years old, so we filter out some of the pulled data to
limit the size of the artifact.

For data keys that don't pull information from GBD, the process of writing
or editing these functions is largely the same. Instead of :code:`load_standard_data`
you would generally just use :code:`read_csv` from a specified data path. The
path to each data input is stored in the :code:`constants/paths.py` file. If you update a
data input, update the reference in the :code:`constants/paths.py` file to ensure you're
pulling the most up to date information.

Making Subnational Data
-----------------------

You can also make artifact data files that contain subnational data. These 
files have all of the subnational data for a specific national geography 
contained in a single file. For example, if you ran this in the US, you would 
get data files with a new column called "location" 
which would contain the subnational locations like "Alabama" or "Alaska". Different 
national locations will continue to be stored in different files (e.g., 
US and Canada would be different files, each with a "location" column that 
included the states/provinces).

Currently, the basic setup of Vivarium will make a subnational artifact, so 
no additional steps are needed. However, usually there will be some data keys 
that will need to pull national data, even if most data is subnational. For 
example, relative risks don't vary by location, or the duration of an 
illness might be the same for all locations. In these cases, the data 
keys which should remain national are contained in a list called 
:code:`NATIONAL_LEVEL_DATA_KEYS` at the top of the :code:`data/loader.py` 
file.

Also be sure to check any functions that combine subnational and 
national data. For example, prevalence rates are sometimes calculated 
based on duration (a national data key) and incidence (a subnational 
data key). These functions will likely require extra attention to 
ensure they are pulling and providing the data needed. 

Other Input Data
----------------

Data keys and their functions make up the bulk of the data pulling
infrastructure for artifact building. However, there might be some other
metadata that's important to be aware of. Most of this can be found
in the :code:`constants/metadata.py` file.

This is information like draw counts, index columns, and locations that
can be run. You can use the `vivarium research template <https://github.com/ihmeuw/vivarium_research_template>`_ as a reference for the information 
generally found in this file.

If you are editing an existing model, just check to make sure this
information matches what you expect.

As referenced above, there is also a :code:`constants/paths.py` file which
cotains the file paths and names for all other input data.

Building an Artifact on the Command Line
----------------------------------------

Before you try to build your artifact, make sure the data inputs are
up to date. Consider what you are changing in the new model version
and if that will impact the artifact data, and make any needed updates
to the files and functions, as outlined above.

Creating an Environment
+++++++++++++++++++++++

First, you will need to create an environment. This will be the same
as creating usual environments, except when you install the project repo,
you'll need to do a special editable install. The command looks like this :code:`pip install -e.[data]`. Some other packages can be helpful here as well like :code:`ipython` for
debugging. Note that this environment is different than the one needed 
to run the simulation model, where you will use the :code:`[dev]` flag instead 
of the :code:`[data]` flag needed for artifact building. 

Generally, the project repo is the only thing you will need to install,
but check with the engineers if there are updates to other vivarium
packages you should be aware of - like :code:`vivarium_inputs`,
:code:`vivarium_public_health`, or :code:`vivarium_gbd_access`.

Running the make_artifacts Command
++++++++++++++++++++++++++++++++++

Now that you prepped the data inputs and made an environment,
you're ready to run the :code:`make_artifacts` command. To get
all of the function options, you can run :code:`make_artifacts --help`
from the command line. However, for ease an example call is included
below with an explanation for each flag.

.. code-block:: bash 
  :linenos:

  $ make_artifacts -vvv --pdb -o /mnt/team/simulation_science/pub/models/<PROJCET_NAME>/artifacts/<MODEL_NUMBER>/ --national -l '<LOCATION>' -a

Flags: 
  - -vvv is for the verbosity, the vvv is standard on the team
  - --pdb has you reach the python debugger if there are any errors
  - -o is where to put the output artifact
  - --national tells vivarium to run the artifact nationally instead of subnationally. Remove this flag to run the artifact for subnational locations. 
  - -l is the location to make the artifact for. The location must be included in the :code:`constants/metadata.py` file in order to be called here.
  - -a is for append, this means the program will check for existing data keys and only run the keys that are not currently present

It is highly likely you will land in the debugger the first time you
try make the artifact. Look through the stack trace and see which data key
is causing the error. Then try and trace to where the issue might be.
We know that this is hard! If you're unsure what's causing the error - ask for help!

Using append is helpful in the case of errors - you can rerun the same command
and it will automatically start from where it errored out previously.

If you need to edit a data key that you already generated, you can either
edit the above :code:`make_artifacts` command to have it replace instead of append
by using the :code:`-r` flag, or you can remove
certain data keys from the artifact using :code:`art.remove('<DATA_KEY>')`
with ipython.
