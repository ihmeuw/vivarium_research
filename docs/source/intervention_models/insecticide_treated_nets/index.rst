.. _insecticide_treated_nets:

====================================================
Insecticide Treated Bed Nets for Malaria Prevention
====================================================

.. contents::
   :local:
   :depth: 2

Malaria is a major cause of preventable mortality in areas endemic to the disease such as Sub-Saharan Africa. Malaria is a mosquito-born disease and prevention of malaria transmission can include vector control measures (such as indoor residual spraying of insecticides and insecticide-treated bed nets) as well as drug-based prevention therapies (such as :ref:`intermittent prevention therapy during pregnancy <maternal_malaria_prevention_therapy>`). Vulnerable groups to malaria disease include children under five as well as pregnant women (malaria infection during pregnancy can lead to poor health outcomes in infants).

This intervention document focuses on insecicide treated bed nets for malaria prevention.

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - ITN
    - Insecticide treated nets
    - 
  * - ANC
    - Antenatal care
    - 

Intervention Overview
-----------------------

Insecticide treated bed nets effectively reduce malaria incidence (and therefore its associated maladies) through the prevention/reduction of mosiquto bites. Children under five and pregnant women are identified as priority groups for the ITN intervention due to their vulnerability to malaria. Due to their high effectiveness and low cost, ITNs have been freely distributed through governmental/other campaigns, as discussed in [Belay-and-Deressa-2008]. However, despite attempts to distribute ITNs, access to the intervention remains limited in some area and a gap between ITN access and use remains [Deressa-et-al-2011]. ITN use during pregnancy has been associated with factors such as household wealth [Deressa-et-al-2014], education [Yitayew-et-al-2018], and ANC attendance [Ouedraogo-et-al-2019].

.. todo::

  Add greater discussion of successes and failures of ITN intervention programs

.. list-table:: Affected Outcomes
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note 
  * - Malaria Incidence
    - Decrease
    - No
    -
  * - Birthweight
    - Increase in population mean value
    - Yes
    - Effect modified by parity in [Gamble-et-al-2007]_
  * - Preterm birth
    - Protective relative risk
    - No
    - Statistically insigificant from [Gamble-et-al-2007]_
  * - Maternal hemoglobin
    - Increase in population mean value
    - No
    - Statistically insignificant from [Gamble-et-al-2007]_

Baseline Coverage Data
++++++++++++++++++++++++

The :download:`2015 Ethiopia Malaria Indicator Survey <Ethiopia_MIS_2015.pdf>` is a nationally representative survey is a "large, nationally representative
survey of coverage of key malaria control interventions, treatment-seeking behavior, and malaria prevalence" (p. 10). According to the survey, "in malarious areas:" 44% of pregnant women slept under an ITN the previous night and 70% of pregnant women who lived in households that owned at least one ITN slept under an ITN the previous night (Table 21). ITN use among pregnant women was higher in urban areas and among wealthier households. Estiamtes are also available by region.

.. list-table:: ITN Baseline Coverage
  :header-rows: 1

  * - Location
    - Subpopulation
    - Coverage parameter
    - Value
    - Note
  * - Ethiopia
    - Pregnant women in malarious areas
    - Proportion sleeping under ITNs
    - 0.44 (SD: 0.021)
    - Assume normal distribution of uncertainty. SD of uncertainty distribution calculated from :math:`SE = \sqrt{p * (1 - p) / n}`. Data from Ethiopia MIS 2015.

.. note::

  Because we do not currently model malarious areas in our simulations (but rather generalize the malaria burden to the entire population), we will assume that the coverage proportion of ITNs in malarious areas is representative of the general population of pregnant women as well.

Vivarium Modeling Strategy
--------------------------

.. list-table:: Modeled Outcomes
  :header-rows: 1

  * - Outcome
    - Outcome type
    - Outcome ID
    - Affected measure
    - Effect size measure
    - Effect size
    - Note
  * - Birthweight
    - GBD risk exposure
    - 339
    - Population mean birthweight
    - Mean difference
    - +33 grams (95% CI: 5, 62)
    - 

Birthweight
+++++++++++++++++++++

The ITN intervention affects child birthweight exposures, :ref:`which are documented here <2019_risk_exposure_lbwsg>`. The intervention should result in an **additive change to a simulant's continuous birthweight exposure value at birth (or upon initialization into the early or late neonatal age groups).** We assume there is no corresponding change in a simulant's gestational age exposure value at birth.

