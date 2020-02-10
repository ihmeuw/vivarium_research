.. _2017_exposure_template:

======================
Risk Exposure Template
======================

.. important::

   To begin documenting a risk exposure in GBD 2017 for a Vivarium simulation, start by
   following these steps (after you have :ref:`created a new git branch
   <contributing>` to work in):

   #. Make a subdirectory :file:`{exposure_name}/` in the folder
      :file:`gbd2017/risks/` , where :file:`{exposure_name}` is replaced with the
      (potentially shortened) name of the exposure you are modeling, such as :file:`unsafe_water_source/` or :file:`low_birthweight_short_gestation/`.  This
      subdirectory is where you will put all the files for your exposure model
      documentation, including this document, image files, .csv files, etc.


   #. Copy this template into your subdirectory and rename
      it :code:`index.rst`.

   #. Replace the `internal hyperlink target
      <https://docutils.sourceforge.io/docs/user/rst/quickref.html#internal-hyperlink-targets>`_
      :code:`.. _2017_cause_model_template:` at the top of this file with a
      unique reference label for your cause. The reference label should have the
      form :samp:`.. _2017_exposure_{\{exposure_name\}}:`, where
      :samp:`{\{exposure_name\}}` is replaced with a unique descriptive name or
      abbreviation for your risk exposure, e.g. :code:`.. _2017_exposure_unsafe_water:`.

   #. Delete this document's title above:

      .. code:: reStructuredText

         ----------------------
         Risk Exposure Template
         ----------------------

      Once the above title is deleted, all the other section titles will be
      promoted up one level.

   #. The subtitle below should now be the document's title. Replace the text
      in the below (sub)title with the full name of your exposure in GBD 2017. For example, if you were modeling the exposure "Low Birth Weight and Short Gestation," then the title

      .. code:: reStructuredText

         ======================================
         Full Name of Risk Exposure in GBD 2017
         ======================================

      should be replaced by

      .. code:: reStructuredText

         ====================================
         Low Birth Weight and Short Gestation
         ====================================

      **Note:** Be sure to adjust the length of the title's underline
      :code:`======` and overline :code:`======` to match the length of your
      new document title, or you will get errors in the `section structure
      <https://docutils.sourceforge.io/docs/user/rst/quickref.html#section-structure>`_
      when Sphinx builds HTML from the :file:`index.rst` file.

   #. Once you complete these steps, delete this :code:`.. important::`
      `directive <https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#directives>`_
      from :file:`index.rst`.


======================================
Full Name of Risk Exposure in GBD 2017
======================================


Risk Exposure Overview
----------------------

Include here a clinical background and overview of the exposure you're modeling.
Note that this is only for the exposure; you will include information on the 
relative risk of the relevant outcomes, and the cause models for those outcomes, 
in a different document.


Risk Exposures Description in GBD
---------------------------------

  - What type of risk model does Type of risk (categorical, continuous, etc.)

  - Which outcomes are affected by this risk?

  - TMREL (high level overview. does it vary by outcome?)

Vivarium Modeling Strategy
--------------------------

Scope
+++++

Assumptions and Limitations
+++++++++++++++++++++++++++

Exposure Model Diagram
++++++++++++++++++++++

Data Description Tables
+++++++++++++++++++++++

 - Constants table

 - Parameters table

 *We discussed following Ali's example with iron deficiency.*

Validation Criteria
+++++++++++++++++++

References
----------