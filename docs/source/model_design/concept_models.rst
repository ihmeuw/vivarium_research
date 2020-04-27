..
  Section title decorators for this document:
  
  ==============
  Document Title
  ==============
  Section Level 1
  ---------------
  Section Level 2
  +++++++++++++++
  Section Level 3
  ~~~~~~~~~~~~~~~
  Section Level 4
  ^^^^^^^^^^^^^^^
  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

================================================
Vivarium Model Considerations and Best Practices
================================================

The purpose of this page is to document information that is relevant to designing Vivarium simulation models as a whole, rather than information specific to particular sub-components of Vivarium simulations. This page is arranged in no particular order and topics can be added as they are encountered. The sections may be filled in as simulation science team members investigate the issues in their own projects and can include text from or links to existing documents that may address the topic.

.. contents::
   :local:

Model Design/Building Topics
----------------------------

Common random numbers 
+++++++++++++++++++++

Common Random Numbers Between Model Scenarios
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Vivarium uses common random numbers between model scenarios to ensure that our comparison of the baseline and intervention scenarios represents a true *counterfactual* comparison in which the scenarios are exactly the same with regard to all factors besides the defined intervention. See the `Vivarium documentation page on common random numbers <https://vivarium.readthedocs.io/en/develop/concepts/crn.html>`_ for more detail on how this is implemented.

Common Random Numbers Between Model Locations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For a given Vivarium simulation model, it is common to model the same scenarios across more than one model location. For example, the :ref:`Large Scale Food Fortification project <2017_concept_model_vivarium_conic_lsff>` was modeled in Ethiopia, India, and Nigeria. The goal in running the model in more than one model location may be to evaluate the location for which the intervention will have the greatest impact. For example, because Ethiopia and Nigeria have higher prevalence of neural tube defects than India, we expect that folic acid fortification will have a greater impact on DALYs in Ethiopia and Nigeria than in India. However, in order to make this conclusion from our model results, **we must design our models so that they are comparable across model locations.**

Specifically, we should ensure that we are using the common random numbers across model locations with respect to:

1. Intervention effect sizes

2. Key location-specific model parameters 

Common Random Numbers for Intervention Effect Sizes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Our Vivarium simulation models generally have intervention effect sizes with some distribution of uncertainty. For example, in the :ref:`Large Scale Food Fortification model <2017_concept_model_vivarium_conic_lsff>`, the relative risk of the vitamin A fortification intervention on population prevalence of vitamin A deficiency is 0.45 (95% CI: 0.19 - 1.05). **Given that we are operating under the assumption that the effect size for the intervention is universal and therefore should not vary by model location (is generalizable to each model location and no effect modification is present), then we should ensure that we are applying the same values sampled from the effect size distribution of uncertainty.**

This is especially important when the statistical confidence interval for a given intervention effect size is imprecise and crosses the null value, or in other words *has the potential to make things worse*. If due to randomness, a null effect size is sampled in one model location but not another, it may spuriously appear that the intervention will be less effective in that location, but in reality it may be a product of randomness. Therefore, to ensure comparability between our model locations, **it is best practice to use common random numbers for intervention effect sizes across model locations.**

Common random Numbers Across Locations for Key Location-Specific Model Parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In the example discussed above in the `Common Random Numbers Between Model Locations`_ section, it is clear that baseline burden of neural tube defects is a key parameter that will affect the impact of folic acid intervention in the Large Scale Food Fortification model in each model location. Because there is an uncertainty distribution surrounding the parameter of population burden of this neural tube defects (i.e. birth prevalence), the impact of the intervention in our model is subject to randomness in the values that we sample from the uncertainty distribution of this parameter. 

Because we are not using the entire uncertaity distribution that the Global Burden of Disease study provides, we should ensure that we are comparing comprable measures of baseline burden for this key parameter across our model locations. One way to do this would be to arrange the input draws of this key parameter (birth prevalence of neural tube defects in this example) in asending order for each model location and then select the input draw in the same position in the list for each location as the input draws to use for each model location.

.. todo::

	Consider an approach that would allow us to use common random numbers for more than one key model parameter

Statistical distributions of uncertainty
++++++++++++++++++++++++++++++++++++++++

.. todo::

	Intro

