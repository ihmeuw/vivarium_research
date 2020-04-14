.. _2017_concept_model_vivarium_conic_lsff:

=============================================
Vivarium CoNIC Large Scale Food Fortification
=============================================

Model Overview
--------------

Objective
+++++++++

Intervention Definitions
++++++++++++++++++++++++

Questions of Interest
+++++++++++++++++++++

Scope of Modeling
+++++++++++++++++


Concept Model Diagram
---------------------

.. image:: lsff_concept_model_diagram.svg

Model Versions
--------------

.. list-table::
   :header-rows: 1
   
   * - Version
     - Description
     - Done
   * - v1.0_disease_only
     - Model with mortality, morbidity, diarrhea, LRI, measles, and 
       neural tube defects.
     - Yes
   * - v2.0_lbwsg
     - Model v1.0 plus the low birth weight and short gestation risk
       factor.
     - Yes
   * - v3.0_paf_of_one
     - Model v2.0 plus vitamin a deficiency and iron deficiency.
     - Yes
   * - v4.0_folic_acid_fortification
     - Model v3.0 plus folic acid fortification baseline and scale up.
     - Yes
   * - v5.0_vitamin_a_fortification
     - Model v4.0 plus vitamin a fortification baseline and scale up.
     - In progress
   * - v6.0_iron_fortification
     - Model v5.0 plus iron fortification baseline and scale up.
     - Not started
   * - v7.0_scenarios
     - Full model with final stratification and all scenarios.
     - Not started.
   
Model results can be located at 
``/share/costeffectiveness/results/vivarium_conic_lsff`` in the 
appropriate model version directory.
   

Model Components
----------------

Time
++++

* Start and end year: **2020 -- 2025**
* Simulation time step: **1 day** to capture short timeframe of diarrheal
  diseases and neonatal causes

Demographics
++++++++++++

* Locations: **Nigeria, India, Ethiopia**
* Population: **Prospective open cohort of 0-5 year-olds**
* Size of largest starting population: **100,000 simulants**
* Youngest start-age and oldest end-age: **0 -- 5 years**
* Exit age (at what age to stop tracking simulants): **5 years**
* Fertility: **Crude birth rate**

Stratification
++++++++++++++

Stratify by **location, age, sex, and year**.

Scenarios
+++++++++

Simulate five scenarios (each nutrient separately, plus iron and
folic acid together, plus baseline):

#. Baseline (using data on existing coverage of fortification)
#. Vitamin A scale-up
#. Iron scale-up
#. Folic Acid scale-up
#. Iron + Folic Acid scale-up

GBD Causes
++++++++++

* :ref:`Measles <2017_cause_measles>`

* :ref:`Diarrheal Diseases <2017_cause_diarrhea>`

* :ref:`Lower Respiratory Infections <2017_cause_lower_respiratory_infections>`

* :ref:`Neural Tube Defects <2017_cause_neural_tube_defects>`


GBD Risks
+++++++++

* :ref:`Low Birth Weight and Short Gestation (LBWSG) <2017_risk_lbwsg>`

PAF-of-1 Cause/Risk Pairs
+++++++++++++++++++++++++

* :ref:`Vitamin A Deficiency / Vitamin A Deficiency <2017_cause_vitamin_a_deficiency>`

* :ref:`Dietary Iron Deficiency / Iron Deficiency <2017_cause_iron_deficiency>`

Risk-Outcome Relationships
++++++++++++++++++++++++++

Coverage Gap Framework
++++++++++++++++++++++

Effect size stratification for baseline population
--------------------------------------------------

From GBD we obtain mean population values for prevalence of vitamin A deficiency, birth prevalence of neural tube defects, and mean haemoglobin levels. Because we are interested in the effect of fortification and there exists baseline coverage of fortification, we must first stratify our population into those who were covered vs not covered by the forticant of interest. We then need to calculate the risk (prevalence) of vitamin A deficiency, risk (birth prevalence) of neural tube defects, and mean haemoglobin levels by coverage strata. 

This method applies to exposures with dichomotous outcomes such as Vitamin A deficiency or neural tube defects:

We always define the exposure as bad to match GBD 2017 definitions, so relative risks are always >1 

:math:`C_{vita_{baseline}}`: coverage of vitamin A fortified food in the population from the literature that is applied to our sim population at baseline

:math:`P_{exposure_{baseline}}`: 1-:math:`C_{vita_{baseline}}` prevalence of exposure to unfortified foods in our sim population at baseline

:math:`ϴ_{1}`: risk of vitamin A deficiency among those exposed to unfortified foods (bad food) in our sim population

:math:`ϴ_{0}`: risk of vitamin A deficiency among those unexposed to unfortified foods (eats fortified foods) in our sim population

:math:`ϴ_{GBD}`: risk of vitamin A deficiency in GBD population for age, sex, location, year

RR= reciprocal of a <1 effect size (risk ratios of prevalence) = :math:`\frac{1}{\text{0.45(95%CI: 0.19-1.05)}}`

RR= :math:`\frac{ϴ_{1}}{ϴ_{0}}` (we assume this to also be true in our sim population)

PAF= :math:`\frac{P_{exposure_{baseline}}(RR-1)}{1+P_{exposure_{baseline}}(RR-1)}`

1-PAF= :math:`\frac{1}{1+P_{exposure_{baseline}}(RR-1)}`

*Important assumptions and limitations* This equation for PAF is valid under the assumption of no confounding. An alternate equation for PAF should be used when to get an unbiased PAF in the presence of confounding; however, we will need the attributable fraction in the exposed which we do not readily have. Hence this is a limitation. The RRs we use, and the exposure % we use are approximating the PAFs. We make the assumption that the RRs pulled from literature is generalizable. 

.. todo::

   reference Darrow and Steenland. Confounding and bias in the attributable fraction. *Epidemiology*. 2011 Jan;22(1):53-8. doi: 10.1097/EDE.0b013e3181fce49b.


risk in (1-:math:`C_{vita}`), exposed group: :math:`ϴ_{1}= ϴ_{GBD}*(1-PAF)*RR` … equation 1

risk in (:math:`C_{vita}`), unexposed group: :math:`ϴ_{0}= ϴ_{GBD}*(1-PAF)` … equation 2

**How to apply the intervention**: the intervention increases the population coverage of vitamin A fortified food, this value --> :math:`C_{vita}`, and shifts the amount of people who receive equation 1 to equation 2. 

Interventions
+++++++++++++

Vitamin A Fortification
~~~~~~~~~~~~~~~~~~~~~~~

Effect Size
^^^^^^^^^^^

**Research Considerations**

In this model, the vitamin A fortification intervention affects the 
**prevalence of vitamin A deficiency**. The effect size for this intervention 
was obtained from a Cochrane review performed by Hombali et al. (2019) on the 
fortification of staple foods with vitamin A for vitamin A deficiency. 
Notably, the relative risk for vitamin A foritification on vitamin A 
deficiency from this review only included data from two randomized controlled 
trials and the authors of the review assessed the certainty of the evidence to 
be "very low" (Hombali et al. 2019). The relative risk of vitamin A deficiency 
prevalence among an intervention population exposed to vitamin A fortified 
staple foods relative to a control population given the same staple foods not 
fortified with vitamin A from this review was **0.45 (95% CI: 0.19 - 1.05)**.

