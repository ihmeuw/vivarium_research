.. role:: underline
    :class: underline

..
  RST needs unique labels for its reference targets (the things you make with
  ".. my_link_name:").  This document has several pre-defined reference target
  templates you should do a find and replace on when you copy this document.
  They are {YOUR_MODEL_TITLE} which you should replace with a title-case version
  of your model name, {YOUR_MODEL_UNDERSCORE} which you should replace with an
  underscore-separated all lowercase version of your model name, and
  {YOUR_MODEL_SHORT_NAME} which you should replace with an abbreviation of your
  model title.  For instance, if you were doing a model of severe acute malnutrition
  for the Children's Investment Fund Foundation based on GBD 2019, we might have

    YOUR_MODEL_TITLE = Vivarium CIFF Severe Acute Malnutrition
    YOUR_MODEL_UNDERSCORE = 2019_concept_model_vivarium_ciff_sam
    YOUR_MODEL_SHORT_NAME = ciff_sam

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




.. _{vivarium_census_prl_synth_data}:

==================================
Vivarium Census PRL Synthetic Data
==================================

.. contents::
  :local:

+----------------------------------------------------+
| List of abbreviations                              |
+=======+============================================+
| ACS   | American Communities Survey                |
+-------+--------------------------------------------+
| AIAN  | American Indian and Alaskan Native         |
+-------+--------------------------------------------+
| NHOPI | Native Hawaiian and Other Pacific Islander |
+-------+--------------------------------------------+
| PRL   | Probabilistic Record Linkage               |
+-------+--------------------------------------------+
| USCB  | United States Census Bureau                |
+-------+--------------------------------------------+

.. _{census_prl}1.0:

1.0 Background
++++++++++++++

Probabilistic Record Linkage (PRL) typically uses sensitive data
containing information such as name, address, date of birth, and
sometimes even social security number, and the restrictions on access
to such data has been a barrier to developing and testing new methods
and software for PRL.  By simulating realistic, but synthetic, data
which includes these attributes, we can make PRL research and
development easier for ourselves and others.

We are certainly not the first to attempt such a data synthesis
project.  Prior approaches include FEBRL, GeCO from UQ, and UALR's
`synthetic occupancy generator (SOG) approach
<https://www.researchgate.net/profile/John-Talburt/publication/215991472_SOG_A_Synthetic_Occupancy_Generator_to_Support_Entity_Resolution_Instruction_and_Research/links/5546986d0cf23ff71686d81f/SOG-A-Synthetic-Occupancy-Generator-to-Support-Entity-Resolution-Instruction-and-Research.pdf?origin=publication_detail>`_.
There is also relevant work from Chris Dibben, who developed `an R
package for producing synthetic data
<https://www.synthpop.org.uk/index.html>`_, and from Robin Linacre,
who developed `synthetic data for testing splink
<http://github.com/moj-analytical-services/splink_synthetic_data>`_.

The unique elements of our work will rely on Vivarium: our synthetic
data will be informed by the United States Census Burea (USCB) needs
and publicly released USCB data (such as the American Communities
Survey [ACS]).  By using Vivarium, we will represent some realistic
dynamics of household and family structure at large scale and with
relevant geographies.  In the longer term, I hope that this work will
also be easily extendable because of our modular framework, for
example, I hope it will be somewhat straightforward to have a mash-up
of the PRL sim with the with cancer detection models we completed a
year ago, to help PRL researchers in cancer surveillance space.

.. _{census_prl}1.1:

1.1 Project overview
--------------------

All simulants will have age and sex (:ref:`1
<census_prl_age_sex_etc>`), following our standard approach.  We will
also include attributes capturing race/ethnicity (:ref:`2
<census_prl_age_sex_etc>`), geographic location (:ref:`3
<census_prl_age_sex_etc>`), and household id (:ref:`4
<census_prl_age_sex_etc>`). To better name individuals we will also
include an attribute for their relationship to a reference person
(:ref:`5 <census_prl_age_sex_etc>`). Due to the complex interplay of
these attributes we will need an enhanced fertility model (:ref:`6
<census_prl_fertility>`).  We can use our standard mortality model
(:ref:`7 <census_prl_mortality>`), but will need a totally new model
of migration (:ref:`8 <census_prl_migration>`) that accounts for moves
by household and individual simulants and allows migration in to and
out of the tracked population, as well as changes to geographic
location and household id.

On top of this, we will layer attributes relevant to PRL: mailing
addresses for each household (9); first, middle, and last names for
each simulant (10); date of birth (11); intended-to-be-unique
identification number modeling SSN that is missing for some and not
actually unique for others (12); and periodic observations of these
attributes through survey, census, and registry with realistic noise
(13).

Additional components we might want: time-dependent changes to
observers of sex, based on gender assigned at birth (15); multiple
households for individuals, leading to double counting in census (16);
twins and multiparous births in fertility model (14).  To capture an
additional dimension of heterogeneity and also to enable a periodic
observer that simulates tax returns we will also need a component
representing income (17), which will look a lot like a risk factor
exposure.


