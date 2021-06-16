.. _lung_cancer_cancer_concept_model:
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

=======================================
Vivarium CSU Lung Cancer Simulation
=======================================

.. contents::
  :local:

.. list-table:: List of abbreviations
   :header-rows: 1

   * - Label
     - Definition
   * - TBL
     - Tracheal, Bronchus, and Lung cancer
   * - MST
     - Mean sojourn time
   * - AST
     - Average survival time
   * - ODF
     - Overdiagnosis factor
   * - LDCT
     - Low dose computed topography
   * - CXR
     - Chest x-ray

.. _swlc1.0:

1.0 Background
++++++++++++++

.. _swlc1.1:

For this project, we are interested in the expected impact of increases in lung cancer screening coverage on the rates of detected lung cancer over the next 20 years among the insured population in select areas in China. 

1.1 Project overview
--------------------

This project intends to model the impact of increased lung cancer screening coverage on lung cancer detection forecasted from 2020 to 2040 among the insured population in select areas of China. The model will make use of the current lung cancer screening guidelines, which are dependent on age, smoking status, and cumulative smoking history. Screening will affect the timing of dection for some lung cancers (in the preclinical rather than clinical phase) as well as whether indolent cancers are detected or not.

.. _swlc1.2:

1.2 Literature review
---------------------

.. _swlc2.0:

There is a concensus that lung cancer screening programs do not significantly affect smoking behaviors among the screened population, as supported by a systemtatic review [Slatore-et-al-2014]_. However, this conclusion is limited in that it included studies from Europe and the United States only. It is therefore possible that lung cancer screening programs could either *increase* smoking behaviors by providing a sense of safety or *decrease* smoking behaviors by drawing attention to the risks of smoking in our population of interest that was not studied by the systematic review. 

[Li-et-al-2018]_ found that low insurance reimbursement rates negatively affected the diagnosis and treatment of non-small cell lung cancer in China.

There have been several recent studies that have analyzed screening programs implemented in China with respect to screening compliance and performance, including [Qiao-et-al-2020]_ in Sichuan, [Wei-et-al-2020]_ in Gejiu and Yunnan, [Guo-et-al-2020]_ in Henan (article in Chinese), and [Lin-et-al-2019]_ in Kunming, Yunnan (article in Chinese). 

Lung cancer screening coverage by LDCT for the eligible population in the United states has been low according to the available data [Jemal-and-Fedewa-2017]_, [Smith-et-al-2019]_ at 3.3% in 2010 and 3.9% in 2015 based on the National Health Interview Survey. Notably, [Blom-et-al-2019]_ conducted a modeling study that suggested "full-scale implementation" of the lung cancer screening guidelines in the United States would cause a major increase in surgical demand and that a "gradual buildup of adherence can spread this peak over time."

  Note: the United States screening adherence data is relevant because it may be used as a proxy for Chinese adherence with a lag period.

There are several randomized controlled trials on LDCT lung cancer screening programs that have been conducted and are briefly described below.

