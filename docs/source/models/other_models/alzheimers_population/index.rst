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

Let :math:`t_0` be the starting time of our simulation, let
:math:`P_{t_0}` be the size of our simulated population at
initialization (i.e., the initial population size per draw specified in
the concept model), and let :math:`P^\text{real}_{t_0}` be the
corresponding real-world population at time :math:`t_0` that our
simulation is supposed to represent. The **model scale**, :math:`s`, of
our simulation is defined to be :math:`s = P_{t_0} /
P^\text{real}_{t_0}`. We will use the model scale
both for initializing our simulated population and for adding new
simulants.

In our case, :math:`P^\text{real}_{t_0}` is the population of people
with Alzheimer's disease and other dementias at time :math:`t_0` in a
particular country. We can compute this as

.. math::

  P^\text{real}_{t_0} = p_\text{Alz} \hat{P}^\text{GBD}_{t_0},

where :math:`\hat{P}^\text{GBD}_{t_0}` is the total population at time
:math:`t_0` in our simulated location according to GBD, and
:math:`p_\text{Alz}` is the prevalence of Alzheimer's disease and other
dementias across all age groups and sexes in that location. Note that
the model scale can also be computed as :math:`s = \hat P_{t_0} / \hat
P^\text{real}_{t_0}`, where :math:`\hat P_{t_0} = P_{t_0} /
p_\text{Alz}` is the size of an imagined total population including all
people with and without Alzheiemer's disease, of which those with
Alzheimer's are the ones who appear in our simulation.


Let
:math:`p_{a,s}` be the prevalence of Alzheimer's disease and other
dementias for age group :math:`a` and sex :math:`s` in the starting year
of our simulation, for a given location. Then the number of simulants to
initialize in age group :math:`a` and sex :math:`s` is :math:`p_{a,s}
P_0`.

Adding New Simulants
++++++++++++++++++++
