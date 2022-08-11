.. _2019_multiple_myeloma_risk_factor_exposures:

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

======================================
Multiple Myeloma Risk Factor Exposures
======================================


We will follow the same strategy for risk factor exposures as in the :ref:`Multiple Myeloma Phase 1 concept model <2019_concept_model_vivarium_csu_multiple_myeloma>`, except that we are removing the race exposure, and changing the age cutoff.

Upon diagnosis with multiple myeloma, simulants should be assigned values for each of the following characteristics, with the probability shown in the tables below, depending on location. In addition, a dichotomous risk exposure value of <70 or 70+ should be assigned to each simulant based on the simulant's age at the time they are initialized into or transition into the newly diagnosed MM state.

United States
-------------

.. list-table:: Risk Exposure Distributions Simulant Initialization in the US
  :header-rows: 1

  * - Risk factor
    - Exposed group
    - Unexposed group
    - Proportion exposed
  * - Cytogenetic risk at diagnosis
    - High cytogenetic risk
    - Standard cytogenetic risk
    - 0.34
  * - Renal insufficiency at diagnosis
    - Renal insufficiency
    - No renal insufficiency
    - 0.40

The probability of high cytogenetic risk (34%) was obtained from [Rice-et-al-2020]_, assuming that unknown/undocumented status was missing at random. This value was used instead of the value reported in [Braunlin-et-al-2021]_ because it was substantially higher than values reported in other data source, as discussed in correspondence with the client.

The probability of renal impairment (40%) was obtained from [Derman-et-al-2020]_. This value was chosen instead of the value reported in [Braunlin-et-al-2021]_, as it was consistent with values from several other sources, as discussed in correspondence with the client.

Given the lack of effect sizes available for renal insufficiency and cytogenetic risk where the effects are adjusted for only treatment and each other, we have made them uncorrelated in our simulation and use unadjusted effect sizes, as described in :ref:`the MM risk effects documentation <2019_multiple_myeloma_risk_factor_effects>`.

China
-----

.. list-table:: Risk Exposure Distributions Simulant Initialization in China
  :header-rows: 1

  * - Risk factor
    - Exposed group
    - Unexposed group
    - Proportion exposed
  * - Cytogenetic risk at diagnosis
    - High cytogenetic risk
    - Standard cytogenetic risk
    - 0.45
  * - Renal insufficiency at diagnosis
    - Renal insufficiency
    - No renal insufficiency
    - 0.50

These probabilities were informed by expert assumptions. As in the US, they are uncorrelated with each other.