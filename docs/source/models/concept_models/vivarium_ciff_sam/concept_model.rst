.. role:: underline
    :class: underline


..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  +++++++++++++++++++++

  Section Level 2 (#.#)
  ---------------------

  Section Level 3 (#.#.#)
  ~~~~~~~~~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.


.. _2019_concept_model_vivarium_ciff_sam:

===================================
Vivarium Acute Malnutrition Phase 1
===================================

.. contents::
  :local:

+------------------------------------+
| List of abbreviations              |
+=======+============================+
| AM    | acute malnutrition         |
+-------+----------------------------+
| MAM   | moderate acute malnutrtion |
+-------+----------------------------+
| SAM   | Severe acute malnutrition  |
+-------+----------------------------+
| OTP   | Outpatient therapeautic    |
|       | programme                  |
+-------+----------------------------+


1.0 Background
++++++++++++++

Malnutrition is an imbalance between the body’s needs and its use and intake of nutrients. The imbalance can be caused by poor or lacking diet, poor hygiene, disease states, lack of knowledge, and cultural practices, among others. Underweight, stunting, wasting, obesity, and vitamin and mineral deficiencies are all forms of malnutrition. Acute malnutrition (AM), also referred to as wasting, is recent rapid weight loss or a failure to gain weight that results from illness, lack of appropriate foods, or other underlying causes. For an individual, AM is not a chronic condition: children with AM either recover or die and recovered children can relapse to AM1. It is measured in weight-for-height z-scores (WFH) which is a comparison of a child’s WFH from the median value of the global reference population. A z-score between -2 to -3 indicates moderate acute malnutrition (MAM) and a z-score below -3 indicate severe acute malnutrition (SAM). SAM and MAM together is referred to as global acute malnutrition (GAM). Although MAM is less severe, it affects a greater number of children and is associated with more nutrition-related deaths than SAM. Children with AM are at greater risk of death from diarrhea and other infectious diseases than well-nourished children. They also face greater risk of morbidity from infectious diseases and delayed physical and cognitive development. MAM tends to peak during seasonal hunger, disease outbreaks, or during food security ‘shocks’ (e.g. economic or climatic crises) and stresses including humanitarian crises. However, MAM is a problem that not only occurs in emergencies, but also can be endemic in development contexts. MAM should not be neglected, as untreated, it can deteriorate to SAM and possible death. Furthermore, evidence is emerging that repeated episodes of MAM can have a significant impact on stunting; prevention of wasting could potentially increase height in children.


.. _1.1:

1.1 Project overview
--------------------

Wasting is commonly considered an acute condition and is categorized into moderate (MAM), and severe (SAM).  Compared to other manifestations of undernutrition it can be relatively rapid in onset and resolution. While management and treatment of children with MAM and SAM improves recovery, these children are still at risk of relapse. One possible explanation for this is that treatment does not adequately correct the metabolic disturbances or biological mechanisms that lead to wasting and children are left with a deficient immune defense after a wasting episode. Another reason for vulnerability to relapse is that the same environmental or external condition that initially caused the wasting remains, or even that an earlier risk factor during fetal development leaves a child more vulnerable to becoming wasted. Concrete evidence is still lacking on the role of metabolic and persistent environmental factors play in the progression of wasting and relapse, but potential involvement underlines the importance of catching children early in the process of wasting with wasting prevention interventions before these metabolic disturbances occur.

In addition to management and treatment of MAM and SAM, we will model a number of sufficiently robust interventions that directly prevent AM. We will also model interventions that affect risk factors for wasting including birthweight and infectious disease. For each intervention, we obtain current population coverage levels, effect sizes and costs for cost-effectiveness analysis.

We will model wasting in an individual as a collection of distinct states, where an individual is in a single state and may transition to other states following the arrows between states (see wasting exposure model). In GBD, wasting has four categories corresponding to different WFH z-score ranges. Simulants transition forward through the four wasting states by the incidence rate and backward towards healthier states by the recovery rate. Risk factors such as low birthweight (LBW) or infectious diseases increases the forward incidence rates. We will model differential incidence and recovery rates based on intervention coverage: simulants covered by direct wasting preventive interventions will experience lower forward incidence rates compared to those not covered and simulants covered by therapeutic interventions will experience a higher recovery rate than those not covered.  Wasting prevalence and incidence will be reduced either by greater effectiveness of interventions or greater coverage of interventions. Interventions that address birthweight or infectious diseases will affect wasting through the risk factor causal pathway.

This model will allow us to understand and quantify the impact of different combinations of preventive and treatment strategies on wasting and wasting attributable DALYs at the national level.


.. _1.2:

1.2 Literature review
---------------------



.. _2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++

The primary objective of this project is to answer the following question: what is the cost and impact of combinations of preventive and therapeutic strategies for reducing overall wasting prevalence and eliminating SAM in Ethiopia?
We will use data from the 2019 GBD and published literature to inform the parameters for our simulation. We will simulate the changes in MAM and SAM disease incidence, prevalence and mortality from 2022 to 2027 in response to a combination of preventive and therapeutic treatment interventions in Ethiopia.


.. _3.0:

3.0 Causal framework
++++++++++++++++++++

While there are various well-studied risk factors that are associated with becoming wasted, we will only address those that have interventions with sufficient strength of evidence for effect. The risk factors we include in our model include birthweight and infectious diseases.


.. _3.1:

3.1 Causal diagram
------------------

.. image:: DAG_acute_malnutrition.svg


.. todo::

  Add more details on causal diagrams with interventions/GBD risk exposures

.. _3.2:

3.2 Effect sizes
----------------



4.0 Intervention
++++++++++++++++

Historically, prevention research has primarily focused on stunting, and, as a research outcome, wasting has been considered primarily within the context of humanitarian emergencies. Although the volume of studies related to wasting prevention through direct and indirect health-care sector areas has increased in recent years, this evidence base is mixed and often inconclusive. We reviewed the literature from the recent Keats et al 2021 update of effective interventions to address maternal and child malnutrition and selected interventions that have moderate or strong evidence for implementation. We selected interventions that:

1)	Directly prevent acute malnutrition (SQ-LNS), moderate or severe;
2)	Treat or manage acute malnutrition (GAM treatment), moderate or severe;
3)	Increase rates of exclusive or continued breastfeeding;
4)	Increase birthweight;
5)	Reduce incidence of infectious disease; or
6)	Improve recovery from infectious disease.

