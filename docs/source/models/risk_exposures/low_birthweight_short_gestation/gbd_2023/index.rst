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

.. _2023_risk_exposure_lbwsg:

======================================================
Low Birthweight and Short Gestation (LBWSG): GBD 2023
======================================================

The LBWSG risk factor was "out of rotation" for GBD 2023, meaning that the exposure and effects models for this risk factors did not undergo any updates from the GBD modelers. Instead, the estimates from :ref:`the GBD 2021 LBWSG exposure model <2021_risk_exposure_lbwsg>` were copied over for shared years between GBD 2021 and GBD 2023 rounds and "forward filled" for years new to GBD 2023 (year_ids of 2023 and 2024). This forward filling involved a socio-demographic index driven linear regression performed by central computation. The forward filling was performed for most detailed locations for the early and late neonatal age groups (not birth exposure) as these are exposures that are used directly for PAF calculations. PAF calculations for non-most detailed locations are calculated by aggregating PAF estimates from most detailed child locations according to updated GBD 2023 population models.

Utilizing the GBD 2023 (year_id==2023) estimates for LBWSG exposure would require several custom data generation tasks, including (but not necessarily limited to):

- Duplicating the GBD process of forward filling exposure distributions and applying it to birth exposures
- Performing custom aggregation of birth exposures according to GBD population estimates of live births by sex
- Performing updated data generation for all custom generated parameters in out model, including (but not necessarily limited to):
  
  - Gestational age shifts for IFA and MMS interventions
  - Effect of IV iron on birth weight and gestational age
  - Effect of hemoglobin on neonatal sepsis, adjusted for mediation by LBWSG
  - Facility choice model causal probabilities

Given the intensity of these dependencies, we evaluated the difference between LBWSG exposure estimates in year 2021 from the GBD 2021 round and year 2023 from the GBD 2023 round to determine whether the updates were substantial enough to warrant inclusion in our model. `A notebook showing the comparison of these exposures can be found here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/data_prep/lbwsg_exposure_by_gbd_round.ipynb>`__. Given the minimal differences in LBWSG exposures and PAF estimates between these years/rounds (specifically with a less than 2% change in the preterm population and the population eligible for the antenatal corticosteroid intervention), we decided that it was not worth updating our LBWSG estimates to data from GBD 2023 and will continue using the data for year 2021 in the :ref:`the GBD 2021 LBWSG exposure model <2021_risk_exposure_lbwsg>` in the MNCNH portfolio simulation for model runs for which other parameters have undergone an update to GBD 2023 data.

Notably, because the following parameters depend on updated mortality data, we will still need to re-calculate the following parameters that are related to the LBWSG risk factor:

- Maximum values for LBWSG RR (depends on location/age/sex-specific overall mortality risk)
- LBWSG PAF for the late neonatal age group (depends on mortality that occurs in the early neonatal age group)
- Effects of hemoglobin on neonatal sepsis, adjusted for mediation by LBWSG (will depend on capped LBWSG RRs as well as the updated LNN LBWSG PAF)