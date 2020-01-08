.. _2017_cause_diarrhea:

==================
Diarrheal Diseases
==================

Disease Description
-------------------

We follow GBD 2017 and "defined diarrhoeal disease episodes as three or more 
loose stools in a 24-hour period." (p. 88 of 
[GBD-2017-YLD-Capstone-Appendix-1]_).

Diarrhea has various etiologies, with infectious diarrhea accounting for the 
vast majority of global diarrheal disease burden. The top pathogens responsible 
for diarrhea include norovirus, rotavirus, E. Coli, Camplyobacter, and 
Salmonella. Bacterial infections, and specifically species of Shigella, 
account for the majority of bloody diarrhea.

Infection most commonly occurs via feces-contamined water, and can also spread 
via contamined food and person-to-person contact. ([WHO]_)

The global prevalence of diarrhea thus varies considerably accoring to resource 
access. In particular, resource-limited countries have a "baseline frequency... 
superimposed with epidemic cases of diarrhea" ([UpToDate_1]_). The top risk 
factors for diarrheal diseases thus include crowding (such as living in refugee 
camps) and poor sanitation, in addition to immune system-compromising conditions, 
such as living with HIV.

The most significant outcomes of a nonfatal diarrhea episode are dehydration and 
the loss of nutrition. In particular, in low-income countries, the high 
prevalence of diarrhea is a major cause of child malnutrition ([WHO]_), which 
in turn makes such children more susceptible to future diarrheal episodes and 
other negative sequelae.

The WHO-recommended measures for diarrhea prevention include:
	- Access to safe drinking water;
	- Use of improved sanitation;
	- Hand washing with soap;
	- Exclusive breastfeeding for the first six months of life;
	- Good personal and food hygiene;
	- Health education about how infections spread; and
	- Rotavirus vaccination.

Noninfectious diarrhea etiologies are far less common, but are more likely among 
chronic cases of diarrhea. Causes of noninfectious diarrhea include ischemic 
colitis, inflammatory bowl disease, among others ([UpToDate_2]_).



Modeling Diarrheal Diseases in GBD 2017
---------------------------------------




According to the [GBD-2017-YLD-Capstone-Appendix-1]_, "There are no
major modelling updates from GBD 2016," (p. 93) and "self-reported
prevalence is the reference category" (p. 88).

.. todo::

   Add more context regarding GBD 2016 model for people who are not familiar.

Regarding the duration of a bout of diarrhea, "the mean duration was
the duration in days, an average of 4.3 (4.2 4.4)". (p. 89, based on a
paper referenced there).
For GBD 2017, the remission period was modeled as 5 days.
Since this assumption gets into the DisMod
model, we will use the remission rate that comes from DisMod.

The GBD 2017 adjusted for seasonal variation in diarrheal disease, but
we have not attempted to include this variation in Vivarium yet. (p. 89)

There is substantial additional effort in GBD to divide diarrhea
burden into the aetiologies of diarrhea, but we have not included
aetiologies in this simple model.  The non-fatal model is severity
split based. In our model, every individual will have the average
severity for their age/sex/location/year.

.. todo::

   Add relevant detail about diarrheal diseases modeling process from
   the CoD Appendix.

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

.. [WHO] Diarrheal disease Fact Sheet. World Health Organization, 2 May 2019.
   Retrieved 14 Nov 2019.
   https://www.who.int/news-room/fact-sheets/detail/diarrhoeal-disease

..	[UpToDate_1] Approach to the adult with acute diarrhea in resource-limited countries
	Retrieved 26 Dec 2019.
	https://www.uptodate.com/contents/approach-to-the-adult-with-acute-diarrhea-in-resource-limited-countries

..	[UpToDate_2] Approach to the adult with acute diarrhea in resource-rich countries
	Retrieved 26 Dec 2019.
	https://www.uptodate.com/contents/approach-to-the-adult-with-acute-diarrhea-in-resource-rich-settings

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
