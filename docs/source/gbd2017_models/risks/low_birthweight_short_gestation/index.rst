.. _2017_risk_lbwsg:

====================================
Low Birth Weight and Short Gestation
====================================

Risk exposure overview
++++++++++++++++++++++

Describe this risk

GBD 2017 modelling strategy 
+++++++++++++++++++++++++++

Risk exposure description in GBD 2017
-------------------------------------

The meaning of the “low birth weight” and “short gestation” in GBD have subtle definitional differences
compared to other usages of “low birth weight” and “short gestation” in literature. The term “low birth
weight” has historically been used to refer to birth weight (BW) less than 2500 grams. However, because
the goal of the GBD risk factors analysis is to quantify the entirety of attributable burden due to each
risk factor, the GBD definition of “low birth weight” therefore refers to all birth weight below the
Theoretical Minimum Risk Exposure Level (TMREL) for birth weight. Likewise, new-borns have been
typically been classified into gestational age (GA) categories of “extremely preterm” (<28 weeks of
gestation), “very preterm” (28-<32 weeks of gestation), and “moderate to late preterm” (32-<37 weeks
of gestation). “Short gestation” in GBD refers to all gestational ages below the gestational age TMREL.

Exposures and relative risks for the GBD Low birth weight and short gestation risk factors are divided
into joint 500-gram birth weight and 2-week gestational age combinations. The lowest risk overall 500-
gram/2-week bin is the overall TMREL. The univariate TMRELs vary with GA and BW. The lowest risk GA
varies by BW category and the lowest risk BWs vary with GA category. The latter are used to quantify
univariate attributable risk. Under this framework, all attributable burden under the joint TMREL is
referred to jointly as burden of LBWSG. All attributable burden to BWs under the TMREL for each GA
category are, on aggregate, “low birth weight” and all attributable burden to GAs under the TMREL for
each BW category are, on aggregate, “short gestation.” Each combination of 500-grams and 2-wks is
associated with a relative risk for mortality by neonatal period (early and late neonatal) and by the
causes, and relative to the joint TMREL.

.. todo::

   These are the Nathaniel's notes, I'm leaving them here for now:

   -->Describe the Low Birthweight and Short Gestation risk.  Note that the cause
   :ref:`Neonatal preterm birth complications  <2017_cause_neonatal_preterm>` is
   100% attributable to this risk.

   Create an image like the one posted in
   https://github.com/ihmeuw/vivarium_research/pull/68, showing the actual
   categories used. Note that the above description of 2-week age bins is not
   totally accurate, because it looks like:

   - There are 1-week age bins (36-37 weeks, and 37-38 weeks).
   - There are two categories where the age range is 0-24 weeks (all these
     "extremely extreme" preterm births are grouped together).

How is the exposure estimated in GBD 2017
-----------------------------------------
   
To model the joint distribution of exposure of low birth weight and short gestation for each location,
year, and sex estimated in GBD 2017, three types of information are used:

   - Distribution of gestational age for each location, year, and sex
   - Distribution of birth weight for each location, year, and sex
   - Copula family and parameters, specifying correlation between gestational age and birth weight distributions

Exposure modelling strategy in GBD 2017
---------------------------------------

GBD 2017 creates a joint distribution of birth weight and gestation age to create the low birth weight short gestation risk factor. It takes birth weight and gestational age microdata from 11 locations and uses ensemble model methods standard to GBD risk factors, to first create separate distributions of birth weight and gestational age for every location-sex-year. Then to model the joint distribution of gestational age and birth weight from separate distributions, the Spearman correlation for each country where joint microdata was available was pooled across all years of data available. This ranged from 0.25-0.49. Pooling across all countries in the dataset, the overall Spearman correlation was 0.38. Copula modelling was used to model joint distributions between the birth weight and gestational age marginal distributions. The joint distribution is then divided into 500g by 2wk bins. Birth prevalence was then calculated for each 500g by 2wk bin.

.. image:: lbwsg_categories.svg


Relative risks estimate in GBD 2017
-----------------------------------

**The available data for deriving relative risk was only for all-cause mortality.** For each location, the risk of all-cause mortality at the *early neonatal* period and *late neonatal* period at joint birth weight and gestational age combinations was calculated. In all datasets except for the United States, sex-specific data were combined to maximise sample size. The United States analyses were sex-specific. Relative risks were then calculated for each 500g and 2wk combination.


