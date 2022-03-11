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

.. _2019_concept_model_vivarium_sanofi_multiple_myeloma_phase_2:

======================================================
Vivarium CSU Multiple Myeloma Registries Phase 2
======================================================

.. contents::
  :local:

.. list-table:: Abbreviations
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * -
    -
    -

.. _mm2_1.0:

1.0 Background
++++++++++++++


.. _mm2_1.1:

1.1 Project Overview
--------------------

Our :ref:`Phase 1 multiple myeloma simulation
<2019_concept_model_vivarium_sanofi_multiple_myeloma>` focused on a scale-up of
isatuximab as a first-line treatment in the USA. For Phase 2, the client has
asked us to expand our simulation in the following ways:

1.  Expand the set of mutually exclusive treatment categories beyond the three
    treatment categories considered in Phase 1.

2.  Consider additional patterns of scale-up of Isa. In particular, model an
    uptake of Isa following Dara as a first-line treatment, after a "washout"
    period.

3. Expand the modeled locations beyond the USA.

We gave a `presentation to Sanofi on January 20, 2022 <slides_20220120_>`_
proposing some potential business questions for Phase 2, along with an expanded
set of treatment categories based on treatment guidelines from the `NCCN
<https://www.nccn.org/>`_ as `suggested by Manoj Menon in Sep-Oct 2021
<slides_Manoj_20210924_>`_.

.. _slides_20220120: https://uwnetid.sharepoint.com/:p:/r/sites/ihme_simulation_science_team/_layouts/15/Doc.aspx?sourcedoc=%7BB3EB4DE8-7E6A-4E81-9A4E-F3C4A5F2D6AB%7D&file=20220120%20IHME%20Multiple%20Myeloma%20Simulation%20-%20Phase%202%20Next%20Steps.pptx&action=edit&mobileredirect=true

.. _slides_Manoj_20210924: https://uwnetid.sharepoint.com/:p:/r/sites/ihme_simulation_science_team/_layouts/15/Doc.aspx?sourcedoc=%7B2AC8C5F2-CFE6-4458-93AD-4B378953EED3%7D&file=Simulation_MM_Sept%2024.pptx&action=edit&mobileredirect=true

.. _mm2_1.2:

1.2 Literature Review
---------------------


.. _mm2_2.0:

2.0 Modeling Aims and Objectives
++++++++++++++++++++++++++++++++


3.0 Concept Model Diagram
+++++++++++++++++++++++++

.. note::

  This is the concept model diagram from :ref:`Phase 1
  <2019_concept_model_vivarium_sanofi_multiple_myeloma>`. It may need to be
  updated for Phase 2.

.. image:: ../vivarium_sanofi_multiple_myeloma/concept_model_diagram.svg

4.0 Vivarium Model Components
+++++++++++++++++++++++++++++

4.1 Cause Models
----------------

* :ref:`Multiple Myeloma <2019_cancer_model_multiple_myeloma>`

4.2 Risk Exposure Models
------------------------

4.3 Risk Effects Models
-----------------------

4.4 Intervention Models
-----------------------

5.0 Simulation Scenarios
++++++++++++++++++++++++

6.0 Simulation Parameters
+++++++++++++++++++++++++

6.1 Locations
-------------

6.2 Population and Randomness
-----------------------------

6.3 Timeframe and Intervention Start Dates
------------------------------------------

7.0 Model Builds and Validation Tracking
++++++++++++++++++++++++++++++++++++++++

8.0 Desired Outputs
+++++++++++++++++++

8.1 Final Outputs for Client
----------------------------

8.2 Requested Outputs from Vivarium
-----------------------------------

9.0 Back of the Envelope Calculations
+++++++++++++++++++++++++++++++++++++

10.0 Limitations
++++++++++++++++

11.0 References
+++++++++++++++