.. list-table:: RCT Summaries
   :header-rows: 1

   * - Study Name
     - Recent Publication(s)
     - Location
     - Intervention arm
     - Control arm
     - Eligible population
     - Length of follow-up
   * - Chinese Yang Trial
     - Yang et al. 2018
     - China
     - LDCT screening every two years for three rounds
     - No screening
     - Asymptomatic residents 45–70 years of age showing at least one high-risk factor, including smoking, persoal/family cancer history, occupational exposure, secondhand smoke exposure, cooking oil fumes (see paper for specific exposure definitions)
     - 6 years postrandomization, 0 years after last screening
   * - Danish Lung Cancer Screening Trial (DLCST)
     - Heleno et al. 2018
     - Denmark
     - LDCT screening annually for five years
     - No screening
     - 50-70 year old current or former smokers with at least 20 pack-years of smoking history. Former smokers should have quit after the age of 50 and within the past 10 years. Healthy (see paper for specific definition)
     - 10 years postrandomization, 5 years after last screening
   * - German lung cancer screening intervention study (LUSI)
     - Gonzalez Maldonado et al. 2020
     - Germany
     - LDCT screening annually for five years
     - No screening
     - 50 to 69 year old men and women with at least 25 years of smoking history of 15 cigarettes per day or 30 years of smoking 10 cigarettes per day and less than 10 years since smoking cessation
     - 9.77 years postrandomization  5.73 years post last screening
   * - Detection and Screening of Early Lung Cancer by Novel Imaging Technology and Molecular Assays (DANTE)
     - Infante et al. 2020
     - Italy
     - LDCT screening annually for four years following CXR baseline screening
     - No screening following baseline CXR
     - Male smokers of 20+ pack-years aged 60 to 74 years
     - 4 years postrandomization  0 years after last screening
   * - Italian Lung Cancer Computed Tomography Screening Trial (ITALUNG)
     - Paci et al. 2020
     - Italy
     - LDCT screening annually for four years following CXR baseline screening
     - No screening following CXR baseline screening
     - Eligible subjects aged 55-69 years, smokers or ex-smokers (at least 20 pack-years in the last 10 years)
     - 8.3 years after last screening
   * - Nederlands-Leuvens Longkanker Screenings Onderzoek (NELSON)
     - de Koning et al. 2020
     - Netherlands and Belgium
     - LDCT screening every 1, 2, and 2.5 years for four rounds
     - No screening
     - Men, 50-74 years, >15 cigarettes a day for >25 years or >10 cigarettes a day for >30 years, cessation <10 years
     - 10 years postrandomization  4.5 years after last screening
   * - National Lung Cancer Screening Trial (NLST)
     - Patz et al. 2014; NLST Team 2019
     - US
     - LDCT screening annually for three years
     - CXR screening annually for three years
     - Men and women, 55-74 years, at least 30 pack-year smoking history, smoking cessation within the last 15 years for former smokers
     - 4.5 years after last screening (Patz et al. 2014), 9.3 years after last screening (NLST Team 2019)

.. note::

  The NLST trial had an active compartor arm (chest x-ray screening), and therefore should not be used as evidence for LDCT screening relative to no screening, but it is included here because it is an often cited study and the first to demonstrate a mortality reduction associated with LDCT screening programs.

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++

The main outcome of this model is lung cancer *detections*, diagnosed either via screening or symptomatic presentation. This outcome will be assessed yearly in a baseline scenario with no lung cancer screening scale-up and an alternative scenario in which lung cancer screening coverage is scaled up. NOTE: deaths with undetected lung cancer is not a relevant model outcome.

.. _swlc3.0:

3.0 Causal framework
++++++++++++++++++++

.. image:: causal_framework_diagram.svg

.. _swlc3.1:

3.1 Causal variables
--------------------

Exposure/Intervention: Lung cancer screening coverage

Primary outcome: Lung cancer detection

Secondary outcomes: Lung cancer mortality, morbidity

**Relationship between exposure and outcomes:**

  - There is a *direct* path between lung cancer screening and lung cancer detection (early detection as well as probability of detecting indolent cancers). Notably, there is also a potential *indirect* path between lung cancer screening and lung cancer detection through the impact of lung cancer screening on future smoking behaviors (although there is little evidence on this association) and its causal impact on lung cancer, which is causally related to lung cancer detection; we are not considering this path in our model.

  - There are *direct* paths between lung cancer screening and lung cancer mortality (early detection via screening has been shown to reduce mortality) and morbidity (both through increased recovery from lung cancer due to early detection AND through anxiety associated with false positive screening results and/or additional invasive procedures); however, we are NOT considering these associations in our model. The *indirect* path that exists between lung cancer screening and lung cancer detection exists for lung cancer mortality and morbidity as well.

*Potential for confounding:*

  There are two potential paths for confounding in the association bewteen lung cancer screening coverage and lung cancer detection as drawn in this diagram:

    - Though smoking history and its effect on lung cancer

    - Through smoking history and its effect on mortality due to causes other than lung cancer. For our purposes, we can think of death due to other causes as associated with lung cancer and lung cancer detection in that if a simulant is dead, they cannot develop or detect lung cancer. Therefore, since smoking status creates a differential risk of death due to other causes (and therefore the probability of the outcome) as well as affects the probability of the exposure, it presents an opportunity for confounding in this model.

