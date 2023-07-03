.. _2019_cause_maternal_hemorrhage_incidence:

==============================
Maternal hemorrhage incidence
==============================

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - 
    - 
    - 

Disease Overview
----------------

Maternal hemorrhage is defined as bleeding during pregnancy (antenatal hemorrhage), during birth (peripartum hemorrhage), or postpartum (postpartum hemorrhage). The threshold of maternal hemorrhage is often defined by at least 500 mL of blood lost or 1 liter of blood lost in the case of a cesarean section. Severe hemorrhage is often categorized as 1 liter of blood lost in non-cesarean section cases. Postpartum hemorrhage comprises the majority of maternal hemorrhage cases.

Maternal hemorrhage is the leading cause of maternal mortality worldwide. Major risk factors for maternal hemorrhage include maternal anemia and delivery in a non-facility setting. Interventions for the prevention of postpartum hemorrhage include the active management of the third stage of labor: a series of preventative steps that include the use of prophylactic uterotonic drugs (such as oxytocin), uterine massage, etc.

Measurement of the burden of maternal hemorrhage can be difficult due to the difficulty in estimating the amount of blood lost.

Maternal hemorrhage can result in adverse outcomes including anemia, blood transfusion, hysterectomy, and death.

GBD 2019 Modeling Strategy
--------------------------

Covariates for the estimation of the maternal hemorrhage fatal model include:

- In-facility delivery (proportion)
- Skilled birth attendance (proportion)
- Age- and sex-specific SEV for unsafe sanitation
- Neonatal mortality ratio (log-transformed)
- Maternal education
- Healthcare access and quality index

Anemia due to maternal hemorrhage is estimated as part of the :ref:`GBD 2019 anemia impairment and causal attribution process <2019_anemia_impairment>`.

[GBD-2019-Capstone-Appendix-Maternal-Hemorrhage]_

.. note::

  There were no major relevant modeling updates from GBD 2019 to 2021

Cause Hierarchy
+++++++++++++++

- All causes (c_294)

  - Communicable, maternal, neonatal, and nutritional diseases (c_295)

    - Maternal disorders and neonatal disorders (c_962)

      - Maternal disorders (c_366)

        - **Maternal hemorrhage (c_367)**

          - Mild anemia due to maternal hemorrhage (s_182)

          - Moderate anemia due to maternal hemorrhage (s_183)

          - Severe anemia due to maternal hemorrhage (s_184)

          - Maternal hemorrhage with less than 1 liter blood loss (s_180)

          - Maternal hemorrhage with greater than 1 liter blood loss (s_181)

Restrictions
++++++++++++

The following table describes any restrictions in GBD 2019 on the effects of
this cause (such as being only fatal or only nonfatal), as well as restrictions
on the ages and sexes to which the cause applies.

.. list-table:: GBD 2019 Cause Restrictions
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
   * - YLL only
     - False
     - False
   * - YLD only
     - False
     -
   * - YLL age group start
     - 10 to 14 (ID=7)
     -
   * - YLL age group end
     - 50 to 54 (ID=15)
     -
   * - YLD age group start
     - 10 to 14 (ID=7)
     -
   * - YLD age group end
     - 50 to 54 (ID=15)
     -

Vivarium Modeling Strategy
--------------------------

Similar to the :ref:`maternal disorders cause model <2019_cause_maternal_disorders>`, we will convert the maternal hemorrhage incidence rate as estimated by GBD in terms of an annual rate among women of reproductive age to events *per birth* (including stillbirths) for use in our :ref:`simulation of IV iron <2019_concept_model_vivarium_iv_iron>`. Births among women of reproductive age in our simulation will be informed by the the :ref:`pregnancy model document <other_models_pregnancy>`.

.. note::

  We have chosen to design this model of maternal hemorrhage incidence to be decoupled from YLLs/YLDs due to maternal hemorrhage (which will instead be captured in the :ref:`maternal disorders cause model <2019_cause_maternal_disorders>`) because the :ref:`risk effects for hemoglobin <2019_risk_effect_iron_deficiency>` are different for maternal mortality/morbidity (as informed by GBD) than they are for maternal hemorrhage incidence.

  This strategy allows us to remain consistent with the GBD model of the relationship between hemoglobin/iron deficiency and maternal disorder DALYs (which is not specific to subcauses of maternal disorders) while also incorporating additional detail regarding the specific relationship between hemoglobin, maternal hemorrhage incidence, and its relationship on postpartum hemoglobin levels.

Scope
+++++

This cause model document was developed for the :ref:`IV iron simulation <2019_concept_model_vivarium_iv_iron>`. It is intended to be a DALY-free cause model in order to model in impact on postpartum hemoglobin levels. This cause model will also be affected by maternal anemia level during pregnancy.

