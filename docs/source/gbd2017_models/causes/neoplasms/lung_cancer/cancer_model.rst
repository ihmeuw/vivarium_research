.. _2017_lung_cancer:

===================================
Tracheal, Bronchus, and Lung Cancer
===================================

.. contents::
   :local:
   :depth: 1

Disease Overview
----------------

The trachea, commonly referred to as the windpipe, is part of the lower respiratory tract that connects the larynx (lower portion of the upper respiratory tract) to the primary bronchi, which biforcate from the trachea and lead to each lung. Most cases of tracheal and bronchus cancer are secondary to primary cancer in other sites; however, primary cancers can occur in these sites as well [Sherani-et-al-2015]_, [Javidan-Nejad-2010]_. Notably, tracheal cancer makes up only a small portion of tracheal, bronchus, and lung cancers [Sherani-et-al-2015]_, [Javidan-Nejad-2010]_. 

Lung cancer screening and diagnosis is performed via low-dose computed topography (LDCT), which provides an image of the chest. Screening guidelines typically depend on age, smoking history, and current health status. Bronchus and tracheal cancer diagnoses are performed using LDCT as well as bronchioscopy (or a scope of the respiratory tract) [Sherani-et-al-2015]_, [Javidan-Nejad-2010]_. 

Risk factors for lung cancer include genetic and environmental factors, notably tobacco smoke and air pollution. Despite advances in TCL cancer early detection and therapy options, its burden is still increasing due to an aging popuation and risk factors such as smoking history [Deng-et-al-2020]_.

GBD 2017 Modeling Strategy
--------------------------

The following information was obtained from the GBD 2017 fatal and non-fatal methods appendices [GBD-2017-YLD-Appendix-TBL-cancer]_, [GBD-2017-CoD-Appendix-TBL-cancer]_.

Tracheal, bronchus, and lung (TBL) cancers are modeled together as a single cause in GBD. These cancers are not differentiated in the input data for the GBD model and are not crosswalked for alternative cause definitions. 

As with the majority of neoplasm causes in GBD, a remission rate for TBL cancer is not explicitly modeled. Rather, there is no morbidity modeled for TBL cancer after 10 years. As such, prevalence for TBL cancer extends for no more than 10 years after incidence.

.. note::

  According to the GBD lung cancer modeler, this assumption is generally appropriate for TBL cancer because it is fairly lethal cancer, although investigation into the long term survival rates of TBL cancer using SEER data could provide a more in-depth analysis of the limitations of this assumption.

Total prevalence of TBL cancer is split into four sequelae: 

#. Diagnosis and primary therapy: onset of symptoms through the end of treatment; assumed 3.3 month duration for TBL cancer. Disability weight of 0.288 (0.193, 0.399).
#. Controlled phase: time between end of primary treatment and cure, death, or progression to metastatic phase; duration calculated based on remainder of time after attributing other sequelae. Disability weight of 0.049 (0.031, 0.072).
#. Metastatic phase: time period of intensive treatment for metastatic disease; assumed 4.51 month duration for TBL cancer. Disability weight of 0.451 (0.307, 0.600).
#. Terminal phase: one-month period prior to death. Disability weight of 0.540 (0.377, 0.687).

.. note:: 
  
  The disability weights for these sequelae phases are the same across all GBD neoplasms (excluding specific cancers with additional sequelae).

GBD neoplasm models rely on mortality incidence ratios (MIRs), which are estimated in a separate modeling process. According to the GBD modeler, MIRs should be retrieved from the GBD cancer modeler and not calculated from GBD estimates of location-specific incidence and moratlity rates. The fatal estimates are modeled first and then the MIRs are used to model the incidence estimates.

.. note::

  The GBD modeler mentioned that for specific locations, the input data may be primarily cancer incidence registries, although it is possible that the GBD incidence estimates may not align with the incidence input data due to this modeling process.

Covariates used in the fatal TBL cancer model for GBD 2017 included:

  Level 1: alcohol (liters per capita), cumulative cigarettes (5, 10, 15, and 20 years), smoking prevalence, tobacco (cigarettes per capita), secondhand smoke, log-transformed SEV scalar: lung C, log-transformed age-standardized SEV scalara: Lung C

  Level 2: indoor air pollution (all cooking fuels), outdoor air pollution (PM2.5), residential radon, diabetes fasting plasma glucose (mmol/L) 

  Level 3: Education (years per capita), LDI ($ per capita), socio-demographic index

.. list-table:: Tracheal, Bronchus, and Lung Cancer ICD Codes used for GBD 2017
   :widths: 15 15
   :header-rows: 1

   * - ICD 10
     - ICD 9
   * - C33-C34.9, D02.1-D02.3, D14.2-D14.3, D38.1
     - 162-162.9, 212.2-212.3, 231.1-231.2, 235.7

Cause Hierarchy
+++++++++++++++

.. image:: lung_cancer_hierarchy.svg

Restrictions
++++++++++++

The following table describes any restrictions in GBD 2017 on the effects of
this cause (such as being only fatal or only nonfatal), as well as restrictions
on the ages and sexes to which the cause applies.

.. list-table:: GBD 2017 Cause Restrictions
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
     - age_group_id = 8
     - 15-19 years
   * - YLL age group end
     - age_group_id = 235
     - 95+ years
   * - YLD age group start
     - age_group_id = 8
     - 15-19 years
   * - YLD age group end
     - age_group_id = 235
     - 95+ years

