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
pneumonia, however, is not included -- it is captured in our modelling of
pneumonia as a separate entity.

.. todo::
   Describe cause model
   

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