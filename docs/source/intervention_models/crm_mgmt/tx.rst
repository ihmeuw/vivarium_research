.. _intervention_crm_mgmt_tx:


Blood pressure and lipid-lowering medications
*********************************************

blood pressure llt 


Medication initiation:
All simulants enrolled in the intervention initiate treatment (defined as initial fill of prescription(s))

Adherence:
All simulants get number from 0 to 1 drawn from non-uniform distribution of adherence in the general population [need to find]. Simulants with values >=0.8 are considered adherent and receive the full benefit of their medication.

ASCVD Risk score
score = -19.5 + 0.043 * sbp + 0.266 * age + 2.32 * sex

Implementation in previous code found here: https://github.com/ihmeuw/vivarium_csu_zenon/blob/7a1ba2a0eef46d8184bc4a38926224b95bebf58a/src/vivarium_csu_zenon/components/cvd.py#L57


.. list-table:: Key parameters for initialization
  :widths: 15 15 15 15
  :header-rows: 1

  * - Parameter
    - Reference
    - Data Source for Simulation
    - Notes
  * - Outpatient visit rate
    - GBD outpatient envelope
    - outpatient_visits=HealthcareEntity (name='outpatient_visits', kind='healthcare_entity', gbd_id=me_id(19797), utilization=me_id(19797),)
    - Outpatient utilization envelope from GBD; will want to update to use NHANES data in future
  * - Follow-up visit rate for cardiometabolic risk management 
    - AHA/ACC recommendations
    - uniform distribution from 3 to 6 months
    - 
  * - SBP measurement error
    - Br J Gen Pract 2011; DOI: 10.3399/bjgp11X593884
    - Normal distribution, mean=0, SD=2.9
    - 85% measurements within +/- 3 mm Hg; 15% within +/- 4-9 mm Hg
  * - SBP therapeutic inertia
    - Hypertension. J Hypertens 39:1238–1245 DOI:10.1097/HJH.0000000000002783; https://doi. org/10.1371/journal.pone.0182807
    - 0.4176
    - 48% uncontrolled htn (NHANES); 87% of the time this is due to therapeutic inertia
  * - SBP prescription initiation rate
    - Assumption for current run; will reevaluate in future
    - 100 %
    - 
  * - SBP adherence rate
    - Medical Expenditure Panel Survey, 2014
    - /share/scratch/projects/cvd_gbd/cvd_re/simulation_science/pdc_meps_2014.csv
    - 
  * - SBP treatment efficacy
    - BMJ 2009 May 19;338:b1665. doi: 10.1136/bmj.b1665.
    - /share/scratch/projects/cvd_gbd/cvd_re/simulation_science/drug_efficacy_sbp.csv
    - 
  * - SBP baseline coverage rate for each ramp position
    - Egan et al. Hypertension. 2012;59:1124- 1131.
    - /share/scratch/projects/cvd_gbd/cvd_re/simulation_science/tx_percent_initialize.csv
    -
  * - Proportion of Group 2 from SBP ramp algorithm receiving combination therapy
    - Byrd et al Am Heart J 2011;162:340-6.
    - 45%
    - Represents non-compliance with guidelines  
  * - SBP drug combinations
    - Medical Expenditure Panel Survey, 2014
    - 
    - 
  * - LDL-C measurement error
    - BMJ 2020;368:m149 doi: 10.1136/bmj.m149
    - normal distribution from 2 to 5%; mean and standard deviation
    - 
  * - LDL-C therapeutic inertia
    - https://pesquisa.bvsalud.org/portal/resource/fr/ibc-171028
    - 0.194
    - 
  * - LDL-C prescription initiation rate
    - Assumption; will revisit later
    - 100%
    - 
  * - LDL-C adherence rate
    - Medical Expenditure Panel Survey
    - 
    - 
  * - LDL-C treatment efficacy
    - 
    - 
    - 
  * - LDL-C baseline coverage rate
    - 
    - 
    - 
  * - Medication outreach effectiveness on medication adherence
    - Circulation. 2005;111(10):1298-1304. doi:10.1161/01.CIR.0000157734.97351.B2
    - OR 2.3 (95% CI 1.39-3.88) 
    - 
  * - Medication outreach baseline coverage
    - Assumption
    - 0%
    - 
  * - Polypill effectiveness on medication adherence
    - 
    - 
    - 
  * - Polypill baseline coverage rate
    - 
    - 
    - 
  * - Lifestyle Modification Education effectiveness on BMI, FPG, and Tobacco Initiation/Cessation
    - 
    - 
    - 
  * - Lifestyle Modification Education baseline coverage rate
    - 
    - 
    - 



On each time step, follow this a decision tree to adjust the treatment for a simulant: (a) does simulant interact with health system? Answer depends on outpatient visit rate, emergency visit if simulant had a heart attack, follow-up visit scheduled time and adherence rate.
If (a) is yes, if visit is for an emergency, (b) does provider overcome therapeutic inertia?
If (b) is yes, increase treatment for SBP and/or LDL-C
If (b) is no, (c) does measured SBP and/or measured LDL-C exceed threshold for increased treatment?
If (c) is yes, (d) does provider overcome therapeutic inertia?
If (d) is yes, increase treatment for SBP and/or LDL-C
If treatment was increased for SBP and/or LDL-C, (e) does patient initiate new prescription?
If patient has initiated a prescription (on this timestep or previously), (f) does patient adhere to treatment?
[[to add: schedule follow-up visit, give polypill instead of separate pills, refer to lifestyle medication education, enroll in medical outreach. Also make sure to document data sources for all parameters, e.g. probability simulant has outpatient visit to help answer (a) in simulation.]]





.. todo:: add link to stash repo with collapse code 
.. todo:: update with file for LDL 
.. todo:: add section describing adherence initialization; like a categorical risk factor; documentation like a dichotomous RF