.. note::

  Interventions that may improve wasting burden through these pathways that were not considered in our model include:

    - Indoor residual spraying for malaria vector control
    - Vitamin A supplementation
    - Cash transfers

.. _4.1:

4.1 Simulation scenarios
------------------------

.. _ciff_scale_up_algorithm:

.. note::

  For all alternative scenarios, intervention coverage and/or efficacy parameters should scale according to the following algorithm: 

    Intervention parameters should start at the baseline level at the beginning of the simulation on 1/1/2022 and remain at that level until 12/31/2022.
    
    Intervention parameters should then begin to scale linearly from the baseline level to the alternative scenario values over the course of three years starting on 1/1/2023 and  reaching the alternative scenario values on 12/31/2025.
    
    Intervention parameters should then be held constant at the alternative scenario values from 1/1/2026 until the end of the simulation on 12/31/2026.

    The coverage scale-up has been implemented according to the following scheme:

      c_b = baseline coverage
      c_a = alternative coverage
      0 <= t <= 1 represents the proportion of time elapsed to total scale-up duration
      total_coverage(t) = (1-t)*c_b + t*c_a = t*(c_a - c_b) + c_b

      uncovered(t) = 1 - total_coverage(t)
      baseline_covered(t) = (1-t) * total_coverage(t)
      alternative_coverage(t) = t * total_coverage(t)

**Baseline**
The baseline scenario will project GBD 2019 demographic and disease trends and GBD 2020 exposure trends out from 2022 to 2027 and coverage rates for all preventive and therapeutic interventions will be held constant across the 5 years of the microsimulation to simulate a business-as-usual treatment scenario. Baseline coverage/efficacy values for each of the modeled interventions can be found in the following locations:

- :ref:`Acute malnutrition treatment and management baseline parameters <wasting-treatment-baseline-parameters>`: see the :math:`C_{SAM}`, :math:`C_{MAM}`, :math:`E_{SAM}`, and :math:`E_{MAM}` parameters

- :ref:`Small quantity lipid based nutrient supplements (SQ-LNS) baseline parameters <sqlns-baseline-parameters>`

- :ref:`Maternal Supplementation baseline parameters <maternal-supplementation-baseline-parameters>`: see the value for the proportion of the pregnant population who took *any* antenatal iron in Ethiopia.

- :ref:`Insecticide treated nets baseline parameters <itn-baseline-parameters>`

- :ref:`Preventive and therapeutic zinc baseline parameters <zinc-baseline-parameters>`

.. note::

  The following interventions have been removed from the scope of this simulation

  - :ref:`Intermittent malaria preventive therapy for pregnant women baseline parameters <iptp-baseline-parameters>`: PENDING DECISION TO INCLUDE IN SIMULATION

  - Kangaroo care for preterm and low birthweight infants baseline parameters

  - :ref:`Breastfeeding support baseline parameters <breastfeeding_intervention_baseline_data>`


**Alternative scenario 1**
Scale up the :ref:`acute malnutrition treatment and management baseline parameters <wasting-treatment-baseline-parameters>` for SAM (:math:`C_{SAM}`and :math:`E_{SAM}`) to the alternative scenario values in the table below. Note that intervention efficacy may *decrease* in the alternative scenario relative to the baseline scenario for some draws -- however, this may be a realistic effect of a dramatic increase in intervention coverage and *effective* coverage (:math:`E \times C`) should be greater for all draws in the alternative scenario. See the :ref:`treatment and management for acute malnutrition document<intervention_wasting_treatment>` for more information.

.. _`wasting-treatment-alterative-scenario-values`:

.. list-table:: Wasting treatment and management alterative scenario intervention parameter values
  :header-rows: 1

  * - Parameter
    - Alternative scenario value
    - Note
  * - :math:`C`
    - 0.7
    - Informed by discussion with CIFF/UNICEF
  * - :math:`E`
    - 0.75
    - Informed by Sphere standards

