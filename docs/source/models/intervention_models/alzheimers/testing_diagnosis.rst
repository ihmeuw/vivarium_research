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

.. _intervention_alzheimers_testing_diagnosis:

==========================================
Alzheimer's Testing and Diagnosis
==========================================

Alzheimer's testing will be modeled as an intervention with no affected outcomes
which introduces PET, CSF, and BBBM testing for eligible pre-dementia populations, 
as defined in :ref:`Reference Scenario and Alternative Scenario 1 <alz_scenarios>`.


.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - BBBM
    - Blood-based biomarker
    - BBBM tests measure blood plasma protein levels and are less invasive than CSF or PET tests
  * - CSF
    - Cerebrospinal Fluid
    - CSF tests require a lumbar puncture
  * - PET
    - Positron Emission Topography
    - PET scanners measure brain protein levels are only available at specialized medical facilities


Intervention Overview
-----------------------

Alzheimer's testing is classified into two groups - existing (CSF and PET) testing, 
and a hypothetical BBBM testing. Existing testing already exists in present-day conditions, 
and our simulation will investigate the potential impact of the
introduction of a novel BBBM test in :ref:`Alternative Scenario 1 <alz_scenarios>`.
The introduction of BBBM testing will replace some of the existing tests in 
Alternative Scenario 1, and will also be used to inform treatment in Alternative 
Scenario 2. 

Vivarium Modeling Strategy
--------------------------

Note that disease model will take timestep before testing model, so simulants can be tested on incidence to new stage.

Existing testing - CSF and PET
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

CSF and PET are existing biomarker tests which can identify cases of Alzheimer's disease.
We model CSF and PET tests in our :ref:`Reference Scenario <alz_scenarios>` in order to
estimate the number of these more expensive, invasive tests which would be replaced
by the introduction of BBBM tests in :ref:`Alternative Scenario 1 <alz_scenarios>`.

Location-specific testing rates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
CSF and PET testing rates in the US, Germany, Spain, the UK and China are given by [Roth-et-al-2023-Diagnostic-Pathways]_.
The paper surveys health care providers about patients presenting with cognitive complains. 
Patients with cognitive complaints presenting to a health care provider is the denominator for these test rates.

Swedish CSF testing rate is from [Falahati-et-al-2015-SveDem]_, and PET comes from that value and the relative CSF vs PET test proportion (90% CSF, 10% PET)
given by [Mattke-et-al-2024-Sweden-Capacity]_. The cohorts for these studies are incident AD dementia cases and patients with confirmed MCI respectively.

For Japan, Israel, Taiwan and Brazil, because we have not yet found CSF and PET testing rates for these locations,
we use the total CSF and PET testing rates across all countries from [Roth-et-al-2023-Diagnostic-Pathways]_. 

After choosing these mean values, we subtract 50% for a lower confidence bound and add 50% for an upper confidence bound to reflect substantial uncertainty (to be used in parameter uncertainty draws).

Note that the three sources for these test rates have slightly different cohorts and therefore test rate denominators.
These test rates will be applied to simulants with MCI or AD dementia.

.. list-table:: Location-specific test rates
  :widths: 15 15 15
  :header-rows: 1

  * - Location
    - CSF mean % (Confidence)
    - PET mean % (Confidence)
  * - US
    - 10.8 (5.4, 16.1)	
    - 15.0 (7.5, 22.5)
  * - Germany
    - 18.7 (9.4, 28.1)	
    - 16.0 (8.0, 24.0)
  * - Spain
    - 24.6 (12.3, 36.9)	
    - 25.9 (12.9, 38.8)
  * - Sweden
    - 40.5 (20.3, 60.8)	
    - 4.5 (2.3, 6.8)
  * - UK
    - 9.5 (4.7, 14.2)	
    - 10.7 (5.3, 16)
  * - Japan
    - 13.3 (6.7, 20)	
    - 14.9 (7.5, 22.4)
  * - Israel
    - 13.3 (6.7, 20)	
    - 14.9 (7.5, 22.4)
  * - Taiwan
    - 13.3 (6.7, 20)	
    - 14.9 (7.5, 22.4)
  * - Brazil
    - 13.3 (6.7, 20)	
    - 14.9 (7.5, 22.4)
  * - China
    - 4.4 (2.2, 6.6)
    - 6.1 (3, 9.1)


Implementation
^^^^^^^^^^^^^^
Each simulant will be assigned a propensity for receiving a test (0 to 1). 
A low propensity value means the simulant is likely to receive a test, 
while a high propensity value means the simulant is unlikely to receive a test.
The propensity will apply for the simulant's lifetime.

