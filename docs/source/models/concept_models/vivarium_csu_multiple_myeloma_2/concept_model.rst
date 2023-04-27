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

.. _2019_concept_model_vivarium_csu_multiple_myeloma_phase_2:

======================================================
Vivarium CSU Multiple Myeloma Registries Phase 2
======================================================

.. contents::
  :local:

.. list-table:: Abbreviations
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * -
    -
    -

.. _mm2_1.0:

1.0 Background
++++++++++++++

This page describes Phase 2 our multiple myeloma simulation project. :ref:`Phase
1 <2019_concept_model_vivarium_csu_multiple_myeloma>` initially focused on a
planned multiple myeloma patient registry, but registry enrollment has been much
lower than expected, so it is no longer a current focus of the client. Instead,
we will use our microsimulation to help the client answer various business
questions about their new drug isatuximab.

* Phase 1 :ref:`concept model
  <2019_concept_model_vivarium_csu_multiple_myeloma>` and `HUB page
  <https://hub.ihme.washington.edu/display/COS/Multiple+Myeloma+Registries+Sim+Phase+1>`_

* `Phase 2 HUB page
  <https://hub.ihme.washington.edu/display/COS/Multiple+Myeloma+Registries+Sim+Phase+2>`_

Our :ref:`Phase 1 multiple myeloma simulation
<2019_concept_model_vivarium_csu_multiple_myeloma>` focused on a scale-up of
isatuximab as a first-line treatment in the USA. For Phase 2, the client has
asked us to expand our simulation in the following ways:

1.  Expand the set of mutually exclusive treatment categories beyond the three
    treatment categories considered in Phase 1.

2.  Consider additional patterns of scale-up of Isa. In particular, model an
    uptake of Isa following Dara as a first-line treatment, after a "washout"
    period.

3. Expand the modeled locations beyond the USA.

We gave a `presentation to the CSU client on January 20, 2022 <slides_20220120_>`_
proposing some potential business questions for Phase 2, along with an expanded
set of treatment categories based on treatment guidelines from the `NCCN
<https://www.nccn.org/>`_ as `suggested by Manoj Menon in Sep-Oct 2021
<recommendations_from_Manoj_>`_.

.. _slides_20220120: https://uwnetid.sharepoint.com/:p:/r/sites/ihme_simulation_science_team/_layouts/15/Doc.aspx?sourcedoc=%7BB3EB4DE8-7E6A-4E81-9A4E-F3C4A5F2D6AB%7D&file=20220120%20IHME%20Multiple%20Myeloma%20Simulation%20-%20Phase%202%20Next%20Steps.pptx&action=edit&mobileredirect=true

.. _slides_Manoj_20210924: https://uwnetid.sharepoint.com/:p:/r/sites/ihme_simulation_science_team/_layouts/15/Doc.aspx?sourcedoc=%7B2AC8C5F2-CFE6-4458-93AD-4B378953EED3%7D&file=Simulation_MM_Sept%2024.pptx&action=edit&mobileredirect=true

.. _recommendations_from_Manoj: https://uwnetid.sharepoint.com/:f:/r/sites/ihme_simulation_science_team/Shared%20Documents/Research/CSU_Multiple%20Myeloma/Phase%202/05_Concept%20model%20development/Recommendations%20from%20Manoj%20Menon?csf=1&web=1&e=7UwzUz

.. _mm2_1.1:

1.1 Project Overview
--------------------

.. _mm2_1.2:

1.2 Literature Review
---------------------


.. _mm2_2.0:

2.0 Modeling Aims and Objectives
++++++++++++++++++++++++++++++++


3.0 Concept Model Diagram
+++++++++++++++++++++++++

.. image:: ./concept_model_diagram.svg

4.0 Vivarium Model Components
+++++++++++++++++++++++++++++

4.1 Cause Models
----------------

* :ref:`Multiple Myeloma <2019_cancer_model_multiple_myeloma_2>`

4.2 Risk Exposure Models
------------------------