.. note::

  Rather than scale linearly from between the baseline and alternative scenario values for the :math:`E` parameters, we will instead scale linearly so that 100% of the intervention coverage at the beginning of the scale-up period has efficacy equal to the baseline values (and 0% equal to the alternative scenario values) and 100% of the intervention coverage at the end of the scale-up period has efficacy equal to the alternative scenario values (and 0% equal to the baseline values).

**Alternative scenario 1.5**
Scale up the :ref:`acute malnutrition treatment and management baseline parameters <wasting-treatment-baseline-parameters>` for both SAM and MAM (:math:`C_{SAM}`, :math:`C_{MAM}`, :math:`E_{SAM}`, and :math:`E_{MAM}`) to the same alternative scenario values shown in the table above (in the alternative scneario 1 section). 

**Alternative scenario 2**
Scale up the SQ-LNS for 6 month+ from the baseline coverage to **90%** in addition to the intervention coverage in alternative scenario 1. 

.. todo::

  Consider targeting SQ-LNS coverage to simulants in SAM treatment.

.. todo::

  Consider if 90% intervention coverage is too aspirational

**Alternative scenario 3**
Scale up of LBWSG intervention parameters (see table below) from baseline coverage to **90%** in addition to the intervention coverage in alternative scenario 2.

.. list-table:: Alternative scenario 3 intervention coverage values
  :header-rows: 1

  * - Intervention
    - Coverage value
    - Note
  * - :ref:`maternal supplementation <maternal_supplementation_intervention>`
    - 0.9
    - Applies to joint coverage of MMS/BEP
  * - :ref:`insecticide treated nets <insecticide_treated_nets>`
    - :math:`C_\text{malarious areas} = 0.9`
    - Overall ITN intervention coverage (:math:`C_\text{overall}`) calculated as :math:`C_\text{malarious areas} \times p_\text{malarious areas}`
  * - :ref:`intermittent malaria preventive therapy for pregnant women <maternal_malaria_prevention_therapy>`
    - 0.9
    - Pending decision to include intervention in simulation

**Alternative scenario 4**
Scale-up of vicious cycle interventions (preventive and therapeutic zinc) from baseline coverage to 90% in addition to the intervention coverage in alternative scenario 3.

.. note::

  Intervention coverage in alternative scenarios one through four should be implemented in an additive way such that the treatment intervention is introduced in scenario 1 and is also present for the remaining scenarios (2, 3, and 4), the SQ-LNS intervention is introduced in scenario 2 and is also present for the remaining scenarios 3 and 4, etc.

.. note::

    In the BEP paper reviewer comments, this 90% was deemed to be too optimistic and we are asked to do some sensitivity analysis around this. Hence, we could model a few coverages eg. 50%, 75%, 90%.

    Consider 70% target for all interventions.

.. _ciff_sam_intervention_timing:

4.2 Simulation timeframe and intervention start dates
-----------------------------------------------------

.. list-table:: Simulation and intervention start and end dates
  :widths: 3 3 10
  :header-rows: 1

  * - Description of time point
    - Date
    - Notes
  * - Simulation start
    - 2022-01-01
    - We are running a 1-year "burn-in" period at baseline before starting any interventions. 
  * - Simulation end
    - 2026-12-31
    - The simulation will run for a total of 6 years
  * - Intervention start
    - 2023-01-01
    - All interventions in all alternative scenarios should start on the same date, 2 years after the simulation starts
  * - Intervention end
    - 2026-12-31
    - All interventions should run until the end of the sim

.. _5.0:

5.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _5.1:

5.1 Vivarium concept model diagram
----------------------------------

.. image:: am_concept_model_diagram.svg

5.1.1 Cause Models
~~~~~~~~~~~~~~~~~~

* :ref:`Diarrheal Diseases (GBD 2019) <2019_cause_diarrhea>`

* :ref:`Lower Respiratory Infections (GBD 2019) <2019_cause_lower_respiratory_infections>`

* :ref:`Measles (GBD 2019) <2019_cause_measles>`

5.1.2 Joint Cause-Risk Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Child Wasting / Protein Energy Malnutrition (GBD 2020) <2020_risk_exposure_wasting_state_exposure>`

5.1.3 Risk Exposure Models
~~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Child Stunting (GBD 2020) <2020_risk_exposure_child_stunting>`

* :ref:`Low Birthweight and Short Gestation (GBD 2019) <2019_risk_exposure_lbwsg>`

* :ref:`Maternal Body Mass Index <2019_risk_exposure_maternal_bmi>`

* :ref:`Wasting X-Factor Risk Exposure <2019_risk_exposure_x_factor>`

.. note::

  :ref:`Suboptimal Breastfeeding (GBD 2020) <2020_risk_suboptimal_breastfeeding>` has been removed from this simulation.

5.1.4 Risk Effects Models
~~~~~~~~~~~~~~~~~~~~~~~~~

* Child Stunting Risk Effects (GBD 2020)

* :ref:`Child Wasting Risk Effects (GBD 2020) <2019_risk_effect_wasting>`

* :ref:`Low Birthweight and Short Gestation Risk Effects (GBD 2019) <2019_risk_effect_lbwsg>`

* :ref:`Wasting X-Factor Risk Effects <2019_risk_effect_x_factor>`

* :ref:`Diarrheal Diseases Risk Effects <2019_risk_effect_diarrheal_diseases>`

