.. _2019_risk_correlation_maternal_bmi_hgb_birthweight:

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

=============================================================================
Maternal BMI, Maternal Hemoglobin, and Infant Birthweight Risk Correlation
=============================================================================

Risk Exposures Overview
------------------------

Maternal undernourishment, including correlated body mass index (BMI) and anemia exposures, is associated adverse child health outcomes, including infant birthweight.

Risk Exposures in GBD
-----------------------

Links to documentation for relevant risk exposure pages include:

- :ref:`GBD 2019 Low birthweight short gestation risk exposure <2019_risk_exposure_lbwsg>`

- :ref:`Maternal BMI risk exposure conditional on hemoglobin status <2019_risk_exposure_maternal_bmi_hgb>`

- :ref:`Hemoglobin exposure <2019_hemoglobin_model>`

Vivarium Modeling Strategy
----------------------------

Correlation
++++++++++++

.. note::

   The strategy for modeling these risk-risk correlations related was developed for the needs of the :ref:`Intravenous Iron Intervention simulation <2019_concept_model_vivarium_iv_iron>`. Different strategies may be more appropriate for different project needs and should be reevaluated when necessary.

We will model an association between a joint categorical distribution of maternal BMI and hemoglobin with infant birthweight. The association between maternal BMI/hemoglobin categories will be measured in continuous shifts in infant birthweight. The magnitude of these shifts were informed from [Woman-First-Trial-Shifts]_ data as provided by the BMGF (this data is also used to inform the :ref:`pregnancy BMI risk exposure conditional on hemoglobin levels <2019_risk_exposure_maternal_bmi_hgb>` and is discussed in more detail on that page). :download:`A summary of the data is available here <BMGF trial data.docx>`. :download:`Mean differences and associated confidence intervals were calculated in this document <md calculations.xlsx>`.

.. note::

   Modeling strategy may be adapted if BMGF data is available for proportion born with low BW (<2500g) only (rather than mean birthweight). Briefly, in this case, we will use the probability born low birth weight for each maternal BMI/hemoglobin category to sample from LBWSG exposure categories with BW<2500 grams or from categories with BW>=2500g rather than apply shifts to birthweight values sampled from the overall LBWSG exposure distribution.

.. warning::

   Do not use these *unadjusted* shifts in the simulation directly. They need to be adjusted according to the steps that come below this table before they are used in the simulation.

.. list-table:: Joint pre-pregnancy BMI and early pregnancy hemoglobin category **unadjusted** birthweight shifts
   :header-rows: 1 

   *  - Category
      - Pre-pregnancy/first trimester BMI exposure
      - Early pregnancy "untreated" hemoglobin exposure
      - Birthweight shift
      - Note
   *  - cat4
      - >=18.5
      - >=10
      - 0
      - TMREL/Reference group
   *  - cat3
      - <18.5
      - >=10
      - -182 (95% CI: -239, -125; normal distribution of uncertainty)
      - Relative to cat4
   *  - cat2
      - >=18.5
      - <10
      - -94 (95% CI: -142, -46; normal distribution of uncertainty)
      - Relative to cat4
   *  - cat1
      - <18.5
      - <10
      - -275 (95% CI: -336, -213; normal distribution of uncertainty)
      - Relative to cat4
   
Given that,

.. math::

   BW_\text{cat{1,2,3} - cat4} = \overline{BW}_\text{cat{1,2,3}} - \overline{BW}_\text{cat4}

.. math::

   \overline{BW}_{population} = \sum_{cat}^{n} p_\text{cat} * \overline{BW}_\text{cat}

Then the difference between maternal BMI strata and the population mean can be represented as:

.. math::

   BW_\text{cat4 - population} = p_\text{cat1} * BW_\text{cat1 - cat4}
                           + p_\text{cat2} * BW_\text{cat2 - cat4}
                           + p_\text{cat3} * BW_\text{cat3 - cat4}

Where :math:`p_\text{cat}` represents the exposure prevalence of a given maternal BMI/hemoglobin category, defined below:

.. list-table:: Category prevalence values
   :header-rows: 1

   *  - Parameter
      - Definition
      - Value
      - Note
   *  - :math:`p_\text{cat1}`
      - Prevalence of hemoglobin < 10 g/dL and BMI < 18.5
      - p_low_hgb :math:`\times` p_low_bmi_given_low_hgb
      - 
   *  - :math:`p_\text{cat2}`
      - Prevalence of hemoglobin < 10 g/dL and BMI >= 18.5
      - p_low_hgb :math:`\times` (1 - p_low_bmi_given_low_hgb)
      - 
   *  - :math:`p_\text{cat3}`
      - Prevalence of hemoglobin >= 10 g/dL and BMI < 18.5
      - (1 - p_low_hgb) :math:`\times` p_low_bmi_given_high_hgb
      - 
   *  - :math:`p_\text{cat4}`
      - Prevalence of hemoglobin >= 10 g/dL and BMI >= 18.5
      - (1 - p_low_hgb) :math:`\times` (1 - p_low_bmi_given_high_hgb)
      - 
   *  - p_low_hgb
      - Prevalence of hemoglobin less than 10 g/L
      - `Available at the location/age/draw-specific level here <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/parameter_aggregation/pregnant_proportion_with_hgb_below_100_age_specific.csv>`_
      - `Calculated in this notebook <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/parameter_aggregation/aggregated_hgb_below_100.ipynb>`_
   *  - p_low_bmi_given_low_hgb
      - Prevalence of BMI < 18.5 given hemoglobin < 10 g/L
      - Defined on the :ref:`hemoglobin and BMI exposure document <2019_risk_exposure_maternal_bmi_hgb>`
      - NOTE: current simulation implementation and current documentation for this parameter are out of date as of 5/9/2022. When this is implemented, either a) update simulation impementation of low BMI exposure to the currently documented values and proceed, or b) use the low BMI exposure value consistent with the existing implementation in the simulation (distribution that does not vary by age or location) for this parameter. Ask Ali if confused!!
   *  - p_low_bmi_given_high_hgb
      - Prevalence of BMI < 18.5 given hemoglobin >= 10 g/L
      - Defined on the :ref:`hemoglobin and BMI exposure document <2019_risk_exposure_maternal_bmi_hgb>`
      - NOTE: current simulation implementation and current documentation for this parameter are out of date as of 5/9/2022. When this is implemented, either a) update simulation impementation of low BMI exposure to the currently documented values and proceed, or b) use the low BMI exposure value consistent with the existing implementation in the simulation (distribution that does not vary by age or location) for this parameter. Ask Ali if confused!!

