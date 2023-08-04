.. _2019_hemoglobin_model:

================
Hemoglobin Model
================

.. contents::
   :local:
   :depth: 2

Hemoglobin Model Description in GBD 2019
----------------------------------------

The hemoglobin model in GBD 2019 serves as the underlying basis for both the anemia impairment model and iron deficiency risk factor model. The hemoglobin model output is an estimate of the year-, location-, age-, and sex-speciifc **continuous ensemble distribution of population hemoglobin concentration in grams per liter**.

[Kassebaum-et-al-2016-hemoglobin-2019]_

The hemoglobin distribution is estimated from a variety of sources reported as either anemia prevalence and/or mean and standard deviation hemoglobin concentration; altitude adjustments were made when appropriate and possible, although no smoking adjustments were performed. See notes on estimation among women of reproductive age below.

.. note::

  Estimates of mean and standard deviation hemoglobin among women of reproductive age are specific to the *non-pregnant* population rather than women of reproductive age as a whole inclusive of the pregnant and lactating population.

  This is because pregnancy/lactation is very influential to hemoglobin and most input data sources will exclude pregnant/lactating individuals. Input data sources that are specific to PLW were crosswalked to the reference population of non-pregnant WRA using the pregnancy adjustment factor (defined below) and then included in the model.

  Then, the hemoglobin distribution among PLW is modeled separately, compared to the pregnancy-specific anemia thresholds, and paired with the estimates among non-pregnant women in a weighted average for the final estimates of anemia impairment among all WRA.

The hemoglobin distribution was modeled in three steps:

1. ST-GPR models of mean and standard deviation hemoglobin concentration 

    Covariates for the mean model included Age-specific Fertility Rate, HIV Prevalence, SEV for Child underweight, SEV for Child wasting, Malaria Incidence, Haemoglobin C (sickle type C) trait (all ages), Haemoglobin S (sickle type S) trait (all ages), Sociodemographic Index, SEV for Impaired kidney function, Healthcare Access and Quality index, Modern contraception prevalence, and 50th percentile of haemoglobin (pooled across all microdata sources). 

    Covariates for the standard deviation model included: Malaria Incidence, Haemoglobin C (sickle type C) trait, Haemoglobin S (sickle type S) trait, Sociodemographic Index, SEV for Impaired kidney function, Healthcare Access and Quality index, Education Relative Inequality (Gini), 50th percentile of haemoglobin (pooled across all microdata sources), and mean haemoglobin (results from mean [Hb] ST-GPR model)

2. Calculation of ensemble weights

    A set of two-parameter distributions (gamma, mirror gamma, Weibull, mirror lognormal, and mirror gumbel) were fit to the sample’s haemoglobin mean and variance for each location/year/age/sex group. Notably, the distribution weights are global across location/year/age/sex groups, and only the mean and variance of the hemoglobin distribution vary by demographic group in GBD.

    The weights used for the GBD 2019 hemoglobin distribution model were 40% gamma and 60% mirror gumbel, such that:

    .. math::

    	F(x|\mu,\sigma) = 0.4 \cdot F_1(x|\mu,\sigma) + 0.6 \cdot F_2(x|\mu,\sigma)

    Where,

    :math:`\mu` is the mean population hemoglobin concentration

    :math:`\sigma` is the standard deviation of the population hemoglobin concentration distribution

    :math:`F(x)` is the ensemble distribution for population hemoglobin parameterized by :math:`\mu` and :math:`\sigma`

    :math:`F_1(x)` is a gamma distribution parameterized by :math:`\mu` and :math:`\sigma`

    And :math:`F_1(x)` is a mirror gumbel distribution parameterized by :math:`\mu` and :math:`\sigma`

:ref:`More details on ensemble distributions can be found here <vivarium_best_practices_ensemble_distributions>`.

.. todo::

	Include mathematical formulas for the gamma and mirror Gumbel distributions. For now, see the R code in the `Data Description Tables`_ section for details.

3. Generation of ensemble distributions for each location/year/age/sex group

    Because anemia thresholds depend on pregnancy status, hemoglobin distributions were modeled separately for pregnant and non-pregnant females. The pregnancy model was identical to the non-pregnancy model except that the mean and variance were adjusted by the adjustment factor. The prevalence of anemia in pregnant women and non-pregnant women were then weighted by the pregnancy rate and combined to estimate population anemia prevalence among all women of reproductive age. See the table below for the exact adjustment factors used.

	The pregnancy prevalence was represented as :math:`(ASFR + SB) \times 46/52`, where :math:`ASFR` is the location- and age-specific fertility rate, :math:`SB` is the location-specific stillbirth rate, and :math:`46/52` represents 40 weeks of preganancy and 6 weeks of post-pregnancy lactation out of 52 weeks in one year.

.. list-table:: Hemoglobin Distribution Pregnancy Adjustment Factors
   :widths: 15 15
   :header-rows: 1

   * - Parameter
     - Adjustment Factor
   * - Mean hemoglobin
     - 0.919325
   * - Hemoglobin standard deviation
     - 1.032920188

