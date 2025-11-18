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

.. _2021_cause_opioid_use_disorder:

=======================
Opioid Use Disorder
=======================

.. contents::
   :local:
   :depth: 2

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - OUD
    - Opioid Use Disorder
    -
  * - MOUD
    - Medications for Opioid Use Disorder
    -
  * - DSM-5
    - Diagnostic and Statistical Manual of Mental Disorders, 5th Edition
    -
  * - ICD-10
    - International Classification of Diseases, 10th Revision
    -

Disease Overview
----------------

Opioid Use Disorder (OUD) is a chronic, relapsing substance use disorder characterized by a problematic pattern of opioid use leading to clinically significant impairment or distress. Opioids include prescription pain relievers (e.g., oxycodone, hydrocodone), synthetic opioids (e.g., fentanyl), and illicit drugs (e.g., heroin).

OUD is defined by the presence of at least 2 of 11 criteria within a 12-month period according to the DSM-5, including:

- Taking opioids in larger amounts or over a longer period than intended
- Persistent desire or unsuccessful efforts to cut down or control opioid use
- Spending a great deal of time obtaining, using, or recovering from opioids
- Craving or a strong desire to use opioids
- Recurrent opioid use resulting in failure to fulfill major role obligations
- Continued opioid use despite having persistent social or interpersonal problems
- Important activities given up or reduced because of opioid use
- Recurrent opioid use in physically hazardous situations
- Continued use despite knowledge of persistent physical or psychological problems
- Tolerance (need for increased amounts to achieve desired effect)
- Withdrawal symptoms when opioids are discontinued

The severity of OUD is classified as mild (2-3 criteria), moderate (4-5 criteria), or severe (6 or more criteria). OUD is a chronic condition with a relapsing and remitting nature, where individuals may cycle between periods of active use, treatment, recovery, and relapse.

Clinical Course and Natural History
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

OUD typically follows a chronic course characterized by:

**Initiation**: Initial opioid exposure may occur through legitimate medical use (prescription opioids for pain management) or recreational/illicit use. The transition from initial use to regular use and dependence varies considerably among individuals based on genetic, environmental, and social factors.

**Active Use**: Characterized by regular opioid consumption, development of tolerance, and potential physiological dependence. Individuals may experience escalating use patterns, switching between different opioid types (e.g., from prescription opioids to heroin or fentanyl), and transitions from non-injection to injection use.

**Complications**: OUD is associated with significant morbidity and mortality, including:

- Fatal and non-fatal overdose
- Infectious diseases (HIV, hepatitis C, endocarditis, skin and soft tissue infections)
- Mental health comorbidities (depression, anxiety, post-traumatic stress disorder)
- Social consequences (housing instability, incarceration, unemployment, family disruption)

**Recovery**: Recovery from OUD can occur through various pathways:

- Spontaneous or natural recovery (remission without formal treatment)
- Medication-assisted treatment (also called Medications for Opioid Use Disorder or MOUD) using buprenorphine, methadone, or naltrexone
- Behavioral therapies and psychosocial support
- Integrated treatment combining medications and behavioral interventions

**Relapse**: OUD has a high relapse rate, with many individuals experiencing multiple cycles of recovery and return to active use. Relapse risk is elevated during periods of stress, environmental triggers, co-occurring mental health symptoms, and following treatment discontinuation.

GBD 2021 Modeling Strategy
---------------------------

GBD 2021 Definition and Diagnostic Criteria
++++++++++++++++++++++++++++++++++++++++++++

The Global Burden of Disease (GBD) 2021 study defines opioid use disorders based on the International Classification of Diseases, 10th revision (ICD-10) and the Diagnostic and Statistical Manual of Mental Disorders, 4th edition, text revision (DSM-IV-TR) criteria for opioid dependence and harmful use.

The GBD definition includes:

- **Opioid dependence**: A cluster of behavioral, cognitive, and physiological phenomena developing after repeated opioid use, including a strong desire to use opioids, difficulties controlling use, withdrawal symptoms, tolerance, neglect of alternative activities, and persistent use despite harmful consequences
- **Harmful use of opioids**: A pattern of opioid use causing damage to physical or mental health in the absence of dependence

GBD 2021 Non-Fatal Modeling Strategy
+++++++++++++++++++++++++++++++++++++

The GBD 2021 study uses DisMod-MR 2.1, a Bayesian meta-regression tool, to estimate the epidemiology of opioid use disorder. DisMod-MR 2.1 integrates diverse data sources to produce internally consistent estimates of key epidemiological parameters.

**Key Epidemiological Parameters**

DisMod-MR 2.1 estimates the following parameters for opioid use disorder:

1. **Prevalence**: The proportion of the population with OUD at a given time
2. **Incidence**: The rate at which new cases of OUD develop in the population
3. **Remission**: The rate at which individuals with OUD transition to a non-disorder state
4. **Excess mortality**: The elevated mortality risk associated with OUD beyond background mortality

These parameters are estimated by age, sex, location, and year (1990-2021) and are constrained to be internally consistent through the DisMod-MR 2.1 modeling framework.

**Data Sources**

The GBD 2021 estimates incorporate data from:

- Population-based surveys and epidemiological studies
- Treatment records and registry data
- Published literature on OUD prevalence and incidence
- Mortality data from vital registration systems
- Verbal autopsy studies

**Severity Distribution**

GBD 2021 estimates the proportion of OUD cases that are asymptomatic (assigned a disability weight of 0) versus symptomatic. Disability weights for symptomatic OUD reflect the impact on health-related quality of life.

.. list-table:: Severity Distribution for Opioid Use Disorder
   :widths: 20 40 15
   :header-rows: 1

   * - Severity Level
     - Lay Description
     - Disability Weight (95% CI)
   * - Asymptomatic
     - Individual meets diagnostic criteria but experiences no current symptoms
     - 0
   * - Opioid Dependence
     - Has an intense and constant craving for opioids and has severe problems with personal relationships and work
     - 0.549 (0.368-0.713)

GBD 2021 Fatal Modeling Strategy
+++++++++++++++++++++++++++++++++

Fatal burden from OUD is estimated through two pathways:

1. **Direct deaths**: Deaths directly attributed to opioid use disorder (e.g., coded as opioid dependence or harmful use in vital registration data)
2. **Opioid overdose deaths**: Deaths from opioid poisoning/overdose, which are modeled separately and contribute to the overall burden

The Cause of Death Ensemble model (CODEm) is used to estimate cause-specific mortality from OUD, incorporating:

- Vital registration data with ICD-9 and ICD-10 codes for opioid use disorders
- Verbal autopsy data
- Covariates including healthcare access, substance use patterns, and sociodemographic factors

**Excess Mortality Rate (EMR)**

The excess mortality rate for OUD is calculated as the ratio of cause-specific mortality to prevalence, representing the elevated risk of death among individuals with OUD compared to the general population.

Restrictions
++++++++++++

.. list-table:: GBD 2021 Cause Restrictions for Opioid Use Disorder
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
     - False
     -
   * - YLL age group start
     - 15
     - [15, 19 years), age_group_id=8
   * - YLL age group end
     - 125
     - [95, 125 years), age_group_id=235
   * - YLD age group start
     - 15
     - [15, 19 years), age_group_id=8
   * - YLD age group end
     - 125
     - [95, 125 years), age_group_id=235

Vivarium Modeling Strategy
---------------------------

Scope
+++++

This cause model represents opioid use disorder as a three-state compartmental model capturing susceptibility, active disorder, and treatment states. The model is designed to be compatible with GBD 2021 estimates while allowing for simulation of treatment interventions (Medications for Opioid Use Disorder, or MOUD).

The model captures:

- Incidence of new OUD cases in the susceptible population
- Natural remission from untreated OUD
- Treatment initiation and engagement with MOUD
- Treatment discontinuation/failure
- Treatment-associated recovery
- Excess mortality associated with untreated and treated OUD states

State Definitions
+++++++++++++++++

The model includes three mutually exclusive states:

.. list-table:: State Definitions
   :widths: 5 10 30
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - **S**\usceptible
     - Individual does not currently have opioid use disorder
   * - C
     - **C**\ondition (With Condition)
     - Individual has opioid use disorder but is not receiving medication treatment (MOUD)
   * - T
     - **T**\reatment (On Treatment)
     - Individual has opioid use disorder and is receiving medication treatment for OUD (MOUD: methadone, buprenorphine, or naltrexone)

**State Characteristics**

- **Susceptible (S)**: This state includes individuals who have never had OUD as well as those who have achieved sustained remission/recovery. These individuals face the baseline population risk of developing OUD.

- **With Condition (C)**: This state represents individuals with active, untreated OUD. Individuals in this state:

  - Experience the disability burden associated with symptomatic OUD
  - Face elevated mortality risk (excess mortality)
  - Are at risk for complications including overdose, infectious diseases, and social harms
  - May transition to treatment (MOUD) or achieve natural remission

- **On Treatment (T)**: This state represents individuals receiving MOUD (methadone, buprenorphine, or naltrexone). Individuals in this state:

  - Have reduced or eliminated disability burden (consistent with treatment effectiveness)
  - Have substantially reduced mortality risk compared to untreated OUD
  - May discontinue treatment (transition back to untreated state) or achieve recovery (transition to susceptible state)

Cause Model Diagram
+++++++++++++++++++

.. graphviz::

  digraph oud_model {
      rankdir = LR;
      node [shape=box, style=rounded];

      susceptible [label="Susceptible\n(S)"]
      with_condition [label="With Condition\n(Untreated OUD)\n(C)"]
      on_treatment [label="On Treatment\n(Receiving MOUD)\n(T)"]

      susceptible -> with_condition [label="Incidence\n(i)"]
      with_condition -> susceptible [label="Natural Remission\n(r)"]
      with_condition -> on_treatment [label="Treatment\nInitiation\n(ti)"]
      on_treatment -> with_condition [label="Treatment\nDiscontinuation\n(tf)"]
      on_treatment -> susceptible [label="Treatment-\nAssociated\nRecovery\n(ts)"]
  }

Transitions
+++++++++++

.. list-table:: Transition Rate Definitions
   :widths: 5 15 40
   :header-rows: 1

   * - Symbol
     - Name
     - Definition
   * - i
     - Incidence rate
     - Rate at which susceptible individuals develop opioid use disorder. This represents new cases of OUD arising in the population.
   * - r
     - Natural remission rate
     - Rate at which individuals with untreated OUD achieve remission/recovery without formal treatment. Natural remission may occur through spontaneous behavior change, informal social support, or other mechanisms.
   * - ti
     - Treatment initiation rate
     - Rate at which individuals with untreated OUD begin medication treatment (MOUD: methadone, buprenorphine, or naltrexone). This transition represents engagement with formal treatment services.
   * - tf
     - Treatment discontinuation/failure rate
     - Rate at which individuals receiving MOUD discontinue treatment and return to untreated OUD status. This may occur due to medication side effects, loss of access to treatment, patient choice, or other factors.
   * - ts
     - Treatment-associated recovery rate
     - Rate at which individuals receiving MOUD achieve sustained recovery and transition to the susceptible state. This represents successful treatment outcomes.

State and Transition Data Tables
+++++++++++++++++++++++++++++++++

States Data
~~~~~~~~~~~

