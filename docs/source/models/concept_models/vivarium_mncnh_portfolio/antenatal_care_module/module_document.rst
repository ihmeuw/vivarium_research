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
propensity value and the timing of their ANC visit (i.e., during first trimester or later pregnancy). 

ANC visit timing is particularly relevant to the hemoglobin component of this simulation, so for more information 
on how outputs from this module will be used, refer to :ref:`our hemoglobin module documentation <2024_vivarium_mncnh_portfolio_hemoglobin_module>`

2.0 Module Input and Output Data
++++++++++++++++++++++++++++++++

2.1 Module Description 
----------------------

ANC attendance for full term pregnancies will be modeled as a single variable with 4 possible exposure options:

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

The below table describes what propensity values to use for each exposure option outlined above.

.. list-table:: ANC exposure propensity values
  :header-rows: 1

  * - ANC exposure option
    - Description
    - Propensity value
    - Notes
  * - A
    - Attends ANC during first trimester AND later pregnancy
    - ``min(ANCfirst, ANC4)``
    - Assume that attending ANC in first trimester reflects "active care seeking behavior" and that it is unlikely
      for someone who attends first trimester ANC to attend no subsequent visits. 
  * - B
    - Attends ANC during first trimester but NOT later pregnancy
    - ``ANCfirst - min(ANCfirst, ANC4)``
    - Prevalence of first trimester visit ONLY can only 
  * - C
    - Attends ANC during later pregnancy but NOT first trimester
    - 
    - 
  * - D
    - Does not attend ANC at all during pregnancy
    - Probability equal to ``ANCfirst – A``  
    - Prevalence of first trimester visit ONLY (and no late pregnancy visit) only occurs if ANCfirst > ANC4


2.2 Module Inputs
-----------------

.. list-table:: Module required inputs
  :header-rows: 1

  * - Input
    - Source 
    - Application
    - Note
  * - Pregnancy term duration 
    - :ref:`Pregnancy I <2024_vivarium_mncnh_portfolio_pregnancy_module>`
    - Partial term pregnancies by default should be assigned the probability value of ANCfirst.
    - 
  * - ANCfirst
    - ANCfirst is processed by the Health Systems team at IHME and available here:
      ``J:\Project\simulation_science\mnch_grant\MNCNH portfolio\anc1_first3months_st-gpr_results_aggregates_scaled2025-05-27.csv``
    - Used to calculate propensity values for ANC coverage
    - 
  * - ANC1
    - GBD covariate ID 7: :code:`get_covariate_estimates(location_id=location_id, release_id=16, year_id=2023, covariate_id=7)` 
    - Used to calculate propensity values for ANC coverage
    - 
  * - ANC4
    - GBD covariate ID 8: :code:`get_covariate_estimates(location_id=location_id, release_id=16, year_id=2023, covariate_id=8)` 
    - Used to calculate propensity values for ANC coverage
    - 

2.3 Module Outputs
++++++++++++++++++

As mentioned earlier, ANC attendance impacts hemoglobin exposure in our model (see :ref:`here <2024_vivarium_mncnh_portfolio_hemoglobin_module>`).
The following outputs for each pregnancy are needed as inputs for our hemoglobin component:

.. list-table:: Module outputs
  :header-rows: 1

  * - Output
    - Value
    - Note
  * - Attends ANC in first trimester?
    - *True* / *False*
    - For groups B or D 
  * - Attends ANC in later pregnancy?
    - *True* / *False* 
    - For groups A or C


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

