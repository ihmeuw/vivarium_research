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

.. _intervention_hypothetical_alzheimers_treatment:

========================================
Hypothetical Alzheimer's Treatment
========================================

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
  * - 
    - 
    - 

.. todo::

  Fill out table with any abbreviations and their definitions used in this document.

Intervention Overview
-----------------------

.. graphviz::

    digraph NN_decisions {
        rankdir = TB;
        el [label="BBBM test eligible"]

        pos [label="BBBM test positive", style=dashed]
        neg [label="BBBM test negative (lasts 3y)"]

        wait [label="Waiting for treatment (avg 6 mo)"]
        no_treat [label="No treatment effect, will never initiate treatment"]

        in_treat [label="In treatment (lasts 6 mo)"]  # do we need this?

        treat [label="Full treatment effect (lasts 5y)"]

        disc [label="Discontinues treatment"]

        wane [label="Waning treatment effect (linear HR increase to 1 over 9y)"]


        el -> pos  [label = "90%"]
        el -> neg [label = "10%"]
        neg -> el [label = "3y passes, can be re-tested"]

        pos -> wait [label = "Eligible to initiate treatment (propensity < year/location-specific value). Immediately on test."]
        pos -> no_treat [label = "Ineligible to initiate treatment (propensity >= value). Immediate."]

        wait -> in_treat [label = "Starts treatment (chance each time step? math?)"]
        in_treat -> treat [label = "90% (after 1 time step)"]
        in_treat -> disc [label = "10% (after 1 time step"]

        treat -> wane [label = "5y passes"]

        wane -> no_treat [label = "9y passes"]
    }

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

  Note research considerations related to generalizability of the effect sizes listed above as well as the strength of the causal criteria, as discussed on the :ref:`general research consideration document <general_literature>`.

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~