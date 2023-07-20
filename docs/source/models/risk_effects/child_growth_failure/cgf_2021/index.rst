.. _2021_risk_effect_cgf:

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

======================================
Child Growth Failure Risk Effects 2021
======================================

.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

Child growth failure (CGF) is estimated using three risk exposures: stunting or low height 
for age (HAZ), wasting or low weight got height (WHZ), and underweight or low weight for 
age (WAZ). 

The risk effects are found for each of these risk exposures based on categorical 
definitions using the WHO 2006 growth standards for children 0-59 months. 
They are: mild (<-1 to -2 Z score), moderate (<-2 to -3 Z score), and severe 
(<3 Z score).

All three metrics are a measure of acute malnutrition and are associated with increased 
mortality and susceptibility to infectious disease. More information can be found in 
the :ref:`wasting risk exposure model document <2020_risk_exposure_wasting_state_exposure>`, 
the :ref:`stunting risk exposure model document <2020_risk_exposure_child_stunting>`, and the 
underweight exposure model document. 

.. todo::

   Add a link to the underweight exposure model document when completed. 

GBD Modeling Strategy
----------------------

In the GBD 2021 model, there were significant changes from the prior 2019 risk effects. 
Prior GBD models used a simulated joint distribution of stunting, underweight, and wasting 
measures from the [Olofin_2013]_ meta-analysis. 

In GBD 2021, GBD created age-specific joint distributions of stunting, underweight, and 
wasting measures from 15 longitudinal studies (from 26 locations) in the Bill and Melinda 
Gates Foundation’s Knowledge Integration (Ki) database. The RR adjustment method was 
also strengthened in GBD 2021 by constraining optimisation in two ways. These changes 
result in a couple of differences relevant to our simulation: 

#. There are now separate RR values for incidence and mortality 
#. Malaria was identified as an affected cause 

Vivarium Modeling Strategy
--------------------------

For the :ref:`nutrition optimization model <2021_concept_model_vivarium_nutrition_optimization>`, 
there are separate relative risks for the three components of child growth failure: HAZ, WAZ, and 
WHZ. Relative risks are categorical. 

These risk exposures affect four causes: diarrheal diseases, LRIs, malaria, and measles. 
Additionally, these relative risks vary by simulant age. The age categories are: 1 to 5 months, 
6 to 11 months, 12 to 23 months, and 2 to 4 years. Note that for simulants less than one month 
of age, the risk effects are caused by LBWSG not CGF and so are not included here. Additionally, 
there are separate relative risks for incidence and mortality. 

Therefore, a simulant's relative risk value is dependent on: the risk exposure variable, 
the simulant's risk exposure category, the cause and cause metric affected, and the 
simulant's age. For example, a single relative risk might be the 
RR for **WAZ** on **malaria incidence** for a simulant in the **moderate** exposure 
category who is **6-11 months** old. 

Relative risk values can be pulled using the following code::

  rrs = get_draws(gbd_round_id=7, year_id=2021, gbd_id_type='rei_id', gbd_id=[241,240,94], source='rr', decomp_step='iterative')


PAFs will be calculated separately to have a single joint PAF for CGF. 

.. todo::

   Add information on PAF calculations and file for engineers to use. 

With the RR and PAF values above, the following equations can be used to calculate 
simulant level incidence and EMR. 

.. math::

   incidence rate_\text{cause,i} = incidence rate_\text{cause} * (1 - PAF_\text{CGF,cause}) * RR_\text{HAZ,cause,i} * RR_\text{WAZ,cause,i} * RR_\text{WHZ,cause,i}

Where the relative risk value will depend on the simulant's age group and risk exposure category. 

.. math:: 

   EMR_\text{cause,i} = EMR_\text{cause} * (1 - PAF_\text{CGF,cause}) * RR_\text{HAZ,cause,i} * RR_\text{WAZ,cause,i} * RR_\text{WHZ,cause,i}

.. todo::

   We need to add an adjustment since the GBD mortality data is actually for CSMR not EMR. So the above equation is currently incorrect. 


Validation and Verification Criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Verification and validation criteria from the diarrheal diseases, malaria, mealses and LRI cause models should remain true.
#. Verification and validation criteria from the child growth failure exposure model should remain true.
#. Relative risk values should approximately match what is expected for incidence and mortality from each cause. 

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. todo::

   List assumptions and limitations

References
----------

.. _risk_factors_methods_appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30752-2/attachment/54711c7c-216e-485e-9943-8c6e25648e1e/mmc1.pdf

.. [Olofin_2013]
   Olofin I, McDonald CM, Ezzati M, et al. Associations of Suboptimal Growth with All‐Cause and Cause‐
   Specific Mortality in Children under Five Years: A Pooled Analysis of Ten Prospective Studies. PLOS ONE
   2013; 8: e64636
