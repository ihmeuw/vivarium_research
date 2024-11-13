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

.. graphviz::

    digraph sepsis_decisions {
        rankdir = LR;
        pregnant -> "not dead"  [label = "1 - ir"]
        pregnant -> sepsis [label = "ir"]
        sepsis -> "not dead" [label = "1 - cfr"]
        sepsis -> dead [label = "cfr"]
        "not dead" -> "child born"  [label = "1"]
        dead -> "child born"  [label = "1"]
    }

Data Tables
+++++++++++

Calculating Burden
++++++++++++++++++

Years of life lost
"""""""""""""""""""

Years of life lost (YLLs) should be assigned to simulants who die of
maternal sepsis based on their age and theoretical minimum risk life
expectancy at the time of death.

The maternal sepsis YLLs for a simulant who dies of maternal sepsis or
other maternal infections should equal the difference between the
theoretical minimum risk life expectancy for the simulant's age group at
the time of death and the simulant's age at the time of death.

The years of life lost (YLLs) due to maternal sepsis for a simulant who
dies of maternal sepsis or other maternal infections at age :math:`a`
should equal :math:`\operatorname{TMRLE}(a) - a`, where
:math:`\operatorname{TMRLE}(a)` is the theoretical minimum risk life
expectancy for a person of age :math:`a`.

Years lived with disability
"""""""""""""""""""""""""""

Years lived with disability (YLDs) should be accrued by each simulant
with an incident case of maternal sepsis or other maternal infections.
Specifically, the total number of maternal sepsis YLDs accrued by each
infected simlant should be ylds_per_case_c368, which is defined as in
the above data table by

.. math::

    \begin{align*}
    \text{ylds_per_case_c368}
        &= \frac{\text{sepsis YLDs}}{\text{sepsis cases}}\\
        &= \frac{\text{(sepsis YLDs) / person-time}}
            {\text{(sepsis cases) / person-time}}
        = \frac{\text{sepsis YLD rate}}{\text{sepsis incidence rate}}.
    \end{align*}

Since each simulant can get at most one case of maternal sepsis during
the simulation, the number of YLDs accrued by each infected simulant is
the same as the number of YLDs per case. Simulants with a case of sepsis
should accrue YLDs whether or not they die.

Validation Criteria
+++++++++++++++++++

References
----------
