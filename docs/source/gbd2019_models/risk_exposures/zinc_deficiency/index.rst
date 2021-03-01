.. _2019_risk_exposure_zinc_deficiency:

======================================
Zinc Deficiency
======================================

Risk Exposure Overview
----------------------

Zinc is a nutrient found throughout the body that serves a role in the human immune system and metabolism function. Sources of dietary zinc include meats and fortified cereals.

Zinc deficiency is often defined either as an insufficient intake of dietary zinc or as a serum zinc level below a given threshold. However, a decrease in serum zinc concentration occurs only after long-term or severe zinc depletion, so serum zinc is not considered a reliable marker of zinc status. Notably, zinc deficiency can be caused by inadequate dietary intake, inadequate absorption, increased loss of zinc, or increased body system use; however, inadequate dietary intake of zinc is the most common cause.

Risk Exposures Description in GBD
---------------------------------

Zinc deficiency exposure in GBD 2019 is a dichotomous exposure variable defined as consumption of less than 2.5 milligrams of zinc per day among children between the ages of 1 and 4 years old. Zinc deficiency exposure was modeled using ST-GPR based on food intake input data. The theoretical minimum risk exposure level is lack of zinc deficiency (defined as at least 2.5 miligrams of zinc consumption per day) and does not vary by risk-outcome pair.

The zinc deficieincy risk factor affects the diarrheal diseases cause in GBD 2019. Notably, the zinc deficiency risk factor in GBD 2017 affected both diarrheal diseases and lower respiratory diseases after a re-analysis of the relative risks using MR-BRT that resulted in the exclusion of LRI as an affected outcome and an updated relative risk for diarrheal diseases.

Vivarium Modeling Strategy
--------------------------

The zinc deficiency risk exposure should be modeled as a dichotomous risk exposure. Notably, the risk exposure only applies to a single age group (age_group_id=5, one to four years old), so the propensity score approach to determine a simulant's exposure value as they age through age groups is not required, although it may still be used.

The zinc deficiency risk factor has rei_id 97.

.. todo::

	Include ID tree

Restrictions
++++++++++++

.. list-table:: GBD 2019 Risk Exposure Restrictions
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     - False
     -
   * - Female only
     - False
     -
   * - Age group start
     - 5
     - 1-4 years 
   * - Age group end
     - 5
     - 1-4 years

Assumptions and Limitations
+++++++++++++++++++++++++++

This risk exposure model assumes that a given simulant's zinc exposure status will not change between the ages of one and four years old, absent an intervention.

Risk Exposure Model Diagram
+++++++++++++++++++++++++++

.. todo::
	
	Include diagram of Vivarium risk exposure model.

Data Description Tables
+++++++++++++++++++++++

The following code can be used to access draw-level exposure data for the zinc deficiency risk factor, after additionally specifying desired location, age_group, and sex IDs. Exposure category :code:`cat1` is zinc deficiency and exposure category :code:`cat2` is the TMREL.

.. code:: python

	get_draws(gbd_id_type='rei_id', 
            gbd_id=97,
            source='exposure',
            year_id=2019,
            gbd_round_id=6,
            status='best',
            decomp_step='step4')

.. note::

	Zinc deficiency exposure data is only stored for age_group_id=5. Queries for zinc deficiency exposure data for other age groups will return an empty dataframe. 

	Zinc deficiency exposure for all other age groups should be specified as not applicable, or 100% exposure probability for exposure category :code:`cat2`, the TMREL.

The exposure values for each exposure category should be used to represent the probability that a simulant will be assigned that exposure.

Validation Criteria
+++++++++++++++++++

The exposure distribution among simulants aged one to four years, calculated as overall person time spent in each exposure category at the age-, sex-, and location-specific level should validate to the risk exposure distribution from GBD 2019.

There should be no zinc deficiency exposure among simulants outside of the one to four age range.

References
----------

.. todo::

	Add citations
	
