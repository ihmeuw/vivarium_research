.. _fertility_no_parents:

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

==========================================
Simulating births without modeling parents
==========================================

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

While we always scale down total GBD population live births when **adding** simulants,
the number of simulants we **initialize** may be less than the scaled down total GBD population due to 
restrictions on variables such as age.
For example, for a child nutrition simulation, we may only initialize children under 5.

Considering both model scale and population restrictions, we can define four different populations 
which will be useful in this discussion:

  * Restricted GBD (full-scale)  
  * Unrestricted/total GBD (full-scale) 
  * Restricted "initialized" (model-scale)
  * Unrestricted/total "model-implied" (model-scale)

Note that we differentiate model-scale populations as either "initialized" or "model-implied" 
depending on whether they are restricted or not. 
"Initialized" reflects that the restiction defines the population that we create simulants for.
"Model-implied" means that the lack of restriction includes people who exist in the context of the model but 
are not simulated. For example, even if we are only simulating children under 5, people of other ages 
are still implied to exist, otherwise there would be no one to give birth to new simulants!

The model scale will be equal to the ratio between the restricted initialized 
population and the restricted GBD population, as well as to the ratio between the 
unrestricted model-implied population and the unrestricted GBD population. 

For example, imagine that country A has a GBD population of one million ("unrestricted/total" GBD population), 
but only need to simulate children under 5 (age-restriction).
Imagine there are 100K such children living in A ("restricted GBD population"), 
and we plan to initialize 20K children in our model ("restricted initialized population"). 

In this example, our model scale is :math:`\frac{20,000}{100,000} = \frac{1}{5}`. 
(And our "unrestricted/total model-implied population" must be 
:math:`1,000,000 * \frac{1}{5} = 200,000`).

So, we want :math:`\frac{1}{5}` as many children to be born in our simulation 
as are born in the total GBD population.

To represent model scale in general we can define the below equation:

:math:`\text{model scale} = \frac{\text{Initialized simulated population size}}{\sum_{a=\text{age start}}^{\text{age end}} \text{GBD total population at age }a}`

"Initialized simulated population size" is the age-restricted, initialized population size -- the number of simulants we will create. 
The summation limits indicate the age restrictions (at initialization) of the GBD population represented by our initialized simulants - e.g. under 5. 
This can be generalized to models of populations restricted for other variables, such as sex. 

.. note::
  To use live births in the current year to determine the rate at which we should add new simulants, we must have :math:`\text{age start} = 0`.

  Also note that with no age restrictions, the simulated population size in the numerator 
  will be the same as the model-implied population size, 
  and the sum will simply be the total GBD population. 

We multiply our model scale by the number of live births per year in the total GBD population and the length of each simulated time step 
to get the total simulants to add per timestep, as shown in the below table.

.. list-table:: Parameters
  :header-rows: 1

  * - Parameter
    - Value
  * - simulants_to_add_per_timestep
    - :math:`\frac{\text{initial simulated population size}}{\sum_{a=\text{age start}}^{\text{age end}} \text{GBD total population at age }a} \times \text{Live births per year} \times \text{time step in years}`

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

  
.. todo:: 
  Expand to a more detailed example - can draw on `this previous PR <https://github.com/ihmeuw/vivarium_research/pull/1642>`_.