Additional considerations:

  Age was not shown in this diagram because it is inherently controlled for by the age-specific estimates inherent to GBD. However, age affects screening eligibility and therefore there are still potential downstream impacts. Particularly, age affects the probability that lung cancer will be indolent. Therefore, age is a potential effect modifier in the relationship between lung cancer screening and lung cancer detection. 
 
.. _swlc4.0:

4.0 Intervention
++++++++++++++++

.. _swlc4.1:

4.1 Simulation scenarios
------------------------

**Baseline**: Lung cancer screening coverage from 2020-2040 in the model population is assumed to follow 20 year lag from US coverage rates.

**Alternative**: Lung cancer screening coverage from 2020-2040 in the model population is scaled up to target coverage.

.. todo::

  Refine this... also, see section below

.. _swlc5.0:

5.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _swlc5.1:

5.1 Vivarium concept model 
--------------------------

.. image:: concept_model_diagram.svg

Note that we are not modeling an effect of lung cancer screening coverage on lung cancer mortality because it is not an explicit outcome of interest in this project, although there is evidence of an effect.

Note that we are using mortality due to chronic obstructive pulmonary disease (COPD) and ischemic heart disease (IHD) as a proxy for smoking-related mortality other than lung cancer (more details below).

.. _swlc5.2:

5.2 Demographics
----------------

The demographic model for this project should follow the same demographic model for the existing SwissRe models, as defined in the 
:ref:`Vivarium CSU Breast Cancer Screening Concept Model Documentation <2017_concept_model_vivarium_swissre_breastcancer>`, both in terms of the population and location descriptions.

.. _swlc5.3:

5.3 Models
----------

.. _swlc5.3.1:

5.3.1 Core Lung Cancer Model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The lung cancer cause model that should be used for this project is documented on the :ref:`2017 Tracheal, Bronchus, and Lung Cancer Page <2017_lung_cancer>`.

Additionally, the effect of the smoking risk factor on this model is documented on the :ref:`2017 Smoking Risk Effects page <2017_risk_effect_smoking>`.

.. _swlc5.3.2:

5.3.2 Smoking-Related Mortality Model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The smoking-related mortaltiy model will be incorporated into this project in order to capture the excess mortality attributable to the smoking risk factor from causes other than lung cancer. This is a mortality-only model that considers mortality due to chronic obstructive pulmonary disease and ischemic heart disease only. The mortality component of this model is documented on the :ref:`2017 Smoking-Related Mortality Model <2017_smoking_related_mortality>`. Additionally, the effect of the smoking risk factor on this model is documented on the :ref:`2017 Smoking Risk Effects page <2017_risk_effect_smoking>`.

.. _swlc5.3.3:

5.3.3 Smoking model
~~~~~~~~~~~~~~~~~~~

The smoking risk exposure model to be used for this project is documented on the :ref:`Forecasted Smoking Risk Exposure Page <2017_risk_smoking_forecasted>`.

The smoking risk factor will affect lung cancer incidence, as described in the :ref:`smoking risk effects page <2017_risk_effect_smoking>`.

The smoking risk exposure should also be used to determine the lung cancer screening model algorithm, as described in section `swlc5.3.4`_ Screening and detection model.

.. _swlc5.3.4:

5.3.4 Screening and Detection model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

5.3.4.1 Screening Model
^^^^^^^^^^^^^^^^^^^^^^^

For the purposes of our model, we will define two target populations for lung cancer screening coverage: a primary target population of high-risk smokers, and a secondary target population of lower risk or never smokers.

The **primary screening target population** will consist of simulants who meet the following criteria:

#. 50-74 years old
#. 20+ pack-year history
#. Current smokers or former smokers with <5 years since quitting

The **secondary screening target population** will consist of simulants who meet the following criteria:

#. Does not meet primary target population criteria
#. 20-74 years old

.. note::

  The secondary screening target population has been included due to the client's observations of screening behaviors in the insured population that are outside of the Chinese national guidelines for screening eligibility.

  Note: we will assume that screening coverage among the secondary screening target population is *one half* that of screening coverage among the primary screening target population.

