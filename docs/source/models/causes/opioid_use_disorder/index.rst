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
  * - DSM-5
    - Diagnostic and Statistical Manual of Mental Disorders, 5th Edition
    -
  * - ICD-10
    - International Classification of Diseases, 10th Revision
    -

Disease Overview
++++++++++++++++

Opioid Use Disorder (OUD) is a chronic, relapsing substance use disorder characterized by a problematic pattern of opioid use leading to clinically significant impairment or distress. [DSM-5]_ Opioids can be natural (e.g. morphine, heroin), semi-synthetic (e.g., oxycodone, hydrocodone), or fully synthetic (e.g., fentanyl) and may be prescription pain relievers or be used as illicit drugs.

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
- Behavioral therapies and psychosocial support
- Medication-assisted treatment (also called Medications for Opioid Use Disorder or MOUD) using buprenorphine, methadone, or naltrexone [SAMHSA-MOUD]_, possibly integrated with behavioral interventions

**Relapse**: OUD has a high relapse rate, with many individuals experiencing multiple cycles of recovery and return to active use.

Simulation Modeling Approaches for OUD
---------------------------------------

The opioid overdose crisis is driven by an intersecting set of social, structural, and economic forces. Simulation models are a valuable tool to help us understand and address this complex, dynamic, and nonlinear social phenomenon. [Cerda-2022]_ A systematic review of simulation models for opioid use and overdose identified several modeling frameworks used in this domain:

- **Compartmental models** (36% of opioid epidemic models): Track population flows between defined health states (e.g., susceptible, with OUD, on treatment). Most commonly used approach for modeling OUD dynamics at the population level.

- **Markov models** (20% of models): Account for state transitions with memory, allowing transition probabilities to depend on prior states or time spent in current state.

- **System dynamics models** (16% of models): Capture feedback loops and dynamic interactions between substance use patterns, treatment capacity, and policy responses.

- **Agent-based models** (16% of models): Represent individual-level heterogeneity in trajectories, allowing for complex interactions and emergent population-level patterns.


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

.. todo::

  Describe ICD-9 and ICD-10 criteria here in similar detail.



GBD 2023 Non-Fatal Modeling Strategy
-------------------------------------

The GBD 2023 study uses DisMod-MR 2.1, a Bayesian meta-regression tool, to estimate the epidemiology of opioid use disorder. [DisMod-Methods]_ DisMod-MR 2.1 integrates diverse data sources to produce internally consistent estimates of key epidemiological parameters (meaning the incidence, prevalence, remission, and excess mortality satisfy the DisMod equations with respect to age, assuming the changes over time are minimal).

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
- **Remission upper limit of 0.2**: Consistent with limits in the DisMod input data
- **Country-level covariates**:

  - Age-standardized prevalence of intravenous drug use (IDU) for prevalence and excess mortality rate (EMR)
  - Log-transformed estimates of defined daily doses for statistical purposes (SDDD) of prescribed opioid analgesics (consumption per day per million population) for prevalence

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

GBD 2023 estimates the proportion of individuals with opioid use disorder across three severity levels based on data from the US National Epidemiological Survey on Alcohol and Related Conditions (NESARC) and the Comorbidity and Trauma Study.

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
     

.. note::

    The lay descriptions refer specifically to heroin, but we assume that these disability weights are the same for other opioids.


GBD 2023 Fatal Modeling Strategy
---------------------------------

Fatal burden from OUD is estimated through two pathways:

1. **Coded to OUD**: Deaths directly attributed to OUD (e.g., coded as F11.20 [Opioid dependence, uncomplicated] or 304.0 [Opioid type dependence])
2. **Opioid overdose deaths**: Deaths from opioid poisoning/overdose, which might not include coding for OUD

The Cause of Death Ensemble model (CODEm) is used to estimate cause-specific mortality from OUD, incorporating:

- Vital registration data with ICD-9 and ICD-10 codes for opioid use disorders
- Verbal autopsy data
- Covariates including healthcare access, substance use patterns, and sociodemographic factors

**Excess Mortality Rate (EMR)**

