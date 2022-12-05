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


.. _colon_and_rectum_cancer_concept_model:

===============================================
Vivarium CSU Colon and Rectum Cancer Simulation
===============================================

.. contents::
  :local:

.. list-table:: List of abbreviations
   :header-rows: 1

   * - Label
     - Definition
   * - PC
     - Pre-clinical and screen-detectable state, with asymptomatic condition
   * - C
     - Clinical state, with symptomatic condition
   * - MST
     - Mean sojourn time, average time spent in PC state
   * - CRC
     - Colon and rectum cancer
   * - FOBT
     - Fecal occult blood test
   * - ACMR
     - All-cause mortality rate
   * - prev_c441
     - Prevalence of colon and rectum cancer
   * - incidence_c441
     - Incidence of colon and rectum cancer
   * - csmr_c441
     - Cause-specific mortality rate of colon and rectum cancer

.. _swcrc1.0:

1.0 Background
++++++++++++++

.. _swcrc1.1:

1.1 Project overview
--------------------
This project will generate forecasts of colon and rectum cancer prevalence, 
incidence, and cause-specific mortality to allow Swiss Re to identify trends 
that are important to its business decision-making. IHME will produce both a 
baseline (business as usual) forecast, and an alternative scenario forecast 
in which key colon and rectum cancer screening practice is implemented in a 
simulation framework. Baseline forecasts will incorporate expected trends in 
relevant risk factors. Alternative scenario forecasts will incorporate baseline 
forecasts and the expected impact of screening technologies. All forecasts will 
represent the Swiss Re’s insured population from the weighted blend of Chinese 
provinces. Forecasts will be from year 2020 to 2040.

.. _swcrc1.2:

1.2 Literature review
---------------------

.. todo::

 add more literature background


.. _swcrc2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++
To help SwissRe identify pay-out trends for colon and rectum cancer claims, 
IHME will estimate the yearly number of cases of colon and rectum cancer 
detected (per 100,000 insured person-years) via colon and rectum cancer 
screening and symptomatic presentation in a baseline with no screening scale-up 
and an alternativein in which screening scaled-up.


.. _swcrc3.0:

3.0 Causal framework
++++++++++++++++++++

.. _swcrc3.1:

3.1 Causal variables
--------------------
 
Outcome
 - Colon and rectum cancer detection
 - Mortality and morbidity of colon and rectum cancer
Most proximal determinant/exposure
 - Family history of colon and rectum cancer
 - Personal history of adenoma
 - Colon and rectum cancer screening
Confounders
 - age
Effect modifiers
 - N/A
Mediators
 - N/A


.. _swcrc4.0:

4.0 Intervention
++++++++++++++++
Scale-up of colon and rectum cancer screening coverage among insured population.

.. _swcrc4.1:

4.1 Simulation scenarios
------------------------
Baseline: project existing level of colon and rectum cancer screening for 
simulants aged 50 to 74 years, where:

 - Medium-risk group are provided with FOBT (fecal occult blood test)
   every year
 - High-risk group (with family history of colon and rectum cancer or 
   personal history of adenoma) are provided colonoscopy every 5 years

Alternative scenario: by 2040, linear ramp up colon and rectum cancer screening 
to cover 60% of women aged 50 to 74 years in 2030, then keep 60% coverage till 
2040, where:

 - Medium-risk group are provided with FOBT (fecal occult blood test)
   every year
 - High-risk group (with family history of colon and rectum cancer or 
   personal history of adenoma) are provided colonoscopy every 5 years

.. image:: screening_scale_up.png

.. list-table:: Intervention scale-up
   :header-rows: 1

   * - Scenario
     - Intervention
     - Year
     - Coverage
   * - Baseline
     - Colon and rectum cancer screening
     - 2020-2040
     - 10%
   * - Alternative
     - Colon and rectum cancer screening
     - 2020-2035
     - Stay 20% in 2020-2021 then linearly scale up to 60% from 2021 to 
       2030
   * - Alternative
     - Colon and rectum cancer screening
     - 2030-2040
     - 60%

