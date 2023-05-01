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


.. _2017_concept_model_vivarium_swissre_stomachcancer:

=====================================
Vivarium CSU Stomach Cancer Screening
=====================================

.. contents::
  :local:

+------------------------------------+
| List of abbreviations              |
+=======+============================+
| GC    | Gastric cancer             |
+-------+----------------------------+
| G     | non-atrophic gastritis     |
+-------+----------------------------+
| AG    | atrophic gastritis         |
+-------+----------------------------+
| CAG   | chronic atrophic gastritis |
+-------+----------------------------+
| IM    | intestinal metaplasia      |
+-------+----------------------------+
| DYS   | dysplasia                  |
+-------+----------------------------+
| LGIN  | low-grade intra-epithelial |
|       | neoplasm/dysplasia         |
+-------+----------------------------+
| HGIN  | high-grade intra-epithelial|
|       | neoplasm/dysplasia         |
+-------+----------------------------+
| PC    | pre-clinical cancer        |
+-------+----------------------------+
|pre-can| pre-cancerous states       |
+-------+----------------------------+
| HP    | H. pylori                  |
+-------+----------------------------+
| ITT   | intention-to-treat         |
+-------+----------------------------+


.. _swsc1.0:

1.0 Background
++++++++++++++

Stomach/gastric cancer (GC) epidemiology and risk factors Gastric carcinogenesis is a multifactorial, multistep process. Host factors include blood group A, pernicious anemia, prior gastric surgery, family history, hereditary diffuse GC, and genetic syndromes. Smoking, salt, salty and smoked food, red meat, obesity, and low socioeconomic status are environmental factors. Moreover, infection with Helicobacter pylori and Epstein–Barr virus also play a role in gastric carcinogenesis. Information on these risk factors helps characterize individuals at risk of GC during their lifetime. Furthermore, identification of premalignant lesions is important for the purpose of screening and surveillance. Premalignant lesions of GC include atrophic gastritis (AG), intestinal metaplasia (IM), and dysplasia (DYS). It has been estimated that annually 0%–1.8%, 0%–10%, and 0%–73% of the patients with AG, IM, and dysplasia, respectively, progress to GC. The wide variations on the reported progression rates may result from differences in the study design, recruited population, and definitions. The Netherlands cohort study also revealed that premalignant lesions would progress to GC with an annual incidence of 0.2% from AG, 0.25% from IM, 0.6% from mild-to-moderate dysplasia, and 6% from severe dysplasia. 
  
Endoscopic surveillances in individuals with premalignant lesions may detect GC at an early and curable stage and therefore improve their survival. Prognosis of upper gastrointestinal cancer depends largely on disease stage at diagnosis. The survival rate is less than 10% when diagnosed at an advanced stage but is as high as 85% if detected at an earlier stage. Endoscopic screening can potentially prevent upper gastrointestinal cancers by early diagnosis and early treatment and has been widely adopted in screening programmes. Developed countries such as Japan and South Korea have launched nationwide endoscopic screening programmes. While developing countries such as China and Iran conduct endoscopic screening only in high risk areas due to a larger cancer burden, capabilities of local doctors and availability of technology.

.. image:: stomach_diagram.svg

Stomach cancers tend to develop slowly over many years. Before a true cancer develops, pre-cancerous changes often occur in the inner lining (mucosa) of the stomach. These early changes rarely cause symptoms and therefore often go undetected. Most (about 90% to 95%) cancers of the stomach are adenocarcinomas. A stomach cancer or gastric cancer almost always is an adenocarcinoma. These cancers develop from the cells that form the innermost lining of the stomach (the mucosa). Correa pointed out that the human gastric carcinogenesis is a slow progressive, multistep, and multifactorial pathology process. The multistep process is composed of chronic superficial gastritis, atrophy gastritis, intestinal metaplasia (IM), dysplasia (DYS), and adenocarcinoma (malignant neoplasm).

 -  Note that there are cardia (50-60%) and non-cardia cancers (40-50%) both classified by GBD as stomach cancers
 -  Cardia cancers are not associated with H. pylori infection while non-cardia cancers are. There is evidence written that says cardia cancers may be protected by H. pylori. Incidence is cardia cancers are rising while stomach cancer overall and non-cardia cancers are decreasing. There is some suggestion in the literature that cardio cancers may be rising due to H. pylori eradication campaigns. 
 - This model does not make the distinction between cardio or non-cardia cancers. We use relative risks and H. pylori treatment efficacy for all gastric cancers. 

.. image:: correa_cascade.svg

.. image:: stomachcancer_lifehistory.svg

.. _swsc1.1:

1.1 Project overview
--------------------

