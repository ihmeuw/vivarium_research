.. _2024_facility_model_vivarium_mncnh_portfolio:

Delivery Facility Choice Model
==============================

.. contents::
  :local:
  :depth: 2


Background
----------

To capture the complex relationship between choice of delivery facility
(home birth vs a facility with basic emergency obstetric and neonatal
care [BEmONC] vs a facility with comprehensive care [CEmONC]), the
belief about gestational age (believed pre-term vs believed full term),
and the related factors of antenatal care (ANC), and low birth weight
and short gestation (LBWSG) risk exposure, we will include two novel
affordances in our simulation: (1) correlated propensities for ANC,
in-facility delivery (IFD), and LBWSG category; and (2) causal
conditional probabilities for in-facility delivery that differ based on
the believed term status when labor begins.

As a simplification, we will model the choice of delivery location in
two steps: First, the birthing person decides whether to deliver at home
or go to a facility, depending on the believed preterm status at the
start of labor. Then, among simulants delivering in-facility, we will
randomly assign simulants to BEmONC or CEmONC facilities, independent of
other choices that have been made.

Coming up with values for the needed correlations and causal
probabilities that are consistent with GBD and external evidence is
detailed at the end of this document.  But before we get to that
complexity, let's start with how we will use these correlations and
causal probabilities in the simulation.

Note that the calibration procedure, and hence the values we're using
here (i.e., the correlations and the values of
:math:`\Pr[\text{IFD status} \mid \operatorname{do}(\text{believed preterm status})]`)
depend critically on the implementations of other pieces of the model
that are described elsewhere (most notably, choice of ultrasound type
given ANC status, and deriving an estimated gestational age from the
true gestational age -- see the :ref:`AI Ultrasound Module
<2024_vivarium_mncnh_portfolio_ai_ultrasound_module>` for more details).

Causal model
------------

[[Causal model diagram goes here]]

Correlated propensities
-----------------------

This section describes how we will model an "instrisic correlation" of
ANC, home delivery, and LBWSG (see also the :ref:`Initial attributes
module <2024_vivarium_mncnh_portfolio_initial_attributes_module>`). In
short, we will use a Gaussian copula to model this, which has three
parameters capturing the correlation between each pair of the three
propensities.

The motivation for these correlations is as follows: we hypothesize that there are important "common causes" that are not shown explicitly in the diagram above.  For example, having a home delivery and having no ANC visits might both be influenced by rurality --- if all health services are offered far away, it is logical that people will be able to access them less.
Similarly, it is likely that there are social exclusion factors causing both exposure to LBWSG risk and lack of access to ANC and in-facility birth.
In a simulation model where we have not included scenarios that change these common-cause factors, we do not have to model their effects explicitly.
For our purposes, it is sufficient to capture the correlations between ANC, in-facility birth, and LBWSG risk exposure.

In Vivarium, we use values selected uniformly at random from the interval [0,1], which we call propensities, to keep attributes like LBWSG and ANC calibrated at the population level while reducing variance between scenarios at the simulant level.  This makes it straightforward to represent the correlation in our factors by generating correlated propensities. The :code:`statsmodels.distributions.copula.api.GaussianCopula` implementation can make them:

.. code-block:: pycon

    >>> from statsmodels.distributions.copula.api import GaussianCopula
    >>> # Input is a correlation matrix
    >>> copula = GaussianCopula([[1.,   .64, .2],
    ...                          [.64, 1.,   .2],
    ...                          [.2,  .2,   1.]])
    >>> # Each row contains 3 correlated propensities
    >>> copula.rvs(10_000)
    array([[0.29591901, 0.46609153, 0.43592752],
          [0.99152512, 0.94530017, 0.85288664],
          [0.46295916, 0.02359119, 0.49424445],
          ...,
          [0.01641805, 0.05247892, 0.02022793],
          [0.16978166, 0.27245795, 0.10548769],
          [0.67100234, 0.83628491, 0.83330358]])

The argument of the ``GaussianCopula`` constructor is a `correlation
matrix`_, whose :math:`(i,j)^\text{th}` entry specifies the correlation
between variable :math:`i` and variable :math:`j` (note that this
implies that the matrix is symmetric with 1's on the diagonal, and
furthermore is positive semidefinite). The three "intrinsic
correlations" are the values in the upper right (or lower left)
triangle.

.. _correlation matrix: https://en.wikipedia.org/wiki/Correlation#Correlation_matrices

We may eventually specify draw-level estimates of each model parameter,
but for now we will specify a single set of consistent parameters for
each location, representing our best estimate or "mean draw" of the
parameters.

