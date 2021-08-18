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
    - 50
    - 95
    - 50
    - 95
  * - Philippines
    - 6H
    - 3HP
    - 57
    - 95
    - 70
    - 95
  * - Ethiopia
    - 6H
    - 3HP
    - 41
    - 95
    - 67
    - 95
  * - Peru
    - 6H
    - 3HP
    - 54
    - 95
    - 21
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
    - incidence rate of developing active TB from LTBI
    - Relative risk
    - Detailed in table `Effect Size`
    - 

.. list-table:: Restrictions
  :widths: 10 10 10
  :header-rows: 1

  * - Restriction
    - Value
    - Note
  * - Male only
    - False
    - 
  * - Female only
    - False
    - 
  * - Age group start
    - 0 or 2
    - 0 for 6H treatment population; 2+ for 3HP treatment population.
  * - Age group end
    - 125
    - 
  * - Treatment eligibility
    - Population with LTBI that are considered high-risk for TPT
    - High-risk population: PLHIV or U5 HHC

Treatment adherence and efficacy
++++++++++++++++++++++++++++++++

An adherent patient in this simulation is defined as:
 - Simulated patient treated with 6H: participants who take drug ≥ 70%-85% of days prescribed.
 - Simulated patient treated with 3HP: participants who completed 11 out 12 courses.

:math:`RR_{no{\_}treatment} = \frac{\text{active TB incidence for no treatment population}}{\text{active TB incidence for adherent population}}`

:math:`RR_{non{\_}adherent} = \frac{\text{active TB incidence for non-adherent population}}{\text{active TB incidence for adherent population}}`

Where,
 - :math:`RR_{no{\_}treatment}` denotes the risk ratio of developing 
   active TB between a population without treatment and a demographically identical 
   population adherent to per-protocol treatment;
 - :math:`RR_{non{\_}adherent}` denotes the risk ratio of developing 
   active TB between a population with “non-adherent treatment” (e.g., in a 
   randomized control trial, the intention-to-treat group minus per-protocol 
   group) and a population adherent to per-protocol treatment.

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
    - 62 (95%UI 32 - 86)
    - 
    - Derived from observational studies
  * - Adherent to 3HP
    - 3HP Adherence rate in percentage points
    - 77 (95%UI 50 - 94)
    - 
    - Derived from observational studies

.. list-table:: Effect Size
  :widths: 10 15 10 10 10 
  :header-rows: 1

  * - Population
    - Measure
    - Value
    - Distribution
    - Note
  * - No treatment
    - Relative risk of incidence rate ratio between no treatment population and 
      adherent population
    - 3.3 (95%UI 1.6 - 8.7)
    - 
    - RR is applicable for both 6H and 3HP
  * - Non-adherent to treatment
    - Relative risk of incidence rate ratio between non-adherent population and 
      adherent population
    - 1.5 (95%UI 1.2 - 1.8)
    - 
    - RR is applicable for both 6H and 3HP

As defined in table above, compared to someone who is adherent to the treatment, 
someone who receives treatment and is not adherent is **1.5** times more likely 
to transition from LTBI to active TB. Compared to someone who is adherent to 
treatment, someone who does not receive treatment is **3.3** times more likely 
to advance to active TB.


Treatment Algorithm
-------------------

To estimate the effect of different treatment scenarios, each individual patient 
in the simulation is assigned a treatment state indicating their current treatment 
(e.g., treated with 6H, treated with 3HP, not treated). Each patient’s treatment 
state changes over time, depending on adherence and duration of treatment regimen. 
The TPT coverage parameter defines how likely eligible individuals (LTBI patients 
with HIV or under 5 exposed to active TB in household) are to be treated. Once a 
patient is initiated, the treatment pathway is defined based on adherence and 
efficacy. Simulants that receive treatment are assigned a reduced risk of 
progressing to active TB for the duration of the simulation depending on the 
treatment (6H or 3HP) and whether or not the simulated individual is adherent. 
The simulation assumes no one has had TPT prior to the day 1 of the simulation, 
and no retreatment for those that have already received treatment, regardless of 
adherence. The adherence and efficacy parameter values are detailed in `Treatment 
adherence and efficacy` section. Based on the available evidence and guidelines, 
which do not recommend rifapentine nor 3HP for children under two, [Global_Tuberculosis_Programme]_ 
[LTBI_Treatment_Guidelines]_ [Recommendations-for-Use-of-3HP-Regimen]_ 
[LTBI-Treatment-FAQs]_ eligible children under 2 are treated with 6H instead.

