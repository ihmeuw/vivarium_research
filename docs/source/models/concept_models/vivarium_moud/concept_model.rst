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

===========================
Opioid Epidemic  Simulation
===========================

.. contents::
  :local:
  :depth: 1


.. list-table:: Abbreviations
  :header-rows: 1

  * - Abbreviation
    - Definition
  * - MOUD
    - Medications for Opioid Use Disorder
  * - OUD
    - Opioid Use Disorder




1 Overview
++++++++++

This document outlines the concept model for simulating interventions that might reduce the burden of the opioid epidemic.
We categorize interventions into four broad groups: (1) Enhanced Delivery of Evidence-Based Treatment such as Medications for Opioid Use Disorder (MOUD), (2) Recovery Support, (3) Harm Reduction, and (4) Data Monitoring and Primary Prevention. The core of this model is a state-transition model that includes states such as "opioid use disorder" and "opioid misuse-but-not-disorder", as well as treatment and recovery states. The model also includes a housing component that captures whether individuals are living in a private residence or are unhoused.

2 Modeling aims and objectives
++++++++++++++++++++++++++++++

The primary goal of this OUD simulation modeling effort is to serve as a tool for evaluating the potential population-level impact of various interventions and combinations of interventions designed to mitigate the burden of the opioid epidemic. The model aims to explore how different strategies might affect key outcomes related to Opioid Use Disorder (OUD), including prevalence, treatment engagement, and potentially related harms.

A central objective is to simulate interventions grouped according to the U.S. Department of Health and Human Services (HHS) framework, which categorizes services into four key areas:

1.  **Enhanced Delivery of Evidence-Based Treatment:** Simulating the expansion or improved delivery of Medications for Opioid Use Disorder (MOUD), such as methadone, buprenorphine, and naltrexone, potentially alongside integrated behavioral therapies and psychosocial support. This involves modeling changes in treatment initiation, adherence, and success rates.
2.  **Recovery Support:** Modeling the impact of services that facilitate long-term recovery and wellness. This includes simulating the effects of increased access to recovery housing, peer recovery support services, employment assistance programs, and other wraparound services aimed at enhancing stabilization.
3.  **Integrated Harm Reduction:** Evaluating strategies focused on reducing the immediate risks associated with drug use. This involves modeling the effects of interventions like naloxone distribution for overdose reversal, syringe services programs (SSPs) for preventing infectious disease, fentanyl test strip availability, and potentially low-barrier engagement points for healthcare access.
4.  **Data Monitoring and Primary Prevention:** Exploring the potential effects of efforts aimed at preventing the initiation of OUD and improving surveillance. This could include modeling the impact of public awareness campaigns, safer prescribing initiatives, or early screening and intervention programs, informed by ongoing data monitoring.

By allowing the simulation of interventions individually and, crucially, *in combination* across these categories, the model is intended to help understand potential synergies or trade-offs between different approaches. The ultimate aim is to provide insights that can inform strategic planning and resource allocation for efforts addressing the opioid crisis.

3 Concept model and submodels
+++++++++++++++++++++++++++++

