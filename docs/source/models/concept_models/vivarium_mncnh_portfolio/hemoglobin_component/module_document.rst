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
    
    - YLDs due to anemia throughout pregnancy and immediate postpartum (simulation result)

.. todo::
  
  Link ANC module page when it exists

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
    - Baseline IFA coverage is defined in the :ref:`pregnancy component scenario table <MNCNH intrapartum component scenario table>`. Probability of "yes" is equal to coverage value.
    - Note baseline IFA calibration limitation
  * - 2
    - ANC in first trimester?
    - As informed from module input (output from :ref:`ANC detail module <2024_vivarium_mncnh_portfolio_anc_detail_module>`)
    - 
  * - 3
    - Recieve IFA/MMS at first trimester visit?
    - Coverage defined by scenario, see :ref:`pregnancy component scenario table <MNCNH intrapartum component scenario table>`. Probability of "yes" is equal to scenario-specific coverage.
    - 
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
    - 
  * - 7 
    - Hemoglobin screening value <100 g/L? (Based on IFA/MMS adjusted exposure)
    - Instructions detailed in section 2.3.1 below
    - 
  * - 8
    - Low ferritin?
    - STRATEGY TBD, TODO: update
    - 
  * - 9
    - IV iron?
    - Coverage defined by scenario, see :ref:`pregnancy component scenario table <MNCNH intrapartum component scenario table>`. Probability of "yes" is equal to scenario-specific coverage.
    - 
  * - 10
    - Also receive IFA/MMS *for the first time* at late pregnancy visit?
    - Coverage defined by scenario, see :ref:`pregnancy component scenario table <MNCNH intrapartum component scenario table>`. If answer to decision node #3 is no, then answer to this decision node is also no. Otherwise, probability of "yes" is equal to scenario-specific coverage.
    - 

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
    - Remove IFA effect on hemoglobin
    - Effect size on hemoglobin defined on :ref:`maternal supplementation intervention document <maternal_supplementation_intervention>`. Subtract rather than add IFA effect on hemoglobin to hemoglobin exposure for this step. Ignore instructions regarding timeline and baseline coverage on intervention document.
    - 
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
    - See instructions below. Record to output E.
    - 

2.4.1: Action point XII - Calculating anemia YLDs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. todo::

  Move this info to a separate anemia YLD module that comes after the estimation of gestational age at birth. We will also need to assign specific dates to ANC visits

Hemoglobin exposure is used to determine anemia status, which has corresponding disability weights. See the :ref:`anemia impairment document <2019_anemia_impairment>` to see how hemoglobin exposure relates to anemia status, disability weights, and years lived with disability.

We assume that hemoglobin may vary throughout the course of pregnancy at the following distinct points opportunities: (1) following IFA/MMS supplementation at the first trimester ANC visit, and (2) following IFA/MMS supplementation or IV iron administration at the later pregnancy ANC visit. Therefore, we will calculate YLDs due to anemia during pregnancy in this model as a weighted sum over the course of pregnancy stratified by these specified events.

The following pseudocode outlines how this can be done.

.. code-block:: python

  # ylds: value of years lived with disability due to anemia during pregnancy
  # dw(): A function that reads hemoglobin level and returns corresponding disability weight
  # ga_birth: gestational age at birth in YEARs (note unit change from typical weeks)
  # ga_oral_iron: gestational age in years at time of oral iron effect on hemoglobin 
    # this is equal to the timing of first ANC visit where oral iron is received
  # ga_iv_iron: gestational age in years at time of IV iron effect on hemoglobin
    # this is equal to the timing of later pregnancy ANC visit where IV iron is administered 
  # hgb_start_of_pregnancy: output C (defined in output section below)
  # hgb_end_of_pregnancy: output D (defined in output section below)
  # oral_iron_effect: IFA/MMS effect on hemoglobin (defined in action point section above)
  # output_A: indicator of oral iron supplementation status (defined as output A in output section below)
  # output_B: indicator of IV iron administration status (defined as output B in output section below)

  if output_A == 'none' and output_B == False: # no oral or IV iron in pregnancy
    ylds = dw(hgb_at_birth) * ga_birth
  elif output_A is in ['ifa','mms']: # received oral iron
    if output_B: # also received IV iron
      if ga_oral_iron < ga_iv_iron: # oral iron was started before receiving IV iron
        ylds = (dw(hgb_start_of_pregnancy) * ga_oral_iron
              + dw(hgb_start_of_pregnancy + oral_iron_effect) * (ga_iv_iron - ga_oral_iron)
              + dw(hgb_end_of_pregnancy) * (ga_birth - ga_iv_iron)
        )
      else: # did not receive oral iron before IV iron
        ylds = (dw(hgb_start_of_pregnancy) * ga_iv_iron
              + dw(hgb_end_of_pregnancy) * (ga_birth - ga_iv_iron)
        )
    else: # received oral but not IV iron
      ylds = (dw(hgb_start_of_pregnancy) * ga_oral_iron
            + dw(hgb_end_of_pregnancy) * (ga_birth - ga_oral_iron)
      )
  else: # received IV iron and not oral iron
    ylds = (dw(hgb_start_of_pregnancy) * ga_iv_iron
          + dw(end_of_pregnancy) * (ga_birth - ga_iv_iron)
    )

