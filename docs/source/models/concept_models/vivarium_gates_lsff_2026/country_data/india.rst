.. _lsff_2026_india_data:

==========
India data
==========

.. contents::
  :local:

Overview
++++++++

India's food fortification standards are set by the Food Safety and Standards
Authority of India (FSSAI) [FSSAI-Fortified-Food]_. FSSAI first published
fortification standards in 2016. They set the fortificants and concentrations
allowed in rice, wheat flour, salt, and edible oil. These standards define what
a fortified product is. Whether a fortified product actually reaches people
depends on how it is produced and distributed.

Fortification through government welfare programs
-------------------------------------------------

Three government programs distribute food that is, or can be, fortified:

- **PM-POSHAN** (formerly the Mid-Day Meal scheme) gives a free lunch to
  students in government and government-aided schools.
- **Integrated Child Development Services (ICDS)** gives supplementary
  nutrition, through anganwadi centres, to young children and to pregnant and
  lactating women.
- **Public Distribution System (PDS)** sells grains to households with ration
  cards, either at subsidised prices or free.

These programs matter for modelling because a person's access to a fortified
vehicle can depend on whether they get it from a government program. This is
most important for rice, where the government has mandated fortification across
these programs (see :ref:`lsff_2026_india_rice`).

HCES 2023–2024
++++++++++++++

The Household Consumption Expenditure Survey (HCES) is a nationally
representative survey run by India's Ministry of Statistics and Programme
Implementation (MoSPI). It covers rural and urban households across all states.
The 2023–24 round ran from August 2023 to July 2024. Our extract has about
262,000 households and 1.1 million household members. Every estimate below uses
the survey's sampling weights, so that results represent India's population
rather than only the households sampled.

Data we use
-----------

- For each food item, HCES records whether the household consumed it in the
  reference period. We use this to estimate the share of people who eat the
  vehicle at all.
- HCES records household consumption as a quantity in kg per 30 days. This
  amount covers the whole household; HCES doesn't record individual intake.
- HCES records the source of consumption: whether the item was purchased,
  home-grown, both, collected for free, exchanged, received as a gift, or
  received free through PDS. It also records how much of the total was
  home-produced. We use this to separate purchased consumption, which may have
  been industrially processed and fortified, from consumption that never passed
  through industry.
- HCES records meals eaten by each household member in the last 30 days. Meals
  are split into meals at home, meals from school or balwadi (the government
  feeding programs above), meals from an employer, paid meals, and other meals.
  These meal counts let us move from household amounts to individual amounts.
- HCES records each household member's sex/gender and age.
- HCES records household assets and characteristics, such as durable goods, land
  and dwelling ownership, cooking and lighting fuel, and internet use. We use
  these to build a wealth index.

From household consumption to individual consumption
----------------------------------------------------

HCES reports consumption per household, but the model needs consumption per
person by sex, age, and wealth. We share each household's consumption among its
members in proportion to the meals they eat. First we divide the household's
total consumption by the total number of meals its members ate at home, which
gives an amount per meal. A person's consumption is that per-meal amount times
the total number of meals they ate, at home and away from home. This assumes a
meal eaten away from home contains the vehicle at the same rate as a meal eaten
at home.

A small number of households report consumption but very few or no meals at
home, which gives implausibly large per-meal amounts. We cap the per-meal amount
at the 95th percentile. Finally, we convert from kg per 30 days to g per day.

We then compute weighted means and standard deviations of individual
consumption, and the weighted share of people consuming any of the vehicle.
Results are grouped by sex, age group (0–5, 5–15, 15–30, 30–50, and 50+), and
wealth quintile. We also calculate an effective sample size for each group, as
a guide to how much to trust the estimates in small groups.

Wealth quintile
---------------

HCES doesn't include a wealth index, so we build one by copying the methods DHS
uses for its wealth quintiles [DHS-Wealth-Index]_. DHS calculates the wealth
index by asking whether the household owns a set of assets (such as a
refrigerator, a motorcycle, or a television) and combines the answers into a
single score.

We use DHS's methods to fit a new index on the HCES variables. The index is the
first principal component of the household asset and characteristic variables.
Following DHS, we fit it separately for urban and rural households, then map
each onto a common national scale. Quintile cut-offs are weighted by household
size as well as survey weight, so each quintile holds about a fifth of the
population.

.. note::

  This index has fewer inputs than the DHS index. HCES has no questions on
  water source, sanitation, housing materials, or livestock, so HCES quintiles
  shouldn't be read as equivalent to DHS quintiles. A possible improvement
  would be to train a model in DHS that uses only variables available in HCES,
  then apply it to HCES.

Sex/gender
----------

