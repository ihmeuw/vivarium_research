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
:math:`P_{t_0}` be the size of our simulated population at
initialization (i.e., the initial population size per draw specified in
the concept model), and let :math:`P^\text{real}_{t_0}` be the
corresponding real-world population at time :math:`t_0` that our
simulation is supposed to represent. The **model scale**, :math:`S`, of
our simulation is defined to be :math:`S = P_{t_0} /
P^\text{real}_{t_0}`. We will use the model scale
both for initializing our simulated population and for adding new
simulants.

In our case, :math:`P^\text{real}_{t_0}` is the population of people
with Alzheimer's disease and other dementias at time :math:`t_0` in a
particular country. We can compute this as

.. math::

  P^\text{real}_{t_0} = p_\text{Alz} \cdot \hat{P}^\text{GBD}_{t_0},

where :math:`\hat{P}^\text{GBD}_{t_0}` is the total population at time
:math:`t_0` in our simulated location according to GBD, and
:math:`p_\text{Alz}` is the prevalence of Alzheimer's disease and other
dementias across all age groups and sexes in that location. Note that
the model scale can also be computed as :math:`S = \hat P_{t_0} / \hat
P^\text{GBD}_{t_0}`, where :math:`\hat P_{t_0} = P_{t_0} / p_\text{Alz}`
is the size of an **imagined total model population** including all
people with and without Alzheiemer's disease, of which those with
Alzheimer's are the ones who appear in our simulation. Putting
everything together,

.. math::
  :label: model_scale_eq

  S = \frac{P_{t_0}}{p_\text{Alz}\cdot \hat{P}^\text{GBD}_{t_0}},

which computes the model scale in terms of known parameters.

Initializing Demographic Subgroups
-----------------------------------

Let :math:`g` denote a demographic subgroup of the population in a given
location, namely :math:`g = (\text{age group, sex})`. For each
demographic group :math:`g` and time :math:`t`, we generalize the
notation in the previous section to define the following
populations in demographic group :math:`g` at time :math:`t`:

* :math:`P_{g,t}` = the number of simulants in group :math:`g` at time
  :math:`t`
* :math:`P^\text{real}_{g,t}` = the real population corresponding to our
  simulated population :math:`P_{g,t}`
* :math:`\hat P_{g,t}` = the imagined total model population in group
  :math:`g`, including people with and without AD, of which
  :math:`P_{g,t}` counts the subset with AD
* :math:`\hat P^\text{GBD}_{g,t}` = the total real population in group
  :math:`g` at time :math:`t` according to GBD


We need to determine :math:`P_{g,t_0}` (the initial simulated
population) for each demographic group :math:`g`. Let :math:`p_{g,t}` be
the prevalence of Alzheimer's disease and other dementias in demographic
group :math:`g` at time :math:`t,` for a given location. Two relations
among the above quantities are:

.. math::

  \begin{align*}
  P_{g,t} = S \cdot P^\text{real}_{g,t}
  \quad\text{and}\quad
  P^\text{real}_{g,t} = p_{g,t} \cdot \hat P^\text{GBD}_{g,t}.
  % P_{g,t} &= p_g \cdot \hat P_{g,t} \\
  % \hat P_{g,t} & = S \cdot \hat P^\text{GBD}_{g,t}
  \end{align*}

Therefore, at time :math:`t_0`,

.. math::
  :label: initial_pop_eq

  P_{g,t_0}
  = S \cdot P^\text{real}_{g,t_0}
  = S\cdot p_{g,t_0} \cdot \hat P^\text{GBD}_{g,t_0}
  = P_{t_0} \cdot \frac{p_{g,t_0}}{p_\text{Alz}}
    \cdot \frac{\hat P^\text{GBD}_{g,t_0}}{\hat P^\text{GBD}_{t_0}},

where the final equality follows from plugging in formula
:eq:`model_scale_eq` for the model scale :math:`S`. This equation tells
us how many simulants to initialize into each demographic group based on
known parameters.

.. note::

  Another way to write :eq:`initial_pop_eq` is

  .. math::

    P_{g,t_0} = P_{t_0}
    \cdot \frac{\text{# of real people in subgroup $g$ with Alzheimer's}}
      {\text{# of real people in whole population with Alzheimer's}}.

  Thus, we could compute :math:`P_{g,t_0}` using prevalence counts from
  GBD instead of prevalence rates.

  To verify that :eq:`initial_pop_eq` gives us the correct total number of
  initial simulants, note that

  .. math::

    \begin{align*}
    \sum_g P_{g,t_0}
    = \sum_g P_{t_0}
      \cdot \frac{p_{g,t_0} \cdot \hat P^\text{GBD}_{g,t_0}}
      {p_\text{Alz} \cdot \hat P^\text{GBD}_{t_0}}
    &= P_{t_0} \cdot \sum_g
      \frac{P^\text{real}_{g,t_0}}{P^\text{real}_{t_0}} \\
    &= P_{t_0} \cdot
      \frac{\sum_g P^\text{real}_{g,t_0}}{P^\text{real}_{t_0}}
    = P_{t_0} \cdot
      \frac{P^\text{real}_{t_0}}{P^\text{real}_{t_0}}
    = P_{t_0}.
    \end{align*}

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
:math:`1_A` is the indicator function of the set :math:`A`.

Let :math:`I_{g,t}` denote the **total population incidence rate** of
Alzheimer's disease and other dementias in demographic group :math:`g`
at time :math:`t`, i.e.,

.. math::

  I_{g,y} = \frac{\text{# of incident cases of AD}}
    {\text{person-years in total population}}.

Then the entrance rate of new
