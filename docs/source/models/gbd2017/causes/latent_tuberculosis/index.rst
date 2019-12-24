.. _2017_cause_latent_tb:

===================
Latent Tuberculosis
===================

Validation and Verification Criteria
------------------------------------

Obejective
++++++++++
External
 - Model results should be checked against local TB epidemiology
    - e.g. rate of decline in burden of disease should be compared
      with historical evidence.
 - Compare our results (e.g. ICERs) to similar models or empirical
   assessments where possible
Internal
 - Test hypotheses without develop a full simulation. 
 - Calibrate simulation baseline against GBD 2017 results
    - Sim outputs mean should perfectly match GBD results.
    - Sim outputs uncertainty should be wider than GBD results,
      because both stochastic and parametric uncertainty are included.

V&V strategy
++++++++++++
Model Validation
 - Check the logical structure and input data for concept model,
   make sure
    - the theories and assumptions underlying the conceptual model are correct.
    - the data to build, evaluate, and test model are correct.
Model Verification
 - Check the translation from concept model to script based on test data,
   make sure
    - the computer programming and implementation of the concept model is correct.
    - the output of the model can be calibrated against GBD results.

logic
+++++
- Parent cause is the sum of child causes
    - Fatal: Deaths (CSMR, Excess MR), YLLs
    - Non-fatal: Cases, YLDs, Prevalence, Incidence
    - DALYs = YLLs + YLDs
- By location-/age-/sex-
- Start from count space
- We expect that total active TB cases less than LTBI cases for sim output
  of event count

How GBD post-processing results
+++++++++++++++++++++++++++++++
GBD starts from All-form TB results
    1. Find proportion of HIV+ cases among all TB cases
    2. Disaggregate into HIV+ TB and HIV- TB
    3. Find proportion of drug-resistant cases among HIV+ TB cases
       and HIV- TB cases
    4. Disaggregate into:
        - drug-susceptible TB, multidrug-resistant TB, and extensively
          drug-resistant TB
        - HIV+ drug-susceptible TB, HIV+ multidrug-resistant TB,
          and HIV+ extensively drug-resistant TB

Formula
+++++++
For certain location-/age-/sex-
    - Deaths due to all causes equal to sum of:
        - Deaths due to all-form TB (aggregate all child active TB causes)
        - Deaths due to HIV resulting in other diseases
        - Deaths due to other causes
Apply the formula to other measures (e.g. DALYs)

Steps of model verification
+++++++++++++++++++++++++++
1. Set hypothesis
    - The sum of the prevalences of all model states should equal
      to the GBD TB prevalence plus HIV prevalence. (Pre_297 + Prev_298
      = Sum(Prev_s))
    - The sum of the cause-specific mortality of all model states
      should equal to the GBD TB CSMR plus HIV CSMR. (CSMR_297 + 
      CSMR_298 = Sum(Prev_s * ExcessMR_s))
    - The prevalence weighted sum of the disability weight of all model states
      should equal to the GBD TB YLDs plus HIV YLDs. (ylds_297 + ylds_298 
      = Sum(Prev_s * dw_s))
2. Check for proposed hypothesis (e.g. prevalence for the whole model)
    - **Data:** Once the model input data is produced and put in the artifact,
      produce a graph of the sum of the input data prevalences and compare
      it to the GBD data not in the model.
    - **Sim initialization:** Initialize a simulation using the model input data
      and count the disease event to make sure it matches with GBD data 
      not in the model.
    - **Historical calibration:** Run a simulation from 2012 to 2017 and count
      the disease event at the end of the sim to make sure it matches with
      GBD data not in the model.
    - **Baseline verification:** Run a simulation from 2020 to 2025 and count
      the disease event at the end of the sim to make sure the baseline
      model outcomes match with GBD 2017 results.

Measure types in verification
+++++++++++++++++++++++++++++
Constrained verification
 - Compare (disease preson time / total person time) to prevalence in GBD
 - Compare (disease counts / person time) to incidence in GBD
Unconstrained verification
 - CSMR
 - YLLs
 - YLDs

Post-processing sim outputs
+++++++++++++++++++++++++++

.. todo::
  Add back-envelope calculation

.. todo::
  Add root-cause analysis
