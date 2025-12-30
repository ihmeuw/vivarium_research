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

This document outlines the concept model for simulating interventions that might reduce the burden of the opioid epidemic, such as Medications for Opioid Use Disorder (MOUD). The core of this model is a state-transition model representing opioid use disorder states and treatment dynamics. The model also includes a "quarters" component that captures the living conditions of individuals, including private residence, unhoused status, and incarceration.

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

The core of this simulation is the Opioid Use Disorder (OUD) cause model, which represents the epidemiology and natural history of OUD using a three-state compartmental model. This model captures the states of **susceptible** (no OUD), **with_condition** (untreated OUD), and **on_treatment** (receiving Medications for Opioid Use Disorder, or MOUD).

For complete documentation of the OUD cause model, including detailed state definitions, transition rates, GBD 2023 alignment, parameter estimation methodology, and data sources, please see:

:ref:`Opioid Use Disorder Cause Model <2023_cause_opioid_use_disorder>`


3.2 Quarters Model
~~~~~~~~~~~~~~~~~~

The simulation also includes a "Quarters Model" representing the living situation of each individual. This submodel tracks transitions between distinct states related to housing, homelessness, and incarceration.

.. graphviz::

   digraph quarters_model {
       rankdir = TD; // Suggesting Top-Down layout for potential clarity
       node [shape=box]; // Optional: make nodes boxes like states

       private_residence [label="Private Residence"];
       unhoused [label="Unhoused"];
       incarcerated [label="Incarcerated"];

       // Transitions out of Private Residence
       private_residence -> unhoused [label="pr_uh"];
       private_residence -> incarcerated [label="pr_inc"];

       // Transitions out of Unhoused
       unhoused -> private_residence [label="uh_pr"];
       unhoused -> incarcerated [label="uh_inc"];

       // Transitions out of Incarcerated
       incarcerated -> private_residence [label="inc_pr"];
       incarcerated -> unhoused [label="inc_uh"];
   }

This submodel uses a state machine with three states:

.. list-table:: State Definitions
   :widths: 15 30
   :header-rows: 1

   * - State
     - Definition
   * - Private Residence
     - Individual resides in stable, private housing (e.g., house, apartment).
   * - Unhoused
     - Individual lacks stable housing (e.g., living on streets, in shelters, temporary arrangements).
   * - Incarcerated
     - Individual resides in a correctional facility (e.g., jail, prison).

Transitions between these states occur based on defined rates:

.. list-table:: Transition Rate Definitions
   :widths: 5 15 30
   :header-rows: 1

   * - Symbol
     - Name
     - Definition
   * - pr_uh
     - Rate of becoming unhoused
     - Rate at which individuals transition from private residence to being unhoused.
   * - pr_inc
     - Rate of incarceration (from residence)
     - Rate at which individuals transition from private residence to incarceration.
   * - uh_pr
     - Rate of obtaining housing
     - Rate at which unhoused individuals transition to private residence.
   * - uh_inc
     - Rate of incarceration (from unhoused)
     - Rate at which unhoused individuals transition to incarceration.
   * - inc_pr
     - Rate of release to housing
     - Rate at which incarcerated individuals are released to private residence.
   * - inc_uh
     - Rate of release to unhoused
     - Rate at which incarcerated individuals are released into unhoused status.

Key features and interactions of this submodel include:

- **Interdependence with OUD Status:** Transition rates *within* this Quarters Model (e.g., ``pr_uh``, ``uh_inc``) may be influenced by the individual's state in the Core Disease Model (susceptible, with condition, on treatment). For example, individuals with untreated OUD might have a higher rate of becoming unhoused.  See below for details on how this is implemented using the :code:`RiskEffect` component.
- **Influence on OUD Transitions:** Conversely, an individual's state in the Quarters Model can affect transition rates *within* the Core Disease Model. For instance, being unhoused or incarcerated might increase OUD incidence risk (``i``), decrease treatment initiation rates (``ti``), or increase treatment discontinuation rates (``td``). See below for details on how this is implemented using the :code:`RiskEffect` component.
- **Parameterization:** Rates need to be parameterized using available data sources on housing instability, homelessness, incarceration, and release patterns, potentially stratified by relevant demographic factors and OUD status where data permits.


4 Data Notes
++++++++++++

Parameterizing the MOUD simulation requires integrating data from various sources to define initial population states and the transition rates governing movement between states in both the Core Disease Model and the Quarters Model. For details on Core Disease Model parameters (OUD prevalence, treatment coverage, transition rates, and the NumPyro/DisMod-AT methodology), see the :ref:`Opioid Use Disorder Cause Model <2023_cause_opioid_use_disorder>` documentation.

Key data requirements and methodologies for the simulation include:

4.1 Quarters Model Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Quarters Model requires data on the distribution of the population across the three states (Private Residence, Unhoused, Incarcerated) and the transition rates between them (``pr_uh``, ``pr_inc``, ``uh_pr``, ``uh_inc``, ``inc_pr``, ``inc_uh``).

* **Population Distribution:**
    * **Private Residence:** Baseline population estimates, potentially stratified by age and sex, are typically derived from U.S. Census Bureau data, particularly the **American Community Survey (ACS)** which provides detailed yearly housing characteristics.
    * **Unhoused:** Estimates often rely on annual **Point-in-Time (PIT) counts** conducted by Continuums of Care (CoCs) and reported to HUD. These provide a snapshot but may undercount the true population. Local **Homelessness Management Information System (HMIS)** data, where available (e.g., for Seattle/King County), can offer more detailed longitudinal information but may have coverage limitations. Specific research studies on local unhoused populations are also valuable.
    * **Incarcerated:** Data on jail and prison populations can be obtained from the **Bureau of Justice Statistics (BJS)** and state/local sources like the Washington State Department of Corrections or county jail dashboards/reports.
* **Transition Rates:** Estimating the rates of movement *between* these states is complex and often requires synthesizing multiple data sources and making assumptions:
    * *Incarceration/Release Dynamics (``pr_inc``, ``uh_inc``, ``inc_pr``, ``inc_uh``):* BJS and local corrections data provide information on entries and releases. Determining the housing status upon release (to stable housing vs. homelessness) often requires specialized reports or research studies.
    * *Housing Instability (``pr_uh``):* Data on eviction rates, housing loss, or entries into homelessness from stable housing can be sourced from local housing authorities, HMIS data, or specific surveys/studies.
    * *Exits from Homelessness (``uh_pr``, ``uh_inc``):* HMIS data and longitudinal studies of unhoused individuals are key sources for estimating transitions back to private residence or into incarceration.
* **Stratification and Interaction:** A critical step involves estimating how these population distributions and transition rates differ based on OUD status (from the Core Disease Model) and demographic factors (age, sex). This often requires analyzing linked data sources (if available), applying relative risks derived from literature, or making informed assumptions due to data scarcity linking OUD directly to housing/incarceration transitions at a population level.

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
