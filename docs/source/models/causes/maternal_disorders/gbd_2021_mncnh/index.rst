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

.. note::

    We may need to adjust the strategy for deciding mortality after
    implementing the "residual" maternal disorders subcause to capture
    DALYs from maternal disrders that are not explicitly modeled. In
    particular, some of the un-modeled subcauses are YLL only, so we
    will not have incidence rate data, so we'll have to assign deaths
    among the entire pregnant population rather than among incident
    cases.

On the mortality timestep, first we will determine whether the simulant
dies of *any* of the maternal disorders subcauses. Then, if the simulant
dies, we will decide which maternal disorder caused the death. Suppose
after the incidence timesteps for all the maternal disorders subcauses,
a simulant simultaneously has cases of :math:`k` different subcauses,
say :math:`c_1, \dotsc, c_k`. We will assume that the probability that
the simulant dies of one of these subcauses is

.. math::
    :label: prob_dies_eqn

    P(\text{simulant dies of one of $c_1,\dotsc, c_k$}
    \mid \text{simulant has $c_1,\dotsc, c_k$ only})
    = \sum_{i=1}^k \operatorname{cfr}_i,

where :math:`\operatorname{cfr}_i` is the case fatality risk (a.k.a.
case fatality rate) of the :math:`i^\mathrm{th}` subcause, :math:`c_i`.
If the simulant dies, we then specify that the probability that they die
of :math:`c_i` should be

.. math::
    :label: prob_ci_eqn

    P\left(\text{simulant dies of $c_i$}
    \:\middle|\:
    \genfrac{}{}{0pt}{}
    {\text{simulant has $c_1,\dotsc, c_k$ only}}{\text{and dies of one of them}}
    \right)
    = \frac{\operatorname{cfr}_i}{\sum_{i=1}^k \operatorname{cfr}_i}.

Clearly these conditional probabilities sum to 1, so every simulant who
dies will be assigned a cause of death. Moreover, we claim that using the
above conditional probabilities will lead to the correct case fatality
risk for all the maternal disorders subcauses.

To see this, first observe that multiplying the above two equations
yields

.. math::
    :label: cfr_cond_indep_eqn

    P(\text{simulant dies of $c_i$}
    \mid \text{simulant has $c_1,\dotsc, c_k$ only})
    = \operatorname{cfr}_i,
    \text{ if } c_i \in \{c_1,\dotsc, c_k\}.

In particular, :eq:`cfr_cond_indep_eqn` holds for **any set of causes**
:math:`c_1,\dotsc, c_k`, **as long as** :math:`c_i` **is one of them**.
Therefore, when we compute the overall case fatality risk of :math:`c_i`
by averaging over the entire population of simulants who have the cause
:math:`c_i`, we get

 .. math::
    :label: cfr_correct_eqn

    \begin{align*}
    P(\text{simulant dies of $c_i$} \mid \text{simulant has $c_i$})
        \hspace{-7.5cm}& \\
    &= \sum_k \sum_{\substack{c_1,\dotsc, c_k\in \text{causes}
        \\ c_i \in \{c_1,\dotsc, c_k\}}}
        P(\text{dies of $c_i$}
        \mid \text{has $c_1,\dotsc, c_k$ only})
        \cdot P(\text{has $c_1,\dotsc, c_k$ only} \mid \text{has $c_i$})\\
    &= \sum_k \sum_{\substack{c_1,\dotsc, c_k\in \text{causes}
        \\ c_i \in \{c_1,\dotsc, c_k\}}}
        \operatorname{cfr}_i
        \cdot P(\text{has $c_1,\dotsc, c_k$ only} \mid \text{has $c_i$})\\
    &= \operatorname{cfr}_i \cdot  \sum_k
        \sum_{\substack{c_1,\dotsc, c_k\in \text{causes}
            \\ c_i \in \{c_1,\dotsc, c_k\}}}
        P(\text{has $c_1,\dotsc, c_k$ only} \mid \text{has $c_i$})\\
    &= \operatorname{cfr}_i \cdot 1.
    \end{align*}

The first step and last step hold because the union of the disjoint
events :math:`\{\text{has $c_1,\dotsc, c_k$ only}\}` over all subsets
:math:`\{c_1,\dotsc, c_k\}` containing the cause :math:`c_i` equals the
event :math:`\{\text{has $c_i$}\}`. Since :math:`c_i` was arbitrary, we
get

.. math::

    P(\text{simulant dies of $c_i$} \mid \text{simulant has $c_i$})
    = \operatorname{cfr}_i

for all maternal disorders subcauses :math:`c_i` as claimed.

.. warning::

    If the case fatality risks of some of the maternal disorders
    subcauses are too large, the "probability" calculated in
    :eq:`prob_dies_eqn` may be greater than 1, which would lead the
    model to underestimate the true case fatality risks. This problem
    could be fixed, for example, by scaling down the probability in
    :eq:`prob_dies_eqn` to be less than 1, and scaling up the
    probability :math:`P(\text{simulant dies of $c_i$} \mid
    \text{simulant has $c_i$ only})` so that the average of the
    probabilities computed in :eq:`cfr_correct_eqn` still works out to
    the correct overall case fatality risk :math:`\operatorname{cfr}_i`.
    Note that the probabilities in :eq:`cfr_correct_eqn` depend on the
    joint distribution of all the causes, so in order to solve for the
    correct probability, we would either need some information about the
    joint distribution, or we would have to calibrate the model
    empirically.

    The potential for probabilities greater than 1 illustrates an
    inherent deficiency in the above methodology. Specifically, the the
    two assumptions :eq:`prob_dies_eqn` and :eq:`prob_ci_eqn` lead to
    the equation :eq:`cfr_cond_indep_eqn`, which is equivalent to the
    assumption that **the case fatality risk of** :math:`c_i` **is
    conditionally independent of whatever other causes you have, given
    that you have** :math:`c_i`. It is not difficult to see that this
    assumption cannot hold in general. For example, if you have a
    particularly deadly form of cancer, your case fatality risk for that
    cancer might be quite high in general. However, if you are also
    falling off a cliff, the case fatality risk of the cancer will be 0,
    since you will die of the fall with probability 1 before the cancer
    kills you.

    That is, in general, we expect the probability of dying from
    :math:`c_i` to depend on what other causes you have concurrently,
    because there could be crowd out effects (e.g., the fall crowds out
    the cancer in the example above) or possibly "reinforcement" effects
    between the different causes. However, we suspect that this won't be
    an issue for the maternal disorders we are modeling, and the above
    calculations will likely be good enough approximations for our
    purposes.

Validation Criteria
+++++++++++++++++++

References
----------
