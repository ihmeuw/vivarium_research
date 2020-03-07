.. _2017_cause_vitamin_a_deficiency:

====================
Vitamin A Deficiency
====================

Disease Description
-------------------

Vitamin A deficiency (VAD) is a lack of vitamin A in blood and tissues. Vitamin
A deficiency is considered as one of the most serious public health concerns in
developing countries and can contribute directly or indirectly to disability.[1]

GBD 2017 Modeling Strategy
------------------------------------

In Global Burden of Disease (GBD) 2017, VAD exposure definition is proportion of
the population with serum retinol concentration <0·7 μmol/L. The VAD cause is a population attributable fraction (PAF) of 1
cause with the VAD risk factor. That is, 100% of the VAD cases are attributable
to the VAD risk factor.
In this particular case, the PAF-of-1 relationship means that the VAD risk and the VAD cause are identical.
There is only one VAD model for GBD 2017 (not a separate cause model and risk model), and pulling exposure outputs for the VAD risk factor yields the same data as pulling prevalence outputs from the DisMod model for the VAD cause. [#]_ [GBD-2017-YLD-Appendix-VAD]_, [GBD-2017-Risk-Appendix-VAD]_

.. [#] Actually, there are numerical differences of up to about 30% between exposure and prevalence in a small fraction of the data points (~0.1% of values with a relative difference > 5%), but the VAD modeler assured us that these are probably just artifacts of the data processing and that the data sets are intended to be identical.

Vitamin A Deficiency Cause
+++++++++++++++++++++++++++++

The VAD in GBD 2017 that is 100% attributable to the
VAD risk factor. The VAD cause in GBD is a
YLD-only cause, meaning that it contributes to morbidity, but not mortality.

Modeling Strategy for the Vitamin A Deficiency Cause
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. todo::

  Describe cause in detail

Cause Hierarchy
^^^^^^^^^^^^^^^

.. image:: vitA_cause_hierarchy.svg

Health States and Sequela
^^^^^^^^^^^^^^^^^^^^^^^^^

The sequela associated with the Vitamin A deficiency cause in GBD 2017 include
moderate vision impairment loss due to Vitamin A deficiency, severe vision
impairment loss due to Vitamin A deficiency, blindness due to Vitamin A
deficiency, asymptomatic Vitamin A deficiency, Vitamin a deficiency with mild
anemia, Vitamin A deficiency with moderate anemia, Vitamin A deficiency with
severe anemia.


Restrictions
^^^^^^^^^^^^

.. list-table:: GBD 2017 Cause Restrictions
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
   * - YLL only
     - False
     -
   * - YLD only
     - True
     -
   * - YLD age group start
     - Early Neonatal
     - [0, 7 days), age_group_id = 2
   * - YLD age group end
     - 95 Plus
     - [95, 125 years), age_group_id = 235


Vitamin A Deficiency Risk Factor
++++++++++++++++++++++++++++++++

The Vitamin A deficiency risk factor in GBD 2017 is a **dichotomous variable** .
Below is a list of measures and corresponding IDs:

.. list-table:: Measures
  :widths: 20 45 40
  :header-rows: 1

  * - Measure
    - ID
    - Data source
  * - Remission
    - gbd_id = 2510, measure_id = 7
    - epi, use get_model_results function
  * - Incidence rate
    - gbd_id = cid(389)
    - como, use get_measure
  * - Risk factor exposure
    - gbd_id = reiid(96)
    - como, use get_measure

Risk Factor Hierarchy
^^^^^^^^^^^^^^^^^^^^^

.. image:: vitA_risk_hierarchy.svg

Restrictions
^^^^^^^^^^^^

.. list-table:: GBD 2017 Risk Restrictions
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     -
     -
   * - Female only
     -
     -
   * - YLL only
     -
     -
   * - YLD only
     -
     -
   * - YLL age group start
     - Post Neonatal
     - [28, 365 days), age_group_id = 4
   * - YLL age group end
     - 1-4 years
     - [1, 5 years), age_group_id = 5
   * - YLD age group start
     - Early Neonatal
     - [0, 7 days), age_group_id = 2
   * - YLD age group end
     - 95 Plus
     - [95, 125 years), age_group_id = 235


Relative Risks
^^^^^^^^^^^^^^

The causes affected by the Vitamin A Deficiency risk in GBD 2017 include
:ref:`lower respiratory infections <2017_cause_lower_respiratory_infections>`,
:ref:`diarrhoeal diseases <2017_cause_diarrhea>`, and :ref:`measles
<2017_cause_measles>`. The relative risks for these causes appear in Table 4 on
p. 112 of [GBD-2017-Risk-Appendix-VAD]_, copied here for reference:

.. _gbd_2017_vad_relative_risk_table:

.. list-table:: Pooled relative risks for risk-outcome pairs included in GBD 2017
  :widths: 15 13 15 15
  :header-rows: 1

  * - Cause
    - GBD 2016 RR
    - GBD 2017 RR
    - Include in GBD 2017
  * - Diarrhea
    - 1.6 (1.21 - 2.02)
    - **2.35 (2.17 - 2.54)**
    - Yes
  * - Measles
    - 2.4 (1.61 - 3.48)
    - **2.76 (2.01 - 3.78)**
    - Yes
  * - Lower Respiratory Infections (LRI)
    -
    - **1.23 (1.03 - 1.48)**
    - Yes
  * - Meningitis
    -
    - 3.2 (0.69 - 14.75)
    - No (not significant)
  * - Malaria
    -
    - 3.65 (2.23 - 5.97)
    - No (only one study)

The above relative risks for GBD 2017 should be interpreted as rate ratios for
the incidence rates of diarrhea, measles, and LRI.

Vivarium Modeling Strategy
--------------------------

We will use an **exposure model** (or **prevalence-only model** or **propensity
model**) for a vitamin A deficiency, in which each simulant is initialized with a "propensity" for vitamin A deficiency, and the simulant's vitamin A status is determined by comparing this
propensity to the overall VAD exposure/prevalence in the population.
Such
propensity/exposure models have been used in Vivarium for other risk factors and
risk-attributable causes, such as child stunting, :ref:`child wasting/PEM
<2017_cause_pem>`, and :ref:`iron deficiency anemia
<2017_cause_iron_deficiency>`.

In more detail, the basic strategy is to initialize each simulant with a
propensity score distributed uniformly in [0,1], then compare this propensity
score with the (location/age/sex/year/intervention-status)-dependent prevalence
of vitamin A deficiency at each time step to determine whether the simulant has
VAD during that time step. Each simulant's propensity is assigned only once, but
the underlying prevalence distribution can change throughout the course of the
simulation, which may result in a change in the simulant's vitamin A status.

In particular, our modeling strategy will **not** explicitly use incidence or
remission data for vitamin A deficiency, but only *prevalence* (which is the
same as the exposure data for the VAD risk factor). The rationale for this approach is twofold:

1.  We want to guarantee that the simulated baseline prevalence of vitamin A
    deficiency matches the prevalence data from GBD, which is likely more
    trustworthy than incidence and remission data.

2.  Relative risks from the literature about the effects of vitamin A
    supplementation or fortification on vitamin A status are best interpreted as
    risk ratios for prevalence of vitamin A deficiency. The exposure model
    provides a way to directly model these effect sizes in a way that preserves
    this interpretation.

.. todo::

  Verify that effect sizes on VAD should actually be interpreted as described
  above, and that the prevalence-only model is a good way to accurately
  represent these numbers.

  Explain why the prevalence-only model is a reasonable strategy, citing
  incidence, remission, and prevalence data, as well as expert opinions about
  VAD. (Perhaps this explanation should come later, e.g. in the Assumptions and
  Limitations section.)

Following is a more detailed description of how the exposure model for VAD
should work.

Determining Vitamin A Status
++++++++++++++++++++++++++++

At each time step, Vivarium needs to determine whether each simulant has vitamin
A deficiency. To do so, follow these steps:

1.  **Initialize:** When simulant :math:`i` enters the simulation (e.g. at the
    start of the simulation or at the time step when the simulant is born),
    assign the simulant a random number :math:`v_i \sim
    \operatorname{Uniform}([0,1])`, which we call the **VAD propensity score**
    for simulant :math:`i`.

2.  **Update:** On each time step :math:`t`:

    a)  If simulant :math:`i` survives, update any of simulant :math:`i`'s
        variables that determine which subpopulation the simulant belongs to.
        For example, they may move into the next age group, or they may begin
        receiving or stop receiving an intervention. Call this new subpopulation
        :math:`\text{subpop}(i,t)`.

    b)  Look up or compute the prevalence
        :math:`p_\text{VAD}(\text{subpop}(i,t))` of vitamin A deficiency for the
        simulant's updated subpopulation.

    c)  If :math:`v_i < p_\text{VAD}(\text{subpop}(i,t))`, the simulant has
        vitamin A deficiency on the next time step; otherwise, they don't.

