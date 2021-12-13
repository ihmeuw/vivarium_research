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

3.0 Interventions
+++++++++++++++++


.. _iviron3.1:

3.1 Simulation scenarios
------------------------

#. **Baseline:** baseline IFA coverage
#. **Oral iron:** MMS/BEP scale-up
#. **Antenatal IV iron:** MMS/BEP + antenatal IV iron scale-up
#. **Postpartum IV iron:** MMS/BEP + postpartum IV iron scale-up
#. **Antenatal and postpartum IV iron:** MMS/BEP + antenatal and postpartum IV iron scale-up

.. note::

  Scenario comparisons of interest to BMGF will be IV iron scenarios (antenatal IV iron, postpartum IV iron, antenatal + postpartum IV iron) relative to the oral iron scenario. However, all interventions will scale-up from baseline levels of intervention coverage.

.. list-table:: Intervention coverage by scenario
  :header-rows: 1

  * - Scenario
    - IFA coverage
    - MMS/BEP coverage
    - Antenatal IV iron coverage
    - Postpartum IV iron coverage
  * - Baseline
    - To be defined for locations of interest on the :ref:`maternal supplementation intervention document <maternal_supplementation_intervention>`
    - 0
    - 0
    - 0
  * - Oral iron scale-up
    - 0
    - :math:`T * ANC`
    - 0
    - 0
  * - Antenatal IV iron scale-up
    - 0
    - :math:`T * ANC`
    - :math:`T * ANC`
    - 0
  * - Postpartum IV iron scale-up
    - 0
    - :math:`T * ANC`
    - 0
    - :math:`T * IFD`
  * - Antenatal and postpartum IV iron scale-up
    - 0
    - :math:`T * ANC`
    - :math:`T * ANC`
    - :math:`T * IFD`

Where,

.. list-table:: Intervention coverage parameter definitions
  :header-rows: 1

  * - Parameter
    - Description  
    - Value
    - Note
  * - :math:`T`
    - Target coverage
    - 0.9
    - Subject to change after confirmation with BMGF. Not location-specific.
  * - :math:`ANC`
    - Coverage of single antenatal care visit
    - GBD covariate*
    - Location-specific
  * - :math:`IFD`
    - In-facility delivery proportion
    - GBD covariate*
    - Location-specific

.. todo::

  Detail strategy to weight national-level GBD covariates estimates to regional locations of interest

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

