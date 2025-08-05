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

==============================================
Fertility Component that uses Live Births data
==============================================

.. contents::
   :local:
   :depth: 1

Overview
-------------

This document is intended to represent the fertility model for a simulation that adds new simulants based on live births data,
rather than by identifying which simulants give birth.

GBD Modeling Strategy
----------------------

Pregnancy and births are not explicit outcomes in the GBD study. However, there are location- and year-specfic GBD covariates related to fertility and births which we can use to calculate the number
of new simulants to add per timestep.

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

In a simulation where we do not model births by identifying which simulants give birth, we must instead use live births data
to determine how many simulants to add in each time step.
We will scale down the live births of the total GBD population by the same "model scale"  we use in our simulation.

For example, imagine that country A has a GBD population of 1000, and we are modeling this total population, but only need to initialize children age 5 and under 
(e.g. because they are the only ones susceptible to the disease we are modeling).
Imagine there are 100 such children living in A, and we plan to initialize 20 children in our model. 

In this example, our initialized population is :math:`1/5` the size of the age-restricted GBD population it corresponds to. 
This means that the simulated population implied by our model scenario (which includes people over the age of 5 even though they are not initialized) is also :math:`1/5` 
the size of the total unrestricted GBD population. 
This is our "model scale". We want :math:`1/5` as many children to be born in our simulation as are born in the total GBD population.

.. note::
  To reiterate, even though our number of simulants is much less than :math:`1/5` of the **total** GBD population of 1000 (since we only need to model children), we still want
  :math:`1/5` as many births to occur in our simulation as in the total GBD population. 
  
  All ages still exist in the scenario we are modeling, despite the fact that we are only explicitly initializing children under 5 -- otherwise, there would be no parents to give 
  birth to new simulants! 
  Therefore, our model scale must reflect the total GBD population even if we are only initializing a subset of that population in our model. 

To represent model scale in general we can define the below equation:

:math:`\text{model scale} = \frac{\text{initial simulated population size}}{\int_{a=\text{age start}}^{\text{age end}} \text{GBD total population}(a) \, da}`

:math:`\text{Initial simulated population size}` is the number of simulants we will initialize. 
The integral limits indicate the age restrictions of the GBD population represented by our initialized simulants - e.g. 5 and under. 
This can be generalized to models of populations restricted for other variables, such as sex. 

.. note::
  To use live births in the current year to determine the rate at which we should add new simulants, we must have :math:`\text{age start} = 0`.

  Also note that with no age restrictions, our model scale is 1 -- we can simply use the Live births data directly.

We multiply our model scale by the number of live births in the total GBD population and the fraction of a year which passes in each simulated time step 
to get the total simulants to add per timestep, as shown in the below table.

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
  * - gbd_population
    - population estimate
    - N/A

  * - Live birth by sex
    - Covariate
    - 1106

  


