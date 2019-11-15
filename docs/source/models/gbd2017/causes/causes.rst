.. _2017_cause_models:

============
Cause Models in GBD
============

What is a cause?
----------------
A cause in the GBD is something that is responsible for death, disease, or disability. 
Some examples could be infectious diseases like malaria or diarrhea. 
They could also be chronic diseases like diabetes or cancer. The could be things
that people are born with like congenital disorders or happen during childbirth like maternal hemorrhage.
Some causes are only associated with non-fatal outcomes, such as lower back pain.
Many different things cause health loss and 
this variation is reflected in the many ways that GBD models them. 

Causes in the GBD are organized in a hierarchy where at every level of that hierarchy
causes of death or disease are mutually exclusive and collectively exhaustive. 

- All causes

  - Injuries, communicable diseases, non-communicable diseases

    - ... down to the most detailed level

Measures for causes include:  
Deaths, incidence, prevalence, YLDs, YLLs, and DALYs

And metrics for causes include:  
Counts, rates, and fractions

Modeling causes of death
------------------------

.. image:: fatal_flowchart.png
   :width: 600

**Modeling approach** 

Most causes are estimated using a centrally-maintained Bayesian ensemble modeling tool (CODEm)

- Bayesian: estimates based on probabilities
- Ensemble: combines many unique submodels into a final model

This modeling tool has a user interface to manage model parameters, launch models, and vet results. This is called CoDViz and the internal
version can be found here: `CoDViz
<https://internal.ihme.washington.edu/cod/>`_.

Some causes are modeled in custom approaches. Important examples include HIV, cancer, and some maternal disorders.

**Input data**

Input data into CODEm are managed by a single team (`Cause of death team
<https://hub.ihme.washington.edu/display/COD/Causes+of+Death>`_) 
and undergo a series of data adjustments before modeling.
These adjustments can be somewhat complicated but in general they are to account for causes of death that are not sufficiently specific.
GBD calls these "garbage codes", meaning deaths coded to things that are not detailed enough. An example might be "dehydration".
Deaths coded as dehydration are *redistributed* into specific causes like diarrhea.

Data come from a variety of sources like vital registration, verbal autopsy, surveillance, sibling history, and others.

The central function `get_cod_data
<https://scicomp-docs.ihme.washington.edu/db_queries/current/get_cod_data.html>`_ will return the input data into a cause of death model. The user must specify a *cause_id*. An important
note is that the data that are returned will have several different values for cause fraction (*cf*, or the percent of all deaths
in a given age/sex/year/location that were due to the cause). Unless there is a specific reason to use one of the intermediate
cause fractions, the *cf* variable should be used.

**Enforcing internal consistency**

Cause of death estimates in the GBD are internally consistent. This means that the sum of all cause specific death models must
equal the all-cause mortality *envelope*. An envelope just means a larger model that contains many sub-model estimates. More information
on CoDCorrect can be found `here
<https://hub.ihme.washington.edu/display/CCMD/CoDCorrect>`_.

GBD does this by scaling cause-specific mortality estimates to cumulatively sum to the all-cause mortality estimate. This occurs
by age/sex/year/location. The central tool that performs this scaling is called CodCorrect. CoDCorrect runs at the draw level and so 
it maintains the uncertainty from each model. Importantly, it also adds back in HIV deaths as well as *fatal discontinuity* deaths.
A fatal discontinuity is jargon for a death that occurred as part of a cluster of deaths that were irregular, like wars,
epidemics, or famines. 

**Getting results**

The central function `get_draws()
<https://scicomp-docs.ihme.washington.edu/get_draws/current/>`_ 
can be used to get estimates of cause of deaths models at the draw level for two outputs. Unless there is a good and 
specific reason, draws from CoDCorrect should be used to estimate cause-specific mortality or YLLs.

- Output from CoDCorrect are age/sex/year/location specific deaths and years of life lost (YLLs). The function get_draws() returns both deaths and YLLs in *count* space.
	
	- The source for CoDCorrect should be "codcorrect"
	
- Output from CODEm are age/sex/year/location specific cause specific mortality rates and cause fractions (percent of all deaths)
	
	- get_draws() can return CODEm and custom COD model results (source = "codem")
	- This might not be the best place to pull results because they haven't gone through CoDCorrect yet.

