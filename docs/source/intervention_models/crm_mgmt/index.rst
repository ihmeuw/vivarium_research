.. _intervention_crm_mgmt:

==================================================
Cardiometabolic Risk Management Intervention Model
==================================================

This model includes behavioral and pharmaceutical interventions aimed
at: 1) improving blood pressure and LDL-cholesterol control, 2)
increasing exercise, 3) decreasing BMI/weight, 4) improving control of
fasting plasma glucose, and 5) decreasing tobacco use. Intervening to
change an individual's risk factor exposures will improve outcomes for
many GBD causes.

This model requires a simulant to have attributes of: age, sex, SBP,
LDL-C, BMI, FPG, smoking.

It adds attributes of: untreated SBP, untreated LDL-C, untreated BMI,
untreated FPG, untreated smoking, polypill prescription, htn
prescription ramp position, llt prescription, lifestyle modification
education status, medication outreach status, adherence propensity,
adherence status, last measured SBP, last measured LDL-C, follow-up
visit propensity, LDL-C prescription initiation propensity, SBP
prescription initiation propensity, polypill initiation propensity

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - BMI
    - Body Mass Index
    - GBD Risk Factor
  * - FPG
    - Fasting Plasma Glucose
    - GBD Risk Factor
  * - LDL-C
    - Low Density Lipoprotein Cholesterol
    - GBD Risk Factor
  * - LLT
    - Lipid Lowering Therapy
    - Treatment for high LDL-C
  * - SBP
    - Systolic blood pressure
    - GBD Risk Factor


.. todo::

  Fill out table with any abbreviations and their definitions used in this document.

Intervention Overview
-----------------------

Vivarium has been used in several cardiovascular disease simulations
to date, and in this version, we will include pharmaceutical treatment
of high SBP and high LDL Cholesterol with individual and polypill
therapies, as well as education to support lifestyle
modification. Alternative scenarios will consider expanded
implementation of medical outreach, which is known to increase
treatment initiation, as well as expanded access to polypill
treatment, which is known to increase adherence.

.. todo::

  Add to the following table to include known outcomes affected by the intervention, which are **not** in the simulation model, as it is important to recognize potential unmodeled effects of the intervention and note them as limitations as applicable.


.. list-table:: Affected Outcomes
  :widths: 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note (ex: is this relationship direct or mediated?)
  * - SBP
    - additive shift
    - yes
    - there is a “ramp” of increasing intensity of treatments
  * - LDL-C
    - multiplicative shift
    - yes
    - only two values: on treatment or not on treatment
  * - BMI
    - additive?
    - yes
    - [[need more detail on this effect]]
  * - FPG
    - additive?
    - yes
    - [[need more detail on this effect]]
  * - Tobacco
    - ?
    - yes
    - [[need more detail on this effect]]

Baseline Coverage Data
++++++++++++++++++++++++

Baseline coverage of treatments for LDL-C and SBP are substantial and expected to vary by age, sex, and time.  To initialize simulants, researchers will fit a multinomial or logistic regression (as appropriate) to NHANES data, and provide the results to the engineers to use as a prediction of the probability of each treatment for a simulant with a known age, sex, and measured LDL-C and SBP level.

This initialization scheme will require an empirical calibration phase, where the population mean LDL-C and SBP before and after initialization are compared and all simulants have an adjustment applied to their LDL-C and SBP to make sure that the (age, sex)-stratified means in the model with treatment matches the means in the model without treatment.

Baseline coverage of polypill, medication outreach, and lifestyle modification education are all low, and we will assume that they are 0%.

.. list-table:: Baseline coverage data
  :widths: 15 15 15 15 15
  :header-rows: 1

  * - Location
    - Subpopulation
    - Coverage parameter
    - Value
    - Note
  * - USA
    - General Population
    - Hypertension Treatment
    - Ramp distribution from NHANES
    - empirical calibration needed
  * - USA
    - General Population
    - LLT
    - Distribution from NHANES
    - empirical calibration needed
  * - USA
    - General Population
    - Polypill
    - 0.0
    - assumption
  * - USA
    - General Population
    - Medication outreach
    - 0.0
    - assumption
  * - USA
    - General Population
    - Lifestyle modification education
    - 0.0
    - assumption
    

Vivarium Modeling Strategy
--------------------------

.. todo::

  Add an overview of the Vivarium modeling section.

.. todo::

  Fill out the following table with all of the affected measures that have vivarium modeling strategies documented

.. list-table:: Modeled Outcomes
  :widths: 15 15 15 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Outcome type
    - Outcome ID
    - Affected measure
    - Effect size measure
    - Effect size
    - Note
  * - 
    - 
    - 
    - 
    - 
    - 
    - 

Affected Outcome #1
+++++++++++++++++++++

.. important::

  Copy and paste this section for each affected outcome included in this document

.. todo::

  Replace "Risk Outcome Pair #1" with the name of an affected entity for which a modeling strategy will be detailed. For additional risk outcome pairs, copy this section as many times as necessary and update the titles accordingly.

.. todo::

  Link to existing document of the affected outcome (ex: cause or risk exposure model document)

.. todo::

  Describe exactly what measure the intervention will affect

.. todo::

  Fill out the tables below

.. list-table:: Affected Outcome #1 Restrictions
  :widths: 15 15 15
  :header-rows: 1

  * - Restriction
    - Value
    - Note
  * - Male only
    - 
    - 
  * - Female only
    - 
    - 
  * - Age group start
    - 
    - 
  * - Age group end
    - 
    - 
  * - Other
    - 
    - 

.. list-table:: Affected Outcome #1 Effect Size
  :widths: 15 15 15 
  :header-rows: 1

  * - Population
    - Effect size
    - Note
  * - 
    - 
    - 
  * - 
    - 
    - 

.. todo::

  Describe exactly *how* to apply the effect sizes to the affected measures documented above

.. todo::

  Note research considerations related to generalizability of the effect sizes listed above as well as the strength of the causal criteria, as discussed on the :ref:`general research consideration document <general_research>`.

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