Therefore, we conducted a supplementary analysis of the effect of the 
intervention by pooling the RCT studies from the Cochrane review with studies 
included in the systematic review and meta-analysis performed by Keats et al. 
(2019). Notably, none of the studies identified from the Keats et al. (2019) 
review *directly* reported measures of relative risk of vitamin A deficiency 
prevalence among the population exposed to vitamin A fortification relative to 
the population unexposed to vitamin A fortification. Therefore, we manually 
calculated this value based on data reported in study tables and figures, 
which required visual approximations of certain values. Notably, when this 
supplementary meta-analysis was performed, the resulting relative risk was 
calcualted as **0.43 (95% CI: 0.28 - 0.65)**. However, when limited to sugar 
and oil vehicles for the vitamin A forticant, the relative risk was **0.36 
(95% CI: 0.26 - 0.50)**. These two supplementary meta-analyses are represented 
in the forest plots below. 

.. image:: vitamin_a_meta.png

.. image:: vitamin_a_meta_sugar_oil.png

While the supplementary meta-analysis shown above contains more studies and 
data than the Cochrane review, it relies on results that were not directly 
reported in the individual studies (and in some cases visaully estimated 
values). **Therefore, we will conservatively use the results from the Cochrane 
review, with increased certainty in the results based on the confirmatory 
results from the supplementary meta-analysis.**

Notably, all of these studies included in the supplementary analysis were 
conducted among children. Additionally, the study locations included 
Guatemala, South Africa, Nicaragua, Indonesia, and the Phillipines. Therefore, 
we concluded that it is **reasonable to assume generalizability of these 
results to our model populations.**

Regarding effect sizes in young age groups, Sandjaja et al. (2015) reported 
that population vitamin A fortification improved serum retinol concentrations 
among infants aged 6-11 months. Therefore, **we assumed that the effect size 
from the Cochrane review applies to all age groups above six months of age.** 

	Notably, the effect can occur either through the direct consumption of 
	vitamin A fortified foods or through the consumption of breastmilk from 
	mothers who consume vitamin A fortified foods (Sandjaja et al. 2015; WHO 
	Guidelines).

For individuals aged between 0 and six months, we made the following 
assumptions:

	1. Maternal consumption of vitamin A fortified foods has no effect on 
	infant vitamin A deficiency birth prevalence. This assumption is supported 
	by studies performed by Dror and Allen (2018).

	2. Maternal consumption of vitamin A fortified foods has no effect on 
	infant vitamin A deficiency from 0 to six months of age. This assumption 
	is largely supported by the vitamin A *supplementation* literature among 
	these age groups and is reflected in WHO guidelines (WHO Guideline: 
	Vitamin A Supplementation in Infants 1-5 Months of Age).

Additionally, we made assumptions regarding the response time following the 
onset of exposure to vitamin A fortification, including:

	1. Individuals will exhibit a response in vitamin A deficiency to vitamin 
	A fortification between appoximately 2 and 12 months after onset of 
	exposure to vitamin A fortification. There was sparce data available for 
	the response time to vitamin A fortification, so we used data on the 
	response time to vitamin D (another fat-soluble vitamin) supplementation 
	as a proxy. The literature larely indicated that response to vitamin D 
	supplementation plateaus between 2 and 12 months (Heaney et al. 2008; 
	Vieth 1999; Taalat et al. 2016; ADDITIONAL). We assumed that the 
	distribution of response times follows a lognormal distribution with a 
	median value of five months, a 0.025 percentile of 2 months, and a 0.975 
	percentile of 12 months.

 	2. If an individual was covered by baseline coverage of vitamin A 
 	fotification, we assumed that the individual was covered (via breastmilk 
 	or direct consumption) for long engough to exhibit a response (at least 12 
 	months).

 .. todo::

 	Add more detail regarding the time to response.

**Effect Size**

In our Vivarium simulation, the effect of exposure foods **not** fortified 
with vitamin A on the prevalence of vitamin A deficiency realtive to those 
exposed to vitamin A fortified foods will be represented as follows: 

.. math::

  RR = \frac{P(\text{VAD prevalence} \mid \text{no fortification})}
  {P(\text{VAD prevalence} \mid \text{fortification})}
  \approx \frac{1}{0.45\: (0.19, 1.05)}
  \approx 2.22\: (0.95, 5.26).

.. note::

	We are modeling the reciprocal of the relative risk reported in the 
	Cochrane review.

	Additionally, this effect size crosses the null, and therefore, in some 
	draws it will cause increasing coverage of the intervention to *increase* 
	vitamin A deficiency prevalence. This is a limitation caused by the low 
	quality evidence regarding the relative risk of vitamin A fortification on 
	vitamin A prevalence. However, on average, increasing coverage of vitamin 
	A fortification will decrease VAD.

To model the uncertainty in this estimate, the above RR should be drawn from a
`lognormal <https://en.wikipedia.org/wiki/Log-normal_distribution>`_
distribution with median = 2.22, 2.5\ :superscript:`th`-percentile = 0.95, and
97.5\ :superscript:`th`-percentile = 5.26. This distbibution can be created
using `SciPy's lognorm function
<https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.lognorm.html>`_
as follows:

.. code-block:: Python

  from numpy import log
  from scipy.stats import norm, lognorm

  # median and 0.975-quantile of lognormal distribution for RR
  median = 2.22
  q_975 = 5.26

  # 0.975-quantile of standard normal distribution (=1.96, approximately)
  q_975_stdnorm = norm().ppf(0.975)

  mu = log(median) # mean of normal distribution for log(RR)
  sigma = (log(q_975) - mu) / q_975_stdnorm # std dev of normal distribution for log(RR)

  # Frozen lognormal distribution for RR, representing uncertainty in our effect size
  # (s is the shape parameter)
  rr_distribution = lognorm(s=sigma, scale=median)

.. note::

	I copied this from Nathaniel's documentation for the folic acid RR, but I 
	think that the same approach is appropriate. Perhaps we can eventually 
	create a separate page that lists similar strategies that we can reference 
	via links.

**Time to Response**

Further, the time-to-response to vitamin A fortification in years should also 
be sampled such that:

.. code-block:: Python

	from numpy import log
	from scipy.stats import norm, lognorm

	# median and 0.975-quantile of lognormal distribution for RR
	median = 5/12
	q_975 = 12/12

	# 0.975-quantile of standard normal distribution (=1.96, approximately)
	q_975_stdnorm = norm().ppf(0.975)

	mu = log(median) # mean of normal distribution for log(RR)
	sigma = (log(q_975) - mu) / q_975_stdnorm # std dev of normal distribution for log(RR)

	# Frozen lognormal distribution for RR, representing uncertainty in our effect size
	# (s is the shape parameter)
	response_time_distribution = lognorm(s=sigma, scale=median)

**Population Coverage Data**

The coverage algorithm for vitamin A fortification should follow the same approach described 
in this concept model document for folic acid fortification (see `Population Coverage Data`_).

