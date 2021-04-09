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

.. _2019_concept_model_vivarium_sanofi_multiple_myeloma:

=======================================================
Vivarium - CSU - Simulating Multiple Myeloma registries
=======================================================

.. contents::
  :local:

+------------------------------------+
| List of abbreviations              |
+=======+============================+
| ASCT  | Autologous stem cell       |
|       | transplantation            |
+-------+----------------------------+
| CKD   | Chronic kidney disease     |
+-------+----------------------------+
| GFR   | Glomerular filtration rate |
+-------+----------------------------+
| HR    | Hazard ratio               |
+-------+----------------------------+
| Isa   | Isatuximab                 |
+-------+----------------------------+
| MM    | Multiple myeloma           |
+-------+----------------------------+
| OS    | Overall Survival           |
+-------+----------------------------+
| PFS   | Progression-free survival  |
+-------+----------------------------+
| RCT   | Randomized controlled trial|
+-------+----------------------------+
| RRMM  | Relapsed/ Refractory MM    |
+-------+----------------------------+


.. _1.0:

1.0 Background
++++++++++++++
For this project, we are interested in the expected impact of Isatuximab on the overall Unites States population, among a registry population, and in key-subpopulations listed below, in comparison to a business as usual treatment scenario over 5 years.

Key sub-populations agreed upon include: 

* Black/African American population 

* Population with high-risk cytogenetics 

* Population with renal impairment/CKD (GFR < 60 ml/min/1.73m^2)

* Elder population (aged > 75 years) 

In the absence of data on treatment effects for sub-groups we will need to make assumptions with client guidance. A strength of this project is that we will be able to iteratively update such assumptions as we get real world data from registries and re-run the simulation. 

.. _1.1:

1.1 Project overview
--------------------
This project intends to model the impact of a new treatment option for myeloma disease, Isatuximab, from 2021 to 2026 among the general population, key subpopulations listed above, and a registry population within the United States. The model will make use of the current multiple myeloma treatment guidelines in the United States, which are dependent on disease status, age, eligibility for stem cell transplantation, risk category, history of malignancy, and duration of previous treatment response. 


.. _1.2:

1.2 Literature review
---------------------

There is one randomized controlled trial on Isatuximab treatment that is currently active and is briefly described below.

.. list-table:: RCT Summaries
   :header-rows: 1

   * - Study Name
     - Recent Publication(s)
     - Location
     - Intervention arm
     - Control arm
     - Eligible population
     - Length of follow-up
   * - Multinational Clinical Study Comparing Isatuximab, Pomalidomide, and Dexamethasone to Pomalidomide and Dexamethasone in Refractory or Relapsed and Refractory Multiple Myeloma Patients (ICARIA-MM)
     - (1.) Dimopoulos, M.A., Leleu, X., Moreau, P. et al. 2020; (2.) Attal, Richardson, Rajkumar, San-Miguel, Beksac, Spicka, et al. 2019 
     - 102 sites in 24 countries
     - IPd (isatuximab + pomalidomide + dexamethasone)
     - Pd (pomalidomide + dexamethasone)
     - Adult patients with relapsed and refractory multiple myeloma who had received at least two previous lines of treatment, including lenalidomide and a proteasome inhibitor.
     - 28-day treatment cycle




.. _2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++

The primary objective of this project is to answer the following question: what can we expect the incidence, prevalence, mortality, and survival of MM to be overall and among a registry population in the United States, and in key sub-populations, under a business-as-usual treatment scenario and an Isatuximab treatment scenario over 5 years? The key sub-populations include the Black/African American population, population with high-risk cytogenetics, population with renal impairment and the elderly population (age > 75 years).  

To answer this question, we will gather data from the 2019 Global Burden of Disease Study (GBD), SEER, literature, and Flatiron Health and run our ownuse survival regression to inform the parameters for our simulation. We will simulate the changes in MM and RRMM disease incidence, prevalence and survival from 2021 to 2026 in response to an Isatuximab treatment intervention scenario in the US population and simulated registry population. These outcomes will be stratified by age, sex, calendar year, race/ethnicity, renal impairment and cytogenetic risk. 

.. _3.0:

3.0 Causal framework
++++++++++++++++++++

.. _3.1:

3.1 Causal diagram
------------------

 .. note::
    link to DAGs page
    use round circles with DAGs

**Outcome (O)**:



**Most proximal determinant/exposure (E)**:



**Confounders (C)**:



**Effect modifiers**:


**Mediators (M)**:


.. _3.2:

3.2 Effect sizes
----------------



4.0 Intervention
++++++++++++++++

Among MM and RRMM patients, they expect to have:
 - Isatuximab treatment with coverage scale-up from 10% to 45% across 5 years 
   of the simulation. Or
 - Other (non Isa-based) treatment with constant coverage rates across 5 years 
   of the simulation

.. _4.1:

4.1 Simulation scenarios
------------------------

To measure the impact of Isatuximab, we will simulate two scenarios, a baseline 
scenario and an alternative scenario, outlined below. The underlying health state 
of each simulant will be measured at each 28-day time step and the probability 
that each simulant is treated will be dependent on the coverage stated in that 
scenario. 

