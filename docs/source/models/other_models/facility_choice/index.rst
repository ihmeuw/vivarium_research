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
the believed preterm status when labor begins.

As a simplification, we will model the choice of delivery location in
two steps: First, the birthing person decides whether to deliver at home
or go to a facility, depending on the believed preterm status at the
start of labor. Then, among simulants delivering in-facility, we will
randomly assign simulants to BEmONC or CEmONC facilities, independent of
other choices that have been made. Additionally, we do not currently
model facility transfers, and we think of the delivery facility as the
*final* location of the delivery if there were transfers between
facilities.

Coming up with values for the needed correlations and causal
probabilities for facility choice that are consistent with GBD and
external evidence is detailed at the end of this document.  But before
we get to that complexity, let's start with how we will use these
correlations and causal probabilities in the simulation.

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

The following `causal diagram`_ shows the simulant attributes needed for
choosing each simulant's delivery facility, and the causal relationships
between them that we will simulate:

.. _causal diagram: https://en.wikipedia.org/wiki/Causal_graph

.. graphviz::
  :caption: Causal graph showing the variables affecting birth facility

  digraph facility_choice {

    sex [label="(S)ex of infant"]
    lbw [label="(LBW) Low birth\nweight status"]
    anc [label="(ANC) Antenatal\ncare attendance"]
    preterm [label="(P)reterm status"]
    preterm_guess [label="(P') Believed\npreterm status"]
    ifd [label="(IFD status) In-facility\ndelivery status"]

    subgraph categorical {
        node [color=green2 style=filled]
        lbwsg_cat [label="LBWSG (cat)egory"]
        ultrasound [label="(U)ltrasound type"]
        facility [label="Birth (F)acility"]
    }

    subgraph continuous {
        node [color=orange style=filled]
        ga [label="(GA) Gestational age\nat start of labor"]
         ga_estimate [
            label = "(GA') Estimated gestational\nage at start of labor"
        ]
        birthweight [label="(BW)\nBirth weight"]
        error [label="(E)rror in GA\nestimation"]
    }

    subgraph propensities {
        node [shape=box color=lightblue3 style=filled]
        sex_propensity [label="u_S"]
        anc_propensity [label="u_ANC"]
        ultrasound_propensity [label="u_U"]
        error_propensity [label="u_E"]
        ifd_propensity [label="u_IFD"]
        facility_propensity [label="u_F"]
    }

    subgraph cluster_lbwsg_propensities {
        label="LBWSG exposure propensities"
        color=lightblue3
        node [shape=box color=lightblue3 style=filled]
        bw_propensity [label="u_BW"]
        cat_propensity [label="u_cat"]
        ga_propensity [label="u_GA"]
    }

    subgraph cluster_lbwsg {
        label="LBWSG exposure"
        lbwsg_cat -> birthweight
        lbwsg_cat -> ga
    }

    sex_propensity -> sex [color=lightblue3]
    cat_propensity -> lbwsg_cat [color=lightblue3]
    ga_propensity -> ga [color=lightblue3]
    bw_propensity -> birthweight [color=lightblue3]

    sex -> lbwsg_cat
    birthweight -> lbw [color=purple]
    ga -> error
    ga -> ga_estimate [color=purple]
    ga -> preterm [color=purple]
    ga_estimate -> preterm_guess [color=purple]
    anc_propensity -> anc [color=lightblue3]
    anc -> ultrasound
    ultrasound_propensity -> ultrasound [color=lightblue3]
    ultrasound -> error
    error_propensity -> error [color=lightblue3]
    error -> ga_estimate [color=purple]
    preterm_guess -> ifd [label="Pr[IFD status | do(P')]"]

    ifd_propensity -> ifd [color=lightblue3]
    facility_propensity -> facility [color=lightblue3]
    ifd -> facility

    anc_propensity -> cat_propensity [arrowhead="none" style="dashed"]
    anc_propensity -> ifd_propensity [arrowhead="none" style="dashed"]
    cat_propensity -> ifd_propensity [arrowhead="none" style="dashed"]
  }


