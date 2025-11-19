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

.. _2023_cause_opioid_use_disorder:

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
  * - DSM-IV-TR
    - Diagnostic and Statistical Manual of Mental Disorders, 4th Edition, Text Revision
    -
  * - ICD-10
    - International Classification of Diseases, 10th Revision
    -

Disease Overview
++++++++++++++++

Opioid Use Disorder (OUD) is a chronic, relapsing substance use disorder characterized by a problematic pattern of opioid use leading to clinically significant impairment or distress. [DSM-5]_ Opioids include prescription pain relievers (e.g., oxycodone, hydrocodone), synthetic opioids (e.g., fentanyl), and illicit drugs (e.g., heroin).

**Clinical Definitions**: Clinical practice has evolved from DSM-IV-TR (which distinguishes "opioid abuse" from "opioid dependence") to DSM-5 (which combines these into a single "opioid use disorder" with severity levels). However, GBD 2023 modeling continues to use DSM-IV-TR criteria for consistency with historical data and international diagnostic standards.

**DSM-5 Criteria** (for reference): DSM-5 defines OUD by the presence of at least 2 of 11 criteria within a 12-month period, including:

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

The severity of OUD is classified as mild (2-3 criteria), moderate (4-5 criteria), or severe (6 or more criteria) in DSM-5.

**DSM-IV-TR Criteria** (used in GBD 2023): Requires at least 3 of 7 criteria for opioid dependence (see GBD 2023 Modeling Strategy section for full criteria).

OUD is a chronic condition with a relapsing and remitting nature, where individuals may cycle between periods of active use, treatment, recovery, and relapse.

Clinical Course and Natural History
------------------------------------

OUD typically follows a chronic course characterized by:

**Initiation**: Initial opioid exposure may occur through legitimate medical use (prescription opioids for pain management) or recreational/illicit use. The transition from initial use to regular use and dependence varies considerably among individuals based on genetic, environmental, and social factors.

**Active Use**: Characterized by regular opioid consumption, development of tolerance, and potential physiological dependence. Individuals may experience escalating use patterns, switching between different opioid types (e.g., from prescription opioids to heroin or fentanyl), and transitions from non-injection to injection use. [Ciccarone-2019]_

**Complications**: OUD is associated with significant morbidity and mortality, including:

- Fatal and non-fatal overdose
- Infectious diseases (HIV, hepatitis C, endocarditis, skin and soft tissue infections)
- Mental health comorbidities (depression, anxiety, post-traumatic stress disorder)
- Social consequences (housing instability, incarceration, unemployment, family disruption)

**Recovery**: Recovery from OUD can occur through various pathways: [Degenhardt-2019]_

- Spontaneous or natural recovery (remission without formal treatment)
- Medication-assisted treatment (also called Medications for Opioid Use Disorder or MOUD) using buprenorphine, methadone, or naltrexone [SAMHSA-MOUD]_
- Behavioral therapies and psychosocial support
- Integrated treatment combining medications and behavioral interventions

**Relapse**: OUD has a high relapse rate, with many individuals experiencing multiple cycles of recovery and return to active use. Relapse risk is elevated during periods of stress, environmental triggers, co-occurring mental health symptoms, and following treatment discontinuation.

Simulation Modeling Approaches for OUD
---------------------------------------

The opioid overdose crisis is driven by an intersecting set of social, structural, and economic forces. Simulation models are a valuable tool to help us understand and address this complex, dynamic, and nonlinear social phenomenon. [Cerda-2022]_ A systematic review of simulation models for opioid use and overdose identified several modeling frameworks used in this domain:

- **Compartmental models** (36% of opioid epidemic models): Track population flows between defined health states (e.g., susceptible, with OUD, on treatment). Most commonly used approach for modeling OUD dynamics at the population level.

- **Markov models** (20% of models): Account for state transitions with memory, allowing transition probabilities to depend on prior states or time spent in current state.

- **System dynamics models** (16% of models): Capture feedback loops and dynamic interactions between substance use patterns, treatment capacity, and policy responses.

- **Agent-based models** (16% of models): Represent individual-level heterogeneity in trajectories, allowing for complex interactions and emergent population-level patterns.

