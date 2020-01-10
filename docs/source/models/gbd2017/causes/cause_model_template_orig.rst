.. _2017_cause_model_template_orig:

===============================
Cause Model Template (Original)
===============================

.. important::

   To begin documenting a cause in GBD 2017 for a Vivarium simulation, start by
   following these steps:

   #. Make a subdirectory :file:`gbd2017/causes/{cause_name}/` for your cause
      model documentation where you will put all related files, including this
      document, image files, .csv files, etc. The name :file:`{cause_name}` of
      the subdirectory should be the (potentially shortened) name of the cause
      you are modeling.

   #. Copy this template into your subdirectory and rename
      it :code:`index.rst`.

   #. Replace the internal hyperlink target
      :code:`.. _2017_cause_model_template:` at the top of this file with a
      unique reference label for your cause. The reference label should have the
      form :samp:`.. _2017_cause_{\{cause_name\}}:`, where
      :samp:`{\{cause_name\}}` is replaced with a unique descriptive name or
      abbreviation for your cause.

   #. Replace this document's title

      .. code:: reStructuredText

         ====================
         Cause Model Template
         ====================

      with the full name of your cause in GBD 2017:

      .. code:: reStructuredText

         ==============================
         Full Name of Cause in GBD 2017
         ==============================

      **Note:** Remember to adjust the length of the title's underline
      :code:`======` and overline :code:`======` to match the length of your
      new document title, or you will get errors when Sphinx builds HTML from
      the :file:`index.rst` file.

   #. Once you complete these steps, delete this :code:`.. important::`
      directive from :file:`index.rst`.

Disease Description
-------------------

.. todo::

   Add a description of your cause.

.. admonition:: Todo for template development

   - Confirm the name of this section. Will "Disease Description" be inaccurate
     or confusing if we are modeling a cause that is not technically a disease?
     I was aiming for something that matched everyday usage better than
     "Cause Description."

   - In the above todo box:

     - Add more details about what we're looking for in cause descriptions

   **Note:** This custom admonition indicates tasks to do while we write this
   template, whereas the ordinary Todo's are intended to remain in the template
   to instruct the cause modeler how to fill out the cause model document.

Modeling `{Cause Name}` in GBD 2017
-----------------------------------------

.. important::

   #. Replace `{Cause Name}` in this section's title with the name of your
      cause.

   #. Remember to adjust the length of the section underline
      :code:`--------------` to match the length of your text, or you will get
      errors when Sphinx builds HTML from the :file:`index.rst` file.

   #. Once you complete these steps, delete this :code:`.. important::`
      directive from :file:`index.rst`.

.. todo::

   Describe any aspects of the GBD modeling process that are relevant to the
   design of your cause model.


.. admonition:: Todo for template development

   In the above todo box:

   - Add more details about what we're looking for in descriptions of the GBD
     modeling process

Cause Hierarchy
+++++++++++++++

.. todo::

   Make a :code:`.svg` file showing all ancestors and sequelae of your cause in
   the GBD hierarchy, and replace the filename in the :code:`.. image::`
   directive below with the name of your cause hierarchy image file.

   In this todo box:

   - Add links to example cause hierarchy diagrams and to diagram drawing tools

.. image:: cause_hierarchy_diagram.svg

Cause Model Diagram
-------------------

.. todo::

   Make a :code:`.svg` file showing the states  (as circles) and transitions (as
   arrows) for your cause model, and rename the filename in the :code:`..
   image::` directive below with the name of your cause model image file.

   In this todo box:

   - Add links to example cause model diagrams and to diagram drawing tools

.. image:: cause_model_diagram.svg

State and Transition Data Tables
--------------------------------

.. todo::

    Decide on section heading names and structure. E.g. should this whole
    section be called "Data Description" instead of "State and Transition Data
    Tables," like it was originally? Is there anything else that belongs in a
    "Data Description" section besides these data tables?

.. list-table:: State Definitions
   :widths: 1, 5, 10
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * -
     -
     -

.. list-table:: State Data
   :widths: 1, 5, 5, 10
   :header-rows: 1

   * - State
     - Measure
     - Value
     - Notes
   * - {`State Abbr.`}
     - prevalence
     -
     -
   * - {`State Abbr.`}
     - birth prevalence
     -
     -
   * - {`State Abbr.`}
     - excess mortality rate
     - :math:`\frac{\text{deaths_c}}{\text{population} \,\times\, \text{prevalence_c}}`
     - = :math:`\frac{\text{cause-specific mortality rate}}{\text{prevalence}}`
   * - {`State Abbr.`}
     - disability weight
     - :math:`\displaystyle{\sum_{s\in \text{sequelae_c\{cid\}}}} \scriptstyle{\text{disability_weight}_s \,\times\, \text{prevalence}_s}`
     - = average disability weight over all sequelae
   * - All
     - cause-specific mortality rate
     - :math:`\frac{\text{deaths_c642}}{\text{population}}`
     -

.. list-table:: Transition Data
   :widths: 1, 1, 1, 5, 10
   :header-rows: 1

   * - Transition
     - Source State
     - Sink State
     - Value
     - Notes
   * -
     -
     -
     -
     -

