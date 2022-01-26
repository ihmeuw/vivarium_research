.. _2019_risk_exposure_maternal_bmi_hgb:

====================================================================
Joint distribution of maternal body mass index and hemoglobin level
====================================================================

Risk Exposure Overview
----------------------

Maternal nourishment status during pregnancy is associated with child health outcomes such as infant birthweight. Further, maternal nourishment is highly correlated with additional risk exposures that may be related to household food insecurity. Low maternal BMI and maternal anemia are two correlated risk exposures associated with poor health outcomes among mother and child [Mocking-et-al-2018]_.

Maternal BMI is discussed in more detail on the :ref:`maternal BMI risk exposure page <2019_risk_exposure_maternal_bmi_hgb>`. Maternal hemoglobin/anemia is discussed in more detail on the :ref:`hemoglobin/anemia/iron deficiency documents <2019_hemoglobin_anemia_and_iron_deficiency>`. The present page will be specific to the joint distribution of maternal BMI and hemoglobin.

Risk Exposures Description in GBD
----------------------------------------

BMI is modeled as a risk factor with a continuous ensemble distribution in GBD and BMI-related measures are also available as several GBD covariates. Hemoglobin distribution and anemia status are also estimated in GBD. However, the correlation/joint distribution between these exposures are not considered in GBD.

Vivarium Modeling Strategy
--------------------------

We will implement a categorical joint risk exposure distribution of maternal BMI and anemia status using data informed from ongoing BMGF trials.

Exposures should be assigned according to the following steps:

#. Assign a hemoglobin exposure value according to the :ref:`hemoglobin exposure document <2019_hemoglobin_model>`.
#. Determine which categorical hemoglobin exposure level the assigned value falls within. TODO: specify hemoglobin threshold value and specify how this should change according to pregnancy status (will depend on data received from BMGF).
#. Assign a maternal BMI exposure value according to the maternal BMI exposure distribution specific to the relevant maternal hemoglobin exposure stratum.

.. list-table:: Exposure distribution
  :header-rows: 1

  * - Location
    - Hemoglobin stratum
    - BMI < 18.5 exposure value
    - Note
  * - Sub-Saharan Africa
    - < 10 g/dL
    - 
    - 
  * - Sub-Saharan Africa
    - >= 10 g/dL
    - 
    - 
  * - South Asia
    - < 10 g/dL
    - 
    - 
  * - South Asia
    - >= 10 g/dL
    - 
    - 

.. todo::

  List exposure distributions for all modeled locations. 

Assumptions and limitations
++++++++++++++++++++++++++++

.. todo::

  List assumptions and limitations

Validation Criteria
+++++++++++++++++++

.. todo::

  List validation criteria

References
-----------

.. [Mocking-et-al-2018]
  Mocking, M., Savitri, A. I., Uiterwaal, C., Amelia, D., Antwi, E., Baharuddin, M., Grobbee, D. E., Klipstein-Grobusch, K., & Browne, J. L. (2018). Does body mass index early in pregnancy influence the risk of maternal anaemia? An observational study in Indonesian and Ghanaian women. BMC public health, 18(1), 873. https://doi.org/10.1186/s12889-018-5704-2