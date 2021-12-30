.. _other_models_pregnancy:

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

=========================
Pregnancy
=========================

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

.. warning::

   The current version of this document details a strategy to model pregnancy in a simulation with a population of women of reproductive age only and does not yet detail a strategy to pair maternal child dyads.

   Such a strategy will need to distinguish bewteen stillbirths and live births and assign the child's LBWSG exposure category in a way that is consistent with the mother's duration of pregnancy.

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

Where :math:`ASFR` is the age-specific fertility rate, :math:`SBR` is the stillbirth to live birth ratio, and :math:`46/52` is the proportion of the year spent pregnant (40 weeks) and postpartum (6 weeks) [GBD-2019-Risk-Factors-Appendix-pregnancy]_.

.. todo::

   Determine the threshold of gestational age at which a loss of pregnancy is classified as a stillbirth rather than miscarriage for the GBD covariate. Standard thresholds are 20 or 24 weeks.

Vivarium Modeling Strategy
----------------------------

We will model pregnancy as a characteristic of women of reproductive age in our simulations. We will inform the *incidence* of pregnancy using the age-specific fertility and stillbirth to live birth ratio covariates from GBD. We will inform the *duration* of pregnancy using the GBD 2019 exposure distribution of gestational age.

.. image:: diagram.svg

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
  * - pp
    - Postpartum
    - 

.. note::

   We will use the simplifying assumption of 40 weeks gestation and six weeks postpartum for pregnancy state *intialization* in our cause model only. We could improve this assumption by using location-specific mean gestational age rather than 40 weeks as the assumed duration of pregnancy.

.. list-table:: State prevalence table
  :widths: 15 15 15
  :header-rows: 1

  * - Exposure category
    - Value
    - Note
  * - np
    - 1 - prevalence_p - prevalence_pp
    - 
  * - p
    - :math:`(ASFR + ASFR * SBR + incidence_\text{c995} + incidence_\text{c374}) * 40 / 52`
    - Consider updating to reflect average gestational age for location of interest rather than 40 weeks
  * - pp
    - :math:`(ASFR + ASFR * SBR + incidence_\text{c995} + incidence_\text{c374}) * 6 / 52`
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
    - :math:`\frac{ASFR + ASFR * SBR + incidence_\text{c995} + incidence_\text{c374}}{prevalence_\text{np}}`
    - 
  * - p
    - pp
    - duration_p
    - Informed by gestational age (see below section)
    - Duration-based transition
  * - pp
    - np
    - duration_pp
    - 6 weeks (42 days) duration
    - Duration-based transition

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
    - get_covariate_estimates: decomp_step='step4' or 'iterative' for GBD 2019, 'step3' or 'iterative' for GBD 2020
    - Assume normal distribution of uncertainty. Regional-level estimates available.
  * - SBR
    - Covariate
    - 1106
    - get_covariate_estimates: decomp_step='step4' or 'iterative' for GBD 2019, 'step3' or 'iterative' for GBD 2020
    - No uncertainty in this estimate: use mean_value as point value for this parameter. Regional-level estimates not available.
  * - incidence_c995
    - Incidence rate of abortion and miscarriage cause
    - c995
    - como; decomp_step='step5'
    - Abortion defined as elective or medically-indicated termination of pregnancy at any gestational age and miscarriage defined as spontaneous loss of pregnancy before 24 weeks gestation
  * - incidence_c374
    - Incidence rate of ectopic pregnancy
    - c374
    - como; decomp_step='step5'
    - 

.. note::

   A note on locations for the :ref:`IV Iron simulation <2019_concept_model_vivarium_iv_iron>`:

      The ASFR covariate is available for regional location IDs. The SBR covariate is not available for regional estimates. Follow the location aggregation instructions on the concept model document to calculate regional-level values for these parameters.


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

.. note::

   The ASFR covariate has estimates for all GBD age and sex groups that are equal to zero for the "restricted" sex and ages.

   We may restrict to ages 15 to 49 pending input from the BMGF.

