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



.. _2020_risk_exposure_wasting_state_exposure:

=======
Wasting
=======

.. contents::
  :local:

Overview
++++++++

This page contains information pertaining to the joint risk-cause wasting model. 
We note that this model is built on the GBD 2020 risk exposure model for wasting, and the 
GBD 2020 protein energy malnutrition (PEM) cause model. GBD stratifies wasting 
into four categories: TMREL, mild, moderate, and severe wasting. All PEM cases 
are attributed to moderate and severe wasting, making PEM a PAF-of-1 model. Under the GBD framework, wasting is additionally a risk for measles, diarrheal diseases, and lower respiratory infections. These relationships are detailed under a risk effects page for wasting.

.. todo::
  Link to more info on PAF-of-1 models. Does this exist?

.. todo::
  Link to risk effects page for wasting.

In the sections that follow we describe wasting and PEM: both as understood by
the literature, and in the context of GBD 2020. We then include information on 
how we will model wasting and PEM in vivarium for the CIFF-SAM project.



+-------------------------------------------------+
| List of abbreviations                           |
+=======+=========================================+
| AM    | acute malnutrition                      |
+-------+-----------------------------------------+
| MAM   | moderate acute malnutrtion              |
+-------+-----------------------------------------+
| SAM   | Severe acute malnutrition               |
+-------+-----------------------------------------+
| TMREL | theoretical minimum risk exposure level |
+-------+-----------------------------------------+
| CGF   | child growth failure composed of wasting|
|       | stunging and underweight                |
+-------+-----------------------------------------+
| DD    | Diarrheal disease                       |
+-------+-----------------------------------------+
| LRI   | lower respiratory tract infection       |
+-------+-----------------------------------------+
| MSLS  | measles                                 |
+-------+-----------------------------------------+
| PEM   | protein energy malnutrition             |
+-------+-----------------------------------------+


Wasting background
++++++++++++++++++

Malnutrition is an imbalance between the body’s needs and its use and intake of
nutrients. The imbalance can be caused by poor or lacking diet, poor hygiene, 
disease states, lack of knowledge, and cultural practices, among others. 
Underweight, stunting, wasting, obesity, and vitamin and mineral deficiencies 
are all forms of malnutrition. 

**Acute malnutrition (AM)**, also referred to as wasting, is recent rapid weight 
loss or a failure to gain weight that results from illness, lack of appropriate
foods, or other underlying causes. Wasting is mostly typically classified in 
terms of a weight-for-height z-score. Other forms of under or malnutrition 
include stunting (low height for age), underweight (low weight for age), and 
micronutrient deficiencies (a lack of key vitamins or minerals).

For an individual, AM is not a chronic condition: children with AM either 
recover or die and recovered children can relapse to AM. It is measured in 
weight-for-height z-scores (WFH) which is a comparison of a child’s WFH from 
the median value of the global reference population. A z-score between -2 to 
-3 indicates moderate acute malnutrition (MAM) and a z-score below -3 indicate 
severe acute malnutrition (SAM). WHZ z-scores range from -7 to +7. Although MAM 
is less severe, it affects a greater number of children and is associated with 
more nutrition-related deaths than SAM. 

Protein-energy malnutrition (PEM) is defined to be moderate or severe acute 
malnutrition, and takes the form of either marasmus, kwashiorkor, or marasmic 
kwashiorkor. These conditions are diagnosed by **clinical** findings, with 
oedema being the primary marker of kwashiorkor. We note that the precise 
definitions of Marasmus and Kwashiorkor are debated: Kwashiorkor is typically 
defined to be any form of wasting with oedema, but definitions of Marasmus 
include (1) WHZ score :math:`i<3`, and (2) WHZ score :math:`i<3` and NO oedema. 
We include a further clinical details below. [UpToDate-malnutrition]_ 
[WHO-Malnutrition]_ [Dipasquale-et-al]_

Marasmus is characterized by a low weight-for-height and reduced mid-upper arm 
circumference (MUAC). Signs and symptoms include: [UpToDate-malnutrition]_

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
regardless of other anthropometric values. Other signs and symptoms include: 
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

