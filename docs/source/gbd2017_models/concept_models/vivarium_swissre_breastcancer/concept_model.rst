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


.. _2017_concept_model_vivarium_swissre_breastcancer:

====================================
Vivarium CSU Breast Cancer Screening
====================================

Contents(hello): 
	
	+ :ref:`1.0 Background <1.0>`

		* :ref:`1.1 Project overview <1.1>`
		* :ref:`1.2 Literature review <1.2>`
	+ :ref:`2.0 Modelling aims and objectives <2.0>`

	+ :ref:`3.0 Baseline causal framework <3.0>`

		* :ref:`3.1 Causal diagram <3.1>`
		* :ref:`3.2 Effect size <3.2>`
	+ :ref:`4.0 Intervention <4.0>`

		* :ref:`4.1 scenarios <4.1>`
	+ :ref:`5.0 Vivarium modelling components <5.0>`

        * :ref:`5.1 Vivarium concept model diagram <5.1>`

		* :ref:`5.2 Demographics <5.2>`

			- :ref:`5.2.1 Population <5.2.1>`
			- :ref:`5.2.2 Location <5.2.2>`
		* :ref:`5.3 Models <5.3>`

			- :ref:`5.3.1 Model 1: Core breast cancer model <5.3.1>`
			- :ref:`5.3.2 Model 2: Screening and detection model <5.3.2>`
			- :ref:`5.3.3 Model 3: Alternative screening scenarios model <5.3.3>`
			- :ref:`5.3.4 Model 4: Family history model <5.3.4>`
		* :ref:`5.4 Desired outputs <5.4>`
		* :ref:`5.5 Meta-table shell <5.5>`
	+ :ref:`6.0 Limitations <6.0>`


+------------------------------------+
| List of abbreviations              |
+=======+============================+
| DCIS  | ductal carcinoma in situ   |
+-------+----------------------------+
| LCIS  | lobular carcinoma in situ  |
+-------+----------------------------+
| BC    | breast cancer              |
+-------+----------------------------+
| CII   | critical illness insurance |
+-------+----------------------------+
| NCDs  | non-communicable diseases  |
+-------+----------------------------+
| Tx    | treatment                  |
+-------+----------------------------+
| ACMR  | all cause mortality rate   |
+-------+----------------------------+


.. _1.0:

1.0 Background
++++++++++++++


.. _1.1:

1.1 Project overview
--------------------

A health insurance provider in China offers routine breast cancer screening for their insurees. The provider also offers critical illness insurance to cover treatment for those if cancer a diagnosis is made. 

The health insurance provider is interested in estimating the yearly number of detected breast cancer cases for their Chinese insured population under specific screening practices to identify the trends that are important to its critical illness insurance product. This will inform their projections of how much they will pay out for different cancer types under different screening coverage rates. 



.. todo::
  
  - add more project Background
  - Is the provider also interested in mortality/morb from breast cancer? if not, then we can delete the mortality/morb dag?

.. _1.2:

1.2 Literature review
---------------------

.. todo::
 maybe just a brief summary of what the literature says about the exposures/outcome/exp-outcome relationship?

  - what is breast cancer?
  - types of breast cancer?
  - risk factors for breast cancer? 
  - why breast cancer screening
  - predictors of breast cancer screening
  - types of breast cancer screening 

.. _2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++

To estimate the yearly number of cases of breast cancer detected per 100,000 insured population under specific screening practices in order to identify pay-out trends for critical insurance claims (CII).  

.. _3.0:

3.0 Causal framework
++++++++++++++++++++

.. _3.1:

3.1 Causal diagram
------------------


  .. image:: causal_dagmodel_all.svg

**Outcome (O)**:

  - (1) Breast cancer diagnosis/detection stage 0, 1+
  - (2) Mortality and morbidity

**Most proximal determinant/exposure (E)**:
  
  - (1) Breast cancer status
  - (2) Screening 

**Confounders (C)**:

  - age
  - sex

**Effect modifiers**:

  -
  -


