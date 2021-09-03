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
untreated FPG, untreated smoking, polypill prescription, hypertension
prescription ramp position, LLT prescription, lifestyle modification
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
    - [[need more detail on this effect; how to handle mediation]]
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

Baseline coverage of treatments for LDL-C and SBP are substantial and expected to vary by age, sex, and time.  To initialize simulants, researchers will fit a multinomial or logistic regression (as appropriate) to NHANES data, and provide the results to the engineers to use as a prediction of the probability of each treatment for a simulant with a known age, sex, and measured LDL-C and SBP level.  [[Should this also predict which simulants are non-adherent to treatment?]] 

This initialization scheme will also allow initialization of "untreated LDL-C" and "untreated SBP" attributes, which refer to what a simulants risk exposure would be, if they were not receiving treatment.   Individuals who are initialized to be receive treatment will also need to be initialized to have a follow-up visit date somehow.

Baseline coverage of polypill, medication outreach, and lifestyle modification education are all low, and we will assume that they are 0%. (This means that we will can initialize the untreated BMI, FPG, and smoking risk exposures to be equal to the actual BMI, FPG, and smoking exposures.)

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
    - 0.0%
    - assumption
  * - USA
    - General Population
    - Medication outreach
    - 0.0%
    - assumption
  * - USA
    - General Population
    - Lifestyle modification education
    - 0.0%
    - assumption
    

Vivarium Modeling Strategy
--------------------------

.. todo::

  Add an overview of the Vivarium modeling section.
  
.. list-table:: Key parameters for intervention model
  :widths: 15 15 15
  :header-rows: 1

  * - Parameter
    - Data Source
    - Notes
  * - Outpatient visit rate
    - [[Fill in info for all rows in this table]]
    - 
  * - Follow-up visit rate for cardiometabolic risk management 
    - 
    - 
  * - SBP measurement error
    - 
    - 
  * - SBP therapeutic inertia
    - 
    - 
  * - SBP prescription initiation rate
    - 
    - 
  * - SBP adherence rate
    - 
    - 
  * - SBP treatment efficacy
    - 
    - 
  * - SBP baseline coverage rate for each ramp position
    - 
    - 
  * - LDL-C measurement error
    - 
    - 
  * - LDL-C therapeutic inertia
    - 
    - 
  * - LDL-C prescription initiation rate
    - 
    - 
  * - LDL-C adherence rate
    - 
    - 
  * - LDL-C treatment efficacy
    - 
    - 
  * - LDL-C baseline coverage rate
    - 
    - 
  * - Medication outreach effectiveness on prescription initiation
    - 
    - 
  * - Medication outreach baseline coverage
    - 
    - 
  * - Polypill effectiveness on medication adherence
    - 
    - 
  * - Polypill baseline coverage rate
    - 
    - 
  * - Lifestyle Modification Education effectiveness on BMI, FPG, and Tobacco Initiation/Cessation
    - 
    - 
  * - Lifestyle Modification Education baseline coverage rate
    - 
    - 

On each time step, follow this a decision tree to adjust the treatment for a simulant: (a) does simulant interact with health system? Answer depends on outpatient visit rate, emergency visit if simulant had a heart attack, follow-up visit scheduled time and adherence rate.
If (a) is yes, if visit is for an emergency, (b) does provider overcome therapeutic inertia?
If (b) is yes, increase treatment for SBP and/or LDL-C
If (b) is no, (c) does measured SBP and/or measured LDL-C exceed threshold for increased treatment?
If (c) is yes, (d) does provider overcome therapeutic inertia?
If (d) is yes, increase treatment for SBP and/or LDL-C
If treatment was increased for SBP and/or LDL-C, (e) does patient initiate new prescription?
If patient has initiated a prescription (on this timestep or previously), (f) does patient adhere to treatment?
[[to add: schedule follow-up visit, give polypill instead of separate pills, refer to lifestyle medication education, enroll in medical outreach. Also make sure to document data sources for all parameters, e.g. probability simulant has outpatient visit to help answer (a) in simulation.]]

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
  * - SBP
    - 
    - 
    - 
    - 
    - 
    - 
  * - LDL-C
    - 
    - 
    - 
    - 
    - 
    - 
  * - BMI
    - 
    - 
    - 
    - 
    - 
    - 
  * - FPG
    - 
    - 
    - 
    - 
    - 
    - 
  * - Tobacco
    - 
    - 
    - 
    - 
    - 
    - 


Affected Outcome #1 - SBP
+++++++++++++++++++++++++

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


Affected Outcome #2 - LDL-C
+++++++++++++++++++++++++++

.. todo::

  Link to existing document of the affected outcome (ex: cause or risk exposure model document)

.. todo::

  Describe exactly what measure the intervention will affect

.. todo::

  Fill out the tables below

.. list-table:: Affected Outcome #2 Restrictions
  :widths: 15 15 15
  :header-rows: 1

  * - Restriction
    - Value
    - Note
  * - Male only
    - False
    - 
  * - Female only
    - False
    - 
  * - Age group start
    - no restriction
    - 
  * - Age group end
    - no restriction
    - 
  * - Other
    - 
    - 

.. list-table:: Affected Outcome #2 Effect Size
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

Affected Outcome #3 - BMI
+++++++++++++++++++++++++

.. todo::

  Link to existing document of the affected outcome (ex: cause or risk exposure model document)

.. todo::

  Describe exactly what measure the intervention will affect

.. todo::

  Fill out the tables below

.. list-table:: Affected Outcome #3 Restrictions
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

.. list-table:: Affected Outcome #3 Effect Size
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

Affected Outcome #4 - FPG
+++++++++++++++++++++++++

.. todo::

  Link to existing document of the affected outcome (ex: cause or risk exposure model document)

.. todo::

  Describe exactly what measure the intervention will affect

.. todo::

  Fill out the tables below

.. list-table:: Affected Outcome #4 Restrictions
  :widths: 15 15 15
  :header-rows: 1

  * - Restriction
    - Value
    - Note
  * - Male only
    - False
    - 
  * - Female only
    - False
    - 
  * - Age group start
    - unrestricted
    - 
  * - Age group end
    - unrestricted
    - 
  * - Other
    - 
    - 

.. list-table:: Affected Outcome #4 Effect Size
  :widths: 15 15 15 
  :header-rows: 1

  * - Ramp position
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

Affected Outcome #5 - Smoking
+++++++++++++++++++++++++++++

.. todo::

  Link to existing document of the affected outcome (ex: cause or risk exposure model document)

.. todo::

  Describe exactly what measure the intervention will affect

.. todo::

  Fill out the tables below

.. list-table:: Affected Outcome #5 Restrictions
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

.. list-table:: Affected Outcome #5 Effect Size
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