Children with acute malnutrition are at greater risk of death from diarrhea and 
other infectious diseases than well-nourished children. They also face greater 
risk of morbidity from infectious diseases and delayed physical and cognitive 
development. AM tends to peak during seasonal hunger, disease outbreaks, or 
during food security ‘shocks’ (e.g. economic or climatic crises) and stresses 
including humanitarian crises. However, AM is a problem that not only occurs in 
emergencies, but also can be endemic in development contexts. When untreated, 
MAM can deteriorate to SAM and possible death. Furthermore, evidence is emerging 
that repeated episodes of MAM can have a significant impact on stunting; 
prevention of wasting could potentially increase height in children. 


Wasting Exposure in GBD 2020
++++++++++++++++++++++++++++

Case definition
---------------

Wasting, a sub-component indicator of child growth failure (CGF), is based on a categorical definition using the WHO 2006 growth standards for children 0-59 months. Definitions are based on Z-cores from the growth standards, which were derived from an international reference population. Mild, moderate and severe categorical prevalences were estimated for each of the three indicators. Theoretical minimum risk exposure level (TMREL) for wasting was assigned to be greater than or equal to one standard deviation below the mean (-1 SD) of the WHO 2006 standard weight-for-height curve. This has not changed since GBD 2010.

+----------------------------------------------+
| Wasting category definition (range -7 to +7) |
+=======+======================================+
| TMREL |  >= -1                               |            
+-------+--------------------------------------+
| MILD  |  < -1 to -2 Z score                  |
+-------+--------------------------------------+
| MAM   |  < -2 to -3 Z score                  |
+-------+--------------------------------------+
| SAM   |  < -3 Z score                        |
+-------+--------------------------------------+

Input data
----------

Two types of input data are used in CGF estimation:  

  1. **Tabulated report data**. This data does not report individual anthropometric measurements. It only reports the prevalence of forms of CGF in a sample size. For example, this data would may report a 15% prevalence of moderate stunting out of a nationally representative sample of 5,000 children.

  2. **Microdata**. This data does have individual anthropometric measurements. From these datasources, GBD can see entire distributions of CGF, while also collapsing them down to point prevalences like moderate and severe CGF. 

Exposure estimation
------------------- 

In modeling CGF, all data types go into ST-GPR modeling. We have STGPR models for moderate, severe, and mean stunting, wasting, and underweight. The output of these STGPR models is an estimate of moderate, severe, and mean stunting, wasting, and underweight for all under 5 age groups, all locations, both sexes, and all years. 

We also take the microdata sources and fit ensemble distributions to the shapes of the stunting, wasting, and underweight distributions. By doing this we can find characteristic shapes of stunting, wasting, and underweight curves. Once we have ST-GPR output as well as weights that define characteristic curve shapes, the last step is to combine them. We anchor the curves at the mean output from ST-GPR, use the curve shape from the ensemble distribution modeling, and then use an optimization function to find the standard deviation value that allows us to stretch/shrink the curve to best match the moderate and severe CGF estimates we got from ST-GPR. The final CGF estimates are the area under the curve for this optimized curve.

Note that the z-score ranges from -7 to +7. If we limit ourselves to Z-scores between -4 and +4, we will be excluding a lot of kids.

.. note::
  In the paper that Ryan (GBD modeller for CGF and LWBSG) is working on right now, he presents the first results ever for "extreme" stunting which we define as kids with stunting Z scores below -4. For Ethiopia, that's about 7% of kids. So it's non-trivial!


Outcomes affected by wasting
----------------------------

CGF burden does not start until *after* neonatal age groups (from 1mo onwards). In the neonatal age groups (0-1mo), burden comes from LBWSG. From post-neonatal (1mo+) age onwards, CGF outcomes affected include lower-respiratory disease (LRI), diarrheal disease (DD), measles, and protein energy malnutrition (PEM). The literature on interventions for wasting target age groups 6mo onwards. This coincides with the timing of supplementary food introduction. Prior to 6mo, interventions to reduce DALYs focus on breastfeeding and reduction of LBWSG. 


