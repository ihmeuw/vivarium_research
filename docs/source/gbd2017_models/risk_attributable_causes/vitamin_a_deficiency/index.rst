.. _2017_cause_vitamin_a_deficiency:

====================
Vitamin A Deficiency
====================

Disease Description
-------------------

Vitamin A deficiency (VAD) is a lack of vitamin A in blood and tissues.
Vitamin A deficiency is considered as one of the most serious public health concerns in developing countries
and can contribute directly or indirectly to disability. 

GBD 2017 Modeling Strategy
------------------------------------
In Global Burden of Disease (GBD) 2017, VAD exposure definition is proportion of the population with serum retinol concentration <0·7 μmol/L.
Like iron deficiency, the cause VAD is also a population attributable fraction (PAF) of 1 cause with the VAD risk factor. That is, 100% of the VAD cases are attributable 
to the VAD risk factor. VAD Risk exposure and VAD cause prevalence data are the same.

Vitamin A Deficiency Cause
+++++++++++++++++++++++++++++

The VAD in GBD 2017 that is 100% attributable to the 
VAD risk factor. The VAD cause in GBD is a 
YLD-only cause, meaning that it contributes to morbidity, but not mortality.

Modeling Strategy for the Vitamin A Deficiency Cause
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. todo::

	Describe cause in detail


Vitamin A Deficiency Risk Factor
+++++++++++++++++++++++++++

The Vitamin A deficiency risk factor in GBD 2017 is a ** dichotomous variable** . 
Below is a list of measures and corresponding IDs:

.. list-table:: Measures
	:widths: 40 40 40
	:header-rows: 1

	* - Measure
	  - ID
	  - Data source
	* - Remission
	  - gbd_id = 2510, measure_id = 7
	  - epi, use get_model_results function
	* - Incidence rate
	  - gbd_id = cid(389)
	  - como, use get_measure
	* - Risk factor
	  - gbd_id = reiid(96)
	  - como, use get_measure

Relative Risks
^^^^^^^^^^^^^^^^

The affected causes with the Vitamin A deficiency cause in GBD 2017 
include Lower respiratory infections, diarrhoeal diseases, measles. 

References
----------

James SL, Abate D, Abate KH, et al. Global, regional, and national incidence, prevalence, and years lived with disability for 354 diseases and injuries for 195 countries and territories, 1990–2017: a systematic analysis for the Global Burden of Disease Study 2017. The Lancet 2018; 392: 1789–858.
