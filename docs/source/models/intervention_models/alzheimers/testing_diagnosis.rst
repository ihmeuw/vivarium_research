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
CSF and PET testing rates in the US, Germany, Spain, the UK and China are given by [Roth-et-al-2023-Diagnostic-Pathways]_.
The paper surveys health care providers about patients presenting with cognitive complains.

Swedish CSF testing rate is from [Mattke-et-al-2024-Sweden-Capacity]_, and PET comes from that value and the relative CSF vs PET test proportion (90% CSF, 10% PET)
given by [Falahati-et-al-2015-SveDem]_. 

For Japan, Israel, Taiwan and Brazil, because we have not yet found CSF and PET testing rates for these locations,
we use the total CSF and PET testing rates across all countries from [Roth-et-al-2023-Diagnostic-Pathways]_. 

After choosing these mean values, we subract 50% for a lower confidence bound and add 50% for an upper confidence bound to reflect substantial uncertainty.


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
A low propensity value means the simulant is likely to receieve a test, 
while a high propensity value means the simulant is unlikely to receive a test.
The propensity will apply for the simulant's lifetime.

On timestep
'''''''''''
On each timestep, use the following steps to assign CSF and PET tests:

1. Assess eligibility based on the following requirements:

  - Simulant is in MCI stage or AD dementia stage
  - Simulant has never recieved a CSF or PET test before
  - Simulant has never recieved a positive BBBM test before
  - Propensity value is lower (likely test recipient) than the location-specific testing rate, which is equal to CSF rate plus PET rate

2. If eligible (meets all requirements), give test. If not, do not give test. Do not assign a diagnosis.
3. Assign if it was a CSF or PET test based on location-specific rates. If propensity value is lower than CSF testing rate: give a CSF test. Otherwise, propensity value must be higher than CSF testing rate but lower than CSF + PET rate: give a PET test.

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
  so propensity does not need to be re-assigned at any point
- Assume no testing in pre-clinical state
- Not used to assign treatment (no diagnosis)
- Eligibility requirements impact the number of tests. The earlier the stage simulants
  are tested in, the more tests will be conducted (eg mild stage compared to MCI). The wider 
  the age range, the more tests will be conducted (eg no age requirements vs 60-80 year olds). 

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
On each timestep, use the following steps to assign BBBM tests:

1. Assess eligibility based on the following requirements:

  - Simulant is in pre-clinical stage
  - Simulant age is >=60 and <80
  - Simulant has not received a BBBM test in the last three years
  - Simulant has never received a positive BBBM test
  - Propensity is lower than year-specific testing rate

2. If eligible (meets all requirements), give test. If not, do not give test.
3. If given test, assign positive diagnosis to 90% of people and negative diagnosis to 10% of people. This 90% draw should be independent of any previous draws, eg people who test negative still have a 90% chance of being positive on a re-test.
4. Record time of last test, yes/no diagnosis for future testing eligibility.

On initialization
'''''''''''''''''
On initialization no one will have been tested. Due to test coverage jumping from 0% to 10% in 2030,
we would expect a large group to be immediately tested and then a drop-off in testing counts.

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Since BBBM testing eligibility is pre-clinical stage and CSF/PET is MCI or AD dementia stage, 
  and simulants cannot move backwards, CSF/PET test history is irrelevant to BBBM 
  test eligibility  
- The same simulants undergo repeat testing to reflect ongoing issues with access or insurance,
  so propensity does not need to be re-assigned at any point.
- Since BBBM uses the same propensity as baseline testing, BBBM should replace many CSF and PET
  tests, though some simulants may not qualify for BBBM tests due to age requirements, or may get a BBBM false negative.

.. note::
  People who are not simulated (will not develop AD dementia) will also be tested, and these tests,
  including false positives, will need to be counted (outside the simulation).


References
----------

.. [Roth-et-al-2023-Diagnostic-Pathways]
  Roth S, Burnie N, Suridjan I, Yan JT, Carboni M. Current Diagnostic Pathways for Alzheimer’s Disease: A Cross-Sectional Real-World Study Across Six Countries. J Alzheimers Dis Rep. 7(1):659-674. doi:10.3233/ADR230007
.. [Mattke-et-al-2024-Sweden-Capacity]
  Mattke S, Gustavsson A, Jacobs L, et al. Estimates of Current Capacity for Diagnosing Alzheimer’s Disease in Sweden and the Need to Expand Specialist Numbers. J Prev Alzheimers Dis. 2024;11(1):155-161. doi:10.14283/jpad.2023.94
.. [Falahati-et-al-2015-SveDem]
  Falahati F, Fereshtehnejad SM, Religa D, Wahlund LO, Westman E, Eriksdotter M. The Use of MRI, CT and Lumbar Puncture in Dementia Diagnostics: Data from the SveDem Registry. Dementia and Geriatric Cognitive Disorders. 2015;39(1-2):81-92. doi:10.1159/000366194
