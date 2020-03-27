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

* :ref:`Neural Tube Defects <2017_cause_neural_tube_defects>`

* :ref:`Lower Respiratory Infections <2017_cause_lower_respiratory_infections>`

* :ref:`Neonatal Encephalopathy <2017_cause_neonatal_encephalopathy>`

* :ref:`Neonatal Sepsis <2017_cause_neonatal_sepsis>`

* :ref:`Neonatal Jaundice <2017_cause_neonatal_jaundice>`

* :ref:`Other Neonatal Disorders <2017_cause_neonatal_other>`
  (Probably omit this cause, as we don't seem to have enough data to model it)

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

For a dichomotous outcome such as Vitamin A deficiency:

We always define the exposure as bad to match GBD 2017 definitions, so relative risks are always >1 

:math:`C_{vita_baseline}`: coverage of vitamin A fortified food in the population from the literature that is applied to our sim population
:math:`P_{exposure_baseline}`: (1-:math:`C_{vita_baseline}`) prevalence of exposure to unfortified foods in our sim baseline population 
:math:`ϴ_{1}`: risk of vitamin A deficiency among those exposed to unfortified foods (bad food) in our sim population
:math:`ϴ_{0}`: risk of vitamin A deficiency among those unexposed to unfortified foods (have fortification) in our sim population
:math:`ϴ_{GBD}`: risk of vitamin A deficiency in GBD population for age, sex, location, year

RR= reciprocal of effect size (risk ratios) = \frac{1}{0.45(95%CI: 0.19-1.05)}

RR= \frac{:math:`ϴ_{1}`}{:math:`ϴ_{0}`}  we assume this to be true

PAF= \frac{(:math:`P_{exposure_baseline}`(RR-1))}{1+:math:`P_{exposure_baseline}`(RR-1)}	
1-PAF=\frac{1}{(RR-1):math:`P_{exposure_baseline}`+1}	

This equation for PAF is valid under the assumption of no confounding. An alternate equation for PAF should be used when to get an unbiased PAF in the presence of confounding; however, we will need the attributable fraction in the exposed which we do not readily have. (reference Darrow and Steenland 2011). Hence this is a limitation. The RRs we use, and the exposure % we use are approximating the PAFs. We make the assumption that the RRs pulled from literature is generalizable. 

:math:`ϴ_{1}` = :math:`ϴ_{GBD}`*(1-PAF)*RR … (equation 1)
:math:`ϴ_{0}`= :math:`ϴ_{GBD}`*(1-PAF) … (equation 2)

**How to apply the intervention**: the intervention increases the population coverage of vitamin A fortified food (:math:`C_{vita_intevention}`), this shifts the amount of people who receive equation 1 to equation 2. 

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
