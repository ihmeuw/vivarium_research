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

  * no screening coverage

.. note::
  unless we want to bake a coverage into the baseline as well because insured pop might be screened more? Then we might want to also adjust cancer incidence among insured population (lower than general) because screening would protect againt stomach cancer incidence. 

:underline:`Alternative scenario`

XX% of insured Chinese male/female initiated stomach cancer screening in 2020, stay XX% for one year then linearly project to XX% by 2030 and hold constant till 2040 for blended provinces, where:

  * same screening mechanisms as compared to baseline for different age groups and risk exposure level.

 

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

:underline:`1. From susceptable S state to PC state`


- Let H. pylori infection be denoted as hp
- Let the prevalence of H. pylori **among the S state population** be :math:`P_{hp{s}}`
- Let i_pc be the overall incidence from S state to PC state (:ref:`see stomach cancer model for i_GCvalue <2017_cancer_model_stomachcancer>`)
- Let Incidence among those with H. pylori be  :math:`i_{pc{|hp+}}`
- Let Incidence among those without H. pylori be :math:`i_{pc{|hp-}}`
- Let PAF be the population attributable fraction of H. pylori on gastric cancer among the S population
- Let RR be the ratio of the probability of developing the outcome PC in the exposed to H. pylori gourp versus the probability of developing the outcome PC in the unexposed to H. pylori group among the S state population.

(1) :math:`RR_{hp}` = 1.89 (95%CI: 1.57 to 2.26) [Jiang Eur J Clin Microbiol Infect Dis 2017]
(2) :math:`P_{hp{s}}` = 0.558 (95%CI: 0.518 to 0.599) [Hooi Gastroenterology 2017]
(3) PAF = :math:`\frac{P_{hp{s}}(RR_{hp}-1)}{1+P_{hp{s}}(RR_{hp}-1)}` = 
(4) 1-PAF = 
(5) :math:`i_{pc{|hp+}} =  i_{pc}\times(1-PAF)\times RR_{hp}`
(6) :math:`i_{pc{|hp-}} =  i_{pc}\times(1-PAF)`
(7) use normal distribution

.. _5.3.3:
5.3.3 Prevalence of pre-cancerous states stratified by H. pylori status
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To make this section easier to follow, we define:

  - p_i = prevalence of i
  - f_i = fraction of i that is H. pylori positive 
  - i = pre-cancer states of normal/chronic gastritis (NCG), atrophic gastritis (AG), intestinal metaplasia (IM), dysplasia (DYS)


:underline:`A. Pre-cancerous states`

Ideally we obtain age-specific distribution of pre-cancer state prevalence from cross-sectional studies/cohort starting from young age in populations with similar risks of:

  - urban
  - China
  - H.pylori prevalence

.. todo::

  this prevalence distribution table was adapted from a Korean population. Will dig deeper into the literature to see if we can find age-specific prevalences in China with similar H pylori prevalence. I tried with You 1993's distributions for high risk population with 70% H. pylori prevalence and it doesnt work for 55% prevalence. 


+--------------------------------------------------------------------+
| Age-specific prevalence (p_i) of pre-cancerous states (Kang 2015)  |   
+===========+===================+===========+============+===========+
| age-bands | Normal /Gastritis | Atrophy   | IM         | DYS       |  
+-----------+-------------------+-----------+------------+-----------+
| <40       | 0.650             |  0.250    | 0.100      | 0.000     |          
+-----------+-------------------+-----------+------------+-----------+                                             
| 40-49     | 0.650             |  0.250    | 0.100      | 0.000     |        
+-----------+-------------------+-----------+------------+-----------+
| 50-59     | 0.571             |  0.280    | 0.148      | 0.001     |  
+-----------+-------------------+-----------+------------+-----------+
| 60-69     | 0.471             |  0.321    | 0.201      | 0.007     |        
+-----------+-------------------+-----------+------------+-----------+
| 70-80     | 0.432             |  0.332    | 0.231      | 0.005     |        
+-----------+-------------------+-----------+------------+-----------+
| 80+       | 0.474             |  0.313    | 0.192      | 0.022     |        
+-----------+-------------------+-----------+------------+-----------+  

Each row sums up to 1. 

