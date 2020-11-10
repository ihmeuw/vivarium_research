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


.. _1.0:

1.0 Background
++++++++++++++

Stomach/gastric cancer (GC) epidemiology and risk factors Gastric carcinogenesis is a multifactorial, multistep process. Host factors include blood group A, pernicious anemia, prior gastric surgery, family history, hereditary diffuse GC, and genetic syndromes. Smoking, salt, salty and smoked food, red meat, obesity, and low socioeconomic status are environmental factors. Moreover, infection with Helicobacter pylori and Epstein–Barr virus also play a role in gastric carcinogenesis. Information on these risk factors helps characterize individuals at risk of GC during their lifetime. Furthermore, identification of premalignant lesions is important for the purpose of screening and surveillance. Premalignant lesions of GC include atrophic gastritis (AG), intestinal metaplasia (IM), and dysplasia (DYS). 
  o It has been estimated that annually 0%–1.8%, 0%–10%, and 0%–73% of the patients with AG, IM, and dysplasia, respectively, progress to GC. The wide variations on the reported progression rates may result from differences in the study design, recruited population, and definitions. 
  o The Netherlands cohort study also revealed that premalignant lesions would progress to GC with an annual incidence of 0.2% from AG, 0.25% from IM, 0.6% from mild-to-moderate dysplasia, and 6% from severe dysplasia2. 
  
Endoscopic surveillances in individuals with premalignant lesions may detect GC at an early and curable stage and therefore improve their survival.
• Prognosis of upper gastrointestinal cancer depends largely on disease stage at diagnosis. 
  o The survival rate is less than 10% when diagnosed at an advanced stage but is as high as 85% if detected at an earlier stage. 
• Endoscopic screening can potentially prevent upper gastrointestinal cancers by early diagnosis and early treatment and has been widely adopted in screening programmes. 
  o Developed countries such as Japan and South Korea have launched nationwide endoscopic screening programmes.
  o While developing countries such as China and Iran conduct endoscopic screening only in high risk areas due to a larger cancer burden, capabilities of local doctors and availability of technology.

.. image:: stomach_image.svg

Stomach cancers tend to develop slowly over many years. Before a true cancer develops, pre-cancerous changes often occur in the inner lining (mucosa) of the stomach. These early changes rarely cause symptoms and therefore often go undetected. Most (about 90% to 95%) cancers of the stomach are adenocarcinomas. A stomach cancer or gastric cancer almost always is an adenocarcinoma. These cancers develop from the cells that form the innermost lining of the stomach (the mucosa). Correa pointed out that the human gastric carcinogenesis is a slow progressive, multistep, and multifactorial pathology process. The multistep process is composed of chronic superficial gastritis, atrophy gastritis, intestinal metaplasia (IM), dysplasia (DYS), and adenocarcinoma (malignant neoplasm).

 -  Note that there are cardia (50-60%) and non-cardia cancers (40-50%) both classified by GBD as stomach cancers
 - Cardia cancers are not associated with H. pylori infection while non-cardia cancers are. There is evidence written that says cardia cancers may be protected by H. pylori. Incidence is cardia cancers are rising while stomach cancer overall and non-cardia cancers are decreasing (better hygiene?) 
 - This pools all stomach cancer




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

RR of H. pylori = 4.5 
Exposure of H. pylori = 44%
PAF of H. pylori = 60%

.. _4.0:

4.0 Intervention
++++++++++++++++

Scale-up of stomach cancer screening coverage among insured population 

.. _4.1:

4.1 Simulation scenarios
------------------------

:underline:`Baseline scenario`

  * no screening coverage

:underline:`Alternative scenario`

30% of insured Chinese male/female initiated stomach cancer screening in 2020, stay 30% for one year then linearly project to 75% by 2030 and hold constant till 2040 for blended provinces, where:

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

*Potential* provinces to model include Tianjin, Jiangsu, Guangdong, Henan, and Heilongjiang (optional). The same population distribution of age and sex will be used among the different provinces.


