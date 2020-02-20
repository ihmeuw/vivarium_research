.. _2017 cause iron deficiency:

================================================
Dietary Iron Deficiency (Iron Deficiency Anemia)
================================================

Disease Description
-------------------

Generally, **anemia** is a condition defined by a deficiency of red blood cells 
or a deficiency of hemoglobin in the blood. Anemia is typically classified by 
hemoglobin concentrations below a defined threshold that varies by age and sex. 
Severity of anemia is similarly classified according to ranges of hemoglobin 
concentrations. Anemia is associated with increased morbidity and mortality and 
symptoms of anemia often include weakness, fatigue, and difficulty 
concentrating [Kassebaum-et-al-2016]_.

 Notably, anemia may be caused by many diverse factors. Examples of factors 
 that may cause anemia include genetic mutations in hemoglobin genes, acute or 
 chronic blood loss, altered red blood cell morphology, inadequate nutritional 
 intake, and others [Kassebaum-et-al-2016]_.

**Iron deficiency anemia** is a type of anemia that is due to insufficient 
iron levels, which lead to a deficiency of hemoglobin in the blood. Notably, 
iron deficiency anemia can occur when dietary intake of iron is insufficient, 
although it may occur in other situations as well, such as when iron is lost 
through bleeding (ex: menstrual disorders, hookworm disease, etc.). Iron 
deficiency anemia is the most common cause of anemia globally in most 
populations.

**Dietary iron deficiency anemia** is a specific type of iron deficiency anemia 
that is due to inadequate dietary intake of iron, leading to inadequate iron 
levels in the body and a subsequent deficiency of hemoglobin in the blood.

Modeling Iron Deficiency in GBD 2017
------------------------------------

In GBD 2017, the cause dietary iron deficiency is a population attributable 
fraction (PAF) of 1 cause with the iron deficiency risk factor. This means 
that 100% of the dietary iron deficiency cases are attributable to the iron 
deficiency risk factor. Notably, there are additional causes other than 
dietary iron deficiency that are attributable to the iron deficiency risk 
factors (ex: maternal disorders).

Additionally, there is an anemia *impairment* modeled in GBD 2017 that 
represents **all** forms of anemia that are attributable to several causes, 
including causes such as hemoglobinopathies and hemolytic anemias that are not 
causally attributable to iron deficiency. 

Anemia Impairment
+++++++++++++++++

The anemia impairment in GBD 2017 represents the total prevalence of anemia due 
to all causes modeled in GBD (ex: dietary iron deficiency anemia, anemia due to 
maternal hemorrhage, sickle cell anemia, etc.). Estimating the total prevalence 
of the anemia impairment for a given population is the first step in modeling 
anemia in GBD 2017. This is done by fitting a distribution of hemoglobin levels 
for that population from primary input data. For GBD 2017, an ensemble 
distribution was used, which was 40% gamma and 60% mirror gumbel. Source code 
for this process is available `here <https://stash.ihme.washington.edu/projects/MNCH/repos/anemia/browse/model/envelope>`_.

Once a distribution is fit to hemoglobin levels for a particular age-, 
sex-, and location-specific demographic group, the prevalence of anemia (by 
severity level) in each group is determined by the WHO hemoglobin thresholds 
defined in the following table.

.. _above:

.. list-table:: WHO Hemoglobin Thresholds (g/L) [Kassebaum-et-al-2016]_
	:widths: 15, 15, 15, 15
	:header-rows: 1

	* - Group
	  - Mild Anemia
	  - Moderate Anemia
	  - Severe Anemia
	* - Males and Females <1 month
	  - 130-149
	  - 90-129
	  - <90
	* - Males and Females 1 month - 4 years
	  - 100-109
	  - 70-99
	  - <70
	* - Males and Females 5-14 years
	  - 110-114
	  - 80-109
	  - <80
	* - Males 15+ years
	  - 110-129
	  - 80-109
	  - <80
	* - Females 15+ years, non-pregnant 
	  - 110-119
	  - 80-109
	  - <80
	* - Females 15+ years, pregnant
	  - 100-109
	  - 70-00
	  - <70

The prevalence of anemia as calculated in the process described above serves as 
the overall anemia envelope for a age-, sex-, and location-specific demographic 
groups, and prevalent cases of anemia in the anemia envelope are then causally 
attributed to various causes in GBD 2017 that have anemia as seqeulae. This is 
done through a process described in the [GBD-2017-YLD-Appendix-IDA]_.

