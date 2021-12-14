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


.. _2019_concept_model_vivarium_iv_iron:

===========================
Vivarium Intravenous Iron
===========================

.. contents::
  :local:


1.0 Background
++++++++++++++

.. _iviron1.1:

1.1 Project overview
--------------------


.. _iviron2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++


.. _iviron3.0:

3.0 Interventions
+++++++++++++++++


.. _iviron3.1:

3.1 Simulation scenarios
------------------------

.. _iviron3.2:

3.2 Simulation timeframe and intervention start dates
-----------------------------------------------------


.. _ivron4.0:

4.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _iviron4.1:

4.1 Vivarium concept model diagram components
----------------------------------------------

4.1.1 Cause Models
~~~~~~~~~~~~~~~~~~

* Maternal disorders
* Maternal hemorrhage incidence

For later model versions: 

  * :ref:`Diarrheal diseases <2019_cause_diarrhea>`
  * :ref:`Lower respiratory infections <2019_cause_lower_respiratory_infections>`
  * :ref:`Measles <2019_cause_measles>`
  * Postpartum depression

4.1.2 Joint Cause-Risk Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Hemoglobin, anemia, and iron deficiency model <2019_hemoglobin_anemia_and_iron_deficiency>`

.. todo::

  Add more detail on exactly which components/strategies to include in this simulation specifically

For later model versions:

  * Child wasting and protein energy malnutrition (NOTE: static propensity model for subgroups 2-4, :ref:`dynamic transition model for subgroups 5+ <2020_risk_exposure_wasting_state_exposure>`)

4.1.3 Risk Exposure Models
~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Maternal Body Mass Index <2019_risk_exposure_maternal_bmi>`

For later model versions:

  * :ref:`Low Birthweight and Short Gestation (GBD 2019) <2019_risk_exposure_lbwsg>`
  * :ref:`Child Stunting (GBD 2020) <2020_risk_exposure_child_stunting>`
  * :ref:`Suboptimal breastfeeding <2020_risk_suboptimal_breastfeeding>`
  * Orphanhood

4.1.4 Risk Effects Models
~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Hemoglobin/Iron deficiency risk effects <2019_risk_effect_iron_deficiency>`
* Maternal hemorrhage risk effects

For later model versions:

  * :ref:`Child Wasting Risk Effects <2019_risk_effect_wasting>` (NOTE: consider affected measure for diarrheal diseases for model versions before and after subgroup 5/vicious cycle implementation)
  * Child stunting risk effects
  * :ref:`Low Birthweight and Short Gestation Risk Effects (GBD 2019) <2019_risk_effect_lbwsg>`
  * :ref:`Diarrheal Diseases Risk Effects <2019_risk_effect_diarrheal_diseases>`
  * Suboptimal breastfeeding risk effects (note: separate risk exposure and effects model)
  * Postpartum depression risk effects
  * Orphanhood risk effects

4.1.5 Risk-Risk Correlation Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For later model versions:

  * :ref:`Birthweight and child wasting risk-risk correlation <2019_risk_correlation_birthweight_wasting>`
  * :ref:`Birthweight and child stunting risk-risk correlation <2019_risk_correlation_birthweight_stunting>`
  * :ref:`Maternal BMI and birthweight <2019_risk_correlation_maternal_bmi_birthweight>`

4.1.6 Non-standard outcomes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For later model versions:

  * Stillbirth
  * Infertility
  * Cognition

4.1.7 Intervention Models
~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Maternal supplementation <maternal_supplementation_intervention>`
* Antenatal IV iron
* Postpartum IV iron

.. todo::

  Move hemoglobin outcomes of maternal supplmentation to the linked page from :ref:`this current page <maternal_anemia_intervention>`

For later model versions:

  * :ref:`Acute malnutrition management and treatment <intervention_wasting_treatment>` (NOTE: will need to be updated to locations of interest)
  * Childhood vaccinations

.. _iviron4.2:

4.2 Demographics
----------------

.. _iviron4.2.1:

4.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~


.. _iviron4.2.2:

4.2.2 Population of interest
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. _iviron4.3:

4.3 Models
----------


.. _iviron4.4:

4.4 Desired outputs
-------------------


.. _iviron4.5:

4.5 Simulation output table
---------------------------

.. _iviron5.0:

5.0 Back of the envelope calculations
+++++++++++++++++++++++++++++++++++++

.. _iviron6.0:

6.0 Limitations
+++++++++++++++

7.0 References
+++++++++++++++

