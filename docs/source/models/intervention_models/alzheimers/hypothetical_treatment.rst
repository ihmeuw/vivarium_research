..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  +++++++++++++++++++++

  Section Level 2 (#.#)
  ---------------------

  Section Level 3 (#.#.#)
  ~~~~~~~~~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

.. _intervention_hypothetical_alzheimers_treatment:

========================================
Hypothetical Alzheimer's Treatment
========================================

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - BBBM
    - Blood-based biomarker
    - BBBM tests measure blood plasma protein levels and are less invasive than CSF (Cerebrospinal Fluid) or PET (Positron Emission Topography) tests
  * - MCI
    - Mild cognitive impairment
    -

Intervention Overview
-----------------------

The hypothetical treatment intervention is triggered by a positive BBBM test, and has the effect of slowing the progression
from pre-clinical to MCI state via the :ref:`BBBM to MCI transition hazard rate i_MCI <2021_cause_alzheimers_presymptomatic_mci_transition_data_table>`. 
In the baseline scenario, i_MCI equals the time-dependent hazard function :math:`h_{MCI}`,
which in the treatment scenario is multiplied by a hazard ratio :math:`R_h` < 1 when a simulant has an active treatment effect in order to slow the progression.
This effect can wane over time (udpated each time step) and when the effect fully expires, :math:`R_h` returns to 1. 

This treatment is hypothetical and we don't have confirmed information about the mechanism.


.. list-table:: Affected Outcomes
  :widths: 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note
  * - BBBM to MCI transition hazard rate (:ref:`i_MCI <2021_cause_alzheimers_presymptomatic_mci_transition_data_table>`)
    - Adjust multiplicatively using hazard ratio :ref:`R_h <alzheimers_intervention_treatment_data_table>`
    - Yes
    -



Vivarium Modeling Strategy
--------------------------

.. graphviz::

    digraph treatment_states {
        rankdir = TB;
        el [label="BBBM test eligible [variable]"]
        test [label="BBBM test received", style=dashed, shape=box]

        pos [label="BBBM test positive", style=dashed, shape=box]
        neg [label="BBBM test negative [3 y]"]

        wait [label="Waiting for treatment [6 mo]"]
        in_treat [label="Receiving treatment", style=dashed, shape=box]
        no_treat [label="No treatment effect [permanent]"]

        treat [label="Full treatment effect LONG [6 y]"]
        wane [label="Waning treatment effect LONG (update each step) [11 y]"]

        discon_time [label = "Months to discontinuation D_t", style=dashed, shape=box]
        treat_short [label = "Full treatment effect SHORT [(Months on Treatment/9) * 6 y]"]
        wane_short [label = "Waning treatment effect SHORT (update each step) [(Months on Treatment/9) * 11 y]"]

        el -> test [label = "tested"]
        el -> el [label = "not tested"]

        test -> pos  [label = "(90%)", style=dashed]
        test -> neg [label = "(10%)", style=dashed]
        neg -> el [label = "test re-eligible"]

        pos -> wait [label = "decides to initiate treatment (I)", style=dashed]
        pos -> no_treat [label = "decides not to initiate treatment (1 - I)", style=dashed]

        wait -> in_treat [label = "begins treatment"]
        in_treat -> treat [label = "completes (90%)", style=dashed]

        in_treat -> discon_time [label = "discontinues (10%)", style=dashed]
        discon_time -> treat_short

        treat_short -> wane_short
        wane_short -> no_treat

        treat -> wane 

        wane -> no_treat
    }

The diagram above illustrates how a simulant should progress through the various testing and treatment related 
states defined by the client. Each simulant may transition to a new state on each time step. 

Most states have a fixed duration (a multiple of the 
time step length) where simulants will transition after :math:`\text{duration} / \text{time step}` time steps. 
The duration is marked in the state node in brackets eg [6 mo]. As desribed in the :ref:`testing intervention <alzheimers_testing_intervention_bbbm>`, 
some simulants in the `BBBM test eligible` state may transition to tested immediately (low propensity value), some may always self-transition
(ie, never get tested, high propensity value), and some may self-transition for some number of time steps but eventually transition to tested
as a result of the time-specific testing rate increasing.

Some states have zero duration, illustrated with a dashed box (rather than the solid ovals for states with nonzero durations). 
Transitions from a state with zero duration are illustrated with a dashed line. If a simulant transitions to a zero-duration state 
on a time step, they should also immediately continue to the next state during that same time step, as a part of the same transition.

For example, a simulant in `BBBM test eligible` who is tested and moves to `BBBM test received` would then immediately move to one of 
that state's two sinks, and would even move directly to another state during the same transition/ time step on a positive test. 

The "Months to discontinuation" state randomly assigns a number of months the simulant will be on treatment
before discontinuing. The number of months then determines the duration of time with full and waning treatment effect.
For example, if a simulant discontinues after 4 months, they would have (4/9) * 6 years of
full effect, or 2.67 which we round to the nearest 6 month interval, which is 2.5 years.

Below are tables with details on how to model these states and transitions, and necessary data values. 
The value of :math:`i_{MCI}` in the :ref:`cause model <2021_cause_alzheimers_presymptomatic_mci_transition_data_table>` is now updated
to be equal to :math:`h_{adj} = h_{MCI} \cdot R_h`, where :math:`h_{adj}` is the intervention-adjusted hazard rate used for progression to MCI,
:math:`h_{MCI}` is the :ref:`time-dependent hazard function <2021_cause_alzheimers_presymptomatic_mci_transition_data_table>` and :math:`R_h`
is defined below.

.. _alzheimers_intervention_treatment_data_table:

.. list-table:: Data values and sources
  :widths: 15 15 30 15
  :header-rows: 1

  * - Variable
    - Definition
    - Source or value
    - Notes
  * - :math:`\text{prop}_I`
    - Simulant lifetime treatment "initiation propensity"
    - Drawn uniformly from :math:`[0,1)`
    - Lower value means more likely to initiate testing. Independent from testing propensities.
  * - :math:`I`
    - Time-varying treatment initiation rate
    - The percent of patients with a positive BBBM test who initiate
      treatment will vary over time – but will not vary by age, sex, or
      location. We will use a piecewise linear ramp-up with knots at the
      following (year, level) values: `(2022.0, 0), (2027.0, 0),
      (2035.5, 30), (2100.0, 80), (2101.0, 80)`.

      This captures the CSU client's specification that "30% of eligible patients
      initiate by 2035, with a steady increase to 80% by 2100, for all
      countries," and that treatment should first be available in 2027,
      slowly ramping up to 30% in 2035.
    - 
  * - :math:`D_t`
    - Months to discontinuation
    - A full course of treatment is 9 months. We assume simulants discontinue evenly for each monthly injection. The months to discontinuation will be assigned a uniformly distributed whole number between 1 and 8 inclusive.
    - 
  * - :math:`R_h`
    - Effect hazard ratio
    - 1 if simulant has never recieved treatment or has transitioned to the `No treatment effect` state after completing or discontinuing treatment.
      Set to `R_d` on transition to a `Full treatment effect` state, and adjusted linearly during `Waning treatment effect` states.
      See below table for waning value details. 
    - :math:`R_h \cdot h_{MCI} = h_{adj}`, adjusting :ref:`i_MCI <2021_cause_alzheimers_presymptomatic_mci_transition_data_table>`.
  * - :math:`R_d`
    - Draw-specific effect size value
    - Drawn uniformly from [.4, .6]
    - The effect size value will be the same for all simulants in a single draw.



.. list-table:: Testing and Treatment State and Transition Modeling
  :widths: 15 15 30
  :header-rows: 1

  * - State
    - Notes
    - Modeling
  * - BBBM test eligible
    -
    - See :ref:`testing intervention <intervention_alzheimers_testing_diagnosis>`
  * - BBBM test received
    -
    - Zero duration. Independent random draw to determine whether test
      is positive or negative
  * - BBBM test positive
    -
    - Zero duration. :math:`\text{prop}_I < I`\: initiate. :math:`\text{prop}_I >=  I`\: don't initiate.
  * - BBBM test negative
    -
    - Fixed duration
  * - Waiting for treatment
    - 
    - Fixed duration
  * - Receiving treatment
    - Treatment effect is instantaneous. See :ref:`alzheimers_intervention_treatment_assumptions` for info about treatment/discontinuation timing.
    - Zero duration. Independent random draw to determine whether
      simulant completes or discontinues treatment.
  * - Months to discontinuation
    - See :math:`D_t` in the `Data values and sources` table above for
      instructions on assigning the number of months to discontinuation
    - Zero duration. Independent random draw to determine how many
      months of treatment simulant receives before discontinuation.
  * - Full treatment effect LONG
    - Treatment takes effect exactly 6 months after receiving a positive BBBM test (if :math:`\text{prop}_I < I`)
    - On transition to this state, :math:`R_h = R_d`. Set :math:`h_{adj} = R_h \cdot h_{MCI}`, slowing progression to MCI.
      Transition from this state after the fixed duration.
  * - Full treatment effect SHORT
    -
    - Same effect size as in `Full treatment effect LONG` but with a shorter fixed duration. The duration is dependent on the time of discontinuation, as outlined above. 
  * - Waning treatment effect LONG
    -
    - On every time step where the simulant ends the time step in this
      state (i.e., don't do it on the final transition to the `No
      treatment effect` state), increase :math:`R_h` by :math:`\frac{(1
      - R_d)}{s}`, where :math:`s` is the number of time steps in this
      state's duration. This will decrease the effect size linearly
      until reaching :math:`R_h = 1` on the last time step in this
      state. Set :math:`h_{adj} = R_h \cdot h_{MCI}`. Transition from
      this state after the fixed duration.
  * - Waning treatment effect SHORT
    -
    - Same effect size as in `Waning treatment effect LONG` but with a shorter fixed duration. The duration is dependent on the time of discontinuation, as outlined above.
  * - No treatment effect
    - 
    - :math:`R_h` should equal 1 on the first time step the simulant spends in this state.
      So :math:`h_{adj} = h_{MCI}`

Initialization
~~~~~~~~~~~~~~

Since :math:`I` is 0 until 2030, on simulation initialization no simulants have received treatment.

Outcomes
~~~~~~~~

.. list-table:: Modeled Outcomes
  :widths: 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Effect size measure
    - Effect size
    - Note
  * - Full treatment effect
    - Hazard ratio
    - Uniform distribution in [.4, .6]
    - Duration depends on if simulant completes or discontinues treatment
  * - Waning treatment effect
    - Hazard ratio
    - Linear increase during duration from full treatment effect hazard ratio to 1
    - Duration depends on if simulant completes or discontinues treatment

.. _alzheimers_intervention_treatment_assumptions:

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Those who do not initiate treatment following their first positive BBBM test result, or those who discontinue, 
  will never take the intervention, so propensity can be assigned for simulant lifetime
- Treatment occurs instantaneously (i.e., the duration of the "receiving
  treatment" period is zero), following a six-month waiting period from
  time of BBBM test. So, treatment takes effect exactly six months after
  BBBM testing. This interprets the following two client specifications:
  "The treatment takes immediate full effect in the first 6-month time
  step" and "There is an average of 6 months between a positive BBBM
  test result and initiating treatment". We simplify "average of 6
  months" to a fixed 6 month duration for all simulants. Treatment
  discontinuation only affects the duration of time the treatment will
  last, not the immediate effect size, so it is consistent with the client's
  assumptions to model discontinuation occurring instantaneously during
  the transient "receiving treatment" and "months to discontinuation"
  states as above.
