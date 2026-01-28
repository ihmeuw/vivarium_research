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
* (2055.0, 60%)
* (2100.0, 60%)

.. _bbbm_requirements:

Eligibility for BBBM testing
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
A simulant is eligible for a BBBM test if they meet the following
requirements:

- Simulant is not in MCI or AD dementia state (they can only be in
  susceptible or preclinical)
- Simulant age is :math:`\ge 60` and :math:`< 80`
- Simulant has not received a BBBM test in the last three years (more
  precisely, they have not had a BBBM test on any of the previous five
  time steps)
- Simulant has never received a positive BBBM test

.. _bbbm_propensity:

Implementation
^^^^^^^^^^^^^^
The simulant's existing CSF/PET testing propensity will also be used as
their BBBM testing propensity. At the client's request, we will retest
simulants every 3-5 years, rather than having all simulants be retested
at a fixed interval of 3 years (which can cause unrealistic oscillations
in the number of tests over time). In the implementation below, we
choose the next test date uniformly in the interval :math:`[3, 5]`
years.

On initialization
'''''''''''''''''
In order to avoid having an unreasonably large fraction of eligible
simulants be tested immediately upon entering the simulation, we will
assign a BBBM testing history to each initialized simulant who would
have an opportunity for BBBM testing on their first time step. Since
simulants are only eligible for testing every three years (more
precisely, every 6 time steps) and must be retested at most every five
years (10 time steps), we will assign a random test date within the last
five years before entering the simulation, as follows.

On initialization of each simulant, check whether (1) the simulant meets
the :ref:`eligibility requirements for BBBM testing
<bbbm_requirements>`, and (2) their testing propensity is less than the
current BBBM testing rate. If both conditions are met, assign a previous
BBBM test date uniformly at random from one of the last 10 time steps
before they entered the simulation. If either (a) the chosen time step
occurs before the first date in 2027 when testing becomes available, or
(b) the simulant fails either the eligibility requirement or the
propensity requirement, assign "not a time" (NaT) for the simulant's
previous BBBM test date.

We assume for simplicity that there were no prior false positive tests
among simulants entering the simulation, so all previous BBBM tests are
negative. For simulants who are assigned a previous test date, the first
time they could become eligible for testing again is 6 time steps after
the chosen previous test date.

On timestep
'''''''''''
On each timestep, use the following steps to assign BBBM tests:

#. Assess eligibility based on the :ref:`eligibility requirements for
   BBBM testing <bbbm_requirements>`.
#. If eligible (meets all requirements), check testing propensity. If
   the propensity value is less than the time-specific testing rate, the
   simulant has the opportunity to get tested on this time step (but may
   not be). If not, the simulant won't be tested.
#. If an eligible simulant has the opportunity to be tested on this time
   step (their propensity is less than the testing rate), check whether
   they have a previous test date recorded. If so, give them a BBBM test
   with probability :math:`1/(11 - k)`, where :math:`k` is the number of
   time steps since the simulant's last BBBM test (this guarantees that
   time of the next test is uniformly distributed between 3 and 5 years
   since the last test---see explanation below). This choice should be
   independent of other random choices in the model. If the simulant's
   previous test date is NaT, this is the first time the simulant has
   the opportunity to get tested; in this case, test them immediately.
#. For those who get tested, assign a positive diagnosis to 90% of people and a negative diagnosis to 10% of people. This 90% draw should be independent of any previous draws, e.g., people who test negative still have a 90% chance of being positive on a re-test.
#. Record time of last test and yes/no diagnosis for determining future testing eligibility.

.. Alternate, equivalent strategy avoiding "fake previous tests":

.. On initialization: For each simulant who is eligible and has a
.. propensity below the current testing threshold, assign a previous test
.. date uniformly in the 5 years prior to entering the sim, then assign
.. them a future test date uniformly 3-5 years from their previous test
.. date. Assign NaT for both the previous and future dates if (a) the
.. simulant is ineligible, or (b) their propensity is too high, or (c) the
.. selected prior test date is before testing starts in 2027.

.. On timestep:

.. #. Assess eligibility.
.. #. If eligible, check propensity. If propensity is too large, stop.
.. #. If eligible and propensity is low enough, check whether simulant has
..    a future test date assigned. If not, this is the simulant's first
..    opportunity for testing; test them immediately. If the simulant does
..    have a future test date assigned, check whether the simulant's future
..    test date corresponds to this time step. If yes, give the test; if
..    not, don't.
.. #. Assign a positive diagnosis to 90% of tests and a negative diagnosis
..    to 10% of tests.
.. #. Record time of last test and yes/no diagnosis.
.. #. For those who got a negative test, reassign their future test date
..    uniformly 3-5 years in the future.


The above formula :math:`1/(11 - k)` results in a uniformly distributed population
between 6 and 10 time steps, or 3 to 5 years. To conceptualize
why this works, please see the table below outlining the time step value :math:`k`,
the resulting probability of testing and how a hypothetical population of
100 simulants is distributed over the time steps.

.. list-table:: Simulation Components
  :header-rows: 1

  * - Time Step :math:`k`
    - Testing Probability
    - People Tested
    - Remaining Untested Population
  * - 0-5
    - 0% (ineligible)
    - 100 * 0% = 0
    - 100 - 0 = 100
  * - 6
    - 1/(11-6) = 20%
    - 100 * 20% = 20
    - 100 - 20 = 80
  * - 7
    - 1/(11-7) = 25%
    - 80 * 25% = 20
    - 80 - 20 = 60
  * - 8
    - 1/(11-8) = 33%
    - 60 * 33% = 20
    - 60 - 20 = 40
  * - 9
    - 1/(11-9) = 50%
    - 40 * 50% = 20
    - 40 - 20 = 20
  * - 10
    - 1/(11-10) = 100%
    - 20 * 100% = 20
    - 20 - 20 = 0


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
  of the previous 10 time steps prior to entering the simulation; for
  example, we will assign a previous BBBM test date to a 60-year-old
  entering the simulation in, say, 2035 even though they wouldn't have
  been eligible; the effects of this are hopefully small because
  improper testing can only happen during the first 5 years of the 20
  years of eligible ages;



References
----------

.. [Roth-et-al-2023-Diagnostic-Pathways]
  Roth S, Burnie N, Suridjan I, Yan JT, Carboni M. Current Diagnostic Pathways for Alzheimer’s Disease: A Cross-Sectional Real-World Study Across Six Countries. J Alzheimers Dis Rep. 7(1):659-674. doi:10.3233/ADR230007
.. [Mattke-et-al-2024-Sweden-Capacity]
  Mattke S, Gustavsson A, Jacobs L, et al. Estimates of Current Capacity for Diagnosing Alzheimer’s Disease in Sweden and the Need to Expand Specialist Numbers. J Prev Alzheimers Dis. 2024;11(1):155-161. doi:10.14283/jpad.2023.94
.. [Falahati-et-al-2015-SveDem]
  Falahati F, Fereshtehnejad SM, Religa D, Wahlund LO, Westman E, Eriksdotter M. The Use of MRI, CT and Lumbar Puncture in Dementia Diagnostics: Data from the SveDem Registry. Dementia and Geriatric Cognitive Disorders. 2015;39(1-2):81-92. doi:10.1159/000366194
