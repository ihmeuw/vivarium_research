.. _2019_risk_effect_diarrheal_diseases:

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

===============================
Diarrheal diseases risk effects
===============================

.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

The :ref:`diarrheal diseases cause model <2019_cause_diarrhea>` will impact the :ref:`dynamic child wasting exposure model <2020_risk_exposure_wasting_state_exposure>` incidence rates for the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>` as part of the "vicious cycle"/positive feedback model between child wasting and diarrheal diseases (note that diarrheal diseases is an :ref:`affected outcome of child wasting <2019_risk_effect_wasting>`).

.. todo::

   Include brief literature background

Vivarium Modeling Strategy
--------------------------

.. note::

   This section will describe the Vivarium modeling strategy for risk effects.
   For a description of Vivarium modeling strategy for risk exposure, see the
   :ref:`diarrheal diseases cause model document <2019_cause_diarrhea>`.

Wasting transition rates
+++++++++++++++++++++++++

Estimation of risk effects
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The relative risk for wasting transition rates between wasting exposure states by diarrheal disease status was estimated under the assumption of a steady state disease model and resulting system of equations that is :download:`described in this word document <Positive feedback model.docx>`.

The estimation of the prevalence ratios of wasting states by diarrheal disease status relied on evidence from [Troeger-et-al-2018]_ and `details on the calculation can be found here <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/wasting_transitions/alibow_vicious_cycle/diarrhea_and_wasting_prevalence_ratio_calculation_scaled_to_six_days.ipynb>`_. Notably, due to data availability of the WHZ scores, the prevalence ratios are estimated among the 2-5 year age group and it is assumed that they do not vary by age group (prevalence ratios are defined in this document in a table in the next section).

.. todo::

   Perform additional runs of this simulation to get uncertainty about the prevalence ratios

The system of equations relating to the steady state model were solved symbolically for `the state prevalence values here <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/wasting_transitions/alibow_vicious_cycle/symbolic_prevalence_equation_solver.ipynb>`_ and for `the incidence rates here <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/wasting_transitions/alibow_vicious_cycle/symbolic_incidence_equation_solver.ipynb>`_.

Using the resulting equations from the processes described above, the incidence rates specific to diarrheal disease status for each age/sex/year/location demographic group in the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>` model were estimated `in the notebook found here <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/wasting_transitions/alibow_vicious_cycle/vicious_cycle_effect_estimation.ipynb>`_ using GBD data. These incidence rates were then used to estimate age and sex specific relative risks for wasting state incidence rates, which are described below.

Calculation of risk effects
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The prevalence ratios used in the calculation of the risk effects are listed in the table below. The excess risk in these ratios (PR - 1) represents the portion of the population afflicted with diarrheal diseases that occupies that wasting state as a result of the diarrheal disease episode. In other words, the PR represents the multiplicative likelihood that an individual will occupy a specific child wasting category if they experienced a diarrheal diasease epidsode relative to if they had not experienced a diarrheal disease episode.

.. list-table:: Prevalence ratio values
  :header-rows: 1

  * - Parameter
    - Population
    - Value
    - Note
  * - PR_1
    - Males and females 0.5-5 years
    - 1.095396
    - Wasting cat1 (SAM)
  * - PR_2
    - Males and females 0.5-5 years
    - 1.085606
    - Wasting cat2 (MAM)
  * - PR_3
    - Males and females 0.5-5 years
    - 1.051678
    - Wasting cat3 (mild child wasting)
  * - PR_4
    - Males and females 0.5-5 years
    - 0.988263
    - Wasting cat4 (susceptible to child wasting)

.. todo::

   Incorporate uncertainty into prevalence ratio values

**The following parameters should be age/sex/location-specific:**

