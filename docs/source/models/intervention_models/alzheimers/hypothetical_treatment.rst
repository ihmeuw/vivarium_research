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

        treat [label="Full treatment effect LONG [5 y]"]
        wane [label="Waning treatment effect LONG (update each step) [9 y]"]

        treat_short [label = "Full treatment effect SHORT [6 mo]"]
        wane_short [label = "Waning treatment effect SHORT (update each step) [2.5 y]"]


        el -> test [label = "tested"]
        el -> el [label = "not tested"]

        test -> pos  [label = "(90%)", style=dashed]
        test -> neg [label = "(10%)", style=dashed]
        neg -> el [label = "test re-eligible"]

        pos -> wait [label = "decides to initiate treatment (I)", style=dashed]
        pos -> no_treat [label = "decides not to initiate treatment (1 - I)", style=dashed]

        wait -> in_treat [label = "begins treatment"]
        in_treat -> treat [label = "completes (90%)", style=dashed]
        in_treat -> treat_short [label = "discontinues (10%)", style=dashed]

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
    - Time- and location-specific treatment initiation rate
    - Lilly: "The percent of patients with a positive BBBM test who initiate treatment will vary by location and over time – but will not vary by age or sex. In the US: 30% of eligible patients initiate (constant 2030-2100); Japan: 80% of eligible patients initiate (constant 2030-2100); all other countries: 40% of eligible patients initiate in 2030, increasing linearly to 70% by 2035, remaining constant at 70% until 2100.""
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
    - Zero duration. Random draw
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
    - Treatment period is instantaneous. See :ref:`alzheimers_intervention_treatment_assumptions` for info about treatment/discontinuation timing.
    - Zero duration. Random draw
  * - Full treatment effect LONG
    - Treatment takes effect exactly 6 months after recieving a positive BBBM test (if :math:`\text{prop}_I < I`)
    - On transition to this state, :math:`R_h = R_d`. Set :math:`h_{adj} = R_h \cdot h_{MCI}`, slowing progression to MCI.
      Transition from this state after the fixed duration.
  * - Full treatment effect SHORT
    -
    - Same effect size as in `Full treatment effect LONG` but with a shorter fixed duration
  * - Waning treatment effect LONG
    -
    - On every time step where the simulant started the time step in this state (ie, don't do it on the initial transition),
      increase :math:`R_h` by :math:`\frac{(1 - R_d)}{s}`, where :math:`s` is the number of time steps in this state's duration.
      This will decrease the effect size linearly until reaching :math:`R_h = 1` on transition to the `No treatment effect` state.
      Set :math:`h_{adj} = R_h \cdot h_{MCI}`.
      Transition from this state after the fixed duration.
  * - Waning treatment effect SHORT
    -
    - Same effect size as in `Waning treatment effect LONG` but with a shorter fixed duration
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
- Treatment occurs instantaneously (ie, the duration of the treatment period is zero), following a six-month waiting period from time of BBBM test. 
  So, treatment takes effect exactly six months after BBBM testing. 
  This interprets the following two Lilly specifications: "The treatment takes immediate full effect in the first 6-month time step" and 
  "There is an average of 6 months between a positive BBBM test result and initiating treatment". We simplify 
  average of 6 months to fixed 6 month duration for all simulants. 
  Discontinuation occurs during this instantaneous treatment period.
