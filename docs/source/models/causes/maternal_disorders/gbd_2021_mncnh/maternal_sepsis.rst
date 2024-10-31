.. _2021_cause_maternal_sepsis_mncnh:

=============================================
Maternal sepsis and other maternal infections
=============================================

.. contents::
    :local:

Disease Overview
----------------

GBD 2021 Modeling Strategy
--------------------------

Cause Hierarchy
+++++++++++++++

Restrictions
++++++++++++

Vivarium Modeling Strategy
--------------------------

Scope
+++++

The goal of the maternal sepsis model is to capture YLLs and YLDs due to
maternal sepsis (and other maternal infections) among women of
reproductive age. We only model maternal sepsis among simulants who give
(live or still) birth after a full term pregnancy. This page documents
how to model the baseline burden of maternal sepsis. Other simulation
components such as azithromycin and c-sections will affect the rates of
maternal sepsis; such effects will be described on the pages for the
corresponding :ref:`intervention <intervention_models>` or :ref:`risk
effects <risk_effects_models>` model.

Summary of modeling strategy
++++++++++++++++++++++++++++

Since the :ref:`MNCNH Portfolio project
<2024_concept_model_vivarium_mncnh_portfolio>` does not model the
passage of time, we will not model maternal sepsis as a state machine
with dynamic state transitions like our typical cause models. Rather,
all "transitions" in the model will be modeled as decisions made during
a single timestep. To obtain the decision probabilities of each incident
case or maternal sepsis death, we will convert GBD's annual incidence
and mortality rates among women of reproductive age into event rates
*per birth* (including stillbirths). We will track maternal sepsis
deaths to calculate YLLs, and we will track incident cases to calculate
YLDs.

Assumptions and Limitations
+++++++++++++++++++++++++++

Cause Model Diagram
+++++++++++++++++++

Although we're not modeling sepsis dynamically as a finite state
machine, we can draw an analogous directed graph that can be interpreted
as a decision tree rather than a state transition diagram. The main
difference is that the values on the transition arrows represent
decision probabilities rather than rates per unit time. The following
maternal sepsis diagram can be viewed as an extension of the cause model
diagram from the :ref:`pregnancy model
<other_models_pregnancy_closed_cohort_mncnh>` for simulants whose
pregnancy is full term, with the **P** (Pregnant) states of the two
diagrams overlapping.

.. image:: maternal_sepsis_diagram.drawio.svg

Data Tables
+++++++++++

State Definitions
"""""""""""""""""

.. list-table:: State Definitions
    :widths: 5 5 20
    :header-rows: 1

    * - State
      - State Name
      - Definition
    * - P
      - **P**\regnant
      - Simulant has a full term pregnancy as determined by the
        :ref:`pregnancy model
        <other_models_pregnancy_closed_cohort_mncnh>`
    * - Sepsis
      - Sepsis
      - Simulant has maternal sepsis or another maternal infection
    * - D
      - **D**\ead
      - Simulant died of maternal sepsis
    * - Output
      - Output
      - Record information for use in the neonatal model


Calculating Burden
++++++++++++++++++

Years of life lost
"""""""""""""""""""

Years lived with disability
"""""""""""""""""""""""""""

Validation Criteria
+++++++++++++++++++

References
----------
