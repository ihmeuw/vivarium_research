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

.. _make_results_rt:

==============
Making Results
==============

.. contents::
   :local:
   :depth: 1

After you have run the simulation, results are stored in a single, 
large .hdf file. In order to turn this file into the results RT 
is used to receiving, you need to run the :code:`make_results` call. 

Understanding the results File
------------------------------

In order to make results, the simulation needs to be told 
exactly what to expect in the :code:`output.hdf` file generated by 
the simulation. This information is found in the :code:`constants/results.py` 
file.

At the top of :code:`constants/results.py` you'll see the 
results columns and variables that are expected. These will match 
with the observers found in the simulation - for example there might be 
deaths, YLLs and YLDs, cause model transitions, person time overall 
or in various states, and intervention counts. Review these and make 
sure they match what you expect to get out of the simulation. If 
you turned off a component or observer, make sure to turn off the 
corresponding results columns. Otherwise, :code:`make_results` will fail 
when it can't find the listed columns. 

For most of the columns, you'll also see a column template. It might 
look like this :code:`MEASURE_death_due_to_{CAUSE_OF_DEATH}_AGE_GROUP_{AGE_GROUP}` 
for counting deaths. This is the measure - deaths - where deaths is counted 
for each cause of death and age group. 
If for example, you had an additional stratification of sex, the new deaths column 
could be :code:`MEASURE_death_due_to_{CAUSE_OF_DEATH}_AGE_GROUP_{AGE_GROUP}_SEX_{SEX}`. 

Below the column templates are the groups corresponding the the bracketed 
statements - for example for sex you would see :code:`SEX = ("female","male")`.
If you removed a cause, or age group from the simulation, be sure to adjust these 
groups to reflect the currently run simulation. 

If the information in the :code:`constants/results.py` is incorrect, the 
error you're likely to see is that certain columns can't be found 
(e.g., :code:`MEASURE_death_due_to_heart_failure_AGE_GROUP_50_to_54 can't be found`).
It's easy to assume that therefore that component wasn't run or 
malfunctioned, but check if the issue is just a difference in 
column name (e.g., the column might actually be called 
:code:`MEASURE_death_due_to_heart_failure_AGE_GROUP_50_to_54_SEX_female`). 

An example of changing or adding a new stratification is on 
the :ref:`common changes page <common_model_changes>`. 

Running the make_results Command
--------------------------------

The :code:`make_results` command can be run from the same environment as 
running the simulation. An example of the command can be found below. 

.. code-block:: bash 
  :linenos:

  $ make_results <PATH_TO_OUTPUT.HDF_FILE> -vvv --pdb 

Flags: 
  - -vvv is for the verbosity, the vvv is standard on the team
  - --pdb has you reach the python debugger if there are any errors
