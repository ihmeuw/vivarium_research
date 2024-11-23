.. _2021_cause_maternal_disorders_mncnh:

===================================
Maternal disorders: GBD 2021, MNCNH
===================================

.. note::

    This page is adapted from the previously developed :ref:`GBD 2021
    maternal disorders cause model <2021_cause_maternal_disorders>`,
    which was updated from the :ref:`GBD 2019 maternal disorders cause
    model <2019_cause_maternal_disorders>`. In contrast to previous
    versions of the model, in the :ref:`MNCNH Portfolio project
    <2024_concept_model_vivarium_mncnh_portfolio>`  we are modeling
    several of the maternal disorders subcauses (see `Modeled
    Subcauses`_) rather than modeling a single overarching cause. This
    page documents the strategy for capturing the burden of the
    remaining maternal disorders subcauses that are not explicitly
    modeled, as well as the strategy for dealing with interactions
    between the different subcauses.

.. contents::
   :local:

Modeled Subcauses
-----------------

The following maternal disorders subcauses will be modeled individually,
in the indicated model-building wave:

Wave 1
++++++

.. toctree::
    :maxdepth: 1

    maternal_hemorrhage
    maternal_sepsis
    obstructed_labor

Wave 2
++++++

Wave 3
++++++

* Maternal hypertensive disorders

The remainder of this document describes maternal disorders overall and
describes the strategy for capturing the burden of the maternal
disorders subcauses that are not explicitly modeled above.

Disease Overview
----------------

GBD 2021 Modeling Strategy
--------------------------

Cause Hierarchy
+++++++++++++++

Subcause definitions
""""""""""""""""""""""""""""

Restrictions
++++++++++++

Vivarium Modeling Strategy
--------------------------

Scope
+++++

Assumptions and Limitations
+++++++++++++++++++++++++++

Cause Model Diagram
+++++++++++++++++++

Data Tables
++++++++++++++++++++++++++++++++

Calculating Burden
++++++++++++++++++

Years of life lost
"""""""""""""""""""

Years lived with disability
"""""""""""""""""""""""""""

Modeling multiple maternal disorders together
+++++++++++++++++++++++++++++++++++++++++++++

Since the :ref:`MNCNH Portfolio simulation
<2024_concept_model_vivarium_mncnh_portfolio>` uses Vivarium timesteps
in a nonstandard way, we need to do more work to specify how different
simulation components interact and in what order decisions should be
made. This has two implications for modeling multiple maternal disorders
subcauses together:

1. We need to decide in which order to make decisions about the
   different maternal disorders subcauses, which will be important if
   there are causal interactions between them.
2. If a simulant experiences multiple maternal disorders simultaneously,
   we need to specify how to determine whether the simulant dies from
   one of the subcauses, and from which one.

To deal with the above two issues, we will

* Split incidence and mortality into separate timesteps
* Have a single timestep that handles mortality from all the maternal
  disorders subcauses together
* Have a separate incidence timestep for each of the modeled maternal
  disorders subcauses

More details are in the following two subsections.

Subcause ordering
"""""""""""""""""

We anticipate that there are correlations and perhaps causal
relationships between various maternal disorders subcauses. In Wave 1,
we are ignoring such interactions and treating the different subcauses
as independent. However, to be able to handle such interactions in
future waves, the simulation should make decisions about the different
subcauses in the order of the suspected causal relationships, as
follows:

#. Maternal hypertensive disorders
#. Obstructed labor and uterine rupture
#. Maternal hemorrhage
#. Maternal sepsis and other maternal infections
#. Residual maternal disorders

Mortality component
"""""""""""""""""""

Validation Criteria
+++++++++++++++++++

References
----------
