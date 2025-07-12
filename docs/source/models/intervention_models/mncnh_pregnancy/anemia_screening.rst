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

1. Assess a simulants "true" low hemoglobin status based on their hemoglobin exposure *after* action points I, II, and III have been executed (and *before* IV, V, and VI). Low hemoglobin 
    status corresponds to values of <100 g/L and adequate hemoglobin status corresponds to values of 100+ g/L.
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

`The notebook that was used to calculate these values can be found here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/data_prep/fraction_iron_responsive_anemia.ipynb>`_

**Modeling instructions:**

The probability of low ferritin screening is dependent on the simulant's location, age group, and anemia status at the time of screening. Anemia status at the time of screening should be based on their true 
hemoglobin exposure value *after* action points I, II, and III have been executed (and *before* IV, V, and VI). See the :ref:`anemia/hemoglobin exposure table here for reference <2019_anemia_impairment>` and 
remember to use the pregnancy-specific values.

`The probability of low ferritin specific to location, age, and anemia status can be found here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/data_prep/iron_responsive_fraction.csv>`_. 
Record assigned ferritin exposure to output G to be used for V&V in the interactive simulation.

Baseline Coverage Data
++++++++++++++++++++++++

Baseline coverage of the minimally invasive blood test for hemoglobin screening is defined by estimates processed by the Health Systems team. 
The country-specific estimates are available at ``J:\Project\simulation_science\mnch_grant\MNCNH portfolio\anc_iron_prop_st-gpr_results_aggregates_scaled2025-05-30.csv``.

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

