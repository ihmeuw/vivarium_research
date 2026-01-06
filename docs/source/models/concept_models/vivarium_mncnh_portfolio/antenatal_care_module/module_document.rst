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

This module determines a simulant's antenatal care attendance exposure according to their ANC visit 
propensity value and the distribution of ANC attendance exposure categories specific to their location and broad pregnancy outcome. ANC attendance exposure categories include whether a simulant attends an ANC visit during their first trimester and/or later during their pregnancy. 

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
    - Source module
    - Application
    - Note
  * - Broad pregnancy outcome
    - :ref:`Initial attributes module <2024_vivarium_mncnh_portfolio_initial_attributes_module>`
    - Determines which set of probabilities to use for the ANC exposure categories. 
    - Live birth or stillbirth pregnancies can be assigned any of the values A, B, C, or D, 
      whereas we assume abortion/miscarriage/ectopic pregnancies can only attend ANC in the first trimester, so only categories B and D have nonzero probability. 
      See exposure probability tables below.
  * - ANC propensity
    - :ref:`Initial attributes module <2024_vivarium_mncnh_portfolio_initial_attributes_module>`
    - Use the ANC propensity together with the ANC attendance exposure probabilities below 
      to select one of the ANC exposure categories A, B, C, or D, as described in the :ref:`special ordering of the categories <facility_choice_special_ordering_of_categories_section>` 
      section of the facility choice model document. When sampling, the categories should be ordered D < C < B < A (highest risk to lowest risk in terms of ultrasound timing), so that higher propensity values correspond to seeking more ANC care.
    - ANC propensity is correlated with LBWSG category propensity and IFD propensity as described in the the :ref:`correlated propensities <facility_choice_correlated_propensities_section>` 
      section of the facility choice model document. Currently we assume that there is no correlation of ANC with other factors.


2.2 Module Outputs
------------------

ANC attendance impacts hemoglobin exposure and facility choice in our model, and in order for the 
outputs of this component to be compatible with the data needs of these two downstream components, we will need two different
outputs, one being polychotomous for the facility choice component and the other being dichotomous for the hemoglobin component.  

.. list-table:: Module outputs
  :header-rows: 1
  :widths: 10 15 15

  * - Output
    - Value
    - Dependencies
  * - ANC attendance category 
    - 
      1. :code:`none`
      2. :code:`later_pregnancy_only`
      3. :code:`first_trimester_only`
      4. :code:`first_trimester_and_later_pregnancy`

      The categories of this polytomous variable are listed from highest risk (1) to lowest risk (4) in terms of ultrasound timing, 
      in accordance with the :ref:`special ordering of the categories section <facility_choice_special_ordering_of_categories_section>`
      of the delivery facility choice model document: The categories need to be ordered 1 < 2 < 3 < 4 when sampling the ANC attendance 
      variable using the correlated ANC propensity in order to induce the correct correlations for the facility choice model.
    - Used as an input for the :ref:`AI Ultrasound module <2024_vivarium_mncnh_portfolio_ai_ultrasound_module>`, for determining receipt and timing of ultrasound.
  * - First trimester ANC attendance
    - 
      - *True* when ANC attendance category is :code:`first_trimester_only` or :code:`first_trimester_and_later_pregnancy`
      - *False* when ANC attendance category is :code:`none` or :code:`later_pregnancy_only`
    - Used as an input for the :ref:`hemoglobin module <2024_vivarium_mncnh_portfolio_hemoglobin_module>`, for eligibility for receipt of oral iron in the first trimester.
      This variable is dichotomous for each pregnancy.
  * - Late pregnancy ANC attendance
    - 
      - *True* when ANC attendance category is :code:`first_trimester_and_later_pregnancy` or :code:`later_pregnancy_only`
      - *False* when ANC attendance category is :code:`none` or :code:`first_trimester_only`
    - Used as an input for the :ref:`hemoglobin module <2024_vivarium_mncnh_portfolio_hemoglobin_module>`, for eligibility for anemia screening, as well as receipt of oral or IV iron in later pregnancy.
      This variable is dichotomous for each pregnancy.

The categorical variable is simply a polytomous encoding of the 2x2 table implied by the dichotomous variables:

.. list-table:: ANC exposure options
  :header-rows: 1

  * - 
    - **Late pregnancy ANC attendance** = **True**
    - **Late pregnancy ANC attendance** = **False**
  * - **First trimester ANC attendance** = **True**
    - :code:`first_trimester_and_later_pregnancy`
    - :code:`first_trimester_only`
  * - **First trimester ANC attendance** = **False**
    - :code:`later_pregnancy_only`
    - :code:`none`

2.3 Module Description 
----------------------

Data strategy
~~~~~~~~~~~~~

Data to inform the exact breakdown of our categories are not available uniformly
across our modeled locations.
For example, the DHS survey only asks the date of the first visit and the number of total visits,
but doesn't ask the date of each visit, so we don't specifically know if a respondent went to ANC
in later pregnancy (they could have gone to multiple visits, all in the first trimester).

Rather than using DHS data directly, we use GBD covariates and other IHME modeling based on the DHS data.
The data we have are as follows:

.. list-table:: Additional input data
  :header-rows: 1

  * - Input
    - Source 
    - Definition
  * - ANCfirst
    - ANCfirst is processed by the Health Systems team at IHME and available on the J drive here:
      ``/snfs1/Project/simulation_science/mnch_grant/MNCNH portfolio/anc1_first3months_st-gpr_results_aggregates_scaled2025-05-27.csv``. We have implemented this so that we will use data specific to the ``year_start`` value in the artifact (2021 when using GBD 2021 data and 2023 when using GBD 2023 data). `Relevant code is shown here <https://github.com/ihmeuw/vivarium_gates_mncnh/blob/210015c31a9ed8ac6bd80dbc169beb9f13877044/src/vivarium_gates_mncnh/data/loader.py#L295>`__)
    - Proportion of pregnant people attending ANC in the first trimester
  * - ANC1
    - GBD covariate ID 7: :code:`get_covariate_estimates(location_id=location_id, release_id=16, year_id=2023, covariate_id=7)` 
    - Proportion of pregnant people receiving any antenatal care from a skilled provider
  * - ANC4
    - GBD covariate ID 8: :code:`get_covariate_estimates(location_id=location_id, release_id=16, year_id=2023, covariate_id=8)` 
    - Proportion of pregnant people receiving 4 or more antenatal care visits including 1 or more from a skilled provider

The use of ANC1 is straightforward: it determines how many people *never* attend ANC, vs attend ANC at all.
Similarly, ANCfirst determines how many people should attend in the first trimester.
Lastly, we use ANC4 as a proxy measure for attending ANC *throughout pregnancy*, though this could miss in both directions:
someone could attend only 2-3 visits and have these spread across time (more likely),
or they could attend 4+ visits all during one phase of pregnancy (less likely).
Due to the imperfectness of this proxy measure, we decided to treat it as an upper bound on attending throughout pregnancy,
which means it is only impactful when it is *lower* than ANCfirst (see next section for details).
In practice, in our modeled locations, this only occurs in Pakistan.

In the absence of better data, we assume that the DHS data used to produce the ANCfirst, ANC1, and ANC4 covariates applies to abortion/miscarriage/ectopic pregnancies 
as well as pregnancies resulting in live birth or stillbirth.
We further assume that abortion/miscarriage/ectopic pregnancies end before they can attend later pregnancy ANC visits (though in fact abortions and miscarriages in particular could happen beyond this point).

.. note:: 

    As of `pull request #1690 <https://github.com/ihmeuw/vivarium_research/pull/1690>`_ we updated our strategy to 
    include the ANCfirst variable that the HS team processed and shared with us. Please see
    `this JIRA ticket <https://jira.ihme.washington.edu/browse/SSCI-2474>`__
    for more information on this strategy update and other options considered.

Vivarium modeling strategy
~~~~~~~~~~~~~~~~~~~~~~~~~~

With the data and assumptions in the previous section, we can fully determine the proportions in the 4 categories of ANC attendance.
Here is the procedure for **live birth or stillbirth** pregnancies:

1. First, assign probability of 1 - ANC1 to the :code:`none` category.
2. Then, assign probability to :code:`later_pregnancy_only` so that it and :code:`none`, taken together, equal 1 - ANCfirst.
   (You'll never run out of probability on this step, since ANCfirst must be less than or equal to ANC1).
3. Then, assign probability to :code:`first_trimester_and_later_pregnancy` until
   you have either assigned all remaining probability, or the probability in this category has become equal to ANC4 (which we treat as an upper bound).
4. Assign any remaining probability to :code:`first_trimester_only`. Note that in our actual data, this category only receives
   non-zero probability when ANC4 > ANCfirst, which only occurs in Pakistan out of our modeled locations.

Mathematically, that means the probabilities are as follows, **for pregnancies resulting in live birth or stillbirth**.

.. list-table:: ANC exposure probability values for pregnancies resulting in live birth or stillbirth
  :header-rows: 1

  * - ANC exposure option
    - Probability value
    - Notes
  * - :code:`first_trimester_and_later_pregnancy`
    - ``min(ANCfirst, ANC4)``
    - Assume that attending ANC in first trimester reflects "active care seeking behavior" and that it is unlikely
      for someone who attends first trimester ANC to attend no subsequent visits. 
  * - :code:`first_trimester_only`
    - ``ANCfirst - min(ANCfirst, ANC4)``
    - Prevalence of first trimester visit ONLY (and no late pregnancy visit) only occurs if ANCfirst > ANC4
  * - :code:`later_pregnancy_only`
    - ``ANC1 - ANCfirst``
    - 
  * - :code:`none`
    - ``1 - ANC1``  
    - 

Abortion/miscarriage/ectopic pregnancies are similar, except that we make it impossible for them to attend later
pregnancy ANC visits, resulting in the following (simpler) probabilities:

.. list-table:: ANC exposure probabilities for abortion/miscarriage/ectopic pregnancies
  :header-rows: 1

  * - ANC exposure option
    - Probability value
    - Notes
  * - :code:`first_trimester_and_later_pregnancy`
    - 0
    - Assumption
  * - :code:`first_trimester_only`
    - ``ANCfirst``
    -
  * - :code:`later_pregnancy_only`
    - 0 
    - Assumption
  * - :code:`none`
    - ``1 – ANCfirst``  
    - 


3.0 Assumptions and limitations
++++++++++++++++++++++++++++++++

* We use ANC4 as an upper bound on attending ANC throughout pregnancy in Pakistan, though strictly speaking this isn't logically necessary,
  but represents our assumption that this proxy measure is an underestimate.
  This assumption could be wrong if many people attend 4+ visits all during one phase of pregnancy.
* We assume that the DHS data used to produce the ANCfirst, ANC1, and ANC4 covariates applies to abortion/miscarriage/ectopic pregnancies 
  as well as pregnancies resulting in live birth or stillbirth.
* We assume that abortion/miscarriage/ectopic pregnancies can only attend ANC in the first trimester (though in fact abortions and miscarriages in particular can happen beyond this point).

.. todo:: 

  If we decide to improve the estimation of timing for ANC visits in our model (see `this JIRA ticket <https://jira.ihme.washington.edu/browse/SSCI-2318>`__) we need to
  update our documentation accordingly.

4.0 Verification and Validation Criteria
+++++++++++++++++++++++++++++++++++++++++

* Overall ANC attendance should match expected ANC1 values among the overall population as well as stratified by broad pregnancy outcome
* Confirm no later pregnancy ANC attendance among abortion/miscarriage/ectopic pregnancies
* Confirm first trimester ANC and later pregnancy ANC attendance rate among live birth and stillbirth pregnancies is equal to minimum of ANCfirst and ANC4
* Confirm first trimester ONLY ANC attendance rate among live birth and stillbirth pregnancies is equal to ANCfirst - min(ANCfirst, ANC4)
* Confirm later pregnancy ONLY ANC attendance rate among live birth and stillbirth pregnancies is equal to ANC1 - ANCfirst


5.0 References
++++++++++++++
