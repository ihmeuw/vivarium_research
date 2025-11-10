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

This document page contains information for the following hemoglobin-related
modules in the pregnancy component on the MNCNH portfolio simulation:

#. `Hemoglobin at the Start of Pregnancy Module`_
#. `First Trimester Hemoglobin Module`_
#. `Anemia Screening Module`_
#. `End of Pregnancy Hemoglobin Module`_

Importantly, in the simulation implementation, YLDs due to anemia are accrued throughout the progression of these hemoglobin modules (despite the docs indicating that they are accrued as a lump sum in a separate "Anemia YLDs" module). See the :ref:`anemia YLDs input module document <2024_vivarium_mncnh_portfolio_anemia_module>` for specific details.

.. note::

  These modules may have potential dependencies with the hypertension/pre-eclampsia model that have not yet been thought through. Model structure is subject to change in order to accomodate these dependencies.

2.0 Modules
++++++++++++++

Hemoglobin at the Start of Pregnancy Module 
--------------------------------------------

This module will assign a hemoglobin exposure based on the :ref:`GBD hemoglobin risk exposure model <2023_hemoglobin_exposure>` and adjust these exposure to remove the effect of the :ref:`baseline coverage of oral iron supplementation <oral_iron_antenatal>` as we assume that there is zero coverage or oral iron *at the start of pregnancy.* The effect of oral iron supplementation (including baseline coverage) will be added back in subsequent hemoglobin modules on this page.

.. list-table:: Hemoglobin at the start of pregnancy module inputs
  :header-rows: 1

  * - Input
    - Source 
    - Note
  * - Maternal age at end of pregnancy
    - :ref:`Initial attributes module <2024_vivarium_mncnh_portfolio_initial_attributes_module>`
    -

.. list-table:: Hemoglobin at the start of pregnancy module data values
  :header-rows: 1

  * - Parameter
    - Value
    - Note
  * - :code:`baseline_ifa_overall`
    - Defined on :ref:`maternal supplementation intervention document <oral_iron_antenatal>`.  
    - Use the :code:`baseline_ifa_overall` parameter rather than :code:`baseline_ifa_at_anc`
  * - :code:`ifa_hemoglobin_shift`
    - Defined on :ref:`maternal supplementation intervention document <oral_iron_antenatal>`
    - 

Complete the following steps for the Hemoglobin at the Start of Pregnancy Module:

1. Assign :code:`gbd_hemoglobin_exposure` according to the :ref:`hemoglobin risk exposure document <2023_hemoglobin_exposure>` at the age-specific level according to maternal age at the end of prenancy as assigned in the :ref:`Initial attributes module <2024_vivarium_mncnh_portfolio_initial_attributes_module>`.

2. Record :code:`hemoglobin_at_the_start_of_pregnancy` as a module output equal to :code:`gbd_hemoglobin_exposure - baseline_ifa_overall * ifa_hemoglobin_shift`


.. list-table:: Hemoglobin at the start of pregnancy module inputs
  :header-rows: 1

  * - Output
    - Value
    - Dependencies
  * - Hemoglobin at the start of pregnancy
    - point value
    - Used as an in input to the :ref:`anemia YLD module <2024_vivarium_mncnh_portfolio_anemia_module>` and `First Trimester Hemoglobin Module`_
    
First Trimester Hemoglobin Module
------------------------------------

This module adds the effect of oral iron supplementation received at a first trimester ANC visit to hemoglobin exposure and records coverage of oral iron supplementation at that first trimester visit as well as hemoglobin exposure modified by coverage of the intervention.

.. image:: first_trimester_diagram.drawio.png

.. list-table:: First trimester hemoglobin module inputs
  :header-rows: 1

  * - Input
    - Source 
    - Note
  * - Hemoglobin at the start of pregnancy
    - `Hemoglobin at the Start of Pregnancy Module`_
    -
  * - Anemia intervention propensity
    - :ref:`Initial attributes module <2024_vivarium_mncnh_portfolio_initial_attributes_module>`
    - 
  * - First trimester ANC attendance
    - :ref:`ANC module <2024_vivarium_mncnh_portfolio_anc_module>`
    - 

