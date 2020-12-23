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

.. image:: stomachcancer_screening_tree.svg


:underline:`Screening frequency`

Stomach cancer screening algorithm was derived from the 2019 guidelines from the China Anti-Cancer Association and National Clinical Research Center for Cancer. All simulants will follow this decision tree to decide if they are due a screening. The decision tree branches according to:  

   1) Pre-cancer state (atrophy vs no atrophy)
   2) H pylori status

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

.. todo::
   - screening attendence? 


.. _5.3.4:
5.3.4 H.pylori treatment model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note:: 
  - H. pylori eradication significantly decreases the risk of gastric cancer in patients with chronic atrophic (AG) or nonatrophic gastritis (G) (pooled relative risk RR 0.64, 95 %CI 0.48 – 0.85)7 
  - But not in patients with IM or dysplasia (RR 0.88, 95%CI 0.59 – 1.31)7
  - ?? Need to check if normal group included ??
  - Note to self - Difference values in Rokkas 2017 (check literature)
  - GC risk according to baseline histology in five studies [26,28,31,43,46 <- check reference] examined the GC risk according to baseline histology. These studies stratified baseline histology into two groups: i.e., a group of subjects with chronic non-AG (NAG) or AG, and a group of subjects with IM or DYS. The RR [95% CI] was significant in the NAG/AG group (0.28 [0.08-0.96], Z= -2.03, P=0.04), but not but not in the IM/DYS group (0.84 [0.55-1.28], Z= -0.83, P=0.41).
  - Non-screened population will have the baseline incidence from the baseline model

+-----------------------------------------------------------------------------+
| Treatment efficacy by H.pylori and endoscopy (need more clarification)      | 
+=================+===============================+===========================+
| Pre-cancer      | H. pylori +ve                 | H. pylori -ve             |
| States          |                               |                           |        
+-----------------+-------------------------------+---------------------------+
| Normal (N)      | :math:`i_{pc{|hp+}}` x 0.64   | :math:`i_{pc{|hp-}}`      |
+-----------------+-------------------------------+---------------------------+                                                   
| Gastritis (G)   | :math:`i_{pc{|hp+}}` x 0.64   | :math:`i_{pc{|hp-}}`      | 
+-----------------+-------------------------------+---------------------------+       
| Atrophic (AG)   | :math:`i_{pc{|hp+}}` x 0.64   | :math:`i_{pc{|hp-}}`      |  
| Gastritis       |                               |                           |
+-----------------+-------------------------------+---------------------------+          
| Intestinal      | :math:`i_{pc{|hp+}}` x 0.88   | :math:`i_{pc{|hp-}}`      |
| Metaplasia (IM) |                               |                           |          
+-----------------+-------------------------------+---------------------------+         
| Dysplasia (DYS) | :math:`i_{pc{|hp+}}` x 0.88   | :math:`i_{pc{|hp-}}`      |     
|                 |                               |                           |        
+-----------------+-------------------------------+---------------------------+


.. note::
 - Assume normal group has same RR as those in G/AG?
 - Assume all endoscopy is followed up endoscopic biopsy? Hence assume detection of states are true states. 
 - H. pylori test sensitivity/specificity 0.9 and 0.9 CONFUSION MATRIX? 
 - This method only works if we do not need to get state by state transitions and we can use the RRs from the above comment. Hence we need to assume:
 - Incidence of GC from IM/DYS states is not changed by screening by endoscopy and associated treatment 
 - Zhang 20189: resection/treatment of high/low grade dysplasia has no effect on incidence of GC 

.. important: 
 Check RRs:

 Source population:  source population is a group (1-prevalence of GC) with all non-GC states including normal AND has H+ infection. 

 Exposure: H. pylori treatment, compared to no-treatment

 Outcome: cardia and non-cardia cancers

 RR: relative risk of treated vs. not treated for H pylori among H pylori positive cohort with state distribution. 


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


