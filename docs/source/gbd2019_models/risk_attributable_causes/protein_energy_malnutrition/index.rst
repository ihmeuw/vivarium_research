.. _2019_cause_pem:

===========================
Protein Energy Malnutrition
===========================

Protein-energy malnutrition (PEM) is an acute form of undernutrition. 
Undernutrition can take a variety of forms, including stunting (low height for 
age), wasting (low weight for height), underweight (low weight for age), and 
micronutrient deficiencies (a lack of key vitamins or minerals). PEM refers 
specifically to an acute (as opposed to chronic) disorder that results in 
wasting, and is classified as either marasmus, kwashiorkor, or some 
combination of these. These disorders are diagnosed by **clinical** 
findings, with oedema being the primary marker of kwashiorkor, distinguishing it 
from marasmus. [UpToDate-malnutrition]_ [WHO-Malnutrition]_ [Dipasquale-et-al]_

Marasmus is characterized by a low weight-for-height and reduced mid-upper arm 
circumference (MUAC). 

   "Marasmus is the most frequent syndrome of acute malnutrition. It is due 
   to inadequate energy intake over a period of months to years. It results from 
   the body’s physiologic adaptive response to starvation in response to severe 
   deprivation of energy and all nutrients, and is characterized by wasting of 
   body tissues, particularly muscles and subcutaneous fat, and is usually a 
   result of severe restrictions in energy intake. Children younger than five 
   years are the most commonly involved because of their increased caloric 
   requirements and increased susceptibility to infections." [Dipasquale-et-al]_

Signs and symptoms include: [UpToDate-malnutrition]_

  * Head that appears large relative to the body, with staring eyes

  * Emaciated and weak appearance
  
  * Irritable and fretful affect

  * Bradycardia, hypotension, and hypothermia

  * Thin, dry skin

  * Shrunken arms, thighs, and buttocks, with redundant skin folds caused by loss of subcutaneous fat

  * Thin, sparse hair

Kwashiorkor is characterized by symmetric peripheral pitting oedema that begins 
in the lower parts of teh body and moves upwards, often affecting the presacral 
area, genitalia, and periorbital area, with or without anasarca (severe 
generalized oedema). There is marked muscle atrophy with normal or even 
increased body fat. Malnutrition is considered severe if any oedema is present, 
regardless of other anthropometric values.

Other signs and symptoms include: 
[UpToDate-malnutrition]_

  * Apathetic, listless affect

  * Rounded prominence of the cheeks ("moon face")

  * Pursed appearance of the mouth

  * Thin, dry, peeling skin with confluent areas of hyperkeratosis and hyperpigmentation

  * Dry, dull, hypopigmented hair that falls out or is easily plucked

  * Hepatomegaly (from fatty liver infiltrates)

  * Distended abdomen with dilated intestinal loops

  * Bradycardia, hypotension, and hypothermia

  * Despite generalized edema, most children have loose inner inguinal skin folds

Systems with mis- or impaired function due to severe acute malnutrition include: 
cardiovascular, liver, kidney, gastrointestinal tract, immune, endocrine, 
central nervous system, metabolism, circulation, and skin. 
[UpToDate-malnutrition]_

Due to the breadth of organ systems affected by PEM, persons suffering from PEM 
are at increased risk for other micronutrient deficiencies, dehydration, 
infection, and sepsis. [PCRM-PEM]_

Marasmus is caused by inadequate intake of all nutrients, but particularly total 
calories. The particular cause or nutrient deficit responsible for oedematous 
malnutrition is still debated. [UpToDate-malnutrition]_

PEM is also categorized into severe acute malnutrition (SAM) and moderate acute malnutrition (MAM), typically defined in terms of weight-for-height scores, as follows:

.. list-table:: AM definitions
   :widths: 5 15
   :header-rows: 1

   * - Condition
     - Description
   * - MAM
     - WHZ < -2 but > -3 AND no oedema
   * - SAM
     - WHZ < -3 OR bilateral pitting oedema

GBD 2019 Modeling Strategy
--------------------------

Protein Energy Malnutrition (PEM) in GBD 2019
+++++++++++++++++++++++++++++++++++++++++++++

PEM is responsible for both fatal and nonfatal outcomes within the GBD 
framework. GBD maintains a cause of death model called "Nutritional 
deficiencies" that is split into *PEM* and *Other Nutritional Deficiencies* that 
estimates PEM mortality. Nonfatal PEM cases are modelled independently, using 
the case definition moderate and severe acute malnutrition, defined in terms of 
weight-for-height Z-scores (WHZ). All PEM cases are attributed to the GBD Child 
Growth Failure risk factor, which is not detailed here. We include specifics on 
the PEM cause models below. [GBD-2019-Capstone-Appendix-PEM]_, p789.


GBD runs a parent CODEm model to estimate deaths attributable to nutritional 
deficiency, using vital registration and verbal autopsy data as inputs. The 
applicable ICD codes are as follows: [GBD-2019-Capstone-Appendix-PEM]_

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
to fit the parent nutriional deficiency model. [GBD-2019-Capstone-Appendix-PEM]_

Note that as PEM is defined as "a lack of dietary protein and/or energy", it 
includes famines and severe droughts. These result in discontinuities in PEM 
estimation, which the GBD team accounts for. The appendix specifically mentions 
using the Tombstone report to estimate deaths due to the famine during the Great 
Leap Forward in the 1960s in China. [GBD-2019-Capstone-Appendix-PEM]_

