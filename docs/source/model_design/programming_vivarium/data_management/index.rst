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

.. _data_management:

===================
Data Best Practices
===================

.. contents::
   :local:
   :depth: 2

The research and engineering teams handle a variety of data from sources such as GBD, literature and 
vivarium simulations themselves, which may be used direcly or undergo processing. This page is 
intended to outline typical and best practices for data preparation and generation tasks for consistency,
reproducibility and transfer between researchers and engineers. 

The page lists typical locations where processed data is stored and 
provides guidelines for when each should be used. 
It also describes where and how data is processed, which depends on the data source and type of 
processing.

Data may be stored in the artifact, 
in a constants file, or in the model specification. 
Note that final results from the simulation also have their
own storage locations. 

Data processing depends on the source and type of data. GBD data might be processed 
by the ``make artifact`` command with code stored in ``loader.py``, or outside ``make artifact`` for
more complex processing. Literature data might also be pre-processed by hand or used directly. 
Vivarium simulations themselves can also generate data inputs for other simulations or simulation 
iterations. 

.. todo::
    Add examples for each section?

Artifact
--------
GBD data or other data with draws should be loaded into the artifact. Even if some data is not directly 
used by the simulation, it may be useful to load it into the artifact in order to make it 
available later during V&V.  

.. todo::
    non draw level data for sensitivity analysis could be put here, but generally has been put 
    in model spec

.. todo::
    scalars in artifact?

Processed in make artifact
++++++++++++++++++++++++++
GBD data is generally loaded by the ``make artifact`` command, if it is used directly or processed 
lightly. This code lives in the ``loader.py`` file and pulls from the GBD database using vivarium 
functions. The GBD data might be directly loaded into the artifact, or processed or combined with other
GBD data or inputs before being saved in the artifact. 

Processed outside make artifact
+++++++++++++++++++++++++++++++
GBD and/or literature data may also be processed prior to running ``make artifact`` and stored in a 
file which can be quickly read during ``make artifact``. This is useful for complex 
data generation tasks, which may include long-running calculations, optimizations, or even full 
full vivariumium simulations. 

Deciding whether to perform more complex processing before or during ``make artifact`` may be 
decided on a case by case basis. If done during ``make artifact``, the code will automatically be 
re-run every time an artifact is built, ensuring the data is up-to-date, espcially if its inputs
may change. However, the user will have to wait for the processing code to run every time they build 
an artifact. On the other hand, if done before ``make artifact``, long-running processing will be 
run only when needed, but it is on the user to track dependences and determine when it needs to be run.

Constants file
--------------
Non draw level data is generally put in a constants file, or more rarely, the model specification. 

This data includes literature values that don't have uncertainty, which could be used by the 
simulation directly, or by the artifact generation code.

Literature data used directly in a constants file may be pre-processed by a human and listed in 
model documentation.

Model specification
-------------------
Uncommonly, non draw level data may be put here if we want to do a sensitivity analysis on it.

.. todo::
    more about this?

Todos
-----
.. todo::
    other situations not covered here?

.. todo::
    complex situations eg artifact depending on artifact?