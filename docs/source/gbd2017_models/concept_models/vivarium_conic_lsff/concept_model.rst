.. _2017_concept_model_vivarium_conic_lsff:

=============================================
Vivarium CoNIC Large Scale Food Fortification
=============================================

Model Overview
--------------

Objective
+++++++++

Intervention Definitions
++++++++++++++++++++++++

Questions of Interest
+++++++++++++++++++++

Scope of Modeling
+++++++++++++++++


Concept Model Diagram
---------------------

.. image:: lsff_concept_model_diagram.svg

Model Components
----------------

Time
++++

* Start and end year: **2020 -- 2025**
* Simulation time step: **1 day** to capture short timeframe of diarrheal
  diseases and neonatal causes

Demographics
++++++++++++

* Locations: **Nigeria, India, Ethiopia**
* Population: **Prospective open cohort of 0-5 year-olds**
* Size of largest starting population: **100,000 simulants**
* Youngest start-age and oldest end-age: **0 -- 5 years**
* Exit age (at what age to stop tracking simulants): **5 years**
* Fertility: **Crude birth rate**

Stratification
++++++++++++++

Stratify by **location, age, sex, and year**.

Scenarios
+++++++++

Simulate five scenarios (each nutrient separately, plus iron and
folic acid together, plus baseline):

#. Baseline (using data on existing coverage of fortification)
#. Vitamin A scale-up
#. Iron scale-up
#. Folic Acid scale-up
#. Iron + Folic Acid scale-up

GBD Causes
++++++++++

* :ref:`Measles <2017_cause_measles>`

* :ref:`Diarrheal Diseases <2017_cause_diarrhea>`

* :ref:`Lower Respiratory Infections <2017_cause_lower_respiratory_infections>`

* :ref:`Neural Tube Defects <2017_cause_neural_tube_defects>`


GBD Risks
+++++++++

* :ref:`Low Birth Weight and Short Gestation (LBWSG) <2017_risk_lbwsg>`

PAF-of-1 Cause/Risk Pairs
+++++++++++++++++++++++++

* :ref:`Vitamin A Deficiency / Vitamin A Deficiency <2017_cause_vitamin_a_deficiency>`

* :ref:`Dietary Iron Deficiency / Iron Deficiency <2017_cause_iron_deficiency>`

Risk-Outcome Relationships
++++++++++++++++++++++++++

Coverage Gap Framework
++++++++++++++++++++++

Interventions
+++++++++++++

Vitamin A Fortification
~~~~~~~~~~~~~~~~~~~~~~~

Iron Fortification
~~~~~~~~~~~~~~~~~~

Folic Acid Fortification
~~~~~~~~~~~~~~~~~~~~~~~~

Population Coverage Data
^^^^^^^^^^^^^^^^^^^^^^^^

.. todo::

  Define a, b, and c prior to displaying their values in the table below.

The following table provides data for three parameters, :math:`a`, :math:`b`,
and :math:`c`, that will be used in our `coverage algorithm`_ for the folic acid
intervention. The food vehicle referred to in the table is wheat flour.

.. list-table:: Means and 95% CI's for existing population coverage of folic acid fortification (% of total population)
  :widths: 5 5 5 5
  :header-rows: 1

  * - Location
    - :math:`a` = Eats fortified vehicle
    - :math:`b` = Eats fortifiable vehicle
    - :math:`c` = Eats vehicle
  * - Ethiopia
    - 1.0
    - 7.7
    - 14.0
  * - India
    - 6.3 (4.8, 7.9)
    - 7.1 (5.6, 9.1)
    - 83.2 (79.5, 86.5)
  * - Nigeria (Kano)
    - 22.7 (20.0, 25.5)
    - 83.8 (81.4, 86.2)
    - 83.9 (81.5, 86.3)
  * - Nigeria (Lagos)
    - 5.4 (3.8, 6.9)
    - 13.8 (11.5, 16.1)
    - 14.2 (11.8, 16.5)

**For Ethiopia**, assume

.. math::

  a_\textit{Ethiopia} \sim \operatorname{Beta}(0.1,9.9),\quad
  b_\textit{Ethiopia} \sim \operatorname{Beta}(0.3,3.6),\quad
  c_\textit{Ethiopia} \sim \operatorname{Beta}(0.4,2.46).

