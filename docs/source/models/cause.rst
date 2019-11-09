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
:ref:`Unsafe water <2017_risk_unsafe_water>` would not fit into the cause
model paradigm either---it is a cause of
:ref:`diarrheal disease <2017_cause_diarrhea>`, but it is a risk factor in the
GBD taxonomy.  :ref:`Latent tuberculosis <2017_cause_latent_tb>` infection
(LTBI) does fit into this chapter, but just barely.


.. contents::
   :local:


What is a "cause" and what is a cause model?
--------------------------------------------

When we say "cause" in simulation modeling with `vivarium`, we often mean a
disease.

There is a reson for this potentially confusing terminology: a
“cause of death”, as might be included as the bottom line of the
top half of a death certificate, is often a disease but sometimes an injury.
And we extend this to also refer to causes of nonfatal health
loss, too.

.. image:: death_certificate.png

A cause model is a simplification of a cause of death or disease for the
purposes of simulation modeling.  It is always an idealization of the messy
complexity of reality, and is designed to be acceptable to outside experts on
the cause, as well as be parsimonious with the data available from the GBD
that might inform the model.

.. todo::

   Link to GBD hierarchies for production of YLLs and YLDs.  Add discussion
   of the discrepency between our cause models (unified dynamic models of
   prevalence, incidence, mortality & morbidity) and GBD models (separate
   statistical models of mortality & morbidity only, with intermediate (e.g.
   dismod) unified models). Note where this might cause modeling issues!

   Might be better as a separate section.


Learning objectives
-------------------

After reading this chapter, learners should be able to:

1. Develop an understanding of how the GBD, literature, and experts think
   about a cause.
2. Build :term:`internally consistent <Internally Consistent Model>` cause
   models which are :term:`sufficiently complex <Sufficiently Complex Model>`
   given larger modeling goals.

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
to date, it has been more common to have one or more risk factor models
layered in to affect the incidence rates in the cause model, and then have an
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

* Definition of model and states
* Restrictions: who does this apply to?
* How to initialize the states? (prevalence data)
* Definition of transitions in terms of states they connect
* Transition criteria (rates, durations, deterministic, etc.)
* How does this model connect to other models.  That is, what outcomes this
  disease influences? (e.g. disability, mortality, or incidence)
* What data informs those connections?
* “Theory of disease” meaning is this a “susceptible-infected” model (SI), is
  a recurrent MI model, etc?  This prose should match and complement the cause
  model diagram.
* Validation criteria
* Assumptions about the model

[[to be updated based on experience from LTBI cause model document,
and generalization thereof]]

Common cause models
-------------------

.. todo::

   Format as table with model type, description.
   Fill in descriptions.

SI
++

SIS
+++

SIR
+++

Neonatal
++++++++

Data Sources for Cause Models
------------------------------------

.. todo::

   #. Update mortality-related data sources within existing format (yaqi).
   #. Describe the relationship that duration and transition rates can play 
      when there are multiple ways out of a state (LTBI)
   #. Update transition rate section to reflect feedback
   #. Include formulas discussed in office hours for incidence/hazards and 
      then link out to surv. analysis page
   #. Change remission example to diarrheal disease

Once a cause model structure is specified, data is needed to inform its states
and transitions. For our purposes, cause models generally have the following
data needs:

#. `Cause Model Initialization`_
    - The probability that a simulant will start the simulation in a given 
      state within the cause model.
#. `Cause Model Transitions`_
    - The probability that a simulant will transition to a new state within 
      the cause model in a given time-step.
#. `Mortality Impacts`_
    - The probability that a simulant in a certain cause model state will die
      in a given time-step.
#. `Morbidity Impacts`_
    - The amount of disability a simulant experiences in a certain cause 
      model state
#. `Restictions`_
    - Population groups for which a cause model does not apply

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
     - Proportion of population with a given condition
     - Initialization
     - Represents the probability a simulant will begin the simulation in a with-condition cause model state
   * - `Birth Prevalence`_
     - Proportion of all live births born with a given condition.
     - Initialization
     - Represents the probability a simulant born during the simulation will be born into a with-condition cause model state
   * - `Incidence`_
     - Number of new cases of a given condition per person-year of the at-risk population
     - Transition rates
     - Once scaled to simulation time-step, represents the probability a simulant will transition from infected to recovered
   * - `Remission`_
     - Number of recovered cases from a given condition per person-year of the population with the condition
     - Transition rates
     - Once scaled to simulation time-step, represents the probability a simulant will transition from infected to recovered
   * - `Duration`_
     - Length of time a condition lasts
     - Transition rates
     - Amount of time a simulant remains in a given state
   * - `Restrictions`_
     - List of groups that are not included in a cause
     - General
     - List of population groups for which the cause model does not apply
   * - `Disability Weights`_
     - Proportion of full health not experienced due to disability associated
       with a given condition.
     - Morbidity impacts
     - Measure disability attributed to cause model states
   * - `Cause-specific Mortality`_
     -
     -
     -
   * - `Excess Mortality`_
     -
     -
     -

.. _`Cause Model Initialization`:

Cause Model Initialization
--------------------------

Prevalence
++++++++++

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
++++++++++++++++

Birth prevalence is defined as the **proportion of live births in a given
population that possess a given condition or trait at birth.**

  For example, the birth prevalence for cleft lip in the United States in 2006
  was 10.6 per 10,000 live births, or 0.106%.

Birth prevalence data can be used to **initialize neonatal cause model
states** and represent the **probability that a simulant who is born during
the simulation will be born into a given neonatal cause model state.**

  For example, the probability that a simulant born during a simulation of
  cleft lip in the United States in 2006 is 0.00106, or 0.106%.

.. _`Cause Model Transitions`:

Cause Model Transitions
-----------------------

Incidence
+++++++++

Incidence rates are defined as the **number of new cases of a condition that
occur per person-year of the at-risk population (individuals without
condition).** Specifically, the at-risk population at a given time can be 
represented as `1 - condition prevalence at that time`.

  For example, the incidence of multiple sclerosis (MS) in the United States
  is 2.8 per 100,000 person-years of the at-risk population. The exact 
  interpretation of this measure can be a little tricky. Let's consider a few 
  examples.

      First, consider a hypothetical population of 100,000 individuals who never die. Assuming that no one in this hypothetical population has MS at the beginning of the year, if we followed each individual in this population for a full year (100,000 people * 1 year = 100,000 person-years), we would expect 2.8 individuals to develop MS within this timeframe. 

  However, the above example does not consider the important impact of mortality within a population. 

      So, let's imagine that we intend to follow 10 individuals for one year. Now let's imagine that two of the individuals die six months into our observation window. The other eight individuals remain alive and we follow each of them for the full year period. In this case, even though we intended to observe 10 person-years, we only observed 9 person-years! This is because the two individuals who died contributed only 0.5 person-years each to our observaton period.

      Now, with this in mind, let's revist our previous example. We intend to follow a cohort of 100,000 individuals for one year each. However, several of these individuals die within that year and we end up observing a total of 90,000 person-years. Therefore, we would expect 2.52 individuals in this cohort to develop MS within this timeframe (2.8 cases / 100,000 py * 90,000 py).


  This suggests that if we followed 100,000 individuals without MS for 1
  year each (100,000 people * 1 year = 100,000 person-years), we would expect
  2.8 of these individuals to develop MS within this timeframe.

  Alternatively, if we followed 50,000 individuals without MS for 2 years each
  (50,000 people * 2 years = 100,000 person-years), we also would expect 2.8
  of these individuals to develop MS within this timeframe.

Incidence can be used to **estimate cause model transition rates** and can
represent the **probability that a simulant will transition from a susceptible
state to an infected state within a given timestep.**

  For example, with a timestep of one year and using incidence as the
  transition rate data source, the probability that a simulant will transition
  from a susceptible (without MS) cause model state to an infected (with MS)
  cause model state is 2.8*10^(-5).

.. _above:

**A Few Considerations for Incidence Data Sources:**

As mentioned above, the denominator for incidence is person-years of the
*at-risk* population, or the population *without* condition (``1 - condition
prevalence``). However, in certain scenarios, this may not always be the
case.

  Incidence rates that use person-time of the *overall* population as the 
  denomination rather than the *at-risk* population are **biased** data 
  sources for cause model transitions rates, *especially* if the prevalence 
  of the condition is large.

  Therefore, it is important to understand how incidence data sources used for
  cause models are measured and whether the population in the denominator
  represents the at risk population or the general population. If the
  population in the denominator represents the general population, the impact
  on the model and potential solutions to limit bias should be considered.

    A potential solution may be to represent the transition rate with the
    following:

    ``incidence rate`` * ``population size`` / ``(1 - prevalence)``

Further, it is important to consider that cause models are *state*-specific
and not necessarily *disease*-specific. What does this mean?

  Consider a cause model in which an individual can transition from a
  susceptible state to a mild disease state OR from a susceptible state to a
  severe disease state.

  In this case, the incidence rate for overall disease (mild and severe) does
  not help us estimate the transition rates from susceptible to mild disease
  or to severe disease. In these cases, incidence rates specific to mild and
  severe disease are needed to inform the specific transitions present in the
  cause model.

Lastly, see the section on `hazard rates`_ in non-standard data sources below
to determine when hazard rates may be preferable to annual incidence rates as
a data source for cause model transition rates.

Remission
++++++++++

Remission rates are defined as the **number of newly recovered cases from a
condition that occur per person-year of the population with the condition.**

  For example, the remission rate of type II diabetes in the United States is
  2.4 per 10,000 person-years.

  This suggests that if we followed 10,000 individuals with type II diabetes
  for one year each, we would expect to see 2.4 individuals recover from type
  II diabetes.

Remission rates can be used to estimate cause model transition rates and
represent the probability that a simulant in an infected (with condition)
state will transition to a non-infected (without condition) state.

  For example, with a time step of one year, the probability that a simulant
  in the infected state in a model of type II diabetes in the United States
  will transition to a susceptible or recovered state within a timestep is
  2.4*10^(-4), or 0.024%.

.. note::

  The considerations discussed in the incidence section above apply to
  remission rates as well. See above_ for details.

.. _`Duration`:

Duration-Based Transitions
++++++++++++++++++++++++++

In certain situations, there may be restrictions on the amount of time a
simulant may occupy a given cause model state. In these cases, it is important
to specify the duration that simulants may remain in the state of interest.

For example, in conditions that have acute and chronic phases, it may be
necessary to specify the length of time an individual occupies the acute
phase before transitioning into the chronic phase.

  E.g. In a cause model of ischemic heart disease, a simulant may transition
  from susceptible to a myocardial infarction state, where they remain for
  28 days, before they transition to a ischemic heart disease state.

.. _`Mortality Impacts`:

Mortality Impacts
-----------------

Cause-Specific Mortality
++++++++++++++++++++++++

Excess Mortality
++++++++++++++++

.. _`Morbidity Impacts`:

Morbidity Impacts
-----------------

Disability Weights
++++++++++++++++++

.. _`Restrictions`:

Restrictions
------------

Some causes (e.g. ovarian cancer) are sex-specific and some causes 
are age-specific (e.g. Alzheimer's disease). **Restrictions on any and all 
cause-model states, transitions, and mortality/morbidity impacts must be 
specified.**