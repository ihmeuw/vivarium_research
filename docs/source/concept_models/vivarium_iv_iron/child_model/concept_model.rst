.. role:: underline
    :class: underline

..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  +++++++++++++++++++++

  Section Level 2 (#.#)
  ---------------------

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

.. _2019_concept_model_vivarium_iv_iron_child_sim:

=================================================
Vivarium Intravenous Iron - Children under five
=================================================

.. contents::
  :local:

.. list-table:: Abbreviations
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - IV
    - Intravenous
    - 
  * - IDA
    - Iron deficiency anemia
    - 
  * - WRA
    - Women of reproductive age
    - 
  * - PLW
    - Pregnant and lactating women
    - 
  * - IFA
    - Iron and folic acid
    - 
  * - MMS
    - Multiple micronutrient supplementation
    - 
  * - BEP
    - Balanced energy protein
    - 
  * - BMGF
    - Bill and Melinda Gates Foundation
    - 
  * - ANC
    - Antenatal care
    - 
  * - IFD
    - In-facility delivery
    - 
  * - LMICs
    - Low and middle income countries
    - 

1.0 Background
++++++++++++++

.. _ivironU52.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++

.. _ivironU53.0:

3.0 Concept model
+++++++++++++++++

3.2 Simulation timeframe and intervention start dates
------------------------------------------------------

**Throughout model development and verification/validation:**

.. list-table:: Developmental model child simulation timeframe and intervention dates
  :header-rows: 1

  * - Parameter
    - Value
  * - Date of simulation burn-in period start
    - N/A: no burn-in period
  * - Date of simulation observation period start
    - January 1, 2022 (only model births that occur on or after this date)
  * - Date of intervention scale-up start
    - N/A: defined for maternal simulation
  * - Date of simulation end
    - December 31, 2026 (run beyond end of maternal simulation so we can see impact of older children covered by intervention)
  * - Simulation time step
    - 0.5 days
  * - Intervention scale-up rate
    - N/A: defined for maternal simulation

**For final model results:**

.. list-table:: Final model child simulation timeframe and intervention dates
  :header-rows: 1

  * - Parameter
    - Value
  * - Date of simulation burn-in period start
    - N/A: defined for maternal simulation (5 year burn-in period)
  * - Date of simulation observation period start
    - January 1, 2025
  * - Date of intervention scale-up start
    - N/A: defined for maternal simulation
  * - Date of simulation end
    - December 31, 2040
  * - Simulation time step
    - 0.5 days
  * - Intervention scale-up rate
    - N/A: defined for maternal simulation

.. _ivironU54.0:

4.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _ivironU54.1:

4.1 Vivarium concept model diagram components
----------------------------------------------

4.1.1 Cause Models
~~~~~~~~~~~~~~~~~~

* :ref:`Diarrheal diseases (GBD 2019) <2019_cause_diarrhea>`
* :ref:`Lower respiratory infections (GBD 2019) <2019_cause_lower_respiratory_infections>`
* :ref:`Measles (GBD 2019) <2019_cause_measles>`

4.1.2 Joint Cause-Risk Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Static child wasting risk exposure and protein energy malnutrition <2019_risk_exposure_static_wasting>`

4.1.3 Risk Exposure Models
~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Child Stunting <2020_risk_exposure_child_stunting>`: use GBD 2019 data, but follow modeling strategy on this 2020 risk exposure page

.. note::

  :ref:`Low Birthweight and Short Gestation (GBD 2019) <2019_risk_exposure_lbwsg>` risk exposure will be modeled as part of the :ref:`IV iron women of reproductive age simulation <2019_concept_model_vivarium_iv_iron_maternal_sim>` and subsequently assigned to simulants in the child simulation.

  :ref:`Suboptimal breastfeeding (GBD 2020) <2020_risk_suboptimal_breastfeeding>` will not be modeled for now


4.1.4 Risk Effects Models
~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Child Wasting Risk Effects <2019_risk_effect_wasting>` (NOTE: use the modeling strategy specific to LRI and measles on this document for all affected causes, including diarrheal diseases): use GBD 2019 data, but follow modeling strategy on this page
* Child stunting risk effects: use 2019 data
* :ref:`Low Birthweight and Short Gestation Risk Effects (GBD 2019) <2019_risk_effect_lbwsg>`

.. note::

  :ref:`Suboptimal breastfeeding <2020_risk_suboptimal_breastfeeding>` risk effects will not be modeled for now

4.1.5 Risk-Risk Correlation Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. todo::

  Update this section to reflect the documentation of the causal effect of BW and CGF as described on the maternal supplementation intervention document

* :ref:`Birthweight and child wasting risk-risk correlation <2019_risk_correlation_birthweight_wasting>`
* :ref:`Birthweight and child stunting risk-risk correlation <2019_risk_correlation_birthweight_stunting>`

.. note::

  *Causation* portion of these risk correlation models should be prioritized over the correlation portion.

4.1.7 Intervention Models
~~~~~~~~~~~~~~~~~~~~~~~~~

Intervention models modeled as part of the :ref:`IV iron women of reproductive age simulation <2019_concept_model_vivarium_iv_iron_maternal_sim>`

.. _ivironU54.2:

4.2 Demographics
----------------

4.2.1 Locations
~~~~~~~~~~~~~~~

Location aggregation
^^^^^^^^^^^^^^^^^^^^^^

Details on how to calculate weighted averages for specific simulation parameters are shown in the tables below.

.. list-table:: Weighted average calculation instructions
   :header-rows: 1

   * - Parameter
     - Parameter ID
     - Available location IDs
     - Weighting unit
     - Age-specific?
     - Sex-specific?
     - Note
   * - Categorical risk exposures
     - REI IDs 240 (wasting), 241 (stunting), 136 (non-exclusive breastfeeding), 137 (discontinued breastfeeding)
     - 159, 166 (get_draws not available for 44577 or 44578)
     - population
     - Yes
     - Yes
     - Weight each exposure category within a risk factor exposure distribution separately
   * - Relative risks
     - REI IDs 240 (wasting), 241 (stunting), 136 (non-exclusive breastfeeding), 137 (discontinued breastfeeding)
     - Not location-specific
     - N/A
     - Yes
     - Yes
     - 
   * - Risk factor PAFs
     - REI IDs 240 (wasting), 241 (stunting), 136 (non-exclusive breastfeeding), 137 (discontinued breastfeeding)
     - 159, 166, 44577, 44578
     - N/A
     - Yes
     - Yes
     -  
   * - Cause parameters
     - Cause IDs 302 (diarrheal diseases), 341 (measles), 322 (lower respiratory infections), 387 (protein energy malnutrition)
     - 159, 166, 44577, 44578
     - N/A
     - Yes
     - Yes
     - 

.. _ivironU54.2.1:

4.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table:: Simulation population parameters throughout model development
   :header-rows: 1

   * - Parameter
     - Value
     - Note
   * - Population size
     - 100,000
     - 
   * - Number of draws
     - 66
     - 
   * - Number of random seeds
     - 10
     - 
   * - Cohort type
     - Open
     - 
   * - Age start
     - 0
     - 
   * - Age end
     - 5 years
     - 
   * - Exit age
     - 5 years
     - 
   * - Sex restrictions
     - None
     - 

.. todo::

  Determine if it is necessary to have an initialized population of U5 year olds at the start of the simulation. Doing so will be helpful to maintain continuity in the way that we assign LBWSG exposure for simulants who are born into the sim and those who are initialized into the sim, but would require post-processing transformations to measure total DALYs among children under five in the beginning years of the simulation (although we would have an accurate measure of DALYs averted). Alternative strategies include a five year burn-in period (long) or discontinitous assignment of LBWSG among the initialized population (which would be harder for the software engineers, but especially with a month long burn-in period would seem to have a small impact on model results).

.. list-table:: Simulation population parameters for final model version
   :header-rows: 1

   * - Parameter
     - Value
     - Note
   * - Population size
     - Informed from maternal sim
     - 
   * - Number of draws
     - Informed from WRA simulation outputs
     - 
   * - Number of random seeds
     - Informed from WRA simulation outputs
     - 
   * - Cohort type
     - Open
     - Births into cohort are informed by births from maternal simulation output
   * - Age start
     - 0
     - 
   * - Age end
     - 5 years
     - 
   * - Exit age
     - 5 years
     - 
   * - Sex restrictions
     - None
     - 

.. _ivironU54.3:

4.3 Models
----------

.. list-table:: Model verification and validation tracking
   :widths: 3 10 20
   :header-rows: 1

   * - Model
     - Description
     - V&V summary
   * - II.1
     - Cause models (infectious diseases)
     - `Simulation validation notebook can be found here <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/cause_data_validation.ipynb>`_. [1] underestimation of diarrheal diseases and lower respiratory infections remission rates. [2] underestimation of lower respiratory infections burden in neonatal age groups. [3] GBD 2019 age groups (does not include new GBD 2020 age groups). NOTE: still need to validate DALYs, YLLs, YLDs once environment issue is solved.
   * - II.2
     - Wasting and stunting, without PEM. Results stratified by stunting
     - [1] `Overstimation of excess mortality rates due to diarrheal diseases, LRI, and mealses <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/cause_data_validation_with_cgf_no_pem.ipynb>`_. [2] `Stunting risk exposure looks good <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/stunting_validation.ipynb>`_. [3] `Stunting risk effects on incidence rates look good <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/child/stunting_validation.ipynb>`_. Need to verify that stunting is *not* affecting diarrheal diseases excess mortality (hard to tell given stocastic variation). **Can now remove stunting stratification of disease transitions and state person time**.

.. list-table:: Outstanding model verification and validation issues
  :header-rows: 1

  * - Issue
    - Explanation
    - Action plan
    - Timeline
  * - Underestimation of diarrheal diseases and LRI remission rates
    - Potential timestep issue, as identified with CIFF
    - Researchers to investigate solutions
    - TBD
  * - Underestimation of LRI burden in neonatal age groups
    - Appears to be a result of incompatible incidence, remission, and prevalence as estimated by GBD. There was birth prevalence of LRI in GBD 2017 that was removed for GBD 2019. Including a birth prevalence in our model would allow us to validate to GBD metrics, but would be inconsistent with GBD assumptions.
    - Researchers to determine which validation targets are most important to hit and strategize how to achieve that.
    - TBD
  * - Overestimation of excess mortality rates for diarrhea, LRI, and measles
    - Unknown. Was introduced with the addition of wasting and stunting risks to the model. Does not appear to be due to stunting risk effects.
    - SWEs to investigate, researchers to see if we can identify source of bug in next model results that are stratified by wasting.
    - Soon

.. _ivironU54.4:

4.4 Desired outputs
-------------------

For model version II:

#. DALYs (YLLs and YLDs) among children under five (due to LBWSG-affected causes, measles, LRI, diarrheal diseases, PEM)
#. Mean birthweight at birth
#. Prevalence of low birthweight babies (<2500 grams)
#. Risk exposure of child wasting and child stunting

.. _ivironU54.5:

4.5 Simulation output table
---------------------------

.. csv-table:: Child simulation output table
   :file: output_table.csv
   :header-rows: 1

.. note::
  
  Stratification by IFA coverage should be done in the baseline scenario for validation and verification and then can be removed once we confirm that it is working correctly.

5.0 Back of the envelope calculations
+++++++++++++++++++++++++++++++++++++


6.0 Limitations
+++++++++++++++


7.0 References
+++++++++++++++