This project aims to compare gastric cancer detected symptomatically without a population wide endoscopy screening programme vs. gastric cancer detected with a population endoscopic screening programme that would be able to detect pre-clinical (asymptomatic) stomach cancers. We want to quantify how many more cancers the screening programme will detect. 

.. _swsc1.2:

1.2 Literature review
---------------------



.. _swsc2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++

To estimate the yearly number of cases of stomach cancer detected under specific screening practices in order to identify pay-out trends for critical insurance claims (CII).  

.. _swsc3.0:

3.0 Causal framework
++++++++++++++++++++

.. _swsc3.1:

3.1 Causal diagram
------------------

**Outcome (O)**:

  - stomach cancer 

**Exposure (E)**:
  
  - h.pylori infection



.. _swsc3.2:

3.2 Effect and impact size
--------------------------

See below risk factor model 2

.. _swsc4.0:

4.0 Intervention
++++++++++++++++

Scale-up of stomach cancer screening using ABC method with endoscopic surveillance among insured population from 5% in 2020 to 30% in 2030 and hold constant until 2040. 

.. _swsc4.1:

4.1 Simulation scenarios
------------------------

:underline:`Baseline scenario`

* we assume a 5% ABC cancer risk screening with endoscopic surveillance.


:underline:`Alternative scenario`

In the alternative scenario, there will be a scale up of ABC screening starting from 5% to 30% as indicated in the coverage figure (orange line) below. 

.. image:: stomach_cancer_screening_coverage.svg
 

.. _swsc5.0:

5.0 Vivarium modelling strategy
+++++++++++++++++++++++++++++++

.. _swsc5.1:

5.1 Vivarium concept model 
--------------------------

.. image:: vivarium_concept_model_diagram_stomachcancer.svg

.. _swsc5.2:

5.2 Demographics
----------------

.. _swsc5.2.1:

5.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Cohort type: Closed cohort of 200,000 insured male (50%) and female (50%) simulants
* Age and sex: Aged 15 to 95+, 5 year-age bands, uniformly distributed age and sex structure
* Time span: Jan 1, 2020 to Dec 31, 2040 with 36.5-day time-steps. 
* Currently assume the sim population buys insurance on the first day of sim start. This means no one has prior insurance and were paid out for their cancers before sim start. 

.. _swsc5.2.2:

5.2.2 Location description
~~~~~~~~~~~~~~~~~~~~~~~~~~

Provinces to model include Tianjin, Jiangsu, Guangdong, Henan, and Heilongjiang. The same population distribution of age and sex will be used among the different provinces.


+-----------------------------------+
| Population size weight table      |
+============+=============+========+
| Province   | location_id | Weight |
+------------+-------------+--------+
| Tianjian   |  517        | 18%    |
+------------+-------------+--------+
| Jiangsu    |  506        | 28%    |
+------------+-------------+--------+
| Guangdong  |  496        | 22%    |
+------------+-------------+--------+
| Henan      |  502        | 16%    |
+------------+-------------+--------+
| Heilong-   |  501        | 16%    |
| jiang      |             |        |
+------------+-------------+--------+

file paths for 2019 forecast data:

   * ACMR (per person-year): /ihme/csu/swiss_re/forecast/294_deaths_12_29_ng_smooth_13.csv
   * incidence (cases per person-year):  /ihme/csu/swiss_re/forecast/414_incidence_12_29_ng_smooth_13.csv
   * prevalence (proportion): /ihme/csu/swiss_re/forecast/414_prevalence_12_29_ng_smooth_13.csv
   * cause-specific mortality (per person-year): /ihme/csu/swiss_re/forecast/414_deaths_12_29_ng_smooth_13.csv

.. note::

 - Multiply acmr, csmr and incidence by 100,000 to get cases per 100,000 person-years.
 - See column **noised_forecast** for output value.


.. _swsc5.3:

5.3 Models
----------

.. _swsc5.3.1:

5.3.1 Core stomach cancer model 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. image:: state_diagram.svg

see :ref:`stomach cancer model <2017_stomach_cancer>`

Data Sources Table

+----------------------+----------------------------+-----------------------------------+-------------------------------------------+
| Input parameter      | Value                      | Note                              | Reference                                 |
+----------------------+----------------------------+-----------------------------------+-------------------------------------------+
| Mean sojourn time    |  2.37 years                | The UI from Bae is actually       | Bae J Prev Med Pub Health 2014            |
|                      |  (95%CI: 1.78 to 2.96)     | (95%CI: 1.92 to 2.96) which is    |                                           | 
|                      |                            | skewed. To make a symmetrical     |                                           |      
|                      |                            | normal distribution, we make the  |                                           | 
|                      |                            | lower bound shorter to 1.78       |                                           |
+----------------------+----------------------------+-----------------------------------+-------------------------------------------+


