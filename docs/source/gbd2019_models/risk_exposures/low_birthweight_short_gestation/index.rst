..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1
  ---------------

  Section Level 2
  +++++++++++++++

  Section Level 3
  ^^^^^^^^^^^^^^^

  Section Level 4
  ~~~~~~~~~~~~~~~

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

.. _2019_risk_exposure_lbwsg:

======================================
Low Birthweight and Short Gestation
======================================

Risk Exposure Overview
----------------------

.. todo::

  Include here a clinical background and overview of the risk exposure you're
  modeling. Note that this is only for the exposure; you will include
  information on the relative risk of the relevant outcomes, and the cause
  models for those outcomes, in a different document.

Risk Exposures Description in GBD
---------------------------------

.. todo::

  Include a description of this risk exposure model in the context of GBD,
  involving but not limited to:

    - What type of statistical model? (categorical, continuous?)

    - How is the exposure estimated? (DisMod, STGPR?)

    - Which outcomes are affected by this risk?

    - TMREL? (This should be a very high level overview. Namely, does the TMREL vary by outcome? The details of the TMREL will be included in the *Risk Outcome Relationship Model* section)

Vivarium Modeling Strategy
--------------------------

Our strategy for modeling exposure will be the same as for the :ref:`GBD 2017 Low Birth Weight and Short Gestation Model <2017_risk_lbwsg>`.

Converting GBD's categorical exposure distribution to a continuous exposure distribution
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

In GBD 2019, LBWSG exposure is modeled as an ordered polytomous distribution
specifying the prevalence of births in each 500g x 2week
birthweight--gestational-age bin/category. We first convert this discrete
exposure distribution into a continuous joint exposure distribution of
birthweight and gestational age by assuming a uniform distribution of
birthweights and gestational ages within each bin/category. In this way, each
simulant can be assigned a continuously distributed birthweight and gestational
age, which can then be easily mapped back to the appropriate risk category in
GBD. Example Python code for achieving these transformations can be found here:

* `Abie's LBWSG cat-to-continuous notebook
  <abie_lbwsg_cat_to_continuous_notebook_>`_ in the ``vivarium_data_analysis``
  repo has a simple implementation demonstrating what we want.

* `Nathaniel's LBWSGDistribution class <nathaniel_LBWSGDistribution_class_>`_ in
  the ``vivarium_research_lsff`` repo has an implementation for GBD 2019 data
  for a nanosim, using 3 propensities to assign each simulant's exposure.

* The file `low_birth_weight_and_short_gestation.py`_ in the
  ``vivarium_public_health`` repo implements the LBWSG risk factor for Vivarium.

.. _abie_lbwsg_cat_to_continuous_notebook: https://github.com/ihmeuw/vivarium_data_analysis/blob/master/pre_processing/lbwsg/2019_03_19c_lbwsg_cat_to_continuous_abie.ipynb

.. _nathaniel_LBWSGDistribution_class: https://github.com/ihmeuw/vivarium_research_lsff/blob/919a68814a0b9bc838a7e74e424545b3d2b7e48c/nanosim_models/lbwsg.py#L462

.. _low_birth_weight_and_short_gestation.py: https://github.com/ihmeuw/vivarium_public_health/blob/main/src/vivarium_public_health/risks/implementations/low_birth_weight_and_short_gestation.py

.. note::

    The strategy of assuming a uniform distribution on each risk category is
    likely biasing towards overestimating extreme birthweights or gestational
    ages. For example, in the 0-500g category, most babies are probably pretty
    close to 500g, not equally likely to be <1 gram versus 499-500 grams.

Restrictions
++++++++++++

.. list-table:: GBD 2019 Risk Exposure Restrictions
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     -
     -
   * - Female only
     -
     -
   * - Age group start
     -
     -
   * - Age group end
     -
     -

..	todo::

	Determine if there's something analogous to "YLL/YLD only" for this section

Assumptions and Limitations
+++++++++++++++++++++++++++

.. todo::

  Describe the clinical and mathematical assumptions made for this cause model,
  and the limitations these assumptions impose on the applicability of the
  model.

Risk Exposure Model Diagram
+++++++++++++++++++++++++++

.. todo::

  Include diagram of Vivarium risk exposure model.

Data Description Tables
+++++++++++++++++++++++

.. todo::

  As of 02/10/2020: follow the template created by Ali for Iron Deficiency,
  copied below. If we discover it's not general enough to accommodate all
  exposure types, we need to revise the format in coworking.

.. list-table:: Constants
	:widths: 10, 5, 15
	:header-rows: 1

	* - Constant
	  - Value
	  - Note
	* -
	  -
	  -

.. list-table:: Distribution Parameters
	:widths: 15, 30, 10
	:header-rows: 1

	* - Parameter
	  - Value
	  - Note
	* -
	  -
	  -

Validation Criteria
+++++++++++++++++++

..	todo::
	Fill in directives for this section

References
----------
