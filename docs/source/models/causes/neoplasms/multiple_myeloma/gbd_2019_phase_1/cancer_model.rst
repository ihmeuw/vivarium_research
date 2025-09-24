.. _2019_cancer_model_multiple_myeloma:

===================================
Multiple Myeloma: GBD 2019 Phase I
===================================

.. contents::
   :local:
   :depth: 1

Disease Overview
----------------

Multiple myeloma (MM) is a clonal plasma cell neoplasm with substantial morbidity and mortality, characterized by end organ damage—renal 
impairment, hypercalcemia, lytic bony lesions, and anemia. 

According to GBD 2019, there were 27 thousand incident cases (95%UI 23-33), 18 thousand deaths (95%UI 16-21), and 350 thousand (95%UI 326–431) disability adjusted life years (DALYs) due to multiple myeloma in the US in 2019.

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

In GBD 2019, MM includes death and disability resulting from malignant neoplasms of plasma cells, including ICD-10 codes such as C90.0. The GBD modelling strategy can be found in the GBD YLD Capstone Appendix [GBD-2019-YLD-Capstone-Appendix-1-Neoplasms]_. 

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

Scope
+++++

To study the impact of different lines of treament for myeloma patients, we 
split multiple myeloma into two disease states: active multiple myeloma (MM); 
and relapsed and refractory multiple myeloma (RRMM). The RRMM state consists of 
multiple relpase stages. Each relapse stage is subsequent outcome corresponding 
to each line of treatment. This MM cause model is intended to simulate MM incidence, 
RRMM incidence, RRMM progression, as well as the mortality from MM and RRMM. The 
inputs for this cause model come from GBD 2019 estimates, scientific literature, 
and survival regression analysis supported by Flatiron data.

Notably, the survival regression anlaysis supported by Flatiron data provides 
data on the time to death *from any cause* among multiple myeloma patients and 
does not present data on the time to death due to multiple myeloma, specifically.
Therefore, the excess mortality defined in this document will be the only source 
of mortality among simulants with multiple myeloma and excess mortality among
simulants with multiple myeloma for "other causes," as typically defined by the 
cause-deleted all-cause mortality rate, should be zero.

Model Assumptions and Limitations
+++++++++++++++++++++++++++++++++

1. This cause model assumes no recovery from MM and RRMM since myeloma is an 
   incurable disease. Patients with MM will inevitably develop relapse and the 
   health outcomes worsen with every relapse and line of treatment.
2. This cause model assumes that the GBD incidence rate corresponding to the incidence 
   of symptomatic MM. That's said, we are comfortable using GBD incidence of MM 
   as the detection rate of symptomatic MM cases. The incidence of RRMM will be 
   calculated from survival regression analysis using Cox's proportional hazard model.
3. The asymptomatic/idolent state (smoldering MM) is excluded from this cause 
   model because we are not interested in the screening and early managment for 
   MM. As a result, the simulation will not track/model simulants with asymptomatic 
   condition.
4. YLLs are substantially larger than YLDs for this cause. For now, we will not 
   build a disability component to capture those secondary outcomes.
5. Based on available data, the most advanced disease state in cause model is 
   fourth or higher relapse of RRMM. We intended to track deaths from simulants 
   who have developed fourth relapse and received fifth-line of treatment but ignore 
   the incident cases from fourth relapse to higher relapse of RRMM. As a result, 
   we will not calculate progress-free survival among simulants with fourth or 
   higher relapse of RRMM.

.. _2019_cancer_model_multiple_myeloma_cause_model_diagram:

Cause Model Diagram
+++++++++++++++++++

.. image:: cause_model_diagram.svg

State and Transition Data Tables
++++++++++++++++++++++++++++++++

