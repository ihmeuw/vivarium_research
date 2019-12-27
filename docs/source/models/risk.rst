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
that increases the likelihood of developing a disease or injury. In GBD, a risk factor refers to a exposure that leads to a loss of health in the population;
it can be anywhere on the causal chain as long as there is evidence to show that the risk factor is causally linked to an outcome disease or injury.

What do we measure?
+++++++++++++++++++
- Proportion of disease and injury burden attributable to specific risk factors
  (population attributable fraction)
   - e.g. burden of diarrheal due to unsafe water
   - e.g. burden of lung cancer due to smoking
- Comparative importance of the underlying risk factors which cause disease and
  injuries (summary exposure value)
   - e.g. burden of smoking compared with unsafe water

How do we measure?
++++++++++++++++++
Input:
 - Risk factor exposure (e.g. prevalence for dichotmous risks; mean, standard
   deviation, ensemble weights for continuous risks with an ensemble 
   distribution)
 - Risk factor-disease relationship (relative risk of disease outcome at each
   level of risk factor exposure)
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


Risk Factor Hierarchy
---------------------
- Environmental/occupational risks
   - Unsafe water, sanitation, and handwashing
      - Unsafe water source
      - Unsafe sanitation
      - No access to handwashing facility
   - Air pollution
	  - Particulate matter pollution
	  - Ambient ozone pollution
   - Suboptimal temperature
      - High temperature
      - Low temperature
   - Other environmental risks
	  - Residential radon
	  - Lead exposure
   - Occupational risks
      - Occupational carcinogens
      - Occupational asthmagens
      - Occupational particulate matter, gases, and fumes
      - Occupational noise
      - Occupational injuries
      - Occupational ergonomic factors
- Behavioral risks
   - Child and maternal malnutrition
	  - Suboptimal breastfeeding
	  - Child growth failure
	  - Low birth weight and short gestation
	  - Iron deficiency
	  - Vitamin A deficiency
	  - Zinc deficiency
   - Tobacco
	  - Smoking
	  - Chewing tobacco
	  - Secondhand smoke
   - Alcohol use
   - Drug use
   - Dietary risks
	  - Diet low in fruits
	  - Diet low in vegetables
	  - Diet low in whole grains
	  - Diet low in nuts and seeds
	  - Diet low in milk
	  - Diet high in red meat
	  - Diet high in processed meat
	  - Diet high in sugar-sweetened beverages
	  - Diet low in fiber
	  - Diet low in calcium
	  - Diet low in seafood omega-3 fatty acids
	  - Diet low in polyunsaturated fatty acids
	  - Diet high in trans fatty acids
	  - Diet high in sodium
   - Intimate partner violence
   - Childhood maltreatment
      - childhood sexual abuse
      - Bullying victimization
   - Unsafe sex
   - Low physical activity 
- Metabolic risks
   - High fasting plasma glucose
      - High fasting plasma glucose (continuous)
      - High fasting plasma glucose (categorical) 
   - High LDL cholesterol
   - High systolic blood pressure
   - High body-mass index
      - High body-mass index in adults
      - High body-mass index in children 
   - Low bone mineral density
   - Impaired kidney function

This hierarchy excluded level 4 risk factors, the full list of table lives at
`GBD 2019 risk factors <https://hub.ihme.washington.edu/display/GBD2019/GBD+2019+Risk+factors?preview=/54736328/80467412/
list_of_risks_gbd_2019.xlsx>`_

What is a TMREL?
----------------
The theoretical minimum risk level (TMREL) is the level of risk exposure 
that minimizes risk at the population level, or the level of risk 
that captures the maximum attributable burden.
- Straightforward: TMREL for smoking is zero = no one in the population smokes
- Controversial: standard daily consumption of sodium

How do we define PAF, PAB, and SEV?
-----------------------------------
 - **Population Attributable Fraction (PAF)** is the fraction of disease burden
   (deaths, YLDs, YLLs, DALYs) from a cause (disease or injury) that is 
   attributed to exposure to a risk factor. PAFs are not additive, mediation
   either.
 - **Population Attributable Burden (PAB)** is the attributable budrden for a
   cause due to exposure to a given risk factor. (Attributable burden = PAF *
   total burden of cause)
 - **Summary Exposure Value (SEV)** is a measure of a population’s exposure to
   a risk factor that takes into account the extent of exposure by risk level
   and the severity of that risk’s contribution to disease burden. SEV takes
   the value zero when no excess risk for a population exists and the value one when the population is at the highest level of risk; we report SEV on a scale from 0% to 100% to emphasize that it is risk-weighted prevalence.

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
.. [GBD-2017-Risk-Factors]
   Global, regional, and national comparative risk assessment of 84 behavioral, environmental and occupational, and metabolic risks or clusters of risks for
   195 countries and territories, 1990–2017: a systematic analysis for the GBD Study 2017
   https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(18)32225-6/fulltext