* :ref:`Multiple Myeloma Risk Factor Exposures <2019_multiple_myeloma_risk_factor_exposures>`

4.3 Risk Effects Models
-----------------------

* :ref:`Multiple Myeloma Risk Factor Effects <2019_multiple_myeloma_risk_factor_effects>`

4.4 Intervention Models
-----------------------

* :ref:`Multiple Myeloma Treatment <multiple_myeloma_treatment>`

5.0 Simulation Scenarios
++++++++++++++++++++++++

We have four scenarios that differ only in how treatment is assigned.

* Baseline scenario: Sophisticated treatment models with postprocessing rules
* Alternative scenario 1 (Naive treatment): Naive treatment models with the same postprocessing rules as baseline
* Alternative scenario 2 (Isa-after-Dara): Sophisticated treatment models with baseline postprocessing rules modified to allow Isa directly following Dara in Line 2
* Alternative scenario 3 (Isa frontline): Sophisticated treatment models with baseline postprocessing rules modified to allow Isa in Line 1

For the details of sophisticated vs naive treatment models and the postprocessing rules for each scenario, see the :ref:`treatment documentation <multiple_myeloma_treatment>`.

6.0 Simulation Parameters
+++++++++++++++++++++++++

6.1 Locations
-------------

United States.

6.2 Population and Randomness
-----------------------------

Population description:

* Cohort type: Prospective closed cohort of individuals aged 15 years and older. The sim duration is 15 years (see below), so results above age 30 will not be impacted by the open/closed distinction; essentially all multiple myeloma occurs at age 30+.
* Size of largest starting population: 100,000 simulants
* Time span: Jan 1, 2013 to Dec 31, 2027 (Jan 1, 2013 to Jan 1, 2023 is a 10-year long burn-in period)
* Time step: 28 days (final run) or 90 days (intermediate runs) -- the only input data that depends on the timestep is the time-varying hazard; we will have a copy of those CSVs for each of the two time step values

6.3 Timeframe and Intervention Start Dates
------------------------------------------

7.0 Model Builds and Validation Tracking
++++++++++++++++++++++++++++++++++++++++

