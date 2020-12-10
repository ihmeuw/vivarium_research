.. _2017_risk_exposure_smoking_forecasted:

======================================
Smoking Risk Exposure -- Forecasted
======================================

Risk Exposure Overview
----------------------

.. todo::

  Risk exposure overview

Risk Exposures Description in GBD
---------------------------------

The smoking risk factor in GBD is multifactorial and includes estimates on:

- The prevalence of current/former/never smokers 
- Cumulative pack-year smoking history *among current smokers* 
- Years since quitting *among former smokers*

This document will cover all three of these risk exposures. 

The TMREL for the smoking risk factor is never-smokers.

Smoking Status
++++++++++++++++++

Smoking status is a categorical risk exposure model with three categories: never smokers, current smokers, and former smokers.

Pack-years for Current Smokers
++++++++++++++++++++++++++++++

This is a *continuous* risk exposure model that follows an *ensemble* distribution that has been converted to a **categorical** risk exposure model.

One pack‐year represents the equivalent of smoking one pack of cigarettes (assuming a 20‐cigarette pack) per day for one year. Since the pack‐years indicator collapses duration and intensity into a single dimension, one pack‐year of exposure can reflect smoking 40 cigarettes per day for six months or smoking 10 cigarettes per day for two years. Pack-years is a transformed measure of cumulative cigarettes smoked.

This risk exposure is binned into the following categories of pack-years: 0 to 2, 2 to 4, 5 to 9, 10 to 19, 20 to 29, 30 to 39, 40 to 49, 50 to 99

This risk exposure was forecast from 2020-2040 based on the GBD 2019 risk exposure estimates as a measure of number of individuals in each exposure category per person year in the *general population* (note that the denominator here is not person time among current smokers).

Years Since Quitting for Former Smokers
+++++++++++++++++++++++++++++++++++++++

This is a *continuous* risk exposure model that follows an *ensemble* distribution that has been converted to a **categorical** risk exposure model.

This risk exposure is binned into the following categories of pack-years: 0 to 2, 2 to 4, 5 to 9, 10 to 19, 20 to 29, 30 to 39, 40 to 49, 50 to 99

This risk exposure was forecast from 2020-2040 based on the GBD 2019 risk exposure estimates as a measure of number of individuals in each exposure category per person year in the *general population* (note that the denominator here is not person time among former smokers).

Vivarium Modeling Strategy
--------------------------

The overall scope of the Vivarium modeling strategy for the smoking risk exposure for the :ref:`Lung Cancer Screening Model <lung_cancer_cancer_concept_model>` is that simulants will be assigned exposure values based on the exposure distribution for a given age-, sex-, location-, and year-specific demographic group and their exposure will be updated each time they move through these groups. Each simulant will be given a propensity score that determines the relative magnitude of their individual exposure value to the exposure distribution. However, this strategy does allow for the possibility of illogical smoking exposure transitions for individual simulants (i.e.: moving from a current smoker to a never smoker, decreases in pack-year exposure values over time).

.. todo::

  Quantify these possibilities based on exposure forecasts.

This stragey is in contrast to modeling a rate of smoking initiation/cessation and number of cigarettes smoked, which would allow for detailed logical sample histories of each individual simulant.

Smoking Status
++++++++++++++

Smoking status should be assigned in the following fashion:

.. code-block:: python

  if propensity_i < never_smoker_prevalence:
    smoking_status_i = 'never'
  elif propensity_i < never_smoker_prevalence + current_smoker_prevalence:
    smoking_status_i = 'current'
  else:
    smoking_status_i = 'former'

.. list-table:: Smoking Status Data Table
  :header-rows: 1

  * - Parameter
    - Definition
    - Source
    - Note
  * - current_smoker_prevalence
    - Prevalence of current smokers
    - /ihme/csu/swiss_re/forecast/prev_forecast_draws.csv
    - Forecasted from 2020-2040
  * - former_smoker_prevalence
    - Prevalence of former smokers
    - /ihme/csu/swiss_re/forecast/prev_forecast_draws.csv
    - Forecasted from 2020-2040
  * - never_smoker_prevalence
    - Prevalence of never smokers
    - 1 - current_smoker_prevalence - former_smoker_prevalence
    - Derived from estimates forecasted from 2020-2040

The prevalence estimates of current/former/never smokers are age-, sex-, location-, and year-specific.

Notably, this modeling strategy has the potential for current smokers to become never smokers (an illogical transition) if the prevalence of never smokers *increases* from one age group to the next. However, this possibility should be relatively inconsequential given that this should only happen if the current and former smokers die at a greater rate than they are replaced.

.. todo::

  Evaluate this possibility in the forecast data

Pack-years Among Current Smokers
+++++++++++++++++++++++++++++++++

Pack-years among current smokers should be assigned as a *static* categorical exposure value that is assigned in the following way:

- Each simulant gets an individual propensity value, which is a random value between 0 and 1 (uniformly distributed).

- Pack-year exposure value is updated when the exposure distribution for that simulant's demographic group changes (each year of the simulation and/or when a simulant ages into a new age group).

.. note::

  This method has the possibility that some simulants will have *decreases* in their pack-year exposure value, which is a measure of cumulative cigarettes smoked and therefore should logically increase monotonically.

Pack-year exposure data are stored here: `/ihme/csu/swiss_re/forecast/py_forecast_draws.csv` and are age-, sex-, location-, and year-specific. The units of this file are number of individuals in each exposure bin per person-year of the *general population.* Therefore, **prior to assignment to simulants, these rates should be divided by the prevalence of current smokers for the corresponding demographic groups.**

Pack-years Among Former Smokers
+++++++++++++++++++++++++++++++

Pack-years among former smokers should be assigned in a similar way to pack-years among current smokers, although the exposure should be sampled from the pack-year distribution among current smokers *the last year that the former smoker was a current smoker*. In other words, the year equal to the current year minus the simulant's years since quitting (see section below).

The 

Years Since Quitting Among Former Smokers
+++++++++++++++++++++++++++++++++++++++++++

.. todo::

  Detail vivarium modeling strategy

    Note: prevalence of smoking is forcasted as well as pack-years for current smokers

    Years since quitting will be used for initialization only

    Pack-year smoking history exposure will be assigned to former smokers by looking up the pack-year history among current smokers in the year that they quit (assumption/limitation of model; potential error here should be investigated)


Restrictions
++++++++++++

.. list-table:: GBD 2017 Risk Exposure Restrictions
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
     - age_group_id=11
     - 30-35 years; note: smoking prevalence starts at age_group_id=9, pack-years and years since quitting start at age_group_id=11
   * - Age group end
     - age_group_id=235
     - 95+ years

Assumptions and Limitations
+++++++++++++++++++++++++++

Describe the clinical and mathematical assumptions made for this cause model,
and the limitations these assumptions impose on the applicability of the
model.

Risk Exposure Model Diagram
++++++++++++++++++++++

Include diagram of Vivarium risk exposure model.

Data Description Tables
+++++++++++++++++++++++

As of 02/10/2020: follow the template created by Ali for Iron Deficiency, copied 
below. If we discover it's not general enough to accommodate all exposure types,
we need to revise the format in coworking. 

.. list-table:: Constants 
	:widths: 10, 5, 15
	:header-rows: 1

	* - Constant
	  - Value
	  - Note
	* - 
	  - 
	  - 

.. list-table:: Distribution Parameters
	:widths: 15, 30, 10
	:header-rows: 1

	* - Parameter
	  - Value
	  - Note
	* - 
	  - 
	  -

Validation Criteria
+++++++++++++++++++

..	todo::
	Fill in directives for this section

References
----------