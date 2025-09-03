..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  +++++++++++++++++++++

  Section Level 2 (#.#)
  ---------------------

  Section Level 3 (#.#.#)
  ~~~~~~~~~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

.. _other_models_alzheimers_population:

=======================================================
Alzheimer's Population Model with Demographic Forecasts
=======================================================

.. contents::
  :local:

.. list-table:: Abbreviations
  :header-rows: 1

  * - Abbreviation
    - Definition
  * - AD
    - Alzheimer's Disease
  * - BBBM
    - Blood-Based Biomarker
  * - GBD
    - Global Burden of Disease
  * - FHS
    - Future Health Scenarios
  * - MCI
    - Mild Cognitive Impairment

Overview
++++++++

The goal of this population model is to model only simulants with
Alzheimer's disease (and other dementias), in order to reduce the
necessary population size for the :ref:`CSU Alzheiemer's simulation
<2025_concept_model_vivarium_alzheimers>`. The model document is split
into two parts: 1) initializing the population, and 2) adding new
simulants during the simulated timeframe. We will also describe two
different versions of the population model, corresponding to
progressive model version of the CSU Alzheiemer's simulation:

#. **Models 2 and 3:** Modeling simulants with Alzheimer's disease (AD)
   and other dementias as defined by GBD
#. **Model 4 and above:** Modeling simulants with presymptomatic AD,
   MCI, or AD dementia

