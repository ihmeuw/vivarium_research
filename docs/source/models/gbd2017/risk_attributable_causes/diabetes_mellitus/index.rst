.. _2017_cause_diabetes_mellitus:

======================
Diabetes Mellitus (DM)
======================

WHO defines Diabetes Mellitus (DM) as a chronic, metabolic disease characterized by elevated levels of blood glucose (or blood sugar), which leads over time to serious damage to the heart, blood vessels, eyes, kidneys, and nerves. The most common is type 2 diabetes, usually in adults, which occurs when the body becomes resistant to insulin or doesn't make enough insulin. In the past three decades the prevalence of type 2 diabetes has risen dramatically in countries of all income levels. Type 1 diabetes, once known as juvenile diabetes or insulin-dependent diabetes, is a chronic condition in which the pancreas produces little or no insulin by itself. [WHO-Diabetes-Definition]_

GBD 2017 Modeling Strategy
--------------------------

According to GBD 2017, the case definitions and diagnostic criteria for overall diabetes mellitus, type 1 diabetes mellitus, and type 2 diabetes mellitus are presented differently. The overall diabetes mellitus model is defined as fasting plasma glucose (FPG) > 126 mg/dL (7 mmol/L) or being on treatment for diabetes. The overall type 1 diabetes mellitus model is defined as cases of DM that are on insulin or diagnosed with a biomarker (eg, c-peptide levels) that is not fasting plasma glucose. Type 2 diabetes mellitus cases are those that are not reported as type 1 diabetes mellitus. [GBD-2017-YLD-Capstone-Appendix-1-Diabetes-Mellitus]_



Cause Hierarchy
+++++++++++++++
.. image:: cause_hierarchy_dm.svg

Restrictions
++++++++++++

The following table describes any restrictions in GBD 2017 on the effects of
this cause (such as being only fatal or only nonfatal), as well as restrictions
on the ages and sexes to which the cause applies. If sub cause restrictions vary, then the conflicting restrictions are noted below. 

.. list-table:: GBD 2017 Cause Restrictions
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
   * - YLL age group start (DM Type 1)
     - Early Neonatal
     - (0, 6 days], age_group_id = 2
   * - YLL age group start (DM Type 2)
     - 15 to 19
     - (15, 19], age_group_id = 8
   * - YLL age group end
     - 95 plus
     - (95, 125], age_group_id = 235
   * - YLD age group start
     - Early Neonatal
     - (0, 6 days], age_group_id = 2
   * - YLD age group end
     - 95 Plus
     - (95, 125], age_group_id = 235

Vivarium Modeling Strategy
--------------------------

Scope
+++++
.. todo::

  Describe which aspects of the disease this cause model is designed to
  simulate, and which aspects it is **not** designed to simulate.

Assumptions and Limitations
+++++++++++++++++++++++++++

.. todo::

  Describe the clinical and mathematical assumptions made for this cause model,
  and the limitations these assumptions impose on the applicability of the
  model.

Cause Model Diagram
-------------------

.. image:: cause_model_dm.svg


Data Description
----------------

.. todo::

  Confirm with the RT/SE that simulants cannot transition from C1 to C2 ot C2 to C1 and that C3 should/should not be included in the Data Description tables.

State and Transition Data Tables
++++++++++++++++++++++++++++++++

.. list-table:: State Definitions
   :widths: 1, 10, 10
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - **S**\ usceptible
     - Susceptible to Diabetes Mellitus
   * - C
     - With **C**\ ondition of Diabetes Mellitus
     - Transient with condition
   * - M
     - **M**\ oderate
     - Simulant is with condition of Uncomplicated Diabetes Mellitus, based on 'uncomplicated' sequelae of Diabetes Mellitus Type 1 and Type 2
   * - Sev
     - **S**\ evere
     - Simulant is with condition of Severe Diabetes Mellitus, based on all other sequelae of Diabetes Mellitus Type 1 and Type 2

.. list-table:: State Severity Split Definitions
   :widths: 5 10 10 20
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - **S**\ usceptible
     - Susceptible to Diabetes Mellitus
     - 
   * - C
     - With **C**\ ondition of Diabetes Mellitus
     - :math:`\displaystyle{\sum_{s\in \text{sequelae_c587}}}`
   * - M
     - **M**\ oderate
     - sequelae_mod = [s_5441, s_5465]
   * - Sev
     - **S**\ evere
     - sequelae_sev = [s_5429, s_5432, s_s5435, s_5438, s_5444, s_5447, s_5450, s_5453, s_5456, s_5459, s_5462, s_5468, s_5471, s_5474]

