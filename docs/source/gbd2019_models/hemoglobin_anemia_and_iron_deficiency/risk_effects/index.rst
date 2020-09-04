.. _2019_risk_effect_iron_deficiency:

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

============================
Iron Deficiency Risk Effects
============================

.. contents::
   :local:
   :depth: 2

GBD 2019 Modeling Strategy
--------------------------

Iron deficiency in the GBD risk factors is defined as **inadequate iron to meet the body's needs** and is quantified in terms of mean hemoglobin concentration at the population level from the cumulative effect of all causes that lead to iron deficiency, including dietary iron deficiency (GBD *cause* of inadequate intake of elemental iron) as well as other causes that manifest as iron deficiency (eg, maternal hemorrhage, uterine fibroids, menstrual disorders, hookworm, schistosomiasis, gastritis and duodenitis, inflammatory bowel disease, etc.). The iron deficiency risk exposure is defined as a **continuous distribution of hemoglobin concentrations in g/L** and is a risk factor for maternal disorders and has a risk-attributable cause of dietary iron deficiency.

.. image:: iron_risk_hierarchy.svg

.. list-table:: Affected Entities
   :widths: 5 5 5 5 5
   :header-rows: 1

   * - Outcome
     - Outcome type
     - Outcome ID
     - Affected measure
     - Note
   * - Maternal disorders
     - Cause
     - 366
     - YLDs/YLLs
     - Maternal disorders is not a most-detailed cause; the iron deficiency risk factor affects each of the most-detailed causes in the maternal disorders cause group equally
   * - Dietary iron deficiency
     - Cause
     - 390
     - Prevalence
     - PAF-of-1 relationship

Maternal Disorders
++++++++++++++++++

The GBD 2019 Risk-Outcome pair relationship between iron deficiency and maternal disorders relies on the association between hemoglobin concentration and maternal mortality from the literature, specifically the CHERG iron report.

.. todo::

  Cite the CHERG iron report, GBD 2019 methods appendix

.. note::

  According to a correspondence with Chris Murray, there is contraversy surrounding the inclusion of this risk-outcome pair in GBD because there is evidence supporting an association between iron supplementation and hemoglobin increases as well as evidence supporting an association between hemoglobin increases and maternal mortality, but no/little evidence to support an association between iron supplementation and maternal mortality directly.

Notably, the *same* relative risks for this risk-outcome pair apply to both YLDs and YLLs and are constant for each age-group and each most-detailed cause within the maternal disorders cause heirarchy; assuming that changes in hemoglobin concentration affect each of the maternal disorders equally and also affect morbidity and mortality equally.

  A limitation of this approach is that if changes in hemoglobin concentration affect a maternal disorder with a higher disability weight more or less than a maternal disorder with a lower disability weight, then our estimation of change in maternal disorder YLDs due to a change in hemoglobin concentration will be biased. 

.. todo::

  Include fiugre for cause hierarychy of maternal disorders

The relative risks used for this risk outcome pair are scaled to units of hemoglobin concentration in g/dL. Because the iron deficiency exposure (and mean population hemoglobin concentration) in GBD 2019 are defined in g/L, the units will need to be converted.

The PAF for this risk outcome pair is computed using the :code-block:`cont_paf_nocap` function found `here <https://stash.ihme.washington.edu/projects/RF/repos/paf/browse/math.R#9-10,30>`_, with the following parameter values:

.. code-block:: Python
  
  lower = 0
  upper = 5_000
  rr_scalar = 10
  dist = 'normal'
  inv_exp = 1

.. note::

  According to a correspondence with Nick Kassebaum, a normal distribution is assumed for the PAF calculation in this risk outcome pair, although a potential methodological improvement for GBD 2020 will be to assume the ensemble distribution used in the hemoglobin model instead.

The GBD 2019 Population Attributable Fractions for maternal disorders rely on the iron deficiency exposure and TMREL as estimated in the *Global TMREL exposure estimation* approach outlined in the :ref:`Iron Deficiency Risk Exposure page <2019_risk_exposure_iron_deficiency>`. However, according to a correspondence with Nick Kassebaum, the *Location-specific TMREL exposure estimation approach* is more conceptually/clinically correct, although the results are expected to be similar.

Additionally, the GBD 2019 Population Attributable Fraction calculation for this risk outcome pair uses the iron deficiency exposure mean and standard deviation values for the *general* population. However, because maternal disorders are specific to the *pregnant/lactating* population, it may be desired to use the exposure mean and standard devaition values specific to the *pregnant/lactating* population (with pregnancy adjustment factors described in the :ref:`Hemoglobin Model Documentation Page <2019_hemoglobin_model>` applied). This methodological change will result in a *greater* PAF than the two possible methods described above.

Alternative Approach
^^^^^^^^^^^^^^^^^^^^^^

Because the relative risks for maternal mortality are defined in terms of hemoglobin concentration rather than iron deficiency specifically, if the effect size of an intervention is measured in terms of hemoglobin concentration, the relative risks may be applied directly to the maternal disorders burden rather than through the typical approach of calculating the "risk-deleted" burden and then multiplying by the mean relative risk. This alternative approach will avoid confusion regarding the differing definitions of the iron deficiency risk exposure, TMREL, and PAF for maternal disorders.