Full references

  - Bae J-M, Shin SY, Kim EH. Mean Sojourn Time of Preclinical Gastric Cancer in Korean Men: A Retrospective Observational Study. J Prev Med Pub Health 2014; 47: 201–5.

Validation and verification

  - i_pc should validate to ~ i_c414/(1-prev_c414) shifted by the 2.37 years forward. i_c414 and prev_c414 comes from forecast.
  - i_c should validate to ~ 1/MST
  - prevalence of pc ~ i_pc/(1-prev_c414) X 2.37 
  - prevalence of C should be 0 at the start and eventually catch up to forecast prevalence in later years (sooner than MST + 10)
  - EMR for clinical cancers should validate to CSMR/prev_c414 from forecasts.

Assumptions and limitations
 
  - The MST was derived from a population of Korean men. 
  - We do not use age-specific or sex-specific MST. Nor do we use different MSTs for HP risk factor exposure category. 
  - We shifted the lower bound of the MST to 1.78 which is 1.6 months shorter for lower bound of the population ~approximately 5%. This means that these simulants in the lower bound stay in the PC state shorter than the Bae distribution suggests. Since the shortest screening interval is 1 year (1.6 months/12 months ~ 0.13) for the highest risk branch (H+, A-), this would only affect a very small fraction of the simulation. 


.. _swsc5.3.2:

5.3.2 H. pylori risk factor model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

:underline:`Incidence of cancer by H. pylori status`


- Let H. pylori infection be denoted by the subscript hp
- Let the true prevalence of H. pylori be :math:`P_{hp_{true}}`
- Let i_pc be the overall incidence from S state to PC state (:ref:`see stomach cancer model for i_pc value <2017_stomach_cancer>`)
- Let incidence among those with H. pylori be  :math:`i_{pc{|hp+}}`
- Let incidence among those without H. pylori be :math:`i_{pc{|hp-}}`
- Let PAF be the population attributable fraction of H. pylori for gastric cancer
- Let RR be the ratio of the probability of developing cancer in the exposed to H. pylori group versus unexposed group.

(1) :math:`RR_{hp}` = 1.89 (95%CI: 1.57 to 2.26) [Jiang Eur J Clin Microbiol Infect Dis 2017]
(2) :math:`P_{hp_{true}}` = see calculation below
(3) PAF = :math:`\frac{P_{hp_{true}}(RR_{hp}-1)}{1+P_{hp{_true}}(RR_{hp}-1)}` 
(4) 1-PAF = 
(5) :math:`i_{pc{|hp+}} =  i_{pc}\times(1-PAF)\times RR_{hp}`
(6) :math:`i_{pc{|hp-}} =  i_{pc}\times(1-PAF)`
(7) use normal distribution for uncertainty ranges

.. note:: 

  The prevalence of HP was obtained from systematic review and meta-analysis of representative studies for 12 provinces, 2 of which are part of our blended provinces: Tianjin, and Jiangsu from Chen et al. Lancet Global Health 2019 (appendix). Since the prevalence of HP was estimated from studies using different HP detection tests, we assume a 95% sensitivity and specificity as a combined average for the tests used in the meta-analysis to estimate the true HP prevalence. 

  - serology (varies depending on antigen used): 97.6% sensitivity and 96.2% specificity for recomLine
  - urea breath test: 95% sensitvity and specificity
  - stool antigen: 94% sensitvity and 97% specificity
  - Campylobacter-like organism or histopathology: invasive and considered gold standard

  Sensitivity and specificity of screening tests were obtained from Wang 2015. These values can vary depending on the specific make of the test used and conditions. 


True prevalence of HP :math:`P_{hp_{true}}`

+-------------+---------------+----------------+---------+
| H. pylori   |   True HP+    |   True HP-     | total   | 
+-------------+---------------+----------------+---------+
| screen HP + |     a         |     b          | a+b     |
+-------------+---------------+----------------+---------+
| screen HP - |     c         |     d          | c+d     |
+-------------+---------------+----------------+---------+
| total       |    a+c        |    b+d         | a+b+c+d |
+-------------+---------------+----------------+---------+


(1) sensitivity a/(a+c) = 0.95
(2) specificity d/(b+d) = 0.95
(3) HP prevalence by screen :math:`P_{hp_{screen}}` = (a+b)/(a+b+c+d) = 0.4457 (95%CI: 0.4141 to 0.4778) [Chen Lancet Global Health 2019]
(4) a+b+c+d = 10,000 (this is just a simple whole number to work with)
(5) use normal distribution for uncertainty ranges ``standard_error = (upper_CI_limit - lower_CI_limit)/3.92``

Proof of the solve is here :download:`Equation solutions<solving_equations.docx>`


