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


.. _latent_tuberculosis_infection_concept_model:

=====================================================
Vivarium CSU Latent Tuberculosis Infection Simulation
=====================================================

.. contents::
  :local:

.. list-table:: List of abbreviations
   :header-rows: 1

   * - Label
     - Definition
   * - AcTB
     - Active tuberculosis
   * - HBCs
     - High TB burden countries
   * - LMICs
     - Low- and middle-income countries
   * - LTBI
     - Latent tuberculosis infection
   * - PLHIV
     - People living with HIV
   * - U5 HHC
     - Children under 5 living in a household with a person with AcTB
   * - TB
     - Tuberculosis
   * - TPT
     - Tuberculosis preventive treatment
   * - 6H
     - Daily isoniazid monotherapy administered daily for six months
   * - 3HP
     - A short-course combination treatment, rifapentine and 
       isoniazid, administered for three months once a week

.. _ltbi1.0:

1.0 Background
++++++++++++++

.. _ltbi1.1:

1.1 Project overview
--------------------
This project used Vivarium framework to model the impact of treating LTBI on TB 
disease burden in five HBCs: India, South Africa, Philippines, Ethiopia, and 
Peru. The simulation is designed to estimate the extent to which the scale-up 
of TPT (6H and 3HP) reaching 95% of two high-risk populations (U5 HHC and PLHIV) 
in five HBCs improves health outcomes and reduces the disease burden of TB over 
a 5-year timeframe from 2020 to 2024, compared to a “business-as-usual” projection.

.. _ltbi1.2:

1.2 Literature review
---------------------
TB is the leading infectious cause of death globally, with particularly high 
disease burden in LMICs. The GBD 2017 study estimates that 1.9 billion people 
globally may harbor LTBI. [GBD-2017]_ TPT to reduce the risk of progression from 
LTBI to AcTB is important not only at the individual level but also at the population 
level in order to achieve TB elimination per the WHO End TB Strategy. WHO recommends 
that high-risk populations, such as children under 5 who are household contacts 
of persons with AcTB and people living with HIV, should receive TPT. [Global-Tuberculosis-Programme-2018]_ 
Our client has a long history in TB control and offers programmatic support with 
partners from the global Stop TB initiative. As part of its commitment to reduce 
the burden of TB, the client developed 3HP which may increase adherence and treatment 
completion rates compared to 6H.


.. _ltbi2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++
To assess the impact of scaling up different treatments for LTBI on TB disease 
burden over five years. The project provides information on the relationship 
between different treatments and health outcomes such as the incidence of AcTB, 
deaths due to AcTB, and DALYs due to AcTB. The simulation forecasts a baseline 
and two intervention scenarios and the resulting health outcomes from years 2020 
through 2024 for five HBCs.


.. _ltbi3.0:

3.0 Causal framework
++++++++++++++++++++

.. _ltbi3.1:

3.1 Causal diagram
------------------
 
 .. note::
    link to DAGs page
    use round circles with DAGs

**Outcome (O)**:


**Most proximal determinant/exposure (E)**:
  

**Confounders (C)**:


**Effect modifiers**:


**Mediators (M)**:


.. _ltbi4.0:

4.0 Intervention
++++++++++++++++
Scale-up of TPT coverage among two high-risk groups: U5 HHC and PLHIV.

.. _ltbi4.1:

4.1 Simulation scenarios
------------------------
The project compared the health outcomes in three scenarios:

 - **Baseline (6H as projected):** The baseline scenario projects GBD country-specific 
   demographic and disease trends into the future, as well as the historic coverage 
   of 6H treatment for U5 HHC and PLHIV, thus simulating what would happen if 
   these trends continue “business as usual.”

 - **Intervention scenario 1 (6H scale up):** This scenario is identical to the baseline 
   scenario but scales up 6H to reach 95% coverage for U5 HHC and PLHIV by 2025. 
   Thus, this scenario compares what would happen if countries were to increase 
   coverage, utilizing the same treatment regimen (6H) as seen in the baseline scenario.

 - **Intervention scenario 2 (3HP scale up):** This scenario is identical to the baseline 
   scenario but scales up 3HP to reach 95% coverage for U5 HHC and PLHIV by 2025. 
   Thus, this scenario compares what would happen if countries were to increase 
   coverage and utilize a new treatment regimen (3HP).

Treatment coverage in baseline and intervention scenarios:
 - `Baseline coverage data <https://github.com/ihmeuw/vivarium_csu_ltbi/blob/main/src/vivarium_csu_ltbi/data/baseline_coverage.csv>`_
 - `Intervention coverage data shift <https://github.com/ihmeuw/vivarium_csu_ltbi/blob/main/src/vivarium_csu_ltbi/data/intervention_coverage_shift.csv>`_
 - `Python code for adjusting coverage data <https://github.com/ihmeuw/vivarium_csu_ltbi/blob/main/src/vivarium_csu_ltbi/data/adjust_coverage_shift_data.py>`_

The country- and risk-group-specific TPT coverage data is informed by 
country-specific National Strategic Plan and WHO global tuberculosis report.


.. _ltbi5.0:

5.0 Vivarium modeling components
++++++++++++++++++++++++++++++++

.. _ltbi5.1:

5.1 Vivarium concept model 
--------------------------

.. image:: ltbi_concept_model_diagram.svg

.. _ltbi5.2:

5.2 Demographics
----------------

.. _ltbi5.2.1:

5.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 - Cohort type: Prospective closed cohort
 - Time span: Jan 1, 2019 to Dec 31, 2024
 - Time step: 30 days
 - Size of largest starting population: 100,000
 - Youngest start age and oldest end age: 0-95+ years
 - Location: India, South Africa, Philippines, Ethiopia, and Peru

.. _ltbi5.3:

5.3 Models
----------

.. _ltbi5.3.1:

5.3.1 Cause model
~~~~~~~~~~~~~~~~~
see :ref:`LTBI cause model<2017_cause_latent_tb>`

.. _ltbi5.3.2:

5.3.2 Risk factor model
~~~~~~~~~~~~~~~~~~~~~~~
see :ref:`LTBI risk factor model<2019_risk_effect_hh_tb_contact>`

.. _ltbi5.3.3:

5.3.3 Treatment model
~~~~~~~~~~~~~~~~~~~~~
see :ref:`LTBI treatment model model<intervention_latent_tuberculosis_treatment>`

.. _ltbi5.4:

5.4 Desired outputs
-------------------

.. list-table:: Output shell table
   :header-rows: 1

   * - Location
     - Year
     - Age group
     - Sex
     - Risk group
     - Scenario
     - Treatment group
     - Outcome
   * - Ethiopia
     - 2019
     - 0 to 4
     - Female
     - General population
     - Baseline (6H as projected)
     - 6H adherent
     - Active TB Incidence count (cases)
   * - India
     - 2020
     - 5 to 14
     - Male
     - PLHIV
     - Intervention 1 (6H scale up)
     - 6H non-adherent
     - Active TB Incidence rate (cases per 100,000 person-years)
   * - Peru
     - 2021
     - 15 to 59
     - Both
     - U5 HHC
     - Intervention 2 (3HP scale up)
     - 3HP adherent
     - DALYs due to Active TB (per 100,000 person-years)
   * - Philippines
     - 2022
     - 60 plus
     - 
     - 
     - 
     - 3HP non-adherent
     - DALYs due to HIV resulting in other diseases (per 100,000 person-years)
   * - South Africa
     - 2023
     - All ages
     - 
     - 
     - 
     - Untreated
     - Deaths due to Active TB (per 100,000 person-years)
   * - 
     - 2024
     - 
     - 
     - 
     - 
     - All
     - Deaths due to HIV resulting in other diseases (per 100,000 person-years)
   * - 
     - 
     - 
     - 
     - 
     - 
     - 
     - Deaths due to other causes (per 100,000 person-years)
   * - 
     - 
     - 
     - 
     - 
     - 
     - 
     - Person-Years
   * - 
     - 
     - 
     - 
     - 
     - 
     - 
     - Treatment Coverage (proportion)
   * - 
     - 
     - 
     - 
     - 
     - 
     - 
     - Ylls due to other causes (per 100,000 person-years)


.. _ltbi6.0:

6.0 Validation and verification
+++++++++++++++++++++++++++++++

.. todo::

 Add V&V strategy


.. _ltbi7.0:

7.0 Limitations
+++++++++++++++
 - We assume same efficacy for 6H and 3HP as literature evidence shows that 6HP 
   is non-inferior to 3HP on protecting patients progress from LTBI to active TB.
 - We assume perfect screening for active TB, which may not be the case in 
   reality (e.g., some individuals eligible for treatment may not receive it, 
   while others that have already progressed to active TB may receive treatment 
   for LTBI, depending on quality of screening).
 - We assume same TB disease duration for both HIV-positive population and 
   HIV-negative population.
 - We do not account for the reduced risk of onward TB transmission by people 
   treated for LTBI (“transmission dynamics”), which likely leads to a more 
   conservative estimate of treatment impact.
 - The relative risk of hosuehold contact exposure does not quantify the 
   relationship between TB risk, household size, and income.
 - Treatment for active TB is not assessed in this simulation.
 - Adverse events are not captured in this simulation.
 - Cost effectiveness analysis is not included in this simulation. 


.. _ltbi8.0:

8.0 References
++++++++++++++

.. [GBD-2017]
   James SL, Abate D, Abate KH, et al. Global, regional, and national incidence, 
   prevalence, and years lived with disability for 354 diseases and injuries for 
   195 countries and territories, 1990–2017: a systematic analysis for the Global 
   Burden of Disease Study 2017. The Lancet 2018; 392: 1789–858.
.. [Global-Tuberculosis-Programme-2018]
   Global Tuberculosis Programme. Latent tuberculosis infection: updated and 
   consolidated guidelines for programmatic management. 2018 
   http://www.ncbi.nlm.nih.gov/books/NBK531235/ (accessed Jan 8, 2020).

Country-specific TPT coverage sources:
 - **[Ethiopia]** Federal Democratic Republic of Ethiopia National Strategic Plan 
   Tuberculosis and Leprosy Control 2006-2013 EC (2013/14-2020). Ministry of Health.
 - **[India]** National Strategic Plan for Tuberculosis Elimination 2017-2025. 
   Revised National Tuberculosis Control Programme. Central TB Division, 
   Directorate General of Health Services, Ministry of Health with Family 
   Welfare, Nirman Bhavan, New Delhi, India. 2017.
 - **[South_Africa]** South Africa’s National Strategic Plan for HIV, TB and STIs 
   2017-2022. South African National AIDS Council.
 - **[Peru]** Tuberculosis in the Americas 2018. Pan American Health Association 
   and World Health Organization; 2018.
 - **[Philippines]** 2017-2022 Philippine Strategic TB Elimination Plan: Phase 1 
   (PhilSTEP1). Department of Health, Philippines.
