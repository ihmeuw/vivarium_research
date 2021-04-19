.. _2019_risk_bmi:

======================================
Body Mass Index
======================================


Risk Exposure Overview
----------------------

Body mass index (BMI) is a person’s weight in kilograms divided by the square of height in meters (weight (kg) / [height (m)]\ :sup:`2`\). BMI is an inexpensive and easy screening method; values are frequently divided into categories: underweight (<18.5 kg/m\ :sup:`2`\), healthy weight (18.5 to 24.9 kg/m\ :sup:`2`\), overweight (25.0 to 29.9 kg/m\ :sup:`2`\), and obesity (>=30.0 kg/m\ :sup:`2`\). BMI does not measure body fat directly, but it is moderately correlated with more direct measures of body fat. BMI has also been shown to be correlated with various metabolic and disease outcomes. BMI can be a screening tool, but it does not diagnose the body fatness or health of an individual.
[CDC]_

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

Include here an overview of the Vivarium modeling section

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

.. [CDC] About Adult BMI. Centers for Disease Control and Prevention, Centers for Disease Control and Prevention, 17 Sept. 2020.
	Retrieved 19 April 2021.
	https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/index.html 