.. image:: ltbi_tx_algorithm.svg

.. list-table:: Variables in Treatment Algorithm
  :widths: 5 10 15 10 10 
  :header-rows: 1

  * - Variable
    - Choice
    - Measure
    - Data source
    - Note
  * - with_ltbi
    - True, False
    - Prevalence and incidence of LTBI
    - GBD
    - 
  * - treatment_status
    - Treated with 6H, Treated with 3HP, Not treated
    - Treatment coverage
    - NSP and WHO reports
    - 1) No one has received treatment on day 1 of the simulation; 2) no 
      retreatment for those who have received treatment during the simulation 
      period.
  * - u5_hhc_status
    - Exposed, Unexposed
    - Demographic age structure, Prevalence of active TB in household
    - GBD, Household survey data (e.g., DHS, IPUMS)
    - 
  * - hiv_status
    - Positive, Negative
    - Prevalence of HIV
    - GBD 
    - 
  * - adherence_status
    - Adherent, Non-adherent
    - Treatment completion rate
    - Systematic literature review
    - See values in Table `Adherence`
  * - treatment_outcome (no treatment population)
    - Advance to active TB, Stay in LTBI
    - Incidence of active TB, Treatment efficacy derived from active TB incidence 
      ratio between no treatment population and adherent population
    - GBD, Systematic literature review
    - See :math:`RR_{no{\_}treatment}` in Table `Effect Size`
  * - treatment_outcome (non-adherent population)
    - Advance to active TB, Stay in LTBI
    - Incidence of active TB, Treatment efficacy derived from active TB incidence 
      ratio between non-adherent population and adherent population
    - GBD, Systematic literature review
    - See :math:`RR_{non{\_}adherent}` in Table `Effect Size`
  * - treatment_outcome (adherent population)
    - Advance to active TB, Stay in LTBI
    - Incidence of active TB
    - GBD
    - Reference treatment group, :math:`RR_{adherent} = 1`


Assumptions and Limitations
---------------------------

1. In this simulation, patients are not eligible for retreatment after receiving 
   TPT, regardless of whether the simulated patient completes the full course of 
   treatment or not.
2. We assume same efficacy for 6H and 3HP because there are literature evidence 
   demonstrated that 6HP is non-inferior to 3HP on protecting patients progress 
   from LTBI to active TB. [citation]
3. 3HP is not suitable for children under two. Instead, we treat them with 6H.
4. We assume on one has had TPT prior to the beginning of the simulation.
5. For LTBI patients, only high-risk individuals (PLHIV and U5 HHC) are considered 
   eligible for TPT.


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

.. [LTBI_Treatment_Guidelines] Sterling TR. Guidelines for the Treatment of Latent Tuberculosis Infection: Recommendations from the National Tuberculosis Controllers Association and CDC, 2020. MMWR Recomm Rep 2020; 69. DOI:10.15585/mmwr.rr6901a1.

.. [Recommendations-for-Use-of-3HP-Regimen] Borisov AS. Update of Recommendations for Use of Once-Weekly Isoniazid-Rifapentine Regimen to Treat Latent Mycobacterium tuberculosis Infection. MMWR Morb Mortal Wkly Rep 2018; 67. DOI:10.15585/mmwr.mm6725a5.

.. [LTBI-Treatment-FAQs] Latent TB Infection Treatment FAQs for Clinicians | Tools for Health Care Providers | Professional Resources & Tools | TB | CDC. 2020; published online Feb 19.
   https://www.cdc.gov/tb/education/FAQforProviders.htm
   (accessed Feb 25, 2020)
