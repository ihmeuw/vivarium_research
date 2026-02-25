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

.. _2021_risk_exposure_lbwsg:

=============================================
Low Birthweight and Short Gestation: GBD 2021
=============================================

.. contents::
   :local:

Risk Exposure Overview
----------------------

Parameters related to gestational age (time since the start of pregnancy) and infant
size at birth are highly relevant to infant health and can be measured in several ways.
Gestational age at birth and birthweight are continuous measures that each have widely
used cut-offs to define preterm birth (less than 37 weeks gestational age at birth) and
low birth weight (less than 2,500 grams). Notably, these measures are expected to be 
highly correlated as babies who are born prematurely will be, on average, smaller than
babies born at a later gestational age as they have not had as much time to grow.

There are additional meaures such as "small for gestational age" that attempt to classify when 
a particular infant is born at a smaller weight than expected for their particular gestational 
age at birth, but these measures are not in scope of this risk factor.

Risk Exposures Description in GBD
---------------------------------

.. todo::

  Include a description of this risk exposure model in the context of GBD,
  involving but not limited to:

    - What type of statistical model? (categorical, continuous?)

    - How is the exposure estimated? (DisMod, STGPR?)

    - Which outcomes are affected by this risk?

    - TMREL? (This should be a very high level overview. Namely, does the TMREL vary by outcome? The details of the TMREL will be included in the *Risk Outcome Relationship Model* section)

  See [GBD-2021-Risk-Factors-Appendix-LBWSG]_

Vivarium Modeling Strategy
--------------------------

Our strategy for modeling exposure will be the same as for the :ref:`GBD 2019 Low Birth Weight and Short Gestation Model <2019_risk_exposure_lbwsg>`.

Converting GBD's categorical exposure distribution to a continuous exposure distribution
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

In GBD 2021, LBWSG exposure is modeled as an ordered polytomous distribution
specifying the prevalence of births in each 500g x 2week
birthweight--gestational-age bin/category. We first convert this discrete
exposure distribution into a continuous joint exposure distribution of
birthweight and gestational age by assuming a uniform distribution of
birthweights and gestational ages within each bin/category. In this way, each
simulant can be assigned a continuously distributed birthweight and gestational
age, which can then be easily mapped back to the appropriate risk category in
GBD. 

For the :ref:`MNCNH portfolio simulation model <2024_concept_model_vivarium_mncnh_portfolio>`, 
we will implement an "exposure floor" for continuous gestational age of 20 weeks. That is, for the
LBWSG exposure categories with the lowest possible gestational age range (cat2 and cat8), rather than assigning continuous gestational age at birth values according to a uniform distribution of 0-24 weeks, we will use a uniform distribution of 20-24 weeks. This strategy to is avoid illogically short pregnancies for live birth outcomes. Note that the decision of which value to use for the floor is somewhat arbitrary as it is unclear what the earliest possible gestational age would be for a baby to survive delivery. Notably, the shortest gestational age at birth among babies who survived to age one worldwide `is 21 weeks (as of 2024) <https://stories.uiowa.edu/tiniest-us-preemie-goes-home-after-life-saving-care-ui-health-care>`__, so we chose a value smaller than that by an arbitrary margin of one week.

Example Python code (that does not reflect the updated gestational age exposure floor used in the MNCNH portfolio model) for achieving these transformations can be found here:

* `Abie's LBWSG cat-to-continuous notebook
  <abie_lbwsg_cat_to_continuous_notebook_>`_ in the ``vivarium_data_analysis``
  repo has a simple implementation demonstrating what we want.

* `Nathaniel's LBWSGDistribution class <nathaniel_LBWSGDistribution_class_>`_ in
  the ``vivarium_research_lsff`` repo has an implementation for GBD 2019 data
  for a nanosim, using 3 propensities to assign each simulant's exposure.

* The file `low_birth_weight_and_short_gestation.py`_ in the
  ``vivarium_public_health`` repo implements the LBWSG risk factor for Vivarium.

.. _abie_lbwsg_cat_to_continuous_notebook: https://github.com/ihmeuw/vivarium_data_analysis/blob/master/pre_processing/lbwsg/2019_03_19c_lbwsg_cat_to_continuous_abie.ipynb

.. _nathaniel_LBWSGDistribution_class: https://github.com/ihmeuw/vivarium_research_lsff/blob/919a68814a0b9bc838a7e74e424545b3d2b7e48c/nanosim_models/lbwsg.py#L462

.. _low_birth_weight_and_short_gestation.py: https://github.com/ihmeuw/vivarium_public_health/blob/main/src/vivarium_public_health/risks/implementations/low_birth_weight_and_short_gestation.py

.. note::

    The strategy of assuming a uniform distribution on each risk category is
    likely biasing towards overestimating extreme birthweights or gestational
    ages. For example, in the 0-500g category, most babies are probably pretty
    close to 500g, not equally likely to be <1 gram versus 499-500 grams.
    A limitation of this approach is therefore to overestimate the severity of the risk exposure distribution.  Since these extremely high risk categories are quite rare, we expect that the impact of this will be small.  In future work, we could use a more complex transformation to derive continuous values from the risk categories, but we should not pursue this until we have an application where it is clear that this limitation is a risk to the validity of our results.

