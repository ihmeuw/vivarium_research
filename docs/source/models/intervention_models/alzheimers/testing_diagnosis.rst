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

Alzheimer's testing is classified into two groups - baseline (CSF and PET) testing, 
and BBBM testing. Baseline testing already exists in present-day conditions, before the 
hypothetical introduction of BBBM testing in :ref:`Alternative Scenario 1 <alz_scenarios>`.
The introduction of BBBM testing will replace some number of the baseline tests in 
Alternative Scenario 1, and will also be used to inform treatment in Alternative 
Scenario 2. 

Vivarium Modeling Strategy
--------------------------

Baseline testing - CSF and PET
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

CSF and PET are existing biomarker tests which can identify cases of Alzheimer's disease.
We model CSF and PET tests in our :ref:`Reference Scenario <alz_scenarios>` in order to
estimate the number of these more expensive, invasive tests which would be replaced
by the introduction of BBBM tests in :ref:`Alternative Scenario 1 <alz_scenarios>`.

Location-specific testing rates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
US testing rates among patients who are diagnosed with MCI or dementia are given 
in Figure 3 `here <https://pmc.ncbi.nlm.nih.gov/articles/PMC12321507/>`_ (overall cohort).

We adjust these US CSF and PET testing rates upwards (2x) due to subsequent 
increases in coverage by Medicare, and add substantial uncertainty (-50% for the lower 
bound and +50% for the upper bound).

To reach CSF and PET testing rates for other countries, we adjust the (increased) US test rates based on 
per capita `Alzheimer's pharmaceutical spending <https://brainhealthatlas.org/data/economic-impact/bar>`_.
For example, a country spending 10% of the US would have CSF and PET testing rates equal to 
10% of the US.

Due to a 
`high perentage of CSF testing <https://www.sciencedirect.com/science/article/pii/S2274580724001195?via%3Dihub#bib22>`_
in Sweden, we further adjust Sweden's CSF rate to be 9x its PET rate from the previous step.

We use these location-specific test rates to determine how likely a simulant with 
MCI is to receieve a CSF or PET test, and which test they should receive.

.. todo::

  Distribution for draws with test rate upper/lower bounds?

Implementation
^^^^^^^^^^^^^^
Each simulant will be assigned a propensity (0 to 1) for receiving a test. The propensity will apply for the 
simulant's lifetime.

On each timestep, use the following steps to assign CSF and PET tests:

1. Assess eligibility based on the following requirements:

  - Simulant is in MCI stage
  - Simulant age is >=60 and <80
  - Simulant has never recieved a CSF or PET test before
  - Simulant has never recieved a positive BBBM test before
  - Propensity is higher than location-specific testing rate

2. If eligible (meets all requirements), give test. If not, do not give test. Do not assign a diagnosis.
3. Assign if it was a CSF or PET test based on location-specific rates.

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Uses same age limits as BBBM testing due to similar assumptions that tests
  are not useful at the younger/older ages 
- A simulant with an eligible propensity will be tested at the first time step 
  they satisfy the MCI and age criteria, and then can never be tested again, 
  so propensity does not need to be re-assigned at any point
- Assume no testing in pre-clinical or AD dementia states
- Not used to assign treatment (no diagnosis)

Initialization of test history
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To avoid large numbers of simulants being tested on the first simulation time step,
we must initialize simulant test history status so that some number of simulants
have already been tested at simulation start. Only simulants who were not eligible 
for testing at simulation start, but become eligible after the first time step,
should be tested at the first time step.

To accomplish this, simulant eligibility should be checked at simulation initialization, 
and simulants who satisfy all eligibility requirements at that time should be marked as having 
previously recieved a CSF/PET test. These simulants will be ineligible for future 
CSF/PET testing.

BBBM testing
~~~~~~~~~~~~

BBBM testing is a hypothetical biomarker test which we will model in 
:ref:`Alternative Scenario 1 <alz_scenarios>`. It will replace some CSF/PET testing and 
assign positive/negative diagnosis which will inform treatment in :ref:`Alternative Scenario 2 <alz_scenarios>`.

Year-specific testing rates
^^^^^^^^^^^^^^^^^^^^^^^^^^^
Testing rates do not vary by location, age or sex. 
In 2020, 0% of eligible simulants are tested annually. This increases to 10% in 2030, 
then increases linearly over time in each six-month period to reach 20% in 2035, to 40% in 2040 
and then maxes out at 60% in 2045. 


Implementation
^^^^^^^^^^^^^^
The simulant's baseline testing propensity will also be used as their BBBM testing propensity.

On each timestep, use the following steps to assign CSF and PET tests:

1. Assess eligibility based on the following requirements:

  - Simulant is in pre-clinical stage
  - Simulant age is >=60 and <80
  - Simulant has not received a BBBM test in the last three years
  - Simulant has never recieved a positive BBBM test
  - Propensity is higher than year-specific testing rate

2. If eligible (meets all requirements), give test. If not, do not give test.
3. If given test, assign positive diagnosis to 90% of people and negative diagnosis to 10% of people. This 90% draw should be independent of any previous draws, eg people who test negative still have a 90% chance of being positive on a re-test.
4. Record time of last test, yes/no diagnosis for future testing eligibility.

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Since BBBM testing eligibility is pre-clinical stage and CSF/PET is MCI stage, 
  and simulants cannot move backwards, CSF/PET test history is irrelevant to BBBM 
  test elibibility 
- The same simulants undergo repeat testing to reflect ongoing issues with access or insurance,
  so propensity does not need to be re-assigned at any point.
- Since BBBM uses the same propensity as baseline testing, BBBM should mostly replace CSF and PET
  testing, though some simulants may reach age 60 in the MCI stage, or get a BBBM false negative.

.. todo::
  People who are not simulated (will not develop AD dementia) will also be tested, and these tests,
  including false positives, will need to be counted (outside the simulation).

Initialization of test history
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
On initialization no one will have been tested. Due to test coverage jumping from 0% to 10% in 2030,
we would expect a large group to be immediately tested and then a drop-off in testing counts.

Observer
~~~~~~~~
Need an observer with test counts by location, age, sex, year, and diagnosis provided 

Validation and Verification Criteria
------------------------------------

.. todo::
  How should we V&V this?
    - Diagnosis rate of 90%
    - Number of tests in each year – but this is more complicated? 
    - Should this happen in an interactive sim? 

      - Could look at individual eligibility more closely and see that the right people get tested 