.. note::

  :ref:`Suboptimal Breastfeeding Risk Effects (GBD 2020) <2020_risk_suboptimal_breastfeeding>` have been removed from this simulation.

5.1.5 Risk-Risk Correlation Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. warning::

  We are currently not planning on implementing the following risk correlation scheme as part of the scope of this simulation, with the exception of :ref:`Maternal BMI and birthweight <2019_risk_correlation_maternal_bmi_birthweight>` as well as the correlation between x-factor and child wasting exposure, described on the :ref:`x-factor exposure page <2019_risk_exposure_x_factor>`.

* :ref:`Birthweight and child wasting risk-risk correlation <2019_risk_correlation_birthweight_wasting>`

* :ref:`Birthweight and child stunting risk-risk correlation <2019_risk_correlation_birthweight_stunting>`

* :ref:`Maternal BMI and birthweight <2019_risk_correlation_maternal_bmi_birthweight>`

* Correlation between x-factor and child wasting exposure, described on the :ref:`x-factor exposure page <2019_risk_exposure_x_factor>`

The following diagram represents the resulting model correlation structure in our simulation. The figure represents relationships that are explicitly modeled in our simulation. However, directly modeling these relationships will result in an induction of correlation between wasting and stunting through their respective correlations with birthweight. Additionally, lower birthweight and stunting will also be associated with greater wasting incidence rates through their correlations with the x-factor. The age-specific correlation between wasting and stunting risk exposures in our model should be evaluated in the model results and compared to external validation sources, described in the :ref:`wasting and stunting correlation document <2019_risk_correlation_wasting_stunting>`.

.. image:: correlation_structure.svg

For correlated risks that affect the same outcomes in our simulation (just wasting and stunting in this model), the joint PAF calculation rather than multiplicative PAF calculation should be used for outcomes affected by wasting and stunting (see the :ref:`risk correlation document <risk_correlation>` for details). The joint PAF equation is shown below for convenient reference.

.. math::

  PAF_{joint} = 1 - \frac{1}{\frac{1}{n}\sum_{i=1}^{n} RR_1^{e1_i} \cdot RR_2^{e2_i}}

5.1.6 Feedback Loop Models
~~~~~~~~~~~~~~~~~~~~~~~~~~

* See :ref:`Diarrheal Diseases Risk Effects <2019_risk_effect_diarrheal_diseases>`

