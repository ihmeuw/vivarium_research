.. _2019_risk_hh_tb_contact:

==============================
Household Tuberculosis Contact
==============================

.. list-table:: Abbreviations
   :widths: 5 10
   :header-rows: 1

   * - Label
     - Definition
   * - TB
     - Tuberculosis
   * - LTBI
     - Latent Tuberculosis Infection
   * - AcTB
     - Active Tuberculosis
   * - HHC
     - Household Tuberculosis Contact
   * - TPT
     - Tuberculosis Preventive Therapy
   * - TMREL
     - Theoretical Minimum Risk Exposure Level

Risk Exposure Overview
----------------------
HHC is defined as individuals who living in a household with AcTB case. The HHC 
exposure is a dichotomous variable, exposure to this risk factor is associated 
with increased risk of progression to LTBI. HHC is not a risk factor included 
in GBD; however, it is one of the factors that indicates the population eligible 
for TPT. TPT is recommended by World Health Organization (WHO) for HHC living in 
high-TB incidence countries. `Contact Investigation 
<https://www.usaid.gov/sites/default/files/documents/PI_TBCI_For_Web_0.pdf>`_

.. list-table:: Risk-Outcome Pairs for HHC
   :widths: 5 10
   :header-rows: 1

   * - Risk
     - Outcome
   * - Household tuberculosis contact
     - Latent tuberculosis infection

The TMREL was defined as no AcTB case in household.


Vivarium Modeling Strategy
--------------------------
HHC is a dichotomous exposure modelled in Vivarium with two risk categories: 
living in a household with AcTB cases (exposed), and living in a household without 
AcTB cases (unexposed).

Data sources
++++++++++++
To estimate the exposure of HHC, we utilized household structure data from 
Demographic and Health Surveys (DHS) and Integrated Public Use Microdata 
Series (IPUMS), combining with prevalence of AcTB from GBD 2019 to calculate what 
fraction of people for a given location-/age-/sex- would be living in a household 
with case of AcTB.

.. list-table:: Input data table 
    :widths: 5 5 10
    :header-rows: 1

    * - Component
      - Source
      - Notes
    * - Prevalence of AcTB
      - GBD 2019
      - Sum of prevalence over cause_id 934, 946, 947, 948, 949, 950
    * - Household structure
      - household microdata from DHS and IPUMS
      - 

Methods
+++++++
For a selected location, we first load the household microdata that contains age 
and sex information for each unique household id; then we incorporate GBD 2019 
age-/sex-specific AcTB prevalence to calculate the probability of individual 
free to AcTB in each household, according to the formula:

:math:`Pr_{no\; AcTB\; in\; HH_i} = \prod_{j\in HH_i} 1 - Pr_{j\; has\; AcTB}`

Where, :math:`Pr_{j\; has\; AcTB}` is the probability of a person j in household 
i has AcTB.

Next, we calculate the mean probability of free to AcTB across all households within 
each GBD age and sex group, described as below:

:math:`Pr_{no\; AcTB\; (age,\; sex)} = \frac{{}\sum_{i\in age,\; sex} Pr_{no\; AcTB\; in\; HH_i}}{total\; number\; of\; HH\; (age,\; sex)}`

Lastly, we restrict our HHC population to individuals who live in a household 
with AcTB but don't have AcTB themselves, and the fraction of HHC for a given 
GBD age and sex group is calculated as:

:math:`F_{HHC(age,\; sex)} = 1 - \frac{Pr_{no\; AcTB\; (age,\; sex)}}{1 - Prev_{AcTB(age,\; sex)}}`

Access the Python code solution `hh_tb_model <https://github.com/ihmeuw/vivarium_csu_ltbi/blob/main/src/vivarium_csu_ltbi/data/gbd2019_hh_tb_model.py>`_

Validation Criteria
+++++++++++++++++++
External validation by comparing to alternative derivation using other data sources.

References
----------

GBD 2019 TB prevalence
 - Vos T, Lim SS, Abbafati C, et al. Global burden of 369 diseases and injuries 
   in 204 countries and territories, 1990–2019: a systematic analysis for the 
   Global Burden of Disease Study 2019. The Lancet 2020; 396: 1204-22.

Household structure for 5 high TB incidence countries (Global Health Data Exchange)
 - Central Statistical Agency (Ethiopia), ICF International. Ethiopia Demographic 
   and Health Survey 2016. Fairfax, United States: ICF International, 2017.
 - ICF International, International Institute for Population Sciences (India), 
   Ministry of Health and Family Welfare (India). India Demographic and Health 
   Survey 2015-2016. Fairfax, United States: ICF International, 2018.
 - ICF International, Philippines Statistics Authority. Philippines Demographic 
   and Health Survey 2013. Fairfax, United States: ICF International, 2014.
 - Minnesota Population Center, Statistics South Africa. South Africa Population 
   and Housing Census 2011 from the Integrated Public Use Microdata Series, 
   International: [Machine-readable database]. Minneapolis: University of 
   Minnesota, 2015.
 - Macro International, Inc., National Institute of Statistics and Informatics 
   (Peru). Peru Continuous Demographic and Health Survey 2012. Fairfax, 
   United States: ICF International.
