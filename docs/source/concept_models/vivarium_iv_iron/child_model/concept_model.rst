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

.. todo::

  Fill out information on simulation timeframe and timestep


* Date of simulation start: TBD

* Date of intervention scale-up: N/A (simulation coverage modeled in WRA simulation)

* Date of simulation end: TBD

* Simulation time step: 0.5 days

.. _ivironU54.0:

4.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _ivironU54.1:

4.1 Vivarium concept model diagram components
----------------------------------------------

4.1.1 Cause Models
~~~~~~~~~~~~~~~~~~

* :ref:`Diarrheal diseases <2019_cause_diarrhea>`
* :ref:`Lower respiratory infections <2019_cause_lower_respiratory_infections>`
* :ref:`Measles <2019_cause_measles>`

4.1.2 Joint Cause-Risk Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Child wasting and protein energy malnutrition (NOTE: static propensity model verions 2-4, :ref:`dynamic transition model for versions 5+ <2020_risk_exposure_wasting_state_exposure>`)

.. todo::

  Determine whether to move forward with dynamic transition model of child wasting for this project

4.1.3 Risk Exposure Models
~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Child Stunting (GBD 2020) <2020_risk_exposure_child_stunting>`
* :ref:`Suboptimal breastfeeding <2020_risk_suboptimal_breastfeeding>`

.. note::

  :ref:`Low Birthweight and Short Gestation (GBD 2019) <2019_risk_exposure_lbwsg>` risk exposure will be modeled as part of the :ref:`IV iron women of reproductive age simulation <2019_concept_model_vivarium_iv_iron_maternal_sim>`.


4.1.4 Risk Effects Models
~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Child Wasting Risk Effects <2019_risk_effect_wasting>` (NOTE: consider affected measure for diarrheal diseases for model versions before and after 5/vicious cycle implementation)
* Child stunting risk effects
* :ref:`Low Birthweight and Short Gestation Risk Effects (GBD 2019) <2019_risk_effect_lbwsg>`
* Suboptimal breastfeeding risk effects (note: separate risk exposure and effects model)

.. todo::

  Determine whether to include the :ref:`Diarrheal Diseases Risk Effects <2019_risk_effect_diarrheal_diseases>` along with the dynamic model of child wasting or not.


4.1.5 Risk-Risk Correlation Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Birthweight and child wasting risk-risk correlation <2019_risk_correlation_birthweight_wasting>`
* :ref:`Birthweight and child stunting risk-risk correlation <2019_risk_correlation_birthweight_stunting>`

4.1.6 Non-standard Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Cognition

4.1.7 Intervention Models
~~~~~~~~~~~~~~~~~~~~~~~~~

.. _ivironU54.2:

4.2 Demographics
----------------

4.2.1 Locations
~~~~~~~~~~~~~~~

Location aggregation
^^^^^^^^^^^^^^^^^^^^^^

.. todo::

  Detail startegy for location aggregation of GBD parameters used in the child simulation

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
     - Closed
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

  Detail duration of simulation strategy so that we have observation periods for entire under five population. Clarify if BMGF is interested in U5 or U2 population.


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

.. todo::

  Create simulation output table for model II child sim

5.0 Back of the envelope calculations
+++++++++++++++++++++++++++++++++++++


6.0 Limitations
+++++++++++++++


7.0 References
+++++++++++++++

