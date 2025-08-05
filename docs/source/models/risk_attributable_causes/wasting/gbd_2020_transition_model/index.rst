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

=====================================================
Wasting dynamic transition model (GBD 2020)
=====================================================

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
| DD    | Diarrheal disease                       |
+-------+-----------------------------------------+
| LRI   | Lower respiratory tract infection       |
+-------+-----------------------------------------+
| MSLS  | Measles                                 |
+-------+-----------------------------------------+
| PEM   | Protein energy malnutrition             |
+-------+-----------------------------------------+


Wasting background
++++++++++++++++++

Acute Malnutrition
------------------
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

Protein-Energy Malnutrition
---------------------------
Protein-energy malnutrition (PEM) is defined to be moderate or severe acute 
malnutrition, and takes the form of either marasmus, kwashiorkor, or marasmic 
kwashiorkor. These conditions are diagnosed by **clinical** findings, with 
oedema being the primary marker of kwashiorkor. [UpToDate-malnutrition-Wasting]_ 
[WHO-Malnutrition-Wasting]_ [Dipasquale-et-al-Wasting]_

Marasmus is caused by inadequate intake of all nutrients, but particularly total 
calories. It is characterized by a low weight-for-height and reduced mid-upper arm 
circumference (MUAC), but the precise deifinition is highly debated. Marasmus is 
often categorized as (1) WHZ score :math:`i<3`, or (2) WHZ score :math:`i<3` and 
NO oedema. Signs and symptoms include: [UpToDate-malnutrition-Wasting]_

  * Head that appears large relative to the body, with staring eyes

  * Emaciated and weak appearance
  
  * Irritable and fretful affect

  * Bradycardia, hypotension, and hypothermia

  * Thin, dry skin

  * Shrunken arms, thighs, and buttocks, with redundant skin folds caused by loss of subcutaneous fat

  * Thin, sparse hair

Kwashiorkor is typically defined to be any form of malnutrition with oedema, 
regardless of WHZ score. Symmetric peripheral pitting oedema begins in the lower 
parts of the body and moves upwards, often affecting the presacral area, 
genitalia, and periorbital area, with or without anasarca (severe generalized 
oedema). The particular cause or nutrient deficit responsible for oedematous 
malnutrition was originally attributed to protein deficiency, but is now 
debated. Kwashiorkor also  marked muscle atrophy with normal or even increased 
body fat.  Other signs and symptoms include: [UpToDate-malnutrition-Wasting]_

  * Apathetic, listless affect

  * Rounded prominence of the cheeks ("moon face")

  * Pursed appearance of the mouth

  * Thin, dry, peeling skin with confluent areas of hyperkeratosis and hyperpigmentation

  * Dry, dull, hypopigmented hair that falls out or is easily plucked

  * Hepatomegaly (from fatty liver infiltrates)

  * Distended abdomen with dilated intestinal loops

  * Bradycardia, hypotension, and hypothermia

  * Despite generalized edema, most children have loose inner inguinal skin folds

Implications
------------
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

Wasting, a sub-component indicator of child growth failure (CGF), is based on a 
categorical definition using the WHO 2006 growth standards for children 0-59 
months. Definitions are based on Z-cores from the growth standards, which were 
derived from an international reference population. Mild, moderate and severe 
categorical prevalences were estimated for each of the three indicators. 
Theoretical minimum risk exposure level (TMREL) for wasting was assigned to be 
greater than or equal to one standard deviation below the mean (-1 SD) of the 
WHO 2006 standard weight-for-height curve. This has not changed since GBD 2010.

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

  1. **Tabulated report data**. This data does not report individual 
  anthropometric measurements. It only reports the prevalence of forms of CGF in 
  a sample size. For example, this data would may report a 15% prevalence of
  moderate stunting out of a nationally representative sample of 5,000 children.

  2. **Microdata**. This data does have individual anthropometric measurements. 
  From these datasources, GBD can see entire distributions of CGF, while also 
  collapsing them down to point prevalences like moderate and severe CGF. 

Exposure estimation
-------------------

