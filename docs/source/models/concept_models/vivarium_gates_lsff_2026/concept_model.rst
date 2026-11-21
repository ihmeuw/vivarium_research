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

Definitions
+++++++++++

Basic food fortification concepts
---------------------------------

fortificant
  A specific chemical form of a vitamin, mineral, or other micronutrient
  added to food or condiments to improve its nutritional value and
  combat deficiencies.

vehicle
  A common, widely consumed food product—such as salt, wheat flour,
  rice, or edible oil—that is used as a carrier to deliver added
  vitamins and minerals to a population.

fortifiable vehicle
  The share of a vehicle for which it is feasible to add fortificants.
  This usually means the share of the vehicle that is industrially
  produced. For double fortified salt, this indicates the share of the
  iodized salt industry that is amenable to fortifying with iron or
  folic acid in addition to iodine.

Intervention pathways
---------------------

pathway
  The causal chain from fortification to its impact on a particular
  outcome. For example, iron fortification has several pathways leading
  to different health outcomes, such as iron → hemoglobin → anemia, and
  iron → birthweight → (child mortality).

Intervention pathways are depicted in the concept model diagram.
Different nutrients have different health outcomes, leading to distinct
pathways for each nutrient. Since the modeling strategy is dependent on
the pathway and hence the nutrient, it will be convenient to organize
certain parts of the documentation by nutrient.

.. _effective_coverage_components:

Components of effective coverage
--------------------------------

When considering the coverage of food fortification, we are usually
interested in "effective coverage":

effective coverage
  The fraction of the population that eats a given vehicle that is
  fortified to standard.

.. admonition:: Assumptions and limitations regarding effective coverage

  * We assume that if the vehicle is fortified to standard, the
    micronutrients it contains will be bioavailable at the intended
    level, so that effective coverage measures the potential of
    fortification to impact population health.
  * *Intervention coverage* is usally defined as the fraction of people
    receiving an intervention among those who need it. By contrast, the
    denominator of *effective coverage* is the whole population---that
    is, a person can contribute to the effective coverage of
    fortification whether or not they have a micronutrient deficiency.
  * Effective coverage as defined here may not fully capture all the
    details necessary to specify the level of fortification in a
    population. In particular, it does not capture the fact that a
    person can eat some vehicle that is fortified and some vehicle that
    is not fortified. Nevertheless, we use effective coverage in the
    definition of "scenario" below to parameterize the level of
    fortification coverage in the population; we may refine this
    definition later as different parts of the model are documented in
    more detail.

Effective coverage can be factored into four separate measures, and it will
be useful to measure these separately:

coverage
  The fraction of the population that consumes the vehicle, whether
  fortified or not.

consolidation (fortifiability)
  The fraction of the vehicle that is fortifiable (e.g., industrially
  produced).

fortified fraction of fortifiable (FFF)
  The fraction of fortifiable vehicle that is fortified, effectively
  or not.

effectiveness
  The fraction of fortified vehicle that meets the fortification
  standard (i.e., the fortificant is bioavailable to the expected
  level).

With these definitions, it follows that

.. math::
    \text{effective coverage} = \text{coverage} \times \text{consolidation} \times \text{FFF} \times \text{effectiveness}.

The four components of effective coverage can be grouped in different
ways; we will sometimes use the following composite measures:

fortified fraction of vehicle (FFV)
  The fraction of the vehicle that is fortified, effectively or not.

compliance
  The fraction of fortifiable vehicle that meets the fortification
  standard.

With these definitions, it follows that

.. math::
    \text{FFV} = \text{consolidation} \times \text{FFF},
    \quad\text{and}\quad
    \text{compliance} = \text{FFF} \times \text{effectiveness},

and thus

.. math::
    \text{effective coverage}
    &= \text{coverage} \times \text{FFV} \times \text{effectiveness} \\
    &= \text{coverage} \times \text{consolidation} \times \text{compliance}.

.. note::

  Our current implementation (as of 2026-11-12) uses FFV to measure
  baseline fortification, so the first factorization is more relevant
  for the baseline scenario. On the other hand, GF gives us
  consolidation and compliance (both baseline estimates and
  projected/aspirational intervention levels), so the second
  factorization is more relevant for intervention scenarios, and we need
  to convert to FFV if we want to use GF's numbers in baseline. It may
  make things simpler (and less confusing) if we standardized our
  treatment of baseline and intervention data, factoring both into all
  four basic components of effective coverage.

Arms and scenarios
------------------

It will be helpful to group the fortification interventions across
locations, vehicles, and nutrients into "arms" and "scenarios":

arm
  A (location, vehicle) pair together with the fortificants (nutrients)
  added to that vehicle.

fortificant scenario
  The coverage, effectiveness, and concentration of one fortificant in
  one vehicle in a location. Described by the 5-tuple (location,
  fortificant, vehicle, concentration, effective coverage).