.. code-block:: python

    First solve for c: 

    18c + 500 = 0.4457 (95%CI: 0.4141 to 0.4778)

    Then
    a = 19c
    b = 500 -c
    d = 19b

  For example: solving the 4 equations using the mean of P_hp_screen = 0.4457:

    - a =  4180 (true positive)
    - b =  280 (false positive) 
    - c =  220 (false negative)
    - d =  5320 (true negative) 

  we get the true HP prevalence = (a+c)/1000 = 4397/10,000 = 0.4400 (solve for variables a-d by draw to obtain UIs)

Data Sources Table

+----------------------+----------------------------+-------------------------------+-------------------------------------------+
| Input parameter      | Value                      | Note                          | Reference                                 |
+----------------------+----------------------------+-------------------------------+-------------------------------------------+
| Relative risk of HP  | 1.89 (95%CI: 1.57 to 2.26) | Normal distribution           | Jiang Eur J Clin Microbiol Infect Dis 2017|
+----------------------+----------------------------+-------------------------------+-------------------------------------------+
| Screen prevalence    | 0.4457                     | Normal distribution           | Chen Lancet Global Health 2019            |
| of HP                | (95%CI: 0.4141 to 0.4778)  |                               |                                           |
+----------------------+----------------------------+-------------------------------+-------------------------------------------+
| HP test accuracy     | 95% sensitivity/specificity| Assumed average of tests      | Wang World J Gastroenterol 2015           |
+----------------------+----------------------------+-------------------------------+-------------------------------------------+

Full references: 

  - Jiang J, Chen Y, Shi J, Song C, Zhang J, Wang K. Population attributable burden of Helicobacter pylori-related gastric cancer, coronary heart disease, and ischemic stroke in China. Eur J Clin Microbiol Infect Dis 2017; 36: 199–212.
  - Chen W, Xia C, Zheng R, et al. Disparities by province, age, and sex in site-specific cancer burden attributable to 23 potentially modifiable risk factors in China: a comparative risk assessment. Lancet Glob Health 2019; 7: e257–69.
  - Wang Y-K, Kuo F-C, Liu C-J, et al. Diagnosis of Helicobacter pylori infection: Current options and developments. World J Gastroenterol WJG 2015; 21: 11221–35.

Validation and verification

  - Make sure we have true HP+/- stratification
  - Validate that the external parameter of HP true prevalence should equal to ~  for all age bands
  - Validate the relative risk should equal to ~ 1.89 by calculating [cases of PC cancers among true HP+] / [cases of PC cancers among true HP-]

Assumptions and limitations
  
  - We use an adjusted relative risk and this may bias the estimation of our PAF when using the proportion of total population exposed to HP in the PAF equation. 
  - The prevalence of HP could be different in different regions, or rural/urban areas. We are applying the prevalence of HP from a meta-analysis of studies from 12 provinces to our blended population. 

.. _swsc5.3.3:

5.3.3 Prevalence of atrophy stratified by H. pylori status
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To make this section easier to follow, we define:

  - atrophy+ = with atrophic gastritis
  - atrophy- = without atrophic gastritis
  - p_atrophy+ = prevalence of atrophic gastritis (proportion)
  - f_atrophy+/- = fraction of the atrophic state that is H. pylori positive (proportion)
  

:underline:`A. Pre-cancerous state (chronic atrophic gastritis) for non-clinical cancer population`

Ideally we obtain age-specific distribution of the pre-cancer atrophic state prevalence from cross-sectional studies/cohort starting from young age in populations with similar risks of:

  - urban
  - China
  - H.pylori prevalence


We obtain the age-specific prevalence of atrophic gastritis from a retrospective hospital-based cross-sectional study, from the Sichuan Gastric Cancer Early Detection and Screening (SIGES) project. The study was conducted in West China Hospital, Sichuan University, a central high-volume teaching hospital at Sichuan province in the southwest of China. The period of the study was between May 2016 and May 2017. The subjects covered healthy controls, symptomatic cancer-free patients, and gastric cancer patients, who were managed or treated in West China Hospital. We obtain the age-specific atrophic gastritis prevalence from the results of **healthy controls** (n=9,425). Sex was not associated with risk of atrophic gastritis. 

.. note::

  This study seems more suitable to estimate atrophic state in our blended population than the Aoki 2005 study used in the last PR because 
   1) The estimated H. pylori prevalence in the study region is around 41.1% which is more similar to the prevalence we use. The prevalence of HP from the Aoki study was ~70% (Discussion section of Wang Scientific Reports 2020)
   2) The Wang study is more recent.
  

The following tables show the age specific atrophic gastritis prevalence from Wang & Chen Scientific Reports 2020

.. image:: prevalence_chronic_atrophic_gastritis_china.svg

