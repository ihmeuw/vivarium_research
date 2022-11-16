.. _2017_risk_high_ldl_c:

==============================
High LDL cholesterol: GBD 2017
==============================

Risk Exposure Description
-------------------------

.. todo::

   Add more information and references. In particular, find data about global prevalence and relation to disease fatal and non-fatal description.

Low-density lipoprotein (LDL) is one of the five major groups of lipoprotein which transport all fat molecules around the body in the extracellular water. LDL can contribute to atherosclerosis if it is oxidized within the walls of arteries.

Blood tests commonly report LDL-C: the amount of cholesterol which is estimated to be contained with LDL particles, on average, using a formula, the Friedewald equation. In clinical context, mathematically calculated estimates of LDL-C are commonly used as an estimate of how much low density lipoproteins are driving progression of atherosclerosis.

It should be emphasized that LDL-C is not a measurement of actual LDL particles. LDL-C is only an estimate (not measured from the individual's blood sample) of how much cholesterol is being transported by all LDL particles, which is either a smaller concentration of large particles or a high concentration of small particles. [Wikipedia-LDLC]_, [Centers-For-Disease-Control-And-Prevention]_

Modeling High LDL-c in GBD 2017
-------------------------------

LDL-C is a new risk factor in GBD 2017 (previously GBD included Total Cholesterol instead).  In summary, GBD 2017 estimates that:

* In 2017, 4·32 million (95% UI 3·33–5·44) deaths and 94·9 million (78·8–112) DALYs were attributable to high LDL cholesterol. Overall, 3·80% (3·14–4·56) of total DALYs were attributable to high LDL cholesterol. The age-standardised DALY rate in males (1480 per 100 000 [1230–1750]) was higher than in females (880 per 100 000 [714–1070]). Globally, between 1990 and 2017, age-standardised DALY rates declined markedly (29·9% [28·1–31·7] decline). Notable reductions in age-standardised DALY rates occurred in both the high-income (61·8% [60·4–63·2] decline) and Latin America and Caribbean super-regions (40·7% [38·9–42·5] decline).

The LDL-C risk factor exposure was modeled with an ensemble distribution in GBD 2017, which include estimates of the age-/sex-/location-/year-specific mean LDL-C level; the spread of this distribution, quantified by its standard deviation, and also stratified by age, sex, location, and year; and a vector of ensemble weights that does not vary by age, sex, location, or year, which specifies how to obtain a distribution of LDL-C values that best matches the distribution observed in the available individual-person data.

For exposure, to get from mmol/L to mg/dL multiply by 88.57. In addition, to get from mg/dL to mmol/L multiply by 0.01129. TMREL is 0.7 to 1.3 mmol/L.

Risk Exposure Model Hierarchy
+++++++++++++++++++++++++++++

.. image:: risk_factor_hierarchy_ldlc.svg

Vivarium Modeling Strategy
++++++++++++++++++++++++++

Scope
+++++

In this case, the Vivarium model will match closely to the GBD model.

Modeling Assumptions and Limitations
++++++++++++++++++++++++++++++++++++

Data Description
++++++++++++++++

Continuous, ensemble distribution

All from REI id 367

    - Exposure mean: exposure_r367
    - Exposure standard deviation: exposure_sd_r367
    - Ensemble weights: ensemble_weights_r367


Restrictions
++++++++++++
.. todo:: Answer what minimum and maximum exposure level is logical?  For LDL-C in mmol/L it is at least 0.0 and at most 20?

The following table describes any restrictions in GBD 2017 on the effects of this risk factor (such as being only fatal or only nonfatal), as well as restrictions on the ages and sexes to which the risk factor applies.

.. list-table:: GBD 2017 Risk Factor Restrictions
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
   * - YLL only
     - False
     -
   * - YLD only
     - False
     -
   * - YLL age group start
     - 25 to 29
     - [15, 20), age_group_id=10
   * - YLL age group end
     - 95 Plus
     - [95, 125 years), age_group_id=235
   * - YLD age group start
     - 25 to 29
     - [15, 20), age_group_id=10
   * - YLD age group end
     - 95 plus
     - [95, 125 years), age_group_id=235

Validation Criteria
+++++++++++++++++++

1. Data

    - internal

    - external

2. Model

    - Does the mean in the model match the mean in GBD?

    - Does the standard deviation in the model match the std in GBD?
    
References
----------

.. [Wikipedia-LDLC] Low-density lipoprotein. From Wikipedia, the Free Encyclopedia.
   Retrieved 29 Jan 2020.
   https://en.wikipedia.org/wiki/Low-density_lipoprotein

.. [Centers-For-Disease-Control-And-Prevention]
    Retrieved 29 Jan 2020.
    https://www.cdc.gov/cholesterol/ldl_hdl.htm