.. list-table:: State Definitions
   :widths: 1, 5, 15
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - Susceptible
     - Susceptible to MM, without condition
   * - MM
     - Multiple myeloma
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
   * - MM
     - prevalence
     - Derived from "burn-in" method
     - 
   * - MM
     - excess mortality rate
     - data_dir/mortality First-line.csv
     - Derived from overall survival of first-line therapy in Braunlin et al.
   * - MM_first_relapse
     - prevalence
     - Derived from "burn-in" method
     - 
   * - MM_first_relapse
     - excess mortality rate
     - data_dir/mortality Second-line.csv
     - Derived from overall survival of second-line therapy in Braunlin et al.
   * - MM_second_relapse
     - prevalence
     - Derived from "burn-in" method
     - 
   * - MM_second_relapse
     - excess mortality rate
     - data_dir/mortality Third-line.csv
     - Derived from overall survival of Third-line therapy in Braunlin et al.
   * - MM_third_relapse
     - prevalence
     - Derived from "burn-in" method
     - 
   * - MM_third_relapse
     - excess mortality rate
     - data_dir/mortality Fourth-line.csv
     - Derived from overall survival of fourth-line therapy in Braunlin et al.
   * - MM_fourth_or_higher_relapse
     - prevalence
     - Derived from "burn-in" method
     - 
   * - MM_fourth_or_higher_relapse
     - excess mortality rate
     - data_dir/mortality Fifth-line.csv
     - Derived from overall survival of Fifth-line+ therapy in Braunlin et al.

data_dir = J:/Project/simulation_science/multiple_myeloma/data/cause_model_input

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
     - MM
     - :math:`\frac{\text{incidence_c486}}{1-\text{prev_c486}}`
     - incidence of MM among susceptible population
   * - incidence_MM_first_relapse
     - MM
     - MM_first_relapse
     - data_dir/incidence First-line.csv - data_dir/mortality First-line.csv
     - Derived from progress-free survival of first-line therapy in Braunlin et al.
   * - incidence_MM_second_relapse
     - MM_first_relapse
     - MM_second_relapse
     - data_dir/incidence Second-line.csv - data_dir/mortality Second-line.csv
     - Derived from progress-free survival of second-line therapy in Braunlin et al.
   * - incidence_MM_third_relapse
     - MM_second_relapse
     - MM_third_relapse
     - data_dir/incidence Third-line.csv - data_dir/mortality Third-line.csv
     - Derived from progress-free survival of third-line therapy in Braunlin et al.
   * - incidence_MM_fourth_or_higher_relapse
     - MM_third_relapse
     - MM_fourth_or_higher_relapse
     - data_dir/incidence Fourth-line.csv - data_dir/mortality Fourth-line.csv
     - Derived from progress-free survival of fourth-line therapy in Braunlin et al.

.. note::

  As described in the table above, because the progression free survival/treatment duration hazard rates informed from Flatiron health data represent the rate of progression/treatment cessation due to progression *in addition to* the rate of death, we will model the rate of progression to the next disease state independent mortality by subtracting the overall survival hazard rate from the progression free survival/treatment duration hazard rate.

data_dir = J:/Project/simulation_science/multiple_myeloma/data/cause_model_input

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
   * - emr_MM
     - Derived from overall survival of first-line therapy in Braunlin et al.
     - Don't use emr_c486
   * - emr_MM_{Nth}_relapse
     - Derived from overall survival of {(N+1)th}-line therapy in Braunlin et al.
     - 
   * - incidence_MM_{Nth}_relapse
     - Derived from progress-free survival of {Nth}-line therapy in Braunlin et al.
     - 
   * - prevalence ratio of MM to RRMM
     - literature review
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

.. list-table:: MM State-Specitfic Mortality Hazard Rates and Causes of Death
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
started the simulation in 2011, 10 years prior to the start date of interest. 
At this time point, a proportion of simulants equal to the age- and sex-specific 
MM prevalence from GBD 2019 were initialized into the NDMM disease state; 
no simulants were initialized into the RRMM disease state(s). We then let the 
simulation run from 2011 to 2021, using an OS hazard and PFS hazard derived from 
survival curves in Braunlin et al. (this analysis is described below) to inform 
the probability that simulants died or progressed beyond the NDMM state and 
updated the distribution of MM prevalence by disease states (NDMM, RRMM in first 
relapse, RRMM in second relapse, etc.) accordingly.

