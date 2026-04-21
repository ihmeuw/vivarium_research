.. role:: underline
    :class: underline



..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  +++++++++++++++++++++
  
  Section Level 2 (#.#)
  ---------------------

  Section Level 3 (#.#.#)
  ~~~~~~~~~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.



.. _2021_pem_inpatient_sam_extension:

==========================================================================================================
2021 Wasting risk-attributable cause model: Extended for modeling Inpatient Treatment of Complicated SAM
==========================================================================================================

.. contents::
  :local:

Overview
++++++++

This page contains information pertaining to morbidity and mortality directly attributable to the child wasting risk factor. Note that this risk-attributable model has been extended beyond the scope of the :ref:`protein energy malnutrition risk-attributable cause <2021_pem>` used in the :ref:`original nutrition optimization child simulation model <2021_concept_model_vivarium_nutrition_optimization_children>` to support the modeling strategy of inpatient SAM treatment in the :ref:`nutrition optimization inpatient SAM extension simulation model <nutrition_optimization_extension>`. This modeling strategy was designed for the specific application in the N.O. inpatient SAM extension model and will not generalize to other use cases.

Modeling strategy
+++++++++++++++++

The following disability weights and excess mortality weights should apply to each wasting exposure state as detailed on the :ref:`wasting risk exposure with complicated SAM model document <2021_risk_exposure_wasting_with_complicated_sam>`. We have suggested cause nomenclature in the table below for consistency with prior implementation, but the choice is arbitrary and we can deviate from it if desired. 

.. list-table:: State data
  :header-rows: 1

  * - Wasting state
    - Cause name
    - Disability weight
    - Excess mortality rate
    - Note
  * - cat4 (susceptible to child wasting), cat3 (mild childwasting), cat2_better (better MAM), cat2_worse (worse MAM)
    - other_protein_energy_malnutrition
    - 0
    - mort_rate_other_causes
    - 
  * - cat1_uncomplicated
    - uncomplicated_severe_protein_energy_malnutrition
    - * First pass value: 0
      * Eventual value if time allows: DW_uncomplicated_sam
    - mort_rate_uncomplicated_sam
    - 
  * - cat1_complicated
    - complicated_severe_protein_energy_malnutrition
    - * First pass value: 0
      * Eventual value if time allows: severe_wasting_and_oedema
    - mort_rate_complicated_sam
    - For simplicity, assumed all complicated SAM cases have DW corresponding with severe wasting and oedema

.. list-table:: Restrictions
  :header-rows: 1

  * - Restriction
    - Value
    - Note
  * - Age start
    - 1 month 
    - 
  * - Age end
    - 5 years
    - 
  * - Male only
    - False
    - 
  * - Female only
    - False
    -
  * - YLD only
    - False
    - 
  * - YLL only
    - * First pass: True (set all disability weights equal to zero for simplicity)
      * Final pass (as time allows): False
    - Note that simulation implementation should ideally set this value to False to preseve future functionality for non-zero disability weights

.. list-table:: Parameter values
  :header-rows: 1

  * - Parameter
    - Definition
    - Value
    - Note
  * - mort_rate_complicated_sam
    - Annual mortality rate due to all causes among complicated SAM population
    - Use value in custom data file linked on the :ref:`wasting exposure document <2021_risk_exposure_wasting_with_complicated_sam>`
    - Represents mortality due to all causes. Age start for this cause should be 1-5 month age group, but if data is needed for neonatal age groups, fill with zeros
  * - mort_rate_uncomplicated_sam
    - Annual mortality rate due to all causes among uncomplicated SAM population
    - Use value in custom data file linked on the :ref:`wasting exposure document <2021_risk_exposure_wasting_with_complicated_sam>`
    - Represents mortality due to all causes. Age start for this cause should be 1-5 month age group, but if data is needed for neonatal age groups, fill with zeros
  * - mort_rate_other_causes
    - Annual mortality rate due to causes other than diarrheal diseases, lower respiratory infections, malaria, measles, or malaria among non-SAM states
    - Use value in custom data file linked on the :ref:`wasting exposure document <2021_risk_exposure_wasting_with_complicated_sam>`
    - Represents mortality due to causes other than modeled infectious diseases in non-SAM states. Age start for this cause should be 1-5 month age group, but if data is needed for neonatal age groups, fill with zeros
  * - prevalence_{wasting state}
    - Prevalence of a given wasting state
    - Defined on the :ref:`wasting exposure document <2021_risk_exposure_wasting_with_complicated_sam>`
    - 
  * - csmr_pem
    - Population-level cause-specific mortality rate for PEM/wasting risk-attributable cause
    - mort_rate_complicated_sam * prevalence_cat1_complicated + mort_rate_uncomplicated_sam * prevalence_cat1_uncomplicated + mort_rate_other_causes * (prevalence_cat2.5_better + prevalence_cat2.0_worse + prevalence_cat3 + prevalence_cat4)
    - Age start for this cause should be 1-5 month age group, but if data is needed for neonatal age groups, fill with zeros
  * - DW_severe_wasting
    - Disability weight of severe wasting
    - 0.128 (0.082–0.183)
    - Not needed for first pass 
  * - DW_oedema
    - Disability weight of oedema
    - 0.051 (0.031–0.079)
    - Not needed for first pass 
  * - prev_s199
    - Prevalence of severe wasting without oedema
    - ``get_draws(release_id=9, year_id=2021, gbd_id_type='sequela_id', gbd_id=199, measure_id=5, source='como')``
    - Not needed for first pass 
  * - prev_s198
    - Prevalence of moderate wasting with oedema
    - ``get_draws(release_id=9, year_id=2021, gbd_id_type='sequela_id', gbd_id=198, measure_id=5, source='como')``
    - Not needed for first pass 
  * - DW_uncomplicated_sam
    - Overall disability weight of uncomplicated SAM
    - DW_severe_wasting * prev_s199 / (prev_s199 + prev_s198) + DW_oedema * prev_s198 / (prev_s199 + prev_s198)
    - Not needed for first pass. 

      We make the simplifying assumption that uncomplicated SAM has no cases with concurrent severe wasting and oedema (these cases are assumed to be complicated SAM) and that the ratio of cases with moderate wasting and oedema to cases of severe wasting without oedema within uncomplicated SAM is equal to the ratio of these two sequelae in GBD.
  * - DW_severe_wasting_and_oedema
    - Disability weight of concurrent severe wasting and oedema
    - 1 - (1 - DW_severe_wasting) * (1 - DW_oedema)
    - Not needed for first pass 


Validation 
++++++++++

As a verification, EMRs of for the wasting-attributable cause model should match input data

As a verification, ACMR at the population level should match GBD expectation.

Once YLDs due to PEM are included: As a validation, YLDs due to the wasting-attributable cause model should be similar in magnitude to YLDs due to PEM.

References
++++++++++