+----------------------------------------+
| Age-specific prevalence                | 
| (p_atrohpy+) atrophy [Wang 2020]       | 
+===========+============+===============+
| age-bands | Atrophy +  | 95% CI        | 
+-----------+------------+---------------+
| <20       | 0.0000     | 0.0000-0.0000 |       
+-----------+------------+---------------+
| 20-39     | 0.0051     | 0.0022-0.0079 |
+-----------+------------+---------------+
| 40-59     | 0.0145     | 0.0114-0.0176 |
+-----------+------------+---------------+
| 60-79     | 0.0413     | 0.0301-0.0525 | 
+-----------+------------+---------------+
| 80+       | 0.0976     | 0.0067-0.188  | 
+-----------+------------+---------------+

Each row is a proportion out of 1. 

We first need to obtain an atrophy state. To do that we give every simulant an atrophy propensity. This propensity determines at what percentile of the risk exposure distribution they are. To obtain the propensity, assign each simulant a random number using a uniform distribution between 0 and 1 ``np.random.uniform()`` 

With the simulant's sex, age and atrophy propensity, use the tables above to figure out what atrophic state the propensity corresponds to and assign this to the simulant. If the propensity is < the proportion in the table, they are atrophic+. Update the simulant's atrophic state as they age through the simulation.   


:underline:`B. Obtain H. pylori status conditional upon age and atrophic state`
 
*H. pylori epidemiology*. We assume all individuals acquire H. pylori infection during childhood and, unless treated with antibiotics, remain infected. New infections and reinfection in adulthood are rare and will not be allowed in our model. 

To assign H. pylori status we give each simulant an H. pylori percentile using a uniform distribution between 0 and 1 ``np.random.uniform()``. Using the simulant's age and atrophic state obtained in the previous step, assign H. pylori status using the table below. Each cell is a proportion out of 1 which is the atrophic state they are in. The proportion is the fraction of the atrophic state that is H pylori positive. Those who have propensity below the fraction are positive. 

+--------------------------------------------------------------------+
| Fraction of atrophic state that is H. pylori positive (f_atrophy)  |   
| by age bands                                                       |
+===========+============================+===========================+
| age-bands |  Atrophy +                 | Atrophy -                 |
+-----------+----------------------------+---------------------------+
| age       |  f_atrophy+                | f_atrohpy-                |       
+-----------+----------------------------+---------------------------+    

To derive f_atrophy+ and f_atrophy- for the above table with uncertainty intervals using the following set of equations:

+----------------------------------------------------------+
| For each age group                                       | 
+===========+=================+=================+==========+
| H. pylori |   Atrophy +     |   Atrophy -     |  total   |
+-----------+-----------------+-----------------+----------+
| H+        |     a           |     b           |  a+b     |
+-----------+-----------------+-----------------+----------+
| H-        |     c           |     d           |  c+d     |
+-----------+-----------------+-----------------+----------+
| total     |     a+c         |     b+d         | a+b+c+d  |
+-----------+-----------------+-----------------+----------+

(1) a+b/(a+b+c+d) = :math:`P_{hp{-true}}`
(2) (a+c)/(a+b+c+d) = p_atrophy+ 
(3) a+b+c+d = 10,000 (this is just a simple whole number to work with)
(4) ad/bc = OR
(5) :math:`P_{hp{-true}}` = 0.4397 (use equations above to calculate true HP prevalence)
(6) OR = 3.8 (95%CI: 3.054 - 4.631) [Aoki Ann Epidemiology 2005] 
(7) f_atrophy+ = a/(a+c)
(8) f_atrophy- = b/(b+d)
(9) use normal distribution uncertainty ranges ``standard_error = (upper_CI_limit - lower_CI_limit)/3.92``

.. code-block::
 
 To solve for the variables a, b, c, d, let 

 H = P_hp_true x 10,000
 N = 10,000 - H
 A = P_atrophy x 10,000 (this value is age-specific)

 To solve for c, use the following quadratic equation with the above variables by draw-level

 (OR-1)c^2 + (HxOR - AxOR + A + N)c -AxN

 Then 
 a = A - c
 b = H - A + c
 d = N - c

 with a, c, b, and d, you can now solve for the age-specific values of f_atrophy+ and f_atrophy-

 Using an example with the means values of OR = 3.8, H = 4400, N = 5600 and A = 145 for age 40-59
    
    2.8c^2 + 21,914c – 812,000

    c ~ 37, a =107, b =4293, d =5562
    f_atrophy+ = a/(a+c) = 0.743
    f_atrophy- = b/(b+d) = 0.4356


The calculated values should look similar to this back of envelope calculation: see tab Wang 2020 :download:`Method workbook<precancer_states_and_hpylori_memo_28dec2020.xlsx>`

