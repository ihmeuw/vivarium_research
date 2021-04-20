.. _2019_risk_exposure_ldl:

====================
High LDL cholesterol 
====================


Risk Exposure Description
-------------------------

Low-density lipoprotein (LDL) is one of the five major groups of lipoproteins which transport all fat molecules around the body in the extracellular water. 
LDL can contribute to atherosclerosis if it is oxidized within the walls of arteries.  


Lipid assay panels conducted on blood samples commonly report LDL-C. This is a calculated value, using the Friedewald equation with total 
cholesterol (TC), high-density lipoprotein (HDL), and triglycerides (TG) as inputs. It should be emphasized that LDL-C is not a measurement 
of actual LDL particles, rather it is an estimate (not measured from the individual’s blood sample) of how much cholesterol is being 
transported by all LDL particles. In the clinical context, these mathematically calculated estimates of LDL-C are commonly used as an 
estimate of how much low-density lipoproteins are driving progression of atherosclerosis. It is possible to measure the concentration of LDL 
particles directly using nuclear magnetic resonance spectroscopy; however, this is not typically done in population studies. 


[CDC-LDL-Definition]_

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

.. [CDC-LDL-Definition]
	`LDL & HDL: Good & Bad Cholesterol.` Centers for Disease Control and Prevention, Centers for Disease Control and Prevention, 31 Jan. 2020, www.cdc.gov/cholesterol/ldl_hdl.htm. 