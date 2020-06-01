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
| CII   | critical illness insurance |
+-------+----------------------------+
| NCDs  | non-communicable diseases  |
+-------+----------------------------+
| Tx    | treatment                  |
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

A closed cohort of 100,000 male and female total simulants from age 15 to 95 will be modelled in 5 year-age bands from Jan 1, 2020 to Dec 31, 2040 with 30-day time-steps. 

.. _5.2.2:

5.2.2 Location description
~~~~~~~~~~~~~~~~~~~~~~~~~~

*Potential* provinces to model include Tianjin, Jiangsu, Guangdong, Henan, and Heilongjiang (optional). The same population distribution of age and sex will be used among the different provinces.

+---------------------------------+
| Population size weight table    |
+============+===========+========+
| Province   | Region    | Weight |
+------------+-----------+--------+
| Tianjian   | North     | 18%    |
+------------+-----------+--------+
| Jiangsu    | East      | 28%    |
+------------+-----------+--------+
| Guangdong  | South     | 15%    |
|            +-----------+--------+
|            | Southwest | 7%     |
+------------+-----------+--------+
| Henan      | Central   | 17%    |
+------------+-----------+--------+
| Helilong-  | Northeast | 8%     |
| jiang      +-----------+--------+
|            | Northwest | 8%     |
+------------+-----------+--------+

.. todo::
 currently adds up to 101%


.. _5.3:

5.3 Models
----------

.. _5.3.1:

5.3.1 Core breast cancer model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  - prevalence of DCIS/LCIS
  - prevalence of stage 1+ breast cancer
 

  +------------------------------------------------------------------------------------------------------------------+
  | Breast cancer types                                                                                              |
  +===============+========================================================================+=============+===========+
  | Disease stage | Definition                                                             | Sequaelae id| Notes     |
  +---------------+------------------------------------------------------------------------+-------------+-----------+
  | stage 0       | non-invasive breast cancers, such as DCIS (ductal carcinoma in situ).  |             | external  |
  |               | Both cancerous and non-cancerous cells are within the boundaries of    |             | data need-|
  |               | Both cancerous and non-cancerous cells are within the boundaries of    |             | ed for in |
  |               | that part of the breast in which the tumor begins to grow and no       |             | situ brea-|
  |               | evidence found of their invasion in the surrounding tissues.           |             | st cancer |
  +---------------+------------------------------------------------------------------------+-------------+-----------+
  | stage 1+      | invasive breast cancer, it exists when abnormal cells from within the  | s_277,s_5486|           |
  |               | lobules or milk ducts split out into close proximity of breast tissue. | s_5489,s_279|           |
  |               | Cancer cells can pass through the breast to different parts of the body| s_280,s_5492|           |
  |               | through immune system or the systemic circulation.                     |             |           |
  +---------------+------------------------------------------------------------------------+-------------+-----------+

  :underline:`Compartmental model`


    .. image:: compartmental_model_simple.svg

  STATES

    * S =susceptible 
    * DCIS = with ductal carcinoma in situ (stage 0 non-invasive breast cancer)
    * LCIS = with lobular carcinoma in situ (stage 0 non-invasive breast cancer)
    * C = with breast cancer condition (stage 1+ invasive breast cancer with 6 sequaelas as defined by GBD)

  TRANSITIONS

    * i_DCIS = incidence of DCIS from S
    * i_LCIS = incidence of LCIS from S
    * i_C = incidence of stage 1+ breast cancer (= GBD breast cancer incidence) from DCIS or LCIS
    * r = remission rate from DCIS to S with treatment 

  .. note::

    1.  “Recovered” state is removed because no breast cancer remission data is available in GBD.
    2.  We might overestimate the total number of deaths due to breast cancer. According to GBD definition, patients are considered cured if they have survived more than 10 years after the mastectomy. However, the excess mortality rate still exists in simulation and generates extra deaths if we plan to run the model over 10 years.

+---------------------------------------------------------------------------------+
| Initialization                                                                  |
+===========================================+=====================================+ 
| Attribute                                 | Value                              |
+-------------------------------------------+-------------------------------------+
| Which disease state is this simulant in?  | population cross-sectional          | 
| - with breast cancer                      | prevalence of these 4 states,       | 
| - with DCIS                               | adding up to 100%                   |
| - with LCIS                               |                                     |
| - in susceptible state                    |                                     |
+-------------------------------------------+-------------------------------------+
| Does simulant have family history?        | Population prevalence of family     |
|  - fh1 = with family history              | history.                            |
|  - fh0 = no family history                | :ref:`*see model 4* <5.3.4>`        | 
|                                           | Will disease state and fam history  |
|                                           | have joint/conditional distributions|
|                                           | or disease state and fam history    |
|                                           | will be independent?                |
+-------------------------------------------+-------------------------------------+