The means of these `Beta distributions
<https://en.wikipedia.org/wiki/Beta_distribution>`_ will have the values shown
in the table. Each of the densities has an asymptote at 0 and an x-intercept at
1, and the parameters :math:`\alpha` and :math:`\beta` were chosen to vary
monotonically with the mean. The numbers for Ethiopia were chosen so that (i)
the mean of existing fortification coverage is close to 0, (ii) the percentage
of people eating wheat flour is similar to that in Lagos, Nigeria, and (iii) 55%
of the wheat flour is fortifiable, based on the `Global Fortification Data
Exchange <https://tinyurl.com/rdm4wza>`_.

.. _GFDx Ethiopia Dashboard: https://fortificationdata.org/country-fortification-dashboard/?alpha3_code=ETH&lang=en

**For all the locations other than Ethiopia**, use a Beta distribution with mean
equal to the central estimate, and variance equal to the variance of a normal
distribution with the same mean and 95% confidence interval.

.. todo::

  Show how to get the correct Beta distribution. Maybe even include some graphs.

To ensure that :math:`a<b<c` for each country, sample :math:`a`, :math:`b`, and
:math:`c` so that they all have the same `percentile rank
<https://en.wikipedia.org/wiki/Percentile_rank>`_ in their respective
distributions. This can be done by using `inverse transform sampling
<https://en.wikipedia.org/wiki/Inverse_transform_sampling>`_ to generate all
three variables (:math:`a`, :math:`b`, and :math:`c`) from a single uniform
random variable :math:`u`.

To compute the coverage levels :math:`a`, :math:`b`, and :math:`c` for the whole
country of Nigeria, we will take a population-weighted average of the
corresponding values for Kano and Lagos. Kano has a population of about 4
million, and Lagos has a population of about 21 million, so we have

.. math::

  a_\textit{Nigeria}
  = \tfrac{4}{25} a_\textit{Kano} + \tfrac{21}{25} a_\textit{Lagos},

and similarly for :math:`b` and :math:`c`. `Couple
<https://en.wikipedia.org/wiki/Coupling_(probability)>`_ the random variables
:math:`a_\textit{Kano}` and :math:`a_\textit{Lagos}` by giving them the same
percentile rank (i.e. use the same strategy described above for coupling
:math:`a`, :math:`b`, and :math:`c`). This coupling strategy will create greater
uncertainty in the weighted average :math:`a_\textit{Nigeria}` than if we
sampled the two estimates indepdently, and more uncertainty seems like a good
idea since we're trying to estimate an average for the entire country based on
only two data points. Moreover, this coupling seems plausible since the data for
Kano and Lagos were from the same paper and therefore could have a similar bias.

Coverage Algorithm
^^^^^^^^^^^^^^^^^^

Let :math:`C(t)` denote the proportion of the population receiving fortified
food (i.e. the population coverage) after :math:`t` years, and let :math:`t_0`
denote the time at which our folic acid intervention starts. Our folic acid
intervention algorithm is described by the following formula:

.. math::

  C(t) =
  \begin{cases}
  a & \text{if $t<t_0$,}\\
  c - (c-b)(1-r)^{t-t_0} & \text{if $t\ge t_0$,}
  \end{cases}

where :math:`a`, :math:`b`, and :math:`c` are the randomly sampled `population
coverage data`_ estimates from the previous section, and :math:`r \in [0,1]` is
a user-defined parameter representing the proportion of people each year who
start off eating an unfortifiable version of the vehicle but can be convinced to
switch to the fortified vehicle.

By default, we will start the intervention at :math:`t_0 = 1 \text{ year}`, and we'll assume :math:`r = 0.1` (i.e. an additional 10% of unfortifiable food will be converted to fortified food each year). We may later want to specify different values of these parameters for different locations.

In words, our intervention algorithm does the following:

1.  Before time :math:`t_0`, the population coverage is the proportion
    :math:`a` of people who are already eating the fortified vehicle.

2.  At time :math:`t_0`, the population coverage jumps immediately from
    :math:`a` to :math:`b`, i.e. the proportion of people who are already eating
    a fortifiable version of the vehicle. The rationale for this instantaneous
    jump is that the government begins enforcing fortification laws at time
    :math:`t_0`.