.. warning:: 

  It appears that there was an error in the GBD 2019 code to estimate the anemia impairment envelope from the ensemble distribution of hemoglobin concentration that applied the *inverse* of the pregnancy adjustment factor to mean hemoglobin of PLW. It appears that this error was incorporated in the estimates of anemia impairment prevalence among women of reproductive age. This results in an overestimation of hemoglobin and an underestimation of anemia prevalence among PLW and WRA, particularly for age/location groups with high fertility rates.

  `A demonstration of this finding is shown for select countries here <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/maternal/model3%2C%20fixed%20hemoglobin%20weight%20experiment/hemoglobin%20exposure%20nano%20sims/R%20code%20comparisons/R%20code%20prevalence%20plotting.ipynb>`_.

.. note::

  These adjustment factors were obtained from the hemoglobin code hosted `here <https://stash.ihme.washington.edu/projects/MNCH/repos/anemia/browse/model/envelope/fit_ensemblemv2p_parallel.R>`__. The code here does not utilize uncertainty around these adjustment factors, although the methods appendix reports the pregnancy adjustment factor as 0.92 (0.86 - 0.98)

  Additionally, the GBD code does *not* utilize the pregnancy adjustment factor for hemoglobin standard deviation in their estimation of anemia prevalence among women of reproductive age.

Vivarium Modeling Strategy
--------------------------

Scope
+++++

The Vivarium hemoglobin modeling strategy will be to sample values from the GBD 2019 year-, location-, age-, and sex-specific hemoglobin concentration distribution in order to assign specific hemoglobin concentration values to individual simulants. 

Restrictions
++++++++++++

There are no formal restrictions; however, the hemoglobin estimates are unreliable for the early and late neonatal age groups and should be used with caution. Additionally, the pregnancy adjustment will apply to women of reproductive age, so special attention should be paid when modelling this demographic group.

.. list-table:: GBD 2019 Risk Exposure Restrictions
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     - False
     -
   * - Female only
     - False
     - Note: pregnancy adjustment will apply to women of reproductive age
   * - Age group start
     - 0 (age_group_id=2)
     - Note: hemoglobin estimates unreliable for early and late neonatal age groups (age_group_id=[2,3])
   * - Age group end
     - 95+
     - Note: Pregnancy adjustment will apply to women of reproductive age (ages 10-55 years, age_group_ids=7-15)

Assumptions and Limitations
+++++++++++++++++++++++++++

.. todo::

  List assumptions and limitations

Data Description Tables
+++++++++++++++++++++++

Hemoglobin values should be sampled from the vivarium `risk distribution.EnsembleDistribution` function according to the parameter values defined in the table below. 

.. note::

  **Not necessary for success...**

  Hemoglobin values should be non-zero positive numbers and should also be biologically plausible. The lowest recorded hemoglobin value observed following massive blood loss [Spiess-2015]_ was 6 g/L and the lowest hemoglobin value observed in a hemodynamically stable patient not requiring cardiac or supplemental oxygen support was 14 g/L [Chai-et-al-2021]_). **The probability of sampling a hemoglobin value less than 6 g/L is low, but if it occurs, the value should be resampled until it is a positive number or clipped to a value of 6 grams per liter.**

.. list-table:: Distribution Parameters
  :widths: 15, 30, 10
  :header-rows: 1

  * - Parameter
    - Value
    - Note
  * - Hemoglobin mean
    - MEID 10487
    - source='epi', decom_step='step4'
  * - Hemoglobin standard deviation
    - MEID 10488
    - source='epi', decomp_step='step4'
  * - XMAX
    - 220
    - 
  * - Euler's constant
    - 0.57721566490153286060651209008240243104215933593992
    - 
  * - Gamma distribution weight
    - 0.4
    - 
  * - Mirror Gumbel distribution weight
    - 0.6
    - 

.. note::

  In the iterative process of validating our hemoglobin model, there was concern that the vivarium `risk_distributions.EnsembleDistribution` python function did not properly replicate the ensemble distribution R function used by GBD (`hosted here <https://stash.ihme.washington.edu/projects/MNCH/repos/anemia/browse/model/envelope>`_, specifically the *DistList_mv2p.R* and *fit_ensemblemv2p_parallel.R* files). 

  We tried to re-define the python distribution in `this notebook <https://github.com/ihmeuw/vivarium_gates_lsff/blob/main/tests/lsff_iron_exposure.ipynb>`_.

  However, it appears that the functions from the above notebook do not in  fact validate to the functions used in GBD after all and that the `risk_distribution.EnsembleDistribution` function did, `as shown in this notebook <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/maternal/model3%2C%20fixed%20hemoglobin%20weight%20experiment/hemoglobin%20exposure%20nano%20sims/Distribution%20comparisons.ipynb>`_. We have verified in a nano-sim that using the vivarium `risk_distribution.EnsembleDistribution` python function *and* the erroneous inverse pregnancy adjustment factor used by GBD acceptably validates to the GBD anemia impairment prevalence among women of reproductive age (`as shown here <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/maternal/model3%2C%20fixed%20hemoglobin%20weight%20experiment/hemoglobin%20exposure%20nano%20sims/Inverse%20adjustment%20factor.ipynb>`_), indicating that using the vivarium `risk_distributions.EnsembleDistribution` python function to model the hemoglobin ensemble distribution is appropriate.

  HOWEVER, due to runtime issues with the `risk_distribution.EnsembleDistribution` function, we will instead use the :code:`_mirrored_gumbel_ppf_2017` function `defined in this notebook <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/maternal/model3%2C%20fixed%20hemoglobin%20weight%20experiment/hemoglobin%20exposure%20nano%20sims/Distribution%20comparisons.ipynb>`_ for the :ref:`IV iron maternal simulation <2019_concept_model_vivarium_iv_iron_maternal_sim>`.