+--------------------------------------------------------------------------------------------------------+
| Population size weight table                                                                           | 
+============+=============+========+===============+====================================================+
| Province   | location_id | Weight | Weighted ACMR | Forecasted ACMR in log space                       |
+------------+-------------+--------+---------------+----------------------------------------------------+
| Tianjian   |  517        | 18%    | e^(mr) x 0.18 | filepath                                           |
+------------+-------------+--------+---------------+ :download:`acmr<filepaths_acmr_c414_forecast.xlsx>`|                                             
| Jiangsu    |  506        | 28%    | e^(mr) x 0.28 |                                                    |
+------------+-------------+--------+---------------+ Note: GBD does not produce estimates below         |
| Guangdong  |  496        | 22%    | e^(mr) x 0.22 | province level, so we do not have data for         |
+------------+-------------+--------+---------------+ sub-provinces. Therefore, we are summing           |
| Henan      |  502        | 16%    | e^(mr) x 0.16 | the sub-province weights (not shown) that was      |
+------------+-------------+--------+---------------+ given by CSU to get total province weights         |
| Heilong-   |  501        | 16%    | e^(mr) x 0.16 | for Guangdong and Heilongjiang.                    |
| jiang      |             |        |               |                                                    |
+------------+-------------+--------+---------------+----------------------------------------------------+

.. note::

  Note about 'mr' in the column 'Weighted ACMR' in the above table: The forecasted data is stored in .nc files. The acmr estimate under column labelled as 'mr' is in log space with base natural e. To get the simulation population's all-cause mortality rate (acmr), first take the exponential of the mr values for location in the .nc files, then mulitply by the population weight, and sum over all locations. The unit after the exp transformation is in person years. Multiply by 100,000 to get per 100,000 person years.    

Click here to download notebook exploring the forecasted acmr data .nc files: :download:`forecast data <xxxxxxxx.ipynb>`   

.. _5.3:
5.3 Models
----------

.. _5.3.1:
5.3.1 Core stomach cancer model 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. image:: S_to_GC_to_R.svg

see :ref:`stomach cancer model <2017_cancer_model_stomach_cancer>`


.. _5.3.1.1:
5.3.1.1 Prevalence of pre-cancerous states
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A. Obtain age-specific prevalence distributions of pre-cancerous states from cross-sectional studies/cohort from young age in populations with similar risks of 
 - H. pylori prevalence
 - urban
 - China


+--------------------------------------------------------------------+
| Age-specific prevalence of pre-cancerous states                    | 
+===========+===========+============+===========+========+==========+
| age-bands | Gastritis | Atrophy    | IM        | DYS    |    GC    |     
+-----------+-----------+------------+-----------+--------+----------+
| 35-39     |           |            |           |        |          |   
+-----------+-----------+------------+-----------+--------+----------+                                                  
| 40-44     |           |            |           |        |          |   
+-----------+-----------+------------+-----------+--------+----------+
| 45-49     |           |            |           |        |          |   
+-----------+-----------+------------+-----------+--------+----------+
| 50-54     |           |            |           |        |          |   
+-----------+-----------+------------+-----------+--------+----------+
| 55-59     |           |            |           |        |          |   
+-----------+-----------+------------+-----------+--------+----------+
| 60-64     |           |            |           |        |          |   
+-----------+-----------+------------+-----------+--------+----------+       
  

Obtain prevalence of pre-cancerous states by either:
  - 1 - prev_c414 x distribution of each state/total precancerous states OR
  - use prevalence ratio of precancerous state to cancer state


.. _5.3.1.2: 
5.3.1.2 Distribution of H. pylori among pre-cancerous states and cancer state
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

B. Obtain H. pylori distribution by age and pre-cancerous state
 
*H. pylori epidemiology*. Individuals acquire H. pylori infection during childhood and, unless treated with antibiotics, remain infected (add ref). New infections and 
reinfection in adulthood are rare (add ref) and will not allowed in our model. 

.. note::
 - method from Yeh 2008:
  A meta-analysis of 12 case-control studies nested in prospective cohorts in multiple countries, including the United States, the United Kingdom, Japan, and China, found that 91.5%
  of all gastric cancers were H. pylori+ among controls with a H. pylori prevalence of 64.6% using blood samples collected more than 10 years before cancer diagnosis and
  case-control sets matched on sex, age, and date of sampling (Helicobactor and Cancer Collab Group, Gut, 2001). Based on this epidemiologic evidence, we can assume that 92% of gastric cancers would be
  H. pylori+, where 44% ( :math:`P_{hp{s}}` that we will use) are H. pylori infected in the total population.

 - We can then calculate the distribution among the precancerous health states for a cohort of 100% H. pylori+ individuals by assuming that 92% of dysplasia, intestinal, metaplasia, and atrophy prevalence is attributable to those who were infected with H. pylori. Similar calculations can be conducted to estimate the distribution for a cohort of H. pylori- individuals

 - read technical appendix for method and equations to do calcuations

 - NOTE check the studies to make sure this method is ok for all gastric cancers (cardia + non-cardia)



