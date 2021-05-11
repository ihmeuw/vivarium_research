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

================================
Wasting as finite state machines
================================

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



.. _1.0:

Risk Exposure Overview
++++++++++++++++++++++

Malnutrition is an imbalance between the body’s needs and its use and intake of nutrients. The imbalance can be caused by poor or lacking diet, poor hygiene, disease states, lack of knowledge, and cultural practices, among others. Underweight, stunting, wasting, obesity, and vitamin and mineral deficiencies are all forms of malnutrition. Acute malnutrition (AM), also referred to as wasting, is recent rapid weight loss or a failure to gain weight that results from illness, lack of appropriate foods, or other underlying causes. For an individual, AM is not a chronic condition: children with AM either recover or die and recovered children can relapse to AM. It is measured in weight-for-height z-scores (WFH) which is a comparison of a child’s WFH from the median value of the global reference population. A z-score between -2 to -3 indicates moderate acute malnutrition (MAM) and a z-score below -3 indicate severe acute malnutrition (SAM). WHZ z-scores range from -7 to +7. Although MAM is less severe, it affects a greater number of children and is associated with more nutrition-related deaths than SAM. Children with AM are at greater risk of death from diarrhea and other infectious diseases than well-nourished children. They also face greater risk of morbidity from infectious diseases and delayed physical and cognitive development. AM tends to peak during seasonal hunger, disease outbreaks, or during food security ‘shocks’ (e.g. economic or climatic crises) and stresses including humanitarian crises. However, AM is a problem that not only occurs in emergencies, but also can be endemic in development contexts. MAM should not be neglected, as untreated, it can deteriorate to SAM and possible death. Furthermore, evidence is emerging that repeated episodes of MAM can have a significant impact on stunting; prevention of wasting could potentially increase height in children. 

.. note::
  Include here a clinical background and overview of the risk exposure you're modeling. Note that this is only for the exposure; you will include information on the relative risk of the relevant outcomes, and the cause models for those outcomes, in a different document.

.. _1.1:

Risk Exposures Description in GBD
+++++++++++++++++++++++++++++++++

.. _1.1.1:

Case definition
---------------

Wasting, a sub-compoonent indicator of child growth failure (CGF), is based on a categorical definition using the WHO 2006 growth standards for children 0-59 months. Definitions are based on Z-cores from the growth standards, which were derived from an international reference population. Mild, moderate and severe categorical prevalences were estimated for each of the three indicators. Theoretical minimum risk exposure level (TMREL) for wasting was assigned to be greater than or equal to -1 SD of the WHO 2006 standard weight-for-height curve. This has not changed since GBD 2010.

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

.. _1.1.2:

Input data
----------

Two types of input data are used in CGF estimation:  

  1. **Tabulated report data**. This data does not report individual anthropometric measurements. It only reports the prevalence of forms of CGF in a sample size. For example, this data would may report a 15% prevalence of moderate stunting out of a nationally representative sample of 5,000 children.

  2. **Microdata**. This data does have individual anthropometric measurements. From these datasources, we can see entire distributions of CGF, while also collapsing them down to point prevalences like moderate and severe CGF. 


.. _1.1.3:

Exposure estimation
------------------- 

In modeling CGF, all data types go into ST-GPR modeling. We have STGPR models for moderate, severe, and mean stunting, wasting, and underweight. The output of these STGPR models is an estimate of moderate, severe, and mean stunting, wasting, and underweight for all under 5 age groups, all locations, both sexes, and all years. 

We also take the microdata sources and fit ensemble distributions to the shapes of the stunting, wasting, and underweight distributions. By doing this we can find characteristic shapes of stunting, wasting, and underweight curves. Once we have ST-GPR output as well as weights that define characteristic curve shapes, the last step is to combine them. We anchor the curves at the mean output from ST-GPR, use the curve shape from the ensemble distribution modeling, and then use an optimization function to find the standard deviation value that allows us to stretch/shrink the curve to best match the moderate and severe CGF estimates we got from ST-GPR. The final CGF estimates are the area under the curve for this optimized curve.

Note that the z-score ranges from -7 to +7. If we limit ourselves to Z-scores between -4 and +4, we will be excluding a lot of kids.

.. note::
  In the Ryan (GBD modeller for CGF and LWBSG) paper that he is working on right now, they actually present the first results ever for "extreme" stunting which we define as kids with stunting Z scores below -4. For Ethiopia, that's about 7% of kids. So it's non-trivial!


.. _1.1.4:

Outcomes affected by wasting
----------------------------

CGF burden does not start until after neonatal age groups. In neonatal age groups, burden comes from LBWSG. Outcomes affected include lower-respiratory disease (LRI), diarrheal disease (DD), measles, and protein energy malnutrition (PEM). 

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


.. _2.0: 

Vivarium Modeling Strategy
++++++++++++++++++++++++++

We will build a duration based Markov chain finite state state transition model for progression and recovery of acute malnutrition calibrated to GBD 2019 prevalence of wasting. We do this progressively frrom a wasting only model to one with causes and disease feedback. The arrows in the model diagram figures represent the transition probabilities into and out of each state which determines the movement of children in and out of each state. 

