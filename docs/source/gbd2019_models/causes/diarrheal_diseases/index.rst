.. _2019_cause_diarrhea:

==================
Diarrheal Diseases
==================

Disease Description
-------------------

Diarrhea is commonly defined as three or more loose stools in a 24-hour 
period. [GBD-2019-Capstone-Appendix-Diarrhea]_

Diarrhea has various etiologies, with infectious diarrhea accounting for the 
vast majority of global diarrheal disease burden. The top pathogens responsible 
for diarrhea include norovirus, rotavirus, E. Coli, Camplyobacter, and 
Salmonella. Bacterial infections, and specifically species of Shigella, 
account for the majority of bloody diarrhea.

Infection most commonly occurs via feces-contamined water, and can also spread 
via contamined food and person-to-person contact. ([WHO-Diarrhea]_)

The global prevalence of diarrhea thus varies considerably accoring to resource 
access. In particular, resource-limited countries have a "baseline frequency... 
superimposed with epidemic cases of diarrhea" ([UpToDate_1-Diarrhea]_). The top risk 
factors for diarrheal diseases thus include crowding (such as living in refugee 
camps) and poor sanitation, in addition to immune system-compromising conditions, 
such as living with HIV.

The most significant outcomes of a nonfatal diarrhea episode are dehydration and 
the loss of nutrition. In particular, in low-income countries, the high 
prevalence of diarrhea is a major cause of child malnutrition ([WHO-Diarrhea]_), which 
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
colitis, inflammatory bowl disease, among others ([UpToDate_2-Diarrhea]_).

Other info: [CDC-Diarrhea]_, [Wikipedia-Diarrhea]_.


Modeling Diarrheal Diseases in GBD 2019
---------------------------------------

The GBD diarrheal diseases model includes a cause of death (CoD) model and a 
nonfatal model, each of which is split into diarrhea etiologies.

The CoD model used data from vital registration systems, surveillance systems, 
and verbal autopsy. Deaths were modelled separately for males and females and 
for under 5 year olds vs. the rest of the population using CODEm models with 
country-level covariates.

The nonfatal model used diarrhea incidence and prevalence data in community and 
hospital settings in addition to hospital and claims data tagged ICD9 codes 
001-009.9 and ICD10 codes A00-A09. All hospital and claims data was converted 
to prevalence (or point prevalence) data using a mean duration of 4.3 (4.2-4.4) 
days. Data was then adjusted for seasonality, and all non-reference case data 
was adjusted to fit the reference category of "community-based diarrhea 
episodes". Newly in GBD 2019, EMR priors were estimated using MR-BRT instad of 
DisMod. Finally, this data is fed into a DisMod model.

A systematic review of diarrhea severity was conducted, from which simple 
severity splits were obtained and applied across all cases:

.. list-table:: Diarrhea severity splits
	:widths: 5 50 50 3 3
	:header-rows: 1
	
	* - Severity level
	  - Definition
	  - Lay description
	  - Disability weight
	  - Proporiton
	* - Mild
	  - Diarrhea cases that did not seek medical care
	  - Has diarrhea defined as 3 or more loose stools in a 24-hour period with no dehydration
	  - 0.074 (0.049-0.104)
	  - 64.8%
	* - Moderate
	  - Diarrhea cases that sought medical care but did not have severe dehydration or bloody stool
	  - Has diarrhea defined as 3 or more loose stools in a 24-hour period with painful cramps and feeling thirsty and any dehydration
	  - 0.188 (0.125-0.264)
	  - 28.9%
	* - Severe
	  - Diarrhea cases that sought medical care with severe dehydration or bloody stool
	  - Has diarrhea defined as 3 or more loose stools in a 24-hour period with painful cramps and is very thirsty or feels nauseated or tired and/or severely dehydrated
	  - 0.247 (0.164-0.348)
	  - 6.9%

GBD then modelled diarrhea etiologies, for which PAFs of fatal and nonfatal 
diarrhea were calculated. Etiologies include enteric adenovirus, *Aeromonas*, 
*Entamoeba histolytica* (amoebiasis), *Campylobacter*, *Cryptosporidium*, 
typical enteropathogenic *Escherichia coli* (t-EPEC), enterotoxigenic 
*Escherichia coli* (ETEC), norovirus, non-typhoidal salmonella infections, 
rotavirus, *Shigella*, *Vibrio cholerae* and *Clostridium difficile*. 

Excluding *Vibrio cholerae* and *Clostridium difficile*, all etiologies were 
modelled by calculating the proportion of severe diarrhea cases that tested 
positive for each etiology, with hospitalized diarrhea cases serving as a proxy 
for severe cases. Note that as pathogens can co-infect, this yields PAFs that 
sum to greater than 100% of diarrhea cases. *Vibrio cholerae* and 
*Clostridium difficile* cases were each modelled directly using DisMod.


GBD Hierarchy
-------------

.. image:: DD_cause_hierarchy.svg

Cause Model Diagram
-------------------

.. image:: DD_cause_model.svg


S: **S**\ usceptible to diarrheal diseases

I: **I**\ nfected and currently experiencing a diarrheal disease bout


Model Assumptions and Limitations
---------------------------------

Note that GBD has done extensive work to divide up diarrhea cases into their
respective etiologies. For now, we omit this complexity. Further, GBD 
incorporates seasonality into the diarrhea model. Our model currently does not.

Regarding severity: the GBD model splits nonfatal diarrhea estimates into 
three severity categories, using a ratio applied across all estimates. This 
ratio might be expected to vary from location to location, or perhaps across 
time, and thus we assume this is a limitation of the GBD model.

.. todo::

   Verify the simple severity split approach is indeed a limitation. I.e., the 
   verify that the modelers expect a more complex pattern.


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
	  - :math:`\frac{\text{incidence_rate_c302}}{1-\text{incidence_c302}*\text{duration_c302}}`
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

.. [GBD-2019-Capstone-Appendix-Diarrhea]
  Appendix to: `GBD 2019 Diseases and Injuries Collaborators. Global burden of
  369 diseases and injuries in 204 countries and territories, 1990–2019: a 
  systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 
  17 Oct 2020;396:1204-1222` 

.. [WHO-Diarrhea] Diarrheal disease Fact Sheet. World Health Organization, 2 May 2019.
   Retrieved 14 Nov 2019.
   https://www.who.int/news-room/fact-sheets/detail/diarrhoeal-disease

..	[UpToDate_1-Diarrhea] Approach to the adult with acute diarrhea in resource-limited countries
	Retrieved 26 Dec 2019.
	https://www.uptodate.com/contents/approach-to-the-adult-with-acute-diarrhea-in-resource-limited-countries

..	[UpToDate_2-Diarrhea] Approach to the adult with acute diarrhea in resource-rich countries
	Retrieved 26 Dec 2019.
	https://www.uptodate.com/contents/approach-to-the-adult-with-acute-diarrhea-in-resource-rich-settings

.. [CDC-Diarrhea] Diarrhea: Common Illness, Global Killer.
   https://www.cdc.gov/healthywater/global/diarrhea-burden.html

.. [Wikipedia-Diarrhea] Diarrhea. From Wikipedia, the Free Encyclopedia.
   Retrieved 14 Nov 2019.
   https://en.wikipedia.org/wiki/Diarrhea