To address a point of potential confusion in the above algorithm, note that a
*lower* propensity score :math:`v_i` corresponds to a *higher* propensity for
vitamin A deficiency. This is why we called :math:`v_i` the "propensity score"
rather than just the "propensity." We could additionally define the
**propensity** for VAD to be :math:`1-v_i`, but we don't actually need this
number.

Tracking Years Lived with Disability due to Vitamin A Deficiency
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

.. todo::

  Describe how to calculate YLDs from vitamin A deficiency, using the average
  disability weight over all sequelae.

Risk Effects
++++++++++++

.. todo::

  Describe how to apply the relative risks in :ref:`Risk Appendix Table 4
  <gbd_2017_vad_relative_risk_table>` to affect the incidence rates of measles,
  diarrhea, and LRI. To capture uncertainty, the RR's should be modeled with a
  lognormal distribution whose geometric mean (same as median) matches the
  central estimate and whose 2.5% and 97.5% percentiles match the upper and
  lower confidence bounds.

Scope
+++++

Assumptions and Limitations
+++++++++++++++++++++++++++

Cause Model Diagram
+++++++++++++++++++

State and Transition Data Tables
++++++++++++++++++++++++++++++++

.. todo::

  Create tables specifying exactly what data is needed for the model and where
  to get it.