Mortality and Progression Hazard
++++++++++++++++++++++++++++++++

We used survival curves including overall survival and treatment duration that 
differed by line of treatment from Braunlin et al. to estimate the time-varying 
mortality and progression hazard for simulants at specific disease states and 
corresponding lines of treatment. In short, a non-parametric Kaplan-Meier 
estimator is used to calculate the baseline hazard rates. Mathematically:

:math:`S_{t} = \prod_{j: \tau_{j} \leq t} \frac{N_{j} - D_{j}}{N_{j}}`

Where,

:math:`N_{j}` is the number of at-risk people at jth time; and
:math:`D_{j}` is the number of event (e.g., death) at jth time.

Based on the equation above, we can solve for D if N and S are given:

:math:`S_{t} = S_{t-1} (1 - \frac{D_{t}}{N_{t}})`

Then,

:math:`D_{t} = N_{t} (1 - \frac{S_{t}}{S_{t-1}})`

As survival probabilities were reported on a monthly basis in Braunlin et al., 
we applied a piecewise constant interpolation to estimate single-day hazard to 
be in accord with the simulation time step. 

To incorporate stochastic uncertainty and apply different hazard rates for every 
iteration of the simulation, we sampled many draws of :math:`S_{t}` based on its 
variance derived from Greenwood’s formula, as describe below:

:math:`Var(S_{t}) = S_{t}^2 \sum_{j: \tau_{j} \leq t} \frac{D_{j}}{(N_{j} - D_{j})N_{j}}`

In the absence of progression-free survival from Flatiron Health data, we used 
the treatment duration data reported in Braunlin et al. as a proxy for estimating 
the progression free survival (PFS) hazard. For treatment duration, we associated 
it with treatment cessation due to events of death and events of progression. 
In other words, the event-free probabilities from treatment duration curves 
accounted for both mortality and progression of MM. Therefore, the incidence of 
relapse we implemented in our cause model is the consequence of subtracting the 
OS hazard from the treatment duration hazard as a proxy measure for the PFS hazard.

:math:`h(t)_{progression} = h(t)_{treatment\:duration} - h(t)_{overall\:survival}`

Further, to be consistent with the consensus definition of OS, we used the hazard 
rates derived from the OS data in Braunlin et al. to inform the `all-cause` 
mortality rate among simulants with MM in our model. Therefore, deaths reported 
in our model among MM patients may be due to causes other than MM. Notably, the 
mortality and progression hazard rates estimated, as described in this section, 
represent the population-level hazard rate of MM patients in the Flatiron Health 
registry. We used these hazard rates to represent the population-level baseline 
hazard rates for our model of the US population with MM. We then altered these 
baseline hazard rates at the individual level according to individual simulant 
characteristics including covariate and risk factor exposures as well as 
treatment category.


Survival Regression Model (unused)
----------------------------------

Model Overview
++++++++++++++

The rates for RRMM are unknown from GBD. So we plan to use the `time-varying Cox's 
proportional hazard model` to predict the transition from MM to RRMM, the transition 
between relapses within RRMM, the mortality from MM, and the mortality from RRMM 
(every relapse). These rates are assumed to be dependent on covariates such as 
age, sex, race/ethnicity, renal function, cytogenetic risk, and different lines 
of therapy. Our survival regression aims to model the rates as a function of hazard 
that is determined by time and a series of covariates. Moreover, time-varying 
regression model will allow us to model individuals' covariate (e.g., age) that 
changes over time. The idea behind this model is that the log-hazard of an individual 
is a linear function of their covariates and a population-level baseline that 
changes over time. Mathematically: 

:math:`h(t|x) = b_{0}(t) \times \exp\left(\sum \limits_{i=1}^n \beta_{i}(x_{i}(t)-\bar{x_{i}})\right)`