Restrictions
++++++++++++

.. list-table:: GBD 2021 Risk Exposure Restrictions
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
   * - Age group start
     - 164
     - Birth
   * - Age group end
     - 3
     - Late neonatal

Assumptions and Limitations
+++++++++++++++++++++++++++

.. todo::

  Describe the clinical and mathematical assumptions made for this cause model,
  and the limitations these assumptions impose on the applicability of the
  model.

Data Description
++++++++++++++++

Pulling LBWSG exposure data from GBD 2021
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can pull GBD 2021 exposure data for Low Birthweight and Short Gestation
using the following call to ``get_draws`` (replace :code:`ETHIOPIA_ID` with the
appropriate location IDs for the model you're working on):

.. code-block:: Python

  LBWSG_REI_ID = 339
  ETHIOPIA_ID = 179
  GBD_2021_RELEASE_ID = 9

  lbwsg_exposure = get_draws(
        gbd_id_type='rei_id',
        gbd_id=LBWSG_REI_ID,
        source='exposure',
        location_id=ETHIOPIA_ID,
        year_id=2021,
  #       age_group_id = [164,2,3], # Pulls all three age groups by default
  #       sex_id=[1,2], # Pulls sex_id=[1,2] by default, but data for sex_id=3 also exists
        release_id=GBD_2021_RELEASE_ID
  )

.. note::

  * If ``age_group_id`` is not specified, ``get_draws`` defaults to pulling
    exposure data for all available age groups, which for LBWSG are **164
    (Birth)**, **2 (Early Neonatal)**, and **3 (Late Neonatal)**. Typically
    Vivarium will need exposure data for all three age groups.

  * If ``sex_id`` is not specified, ``get_draws`` defaults to pulling exposure
    data for sex IDs **1 (Male)** and **2 (Female)**. Exposure data is also
    avaialble for sex ID 3 (Both), which takes into account the relative
    populations of males and females in the specified location(s). Typically
    Vivarium will only need the conditional prevalences for males and females
    (sex_id=[1,2]) since we will be initializing our population using GBD's
    population data and stratifying by sex.

.. _rescaling_lbwsg_exposure_data_pulled_from_gbd_2021:

Rescaling LBWSG exposure data pulled from GBD 2021
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note::
  
  The following information has been copied from the GBD 2019 LBWSG exposure
  document. `The notebook linked here <https://github.com/ihmeuw/vivarium_research_lsff_by_wealth_quintile/blob/main/lbwsg_notebooks/2024_07_12_pull_gbd_2021_lbwsg_data.ipynb>`_ 
  demonstrates that the same issue present
  in GBD 2019 that is addressed below is also present in GBD 2021.

.. important::

  **As was the case for GBD 2019, the GBD 2021 exposure data for Low Birthweight**
  **and Short Gestation is potentially misleading as currently stored!**

  Namely, the prevalences of the LBWSG categories returned by ``get_draws`` 
  do **not** add up to 1! To fix the problem, follow these steps:

  1.  Drop rows of the exposure data with ``'parameter' == 'cat125'`` (these
      are precisely the rows with ``'modelable_entity_id' == NaN``). cat125 is
      not a modeled category but rather a residual category automatically added
      by ``get_draws`` because the prevalences that the LBWSG modelers gave to
      central comp did not add up to 1 in each draw (see details :ref:`below
      <details of GBD 2021 LBWSG exposure data issue>`).

  2.  For each draw, divide the prevalence of each of the 58 remaining LBWSG
      exposure categories by the sum of the prevalences for that draw. This
      rescales the prevalences to sum to 1 so that they correctly represent
      probabilities.

  Here is `Python code to perform these steps <rescale_prevalence_function_>`_
  from Nathaniel's `lbwsg module`_ in the ``vivarium_research_lsff`` repo,
  assuming ``lbwsg_exposure`` has been pulled using ``get_draws`` as above:

  .. code-block:: Python

    def rescale_prevalence(exposure):
      """Rescales prevalences to add to 1 in LBWSG exposure data pulled from GBD 2019 by get_draws."""
      # Drop residual 'cat125' parameter with meid==NaN, and convert meid col from float to int
      exposure = exposure.dropna().astype({'modelable_entity_id': int})
      # Define some categories of columns
      draw_cols = exposure.filter(regex=r'^draw_\d{1,3}$').columns.to_list()
      category_cols = ['modelable_entity_id', 'parameter']
      index_cols = exposure.columns.difference(draw_cols)
      sum_index = index_cols.difference(category_cols)
      # Add prevalences over categories (indexed by meid and/or parameter) to get denominator for rescaling
      prevalence_sum = exposure.groupby(sum_index.to_list())[draw_cols].sum()
      # Divide prevalences by total to rescale them to add to 1, and reset index to put df back in original form
      exposure = exposure.set_index(index_cols.to_list()) / prevalence_sum
      exposure.reset_index(inplace=True)
      return exposure

    lbwsg_exposure = rescale_prevalence(lbwsg_exposure)

.. _rescale_prevalence_function: https://github.com/ihmeuw/vivarium_research_lsff/blob/919a68814a0b9bc838a7e74e424545b3d2b7e48c/nanosim_models/lbwsg.py#L220

.. _lbwsg module: https://github.com/ihmeuw/vivarium_research_lsff/blob/main/nanosim_models/lbwsg.py

.. note::

  We should double-check with the LBWSG modelers that rescaling the prevalences
  is a reasonable way to adjust the GBD data for use in our simulations.

.. _details of GBD 2021 LBWSG exposure data issue:

.. todo::

  Add more details about this data issue, e.g.:

  - Documentation from ``get_draws`` about how a residual category is added
    when category prevalences don't sum to 1, under the assumption that the
    TMREL is not explicitly modeled; this assumption is incorrect for LBWSG,
    which *does* explicitly model the TMREL categories.

  - Note that we confirmed with the LBWSG modelers that ``cat125`` is not a
    real category, and we confirmed with central comp that ``cat125`` was in
    fact being added by ``get_draws``.

  - Note that the draws where ``sum(prevalence) > 1`` are precisely the draws
    where ``prevalence('cat125') == 0``, and the draws where ``sum(prevalence)
    == 1`` are precisely the draws where ``prevalence('cat125') > 0``. This
    indicates that in the data the LBWSG modelers provided to central comp,
    there were **no** draws in which the category prevalences summed to 1 like
    they should have: Draws where the total prevalence was less than 1 had a
    nonzero prevalence of ``'cat125'`` added to force the prevalences to sum to
    1, and draws where the total prevalence was greater than 1 had the the
    prevalence of ``'cat125'`` set to 0, leaving the sum of the category
    prevalences greater than 1.

  - Show some statistics of the category prevalence data for one or more
    locations, e.g. how many draws have ``sum(prevalence) > 1``, what is the
    distribution of prevalences of ``'cat125'``, what is the distribution of
    ``sum(prevalence)`` with and without ``'cat125'`` included, etc.

Using LBWSG exposure data in Vivarium
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The probability that a simulant's Low Birthweight and Short Gestation exposure
category is ``cat_i`` should equal the prevalence of ``cat_i`` for the
simulant's age group and sex according to GBD (after rescaling the prevalences
as indicated above). Specifically, the LBWSG prevalence data from GBD should be
used to initialize the exposure categories of simulants as follows:

* Simulants initialized into age group 2 (Early Neonatal) or age group 3 (Late
  Neonatal) **at the beginning of the simulation** should be assigned an LBWSG
  exposure category using the exposure data for **age_group_id 2 or 3**,
  respectively.

* Simulants **born during the simulation** should be assigned an LBWSG exposure
  category using the exposure data for **age_group_id=164 (Birth)**.

* Simulants initialized into **age group 4 (Post Neonatal) or older at the
  beginning of the simulation** should have their LBWSG catgory declared
  **"unknown"** unless there is a specific need to track birthweights and
  gestational ages for older simulants *and* there is additional data beyond GBD
  to inform the exposure distribution in older age groups.

As discussed above, once a simulant is assigned an LBWSG exposure category, they
should be assigned a birthweight and gestational age by assuming the joint
distribution of birthweights and gestational ages is uniform within each
category. Once a simulant's LBWSG category, birthweight, and gestational age
have been assigned, these values remain the same throughout the simulation.

Validation Criteria
+++++++++++++++++++

- Verification: when the assigned continuous birthweight and gestational age at birth exposure values are converted to their corresponding GBD LBWSG exposure categories, the sex/location/draw/year-specific categorical exposure prevalence assigned at birth should match the GBD distribution.

  - See `this notebook <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/verification_and_validation/old_vnv_notebooks/lbwsg_distribution.ipynb>`_ as example that utilizes the interactive simulation and various plotting strategies to evaluate this verification criteria

- Verification: the assigned continuous birthweight and gestational age exposures assigned at birth should not change as simulants age.

- Validation: when the assigned continuous birthweight and gestational age at birth exposure values are converted to their corresponding GBD LBWSG exposure categories, the sex/location/draw/year-specific categorical exposure prevalence among the early and late neonatal age groups (as simulants age past birth) should match the GBD distribution.

  - Meeting this validation criteria is dependent on the models of LBWSG risk effects and neonatal mortality among these age groups.

References
----------

.. [GBD-2021-Risk-Factors-Appendix-LBWSG]

 Pages 326-338 in `Supplementary appendix 1 to the GBD 2021 Risk Factors Capstone <2021_risk_factors_methods_appendix_>`_:

   **(GBD 2021 Risk Factors Capstone)** GBD 2021 Risk Factors Collaborators.
   :title:`Global burden and strength of evidence for 88 risk factors in 204 countries and 811 subnational locations, 1990–2021: a systematic analysis for the Global Burden of Disease Study 2021`. Lancet 2024; **403:** 2162-2203. DOI: https://doi.org/10.1016/s0140-6736(24)00933-4

.. _2021_risk_factors_methods_appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(24)00933-4/attachment/e175b500-3467-4cc5-aff8-ded0c0eea399/mmc1.pdf