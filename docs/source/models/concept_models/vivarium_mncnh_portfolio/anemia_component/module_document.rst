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

.. _2024_vivarium_mncnh_portfolio_anemia_module:

======================================
Anemia YLDs Module
======================================

.. contents::
  :local:
  :depth: 2

1.0 Overview
++++++++++++

This document is the page for the anemia YLDs module of the MNCNH Portfolio simulation.
The way this is written, this looks like a separate module that processes information related to simulants' hemoglobin exposure
throughout the course of the simulation and calculate corresponding anemia exposure
and YLDs.

However, in the simulation implementation,
we have anemia YLDs being calculated in the same timesteps as hemoglobin exposure updates in the :ref:`hemoglobin module <2024_vivarium_mncnh_portfolio_hemoglobin_module>`.
This was done to keep a single definition of hemoglobin exposure across the entire simulation and avoid having separate measures such as
"hemoglobin at the start of pregnancy" and "hemoglobin at the end of pregnancy".

That means the contents of this document should be merged into the :ref:`hemoglobin module <2024_vivarium_mncnh_portfolio_hemoglobin_module>` document.

..todo::

   Update the documentation to reflect the simulation implementation strategy

2.0 Module Diagram and Data
+++++++++++++++++++++++++++++++

2.1 Module Methods
------------------

Anemia YLDs are estimated according to the following steps:
  
    1. Initialize anemia YLDs at 0. 

    2. Progress to the first trimester ANC visit hemoglobin timestep. 

      - For simulants who attend that visit, update their anemia YLD values according to their hemoglobin exposure going into the visit (mapped to an anemia status using pregnancy-specific thresholds) and a duration equal to the gestational timing of their first trimester ANC visit (:math:`T^\text{first trimester}_i` as defined in the parameter table on this document)

        - Update hemoglobin and LBWSG exposures according to interventions received at that visit

      - For simulants who do not attend that visit, do not update their anemia YLDs. 

    3. Progress to the later pregnancy ANC visit hemoglobin timestep.

      - For simulants who attend that visit and attended the first trimester visit as well, update their anemia YLD values according to their hemoglobin exposure going into that visit (intervention modified if covered) and the duration equal to the gestational timing of their later pregnancy visit minus the gestational timing of their first trimester visit (:math:`T^\text{later pregnancy}_i - T^\text{first trimester}_i` as defined in the parameter table on this document).

        - Update hemoglobin and LBWSG exposures according to interventions received at that visit

      - For simulants who attend that visit but not the first trimester visit update their anemia YLD values according to their hemoglobin exposure going into the visit (not intervention modified, even if covered at the later pregnancy visit) and a duration equal to the gestational timing of their later pregnancy ANC visit (:math:`T^\text{later pregnancy}_i` as defined in the parameter table on this document)

        - Update hemoglobin and LBWSG exposures according to interventions received at that visit

      - For simulants who do not attend that visit, do not update their anemia YLDs

    4. Progress to the antepartum hemorrhage hemoglobin timestep

      - For simulants who experience an incident case of antepartum hemorrhage as determined in the :ref:`antepartum hemorrhage <2023_cause_antepartum_hemorrhage_mncnh>` page, update their anemia YLD values according to their most recent hemoglobin exposure and a duration equal to the incidence time of their antepartum hemorrhage (:math:`T^\text{antepartum hemorrhage}_i` as defined in the parameter table on this document) minus the last time their anemia YLDs were updated.

      - For simulants who do not experience an incident case of antepartum hemorrhage, do not update their anemia YLDs
    
    5. Progress to the end of pregnancy hemoglobin timestep

      - **For simulants who did not die of antepartum hemorrhage**, update anemia YLDs according to hemoglobin exposure going into this timestep and the simulant-specific gestational time elapsed since the last time anemia YLDs were updated

        - Pregnancy duration for those who never attended any ANC visits and did not have antepartum hemorrhage

        - Pregnancy duration (according to intervention-modified gestational age) - gestational timing of later pregnancy ANC visit for those who attended later pregnancy ANC and did not have antepartum hemorrhage

        - Pregnancy duration (according to intervention-modified gestational age) - gestational timing of first trimester ANC visit for those who attended the first trimester but not later pregnancy ANC visit and did not have antepartum hemorrhage

        - Pregnancy duration (according to intervention-modified gestational age) - incidence time of antepartum hemorrhage for those who experienced an incident case of antepartum hemorrhage
      
      - For simulants who died of antepartum hemorrhage, update anemia YLDs according to their hemoglobin exposure going into this timestep and a duration equal to the time between the last time their anemia YLDs were updated and their death time due to antepartum hemorrhage.

    6. Progress to the six weeks after the end of pregnancy hemoglobin timestep

      - For simulants who survived labor and progressed to the postpartum period, update their anemia YLD values according to their hemoglobin exposure during the first six weeks after pregnancy and a duration of six weeks (in years) 

      - For simulants who did not survive labor and therefore do not progress to the postpartum period, do not update their anemia YLDs given that they should not experience any YLDs in the post-pregnancy timesteps
    
    7. Progress to the nine months after the end of pregnancy hemoglobin timestep

      - For simulants who survived labor and progressed to the postpartum period, update their anemia YLD values according to their hemoglobin exposure between six weeks and nine months after pregnancy (mapped to an anemia status using **non-pregnancy-specific** thresholds) and a duration of 40 - 6 = 34 weeks (in years) 

      - For simulants who did not survive labor and therefore do not progress to the postpartum period, do not update their anemia YLDs given that they should not experience any YLDs in the post-pregnancy timesteps