.. list-table:: Means and 95% CI's for existing population coverage of vitamin A fortification (% of total population)
  :widths: 5 5 5 5
  :header-rows: 1

  * - Location
    - :math:`a` = Eats fortified vehicle
    - :math:`b` = Eats fortifiable vehicle
    - :math:`c` = Eats vehicle
  * - Ethiopia
    - 1.0 (see below)
    - 44 (34, 54)
    - 55 (45, 65)
  * - India
    - 24.3 (21.1, 27.9)
    - 89.4 (87.0, 91.8)
    - 100 (100, 100)
  * - Nigeria (Kano)
    - 7.6 (5.9, 9.4)
    - 35.9 (32.7, 39.1)
    - 98.4 (97.6, 99.3)
  * - Nigeria (Lagos)
    - 7.2 (5.5, 8.9)
    - 22.7 (19.9, 25.5)
    - 98.6 (97.8, 99.3)

For all values other than :math:`a` for Ethiopia, use a Beta distribution 
with mean equal to the central estimate, and variance equal to the variance of 
a normal distribution with the same mean and 95% confidence interval. 

For the :
math:`a` value for Ethiopia, assume the following: 

.. math::

  a_\textit{Ethiopia} \sim \operatorname{Beta}(0.1,9.9),\quad

The mean of this `Beta distribution
<https://en.wikipedia.org/wiki/Beta_distribution>`_ will have the value shown
in the table. The density has an asymptote at 0 and an x-intercept at
1. The mean value for this parameter was chosen so that the mean of 
existing fortification coverage is close to 0 (in a similar approach to 
existing coverage of folic acid in Ethiopia).

.. todo::

	Cite Ethiopia data source (Assessment of Feasibility and Potential 
	Benefits of Food Fortification. Addis Ababa : Government of the 
	Federal Democratic Republic of Ethiopia, 2011).

**Effect of Intervention on Simulants**

As described in the research considerations section, the 
intervention effect is dependent on age and time since intervention coverage.

For simulants covered by *baseline coverage*, the effect of the 
vitamin A fortitication is determined as follows:

.. code-block:: Python
  
  # draw level
  
  rr = rr_distribution.rvs()

  # individual level

  if age_i < 0.5:
  	rr_i = 1
  else:
  	rr_i = rr_distribution.rvs()

For simulants covered by the *intervention scale-up*, the effect of the 
vitamin A fortitication is determined as follows:

.. code-block:: Python

  # draw level

  rr = rr_distribution.rvs()

  # individual level

  response_time_i = response_time_distribution.rvs()

  if age_i < 0.5 or random_number_i > coverage(t - response_time_i)):
  	rr_i = 1
  else:
  	rr_i = rr

Where,

	- **age_i** = age of simulant in years

	- **rr_i** = relative risk to be applied to an individual simulant

	- **rr_distribution** = distribution for the relative risk of the intervention, as described above

	- **response_time_distribution** = distribution for the response time to the intervention, as described above

	- **response_time_i** = response time to the intervention assigned to an individual simulant

	- **coverage(t - response_time_i)** = population coverage of vitamin A fortification X years prior to the current time-step, where X is response_time_i

	- **random_number_i** = independent random number between 0 and 1, assigned to a simulant 

Therefore, the probability that a simulant has vitamin A deficiency should be evaluated as:

	vitamin_a_deficiency_prevalence * (1 - PAF) * rr_i

Where, 

	- PAF is computed based on the RR for vitamin A fortification

	- rr_i is the relative risk assigned to the individual simulant

The pseudo-code used to implement the vitamin A intervention effect in Vivarium is shown below:


.. code-block:: Python

	# Definitions
	effectively_covered := individual is recieving fortification and it is affecting their 
					probability of being vitamin a deficient.
	t                   := current time

	# Population level params
	rr                = 1 if under 6 months, else 2.22 (or whatever)
	coverage(t)       = baseline coverage of vitamin a fortification
	exposure(t)       = baseline exposure to lack of vitamin a fortification 
	                  = 1 - coverage(t)
	delta_coverage(t) = intervention shift in baseline coverage of vitamin a fortification
	coverage*(t)      = coverage(t) + delta_coverage(t)
	exposure*(t)      = 1 - coverage*(t)
	time_lag          = time from when an individual starts eating fortified 
				food until the effect is present
	mean_rr(t)        = rr * exposure(t) + 1 * (1 - exposure(t))
	paf(t)            = (mean_rr(t) - 1)/mean_rr(t)
	p_gbd(t)          = vitamin a deficiency exposure

	# Individual attributes
	qx_i           = propensity for an indidual to receive vitamin a fortification
	x_i(t)         = whether an individual is receiving vitamin a fortification
	               = qx_i > exposure*(t) 
	               = qx_i < coverage*(t)   
	tx_i           = time at which individual started receiving fortification
	               = argmin_t(x_i(t) == True)

	# Note this definition of eff_x_i depends on coverage*(t) weakly monotonically increasing
	eff_x_i(t)     = whether an individual is effectively covered
	               = (t - tx_i) > time_lag
	qp_i           = propensity for an individual to be vitamin a deficient
	rr(eff_x_i(t)) = 1 if eff_x_i(t) else rr
	p_i(t)         = probability individual is vitamin a deficient
	               = p_gbd(t) * (1 - paf(t)) * rr(eff_x_i(t))
	y_i(t)         = whether an individual is vitamin a deficient
	               = qp_i < p_i(t)

.. note::

	Perhaps need to make coverage inclusive such that: qx_i > exposure*(t) and qx_i >= coverage*(t) for future model runs

Iron Fortification
~~~~~~~~~~~~~~~~~~

Population Coverage Data and Coverage Algorithm - Iron
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The baseline coverage for iron fortification is the same as the baseline 
coverage for folic acid fortification, as described below_. Additionally, the 
coverage algorithm should be implemented in the same way as  for folic acid
fortification, as described here_.

Notably, iron and folic acid coverage should be correlated as specified under 
the following scenarios:

- **Baseline coverage**: baseline iron and folic acid fortification coverage should be perfectly correlated so that exactly the same simulants are covered by each forticant

- **Scale-up of iron fortification**: zero correlation of scaled-up *intervention* coverage (although baseline coverage remains perfectly correlated)

- **Scale-up of folic acid fortification**: zero correlation of scaled-up *intervention* coverage (although baseline coverage remains perfectly correlated)

- **Scale-up of iron + folic acid fortification**: both baseline and scaled-up intervention coverage of iron and folic acid fortification are perfectly correlated so that exactly the same simulants are covered by each forticant

.. note:: 

	A limitation of our population coverage data is that we assume no baseline 
	iron fortification occurs in the absence of folic acid fortification and 
	vice versa.

Effect Size - Iron
^^^^^^^^^^^^^^^^^^

Iron fortification of staple food affects two outcomes in our simulation 
model. The first outcome is an individual's hemoglobin concentration following 
the *direct* consumption of iron fortified foods. The second outcome is a 
simulant's birth weight following the *maternal* consumption of iron fortified 
foods.

**Hemoglobin Level**

