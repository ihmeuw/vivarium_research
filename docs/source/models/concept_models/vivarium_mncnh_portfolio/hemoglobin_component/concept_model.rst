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
MNCNH Portfolio: Hemoglobin Module
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
    - ANC module
    - Decision node #2
    - (True/False value)
  * - Gestational age at first trimester ANC visit
    - ANC module
    - Anemia YLD calculation
    - Point value in weeks, N/A for those who do not attend first trimester ANC
  * - Later pregnancy ANC attendance
    - ANC module
    - Decision node #4
    - (True/False value)
  * - Gestational age at later pregnancy ANC visit
    - ANC module 
    - Anemia YLD calculation
    - Point value in weeks, N/A for those who do not attend first trimester ANC
  * - Pregnancy duration (aka gestational age at birth)
    - ???
    - Anemia YLD calculation
    - Point value in weeks

.. todo::
  
  Link to appropriate pages when ready

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
    - Probability equal to baseline IFA coverage values on :ref:`maternal supplementation intervention document <maternal_supplementation_intervention>`
    - Note baseline IFA calibration limitation
  * - 2
    - ANC in first trimester?
    - See ANC module (FORTHCOMING, TODO: insert link)
    - 
  * - 3
    - Recieve IFA/MMS at first trimester visit?
    - Coverage defined by scenario (SCENARIO TABLE FORTHCOMING, TODO: insert link)
    - Strategy to be compatible with decision nodes 6 and 10 TBD
  * - 4
    - ANC later in pregnancy?
    - See ANC module (FORTHCOMING, TODO: insert link)
    - 
  * - 5
    - Hemoglobin screen?
    - Coverage defined by scenario (SCENARIO TABLE FORTHCOMING)
    - 
  * - 6
    - Receive IFA/MMS *for the first time* at late pregnancy visit?
    - Strategy TBD, TODO: update
    - Answer to decision node #3 must be "no" for answer to #7 to be "yes"
  * - 7 
    - Hemoglobin <100 g/L (Based on IFA/MMS adjusted exposure)
    - Assess individual hemoglobin exposure *after* action points I, II, and III have been executed (and *before* IV, V, and VI). Assume screening sensitivity of 85% and specificity of 80% -- TODO: add detail for how to apply screening accuracy.
    - 
  * - 8
    - Low ferritin?
    - STRATEGY TBD, TODO: update
    - 
  * - 9
    - IV iron?
    - Coverage defined by scenario (SCENARIO TABLE FORTHCOMING, TODO: insert link)
    - 
  * - 10
    - Also receive IFA/MMS *for the first time* at late pregnancy visit?
    - Strategy TBD, TODO: update
    - Answer to decision node #3 must be "no" for answer to #7 to be "yes"

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

Hemoglobin exposure is used to determine anemia status, which has corresponding disability weights. See the :ref:`anemia impairment document <2019_anemia_impairment>` to see how hemoglobin exposure relates to anemia status, disability weights, and years lived with disability.

.. todo::

  Check to see if there are any updates that need to be made to the anemia impairment document for GBD 2023

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

4.0 Verification and Validation Criteria
+++++++++++++++++++++++++++++++++++++++++

- Baseline simulated anemia YLDs should match corresponding pregnancy-specific GBD values. TODO: define specifically what these are (do they save pregnancy-specific impairment prevalence in GBD 2023 or do we need to calculate our own targets again?)

- Baseline simulated hemoglobin distribution (mean and standard deviation) should match the GBD 2023 hemoglobin risk exposure distribution

- Hemoglobin at the start of pregnancy and end of pregnancy should vary in accordance with intervention receipts

- Intervention coverage should match expected values

- At the individual level, only simulants who attend ANC should receive interventions

5.0 References
+++++++++++++++

