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

In GBD, systolic blood pressure is modeled as a continuous variable using ST-GPR based on blood pressure readings from population-based surveys and scientific studies. The quantity of interest is exposure to the mean blood pressure level regardless of whether that level is naturally occurring or occurs via use of medication; we assume full reversibility of risk and do not account for duration of exposure to elevated SBP.  

To account for in-person variation in systolic blood pressure, a “usual blood pressure” adjustment was done. The need for this adjustment has been described elsewhere. Briefly, measurements of a risk factor taken at a single time point may not accurately capture an individual’s true long-term exposure to that risk. Blood pressure readings are highly variable over time due to measurement error as well as diurnal, seasonal, or biological variation. These sources of variation result in an overestimation of the variation in cross-sectional studies of the distribution of SBP.  

To adjust for this overestimation, we applied a correction factor to each location-, age-, time-, and sex-specific standard deviation. These correction factors were age-specific and represented the proportion of the variation in blood pressure within a population that would be observed if there were no within-person variation across time. Four longitudinal surveys were used to estimate these factors: the China Health and Retirement Longitudinal Survey (CHRLS), the Indonesia Family Life Survey (IFLS), the National Health and Nutrition Examination Survey I Epidemiological Follow-up Study (NHANES I/EFS), and the South Africa National Income Dynamics Survey (NIDS). 

The theoretical minimum risk exposure was defined as a range between 110 to 115 mm Hg. This is the same for all risk-outcome pairs. These are listed below: 

.. list-table:: Risk-Outcome Pairs for SBP
   :widths: 11 25
   :header-rows: 1

   * - Risk
     - Outcome
   * - High systolic blood pressure
     - Rheumatic heart disease
   * - High systolic blood pressure
     - Ischemic heart disease
   * - High systolic blood pressure
     - Ischemic stroke
   * - High systolic blood pressure
     - Intracerebral hemorrhage
   * - High systolic blood pressure
     - Subarachnoid hemorrhage
   * - High systolic blood pressure
     - Hypertensive heart disease
   * - High systolic blood pressure
     - Atrial fibrillation and flutter
   * - High systolic blood pressure
     - Aortic aneurysm
   * - High systolic blood pressure
     - Peripheral artery disease
   * - High systolic blood pressure
     - Endocarditis
   * - High systolic blood pressure
     - Other cardiovascular and circulatory diseases (internal)
   * - High systolic blood pressure
     - Chronic kidney diseases due to hypertension
   * - High systolic blood pressure
     - Chronic kidney disease due to glomerulonephritis
   * - High systolic blood pressure
     - Chronic kidney disease due to other and unspecified causes
   * - High systolic blood pressure
     - Other cardiomyopathy
   * - High systolic blood pressure
     - Non-rheumatic calcific aortic valve disease
   * - High systolic blood pressure
     - Chronic kidney disease due to diabetes mellitus type 1
   * - High systolic blood pressure
     - Chronic kidney disease due to diabetes mellitus type 2

[GBD-2019-Capstone-Appendix-SBP]_

Vivarium Modeling Strategy
--------------------------

Mean SBP is a continuous exposure modelled in GBD using an ensemble distribution. SBP will be a target of medication interventions in the simulation; the outcomes affected are described in the overall concept model document.  

For the purposes of our project, we will be using data from the US Health 
Disparities team, which includes US based results instead of global and 
includes race/ethnicity specific estimates. For Phase 1 of the work, we 
will not be using race/ethnicity specific results, but we will for Phase 2. 

For this model, we will use the US Health Disparities team's ensemble distribution. 
This is based on NHANES data and therefore is more US specific than the GBD model. 
The ensemble weights can be found here :code:`/mnt/team/cvd/priv/usa_re/risks/metab_sbp/ensemble/weights.csv`

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

The quantity of interest is exposure to the mean blood pressure level regardless of whether that level is naturally occurring or occurs via use of medication; we assume full reversibility of risk and do not account for duration of exposure to elevated SBP. 

The values for SBP generated include exposures outside of a reasonably expected 
range. In addition, we do not think relative risks continue in a log 
linear pattern indefinitely, as is implemented in this model. A natural ceiling of 
risk associated with a single risk factor probably exists. 

To account for this and allow our model to run, we implemented maximum and minimum 
exposures based on NHANES. The maximum was set to include 99.5% of NHANES data, meaning 
that 0.5% or fewer participants had values more extreme than the maximum. 

The minimum SBP is 50 and the maximum is 200 mmHg. 

Data Description
++++++++++++++++

The rei_id for SBP is 107

.. list-table:: ID Table 
	:widths: 10, 5, 15
	:header-rows: 1

	* - Component
	  - ME_ID
	  - Notes
	* - Mean exposure
	  - 23871
	  - Must use either gbd_round_id=7 and decomp_step=usa_re or release_id=8
	* - Standard deviation
	  - 27049
	  - Must use either gbd_round_id=7 and decomp_step=usa_re or release_id=8
	* - Relative risk
	  - 9030
	  - Must be accessed with get_draws

The exposure values should be used to represent the distribution of mean blood pressure values that the simulants will be assigned in the model. 

Validation Criteria
+++++++++++++++++++

Does the mean in the model match the expected mean? 

Does the standard deviation in the model match the expected standard deviation? 

References
----------

.. [AHA] Understanding Blood Pressure Readings. American Heart Association.
	Retrieved 19 April 2021.
	https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings 

.. [JACC] Bakris, George, Waleed Ali, and Gianfranco Parati. "ACC/AHA versus ESC/ESH on hypertension guidelines: JACC guideline comparison." Journal of the American College of Cardiology 73.23 (2019): 3018-3026.
	Retrieved 19 April 2021.
	https://www.jacc.org/doi/full/10.1016/j.jacc.2019.03.507

.. [GBD-2019-Capstone-Appendix-SBP]
  Appendix_ to: `GBD 2019 Risk Factors Collaborators. Global burden of 87 risk factors in 204 countries and territories, 1990–2019; a systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 17 Oct 2020;396:1223-1249` 
  
.. _Appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30752-2/attachment/54711c7c-216e-485e-9943-8c6e25648e1e/mmc1.pdf