.. list-table:: Model verification and validation tracking
  :widths: 3 10 20
  :header-rows: 1

  * - Model
    - Description
    - V&V summary
  * - Model 0 (round 1 without age stratification)
    - `Phase 1 Model 9 re-run wihtout age stratification <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/pull/2>`_
    - * `Found a bug <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/blob/08e2f3136c213b40609f32427fb6421639766ce1/verification/model_0/mm_tx_coverage_verification.ipynb>`_ with the treatment observer in which all simulants are :code:`not_treated` in Line 1.
      * Cannot meaningfully compare `RRMM prevalence <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/blob/08e2f3136c213b40609f32427fb6421639766ce1/verification/model_0/mm_rrmm_prevalence.ipynb>`_ or `prevalence and incidence of MM overall <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/blob/08e2f3136c213b40609f32427fb6421639766ce1/verification/model_0/mm_cause_vs_gbd.ipynb>`_ to Phase 1 (or in the case of the latter, GBD) without age stratification.
      * `RRMM prevalence does not appear to converge in our burn-in period <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/blob/08e2f3136c213b40609f32427fb6421639766ce1/verification/model_0/mm_rrmm_prevalence.ipynb>`_, accumulating simulants continuously in the fourth and higher relapse state -- I have confirmed that this issue was also present in Phase 1, but we did not know it. Not investigating this for now, in the hopes that the new survival curves we plan to use anyway will resolve this problem as well.
      * `Treatment effects are unchanged from Phase 1 <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/blob/08e2f3136c213b40609f32427fb6421639766ce1/verification/model_0/mm_tx_effect_verification.ipynb>`_ **but they do not look correct** -- it appears there was some regression between Model 6.5 and Model 9 in Phase 1. Not investigating this for now, in the hopes that the treatment changes we plan to make anyway will resolve this problem as well.
      * `Survival curves are unchanged from Phase 1 <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/blob/08e2f3136c213b40609f32427fb6421639766ce1/verification/model_0/mm_survival_curves_vs_braunlin.ipynb>`_, though they are systematically biased relative to input curves from Braunlin -- a limitation we accepted in Phase 1.
      * Before completing the PR (do not have these versions of the notebooks), found a bug with :code:`make_results` putting information from many columns into the age column -- this was quickly fixed.
  * - Model 0 (round 2 with age stratification)
    - `Phase 1 model 9 re-run with age stratification <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/tree/main/verification/model_0_age_stratified>`_
    - * Same notes as above round one, except...
      * Comparisons to GBD are as expected, deviating more significantly as age increases, similar to phase I 
  * - Model 1
    - `Expanded treatment categories and hazard ratios (placeholder values) <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/tree/main/verification/model_1>`_
    - * `Underestimating survival and progression hazard rates, overestimating survival <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/blob/main/verification/model_1/mm_survival_curves_vs_braunlin.ipynb>`_, and overestimating prevalence compared to model 0. Thought to be due to placeholder values for treatment effects hazard ratios and incompatible PAFs that have not yet been updated.
      * `Issue found with treatment coverage algorithm <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/blob/main/verification/model_1/mm_tx_coverage_verification.ipynb>`_ - all simulants initialized into PI-IMiD-Dex category for line one at start of sim and retreatment is not allowed, so underestimation of PI-IMiD-Dex treatment category in the early years of the sim. Otherwise, treatment coverage looks as expected and does not vary by year or age.
      * `Treatment hazard ratios generaly reflect input values (when compared to PI-IMiD-Dex as reference <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/blob/main/verification/model_1/mm_tx_effect_verification_pi-imid-dex_reference.ipynb>`_, `systematically overestimated when compared to population rate, suspected to be a result of incompatible PAFs <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/blob/main/verification/model_1/mm_tx_effect_verification_population_reference.ipynb>`_), but with high degree of uncertainty in some cases 
  * - Model 2
    - Use TTNT directly for hazard of relapse, instead of subtracting OS from PFS
    - 
        * `Prevalence overestimate increased relative to Model 1 <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/blob/fcb48a7cbe8f3a4d9058b5be9fc382b52cc9ed19/verification/model_2/mm_cause_vs_gbd.ipynb>`_.
        * `More simulants in NDMM relative to Model 1 <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/blob/fcb48a7cbe8f3a4d9058b5be9fc382b52cc9ed19/verification/model_2/mm_rrmm_prevalence.ipynb>`_.
        * `New hazard rates appear to be applied correctly <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/blob/fcb48a7cbe8f3a4d9058b5be9fc382b52cc9ed19/verification/model_2/mm_survival_curves_vs_input.ipynb>`_.
        * No change in `treatment coverage <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/blob/fcb48a7cbe8f3a4d9058b5be9fc382b52cc9ed19/verification/model_2/mm_tx_coverage_verification.ipynb>`_ or `treatment effects <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/blob/fcb48a7cbe8f3a4d9058b5be9fc382b52cc9ed19/verification/model_2/mm_tx_effect_verification_pi-imid-dex_reference.ipynb>`_.
  * - Model 3
    - Sophisticated treatment prediction model as a scenario and business-rule-modified alternative scenarios
    - After a few rounds of fixes:
        * `Base hazard rates match input in interactive sim <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/blob/2a0b7a0b3d824ae49c2af2b47f955e2ec2139c47/verification/interactive_simulations/hazard%20rate%20verification/Hazard%20rate%20verification%20-%20time%20since%20entry.ipynb>`_.
        * `Risk factor hazard ratios match input in interactive sim <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/blob/2a0b7a0b3d824ae49c2af2b47f955e2ec2139c47/verification/interactive_simulations/hazard%20rate%20verification/Hazard%20rate%20verification%20-%20risk%20factors.ipynb>`_.
        * Due to component structure, unable to verify treatment effects in interactive sim -- but those have been verified in Model 2, before the interactive sim approach was necessary.
        * `Isa and Dara coverage approximately matches the target values by year and scenario <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/blob/2a0b7a0b3d824ae49c2af2b47f955e2ec2139c47/verification/model_3/scenario_verification_interactive_sim.ipynb>`_.
        * Due to reduction in stratifications, not able to check for regressions since Model 2.
  * - Model 3 - China location
    - Change location to China and add China-specific treatment probability postprocessing rules 
    - Ran updated code only in the China location:
        * `No regressions from previous Model 3 run <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/tree/f230ed802e0a27dba1437e076337456e1a829898/verification/model_3_china>`_.
        * `China-specific treatment targets roughly replicated in simulation, are modified by Isa/Dara projections as expected <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/blob/f230ed802e0a27dba1437e076337456e1a829898/verification/model_3_china/scenario_verification_interactive_sim.ipynb>`_.

