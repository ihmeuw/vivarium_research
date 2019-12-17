.. _2017_cause_neonatal_encephalopathy:

==============================================================
Neonatal encephalopathy due to birth asphyxia and birth trauma
==============================================================

Disease Description
-------------------

Case definition in GBD 2017
+++++++++++++++++++++++++++

Neonatal encephalopathy (NE) due to birth asphyxia and birth trauma, also called
hypoxic-ischaemic encephalopathy, is defined as injury to the brain in the first
few moments or days of life in an infant born at term. NE has multiple
aetiologies and is defined more by its symptoms -- abnormal neurological
function, including reduced level of consciousness, seizures, depression of tone
and reflexes, or difficulty maintaining respiration -- than its origin. NE can
occur when an infant is deprived of oxygen during delivery or sustains physical
trauma to the head, among other causes.

.. todo::
   Add more information about neonatal encephalopathy. Here are some informative links, found by googling "neonatal encephalopathy":

   - https://www.rileychildrens.org/health-info/neonatal-encephalopathy
   - https://www.uptodate.com/contents/clinical-features-diagnosis-and-treatment-of-neonatal-encephalopathy
   - https://pediatrics.aappublications.org/content/133/5/e1482
   - https://en.wikipedia.org/wiki/Neonatal_encephalopathy

Modeling neonatal encephalopathy in GBD 2017
--------------------------------------------

.. todo::
   Describe GBD modeling process.

Cause Model Diagram
-------------------

There are two possible states for this cause, **with-condition**,  and
**free-of-condition**:

.. image:: neonatal_encephalopathy_cause_model_diagram.svg

There is no transition between the states. **Thus, incidence and remission
rates are zero.**

Data Description
----------------

State and Transition Data Tables
++++++++++++++++++++++++++++++++

.. list-table:: State Definitions
   :widths: 1, 5, 10
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - C
     - With **C**\ ondition
     - Infant developed encephalopathy
   * - F
     - **F**\ ree of Condition
     - Infant did not develop encephalopathy

.. list-table:: State Data
   :widths: 1, 5, 5, 10
   :header-rows: 1

   * - State
     - Measure
     - Value
     - Notes
   * - C
     - prevalence
     - prevalence_c382
     -
   * - C
     - birth prevalence
     - birth_prevalence_c382
     -
   * - C
     - excess mortality rate
     - :math:`\frac{\text{deaths_c382}}{\text{population} \,\times\, \text{prevalence_c382}}`
     - = (cause-specific mortality rate) / prevalence
   * - C
     - disability weight
     - :math:`\displaystyle{\sum_{s\in \text{sequelae_c382}}} \scriptstyle{\text{disability_weight}_s \,\times\, \text{prevalence}_s}`
     - = average disability weight over all sequelae
   * - F
     - prevalence
     - 1 -- prevalence_c382
     -
   * - F
     - birth prevalence
     - 1 -- birth_prevalence_c382
     -
   * - F
     - excess mortality rate
     - 0
     -
   * - F
     - disability weight
     - 0
     -
   * - All
     - cause-specific mortality rate
     - :math:`\frac{\text{deaths_c382}}{\text{population}}`
     -

.. list-table:: Transition Data
   :widths: 1, 1, 1, 5, 10
   :header-rows: 1

   * - Transition
     - Source State
     - Sink State
     - Value
     - Notes
   * - N/A
     - N/A
     - N/A
     - N/A
     - N/A

.. list-table:: Data Sources and Definitions
   :widths: 1, 3, 10, 10
   :header-rows: 1

   * - Value
     - Source
     - Description
     - Notes
   * - prevalence_c382
     - como
     - Prevalence of neonatal encephalopathy
     -
   * - birth_prevalence_c382
     - como
     - Birth prevalence of neonatal encephalopathy
     - age_group_id = 164 (at birth) and measure = 6 (incidence)
   * - deaths_c382
     - codcorrect
     - Deaths from neonatal encephalopathy
     -
   * - population
     - demography
     - Mid-year population for given age/sex/year/location
     -
   * - sequelae_c382
     - gbd_mapping
     - List of 17 sequelae for neonatal encephalopathy
     -
   * - prevalence_s{`sid`}
     - como
     - Prevalence of sequela with id `sid`
     -
   * - disability_weight_s{`sid`}
     - YLD Appendix
     - Disability weight of sequela with id `sid`
     -
