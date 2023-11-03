.. _2019_cancer_model_multiple_myeloma_2:

===================================
Multiple Myeloma: GBD 2019 Phase 2
===================================

.. contents::
   :local:
   :depth: 2

.. list-table:: Abbreviations
  :widths: 5 5 10
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - MM
    - Multiple myeloma
    -
  * - NDMM
    - Newly-diagnosed multiple myeloma
    - Multiple myeloma that has not yet relapsed.
  * - RRMM
    - Relapsed and/or refractory multiple myeloma
    - Multiple myeloma that has ever relapsed. "Refractory"
      refers to relapse that happens during or shortly after termination of treatment.

Disease Overview
----------------

Multiple myeloma (MM) is a clonal plasma cell neoplasm with substantial morbidity and mortality, characterized by end organ damage—renal 
impairment, hypercalcemia, lytic bony lesions, and anemia. 

According to GBD 2019, there were 27 thousand incident cases (95% UI 23-33), 18 thousand deaths (95% UI 16-21), and 350 thousand (95% UI 326-431) disability adjusted life years (DALYs) due to multiple myeloma in the US in 2019.

From 2010 to 2019, MM incident cases increased by 25%, and deaths increased by 27% for both sexes in the US.

With the development of better therapies, myeloma has changed from an untreatable ailment to one that is still not curable but treatable with mostly outpatient therapy. 
Although several new treatment options for multiple myeloma are now available, there is no cure for this disease. And almost all patient with multiple myeloma develop relapse/refractory.
Relapse is an inevitable feature of multiple myeloma, resulting in a continued need for new active treatments. Relapse is the return of a cancer, multiple myeloma here, after a clinically disease-free interval. The term relapse is usually used to describe the return of a leukemia, lymphoma, or other hematopoietic malignancy, rather than the return of a carcinoma, according to National Cancer Institute's Surveillance, Epidemiology, and End Results Program [SEER]_. 

Refractory multiple myeloma is multiple myeloma that is not responsive to usual therapies. Patients are considered to have relapsed/ refractory multiple myeloma if they have achieved a minor response or better to treatment relapse and then progress on salvage therapy, or experience progression within 60 days of their last therapy.

The combination of pomalidomide and low-dose dexamethasone is an approved and established option for the treatment of relapsed and refractory myeloma in
patients who have received at least two previous therapies. A randomised, multicentre, open-label, phase 3 study [Attal-et-al-2019-mm]_
was taken to compare isatuximab plus pomalidomide and dexamethasone with pomalidomide and dexamethasone in patients with relapsed and refractory multiple myeloma. Result shows that the addition of isatuximab to pomalidomide and dexamethasone was associated with a significant and
clinically meaningful benefit in progression-free survival in heavily treated patients with relapsed and refractory multiple myeloma with results from both the investigators
and an independent response committee being consistent.

Other info: [Cowan-et-al-2018]_

GBD 2019 Modeling Strategy
--------------------------

Multiple Myeloma in GBD 2019
++++++++++++++++++++++++++++

In GBD 2019, MM includes death and disability resulting from malignant neoplasms of plasma cells, including ICD-10 codes such as C90.0. The GBD modeling strategy can be found in the GBD YLD Capstone Appendix [GBD-2019-YLD-Capstone-Appendix-1-Neoplasms]_.

There is nothing custom about how MM is modeled in GBD compared to the other cancer causes that go through our standard fatal and non-fatal modeling pipelines.

.. list-table:: 
   :widths: 20 25 30 30 20
   :header-rows: 1
   
   * - sequelae
     - health states
     - health state lay descriptions
     - disability weights
     - duration of four prevalence sequelae (in months)
   * - Diagnosis and primary therapy phase 
     - Cancer, diagnosis and primary therapy 
     - has pain, nausea, fatigue, weight loss and high anxiety
     - 0.288 (0.193-0.399)
     - :math:`7^{12}`
   * - Controlled phase 
     - Generic uncomplicated disease: worry and daily medication
     - medication every day and causes some worry but minimal interference with daily activities
     - 0.049 (0.031-0.072)
     - 
   * - Metastatic phase
     - Cancer, metastatic
     - has severe pain, extreme fatigue, weight loss and high anxiety
     - 0.451 (0.307-0.600)
     - :math:`36.82^{10}`
   * - Terminal phase
     - Terminal phase, with medication
     - has lost a lot of weight and regularly uses strong medication to avoid constant pain.
     - 0.540 (0.377-0.687)
     - 1