8.0 Desired Outputs
+++++++++++++++++++

8.1 Final Outputs for Client
----------------------------

8.2 Requested Outputs from Vivarium
-----------------------------------

8.2.1 Treatment output table
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::

  This should be similar to the treatment output table from Phase 1, with an added stratification
  by age.

.. list-table:: Treatment observer metrics
  :header-rows: 1

  * - Variable
    - Definition
  * - input_draw
    - Input draw number. len(input_draw) = 30
  * - scenario
    - Intervention scenario. Choose from ['naive', 'baseline', ...]
  * - year
    - Calendar year
  * - treatment_line
    - Treatment line/disease state a simulant is in. If a simulant is in state
      :code:`multiple_myeloma_{x}`, assign this simulant :code:`treatment_line {x}`. Choose
      from [1, 2, 3, 4, 5+]
  * - treatment_category
    - Treatment regimen category a simulant initiated. For example, IMID+PI+Dex.
  * - age
    - Age group a simulant is in.
  * - value
    - Count of simulants in age group :code:`age` who initiated the :code:`treatment_category` in :code:`treatment_line` during :code:`year`.

8.2.2 Survival output table
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::

  This is very similar to :ref:`the survival output table from Phase 1 <mm5.6>`, with an added
  stratification by treatment category.

.. list-table:: Survival observer metrics
  :header-rows: 1

  * - Variable
    - Definition
  * - input_draw
    - Input draw number. len(input_draw) = 30
  * - scenario
    - Intervention scenario. Choose from ['naive', 'baseline', ...]
  * - treatment_line
    - Treatment line/disease state a simulant is in. If a simulant is in state
      :code:`multiple_myeloma_{x}`, assign this simulant :code:`treatment_line {x}`. Choose
      from [1, 2, 3, 4, 5+]
  * - treatment_category
    - Treatment regimen category a simulant is in. For example, IMID+PI+Dex.
  * - period
    - The number of days since the entrance into the :code:`treatment_line` that the
      count measures were evaluated on.
  * - alive_at_start
    - Count of at-risk simulants alive at :code:`period` - 28 days since they entered :code:`treatment_line`.
  * - died_by_end
    - Count of :code:`alive_at_start` simulants who died between :code:`period` - 28 and :code:`period` days since they entered :code:`treatment_line`.
  * - progressed_by_end
    - Count of :code:`alive_at_start` simulants who progressed to next line of treatment/disease state
      between :code:`period` - 28 and :code:`period` days since they entered :code:`treatment_line`.
  * - sim_end_on
    - Count of :code:`alive_at_start` simulants without death or progression at the end of the simulation
      between :code:`period` - 28 and :code:`period` days since they entered :code:`treatment_line`.

Time frame for survival observer (timestep = 28 days):
 1. start_date = 2021-01-01, end_date = 2025-12-31
 2. start_date = 2025-01-01, end_date = 2025-12-31

9.0 Back of the Envelope Calculations
+++++++++++++++++++++++++++++++++++++

10.0 Limitations
++++++++++++++++

11.0 References
+++++++++++++++