Common Statistical Distributions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. todo::

	- Uniform
	- Normal/Truncated normal
	- Lognormal
	- Gamma
	- Beta
	- Ensemble
	- Etc.

Common Model Parameters and Their Possible Appropriate Uncertainty Distributions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. todo::

	- Relative risk
	- Mean difference
	- Proportion
	- Cost estimate
	- Etc.

Other Considerations
~~~~~~~~~~~~~~~~~~~~

.. todo:: 

	- How to handle very asymmetric confidence intervals
	- How to handle uncertainty in data source(s) rather than statistical uncertainty from a single high quality data source?
		- Ex: combining multiple estimates from published papers with their own statistical uncertainty
	- How to handle uncertaity when extrapolating a subnataional estimate to a national estimate?
	- How to handle uncertainty distribution in the case of joint distributions

When to choose causal associations versus non-causal correlations in a Vivarium concept model
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

.. todo::

	- Bivariate correlations versus systems of multivariate correlations

Output Table Shells
+++++++++++++++++++

.. todo::

	- What stratifying variables are needed? 
		- Intervention effect modifiers
		- Subgroup analyses
		- Others

Accounting for Baseline Intervention Coverage
+++++++++++++++++++++++++++++++++++++++++++++

.. todo::

	Intro

Dichotomous Outcome
~~~~~~~~~~~~~~~~~~~

.. todo::

	This section (take from LSFF?)

Continuous Outcome 
~~~~~~~~~~~~~~~~~~

.. todo::

	This section (take from LSFF? Note that LSFF method could be improved; sample from opposite ends of existing distribution rather than shift entire distribution up/down)

Additional sub-groups with differential risks in baseline scenario
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. todo::

	This section. (Ex: maternal BMI example from BEP)

Evaluating Model Limitations
++++++++++++++++++++++++++++

.. todo:: 

	Potential Biases: 
		- GBD vs. reality
		- Model vs. GBD
		- Model vs. reality

A Day In the Life of a Vivarium Simulant
++++++++++++++++++++++++++++++++++++++++

.. todo:: 

	Nicole is planning to work on this section

Vivarium Versus Other Types of Models
+++++++++++++++++++++++++++++++++++++

.. todo::

	- What can (and should) we use vivarium for? 
		- Versus decision tree or other types of models?
		- Different types of agent-based models
			- Strengths/weaknesses
			- Where does Vivarium fit in?
		- What differential equations underly these different types of models?

Closed Versus Open Cohorts
++++++++++++++++++++++++++

.. todo::

	- Choosing between closed cohort and open cohorts
		- How to interpret results differently
		- How decision may impact results

Differential (and Other Common) Equations Used in Vivarium
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

.. todo:: 

	- Survival analysis (we have an existing page for this)
	- Others

Choosing an Appropriate Time-Step
+++++++++++++++++++++++++++++++++

.. todo::

	- How to choose an appropriate time-step 
		- Minimum disease duration
		- Other considerations?

Delayed Effects and Effect/Coverage Scale-Ups
+++++++++++++++++++++++++++++++++++++++++++++

.. todo::

	This section

Double Counting Issues
++++++++++++++++++++++

.. todo::

	This section

Incompatibilities Between Disease States Needed for Model and GBD Disease States
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

.. todo::

	This section (LTBI?)

Back of Envelope Calculations
+++++++++++++++++++++++++++++

.. todo::

	Link to Abie's presentation

Monte Carlo Simulation Uncertainty
+++++++++++++++++++++++++++++++++++

.. todo:: 

	Link to James' presentation?

Results Processing and Presentation
-----------------------------------

Steps When Processing Model Results
+++++++++++++++++++++++++++++++++++

.. todo::

	- Check input draws and random seeds for completion
	- Appropriate steps when calculating results per person year (which strata to sum/divide/describe)
	- Links to vivarium_data_analysis

How to Present Results and Methods for Scientific Publication
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

.. todo:: 

	- Make some boilerplate methods text for vivarium and also for GBD 
	- Make some standard tables (parameter table, results table, etc.)

Potential Results Formats for Vivarium Models
+++++++++++++++++++++++++++++++++++++++++++++

.. todo:: 

	- DALYs averted (absolute or relative)
	- Relative risks?
	- ICERs