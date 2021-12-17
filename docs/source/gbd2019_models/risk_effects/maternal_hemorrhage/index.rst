.. _2019_risk_effect_maternal_hemorrhage:

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

===========================
Maternal Hemorrhage
===========================

.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

.. note::

   This section will describe the Vivarium modeling strategy for risk effects.
   For a description of Vivarium modeling strategy for risk exposure (in this case a cause model document), see the
   :ref:`maternal hemorrhage incidence <2019_cause_maternal_hemorrhage_incidence>` page.


GBD 2019 Modeling Strategy
--------------------------

GBD does not explicitly model maternal hemorrhage as a risk factor. However, GBD models a hemoglobin shift associated with maternal hemorrhage in the :ref:`anemia causal attribution process <2019_anemia_impairment>`, which was derived from a meta-analysis performed for GBD 2019. 

GBD assumes that a case of **maternal hemorrhage is associated with a decrease of 6.8 grams per liter hemoglobin concentration**, on average. There is no uncertainty interval around this value considered in the GBD anemia causal attribution process (this value is not published, but was obtained from the anemia modelers).

.. todo::

  Reach out to anemia modelers to see if there is an uncertainty interval from the systematic review that just isn't used in the causal attribution code.

Vivarium Modeling Strategy
--------------------------

.. list-table:: Risk Outcome Relationships for Vivarium
   :widths: 5 5 5 5 5
   :header-rows: 1

   * - Outcome
     - Outcome type
     - Outcome ID
     - Affected measure
     - Note
   * - Postpartum hemoglobin concentration
     - Modelable entity
     - 10487
     - Hemoglobin concentration
     - During the :ref:`postpartum period <other_models_pregnancy>` only

Postpartum hemoglobin
+++++++++++++++++++++

**Hemoglobin_shift == 6.8 grams per liter**

For simulants who experience an incident case of maternal hemorrhage as determined in the  :ref:`maternal hemorrhage incidence cause mode document<2019_cause_maternal_hemorrhage_incidence>`, their :ref:`hemoglobin concentration exposure <2019_hemoglobin_model>` should be decreased by the hemoglobin_shift from the time of birth for the duration of the postpartum period as defined by the :ref:`pregnancy model <other_models_pregnancy>`. At the end of the postpartum period, the simulants' hemoglobin concentration should increase by the hemoglobin_shift prior to the removal of the pregnancy adjustment factor to the simulant's hemoglobin level.

Validation and Verification Criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The hemoglobin concentration stratified by maternal hemorrhage incidence (also stratified by anemia status in pregnancy to avoid confounding by this factor) should differ by the magnitude of the maternal hemorrhage hemoglobin shift.

.. note::

  We may slightly underestimate the hemoglobin exposure distribution as a result of the implementation of this modeling strategy.

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- This modeling strategy does not consider that the impact of maternal hemorrhage is already reflected in the pregnancy adjustment factor used for the :ref:`hemoglobin model <2019_hemoglobin_model>` and therefore we may slightly underestimate hemoglobin concentration (and therefore overestimate anemia prevalence) on average during the pregnancy and lactation period by applying an additional negative hemoglobin shift associated with maternal hemorrhage.

.. todo::

  Consider a modeling strategy that calibrates the pregnancy-specific hemoglobin exposure to the baseline level of maternal hemorrhage in the population

References
----------

