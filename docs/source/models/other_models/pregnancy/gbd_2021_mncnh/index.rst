.. _other_models_pregnancy_closed_cohort_mncnh:

..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  ---------------------

  Section Level 2 (#.#)
  +++++++++++++++++++++

  Section Level 3 (#.#.#)
  ~~~~~~~~~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

=========================================
Pregnancy: GBD 2021, Closed Cohort, MNCNH
=========================================

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - ASFR
    - Age-specific fertility rate
    - 
  * - SBR
    - Stillbirth to live birth ratio
    - 
  * - LBWSG
    - Low birthweight and short gestation
    - 

Overview
-------------

This model document is an adaptation of the :ref:`pregnancy model document found here <other_models_pregnancy_closed_cohort>` and has been created for the :ref:`MNCNH Portfolio project <2024_concept_model_vivarium_mncnh_portfolio>`. It is building off the work done in the :ref:`nutrition optimization project <2021_concept_model_vivarium_nutrition_optimization>`. A prior verison of this model was also used for the :ref:`IV iron simulation <2019_concept_model_vivarium_iv_iron>`. 

This version is also a closed cohort, but differs from the nutrition optimization project in that we are splitting the pregnancy and intrapartum stages of the model in a more significant way to allow for added details. Therefore, this model only encompasses initializing pregnant simulants, and data needed for healthcare during pregnancy. 

All details related to intrapartum, including most maternal disorders, will be covered separately in an intrapartum modeling page. 

GBD Modeling Strategy
----------------------

Pregnancy and births are not explicit outcomes in the GBD study. However, there are location- and year-specfic GBD covariates related to fertility and births, including:

.. list-table:: Covariates
  :widths: 15 15 15
  :header-rows: 1

  * - Covariate name
    - Covariate ID
    - Note
  * - Live births (thousands)
    - 60
    - 
  * - Live births by sex
    - 1106
    - 
  * - Live births by sex and maternal age
    - 2298
    - 
  * - Stillbirth to live birth ratio
    - 2267
    - Not specific to maternal age. Upper and lower bound estimates are equal to mean estimate (no uncertainty interval)
  * - Age-specific fertility rate
    - 13
    - 
  * - Total fertility rate
    - 2363
    - 

GBD has estimated the prevalence of pregnancy (as an intermediate variable for the estimation of various outcomes) as:

.. math::

   (ASFR + (SBR * ASFR)) * 46/52

Where :math:`ASFR` is the age-specific fertility rate, :math:`SBR` is the stillbirth to live birth ratio, and :math:`46/52` is the proportion of the year spent pregnant (40 weeks) and postpartum (6 weeks).

.. todo::

   Determine the threshold of gestational age at which a loss of pregnancy is classified as a stillbirth rather than miscarriage for the GBD covariate. Standard thresholds are 20 or 24 weeks.

Vivarium Modeling Strategy
----------------------------

We will model pregnancy as a characteristic of women of reproductive age in our simulations. We will inform the *incidence* of pregnancy using the age-specific fertility and stillbirth to live birth ratio covariates from GBD. We will inform the *duration* of pregnancy using the GBD 2019 exposure distribution of gestational age.

.. image:: diagram.svg

.. note::

  Maternal disorders are entirely handled in the intrapartum model for wave 1 of this project. At current there are no risk factors (other than age) included either. 

  We will add risk factors to this model (BMI, blood pressure, hemoglobin) and may also add some maternal disorders, such as preeclampsia and anemia. Though we have not determined where we will have simulants accumulate YLDs/deaths (might all be in the intrapartum model). 

.. list-table:: State definitions
  :widths: 15 15 15
  :header-rows: 1

  * - State
    - Description
    - Note
  * - np
    - Not pregnant or postpartum
    - 
  * - p
    - Pregnant
    - 
  * - output
    - Output data 
    - Recording of simulant data for use in the next phase of the simulation, the intrpartum model.

.. note::

  For this model, we will not be using "time" or "time steps" in the traditional sense. Rather, simulants will be initialized and then go through the decision tree outlined on the :ref:`MNCNH Portfolio project <2024_concept_model_vivarium_mncnh_portfolio>` page. Following that, data will be recorded for use in the intrapartum model. 

.. list-table:: State prevalence table for initialization
  :widths: 15 15 15
  :header-rows: 1

  * - State
    - Value
    - Note
  * - np
    - 0
    - 
  * - p
    - 1
    - 

.. list-table:: State transition data
  :header-rows: 1

  * - Source state
    - Sink state  
    - Transition name
    - Transition rate
    - Note
  * - np
    - p
    - incidence_p
    - 0
    - Assumed zero for convenience. Note that this is typically :math:`\frac{ASFR + ASFR * SBR + incidence_\text{c995} + incidence_\text{c374}}{prevalence_\text{np}}`
  * - p
    - output
    - completion of the decision tree
    - Time step based transition where all simulants move to the next stage following the decision tree
    - Single time step based state 

.. list-table:: Data values
  :header-rows: 1

  * - Parameter
    - Data type  
    - Data ID
    - Source
    - Note
  * - ASFR
    - Covariate
    - 13
    - get_covariate_estimates: decomp_step='iterative' for GBD 2021
    - Assume lognormal distribution of uncertainty.
  * - SBR
    - Covariate
    - 2267
    - get_covariate_estimates: decomp_step='iterative' for GBD 2021
    - Parameter is not age specific and has no draw-level uncertainty. Use mean_value as location-specific point parameter.
  * - incidence_c995
    - Incidence rate of abortion and miscarriage cause
    - c995
    - como; decomp_step='iterative'
    -  Use the :ref:`total population incidence rate <total population incidence rate>` directly from GBD and do not rescale this parameter to susceptible-population incidence rate using condition prevalence. 
  * - incidence_c374
    - Incidence rate of ectopic pregnancy
    - c374
    - como; decomp_step='iterative'
    -  Use the :ref:`total population incidence rate <total population incidence rate>` directly from GBD and do not rescale this parameter to susceptible-population incidence rate using condition prevalence. 

.. list-table:: Restrictions
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
     -
   * - Age group start
     - 10 to 14 years
     - ID=7
   * - Age group end
     - 50 to 54 years
     - ID=15


**Pregnancy modeling steps:**

*At initialization:*

#. Assign pregnancy state according to state prevalence values
#. Assign partial or full term duration according to table in `Pregnancy term lengths`_ section
#. Assign sex of infant if pregnancy is full term (stillbirth or live birth)
#. Assign duration of pregnancy depending on term length and, if applicable, sex of the infant. Note that this is the same value as "gestational age" in other parts of the documentation.
#. Assign birthweight of simulant child 
#. Assign propensity values for ANC and ultrasound 
#. Begin simulation


See below for more detailed information on how to assign several of these items. 

.. note::

  In later waves of the model, we will add further items that will need to be assigned at initialization including pre-pregnancy BMI, blood pressure and/or hemoglobin levels. We will add further documentation covering how to assign these items at that time. 

.. todo::

   Add information on assigning ANC and intervention propensities, if correlation is included, etc. 


*During simulation:*

Run simulants through the pregnancy model as outlined in the :ref:`MNCNH Portfolio project <2024_concept_model_vivarium_mncnh_portfolio>` page. Record all data outlined on the above page. Then move to the intrapartum model. 

Pregnancy term lengths
~~~~~~~~~~~~~~~~~~~~~~~

At the beginning of pregnancy, it should be determined whether the pregnancy will be partial term or full term according to the probabilities in the table below.

.. list-table:: Pregnancy term lengths probabilities
  :header-rows: 1

  * - Term length
    - Probability
    - Note
  * - Partial term
    - (incidence_c995 + incidence_c374) / (ASFR + ASFR * SBR + incidence_c995 + incidence_c374)
    - 
  * - Full term
    - 1 - probability_partial_term
    - 

Sex of infant
~~~~~~~~~~~~~~~

For pregnancies that result in live birth or stillbirth outcomes, infant sex should be determined and recorded acording to the probability of male sex shown in the table below (probability of female birth is equal to 1 minus the probability of male birth). This should be performed at the start of pregnancy (transition from np to p states) or upon initialization into the p state. These sex ratios were calculated using the live births by sex 2020 GBD covariate (ID 1106), `shown here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/Live%20births%20by%20sex.ipynb>`_. Note that there is no variation by draw in this parameter. 

.. _sex_ratio_table_mncnh:

.. list-table:: Probability of male birth
    :header-rows: 1

    *   - Location
        - Location ID
        - Value
    *   - Pakistan 
        - 165
        - 0.514583
    *   - Nigeria
        - 214
        - 0.511785 
    *   - Ethiopia
        - 179
        - 0.514271  

Birthweight and Gestational Age
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A duration of pregnancy value will need to be assigned to all pregnancies regardless of the pregnancy outcome. This value will inform the duration that the simulant remains in the pregnancy state prior to transitioning to the postpartum state.

For partial term pregnancies (that result in abortion/miscarriage/ectopic pregnancy), assign a duration of pregnancy sampled from a uniform distribution beween 6 and 24 weeks (individual heterogeneity with no parameter uncertainty). For these simulants, the birthweight can be assigned as N/A since they will not be going through the intrapartum model.

For full term pregnancies (that result in live births or stillbirths), a LBWSG exposure value will be assigned that will include both the gestational age and birthweight of the simulant child. For wave 1 of this project, the LBWSG can be assigned using information outlined in the :ref:`LBWSG exposure page <2019_risk_exposure_lbwsg>`. Exposures should be specific to the sex of the infant for a given pregnancy (discussed in the above section). Based on the assigned category, a gestational age and birthweight can be recorded separately.

.. note::

  In later waves of the model, we will make this process more complex by including correlation with other maternal characteristics, similar to what is outlined in the :ref:`risk correlation document between maternal BMI, maternal hemoglobin, and infant LBWSG exposure <2019_risk_correlation_maternal_bmi_hgb_birthweight>`. 

  Additionally, the LBWSG exposure distribution may be modified by :ref:`antenatal supplementation intervention coverage <maternal_supplementation_intervention>` in later waves of the project. 

.. note::

  The current modeling strategy is dependent on our assumption that live births and stillbirths have the same duration. There is ongoing work at IHME to estimate gestational age at birth distributions among stillbirths. 

Assumptions and limitations
++++++++++++++++++++++++++++

- We assume that the gestational age distribution of stillbirths is equal to the gestational age distribution of live births. This is a limitation of our analysis given the lack of data on the distribution of gestational ages for which these outcomes occur. Given that the gestation for these outcomes is likely shorter than gestation for live births on average, we are likely overestimating the average duration of pregnancy for outcomes other than live births.
- We assume that all abortions, miscarriages and ectopic pregnancies occur uniformly between six and 24 weeks gestatation. Six weeks was chosen as a reasonable earliest possible time of pregnancy detection (prior to which miscarriages would be undiagnosed) and 24 weeks was chosen as the threshold between miscarriage and stillbirth. 
- We assume that abortions that occur after 24 weeks are not considered stillbirths for estimation of the stillbirth to livebirth ratio. We may overestimate the incidence rate of pregnancy due to this assumption.
- We are limited in the assumption that the stillbirth to livebirth ratio does not vary by maternal age and does not incorporate an uncertainty distribution.
- We do not distiguish between intended and unintended pregnancies.
- We do not consider the impact of birth interval timing or family size in our model of pregnancy.
- We do not consider the impact of singleton versus non-singleton pregnancies.
- We are limited in that we apply the age-specific fertility rate to the *beginning* of pregnancy when it is actually measured at the *end* of pregnancy (birth). Therefore, maternal age at birth in our simulation will be overestimated due to simulants becoming pregnant in one age group and giving birth in the next.

Verification and validation criteria
++++++++++++++++++++++++++++++++++++++

The following should validate:

- Average duration of pregnancy
- Rates of each birth outcomes

References
-----------

