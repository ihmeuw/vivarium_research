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

The years of life lost (YLLs) due to maternal sepsis for a simulant who
dies of maternal sepsis or other maternal infections at age :math:`a`
should equal :math:`\operatorname{TMRLE}(a) - a`, where
:math:`\operatorname{TMRLE}(a)` is the theoretical minimum risk life
expectancy for a person of age :math:`a`.

Years lived with disability
"""""""""""""""""""""""""""

For simplicity, each simulant with an incident case of maternal sepsis
or other maternal infections in a given age group  will accrue the same
number of years lived with disability (YLDs). Specifically, the total
number of maternal sepsis YLDs accrued by each infected simulant should
be the average number of YLDs per case of maternal sepsis in the
simulant's age group, which is defined in the above data table as

.. math::

    \begin{align*}
    \text{ylds_per_case_c368}
        &= \frac{\text{sepsis YLDs}}{\text{sepsis cases}}\\
        &= \frac{\text{(sepsis YLDs) / person-time}}
            {\text{(sepsis cases) / person-time}}
        = \frac{\text{sepsis YLD rate}}{\text{sepsis incidence rate}}.
    \end{align*}

We are using the fact that  each simulant can get at most one case of
maternal sepsis during the simulation, so the average number of YLDs per
infected simulant is the same as the average number of YLDs per case.
Simulants with a case of sepsis should accrue YLDs whether or not they
die.

.. admonition:: Limitation

    The above strategy of computing average maternal sepsis YLDs per
    case should correctly capture total YLDs for the acute sequelae
    "puerperal_sepsis" and "other_maternal_infections". However, **when
    we compute averted YLDs, the above calculation will not correctly
    count secondary infertility YLDs from the long-term sequela
    "infertility_due_to_puerperal_sepsis"**, for two reasons:

    #. Infertility YLDs for a given age group will include infertility
       triggered not only by sepsis cases caused by current births, but
       by sepsis cases caused by prior births. This means that we are
       assigning extra YLDs to each current sepsis case that are
       actually being accrued by other, nonpregnant people in the
       population who have lasting impacts of a previous birth and have
       nothing to do with the sepsis case we are modeling.

    #. If the modeled birth and puerperal sepsis case *does* cause
       infertility, the total infertility YLDs will be spread out over
       the simulant's remaining reproductive years, occurring in later
       age groups, not entirely in the simulant's current age group.
       Thus we will be "missing" a large portion of the YLDs caused by
       the current birth events when we tally up YLDs for births in the
       simulant's current age group.

    Thus, if we avert a case of sepsis, we will be simultaneously
    averting *extra* YLDs that we shouldn't be, because we are counting
    YLDs that don't actually belong to the simulant whose case was
    averted, as well as *missing* YLDs that should have been averted
    because we are only counting YLDs in the simulant's current age
    group, and not the YLDs that they would accrue in later years. Since
    births and hence incident cases of maternal sepsis `generally
    decrease with age <http://ihmeuw.org/6q63>`_, while cases of
    secondary infertility `generally increase with age
    <http://ihmeuw.org/6q62>`_, we will probably be systematically
    *undercounting* the YLDs that would be averted by each averted case
    of sepsis, because for a sepsis case, the missed YLDs for the
    simulant in question will on average be greater than the extraneous
    YLDs from other simulants in the same age group.

    It may be possible to develop a different strategy of counting YLDs
    that would help correct this bias, but the discrepancy will likely
    be a relatively small proportion of total DALYs, so we are willing
    to accept this limitation for now.

Validation Criteria
+++++++++++++++++++

References
----------
