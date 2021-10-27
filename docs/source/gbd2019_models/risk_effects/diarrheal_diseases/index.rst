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

===========================
Diarrheal diseases
===========================

.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

The :ref:`diarrheal diseases cause model <2019_cause_diarrhea>` will impact the :ref:`dynamic child wasting exposure model <2020_risk_exposure_wasting_state_exposure>` incidence rates for the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>` as part of the "vicious cycle"/positive feedback model between child wasting and diarrheal diseases (note that diarrheal diseases is a risk effect of child wasting).

.. todo::

   Develop and link risk effects page for child wasting once developed

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

Application of risk effects
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The prevalence ratios used in the calculation of the risk effects are listed in the table below.

.. list-table:: Prevalence ratio values
  :header-rows: 1

  * - Parameter
    - Population
    - Value
    - Note
  * - PR_1
    - Males and females 0.5-5 years
    - 1.095396
    - 
  * - PR_2
    - Males and females 0.5-5 years
    - 1.085606
    - 
  * - PR_3
    - Males and females 0.5-5 years
    - 1.051678
    - 
  * - PR_4
    - Males and females 0.5-5 years
    - 0.988263
    - 

.. todo::

   Incorporate uncertainty into prevalence ratio values

The following code block provides equations to solve for the relative risks attributable to diarrheal disease infection for each of the wasting state incidence rates according to the prevalence ratio values defined above and artifact data.

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
   dr_1 = remission_diarrheal_diseases / prevalence_diarrheal_diseases * p_D1
   dr_2 = remission_diarrheal_diseases / prevalence_diarrheal_diseases * p_D2
   dr_3 = remission_diarrheal_diseases / prevalence_diarrheal_diseases * p_D3
   dr_4 = remission_diarrheal_diseases / prevalence_diarrheal_diseases * p_D4
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

   RR_wasting_i3 = (i_D3 * p_S4) / (i_S3 * p_D4)
   RR_wasting_i2 = (i_D2 * p_S3) / (i_S2 * p_D3)
   RR_wasting_i1 = (i_D1 * p_S2) / (i_S1 * p_D2)

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