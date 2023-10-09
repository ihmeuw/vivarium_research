.. _data:

===================================
Understanding and Pulling GBD Data
===================================

Global Burden of Disease (GBD) Study data is a primary data source for our simulation models. 
Understanding what data is available in the GBD and what modeling processes produced it is a 
difficult task. Some helpful resources for understanding the GBD study are listed below: 

- IHME onboarding trainings
- GBD capstone papers and their methods appendices 
- `The GBD compare tool <https://vizhub.healthdata.org/gbd-compare/>`_, which allows you to visualize GBD estimates
- Your simulation science team members!
- Talking to GBD modelers directly

Pulling GBD Data using *Shared Functions*
-----------------------------------------

IHME central computation maintains functions for accessing GBD data, referred to as "Shared Functions." `The main HUB page for shared functions can be found here <https://hub.ihme.washington.edu/display/SF/Shared+Functions+Home>`_

Note that there is a central computation maintained conda environment that is guarenteed to have the latest version of all GBD shared functions, called :code:`gbd_env`, as described on the Shared Functions HUB page. 

- Note that archived GBD rounds (for example, GBD 2017) may require archived GBD environments to access - see the "Current and Archive GBD environments" subpage for more details.

- Also note that while the :code:`gbd_env` environment is guarenteed to have the most up to date versions of shared functions, it is unlikely to support additional functions you may want to use, which is a downside of using this environment.

.. todo::

   Link to environments page for info on creating your own environment

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

get_draws differs from :code:`db_queries.get_outputs` in that rather than returning a mean estimate and uncertainty interval, it returns draw-level estimates from which a mean value and uncertainty interval can be estimated. 

Additionally, there are certain intermediate values used in GBD that are not available in GBD's final results found in db_queries.get_outputs and can only be pulled using get_draws, such as risk exposures and relative risks.

Unlike :code:`db_queries.get_outputs`, :code:`get_draws` does not automatically aggregate results from the most detailed estimates (for instance: it returns sex-specific values and will not automatically return vaues for sex_id=3/"both" sexes combined).

.. todo::

   Include a table that outlines the different sources and their details

Using Shared Functions
++++++++++++++++++++++++

Handling GBD versioning
^^^^^^^^^^^^^^^^^^^^^^^^

Decomposition (or "decomp") steps are a versioning scheme used in some GBD rounds that allowed updates to GBD results based on iterative updates to certain parts of the computation process. For instance, the first step may be equivalent to the prior GBD round in all aspects except for an updated demographic model; the second step may be equivalent to the prior steps, but with updated risk exposures; and so on. This process allowed GBD researchers to evaluate individual components of the many changes included in a GBD round advancement influenced the main results of the GBD study rather than updating the entire pipeline at once. 

When pulling GBD data from GBD rounds that used decomp step versioning, you are required to specify a :code:`decomp_step` value in your shared functions call. 

Unfortunately, the steps are not necessarily equivalent between GBD rounds. For this reason, we advise consulting the HUB space specific to the GBD round you are interested in, which often contains information about that round's "Decomposition rules."

For reference, the decomposition rules for GBD 2021 can be found here: `https://hub.ihme.washington.edu/display/GBD2020/GBD+2020+Decomposition+analysis`_

Additionally, you may be required to specify a :code:`version_id`, :code:`release_id`, and/or :code:`status` when pulling GBD results from certain GBD rounds. The HUB space for a given GBD round is a good resource on where to obtain this information, but do not hesitate to open a helpdesk ticket to inquire or confirm whether you are using appropriate versioning IDs for you GBD shared functions call.

Applied examples
^^^^^^^^^^^^^^^^^

.. todo::

   Link notebook

Pulling GBD Data using *Vivarium Inputs*
----------------------------------------

Advantages and disadvantages of each approach
----------------------------------------------