**Mediators (M)**:

  -
  -

.. _3.2:

3.2 Effect sizes
----------------

.. _4.0:

4.0 Intervention
++++++++++++++++

Scale-up of breast cancer screening coverage among insured population 

.. _4.1:

4.1 Simulation scenarios
------------------------

:underline:`Baseline scenario`

30% of insured Chinese female initiate breast cancer screening in 2020 and hold constant to 2040 for selected provinces, where

  * 30 to 69 year olds with family history are provided with MRI every year;
  * 30 to 44 year olds with previous treatment of DCIS but not family history are provided with ultrasound every year;
  * 45 to 69 year olds with previous treatment of DCIS but not family history are provided with ultrasound and mammography every year;
  30 to 69 year olds at average risk (no family history nor previous treatment of DCIS) are given mammography every two years.

:underline:`Alternative scenario`

30% of insured Chinese female initiated breast cancer screening in 2020, project to 75% by 2030 and hold constant till 2040 for selected provinces, where:

  * same screening mechanisms as compared to baseline for different age groups and risk exposure level.

.. note::

 high-risk population for breast cancer are women 

  ● with a family history of breast cancer (such that parent, sibling, or child with BRCA1/BRCA2 gene mutation or breast cancer).
  ● with ductal/lobular carcinoma in-situ

 -  GBD risk factors including BMI, smoking, and FPG are not used to determine the high-risk population for breast cancer.

 - Initial screening coverage is a flexible number greater than 22.5%.

 - The target screening coverage is fixed to 75% based on UK setting. 
  
 - Should we apply screening guidelines proposed by SR?

.. _5.0:

5.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _5.1:

5.1 Vivarium concept model 
--------------------------

.. image:: viviarium_concept_model_vcm.svg

.. _5.2:

5.2 Demographics
----------------

.. _5.2.1:

5.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Cohort type: Closed cohort of 100,000 male and female total simulants
* Age and sex: Aged 15 to 95+, 5 year-age bands, uniformly distributed age and sex structure
* Time span: Jan 1, 2020 to Dec 31, 2040 with 30-day time-steps. 

.. _5.2.2:

5.2.2 Location description
~~~~~~~~~~~~~~~~~~~~~~~~~~

*Potential* provinces to model include Tianjin, Jiangsu, Guangdong, Henan, and Heilongjiang (optional). The same population distribution of age and sex will be used among the different provinces.

+-------------------------------------------------------------------------------+
| Population size weight table                                                  | 
+============+===========+========+=============================================+
| Province   | Region    | Weight | Forcasted ACMR                              |
+------------+-----------+--------+---------------------------------------------+
| Tianjian   | North     | 18%    | filepath:                                   |
+------------+-----------+--------+                                             | 
| Jiangsu    | East      | 28%    | /home/j/temp/agoros/CSU/swissre/            | 
+------------+-----------+--------+ cancer_inc/294_ets_mortality_45_beta_85.nc  |
| Guangdong  | South     | 15%    |                                             |
|            +-----------+--------+                                             |
|            | Southwest | 7%     |                                             |
+------------+-----------+--------+                                             |
| Henan      | Central   | 17%    |                                             |
+------------+-----------+--------+                                             |
| Helilong-  | Northeast | 8%     |                                             |
| jiang      +-----------+--------+                                             |
|            | Northwest | 8%     |                                             |
+------------+-----------+--------+---------------------------------------------+                                                                           

.. todo::
 currently adds up to 101%


.. _5.3:

5.3 Models
----------

.. _5.3.1:

5.3.1 Core breast cancer model 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

:underline:`Compartmental model`

  .. image:: compartmental_model_simple.svg


