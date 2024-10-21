..
  Section title decorators for this document:
  
  ==============
  Document Title
  ==============
  Section Level 1
  ---------------
  Section Level 2
  +++++++++++++++
  Section Level 3
  ~~~~~~~~~~~~~~~
  Section Level 4
  ^^^^^^^^^^^^^^^
  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

.. _vivarium_best_practices_closed_vs_open_cohorts:

=========================================================
Open vs. Closed Vivarium Cohorts (Fertility)
=========================================================

.. contents::
   :local:
   :depth: 1

.. todo:: 

  Figure out how to frame this page within a greater 'Designing Your Demography' section

Cohort analysis in microsimulation
----------------------------------

A cohort in a real-world study refers to a group of people who are observed over a period, often to examine
how specific exposures, conditions, or treatments affect them over time. For example, a cohort might 
consist of individuals born in the same year or individuals diagnosed with a specific 
disease at the same time. 

When Vivarium researchers use the phrase 'cohort analysis', it means something a little different than how 
a real-world study might define it.  In the context of microsimulation, the term 'cohort' is used to describe 
a group of simulated individuals who share certain baseline characteristics or are subject to the same set of 
rules and conditions over the simulation period. Microsimulation models often track these cohorts to project 
outcomes under various scenarios. 

In microsimulation, we can think of two distinct types of cohort analysis: open and closed cohort analysis.
These two types essentially differ based on how fertility is enacted in the demographics of our microsimulation. 

Open cohort analysis 
++++++++++++++++++++

In Vivarium, open cohort analysis occurs when simulants are able to move into the cohort at any time.
In an open cohort Vivarium simulation, there are three ways that a simulant can enter a simulation: 

1. Initialized into initial population (i.e., based on GBD outputs, such as prevalence of a certain health state)
2. Born into population at a later timestep
3. Migrated into population at a later timestep 

Similarly, there are two ways a simulant can leave a simulation: 

1. Die (i.e., based on GBD outputs, such as cause-specific and all-cause mortality rates)
2. Migrate out of population 

.. note::
  
  As of September, 2024, the only Vivarium simulation where it is possible for simulants to enter and leave the cohort via migration is our
  `simulation for the PRL project <https://vivarium-research.readthedocs.io/en/latest/models/concept_models/vivarium_census_synthdata/concept_model.html>`_.
  Most of our open-cohort Vivarium simulations are what is typically referred to as 'dynamic cohort analysis', which
  is a subset of the greater umbrella category of open cohort analysis, in which new simulants are added over the course of the
  simulation, but they cannot be replaced once they leave (die).  

Closed cohort analysis 
++++++++++++++++++++++

Closed cohort analysis in Vivarium occurs when no new simulants are added to the cohort over the course of the
simulation. In such simulations, simulants can only be initialized into the population at the beginning of the 
simulation. If a simulant dies or transitions out of the model, they do not get replaced. 

Simulation cohort vs. observation cohort
++++++++++++++++++++++++++++++++++++++++

When considering whether the simulation you're building is an open or closed cohort analysis, it can be helpful to 
conceptualize two different framings of what the cohort is: the simulation cohort and the observation cohort. 
What we consider a *simulation cohort* includes the entire population of simulants who have been programmed into the simulation. An *observation cohort*,
conversely, is the population of simulants who are actually observed (i.e., their data are recorded). Ideally, from 
a computational perspective, our simulation and observation cohort would be one and the same: i.e., we wouldn't be simulating
individuals who don't get observed. However, it is not rare for these two cohorts to be different.

To illustrate, we can use previous simulations our team has developed as examples. `The PRL project <https://vivarium-research.readthedocs.io/en/latest/models/concept_models/vivarium_census_synthdata/concept_model.html>`_, in which we simulated the entire US population (i.e., about 350 million simulants). We used several different
observers in this simulation, which return synthetic data intended to replicate real administrative data (e.g., Social Security, Decennial
Census, tax forms). Some of these observers, such as the simulated Women, Infants, and Children (WIC) registry, do not return information
(i.e., observe) on all of the simulants: it only returns information about those simulants who are registered for WIC. 
We can think of the entire simulated US population as the simulation cohort in this example, whereas the observation cohort
would include only those simulants returned by the WIC observer.

Interpretation of results
+++++++++++++++++++++++++

Whether we use open or closed cohort analysis in Vivarium simulations has implications for how we interpret
our results. 

With closed cohort analysis, we can examine results through the *Kaplan-Meier survival curve*, which allows
us to calculate survival probabilities. In essence, the Kaplan-Meier survival curve provides a way to visualize 
the probability of surviving over time, accounting for time in small intervals. [Goel-MK-2010]_ We conducted a 
survival analysis in our simulation of multiple myeloma.

.. todo:: 

  - Expand on this section (Are there other ways in which open vs. closed cohort analysis affects how we interpret our results?)
  - Link out to `survival analysis page <https://vivarium-research.readthedocs.io/en/latest/model_design/general_reference_material/survival_analysis/index.html>`_ when it's ready.


References
----------

.. [Goel-MK-2010]

    Goel MK, Khanna P, Kishore J. Understanding survival analysis: Kaplan-Meier estimate. Int J Ayurveda Res. 2010 Oct;1(4):274-8. doi: 10.4103/0974-7788.76794. PMID: 21455458; PMCID: PMC3059453.
