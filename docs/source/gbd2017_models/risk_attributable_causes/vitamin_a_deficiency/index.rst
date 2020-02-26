.. _2017_cause_vitamin_a_deficiency:

====================
Vitamin A Deficiency
====================

Disease Description
-------------------

Vitamin A deficiency (VAD) is a lack of vitamin A in blood and tissues.
Vitamin A deficiency is considered as one of the most serious public health concerns in developing countries
and can contribute directly or indirectly to disability.[1] 

GBD 2017 Modeling Strategy
------------------------------------
In Global Burden of Disease (GBD) 2017, VAD exposure definition is proportion of the population with serum retinol concentration <0·7 μmol/L.
Like iron deficiency, the cause VAD is also a population attributable fraction (PAF) of 1 cause with the VAD risk factor. That is, 100% of the VAD cases are attributable 
to the VAD risk factor. VAD Risk exposure and VAD cause prevalence data are the same.[2]

Vitamin A Deficiency Cause
+++++++++++++++++++++++++++++

The VAD in GBD 2017 that is 100% attributable to the 
VAD risk factor. The VAD cause in GBD is a 
YLD-only cause, meaning that it contributes to morbidity, but not mortality.

Modeling Strategy for the Vitamin A Deficiency Cause
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Cause Hierarchy
^^^^^^^^^^^^^^^

.. image:: vitA_cause_hierarchy.svg

Health States and Sequela
^^^^^^^^^^^^^^^^^^^^^^^^^
The sequela associated with the Vitamin A deficiency cause in GBD 2017 
include moderate vision impairment loss due to Vitamin A deficiency, 
severe vision impairment loss due to Vitamin A deficiency, blindness due to Vitamin A deficiency, 
asymptomatic Vitamin A deficiency, Vitamin a deficiency with mild anemia, Vitamin A deficiency with moderate anemia,
Vitamin A deficiency with severe anemia. 

.. list-table:: GBD 2017 Cause Restrictions
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
   * - YLL only
     - False
     -
   * - YLD only
     - True
     -
   * - YLD age group start
     - Early Neonatal
     - (0, 6 days], age_group_id = 2
   * - YLD age group end
     - 95 Plus
     - (95, 125], age_group_id = 235

Vitamin A Deficiency Risk Factor
+++++++++++++++++++++++++++

The Vitamin A deficiency risk factor in GBD 2017 is a **dichotomous variable** . 
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
	* - Risk factor exposure
	  - gbd_id = reiid(96)
	  - como, use get_measure

Relative Risks
^^^^^^^^^^^^^^^^

The affected causes with the Vitamin A deficiency cause in GBD 2017 
include Lower respiratory infections, diarrhoeal diseases, measles. 

Risk Factor Hierarchy
^^^^^^^^^^^^^^^^^^^^^

.. image:: vitA_risk_hierarchy.svg

.. list-table:: GBD 2017 Risk factor Restrictions
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
   * - YLL only
     - False
     -
   * - YLD only
     - False
     -
   * - YLL age group start
     - Post Neonatal
     - (28, 364 days], age_group_id = 4
   * - YLL age group end
     - 1-4 years
     - (1, 4 years], age_group_id = 5
   * - YLD age group start
     - Early Neonatal
     - (0, 6 days], age_group_id = 2
   * - YLD age group end
     - 95 Plus
     - (95, 125], age_group_id = 235

References
----------

1. Amy L. Rice, Keith P. West JR. and Robert E. Black. Comparative quantification of health risks. Chapter 4 Vitamin A deficiency. 
2. GBD 2017 Risk Factor Collaborators. Global, regional, and national comparative risk assessment of 84 behavioural, environmental and occupational, and metabolic risks or clusters of risks for 195 countries and territories, 1990-2017: a systematic analysis for the Global Burden of Disease Study 2017. Lancet 2018; 392: 1923–94.

