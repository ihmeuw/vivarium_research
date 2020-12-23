.. _2017_risk_effect_smoking:

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
  ^^^^^^^^^^^^^^^

  Section Level 4
  ~~~~~~~~~~~~~~~

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

========================
Smoking Risk Effects
========================

.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

.. todo::

	Provide a brief description of the risk, including potential opportunities for confounding (factors that may cause or be associated with the risk exposure), effect modification/generalizability, etc. by any relevant variables. Note that literature reviews and speaking with the GBD risk modeler will be good resources for this.

GBD 2017 Modeling Strategy
--------------------------

.. note::

	This section will describe the GBD modeling strategy for risk effects. For a description of GBD modeling strategy for risk exposure, see the :ref:`risk exposure <2017_risk_exposure_smoking_forecasted>` page.

The smoking risk factor affects *several* outcomes in GBD, including tuberculosis, lower respiratory tract infections, oesophageal cancer, stomach cancer, bladder cancer, liver cancer, laryngeal cancer, lung cancer, breast cancer, cervical cancer, colorectal cancer, lip and oral cancer, nasopharyngeal cancer, other pharyngeal cancer, pancreatic cancer, kidney cancer, leukaemia, ischaemic heart disease, ischaemic stroke, haemorrhagic stroke, subarachnoid haemorrhage, atrial fibrillation and flutter, aortic aneurysm, peripheral arterial disease, chronic obstructive pulmonary disease, other chronic respiratory diseases, asthma, peptic ulcer disease, gallbladder and biliary tract diseases, Alzheimer disease and other dementias, Parkinson disease (protective), multiple sclerosis, type‐II diabetes, rheumatoid arthritis, low back pain, cataracts, macular degeneration, and fracture.

Notably, the relative risks for the smoking risk factor in GBD are defined separately for current smokers (intensity of smoking) and former smokers (time since quitting). The TMREL for the smoking risk factor is never smokers.

The relative risks for the smoking risk factor cannot be pulled using standard tools. Rather, filepaths to the relative risk data (both for current and former smokers) are available in :download:`this excel document <rr_reference.csv>`.

  The relative risk data for the smoking risk factor are defined as a continous risk curve. This curve is modeled according to "mesh points" that are documented in the above excel file and the risk curve is assumed to connect linearly between each mesh point.

.. todo:: 

	Fill out the following table so that it reflects *all* entities affected by the risk in GBD 2017.

.. list-table:: Affected Entities
   :widths: 5 5 5 5 5
   :header-rows: 1

   * - Outcome
     - Outcome type
     - Outcome ID
     - Affected measure
     - Note
   * - 
     - 
     - 
     - 
     - 

Vivarium Modeling Strategy
--------------------------

.. note::

	This section will describe the Vivarium modeling strategy for risk effects. For a description of Vivarium modeling strategy for risk exposure, see the :ref:`risk exposure <2017_risk_exposure_smoking_forecasted>` page.

.. todo::

  List the risk-outcome relationships that will be included in the risk effects model for this risk factor. Note whether the outcome in a risk-outcome relationship is a standard GBD risk-outcome relationship or is a custom relationship we are modeling for our simulation.

.. list-table:: Risk Outcome Relationships for Vivarium
   :widths: 5 5 5 5 5
   :header-rows: 1

   * - Outcome
     - Outcome type
     - Outcome ID
     - Affected measure
     - Note
   * - Lung cancer
     - Cause
     - 426
     - Incidence
     - 

Lung Cancer Incidence
+++++++++++++++++++++

See the relevant documentation for the :ref:`lung cancer cause model here <2017_lung_cancer>` and the :ref:`forecasted smoking risk exposure model here <2017_risk_exposure_smoking_forecasted>`.

Relative Risk Data
~~~~~~~~~~~~~~~~~~

The lung cancer relative risks cannot be pulled using get_draws or other standard tools.

  The mesh points for the relative risk curves for **current smokers** can be found here: /home/j/WORK/05_risk/risks/TEAM/sub_risks/tobacco/raw_data/metadata/rr/systematic_review_extraction_sheets/draws_for_PAF/426_lung_cancer/draws_pack.csv

  The mesh points for the relative risk curves for **former smokers** can be found here: /home/j/WORK/05_risk/risks/TEAM/sub_risks/tobacco/raw_data/metadata/rr/systematic_review_extraction_sheets/draws_for_PAF/426_lung_cancer/draws_quit.csv

The following code demonstrates how to assign relative risk values to individual simulants based on their exposure values.