2.2 Module Inputs
---------------------

.. list-table:: Hemoglobin module required inputs
  :header-rows: 1

  * - Input
    - Source module
    - Application
    - Note
  * - First trimester ANC attendance 
    - :ref:`ANC module <2024_vivarium_mncnh_portfolio_anc_module>`
    - Determines anemia YLD calculation equation
    - 
  * - Hemoglobin at the start of pregnancy
    - :ref:`Hemoglobin module<2024_vivarium_mncnh_portfolio_hemoglobin_module>`
    - Used to calculate anemia YLDs
    - 
  * - Hemoglobin at the later pregnancy ANC visit
    - :ref:`Hemoglobin module<2024_vivarium_mncnh_portfolio_hemoglobin_module>`
    - Used to calculate anemia YLDs
    - Note that this value will be missing for simulants who did not attend the later pregnancy ANC visit
  * - Hemoglobin at end of pregnancy
    - :ref:`Hemoglobin module<2024_vivarium_mncnh_portfolio_hemoglobin_module>`
    - Used to calculate anemia YLDs
    - 
  * - Hemoglobin during the first six weeks after the end of pregnancy
    - :ref:`Postpartum hemoglobin module<2024_vivarium_mncnh_portfolio_postpartum_hemoglobin>`
    - Used to calculate anemia YLDs
    - Note that this value will be missing for simulants who did not survive labor
  * - Hemoglobin between six weeks and nine months after the end of pregnancy
    - :ref:`Postpartum hemoglobin module<2024_vivarium_mncnh_portfolio_postpartum_hemoglobin>`
    - Used to calculate anemia YLDs
    - Note that this value will be missing for simulants who did not survive labor
  * - IV iron coverage
    - :ref:`Hemoglobin module<2024_vivarium_mncnh_portfolio_hemoglobin_module>`
    - Determines anemia YLD calculation equation
    - 
  * - IFA/MMS coverage
    - :ref:`Hemoglobin module<2024_vivarium_mncnh_portfolio_hemoglobin_module>`
    - Determines anemia YLD calculation equation
    - 
  * - Pregnancy duration
    - :ref:`Pregnancy II module <2024_vivarium_mncnh_portfolio_pregnancy_module>`
    - Used to calculate anemia YLDs
    - 
  * - Antepartum hemorrhage incidence
    - :ref:`Antepartum hemorrhage module <2024_vivarium_mncnh_portfolio_antepartum_hemorrhage_module>`
    - Used to calculate anemia YLDs
    - 
  * - Antepartum hemorrhage death
    - :ref:`Antepartum hemorrhage module <2024_vivarium_mncnh_portfolio_antepartum_hemorrhage_module>`
    - Used to calculate anemia YLDs
    - 

