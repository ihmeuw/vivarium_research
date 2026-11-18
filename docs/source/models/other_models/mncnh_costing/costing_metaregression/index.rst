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

.. contents::
  :local:
  :depth: 2

.. _costing_mr_overview:

1.0 Overview
------------

This document describes what happens to cost estimates after they have been
extracted from the literature: how they are standardized into comparable units,
how they are pooled into a single estimate per intervention, and how that estimate
becomes a cost the
:ref:`MNCNH Portfolio simulation <2024_concept_model_vivarium_mncnh_portfolio>`
can use.

The companion document,
:ref:`MNCNH Portfolio Costing Literature Review <costing_lit_review_vivarium_mncnh_portfolio>`,
covers the search strategy, the cost taxonomy, and the extraction sheet. We suggest you read 
that first if you have questions about the context of the input data used in the meta-regression
described here. 

.. todo:: 

  - Fill in the rest of this document with info on data processing step (SOP once estimates are extracted: summarize data sources as with MMS,
    standardize costs to per-person total cost, adjust to USD 2026, set up data for meta-regression with {cost_category}_included columns, again using MMS as example) 
    and meta-regression with MR-BRT (and other statistical methods considered).
  - Add links to MR-BRT and ST-GPR docs here; learning resources for meta-regression (e.g., Health Metrics Toolbox)