3.1 Opioid Use Disorder Cause Model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The core of this simulation is the Opioid Use Disorder (OUD) cause model, which represents the epidemiology and natural history of OUD using a state transition model. This model captures the states of **susceptible** (no OUD), **with_condition** (untreated OUD), and **on_treatment** (receiving Medications for Opioid Use Disorder, or MOUD), as well as states for **in_recovery** and **misuse** (to capture when an individual's opioid use is not a use disorder).

For complete documentation of the OUD cause model, including detailed state definitions, transition rates, GBD 2023 alignment, parameter estimation methodology, and data sources, please see:

:ref:`Opioid Use Disorder Cause Model <2023_cause_opioid_use_disorder>`


3.2 Housing Model
~~~~~~~~~~~~~~~~~~

The simulation also includes a "Housing Model" representing each individual's housing status. This submodel tracks transitions between two housing-related states: private residence and being unhoused.

.. graphviz::

  digraph housing_model {
       rankdir = TD; // Suggesting Top-Down layout for potential clarity
       node [shape=box]; // Optional: make nodes boxes like states

       private_residence [label="Private Residence"];
       unhoused [label="Unhoused"];

       // Transitions out of Private Residence
       private_residence -> unhoused [label="h_pr_uh"];

       // Transitions out of Unhoused
       unhoused -> private_residence [label="h_uh_pr"];
   }

This submodel uses a state machine with two states:

.. list-table:: State Definitions
   :widths: 15 30
   :header-rows: 1

   * - State
     - Definition
   * - Private Residence
     - Individual resides in stable, private housing (e.g., house, apartment).
   * - Unhoused
     - Individual is experiencing homelessness or otherwise does not have stable housing (e.g., living outdoors, in shelters, or in temporary arrangements).

Transitions between these states occur based on defined rates:

.. list-table:: Transition Rate Definitions
   :widths: 5 15 30
   :header-rows: 1

   * - Symbol
     - Name
     - Definition
   * - h_pr_uh
     - Rate of becoming unhoused
     - Rate at which individuals transition from private residence to being unhoused.
   * - h_uh_pr
     - Rate of obtaining housing
     - Rate at which people who are unhoused transition to private residence.

Key features and interactions of this submodel include:

- **Interdependence with OUD Status:** Transition rates *within* this Housing Model (e.g., ``h_pr_uh``) may be influenced by the individual's state in the Core Disease Model (susceptible, with condition, on treatment). For example, individuals with untreated OUD might have a higher rate of becoming unhoused. See below for details on how this is implemented using the :code:`RiskEffect` component.
- **Influence on OUD Transitions:** Conversely, an individual's state in the Housing Model can affect transition rates *within* the Core Disease Model. For instance, being unhoused might increase OUD incidence risk (``i``), decrease treatment initiation rates (``ti``), or increase treatment discontinuation rates (``td``). See below for details on how this is implemented using the :code:`RiskEffect` component.
- **Parameterization:** Rates need to be parameterized using available data sources on housing instability and homelessness, potentially stratified by relevant demographic factors and OUD status where data permits. The bulk of data that can inform the OUD cause model comes from household and school surveys that do not fully capture people experiencing homelessness.


4 Data Notes
++++++++++++

Parameterizing the MOUD simulation requires integrating data from various sources to define initial population states and the transition rates governing movement between states in both the Core Disease Model and the Housing Model. For details on Core Disease Model parameters (OUD prevalence, treatment coverage, transition rates, and the NumPyro/DisMod-AT methodology), see the :ref:`Opioid Use Disorder Cause Model <2023_cause_opioid_use_disorder>` documentation.

Key data requirements and methodologies for the simulation include:

4.1 Housing Model Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Housing Model requires data on the distribution of the population across the two states (Private Residence and Unhoused) and the transition rates between them (``h_pr_uh`` and ``h_uh_pr``).

* **Population Distribution:**
    * **Private Residence:** Baseline population estimates, potentially stratified by age and sex, are typically derived from U.S. Census Bureau data, particularly the **American Community Survey (ACS)** which provides detailed yearly housing characteristics.
    * **Unhoused:** Estimates often rely on annual **Point-in-Time (PIT) counts** conducted by Continuums of Care (CoCs) and reported to HUD. These provide a snapshot but may undercount the true population. Local **Homelessness Management Information System (HMIS)** data, where available (e.g., for Seattle/King County), can offer more detailed longitudinal information but may have coverage limitations. Specific research studies focused on people experiencing homelessness are also valuable.
* **Transition Rates:** Estimating the rates of movement *between* these states is complex and often requires synthesizing multiple data sources and making assumptions:
    * *Housing Instability (``h_pr_uh``):* Data on eviction rates, housing loss, or entries into homelessness from stable housing can be sourced from local housing authorities, HMIS data, or specific surveys/studies.
    * *Returns to Private Residence (``h_uh_pr``):* HMIS data and longitudinal studies of people experiencing homelessness are key sources for estimating transitions back to private residence.
* **Stratification and Interaction:** A critical step involves estimating how these population distributions and transition rates differ based on OUD status (from the Core Disease Model) and demographic factors (age, sex). This often requires analyzing linked data sources (if available), applying relative risks derived from literature, or making informed assumptions due to data scarcity linking OUD directly to housing transitions at a population level.

4.2 General Considerations
~~~~~~~~~~~~~~~~~~~~~~~~~~

Data from different sources must be reconciled for the specific simulation timeframe, location (e.g., Seattle, King County, Washington State), and population demographics. Significant data processing, harmonization, and potentially imputation may be necessary, particularly for deriving transition rates and stratifying them appropriately. Assumptions made due to data limitations should be clearly documented alongside the model specifications.

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