The effect of iron fortified food consumption on children under 7 years of age 
was obtained from the Keats et al. systematic review. However, the effect size 
in this review was reported in standardized mean differences rather than in 
units of hemoglobin concentration directly. Therefore, we performed a separate 
meta-analysis of the results included in the Keats et al. review to obtain shifts 
in hemoglobin concentration. This meta-analysis is shown below.

.. image:: iron_meta.png

Notably, the above changes in hemoglobin concentration are shown in grams per 
*deciliter* (dL); however, GBD models hemoglobin concentration as grams per 
*liter* (L). Therfore, the effect size used in our simulation model should be 
**+3.0 (95% CI: -0.2, +6.1)** grams of hemoglobin per liter of blood. This 
effect size should be interpreted as the population mean shift in hemoglobin 
concentrations among children less than seven years old in LMICs following 
iron fortification of staple foods. 

.. note:: 

	The confidence interval for this effect size includes the null (0), 
	indicating that for some individual simulation draws, the intervention 
	effect may *decrease* population mean hemoglobin concentrations. However, 
	*on average*, the effect of the intervention will increase population mean 
	hemoglobin levels.

To model the uncertainty in the estimate, the above mean difference (MD) 
should be drawn from a normal distribution with mean = 3.0, 2.5\ :superscript:`
th`-percentile = -0.2, and 97.5\ :superscript:`th`-percentile = 6.1. This 
distbibution can be created using `SciPy's norm function
<https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.norm.html>`_
as follows:

.. code-block:: Python

	from scipy.stats import norm

	# mean and 0.975-quantile of normal distribution for mean difference (MD)
	mean = 3
	q_975 = 6.1

	# 0.975-quantile of standard normal distribution (=1.96, approximately)
	q_975_stdnorm = norm().ppf(0.975)

	std = (q_975 - mean) / q_975_stdnorm # std dev of normal distribution

	# Frozen normal distribution for MD, representing uncertainty in our effect size
	hb_md_distribution = norm(mean, std)

.. note::

	This distirbution is slightly shifted to the right (0.025 percentile is 
	equal to -0.1, rather than -0.2) due to rounding approximations in the 
	meta-analysis for the effect size causing a slightly non-symmetrical 
	confidence interval around the mean.

**Birth Weight**

The effect of maternal consumption of iron fortified food on infant birth 
weight was obtained from Haider et al. (BMJ 2013). According to this data 
source, birth weight among babies born to mothers increased, on average, by 
15.1 grams (95% CI: 6.0, 24.2) per 10 mg of daily iron consumption. The 
distribution of the parameter should be modeled as follows:

.. code-block:: Python

	from scipy.stats import norm

	# mean and 0.975-quantile of normal distribution for mean difference (MD)
	mean = 15.1
	q_975 = 24.2

	# 0.975-quantile of standard normal distribution (=1.96, approximately)
	q_975_stdnorm = norm().ppf(0.975)

	std = (q_975 - mean) / q_975_stdnorm # std dev of normal distribution

	# Frozen normal distribution for MD, representing uncertainty in our effect size
	bw_md_distribution = norm(mean, std)

	# random sample from effect size distribution
	bw_md_per_10_mg_iron = bw_md_distribution.rvs()

.. note::

	The Haider et al. 2013 paper did not report if the dose of iron was measured as elemental iron or as an iron compound such as NaFeEDTA  (sodium ferric ethylenediaminetetraacetate). We operated under the  assumption that 10 mg of daily iron consumption, as referenced in the Haider paper, represented 10 mg of *elemental* iron.

Therefore, we investigated the amount of daily iron consumption that a 
pregnant mother would likely consume through iron fortification of staple 
foods in our locations of interest in order to scale the effect size 
accordingly. See the table below:

.. list-table:: Daily Iron Consumption Parameters
  :widths: 5 5 5
  :header-rows: 1

  * - Location
    - Concentration of forticant in flour
    - Amount of fortifiable flour consumed daily
  * - Ethiopia
    - 30 mg iron as NaFeEDTA / kg flour  [1]; use point value
    - 100 g (IQR: 77.5, 200) [2]; sample from distribution described below
  * - India
    - 14 to 21.25 mg iron as NaFeEDTA / kg flour [1]; sample from uniform distribution with range: 14 - 21.25
    - 100 g (IQR: 77.5, 200) [2*]; sample from distribution described below
  * - Nigeria
    - 40 mg iron as NaFeEDTA / kg flour [1]; use point value
    - 100 g (IQR:77.5, 200) [2*]; sample from distribution described below

.. note::

  While there was data for the concentration of iron forticants other
  than NaFeEDTA for the locations in this table, we conservatively chose 
  to use the concentrations of the NaFeEDTA forticant. This is because the
  concentration of elemental iron in flour is lower when the NaFeEDTA 
  forticant is used compared to other forticants.

  We assumed that the concentrations listed in the 
  [Global-Fortification-Data-Exchange]_ represented miligrams of 
  *elemental iron as NaFeEDTA* per kilogram of flour rather than miligrams of 
  NaFeEDTA per kilogram of flour. While this was not explicitly stated on the 
  [Global-Fortification-Data-Exchange]_, the available literature suggests 
  that this is the measurement convention and is consistent with typical doses 
  of iron via fortification using NaFeEDTA [Hurrell-et-al-2010]_.

[1] `Global Fortification Data Exchange <https://tinyurl.com/wka9mgh>`_

[2] `Ethiopian National Food Consumption Survey <https://www.ephi.gov.et/images/pictures/National%20Food%20Consumption%20Survey%20Report_Ethiopia.pdf>`_ (table 18; women)

*In the absence of better data, we assumed that individuals in Nigeria and 
India consumed the same amount of fortifiable flour per day as individuals in 
Ethiopia.

.. todo:: 

	Find better data and replace values for flour consumption per day for 
	Nigeria and India.

The amount of elemental iron consumed daily, in miligrams per person, (at the 
draw level) should be calculated as such (where X is mg iron as NaFeEDTA per kg of flour and Y is grams of flour consumed daily per person, as defined in the table above):

.. math::

	\frac{\text{X mg iron as NaFeEDTA}}{\text{kg flour}} * \frac{\text{Y g flour }}{\text{person}} * \frac{\text{1 kg flour}}{\text{1,000 g flour}} 

First, we must sample values from the distribution of the amount of flour 
eaten per day *at the individual simulant level*. We chose to sample at the 
individual simulant level rather than the draw level because the underlying 
data from the `Ethiopian National Food Consumption Survey <https://www.ephi.gov.et/images/pictures/National%20Food%20Consumption%20Survey%20Report_Ethiopia.pdf>`_ 
represented variation in individual consumption rather than uncertainty around 
a population mean value. The survey reported that the median daily consumption 
was 100 g (IQR: 77.5, 200). We assumed that the minumum and maximum values in 
the distribution (which were not directly reported) were zero and 350.5 grams 
(75th percentile for the region with the highest value for this parameter). 
Additionally, we assumed that the values followed a uniform distribution 
within each quartile of consumption. Values should be sampled as described 
below:

