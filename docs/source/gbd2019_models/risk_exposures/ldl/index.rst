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

In GBD, low density lipoprotein is modeled as a continuous variable using ST-GPR based on data from population-based surveys and scientific 
studies. The reference definition for input data is calculated LDL-C. We also include data sources which provide estimates of HDL, TC, or TG 
alone or in combination and adjust these data points using statistical modeling to estimate the amount of bias in non-reference data. The 
quantity of interest is exposure to the mean LDL-C level regardless of whether that level is naturally occurring or occurs via use of 
medication; we assume full reversibility of risk and do not account for duration of exposure to elevated LDL-C.   

LDL-C is commonly reported using two different units. To convert from mmol/L to mg/dL multiply by 38.67. To convert from mg/dL to mmol/L 
divide by 38.67.  

The TMREL for LDL-C is 0.7 to 1.3 mmol/L. This is the same for all risk-outcome pairs. These are listed below. 


.. list-table:: Risk-Outcome Pairs for LDL
   :widths: 15 15 20
   :header-rows: 1

   * - Risk
     - Outcome
     - Cause_id
   * - High low-density lipoprotein
     - Ischemic heart disease
     - 493
   * - High low-density lipoprotein
     - Ischemic stroke
     - 495


Vivarium Modeling Strategy
--------------------------

Scope
+++++

We will model LDL-C as a continuous risk factor in the Vivarium simulation using an ensemble distribution, similar to the GBD approach.


Restrictions
++++++++++++

.. list-table:: GBD 2019 Risk Exposure Restrictions
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
   * - YLD only
     - False
     -
   * - YLL only
     - False
     -
   * - Age group start
     - 10
     - [25, 29 years) 
   * - Age group end
     - 235
     - [95, 125 years)


Assumptions and Limitations
+++++++++++++++++++++++++++

As described above, LDL-C is a calculated value; there is measurement error inherent in the lipid panel 
assays used to obtain values for the input into the formula. 


Data Description Tables
+++++++++++++++++++++++

The rei_id for LDL is 367.

.. list-table:: Components
   :widths: 15 15 20
   :header-rows: 1

   * - Component
     - ME_ID
     - Notes
   * - Mean exposure 
     - 18822 
     -
   * - Standard deviation 
     - 18823 
     -
   * - Relative risk 
     - 18824 
     - Must be accessed with get_draws 



Validation Criteria
+++++++++++++++++++

1. Does the mean in the model match the mean in GBD? 
2. Does the standard deviation in the model match the standard deviation in GBD? 

References
----------

.. [CDC-LDL-Definition]
	`LDL & HDL: Good & Bad Cholesterol.` Centers for Disease Control and Prevention, Centers for Disease Control and Prevention, 31 Jan. 2020, www.cdc.gov/cholesterol/ldl_hdl.htm. 