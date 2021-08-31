.. _2019_cause_hhd:

=======================================================
Hypertensive Heart Disease (PAF of 1 with hypertension)
=======================================================

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - HHD
    - Hypertensive heart disease
    - 
  * - HF
    - Heart failure
    - 

Disease Overview
----------------

Hypertensive heart disease refers to a constellation of changes in the left ventricle, left atrium and coronary arteries as a result of chronic blood pressure elevation, which increases the workload on the heart inducing structural and functional changes. These changes include hypertrophy of the left ventricle, which can progress to heart failure; patients with left ventricular hypertrophy have significantly increased morbidity and mortality. Hypertensive heart disease ultimately encompasses all of the direct and indirect sequelae of chronic high blood pressure which include systolic or diastolic heart failure, conduction arrhythmias, especially atrial fibrillation, and increased risk of coronary artery disease.
[NCBI]_

GBD 2019 Modeling Strategy
--------------------------

GBD 2019 Non-Fatal Modeling Strategy
++++++++++++++++++++++++++++++++++++

In GBD, hypertensive heart disease is modeled as an outcome of the heart failure impairment envelope. The case definition for heart failure is a clinical diagnosis using structured criteria such as the Framingham or European Society of Cardiology criteria. Beginning in GBD 2016, we used ACC/AHA Stage C and above to capture both persons who are currently symptomatic and those who have been diagnosed with heart failure but are currently asymptomatic.
[McKee]_
[European-society-cardiology]_

GBD 2019 Fatal Modeling Strategy
++++++++++++++++++++++++++++++++++++

We included vital registration data in a standard CODEm approach to model hypertensive heart disease. 

[GBD-2019-Capstone-Appendix-HHD]_

Cause Hierarchy
+++++++++++++++

.. image:: cause_hierarchy_hhd.svg

Restrictions
++++++++++++

The following table describes any restrictions in GBD 2019 on the effects of
this cause (such as being only fatal or only nonfatal), as well as restrictions
on the ages and sexes to which the cause applies.

.. list-table:: GBD 2019 Cause Restrictions
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     - False
     -
   * - Female only
     - False
     -
   * - YLL only
     - False
     -
   * - YLD only
     - False
     -
   * - YLL age group start
     - 15
     - [15, 19 years), age_group_id=8
   * - YLL age group end
     - 125
     - [95, 125 years), age_group_id=235
   * - YLD age group start
     - 15
     - [15, 19 years), age_group_id=8
   * - YLD age group end
     - 125
     - [95, 125 years), age_group_id=235


Vivarium Modeling Strategy
--------------------------

Scope
+++++

Hypertensive heart disease should occur at the incidence of HF in the DisMod model multiplied by the proportion of heart failure that is due to HHD. Heart failure due to HHD is then a chronic state without remission. Transition from prevalent HF due to hypertensive heart disease to death should occur at the GBD EMR rate from the HF DisMod model. The transition rate from the susceptible state to the prevalent state should be modified by systolic blood pressure and high body mass index. 

Assumptions and Limitations
+++++++++++++++++++++++++++

The proportion splits for HHD are the same for incidence and prevalence 

Cause Model Diagram
+++++++++++++++++++

.. image:: cause_model_hhd.svg

State and Transition Data Tables
++++++++++++++++++++++++++++++++

Definitions
"""""""""""

.. list-table:: State Definitions
   :widths: 5 5 20
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - **S**\usceptible to HHD
     - Simulant that has not been diagnosed with HF due to HHD
   * - P
     - **P**\revalent HF due to HHD
     - Simulant with prevalent HF due to HHD


States Data
"""""""""""

.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - All
     - cause-specific mortality (CSMR)
     - :math:`\frac{\text{deaths_c498}}{\text{population}}`
     - Post CoDCorrect cause-level CSMR
   * - S
     - prevalence
     - 1-prevalence_c498
     - 
   * - P
     - prevalence
     - :math:`\sum\limits_{s\in sequelae} \text{prevalence}_s`
     - There are 4 sequelae
   * - P
     - excess mortality
     - emr_m2412
     - EMR from the HF envelope model
   * - P
     - disability weight
     - :math:`\frac{1}{\text{prevalence_c498}} \times \sum\limits_{s\in sequelae} \text{disability_weight}_s \cdot \text{prevalence}_s`
     - 

Transition Data
"""""""""""""""

.. list-table:: Transition Data
   :widths: 10 10 10 20 30
   :header-rows: 1
   
   * - Transition
     - Source 
     - Sink 
     - Value
     - Notes
   * - 1
     - S
     - P
     - :math:`{\text{incidence_m2412}} \times \text{propHF_HHD}`
     - This is the incidence of HF due to HHD, assuming that the split for incidence is the same as prevalence

Data Sources
""""""""""""

.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Value
     - Sources
     - Description
     - Notes
   * - prevalence_c498
     - como
     - Prevalence of HHD
     - All HF-related sequelae
   * - deaths_c498
     - codcorrect
     - Deaths from HHD
     -
   * - incidence_m2412
     - dismod
     - Incidence of overall HF
     - 
   * - propHF_HHD
     - CVD Team
     - Proportion of HF that is due to HHD
     - Proportion file in /share/scratch
   * - population
     - demography
     - Mid-year population for given age/sex/year/location
     - 
   * - sequelae_c498
     - gbd mapping
     - List of 4 sequelae for HHD
     - 
   * - prevalence_s{`sid`}
     - como
     - Prevalence of sequela with id `sid`
     - 
   * - disability_weight_s{`sid`}
     - YLD appendix
     - Disability weight of sequela with id `sid`
     - 
   * - emr_m2412
     - dismod-mr 2.1
     - excess mortality rate of heart failure
     - This is the EMR value for the overall HF envelope; not HHD-specific
   * - sequelae
     - sequelae definition
     - {s5750, s406, s407, s408}
     - 

Validation Criteria
+++++++++++++++++++

1. Compare CSMR experienced by simulants to CSMR from CoDCorrect in GBD
2. Compare prevalence experienced by simulants to post-COMO prevalence in GBD

References
----------

.. [NCBI] Tackling G, Borhade MB. Hypertensive Heart Disease. [Updated 2021 Feb 7]. 
  In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2021 Jan-. Available from: https://www.ncbi.nlm.nih.gov/books/NBK539800/

.. [McKee] McKee, P. A., Castelli, W. P., McNamara, P. M., & Kannel, W. B. (1971). 
   The natural history of congestive heart failure: the Framingham study. New England Journal of Medicine, 285(26), 1441-1446.

.. [European-society-cardiology] Ponikowski, P., Voors, A. A., Anker, S. D., Bueno, H., Cleland, J. G., Coats, A. J., ... & Van Der Meer, P. (2016). 
   2016 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure. Eur Heart J, 37(27), 2129-2200.

.. [GBD-2019-Capstone-Appendix-HHD]
  Appendix_ to: `GBD 2019 Diseases and Injuries Collaborators. Global burden of 369 diseases and injuries in 204 countries and territories, 1990–2019: a systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 17 Oct 2020;396:1204-1222` 

.. _Appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30925-9/attachment/deb36c39-0e91-4057-9594-cc60654cf57f/mmc1.pdf