.. _2019_risk_effect_wasting:

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
  ^^^^^^^^^^^^^^^

  Section Level 4
  ~~~~~~~~~~~~~~~

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

===========================
Child Wasting Risk Effects
===========================

.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

Child wasting, defined as low weight for heigh/length, is a measure of acute malnutrition that is associated with increased mortality and susceptibility to infectious disease. More information can be found in the :ref:`wasting risk exposure model document <2020_risk_exposure_wasting_state_exposure>`.

GBD Modeling Strategy
----------------------


Vivarium Modeling Strategy
--------------------------

.. note::

   This section will describe the Vivarium modeling strategy for risk effects.
   For a description of Vivarium modeling strategy for risk exposure, see the
   :ref:`wasting risk exposure model document <2020_risk_exposure_wasting_state_exposure>`.

Diarrheal diseases
+++++++++++++++++++++++++

For the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>`, the relaive risks for wasting on diarrheal diseases should be applied to the diarrheal diseases excess mortality rate and not the diarrheal diseases incidence rate in the following manner: 

.. code-block:: python

   incidence_diarrheal_diseases_i = incidence_diarrheal_diseases
   excess_mortality_diarrheal_diseases_i = (excess_mortality_diarrheal_diseases 
                                             * (1 - PAF_wasting_diarrheal_diseases) 
                                             * RR_wasting_diarrheal_diseases_i)

Validation and Verification Criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Verification and validation criteria from the :ref:`diarrheal diseases cause model <2019_cause_diarrhea>` should remain true.
#. Verification and validation criteria from the :ref:`dynamic child wasting exposure model <2020_risk_exposure_wasting_state_exposure>` should remain true.

.. todo::

   List additional V&V criteria

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Lower respiratory infections and measles
+++++++++++++++++++++++++++++++++++++++++++



Validation and Verification Criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Verification and validation criteria from the LRI and measles cause model documents should remain true.
#. Verification and validation criteria from the :ref:`dynamic child wasting exposure model <2020_risk_exposure_wasting_state_exposure>` should remain true.

.. todo::

   List additional V&V criteria

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^


References
----------

