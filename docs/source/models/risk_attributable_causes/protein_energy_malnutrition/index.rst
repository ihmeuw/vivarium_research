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



.. _2021_pem:

===============================================================
2021 Protein energy malnutrition risk-attributable cause model
===============================================================

.. contents::
  :local:

Overview
++++++++

This page contains information pertaining to the 2021 protein energy malnutrition (PEM)
risk-attributable cause model. The PEM cause model is 100% attributable to the 
child wasting risk factor. The child wasting risk exposure document for the 
:ref:`nutrition optimization simulation <2021_concept_model_vivarium_nutrition_optimization>`
can be :ref:`found here<2021_risk_exposure_wasting_state_exposure>`.

.. note::

  For information on the background of PEM and child wasting, see the 
  :ref:`2020 joint risk-cause model for wasting and PEM <2020_risk_exposure_wasting_state_exposure>`.

+-------------------------------------------------+
| List of abbreviations                           |
+=======+=========================================+
| AM    | Acute malnutrition                      |
+-------+-----------------------------------------+
| MAM   | Moderate acute malnutrtion              |
+-------+-----------------------------------------+
| SAM   | Severe acute malnutrition               |
+-------+-----------------------------------------+
| TMREL | Theoretical minimum risk exposure level |
+-------+-----------------------------------------+
| CGF   | Child growth failure composed of wasting|
|       | stunging and underweight                |
+-------+-----------------------------------------+
| PEM   | Protein energy malnutrition             |
+-------+-----------------------------------------+

Protein Energy Malnutrition in GBD 2019/2021
++++++++++++++++++++++++++++++++++++++++++++

PEM is responsible for both fatal and nonfatal outcomes within the GBD 
framework. GBD maintains a cause of death model called "Nutritional 
deficiencies" that is split into *PEM* and *Other Nutritional Deficiencies* that 
estimates PEM mortality. Nonfatal PEM cases are modelled independently, using 
the case definition moderate and severe acute malnutrition, defined in terms of 
weight-for-height Z-scores (WHZ). All PEM cases are attributed to the 
:ref:`GBD Child Growth Failure risk factor <risk_exposure_child_growth_failure>`. 
We include specifics on 
the PEM cause models below. [GBD-2019-Capstone-Appendix-Wasting]_, p789.

PEM Fatal Model
---------------

GBD runs a parent CODEm model to estimate deaths attributable to nutritional 
deficiency, using vital registration and verbal autopsy data as inputs. The 
applicable ICD codes are as follows: [GBD-2019-Capstone-Appendix-Wasting]_

.. list-table:: PEM CoD ICD-10 Codes
  :widths: 10 20
  :header-rows: 1
  
  * - GBD Cause
    - ICD-10 Code
  * - Protein-energy malnutrition
    - E40-E46.9 (Kwashiorkor, marasmus, specified and unspecified proteincalorie malnutrition)
  * - Other nutritional deficiencies
    - D51-D52.0 (vitamin B12 deficiency anaemia and folate deficiency anaemia)
  * - Other nutritional deficiencies
    - D52.8-D53.9 (other nutritional anaemias) 
  * - Other nutritional deficiencies
    - D64.3 (other sideroblastic anaemias)
  * - Other nutritional deficiencies
    - E51-E61.9 (thiamine, niacin, other B group vitamins, ascorbic acid, vitamin D, other vitamin, dietary calcium, dietary selenium, dietary zinc, and other nutrient element deficiencies)
  * - Other nutritional deficiencies
    - E63-E64.0 (other nutritional deficiencies and sequelae of protein-calorie malnutrition)
  * - Other nutritional deficiencies
    - E64.2-E64.9 (sequelae of vitamin C deficiency, rickets, other nutritional deficiencies, and unspecified nutritional deficiencies)
  * - Other nutritional deficiencies
    - M12.1-M12.19 (Kashin-Beck disease)
  * - Garbage code
    - D50, D50.0 and D50.9 (unspecified anaemia)

They then run (1) an under-5 PEM model, (2) a 5-and-over PEM model, and (3) an 
other nutritional deficiencies model. These models are scaled using CODCorrect 
to fit the parent nutritional deficiency model. [GBD-2019-Capstone-Appendix-Wasting]_

Note that as PEM is defined as "a lack of dietary protein and/or energy", it 
includes famines and severe droughts. These result in discontinuities in PEM 
estimation, which the GBD team accounts for. The appendix specifically mentions 
using the Tombstone report to estimate deaths due to the famine during the Great 
Leap Forward in the 1960s in China. [GBD-2019-Capstone-Appendix-Wasting]_

PEM Nonfatal Model
------------------
GBD's nonfatal PEM model takes as its case definition "moderate and severe acute 
malnutrition", defined in terms of distance from the mean WHZ score given by the 
WHO 2006 growth standard for children. The relevant ICD 10 codes are E40-E46.9, 
E64.0, and ICD 9 codes are 260-263.9. PEM is partitioned into the following four 
sequelae: [GBD-2019-Capstone-Appendix-Wasting]_