Protein Energy Malnutrition in GBD 2020
+++++++++++++++++++++++++++++++++++++++

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
---------------

.. image:: pem_cause_hierarchy.svg


Vivarium Modeling Strategy
++++++++++++++++++++++++++

.. image:: vivarium_wasting_model.svg

We will model wasting in four compartments: TMREL, Mild, Moderate, and Severe.
In a given timestep a simulant will either stay put, transition to an adjacent 
wasting category, or die. In this case of "CAT 1: severe wasting", simulants can 
also transition to "CAT 3: Mild wasting" via a treatment arrow, t1.

We will use the GBD 2020 wasting and PEM models to inform this model, in 
addition to data found in the literature. We will derive the remaining 
transition rates from a Markov chain model, described in further detail below.

Assumptions and Limitations
---------------------------

Describe the clinical and mathematical assumptions made for this cause model,
and the limitations these assumptions impose on the applicability of the
model. Describe why a Markov chain assumption is flawed (remission / incidence
isn't constant over time / memoryless).

Restrictions
------------

.. list-table:: GBD 2020 Risk Exposure Restrictions
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
   * - Age group start
     -
     -
   * - Age group end
     -
     -

..	todo::

	Determine if there's something analogous to "YLL/YLD only" for this section

Markov chain model
------------------

Finite state machine 1x4 + death
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. image:: wasting_state_1x4_plus_death.svg

This Markov model comprises 5 compartments: four wasting categories, plus CAT 0.
Because we need simulants to die at a higher rate out of CAT 1 than CAT 2, 3, or
the TMREL, it is necessary to include death to correctly derive our transition 
rates. Thus we allow simulants to die into CAT 0. However, because we need to 
assume equilibrium of our system over time, we allow simulants to "age in" to 
CATs 1-4, out of CAT 0. We thus set the transition probabilies :math:`f_i` equal 
to the prevalence of the four wasting categories, obtained from GBD. 

It is important here to note first that :math:`f_i` don't represent fertility rates: 
rather, if :math:`k_i` sims died in timestep :math:`k`, we allow :math:`k_i` sims to
age in in timestep :math:`k+1`, to replenish those that died. Second, we 
emphasize that we utilize this method in order to calculate transition 
probabilities between the different wasting categories. However, the final 
Vivarium model of wasting will not include a reincarnation pool.

Here we include equations for the transition probabilities, and in the section 
that follows we will detail how to calculate all the variables used

.. list-table:: Wasting transition probability equations
   :widths: 5 15 20
   :header-rows: 1

   * - Variable
     - Equation
     - Description
   * - s1
     - (dur_cat1 - 1)/dur_cat1
     - Probability of remaining in cat1 (SAM)
   * - s2
     - (dur_cat2 - 1)/dur_cat2
     - Probability of remaining in cat2 (MAM)
   * - s3
     - (dur_cat3 - 1)/dur_cat3
     - Probability of remaining in cat3 (Mild wasting)
   * - s4
     - -ap0*f2/ap4 - ap0*f4/ap4 - ap2*d2/ap4 - d4 + (ap0*dur_cat1*dur_cat2*dur_cat3 - ap1*dur_cat2*dur_cat3 + ap2*dur_cat1*dur_cat3 - ap3*dur_cat1*dur_cat2 + ap4*dur_cat1*dur_cat2*dur_cat3)/(ap4*dur_cat1*dur_cat2*dur_cat3)
     - Probability of remaining in cat4 (wasting TMREL)
   * - r2
     - ap2*d2/ap1 + ap3*d3/ap1 + ap4*d4/ap1 + (-ap0*dur_cat1 + ap1)/(ap1*dur_cat1)
     - Remission probability into cat2 (MAM)
   * - r3
     - -ap0*f2/ap2 - ap0*f3/ap2 - ap0*f4/ap2 - d2 + (ap0*dur_cat1*dur_cat2 - ap1*dur_cat2 + ap2*dur_cat1)/(ap2*dur_cat1*dur_cat2)
     - Remission probability into cat3 (Mild wasting)
   * - r4
     - ap0*f2/ap3 + ap2*d2/ap3 + ap4*d4/ap3 + (-ap0*dur_cat1*dur_cat2*dur_cat3 + ap1*dur_cat2*dur_cat3 - ap2*dur_cat1*dur_cat3 + ap3*dur_cat1*dur_cat2)/(ap3*dur_cat1*dur_cat2*dur_cat3)
     - Remission probability into cat4 (wasting TMREL)
   * - i1
     - ap0*f2/ap2 + ap0*f3/ap2 + ap0*f4/ap2 + (-ap0*dur_cat1 + ap1)/(ap2*dur_cat1)
     - Incidence probability into cat1 (SAM)
   * - i2
     - -ap0*f2/ap3 - ap2*d2/ap3 - d3 - ap4*d4/ap3 + (ap0*dur_cat1*dur_cat2 - ap1*dur_cat2 + ap2*dur_cat1)/(ap3*dur_cat1*dur_cat2)
     - Incidence probability into cat2 (MAM)
   * - i3
     - ap0*f2/ap4 + ap0*f4/ap4 + ap2*d2/ap4 + (-ap0*dur_cat1*dur_cat2*dur_cat3 + ap1*dur_cat2*dur_cat3 - ap2*dur_cat1*dur_cat3 + ap3*dur_cat1*dur_cat2)/(ap4*dur_cat1*dur_cat2*dur_cat3)
     - Incidence probability into cat3 (Mild wasting)


in terms of the following variables:

.. list-table:: Variables for transition probabilities
   :widths: 10 10 10 10
   :header-rows: 1

   * - Variable
     - Description
     - Equation
     - Notes
   * - :math:`d_i` for :math:`i\in \{1,2\}`
     - Death probability out of MAM (cat 2) or SAM (cat 1)
     - :math:`acmr + (\sum_{c\in diar,lri,msl} emr_c*prevalence_{ci} - csmr_{c})` :math:`+ emr_{pem}*1 - csmr_{pem}`
     - 
   * - :math:`d_i` for :math:`i\in \{3,4\}`
     - Death probability out of Mild wasting (cat 3) or wasting TMREL (cat 4)
     - :math:`acmr + (\sum_{c\in diar,lri,msl} emr_c*prevalence_{ci} - csmr_{c})`
     -
   * - :math:`f_i`
     - "Age-in" probability into :math:`cat_i`
     - Prevalence of wasting category i, pulled from GBD
     - These probabilities were chosen to maintain equilibrium of our system
   * - :math:`ap_0`
     - Adjusted prevalence of :math:`cat_0` (the reincarnation pool)
     - 1 - exp(-acmr * 1 / 365)
     - We set this equal to the number of simulants that die each time step
   * - :math:`ap_i` for :math:`i\in \{1,2,3,4\}`
     - Adjusted prevalence of :math:`cat_i`
     - :math:`f_i/(ap_0 + 1)`
     - All category "prevalences" are scaled down, such that the prevalence of cat 0 (the reincarnation pool) and the prevalences of the wasting categories sum to 1
   * - :math:`duration\_cat_i`
     - Average duration of :math:`cat_i`
     - (!temporary) cat_1:60 days, cat2:80 days, cat3:365 days
     -


.. list-table:: Calculations for variables in transition equations
   :widths: 6 10 10
   :header-rows: 1

   * - Variable
     - Description
     - Equation
   * - :math:`prevalence_{ci}`
     - The prevalence of cause c among wasting category i
     - :math:`incidence_{ci} * duration_c`
   * - :math:`duration_c`
     - The average duration of cause c
     - 10 days (for measles, diarrhea, and lri)
   * - :math:`incidence_{ci}`
     - incidence probability of cause c among wasting category i
     - :math:`incidence_{c}*(1-paf_{c})*rr_{ci}`
   * - :math:`incidence_c`
     - population-level incidence probability of cause c 
     - Pulled from GBD
   * - :math:`paf_{c}`
     - The PAF of cause c attributable to wasting
     - :math:`\frac{(\sum_{i} prevalence_{i} * rr_{ci})-1}{\sum_{i} prevalence_{i} * rr_{ci}}`
   * - :math:`rr_{ci}`
     - The relative risk for incidence of cause c given wasting category i
     -
   * - :math:`prevalence_{i}`
     - the prevalence of wasting category i 
     - Pulled from GBD
   * - :math:`acmr`
     - All-cause mortality probability
     - Pulled from GBD
   * - :math:`emr_c`
     - Excess mortality probability of cause c
     - Pulled from GBD
   * - :math:`csmr_c`
     - Cause-specific mortality rate of cause c
     - Pulled from GBD

We now detail how the above wasting probability transition equations were derived.

.. todo::
  Consider adding all code for calculating above eqns.


We solve our transition probabilities using a 
Markov Chain transition matrix **T**. 

T = 

.. csv-table:: 
   :file: wasting_state_1x4_death.csv
   :widths: 5, 5, 5, 5, 5, 5


:math:`π_{T}` = 

+----+----+----+----+----+
| p4 | p3 | p2 | p1 | p0 |
+----+----+----+----+----+

:math:`π_{T}` is the eigenvector at equilibrium

  a) :math:`π_{T}\times\text{T} = π_{T}` (the T means transposed, this is a 1 row vector)
  b) :math:`\sum_{\text{i=p}}` = :math:`π_{T}`
  c) :math:`π_{i}` ≥ 0 , these are GBD 2020 age/sex/location/year-specific prevalence for wasting categories 1-4, plus :math:`p0`, which will equal the number of sims who die in a timestep