*Annual* screenings should be scheduled for simulants who meet ALL of the following criteria: 

#. Meet either the primary or secondary target population criteria
#. Lung cancer not already detected

**Time until next annual screening** for an inidividual simulant should be sampled from a lognormal distribution, as demonstrated with the code below in days. This value was derived from marketscan data, a notebook that obtains this distribution is hosted on the :code:`vivarium_data_analysis` repository, `here <https://github.com/ihmeuw/vivarium_data_analysis/blob/master/pre_processing/lung_cancer_model/lung_cancer_screening_waiting_time_distribution.ipynb>`_.

.. code-block:: python

  import scipy.stats
  s = 0.5
  loc = 317
  scale = 60

  time_until_next_screening_i = scipy.stats.lognorm.rvs(s, loc, scale)

**Screening initialization**

  For simulants who are eligible for screening upon initialization, we will assume that they had previously scheduled screenings, so they require additional consideration for their first scheduled screenings. For these simulants as well as simulants who are not eligible for screening upon initialization and who become eligible during the simulation, the time until the first scheduled screening in the model should be determined as follows:

    First,sampling a :code:`time_until_next_annual_screening_i` value for the simulant as described above. 

    Then, sample a value from a uniform distribution between 0 and :code:`time_until_next_annual_screening_i`. This value should be used as the time until the simulant's first screening.

5.3.4.2 Detection Model
^^^^^^^^^^^^^^^^^^^^^^^

Lung cancers may be detected in one of two ways in this simulation: either via screening or symptomatic presentation. It is important to track and record *how* each lung cancer was detected in the simulation (as noted in the output table shell).

  Detection via screening occurs when:

    - Simulant is in the PC or I states of the lung cancer cause model
    - Simulant attends a scheduled lung cancer screening
    - Lung cancer is detected according to sensitivity parameters defined below in `swlc5.3.4.3`_

  Detection via symptomatic presentation occurs when:

    - Simulant has not already had lung cancer detection via screening
    - Simulant transitions from PC to C state in the lung cancer cause model

.. note::

  We may want to eventually incorporate some lag period here between when simulant begins to experience symptoms and when lung cancer is actually formally diagnosed.

.. _swlc5.3.4.3:

5.3.4.3 Screening Sensitivity and Specificity
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Lung cancer screening specificity is assumed to be 100%; in other words, we assume that there will be no false negative lung cancer results detected via screening. 

Lung cancer screening sensitivity is assumed to be 98.1% (95% CI: 88.4, 99.9); in other words, we assume that the probability that LDCT screening will detect lung cancer given that the individual has lung cancer is 98.1% (95% CI: 88.4, 99.9). This value was obtained from the Yang et al. (2018) lung cancer screening trial conducted in China to be most representative of the model population.

Since the confidence interval for this parameter is not symmetric about the mean, we will assume a lognormal distribution of uncertainty, detailed by the code below. Note that this code plots the inverse of the true distribution and then converts back to a sensitivity parameter. The value sampled by this code will represent sensitivity as a *proportion* of lung cancers successfully detected by LDCT. The sensitivity parameter should be sampled at the *draw* level.

.. code-block:: python

  from scipy.stats import lognorm

  # set distribution parameters
  s = 1
  loc = 0
  scale = 1.9

  # sample sensitivity value as PROPORTION of lung cancers successfully detected by LDCT
  sensitivity = (100 - lognorm.rvs(s, loc, scale, size=1)) / 100

5.3.4.4 Screening Coverage
^^^^^^^^^^^^^^^^^^^^^^^^^^

To view a write-up of the research background on lung cancer screening coverage in China, download :download:`this word document <screening_coverage_research_background.docx>`. 

The population-level coverage rates for *both* the primary and secondary target screening populations are defined below for both scenarios. Note that the figure represents the population coverage rate, although we will model differences in the sex-specific coverage rates, as described below. 

Note that considerations of additional differential coverage rates by variables such as  age likely exist but are not considered in our simulation, which is a limitation of our model.

.. image:: screening_coverage_plot.png