.. note::

 - Lin et al. reported an uptake rate of 15.4% for colorectal cancer screening 
   among Chinese adults between 50 and 74 years living in Guangzhou. In this 
   study, the screening update rate varies by age and sex, but less likely 
   associated with residence of urban and rual. Notice that the true screening 
   coverage may be lower among general population as compared with coverage among 
   eligible population. For now, we assume a 10% of baseline screening coverage 
   across all ages and sexes for SwissRe's insured population.
 - We assume that the screenig uptake rate in China is 20 years behind the US; 
   therefore, we will use the documented number in 2010 among US general 
   population to determine the target screening coverage in China. In 2008, 
   51.6% of american adults were up-to-date with CRC screening. From 2008 to 
   2010, screening rates increased by 6.7 percentage points to 58.3%. Although 
   CRC rates were essentially unchanged from 2010 to 2013 (58.3% to 57.3%), they 
   increased an additional four percentage points to 61.3% between 2013 and 
   2015. [de-Moor-et-al-2018]_


.. _swcrc5.0:

5.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _swcrc5.1:

5.1 Vivarium concept model 
--------------------------

.. image:: colon_and_rectum_cancer_concept_model_diagram.svg

.. _swcrc5.2:

5.2 Demographics
----------------

.. _swcrc5.2.1:

5.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 - Cohort type: Closed cohort of 200,000 insured male (50%) and female (50%) 
   simulants.
 - Age and sex: Age 15 to 95+, 5 year-age bands, uniformly distributed age and 
   sex structure.
 - Time span: Jan 1, 2020 to Dec 31, 2040 with 36.5-day time-steps.
 - Location: blended with province-specific weight in China.

.. _swcrc5.2.2:

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
     - Weighted ACMR (per person-year)
     - Weighted prev_c441 (proportion)
     - Weighted incidence_c441 (cases per person-year)
     - Weighted csmr_c441 (per person-year)
   * - Tianjin
     - 517
     - 18%
     - ACMR * 18%
     - prev_c441 * 18%
     - incidence_c441 * 18%
     - csmr_c441 * 18%
   * - Jiangsu
     - 506
     - 28%
     - ACMR * 28%
     - prev_c441 * 28%
     - incidence_c441 * 28%
     - csmr_c441 * 28%
   * - Guangdong
     - 496
     - 22%
     - ACMR * 22%
     - prev_c441 * 22%
     - incidence_c441 * 22%
     - csmr_c441 * 22%
   * - Henan
     - 502
     - 16%
     - ACMR * 16%
     - prev_c441 * 16%
     - incidence_c441 * 16%
     - csmr_c441 * 16%
   * - Heilongjiang
     - 501
     - 16%
     - ACMR * 16%
     - prev_c441 * 16%
     - incidence_c441 * 16%
     - csmr_c441 * 16%

.. note::

 GBD (2019 round) colorectal cancer forecast data can be found at `/ihme/csu/swiss_re/forecast` 

 - ACMR: 294_deaths_12_29_ng_smooth_13.csv
 - prev_c441: 441_prevalence_12_29_ng_smooth_13.csv
 - incidence_c441: 441_incidence_12_29_ng_smooth_13.csv
 - csmr_c441: 441_deaths_12_29_ng_smooth_13.csv

See column **noised_forecast** for output value.

.. _swcrc5.3:

5.3 Models
----------

.. _swcrc5.3.1:

5.3.1 Core colon and rectum cancer model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

see :ref:`colon and rectum cancer cause model<2017_cancer_model_colon_and_rectum_cancer>`

.. _swcrc5.3.2:

5.3.2 Screening and detection model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

:underline:`I. Screening algorithm`

Colon and rectum cancer screening algorithm was determined by three variables:
 1) Age
 2) Family history of colon and rectum cancer
 3) Personal history of adenoma

People met any of following criteria are considered high-risk for colon and 
rectum cancer screening:

 - With family history of colon and rectum cancer
 - With personal history of adenoma

Positive for FOBT does not necessarily mean you have colorectal cancer

.. image:: colon_and_rectum_cancer_screening_branches.svg 

.. list-table:: Screening branches
   :header-rows: 1

   * - Branch
     - Age
     - Sex
     - Risk group
     - Screening technology
     - Screening frequency
     - Sensitivity
     - Specificity
   * - A
     - 50-75
     - Both
     - Medium-risk
     - Fecal occult blood test (FOBT)
     - every year
     - 68% (95%CI 57%-79%)
     - 88% (95%CI 84%-91%)
   * - B
     - 50-75
     - Both
     - High-risk
     - Colonoscopy
     - every 5 years
     - 98% (95%CI 91%-100%)
     - 100%
   * - C
     - Under 50 or above 75
     - Both
     - Any risk level
     - No screening
     - N/A
     - N/A
     - N/A

