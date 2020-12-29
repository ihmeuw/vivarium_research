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

====================================
Vivarium CSU Stomach Cancer Screening
====================================

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
| DYS   | Dysplasia                  |
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


.. _1.0:

1.0 Background
++++++++++++++

Stomach/gastric cancer (GC) epidemiology and risk factors Gastric carcinogenesis is a multifactorial, multistep process. Host factors include blood group A, pernicious anemia, prior gastric surgery, family history, hereditary diffuse GC, and genetic syndromes. Smoking, salt, salty and smoked food, red meat, obesity, and low socioeconomic status are environmental factors. Moreover, infection with Helicobacter pylori and Epstein–Barr virus also play a role in gastric carcinogenesis. Information on these risk factors helps characterize individuals at risk of GC during their lifetime. Furthermore, identification of premalignant lesions is important for the purpose of screening and surveillance. Premalignant lesions of GC include atrophic gastritis (AG), intestinal metaplasia (IM), and dysplasia (DYS). It has been estimated that annually 0%–1.8%, 0%–10%, and 0%–73% of the patients with AG, IM, and dysplasia, respectively, progress to GC. The wide variations on the reported progression rates may result from differences in the study design, recruited population, and definitions. The Netherlands cohort study also revealed that premalignant lesions would progress to GC with an annual incidence of 0.2% from AG, 0.25% from IM, 0.6% from mild-to-moderate dysplasia, and 6% from severe dysplasia2. 
  
Endoscopic surveillances in individuals with premalignant lesions may detect GC at an early and curable stage and therefore improve their survival. Prognosis of upper gastrointestinal cancer depends largely on disease stage at diagnosis. The survival rate is less than 10% when diagnosed at an advanced stage but is as high as 85% if detected at an earlier stage. Endoscopic screening can potentially prevent upper gastrointestinal cancers by early diagnosis and early treatment and has been widely adopted in screening programmes. Developed countries such as Japan and South Korea have launched nationwide endoscopic screening programmes. While developing countries such as China and Iran conduct endoscopic screening only in high risk areas due to a larger cancer burden, capabilities of local doctors and availability of technology.

.. image:: stomach_diagram.svg

Stomach cancers tend to develop slowly over many years. Before a true cancer develops, pre-cancerous changes often occur in the inner lining (mucosa) of the stomach. These early changes rarely cause symptoms and therefore often go undetected. Most (about 90% to 95%) cancers of the stomach are adenocarcinomas. A stomach cancer or gastric cancer almost always is an adenocarcinoma. These cancers develop from the cells that form the innermost lining of the stomach (the mucosa). Correa pointed out that the human gastric carcinogenesis is a slow progressive, multistep, and multifactorial pathology process. The multistep process is composed of chronic superficial gastritis, atrophy gastritis, intestinal metaplasia (IM), dysplasia (DYS), and adenocarcinoma (malignant neoplasm).

 -  Note that there are cardia (50-60%) and non-cardia cancers (40-50%) both classified by GBD as stomach cancers
 -  Cardia cancers are not associated with H. pylori infection while non-cardia cancers are. There is evidence written that says cardia cancers may be protected by H. pylori. Incidence is cardia cancers   are rising while stomach cancer overall and non-cardia cancers are decreasing (better hygiene?) 
 - This pools all stomach cancer


.. image:: correa_cascade.svg

.. image:: stomachcancer_lifehistory.svg

.. _1.1:

1.1 Project overview
--------------------


.. _1.2:

1.2 Literature review
---------------------



.. _2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++

To estimate the yearly number of cases of stomach cancer detected under specific screening practices and the yearly number of deaths from undetected stomach cancer (both in unit of per 100,000 insured person-years) in order to identify pay-out trends for critical insurance claims (CII).  

.. _3.0:

3.0 Causal framework
++++++++++++++++++++

.. _3.1:

3.1 Causal diagram
------------------

**Outcome (O)**:

  - stomach cancer 

**Exposure (E)**:
  
  - h.pylori



.. _3.2:

3.2 Effect and impact size
--------------------------

RR of H. pylori = 1.89
Exposure of H. pylori = 55%
PAF of H. pylori = 

.. _4.0:

4.0 Intervention
++++++++++++++++

Scale-up of stomach cancer screening coverage among insured population 

.. _4.1:

4.1 Simulation scenarios
------------------------

:underline:`Baseline scenario`

* we assume a 5% H pylori screening that is already inherent in the population.


:underline:`Alternative scenario`

In the alternative scenario, there will be a scale up of ABC screening starting from 5% to 30% as indicated in the coverage figure below. 

.. image:: stomach_cancer_screening_coverage.svg
 

