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

:ref:`BMI is modeled as a risk factor with a continuous ensemble distribution in GBD <2019_risk_bmi>` and BMI-related measures are also available as several GBD covariates. Hemoglobin distribution and anemia status are also estimated in GBD. However, the correlation/joint distribution between these exposures are not considered in GBD.

Research background
---------------------

We have received trial data from the BMGF on the joint distribution of anemia and low BMI during pregnancy in LMICs, :download:`summarized in this word document <BMGF trial data.docx>`. We decided to inform this joint risk exposure distribution for our simulation with the [Woman-First-Trial]_, a multicountry randomized controlled trial of comprehensive maternal nutrition supplementation initiated before conception, including sites in rural locations of the Democratic Republic of the Congo (DRC), Guatemala, India, and Pakistan. While data from additional studies were provided, they were not used to inform our simulation as they were not designed specifically to measure these outcomes and had smaller sample sizes. BMI exposure was measured pre-pregnancy closest to conception or during the first trimester if the former was unavailable. Timing of hemoglobin exposure assessment was prioritized during second, followed by first, and then third trimesters of pregnancy.

We used this data to derive a crude relative risk of BMI below 18.5 among those with hemoglobin < 10 g/dL relative to those with hemoglobin >= 10 g/dL. :download:`The spreadsheet used to perform this calculation can be found here <relative_risk_calculation.xlsx>`, which was estimated to be equal to 2.07 (95% CI: 1.79, 2.39).

.. note::

  We calculated the hemoglobin stratum-specific prevalence of low BMI using the GBD BMI distribution and the relative risk from the Woman First Trial, `as shown in this notebook <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/misc_investigations/BMI%20and%20anemia%20exposure.ipynb>`_.

Vivarium Modeling Strategy
--------------------------

:ref:`Hemoglobin exposure <2019_hemoglobin_model>` will be assigned as a continuous risk exposure that varies as simulants age and move through pregnancy model states. Maternal BMI exposure is a categorical risk exposure conditional on hemoglobin status at the start of pregnancy. The maternal BMI risk exposure should be assigned at the start of each pregnancy. In the instance of multiple pregnancies for a given simulant, maternal BMI exposure should be re-assigned according to the simulant's hemoglobin exposure value at the time of the second pregnancy, although the same propensity for maternal BMI exposure should be used for that simulant throughout the simulation.

Exposures should be assigned according to the following steps:

#. Assign a hemoglobin exposure value according to the :ref:`hemoglobin exposure document <2019_hemoglobin_model>`.
#. Assess which categorical hemoglobin exposure level (<100 g/L or >= 100g/L) the assigned continuous hemoglobin exposure value falls within. This should be done based on the continuous hemoglobin exposure level at the start of pregnancy, *after* the pregnancy adjustment factor is applied to the simulant's hemoglobin exposure (in other words, use the pregnant hemoglobin exposure rather than non-pregnant hemoglobin exposure).
#. Assign a maternal BMI exposure value according to the maternal BMI exposure distribution specific to the relevant maternal hemoglobin exposure stratum.

.. list-table:: Exposure distribution
  :header-rows: 1

  * - Hemoglobin stratum
    - BMI < 18.5 exposure value
    - Note
  * - < 10 g/dL
    - `Low hemoglobin draw/location/age-specific values available here <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/misc_investigations/prevalence_of_low_bmi_given_hemoglobin_below_10.csv>`_
    - Informed from [Woman-First-Trial]_ data provided by BMGF and the GBD BMI exposure distribution. `Calculated in this notebook <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/misc_investigations/BMI%20and%20anemia%20exposure.ipynb>`_
  * - >= 10 g/dL
    - `High hemoglobin draw/location/age-specific values available here <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/misc_investigations/prevalence_of_low_bmi_given_hemoglobin_above_10.csv>`_
    - Estimated in the same way as the above row

.. note::
  
  I could calculate non age-specific values if that would be easier for the SWEs

Assumptions and limitations
++++++++++++++++++++++++++++

- The crude association between BMI and hemoglobin does not vary by location or age group
- We assume the GBD BMI distribution among all women of reproductive age does not differ with the pre-pregnancy BMI of those who become pregnant

Validation Criteria
+++++++++++++++++++

- We should continue to meet validation criteria for the :ref:`hemoglobin exposure model <2019_hemoglobin_model>`
- Low BMI exposure during pregnancy stratified by hemoglobin thresholds should validate to the input data above

References
-----------

.. [Mocking-et-al-2018]
  Mocking, M., Savitri, A. I., Uiterwaal, C., Amelia, D., Antwi, E., Baharuddin, M., Grobbee, D. E., Klipstein-Grobusch, K., & Browne, J. L. (2018). Does body mass index early in pregnancy influence the risk of maternal anaemia? An observational study in Indonesian and Ghanaian women. BMC public health, 18(1), 873. https://doi.org/10.1186/s12889-018-5704-2

.. [Woman-First-Trial]
  Hambidge KM, Westcott JE, Garcés A, Figueroa L, Goudar SS, Dhaded SM, Pasha O, Ali SA, Tshefu A, Lokangaka A, Derman RJ, Goldenberg RL, Bose CL, Bauserman M, Koso-Thomas M, Thorsten VR, Sridhar A, Stolka K, Das A, McClure EM, Krebs NF; Women First Preconception Trial Study Group. A multicountry randomized controlled trial of comprehensive maternal nutrition supplementation initiated before conception: the Women First trial. Am J Clin Nutr. 2019 Feb 1;109(2):457-469. doi: 10.1093/ajcn/nqy228. PMID: 30721941; PMCID: PMC6367966.