.. list-table:: First trimester hemoglobin module data values
  :header-rows: 1 

  * - Parameter
    - Value
    - Note
  * - Scenario-specific IFA/MMS coverage
    - :ref:`Pregnancy component scenario table <MNCNH pregnancy component scenario table>`
    - 
  * - :code:`ifa_hemoglobin_shift`
    - Defined on :ref:`maternal supplementation intervention document <oral_iron_antenatal>`
    - 

.. list-table:: First trimester hemoglobin module decision nodes
  :header-rows: 1

  * - Decision node
    - Description
    - Information
    - Note
  * - 1
    - ANC in first trimester?
    - Direct input from :ref:`ANC module <2024_vivarium_mncnh_portfolio_anc_module>`
    - "True for ANC attendance exposures in ['first_trimester_only', 'first_trimester_and_later_pregnancy']. False for exposures in ['later_pregnancy_only','none']
  * - 2
    - Receive IFA/MMS at first trimester visit?
    - Use the :ref:`anemia intervention propensity <2024_vivarium_mncnh_portfolio_initial_attributes_module>` and the scenario-specific IFA/MMS coverage value defined in the :ref:`pregnancy component scenario table <MNCNH pregnancy component scenario table>` to determine if an individual simulant is screened for hemoglobin
    - 

.. list-table:: First trimester hemoglobin module outputs
  :header-rows: 1

  * - Output
    - Value
    - Dependencies
  * - Oral iron coverage in first trimester
    - :code:`none` / :code:`ifa` / :code:`mms`
    - Input to `End of Pregnancy Hemoglobin Module`_
  * - First trimester hemoglobin
    - point value
    - Input to `Anemia Screening Module`_


Anemia Screening Module
-------------------------

This module performs the anemia screening interventions, including hemoglobin and ferritin screening tests, at the late pregnancy ANC visit. Anemia exposures should be assessed according to first trimester hemoglobin as output from the `First Trimester Hemoglobin Module`_. The results of the anemia screening tests will be used in subsequent modules to determine eligibility for the IV iron intervention. Additionally, a measure of "true first trimester hemoglobin exposure" is an additional output of this module and will be used to assess the sensitivity and specificity of the hemoglobin screening test and a convenient stratifying variable for certain observed outputs for V&V, but this measure will not be used as an input for any subsequent modules.

.. image:: anemia_screening_diagram.drawio.png

.. list-table:: Anemia screening module inputs
  :header-rows: 1

  * - Input
    - Source
    - Note
  * - First trimester hemolobin
    - `First Trimester Hemoglobin Module`_
    - 
  * - Later pregnancy ANC attendance
    - :ref:`ANC module <2024_vivarium_mncnh_portfolio_anc_module>`
    - True for ANC attendance exposures in ['later_pregnancy_only', 'first_trimester_and_later_pregnancy']. False for exposures in ['first_trimester_only','none']
  * - Anemia intervention propensity
    - :ref:`Initial attributes module <2024_vivarium_mncnh_portfolio_initial_attributes_module>`
    - 

.. list-table:: Anemia screening module data values
  :header-rows: 1

  * - Parameter
    - Value
    - Note
  * - Scenario-specific hemoglobin screening coverage
    - Defined in the :ref:`pregnancy component scenario table <MNCNH pregnancy component scenario table>`
    - 
  * - Scenario-specific ferritin screening coverage
    - Defined in the :ref:`pregnancy component scenario table <MNCNH pregnancy component scenario table>`
    - 