.. note::

  f_atrophy+ should be approximately 0.75 and f_atrophy- approximately 0.4. This is supported by the literature that estimates 70-90% of patients with chronic gastritis are infected with H. pylori [Fang Journal of Digestive Diseases 2018]

.. important::
  We only assign H. pylori status once at initialization and simulants will keep the same status throughout the sim - we will NOT update H. pylori status as the simulants move through the sim (this will not be true in the alternative scenario where we add screening and treatment for H. pylori). H.pylori status is binary: pos or neg. We assume the HP prevalence is consistent across all ages and sex.

Example: 

  Lets say we have a simulant Sally-Sim who is age 40. She has been randomly assigned atrophic percentile of 0.010 and h.pylori percentile of 0.5. Looking at the p_atrophy+ table, she is in the atrophic+ state for her percentile rank. Next, we determine her H. pylori status. Because she is atrophic, her H. pylori status will be determined by f_atrophy+ for her age group. Reading off the excel table, f_atrophy+ for 40-59 year olds is ~0.75. Hence, she is also H. pylori positive. 
 
Here is a notebook that describes the above steps:  



Data Sources Table

+----------------------+----------------------------+----------------------+------------------------------+
| Input parameter      | Value                      | Note                 | Reference                    |
+----------------------+----------------------------+----------------------+------------------------------+
| prevalence of atrophy| see tables                 |                      | Wang Scientific reports 2005 |
+----------------------+----------------------------+----------------------+------------------------------+
| odds ratio HP        | 3.8 (95%CI: 3.054 - 4.631) | Normal distribution  | Aoki Ann Epidemiol 2005      |
+----------------------+----------------------------+----------------------+------------------------------+


Full references: 

  - Wang R, Chen X-Z. Prevalence of atrophic gastritis in southwest China and predictive strength of serum gastrin-17: A cross-sectional study (SIGES). Sci Rep 2020; 10: 4523.
  - Aoki K, Kihaile PE, Wenyuan Z, et al. Comparison of Prevalence of Chronic Atrophic Gastritis in Japan, China, Tanzania, and the Dominican Republic. Ann Epidemiol 2005; 15: 598–606


Validation and verification:

  - Make sure we have atrophy+/- stratification
  - Validate that the atrophy prevalence should ~ the age-specific tables
  - The proportion of true HP+ among atrophic+ ~ 0.75 and the proportion of true HP+ among atrophic- ~ 0.40 (back of envelope calculation in xlsx)


Assumptions and limitations:

  - We assume prevalence of HP is consistent across sex and age groups. 
  - We assume HP prevalence among susceptibe population is the same as that of the whole population obtained from literature. Because the prevalence of cancer is low (in the order of 10^-3), the prevalences among the S population and whole population are very similar. 
  - The age-specific prevalence of atrophy was taken from a one hospital based study in Sichuan. Their risk profile (atrophic status) might be similar to the insured population.  
  - We assume the OR is for the true prevalence of H. pylori among the atrophic states although it was obtained among studies with screen prevalence of HP.
  - We assume that the OR is generalisable to a different population.


.. _swsc5.3.4:

5.3.4 Screening and detection model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This screening model will be applied in the baseline and alternative scenario. Apply first ABC screening coverage to those who are 40 years old and above using the screening scale-up figure below. Simulants' first screen will be using the non-invasive ABC method delineated by Chen 2018 which combines H. pylori antibody test and serum pepsinogen (PG) test for atrophy.

:underline:`1. Cancer risk screening with ABC`

We model ABC screening  in the baseline and alternative scenario. All simulants are eligible for screening. The current screening coverage (orange line in the graph) is the proportion of simulants who will attend their first screening. The screening coverage is **cumulative**. Only simulants aged 40 and above will be covered. We can model the first screen attendance uniformly distributed within the first year of coverage. For example, in 2020, 5% (the screening coverage in 2020) of simulants aged 40 and above will recieve a first screen within the first year (before 2021). If the screening coverage in 2021 is 6%, then 1% more simulants will attend first screening in 2021. 

Based on the simulants H. pylori status by **screen test**, and atrophy state, they will be due their next screening according to the screening branch. Make sure we track simulants' H. pylori true status, H. hylori screen status, and H. pylori treatment status. Note that the screening tree branches by simulants H. pylori screening status but the simulants cancer incidence follows the H. pylori true status. 


.. image:: stomach_cancer_screening_coverage.svg

:underline:`2. Screening frequency from outcome of ABC screening`

Stomach cancer screening algorithm was derived from the 2019 guidelines from the China Anti-Cancer Association and National Clinical Research Center for Cancer. All simulants will follow this decision tree to decide if they are due a subsequent screening. The decision tree branches according to:  

   1) Pre-cancer state (atrophy vs no atrophy)
   2) H pylori status