The excess mortality rate (EMR) for OUD represents the elevated risk of death among individuals with OUD compared to the general population.
GBD 2023 generates EMR estimates using the MR-BRT method, stratified by age and sex, with a prior assumption that the Healthcare Access and Quality (HAQ) Index has a negative association with EMR. However, the MR-BRT analysis did not find evidence to support this assumed negative relationship, indicating that the HAQ Index did not significantly impact EMR. As a result, EMR predictions are consistent across locations with both high and low HAQ Index values.

**Covariates for EMR**: Intravenous drug use (IDU) is included as a country-level covariate for EMR, indicating substantially elevated mortality risk among people who inject opioids.


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

This cause model represents opioid use disorder as a four-state compartmental model capturing susceptible, active disorder, on treatment, and recovery states. The model is designed to be compatible with GBD 2023 estimates while allowing for simulation of medication treatment interventions (Medications for Opioid Use Disorder, or MOUD).

The model captures:

- Incidence of new OUD cases in the susceptible population
- Transitioning from from OUD to Recovery without MOUD
- Treatment initiation and engagement with MOUD
- MOUD Treatment failure
- MOUD Treatment recovery
- Excess mortality associated with untreated and treated OUD states

State Definitions
-----------------

The model includes four mutually exclusive states:

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
   * - R
     - **R**\ecovery (Recovery)
     - Individual is in recovery from opioid use disorder and is not currently receiving MOUD treatment

**State Characteristics**

- **Susceptible (S)**: This state includes individuals who have never had OUD. These individuals face the baseline population risk of developing OUD.

- **With Condition (C)**: This state represents individuals with active, untreated OUD. Individuals in this state:

  - Experience the disability burden associated with symptomatic OUD
  - Face elevated mortality risk (excess mortality)
  - Are at risk for complications including overdose, infectious diseases, and social harms
  - May transition to MOUD or achieve recovery through non-medical treatment or natural remission

- **On Treatment (T)**: This state represents individuals receiving MOUD (methadone, buprenorphine, or naltrexone). Individuals in this state:

  - Have reduced disability burden
  - Have reduced mortality risk compared to untreated OUD
  - May discontinue treatment either through treatment failure (transition back to untreated state) or treatment-assisted  recovery (transition to recovery state)

- **Recovery (R)**: This state represents individuals who are in recovery and are not receiving MOUD. Individuals in this state:

  - Have eliminated disability burden (consistent with treatment effectiveness)
  - Have substantially reduced mortality risk compared to untreated OUD
  - May transition back to with condition state

Cause Model Diagram
-------------------