5.1.7 Intervention Models
~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Small quantity lipid based nutrient supplements (SQ-LNS) <lipid_based_nutrient_supplements>`

* :ref:`Treatment and management for acute malnutrition <intervention_wasting_treatment>`

* :ref:`Maternal Supplementation: Targeted Balanced Energy Protein and Maternal Micronutrient Supplementation <maternal_supplementation_intervention>`

* :ref:`Insecticide treated nets <insecticide_treated_nets>`

* :ref:`Preventive and therapeutic zinc <zinc_supplementation>`

.. note::

  The following interventions have been removed from the scope of this simulation:

  * :ref:`Intermittent malaria preventive therapy for pregnant women <maternal_malaria_prevention_therapy>`: We may not model the intermittent malaria preventive therapy for pregnant women given that this intervention is not recommended in Ethiopia. The decision to include/exclude this intervention is pending more investigation into the national recommendation and model builds for this intervention should not begin until the decision is finalized.

  * Kangaroo care for preterm and low birthweight infants and :ref:`Breastfeeding promotion <breastfeeding_promotion>`: These interventions are hypothesized to affect child wasting burden via their improvements in exclusive breastfeeding rates and the associated reduction in infectious disease burden that occurs in the first six months of life. However, we are not currently modeling wasting transition rates among infants younger than six months of age. Therefore, we are excluding them from the simulation as they will not affect any modeled wasting transition rates among children aged 6-59.

.. _5.2:

5.2 Demographics
----------------

.. _5.2.1:

5.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Location: Ethiopia
- Cohort type: Prospective open cohort of 0-5 years
- Size of largest starting population: 100,000 simulants
- Time span: July 1, 2021 to December 31, 2026 (Observation time of interest: January 1, 2022 to December 31, 2026)
- Time step: 0.5 days

.. note::

  The simulation start date was set to run six months earlier in order to run a "burn-in" period to accomodate the increased wasting burden associated with the x-factor initialization strategy. The strategy of initializing simulants x-factor exposure and child wasting exposure using the same propensity causes an initial increase in SAM burden as all simulants in the MAM state will transition to the SAM state at an increased rate. The burn-in period of six months was chosen so that the x-factor and wasting joint exposure distribution will stabilize prior to the period of simulation observation.

.. _5.2.2:

5.2.2 Population of interest
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. _5.3:

5.3 Models
----------

.. list-table:: Model verification and validation tracking
   :widths: 3 10 20
   :header-rows: 1

   * - Model
     - Description
     - V&V summary
   * - 1: cause and mortality models
     - 
     - `See model 1 validation notebooks here <https://github.com/ihmeuw/vivarium_research_ciff_sam/tree/main/model_validation/model1>`_
   * - 2: stunting and wasting
     - 
     - `See model 2 validation notebooks here <https://github.com/ihmeuw/vivarium_research_ciff_sam/tree/main/model_validation/model2>`_
   * - 3: sq-lns intervention
     - 
     - `See model 3 validation notebook here <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model3/2021_09_09a_ciff_sam_v3.1_vv_check_sqlns.ipynb>`_
   * - 4: treatment intervention
     - Treatment intervention implemented, no wasting transitions or effects under six months of age
     - [1] `GBD risk validation looking good <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/model_4.0.1_cgf_exposure.pdf>`_. [2] `Underestimating some GBD causes <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/model_4.0.1_cause_verification.pdf>`_; PEM underestimation likely due to differences in PEM 2019 vs. wasting 2020. [3] Issues with definition of treatment coverage (`too low in MAM/SAM states <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/2021_10_29a_ciff_sam_v4.1_vv_wasting_treatment_coverage.ipynb>`_). [4] Relapse to MAM/SAM too high (need to calibrate to mild->TMREL remission rate and x-factor). 
   * - 4.5: x-factor implementation
     - x-factor implemented (exposure: 0.18; effect: [1.1,1.2,1.3,1.4,1.5] for i1, i2, i3 wasting transitions)
     - [1] GBD `risk <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/model_4.0.1_cgf_exposure.pdf>`_ validation lookin good and `cause <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/model_4.0.1_cause_verification.pdf>`_ validation looking the same as model 4.0. [2] Still issues with definition of treatment coverage (too low in MAM/SAM states). [3] Treatment coverage still underestimated [4] Relapse to MAM/SAM still too high (still need to calibrate to mild->TMREL remission rate and x-factor).
   * - 4.5.3: x-factor targeted exposure
     - mild->TMREL recovery rate updated from 1/1000 to 1/27. x-factor effects: i3=1, i2=3.16, i1=3.16. X-factor exposure dependent on wasting state at initialization: sam=0.6, mam=0.5, mild=0.25, tmrel=0.01
     - [1] `Underestimating MAM exposure <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/model_4_calibration_test_exposure.pdf>`_... this is likely due to (a) an issue with the code for the x-factor PAF which caused it to not be calculated based on the updated x-factor exposure, and/or (b) the x-factor exposure initialization based on simulants' wasting state at initialization (which will vary by age), causing the exposure to vary by the age at which a simulant was initialized into the model, `as shown here <https://github.com/ihmeuw/vivarium_research_ciff_sam/pull/58>`_ [2] `GBD cause model validation similar to previous models <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/model_4_calibration_test_cause_verification.pdf>`_. [3] treatment coverage still underestimated [4] Relapse to MAM/SAM more reasonable, still too high from TMREL/mild categories (link to interactive sim notebook). [5] Update made interventions `slightly more effective <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/results/results_processing_model_4_calibration_test.ipynb>`_ than `model 4 <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/results/results_processing_4.1.ipynb>`_.
   * - 4.5.4: x-factor PAF calculation fix and exposure implementation change
     - mild->TMREL recovery rate updated from 1/27 to 1/75. X-factor exposure refactored to have same propesnity as wasting state initialization propensity and exposure set to 0.32. x-factor effects: i3=1, i2=3.16, i1=3.16. 
     - [1] `overestimating SAM exposure <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/model_4.5.4_exposure.pdf>`_. [2] `GBD cause model verification similar to previous models <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/model_4.5.4_cause_verification.pdf>`_. [3] `X-factor among the SAM state is lower than expected based on updated x-factor exposure parameterization <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/2021_11_15b_v4.5.4_vv_x_factor_prevalence.ipynb>`_. [4] treatment coverage still underestimated [5] Relapse to MAM/SAM more reasonable, still too high from TMREL/mild categories (link to interactive sim notebook). 
   * - 4.5.5: intervention coverage and coverage propensity updates as well as fix for x-factor exposure among SAM state
     - mild->TMREL recovery rate updated from 1/75 to 1/30, x-factor exposure updated from 0.32 to 0.5, x-factor effects: i3=1, i2=3.16, i1=3.16. X-factor exposure among SAM state bugfix from model 4.5.4. Treatment coverage propensity updated to reset upon each wasting transition in accordance with `this  PR <https://github.com/ihmeuw/vivarium_research/pull/685>`_. `Treatment coverage values <https://github.com/ihmeuw/vivarium_research/pull/678>`_ and `scale-up <https://github.com/ihmeuw/vivarium_research/pull/683/files>`_.
     - [1] `overestimating SAM and underestimating MAM exposure <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/model_4.5.5_exposure.pdf>`_, although `less than in model 4.5.4 <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/model_4.5.4_exposure.pdf>`_. [2] `GBD cause model verification for 4.5.5 similar to previous models <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/model_4.5.5_cause_verification.pdf>`_. [3] `x-factor exposure now validating <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/995932712e89769a14187490bf9047c5f94ca178/model_validation/model4/2021_11_24b_v4.5.5_vv_x_factor_prevalence.ipynb>`_. [4] `x-factor effect to SAM slightly overestimated <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/995932712e89769a14187490bf9047c5f94ca178/model_validation/model4/2021_11_24a_v4.5.5_vv_x_factor_wasting_incidence_rate_ratio.ipynb>`_. [5] treatment coverage updates look as expected (link to validation notebook). [6] Relapse to MAM/SAM TBD (link to interactive sim notebook). [7] `wasting transition rates (and treatment effects) are looking as expected <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/4.5.5_wasting_transition_rates.ipynb>`_, except it appears that the i1 incidence rate may be overestimated as a result of greater x-factor exposure among the MAM state (source state for transition) than the general population (source for PAF calculation), `as shown in this notebook <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/4.5.5_v_4.5.6_wasting_transition_rates.ipynb>`_.
   * - 4.5.6: x-factor removed
     - Same as model 4.5.5 except x-factor component removed from this model build. Intended as a test run of x-factor effect in comparison to model 4.5.5
     - [1] `wasting exposure prevalence validating to GBD <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/model_4.5.6_exposure.pdf>`_. [2] `impact of interventions is slightly greater, but similar, to model 4.5.5 <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/results/results_processing_4.5.5_versus_4.5.6.ipynb>`_.
   * - 4.5.7: x-factor custom paf
     - Implemented custom x-factor PAF calculation to reflect x-factor exposure in source state of x-factor-affected transition rather than exposure in the general population (`implementation PR linked here <https://github.com/ihmeuw/vivarium_ciff_sam/pull/75>`_ and `documentation PR linked here <https://github.com/ihmeuw/vivarium_research/pull/695>`_), in an attempt to fix the overestimation of SAM from model 4.5.5 
     - `Results are exactly the same to model 4.5.5 <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/4.5.5_v_4.5.7_wasting_transition_rates.ipynb>`_, indicating that the update was not properly implemented (simulation was launched from the incorrect branch of vivarium public health)
   * - 4.5.8: x-factor custom paf bugfix
     - Same as model 4.5.7, but launched from the correct branch to correctly implement the custom x-factor PAF calculation
     - [1] `Wasting exposure valiation issues resolved with slight underestimation of MAM exposure <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/model_4.5.7_bugfix_exposure.pdf>`_ [2] `Cause model verification still slightly off <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/model_4.5.7_bugfix_cause_verification.pdf>`_
   * - 5.1.0: LBWSG, no observers
     - LBWSG risk implementation without birthweight-specific observers
     - Simulation run failed due to qlogin expiration. Interactive simulation run without risk effects, `found here <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/interactive_simulations/model_5/lbwsg_exposure_5.1.0.ipynb>`_
   * - 5.1.1: LBWSG, with observers
     - LBWSG risk implementation with birthweight-specific observers
     - Bug in LBWSG observers caused simulation results to not be usesable. `Interactive simulation run for 14 days only <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/interactive_simulations/model_5/lbwsg_exposure_5.1.1.ipynb>`_
   * - 5.1.2 lbwsg with observers
     - LBWSG risk factor exposure and effects (including affected unmodelled causes) and birthweight-specific observers, post bugfixes
     - [1] `Cause model V&V plots <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model5/plots/model_5.1.2_cause_verification.pdf>`_: mortality rates a bit off, but could be a result of the underlying cause model issues that need to be investigated (noted in the table below). [2] `Birthweight observer outcomes <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model5/2022_01_05a_v5.1.2_check_lbwsg_outputs.ipynb>`_ appear to validate to `birthweight artifact data <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model5/2022_01_05b_check_lbwsg_exposure_from_artifact.ipynb>`_, but we want to follow-up with GBD modelers about higher average birthweights among females than males in the artifact data. [3] Issue identified with late neonatal LBWSG exposure in which `exposure changes upon transition from early to late neonatal age group <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/interactive_simulations/model_5/lbwsg_exposure_bug_investigation.ipynb>`_, although relative risk changes to the appropriate value according to the exposure *at birth*. Therefore, exposure in late neonatal age group is unreliable, `shown in interactive sim here <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/interactive_simulations/model_5/lbwsg_exposure_5.1.2.ipynb>`_.
   * - 5.2.1 maternal BMI
     - Add maternal BMI risk exposure and risk effect
     - `Validation notebook can be found here <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/39d6bc256ec99eb1c5c0cf4717ffbb50a9f5d62f/model_validation/model5/model_5.2.0_gbd_verification.ipynb>`_: maternal BMI risk exposure and risk effects look as expected, no changes in wasting/stunting risk exposure or cause model validation from model 5.1.2. LBWSG interactive simulation V&V to follow.
   * - 5.3.0 maternal supplementation intervention
     - Add LBWSG scenario with maternal supplementation intervention. Also, the birthweight exposure bug for the late neonatal age group (identified and discussed in model 5.1.2 notes) was fixed.
     - `Intervention implementation looks as expected <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model5/5.3.0_maternal_supplementation_intervention.ipynb>`_. Still need to do interactive sim to double check that the late neonatal BW exposure bug is resolved.
   * - 5.3.1 insecticide treated nets intervention
     - Add insecticide treated nets to the LBWSG scenario 
     - Validation notebook can be found here. [1] ITN target coverage is as expected, but it does not appear to scale-up and rather is implemented at target coverage for entire simulation. [2] BW shift for ITN coverage is a bit high in baseline scenario (40g) and a bit low in intervention scenario (29g), when expected value is 23 g - we also would not expect a different shift magnitude for the intervention across different scenarios.
   * - 5.3.2 cause model updates and wasting/diarrheal diseases affected entity update
     - Made updates to infectious disease durations, including diarrheal diseases and lower respiratory infections. These updates affected infectious disease remission rates as well as wasting state-specific mortality rates used in the wasting transition model and are detailed in the following PRs: https://github.com/ihmeuw/vivarium_research/pull/756/ and https://github.com/ihmeuw/vivarium_research/pull/752/. Additionally, updated the affected entity for the wasting on diarrheal diseases risk outcome pair from the incidence rate to the excess mortality rate, as discussed on the :ref:`wasting risk effects document <2019_risk_effect_wasting>`.
     - [1] `Cause model parameters look as expected <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model5/plots/model_5.3.2_cause_verification.pdf>`_, with the exception of [a] still underestimating of LRI burden in the neonatal age groups, and [b] slight underestimation of diarrheal disease mortality for all age groups (new problem). [2] `Wasting exposures look as expected <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model5/plots/model_5.3.2_exposure.pdf>`_. [3] `Wasting risk effects appear to have been updated as expected <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model5/model_5.3.2_risk_effects_verification.ipynb>`_. [4] `still seeing issues with the ITN intervention as identified above <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model5/5.3.2_lbwsg_interventions.ipynb>`_.
   * - 5.3.3 sensitivity analysis for SAM k value, updates to diarrheal diseases cause model
     - Sensitivity analysis run on sam k value from the wasting treatment intervention model such that baseline value = 6.7 (95% CI: 5.3, 8.4) and the alternative value = 3.5 (95% CI: 3.1, 3.9). Also, updates to the diarrheal diseases prevalence and excess mortality rate `in accordance with this pull request <https://github.com/ihmeuw/vivarium_research/pull/759>`_
     - [1] `Cause model parameters look good <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model5/plots/model_5.3.3%20alternative%20K_cause_verification.pdf>`_ with the exception of some early neonatal age groups, which should have minimal impact on our model [2] `Wasting exposures look as expected for both SAM K scenarios <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model5/plots/model_5.3.3%20alternative%20K_exposure.pdf>`_. [3] still seeing the issues with the ITN intervention as previously identified. Also, it appears that we are now overestimating the impact of MMS relative to IFA, which is a new problem. `Notebook for the LBWSG intervention validations found here <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model5/5.3.3_lbwsg_interventions.ipynb>`_ 
   * - 6.0.0 diarrheal diseases risk effects
     - Applied risk effects of diarrheal diseases on wasting transition rates
     - [1] `appears that there are wasting transition rates to more severe wasting states occuring among simulants under six months of age <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model6/model_6.0.0_vicious_cycle_effect_verification.ipynb>`_. This is a new problem that appears to be a result of the diarrheal diseases risk effects implementation. [2] the previous problem is resulting in an `overestimation of SAM in the first year of life and an overestimation of associated morbidity/mortality due to causes affected by the wasting risk factor. However, the wasting exposure distribution appears to be validating to GBD in the older age groups <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model6/model_6.0.0_gbd_verification.ipynb>`_, implying that the issue may be driven by the wasting transitions in the under six month population rather than an issue with the diarrheal diseases risk effects in the population above six months of age. [3] there is a slight `overestimation of the wasting risk effects on mortality due to diarrheal diseases <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model6/model_6.0.0_risk_effects_verification.ipynb>`_. This is likely due to a bias in the PAF equation due to a difference in the wasting risk exposure distribution among the general population and the population at risk of the diarrheal diseases mortality outcome (those infected with diarrheal diseases) due to the correlation induced bewteen these factor through the implmenetation of the effect of diarrheal disease incidence on wasting transition rates. [4] `ITN intervention coverage and effect size looking as expected now <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model6/model_6.0.0_lbwsg_interventions.ipynb>`_.
   * - 6.0.1 bugfix for wasting transitions under six months of age
     - Fixed a bug identified in the last model run that caused incident wasting transitions in simulants younger than six months of age
     - [1] `There are no longer wasting transitions among simulants younger than six months of age <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model6/model_6.0.1_vicious_cycle_effect_verification.ipynb>`_. [2] `Wasting and GBD cause model validation looks reasonable <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model6/model_6.0.1_gbd_verification.ipynb>`_. [3] `still an overestimation of wasting risk effects on diarrheal disease mortality <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model6/model_6.0.1_risk_effects_verification.ipynb>`_ [4] `we are overestimating the expected wasting state prevalence ratio by diarrheal disease status <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model6/model_6.0.1_vicious_cycle_effect_verification.ipynb>`_
   * - 6.2.1 zinc supplementation interventions
     - Implementation of preventative and therapeutic zinc interventions (coverage and effects)
     - [1] `gbd verification looks as expected <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model6/model_6.2.1_gbd_verification.ipynb>`_. [2] `zinc coverage and intervention effects look as expected <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model6/model_6.2.1_zinc_intervention.ipynb>`_
   * - 7.0.0 full model no x-factor
     - Full model, no x-factor. Zinc supplementation coverage in children under six months of age.
     - Issues with vicious cycle (described in outstanding V&V section below)
   * - 7.1.0 full model diarrheal diseases remission bugfix
     - Attempted fix to the diarrheal diseases remission rate that was not successful.
     - Still slightly underestimating diarrheal diseases remission rate (average duration of 4.5 days instead of 4.3 days). This appears to be causing some downstream effects on vicious cycle implementation (see table below). However, we have re-calculated verification targets according to this updated diarrheal diseases duration and confirmed that we meet these targets and moved forward with this model version.