.. list-table:: Propensity correlations for mean draw
  :header-rows: 1
  :widths: 10 10 10 10 10 20

  * - Factor A
    - Factor B
    - Ethiopia
    - Nigeria
    - Pakistan
    - Notes
  * - ANC propensity :math:`u_\text{ANC}`
    - IFD propensity :math:`u_\text{IFD}`
    - 0.63
    - 0.46
    - 0.36
    - Correlation found from causal model optimization after the other
      two correlations were fixed
  * - ANC propensity :math:`u_\text{ANC}`
    - LBWSG category propensity :math:`u_\text{cat}`
    - 0.2
    - 0.2
    - 0.2
    - Chosen arbitrarily as a plausible value
  * - IFD propensity :math:`u_\text{IFD}`
    - LBWSG category propensity :math:`u_\text{cat}`
    - 0.2
    - 0.2
    - 0.2
    - Chosen arbitrarily as a plausible value

.. note::

  The causal model has 5 independent unknown parameters (3 correlations
  and 2 causal probabilities), but we have insufficient data to solve
  for all of them. Consequently, we fix two of the correlations and run
  the optimization to find the other three parameters (the third
  correlation and the two causal probabilities). Eventually we will want
  to run sensitivity analyses where we change the values of the fixed
  correlations (currently set to 0.2 in the table above), which requires
  updating the other three parameters to consistent values based on the
  results of the causal model optimization.

  One way to do this would be to specify the two fixed correlations in
  ``model_spec.yaml`` and use a branches file to run parallel sims with
  different values, but this would require Vivarium to call the
  optimization code, which takes 10-15 minutes to run. Alternatively, we
  could precompute several sets of consistent parameters, and then
  different scenarios would only have to specify which set of values to
  use.

Special ordering of the categories for categorical variables
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Our method of inducing correlations using a Gaussian copula is
equivalent to specifying the `polychoric correlation
<https://en.wikipedia.org/wiki/Polychoric_correlation>`_ between ordinal
variables, and it relies on having a known ordering of each variable's
values. We will follow the convention of ordering the categories of all
categorical variables from "highest risk" to "lowest risk" (GBD often
follows this convention for risk factors), so that larger propensities
are generally "better" for the simulant.

We use an ordering of the LBWSG categories that we hypothesize will make
them have large polychoric correlation with the ANC and IFD
propensities. Our chosen ordering also facilitates convergence of the
causal model optimization, whose objective function involves the
conditional probability of preterm status given facility choice.
**Specifically, we order the LBWSG categories first by preterm status
(preterm < full-term), then from highest average RR to lowest average RR
in the early neonatal age group (averaged across all draws), separately
for each sex.**

.. important::

  * All preterm categories (:math:`< 37` weeks) are ordered **before** all full-term
    categories (:math:`\ge 37` weeks)
  * The ordering is **sex-specific** (the ordering is different for
    males and females)
  * Within each term status (preterm or full-term), LBWSG categories are
    ordered in **decreasing** order by (sex-specific) average relative
    risk across draws
  * The ordering is based on the RRs for the **early neonatal** age
    group since we're interested in the risk right after birth

  This ordering must be used when initializing the LBWSG category from
  its (correlated) propensity :math:`u_\text{cat}`, following the
  strategy described on the :ref:`LBWSG risk exposure page
  <2019_risk_exposure_lbwsg>`.

**We will also order the ANC and IFD propensities from highest to lowest
risk: "no ANC" < "some ANC"; and "home birth" < "in-facility birth".**
These orderings must be used when initializing simulants' ANC status and
IFD status from the corresponding (correlated) propensities
:math:`u_\text{ANC}` and :math:`u_\text{IFD}`. See the :ref:`Antenatal
care attendance module <2024_vivarium_mncnh_portfolio_anc_module>` for
more details on assigning ANC status; see the `Causal conditional
probabilities for in-facility delivery`_ section below for an explicit
description of how to assign IFD status.

To be more explicit about how the ordered categories and propensities
work in code, if the categories are ordered from highest risk to lowest
risk as :math:`c_1, \dotsc, c_n`, divide the unit interval :math:`[0,1]`
into :math:`n` subintervals :math:`I_1, \dotsc, I_n` ordered from left
to right, such that the length of :math:`I_j` is :math:`P(c_j)`. Then a
uniform propensity :math:`u \in [0,1]` corresponds to category
:math:`c_j` precisely when :math:`u \in I_j`. This correspondence
specifies how each ordinal variable should be initialized from its
corresponding propensity. [[A picture would probably help, should we add
one here?]]


Causal conditional probabilities for in-facility delivery
---------------------------------------------------------

In addition to correlation, we posit that a belief about preterm status
is influential in the decision to have a home delivery.  We will model
this as a causal conditional probability of home delivery given a belief
about preterm status.  Although deriving consistent values for these
probabilities is complex, and described in the final section of this
page, *using* the causal conditional probabilities is simple: Simply
select in-facility delivery with probability
:math:`\text{Pr}[\text{in-facility}\mid \operatorname{do}(\text{believed preterm})]`
or
:math:`\text{Pr}[\text{in-facility}\mid \operatorname{do}(\text{believed full-term})]`
for the corresponding cases, using the correlated IFD propensity and
category ordering defined in the previous section.

