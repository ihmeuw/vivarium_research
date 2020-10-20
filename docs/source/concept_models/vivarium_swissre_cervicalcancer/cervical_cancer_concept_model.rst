.. role:: underline
    :class: underline


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


.. _cervical_cancer_concept_model:

=======================================
Vivarium CSU Cervical Cancer Simulation
=======================================

.. contents::
  :local:

.. list-table:: List of abbreviations
   :header-rows: 1

   * - Label
     - Definition
   * - S
     - susceptible
   * - hrHPV
     - high-risk HPV
   * - S_hrHPV
     - without high-risk HPV infection
   * - C_hrHPV
     - with high-risk HPV infection
   * - BCC
     - benign cervical cancer
   * - ICC
     - invasive cervical cancer
   * - R
     - recovered
   * - Tx
     - treatment
   * - CI claim
     - critical illness claim
   * - ACMR
     - all-cause mortality rate
   * - prev_c432
     - prevalence of cervical cancer
   * - incidence_c432
     - incidence of cervical cancer
   * - csmr_c432
     - cause-specific mortality rate of cervical cancer
see :ref:`full disease state definition<2017_cancer_model_cervical_cancer>`

.. _1.0:

1.0 Background
++++++++++++++

.. _1.1:

1.1 Project overview
--------------------
This project will generate forecasts of cervical cancer mortality and morbidity 
to allow Swiss Re to identify trends that are important to its business 
decision-making. IHME will produce both a baseline (business as usual) forecast, 
and an alternative scenario forecast in which key cervical cancer screening 
practice and HPV vaccination are implemented in a simulation framework. Baseline 
forecasts will incorporate expected trends in relevant risk factors. Alternative 
scenario forecasts will incorporate baseline forecasts and the expected impact of 
new screening technologies and vaccination. All forecasts will represent the Swiss 
Re’s insured population from the weighted blend of Chinese provinces. Forecasts 
run from year 2020 to 2040.

.. _1.2:

1.2 Literature review
---------------------

.. todo::

 add more literature background


.. _2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++
IHME will estimate the yearly number of cases of benign and invasive cervical 
cancer detected under specific cervical cancer screening practices and the yearly 
number of deaths from undetected cervical cancer (both in unit of per 100,000 
insured person-years) in order to identify pay-out trends for cervical cancer 
claims.


.. _3.0:

3.0 Causal framework
++++++++++++++++++++

.. _3.1:

3.1 Causal variables
--------------------
 
Outcome
 - Cervical cancer detection (benign and invasive)
 - Mortality and morbidity of cervical cancer
Most proximal determinant/exposure
 - Cervical cancer status
 - Cervical cancer screening
 - HPV infection
 - HPV vaccination status
Confounders
 - age
 - sex
Effect modifiers
 - N/A
Mediators
 - N/A


.. _4.0:

4.0 Intervention
++++++++++++++++
There is an urgent need to implement the evidenced-based interventions (e.g. HPV 
vaccination, cervical cancer screening, management of detected disease) for eliminating cervical cancer as a public health problem, such action must be 
strategic in nature. [WHO cervical cancer elimination strategy]_

Based on SwissRe's interest, our simulation intervention combined the cervical 
cancer screening and HPV vaccination to evaluate the cervical cancer detection 
in following scenarios:
 - Baseline (status quo scenario): keep HPV vaccination and cervical cancer 
   screening coverage constant over time among insured female.
 - Alternative (expected future scenario): scale-up of both cervical cancer 
   screening and HPV vaccination over time among insured female.

.. _4.1:

4.1 Simulation scenarios
------------------------
**Baseline:** by 2040, project existing level of cervical cancer screening for 
insured female aged 21 to 65 years and HPV vaccination for insured female aged 
15 to 45 years.

**Alternative scenario:** by 2030, linear ramp up cervical cancer screening to 
cover 50% of the insured female aged 21 to 65 years and HPV vaccination to cover 
40% of the insured female aged 15 to 45 years. Both of the HPV vaccination and 
cervical cancer screening coverage remain constant in 2030 to 2040.

.. image:: cervical_cancer_scale_up.png

.. list-table:: Intervention scale-up
   :header-rows: 1

   * - Scenario
     - Intervention
     - Year
     - Coverage
   * - Baseline
     - Cervical cancer screening
     - 2020-2040
     - 25%
   * - Baseline
     - HPV vaccination
     - 2020-2040
     - 10%
   * - Alternative
     - Cervical cancer screening
     - 2020-2030
     - Stay 25% in 2020-2021, then linearly ramp up from 25% to 50% in 2021-2030.
   * - Alternative
     - Cervical cancer screening
     - 2030-2040
     - 50%
   * - Alternative
     - HPV vaccination
     - 2020-2030
     - Stay 10% in 2020-2021, then linearly ramp up from 10% to 40% in 2021-2030.
   * - Alternative
     - HPV vaccination
     - 2030-2040
     - 40%