On timestep
'''''''''''
On each timestep, use the following steps to assign CSF and PET tests:

.. _petcsf_requirements:

1. Assess eligibility based on the following requirements:

  - Simulant is in MCI stage or AD dementia stage (though due to lack of age requirement, no simulants should be tested in AD dementia stage - only on MCI incidence)
  - Simulant has never received a CSF or PET test before
  - Simulant has never received a positive BBBM test before

2. If eligible (meets all requirements), check propensity.
   If the propensity value is less than the location-specific testing rate (CSF rate plus PET rate),
   give the test. If not, do not give the test. Do not assign a diagnosis.
3. If the simulant receives a test, assign whether it is a CSF or PET test
   based on location-specific rates, independently of the testing
   propensity and other random choices. More explicitly, given that a
   simulant receives a test, the probability of getting a CSF test
   should be (CSF rate) / (CSF rate + PET rate), and the probability of
   getting a PET test should be (PET rate) / (CSF rate + PET rate).

On initialization
'''''''''''''''''
To avoid large numbers of simulants being tested on the first simulation time step,
we must initialize simulant test history status so that some number of simulants
have already been tested at simulation start. Only simulants who were not eligible 
for testing at simulation start, but become eligible after the first time step,
should be tested at the first time step.

To accomplish this, simulant eligibility should be checked at simulation initialization, 
and simulants who satisfy all eligibility requirements at that time should be marked as having 
previously recieved a CSF/PET test. These simulants will be ineligible for future 
CSF/PET testing.

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- A simulant with an eligible propensity will be tested at the first time step 
  they satisfy the stage and age criteria, and then can never be tested again, 
  so propensity does not need to be re-assigned at any point;
- Assume no testing in pre-clinical state;
- Not used to assign treatment (no diagnosis);
- Eligibility requirements impact the number of tests. The earlier the stage simulants
  are tested in, the more tests will be conducted (eg mild stage compared to MCI). The wider 
  the age range, the more tests will be conducted (eg no age requirements vs 60-80 year olds);
- Assumes no one gets both a CSF and PET test;
- The testing happens quite rapidly, during the first six months of MCI; a future enhancement to this model might include a random chance of testing among those with propensity for getting tested, so that some fraction of testing happens later in the progression of the disease.

.. _alzheimers_testing_intervention_bbbm:

BBBM testing
~~~~~~~~~~~~

BBBM testing is a hypothetical biomarker test which we will model in 
:ref:`Alternative Scenario 1 <alz_scenarios>`. It will replace some CSF/PET testing and 
assign positive/negative diagnosis which will inform treatment in :ref:`Alternative Scenario 2 <alz_scenarios>`.

.. _bbbm_rates:

Time-specific testing rates
^^^^^^^^^^^^^^^^^^^^^^^^^^^
Testing rates do not vary by location, age or sex. 
In 2020, 0% of eligible simulants are tested annually. This becomes
nonzero in 2027, increasing to 10% at year 2030,
then increases linearly for awhile, then levels off and eventually maxes
out at 60% after 2045. We will model this as a piecewise linear function
with knots at the following (year, coverage) values:

* (2020.0, 0%)
* (2027.0, 0%) -- Note that this is 0% at the *beginning* of 2027, but
  coverage will become positive on the second time step that year
* (2030.5, 10%) -- Note that this is 10% at **mid**-year
* (2045.0, 50%)
* (2050.0, 57%)
* (2055.0, 60%)
* (2100.0, 60%)

.. _bbbm_propensity:

Implementation
^^^^^^^^^^^^^^
The simulant's existing testing propensity will also be used as their BBBM testing propensity.


On timestep
'''''''''''
On each timestep, use the following steps to assign BBBM tests:

#. Check eligibility. If simulant is not eligible, they won't get a test.
#. If simulant is eligible, assign them a random test date in the in the
   interval :math:`[t, t+2]`, where :math:`t` is the current time in
   years, and let :math:`t' = \delta \lfloor t / \delta \rceil` be the
   time step nearest to :math:`t`. The simulant will get their test at
   time :math:`t'` if they are eligible at that time.
#. Check if simulant has a test scheduled for this time step. If yes,
   give test and proceed to step X to determine positive or negative. If not go to next step.

.. _bbbm_requirements:

#. Assess eligibility based on the following requirements:

   - Simulant is not in MCI or AD dementia state (only susceptible, or pre-clinical)
   - Simulant age is :math:`\ge 60` and :math:`< 80`
   - Simulant has not received a BBBM test in the last three years (or
     six time steps)
   - Simulant has never received a positive BBBM test

#. If eligible (meets all requirements), check testing propensity. If
   the propensity value is less than the time-specific testing rate, the
   simulant has the opportunity to get tested on this time step (but may
   not be). If not, the simulant won't be tested.
#. If an eligible simulant has the opportunity to be tested on this time
   step (their propensity is less than the testing rate), give them a
   BBBM test with probability :math:`1/(11 - k)`, where :math:`k` is the
   number of time steps since the simulant's last BBBM test (this
   guarantees that time of the next test is uniformly distributed
   between 3 and 5 years since the last test---see explanation below).
   This choice should be independent of other random choices in the
   model.
#. For those who get tested, assign a positive diagnosis to 90% of people and a negative diagnosis to 10% of people. This 90% draw should be independent of any previous draws, e.g., people who test negative still have a 90% chance of being positive on a re-test.
#. Record time of last test and yes/no diagnosis for determining future testing eligibility.

The strategy of giving eligible simulants a test with probability 0.5 on
each time step is to introduce randomness to the time between testing,
rather than having all simulants be retested at a fixed interval of 3
years (which caused oscillations in the number of tests over time). The
probability 0.5 was chosen as a convenient value that will guarantee
that most people will get retested within 5 years (Lilly requested that
tests occur every 3-5 years). Specifically, the probability that a
simulant *doesn't* get retested between 3 and 5 years (i.e., on one of
the 5 time steps at 3, 3.5, 4, 4.5, 5) is :math:`(1-0.5)^5 = 3.125\%`.

On initialization
'''''''''''''''''

