.. _insecticide_treated_nets:

====================================================
Insecticide Treated Bed Nets for Malaria Prevention
====================================================

.. contents::
   :local:
   :depth: 1

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

Intervention Overview
-----------------------


.. list-table:: Affected Outcomes
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note 
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

.. todo::

  Document known baseline coverage data, using the table below if appropriate

.. list-table:: Baseline coverage data
  :header-rows: 1

  * - Location
    - Subpopulation
    - Coverage parameter
    - Value
    - Note
  * - 
    - 
    - 
    - 
    - 

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



Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- We assume that the maternal parity distribution of the study population is similar to that of our modeled population. If the modeled population has a lower parity distribution than the study population, we will underestimate the effect of the distribution (and vise-versa).

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

References
------------

.. [Gamble-et-al-2007]
  Gamble, C., Ekwaru, P. J., Garner, P., & ter Kuile, F. O. (2007). Insecticide-treated nets for the prevention of malaria in pregnancy: a systematic review of randomised controlled trials. PLoS medicine, 4(3), e107. https://doi.org/10.1371/journal.pmed.0040107