.. note::

 - Wang et al. reported a current cervical cancer screening coverage of 20.7% 
   with 95%CI 18.6-22.8 in China. We set it as 25% as we believe insured population has higher screening coverage than general population. 
 - No data has identified for current HPV vaccination rates in China. Temporarily 
   we will use 10%.
 - The target HPV vaccination and cervical cancer screening coverage in 2030 are 
   guided by IHME and SwissRe's assumption for Chinese insured female.


.. _5.0:

5.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _5.1:

5.1 Vivarium concept model 
--------------------------

.. image:: cervical_cancer_concept_model_diagram.svg

.. _5.2:

5.2 Demographics
----------------

.. _5.2.1:

5.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 - Cohort type: Closed cohort of 200,000 insured female (100%) simulants.
 - Age and sex: Age 15 to 95+, 5 year-age bands, uniformly distributed age and 
   sex structure.
 - Time span: Jan 1, 2020 to Dec 31, 2040 with 36.5-day time-steps.
 - Location: blended with province-specific weight in China.

.. _5.2.2:

5.2.2 Location description
~~~~~~~~~~~~~~~~~~~~~~~~~~
Provinces to model include Tianjin, Jiangsu, Guangdong, Henan, and Heilongjiang. 
The uniform distribution of age and sex structure will be used among the different 
provinces.

.. list-table:: location weight table
   :header-rows: 1

   * - Province
     - location id
     - Weight
     - Weighted ACMR (per 100,000 person-years)
     - Weighted prev_c432 (proportion)
     - Weighted incidence_c432 (cases per 100,000 person-years)
     - Weighted csmr_c432 (per 100,000 person-years)
   * - Tianjin
     - 517
     - 18%
     - e^(ACMR) * 100,000 * 18%
     - prev_c432 * 18%
     - incidence_c432 * 100,000 * 18%
     - csmr_c432 * 100,000 * 18%
   * - Jiangsu
     - 506
     - 28%
     - e^(ACMR) * 100,000 * 28%
     - prev_c432 * 28%
     - incidence_c432 * 100,000 * 28%
     - csmr_c432 * 100,000 * 28%
   * - Guangdong
     - 496
     - 22%
     - e^(ACMR) * 100,000 * 22%
     - prev_c432 * 22%
     - incidence_c432 * 100,000 * 22%
     - csmr_c432 * 100,000 * 22%
   * - Henan
     - 502
     - 16%
     - e^(ACMR) * 100,000 * 16%
     - prev_c432 * 16%
     - incidence_c432 * 100,000 * 16%
     - csmr_c432 * 100,000 * 16%
   * - Heilongjiang
     - 501
     - 16%
     - e^(ACMR) * 100,000 * 16%
     - prev_c432 * 16%
     - incidence_c432 * 100,000 * 16%
     - csmr_c432 * 100,000 * 16%

.. note::

 Forecast data were temporarily saved to /ihme/costeffectiveness/vivarium_csu_cancer/{measure_name}_scaled_logit_no_bounds_max_6_1000_year_fix_lik.nc

 - ACMR: Using transformed data from breast cancer model
 - prev_c432: 432_ets_prevalence
 - incidence_c432: 432_ets_incidence
 - csmr_432: 432_ets_deaths
 
 Zach is working on updating forecast data to GBD 2019, so expect these filenames 
 to change soon. 

.. _5.3:

5.3 Models
----------

.. _5.3.1:

5.3.1 Core cervical cancer model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

see :ref:`cervical cancer cause model<2017_cancer_model_cervical_cancer>`

.. _5.3.2:

5.3.2 Screening and detection model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

:underline:`I. Screening algorithm`

Cervical cancer screening algorithm was determined by three variables 
 1) Sex
 2) Age 
 3) Diagnosis of HPV infection

.. image:: cervical_screening_branches.svg 