+----------------------------------------------------------------------------+
| State definitions                                                          |
+=======================+================+===================================+ 
| State                 | State name     | Definition                        |
+-----------------------+----------------+-----------------------------------+
| S                     | Susceptible    | Susceptible to DCIS or LCIS       |
+-----------------------+----------------+-----------------------------------+
| DCIS                  | with condition | with condition DCIS               |
+-----------------------+----------------+-----------------------------------+
| LCIS                  | with condition | with condition LCIS               |
+-----------------------+----------------+-----------------------------------+
| BC                    | with condition | with condition breast cancer      |
+-----------------------+----------------+-----------------------------------+


+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| State data                                                                                                                                                                               |
+======+============+===========================+=================================================================================================================+========================+ 
| State| Measure    | Sources                   | Value                                                                                                           | Notes                  |
+------+------------+---------------------------+-----------------------------------------------------------------------------------------------------------------+------------------------+
| S    | prevalence | derived                   | 1- prev(DCIS+ LCIS+ BC)                                                                                         | Use 2017               |                   
+------+------------+---------------------------+-----------------------------------------------------------------------------------------------------------------+ sources for 2017;      |   
| S    | excess     | None                      | 0                                                                                                               | use forecast           |
|      | mortality  |                           |                                                                                                                 | sources for            |   
+------+------------+---------------------------+-----------------------------------------------------------------------------------------------------------------+ 2020-2040              |
| DCIS | prevalence | | MarketScan (2017)       | | prevalence ratio of DCIS                                                                                      |                        |
|      |            | | Como (GBD 2017)         | | x                                                                                                             |                        |
|      |            | | Forecasted (2020-2040)  | | prev_c429                                                                                                     |                        |
+------+------------+---------------------------+-----------------------------------------------------------------------------------------------------------------+                        |
| DCIS | excess     | None                      | 0                                                                                                               |                        |
|      | mortality  |                           |                                                                                                                 |                        |
+------+------------+---------------------------+-----------------------------------------------------------------------------------------------------------------+                        |
| LCIS | prevalence | | MarketScan (2017)       | | prevalence ratio of LCIS                                                                                      |                        |        
|      |            | | Como (2017)             | | x                                                                                                             |                        |
|      |            | | Forecasted (2020-2040)  | | prev_c429                                                                                                     |                        |
+------+------------+---------------------------+-----------------------------------------------------------------------------------------------------------------+                        |
| LCIS | excess     | None                      | 0                                                                                                               |                        |  
|      | mortality  |                           |                                                                                                                 |                        |             
+------+------------+---------------------------+-----------------------------------------------------------------------------------------------------------------+------------------------+
| BC   | prevalence | | Como (2017)             | prev_c429                                                                                                       | see breast cancer      | 
|      |            | | Forecasted (2020-2040)  |                                                                                                                 | model link below       |
+------+------------+---------------------------+-----------------------------------------------------------------------------------------------------------------+                        |
| BC   | excess     | | codcorrect (2017)       | :math:`\frac{\text{deaths_c429}}{\text{pop}\times\text{prev_c429}}`                                             | Use 2017               |
|      | mortality  | | Forecasted (2020-2040)  |                                                                                                                 | sources for 2017;      |                  
+------+------------+---------------------------+-----------------------------------------------------------------------------------------------------------------+ use forecast           |
| BC   | disability | YLD appendix              | :math:`\displaystyle{\sum_{s\in\text{seq_c429}}}\scriptstyle{\text{disability_weight}_s\,\times\,\text{prev}_s}`| sources for            |   
|      | weight     |                           |                                                                                                                 | 2020-2040              |
+------+------------+---------------------------+-----------------------------------------------------------------------------------------------------------------+------------------------+
| BC   | cause      | coodcorrect               | :math:`\frac{\text{deaths_c429}}{\text{population}}`                                                            |                        |   
|      | mortality  |                           |                                                                                                                 |                        |
|      | rate       |                           |                                                                                                                 |                        |
+------+------------+---------------------------+-----------------------------------------------------------------------------------------------------------------+------------------------+


:underline:`Prevalence ratio of DCIS and LCIS`

