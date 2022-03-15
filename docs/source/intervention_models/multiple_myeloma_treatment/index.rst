.. _multiple_myeloma_treatment:

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

==============================
Multiple Myeloma Treatment
==============================

The multiple myeloma treatment model for :ref:`Phase 2 of the project
<2019_concept_model_vivarium_csu_multiple_myeloma_phase_2>` will incorporate
much of the information and strategy from the :ref:`Multiple Myeloma Phase 1
Treatment Model <mm5.3.3>`. The main differences are that we are expanding the
set of mutually exclusive treatment categories, and we will be supplementing
data from literature and expert opinion with patient-level data from Flatiron to
inform our treatment algorithm.

.. contents::
   :local:

.. list-table:: Abbreviations
  :widths: 5 5 10
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - ASCT
    - autologous stem cell transplantation
    -
  * - IMiD
    - immunomodulatory imide drug
    -
  * - PI
    - proteasome inhibitor
    -
  * - MoAB
    - monoclonal antibody
    -
  * - Isa
    - isatuximab
    -
  * - Dara
    - daratumumab
    -
  * - Dex
    - dexamethasone
    -

Links to Related Models
-----------------------

* :ref:`Multiple Myeloma Cause Model <2019_cancer_model_multiple_myeloma>`
* :ref:`Multiple Myeloma Phase 1 Concept Model <2019_concept_model_vivarium_csu_multiple_myeloma>`
* :ref:`Multiple Myeloma Phase 2 Concept Model <2019_concept_model_vivarium_csu_multiple_myeloma_phase_2>`

Intervention Overview
-----------------------

Treatment guidelines for multiple myeloma are complex and varied.
[Rajkumar-and-Kumar-2020]_ and [Nijhof-et-al-2017]_ published recent reviews on
multiple myeloma treatment options and guidelines.

Classes of Drugs for Treating Multiple Myeloma
++++++++++++++++++++++++++++++++++++++++++++++

Important classes of
anti-myeloma drugs are summarized (non-exhaustively) below, according to
[Nijhof-et-al-2017]_:

.. list-table:: Select anti-myeloma drug classes
   :header-rows: 1

   * - Class
     - Abbreviation
     - Drugs
   * - Immunomodulatory imide drugs
     - IMiDs
     - thalidomide, lenalidomide, pomalidomide
   * - Proteasome inhibitors
     - PIs
     - bortezomib, carfilzomib, ixazomib, marizomib, oprozomib
   * - Monoclonal antibodies
     - MoABs
     - isatuximab (anti-CD38), daratumumab (anti-CD38), MOR202 (anti-CD38), elotuzamab (anti-CS1/anti-SLAM7), denosumab (anti-RANKL), siltuximab (anti-IL6), IPH2101 (anti-KIR2DL1/2/3)
   * - Corticosteroids
     - steroids
     - dexamethasone, prednisone

Treatment Algorithm Flowcharts
++++++++++++++++++++++++++++++

.. figure:: Rajkumar_2020_Fig1_line_1_treatment.webp

  Approach to the treatment of newly diagnosed myeloma in transplant-eligible
  **(a)** and transplant-ineligible **(b)** patients. VRd, Bortezomib,
  lenalidomide, dexamethasone; DRd, daratumumab, lenalidomide, dexamethasone;
  Dara-VRd, daratumumab, bortezomib, lenalidomide, dexamethasone; ASCT,
  autologous stem cell transplantation.

Affected Outcomes
+++++++++++++++++

.. todo::

  Fill out the following table with a list of known outcomes affected by the intervention, regardless of if they will be included in the simulation model or not, as it is important to recognize potential unmodeled effects of the intervention and note them as limitations as applicable.

.. list-table:: Affected Outcomes
  :widths: 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note
  * -
    -
    -
    -

Baseline Coverage Data
++++++++++++++++++++++++

We plan to use Flatiron to inform baseline coverage of each treatment regimen.

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

Treatment Regimen Categories
++++++++++++++++++++++++++++

The Phase 1 simulation only considered three categories of treatment regimen:
isatuximab-containing, daratumumab-containing, and other. Based on conversations
with the client and with our clinical expert Manoj Menon, we plan to expand the
modeled treatment categories to the following set of 16 mutually exclusive
categories:

.. list-table:: Modeled Treatment Regimen Categories
  :widths: 5 10 8 15
  :header-rows: 1

  * - Enumeration
    - Treatment category
    - Supercategory
    - Notes
  * - 1
    - PI/Dex
    -
    -
  * - 2
    - IMID/Dex
    -
    -
  * - 3
    - PI/IMID/Dex
    -
    -
  * - 4
    - Chemo/PI/Dex
    -
    -
  * - 5
    - Chemo/IMID/Dex
    -
    -
  * - 6
    - Dara/bortezomib/Dex
    - Dara/PI/Dex
    -
  * - 7
    - Dara/carfilzomib/Dex
    - Dara/PI/Dex
    -
  * - 8
    - Dara/ixazomib/Dex
    - Dara/PI/Dex
    -
  * - 9
    - Dara/lenalidomide/Dex
    - Dara/IMID/Dex
    -
  * - 10
    - Dara/pomalidomide/Dex
    - Dara/IMID/Dex
    -
  * - 11
    - Dara/thalidomide/Dex
    - Dara/IMID/Dex
    -
  * - 12
    - Isa/PI/Dex
    -
    -
  * - 13
    - Isa/IMID/Dex
    -
    -
  * - 14
    - Dara/PI/Chemo/Dex
    -
    -
  * - 15
    - Dara/PI/IMID/Dex
    -
    -
  * - 16
    - Other
    -
    -

.. todo::

  Verify the definitions of the treatment regimen categories with Manoj after
  checking what drugs show up in Flatiron data. That is, exactly which drugs
  should we include in each drug class (IMiD, PI, chemo, etc.), and what will be
  the consequences of lumping everything else into "Other"?

Modeled Affected Outcomes
+++++++++++++++++++++++++

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
  * -
    -
    -
    -
    -
    -
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
  * -
    -
    -

.. todo::

  Describe exactly *how* to apply the effect sizes to the affected measures documented above

.. todo::

  Note research considerations related to generalizability of the effect sizes listed above as well as the strength of the causal criteria, as discussed on the :ref:`general research consideration document <general_research>`.

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