Therefore, the association between maternal BMI/hemoglobin joint risk exposure and birthweight risk exposure should be implemented according to the following steps:

#. Assign maternal hemoglobin risk exposure values as described on the :ref:`hemoglobin exposure document <2019_hemoglobin_model>`

#. Assign maternal BMI risk exposure values as described on the :ref:`maternal BMI risk exposure conditional on hemoglobin status document <2019_risk_exposure_maternal_bmi_hgb>`

#. At *conception* (transition from *np* to *p* states of the :ref:`pregnancy model <other_models_pregnancy>`), assign a LBWSG exposure as described on the :ref:`GBD 2019 Low birthweight short gestation risk exposure page <2019_risk_exposure_lbwsg>`

#. Apply a shift to the assigned continuous birthweight exposure value from step 2 based on the assigned maternal BMI exposure such that:

.. math::

   BW_\text{i, shifted} = BW_\text{i, unshifted} + shift_\text{cat_i, adjusted}

Where,

.. list-table:: Adjusted birthweight shifts
   :header-rows: 1

   *  - Parameter
      - Adjusted shift
      - Note
   *  - :math:`shift_\text{cat4, adjusted}`
      - :math:`p_\text{cat1} * shift_\text{cat1, unadjusted} + p_\text{cat2} * shift_\text{cat2, unadjusted} + p_\text{cat3} * shift_\text{cat3, unadjusted}`
      - 
   *  - :math:`shift_\text{cat3, adjusted}`
      - :math:`shift_\text{cat4, adjusted} + shift_\text{cat3, unadjusted}`
      - 
   *  - :math:`shift_\text{cat2, adjusted}`
      - :math:`shift_\text{cat4, adjusted} + shift_\text{cat2, unadjusted}`
      - 
   *  - :math:`shift_\text{cat1, adjusted}`
      - :math:`shift_\text{cat4, adjusted} + shift_\text{cat1, unadjusted}`
      - 

.. note::

   These LBWSG exposure values may be later modified by intervention coverage and/or other factors. Note that a shift in continuous LBWSG exposure values may cause a simulant's LBWSG exposure value to no longer fall within a valid GBD LBWSG exposure category. However, relative risks for the shifted exposure can still be calculated according to the :ref:`LBWSG risk effects modeling strategy <2019_risk_effect_lbwsg>`.

   The gestational age assigned to the mother should be used to determine the duration of her pregnancy.

   The gestational age and birtweight exposure values assigned to the mother should be used to determine the child's LBWSG exposure value and relative risks during the neonatal period.

Causation
++++++++++++

We are not currently modeling a direct causal relationship between changes in maternal BMI exposure and changes in birthweight exposure.

Assumptions and Limitations
++++++++++++++++++++++++++++++

#. We are limited in that we consider only the population mean difference in birthweight among categorical BMI/hemoglobin strata rather than continuous measures of maternal BMI and hemoglobin, which would allow for a more detailed association between the two risk exposures.

#. We assume that neither maternal BMI or anemia status is correlated with baseline intervention coverage (specifically IFA).

#. We apply an estimate of population level mean difference as an additive shift to individual simulants in our population rather than sampling from LBWSG exposuredistributions specific to maternal BMI/hemoglobin strata. This approach assumes that the shape of the LBWSG exposure distribution does not vary between maternal BMI/hemoglobin strata and is in inherent limitation in this approach due to limited data availability.

#. We use data from trial populations that are not representative of our simulated populations.

Validation Criteria
+++++++++++++++++++++

#. The exposure distribution of birthweight in the baseline scenario should continue to validate to the GBD birthweight exposure distribution

#. The difference in population mean birthweight among the exposed categories should reflect the expected shifts.

References
-----------

.. [Woman-First-Trial-Shifts]
  Hambidge KM, Westcott JE, Garcés A, Figueroa L, Goudar SS, Dhaded SM, Pasha O, Ali SA, Tshefu A, Lokangaka A, Derman RJ, Goldenberg RL, Bose CL, Bauserman M, Koso-Thomas M, Thorsten VR, Sridhar A, Stolka K, Das A, McClure EM, Krebs NF; Women First Preconception Trial Study Group. A multicountry randomized controlled trial of comprehensive maternal nutrition supplementation initiated before conception: the Women First trial. Am J Clin Nutr. 2019 Feb 1;109(2):457-469. doi: 10.1093/ajcn/nqy228. PMID: 30721941; PMCID: PMC6367966.