.. admonition:: Legend

  Nodes

  :black and white oval: dichotomous variable
  :green oval: polytomous variable
  :orange oval: continuous variable
  :blue-grey rectangle: propensity, :math:`u \sim \operatorname{Uniform}([0,1])`

  Edges

  :dashed line: correlation
  :black arrow: probabilistic causal relationship
  :purple arrow: deterministic causal relationship
  :blue-grey arrow: input a propensity to simulate randomness

..
    Documentation for field list syntax used above:
    https://docutils.sourceforge.io/docs/user/rst/quickref.html#field-lists
    Original description of propensity arrows:
    * Light blue-gray arrows represent the input of propensities to
      simulate randomness in a probabilistic relationship

Note that the only `exogenous variables`_ in the model are the
propensities, and the simulant attributes in all the ovals are
endogenous, being completely determined once the propensities are
specified.

.. _exogenous variables: https://en.wikipedia.org/wiki/Exogenous_and_endogenous_variables

The causal model calibration uses observed data and an optimization
procedure to find consistent values for the three correlations between
the propensities :math:`u_\text{ANC}`, :math:`u_\text{IFD}`, and
:math:`u_\text{cat}`, and the causal probabilities
:math:`\Pr[\text{IFD status} \mid \operatorname{do}(P')]`
for the arrow from believed preterm status to in-facility delivery status.
The sections below record the values of these correlations and causal
probabilities and detail how to use them in the Vivarium simulation to
assign the final birth facility node, F.

Related modules and submodels
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Instructions for assigning the variables in the causal model are spread
out across the :ref:`pregnancy component modules
<mncnh_portfolio_pregnancy_component_modules>` and the later sections in
this document:

.. list-table:: Location of documentation for causal model variables
  :header-rows: 1
  :widths: 10 10

  * - Documentation sections
    - Variables
  * - * :ref:`Initial attributes module
        <2024_vivarium_mncnh_portfolio_initial_attributes_module>`
      * `Correlated propensities`_ (below)
    - * ANC propensity (:math:`u_\text{ANC}`)
      * IFD propensity (:math:`u_\text{IFD}`)
      * LBWSG category propensity (:math:`u_\text{cat}`)
  * - * :ref:`Pregnancy module
        <2024_vivarium_mncnh_portfolio_pregnancy_module>`
      * :ref:`LBWSG risk exposure model <2019_risk_exposure_lbwsg>`
      * `Special ordering of the categories for categorical variables`_
        (below)
    - * :ref:`Sex of infant
        <other_models_pregnancy_closed_cohort_mncnh_sex_of_infant>` (S)
      *  :ref:`LBWSG exposure
         <other_models_pregnancy_closed_cohort_mncnh_lbwsg_exposure>`
         (cat, BW, GA)
      * Low birth weight status (LBW)
      * Preterm status (P)
  * - * :ref:`ANC module <2024_vivarium_mncnh_portfolio_anc_module>`
      * `Special ordering of the categories for categorical variables`_
        (below)
    - * ANC attendance
  * - * :ref:`AI ultrasound module
        <2024_vivarium_mncnh_portfolio_ai_ultrasound_module>`
    - * Ultrasound type (U)
      * Error in gestational age estimation (E)
      * Estimated gestational age (GA')
      * Believed preterm status (P')
  * - * :ref:`Facility choice module
        <2024_vivarium_mncnh_portfolio_facility_choice_module>`
      * `Causal conditional probabilities for in-facility delivery`_
        (below)
      * `Special ordering of the categories for categorical variables`_
        (below)
    - * In-facility delivery status (IFD status)
      * Birth facility (F)

Assumptions and limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~

* The causal model was designed to capture the effect of expanded
  coverage of AI ultrasound on choice of delivery facility, so only the
  variables deemed important for this effect were included. If in the
  future we want to intervene on variables besides the ultrasound (U)
  node (for example, expand ANC coverage), we would likely need to add
  more nodes and/or edges to the model.
* Moving to a higher level care facility during the intrapartum period
  is common (referred up once labor begins if there is an issue) and the
  ability to do this is often a result of available transport, distance
  to clinics, etc. We currently do not include this level of detail and
  instead have simulants remain at a single facility for the whole
  intrapartum period. In the future, we may devise a strategy to model
  facility transfers, which may necessitate some changes to the facility
  choice model.
* The timing of a standard ultrasound affects its accuracy in
  determining gestational age (ultrasounds in the first trimester are
  more accurate than ultrasounds in later pregnancy). However, the
  facility choice model currently uses a dichotomous variable for ANC
  ("no ANC" vs. "some ANC"), so we are unable to model the timing of the
  ultrasound, instead defining a single category "standard ultrasound"
  that uses the average measurement error for ultrasounds taken at any
  point during pregnancy. In Wave II, we are planning to add more detail
  to the timing of ANC visits, which should allow us to more accurately
  model the uncertainty in GA estimation with standard ultrasounds,
  using the data in `this paper
  <https://obgyn.onlinelibrary.wiley.com/doi/10.1002/uog.15894>`__.
* The diagram posits a causal relationship of gestational age (GA) on
  the error (E) in estimating the gestational age. Specifically, we have
  some empirical data from GF that shows that, in the absence of an
  accurate ultrasound, larger gestational ages are more likely to be
  underestimated, while smaller gestational ages are more likely to be
  overestimated. E.g., if the true GA is 42 when you go into labor, you
  are more likely to think that the GA is 40 than to think it is 44,
  since very few pregnancies last 44 weeks. This effect would correspond
  to having the mean of the distribution of E depend on the value of GA,
  but for simplicity we do not model this effect, instead assuming that
  the mean error is 0 regardless of GA. Thus, in our current modeling
  strategy, the arrow from GA to E is a "no-op" relationship, and E
  depends only on the ultrasound type. The impact on our results of
  omitting this effect will likely be small since the effect is more
  pronounced at the extremes of the GA distribution and not as
  pronounced near the preterm cutoff of 37 weeks.
* The causal model includes birth weight (BW) and low birth weight
  status (LBW), but these are not currently used in the causal model
  optimization due to lack of data.

.. _facility_choice_correlated_propensities_section:

Correlated propensities
-----------------------

This section describes how we will model an "intrinsic correlation" of
ANC, home delivery, and LBWSG (see also the :ref:`Initial attributes
module <2024_vivarium_mncnh_portfolio_initial_attributes_module>`). In
short, we will use a Gaussian copula to model this, which has three
parameters capturing the correlation between each pair of the three
propensities.

The motivation for these correlations is as follows: we hypothesize that there are important "common causes" that are not shown explicitly in the diagram above.  For example, having a home delivery and having no ANC visits might both be influenced by rurality --- if all health services are offered far away, it is logical that people will be able to access them less.
Similarly, it is likely that there are social exclusion factors causing both exposure to LBWSG risk and lack of access to ANC and in-facility birth.
In a simulation model where we have not included scenarios that change these common-cause factors, we do not have to model their effects explicitly.
For our purposes, it is sufficient to capture the correlations between ANC, in-facility birth, and LBWSG risk exposure.

In Vivarium, we use values selected uniformly at random from the
interval [0,1], which we call propensities, to keep attributes like
LBWSG and ANC calibrated at the population level while reducing variance
between scenarios at the simulant level.  This makes it straightforward
to represent the correlation in our factors by generating correlated
propensities. The
:code:`statsmodels.distributions.copula.api.GaussianCopula`
`implementation <statsmodels GaussianCopula_>`_ can make them:

.. _statsmodels GaussianCopula: https://www.statsmodels.org/dev/generated/statsmodels.distributions.copula.api.GaussianCopula.html

.. code-block:: pycon

    >>> from statsmodels.distributions.copula.api import GaussianCopula
    >>> # Input is a correlation matrix
    >>> copula = GaussianCopula([[1.,   .63, .2],
    ...                          [.63, 1.,   .2],
    ...                          [.2,  .2,   1.]])
    >>> # Each row contains 3 correlated propensities
    >>> copula.rvs(10_000)
    array([[0.29526683, 0.46781445, 0.43541525],
           [0.99146813, 0.94380918, 0.85479776],
           [0.46910608, 0.02300572, 0.49231122],
           ...,
           [0.01671794, 0.05403445, 0.0198954 ],
           [0.17063032, 0.27517952, 0.1050379 ],
           [0.66795735, 0.8360376 , 0.83390585]])

..
  Note: For reproducibility, I actually called
  copula.rvs(10_000, random_state=numpy.random.default_rng(25))
  to generate these numbers.

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
    - 0.41
    - 0.35
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

The above correlations were computed in the
facility_choice_optimization_3_countries_ notebook in the MNCNH
Portfolio research repository.

.. _facility_choice_optimization_3_countries:
  https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/facility_choice/facility_choice_optimization_3_countries.ipynb

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
  different values, but this would require the simulation to call the
  optimization code, which takes 10-15 minutes to run. Alternatively, we
  could precompute several sets of consistent parameters, and then
  different scenarios would only have to specify which set of values to
  use.

.. _facility_choice_special_ordering_of_categories_section:

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
(preterm < term), then from highest average RR to lowest average RR
in the early neonatal age group (averaged across all draws), separately
for each sex.**

.. important::

  * All preterm categories (< 37 weeks) are ordered **before** all
    term categories (37+ weeks)
  * The ordering is **sex-specific** (the ordering is different for
    males and females)
  * Within each preterm status (preterm or term), LBWSG categories are
    ordered in **decreasing** order by (sex-specific) average relative
    risk across draws
  * The ordering is based on the RRs for the **early neonatal** age
    group since we're interested in the risk right after birth

  This ordering must be used when initializing the LBWSG category from
  its (correlated) propensity :math:`u_\text{cat}`, following the
  strategy described on the :ref:`LBWSG risk exposure page
  <2019_risk_exposure_lbwsg>`.

**We will also order the ANC and IFD propensities from highest to lowest
risk:**

ANC attendance categories
  no ANC < ANC in later pregnancy < ANC in 1st trimester <
  ANC in 1st trimester and later pregnancy

IFD status categories
  home birth < in-facility birth

These orderings must be used when initializing simulants' ANC status and
IFD status from the corresponding (correlated) propensities
:math:`u_\text{ANC}` and :math:`u_\text{IFD}`. See the :ref:`Antenatal
care attendance module <2024_vivarium_mncnh_portfolio_anc_module>` for
more details on assigning ANC status; see the `Causal conditional
probabilities for in-facility delivery`_ section below for an explicit
description of how to assign IFD status.

.. note::

  The facility choice causal optimization model has not yet been updated
  to make use of all four ANC attendance categories or the corresponding
  additional detail for ultrasound timing. Accordingly, the
  :ref:`AI-ultrasound module
  <2024_vivarium_mncnh_portfolio_ai_ultrasound_module>` currently groups
  the last three ANC categories together, effectively making ANC
  attendance a dichotomous variable with categories ordered "no ANC" <
  "some ANC".

  In a future version of the model, we plan to use the more detailed ANC
  attendance information to determine whether simulants get a standard
  ultrasound in the 1st trimester or in later pregnancy, which affects
  the accuracy of GA estimation. Making these changes will require
  updating the `facility choice causal optimization code
  </facility_choice_>`_ and the final outputs used in the Vivarium
  simulation.

To be more explicit about how the ordered categories and propensities
work in code: If the categories are ordered from highest risk to lowest
risk as :math:`c_1, \dotsc, c_n`, divide the unit interval :math:`[0,1]`
into :math:`n` subintervals :math:`I_1, \dotsc, I_n` ordered from left
to right, such that the length of :math:`I_j` is :math:`\Pr(c_j)`. Then
a uniform propensity :math:`u \in [0,1]` corresponds to category
:math:`c_j` precisely when :math:`u \in I_j`. This correspondence
specifies how each ordinal variable should be initialized from its
corresponding propensity. [[A picture would probably help, should we add
one here?]]

.. _facility_choice_causal_probabilities_section:

Causal conditional probabilities for in-facility delivery
---------------------------------------------------------

In addition to correlation, we posit that a belief about preterm status
is influential in the decision to have a home delivery (see the
:ref:`Facility choice module
<2024_vivarium_mncnh_portfolio_facility_choice_module>`).  We will model
this as a causal conditional probability of home delivery given a belief
about preterm status.  Although deriving consistent values for these
probabilities is complex, and described in the final section of this
page, *using* the causal conditional probabilities is simple: Simply
select in-facility delivery with probability
:math:`\text{Pr}[\text{in-facility}\mid \operatorname{do}(\text{believed preterm})]`
or
:math:`\text{Pr}[\text{in-facility}\mid \operatorname{do}(\text{believed term})]`
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
     - 0.38
     - 0.17
   * - :math:`\text{Pr}[\text{in-facility}\mid \operatorname{do}(\text{believed preterm})]`
     - 1 - 0.38
     - 1 - 0.38
     - 1 - 0.17
   * - :math:`\text{Pr}[\text{at-home}\mid \operatorname{do}(\text{believed term})]`
     - 0.55
     - 0.51
     - 0.26
   * - :math:`\text{Pr}[\text{in-facility}\mid \operatorname{do}(\text{believed term})]`
     - 1 - 0.55
     - 1 - 0.51
     - 1 - 0.26

More explicitly, given the simulant's believed preterm status (either
"believed preterm" or "believed term") and their IFD propensity,
:math:`u_\text{IFD}`, the simulant's IFD status is given by the
following function :math:`f_\text{IFD}`:

.. math::

  \begin{align*}
  \text{IFD status}
  &= f_\text{IFD}(\text{believed preterm status},\ u_\text{IFD}) \\
  &=  \begin{cases}
      \text{at-home}, & \text{if}\quad u_\text{IFD}
          < \text{Pr}[\text{at-home} \mid
          \operatorname{do}(\text{believed preterm status})] \\
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

The above causal probabilities were computed in the
facility_choice_optimization_3_countries_ notebook in the MNCNH
Portfolio research repository.

.. note::

  The above probabilities represent the *causal* effect of a simulant's
  believed preterm status on their choice of home delivery or in-facility
  delivery. These will be different from the population's *observed*
  conditional probabilities of IFD status given the believed preterm
  status, because of the correlations of :math:`u_\text{IFD}` with
  :math:`u_\text{ANC}` and :math:`u_\text{cat}`.

.. _facility_choice_choosing_bemonc_cemonc_section:

Choosing BEmONC vs. CEmONC
~~~~~~~~~~~~~~~~~~~~~~~~~~

Among simulants whose IFD status is "in-facility," choose CEmONC according 
to the location-specific probabilities in the `CSV saved here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/991b7d99caf175449a26858e6ed5f053e89a9781/data_prep/hospital_ifd_estimates.csv>`__.
Since in-facility deliveries occur in either BEmONC or CEmONC facilities, 
the probability of delivering in a BEmONC facility is the complement of 
the CEmONC probability (i.e., 1 - P(CEmONC)). These estimates are from 
the Health Systems team, representing the proportion of in-facility 
deliveries that occur in hospitals, which we are using as a proxy for 
CEmONC facilities. We currently use the most recent year available, 2024, 
for all locations.
The decision of whether a simulant who gives birth in-facility delivers
in a BEmONC or CEmONC facility should be independent from other choices 
in the model.


Once BEmONC or CEmONC has been chosen for all in-facility deliveries,
use this choice in conjunction with the IFD status to **assign one of
the three values "home", "BEmONC", or "CEmONC" as the final birth
facility (F) of each simulant.**

.. note::

  The following information was implemented as a placeholder prior to
  completion of the final facility choice model. It is retained in this
  note for reference.

  The placeholder delivery facility probabilities were as follows:

    - Home: 68.3%

    - Hospital (CEMONC): 26.6%

    - Clinic/low-level facility (BEMONC): 5.1%

  The placeholder values are from `this paper on Ethiopia
  <https://link.springer.com/article/10.1186/s12884-020-03002-x#Tab2>`_,
  which analyzes DHS data. Note that denominator in DHS is all births
  (live and stillbirths) to interviewed women in the two years preceding
  the survey.

  **Note that these placeholder values have been superseded by the
  values in the table above, from DHS and other sources, and we are
  planning to update them again with data from the Health Systems
  team.**

  V&V: Confirm attendance rate for each type of delivery facility
  matches inputs

  Limitation: Moving to a higher level care facility during the
  intrapartum period is common (referred up once labor begins if there
  is an issue) and the ability to do this is often a result of transport
  available, distance to clinics, etc. We will not include this and
  instead have simulants remain at a single facility for the whole
  intrapartum period.

  TODO: update to be consistent with BEMONC/CEMONC terminology?

.. _facility_setting_rates:

Overall delivery setting rates
-------------------------------

While these values will not be used as direct inputs in assigning a 
delivery setting to simulants in the simulation, the population-level
delivery setting rates will still be relevant in calculating PAFs for
interventions that vary by delivery setting as well as for verification
and validation. Therefore, the following parameters should be included
in the artifact:

.. list-table:: Delivery setting rate parameters to be included in the artifact
  :header-rows: 1

  * - Parameter
    - Definition
    - Value
    - Use
  * - :code:`bemonc_facility_fraction`
    - Proportion of births that occur in facility settings (inclusive of both BEmONC and CEmONC facilities) that occur in BEmONC facilities
    - Defined in the `Choosing BEmONC vs. CEmONC`_ section
    - Directly used in assigning a delivery facility in the facility choice model
  * - :code:`in_facility_delivery_proportion`
    - Proportion of all births that occur in facility settings (including both BEmONC and CEmONC)
    - mean_value of GBD covariate 51 (do NOT include any parameter uncertainty in this parameter as only the mean_value was used as an input to the delivery facility model calibration)
    - Used in the calculation of the following parameters
  * - :code:`p_home`
    - Proportion of all births that occur at home
    - :code:`1 - in_facility_delivery_proportion`
    - Used in calculating total population intervention coverage as a weighted average across delivery settings for intervention with coverage that varies by delivery facility at baseline and for V&V
  * - :code:`p_bemonc`
    - Proportion of all births that occur in BEmONC facilities
    - :code:`in_facility_delivery_proportion * bemonc_facility_fraction`
    - Used in calculating total population intervention coverage as a weighted average across delivery settings for intervention with coverage that varies by delivery facility at baseline and for V&V
  * - :code:`p_cemonc`
    - Proportion of all births that occur in CEmONC facilities
    - :code:`in_facility_delivery_proportion * (1 - bemonc_facility_fraction)`
    - Used in calculating total population intervention coverage as a weighted average across delivery settings for intervention with coverage that varies by delivery facility at baseline and for V&V

Challenge of calibrating the model
----------------------------------

We have developed a nonlinear optimization model to find a consistent
set of parameters for the Gaussian copula and the causal conditional
probabilities.
It will be described in detail here.

Code for running the causal optimization model can be found in the
`/facility_choice`_ folder in the `MNCNH Portfolio research repo
<https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/tree/main>`_.
The original writeup describing the idea behind the optimization is `on
Sharepoint`__.

.. _/facility_choice:
  https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/tree/main/facility_choice

__ `delivery facility strategy document`_
.. _delivery facility strategy document:
  https://uwnetid.sharepoint.com/:w:/r/sites/ihme_simulation_science_team/Shared%20Documents/Research/BMGF_MNCH/MNCNH%20portfolio%20products/01_Planning/facility%20choice%20strategy.docx?d=w7162395b8aec410ca62c63d69ff82255&csf=1&web=1&e=j14aAU

.. todo::

  Add more details about how the calibration works.

Range of propensity and probabilities that are consistent with existing data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An important result of this optimization was to determine that the system is underdetermined.  With the existing data we have available, there are a range of consistent values for the propensity and probability parameters.  This section explores the tradeoffs between the parameters, to guide us in setting appropriate values.

It might be easier to think about "probability gaps", meaning the difference between the conditional probabilities conditioned on believed full term and believed preterm than to think about the absolute magnitude of these probabilities.