Remission is calculated based on remainder of time after attributing other sequelae. Duration of these four sequelae remained the same as for GBD 2013, GBD 2015, GBD 2016, and GBD 2017. The sources used to determine their length are SEER Median age standardized survival all patients, all years.

Cause Hierarchy
++++++++++++++++

.. image:: mm_hierarchy.svg

This cause hierarchy has not changed since GBD 2017.

Restrictions
++++++++++++

The following table describes any restrictions in GBD 2019 on the effects of
this cause (such as being only fatal or only nonfatal), as well as restrictions
on the ages and sexes to which the cause applies.

.. list-table:: GBD 2019 Cause Restrictions
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
     - 15 to 19
     - GBD age group id 8
   * - YLL age group end
     - 95 plus
     - GBD age group id 235
   * - YLD age group start
     - 15 to 19
     - GBD age group id 8
   * - YLD age group end
     - 95 plus
     - GBD age group id 235

This cause's restrictions have not changed since GBD 2017.

Vivarium Modeling Strategy
--------------------------

Cause Model Diagram
+++++++++++++++++++

.. image:: cause_model_diagram.svg

Overview
++++++++

To study the impact of different lines of treament for myeloma patients, we
split multiple myeloma into two disease states: newly-diagnosed multiple myeloma (NDMM);
and relapsed and/or refractory multiple myeloma (RRMM). The RRMM state consists of
multiple relapse stages. This MM cause model is intended to simulate MM incidence,
relapse, and mortality. The inputs for this cause model come from GBD 2019 estimates,
scientific literature, and survival analysis supported by Flatiron data.

In our model, treatment and relapse perfectly correspond; that is,
a simulant in the NDMM state is receiving Line 1 treatment, a simulant in the MM_first_relapse state
is receiving Line 2 treatment, etc. New treatment assignment is therefore performed only at the time of
relapse.

Notably, the OS and TTD survival analyses supported by Flatiron data provide
data on death *from any cause* among multiple myeloma patients and
not death due to multiple myeloma specifically.
Therefore, the excess mortality defined in this document will be the only source
of mortality among simulants with multiple myeloma and excess mortality among
simulants with multiple myeloma for "other causes," as typically defined by the
cause-deleted all-cause mortality rate, should be zero.

State and Transition Data Tables
++++++++++++++++++++++++++++++++

In the tables below, data_dir depends on the location:

* If the simulation is running in the US location, data_dir = J:/Project/simulation_science/multiple_myeloma/data/cause_model_input/phase_2/2022_07_09.
* If the simulation is running in the China location, data_dir = J:/Project/simulation_science/multiple_myeloma/data/cause_model_input/phase_2/2022_08_11_China.

The mortality and relapse inputs depend on the timestep size; input files are provided for 90-day and 28-day timesteps.

.. list-table:: State Definitions
   :widths: 1, 5, 15
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - Susceptible
     - Susceptible to MM, without condition
   * - NDMM
     - Newly-diagnosed multiple myeloma
     - With symptomatic condition
   * - MM_first_relapse
     - Multiple myeloma in first relapse
     - Myeloma returns after first-line treatment
   * - MM_second_relapse
     - Multiple myeloma in second relapse
     - Myeloma returns after second-line treatment
   * - MM_third_relapse
     - Multiple myeloma in third relapse
     - Myeloma returns after third-line treatment
   * - MM_fourth_or_higher_relapse
     - Multiple myeloma in fourth or higher relapse
     - Myeloma returns after fourth-line treatment

