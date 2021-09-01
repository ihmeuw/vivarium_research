.. _maternal_malaria_prevention_therapy:

===========================================================
Intermittent Malaria Preventive Therapy for Pregnant Women 
===========================================================

.. contents::
   :local:
   :depth: 1

Pregnancy increases the risk of malaria infection and malaria infection is assoicated with poor maternal and infant health outcomes, especially during the first and second pregnancy [Radeva-Petrova-et-al-2014]_. Because of this, the :download:`World Health Organization recommends <who_guidance_positive_pregnancy_2016.pdf>` that pregnant women living in malaria endemic areas:

#. Sleep under insecticide-treated bednets
#. Are treated for malaria illness and anaemia
#. Receive chemoprevention with an effective antimalarial drug during the second and third trimesters 

This intervention model document details the third portion of this WHO recommendation to prevent malaria in pregnant women living in malraia endemic areas.

.. list-table:: Abbreviations
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - IPTp
    - intermittent preventive treatment (for malaria) in pregnancy 
    - 
  * - IPTp-SP
    - intermittent preventive treatment (for malaria) in pregnancy with sulfadoxine-pyrimethamine
    - 
  * - ANC
    - Antenatal care
    - 

.. todo::

  Fill out table with any abbreviations and their definitions used in this document.

Intervention Overview
-----------------------

The WHO recommendation for a positive pregnancy (2016) on intermittent preventive treatment in pregnancy (IPTp) for malaria prevention states the following: "In malaria-endemic areas in Africa, intermittent preventive treatment with sulfadoxine-pyrimethamine (IPTp-SP) is recommended for all pregnant women. Dosing should start in the second trimester, and doses should be given at least one month apart, with the objective of ensuring that at least three doses are received" (page xiv/16)

Additionally the WHO publication Guidelines for the treatment of malaria (2015) states "WHO recommends that, in areas of moderate-to-high malaria transmission of Africa, IPTp-SP be given to all pregnant women at each scheduled ANC visit, starting as early as possible in the second trimester, provided that the doses of SP are given at least 1 month apart. WHO recommends a package of interventions for preventing malaria during pregnancy, which includes promotion and use of insecticide-treated nets, as well as IPTp-SP”. To ensure that pregnant women in endemic areas start IPTp-SP as early as possible in the second trimester, policy-makers should ensure health system contact with women at 13 weeks of gestation." 

This is considered to be a strong recommendation based on high quality evidence.

.. list-table:: Affected Outcomes
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note
  * - Maternal anemia
    - Reported as protective RR
    - Not yet
    - [Radeva-Petrova-et-al-2014]_
  * - Maternal uncomplicated clinical malaria
    - Reported as protective RR
    - Not yet
    - [Radeva-Petrova-et-al-2014]_
  * - Infant birthweight
    - Reported as increase in population mean as well as protective RR for low birthweight
    - Yes
    - [Radeva-Petrova-et-al-2014]_. Statistically insignificant reduction in preterm birth

Baseline Coverage Data
++++++++++++++++++++++++

As IPTp-SP is recommended by the WHO in Malaria endemic ares in Africa for all pregnant women as part of routine ANC, baseline coverage of this intervention exists at variable levels. [Van-Eijk-et-al-2013]_ performed a meta-analysis of coverage of IPTp-SP among various countries in Sub-Saharan Africa up to 2011.

.. list-table:: Baseline coverage data
  :header-rows: 1

  * - Location
    - Subpopulation
    - Coverage parameter
    - Value
    - Note
  * - Ethiopia
    - Pregnant women
    - Proportion of pregnant women covered by IPTp-SP
    - 0
    - Not recommended by Ethiopian government due to low malaria burden, as discussed by [Ouedraogo-et-al-2019]_

.. todo::

  Determine if it is appropriate to model this intervention in Ethiopia given that it is not recommended (look into most recent recommendataion in more detail and if there are any subgroups for which the intervention is recommended).

  Do not start model builds of this intervention for Ethiopia until this is confirmed.

Vivarium Modeling Strategy
--------------------------

.. todo::

  Add an overview of the Vivarium modeling section.

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
    - Risk exposure
    - 339
    - Population mean birthweight (as continuous measure)
    - Mean difference
    - +84.18 grams (95% CI: 40.1, 128.3)
    - Assume no difference in gestational age

