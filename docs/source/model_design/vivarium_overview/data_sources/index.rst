.. _data:

===================================
Understanding and Pulling GBD Data
===================================

Global Burden of Disease (GBD) Study data is a fundamental data source for our simulation models. 
Understanding what data is available in the GBD and what modeling processes produced it is a 
difficult task. Some helpful resources for understanding the GBD study are listed below: 

- IHME onboarding trainings
- GBD capstone papers and their methods appendices, such as:
   
   - `The GBD 2019 Demographics Capstone Paper <https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30977-6/fulltext>`_
   - `The GBD 2019 Causes Capstone Paper <https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30925-9/fulltext>`_
   - `The GBD 2019 Risk Factors Capstone Paper <https://doi.org/10.1016/S0140-6736(20)30752-2>`_

- `The GBD compare tool <https://vizhub.healthdata.org/gbd-compare/>`_, which allows you to visualize GBD estimates
- `GBD ID viewer <https://shiny.ihme.washington.edu/connect/#/apps/1cbf4a06-bfe9-4896-9028-9f4d23cc75c6/access>`_
- `GBD risk factors toolbox <https://shiny.ihme.washington.edu/content/13/>`_
- Your simulation science team members!
- Talking to GBD modelers directly

Pulling GBD Data using *Shared Functions*
-----------------------------------------

IHME central computation maintains functions for accessing GBD data, referred to as "Shared Functions." `The main HUB page for shared functions can be found here <https://hub.ihme.washington.edu/display/SF/Shared+Functions+Home>`_

Note that there is a central computation maintained conda environment that is guaranteed to have the latest version of all GBD shared functions, called :code:`gbd_env`, as described on the Shared Functions HUB page. 

- Note that archived GBD rounds (for example, GBD 2017) may require archived GBD environments to access - see the "Current and Archive GBD environments" subpage for more details.

- Also note that while the :code:`gbd_env` environment is guaranteed to have the most up to date versions of shared functions, it is unlikely to include additional packages you may want to use, which is a downside of using this environment.

If you wish to use your own environment and add shared functions to that environment, you may do so using :code:`pip`, but you will need to add *artifactory.ihme.washington.edu* as a trusted host in you :code:`~/.pip/pip.conf` file first, `as described on this HUB page <https://hub.ihme.washington.edu/display/SF/Current+and+archive+GBD+environments>`_. See :ref:`the computing onboarding resource page <computing>` for more information on managing conda environments. 

The packages most relevant to pulling GBD data using shared functions include :code:`db_queries` and :code:`get_draws`.

Overview of  :code:`db_queries`
+++++++++++++++++++++++++++++++++

`Documentation for db_queries can be found here. <https://scicomp-docs.ihme.washington.edu/db_queries/current/index.html>`_

Some particularly helpful functions in :code:`db_queries` include:

- :code:`get_ids`: Returns a list of GBD IDs for any entities in GBD (age groups, locations, causes, etc.)
- :code:`get_outputs`: Returns mean value and uncertainty interval for GBD results
- :code:`get_population`: Returns population size estimates
- :code:`get_covariate_estimates`: Returns mean value and uncertainty interval for GBD covariates

Overview of  :code:`get_draws`
++++++++++++++++++++++++++++++++

`Documentation for get_draws can be found here. <https://scicomp-docs.ihme.washington.edu/get_draws/current/index.html>`_

:code:`get_draws` differs from :code:`db_queries.get_outputs` in that rather than returning a mean estimate and uncertainty interval, it returns draw-level estimates from which a mean value and uncertainty interval can be estimated. Unlike :code:`db_queries.get_outputs`, :code:`get_draws` does not automatically aggregate results from the most detailed estimates (for instance: it returns sex-specific values and will not automatically return vaues for sex_id=3/"both" sexes combined).

Additionally, there are certain intermediate values used in GBD that are not available in GBD's final results found in :code:`db_queries.get_outputs` and can only be pulled using :code:`get_draws`, such as risk exposures and relative risks. The various data source available in :code`get_draws` are summarized in the table below and also described in more detail on the `get_draws documentation page here <https://scicomp-docs.ihme.washington.edu/get_draws/current/sources.html#>`_.