Validation Criteria
+++++++++++++++++++

References
----------

1. Amy L. Rice, Keith P. West JR. and Robert E. Black. Comparative quantification of health risks. Chapter 4 Vitamin A deficiency.

.. [GBD-2017-YLD-Appendix-VAD]

   Pages 305-308 in `Supplementary appendix 1 to the GBD 2017 YLD Capstone <YLD
   appendix on ScienceDirect_>`_:

     **(GBD 2017 YLD Capstone)** GBD 2017 Disease and Injury Incidence and
     Prevalence Collaborators. Global, regional, and national incidence,
     prevalence, and years lived with disability for 354 diseases and injuries
     for 195 countries and territories, 1990–2017: a systematic analysis for the
     Global Burden of Disease Study 2017. :title:`Lancet` 2018; 392: 1789–858. DOI:
     https://doi.org/10.1016/S0140-6736(18)32279-7

.. _YLD appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322797-mmc1.pdf

.. [GBD-2017-Risk-Appendix-VAD]

	Pages 109-114 in `Supplementary appendix 1 to the GBD 2017 Risk Capstone <Risk
	appendix on ScienceDirect_>`_:

		**(GBD 2017 Risk Capstone)** GBD 2017 Risk Factor Collaborators. Global,
		regional, and national comparative risk assessment of 84 behavioural,
		environmental and occupational, and metabolic risks or clusters of risks for
		195 countries and territories, 1990–2017: a systematic analysis for the
		Global Burden of Disease Study 2017. :title:`The Lancet`. 8 Nov 2018; 392:
		1923-94. doi: http://dx.doi.org/10.1016/S0140-6736(18)32225-6.

.. _Risk appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322256-mmc1.pdf