.. code-block:: Python

  import numpy as np

  q0 = 0
  q1 = 77.5
  q2 = 100
  q3 = 200
  q4 = 350.5

  random_number_i = np.random.uniform(0,1)

  if random_number_i =< 0.25:
    daily_flour_consumption_i = np.random.uniform(q0,q1)
  elif random_number_i =< 0.5:
    daily_flour_consumption_i = np.random.uniform(q1,q2)
  elif random_number_i =< 0.75:
    daily_flour_consumption_i = np.random.uniform(q2,q3)
  else:
    daily_flour_consumption_i = np.random.uniform(q3,q4)

Next, the amount of elemental iron ingested by an individual simulant should 
be calculated as follows:

.. code-block:: Python

  # daily_flour_consumption_i : value from above code block
  # iron_concentration_in_flour : location-specific value from table above

  elemental_iron_consumed_per_day_i = (daily_flour_consumption_i 
      * iron_concentration_in_flour / 1_000)

Then, the specific effect size of iron fortification on low birth weight can 
be calculated as follows (where Z is the location-specific amount of elemental 
iron in miligrams, as calculated from the equation above):

.. math::

	\text{Z mg iron consumed daily} * \frac{\text{15.1 g (95% CI 6.0 - 24.2) BW increase}}{\text{10 mg iron consumed daily}} 

.. code-block:: Python

	# bw_md_per_10_mg_iron : defined above (random sample from effect size distribution)
	# elemental_iron_consumed_per_day_i : defined above ( iron consumed per day in mg)

	bw_shift_i = elemental_iron_consumed_per_day_i * bw_md_per_10_mg_iron / 10

See the following section to see if/how to apply the *bw_shift_i* parameter to 
individual simulants.

Determining Whether A Simulant is Affected - Iron
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Hemoglobin Level**

For the purposes of our simulation, we made a few assumptions:

1. We assumed that simulants only received an effect from iron fortification 
on their hemoglobin levels if they directly consumed iron fortified foods and 
that they received no effect of iron fortification on their hemoglobin levels 
from maternal consumption of iron fortified foods (although maternal
consumption of iron fortified foods affects infant birth weight).

2. We assumed that simulants begin to eat staple foods as a supplement to 
breast milk consumption at the age of six months and that the quantity of 
staple foods consumed as a proportion of total consumption increases linearly 
from six months to two years of age, at which point it reaches its peak and 
then remains constant.

3. We assumed that the full effect of the iron fortification 
intervention takes six months to achieve and that the effect scales up in a 
linear fashion between the onset of exposure and six months post exposure. 
This is likely a conservative assumption, as there is evidence (Andersson et 
al. 2010) that the true curve increases more steeply at first, then levels off 
before reaching the full effect at six months. Thus, the measured response 
curve is concave down, and our linear approximation lies entirely below this 
curve -- it is the secant line to the curve, with slope equal to the average 
rate of increase over the 6 month interval. 

4. We assumed that all individuals covered by baseline coverage of iron 
fortification have been covered for at least six months and therefore have 
already achieved the full effect of the intervention.

.. todo::

	Add justification and references to support for these assumptions. (Andersson et al. 2010, WHO guidance, and Diana et al. 2010/Plos One)

Therefore, the effect size of iron fortification on a simulant's hemoglobin 
level **in the baseline scenario** should be determined as follows:

.. code-block:: Python
	
	# at the draw level
	MD = hb_md_distribution.rvs() # mean difference in hemoglobin concentration due to iron fortification
		# note, hb_md_distribution defined above in the effect size section

	# at the individual simulant level
	if age_i < 0.5:
		md_i = 0
	elif age_i < 2:
		md_i = MD * (age_i - 0.5) / 1.5
	else: 
		md_i = MD

The effect size of the iron fortification on a simulant's hemoglobin level for 
new **intervention** coverage of iron fortification should be determined as 
follows: 

.. code-block:: Python
	
	# MD = hb_md_distribution.rvs() : full effect size at the draw level 
		# (mean difference in hemoglobin concentration due to iron fortification)
	# md_i : effect size for an individual simulant at a given time-step, 
		# dependent on age and time since coverage
	# age_i : simulant age in years
	# age_of_coverage_i : age at which simulant gained coverage access in years
	# time_since_coverage_i : age_i - age_of_coverage_i
	# age_of_coverage_i / 1.5 : fraction of full effect that will be achieved 
		# in six months since onset of coverage access, dependent on 
		# age_of_coverage_i [(age_of_coverage - 0.5 + 0.5) / (2 - 0.5)]
	# time_since_coverage_i / 0.5 : fraction of effect that will be achieved 
		# at six months post onset of coverage access, dependent on 
		# time_since_coverage_i
	# (age_i - 0.5) / 1.5 : fraction of full effect, dependent on age

	# at the individual simulant level
	if age_i < 0.5:
		md_i = 0
	if age_i > 0.5 and age_of_coverage < 1.5 and time_since_coverage_i < 0.5: 
		md_i = MD * age_of_coverage_i / 1.5 * time_since_coverage_i / 0.5
	if age_i > 0.5 and age_of_coverage < 1.5 and time_since_coverage_i >= 0.5: 
		md_i = MD * (age_i - 0.5) / 1.5
	if age_i > 0.5 and age_of_coverage >= 1.5 and time_since_coverage_i < 0.5: 
		md_i = MD * time_since_coverage_i / 0.5
	else:
		md_i = MD

See below for a visual representation:

.. image:: iron_effect_scale_up.svg

**Birth Weight** 

Our model will apply the effect size of maternal consumption of iron fortified 
foods on infant birth weight under the following assumptions:

1. Maternal consumption of iron fortified foods must begin at week 20 
(CI: 8 - 28) of gestation and continue for a minimum of seven weeks in 
order to impact infant birth weight. This assumption is based on the studies
included in [Haider-et-al-2013]_ that evaluated birth weight as an outcome.
These studies initiated iron supplementation between approximately 8 and 28 
weeks of gestation, with most studies initiating approximately at week 20 of 
gestation. Additionally, [Haider-et-al-2013]_ found that supplementation 
duration did not affect the relationship between maternal iron consumption 
and birth weight after adjusting for dose; however, the minimum duration of 
iron consumption in the studies included in [Haider-et-al-2013]_ was seven
weeks, so we used this as the lower bound of necessary duration for our model.

2. We assumed that each simulant was born at 40 weeks of gestation.

.. todo::

	Update this assumption pending confirmation to model gestational age 
	(Nathaniel will follow-up).

3. A simulant's birth weight will affect their all-cause mortality rate
during the early and late neonatal periods only. This assumption is a 
product of assumptions made in the modeling of the low birth weight and 
short gestation (LBWSG) risk factor in GBD. 

.. todo::

	Cite the LBWSG risk factor page once created.

Therefore, for our simulation, an infant's mother must have gained coverage 
to iron fortified foods at least **twenty weeks prior to the birth of the 
infant** in order for the iron fortification coverage to affect the infant's 
birth weight.

.. note:: 

  The following was adopted from Nathaniel's description for folic acid.

1.  **Define variables:** Each simulant needs an attribute
    `mother_ate_iron_fortified_food`, which will be `True` if the simulant's
    mother ate iron fortified food starting at least twenty weeks (0.384 years) 
    before the simulant was born, `False` if not, and `Unknown` if we don't 
    know.