.. _5.0:

5.0 Vivarium modelling strategy
+++++++++++++++++++++++++++++++

.. _5.1:

5.1 Vivarium concept model 
--------------------------

.. image:: vivarium_concept_model_diagram_stomachcancer.svg

.. _5.2:

5.2 Demographics
----------------

.. _5.2.1:

5.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Cohort type: Closed cohort of 200,000 insured male (50%) and female (50%) simulants
* Age and sex: Aged 15 to 95+, 5 year-age bands, uniformly distributed age and sex structure
* Time span: Jan 1, 2020 to Dec 31, 2040 with 36.5-day time-steps. 
* Currently assume the sim population buys insurance on the first day of sim start. This means no one has prior insurance and were paid out for their cancers before sim start. 

.. _5.2.2:

5.2.2 Location description
~~~~~~~~~~~~~~~~~~~~~~~~~~

*Provinces to model include Tianjin, Jiangsu, Guangdong, Henan, and Heilongjiang. The same population distribution of age and sex will be used among the different provinces.


+-----------------------------------------------------+
| Population size weight table                        | 
+============+=============+========+=================+
| Province   | location_id | Weight | Weighted ACMR   | 
+------------+-------------+--------+-----------------+
| Tianjian   |  517        | 18%    | e^(acmr) x 0.18 |                                            
+------------+-------------+--------+-----------------+                                              
| Jiangsu    |  506        | 28%    | e^(acmr) x 0.28 |                                                    
+------------+-------------+--------+-----------------+         
| Guangdong  |  496        | 22%    | e^(acmr) x 0.22 | 
+------------+-------------+--------+-----------------+ 
| Henan      |  502        | 16%    | e^(acmr) x 0.16 | 
+------------+-------------+--------+-----------------+ 
| Heilong-   |  501        | 16%    | e^(acmr) x 0.16 | 
| jiang      |             |        |                 |                                                    
+------------+-------------+--------+-----------------+

file paths for 2019 forecast data:

   * ACMR: used transformed data from breast cancer
   * incidence:  /ihme/csu/swiss_re/forecast/414_incidence_12_15.csv
   * prevalence: /ihme/csu/swiss_re/forecast/414_prevalence_12_15.csv
   * cause-specific mortality: /ihme/csu/swiss_re/forecast/414_deaths_12_15.csv

.. note::

    Multiply acmr, csmr and incidence by 100,000 to get cases per 100,000


.. _5.3:
5.3 Models
----------

.. _5.3.1:
5.3.1 Core stomach cancer model 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. image:: state_diagram.svg

see :ref:`stomach cancer model <2017_stomach_cancer>`


.. _5.3.2:
5.3.2 H. pylori risk factor model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We assume there is a 5% baseline primary prevention programme of H. pylori screening and treatment in the general population. We also assume that the prevalence of H. Pylori in the general population has accounted for this level of screening. 

:underline:`Incidence of cancer by H. pylori status`


- Let H. pylori infection be denoted as hp
- Let the true prevalence of H. pylori be :math:`P_{hp{-true}}`
- Let i_pc be the overall incidence from S state to PC state (:ref:`see stomach cancer model for i_pc value <2017_cancer_model_stomachcancer>`)
- Let incidence among those with H. pylori be  :math:`i_{pc{|hp+}}`
- Let incidence among those without H. pylori be :math:`i_{pc{|hp-}}`
- Let PAF be the population attributable fraction of H. pylori for gastric cancer
- Let RR be the ratio of the probability of developing cancer in the exposed to H. pylori group versus unexposed group.

(1) :math:`RR_{hp}` = 1.89 (95%CI: 1.57 to 2.26) [Jiang Eur J Clin Microbiol Infect Dis 2017]
(2) :math:`P_{hp{-true}}` = see calculation below
(3) PAF = :math:`\frac{P_{hp{-true}}(RR_{hp}-1)}{1+P_{hp{-rue}}(RR_{hp}-1)}` 
(4) 1-PAF = 
(5) :math:`i_{pc{|hp+}} =  i_{pc}\times(1-PAF)\times RR_{hp}`
(6) :math:`i_{pc{|hp-}} =  i_{pc}\times(1-PAF)`
(7) use normal distribution for uncertainty ranges

