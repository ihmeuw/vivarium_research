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


.. _2020_concept_model_vivarium_ciff_sam:

===================================
Vivarium acute malnutrition Phase 2
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

.. todo::

  - Link working paper draft
  - Link previous CIFF concept model for more details

.. _ciff2_4.1:

4.1 Simulation scenarios
------------------------

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


**Alternative scenario 1**
Scale-up of vicious cycle interventions (preventive and therapeutic zinc) from baseline coverage to 90% in addition to the intervention coverage in alternative scenario 3.

.. note::

  Intervention coverage in alternative scenarios one through four should be implemented in an additive way such that the treatment intervention is introduced in scenario 1 and is also present for the remaining scenarios (2, 3, and 4), the SQ-LNS intervention is introduced in scenario 2 and is also present for the remaining scenarios 3 and 4, etc.

.. note::

    In the BEP paper reviewer comments, this 90% was deemed to be too optimistic and we are asked to do some sensitivity analysis around this. Hence, we could model a few coverages eg. 50%, 75%, 90%.

    Consider 70% target for all interventions.

**Alternative scenario 2**
Scale up targeted SQ-LNS use for simulants who are previously treated for MAM or SAM from the baseline coverage to **90%** in addition to the intervention coverage in prior scenarios. 

**Alternative scenario 3**
Scale up the SQ-LNS for 6 month+ from the baseline coverage to **90%** in addition to the intervention coverage in previous scenarios. 

.. todo::

  Consider if 90% intervention coverage is too aspirational


**Alternative scenario 4**
Scale up the :ref:`acute malnutrition treatment and management baseline parameters <wasting-treatment-baseline-parameters>` for SAM (:math:`C_{SAM}`and :math:`E_{SAM}`) to the alternative scenario values in the table below. Note that intervention efficacy may *decrease* in the alternative scenario relative to the baseline scenario for some draws -- however, this may be a realistic effect of a dramatic increase in intervention coverage and *effective* coverage (:math:`E \times C`) should be greater for all draws in the alternative scenario. See the :ref:`treatment and management for acute malnutrition document<intervention_wasting_treatment>` for more information.

.. _ciff2_`wasting-treatment-alterative-scenario-values`:

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

**Alternative scenario 5**
Scale up the :ref:`acute malnutrition treatment and management baseline parameters <wasting-treatment-baseline-parameters>` for both SAM and MAM (:math:`C_{SAM}`, :math:`C_{MAM}`, :math:`E_{SAM}`, and :math:`E_{MAM}`) to the same alternative scenario values shown in the table above (in the alternative scneario 1 section). 


.. _ciff2_4.2:

4.2 Simulation scenarios test runs
----------------------------------

.. list-table:: Simulation and intervention test runs for differential ordering
  :header-rows: 1

  * - Description of test run
    - Scenario Order 
  * - SQ-LNS before Increased MAM and SAM Coverage
    - 1, 2, 3, 4, 5 
  * - MAM and SAM Coverage before SQ-LNS 
    - 1, 4, 5, 2, 3 
  * - Targeted SQ-LNS Scale Up 
    - 1, 2, 4, 5, 3  


.. _ciff2_sam_intervention_timing:

4.3 Simulation timeframe and intervention start dates
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

.. _ciff2_5.0:

5.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _ciff2_5.1:

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

5.1.4 Risk Effects Models
~~~~~~~~~~~~~~~~~~~~~~~~~

* Child Stunting Risk Effects (GBD 2020)

* :ref:`Child Wasting Risk Effects (GBD 2020) <2019_risk_effect_wasting>`

5.1.7 Intervention Models
~~~~~~~~~~~~~~~~~~~~~~~~~

* :ref:`Small quantity lipid based nutrient supplements universal coverage (SQ-LNS) <lipid_based_nutrient_supplements>`

* Small quantity lipid based nutrient supplements targeted coverage (SQ-LNS) 

* :ref:`Treatment and management for acute malnutrition <intervention_wasting_treatment>`

.. _ciff2_5.2:

5.2 Demographics
----------------

.. _ciff2_5.2.1:

5.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Location: Ethiopia
- Cohort type: Prospective open cohort of 6-24 month old simulants
- Size of largest starting population: 100,000 simulants
- Time span: July 1, 2021 to December 31, 2026 (Observation time of interest: January 1, 2022 to December 31, 2026)
- Time step: 4 days

.. note::

  The simulation start date was set to run six months earlier in order to run a "burn-in" period to accomodate the increased wasting burden associated with the x-factor initialization strategy. The strategy of initializing simulants x-factor exposure and child wasting exposure using the same propensity causes an initial increase in SAM burden as all simulants in the MAM state will transition to the SAM state at an increased rate. The burn-in period of six months was chosen so that the x-factor and wasting joint exposure distribution will stabilize prior to the period of simulation observation.

.. _ciff2_5.3:

5.3 Models
----------

.. todo::

  Update table with models for Phase 2 following discussion


.. list-table:: Model verification and validation tracking
   :widths: 3 10 20
   :header-rows: 1

   * - Model
     - Description
     - V&V summary
   * - 
     - 
     - `


.. list-table:: Outstanding verification and validation issues
   :header-rows: 1

   * - Issue
     - Explanation
     - Action plan
     - Timeline
   * - `Underestimation of female PEM CSMR <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/model_4.0.1_cause_verification.pdf>`_
     - Due to discepancies between GBD 2020 wasting exposure model and GBD 2019 PEM mortality model
     - Update PEM mortality model to GBD 2020 when available
     - As soon as it's ready

.. _ciff2_5.4:

5.4 Desired outputs
-------------------

.. todo::

  Fill out this section 

.. _ciff2_5.5:

5.5 Simulation output table
---------------------------

.. todo::

  Fill out this section

.. _ciff2_6.0:

6.0 Back of the envelope calculations
+++++++++++++++++++++++++++++++++++++


.. _ciff2_7.0:

7.0 Limitations
+++++++++++++++

8.0 References
+++++++++++++++

