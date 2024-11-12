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

The incidence risk (ir) per birth will be computed as

.. math::

    \text{ir} = \frac{\text{sepsis cases}}{\text{births}}
        = \frac{\text{(sepsis cases) / person-time}}
            {\text{births / person-time}}
        = \frac{\text{sepsis incidence rate}}{\text{birth rate}}.

The case fatality rate (cfr) will be computed as

.. math::

    \begin{align*}
    \text{cfr} = \frac{\text{sepsis deaths}}{\text{sepsis cases}}
        &= \frac{\text{(sepsis deaths) / person-time}}
            {\text{(sepsis cases) / person-time}} \\
        &= \frac{\text{sepsis cause specific mortality rate}}
            {\text{sepsis incidence rate}}.
    \end{align*}

The following table shows the data needed from GBD for these
calculations as well as for the calculation of YLDs in the next section.

.. list-table:: Data values and sources
    :header-rows: 1

    * - Variable
      - Definition
      - Value or source
      - Note
    * - ir
      - maternal sepsis incidence risk per birth
      - incidence_c368 / birth_rate
      -
    * - cfr
      - case fatality rate of maternal sepsis
      - csmr_c368 / incidence_368
      -
    * - incidence_c368
      - incidence rate of maternal sepsis
      - como
      - Use the :ref:`total population incidence rate <total population
        incidence rate>` directly from GBD and do not rescale this
        parameter to susceptible-population incidence rate using
        condition prevalence.
    * - csmr_c368
      - maternal sepsis cause-specific mortality rate
      - deaths_c368 / population
      -
    * - deaths_c368
      - count of deaths due to maternal sepsis
      - codcorrect
      -
    * - population
      - average population in a given year
      - get_population
      - Specific to age/sex/location/year demographic group. Numerically
        equal to person-time for the year.
    * - birth_rate
      - birth rate (live or still)
      - (1 + SBR) ASFR
      - Units are total births (live or still) per person-year
    * - ASFR
      - Age-specific fertility rate
      - get_covariate_estimates: coviarate_id=13
      - Assume lognormal distribution of uncertainty. Units in GBD are
        live births per person, or equivalently, per person-year.
    * - SBR
      - Still to live birth ratio
      - get_covariate_estimates: covariate_id=2267
      - Parameter is not age specific and has no draw-level uncertainty.
        Use mean_value as location-specific point parameter.
    * - yld_rate_c368
      - rate of maternal sepsis YLDs per person-year
      - como
      -


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