.. note:: 

  The prevalence of HP was obtained from meta-analysis of 22 studies. For China, the prevalence was 0.558 (95%CI: 0.518 to 0.599) [Hooi Gastroenterology 2017]. The primary modality of testing for HP, include  

  - serology (varies depending on antigen used): 97.6% sensitivity and 96.2% specificity for recomLine
  - urea breath test: 95% sensitvity and specificity
  - stool antigen: 94% sensitvity and 97% specificity
  - Campylobacter-like organism or histopathology: invasive and considered gold standard

  Sensitivity and specificity of screening tests were obtained from Wang 2015. Diagnostic accuracy also varies depending on the test used and conditions. To calculate the true HP prevalence, let us assume a 95% sensitivity and specificity as a combined average for the tests used in the meta-analysis.  


True prevalence of HP :math:`P_{hp{-true}}`

+-----------+----------------------------+---------------------------+
| H. pylori |   True HP+                 |   True HP-                |  
+-----------+----------------------------+---------------------------+
| test +    |     a                      |     b                     |
+-----------+----------------------------+---------------------------+
| test -    |     c                      |     d                     |
+-----------+----------------------------+---------------------------+
| total     |    a+c                     |    b+d                    |
+-----------+----------------------------+---------------------------+


(1) sensitivity a/(a+c) = 0.95
(2) specificity d/(b+d) = 0.95
(3) HP prevalence by test :math:`P_{hp{-screen}}` = (a+b)/(a+b+c+d) = 0.558 (95%CI: 0.518 to 0.599) [Hooi Gastroenterology 2017]
(4) a+b+c+d = 1000
(5) use normal distribution for uncertainty ranges

solving the 4 equations:

  - a = 536 (true positive)
  - b = 22  (false positive) 
  - c = 28  (false negative)
  - d = 414 (true negative) 

True HP prevalence = a+c/1000 = 564/1000 = 0.564 (calculate UIs)

References: 

  - 
  -
  - Wang Diagnosis of Helicobacter pylori infection: Current options and developments. World J Gastroenterol 2015 October 28; 21(40): 11221-11235

.. _5.3.3:
5.3.3 Prevalence of atrophy stratified by H. pylori status
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To make this section easier to follow, we define:

  - atrophy+ = with atrophic gastritis
  - atrophy- = without atrophic gastritis
  - p_atrophy+ = prevalence of atrophic gastritis
  - f_atrophy+/- = fraction of the atrophic state that is H. pylori positive 
  

:underline:`A. Pre-cancerous state (chronic atrophic gastritis)`

Ideally we obtain age-specific distribution of the pre-cancer atrophic state prevalence from cross-sectional studies/cohort starting from young age in populations with similar risks of:

  - urban
  - China
  - H.pylori prevalence


.. note::

  This age and sex specific prevalence distribution of chronic atrophic gastritis is from Chinese population from 1997/1997 [Aoki 2005]. A total of 1741 individuals from Zhanhuang County (population: 208,000) of the Province of Hebei, underwent a health survey consisting of medical examination by interview, blood sampling, and clinical examination by physicians. All participants were Han Chinese (Asian). Prevalence of H. pylori was 72.5% among male and 73.4% among female using serum antibody test. CAG was serologically diagnosed when PGI was<70 (mg/l) and PGI/PGII was <3.

The following tables show the sex and age specific CAG prevalence tables by reading off figure 5 and 6 from Aoki 2005

.. image:: prevalence_chronic_atrophic_gastritis_china.svg

+------------------------------------+
| Male age-specific prevalence       | 
| (p_atrohpy+) atrophy [Aoki 2005]   | 
+===========+============+===========+
| age-bands | Atrophy +  | 95% CI    | 
+-----------+------------+-----------+
| <30       | 0.08       | 0.00-0.18 |       
+-----------+------------+-----------+
| 30-39     | 0.12       | 0.06-0.18 |
+-----------+------------+-----------+
| 40-49     | 0.12       | 0.07-0.17 |
+-----------+------------+-----------+
| 50-59     | 0.16       | 0.08-0.24 | 
+-----------+------------+-----------+
| 60-69     | 0.18       | 0.10-0.26 | 
+-----------+------------+-----------+ 
| 70+       | 0.28       | 0.06-0.50 |
+-----------+------------+-----------+

+------------------------------------+
| Female age-specific prevalence     | 
| (p_atrophy+) atrophy [Aoki 2005]   | 
+===========+============+===========+
| age-bands | Atrophy +  | 95% CI    |
+-----------+------------+-----------+
| <30       | 0.10       | 0.00-0.20 |            
+-----------+------------+-----------+
| 30-39     | 0.11       | 0.09-0.13 | 
+-----------+------------+-----------+
| 40-49     | 0.06       | 0.04-0.08 | 
+-----------+------------+-----------+
| 50-59     | 0.12       | 0.08-0.16 | 
+-----------+------------+-----------+
| 60-69     | 0.18       | 0.10-0.26 | 
+-----------+------------+-----------+     
| 70+       | 0.19       | 0.08-0.30 | 
+-----------+------------+-----------+


