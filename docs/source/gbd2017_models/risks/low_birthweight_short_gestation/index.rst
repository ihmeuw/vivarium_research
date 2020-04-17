.. _2017_risk_lbwsg:

====================================
Low Birth Weight and Short Gestation
====================================

Risk exposure overview
++++++++++++++++++++++

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

.. image:: Doc - Apr 12 2019 - 9-04 AM.pdf

.. todo::

   These are the Nathaniel's notes, I'm leaving them here for now (NY):

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
   - Copula family and parameters, specifying correlation between gestational age and birth weight
   distributions

Exposure modelling strategy in GBD 2017
---------------------------------------

To model the joint distribution of birth weight and gestational age for every location-sex-year, ensemble
model methods standard to GBD risk factors, are first used to create separate distributions of birth weight and gestational age for every location-sex-year.

**Marginal distributions**
Starting in GBD 2016 with the introduction of the LBWSG risk factors, the full distributions at birth have been modelled for gestational age and birth weight for all GBD locations, estimation years, and both sexes. The gestational age and birth weight distributions are then aggregated into the categorical estimates of <28 weeks, 28 to <32 weeks, 32 to <37 weeks gestation, and <2500g birth weight.

Ensemble model methods standard to GBD are used to model the distribution at birth of gestational age
and birth weight. Gestational age ensemble distribution models use the prevalence of <37 weeks
gestation, the prevalence of <28 weeks gestation, and mean gestational age per each location-year-sex
as inputs into the model. Birth weight distribution models use the prevalence of <2500 grams birth
weight and mean birth weight per each location-year-sex. Prevalence of <37 weeks gestation and of
<2500 grams birth weight was estimated for all location-year-sexes using STGPR modelling processes
standard to GBD.

Global ensemble weights for gestational age were derived by using a 3 million sample of all available
microdata from 11 countries to select the ensemble weights. Of the exponential, gamma, inverse gamma,
Weibull, log normal, and normal distributions, the three distribution families that received the highest
weights were the Weibull (87%), normal (4%), and inverse gamma (4%) distributions. 

Global ensemble weights for birth weight were derived using a 3 million sample of all available microdata from 11 country locations, in addition to birth weight microdata available primarily through the DHS and MICS surveys. Of the exponential, gamma, inverse gamma, Weibull, log normal, and normal distributions, the three distribution families that received the highest weights were the log normal (38%), normal (32%), and
Weibull (20%) distributions.

Ordinary least squares was used to model mean gestational age for all location-year-sexes by regressing
mean gestational age on prevalence of <37 weeks gestation per location-year. All available microdat from the 11 locations was used to fit the model. OLS was also used to model mean birth weight by regressing prevalence of <2500 g birth weight per location-year. All available joint microdata from the 11 country locations, as well as additional birth weight microdata extracted primarily through DHS and MICS surveys, was used to fit the
model. As estimates of prevalence of <37 weeks gestation and prevalence of <2500g birth weight are
available for all location-year-sexes through STGPR models, mean gestational age and mean birth weight
were predicted for all location-year-sexes.

**Joint distributions**
In order to model the joint distribution of gestational age and birth weight from separate distributions,
information is needed about the correlation between the two distributions. Distributions of gestational
age and birth weight are not independent; the Spearman correlation for each country where joint
microdata was available from the 11 locations, pooling across all years of data available, ranged from 0.25-0.49. The overall Spearman correlation was 0.38, pooling across all countries in the dataset. Copula modelling was used to model joint distributions between the birth weight and gestational age marginal distributions.

The joint distribution of birth weight and gestational age per location-year-sex was modelled using the
global copula family and parameters selected and the location-year-sex gestational age and birth weight
distributions. The joint distribution was simulated 100 times to capture uncertainty. Each simulation
consisted of 100,000 simulated joint birth weight and gestational age data points. Each joint distribution was divided into 500g by 2wk bins to match the categorical bins of the relative risk surface. Birth
prevalence was then calculated for each 500g by 2wk bin.

Relative risks estimate in GBD 2017
-----------------------------------

**The available data for deriving relative risk was only for all-cause mortality.** 

For each location, the risk of all-cause mortality at the early neonatal period and late neonatal period at joint birth weight and gestational age combinations was calculated. In all datasets except for the United States, sex-specific data were combined to maximise sample size. The United States analyses were sex-specific. To calculate relative risk at each 500g and 2wk combination, logistic regression was first used to calculate mortality odds for each joint 2-week gestational age and 500-gram birth weight category. Mortality odds were smoothed with Gaussian Process Regression, with the independent distributions of mortality odds by birth weight and mortality odds by gestational age serving as priors in the regression.

