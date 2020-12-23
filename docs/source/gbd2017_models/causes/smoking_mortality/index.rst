.. _2017_smoking_related_mortality:

=================================================
Smoking Related Mortality (Excluding Lung Cancer)
=================================================

Mortality among smokers is much higher than mortality among non-smokers. Therefore, it can be important to consider increased mortality attributable to smoking when smoking is included in a model, even if specific causes affected by smoking are not necessary to explicitly include in the model. See the causal framework section in the :ref:`Vivarium CSU Lung Cancer Screening Concept Model Documentation <2017_concept_model_vivarium_swissre_lungcancer>` for an example of when this is important. 

The purpose of this cause model document is to represent the increased mortality risk associated with smoking exposure by combining the causes affected by the smoking risk factor. This specific cause model document was created to exclude lung cancer so that it can be used in a model that models the lung cancer cause directly.

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - SACs
    - Smoking-affected causes
    - 
  * - ACMR
    - All-cause mortality rate
    - 
  * - CSMR
    - Cause-specific mortality rate
    - 
  * - EMR
    - Excess mortality rate
    - 
  * - RF
    - Risk factor
    - 

GBD 2017 Modeling Strategy
--------------------------

The smoking risk factor in GBD 2017 has the following outcome pairs:

	tuberculosis, lower respiratory tract infections,
	oesophageal cancer, stomach cancer, bladder cancer, liver cancer, laryngeal cancer, lung cancer, breast
	cancer, cervical cancer, colorectal cancer, lip and oral cancer, nasopharyngeal cancer, other pharyngeal
	cancer, pancreatic cancer, kidney cancer, leukaemia, ischaemic heart disease, ischaemic stroke,
	haemorrhagic stroke, subarachnoid haemorrhage, atrial fibrillation and flutter, aortic aneurysm,
	peripheral arterial disease, chronic obstructive pulmonary disease, other chronic respiratory diseases,
	asthma, peptic ulcer disease, gallbladder and biliary tract diseases, Alzheimer disease and other
	dementias, Parkinson disease (protective), multiple sclerosis, type‐II diabetes, rheumatoid arthritis, low back pain, cataracts, macular degeneration, and fracture.

.. note::

	These risk-outcome pairs are consistent between GBD 2017 and GBD 2019

Cause Hierarchy
+++++++++++++++

