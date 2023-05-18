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

GBD does not explicitly model maternal hemorrhage as a risk factor. However, GBD models a hemoglobin shift associated with maternal hemorrhage in the :ref:`anemia causal attribution process <2019_anemia_impairment>`, which was derived from a meta-analysis performed for GBD 2019. GBD assumes that a case of **maternal hemorrhage is associated with a decrease of 6.8 grams per liter hemoglobin concentration**, on average. There is no uncertainty interval around this value considered in the GBD anemia causal attribution process (this value is not published, but was obtained from the anemia modelers). Notably, according to Nick Kassebaum, this value is representative of the mean difference in hemoglobin among those who experienced hemorrhage and those who did not after some duration of follow-up on the order of weeks to months. Therefore, it is not necessarily representative of the immediate impact of hemorrhage on hemoglobin concentration.

.. note::

  In future GBD rounds, the hemoglobin shift value for anemia causal attribution will be updated, but this change does not apply to GBD 2021. There were no substantive relevant modeling strategy changes from GBD 2019 to GBD 2021.

Additionally, GBD models both moderate (500-1000 mL blood loss, sequela ID 180) and severe (1000+ mL blood loss, sequela ID 181) maternal hemorrhage sequelae.

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

Research background
^^^^^^^^^^^^^^^^^^^^^

Plasma volume during pregnancy has been shown to increase by approximately 50% in the late third trimester [Aguree-and_Gernand-2019]_. Therefore, given an assumed blood volume of 5 liters [Sharma-and-Sharma-2021]_ among non-pregnant individuals, we will assume a blood volume at birth equal to 7.5 liters.

.. note::

  We are assuming that the increase in plasma volume during pregnancy as observed by [Aguree-and_Gernand-2019]_ is equivalent to the increase in blood volume.

Additionally we will assume blood loss of 0.75 L for moderate hemorrhage (0.5 - 1 L blood loss) and 1.25 L for severe hemorrhage (>1 L blood loss). Therefore, we will model a reduction in hemoglobin equal to 10% of hemoglobin at birth for moderate hemorrhage (0.75 / 7.5) and 16.7% reduction for severe hemorrhage (1.25 / 7.5).

For simulants who experience an incident case of maternal hemorrhage as determined in the :ref:`maternal hemorrhage incidence cause mode document<2019_cause_maternal_hemorrhage_incidence>`:

  1. Determine if they experienced a moderate or severe case of hemorrhage. The probability of moderate hemorrhage is equal to **0.85 (95% CI: 0.81, 0.89; normal distribution of uncertainty truncated at zero and one)**. The probability of severe hemorrhage is equal to one minus the probability of moderate hemorrhage. These probabilities are not age- or location-specific and were `calculated in this notebook <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/misc_investigations/hemorrhage%20severity%20proportions.ipynb>`_.

  2. Scale the simulant's :ref:`hemoglobin concentration exposure <2019_hemoglobin_model>` by a factor of 0.9 for moderate hemorrhage and 0.833 for severe hemorrhage, applied as a multiplicative factor to the continuous exposure distribution. This effect should be applied **at birth** and persist until the end of the postpartum period as defined by the :ref:`pregnancy model <other_models_pregnancy>`. At the end of the postpartum period, the simulants' hemoglobin concentration should increase by the 1/the severity-specific multiplicative factor prior to the removal of the pregnancy adjustment factor to the simulant's hemoglobin level.

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The hemoglobin concentration stratified by severity-specific maternal hemorrhage incidence (also stratified by anemia status in pregnancy to avoid confounding by this factor) should differ by the magnitude of the maternal hemorrhage hemoglobin effect.

.. note::

  We may slightly underestimate the hemoglobin exposure distribution compared to GBD as a result of the implementation of this modeling strategy.

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- This modeling strategy does not consider that the impact of maternal hemorrhage is already reflected in the pregnancy adjustment factor used for the :ref:`hemoglobin model <2019_hemoglobin_model>` and therefore we may slightly underestimate hemoglobin concentration (and therefore overestimate anemia prevalence) on average during the pregnancy and lactation period by applying an additional negative hemoglobin shift associated with maternal hemorrhage.

.. todo::

  Consider a modeling strategy that calibrates the pregnancy-specific hemoglobin exposure to the baseline level of maternal hemorrhage in the population

References
----------

.. [Aguree-and_Gernand-2019]

  Aguree, S., & Gernand, A. D. (2019). Plasma volume expansion across healthy pregnancy: a systematic review and meta-analysis of longitudinal studies. BMC pregnancy and childbirth, 19(1), 508. https://doi.org/10.1186/s12884-019-2619-6

.. [Sharma-and-Sharma-2021]
  Sharma R, Sharma S. Physiology, Blood Volume. [Updated 2021 Apr 20]. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2022 Jan-. Available from: https://www.ncbi.nlm.nih.gov/books/NBK526077/