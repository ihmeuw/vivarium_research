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

The hemoglobin distribution is estimated from a variety of sources reported as either anemia prevalence and/or mean and standard deviation hemoglobin concentration; altitude adjustments were made when appropriate and possible, although no smoking adjustments were performed. For data sources that *only* included pregnant women, data were crosswalked to the general population using MR-BRT such that pregnant women were matched to non-pregnant women in the same age and location group and the ratios of their hemoglobin concentrations were assessed. The resulting adjustment factor was 0.92 (95% CI: 0.86 - 0.98), such that the hemoglobin level of pregnant women is 0.92 times that of women in the general population. 

.. note:: 

	The pregnancy adjustment factor was used to crosswalk between the pregnant population and the general population in GBD (both for transformation of input data specific to pregnant women and for calculation of pregnancy-specific anemia prevalence using pregnancy-specific thresholds), however, the pregnancy adjustment factor appears to be derived from comparisons of pregnant women to non-pregnant women, which may be a limiation of this approach in that it does not account for differences in the prevalence of pregnancy in different populations; however, because this prevalence is generally low, it is likely minimally impactful.

The hemoglobin distribution was modeled in three steps:

1. ST-GPR models of mean and standard deviation hemoglobin concentration (including pregnancy adjustments as described above). 

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

    Because anemia thresholds depend on pregnancy status, hemoglobin distributions were modeled separately for pregnant and non-pregnant females. The pregnancy model was identical to the non-pregnancy model except that the mean and variance were adjusted by the adjustment factor. The prevalence of anemia in pregnant women and non-pregnant women were then weighted by the pregnancy rate and combined to estimate population anemia prevalence. See the table below for the exact adjustment factors used.

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

.. note::

  These adjustment factors were obtained from the hemoglobin code hosted `here <https://stash.ihme.washington.edu/projects/MNCH/repos/anemia/browse/model/envelope/fit_ensemblemv2p_parallel.R>`__. The code here does not utilize uncertainty around these adjustment factors, although the methods appendix reports the pregnancy adjustment factor as 0.92 (0.86 - 0.98)

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

Below is R code written to randomly sample hemoglobin concentration values from the hemoglobin distribution parameters and constants defined in the tables above. Additionally, the code block contains functions that will evaluate the proportion of the distribution below a given threshold. This code was adapted from the GBD stash code found `here <https://stash.ihme.washington.edu/projects/MNCH/repos/anemia/browse/model/envelope>`__, specifically the *DistList_mv2p.R* and *fit_ensemblemv2p_parallel.R* files.

**Code to sample from the hemoglobin exposure distribution in python has been developed and hosted in a notebook hosted** `here <https://github.com/ihmeuw/vivarium_gates_lsff/blob/main/tests/lsff_iron_exposure.ipynb>`__. The functions that should be used for sampling from the hemoglobin distribution include :code:`mirrored_gumbel_ppf` (*not* mirroed_gumbel_ppf_2017, which is an implementation that did not validate to GBD) and :code:`viv_calc_iron_nbs` (*not* viv_calc_iron or viv_calc_iron_2017, which implement the incorrect strategy for :ref:`sampling from an ensemble distribution <vivarium_best_practices_ensemble_distributions>`).

.. note::

	While not explicitly enforced by the code above, all hemoglobin values should be non-zero positive numbers. The probability of sampling a negative value is small, but if it occurs, the value should be resampled until it is a positive number or clipped to a value of 1.

Pregnancy Adjustment
^^^^^^^^^^^^^^^^^^^^

To sample hemoglobin values for :ref:`pregnant and postpartum women <other_models_pregnancy>`, use the same functions as above, but multiply the hemoglobin mean and standard deviation parameters used for those functions by the respective pregnancy adjustment factors listed below. Notably, the GBD 2019 assumes that the pregnancy adjustment factor applies to 40 weeks of gestation and 6 weeks post-gestation.

.. list-table:: Pregnancy Adjustment Factors
  :widths: 15, 30, 10
  :header-rows: 1

  * - Parameter
    - Value
    - Note
  * - Mean hemoglobin adjustment factor
    - 0.919325
    - No uncertainty is used in the GBD 2019 code, although a UI is listed in methods appendix as (0.86 - 0.98)
  * - Hemoglobin standard deviation adjustment factor
    - 1.032920188
    - No uncertainty is used in the GBD 2019 code

Validation Criteria
+++++++++++++++++++

Hemoglobin concentration values assigned to simulants should satisfy the following criteria:

- all_samples > 0
- mean(all_samples) ~= meid_10487
- sd(all_samples) ~= meid_10488

When the pregnancy adjustment is applied:

- mean(pregnant_population_samples) / mean(general_population_samples) ~= 0.92
- standard_deviation(pregnant_population_samples) / standard_deviation(general_population_samples) ~= 1.03

At the population distribution level:

- ens_mv2prev(upper_mild_threshold) ~= total anemia impairment prevalence
- ens_mv2prev(upper_mild_threshold) - ens_mv2prev(lower_mild_threshold) ~= mild anemia impairment prevalence
- ens_mv2prev(upper_moderate_threshold) - ens_mv2prev(lower_moderate_threshold) ~= moderate anemia impairment prevalence
- ens_mv2prev(upper_severe_threshold) - ens_mv2prev(lower_severe_threshold) ~= severe anemia impairment prevalence

References
----------

.. [Kassebaum-et-al-2016-hemoglobin-2019]
  View `Kassebaum et al. 2016`_
    Kassebaum NJ, GBD 2013 Anemia Collaborators. The Global Burden of
    Anemia. Hematol Oncol Clin North Am. 2016 Apr;30(2):247-308. doi: https://doi.org/10.1016/j.hoc.2015.11.002
.. _`Kassebaum et al. 2016`: https://www.clinicalkey.com/service/content/pdf/watermarked/1-s2.0-S0889858815001896.pdf?locale=en_US&searchIndex=