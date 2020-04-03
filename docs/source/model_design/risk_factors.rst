.. _models_risk_factors:

=====================
Modeling Risk Factors
=====================

.. todo::

  Add description of what's in this document.

  Also see the following sections in :ref:`Modeling Causes <models_cause>`:

  * Learning objectives
  * Why do we want a document that describes each cause model?

  It looks like most of that content is generalizable to both risks and causes.
  Should we put similar sections in both documents, or pull them out into a more
  general document about designing Vivarium models?

  On the other hand, it looks like the following sections in :ref:`Modeling
  Causes <models_cause>` have details that are specific to causes, but should
  have analogues for risks in this document:

  * How is a cause model incorporated into a larger model?
  * What does a model document look like?

.. contents::
  :local:

Overview
--------

What is a risk factor?
++++++++++++++++++++++

.. todo::

  Update this section once this page has been filled in further.

.. todo::
  
  Separate this into "in the field of epi", "in GBD", and "in vivarium". 
  Disambiguate language between risk exposure vs. risk factor

A risk factor is any attribute whose measure is causally related to the measure 
of an outcome. Such attributes can range widely, and are categorized by GBD into 
environmental/occupational, behavioral, and metabolic risks. For example:

  * Environmental/occupational

    * The level of particulate matter in the air of an individual's environment

    * An individual's access or lack thereof to clear water

  * Behavioral

    * An individual's alcohol intake

    * A low level of physical activity

    * A history or lack thereof of childhood abuse

  * Metabolic

    * The blood pressure of an individual

    * Having or not having a high BMI

For our purposes, the outcomes of these risks will generally be a differential 
probability of some cause of health loss. However, the outcome of a risk could 
also be the differential probability of another risk exposure.

  For example, we might say that an individual with the attribute "is a daily 
  smoker" is :math:`x_1` times more likely to develop lung cancer than if that same 
  individual had the attribute "has never smoked". We quantify this more 
  rigorously in our explanation of relative risk (RR) and theoretical minimum risk 
  level (TMREL).

  We might also say that an individual with the attribute "mother had a BMI of 17 
  during pregnancy" is :math:`x_2` times more likely to end up with the attribute "low 
  birth weight" than if that same child, all other factors held constant, had the 
  attribute "mother had a healthy BMI during pregnancy". We will then say that the 
  attribute "low birth weight" causes the child to have a higher probability of 
  experiencing a bout of diarrheal disease. We then attribute health loss to this 
  bout of diarrheal disease.

Risk factors are implemented in epidemiological models as a risk exposure
that is mapped to a risk effect. For example, a categorical exposure to "having 
a high BMI" is mapped to a higher differential probability of experiencing 
chronic kidney disease (CKD).

Within the context of our models, a risk factor will be an attribute of a 
simulant averaged over a timestep. This is in contrast to GBD, wherein a risk 
factor is an attribute of a population, potentially for a given sex-age-location, 
averaged over one year.

Risk exposures and effects are discussed in more detail in the proceeding 
sections. Here we will note that when defining the relationship between 
a risk effect and a risk exposure, the subset of a simulant's history 
of exposure that ought to be associated with a risk effect will depend on the 
risk factor. 

	For example, consider the risk-outcome pairs *unsafe water 
	source* and *diarrheal diseases*, versus *smoking* and *diabetes*. We see that 
	only a simulant's recent exposure to an unsafe water source will affect their 
	probability of suffering from diarrheal diseases in the next week. However, the 
	probability of becoming diabetic in the next year will be affected by a
	simulant's entire history of smoking.


What is a causal relationship?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this context, causal relationships imply that there is a direct cause and 
effect relationship between two traits (generally an exposure and an outcome). 
Notably, we hope to differentiate *causal* relationships (which have a direct 
cause and effect relationship) from *correlated* relationships (which have a 
relationship, but it may be driven by something other than a direct cause and 
effect). As it turns out, distinguishing between correlation and causation can 
be quite a challenging task and many fields, including epidemiology, are 
devoted to the process of *causal inference,* or drawing a conclusion about a 
causal relationship based on the available evidence.