.. _census_prl_components:

2.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _census_prl_concept_model:

2.1 Vivarium concept model 
--------------------------

.. note:: vivarium concept model diagram to come (TK)


.. _census_prl_age-sex-etc:

2.2 Demographics
----------------

.. _census_prl_pop_descr:

2.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  - cohort type: open
  - cohort length: 20 years
  - age and sex structure: USA population from ACS 2019
  - time step: 28 days
  - fertility: as described below
  - stratifications: none --- see below for details on custom observers to capture census-, survey-, and registry-style data generation


.. _census_prl_location:

2.2.2 Location description
~~~~~~~~~~~~~~~~~~~~~~~~~~

We will begin with a model of a simple random sample of households in
Florida, but design with a plan to make a whole-USA-scale data product
eventually, as well as an idea of doing more focused geographies, such
as a single PUMA or collection of PUMAs.


.. _census_prl_models:

2.3 Components
--------------
  

.. _census_prl_age_sex_etc:

2.3.1 Components 1-5: Age, sex, race/ethnicity, geographic location, household id, and relationship
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

These attributes will be designed to follow closely the data available
in the American Communities Survey Public Use Microdata Sample.

This data includes age in years, sex of male/female, OMB
race/ethnicity, and geographic location encoded at the PUMA, which is
smaller than state but sometimes larger than county.

To match the target of the US Counties BoD team, we will aggregate
race/ethnicity into the following partition:

* Non-Latino White alone
* Non-Latino Black alone
* Non-Latino American Indian and Alaskan Native (AIAN) alone
* Non-Latino Asian alone
* Non-Latino Native Hawaiian and Other Pacific Islander (NHOPI) alone
* Non-Latino Multiracial or Some Other Race
* Latino

This is basically compatible with the surname data we will use in Section (10).

For initialization on simulation start, we will sample households from
ACS PUMS rows in the specified PUMAs with replacement, and with
sampling weights given by ACS data; here is sample code for a nanosim
initial population:

.. sourcecode:: python

    # load some ACS data
    columns = ['household_id', 'location', 'fips code', 'puma', 
               'weight', 'age', 'sex', 'race_eth', 'relshipp',
              ]
    acs = pd.read_csv('/home/j/Project/Models/VEHSS/prepped/acs_2019_pums.csv', low_memory=False, usecols=columns)
    acs_hh_only = acs[acs.household_id.str.contains('HU')]  # subset of rows for "household" sample, meaning those _not_ in group quarters

    # sample households to initialize population table
    n_households = 3

    p = acs_hh_only.query(location_str).groupby('household_id').weight.mean() # FIXME: load and use household weights here, instead of this
    p /= p.sum()

    resampled_households = np.random.choice(a=p.index, p=p,
                                            size=n_households, replace=True)

    g = acs.groupby('household_id')
    def household(i, hh_id):
        dfg = g.get_group(hh_id).copy()
        dfg['household_id'] = i
        return dfg
    df_population = pd.concat([household(i, hh_id) for i, hh_id in enumerate(resampled_households)])

In the code above, there is a location string filter which we can use
to focus our simulation on a single state or PUMA.  For our initial
model, please focus on Florida, with

.. sourcecode:: python

    location_str = 'location == "FL"'  # restrict to subset of ACS data, e.g. specific state or PUMA

Here is a small example of what the code in this section will load from ACS:

+---------+---------------+-------+------+-----------+------+-----------+-----------+-------------+
|         | household_id  | puma  | age  | relshipp  | sex  | race_eth  | location  | fips code   |
+=========+===============+=======+======+===========+======+===========+===========+=============+
| 801679  | 0             | 1110  | 5    | 25        | 1    | 2         | FL        | 12          |
+---------+---------------+-------+------+-----------+------+-----------+-----------+-------------+
| 801678  | 0             | 1110  | 39   | 20        | 2    | 2         | FL        | 12          |
+---------+---------------+-------+------+-----------+------+-----------+-----------+-------------+
| 782698  | 1             | 7301  | 67   | 20        | 2    | 1         | FL        | 12          |
+---------+---------------+-------+------+-----------+------+-----------+-----------+-------------+
| 782699  | 1             | 7301  | 82   | 36        | 1    | 1         | FL        | 12          |
+---------+---------------+-------+------+-----------+------+-----------+-----------+-------------+
| 801484  | 2             | 12703 | 82   | 20        | 1    | 1         | FL        | 12          |
+---------+---------------+-------+------+-----------+------+-----------+-----------+-------------+

The fertility model and migration model will also add new simulants,
who will need their attributes initialized carefully; I will put
additional detail about how to do this in the fertility and migration
sections of the documentation.

The relationship field will be relevant to Last Name generation, and
for easy reference, here are the meanings of the relationship codes
from ACS:

+-------+--------------------------------------------------+
| Code  | Meaning                                          |
+=======+==================================================+
| 20    | Reference person                                 |
+-------+--------------------------------------------------+
| 21    | Opposite-sex husband/wife/spouse                 |
+-------+--------------------------------------------------+
| 22    | Opposite-sex unmarried partner                   |
+-------+--------------------------------------------------+
| 23    | Same-sex husband/wife/spouse                     |
+-------+--------------------------------------------------+
| 24    | Same-sex unmarried partner                       |
+-------+--------------------------------------------------+
| 25    | Biological son or daughter                       |
+-------+--------------------------------------------------+
| 26    | Adopted son or daughter                          |
+-------+--------------------------------------------------+
| 27    | Stepson or stepdaughter                          |
+-------+--------------------------------------------------+
| 28    | Brother or sister                                |
+-------+--------------------------------------------------+
| 29    | Father or mother                                 |
+-------+--------------------------------------------------+
| 30    | Grandchild                                       |
+-------+--------------------------------------------------+
| 31    | Parent-in-law                                    |
+-------+--------------------------------------------------+
| 32    | Son-in-law or daughter-in-law                    |
+-------+--------------------------------------------------+
| 33    | Other relative                                   |
+-------+--------------------------------------------------+
| 34    | Roommate or housemate                            |
+-------+--------------------------------------------------+
| 35    | Foster child                                     |
+-------+--------------------------------------------------+
| 36    | Other nonrelative                                |
+-------+--------------------------------------------------+
| 37    | Institutionalized group quarters population      |
+-------+--------------------------------------------------+
| 38    | Noninstitutionalized group quarters population   |
+-------+--------------------------------------------------+

Vivarium needs to know the population size that it will initialize
before a simulation starts running. Because we would like to set a
number of households and then sample them, we don't have a total
population count to give to Vivarium.  As a work-around solution we
will fix a target number of people, sample households until we exceed
this number, discard the last household (which will have at most 17
people, since that is the largest household size in ACS), and then
mark the last 1-17 people as untracked -- which isn't so much memory
to drag around. Drawback: this leaves both the number of households
and the number of simulants as variable (but not that variable).

**Verification and validation strategy**: to verify this approach, we
can use an interactive simulation in a Jupyter Notebook to check that
the marginal distribution for each attribute looks as expected --- the
age distribution should look like the Florida age pyramid; the sex
ratio should match Florida as well.  The race/ethnicity distribution
should, too, as well as the distribution of household sizes and
relationship frequencies.  I will also verify that the household
relationships are logical --- every household should have a reference
person, and at most one spouse/partner; there should be no group
quarters population.

.. _census_prl_fertility:

2.3.2 Component 6: Fertility
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This component will follow the basic approach of the age-specific
fertility model that we have had for a long time, but never used
seriously. But because of the data and the application, we will also
propagate information from the household.  Each simulant will have a
probability of adding a newborn simulant at each time step, derived
from the age-specific fertility rate for USA.

The race/ethnicity of the simulants added by the fertility model will
be derived from the race/ethnicity of parent; the household id,
geography attribute, street address, and surname will also be derived
from the parent.  (This approach identifies only one parent, and that
might be sufficient for now, although as I learn more about the
specific challenges of Census PRL, I will find out if we need to
revisit this and keep track of dad as well as moms).

Code for pulling GBD ASFR appears in `recent Maternal IV Iron model
<https://github.com/ihmeuw/vivarium_gates_iv_iron/blob/67bbb175ee42dce4536092d2623ee4d83b15b080/src/vivarium_gates_iv_iron/data/loader.py#L166>`_.

Multiparity --- make twins with probability 4%.  See Section (14) for
additional details.

Relationship -- the sim knows a parent-child dyad when the new
simulant is initialized, and to come up with a consistent value for
the "reference person" relationship field, we use the following
mapping:

+--------------------------------------------------+----------------------------------------+
| Parent relationship to reference person          | Child relationship to reference person |
+==================================================+========================================+
| Reference Person                                 | Biological child                       |
+--------------------------------------------------+----------------------------------------+
| Opposite-sex husband/wife/spouse                 | Biological child                       |
+--------------------------------------------------+----------------------------------------+
| Opposite-sex unmarried partner                   | Biological child                       |
+--------------------------------------------------+----------------------------------------+
| Same-sex husband/wife/spouse                     | Biological child                       |
+--------------------------------------------------+----------------------------------------+
| Same-sex unmarried partner                       | Biological child                       |
+--------------------------------------------------+----------------------------------------+
| Biological son or daughter                       | Grandchild                             |
+--------------------------------------------------+----------------------------------------+
| Adopted son or daughter                          | Grandchild                             |
+--------------------------------------------------+----------------------------------------+
| Stepson or stepdaughter                          | Grandchild                             |
+--------------------------------------------------+----------------------------------------+
| Brother or sister                                | Other relative                         |
+--------------------------------------------------+----------------------------------------+
| Father or mother                                 | Brother or sister                      |
+--------------------------------------------------+----------------------------------------+
| Grandchild                                       | Other relative                         |
+--------------------------------------------------+----------------------------------------+
| Parent-in-law                                    | Other relative                         |
+--------------------------------------------------+----------------------------------------+
| Son-in-law or daughter-in-law                    | Grandchild                             |
+--------------------------------------------------+----------------------------------------+
| Other relative                                   | Other relative                         |
+--------------------------------------------------+----------------------------------------+
| Roommate or housemate                            | Other nonrelative                      |
+--------------------------------------------------+----------------------------------------+
| Foster child                                     | Grandchild                             |
+--------------------------------------------------+----------------------------------------+
| Other nonrelative                                | Other nonrelative                      |
+--------------------------------------------------+----------------------------------------+
| Institutionalized group quarters population      | Institutionalized GQ population        |
+--------------------------------------------------+----------------------------------------+
| Noninstitutionalized group quarters population   | Noninstitutionalized GQ population     |
+--------------------------------------------------+----------------------------------------+