We will not model maternal hemorrhage incidence as a dynamic transition model, but rather as a discrete event that occurs at birth. The probability of maternal hemorrhage incidence will be informed by a ratio per birth derived from GBD data.

Assumptions and Limitations
+++++++++++++++++++++++++++

- We will assume that all causes of maternal hemorrhage occur at the time of birth (although a small portion of them will occur during pregnancy or well into the postpartum period).
- Our model of maternal hemorrhage incidence will be measured as cases that do not die due to maternal hemorrhage.
- We will assume that incidence cases of maternal hemorrhage (as defined in the above bullet point) are not correlated with incidence cases of maternal disorders. 

Cause Model Diagram
+++++++++++++++++++

Not applicable.

Data Tables
++++++++++++++++++++++++++++++++

Ratios of maternal hemorrhage mortality and incidence are defined in the table below. These values should represent the probability that a simulant experiences a death or incident case of maternal hemorrhage at birth in our simulation. 

There should be no correlation between maternal hemorrhage events and :ref:`maternal disorders <2019_cause_maternal_disorders>` events. In other words, simulants who experience an incident case of maternal hemorrhage should be equally likely to experience an incident case of maternal disorders as those who do not.

.. todo::
  
  Consider the implications of this assumption.

.. list-table:: Ratios per birth
   :widths: 5 5 20
   :header-rows: 1

   * - Event
     - Value
     - Note
   * - Deaths due to maternal hemorrhage
     - 0
     - Captured in the :ref:`maternal disorders cause model <2019_cause_maternal_disorders>`
   * - Incident maternal hemorrhage cases
     - (incidence_rate_c367 - csmr_c367) / preg_rate
     - 

The following table defines the parameters used in the calculation of maternal disorder ratios per birth.

.. list-table:: Data values
   :header-rows: 1

   * - Parameter
     - Definition
     - Value or source
     - Note
   * - csmr_c367
     - Maternal hemorrhage cause-specific mortality rate
     - deaths_c367 / population
     - 
   * - deaths_c367
     - count of deaths due to maternal hemorrhage
     - codcorrect, decomp_step='step5' for GBD 2019, 'step3' and eventually 'iterative' for GBD 2021
     - 
   * - population
     - population count
     - get_population, decomp_step='step5' for GBD 2019, 'iterative' for GBD 2021
     - Specific to a/s/l/y demographic group
   * - incidence_rate_c367
     - incidence rate of maternal hemorrhage
     - como, decomp_step='step5' for GBD 2019, 'iterative' for GBD 2021
     - Use the :ref:`total population incidence rate <total population incidence rate>` directly from GBD and do not rescale this parameter to susceptible-population incidence rate using condition prevalence. 
   * - preg_rate
     - Pregnancy incidence rate
     - :math:`ASFR + ASFR * SBR + incidence_\text{c995} + incidence_\text{c374}`
     -
   * - ASFR
     - Age-specific fertility rate
     - get_covariate_estimates: coviarate_id=13, decomp_step='iterative'
     - Assume lognormal distribution of uncertainty.
   * - SBR
     - Still to live birth ratio
     - get_covariate_estimates: covariate_id=2267, decomp_step='iterative' for GBD 2021
     - Parameter is not age specific and has no draw-level uncertainty. Use mean_value as location-specific point parameter.
   * - incidence_c995
     - Incidence rate of abortion and miscarriage cause
     - como; decomp_step='iterative'
     - Use the :ref:`total population incidence rate <total population incidence rate>` directly from GBD and do not rescale this parameter to susceptible-population incidence rate using condition prevalence. 
   * - incidence_c374
     - Incidence rate of ectopic pregnancy
     - como; decomp_step='iterative'
     - Use the :ref:`total population incidence rate <total population incidence rate>` directly from GBD and do not rescale this parameter to susceptible-population incidence rate using condition prevalence. 

Disability adjusted life years
"""""""""""""""""""""""""""""""""""

No years lived with disability (YLDs) or years of life lost (YLLs) should be assigned to any simulants in relation to this model of maternal hemorrhage incidence.

Validation Criteria
++++++++++++++++++++

- The maternal hemorrhage incidence rate per person-year among women of reproductive age in the simulation should validate to estimates from GBD
- Maternal hemorrhage incident cases should occur among pregnant women only

References
----------

.. [GBD-2019-Capstone-Appendix-Maternal-Hemorrhage]
  Appendix to: `GBD 2019 Diseases and Injuries Collaborators. Global burden of
  369 diseases and injuries in 204 countries and territories, 1990–2019: a 
  systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 
  17 Oct 2020;396:1204-1222` 