GBD does not give us any information on the prevalence of DCIS or LCIS. Hence we need to infer using data from another population, namely from MarketScan outpatient data from 2016 to 2017 in USA. From MarketScane, we obtain the age-specific prevalence of DCIS or LCIS and the age-specific prevalence of breast cancer. This gives us a ratio of the prevalence of DCIS or LCIS to breast cancer for each age group. Applying this ratio to the prevalence of breast cancer in our population gives us an estimate of the prevalence of DCIS or LCIS in our population by age group. 

    - *Currently we do not have data for 65+ and for 2017 onwards* 
    -  A major assumption of this method is that the ratio of DCIS or LCIS to breast cancer in the US population is the same as that in the Chinese population we are modelling. This could be a limitation if breast cancer manifests differently among racial groups. 

**DCIS**

   - Age-specific prevalence ratio of DCIS = :math:`\frac{\text{age-specific prevalence of DCIS}}{\text{age-specific prevalence of breast cancer}}`

   - Age-specific prevalence of DCIS 

      = age-specific prevalence of ratio of DCIS x age-specific prevalence of breast cancer (prev_c429)

.. image:: age_specific_prev_ratio_DCIS.svg

:download:`Age-specific prevalence ratio of DCIS CSV file <ratio.csv>`

**LCIS**

   - Age-specific prevalence ratio of DCIS = :math:`\frac{\text{age-specific prevalence of LCIS}}{\text{age-specific prevalence of breast cancer}}`

   - Age-specific prevalence of DCIS 

      = age-specific prevalence of ratio of DCIS X age-specific prevalence of breast cancer (prev_c429)

.. image:: age_specific_prev_ratio_LCIS.svg

:download:`Age-specific prevalence ratio of LCIS CSV file <ratio.csv>`


+------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Transition data DCIS                                                                                                                                                   |
+============+===============+===============+======================================================================+====================================================+ 
| Transition | Source state  | Sink state    | Value                                                                | Notes                                              |
+------------+---------------+---------------+----------------------------------------------------------------------+----------------------------------------------------+
| i_DCIS     | S             |  DCIS         | | incidence_c429                                                     | incidence_c429 (breast cancer) comes from como for | 
|            |               |               | | x                                                                  | 2017 and forecasted for 2020-2040                  |
|            |               |               | | incidence ratio of DCIS                                            | incidence ratio of DCIS comes from MarketScan 2017 |
+------------+---------------+---------------+----------------------------------------------------------------------+----------------------------------------------------+
| i_LCIS     | S             |  LCIS         | | incidence_c429                                                     | incidence_c429 (breast cancer) comes from como for | 
|            |               |               | | x                                                                  | 2017 and forecasted for 2020-2040                  |
|            |               |               | | incidence ratio of LCIS                                            | incidence ratio of DCIS comes from MarketScan 2017 |
+------------+---------------+---------------+----------------------------------------------------------------------+----------------------------------------------------+
| i_BC|DCIS  | DCIS          | BC            | :math:`\frac{\text{i_c429}}{\text{prev_DCIS+prev_LCIS+prev_LCIS}}`   | i_BC|DCIS = i_BC /prev_(DCIS+LCIS)                 |
+------------+---------------+---------------+----------------------------------------------------------------------+----------------------------------------------------+
| i_BC|LCIS  | LCIS          | BC            | :math:`\frac{\text{i_c429}}{\text{prev_LCIS+prev_DCIS}}`             | i_BC|LCIS = i_BC /prev_(LCIS+DCIS)                 |
+------------+---------------+---------------+----------------------------------------------------------------------+----------------------------------------------------+
| i_BC       | S             | BC            |:math:`\frac{\text{incidence_rate_c429}}{\text{1 - prevalence_c429}}` | i_BC|LCIS = i_BC /(1-prev_BC)                      |
+------------+---------------+---------------+----------------------------------------------------------------------+----------------------------------------------------+



:underline:`Incidence ratio of DCIS and LCIS`

