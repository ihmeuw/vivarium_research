.. _2017_cause_neonatal_other:

========================
Other Neonatal Disorders
========================

Cause description
-----------------

*Other neonatal disorders* is a label defined by GBD, which refers to a
specific collection of causes of neonatal health loss.

This collection of causes is defined by a collection of ICD 9 and 10 codes. We 
list the ICD 10 codes below. The complete lists can be found at:

https://hub.ihme.washington.edu/pages/viewpage.action?spaceKey=DT&title=GBD+Cause+Map+and+Cause+List+for+Keywording#tab-GBD+2017

Notably, GBD estimates fatal and nonfatal burden separately, and defines 
*other neonatal disorders* differently in the nonfatal and fatal models. In 
particular, they differ on codes P04, P05, and P07:

.. csv-table:: ICD Codes
	:file: ICD_codes.csv
	:widths: 1, 10, 20, 1, 1
	:header-rows: 1


It is important to note that "Other neonatal disorders" is precisely the ICD
codes listed above (plus their ICD 9 counterparts), and does not refer to "all 
causes of neonatal health loss excluded from other cause models within the GBD 
framework".


Modeling Other Neonatal Disorders in GBD 2017
---------------------------------------------

Fatal model
+++++++++++
*Other neonatal disorders* contribute to both fatal and nonfatal health burden. 
The fatal model is a standard CoDEM model, which runs on vital registration and 
surveillance data to estimate the proportion of deaths coded to the "neonatal 
other" ICD codes, listed above.

Within the context of GBD, "neonatal disorders comprises five causes: preterm 
birth complications, neonatal encephalopathy and birth trauma, neonatal sepsis 
and other infections, hemolytic disease and neonatal jaundice, and other 
neonatal disorders. These five CoDEM models are run, in addition to a "parent" 
model, to which the children models are all squeezed.

Nonfatal estimates
++++++++++++++++++
The nonfatal burden of "other neonatal disorders" is not explicitly modeled by 
GBD. We here include the complete content of the "Other neonatal disorders" 
writeup in the 2017 [YLD]_ Appendix:

	In addition to the neonatal disorders described above, there are many diverse
	types of neonatal disorders with a range of severities and associated sequelae.
	Because these other neonatal disorders are diverse in their underlying causes
	and risk factors as well as in their associated health outcomes, modelling them
	together in a DisMod-MR model would not produce reliable estimates of prevalence
	or excess mortality. Instead, we calculated the YLDs caused by other neonatal
	disorders directly using a YLD/YLL ratio.

	We calculated the ratio of YLDs to YLLs across the specified neonatal disorders
	for which non-fatal outcomes were modelled, using YLL estimates from the GBD
	2017 cause of death (CoD) analysis. We then multiplied this YLD/YLL ratio by the
	YLL estimates for other chronic respiratory diseases from the GBD 2017 CoD
	analysis, providing us with an estimate of the YLDs associated with other
	neonatal disorders.

Model Assumptions and Limitations
---------------------------------

.. todo::
	Finalize this section once we've come to conclusion on a modeling strategy

The lack of a nonfatal model within the GBD framework poses a significant 
challenge to the project of incorporating neonatal disorders, and thus 
interventions with impacts on neonatal disorders, into a vivarium simulation.

To model "other neonatal disorders" within the vivarium framework, we would need 
to know:


* **prevalence**, in order to correctly initialize the right proportion of the population with other neonatal disorders;

* **birth prevalence**, in order to be able to correctly initialize new simulants throughout the simulation;

* **incidence**, in order for susceptible simulants to appropriately become prevalent cases;

* **remission**, in order for prevalent cases to appropriately remit;

* **excess mortality rate** (EMR), in order to appropriately calculate YLLs attributable to other neonatal disorers

We have EMR from GBD's fatal other neonatal model. Then, most of the conditions 
encapsulted by neonatal other have no incidence (other than birth prevalence) or 
remission, so we can reasonably model these conditions to have niether incidence 
nor remission.

However, **GBD does not produce estimates of birth prevalence or prevalence of 
other neonatal disorders**. As other neonatal YLDs are calculated as a ratio 
based on other neonatal YLLs, this also means that other neonatal disorders 
also lacks any associated disability weights.

*If we could determine birth prevalence*, we could then concievably use EMR to 
calculate prevalence. Then, we should be able to back-calculate the correct 
disability weights per age/sex/location/year to get back the YLDs estimated by 
GBD, as YLDs for a given individual are calculated by multiplying {years lived 
with disability x} by {disability weight associated with disability x}.

However, the issue of birth prevalence remains. As the "other neonatal" 
conditions are so heterogenous, our preliminary efforts to find data have not 
returned anything useable.

We note that if we were to run our model with a too-high birth prevalence, 
"other neonatal disorders" would fill a disproportionatley large ratio of other 
neonatal disorders, and we would choose a set of too-low disability weights.

If we were to run our model with a too-low birth prevalence, "other neonatal 
disorders" would fill too small a proportion of other neonatal disorders, and 
we would choose an set of inaccurately high disability weights. In both of these 
scenarios this could significantly skew calculation of YLDs, depending on how 
incorrect our birth prevalence inputs are.

.. todo::
	Include Lu's calculation of % of avoidable burden that is attributed to 
	other neonatal


.. todo::
   Describe cause model

Restrictions
------------

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
	  - Post neonatal
	  - age_group_id = 4; [28 days-1 year)
	* - YLD age group start
	  - Early neonatal
	  - age_group_id = 2; [0-7 days)
	* - YLD age group end
	  - 95 plus
	  - age_group_id = 235; 95 years +

References
----------
..	[YLD] 2017 YLD appendix
	https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322037-mmc1.pdf

