.. _2019_cause_diarrhea:

==================
Diarrheal Diseases
==================

Disease Description
-------------------




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

I: **I**\ nfected and currently experiencing a diarrheal diseas