.. list-table:: State Data
   :widths: 1, 5, 15, 15
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - S
     - prevalence
     - (1 - prev_c486)
     - 
   * - S
     - excess mortality rate
     - 0
     - 
   * - NDMM
     - prevalence
     - Derived from "burn-in" method
     - 
   * - NDMM
     - excess mortality rate
     - data_dir/mortality_first_line_timestep_90.csv or data_dir/mortality_first_line_timestep_28.csv
     -
   * - MM_first_relapse
     - prevalence
     - Derived from "burn-in" method
     - 
   * - MM_first_relapse
     - excess mortality rate
     - data_dir/mortality_second_line_timestep_90.csv or data_dir/mortality_second_line_timestep_28.csv
     -
   * - MM_second_relapse
     - prevalence
     - Derived from "burn-in" method
     - 
   * - MM_second_relapse
     - excess mortality rate
     - data_dir/mortality_third_line_timestep_90.csv or data_dir/mortality_third_line_timestep_28.csv
     -
   * - MM_third_relapse
     - prevalence
     - Derived from "burn-in" method
     - 
   * - MM_third_relapse
     - excess mortality rate
     - data_dir/mortality_fourth_line_timestep_90.csv or data_dir/mortality_fourth_line_timestep_28.csv
     -
   * - MM_fourth_or_higher_relapse
     - prevalence
     - Derived from "burn-in" method
     - 
   * - MM_fourth_or_higher_relapse
     - excess mortality rate
     - data_dir/mortality_fifth_line_timestep_90.csv or data_dir/mortality_fifth_line_timestep_28.csv
     -

.. list-table:: Transition Data
   :widths: 1, 1, 1, 10, 10
   :header-rows: 1

   * - Transition
     - Source state
     - Sink state
     - Value
     - Notes
   * - incidence_MM
     - S
     - NDMM
     - :math:`\frac{\text{incidence_c486}}{1-\text{prev_c486}}`
     - incidence of MM among susceptible population
   * - incidence_MM_first_relapse
     - NDMM
     - MM_first_relapse
     - data_dir/relapse_first_line_timestep_90.csv or data_dir/relapse_first_line_timestep_28.csv
     -
   * - incidence_MM_second_relapse
     - MM_first_relapse
     - MM_second_relapse
     - data_dir/relapse_second_line_timestep_90.csv or data_dir/relapse_second_line_timestep_28.csv
     -
   * - incidence_MM_third_relapse
     - MM_second_relapse
     - MM_third_relapse
     - data_dir/relapse_third_line_timestep_90.csv or data_dir/relapse_third_line_timestep_28.csv
     -
   * - incidence_MM_fourth_or_higher_relapse
     - MM_third_relapse
     - MM_fourth_or_higher_relapse
     - data_dir/relapse_fourth_line_timestep_90.csv or data_dir/relapse_fourth_line_timestep_28.csv
     -

.. list-table:: Data sources
   :widths: 5 10 10
   :header-rows: 1
   
   * - Measure
     - Sources
     - Notes
   * - prev_c486
     - GBD 2019
     -
   * - incidence_c486
     - GBD 2019
     -
   * - prev_MM
     - Derived from "burn-in" method
     -
   * - prev_MM_{Nth}_relapse
     - Derived from "burn-in" method
     -
   * - emr_NDMM
     - Derived from time to death (TTD) survival analysis of Flatiron data in Line 1
     - Don't use emr_c486
   * - emr_MM_{first-third}_relapse
     - Derived from time to death (TTD) survival analysis of Flatiron data in RRMM, with covariate for line number
     -
   * - emr_MM_fourth_or_higher_relapse
     - Derived from overall survival (OS) survival analysis of Flatiron data in RRMM, with covariate for line number
     -
   * - incidence_MM_first_relapse
     - Derived from time to next treatment (TTNT) survival analysis of Flatiron data in Line 1
     -
   * - incidence_MM_{second-fourth_or_higher}_relapse
     - Derived from time to next treatment (TTNT) survival analysis of Flatiron data in RRMM, with covariate for line number
     -
   * - deaths_c486
     - GBD 2019
     - codcorrect, decomp step 5
   * - population
     - GBD 2019
     - decomp step 4
   * - csmr_c486
     - GBD 2019
     - deaths_c486 / population

