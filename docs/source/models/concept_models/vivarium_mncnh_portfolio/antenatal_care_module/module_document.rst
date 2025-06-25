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

.. _2024_vivarium_mncnh_portfolio_anc_module:

======================================
Antenatal care attendance module
======================================

.. contents::
  :local:
  :depth: 2

1.0 Overview
++++++++++++

This module determines whether or not a simulant attends an antenatal care visit according to their ANC visit 
probability value and the timing of their ANC visit (i.e., during first trimester or later pregnancy). 

ANC visit timing is particularly relevant to both the hemoglobin and facility choice components of this simulation, so for more information 
on how outputs from this module will be used, refer to :ref:`our hemoglobin module documentation <2024_vivarium_mncnh_portfolio_hemoglobin_module>`
and :ref:`our facility choice module documentation <2024_vivarium_mncnh_portfolio_facility_choice_module>`.

2.0 Module Input and Output Data
++++++++++++++++++++++++++++++++

2.1 Module Inputs
-----------------

.. list-table:: Module required inputs
  :header-rows: 1

  * - Input
    - Source 
    - Definition
    - Application
    - Note
  * - Pregnancy term duration 
    - :ref:`Pregnancy I <2024_vivarium_mncnh_portfolio_pregnancy_module>`
    -
    - Partial term pregnancies by default should be assigned the probability value of ANCfirst.
    - 
  * - ANCfirst
    - ANCfirst is processed by the Health Systems team at IHME and available here:
      ``J:\Project\simulation_science\mnch_grant\MNCNH portfolio\anc1_first3months_st-gpr_results_aggregates_scaled2025-05-27.csv``
    - Proportion of pregnant people attending ANC in the first trimester
    - Used to calculate probability values for ANC coverage
    - 
  * - ANC1
    - GBD covariate ID 7: :code:`get_covariate_estimates(location_id=location_id, release_id=16, year_id=2023, covariate_id=7)` 
    - Proportion of pregnant people receiving any antenatal care from a skilled provider
    - Used to calculate probability values for ANC coverage
    - 
  * - ANC4
    - GBD covariate ID 8: :code:`get_covariate_estimates(location_id=location_id, release_id=16, year_id=2023, covariate_id=8)` 
    - Proportion of pregnant people receiving 4 or more antenatal care visits including 1 or more from a skilled provider
    - Used to calculate probability values for ANC coverage
    - 


2.2 Module Description 
----------------------

ANC attendance **for full term pregnancies** will be modeled as a single variable with 4 possible exposure options:

A. Attends ANC during first trimester AND later pregnancy
B. Attends ANC during first trimester but NOT later pregnancy
C. Attends ANC during later pregnancy but NOT first trimester
D. Does not attend ANC at all during pregnancy

.. list-table:: ANC exposure options
  :header-rows: 1

  * - 
    - Visit during late pregnancy
    - No visit during late pregnancy
  * - **Visit during first trimester**
    - A
    - B
  * - **No visit during first trimester**
    - C
    - D

The below table describes what probability values to use for each exposure option outlined above.

.. list-table:: ANC exposure probability values for full term pregnancies
  :header-rows: 1

  * - ANC exposure option
    - Description
    - Probability value
    - Notes
  * - A
    - Attends ANC during first trimester AND later pregnancy
    - ``min(ANCfirst, ANC4)``
    - Assume that attending ANC in first trimester reflects "active care seeking behavior" and that it is unlikely
      for someone who attends first trimester ANC to attend no subsequent visits. 
  * - B
    - Attends ANC during first trimester but NOT later pregnancy
    - ``ANCfirst - min(ANCfirst, ANC4)``
    - Prevalence of first trimester visit ONLY (and no late pregnancy visit) only occurs if ANCfirst > ANC4
  * - C
    - Attends ANC during later pregnancy but NOT first trimester
    - 
    - 
  * - D
    - Does not attend ANC at all during pregnancy
    - Probability equal to ``ANCfirst – A``  
    - 

.. note:: 

    As of `pull request #1690 <https://github.com/ihmeuw/vivarium_research/pull/1690>`_ we updated how we assign our ANC probabilities to 
    include the ANCfirst variable that the HS team processed and shared with us. Please see `these slides <https://uwnetid.sharepoint.com/:p:/r/sites/ihme_simulation_science_team/_layouts/15/Doc.aspx?sourcedoc=%7BADD6223E-9FCA-40BB-BB7F-FE44F377CCDB%7D&file=ANC%20visit%20timing%20data%20strategy%20options.pptx&action=edit&mobileredirect=true>`_ 
    for more information on this strategy update.

The above probabilities are to be implemented for full term pregnancies only. Partial term pregnancies are assigned 
probabilities differently because we assume their pregnancies end before they can attend later pregnancy ANC visits. 
The below table describes what probabilities to use for each exposure option **for partial term pregnancies**:

.. list-table:: ANC exposure probabilities for partial term pregnancies
  :header-rows: 1

  * - ANC exposure option
    - Description
    - Probability value
    - Notes
  * - A
    - Attends ANC during first trimester AND later pregnancy
    - 0
    - Assumption
  * - B
    - Attends ANC during first trimester but NOT later pregnancy
    - ``ANCfirst``
    -
  * - C
    - Attends ANC during later pregnancy but NOT first trimester
    - 0 
    - Assumption
  * - D
    - Does not attend ANC at all during pregnancy
    - Probability equal to ``1 – ANCfirst``  
    - 


2.3 Module Outputs
++++++++++++++++++

As mentioned earlier, ANC attendance impacts hemoglobin exposure and facility choice in our model, and in order for the 
outputs of this component to be compatible with the data needs of these two downstream components, we will need two different
outputs, one being dichotomous for the hemoglobin component and the other being polychotomous for the facility choice component. 

ANC attendance inputs to the :ref:`hemoglobin module <2024_vivarium_mncnh_portfolio_hemoglobin_module>`
are dichotomous for each pregnancy, so we need to observe the following: 

.. list-table:: Module outputs for hemoglobin component
  :header-rows: 1

  * - Output
    - Value
    - Note
  * - Attends ANC in first trimester?
    - 
      - *True*  for groups A and B 
      - *False* for groups C and D
    - 
  * - Attends ANC in later pregnancy?
    - 
      - *True*  for groups A and C 
      - *False* for groups B and D
    - 

ANC attendance inputs to the :ref:`facility choice module <2024_vivarium_mncnh_portfolio_facility_choice_module>`
are polytomous for each pregnancy with the following 4 categories (ordered from worst to best):

1. No ANC
2. ANC in later pregnancy only
3. ANC in 1st trimester only
4. ANC in 1st trimester and later pregnancy

.. note::

  These are the same four categories listed above as A-D, but in reverse order, i.e., 1 = D, 2 = C, 3 = B, 4 = A. The output of this module that gets used 
  by the facility choice module will be a single variable called "ANC attendance," which has one of the four possible values A, B, C, or D as defined above, 
  and these need to be ordered D < C < B < A when sampling the variable using the correlated propensity for the facility choice model.


3.0 Assumptions and limitations
++++++++++++++++++++++++++++++++

* We assume that partial term pregnancies have the same probability of ANC coverage as full term pregnancies and assume that these visits occur exclusively 
  during the first trimester given that these pregnancies do not progress late into pregnancy. Note that in effect this makes first trimester ANC attendance 
  rate higher among partial term pregnancies than full term pregnancies, which is not necessarily logical. We accept this as a limitation given that the 
  interventions partial term pregnancies can receive at a first trimester visit (MMS, AI ultrasound) primarily affect outcomes that do not apply to partial 
  term pregnancies (MMS->stillbirth, MMS->LBWSG, MMS->hemoglobin->sepsis/obstructed labor, and ultrasound/facility delivery). However, it is possible that 
  we will overestimate the impact of MMS->hemoglobin on anemia YLDs and depressive disorders among partial term pregnancies as a result of this assumption.

  - Note that an alternative strategy would be to assume the same first trimester ANC attendance rate for partial term pregnancies as full term pregnancies 
    (equal to ANC4 proportion), but this would require us to use different ANC attendance rates for each pregnancy term duration in the already documented and 
    implemented ANC attendance module. Also note that the data on ANC attendance in DHS is collected on live and still births (full term pregnancies) only.

* We assume that the prevalence of attending both first trimester and later pregnancy visits is the minimum of ANCfirst (as processed by the HS team) and ANC4 
  (GBD covariate also processed by HS team). There is non-zero prevalence of first trimester visits only when ANC4 > ANC1 (such as in Pakistan). We are likely
  overestimating the correlation between first trimester ANC and later pregnancy ANC (i.e., the prevalence of a first trimester ANC visit ONLY is likely non-zero 
  despite this assertion in our model.) 

.. todo:: 

  If we decide to improve the estimation of timing for ANC visits in our model (see `this JIRA ticket <https://jira.ihme.washington.edu/browse/SSCI-2318>`) we need to
  update our documentation accordingly.

4.0 Verification and Validation Criteria
+++++++++++++++++++++++++++++++++++++++++

* Overall ANC attendance should match expected ANC1 values among the overall population as well as stratified by pregnancy term length
* Confirm no later pregnancy ANC attendance among partial term pregnancies
* Confirm first trimester ANC and later pregnancy ANC attendance rate among full term pregnancies is equal to minimum of ANCfirst and ANC4
* Confirm first trimester ONLY ANC attendance rate among full term pregnancies is equal to ANCfirst - min(ANCfirst, ANC4)
* Confirm later pregnancy ONLY ANC attendance rate among full term pregnancies is equal to ANC1 - ANCfirst


5.0 References
++++++++++++++
