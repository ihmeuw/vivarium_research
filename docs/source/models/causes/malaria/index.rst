.. _2020_cause_malaria:

=================
Malaria: GBD 2020
=================

Disease Description
-------------------

Malaria is a life-threatening disease spread to humans by some types of 
mosquitoes. It is mostly found in tropical countries. There are medications 
for prevention and treatment, but these are not always accessible. 

An individual with uncomplicated malaria experiences one to two weeks of persistent fever, 
chills/shivering, sweating, joint pains, and headache. The individual will 
likely be lethargic and feverish, causing loss of daily function during the 
attack. Individuals with an untreated P. falciparum infection may develop 
severe malaria, which includes the symptoms of uncomplicated malaria but may 
also involve swelling, difficulty breathing, unconsciousness, and potentially 
death. Microscopy is considered the gold-standard diagnostic approach for the 
purposes of GBD. The relevant ICD-10 codes are B50-B54. [GBD-2019-Capstone-Appendix-Malaria-2020]_

According to the latest World malaria report, there were 247 million cases of 
malaria in 2021 compared to 245 million cases in 2020. The estimated number of 
malaria deaths stood at 619,000 in 2021 compared to 625,000 in 2020.

Four African countries accounted for just over half of all malaria deaths 
worldwide: Nigeria (31.3%), the Democratic Republic of the Congo (12.6%), 
United Republic of Tanzania (4.1%) and Niger (3.9%). [WHO-Malaria-2020]_

Modeling Malaria in GBD 2020
----------------------------

Malaria is modeled separately for inside versus outside sub-Saharan Africa. 
However, Ethiopia is modeled as outside sub-Saharan Africa, since it exhibits 
epidemiological trends and have data availability/quality more akin to non-African 
settings. 

For countries in Africa, Nigeria in this model, the PfPR surveys by the Malaria 
Atlas Project (MAP) were used to predict malaria for both the non-fatal and fatal 
models. 

For countries outside of Africa, Ethiopia and Pakistan in this project, surveillance 
systems tends to be stronger and so national and subnational case reports are the 
primary data source for the nonfatal model. 

For nonfatal modeling in all countries, these data sources were used to generate pixel-level predictions 
of clinical incidence rate. These were combined with high-resolution gridded population 
data to estimate total cases per pixel-year. These were then aggregated to GBD 
national/subnational areas. Inside sub-Saharan Africa, for countries endemic for P. 
vivax and P. falciparum, we calculated the number of cases due to P. vivax by applying 
the fraction of P. vivax and P. falciparum obtained from WHO and a literature review. 
Outside sub-Saharan Africa we followed the identical procedure for P. vivax and 
P. falciparum. 

For the fatal model, the MAP data was used to estimate the cause specific mortality rate. 
This was then combined with the incidence rate from the nonfatal model in order to 
find estimates for case fatality rate. This in turn was used to find annual mortality 
rates for each location. [GBD-2019-Capstone-Appendix-Malaria-2020]_

A systematic review of malaria severity was conducted, from which simple 
severity splits were obtained and applied across all cases:


.. list-table:: Malaria severity splits
	:widths: 5 50 50 3 3
	:header-rows: 1
	
	* - Severity level
	  - Lay description
	  - Disability weight
	* - Mild
	  - Mild malaria	Has a low fever and mild discomfort but no difficulty with daily activities.	
	  - 0.006 (0.002–0.012)
	* - Moderate
	  - Has a fever and aches and feels weak, which causes some difficulty with daily activities. 
	  - 0.051 (0.032–0.074)
	* - Severe
	  - Has a high fever and pain and feels very weak, which causes great difficulty with daily activities. 
	  - 0.133 (0.088–0.19)


GBD Hierarchy
-------------

.. todo::

   Update image 

.. image:: DD_cause_hierarchy.svg

Cause Model Diagram
-------------------

.. image:: malaria_cause_model.svg


S: **S**\ usceptible to malaria

I: **I**\ nfected and currently experiencing malaria


Model Assumptions and Limitations
---------------------------------

Malaria has been modeled extensively and in very in depth ways. For this model, 
we will not be including any of the causes of malaria (mosquitos) and so this 
model is not appropriate for interventions targetting malaria prevention or treatment 
directly. 

There is evidence that people living in malaria endemic areas do gain immunity over 
their lifetimes. We assume this is represented in prevalence and incidence rates from 
GBD. We do not include in this model any gains in malaria resistance from prior exposure. 

.. todo::

   Add any other relevant items to this section 

Data Description
----------------

.. list-table:: State Definitions
	:widths: 5 10 10
	:header-rows: 1
	
	* - State
	  - State name
	  - Definition
	* - S
	  - **S**\ usceptible
	  - Simulant does not currently have malaria disease
	* - I
	  - **I**\ nfected
	  - Simulant currently has malaria

