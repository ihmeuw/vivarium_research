.. _2019_multiple_myeloma_risk_factor_effects:

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

====================================
Multiple Myeloma Risk Factor Effects
====================================

.. note::

  This document describes risk effects in Phase 2 of the multiple myeloma model. For risk effects in Phase 1, see the :ref:`Risk factor model <mm5.3.2>` and :ref:`Risk factor effects <mm5.3.2.2>` sections in the Phase 1 concept model.

As in Phase 1, each multiple myeloma risk factor will be associated with a hazard ratio for relapse, and a hazard ratio for mortality. These are derived from literature sources, where they represent the HR between an exposed and unexposed group. We then calculate the inputs to the simulation, which are hazard ratios of each group (exposed and unexposed) relative to the baseline survival curve, using the makeup of patients in the baseline survival curve.

Risk effect sources
-------------------

Due to data quality concerns, we continue to use literature sources instead of Flatiron to inform risk effects.

It is important to note what these risk effects are and are not adjusted for. In Phase 1, a key limitation was that we used risk effects unadjusted for each other, except that they were adjusted for age, and we also did not correlate cytogenetic risk or renal impairment with each other or any other risk factors. If we assume no effect modification, when two risk factors are uncorrelated in our simulation and we use risk effects unadjusted for a real-world correlation, results stratified by only one of these risk factors are unbiased, and scenario comparisons in which interventions are only targeted based on one of the risk factors are unbiased. However, results that are stratified by both risk factors, or scenarios in which interventions are targeted on both risk factors, are biased; the direction of bias depends on the directions of the real-world correlations.

In Phase 2, some of these risk factors will become correlated with treatment in our simulation, which means we need to use risk effects adjusted for treatment for those factors. (Our treatment effects, which originate from RCTs, are already adjusted for all risk factors.) The best source for treatment-adjusted risk effects are RCTs where treatment was assigned randomly and not correlated with risk factors, as it would be in regular clinical practice.

.. note::

  Flatiron allows us to estimate the correlation of risk factors, but we would need effect sizes adjusted for the other risk effects (and nothing else). Since we are not using Flatiron for the risk effects, there is no good way to obtain these. Due to the lack of risk effects, we do not model the correlations, except for those between each risk factor and treatment as described above, and between age, sex, and race.

.. todo::

  Fill in this table.

.. list-table:: Risk Effects Table
  :header-rows: 1

  * - Parameter
    - OS HR
    - PFS HR
    - Exposed group
    - Unexposed group
    - Directly correlated with (in simulation)
    - Adjustment variables
    - Source
    - Note
  * - Sex
    -
    -
    - Male
    - Female
    - Age, race
    -
    -
    -
  * - Age at diagnosis
    -
    -
    - 65+
    - <65
    - Sex, race, treatment
    -
    -
    -
  * - Race
    -
    -
    - Black
    - Non-Black
    - Age, sex
    -
    -
    -
  * - Renal function at diagnosis
    -
    -
    - Impaired
    - Not impaired
    - Treatment
    -
    -
    - Impairment defined as eGFR less than 60
  * - Cytogenetic risk
    -
    -
    - High
    - Standard
    - Treatment(?)
    -
    -
    -

Changing the reference group
----------------------------

1.  For each covariate, calculate :math:`h_\text{exposed}` and :math:`h_\text{unexposed}` using the equations below, a sampled value from the hazard ratio uncertainty distributions from the table above, and the exposure prevalence among patients included in the survival curve. Do this separately for relapse and mortality.

.. math::

  HR_\text{exposed:unexposed} = \frac{h_\text{exposed}}{h_\text{unexposed}}

.. math::

  h_\text{baseline} = p_\text{exposed} * h_\text{exposed} + (1 - p_\text{exposed}) * h_\text{unexposed}

So that,

.. math::

  h_\text{exposed} = \frac{h_\text{baseline}}{p_\text{exposed} + \frac{1 - p_\text{exposed}}{HR_\text{exposed:unexposed}}}

and

.. math::

  h_\text{unexposed} = \frac{h_\text{exposed}}{HR_\text{exposed:unexposed}}

2.  Use covariate exposure level-specific hazard rate to solve for hazard ratio of each covariate exposure relative to the overall baseline hazard rate from the multiple myeloma cause model.

.. math::

  HR_\text{exposed:baseline} = \frac{h_\text{exposed}}{h_\text{baseline}}

.. math::

  HR_\text{unexposed:baseline} = \frac{h_\text{unexposed}}{h_\text{baseline}}

Final risk effects
------------------

.. todo::

  Update this table. These are stand-in values from Phase 1.

.. list-table:: Final risk effects for simulation use
  :header-rows: 1

  * - Risk
    - Risk exposure
    - OS HR relative to baseline
    - PFS HR relative to baseline
  * - Age at diagnosis
    - 65+ years
    - 1.24 (1.16, 1.3)
    - 1.17 (1.11, 1.23)
  * - Age at diagnosis
    - <65 years
    - 0.57 (0.44, 0.71)
    - 0.69 (0.59, 0.8)
  * - Sex
    - Male
    - 1.26 (1.11, 1.38)
    - 1.12 (1.02, 1.21)
  * - Sex
    - Female
    - 0.7 (0.56, 0.87)
    - 0.86 (0.76, 0.97)
  * - Race
    - Black
    - 1 (no uncertainty)
    - 1 (no uncertainty)
  * - Race
    - non-Black
    - 1 (no uncertainty)
    - 1 (no uncertainty)
  * - Renal function
    - Renal impaired
    - 1.40 (1.20, 1.59)
    - 1.20 (1.09, 1.32)
  * - Renal function
    - Not renal impaired
    - 0.74 (0.61, 0.86)
    - 0.86 (0.79, 0.94)
  * - Cytogenetic risk
    - High cytogenetic risk
    - 1.33 (1.14, 1.53)
    - 1.37 (1.19, 1.56)
  * - Cytogenetic risk
    - Standard cytogenetic risk
    - 0.83 (0.73, 0.93)
    - 0.81 (0.71, 0.90)

Applying the risk effect
------------------------

Apply the hazard ratios above specific to the exposure value a simulant possesses for each risk factor to the baseline hazard rate to get the simulant's individual hazard rate separately for relapse and mortality, as shown in the equation below.

  for risk exposure(i) in under 65 at diagnosis/over 65 at diagnosis, male/female, Black/non-Black, high cytogenetic risk/standard cytogenetic risk, renal impaired/not renal impaired:

.. math::

  h_\text{simulant} = h_\text{baseline} * \prod HR_\text{risk exposure(i):baseline}