Birthweight
+++++++++++++++++++++

The IPTp-SP intervention affects child birthweight exposures, :ref:`which are documented here <2019_risk_exposure_lbwsg>`. The intervention should result in an **additive change to a simulant's continuous birthweight exposure value at birth (or upon initialization into the early or late neonatal age groups).** We assume there is no corresponding change in a simulant's gestational age exposure value at birth.

.. list-table:: IPTp-SP Effect on Birthweight Restrictions
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

.. list-table:: IPTp-SP Effect on Birthweight Effect Size
  :header-rows: 1

  * - Population
    - Effect size
    - Source
    - Note
  * - Overall
    - +84.18 grams (95% CI: 40.1, 128.3)
    - [Radeva-Petrova-et-al-2014]_, summary of findings table 8 
    - Shift in population mean birthweight

.. note::

  [Radeva-Petrova-et-al-2014]_ also reported a relative effect of IPTp-SP on low birthweight <2500 grams of RR=0.81 (95% CI: 0.67 - 0.99). We will not use this in our modeling strategy, but it is useful for validation/generalizability.

**How to sample and apply effect sizes:**

- Assume a normal distribution of uncertainty within the confidence interval of the effect size in the table above (the code block below describes how to sample from this distribution).

- Birthweight exposure values need to be calibrated to baseline IPTp-SP coverage in the baseline scenario

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
    * baseline_ifa_coverage represents the baseline coverage proportion"""
    if baseline_itpt_coverage_{i} == 'uncovered':
          baseline_supplemented_bw_{i} = bw_{i} - baseline_itpt_coverage_{draw} * itpt_shift_{draw}
          if alternative_itpt_coverage_{i} == 'uncovered':
            alternative_supplemented_bw_{i} = baseline_supplemented_bw_{i}
          elif alternative_itpt_coverage_{i} == 'covered':
            alternative_supplemented_bw_{i} = baseline_supplemented_bw_{i} + itpt_shift_{draw}
      elif baseline_itpt_coverage_ == 'covered':
          baseline_supplemented_bw_{i} = bw_{i} + (1 - baseline_itpt_coverage_{draw}) * itpt_shift_{draw}
          # makes assumption that all simulants covered in baseline scenario are also covered in alternative scenario
          alternative_supplemented_bw_{i} = baseline_supplemented_bw_{i}

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- IPTp using malaria chemoprevention rather than SP was found to *decrease* population mean birthweight [Radeva-Petrova-et-al-2014]_. We make the assumption that IPTp is performed using SP instead of malaria chemoprevention in accordance with the WHO recommendation in our model. 

- Assume that the impact of IPTp-SP on birthweight is not mediated through an additional impact in gestational age. As gestational age has an indepedent impact on infant outcomes, this is a conservative assumption.

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In the baseline scenario, the exposure distribution of birthweight (mean birthweight, if available) as well as the mortality rates among the neonatal age groups should match that of GBD. 

References
-----------

.. [Radeva-Petrova-et-al-2014]
  Radeva‐Petrova  D, Kayentao  K, ter Kuile  FO, Sinclair  D, Garner  P. Drugs for preventing malaria in pregnant women in endemic areas: any drug regimen versus placebo or no treatment. Cochrane Database of Systematic Reviews 2014, Issue 10. Art. No.: CD000169. DOI: 10.1002/14651858.CD000169.pub3. Accessed 31 August 2021.

.. [Van-Eijk-et-al-2013]
  Van Eijk, A. M., Hill, J., Larsen, D. A., Webster, J., Steketee, R. W., Eisele, T. P., & ter Kuile, F. O. (2013). Coverage of intermittent preventive treatment and insecticide-treated nets for the control of malaria during pregnancy in sub-Saharan Africa: a synthesis and meta-analysis of national survey data, 2009–11. The Lancet infectious diseases, 13(12), 1029-1042.

.. [Ouedraogo-et-al-2019]
  Ouedraogo, M., Kurji, J., Abebe, L., Labonté, R., Morankar, S., Bedru, K. H., Bulcha, G., Abera, M., Potter, B. K., Roy-Gagnon, M. H., & Kulkarni, M. A. (2019). Utilization of key preventive measures for pregnancy complications and malaria among women in Jimma Zone, Ethiopia. BMC public health, 19(1), 1443. https://doi.org/10.1186/s12889-019-7727-8]