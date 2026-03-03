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

.. _other_models_alzheimers_population_model:

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
different versions of the population model, corresponding to progressive
:ref:`model versions <2025_alzheimers_model_runs_table>` of the CSU
Alzheiemer's simulation:

#. **Models 2 and 3:** Modeling simulants with Alzheimer's disease (AD)
   and other dementias as defined by GBD
#. **Model 4 and above:** Modeling simulants with presymptomatic AD,
   MCI, or AD dementia

Initializing the Population
+++++++++++++++++++++++++++

We will first describe how to initialize the population for AD and other
dementias as defined by GBD, then we will explain how to modify the
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
  \end{align*}

and

.. math::

  \begin{align*}
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
    \cdot \frac{\text{\# of real people in subgroup $g$ with Alzheimer's}}
      {\text{\# of real people in whole population with Alzheimer's}}.

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

.. todo::

  Add a note about how the initial values in each subgroup are related
  to the "population structure" of the simulation.

Initializing simulants with presymptomatic and MCI stages
---------------------------------------------------------

Starting in Model 4 of the CSU Alzheimer's simulation, the Alzheimer's
cause model includes two predementia stages, BBBM-AD, and MCI-AD, in
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

Calculating entrance rate of simulants in the BBBM-AD state
-----------------------------------------------------------
See :ref:`Cause Model Calibration Strategy Docs for details <cause_alzheimers_rate_calibration>`.


Data Tables
-----------

The following table shows the variables that come directly from our data
sources. Other quantities needed for the simulation are defined above in
terms of these values.

.. list-table:: Data Sources
  :widths: 20 30 25 25
  :header-rows: 1

  * - Variable
    - Definition
    - Source or value
    - Notes
  * - :math:`X_{t_0}`
    - The initial size of our simulated population
    - "Initial population size per draw" in the |simulation parameter
      specifications table in the concept model|
    - Includes all demographic groups
  * - :math:`Y^\text{real}_{g,t}`
    - Total population of demographic group :math:`g` at time :math:`t`
    - population_forecast in |AD cause model data sources table|
    - From GBD 2021 Forecasting Capstone. Available for years 2021-2050.
  * - :math:`p_{g,t}`
    - The combined prevalence of all AD stages in demographic
      group :math:`g` at time :math:`t`
    - :math:`p_\text{(All AD states)}` in the |Attention box on the AD
      cause model page|
    - Calculated from the GBD 2023 dementia envelope using the
      dementia subtype proportions provided by the dementia modelers.
      We will only need the value for the single year :math:`t_0`.
  * - :math:`i^\text{AD}_{g,t}`
    - Total-population incidence rate of AD dementia in demographic
      group :math:`g` at time :math:`t`
    - incidence_AD in |AD cause model data sources table|
    - Calculated from the GBD 2023 dementia envelope using the
      dementia subtype proportions provided by the dementia modelers.
      Assumed to be independent of :math:`t`.
  * - :math:`m_{g,t}`
    - Background mortality hazard in demographic group :math:`g` at time
      :math:`t`
    - m_BBBM or m_MCI in the |AD cause model data sources table|
    - Equal to all-cause mortality rate minus cause-specific mortality
      rate for AD-dementia. Uses all-cause mortality rate forecasts for
      2021--2050 from GBD 2021 Forecasting Capstone.
  * - :math:`\Delta_\text{BBBM}`, :math:`\Delta_\text{MCI}`
    - Average duration of the BBBM-AD state or MCI-AD state,
      respectively
    - :math:`\Delta_\text{BBBM}` and :math:`\Delta_\text{MCI}` in the |AD
      cause model data sources table|
    -

.. |simulation parameter specifications table in the concept model| replace::
  :ref:`simulation parameter specifications table in the concept model
  <2025_concept_model_vivarium_alzheimers_sim_parameter_specs>`

.. |AD cause model data sources table| replace::
  :ref:`AD cause model data sources table
  <2021_cause_alzheimers_presymptomatic_mci_data_sources_table>`

.. |Attention box on the AD cause model page| replace::
  :ref:`Attention box on the AD cause model page
  <alzheimers_cause_state_data_including_susceptible_note>`
