.. _intervention_wasting_treatment:

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


===============================================
Treatment and management for acute malnutrition 
===============================================

This documentation focuses on treatment and management of acute malnutrition in Ethiopia based on 2019 National Guideline for the Management of Acute Malnutrition. [EMOH]_

The prevalence of stunting in Ethiopia has declined from 58% in 2000 to 38% in 2016. However, the prevalence of wasting has remained fairly static at 12% in 2000 and 10% in 2016. To address malnutrition in all its forms, the Government is applying two programmatic approaches. The first focuses on increasing access to and availability of food through improved economic growth, better agricultural production systems along with promotion of good nutrition practices and prevention of malnutrition. The second approach aims to strengthen early warning systems and timely emergency response, including wide-scale delivery of services for the management of acute
malnutrition.

The Federal Ministry of Health (FMOH) developed the first Protocol for the Management of Severe Acute
Malnutrition (SAM) in 2007, and the Guideline for the Management of Moderate Acute Malnutrition (MAM)
in 2012. This is the latest National Guideline for the Management of Acute Malnutrition in Ethiopia (2019). It includes the latest World Health Organisation (WHO) guidelines and recommendations, and emerging national and international evidence. It is also aligned to the National Nutrition Programme (NNP) II 2016-2020, the National Food and Nutrition Policy and the Health Sector Transformation Plan (HSTP) 2015/16 - 2019/20.

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
  * - FMOH
    - Federal ministry of health
  * - SAM
    - severe acute malnutrition 
  * - MAM
    - moderate acute malnutrition
  * - DHS
    - demographic health survey
  * - IMNICI
    - Integrated Management of Newborn and Childhood illness


Intervention Overview
---------------------

This flow chart summarizes the core aspects of the care and treatment for SAM and MAM, and integration into the
routine health system. 

.. image:: flow_chart_management_of_acute_malnutrition
   :alt: Flow chart for the management of acute malnutrition

.. todo::

   Add a general narrative overview of the intervention, including what it is, what outcomes it affects, if/how/when/where it has been used, etc.

Health system delivery
++++++++++++++++++++++


0-6 months
++++++++++

Infants 0-6 months: Recent weight loss or failure to gain weight OR Ineffective feeding (attachment, position, and suckling)


Severe acute malnutrition
~~~~~~~~~~~~~~~~~~~~~~~~~

With medical complications
^^^^^^^^^^^^^^^^^^^^^^^^^^
Without medical complications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


6-60 months
+++++++++++

Moderate acute malnutrition
~~~~~~~~~~~~~~~~~~~~~~~~~~~
- Children 6-59 months: WFH <-2 z-score

With medical complications
^^^^^^^^^^^^^^^^^^^^^^^^^^

Without medical complications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Severe acute malnutrition
~~~~~~~~~~~~~~~~~~~~~~~~~
- Children 6-59 months: WFH ≥ -3 to <-2 z-scores

With medical complications
^^^^^^^^^^^^^^^^^^^^^^^^^^

Without medical complications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

  We have been in contact with EMOH but seems like they only have DHIS data which does not give us coverage rate. We will dig a bit more into the literature, or reach out to CIFF/UNICEF since UNICEF is the implementation partner for treatment in Ethiopia. 

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
----------

.. [EMOH] Government of Ethiopia, Federal Ministry of Health. 2019. 
   National Guideline for the Management of Acute
   Malnutrition. Addis Ababa: FMOH.

.. [xx] Chapter 13: Measles.
   :title:`Epidemiology and Prevention of Vaccine-Preventable Diseases
   (The Pink Book, 13th Edition)`.
   Centers for Disease Control and Prevention, 2015.
   Retrieved 13 Nov 2019.
   https://www.cdc.gov/vaccines/pubs/pinkbook/meas.html