.. todo::

  Decide whether or not we want to model two week delay between start of iron intervention and effect on hemoglobin that we have modeled in the past. If so, then update documentation accordingly.

  The main reason I would like to avoid it is if/when we run into instances of IV iron very late in pregnancy that ends up not impacting pregnancy hemoglobin, but potentially postpartum hemoglobin. This seems like it would be significantly more complicated to model.

.. note::

  We additionally assume that maternal hemorrhage has the potential to decrease *postpartum* hemoglobin (and thereby YLDs due to anemia in the postpartum period). This will affect total YLDs due to anemia in the overall simulation. However, these will be assessed separately as they take place outside of the pregnancy model.

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
  * - C. Hemoglobin at the beginning of pregnancy 
    - point value
    - V&V
  * - D. Hemoglobin at the end of pregnancy
    - point value
    - Value to be used for :ref:`hemoglobin risk effects model <2023_hemoglobin_effects>`, V&V
  * - E. Anemia YLDs
    - Point value
    - Simulation results

3.0 Assumptions and limitations
++++++++++++++++++++++++++++++++

- We assume there are no changes in natural history hemoglobin trajectory throughout pregnancy. 

- We assume immediate effect of oral and IV iron interventions on hemoglobin from intervention receipt.

- We assume complete adherence of oral iron intervention.

- We assume no additional effect of oral iron supplementation when taken following IV iron administration

- We assume a hemoglobin screening sensitivity of 85% and specificity of 80%, as requested by the Gates Foundation

- Our approach to modeling hemoglobin screening sensitivity and specificity does not vary by hemoglobin exposure. In other words, you are no more likely to have your hemoglobin exposure misclassified by the screening if your exposure is very close to the threshold than if you expsoure is far away from the threshold. This will likely result in more cases of individuals without *any* anemia (high hemoglobin) testing as low hemoglobin and those with very low hemoglobin testing as adequate hemoglobin than may happen in practice. This may cause us to understimate the impact of the IV iron intervention.

  - Note that an alternative to this limited approach we are taking would be to model some error around hemoglobin exposure (sampling from some distribution and adding it to hemoglobin exposure to get test exposure, similar to what is done for gestational age assessment in the :ref:`AI ultrasound model <2024_vivarium_mncnh_portfolio_ai_ultrasound_module>`). However, in order to match the desired sensitivity and specificity of the screening test, we would need to solve for the uncertainty distribution, likely via optimization, at the location-specific level (as it will depend on the underlying population hemoglobin exposure distribution).

4.0 Verification and Validation Criteria
+++++++++++++++++++++++++++++++++++++++++

- Baseline simulated anemia YLDs should match corresponding pregnancy-specific GBD values. TODO: define specifically what these are (do they save pregnancy-specific impairment prevalence in GBD 2023 or do we need to calculate our own targets again?)

- Baseline simulated hemoglobin distribution (mean and standard deviation) should match the GBD 2023 hemoglobin risk exposure distribution

- Hemoglobin at the start of pregnancy and end of pregnancy should vary in accordance with intervention receipts

- Intervention coverage should match expected values

- At the individual level, only simulants who attend ANC should receive interventions

- We assume the IV iron intervention (+23 g/L) to have a greater effect than GBD 2023's implied effect of IV iron used in the estimation of their iron deficiency models (+14.3 g/L(95% UL:3.58 -25.59). Notably, our assumed effect is within the confidence interval of GBD's assumed effect size and the value we assume is specific to the pregnant population (whereas GBD's value is not).

5.0 References
+++++++++++++++