Birth spacing: When we initialize newborns during the sim, we choose their parent
first and then we give the child things like the parents last name,
the parents address, etc, then we make sure the parent doesn't have
another child for at least 9 months.

When we initialize all simulants at the start of the sim, some people
are initialized as "biological child" of the reference person in terms
of their "relationship to head of household". In this case we also
give them the same last name, etc. (we do this for simulants
initialized as the parent of reference person.)

A related limitation/simplification in our current approach is that
when we initialize a household at the start of the sim that includes a
reference person who likely recently gave birth (e.g. an age 32 female
reference person and an age 0 biological child) we currently don't
mark the reference person as having had a child, and so they are
eligible to give birth again the next month. We could make this more
complicated in the future.


**Verification and validation strategy**: to verify this approach, we
can use an interactive simulation in a Jupyter Notebook to check that
new simulants are being added at the expected rate, and with
attributes that match the parent.

.. _census_prl_mortality:

2.3.3 Component 7: Mortality
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This component will use the standard approach from our Vivarium Public
Health sims, and take data from the age-/sex-specific forecast of
all-cause mortality for USA as produced by the FBD team.

In the future, we may wish to switch to something derived from the
work of the US County BoD team, which is preparing race/ethnicity
specific estimates of all-cause mortality at the county level.

https://vivarium-research.readthedocs.io/en/latest/model_design/cause.html#all-cause-mortality

GBD has state-level all-cause mortality, does FBD forecast at the US
state level yet? Not necessary right now, but good to know for the
future.

**Verification and validation strategy**: to verify this approach, we
can use an interactive simulation in a Jupyter Notebook to check that
simulants are dying at the expected rates.

.. _census_prl_migration:

2.3.4 Component 8: Migration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A construct that will help think through the migration component is
"directed tripartite graph" showing arcs from simulants (part A) to
households (part B) as well as arcs from households to housing units
(part C).

This construct allows us to distinguish between and easily represent
household migration and individual migration where the whole household
does not move.

In our simplest version, we will have a rate for changing an arc from
a simulant in A to a different household in B, and an independent rate
for changing an arc from a household in B to a new housing unit in C.

I could imagine making these rates quite complex someday, to take into
account the age, sex, race/ethnicity, household structure, and even
past migration history.  At this point, it is clear that age is
necessary to get the college dormatory migration right, so we might as
well include sex and race/ethnicity stratification in the rates as
well.

A complex type of movement that we need to capture is moving into and
out of Group Quarters; it is useful to think of six broad types of GQ
for PRL purposes grouped into two categories: non-institutional
(college, military, other non-institutional); and institutional
(carceral, nursing homes, and other institutional).  College is likely
to be the tough one in Census applications (Census will have SSN for
most military and incarcerated, Medicare for most nursing home, but
people living in dorms, especially who don't file their own tax
returns might not have a protected identification key [PIK].)

To capture this, on the research side I will develop a migration rate
file, with stratification columns for age group, sex, and
race/ethnicity and data columns for the household move rate in moves
per person year and individual move rate (also in moves per person
year).  On the reseach side, I will also develop a migrates-to
probability file, with the probability that an individual moves a
different household or to each type GQ, also stratified by age, sex,
and race/ethnicity.  To keep things simple, we will for now not have the
reference person ever move in a non-household migration, and when a
non-reference person moves to another household, we will update their
relationship to the reference person to be 36 - Other non-relative
(for simplicity, for now).

This will prevent toddlers from moving out of their parents houses. It
will still have a mother moving out of a house and leaving an
infant. We could add functionality such that children move with their
mothers from birth up to some fixed age (or something similar), but
for now we will have this limitation that our migration model does not
take family structure into account.

These notes on ACS data sources on migration could be useful for the
more complex rates in the future.  Based on age, sex, race/ethnicity,
and geography, can calculate the probability of moving from ACS, as
the weighted average of MIGPUM.isnull(); Could also determine if they
moved within the PUMAs represented in the sim or from outside those
PUMAs.

Note that each housing unit in C should be associated with a unique
mailing address, as described in Section (8).

