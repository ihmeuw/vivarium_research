.. _2019_cause_pem:

===========================
Protein Energy Malnutrition
===========================

GBD 2019 Modeling Strategy
--------------------------

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


Protein Energy Malnutrition (PEM) in GBD 2019
+++++++++++++++++++++++++++++++++++++++++++++

Cause Hierarchy
+++++++++++++++

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

Validation Criteria
-------------------

References
----------
.. [GBD-2019-Capstone-Appendix-PEM]
  Appendix to: `GBD 2019 Diseases and Injuries Collaborators. Global burden of
  369 diseases and injuries in 204 countries and territories, 1990–2019: a 
  systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 
  17 Oct 2020;396:1204-1222` 