In modeling CGF, all data types go into ST-GPR modeling. GBD has STGPR models 
for moderate, severe, and mean stunting, wasting, and underweight. The output 
of these STGPR models is an estimate of moderate, severe, and mean stunting, 
wasting, and underweight for all under 5 age groups, all locations, both sexes, 
and all years. 

They also take the microdata sources and fit ensemble distributions to the 
shapes of the stunting, wasting, and underweight distributions. They thus find 
characteristic shapes of stunting, wasting, and underweight curves. Once they 
have ST-GPR output as well as weights that define characteristic curve shapes, 
the last step is to combine them. They anchor the curves at the mean output from 
ST-GPR, use the curve shape from the ensemble distribution modeling, and then 
use an optimization function to find the standard deviation value that allows 
them to stretch/shrink the curve to best match the moderate and severe CGF 
estimates from ST-GPR. The final CGF estimates are the area under 
the curve for this optimized curve.

Note that the z-score ranges from -7 to +7. If we limit ourselves to Z-scores 
between -4 and +4, we will be excluding a lot of kids.

.. note::
  In the paper that Ryan (GBD modeller for CGF and LBWSG) is working on right 
  now, he presents the first results ever for "extreme" stunting which we define 
  as kids with stunting Z scores below -4. For Ethiopia, that's about 7% of kids. 
  So it's non-trivial!

CGF burden does not start until *after* neonatal age groups (from 1mo onwards). 
In the neonatal age groups (0-1mo), burden comes from LBWSG. See risk effects 
page for details on model structure. The literature on interventions for wasting 
target age groups 6mo onwards. This coincides with the timing of supplementary 
food introduction. Prior to 6mo, interventions to reduce DALYs focus on 
breastfeeding and reduction of LBWSG. 


Protein Energy Malnutrition in GBD 2019/2020
++++++++++++++++++++++++++++++++++++++++++++

.. important::
  
  We will use PEM 2019 model (with a 2020 wasting model) because PEM 2020 is not completed. Once PEM 2020 is completed (expected July 30th), we will update to a PEM 2020 model. 

PEM is responsible for both fatal and nonfatal outcomes within the GBD 
framework. GBD maintains a cause of death model called "Nutritional 
deficiencies" that is split into *PEM* and *Other Nutritional Deficiencies* that 
estimates PEM mortality. Nonfatal PEM cases are modelled independently, using 
the case definition moderate and severe acute malnutrition, defined in terms of 
weight-for-height Z-scores (WHZ). All PEM cases are attributed to the GBD Child 
Growth Failure risk factor, which is not detailed here. We include specifics on 
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

.. list-table:: Nonfatal PEM Sequelae 2019/2020
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

.. list-table:: Clinical definitions 2019/2020
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

.. list-table:: Nonfatal PEM sub-models 2019/2020
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
remission rate within the given bounds based on other input data. [GBD-2019-Capstone-Appendix-Wasting]_

From the all-age model, they then derived (1) a prevalence:incidence ratio that 
was applied across all categories of non-fatal PEM, and (2) a moderate:severe 
wasting ratio for both under and over 5. [GBD-2019-Capstone-Appendix-Wasting]_

.. todo::
  What do the modelers do with this mod:sev ratio? How do they get estimates for 5+?

The modelers then assumed that there is zero prevalence of oedema in anyone over 
5. [GBD-2019-Capstone-Appendix-Wasting]_

Additionally, they calculated the fraction of wasting attributable to severe 
worm infestation and subtracted this out of all wasting, attributing the 
remainder to PEM. They assumed no oedema due to worms, and the 
prevalence:incidence ratio derived from the all-age PEM model. [GBD-2019-Capstone-Appendix-Wasting]_

The modelers used child anthropometry data from health surveys, literature, 
and national reports, from which they estimate the WHZ SDs that correspond with 
the case definitions. They additionally used SMART datasets to estiamte the 
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

.. image:: vivarium_wasting_model_with_t1.svg

We will model wasting in four compartments: TMREL, Mild, Moderate, and Severe.
In a given timestep a simulant will either stay put, transition to an adjacent 
wasting category, or die. In this case of "CAT 1: severe wasting", simulants can 
also transition to "CAT 3: Mild wasting" via a treatment arrow, t1.

