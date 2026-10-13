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

The research and engineering teams handle a variety of data from original sources such as GBD and literature
as well as intermediate data generated from scripts or other code including the vivarium simulation itself.
Intermediate data generation may include calculations or processing from original data. 
This page is intended to outline typical and best practices for data preparation and generation tasks for consistency,
reproducibility and transfer between researchers and engineers. 

The page is organized by locations where original or intermediate data is stored and provides guidelines for when to use each storage location.
For each location, it describes any common types of data processing that typically store their outputs there 
and whether inputs and code associated with that processing are also stored there, or somewhere else.

Data may be stored in the artifact, in a constants file, in the model specification, or in other less common places. 
Final results from the simulation also have their own storage locations. 

Data processing practices depend on the source and type of data. GBD data might be processed 
by the ``make artifact`` command (via code stored in ``loader.py``), or by other scripts or code for
more complex processing. Literature data might also be pre-processed by hand. 
Vivarium simulations themselves can also generate data inputs for other simulations or simulation 
iterations. 

Artifact
--------
The artifact is a very common location for data to be stored. All draw-level data including GBD data should be loaded into the artifact.
Generally, data is loaded into the artifact because it is used by the simulation, but it can also be useful to store draw-level data 
relevant to the V&V process in the artifact for easy access later.

.. note::
    Generally it is recommended to represent data in a singele place, either as as parameters describing a distribution,
    or as draw-level data generated from that distribution. 
    However sometimes important to both 
    (a) store location-specific paramaters that describe a distribution (like mean effect sizes) 
    in a dictionary in the constants directory, as described below, for visibility and updatability, and 
    (b) store draw-level data in the artifact based on the distribution parameters for V&V.

.. todo::
    Anything else to be said about storing location specific values in the artifact vs constants file?
    Are there specific times it would be a problem to store both the parameters in the constants directory and 
    draw-level data generated from them in the artifact? 
    Or are there specific times where we'd want to store the constant parameters in the artifact instead of the constants directory?

It is generally not recommended to store non-draw level data in the artifact.

.. note::
    Sensitivity analysis run values are a special case. The most common and recommended practice is to store sensitivity analysis run values in the model specification as described below.
    This approach provides integration with vivarium tools such as setting run values via the CLI or interactive sim.
    However, theoretically, separate artifacts could be created to store constant or location-specific values for different runs.

Draw-level data stored in the artifact may have been generated or processed either during the ``make artifact`` command, or before it, 
depending on the type of data inputs and code used in the processing.

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
Non draw-level data is generally put in a constants file, or more rarely, the model specification. 

This data includes literature values that don't have uncertainty, which could be used by the 
simulation directly, or by the artifact generation code.

Literature data stored directly in a constants file is generally described in model documentation.
If it needs pre-processing, this is generally done by a human.

Model specification
-------------------
Uncommonly, non draw-level data may be put here if we want to do a sensitivity analysis on it.

.. todo::
    more about this?

Todos
-----
.. todo::
    other situations not covered here? complex situations eg artifact depending on artifact? would examples be helpful of times we did things a certain way?
