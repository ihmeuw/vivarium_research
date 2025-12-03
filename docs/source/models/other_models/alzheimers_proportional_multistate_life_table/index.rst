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

.. _other_models_alzheimers_mslt:

==================================================================================
Alzheimer's "Outside the Sim" Calculations with Multistate Life Table
==================================================================================

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
  * - MSLT
    - Proportional Multistate Lifetable

Overview
++++++++
The :ref:`other_models_alzheimers_population_model` 
used for the :ref:`CSU Alzheimer's simulation <2025_concept_model_vivarium_alzheimers>`
does not model the susceptible population, only simulants in the presymptomatic AD, MCI, or 
AD dementia stages. This choice improves runtime by decreasing the simulation size.

However, since the susceptible population still undergoes BBBM testing, for complete BBBM testing results 
we must model those persons and observe
the number of BBBM tests conducted, the number of positive BBBM tests (false positives),
and the number of treatments initiated (unessecary treatments).

See the :ref:`intervention_alzheimers_testing_diagnosis` docs for more details on BBBM testing.

We model this susceptible population not using an individual simulant-based model, but by using a 
`proportional multistate lifetable <https://academic.oup.com/ije/article/49/5/1624/5920732>`_ (MSLT).

The population count for each age/sex group in each of several testing-related states is stored in a table and updated 
on each timestep during the simulation time period. The testing states track whether the the simulant's 
testing propensity is higher than the current threshold (never tested), whether the simulant has tested positive, and 
how long ago the simulant was last tested.

The rows of the table are the age/sex groups, and the columns are the testing-related states. 
By storing this information for the latest timestep, we can accurately observe the test data 
we need for this population over the simulation time period.

The MSLT runs from 2025 to 2100.

Below is a table demonstrating the age/sex groups and testing-related states that are tracked.
Each blank cell represents a subpopulation with a stored count.

.. list-table:: MSLT Structure
  :header-rows: 1

  * - Age
    - Sex
    - Untested
    - Positive
    - Negative (0 y ago)
    - Neg (1 y)
    - Neg (2 y)
  * - 60
    - Female
    - 
    - 
    - 
    - 
    - 
  * - 60
    - Male
    - 
    - 
    - 
    - 
    - 
  * - 61
    - Female
    - 
    - 
    - 
    - 
    - 
  * - 61
    - Male
    - 
    - 
    - 
    - 
    - 
  * - ...
    - ...
    - 
    - 
    - 
    - 
    - 
  * - 79
    - Female
    - 
    - 
    - 
    - 
    - 
  * - 79
    - Male
    - 
    - 
    - 
    - 
    - 

.. list-table:: Testing States
  :header-rows: 1

  * - State
    - Description
  * - Untested
    - MSLT simulants do not receive a BBBM test unless their lifetime :ref:`propensity <bbbm_propensity>`
      is less than the current time-specific :ref:`test rate <bbbm_rates>`, which is monotonic increasing.
      We avoid modeling individual propensities by testing a certain fraction of the untested subpopulation
      on each time step that the test rate increases. The fraction corresponds to the magnitude of the increase.
  * - Positive
    - Simulants who test positive remain in this state until they age out. Continuing to track these simulants
      is important to match the Vivarium simulation, which uses a :ref:`"person-time ever eligible" <alz_observer_outputs>`
      observer to validate test rates.
  * - Negative (0 y ago)
    - Tested simulants move either to the positive state or this state. On the next time step they will move to
      the "one year ago" state.
  * - Neg (1 y)
    - 
  * - Neg (2 y)
    - On the next time step simulants will move to either the positive or negative 0 years ago state.



Initializing the Population
+++++++++++++++++++++++++++

We initialize the susceptible population using the 2021 year forecasted population data :math:`P_{2021}` and the 
initial simulation "all states" Alzheimer's prevalence :math:`prev_{all}`. Our MSLT initial population is 
:math:`P_{2021} * (1 - prev_{all})`. This equation represents the non-simulation population at the start of the
simulation period. 

The only adjustment needed is to modify the age group sizes. The initial population data :math:`P_Y` is from 
GBD and age groups span five years, eg 60-64 year olds. To simplify our annual timesteps, we divide
these age groups into single year ages, eg 60 year olds, 61 year olds. We divide the five-year GBD 
age group populations by five to get single-year age group populations.

Since BBBM testing doesn't begin until 2030, the entire susceptible population is initialized to the 
untested state.

Model Scale
-----------

