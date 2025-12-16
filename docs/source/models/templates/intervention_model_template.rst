.. _intervention_model_template:

----------------------------
Intervention Model Template
----------------------------

.. important::

   To begin documenting an intervention for a Vivarium simulation, start by
   following these steps (after you have :ref:`created a new git branch
   <contributing>` to work in):

   #. Make a subdirectory :file:`{intervention_name}/` in the folder
      :file:`intervention_models` , where :file:`{intervention_name}` is replaced with the
      (potentially shortened) name of the intervention you are modeling.  This
      subdirectory is where you will put all the files for your model
      documentation, including this document, image files, .csv files, etc.

   #. Copy this template into your subdirectory and rename
      it :code:`index.rst`.

   #. Replace the `internal hyperlink target
      <https://docutils.sourceforge.io/docs/user/rst/quickref.html#internal-hyperlink-targets>`_
      :code:`.. _intervention_model_template:` at the top of this file with a
      unique reference label for your cause. The reference label should have the
      form :samp:`.. _intervention_{\{intervention_name\}}:`, where
      :samp:`{\{intervention_name\}}` is replaced with a unique descriptive name or
      abbreviation for your cause, e.g. :code:`.. _intervention_bep:`.

   #. Delete this document's title above:

      .. code:: reStructuredText

         ----------------------------
         Intervention Model Template
         ----------------------------

      Once the above title is deleted, all the other section titles will be
      promoted up one level.

==============================
Full Name of Intervention
==============================

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
  :header-rows: 1

  * - Population
    - Effect size
    - Uncertainty
    - Note
  * - Malnourished women
    - Mean difference: +50 g birthweight 
    - No parameter uncertainty or individual-level stochastic uncertainty in effect
    - 
  * - Total eligible population
    - Relative risk of outcome: 0.9, CI: 0.86 to 0.93
    - Use the specified RR estimate and confidence interval bounds to generate a lognormal distribution and randomly sample values to generate draw-level values to represent parameter uncertainty. No individual-level stochastic uncertainty in effect.
    - 

.. note::

  The "Uncertainty" column in this table should provide instructions on how to represent parameter and/or individual-level stocastic uncertainty in the effect size. 

  When specifying a lognormal distribution of uncertainty, be aware that the `code routinely used in vivarium simulations <https://github.com/ihmeuw/vivarium_gates_mncnh/blob/83b8c9991319843c749e9fadbe828087ef38fdf2/src/vivarium_gates_mncnh/utilities.py#L148>`__ to implement such a distribution uses the specified RR value as the distribution median and uses the confidence interval bounds to calculate a standard deviation that is then applied about that median. Care should be taken to confirm that the mean and confidence intervals in your simulation results match your desired behavior. Otherwise, you may provide custom instructions for how to generate and sample from a distribution according to your desired specifications.

.. todo::

  Describe exactly *how* to apply the effect sizes to the affected measures documented above

.. todo::

  Note research considerations related to generalizability of the effect sizes listed above as well as the strength of the causal criteria, as discussed on the :ref:`general research consideration document <general_literature>`.

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~