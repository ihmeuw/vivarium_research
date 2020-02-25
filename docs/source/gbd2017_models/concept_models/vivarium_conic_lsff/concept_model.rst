.. _2017_concept_model_vivarium_conic_lsff:

=============================================
Vivarium CoNIC Large Scale Food Fortification
=============================================

Model Overview
--------------

Objective
+++++++++

Intervention Definitions
++++++++++++++++++++++++

Questions of Interest
+++++++++++++++++++++

Scope of Modeling
+++++++++++++++++


Concept Model Diagram
---------------------

.. image:: lsff_concept_model_diagram.svg

Model Components
----------------

Time
++++

* Start and end year: **2020 -- 2025**
* Simulation time step: **1 day** to capture short timeframe of diarrheal
  diseases and neonatal causes

Demographics
++++++++++++

* Locations: **Nigeria, India, Ethiopia**
* Population: **Prospective open cohort of 0-5 year-olds**
* Size of largest starting population: **100,000 simulants**
* Youngest start-age and oldest end-age: **0 -- 5 years**
* Exit age (at what age to stop tracking simulants): **5 years**
* Fertility: **Crude birth rate**

GBD Causes
++++++++++

* :ref:`Measles <2017_cause_measles>`

* :ref:`Diarrheal Diseases <2017_cause_diarrhea>`

* :ref:`Lower Respiratory Infections <2017_cause_lower_respiratory_infections>`

* :ref:`Neural Tube Defects <2017_cause_neural_tube_defects>`

.. note::

  Although the sub-causes of  :ref:`Neonatal Disorders
  <2017_cause_neonatal_disorders>` account for the majority of disease burden in
  the neonatal age groups, we are not explicitly modeling the neonatal causes in
  this simulation. Instead, the relative risks from :ref:`Low Birth Weight and
  Short Gestation <2017_risk_lbwsg>` will directly affect each simulant's
  mortality rate, which indirectly accounts for mortality due to neonatal
  disorders and other causes like meningitis. Since iron fortification affects
  birth weight and hence the relative risk of mortality that a simulant
  experiences, this approach allows us to count how many deaths can be averted
  from an increased birth weight resulting from iron fortification. This
  approach ignores morbidity from neonatal disorders, meningitis, and other
  causes in the neonatal age groups, but YLDs for neonates are negligible
  compared to YLLs (on the order of 100 times smaller), so ignoring YLDs due to
  neonatal disorders and other causes is not a concern.

GBD Risks
+++++++++

* :ref:`Low Birth Weight and Short Gestation <2017_risk_lbwsg>`

PAF-of-1 Cause/Risk Pairs
+++++++++++++++++++++++++

* :ref:`Vitamin A Deficiency / Vitamin A Deficiency <2017_cause_vitamin_a_deficiency>`

* :ref:`Dietary Iron Deficiency / Iron Deficiency <2017_cause_iron_deficiency>`

Risk-Outcome Relationships
++++++++++++++++++++++++++

Coverage Gap Framework
++++++++++++++++++++++

Interventions
+++++++++++++

Vitamin A Fortification
~~~~~~~~~~~~~~~~~~~~~~~

Iron Fortification
~~~~~~~~~~~~~~~~~~

Folic Acid Fortification
~~~~~~~~~~~~~~~~~~~~~~~~

Desired Model Outputs
---------------------

Stratification
++++++++++++++

Stratify by **location, age, sex, and year**.

Observers
+++++++++

Verification and Validation Strategy
------------------------------------