In order to avoid having a large fraction of eligible simulants be
tested immediately upon entering the simulation, we will assign a BBBM
testing history to each initialized simulant who is eligible for a BBBM
test. Since simulants are only eligible for testing every three years
(more precisely, every 6 time steps) and are likely to be tested at most
every five years (10 time steps), we will assign a random test date
within the last five years before entering the simulation, as follows.

On initialization of each eligible simulant, choose uniformly at random
from one of the last 10 time steps when they could have been tested. If
the chosen time step occurs before the first date in 2027 when testing
becomes available, assign "not a time" (NaT) for the simulant's previous
test date. Otherwise, the first time the simulant could be eligible for
testing again is 6 time steps after the chosen previous test date. We
assume for simplicity that there were no prior false positive tests
among simulants entering the simulation, so all previous BBBM tests are
negative.

.. note::

  People who are not simulated (will not develop AD dementia) will also
  be tested. We counted these tests, including false positives, outside
  the simulation using a :ref:`multistate life table (MSLT) model
  <other_models_alzheimers_mslt>`.

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Since BBBM testing eligibility is pre-clinical stage and CSF/PET is MCI or AD dementia stage, 
  and simulants cannot move backwards, CSF/PET test history is irrelevant to BBBM 
  test eligibility;
- The same simulants undergo repeat testing to reflect ongoing issues with access or insurance,
  so propensity does not need to be re-assigned at any point;
- Since BBBM uses the same propensity as existing testing, BBBM should replace many CSF and PET
  tests, though some simulants may not qualify for BBBM tests due to age requirements, or may get a BBBM false negative;
- We determine whether a test is a false positive in the MSLT
  independently for healthy individuals, which precludes the possibility
  that individual characteristics like protein expression levels or
  chronic kidney disease drive heterogeneity in false positive rate;
- We assume a false positive rate of zero among people who are simulated
  (will eventually develop AD dementia), which is inconsistent with our
  calculations in the MSLT; if the false positive rate were nonzero,
  some people would have prematurely started treatment before entering
  the simulation;
- The strategy for assigning BBBM test history does not account for the
  fact that simulants may not have been eligible for BBBM testing on all
  of the previous 6 time steps prior to entering the simulation; for
  example, we will assign a previous BBBM test date to a 60-year-old
  entering the simulation after 2030 even though they wouldn't have been
  eligible; the effects of this are likely small because improper
  testing can only happen during the first 3 years of the 20 years of
  eligible ages;
- The strategy of choosing the prior BBBM testing date uniformly over
  the last 3 years is a simplification that doesn't align perfectly with
  our assumption that there will be a cyclical pattern in the number of
  people getting tested each year (with the first peak in 2030 when the
  test first becomes available); the uniformity assumption will likely
  smooth out this cyclical pattern somewhat;


References
----------

.. [Roth-et-al-2023-Diagnostic-Pathways]
  Roth S, Burnie N, Suridjan I, Yan JT, Carboni M. Current Diagnostic Pathways for Alzheimer’s Disease: A Cross-Sectional Real-World Study Across Six Countries. J Alzheimers Dis Rep. 7(1):659-674. doi:10.3233/ADR230007
.. [Mattke-et-al-2024-Sweden-Capacity]
  Mattke S, Gustavsson A, Jacobs L, et al. Estimates of Current Capacity for Diagnosing Alzheimer’s Disease in Sweden and the Need to Expand Specialist Numbers. J Prev Alzheimers Dis. 2024;11(1):155-161. doi:10.14283/jpad.2023.94
.. [Falahati-et-al-2015-SveDem]
  Falahati F, Fereshtehnejad SM, Religa D, Wahlund LO, Westman E, Eriksdotter M. The Use of MRI, CT and Lumbar Puncture in Dementia Diagnostics: Data from the SveDem Registry. Dementia and Geriatric Cognitive Disorders. 2015;39(1-2):81-92. doi:10.1159/000366194