.. list-table:: Outstanding verification issues
   :header-rows: 1

   * - Issue
     - Explanation
     - Action plan
     - Timeline
   * - `Underestimation of female PEM CSMR <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/model_4.0.1_cause_verification.pdf>`_
     - Due to discepancies between GBD 2020 wasting exposure model and GBD 2019 PEM mortality model
     - Update PEM mortality model to GBD 2020 when available
     - As soon as it's ready
   * - `Underestimation of lower respiratory infections and diarrheal diseases burden in early neonatal age groups <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model5/plots/model_5.3.3%20alternative%20K_cause_verification.pdf>`_
     - Result of LBWSG risk effects causing EMRs to be quite large after multiplying by LBWSG relative risk values relative to the simulation timestep (see :ref:`Choosing an Appropriate Time Step page <vivarium_best_practices_time_steps>` page for explanation). 
     - This was not addressed for this simulation because it did not have a significant impact on wasting results. However, the `changes to the cause models made in this PR <https://github.com/ihmeuw/vivarium_research/pull/1006>`_ and implemented for the :ref:`IV iron child simulation <2019_concept_model_vivarium_iv_iron_child_sim>` should resolve the issue. 
     - N/A
   * - Overestimation of wasting cat2 effect on diarrheal diseases CSMR
     - `As demonstrated in this notebook <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model7/model_7.1.1_risk_effects_verification.ipynb>`_. Appears to be due to application of RRs to EMR without consideration of increased prevalence of high risk wasting states among population infected with diarrheal diseases and therefore at risk of mortality
     - This should become less significant when the updates fix the overestimation of the diarrheal diseases prevalence ratios (below) are implemented. Will need to verify when those results come in.
     - On hold.
   * - Overestimation of wasting state prevalence ratios by diarrheal disease status
     - `Shown in this notebook <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model7/model_7.0.0_vicious_cycle_effect_verification-Copy1.ipynb>`_. Appears to be due to excess time spent in diarrheal disease state due to small timestep issue that causes a slower remission rate than was used to calculate the diarrheal diseases risk effects (`investigated in this notebook <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/wasting_transitions/alibow_vicious_cycle/vicious_cycle_effect_estimation_and_investigation.ipynb>`_).
     - Update diarrheal diseases duration value `in accordance with this PR <https://github.com/ihmeuw/vivarium_research/pull/793>`_
     - Unsuccessful attempt was made for model 7.1.0, but it was successfully implemented in the :ref:`IV iron child simulation <2019_concept_model_vivarium_iv_iron_child_sim>`. On hold.
   * - Zinc supplementation coverage issues among children under 6 months of age
     - We intended to restrict the zinc supplementation intervention to children above six months of age only. However, this was accidentally implemented correctly for the baseline intervention and kept as all children under five for the scale-up intervention in the alternative scenarios.
     - We've kept this as-is in the model and handled it during post-processing.
     - N/A