.. todo::

	Describe the causal attribution process in greater detail

Notably, early neonatal and late neonatal age groups (age group IDs 2 and 3) 
are excluded from this process; instead, these age groups are assigned the 
anemia prevalence from the postneonatal age group (age group ID 4).

Additionally, a pregnancy correction is performed for women of reproductive 
age. Therefore, additional considerations beyond the scope of the current 
documentation will need to be made if planning to model hemoglobin among women 
of reproductive age.

Dietary Iron Deficiency Cause
+++++++++++++++++++++++++++++

The dietary iron deficiency cause in GBD 2017 that is 100% attributable to the 
iron deficiency risk factor. The dietary iron deficiency cause in GBD is a 
YLD-only cause, meaning that it contributes to morbidity, but not mortality.

Modeling Strategy for the Dietary Iron Deficiency Cause
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The dietary iron deficiency cause in GBD 2017 is not modeled directly. Rather, 
the dietary iron deficiency cause is estimated as the remaining cases of 
anemia after all of the other anemic cases in the overall anemia envelope were 
causally attributed to their respective attributable causes (ex: 
hemoglobinopathies and hemolytic anemias).

Cause Hierarchy
^^^^^^^^^^^^^^^

.. image:: iron_cause_hierarchy.svg

Health States and Sequela
^^^^^^^^^^^^^^^^^^^^^^^^^

The sequela associated with the dietary iron deficiency cause in GBD 2017 
include mild iron deficiency anemia, moderate iron deficiency anemia, and 
severe iron deficiency anemia. The severity of iron deficiency anemia is 
determined by the WHO age- and sex- specific hemoglobin concentrations, as 
described in the table above.

Iron Deficiency Risk Factor
+++++++++++++++++++++++++++

In GBD 2017, the iron deficiency risk factor is used to evaluate the burden of 
disease attributable to iron deficiency. This is done by calculating a TMREL 
for iron deficiency by estimating the counterfactual mean hemoglobin 
concentration among a given population that there were no cases of iron 
responsive anemia in the population. For the iron deficiency risk factor, iron 
responsive anemia was considered to include all anemias that would respond to 
iron supplementation, including dietary iron deficiency as well as acute or 
chronic hemorrhagic states. A full list of the included causes are included in 
the table below.

.. list-table:: Causes 
	:widths: 40 40 40
	:header-rows: 1

	* - Cause
	  - Cause ID
	  - Anemia-Afflicated Sequela ID
	* - Dietary Iron Deficiency
	  - 390
	  - 206, 207, 208
	* - Endocrine, Metabolic, Blood, and Immune Disorders
	  - 619
	  - 537, 538, 539
	* - Uterine Fibroids
	  - 604
	  - 1106, 1107, 1108
	* - Other Gynecological Diseases
	  - 612
	  - 525, 526, 527
	* - Hookworm disease
	  - 363
	  - 172, 173, 174
	* - Schistosomiasis
	  - 351
	  - 144, 145, 146
	* - Other Neglected Tropical Diseases
	  - 365
	  - 177, 178, 179
	* - Other Unspecified Infectious Diseases
	  - 961
	  - 240, 241, 242
	* - Maternal Hemorrhage
	  - 367
	  - 182, 183, 184
	* - Vitamin A Deficiency
	  - 389
	  - 5393, 5396, 5399
	* - Peptic Ulcer Disease
	  - 527
	  - 4952, 4955, 4958, 4961, 4964, 4967, 4976, 4979, 4982, 5627, 5630, 5633, 7202, 7205, 7208
	* - Gastritis and Duodenitis
	  - 528
	  - 4985, 4988, 4991, 4994, 4997, 5000, 5009, 5012, 5015, 5678, 5681, 5684, 7214, 7217, 7220
	* - Chronic Kidney Disease
	  - 589 (591, 592, 593, 997, 998)
	  - 1004, 1005, 1006, 1008, 1009, 1010, 1012, 1013, 1014, 1016, 1017, 1018, 1020, 1021, 1022, 1024, 1025, 1026, 1028, 1029, 1030, 1032, 1033, 1034, 1361, 1364, 1367, 1373, 1376, 1379, 1385, 1388, 1391, 1397, 1400, 1403, 1409, 1412, 1415, 1421, 1424, 1427, 1433, 1436, 1439, 1445, 1448, 1451, 5213, 5216, 5219, 5222, 5225, 5228, 5237, 5240, 5243, 5246, 5249, 5252, 5261, 5264, 5267, 5270, 5273, 5276