2.  **Initialize the simulation:** At the start of the simulation for the early 
    neonatal and late neonatal age groups (IDs 2 and 3), set 
    `mother_ate_iron_fortified_food = True` for a proportion of the population 
    equal to baseline coverage of iron fortification at simulation start, 
    :math:`C(0)`. Set `mother_ate_iron_fortified_food = False` for a proportion 
    of the population equal to 1 - baseline coverage of iron fortification at 
    simulation start, :math:`1 - C(0)`. Set
    `mother_ate_iron_fortified_food = Unknown` for all simulants in the 
    post-neonatal and 1-4 year age groups (age_group_ids 4 and 5); 
    this attribute will not be used for these age groups because the 
    LBWSG risk factor does not apply.

3.  **Initialize simulants born into the simulation:** For each simulant born
    at time :math:`t` (in years), the probability that the simulant's mother
    started eating iron-fortified food at nine months prior is equal to the
    population coverage nine months prior, :math:`C(t-0.384)`. Therefore, upon 
    the simulant's birth, do the following:

  a.  Generate a uniform random number :math:`u\sim
      \operatorname{Uniform}([0,1])`.

  b.  If :math:`u<C(t-0.384)`, `mother_ate_iron_fortified_food = True`;
      else `mother_ate_iron_fortified_food = False`.

Note that we are assuming that once someone (in this case the baby's mother)
starts eating fortified food, they will continue to eat the fortified food
forever. Additionally, we assume that those covered by baseline coverage of 
iron fortification have been covered for at least nine months + age of the 
simulant (in the case of simulants initialized in the early neonatal age 
groups).

Then, for simulants with the attribute `mother_ate_iron_fortified_food = True`,
the effect size of iron fortification on birth weight, calculated as described 
above (`Effect Size - Iron`_), should be applied as an **additive shift** to 
the simulant's birth weight (in grams). This may then impact their LBWSG risk 
category.

Application of Effect to Simulants - Iron
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Hemoglobin Level**

The age- and time-dependent effect of iron fortification on a simulant's 
hemoglobin level (as documented in the sections above) should be **additively**
applied to a simulant's hemoglobin level, as sampled as described in the 
:ref:`Dietary Iron Deficiency / Iron Deficiency Documentation <2017_cause_iron_deficiency>` 
given that the simulant's value for *iron_responsive_i* (as described in the 
:ref:`Dietary Iron Deficiency / Iron Deficiency Documentation <2017_cause_iron_deficiency>`)
is equal to 1. The age- and time-dependent intervention effect should be 
applied *each time* that a simulant's hemoglobin level is sampled. If a 
simulant's value for *iron_responsive_i* = 0, the effect of the intervention 
should **not** be applied to that simulant.

.. note::

  See Baseline Calibration section below for special considerations regarding baseline coverage

**Birth Weight**

The time-dependent effect of iron fortification on a simulant's birth weight 
(as documented in the sections above) should be **additively** applied to a 
simulant's birth weight after it is sampled as a value *in grams* from the 
continuous distribution of birth weight from the low birthweight short 
gestation risk factor. The simulant's birthweight post-application of the 
effect size will then be used to determine the simulant's LBWSG risk category.

.. note::

  See Baseline Calibration section below for special considerations regarding baseline coverage

.. todo:: Reference the LBWSG risk factor page when complete

**Baseline Calibration**

- **C_forticant_base** = coverage of forticant in the population at baseline

- **P_exp_base**  = (1 - C_forticant_base), prevalence of exposure to unfortified foods at baseline

- **π_1** = mean outcome value among those exposed to unfortified foods

- **π_0** = mean outcome value among those unexposed to unfortified foods (covered by fortification)

- **π_GBD** = mean outcome value in overall GBD population for age, sex, location, year

- **effect_size** = (π_0 - π_1), effect size for relevant outcome, as documented in the above sections, dependent on *age*, but **not** *time* (because it is assumed all simulants have been exposed for sufficient duration in the baseline scneario)

- **∆_π_0** = (π_0 - π_GBD), the difference between the mean outcome value in the population unexposed to unfortified foods (covered by fortification) and the overall age-, sex-, and location-specific GBD population

- **∆_π_1** = (π_1 - π_GBD), the difference between the mean outcome value in the population exposed to unfortified foods (not covered by fortification) and the overall age-, sex-, and location-specific GBD population

Equations:

  π_GBD = π_1 * P_exp_base + π_0 * (1 - P_exp_base)
  
  π_0 - π_1 = effect_size

  ∆_π_0 = π_0 - π_GBD

  ∆_π_1 = π_1 - π_GBD

Step 1: Solve for ∆_π_0 and ∆_π_1 using the equations above

Step 2: Apply ∆_π_0 as the additive effect size for simulants covered by 
baseline coverage and ∆_π_1 as the additive effect size for simulants not 
covered by baseline coverage (apply in the same fashion as described in the 
sections above; notably, this is only done in the iron_responsive_i = 1 
population for the hemoglobin outcome).

.. note::

  Through this method, we assume that π_0 - π_1 = effect_size is true for our 
  model population(s).

.. todo::

  Improve formatting/layout in this section

Folic Acid Fortification
~~~~~~~~~~~~~~~~~~~~~~~~

.. _below:

Population Coverage Data
^^^^^^^^^^^^^^^^^^^^^^^^

.. todo::

  Define a, b, and c prior to displaying their values in the table below.

The following table provides data for three parameters, :math:`a`, :math:`b`,
and :math:`c`, that will be used in our `coverage algorithm`_ for the folic acid
intervention. The food vehicle referred to in the table is wheat flour.

.. list-table:: Means and 95% CI's for existing population coverage of folic acid fortification (% of total population)
  :widths: 5 5 5 5
  :header-rows: 1

  * - Location
    - :math:`a` = Eats fortified vehicle
    - :math:`b` = Eats fortifiable vehicle
    - :math:`c` = Eats vehicle
  * - Ethiopia
    - 1.0
    - 13.9
    - 25.3
  * - India
    - 6.3 (4.8, 7.9)
    - 7.1 (5.6, 9.1)
    - 83.2 (79.5, 86.5)
  * - Nigeria (Kano)
    - 22.7 (20.0, 25.5)
    - 83.8 (81.4, 86.2)
    - 83.9 (81.5, 86.3)
  * - Nigeria (Lagos)
    - 5.4 (3.8, 6.9)
    - 13.8 (11.5, 16.1)
    - 14.2 (11.8, 16.5)

**For Ethiopia**, assume

.. math::

  a_\textit{Ethiopia} \sim \operatorname{Beta}(0.1,9.9),\quad
  b_\textit{Ethiopia} \sim \operatorname{Beta}(0.5,3.1),\quad
  c_\textit{Ethiopia} \sim \operatorname{Beta}(0.8,2.36).

The means of these `Beta distributions
<https://en.wikipedia.org/wiki/Beta_distribution>`_ will have the values shown
in the table. Each of the densities has an asymptote at 0 and an x-intercept at
1, and the parameters :math:`\alpha` and :math:`\beta` were chosen to vary
monotonically with the mean. The numbers for Ethiopia were chosen so that (i)
the mean of existing fortification coverage is close to 0, (ii) the percentage
of people eating wheat flour is similar to that in Nigeria, and (iii) 55%
of the wheat flour is fortifiable, based on the `Global Fortification Data
Exchange <https://tinyurl.com/rdm4wza>`_.

