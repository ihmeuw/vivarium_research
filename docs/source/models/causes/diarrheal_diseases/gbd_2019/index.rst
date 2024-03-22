.. _2019_cause_diarrhea:

============================
Diarrheal Diseases: GBD 2019
============================

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
+++++++++++++

.. image:: DD_cause_hierarchy.svg

Vivarium Modeling Strategy
--------------------------

Cause Model Diagram
+++++++++++++++++++

.. image:: DD_cause_model.svg


S: **S**\ usceptible to diarrheal diseases

I: **I**\ nfected and currently experiencing a diarrheal disease bout

Model Assumptions and Limitations
+++++++++++++++++++++++++++++++++

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


Data Descriptions
+++++++++++++++++

.. list-table:: State Definitions
	:widths: 5 10 10
	:header-rows: 1
	
	* - State
	  - State name
	  - Definition
	* - S
	  - **S**\ usceptible
	  - Simulant does not currently have diarrheal disease
	* - I
	  - **I**\ nfected
	  - Simulant currently has diarrheal disease

.. list-table:: State Data
	:widths: 5 10 10 20
	:header-rows: 1
	
	* - State
	  - Measure
	  - Value
	  - Notes
	* - I
	  - prevalence
	  - **For early neonatal age group:** (birth_prevalence_I + (incidence_rate_c302 * duration_c302))/2. **For all other age groups:** incidence_rate_c302 * duration_c302
	  - Early neonatal age group exception due to non-steady state dynamics in this age group given birth prevalence of zero causes increasing prevalence within age group and short duration of age group. `Citation on these dynamics and approximations here for reference <https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3465772/>`_.
	* - I
	  - birth prevalence
	  - 0
	  - 
	* - I
	  - excess mortality rate
	  - :math:`\frac{\text{deaths_c302}}{\text{population} \,\times\, \text{prevalence_I}}`
	  - Use prevalence calculated for the I state in the row above
	* - I
	  - disability weight
	  - :math:`\displaystyle{\sum_{s\in \text{sequelae_c302}}} \scriptstyle{\text{disability_weight}_s \,\times\, \text{prevalence}_s}`
	  -
	* - S
	  - prevalence
	  - 1-prevalence_I
	  - Use prevalence calculated for the I state in the first row
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
	  - :math:`\frac{\text{incidence_rate_c302}}{1-\text{incidence_rate_c302}*(\text{duration_c302} / 365)}`
	  - We transform incidence to be a rate within the susceptible population under the assumption that prevalence ~= incidence * duration.
	* - r: USED IN CIFF AND IV IRON SIMULATIONS AS WELL AS MODELS 1-11 OF NUTRITION OPTIMIZATION SIMULATION
	  - I
	  - S
	  - (-1/time_step)*log(1-time_step/duration_c302)
	  - Where time_step is the simulation time_step in years. See notes below on adjusted duration. Use :code:`np.log()` function. The above is equivalent to 1/adjusted_duration_c302.
	*	- r: FOR USE IN NUTRITION OPTIMIZATION SIMULATION AFTER IMPLEMENTATION OF VARIABLE TIMESTEPS
		- I
		- S
		- 1/duration_c302
		- 

.. note::

	We are using a custom remission rate for diarrheal diseases based on the estimated duration of disease because after scaling to the total population using the estimated prevalence of diarrheal diseases, the remission rate was greater than the incidence rate for children under five in Ethiopia, which is implausible. We assume an average duration of a diarrheal disease episode of 4.3 days, as estimated by [Troeger-et-al-2018-Diarrhea]_. 
	  
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
	  - Mean duration of diarrheal disease episode (in years). Obtained from [Troeger-et-al-2018-Diarrhea]_ and the GBD YLD appendix.
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