Multiple Myeloma Mortality Details
+++++++++++++++++++++++++++++++++++

As previously mentioned, the excess mortality rates defined in the tables above
represent *all-cause* mortality rates among patients 
with multiple myeloma. For simplicity, in our simulation, deaths that occur among 
simulants in any of the multiple myeloma cause model states other than susceptible
should be recorded as deaths due to multiple myeloma. While deaths due to other
causes are typically modeled in Vivarium cause models among simulants with a given
cause, simulants in multiple myeloma cause model states other than the susceptible 
state should have zero probability of death due to other causes. Simulants without
multiple myeloma (in the susceptible cause model state) should die due to causes
other than multiple myeloma ("other causes") at a rate equal to the multiple
myeloma-deleted all cause mortality rate. Details are shown in the table below.

.. list-table:: MM State-Specific Mortality Hazard Rates and Causes of Death
   :header-rows: 1
   
   * - Cause model state
     - Mortality hazard
     - Probability of death due to multiple myeloma
     - Probability of death due to other causes
   * - S
     - acmr - csmr_c486
     - 0
     - 1
   * - All MM states
     - state-specific EMR from state table data
     - 1
     - 0

Notably, the multiple myeloma mortality rate used to model excess mortality among simulants with multiple myeloma is informed by Flatiron data and the multiple myeloma mortality rate to inform the multiple myeloma-deleted all cause mortality rate among simulants without multiple myeloma is informed by GBD. Mortality rates informed by Flatiron and GBD should be similar in order to accurately model all-cause mortality rates in our simulation; this should be evaluated in model verification and validation.

Estimate MM Prevalence by Disease Stage
+++++++++++++++++++++++++++++++++++++++

We used a ‘burn-in’ approach to estimate the prevalence of NDMM and the
prevalence of RRMM in a manner consistent with the incidence rates estimated
from GBD and the survival rates reported in Braunlin et al. To do this, we
started the simulation in 2013, 10 years prior to the start date of interest.
At this time point, a proportion of simulants equal to the age- and sex-specific
MM prevalence from GBD 2019 were initialized into the NDMM disease state;
no simulants were initialized into the RRMM disease state(s). We then let the
simulation run from 2013 to 2023 using our transition and mortality rates and
updated the distribution of MM prevalence by disease states (NDMM, RRMM in first
relapse, RRMM in second relapse, etc.) accordingly.

Endpoints
+++++++++

.. list-table:: Endpoints
  :widths: 1 1 2 4 5
  :header-rows: 1

  * - Abbreviation
    - Full name
    - Event
    - Censored at
    - Reporting
  * - OS
    - Overall survival
    - Death
    - Loss to mortality follow-up
    - Frequently a secondary outcome of trials, sometimes a primary outcome
  * - PFS
    - Progression-free survival
    - Progressive disease or death
    - Loss to progression and/or mortality follow-up
    - Frequently a primary outcome of trials, sometimes a secondary outcome
  * - TTP
    - Time to progression
    - Progressive disease
    - Death or loss to progression follow-up
    - Sometimes a secondary outcome of trials
  * - TTNT
    - Time to next treatment
    - Initiation of next treatment
    - Death or loss to treatment follow-up
    - Sometimes a secondary outcome of trials
  * - TTD
    - Time to death
    - Death
    - Death or initiation of next treatment or loss to progression and/or treatment follow-up
    - We invented this; never reported in trials

Calculation of Mortality and Relapse Hazard
+++++++++++++++++++++++++++++++++++++++++++

Hazards were calculated using Cox proportional hazards models fit to Flatiron data. These
models allow the hazard to vary over time since treatment line initiation, and assume a linear effect of line number (each relapse
increases hazard by the same multiplier). They do not include any other covariates.

In the model for relapse hazard in first through fourth lines (TTNT), the event is initiation of a new line of treatment. Patients are censored at
the point that our line-of-therapy coding algorithm can no longer code their EHR data.

In the model for mortality hazard in first through fourth lines (TTD), the event is death. Patients are censored at initiation of a new line of treatment,
and also at the point that our line-of-therapy coding algorithm can no longer code their EHR data, except when this point
precedes death by less than 60 days.

