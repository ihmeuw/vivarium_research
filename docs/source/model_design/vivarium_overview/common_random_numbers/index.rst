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

.. _vivarium_best_practices_crn:

=================================
Common Random Numbers in Vivarium
=================================

Common Random Numbers Between Model Scenarios
---------------------------------------------

Vivarium uses common random numbers between model scenarios to ensure that our comparison of the baseline and intervention scenarios represents a true *counterfactual* comparison in which the scenarios are exactly the same with regard to all factors besides the defined intervention. See the `Vivarium documentation page on common random numbers <https://vivarium.readthedocs.io/en/develop/concepts/crn.html>`_ for more detail on how this is implemented.

Common Random Numbers Between Model Locations
---------------------------------------------

For a given Vivarium simulation model, it is common to model the same scenarios across more than one model location. For example, the :ref:`Large Scale Food Fortification project <2017_concept_model_vivarium_conic_lsff>` was modeled in Ethiopia, India, and Nigeria. The goal in running the model in more than one model location may be to evaluate the location for which the intervention will have the greatest impact. For example, because Ethiopia and Nigeria have higher prevalence of neural tube defects than India, we expect that folic acid fortification will have a greater impact on DALYs in Ethiopia and Nigeria than in India. However, in order to make this conclusion from our model results, **we must design our models so that they are comparable across model locations.**

Specifically, we should ensure that we are using the common random numbers across model locations with respect to:

1. Intervention effect sizes

2. Key location-specific model parameters 

Common Random Numbers for Intervention Effect Sizes
+++++++++++++++++++++++++++++++++++++++++++++++++++

Our Vivarium simulation models generally have intervention effect sizes with some distribution of uncertainty. For example, in the :ref:`Large Scale Food Fortification model <2017_concept_model_vivarium_conic_lsff>`, the relative risk of the vitamin A fortification intervention on population prevalence of vitamin A deficiency is 0.45 (95% CI: 0.19 - 1.05). **Given that we are operating under the assumption that the effect size for the intervention is universal and therefore should not vary by model location (is generalizable to each model location and no effect modification is present), then we should ensure that we are applying the same values sampled from the effect size distribution of uncertainty.**

This is especially important when the statistical confidence interval for a given intervention effect size is imprecise and crosses the null value, or in other words *has the potential to make things worse*. If due to randomness, a null effect size is sampled in one model location but not another, it may spuriously appear that the intervention will be less effective in that location, but in reality it may be a product of randomness. Therefore, to ensure comparability between our model locations, **it is best practice to use common random numbers for intervention effect sizes across model locations.**

Common random Numbers Across Locations for Key Location-Specific Model Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In the example discussed above in the `Common Random Numbers Between Model Locations`_ section, it is clear that baseline burden of neural tube defects is a key parameter that will affect the impact of folic acid intervention in the Large Scale Food Fortification model in each model location. Because there is an uncertainty distribution surrounding the parameter of population burden of this neural tube defects (i.e. birth prevalence), the impact of the intervention in our model is subject to randomness in the values that we sample from the uncertainty distribution of this parameter. 

Because we are not using the entire uncertaity distribution that the Global Burden of Disease study provides, we should ensure that we are comparing comprable measures of baseline burden for this key parameter across our model locations. One way to do this would be to arrange the input draws of this key parameter (birth prevalence of neural tube defects in this example) in asending order for each model location and then select the input draw in the same position in the list for each location as the input draws to use for each model location.

.. todo::

	Consider an approach that would allow us to use common random numbers for more than one key model parameter