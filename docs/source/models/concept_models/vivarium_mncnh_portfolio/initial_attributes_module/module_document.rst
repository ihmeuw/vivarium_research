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

.. _2024_vivarium_mncnh_portfolio_initial_attributes_module:

======================================
Initial attributes Module
======================================

.. contents::
  :local:
  :depth: 2

1.0 Overview
++++++++++++

This module assigns initial simulant attributes. Specifically, it
assigns the three correlated propensities used for the :ref:`delivery
facility choice model
<2024_vivarium_mncnh_portfolio_facility_choice_module>`: Antenatal care
(ANC) attendance; Low birthweight and short gestation (LBWSG) category;
and In-facility delivery (IFD) status. The propensities for these
attributes should be correlated using a `Gaussian copula`_ as described
in the :ref:`correlated propensities section
<facility_choice_correlated_propensities_section>` of the facility
choice model document.

.. _Gaussian copula: https://en.wikipedia.org/wiki/Copula_(statistics)#Gaussian_copula

2.0 Module Diagram and Data
+++++++++++++++++++++++++++++++

There is no need for a diagram for the initial attributes module of this simulation. Rather, a list of module outputs and instructions for how to apply them are included in the table below.

.. list-table:: Module outputs
  :header-rows: 1

  * - Output
    - Value
    - Dependencies
  * - A. ANC propensity
    - See the :ref:`correlated propensities
      <facility_choice_correlated_propensities_section>` section of the
      :ref:`facility choice model document
      <2024_facility_model_vivarium_mncnh_portfolio>` for instructions
    - Will be used to determine ANC attendance in ANC module
  * - B. LWBSG category propensity
    - See the :ref:`correlated propensities
      <facility_choice_correlated_propensities_section>` section of the
      :ref:`facility choice model document
      <2024_facility_model_vivarium_mncnh_portfolio>` for instructions
    - Will be used to determine LBWSG exposure in pregnancy module
  * - C. In-facility delivery (IFD) propensity
    - See the :ref:`correlated propensities
      <facility_choice_correlated_propensities_section>` section of the
      :ref:`facility choice model document
      <2024_facility_model_vivarium_mncnh_portfolio>` for instructions
    - Will be used to determine in-facility delivery status in delivery
      facility choice module
  * - D. RDS intervention propensity
    - Use a random number between 0 and 1
    - Will be used to determine which simulants receive each RDS intervention (CPAP and ACS).
    

3.0 Assumptions and limitations
++++++++++++++++++++++++++++++++

.. todo::

  List module assumptions and limitations

4.0 Verification and Validation Criteria
+++++++++++++++++++++++++++++++++++++++++

.. todo::
  
  List module V&V criteria

5.0 References
+++++++++++++++

