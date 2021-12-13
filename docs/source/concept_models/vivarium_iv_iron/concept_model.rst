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


1.0 Background
++++++++++++++

.. _iviron1.1:

1.1 Project overview
--------------------


.. _iviron2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++


.. _iviron3.0:

3.0 Concept model
+++++++++++++++++

.. image:: concept_model.svg

This simulation will be built in a series of subgroups of model components that are summarized below.

.. list-table:: Concept model component subgroups
  :widths: 5 5 20 10
  :header-rows: 1

  * - Priority order
    - Color
    - Subgroup
    - Note
  * - 1
    - Green
    - Interventions and impacts on maternal morbidity and mortality due to maternal disorders and anemia
    - Women of reproductive age (WRA) population model only
  * - 2.0
    - Purple
    - Infant birthweight and its efect on child morbidity and mortality directly as well as through child growth failure and infectious diseases (without the positive feedback loop of infectious diseases on child growth failure)
    - Includes children under five in population model as well as WRA
  * - 2.1
    - N/A
    - Fertility component to familially link WRA to children under five.
    - May be swapped in implementation order with model 2.0.
  * - 3
    - Blue
    - Postpartum depression and breastfeeding behaviors
    - 
  * - 4
    - Yellow
    - Non-standard outcomes, including stillbirths, infertility, and cognition
    - 
  * - 5
    - Orange
    - Orphanhood, care-seeking behaviors, and positive feedback loop between infectious diseases and child wasting
    - 
  * - 6
    - Red
    - a) fertility model that includes birth interval information, b) access to care parameters (antenatal care and in-facility delivery) and correlation with other model components
    - 

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

.. _iviron4.2.1:

4.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~


.. _iviron4.2.2:

4.2.2 Population of interest
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

