Initialization
**************

This section provides additional details about hypertension and hypercholesterolemia treatment and how medications are changed and/or increased over time. For blood pressure, this is also referred to as the "SBP ramp". 

Links to documentation for relevant risk pages

* :ref:`See SBP risk exposure documentation <2019_risk_sbp>`
* :ref:`See LDL-c risk exposure documentation <2019_risk_exposure_ldl>`
* :ref:`See BMI risk exposure documentation <2019_risk_bmi>`
* :ref:`See FPG risk exposure documentation <2019_risk_exposure_fpg>`

* :ref:`See SBP risk effect documentation <2019_risk_effect_sbp>`
* :ref:`See LDL-c risk effect documentation <2019_risk_effect_ldl>`

.. todo:: add tobacco risk exposure
.. todo:: add tobacco risk effect 
.. todo:: add bmi risk effect
.. todo:: add fpg risk effect

Initialization parameters
+++++++++++++++++++++++++
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

Baseline Coverage Data
++++++++++++++++++++++++

Baseline coverage of treatment for elevated SBP and elevated LDL-c is substantial and expected to vary by age, sex, and time. Bask To initialize simulants, the research team has fit a multinomial regression to NHANES data. 

 :math:`\ln(\frac{P(tx=SBPonly)}{P(tx=none)}) = b_{10} + b_{11}(SBP_{level}) + b_{12}(LDL_{level}) + b_{13}age_{(yrs)} + b_{14}sex`
 :math:`\ln(\frac{P(tx=LDLonly)}{P(tx=none)}) = b_{20} + b_{21}(SBP_{level}) + b_{22}(LDL_{level}) + b_{23}age_{(yrs)} + b_{24}sex`
 :math:`\ln(\frac{P(tx=Both)}{P(tx=none)}) = b_{30} + b_{31}(SBP_{level}) + b_{32}(LDL_{level}) + b_{33}age_{(yrs)} + b_{34}sex`

 
 .. code-block:: R

  ###### Setup ######
  rm(list=ls())

  suppressMessages(library(data.table))
  library(ggplot2)
  library(nnet)

  ###### Files and paths ######
  file_path <- "/share/scratch/projects/cvd_gbd/cvd_re/simulation_science/nhanes/"

  ###### Read in file ######
  load(paste0(file_path, "nhanes_microdata.rdata"))

  # Recode treatment variables to account for skip pattern
  data[,sbptx:=ifelse(highbp==0 & is.na(bpmeds), 0, bpmeds)]
  data[,choltx:=ifelse(highchol==0 & is.na(cholmeds), 0, cholmeds)]
  data[,tx:=ifelse(sbptx==0 & choltx==0, "none", ifelse(sbptx==1 & choltx==0, "bponly", 
		  ifelse(sbptx==0 & choltx==1, "cholonly", ifelse(sbptx==1 & choltx==1, "both", NA))))]
  data[,tx2:=factor(tx, levels=c("none", "bponly", "cholonly", "both"))]

  meds <- multinom(tx2 ~ bpsys + lbdldl + sex_id + age_year, data=data)

  # weights:  24 (15 variable)
  initial  value 21425.179351 
  iter  10 value 16793.908492
  iter  20 value 14903.770849
  final  value 14903.720511 
  converged

  summary(meds)
  Call: multinom(formula = tx2 ~ bpsys + lbdldl + sex_id + age_year, 
    data = data)

  Coefficients:
           (Intercept)        bpsys       lbdldl     sex_id   age_year
  bponly     -6.746432  0.024905946 -0.004474287  0.1578084 0.05006270
  cholonly   -4.234380 -0.002564668 -0.005063271 -0.1900133 0.06173726
  both       -6.262507  0.018470096 -0.013548739  0.1326292 0.06909707

  Std. Errors:
           (Intercept)       bpsys       lbdldl     sex_id    age_year
  bponly     0.1863489 0.001265926 0.0006439986 0.04686429 0.001632670
  cholonly   0.2665387 0.001872484 0.0009045871 0.06485975 0.002270549
  both       0.2067298 0.001371421 0.0007557389 0.05139671 0.001875866

  Residual Deviance: 29807.44 
  AIC: 29837.44 

[[Should this also predict which simulants are non-adherent to treatment?]] 

This initialization scheme will also allow initialization of "untreated LDL-C" and "untreated SBP" attributes, which refer to what a simulants risk exposure would be, if they were not receiving treatment.   Individuals who are initialized to be receive treatment will also need to be initialized to have a follow-up visit date somehow.

Baseline coverage of polypill, medication outreach, and lifestyle modification education are all low, and we will assume that they are 0%. (This means that we will can initialize the untreated BMI, FPG, and smoking risk exposures to be equal to the actual BMI, FPG, and smoking exposures.)

Weighted means of treatment (not specific to drug class) by age, sex, and SBP category (in 10 mm Hg groups) are here: /share/scratch/projects/cvd_gbd/cvd_re/simulation_science/nhanes_sbp_tx_info.csv

.. list-table:: Baseline coverage data
  :widths: 15 15 15 15 15
  :header-rows: 1

  * - Location
    - Subpopulation
    - Coverage parameter
    - Value
    - Note
  * - USA
    - General Population
    - Hypertension Treatment
    - Distribution from NHANES
    - 
  * - USA
    - General Population
    - Lipid lowering therapy
    - Distribution from NHANES
    - empirical calibration needed
  * - USA
    - General Population
    - Polypill
    - 0.0%
    - assumption
  * - USA
    - General Population
    - Medication outreach
    - 0.0%
    - assumption
  * - USA
    - General Population
    - Lifestyle modification education
    - 0.0%
    - assumption