The population counts in the MSLT are at full scale for the susceptible population for the location.
The MSLT testing results do not need to be scaled.


On Time Step
++++++++++++

On each time step, the MSLT rows and columns and observers are updated to reflect population changes,
tests and treatments. 

We use an annual time step in order to best reflect our annual test rate targets. 

On each time step, new simulants must be added to the MSLT. The only way to enter the MSLT is to turn 
60 years old, since it models all 60-80 year-olds who are not in the Vivarium simulation.

The existing populations must be aged one year, and those who transition to preclinical AD or die must 
be removed.

Finally, test states must be updated, testing and treatments must be given, and observers updated.

Adding New Simulants
--------------------
We add the new susceptible 60 year old population on each time step using the same data sources
from initialization, for the year of the current MSLT time step. For time steps after 2050, when our forecasted
population data ends, we continue to intitialize new 60 year olds using the 2050 data. 

In other words, the overall population is :math:`P_Y * (1 - prev_{all})`. 
We use the 60-64 year old subpopulation and divide it by 5 to get a 60 year old population.

The current time-specific test rate will determine the fraction of the incident 60 year old population which 
will be tested - the rest will be initialized to the untested state.

Updating Age Groups
-------------------

On each time step, the table rows corresponding to each age are copied to the next age, eg 60 year olds males become
61 year olds. 80 year olds are removed from the table and no longer tracked.


Mortality 
---------

Some fraction of the susceptible, 60-79 year old population dies each year. We calculate an 
age, year, sex and location specific background mortality rate from the year-specific forecasted ACMR 
and 2021 CSMR from the artifact. ACMR forecasts end in 2050.

:math:`\text{mortality} = \text{ACMR} - \text{CSMR}`

On each time step we apply this background mortality rate to all 
subpopulations in our table of susceptible 60-79 year olds, without varying by test or treatment status.


Removing Simulants who Enter the simulation
-------------------------------------------

Some fraction of the susceptible, 60-79 year old population transitions from the susceptible state to the preclinical
state each year. We use the ``cause.alzheimers.susceptible_to_bbbm_transition_count`` artifact key as our source for 
age, year, sex and location specific transition counts. We divide these counts (which uses GBD age groups) by 5 to get
one-year age groups. 

In the current version, only untested simulants are removed from the MSLT due to transitioning to preclinical status.
Removing the same number of simulants, but proportionally from all the states could be an improvement.


Updating Testing States 
-----------------------
On each time step, simulants in the negative test states are advanced to the next negative test state. A fraction of 
incident 60 year olds that are selected for testing based on the current test rate, along with all simulants in the 
negative 2 years ago state from the previous time step. Additionally, a number :math:`U` of the untested state simualants are also
selected for testing based on the increase in test rate compared to last year, :math:`\Delta_{\text{test_rates}}`:

:math:`U = \Delta_{\text{test_rates}} * \text{total_age_pop}`, where :math:`\text{total_age_pop}` is the sum of all simulants 
in the age/sex group (among all states- untested, positive and negative).


Testing, Treatment and Observers
--------------------------------

Once the total number of people selected for testing on the time step is determined from the various sources 
(incident 60 year olds, negative 2 years ago and untested), tests are conducted.

Per the test parameters from the client, the BBBM test has a 90% specificity. We move 90% of the simulants to the negative
2 years ago state and 10% to the positive state.

Based on the location- and year-specific :ref:`treatment initiation rate <alzheimers_intervention_treatment_data_table>`, 
we observe the number of treatment initations.

Test counts and positive test counts are also observed for the results table.

A number of additional values are observed for each age/sex group and time step for validation purposes including testing state counts. 


Implementation and Data Sources
+++++++++++++++++++++++++++++++

The MSLT was run for 25 draws for each of the 10 locations of interest, from 2025 to 2100, saving all observer results.

The below table summarizes the variables, data values and sources.

.. list-table:: Data values and sources
  :header-rows: 1

  * - Variable
    - Definition
    - Source or value
  * - :math:`P_{Y}`
    - Year-specific forecasted population data
    - Artifact population structure key
  * - :math:`prev_{all}`
    - "All states" Alzheimer's prevalence
    - Artifact "scaling factor" key
  * - ACMR
    - Year-specific All Cause Mortality Rate
    - Artifact ACMR key
  * - CSMR
    - 2021 Cause Specific Mortality Rate
    - Artifact CSMR key
  * - 
    - Susceptible to Preclinical Transition Counts
    - Artifact ``cause.alzheimers.susceptible_to_bbbm_transition_count`` key