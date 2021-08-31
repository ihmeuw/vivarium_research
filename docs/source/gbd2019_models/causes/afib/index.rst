.. _2019_cause_afib:

===============================
Atrial fibrillation and flutter 
===============================

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - ECG
    - Electrocardiogram
    - Also know as EKG. During the ECG 12 electrodes are placed on your chest, arms, and legs. An ECG can show how fast your heart is beating, whether the rhythm of your heartbeats is steady or irregular, and the strength and timing of the electrical impulses passing through each part of your heart. 

[ECG-Definition]_

Disease Description
-------------------

Atrial fibrillation is an irregular and often rapid heart rate that can increase the risk of certain types of strokes, heart failure and other cardiovascular complications. 

In atrial fibrillation, the atria beat chaotically and irregularly and out of coordination with the ventricles. Symptoms often include heart palpitations, shortness of breath, and
weakness. Atrial fibrillation may be episodic or it may by consistent. A major concern with atrial fibrillation is the potential to develop blood clots within the upper chambers of the 
heart, which can circulate to other organs, particularly the brain, and lead to blockages in blood flow. 

Treatments for atrial fibrillation may include medications for rhythm and rate control. In more serious cases of disease, and other interventions such as ablation may be used to try to 
alter the heart's electrical system to prevent the errant signals that cause irregular heartbeats. 

[Mayo-Clinic-Atrial-Fibrillation-Definition]_

[Johns-Hopkins-Ablation-Definition]_



GBD 2019 Modeling Strategy
--------------------------
Atrial fibrillation is defined in the GBD as a supraventricular arrhythmia due to disorganized depolarization of the atrium. Atrial flutter is a macro-reentrant supraventricular arrhythmia, usually 
involving the cavo-tricuspid isthmus. Diagnosis requires an ECG demonstrating: 1) irregularly irregular RR intervals (in the absence of complete AV block); 2) no distinct P waves on the surface ECG, and; 
3) an atrial cycle length (when visible) that is usually variable and less than 200 milliseconds. 
 

The reference case definition is atrial fibrillation or flutter diagnosed by ECG measurement. We included data from the scientific literature on incidence, prevalence, and mortality for atrial 
fibrillation, along with administrative inpatient and claims data. These administrative claims data were adjusted to match the reference case definition using MR-BRT. 


In order to address changes in coding practices for atrial fibrillation that resulted in an implausible trend of increasing death-certificate-based mortality rates, we used a prevalence-based modelling 
approach that combined DisMod-MR and CODEm models to generate fatal and nonfatal estimates for atrial fibrillation and flutter. The steps of this modeling process are listed below. 
 

1. We estimated cause specific mortality rates (CSMR) for atrial fibrillation using a standard CODEm approach using vital registration (VR) data prior to redistribution as inputs.  


2. We estimated prevalence in DisMod-MR using data from published reports of cross-sectional and cohort surveys, as well as primary care facility data. We also used claims data covering inpatient and 
   outpatient visits for the United States along with inpatient hospital data from 247 locations in 15 countries.  


3. We calculated the excess mortality rate (EMR) for the year 2019 according to the following formula: 

   Excess mortality rate = :math:`\frac{\text{\{cause-specific-mortality-rate\}_codem}}{\text{\{prevalence\}_dismod}}`

   We then selected 17 countries based on four conditions: 1) ranking of 4 or 5 stars on the system for assessing the quality of VR data; 2) prevalence data available from the literature were included in 
   the DisMod-MR estimation; 3) prevalence rate ≥ 0.005; and, 4) CSMR ≥ 0.00002. Using information from these countries as input data, we ran a MR-BRT model of logEMR on sex, a cubic spline of age, and 
   HAQI. We then predicted year-, age- and sex-specific EMR using the results of this regression for all non-selected countries. Countries included in the regression were assigned their directly calculated values. These EMR data points were assigned to the time period 1990–2019 and uploaded into the non-fatal database in order to be used in modelling. 