Chris Murray and Theo Vos suggested that this approach be used for estimating the impact of interventions that act on hemoglobin concentration on maternal disorders.

Notably, this alternative approach was found to estimate similar (but slightly greater) intervention impact to the standard approach using the location-specific TMREL exposure estimation approach specific and exposure parameters specific to the pregnant and lactating population.

.. todo::

  Cite the maternal anemia project repo here.

Dietary Iron Deficiency
+++++++++++++++++++++++

The dietary iron deficiency cause in GBD 2019 has a population attributable fraction of 100% with the iron deficiency risk factor. This risk-outcome relationship is not described in full in this document page.

When choosing to model dietary iron deficiency, consideration should be paid to the other causes of iron deficiency (iron responsive anemias), described on the :ref:`Anemia Impairment Documentation Page <2019_anemia_impairment>`.

Vivarium Modeling Strategy
--------------------------

Maternal Disorders
++++++++++++++++++++

The recommended approach for modeling the relationship between hemoglobin and maternal disorders is described in the `Alternative Approach`_ section in this document. Therefore, there is no need to use the PAF in order to apply the relative risks.

Instead, the relative risks should be applied to both the YLD (or incidence) and YLL (CSMR or EMR) rate for maternal disorders (or a specific modeled individual maternal disorder), such that:

if :math:`Hgb_i >= Hgb_\text{GBD}:`

.. math:: 

    rate_i = rate_\text{GBD} * 1 / e^{\text{ln(RR)} * (Hgb_i - Hgb_\text{GBD})}

if :math:`Hgb_i < Hgb_\text{GBD}:`

.. math::

  rate_i = rate_\text{GBD} * e^{\text{ln(RR)} * (Hgb_\text{GBD} - Hgb_i)}

Where, 

.. list-table:: Parameter Definitions
   :widths: 5 5 5
   :header-rows: 1

   * - Parameter
     - Definition
     - Note
   * - :math:`Hgb_i`
     - Hemoglobin value for an individual pregnant simulant in g/dL
     - Needs unit conversion! (Exposure typically defined in g/L)
   * - :math:`Hgb_\text{GBD}`
     - Mean hemoglobin value among the pregnant/lactating population from GBD in g/dL
     - Needs unit conversion! (Exposure typically defined in g/L)
   * - :math:`rate_i`
     - Rate for an individual simulant
     - Rate can be incidence, EMR, CSMR, etc.
   * - :math:`rate_\text{GBD}`
     - Rate from GBD 
     - Rate can be incidence, EMR, CSMR; consider whether this should be among total population or pregnant population in maternal disorders cause document
   * - :math:`RR`
     - Relative risks for iron deficiency and maternal disorders
     - Should be constant for all age-groups and causes within maternal disorders group, can choose any

.. list-table:: Relative Risks
   :widths: 5 5 5
   :header-rows: 1

   * - Exposure
     - Relative Risk
     - Note
   * - Per unit deficit of hemoglobin (g/dL)
     - 1.252472 (0.920269, 0.701621)
     - Note unit change (exposure is typically in g/L)

Validation and Verification Criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Parameters that should be tracked for verification and validation include:

- Simulant pregnancy status (stratification preferred)
- Simulant hemoglobin concentration
- Simulant maternal disorder state

Simulants with higher hemoglobin concentrations should have lower maternal disorder rates (the specific difference in maternal disorder rates can be quanified for simulants with known hemoglobin concentrations).

If intervention causes increase in hemoglobin, the intervention scenario rate of maternal disorders should be lower than the baseline rate of maternal disorders.

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Notably, anemia is a sequela of the maternal disorder, maternal hemorrhage. Therefore, if a simulation model of an intervention that affects hemoglobin concentration evaluates both the impact on burden due to maternal disorders and the impact of YLDs due to anemia, it is possible that the impact on YLDs for anemia due to maternal hemorrhage will be double counted. This is likely a relative small portion of DALYs, but should be investigated and considered prior to implementation.

Bias in the Population Attributable Fraction
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::

  This section is not applicable because this modelling strategy does not depend on PAFs.

References
----------

.. todo::

  Update references to GBD 2019 once published

.. todo::

  Update the GBD 2017 Risk Factor Methods appendix citation to be unique to your risk effects page (replace 'Risk-Effects-Model-Template' with '{Risk Name}-Effects')

  Update the appropriate page numbers in the GBD risk factors methods appendix below

  Add additional references as necessary 

.. [GBD-2017-Risk-Factors-Appendix-Risk-Effects-Model-Template]

   Pages ???-??? in `Supplementary appendix 1 to the GBD 2017 Risk Factors Capstone <risk_factors_methods_appendix_>`_:

     **(GBD 2017 Risk Factors Capstone)** GBD 2017 Risk Factor Collaborators. :title:`Global, regional, and national comparative risk assessment of 84 behavioural, environmental and occupational, and metabolic risks or clusters of risks for 195 countries and territories, 1990–2017: a systematic analysis for the Global Burden of Disease Study 2017`. Lancet 2018; 392: 1923-1994. DOI:
     https://doi.org/10.1016/S0140-6736(18)32225-6

.. _risk_factors_methods_appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32225-6/attachment/be595013-2d8b-4552-86e3-6c622827d2e9/mmc1.pdf