.. note::

	According to the GBD modelers, ESRD - Dialysis, Crohn's disease, and 
	ulcerative colitis were also included in this list, although there do not 
	appear to be results for these causes in GBD 2017. Additionally, according 
	to the GBD modelers, cirrhosis should be included in this list, although 
	there do not appear to be any anemia-afflicted sequelae with results in GBD 
	2017 within any of the cirrhosis causes.

The TMREL established as described above is then used to estimate population 
attributable fractions and summary exposure variables for the iron deficiency 
risk factor through standard GBD computation practices. However, the data 
stored for the iron deficiency risk factor (REI ID #95) is the **age-, sex-, 
and location-specific mean hemoglobin concentration among the total 
population.** Like the distribution that represents the overall anemia 
envelope, the distribution for the mean value stored in the iron deficiency 
risk factor is also assumed to follow a 40% gamma and 60% mirror Gumbel 
ensemble distribution. The mean value for the iron deficiency risk factor is 
stored under modelable entity ID 10487 (also REI ID 95) and the standard 
deviation is stored under modelable entity ID 10488.

The ensemble distribution of hemoglobin concentrations for population afflicted 
with the causes listed in the table above can be recreated with the following 
equations: 

.. list-table:: Constants 
	:widths: 10, 5, 15
	:header-rows: 1

	* - Constant
	  - Value
	  - Note
	* - w_gamma
	  - 0.4
	  - Ensemble weight for gamma distribution
	* - w_mirror_gumbel
	  - 0.6
	  - Ensemble weight for mirror gumbel distribution
	* - eulers_constant
	  - 0.57721566
	  - 
	* - xmax
	  - 220
	  - TO-DO: define this value

.. list-table:: Distribution Parameters
	:widths: 15, 30, 10
	:header-rows: 1

	* - Parameter
	  - Value
	  - Note
	* - gamma_shape
	  - (meid_10487)^2 / (meid_10488)^2
	  -
	* - gamma_rate
	  - (meid_10487) / (meid_10488)^2
	  - 
	* - mirror_gumbel_alpha
	  - xmax - (meid_10487) - eulers_constant * (meid_10488) * sqrt(6) / pi
	  - 
	* - mirror_gumbel_scale
	  - (meid_10488) * sqrt(6) / pi
	  - 

Python code used to recreate the prevalence of anemia for a specific demogrphic 
group using the ensemble distribution is included below (assuming age- and sex- 
specific *anemia_threshold* values, as defined in the table above_):

.. code-block:: Python

	import scipy.stats


	# overall iron-responsive anemia prevalence
	gamma_prev = scipy.stats.gamma(gamma_shape, loc=0, 
				scale=1/gamma_rate).cdf(mild_anemia_threshold)
	mirror_gumbel_prev = 1 - scipy.stats.gumbel_r(mirror_gumbel_alpha, 
				mirror_gumbel_scale).cdf(xmax - mild_anemia_threshold)
	ensemble_prev = w_gamma * gamma_prev + w_mirror_gumbel * mirror_gumbel_prev


	# severe iron-responsive anemia prevalence
	gamma_severe_prev = scipy.stats.gamma(gamma_shape, loc=0, 
				scale=1/gamma_rate).cdf(severe_anemia_threshold)
	mirror_gumbel_severe_prev = 1 - scipy.stats.gumbel_r(mirror_gumbel_alpha, 
				mirror_gumbel_scale).cdf(xmax - severe_anemia_threshold)
	ensemble_severe_prev = w_gamma * gamma_severe_prev + w_mirror_gumbel * mirror_gumbel_severe_prev	


	# moderate iron-responsive anemia prevalence
	gamma_moderate_prev = scipy.stats.gamma(gamma_shape, loc=0, 
				scale=1/gamma_rate).cdf(moderate_anemia_threshold) - gamma_severe_prev
	mirror_moderate_severe_prev = 1 - scipy.stats.gumbel_r(mirror_gumbel_alpha, 
				mirror_gumbel_scale).cdf(xmax - moderate_anemia_threshold) - gamma_severe_prev
	ensemble_moderate_prev = w_gamma * gamma_moderate_prev + w_mirror_gumbel * mirror_gumbel_moderate_prev	


	# mild iron-responsive anemia prevalence
	gamma_mild_prev = scipy.stats.gamma(gamma_shape, loc=0, 
				scale=1/gamma_rate).cdf(mild_anemia_threshold) - gamma_moderate_prev
	mirror_mild_severe_prev = 1 - scipy.stats.gumbel_r(mirror_gumbel_alpha, 
				mirror_gumbel_scale).cdf(xmax - mild_anemia_threshold) - gamma_moderate_prev
	ensemble_mild_prev = w_gamma * gamma_mild_prev + w_mirror_gumbel * mirror_mild_moderate_prev	

Risk Factor Hierarchy
^^^^^^^^^^^^^^^^^^^^^

.. image:: iron_risk_hierarchy.svg

Vivarium Modeling Strategy
++++++++++++++++++++++++++

.. note:: 

	The Vivarium modeling strategy described here is a strategy to model the PAF-of-one GBD cause dietary iron deficiency (attributable to the iron deficiency risk factor). The modeling strategy described here does *not* consider the realtionship between the GBD iron deficiency risk factor and other causes (i.e. maternal disorders).

The hemoglobin distribution for a given demographic group should be recreated 
under the assumption that it follows the specified ensemble distribution, as 
the python code included above instructs. For the population that is severely 
anemic based on the hemoglobin thresholds, a certain proportion will not 
respond to iron supplementation.

The proportion of the population with mild, moderate, or severe anemia that 
will respond to iron fortification can be measured by:

.. math::

	\frac{\text{prevalence}_\text{total anemia}-\text{prevalence}_\text{iron responsive anemia}}{\text{prevalence}_\text{total anemia}}

Where *prevalence_iron_responsive_anemia* and *prevalence_total_anemia* are 
equal to the severity-, age-, sex-, and location-specific prevalence summed 
across all iron responsive anemia and all total anemia sequela IDs, 
respectively; sequela IDs for each category are listed in the table below. 

.. list-table:: Sequela IDs 
	:widths: 5, 30, 20
	:header-rows: 1

	* - Anemia Severity
	  - All Anemia Sequela
	  - Iron Responsive Anemia Sequela
	* - Mild
	  - 144, 172, 177, 182, 206, 240, 438, 442, 525, 531, 537, 645, 648, 651, 654, 1004, 1008, 1012, 1016, 1020, 1024, 1028, 1032, 1057, 1061, 1065, 1069, 1079, 1089, 1099, 1106, 1120, 1361, 1373, 1385, 1397, 1409, 1421, 1433, 1445, 4952, 4955, 4976, 4985, 4988, 5009, 5018, 5027, 5036, 5051, 5063, 5075, 5087, 5099, 5111, 5123, 5225, 5228, 5249, 5252, 5273, 5276, 5393, 5567, 5579, 5606, 5627, 5648, 5651, 5654, 5678, 5699, 5702, 5705, 7202, 7214, 22989, 22990, 22991, 22992, 22993, 23030, 23034, 23038, 23042, 23046
	  - 144, 172, 177, 182, 206, 240, 525, 537, 1004, 1008, 1012, 1016, 1020, 1024, 1028, 1032, 1106, 1361, 1373, 1385, 1397, 1409, 1421, 1433, 1445, 4952, 4955, 4976, 4985, 4988, 5009, 5225, 5228, 5249, 5252, 5273, 5276, 5393, 5567, 5579, 5627, 5678, 7202, 7214, 23030, 23034, 23038, 23042, 23046
	* - Moderate
	  - 145, 173, 178, 183, 207, 241, 439, 443, 526, 532, 538, 646, 649, 652, 655, 1005, 1009, 1013, 1017, 1021, 1025, 1029, 1033, 1058, 1062, 1066, 1070, 1080, 1090, 1100, 1107, 1121, 1364, 1376, 1388, 1400, 1412, 1424, 1436, 1448, 4958, 4961, 4979, 4991, 4994, 5012, 5021, 5030, 5039, 5054, 5066, 5078, 5090, 5102, 5114, 5126, 5219, 5222, 5243, 5246, 5267, 5270, 5396, 5570, 5582, 5609, 5630, 5657, 5660, 5663, 5681, 5708, 5711, 5714, 7205, 7217, 22999, 23000, 23001, 23002, 23003, 23031, 23035, 23039, 23043, 23047
	  - 145, 173, 178, 183, 207, 241, 526, 538, 1005, 1009, 1013, 1017, 1021, 1025, 1029, 1033, 1107, 1364, 1376, 1388, 1400, 1412, 1424, 1436, 1448, 4958, 4961, 4979, 4991, 4994, 5012, 5219, 5222, 5243, 5246, 5267, 5270, 5396, 5570, 5582, 5630, 5681, 7205, 7217, 23031, 23035, 23039, 23043, 23047
	* - Severe
	  - 146, 174, 179, 184, 208, 242, 440, 444, 527, 533, 539, 647, 650, 653, 656, 1006, 1010, 1014, 1018, 1022, 1026, 1030, 1034, 1059, 1060, 1063, 1064, 1067, 1068, 1071, 1074, 1075, 1077, 1081, 1083, 1085, 1087, 1091, 1093, 1095, 1097, 1101, 1108, 1122, 1367, 1379, 1391, 1403, 1415, 1427, 1439, 1451, 4964, 4967, 4982, 4997, 5000, 5015, 5024, 5033, 5042, 5057, 5069, 5081, 5093, 5105, 5117, 5129, 5213, 5216, 5237, 5240, 5261, 5264, 5399, 5573, 5585, 5612, 5633, 5666, 5669, 5672, 5684, 5717, 5720, 5723, 7208, 7220, 23009, 23010, 23011, 23012, 23013, 23032, 23036, 23040, 23044, 23048
	  - 146, 174, 179, 184, 208, 242, 527, 539, 1006, 1010, 1014, 1018, 1022, 1026, 1030, 1034, 1108, 1367, 1379, 1391, 1403, 1415, 1427, 1439, 1451, 4964, 4967, 4982, 4997, 5000, 5015, 5213, 5216, 5237, 5240, 5261, 5264, 5399, 5573, 5585, 5633, 5684, 7208, 7220, 23032, 23036, 23040, 23044, 23048

Then, effect sizes for iron supplementation or fortification interventions as 
shifts in mean hemoglobin concentrations should be applied to the entire 
population, excluding the fraction of each anemia severity that will not 
respond to iron supplementation, as calculated as described above. The 
resulting population mean should then be applied as the intervention scenario 
value for the iron deficiency risk factor exposure.

Model Assumptions and Limitations
---------------------------------

Because hemoglobin concentrations are not directly modeled among the early and 
late neonatal age groups in GBD, the prevalence of mild, moderate, and severe 
anemia are assumed to be equal to the prevalence in the postneonatal age group. 
Therefore, this model is limited when applied to neonatal age groups.

The modeling strategy currently described in this document does not consider 
the effect of pregnancy on hemoglobin concentration and therefore is limited in 
that is should not be used to model women of reproductive age.

The modeling strategy both as conducted by the GBD modelers and as described in 
this document assume a constant shape and standard deviation in the hemoglobin 
distribution throughout the modeling process. This is a limitation of our 
modeling strategy in that we assume the distribution before a shift is applied 
maintains the same shift after a shift due to the intervention is applied.

Validation Criteria
-------------------

The overall prevalence of anemia should be equal between:

- The anemia impairment prevalence (overall only)
- The prevalence of anemia summed across all anemia sequlae (overall and severity-specific)
- The prevalence of anemia calculated from the population hemoglobin distribution (overall and severity-specific)

Dietary iron deficiency anemia should account for roughly 80% of total anemia.

References
----------

.. [Kassebaum-et-al-2016]

	View `Kassebaum et al. 2016`_ 

		Kassebaum NJ, GBD 2013 Anemia Collaborators. The Global Burden of 
		Anemia. Hematol Oncol Clin North Am. 2016 Apr;30(2):247-308. doi: https://doi.org/10.1016/j.hoc.2015.11.002

.. _`Kassebaum et al. 2016`: https://www.clinicalkey.com/service/content/pdf/watermarked/1-s2.0-S0889858815001896.pdf?locale=en_US&searchIndex=

.. [GBD-2017-YLD-Appendix-IDA]

   Pages 763-774 in `Supplementary appendix 1 to the GBD 2017 YLD Capstone <YLD
   appendix on ScienceDirect_conda activate vivarium_research>`_:

     **(GBD 2017 YLD Capstone)** GBD 2017 Disease and Injury Incidence and
     Prevalence Collaborators. :title:`Global, regional, and national incidence,
     prevalence, and years lived with disability for 354 diseases and injuries
     for 195 countries and territories, 1990–2017: a systematic analysis for the
     Global Burden of Disease Study 2017`. Lancet 2018; 392: 1789–858. DOI:
     https://doi.org/10.1016/S0140-6736(18)32279-7

.. _YLD appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322797-mmc1.pdf
.. _YLD appendix on Lancet.com: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32279-7/attachment/6db5ab28-cdf3-4009-b10f-b87f9bbdf8a9/mmc1.pdf