.. list-table:: Parameters
  :header-rows: 1

  * - Parameter
    - Value
    - Source/Note
  * - :math:`T^\text{first trimester}_i`
    - Randomly sample a different value for each simulant who attends a first trimester ANC visit. Use the distribution corresponding to the simulant's assigned pregnancy duration (based on gestational age at birth exposure before it has been modified by interventions as a modeling convenience):

        - Pregnancy duration > 12 weeks: uniform distribution between 8 and 12 weeks 
        - Pregnancy duration between 8 and 12 weeks: uniform distribution between 8 weeks and the simulant's pregnancy duration
        - Pregnancy duration < 8 weeks: uniform distribution between 6 and the simulant's pregnancy duration
    - Note that we define minimum pregnancy duration/gestational age at birth values of 20 weeks for live births, 24 weeks for stillbirths, and 6 weeks for abortion/miscarriage/ectopic pregnancies (see details on the :ref:`pregnancy model document <other_models_pregnancy_closed_cohort_mncnh>`)
  * - :math:`T^\text{later pregnancy}_i`
    - Randomly sample a different value for each simulant who attends the later pregnancy ANC visit from a uniform distribution between 12/52 and :math:`\text{duration}^\text{pregnancy}_i - 2/52`. Note that pregnancy duration used in this context will be affected by interventions received at the first trimester visit and unaffected by interventions received at the later pregnancy visit as a modeling convenience.
    - Note that abortion/miscarriage/ectopic pregnancies cannot attend later pregnancy ANC visits according to the :ref:`ANC attendance module <2024_vivarium_mncnh_portfolio_anc_module>`. The minimum gestational age at birth for the remaining relevant pregnancy outcomes is 20 weeks for live births and 24 weeks for stillbirth, so we will not encounter later pregnancy ANC attendance among pregnancies that end prior to 14 weeks of gestation, which would result in a negative value.
  * - :math:`T^\text{antepartum hemorrhage}_i`
    - The incidence time is sampled uniformly between the last ANC visit attended and delivery, or if the last ANC visit attended was prior to 28 weeks or no ANC visits were attended, then between 28 weeks and delivery.
      This reflects the fact that risk of antepartum hemorrhage is highest in the third trimester.
    - 

.. note::

  Assumptions surrounding the timing of antenatal care visits as defined in the table above were informed by the following:

  - In the U.S., pregnancy providers generally don't book first ANC visits until 8 weeks of gestation, which earliest time when pregnancy can be reliably confirmed as intrauterine/vitals assessed via ultrasound, unless there are concerning symptoms before then. Papers such as [Endawkie-et-al-2024]_ show pretty low rates of first ANC visit prior to 8 weeks for our modeled locations. Since the minimum pregnancy duration in our model for ectopic/abortion/miscarriage pregnancies is 6 weeks (see the :ref:`pregnancy model document <other_models_pregnancy_closed_cohort_mncnh>`), we needed to allow for first trimester ANC visits as early as 6 weeks to avoid assigning first trimester ANC visit attendance after a pregnancy has ended among this group. Therefore, we assume that the ectopic/abortion/miscarriage pregnancies in our model represent the small portion of pregnancies with early concerning symptoms that attend ANC visits prior to 8 weeks and assume all other pregnancies do not attend ANC prior to 8 weeks of gestation.
  - Note that we assume the later pregnancy ANC visit occurs at least two weeks prior to the end of pregnancy. This was an arbitrary decision to avoid administration of IV iron very close to the onset of the intrapartum period.

2.4: Module Outputs
-----------------------

.. list-table:: Hemoglobin module outputs
  :header-rows: 1

  * - Output
    - Value
    - Dependencies
  * - Anemia YLDs
    - Point value
    - Simulation result

3.0 Assumptions and limitations
++++++++++++++++++++++++++++++++

