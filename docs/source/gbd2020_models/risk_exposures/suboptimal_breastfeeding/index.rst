.. _2020_risk_suboptimal_breastfeeding:

========================
Suboptimal Breastfeeding
========================

Risk Exposure Overview
----------------------
Exposure to suboptimal breastfeeding is composed of two distinct categories: 
non-exclusive breastfeeding and discontinued breastfeeding. 

**Non-exclusive breastfeeding** is defined as the proportion of children under 6 
months of age who are not exclusively breastfed. GBD divides those not exclusively 
breastfed into three categories: predominant, partial, and no breastfeeding.
 - Predominant breastfeeding is the proportion of children whose predominant 
   source of nourishment is breastmilk but also receive other liquids.
 - Partial breastfeeding is the proportion of children who receive breastmilk 
   as well as food and liquids, including non-human milk and formula.
 - No breastfeeding is the proportion of children who do not receive breastmilk 
   as a source of nourishment.

**Discontinued breastfeeding** is defined as the proportion of children between 
6 and 23 months who receive no breastmilk as a source of nourishment. 


Risk Exposures Description in GBD
---------------------------------
In GBD, non-exclusive breastfeeding is modeled as a categorical variable 
(predominant, partial, and none) using ST-GPR based on processed individual-level 
microdata from surveys (e.g., Demographic and Health Surveys, Multiple Indicator 
Cluster Surveys, etc.); in the case where microdata were unavailable, GBD used 
tabulated data from survey reports and scientific literature. Data used to 
categorise type of non-exclusive breastfeeding come from surveys with 24-hour 
dietary logs based on maternal recall.

To generate exposure categories for non-exclusive breastfeeding, GBD converted 
the modelled ratios of exclusive, predominant, and partial breastfeeding to the 
total category prevalence by multiplying each ratio by the estimates of any 
breastfeeding among children aged 0–5 months. This ensured that these categories 
sum correctly to the “any breastfeeding 0–5 months” envelope. GBD calculated the 
proportion of children receiving no breastmilk 0–5 months of age by subtracting 
the estimates of current breastfeeding from 1. They perform the same operation 
to estimate discontinued breastfeeding in the 6-11 months and 12-23 months 
categories.

Exposure modeling strategy
++++++++++++++++++++++++++
GBD generated a complete time series from 1980 to 2022 for the prevalence of 
breastfeeding patterns for children 0 to 5 months and 6 to 23 months using a 
three-step ST-GPR modelling process. In previous GBD rounds, 
[GBD-2019-Capstone-Appendix-Breastfeeding]_ “any breastfeeding” was modelled 
separately for each of the estimated age groups. In GBD 2020 with the addition 
of new under-5 age groups, they incorporated the three age groups into a single 
model of “any breastfeeding.” This allowed them to borrow additional strength 
over space, age, and time by incorporating data from all sources in one model. 
GBD built 6 models to produce each of breastfeeding categories:
 1. proportion of currently breastfeeding infants 0-5 months
 2. proportion of currently breastfeeding infants 6-11 months
 3. proportion of currently breastfeeding infants 12-23 months
 4. ratio of infants exclusively breastfed to any breastfed infants 0-5 months
 5. ratio of infants predominantly breastfed to any breastfed infants 0-5 months
 6. ratio of infants partially breastfed to any breastfed infants 0-5 months

Theoretical minimum risk exposure level
+++++++++++++++++++++++++++++++++++++++
For non-exclusive breastfeeding, children aged 0-6 months who received no source 
of nourishment other than breastmilk ("exclusively breastfed") were considered to 
be at the lowest risk of any of the disease outcomes. For discontinued 
breastfeeding, children aged 6 to 23 months who received any breastmilk as a 
source of nourishment ("any breastfed") were considered to be at the 
lowest risk of disease outcome.

Assment of risk-outcome pairs
+++++++++++++++++++++++++++++