Each row is a proportion out of 1. 

We first need to obtain an atrophy state. To do that we give every simulant an atrophy propensity. This propensity determines at what percentile of the risk exposure distribution they are. To obtain the propensity, assign each simulant a random number using a uniform distribution between 0 and 1 ``np.random.uniform()`` 

With the simulant's sex, age and atrophy propensity, use the tables above to figure out what atrophic state the propensity corresponds to and assign this to the simulant. Update the simulant's atrophic state as they age through the simulation.   


:underline:`B. Obtain H. pylori status conditional upon age and atrophic state`
 
*H. pylori epidemiology*. We assume all individuals acquire H. pylori infection during childhood and, unless treated with antibiotics, remain infected. New infections and reinfection in adulthood are rare and will not be allowed in our model. 

To assign H. pylori status we give each simulant an H. pylori percentile using a uniform distribution between 0 and 1 ``np.random.uniform()``. Using the simulant's age and atrophic state obtained in the previous step, assign H. pylori status using the table below. Each cell is a proportion out of 1 which is the atrophic state they are in. The proportion is the fraction of the atrophic state that is H pylori positive. Those who have propensity below the fraction are positive. 

+--------------------------------------------------------------------+
| Fraction of atrophic state that is H. pylori positive + (f_atrophy)|   
+===========+============================+===========================+
| age-bands |  Atrophy +                 | Atrophy -                 |
+-----------+----------------------------+---------------------------+
| age       |  f_atrophy+                | f_atrohpy-                |       
+-----------+----------------------------+---------------------------+    

To derive f_atrophy+ and f_atrophy- for the above table with uncertainty intervals use the following set of equations:

+-----------+----------------------------+---------------------------+
| H. pylori |   Atrophy +                |   Atrophy -               |  
+-----------+----------------------------+---------------------------+
| H+        |     a                      |     b                     |
+-----------+----------------------------+---------------------------+
| H-        |     c                      |     d                     |
+-----------+----------------------------+---------------------------+

(1) a+b/(a+b+c+d) = :math:`P_{hp{-true}}`
(2) (a+c)/(a+b+c+d) = p_atrophy+ 
(3) a+b+c+d = 1000
(4) ad/bc = OR
(5) :math:`P_{hp{-true}}` = 0.564 (equations above)
(6) OR = 3.8 (95%CI: 3.054 - 4.631) [Aoki Ann Epidemiology 2005] 
(7) f_atrophy+ = a/(a+c)
(8) f_atrophy- = b/(b+d)
(9) use normal distribution uncertainty ranges

* We assume the OR is for the true prevalence of H. pylori among the atrophic states

The calculated values should look similar to this back of envelope calculation: see tab Aoki 2005 :download:`Method workbook<precancer_states_and_hpylori_memo_28dec2020.xlsx>`

.. note::

  f_atrophy+ should be approximately 0.80 and f_atrophy- approximately 0.50. This is supported by the literature that estimates 70-90% of patients with chronic gastritis are infected with H. pylori [Fang Journal of Digestive Diseases 2018]

We only assign H. pylori status once and simulants will keep the same status throughout the sim - will NOT update H. pylori status as the simulants move through the sim (this will not be true in the alternative scenario where we add screening and treatment for H. pylori). H.pylori status is binary: pos or neg. We assume H. pylori prevalence is consistent across all ages and sex [Aoki 2005].

Example: 

  Lets say we have a simulant Sally-Sim who is age 42. She has been randomly assigned atrophic percentile of 0.03 and h.pylori percentile of 0.5. Looking at the p_atrophy+ table for females, she is in the atrophic+ state for her percentile rank. Next, we determine her H. pylori status. Because she is atrophic, her H. pylori status will be determined by f_atrophy+ for her age group. Reading off the excel table, f_atrophy+ for 40-49 year olds is 0.82. Hence, she is also H. pylori positive. 
 

References: 
 -
 -
 -


.. _5.3.4:
5.3.4 Screening and detection model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This screening model will be applied in the alternative scenario. Apply first screening coverage to those who are 40 years old and above using the screening scale-up figure below. Simulants' first screen will be using the non-invasive with the ABC method delineated by Chen 2018 which combines H. pylori antibody test and serum pepsinogen (PG) test for atrophy.

.. image:: stomach_cancer_screening_coverage.svg

:underline:`Screening frequency`

Stomach cancer screening algorithm was derived from the 2019 guidelines from the China Anti-Cancer Association and National Clinical Research Center for Cancer. All simulants will follow this decision tree to decide if they are due a screening. The decision tree branches according to:  

   1) Pre-cancer state (atrophy vs no atrophy)
   2) H pylori status


