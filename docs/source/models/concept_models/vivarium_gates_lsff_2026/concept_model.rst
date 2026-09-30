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

.. sectnum::

.. _2026_concept_model_vivarium_gates_lsff:

====================================================
Vivarium Gates Large Scale Food Fortification (2026)
====================================================

.. contents::
  :local:

.. note::

    This concept model is unusually incomplete, as the 2026 iteration of
    the LSFF model started from the 2024 iteration, which was
    implemented quickly without standard documentation. We will be
    adding new sections as needed for the current implementation and
    slowly backfilling the missing documentation as time allows.

Overview
++++++++

Scenarios
+++++++++

A **scenario** for the LSFF model is described by a 5-tuple:

.. math::
    \text{scenario} = (\text{location}, \text{nutrient}, \text{vehicle}, \text{concentration}, \text{effective coverage}).

The following two tables contain the necessary data to define each
scenario. The first table lists the concentration of each fortificant
(added nutrient) in each vehicle by location, in units of micrograms per
gram (µg/g), or equivaently, parts per million (ppm). The second table
provides coverage data by location and vehicle. Typically we will only
model one value of effective coverage for each location and vehicle. In
this case, the first four elements of the scenario tuple are sufficient
to define the scenario, meaning that each bulleted entry in the first
table corresponds to one scenario. (On the other hand, if we were to
model more than one scale-up of effective coverage for a given location
and vehicle, then the second table would contain more than one row for
that (location, vehicle) pair, and each corresponding bullet in the
first table would correspond to multiple scenarios.)

.. list-table:: Nutrient concentrations (µg/g) in each vehicle by location
    :header-rows: 1

    * - Location
      - Iron
      - Folic Acid
      - Vitamin A
      - Iodine
    * - Ethiopia
      -
      - * wheat (??)
        * salt (45)
      -
      -
    * - Nigeria
      - * wheat (??)
        * rice (40)
        * bouillon (1320)
      - * wheat (??)
        * rice (1.69)
        * bouillon (24)
        * salt (??)
      -
      -
    * - India
      - * wheat (??)
        * rice (42.5)
        * salt (??)
      - * wheat (??)
        * rice (1.3)
      -
      -

The **effective coverage** of fortification of each vehicle is broken
down into **coverage** and **effectiveness** (also called
**compliance**). These terms are defined as follows:

Coverage
    The proportion of the fortifiable vehicle that is actually
    fortified.

Effectiveness (Compliance)
    The proportion of the fortified vehicle that meets the required
    fortification standards.

Effective Coverage
    The proportion of the fortifiable vehicle that is actually fortified
    and meets the required fortification standards.

By definition, we have

.. math::
    \text{Effective Coverage} = \text{Coverage} \times \text{Effectiveness}.

The following table lists the coverage and effectiveness of
fortification of each vehicle in each location, for both the baseline
(B) and intervention (I) scenarios. For a given location and vehicle, we
will assume that the coverage and effectiveness are the same for all
fortificants.

.. list-table:: Coverage data by location and vehicle (B=baseline, I=intervention)
    :header-rows: 1
    :widths: 5 5 5 5 5 5

    * - Location
      - Vehicle
      - Coverage (B)
      - Effectiveness (B)
      - Coverage (I)
      - Effectiveness (I)
    * - Ethiopia
      - wheat
      - 0%
      - 0%
      - ??
      - ??
    * - Ethiopia
      - salt
      - 0%
      - 0%
      - 95%
      - 95%
    * - Nigeria
      - wheat
      - 0%
      - 0%
      - ??
      - ??
    * - Nigeria
      - rice
      - 0%
      - 0%
      - 95%
      - 95%
    * - Nigeria
      - bouillon
      - 0%
      - 0%
      - 71%
      - 71%
    * - Nigeria
      - salt
      - 0%
      - 0%
      - ??
      - ??
    * - India
      - wheat
      - 0%
      - 0%
      - ??
      - ??
    * - India
      - rice
      - 0%
      - 0%
      - 92%
      - 92%
    * - India
      - salt
      - 0%
      - 0%
      - ??
      - ??
