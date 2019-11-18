.. _models_cause:

===============
Modeling Causes
===============

What is included in this chapter: models of causes that are represented as
finite-state Markov chains (this chapter will also explain what a finite state
Markov chain is!)

There are models of things that you might consider causes which are outside of
the scope of this chapter, because they do not fit into the Markov approach.
This chapter does not include :ref:`PAF of 1 <models_risk_attributable_cause>`
causes, like
:ref:`protein-energy malnutrition <2017_cause_pem>`. It also does not include
things that are sometimes considered diseases but are deemed
:ref:`risk factors <models_risk>` by the :term:`Global Burden of Disease`
(GBD), such as :ref:`obesity <2017_risk_bmi_adults>`.
:ref:`Unsafe water <2017_risk_unsafe_water>` would not fit into the cause model
paradigm either---it is a cause of
:ref:`diarrheal disease <2017_cause_diarrhea>`, but it is a risk factor in the
GBD taxonomy.  :ref:`Latent tuberculosis <2017_cause_latent_tb>` infection
(LTBI) does fit into this chapter, but just barely.


.. contents::
   :local:


What is a "cause" and what is a cause model?
--------------------------------------------

When we say "cause" in simulation modeling with `vivarium`, we often mean a
disease.

There is a reason for this potentially confusing terminology: a “cause of
death”, as might be included as the bottom line of the
top half of a death certificate, is often a disease but sometimes an injury.
And we extend this to also refer to causes of nonfatal health loss, too.

.. image:: death_certificate.png

A cause model is a simplification of a cause of death or disease for the
purposes of simulation modeling.  It is always an idealization of the messy
complexity of reality, and is designed to be acceptable to outside experts on
the cause, as well as be parsimonious with the data available from the GBD
that might inform the model.

.. todo::

   Link to GBD hierarchies for production of YLLs and YLDs.  Add discussion
   of the discrepancy between our cause models (unified dynamic models of
   prevalence, incidence, mortality & morbidity) and GBD models (separate
   statistical models of mortality & morbidity only, with intermediate (e.g.
   dismod) unified models). Note where this might cause modeling issues!

   Might be better as a separate section.


Learning objectives
-------------------

After reading this chapter, learners should be able to:

1. Develop an understanding of how the GBD, literature, and experts think
   about a cause. [[to come]]
2. Build :term:`internally consistent <Internally Consistent Model>` cause
   models which are :term:`sufficiently complex <Sufficiently Complex Model>`
   given larger modeling goals. [[to come]]

   a. Models that are as simple as possible, but no simpler.
   b. Models that agree with withheld data.
   c. Models that captures the outcomes of interest. (Which is really the same
      as “but no simpler” in (a))

3. Document the models in a way software engineers can build and
   :term:`verify <Verification>` it, and document their understanding
   comprehensively for future researchers (including their future selves) who
   are faced with related modeling challenges.


How is a cause model incorporated into a larger model?
------------------------------------------------------

Our modular structure is designed to layer cause models into the
:term:`entity component system <Entity Component System>` that has a
demographic model.  Sometimes an intervention model will be layered in on top
of this and directly change transition rates in one or more cause models.  But
to date, it has been more common to have one or more risk factor models layered
in to affect the incidence rates in the cause model, and then have an
intervention model shift the risk exposure levels defined by the risk factor
model.

It can be useful to consider two separate ways that a cause models fits into
a larger model: (1) how does a cause model affect other parts of the model?
and (2) how is a cause model affected by other parts of the model?

[[More details on this to come]]


Why do we want a document that describes each cause model?
----------------------------------------------------------

* Because a lot of work goes into gaining understanding and developing an
  appropriately complex model, and we don’t want to repeat that work.
* Because we (researchers) need to communicate clearly and precisely with
  software engineers, data scientists, and each other about what the model
  must do and what data must inform it.
* Because we will need to communicate to an outside audience, including
  critics, how we generated substantive results of interest, and that will
  include readers who want to know exactly how we modeled the diseases
  included in our work.


What does a model document look like?
-------------------------------------

.. todo:

   replace this section with a template or just links to examples + discussion
   of the sections. Likely need a whole section on cause model diagrams with
   a concrete description of how we represent different kinds of states
   and transitions. A common diagram language will make communication a
   million times easier.

* Title which is descriptive
* Cause model diagram

  - Set of states that are “mutually exclusive and collectively
    exhaustive”---a single agent is in exactly one of these states at any
    point in time.
  - Set of transitions between states.

* Definition of model and states.
* Restrictions: who does this apply to?
* How to initialize the states? (prevalence data)
* Definition of transitions in terms of states they connect.
* Transition criteria (rates, durations, deterministic, etc.)
* How does this model connect to other models.  That is, what outcomes this
  disease influences? (e.g. disability, mortality, or incidence)
* What data informs those connections?
* “Theory of disease” meaning is this a “susceptible-infected” model (SI), is
  a recurrent MI model, etc?  This prose should match and complement the cause
  model diagram.
* Validation criteria
* Assumptions about the model

[[to be updated based on experience from LTBI cause model document, and
generalization thereof]]


Data Sources for Cause Models
-----------------------------

.. todo::

   #. Update mortality-related data sources within existing format (yaqi).
   #. Describe the relationship that duration and transition rates can play
      when there are multiple ways out of a state (LTBI)
   #. Update transition rate section to reflect feedback
   #. Include formulas discussed in office hours for incidence/hazards and
      then link out to survey. analysis page
   #. Change remission example to diarrheal disease

