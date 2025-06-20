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

.. _2024_vivarium_mncnh_portfolio_hemoglobin_module:

======================================
Hemoglobin Module
======================================

.. contents::
  :local:
  :depth: 2

1.0 Overview
++++++++++++

This document is the page for the hemoglobin module of the pregnancy component
in the MNCNH Portfolio simulation.

This module will:

  1. Assign starting point hemoglobin exposure based on GBD

  2. Read-in necessary information from ANC module

  3. Modify hemoglobin exposure according to services received during pregnancy

  4. Output the following information:

    - Services received during pregnancy that relate to hemoglobin (for V&V, cost counting)

    - Hemoglobin exposure at the end of pregnancy for hemoglobin risk effect estimation (inputs to downstream models)

.. note::

  This module may have potential dependencies with the hypertension/pre-eclampsia model that have not yet been thought through. Model structure is subject to change in order to accomodate these dependencies.

2.0 Module Diagram and Data
+++++++++++++++++++++++++++++++

2.1 Module Diagram
----------------------

.. note::
  
  As discussed on the :ref:`maternal supplementation intervention document <maternal_supplementation_intervention>`, IFA and MMS have equivalent effects on hemoglobin. This diagram treats them as equivalent for this reason. However, we will need track which product was received as they have differences that will apply to other downstream modules of this simulation. 

.. image:: hemoglobin_component.png

2.2 Module Inputs
---------------------

.. list-table:: Hemoglobin module required inputs
  :header-rows: 1

  * - Input
    - Source module
    - Application
    - Note
  * - First trimester ANC attendance 
    - :ref:`ANC detail module <2024_vivarium_mncnh_portfolio_anc_detail_module>`
    - Decision node #2
    - (True/False value)
  * - Later pregnancy ANC attendance
    - :ref:`ANC detail module <2024_vivarium_mncnh_portfolio_anc_detail_module>`
    - Decision node #4
    - (True/False value)


2.3 Module Decision Nodes
-----------------------------

.. list-table:: Hemoglobin module decision nodes
  :header-rows: 1

  * - Decision node
    - Description
    - Information
    - Note
  * - 1
    - Baseline IFA?
    - * Baseline IFA coverage is defined in the :ref:`pregnancy component scenario table <MNCNH pregnancy component scenario table>`. Probability of "yes" is equal to this coverage value. 
      * Only simulants who attend at least one ANC visit (according to the module inputs) are eligible for baseline IFA coverage. (Probability of "yes" applies directly to this population and only this population)
      * The propensity for answering this question should be the same propensity used for answering decision nodes #3, 6, and 10.
    - 
  * - 2
    - ANC in first trimester?
    - As informed from module input (output from :ref:`ANC detail module <2024_vivarium_mncnh_portfolio_anc_detail_module>`)
    - 
  * - 3
    - Recieve IFA/MMS at first trimester visit?
    - Coverage defined by scenario, see :ref:`pregnancy component scenario table <MNCNH pregnancy component scenario table>`. Probability of "yes" is equal to scenario-specific coverage.
    - Use same propensity value as decision node #1 to answer this question
  * - 4
    - ANC later in pregnancy?
    - As informed from module input (output from :ref:`ANC detail module <2024_vivarium_mncnh_portfolio_anc_detail_module>`)
    - 
  * - 5
    - Hemoglobin screen?
    - Coverage defined by scenario, see :ref:`pregnancy component scenario table <MNCNH intrapartum component scenario table>`. Probability of "yes" is equal to scenario-specific coverage.
    - 
  * - 6
    - Receive IFA/MMS *for the first time* at late pregnancy visit?
    - Coverage defined by scenario, see :ref:`pregnancy component scenario table <MNCNH intrapartum component scenario table>`. If answer to decision node #3 is no, then answer to this decision node is also no. Otherwise, probability of "yes" is equal to scenario-specific coverage.
    - Use same propensity value as decision node #1 to answer this question
  * - 7 
    - Hemoglobin screening value <100 g/L? (Based on IFA/MMS adjusted exposure)
    - Instructions detailed in section 2.3.1 below
    - 
  * - 8
    - Low ferritin screening value?
    - Instructions detailed in section 2.3.2 below
    - 
  * - 9
    - IV iron?
    - Coverage defined by scenario, see :ref:`pregnancy component scenario table <MNCNH intrapartum component scenario table>`. Probability of "yes" is equal to scenario-specific coverage.
    - 
  * - 10
    - Also receive IFA/MMS *for the first time* at late pregnancy visit?
    - Coverage defined by scenario, see :ref:`pregnancy component scenario table <MNCNH intrapartum component scenario table>`. If answer to decision node #3 is no, then answer to this decision node is also no. Otherwise, probability of "yes" is equal to scenario-specific coverage.
    - Use same propensity value as decision node #1 to answer this question

2.3.1 Hemoglobin Screening Accuracy Instructions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For decision node 7, we will assess whether or not the result of a simulant's minimally invasive blood test hemoglobin screening is <100 g/L, which may be different than whether a simulant's *actual* hemoglobin exposure is <100 g/L. We will do this based on assumed sensitivity and specificity levels for the hemoglobin screening test as informed from the Gates Foundation and listed below:

- Sensitivity (percent of true positives that test positive): 85% 
- Specificity (percent of true negatives that test negative): 80%

Follow the steps below to determine the answer to decision node #7:

1. Assess a simulants "true" low hemoglobin status based on their hemoglobin exposure *after* action points I, II, and III have been executed (and *before* IV, V, and VI). Low hemoglobin status corresponds to values of <100 g/L and adequate hemoglobin status corresponds to values of 100+ g/L.
2. For simulants that are truly low hemoglobin, assign tests low hemoglobin status to 85% (sensitivity value) and tests adequate hemoglobin status to 15% (100 - sensitivity value of 85)
3. For simulants that are truly adequate hemoglobin, assign tests adequate hemoglobin status to 80% (specificity) and tests low hemoglobin status to 20% (100 - specificty value of 80)
4. Use the test hemoglobin status to determine the answer to decision node 7 (answer is "yes" if they have test low hemoglobin status and "no" if they have test adequate hemoglobin status)
5. Record true and test hemoglobin exposures at the time of screening to outputs F and G (to be used for V&V in the interactive simulation)

2.3.2 Ferritin Screening Instructions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Research background:**

Ferritin is a protein that stores iron within the body and low blood ferritin levels can indicate low iron stores. Pregnancies that have hemoglobin less than 100 g/L based on the hemoglobin screen will also be screened for ferritin levels via a minimally invasive screening (finger prick). Pregnancies that have a hemoglobin level <100 g/L and a blood ferritin level below 15 ug/L (anemic AND iron deficient) are eligible for IV iron.

Notably, the GBD does not have any estimates related to ferritin exposure. However, the GBD assigns specific causes to all cases of anemia. Some of these causes of anemia are considered "iron responsive," indicating that they are iron deficiency anemia. An example of an iron deficiency anemia is anemia caused by maternal hemorrhage (caused by blood loss, decreasing systemic levels of both hemoglobin and iron). An example of a non-iron responsive anemia is sickle cell trait (low hemoglobin is due to a defect in hemoglobin protein rather than low iron levels). Notably, it is possible for non-iron-responsive anemias to also have low iron levels. See the :ref:`anemia impairment document <2019_anemia_impairment>` for a list of iron responsive and non iron responsive causes of anemia in the GBD.

Therefore, in our model we will use the severity-specific fraction of iron responsive anemia among all causes of anemia in GBD as a proxy measure for the fraction of anemia cases with low ferritin. This approach is limited in that we may slightly underestimate total eligibility by not considering the proportion of the population who has low hemoglobin due to an iron-non-responsive cause and also coincidentally has low ferritin.

.. note::

  Chris T. has suggested that we can use the fraction of iron deficiency anemia from the in-progress PRISMA study rather than GBD for this purpose. PRIMSA study results are expected in June or July of 2025.

`The notebook that was used to calculate these values can be found here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/data_prep/fraction_iron_responsive_anemia.ipynb>`_

**Modeling instructions:**

The probability of low ferritin screening is dependent on the simulant's location, age group, and anemia status at the time of screening. Anemia status at the time of screening should be based on their true hemoglobin exposure value *after* action points I, II, and III have been executed (and *before* IV, V, and VI). See the :ref:`anemia/hemoglobin exposure table here for reference <2019_anemia_impairment>` and remember to use the pregnancy-specific values.

`The probability of low ferritin specific to location, age, and anemia status can be found here <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/data_prep/iron_responsive_fraction.csv>`_. Record assigned ferritin exposure to output G to be used for V&V in the interactive simulation.

2.4 Module Action Points
---------------------------

.. list-table:: Hemoglobin module action point
  :header-rows: 1

  * - Action point
    - Description
    - Information
    - Note
  * - I
    - Assign hemoglobin exposure based on GBD
    - See :ref:`hemoglobin risk exposure document <2023_hemoglobin_exposure>`
    - 
  * - II
    - Calibrate to and remove effect of baseline IFA coverage
    - Effect size on hemoglobin defined on :ref:`maternal supplementation intervention document <maternal_supplementation_intervention>`. For simulants without baseline coverage of IFA, subtract the value of :code:`baseline_ifa_coverage * ifa_hemoglobin_shift` from their hemoglobin exposure value. For simulants with baseline coverage of IFA, add the value of :code:`(1 - baseline_ifa_coverage) * ifa_hemoglobin_shift - ifa_hemoglobin_shift` to their hemoglobin exposure value. Ignore instructions regarding timeline and baseline coverage on intervention document.
    - Note that this step both calibrates to baseline coverage AND removes the effect of baseline IFA coverage. The effect of baseline IFA coverage will be added back in later in the decision tree.
  * - III
    - Record hemoglobin exposure at the start of pregnancy
    - Record to output C
    - 
  * - IV
    - Apply IFA/MMS effect
    - Effect size on hemoglobin defined on :ref:`maternal supplementation intervention document <maternal_supplementation_intervention>`
    - Use effect size from this page only (ignore instructions for how to apply effects regarding timeline and baseline coverage). Note that IFA and MMS effectively have the same effect on maternal hemoglobin
  * - V
    - Record IFA/MMS receipt
    - Record to output A
    - 
  * - VI
    - Apply IFA/MMS effect
    - Effect size on hemoglobin defined on :ref:`maternal supplementation intervention document <maternal_supplementation_intervention>`
    - Use effect size from this page only (ignore instructions for how to apply effects regarding timeline and baseline coverage). Note that IFA and MMS effectively have the same effect on maternal hemoglobin
  * - VII
    - Record IFA/MMS receipt
    - Record to output A
    - 
  * - VIII
    - Apply IV iron effect
    - Effect size on hemoglobin defined on :ref:`intravenous iron intervention document <intervention_iv_iron_antenatal>`
    - Ignore instructions regarding timing of effect implementation on this document
  * - IX
    - Record IV iron receipt
    - Record to output B
    - 
  * - X
    - Record receipt of IFA/MMS
    - Record to output A
    - Note that IFA/MMS hemoglobin effect is not applied on top of IV iron effect
  * - XI
    - Record hemoglobin value at end of pregnancy
    - Record to output D
    - 
  * - XII
    - Calculate and record anemia YLDs
    - Done in the :ref:`anemia YLDs module <2024_vivarium_mncnh_portfolio_anemia_module>`
    - 