.. list-table:: Anemia screening module decision nodes
  :header-rows: 1

  * - Decision node
    - Description
    - Information
    - Note
  * - 1
    - ANC later in pregnancy?
    - Direct input from :ref:`ANC module <2024_vivarium_mncnh_portfolio_anc_module>`
    - "Yes" for ANC attendance exposures in ['later_pregnancy_only', 'first_trimester_and_later_pregnancy']. "No" for exposures in ['first_trimester_only','none']
  * - 2
    - Hemoglobin screen?
    - Use the :ref:`anemia intervention propensity <2024_vivarium_mncnh_portfolio_initial_attributes_module>` and the scenario-specific hemoglobin screening coverage value defined in the :ref:`pregnancy component scenario table <MNCNH pregnancy component scenario table>` to determine if an individual simulant is screened for hemoglobin
    - 
  * - 3
    - Hemoglobin screening test result
    - Use the instructions detailed on the :ref:`anemia screening intervention page <anemia_screening>` to determine hemoglobin screening test result based on first trimester hemolobin exposure output from the `First Trimester Hemoglobin Module`_
    - 
  * - 4
    - Ferritin screen?
    - Use the :ref:`anemia intervention propensity <2024_vivarium_mncnh_portfolio_initial_attributes_module>` and the scenario-specific ferritin screening coverage value defined in the :ref:`pregnancy component scenario table <MNCNH pregnancy component scenario table>` to determine if an individual simulant is screened for hemoglobin.
    - 
  * - 5
    - Ferritin screening test result
    - Use the instructions detailed on the :ref:`anemia screening intervention page <anemia_screening>`. Anemia status should be assessed according to first trimester hemolobin exposure output from the `First Trimester Hemoglobin Module`_.
    - 

.. list-table:: Anemia screening module outputs
  :header-rows: 1

  * - Output
    - Value
    - Dependencies
  * - Hemoglobin screening result
    - :code:`not_tested` / :code:`low` / :code:`adequate`
    - V&V (via observation), simulation result
  * - Ferritin screening result
    - :code:`not_tested` / :code:`low` / :code:`adequate`
    - V&V (via observation), simulation result
  * - True first trimester hemoglobin exposure 
    - :code:`low` if first trimester hemoglobin <100 g/L, :code:`adequate if first trimester hemoglobin 100+ g/L`
    - Used for V&V (via observation) to assess sensitivity and specificity of the hemoglobin screening test and as a convenient stratifying variable for specific observed outcomes. Not used as an input to any other module.


End of Pregnancy Hemoglobin Module
-------------------------------------------

This module applies the effect of the IV iron intervention for those who received it and applies the effect of oral iron intervention for those who have not already received the effect from their earlier first trimester ANC visit. Only those who have "low" test results for both the hemoglobin and ferritin screenings are eligible for IV iron. We assume that among those who receive both IV and oral iron interventions at the later pregnancy ANC visit, they receive only the effect of IV iron on their hemoglobin exposure rather than the additive impact of both interventions.

.. image:: end_of_pregnancy_diagram.drawio.png

.. list-table:: End of pregnancy hemoglobin module inputs
  :header-rows: 1

  * - Input
    - Source
    - Note
  * - First trimester hemolobin
    - `First Trimester Hemoglobin Module`_
    - 
  * - Later pregnancy ANC attendance
    - :ref:`ANC module <2024_vivarium_mncnh_portfolio_anc_module>`
    - True for ANC attendance exposures in ['later_pregnancy_only', 'first_trimester_and_later_pregnancy']. False for exposures in ['first_trimester_only','none']
  * - Anemia intervention propensity
    - :ref:`Initial attributes module <2024_vivarium_mncnh_portfolio_initial_attributes_module>`
    - 
  * - Hemoglobin screening test result
    - `Anemia Screening Module`_ output
    - 
  * - Ferritin screening test result
    - `Anemia Screening Module`_ output
    - 

.. list-table:: End of pregnancy hemoglobin module data values
  :header-rows: 1

  * - Parameter
    - Value
    - Note
  * - Scenario-specific IFA/MMS coverage
    - Defined in the :ref:`pregnancy component scenario table <MNCNH pregnancy component scenario table>`
    - 
  * - Scenario-specific IFA/MMS coverage
    - Defined in the :ref:`pregnancy component scenario table <MNCNH pregnancy component scenario table>`
    - 
  * - Oral iron effect on hemoglobin
    - Defined on the :ref:`oral iron intervention model document <oral_iron_antenatal>`
    - 
  * - IV iron effect on hemoglobin
    - Defined on the :ref:`IV iron intervention model document <intervention_iv_iron_antenatal_mncnh>`
    - 

