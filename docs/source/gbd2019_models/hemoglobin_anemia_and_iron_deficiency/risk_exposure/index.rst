.. _2019_risk_exposure_iron_deficiency:

=============================
Iron Deficiency Risk Exposure
=============================

.. contents::
   :local:
   :depth: 2

Risk Exposure Description in GBD 2019
-------------------------------------

Iron deficiency in the GBD risk factors is defined as **inadequate iron to meet the body's needs** and is quantified in terms of mean hemoglobin concentration at the population level from the cumulative effect of all causes that lead to iron deficiency, including dietary iron deficiency (GBD *cause* of inadequate intake of elemental iron) as well as other causes that manifest as iron deficiency (eg, maternal hemorrhage, uterine fibroids, menstrual disorders, hookworm, schistosomiasis, gastritis and duodenitis, inflammatory bowel disease, etc.).

Notably, there are two different approaches to the estimation of the iron deficiency risk exposure in GBD 2019. We will refer to these as *Global TMREL exposure estimation* and *location-specific TMREL exposure estimation*. Of note, the *Global TMREL exposure estimation* approach was used for the calculation of the iron deficiency exposure in GBD 2019, although the *location-specific TMREL exposure estimation* approach is described in the GBD 2019 Risk Factor methods appendix. Each approach is described below.

Regardless of the exposure estimation approach, the iron deficiency risk factor is defined as a **continuous distribution of hemoglobin concentrations in g/L**.

.. image:: iron_risk_hierarchy.svg

Global TMREL Exposure Estimation
++++++++++++++++++++++++++++++++

This estimation approach is not described in the GBD 2019 Risk Factor Methods Appendix, but is documented in the IHME stash repo for the iron deficiency risk factor, `here <https://stash.ihme.washington.edu/projects/MNCH/repos/anemia_causal_attribution/browse/iron_deficiency>`_, specifically in the `calculate_normal_hgb.py` and `nutrition_iron_exposure.py` files. For the GBD 2019 estimation of the iron deficiency risk factor exposure, the following was performed:

#. Estimate the TMREL

	The iron deficiency TMREL was estimated as the 95th percentile of mean population hemoglobin concentration among all GBD locations for each year-, sex-, and age-specific demographic group. If the observed mean population hemoglobin concentration for a given location was greater than the 95th percentile, then the observed population hemoglobin concentration was used as the TMREL for that location. See the specific code `here <https://stash.ihme.washington.edu/projects/MNCH/repos/anemia_causal_attribution/browse/iron_deficiency/calculate_normal_hgb.py>`_.

	This value is stored as the TMREL for the iron deficiency risk factor in GBD 2019.

#. Calculate iron deficiency risk exposure

	The iron deficiency risk factor is calculated according to the following equation, as documented `here <https://stash.ihme.washington.edu/projects/MNCH/repos/anemia_causal_attribution/browse/iron_deficiency/nutrition_iron_exposure.py>`_ and externally validated `here <https://github.com/ihmeuw/sim_sci_maternal_anemia/blob/master/data_validation/maternal_disorders_burden/custom_paf_calculations.ipynb>`_.

	:math:`exposure = TMREL - (p_* * (TMREL - mean_\text{Hgb}))`

	Where, :math:`p_*` is the summed prevalence of all anemia caused by any disease except dietary iron deficiency (using the MEIDs listed below) and :math:`mean_\text{Hgb}` is the observed mean population hemoglobin value (MEID = 10487).

	This exposure value is stored as the exposure for the iron deficiency risk factor in GBD 2019.

	The iron deficiency risk exposure estimated in this way can be interpreted as the counterfactual population mean hemoglobin concentration in the absence of all diseases that do NOT cause iron deficiency, according to a correspondence with Nick Kassebaum, who leads the GBD team responsible for these estimates. However, it is important to note that the code used does not consider diseases that cause non-dietary iron deficiency.

.. list-table:: MEIDs Used for the Global TMREL exposure estimation
  :widths: 15
  :header-rows: 1

  * - MEIDs
  * - 23376, 23381, 23386, 23377, 23382, 23387, 23378, 23383, 23388, 23379, 23384, 23389, 1929, 1930, 1931, 1925, 1926, 1927, 2131, 2132, 2133, 2065, 2066, 2067, 2082, 2083, 2084, 2113, 2114, 2115, 2506, 2507, 2508, 2119, 2120, 2121, 2492, 2493, 2494, 2495, 2496, 2497, 2498, 2499, 2500, 2502, 2503, 2504, 2475, 2476, 2477, 2478, 2479, 2480, 2481, 2482, 2483, 2485, 2486, 2487, 2489, 2490, 2491, 1666, 1667, 1668, 19391, 19392, 19393, 19395, 19396, 19397, 19399, 19400, 19401, 16314, 16315, 16316, 1538, 1539, 1540, 1522, 1523, 1524, 1532, 1533, 1534, 1476, 1477, 1478, 19737, 19738, 19739, 19798, 19799, 19800, 18864, 18865, 18866, 18861, 18862, 18863

.. note:: 

	The MEIDs listed above were obtained from the *"out_meids"* tab in the excel file hosted `here <https://stash.ihme.washington.edu/projects/MNCH/repos/anemia_causal_attribution/browse/in_out_meid_map.xlsx>`_.

Location-Specific TMREL Exposure Estimation
++++++++++++++++++++++++++++++++++++++++++++

