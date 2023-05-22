.. _2019_risk_bmi:

======================================
Body Mass Index
======================================


Risk Exposure Overview
----------------------

Body mass index (BMI) is a person’s weight in kilograms divided by the square of height in meters (weight (kg) / [height (m)]\ :sup:`2`\). BMI is an inexpensive and easy screening method; values are frequently divided into categories: underweight (<18.5 kg/m\ :sup:`2`\), healthy weight (18.5 to 24.9 kg/m\ :sup:`2`\), overweight (25.0 to 29.9 kg/m\ :sup:`2`\), and obese (>=30.0 kg/m\ :sup:`2`\). BMI does not measure body fat directly, but it is moderately correlated with more direct measures of body fat. BMI has also been shown to be correlated with various metabolic and disease outcomes. BMI can be a screening tool, but it does not diagnose the body fatness or health of an individual.
[CDC-BMI]_

Risk Exposures Description
--------------------------

BMI is modeled as a continuous variable using ST-GPR based on measured and self-reported height and weight measurements and sources reporting tabulated BMI categories.  

**Self-report bias adjustment:**\

We included both measured and self-reported data. We tested for bias in self-report data compared to measured data, which is considered to be the gold-standard. For individuals ages 15 and above, we adjusted self-reported data for overweight prevalence and obesity prevalence using sex-specific MR-BRT models on the logit difference between measured and self-reported BMI with a fixed effect on super-region. 

**Prevalence estimation for overweight and obesity:**\

After adjusting for self-report bias and splitting aggregated data into five-year age-sex groups, we used spatiotemporal Gaussian process regression (ST-GPR) to estimate the prevalence of overweight and obesity.  

**Estimating mean BMI:**\

To estimate the mean BMI for adults in each country, age, and sex, over the time period 1980–2019, we first used a nested hierarchical mixed-effects model, fit using restricted maximum likelihood on data from sources containing estimates of all three indicators (prevalence of overweight, prevalence of obesity, and mean BMI), in order to characterise the relationship between overweight, obesity, and mean BMI. We applied 1000 draws of the regression coefficients to the 1000 draws of overweight prevalence and obesity prevalence produced through ST-GPR to estimate 1000 draws of mean BMI for each country, year, age, and sex. This approach ensured that overweight prevalence, obesity prevalence, and mean BMI were correlated at the draw level and uncertainty was propagated. 

**Theoretical minimum risk exposure level:**\

For adults (ages 20+), the theoretical minimum risk exposure level (TMREL) of BMI (20–25 kg/m\ :sup:`2`\) was determined based on the BMI level that was associated with the lowest risk of all-cause mortality in prospective cohort studies. This is the same for all risk-outcome pairs. These are listed below: 

.. list-table:: Risk-Outcome Pairs for BMI
   :widths: 11 25
   :header-rows: 1

   * - Risk
     - Outcome
   * - High Body-Mass Index
     - Esophageal cancer
   * - High Body-Mass Index
     - Liver cancer due to hepatitis B
   * - High Body-Mass Index
     - Liver cancer due to hepatitis C
   * - High Body-Mass Index
     - Liver cancer due to alcohol use
   * - High Body-Mass Index
     - Liver cancer due to other causes (internal)
   * - High Body-Mass Index
     - Breast cancer
   * - High Body-Mass Index
     - Uterine cancer
   * - High Body-Mass Index
     - Colon and rectum cancer
   * - High Body-Mass Index
     - Gallbladder and biliary tract cancer
   * - High Body-Mass Index
     - Pancreatic cancer
   * - High Body-Mass Index
     - Ovarian cancer
   * - High Body-Mass Index
     - Kidney cancer
   * - High Body-Mass Index
     - Thyroid cancer
   * - High Body-Mass Index
     - Multiple myeloma
   * - High Body-Mass Index
     - Ischemic heart disease
   * - High Body-Mass Index
     - Ischemic stroke
   * - High Body-Mass Index
     - Intracerebral hemorrhage
   * - High Body-Mass Index
     - Subarachnoid hemorrhage
   * - High Body-Mass Index
     - Hypertensive heart disease
   * - High Body-Mass Index
     - Atrial fibrillation and flutter
   * - High Body-Mass Index
     - Asthma
   * - High Body-Mass Index
     - Gallbladder and biliary diseases
   * - High Body-Mass Index
     - Alzheimer's disease and other dementias
   * - High Body-Mass Index
     - Chronic kidney disease due to hypertension
   * - High Body-Mass Index
     - Chronic kidney disease due to glomerulonephritis
   * - High Body-Mass Index
     - Chronic kidney disease due to other and unspecified causes
   * - High Body-Mass Index
     - Low back pain
   * - High Body-Mass Index
     - Gout
   * - High Body-Mass Index
     - Cataract
   * - High Body-Mass Index
     - Acute lymphoid leukemia
   * - High Body-Mass Index
     - Chronic lymphoid leukemia
   * - High Body-Mass Index
     - Acute myeloid leukemia
   * - High Body-Mass Index
     - Chronic myeloid leukemia
   * - High Body-Mass Index
     - Other leukemia
   * - High Body-Mass Index
     - Diabetes mellitus type 2
   * - High Body-Mass Index
     - Chronic kidney disease due to diabetes mellitus type 2
   * - High Body-Mass Index
     - Burkitt lymphoma
   * - High Body-Mass Index
     - Other non-Hodgkin lymphoma
   * - High Body-Mass Index
     - Osteoarthritis hip
   * - High Body-Mass Index
     - Osteoarthritis knee

