.. _costing_nutrition_optimization:


..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  ---------------------

  Section Level 2 (#.#)
  +++++++++++++++++++++

  Section Level 3 (#.#.#)
  ~~~~~~~~~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.


Nutrition Optimization Costing Analysis
=======================================

.. sectnum::
  :depth: 3

.. contents::
  :local:
  :depth: 2

For our Nutrition Optimization (NO) project (see :ref:`2021_concept_model_vivarium_nutrition_optimization` for more details),
we conducted an economic analysis to estimate the costs associated with implementing a suite of maternal and child nutrition interventions. 
This page provides an overview of the costing methods used. 

Developing robust estimates for intervention costing is complex and there is not a gold standard approach. 
In an effort to expand costing methodology beyond the assumption that programmatic intervention costs scale proportionately to intervention product costs 
(the default assumption utilized in the Optima Nutrition (Pearson et al., 2018) model) when possible, 
we conducted a literature review of both peer-reviewed and grey literature of costing analyses for our interventions of interest. 
Our review did not yield results for top-down costing analyses of in-country implementations of our interventions, 
which may be the most applicable costing approach for our analysis. 
We found disparate costing studies that followed different methodologies and/or assumptions across studies and interventions. 
Therefore, in an effort to standardize cost ingredients across these different interventions and data sources, 
we considered four cost categories: product costs, service costs, distribution costs and other costs. 
The “other costs” category included administrative and/or other programmatic costs.  

We selected cost estimates for each intervention/costing category according to which available estimate followed methodology and assumptions that were most applicable to our modeled intervention programs as described in the methods section. 
We relied on assumptions in the absence of available data sources. 
Selected values and their sources for each intervention and costing category are summarized below. 
We converted all costs to 2023 USD using the CPI Inflation Calculator (CPI Inflation Calculator, n.d.).  

Product Costs
-------------

Product costs were found in the UNICEF Supply Catalogue for IFA, MMN, BEP, and SQ-LNS (UNICEF Supply Catalogue, n.d.). 
These values were found in November of 2023 – these product costs are dynamic and might change prior to publication due to change in demand or world events. 
The product cost for BEP is assumed to also include the cost of MMN, as we assume all people receiving BEP will also receive MMN. 
Antenatal products were assumed to be taken daily for 6 months during pregnancy. 
SQ-LNS was assumed to be taken daily for 12 months of supplementation. 

Product costs for SAM and MAM treatment interventions were derived from the ComPAS trial (Bailey et al., 2020) in order to align cost estimates with the same product dosing amounts used in our effectiveness/time-to-recovery estimates. 
We assumed there were no product costs associated with CMAM screenings.  

Service Costs 
-------------

Service costs for IFA, MMN and BEP represented the time spent in antenatal care visits specifically related to these interventions. 
For IFA and MMN, this was assumed to be 1/3 of the time at each of 4 antenatal care visits, or 4/3 the total cost of a single antenatal care visit.
For the cost of an antenatal care visit, we used the GBD estimates for outpatient visit costing (Moses et al., 2019).  

For BEP, we assumed double the time in antenatal care visits as was calculated for IFA and MMN. 
We assumed this additional time required for the BEP intervention as it entails counselling on both BEP and MMN products and would additionally require assessment of nourishment status via body mass index to determine eligibility for BEP.  

For the child interventions, we assumed the service cost for CMAM screenings was shared across available interventions. 
It was assumed that the CMAM screening cost is the same regardless of how many or which child interventions are available at a given time. 
The cost of a single CMAM screening was derived from (Isanaka et al., 2019). This cost was incurred for every child screened, regardless of if they received an intervention following screening. 
As we separated CMAM out to be a separate service, it does not have any other cost types associated with it. 
These are assumed to be counted under other child interventions.  

Additionally, for children found to be malnourished, there were additional service costs associated with treatment for malnutrition. 
For the MAM treatment intervention, these costs were also derived from (Isanaka et al., 2019). 
For the SAM treatment intervention, these costs were the weighted average of in-patient and out-patient treatment. 
The cost of both in-patient and out-patient treatment, along with the assumption that 11.6% of children will require in-patient care was derived from (Tekeste et al., 2012).  

We assumed that the SQ-LNS intervention does not have any service costs. 
Instead, the costs of administering SQ-LNS were assumed to be covered by CMAM screenings and the other cost category for the SQ-LNS intervention. 
This was due to difficulties in separating out cost “ingredients” from the available studies.   

Distribution Costs  
------------------

For the SQ-LNS, BEP, IFA and MMN interventions, distribution costs are assumed to be 20% of the product cost. 
This value was derived from a review published in a technical brief authored by the Working Group on Cost and Cost-effectiveness of the SQ-LNS Task Force (SQ-LNS Technical Brief on Costs | Small-Quantity Lipid-Based Nutrient Supplements, n.d.). 
To obtain the 20% figure used in our model, we calculated the source-specific cost spent on product procurement as a proportion of product costs as (“total product procurement cost” – “product only (SQ-LNS) cost”) / “product only (SQ-LNS) cost” and averaged the result across all sources included in the brief. 
Since BEP is a similar product to SQ-LNS, it was assumed that it would have a similar distribution cost burden. 
For internal consistency and lack of additional data sources to inform otherwise, this ratio was also used for IFA and MMN.  

Distribution costs for SAM and MAM treatment interventions were derived from the ComPAS trial, 
as we generally tried to follow this protocol and data when it was available (Bailey et al., 2020).  

Other Costs 
-----------

For IFA, MMN and BEP, the other costs were assumed to be 13% of the product cost. 
This assumption was based on the LiST tool estimates (Walker et al., 2013) in the absence of data to inform direct estimates of such costs.  

For SQ-LNS intervention, the other costs were derived from the technical brief on costs from the SQ-LNS working group (SQ-LNS Technical Brief on Costs | Small-Quantity Lipid-Based Nutrient Supplements, n.d.). 
We averaged values for the “total non-product program costs" across sources included in the technical brief for use in our model. 
We subtracted our assumed cost of a CMAM screening from the resulting average cost from the technical brief to avoid double counting such expenses as we accounted for them elsewhere in our analysis.  

For the MAM and SAM treatment interventions, the other costs were derived from Isanaka et al. (2019). 
The Isanaka trial is for MAM treatment, not SAM treatment. 
However, we felt that the programmatic costs would be similar for both products, and there was better data availability for the MAM treatment intervention.  

 