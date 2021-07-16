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



.. _2019_risk_exposure_wasting_state_exposure:

=======
Wasting
=======

.. contents::
  :local:

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



.. _waste_exp1.0:

Risk Exposure Overview
++++++++++++++++++++++

Malnutrition is an imbalance between the body’s needs and its use and intake of nutrients. The imbalance can be caused by poor or lacking diet, poor hygiene, disease states, lack of knowledge, and cultural practices, among others. Underweight, stunting, wasting, obesity, and vitamin and mineral deficiencies are all forms of malnutrition. 

**Acute malnutrition (AM)**, also referred to as wasting, is recent rapid weight loss or a failure to gain weight that results from illness, lack of appropriate foods, or other underlying causes. For an individual, AM is not a chronic condition: children with AM either recover or die and recovered children can relapse to AM. It is measured in weight-for-height z-scores (WFH) which is a comparison of a child’s WFH from the median value of the global reference population. A z-score between -2 to -3 indicates moderate acute malnutrition (MAM) and a z-score below -3 indicate severe acute malnutrition (SAM). WHZ z-scores range from -7 to +7. Although MAM is less severe, it affects a greater number of children and is associated with more nutrition-related deaths than SAM. Children with AM are at greater risk of death from diarrhea and other infectious diseases than well-nourished children. They also face greater risk of morbidity from infectious diseases and delayed physical and cognitive development. AM tends to peak during seasonal hunger, disease outbreaks, or during food security ‘shocks’ (e.g. economic or climatic crises) and stresses including humanitarian crises. However, AM is a problem that not only occurs in emergencies, but also can be endemic in development contexts. MAM should not be neglected, as untreated, it can deteriorate to SAM and possible death. Furthermore, evidence is emerging that repeated episodes of MAM can have a significant impact on stunting; prevention of wasting could potentially increase height in children. 

.. note::
  Include here a clinical background and overview of the risk exposure you're modeling. Note that this is only for the exposure; you will include information on the relative risk of the relevant outcomes, and the cause models for those outcomes, in a different document.

.. _waste_exp1.1:

Risk Exposures Description in GBD
+++++++++++++++++++++++++++++++++

.. _waste_exp1.1.1:

Case definition
---------------

Wasting, a sub-compoonent indicator of child growth failure (CGF), is based on a categorical definition using the WHO 2006 growth standards for children 0-59 months. Definitions are based on Z-cores from the growth standards, which were derived from an international reference population. Mild, moderate and severe categorical prevalences were estimated for each of the three indicators. Theoretical minimum risk exposure level (TMREL) for wasting was assigned to be greater than or equal to one standard deviation below the mean (-1 SD) of the WHO 2006 standard weight-for-height curve. This has not changed since GBD 2010.

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

.. _waste_exp1.1.2:

Input data
----------

Two types of input data are used in CGF estimation:  

  1. **Tabulated report data**. This data does not report individual anthropometric measurements. It only reports the prevalence of forms of CGF in a sample size. For example, this data would may report a 15% prevalence of moderate stunting out of a nationally representative sample of 5,000 children.

  2. **Microdata**. This data does have individual anthropometric measurements. From these datasources, GBD can see entire distributions of CGF, while also collapsing them down to point prevalences like moderate and severe CGF. 


.. _waste_exp1.1.3:

Exposure estimation
------------------- 

In modeling CGF, all data types go into ST-GPR modeling. We have STGPR models for moderate, severe, and mean stunting, wasting, and underweight. The output of these STGPR models is an estimate of moderate, severe, and mean stunting, wasting, and underweight for all under 5 age groups, all locations, both sexes, and all years. 

We also take the microdata sources and fit ensemble distributions to the shapes of the stunting, wasting, and underweight distributions. By doing this we can find characteristic shapes of stunting, wasting, and underweight curves. Once we have ST-GPR output as well as weights that define characteristic curve shapes, the last step is to combine them. We anchor the curves at the mean output from ST-GPR, use the curve shape from the ensemble distribution modeling, and then use an optimization function to find the standard deviation value that allows us to stretch/shrink the curve to best match the moderate and severe CGF estimates we got from ST-GPR. The final CGF estimates are the area under the curve for this optimized curve.

Note that the z-score ranges from -7 to +7. If we limit ourselves to Z-scores between -4 and +4, we will be excluding a lot of kids.

.. note::
  In the paper that Ryan (GBD modeller for CGF and LWBSG) is working on right now, he presents the first results ever for "extreme" stunting which we define as kids with stunting Z scores below -4. For Ethiopia, that's about 7% of kids. So it's non-trivial!


.. _waste_exp1.1.4:

Outcomes affected by wasting
----------------------------

CGF burden does not start until *after* neonatal age groups (from 1mo onwards). In the neonatal age groups (0-1mo), burden comes from LBWSG. From post-neonatal (1mo+) age onwards, CGF outcomes affected include lower-respiratory disease (LRI), diarrheal disease (DD), measles, and protein energy malnutrition (PEM). The literature on interventions for wasting target age groups 6mo onwards. This coincides with the timing of supplementary food introduction. Prior to 6mo, interventions to reduce DALYs focus on breastfeeding and reduction of LBWSG. 

+------------------------------------------------------------------+
|Adjusted RR for each risk-outcome pair for wasting                |
+=======+=======+=======================+==========================+
|       | TMREL |  >= -1                | 1                        |            
+-------+-------+-----------------------+--------------------------+
| DD    | MILD  | < -1 to -2 Z score    | 6.601 (2.158-11.243)     |
|       +-------+-----------------------+--------------------------+
|       | MAM   | < -2 to -3 Z score    | 23.261 (9.02-35.845)     |
|       +-------+-----------------------+--------------------------+
|       | SAM   | < -3 Z score          | 105.759 (42.198-157.813) |
+-------+-------+-----------------------+--------------------------+
| LRI   | MILD  | < -1 to -2 Z score    | 5.941 (1.972-11.992)     |
|       +-------+-----------------------+--------------------------+
|       | MAM   | < -2 to -3 Z score    | 20.455 (70.84-37.929)    |
|       +-------+-----------------------+--------------------------+
|       | SAM   | < -3 Z score          | 47.67 (15.923-94.874)    |
+-------+-------+-----------------------+--------------------------+
| MSLS  | MILD  | < -1 to -2 Z score    | 1.833 (0.569-8.965)      |
|       +-------+-----------------------+--------------------------+
|       | MAM   | < -2 to -3 Z score    | 8.477 (1.33-42.777)      |
|       +-------+-----------------------+--------------------------+
|       | SAM   | < -3 Z score          | 37.936 (5.088-199.126)   |
+-------+-------+-----------------------+--------------------------+
| PEM   |       |                       | 100% PAF                 |
+-------+-------+-----------------------+--------------------------+


.. _waste_exp2.0:

Vivarium Modeling Strategy
++++++++++++++++++++++++++

.. _waste_exp2.1:

Restrictions
------------

.. list-table:: GBD 2019 Risk Exposure Restrictions
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
     - post-neonatal 1mo to 1 year, id 4 
     - exclude neonatal age groups
   * - Age group end
     - 1yr to 4yr id 5
     - 

..	todo::

	Determine if there's something analogous to "YLL/YLD only" for this section

