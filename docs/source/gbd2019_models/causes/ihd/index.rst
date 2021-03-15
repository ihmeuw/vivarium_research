.. _2019_cause_ihd:

======================
Ischemic Heart Disease
======================

.. contents::
   :local:
   :depth: 1


.. list-table:: Abbreviations
   :widths: 15 15 15
   :header-rows: 1

   * - Abbreviation
     - Definition
     - Notes
   * - IHD
     - Ischemic heart disease
     - 
   * - MI
     - Myocardial infarction
     - 
   * - AMI
     - Acute myocardial infarction
     - 


Disease Overview
----------------

Ischemic heart disease (IHD) is a non-communicable cardiovascular disease which occurs when the arteries of the heart cannot deliver enough oxygen-rich blood to the heart. Since 1990, this disease has been a leading cause of global Years of Life Lost (YLL). GBD 2019 listed IHD as the leading cause of YLLs globally, with a mean percentage increase of 4.19% in all-age YLL rate since 2007. According to NIH_, IHD is also known as Coronary Artery Disease, Coronary Heart Disease, and Coronary Microvascular Disease. Symptoms and complications can vary by person, even if they have the same type of ischemic heart disease. Reported symptoms vary whether a person is experiencing an acute coronary event, such as a heart attack, or has chronic IHD. Symptoms may get worse as the buildup of plague continues to narrow the coronary arteries. 

Acute coronary events may cause symptoms such as angina, cold sweats, dizziness, nausea, neck pain, shortness of breath, sleep disturbances, or weakness. 

Chronic ischemic heart disease can cause signs and symptoms such as angina, anxiety or nervousness, fatigue, or neck pain. 

.. _NIH: https://www.nhlbi.nih.gov/health-topics/ischemic-heart-disease

GBD 2019 Modeling Strategy
--------------------------

.. todo::

  Add an overview of the GBD modeling section.

Cause Hierarchy
+++++++++++++++
.. image:: cause_hierarchy_ihd.svg

Restrictions
++++++++++++

The following table describes any restrictions in GBD 2019 on the effects of
this cause (such as being only fatal or only nonfatal), as well as restrictions
on the ages and sexes to which the cause applies.

.. list-table:: GBD 2019 Cause Restrictions
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
     - [15, 20), age_group_id=8
   * - YLL age group end
     - 125
     - [95, 125 years), age_group_id=235
   * - YLD age group start
     - 15
     - [15, 20), age_group_id=8
   * - YLD age group end
     - 125
     - [95, 125 years), age_group_id=235


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
+++++++++++++++++++

MI
"""""""""""

.. image:: cause_model_mi.svg

Angina
"""""""""""

.. image:: cause_model_angina.svg

State and Transition Data Tables
++++++++++++++++++++++++++++++++

Definitions
"""""""""""

.. list-table:: State Definitions
   :widths: 1, 10, 15
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - **S**\ usceptible
     - Susceptible to IHD
   * - A
     - **A**\ cute Myocardial Infarction (MI)
     - Simulant that experiences acute MI symptoms
   * - P
     - **P**\ ost-MI IHD
     - Simulant that experiences angina and asymptomatic ischemic heart
       disease following myocardial infarction; survival to 28 days following
       incident MI
   * - S2
     - **S**\ usceptible
     - Susceptible to IHD
   * - A2
     - **A**\ ngina
     - Sequelae

States Data
"""""""""""

.. list-table:: State Data
   :widths: 5 10 10 20
   :header-rows: 1

   * - State
     - Measure
     - Value
     - Notes
   * - All
     - cause-specific mortality rate
     - :math:`\frac{\text{deaths_c493}}{\text{population}}`
     -
   * - P
     - excess mortality rate
     - emr_m15755
     -
   * - A
     - excess mortality rate
     - emr_m24694
     -
   * - S
     - excess mortality rate
     - 0
     -
   * - A2
     - excess mortality rate
     - emr_m1817
     -
   * - S2
     - excess mortality rate
     - 0
     -
   * - P
     - disability weight
     - :math:`\frac{1}{\text{prevalence_c493}} \times \sum\limits_{s \in post-mi-sequelae} \text{disability_weight}_s \cdot \text{prevalence}_s`
     -
   * - A
     - disability weight
     - :math:`\frac{1}{\text{prevalence_c493}} \times \sum\limits_{s\in acute-sequelae} \text{disability_weight}_s \cdot \text{prevalence}_s`
     -
   * - S
     - disability weight
     - 0
     -
   * - A2
     - disability weight
     - :math:`\frac{1}{\text{prevalence_c493}} \times \sum\limits_{s\in angina-sequelae} \text{disability_weight}_s \cdot \text{prevalence}_s`
     -
   * - S2
     - disability weight
     - 0
     -
   * - P
     - prevalence
     - :math:`\sum\limits_{s\in post-mi-sequelae} \text{prevalence}_s`
     -
   * - A
     - prevalence
     - :math:`\sum\limits_{s\in acute-sequelae} \text{prevalence}_s`
     -
   * - S
     - prevalence
     - 1-prevalence_493
     - simulants not prevalent with IHD
   * - A2
     - prevalence
     - :math:`\sum\limits_{s\in angina-sequelae} \text{prevalence}_s`
     -
   * - S2
     - prevalence
     - 1-prevalence_493
     - simulants not prevalent with IHD

Transition Data
"""""""""""""""

.. list-table:: Transition Data
   :widths: 10 10 10 10 10
   :header-rows: 1

   * - Transition
     - Source State
     - Sink State
     - Value
     - Notes
   * - 1
     - S
     - A
     - incidence_c493
     -
   * - 2
     - A
     - P
     - 28 days
     - duration-based transition from acute state then progress into post state
   * - 3
     - P
     - A
     - incidence_493
     -
   * - 4
     - S2
     - A2
     - incidence_493
     -

Data Sources
""""""""""""

.. list-table:: Data Sources and Definitions
   :widths: 10 10 20 20
   :header-rows: 1

   * - Variable
     - Source
     - Description
     - Notes
   * - prevalence_c493
     - como
     - prevalence of ischemic heart disease
     -
   * - deaths_c493
     - codcorrect
     - Count of deaths due to ischemic heart disease
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
   * - incidence_493
     - como
     - Incidence of ischemic heart disease
     -
   * - emr_m15755
     - dismod-mr
     - excess-mortality rate of post-MI ischemic heart disease
     -
   * - emr_m24694
     - dismod-mr
     - excess-mortality rate of MI due to ischemic heart disease
     -
   * - emr_m1817
     - dismod-mr
     - excess-mortality rate of angina due to ischemic heart disease
     -
   * - acute-sequelae
     - model assumption
     - {s378, s379}
     -
   * - post-mi-sequelae
     - model assumption
     - {s383, s384, s385, s1040, s5726}
     -
   * - angina-sequelae
     - model assumption
     - {s380, s381, s382, s953}
     -


Validation Criteria
+++++++++++++++++++

.. todo::

  Add in validation criteria

References
----------

.. todo::

  Update references to GBD 2019 once published
