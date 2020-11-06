.. _2017_risk_exposure_smoking_forecasted:

======================================
Smoking Risk Exposure -- Forecasted
======================================


Risk Exposure Overview
----------------------

.. todo::

  Risk exposure overview


Risk Exposures Description in GBD
---------------------------------

The smoking risk factor in GBD is multifactorial and includes estimates on:

- The prevalence of current/former/never smokers 
- Cumulative pack-year smoking history for current smokers 
- Years since quitting for former smokers

This document will cover all three of these risk exposures. 

The TMREL for the smoking risk factor is never-smokers.

Smoking Prevalence
++++++++++++++++++

This is a categorical risk exposure model with three categories.

Pack-years for Current Smokers
++++++++++++++++++++++++++++++

This is a *continuous* risk exposure model that follows an *ensemble* distribution.

One pack‐year represents the equivalent of smoking one pack of cigarettes (assuming a 20‐cigarette pack) per day for one year. Since the pack‐years indicator collapses duration and intensity into a single dimension, one pack‐year of exposure can reflect smoking 40 cigarettes per day for six months or smoking 10 cigarettes per day for two years.

Years Since Quitting for Former Smokers
+++++++++++++++++++++++++++++++++++++++

This is a *continuous* risk exposure model that follows an *ensemble* distribution.

Vivarium Modeling Strategy
--------------------------

.. todo::

  Detail vivarium modeling strategy

    Note: prevalence of smoking is forcasted as well as pack-years for current smokers

    Years since quitting will be used for initialization only

    Pack-year smoking history exposure will be assigned to former smokers by looking up the pack-year history among current smokers in the year that they quit (assumption/limitation of model; potential error here should be investigated)

Restrictions
++++++++++++

.. list-table:: GBD 2017 Risk Exposure Restrictions
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
   * - Age group start
     - age_group_id=2
     - Early neonatal (0-6 days)
   * - Age group end
     - age_group_id=235
     - 95+ years

Assumptions and Limitations
+++++++++++++++++++++++++++

Describe the clinical and mathematical assumptions made for this cause model,
and the limitations these assumptions impose on the applicability of the
model.

Risk Exposure Model Diagram
++++++++++++++++++++++

Include diagram of Vivarium risk exposure model.

Data Description Tables
+++++++++++++++++++++++

As of 02/10/2020: follow the template created by Ali for Iron Deficiency, copied 
below. If we discover it's not general enough to accommodate all exposure types,
we need to revise the format in coworking. 

.. list-table:: Constants 
	:widths: 10, 5, 15
	:header-rows: 1

	* - Constant
	  - Value
	  - Note
	* - 
	  - 
	  - 

.. list-table:: Distribution Parameters
	:widths: 15, 30, 10
	:header-rows: 1

	* - Parameter
	  - Value
	  - Note
	* - 
	  - 
	  -

Validation Criteria
+++++++++++++++++++

..	todo::
	Fill in directives for this section

References
----------