.. list-table:: Nonfatal PEM Sequelae 2019/2021
  :widths: 10 15 15 15 
  :header-rows: 1
  
  * - Sequela Name
    - WHZ range
    - Clinical description
    - Disability weights
  * - Moderate wasting without oedema
    - {WHZ_i | -3SD < WHZ_i < -2SD}
    - Asymptomatic
    - NA
  * - Moderate wasting with oedema
    - {WHZ_i | -3SD < WHZ_i < -2SD}
    - Is very tired and irritable and has diarrhoea
    - 0.051 (0.031–0.079)
  * - Severe wasting without oedema
    - {WHZ_i | WHZ_i < -3SD}
    - Is extremely skinny and has no energy.
    - 0.128 (0.082–0.183)
  * - Severe wasting with oedema
    - {WHZ_i | WHZ_i < -3SD}
    - Is very tired and irritable and has diarrhoea. Is extremely skinny and has no energy.
    - 0.051 (0.031–0.079); 0.128 (0.082–0.183). Applied multiplicatively.

These are mapped onto clinically-defined wasting states as follows:

.. list-table:: Clinical definitions 2019/2021
  :widths: 5 10
  :header-rows: 1
  
  * - Condition
    - Estimated by GBD sequelae
  * - Kwashiorkor
    - {Moderate wasting with oedema} + {Severe wasting with oedema}
  * - Marasmus
    - {Severe wasting without oedema} + {Severe wasting with oedema}

The above table represents GBD definitions. In the literature these definitions 
are highly debated, often defining marasmus as strictly "severe wasting without 
oedema".

The nonfatal estimation pipeline comprises five models:

.. list-table:: Nonfatal PEM sub-models 2019/2021
  :widths: 15 5 5
  :header-rows: 1
  
  * - Modeled entity
    - Age
    - Modeling software
  * - Prevalence of WHZ <-2SD
    - under-5
    - STGPR
  * - Prevalence of WHZ <-3SD
    - under-5
    - STGPR
  * - Proportion of WHZ <-2SD with oedema
    - under-5
    - DisMod
  * - Proportion of WHZ <-3SD with oedema
    - under-5
    - DisMod
  * - All WHZ <-2SD (PEM)
    - All ages
    - DisMod

For the all-age model, they set the duration of PEM to 9 months after consulting 
with nutrition experts. The current modelers (as of June 2021 no longer have 
documentation of these conversations, which took place sometime before 2015). 
They used a remission rate of 0.25 - 1.25 remitted cases of PEM per person-year 
of illness. Note this is a rather wide interval that allowed DisMod to choose a 
remission rate within the given bounds based on other input data. 
[GBD-2019-Capstone-Appendix-Wasting]_

From the all-age model, they then derived (1) a prevalence:incidence ratio that 
was applied across all categories of non-fatal PEM, and (2) a moderate:severe 
wasting ratio for both under and over 5. [GBD-2019-Capstone-Appendix-Wasting]_

The modelers then assumed that there is zero prevalence of oedema in anyone over 
5. [GBD-2019-Capstone-Appendix-Wasting]_

Additionally, they calculated the fraction of wasting attributable to severe 
worm infestation and subtracted this out of all wasting, attributing the 
remainder to PEM. They assumed no oedema due to worms, and the 
prevalence:incidence ratio derived from the all-age PEM model. [GBD-2019-Capstone-Appendix-Wasting]_

The modelers used child anthropometry data from health surveys, literature, 
and national reports, from which they estimate the WHZ SDs that correspond with 
the case definitions. They additionally used SMART datasets to estimate the 
proportion under 5 with oedema. In the GBD 2019 Appendix, they note, "Future 
work in systematically evaluating longitudinal datasets on nutrition and growth 
failure will allow us to improve the empirical basis for PEM incidence 
estimates, including improved resolution for the component 
categories." [GBD-2019-Capstone-Appendix-Wasting]_

Cause Hierarchy
---------------

.. image:: pem_cause_hierarchy.svg

Vivarium Modeling Strategy
++++++++++++++++++++++++++

.. list-table:: PEM parameters
   :widths: 5 10 10 20
   :header-rows: 1
  
   * - State
     - Measure
     - Value
     - Notes
   * - Wasting exposure cat2 (MAM)
     - disability weight
     - :math:`\frac{{\sum_{sequelae\in \text{MAM}}} \scriptstyle{\text{disability_weight}_s \times\ \text{prevalence}_s}}{{\sum_{sequelae\in xt{MAM}} \scriptstyle{\text{prevalence}_s}}}`
     - disability weight for MAM
   * - Wasting exposure cat1 (SAM)
     - disability weight
     - :math:`\frac{{\sum_{sequelae\in \text{SAM}}} \scriptstyle{\text{disability_weight}_s \times\ \text{prevalence}_s}}{{\sum_{sequelae\in \text{SAM}} \scriptstyle{\text{prevalence}_s}}}`
     - disability weight for SAM
   * - Wasting exposure cat3 and cat4
     - disability weight
     - 0
     - No disability in wasting cat3 or cat4
   * - Wasting exposure cat1 and cat2 (SAM and MAM)
     - excess mortality 
     - :math:`\frac{\text{deaths_c387}}{\text{population} \times \text{prevalence_c387}}`
     - death counts come from codcorrect
   * - wasting exposure cat3 and cat4
     - excess mortality rate
     - 0
     - No PEM deaths in wasting cat3 or cat4
   * - All
     - cause specific mortality
     - :math:`\frac{\text{deaths_c387}}{\text{population}}`
     - death counts come from codcorrect

