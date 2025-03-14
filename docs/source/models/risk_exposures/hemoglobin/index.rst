.. _2023_hemoglobin_exposure:

======================================
Hemoglobin Risk Exposure
======================================


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

   - If a continuous model, the type of distribution (example: normal distribution) as well as distribution parameters (most often mean and standard deviation) must be specified.

      - As discussed on the :ref:`ensemble distribution document <vivarium_best_practices_ensemble_distributions>`, if the continuous model is an ensemble distribution, the following parameters must be specified:

         - Exposure mean
         - Exposure standard deviation
         - Ensemble distribution weights
         - XMIN and XMAX values

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