GBD's nonfatal PEM model takes as its case definition "moderate and severe acute 
malnutrition", defined in terms of distance from the mean WHZ score given by the 
WHO 2006 growth standard for children. The relevant ICD 10 codes are E40-E46.9, 
E64.0, and ICD 9 codes are 260-263.9. PEM is partitioned into the following four 
sequelae: [GBD-2019-Capstone-Appendix-PEM]_

.. list-table:: Nonfatal PEM Sequelae
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

.. list-table:: Clinical definitions
  :widths: 5 10
  :header-rows: 1
  
  * - Condition
    - Estimated by GBD sequelae
  * - Kwashiorkor
    - {Moderate wasting with oedema} + {Severe wasting with oedema}
  * - Marasmus
    - {Severe wasting without oedema} + {Severe wasting with oedema}

The nonfatal estimation pipeline comprises five models:

.. list-table:: Nonfatal PEM sub-models
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
They used a remission rate of 0.25 - 1.25 (remitted cases of PEM per person-year 
of illness). Note this is a rather wide interval that allowed DisMod to choose a 
remission rate within the given bounds based on other input data. [GBD-2019-Capstone-Appendix-PEM]_

From the all-age model, they then derived (1) a prevalence:incidence ratio that 
was applied across all categories of non-fatal PEM, and (2) a moderate:severe 
wasting ratio for both under and over 5. [GBD-2019-Capstone-Appendix-PEM]_

.. todo::
  What do the modelers do with this mod:sev ratio? How do they get estimates for 5+?

The modelers then assumed that there is zero prevalence of oedema in anyone over 
5. [GBD-2019-Capstone-Appendix-PEM]_

Additionally, they calculated the fraction of wasting attributable to severe 
worm infestation and subtracted this out of all wasting, attributing the 
remainder to PEM. They assumed no oedema due to worms, and the 
prevalence:incidence ratio derived from the all-age PEM model. [GBD-2019-Capstone-Appendix-PEM]_

The modelers used child anthropometry data from health surveys, literature, 
and national reports, from which they estimate the WHZ SDs that correspond with 
the case definitions. They additionally used SMART datasets to estiamte the 
proportion under 5 with oedema. In the GBD 2019 Appendix, they note, "Future 
work in systematically evaluating longitudinal datasets on nutrition and growth 
failure will allow us to improve the empirical basis for PEM incidence 
estimates, including improved resolution for the component 
categories." [GBD-2019-Capstone-Appendix-PEM]_


Cause Hierarchy
+++++++++++++++

.. image:: pem_cause_hierarchy.svg

Restrictions
++++++++++++

Vivarium Modeling Strategy
--------------------------

Scope
+++++

Vivarium Modeling Strategy for Protein Energy Malnutrition (PEM)
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Assumptions and Limitations
+++++++++++++++++++++++++++

Assumptions
+++++++++++

Limitations
+++++++++++

Cause Model Diagram
-------------------

Data Description
----------------

State and Transition Data Tables
++++++++++++++++++++++++++++++++

.. list-table:: State Data
   :widths: 5 10 10 20
   :header-rows: 1

   * - State
     - Measure
     - Value
     - Notes
   * - MAM
     - disability weight
     - :math:`\frac{{\sum_{sequelae\in \text{MAM}}} \scriptstyle{\text{disability_weight}_s \times\ \text{prevalence}_s}}{{\sum_{sequelae\in \text{MAM}} \scriptstyle{\text{prevalence}_s}}}`
     - disability weight for MAM
   * - SAM
     - disability weight
     - :math:`\frac{{\sum_{sequelae\in \text{SAM}}} \scriptstyle{\text{disability_weight}_s \times\ \text{prevalence}_s}}{{\sum_{sequelae\in \text{SAM}} \scriptstyle{\text{prevalence}_s}}}`
     - disability weight for SAM


.. list-table:: Data Sources and Definitions
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
     - {s199, s2036}
     - Severe wasting with eodema, severe wasting without oedema

Note we pull the above sequelae by using:

.. code-block:: python

  from db_queries import get_sequela_metadata
  
  hierarchy_2019 = get_sequela_metadata(sequela_set_id=2, gbd_round_id=6, decomp_step="step4")
  hierarchy_2019.loc[(hierarchy_2019.cause_id==387)]


.. list-table:: Restrictions
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
     - 95 plus
     - age_group_id = 235

     
Validation Criteria
-------------------

References
----------

.. [Dipasquale-et-al]
    Dipasquale et al. Acute Malnutrition in Children:
    Pathophysiology, Clinical Effects and Treatment.
    Nutrients 2020, 12, 2413;
    doi:10.3390/nu12082413,
    https://www.mdpi.com/2072-6643/12/8/2413

.. [GBD-2019-Capstone-Appendix-PEM]
  Appendix to: `GBD 2019 Diseases and Injuries Collaborators. Global burden of
  369 diseases and injuries in 204 countries and territories, 1990–2019: a 
  systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 
  17 Oct 2020;396:1204-1222` 

.. [PCRM-PEM]
    Retrieved 25 June 2021.
    https://nutritionguide.pcrm.org/nutritionguide/view/Nutrition_Guide_for_Clinicians/1342068/all/Protein_Energy_Malnutrition

.. [UpToDate-malnutrition]
    Retrieved 25 June 2021.
    https://www-uptodate-com.offcampus.lib.washington.edu/contents/malnutrition-in-children-in-resource-limited-countries-clinical-assessment

.. [WHO-Malnutrition]
    Retrieved 25 June 2021.
    https://www.who.int/news-room/q-a-detail/malnutrition
    