.. _GFDx Ethiopia Dashboard: https://fortificationdata.org/country-fortification-dashboard/?alpha3_code=ETH&lang=en

**For all the locations other than Ethiopia**, use a Beta distribution with mean
equal to the central estimate, and variance equal to the variance of a normal
distribution with the same mean and 95% confidence interval.

.. todo::

  Show how to get the correct Beta distribution, and draw some graphs. Here is
  the code James used, which truncates the distributions outside the 95%
  interval:

  .. code-block:: Python

    def sample_from_statistics(mean, upper_bound, lower_bound, variance=None):
    if variance is None:
        # Get variance for corresponding normal distribution
        variance = confidence_interval_variance(upper_bound, lower_bound)
    support_width = (upper_bound - lower_bound)
    mean = (mean - lower_bound) / support_width
    variance /= support_width ** 2
    alpha = mean * (mean * (1 - mean) / variance - 1)
    beta = (1 - mean) * (mean * (1 - mean) / variance - 1)
    return  lower_bound + support_width*scipy.stats.beta.rvs(alpha, beta)

  Another option for India and Nigeria would be to use truncated normal
  distributions, i.e. just find the normal distribution with the right mean and
  95% confidence interval, and truncate the tails outside the interval [0,1].

To ensure that :math:`a<b<c` for each country, sample :math:`a`, :math:`b`, and
:math:`c` so that they all have the same `percentile rank
<https://en.wikipedia.org/wiki/Percentile_rank>`_ in their respective
distributions. This can be done by using `inverse transform sampling
<https://en.wikipedia.org/wiki/Inverse_transform_sampling>`_ to generate all
three variables (:math:`a`, :math:`b`, and :math:`c`) from a single uniform
random variable :math:`u`.

To compute the coverage levels :math:`a`, :math:`b`, and :math:`c` for the whole
country of Nigeria, we will take a population-weighted average of the
corresponding values for Kano and Lagos. Kano has a population of about 4
million, and Lagos has a population of about 21 million, so we have

.. math::

  a_\textit{Nigeria}
  = \tfrac{4}{25} a_\textit{Kano} + \tfrac{21}{25} a_\textit{Lagos},

and similarly for :math:`b` and :math:`c`. `Couple
<https://en.wikipedia.org/wiki/Coupling_(probability)>`_ the random variables
:math:`a_\textit{Kano}` and :math:`a_\textit{Lagos}` by giving them the same
percentile rank (i.e. use the same strategy described above for coupling
:math:`a`, :math:`b`, and :math:`c`). This coupling strategy will create greater
uncertainty in the weighted average :math:`a_\textit{Nigeria}` than if we
sampled the two estimates indepdently, and more uncertainty seems like a good
idea since we're trying to estimate an average for the entire country based on
only two data points. Moreover, this coupling seems plausible since the data for
Kano and Lagos were from the same paper and therefore could have a similar bias.

.. _here:

Coverage Algorithm
^^^^^^^^^^^^^^^^^^

.. todo::

  Add a section to describe baseline coverage, and edit this section
  appropriately, as per James's recommendation in `PR 170
  <https://github.com/ihmeuw/vivarium_research/pull/170>`_:

    This is fine, because we talked an I know what you mean. I have a very
    strong preference for the following framing though:

    1.  Provide a description of how to find coverage in the baseline scenario.
        (and background info as necessary).
    2.  In a separate section, describe the intervention as a change in
        baseline coverage. (e.g. your intervention provides a delta_C(t),
        describe that).

    This framing is a little more complicated, but handles far more of our
    intervention cases. Frequently baseline coverage will have it's own time
    trends or other complicating factors. This framing provides a very clear
    description on exactly what your intervention is, as well.

  Also, add plots of coverage to show the time trend for a few versions of a, b,
  c.

Let :math:`C(t)` denote the proportion of the population receiving fortified
food (i.e. the population coverage) after :math:`t` years, and let :math:`t_0`
denote the time at which our folic acid intervention starts. Our folic acid
intervention algorithm is described by the following formula:

.. math::

  C(t) =
  \begin{cases}
  a & \text{if $t<t_0$,}\\
  c - (c-b)(1-r)^{t-t_0} & \text{if $t\ge t_0$,}
  \end{cases}

where :math:`a`, :math:`b`, and :math:`c` are the randomly sampled `population
coverage data`_ estimates from the previous section, and :math:`r \in [0,1]` is
a user-defined parameter representing the proportion of people each year who
start off eating an unfortifiable version of the vehicle but can be convinced to
switch to the fortified vehicle.

By default, we will start the intervention at :math:`t_0 = 1 \text{ year}`, and we'll assume :math:`r = 0.1` (i.e. an additional 10% of unfortifiable food will be converted to fortified food each year). We may later want to specify different values of these parameters for different locations.

In words, our intervention algorithm does the following:

1.  Before time :math:`t_0`, the population coverage is the proportion
    :math:`a` of people who are already eating the fortified vehicle.

2.  At time :math:`t_0`, the population coverage jumps immediately from
    :math:`a` to :math:`b`, i.e. the proportion of people who are already eating
    a fortifiable version of the vehicle. The rationale for this instantaneous
    jump is that the government begins enforcing fortification laws at time
    :math:`t_0`.

3.  After time :math:`t_0`, we run a campaign to convince people to switch to
    fortified food, and the rate of conversion is controlled by the parameter
    :math:`r`, with values close to 0 modeling a slow conversion, and values
    close to 1 modeling a fast conversion.

4.  If we let the simulation run forever, the population coverage would
    approach the value :math:`c`, i.e. the proportion of people who eat the
    vehicle.

Determining Whether a Simulant Is Affected
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Folic acid `reduces the birth prevalence <effect size_>`_ of :ref:`neural tube
defects (NTDs) <2017_cause_neural_tube_defects>`. In order for a newborn to have
a reduced risk of NTDs, the baby's mother needs sufficient folate intake *three
months prior to pregnancy*. Therefore, only babies born to mothers who have been
eating folic-acid-fortified food for at least a year will have any benefit from
our intervention.

With this in mind, here is the algorithm to determine whether a simulant is affected by the folic acid intervention:

1.  **Define variables:** Each simulant needs an attribute
    `mother_ate_folate_fortified_food`, which will be `True` if the simulant's
    mother ate folic-acid-fortified food starting at least a year before the
    simulant was born, `False` if not, and `Unknown` if we don't know.

2.  **Initialize the simulation:** At the start of the simulation, set
    `mother_ate_folate_fortified_food = Unknown` for all simulants; this
    attribute will not be used after the simulant is born, so the value is
    irrelevant for all simulants already alive at the start of the simulation.

3.  **Initialize simulants born into the simulation:** For each simulant born
    at time :math:`t` (in years), the probability that the simulant's mother
    started eating folic-acid-fortified food at least a year ago is equal to the
    population coverage one year ago, :math:`C(t-1)`. Therefore, upon the
    simulant's birth, do the following:

  a.  Generate a uniform random number :math:`u\sim
      \operatorname{Uniform}([0,1])`.

  b.  If :math:`u<C(t-1)`, set `mother_ate_folate_fortified_food = True`;
      otherwise set `mother_ate_folate_fortified_food = False`.