Gestational age
~~~~~~~~~~~~~~~~~

Upon transition into the pregnancy state, each simulant should be assigned a gestational age according to the process described on the :ref:`low birthweight short gestation risk exposure document <2019_risk_exposure_lbwsg>`. This value will inform the duration that the simulant remains in the pregnancy state prior to transitioning to the postpartum state. Note that the gestational age distribution is measured in weeks and will need to be converted to the equivalent simulation time measure.

For simulants who are initialized into the pregnancy state at the start of the simulation:

   Assign the simulant a gestational age value and then sample a random value from a uniform distribution between zero and the assigned gestational age value. The randomly sampled value will represent the current gestational duration of that pregnancy. The simulant should remain in the pregnancy state prior to transitioning to the postpartum state for the duration equal to the assigned gestational age value *minus* the randomly sampled value.

.. note::

   When we model maternal child dyads, the LBWSG exposure value assigned to the mother will be the exposure value assigned to the child in the dyad.

   Notably, maternal characteristics such as age and BMI are associated with infant outcomes including LBWSG. Careful attention should be paid to ensure consistent relationships bewteen maternal factors and the joint distribution between BW and GA. 

Assumptions and limitations
++++++++++++++++++++++++++++

- We assume that the gestational age distribution of stillbirths, abortions, miscarriages, and ectopic pregnancies is equal to the gestational age distribution of live births. This is a limitation of our analysis given the lack of data on the distribution of gestational ages for which these outcomes occur. Given that the gestation for these outcomes is likely shorter than gestation for live births on average, we are likely overestimating the average duration of pregnancy for outcomes other than live births.
- We assume that abortions that occur after 24 weeks are not considered stillbirths for estimation of the stillbirth to livebirth ratio. We may overestimate the incidence rate of pregnancy due to this assumption.
- We are limited in the assumption that the stillbirth to livebirth ratio does not vary by maternal age and does not incorporate an uncertainty distribution.
- We do not model any morbidity (YLDs) associated directly with pregnancy.
- We do not distiguish between intended and unintended pregnancies.
- We do not consider the impact of birth interval timing or family size in our model of pregnancy.
- We assume that a new pregnancy cannot occur during the postpartum period but can occur immediately afterward. We do not model any difference in the fertility rate by recent pregnancy status.
- We do not consider the impact of singleton versus non-singleton pregnancies.
- We are limited in that we apply the age-specific fertility rate to the *beginning* of pregnancy when it is actually measured at the *end* of pregnancy (birth). Therefore, maternal age at birth in our simulation will be overestimated due to simulants becoming pregnant in one age group and giving birth in the next.

Verification and validation criteria
++++++++++++++++++++++++++++++++++++++

Person-time spent in each pregnancy state should approximate to the values in the state prevalence table.

The number of transitions into the pregnancy state should validate to the values in the state transition data table at the age-specific level. Across all ages, it should validate to the total fertility rate covariate (ID=1106). Additionally, when scaled to the total population and adjusted for the SBR, the number should approximate the live birth covariate (ID=60).

References
-----------

.. [GBD-2019-Risk-Factors-Appendix-pregnancy]

 `Supplementary appendix 1 to the GBD 2019 Risk Factors Capstone <2019_risk_factors_methods_appendix_>`_:

   **(GBD 2019 Risk Factors Capstone)** GBD 2019 Risk Factors Collaborators.
   :title:`Global burden of 87 risk factors in 204 countries and territories,
   1990–2019: a systematic analysis for the Global Burden of Disease Study
   2019`. Lancet 2020; **396:** 1223–49. DOI:
   https://doi.org/10.1016/S0140-6736(20)30752-2

.. _2019_risk_factors_methods_appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30752-2/attachment/54711c7c-216e-485e-9943-8c6e25648e1e/mmc1.pdf