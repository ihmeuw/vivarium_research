.. _risk_exposure_model_template:

----------------------------
Risk Exposure Model Template
----------------------------

.. important::

   To begin documenting a risk exposure in GBD 2019 for a Vivarium simulation, start by
   following these steps (after you have :ref:`created a new git branch
   <contributing>` to work in):

   #. Make a subdirectory :file:`{risk_exposure_name}/` in the folder
      :file:`gbd2019/risks/` , where :file:`{risk_exposure_name}` is replaced 
      with the (potentially shortened) name of the risk exposure you are 
      modeling, such as :file:`unsafe_water_source/` or 
      :file:`low_birthweight_short_gestation/`.  This subdirectory is where you 
      will put all the files for your exposure model documentation, including 
      this document, image files, .csv files, etc.


   #. Copy this template into your subdirectory and rename
      it :code:`index.rst`.

   #. Replace the `internal hyperlink target
      <https://docutils.sourceforge.io/docs/user/rst/quickref.html#internal-hyperlink-targets>`_
      :code:`.. _2019_risk_exposure_template:` at the top of this file with a
      unique reference label for your cause. The reference label should have the
      form :samp:`.. _2019_risk_exposure_{\{risk_exposure_name\}}:`, where
      :samp:`{\{risk_exposure_name\}}` is replaced with a unique descriptive name or
      abbreviation for your risk exposure, e.g.
      :code:`.. _2019_risk_exposure_unsafe_water:`.

   #. Delete this document's title above:

      .. code:: reStructuredText

         ----------------------
         Risk Exposure Template
         ----------------------

      Once the above title is deleted, all the other section titles will be
      promoted up one level.

   #. The subtitle below should now be the document's title. Replace the text
      in the below (sub)title with the full name of your risk exposure in GBD 
      2019. For example, if you were modeling the exposure "Low Birth Weight 
      and Short Gestation," then the title

      .. code:: reStructuredText

         ======================================
         Full Name of Risk Exposure in GBD 2019
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
Full Name of Risk Exposure in GBD 2019
======================================


Risk Exposure Overview
----------------------

Include here a clinical background and overview of the risk exposure you're 
modeling. Note that this is only for the exposure; you will include information 
on the relative risk of the relevant outcomes, and the cause models for those 
outcomes, in a different document.


Risk Exposures Description in GBD
---------------------------------

Include a description of this risk exposure model in the context of GBD, 
involving but not limited to:

  - What type of statistical model? (categorical, continuous?)

   - If a continuous model, the type of distribution (example: normal distribution) as well as distribution parameters (most often mean and standard deviation) must be specified.

      - As discussed on the :ref:`ensemble distribution document <vivarium_best_practices_ensemble_distributions>`, if the continuous model is an ensemble distribution, the following parameters must be specified:

         - Exposure mean
         - Exposure standard deviation
         - Ensemble distribution weights
         - XMIN and XMAX values

  - How is the exposure estimated? (DisMod, STGPR?)

  - Which outcomes are affected by this risk?

  - TMREL? (This should be a very high level overview. Namely, does the TMREL vary by outcome? The details of the TMREL will be included in the *Risk Outcome Relationship Model* section)

Vivarium Modeling Strategy
--------------------------

Include here an overview of the Vivarium modeling section

Restrictions
++++++++++++

.. list-table:: GBD 2019 Risk Exposure Restrictions
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
   * - Age group start
     -
     -
   * - Age group end
     -
     -

..	todo::

	Determine if there's something analogous to "YLL/YLD only" for this section

Assumptions and Limitations
+++++++++++++++++++++++++++

Describe the clinical and mathematical assumptions made for this cause model,
and the limitations these assumptions impose on the applicability of the
model.

Risk Exposure Model Diagram
+++++++++++++++++++++++++++

Include diagram of Vivarium risk exposure model.

Data Description Tables
+++++++++++++++++++++++

As of 02/10/2020: follow the template created by Ali for Iron Deficiency, copied 
below. If we discover it's not general enough to accommodate all exposure types,
we need to revise the format in coworking. 

.. list-table:: Constants 
	:widths: 10, 5, 15
	:header-rows: 1

	* - Constant
	  - Value
	  - Note
	* - 
	  - 
	  - 

.. list-table:: Distribution Parameters
	:widths: 15, 30, 10
	:header-rows: 1

	* - Parameter
	  - Value
	  - Note
	* - 
	  - 
	  -

Validation Criteria
+++++++++++++++++++

..	todo::
	Fill in directives for this section

References
----------