.. list-table:: State Data
   :widths: 5 10 10 20
   :header-rows: 1

   * - State
     - Measure
     - Value
     - Notes
   * - S
     - simulants not prevalent with overall Diabetes Mellitus
     - 1 - prevalence_c587
   * - C 
     - prevalence
     - prevalence_c587
     - 
   * - M 
     - prevalence
     - :math:`\frac{\sum_{s\in \text{prevalence_sequelae_mod.sub_causes.c587}}}{\scriptstyle{\text{prevalence_c587}}}` 
     - = (prevalence of Diabetes Mellitus Type 1 uncomplicated sequelae + prevalence of Diabetes Mellitus Type 2 uncomplicated sequelae) / prevalence of overall Diabetes Mellitus  
   * - Sev
     - prevalence
     - :math:`\frac{\sum_{s\in \text{prevalence_sequelae_sev.sub_causes.c587}}}{\scriptstyle{\text{prevalence_c587}}}`
     - 
   * - All
     - cause-specific mortality rate (csmr)
     - csmr_c587
     - Notes
   * - Sev
     - prevalence
     - prevalence_c975
     - - = (prevalence of Diabetes Mellitus Type 1 non-uncomplicated sequelae + CKD end stage sequelae) / prevalence of CKD 
   * - C1
     - excess mortality rate
     - :math:`\frac{\text{deaths_c975}}{\text{population} \,\times\, \text{prevalence_c975}}`
     - - = (prevalence of CKD stage V sequelae + CKD end stage sequelae) / prevalence of CKD 
   * - C1
     - disability weight
     - :math:`\displaystyle{\sum_{s\in \text{sequelae_c975}}} \scriptstyle{\text{disability_weight}_s \,\times\, \text{prevalence}_s}`
     -
   * - C2
     - prevalence
     - prevalence_c976
     -
   * - C2
     - excess mortality rate
     - :math:`\frac{\text{deaths_c976}}{\text{population} \,\times\, \text{prevalence_c976}}`
     -
   * - C2
     - disability weight
     - :math:`\displaystyle{\sum_{s\in \text{sequelae_c976}}} \scriptstyle{\text{disability_weight}_s \,\times\, \text{prevalence}_s}`
     -
   * - All C1
     - cause-specific mortality rate
     - :math:`\frac{\text{deaths_c975}}{\text{population}}`
     -
   * - All C2
     - cause-specific mortality rate
     - :math:`\frac{\text{deaths_c976}}{\text{population}}`
     -

.. list-table:: Transition Data
   :widths: 10 10 10 10 10
   :header-rows: 1

   * - Transition
     - Source State
     - Sink State
     - Value
     - Notes
   * - 1
     - susceptible
     - With **C**\ ondition of type 1 diabetes mellitus
     - incidence_c975
     -
   * - 2
     - susceptible
     - With **C**\ ondition of type 2 diabetes mellitus
     - incidence_c976
     -
   * - 3
     - With **C**\ ondition of type 2 diabetes mellitus
     - susceptible
     - :math:`\frac{\text{prevalence_c975}}{\text{prevalence_c587}}{\text{remission_c976}}`
     - This needs to be clarified further with the RT/SE teams

.. list-table:: Data Sources and Definitions
   :widths: 10 10 20 20
   :header-rows: 1

   * - Variable
     - Source
     - Description
     - Notes
   * - prevalence_c975
     - como
     - prevalence of type 1 diabetes mellitus
     -
   * - prevalence_c976
     - como
     - Prevalence of type 2 diabetes mellitus
     - 
   * - deaths_c975
     - codcorrect
     - Count of deaths due to type 1 diabetes mellitus
     - 
   * - deaths_c976
     - codcorrect
     - Count of deaths due to type 2 diabetes mellitus
     - 
   * - population
     - demography
     - Mid-year population for given sex/age/year/location
     - 
   * - prevalence_s{sid}
     - como
     - Prevalence of sequela with id {id}
     - 
   * - disability_weight_s{sid}
     - YLD appendix
     - Disability weight of sequela with id {id}
     - 

Validation Criteria
-------------------

References
----------

.. [WHO-Diabetes-Definition]
    Retrieved 30 Jan 2020.
    https://www.who.int/health-topics/diabetes

.. [GBD-2017-YLD-Capstone-Appendix-1-Diabetes-Mellitus]
    Supplement to: `GBD 2017 Disease and Injury Incidence and Prevalence
    Collaborators. Global, regional, and national incidence, prevalence, and
    years lived with disability for 354 diseases and injuries for 195 countries
    and territories, 1990–2017: a systematic analysis for the Global Burden of
    Disease Study 2017. Lancet 2018; 392: 1789–858`
    (pp. 559-572)