Where,
 - :math:`t` is the survival time
 - :math:`x` is the covariate
 - :math:`h(t|x)` is the hazard function determined by a set of covariates
 - :math:`b_{0}(t)` is the baseline hazard
 - :math:`\beta_{i}` is the coefficient that measures the impact of covariate
 - :math:`\sum \limits_{i=1}^n \beta_{i}(x_{i}(t)-\bar{x_{i}})` is the time-variant log partial hazard

This survival model consists of two parts: the underlying baseline hazard function, 
often denoted as :math:`b_{0}(t)`, describing how the risk of event per time unit 
changes over time at baseline levels of covariates; and the effect parameters, 
describing how the hazard varies in response to explanatory covariates. The baseline 
hazard function is consistent across time, calculated from the start when all 
covariates are set to zero. It could be parametric or non-parametric depending 
on what data are available in Flatiron. We hope that the coefficient of effect 
for all relevant covariates can be guided by Flatiron data as well.

From the survival regression model, we expect to output the survival/hazard as a 
function of time to tell when an event will happen and its likelihood, in a 
baseline survival model and a model with different values of covariates. In general, 
We will create two survival regression models:

 1. Mortality hazard model to predict time to death from MM and time to death from
    each of relapse states. 
 2. Transition hazard model to predict time from MM to RRMM, and time between last 
    relapse and next relapse within RRMM state. 

Model Assumptions
+++++++++++++++++

 - The proportional hazard model assumes that `all` individuals have the same hazard 
   function, but a unique scaling factor infront. So the `shape` of the hazard function 
   is the same for all individuals, and only a scalar multiple changes per individual.
 - Another key assumption is that each covariate has a multiplicative effect in 
   the hazard function that is constant over time.

Diagnostics for the Cox Model
+++++++++++++++++++++++++++++

 - Testing the proportional hazards assumption (Schoenfeld residual)
 - Detecting nonlinearity for continous variables (Martingale residual)
 - Examining influential observations (Deviance residual)

We will perform certain diagnostic tests for the Cox’s proportional hazard model. 
To check the model assumptions, residual methods are intended to be used in our 
survival analysis. In principle, the Schoenfeld residuals are independent of time. 
A plot that shows a non-random pattern against time is evidence of a violation of 
the PH assumption. By plotting event time against the Schoenfeld residual for each 
covariate, we except to see a non-significant relationship between Schoenfeld 
residuals and time. Often, we assume that continuous covariates have a linear form. 
However, this assumption should be checked. We can detect the nonlinearity between 
log hazard and the covariates by plotting the Martingale residual against continuous 
covariates. In addition, we plan to use the Deviance residual (a normalized 
transform of the martingale residual) to examine any influential observations 
or outliers.

To check the performance of Cox's model, we will include goodness of fit in our 
survival analysis results. Specifically, Cox-Snell residuals will be used to assess 
a model's goodness-of-fit. By plotting the Cox-Snell residual against the cumulative 
hazard function a model's fit can be assessed. We might modify the standard Cox-Snell 
residuals to account for the censored observations.

Input Data Table
++++++++++++++++

.. list-table:: Combination of different observations
   :header-rows: 1
   
   * - Age
     - Sex
     - Race
     - CKD
     - Cytogenetic risk
     - Transplantation
     - Treatment
     - Duration
     - Event
   * - 15 to 95 plus with 5-year age bin
     - ['Male', 'Female']
     - ['Black/African', 'Non-Black/African']
     - ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Stage 5']
     - ['High-risk', 'Standard-risk']
     - ['Eligible', 'Ineligible']
     - ['First line not Isa', 'Second line not Isa', 'Third or later line not Isa', 'Isatuximab']
     - ['Duration from MM to RRMM', 'Duration from MM to death', 'Duration from Nth relapse to (N+1)th relapse', 'Duration from Nth relapse to death']
     - ['Event of transition from MM to RRMM', 'Event of transition from Nth relapse to (N+1)th relapse', 'Event of death from MM', 'Event of death from Nth relapse']

.. todo::

   Add more details