Note that we are assuming that once someone (in this case the baby's mother)
starts eating fortified food, they will continue to eat the fortified food
forever.

The variable `mother_ate_folate_fortified_food` will be used to determine the
probability that the newborn has a neural tube defect. We will describe how to
do this below.

Effect Size
^^^^^^^^^^^

Folic acid fortification reduces the birth prevalence of :ref:`neural tube
defects (NTDs) <2017_cause_neural_tube_defects>`. The effect size is measured as
a risk ratio (RR), where we think of "no fortification" as a risk factor:

.. math::

  RR = \frac{P(\text{born with NTD} \mid \text{no fortification})}
  {P(\text{born with NTD} \mid \text{fortification})}
  \approx \frac{1}{0.59\: (0.49, 0.70)}
  \approx 1.71\: (1.43, 2.04).

We are estimating this effect size as the reciprocal of the odds ratio (OR) of
:math:`0.59\: (0.49, 0.70)` found in the Keats review; this odds ratio is the
ratio of the odds of being born with NTDs in the fortified population to the
odds of being born with NTDs in the unfortified population. Since the prevalence
of NTDs is small, the odds ratio is very close to the risk ratio.

To model the uncertainty in the estimate, the above RR should be drawn from a
`lognormal <https://en.wikipedia.org/wiki/Log-normal_distribution>`_
distribution with median = 1.71, 2.5\ :superscript:`th`-percentile = 1.43, and
97.5\ :superscript:`th`-percentile = 2.04. This distbibution can be created
using `SciPy's lognorm function
<https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.lognorm.html>`_
as follows:

.. code-block:: Python

  from numpy import log
  from scipy.stats import norm, lognorm

  # median and 0.975-quantile of lognormal distribution for RR
  median = 1.71
  q_975 = 2.04

  # 0.975-quantile of standard normal distribution (=1.96, approximately)
  q_975_stdnorm = norm().ppf(0.975)

  mu = log(median) # mean of normal distribution for log(RR)
  sigma = (log(q_975) - mu) / q_975_stdnorm # std dev of normal distribution for log(RR)

  # Frozen lognormal distribution for RR, representing uncertainty in our effect size
  # (s is the shape parameter; the scale parameter is exp(mu), which equals the median)
  rr_distribution = lognorm(s=sigma, scale=median)


Determining Whether a Simulant Is Born with an NTD
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The procedure here uses the standard coverage gap framework:

1.  Compute a PAF based on the above RR
2.  When a simulant is born, check whether `mother_ate_folate_fortified_food` is
    `True`. If so, the simulant has an NTD with probability equal to the
    risk-deleted prevalence birth_prevalence_of_NTDs_in_GBD * (1-PAF).
    Otherwise, their risk of an NTD is increased by a factor of RR, to
    birth_prevalence_of_NTDs_in_GBD * (1-PAF) * RR.
3.  Once the simulant's probability of an NTD is determined, decide whether
    they actually have one using standard inverse transform sampling for the
    Bernoulli random variable representing the simulant's
    `has_neural_tube_defect` boolean attribute.

.. todo::

  Write this out more explicitly. Perhaps it would be better to merge
  `Determining Whether a Simulant Is Affected`_ into this section.

Desired Model Outputs
---------------------

Observers
+++++++++

Verification and Validation Strategy
------------------------------------

Design Decisions and Rationales
-------------------------------

Do not explicitly model neonatal disorders, meningitis, or other LBWSG-affected causes
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

For context, here are `treemaps for Nigeria and India on GBD Compare <http://ihmeuw.org/51tj>`_ showing that the majority of DALYs attributable to low birth weight and short gestation in the under-5 age groups are due to neonatal disorders, LRI, diarrhea, and meningitis.

Although the sub-causes of  :ref:`neonatal disorders
<2017_cause_neonatal_disorders>` account for the majority of disease burden in
the neonatal age groups, we are not explicitly modeling the neonatal causes in
this simulation. Instead, the relative risks from :ref:`low birth weight and
short gestation <2017_risk_lbwsg>` will directly affect each simulant's
mortality rate, which indirectly accounts for mortality due to neonatal
disorders and other causes like meningitis. Since iron fortification affects
birth weight and hence the relative risk of mortality that a simulant
experiences, this approach allows us to count how many deaths can be averted
from an increased birth weight resulting from iron fortification. This approach
ignores morbidity from neonatal disorders, meningitis, and other causes in the
neonatal age groups, but YLDs for neonates are negligible compared to YLLs (on
the order of 100 times smaller), so ignoring YLDs due to neonatal disorders and
other causes is not a concern.

Additional reasons for excluding neonatal disorders, meningitis, and other
causes affected by low birth weight and short gestation are as follows:

* The relative risks for :ref:`low birth weight and short gestation
  <2017_risk_lbwsg>` are not cause-specific, but rather apply to all-cause
  mortality. Thus it is simpler and more consistent with the input data to group
  all the LBWSG-affected causes together rather than modeling them explicitly,
  unless those causes need to interact with other model components (as is the
  case with :ref:`diarrheal diseases <2017_cause_diarrhea>` and :ref:`lower
  respiratory infections <2017_cause_lower_respiratory_infections>`, which are
  affectd by :ref:`vitamin A deficiency <2017_cause_vitamin_a_deficiency>`).

* Neonatal disorders is potentially problematic because:

  #. We know its (birth) prevalence does not include (birth) prevalence of
     :ref:`other neonatal disorders <2017_cause_neonatal_other>`, for which
     there is no data, and

  #. We know the relative risks are wrong for :ref:`preterm birth
     <2017_cause_neonatal_preterm>` because this sub-cause is PAF-of-1 with
     LBWSG.

* Meningitis is potentially problematic because we have not successfully
  modeled it before. In our initial attempt to include meningitis in the BEP
  model, the simulated meningitis CSMR significantly underestimated the GBD CSMR
  for meningitis in all age groups.

* Other causes affected by LBWSG, such as encephalitis, upper respiratory
  infections, and otitis media, have very few DALYs attributable to LBWSG. Thus
  it is not worth the effort to model these causes explicitly, though averted
  YLLs due to these cause will in theory be captured by the above strategy of
  using the LBWSG relative risks to affect the overall mortality rate of
  simulants.

References
----------

.. note::

  Will need to resolve merge conflict here

.. [Hurrell-et-al-2010]

  View `Hurrell et al. 2010`_

    Hurrell, R., Ranum, P., de Pee, S., Biebinger, R., Hulthen, L., Johnson, Q., & Lynch, S. (2010). Revised Recommendations for Iron Fortification of Wheat Flour and an Evaluation of the Expected Impact of Current National Wheat Flour Fortification Programs. Food and Nutrition Bulletin, 31(1_suppl1), S7–S21. https://doi.org/10.1177/15648265100311S102

.. _`Hurrell et al. 2010`: https://doi.org/10.1177/15648265100311S102