TMREL in GBD 2017
-----------------
For each of the country-derived relative risk surfaces, the 500 g and 2-week gestational age joint bin with the lowest risk was identified. This bin differed within each country dataset. To identify the
universal 500 g and 2-week gestational age category that would serve as the universal TMREL, all bins that were identified as the TMREL was chosen. This is cat55 (40-42ga, 3500-400g) and cat56 (40-42ga, 4000-4500g)

.. note::
   the TMREL categories listed in GBD 2017 risk appendix are wrong.  

Causes that are affected by LBWSG
---------------------------------

For GBD 2017, the relative risk of all-cause mortality across all available sources was analysed and outcomes based on criteria of biologic plausibility were selected. Some causes, most
notably congenital birth defects, haemoglobinopathies, malaria, and HIV/AIDS, were excluded based on the criteria that reverse causality could not be excluded

+----------+---------------------------------------------------------+
| Cause id | Cause                                                   | 
+==========+=========================================================+
|  302     | diarrheal diseases                                      |
+----------+---------------------------------------------------------+
|  322     | lower respiratory tract infections                      |
+----------+---------------------------------------------------------+
|  328     | upper respiratory tract infections                      | 
+----------+---------------------------------------------------------+
|  329     | otitis media                                            |
+----------+---------------------------------------------------------+
|  333     | pneumococcal meningitis                                 |
+----------+---------------------------------------------------------+
|  334     | H influenzae type B meningitis                          |
+----------+---------------------------------------------------------+
|  335     | meningococcal meningitis                                |
+----------+---------------------------------------------------------+
|  336     | other meningitis                                        |
+----------+---------------------------------------------------------+
|  337     | encephalitis                                            |
+----------+---------------------------------------------------------+
|  381     | neonatal preterm birth complications                    |
+----------+---------------------------------------------------------+
|  382     | neonatal encephalopathy due to birth asphyxia and trauma|
+----------+---------------------------------------------------------+
|  383     | neonatal sepsis and other neonatal infections           |
+----------+---------------------------------------------------------+
|  384     | hemolytic disease and other neonatal jaundice           |
+----------+---------------------------------------------------------+
|  385     | other neonatal disorders                                |
+----------+---------------------------------------------------------+
|  686     | sudden infant death syndrome                            |
+----------+---------------------------------------------------------+

Restrictions
------------

LBWSG risk effect on all-cause moratality only applies to the early neonatal and late neonatal age groups.

+------------------+-------------------------------------------------------+-----------+
| Restriction type | Value                                                 | Notes     |
+==================+=======================================================+===========+
|  Male only       | False                                                 |           |
+------------------+-------------------------------------------------------+-----------+
|  Female only     | False                                                 |           |
+------------------+-------------------------------------------------------+-----------+
|  Age group       | early neonatal (0-6 days)                             | id 2      |
|                  | late neonatal (7-28 days)                             | id 3      |
+------------------+-------------------------------------------------------+-----------+

Vivarium modelling strategy
+++++++++++++++++++++++++++

First, we convert the GBD 500g-2weeks birthweight-ga bins/categories to a joint continuous distribution using Abie's notebook (add link?). We assume a uniform distribution within each bin/category. 

.. note ::
    That this is likely biasing towards overestimating extreme birthweights or gestational ages. For example, in the 0-500g category, most babies are probably pretty close to 500g, not equally probable to be 1 gram versus 499 grams.

Because the relative risks from GBD are for all-cause mortality in the early and late neonatal period, we first define all-cause mortality rate (ACMR) as the sum of: 

   - mortality from causes that are affected by lbwsg and modelled in the sim (green)
   - mortality from causes that are affected by lbwsg but not modelled in the sim (blue)
   - mortality from causes that are unaffected by lbwsg, modelled or not modelled (salmon)

An example of these causes from the :ref:`large-scale-food fortification concept model <2017_concept_model_vivarium_conic_lsff>` concept model diagram is shown below: 

.. image:: causes_equation.svg

All-cause mortality is sum of all cause-specific mortalities: 

   ACMR =  :math:`\sum\limits_{\text{green}}\text{CSMR} + \sum\limits_{\text{blue}}\text{CSMR} + \sum\limits_{\text{salmon}}\text{CSMR}`