We first build

  1. 1x4 state model with wasting only
  2. 2x4 state model with 2 disease states and 4 wasting states
  3. 2x4 state model with 2 disease states and 4 wasting states with death and fertility (tbd)


Assumptions and Limitations
+++++++++++++++++++++++++++

Describe the clinical and mathematical assumptions made for this cause model,
and the limitations these assumptions impose on the applicability of the
model.

Markov chains
-------------

.. todo::
  add some detail about markov chains, define mathematic notations 

Equilibirum
-----------

.. todo::
  add some detail about equilirium

Arborescence
------------

.. todo::
  add some detail about graph theory and the process we did to discover the pattern in our markov chains

As a rule for the finiate state machines, the numerator of the prevalence of a state is the sum of the product of all edges in every unique anti-arborescence (graph theory).

.. note::
  This section will become the methods section in the manuscript. 


.. _2.1: 

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

.. _2.2: 

Risk Exposure Model Diagram
---------------------------

.. _2.2.1: 

Finite state machine 1x4 
~~~~~~~~~~~~~~~~~~~~~~~~


.. image:: wasting_state_1x4.svg

To solve the 10 transition pobabilities, we use a Markov Chain transition matrix **T**. 

T = 

.. csv-table:: 
   :file: wasting_state_1x4.csv
   :widths: 5, 5, 5, 5, 5


:math:`π_{T}` = 

+----+----+----+----+
| p4 | p3 | p2 | p1 |
+----+----+----+----+

:math:`π_{T}` is the eigenvector at equilibriuum

  a) :math:`π_{T}\times\text{T} = π_{T}` (the T means transposed, this is a 1 row vector)
  b) :math:`\sum_{\text{i=p}}` = :math:`π_{T}`
  c) :math:`π_{i}` ≥ 0 , these are GBD 2019 age/sex/location/year-specific prevalence for wasting categories 1-4


Solving a)

  1)  p4xs4 + p3xr4 = p4 
  2)  p4xi3 + p3xs3 + p2xr3 = p3
  3)  p3xi2 + p2xs2 + p1xr2 = p2
  4)  p2xi1 + p1xs1 = p1

Rows of the P matrix sums to 1

  5)  s4 + i3 =1
  6)  r4 + s3 + i2 = 1
  7)  r3 + s2 + i1 =1
  8)  r2 + s1 = 1

We have duration of treated and untreated sam and mam as well as coverage from the literature :   

  9)  r2 = 1/Dsam   
  10) r3 + i1  = 1/Dmam   

where:

Duration of cat 1: Dsam = C x Dsam_tx + (1-C)Dsam_ux ~ 40 days stand in value (will refine)
Duration of cat 2: Dmam = C x Dmam_tx + (1-C)Dmam_ux ~ 70 days stand in value (will refine)
tx is treated
ux is untreated
C is treatment coverage proportion

We solve for the unknowns using the matrix solution

.. code-block:: python

  import pandas as pd, numpy as np, matplotlib.pyplot as pyplot

  p4 =  sex/age-specific GBD prevalence of wasting cat 4 
  p3 =  sex/ge-specific GBD prevalence of wasting cat 3 
  p2 =  sex/age-specific GBD prevalence of wasting cat 2 
  p1 =  sex/age-specific GBD prevalence of wasting cat 1 

  # row order from equation 1 - 10;
  # column order is s1, s2, s3, s4, r2, r3, r4, i1, i2, i3


  a = np.array([[0,0,0,p4,0,0,p3,0,0,0],
                [0,0,p3,0,0,p2,0,p4,0,0],
                [0,p2,0,0,p1,0,0,0,p3,0],
                [p1,0,0,0,0,0,0,p2,0,0],
                [0,0,0,1,0,0,0,0,0,1],
                [0,0,1,0,0,0,1,0,1,0],
                [0,1,0,0,0,1,0,1,0,0],
                [1,0,0,0,1,0,0,0,0,0],
                [0,0,0,0,1,0,0,0,0,0],
                [0,0,0,0,0,1,0,1,0,0]])

  b =np.array([[p4],
               [p3],
               [p2],
               [p1],
               [1],
               [1],
               [1],
               [1],
               [0.0250],
               [0.0143]])

  x = np.linalg.solve(a,b)

  # checking that ax=b

  np.allclose(np.dot(a,x),b)



.. _2.2.2: 

Finite state machine 2x4 
~~~~~~~~~~~~~~~~~~~~~~~~~

.. image:: wasting_state_2x4.svg





Data Description Tables
+++++++++++++++++++++++

As of 02/10/2020: follow the template created by Ali for Iron Deficiency, copied 
below. If we discover it's not general enough to accommodate all exposure types,
we need to revise the format in coworking. 

.. list-table:: Constants 
	:widths: 10, 5, 15
	:header-rows: 1

	* - Constant
	  - Value
	  - Note
	* - 
	  - 
	  - 

.. list-table:: Distribution Parameters
	:widths: 15, 30, 10
	:header-rows: 1

	* - Parameter
	  - Value
	  - Note
	* - 
	  - 
	  -

Validation Criteria
+++++++++++++++++++

..	todo::
	Fill in directives for this section

References
--------