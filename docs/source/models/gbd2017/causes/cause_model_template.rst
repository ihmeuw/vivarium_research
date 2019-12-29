.. _2017_cause_model_template:

====================
Cause Model Template
====================

.. important::

   To begin documenting a cause in GBD 2017 for a Vivarium simulation, start by
   following these steps:

   #. Make a subdirectory :file:`gbd2017/causes/{cause_name}/`, where
      :file:`{cause_name}` is replaced with the (potentially shortened) name of
      the cause you are modeling.  This directory is where you will put all the
      files for your cause model documentation, including this document, image
      files, .csv files, etc.


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

   Add description of cause.

.. admonition:: Todo for template development

   - Confirm the name of this section. Will "Disease Description" be inaccurate
     or confusing if we are modeling a cause that is not technically a disease?
     I was aiming for something that matched everyday usage better than
     "Cause Description."

   - In the above todo box:

     - Add more details about what we're looking for in cause descriptions

   - For the next section, is it important for the cause name to appear in the
     section title, as it currently does, or should we call the section
     something else?

   **Note:** This `custom admonition
   <https://docutils.sourceforge.io/docs/ref/rst/directives.html#generic-admonition>`_
   indicates tasks to do while we write this template, whereas the ordinary
   Todo's (and the "Important" directives) are intended to remain in the
   template to instruct the cause modeler how to fill out the cause model
   document.

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

Cause Hierarchy
+++++++++++++++

Cause Model Diagram
-------------------

State and Transition Data Tables
--------------------------------

.. admonition:: Todo for template development

    Decide on section heading names and structure. E.g. should this section be
    called "Data Description" instead of "State and Transition Data Tables,"
    like it was originally? Is there anything else that belongs in a "Data
    Description" section besides the data tables?

    Are the sections in a good order?

Model Assumptions and Limitations
---------------------------------

Restrictions
++++++++++++

Scope
+++++

Validation Criteria
-------------------

References
----------