.. list-table:: Data Sources and Definitions
   :widths: 1, 3, 10, 10
   :header-rows: 1

   * - Value
     - Source
     - Description
     - Notes
   * - prevalence_c642
     - como
     - Prevalence of neural tube defects
     -
   * - birth_prevalence_c642
     - como
     - Birth prevalence of neural tube defects
     -
   * - deaths_c642
     - codcorrect
     - Deaths from neural tube defects
     -
   * - population
     - demography
     - Mid-year population for given age/sex/year/location
     -
   * - sequelae_c642
     - gbd_mapping
     - List of 85 sequelae for neural tube defects
     -
   * - prevalence_s{`sid`}
     - como
     - Prevalence of sequela with id `sid`
     -
   * - disability_weight_s{`sid`}
     - YLD Appendix
     - Disability weight of sequela with id `sid`
     -

Model Assumptions and Limitations
---------------------------------

Restrictions
++++++++++++

The following table describes any restrictions on the effects of this cause
(such as being only fatal or only nonfatal), as well as restrictions on the age
and sex of simulants to which different aspects of the cause model apply.

.. list-table:: Restrictions
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     - False
     -
   * - Female only
     - False
     -
   * - YLL only
     - False
     -
   * - YLD only
     - False
     -
   * - YLL age group start
     - Early neonatal
     - GBD age group id 2
   * - YLL age group end
     - 60 to 64
     - GBD age group id 17
   * - YLD age group start
     - Early neonatal
     - GBD age group id 2
   * - YLD age group end
     - 95 plus
     - GBD age group id 235

Scope
+++++

This model is designed to be used for estimating DALYs due to neural tube
defects that are averted from an intervention that directly reduces the birth
prevalence of neural tube defects, such as large-scale fortification of flour
with folic acid, or targeted folic acid supplementation during pregnancy.

This model groups together all three severities of neural tube defects
(anencephaly, encephalocele, and spina bifida), weighted by prevalence. Thus it
is unable to capture any differential effects of an intervention that affects
the birth prevalence of the different subtypes of neural tube defects at
different rates.

.. todo::

   Describe more assumptions and limitations of the model.

Validation Criteria
-------------------

.. todo::

   Describe tests for model validation.

References
----------

.. [GBD-2017-YLD-Appendix-Cause-Model-Template]

   Pages ???-??? in `Supplementary appendex 1 to the GBD 2017 YLD Capstone <YLD
   appendix on ScienceDirect_>`_:

     **(GBD 2017 YLD Capstone)** GBD 2017 Disease and Injury Incidence and
     Prevalence Collaborators. :title:`Global, regional, and national incidence,
     prevalence, and years lived with disability for 354 diseases and injuries
     for 195 countries and territories, 1990–2017: a systematic analysis for the
     Global Burden of Disease Study 2017`. Lancet 2018; 392: 1789–858. DOI:
     https://doi.org/10.1016/S0140-6736(18)32279-7

.. _YLD appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322797-mmc1.pdf
.. _YLD appendix on Lancet.com: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32279-7/attachment/6db5ab28-cdf3-4009-b10f-b87f9bbdf8a9/mmc1.pdf


.. [GBD-2017-CoD-Appendix-Cause-Model-Template]

   Pages ???-??? in `Supplementary appendix 1 to the GBD 2017 CoD Capstone <CoD
   appendix on ScienceDirect_>`_:

     **(GBD 2017 CoD Capstone)** GBD 2017 Causes of Death Collaborators.
     :title:`Global, regional, and national age-sex-specific mortality for 282
     causes of death in 195 countries and territories, 1980–2017: a systematic
     analysis for the Global Burden of Disease Study 2017`. Lancet 2018; 392:
     1736–88. DOI: http://dx.doi.org/10.1016/S0140-6736(18)32203-7

.. _CoD appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322037-mmc1.pdf
.. _CoD appendix on Lancet.com: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32203-7/attachment/5045652a-fddf-48e2-9a84-0da99ff7ebd4/mmc1.pdf

.. tip::

   In the `citations
   <https://docutils.sourceforge.io/docs/user/rst/quickref.html#citations>`_
   above, replace "Pages ???-???" with the correct page numbers for your cause
   in the two appendices, and replace the `Cause-Model-Template` suffix in the
   citation names with the name of your cause. The suffix is necessary because
   Sphinx requires citation names to be unique `throughout the entire
   documentation
   <http://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html#citations>`_.

   You can follow the syntax above to add your own references, and you can cite
   the references such as [GBD-2017-YLD-Appendix-Cause-Model-Template]_ and
   [GBD-2017-CoD-Appendix-Cause-Model-Template]_ from within your text by
   enclosing the full citation name in brackets and adding a trailing
   underscore, like this: :code:`[Full-Citation-Name]_`.

   Delete this :code:`.. tip::` `directive
   <https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#directives>`_
   once you fill in the correct page numbers for your cause in the appendices.

.. admonition:: Todo for template development

  Is there a better solution to the global citation problem than making citation
  names longer to ensure that they're unique?

  The same "append a suffix" rule would also apply to other common citations
  like WHO, CDC, UpToDate, and Wikipedia. For example, the WHO citation for
  Measles would be [WHO-Measles].


  .. (aslo hosted on `Lancet.com <YLD appendix on
  .. Lancet.com_>`_). **Note:** The :title:`GBD 2017 YLD Capstone` is this
  .. publication:
