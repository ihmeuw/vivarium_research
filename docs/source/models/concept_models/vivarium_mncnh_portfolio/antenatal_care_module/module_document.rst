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

This module determines whether or not a simulant attends an antenatal care visit according to their ANC visit propensity value.

2.0 Module Diagram and Data
+++++++++++++++++++++++++++++++

2.1 Module Diagram
----------------------

.. image:: antenatal_care_module_diagram.png

2.2 Module Inputs
---------------------

.. list-table:: Module required inputs
  :header-rows: 1

  * - Input
    - Source module
    - Application
    - Note
  * - ANC propensity value
    - :ref:`Initial attributes <2024_vivarium_mncnh_portfolio_initial_attributes_module>`
    - Used to determine answer to decision node #1
    - 
  * - Pregnancy term duration
    - :ref:`Pregnancy module <2024_vivarium_mncnh_portfolio_pregnancy_module>`
    - Used to determine inform ANC attendance probability
    - 

2.3 Module Decision Nodes
-----------------------------

.. list-table:: Module decision nodes
  :header-rows: 1

  * - Decision node
    - Description
    - Information
    - Note
  * - 1
    - Attends ANC?
    - Compare ANC propensity value input to the ANC attendance rate specific to simulant's pregnancy term duration in the table below. Ordering of the ANC attendence categories matters: see the "Special ordering of the categories" section on the :ref:`facility choice model document <2024_facility_model_vivarium_mncnh_portfolio>`
    - 

.. note::

  Pregnancy term duration-specific ANC attendance rates is a wave II implementation. For wave I, all pregnancies were assigned ANC attendance rates according to the full term value in the table below.

.. list-table:: ANC attendance rate by pregnancy term duration
  :header-rows: 1

  * - Pregnancy term duration
    - ANC attendance rate
    - Note
  * - Full term
    - ANC1 rate (GBD covariate ID 7): get_covariate_estimates(location_id=location_id, gbd_round_id=7, year_id=2021, decomp_step='iterative', covariate_id=7)
    - This is location specific, but not age specific. Engineers, you can pull these value straight from GBD, but expected values are as follows - Ethiopia: 75.7%, Nigeria: 74.3%, Pakistan: 90.8%
  * - Partial term
    - TODO: link to generated data value
    - Location-specific value generated from DHS equal to proportion of DHS respondents with recent live/still births who attend ANC with timing of first visit occuring before 13 weeks gestation. TODO: link to data generation notebook

2.4 Module Action Points
---------------------------

.. list-table:: Module action point
  :header-rows: 1

  * - Action point
    - Description
    - Information
    - Note
  * - I
    - Record ANC attendance
    - Record to output A
    - 

2.4: Module Outputs
-----------------------

.. list-table:: Module outputs
  :header-rows: 1

  * - Output
    - Value
    - Note
  * - A. ANC1?
    - *True* / *False*
    - 

3.0 Assumptions and limitations
++++++++++++++++++++++++++++++++

* We assume that partial term pregnancies have the same probability of first trimester ANC attendance as full term pregnancies as informed from DHS (which collects this information for full term pregnancies only). 

* We inform the partial term pregnancy ANC visit rates according to the ANC attendance rate with a first visit occuring in the first trimester among full term pregnancies. Notably, partial term pregnancy durations may be as long as 24 weeks, so it is possible that there are partial term pregnancies that do not attend ANC in the first trimester, but do later in pregnancy. However, as our model does not include a realistic partial term pregnancy duration distribution (we assume a uniform distribution between 6 and 24 weeks) and the midpoint of our assumed range (15 weeks) is close to the first trimester threshold (13 weeks), we accept this as a reasonable limitation. 

4.0 Verification and Validation Criteria
+++++++++++++++++++++++++++++++++++++++++

* Verify ANC1 coverage proportion (stratified by pregnancy term duration for wave II implementation)

5.0 References
+++++++++++++++

