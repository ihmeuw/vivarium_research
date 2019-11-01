.. _2017_cause_models:

============
Cause Models in GBD
============

What is a cause?
----------------
A cause in the GBD is something that is responsible for disease or disability. 
Some examples could be infectious diseases like malaria or diarrhea. 
They could also be chronic diseases like diabetes or cancer. Maternal hemorrhage
is a cause as is lower back pain. 

Causes in the GBD are organized in a hierarchy where at every level of that hierarchy
causes of death or disease are mutually exclusive and collectively exhaustive. 

- All causes

  - Injuries, communicable diseases, non-communicable diseases

    - ... down to the most detailed level

Some causes are only associated with non-fatal outcomes, such as lower back pain.

Measures for causes include:  
Deaths, incidence, prevalence, YLDs, YLLs, and DALYs
	
Modeling causes of death
------------------------

.. image:: causes/fatal_flowchart.png
   :width: 600

- Most causes use a centrally-maintained Bayesian ensemble model (CODEm)

	- Bayesian: estimates based on probabilities
	- Ensemble: combines many unique submodels into a final model

- Input data into CODEm are managed by a single team (Mohsen Naghavi) and undergo a series of data adjustments before modeling

	- Vital registration, verbal autopsy, surveillance, sibling history, more sources
	
	- Can be pulled using the central function get_cod_data if cause_id known

- Output from CODEm are age/sex/year/location specific cause specific mortality rates and cause fractions (percent of all deaths)

- Outputs from CODEm are draws (realizations of model predictions)

	- Not a good place to pull CSMR or CF draws though as these are not final results (continued on next slide)

	