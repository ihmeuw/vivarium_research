.. _intervention_latent_tuberculosis_treatment:

=============================
Latent tuberculosis treatment
=============================

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 5 15
  :header-rows: 1

  * - Abbreviation
    - Definition
  * - TB
    - Tuberculosis
  * - LTBI
    - Latent tuberculosis infection
  * - TPT
    - Tuberculosis preventive therapy
  * - PLHIV
    - People living with HIV
  * - U5 HHC
    - Children under 5 who are exposed to active TB in household
  * - NSP
    - National Strategic Plan
  * - WHO
    - World Health Organization

TB is the leading infectious cause of deaths globally, with particularly high 
disease burden in low to middle-income countries. Treatment for LTBI patients 
can reduce their risk of progression to (active/symptomatic) TB. WHO guidelines 
recommend that high-risk populations such as **PLHIV** and **U5 HHC**, should 
receive TPT in order to achieve TB elimination per the WHO End TB strategy. 
[WHO_High_TB_Burden_Country_Lists]_ [Stop_TB_Partnership]_ [Global_Tuberculosis_Programme]_

Intervention Overview
---------------------

CSU client has a long history in TB control and offers programmatic support 
with partners from the global Stop TB initiative. As part of its commitment to 
reduce the burden of TB, they developed rifapentine as part of a short-course 
combination therapy, which may increase adherence, and treatment completion 
rates compared to alternative long-course LTBI treatment isoniazid. Modeling 
the scale-up of two treatment options listed below can allow us to compare the 
impact of these two treatments for LTBI on reducing TB burden.

- Treatment option 1 (**6H**): daily isoniazid monotherapy administered daily 
  for six months
- Treatment option 2 (**3HP**): A short-course combination treatment, rifapentine 
  and isoniazid, administered for three months once a week

The table below provides parameters and related data sources for LTBI intervention model. 

.. list-table:: Treatment parameters
  :widths: 10 15 15
  :header-rows: 1

  * - Parameter
    - Data source
    - Note
  * - Treatment coverage
    - NSP and WHO reports
    - 
  * - Treatment efficacy
    - Systematic literature review
    - Assume same efficacy for 6H and 3HP
  * - Treatment adherence
    - Systematic literature review
    - 

Treatment Coverage Data
+++++++++++++++++++++++

We aim to project the scale-up of TPT reaching 95% coverage of two high-risk 
populations in five high-burden countries in order to access the TB-related 
health outcomes over a five-year timeframe. We used LTBI treatment coverage 
target from country-specific NSP to inform the **linear projection over 5 
years**, assuming all countries presented below can reach 95% coverage in 2025.

.. todo::

  Document baseline coverage data for all locations

.. list-table:: Baseline coverage data
  :widths: 5 5 5 5 5 5 5
  :header-rows: 1

  * - Location
    - Baseline treatment
    - Alternative treatment
    - U5 HHC coverage 2019 (%)
    - U5 HHC coverage 2025 (%)
    - PLHIV coverage 2019 (%)
    - PLHIV coverage 2025 (%)
  * - South Africa
    - 6H
    - 3HP
    - 69
    - 95
    - 73
    - 95
  * - India
    - 6H
    - 3HP
    - 
    - 95
    - 
    - 95
  * - Philippines
    - 6H
    - 3HP
    - 
    - 95
    - 
    - 95
  * - Ethiopia
    - 6H
    - 3HP
    - 
    - 95
    - 
    - 95
  * - Peru
    - 6H
    - 3HP
    - 
    - 95
    - 
    - 95


Vivarium Modeling Strategy
--------------------------

The treatment model links interventions (6H and 3HP) to the likelihood of 
advancing from LTBI to active TB, thus affecting TB incidence, deaths, and DALYs.

.. todo::

  Add an overview of the Vivarium modeling section.


.. list-table:: Intervention Affected Outcomes
  :widths: 5 5 10 5 5 5 5
  :header-rows: 1

  * - Outcome
    - Outcome type
    - Outcome ID
    - Affected measure
    - Effect size measure
    - Effect size
    - Note
  * - TB (all-form)
    - GBD cause
    - cause_id 934, 946, 947, 948, 949, 950
    - incidence rate
    - Relative risk
    - 
    - 

.. todo::

  Fill out the tables below


.. list-table:: Restrictions
  :widths: 10 10 10
  :header-rows: 1

  * - Restriction
    - Value
    - Note
  * - Male only
    - 
    - 
  * - Female only
    - 
    - 
  * - Age group start
    - 
    - 
  * - Age group end
    - 
    - 
  * - Other
    - 
    - 

Treatment adherence and efficacy
++++++++++++++++++++++++++++++++

.. important::

  An adherent patient in this simulation is defined as:
   - Simulated patient treated with 6H: participants who take drug ≥ 70%-85% of days prescribed.
   - Simulated patient treated with 3HP: participants who completed 11 out 12 courses.

.. todo::

  1. Add RR formula for no treatment versus adherent
  2. Add RR formula for non-adherent versus adherent


.. list-table:: Adherence
  :widths: 10 15 10 10 10
  :header-rows: 1

  * - Population
    - Measure
    - Value
    - Distribution
    - Note
  * - Adherent to 6H
    - 6H Adherence rate in percentage points
    - Mean (95%UI Lower - Upper)
    - 
    - 
  * - Adherent to 3HP
    - 3HP Adherence rate in percentage points
    - Mean (95%UI Lower - Upper)
    - 
    - 

.. list-table:: Effect Size
  :widths: 10 10 10 10 10 
  :header-rows: 1

  * - Population
    - Measure
    - Value
    - Distribution
    - Note
  * - No treatment
    - Relative risk of incidence rate ratio
    - Mean (95%UI Lower - Upper)
    - 
    - RR is applicable for both 6H and 3HP
  * - Non adherent to treatment
    - Relative risk of incidence rate ratio
    - Mean (95%UI Lower - Upper)
    - 
    - RR is applicable for both 6H and 3HP


Treatment Algorithm
-------------------

.. todo::

  1. Add treatment flowchart
  2. Describe treatment flowchart


Assumptions and Limitations
---------------------------

1. In this simulation, patients are not eligible for retreatment after receiving 
   TPT, regardless of whether the simulated patient completes the full course of 
   treatment or not.
2. We assume same efficacy for 6H and 3HP because there are literature evidence 
   demonstrated that 6HP is non-inferior to 3HP on protecting patients progress 
   from LTBI to active TB. [citation]
3. 3HP is not suitable for children under two. Instead, we treat them with 6H.


Validation and Verification Criteria
------------------------------------


References
----------

.. [WHO_High_TB_Burden_Country_Lists] WHO High TB Burden Country Lists 2016-2020.
   https://www.who.int/tb/publications/global_report/high_tb_burdencountrylists2016-2020.pdf
   (accessed Jan 15, 2020)

.. [Stop_TB_Partnership] Stop TB Partnership | High Burden Countries.
   http://www.stoptb.org/countries/tbdata.asp
   (accessed Jan 15, 2020)

.. [Global_Tuberculosis_Programme] Latent tuberculosis infection: updated and consolidated guidelines for programmatic management. 2018
