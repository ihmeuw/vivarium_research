.. _models_cause:

===============
Modeling Causes
===============

What is included in this chapter: models of causes that are represented as
finite state Markov chain (this chapter will also explain what a finite state
Markov chain is!)

There are models of things that you might consider causes which are outside of
the scope of this chapter, because they do not fit into the Markov approach.
This chapter does not include “PAF of 1” causes, like protein-energy
malnutrition (PEM).  It also does not include things that are sometimes
considered a disease but are deemed “risk factors” by GBD, such as obesity.
Unsafe water would not fit into the cause model paradigm either---it is a cause
of diarrheal disease, but it is a risk factor in the GBD taxonomy.  Latent
tuberculosis infection (LTBI) does fit into this chapter, but just barely.

.. contents:
   :local:

What is a "cause"?
------------------

Short answer: disease

More nuance: “cause of death” as might be included as the bottom line of the
top half of a death certificate. And also analogous causes of nonfatal health
loss, too.

.. image:: death_certificate.png

Learning objectives
-------------------

After reading this chapter, learners should be able to:

#. Develop an understanding of how GBD, literature, and experts think about
   a cause.
#. Build internally consistent models which are sufficiently complex given
   larger modeling goals.
   #. Models that are as simple as possible, but no simpler.
   #. Models that agree with withheld data.
   #. Models that captures the outcomes of interest. (Which is really the same
      as “but no simpler” in (i))
#. Document the models in a way software engineers can build and validate it,
   and document their understanding comprehensively for future researchers
   (including their future selves) who are faced with related modeling
   challenges.

What is a cause model?
----------------------

A cause model is a simplification of a cause of death or disease for the
purposes of simulation modeling.  It is always an idealization of the messy
complexity of reality, and is designed to be acceptable to outside experts on
the cause, as well as be parsimonious with the data available from the GBD that
might inform the model.

How is a cause model incorporated into a larger model?
------------------------------------------------------

Our modular structure is designed to layer cause models into the
entity-component system that has a demographic model.  Sometimes an
intervention model will be layered in on top of this and directly change
transition rates in one or more cause models.  But to date, it has been more
common to have one or more risk factor models layered in to affect the
incidence rates in the cause model, and then have an intervention model shift
the risk exposure levels defined by the risk factor model.

Focus on goal 3:
----------------

Why do we want a document that describes each cause model?
----------------------------------------------------------

* Because a lot of work goes into gaining understanding and developing an
  appropriately complex model, and we don’t want to repeat that work.
* Because we (researchers) need to communicate clearly and precisely with
  software engineers and data scientists about what the model must do and what
  data must inform it.
* Because we will need to communicate to an outside audience, including
  critics, how we generated substantive results of interest, and that will
  include readers who want to know exactly how we modeled the diseases included
  in our work.


What does a model document look like?
-------------------------------------

* Title which is descriptive
* Cause model diagram
  * Set of states that are “mutually exclusive and collectively exhaustive”---a
    single agent is in exactly one of these states at any point in time
  * Set of transitions between states
* Definition of model and states
  * Restrictions: who does this apply to?
* How to initialize the states? (prevalence data)
* Definition of transitions in terms of states they connect
* Transition criteria (rates, durations, deterministic, etc.)
* How does this model connect to other models
  * What outcomes this disease influences? (e.g. disability, mortality, or
    incidence)
* What data informs those connections?
* “Theory of disease” meaning is this a “susceptible-infected” model (SI), is
  a recurrent MI model, etc?  This prose should match and complement the cause
  model diagram.
* Validation criteria
* Assumptions about the model

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
