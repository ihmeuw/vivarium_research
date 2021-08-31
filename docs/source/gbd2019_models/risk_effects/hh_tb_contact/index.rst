.. _2019_risk_effect_hh_tb_contact:

===========================================
Household Tuberculosis Contact Risk Effects
===========================================

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
   * - HTC
     - Household Tuberculosis Contact
   * - TMREL
     - Theoretical Minimum Risk Exposure Level
   * - PAF
     - Population Attributable Fraction

Risk Overview
-------------

.. todo::

    Provide a brief description of the HTC risk.


Vivarium Modeling Strategy
--------------------------

.. note::

   This section will describe the Vivarium modeling strategy for risk effects.
   For a description of Vivarium modeling strategy for risk exposure, see 
   the :ref:`Household Tuberculosis Contact <2019_risk_hh_tb_contact>` page.

.. list-table:: Entities Affected by HTC
   :widths: 5 5 5 5 5
   :header-rows: 1

   * - Outcome
     - Outcome type
     - Outcome ID
     - Affected measure
     - Note
   * - LTBI
     - Cause
     - 954
     - Incidence
     -

Incidence of LTBI is calculated from IHME’s Bayesian disease modeling software, 
DisMod-MR. More information can be found on :ref:`Latent Tuberculosis Cause Model 
Document <2017_cause_latent_tb>`.

Relative Risks
++++++++++++++
We conducted a meta-analysis by reviewing over 200 papers to determine the 
relative risk (RR) for HTC exposure, among the under 5 and the 5+ population. 
The reference group was defined as indivudals without exposure to HTC. After 
discussion with a TB expert, we selected 11 papers for inclusion in the under 5 
meta-analysis and approximately 20 papers for the 5+ meta-analysis (see References 
for full list of cited works). Based on the evidence, the risk model incorporates 
a RR of 4.72 (95%CI 3.87 to 5.76) for under 5 HTC-exposed population, and a RR 
of 1.75 (95%CI 1.6 to 1.91) for 5+ HTC-exposed population.

Relative risk of HTC exposure for under 5 population

.. image:: rr_under_5.png

Relative risk of HTC exposure for 5+ population

.. image:: rr_over_5.png

.. list-table:: Relative Risks
   :widths: 5 5 5
   :header-rows: 1

   * - Exposure Category
     - Relative Risk
     - Note
   * - Under 5 HTC-exposed
     - 4.72 (95%CI 3.87 to 5.76)
     - Specific to individuals under age of 5 years who live in a household with 
       AcTB case, does not vary by sex and location
   * - 5+ HTC-exposed
     - 1.75 (95%CI 1.6 to 1.91)
     - Specific to individuals above age of 5 years who live in a household with 
       AcTB case, does not vary by sex and location 
   * - HTC-unexposed
     - 1
     - TMREL

The incidence of LTBI for individuals with exposure to HTC is:

:math:`i_{HTC-exposed} = i_{LTBI}\times (1 - PAF)\times RR_{HTC}`

The incidence of LTBI for individuals without exposure to HTC is:

:math:`i_{HTC-unexposed} = i_{LTBI}\times (1 - PAF)`

The PAF is derived from the relative risk and risk exposure of HTC:

:math:`PAF = \frac{p\times (RR_{HTC} - 1)}{p\times (RR_{HTC} - 1) + 1}`

Where:
 - :math:`i_{LTBI}` is the incidence of LTBI, calculated from DisMod-MR;
 - :math:`RR_{HTC}` is the age-dependent relative risk of developing LTBI for 
   HTC-exposed versus HTC-unexposed, developed by meta-analysis;
 - :math:`p` is the risk exposure/probability of HTC, deveried from prevalence 
   of AcTB and household structure data.

Assumptions and Limitations
+++++++++++++++++++++++++++

.. todo::

    List assumptions and limitations of risk modeling strategy (confounding, 
    mediation, modification, etc.)

Validation and Verification Criteria
++++++++++++++++++++++++++++++++++++


