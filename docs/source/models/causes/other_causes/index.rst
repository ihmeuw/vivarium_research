.. _other_causes:

==============================
"Other" causes
==============================

This cause model document is meant to represent residual morbidity and mortality for all causes other than specific modeled causes of interest. 

.. contents::
   :local:
   :depth: 2

Disease Overview
----------------

Modeling YLDs and YLLs due to causes other than those specifically modeled in a vivarium simulation is critical to accurate estimation of intervention impact. 

  For instance, let's say that a simulant without :ref:`small quantity lipid-based nutrient supplementation <lipid_based_nutrient_supplements>` coverage in the baseline scenario dies due to protein energy malnutrition at age 1 in the baseline scenario, accumulating (approximately) 80 YLLs. 

  Now in the alternative scenario, this simulant is covered by SQ-LNS and their death at age 1 is prevented by this intervention. If we stopped observing this simulant at that instant, we would conclude that this resulted in 80 YLLs averted! 

  However, if we were to observe this simulant further, we might see that they go on to develop asthma and starts to accumulate YLDs due to this condition. Since this simulant in the baseline scenario died prior to developing asthma, these YLDs were not accumulated in the baseline scenario. Let's say this simulant accumulates 0.75 YLDs by age 10 in the alternative scenario. This makes our estimation of total DALYs averted now 70.25, *less than* the originally estimated 80. 

  In fact, it's possible that this simulant then dies of an asthma attack at age 10 in the alternative scenario, accumulating (approximately) 70 YLLs. This dramatically changes our estimation of total DALYs averted due to the intervention for this simulant to from 80 to just under 9.25!

This example demonstrates that it is important to estimate morbidity and mortality from all causes even when they are not directly affected by the intervention we are modeling. Ideally we would observe all simulated individuals affected by an intervention until death for completely accurate accounting; however, this may not always be necessary as we may be specifically interested in particular age groups of interest. Additionally, sometimes YLDs accumulated following an averted death may be dwarfed by YLLs averted due to that averted death. In this case, it may be an acceptable limitation to exclude YLDs due to other causes; however, this is less likely to be an acceptable limitation when modeling older ages.

Therefore, this cause model document exists to model both morbidity and mortality due to unmodeled causes in vivarium simulations.

Vivarium Modeling Strategy
--------------------------

Scope
+++++

This cause model document is reliant on a list of modeled causes to be specified in a concept model when this cause is included in a given vivarium simulation.

Cause Model Diagram
+++++++++++++++++++

There is only a single state in this cause model diagram that contains all simulants. Therefore there are no transitions in this cause model diagram.

.. figure:: figure.svg

State and Transition Data Tables
++++++++++++++++++++++++++++++++

Definitions
"""""""""""

**With-Condition and Free of Condition Model**

.. list-table:: State Definitions
   :widths: 1, 5, 10
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - C
     - With **C**\ ondition
     - Born with "other causes"

States Data
"""""""""""

.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - C
     - prevalence
     - 1
     - 
   * - C
     - birth prevalence
     - 1
     - 
   * - C
     - excess mortality rate
     - :math:`CSMR_\text{other causes}` 
     - CSMR is equal to the EMR because prevalence is equal to 1
   * - C
     - disabilty weight
     - :math:`YLDs_{c294} - \sum_{cid}^{n} YLDs_{cid}`
     - Where :math:`\sum_{cid}^{n} YLDs_{cid}` is the sum of YLDs due to all specified modeled components (may be causes, sequelae, and/or impairments). List of such IDs must be provided in concept model document.
   * - ALL
     - cause specific mortality rate
     - :math:`ACMR - \sum_{cid}^{n} CSMR_{cid}`
     - Where :math:`\sum_{cid}^{n} CSMR_{cid}` is the sum of the CSMRs of modeled causes. List of modeled cause IDs must be provided in concept model document.

.. note::

  The CSMR/EMR as well as the "disability weight" in the table above may be modified by modeled risk exposures.

.. todo::
  
  Confirm with the engineers that it will be possible for risk exposures to modify the "disability weight" as stated above 

Data Sources
""""""""""""

This table contains the data sources for all the measures. The table structure and common measures are as below:

.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Measure
     - Sources
     - Description
     - Notes
   * - ACMR
     - deaths_c294 / population
     - 
     - 
   * - CSMR_{cid}
     - deaths_{cid} / population
     - cause-specific mortality rate for specified cause ID
     - 
   * - population
     - get_population, decomp_step='step4'
     - population size
     - 
   * - deaths_{cid}
     - codcorrect, decomp_step='step4'
     - count of deaths due to specified cause ID
     - 
   * - YLDs_{cid}
     - como, decomp_step='step4'
     - YLD rate for a specified cause ID
     - 

.. todo::

  Confirm that this definition of YLDs is compatible with engineering definitions of disability weights... I always get turned around here.

Validation Criteria
+++++++++++++++++++

Our simulation should replicate GBD estimates of all-cause mortality, YLL, and YLD rates in the baseline scenario. Additionally, we should continue to meet all modeled cause-specific verification and validation criteria.

Assumptions and Limitations
+++++++++++++++++++++++++++

1. This modeling strategy is limited in that it introduces potential incompatibilities with GBD YLD estimates as adjusted for comorbidities due to the fact that disability weights are not additive across multiple conditions.

2. We assume that all simulants have the same morbidity and mortality rates due to other causes with no individual-level heterogeneity. When modeled interventions avert deaths in the alternative scenario relative to the baseline scenario, it is possible that these simulants experience *greater* than average background morbidity and mortality rates due to their vulnerable status in the baseline scenario, which could cause us to slightly overestimate the impact of our interventions on DALYs by underestimating the magnitude of DALYs experienced in the alternative scenario following the averted deaths.