:orphan:

.. _2024_facility_model_vivarium_mncnh_portfolio:

Delivery Facility Choice Model
==============================

..contents::
   :local:
   :depth: 2

Background
----------

To capture the complex relationship between choice of delivery facility (home birth vs a facility with basic emergency obstetric and neonatal care [BEmONC] vs a facility with comprehensive care [CEmONC]), the belief about gestational age (believed pre-term vs believed full term), and the related factors of antenatal care (ANC), and low birth weight and short gestation (LBWSG) risk exposure, we will include two novel affordances in our simulation: (1) correlated propensities for ANC, home delivery, and LBWSG; and (2) conditional probabilities for home delivery that differ based on the believed term status when labor begins.

Coming up with values for these correlations and conditional probabilities that are consistent with GBD and external evidence is detailed at the end of this document.  But before we get to that complexity, let's start with how we will use these correlations and conditional probabilities in the simulation.

[[Causal model diagram goes here]]

Note that the calibration procedure, and hence the values we're using here (i.e., the correlations and values of P(facility | believed preterm status)) depend critically on the implementations of other pieces of the model that are described elsewhere (most notably, choice of ultrasound type given ANC status, and deriving an estimated gestational age from the true gestational age).

Correlated propensities
-----------------------

This section describes how we will model an "instrisic correlation" of ANC, home delivery, and LBWSG.  In short, we will use a Gaussian copula to model this, which has three parameters capturing the correlation between each pair of the three propensities.

The motivation for these correlations is as follows: we hypothesize that there are important "common causes" that are not shown explicitly in the diagram above.  For example, having a home delivery and having no ANC visits might both be influenced by rurality --- if all health services are offered far away, it is logical that people will be able to access them less.
Similarly, it is likely that there are social exclusion factors causing both exposure to LBWSG risk and lack of access to ANC and in-facility birth.
In a simulation model where we have not included scenarios that change these common-cause factors, we do not have to model their effects explicitly.
For our purposes, it is sufficient to capture the correlations between ANC, in-facility birth, and LBWSG risk exposure.

In Vivarium, we use values selected uniformly at random from the interval [0,1], which we call propensities, to keep attributes like LBWSG and ANC calibrated at the population level while reducing variance between scenarios at the simulant level.  This makes it straightforward to represent the correlation in our factors by generating correlated propensities. The :code:`statsmodels.distributions.copula.api.GaussianCopula` implementation can make them::

    from statsmodels.distributions.copula.api import GaussianCopula
    copula = GaussianCopula([[1., .5, .1],
                             [.5, 1., .1],
                             [.1, .1, 1.]])
    copula.rvs(10)

.. list-table:: Propensity Correlation Stand-in Parameters
   :header-rows: 1
   :widths: 20 20 20

   * - Factor A
     - Factor B
     - Correlation
   * - ANC Propensity
     - Home Delivery Propensity
     - 0.50
   * - ANC Propensity
     - LBWSG Propensity
     - 0.10
   * - Home Delivery Propensity
     - LBWSG Propensity
     - 0.10

Eventually we must put draws of consistent values in the artifact.

Special ordering of the categories
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Our method of inducing correlations using a Gaussian copula is equivalent to specifying the `polychoric correlation <https://en.wikipedia.org/wiki/Polychoric_correlation>`_ between the variables, and relies on having a known ordering of variable values.

When we calibrate the model, we will use an ordering of the LBWSG categories that we hypothesize will makes them have large polychoric correlate with the ANC and home delivery propensities.  To achieve this, we will order them from highest average RR to lower average RR (averaged across all draws).  Note that this is sex-specific, and based on the RRs for the early neonatal age group!  This ordering must also be used in the Risk component.

We will also order the ANC and home delivery propensities from highest to lowest risk: no ANC < some ANC; and home birth < BEmONC < CEmONC.

To be more explicit about how the ordered categories and propensities work in code, if the categories are ordered from highest risk to lowest risk as :math:`c_1, \dotsc, c_n`, divide the unit interval :math:`[0,1]` into :math:`n` subintervals :math:`I_1, \dotsc, I_n` ordered from left to right, such that the length of :math:`I_j` is :math:`P(c_j)`. Then a uniform propensity :math:`p \in [0,1]` corresponds to category :math:`c_j` precisely when :math:`p \in I_j`. [[A picture would probably help, should we add one here?]]


Conditional probabilities of home delivery
------------------------------------------

In addition to correlation, we posit that a belief about preterm status is influential in the decision to have a home delivery.  We will model this as a conditional probability of home delivery given a belief about preterm status.  Although deriving consistent values for these conditional probabilities is complex, and described in the final section of this page, *using* the conditional probabilities is simple: simply select the facility type with :math:`\text{Pr}[\text{facility}\mid\text{believed preterm}]` and :math:`\text{Pr}[\text{facility}\mid\text{believed fullterm}]` for the corresponding cases.

.. list-table:: Conditional Probability Stand-in Parameters
   :header-rows: 1
   :widths: 20 20 20 20

   * - Belief
     - Home
     - BeMONC
     - CeMONC
   * - Term
     - 0.25
     - 0.10
     - 0.65
   * - Preterm
     - 0.05
     - 0.05
     - 0.90

Challenge of calibrating the model
----------------------------------

We have developed a nonlinear optimization model to find a consistent set of parameters for the Gaussian copula and the conditional probabilities.
It will be described in detail here.

Link to code implementing it, too.


Range of propensity and probabilities that are consistent with existing data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An important result of this optimization was to determine that the system is underdetermined.  With the existing data we have available, there are a range of consistent values for the propensity and probability parameters.  This section explores the tradeoffs between the parameters, to guide us in setting appropriate values.

It might be easier to think about "probability gaps", meaning the difference between the conditional probabilities conditioned on believed full term and believed preterm than to think about the absolute magnitude of these probabilities.
