.. _2019_risk_exposure_x_factor:

======================================
Wasting X-Factor
======================================

Risk Exposure Overview
----------------------

The x-factor is a risk exposure that tries to capture the differential risk experienced by some children who may experience more relapses of wasting. We believe this is an important component of wasting epidemiology to capture [see Brain Trust notes with Chris Murray for discussion of adding this component to the model]. There are many risk factors that have been described in the literature that pre-dispose children to wasting including maternal education, household food insecurity, family size, water and sanitation. However, we have not found any conclusive evidence yet of a single x-factor is or its effect size.

.. note::

  See Nicole's zotero library folder 'Relapse' and 'Determinants' to see studies on this topic.

Vivarium Modeling Strategy
--------------------------

As we do not have a precise definition of the x-factor risk exposure, we will model the exposure to be equal to the :ref:`maternal BMI risk exposure <2019_risk_exposure_maternal_bmi>`. We are using maternal undernutrition as a **proxy** for household food insecurity and other factors that have been suggested determinants of child malnutrition. [Na_2020-x-factor-risk-exposure]_ [Mohammed_2018-x-factor-risk-exposure]_ 

Additionally, we will correlate the x-factor risk exposure with the maternal BMI risk exposure according to :ref:`this document <2019_risk_correlation_maternal_bmi_x_factor>`. NOTE: we chose to model a high (but not perfect) degree of correlation between the x-factor and maternal BMI risk exposures to demonstrate that these are indeed distinct concepts in our simulation. Revisiting this approach after discussion with domain experts may be desired!

.. note::

  **Risk initialization**

  For simulants initialized into the simulation at the simulation start date on 1/1/2022, we assume that the year of simulation run time prior to the implementation of intervention coverage on 1/1/2023 is a sufficient "burn-in" period to reflect the greater wasting exposure among simulants exposed to the x-factor than those unexposed to the x-factor. One year is assumed to be adequate given that the average time to recovery of MAM/SAM is near 60 days (:ref:`Treatment and management for acute malnutrition <intervention_wasting_treatment>`), indicating that simulants who were initialized into wasted exposure states will have transitioned out of those states and the simulants who occupy the wasted exposure states at the time of intervention implementation will have transitioned into those states according to their wasting incidence rates that are affected by the x-factor.

  For simulants born into the simulation, while we do not initialize their wasting exposure state according to their x-factor exposure state explicitly, we assume that the correlation between these two risks through their individual correlations with birthweight will be adequate.

Restrictions
++++++++++++

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
     -
   * - Age group start
     - 164 (birth)
     -
   * - Age group end
     - 5 years of age
     -

Assumptions and Limitations
+++++++++++++++++++++++++++

.. todo::

   Detail assumptions and limitations related to the x-factor risk exposure

Validation Criteria
+++++++++++++++++++

- Exposure distribution should match :ref:`maternal BMI risk exposure <2019_risk_exposure_maternal_bmi>` 
- Decrease in exposure distribution over time should be small (given that the x-factor risk exposure is assigned once at initialization or birth and that x-factor risk exposure is associated with a higher mortality rate, the x-factor exposure will decrease slightly over time/with age in our simulation)

References
----------

.. [Mohammed_2018-x-factor-risk-exposure]

  View `Mohammed 2018`_

    Bayesian Gaussian regression analysis of malnutrition for children under five years of age in Ethiopia, EMDHS 2014

.. _`Mohammed 2018`: https://pubmed-ncbi-nlm-nih-gov.offcampus.lib.washington.edu/29636912/

.. [Na_2020-x-factor-risk-exposure]

  View `Na 2020`_

    Maternal nutritional status mediates the linkage between household food insecurity and mid-infancy size in rural Bangladesh

.. _`Na 2020`: https://pubmed-ncbi-nlm-nih-gov.offcampus.lib.washington.edu/32102702/