.. image:: stomachcancer_screening_tree.svg

+--------------------------------------------------------------------------------+
| Screening frequency by H.pylori and atrophy status (ABC method)                | 
+=======================+============================+===========================+
| Pre-cancer            | H. pylori negative (-)     | H. pylori positive (+)    |
| States                | from screening test        | from screening test       |        
+-----------------------+----------------------------+---------------------------+
|   atrophy -           | repeat ABC every 5 years   | endoscopy every 3 years   |
+-----------------------+----------------------------+---------------------------+                                                   
|   atrophy +           | endoscopy every 1 year     | endoscopy every 2 years   |          
+-----------------------+----------------------------+---------------------------+          


H. pylori antibiody test [Chen 2018]

  - sensitivity 91.2%
  - specificity 97.4% 

Serum pepsinogen test [Chen 2018]

  - because the incidence of gastric cancer is determined by true H. pylori status and not by atrophic state, we do not need to apply test accuracy for atrophy. The atrophic state identified in model 2 determines frequency of screening.   


H. pylori eradication success rate using standard bismuth-containing quadruple therapy for 10 or 14 days [Du 2020]

  -  ITT efficacy: 87.9% [95%CI: 81.7–94.0%) [Liang 2013]

.. note::

  - we do not model treatment for atrophy (Zhang 2018: resection/treatment of high/low grade dysplasia has no effect on incidence of stomach cancer) 

.. todo::

  1. timing of first screen
  2. probability of attending due screen


Reference: 

  - National Health Commission of the People’s Republic of China. Chinese guidelines for diagnosis and treatment of gastric cancer 2018 (English version). Chin J Cancer Res 2019; 31: 707–37.
  - Chen X-Z, Huang C-Z, Hu W-X, Liu Y, Yao X-Q. Gastric Cancer Screening by Combined Determination of Serum Helicobacter pylori Antibody and Pepsinogen Concentrations: ABC Method for Gastric Cancer Screening. Chin Med J (Engl) 2018; 131: 1232–9.
  - Du Y, Zhu H, Liu J, et al. Consensus on eradication of Helicobacter pylori and prevention and control of gastric cancer in China (2019, Shanghai). J Gastroenterol Hepatol 2020; 35: 624–9
  - Liang X, Xu X, Zheng Q, Zhang W, Sun Q, Liu W, et al. Efficacy of bismuth-containing quadruple therapies for clarithromycin-, metronidazole-, and fluoroquinolone-resistant Helicobacter pylori infections in a prospective study. Clin Gastroenterol Hepatol. 2013 Jan 29; doi: 10.1016/j.cgh.2013.01.008
  - 

.. _5.3.4:
5.3.4 Gastic cancer incidence after ABC screening
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Meta-analysis of 14 studies by Lee 2016 showed reduction in the incidence rate ratio of gastric cancer among asymptomatic individuals with H. pylori eradication of 0.62 (95%CI: 0.49-0.79). We apply this rate ratio to H. pylori +ve simulants who recieve successful eradication. This meta-analysis supports no differential efficacy among pre-cancer states. 

+-------------------------------------------------------------------------+
| Gastric cancer incidence after outcome of screening and treatment       |
+===============================+=========================================+
|  H. pylori +ve without        | :math:`i_{pc{|hp+}}`                    |
|  eradication or with          |                                         |
|  unsuccessful eradication     |                                         |        
+-------------------------------+-----------------------------------------+
|  H. pylori +ve with           | :math:`i_{pc{|hp+}}`                    |
|  with successful eradication  | x 0.62 (95%CI: 0.49-0.79)               |        
+-------------------------------+-----------------------------------------+
|  H. pylori -ve                | :math:`i_{pc{|hp-}}`                    |
+-------------------------------+-----------------------------------------+                                               

References:

  - Lee Y-C, Chiang T-H, Chou C-K, et al. Association Between Helicobacter pylori Eradication and Gastric Cancer Incidence: A Systematic Review and Meta-analysis. Gastroenterology 2016; 150: 1113-1124.e5

.. _5.4:

5.4 Input Data Sources
-----------------------


.. _5.5:

5.5 Desired outputs
-------------------


.. _5.6:

5.6 Output meta-table shell
---------------------------

:download:`output table shell<output_table_shell_stomach_cancer.csv>`


.. _5.7:

5.7 Validation and verification
-------------------------------

.. _6.0:

6.0 Back-of-envelope calculations
+++++++++++++++++++++++++++++++++

.. _7.0:

7.0 Limitations
+++++++++++++++