.. list-table:: Screening branches
   :header-rows: 1

   * - Branch
     - Sex
     - Age
     - Screening technology
     - Screening frequency
     - Test result
     - Follow-up test
     - Follow-up frequency
   * - A
     - Female
     - 21-29
     - Cytology
     - in 3 years
     - Cytology positive
     - Cytology
     - in 1 year
   * - A
     - Female
     - 21-29
     - Cytology
     - in 3 years
     - Cytology negative
     - Cytology
     - in 3 years
   * - B
     - Female
     - 30-65
     - Cytology plus HPV test
     - in 5 years
     - HPV negative, Cytology negative
     - Cytology plus HPV test
     - in 5 years
   * - B
     - Female
     - 30-65
     - Cytology plus HPV test
     - in 5 years
     - HPV positive, Cytology negative
     - Cytology plus HPV test
     - in 1 year
   * - B
     - Female
     - 30-65
     - Cytology plus HPV test
     - in 5 years
     - HPV negative, Cytology positive
     - Cytology
     - in 1 year
   * - B
     - Female
     - 30-65
     - Cytology plus HPV test
     - in 5 years
     - HPV positive, Cytology positive
     - Cytology
     - in 1 year
   * - C
     - Female
     - <21 or >65
     - No screening
     - 
     - 
     - 
     - 

.. list-table:: Screening sensitivity and specificity
   :header-rows: 1

   * - Screening technology
     - Sensitivity
     - Specificity
   * - Cytology plus HPV test
     - HPV+: 76.7%
     - HPV-: TBD
   * - Cytology plus HPV test
     - Cytology+: 59.1%
     - Cytology-: 100%
   * - Cytology
     - 65.9% (95% CI 54.9 to 75.3)
     - 100%

.. note::
 
 - Co-test (cytology plus HPV test) is not recommended for women under 30 
   according to guidelines from American Cancer Society and U.S. Preventive Services Task Force.
 - We are not testing HPV for women under 30 and those follow-up with
   cytology alone in one year at Branch B.
 - Women who have been vaccinated or detected BCC and treated should continue 
   to be screened.

In initialization, We assume that
 - No one has prior knowledge of their disease status (and HPV status) on day one 
   of the simulation.
 - All simulants are buying insurance on day one of the simulation.
 - For simulants in cervical cancer (CC) state regardless of detection, they have 
   a transition rate of 0.1 (per person-year) of moving into a recovered (R) state; this results in an average duration in state CC of 10 years. People in state CC and R follow exactly the same screening algorithm, namely branch A, B, or C depending on their age. Simulants do not ever make a second cervical cancer claim, therefore the negative screening results were expected for those in R state in order to avoid double counting the CI claim from detected cervical cancer.

:underline:`II. Screening schedule and attendance`

Probability of attending screening
 - Generate 1000 draws from normal distribution with mean=0.25, SD=0.0025 for
   calculating the probability of simulants attending their first due screening.
 - If a simulant attended their last screening, they have 1.89 with 95%CI 1.06-2.49
   (Yan et al. 2017) more odds of attending the next screening than those who did
   not attend their last screening. 

Time to next scheduled screening

.. list-table:: Screening waiting time distribution (days)
   :header-rows: 1

   * - Screening method
     - Distribution
     - Mean
     - Standard deviation
     - Lower limit
     - Upper limit
   * - Cytology in 3 years
     - Normal distribution
     - 1185
     - 72
     - 
     - 
   * - Cytology plus HPV test in 5 years
     - Normal distribution
     - 1975
     - 72
     - 
     - 
   * - Annual cytology
     - Truncated normal distribution
     - 395
     - 72
     - 180
     - 1800

:underline:`III. Screening initialization`

The date of the first screening appointment (T_appt) for females at age between 
21 and 65 is determined as follows. We assume that each simulant had a previous 
appointment scheduled at some point before the simulation begins. We calculate 
the time between that past appointment and their next appointment (delta_T) using 
the methodology outlined in Section 5.3.2.II (Time to next scheduled screening). 
With a uniform distribution we randomly determine how far along that time interval 
between appointments each individual is (X) at the beginning of the simulation (
T_0). For females under 21 when the simulation begins the methodology is identical, 
except T_0 is the simulant's 21th birthday rather than the beginning of the 
simulation. No screening appointment will be initialized for females above 65.

.. image:: cervical_cancer_screening_event_time.svg

:underline:`IV. Simulant screening trajectory`

Screening events for women aged 21-29 years

.. image:: screening_events_among_female_age_21_to_29.png

Screening events for women aged 30-65 years

.. image:: screening_events_among_female_age_30_to_65.png

.. _5.3.3:

5.3.3 HPV model
~~~~~~~~~~~~~~~