.. list-table:: Causal conditional probabilities of in-facility delivery for mean draw
   :header-rows: 1
   :widths: 20 20 20 20

   * - Causal probability
     - Ethiopia
     - Nigeria
     - Pakistan
   * - :math:`\text{Pr}[\text{at-home}\mid \operatorname{do}(\text{believed preterm})]`
     - 0.38
     - 0.27
     - 0.11
   * - :math:`\text{Pr}[\text{in-facility}\mid \operatorname{do}(\text{believed preterm})]`
     - 1 - 0.38
     - 1 - 0.27
     - 1 - 0.11
   * - :math:`\text{Pr}[\text{at-home}\mid \operatorname{do}(\text{believed full-term})]`
     - 0.55
     - 0.55
     - 0.29
   * - :math:`\text{Pr}[\text{in-facility}\mid \operatorname{do}(\text{believed full-term})]`
     - 1 - 0.55
     - 1 - 0.55
     - 1 - 0.29

More explicitly, given the simulant's believed term status (either
"believed preterm" or "believed full-term") and their IFD propensity,
:math:`u_\text{IFD}`, the simulant's IFD status is given by the
following function :math:`f_\text{IFD}`:

.. math::

  \begin{align*}
  \text{IFD status}
  &= f_\text{IFD}(\text{believed term status},\ u_\text{IFD}) \\
  &=  \begin{cases}
      \text{at-home}, & \text{if}\quad u_\text{IFD}
          < \text{Pr}[\text{at-home} \mid
          \operatorname{do}(\text{believed term status})] \\
      \text{in-facility}, & \text{otherwise}.
      \end{cases}
  \end{align*}

Note that, as described in the previous section,  smaller values of
:math:`u_\text{IFD}` correspond with home delivery, while larger values
of :math:`u_\text{IFD}` correspond with in-facility delivery. This
ordering is important for the model to calibrate using the specified
propensity correlations. The function :math:`f_\text{IFD}` is one of the
`structural equations`_ defining the causal model drawn above.

.. _structural equations: https://en.wikipedia.org/wiki/Structural_equation_modeling

.. note::

  The above probabilities represent the *causal* effect of a simulant's
  believed term status on their choice of home delivery or in-facility
  delivery. These will be different from the population's *observed*
  conditional probabilities of IFD status given the believed term
  status, because of the correlations of :math:`u_\text{IFD}` with
  :math:`u_\text{ANC}` and :math:`u_\text{cat}`.

For reference when validating the model, the in-facility delivery
proportions from GBD 2021 (covariate ID 51, "In-Facility Delivery
(proportion)") are listed below. The observed overall IFD proportions in
the simulation should match these values, but these probabilities will
not be used directly in the simulation (they were used as one of the
inputs in calibrating the model to find the causal probabilities above).

.. list-table:: Proportion of at-home vs. in-facility deliveries
  :header-rows: 1
  :widths: 20 10 10 10

  * - IFD status
    - Ethiopia
    - Nigeria
    - Pakistan
  * - at-home
    - 0.507432
    - 0.479903
    - 0.228234
  * - in-facility
    - 0.492568
    - 0.520097
    - 0.771766

Choosing BEmONC vs. CEmONC
~~~~~~~~~~~~~~~~~~~~~~~~~~

Among simulants whose IFD status is "in-facility," choose BEmONC vs.
CEmONC according to the following probabilities, independently of other
choices in the model:

.. list-table:: Conditional probabilities of BEmONC and CEmONC given in-facility delivery
  :header-rows: 1
  :widths: 20 10 10 10

  * - Conditional probability
    - Ethiopia
    - Nigeria
    - Pakistan
  * - :math:`\text{Pr}[\text{BEmONC}\mid \text{in-facility}]`
    - 0.160883
    - 0.004423
    - 0.340528
  * - :math:`\text{Pr}[\text{CEmONC}\mid \text{in-facility}]`
    - 1 - 0.160883
    - 1 - 0.004423
    - 1 - 0.340528

.. todo::

  Update the above probabilities once we get better data from Annie's
  team. The current values (except for Pakistan, which is based on
  microdata from BMGF) are based on an imprecise analysis of DHS data
  and likely underestimate the proportion of BEmONC facilities.

Challenge of calibrating the model
----------------------------------

We have developed a nonlinear optimization model to find a consistent set of parameters for the Gaussian copula and the conditional probabilities.
It will be described in detail here.

Link to code implementing it, too.


Range of propensity and probabilities that are consistent with existing data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An important result of this optimization was to determine that the system is underdetermined.  With the existing data we have available, there are a range of consistent values for the propensity and probability parameters.  This section explores the tradeoffs between the parameters, to guide us in setting appropriate values.

It might be easier to think about "probability gaps", meaning the difference between the conditional probabilities conditioned on believed full term and believed preterm than to think about the absolute magnitude of these probabilities.