GBD does not give us any information on the incidence of DCIS or LCIS. Hence we need to infer using data from another population, namely from MarketScan outpatient data from 2016 to 2017 in USA. From MarketScane, we obtain the age-specific incidence of DCIS or LCIS and the age-specific incidence of breast cancer. This gives us a ratio of the incidence of DCIS or LCIS to breast cancer for each age group. Applying this ratio to the incidence of breast cancer in our population gives us an estimate of the incidence of DCIS or LCIS in our population by age group. 

    - *Currently we do not have data for 65+ and for 2017 onwards* 
    -  A major assumption of this method is that the incidence of DCIS or LCIS to breast cancer in the US population is the same as that in the Chinese population we are modelling. This could be a limitation if breast cancer manifests differently among racial groups. 

**DCIS**

   - Age-specific incidence ratio of DCIS = :math:`\frac{\text{age-specific incidence of DCIS}}{\text{age-specific incidence of breast cancer}}`

   - Age-specific incidence of DCIS 

      = age-specific incidence of ratio of DCIS x age-specific incidence of breast cancer (i_c429)

.. image:: age_specific_i_ratio_DCIS.svg

:download:`Age-specific incidence ratio of DCIS CSV file <ratio.csv>`

**LCIS**

   - Age-specific incidence ratio of LCIS = :math:`\frac{\text{age-specific incidence of LCIS}}{\text{age-specific incidence of breast cancer}}`

   - Age-specific incidence of LCIS 

      = age-specific incidence of ratio of LCIS X age-specific incidence of breast cancer (prev_c429)

.. image:: age_specific_i_ratio_LCIS.svg

:download:`Age-specific incidence ratio of LCIS CSV file <ratio.csv>`


.. todo::

   	- how to model 65+ ?? 
    - How to obtain marketScan ratios for 2020-2040? 
    - for those who are treated successfully do they stay in DCIS or remit back to susceptible? Need to read more literature
    - We might overestimate the total number of deaths due to breast cancer. According to GBD definition, patients are considered cured if they have survived more than 10 years after the mastectomy. However, the excess mortality rate still exists in simulation and generates extra deaths if we plan to run the model over 10 years.


.. _5.3.2:

5.3.2 Screening and detection model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  .. todo::
   - types of breast cancer screening
   - Screening coverage equations
   - sensitivity/specificity of screening methods
   - how to estimate number of cases from screening results

.. image:: breast_cancer_screening_tree_China.svg

.. _5.3.3:

5.3.3 Alternative screening scenarios model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    .. todo:: 
      how to model breast cancer detection given breast cancer status and screening? 


.. _5.3.4:

5.3.4 Family history model
~~~~~~~~~~~~~~~~~~~~~~~~~~

  - family history (non-GBD)
  - (history of breast cancer<--do we want to model this?) 

  .. todo::
    - distribution of family history
    - relative risk of family history and breast cancer DCIS/LCIS and stage 1+?

  .. note:: 
    - GBD risk factors will not be modelled

.. _5.4:

5.4 Desired outputs
-------------------

.. _5.5:

5.5 Output meta-table shell
---------------------------

Stratifications:

.. _6.0:

6.0 Limitations
+++++++++++++++


a.  How to incorporate the health utilization estimates when building the screening algorithm?
b.  Which one is suitable for vivarium software settings, one model with all cancer sites included or five separate models to study the screening impact on cancer outcomes.?
c.  How to capture the change of risk exposure level or screening coverage switching from general population to insured population? (e.g. 20% less of smoking prevalence for insured population)
d.  What’s our approach known that GBD does not have separate clinical mapping for cervical versus uterine for benign and in situ cervical and uterine neoplasms?
e.  How do we design a scenario that initiates the commercial screening like liquid biopsy to all cancer sites?
f.  What kind of histopathological test exists for further cell analysis after a positive screening? <- Could we include false positives in the simulation?
g.  Does cancer always progress through the cancer in-situ (non-invasive) stage to the malignant stages? If that is true, can we backout the incidence of developing non-invasive/stage 0 cancer?
h.  Can we stratify the screening results like sensitivity and specificity by cancer stages?
