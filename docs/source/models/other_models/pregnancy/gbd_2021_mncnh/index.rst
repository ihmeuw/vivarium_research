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

.. todo::

  Create an updated page for this model document specific to GBD 2023 modeling strategy. 

  Until this is complete, we have implemented a the following (stand-in) changes to the modeling strategy documented on this page for the GBD 2023 update of the MNCNH simulation: 

    * use covariate ID #2541 (Stillbirth to live birth ratio, with stillbirths defined as death of a fetus at 20+ weeks gestation) instead of #2267 (Stillbirth to live birth ratio, with stillbirths defined as death of a fetus at 28+ weeks). 

    * use the uncertainty interval for covariate ID #2541 to generate draw-level estimates for this parameter rather than just using the mean value as we did for GBD 2021 given that there was no parameter uncertainty provided in GBD 2021

  Note that GBD 2023 has new stillbirth rate and count covariates available for both the 20 and 28 week definitions in addition to ratios relative to live births and that we will likely be revisiting our stillbirth modeling strategy for the MNCNH simulation as part of our incorporation of intrapartum sensors and c-sections into our simulation.

.. contents::
   :local:

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

This version is also designed for use with a closed cohort of pregnancies (does not include incidence), but differs from the nutrition optimization project in that we are splitting the pregnancy and intrapartum stages of the model in a more significant way to allow for added details. Therefore, this model encompasses less.
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
  * - Stillbirth to live birth ratio (GBD 2021)
    - 2267
    - Not specific to maternal age. Upper and lower bound estimates are equal to mean estimate (no uncertainty interval)
  * - Stillbirth to live birth ratio (using stillbirth threshold of 20 weeks, GBD 2023)
    - 2541
    - Not specific to maternal age. Uncertainty intervals provided.
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

Vivarium Modeling Strategy
----------------------------

In this closed cohort, all simulants start the simulation at the beginning of a pregnancy.
The steps to follow are summarized by the diagram below:

.. If you are editing the following diagram,
  you probably want to edit the one on the pregnancy *module* page as well (2024_vivarium_mncnh_portfolio_pregnancy_module).

.. graphviz::

  digraph pregnancy {
    bgcolor="transparent";
    node [shape=box];

    start;
    broad_pregnancy_outcome [label=< <B>Assign broad pregnancy outcome<br/>(live/stillbirth vs abortion/miscarriage/ectopic pregnancy)</B> >];
    choice [label="Pregnancy results in either a live birth or a stillbirth?"];
    birth_outcome [label=< <B>Assign birth outcome<br/>(live birth vs stillbirth)</B> >];
    gestational_age [label=< <B>Assign gestational age at end of pregnancy</B> >];
    sex [label=< <B>Assign sex of infant</B> >];
    lbwsg [label=< <B>Assign birthweight and gestational age at end of pregnancy</B> >];
    preterm [label=< <B>Assign preterm status</B> >]
    pregnancy_outcome [label=< <B>Assign pregnancy outcome<br/>(live birth vs stillbirth vs abortion/miscarriage/ectopic)</B> >]
    end;

    start -> broad_pregnancy_outcome;
    broad_pregnancy_outcome -> choice;
    choice -> birth_outcome [label="Yes"];
    choice -> gestational_age [label="No"];
    gestational_age -> preterm;
    birth_outcome -> sex;
    sex -> lbwsg;
    lbwsg -> preterm;
    preterm -> pregnancy_outcome;
    pregnancy_outcome -> end;
  }

.. note::

  Maternal disorders are entirely handled in the intrapartum model for wave 1 of this project.
  
  At current there are no risk factors (other than age) included either. 

  We will add risk factors to this model (BMI, blood pressure, hemoglobin, blood glucose level) and may also add some maternal disorders, such as preeclampsia, anemia, and gestational diabetes. Though we have not determined where we will have simulants accumulate YLDs/deaths (might all be in the intrapartum model). 

.. _pregnancy_broad_outcome_section:

First step: broad pregnancy outcome
+++++++++++++++++++++++++++++++++++

.. note::

  In the current MNCNH model, the broad pregnancy outcome determination described in this section takes
  place as part of the :ref:`initial attributes module <2024_vivarium_mncnh_portfolio_initial_attributes_module>`.
  The further steps described in the next section take place as part of the :ref:`pregnancy module <2024_vivarium_mncnh_portfolio_pregnancy_module>`.
  Both modules are nested within :ref:`the pregnancy component <mncnh_portfolio_pregnancy_component>`.

The first decision we need to make is which of the following two
categories each simulant's pregnancy will fall into:

1. Pregnancies that end in abortion,
   miscarriage with complications requiring medical care,
   or ectopic pregnancy.
2. Pregnancies that result in live births or stillbirths.

.. todo::

  We should formalize how we define the difference between a miscarriage and a stillbirth.
  Right now we are using estimates for somewhat discordant definitions, because miscarriage in GBD
  is less than 24 weeks but the stillbirth covariate we are using is greater than 20 weeks.
  See `this ticket <https://jira.ihme.washington.edu/browse/SSCI-2441>`__.

GBD cause ID 995 represents abortions and miscarriages requiring medical care (lumped together).
GBD cause ID 374 represents ectopic pregnancies.
Therefore, the rate of incident cases of these two causes represents the rate of such pregnancies.

Pregnancies that result in live births or stillbirths are estimated using the ASFR and SBR,
with the rate of such pregnancies being ASFR + ASFR * SBR.

Therefore, we assign each pregnancy to be an abortion/miscarriage/ectopic pregnancy
with probability (incidence_c995 + incidence_c374) / (ASFR + ASFR * SBR + incidence_c995 + incidence_c374),
with the remaining pregnancies (those not assigned to the abortion/miscarriage/ectopic category)
resulting in live births or stillbirths.
Note that this probability will be age-group-specific, because all the values going into it except SBR
are age-group-specific.

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
    - For GBD 2021: 2267, For GBD 2023: 2541
    - get_covariate_estimates: decomp_step='iterative' for GBD 2021, no need to specify a decomp_step for GBD 2023
    - Parameter is not age-specific.
      Use a truncated normal distribution of uncertainty replicating the 95% UI from the database, truncated at 0 only.
      Note that in GBD 2021 this parameter had no uncertainty (the mean, lower bound, and upper bound were all the same).
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

Further steps
+++++++++++++

Assign birth outcome (live births and stillbirths only)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For pregnancies that were determined to result in either a live birth or a stillbirth,
we choose which of these occurs.

Among such pregnancies, the base probability of a live birth is ASFR / (ASFR + ASFR * SBR),
with the remainder being stillbirths.
This probability is modified by the :ref:`antenatal supplementation intervention <maternal_supplementation_intervention>`.

.. note::

  When we implement the intrapartum sensors -> C-section -> obstructed labor -> intrapartum stillbirth pathway, we'll need to assign only
  antepartum stillbirths here.

.. note::

  We assume that live births and stillbirths have the same gestational age. There is ongoing work at IHME to estimate gestational age at birth distributions among stillbirths. 

.. _other_models_pregnancy_closed_cohort_mncnh_sex_of_infant:

Assign sex of infant (live births and stillbirths only)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For pregnancies that result in live birth or stillbirth outcomes, infant sex should be determined and recorded acording to the probability of male sex,
using the live births by sex GBD 2021 covariate (ID 1106).
Note that there is no uncertainty estimated for the infant sex proportions at birth.
(There is uncertainty estimated for the count of births for each sex individually, but the upper and lower bounds give identical proportions,
and we assume uncertainty is perfectly correlated).

Assign birthweight and gestational age at end of pregnancy (live births and stillbirths)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For pregnancies that result in live births or stillbirths, a LBWSG exposure value will be assigned that will include both the gestational age and birthweight of the simulant child. The LBWSG can be assigned using information outlined in the :ref:`LBWSG exposure page <2021_risk_exposure_lbwsg>`. Exposures should be specific to the sex of the infant for a given pregnancy (discussed in the above section). Based on the assigned category, a gestational age and birthweight can be recorded separately.

