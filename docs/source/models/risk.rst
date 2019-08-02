.. _models_risk:

======================
Modeling Risk Exposure
======================

.. note::

   Vivarium has the infrastructure to model any risks in the GBD hierarchy. 
   You should use tools from ``vivarium_inputs`` to pull and examine the 
   data for your risks before including them in your model.

What is a risk factor?
----------------------

A risk factor is any attribute, characteristic or exposure of an individual 
that increases the likelihood of developing a disease or injury. Some examples 
of the more important risk factors are underweight, unsafe sex, high blood pressure, 
tobacco and alcohol consumption, and unsafe water, sanitation and hygiene. (WHO)

What is a TMREL?
----------------

The theoretical minimum risk level (TMREL) is the level of risk exposure 
that minimizes risk at the population level, or the level of risk 
that captures the maximum attributable burden. (GBD)

The structure of a risk exposure model
--------------------------------------

- **Risk entities**
    - **rei_id:** The GBD id associated with this risk.
    - **Exposure model:** How does GBD model the exposure distribution of this risk? 
      One of: dichotomous, ordered polytomous, unordered polytomous, normal, 
      lognormal, or ensemble. Does your intervention require an alternative model 
      of exposure? If so, what is it? Can we easily translate between your alternative 
      model and the GBD model?
    - **Affected measures:** What diseases and measures (e.g. incidence rate, excess
      mortality, etc.) are affected by this risk? If you have an alternative exposure 
      model, how is the effect size related?
    - **Mediation:** Is this risk mediated by any other risks in your model? 
      If so, how should we handle the mediation? (e.g. high systolic blood pressure
      is the mediator between high body-mass index in adults risk and causes such as
      ischemic heart disease, ischemic stroke, etc.) For details please visit ``J:/
      WORK/05_risk/mediation/mediation_matrix_summary_gbd_2017.xlsx``
    - **PAF of one causes:** Are there any PAF of one relationships with causes in your model?
      If so, what do they mean and how should we handle them? For common *PAF of one* pairs,
      please check ``J:/Project/simulation_science/archive/pafs_of_one.xlsx``
    - **Restrictions:** Does this risk apply only to certain ages or sexes?
      Any other restrictions?
- **Data Sources**


Common risk exposure models
---------------------------

Continuous exposure models
++++++++++++++++++++++++++

Categorical exposure models
+++++++++++++++++++++++++++

Hybrid exposure models
++++++++++++++++++++++

Common data sources for risk exposure models
--------------------------------------------

Exposure
++++++++

Exposure standard deviation
+++++++++++++++++++++++++++

Exposure distribution weights
+++++++++++++++++++++++++++++

TMREL/TMRED
+++++++++++

Scale factor
++++++++++++

Non-standard data sources for risk exposure models
--------------------------------------------------
