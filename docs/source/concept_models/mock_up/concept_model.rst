.. role:: underline
    :class: underline

..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  +++++++++++++++++++++

  Section Level 2 (#.#)
  ---------------------

  Section Level 3 (#.#.#)
  ~~~~~~~~~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.


.. _sam_mock_up:

===================================
Vivarium Acute Malnutrition MOCK-UP
===================================

.. contents::
  :local:

1.0 Project overview
++++++++++++++++++++

This document is intented to serve as a mock-up for how to communicate custom parameterization of draws within a concept model document.

2.0 Simulation design
+++++++++++++++++++++++++++++

2.1 Default specifications
---------------------------

.. list-table:: Default simulation specifications
  :header-rows: 1

  * - Parameter
    - Value
    - Note
  * - Location(s)
    - Ethiopia (ID: 179)
    - 
  * - Number of draws
    - 1
    - 
  * - Population size per draw
    - 100,000
    - Needs to be refined based on test runs
  * - Age start
    - Six months
    - Change from :ref:`phase I <2019_concept_model_vivarium_ciff_sam>`
  * - Age end
    - 5 years
    - 
  * - Exit age
    - 5 years
    - 
  * - Simulation start date
    - 2021-07-01
    - 
  * - Simulation observation start date
    - 2022-01-01
    - Starts six months after x-factor burn-in
  * - Simulation end date
    - 2026-12-31
    - 
  * - Timestep
    - 4 days
    - Change from :ref:`phase I <2019_concept_model_vivarium_ciff_sam>`, needs to be validated

2.2 Scenarios
-------------

Simulated scenarios will involve some change of coverage/efficacy parameter values for the following interventions, in combination or isolation:

  1. SAM treatment

  2. MAM treatment

  3. SQ-LNS

    * 3a. Universal
    * 3b. Targeted to those with mild wasting
    * 3c. Targeted to those recovered from SAM/MAM treatment

.. list-table:: Intervention coverage and efficacy parameters
  :header-rows: 1

  * - Intervention
    - Baseline
    - Target
    - Zero coverage (*)
  * - 1: SAM treatment
    - Baseline values for :math:`C_{SAM}` and :math:`E_{SAM}`, :ref:`defined here <wasting-treatment-baseline-parameters>`
    - :math:`C_{SAM} = 0.7`

      :math:`E_{SAM} = 0.75`
    - :math:`C_{SAM} = 0`
      
      :math:`E_{SAM} = \text{baseline value}`
  * - 2: MAM treatment
    - Baseline values for :math:`C_{MAM}` and :math:`E_{MAM}`, :ref:`defined here <wasting-treatment-baseline-parameters>`
    - :math:`C_{MAM} = 0.7`
      
      :math:`E_{MAM} = 0.75`
    - :math:`C_{MAM} = 0`
      
      :math:`E_{MAM} = \text{baseline value}`
  * - 3: SQ-LNS (all sub-interventions)
    - :math:`C_{SQLNS} = 0`
    - :math:`C_{SQLNS} = 0.7` (*)
    - :math:`C_{SQLNS} = 0`

.. list-table:: Scenarios
  :header-rows: 1

  * - Scenario
    - 1. SAM treatment
    - 2. MAM treatment
    - 3. SQ-LNS
    - Note
  * - 1: Baseline
    - Baseline
    - Baseline
    - Baseline (0%)
    - 
  * - 2: Zero coverage
    - Zero coverage
    - Zero coverage
    - Baseline (0%)
    - 
  * - 3: SAM treatment scale-up, baseline MAM treatment
    - Target
    - Baseline
    - Baseline (0%)
    - 
  * - 4: SAM treatment scale-up, zero MAM treatment
    - Target
    - Zero coverage
    - Zero coverage
    - 
  * - 5: MAM treatment scale-up
    - Baseline
    - :math:`C_{MAM}` to baseline :math:`C_{SAM}`, :math:`E_{MAM}` to target :math:`E_{MAM}` 
    - Baseline (0%)
    - 
  * - 6: Full scale-up to SAM baseline
    - Baseline
    - :math:`C_{MAM}` to baseline :math:`C_{SAM}`, :math:`E_{MAM}` to target :math:`E_{MAM}`
    - 3a to baseline :math:`C_{SAM}`
    - 
  * - 7: MAM and SAM treatment scale-up
    - Target
    - Target
    - Baseline (0%)
    - 
  * - 8: Full scale-up to target
    - Target
    - Target
    - 3a to target
    - 
  * - 9: SQ-LNS to mildly wasted
    - Target
    - Target
    - 3b to target
    - [Second wave that requires x-factor inclusion]
  * - 10: SQ-LNS to SAM and MAM treatment
    - Target
    - Target
    - 3c to target
    - [Second wave that requires x-factor inclusion]

2.3 Modelling components
------------------------------

2.3.1 Concept model diagram
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::

  X-factor will be included in the second wave of model runs/scenarios only

.. image:: am_concept_model_diagram.svg

2.3.1.1 Cause Models
^^^^^^^^^^^^^^^^^^^^^

* :ref:`Diarrheal Diseases (GBD 2019) <2019_cause_diarrhea>`

* :ref:`Lower Respiratory Infections (GBD 2019) <2019_cause_lower_respiratory_infections>`

* :ref:`Measles (GBD 2019) <2019_cause_measles>`

2.3.1.2 Joint Cause-Risk Models
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* :ref:`Child Wasting / Protein Energy Malnutrition (GBD 2020) <2020_risk_exposure_wasting_state_exposure>`

2.3.1.3 Risk Exposure Models
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* :ref:`Child Stunting Risk Exposure (GBD 2020) <2020_risk_exposure_child_stunting>`

* :ref:`X-factor Risk Exposure <2019_risk_exposure_x_factor>`

2.3.1.4 Risk Effects Models
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* Child Stunting Risk Effects (GBD 2020)

* :ref:`Child Wasting Risk Effects (GBD 2020) <2019_risk_effect_wasting>`, NOTE: use the :ref:`risk effect on diarrheal diseases described here <standard-wasting-effects>`

* :ref:`X-factor Risk Effects <2019_risk_effect_x_factor>`, for wave 2 model runs only

.. note::

  Do not incude :ref:`Diarrheal Diseases Risk Effects <2019_risk_effect_diarrheal_diseases>`

2.3.1.5 Intervention Models
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* :ref:`Small quantity lipid based nutrient supplements universal coverage (SQ-LNS) <lipid_based_nutrient_supplements>` 

* :ref:`Treatment and management for acute malnutrition <intervention_wasting_treatment>`

2.4 Outputs
----------------------

**Primary simulation outcomes** (for each scenario):

  - Number of incident MAM and SAM cases per 100,000 PY
  - Number of *treated* MAM and SAM cases per 100,000 PY
  - Person-time spent utilizing SQ-LNS per 100,000 PY 
  - Prevalence of wasting and stunting
  - All-cause mortality rates
  - All-cause YLL rates
  - Cause-specific YLD rates

**Secondary simulation outcomes**

  - Relative risk for all-cause mortality by intervention coverage (for comparison with trial data)
  - Person-time spent covered by SQ-LNS per 100,000 PY (:ref:`see difference between coverage and utilization here <utilization-definition>`)
  - Mean difference of time-to-recovery of MAM and SAM by wasting treatment status 

*Simulation outcomes needed for verification and validation only:*

  - Cause incidence, remission, and excess mortality rates
  - Wasting and stunting risk effects
  - Effect of SQ-LNS intervention

**Requested outputs for primary and secondary outcomes** with minimum required stratification beyond defaults (additional stratification requested below if needed for V&V):

  Default strata:

  - Age
  - Sex
  - Year

.. list-table:: Requested Count Data Outputs and Stratifications
  :header-rows: 1

  * - Output
    - Include strata
    - Exclude strata
  * - Stunting state person time
    - 
    - 
  * - Wasting transition counts
    - * MAM treatment coverage* 
      * SAM treatment coverage*
    - 
  * - Wasting state person time
    - * SQ-LNS coverage/utilization 
      * MAM treatment coverage*
      * SAM treatment coverage*
    - 
  * - Deaths and YLLs (cause-specific)
    - 
    - 
  * - YLDs (cause-specific)
    - 
    - 
  * - Cause state person time
    - 
    - 
  * - Cause state transition counts
    - 
    - 
  * - Mortality hazard first moment
    - * MAM treatment coverage*
      * SAM treatment coverage*
      * SQ-LNS coverage/utilization (separately if targeting)
    - 

3.0 Models
+++++++++++

.. list-table:: Model runs
  :header-rows: 1

  * - Run
    - Description
    - Scenarios
    - Parameter mods
    - Specification mods
    - Stratificaction mods
    - Note
  * - 1.0
    - Cause models
    - Baseline
    - Default
    - Default
    - Default
    - 
  * - 2.0
    - Risk factors
    - Baseline
    - Default
    - Default
    - Default
    - 
  * - 3.0
    - Interventions
    - Baseline, alternative
    - Default
    - Default
    - Additionally stratify state person time by intervention coverage
    - 
  * - 3.0.1
    - Intervention bug fix
    - Baseline, alternative
    - Default
    - Default
    - Additionally stratify state person time by intervention coverage
    - 
  * - 3.1
    - Population size examination
    - Baseline, alternative
    - Default
    - 300,000 population size per draw
    - Default
    - 
  * - 4.0
    - Sensitivity analysis
    - Baseline, alternative
    - See attached document
    - 175,000 population size per draw
    - Default
    - 

.. list-table:: Model verification and validation tracking
   :widths: 3 10 20
   :header-rows: 1

   * - Model
     - Description
     - V&V summary
   * - Model
     - Description
     - V&V summary

.. list-table:: Outstanding verification and validation issues
   :header-rows: 1

   * - Issue
     - Explanation
     - Action plan
     - Timeline
   * - Issue
     - Explanation
     - Action plan
     - Timeline


Model Assumptions and Limitations
---------------------------------

References
----------

