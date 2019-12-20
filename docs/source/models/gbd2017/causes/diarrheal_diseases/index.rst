.. _2017_cause_diarrhea:

==================
Diarrheal Diseases
==================

Disease Description
-------------------

We follow GBD 2017 and "defined diarrhoeal disease episodes as three
or more loose stools in a 24-hour period." (p. 88 of
[GBD-2017-YLD-Capstone-Appendix-1]_).

.. todo::

   Adapt additional material from GBD capstone and other sources, e.g. [WHO]_,
   [CDC]_, [Wikipedia]_, [GBD-2017-YLD-Capstone-Appendix-1]_

Modeling Diarrheal Diseases in GBD 2017
---------------------------------------

The GBD diarrheal diseases model follows a standard GBD framework, including a 
cause of death (CoD) model and a nonfatal model.

The CoD model estimates the cause-specific mortality rate (CSMR) within the
total population, and a cause fraction. These estimates are based on vital
registration and verabal autopsy data.

The nonfatal model is run in DisMod. The primary inputs are prevalence epi data,
for which self-reported prevalence is the reference definition, and the CSMR
estimates from CodCorrect. Separately, the ratio of mild/moderate/severe
diarrhea is estimated, based on data from a systematic review. These estimates
do not vary by age/sex/location/year, and are applied to the prevalence and
incidence estimates produced by DisMod to produce the three sequela of diarrheal
diseases: mild diarrheal diseases, moderate diarrheal diseases, and severe
diarrheal diseases. In our model, every individual will have the average
severity for their age/sex/location/year. 

The GBD 2017 adjusted for seasonal variation in diarrheal disease, but we have
not attempted to include this variation in Vivarium yet. (p. 89)

There is substantial additional effort in GBD to divide diarrhea burden into the
aetiologies of diarrhea, but we have not included aetiologies in this simple
model.


GBD Hierarchy
-------------

.. image:: DD_cause_hierarchy.svg

Cause Model Diagram
-------------------

.. image:: DD_cause_model.svg


S: **S**\ usceptible to diarrheal diseases

I: **I**\ nfected and currently experiencing a diarrheal disease bout


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
	  - Simulant currently has diarrheal disease
	* - I
	  - **I**\ nfected
	  - Simulant does not currently have diarrheal disease

.. list-table:: State Data
	:widths: 5 10 10 20
	:header-rows: 1
	
	* - State
	  - Measure
	  - Value
	  - Notes
	* - I
	  - prevalence
	  - prevalence_c302
	  -
	* - I
	  - birth prevalence
	  - 0
	  - 
	* - I
	  - excess mortality rate
	  - :math:`\frac{\text{deaths_c302}}{\text{population} \,\times\, \text{prevalence_c302}}`
	  -
	* - I
	  - disability weight
	  - :math:`\displaystyle{\sum_{s\in \text{sequelae_c302}}} \scriptstyle{\text{disability_weight}_s \,\times\, \text{prevalence}_s}`
	  -
	* - S
	  - prevalence
	  - 1-prevalence_c302
	  -
	* - S
	  - birth prevalence
	  - 1
	  - 
	* - S
	  - emr
	  - 0
	  -
	* - S
	  - disability weight
	  - 0
	  -
	* - All
	  - cause-specific mortality rate
	  - :math:`\frac{\text{deaths_c302}}{\text{population}}`
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
	  - :math:`\frac{\text{incidence_rate_c302}}{1-\text{prevalence_c302}}`
	  - We transform incidence to be a rate within the susceptible population.
	* - r
	  - I
	  - S
	  - remission_rate_m1181
	  - Already a rate within with-condition population

	  
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
	* - incidence_rate_c302
	  - como
	  - Incidence of diarrheal disease within the entire population
	  - 
	* - remission_rate_m1181
	  - dismod
	  - Remission of diarrheal disease within the infected population
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



Validation Criteria
-------------------

.. todo::

   Describe tests for model validation.

References
----------

.. [WHO] Diarrheal disease Fact Sheet. World Health Organization, 2 May 2019.
   Retrieved 14 Nov 2019.
   https://www.who.int/news-room/fact-sheets/detail/diarrhoeal-disease

.. [CDC] Diarrhea: Common Illness, Global Killer.
   https://www.cdc.gov/healthywater/global/diarrhea-burden.html

.. [Wikipedia] Diarrhea. From Wikipedia, the Free Encyclopedia.
   Retrieved 14 Nov 2019.
   https://en.wikipedia.org/wiki/Diarrhea

.. [GBD-2017-YLD-Capstone-Appendix-1]
   Supplement to: `GBD 2017 Disease and Injury Incidence and Prevalence
   Collaborators. Global, regional, and national incidence, prevalence, and
   years lived with disability for 354 diseases and injuries for 195 countries
   and territories,    Disease Study 2017. Lancet 2018; 392: 178   (pp. 88-94)

   (Direct links to the YLD Appendix hosted on Lancet.com_ and ScienceDirect_)

.. _Lancet.com: `YLD appendix on Lancet.com`_
.. _ScienceDirect: `YLD appendix on ScienceDirect`_

.. _YLD appendix on Lancet.com: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32279-7/attachment/6db5ab28-cdf3-4009-b10f-b87f9bbdf8a9/mmc1.pdf
.. _YLD appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322797-mmc1.pdf
.. _DOI for YLD Capstone: https://doi.org/10.1016/S0140-6736(18)32279-791990