.. todo::

  Determine the status of GBD 2021 PEM model and decide how to proceed. Remember that CIFF implementation used 2019 version.

.. note::
  
  The 2020 Codcorrect model for PEM is not yet completed. Check here on central machinary to see latest codcorrect modeling.
  https://hub.ihme.washington.edu/pages/viewpage.action?spaceKey=GBD2020&title=GBD+2020+CodCorrect+Tracking
 
  and here for scheduled finishing time (currently scheduled to complete on july 30th- 12July2021)
  https://hub.ihme.washington.edu/pages/viewpage.action?spaceKey=GBD2020&title=GBD+2020+Release+1+Computation


The following code can be used to access draw-level deaths for PEM

.. code-block:: python
    
  # GBD 2019 (this is the version we will use for PEM for now)

   get_draws(gbd_id_type = 'cause_id',
          gbd_id = [387], #pem
          source = "codcorrect",
          metric_id = 1, #counts
          measure_id = 1, #deaths
          location_id = [179],
          sex_id = [1,2],
          age_group_id = [4,5],
          gbd_round_id = 6,
          year_id  =2019,
          decomp_step = 'step5')


  # GBD 2020 (not fully formed)

  get_draws(gbd_id_type = 'cause_id',
          gbd_id = [387], #pem
          source = "codcorrect",
          metric_id = 1, #counts
          measure_id = 1, #deaths
          location_id = [179],
          sex_id = [1,2],
          age_group_id = [388,389,238,34],
          gbd_round_id = 7,
          year_id  = 2020,
          decomp_step = 'step3', #this is the latest decomp step,  will get updated
          version_id = 260) #this is the latest version, will get updated


.. list-table:: PEM Data Sources and Definitions
   :widths: 10 10 20 20
   :header-rows: 1

   * - Variable
     - Source
     - Description
     - Notes
   * - MAM sequelae
     - 
     - {s198, s2033}
     - Moderate wasting with eodema, moderate wasting without oedema
   * - SAM sequelae
     - 
     - {s2036, s199}
     - Severe wasting with eodema, severe wasting without oedema

.. note::
  
  The 2020 Como model for PEM is not yet completed, with only 100 draw. Check here on central machinary to see latest como modeling.
  https://hub.ihme.washington.edu/display/GBD2020/COMO+tracking


To pull PEM sequelae prevalence, use the following code

.. code-block:: python
 
 #GBD 2019

 get_draws(gbd_id_type = 'sequela_id',
          gbd_id = [198,2033,2036,199],
          source = "como",
          location_id = [179],
          sex_id = [1,2],
          age_group_id = [2,3,4,5],
          gbd_round_id = 6,
          decomp_step = 'step5')


 #GBD 2020 (currently only 100 draws)

  get_draws(gbd_id_type = 'sequela_id',
          gbd_id = [198,2033,2036,199],
          source = "como",
          location_id = [179],
          sex_id = [1,2],
          age_group_id = [2,3,388,389,238,34],
          gbd_round_id = 7,
          decomp_step = 'iterative')


  #as well as from db_queries

  from db_queries import get_sequela_metadata
  
  hierarchy_2019 = get_sequela_metadata(sequela_set_id=2, gbd_round_id=6, decomp_step="step4")
  hierarchy_2019.loc[(hierarchy_2019.cause_id==387)] #2019

.. list-table:: PEM Restrictions 2019
   :widths: 10 10 20
   :header-rows: 1

   * - Restriction type
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
     - Post Neonatal
     - age_group_id = 4
   * - YLL age group end
     - 95 plus
     - age_group_id = 235
   * - YLD age group start
     - Early Neonatal
     - age_group_id = 2
   * - YLD age group end
     - 95 Plus
     - age_group_id = 235

.. list-table:: PEM Restrictions 2021
   :widths: 10 10 20
   :header-rows: 1

   * - Restriction type
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
     - 1-5 months
     - age_group_id = 388
   * - YLL age group end
     - 95 plus
     - age_group_id = 235
   * - YLD age group start
     - Early Neonatal
     - age_group_id = 2
   * - YLD age group end
     - 95 Plus
     - age_group_id = 235

.. code-block:: python

  #age group id differences between 2019 and 2021

  #2021 age ids
  early nn = 2 
  late nn = 3
  1m-5m = 388   #2019 it was 4 = postneonatal
  6m-11m = 389  #2019 it was 4 = postneonatal
  12m-23m = 238 #2019 it was 5 = 1-5
  2y-4y = 34    #2019 it was 5 = 1-5

Validation 
++++++++++

All of the following should match expected values for the PEM model:

  - prevalence
  - ylds
  - csmr 
  - emr

References
++++++++++