.. code-block:: python

  from scipy.interpolate import interp1d

  """
  rr_i =: simulant's individual relative risk
  smoking_status_i =: simulant's smoking status exposure
  draw_x =: selected draw for a given model run
  sex_i =: simulant's sex
  age_group_i =: simulant's age group
  pack_year_exposure_i =: simulant's pack year exposure value, if applicable
  years_since_quitting_exposure_i =: simulant's years since quitting exposure value, if applicable
  """

  if smoking_status_i == 'never':
    rr_i = 1

  elif smoking_status_i == 'current':

    rr_current = pd.read_csv('/home/j/WORK/05_risk/risks/TEAM/sub_risks/tobacco/raw_data/metadata/rr/systematic_review_extraction_sheets/draws_for_PAF/426_lung_cancer/draws_pack.csv')
    rr_current_i = rr_current.loc[rr_current.draw=draw_X].loc[rr_current.sex_id==sex_i].loc[rr_current.age_group_id==age_group_i]
    x = rr_current_i.exposure.values
    y = rr_current_i.rr.values
    current_rr_function_i = interp1d(x, y)

    rr_i = current_rr_function_i(pack_year_exposure_i)

  elif smoking_status_i == 'former':

    rr_former = pd.read_csv('/home/j/WORK/05_risk/risks/TEAM/sub_risks/tobacco/raw_data/metadata/rr/systematic_review_extraction_sheets/draws_for_PAF/426_lung_cancer/draws_quit.csv')
    rr_former_i = rr_former.loc[rr_former.draw=draw_X].loc[rr_former.sex_id==sex_i].loc[rr_former.age_group_id==age_group_i]
    x = rr_former_i.exposure.values
    y = rr_former_i.rr.values
    former_rr_function_i = interp1d(x, y)

    rr_i = former_rr_function_i(years_since_quitting_exposure_i)  

PAF Calculation
~~~~~~~~~~~~~~~

The lung cancer PAF specific to an age, sex, location, and year demographic group for smoking should be calculated according to the following equation:

.. math:: 

  PAF_\text{a,s,l,y} = \frac{\overline{rr_\text{a,s,l,y}} - 1}{\overline{rr_\text{a,s,l,y}}}

Where, :math:`\overline{rr_\text{a,s,l,y}}` is the mean value of relative risks for all simulants in a given age, sex, location, and year demographic group.

Application of Risk Factor
~~~~~~~~~~~~~~~~~~~~~~~~~~

The smoking risk factor should affect the incidence of the preclinical lung cancer cause model state, :math:`incidence_\text{PC}`, such that:

.. math::

  incidence_\text{PC_i} = incidence_\text{PC} * (1 - PAF_\text{a,s,l,y}) * rr_i

Where,

.. list-table:: Parameter Definitions
   :header-rows: 1

   * - Parameter
     - Definition
     - Note
   * - :math:`incidence_\text{PC_i}`
     - Individual simulant's preclinical lung cancer incidence probability
     - 
   * - :math:`incidence_\text{PC}`
     - Population level incidence rate of preclinical lung cancer
     - As defined in :ref:`the lung cancer cause model document <2017_lung_cancer>`
   * - :math:`PAF_\text{a,s,l,y}`
     - Lung cancer PAF for smoking for simulant's demographic group
     - As calculated in the `PAF Calculation`_ section
   * - :math:`rr_i`
     - Individual simulant's relative risk value
     - Assigned as described in the `Relative Risk Data`_ section

Validation and Verification Criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

While validating the exact application of the relative risks will be difficult to do with Vivarium simulation outputs, results should be stratified by smoking status and then, the incidence rates for lung cancer should be lowest for never smokers, higher for former smokers, and highest for current smokers.

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^

This model is limited in that it relies on the GBD relative risk structure that does not differentiate relative risks of former smokers by pack-year history so that current smokers with low pack-year histories who become former smokers may increase their risk of lung cancer by doing so, according to the GBD relative risk curves.

Bias in the Population Attributable Fraction
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As noted in the `Population Attributable Fraction` section of the :ref:`Modeling Risk Factors <models_risk_factors>` document, using a relative risk adjusted for confounding to compute a population attributable fraction at the population level will introduce bias.

.. todo::

	Outline the potential direction and magnitude of the potential PAF bias in GBD based on what is understood about the relationship of confounding between the risk and outcome pair using the framework discussed in the `Population Attributable Fraction` section of the :ref:`Modeling Risk Factors <models_risk_factors>` document.

References
----------

.. todo::

  Update the GBD 2017 Risk Factor Methods appendix citation to be unique to your risk effects page (replace 'Risk-Effects-Model-Template' with '{Risk Name}-Effects')

  Update the appropriate page numbers in the GBD risk factors methods appendix below

  Add additional references as necessary 

.. [GBD-2017-Risk-Factors-Appendix-Risk-Effects-Model-Template]

   Pages ???-??? in `Supplementary appendix 1 to the GBD 2017 Risk Factors Capstone <risk_factors_methods_appendix_>`_:

     **(GBD 2017 Risk Factors Capstone)** GBD 2017 Risk Factor Collaborators. :title:`Global, regional, and national comparative risk assessment of 84 behavioural, environmental and occupational, and metabolic risks or clusters of risks for 195 countries and territories, 1990–2017: a systematic analysis for the Global Burden of Disease Study 2017`. Lancet 2018; 392: 1923-1994. DOI:
     https://doi.org/10.1016/S0140-6736(18)32225-6

.. _risk_factors_methods_appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32225-6/attachment/be595013-2d8b-4552-86e3-6c622827d2e9/mmc1.pdf