.. image:: stomachcancer_screening_tree.svg

+--------------------------------------------------------------------------------+
| Screening frequency by H.pylori and atrophy status (ABC method)                | 
+=======================+============================+===========================+
| Pre-cancer            | H. pylori negative (-)     | H. pylori positive (+)    |
| States                | from screening test        | from screening test       |        
+-----------------------+----------------------------+---------------------------+
|  atrophy -            | Branch 1 (A)               |  Branch 2 (B)             |
|                       | repeat ABC every 5 years   |  endoscopy every 3 years  |
+-----------------------+----------------------------+---------------------------+                                                   
|  atrophy +            | Branch 4 (D)               | Branch 3  (C)             |
|                       | endoscopy every 1 year     | endoscopy every 2 years   |          
+-----------------------+----------------------------+---------------------------+          


H. pylori antibiody test [Chen Chin Med J (Engl) 2018]

  - sensitivity 91.2%
  - specificity 97.4% 

Serum pepsinogen test [Miki Gastric Cancer 2006]

  - For non-**C** population: When simulants attend their first ABC cancer risk screening, PC cancers will be detected with 77% sensitivity. We also assume that simulants who have a false positive pepsinogen test would have their false positive detected during endoscopic follow-up and so we use a specificity of pepsinogen test with endoscopic confirmation of 98%.

H. pylori eradication success rate using standard bismuth-containing quadruple therapy for 10 or 14 days [Du 2020]

  -  ITT efficacy: 87.9% (95%CI: 81.7–94.0%) [Liang Clin Gastroenterol Hepatol 2013]

.. note::

  - We do not model treatment for atrophy as [Zhang Gastroenterology 2018] suggests that endoscopy screening has no effect on incidence of stomach cancer.
  - Not that our mortality model from the alternative screening scenario will not be accurate because we do not model the reduction (40% reduction in the RR) in gastric cancer mortality from endoscopic screening. 

:underline:`3. Subsequent screenings`

  (1) We model that 100% of simulants who are due for another ABC test (Branch 1, group A) will attend. The simulants who have prior transitioned to PC cancer (despite their atrophy state at this point) will have their cancer picked up by serum pepsinogen test with 77% sensitivity (in real life, they are referred to endoscopy which detects the cancer). False negative PC cases (23%) will return to the screening branches as atrophy -ve. They will either continue surveillence as group A or group B depending on their H. pylori status at the time. 

  (2) Those who are due for subsequent endoscopic screening (branch 2-4 , group B-D), the proportion who will show up at their scheduled screening time will be normally distributed around 18.4% (95%CI: 18.1%‐18.7%). [Guo Cancer Medicine 2019]

  (3) 100% of PC cancers will be picked up by endoscopy

For example

  If our simulant Sally-Sim is cancer-free, with H. pylori + and atrophy +. She goes for her first ABC screening in 2020 and she falls under Branch 3 and is due a screening in 2 years which is 2022. The probability she attends that screening is 18.4%. Whether or not she attends that screening, she will be due for another endoscopy in 2 years in 2024 and the probability she will attend that is also 18.4% and so on and so forth. 

.. note::
  
  We can also model a probability of attending a catch-up screening if simulant misses the scheduled screening. To keep it simple, we are not allowing catch-up screenings for that but we may incorporate is we feel is necessary later on. 


Data Sources Table

+----------------------+----------------------------+-------------------------------+-------------------------------------------+
| Input parameter      | Value                      | Note                          | Reference                                 |
+----------------------+----------------------------+-------------------------------+-------------------------------------------+
| screening tree       | see figure                 |                               | Chinese guidelines                        | 
+----------------------+----------------------------+-------------------------------+-------------------------------------------+
| screening technology | HP test sensitivity 91.2%  |                               | Chen Chin Med J (Engl) 2018               |
|                      | specificity 97.4%          |                               |                                           |
+----------------------+----------------------------+-------------------------------+-------------------------------------------+
| Serum pepsinogen     | 77% to detect atrophy/     | pepsinogen I level <=70 ng/ml | Miki Gastric Cancer 2006                  |
| sensitivity          | cancer among PC cases      | pepsinogen I/II ratio <=3     |                                           |
+----------------------+----------------------------+-------------------------------+-------------------------------------------+
| Serum pepsinogen     | 98% after endoscopic       |                               |                                           |
| specficity           | confirmation               |                               |                                           |
+----------------------+----------------------------+-------------------------------+-------------------------------------------+
| HP treatment efficacy| 87.9% (95%CI: 81.7–94.0%)  | Normal distribution, ITT      | Liang Clin Gastroenterol Hepatol 2013     |
+----------------------+----------------------------+-------------------------------+-------------------------------------------+
| Endoscopy uptake     | 18.4% (95%CI: 18.1%‐18.7%) | Normal distribution           | Guo Cancer Medicine 2019                  |
+----------------------+----------------------------+-------------------------------+-------------------------------------------+
| ABC follow-up        | 100%                       |                               | Assumption, follows coverage curve        |
+----------------------+----------------------------+-------------------------------+-------------------------------------------+


