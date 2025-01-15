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

.. _2021_concept_model_vivarium_moud:

=====================================================
Medications for Opioid Use Disorder (MOUD) Simulation
=====================================================

.. contents::
  :local:
  :depth: 1



1 Overview
++++++++++

This document outlines the concept model for simulating Medications for Opioid Use Disorder (MOUD) interventions. The core of this model is a state-transition model representing opioid use disorder states and treatment dynamics.

2 Modeling aims and objectives
++++++++++++++++++++++++++++++

TK - Objectives and goals of the MOUD modeling effort

TK - quarters submodel that captures living in a private residence, living unhoused, and incarceration

3 Concept model and submodels
+++++++++++++++++++++++++++++

3.1 Core Disease Model
~~~~~~~~~~~~~~~~~~~~~~

.. graphviz::

  digraph moud_model {
      rankdir = LR;
      susceptible [label="susceptible"]
      with_condition [label="with condition"]
      on_treatment [label="on treatment"]

      susceptible -> with_condition [label="i"]
      with_condition -> susceptible [label="r"]
      with_condition -> on_treatment [label="ti"] 
      on_treatment -> with_condition [label="tf"]
      on_treatment -> susceptible [label="ts"]
  }


The core disease model represents opioid use disorder as a state machine with three states:

.. list-table:: State Definitions
  :widths: 7 20
  :header-rows: 1

  * - State
    - Definition
  * - susceptible
    - Individual does not have opioid use disorder
  * - with condition
    - Individual has opioid use disorder but is not receiving medication treatment
  * - on treatment
    - Individual has opioid use disorder and is receiving medication treatment (MOUD)

.. list-table:: Transition Rate Definitions
  :widths: 1 5 20
  :header-rows: 1

  * - Symbol
    - Name
    - Definition
  * - i
    - incidence rate
    - Rate at which individuals develop opioid use disorder
  * - r
    - remission rate  
    - Rate at which individuals with untreated OUD naturally recover
  * - ti
    - treatment initiation rate
    - Rate at which individuals with OUD begin medication treatment
  * - tf
    - treatment failure rate
    - Rate at which individuals on MOUD discontinue or fail treatment
  * - ts
    - treatment success rate
    - Rate at which individuals on MOUD achieve sustained recovery/remission
    
Key features of the model include:

- The "with_condition" state can be used as a risk exposure
- Treatment state has no excess mortality or disability weight relative to susceptible
- State membership is determined by prevalence data and treatment ratios designed to be internally consistent and to match GBD 2021 estimates


4 Data Notes
++++++++++++

The model requires the following data streams:

- Overall OUD prevalence
- Treatment coverage ratios
- Transition rates:
  - Treatment initiation
  - Treatment failure
  - Treatment success
  - Disease incidence
  - Untreated remission

TK - Details on data sources and processing (GBD does not store remission rates, so this required some innovation that might be important for other future models)

5 Model Runs
++++++++++++

.. list-table:: Model runs
  :header-rows: 1

  * - Run
    - Description
    - Scenarios
    - Specification modifications
    - Stratificaction modifications
    - Note
  * - 1
    - MOUD cause model
    - Baseline
    - --
    - --
    - Demonstrate that calibration is possible


6 Limitations
+++++++++++++

TK - Discussion of model limitations and assumptions

7 References/Other
++++++++++++++++++

.. list-table:: Abbreviations
  :header-rows: 1

  * - Abbreviation
    - Definition
  * - MOUD
    - Medications for Opioid Use Disorder
  * - OUD
    - Opioid Use Disorder