The modeling framework described in this documentation uses a **compartmental model** approach (three-state model: Susceptible, With Condition, On Treatment), which is well-suited for integrating with GBD 2023 estimates and simulating population-level intervention effects. Key methodological considerations for all opioid simulation models include investment in model calibration and validation, transparency in assumptions and mechanics to facilitate reproducibility, and careful attention to potential bias in the choice of parameter inputs.

GBD 2023 Modeling Strategy
+++++++++++++++++++++++++++

GBD 2023 Definition and Diagnostic Criteria
--------------------------------------------

The Global Burden of Disease (GBD) 2023 study defines opioid use disorders as "a maladaptive pattern of opioid abuse, leading to clinically significant impairment or distress that includes symptoms of dependence, such as withdrawal symptoms or progressive tolerance." [GBD-2023-Overview]_ The GBD disease modeling includes cases that meet the diagnostic criteria for opioid dependence as defined by the Diagnostic and Statistical Manual of Mental Disorders, 4th edition, text revision (DSM-IV-TR) and the International Classification of Diseases (ICD-9 and ICD-10).


**DSM-IV-TR Diagnostic Criteria**: To meet the DSM-IV-TR criteria for opioid dependence, at least **three of the following seven symptoms** must be experienced within the same 12-month period:

1. **Tolerance**, characterized by either:

   - A need for increased amounts of the substance to achieve intoxication; or
   - Markedly diminished effect with continued use of the same amount of the substance

2. **Withdrawal**, characterized by either:

   - Withdrawal symptoms characteristic to dependence; or
   - The same (or similar) substance is taken to avoid withdrawal symptoms

3. Substance taken in progressively larger amounts or for longer period
4. Persistent desire or unsuccessful efforts to reduce substance use
5. Disproportionate time dedicated to obtaining the substance
6. Other important activities are given up because of the substance use
7. Substance use is continued despite knowledge of physical or psychological problems occurring as a result of the substance

GBD 2023 Non-Fatal Modeling Strategy
-------------------------------------

The GBD 2023 study uses DisMod-MR 2.1, a Bayesian meta-regression tool, to estimate the epidemiology of opioid use disorder. [DisMod-Methods]_ DisMod-MR 2.1 integrates diverse data sources to produce internally consistent estimates of key epidemiological parameters.

**Key Epidemiological Parameters**

DisMod-MR 2.1 estimates the following parameters for opioid use disorder:

1. **Prevalence**: The proportion of the population with OUD at a given time
2. **Incidence**: The rate at which new cases of OUD develop in the population
3. **Remission**: The rate at which individuals with OUD transition to a non-disorder state
4. **Excess mortality**: The elevated mortality risk associated with OUD beyond background mortality

These parameters are estimated by age, sex, location, and year (1990-2023) and are constrained to be internally consistent through the DisMod-MR 2.1 modeling framework.

**DisMod Prior Settings**

Key modeling assumptions in GBD 2023 include:

- **No incidence or excess mortality before age 15**: Minimum age of onset assumption based on expert feedback and literature
- **No incidence after age 64**: Modeling assumption based on the very low incidence observed at older ages in  data from the European Monitoring Centre for Drugs and Drug Addiction
- **Remission upper limit of 0.2**: Consistent with limits in the dataset
- **Country-level covariates**:

  - Age-standardized prevalence of intravenous drug use (IDU) for prevalence
  - Log-transformed estimates of defined daily doses for statistical purposes (SDDD) of prescribed opioid analgesics (consumption per day per million population) for prevalence
  - Intravenous drug use as covariate for excess mortality rate (EMR)

**Data Sources**

The GBD 2023 estimates incorporate data from systematic reviews and multiple sources:

- **Direct methods**: Population surveys that ask respondents if they use or are dependent on opioids
- **Indirect methods**: Multiplier methods, back-projection, and capture-recapture methods to indirectly estimate total number of opioid users
- **IHME-indirect data**: Created by matching government records of people in opioid substitution therapy with literature sources on percentage of people with opioid dependence in treatment, using spatiotemporal Gaussian process regression (ST-GPR) to estimate coverage
- **Treatment records**: Number of individuals with opioid dependence in substitution therapy (primarily from government sources)
- **Published literature**: OUD prevalence, incidence, and treatment coverage estimates
- **Mortality data**: Vital registration systems and verbal autopsy studies

**Data Adjustment**: Direct survey estimates are adjusted upward using MR-BRT (meta-regression—Bayesian, regularized, trimmed) crosswalk to account for under-ascertainment of highly stigmatized opioid use, based on cross-walks to treatment-based estimates. Surveys tend to underestimate the most harmful and stigmatized forms of illicit drug use.

