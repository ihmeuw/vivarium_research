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

==============================================
Pregnancy: GBD 2021/2023, Closed Cohort, MNCNH
==============================================

.. todo::

  Create an updated page for this model document specific to GBD 2023 modeling strategy. 

  We will likely be revisiting our stillbirth modeling strategy for the MNCNH simulation as part of our incorporation of intrapartum sensors and c-sections into our simulation.

  For now we use this page for both GBD 2021 and GBD 2023 versions.

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

.. note::

  Abortions and miscarriages differ only by gestational age, and there is not a universal standard
  for the dividing line.
  In accordance with GBD we define miscarriage as <24 weeks gestation, and therefore
  we define stillbirth as >=24 weeks gestation, though we did not in the GBD 2021 version of this model.

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
    - For GBD 2021: Covariate.
      For GBD 2023: Flat-file estimate not in covariate database.
    - For GBD 2021: 2267.
    - For GBD 2021: get_covariate_estimates: decomp_step='iterative'
      For GBD 2023, flat file can be accessed at ``/snfs1/Project/simulation_science/mnch_grant/MNCNH\ portfolio/stillbirth_livebirth_ratio_24wks.csv``, copied from ``/mnt/team/mortality/pub/covariates/run_versions/2025-10-16-11-03/stillbirth_livebirth_ratio_24wks.csv`` where the GBD modelers made it available to us.
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
we choose whether the birth outcome is a live birth, antepartum stillbirth or intrapartum stillbirth.

Among pregnancies that result in births, the base probability of a live birth is ASFR / (ASFR + ASFR * SBR),
with the remainder being stillbirths.
This probability is modified by the :ref:`antenatal supplementation intervention <maternal_supplementation_intervention>`.

For pregnancies that result in stillbirths, we assign the timing of the stillbirth as either antepartum (fetal deaths occurring before the onset of labor) or intrapartum (fetal death occurring during labor and before birth).
Both antepartum and intrapartum stillbirths will proceed to the intrapartum component. The timing of stillbirth will affect the eligibility of the simulant dyad for certain intrapartum interventions.
Specifically, antepartum stillbirths will only be eligible for intrapartum interventions that act on maternal health (such as misoprostol and azithromycin) and will not be eligible for intrapartum interventions intended for neonatal health (such as antenatal corticosteroids) as the fetus will have already passed prior to the onset of labor, but delivery of the fetal remains will still be necessary.
Intrapartum stillbirths will remain eligible for all intrapartum interventions. 

The probability of intrapartum stillbirth will be affected by the intrapartum sensors -> C-section -> obstructed labor -> intrapartum stillbirth pathway once implemented,
but baseline values for rates of antepartum stillbirth rates are outlined in the table below. Antepartum stillbirths may still receive c-sections if the stillbirth is undetected and spontaneous labor occurs - we will need to consider this potential limitation of our c-section modeling strategy once developed.
Location-specific probability of intrapartum stillbirth is extracted from a 2018 Lancet Global Health report. [Ahmed_et_al_2018]_

.. todo:: 

  When we implement the intrapartum sensors -> C-section -> obstructed labor -> intrapartum stillbirth pathway, we'll need to delay determination of intrapartum stillbirth. 

.. note::

  The antepartum stillbirth rates extracted from [Ahmed_et_al_2018]_ below are specific to Sub-Saharan Africa and South Asia, and therefore apply to our modeled locations.

.. note::

  We assume that live births and stillbirths have the same gestational age. There is ongoing work at IHME to estimate gestational age at birth distributions among stillbirths. 
  Additionally, we assume that intrapartum and antepartum stillbirths have the same gestational age distribution. [Madhi_et_al_2019]_ indicates this is likely a reasonable assumption (see Table 2).

.. note::

  We will have all antepartum stillbirths still proceed to the intrapartum component, even though it is possible that a stillbirth could be detected and addressed through D&E without labor. 

.. list-table:: Data values for antepartum stillbirth rates
  :header-rows: 1

  * - Location
    - Data value (proportion)
    - Uncertainty distribution
  * - Ethiopia & Nigeria
    - 0.37 (95% CI 0.27-0.47)
    - Truncated normal distribution truncated at 0 only.
  * - Pakistan
    - 0.48 (95% CI 0.39-0.57)
    - Truncated normal distribution truncated at 0 only.
    
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

For pregnancies that result in live births, a LBWSG exposure value will be assigned that will include both the gestational age and birthweight of the simulant child. The LBWSG can be assigned using information outlined in the :ref:`LBWSG exposure page <2021_risk_exposure_lbwsg>`. Exposures should be specific to the sex of the infant for a given pregnancy (discussed in the above section). Based on the assigned category, a gestational age and birthweight can be recorded separately.

For pregnancies that result in stillbirths, birth weight and gestational age at the end of pregnancy values should be assigned according to the :ref:`LBWSG exposure page <2021_risk_exposure_lbwsg>` in the same way as for live births, but with a LBWSG exposure distribution that has been truncated at 24 weeks (the gestational age threshold at which stillbirths are distinguished from miscarriages). To generate the truncated exposure distribution, divide the exposure value for all LBWSG exposure categories with gestational age at birth > 24 by the sum of all categories with gestational ages at birth < 24 weeks and then set the exposure value for the categories with gestational ages at birth < 24 weeks to zero. Then use this truncated exposure distribution to assign GA and BW exposures in the same way as is done with live births using the raw LBWSG exposure distribution.

.. note::

  The baseline calibration of our LBWSG exposures with respect to interventions such as iron and folic acid may result in shifting gestational age at birth values to slightly less than 24 weeks for stillbirths. This is a limitation of our current modeling strategy.

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

  Additionally, the LBWSG exposures are modified by interventions in pregnancy
  as detailed on the :ref:`MNCNH portfolio concept model document <2024_concept_model_vivarium_mncnh_portfolio>`.

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

.. [Ahmed_et_al_2018]

  Ahmed, Imran et al. 2018. Population-based rates, timing, and causes of maternal deaths, stillbirths, and neonatal deaths in south Asia and sub-Saharan Africa: a multi-country prospective cohort study.
  The Lancet Global Health, Volume 6, Issue 12, e1297 - e1308

.. [Madhi_et_al_2019]

  Madhi, Shabir A., et al. 2019. An Observational Pilot Study Evaluating the Utility of Minimally Invasive Tissue Sampling to Determine the Cause of Stillbirths in South African Women.
  Clin Infect Dis. 2019 Oct 9;69(Suppl 4):S342–S350. doi: 10.1093/cid/ciz573