.. note::
 
  - FOBT can be further stratified by the type of FOBT: guaiac-based FOBT 
    (gFOBT) and immunochemical FOBT (iFOBT). For detecting CRC, we documented 
    pooled sensitivity and specificity of traditional gFOBT from Meklin et al.
  - Colonoscopy is the most sensitive test acorss all available colorectal 
    cancer screening test options. In a study by Rockey et al., the sensitivity 
    was calculated on a per-patient basis, with lesions size larger than 10 mm. 

In initialization, We assume that
 - No one has prior knowledge of their disease status on day 1 of the simulation.
 - All simulants are buying insurance on day 1 of the simulation.
 - For simulants in clinical (C) state regardless of detection, they have a 
   transition rate of 0.1 (per person-year) of moving into a recovered (R) state; 
   People in state C and R follow exactly the same screening algorithm, namely 
   branch A, B, and C depending on their age and risk level. Negative screening 
   results are expected for those in R state in order to avoid double counting 
   the CI claim from detected colon and rectum cancer.

:underline:`II. Screening schedule and attendance`

Probability of attending screening
 - Generate 1000 draws from normal distribution with mean of `current screening 
   coverage` (e.g., 0.1 for baseline), SD of `1% of current screening coverage` 
   (e.g., 0.001 for baseline) for calculating the probability of simulants 
   attending their first due screening.
 - Zhang et al. documented the odds ratios of factors associated with participation 
   rate of colorectal cancer screening program. For people who underwent FOBT, the 
   odds ratio was estimated to be 0.91 (95%CI 0.82-1.00) among those tested 
   negative, and 1.24 (95%CI 1.11-1.38) among those tested positive, when compared 
   to people who never go for FOBT. Hence we assume that simulants all have equal 
   probability of attending their next screening test, regardless of their previous 
   screening behavior.

Time to next scheduled screening

.. list-table:: Screening waiting time distribution (days)
   :header-rows: 1

   * - Screening method
     - Distribution
     - Parameters
     - Function
   * - Annual FOBT
     - Log-normal
     - s = shape parameter; loc = location parameter; scale = scale parameter
     - stats.lognorm.rvs(s=0.7, loc=330, scale=100, size=1000)
   * - Colonoscopy in 5 years
     - Log-normal
     - s = shape parameter; loc = location parameter; scale = scale parameter
     - stats.lognorm.rvs(s=0.7, loc=1650, scale=100, size=1000)

:underline:`III. Screening initialization`

The date of the first screening appointment (T_appt) for simulants at age between 
50 and 75 is determined as follows. We assume that each simulant had a previous 
appointment scheduled at some point before the simulation begins. We calculate 
the time between that past appointment and their next appointment (delta_T) 
using the methodology outlined in Section 5.3.2.II (Time to next scheduled 
screening). With a uniform distribution we randomly determine how far along 
that time interval between appointments each individual is (X) at the beginning 
of the simulation (T_0). For simulants under 50, the methodology is identical 
when the simulation begins, except T_0 is the simulant's 50th birthday rather 
than the beginning of the simulation. No screening appointment will be initialized 
for simulants at any age above 65.

.. image:: colon_and_rectum_cancer_screening_event_time.svg

.. _swcrc5.3.3:

5.3.3 Risk factor model
~~~~~~~~~~~~~~~~~~~~~~~
GBD risk factors: N/A

Non-GBD risk factor 1: Family history of colon and rectum cancer
 - prevalence: In a systematic review with 9 studies conducted in multiple 
   locations (Japan and other western countries), the prevalence of having 
   at least one first-degree relative (FDR) with CRC was estimated between 
   3.1 and 10%. (Henrikson et al. 2015)
 - relative risk: A meta-analysis which includes 63 studies documneted that 
   family history of CRC in FDR confers a higher risk of CRC (RR = 1.76, 95%CI 
   = 1.57‐1.97). Another pooled risk estimate (47 studies were included) was 
   2.24 (95%CI 2.06-2.43) for developing CRC among given at least one affected 
   first-degree relative. (Wong et al. 2018 and Butterworth et al. 2006) 

