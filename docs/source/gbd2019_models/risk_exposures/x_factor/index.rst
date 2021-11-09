.. _2019_risk_exposure_x_factor:

======================================
Wasting X-Factor
======================================

Risk Exposure Overview
----------------------

The x-factor is a risk exposure that tries to capture the differential risk experienced by some children who may experience more relapses of wasting. We believe this is an important component of wasting epidemiology to capture [see Brain Trust notes with Chris Murray for discussion of adding this component to the model]. There are many risk factors that have been described in the literature that pre-dispose children to wasting including maternal education, household food insecurity, family size, water and sanitation.

Vivarium Modeling Strategy
--------------------------

See the :ref:`wasting x-factor risk effects document <2019_risk_effect_x_factor>` for details on the risk effects of the wasting x-factor. Given that the x-factor risk-effects are measured through comparison of a population recently recovered from SAM treatment relative to healthy controls, we will assign x-factor risk exposure according to the :ref:`child wasting exposure state <2020_risk_exposure_wasting_state_exposure>` that they are initialized into as a proxy for these respective populations.

.. note::
   
   The exact exposure distribution conditional on wasting exposure state will be calibrated/validated using the interactive simulation context. Therefore, these exposure values should be engineered to be configurable. 

The x-factor risk exposure is dichotomous and should be assigned **using the same propensity that is used to initialize simulants into a wasting risk exposure category/state** according to the :ref:`child wasting exposure model <2020_risk_exposure_wasting_state_exposure>`.

The default x-factor exposure value should be equal to 0.32 (although it should be configurable until finalization of the model calibration).

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

- Exposure distribution in simulation should match the input data
- Decrease in exposure distribution over time should be small (given that the x-factor risk exposure is assigned once at initialization or birth and that x-factor risk exposure is associated with a higher mortality rate, the x-factor exposure will decrease slightly over time/with age in our simulation)

References
----------