We first need to obtain a pre-cancerous state. To do that we give every simulant a pre-cancer state propensity. This propensity determines at what percentile of the risk exposure distribution they are. To obtain the propensity, assign each simulant a random number using a uniform distribution between 0 and 1 ``np.random.uniform()`` 

With the simulant's pre-cancer propensity and age, use the table above to figure out what pre-cancer state this corresponds to and assign this to the simulant. Update the simulants pre-cancer states as they age through the simulation.   

:underline:`B. Obtain H. pylori status conditional upon age and pre-cancerous state`
 
*H. pylori epidemiology*. We assume all individuals acquire H. pylori infection during childhood and, unless treated with antibiotics, remain infected. New infections and 
reinfection in adulthood are rare (add ref) and will not be allowed in our model. 

+--------------------------------------------------------------------+
| Fraction of pre-cancer state that is H. pylori positive + (f_i)    |   
+===========+===================+===========+============+===========+
| age-bands | Normal /Gastritis | Atrophy   | IM         | DYS       |  
+-----------+-------------------+-----------+------------+-----------+
| <40       | 0.36              |  0.9      |  0.9       |  0.9      |          
+-----------+-------------------+-----------+------------+-----------+                                             
| 40-49     | 0.36              |  0.9      |  0.9       |  0.9      |        
+-----------+-------------------+-----------+------------+-----------+
| 50-59     | 0.29              |  0.9      |  0.9       |  0.9      |  
+-----------+-------------------+-----------+------------+-----------+
| 60-69     | 0.16              |   0.9     |  0.9       |  0.9      |        
+-----------+-------------------+-----------+------------+-----------+
| 70-80     | 0.09              |   0.9     |  0.9       |  0.9      |        
+-----------+-------------------+-----------+------------+-----------+
| 80+       | 0.16              |   0.9     |  0.9       |  0.9      |        
+-----------+-------------------+-----------+------------+-----------+  

Each cell is a proportion out of 1. 

Next, we need to assign H. pylori status. We do this by giving each simulant an H. pylori percentile using a uniform distribution between 0 and 1 ``np.random.uniform()``. Using the simulant's pre-cancer state obtained in the previous step, and age, assign H. pylori status using the table above. Those who have propensity below the fraction are positive. 

We only assign H. pylori status once and simulants will keep the same status throughout the sim - will NOT update H. pylori status as the simulants move through the sim (this will not be true in the alternative scenario where we add screening and treatment). H.pylori status is binary: pos or neg. 

To see how the above two tables were derived, see :download:`Method workbook<precancer_states_and_hpylori_memo_21dec2020.xlsx>`

.. todo::

   1. write up a narrative description to accompany the workbook. 
   2. also, upload python notebook on vivarium_data_analysis and create link. 

.. todo:: 
  
   1. should we add uncertainty range of +/-10%? 
   2. Should we have engineers calculate f_i table so that there is undertainty in the f_i parameter too? 


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
| States                |                            |                           |        
+-----------------------+----------------------------+---------------------------+
|   N/CG  (atrophy -)   | repeat ABC every 5 years   | endoscopy every 3 years   |
+-----------------------+----------------------------+---------------------------+                                                   
|   AG    (atrophy +)   | endoscopy every 1 year     | endoscopy every 2 years   |          
+-----------------------+----------------------------+---------------------------+          
|   IM    (atrophy +)   | endoscopy every 1 year     | endoscopy every 2 years   |          
+-----------------------+----------------------------+---------------------------+         
|   DYS   (atrophy +)   | endoscopy every 1 year     | endoscopy every 2 years   |        
+-----------------------+----------------------------+---------------------------+


H. pylori antibiody test [Chen 2018]
  - sensitivity 91.2%
  - specificity 97.4% 

Serum pepsinogen test [Chen 2018]
  - sensitivity 70.5% 
  - specificity 97% 

H. pylori eradication success rate using standard bismuth-containing quadruple therapy for 10 or 14 days [Du 2020]
  -  ITT efficacy: 87.9% [95%CI: 81.7–94.0%) [Liang 2013]


.. note::
  - we do not model treatment for atrophy (Zhang 2018: resection/treatment of high/low grade dysplasia has no effect on incidence of stomach cancer) 

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
|  eradication                  |                                         |        
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