Human Papilloma Virus (HPV)
 - prevalence: TBD
 - Incidence: TBD
 - remission: TBD
 - exposure distirbution: dichotomous
 - relative risk of HPV 16/18 causing BCC: RR = 16.2 with 95%CI 9.6 to 27.3 
   (Chen et al. 2011)

relevant formulas 
 (1) PAF = :math:`\frac{\text{Prev_HPV}(RR-1)}{\text{Prev_HPV}(RR-1)+1}`
 (2) :math:`\text{i_HPV+} =  i \times (1-PAF) \times RR`
 (3) :math:`\text{i_HPV-} =  i \times (1-PAF)`
  
.. todo::
 
  1. add HPV vaccine efficacy section
  2. compare and combine subtypes 16 and 18

.. _5.3.4:

5.3.4 Treatment model
~~~~~~~~~~~~~~~~~~~~~
Treatment for benign cervical cancer

.. todo::

 add more details

.. _5.4:

5.4 Input data sources
----------------------

.. list-table:: Model inputs
   :header-rows: 1

   * - Input parameter
     - Value
     - Source
     - Note
   * - Duration from BCC to CC
     - 14.5 years
     - Chen et al. 2011
     - Globally, the duration ranged from 5-15 years
   * - Initial cervical cancer screening coverage
     - 25%
     - Wang et al. 2015
     - It's an arbitrary number greater than 20.7%.
   * - Target cervical cancer screening coverage in 2030
     - 50%
     - 
     - by assumption
   * - Initial HPV vaccination coverage
     - 10%
     - 
     - The current HPV vaccination rates remain low in China, no data has
       identified.
   * - Target HPV vaccination coverage in 2030
     - 40%
     - 
     - by assumption
   * - Screening sensitivity of co-test
     - The detection rates of HPV-/Cytology-, HPV+/Cytology-, HPV-/Cytology+, 
       HPV+/Cytology+ are 17.4%, 23.5%, 5.9%, 53.2%, respectively.
     - Schiffman et al. 2018
     - 
   * - Screening specificity of co-test
     - TBD
     - 
     - 
   * - Screening sensitivity of cytology alone test
     - 65.9% (95% CI 54.9 to 75.3)
     - Koliopoulos et al. 2017
     - 
   * - Screening specificity of cytology alone test
     - 100%
     - 
     - by client’s assumption
   * - Prevalence of HPV
     - add file path
     - Kang et al. 2014
     - We used Abie's dismod 1.1.1 to generate draw-/age- specific prevalence data
   * - Incidence of HPV
     - add file path
     - Kang et al. 2014
     - We used Abie's dismod 1.1.1 to generate draw-/age- specific incidence data
   * - remission of HPV
     - add file path
     - kang et al. 2014
     - We used Abie's dismod 1.1.1 to generate draw-/age- specific remission data
   * - Relative risk of HPV
     - 16.2 (95%CI 9.6 to 27.3)
     - Chen et al. 2011
     - 
   * - BCC treatment coverage
     - 
     - 
     - 
   * - BCC treatment efficacy
     - 
     - 
     - 
   * - HPV vaccine efficacy
     - ATP efficacy against persistent HPV infection = TBD
       ATP efficacy against CIN2+ = TBD
     - Lu et al. 2011
     - ATP = according to protocol

.. _5.5:

5.5 Output meta-table shell
---------------------------

.. list-table:: Output shell table
   :header-rows: 1

   * - Location
     - Year
     - Birth cohort
     - Sex
     - Risk group
     - Scenario
     - Outcome
   * - Blended provinces in China
     - 2020
     - 2000-2005
     - Female
     - Average risk without HPV infection
     - Baseline
     - Number of benign cervical cancer cases detected among policyholders
   * - 
     - ...
     - ...
     - 
     - High risk with HPV infection
     - Alternative
     - Number of invasive cervical cancer cases detected among policyholders
   * - 
     - 2040
     - 1925-1930
     - 
     - 
     - 
     - Number of deaths from undetected invasive cervical cancer among policyholders
   * - 
     - 
     - 
     - 
     - 
     - 
     - Change of detected benign cervical cancer cases as compared with baseline
   * - 
     - 
     - 
     - 
     - 
     - 
     - Change of detected invasive cervical cancer cases as compared with baseline
   * - 
     - 
     - 
     - 
     - 
     - 
     - Change of deaths from undetected invasive cervical cancer as compared with
       baseline


.. _6.0:

6.0 Validation and verification
+++++++++++++++++++++++++++++++
TBD


.. _7.0:

7.0 Limitations
+++++++++++++++
TBD


.. _8.0:

8.0 References
++++++++++++++

.. todo::

 add cited works
