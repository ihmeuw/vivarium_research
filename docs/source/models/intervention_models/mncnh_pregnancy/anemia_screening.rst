.. _anemia_screening:

================
Anemia Screening
================

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - GBD
    - Global Burden of Disease
    - 

Intervention Overview
-----------------------

Hemoglobin Screening Accuracy Instructions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Research background:**

Anaemia is defined as decreased blood concentration of haemoglobin, irrespective of underlying cause, red blood cell morphology, or red blood cell function. 
A noninvasive blood test (using a small, portable device such as a `HemoCue test <https://hemocue.com/us/>`_) can be provided to pregnant people in their 2nd or 3rd 
trimester at antenatal care clinics to quickly and accurately measure hemoglobin levels in blood. If a pregnant person is found to have hemoglobin less than 100 g/L based on this
hemoglobin screening, they will also be screened for ferritin levels, which you can read more about in the following section. This page describes how an anemia
screening intervention (including hemoglobin and ferritin screenings) can be implemented and calibrated for the :ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>`.

**Modeling instructions:**

For decision node 7 (see the :ref:`hemoglobin module page <2024_vivarium_mncnh_portfolio_hemoglobin_module>` for details), we will assess whether or not the result of a simulant's noninvasive 
blood test for hemoglobin screening is <100 g/L, which may be different than whether a simulant's *actual* hemoglobin exposure is <100 g/L. We will do this based on assumed 
sensitivity and specificity levels for the hemoglobin screening test as informed from the Gates Foundation and listed below:

- Sensitivity (percent of true positives that test positive): 85% 
- Specificity (percent of true negatives that test negative): 80%

Follow the steps below to determine the answer to decision node #7:

1. Assess a simulants "true" low hemoglobin status based on their hemoglobin exposure at the time of screening, which should be based on their true 
hemoglobin exposure value *after* effects from oral iron received at the first trimester ANC visit and *before* any effects from interventions received at the second trimester have been applied. In other words, use oral iron-affected hemoglobin exposure for those who attend ANC during the first trimester and "ifa-deleted" hemoglobin exposure for those who do not attend ANC during the first trimester (but do later in pregnancy). Low hemoglobin status corresponds to values of <100 g/L and adequate hemoglobin status corresponds to values of 100+ g/L.
2. For simulants that are truly low hemoglobin, assign tests low hemoglobin status to 85% (sensitivity value) and tests adequate hemoglobin status to 15% (100 - sensitivity value of 85)
3. For simulants that are truly adequate hemoglobin, assign tests adequate hemoglobin status to 80% (specificity) and tests low hemoglobin status to 20% (100 - specificty value of 80)
4. Use the test hemoglobin status to determine the answer to decision node 7 (answer is "yes" if they have test low hemoglobin status and "no" if they have test adequate hemoglobin status)
5. Record true and test hemoglobin exposures at the time of screening to outputs F and G (to be used for V&V in the interactive simulation)

Ferritin Screening Instructions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Research background:**

Ferritin is a protein that stores iron within the body and low blood ferritin levels can indicate low iron stores. Pregnancies that have hemoglobin less than 100 g/L based on the hemoglobin 
screen will also be screened for ferritin levels via a minimally invasive screening (finger prick). Pregnancies that have a hemoglobin level <100 g/L and a blood ferritin level below 15 ug/L 
(anemic AND iron deficient) are eligible for IV iron.

Notably, the GBD does not have any estimates related to ferritin exposure. However, the GBD assigns specific causes to all cases of anemia. Some of these causes of anemia are considered "iron 
responsive," indicating that they are iron deficiency anemia. An example of an iron deficiency anemia is anemia caused by maternal hemorrhage (caused by blood loss, decreasing systemic levels 
of both hemoglobin and iron). An example of a non-iron responsive anemia is sickle cell trait (low hemoglobin is due to a defect in hemoglobin protein rather than low iron levels). Notably, it 
is possible for non-iron-responsive anemias to also have low iron levels. See the :ref:`anemia impairment document <2019_anemia_impairment>` for a list of iron responsive and non iron responsive 
causes of anemia in the GBD.

Therefore, in our model we will use the severity-specific fraction of iron responsive anemia among all causes of anemia in GBD as a proxy measure for the fraction of anemia cases with low ferritin. 
This approach is limited in that we may slightly underestimate total eligibility by not considering the proportion of the population who has low hemoglobin due to an iron-non-responsive cause and 
also coincidentally has low ferritin.

.. note::

  Chris T. has suggested that we can use the fraction of iron deficiency anemia from the in-progress PRISMA study rather than GBD for this purpose. PRIMSA study results are expected in June or July of 2025.

**Modeling instructions:**

The probability of low ferritin screening is dependent on the simulant's location, age group, and anemia status at the time of screening. Anemia status at the time of screening should be based on their true 
hemoglobin exposure value *after* effects from oral iron received at the first trimester ANC visit and *before* any effects from interventions received at the second trimester have been applied. In other words, use oral iron-affected hemoglobin exposure for those who attend ANC during the first trimester and "ifa-deleted" hemoglobin exposure for those who do not attend ANC during the first trimester (but do later in pregnancy). See the :ref:`anemia/hemoglobin exposure table here for reference <2019_anemia_impairment>` and 
remember to use the pregnancy-specific values.

The probability of low ferritin specific to location, age, and anemia status (termed exp_among_{SEVERITY} in the table below) can be calculated according to the parameters defined in the table below.

.. list-table:: Ferritin parameters
  :header-rows: 1

  * - Parameter
    - Definition
    - Value
    - Note
  * - exp_among_non_anemic
    - Rate of low ferritin exposure among the population without anemia
    - exp_among_mild / 2 
    - Model assumption given that it is definitionally expected to have a lower rate than mild anemia, but also should be >0 as it is possible to have low ferritin and adequate hemoglobin
  * - exp_among_{SEVERITY}
    - Rate of low ferritin exposure among the population with a given anemia severity of mild, moderate, or severe
    - prev_{SEVERITY}_iron_responsive_anemia_sequelae / prev_{SEVERITY}_anemia_impairment
    - 
  * - prev_{SEVERITY}_iron_responsive_anemia_sequelae
    - Sum of sequela-level prevalence for specified list of sequela IDs that represent anemia severity-specific iron responsive anemia
    - See ``get_draws`` call below this table
    - 
  * - prev_{SEVERITY}_anemia_impairment
    - Severity-specific anemia impairment prevalence
    - from GBD: source='como', mild anemia REI = 205, moderate anemia REI = 206, severe anemia REI = 207
    - 
  * - mild_ira_sids
    - List of sequela IDs that represent all mild iron responsive anemias
    - [144, 172, 177, 240, 182, 5393, 23030, 23034, 23038, 23046, 23042, 7202, 4976, 4952, 4955, 5627, 7214, 5009, 4985, 4988, 5678, 5567, 5579, 22989, 5225, 5249, 5273, 22990, 5228, 5252, 5276, 22991, 1016, 1421, 1373, 22992, 1024, 1433, 1385, 22993, 1032, 1445, 1397, 1106, 525, 23187, 23179, 23162, 23488, 206] 
    - `List generated in this notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/pull/137>`__
  * - moderate_ira_sids
    - List of sequela IDs that represent all moderate iron responsive anemias
    - [145, 173, 178, 241, 183, 5396, 23031, 23035, 23039, 23047, 23043, 7205, 4979, 4958, 4961, 5630, 7217, 5012, 4991, 4994, 5681, 5570, 5582, 22999, 5219, 5243, 5267, 23000, 5222, 5246, 5270, 23001, 1017, 1424, 1376, 23002, 1025, 1436, 1388, 23003, 1033, 1448, 1400, 1107, 526, 23188, 23180, 23163, 23489, 207]
    - `List generated in this notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/pull/137>`__
  * - severe_ira_sids
    - List of sequela IDs that represent all severe iron responsive anemias
    - [146, 174, 179, 242, 184, 5399, 23032, 23036, 23040, 23048, 23044, 7208, 4982, 4964, 4967, 5633, 7220, 5015, 4997, 5000, 5684, 5573, 5585, 23009, 5213, 5237, 5261, 23010, 5216, 5240, 5264, 23011, 1018, 1427, 1379, 23012, 1026, 1439, 1391, 23013, 1034, 1451, 1403, 1108, 527, 23189, 23181, 23164, 23490, 208]
    - `List generated in this notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/pull/137>`__


.. code-block::

  from get_draws.api import get_draws
  year_id = 2023
  gbd_release_id = 16 # gbd 2023

  {SEVERITY}_sequela_data = get_draws(release_id=gbd_release_id,
            year_id=year_id,
            sex_id=sex_id,
            age_group_id=age_group_id,
            source='como',
            gbd_id_type='sequela_id',
            gbd_id={SEVERITY}_ira_sids,
            measure_id=5, # prevalence
            sex_id=2, # female (only need female for the MNCNH simulation)
            # location_id = location_ids, # specify according to modeled locations
            # age_group_id = age_group_ids # specific according to modeled age groups
            )
  prev_{SEVERITY}_iron_responsive_anemias = ({SEVERITY}_sequela_data.groupby(['location_id','age_group_id','sex_id'])
                                              [[x for x in {SEVERITY}_sequela_data.columns if 'draw' in x]].sum())


Baseline Coverage Data
++++++++++++++++++++++++

Baseline coverage of the minimally invasive blood test for hemoglobin screening is defined by estimates processed by the Health Systems team. 
The country-specific estimates are available at ``J:\Project\simulation_science\mnch_grant\MNCNH portfolio\anc_bloodsample_prop_st-gpr_results_aggregates_scaled2025-05-29.csv``.

Baseline coverage of ferritin screening is defined in the table below. 

.. list-table:: Baseline Coverage of Ferritin Screening
  :widths: 15 15 15 15
  :header-rows: 1

  * - Location
    - Coverage Mean (%)
    - Coverage Distribution (%)
    - Notes
  * - All (Ethiopia, Nigeria, Pakistan)
    - 0
    - N/A
    - This is an assumption based on literature evidence that many ANC programs primarily focus on hemoglobin screening, and ferritin 
      screening is not widely available at ANCs in Nigeria, Ethiopia, or Pakistan. (e.g. [Teichman-et-al-2021]_ assessed ferritin testing 
      prevalence in high-resource settings in Ontario and found 59.4% of pregnant patients were ferritin tested during pregnancy but 
      that this was significantly lower in low-income areas, with only 4.1% in the lowest wealth quintile.)


Assumptions and Limitations
---------------------------

- We assume that if a pregnant person had their blood drawn at the ANC during their pregnancy, their hemoglobin concentration was assessed. We thereby
  assume that the coverage estimates for blood samples taken at ANC that we received from the Health Systems team are reasonable values
  for baseline coverage of hemoglobin screening at ANC in our locations of interest.
- We assume that baseline coverage for ferritin screening at ANC is 0%, based on literature evidence that many ANC programs primarily 
  focus on hemoglobin screening, and is not widely implemented in Nigeria, Ethiopia, or Pakistan. (e.g. [Teichman-et-al-2021]_ assessed ferritin testing 
  prevalence in high-resource settings in Ontario and found 59.4% of pregnant patients were ferritin tested during pregnancy but 
  that this was significantly lower in low-income areas, with only 4.1% in the lowest wealth quintile.)
- We assume a hemoglobin screening sensitivity of 85% and specificity of 80%, as requested by the Gates Foundation
- Our approach to modeling hemoglobin screening sensitivity and specificity does not vary by hemoglobin exposure. In other 
  words, you are no more likely to have your hemoglobin exposure misclassified by the screening if your exposure is very close 
  to the threshold than if you expsoure is far away from the threshold. This will likely result in more cases of individuals 
  without *any* anemia (high hemoglobin) testing as low hemoglobin and those with very low hemoglobin testing as adequate 
  hemoglobin than may happen in practice. This may cause us to understimate the impact of the IV iron intervention.
  Note that an alternative to this limited approach we are taking would be to model some error around hemoglobin exposure 
  (sampling from some distribution and adding it to hemoglobin exposure to get test exposure, similar to what is done for 
  gestational age assessment in the :ref:`AI ultrasound model <2024_vivarium_mncnh_portfolio_ai_ultrasound_module>`). However, 
  in order to match the desired sensitivity and specificity of the screening test, we would need to solve for the uncertainty 
  distribution, likely via optimization, at the location-specific level (as it will depend on the underlying population 
  hemoglobin exposure distribution).
- We use the severity-specific fraction of iron responsive anemia among all causes of anemia in GBD as a proxy measure for the fraction of anemia cases with low ferritin. This approach is limited in that we may slightly underestimate total eligibility by not considering the proportion of the population who has low hemoglobin due to an iron-non-responsive cause and also coincidentally has low ferritin.
- In the absence of data to directly inform otherwise, we assume that the population without anemia has half the rate of low ferritin exposure as the population with mild anemia. We made this assumption given that the population without anemia is expected to have a low ferritin exposure level that is greater than zero but less than that of the population with mild anemia.

.. todo:: 

  If we find more suitable baseline coverage data for ferritin screening in ANCs in our locations of interest, we will update this page accordingly. 

Validation and Verification Criteria
------------------------------------

The following V&V criteria should be met: 

- The coverage of each intervention (hemoglobin screening and ferritin screening) by scenario should match the proportions outlined in the :ref:`Scenarios section of the MNCNH
  Portfolio concept model <mncnh_portfolio_3.1>`
- There should be a sensitivity (% of true positives that test positive) of 85% and specifity (% of true negatives that test negative) of 80% for those that received hemoglobin screenings.
- There should be the expected proportion of simulants with low and high ferritin status for those that received ferritin screenings.

References
------------

.. [Teichman-et-al-2021]
  Teichman, J., Nisenbaum, R., Lausman, A., Shlozberg, M. Suboptimal iron deficiency screening in pregnancy and the impact of socioeconomic status in a high-resource setting. Blood Adv (2021) 5 (22): 4666–4673. https://doi.org/10.1182/bloodadvances.2021004352