**Severity Distribution**

GBD 2023 estimates the proportion of individuals with opioid use disorder across three severity levels based on data from the US National Epidemiological Survey on Alcohol and Related Conditions (NESARC) and the Comorbidity and Trauma Study. The severity distribution is: asymptomatic 16% (13-19%), mild 37% (20-55%), and moderate/severe 47% (29-64%).

.. list-table:: Severity Distribution for Opioid Use Disorder
   :widths: 15 15 45 15
   :header-rows: 1

   * - Severity Level
     - Proportion (95% UI)
     - Lay Description
     - Disability Weight (95% CI)
   * - Asymptomatic
     - 16% (13-19%)
     - Individual meets diagnostic criteria but experiences no current symptoms
     - 0
   * - Mild
     - 37% (20-55%)
     - Uses heroin (or methadone) daily and has difficulty controlling the habit. When not using, the person functions normally.
     - 0.335 (0.221-0.473)
   * - Moderate to Severe
     - 47% (29-64%)
     - Uses heroin daily and has difficulty controlling the habit. When the effects wear off, the person feels severe nausea, agitation, vomiting, and fever. The person has a lot of difficulty in daily activities.
     - 0.697 (0.510-0.843)

GBD 2023 Fatal Modeling Strategy
---------------------------------

Fatal burden from OUD is estimated through two pathways:

1. **Direct deaths**: Deaths directly attributed to opioid use disorder (e.g., coded as opioid dependence or harmful use in vital registration data)
2. **Opioid overdose deaths**: Deaths from opioid poisoning/overdose, which are modeled separately and contribute to the overall burden

The Cause of Death Ensemble model (CODEm) is used to estimate cause-specific mortality from OUD, incorporating:

- Vital registration data with ICD-9 and ICD-10 codes for opioid use disorders
- Verbal autopsy data
- Covariates including healthcare access, substance use patterns, and sociodemographic factors

**Excess Mortality Rate (EMR)**

GBD 2023 generates excess mortality rate (EMR) data using the MR-BRT method, stratified by age and sex, with a prior assumption that the Healthcare Access and Quality (HAQ) Index has a negative association with EMR. However, the MR-BRT analysis did not find evidence to support this assumed negative relationship, indicating that the HAQ Index did not significantly impact EMR. As a result, EMR predictions are consistent across locations with both high and low HAQ Index values.

**Covariates for EMR**: Intravenous drug use (IDU) is included as a country-level covariate for EMR, indicating substantially elevated mortality risk among people who inject opioids.

The excess mortality rate for OUD represents the elevated risk of death among individuals with OUD compared to the general population.

Restrictions
------------

.. list-table:: GBD 2023 Cause Restrictions for Opioid Use Disorder
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
+++++++++++++++++++++++++++

Scope
-----

This cause model represents opioid use disorder as a three-state compartmental model capturing susceptibility, active disorder, and treatment states. The model is designed to be compatible with GBD 2023 estimates while allowing for simulation of treatment interventions (Medications for Opioid Use Disorder, or MOUD).

The model captures:

- Incidence of new OUD cases in the susceptible population
- Natural remission from untreated OUD
- Treatment initiation and engagement with MOUD
- Treatment discontinuation
- Treatment-associated recovery
- Excess mortality associated with untreated and treated OUD states

State Definitions
-----------------

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
-------------------

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
      on_treatment -> with_condition [label="Treatment\nDiscontinuation\n(td)"]
      on_treatment -> susceptible [label="Treatment-\nAssociated\nRecovery\n(ts)"]
  }

Transitions
-----------

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
   * - td
     - Treatment discontinuation rate
     - Rate at which individuals receiving MOUD discontinue treatment and return to untreated OUD status. This may occur due to medication side effects, loss of access to treatment, patient choice, or other factors.
   * - ts
     - Treatment-associated recovery rate
     - Rate at which individuals receiving MOUD achieve sustained recovery and transition to the susceptible state. This represents successful treatment outcomes.