`We might stratify the treatment covearge rates by simulant’s cytogenetic risk 
level, age, sex, and race/ethnicity if Flatiron data support us to do so.`

**Baseline** The baseline scenario will project GBD 2019 demographic and disease 
trends out from 2021 to 2026. For any simulated population, the coverage rates 
for all regimens except Isatuximab will be held constant across the 5 years of 
the simulation; Isatuximab will start to be available to simulants as a second-line 
regimen and ramp up to 45% coverage by 2026 to simulate a business-as-usual 
treatment scenario.

**Alternative** Most aspects of the alternative scenario will be the same as the 
baseline scenario: it will project GBD 2019 demographic and disease trends out 
from 2021 to 2026 and apply the same coverage rates (or ramp up) for all regimens 
specified in the baseline. In contrast to the baseline scenario, Isatuximab in 
the alternative scenario will start to be available to simulants as a first-line 
regimen among all simulated population.


In the absence of data from Flatiron, we made following assumptions:
 1. The initial treatment coverage of Isatuximab is set to be 10% in 2021.
 2. The probability of simulants treated with Isatuximab is the same across 
    different lines of treatment.
 3. The coverage scale-up of Isatuximab follows the same trend from IQVIA sales 
    projection.

.. note::

 According to IQVIA sales data, the total sales of Isatuximab equal to 
 113 million dollars in 2021. The unit cost for a 12-month Isatuximab treatment 
 is about 145,600 dollars, that yields a total of 776 patients in year 2021 could 
 be treated with Isatuximab. In GBD 2019 summary, there were 89,566 prevalent MM 
 cases in 2019 for all ages and both sexes. As a result, the initial coverage of 
 Isatuximab is calculated to be 1% in 2021, and expect to reach 5% in 2026 based 
 on the slope derived from IQVIA sales projection. (~350% increase from 2021 to 
 2026) So, the endpoint coverage could reach 45% If we set the initial coverage 
 2027) of Isatuximab to be 10% in 2021.

.. _5.0:

5.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _5.1:

5.1 Vivarium concept model 
--------------------------

.. image:: concept_model_diagram.svg

The simulation concept model consists of five main components: 
 1. Covariates (age, sex, race/ethnicity) 
 2. Risk factors (GFR and cytogenetics) 
 3. Causes (progression of multiple myeloma) 
 4. Health system (multiple lines of treatment for MM and RRMM population) 
 5. Patient registry 

.. _5.2:

5.2 Demographics
----------------

.. _5.2.1:

5.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  - Location: United States
  - Cohort type: Prospective closed cohort of 15 years and older
  - Size of largest starting population: 100,000 simulants
  - Time span: Jan 1, 2018 to Dec 31, 2025
  - Time step: 28 days to capture duration of treatment, and time to response

.. _5.3:

5.3 Models
----------

.. _5.3.1:

5.3.1 Disease model
~~~~~~~~~~~~~~~~~~~

See :ref:`multiple myeloma cause model<2019_cancer_model_multiple_myeloma>`

.. _5.3.2:

5.3.2 Risk factor model
~~~~~~~~~~~~~~~~~~~~~~~

To study the sub-population of people with CKD and/or high-risk cytogenetics, 
the risk factor model tracks two risk factors: glomerular filtration rate (GFR) 
and cytogenetic risk. These two risk factors do not directly alter the risk of 
developing MM. Instead, they are considered as determinants in patient and 
disease characteristics. For simulants at a given age, sex, and race/ethnicity, 
the choice of therapy is based on their GFR and cytogenetic risk. 

**GFR** has a continuous risk exposure by age and sex (or race/ethnicity). 
Simulants will be assigned to a CKD stage based on their GFR value. We consider 
4 stages of CKD:
 - No CKD: GFR > 90 ml/min/1.73m^2
 - Mild CKD: GFR 60 to 90 ml/min/1.73m^2
 - Moderate CKD: GFR 30 to 60 ml/min/1.73m^2
 - Severe CKD: GFR < 30 ml/min/1.73m^2

**Cytogenetic risk** is a binary risk factor. Simulants will fall into one of 
two risk exposure categories: with high-risk cytogenetics, or with standard-risk 
cytogenetics. We intend to use Flatiron data to inform the existing prevalence 
of high-risk cytogenetics among adults in the US population with multiple myeloma.

.. note::

 Describe how to stratify GFR by race/ethnicity.

.. _5.3.3:

5.3.3 Treatment model
~~~~~~~~~~~~~~~~~~~~~

First-line treatment
^^^^^^^^^^^^^^^^^^^^

Second-line treatment
^^^^^^^^^^^^^^^^^^^^

Third- or later-line treatment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. _5.3.4:

5.3.4 Patient registry model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Inlcusion criteria
^^^^^^^^^^^^^^^^^^

