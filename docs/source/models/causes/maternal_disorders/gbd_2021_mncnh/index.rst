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
    modeled.

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

Subcause ordering
"""""""""""""""""

Mortality component
"""""""""""""""""""

We will have a single simulation timestep that handles mortality from
all the maternal disorders subcauses together. The mortality timestep
should happen after the incidence timesteps of all the maternal
disorders subcauses. The mortlity timestep will work similarly to the
mortality component in a standard Vivarium simulation.

On the mortality timestep, first we will determine whether the simulant
dies of *any* of the maternal disorders subcauses. Then, if the simulant
dies, we will decide which maternal disorder caused the death. Suppose
after the incidence timesteps for all the maternal disorders subcauses,
a simulant simultaneously has cases of :math:`k` different subcauses,
say :math:`c_1, \dotsc, c_k`. Then the probability that the simulant
dies of one of these subcauses is

.. math::

    \Pr (\text{simulant dies of a maternal disorder})
    = \sum_{i=1}^k \operatorname{cfr}_i,

where :math:`\operatorname{cfr}_i` is the case fatality risk of the
:math:`i^\mathrm{th}` subcause, :math:`c_i`. If the simulant dies, the
probability that they die of :math:`c_i` is then

.. math::

    \Pr(\text{simulant dies of $c_i$}
    \mid \text{simulant dies of a maternal disorder})
    = \frac{\operatorname{cfr}_i}{\sum_{i=1}^k \operatorname{cfr}_i}.

Clearly these conditional probabilities sum to 1, so every simulant who
dies will be assigned a cause of death.

If a simulant has more than one maternal disorders subcause
simultaneously,...
Suppose a simulant has...
Let
:math:`\mathrm{causes} = \{c_1, \dotsc, c_k\}` be the set of maternal
disorders subcauses that a simulant has after the incidence timesteps.

Validation Criteria
+++++++++++++++++++

References
----------
