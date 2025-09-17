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
in Figure 3 in [Yan-et-al-2025-Medicare-Diagnostics]_ (overall cohort).

We adjust these US CSF and PET testing rates upwards (2x) due to subsequent 
increases in coverage by Medicare, and add substantial uncertainty (-50% for the lower 
bound and +50% for the upper bound) to create a 95% confidence interval.

To reach CSF and PET testing rates for other countries, we adjust the (increased) US test rates based on 
per capita Alzheimer's pharmaceutical spending from [Brain-Health-Atlas]_.
For example, a country spending 10% of the US would have CSF and PET testing rates equal to 
10% of the US.

Due to a high perentage of CSF testing in Sweden [Mattke-et-al-2024-Sweden-Capacity]_, 
we further adjust Sweden's CSF rate to be 9x its PET rate from the previous step.

We use these location-specific test rates to determine how likely a simulant with 
MCI is to receieve a CSF or PET test, and which test they should receive.

.. list-table:: Location-specific test rates
  :widths: 15 15 15
  :header-rows: 1

  * - Location
    - CSF mean % (Confidence)
    - PET mean % (Confidence)
  * - US
    - 4.4 (2.2, 6.6)
    - 1.4 (.70, 2.1)
  * - Germany
    - 2.8 (1.4, 4.2)
    - .89 (.44, 1.3)
  * - Spain
    - 1.4 (.70, 2.1)
    - .45 (.22, .67)
  * - Sweden
    - 3.8 (1.9, 5.7)
    - .42 (.21, .63)
  * - UK
    - 1.3 (.65, 2.0)
    - .41 (.21, .62)
  * - Japan
    - 1.3 (.65, 1.9)
    - .41 (.21, .62)
  * - Israel
    - .43 (.21, .64)
    - .14 (.07, .20)
  * - Taiwan
    - .42 (.21, .63)
    - .13 (.07, .20)
  * - Brazil
    - .12 (.06, .18)
    - .04 (.02, .06)
  * - China
    - .08 (.04, .12)
    - .02 (.01, .04)

Implementation
^^^^^^^^^^^^^^
Each simulant will be assigned a propensity (0/high to 1/low) for receiving a test. The propensity will apply for the 
simulant's lifetime.

On timestep
'''''''''''
On each timestep, use the following steps to assign CSF and PET tests:

1. Assess eligibility based on the following requirements:

  - Simulant is in MCI stage
  - Simulant age is >=60 and <80
  - Simulant has never recieved a CSF or PET test before
  - Simulant has never recieved a positive BBBM test before
  - Propensity is higher than location-specific testing rate (CSF rate plus PET rate)

2. If eligible (meets all requirements), give test. If not, do not give test. Do not assign a diagnosis.
3. Assign if it was a CSF or PET test based on location-specific rates. If propensity is higher than CSF testing rate: give a CSF test. Otherwise, propensity must be lower than CSF testing rate but higher than CSF + PET rate: give a PET test.

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
- Uses same age limits as BBBM testing due to similar assumptions that tests
  are not useful at the younger/older ages 
- A simulant with an eligible propensity will be tested at the first time step 
  they satisfy the MCI and age criteria, and then can never be tested again, 
  so propensity does not need to be re-assigned at any point
- Assume no testing in pre-clinical or AD dementia states
- Not used to assign treatment (no diagnosis)
- Eligibility requirements impact the number of tests. The earlier the stage simulants
  are tested in, the more tests will be conducted (eg MCI vs mild stage). The wider 
  the age range, the more tests will be conducted. 

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


On timestep
'''''''''''
On each timestep, use the following steps to assign CSF and PET tests:

1. Assess eligibility based on the following requirements:

  - Simulant is in pre-clinical stage
  - Simulant age is >=60 and <80
  - Simulant has not received a BBBM test in the last three years
  - Simulant has never received a positive BBBM test
  - Propensity is higher than year-specific testing rate

2. If eligible (meets all requirements), give test. If not, do not give test.
3. If given test, assign positive diagnosis to 90% of people and negative diagnosis to 10% of people. This 90% draw should be independent of any previous draws, eg people who test negative still have a 90% chance of being positive on a re-test.
4. Record time of last test, yes/no diagnosis for future testing eligibility.

On initialization
'''''''''''''''''
On initialization no one will have been tested. Due to test coverage jumping from 0% to 10% in 2030,
we would expect a large group to be immediately tested and then a drop-off in testing counts.

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Since BBBM testing eligibility is pre-clinical stage and CSF/PET is MCI stage, 
  and simulants cannot move backwards, CSF/PET test history is irrelevant to BBBM 
  test eligibility  
- The same simulants undergo repeat testing to reflect ongoing issues with access or insurance,
  so propensity does not need to be re-assigned at any point.
- Since BBBM uses the same propensity as baseline testing, BBBM should mostly replace CSF and PET
  testing, though some simulants may reach age 60 in the MCI stage, or get a BBBM false negative.

.. todo::
  People who are not simulated (will not develop AD dementia) will also be tested, and these tests,
  including false positives, will need to be counted (outside the simulation).


References
----------

.. [Brain-Health-Atlas]
  Brain Health Atlas. Accessed September 17, 2025. https://brainhealthatlas.org/data/economic-impact/bar
.. [Mattke-et-al-2024-Sweden-Capacity]
  Mattke S, Gustavsson A, Jacobs L, et al. Estimates of Current Capacity for Diagnosing Alzheimer’s Disease in Sweden and the Need to Expand Specialist Numbers. The Journal of Prevention of Alzheimer’s Disease. 2024;11(1):155-161. doi:10.14283/jpad.2023.94
.. [Yan-et-al-2025-Medicare-Diagnostics]
  Yan JT, Dillon A, Meng T, et al. Real‐world use of diagnostic tests for mild cognitive impairment, Alzheimer’s disease, and other dementias in Medicare fee‐for‐service beneficiaries. Alzheimers Dement (Amst). 2025;17(3):e70156. doi:10.1002/dad2.70156