Since this is the model that
includes details on how to use forecasts of population size, we have also
included information on how to use forecasts of all-cause mortality rate
(this is not really part of the Alzheimer's Population Model however).

Initializing the Population
+++++++++++++++++++++++++++

We will first describe how to initialize the population for AD and other
dementias ad defined by GBD, then we will explain how to modify the
initialization strategy when including the presymptomatic and MCI stages
of AD.

Model Scale
---------------------

Let :math:`t_0` be the starting time of our simulation, let
:math:`X_{t_0}` be the size of our simulated population at
initialization (i.e., the initial population size per draw specified in
the concept model), and let :math:`X^\text{real}_{t_0}` be the
corresponding real-world population at time :math:`t_0` that our
simulation is supposed to represent. The **model scale**, :math:`S`, of
our simulation is defined to be :math:`S = X_{t_0} /
X^\text{real}_{t_0}`. We will use the model scale
both for initializing our simulated population and for adding new
simulants.

In our case, :math:`X^\text{real}_{t_0}` is the population of people
with Alzheimer's disease and other dementias at time :math:`t_0` in a
particular country. We can compute this as

.. math::

  X^\text{real}_{t_0} = p_\text{AD} \cdot Y^\text{real}_{t_0},

where :math:`Y^\text{real}_{t_0}` is the total population at time
:math:`t_0` in our simulated location according to GBD, and
:math:`p_\text{AD}` is the prevalence of Alzheimer's disease and other
dementias across all age groups and sexes in that location. Note that
the model scale can also be computed as :math:`S = Y_{t_0} /
Y^\text{real}_{t_0}`, where :math:`Y_{t_0} = X_{t_0} / p_\text{AD}` is
the size of an **imagined total model population** including all people
with and without Alzheiemer's disease, of which those with Alzheimer's
are the ones who appear in our simulation. Putting everything together,

.. math::
  :label: model_scale_eq

  S = \frac{X_{t_0}}{p_\text{AD}\cdot Y^\text{real}_{t_0}},

which computes the model scale in terms of known parameters.

Initializing Demographic Subgroups
-----------------------------------

Let :math:`g` denote a demographic subgroup of the population in a given
location, namely :math:`g = (\text{age group, sex})`. For each
demographic group :math:`g` and time :math:`t`, we generalize the
notation in the previous section to define the following
populations in demographic group :math:`g` at time :math:`t`:

* :math:`X_{g,t}` = the number of simulants in group :math:`g` at time
  :math:`t`
* :math:`X^\text{real}_{g,t}` = the real population corresponding to our
  simulated population :math:`X_{g,t}`
* :math:`Y_{g,t}` = the imagined total model population in group
  :math:`g`, including people with and without AD, of which
  :math:`X_{g,t}` counts the subset with AD
* :math:`Y^\text{real}_{g,t}` = the total real population in group
  :math:`g` at time :math:`t` according to GBD


We need to determine :math:`X_{g,t_0}` (the initial simulated
population) for each demographic group :math:`g`. Let :math:`p_{g,t}` be
the prevalence of Alzheimer's disease and other dementias in demographic
group :math:`g` at time :math:`t,` for a given location. Two relations
among the above quantities are:

.. math::

  \begin{align*}
  X_{g,t} = S \cdot X^\text{real}_{g,t}
  \quad\text{and}\quad
  X^\text{real}_{g,t} = p_{g,t} \cdot Y^\text{real}_{g,t}.
  % X_{g,t} &= p_g \cdot Y_{g,t} \\
  % Y_{g,t} & = S \cdot Y^\text{real}_{g,t}
  \end{align*}

(For :math:`t\ne t_0`, the first relation assumes that our simulated
population accurately tracks the real-world population over time.)
Therefore, at time :math:`t_0`,

.. math::
  :label: initial_pop_eq

  X_{g,t_0}
  = S \cdot X^\text{real}_{g,t_0}
  = S\cdot p_{g,t_0} \cdot Y^\text{real}_{g,t_0}
  = X_{t_0} \cdot \frac{p_{g,t_0}}{p_\text{AD}}
    \cdot \frac{Y^\text{real}_{g,t_0}}{Y^\text{real}_{t_0}},

where the final equality follows from plugging in formula
:eq:`model_scale_eq` for the model scale :math:`S`. This equation tells
us how many simulants to initialize into each demographic group based on
known parameters.

.. note::

  Another way to write :eq:`initial_pop_eq` is

  .. math::

    X_{g,t_0} = X_{t_0}
    \cdot \frac{\text{# of real people in subgroup $g$ with Alzheimer's}}
      {\text{# of real people in whole population with Alzheimer's}}.

  Thus, we could compute :math:`X_{g,t_0}` using prevalence counts from
  GBD instead of prevalence rates.

  To verify that :eq:`initial_pop_eq` gives us the correct total number of
  initial simulants, note that

  .. math::

    \begin{align*}
    \sum_g X_{g,t_0}
    = \sum_g X_{t_0}
      \cdot \frac{p_{g,t_0} \cdot Y^\text{real}_{g,t_0}}
      {p_\text{AD} \cdot Y^\text{real}_{t_0}}
    &= X_{t_0} \cdot \sum_g
      \frac{X^\text{real}_{g,t_0}}{X^\text{real}_{t_0}} \\
    &= X_{t_0} \cdot
      \frac{\sum_g X^\text{real}_{g,t_0}}{X^\text{real}_{t_0}}
    = X_{t_0} \cdot
      \frac{X^\text{real}_{t_0}}{X^\text{real}_{t_0}}
    = X_{t_0}.
    \end{align*}

Initializing simulants with  presymptomatic and MCI stages
----------------------------------------------------------

Starting in Model 4 of the CSU Alzheimer's simulation, the Alzheimer's
cause model includes two pre-dementia stages, BBBM-AD, and MCI-AD, in
addition to the dementia stage AD-dementia. When computing the model
scale and initializing demographic subgroups, :math:`p_\text{AD}` should
be replaced by :math:`p_\text{(all AD states)}`, the combined prevalence
of the three states BBBM-AD, MCI-AD, and AD-dementia, across all
demographic groups at time :math:`t_0`. Similarly, :math:`p_{g,t}`
should now refer to the combined prevalence of all three AD stages in
demographic group :math:`g` at time :math:`t`. The value of
:math:`p_{g,t}` is :ref:`defined on the Alzheimer's cause model page
<alzheimers_cause_state_data_including_susceptible_note>`. With these
updated definitions, the model scale and initial population size in each
group are defined the same as above:

.. math::

  S = \frac{X_{t_0}}{p_\text{(all AD states)}\cdot Y^\text{real}_{t_0}}
    = \frac{X_{t_0}}{\sum_g p_{g,t_0}\cdot Y^\text{real}_{g,t_0}},
  \qquad
  X_{g,t_0} = X_{t_0} \cdot \frac{p_{g,t_0} \cdot Y^\text{real}_{g,t_0}}
    {\sum_g p_{g,t_0} \cdot Y^\text{real}_{g,t_0}}.

Adding New Simulants
++++++++++++++++++++

Let :math:`N_{g,t}` denote the number of new simulants in demographic
group :math:`g` that we want to add to the simulation at time :math:`t`.
We will assume that :math:`N_{g,t}` is a Poisson random variable with
mean
:math:`\lambda_{g,t} \cdot \Delta t \cdot 1_{\{\text{simulation step times}\}}(t)`,
where :math:`\lambda_{g,t}` is the entrance rate of new simulants
(measured in count of simulants per unit time) at time :math:`t`,
:math:`\Delta t` is the length of a simulation time step, and
:math:`1_A` is the indicator function of the set :math:`A` (the
indicator function zeros out the entrance rate at times when the
simulation is not taking a step). Our goal is to determine the entrance
rate :math:`\lambda_{g,t}` for each :math:`g` and :math:`t`.

Let :math:`A_g(t)` be the cumulative number of incident cases of AD by
time :math:`t` in demographic group :math:`g` in the real population.
Since our simulation is scaled down by a factor of :math:`S`, the rate
at which we want to add simulants is

.. math::

  \lambda_{g,t} = S \cdot A_g'(t),

where :math:`A_g'(t)` is the derivative of :math:`A_g(t)` with respect
to :math:`t`. The following subsection describes how we will calculate
the entrance rate :math:`\lambda_{g,t}`.

Calculating entrance rate via AD incidence rate
-----------------------------------------------

To calculate :math:`\lambda_{g,t}`, we rewrite it in terms of quantities
that we can estimate from the available data:

.. math::
  :label: AD_entrance_rate_eq

  \lambda_{g,t}
  = S \cdot A_g'(t)
  = S \cdot \frac{A_g'(t)}{Y^\text{real}_{g,t}}
    \cdot Y^\text{real}_{g,t}
  = S \cdot i_{g,t} \cdot Y^\text{real}_{g,t},

where :math:`i_{g,t} = A_g'(t) /Y^\text{real}_{g,t}` is the **total
population incidence hazard** of AD in demographic group :math:`g` at
time :math:`t`. We know the model scale :math:`S` from
:eq:`model_scale_eq` above, and we can estimate the quantities
:math:`i_{g,t}` and :math:`Y^\text{real}_{g,t}` from GBD as
follows.

Let :math:`y(t)` denote the year to which time :math:`t` belongs. If we
assume that the hazard :math:`i_{g,t}` is constant throughout the year
:math:`y(t)`, then it is equal to its person-time-average over the year,
which is the **total population incidence rate**:

.. math::

  i_{g,t}
  = \frac{\text{# of incident cases of AD in group $g$ in year $y(t)$}}
    {\text{total person-years in group $g$ in year $y(t)$}}.

This is the :ref:`raw AD incidence rate we pull from GBD <total
population incidence rate>` (*not* the susceptible population incidence
rate usually calculated by Vivarium Inputs). If we assume that the
population :math:`Y^\text{real}_{g,t}` is constant throughout the year
:math:`y(t)`, then it is equal to its time-average over the year:

.. math::

  Y^\text{real}_{g,t}
  = \text{average population in group $g$ during the year $y(t)$}.

This is the population we pull from GBD using get_population. Thus,
:eq:`AD_entrance_rate_eq` expresses the entrance rate
:math:`\lambda_{g,t}` in terms of quantities we can estimate from data.

.. note::

  Based on `plots of AD incidence from GBD Compare`_, we will make the
  simplifying assumption that for each demographic group :math:`g`, the
  Alzheimer's incidence rate :math:`i_{g,t}` does not change over time.
  Thus, we will use GBD 2021 data and assume that :math:`i_{g,t}` equals
  the AD incidence rate in 2021 from for all times :math:`t`.

  For Model 2 of the Alzheimer's simulation, we will use GBD 2021 data
  and assume that the total population :math:`Y^\text{real}_{g,t}`
  equals the average population in 2021 for all times :math:`t`. For
  Models 3 and higher, we will use forecasted data from FHS to estimate
  :math:`Y^\text{real}_{g,t}` as the average population in year
  :math:`y(t)` for years 2025 through 2050, then assume the total
  population remains constant thereafter.

.. _plots of AD incidence from GBD Compare: http://ihmeuw.org/739c

Alternative view using incidence count
--------------------------------------

The most direct way to estimate :math:`A_g'(t)` is to assume it is
constant, in which case it equals its time-average.  For example, if
:math:`y(t)` denotes the year to which time :math:`t` belongs, and we
assume :math:`A_g'(t)` is constant during the year :math:`y(t)`, then

.. math::

  A_g'(t)
  = \frac{\text{# of incident cases of AD in group $g$ in year $y(t)$}}
    {\text{1 year}}.

This ends up being equivalent to the method using incidence rates above,
but whereas the *count* of incident cases is likely to vary considerably
due to changing demographics, the incidence *rate* of AD is likely to
remain fairly stable over time. Thus, using using the incidence rate and
the total population is a more appropriate way to use the available
data.

Calculating entrance rate with  presymptomatic and MCI stages
-------------------------------------------------------------

Let :math:`\Delta = \Delta_\text{BBBM} + \Delta_\text{MCI}` be the total
duration of pre-dementia AD, and let :math:`w` be the width of an
age group (i.e., 5 years for GBD age groups). There exists a unique
integer :math:`n` and real number :math:`r` with :math:`0\le r < w`
such that

.. math::

  \Delta = n w + r.

With our current parameters, :math:`\Delta = 7` years and :math:`w=5`
years , so :math:`n = 1` and :math:`r = 2`.

The number of real-world people in demographic group :math:`g` who enter the
BBBM-AD state at time :math:`t` and transition to AD-dementia at time
:math:`t + \Delta` should be

.. math::

  I_{g,t}^\text{BBBM}
  = \left(1 - \frac{r}{w}\right)
    \left(i_{g + nw,\, t+\Delta}^\text{AD}\right)
     \left(Y^\text{real}_{g + nw,\, t+\Delta}\right)
  + \left(\frac{r}{w}\right)
    \left(i_{g + (n+1)w,\, t+\Delta}^\text{AD}\right)
      \left( Y^\text{real}_{g + (n+1)w,\, t+\Delta} \right).

The number of deaths among people in demographic group :math:`g` at time
:math:`t` that occur between times :math:`t` and :math:`t+\Delta` should
be

.. math::

  \begin{align*}
  D_{g,t}
  &= \left(\frac{w}{2}\right)
    \left(m_{g,\, t}^\text{AD}\right)
     \left(Y^\text{real}_{g,\, t}\right)
    + \dotsb
  \end{align*}

(still figuring out how to write this down...)

Implementation and data tables
+++++++++++++++++++++++++++++++

..
  To summarize, here is the algorithm for adding new simulants at time
  :math:`t`, assuming that :math:`t` is a step time of the simulation: ...


.. todo::

  Write up more concrete, direct instructions for implementation,
  including:

  * Specification of exactly what data to use (data tables)
  * Reiterate equation for entrance rate, using notation consistent with
    cause model page
  * Make sure to spell out how the length of the time step is involved
  * Reiterate that we need to sample a Poisson count with the specified
    mean
  * Strategy for sampling continuous ages uniformly within age bins,
    including capping the oldest age bin (95+) at 100 when adding new
    simulants

  Also, maybe this should go in another top-level section and include
  instructions for initialization as well, instead of being a subsection
  of the "adding new simulants" section.

  Note that the engineers said that the number of simulants initialized
  into each age group at time :math:`t_0` is also random, but I'm not
  sure exactly how it works (e.g., is the number of *initial* simulants
  in each group also a Poisson random variable?).

Data Tables
-----------

All data values are defined for a specified year, location, age group,
and sex.

.. list-table:: Data Sources
  :widths: 20 30 25 25
  :header-rows: 1

  * - Variable
    - Definition
    - Source or value
    - Notes
  * - population
    - Draw-level age-specific population forecast
    - GBD 2021 Forecasting Capstone
    - in `population_agg.nc` file
  * - all-cause mortality rate
    - Draw-level age-specific mortality rates saved by cause, for cause==all
    - GBD 2021 Forecasting Capstone
    - in `_all.nc` file

All-cause Mortality Forecasts
+++++++++++++++++++++++++++++

Since this is the model that
includes details on how to use forecasts of population size, we have also
included information on how to use forecasts of all-cause mortality rate.
This is not really part of the Alzheimer's Population Model, however, and
perhaps a better place to include this information will emerge as we continue
to work on this model.

By including draw-level, age-specific mortality rates forecasted for future years,
the competing mortality from causes other than Alzheimer's Disease will change over time
as predicted by our IHME colleagues.

The :ref:`all_cause_mortality` docs have more details on how the ACMR forecasts are used
when they are included in the artifact.