This model will track which simulants are included in a registry. To achieve this, 
we need to know who is a registry candidate, and what factors affect the probability 
they will be included in a registry. The registry is running for RRMM patients 
(any newly incident RRMM cases developed from multiple myeloma and the pre-existing 
RRMM cases at the start of the simulation). In general, we will use the criteria 
listed below to decide who is eligible to be enrolled in the registry.
  - 18 years and older
  - With relapsed/refractory multiple myeloma (RRMM according to IMWG definition)
  - First time using Isa (never received Isa for treatment of disease other than RRMM)
  - No personal history of other malignant cancers in the past 3 years

Besides age and disease status, there are two additional factors we need to 
consider for making a simulant (with RRMM) a registry candidate. First, eligibility 
for Isatuximab treatment, which means this RRMM patient must have had at least 
one previous line of treatment and was never previously treated with Isatuximab 
for diseases other than RRMM.  Second, personal history of malignancy. We will 
exclude any RRMM patients who have been diagnosed and/or treated for another 
malignant neoplasm within three years from the registry.

.. note::
 
 The eligibility of Isatuximab treatment might change based on the guidance from our clients.

Power calculation
^^^^^^^^^^^^^^^^^

To calculate the number of simulants in the registry for each calendar year from 
2021 to 2026, we will use the equation presented below: 

:math:`N_{enroll}(t) = N_{0} + Prev_{RRMM}(t) \times F_{Isa} \times (1 - F_{other malignancy})`

Where,
 - :math:`N_{enroll}(t)` is the number of simulants in the registry in year t
 - :math:`N_{0}` is the number of simulants in the registry at the beginning of 
   the simulation (e.g., 2021-01-01)
 - :math:`Prev_{RRMM}(t)` is the number of prevalent RRMM cases in year t
 - :math:`F_{Isa}` is the proportion of population eligible for Isatuximab treatment
 - :math:`F_{other malignancy}` is the proportion of population with another 
   malignancy other than RRMM in the past three years


.. _5.4:

5.4 Input data sources
----------------------

.. _5.5:

5.5 Output meta-table shell
---------------------------

.. list-table:: Output shell table
   :header-rows: 1

   * - Location
     - Year
     - Age group
     - Sex
     - Poulation group
     - Scenario
     - Cause
     - Outcome
   * - United States
     - 2021
     - 15 to 19
     - Female
     - General population
     - Baseline
     - Multiple myeloma
     - Incidence (cases per person-year)
   * - 
     - 2022
     - 20 to 24
     - Male
     - Black/African American population
     - Alternative
     - Relapsed/refractory multiple myeloma
     - Prevalence (cases per person-year)
   * - 
     - 2023
     - 25 to 29
     - 
     - High-risk cytogenetics population
     - 
     - 
     - Survival (PFS and OS in months)
   * - 
     - 2024
     - ...
     - 
     - Population with CKD (GFR < 60 ml/min/1.73m^2)
     - 
     - 
     - Deaths (per person-year)
   * - 
     - 2025
     - 95 plus
     - 
     - Elder population (aged > 75 years)
     - 
     - 
     - 
   * - 
     - 
     - 
     - 
     - Registry population
     - 
     - 
     - 

.. _6.0:

6.0 Back of the envelope calculations
+++++++++++++++++++++++++++++++++++++


.. _7.0:

7.0 Limitations
+++++++++++++++

 1. The incorporation of ASCT into the treatment model of the simulation is 
    dependent on data availability. If it is not incorporated we may underestimate 
    the duration to first relapse among MM patients (though because it would not 
    be incorporated in either the baseline or alternative scenarios, we do not 
    expect the proportional difference between the two scenarios would be significantly 
    impacted). To model the effect of ASCT along with the first-line treatment 
    for MM patients, we need additional information on how long patients wait 
    before they can get the transplant. We may overestimate the hazard of not 
    receiving a transplant if we assume any patient who dies before receiving a 
    transplant is a non-transplant patient. We do not intend to incorporate an 
    option for “delayed transplant” in which transplant occurs at first relapse.
 2. We assume the incidence of MM from GBD is the detection rate of symptomatic 
    cases.
 3. Guided by Sanofi’s RRMM patient registry protocol, patients who had previous 
    malignancy in the past 3 years are not eligible to be enrolled in the registry. 
    That means some RRMM patients will be excluded based on their personal history 
    of malignancy. We will use literature evidence or SEER data to inform the 
    proportion of RRMM patients with other malignancy in the past 3 years.


8.0 References
+++++++++++++++

.. [Dimopoulos-et-al-2020]
   Dimopoulos MA, Leleu X, Moreau P, et al. Isatuximab plus pomalidomide and 
   dexamethasone in relapsed/refractory multiple myeloma patients with renal 
   impairment: ICARIA-MM subgroup analysis. Leukemia 2021; 35: 562–72.

.. [Attal-et-al-2019]
   Attal M, Richardson PG, Rajkumar SV, et al. Isatuximab plus pomalidomide and 
   low-dose dexamethasone versus pomalidomide and low-dose dexamethasone in patients 
   with relapsed and refractory multiple myeloma (ICARIA-MM): a randomised, 
   multicentre, open-label, phase 3 study. Lancet 2019; 394: 2096–107.