.. _2019_risk_exposure_fpg:

======================
Fasting Plasma Glucose 
======================


Risk Exposure Overview
----------------------

Glucose is the primary energy source of the cells of the human body. Homeostasis of glucose metabolism is assessed by measuring plasma glucose levels either by 
measuring fasting plasma glucose (FPG), performing an oral glucose tolerance test (OGTT), or analyzing glycated hemoglobin (HbA1c). These measurements can be used 
to classify subjects as having normal glucose metabolism (FPG <100 mg/dL, OGTT <140 mg/dL, HbA1c <5.7%), impaired glucose metabolism (FPG 100 to <126 mg/dL, 
OGTT 140 to 199 mg/dL, HbA1c 5.7 to 6.4%), or diabetes mellitus (FPG >=126 mg/dL, OGTT >=200 mg/dL, HbA1c >=6.5%). HbA1c is specific for diabetes but not very sensitive 
and has greater utility to monitor diabetes control over 2 to 3 months.

[Normal-FPG-Levels]_


GBD 2019 Modeling Strategy
--------------------------

In GBD, FPG is modeled as a continuous variable using ST-GPR based on estimates of mean FPG in a representative population, individual-level data of fasting plasma glucose measured from surveys, or    
estimates of diabetes prevalence in a representative population. 

Fasting plasma glucose is frequently tested or reported in surveys aiming at assessing the prevalence of diabetes mellitus. In these surveys, the case definition of diabetes may include both a glucose 
test and questions about treatment for diabetes. People with positive history of diabetes treatment may be excluded from the FPG test. Thus, the mean FPG in these surveys would not represent the mean FPG 
in the entire population. In this event, we estimated the prevalence of diabetes assuming a definition of FPG>126 mg/dL (7mmol/L), then crosswalked it to our reference case definition, and then predicted 
mean FPG.   

The theoretical minimum-risk exposure level (TMREL) for FPG is 4.8-5.4 mmol/L for those risk-outcome pairs where risk is assessed on a continuous basis. This was calculated by taking the person-year 
weighted average of the levels of FPG that were associated with the lowest risk of mortality in the pooled analyses of prospective cohort studies. The TMREL is no diabetes for those outcomes where risk 
is assessed on a categorical basis. The risk-outcome pairs are listed below, along with whether they are continuous or categorical.  

[Prospective-cohort-studies]_



.. list-table:: FPG Risk-Outcomes Pairs
   :widths: 15 20
   :header-rows: 1

   * - Type
     - Outcome
   * - Continuous
     - Ischemic heart disease
   * - Continuous
     - Ischemic stroke
   * - Continuous
     - Subarachnoid hemorrhage
   * - Continuous
     - Intracerebral hemorrhage
   * - Continuous
     - Peripheral vascular disease
   * - Continuous
     - Type 1 diabetes
   * - Continuous
     - Type 2 diabetes
   * - Continuous
     - Chronic kidney disease due to Type 1 diabetes
   * - Continuous
     - Chronic kidney disease due to Type 2 diabetes
   * - Categorical
     - Drug-resistant tuberculosis
   * - Categorical
     - Drug-susceptible tuberculosis
   * - Categorical
     - Multidrug-resistant tuberculosis without extensive drug resistance
   * - Categorical
     - Extensively drug-resistant tuberculosis
   * - Categorical
     - Liver cancer due to NASH
   * - Categorical
     - Liver cancer due to other causes
   * - Categorical
     - Pancreatic cancer
   * - Categorical
     - Ovarian cancer
   * - Categorical
     - Colorectal cancer
   * - Categorical
     - Bladder cancer
   * - Categorical
     - Lung cancer
   * - Categorical
     - Breast cancer
   * - Categorical
     - Glaucoma
   * - Categorical
     - Cataracts
   * - Categorical
     - Dementia


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

.. [Normal-FPG-Levels]
    Gurung, Purnima. `Plasma Glucose.` StatPearls [Internet]., U.S. National Library of Medicine, 2 Sept. 2020, www.ncbi.nlm.nih.gov/books/NBK541081/. 

.. [Prospective-cohort-studies]
    Singh GM, Danaei G, Farzadfar F, Stevens GA, Woodward M, Wormser D, et al. (2013) `The Age-Specific Quantitative Effects of Metabolic Risk Factors on Cardiovascular Diseases and Diabetes: A Pooled Analysis.` PLoS ONE 8(7): e65174. https://doi.org/10.1371/journal.pone.0065174