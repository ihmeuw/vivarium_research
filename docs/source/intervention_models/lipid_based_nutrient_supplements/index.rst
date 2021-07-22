.. role:: underline
    :class: underline
..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1
  ---------------

  Section Level 2
  +++++++++++++++

  Section Level 3
  ~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

.. _lipid_based_nutrient_supplements:

========================================================
Small quantity lipid based nutrient supplements (SQ-LNS)
========================================================

Ideally, infants are breastfed for two years or longer, with complementary food introduced at six months of age. Diets of infants and young children aged six to 23 months need to include a variety of nutrient-dense foods, preferably from local sources, to ensure their nutrient needs are met. However, children's diets are likely to be deficient in macronutrients and micronutrients, specifically essential fatty acids, when nutrient-rich diets are not available to them in resource-poor settings. Various interventions are recommended, or have been used, to improve child malnutrition. This document focuses on small quantity lipid based nutrient supplements (SQ-LNS) as an intervention to improve malnutrition, particularly child wasting and stunting. Particularly, it draws on the 2019 Cochrane Review by Das et. al. [DAS_Cochrane_Review_2019]_

.. todo::

  Add a brief introductory paragraph for this document.

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - LNS
    - lipid-based nutrient supplements
    - 
  * - SQ
    - small quantity
    - 
  * - FBF 
    - fortified blended foods
    -
  * - CSB ++
    - corn soy blend plus
    -
  * - MNP
    - Multiple micronutrient powders
    - 

.. todo::

  Fill out table with any abbreviations and their definitions used in this document.

Intervention Overview
-----------------------

:underline:`Lipid-based nutrient supplements`

Supplementary feeding is a strategy that includes provision of extra food to children beyond the normal ration of their home diets
and is aimed at improving the nutritional status or preventing the nutritional deterioration of the target population. One of the nutritional
interventions advocated to address malnutrition among children is **lipid-based nutrient supplements (LNS)**. LNS are a family of
products designed to deliver nutrients to vulnerable people. They are considered 'lipid-based' because most of the energy provided
by these products is from lipids (fats). All LNS provide a range of vitamins and minerals, but unlike most other micronutrient supplements,
LNS also provide *energy, protein and essential fatty acids*. LNS recipes can include a variety of ingredients, but typically have included vegetable fat, peanut or groundnut paste, milk powder and sugar. Based on the energy content, LNS can be small quantity (SQ LNS) providing ˜ 110 to 120 kcal/day (20 g dose), medium quantity (MQ LNS) providing ˜ 250 to 500 kcal/day (45 g to 90 g dose) or large-quantity (LQ LNS) providing
more than 280 kcal/day (> 90 g dose).LNS are nutrient dense, require no cooking before use, and can be stored for months even in warm conditions. 
[DAS_Cochrane_Review_2019]_

:underline:`Alternative recipes and formulations, other than LNS`

Alternative recipes and formulations, other than LNS, are currently
being explored using cereals mixed with other ingredients, including
whey, soy protein isolate, dried skimmed milk, and sesame,
cashew and chickpea paste, among others. These are
fortified with vitamins and minerals and are commonly called fortified
blended foods (FBF). An example of a commonly used FBF
is corn soy blend plus (CSB ++), which is a cooked blend of milled,
heat-treated corn and soybeans that is fortified with a vitamin and
mineral premix. Multiple micronutrient powders (MNP) are also an
alternative way of providing micronutrients. These are single-dose
packets of vitamins and minerals in powder form that can be sprinkled
onto any ready to eat semi-solid food consumed at home,
school or any other point of use. [DAS_Cochrane_Review_2019]_

.. todo::

   Add a general narrative overview of the intervention, including what it is, what outcomes it affects, if/how/when/where it has been used, etc.

.. todo::

  Fill out the following table with a list of known outcomes affected by the intervention, regardless of if they will be included in the simulation model or not, as it is important to recognize potential unmodeled effects of the intervention and note them as limitations as applicable.

  The table below provides example entries for large scale food fortification with iron.

.. list-table:: Affected Outcomes
  :widths: 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note (ex: is this relationship direct or mediated?)
  * - Hemoglobin concentration
    - Increases population mean
    - Yes
    - 
  * - Malaria
    - Increases incidence rate
    - No
    - 

Baseline Coverage Data
++++++++++++++++++++++++

.. todo::

  Document known baseline coverage data, using the table below if appropriate

.. list-table:: Baseline coverage data
  :widths: 15 15 15 15 15
  :header-rows: 1

  * - Location
    - Subpopulation
    - Coverage parameter
    - Value
    - Note
  * - 
    - 
    - 
    - 
    - 

Vivarium Modeling Strategy
--------------------------

.. todo::

  Add an overview of the Vivarium modeling section.

.. todo::

  Fill out the following table with all of the affected measures that have vivarium modeling strategies documented

.. list-table:: Modeled Outcomes
  :widths: 15 15 15 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Outcome type
    - Outcome ID
    - Affected measure
    - Effect size measure
    - Effect size
    - Note
  * - Lung cancer
    - GBD cause
    - c426
    - Preclinical incidence rate
    - Relative risk
    - 0.8 (95% CI: 0.7, 1.01)
    - 

Affected Outcome #1
+++++++++++++++++++++

.. important::

  Copy and paste this section for each affected outcome included in this document

.. todo::

  Replace "Risk Outcome Pair #1" with the name of an affected entity for which a modeling strategy will be detailed. For additional risk outcome pairs, copy this section as many times as necessary and update the titles accordingly.

.. todo::

  Link to existing document of the affected outcome (ex: cause or risk exposure model document)

.. todo::

  Describe exactly what measure the intervention will affect

.. todo::

  Fill out the tables below

.. list-table:: Affected Outcome #1 Restrictions
  :widths: 15 15 15
  :header-rows: 1

  * - Restriction
    - Value
    - Note
  * - Male only
    - 
    - 
  * - Female only
    - 
    - 
  * - Age group start
    - 
    - 
  * - Age group end
    - 
    - 
  * - Other
    - 
    - 

.. list-table:: Affected Outcome #1 Effect Size
  :widths: 15 15 15 
  :header-rows: 1

  * - Population
    - Effect size
    - Note
  * - Malnourished women
    - +50 g birthweight
    - 
  * - Adequately nourished women
    - +10 g birthweight
    - 

.. todo::

  Describe exactly *how* to apply the effect sizes to the affected measures documented above

.. todo::

  Note research considerations related to generalizability of the effect sizes listed above as well as the strength of the causal criteria, as discussed on the :ref:`general research consideration document <general_research>`.

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


References
~~~~~~~~~~

.. [DAS_Cochrane_Review_2019] 
  
  View `DAS Cochrane Review 2019`_

    Preventive lipid‐based nutrient supplements given with complementary foods to infants and young children 6 to 23 months of age for health, nutrition, and developmental outcomes

.. _`DAS Cochrane Review 2019`: https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD012611.pub3/full