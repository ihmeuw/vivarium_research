.. _models_risk:

======================
Modeling Risk Exposure
======================

.. note::

   Vivarium has the infrastructure to model any risks in the GBD hierarchy. 
   You should use tools from ``vivarium_inputs`` to pull and examine the 
   data for your risks before including them in your model.

GBD Overview
------------

What is a risk factor?
++++++++++++++++++++++
A risk factor is any attribute, characteristic or exposure of an individual 
that increases the likelihood of developing a disease or injury. Some examples 
of the more important risk factors are underweight, unsafe sex, high blood pressure, tobacco and alcohol consumption, sanitation and hygiene, and unsafe water. [WHO]_ In GBD, a risk factor refers to any exposure that leads to a 
loss of health in the population; it can be anywhere on the causal chain as 
long as there is evidence to show that the risk factor is causally linked to an outcome disease or injury.

What do we measure?
+++++++++++++++++++
- Proportion of disease and injury burden attributable to specific risk factors
   - e.g. burden of diarrheal due to unsafe water
   - e.g. burden of lung cancer due to smoking
- Comparative importance of the underlying risk factors which cause disease and
  injuries
   - e.g. burden of smoking compared with unsafe water

How do we measure?
++++++++++++++++++
Input:
 - Risk factor exposure (current distribution and counterfactual distribution)
 - Risk factor-disease relationship (risk accumulation and risk reversal)
 - Disease burden
Output:
 - Attributabe burden by age, sex, year and location

How do we select risk-outcome pairs?
++++++++++++++++++++++++++++++++++++
- The likely importance of a risk factor to disease burden and/or policy.
- Availability of sufficient data and methods to estimate risk factor exposure.
- Evidence from epidemiological studies supporting a causal relationship between 
  risk factor exposure and the outcome and available data to estimate effect 
  sizes per unit of exposure.
- Evidence that these effects can be generalized to a general population.


Risk factor hierarchy
---------------------
- Environmental/occupational risks
   - Unsafe water, sanitation, and handwashing
      - e.g. Unsafe water source
   - Air pollution
	  - e.g. Household air pollution from solid fuels
   - Other environmental risks
	  - e.g. Lead exposure
   - Occupational risks
      - e.g. Occupational exposure to asbestos
- Behavioral risks
   - Child and maternal malnutrition
	  - Suboptimal breastfeeding
	     - e.g. Non-exclusive breastfeeding
	  - Child growth failure
	     - e.g. Child underweight
	  - Low birth weight and short gestation
	     - e.g. Short gestation for birth weight
   - Tobacco
	  - e.g. Smoking
   - Dietary risks
	  - e.g. Diet low in fruits
   - Childhood maltreatment
      - e.g. childhood sexual abuse
- Metabolic risks
   - High fasting plasma glucose
   - High LDL cholesterol
   - High systolic blood pressure
   - High body-mass index
   - Low bone mineral density
   - Impaired kidney function

What is a TMREL?
----------------
The theoretical minimum risk level (TMREL) is the level of risk exposure 
that minimizes risk at the population level, or the level of risk 
that captures the maximum attributable burden.

- Straightforward: TMREL for smoking is zero = no one in the population smokes
- Controversial: standard daily consumption of sodium

What is a PAF, and what is a Population Attributable Burden?
------------------------------------------------------------
 - **Population Attributable Fraction** is the fraction of disease burden
   (deaths, YLDs, YLLs, DALYs) from a cause (disease or injury) that is 
   attributed to exposure to a risk factor. PAFs are not additive, mediation either. 
 - **Population Attributable Burden** is the attributable budrden for a cause 
   due to exposure to a given risk factor. (Attributable burden = PAF * total burden of cause)

The structure of a risk exposure model
--------------------------------------

Common risk exposure models
---------------------------

Continuous exposure models
++++++++++++++++++++++++++

Categorical exposure models
+++++++++++++++++++++++++++

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

References
----------

.. todo::
  add links