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

.. _2020_risk_exposure_child_underweight:

=================
Child underweight
=================

.. contents::
  :local:

Risk Exposure Overview
++++++++++++++++++++++

Child underweight exposure is measured by weight for age z-score (WAZ). Notably, 
this child underweight exposure, by definition, is closely related to child 
stunting (height for age) exposure (weight is a function of height) as well as 
child wasting (weight for height exposure) exposure (both underweight and 
wasting exposures are a function of child weight). 

Risk Exposures Description in GBD
+++++++++++++++++++++++++++++++++

Underweight, a sub-component indicator of child growth failure (CGF), is based 
on a categorical definition using the WHO 2006 growth standards for children 
0-59 months. Definitions are based on z-scores from the growth standards, which 
were derived from an international reference population. Mild, moderate and 
severe categorical prevalences were estimated for each of the three indicators. 
Theoretical minimum risk exposure level (TMREL) for underweight was assigned to 
be greater than or equal to one standard deviation below the mean (-1 SD) of the 
WHO 2006 standard **weight-for-age (WAZ)** z-score curve. This has not changed 
since GBD 2010.

The REI ID for child underweight is 94.

Risk exposure categories are described below:

.. list-table:: Underweight exposure categories (range -7 to 7)
  :header-rows: 1

  * - Category
    - Severity
    - WAZ range
  * - cat4
    - TMREL
    - WAZ > -1 
  * - cat3
    - mild
    - -1 > WAZ > -2
  * - cat2
    - moderate
    - -2 > WAZ > -3
  * - cat1
    - severe
    - WAZ < -3 

Vivarium Modeling Strategy
++++++++++++++++++++++++++

We will model child underweight as an **ordered polytomous variable**. 

We will use a "propensity exposure model" for child underweight, but with 
population risk exposure distributions that are conditional on 
:ref:`child stunting <2020_risk_exposure_child_stunting>` and 
:ref:`child wasting <2021_risk_exposure_wasting_state_exposure>` exposures. 
With this strategy, each simulant will be initialized with a "propensity" for 
child underweight that does not change throughout the duration of the 
simulation. The propensity should be assigned according to a uniform 
distribution between 0 and 1.  This propensity will represent the simulant's 
risk exposure percentile and will be used to determine the simulant's child 
underweight exposure value by comparing it to the child underweight risk 
exposure distribution specific to the simulant's joint stunting and wasting 
exposures. 

.. todo::

  Determine if child underweight propensity should be the same as child stunting 
  propensity (test in notebook)

The underweight exposure distribution conditional on wasting and stunting 
exposures to be used in vivarium simulations can be found in the links below.
Details on how 
these distributions were obtained can be found in the subsequent section.

- `Ethiopian conditional underweight exposure distributions <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/cgf_correlation/ethiopia/lookup.csv>`_

  - Note: the postneonatal age group should be applied to the early neonatal age group as well.

With this strategy, child underweight will dynamically update within a 
single age group in tandem with child wasting exposure changes and may also 
update upon transition to a new age group when child stunting exposure may 
change. Therefore, child underweight exposure in our simulation should be 
reassessed upon the following events:

- Child wasting exposure state transition occurs

- Child stunting exposure state changes (may only occur when simulant changes age groups)

Calculation of wasting exposure distribution conditional on stunting and wasting exposures
-------------------------------------------------------------------------------------------

The child underweight exposure distribution conditional on wasting and stunting 
exposure is custom calculated according to the following steps:

1. Obtain location-specific wasting, stunting, and underweight continuous 
correlation coefficients from Demographic Health Survey (DHS) data for the 
population of interest

2. In a "nano simulation," assign simulants continuous WHZ, HAZ, and WAZ 
exposure propensity values according to the correlation coefficients obtained 
from DHS data.

3. Use these propensities to assign categorical wasting, stunting, and underweight
exposure values to each simulant.

4. Calculate categorical child underweight exposure distributions specific to 
each joint wasting and stunting exposure category.

The notebook for which these steps were performed can be found at the links below:

- `Ethiopian notebooks <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/tree/data_prep/data_prep/cgf_correlation/ethiopia>`_

Restrictions
------------

.. list-table:: GBD 2021 Risk Exposure Restrictions
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     - False
     -
   * - Female only
     - False
     -
   * - Age start
     - early neonatal (0-6 days), age group ID = 2
     - Note risk effects age start is 1 month
   * - Age end
     - 5 years (GBD 2019 1-4 age group ID=5; GBD 2021 2-4 age group ID = 34)
     - 

.. code-block:: Python
	  
    ## REMINDER

    #GBD 2020 age-group ids

    early nn = 2
    late nn = 3
    1m-5m = 388
    6m-11m = 389
    12m-23m = 238
    2y-4y = 34


    #GBD 2019 age-group ids

    early nn = 2
    late nn = 3
    post nn = 4
    1-5 = 5

Assumptions and Limitations
+++++++++++++++++++++++++++

- We model child underweight as a categorical exposure despite availability of an underlying continuous exposure distribution.

Validation Criteria
+++++++++++++++++++

- Simulated population-level child underweight exposure should verify to GBD risk exposure distribution

- Simulated child underweight exposure distributions conditional on joint wasting and stunting exposure categories should verify to conditional distribution input data

- Validation criteria for child wasting and child stunting exposure models should continue to be satisfied 

References
----------