The above figure demonstrates the overall screening coverage rates that should be used in our model. Specifically, the baseline scenario population coverage rate for the primary screening target population should be 5.9% from 2020 to 2040. The alternative scenario population coverage rate for the primary screening target population should remain at 5.9% before starting to scale up from 5.9% in 2021 at a rate of one percent per year until 2030 and then remain constant from 2030 to 2040. For both scenarios, the coverage rate for the secondary screening target population should be 50% of the coverage rate for the primary screening target population.

.. todo::

  Determine when scale up ends for other cancer sites (begining, middle or end of 2030) in order to calculate ending coverage rate

**Sex Differences**

A study conducted by [Guo-et-al-2020]_ on participation in a population-based LDCT lung cancer screening study in cities in Henan, China, females were significantly more likely to participate in the screening program (OR: 1.69, 95% CI: 1.56, 1.83). Values for this OR should be sampled at the draw level from a normal distribution with a mean of 1.69 and standard deviation of 0.068 (note that the confidence interval is not exactly symmetric, so this distribution is shifted very slightly down from the confidence interval).

The value for We will use this differential probability of attending a screening in our model such that:

+---------------------------------------------------------+
| Hypothetical cross-sectional 2x2 table                  |
+----------------+-------------+---------------+----------+
|                | Attended    |Did not attend | Total    |
|                | screening   |screening      |          |
+----------------+-------------+---------------+----------+
| Female         |  a          |  b            | a+b      |
|                |             |               |          |
+----------------+-------------+---------------+----------+
| Male           |  c          |  d            | c+d      |
|                |             |               |          |
+----------------+-------------+---------------+----------+
| Total          | a+c         | b+d           | a+b+c+d  |
+----------------+-------------+---------------+----------+ 

For the primary screening target population and secondary screening target population, separately, the following is true:

(1) :math:`1 = a + b + c + d`
(2) :math:`OR = \frac{ad}{cb}`
(3) :math:`coverage = \frac{a + c}{a + b + c + d} = a + c`
(4) :math:`fraction_F = \frac{a + b}{a + b + c + d} = a + b`
(5) :math:`fraction_M = 1 - fraction_F`
(6) :math:`fraction_M = \frac{c + d}{a + b + c + d} = c + d`

So then,

  :math:`a = coverage - c`

  :math:`b = fraction_F - (coverage - c) = fraction_F - coverage + c`

  :math:`c = c`

  :math:`d = fraction_M - c`

And,

  :math:`OR = \frac{(coverage - c)(fraction_M - coverage)}{c(fraction_F - coverage + c)}`

  :math:`OR * c^2 + OR * (fraction_F - coverage) * c = c^2 - (coverage + fraction_M) * c + coverage * fraction_M`

  :math:`0 = (1 - OR) c^2 - OR (coverage + fraction_M)(fraction_F - coverage) c + coverage * fraction_M`

Now, we can solve for c using the quadratic equation such that:

  :math:`c = \frac{- quad_b - \sqrt{quad_b ^ 2 - 4 *quad_a * quad_c}}{2quad_a}`

Where,

  :math:`quad_a = 1 - OR`

  :math:`quad_b = - OR(coverage + fraction_M)(fraction_F - coverage)`

  :math:`quad_c = coverage * fraction_M`


Therefore,

:math:`fraction_F` should be calculated *at each timestep* of the simulation specific to the primary or secondary target screening population as defined below:

.. math::

  fraction_F = \frac{n_\text{females in given target population}}{n_\text{simulants in given target population}}

The following provides code to calculate sex-specific screening coverate rates within a given target screening population based on the equations and values defined above:

.. code-block:: Python

  import math, scipy.stats

  OR = scipy.stats.norm.rvs(1.69, 0.068)
  coverage = 0.1 # this is a stand-in value; it should be implemented as a time-varying function in the simulation, as described above
  fraction_f = 0.5 # this is a stand-in value; it should be implemented as a time-varying function in the simulation as described above
  fraction_m = 1 - fraction_f

  quad_a = (1 - OR)
  quad_b = - (coverage + fraction_m) - (fraction_f - coverage) * OR
  quad_c = coverage * fraction_m

  c = (-quad_b - math.sqrt(quad_b**2 - 4 * quad_a * quad_c)) / (2 * quad_a)

  a = coverage - c
  b = fraction_f - (coverage - c)
  d = (1 - fraction_f) - c

  female_coverage_rate = a / (a + b)

  male_coverage_rate = c / (c + d)