scenario
  A fortification state for an arm, covering all of its fortificants,
  with coverage, effectiveness and concentration values for each
  fortificant. It is made of one fortificant scenario per fortificant
  the vehicle carries. A scenario is described by the 3-tuple (location,
  vehicle, mapping of fortificants to (concentration, effective
  coverage) pairs).

We may refer to a scenario as a **vehicle scenario** to distinguish it
from a fortificant scenario. We report our final results by (vehicle)
scenario, totaling up the averted DALYs for all nutrients in each
vehicle for each location.

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

Interventions
+++++++++++++

The fortification interventions are organized by nutrient and are listed
on the :ref:`LSFF interventions page <lsff_intervention_models>`:

* :ref:`Folic acid fortification <folic_acid_fortification>`
* :ref:`Iron fortification <iron_fortification>`

Common data needed in all scenarios
+++++++++++++++++++++++++++++++++++

Certain data is needed for each fortificant scenario (including
intervention, baseline, and zero scenarios). This section lists these
common data needs, which can be broadly categorized as vechicle
consumption data or vehicle fortification data. All the data needs
depend on the location and vehicle (the arm). The following table lists
each data need and the additional variables it is (or may be) stratified
by.

.. list-table:: Data needs for each fortificant scenario
    :header-rows: 1
    :widths: 20 40 40

    * - Category
      - Data needed by model
      - Additional stratifications
    * - Vehicle consumption data
      - * coverage (% of population)
        * intake per capita (g/day)

          * mean
          * standard deviation
      - * population (WRA, Children U5, or all), or more generally,

          * age
          * sex
        * wealth quintile
    * - Vehicle fortification data
      - * consolidation (% of vehicle)
        * FFF (% of fortifiable)
        * effectiveness (% of fortified)
        * nutrient concentration (ppm)
      - * fortificant
        * wealth quintile

Observe that the table includes the four components (coverage,
consolidation, FFF, effectiveness) of effective coverage , which is
usually the quantity the model cares about.

Note that not every possible stratification will apply to every data
need in a category, and whether we stratify or not depends on what data
we have available. The following subsections give some additional
details about the data needs in each category.

Vehicle consumption data
------------------------

* Different parts of our model apply to different population groups. For
  example, the pregnancy simulation applies only to pregnant people, the
  neural tub defects model applies to women and birthing people of
  reproductive age, and the iron anemia model applies to all ages and
  sexes. So which population we need data for depends on the
  fortificant. If we can't find consumption data for the population
  group we're interested in, we may need to fill in this data based on
  data about a different population group.
* When consumption data is stratified by age in the data source, the age
  groups may not exactly match the age groups used in our model, in
  which case we may need to do additional processing to align them with
  our model's age groups.
* When consumption data is stratified by wealth quintile, our data
  processing code requires an overall value for the total population as
  well, and it then verifies that the overall value is roughly
  consistent with the quintiles.
* Some nutrient → outcome pathways use intake data while others do not.
  Whether intake data is needed depends on whether we use a
  dose-response model in the pathway or whether we have an effect size
  that only depends on a binary fortification variable indicating
  whether a vehicle is fortified or not.

Partial fortification coverage
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As noted when we defined :ref:`effective coverage
<effective_coverage_components>` above, effective coverage does not
capture the fact that people can eat some fortified vehicle and some
non-fortified vehicle. Since the Vivarium microsimulations model
individual people, these models can handle this situation directly if
given the following additional data:

* Full fortification coverage (% of vehicle consumers who consume only
  fortified vehicle)
* Any fortification coverage (% of vehicle consumers who consume any
  fortified vehicle)
* Partial coverage mean and SD (mean and SD of % of consumed vehicle
  that is fortified, for those where the vehicle they consume is
  partially fortified)

Vehicle fortification data
--------------------------

* While it is theoretically possible for vehicle consolidation
  (fortifiability) to depend on the fortificant, in practice we
  generally assume that consolidation is a property of the vehicle
  itself, independent of the fortificant.
* We sometimes have data showing that FFV varies by wealth quintile,
  which makes sense if people in different quintiles are getting their
  food from different sources. We could encode this difference by
  stratifying either consolidation or FFF by wealth quintile.
* In general, FFF may or may not vary by fortificant.
* Sometimes we have fortificant-specific data for effectiveness,
  and sometimes we don't. Typically, we will assume that effectiveness
  is independent of wealth quintile.
* Nutrient concentration obviously must depend on the fortificant, and
  it will never depend on wealth quintile.

Raw input data
++++++++++++++

Inputs from Gates Foundation
----------------------------

Country-specific data
---------------------

.. toctree::
    :maxdepth: 1
    :glob:

    country_data/*

Model runs
++++++++++

Model runs are tracked in an `Excel file on Sharepoint <model run
tracker_>`_.

.. _model run tracker:
  https://uwnetid.sharepoint.com/:x:/s/ihme_simulation_science_team/cQoOrjRm_7QbTYioFBGs8d1dEgUDWsuca0eF3vLtQ_GTtgm8Cg