At some point, I could imagine creating new housing units during the
sim, but to keep it simple for now, perhaps we don't have to.

At some point, I could imagine also explicitly modeling that some
persons and/or households move out of the simulation tracking area,
but I'm not sure how to decide how many.  Maybe they should stay
tracked, so that they can move back later, e.g. after some years
overseas.

At some point, I could imagine having new people and families move
into the sim, but for our minimal model, let's leave this out.

Schema for the types of migration we eventually might include:

#. Existing household moves 

   #. To another house in simulation

   #. Outside of simulation catchment area

#. New household moves into simulation

#. Existing person moves

   #. To another place in simulation

      #. To a household

      #. To group quarters of specific GQ types, e.g. one of six mutually exclusive, collectively exhaustive categories

   #. Outside of simulation catchment area

#. New person moves into simulation (could be considered together with (2), using ACS data)

When we reach that point, we might also want to think about the change
in relationship type when people move, and also change surnames
sometimes.

We might also put a "demographic" model on the housing units in (C);
according to `ACS: America's Data At Risk
(p. 21) <https://censusproject.files.wordpress.com/2022/03/census_white-paper_final_march_2022.pdf>`_,
"Between 2000 and 2019, the number of housing units increased by 23.8
million or almost 21%."

But to summarize, for our initial implementation, here are the
simplifying assumptions that we have included:

#. each household will have one address

#. when a household moves, we will create a new address for them. no
   one will move back into that old address.

#. each time an individual moves, they move into an existing household
   / household id. this household is chosen at random out of all
   households excluding their current one

#. each time an individual moves into an existing household, they gain
   the relationship to head of household "Other nonrelative"

#. the head of household cannot move to a new household

**Verification and validation strategy**: to verify this approach, we
can use an interactive simulation in a Jupyter Notebook to check that
simulants are moving at the expected rates.


2.3.5 Component 9: Address
~~~~~~~~~~~~~~~~~~~~~~~~~~

Each household id should be associated with a residential address, and
(in a future, more complicated model) when people move, they should
often move into previously vacated households, so that there are
distinct households which have had the same residential address at
different times.  We hypothesize that this will present a relevant
challenge for PRL methods in practice.

It is not clear how important it is to have housing unit address
correspond to geography, and I am trying to gauge how much effort to
put into having geographically realistic addresses.  This is also a
sensitive area for privacy and personal information --- even if the
data is synthetic, it might refer to a real location.  The risks of
this are unclear.

A generator that can generate street address and zip code is the
Python package faker: https://github.com/joke2k/faker

.. sourcecode:: python

    # addresses stay with households, can start with faker python library
    import faker
    fake = faker.Faker()

    def my_fake_address():
        orig_address = fake.unique.address()
        address = orig_address.split('\n')[0]
        return address

    address_dict = {hh_id: my_fake_address() for hh_id in df_population.household_id.unique()}

    zip_dict = {hh_id: provider.postcode_in_state('FL') for hh_id in df_population.household_id.unique()}

    df_population['address'] = df_population.household_id.map(address_dict)
    df_population['zip'] = df_population.household_id.map(zip_dict)

Some additional libraries that function similarly to ``faker`` are https://github.com/ropensci/charlatan
and https://github.com/paulhendricks/generator

