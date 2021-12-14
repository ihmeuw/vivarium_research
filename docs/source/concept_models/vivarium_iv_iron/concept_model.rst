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

.. _2019_concept_model_vivarium_iv_iron:

===========================
Vivarium Intravenous Iron
===========================

.. contents::
  :local:

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - IV
    - Intravenous
    - 
  * - IDA
    - Iron deficiency anemia
    - 

1.0 Background
++++++++++++++

.. note::

  Gendered terms such as "maternal disorders" and "pregnant/lactating women" are used throughout this document as the existing terminology in the GBD and other literature sources rely on such terms. However, we acknowledge that not all pregnant individuals identify as female and we are working to incorporate more inclusive language such as pregnant indiviudals/parents, chestfeeding, etc. Additionally, our simulation will rely on data specific to male/female sex without consideration of intersex individuals or gender differences, which is a limitation of our analysis.

Anemia, a condition defined by low blood hemoglobin concentration, is a significant cause of morbidity and mortality globally, particularly in low and middle income countries and in sub-Saharan Africa and south Asia. Iron deficiency is a common cause of anemia, although other conditions such as hemoglobinopathies may also contribute to the condition.

Pregnancy is a time of increased iron demands to meet the needs of fetal development. Anemia during pregnancy has several health consequences, including increased risk of adverse health outcomes for mother and child.

Iron supplementation during pregnancy can help meet the increased iron demands during this period and prevent and/or remediate iron deficiency anemia (IDA). However, for those who are severely anemic during pregnancy, intravenous (IV) iron can be a more effective strategy for resolving IDA. Additionally, anemia during the postpartum period also has potential health consequences for mother and child and postpartum IV iron may be beneficial to those who are severely anemic immediately following birth.

.. _iviron2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++

**Objective:** Using the optimistic assumptions for the target product profiles from the Bill and Melinda Gates Foundation, estimate the cost effectiveness of a) IV iron use during pregnancy and b) IV iron use immediately postpartum under the following assumptions:

- Impact measured in terms of a) maternal anemia DALYs averted, and b) infant outcomes and stillbirths
- Assume no large-scale food fortification intervention. Comparator = routine anemia prevention/treatment in pregnancy and postpartum.
- Cost effectiveness estimates specific to all LMICs, disaggregated by region (separate estimates for South Asia and sub-Saharan Africa).

.. _iviron3.0:

3.0 Interventions
+++++++++++++++++


.. _iviron3.1:

3.1 Simulation scenarios
------------------------

.. _iviron3.2:

3.2 Simulation timeframe and intervention start dates
-----------------------------------------------------


.. _ivron4.0:

4.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _iviron4.1:

4.1 Vivarium concept model diagram
----------------------------------

4.1.1 Cause Models
~~~~~~~~~~~~~~~~~~

4.1.2 Joint Cause-Risk Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

4.1.3 Risk Exposure Models
~~~~~~~~~~~~~~~~~~~~~~~~~~

4.1.4 Risk Effects Models
~~~~~~~~~~~~~~~~~~~~~~~~~

4.1.5 Risk-Risk Correlation Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

4.1.6 Feedback Loop Models
~~~~~~~~~~~~~~~~~~~~~~~~~~

4.1.7 Intervention Models
~~~~~~~~~~~~~~~~~~~~~~~~~

.. _iviron4.2:

4.2 Demographics
----------------

4.2.1 Locations
~~~~~~~~~~~~~~~

Locations of interest to this project: 

- Sub-Saharn Africa (location_type=superregion; location_id=166)
- South Asia (location_type=region; location_id=159)
- All low and middle income countries

.. todo::

  Compile all national location IDs included in each of these regional locations of interest using the GBD shared function :code:`get_location_metadata`, `documented here <https://scicomp-docs.ihme.washington.edu/db_queries/current/get_location_metadata.html>`_.

.. _iviron4.2.1:

4.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Model 1:**

.. list-table:: Population Restrictions
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     - False
     -
   * - Female only
     - True
     -
   * - Age group start
     - 10 to 14
     - age_group_id=7
   * - Age group end
     - 50 to 54
     - age_group_id=15

.. todo::

  The GBD defines reproductive age as 10 to 54 years of age. However, many other data sources define reproductive age as 15 to 49 years of age. 

  We should confirm with the BMGF that they would like to model the GBD definition rather than standard definition from other data sources. 

**Later model versions:**

Additionally include children under five in the simulation population. Maternal/child pairs should be explcitly linked in this demographic model to allow for direct correlation between maternal and child risks and causes.

.. todo::

  Add more detail 

.. _iviron4.3:

4.3 Models
----------


.. _iviron4.4:

4.4 Desired outputs
-------------------


.. _iviron4.5:

4.5 Simulation output table
---------------------------

.. _iviron5.0:

5.0 Back of the envelope calculations
+++++++++++++++++++++++++++++++++++++

.. _iviron6.0:

6.0 Limitations
+++++++++++++++

7.0 References
+++++++++++++++

