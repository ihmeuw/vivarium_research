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

Effect size stratification for baseline population
--------------------------------------------------

From GBD we obtain mean population values for prevalence of vitamin A deficiency, birth prevalence of neural tube defects, and mean haemoglobin levels. Because we are interested in the effect of fortification and there exists baseline coverage of fortification, we must first stratify our population into those who were covered vs not covered by the forticant of interest. We then need to calculate the risk (prevalence) of vitamin A deficiency, risk (birth prevalence) of neural tube defects, and mean haemoglobin levels by coverage strata. 

This method applies to exposures with dichomotous outcomes such as Vitamin A deficiency or neural tube defects:

We always define the exposure as bad to match GBD 2017 definitions, so relative risks are always >1 

:math:`C_{vita_{baseline}}`: coverage of vitamin A fortified food in the population from the literature that is applied to our sim population at baseline

:math:`P_{exposure_{baseline}}`: 1-:math:`C_{vita_{baseline}}` prevalence of exposure to unfortified foods in our sim population at baseline

:math:`ϴ_{1}`: risk of vitamin A deficiency among those exposed to unfortified foods (bad food) in our sim population

:math:`ϴ_{0}`: risk of vitamin A deficiency among those unexposed to unfortified foods (eats fortified foods) in our sim population

:math:`ϴ_{GBD}`: risk of vitamin A deficiency in GBD population for age, sex, location, year

RR= reciprocal of a <1 effect size (risk ratios of prevalence) = :math:`\frac{1}{\text{0.45(95%CI: 0.19-1.05)}}`

RR= :math:`\frac{ϴ_{1}}{ϴ_{0}}` (we assume this to also be true in our sim population)

PAF= :math:`\frac{P_{exposure_{baseline}}(RR-1)}{1+P_{exposure_{baseline}}(RR-1)}`

1-PAF= :math:`\frac{1}{1+P_{exposure_{baseline}}(RR-1)}`

*Important assumptions and limitations* This equation for PAF is valid under the assumption of no confounding. An alternate equation for PAF should be used when to get an unbiased PAF in the presence of confounding; however, we will need the attributable fraction in the exposed which we do not readily have. Hence this is a limitation. The RRs we use, and the exposure % we use are approximating the PAFs. We make the assumption that the RRs pulled from literature is generalizable. 

.. todo::

   reference Darrow and Steenland. Confounding and bias in the attributable fraction. *Epidemiology*. 2011 Jan;22(1):53-8. doi: 10.1097/EDE.0b013e3181fce49b.


risk in (1-:math:`C_{vita}`), exposed group: :math:`ϴ_{1}= ϴ_{GBD}*(1-PAF)*RR` … equation 1

risk in (:math:`C_{vita}`), unexposed group: :math:`ϴ_{0}= ϴ_{GBD}*(1-PAF)` … equation 2

**How to apply the intervention**: the intervention increases the population coverage of vitamin A fortified food, this value --> :math:`C_{vita}`, and shifts the amount of people who receive equation 1 to equation 2. 

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
