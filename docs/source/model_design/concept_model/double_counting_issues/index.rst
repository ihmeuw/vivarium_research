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
  ~~~~~~~~~~~~~~~
  Section Level 4
  ^^^^^^^^^^^^^^^
  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

.. _vivarium_best_practices_double_counting:

=========================================================
Double Counting Issues
=========================================================

.. contents::
   :local:
   :depth: 1

Intervention effects
--------------------

In designing a Vivarium concept model, attention should be paid to ensure that we will not overestimate the impact of interventions that act on the same (or related) outcomes. For example, we would not want to include the effects of *both* iron and folic acid supplementation (IFA) *and* multiple micronutrient supplementation (MMS) containing IFA in the :ref:`antenatal supplementation intervention <maternal_supplementation_intervention>`; rather, we model the impact of MMS containing IFA *relative to* the impact of IFA. 

Furthermore, two separate interventions may or may not be as valuable as the sum of their parts. For example, cash transfers and small quantity lipid-based nutrient supplementation (SQ-LNS) have been shown to reduce child wasting burden. However, it is possible that cash transfers may reduce child wasting burden in part through the provision of nutrients included in SQ-LNS, which may render the impacts of each intervention when delivered in combination less than the individual impacts of each intervention delivered independently. In such cases, research on intervention impacts in tandem and/or discussion with subject matter experts will be the best source to inform modeling strategies.

Finally, an analysis by [Scott-et-al-2020-double-counting]_ discusses a strategy for modeling multiple interventions that act on the same outcomes in a priority-identifying manner that has been used in multiple nutrition models in the **Intervention expansion pathways** section of the methods.

Morbidity and mortality
-----------------------

While the GBD cause-hierarchy generally prevents double counting while modeling causes at the same level of the hierarchy, attention should be paid to ensure double counting is not present when modeling causes from varying levels of the hierarchy (for example: modeling both maternal disorders (cause ID 366) *and* maternal hemorrhage (cause ID 367), which is a sub-cause of maternal disorders).

Additionally, double counting issues will be especially salient when modeling GBD impairments, which represent health states due to many different causes in the GBD cause hierarchy. An example of a modeling strategy to avoid such issues is our vivarium model of the :ref:`anemia impairment <2019_anemia_impairment>` (that utilizes our model of :ref:`hemoglobin concentration <2019_hemoglobin_model>`) and our model of :ref:`maternal disorders YLDs <2019_cause_maternal_disorders>`, which were adjusted to omit YLDs associated with anemia due to maternal hemorrhage (See the *Years Lived With Disability* section). Otherwise, we may have double counted these YLDs by observing them both in our anemia model *and* maternal disorders model for the :ref:`IV iron simulation <2019_concept_model_vivarium_iv_iron_maternal_sim>`.

References
----------

.. [Scott-et-al-2020-double-counting]
  Scott, N., Delport, D., Hainsworth, S. et al. Ending malnutrition in all its forms requires scaling up proven nutrition interventions and much more: a 129-country analysis. BMC Med 18, 356 (2020). `https://doi.org/10.1186/s12916-020-01786-5 <https://doi.org/10.1186/s12916-020-01786-5>`_