[GBD-2019-Capstone-Appendix-BMI]_

Vivarium Modeling Strategy
--------------------------

Mean BMI is a continuous exposure modelled in GBD using an ensemble distribution. BMI will be a target of lifestyle interventions in the simulation; the outcomes affected are described in the overall concept model document.  

For the purposes of our project, we will be using data from the US Health 
Disparities team, which includes US based results instead of global and 
includes race/ethnicity specific estimates. For Phase 1 of the work, we 
will not be using race/ethnicity specific results, but we will for Phase 2. 

For this model, we will use the US Health Disparities team's ensemble distribution. 
This is based on NHANES data and therefore is more US specific than the GBD model. 
The ensemble weights can be found here :code:`/mnt/team/cvd/priv/usa_re/risks/metab_bmi/ensemble/weights.csv`

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
     - 9
     - [20, 24 years)
   * - Age group end
     - 235
     - [95, 125 years)

Assumptions and Limitations
+++++++++++++++++++++++++++

The quantity of interest is exposure to the mean BMI level; we assume full reversibility of risk and do not account for duration of exposure to BMI values above the range of the TMREL. 

The values for BMI generated include exposures outside of a reasonably expected 
range. In addition, we do not think relative risks continue in a log 
linear pattern indefinitely, as is implemented in this model. A natural ceiling of 
risk associated with a single risk factor probably exists. 

To account for this, we implemented maximum and minimum 
exposures based on NHANES. The maximum was set to include 99.5% of NHANES data, meaning 
that 0.5% or fewer participants had values more extreme than the maximum. 

The minimum BMI is 5 and the maximum is 55. 

Data Description
++++++++++++++++

The rei_id for BMI is 370

.. list-table:: ID Table
   :widths: 10 5 15
   :header-rows: 1

   * - Component
     - ME_ID
     - Notes
   * - Mean exposure
     - 23873
     - Must use either gbd_round_id=7 and decomp_step=usa_re or release_id=8 
   * - Standard deviation
     - 27050
     - Must use either gbd_round_id=7 and decomp_step=usa_re or release_id=8 
   * - Relative risk 
     - 9031
     - Must be accessed with get_draws; adult values 


The exposure and standard deviation values should be used to represent the distribution of mean BMI values that the simulants will be assigned in the model. 


Validation Criteria
+++++++++++++++++++

Does the mean in the model match the expected mean? 

Does the standard deviation in the model match the expected standard deviation? 

References
----------

.. [CDC-BMI] About Adult BMI. Centers for Disease Control and Prevention, Centers for Disease Control and Prevention, 17 Sept. 2020.
	Retrieved 19 April 2021.
	https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/index.html 

.. [GBD-2019-Capstone-Appendix-BMI]
   Appendix_ to: `GBD 2019 Risk Factors Collaborators. Global burden of 87 risk factors in 204 countries and territories, 1990–2019; a systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 17 Oct 2020;396:1223-1249`
  

.. _Appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30752-2/attachment/54711c7c-216e-485e-9943-8c6e25648e1e/mmc1.pdf