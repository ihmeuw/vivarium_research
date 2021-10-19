.. _2019_risk_effect_x_factor:

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
Wasting X-Factor
===========================

.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

The x-factor is a risk exposure that tries to capture the differential risk experienced by some children who may experience more relapses of wasting. We believe this is an important component of wasting epidemiology to capture [see Brain Trust notes with Chris Murray for discussion of adding this component to the model]. There are many risk factors that have been described in the literature that pre-dispose children to wasting including maternal education, household food insecurity, family size, water and sanitation. However, we have not found any conclusive evidence yet of a single x-factor is or its effect size.

.. note::

  See Nicole's zotero library folder 'Relapse' and 'Determinants' to see studies on this topic.


.. todo::

  - A more thorough literature review and support for use of this proxy should be done to strengthen our argument.
  - We have decided not to model the effect of x-factor on stunting for now. We will look more thoroughly on its effect on stunting and whether to model a direct effect of wasting on stunting as we do more research.
  - may be helpful to put this in the concept model diagram to keep track of how different factors affect incidence rates

      mam_incidence_i = mam_incidence_given_diarrheal_state_i * (1 - PAF_xfactor) * RR_xfactor_i * SQLNS_treatment_RR_i

      sam_incidence_i = sam_incidence_given_diarrheal_state_i * (1 - PAF_xfactor) * RR_xfactor_i

  - note that SQ-LNS only affects MILD to MAM incidence.

.. todo::

  Be careful of what the 'x-factor' effect size represents. While being proxied by m undernourishment exposure, it is **not** the only causal effect of m undernourishment on wasting. That's why we are using a series of RR to test out this effect since we can't find it directly in the literature. (although the Na paper has the ORs). We might need to think through how to appropriately use proxies, especially since we are also modelling m undernourishment as a risk exposure as well. So m undernourishment is acting as a risk exposure for itself AND also proxy for other risks. Perhaps we need to be specific and say the x-factor effect is all the 'other-stuff' without m undernourishment and we model m nourishment effect in addition to x-factor?

  We would need to think through carefully this web of relationships that includes x-factor, m undernourishment (m undernourishment and x-factor will be perfectly correlated), lbwsg, wasting and stunting. We need to be specific and careful about when we are referring to m undernourishment as risk exposure for itself or m nourishment as proxy for other risks (the x-factor) and use the appropriate effect sizes.

  Nathaniel asked if we should have a causal arrow from mm undernourishment to wasting. My thinking is that we need to think through what we are capturing through an indirect effect (through mediator), a direct effect and what the total effect is. For example, we are capturing this mediated effect through lbwsg [mm undernourishment (a)--> lbwsg (b)--> wasting]. So if we also have a direct effect, [mm undernourishment (c)--> wasting], we will end up with [Total effect of mm undernourishment on wasting = ab + c].  Not sure if the literature will have sufficient information for us to figure out all these effect pathways. So maybe we just use the effect of (a) and (b)?

Vivarium Modeling Strategy
--------------------------

Wasting Incidence Rates
++++++++++++++++++++++++

We do not have direct evidence or data for the risk effect of the x-factor *proxied by maternal undernutrition* on wasting incidence (from the previous source state). From the [Na_2020-x-factor-risk-effect]_, table 4 shows the odds of infant malnutrition (wasting, stunting and underweight) at 6 months of age in infants from food-insecure households as compared with infants from food-secure households (reference group). For rare outcomes, the prevalence risk ratio, incidence rate ratio and prevalence odds ratios approximate each other which is likely to be true for SAM (<5% prevalence), but not true for MAM and MILD wasting. Hence we model a range of risk effects as a sensitivity analysis with the scale of the effect informed by [Na_2020-x-factor-risk-effect]_. Below table is a suggested range of risk-effect values to model.

.. csv-table:: X-factor risk effect sensitivity analysis
   :file: x_factor_risk_effect.csv
   :widths: 30, 10, 10, 10, 10
   :header-rows: 1

.. note::

  For model runs following validation of model #4.5, use x-factor risk effect = 1.3 until consensus is reached on x-factor effect magnitude or the model is ready for simulation results for the full range of sensitivity analysis values.

The risk effect (relative rate ratio) of incidence would be applied as such (breaking out the exposed vs non-exposed incidence from the exposure weighted overall incidence):

 - :math:`i_{x1} = i_{wasting|markov} (1-PAF) \times rr_{x_{factor}}`
 - :math:`i_{x0} = i_{wasting|markov} \times (1-PAF)`

 where :math:`i_{wasting|markov}` are the wasting transition incidences from the Markov calibration (with vicious cycle in the final model). And the PAF is calculated as

 PAF = :math:`\frac{(\sum_{x\_factor_{cat_i} prevalence * rr_{x_{factor\_cat_i}}})-1}{\sum_{x\_factor_{cat_i} prevalence * rr_{x_{factor\_cat_i}}}}`

 - where x_factor_cati_prevalence is the x-factor exposure category prevalence for exposed (i = 1) or unexposed (i = 0)
 - rr_x_factor_cati is the relative rate ratio for exposed (i = 1) or unexposed (i = 0).
 - Note that there are 4 wasting states so there should be a PAF between every wasting state transition where the susceptible population is the source wasting state, the exposure is the 'x-factor' and the outcome is the sink wasting state.

- Note diarrhea (vicious cycle) cycle have effects on wasting incidences. Hence the x-factor should be broken out for the incidences with/without diarrhea calibrated from the Markov matrix. In our final model, we should end up with 4 sets (2 diarrhea states x 2 x-factor states) of 3 incidences (i1-3) for a total of 12 incidence rates.
- Note also that SQ-LNS affects wasting transition incidence from mild to mam. The protective effects of SQ-LNS (if covered) would be applied to the incidences from mild to mam corresponding to diarrhea and x-factor exposure.
- Let us assume that the 'x-factor' does not have differential effects on treatment recovery rates.

.. todo::

  Investigate potential effect of x-factor on recovery rates.

Validation and Verification Criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- The ratio between wasting incidence rates among those exposed and unexposed to the x-factor should match the given x-factor effect size
- There should be no difference in wasting state remission rates by x-factor exposure status
- Wasting exposure should be greater among those exposed to the x-factor than those unexposed

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. todo::

   Detail assumptions and limitations related to the x-factor risk effect 

References
----------

.. [Na_2020-x-factor-risk-effect]

  View `Na 2020`_

    Maternal nutritional status mediates the linkage between household food insecurity and mid-infancy size in rural Bangladesh

.. _`Na 2020`: https://pubmed-ncbi-nlm-nih-gov.offcampus.lib.washington.edu/32102702/