3.  After time :math:`t_0`, we run a campaign to convince people to switch to
    fortified food, and the rate of conversion is controlled by the parameter
    :math:`r`, with values close to 0 modeling a slow conversion, and values
    close to 1 modeling a fast conversion.

4.  If we let the simulation run forever, the population coverage would
    approach the value :math:`c`, i.e. the proportion of people who eat the
    vehicle.

Determining Whether a Simulant Is Affected
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Folic acid `reduces the birth prevalence <effect size_>`_ of :ref:`neural tube
defects (NTDs) <2017_cause_neural_tube_defects>`. In order for a newborn to have
a reduced risk of NTDs, the baby's mother needs sufficient folate intake *three
months prior to pregnancy*. Therefore, only babies born to mothers who have been
eating folic-acid-fortified food for at least a year will have any benefit from
our intervention.

With this in mind, here is the algorithm to determine whether a simulant is affected by the folic acid intervention:

1.  **Define variables:** Each simulant needs a boolean attribute
    `mother_ate_folate_fortified_food`, which will be `True` if the simulant's
    mother ate folic-acid-fortified food starting at least a year before the
    simulant was born, and `False` otherwise.

2.  **Initialize the simulation:** At the start of the simulation, set
    `mother_ate_folate_fortified_food = False` for all simulants; this attribute
    will not be used after the simulant is born, so the value is irrelevant for
    all simulants already alive at the start of the simulation.

3.  **Initialize simulants born into the simulation:** For each simulant born
    at time :math:`t` (in years), the probability that the simulant's mother
    started eating folic-acid-fortified food at least a year ago is equal to the
    population coverage one year ago, :math:`C(t-1)`. Therefore, upon the
    simulant's birth, do the following:

  a.  Generate a uniform random number :math:`u\sim
      \operatorname{Uniform}([0,1])`.

  b.  If :math:`u<C(t-1)`, set `mother_ate_folate_fortified_food = True`;
      otherwise set `mother_ate_folate_fortified_food = False`.

