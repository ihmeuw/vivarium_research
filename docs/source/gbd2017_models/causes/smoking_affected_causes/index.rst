.. _2017_smoking_affected_causes:

===============================================
Smoking Affected Causes (Excluding Lung Cancer)
===============================================

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

Disease Overview
----------------

Mortality among smokers is much higher than mortality among non-smokers. Therefore, it can be important to consider increased mortality attributable to smoking when smoking is included in a model, even if specific causes affected by smoking are not necessary to explicitly include in the model. See the causal framework section in the :ref:`Vivarium CSU Lung Cancer Screening Concept Model Documentation <2017_concept_model_vivarium_swissre_lungcancer>` for an example of when this is important.

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

The Vivarium modeling strategy outlined in this document will be a **mortality only** model that combines several causes within GBD. This cause is intended to be modeled as a outcome pair with the smoking risk factor.

Assumptions and Limitations
+++++++++++++++++++++++++++

.. todo::

	List assumptions and limitations

Cause Model Diagram
+++++++++++++++++++

There is no cause model diagram for this cause model because it is a mortality-only model. Mortality using should be modeled as follows:

.. math::

	mr_i = ACMR - CSMR_\text{SACs} + CSMR_\text{SACs} * (1 - PAF) * RR_i - \sum_{c}^{n} CSMR_c + \sum_{c}^{n} EMR(i)_c

.. note:: 

	Prior to implementation of the smoking risk factor, use the following equation:

	:math:`mr_i = ACMR - \sum_{c}^{n} CSMR_c + \sum_{c}^{n} EMR(i)_c`

Where, 

.. list-table:: Definitions
	:header-rows: 1

	* - Parameter
	  - Definition
	  - Note
	* - :math:`mr_i`
	  - Mortality rate for an individual simulant
	  - 
	* - :math:`ACMR`
	  - All cause mortality rate
	  - 
	* - :math:`CSMR_\text{SACs}`
	  - Cause-specific mortality rate for smoking-affected causes
	  - Defined in the data tables below
	* - :math:`PAF`
	  - Population attributable fraction for smoking on smoking affected causes
	  - Will be defined in the :ref:`smoking risk effects document <2017_risk_effect_smoking>`
	* - :math:`RR_i`
	  - Relative risk of mortality due to smoking-affected causes for an individual based on smoking exposure
	  - Will be defined in the :ref:`smoking risk effects document <2017_risk_effect_smoking>`
	* - :math:`\sum_{c}^{n} CSMR_c`
	  - Sum of cause-specific mortality rates for all other modeled causes
	  - 
	* - :math:`\sum_{c}^{n} EMR(i)_c`
	  - Sum of excess mortaltiy rates for all other modeled causes, based on the simulant's cause model state
	  - 

Then, if it is determined that a simulant dies in a given time-step based on the simulant's mortality hazard, :math:`mr_i`, then the probability that the death was due to a given cause should be represented as follows:

.. list-table:: Causes of death likelihoods
	:header-rows: 1

	* - Cause of death
	  - Probability
	  - Note
	* - Smoking-affected causes
	  - :math:`\frac{CSMR_\text{SACs} * (1 - PAF) * RR_i}{mr_i}`
	  - Prior to smoking RF implementation: :math:`\frac{CSMR_\text{SACs}}{mr_i}`
	* - Other modeled cause
	  - :math:`\frac{EMR(i)_c}{mr_i}`
	  - Repeated for additional modeled causes
	* - Other (unmodeled) causes
	  - :math:`\frac{ACMR - CSMR_\text{SACs} - CSMR_\text{other modeled cause 1}}{mr_i}`
	  - 

Data Tables
++++++++++++++++++++++++++++++++

.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - ALL
     - cause specific mortality rate
     - :math:`\frac{\sum_{cid=1}^{cid=n} deaths_\text{cid}}{\text{population}}`
     - For all cids in [297, 322, 411, 414, 474, 417, 423, 429, 432, 441, 444, 447, 450, 456, 471, 487, 493, 495, 496, 497, 500, 501, 502, 509, 520, 515, 527, 534, 543, 544, 546, 976, 627]

.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Measure
     - Sources
     - Description
     - Notes
   * - :math:`deaths_\text{cid}`
     - codcorrect
     - Deaths from cause
     - For causes with restrictions (Sex: 432, Age: 500, 502, 543, 544, 546), death data may not be available for certain age/sex groups. In this case assume :math:`deaths_\text{cid} = 0`
   * - :math:`population`
     - demography
     - Mid-year population for given age/sex/year/location
     - 

Validation Criteria
+++++++++++++++++++

The simulation output should replicate the cause-specific mortality rate of smoking affected causes as defined in the data tables. Additionally, GBD all cause mortality should be replicated in the simulation output. Additional validation based on the incorporation of the smoking risk factor will be detailed in the :ref:`smoking risk effects documentation <2017_risk_effect_smoking>`. 

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