Non-GBD risk factor 2: Personal history of adenoma 
 - prevalence: The prevalence of adenoma was found to be 13.3% from a 
   cross-sectional study on patients who had undergone colonoscopy examination 
   in a university hospital in mainland China. (Hong et al. 2018) 
   21·1% (95%CI 17·3–25·1) has been documented in a meta-analysis included 16 
   studies reporting on a total of 81,262 people between 1996 and 2015. 
   (Huang et al. 2019) In a cross-sectional study of 19,372 participants aged 
   20 to 79 years underwent colonoscopy in Korea from 2006-2009, the prevalence 
   of advanced adenoma were found to be 3.1% in men and 1.5% in women among 
   participants at average risk, those without a history of colorectal polyps 
   or a family history of colorectal cancer. (Yang et al. 2014)
 - relative risk: For the association between adenoma and colorectal cancer
   incidence, I found a prospetive cohort study that focus on participants aged 
   55-74 years in the Prostate, Lung, Colorectal, and Ovarian (PLCO) Cancer 
   randomized clinical trial of flexible sigmoidoscopy (FSG) beginning in 
   1993 with follow-up for CRC incidence to 2013 across the United States. 
   Through the end of follow-up, participants with advanced adenoma were 
   2.7 (95%CI, 1.9-3.7) more likely to develop CRC compared with participants 
   with no adenoma. There was no significant difference in CRC risk between 
   participants with nonadvanced adenoma compared with no adenoma 
   (RR = 1.2 [95%CI, 0.8-1.7]). (Click et al. 2018)

To joint model family history of CRC (F) and personal history of adenoma (A), 
we decided to create a dichtomous exposure distribution with 2 categories: 
(cat1) `exposed` means you have either A/F alone or both; (cat2) `unexposed` 
means you don't have A nor F.

.. list-table:: Distribution of risk exposure and relative risk
   :header-rows: 1

   * - Exposure category
     - Prevalence
     - Relative risk
   * - Exposed (cat1)
     - 20%
     - Log-normal distribution: exp(normal(mean=log(1.46), SD=0.13))
   * - Unexposed (cat2)
     - 1 - prevalence_{exposed}
     - 1

Relevant formulas 
 1. PAF= :math:`\frac{prevalence \times (RR-1)}{prevalence \times (RR-1)+1}`
 2. :math:`i_{PC|exposed} =  i_{PC} \times (1-PAF) \times RR`
 3. :math:`i_{PC|unexposed} =  i_{PC} \times (1-PAF)`

.. note::

 By adding the prevalence of family history of CRC (5%) and the prevalence of 
 adenoma (15%), we assume the prevalence of simulants in `cat1` to be 20%. 
 According to the evidence we have identfied, only 10% of colorectal adenoma are 
 advanced adenoma. We decide to use the CRC risk associated with family history 
 and non-advanced adenoma for calculating the probability of developing CRC when 
 exposed to `cat1`. The formula is described as follow: RR_cat1 = RR_family_history 
 * 0.25 + RR_nonadvanced_adenoma * 0.75 = 2.24 * 0.25 + 1.2 * 0.75 = 1.46.

.. _swcrc5.4:

5.4 Input data sources
----------------------

.. list-table:: Model inputs
   :header-rows: 1

   * - Input parameter
     - Value
     - Source
     - Note
   * - MST
     - 4.5-5.8 years depending on age
     - [Brenner-et-al-2012]_
     - Let's use a MST of 5 years for all ages.
   * - Colon and rectum cancer screening coverage in baseline
     - 10%
     - [lin-et-al-2019]_
     - 
   * - Colon and rectum cancer screening covearge in alternative scenario
     - scale up to 60% in 2030
     - [de-Moor-et-al-2018]_
     - We applied a 20-year lag on US coverage.
   * - FOBT sensitivity
     - 68% (95%CI 57%-79%)
     - [Meklin-et-al-2020]_
     - Normal distribution with mean=0.68 and std_dev=0.056
   * - FOBT specificity
     - 88% (95%CI 84%-91%)
     - [Meklin-et-al-2020]_
     - Normal distribution with mean=0.88 and std_dev=0.018
   * - Colonoscopy sensitivity
     - 98% (95%CI 91%-100%)
     - [Rockey-et-al-2005]_
     - Truncated normal distribution with mean=0.98, std_dev=0.04, and upper limit=1.0
   * - Colonoscopy specificity
     - 100%
     - 
     - by client’s assumption (no false positive results of screening)
   * - Prevalence of having family history of CRC or personal history of 
       adenoma, or both
     - 20%
     - [Henrikson-et-al-2015]_, [Hong-et-al-2018]_, and [Huang-et-al-2019]_
     - We assume prevalence is independent from age and sex
   * - Relative risk of family history of CRC, or personal history of adenoma, 
       or both causing colorectal cancer
     - exp(normal(mean=log(1.46), SD=0.13))
     - [Butterworth-et-al-2006]_, [Wong-et-al-2018]_, and [Click-et-al-2018]_ 
     - We assume RR is independent from age and sex.

