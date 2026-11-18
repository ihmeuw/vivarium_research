.. _costing_metaregression_vivarium_mncnh_portfolio:


..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  ---------------------

  Section Level 2 (#.#)
  +++++++++++++++++++++

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


MNCNH Portfolio Costing Meta-Regression
=======================================

.. sectnum::
  :depth: 3

.. contents::
  :local:
  :depth: 2

.. _costing_mr_overview:

Overview
--------

This document describes what happens to cost estimates after they have been
extracted from the literature: how they are standardized into comparable units,
how they are pooled into a single estimate per intervention, and how that estimate
becomes a cost that can be integrated into the
:ref:`MNCNH Portfolio simulation <2024_concept_model_vivarium_mncnh_portfolio>`
The companion document,
:ref:`MNCNH Portfolio Costing Literature Review <costing_lit_review_vivarium_mncnh_portfolio>`,
covers the search strategy, the cost taxonomy, and the extraction sheet. We suggest you read 
that first if you have questions about the context of the input data used in the meta-regression
described here. 

.. _costing_mr_data_processing_sop:

Data Processing SOP
-------------------

This section outlines the standard operating procedure (SOP) for processing our
cost data after it has been extracted from the literature. 
Please follow the steps below to ensure consistent and accurate processing of cost data.

**Step 1**
   Map the unit cost estimates reported in each included study to one or more
   cost categories in our
   :ref:`unit cost taxonomy (Wave 1) <costing_lit_review_unit_cost_taxonomy_wave1>`, and record the
   decision (see
   :ref:`Intervention-Specific Considerations <costing_mr_intervention_specific_considerations>`
   for where these decisions are documented).

**Step 2**
   Summarize the data sources for each cost category estimate (if reported by
   a given included study) in the Excel sheet linked `here <https://uwnetid.sharepoint.com/:x:/r/sites/ihme_simulation_science_team/_layouts/15/Doc.aspx?sourcedoc=%7B4FC73C66-8D1E-49CC-904B-8CC74C111EF1%7D&file=mncnh_costing_extraction_summary.xlsx&action=default&mobileredirect=true&share=cQpmPMdPHo3MSZBLjMdMER7xEgUDA-Jn1arthdXOR8lOElQFBg>`__.

**Step 3**
   Manually process the input data for MR-BRT:

   i. Standardize each cost estimate to the cost of total treatment of one
      individual (e.g., product cost of 180 tablets of MMS for one pregnant
      person; personnel cost of providing a bottle of MMS tablets to one
      pregnant person). At a later stage, we will also standardize all
      estimates to USD 2026, but for now, make sure to include the currency
      (type and year) in which a given estimate is reported.

   ii. Each row in the input dataset corresponds to a single cost estimate. One
       study might have multiple cost category estimates reported (e.g., product cost of
       $X, personnel cost of $Y, and infrastructure cost of $Z). Some studies do
       not report total cost by category, but instead report a total cost and
       tell us which categories were included in that total (e.g., total
       treatment cost of $N, which includes product, personnel, and
       infrastructure costs). We are interested in using the finest possible
       data. If a study reports both cost category estimates and a total cost
       estimate, **only use the cost category estimates** so that we do not
       double-count.

   iii. Denote what each cost estimate (i.e., each row in the input dataset)
        includes using the ``{cost_category}_included`` columns: use ``1`` if
        that cost category is included in the estimate (i.e., in the number in
        the ``total_cost`` column) and ``0`` if it is not. For example, if a row
        pertains only to product cost, there should be a ``1`` in the
        ``product_cost_included`` column and ``0`` in all other cost category
        columns.

   iv. Some cost values are observed from a primary source (e.g., a randomized
       controlled trial might report that it paid $X in distribution costs for
       each person in the trial) and some values are modeled (e.g., the result
       of a regression analysis conducted by modelers). While we want to
       maximize the amount of primary, observed data in our meta-regressions,
       it is helpful to include modeled costs too, given limited data
       availability. We therefore include an ``modeled_vs_observed`` column in
       the input dataset. It has not yet been determined how we will use this
       column. With MMS, we tested several methods: model fit did not improve
       (and even worsened) when filtering to observed costs only, and using the
       column as a covariate was more promising, but for now we have decided not
       to pursue this further as a model design.

   v. Some studies include additional stratifications that may or may not be
      used as covariates in our meta-regression, but are helpful to extract to
      ensure the largest possible pool of input data. These might include:

      - **Location** (which we will likely use as a covariate in our models),
        e.g., a study that reports separate costs for three countries or
        regions.
      - **Other stratifications**, e.g., a study that reports the unit costs of
        three different formulations of IV iron. Please include each of these
        estimates in their own row, but record the details in the ``addit_stratification``
        column. These other potential stratifications may include facility type (e.g., NGO-run vs.
        government-run) and rurality.

   vii. Once the data have been processed, save them as a CSV in
        ``R:\team\simulation_science\pub\models\vivarium_gates_mncnh\data\vivarium_gates_mncnh_costing\mrbrt``.
        This can be done from the command line (e.g., download and save the CSV
        to your homes directory on the cluster, then use ``mv`` to move it to
        the team drive). Follow the naming convention for each intervention
        CSV: ``mncnh_costing_extraction_{intervention}.csv``. 
        Please update the README file in the same directory accordingly.

Below is an example of what the final CSV should look like.

       .. csv-table:: Example rows from the processed IFA input data
          :header: study,intervention_name,total_cost,standard_error,location,currency_type,currency_year,product_cost_included,...,infrastructure_cost_included,modeled_vs_observed,addit_stratification

          zeng_2009,ifa,8.8,0,china,USD,2007,1,...,0,observed,
          pandav_1998,ifa,3.6,0,india,INR,1995,1,...,1,observed,
          kashi_2019,ifa,12.98,0,pakistan,USD,2016,0,...,0,modeled,
          shaheen_2015,ifa,3.09,0,bangladesh,USD,2013,0,...,0,observed,facility type (NGO run CNC)
          ...,...,...,...,...,...,...,...,...,...,...,...

Meta-regression Analysis with MR-BRT 
------------------------------------

Why MR-BRT?
+++++++++++

.. todo:: 

  Explain what MR-BRT is and why it was chosen for this meta-regression analysis.
  We tried ST-GPR, but decided against it (for now), so explain that decision process here. 

Helpful Resources
+++++++++++++++++

.. todo:: 

  Add links: 
  - MR-BRT docs
  - ST-GPR docs
  - Meta-regression learning resources (link to meta-regression page on Vivarium Research; link to Health Metrics Toolbox) 

Using MR-BRT 
++++++++++++

.. todo:: 

  - Outline current process of how we use our intervention input data: (1) standardize all rows to USD 2026,
    currently keeping models intervention-specific as opposed to pooling across interventions
    (although this may likely change in the future, given sparse data for some interventions as well as expectation that some cost categories will be similar across certain interventions).
    (2) Set up MR-BRT model with log-transformed total cost, intercept forced through 0, standard error set as near to 0 as possible.
    (3) Add study covariate (fixed effect of SDI).
    (4) Run model and review results for similarity to input data and face validity (using both tables and figures).
  - Describe how we go to our current model structure via testing with MMS (then subsequently IFA and IV iron). 

Outstanding Questions
+++++++++++++++++++++

.. todo:: 

  List any outstanding questions related to our current meta-regression analyses, e.g.
  - Are there additional covariates that should be included in the model? (SDI, rurality, facility type)
  - If we add more covariates, which covariates will be most relevant to which cost categories in which interventions? 
  - Should we pool data across interventions for certain cost categories? Which categories and which interventions? 
  - How to handle uncertainty? (This is two-fold: how to account for uncertainty in the input data and how to assess uncertainty in our model outputs.)
  - How will our model process work with other types of interventions beyond IFA, MMS, and IV iron? 

.. _costing_mr_intervention_specific_considerations:

Intervention-Specific Considerations
------------------------------------

This section documents decisions and considerations made during the data processing and modeling of each intervention, 
including descriptions of the sources included as well as any concerns that arose specifically during the processing and modeling of that intervention.

.. todo:: 

  Add intervention- and study-specific notes for all interventions modeled so far (IFA, MMS, IV iron). 
  This will include things like how we mapped the cost categories reported in a given study to our taxonomy, 
  whether we consider a given estimate modeled or observed by the study authors,
  and other concerns that arose either during the processing or modeling stage. 

