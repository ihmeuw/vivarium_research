.. role:: underline
    :class: underline

.. _2019_risk_exposure_wasting_states:

===============================
Wasting as finite state machine
===============================


Risk Exposure Overview
----------------------

Include here a clinical background and overview of the risk exposure you're 
modeling. Note that this is only for the exposure; you will include information 
on the relative risk of the relevant outcomes, and the cause models for those 
outcomes, in a different document.


Risk Exposures Description in GBD
---------------------------------

Include a description of this risk exposure model in the context of GBD, 
involving but not limited to:

  - What type of statistical model? (categorical, continuous?)

  - How is the exposure estimated? (DisMod, STGPR?)

  - Which outcomes are affected by this risk?

  - TMREL? (This should be a very high level overview. Namely, does the TMREL vary by outcome? The details of the TMREL will be included in the *Risk Outcome Relationship Model* section)

Vivarium Modeling Strategy
--------------------------

We will calibrate a duration based finite state transition model for progression and recovery of acute malnutrition (figure 9) according to GBD 2019 prevalence of wasting data. The model consists of four states corresponding to WFH z-score according to the 2006 World Health Organization growth standards ranges where cat 1= SAM <-3 SD; cat 2 = MAM -3 to -2 SD; cat 3 = -2 to -1 SD and cat 4 = non-malnourished (TMREL).  The arrows in the figure illustrate the transition probability into and out of each state which controls the movement of children in and out of each state. 

:underline:`Finite state machine 1: no death, no birth`

.. image:: wasting_finite_states_1.svg

let P be the transition matrix





Restrictions
++++++++++++

.. list-table:: GBD 2019 Risk Exposure Restrictions
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     -
     -
   * - Female only
     -
     -
   * - Age group start
     -
     -
   * - Age group end
     -
     -

..	todo::

	Determine if there's something analogous to "YLL/YLD only" for this section

Assumptions and Limitations
+++++++++++++++++++++++++++

Describe the clinical and mathematical assumptions made for this cause model,
and the limitations these assumptions impose on the applicability of the
model.

Risk Exposure Model Diagram
+++++++++++++++++++++++++++

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