An term that is often used in causal inference is the **counterfactual**. The 
counterfactual refers to an alternate reality in which only a single variable 
has changed and all else has remained exactly the same. 

  For instance, say that we wanted to evaluate the causal realtionship between 
  smoking and lung cancer. Hypothetically, we could compare lung cancer rates 
  between 1954 when smoking was at its peak in the US and 2020 when smoking 
  rates in the US are lower. However, you can quickly imagine additional 
  differences between 1954 and 2020 US that may also impact the rates of lung 
  cancer, such as differences in air pollution due to automobiles and the rise 
  of electronic cigarettes. 

  Therefore, while the comparison between 1954 and 2020 US may be interesting 
  and useful, it is not a true counterfactual comparison. Instead, a 
  counterfactual scenario could be conceptualized as "what would the lung 
  cancer rate in the US be in 1954 *if no one smoked* and **all else was equal**?" 
  Then, we could evaluate the independent effect of smoking on lung cancer
  without interference from any other factors.

However, by definition, the counterfactual scenario is impossible to directly 
evaluate, which is the core challenge in causal inference. Luckily, there are 
several strategies that can be used to attempt to indirectly answer the 
counterfactual question and perform causal inference. Some examples include
randomized control trials and adjustment for confounding variables in 
epidemiology studies.

One way in which causal inference is performed for a particular relationship 
between an exposure and outcome is assessment based on the Bradford Hill 
criteria for causation. The Bradford Hill criteria are a group of principles 
that may be used in evaluating the epidemiologic evidence of a causal 
relationship such that the more criteria that are satisfied, the more likely 
it is that a causal relationship exists. The criteria are listed below:

  - **Strength/Effect Size:** The larger the association, the more likely 
    that it is causal.
  - **Consistency/Reproducibility:** Consistent findings observed by different 
    people in different places increase the likelihood of causality.
  - **Specificity:** The more specific the association between a cause and an 
    effect, the more likely that it is causal.
  - **Temporality:** The effect **must** occur *after* the cause.
  - **Biological Gradient/Dose-Response Relationship:** Greater exposure should 
    generally lead to greater observed effect.
  - **Plausibility:** A plausible mechanism between cause and effect is helpful 
    (although limited by current knowledge).
  - **Coherence:** Coherence between epidemiological and laboratory findings 
    increases the likelihood of a causality.
  - **Experiment:** Experimental evidence between the cause and effect generally 
    supports a causal relationship.
  - **Analogy:** Analogies or similarities between the observed associations and 
    other associations exist generally support a causal relationship.
  - **Reversibility:** If the cause is deleted, the effect should also disappear.

A particularly relevant criterion listed above is **temporality**, which 
declares that in order for a relationship to be causal, the cause or exposure 
must occur *before* the effect or outcome chronologically. When this criterion 
is not satisfied, there is a risk for **reverse causalility**, in which the 
causal relationship occurs in the opposite direction as expected.

While these criteria are a useful guide for assessing whether there is 
sufficient evidence to conclude that a relationship is causal, there are 
several concepts that should be considered when thinking about causality 
between an  exposure and an outcome. Relationships that complicate our 
understanding of causality, including confounding, intermediates, effect 
modification, and mediation are discussed in the following subsections.

Notably, in the following sections, solid arrows are used to depict causal 
relationships directionally between a cause/exposure and effect/outcome. 

.. todo::

  Discuss counterfactual analysis as performed in our assessment of interventions.

  Discuss criteria (sim science and GBD) for modeling a risk outcome pair

Confounding
""""""""""""

Intermediates
"""""""""""""

Effect Modification
"""""""""""""""""""

Mediation
"""""""""

What is a risk exposure?
++++++++++++++++++++++++

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
---------------------

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
--------------------------

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


What is a risk effect?
++++++++++++++++++++++

Definitions
-----------

Theoretical Minimum Risk Exposure Level/Distribution (TMREL/D)
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Relative Risk (RR)
++++++++++++++++++

Population Attributable Fraction (PAF)
++++++++++++++++++++++++++++++++++++++

References
----------

.. [Exposure_definition_and_measurement] Developing a Protocol for Observational Comparative Effectiveness Res earch: A User's Guide.Agency for Healthcare Research and Quality (US), Jan 2013
   Retrieved 11 March 2020.
   https://www.ncbi.nlm.nih.gov/books/NBK126190/