.. list-table:: Risk-Outcome Pairs for Suboptimal Breastfeeding
   :header-rows: 1

   * - Risk
     - Outcome
   * - Non-exclusive breastfeeding
     - Diarrheal disease
   * - Non-exclusive breastfeeding
     - Lower respiratory infection
   * - Discontinued breastfeeding
     - Diarrheal disease

Relative risk
+++++++++++++
GBD estimated relative risks for both non-exclusive and discontinued breastfeeding 
in a meta-analysis using relative risks from studies compiled in a published 
review by WHO. [WHO-Breastfeeding]_ These estimates were produced using the 
"metareg" package in Stata. They did not estimate separate relative risk for 
morbidity and mortality. The values are detailed in table below.

.. list-table:: GBD 2020 Non-exclusive Breastfeeding Relative Risk Estimates
   :header-rows: 1

   * - Outcome
     - Exposure category
     - Morbidity/Mortality
     - Sex
     - Age
     - Value
   * - Diarrheal disease
     - Exclusive breastfeeding
     - Both
     - Both
     - 0-5 months
     - 1.0 (1.0-1.0)
   * - Lower respiratory infection
     - Exclusive breastfeeding
     - Both
     - Both
     - 0-5 months
     - 1.0 (1.0-1.0)
   * - Diarrheal disease
     - Predominant breastfeeding
     - Both
     - Both
     - 0-5 months
     - 2.35 (1.67-3.23)
   * - Lower respiratory infection
     - Predominant breastfeeding
     - Both
     - Both
     - 0-5 months
     - 1.37 (1.06-1.80)
   * - Diarrheal disease
     - Partial breastfeeding
     - Both
     - Both
     - 0-5 months
     - 2.63 (1.94-3.48)
   * - Lower respiratory infection
     - Partial breastfeeding
     - Both
     - Both
     - 0-5 months
     - 1.48 (1.21-1.79)
   * - Diarrheal disease
     - No breastfeeding
     - Both
     - Both
     - 0-5 months
     - 3.60 (2.72-4.70)
   * - Lower respiratory infection
     - No breastfeeding
     - Both
     - Both
     - 0-5 months
     - 1.74 (1.49-2.03)

.. list-table:: GBD 2020 Discontinued Breastfeeding Relative Risk Estimates
   :header-rows: 1

   * - Outcome
     - Exposure category
     - Morbidity/Mortality
     - Sex
     - Age
     - Value
   * - Diarrheal disease
     - Any breastfeeding
     - Both
     - Both
     - 6-23 months
     - 1.0 (1.0-1.0)
   * - Diarrheal disease
     - Discontinued breastfeeding
     - Both
     - Both
     - 6-23 months
     - 1.31 (1.11-1.55)

.. code-block:: Python

  #Relative risks for non-exclusive breastfeeding
  #age_group_id = [3, 388, 389] 
  get_draws("rei_id",
     gbd_id = 136,
     source = "rr", 
     gbd_round_id = 7, 
     decomp_step = "iterative", 
     year_id = 2020)

  #Relative risks for discontinued breastfeeding
  #age_group_id = [388, 389, 238, 34] 
  get_draws("rei_id",
     gbd_id = 137,
     source = "rr", 
     gbd_round_id = 7, 
     decomp_step = "iterative", 
     year_id = 2020)

Population attributable fraction
++++++++++++++++++++++++++++++++
GBD used the standard GBD PAF equation to calculate PAFs for non-exclusive 
breastfeeding and discontinued breastfeeding and each of their paired outcomes 
using exposure estimates, TMREL, and relative risks.

:math:`PAF = \frac{(\sum_{breastfeeding\_category_i} exposure_{i} * RR_{i})-1}{\sum_{breastfeeding\_category_i} exposure_{i} * RR_{i}}`


Vivarium Modeling Strategy
--------------------------
Non-exclusive breastfeeding is an ordered polytomous variable, with a rei_id=136; 
Discontinued breastfeeding is an ordered polytomous variable, with a rei_id=137.

.. todo::
   Describe how we model categorical variable in Vivarium

Restrictions
++++++++++++

.. list-table:: Non-exclusive Breastfeedi