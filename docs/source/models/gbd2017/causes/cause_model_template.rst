.. _2017_cause_model_template:

====================
Cause Model Template
====================

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

Disease Description
-------------------

.. todo::

   Add a general clinical overview of the cause.

.. admonition:: Todo for template development

   **Note:** This `custom admonition
   <https://docutils.sourceforge.io/docs/ref/rst/directives.html#generic-admonition>`_
   indicates tasks to do while we write this template, whereas the ordinary
   Todo's (and the "Important" directives) are intended to remain in the
   template to instruct the cause modeler how to fill out the cause model
   document.

   - Confirm the name of this section. Will "Disease Description" be inaccurate
     or confusing if we are modeling a cause that is not technically a disease?
     I was aiming for something that matched everyday usage better than
     "Cause Description."

     - In `Pull Request 91`_, @James suggested dropping the subsection
       altogether and putting the description at the top level.

   - In the above todo box, add more details about what we're looking for in
     cause descriptions, such as:

     - Useful external data sources
     - note to flesh out how this cause kills or causes disability among the
       with condition
     - Important features of the cause (vaccine coverage, is it a progressive
       disease, etc.)
     - Links to other prominent mathematical models of the cause if they exist
       (e.g. @yongqx found like 40 different versions of tb models).


Modeling `{Cause Name}` in GBD 2017
-----------------------------------

.. important::

   #. Replace `{Cause Name}` in this section's title with the name of your
      cause.

   #. Remember to adjust the length of the section underline
      :code:`--------------` to match the length of your text, or you will get
      errors in the `section structure
      <https://docutils.sourceforge.io/docs/user/rst/quickref.html#section-structure>`_
      when Sphinx builds HTML from the :file:`index.rst` file.

   #. Once you complete these steps, delete this :code:`.. important::`
      `directive <https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#directives>`_
      from :file:`index.rst`.

.. admonition:: Todo for template development

  - For this section, is it important for the cause name to appear in the
    section title, as it currently does, or should we call the section
    something else?

    In `Pull Request 91`_, @James said:

      I don't think it needs the cause name. Something like `GBD Modeling
      Strategy` seems fine.

    Also for this section, @James said:

      Point people to yld and cod appendices for their diseases and link to
      http://ghdx.healthdata.org/gbd-2017/code which can serve as an annoying
      to read but authoritative source on how the cause was actually modeled.


Cause Hierarchy
+++++++++++++++

Cause Model Diagram
-------------------

State and Transition Data Tables
--------------------------------

.. admonition:: Todo for template development

    - Decide on section heading names and structure. E.g. should this section be
      called "Data Description" instead of "State and Transition Data Tables,"
      like it was originally?

      In `Pull Request 91`_, @James said:

        I think `Data Description` is fine.

    - Is there anything else that belongs in a "Data Description" section
      besides the data tables?

      In `Pull Request 91`_, @Yongquan said:

        one data-relevant section needed for more complicated models is
        non-standard data sources where external calculation occurs.

    - Add instructions in other sections, including:

      - Using editable :file:`.svg` format for figures
      - For cause model diagram: description of what the bubbles and arrows
        represent. Maybe include svg templates for common diagrams like SI, SIS,
        SIR, etc.
      - For cause hierarchy: description of our strategy for making cause
        hierarchy diagrams (rules + example)
      - For data tables: Template tables and instructions for filling them in

Model Assumptions and Limitations
---------------------------------

.. admonition:: Todo for template development

  - Are the sections in a good order? In `Pull Request 91`_, @Lu said:

      The template looks good to me. I was putting the model assumptions and
      limitations section right after the cause model diagram. But I think
      this order makes more sense.

    And @Yongquan said:

      Model assumptions and/or limitations can be mentioned in summary disease
      model description and fully explained in Model Assumptions and
      Limitations section.

    Whereas @James said:

      I think the restrictions in this section should move up to the GBD Modeling section.

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

    Do we have examples of restrictions we would apply that are different from
    GBD restrictions?

Restrictions
++++++++++++

Scope
+++++

Validation Criteria
-------------------

References
----------
