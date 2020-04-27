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

.. todo::

	- Between model scenarios
	- Between model locations

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
++++++++++++++++++++++++++++++++++++++++++++++++

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

	Intro (link to or copy from LSFF description)

Dichotomous Outcome
~~~~~~~~~~~~~~~~~~~

.. todo::

	This section (link to or copy from LSFF description)

Continuous Outcome 
~~~~~~~~~~~~~~~~~~

.. todo::

	This section (take from LSFF? Note that LSFF method could be improved; sample from opposite ends of existing distribution rather than shift entire distribution up/down)

Additional sub-groups with differential risks in baseline scenario
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

.. todo::

	This section (LTBI?)

Back of Envelope Calculations
+++++++++++++++++++++++++++++

See the presentation Abie made on back of envelope presentations for Vivarium simulation models `here <https://www.dropbox.com/s/bo44c1jy149m06r/vivarium_back_of_envelop_method.pptx?dl=0>`_.

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
