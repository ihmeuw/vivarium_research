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

PEM is responsible for both fatal and nonfatal outcomes within the GBD 
framework. GBD maintains a cause of death model called "Nutritional 
deficiencies" that is split into *PEM* and *Other Nutritional Deficiencies* that 
estimates PEM mortality. Nonfatal PEM cases are modelled independently, using 
the case definition moderate and severe malnutrition, defined in terms of 
weight-for-height Z-scores (WHZ). All PEM cases are attributed to the GBD Child 
Growth Failure risk factor.

.. todo::
   
   Finish filling in details


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

.. [Dipasquale-et-al]
    Dipasquale et al. Acute Malnutrition in Children:
    Pathophysiology, Clinical Effects and Treatment.
    Nutrients 2020, 12, 2413;
    doi:10.3390/nu12082413,
    https://www.mdpi.com/2072-6643/12/8/2413

.. [PCRM-PEM]
    Retrieved 25 June 2021.
    https://nutritionguide.pcrm.org/nutritionguide/view/Nutrition_Guide_for_Clinicians/1342068/all/Protein_Energy_Malnutrition

.. [UpToDate-malnutrition]
    Retrieved 25 June 2021.
    https://www-uptodate-com.offcampus.lib.washington.edu/contents/malnutrition-in-children-in-resource-limited-countries-clinical-assessment

.. [WHO-Malnutrition]
    Retrieved 25 June 2021.
    https://www.who.int/news-room/q-a-detail/malnutrition
    