Vivarium Modeling Strategy
--------------------------

.. todo::

  Add an overview of the Vivarium modeling section.

Scope
+++++

.. todo::

  Describe which aspects of the disease this cause model is designed to
  simulate, and which aspects it is **not** designed to simulate.

Assumptions and Limitations
+++++++++++++++++++++++++++

.. todo::

  Describe the clinical and mathematical assumptions made for this cause model,
  and the limitations these assumptions impose on the applicability of the
  model.

Cause Model Diagram
+++++++++++++++++++

State and Transition Data Tables
++++++++++++++++++++++++++++++++

This section gives necessary information to software engineers for building the model. 
This section usually contains four tables: Definitions, State Data, Transition Data and Data Sources.

Definitions
"""""""""""

This table contains the definitions of all the states in **cause model diagram**. 

.. list-table:: State Definitions
   :widths: 5 5 20
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - 
     - 
     - 
   * - 
     - 
     - 

States Data
"""""""""""

This table contains the **measures** and their **values** for each state in cause-model diagram. This information is used to 
initialize the model. 

.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - State
     - prevalence
     - 
     - 
   * - State
     - birth prevalence
     - 
     - 
   * - State
     - excess mortality rate
     - 
     - 
   * - State
     - disabilty weights
     - 
     -
   * - ALL
     - cause specific mortality rate
     - 
     - 

Transition Data
"""""""""""""""

This table contains the measures needed for transition from one state to other in the cause model. 

.. list-table:: Transition Data
   :widths: 10 10 10 20 30
   :header-rows: 1
   
   * - Transition
     - Source 
     - Sink 
     - Value
     - Notes
   * - i
     - S
     - I
     - 
     - 
   * - r
     - I
     - R
     - 	
     - 

Data Sources
""""""""""""

This table contains the data sources for all the measures. The table structure and common measures are as below:

.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Measure
     - Sources
     - Description
     - Notes
   * - prevalence_cid
     - 
     - 
     - 
   * - birth_prevalence_cid
     - 
     - 
     -
   * - deaths_cid
     - 
     - 
     - 
   * - population
     - 
     - 
     - 
   * - sequelae_cid
     - 
     - 
     - 
   * - incidence_rate_cid
     - 
     - 
     - 
   * - remission_rate_mid
     - 
     - 
     - 
   * - disability_weight_s{`sid`}
     - 
     - 
     - 
   * - prevalence_s{`sid`}
     - 
     - 
     - 

Validation Criteria
+++++++++++++++++++

References
----------

.. [Deng-et-al-2020]

  Deng, Yujiao, et al. "Epidemiological trends of tracheal, bronchus, and lung cancer at the global, regional, and national levels: a population-based study." Journal of hematology & oncology 13.1 (2020): 1-16. `Available here <https://pubmed.ncbi.nlm.nih.gov/32690044/>`_

.. [Javidan-Nejad-2010]

  Javidan-Nejad, Cylen. "MDCT of trachea and main bronchi." Radiologic Clinics 48.1 (2010): 157-176. `Available here <https://pubmed.ncbi.nlm.nih.gov/19995634/>`_

.. [Sherani-et-al-2015]

  Sherani, Khalid, et al. "Malignant tracheal tumors: a review of current diagnostic and management strategies." Current Opinion in Pulmonary Medicine 21.4 (2015): 322-326. `Available here <https://journals.lww.com/co-pulmonarymedicine/Abstract/2015/07000/Malignant_tracheal_tumors__a_review_of_current.4.aspx>`_

.. [GBD-2017-YLD-Appendix-TBL-cancer]

   Pages ???-??? in `Supplementary appendix 1 to the GBD 2017 YLD Capstone <YLD
   appendix on ScienceDirect_>`_:

     **(GBD 2017 YLD Capstone)** GBD 2017 Disease and Injury Incidence and
     Prevalence Collaborators. :title:`Global, regional, and national incidence,
     prevalence, and years lived with disability for 354 diseases and injuries
     for 195 countries and territories, 1990–2017: a systematic analysis for the
     Global Burden of Disease Study 2017`. Lancet 2018; 392: 1789–858. DOI:
     https://doi.org/10.1016/S0140-6736(18)32279-7

.. _YLD appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322797-mmc1.pdf
.. _YLD appendix on Lancet.com: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32279-7/attachment/6db5ab28-cdf3-4009-b10f-b87f9bbdf8a9/mmc1.pdf


.. [GBD-2017-CoD-Appendix-TBL-cancer]

   Pages ???-??? in `Supplementary appendix 1 to the GBD 2017 CoD Capstone <CoD
   appendix on ScienceDirect_>`_:

     **(GBD 2017 CoD Capstone)** GBD 2017 Causes of Death Collaborators.
     :title:`Global, regional, and national age-sex-specific mortality for 282
     causes of death in 195 countries and territories, 1980–2017: a systematic
     analysis for the Global Burden of Disease Study 2017`. Lancet 2018; 392:
     1736–88. DOI: http://dx.doi.org/10.1016/S0140-6736(18)32203-7

.. _CoD appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322037-mmc1.pdf
.. _CoD appendix on Lancet.com: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32203-7/attachment/5045652a-fddf-48e2-9a84-0da99ff7ebd4/mmc1.pdf