The model for mortality hazard in the fifth line (OS) is like the previous lines, except that patients are not censored at initiation of a new treatment, only
at loss to follow-up, defined as their last visit, if they do not have a death record. Patients with a death record are never censored.

Line-specific predictions were made with models trained on 1,000 bootstrap resamples of the dataset to generate 1,000 draws of these predictions.

To extrapolate these hazards into longer follow-up than is present in the source data, predictions are only used until the time since treatment line initiation of the fifth-to-last
event in the data. After that point, the average hazard up to that point is continued as a constant hazard into the future.

Model Assumptions and Limitations
+++++++++++++++++++++++++++++++++

#. This cause model assumes no recovery from MM and RRMM since myeloma is an
   incurable disease. Patients with MM will inevitably develop relapse and the
   health outcomes worsen with every relapse and line of treatment.
#. This cause model assumes that relapse and new treatment lines always correspond and
   occur simultaneously.
#. This cause model assumes that the GBD incidence rate corresponds to the incidence
   of symptomatic MM.
   The asymptomatic/indolent state (smoldering MM) is excluded from this cause
   model because we are not interested in the screening and early management for
   MM. As a result, the simulation will not track/model simulants with asymptomatic
   condition.
#. We assume that Flatiron patients are representative of the US MM population with respect to mortality and
   relapse outcomes.
#. YLLs are substantially larger than YLDs for this cause. For now, we will not
   build a disability component to capture those secondary outcomes.
#. The most advanced disease state in this cause model is
   fourth or higher relapse of RRMM. We track deaths from simulants
   who have developed fourth relapse/received fifth-line treatment but do not specifically
   track the number of relapses a simulant has had beyond four. We assume that risk factor and
   treatment effects on mortality apply to both TTD (in other states) and OS (in this state).
   We ignore risk factor and treatment effects on relapse after the fourth relapse.
#. The effect of line number/number of relapses on both relapse and mortality is not adjusted
   for risk factor and treatment effects.
#. We assume that hazards increase by a constant hazard ratio with each additional relapse.

Validation and Verification Criteria
++++++++++++++++++++++++++++++++++++

 - MM incidence stratified by age, sex, and year should match GBD 2019 age-/sex-specific MM incidence. MM incidence stratified by only age and year should match GBD 2019 age-specific MM incidence. MM incidence stratified by only sex and year should match GBD 2019 sex-specific MM incidence, among the 30+ year old population (to avoid cohort effects). MM incidence stratified by only year should match GBD 2019 MM incidence, again among the 30+ year old population.
 - The same as the previous for MM prevalence, except that it only need **approximately** match. As long as deviations are not too large among the largest age groups, this is acceptable.
 - Simulation mortality rates in the MM states, stratified by year and age and/or sex as above, should **approximately** match GBD 2019 all-cause mortality with the MM cause deleted plus the GBD 2019 MM EMR.
 - MM-state-specific survival analysis in the baseline scenario of time-to-death (or overall survival in the case of fourth and higher relapse) and time-to-next-treatment by disease state should match the corresponding curves obtained from Flatiron survival analysis. For detail on how risks will be calculated in each simulation timestep, see the V&V section of :ref:`the MM treatment documentation <multiple_myeloma_treatment>`.
 - The proportions of simulants with MM in the different MM cause model states should change from initialization (since all simulants are initialized into NDMM) and then stabilize without a significant time trend before 2021, indicating that our burn-in period is long enough to reach a steady state.

.. warning::
  In both Phase 1 and Phase 2, multiple myeloma prevalence sharply differed from GBD 2019, particularly in the older age groups.
  See `the graphs in this V&V notebook  <https://github.com/ihmeuw/vivarium_research_multiple_myeloma/blob/b1d2d1f6263a902c17cc3e300c50dee5907b938c/verification/model_0/mm_cause_vs_gbd.ipynb>`_ for examples of this.
  We believe this is due in part to the *replacement* of all-cause mortality with the mortality from the Flatiron cohort,
  instead of back-calculating excess mortality.
  If we return to this model, this should be a priority area to improve.
