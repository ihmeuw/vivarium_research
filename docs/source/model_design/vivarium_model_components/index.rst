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

.. _vivarium_model_components:

===================================================
Types of Vivarium components and how to design them
===================================================

The following subpages describe the different types of Vivarium
components we typically encounter and provide guidelines on how to model
them in our simulations.

.. toctree::
   :maxdepth: 2
   :titlesonly:
   :glob:

   GBD_disease_health/index
   causes/index
   impairments/index
   interventions/index
   risk_factors/*
   fertility/*

To document a new component or an entirely new simulation, you should
start with one of the following templates (if applicable), referring to
the above pages for more information. The Concept Model Template is the
starting point for designing a new Vivarium simulation, whereas the
other templates are for discrete components within a simulation.

.. toctree::
  :maxdepth: 2

  ../../models/templates/index
