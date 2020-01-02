.. _2017_cause_neonatal_sepsis:

=============================================
Neonatal sepsis and other neonatal infections
=============================================

Disease Description
-------------------

Case definition in GBD 2017
+++++++++++++++++++++++++++

Neonatal sepsis and other neonatal infections are infections during the neonatal
period that advance to a systemic bloodstream infection, the underlying cause of
which can be meningitis, gastroenteritis, or other aetiologies. Neonatal
pneumonia, however, is not included -- it is captured in the modelling of
pneumonia as a separate entity.

.. todo::

   Add more information and references. In particular, find data about differences in global and 
   gbd definitions, global prevalence and relation to folic acid during pregnancy.

Modeling Neonatal sepsis and other infections in GBD 2017
---------------------------------------------------------

It is worth noting that the ICD 10 and ICD 9 codes used in non-fatal and fatal GBD models are different 
[GBD-2017-YLD-Capstone-Appendix-1-Neonatal-sepsis-and-other-infections]_, [GBD-2017-CoD-Appendix-1-Neonatal-sepsis-and-other-infections]_. 

The codes used in both models can be found in the table below:

.. list-table:: Neonatal sepsis and other neonatal infections - ICD codes
   :widths: 5 5 5
   :header-rows: 1

   * - Model Type
     - Non-fatal model
     - Fatal model
   * - ICD 10
     - P36-P36.9, P38-P39.9
     - P36-P36.9, P38-P39.9
   * - ICD 10 used in Hospital/Claims Analyses
     - K29.0-K29.00, K29.1-K29.20, P36-P36.9, P38-P39.9, P77-P78.1
     - 
   * - ICD 9
     - 771, 771.4-771.89
     - 771.4-771.9
   * - ICD 9 used in Hospital/Claims Analyses
     - 535.0-535.00, 535.3-535.30, 771, 771.4-771.89, 777.5-777.7
     - 


.. todo::

   Add relevant details about neonatal sepsis and other infections modeling process from
   [GBD-2017-YLD-Capstone-Appendix-1-Neonatal-sepsis-and-other-infections]_ and from the 
   [GBD-2017-CoD-Appendix-1-Neonatal-sepsis-and-other-infections]_ Appendix.


Cause Hierarchy
+++++++++++++++

.. todo::
   Add hierarchy diagram.


Cause Model Diagram
-------------------

.. image:: neonatal_sepsis_cause_model.svg
   :alt: SI cause model diagram for neonatal sepsis and other infections


Data Description
----------------

.. list-table:: Definitions
   :widths: 5 5 20
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - Susceptible
     - Susceptible to neonatal sepsis and other infections
   * - I
     - Infected
     - Infected with neonatal sepsis and other infections


.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - S
     - prevalence
     - 1-prevalence_c383
     - 
   * - S
     - birth prevalence
     - 1-birth_prevalence_c383
     - 
   * - S
     - excess mortality rate
     - 0
     - 
   * - S
     - disabilty weights
     - 0
     -
   * - I
     - prevalence
     - prevalence_c383
     - 
   * - I
     - birth prevalence
     - birth_prevalence_c383
     - 
   * - I
     - excess mortality rate
     - :math:`\frac{\text{deaths_c383}}{\text{population} \times \text{prevalence_c383}}`
     - = (cause-specific mortality rate) / prevalence
   * - I
     - disability weights
     - :math:`\displaystyle{\sum_{s\in \text{sequelae_c383}}} \scriptstyle{\text{disability_weight}_s \,\times\, \text{prevalence}_s}`
     - = average disability weight over all sequelae
   * - ALL
     - cause specific mortality rate
     - :math:`\frac{\text{deaths_c383}}{\text{population}}`
     - 


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
     - incidence_rate_m1594
     - Incidence rate is estimated in dismod but does not exists in como.
       It is set to 0 after 27 days as by definition neonatal sepsis must occur within neonatal period (0-27 days) 
       [GBD-2017-YLD-Capstone-Appendix-1-Neonatal-sepsis-and-other-infections]_. 
   * - r
     - I
     - R
     - remission_rate_m1594
     - Remission rate is estimated in dismod based on the average case duration assumption of two weeks [GBD-2017-YLD-Capstone-Appendix-1-Neonatal-sepsis-and-other-infections]_. 


.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Measure
     - Sources
     - Description
     - Notes
   * - prevalence_c383
     - como
     - Prevalence of cause neonatal sepsis and other infections
     - 
   * - birth_prevalence_c383
     - como
     - Birth prevalence of cause neonatal sepsis and other infections
     -
   * - deaths_c383
     - codcorrect
     - Deaths from cause neonatal sepsis and other infections
     - 
   * - population
     - demography
     - Mid-year population for given age/sex/year/location
     - 
   * - sequelae_c383
     - gbd_mapping
     - List of 17 sequelae for neonatal sepsis and other infections. 
     - The sequela ids are in sequence from 1250 to 1266
   * - incidence_rate_m1594
     - dismod
     - Incidence rate for modelable entity, neonatal sepsis and other infections
     - 
   * - remission_rate_m1594
     - dismod
     - Remission rate for modelable entity, neonatal sepsis and other infections
     - 
   * - disability_weight_s{`sid`}
     - YLD appendix
     - Disability weight of sequela with id `sid`
     - 
   * - prevalence_s{`sid`}
     - como
     - Prevalence of sequela with id `sid`
     - 


Model Assumptions and Limitations
---------------------------------

.. todo::
   Add assumptions, limitations and restrictions.


Validation Criteria
-------------------

.. todo::

   Describe tests for model validation.



References
----------

.. [GBD-2017-YLD-Capstone-Appendix-1-Neonatal-sepsis-and-other-infections]
   Supplement to: `GBD 2017 Disease and Injury Incidence and Prevalence
   Collaborators. Global, regional, and national incidence, prevalence, and
   years lived with disability for 354 diseases and injuries for 195 countries
   and territories, 1990–2017: a systematic analysis for the Global Burden of
   Disease Study 2017. Lancet 2018; 392: 1789–858 <DOI for YLD Capstone_>`_
   (pp. 286-289)

   (Direct links to the YLD Appendix hosted on `Lancet.com <YLD appendix on Lancet.com_>`_ and `ScienceDirect <YLD appendix on ScienceDirect_>`_)

.. _YLD appendix on Lancet.com: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32279-7/attachment/6db5ab28-cdf3-4009-b10f-b87f9bbdf8a9/mmc1.pdf
.. _YLD appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322797-mmc1.pdf
.. _DOI for YLD Capstone: https://doi.org/10.1016/S0140-6736(18)32279-7

.. [GBD-2017-CoD-Appendix-1-Neonatal-sepsis-and-other-infections]
   Supplement to: `GBD 2017 Causes of Death Collaborators. Global, regional, and
   national age-sex-specific mortality for 282 causes of death in 195 countries
   and territories, 1980–2017: a systematic analysis for the Global Burden of
   Disease Study 2017. Lancet 2018; 392: 1736–88 <DOI for CoD Capstone_>`_
   (pp. 175-176)

   (Direct links to the CoD Appendix hosted on `Lancet.com <CoD appendix on Lancet.com_>`_ and `ScienceDirect <CoD appendix on ScienceDirect_>`_)

.. _CoD appendix on Lancet.com: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32203-7/attachment/5045652a-fddf-48e2-9a84-0da99ff7ebd4/mmc1.pdf
.. _CoD appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322037-mmc1.pdf
.. _DOI for CoD Capstone: http://dx.doi.org/10.1016/S0140-6736(18)32203-7