.. _swlc5.4:

5.4 Input data sources
----------------------

.. _swlc5.5:

5.5 Output meta-table shell
---------------------------

.. csv-table:: Output table shell metadata
  :file: output_table_shell.csv
  :header-rows: 1

.. _swlc6.0:

6.0 Validation and verification
+++++++++++++++++++++++++++++++

.. _swlc7.0:

7.0 Limitations
+++++++++++++++

- Assumes that lung cancer screening programs have no effect on smoking behaviors. This assumption is somewhat supported by [Slatore-et-al-2014]_, although there is no evidence that this conclusion is generalizable to the Chinese population. This could lead to unmodeled increased or decreased lung cancer detection rates in the later years of the alternative scenario, depending on the direction of the association.
- We assume that there is no recurrence of lung cancer. Because screening behaviors are likely different in the population recovered from lung cancer relative to the general population, we do not capture this complexity as prior cancer history as an additional risk factor for lung cancer screening behavior and lung cancer incidence, which may cause us to underestimate the impact of screening slightly. 
- We assume that tracheal, bronchus, and lung cancers are interchangeable with lung cancer with respect to mean sojourn time, overdiagnosis, and screening sensitivity.
- We assume that there are no changes in smoking exposure distributions at the age- and sex-specific level from 2019 to 2040 with respect to the prevalence of current, former, and never smokers as well as to the distribution of pack-years among former smokers and years since quitting among former smokers. This may cause us to over or under estimate screening coverage in the later years of the simulation depending on the direction of the exposure trends over time, when coverage is targeted to the smoking population.
- We assume that the relative risks for smoking apply equally to the incidence rates of the preclinical and indolent lung cancer states. However, there is evidence that smoking may not be as strongly associated with indolent lung cancer as it is with clinical lung cancer (CITE). This may cause us to overestimate the impact of screening when screening is targeted to the smoking population. 
- We assumed coverage rates for lung cancer screening due to a lack of sufficient data on coverage rates in China. 
- We assumed a screening specificity of 100 percent such that there are no false positive lung cancer screenings in our model. This was done because insurance pay outs are assumed to only occur after complete confirmation of lung cancer; however, this assumption fails to consider the negative impacts of false positive screening results (health care costs, patient anxiety, morbidity due to unnecessary procedures, etc.) as an outcome associated with lung cancer screening programs. 
- We assumed that deaths that occur with undetected indolent or preclinical lung cancer remain undetected upon death (note there are no deaths due to indolent or preclinical lung cancer in our model because they are by definition asymptomatic). it is possible that some previously undetected indolent or preclinical lung cancers may be detected upon death at autoposy, in which case we may slightly underestimate lung cancer detection rates.
- We assumed that the lung cancer mean sojourn time parameter applied to the duration of the preclinical lung cancer state for all simulants in the model and did not consider variation in the preclinical state duration at the individual simulant level. Further, we assumed that lung cancer was detected via symptomatic presentation at the moment of symptom onset (i.e. upon transition to the clinical lung cancer state) and did not consider a distribution of lead time delays between symptom onset and detection via symptomatic presentation. The failure to consider variation in the MST at the individual level (which would likely be right skewed) may cause us to underestimate the impact of screening on lung cancer detection rates in the youngest age groups.

.. _swlc8.0:

8.0 References
++++++++++++++

.. [Blom-et-al-2019]

  Blom EF, Ten Haaf K, Arenberg DA, de Koning HJ. Treatment capacity required for full-scale implementation of lung cancer screening in the United States. Cancer. 2019 Jun 15;125(12):2039-2048. doi: 10.1002/cncr.32026. Epub 2019 Feb 27. PMID: 30811590; PMCID: PMC6541509. `<https://pubmed.ncbi.nlm.nih.gov/30811590/>`_.

