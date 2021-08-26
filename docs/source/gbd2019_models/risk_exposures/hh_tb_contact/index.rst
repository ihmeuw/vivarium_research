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
     - tuberculosis
   * - LTBI
     - latent tuberculosis infection
   * - AcTB
     - active tuberculosis
   * - HHC
     - Household tuberculosis contact
   * - TPT
     - Tuberculosis preventive therapy
   * - TMREL
     - theoretical minimum risk exposure level

Risk Exposure Overview
----------------------
HHC is defined as individuals who living in a household with AcTB case. The HHC 
exposure is a dichotomous variable, exposure to this risk factor is associated 
with increased risk of progression to LTBI. HHC is not a risk factor included 
in GBD; however, it is one of the factors that indicates the population eligible 
for TPT. TPT is recommended by World Health Organization (WHO) for HHC living in 
high-TB incidence countries.

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

Lastly, we restrict our HHC population as individuals who living in a household 
with AcTB but don't have AcTB themselves, and the fraction of HHC for a give 
GBD age and sex group is calculated as:

:math:`F_{HHC(age,\; sex)} = 1 - \frac{Pr_{no\; AcTB\; (age,\; sex)}}{1 - Prev_{AcTB(age,\; sex)}}`

Access the Python code solution `hh_tb_model <https://github.com/ihmeuw/vivarium_csu_ltbi/blob/main/src/vivarium_csu_ltbi/data/gbd2019_hh_tb_model.py>`_

Validation Criteria
+++++++++++++++++++


References
----------

