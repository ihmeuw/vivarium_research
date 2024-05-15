.. role:: underline
    :class: underline

..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  +++++++++++++++++++++

  Section Level 2 (#.#)
  ---------------------

  Section Level 3 (#.#.#)
  ~~~~~~~~~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

.. _2024_concept_model_vivarium_mncnh_portfolio:

===============
MNCNH Portfolio
===============

.. contents::
  :local:
  :depth: 1

1.0 Overview
++++++++++++

This document is the overall page for the MNCNH Portfolio simulation and 
contains information that relates to all modeled subcomonents included in 
the simulation.

.. _mncnh_portfolio_2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++

**Objective:** Expand on prior MNCH simulation work to be able to include 
all MNCNH portfolio products. Compare health gains and costs for each 
intervention set and help in determining prioritization. Expand the capabilities of 
the simulation to include more risks and causes, more details on healthcare systems, 
and details on the intrapartum and neonatal time periods.

.. _mncnh_portfolio_3.0:

3.0 Concept model and submodels
+++++++++++++++++++++++++++++++

.. todo::

  Insert colorful full concept model

.. _mncnh_portfolio_3.1:

3.1 Model Waves
---------------

**Wave 1**: Expand risk and cause models to include all needed 

.. todo::

  Determine if wave 1 includes making multiple, smaller simulations covering a subset of risks and causes or if it will all be integrated.

- Wave 1 will be focused on expanding the risks and causes to cover what we need and calibrating a baseline model 
- There will be only the baseline scenario in this wave 
- We will make the simulation 3 time steps, but without the healthcare system or decision trees at any point 
- Making the model 3 time steps will necessitate us to tackle issues around YLDs and disability weights disconnected from "time" as we normally think of it in the simulation 

**Wave 2**: Add in healthcare during pregnancy and related interventions

- Wave 2 will add the first "decision tree" for the healthcare system during pregnancy 
- We will add interventions with dummy impact variables when they impact things in intrapartum or later 

**Wave 3**: Add the intrapartum model and related interventions

- Wave 3 will add the second "decision tree" for the intrapartum time period 
- We will add interventions with dummy impact variables when they impact things in the neonatal time

**Wave 4**: Add the neonatal period and related interventions

- Wave 4 will add the last "decision tree" for the neonatal time period 

.. _mncnh_portfolio_3.1:

3.2 Submodels
-------------

.. todo::

  Add in tables with all risk exposures, risk effects, causes, interventions, etc. 


.. _mncnh_portfolio_4.0:

4.0 Data Inputs
+++++++++++++++

.. todo::

  Fill in this section as we continue to work


.. _mncnh_portfolio_5.0:

5.0 Model run requests
++++++++++++++++++++++

.. todo::

  Fill in this section as we continue to work


.. _mncnh_portfolio_6.0:

6.0 Limitations
+++++++++++++++

.. todo::

  Fill in this section as we continue to work


.. _mncnh_portfolio_7.0:

7.0 References/Other
++++++++++++++++++++

.. todo::

  Fill in this section as we continue to work
