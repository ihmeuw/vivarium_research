.. _2019_risk_effect_wasting:

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

===========================
Child Wasting Risk Effects
===========================

.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

Child wasting, defined as low weight for heigh/length, is a measure of acute malnutrition that is associated with increased mortality and susceptibility to infectious disease. More information can be found in the :ref:`wasting risk exposure model document <2020_risk_exposure_wasting_state_exposure>`.

GBD Modeling Strategy
----------------------

The GBD 2019 risk effects of child wasting are informed by [Olofin-et-al-2013]_, which evauated the relative risk of cause-specific mortality rate (CSMR) by child wasting categories [GBD-2019-Risk-Factors-Appendix-Child-Wasting-Risk-Effects]_. Notably, given that :math:`CSMR = EMR * prevalence`, the relative risks may be attributable to increased disease incidence (increases prevalence), duration (increases prevalence), or severity (increases excess mortality rate (EMR)), or some comination of these factors. The 2019 GBD applies the child wasting risk effects equally to both morbidity and mortality estimates (YLDs and YLLs).

.. note::

   The :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>` uses GBD 2020 relative risks for child wasting. The data source for these potentially updated relative risks needs to be investigated.


Vivarium Modeling Strategy
--------------------------

.. note::

   This section will describe the Vivarium modeling strategy for risk effects.
   For a description of Vivarium modeling strategy for risk exposure, see the
   :ref:`wasting risk exposure model document <2020_risk_exposure_wasting_state_exposure>`.

For the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>`, we will make different assumptions about how to apply the child wasting risk effects for diarrheal diseases than for measles and lower respiratory infections due to the inclusion of diarrheal diseases in the "vicious cycle"/positive feedback model with child wasting, which required this change to solve for the steady state model (:ref:`discussed here <2019_risk_effect_diarrheal_diseases>`). 

Diarrheal diseases (to be used when the :ref:`risk effect of diarrheal diseases on wasting <2019_risk_effect_diarrheal_diseases>` is included in model)
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

For the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>`, the relative risks for wasting on diarrheal diseases should be applied to the diarrheal diseases excess mortality rate and not the diarrheal diseases incidence rate in the following manner: 

.. math::

   \text{incidence rate}_\text{diarrheal diseases,i} = \text{incidence rate}_\text{diarrheal diseases} 

.. math:: 

   EMR_\text{diarrheal diseases,i} = EMR_\text{diarrheal diseases} * (1 - PAF_\text{wasting,diarrheal diseases}) * RR_\text{wasting,diarrheal diseases,i}

Where, for wasting state :math:`X` in wasting states cat1, cat2, cat3, and cat4:

.. math::

   PAF_\text{wasting,diarrheal diseases} = \frac{(\sum exposure_X \times RR_X) - 1}{\sum exposure_X \times RR_X}

.. math::

   exposure_X = \frac{p_{DX}}{p_{D1} + p_{D2} + p_{D3} + p_{D4}} = \frac{p_{DX}}{\text{prevalence diarrheal diseases}}

.. note::

   Parameters :math:`p_{D1}, p_{D2}, p_{D3}, p_{D4}` are defined on the :ref:`diarrheal diseases risk effects document <2019_risk_effect_diarrheal_diseases>`

   The GBD 2020 wasting relative risks should be used in tandem with the :ref:`GBD 2020 wasting risk exposure <2020_risk_exposure_wasting_state_exposure>`

   NOTE: we use a custom PAF calculation rather than the GBD PAF that uses the wasting risk exposure distribution specific to those infected with diarrheal diseases to avoid bias in our application of the PAF to the population at-risk for diarrheal diseases mortality

Validation and Verification Criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Verification and validation criteria from the :ref:`diarrheal diseases cause model <2019_cause_diarrhea>` should remain true.
#. Verification and validation criteria from the :ref:`dynamic child wasting exposure model <2020_risk_exposure_wasting_state_exposure>` should remain true.

.. todo::

   List additional V&V criteria

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. todo::

   List assumptions and limitations

.. _`standard-wasting-effects`:

Lower respiratory infections and measles (and diarrheal diseases when :ref:`risk effect of diarrheal diseases on wasting <2019_risk_effect_diarrheal_diseases>` is not included in the model)
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

For the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>`, the relative risks for wasting on lower respiratory infections and measles should be applied to the diarrheal diseases excess mortality rate and not the diarrheal diseases incidence rate in the following manner:

.. math::

   incidence rate_\text{cause,i} = incidence rate_\text{cause} * (1 - PAF_\text{wasting,cause}) * RR_\text{wasting,cause,i}

.. math:: 

   excess mortality rate_\text{cause,i} = excess mortality rate_\text{cause}

.. note::

   The GBD 2020 wasting relative risks should be used in tandem with the :ref:`GBD 2020 wasting risk exposure <2020_risk_exposure_wasting_state_exposure>`

Validation and Verification Criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Verification and validation criteria from the LRI and measles cause model documents should remain true.
#. Verification and validation criteria from the :ref:`dynamic child wasting exposure model <2020_risk_exposure_wasting_state_exposure>` should remain true.

.. todo::

   List additional V&V criteria

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. todo::

   List assumptions and limitations

References
----------

.. [GBD-2019-Risk-Factors-Appendix-Child-Wasting-Risk-Effects]

   Pages 157-161 in `Supplementary appendix 1 to the GBD 2019 Risk Factors Capstone <risk_factors_methods_appendix_>`_:

     **(GBD 2019 Risk Factors Capstone)** GBD 2019 Risk Factor Collaborators. :title:`Global burden of 87 risk factors in 204 countries and territories, 1990–2019: a systematic analysis for the Global Burden of Disease Study 2019`. Lancet 2020; 396: 1223-1249. DOI:
     https://doi.org/10.1016/S0140-6736(20)30752-2

.. _risk_factors_methods_appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30752-2/attachment/54711c7c-216e-485e-9943-8c6e25648e1e/mmc1.pdf

.. [Olofin-et-al-2013]
   Olofin I, McDonald CM, Ezzati M, et al. Associations of Suboptimal Growth with All‐Cause and Cause‐
   Specific Mortality in Children under Five Years: A Pooled Analysis of Ten Prospective Studies. PLOS ONE
   2013; 8: e64636