We will use the GBD 2020 wasting and PEM models to inform this model, in 
addition to data found in the literature. We will derive the remaining 
transition rates from a Markov chain model, described in further detail below. 
Simulants in each wasting category will receive a corresponding relative risk 
for diarrheal diseases, measles, lower respiratory infections. The vivarium 
models for these three causes will draw from the corresponding GBD 2019 models, 
as GBD 2020 is not yet complete at this time (July 2021), and will be subject to 
updates and reruns. In addition, current scatters indicate that (unlike wasting 
and PEM), LRI, diarrhea and measles have not undergone significant changes 
between GBD rounds 2019 and 2020.

Assumptions and Limitations
---------------------------

..  todo::

  Describe the clinical and mathematical assumptions made for this cause model,
  and the limitations these assumptions impose on the applicability of the
  model. Flesh out list below.

 - Markov chain assumption is flawed (remission / incidence isn't constant over time / memoryless).

 - Seasonality of data

 - Unclear if our input data that informs "time to recovery from SAM" ought to be "time to recovery or death from SAM"

Input data
----------

GBD and literature sources
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. todo::
  @Ninicorn will you help fill out this table? i.e. the sources for the 
  remission rates


.. list-table:: Wasting model input data sources
   :widths: 15 15
   :header-rows: 1

   * - Variable
     - Source
   * - TMREL prevalence
     - GBD wasting model
   * - Mild wasting prevalence
     - GBD wasting model
   * - MAM prevalence
     - GBD wasting model
   * - SAM prevalence
     - GBD wasting model
   * - TMREL mortality rate
     - Derived from GBD
   * - Mild wasting mortality rate
     - Derived from GBD
   * - MAM mortality rate
     - Derived from GBD
   * - SAM mortality rate
     - Derived from GBD
   * - Incidence of mild wasting from TMREL
     - Derived using a Markov model 
   * - Incidence of MAM from mild wasting
     - Derived using a Markov model 
   * - Incidence of SAM from MAM
     - Derived using a Markov model 
   * - Remission from mild wasting to TMREL
     - 
   * - Remission from MAM to mild wasting
     - 
   * - Remission from SAM to MAM
     - 
   * - Treated remission from SAM to mild wasting
     - 
   * - Probability of staying in TMREL
     - Derived using a Markov model 
   * - Probability of staying in Mild wasting
     - Derived using a Markov model 
   * - Probability of staying in MAM
     - Derived using a Markov model 
   * - Probability of staying in SAM
     - Derived using a Markov model


Deriving wasting transition probabilities
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Wasting model
^^^^^^^^^^^^^

.. important::

  We will model wasting transitions and risk effects **only** among simulants at least six months of age. Simulants should be initialized into a wasting model state at birth with a birth prevalence equal to the wasting risk exposure among the 1-5 month age group (age_group_id=388, or the postneonatal age_group_id=4 if using GBD 2019 instead of GBD 2020). 

  All wasting transition rates should equal zero among all ages under 6 months. The relative risks for each wasting risk exposure category and each risk/outcome pair should equal one for all ages under 6 months.

  Wasting transition rates should be informed by the data tables below for ages over 6 months. Wasting risk effects for ages over 6 months should be informed by the standard GBD wasting relative risks.

  NOTE: When the birthweight and wasting risk exposure at birth correlation is implemented, it will cause simulants with a greater neonatal mortality (due to brithweight exposure) to be initialized into more severe wasting states. This will cause the wasting exposure distribution to shift to less severe wasting states over the neonatal period as simulants with lower birthweights (and more severe wasting states due to the birthweight and wasting exposure correlation) die. The magnitude of the bias introduced by this modeling strategy should be investigated upon implementation to determine if different modeling strategies are necessary. This should be done by comparing the wasting exposure and wasting-affected outcomes in the simulation output to the GBD inputs by age group.

  NOTE: The modeling decision not to model wasting transitions among simulants less than six months of age is due to the reliance of the wasting model transition rates on the wasting treatment model and the lack of data to inform treatment-related transition rates among this age group. Note that a sensitivity analysis scenario that includes infants less than six months of age in the treatment model may be performed in the future.

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
   :widths: 5 15 10 10
   :header-rows: 1

   * - Variable
     - Equation
     - Description
     - Source
   * - i1
     - ap0*f2/ap2 + ap0*f3/ap2 + ap0*f4/ap2 + ap1*r2/ap2 + ap1*t1/ap2 - d2 - ap3*d3/ap2 - ap4*d4/ap2
     - Daily probability of incidence into cat 1 from cat 2
     - System of equations
   * - i2
     - ap0*f3/ap3 + ap0*f4/ap3 + ap1*t1/ap3 + ap2*r3/ap3 - d3 - ap4*d4/ap3
     - Daily probability of incidence into cat 2 from cat 1
     - System of equations
   * - i3
     - ap0*f4/ap4 + ap3*r4/ap4 - d4
     - Daily probability of incidence into cat 3 from cat 4
     - System of equations
   * - r2
     - 1 - e^(-(1-sam_tx_coverage*sam_tx_efficacy)*(1/time_to_sam_ux_recovery))
     - Daily probability of remission into cat 2 from cat 1 (untreated)
     - Nicole's calculations; also referred to as r2ux (get lit source!)
   * - r3
     - 1 - e^(-(mam_tx_coverage*mam_tx_efficacy * 1/time_to_mam_tx_recovery + (1-mam_tx_coverage*mam_tx_efficacy)*(1/time_to_mam_ux_recovery)))
     - Daily probability of remission from cat 2 into cat 3 (treated or untreated)
     - Nicole's calculations (get lit source!)
   * - r4
     - 1 - e^{-rate}. 6-12 months: rate = 0.006140 (SD: 0.003015). 1-4 years: rate = 0.005043  (SD: 0.002428). For each rate parameter, use truncated normal distribution of uncertainty with lower bound equal to zero and upper bound equal to 25 standard deviations above the mean (25 standard deviations above the mean was determined to be the upper limit of the python distribution function)
     - Daily probability of remission from cat 3 into cat 4
     - From `implied transition rate from the KI data <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/wasting_transitions/alibow_ki_database_rates/KI_rates_5.3.3.ipynb>`_. Assume a normal distribution of uncertainty.
   * - t1
     - 1 - e^(-sam_tx_coverage*sam_tx_efficacy * (1/time_to_sam_tx_recovery))
     - Daily probability of remission into cat 3 from cat 1 (treated)
     - Nicole's calculations (get lit source!)
   * - s1
     - -r2 - t1 + ap2*d2/ap1 + ap3*d3/ap1 + ap4*d4/ap1 + (-ap0 + ap1)/ap1
     - Daily probability of staying in cat 1
     - System of equations
   * - s2
     - -ap0*f2/ap2 - ap0*f3/ap2 - ap0*f4/ap2 - ap1*r2/ap2 - ap1*t1/ap2 - r3 + 1 + ap3*d3/ap2 + ap4*d4/ap2
     - Daily probability of staying in cat 2
     - System of equations
   * - s3
     - -ap0*f3/ap3 - ap0*f4/ap3 - ap1*t1/ap3 - ap2*r3/ap3 - r4 + 1 + ap4*d4/ap3
     - Daily probability of staying in cat 3
     - System of equations
   * - s4
     - -ap0*f4/ap4 - ap3*r4/ap4 + 1
     - Daily probability of staying in cat 4
     - System of equations


in terms of the following variables:

.. list-table:: Variables for transition probabilities
   :widths: 10 10 10 10
   :header-rows: 1

   * - Variable
     - Description
     - Equation
     - Notes
   * - :math:`d_i`
     - Death probability out of wasting category :math:`i`
     - :math:`1 - exp(-1 * (acmr + (\sum_{c\in diar,lri,msl,pem} emr_c*prevalence_{ci}) - csmr_c) * timestep)`
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
   * - mam_tx_coverage
     - Proportion of MAM (CAT 2) cases that have treatment coverage
     - :ref:`defined here <wasting-treatment-baseline-parameters>` as :math:`C_{MAM}`
     - 
   * - sam_tx_coverage
     - Proportion of SAM (CAT 1) cases that have treatment coverage
     - :ref:`defined here <wasting-treatment-baseline-parameters>` as :math:`C_{SAM}`
     - 
   * - sam_tx_efficacy
     - Proportion of children treated for SAM who successfully respond to treatment
     - :ref:`defined here <wasting-treatment-baseline-parameters>` as :math:`E_{SAM}`
     - Baseline scenario value
   * - mam_tx_efficacy
     - Proportion of children treated for MAM who successfully respond to treatment
     - :ref:`defined here <wasting-treatment-baseline-parameters>` as :math:`E_{MAM}`
     - Baseline scenario value
   * - :math:`time_to_mam_ux_recovery`
     - Without treatment or death, average days spent in MAM before recovery
     - :ref:`defined here <wasting-treatment-baseline-parameters>` as :math:`\text{time to recovery}_\text{untreated MAM}`
     - 
   * - time_to_mam_tx_recovery
     - With treatment and without death, average days spent in MAM before recovery
     - :ref:`defined here <wasting-treatment-baseline-parameters>` as :math:`\text{time to recovery}_\text{treated MAM}`
     - 
   * - time_to_sam_ux_recovery
     - Without treatment or death, average days spent in SAM before recovery
     - :math:`365 / r_{SAM,ux}`
     - :math:`r_{SAM,ux}` defined in the :ref:`untreated-sam-time-to-recovery-reference-label` table in the :ref:`wasting treatment intervention document <intervention_wasting_treatment>` 
   * - time_to_sam_tx_recovery
     - With treatment and without death, average days spent in SAM before recovery
     - :ref:`defined here <wasting-treatment-baseline-parameters>` as :math:`\text{time to recovery}_\text{treated SAM}`
     - 
   * - time_step
     - Scalar time step conversion to days
     - 1
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
     - The average duration of cause c, in years
     - Defined on the respective cause model documents for :ref:`diarrheal diseases <2019_cause_diarrhea>`, :ref:`measles <2019_cause_measles>`, and :ref:`lower respiratory infections <2019_cause_lower_respiratory_infections>`
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


Wasting x Disease model
^^^^^^^^^^^^^^^^^^^^^^^

.. image:: wasting_state_2x4.svg

Data Description Tables
+++++++++++++++++++++++

.. list-table:: Wasting State Data
   :widths: 5 10 10 20
   :header-rows: 1

   * - State
     - Measure
     - Value
     - Notes
   * - TMREL, MOD, MAM, SAM
     - birth prevalence
     - :math:`prevalence_{240_{cat-1-4}}`
     - Use prevalence of age_group_id = 388 (1 to 5 months)

.. code-block:: python

   #to pull GBD 2020 category specific prevalence of wasting

    get_draws(gbd_id_type='rei_id',
                    gbd_id=240,
                    source='exposure',
                    year_id=2020,
                    gbd_round_id=7,
                    status='best',
                    location_id = [179],
                    decomp_step = 'iterative')

.. list-table:: Wasting State Data
   :widths: 5 10 10 20
   :header-rows: 1
  
   * - State
     - Measure
     - Value
     - Notes
   * - MAM
     - disability weight
     - :math:`\frac{{\sum_{sequelae\in \text{MAM}}} \scriptstyle{\text{disability_weight}_s \times\ \text{prevalence}_s}}{{\sum_{sequelae\in xt{MAM}} \scriptstyle{\text{prevalence}_s}}}`
     - disability weight for MAM
   * - SAM
     - disability weight
     - :math:`\frac{{\sum_{sequelae\in \text{SAM}}} \scriptstyle{\text{disability_weight}_s \times\ \text{prevalence}_s}}{{\sum_{sequelae\in \text{SAM}} \scriptstyle{\text{prevalence}_s}}}`
     - disability weight for SAM
   * - MAM & SAM 
     - excess mortality 
     - :math:`\frac{\text{deaths_c387}}{\text{population} \times \text{prevalence_c387}}`
     - death counts come from codecorrect
   * - All
     - cause specific mortality
     - :math:`\frac{\text{deaths_c387}}{\text{population}}`
     - death counts come from codecorrect

.. note::
  
  The 2020 Codecorrect model for PEM is not yet completed. Check here on central machinary to see latest codecorrect modeling.
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

.. list-table:: PEM Restrictions 2020
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

.. list-table:: Wasting Restrictions 2020
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
   * - Prevalence age group start
     - Early Neonatal
     - age_group_id = 2. This is the earliest age group for which the wasting risk exposure estimates nonzero prevalence.
   * - Burden age group start
     - 28 days - 5 months
     - age_group_id = 388. This is the earliest age group for which there exist wasting RRs.
   * - Age group end
     - 2 to 4
     - age_group_id = 34

.. code-block:: python

  #age group id differences between 2019 and 2020

  #2020 age ids
  early nn = 2 
  late nn = 3
  1m-5m = 388   #2019 it was 4 = postneonatal
  6m-11m = 389  #2019 it was 4 = postneonatal
  12m-23m = 238 #2019 it was 5 = 1-5
  2y-4y = 34    #2019 it was 5 = 1-5


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


.. list-table:: Transition Data
 :widths: 10 10 10 10 10
 :header-rows: 1

 * - Transition
   - Source State
   - Sink State
   - Value
   - Notes
 * - ux_rem_rate_sam
   - CAT 1
   - CAT 2
   - :math:`-log(1 - r2) * 365`
   - Untreated remission rate (counts/person-year) from SAM to MAM
 * - tx_rem_rate_sam
   - CAT 1
   - CAT 3
   - :math:`-log(1 - t1) * 365`
   - Treated remission rate (counts/person-year) from SAM to mild wasting
 * - rem_rate_mam
   - CAT 2
   - CAT 3
   - :math:`-log(1 - r3) * 365`
   - Remission rate (counts/person-year) from MAM to mild wasting
 * - rem_rate_mild
   - CAT 3
   - CAT 4
   - :math:`-log(1 - r4) * 365`
   - Remission rate (counts/person-year) from mild wasting to TMREL
 * - inc_rate_sam
   - CAT 2
   - CAT 1
   - :math:`-log(1 - i1) * 365`
   - Incidence rate (counts/person-year) from MAM to SAM
 * - inc_rate_mam
   - CAT 3
   - CAT 2
   - :math:`-log(1 - i2) * 365`
   - Incidence rate (counts/person-year) from mild wasting to MAM
 * - inc_rate_mild
   - CAT 4
   - CAT 3
   - :math:`-log(1 - i3) * 365`
   - Incidence rate (counts/person-year) from TMREL to mild wasting

Validation 
++++++++++

Wasting model

  - prevalence of cat 1-4
  - the incidences and the recovery rates (with our calibration inputs, can be accessed in interative sim)
  - death rates per category
  - relative risks (this would be done in the cause model validation)
  - SAM and MAM duration (including who recovered from t1 arrow vs. r2 arrow)
  - fertility (total person-time vs. year)

PEM model

  - prevalences
  - csmr 
  - emr
  - we are not validating against GBD incidence or remission

References
++++++++++

.. [Dipasquale-et-al-Wasting]
    Dipasquale et al. Acute Malnutrition in Children:
    Pathophysiology, Clinical Effects and Treatment.
    Nutrients 2020, 12, 2413;
    doi:10.3390/nu12082413,
    https://www.mdpi.com/2072-6643/12/8/2413

.. [GBD-2019-Capstone-Appendix-Wasting]
  Appendix to: `GBD 2019 Diseases and Injuries Collaborators. Global burden of
  369 diseases and injuries in 204 countries and territories, 1990–2019: a 
  systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 
  17 Oct 2020;396:1204-1222` 

.. [UpToDate-malnutrition-Wasting]
    Retrieved 25 June 2021.
    https://www-uptodate-com.offcampus.lib.washington.edu/contents/malnutrition-in-children-in-resource-limited-countries-clinical-assessment

.. [WHO-Malnutrition-Wasting]
    Retrieved 25 June 2021.
    https://www.who.int/news-room/q-a-detail/malnutri