.. list-table:: End of pregnancy hemoglobin module decision nodes
  :header-rows: 1

  * - Decision node
    - Description
    - Information
    - Note
  * - 1
    - ANC later in pregnancy?
    - Direct input from :ref:`ANC module <2024_vivarium_mncnh_portfolio_anc_module>`
    - "Yes" for ANC attendance exposures in ['later_pregnancy_only', 'first_trimester_and_later_pregnancy']. "No" for exposures in ['first_trimester_only','none']
  * - 2
    - Eligible for IV iron?
    - True for thoes with hemoglobin_screening_test_result==True AND ferritin_screening_test_result==True. False for all other simulants
    - Hemoglobin and ferritin screening test results output from the `Anemia Screening Module`_
  * - 3
    - Covered by IV iron?
    - Use the :ref:`anemia intervention propensity <2024_vivarium_mncnh_portfolio_initial_attributes_module>` and the scenario-specific IV Iron coverage value defined in the :ref:`pregnancy component scenario table <MNCNH pregnancy component scenario table>` to determine if an individual simulant is screened for hemoglobin.
    - 
  * - 4
    - Covered by IFA/MMS?
    - Use the :ref:`anemia intervention propensity <2024_vivarium_mncnh_portfolio_initial_attributes_module>` and the scenario-specific IFA/MMS coverage value defined in the :ref:`pregnancy component scenario table <MNCNH pregnancy component scenario table>` to determine if an individual simulant is screened for hemoglobin.
    - 
  * - 5
    - Covered by IFA/MMS?
    - Use the :ref:`anemia intervention propensity <2024_vivarium_mncnh_portfolio_initial_attributes_module>` and the scenario-specific IFA/MMS coverage value defined in the :ref:`pregnancy component scenario table <MNCNH pregnancy component scenario table>` to determine if an individual simulant is screened for hemoglobin.
    - 
  * - 6
    - Received IFA/MMS at first trimester ANC visit?
    - Direct input from the `First Trimester Hemoglobin Module`_
    - Note that another way to answer this question would be if ANC attendance == 'first_trimester_and_later_pregnancy'