Validation Criteria
+++++++++++++++++++

 - Model 1 (Susceptible to MM): compare simulation baseline results of MM prevalence, 
   MM incidence, and MM cause-specific mortality stratified by age, sex, and year to 
   GBD 2019 age-/sex-specific MM estimates.
 - Model 2 (MM to MM_{Nth}_relapse): compare simulation baseline results of overall 
   survival and progression-free survival by disease state to line-specific survival 
   outcomes obtained from [Braunlin-et-al-2020]_.

.. list-table:: Count measures from simulation stratified by disease state and time
   :widths: 1 10
   :header-rows: 1
   
   * - Measure
     - Definition
   * - disease_state
     - indication of health status 
   * - t_start
     - start time since entrance of specified disease state (months)
   * - t_end
     - end time since entrance of specified disease state (months)
   * - deaths
     - count of deaths among simulants with specified disease state for a given 
       period of (t_end - t_start) months
   * - progression
     - count of incident cases to new line of treatment among simulants with 
       specified disease state for a given period of (t_end - t_start) months
   * - person_time
     - count of person time among simulants with specified disease state contributed 
       to a given period of (t_end - t_start) months

.. list-table:: OS and PFS from simulation stratified by line of treatment
   :header-rows: 1

   * - state
     - line_of_tx
     - outcome
     - measure
     - numerator
     - denominator
   * - MM
     - first
     - OS
     - excess mortality
     - mm_deaths_count
     - mm_state_person_time
   * - MM
     - first
     - PFS
     - progression
     - mm_to_mm_first_relapse_incidence_count
     - mm_state_person_time
   * - MM_{Nth}_relapse
     - N+1
     - OS
     - excess mortality
     - mm_{Nth}_relapse_deaths_count
     - mm_{Nth}_relapse_state_person_time
   * - MM_{Nth}_relapse
     - N+1
     - PFS
     - progression
     - mm_{Nth}_relapse_to_mm_{(N+1)th}_relapse_incidence_count
     - mm_{Nth}_relapse_state_person_time

Formula to calculate OS or PFS by line of treatment = 
:math:`\prod \limits_{t=0}^{t<=n} (1 - \frac{numerator}{denominator} \times duration)`


References
----------

.. [Attal-et-al-2019-mm]
   Attal M, Richardson PG, Rajkumar SV, et al. Isatuximab plus pomalidomide and low-dose 
   dexamethasone versus pomalidomide and low-dose dexamethasone in patients with relapsed 
   and refractory multiple myeloma (ICARIA-MM): a randomised, multicentre, open-label, phase 
   3 study. Lancet 2019; 394: 2096–107.
   
.. [Cowan-et-al-2018]
   Cowan AJ, Allen C, Barac A, et al. Global Burden of Multiple Myeloma: A Systematic 
   Analysis for the Global Burden of Disease Study 2016. JAMA Oncol 2018; 4: 1221–7.

.. [GBD-2019-YLD-Capstone-Appendix-1-Neoplasms]
   Supplement to: `GBD 2019 Disease and Injury Incidence and Prevalence
   Collaborators. Global, regional, and national incidence, prevalence, and
   years lived with disability for 354 diseases and injuries for 195 countries
   and territories, 1990–2017: a systematic analysis for the Global Burden of
   Disease Study 2017. Lancet 2018; 392: 1789–858`
   (pp. 803-811)

.. [Braunlin-et-al-2020]
   Braunlin M, Belani R, Buchanan J, Wheeling T, Kim C. Trends in the multiple myeloma 
   treatment landscape and survival: a U.S. analysis using 2011–2019 oncology clinic 
   electronic health record data. Leukemia & Lymphoma 2021; 62: 377–86.

.. [SEER]
   https://seer.cancer.gov/seertools/seerrx/rx/53c44b1e102c1290262dd895/?regimen_field=name&rx_type=regimen&drug_offset=0&regimen_offset=125&q=&limit=100&drug_field=name&search_mode=&drug_direction=UP&regimen_direction=UP&mode=