State and Transition Data Tables
---------------------------------

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
     - :math:`\text{prevalence}_{\text{c562}} \times (1 - \text{treatment_coverage})`
     - Untreated OUD prevalence (total prevalence × proportion not on treatment)
   * - T
     - Prevalence
     - :math:`\text{prevalence}_{\text{c562}} \times \text{treatment_coverage}`
     - Treated OUD prevalence (total prevalence × proportion on treatment)
   * - S
     - Excess mortality rate (EMR)
     - 0
     - No excess mortality in susceptible state
   * - C
     - Excess mortality rate (EMR)
     - :math:`\text{emr}_{\text{base}} \times (1 + \text{emr_multiplier}_{\text{untreated}})`
     - Elevated EMR for untreated OUD, accounting for increased overdose and other mortality risks
   * - T
     - Excess mortality rate (EMR)
     - 0 or reduced value
     - MOUD substantially reduces mortality risk [Sordo-2017]_ [Santo-2021]_; EMR in the treatment state is assumed to be substantially reduced relative to untreated OUD. In some base-case scenarios we set it to 0 to represent the protective effect of treatment, with sensitivity analyses using non-zero EMR values
   * - S
     - Disability weight
     - 0
     - No disability burden in susceptible state
   * - C
     - Disability weight
     - :math:`\frac{1}{\text{prevalence}_{\text{c562}}} \times \sum\limits_{s \in \text{sequelae}} \text{disability_weight}_s \times \text{prevalence}_s`
     - Weighted average of symptomatic and asymptomatic OUD disability weights
   * - T
     - Disability weight
     - 0 or reduced value
     - MOUD substantially reduces disability [Wakeman-2020]_; disability weight in the treatment state is assumed to be substantially reduced relative to untreated OUD. In some base-case scenarios we set it to 0 to represent an optimistic upper bound on treatment effectiveness, with sensitivity analyses using non-zero disability weights

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
   * - td
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
     - GBD 2023 (COMO)
     - Total prevalence of opioid use disorder
     - Includes both treated and untreated OUD
   * - deaths_c562
     - GBD 2023 (CoDCorrect)
     - Deaths attributed to opioid use disorder
     - Direct OUD deaths; excludes opioid overdose deaths coded separately
   * - population
     - GBD 2023 (Demography)
     - Mid-year population by age/sex/location/year
     - Standard GBD population estimates
   * - treatment_coverage
     - ST-GPR model of percentage of dependents in treatment (if we can find it!)
     - Proportion of individuals with OUD receiving MOUD
     - May vary by location, age, sex, and setting (community vs. incarcerated)
   * - Transition rates (i, r, ti, td, ts)
     - NumPyro DisMod-AT-like model
     - Internally consistent transition rates
     - Estimated using Bayesian model that integrates GBD prevalence, treatment coverage, and other available data to solve for consistent set of transition rates
   * - emr_base
     - GBD 2023 (DisMod-MR 2.1)
     - Base excess mortality rate for OUD
     - :math:`\text{EMR} = \frac{\text{CSMR}_{\text{c562}}}{\text{prevalence}_{\text{c562}}}`
   * - Disability weights
     - GBD 2023 (YLD Appendix)
     - Disability weights for OUD sequelae
     - Asymptomatic (0), mild (0.335), moderate/severe (0.697)
   * - sequelae_c562
     - GBD 2023 (GBD Mapping)
     - Sequelae for opioid use disorder
     - Asymptomatic, mild, and moderate/severe opioid dependence

Estimation of Transition Rates Using NumPyro/DisMod-AT
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A key challenge in parameterizing this model is that GBD 2023 does not directly provide all required transition rates (particularly natural remission *r*, treatment initiation *ti*, treatment discontinuation *td*, and treatment-associated recovery *ts*). To address this, we use a **NumPyro implementation of a DisMod-AT-like model**.

**Methodology**

DisMod-AT (Disease Model – Age-and-Time) is a Bayesian meta-analytic tool designed to synthesize diverse epidemiological data to produce internally consistent transition rates for compartmental disease models. Our NumPyro implementation:

1. **Model Structure**: Configures a three-state compartmental model (Susceptible, With Condition, On Treatment) matching the structure defined above

2. **Input Data**: Incorporates:

   - GBD 2023 prevalence estimates for OUD
   - Treatment coverage ratios (proportion of OUD cases receiving MOUD)
   - GBD 2023 incidence estimates (as prior/constraint)
   - Excess mortality estimates from GBD 2023
   - Literature-based estimates or assumptions about remission and treatment rates