This estimation approach is described in the GBD 2019 Risk Factor Methods Appendix, but NOT used in GBD 2019 iron deficiency risk exposure calculations. Therefore, the following description does not reflect the values stored for the GBD 2019 iron deficiency risk factor, but represent an alternative estimation approach that is "conceptually/clinically more correct" than the Global TMREL exposure estimation approach according to a correspondence with Nick Kassebaum, although it did not meet the GBD 2019 requirement that TMRELs are not location-specific.

The location-specific TMREL exposure estimation approach has the following steps:

#. Estimate a location-specific TMREL, defined as the counterfactual population mean hemoglobin concentration in the absence of all diseases that cause iron deficiency

	:math:`TMREL = mean_\text{Hgb} + \sum_{c=1}^{n} p_c * shift_c`

	Where, :math:`\sum_{c=1}^{n} p_c * shift_c` represents the sum of the cause-specific prevalence multiplied by the cause-specific hemoglobin shift for all causes of iron deficiency and :math:`mean_\text{Hgb}` is the observed mean population hemoglobin concentration (MEID 10487).

	An estimation of the TMREL using this method can be found `here <https://github.com/ihmeuw/sim_sci_maternal_anemia/blob/master/data_validation/maternal_disorders_burden/custom_paf_calculations.ipynb>`_.

	The cause-specific hemoglobin shifts represent the average difference in hemoglobin concentration among individuals afflicted with that cause and the general population (from the literature) and can be found `here <https://github.com/ihmeuw/sim_sci_maternal_anemia/blob/master/data_validation/maternal_disorders_burden/hb_shifts.csv>`_. Note that these shifts are sex-specific but do not vary by age. Additionally, these shifts apply to mean hemoglobin concentration only; it is assumed that there is no change in hemoglobin distribution standard deviation, which is a limitation in this analysis due to a significant data gap.

	The following table lists the relevant IDs for the diseases that cause iron deficiency that should be used for this analysis.

.. list-table:: IDs Used for the Location-Specific TMREL exposure estimation
  :widths: 15 15 15
  :header-rows: 1

  * - Disease
    - ID Type
    - ID
  * - Stage 5 Chronic Kidney Disease
    - MEID
    - 2022
  * - Stage 4 Chronic Kidney Disease
    - MEID
    - 10733
  * - Stage 3 Chronic Kidney Disease
    - MEID
    - 10732
  * - Symptomatic Uterine Fibroids
    - MEID
    - 3121
  * - Menstrual Disorders
    - MEID
    - 18741
  * - Crohn's Disease
    - MEID
    - 3104
  * - Ulcerative Colitis
    - MEID
    - 3103
  * - Maternal Hemorrhage Adjusted for Live Births
    - MEID 
    - 3620
  * - Cirrhosis
    - Cause
    - 521
  * - Gastritis
    - Cause
    - 528
  * - Peptic Ulcer Disease
    - Cause
    - 527
  * - Other endocrine, nutrition, blood, and immune disorders
    - Cause
    - 619
  * - Other Infectious Diseases
    - Cause
    - 408
  * - Hookworm Disease
    - Cause
    - 363
  * - Other Neglected Tropical Diseases
    - Cause
    - 365
  * - Schistosomiasis
    - Cause
    - 351
  * - Dietary Iron Deficiency
    - Cause
    - 390
  * - Vitamin A Deficiency
    - Cause
    - 389
  * - End-Stage Renal Disease on Dialysis
    - Sequela
    - 22989, 22990, 22991, 22992, 22993, 22999, 23000, 23001, 23002, 23003, 23009, 23010, 23011, 23012, 23013, 23019, 23020, 23021, 23022, 23023

.. note::

	There are some diseases that cause iron deficiency that are available in the necessary format as modelable entities or sequelae rather than causes, which is why several ID types are listed in the table above.

#. Estimate iron deficiency risk exposure as the observed mean population hemoglobin concentration

	In the location-specific TMREL exposure estimation approach, the iron deficiency risk exposure is equal to the observed mean population hemoglobin concentration, which can be pulled at the draw level using the following code:

	.. code-block:: 

		get_draws('modelable_entity_id', 10487, source='epi', year_id=2019, gbd_round_id=6, decomp_step='step4', status='best')

Special Considerations for Pregnant and Lactating Women
++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Notably, both of the exposure estimations strategies described above utlize the mean population hemoglobin concentration, :math:`mean_\text{Hgb}`. In order for the exposure estimate to be specific to the population of pregnant and lactating women, the mean hemoglobin concentration among this population (calculated using the pregnany adjustment factor described on the :ref:`Hemoglobin Model Documentation Page <2019_hemoglobin_model>` can be used for this value.

To see the implications of this strategy, see the notebook hosted HERE.

.. todo::

  Link maternal anemia project repo

Vivarium Modeling Strategy
--------------------------

NOTE: It is likely not necessary to model iron deficiency risk exposure for Vivarium projects. See the :ref:`Iron Deficiency Risk Effects Document` <2019_risk_effect_iron_deficiency>` for more details.

References
----------

.. [Kassebaum-et-al-2016]

  View `Kassebaum et al. 2016`_

    Kassebaum NJ, GBD 2013 Anemia Collaborators. The Global Burden of
    Anemia. Hematol Oncol Clin North Am. 2016 Apr;30(2):247-308. doi: https://doi.org/10.1016/j.hoc.2015.11.002

.. _`Kassebaum et al. 2016`: https://www.clinicalkey.com/service/content/pdf/watermarked/1-s2.0-S0889858815001896.pdf?locale=en_US&searchIndex=