.. _swcrc5.5:

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
     - Medium-risk without family history of colon and rectum cancer or personal 
       history of adenoma
     - Baseline
     - Number of colon and rectum cancer cases detected among policyholders
   * - 
     - ...
     - ...
     - Male
     - High-risk with family history of colon and rectum cancer or personal 
       history of adenoma
     - Alternative
     - Change of detected colon and rectum cancer cases as compared with baseline
   * - 
     - 2040
     - 1935-1940
     - 
     - 
     - 
     - 


.. _swcrc6.0:

6.0 Validation and verification
+++++++++++++++++++++++++++++++
TBD


.. _swcrc7.0:

7.0 Limitations
+++++++++++++++
 1. Adenoma will be modeled as a risk factor rathern than a disease state because 
    of minimum information on its transition to pre-clinical colorectal cancer. 
    Hence, detection of adenoma is not tracted in our simulation, and we don't 
    need to model treatment for detected adenoma.
 2. The screening waiting time distirbution is built based on Marketscan data 
    (clinical records for US general population).
 3. The factors like family history of colorectal cancer or personal history of 
    colorectal polyps (adenoma) are associated with participation rate of 
    colorectal cancer screening; However, we don't model such relationship due to 
    lack of evidence for insured Chinese.
 4. The external parameters are not stratified by attributes like age, sex or 
    residence (urban vs rural), unless the literature tells us to do so. We will 
    compare the evidence from China to studies conducted in other locations.


.. _swcrc8.0:

8.0 References
++++++++++++++

.. [Brenner-et-al-2012]
   Brenner H, Altenhofen L, Katalinic A, Lansdorp-Vogelaar I, Hoffmeister M. 
   Sojourn time of preclinical colorectal cancer by sex and age: estimates from 
   the German national screening colonoscopy database. Am J Epidemiol 2011; 174: 
   1140–6.
.. [lin-et-al-2019]
   Lin G, Feng Z, Liu H, et al. Mass screening for colorectal cancer in a 
   population of two million older adults in Guangzhou, China. Sci Rep 2019; 9: 
   10424.
.. [de-Moor-et-al-2018]
   de Moor JS, Cohen RA, Shapiro JA, et al. Colorectal cancer screening in the 
   United States: Trends from 2008 to 2015 and variation by health insurance 
   coverage. Prev Med 2018; 112: 199–206.
.. [Meklin-et-al-2020]
   Meklin J, SyrjÄnen K, Eskelinen M. Fecal Occult Blood Tests in Colorectal 
   Cancer Screening: Systematic Review and Meta-analysis of Traditional and 
   New-generation Fecal Immunochemical Tests. Anticancer Res 2020; 40: 3591–604.
.. [Rockey-et-al-2005]
   Rockey DC, Paulson E, Niedzwiecki D, et al. Analysis of air contrast barium 
   enema, computed tomographic colonography, and colonoscopy: prospective 
   comparison. Lancet 2005; 365: 305–11.
.. [Henrikson-et-al-2015]
   Henrikson NB, Webber EM, Goddard KA, et al. Family history and the natural 
   history of colorectal cancer: systematic review. Genet Med 2015; 17: 702–12.
.. [Hong-et-al-2018]
   Hong W, Dong L, Stock S, Basharat Z, Zippi M, Zhou M. Prevalence and 
   characteristics of colonic adenoma in mainland China. Cancer Manag Res 2018; 
   10: 2743–55.
.. [Huang-et-al-2019]
   Huang J, Pang TWY, Leung C, et al. Prevalence of colorectal neoplasia in an 
   average-risk Chinese population: a systematic review and meta-analysis. 
   The Lancet 2019; 394: S74.
.. [Butterworth-et-al-2006]
   Butterworth AS, Higgins JPT, Pharoah P. Relative and absolute risk of 
   colorectal cancer for individuals with a family history: a meta-analysis. 
   Eur J Cancer 2006; 42: 216–27.
.. [Wong-et-al-2018]
   Wong MCS, Chan CH, Lin J, et al. Lower Relative Contribution of Positive 
   Family History to Colorectal Cancer Risk with Increasing Age: A Systematic 
   Review and Meta-Analysis of 9.28 Million Individuals. Am J Gastroenterol 
   2018; 113: 1819–27.
.. [Click-et-al-2018]
   Click B, Pinsky PF, Hickey T, Doroudi M, Schoen RE. Association of Colonoscopy 
   Adenoma Findings With Long-term Colorectal Cancer Incidence. JAMA 2018; 319: 
   2021–31.