3. **Bayesian Inference**: Uses Markov Chain Monte Carlo (MCMC) sampling to estimate the posterior distribution of all transition rates conditional on:

   - Observed prevalence matching GBD estimates
   - Treatment coverage matching available data
   - Internal consistency constraints (prevalence, incidence, remission, and mortality must be mutually consistent in steady-state or dynamic equilibrium)
   - Prior distributions based on literature and expert knowledge

4. **Output**: Produces full posterior distributions for all transition rates (*i*, *r*, *ti*, *td*, *ts*) that:

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
-------------------------

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

- **Treatment Discontinuation (td)**: May be reduced by:

  - Interventions improving treatment retention
  - Integrated behavioral health services
  - Peer support and recovery services
  - Stable housing and employment

Assumptions and Limitations
----------------------------

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
-------------------

Model validation should compare simulated outputs to reference data:

1. **Prevalence**: Total OUD prevalence in the simulation (C + T states) should match GBD 2023 prevalence estimates within uncertainty bounds

2. **Treatment Coverage**: The proportion of individuals with OUD in the treatment state (T / (C + T)) should match observed treatment coverage ratios

3. **Cause-Specific Mortality**: Deaths attributed to OUD in the simulation should match GBD 2023 CSMR estimates

4. **Incidence**: Population incidence rate (transitions from S to C) should be consistent with GBD 2023 incidence estimates

5. **Age Patterns**: Age-specific prevalence and incidence should follow observed patterns from GBD and epidemiological studies

6. **Temporal Trends**: If simulating multiple years, trends in prevalence, incidence, and mortality should match observed temporal patterns

Extensions and Modifications
-----------------------------

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

**Polysubstance Use Modeling**

The model can be extended to capture polysubstance use, particularly the co-occurring use of opioids with other substances such as methamphetamine, cocaine, benzodiazepines, or alcohol. This is epidemiologically and clinically important, as: [Ellis-2018]_

- Between 1992 and 2017, treatment admissions involving opioid/methamphetamine co-use increased by 10.1 percentage points [Jones-2020]_
- From 1999 to 2020, overdose deaths from combined psychostimulants (primarily methamphetamine) and opioids increased from 187 to 14,777 deaths
- Polysubstance use is associated with treatment discontinuation, increased overdose risk, and distinct patterns of healthcare utilization

**Extension Approaches for Polysubstance Use**:

1. **Joint State Space**: Create a multidimensional state space capturing OUD status (susceptible, with_condition, on_treatment) crossed with other substance use disorders (e.g., methamphetamine use disorder states). This allows modeling of transitions between substance use patterns (e.g., opioid-only use → concurrent opioid-methamphetamine use).

2. **Risk Stratification**: Stratify the "with_condition" and "on_treatment" states by polysubstance use status:

   - Opioid use only
   - Opioid + stimulant use (methamphetamine, cocaine)
   - Opioid + sedative use (benzodiazepines, alcohol)
   - Multiple substance combinations

3. **Modified Transition Rates**: Polysubstance use affects transition rates:

   - **Incidence**: Higher risk of developing OUD among individuals already using other substances
   - **Treatment initiation**: May be lower due to increased severity/complexity
   - **Treatment discontinuation**: Higher rates with concurrent stimulant use
   - **Mortality**: Substantially elevated with concurrent use (especially opioids + benzodiazepines or opioids + stimulants)

4. **Treatment Effectiveness Modification**: MOUD effectiveness may differ for individuals with polysubstance use, requiring different parameterization of treatment success/discontinuation rates.

**Casual Use and Subclinical States**

The base model focuses on opioid use disorder (OUD) as defined by DSM-IV-TR criteria (≥3 of 7 symptoms for dependence; see GBD 2023 definition above). However, the model can be extended to capture casual/recreational opioid use that does not meet diagnostic criteria for OUD. Note that while GBD 2023 uses DSM-IV-TR, clinical extensions may reference DSM-5 criteria (≥2 of 11 symptoms) which is now standard in clinical practice:

**Extension Approaches for Casual Use**:

1. **Four-State Model**: Add a "casual use" state representing non-disordered opioid use:

   - **Susceptible/Never Used**: No history of opioid use
   - **Casual Use**: Recreational/occasional opioid use without meeting OUD criteria (<3 DSM-IV-TR symptoms or 0-1 DSM-5 symptoms)
   - **OUD (Untreated)**: Meets diagnostic criteria for OUD (≥3 DSM-IV-TR symptoms or ≥2 DSM-5 symptoms), not receiving treatment
   - **OUD (On Treatment)**: Receiving MOUD