A pooled country analysis of mortality risk in the early neonatal period and late neonatal period by SGA
category in developing countries in Asia and Sub-Saharan Africa were also converted into 500-gram and
2-week bin mortality odds surfaces. The relative risk surfaces produced from microdata and the Asia and
Africa surfaces produced from the pooled country analysis were meta-analyzed, resulting in a metaanalysed
mortality odds surface for each location. The meta-analysed mortality odds surface for each
location was smoothed using Gaussian Process Regression and then converted into mortality risk. To
calculate mortality relative risks, the risk of each joint 2-week gestational age and 500-gram birth weight
category were divided by the risk of mortality in the joint gestational age and birth weight category with
the lowest mortality risk.

TMREL in GBD 2017
-----------------
For each of the country-derived relative risk surfaces, the 500 g and 2-week gestational age joint bin
with the lowest risk was identified. This bin differed within each country dataset. To identify the
universal 500 g and 2-week gestational age category that would serve as the universal TMREL, all bins that were identified as the TMREL was chosen. This is cat55 (40-42ga, 3500-400g) and cat56 (40-42ga, 4000-4500g)

.. note::
   the TMREL categories listed in GBD 2017 risk appendix is wrong.  

Causes that are affected by LBWSG
---------------------------------

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
|  383     | Neonatal sepsis and other neonatal infections           |
+----------+---------------------------------------------------------+
|  384     | hemolytic disease and other neonatal jaundice           |
+----------+---------------------------------------------------------+
|  385     | other neonatal disorders                                |
+----------+---------------------------------------------------------+
|  686     | sudden infant death syndrome                            |
+----------+---------------------------------------------------------+

Restrictions
++++++++++++

Assumptions and limitations
+++++++++++++++++++++++++++

Because the relative risks from GBD are for all cause mortality in the early and late neonatal period, we will apply the following equation to calculate all mortality in the early and late neonatal age groups

The all cause mortality rate (ACMR) is comprised of the sum of: 

   - causes that are unaffected by lbwsg 
   - causes that are affected by lbwsg but are NOT modelled (due to some reason we cannot model them)
   - causes that are affected by lbwsg AND modelled 

ACMR =  :math:`\sum\limits_{\text{unaffected_causes}}\text{CSMR} + \sum\limits_{\text{affected_unmodelled_causes}}\text{CSMR} + \sum\limits_{\text{affected_modelled_causes}}\text{CSMR}`

   |  i = low birth weight short gestation category
   |  mr_i = mortality hazard in neonatal period for category i
   |  RR_i = relative risk for all cause mortality in category i
   |  state = either 1 with condition or 0 without condition 

Hence, the mortality hazard for an individual in category i, mr_i, assuming that the relative risks for LBWSG applies only to causes that GBD considers to be affected by LBWSG. :

:math:`\sum\limits_{\text{unaffected_causes}}\text{CSMR} + (ACMR - \sum\limits_{\text{unaffected_causes}}\text{CSMR} - \sum\limits_{\text{affected_modelled_causes}}\text{CSMR} + \sum\limits_{\text{modelled_causes}}\text{EMR_state} \times \text{(1-PAF_mostdetailed)} \times RR_i`

.. note:: 

   PAF in the above equation represents PAFs for most-detailed causes affected by LBWSG (or as calculated in vivarium from LBWSG relative risks).
   
   Description
      o  This approach assumes that relative risks for LBWSG applies only to causes that GBD considers to be affected by LBWSG. 
   
   Strengths
      o  This approach is consistent with GBD methodology and avoids artificially decreasing the mortality rate for individual causes that are not affected by improvements in LBWSG (due to reverse causality or other concerns).
   
   Limitations
      o  This approach applies the LBWSG relative risks in an inconsistent manner with what they represent (ratios of ACMRs). This implies that the relative risks may be different as they relate to the subset of causes that GBD considers affected by LBWSG rather than all causes.
   
   Notably, we are not sure which direction this may bias the results (We would need to evaluate stratified microdata results.)
      o  If the studies from which we obtain our intervention effect sizes includes mortality data due to causes that GBD considers unaffected by LBWSG, then we may be underestimating the impact of the intervention in our model.


Risk Exposure Model Diagram
+++++++++++++++++++++++++++

Data Description Tables
+++++++++++++++++++++++

Validation Criteria
+++++++++++++++++++