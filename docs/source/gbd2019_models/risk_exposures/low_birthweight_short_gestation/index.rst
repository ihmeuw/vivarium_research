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

.. contents::
   :local:
   :depth: 2

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

  See [GBD-2019-Risk-Factors-Appendix-LBWSG]_

Vivarium Modeling Strategy
--------------------------

.. todo::

  Include here an overview of the Vivarium modeling section

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

You can pull GBD 2019 exposure data for Low Birthweight and Short Gestation
using the following call to ``get_draws`` (replace :code:`ETHIOPIA_ID` with the
appropriate location IDs for the model you're working on):

.. code-block:: Python

  LBWSG_REI_ID = 339
  ETHIOPIA_ID = 179
  GBD_2019_ROUND_ID = 6

  lbwsg_exposure = get_draws(
        gbd_id_type='rei_id',
        gbd_id=LBWSG_REI_ID,
        source='exposure',
        location_id=ETHIOPIA_ID,
        year_id=2019,
  #       age_group_id = [164,2,3], # Pulls all three age groups by default
  #       sex_id=[1,2], # Pulls sex_id=[1,2] by default, but data for sex_id=3 also exists
        gbd_round_id=GBD_2019_ROUND_ID,
        status='best',
        decomp_step='step4',
  )

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

.. [GBD-2019-Risk-Factors-Appendix-LBWSG]

 Pages 167-177 in `Supplementary appendix 1 to the GBD 2019 Risk Factors Capstone <2019_risk_factors_methods_appendix_>`_:

   **(GBD 2019 Risk Factors Capstone)** GBD 2019 Risk Factors Collaborators.
   :title:`Global burden of 87 risk factors in 204 countries and territories,
   1990–2019: a systematic analysis for the Global Burden of Disease Study
   2019`. Lancet 2020; **396:** 1223–49. DOI:
   https://doi.org/10.1016/S0140-6736(20)30752-2

.. _2019_risk_factors_methods_appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30752-2/attachment/54711c7c-216e-485e-9943-8c6e25648e1e/mmc1.pdf
