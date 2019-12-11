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
------------------

When we say "cause" in simulation modeling with `vivarium`, we often mean a disease.

There is a reson for this potentially confusing terminology: a “cause of death”, as
might be included as the bottom line of the 
top half of a death certificate, is often a disease but sometimes an injury.
And we extend this to also refer to causes of nonfatal health
loss, too.

.. image:: death_certificate.png

A cause model is a simplification of a cause of death or disease for the
purposes of simulation modeling.  It is always an idealization of the messy
complexity of reality, and is designed to be acceptable to outside experts on
the cause, as well as be parsimonious with the data available from the GBD that
might inform the model.

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

1. Develop an understanding of how the GBD, literature, and experts think about
   a cause.
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
  include readers who want to know exactly how we modeled the diseases included
  in our work.


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

  - Set of states that are “mutually exclusive and collectively exhaustive”---a
    single agent is in exactly one of these states at any point in time
  - Set of transitions between states

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

[[to be updated based on experience from LTBI cause model document, and generalization thereof]]

Basic Cause Model Structures
----------------------------

.. todo::

	Link to examples of cause model documents

Common basic cause model structures are described in the following table and 
dicussed in further detail below. Notably, cause models are almost always more 
complicated than the basic structures discussed in this section. The following 
basic structures should be considered as basic guiding concepts, and not as 
templates that are appropriate for all (or even most) cause models. Examples 
of more complicated cause model structures are discussed in the `Other Cause 
Model Structures`_ section afterward.

.. list-table:: Basic Cause Model Structures
	:widths: 20 20 20
	:header-rows: 1

	* - Model
	  - States
	  - Description
	* - SI_
	  - Susceptible-Infected
	  - Simulants never recover from the infected (with condition) state
	* - SIS_
	  - Susceiptible-Infected-Susceptible
	  - Simulants can recover from the infected (with condition) state and can become infected again after recovery
	* - SIR_
	  - Susceptible-Infected-Recovered
	  - Simulants can recover from the infected (with condition) state and cannot become infected after recovery


SI
++

.. image:: SI.png

In this cause model structure, simulants in the susceptible state can 
transition to the infected state, where they will remain for the remainder of 
the simulation. 

This cause model structure is appropriate for chronic conditions from which 
individuals can never recover.

Examples of conditions potentially appropriate for an SI cause model structure 
include Alzheimer’s disease and other dementias.

SIS
+++

.. image:: SIS.png

In this cause model structure, simulants in the susceptible state can 
transition to the infected state and simulants in the infected state can 
transition to the susceptible state. Notably, this cause model allows for
simulants to enter the infected state more than once in a simulation. 

This cause model structure is appropriate for conditions for which individuals 
can have multiple cases over their lifetimes.

Examples of conditions potentially appropriate for an SIS cause model 
structure include diarrheal diseases.

SIR
+++

.. image:: SIR.png

In this cause model structure, simulants in the susceptible state can 
transition to the infected state and simulants in the infected state can 
transition to a recovered state where they will remain for the remainder
of the simulation. Notably, the cause model allows individuals to become 
infected only once in a simulation.

This cause model structure is appropriate for conditions for which individuals 
can only have a single case, but do not stay in the with condition state 
forever.

An example of a condition potentially appropriate for an SIR cause model 
structure is :ref:`measles <2017_cause_measles>`.

.. _`Other Cause Model Structures`:

Other Cause Model Structures
+++++++++++++++++++++++++

It is common that a particular cause may not fit well into one of the common 
basic cause model structures discussed above. Examples of situations that may 
require custom cause model structures are listed below:

- Cause models with severity splits
- Joint cause models (multiple closely related causes represented in a single cause model)
- Neonatal/Congenital cause models
- Other scenarios required by the specifics of a given cause

Common data sources for cause models
------------------------------------

.. todo::

   Format as table with measure, measure definition, data sources and
   their uses.

Incidence
+++++++++

Birth prevalence
++++++++++++++++

Remission
+++++++++

Prevalence
++++++++++

Cause-specific mortality
++++++++++++++++++++++++

Excess mortality
++++++++++++++++

Disability weight
+++++++++++++++++

Non-standard data sources for cause models
------------------------------------------
