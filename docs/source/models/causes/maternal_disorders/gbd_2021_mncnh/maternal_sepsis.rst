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

The following table describes any restrictions in GBD 2021 on the
effects of this cause (such as being only fatal or only nonfatal), as
well as restrictions on the ages and sexes to which the cause applies.

.. list-table:: GBD 2021 Cause Restrictions
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     - False
     -
   * - Female only
     - True
     -
   * - YLL only
     - False
     -
   * - YLD only
     - False
     -
   * - YLL age group start
     - 10 to 14 (ID=7)
     -
   * - YLL age group end
     - 50 to 54 (ID=15)
     -
   * - YLD age group start
     - 10 to 14 (ID=7)
     -
   * - YLD age group end
     - 50 to 54 (ID=15)
     -

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

Cause Model Decision Graph
++++++++++++++++++++++++++

Although we're not modeling sepsis dynamically as a finite state
machine, we can draw an analogous directed graph that can be interpreted
as a (collapsed) decision tree rather than a state transition diagram.
The main difference is that the values on the transition arrows
represent decision probabilities rather than rates per unit time. The
maternal sepsis decision graph drawn below should be inserted on the
"full term pregnancy" branch of the decision graph from the
:ref:`pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`,
between the intrapartum model and the birth of the child simulant. Solid
lines are the pieces added by the maternal sepsis model, while dashed
lines indicate pieces of the underlying pregnancy model.

.. todo::

    Put an explanation like the following (but with more precision) on
    some central page (rather than on each individual model page):

        To convert the graph to a decision tree, recursively split nodes
        with more than one incoming arrow until all nodes except the
        root have one incoming edge. Each time a node is split, all its
        outgoing edges are replicated, which may lead to additional
        downstream splits. Equivalently, the tree structure can be
        implicitly recovered by remembering the path taken to get to
        each node.

    Jira ticket: https://jira.ihme.washington.edu/browse/SSCI-2006

.. graphviz::

    digraph sepsis_decisions {
        rankdir = LR;
        ftp [label="full term\npregnancy,\npost ipm", style=dashed]
        ftb [label="full term\nbirth", style=dashed]
        alive [label="parent alive"]
        dead [label="parent dead"]

        ftp -> alive  [label = "1 - ir"]
        ftp -> sepsis [label = "ir"]
        sepsis -> alive [label = "1 - cfr"]
        sepsis -> dead [label = "cfr"]
        alive -> ftb  [label = "1", style=dashed]
        dead -> ftb  [label = "1", style=dashed]
    }

.. list-table:: State Definitions
    :widths: 7 20
    :header-rows: 1

    * - State
      - Definition
    * - full term pregnancy, post ipm
      - Parent simulant has a full term pregnancy as determined by the
        :ref:`pregnancy model
        <other_models_pregnancy_closed_cohort_mncnh>`, **and** has
        already been through the antenatal and intrapartum models ("post
        ipm" stands for "post intrapartum model")
    * - sepsis
      - Parent simulant has maternal sepsis or another maternal
        infection
    * - parent alive
      - Parent simulant is still alive
    * - parent dead
      - Parent simulant died of maternal sepsis or another maternal
        infection
    * - full term birth
      - The parent simulant has given birth to a child simulant (which
        may be a live birth or a still birth, to be determined in the
        next step of the :ref:`pregnancy model
        <other_models_pregnancy_closed_cohort_mncnh>`)

.. list-table:: Transition Probability Definitions
    :widths: 1 5 20
    :header-rows: 1

    * - Symbol
      - Name
      - Definition
    * - ir
      - incidence risk
      - The probability that a pregnant simulant gets maternal sepsis or
        another maternal infection
    * - cfr
      - case fatality rate
      - The probability that a simulant with sepsis or another maternal
        infection dies of that infection

Data Tables
+++++++++++

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