.. image:: compartmental_model_complex.svg

+---------------------------------------------------------------------------+
| State definitions                                                         |
+=======================+===============+===================================+ 
| State                 | State name    | Definition                        |
+-----------------------+---------------+-----------------------------------+
| S_DCIS |fh1           | Susceptible   | Susceptible to DCIS               |
|                       |               | family history = true             |
+-----------------------+---------------+-----------------------------------+
| S_DCIS |fh0           | Susceptible   | Susceptible to DCIS               |
|                       |               | family history = false            |
+-----------------------+---------------+-----------------------------------+
| S_LCIS |fh1           | Susceptible   | Susceptible to LCIS               |
|                       |               | family history = true             |
+-----------------------+---------------+-----------------------------------+
| S_LCIS |fh0           | Susceptible   | Susceptible to LCIS               |
|                       |               | family history = false            |
+-----------------------+---------------+-----------------------------------+
| DCIS |fh1             | with          | with condition DCIS given         |
|                       | condition     | family history = true             |
+-----------------------+---------------+-----------------------------------+
| DCIS |fh0             | with          | with condition DCIS given         |
|                       | condition     | family history = false            |
+-----------------------+---------------+-----------------------------------+
| LCIS |fh1             | with          | with condition LCIS given         |
|                       | condition     | family history = true             |     
+-----------------------+---------------+-----------------------------------+
| LCIS |fh0             | with          | with condition LCIS               |
|                       | condition     | family history = false            |                  
+-----------------------+---------------+-----------------------------------+
| BC |DCIS|fh1          | with          | with condition breast cancer      |
|                       | condition     | from DCIS, family history = true  |                  
+-----------------------+---------------+-----------------------------------+
| BC |DCIS|fh0          | with          | with condition breast cancer      |
|                       | condition     | from DCIS, family history = false |                  
+-----------------------+---------------+-----------------------------------+
| BC |LCIS|fh1          | with          | with condition breast cancer      |
|                       | condition     | from LCIS, family history = true  |                  
+-----------------------+---------------+-----------------------------------+
| BC |LCIS|fh0          | with          | with condition breast cancer      |
|                       | condition     | from LCIS, family history = false |                  
+-----------------------+---------------+-----------------------------------+


+---------------------------------------------------------------------------------------------+
| State data                                                                                  |
+=======================+===============+=====================================================+ 
| State                 | Measure       | Value                                               |
+-----------------------+---------------+-----------------------------------------------------+
| S_DCIS |fh1           | prevalence    | Among simulants with family history (fh1):          |
|                       |               | 1-prevalence DCIS|fh1 - prevalence BC|DCIS|fh1      |
+-----------------------+---------------+-----------------------------------------------------+
| S_DCIS |fh0           | prevalence    | Among simulants without family history (fh0):       |  
|                       |               | 1-prevalence DCIS|fh0 - prevalence BC|DCIS|fh0      |
+-----------------------+---------------+-----------------------------------------------------+
| S_LCIS |fh1           | prevalence    | Among simulants with family history (fh1):          | 
|                       |               | 1-prevalence LCIS|fh1 - prevalence BC|LCIS|fh1      |
+-----------------------+---------------+-----------------------------------------------------+
| S_LCIS |fh0           | prevalence    | Among simulants without family history (fh0):       |  
|                       |               | 1-prevalence LCIS|fh0 - prevalence BC|LCIS|fh0      | 
+-----------------------+---------------+-----------------------------------------------------+
| DCIS |fh1             | prevalence    | Among simulants with family history (fh1):          |        
|                       |               | *fill in with literature value*                     |
+-----------------------+---------------+-----------------------------------------------------+
| DCIS |fh0             | prevalence    | Among simulants without family history (fh0):       |           
|                       |               | *fill in with literature value*                     
+-----------------------+---------------+-----------------------------------------------------+
| LCIS |fh1             | prevalence    | Among simulants with family history (fh1):          |        
|                       |               | *fill in with literature value*                     |
+-----------------------+---------------+-----------------------------------------------------+
| LCIS |fh0             | prevalence    | Among simulants without family history (fh0):       |           
|                       |               | *fill in with literature value*                     |
+-----------------------+---------------+-----------------------------------------------------+
| BC |DCIS|fh1          | prevalence    | Among simulants with family history(fh1) & DCIS:    |        
|                       |               | *fill in with literature value*                     |
+-----------------------+---------------+-----------------------------------------------------+
| BC |DCIS|fh0          | prevalence    | Among simulants without family history(fh0) & DCIS: |           
|                       |               | *fill in with literature value*                     |
+-----------------------+---------------+-----------------------------------------------------+
| BC |LCIS|fh1          | prevalence    | Among simulants with family history(fh1) & LCIS:    |        
|                       |               | *fill in with literature value*                     |
+-----------------------+---------------+-----------------------------------------------------+
| BC |LCIS|fh0          | prevalence    | Among simulants without family history(fh0) & LCIS: |           
|                       |               | *fill in with literature value*                     |
+-----------------------+---------------+-----------------------------------------------------+

