.. role:: underline
    :class: underline


..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1
  +++++++++++++++
  
  Section Level 2
  ---------------

  Section Level 3
  ~~~~~~~~~~~~~~~

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

========================================
Vivarium CSU Breast Cancer Screening
========================================

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


1.0 Background
++++++++++++++

1.1 Project overview
--------------------

A health insurance provider in China offers routine breast cancer screening for their insurees. The provider also offers critical illness insurance to cover treatment for those if cancer a diagnosis is made. 

The health insurance provider is interested in estimating the yearly number of detected breast cancer cases for their Chinese insured population under specific screening practices to identify the trends that are important to its critical illness insurance product. This will inform their projections of how much they will pay out for different cancer types under different screening coverage rates. 



.. todo::
  
  - add more project Background
  - Is the provider also interested in mortality/morb from breast cancer? if not, then we can delete the mortality/morb dag?

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


2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++

To estimate the yearly number of cases of breast cancer detected per 100,000 insured population under specific screening practices in order to identify pay-out trends for critical insurance claims (CII).  


3.0 Causal framework
++++++++++++++++++++

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

3.2 :math:`E_1` Breast cancer status 
------------------------------------

3.2.1 Family history (non-GBD Risk factor) exposure model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  - family history (non-GBD)
  - (history of breast cancer<--do we want to model this?) 

  .. todo::
    - distribution of family history
    - relative risk of family history and breast cancer DCIS/LCIS and stage 1+?

  .. note:: 
    - GBD risk factors will not be modelled

3.2.2 DCIS/LCIS (non-GBD intermediate cause) and stage 1+ breast cancer (GBD cause) model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  - prevalence of DCIS/LCIS
  - stage 1+ breast cancer
 
  .. note::
    see :ref:`Breast cancer cause model <2017_cancer_model_breast_cancer>`
    

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


    .. image:: compartmental_model_1.svg

  STATES

    * S =susceptible with no breast cancer history
    * DCIS = with ductal carcinoma in situ (stage 0 non-invasive breast cancer)
    * C = with condition (stage 1+ invasive breast cancer with 6 sequaelas as defined by GBD)

  TRANSITIONS

    * i_0 = incidence of DCIS from S
    * i_1 = incidence of stage 1+ breast cancer (= GBD breast cancer incidence) from DCIS
    * r = remission rate from DCIS to S with treatment 

  .. note::

    1.  “Recovered” state is removed because no breast cancer remission data is available in GBD.
    2.  We might overestimate the total number of deaths due to breast cancer. According to GBD definition, patients are considered cured if they have survived more than 10 years after the mastectomy. However, the excess mortality rate still exists in simulation and generates extra deaths if we plan to run the model over 10 years.


  .. todo::
    do we need to model S'? and a remission-with-breast-cancer pool and 'istory-of-breast-cancer risk factor?


3.3 :math:`E_2`: Screening model
--------------------------------

  .. todo::
   - types of breast cancer screening
   - Screening coverage equations
   - sensitivity/specificity of screening methods
   - how to estimate number of cases from screening results

    .. image:: breast_cancer_screening_tree_China.svg


3.4 :math:`O_1`: Breast cancer detection model
----------------------------------------------

    .. todo:: 
      how to model breast cancer detection given breast cancer status and screening? 


3.5 :math:`O_2`: Mortality/morbidity model
------------------------------------------

.. todo:: 

  -does the treatment model and breast cancer remission go here?

4.0 Intervention
++++++++++++++++

Scale-up of breast cancer screening coverage among insured population 

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


5.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

5.1 Vivarium concept model 
--------------------------

.. image:: viviarium_concept_model_vcm.svg


5.2 Demographics
----------------

5.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A closed cohort of 100,000 male and female total simulants from age 15 to 95 will be modelled in 5 year-age bands from Jan 1, 2020 to Dec 31, 2040 with 30-day time-steps. 


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



5.3 Model versions
------------------

5.4 Desired outputs
-------------------


5.5 Output meta-table shell
---------------------------

Stratifications:


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