The mortality from unmodelled causes affected by lbwsg (blue) is thus: 

   :math:`\sum\limits_{\text{blue}}\text{CSMR}` = ACMR - :math:`\sum\limits_{\text{salmon}}\text{CSMR} - \sum\limits_{\text{green}}\text{CSMR}`

Because we model some of the causes affected by lbwsg, we can use their excess-morality rates (EMR) instead of the average CSMRs: The mortality from modelled causes affected by lbwsg (green):

   - cause-specific mortality if the person who does NOT have the condition: 0
   - cause-specific mortality if the person HAS the condition: EMR of the condition

 
We are interested in applying the PAF and relative risk to only the causes that GBD considers to be affected by lbwsg (green and blue):

   |  i = low birth weight short gestation category
   |  mr_i = mortality hazard in early and late neonatal period for category i
   |  rr_i = relative risk for all cause mortality in category i
   |  state = either 1 with condition or 0 without condition 
   |  PAF* = this is the PAF of the most detailed cause affected by lbwsg

Hence, the mortality hazard for an individual in lbwsg category i is:  

mr_i 

   | = ACMR_i 
   | = (sum of unaffected causes) + affected(sum of unmodelled + sum of modelled) x (1-PAF*) x :math:`rr_i`

= :math:`\sum\limits_{\text{salmon}}\text{CSMR} + (\sum\limits_{\text{blue}}\text{CSMR} + \sum\limits_{\text{green}}\text{EMR_state})\cdot\text{(1-PAF*)}\cdot rr_i`

= :math:`\sum\limits_{\text{salmon}}\text{CSMR} + (ACMR - \sum\limits_{\text{salmon}}\text{CSMR} - \sum\limits_{\text{green}}\text{CSMR} + \sum\limits_{\text{green}}\text{EMR_state})\cdot\text{(1-PAF*)}\cdot rr_i`


.. important :: 

   PAF in the above equation represents PAFs for most-detailed-cause (they are all roughly equal) affected by LBWSG (or as calculated in vivarium from LBWSG relative risks and exposure). This approach assumes that relative risks for LBWSG applies only to causes that GBD considers to be affected by LBWSG (green and blue causes). 

   `lbwsg PAF notebook <https://github.com/ihmeuw/vivarium_data_analysis/blob/master/pre_processing/lbwsg/LBWSG%20exposure%2C%20rrs%2C%20pafs.ipynb>`__.

.. todo ::
   link notebook abie's notebook on continuous conversion of the categories 

   
Assumptions and limitations
+++++++++++++++++++++++++++
 
Strengths

   o  This approach is consistent with GBD methodology and avoids artificially decreasing the mortality rate for individual causes that are not affected by improvements in LBWSG (due to reverse causality or other concerns).
   
Limitations

   o  The risk appendix of GBD 2017 says that the data available to compute the relative risks for the risk exposure lbwsg are for the outcome of all-cause mortality. GBD then decided which causes are responsible for all this mortality from the lbwsg risk. It came up with a list of 15 causes (in blue) and assumes that all of the excess mortality that was measured in the RR's are theoretically all coming from these plausible blue causes. We are choosing to apply the RRs only to this list of lbwsg-affected causes. We believe this is consistent with GBD's approach but may not fully reflect what the RRs capture.

    
.. todo ::
   Notably, we are not sure which direction this may bias the results (We would need to evaluate stratified microdata results.) If the studies from which we obtain our intervention effect sizes includes mortality data due to causes that GBD considers unaffected by LBWSG, then we may be underestimating the impact of the intervention in our model.

   for example: suppose we have a nutritional supplement that impacts lbwsg. This supplement was tested in an RCT in western Kenya where malaria is prevalent. Suppose there is some causal link in both directions between birthweight and malaria. While malaria causes lbw, there might also be some causal pathway that lbw babies are more susepticble to malaria infection. If we improve birthweight in this population due to the supplement, we also decrease incidence of malaria, and decrease mortality from malaria. However, this effect through malaria will not be captured in our model, so our modelled effect on neonatal mortality might be less than the empirial effect of this supplement on neonatal mortality. 


Risk Exposure Model Diagram
+++++++++++++++++++++++++++

Data Description Tables
+++++++++++++++++++++++

Validation Criteria
+++++++++++++++++++