.. list-table:: States Data
   :widths: 15 20 35 30
   :header-rows: 1

   * - State
     - Measure
     - Value
     - Notes
   * - All
     - Cause-specific mortality rate (CSMR)
     - :math:`\frac{\text{deaths}_{\text{c562}}}{\text{population}}`
     - Post-CoDCorrect cause-level CSMR for opioid use disorder (cause_id=562)
   * - S
     - Prevalence
     - :math:`1 - \text{prevalence}_{\text{c562}}`
     - Complement of total OUD prevalence
   * - C
     - Prevalence
     - :math:`\text{prevalence}_{\text{c562}} \times (1 - \text{treatment\_coverage})`
     - Untreated OUD prevalence (total prevalence × proportion not on treatment)
   * - T
     - Prevalence
     - :math:`\text{prevalence}_{\text{c562}} \times \text{treatment\_coverage}`
     - Treated OUD prevalence (total prevalence × proportion on treatment)
   * - S
     - Excess mortality rate (EMR)
     - 0
     - No excess mortality in susceptible state
   * - C
     - Excess mortality rate (EMR)
     - :math:`\text{emr}_{\text{base}} \times (1 + \text{emr\_multiplier}_{\text{untreated}})`
     - Elevated EMR for untreated OUD, accounting for increased overdose and other mortality risks
   * - T
     - Excess mortality rate (EMR)
     - 0 or reduced value
     - MOUD substantially reduces mortality risk; may be set to 0 to reflect protective effect of treatment
   * - S
     - Disability weight
     - 0
     - No disability burden in susceptible state
   * - C
     - Disability weight
     - :math:`\frac{1}{\text{prevalence}_{\text{c562}}} \times \sum\limits_{s \in \text{sequelae}} \text{disability\_weight}_s \times \text{prevalence}_s`
     - Weighted average of symptomatic and asymptomatic OUD disability weights
   * - T
     - Disability weight
     - 0 or reduced value
     - MOUD substantially reduces disability; may be set to 0 to reflect treatment effectiveness

Transition Data
~~~~~~~~~~~~~~~

.. list-table:: Transition Data
   :widths: 8 8 8 25 35
   :header-rows: 1

   * - Transition
     - Source
     - Sink
     - Value
     - Notes
   * - i
     - S
     - C
     - Derived from DisMod-AT/NumPyro model
     - Incidence rate of OUD. Estimated using NumPyro implementation of DisMod-AT-like model to ensure internal consistency with prevalence, treatment coverage, and other epidemiological parameters.
   * - r
     - C
     - S
     - Derived from DisMod-AT/NumPyro model
     - Natural remission rate for untreated OUD. Not directly available from GBD; estimated using DisMod-AT/NumPyro model to ensure consistency with observed prevalence and treatment patterns.
   * - ti
     - C
     - T
     - Derived from DisMod-AT/NumPyro model and treatment access data
     - Treatment initiation rate. Estimated based on treatment coverage ratios and population-level treatment access data. May vary by setting (community, jail, etc.) and be modified by intervention scenarios.
   * - tf
     - T
     - C
     - Derived from DisMod-AT/NumPyro model and treatment retention studies
     - Treatment discontinuation rate. Estimated from treatment retention/discontinuation studies and calibrated to match observed treatment coverage. Represents a key target for interventions aimed at improving treatment retention.
   * - ts
     - T
     - S
     - Derived from DisMod-AT/NumPyro model and treatment outcome studies
     - Treatment-associated recovery rate. Estimated from literature on MOUD outcomes and long-term recovery rates. Represents transition to sustained recovery while on treatment.

Data Sources
~~~~~~~~~~~~

