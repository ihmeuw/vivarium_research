.. _2019_risk_sbp:

======================================
Systolic Blood Pressure
======================================

Risk Exposure Overview
----------------------

Blood pressure is recorded as two numbers, systolic (SBP) and diastolic (DBP), and presented as the ratio of SBP/DBP. SBP indicates how much pressure the blood is exerting against the artery walls when the heart contracts, while DBP indicates how much pressure the blood is exerting against the artery walls while the heart is resting between beats. Typically, SBP rises with age due to increased stiffness in the larger arteries. SBP is usually given more attention as a major risk factor for cardiovascular diseases, but elevated DBP (even in the absence of elevated SBP) has also been shown to be associated with increased risk of cardiovascular disease. Thresholds for defining clinical hypertension (high blood pressure) vary between guidelines set by different bodies (AHA/ACC >130/80 mm Hg; ESC >140/90 mm Hg). 
[AHA]_
[JACC]_


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

.. [AHA] Understanding Blood Pressure Readings. American Heart Association.
	Retrieved 19 April 2021.
	https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings 

.. [JACC] Bakris, George, Waleed Ali, and Gianfranco Parati. "ACC/AHA versus ESC/ESH on hypertension guidelines: JACC guideline comparison." Journal of the American College of Cardiology 73.23 (2019): 3018-3026.
	Retrieved 19 April 2021.
	https://www.jacc.org/doi/full/10.1016/j.jacc.2019.03.507
