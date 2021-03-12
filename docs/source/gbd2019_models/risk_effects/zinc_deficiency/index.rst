.. _2019_risk_effect_zinc_deficiency:

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
Zinc Deficiency Risk Effects
============================

.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

.. todo::

	Provide a brief description of the risk, including potential opportunities for confounding (factors that may cause or be associated with the risk exposure), effect modification/generalizability, etc. by any relevant variables. Note that literature reviews and speaking with the GBD risk modeler will be good resources for this.

GBD 2019 Modeling Strategy
--------------------------

.. note::

	This section will describe the GBD modeling strategy for risk effects. For a description of GBD modeling strategy for risk exposure, see the :ref:`risk exposure <2019_risk_exposure_zinc_deficiency>` page.

.. todo::

	Provide a brief overview of how the risk affects different outcomes, including data sources used by GBD, GBD assumptions, etc. Note that the [GBD-2019-Risk-Factors-Appendix-Risk-Effects-Model-Template]_ is a good source for this information in addition to the GBD risk modeler.

.. list-table:: Affected Entities
   :widths: 5 5 5 5 5
   :header-rows: 1

   * - Outcome
     - Outcome type
     - Outcome ID
     - Affected measure
     - Note
   * - Diarrheal diseases
     - Cause
     - 302
     - Morbidity and mortality (GBD YLDs and YLLs)
     - Relative risks updated from GBD 2017

.. note:: 

  LRI was included as an affected entity in GBD 2017, but was excluded as an affected entity in GBD 2019 after re-analyzing the meta-analysis using MR-BRT. The relative risk for diarrheal diseases from 2017 was updated in this reanalysis as well.

Vivarium Modeling Strategy
--------------------------

.. note::

	This section will describe the Vivarium modeling strategy for risk effects. For a description of Vivarium modeling strategy for risk exposure, see the :ref:`risk exposure <2019_risk_exposure_page_link>` page.

.. list-table:: Risk Outcome Relationships for Vivarium
   :widths: 5 5 5 5 5
   :header-rows: 1

   * - Outcome
     - Outcome type
     - Outcome ID
     - Affected measure
     - Note
   * - Diarrheal diseases
     - Cause
     - 302
     - Incidence rate
     - 

Diarrheal diseases incidence rate
+++++++++++++++++++++++++++++++++

Information on the diarrheal diseases cause model can be found on the :ref:`2017 Diarrheal Diseases Cause Model Document <2017_cause_diarrhea>`. 

.. note::

  The cause model document linked above is for the 2017 cause model document. This should be updated to the GBD 2019 cause model document when it is created.

The zinc deficiency risk factor affects both the likelihood of morbidity and mortality from diarrheal diseases. We will model this in Vivarium such that exposure to zinc deficiency will impact the incidence rate of diarrheal diseases while the excess mortality rate will be unaffected.

.. list-table:: GBD 2019 Risk Outcome Pair Restrictions
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     - False
     -
   * - Female only
     - False
     -
   * - Age group start
     - 5
     - 1-4 years 
   * - Age group end
     - 5
     - 1-4 years

Therefore, the diarrheal diseases incidence rate for a given simulant should be modeled as follows:

.. math::

  incidence_i = incidence_\text{c302} * (1 - PAF_\text{r97,c302}) * RR_\text{r97,c302}(i)

Where,

.. list-table:: Parameter Definitions
   :header-rows: 1

   * - Parameter
     - Definition
     - Value
     - Note
   * - :math:`incidence_i`
     - Diarrheal disease incidence rate for a given simulant
     - See equation above
     - 
   * - :math:`incidence_\text{c302}`
     - Diarrheal diseases incidence rate for a given age-/sex-/year-/location-specific demographic group
     - Defined in the :ref:`2017 Diarrheal Diseases Cause Model Document <2017_cause_diarrhea>`
     - 
   * - :math:`PAF_\text{r97,c302}`
     - PAF for the zinc deficiency and diarrheal diseases risk outcome pair for a given age-/sex-/year-/location-specific demographic group
     - GBD 2019: see code snippet below
     - 
   * - :math:`RR_\text{r97,c302}(i)`
     - Relative risk of diarrheal disease incidence for a given simulant based on their zinc exposure value
     - GBD 2019: see code snippet below
     - 

PAFs and relative risks can be pulled from GBD using the code below (be sure to additionally specify desired sex, age_group, and location IDs).

.. code:: 

  rrs = get_draws(gbd_id_type='rei_id', 
            gbd_id=97,
            source='rr',
            year_id=2019,
            gbd_round_id=6,
            status='best',
            decomp_step='step4')

  pafs = get_draws(
            gbd_id_type=['rei_id', 'cause_id'], 
            gbd_id=[97, 302],
            source='burdenator',
            measure_id=2, #dalys
            metric_id=2, #percent
            year_id=2019,
            gbd_round_id=6,
            status='best',
            decomp_step='step5')

.. note::

  In GBD 2019, the stored PAF for deaths and YLLs is slightly greater than the stored PAF for DALYs and YLDs. According to the GBD modeler, this is likely because of processing from the burdenator, and provided confirmation that the relative risks for zinc deficiency should apply equally to both YLDs and YLLs.

.. list-table:: Relative Risks
   :widths: 5 5 5
   :header-rows: 1

   * - Exposure Category
     - Relative Risk
     - Note
   * - cat1 (zinc deficient)
     - 1.14 (1.07, 1.21)
     - Specific to 1-4 year olds, does not vary by sex 
   * - cat2 (not zinc deficient)
     - 1
     - TMREL

Validation and Verification Criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. todo::

  List validation and verification criteria, including a list of variables that will need to be tracked and reported in the Vivarium simulation to ensure that the risk outcome relationship is modeled correctly

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. todo::

	List assumptions and limitations of this modeling strategy, including any potential issues regarding confounding, mediation, effect modification, and/or generalizability with the risk-outcome pair.

Bias in the Population Attributable Fraction
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As noted in the `Population Attributable Fraction` section of the :ref:`Modeling Risk Factors <models_risk_factors>` document, using a relative risk adjusted for confounding to compute a population attributable fraction at the population level will introduce bias.

.. todo::

	Outline the potential direction and magnitude of the potential PAF bias in GBD based on what is understood about the relationship of confounding between the risk and outcome pair using the framework discussed in the `Population Attributable Fraction` section of the :ref:`Modeling Risk Factors <models_risk_factors>` document.

References
----------

.. [GBD-2019-Risk-Factors-Appendix-Zinc-Deficiency-Risk-Effects]

   Pages 184-185 in `Supplementary appendix 1 to the GBD 2019 Risk Factors Capstone <risk_factors_methods_appendix_>`_:

     **(GBD 2019 Risk Factors Capstone)** GBD 2019 Risk Factor Collaborators. :title:`Global burden of 87 risk factors in 204 countries and territories, 1990–2019: a systematic analysis for the Global Burden of Disease Study 2019`. Lancet 2020; 396: 1223-1249. DOI:
     https://doi.org/10.1016/S0140-6736(20)30752-2

.. _risk_factors_methods_appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30752-2/attachment/54711c7c-216e-485e-9943-8c6e25648e1e/mmc1.pdf