.. list-table:: Data Sources and Estimation Methods
   :widths: 20 25 30 25
   :header-rows: 1

   * - Measure
     - Primary Sources
     - Description
     - Notes
   * - prevalence_c562
     - GBD 2021 (COMO)
     - Total prevalence of opioid use disorder
     - Includes both treated and untreated OUD
   * - deaths_c562
     - GBD 2021 (CoDCorrect)
     - Deaths attributed to opioid use disorder
     - Direct OUD deaths; excludes opioid overdose deaths coded separately
   * - population
     - GBD 2021 (Demography)
     - Mid-year population by age/sex/location/year
     - Standard GBD population estimates
   * - treatment_coverage
     - National surveys (NSDUH), treatment records, published studies
     - Proportion of individuals with OUD receiving MOUD
     - May vary by location, age, sex, and setting (community vs. incarcerated)
   * - Transition rates (i, r, ti, tf, ts)
     - NumPyro DisMod-AT-like model
     - Internally consistent transition rates
     - Estimated using Bayesian model that integrates GBD prevalence, treatment coverage, and other available data to solve for consistent set of transition rates
   * - emr_base
     - GBD 2021 (DisMod-MR 2.1)
     - Base excess mortality rate for OUD
     - :math:`\text{EMR} = \frac{\text{CSMR}_{\text{c562}}}{\text{prevalence}_{\text{c562}}}`
   * - Disability weights
     - GBD 2021 (YLD Appendix)
     - Disability weights for OUD sequelae
     - Asymptomatic (0) and symptomatic OUD (0.549)
   * - sequelae_c562
     - GBD 2021 (GBD Mapping)
     - Sequelae for opioid use disorder
     - Asymptomatic and symptomatic opioid dependence

Estimation of Transition Rates Using NumPyro/DisMod-AT
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A key challenge in parameterizing this model is that GBD 2021 does not directly provide all required transition rates (particularly natural remission *r*, treatment initiation *ti*, treatment discontinuation *tf*, and treatment-associated recovery *ts*). To address this, we use a **NumPyro implementation of a DisMod-AT-like model**.

**Methodology**

DisMod-AT (Disease Model – Age-and-Time) is a Bayesian meta-analytic tool designed to synthesize diverse epidemiological data to produce internally consistent transition rates for compartmental disease models. Our NumPyro implementation:

1. **Model Structure**: Configures a three-state compartmental model (Susceptible, With Condition, On Treatment) matching the structure defined above

2. **Input Data**: Incorporates:

   - GBD 2021 prevalence estimates for OUD
   - Treatment coverage ratios (proportion of OUD cases receiving MOUD)
   - GBD 2021 incidence estimates (as prior/constraint)
   - Excess mortality estimates from GBD 2021
   - Literature-based estimates or assumptions about remission and treatment rates

3. **Bayesian Inference**: Uses Markov Chain Monte Carlo (MCMC) sampling to estimate the posterior distribution of all transition rates conditional on:

   - Observed prevalence matching GBD estimates
   - Treatment coverage matching available data
   - Internal consistency constraints (prevalence, incidence, remission, and mortality must be mutually consistent in steady-state or dynamic equilibrium)
   - Prior distributions based on literature and expert knowledge

4. **Output**: Produces full posterior distributions for all transition rates (*i*, *r*, *ti*, *tf*, *ts*) that:

   - Are internally consistent across all model states
   - Match observed prevalence and treatment coverage patterns
   - Respect biological and epidemiological constraints
   - Include uncertainty quantification

**Advantages of This Approach**

- Ensures internal consistency of all epidemiological parameters
- Allows estimation of parameters not directly measured in GBD
- Propagates uncertainty through all model parameters
- Enables sensitivity analysis and scenario testing
- Provides transparent, reproducible parameter estimation

Risk Factor Interactions
+++++++++++++++++++++++++

The OUD cause model interacts with several risk factors and exposures:

**Risk Exposures**

- **With Condition State as Risk Exposure**: The "with_condition" (C) and "on_treatment" (T) states can be used as binary or categorical risk exposures for outcomes such as:

  - Infectious diseases (HIV, hepatitis C)
  - Overdose mortality
  - Incarceration
  - Housing instability
  - Other health and social outcomes

**Effect Modification of Transitions**

Several factors may modify transition rates in the OUD model:

- **Incidence (i)**: May be increased by:

  - Exposure to prescription opioids
  - History of substance use
  - Mental health conditions
  - Adverse childhood experiences
  - Social determinants (poverty, housing instability, incarceration)

- **Treatment Initiation (ti)**: May be increased by:

  - Interventions expanding treatment access
  - Low-barrier treatment programs
  - Outreach and engagement services
  - May be decreased by barriers to treatment (stigma, transportation, cost)

- **Treatment Discontinuation (tf)**: May be reduced by:

  - Interventions improving treatment retention
  - Integrated behavioral health services
  - Peer support and recovery services
  - Stable housing and employment

Assumptions and Limitations
++++++++++++++++++++++++++++

**Key Assumptions**

1. **Three-State Model**: The model simplifies the complex heterogeneity of OUD into three discrete states. In reality, OUD severity exists on a continuum, and individuals may have varying levels of use, dependence, and treatment engagement.

2. **MOUD as Single Treatment State**: The "on_treatment" state aggregates all forms of MOUD (methadone, buprenorphine, naltrexone) despite important differences in effectiveness, retention, and accessibility across these medications.

3. **No Differential Opioid Types**: The model does not distinguish between different opioid types (prescription vs. illicit; heroin vs. fentanyl) or routes of administration (oral vs. injection), which have different risk profiles.

4. **Treatment Effectiveness**: The model assumes that MOUD substantially reduces disability and mortality, potentially to zero in the base case. Actual treatment effectiveness varies by medication type, dosage, adherence, and individual factors.

5. **Steady-State Assumption**: Parameter estimation using DisMod-AT assumes approximate steady state or smooth temporal trends. Rapid changes in the opioid epidemic (e.g., fentanyl emergence) may violate this assumption.

6. **Natural Remission**: The natural remission rate (*r*) represents spontaneous recovery without formal treatment. This is poorly characterized in the literature and is primarily identified through model calibration to match observed prevalence.

**Limitations**

1. **Treatment Coverage Data**: Estimates of the proportion of individuals with OUD receiving MOUD are highly uncertain and vary considerably across settings, populations, and data sources.

2. **Remission Measurement**: Natural remission from OUD is difficult to measure directly, as individuals who recover without treatment are unlikely to be captured in treatment or surveillance systems.

3. **Relapse Dynamics**: The model does not explicitly capture multiple cycles of treatment and relapse, which are common in OUD. Individuals may transition multiple times between states.

4. **Comorbidities**: The model does not explicitly represent common comorbidities (mental health disorders, polysubstance use, infectious diseases) that influence OUD progression and treatment outcomes.

5. **Heterogeneity**: Important sources of heterogeneity (age of onset, severity, social determinants, genetic factors) are not explicitly represented in the basic three-state model.

6. **Overdose Mortality**: While the model includes excess mortality associated with OUD, overdose deaths may be coded separately in mortality data and require careful reconciliation with OUD-attributed deaths.

7. **Intervention Effects**: Estimating the effect of specific interventions on transition rates (e.g., how much does a particular treatment expansion program increase *ti*?) requires additional assumptions and calibration.

**Implications for Interpretation**

Results from this model should be interpreted as population-level estimates capturing average dynamics across heterogeneous individuals. Scenario analyses and interventions should be evaluated based on their effects on transition rates, with careful attention to the assumptions embedded in those rate changes. Uncertainty in parameter estimates (particularly treatment-related transitions) should be thoroughly characterized and propagated through model outputs.

Validation Criteria
+++++++++++++++++++

Model validation should compare simulated outputs to reference data:

1. **Prevalence**: Total OUD prevalence in the simulation (C + T states) should match GBD 2021 prevalence estimates within uncertainty bounds

2. **Treatment Coverage**: The proportion of individuals with OUD in the treatment state (T / (C + T)) should match observed treatment coverage ratios

3. **Cause-Specific Mortality**: Deaths attributed to OUD in the simulation should match GBD 2021 CSMR estimates

