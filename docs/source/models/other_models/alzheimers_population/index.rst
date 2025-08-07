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

===============================
Alzheimer's Population Model
===============================

.. contents::
  :local:

Overview
++++++++

The goal of this population model is to model only simulants with
Alzheimer's disease (and other dementias), in order to reduce the
necessary population size for the :ref:`CSU Alzheiemer's simulation
<2025_concept_model_vivarium_alzheimers>`. The model document is split
into two parts: 1) initializing the population, and 2) adding new
simulants during the simulated timeframe.

Initializing the Population
+++++++++++++++++++++++++++

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

  X^\text{real}_{t_0} = p_\text{Alz} \cdot \hat{X}^\text{GBD}_{t_0},

where :math:`\hat{X}^\text{GBD}_{t_0}` is the total population at time
:math:`t_0` in our simulated location according to GBD, and
:math:`p_\text{Alz}` is the prevalence of Alzheimer's disease and other
dementias across all age groups and sexes in that location. Note that
the model scale can also be computed as :math:`S = \hat X_{t_0} / \hat
X^\text{GBD}_{t_0}`, where :math:`\hat X_{t_0} = X_{t_0} / p_\text{Alz}`
is the size of an **imagined total model population** including all
people with and without Alzheiemer's disease, of which those with
Alzheimer's are the ones who appear in our simulation. Putting
everything together,

.. math::
  :label: model_scale_eq

  S = \frac{X_{t_0}}{p_\text{Alz}\cdot \hat{X}^\text{GBD}_{t_0}},

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
* :math:`\hat X_{g,t}` = the imagined total model population in group
  :math:`g`, including people with and without AD, of which
  :math:`X_{g,t}` counts the subset with AD
* :math:`\hat X^\text{GBD}_{g,t}` = the total real population in group
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
  X^\text{real}_{g,t} = p_{g,t} \cdot \hat X^\text{GBD}_{g,t}.
  % X_{g,t} &= p_g \cdot \hat X_{g,t} \\
  % \hat X_{g,t} & = S \cdot \hat X^\text{GBD}_{g,t}
  \end{align*}

(For :math:`t\ne t_0`, the first relation assumes that our simulated
population accurately tracks the real-world population over time.)
Therefore, at time :math:`t_0`,

.. math::
  :label: initial_pop_eq

  X_{g,t_0}
  = S \cdot X^\text{real}_{g,t_0}
  = S\cdot p_{g,t_0} \cdot \hat X^\text{GBD}_{g,t_0}
  = X_{t_0} \cdot \frac{p_{g,t_0}}{p_\text{Alz}}
    \cdot \frac{\hat X^\text{GBD}_{g,t_0}}{\hat X^\text{GBD}_{t_0}},

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
      \cdot \frac{p_{g,t_0} \cdot \hat X^\text{GBD}_{g,t_0}}
      {p_\text{Alz} \cdot \hat X^\text{GBD}_{t_0}}
    &= X_{t_0} \cdot \sum_g
      \frac{X^\text{real}_{g,t_0}}{X^\text{real}_{t_0}} \\
    &= X_{t_0} \cdot
      \frac{\sum_g X^\text{real}_{g,t_0}}{X^\text{real}_{t_0}}
    = X_{t_0} \cdot
      \frac{X^\text{real}_{t_0}}{X^\text{real}_{t_0}}
    = X_{t_0}.
    \end{align*}

Adding New Simulants
++++++++++++++++++++

Let :math:`N_{g,t}` denote the number of new simulants in demographic
group :math:`g` that we want to add to the simulation at time :math:`t`.
We will assume that :math:`N_{g,t}` is a Poisson random variable with
mean :math:`\lambda_{g,t} \cdot \Delta t \cdot 1_{\{\text{simulation
step times}\}}(t)`, where :math:`\lambda_{g,t}` is the entrance rate of
new simulants (measured in count of simulants per unit time) at time
:math:`t`, :math:`\Delta t` is the length of a simulation time step, and
:math:`1_A` is the indicator function of the set :math:`A` (the
indicator function zeros out the entrance rate at times when the
simulation is not taking a step). Our goal is to determine the entrance
rate :math:`\lambda_{g,t}` for each :math:`g` and :math:`t`.

Let :math:`A_g(t)` be the cumulative number of incident cases of AD by
time :math:`t` in demographic group :math:`g` in the real population.
Since our simulation is scaled down by a factor of :math:`S`, the rate
at which we want to add simulants is

.. math::

  \lambda_{g,t} = S \cdot A_g'(t).

We rewrite this in terms of quantities that we can estimate from the
available data:

.. math::
  :label: AD_entrance_rate_eq

  \lambda_{g,t}
  = S \cdot A_g'(t)
  = S \cdot \frac{A_g'(t)}{\hat X^\text{real}_{g,t}}
    \cdot \hat X^\text{real}_{g,t}
  = S \cdot i_{g,t} \cdot \hat X^\text{real}_{g,t},

where :math:`i_{g,t} = A_g'(t) /\hat X^\text{real}_{g,t}` is the **total
population incidence hazard** of AD in demographic group :math:`g` at
time :math:`t`. We know the model scale :math:`S` from
:eq:`model_scale_eq` above, and we can estimate the quantities
:math:`i_{g,t}` and :math:`X^\text{real}_{g,t}` from GBD as follows.

Let :math:`y(t)` denote the year in which time :math:`t` occurs. If we
assume that the hazard :math:`i_{g,t}` is constant throughout the year
:math:`y(t)`, then it is equal to its person-time-average over the year,
which is the **total population incidence rate**:

.. math::

  i_{g,t}
  = \frac{\text{# of incident cases of AD in group $g$ in year $y(t)$}}
    {\text{total person-years in group $g$ in year $y(t)$}}.

This is the raw AD incidence rate we pull from GBD (*not* the susceptible
population incidence rate usually calculated by Vivarium Inputs).
If we assume that the population :math:`X^\text{real}_{g,t}` is
constant throughout the year :math:`y(t)`, then it is equal to its
time-average over the year:

.. math::

  X^\text{real}_{g,t}
  = \text{average population in group $g$ during the year $y(t)$}.

This is the population we pull from GBD using get_population.

Recall from the previous section that :math:`X^\text{real}_{g,t}` is the
number of people with AD in the real population (i.e., the population
our simulation represents). Since our simulation is scaled down by a
factor of :math:`S`, the rate at which we want to add simulants
is

.. math::

  \lambda_{g,t} = S \cdot \frac{d X^\text{real}_{g,t}}{dt}.


Let :math:`y(t)` denote the year containing the time :math:`t`, and let
:math:`\hat X^{GBD}_{y(t)}` denote the average population in the year
:math:`y(t)`.

Let :math:`I_{g,t}` denote the **total population
incidence hazard** of
Alzheimer's disease and other dementias in demographic group :math:`g`
in the year :math:`y(t)`, i.e., :math:`I_{g,t} = A_g'(t) / \hat
X^\text{GBD}_{g,t}`, where :math:`A_g(t)` is the number of people with AD in
group group :math:`g` at time :math:`t`.


.. math::

  I_{g,t}
  = \frac{\text{# of incident cases of AD in year } y(t)}
    {\text{total person-years in in year $y(t)$}}
  = \frac{\text{# of incident cases of AD in year } y(t)}
    {\hat X^\text{GBD}_{y(t)}}.

Then the entrance rate of new simulants is:

.. math::

  \lambda_{g,t}
  = S \cdot I_{g,t} \cdot \hat X^\text{GBD}_{g, y(t)}.