+---------------------------------------------------------------------------------------------------------------------------------------+
| Transition data DCIS                                                                                                                  |
+================+===============+===============+=================================+====================================================+ 
| Transition     | Source        | Sink          | Value                           | Notes                                              |
+----------------+---------------+---------------+---------------------------------+----------------------------------------------------+
| i_DCIS_fh1     | | S_DCIS|fh1  | | DCIS |fh1   | *fill in with literature value* | Relative risk of DCIS in those with family         | 
|                |               |               |                                 | history vs no family history =                     | 
|                |               |               |                                 | :math:`\frac{\text{i_DCIS_fh1}}{\text{i_DCIS_fh0}}`|
+----------------+---------------+---------------+---------------------------------+----------------------------------------------------+
| i_DCIS_fh0     | | S_DCIS|fh0  | | DCIS |fh0   | *fill in with literature value* | Relative risk of DCIS in those with family         | 
|                |               |               |                                 | history vs no family history =                     | 
|                |               |               |                                 | :math:`\frac{\text{i_DCIS_fh1}}{\text{i_DCIS_fh0}}`|
+----------------+---------------+---------------+---------------------------------+----------------------------------------------------+
| i_BC_DCIS_tx1  | | DCIS |fh1   | | BC |DCIS|fh1| *fill in with literature value* | incidence rate of invasive breast cancer           | 
|                | | or          | | or          |                                 | from source DCIS among those screened              |
|                | | DCIS |fh0   | | BC |DCIS|fh0|                                 | and treated. This is equal to                      |
|                | | (proportion |               |                                 | 1-DCIS treatment efficacy                          |
|                | | screened    |               |                                 |                                                    |
+----------------+ | & treated)  +---------------+---------------------------------+----------------------------------------------------+
| r_DCIS_tx      |               | either remain | *fill in with literature value* | treatment efficacy rate of DCIS                    |                              
|                |               | in DCIS or    |                                 | (does this depend on fam hist?)                    |                                
|                |               | go back to    |                                 |                                                    |                                
|                |               | susceptible?  |                                 |                                                    |
|                |               | or transition |                                 |                                                    |
|                |               | to an S' pool?|                                 |                                                    |
+----------------+---------------+---------------+---------------------------------+----------------------------------------------------+
| i_BC_DCIS_fh1  | | DCIS |fh1   | | BC |DCIS|fh1| *fill in with literature value* | incidence rate of invasive breast cancer           | 
| _tx0           | | (proportion |               |                                 | from source DCIS among those NOT screened          |    
|                | | NOT screened|               |                                 | & screened but not treated.                        |    
|                | | & screened  |               |                                 |                                                    |
|                | | but not     |               |                                 |                                                    | 
|                | | treated)    |               |                                 |                                                    | 
+----------------+---------------+---------------+---------------------------------+----------------------------------------------------+
| i_BC_DCIS_fh0  | | DCIS |fh1   | | BC |DCIS|fh0| *fill in with literature value* | incidence rate of invasive breast cancer           | 
| _tx0           | | (proportion |               |                                 | from source DCIS among those NOT screened          | 
|                | | NOT         |               |                                 | & screened but not treated.                        |
|                | | screened|   |               |                                 |                                                    |    
|                | | & screened  |               |                                 |                                                    |
|                | | but not     |               |                                 |                                                    | 
|                | | treated)    |               |                                 |                                                    | 
+----------------+---------------+---------------+---------------------------------+----------------------------------------------------+


+---------------------------------------------------------------------------------------------------------------------------------------+
| Transition data LCIS                                                                                                                  |
+================+===============+===============+=================================+====================================================+ 
| Transition     | Source        | Sink          | Value                           | Notes                                              |
+----------------+---------------+---------------+---------------------------------+----------------------------------------------------+
 

.. todo::
   	- for those who are treated successfully do they stay in DCIS or remit back to susceptible?
   	- How to make sure the incidences and prevalences all match up to GBDs? with added family history and DCIS/LCIS?


.. note::
    Once in breast cancer state, see :ref:`Breast cancer cause model <2017_cancer_model_breast_cancer>`



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