4. **Incidence**: Population incidence rate (transitions from S to C) should be consistent with GBD 2021 incidence estimates

5. **Age Patterns**: Age-specific prevalence and incidence should follow observed patterns from GBD and epidemiological studies

6. **Temporal Trends**: If simulating multiple years, trends in prevalence, incidence, and mortality should match observed temporal patterns

Extensions and Modifications
+++++++++++++++++++++++++++++

This base model can be extended to represent additional complexity:

**Treatment Type Stratification**

The "on_treatment" state can be stratified into subtypes:

- Methadone maintenance treatment
- Buprenorphine/naloxone
- Extended-release naltrexone
- Detoxification only

Each treatment type would have distinct transition rates for treatment discontinuation and recovery.

**Severity Stratification**

The "with_condition" state can be stratified by:

- Route of administration (oral, injection)
- Severity level (mild, moderate, severe)
- Opioid type (prescription, heroin, synthetic opioids)

**Dynamic Treatment Access**

Treatment initiation rates can be made time-varying to reflect:

- Policy changes (e.g., Medicaid expansion, increased treatment funding)
- Programmatic interventions (e.g., jail-based MOUD, low-barrier access programs)
- Healthcare system changes

**Mortality Refinement**

Excess mortality can be stratified by:

- Cause (overdose vs. other causes)
- Treatment status
- Time since treatment discontinuation (elevated risk immediately post-treatment)

**Integration with Other Models**

This OUD cause model can be integrated with other simulation components:

- **Quarters Model**: Housing status (private residence, unhoused, incarcerated) affecting transition rates
- **Overdose Model**: Explicit representation of fatal and non-fatal overdose events
- **Infectious Disease Models**: Co-modeling of HIV, hepatitis C transmission among people who inject opioids
- **Treatment System Capacity**: Explicit capacity constraints on treatment availability

References
----------

.. [GBD-2021-Capstone-Opioid]
   Global Burden of Disease Collaborative Network. Global Burden of Disease Study 2021 (GBD 2021).
   Seattle, United States: Institute for Health Metrics and Evaluation (IHME), 2024.

.. [DisMod-Methods]
   James SL, Abate D, Abate KH, et al. Global, regional, and national incidence, prevalence, and years lived with disability for 354 diseases and injuries for 195 countries and territories, 1990–2017: a systematic analysis for the Global Burden of Disease Study 2017. Lancet. 2018;392(10159):1789-1858.

.. [Degenhardt-2019]
   Degenhardt L, Grebely J, Stone J, et al. Global patterns of opioid use and dependence: harms to populations, interventions, and future action. Lancet. 2019;394(10208):1560-1579.

.. [SAMHSA-MOUD]
   Substance Abuse and Mental Health Services Administration. Medications for Opioid Use Disorder. Treatment Improvement Protocol (TIP) Series 63. Publication No. PEP20-02-01-006. Rockville, MD: Substance Abuse and Mental Health Services Administration, 2021.

.. [Wakeman-2020]
   Wakeman SE, Larochelle MR, Ameli O, et al. Comparative Effectiveness of Different Treatment Pathways for Opioid Use Disorder. JAMA Netw Open. 2020;3(2):e1920622.

.. [Sordo-2017]
   Sordo L, Barrio G, Bravo MJ, et al. Mortality risk during and after opioid substitution treatment: systematic review and meta-analysis of cohort studies. BMJ. 2017;357:j1550.

.. [Santo-2021]
   Santo T Jr, Clark B, Hickman M, et al. Association of Opioid Agonist Treatment With All-Cause Mortality and Specific Causes of Death Among People With Opioid Dependence: A Systematic Review and Meta-analysis. JAMA Psychiatry. 2021;78(9):979-993.

.. [Friedman-2022]
   Friedman J, Beletsky L. The Opioid Epidemic: Prevention, Treatment, and Recovery. Annu Rev Public Health. 2022;43:311-337.