.. list-table:: State Data
	:widths: 5 10 10 20
	:header-rows: 1
	
	* - State
	  - Measure
	  - Value
	  - Notes
	* - S
	  - prevalence
	  - 1-prevalence_345
	  - 
	* - S
	  - emr
	  - 0
	  -
	* - S
	  - disability weight
	  - 0
	  -
	* - I
	  - prevalence
	  - prevalence_345
	  - 
	* - I
	  - excess mortality rate
	  - :math:`\frac{\text{deaths_c345}}{\text{population} \,\times\, \text{prevalence_345}}`
	  - 
	* - I
	  - disability weight
	  - :math:`\displaystyle{\sum_{s\in \text{sequelae_malaria}}} \scriptstyle{\text{disability_weight}_s \,\times\, \text{prevalence}_s}`
	  - Malaria sequelae are: 121, 122, 123
	* - All
	  - cause-specific mortality rate
	  - :math:`\frac{\text{deaths_c345}}{\text{population}}`
	  -

.. list-table:: Transition Data
	:widths: 10 10 10 10 10
	:header-rows: 1
	
	* - Transition
	  - Source State
	  - Sink State
	  - Value
	  - Notes
	* - i
	  - S
	  - I
	  - :math:`\frac{\text{incidence_rate_c302}}{1-\text{incidence_rate_c302}*(\text{duration_c302} / 365)}`
	  - We transform incidence to be a rate within the susceptible population under the assumption that prevalence ~= incidence * duration.
	* - r
	  - I
	  - S
	  - (-1/time_step)*log(1-time_step/duration_c302)
	  - Where time_step is the simulation time_step in years. See notes below on adjusted duration. Use :code:`np.log()` function. The above is equivalent to 1/adjusted_duration_c302.

	  
.. list-table:: Data Sources and Definitions
	:widths: 1 3 10 10
	:header-rows: 1
	
	* - Value
	  - Source
	  - Description
	  - Notes
	* - prevalence_c302
	  - como
	  - Prevalence of diarrheal diseases
	  -
	* - deaths_c302
	  - codcorrect
	  - Deaths from diarrheal diseases
	  -
	* - duration_c302
	  - (4.3 days; 95% CI: 4.2, 4.4; normal distribution of uncertainty)/365
	  - Mean duration of diarrheal disease episode (in years). Obtained from [Troeger-et-al-2018-Diarrhea-2020]_ and the GBD YLD appendix.
	  - This value should not vary by age group
	* - adjusted_duration_c302
	  - 4.04485 (95% CI: 3.94472, 4.144975), assume normal distribution of uncertainty
	  - Average duration of a diarrheal disease episode in days among children under five (defined in the note column) TRANSFORMED to accomodate a short timestep of 0.5 days, `as discussed in this slack thread <https://ihme.slack.com/archives/C018BLX2JKT/p1646183763054739>`_. See the note below for more information.
	  - This value does not necessarily need to be stored -- included here for reference.
	* - incidence_rate_c302
	  - como
	  - Incidence of diarrheal disease within the entire population
	  - 
	* - population
	  - demography
	  - Mid-year population for given age/sex/year/location
	  -
	* - sequelae_c302
	  - gbd_mapping
	  - List of 4 sequelae for diarrheal diseases
	  - Note Guillain-Barre due to diarrheal diseases is included in sequelae.
	* - prevalence_s{`sid`}
 	  - como
	  - Prevalence of sequela with id `sid`
	  -
	* - disability_weight_s{`sid`}
	  - YLD appendix
	  - Disability weight of sequela with id `sid`
	  - 
.. list-table:: Restrictions
	:widths: 15 15 20
	:header-rows: 1

	* - Restriction type
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
	  - Early neonatal
	  - age_group_id = 2; [0-7 days)
	* - YLL age group end
	  - 95 plus
	  - age_group_id = 235; 95 years +
	* - YLD age group start
	  - Early neonatal
	  - age_group_id = 2; [0-7 days)
	* - YLD age group end
	  - 95 plus
	  - age_group_id = 235; 95 years +


Validation Criteria
-------------------

.. todo::

   Describe tests for model validation.


References
----------

.. [GBD-2019-Capstone-Appendix-Malaria-2020]
  Appendix to: `GBD 2019 Diseases and Injuries Collaborators. Global burden of
  369 diseases and injuries in 204 countries and territories, 1990–2019: a 
  systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 
  17 Oct 2020;396:1204-1222` 

.. [WHO-Malaria-2020] Malaria Fact Sheet. World Health Organization.
   Retrieved 14 July 2023.
   https://www.who.int/news-room/fact-sheets/detail/malaria