.. note::

	We implemented a remission rate of diarrheal diseases equal to 1/the average duration of diarrheal diseases = 1/4.3 days. However, the remission rate output from our simulation was slower than the artifact value, approximating 1/4.55 days. 

	As identified by Nathaniel, this appeared to be due to the fact that the product of the remission rate r=1/4.3 times the time step dt=0.5 was too large for the approximation 1-exp(-r*dt) ~= r*dt to be sufficiently good for the rates to match.

	What's going on is that we're thinking of the duration of diarrhea as a continuous random variable, exponentially distributed with rate r=1/4.3, but in Vivarium this random variable gets discretized into a geometric random variable, I believe with parameter p=1-exp(-r*dt) . The mean of the exponential random variable is 1/r = 4.3 days, whereas the mean of the geometric random variable, converted from time steps back to days, is dt/p ~= 4.55 days . This same issue will arise whenever we have a transition rate that is large relative to the simulation time step. You could always solve it by making the time steps even smaller, but of course that adds a lot of computation time.

	To deal with this, solved for the mean rate (in days) to input to vivarium that would produce the desired output of the a remission rate equal to 1/4.3 days using the following equation for r'

	.. math::

		r' = (-1/dt)*log(1-dt*r)

			= (-1/0.5)*log(1-0.5/4.3)

			= 0.24722791193435328

		1 / r' = 4.044850729740949 days

	We then also solved for the upper and lower bound estimates using the same methodology.

	See the :ref:`Choosing an Appropriate Time Step page <vivarium_best_practices_time_steps>` page for more information.

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
	  - Post neonatal (age group ID 4, 1 month to 1 year)
	  - GBD age group start is early neonatal (age group ID 2, 0-6 days)
	* - YLL age group end
	  - 95 plus
	  - age_group_id = 235; 95 years +
	* - YLD age group start
	  - Post neonatal (age group ID 4, 1 month to 1 year)
	  - GBD age group start is early neonatal (age group ID 2, 0-6 days)
	* - YLD age group end
	  - 95 plus
	  - age_group_id = 235; 95 years +

.. note:: 

	**A note on the diarrheal diseases age start parameter:**

		This Vivarium modeling strategy sets the diarrheal diseases cause model age start to the post neonatal age group (1 month to 1 year) despite the GBD age start parameter being the early neonatal age group (0 to 6 days). We exclude the early and late neonatal age groups from the diarrheal diseases cause model as a strategy that allows us to increase the timestep of our cause models.

		The rationale behind this modeling decision is related to the *Relationship between timesteps and modeled rates in Vivarium* as described on the :ref:`Choosing an Appropriate Time Step page <vivarium_best_practices_time_steps>` that is exacerbated by the inclusion of the :ref:`low birth weight and short gestation risk factor <2019_risk_effect_lbwsg>` in the model. Essentially, because the LBWSG risk factor affects diarrheal diseases excess mortality rates in our models during the neonatal age groups and the LBWSG relative risk values for the highest risk categories are quite large (up to 700!), the inclusion of the LBWSG risk effects on diarrheal diseases causes individual-level diarrheal diseases excess mortality rates to be too large to accurately approximate in our models without a very small timestep, which leads to underestimation of neonatal diarrheal diseases mortality rates with a timestep on the order of 0.5 days.

		Therefore, we employ the following strategy:

			- Model the diarrheal diseases SI cause model as described in this document for ages older than late neonatal only, and

			- Include diarrheal diseases as an **unmodeled** cause that is **affected** by the LBWSG risk factor (see the :ref:`LBSWG risk effects page <2019_risk_effect_lbwsg>` for details). This will allow us to model diarrheal diseases *CSMR* rather than *EMR* among the neonatal age groups, which is lower in magnitude and therefore less easier to approximate at larger simulation timesteps. Notably, this strategy does not allow us to model years lived with disability due to diarrheal diseases among the neonatal age groups.

		This strategy allowed us to increase the simulation timestep to 4 days and still meet verification criteria.

Verification and Validation Criteria
++++++++++++++++++++++++++++++++++++

**Verification:**

- We should replicate the following parameters:

	- GBD incidence rates among ages older than the late neonatal age group

	- The custom input remission rate (~1/4.3 days) among ages older than the late neonatal age group

	- GBD cause-specific mortality rates among all modeled ages

**Validation:**

- We should compare our estimates of diarrheal diseases prevalence to GBD estimates of diarrheal diseases prevalence (among age groups greater than the late neonatal age group). Our modeled estimates may deviate from the GBD estimates for this parameter given that we have chosen to prioritize estimates of incident and fatal cases of diarrheal diseases rather than prevalent cases.

References
----------

.. [GBD-2019-Capstone-Appendix-Diarrhea]
  Appendix to: `GBD 2019 Diseases and Injuries Collaborators. Global burden of
  369 diseases and injuries in 204 countries and territories, 1990–2019: a 
  systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 
  17 Oct 2020;396:1204-1222` 

.. [Troeger-et-al-2018-Diarrhea]
   Troeger C, Colombara DV, Rao PC, Khalil IA, Brown A, Brewer TG, Guerrant RL, Houpt ER, Kotloff KL, Misra K, Petri WA Jr, Platts-Mills J, Riddle MS, Swartz SJ, Forouzanfar MH, Reiner RC Jr, Hay SI, Mokdad AH. Global disability-adjusted life-year estimates of long-term health burden and undernutrition attributable to diarrhoeal diseases in children younger than 5 years. Lancet Glob Health. 2018 Mar;6(3):e255-e269. doi: 10.1016/S2214-109X(18)30045-7. PMID: 29433665; PMCID: PMC5861379. `Troeger et al 2018 available here <https://pubmed.ncbi.nlm.nih.gov/29433665/>`_

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