- We assume uniform distribution across assumed plausible ranges for timing of ANC visits as well as timing of pregnancies that end in ectopic pregnancy/miscarriage/abortion (as detailed on the :ref:`pregnancy model document <other_models_pregnancy_closed_cohort_mncnh>`) rather than informing these parameters with data
- We assume that interventions affect anemia YLDs at the time of administration at ANC (as according to the timed assumptions in the two prior bullets) with no additional delay 
- We do not model any deaths in the 39 weeks after pregnancy, so we assume that all simulants who survive labor also survive 39 weeks afterward and therefore experience anemia YLDs during this period. This may lead to a slight overestimation of anemia YLDs.
- We do not model simulants changing age groups during the 39 weeks after pregnancy, and thereby slightly underestimate the ages
  of people in this period.
  The impact of this on anemia YLDs depends on how hemoglobin differs between a simulant's age group and the next:
  if the next age group has higher hemoglobin, and the simulant would have aged into it, then we will underestimate anemia YLDs during this period,
  and if the next age group has lower hemoglobin, and the simulant would have aged into it, then we will overestimate anemia YLDs during this period.
  We expect this effect to be small, but it is unclear whether it will lead to an overall overestimation or underestimation of anemia YLDs.
- We use the exposure value for gestational age at birth as an input to determining the timing of ANC visits in our simulation. Given that gestational age at birth exposures are affected by interventions and therefore are different between scenarios and also change across timesteps within scenarios as simulants gain access to different interventions, our model is limited in that there may be slightly different ANC visit timing for the same simulant in different scenarios. Additionally, there may be differences in the pregnancy duration value used to determine timing of an ANC visit and the final gestational age at birth exposure for a maternal/child dyad. Given that the ANC visit timing variable only affects anemia YLDs in our simulation (which is expected to be a small portion of overall impact), we have deemed this an acceptable limitation. 

4.0 Verification and Validation Criteria
+++++++++++++++++++++++++++++++++++++++++

- Baseline simulated anemia YLDs, excluding the six weeks to nine months after pregnancy timestep, should match corresponding pregnancy-specific GBD values. Run the following command to load the data from GBD 2023:

.. code-block:: python

   get_draws(
        gbd_id_type='rei_id',
        gbd_id=[205, 206, 207], # Mild, moderate, and severe anemia, respectively. We also have rei_id=192 for all anemia and rei_id=432 for moderate and severe combined
        location_id=list(location_ids.location_id),
        population_group_id=16, # pregnant population
        sex_id=2, # female
        year_id=2023,
        release_id=33, # GBD 2023, special publications
        source='como',
        measure_id=5, # prevalence
        metric_id=3, # rate
        age_group_id=[7, 8, 9, 10, 11, 12, 13, 14, 15], # constituent age groups of 10-54 years (169)
    )

.. note::

   Converting this to a get_outputs call is a bit complex. To do so, make sure you have the latest version of ``db_queries`` to be able to use the ``population_group_id`` argument. To get pregnancy-specific results, the population group and the age groups need to be specified, because the default is all ages. Additionally, you will need to specify a compare version ID, which is 8352 for GBD 2023.


5.0 References
+++++++++++++++

.. [Endawkie-et-al-2024]

  Endawkie A, Kebede SD, Abera KM, Abeje ET, Enyew EB, Daba C, Asmare L, Bayou FD, Arefaynie M, Mohammed A, Tareke AA, Keleb A, Kebede N, Tsega Y. Time to antenatal care booking and its predictors among pregnant women in East Africa: a Weibull gamma shared frailty model using a recent demographic and health survey. Front Glob Womens Health. 2024 Nov 27;5:1457350. doi: 10.3389/fgwh.2024.1457350. PMID: 39664654; PMCID: PMC11631944. `https://pmc-ncbi-nlm-nih-gov.offcampus.lib.washington.edu/articles/PMC11631944/ <https://pmc-ncbi-nlm-nih-gov.offcampus.lib.washington.edu/articles/PMC11631944/>`__