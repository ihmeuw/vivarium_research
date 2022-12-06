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

  Flatiron allows us to estimate the correlation of risk factors, but we would need effect sizes adjusted for treatment and the other risk effects (and nothing else). Since we are not using Flatiron for the risk effects, there is no good way to obtain these. Due to the lack of risk effects, we do not model the correlations, except for those between each risk factor and treatment as described above, and between age and sex.

.. list-table:: Risk Effects Table
  :header-rows: 1 

  * - Parameter
    - OS HR
    - PFS HR
    - Exposed group
    - Unexposed group
    - Directly correlated with (in simulation)
    - Controlled variables
    - Source
    - Note
  * - Sex
    - 0.86 (0.68, 1.1)
    - 0.83 (0.67, 1.03)
    - Female
    - Male
    - Age, treatment
    - Treatment (randomized)
    - [van_de_Donk_2018]_
    - 
  * - Age at diagnosis
    - 1.30 (1.15, 1.48)
    - 1.17 (1.05, 1.31)
    - 70+ years
    - <70 years
    - Sex, treatment
    - Treatment (randomized)
    - [Ailawadhi_2018]_
    -
  * - Renal function at diagnosis
    - 1 (1, 1)
    - 1 (1, 1)
    - Impaired
    - Not impaired
    - Treatment
    - No adjustments
    - [Dimopoulos_2010]_ There is low data availability at our cutoff for renal insufficiency. Existing data from RCTs suggests no effect, therefore 1 was adopted as a hazard ratio. 
    - Impairment defined as eGFR less than 60
  * - Cytogenetic risk
    - 2.3 (1.4, 4)
    - 1.5 (1, 2.3)
    - High
    - Standard
    - None (did not observe strong relationship to treatment)
    - Treatment (randomized)
    - [Mateos_2011]_
    -

Changing the reference group
----------------------------

The HRs above are relative to the reference exposure group (unexposed). For simulation inputs,
they must be made relative to the hazard of the baseline survival curves in our cause model.

Each hazard ratio is normally distributed in logarithmic space. That is, for each combination of risk factor and endpoint (mortality or relapse),
each exposure group :math:`g` has a hazard ratio such that:

.. math::

  ln(HR_\text{g:reference}) \sim N(\mu_g, \sigma_g^2)

To obtain the survival curve baseline HR, we need the proportions of the data informing that
curve in each risk factor group.

For the US, we get these proportions in terms of Flatiron person-time included in the curve.
Due to the Cox proportional-hazards source of the baseline curves, these proportions are invariant across
lines. Note that for mortality HRs, we use Flatiron data informing the TTD curves, not the OS curve used for mortality in the last relapse state.

For China, we use the same proportions :ref:`used to assign risk proportions at diagnosis in the simulation <2019_multiple_myeloma_risk_factor_exposures>` -- the specified constants for renal impairment and cytogenetic risk,
and GBD incidence population proportions for age and sex. We assume that data informing our survival curves is
representative of the Chinese population with multiple myeloma.
As in the US, these proportions are applied to all lines; they are at the time of diagnosis, which may cause some bias later in the disease course.

The sum of the HR distributions weighted by group size gives the survival curve baseline HR relative to the reference group, assuming the weights :math:`w_g` have been normalized to sum to 1:

.. math::

  ln(HR_\text{baseline:reference}) \sim \sum_{g \in groups}{w_g * N(\mu_g, \sigma_g^2)} \sim N(\mu_\text{baseline}, \sigma_\text{baseline}^2)

.. math::

  \mu_\text{baseline} = \sum_{g \in groups}{w_g * \mu_g}

.. math::

  \sigma_\text{baseline}^2 = \sum_{g \in groups}{w_g^2 * \sigma_g^2}

Finally, the HR of each group relative to the survival curve baseline is given by the ratio of its HR to the baseline HR:

.. math::

  HR_\text{g:baseline} \sim \frac{e^{N(\mu_g, \sigma_g^2)}}{e^{N(\mu_\text{baseline}, \sigma_\text{baseline}^2)}} \sim e^{N(\mu_g, \sigma_g^2) - N(\mu_\text{baseline}, \sigma_\text{baseline}^2)}  \sim e^{N(\mu_g - \mu_\text{baseline}, \sigma_g^2 + \sigma_\text{baseline}^2)}

Final risk effects for the United States
----------------------------------------

.. csv-table:: Final risk effects for simulation use in the United States
  :file: final_risk_effects_docs.csv
  :header-rows: 1

:download:`Final risk effects in CSV format <final_risk_effects.csv>`

Final risk effects for China
----------------------------

.. csv-table:: Final risk effects for simulation use in China
  :file: final_risk_effects_docs_china.csv
  :header-rows: 1

:download:`Final risk effects in CSV format <final_risk_effects_china.csv>`

Applying the risk effect
------------------------

Apply the hazard ratios above specific to the exposure value a simulant possesses for each risk factor to the baseline hazard rate to get the simulant's individual hazard rate separately for relapse and mortality, as shown in the equation below.

  for risk exposure(i) in under 70 at diagnosis/over 70 at diagnosis, male/female, high cytogenetic risk/standard cytogenetic risk, renal impaired/not renal impaired:

.. math::

  h_\text{simulant} = h_\text{baseline} * \prod HR_\text{risk exposure(i):baseline}

References
----------

.. [van_de_Donk_2018] 
    van de Donk NW, van der Holt B, Minnema MC, et al. Thalidomide before and after autologous stem cell transplantation in recently diagnosed multiple myeloma (HOVON-50): long-term results from the phase 3, randomised controlled trial. Lancet Haematol. 2018;5(10):e479-e492. doi:10.1016/S2352-3026(18)30149-2

.. [Ailawadhi_2018] 
    Ailawadhi S, Jacobus S, Sexton R, et al. Disease and outcome disparities in multiple myeloma: exploring the role of race/ethnicity in the Cooperative Group clinical trials. Blood Cancer J. 2018;8(7):67. doi:10.1038/s41408-018-0102-7

.. [Dimopoulos_2010]
    Dimopoulos MA, Christoulas D, Roussou M, et al. Lenalidomide and dexamethasone for the treatment of refractory/relapsed multiple myeloma: dosing of lenalidomide according to renal function and effect on renal impairment. Eur J Haematol. 2010;85(1):1-5. doi:10.1111/j.1600-0609.2010.01432.x 

.. [Mateos_2011] 
    Mateos MV, Gutiérrez NC, Martín-Ramos ML, et al. Outcome according to cytogenetic abnormalities and DNA ploidy in myeloma patients receiving short induction with weekly bortezomib followed by maintenance. Blood. 2011;118(17):4547-4553. doi:10.1182/blood-2011-04-345801
