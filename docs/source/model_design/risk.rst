.. _models_risk:

======================
Modeling Risk Exposure
======================

.. todo::

   Overview of modeling GBD risk factor exposure.

.. contents:

What is a risk factor?
----------------------

What is a risk exposure?
------------------------

A **risk exposure** is any attribute whose measure is causally related to the 
measure of an outcome, such as a disease or another risk exposure.

A **risk exposure**, together with a **risk outcome**, constitute a **risk factor**.

We will first consider a risk exposure in the context of an individual. An 
exposure will have different possible measures which fall along a distribution, 
and an individual will possess a specific measure within this distribution.

	For example, consider the exposure *systolic blood pressure*. SBP ranges 
	from about 60 to 200, and any given individual will have a specific SBP measurement.

	One can also define categorical distributions. Consider, for example, the 
	exposure *has worked in mining*. Here, we assign each individual either 
	"yes" or "no".

Risk exposure distributions can be:
 
 - Categorical
 	
 	- Dichotomous

 	- Unordered polytomous

 	- Ordered polytomous

 - Continuous

After identifying an attribute of interest, the manner in which the risk 
exposure is defined will be subject to the data access and the particular 
research question the model is meant to answer. Major considerations include 
the unit of analysis, the time frame of interest, data available, and sources of 
bias within the data.

	For example, if the exposure is a one-time event with persistant effects, it 
	can be defined as a dichotomous exposure. However, if the exposure is smoking 
	as a risk for lung cancer, a continuous exposure defined with units of person-time 
	such as pack years per individual will likely be more suitable.

As our models will typically use GBD estimates, some of the other typically 
important considerations around data will have less broad applicability to our 
models. However, we include these as notes. The exposure definition must 
account for any gaps within the attribute of interest and the data available. 
	For example, if one is interested in soda consumption, and is building a model 
	based on data from soda sales in a certain region, this uncertainty needs to be 
	incorporated into the model. Similarly, researchers generally must be concerned 
	with biases from factors such as underreporting in the data. 
	[Exposure_definition_and_measurement]_

Risk exposures in GBD
+++++++++++++++++++++++

GBD estimates always pertain to the mid-year or yearly average measurements of 
a population with a specific location, year, sex, and age, or an aggregation of 
some such populations. Thus, in the context of GBD, a risk exposure is a 
*distribution of individual exposure values* within a location-year-sex-age-
population.

If the exposure is dichotomous, for each location, sex, and year, GBD 
will estimate a continuous age trend of the proportion of, say, individuals with
BMI over 30. If the exposure is continuous, then GBD estimates the distribution of the 
exposure variable over the population in each age, sex, year, and location.

GBD's risk exposures will generally be less reliable than GBD cause-of-death 
models, and when designing a risk exposure, it is important to both learn from
the GBD modeler what the entity captured by their exposure model is.

	Take, for example, the GBD exposure *has ever experienced 
	intimate partner violence*. Barring incredibly high mortality rates among 
	IPV victims, we would expect the proportion of the population that has ever 
	experienced IPV to increase monotonically with age. However, survey data 
	consistenly reports this proportion to peak among 30-40 year olds, which is 
	refleced in the GBD model. We believe this phenomenon to be the result of 
	recall bias. When implementing this in a model, however, if we were to 
	initialize a population with dichotomous and persistent IPV exposure values 
	from GBD estimates and then allow the simulants to age for 10 years, our 
	exposure distribution would no longer match our reference data. Thus it 
	becomes clear that the entity we're describing needs to be "recollection of 
	IPV", "recent experience of IPV", or some other attribute that incorporates a 
	time component.

Risk exposures in Vivarium
++++++++++++++++++++++++++++

In Vivarium, each simulant will be assigned an exposure value. We will 
typically derive these values from a population-level distribution provided by a 
GBD risk exposure.

Any given attribute that we are interested in may be codified in a variety of 
ways. The choices to make include which distribution to use, how to measure the 
risk, and what time frame within which to consider the risk. We include some 
examples below.

	Say we are modeling *BMI* as a risk exposure. BMI could be 
	included as a continuous variable, or binned into {<20, 20-25,>25}. This 
	decision will be based on the outcomes of interest and data availability.

	If we are interested in BMI as a risk for IHD, we might only be interested
	in current BMI. However, if we are modeling BMI as a risk for osteoporosis,
	it is possible that we will be interested in the cumulative history of 
	BMI.

	Assume we are intersted in capturing *smoking* as a risk exposure. If the 
	outcome of interest is lung cancer, we will be interested in a subject's 
	full history of smoking. This might include:

	a) if the subject has ever been a regular smoker

	b) if so, with what frequency per week the subject smoked cigarettes

	c) the type of cigarettes smoked

	We could decide to encode these as a dichotomous variable (a), a categorical 
	variable (b), and a second categorical variable (c), and include these as three 
	different risk exposures in our model. This will necessitate some set of 
	interactions that occur amongst the different exposures. Alternatively, we 
	might define the risk exposure *smoking score*, which is a function of (a) (b) 
	and (c), and which has some continuous or ordered categorical distribution.

Note that in each case our smoking model captures the same information, but in 
the former we push the complexity of quantifying different types of smoking 
histories to another part of the model, and in the former we wrap this 
complexity into the exposure component.

What is a TMREL?
----------------

The theoretical minimum risk exposure level (TMREL) is the risk exposure level that poses *minimum* risk with respect to an outcome(s) associated with that risk factor. For example, if we consider smoking as a risk factor with exposure levels never smokers, current smokers, and former smokers, the TMREL with respect to lung cancer would be never smokers.

Notably, the TMREL for a given risk factor *may* vary based on different affected outcomes, although many affected outcomes will share the same TMREL.

The structure of a risk exposure model
--------------------------------------

Common risk exposure models
---------------------------

Continuous exposure models
++++++++++++++++++++++++++

Continuous risk exposure models in GBD generally are generally defined with the following parameters:

- Population mean exposure level

- Population exposure standard deviation

- Exposure distribution (and associated weights if the distribution is an ensemble distribution)

Categorical exposure models
+++++++++++++++++++++++++++

Categorical exposure models in GBD 

Hybrid exposure models
++++++++++++++++++++++

Common data sources for risk exposure models
--------------------------------------------

Exposure
++++++++

Exposure standard deviation
+++++++++++++++++++++++++++

Exposure distribution weights
+++++++++++++++++++++++++++++

TMREL/TMRED
+++++++++++

Scale factor
++++++++++++

Non-standard data sources for risk exposure models
--------------------------------------------------