Solving a)

  1)  :math:`ap_4s_4 + ap_3r_4 + ap_0f_4 = ap_4` 
  2)  :math:`ap_4i_3 + ap_3s_3 + ap_2r_3 + ap_0f_3 = ap_3`
  3)  :math:`ap_3i_2 + ap_2s_2 + ap_1r_2 + ap_0f_2 = ap_2`
  4)  :math:`ap_2i_1 + ap_1s_1 + ap_0f_1 = ap_1`
  5)  :math:`ap_4d_4 + ap_3d_3 + ap_2d_2 + ap_1d_1=ap_0`

Rows of the P matrix sums to 1

  6)  :math:`s_4 + i_3 + d-4 = 1`
  7)  :math:`r_4 + s_3 + i_2 + d_3 = 1`
  8)  :math:`r_3 + s_2 + i_1 + d_2 = 1`
  9)  :math:`r_2 + s_1 + d_1 = 1`
  10) :math:`f_4+f_3+f_2+f_1=1`


.. code-block:: python

  import numpy as np, pandas as pd
  import sympy as sym
  from sympy import symbols, Matrix, solve, simplify

  # define symbols
  s4, i3 = symbols('s4 i3')
  r4, s3, i2 = symbols('r4 s3 i2')
  r3, s2, i1 = symbols('r3 s2 i1')
  r2, s1 = symbols('r2 s1')
  d4, d3, d2, d1 = symbols('d4 d3 d2 d1')
  f4, f3, f2, f1 = symbols('f4 f3 f2 f1')
  ap4, ap3, ap2, ap1, ap0 = symbols('ap4 ap3 ap2 ap1 ap0')
  acmr = sym.Symbol('acmr')


  # for k linearly independent eqns, sympy will solve the first k unknowns
  unknowns = [i2,s1,s2,s3,s4,r3,i1,i3,t1,r4,r2,d1,d2,d3,d4,f1,f2,f3,f4]

  def add_eq(terms, y, i, A, v):
    """
    For input equation y = sum([coeff*var for var:coeff in {terms}])
    adds right side of equation to to row i of matrix A
    
    adds y to row i of vector v
    """
    for x in terms.keys():
        A[x][i] = terms[x]
    v.iloc[i] = y


  # # assuming equilibrium:
  # p4*s4 + p3*r4 + p0*f4 = p4
  eq1 = [{s4:p4, r4:p3, f4:p0}, p4]

  # p4*i3 + p3*s3 + p2*r3 + p0*f3 = p3
  eq2 = [{i3:p4, s3:p3, r3:p2, f3:p0}, p3]

  # p3*i2 + p2*s2 + p1*r2 + p0*f2 = p2
  eq3 = [{i2:p3, s2:p2, r2:p1, f2:p0}, p2]

  # p2*i1 + p1*s1 + p0*f1 = p1
  eq4 = [{i1:p2, s1:p1, f1:p0}, p1]

  # p4*d4 + p3*d3 + p2*d2 + p1*d1 + p0*sld = p0
  eq5 = [{d4:p4, d3:p3, d2:p2, d1:p1}, p0]


  # # rows sum to one:
  # s4 + i3 + d4 = 1
  eq6 = [{s4:1, i3:1, d4:1}, 1]

  # r4 + s3 + i2 + d3 = 1
  eq7 = [{r4:1, s3:1, i2:1, d3:1}, 1]

  # r3 + s2 + i1 + d2 = 1
  eq8 = [{r3:1, s2:1, i1:1, d2:1}, 1]

  # r2 + s1 + d1 = 1
  eq9 = [{r2:1, s1:1, d1:1}, 1]

  # f4 + f3 + f2 + f1 + sld = 1
  eq10 = [{f4:1, f3:1, f2:1, f1:1}, 1]


  def build_matrix(eqns, unknowns):
    """
    INPUT
    ----
    eqns: a list of sympy equations
    unknowns: a list of sympy unknowns
    ----
    OUTPUT
    ----
    A:  a matrix containing the coefficients of LHS of all eq in eqns.
        nrows = number of equations
        rcols = number of unknowns
    b: an nx1 matrix containing the RHS of all the eqns
    x: a sympy matrix of the unknowns
    """
    n_eqns = len(eqns)
    n_unknowns = len(unknowns)

    # frame for matrix/LHS equations.
    # nrows = n_eqns, ncols = n_unknowns
    A = pd.DataFrame(
        index = range(n_eqns),
        columns = unknowns,
        data = np.zeros([n_eqns,n_unknowns])
    )
    
    # frame for RHS of equations
    b = pd.DataFrame(index = range(n_eqns), columns = ['val'])
    
    # populate LHS/RHS
    i = 0
    for eq in eqns:

        add_eq(eq[0], eq[1], i, A, b)
        i += 1
    
    # convert to sympy matrices
    A = sym.Matrix(A)
    b = sym.Matrix(b)
    x = sym.Matrix(unknowns) #vars to solve for
    
    return A, x, b

  # solve in terms of i3 
  A0, x0, b0 = build_matrix([eq1,eq2,eq3,eq4,eq5,eq6,eq7,eq8,eq9,eq10,eq11,eq12],
                           unknowns)

  result_0 = sym.solve(A0 * x0 - b0, x0)

  # solve in terms of duration of cat3 instead of i3:
  A1, x1, b1 = build_matrix([eq1,eq2,eq3,eq4,eq5,eq6,eq7,eq8,eq9,eq10],
                         unknowns)
  result_1 = sym.solve(A1 * x1 - b1, x1)


Finite state machine 2x4 
~~~~~~~~~~~~~~~~~~~~~~~~~

.. image:: wasting_state_2x4.svg





Data Description Tables
+++++++++++++++++++++++

As we are building this model before the completion of GBD 2020, we 
will need to calculate the PAFs ourselves, using the following equation:

.. math::
  \frac{(\sum_{wasting\_category_i} prevalence_{i} * rr_{ci})-1}{\sum_{wasting\_category_i} prevalence_{i} * rr_{ci}}

.. list-table:: PAF equation variable descriptions
   :widths: 6 10 10
   :header-rows: 1

   * - Variable
     - Description
     - Equation
   * - :math:`rr_{ci}`
     - The relative risk for incidence of cause c given wasting category i
     -
   * - :math:`prevalence_{i}`
     - the prevalence of wasting category i 
     - Pulled from GBD


Note the RRs should be pulled as follows:


.. code-block:: python

  from get_draws.api import get_draws
  get_draws(
    gbd_id_type='rei_id',
    gbd_id=240,
    source='rr',
    location_id=179,
    sex_id=[1,2],
    age_group_id=[2, 3, 388, 389, 34],
    decomp_step='iterative',
    status='best'
  )



References
++++++++++

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
    