.. list-table:: Additional input parameter definitions
   :header-rows: 1

   *  - Parameter
      - Description
      - Value
      - Note
   *  - exposure_wasting_cat{1, 2, 3, 4}
      - category-specific child wasting exposure
      - defined on the :ref:`child wasting exposure page <2020_risk_exposure_wasting_state_exposure>`
      - 
   *  - prevalence_diarrheal_diseases
      - incidence_rate_c302 * duration_c302 / 365
      - incidence_rate_c302 and duration_c302 are defined on the :ref:`diarrheal diseases cause model document <2019_cause_diarrhea>`
      - 
   *  - remission_diarrheal_diseases
      - *total population* diarrheal diseases remission rate
      - 1 / (duration_c302 / 365) * prevalence_diarrheal_diseases
      - Note that this is scaled to total population person time as the denominator (not infected population person time as it is for the I to S transition in the :ref:`diarrheal diseases cause model document <2019_cause_diarrhea>`)
   *  - incidence_diarrheal_diseases
      - *total population* diarrheal diseases incidence rate
      - incidence_rate_c302 (defined on the :ref:`diarrheal diseases cause model document <2019_cause_diarrhea>`)
      - Note that this is scaled to total population person time as the denominator as it is from GBD (not suspectible poulation person time as it is for the transition from I to S in the :ref:`diarrheal diseases cause model document <2019_cause_diarrhea>`)
   *  - csmr_{diarrheal_diseases, pem, lri, measles}
      - cause-specific mortality rate 
      - Defined for respective causes on the :ref:`diarrheal diseases <2019_cause_diarrhea>`, :ref:`protein energy malnutrition <2020_risk_exposure_wasting_state_exposure>`, :ref:`lower respiratory infections <2019_cause_lower_respiratory_infections>`, and :ref:`measles <2019_cause_measles>` documents
      - 
   *  - emr_{diarrheal_diseases, pem}
      - cause-specific excess mortality rate
      - Defined for respective causes on the :ref:`diarrheal diseases <2019_cause_diarrhea>` and :ref:`protein energy malnutrition <2020_risk_exposure_wasting_state_exposure>` documents
      - 
   *  - paf_wasting_{diarrheal_diseases, lri ,measles}
      - PAF of child wasting on affected causes
      - As described on the :ref:`child wasting exposure page <2020_risk_exposure_wasting_state_exposure>`
      - Currently custom calculated, but may update to GBD PAFs following finalization of GBD 2020
   *  - RR_wasting_{diarrheal_diseases, lri, measles}_{cat1, cat2, cat3}
      - Wasting category-specific relative risks for cause-specific affected outcomes
      - As described on the :ref:`child wasting exposure page <2020_risk_exposure_wasting_state_exposure>`
      - 
   *  - ACMR
      - All-cause mortality rate
      - All-cause mortality rate for a given age/sex/location/year group from GBD
      -

The following code block provides equations to solve for the relative risks attributable to diarrheal disease infection for each of the wasting state incidence rates according to the prevalence ratio values defined above and artifact data. For reference, the tables below outline the notation of the intermediate variables included in the equations.

.. list-table:: Intermediate variable notation: states
   :header-rows: 1

   *  - Parmeter
      - Notation
      - Note
   *  - Susceptible to diarrheal diseases
      - S{wasting state}
      - 
   *  - Infected with diarrheal diseases
      - D{wasting state}
      - 
   *  - Wasting TMREL (cat4)
      - {diarrheal status}4
      - 
   *  - Mild wasting (cat3)
      - {diarrheal status}3
      - 
   *  - Moderate wasting/MAM (cat2)
      - {diarrheal status}2
      - 
   *  - Severe wasting/SAM (cat1)
      - {diarrheal status}1
      - 

.. note::

   All transition rates are defined in terms of the count of transitions per person-time unit in the entire model system (**not** specific to person-time in the source state).

.. list-table:: Intermediate variable notation: transitions
   :header-rows: 1

   *  - Parmeter
      - Definition
      - Notation
      - Note
   *  - Mortality rate
      - Deaths from source state per total population person time
      - m_{source state}
      - 
   *  - Birth rate
      - Rate of aging into source state per total population person time
      - b_{sink state}
      - "Reincarnation" or "aging into" states to keep population size stable
   *  - Diarrheal disease incidence rate
      - Incident diarrheal disease cases from a given wasting category per total population person time
      - di_{wasting state}
      - Note that wasting does not affect diarrheal disease incidence rates (it affects excess mortality rates instead)
   *  - Diarrheal disease remission rate
      - Remitted diarrheal disease cases from a given wasting category per total population person time
      - dr_{wasting state}
      - 
   *  - Wasting incidence 
      - Cases that transition to a more severe wasting state per total population person time
      - i_{sink state}
      - Note that diarrheal disease status does not change upon this transition
   *  - Wasting remission
      - Cases that transition to a more severe wasting state per total population person time
      - r_{source state}
      - Transitions out of wasting cat1 are dependent of wasting treatment coverage (treated: r_S1tx and r_D1tx, untreated: r_S1ux and r_D1ux). Note that diarrheal disease status does not change upon this transition