.. [Jemal-and-Fedewa-2017]

  Jemal A, Fedewa SA. Lung Cancer Screening With Low-Dose Computed Tomography in the United States-2010 to 2015. JAMA Oncol. 2017 Sep 1;3(9):1278-1281. doi: 10.1001/jamaoncol.2016.6416. PMID: 28152136; PMCID: PMC5824282. `<https://pubmed.ncbi.nlm.nih.gov/28152136/>`_.

.. [Li-et-al-2018]

  Li X, Zhou Q, Wang X, Su S, Zhang M, Jiang H, Wang J, Liu M. The effect of low insurance reimbursement on quality of care for non-small cell lung cancer in China: a comprehensive study covering diagnosis, treatment, and outcomes. BMC Cancer. 2018 Jun 25;18(1):683. doi: 10.1186/s12885-018-4608-y. PMID: 29940893; PMCID: PMC6019825. `<https://pubmed.ncbi.nlm.nih.gov/29940893/>`_.

.. [Lin-et-al-2019]

  Lin Y, Ma J, Feng J, Zhang Q, Huang Y. [Results of Lung Cancer Screening among Urban Residents in Kunming]. Zhongguo Fei Ai Za Zhi. 2019 Jul 20;22(7):413-418. Chinese. doi: 10.3779/j.issn.1009-3419.2019.07.02. PMID: 31315779; PMCID: PMC6712263. `<https://pubmed.ncbi.nlm.nih.gov/31315779/>`_.


.. [Guo-et-al-2020]

  Guo LW, Zhang SK, Liu SZ, Yang FN, Wu Y, Zheng LY, Chen Q, Cao XQ, Sun XB, Zhang JG. [Compliance of lung cancer screening with low-dose computed tomography and influencing factors in urban area of Henan province]. Zhonghua Liu Xing Bing Xue Za Zhi. 2020 Jul 10;41(7):1076-1080. Chinese. doi: 10.3760/cma.j.cn112338-20190730-00564. PMID: 32741174. `<https://pubmed.ncbi.nlm.nih.gov/32741174/>`_.

.. [Slatore-et-al-2014]

  Slatore CG, Baumann C, Pappas M, Humphrey LL. Smoking behaviors among patients receiving computed tomography for lung cancer screening. Systematic review in support of the U.S. preventive services task force. Ann Am Thorac Soc. 2014 May;11(4):619-27. doi: 10.1513/AnnalsATS.201312-460OC. PMID: 24701999. `<https://pubmed.ncbi.nlm.nih.gov/24701999/>`_.

.. [Smith-et-al-2019]

  Smith RA, Andrews KS, Brooks D, Fedewa SA, Manassaram-Baptiste D, Saslow D, Wender RC. Cancer screening in the United States, 2019: A review of current American Cancer Society guidelines and current issues in cancer screening. CA Cancer J Clin. 2019 May;69(3):184-210. doi: 10.3322/caac.21557. Epub 2019 Mar 15. PMID: 30875085. `<https://pubmed.ncbi.nlm.nih.gov/30875085/>`_.

.. [Qiao-et-al-2020]

  Qiao L, Zhou P, Li B, Liu XX, Li LN, Chen YY, Ma J, Zhao YQ, Li TY, Li Q. Performance of low-dose computed tomography on lung cancer screening in high-risk populations: The experience over five screening rounds in Sichuan, China. Cancer Epidemiol. 2020 Oct 2;69:101801. doi: 10.1016/j.canep.2020.101801. Epub ahead of print. PMID: 33017728. `<https://pubmed.ncbi.nlm.nih.gov/33017728/>`_.

.. [Wei-et-al-2020]

  Wei MN, Su Z, Wang JN, Gonzalez Mendez MJ, Yu XY, Liang H, Zhou QH, Fan YG, Qiao YL. Performance of lung cancer screening with low-dose CT in Gejiu, Yunnan: A population-based, screening cohort study. Thorac Cancer. 2020 May;11(5):1224-1232. doi: 10.1111/1759-7714.13379. Epub 2020 Mar 20. PMID: 32196998; PMCID: PMC7180575. `<https://pubmed.ncbi.nlm.nih.gov/32196998/>`_.
