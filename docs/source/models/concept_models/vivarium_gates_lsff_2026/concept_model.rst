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
    adding new sections to the documentation as needed for the current
    implementation.

Overview
++++++++

Scenarios
+++++++++

A **fortificant scenario** for the LSFF model is described by a 5-tuple:

.. math::
    \text{fortificant scenario} = (\text{location}, \text{fortificant}, \text{vehicle}, \text{concentration}, \text{effective coverage}).

The following table contains one bulleted entry for each fortificant
scenario we will model for the fortification intervention. It lists the
concentration of each fortificant (added nutrient) in each vehicle by
location, in units of micrograms per gram (µg/g), or equivaently, parts
per million (ppm). The corresponding coverage and effectiveness values
for the various scenarios will be defined in separate data files. The
table is organized by nutrient so that we can easily see how many
fortificant scenarios we will run on each pathway for that nutrient.

.. list-table:: Nutrient concentrations (µg/g) in each vehicle by location
    :header-rows: 1

    * - Location
      - Iron
      - Folic Acid
      - Vitamin A
      - Iodine
    * - Ethiopia
      -
      - * wheat (2.0)
        * salt (45)
      -
      -
    * - Nigeria
      - * wheat (40)
        * rice (40)
        * bouillon (1320)
      - * wheat (2.6)
        * rice (1.69)
        * bouillon (24)
        * salt (30)
      -
      -
    * - India
      - * wheat (35.25)
        * rice (42.5)
        * salt (975)
      - * wheat (0.1)
        * rice (1.3)
      -
      -

In addition to the intervention scenarios corresponding to the table
above, we will also model a *baseline scenario* for each arm,
representing the current fortification status of a vehicle in a
location, and sometimes a separate *zero scenario*, which represents a
counterfactual in which no fortification occurs. These will be used as
reference scenarios for evaluating the impact of the intervention
scenarios.