HCES records gender as male, female, or transgender. The simulation stratifies
by sex, and the survey doesn't record sex for transgender respondents, so they
are left out of the sex-specific estimates. HCES also doesn't record pregnancy
status, so we can't estimate consumption separately for pregnant women. We
assume pregnancy doesn't change consumption.

Age
---

HCES records age in single years, which we group into the age groups listed
above to fit our model.

.. _lsff_2026_india_fortifiability:

Fortifiability
--------------

A vehicle can only be fortified if it passes through industrial processing. Food
that people grow and eat themselves, or receive as gifts or in exchange, is not
fortifiable. HCES lets us estimate the proportion purchased: the share of a
group's consumption that was bought rather than home-grown or obtained in
other ways. Food obtained through PDS, whether paid for or free, counts as
purchased. This share is weighted by the amount consumed, so it describes the
share of the food eaten.

Not all purchased food is industrially produced either. The fraction of
purchased food that is industrially produced is provided by the Gates
Foundation as a single national value. We calculate a group's fortifiability by
multiplying this industrially produced fraction by the group's proportion
purchased, which breaks the national value down by sex, age, and wealth.

.. _lsff_2026_india_rice:

Rice as a special case
++++++++++++++++++++++

The Government of India has mandated fortified rice across all government food
schemes and reported that 100% of rice distributed through these schemes was
fortified by March 2024 [PIB-2024]_. Therefore, whether someone eats fortified
rice depends heavily on whether their rice comes from a government scheme.

HCES lets us estimate this. It records rice obtained through PDS separately from
rice from other sources. It also records each person's meals, including meals
provided by school and balwadi feeding programs. We use these to split each
person's rice consumption into government and non-government rice.

Rice eaten at home is split according to the household's own mix of PDS and
non-PDS rice. All rice eaten in school or balwadi meals is counted as government
rice, since fortified rice was scaled up through those programs. Rice eaten in
other meals away from home, such as employer, paid, and other meals, is assumed
to have the same government share as the household's meals at home. This gives
each person a proportion of their rice that comes from government sources.

From this proportion we estimate three things for each sex, age, and wealth
group:

- the share of people eating any government rice
- the share eating only government rice
- among people eating both kinds, the average proportion of their rice that is
  government rice

The first two are multiplied by the fraction of government rice that is
fortified (provided by the Gates Foundation). This gives, for each group, the
share of people eating any fortified rice and the share eating only fortified
rice. We assume non-government rice is not fortified at baseline, so for people
eating both kinds, the proportion of their rice that is fortified is the same as
their proportion of government rice.

.. _lsff_2026_india_rice_fortifiability:

Rice fortifiability
-------------------

Rice fortifiability is calculated differently from other vehicles (see
:ref:`lsff_2026_india_fortifiability`). We assume all government rice is
fortifiable, because it is distributed through the scheme that requires
fortification. Non-government rice is treated like any other vehicle. It is
fortifiable only if it was purchased and industrially processed.

For each group, rice fortifiability is the government share of rice, plus the
non-government share times the proportion of non-government rice that was
purchased times the industrially produced fraction. For non-government rice
eaten in meals away from home, we assume the same purchased proportion as at
home.

.. note::

  The Gates Foundation's industrially produced fraction for rice covers the
  whole market, including government rice, so using it here would count
  government rice twice. Instead, we calculate the industrially produced fraction
  for non-government rice so that national rice fortifiability for women of
  reproductive age matches the Gates Foundation value.

Assumptions and limitations
+++++++++++++++++++++++++++

Several assumptions above affect the results and should be kept in mind when
interpreting them:

- Meals eaten away from home contain the vehicle at the same rate as meals at
  home.
- Per-meal consumption is capped at the 95th percentile.
- Pregnancy doesn't change consumption.
- The wealth index uses fewer and different variables than DHS.
- For rice, all rice in school and balwadi meals is government rice, all
  government rice is fortifiable, and non-government rice is not fortified at
  baseline.

References
++++++++++

.. [DHS-Wealth-Index]
  The DHS Program. Wealth Index Construction.
  `<https://dhsprogram.com/topics/wealth-index/Wealth-Index-Construction.cfm>`_

.. [FSSAI-Fortified-Food]
  Food Safety and Standards Authority of India (FSSAI). Fortified Food.
  `<https://stg-old.fssai.gov.in/cms/fortified-food.php>`_

.. [PIB-2024]
  Press Information Bureau (Research Unit), Government of India. Nutritious
  Boost: Free Fortified Rice for a Healthier India. Department of Food and
  Public Distribution; 11 October 2024.
  `<https://static.pib.gov.in/WriteReadData/specificdocs/documents/2024/oct/doc20241011414401.pdf>`_