.. list-table:: Sources of draws
   :header-rows: 1

   *  - Source
      - Description
      - GBD ID type
      - Note
   *  - :code:`epi`
      - Dismod and custom epi models. This source contains data that is computed by GBD modelers and often used as inputs to central GBD processes.
      - modelable_entity_id
      - 
   *  - :code:`codcorrect`
      - Deaths and YLLs
      - cause_id
      - Returns **counts** only
   *  - :code:`como`
      - YLDs, incidence, and comorbidity-adjusted prevalence
      - cause_id, sequela_id, rei_id
      - Returns **rates** only
   *  - :code:`dalynator`
      - DALYs
      - cause_id
      - 
   *  - :code:`exposure`
      - Risk factor exposure
      - rei_id
      - Can be continuous (like mean BMI) or categorical (like stunting prevalence)
   *  - :code:`exposure_sd`
      - Risk exposure standard deviation
      - rei_id
      - Only for continuous risks
   *  - :code:`rr`
      - Risk factor relative risk
      - rei_id, cause_id
      - Will return values for all affected causes unless a cause_id is specified
   *  - :code:`burdenator`
      - Risk attributable burden (deaths/dalys/ylls/ylds) and mediated/aggregated PAFs
      - cause_id, rei_id
      - 
   *  - :code:`paf`
      - Pre-burdenator (non-finalized) PAF estimates
      - rei_id, cause_id
      - 
   *  - :code:`sev`
      - Summary exposure values
      - rei_id
      - 
   *  - :code:`tmrel`
      - Risk factor theoretical minimum exposure level
      - rei_id
      - 
   *  - :code:`rr_max`
      - Relative risk maximum value
      - rei_id, cause_id
      - 
   *  - :code:`codem`
      - codem models and custom cod models
      - cause_id
      - 
   *  - :code:`stgpr`
      - ST-GPR models
      - modelable_entity_id
      - If you pass an MEID with a dismod model type but try to use the ST-GPR source, get_draws will use the epi source instead.

Handling GBD versioning
++++++++++++++++++++++++

Decomposition (or "decomp") steps are a versioning scheme used in some GBD rounds that allowed updates to GBD results based on iterative updates to certain parts of the computation process. For instance, the first step may be equivalent to the prior GBD round in all aspects except for an updated demographic model; the second step may be equivalent to the prior steps, but with updated risk exposures; and so on. This process allowed GBD researchers to evaluate how individual components of the many changes included in a GBD round advancement influenced the main results of the GBD study, rather than updating the entire pipeline at once.

When pulling GBD data from GBD rounds that used decomp step versioning, you are required to specify a :code:`decomp_step` value in your shared functions call. 

Unfortunately, the steps are not necessarily equivalent between GBD rounds. For this reason, we advise consulting the HUB space specific to the GBD round you are interested in, which often contains information about that round's "Decomposition rules."

For reference, `the decomposition rules for GBD 2021 can be found here <https://hub.ihme.washington.edu/display/GBD2020/GBD+2020+Decomposition+analysis>`_

Additionally, you may be required to specify a :code:`version_id`, :code:`release_id`, and/or :code:`status` when pulling GBD results from certain GBD rounds. The HUB space for a given GBD round is a good resource on where to obtain this information, but do not hesitate to open a helpdesk ticket to inquire or confirm whether you are using appropriate versioning IDs for you GBD shared functions call.

.. todo::

   Discuss release_id as preferred alternative to gbd_round_id + decomp_step.

Pulling GBD Data using *Vivarium Inputs*
----------------------------------------

There are two main packages within the Vivarium software framework that are especially useful for interacting with GBD data: `gbd_mapping <https://vivarium.readthedocs.io/projects/gbd-mapping/en/latest/index.html>`_ and `vivarium_inputs <https://vivarium.readthedocs.io/projects/vivarium-inputs/en/latest/index.html>`_.

Both of these packages translate ID numbers used in GBD to human-readable text.

Overview of :code:`gbd_mapping`
+++++++++++++++++++++++++++++++

:code:`gbd_mapping` provides a convienient way to access all of the metadata associated with a given GBD entity (ex: diarrheal diseases cause or child growth failure risk factor), but does not return any estimates assoicated with that entity (ex: prevalence or relative risks).

Overview of :code:`vivarium_inputs`
++++++++++++++++++++++++++++++++++++++++++++++