2. **Transition Pathways**:

   - Susceptible → Casual Use (initiation of non-disordered use)
   - Casual Use → Susceptible (cessation before developing disorder)
   - Casual Use → OUD Untreated (escalation/transition to disorder)
   - OUD Untreated → Casual Use (partial recovery/harm reduction)

3. **Frequency-Dependent Modeling**: Use continuous or ordinal measures of use frequency as predictors of transition to dependence:

   - Research shows a **sigmoid pattern** of dependence probability as a function of use frequency
   - Empirical dependence probabilities can be estimated using Hill functions with governing parameters (PD50 = frequency at which 50% develop dependence)
   - This approach allows modeling the transition from first use → regular use → dependence onset

4. **Clinical Significance**:

   - **Prevalence**: Among lifetime drug users, only ~15-68% (varies by substance) develop dependence [Anthony-1994]_
   - **Intervention Targeting**: Casual use states may benefit from harm reduction and early intervention rather than intensive treatment
   - **Overdose Risk**: Casual users face overdose risk (especially with fentanyl contamination) despite not meeting diagnostic criteria

5. **Data Requirements**:

   - National surveys (e.g., NSDUH) distinguish between "use in past year," "use disorder," and intermediate levels
   - Transition probabilities from casual use to disorder are substance-specific and poorly characterized for opioids [Lopez-Quintero-2011]_
   - Age of initiation, frequency of use, and route of administration are key predictors of transition to disorder

**Methodological Considerations**:

- GBD 2023 uses DSM-IV-TR criteria (≥3 of 7 symptoms), but clinical extensions may use DSM-5 criteria
- DSM-5 provides finer severity gradations: casual use (0-1 symptoms), mild OUD (2-3 symptoms), moderate OUD (4-5 symptoms), and severe OUD (6+ symptoms) that can be operationalized using ordinal severity states
- DSM-5's elimination of the abuse/dependence distinction and creation of a unified disorder with severity levels supports a continuous or graded state representation
- Modeling casual use requires data on non-clinical populations, which may be underrepresented in treatment-seeking samples used to parameterize traditional models
- When extending the model beyond GBD 2023 definitions, researchers should clearly specify which diagnostic criteria (DSM-IV-TR, DSM-5, or ICD-10) are used for each state

**Integration with Other Models**

This OUD cause model can be integrated with other simulation components:

- **Quarters Model**: Housing status (private residence, unhoused, incarcerated) affecting transition rates
- **Overdose Model**: Explicit representation of fatal and non-fatal overdose events
- **Infectious Disease Models**: Co-modeling of HIV, hepatitis C transmission among people who inject opioids
- **Treatment System Capacity**: Explicit capacity constraints on treatment availability

References
++++++++++

.. [GBD-2023-Overview]
   GBD 2023 Disease and Injury and Risk Factor Collaborators. Burden of 375 diseases and injuries, risk-attributable burden of 88 risk factors, and healthy life expectancy in 204 countries and territories, including 660 subnational locations, 1990-2023: a systematic analysis for the Global Burden of Disease Study 2023. Lancet. 2025;406(10513):1873-1922. doi:10.1016/S0140-6736(25)01637-X. `(full text) <https://doi.org/10.1016/S0140-6736(25)01637-X>`__

.. [DisMod-Methods]
   GBD 2017 Disease and Injury Incidence and Prevalence Collaborators. Global, regional, and national incidence, prevalence, and years lived with disability for 354 diseases and injuries for 195 countries and territories, 1990–2017: a systematic analysis for the Global Burden of Disease Study 2017. Lancet. 2018;392(10159):1789-1858. doi:10.1016/S0140-6736(18)32279-7. `(full text) <https://doi.org/10.1016/S0140-6736(18)32279-7>`__

.. [Degenhardt-2019]
   Degenhardt L, Grebely J, Stone J, et al. Global patterns of opioid use and dependence: harms to populations, interventions, and future action. Lancet. 2019;394(10208):1560-1579. doi:10.1016/S0140-6736(19)32229-9. `(full text) <https://doi.org/10.1016/S0140-6736(19)32229-9>`__