4. We re-ran DisMod-MR using the input data described in Step 2 along with the EMR estimated in Step 3. The prevalence estimates from the DisMod-MR model in Step 4 was used as the finalized output for 
   upload to COMO and further processing into YLDs and DALYs. 


5. The CSMR estimates from the DisMod model in Step 4 were interpolated to yield a full time series. These estimates were then divided by the GBD all-cause mortality estimates to calculate a cause 
   fraction for atrial fibrillation and flutter. We then calculated the difference between this cause fraction and the cause fraction in the VR data generated by the CoD data preparation process by age, 
   sex, location, and year. For demographic groupings, where the cause fraction generated from the DisMod estimation process was larger than the cause fraction in VR, deaths were retrieved from other causes via the process described in Section 2.6: Correction for miscoding of Alzheimer’s and other dementias and Parkinson’s disease. After this correction process, the VR cause fraction data are processed through the standard redistribution and noise reduction algorithms.  


6. In Step 6, these adjusted cause fraction data were then used as inputs for a final CODEm model. 


*Severity splits & disability weights*

Atrial fibrillation is split into symptomatic and asymptomatic based on standard GBD proportion information. The table below includes lay descriptions and disability weights for the severity levels of 
atrial fibrillation: 


.. list-table:: Severity distribution
   :widths: 15 15 20
   :header-rows: 1

   * - Severity level
     - Lay description
     - DW (95% CI)
   * - Asymptomatic
     - No symptoms
     - N/A
   * - Symptomatic
     - Has periods of rapid and irregular heartbeats and occasional fainting
     - 0.224 (0.151–0.312)



Cause Hierarchy
+++++++++++++++

.. image:: afib_cause_hierarchy.svg

Restrictions
++++++++++++

.. list-table:: GBD 2019 Cause Restrictions
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     -
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
     - 30
     - [30, 34 years), age_group_id=11 
   * - YLL age group end
     - 125
     - [95, 125 years), age_group_id=235 
   * - YLD age group start
     - 30
     - [30, 34 years), age_group_id=11 
   * - YLD age group end
     - 125
     - [95, 125 years), age_group_id=235 


Vivarium Modeling Strategy
--------------------------


Scope
+++++

Atrial fibrillation among simulants should occur at the incidence estimated from the second stage DisMod model. While clinically atrial fibrillation is initially an episodic condition, 
in the GBD we consider prevalent atrial fibrillation to be a chronic state without remission. Cause-specific deaths should occur at the excess mortality rate for atrial fibrillation 
estimated from the second stage DisMod model.   

Incidence rate should be modified by BMI, tobacco, SBP, and alcohol. These relationships are described in the overall concept document. 

Assumptions and Limitations
+++++++++++++++++++++++++++

Initially, atrial fibrillation is usually an episodic condition, in which individuals experience periods of dysrhythmia. As the disease progresses, these periods usually become longer, 
and the dysrhythmia often becomes permanent. Clinically, this progression is often separated into stages depending on the duration of the episode and whether it requires medical 
intervention to resolve. The risk of poor outcomes from atrial fibrillation increases with increasing duration of episodes of dysrhythmia, but this is not captured in the current model 
of atrial fibrillation. 

[ACC-AHA-ESC-2006-Guidelines-for-the-Management-of-Patients-With-Atrial-Fibrillation]_ 


Cause Model Diagram
+++++++++++++++++++

.. image:: afib_cause_model.svg


State and Transition Data Tables
++++++++++++++++++++++++++++++++

Definitions
"""""""""""

.. list-table:: State Definitions
   :widths: 5 5 20
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - **S**\ usceptible to Atrial fibrillation and flutter 
     - Simulant that has not been diagnosed with atrial fibrillation and flutter.
   * - A
     - Prevalent **A**\ trial fibrillation and flutter 
     - Simulant with prevalent atrial fibrillation and flutter diagnosed by ECG .


States Data
"""""""""""