It would be cool to have geographically plausible addresses, for
example by reversing the process of libpostal, based on the PUMA
geocoords. (it turns out that libpostal is an address parser, and does
not map the parsed value to a lat/lon coordinate; an updated attempt
has packaged libpostal training data conveniently:
https://github.com/GRAAL-Research/deepparse-address-data)

It would be responsible to avoid putting real addresses in the
synthetic database, perhaps by checking the synthetic data against
libpostal and rejecting the generated addresses that seem real.
Census Bureau might appreciate this and might even be able to provide
USPS data on what real addresses are and we can avoid them (although
there is an obscure potential privacy issue with that, too!).  We
could potentially use business addresses as residential addresses as a
backup plan.

A relevant disparity in linkage accuracy might arise from the
challenging nature of linking rural addresses; there is some
information in `this report
<https://www.census.gov/content/dam/Census/library/publications/2012/dec/2010_cpex_247.pdf>`_
which shows (p. 31) how people in rural counties are hard to match
(presumably due mostly to address issues).  According to `this page
from 2010 Decennial Census
<https://www.census.gov/newsroom/blogs/director/2010/02/the-four-principal-ways-we-conduct-the-census.html>`_
there is 9% of the US population where the mail is not delivered to
the residence uniformly.  For these households, we might want to
capture different addresses in the decennial census simulated output
and the tax return simulated output.  We can (in a future, more
complicated model) represent this by mantaining a *mailing address*
for each household that is sometimes different from residential
address for the household's housing unit.  A simple distinction would
be to make the mailing address a P.O. Box for 9% of the households,
although it would be great to have this vary with location, age, sex,
race/ethincity, and income.  When households move, this would always
result in a new residential address (because of the new housing unit),
but sometimes not make a change to the PO Box (especially if the move
was not far, e.g. within the same PUMA).  For our minimal model, we
will not include this, however, and I will try to get more info about
how important this challenge to matching is in Census Bureau
applications.  I believe that I will learn it is important, however,
because decennial census will know a residential address but IRS and
Medicare will know a mailing address, which will making linking hard
for the population without mail delivery to residence.


**Verification and validation strategy**: to verify this approach, we
can manually inspect a sample of 10-100 addresses; features to
examine: does everyone in a household have the same address?  does the
zip code match the state?  does the street conform to typical
expectations?

2.3.6 Component 10: Names
~~~~~~~~~~~~~~~~~~~~~~~~~

**Last names**

Last names in USA by race
https://www2.census.gov/topics/genealogy/2010surnames/surnames.pdf
https://www.census.gov/topics/population/genealogy/data/2010_surnames.html

Note: RAND used something like this for their BISG project
https://www.rand.org/pubs/external_publications/EP20090611.html
https://www.rand.org/health-care/tools-methods/bisg.html

.. sourcecode:: python

    # last name can be race/ethnicity specific
    df_census_names = pd.read_csv('/home/j/Project/simulation_science/prl/data/Names_2010Census.csv', na_values=['(S)'])

    # fill missing values with equal amounts of what is left
    n_missing = df_census_names.filter(like='pct').isnull().sum(axis=1)
    pct_total = df_census_names.filter(like='pct').sum(axis=1)

    pct_fill = (100 - pct_total) / n_missing
    for col in df_census_names.filter(like='pct').columns:
        df_census_names[col] = df_census_names[col].fillna(pct_fill)

    def random_last_name(race_eth):
        p = df_census_names['count'].copy()

        if race_eth == 1:
            p *= .01 * df_census_names.pctwhite
        elif race_eth == 2:
            p *= .01 * df_census_names.pctblack
        elif race_eth == 3:
            p *= .01 * df_census_names.pcthispanic
        else:
            p *= .01 * (100 - (df_census_names.pctwhite + df_census_names.pctblack + df_census_names.pcthispanic))

        # make zero probabilities go away
        s_name_pr = pd.Series(np.array(p), index=df_census_names.name)
        s_name_pr = s_name_pr[s_name_pr > 0]
        s_name_pr /= s_name_pr.sum()
        return np.random.choice(s_name_pr.index, p=s_name_pr).capitalize()

    # should everyone in a household have the same last name?  seems overly normative, but what is smarter?
    for hh_id, dfg in df_population.groupby(['household_id']):
        last_name = random_last_name(dfg.race_eth.value_counts().iloc[0])  # HACK: use most common race/eth in household
        df_population.loc[dfg.index, 'last_name'] = last_name
        # TODO: for rows with relshipp value of 22, 24, 31, 32, 34, 35, 36, give different last name

Last names sometimes also include spaces or hyphens, and I have come
up with race/ethnicity specific space and hyphen probabilities from an
analysis of voter registration data (from publicly available data from
North Carolina, filename VR_Snapshot_20220101.txt; see
2022_06_02b_prl_code_for_probs_of_spaces_and_hyphens_in_last_and_first_names.ipynb
for computation details.)


	
**First and middle names**

First names from babies:
https://www.ssa.gov/oact/babynames/limits.html ; this page links to a
data file of State-specific birth certificate frequencies for first
names https://www.ssa.gov/oact/babynames/state/namesbystate.zip

How to get realistic race/ethnicity for first and middle names?  And
is that important? We could use ecological approach to back out
race/ethnicity from state-to-state variation in first names.  To test,
we would take (for example) a traditionally Black first name and see
if the state-to-state rate is correlated with the percent of Black
babies --- can use state random effects to include data from multiple
years to be increase predictive validity.

Use middle names from same distribution as first names (?). It would
be nice to get some of the national/ethnic challenges right, like
people from South America with many names getting their middle names
used as different last names.

We might want to eventually include nicknames and suffixes like Jr. and III.

.. sourcecode:: python

    # first and middle names
    # strategy: calculate year of birth based on age, use it with sex and state to find a representative name
    df_ssn_names = pd.read_csv('/home/j/Project/simulation_science/prl/data/ssn_names/FL.TXT',
                               names=['state', 'sex', 'yob', 'name', 'freq'])
    df_ssn_names['age'] = 2020 - df_ssn_names.yob
    df_ssn_names['sex'] = df_ssn_names.sex.map({'M':1, 'F':2})
    g_ssn_names = df_ssn_names.groupby(['age', 'sex'])
    def random_names(age, sex, size):
        t = g_ssn_names.get_group((age, sex))
        p = t.freq / t.freq.sum()
        return np.random.choice(t.name, size=size, replace=True, p=p)
    for (age,sex), df_age in df_population.groupby(['age', 'sex']):
        df_population.loc[df_age.index, 'first_name'] = random_names(age, sex, len(df_age))
        df_population.loc[df_age.index, 'middle_name'] = random_names(age, sex, len(df_age))

It could be valuable to include correlation between first and last
names.  There will be a little from the strategy described above, but
we could develop a strategy to more explicitly model it.  One approach
is outlined here, but we will not use it in our minimal model.  With a
large corpus of full names, (1) derive an empirical correlation matrix
of soundex of first name and soundex of last name; and then use the
sources described above to create conditional samplers for first name
and last name based on soundex.  Perhaps measure of success is to look
at entropy of character n-gram distribution.

**Verification and validation strategy**: to verify this approach, we
can manually inspect a sample of 10-100 names; we can also look at the
frequency of common first and last names, as well as the frequency of
common last names stratified by race/ethnicity.  There will likely be
funny combinations of first and last names for certain race groups
(e.g. South Asian first names with East Asian last names) but we are
not expecting to get that right.

2.3.7 Component 11: Date of Birth
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To create a date-of-birth column in the synthetic output data, each
simulant should have a uniformly random date of birth which is
consistent with their age.

.. sourcecode:: python

    # random date of birth for 2019 ACS data

    data_date = pd.Timestamp('2019-06-01')
    age = 365.25 * df_population.age
    age += np.random.uniform(low=0, high=365, size=len(df_population))
    dob = data_date - pd.to_timedelta(np.round(age), unit='days')
    df_population['dob'] = dob

We could enhance this by using an empirical distribution of
birthdates, since they are not uniformly distributed.  There might
even be relevant determinants of date of birth (parents' educational
attainment, perhaps?) that we could introduce in this model.  But we
will keep this simple for now, on the assumption that it does not make
a difference in how well PRL methods perform.


**Verification and validation strategy**: to verify this approach, we
can bin DOB by day of week, month, and year, and see if the DOBs are
uniformly distributed across bins.  We can assess this manually by
visual inspection and quantitatively using an appropriate statistical
test (would that be a Chi-Square test?).


2.3.8 Component 12: Social Security Number
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Eventually, this should be missing for some and not actually unique
for others.  I need to do some research into how we represent this,
and how important it is.  According to `this report
<https://www.census.gov/content/dam/Census/library/publications/2012/dec/2010_cpex_247.pdf>`_,
"There were 308.7 million persons in the 2010 Census, and 279.2
million were assigned a protected identification key"

There is a python library that includes a detailed SSN generation
module:
https://github.com/joke2k/faker/blob/master/faker/providers/ssn/en_US/__init__.py#L219-L222

Zeb found some documentation from SSA confirming that ``faker`` has an
accurate algorithm for SSN generation:
https://www.ssa.gov/kc/SSAFactSheet--IssuingSSNs.pdf

In this investigation, he also noted that before 2011, SSNs
corresponded to location: https://www.ssa.gov/employer/stateweb.htm We
might want to integrate this in the future, although I'm not sure if
any PRL methods rely on the link between SSN and location.

It is also possible that it will be annoying to Census Bureau if we
have realistic SSN values, even if they are randomly generated, and we
may wish to change to numeric format for this to a synthetic SSN-like
(SSSN) value


.. sourcecode:: python

    # give everyone a unique fake ssn (for now)
    df_population['ssn'] = [fake.unique.ssn() for _ in range(len(df_population))]

**Verification and validation strategy**: to verify this approach, we
can manually inspect a sample of 10-100 SSNs, confirm that the
expected number are missing and that the duplication count follows the
intended distribution.

2.3.9 Component 13: Periodic observations of attributes through survey, census, and registry
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For inspiration, here is the list of files that Census Bureau
routinely links:
https://www2.census.gov/about/linkage/data-file-inventory.pdf

Each of these observers must include a "unique simulant id" column so
that users can see how well they have done.

The decennial census simulator will be an important part of this,
capturing everyone in the sim with a probability to be determined from
a careful read of census quality assessment documentation.

A master SSN list will be another important part of this, and perhaps
the largest of these files, including name, address, DOB, and SSN.
This list should be a linkage output, derived from annually simulated
tax return documents, which include accurate SSN values year over year
(but only for people who have household income over a certain
threshold).  The decennial census simulator will have a different
address than the tax return data for 9% of the population.

Surveys and registries capturing a simple random sample of the
population or some otherwise identified special subset (e.g. everyone
who gets cancer from a disease model that we layer on to this, at some
point down the road).

Adding noise to the fields in these observers will be another
important part of the art, but this can happen _after_ simulation.
Some existing projects with noisy include
https://github.com/pinformatics/rlErrorGeneratoR and GeCo.  Or should
it perhaps be part of the simulation, since there are aspects of noise
that are better included during simulation (e.g. a child splitting
time between two households being reported at both addresses)?

GeCO distinguishes keyboard, transcription, and OCR error, and despite
being unsupported for 10 years, it seems to be the standard approach
among methods researchers, so we might aim for replicating it. The
fastLink article (APSR 2019) has five dimensions of data error: degree
of overlap, size balance, missingness mechanism, amount of missing
data, and measurement error. Some duplicates would be realistic too.

GeCO also has some capacity for including nicknames, which seems
relevant.  A NORC report titled *Assessment of the U.S. Census
Bureau's Person Identification Validation System* includes some common
non-names in an appendix, which would be good to use in simulated
survey responses and perhaps in the decennial census simulation as
well.

I also have an idea for audio distortion based on text-to-speech; use
Tacotron to generate spectragrams of names and then identify the names
that are similar in speech-space.  This could also be useful to run
backwards, as an update to metaphone and other algs.

Cancer surveillance registry -- there is an association that has
identified all common data elements used in cancer surveillance
linkage, this could provide some structure for data output:
https://www.naaccr.org/ ;
http://datadictionary.naaccr.org/default.aspx?c=10&Version=22#2350 is
an example entry in their ontology. As is
http://datadictionary.naaccr.org/default.aspx?c=10&Version=22#1830

Florida Cancer Registry uses https://www.accurint.com/ to confirm
potential matches. And this pdf shows the data elements they maintain:
https://fcds.med.miami.edu/downloads/datarequest/LinkageExample.pdf

Speaking of the Florida Cancer Registry experience, Alexandersson
suggests a mechanism for adding SSN noise: 1% of entries have some
transposed digits (e.g. wrongly typing 12 instead of 21 or 65 instead
of 56); 0.5% use wrong (e.g. spouse) SSN.

Anders Alexandersson suggests addresses with typographic errors would
be good (or is it phonetic errors?) A study of exact linkage on some
large databases relevant to voting in Texas identified address numeric
data as more accurate than the street name part.

To add noise to the DOB data, I will approximately follow the
frequencies that Buzz Campbell measured in his BHDS unduplication
work: Exact match for 96.11% of DOB, 2 of 3 fields exactly match for
3.20%, no match for 0.26%, missing for 0.24%, day and month fields
transposed for 0.18%. For future flexibility, I make all of these
values configurable options.

2.3.10 Twins and multiparous births (14)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

There is a lot we can potentially add to the model to represent how
hard it is to link twins and other multiples.  Individuals with the
same day of birth and last name will be a challenge, and if they have
the same address and same first letter of their first name, that is
even harder. For now, we will take a simple approach to this model,
with the plan to develop more complexity in the future if we determine
that it is an important part of the record linkage challenges we wish
to address.

I was planning to identify the twin rate from ACS, but I'm actually
not sure how to do it, because I can only tell if two kids have the
same age, not the same date of birth.  So for a simple model, until we
find something better let us (1) select each birth to be twins with
probablity 4\%; (2) ensure that for these births there are two
simulants added to the same household, with the same date of birth,
and the same last name.


2.3.11 Additional Components (15-16)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

We don't need these components for our minimal model, but we might
eventually want: time-dependent changes to observers of sex, based on
gender assigned at birth (15); multiple households for individuals,
leading to double counting in census (16).

2.3.12 Income (17)
~~~~~~~~~~~~~~~~~~

Individual income will be implemented as a risk exposure.  Average
income is basically equal to GDP per capita, so we could potentially
use that GBD covariate as the mean, but I think it will be easier to
make our own estimate of the mean and standard deviation of
log(income) for individuals stratified by age group, sex, and
race/ethnicity from ACS data. I think is it pretty common to assume
that this value is normally distributed, but we could use the GBD
ensemble risk exposure machinary if that assumption seems like a
limitation.

2.3.13 Employment (18)
~~~~~~~~~~~~~~~~~~~~~~

To represent businesses and employment dynamics we will use another
directed tripartite graph (analogous to our migration component),
showing arcs from simulants (part A) to employers (part B) as well as
arcs from employers to their addresses (part C).

This construct allows us to represent businesses that employ one or
more people, as well as individuals who are employed by multiple
businesses.  We will also be able to add business dynamics in the
future, e.g. new businesses arriving, old businesses closing down, and
even merges, as well as name changes and address changes.  All of this
will go into our simulated tax return data, which we must make a
scheme for before we access restricted tax data (since even the schema
of this data is restricted information).

To keep things simple for starters, we will give everyone age 18 and over a
random edge to an employer, chosen from a skewed distribution to
ensure that there are a few large employers and a "fat tail" of small
employers. We will change employers randomly at the rate of 50 changes
per 100 person years, and change employer addresses at a rate of 10
changes per 100 person years.  For now, we will have distinct
addresses for businesses and households, but eventually we might want
to intentionally include duplicates, e.g. if someone operates a
business out of their home.

The data will will extract from this network for our simulated tax
return is a list of businesses and their unique id numbers and for
each simulant who files a tax return, a list of the businesses that
they worked for during the calendar year.  We should also extract a
list of "dependents" from the household structure and perhaps
something about spouses, but let's leave thinking that through for
later.

.. _census_prl_limitations:

3.0 Limitations
+++++++++++++++

To Come (TK)