Note that we are assuming that once someone (in this case the baby's mother)
starts eating fortified food, they will continue to eat the fortified food
forever.

The variable `mother_ate_folate_fortified_food` will be used to determine the
probability that the newborn has a neural tube defect. We will describe how to
do this below.

Effect Size
^^^^^^^^^^^

Folic acid fortification reduces the birth prevalence of :ref:`neural tube
defects (NTDs) <2017_cause_neural_tube_defects>`. The effect size is measured as
a risk ratio (RR), where we think of "no fortification" as a risk factor:

.. math::

  RR = \frac{P(\text{born with NTD} \mid \text{no fortification})}
  {P(\text{born with NTD} \mid \text{fortification})}
  \approx \frac{1}{0.59\: (0.49, 0.70)}
  \approx 1.71\: (1.43, 2.04).

We are estimating this effect size as the reciprocal of the odds ratio (OR) of
:math:`0.59\: (0.49, 0.70)` found in the Keats review; this odds ratio is the
ratio of the odds of being born with NTDs in the fortified population to the
odds of being born with NTDs in the unfortified population. Since the prevalence
of NTDs is small, the odds ratio is very close to the risk ratio.

To model the uncertainty in the estimate, the above RR should be drawn from a
`lognormal <https://en.wikipedia.org/wiki/Log-normal_distribution>`_
distribution with median = 1.71, 2.5\ :superscript:`th`-percentile = 1.43, and
97.5\ :superscript:`th`-percentile = 2.04. This distbibution can be created
using `SciPy's lognorm function
<https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.lognorm.html>`_
as follows:

.. code-block:: Python

  from numpy import log
  from scipy.stats import norm, lognorm

  # median and 0.975-quantile of lognormal distribution for RR
  median = 1.71
  q_975 = 2.04

  # 0.975-quantile of standard normal distribution (=1.96, approximately)
  q_975_stdnorm = norm().ppf(0.975)

  mu = log(median) # mean of normal distribution for log(RR)
  sigma = (log(q_975) - mu) / q_975_stdnorm # std dev of normal distribution for log(RR)

  # Frozen lognormal distribution for RR, representing uncertainty in our effect size
  # (s is the shape parameter; the scale parameter is exp(mu), which equals the median)
  rr_distribution = lognorm(s=sigma, scale=median)


Determining Whether a Simulant Is Born with an NTD
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The procedure here uses the standard coverage gap framework:

1.  Compute a PAF based on the above RR
2.  When a simulant is born, check whether `mother_ate_folate_fortified_food` is
    `True`. If so, the simulant has an NTD with probability equal to the
    risk-deleted prevalence birth_prevalence_of_NTDs_in_GBD * (1-PAF).
    Otherwise, their risk of an NTD is increased by a factor of RR, to
    birth_prevalence_of_NTDs_in_GBD * (1-PAF) * RR.
3.  Once the simulant's probability of an NTD is determined, decide whether
    they actually have one using standard inverse transform sampling for the
    Bernoulli random variable representing the simulant's
    `has_neural_tube_defect` boolean attribute.

.. todo::

  Write this out more explicitly. Perhaps it would be better to merge
  `Determining Whether a Simulant Is Affected`_ into this section.

Desired Model Outputs
---------------------

Observers
+++++++++

Verification and Validation Strategy
------------------------------------

Design Decisions and Rationales
-------------------------------

Do not explicitly model neonatal disorders, meningitis, or other LBWSG-affected causes
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

For context, here are `treemaps for Nigeria and India on GBD Compare <http://ihmeuw.org/51tj>`_ showing that the majority of DALYs attributable to low birth weight and short gestation in the under-5 age groups are due to neonatal disorders, LRI, diarrhea, and meningitis.

Although the sub-causes of  :ref:`neonatal disorders
<2017_cause_neonatal_disorders>` account for the majority of disease burden in
the neonatal age groups, we are not explicitly modeling the neonatal causes in
this simulation. Instead, the relative risks from :ref:`low birth weight and
short gestation <2017_risk_lbwsg>` will directly affect each simulant's
mortality rate, which indirectly accounts for mortality due to neonatal
disorders and other causes like meningitis. Since iron fortification affects
birth weight and hence the relative risk of mortality that a simulant
experiences, this approach allows us to count how many deaths can be averted
from an increased birth weight resulting from iron fortification. This approach
ignores morbidity from neonatal disorders, meningitis, and other causes in the
neonatal age groups, but YLDs for neonates are negligible compared to YLLs (on
the order of 100 times smaller), so ignoring YLDs due to neonatal disorders and
other causes is not a concern.

Additional reasons for excluding neonatal disorders, meningitis, and other
causes affected by low birth weight and short gestation are as follows:

* The relative risks for :ref:`low birth weight and short gestation
  <2017_risk_lbwsg>` are not cause-specific, but rather apply to all-cause
  mortality. Thus it is simpler and more consistent with the input data to group
  all the LBWSG-affected causes together rather than modeling them explicitly,
  unless those causes need to interact with other model components (as is the
  case with :ref:`diarrheal diseases <2017_cause_diarrhea>` and :ref:`lower
  respiratory infections <2017_cause_lower_respiratory_infections>`, which are
  affectd by :ref:`vitamin A deficiency <2017_cause_vitamin_a_deficiency>`).

* Neonatal disorders is potentially problematic because:

  #. We know its (birth) prevalence does not include (birth) prevalence of
     :ref:`other neonatal disorders <2017_cause_neonatal_other>`, for which
     there is no data, and

  #. We know the relative risks are wrong for :ref:`preterm birth
     <2017_cause_neonatal_preterm>` because this sub-cause is PAF-of-1 with
     LBWSG.

* Meningitis is potentially problematic because we have not successfully
  modeled it before. In our initial attempt to include meningitis in the BEP
  model, the simulated meningitis CSMR significantly underestimated the GBD CSMR
  for meningitis in all age groups.

* Other causes affected by LBWSG, such as encephalitis, upper respiratory
  infections, and otitis media, have very few DALYs attributable to LBWSG. Thus
  it is not worth the effort to model these causes explicitly, though averted
  YLLs due to these cause will in theory be captured by the above strategy of
  using the LBWSG relative risks to affect the overall mortality rate of
  simulants.