**Model validation notes**

- Impact of zinc supplementation on wasting incidence is not especially high quality, but has been studied by [Lassi-et-al-2020-ciff-sam]_. There was no significant difference in wasting incidence of zinc supplementation relative to placebo (RR: 0.78, 95% CI 0.48 to 1.26; 3 studies). However, the relative risk of zinc + riboflavin relative to riboflavin alone was equal to 0.59 (95% CI 0.37 to 0.96) based on one study. Notably, riboflavin is a B vitamin that can form a complex with zinc minerals and increase zinc absorption in the gut. Notably, relative to all other interventions, a complete scale-up of the zinc intervention resulted in just under a 10% decrease in incident wasting cases in our simulation, which is an underestimation of the impact implied from the results included in the Cochrane review.

- Note that our current model scenario design may double count potential impacts of the SQ-LNS and zinc supplementation interventions given that SQ-LNS formulations may contain zinc.

.. _5.4:

5.4 Desired outputs
-------------------

Final outputs to report in manuscript :code:`I:\RTs_and_Projects\Sim_Science_RT\04_Projects\Archive\Severe Acute Malnutrition Sim (CIFF)\Deliverables\20220311_IHME simulation report.pdf`

.. csv-table:: Final outcomes table to report in manuscript
   :file: final_outcomes_output_shell.csv
   :widths: 20, 20, 10, 10, 10, 10, 10, 10, 10
   :header-rows: 1

.. note::

  draft table to be refined

.. _5.5:

5.5 Simulation output table
---------------------------

.. csv-table:: Simulation output table
   :file: simulation_output_table.csv
   :header-rows: 0

.. _6.0:

6.0 Back of the envelope calculations
+++++++++++++++++++++++++++++++++++++


.. _7.0:

7.0 Limitations
+++++++++++++++

See project technical report.

Additional important limitation: we may double count some potential impacts of the zinc and SQ-LNS interventions given that SQ-LNS products may contain zinc.

8.0 References
+++++++++++++++

.. [Lassi-et-al-2020-ciff-sam]
  Lassi ZS, Kurji J, Oliveira CS, Moin A, Bhutta ZA. Zinc supplementation for the promotion of growth and prevention of infections in infants less than six months of age. Cochrane Database Syst Rev. 2020 Apr 8;4(4):CD010205. doi: 10.1002/14651858.CD010205.pub2. 