.. code-block:: python

   p_D1 = (PR_1 * exposure_wasting_cat1 * prevalence_diarrheal_diseases) / (PR_1 * prevalence_diarrheal_diseases - prevalence_diarrheal_diseases + 1)
   p_D2 = (PR_2 * exposure_wasting_cat2 * prevalence_diarrheal_diseases) / (PR_2 * prevalence_diarrheal_diseases - prevalence_diarrheal_diseases + 1)
   p_D3 = (PR_3 * exposure_wasting_cat3 * prevalence_diarrheal_diseases) / (PR_3 * prevalence_diarrheal_diseases - prevalence_diarrheal_diseases + 1)
   p_S1 = (-exposure_wasting_cat1 * prevalence_diarrheal_diseases + exposure_wasting_cat1) / (PR_1 * prevalence_diarrheal_diseases - prevalence_diarrheal_diseases + 1)
   p_S2 = (-exposure_wasting_cat2 * prevalence_diarrheal_diseases + exposure_wasting_cat2) / (PR_2 * prevalence_diarrheal_diseases - prevalence_diarrheal_diseases + 1)
   p_S3 = (-exposure_wasting_cat3 * prevalence_diarrheal_diseases + exposure_wasting_cat3) / (PR_3 * prevalence_diarrheal_diseases - prevalence_diarrheal_diseases + 1)
   p_D4 = prevalence_diarrheal_diseases - p_D1 - p_D2 - p_D3
   p_S4 = (1 - prevalence_diarrheal_diseases) - p_S1 - p_S2 - p_S3
   m_D1 = (ACMR - csmr_diarrheal_diseases + emr_diarrheal_diseases * (1 - paf_wasting_diarrheal_diseases) * RR_wasting_diarrheal_diseases_cat1
           - csmr_pem + emr_pem
           - csmr_lri + csmr_lri * (1 - paf_wasting_lri) * RR_wasting_lri_cat1
           - csmr_measles + csmr_measles * (1 - paf_wasting_measles) * RR_wasting_measles_cat1) * p_D1
   m_D2 = (ACMR - csmr_diarrheal_diseases + emr_diarrheal_diseases * (1 - paf_wasting_diarrheal_diseases) * RR_wasting_diarrheal_diseases_cat2
           - csmr_pem + emr_pem
           - csmr_lri + csmr_lri * (1 - paf_wasting_lri) * RR_wasting_lri_cat2
           - csmr_measles + csmr_measles * (1 - paf_wasting_measles) * RR_wasting_measles_cat2) * p_D2
   m_D3 = (ACMR - csmr_diarrheal_diseases + emr_diarrheal_diseases * (1 - paf_wasting_diarrheal_diseases) * RR_wasting_diarrheal_diseases_cat3
           - csmr_pem
           - csmr_lri + csmr_lri * (1 - paf_wasting_lri) * RR_wasting_lri_cat3
           - csmr_measles + csmr_measles * (1 - paf_wasting_measles) * RR_wasting_measles_cat3) * p_D3
   di_1 = (incidence_diarrheal_diseases * p_S1/(1-prevalence_diarrheal_diseases))
   di_2 = (incidence_diarrheal_diseases * p_S2/(1-prevalence_diarrheal_diseases))
   di_3 = (incidence_diarrheal_diseases * p_S3/(1-prevalence_diarrheal_diseases))
   di_4 = (incidence_diarrheal_diseases * p_S4/(1-prevalence_diarrheal_diseases))
   dr_1 = remission_diarrheal_diseases  * p_D1 # note these are not divided by prevalence_diarrheal_diseases because remission_diarrheal_diseases{total_pop} = remission_diarrheal_diseases * prevalence_diarrheal_diseases
   dr_2 = remission_diarrheal_diseases  * p_D2 
   dr_3 = remission_diarrheal_diseases  * p_D3
   dr_4 = remission_diarrheal_diseases  * p_D4
   b_D1 = ACMR * p_D1
   b_D2 = ACMR * p_D2
   b_D3 = ACMR * p_D3
   r_D1tx = t1 * p_D1 
   r_D1ux = r2 * p_D1
   r_D2 = r3 * p_D2
   r_D3 = r4 * p_D3
   i_S1 = b_D1 + di_1 - dr_1 + i1*exposure_wasting_cat2 - m_D1 - r_D1tx - r_D1ux
   i_S2 = b_D1 + b_D2 + 2.0*di_1 - dr_1 - dr_2 + i2*exposure_wasting_cat3 - m_D1 - m_D2 - r_D1tx - r_D2
   i_S3 = b_D1 + b_D2 + b_D3 + 2.0*di_1 + di_3 - dr_1 - dr_2 - dr_3 + i3*exposure_wasting_cat4 - m_D1 - m_D2 - m_D3 - r_D3
   i_D1 = -b_D1 - di_1 + dr_1 + m_D1 + r_D1tx + r_D1ux
   i_D2 = -b_D1 - b_D2 - 2.0*di_1 + dr_1 + dr_2 + m_D1 + m_D2 + r_D1tx + r_D2
   i_D3 = -b_D1 - b_D2 - b_D3 - 2.0*di_1 - di_3 + dr_1 + dr_2 + dr_3 + m_D1 + m_D2 + m_D3 + r_D3

   RR_i3 = (i_D3 * p_S4) / (i_S3 * p_D4)
   RR_i2 = (i_D2 * p_S3) / (i_S2 * p_D3)
   RR_i1 = (i_D1 * p_S2) / (i_S1 * p_D2)

