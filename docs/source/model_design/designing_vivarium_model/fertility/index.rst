.. _fertility_crude_birth_rate:

..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  ---------------------

  Section Level 2 (#.#)
  +++++++++++++++++++++

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

===================================================
Fertility Component that uses Crude Birth Rate Data
===================================================

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - CBR
    - Crude Birth Rate
    - A thorough discussion of fertility and
      birth rate models can be found on
      `Wikipedia <https://en.wikipedia.org/wiki/Birth_rate>`_.

Overview
-------------

This document is intended to represent the fertility model for a simulation that adds new simulants based on a CBR.

GBD Modeling Strategy
----------------------

Pregnancy and births are not explicit outcomes in the GBD study. However, there are location- and year-specfic GBD covariates related to fertility and births, and we use the "Live births by sex" covariate together with the GBD population estimates to calculate the CBR.  :math:`\text{CBR} = \frac{\text{Live births}}{\text{Population}} \times 1000`.

.. list-table:: Covariates
  :widths: 15 15 15
  :header-rows: 1

  * - Covariate name
    - Covariate ID
    - Note
  * - Live births by sex
    - 1106
    - 


Vivarium Modeling Strategy
----------------------------

The key challenge for using CBR in a fertility component in Vivarium is determining how many simulants to add in each time step.  This quantity would be simple were it not for the variety of ``age_start`` and ``age_end`` parameters that might appear in the sim.

Since the population represented in the sim might be only a fraction of the total population used as the denominator of the CBR, we need to find the fraction of the total population being simulated.

First let's define the "initially represented population" as the GDB population we will represent in our simulation.
This population is a subset of the total GBD population used as the denominator of the CBR, but is full-scale version of the simulant population in our model.
In other words it is the GBD population corresponding to the age and sex restrictions we place on the simulants to be initialized.

We'll call the simulants we initialize the "initial simulated population size".

There are two ways to calculate the number of simulants to add in each time step -- the "epidemiology way" using the CBR, and the "model way".
Both ways give the same result, but we will explain each for clarity.

Epidemiology way
++++++++++++++++

Let's define :math:`\text{initially represented fraction} = \frac{\text{initially represented population size}}{\text{total GBD population size}}`

In the case where there are no age or sex restrictions on the simulants we initialize, this value is 1.

So, :math:`\text{simulants_to_add_per_year} = \frac{\text{initial simulated population size}}{\text{initially represented fraction}} \times \frac{\text{CBR}}{1000}`

When the initially represented fraction is 1, this is just :math:`\text{initial simulated population size} \times \frac{\text{CBR}}{1000}`.

Model scale way
+++++++++++++++

We can also think about it in terms of a "model scale", like a model train set which is a replica of the real train, but at a certain scale ratio.

We'll define :math:`\text{model scale} = \frac{\text{initial simulated population size}}{\text{initially represented population size}}`.

So, :math:`\text{simulants_to_add_per_year} = \text{model scale} \times \text{live births}`.

The model scale way of representing :math:`\text{simulants_to_add_per_year}` is algebraically equivalent to the epidemiology way. 
Since :math:`\text{model scale} = \frac{\text{initial simulated population size}}{\text{total GBD population size} \times \text{initially represented fraction}}`, 
then 

:math:`\text{simulants_to_add_per_year} = \frac{\text{initial simulated population size}}{\text{total GBD population size} \times \text{initially represented fraction}} \times \text{live births}`,

which simplifies to the epidemiology representation.

A model scale perspective can also be useful in scaling other values, such as DALY results from the sim back up to the "real world".

.. list-table:: Parameters
  :header-rows: 1

  * - Parameter
    - Value
    - Note
  * - simulants_to_add_per_timestep
    - :math:`\frac{\text{initial simulated population size}}{\int_{a=\text{age start}}^{\text{age end}} \text{GBD total population}(a) \, da} \times \text{Live births} \times \text{time step}/365`
    - 

.. list-table:: Data values
  :header-rows: 1

  * - Parameter
    - Data type  
    - Data ID
    - Source
    - Note
  * - gbd_population
    - population estimate
    - N/A
    - get_population: decomp_step='iterative'
    - 
  * - Live birth by sex
    - Covariate
    - 1106
    - ?
    - Assume lognormal distribution of uncertainty  ?

  


