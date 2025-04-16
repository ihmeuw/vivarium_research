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

.. _2024_vivarium_mncnh_portfolio_anc_detail_module:

======================================
Antenatal care detail module
======================================

.. contents::
  :local:
  :depth: 2

1.0 Overview
++++++++++++

This module builds upon the :ref:`antenatal care attendance module <2024_vivarium_mncnh_portfolio_anc_module>` that determines whether or not a simulant attends an ANC visit at any point during pregnancy and additionally determines the frequency and timing of those visits.

2.0 Module Diagram and Data
+++++++++++++++++++++++++++++++

2.1 Module Diagram
----------------------

.. image:: anc_detail_module_diagram.PNG

2.2 Module Inputs
---------------------

.. list-table:: Module required inputs
  :header-rows: 1

  * - Input
    - Source module
    - Application
    - Note
  * - ANC attendance
    - :ref:`ANC attendance module <2024_vivarium_mncnh_portfolio_anc_module>`
    - Used to determine answer to decision node #1
    - 
  * - Pregnancy term duration
    - :ref:`Pregnancy I <2024_vivarium_mncnh_portfolio_pregnancy_module>`
    - Used to determine answer to decision node #2
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
    - Informed from ANC attendance input value
    - True/False
  * - 2
    - Partial term pregnancy?
    - Informed from pregnancy duration input value
    - "Yes" if input = 'partial', "No" if input = 'full'
  * - 3
    - Attends ANC in first trimester?
    - TODO: link to probability values generated from DHS
    - 
  * - 4
    - Attends more than one total ANC visit?
    - TODO: link to probability values generated from DHS
    - 

2.3.1 Notes on data to inform decision nodes 3, 4, and 5
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Probability of "yes" for decision nodes 3 will be equal to the proportion of location-specific DHS respondents with recent live/still births and a timing of first ANC visit before 13 weeks gestation conditional on attending at least one ANC visit.

Probability of "yes" for decision node 4 will be equal to the proportion of location-specific DHS respondents with recent live/still births who attend more than 1 ANC visit conditional on attending first ANC visit prior to 13 weeks gestation. 

.. todo::

  Link to data generation notebook

2.4: Module Outputs
-----------------------

.. list-table:: Module outputs
  :header-rows: 1

  * - Output
    - Value
    - Note
  * - A. Attends first trimester ANC?
    - *True* / *False*
    - 
  * - B. Attends later pregnancy ANC?
    - *True* / *False* 
    - 

3.0 Assumptions and limitations
++++++++++++++++++++++++++++++++

* We assume that if a simulant attends an ANC visit in the first trimester and attends at least one subsequent ANC visit that the subsequent ANC visit occured during the "later pregnancy" period in the 2nd or 3rd trimester rather than attending two visits during the first trimester.

4.0 Verification and Validation Criteria
+++++++++++++++++++++++++++++++++++++++++

* Overall ANC attendance should match expected ANC1 values among the overall population as well as stratified by pregnancy term length
* Confirm no later pregnancy ANC attendance among partial term pregnancies
* Confirm first trimester and later pregnancy ANC attendance rates among full term pregnancies matches input data values

5.0 References
+++++++++++++++