Once a cause model structure is specified, data is needed to inform its states
and transitions. For our purposes, cause models generally have the following
data needs:

`Cause Model Initialization`_

  Which cause model state will a simulant begin the simulation in?

`Cause Model Transitions`_

  How and when does a simulant move between cause model states?

`Mortality Impacts`_

  How and when does a simulant die and how does this differ depending on the
  specific cause model state that the simulant occupies?

`Morbidity Impacts`_

  How does a simulant experience morbidity and how does this differ depending
  on the specific cause model state that the simulant occupies?

`Restrictions`_

  For which population groups (e.g. age and sex groups) is this cause model
  not valid?

Our cause models use approximately instantaneous, individual-based
probabilities to make decisions about how an individual simulant moves about
a cause model. Because we cannot possibly predict the exact moment a specific
individual will get sick or die, we use population-level estimates as our
best-guess predictors for individual-level estimates.

  For instance, we don't know if Jane Doe will die in the next year, however,
  we can use information on the overall rate of death in Jane Doe's
  population to make a guess on the probability that Jane Doe will die in the
  next year.

  We can increase the quality of this guess by adding detail to the model we
  use to make our guesses. For instance, if we know Jane Doe has HIV, we can
  use the rate of death among individuals with HIV to make a better guess at
  the probability Jane Doe will die in the next year.

There are several common population-level data sources that are used to
inform our cause models. These data sources are outlined in the table below
and discussed in more detail afterward.

.. list-table:: Data Definitions
   :widths: 20 30 30 30
   :header-rows: 1

   * - Measure
     - Definition
     - Model Application
     - Specific Use
   * - `Prevalence`_
     - Proportion of population with a given condition.
     - Initialization
     - Represents the probability that a simulant will begin the simulation
       in a with-condition cause model state.
   * - `Birth Prevalence`_
     - Proportion of all live births born with a given condition.
     - Initialization
     - Represents the probability that a simulant born during the simulation
       will be born into a with-condition cause model state.
   * - `Incidence`_
     - Number of new cases of a given condition per person-year of the at-risk
       population.
     - Transition rates
     - Once scaled to simulation time-step, represents the probability a
       simulant will transition from infected to recovered.
   * - `Remission`_
     - Number of recovered cases from a given condition per person-year of the
       population with the condition.
     - Transition rates
     - Once scaled to simulation time-step, represents the probability a
       simulant will recover from the with-condition state.
   * - `Duration`_
     - Length of time a condition lasts.
     - Transition rates
     - Amount of time a simulant remains in a given state.
   * - `Restrictions`_
     - List of groups that are not included in a cause.
     - General
     - List of population groups for which the cause model does and
       does not apply.
   * - `Disability Weights`_
     - Proportion of full health not experienced due to disability associated
       with a given condition.
     - Morbidity impacts
     - Rate at which an individual accrues years lived with disability due to
       the state in the cause model.
   * - `Cause-specific Mortality`_
     -
     -
     -
   * - `Excess Mortality`_
     -
     -
     -

Cause Model Initialization
++++++++++++++++++++++++++

Prevalence
^^^^^^^^^^

Prevalence is defined as the **proportion of a given population that possesses
a given condition or trait** at a given time-point.

  For example, the prevalence of diabetes mellitus in the United States was
  approximately 6.5% in 2017.

When a *time-frame* (such as 2016, i.e. 1/1/16 to 12/31/16) instead of a
*time-point* (such as 1/1/16) is reported, it is commonly assumed that the
reported prevalence represents the prevalence of the *midpoint* of
that time-frame (7/1/16 is the midpoint for the time frame of all of 2016).
However, this may not always be the case and it should be considered when
relevant.

Prevalence data can be used to **initialize cause model states** and
represents the **probability that a simulant will begin the simulation in a
given state.**

  For example, the probability that a simulant in a model of diabetes 
  mellitus in the United States beginning in 2017 will begin the simulation 
  with diabetes is 0.065, or 6.5%. 

Notably, prevalence is used to initialize cause model states in the following 
scenarios:

- A simulant enters the simulation at the start of the simulation
- A simulant enters the simulation due to immigration to the simulated 
  location
- A simulant enters the simulation by *aging* into the simulation

Prevalence is **not** used to initialize cause model states when a simulant 
is *born* into a simulation. See the below section on birth prevalence for 
how cause model states are initialized in this scenario.

Birth Prevalence
^^^^^^^^^^^^^^^^

Birth prevalence is defined as the **proportion of live births in a given
population that possess a given condition or trait at birth.**

  For example, the birth prevalence for cleft lip in the United States in 2006
  was 10.6 per 10,000 live births, or 0.106%.

Birth prevalence data can be used to **initialize neonatal cause model
states** and represent the **probability that a simulant who is born during
the simulation will be born into a given neonatal cause model state.**

  For example, the probability that a simulant born during a simulation of
  cleft lip in the United States in 2006 is 0.00106, or 0.106%.


Cause Model Transitions
+++++++++++++++++++++++

Incidence
^^^^^^^^^

Remission
^^^^^^^^^

Duration
^^^^^^^^

Mortality Impacts
+++++++++++++++++

Cause-Specific Mortality
^^^^^^^^^^^^^^^^^^^^^^^^

Excess Mortality
^^^^^^^^^^^^^^^^

Morbidity Impacts
+++++++++++++++++

Disability Weights
^^^^^^^^^^^^^^^^^^

Restrictions
++++++++++++
