=================
Survival Analysis
=================

.. todo::

	Insert summary/introduction that explains the purpose of this section, how 
	it relates to cause modeling, and what will be covered

.. contents::
	:local:

----
++++
^^^^

Terms and Definitions
---------------------

.. todo::

	Add definitions and descriptions to terms

.. list-table:: 
   :widths: 20 20
   :header-rows: 1

   * - Term
     - Definition
   * - Event
     -
   * - Time
     -
   * - Censor
     -
   * - Observation period
     -

Survival Function
-----------------

.. todo::

	Include disclaimer that we will first discuss closed cohorts without event 
	recurrance until a later section

	Include formula for survival function, interpretation, description, etc.

	Include kaplain meier plot 


Hazard Function
---------------

.. todo::
	
	Include formula for hazard function, interpretation, description, how it 
	relates to survival function, etc.

	Include graphic of observed failure rate made up of decreasing early 
	infant mortality hazard rate, constant random hazard rate, and increasing 
	wear out hazard rate along with corresponding survival curves

	Include an example that contrasts population time (2016) with time 
	relative to an event (years since diagnosis).

Implications for Cause Model Transition Rates
---------------------------------------------

.. todo:: 

	Link to cause model transition rates data source page

	Briefly discuss how incidence is used as transition probability and 
	assumption that it is constant over the timeframe it represents

	Discuss how this assumption is valid for constant hazard rates, with 
	examples

	Discuss how this assumption is less valid for the following scenarios, 
	with examples:

		increasing hazard rates

		decreasing hazard rates

		U-shaped and bell shaped hazard rates

		when the hazard rate varies between population timeframe and the 
		individual timeframe 

Impact on YLLs and YLDs
+++++++++++++++++++++++

.. todo::

	Include figures that demonstrate how YLLs and YLDs can be under/
	overestimated with biased hazard rate approximation

	Include examples of how this has been/can be handled (function to increase/
	decrease incidence rate around the mean relative to time since infection?, 
	etc.)