.. list-table:: Smoking-Affected Cause IDs
   :header-rows: 1

   * - Cause
     - Cause ID
     - Age group ID start
     - Restrictions
     - More detailed subcauses?
     - Notes
   * - tuberculosis
     - 297
     - 4
     - 
     - True; Drug susceptible/resistant subcauses
     - 
   * - lower respiratory tract infections
     - 322
     - 2
     - 
     - 
     - 
   * - oesophageal cancer
     - 411
     - 8
     - 
     - 
     - 
   * - stomach cancer
     - 414
     - 8
     - 
     - 
     - 
   * - bladder cancer
     - 474
     - 8
     - 
     - 
     - 
   * - liver cancer
     - 417
     - 8
     - 
     - True; Etiology sub causes
     - 
   * - laryngeal cancer
     - 423
     - 8
     - 
     - 
     - 
   * - lung cancer
     - 426
     - 8
     - 
     - 
     - Will be excluded for this cause model
   * - breast cancer
     - 429
     - 8
     - 
     - 
     - 
   * - cervical cancer
     - 432
     - 8
     - FEMALE ONLY
     - 
     - 
   * - colorectal cancer
     - 441
     - 8
     - 
     - 
     - 
   * - lip and oral cancer
     - 444
     - 8
     - 
     - 
     - 
   * - nasopharyngeal cancer
     - 447
     - 6
     - 
     - 
     - 
   * - other pharyngeal	cancer
     - 450
     - 8
     - 
     - 
     - 
   * - pancreatic cancer
     - 456
     - 8
     - 
     - 
     - 
   * - kidney cancer
     - 471
     - 2
     - 
     - 
     - 
   * - leukaemia
     - 487
     - 2
     - 
     - True; Subtype subcauses
     - 
   * - ischaemic heart disease
     - 493
     - 8
     - 
     - 
     - 
   * - ischaemic stroke
     - 495
     - 2
     - 
     - 
     - 
   * - haemorrhagic stroke (Intracerebral hemorrhage)
     - 496
     - 2
     - 
     - 
     - 
   * - subarachnoid haemorrhage
     - 497
     - 2
     - 
     - 
     - 
   * - atrial fibrillation and flutter
     - 500
     - 11
     - 
     - 
     - Age group start after lung cancer
   * - aortic aneurysm
     - 501
     - 8
     - 
     - 
     - 
   * - peripheral arterial disease
     - 502
     - 13
     - 
     - 
     - Age group start after lung cancer
   * - chronic obstructive pulmonary disease
     - 509
     - 4
     - 
     - 
     - 
   * - other chronic respiratory diseases
     - 520
     - 2
     - 
     - 
     - 
   * - asthma
     - 515
     - 5
     - 
     - 
     - 
   * - peptic ulcer disease
     - 527
     - 5
     - 
     - 
     - 
   * - gallbladder and biliary tract diseases
     - 534
     - 5
     - 
     - 
     - 
   * - Alzheimer disease and other dementias
     - 543
     - 13
     - 
     - 
     - Age group start after lung cancer
   * - Parkinson disease (protective)
     - 544
     - 9
     - 
     - 
     - Age group start after lung cancer
   * - multiple sclerosis
     - 546
     - 9
     - 
     - 
     - Age group start after lung cancer
   * - type‐II diabetes
     - 976
     - 8
     - 
     - 
     - 
   * - rheumatoid arthritis
     - 627
     - 6
     - 
     - 
     - 
   * - low back pain
     - 630
     - N/A
     - YLD only
     - 
     - Exclude due to nonfatal
   * - cataracts
     - 671
     - N/A
     - YLD only
     - 
     - Exclude due to nonfatal
   * - macular degeneration
     - 672
     - N/A
     - YLD only
     - 
     - Exclude due to nonfatal
   * - Fracture
     - N/A
     - N/A
     - YLD only
     - 
     - Exclude due to nonfatal

.. note::

	The starting age group IDs were extracted according to the YLL start, not the YLD start.

	The :ref:`Vivarium CSU Lung Cancer Screening  Model  <2017_concept_model_vivarium_swissre_lungcancer>` only models simulants 15 years (age group ID 8) and older, so notes were made for causes with age group starts older than 15 years only.

Restrictions
++++++++++++

See the table above.

Vivarium Modeling Strategy
--------------------------

Scope
+++++

The Vivarium modeling strategy outlined in this document will be a **mortality only** model that utilizes forecasted cause-specific mortality rates for ischemic heart disease (IHD) and chronic obstructive pulmomary disease (COPD) from 2020 to 2040. These causes were selected because they represent a large share of all smoking-related mortality without needing to model several additional causes with smaller contributions. This model is intended to be pair with the :ref:`smoking risk exposure model <2017_risk_exposure_smoking_forecasted>`.

This model was designed for use in the :ref:`Lung Cancer Screening model <lung_cancer_cancer_concept_model>`, which uses data forecasted from 2020 to 2040. 

Assumptions and Limitations
+++++++++++++++++++++++++++

This model is limited in that it only considers smoking attributable deaths due to IHD and COPD (as well as lung cancer when modeled as a part of the :ref:`Lung Cancer Screening model <lung_cancer_cancer_concept_model>`) and not the totality of smoking attributable deaths.

.. todo::

  Quantify the approx. proportion

Cause Model Diagram
+++++++++++++++++++

There is no cause model diagram for this cause model because it is a mortality-only model. Mortality using should be modeled as follows:

.. math ::

	mr_i = ACMR - CSMR_\text{c426} - CSMR_\text{c493} - CSMR_\text{c509} 

  + CSMR_\text{c493} * (1 - PAF_\text{c493}) * RR(i)_\text{c493}  

  + CSMR_\text{c509} * (1 - PAF_\text{c509}) * RR(i)_\text{c509}  

  + EMR(i)_\text{c426} * (1 - PAF_\text{c426}) * RR(i)_\text{c426}

Where, 

.. list-table:: Definitions
  :header-rows: 1

  * - Parameter
    - Definition
    - Note
  * - :math:`ACMR`
    - All cause mortality rate
    - 
  * - :math:`mr_i`
    - Mortality rate for an individual simulant
    - 
  * - :math:`CSMR_\text{c}`
    - Cause-specific mortality rate for cause c
    - Defined in the :ref:`lung cancer cause model document <2017_lung_cancer>` for lung cancer, below for COPD and IHD
  * - :math:`RR(i)_\text{c}`
    - Relative risk of a given cause for an individual simulant based on their smoking exposure
    - Defined in :ref:`the smoking risk effects documentation page <2017_risk_effect_smoking>` for lung cancer, COPD, and IHD
  * - :math:`PAF_\text{c}`
    - Population attributable fraction for smoking on mortality due to cause c
    - :math:`\frac{\overline{RR(i)_c} - 1}{\overline{RR(i)_c}}` (details in :ref:`the smoking risk effects page <2017_risk_effect_smoking>`)
  * - :math:`EMR(i)_\text{c426}`
    - Excess mortality rate of lung cancer for an individual simulant (based on cause model state)
    - Defined in the :ref:`lung cancer cause model document <2017_lung_cancer>`; use forecasted 2019 value
  * - c426
    - Lung cancer
    - 
  * - c496
    - Ischemic heart disease (IHD)
    - 
  * - c509
    - Chronic obstructive pulmonary disease (COPD)
    - 



Data Tables
++++++++++++++++++++++++++++++++

.. list-table:: Data Sources
   :header-rows: 1
   
   * - Measure
     - Value/Source
     - Notes
   * - :math:`csmr_\text{c509}`
     - /ihme/csu/swiss_re/forecast/509_deatjs_12_21.nc
     - 2020-2040, CSV file with same name also available. Use 'noised_forecast' column
   * - :math:`csmr_\text{c493}`
     - /ihme/csu/swiss_re/forecast/493_deaths_12_21.nc
     - 2020-2040, CSV file with same name also available. Use 'noised_forecast' column
   * - :math:`ACMR`
     - /ihme/csu/swiss_re/forecast
     - 2020-2040
   * - :math:`RR(i)_c`
     - Defined in :ref:`the smoking risk effects documentation page <2017_risk_effect_smoking>`
     - 

Validation Criteria
+++++++++++++++++++

The simulation output should replicate the cause-specific mortality rate of smoking affected causes as defined in the data tables. Additionally, GBD all cause mortality should be replicated in the simulation output. 

References
----------

.. [GBD-2017-YLD-Appendix-Cause-Model-Template]

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


.. [GBD-2017-CoD-Appendix-Cause-Model-Template]

   Pages ???-??? in `Supplementary appendix 1 to the GBD 2017 CoD Capstone <CoD
   appendix on ScienceDirect_>`_:

     **(GBD 2017 CoD Capstone)** GBD 2017 Causes of Death Collaborators.
     :title:`Global, regional, and national age-sex-specific mortality for 282
     causes of death in 195 countries and territories, 1980–2017: a systematic
     analysis for the Global Burden of Disease Study 2017`. Lancet 2018; 392:
     1736–88. DOI: http://dx.doi.org/10.1016/S0140-6736(18)32203-7

.. _CoD appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322037-mmc1.pdf
.. _CoD appendix on Lancet.com: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32203-7/attachment/5045652a-fddf-48e2-9a84-0da99ff7ebd4/mmc1.pdf