.. list-table:: ITN effect on birthweight restrictions
  :header-rows: 1

  * - Restriction
    - Value
    - Note
  * - Male only
    - False
    - 
  * - Female only
    - False
    - 
  * - Age group start
    - Birth
    - 
  * - Age group end
    - Late neonatal
    - 
  * - Other
    - 
    - 

.. list-table:: ITN and Birthweight Effect Sizes
  :header-rows: 1

  * - Population
    - Effect size
    - Note
  * - Pregnant women (overall)
    - +33 grams (95% CI: 5, 62)
    - [Gamble-et-al-2007]_
  * - Pregnant women in first or second pregnancy
    - +55 (95% CI: 21, 88)
    - [Gamble-et-al-2007]_
  * - Pregnant women in third or later pregnancy
    - -20 (95% CI: -74, 33)
    - [Gamble-et-al-2007]_

.. note::

  While there is evidence for effect modification of ITN on birthweight by maternal parity, we will model the overall effect until a maternal parity model is developed if/when needed

.. todo::

  Use the distribution of 3rd or later birth order from Ethiopia 2019 DHS

**How to sample and apply effect sizes:**

- Assume a normal distribution of uncertainty within the confidence interval of the effect size in the table above (the code block below describes how to sample from this distribution).

- Birthweight exposure values need to be calibrated to baseline ITN coverage in the baseline scenario

.. code-block::

  from scipy.stats import norm
  def sample_from_normal_distribution(mean, lower, upper):
      """Instructions on how to sample from a normal distribution given a mean value and
      95% confidence interval for a parameter"""
      std = (upper - lower) / 2 / 1.96
      dist = norm(mean, std)
      return dist.rvs()

  for i in simulants:
    """In the baseline scenario, we need to calibrate baseline coverage
    so that the difference between covered and uncovered babies, on
    average, equals to the effect shift AND that the population mean birthweight value
    from GBD is approximately unchanged.
    * bw_{i} represents the assigned continuous birthweight exposure value for a
    simulant sampled from GBD, which may or may not have already been affected by other
    factors such as maternal BMI, etc. BEFORE consideration of the impact of
    this intervention
    * baseline_itn_coverage represents the baseline coverage proportion"""
    if baseline_itn_coverage_{i} == 'uncovered':
          baseline_supplemented_bw_{i} = bw_{i} - baseline_itn_coverage_{draw} * itn_shift_{draw}
          if alternative_itn_coverage_{i} == 'uncovered':
            alternative_supplemented_bw_{i} = baseline_supplemented_bw_{i}
          elif alternative_itn_coverage_{i} == 'covered':
            alternative_supplemented_bw_{i} = baseline_supplemented_bw_{i} + itn_shift_{draw}
      elif baseline_itn_coverage_ == 'covered':
          baseline_supplemented_bw_{i} = bw_{i} + (1 - baseline_itn_coverage_{draw}) * itn_shift_{draw}
          # makes assumption that all simulants covered in baseline scenario are also covered in alternative scenario
          alternative_supplemented_bw_{i} = baseline_supplemented_bw_{i}

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- We assume that the maternal parity distribution of the study population is similar to that of our modeled population. If the modeled population has a lower parity distribution than the study population, we will underestimate the effect of the distribution (and vise-versa).

- Assume that the impact of ITN on birthweight is not mediated through an additional impact in gestational age. As gestational age has an indepedent impact on infant outcomes, this is a conservative assumption.

- We are limited in that we do not assume a joint distribution of ITN coverage and malaria risk. Additionally, we do not consider correlation between baseline intervention coverage and other factors that may be associated with birthweight such as maternal education, maternal age, and ANC attendance.

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- In the baseline scenario, the exposure distribution of birthweight (mean birthweight, if available) as well as the mortality rates among the neonatal age groups should match that of GBD.

- The coverage of the ITN intervention in the baseline and alternative scenarios should match the associated input values

References
------------

.. [Gamble-et-al-2007]
  Gamble, C., Ekwaru, P. J., Garner, P., & ter Kuile, F. O. (2007). Insecticide-treated nets for the prevention of malaria in pregnancy: a systematic review of randomised controlled trials. PLoS medicine, 4(3), e107. https://doi.org/10.1371/journal.pmed.0040107

.. todo::

  Add remaining citations into RST functionality