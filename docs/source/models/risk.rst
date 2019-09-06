.. _models_risk:

======================
Modeling Risk Exposure
======================

.. note::

   Vivarium has the infrastructure to model any risks in the GBD hierarchy. 
   You should use tools from ``vivarium_inputs`` to pull and examine the 
   data for your risks before including them in your model.

What is a risk factor?
----------------------
A risk factor is any attribute, characteristic or exposure of an individual 
that increases the likelihood of developing a disease or injury. Some examples 
of the more important risk factors are underweight, unsafe sex, high blood pressure, 
tobacco and alcohol consumption, and unsafe water, sanitation and hygiene. (WHO)
In GBD, a risk factor refers to any exposure that leads to a loss of health in the
population; it can be anywhere on the causal chain as long as there is evidence
to show that the risk factor is causally linked to an outcome disease or injury.

What do we measure?
-------------------
- Proportion of disease and injury burden attributable to specific risk factors
	- e.g. burden of diarrheal due to unsafe water
	- e.g. burden of lung cancer due to smoking
- Comparative importance of the underlying risk factors which cause disease and injuries
	- e.g. burden of smoking compared with unsafe water

How do we measure?
------------------
Input:
	- Risk factor exposure (current distribution and counterfactual distribution)
	- Risk factor-disease relationship (risk accumulation and risk reversal)
	- Disease burden
Output:
	- Attributabe burden by age, sex, year and location

How do we select risk-outcome pairs?
------------------------------------
- The likely importance of a risk factor to disease burden and/or policy.
- Availability of sufficient data and methods to estimate risk factor exposure.
- Evidence from epidemiological studies supporting a causal relationship between 
  risk factor exposure and the outcome and available data to estimate effect 
  sizes per unit of exposure.
- Evidence that these effects can be generalized to a general population.


Risk factor hierarchy:
-------------------
- Environmental/occupational risks
	- Unsafe water, sanitation, and handwashing
		- e.g. Unsafe water source
	- Air pollution
		- e.g. Household air pollution from solid fuels
	- Other environmental risks
		- e.g. Lead exposure
	- Occupational risks
		- e.g. Occupational carcinogens
			- e.g. Occupational exposure to asbestos
- Behavioral risks
	- Child and maternal malnutrition
		- e.g. Suboptimal breastfeeding
			- e.g. Non-exclusive breastfeeding
	- Tobacco smoke
		- e.g. Smoking
	- Alcohol and drug use
		- e.g. Alcohol use
	- Dietary risks
		- e.g. Diet low in fruits
- Metabolic risks
	- High fasting plasma glucose
	- High total cholesterol
	- High systolic blood pressure
	- High body-mass index
	- Low bone mineral density
	- Low glomerular filtration rate

What is a TMREL?
----------------
The theoretical minimum risk level (TMREL) is the level of risk exposure 
that minimizes risk at the population level, or the level of risk 
that captures the maximum attributable burden. (GBD)

- Straightforward: e.g., TMREL for smoking is zero = no one in the population smokes
- Controversial: e.g., standard daily consumption of sodium

What is a PAF, and what is a Population Attributable Burden?
------------------------------------------------------------
**Population Attributable Fraction** is the fraction of disease burden (deaths, YLDs,
YLLs, DALYs) from a cause (disease or injury) that is attributed to exposure to a risk factor. PAFs are not additive, mediation either. **Population Attributable Burden**
is the attributable budrden for a cause due to exposure to a given risk factor.
(Attributable burden = PAF * total burden of cause)

The structure of a risk exposure model
--------------------------------------
- Risk entities
	- **rei_id:** The GBD id associated with this risk.
	- **Exposure model:** How does GBD model the exposure distribution of this risk? 
	  One of: dichotomous, ordered polytomous, unordered polytomous, normal, 
	  lognormal, or ensemble. Does your intervention require an alternative model 
	  of exposure? If so, what is it? Can we easily translate between your alternative 
	  model and the GBD model?
	- **Affected measures:** What diseases and measures (e.g. incidence rate, excess
	  mortality, etc.) are affected by this risk? If you have an alternative exposure 
	  model, how is the effect size related?
	- **Mediation:** Is this risk mediated by any other risks in your model? 
	  If so, how should we handle the mediation? (e.g. high systolic blood pressure
	  is the mediator between high body-mass index in adults risk and causes such as
	  ischemic heart disease, ischemic stroke, etc.) For details please visit ``J:/
	  WORK/05_risk/mediation/mediation_matrix_summary_gbd_2017.xlsx``
	- **PAF of one causes:** Are there any PAF of one relationships with causes in your
	  model? If so, what do they mean and how should we handle them? For common *PAF of one*
	  pairs, please check ``J:/Project/simulation_science/archive/pafs_of_one.xlsx``
	- **Restrictions:** Does this risk apply only to certain ages or sexes?
	  Any other restrictions?
- Components
	- What components are used to implement the risk and risk effects?
	- How do you include them in the simulation?
	- What columns do they create in the population table?  What do the columns mean?
	- What value pipelines do they create? What do the values coming out of the 
	  pipelines mean?
- Parameters
	- List all available parameters in the format:
		- parameter_name
		- parameter_description
		- parameter_value
- Data Sources
	- exposure - ``get_draws(source="exposure")``
	- exposure standard deviation (continuous modeled risks) - 
	  ``get_draws(source="exposure_sd")``
	- exposure distribution weights (ensemble modeled risks) - 
	  ``get_measure(measure="exposure_distribution_weights")``
	- relative risk - ``get_draws(sources="rr")``
	- population attributable fraction - ``get_draws(source="burdenator")``
	- mediation factors - ``get_measure(measure="mediation_factors")``
	- TMREL - ``gbd_mapping.risk_factors.NAME.tmred``
	- Scale factor - ``gbd_mapping.risk_factors.NAME.relative_risk_scalar``


Common risk exposure models
---------------------------

Continuous exposure models
++++++++++++++++++++++++++

Categorical exposure models
+++++++++++++++++++++++++++

Hybrid exposure models
++++++++++++++++++++++

Non-standard data sources for risk exposure models
--------------------------------------------------