.. list-table:: End of pregnancy hemoglobin module outputs
  :header-rows: 1

  * - Output
    - Value
    - Dependencies
  * - IV iron coverage
    - :code:`covered` / :code:`uncovered`
    - V&V (via observation), simulation result
  * - Oral iron coverage at any time in pregnancy
    - :code:`none` / :code:`ifa` / :code:`mms`
    - V&V (via observation), simulation result
  * - Hemoglobin at the end of pregnancy
    - point value
    - Used to inform the risk effects of the hemoglobin risk factor (as an input to the :ref:`Pregnancy <2024_vivarium_mncnh_portfolio_pregnancy_module>`, :ref:`Maternal disorders <2024_vivarium_mncnh_portfolio_maternal_disorders_module>`, and the :ref:`Postpartum depression <2024_vivarium_mncnh_portfolio_ppd_module>` modules. Also used as an input to the :ref:`Anemia YLDs <2024_vivarium_mncnh_portfolio_anemia_module>`.


3.0 Assumptions and limitations
++++++++++++++++++++++++++++++++

- We assume immediate effect of oral and IV iron interventions on hemoglobin from intervention receipt.

- We assume complete adherence of oral iron intervention.

- We assume no additional effect of oral iron supplementation when taken following IV iron administration

- We use the fraction of iron responsive anemia among total anemia as a proxy for low ferritin given low hemoglobin. This may underestimate the population eligible for IV iron by not considering the iron non responsive anemias that have low ferritin. Note that this may be improved upon by updating to PRISMA data.

- We assume the IV iron intervention (+23 g/L) to have a greater effect than GBD 2023's implied effect of IV iron used in the estimation of their iron deficiency models, +14.3 g/L(95% UI: 3.58 -25.59). Notably, our assumed effect is within the uncertainty interval of GBD's assumed effect size and the value we assume is specific to the pregnant population (whereas GBD's value is not).

- GBD assesses pregnancy-specific anemia burden among live births and stillbirths only and not among pregnancies that result in abortion/miscarriage/ectopic pregnancy. We apply the pregnancy hemoglobin adjustment factor to all pregnancies regardless of outcome. 

- We assume there are no changes in natural history hemoglobin trajectory throughout pregnancy, including when a pregnancy spans GBD age groups (we use the age group at the *end* of pregnancy to determine hemoglobin). The natural history of hemoglobin throughout pregnancy among "frequent" and "infrequent" users of oral iron supplements was assessed by [Yefet-et-al-2021]_, with a figure included below for easy reference. Rather than modeling a decreasing hemoglobin over the first two trimesters followed by a rebound in the third trimester, we assume that hemoglobin is constant at the approximate average exposure over the course of pregnancy for the entirety of that pregnancy. This limits our model in the following ways:

.. image:: hemoglobin_trajectory.png

- By not modeling the "dip" in hemoglobin observed at 28 weeks of gestation we will underestimate the portion of the population that meets the eligibility criteria for IV iron at any point in their pregnancy.

- Our model does not consider the interaction between ANC attendance timing and hemoglobin exposure trajectory throughout pregnancy as it relates to assessment of IV iron eligibility by anemia screening. For instance, a given pregnancy would be assessed as eligible for IV iron if screened at 28 weeks gestation, but not if they were screened at 15 or 35 weeks. We assume that simulants have an equal likelihood of IV iron eligibility at any point in their second or third trimester.

- Our model assumes that the effect of iron interventions in pregnancy is not modified by gestational age at birth. Additionally, we assume that there is no association between gestational age at birth and hemoglobin exposure at birth, which is also implied from these findings. The findings from [Yefet-et-al-2021]_ imply that both of these dynamics are present.

- Our calibration of anemia YLDs throughout pregnancy will be off to what is expected in reality. However, our model remains in line with GBD methodology and its associated limitations with respect to anemia YLDs in pregnancy.

- By applying the effect of oral iron supplementation given in the first trimester to hemoglobin exposure immediately, we will likely overestimate the impact of this intervention on hemoglobin exposure in the second trimester. This will cause us to overestimate the reduction in anemia YLDs in the first and second trimesters. We will also overestimate the reduction that oral iron supplementation has on the population eligible for IV iron that is assessed during the second trimester (although less so when assessed during the third trimester). However, as we are not modeling the number or timing of ANC visits in the second and third trimesters, we do not have the modeling resolution to address these issues.

- We do not allow for the possibility that oral iron received early in the second trimester may prevent IV iron eligibility at a subsequent ANC visit later in the second or third trimester.

.. todo::

  Note that the most comprehensive strategy here would be to:

    - Model hemoglobin trajectory throughout pregnancy as informed from evidence from sources such as [Yefet-et-al-2021]_

    - Model gestational week-specific effects of our oral iron intervention (from sources such as [Yefet-et-al-2021]_)

    - Model adherence-specific effects of oral iron supplementation (from sources such as [Yefet-et-al-2021]_)

    - Model more detailed ANC visit patterns (including timing and frequency) to reflect a more realistic opportunity to detect pregnancies that are eligible for IV iron (DHS and the health system team have more information on the number of ANC visits per pregnancy)

4.0 Verification and Validation Criteria
+++++++++++++++++++++++++++++++++++++++++

- Baseline simulated hemoglobin distribution (mean and standard deviation) should match the GBD 2023 hemoglobin risk exposure distribution

- Hemoglobin at the start of pregnancy and end of pregnancy should vary in accordance with intervention receipts

- Intervention coverage should match expected values

- IFA/MMS should have expected effect on hemoglobin

- At the individual level, only simulants who attend ANC should receive interventions

- Check that IV iron only given to those with measured low hemoglobin and low ferritin

- Check that IV iron has the intended effect on hemoglobin when given 

- Check that test and true hemoglobin exposures vary by the expected degree

- Check that low ferritin values match expectations (specific to anemia status)

- Confirm that interventions share coverage propensity (ex: if intervention A has greater coverage than intervention B, there should be no one who is eligible for both interventions who receives intervention B and not intervention A)

5.0 References
+++++++++++++++

.. [Yefet-et-al-2021]

  Yefet, E., Yossef, A. & Nachum, Z. Prediction of anemia at delivery. Sci Rep 11, 6309 (2021). `https://doi.org/10.1038/s41598-021-85622-7 <https://doi.org/10.1038/s41598-021-85622-7>`__