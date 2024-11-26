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
say :math:`c_1, \dotsc, c_k`. We will assume that the probability that
the simulant dies of one of these subcauses is

.. math::

    \Pr (\text{simulant dies of one of $c_1,\dotsc, c_k$}
    \mid \text{simulant has $c_1,\dotsc, c_k$})
    = \sum_{i=1}^k \operatorname{cfr}_i,

where :math:`\operatorname{cfr}_i` is the case fatality risk (a.k.a.
case fatality rate) of the :math:`i^\mathrm{th}` subcause, :math:`c_i`.
If the simulant dies, we then specify that the probability that they die
of :math:`c_i` should be

.. math::

    \Pr(\text{simulant dies of $c_i$}
    \mid \text{simulant dies of one of $c_1,\dotsc, c_k$})
    = \frac{\operatorname{cfr}_i}{\sum_{i=1}^k \operatorname{cfr}_i}.

Clearly these conditional probabilities sum to 1, so every simulant who
dies will be assigned a cause of death. Moreover, we claim that using the
above conditional probabilities will lead to the correct case fatality
risk for all the maternal disorders subcauses.

To see this, first observe that multiplying the above two equations
yields

.. math::
    :label: cfr_cond_indep_eqn

    \Pr(\text{simulant dies of $c_i$}
    \mid \text{simulant has $c_1,\dotsc, c_k$})
    = \operatorname{cfr}_i

This holds because if :math:`A, B, C` are events with :math:`A\subseteq
B \subseteq C`, then

.. math::

    P(A\mid B)\, P(B\mid C) = P(A\mid C).

In particular, :eq:`cfr_cond_indep_eqn` holds for **any set of causes**
:math:`c_1,\dotsc, c_k`, **as long as** :math:`c_i` **is one of them**.
Therefore, when we compute the overall case fatality risk of :math:`c_i`
over the entire population of simulants, we get

 .. math::

    \begin{align*}
    \Pr(\text{simulant dies of $c_i$} \mid \text{simulant has $c_i$})
        \hspace{-7cm}& \\
    &= \sum_{S\subseteq \{\text{all causes except $c_i$} \}}
        \Pr(\text{simulant dies of $c_i$}
        \mid \text{simulant has $c_i$ and all causes in $S$})
    \end{align*}

Note: This probability doesn't depend on :math:`c_2,\dotsc, c_k`.




Validation Criteria
+++++++++++++++++++

References
----------