.. graphviz::

  digraph oud_model {
      rankdir = LR;
      node [shape=box, style=rounded];

      susceptible [label="Susceptible\n(S)"]
      with_condition [label="With Condition\n(Not receiving MOUD)\n(C)"]
      on_treatment [label="On Treatment\n(Receiving MOUD)\n(T)"]
      recovery [label="Recovery state\n(Not receiving MOUD)\n(R)"]

      susceptible -> with_condition [label="Incidence\n(i)"]
      with_condition -> recovery [label="Untreated\nRecovery\n(r1)"]
      with_condition -> on_treatment [label="Treatment\nInitiation\n(ti)"]
      on_treatment -> with_condition [label="Treatment\nFailure\n(tf)"]
      on_treatment -> recovery [label="Treatment-\nAssociated\nRecovery\n(ts)"]
      recovery -> with_condition [label="Relapse\n(r2)"]
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
     - Rate at which susceptible individuals develop opioid use disorder. This represents new cases of OUD arising in the susceptible population.
   * - r1
     - Untreated recovery rate
     - Rate at which individuals without MOUD transition to recovery. Untreated recovery may occur through spontaneous behavior change, informal social support, or other mechanisms.
   * - ti
     - Treatment initiation rate
     - Rate at which individuals with OUD begin medication treatment (MOUD: methadone, buprenorphine, or naltrexone).
   * - tf
     - Treatment failure rate
     - Rate at which individuals receiving MOUD discontinue treatment and return to "With Condition" status. This may occur due to medication side effects, loss of access to treatment, patient choice, or other factors.
   * - ts
     - Treatment-associated recovery rate
     - Rate at which individuals receiving MOUD achieve sustained recovery and transition to the Recovery state. This represents successful treatment outcomes.

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
     - :math:`1 - \text{prevalence}_{\text{lifetime}}`
     - Complement of lifetime OUD prevalence
   * - C
     - Prevalence
     - :math:`\text{prevalence}_{\text{c562}} \times (1 - \text{treatment_coverage})`
     - Untreated OUD prevalence (total prevalence × proportion not on treatment)
   * - T
     - Prevalence
     - :math:`\text{prevalence}_{\text{c562}} \times \text{treatment_coverage}`
     - Treated OUD prevalence (total prevalence × proportion on treatment)
   * - R
     - Prevalence
     - :math:`\text{prevalence}_{\text{lifetime}} - \text{prevalence}_{\text{c562}}`
     - Lifetime OUD prevalence less current OUD prevalence (treated and untreated)
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
   * - R
     - Excess mortality rate (EMR)
     - 0
     - No excess mortality in Recovery state
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
     - \text{disability_weight}_{mild}
     - MOUD substantially reduces disability [Wakeman-2020]_; disability weight in the treatment state is assumed to be substantially reduced relative to untreated OUD. In some base-case scenarios we set it to 0 to represent an optimistic upper bound on treatment effectiveness, with sensitivity analyses using non-zero disability weights
   * - R
     - Disability weight
     - 0
     - No disability burden in recovery state

.. note::

       - Check with GBD modelers, it is unclear if mild disability is appropriate for treatment state
       

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
     - Incidence rate of OUD. Estimated using NumPyro implementation of DisMod-AT-like model.
   * - r1
     - C
     - R
     - Derived from DisMod-AT/NumPyro model
     - Non-MOUD recovery rate for OUD. Not directly available from GBD; estimated using DisMod-AT/NumPyro model.
   * - ti
     - C
     - T
     - Derived from DisMod-AT/NumPyro model and treatment access data
     - Treatment initiation rate. Estimated based on treatment coverage ratios and population-level treatment access data. May vary by setting (community, jail, etc.) and be modified by intervention scenarios.
   * - tf
     - T
     - C
     - Derived from DisMod-AT/NumPyro model and treatment retention studies
     - Treatment failure rate. Estimated from treatment retention/discontinuation studies and calibrated to match observed treatment coverage. Represents a key target for interventions aimed at improving treatment retention.
   * - ts
     - T
     - R
     - Derived from DisMod-AT/NumPyro model and treatment outcome studies
     - Treatment-associated recovery rate. Estimated from literature on MOUD outcomes and long-term recovery rates. Represents transition to sustained recovery while on treatment.
   * - r2
     - R
     - C
     - Derived from DisMod-AT/NumPyro model
     - Relapse rate. 

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
     - Includes both treated and untreated OUD, does not include recovery state
   * - deaths_c562
     - GBD 2023 (CoDCorrect)
     - Deaths attributed to opioid use disorder
     - Direct OUD deaths; excludes opioid overdose deaths coded separately (Double check this!)
   * - population
     - GBD 2023 (Demography)
     - Mid-year population by age/sex/location/year
     - Standard GBD population estimates
   * - treatment_coverage
     - ST-GPR model of percentage of dependents in treatment (if we can find it!)
     - Proportion of individuals with OUD receiving MOUD
     - This covariate is mentioned in the description of the IHME-indirect data creation in the Supplementary Appendix section on OUD
   * - Transition rates (i, r1, ti, td, ts, r2)
     - NumPyro DisMod-AT-like model
     - Internally consistent transition rates
     - Estimated using Bayesian model that integrates GBD prevalence, treatment coverage, and other available data to solve for consistent set of transition rates
   * - emr_base
     - GBD 2023 (DisMod-MR 2.1)
     - Base excess mortality rate for OUD
     - Does this satisfy :math:`\text{EMR} = \frac{\text{CSMR}_{\text{c562}}}{\text{prevalence}_{\text{c562}}}`??  Maybe there is a distinction between "direct" OUD deaths and opioid overdose deaths.
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

A key challenge in parameterizing this model is that GBD 2023 does not directly provide all required transition rates (particularly non-MOUD recovery *r1*, treatment initiation *ti*, treatment failure *tf*, treatment-associated recovery *ts*, and relapse *r2*). To address this, we use a **NumPyro implementation of a DisMod-AT-like model**.

**Methodology**

DisMod-AT (Disease Model – Age-and-Time) is a Bayesian meta-analytic tool designed to synthesize diverse epidemiological data to produce internally consistent transition rates for compartmental disease models. Our NumPyro implementation:

1. **Model Structure**: Configures a four-state compartmental model (Susceptible, With Condition, On Treatment, Recovery) matching the structure defined above

2. **Input Data**: Incorporates:

   - GBD 2023 prevalence estimates for OUD
   - Treatment coverage ratios (proportion of OUD cases receiving MOUD)
   - GBD 2023 incidence estimates (as prior/constraint)
   - Excess mortality estimates from GBD 2023
   - Literature-based estimates or assumptions about remission and treatment rates

3. **Bayesian Inference**: Uses Markov Chain Monte Carlo (MCMC) sampling to estimate the posterior distribution of all transition rates conditional on:

   - Observed prevalence matching GBD estimates
   - Treatment coverage matching available data
   - Internal consistency constraints (prevalence, incidence, remission, and mortality must be mutually consistent in dynamic equilibrium)
   - Weakly informative prior distributions to help with convergence

Assumptions and Limitations
----------------------------

**Key Assumptions**

1. **Four-State Model**: The model simplifies the complex heterogeneity of OUD into four discrete states. In reality, OUD severity exists on a continuum, and individuals may have varying levels of use, dependence, and treatment engagement.

2. **MOUD as Single Treatment State**: The "on_treatment" state aggregates all forms of MOUD (methadone, buprenorphine, naltrexone) despite important differences in effectiveness, retention, and accessibility across these medications.

3. **No Differential Opioid Types**: The model does not distinguish between different opioid types (prescription vs. illicit; heroin vs. fentanyl) or routes of administration (oral vs. injection), which have different risk profiles.

4. **Treatment Effectiveness**: The model assumes that MOUD substantially reduces disability and mortality. Actual treatment effectiveness varies by medication type, dosage, adherence, and individual factors.

5. **Transition to Recovery without Medication**: The non-medication remission rate (*r*) represents transition to recovery without medication treatment. This is poorly characterized in the literature and is primarily identified through model calibration to match observed prevalence.

**Limitations**

1. **Treatment Coverage Data**: Estimates of the proportion of individuals with OUD receiving MOUD are highly uncertain and vary considerably across settings, populations, and data sources.

2. **Comorbidities**: The model does not explicitly represent common comorbidities (mental health disorders, polysubstance use, infectious diseases) that influence OUD progression and treatment outcomes.

6. **Overdose Mortality**: While the model includes excess mortality associated with OUD, overdose deaths may be coded separately in mortality data and require careful reconciliation with OUD-attributed deaths.


Validation Criteria
-------------------

Model validation should compare simulated outputs to reference data:

1. **Prevalence**: Total OUD prevalence in the simulation (C + T states) should match GBD 2023 prevalence estimates within uncertainty bounds

2. **Treatment Coverage**: The proportion of individuals with OUD in the treatment state (T / (C + T)) should match observed treatment coverage ratios

3. **Cause-Specific Mortality**: Deaths attributed to OUD in the simulation should match GBD 2023 CSMR estimates

TODO: add YLD, disability weights, and DALYs.  Figure out if there is something meaningful to check about EMR.

4. **Incidence**: Population incidence rate (transitions from S to C) should be consistent with GBD 2023 incidence estimates

5. **Age Patterns**: Age-specific prevalence and incidence should follow observed patterns from GBD and epidemiological studies

6. **Temporal Trends**: Trends in prevalence, incidence, and mortality should match observed temporal patterns


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
