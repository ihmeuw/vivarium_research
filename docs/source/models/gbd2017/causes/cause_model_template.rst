.. _2017_cause_model_template:

====================
Cause Model Template
====================

.. _Pull Request 64: https://github.com/ihmeuw/vivarium_research/pull/64
.. _Pull Request 76: https://github.com/ihmeuw/vivarium_research/pull/76
.. _Pull Request 91: https://github.com/ihmeuw/vivarium_research/pull/91

.. important::

   To begin documenting a cause in GBD 2017 for a Vivarium simulation, start by
   following these steps (after you have :ref:`created a new git branch
   <contributing>` to work in):

   #. Make a subdirectory :file:`{cause_name}/` in the folder
      :file:`gbd2017/causes/` , where :file:`{cause_name}` is replaced with the
      (potentially shortened) name of the cause you are modeling.  This
      subdirectory is where you will put all the files for your cause model
      documentation, including this document, image files, .csv files, etc.


   #. Copy this template into your subdirectory and rename
      it :code:`index.rst`.

   #. Replace the `internal hyperlink target
      <https://docutils.sourceforge.io/docs/user/rst/quickref.html#internal-hyperlink-targets>`_
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
      new document title, or you will get errors in the `section structure
      <https://docutils.sourceforge.io/docs/user/rst/quickref.html#section-structure>`_
      when Sphinx builds HTML from the :file:`index.rst` file.

   #. Once you complete these steps, delete this :code:`.. important::`
      `directive <https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#directives>`_
      from :file:`index.rst`.

.. todo::

   Add a general clinical overview of the cause.

.. admonition:: Todo for template development

   **Note:** This `custom admonition
   <https://docutils.sourceforge.io/docs/ref/rst/directives.html#generic-admonition>`_
   indicates tasks to do while we write this template, whereas the ordinary
   Todo's (and the "Important" directives) are intended to remain in the
   template to instruct the cause modeler how to fill out the cause model
   document.

   - In the above todo box, add more details about what we're looking for in
     cause descriptions, such as:

     - Useful external data sources
     - note to flesh out how this cause kills or causes disability among the
       with condition
     - Important features of the cause (vaccine coverage, is it a progressive
       disease, etc.)
     - Links to other prominent mathematical models of the cause if they exist
       (e.g. @yongqx found like 40 different versions of tb models).

   - Add instructions in other sections, including:

     - Using editable :file:`.svg` format for figures
     - For cause model diagram: description of what the bubbles and arrows
       represent. Maybe include svg templates for common diagrams like SI, SIS,
       SIR, etc.
     - For cause hierarchy: description of our strategy for making cause
       hierarchy diagrams (rules + example)
     - For data tables: Template tables and instructions for filling them in
     - Expand Todo's for Vivarium model `Scope` and `Assumptions and
       Limitations` sections, with specific examples and guidelines
     - Add instructions for filling out the GBD Restrictions table


GBD 2017 Modeling Strategy
--------------------------

.. admonition:: Todo for template development

  In `Pull Request 91`_, @James suggested adding the following to this section:

    Point people to yld and cod appendices for their diseases and link to
    http://ghdx.healthdata.org/gbd-2017/code which can serve as an annoying
    to read but authoritative source on how the cause was actually modeled.


Cause Hierarchy
+++++++++++++++

Restrictions
++++++++++++

The following table describes any restrictions in GBD 2017 on the effects of
this cause (such as being only fatal or only nonfatal), as well as restrictions
on the ages and sexes to which the cause applies.

.. list-table:: GBD 2017 Cause Restrictions
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     -
     -
   * - Female only
     -
     -
   * - YLL only
     -
     -
   * - YLD only
     -
     -
   * - YLL age group start
     -
     -
   * - YLL age group end
     -
     -
   * - YLD age group start
     -
     -
   * - YLD age group end
     -
     -


Vivarium Modeling Strategy
--------------------------

Scope
+++++

.. todo::

  Describe which aspects of the disease this cause model is designed to
  simulate, and which aspects it is **not** designed to simulate.

Assumptions and Limitations
+++++++++++++++++++++++++++

.. todo::

  Describe the clinical and mathematical assumptions made for this cause model,
  and the limitations these assumptions impose on the applicability of the
  model.

.. admonition:: Todo for template development

  What else goes in the `Vivarium Modeling Strategy` section? Should there be
  any other subsections besides `Scope` and `Assumptions and Limitations`?

Cause Model Diagram
-------------------

Data Description
----------------

.. admonition:: Todo for template development

  Decide on section heading name(s) and structure for the data section. See
  comments by @Beatrix and @Nathaniel in `Pull Request 64`_ discussing the
  following questions:

  - Should this section be called "Data Description" as it is now, or would
    something like "State and Transition Data Tables" be more descriptive?

    In `Pull Request 91`_, @James said:

      I think `Data Description` is fine.

  - Should this section have subsections (such as "State and Transition Data
    Tables")? Is there anything else that belongs in a "Data Description"
    section besides the data tables?

    In `Pull Request 91`_, @Yongquan said:

      one data-relevant section needed for more complicated models is
      non-standard data sources where external calculation occurs.

    Does "non-standard data sources" warrant a subsection, even if we don't need
    it for all cause models?

Validation Criteria
-------------------

References
----------

.. admonition:: Todo for template development

  Decide on section names and overall structure.

  **Question:** Are the sections in a good order?

  In `Pull Request 91`_, @Lu said:

    The template looks good to me. I was putting the model assumptions and
    limitations section right after the cause model diagram. But I think
    this order makes more sense.

    ("This order" referring to: `Cause Model Diagram`, `Data Description`,
    `Model Assumptions and Limitations`.)

  And @Yongquan said:

    Model assumptions and/or limitations can be mentioned in summary disease
    model description and fully explained in Model Assumptions and
    Limitations section.

  Whereas @James said:

    I think the restrictions in this section (`Model Assumptions and
    Limitations`) should move up to the GBD Modeling section.

    Also, perhaps we should have a section following the GBD section called
    `vivarium modeling strategy` which would include the scope and the
    restrictions we apply to the model (which might be different than GBD's
    restrictions). To serve as a narrative description accompanying the cause
    model diagram and data tables.

  On the other hand, @Kiran said:

    I am good with this structure. But, we have to make changes to the
    causes that are finished. Also, for restrictions I like it under
    Assumptions and Limitations section. We can add subsections if there are
    different types of restrictions.

  **Question:** Do we have examples of restrictions we would apply that are
  different from GBD restrictions?

  Also, in `Pull Request 76`_, @Beatrix said:

    I kind of like `Model Assumptions and Limitations` before the data
    description, because i like the idea of going from most high-level to most
    nitty-gritty as you go through the document. In that schema, in my mind,
    it would go:

    | model diagram,
    | then limitations,
    | then data description
    |
    | (as kiran has).

    If we wanted the diagram near the tables that reference it (which i also
    like), what if we did model diagram, then data descriptions, then
    limitations? to maintain some of the newspaper-style high level --->
    detailed ordering?