.. _5.3.2:
5.3.2 H. pylori risk factor model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

:underline:`1. From susceptable S state to GC state`


- Let H. pylori infection be denoted as hp
- Let the prevalence of H. pylori **among the S state population** be :math:`P_{hp{s}}`
- Let i_GC be the overall incidence from S state to GC state (:ref:`see stomach cancer model for i_GCvalue <2017_cancer_model_stomachcancer>`)
- Let Incidence among those with H. pylori be  :math:`i_{GC{|hp+}}`
- Let Incidence among those without H. pylori be :math:`i_{GC{|hp-}}`
- Let PAF be the population attributable fraction of H. pylori on GC among the S population
- Let RR be the ratio of the probability of developing the outcome GC in the exposed to H. pylori gourp versus the probability of developing the outcome GC in the unexposed to H. pylori group among the S state population.

(1) :math:`RR_{hp}` = 4.5 (95%CI need reference and UI) for China population
(2) :math:`P_{hp{s}}` = 0.44
(3) PAF= :math:`\frac{P_{hp{s}}(RR_{hp}-1)}{1+P_{hp{s}}(RR_{hp}-1)}`
(4) 1-PAF= 


(5) :math:`i_{GC{|hp+}} =  i_{GC}\times(1-PAF)\times RR_{hp}`
(6) :math:`i_{GC{|hp-}} =  i_{GC}\times(1-PAF)`



5.3.3 Screening and detection model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


.. image:: stomachcancer_screening_tree.svg


:underline:`Screening frequency`

Stomach cancer screening algorithm was derived from the 2019 guidelines from the China Anti-Cancer Association and National Clinical Research Center for Cancer. All simulants will follow this decision tree to decide if they are due a screening. The decision tree branches according to:  

   1) Pre-cancer state
   2) H pylori status

+--------------------------------------------------------------------------+
| Screening frequency by H.pylori and endoscopy (need more clarification)  | 
+=================+============================+===========================+
| Pre-cancer      | H. pylori +ve              | H. pylori -ve             |
| States          |                            |                           |        
+-----------------+----------------------------+---------------------------+
| Normal (N)      |                            |                           |
+-----------------+----------------------------+---------------------------+                                                   
| Gastritis (G)   |                            |                           |         
+-----------------+----------------------------+---------------------------+       
| Atrophic (AG)   |                            |                           |          
| Gastritis       |                            |                           |
+-----------------+----------------------------+---------------------------+          
| Intestinal      |                            |                           |
| Metaplasia (IM) |                            |                           |          
+-----------------+----------------------------+---------------------------+         
| Dysplasia (DYS) |                            |                           |        
|                 |                            |                           |        
+-----------------+----------------------------+---------------------------+


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
| Normal (N)      | :math:`i_{GC{|hp+}}` x 0.64   | :math:`i_{GC{|hp-}}`      |
+-----------------+-------------------------------+---------------------------+                                                   
| Gastritis (G)   | :math:`i_{GC{|hp+}}` x 0.64   | :math:`i_{GC{|hp-}}`      | 
+-----------------+-------------------------------+---------------------------+       
| Atrophic (AG)   | :math:`i_{GC{|hp+}}` x 0.64   | :math:`i_{GC{|hp-}}`      |  
| Gastritis       |                               |                           |
+-----------------+-------------------------------+---------------------------+          
| Intestinal      | :math:`i_{GC{|hp+}}` x 0.88   | :math:`i_{GC{|hp-}}`      |
| Metaplasia (IM) |                               |                           |          
+-----------------+-------------------------------+---------------------------+         
| Dysplasia (DYS) | :math:`i_{GC{|hp+}}` x 0.88   | :math:`i_{GC{|hp-}}`      |     
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

:download:`output table shell<output_table_shell_stomachcancer.csv>`


.. _5.7:

5.7 Validation and verification
-------------------------------

.. _6.0:

6.0 Back-of-envelope calculations
+++++++++++++++++++++++++++++++++

.. _7.0:

7.0 Limitations
+++++++++++++++


