.. _2023_hemoglobin_exposure:

======================================
Hemoglobin Risk Exposure
======================================

.. contents::
   :local:
   :depth: 2

Risk Exposure Overview
----------------------

Hemoglobin is a protein found in red blood cells. Hemoglobin contains iron and helps to facilitate the transporation of oxygen throughout the body. Hemoglobin concentration for an individual can be assessed via a blood test.

Risk Exposures Description in GBD
---------------------------------

In GBD, estimation of the hemoglobin exposure distribution serves two purposes:

1. To estimate the prevalence envelope of the anemia impairment (and to perform anemia causal attribution). This is done for all age/sex groups and data is stored as modelable entities.

2. To serve as the risk exposure estimate of the hemoglobin risk factor. For GBD 2023, this is specific to the pregnant population and data is stored as the low hemoglobin risk factor (REI ID 376).

The remainder of this page is specific to the second application of hemoglobin as a risk factor exposure specifically among the pregnant population.

Starting in GBD 2023, hemoglobin exposure among the pregnant population is estimated directly. This is an update from the previous approach of estimating the hemoglobin exposure among the non-pregnant population and then applying a "pregnancy adjustment factor" to obtain an exposure estimate among the pregnant population.

.. todo::

  Update this page with more detail when we receive it.

Vivarium Modeling Strategy
--------------------------

To model hemoglobin exposure among non-pregnant populations, :ref:`follow the modeling strategy found here <2019_hemoglobin_model>`. Details for modeling hemoglobin exposure among the pregnant population are included below.

Hemoglobin exposure will be modeled as a continuous exposure that follows an ensemble distribution parameterized by a mean and standard deviation. Simulants should be assigned a hemoglobin propensity value (random value between 0 and 1) that does not change throughout their lifetime and will be used to determine their specific hemoglobin exposure at any time by comparing it to the population distribution of hemoglobin specific to the simulant's current age and pregnancy status. If individual simulants are tracked across pregnant and non-pregnant states in the same simulation, their hemoglobin exposure propensity should remain constant throughout these transitions, but the exposure distribution used to determine their individual exposure will change between pregnant and non-pregnant exposures accordingly. More specifically, an individual simulant's hemoglobin exposure value will be determined by taking the percent point function (PPF) for their propensity value of the relevant population hemoglobin exposure distribution.

.. todo::

  Determine if we want hemoglobin exposure propensity to be correlated with any other risks for the MNCNH model, such as BMI and/or hypertensive disorders

Anemia attribution
++++++++++++++++++

.. todo::

  Write strategy for how to classify anemia status and YLDs in the MNCNH simulation due to timestep difficulty

Restrictions
++++++++++++

.. list-table:: GBD 2023 Risk Exposure Restrictions
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     - False
     -
   * - Female only
     - True
     - Pregnant population ONLY
   * - Age group start
     - age_group_id=7
     - Starts at age 10
   * - Age group end
     - age_group_id=15
     - Ends at age 55

Assumptions and Limitations
+++++++++++++++++++++++++++

- We assume that there are no natural variations in hemoglobin exposure throughout the duration of pregnancy. This is unrealistic as hemoglobin is typically depleted over the course of a pregnancy, especially without intervention.

.. todo::

  Add more assumptions and limitations, especially as we receive documentation from GBD modeling 

Data Description Tables
+++++++++++++++++++++++

.. list-table:: Distribution Parameters
  :widths: 15, 30, 10
  :header-rows: 1

  * - Parameter
    - Value
    - Note
  * - Exposure mean
    - rei_id=376, source='exposure', :code:`get_draws(gbd_round_id=9, gbd_id_type='rei_id', gbd_id=376, source='exposure', release_id=16)`
    - Expressed in grams per liter
  * - Exposure standard deviation
    - rei_id=376, source='exposure_sd', :code:`get_draws(gbd_round_id=9, gbd_id_type='rei_id', gbd_id=376, source='exposure_sd', release_id=16)`
    - Expressed in grams per liter
  * - Ensemble distribution weights
    - Found at :code:`/ihme/epi/risk/ensemble/_weights/low_hgb.csv`
    - 40% gamma, 60% mirror gumbel
  * - XMIN
    - 40
    - Expressed in grams per liter
  * - XMAX
    - 150
    - Expressed in grams per liter

Validation Criteria
+++++++++++++++++++

- Population mean hemoglobin among the simulated pregnant population should validate to the exposure value for REI 376 in the baseline scenario

- The hemoglobin standard deviation among the simulated pregnant population should validate to the exposure SD value for REI 376 in the baseline scenario

- Prior to implementation of any hemoglobin-affecting interventions, hemoglobin exposures should not change at the individual level over the course of pregnancy.

References
----------