.. [SAMHSA-MOUD]
   Substance Abuse and Mental Health Services Administration. Medications for Opioid Use Disorder. Treatment Improvement Protocol (TIP) Series 63. HHS Publication No. PEP21-02-01-002. Rockville, MD: Substance Abuse and Mental Health Services Administration; 2021. `(publication page) <https://library.samhsa.gov/product/tip-63-medications-opioid-use-disorder/pep21-02-01-002>`__ `(full text) <https://www.ncbi.nlm.nih.gov/books/NBK574910/>`__

.. [Wakeman-2020]
   Wakeman SE, Larochelle MR, Ameli O, et al. Comparative Effectiveness of Different Treatment Pathways for Opioid Use Disorder. JAMA Netw Open. 2020;3(2):e1920622. doi:10.1001/jamanetworkopen.2019.20622. `(full text) <https://doi.org/10.1001/jamanetworkopen.2019.20622>`__

.. [Sordo-2017]
   Sordo L, Barrio G, Bravo MJ, et al. Mortality risk during and after opioid substitution treatment: systematic review and meta-analysis of cohort studies. BMJ. 2017;357:j1550. doi:10.1136/bmj.j1550. `(full text) <https://doi.org/10.1136/bmj.j1550>`__

.. [Santo-2021]
   Santo T Jr, Clark B, Hickman M, et al. Association of Opioid Agonist Treatment With All-Cause Mortality and Specific Causes of Death Among People With Opioid Dependence: A Systematic Review and Meta-analysis. JAMA Psychiatry. 2021;78(9):979-993. doi:10.1001/jamapsychiatry.2021.0976. `(full text) <https://doi.org/10.1001/jamapsychiatry.2021.0976>`__

.. [DSM-5]
   American Psychiatric Association. Diagnostic and Statistical Manual of Mental Disorders. 5th ed. Washington, DC: American Psychiatric Publishing; 2013. `(overview) <https://www.psychiatry.org/psychiatrists/practice/dsm>`__

.. [Cerda-2022]
   Cerdá M, Jalali MS, Hamilton AD, et al. A Systematic Review of Simulation Models to Track and Address the Opioid Crisis. Epidemiol Rev. 2022;43(1):147-165. doi:10.1093/epirev/mxab013. `(full text) <https://doi.org/10.1093/epirev/mxab013>`__

.. [Ciccarone-2019]
   Ciccarone D. The triple wave epidemic: Supply and demand drivers of the US opioid overdose crisis. Int J Drug Policy. 2019;71:183-188. doi:10.1016/j.drugpo.2019.01.010. `(full text) <https://doi.org/10.1016/j.drugpo.2019.01.010>`__

.. [Jones-2020]
   Jones CM, Olsen EO, O'Donnell J, Mustaquim D. Resurgent methamphetamine use at treatment admission in the United States, 2008-2017. Am J Public Health. 2020;110(4):509-516. doi:10.2105/AJPH.2019.305527. `(full text) <https://doi.org/10.2105/AJPH.2019.305527>`__

.. [Ellis-2018]
   Ellis MS, Kasper ZA, Cicero TJ. Twin epidemics: The surging rise of methamphetamine use in chronic opioid users. Drug Alcohol Depend. 2018;193:14-20. doi:10.1016/j.drugalcdep.2018.08.029. `(full text) <https://doi.org/10.1016/j.drugalcdep.2018.08.029>`__

.. [Anthony-1994]
   Anthony JC, Warner LA, Kessler RC. Comparative epidemiology of dependence on tobacco, alcohol, controlled substances, and inhalants: basic findings from the National Comorbidity Survey. Exp Clin Psychopharmacol. 1994;2(3):244-268. doi:10.1037/1064-1297.2.3.244. `(full text) <https://doi.org/10.1037/1064-1297.2.3.244>`__

.. [Lopez-Quintero-2011]
   Lopez-Quintero C, Pérez de los Cobos J, Hasin DS, et al. Probability and predictors of transition from first use to dependence on nicotine, alcohol, cannabis, and cocaine: results of the National Epidemiologic Survey on Alcohol and Related Conditions (NESARC). Drug Alcohol Depend. 2011;115(1-2):120-130. doi:10.1016/j.drugalcdep.2010.11.004. `(PubMed) <https://pubmed.ncbi.nlm.nih.gov/21145178/>`__