References
----------

 - Abu-Taleb AMF, El-Sokkary RH, El Tarhouny SA. 749 Interferon-gamma release 
   assay for detection of latent tuberculosis infection in casual and close 
   contacts of tuberculosis cases. East Mediterr Health J 2011; 17: 749-53.
 - Almeida LM, Barbieri MA, Da Paixão AC, Cuevas LE. Use of purified protein 
   derivative to assess the risk of infection in children in close contact with 
   adults with tuberculosis in a population with high Calmette-Guérin bacillus 
   coverage. Pediatr Infect Dis J 2001; 20: 1061-5.
 - Blahd M, Leslie EI, Rosenthal SR. Infectiousness of the “Closed Case” in 
   Tuberculosis. Am J Public Health Nations Health 1946; 36: 723-6.
 - Boon S den, Verver S, Marais BJ, et al. Association Between Passive Smoking 
   and Infection With Mycobacterium tuberculosis in Children. Pediatrics 2007; 
   119: 734-9.
 - Bowerman RJ. Tuberculin skin testing in BCG-vaccinated populations of adults 
   and children at high risk for tuberculosis in Taiwan. Int J Tuberc Lung Dis 
   2004; 8: 1228-33.
 - Dogra S, Narang P, Mendiratta DK, et al. Comparison of a whole blood 
   interferon-γ assay with tuberculin skin testing for the detection of 
   tuberculosis infection in hospitalized children in rural India. Journal of 
   Infection 2007; 54: 267-76.
 - Contagion In Children Under 15. An Analysis Of 1,220 Children From The Brompton 
   Hospital Research Department. The British Medical Journal 1931; 2: 183-6.
 - Gustafson P, Lisse I, Gomes V, et al. Risk factors for positive tuberculin 
   skin test in Guinea-Bissau. Epidemiology 2007; 18: 340-7.
 - Hossain S, Zaman K, Banu S, et al. Tuberculin survey in Bangladesh, 2007&#8211;2009: 
   prevalence of tuberculous infection and implications for TB control. 2013; 
   published online Oct 1. DOI:info:doi/10.5588/ijtld.13.0114.
 - Hoa NB, Cobelens FGJ, Sy DN, Nhung NV, Borgdorff MW, Tiemersma EW. First national 
   tuberculin survey in Viet Nam: characteristics and association with tuberculosis 
   prevalence. 2013; published online June 1. DOI:info:doi/10.5588/ijtld.12.0200.
 - Lienhardt C, Fielding K, Sillah J, et al. Risk Factors for Tuberculosis Infection 
   in Sub-Saharan Africa. Am J Respir Crit Care Med 2003; 168: 448-55.
 - Madico G, Gilman RH, Checkley W, et al. Community infection ratio as an indicator 
   for tuberculosis control. Lancet 1995; 345: 416-9.
 - Mutsvangwa J, Millington KA, Chaka K, et al. Identifying recent Mycobacterium 
   tuberculosis transmission in the setting of high HIV and TB burden. Thorax 
   2010; 65: 315-20.
 - Mahomed H, Hawkridge T, Verver S, et al. Predictive factors for latent tuberculosis 
   infection among adolescents in a high-burden area in South Africa. Int J Tuberc 
   Lung Dis 2011; 15: 331-6.
 - Mumpe-Mwanja D, Verver S, Yeka A, et al. Prevalence and risk factors of latent 
   Tuberculosis among adolescents in rural Eastern Uganda. Afr Health Sci 2015; 
   15: 851-60.
 - Narain R, Nair SS, Rao GR, Chandrasekhar P. Distribution of tuberculous infection 
   and disease among households in a rural community. Bull World Health Organ 1966; 
   34: 639-54.
 - Narasimhan P. The epidemiology and transmission dynamics of Tuberculosis in 
   southern India, with a focus on risk factors and household contact patterns.;: 347.
 - Radhakrishna S, Frieden TR, Subramani R, Santha T, Narayanan PR, Indian Council 
   of Medical Research. Additional risk of developing TB for household members 
   with a TB case at home at intake: a 15-year study. Int J Tuberc Lung Dis 2007; 
   11: 282-8.
 - Roelsgaard E, Iversen E, Bløcher C. Tuberculosis in tropical Africa. Bull 
   World Health Organ 1964; 30: 459–518. Schlesinger B, Hart PD. Human Contagion 
   and Tuberculous Infection in Childhood. Archives of Disease in Childhood 1930; 
   5: 191-206.
 - Shaw JB, Wynn-Williams N. Infectivity of pulmonary tuberculosis in relation 
   to sputum status. Am Rev Tuberc 1954; 69: 724-32.
 - Whalen CC, Zalwango S, Chiunda A, et al. Secondary Attack Rate of Tuberculosis 
   in Urban Households in Kampala, Uganda. PLoS ONE 2011; 6: e16137.
 - Jensen AV, Jensen L, Faurholt-Jepsen D, et al. The Prevalence of Latent Mycobacterium 
   tuberculosis Infection Based on an Interferon-γ Release Assay: A Cross-Sectional 
   Survey among Urban Adults in Mwanza, Tanzania. PLoS One 2013; 8. DOI:10.1371/journal.pone.0064008.