Pregnancy Adjustment
^^^^^^^^^^^^^^^^^^^^

To sample hemoglobin values for pregnant/lactating women, use the same functions as above, but multiply the hemoglobin mean and standard deviation parameters used for those functions by the respective pregnancy adjustment factors listed below. Hemoglobin exposure values for pregnant women should be sampled from this adjusted distribution using the same propensity that was used to sample from the unadjusted distribution prior to the pregnancy. The adjusted pregnancy hemoglobin exposure should persist throughout pregnancy and the postpartum period for a given simulant, at which point another value should be sampled from the (age-appropriate, which could be different than the pre-pregnancy age group) unadjusted hemoglobin exposure distribution using the same propensity value.

.. list-table:: Pregnancy Adjustment Factors
  :widths: 15, 30, 10
  :header-rows: 1

  * - Parameter
    - Value
    - Note
  * - Mean hemoglobin adjustment factor
    - 0.919325 (95% UI: 0.86, 0.98)
    - Assume a normal distribution of uncertainty within uncertainty interval. Use random seed :code:`'pregnancy_adjustment_factor'` to ensure the same values for this parameter are used in the simulation and for generation of validation targets and other externally calculated values. (Note that no uncertainty was used in the GBD 2019 code, but the uncerainty interval was reported in the methods appendix). 
  * - Hemoglobin standard deviation adjustment factor
    - 1.032920188
    - Assume no uncertainty distribution. (No uncertainty is used in the GBD 2019 code or listed in the methods appendix).

Validation Criteria
+++++++++++++++++++

Hemoglobin concentration values assigned to simulants should satisfy the following criteria:

- all_samples > 0
- mean(all_samples) ~= meid_10487
- sd(all_samples) ~= meid_10488

When the pregnancy adjustment is applied:

- mean(pregnant_population_samples) / mean(general_population_samples) ~= 0.92
- standard_deviation(pregnant_population_samples) / standard_deviation(general_population_samples) ~= 1.03

.. note::

  Given the error in the application of the pregnancy adjustment factor in the estimation of anemia impairment prevalence among WRA for GBD 2019, we will *not* use GBD 2019 estimates as validation targets. Rather, we have calculated custom validation targets using the same methodology as GBD 2019, but with the appropriate application of the pregnancy adjustment factor. `These custom validation targets are hosted here <https://github.com/ihmeuw/vivarium_research_iv_iron/tree/main/hgb_validation_targets>`_ (currently targets are saved for the locations in the IV iron simulation, but code to generate targets for additional locations is also available in this folder.)

At the population distribution level:

  For each population group in [PLW, non-pregnant WRA, all WRA including PLW]:

  - percent of population below mild threshold ~= custom total anemia impairment prevalence
  - percent of population between mild and moderate thresholds ~= custom mild anemia impairment prevalence
  - percent of population between moderate and severe thresholds ~= custom moderate anemia impairment prevalence
  - percent of population below severe threshold - ens_mv2prev(lower_severe_threshold) ~= custom severe anemia impairment prevalence

References
----------

.. [Kassebaum-et-al-2016-hemoglobin-2019]
  View `Kassebaum et al. 2016`_
    Kassebaum NJ, GBD 2013 Anemia Collaborators. The Global Burden of
    Anemia. Hematol Oncol Clin North Am. 2016 Apr;30(2):247-308. doi: https://doi.org/10.1016/j.hoc.2015.11.002
.. _`Kassebaum et al. 2016`: https://www.clinicalkey.com/service/content/pdf/watermarked/1-s2.0-S0889858815001896.pdf?locale=en_US&searchIndex=

.. [Chai-et-al-2021]
  Chai, A. L., Huang, O. Y., Rakočević, R., & Chung, P. (2021). Critical iron deficiency anemia with record low hemoglobin: a case report. Journal of medical case reports, 15(1), 472. https://doi.org/10.1186/s13256-021-03024-9

.. [Spiess-2015]
  Spiess B. (2015). Editorial Comment: Recovery from Extreme Hemodilution (Hemoglobin Level of 0.6 g/dL) in Cadaveric Liver Transplantation and Management of a Jehovah's Witness Patient with Sepsis and Profuse Bleeding After Emergency Coronary Artery Bypass Graft Surgery: Rethinking the Critical Threshold of Oxygen Delivery. A & A case reports, 4(10), 137–139. https://doi.org/10.1213/XAA.0000000000000153