:code:`vivarium_inputs` provides simplified functions to query GBD data and reformats the data to be compatible with the data structure required for building Vivarium Artifact objects. :code:`vivarium_inputs` generally returns data for the most up-to-date *complete* GBD round/release and does not allow for user-specification of prior rounds/releases -- ask the software engineers if you have questions about which GBD round/release is active in :code:`vivarium_inputs` at any given time. Additionally, if there is any doubt as to which GBD versioning is being returned by a given :code:`vivarium_inputs` call, you can utilize :code:`get_raw_data`, which will return full data including GBD versioning IDs for a given call.

`For documentation on Vivarium Inputs, click here <https://vivarium.readthedocs.io/projects/vivarium-inputs/en/latest/index.html>`_.

Some important notes and considerations not included in the documentation above are listed below:

.. todo::
   
   List default behavior of get_measures/other functions once the GBD 2021 update is finalized, including things like:

   - Returning most recent available year - note potential exception with risk effects?
   - Filtering of draws (reduction of 1,000 COD draws down to 500 that are present in COMO)?
   - Returning all ages/sexes and filling NANs with zeros
   - Version ID behavior with GBD 2021? 
   - Anything else?

.. list-table:: Notable default behavior of get_measures
   :header-rows: 1

   *  - Measure
      - Data returned
      - Note
   *  - :code:`'incidence'`
      - GBD_incidence / (1 - GBD_prevalence)
      - By default, get_measures automatically converts GBD's "population-level incidence rates" to "susceptible population incidence rates" using the GBD estimate of prevalence. Note that if a model is using an alternative value for prevalence, this rescaling should be done separately using that prevalence value.
   *  - :code:`'raw_incidence_rate'`
      - GBD_incidence
      - 
   *  - :code:`'cause_specific_mortality'`
      - GBD_death_count / GBD_population_counts
      - 
   *  - :code:`'excess_mortality'`
      - cause_specific_mortality / GBD_prevalence
      - By default, get_measures calculates excess mortality rates in accordance with the GBD estimate of prevalence. If a model is using an alternative value for cause prevalence, excess mortality rates should likely be calculated separately using that prevalence value.

Applied examples
-----------------

.. todo::

   Link notebook that shows examples of using these functions.

Considerations of each approach
----------------------------------

Generally, GBD shared functions offer greater flexibility in querying GBD data than Vivarium Inputs, but require specification of detailed IDs that are not human-readable and require translation with get_ids. Vivarium Inputs offers less flexibility in favor of the convenience of returning a human-readable version of the most relevant data for running Vivarium simulations and compatibility with required Vivarium Artifact formatting. Therefore, GBD shared functions may be the code base to use when taking deep dives into GBD data, and Vivarium Inputs when preparing GBD data for Vivarium simulations. Some additional specific considerations about the differences between the two options are summarized in the table below.

.. list-table::
   :header-rows: 1

   *  - Topic
      - GBD Shared Functions
      - Vivarium Inputs
   *  - GBD round
      - Able to specify any GBD round/release; useful for noting and comparing major changes between rounds
      - Returns most recent complete GBD round/release only
   *  - DALYs
      - Returns YLD, YLL, DALY estimates
      - Does not return YLD, YLL, or DALY estimates
   *  - Metrics
      - Returns counts, rates, and prevalence estimates
      - Returns rate estimates with the exception of population structure, which are in counts; convenient
   *  - Summary values
      - Can return mean, upper, and lower estimates using get_outputs
      - Returns draw-level estimates only
   *  - Age/sex/location specificity
      - Allows for specification across all these parameters, allows for grouping (via get_outputs) and/or aggregation (via make_custom_aggregates) across demographic categories
      - Returns *all* most-detailed age and sex estimates. Supports only one location at a time.
   *  - Format
      - Generally uses ID numbers that are not human-readable before pairing with get_ids information
      - Converts to human readable entity names rather than IDs and is compatible with formatting required for vivarium Artifacts and simulations

.. note::

   To convert between GBD shared function entity names (such as cause_name) to the entity name in Vivarium inputs, convert the GBD shared function entity name to all lower case and replace spaces with underscores. Python code to do this is shown below:

      :code:`vivarium_inputs_entity_name = gbd_entity_name.lower().replace(' ', '_')`