.. note::

  Our model of :ref:`delivery facility choice
  <2024_vivarium_mncnh_portfolio_facility_choice_module>` specifies that
  the LBWSG category is correlated with antenatal care (ANC) attendance
  and in-facility delivery (IFD) status. These correlations are defined
  using a specified ordering of the LBWSG categories. The correlation
  strategy, including the category ordering, is described in more detail
  in the :ref:`correlated propensities section
  <facility_choice_correlated_propensities_section>` of the facility
  choice model documentation.

  In later waves of the model, we will make this process more complex by including correlation with other maternal characteristics, similar to what is outlined in the :ref:`risk correlation document between maternal BMI, maternal hemoglobin, and infant LBWSG exposure <2019_risk_correlation_maternal_bmi_hgb_birthweight>`. 

  Additionally, the LBWSG exposure distribution may be modified by :ref:`antenatal supplementation intervention coverage <maternal_supplementation_intervention>` in later waves of the project. 

Assign gestational age at end of pregnancy (abortion/miscarriage/ectopic pregnancies)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

All pregnancies *not* resulting in live births or stillbirths,
which are those resulting in an abortion, miscarriage, or ectopic pregnancy,
should be assigned a gestational age at end of pregnancy sampled from a uniform distribution beween 6 and 24 weeks (individual heterogeneity with no parameter uncertainty).

.. todo::

   As we figure out YLDs and how they will relate to pregnancy duration, assess if the uniform distribution is a significant limitation and how it might be improved if needed.

Assign preterm status
~~~~~~~~~~~~~~~~~~~~~

We assign the binary preterm status "preterm" if gestational age at end of pregnancy is
less than 37 weeks, and "term" if
the gestational age is 37 weeks or more.

Assign pregnancy outcome
~~~~~~~~~~~~~~~~~~~~~~~~

Finally, we assign the "pregnancy outcome" variable, which is a simple combination
of "broad pregnancy outcome" and "birth outcome."
For simulants with a broad pregnancy outcome of "abortion/miscarriage/ectopic", that is also their (non-broad) pregnancy outcome.
For all other simulants, their pregnancy outcome is their birth outcome.

Assumptions and limitations
++++++++++++++++++++++++++++

- We assume that the gestational age distribution of stillbirths is equal to the gestational age distribution of live births. This is a limitation of our analysis given the lack of data on the distribution of gestational ages for which these outcomes occur. Given that the gestation for these outcomes is likely shorter than gestation for live births on average, we are likely overestimating the average duration of pregnancy for outcomes other than live births.
- We assume that all abortions, miscarriages requiring medical care, and ectopic pregnancies occur uniformly between six and 24 weeks gestatation. Six weeks was chosen as a reasonable earliest possible time of pregnancy detection (prior to which miscarriages would be undiagnosed) and 24 weeks was chosen as the threshold between miscarriage and stillbirth. 
- We assume that abortions that occur after 24 weeks are not considered stillbirths for estimation of the stillbirth to livebirth ratio. We may overestimate the incidence rate of pregnancy due to this assumption.
- We are limited in the assumption that the stillbirth to livebirth ratio does not vary by maternal age and does not incorporate an uncertainty distribution.
- We do not distiguish between intended and unintended pregnancies.
- We do not consider the impact of birth interval timing or family size in our model of pregnancy.
- We are not planning to include twins or multiple pregnancies, which has limitations as twins are more likely to preterm and have birth complications. 

Verification and validation criteria
++++++++++++++++++++++++++++++++++++++

The following should validate:

- Match distribution of LBWSG 
- Rates of each birth outcomes
- Confirm that all pregnant simulants fall within WHO definition of WRA (15-49yrs)
- Confirm pregnancy duration of abortion/miscarriage/ectopic pregnancies
- Population structure should reflect age-specific pregnancy incidence rate

References
-----------