.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - All
     - cause-specific mortality (CSMR)
     - :math:`\frac{\text{deaths_c500}}{\text{population}}`
     - Post CoDCorrect cause-level CSMR
   * - S
     - Prevalence
     - :math:`1 - \text{prev_c500}`
     - 
   * - A
     - Prevalence
     - :math:`\sum\limits_{s \in \text{sequelae}} \text{prevalence}_s`
     - There are two chronic sequalae
   * - S
     - excess mortality
     - 0
     -
   * - A
     - excess mortality
     - :math:`{emr}_m9366`
     - 
   * - S
     - disability weight
     - 0
     - 
   * - A
     - disability weight
     - :math:`\frac{1}{\text{{prevalence}_c500}} \times \sum\limits_{s \in \text{sequelae}} \text{disability_weight}_s \cdot \text{prevalence}_s`
     - 


Transition Data
"""""""""""""""

.. list-table:: Transition Data
   :widths: 10 10 10 20 30
   :header-rows: 1
   
   * - Transition
     - Source 
     - Sink 
     - Value
     - Notes
   * - 1
     - S
     - A
     - :math:`{incidence}_c500`
     - This is cause-level incidence which is equivalent to the “population rate”
	 

Data Sources
""""""""""""

.. list-table:: Data Sources and Definitions
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Value
     - Source
     - Description
     - Notes
   * - :math:`{prevalence}_c500`
     - como
     - Prevalence of atrial fibrillation
     - 
   * - :math:`{deaths}_c500`
     - codcorrect
     - Deaths from atrial fibrillation
     - 
   * - :math:`{incidence}_c500`
     - como
     - Incidence of atrial fibrillation
     - This is the population incidence rate for atrial fibrillation
   * - population
     - demography
     - Mid-year population for given age/sex/year/location
     - 
   * - :math:`{sequelae}_c500`
     - gbd_mapping
     - List of 2 sequelae for atrial fibrillation
     - 
   * - :math:`prevalence_{s\{sid\}}`
     - como
     - Prevalence of sequela with id sid
     - 
   * - :math:`disability-weight_{s\{sid\}}`
     - YLD appendix
     - Disability weight of sequela with id sid
     - 
   * - :math:`{emr}_m9366`
     - dismod-mr 2.1
     - excess mortality rate of atrial fibrillation
     - 
   * - sequelae
     - sequelae definition
     - {s809, s913}
     - 


Validation Criteria
+++++++++++++++++++

1. Compare CSMR experienced by simulants to CSMR from CoDCorrect in GBD
2. Compare prevalence experienced by simulants to post-COMO prevalence in GBD 


References
----------

.. [ECG-Definition]
    `Electrocardiogram.` National Heart Lung and Blood Institute, U.S. Department of Health and Human Services, www.nhlbi.nih.gov/health-topics/electrocardiogram#:~:text=An%20electrocardiogram%2C%20also%20called%20an,Overview. 

.. [Mayo-Clinic-Atrial-Fibrillation-Definition]
    `Atrial Fibrillation.` Mayo Clinic, Mayo Foundation for Medical Education and Research, 20 June 2019, www.mayoclinic.org/diseases-conditions/atrial-fibrillation/symptoms-causes/syc-20350624. 


.. [Johns-Hopkins-Ablation-Definition]
    `Atrial Fibrillation Ablation.` Johns Hopkins Medicine, www.hopkinsmedicine.org/health/treatment-tests-and-therapies/atrial-fibrillation-ablation. 

.. [ACC-AHA-ESC-2006-Guidelines-for-the-Management-of-Patients-With-Atrial-Fibrillation]
    Fuster, Valentin, et al. `ACC/AHA/ESC 2006 Guidelines for the Management of Patients With Atrial Fibrillation.` Circulation, 15 Aug. 2006, www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.106.177292. 