Full references: 

  - National Health Commission of the People’s Republic of China. Chinese guidelines for diagnosis and treatment of gastric cancer 2018 (English version). Chin J Cancer Res 2019; 31: 707–37.
  - Chen X-Z, Huang C-Z, Hu W-X, Liu Y, Yao X-Q. Gastric Cancer Screening by Combined Determination of Serum Helicobacter pylori Antibody and Pepsinogen Concentrations: ABC Method for Gastric Cancer Screening. Chin Med J (Engl) 2018; 131: 1232–9.
  - Du Y, Zhu H, Liu J, et al. Consensus on eradication of Helicobacter pylori and prevention and control of gastric cancer in China (2019, Shanghai). J Gastroenterol Hepatol 2020; 35: 624–9
  - Liang X, Xu X, Zheng Q, Zhang W, Sun Q, Liu W, et al. Efficacy of bismuth-containing quadruple therapies for clarithromycin-, metronidazole-, and fluoroquinolone-resistant Helicobacter pylori infections in a prospective study. Clin Gastroenterol Hepatol. 2013 Jan 29; doi: 10.1016/j.cgh.2013.01.008
  - Guo Determinants of participation and detection rate of upper gastrointestinal cancer from population‐based screening program in China. Cancer Medicine. 2019;8:7098–7107.
  - Zhang X, Li M, Chen S, et al. Endoscopic Screening in Asian Countries Is Associated With Reduced Gastric Cancer Mortality: A Meta-analysis and Systematic Review. Gastroenterology 2018; 155: 347-354.e9
  - Miki K. Gastric cancer screening using the serum pepsinogen test method. Gastric Cancer. 2006;9:245–253


Validation and verification:
 
 - validate screening coverage among total population is ~ orange line in the coverage curve.


Assumptions and limitations:

 - We initialized the simulation without PC simulants having higher probability of endoscopy which would detect their PC cancer. This would underestimate the detection of PC cancers that were initialized into the sim. However, this population is very small and is a minor limitation.
 


.. _swsc5.3.5:

5.3.5 Gastic cancer incidence after ABC screening among susceptible population
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Meta-analysis of 14 studies by Lee 2016 showed reduction in the incidence rate ratio of gastric cancer among asymptomatic individuals with H. pylori eradication of 0.62 (95%CI: 0.49-0.79). We apply this rate ratio to H. pylori +ve simulants who recieve successful eradication. This meta-analysis supports no differential efficacy among pre-cancer states. 

+-------------------------------------------------------------------------+
| Gastric cancer incidence after outcome of screening and treatment       |
+===============================+=========================================+
|  HP + without treatment       | :math:`i_{pc{|hp+}}`                    |
|  or with unsuccessful         |                                         |
|  treatment                    |                                         |        
+-------------------------------+-----------------------------------------+
|  HP + with                    | :math:`i_{pc{|hp+}}`                    |
|  with successful treatment    | x 0.62 (95%CI: 0.49-0.79)               |        
+-------------------------------+-----------------------------------------+
|  HP -ve                       | :math:`i_{pc{|hp-}}`                    |
+-------------------------------+-----------------------------------------+                                               

.. image:: hp_treatment_tree.svg


References:

  - Lee Y-C, Chiang T-H, Chou C-K, et al. Association Between Helicobacter pylori Eradication and Gastric Cancer Incidence: A Systematic Review and Meta-analysis. Gastroenterology 2016; 150: 1113-1124.e5

.. _swsc5.4:

5.4 Input Data Sources
-----------------------

See relevant sections

.. _swsc5.5:

5.5 Desired outputs
-------------------

  - Proportion of simulants recieved first screen
  - Number of C cases detected per 100,000 in baseline
  - Number of PC and C cases detected per 100,000 in alternative scenario


.. _swsc5.6:

5.6 Output meta-table shell
---------------------------

:download:`output table shell<output_table_shell_stomach_cancer.csv>`


.. _swsc5.7:

5.7 Validation and verification
-------------------------------

See relevant section

.. _swsc6.0:

6.0 Back-of-envelope calculations
+++++++++++++++++++++++++++++++++

.. _swsc7.0:

7.0 Limitations
+++++++++++++++

See relevant sections

