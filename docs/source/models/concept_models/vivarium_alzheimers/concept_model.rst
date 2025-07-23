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

.. _2025_concept_model_vivarium_alzheimers:

===============================================
Alzheimer's Disease Early Detection Simulation
===============================================

.. contents::
  :local:

.. list-table:: Abbreviations
  :header-rows: 1

  * - Abbreviation
    - Definition
  * - AD
    - Alzheimer's Disease
  * - BBBM
    - Blood-Based Biomarkers
  * - CSF
    - Cerebrospinal Fluid
  * - MCI
    - Mild Cognitive Impairment
  * - PET
    - Positron Emission Tomography
  * - DALYs
    - Disability-Adjusted Life Years
  * - CSU
    - Client Services Unit

1.0 Overview
++++++++++++

This project leverages IHME's simulation capabilities to quantify health
and economic impacts associated with early detection and treatment of
pre-clinical Alzheimer's disease. The simulation evaluates scenarios
involving blood-based biomarker (BBBM) testing and a hypothetical
intervention that slows disease progression.

**Basic Goals:**

- Simulate the patient journey from identification through intervention
  and outcomes
- Compare health and economic impacts across reference and alternative
  scenarios in 10 locations

**Funding and collaboration:**

We are designing this simulation in conjunction with IHME's Client
Services Unit (CSU) with a focus on health and economic impact. Our team
will focus on simulating the the health impacts of preclinical AD
testing and the hypothetical intervention, and a different team at IHME
will use our results to estimate the economic impacts. We will be using
population forecasts from the Future Health Scenarios (FHS) team.

2.0 Modeling Aims and Objectives
+++++++++++++++++++++++++++++++++

The primary goal is to simulate the impact of early detection strategies
for Alzheimer's disease using blood-based biomarkers and subsequent
interventions.

Scenarios
------------

1. **Reference Scenario:** Present-day conditions with minimal BBBM
   uptake or disease-modifying therapies, including current
   cerebrospinal fluid (CSF) and amyloid-positron emission tomography
   (PET) diagnostic pathways
2. **Alternative Scenario 1:** Introduction of BBBM testing for at-risk
   preclinical populations (no intervention)
3. **Alternative Scenario 2:** BBBM testing plus hypothetical
   intervention that prevents, delays, or slows disease progression

The simulation tracks simulants through health states from age 30 to 125
years (or death), capturing progression through preclinical AD, mild
cognitive impairment, and various stages of clinical Alzheimer's
disease.
