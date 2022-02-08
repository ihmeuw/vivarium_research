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

* Date of simulation start: January 1, 2022

* Date of intervention scale-up: N/A (simulation coverage modeled in WRA simulation)

* Date of simulation end: December 31, 2024

* Simulation time step: 0.5 days

.. note::

  We will likely increase the duration of simulation run time for final results of this model, but a shorter timeframe should be used throughout model development and validation.

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

* :ref:`Static child wasting risk exposure and protein energy malnutrition (GBD 2020) <2020_risk_exposure_static_wasting>`

4.1.3 Risk Exposure Models
~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Child Stunting (GBD 2020) <2020_risk_exposure_child_stunting>`
* :ref:`Suboptimal breastfeeding (GBD 2020) <2020_risk_suboptimal_breastfeeding>`

.. note::

  :ref:`Low Birthweight and Short Gestation (GBD 2019) <2019_risk_exposure_lbwsg>` risk exposure will be modeled as part of the :ref:`IV iron women of reproductive age simulation <2019_concept_model_vivarium_iv_iron_maternal_sim>` and subsequently assigned to simulants in the child simulation.


4.1.4 Risk Effects Models
~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Child Wasting Risk Effects <2019_risk_effect_wasting>` (NOTE: use the modeling strategy specific to LRI and measles on this document for all affected causes, including diarrheal diseases)
* Child stunting risk effects
* :ref:`Low Birthweight and Short Gestation Risk Effects (GBD 2019) <2019_risk_effect_lbwsg>`
* :ref:`Suboptimal breastfeeding <2020_risk_suboptimal_breastfeeding>`

4.1.5 Risk-Risk Correlation Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Birthweight and child wasting risk-risk correlation <2019_risk_correlation_birthweight_wasting>`
* :ref:`Birthweight and child stunting risk-risk correlation <2019_risk_correlation_birthweight_stunting>`

.. note::

  *Causation* portion of these risk correlation models should be prioritized over the correlation portion.

4.1.6 Non-standard Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Cognition

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

.. list-table:: Simulation population parameters
   :header-rows: 1

   * - Parameter
     - Value
     - Note
   * - Population size
     - Informed from WRA simulation outputs
     - 
   * - Number of draws
     - Informed from WRA simulation outputs
     - 
   * - Number of random seeds
     - Informed from WRA simulation outputs
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

.. _ivironU54.3:

4.3 Models
----------

.. list-table:: Model verification and validation tracking
   :widths: 3 10 20
   :header-rows: 1

   * - Model
     - Description
     - V&V summary
   * - II.0
     - 
     - 

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

5.0 Back of the envelope calculations
+++++++++++++++++++++++++++++++++++++


6.0 Limitations
+++++++++++++++


7.0 References
+++++++++++++++