Application of risk effects
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The age- and sex-specific values for RR_{i3, i2, i1} calculated as described above should be applied in the following manner:

   For :math:`x` in :math:`[1,2,3]:`

.. math::

   PAF_\text{i{x}} = \frac{\text{RR_i{x}} * \text{prevalence_diarrheal_diseases} + (1 - \text{prevalence_diarrheal_diseases}) - 1}{\text{RR_i{x}} * \text{prevalence_diarrheal_diseases} + (1 - \text{prevalence_diarrheal_diseases})}

.. math::

   \text{i{x}}_i = \text{i{x}} * (1 - PAF) * \text{RR_i{x}}_i

.. note::

   We assume that the prevalence of diarrheal diseases does not vary by wasting state for the calculation of this custom PAF. The application of the risk effect of child wasting to the diarrheal diseases excess mortality rate rather than incidence rate avoids bias in this assumption. However, this assumption ignores the impact of diarrheal diseases on wasting transition rates. Therefore, we will slightly overestimate the PAF of i3 and underestimate the PAF of i2 and i1. This will result in slight overestimation of the i3 incidence rates and underestimation of i2 and i1 incidence rates. However, the magnitude of this bias is expected to be small given the small magnitude of effect of diarrheal diseases on child wasting.

Validation and Verification Criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Verification and validation criteria from the :ref:`diarrheal diseases cause model <2019_cause_diarrhea>` should remain true.
#. Verification and validation criteria from the :ref:`dynamic child wasting exposure model <2020_risk_exposure_wasting_state_exposure>` should remain true.

.. todo::

   List additional V&V criteria

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. We assume that the GBD 2019 relative risks of child wasting on mortality due to diarrheal diseases applies entirely to the excess mortality rate rather than the incidence rate. There is evidence of increased diarrheal disease severity by child nutritional status that supports this assumption [TODO: include citations]. However, there is also evidence that child nutritional status impacts the incidence of diarrheal diseases [TODO: include citations].

#. We assume that the evidence from [Troeger-et-al-2018]_ represents a causal impact of diarrheal diseases on child wasting. If this is not the case, we are overestimating the prevalence ratios.

#. We scale the effect size from [Troeger-et-al-2018]_ to an average duration of diarrheal diseases episode of 6 days as implied from the GBD remission rate. However, given that child wasting is associated with increased diarrheal disease severity, this may be an overlysimplistic assumption (with the effect size conditional on baseline wasting status).

#. We assume that the prevalence ratios of wasting states by diarrheal disease status do not vary by age group.

#. We assume that diarrheal disease status does not affect the remission rate of child wasting. However, there is evidence that this may be the case [TODO: include citation]

.. todo::  

   Add complexity to this model so that child wasting remission rates are included as an additional risk effect of diarrheal diseases

.. todo::

   List additional assumptions and limitations

References
----------

.. [Troeger-et-al-2018]
   Troeger C, Colombara DV, Rao PC, Khalil IA, Brown A, Brewer TG, Guerrant RL, Houpt ER, Kotloff KL, Misra K, Petri WA Jr, Platts-Mills J, Riddle MS, Swartz SJ, Forouzanfar MH, Reiner RC Jr, Hay SI, Mokdad AH. Global disability-adjusted life-year estimates of long-term health burden and undernutrition attributable to diarrhoeal diseases in children younger than 5 years. Lancet Glob Health. 2018 Mar;6(3):e255-e269. doi: 10.1016/S2214-109X(18)30045-7. PMID: 29433665; PMCID: PMC5861379. `Troeger et al 2018 available here <https://pubmed.ncbi.nlm.nih.gov/29433665/>`_