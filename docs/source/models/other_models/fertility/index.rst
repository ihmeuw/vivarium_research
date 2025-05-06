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

.. math::

   \text{simulated_fraction} = \frac{
       \int_{a=\text{age_start}}^{\text{age_end}} \text{total_population}(a) \, da
   }{
       \int_{a=0}^{125} \text{total_population}(a) \, da
   }

where :math:`\int_{a=\text{age_start}}^{\text{age_end}} \text{total_population}(a) \, da` is the portion of the total population that is represented initially in the sim.

With this quantity, the simulants to add per year is equal to

.. math::

   \text{simulants_to_add_rate} = \frac{\text{initial_population}}{\text{simulated_fraction}} \times \frac{\text{CBR}}{1000}

Note that :math:`\text{initial_population}` is in the model spec as ``configuration.population.population_size``.  This is the number of simulants in the sim at the start of the simulation.

Adding these simulants can be accomplished elegantly by adding a random number of simulants each time step with Poisson parameter of :math:`\text{simulants_to_add}\times \text{time_step}/365`.

Examples with different ``age_start`` and ``age_end`` parameters:

age_start = 0, age_end = 125 --- simulated_fraction = 1.0

age_start = 0, age_end = 1 --- simulated_fraction = fraction of population born in last year

.. list-table:: Parameters
  :header-rows: 1

  * - Parameter
    - Value
    - Note
  * - 
    - 
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

  