2.4: Module Outputs
-----------------------

.. list-table:: Hemoglobin module outputs
  :header-rows: 1

  * - Output
    - Value
    - Dependencies
  * - A. Maternal supplementation
    - `ifa` / `mms` / `none`
    - Used for anemia YLD calculation, V&V
  * - B. IV iron
    - `True` / `False`
    - Used for anemia YLD calculation, V&V
  * - C. True hemoglobin at the beginning of pregnancy 
    - point value
    - V&V
  * - D. True hemoglobin at the end of pregnancy
    - point value
    - Value to be used for :ref:`hemoglobin risk effects model <2023_hemoglobin_effects>`, V&V
  * - F. True Hemoglobin at screening
    - point value
    - V&V
  * - G. Test hemoglobin at screening
    - point value
    - V&V
  * - H. Ferritin exposure at screening
    - `low` / `adequate`
    - V&V

3.0 Assumptions and limitations
++++++++++++++++++++++++++++++++

- We assume there are no changes in natural history hemoglobin trajectory throughout pregnancy. 

- We assume immediate effect of oral and IV iron interventions on hemoglobin from intervention receipt.

- We assume complete adherence of oral iron intervention.

- We assume no additional effect of oral iron supplementation when taken following IV iron administration

- We assume a hemoglobin screening sensitivity of 85% and specificity of 80%, as requested by the Gates Foundation

- Our approach to modeling hemoglobin screening sensitivity and specificity does not vary by hemoglobin exposure. In other words, you are no more likely to have your hemoglobin exposure misclassified by the screening if your exposure is very close to the threshold than if you expsoure is far away from the threshold. This will likely result in more cases of individuals without *any* anemia (high hemoglobin) testing as low hemoglobin and those with very low hemoglobin testing as adequate hemoglobin than may happen in practice. This may cause us to understimate the impact of the IV iron intervention.

  - Note that an alternative to this limited approach we are taking would be to model some error around hemoglobin exposure (sampling from some distribution and adding it to hemoglobin exposure to get test exposure, similar to what is done for gestational age assessment in the :ref:`AI ultrasound model <2024_vivarium_mncnh_portfolio_ai_ultrasound_module>`). However, in order to match the desired sensitivity and specificity of the screening test, we would need to solve for the uncertainty distribution, likely via optimization, at the location-specific level (as it will depend on the underlying population hemoglobin exposure distribution).

- We use the fraction of iron responsive anemia among total anemia as a proxy for low ferritin given low hemoglobin. This may underestimate the population eligible for IV iron by not considering the iron non responsive anemias that have low ferritin. Note that this may be improved upon by updating to PRIMSA data.

- We assume the IV iron intervention (+23 g/L) to have a greater effect than GBD 2023's implied effect of IV iron used in the estimation of their iron deficiency models (+14.3 g/L(95% UL:3.58 -25.59). Notably, our assumed effect is within the confidence interval of GBD's assumed effect size and the value we assume is specific to the pregnant population (whereas GBD's value is not).

4.0 Verification and Validation Criteria
+++++++++++++++++++++++++++++++++++++++++

- Baseline simulated hemoglobin distribution (mean and standard deviation) should match the GBD 2023 hemoglobin risk exposure distribution

- Hemoglobin at the start of pregnancy and end of pregnancy should vary in accordance with intervention receipts

- Intervention coverage should match expected values

- IFA/MMS should have expected effect on hemoglobin

- At the individual level, only simulants who attend ANC should receive interventions

- Check that IV iron only given to those with measured low hemoglobin and low ferritin
- Check that IV iron has the intended effect on hemoglobin when given 

- Check that measured and true hemoglobin exposures vary by the expected degree

- Check that low ferritin values match expectations (specific to anemia status)

5.0 References
+++++++++++++++

