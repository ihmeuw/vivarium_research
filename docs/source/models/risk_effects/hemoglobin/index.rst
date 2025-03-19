.. _2023_hemoglobin_effects:

..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1
  ---------------

  Section Level 2
  +++++++++++++++

  Section Level 3
  ^^^^^^^^^^^^^^^

  Section Level 4
  ~~~~~~~~~~~~~~~

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

====================================
GBD 2023 Hemoglobin Risk Effects
====================================

.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

.. todo::

  Provide overview and references for hemoglobin team's efforts for the hemoglobin burden of proof models when they are available

GBD 2023 Modeling Strategy
--------------------------

.. note::

  As of March 2025 it is undecided whether the hemoglobin risk factor will be included in the GBD 2023 publication. Regardless, risk effects estimates for the following affected outcomes have been uploaded to GBD shared functions.

  These risk effects are expected to be updated at some point in the future to reflect an expanded date range for the systematic review conducted to inform the risk effects measures, but the structure of the data is not expected to change.

In GBD 2023, the hemoglobin risk effects are modeled as continuous risk curves with 1,000 exposure estimates ranging between values of 40 and 150. Exposure values <40 are assigned a risk value consistent with an exposure of 40 and exposure values >150 are assigned a risk value consistent with an exposure of 150.

.. list-table:: Affected Entities
   :widths: 5 5 5 5 5
   :header-rows: 1

   * - Outcome
     - Outcome type
     - Outcome ID
     - Affected measure
     - Note
   * - Maternal hemorrhage
     - cause
     - 367
     - incidence (affects mortality and morbidity in GBD)
     - In GBD shared functions, but expected to be updated
   * - Maternal sepsis and other infections
     - cause
     - 368
     - incidence (affects mortality and morbidity in GBD)
     - In GBD shared functions, but expected to be updated
   * - Maternal hypertensive disorders
     - cause
     - 369
     - incidence (affects mortality and morbidity in GBD)
     - In GBD shared functions, but expected to be updated
   * - Depressive disorders
     - cause
     - 567
     - incidence (affects mortality and morbidity in GBD) 
     - In GBD shared functions, but expected to be updated

.. todo::

  Determine how GBD handles the fact that the hemoglobin risk factor is specific to the pregnant population but the depressive disorders cause is not when we get relevant documentation

The hemoglobin team has also estimated risk effects for several additional outcomes, which are not available in GBD shared functions due to complications and outstanding work needed in order for the risk effects to be compatible with the existing GBD structure related to the LBWSG risk factor and neonatal disorders. A list of these affected outcomes is shown below:

- Low birth weight

  - Will be operationalized as categorical (including effects for very low birth weight and extremely low birth weight when possible) as well as continuous. The estimates for the categorical measure are in progress/complete, but the estimates for the continuous measure have not yet been started as of March 2025.

- Preterm birth
    
  - Will be operationalized as categorical (including effects for very preterm and extremely preterm when possible) as well as continuous. The estimates for the categorical measure are in progress/complete, but the estimates for the continuous measure have not yet been started as of March 2025.

- Small for gestational age

- Large for gestational age

- Neonatal sepsis and other neonatal infections

- Neonatal all-cause mortality

- Stillbirth


Vivarium Modeling Strategy
--------------------------

.. list-table:: Risk Outcome Relationships for Vivarium
   :header-rows: 1

   * - Category
     - Outcome
     - Outcome type
     - Outcome ID
     - Affected measure
     - Note
   * - Maternal disorders
     - :ref:`Maternal hemorrhage <2021_cause_maternal_hemorrhage_mncnh>`
     - cause
     - c367
     - :math:`ir`
     - 
   * - Maternal disorders
     - :ref:`Maternal sepsis and other maternal infections <2021_cause_maternal_sepsis_mncnh>`
     - cause
     - c368
     - :math:`ir`
     - 
   * - Maternal disorders
     - Maternal hypertensive disorders
     - cause
     - c369
     - TBD
     - Modeling strategy for hypertensive disorders cause in the MNCNH model is still outstanding. The risk effects model for this cause may require a custom approach to account for the complexity of pre-eclampsia and related interventions in the MNCNH model.
   * - Maternal disorders
     - Depressive disorders
     - cause
     - c567
     - :math:`ir`
     - A modeling strategy for maternal depressive disorders in the MNCNH model is still outstanding.

.. todo::

  Update this page with hypertension and depression cause model links when ready

Maternal disorders
++++++++++++++++++++

Use the modeling strategy described below for the following maternal disorders subcauses:

- :ref:`Maternal hemorrhage <2021_cause_maternal_hemorrhage_mncnh>`
- :ref:`Maternal sepsis and other maternal infections <2021_cause_maternal_sepsis_mncnh>`
- Maternal hypertensive disorders
- Maternal depressive disorders

.. todo::

  Link hypertension and depressive disorders cause model documents when ready and write custom strategy for hypertensive disorders as necessary

Use :ref:`hemoglobin exposure in pregnancy model <2023_hemoglobin_exposure>` at the end of the pregnancy section/entrance into the intrapartum section to determine risk effects. There may be individual exposure values assigned that are outside of the defined risk curves in GBD. In this case, for exposures <40, assign the risk corresponding to an exposure value of 40. For exposures >150, assign the risk corresponding to an exposure value of 150.

.. todo::

  Clarify timing with MNCNH-specific hemoglobin trajectory documentation (ie after pregnancy hemoglobin subcomponent/application of intervention effects has been completed) when this is available.

Use the population attributable fraction values pulled from GBD shared functions such that the maternal disorder incidence rate for an individual :math:`i` for a given affected maternal disorder subcause is as follows:

.. math::

  ir_i = ir * (1 - PAF) * RR_i

The relative risk curves for maternal disorders affected outcomes in GBD shared functions as of March 2025 are shown below for reference. These values have been transformed to be relative to a hemoglobin exposure of 110 g/L (the threshold for anemia in pregnancy) for ease of interpretation. However, they are stored in GBD shared functions as relative to a hemoglobin exposure of 40 g/L.

.. image:: maternal_disorders_risk_curve.PNG

Validation and Verification Criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Overall incidence and mortality of each affected maternal disorder cause should continue to validate to GBD

- Overall hemoglobin exposure should continue to validate to GBD

- Individual-level incidence and mortality of each affected maternal disorder outcome should vary according to hemoglobin exposure and corresponding risk

  - Note that while the mortality rate should vary in accordance with hemoglobin risk, the case fatality rate (per incident case) should not 

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. We are using population attributable fractions that do not account for correlation with confounding factors.

  To minimize bias, the PAFs of hemoglobin on affected maternal disorder outcomes should account for the joint effects of any additional modeled factors that (1) are correlated with hemoglobin exposure and (2) affect the same outcome. A list of potential factors that satisfy these criteria are listed below:

    - Cesarean section and maternal hemorrhage

    - Intrapartum azithromycin intervention and maternal sepsis

    - Preeclampsia prevention/treatment interventions and maternal hypertensive disorders

  All of these interventions may be expected to be positively correlated with hemoglobin exposure through access to the health care system or other factors. Therefore, by not considering the joint effects of these factors with the hemoglobin risk effect in baseline calibration of our model, we are likely underestimate the PAF for maternal hemorrhage and overestimate the PAF for maternal sepsis and hypertensive disorders. 

  This will likely result in an overestimate of the impact of interventions that work through reductions in anemia (MMS, IV iron) on maternal hemorrhage and overestimate the impact on maternal sepsis and hypertensive disorders.

2. We do not consider how hemoglobin exposure and/or risk effects vary with gestational age at birth in this model.

References
----------

