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

.. _vivarium_best_practices_uncertainty:

=======================
Uncertainty in Vivarium
=======================

.. contents::
   :local:
   :depth: 2

Following `Briggs et al. <https://www.sciencedirect.com/science/article/pii/S1098301512016592>`__ we classify uncertainty
into the following types:

- **Parameter uncertainty**: uncertainty about simulation inputs (parameters)
- **Stochastic uncertainty**: uncertainty due to limited size of the simulation
- **Structural or model uncertainty**: uncertainty about the model structure itself

Parameter uncertainty
---------------------

We use `Monte Carlo methods <https://en.wikipedia.org/wiki/Monte_Carlo_method>`__ for quantifying parameter uncertainty.
Monte Carlo methods use repeated random sampling.
In our case, that means repeatedly running the simulation with different input parameters.

The GBD uses Monte Carlo methods, calling the resulting samples "draws" -- you can learn more about draws `here <https://hub.ihme.washington.edu/pages/viewpage.action?pageId=406389120&spaceKey=ICKB&title=Draws>`__.
We use these directly for GBD parameters.
For example, draw 0 of our simulation will utilize the draw 0 value for all GBD parameters used in the simulation.

For non-GBD parameters from literature sources or for GBD covariate estimates, it is unlikely that draw-level estimates will be available and that results are reported as mean estimates with 95% confidence intervals instead. In these cases, we must specify *how* to sample from within a distribution of uncertainty about the parameter values. To do this, we must define some distribution of uncertainty (:ref:`discussed on this page <vivarium_best_practices_statistical_distributions>`) including the type of distribution (such as normal, uniform, lognormal, etc.) and distribution parameters (such as mean/standard deviation, min/max, etc.). Then, for each draw of the Vivarium simulation, a single value will be randomly sampled from this distribution of uncertainty.

We calculate simulation results at the draw-specific level.
We only summarize final results across all draws as the *last* step before visualization/reporting (see also the :ref:`results processing tips page <vivarium_best_practices_results_processing>`).

Stochastic uncertainty
----------------------

Stochastic uncertainty is created by the limited sample size of random events in the simulation.
Unlike parameter uncertainty which we want to propagate, stochastic uncertainty is something we generally want to minimize.
We can do this by increasing the number of simulants in our simulation, **per draw** (remember, we need to run a simulation for each draw).
The only downside of more simulants is more computational cost.
Vivarium also utilizes a technique called :ref:`common random numbers <vivarium:crn_concept>` to reduce stochastic uncertainty (for a given population size).

What is a random seed?
++++++++++++++++++++++

A `random seed <https://en.wikipedia.org/wiki/Random_seed>`__ is a number used to initialize a (pseudo-)random number generator.
Given the same seed, the same sequence of random numbers will be generated.
Random seeds serve two practical purposes for us:

1. Ensure that we can reproduce random events (multiple times for the same scenario as well as across scenarios, as discussed in the Vivarium documentation)

2. Act as a tool that enables us to run subsets of a simulated Vivarium population in parallel on the cluster

With respect to the second point, imagine we have a simulated population of 100,000 individuals.
It may take a lot of time to calculate and record what happens to all 100,000 simulants at each timestep of the simulation in a single cluster job.
Therefore, *as long as individuals don't interact*, it may be preferable to split this population into 10 groups of 10,000 individuals and run each group in its own cluster job *in parallel.*
This could allow us to finish calculating and recording what happens to all 100,000 simulants in approximately 1/10th of the time!
As we split our simulated population size into subgroups, each subgroup will utilize a different random seed
(we would functionally be simulating the *same* simulants if all subgroups shared the same random seed!).

Therefore, you may hear software engineers or researchers discussing "how many seeds" to include in a given simulation run *per draw*. While this is useful shorthand from a simulation implementation standpoint, researchers should always consider it in tandem with **simulated population size per draw**.

Simulated population size per draw will directly affect the impact of stochastic uncertainty in simulation results. You can think of this like stochastic uncertainty in coin flip experiments. If you flip a coin a small number of times, you may not be surprised if you see tails more or less than 50% of the time. However, if you flip a coin *many* times, you will expect that you will see tails pretty close to 50% of the time. In this same way, if we have a small number of simulants in our population, we should not be suprised if we simulation outputs vary from expected population rates due to random chance (stochastic variation). However, as we increase the population size, we should expect that simulation outputs will be generally closer to expected population rates.

Interaction between random seeds and simulated population sizes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Generally, a researcher should communicate to the engineers the desired simulated population size per draw for a given simulation (see below for how to select an appropriate value for this parameter). Then, the engineers (perhaps with input from the researchers!) will determine an appropriate number of subgroups to divide this population across to optimize the balance between the amount of cluster nodes/memory as well as the simulation's run time. 

Generally, as the number of random seeds increases and the associated population size per parallel cluster job decreases for a set population size per draw (say 10 random seeds with population size of 10,000 per draw as opposed to 1 random seed with population size of 100,000 per draw):

- Overall run time will decrease
- Required memory per cluster job will decrease
- Amount of cluster jobs/nodes required will increase

Decisions on the degree of parallelization will depend on cluster availability, intensity of resource requirements to run the simulation, and project timelines. For example, if there is not much space on the cluster and a simulation is launched at the end of the day and will be run over night and not checked until morning, it may be preferable to run over fewer random seeds for a longer duration of time. However, if there is a lot of available space on the cluster and the model will be launched in the morning, it may be preferable to run over more random seeds so that it will be ready to view in a shorter amount of time.

Structural or model uncertainty
-------------------------------

This source of uncertainty is the hardest to quantify.
It refers to the uncertainty in the model structure itself, including the assumptions and simplifications made during model development.
This can include the choice of model parameters, the functional forms of relationships between variables, and the inclusion or exclusion of certain attributes or causal effects.
Generally, all we can do here is list our limitations.

Specifying Vivarium Uncertainty Parameters
------------------------------------------

The appropriate population size and number of draws may vary between simulations based on:

- **the degree of parameter uncertainty**: fewer draws may be more acceptable in situations with smaller degrees of parameter uncertainty
- **outcome of interest rarity**: greater population sizes may be needed for rare outcomes of interest
- **simulation computational intensity**: if simulation is run for many locations, scenarios, and/or years, there increasing population size and/or the number of draws will require more computational resources

Signs that population size may be too small:

- As outcomes are stratified by additional parameters of interest (age, year, etc.) estimates become unstable and "wiggle" around their V&V targets
- At the draw level, there are "bands" or "groupings" of outcomes (example: 0, 1, or 2 death counts averted by scenario across draws with a mean of 1.5. Would be preferable to have 15, 16, 13, 14, etc. deaths averted instead!)
- Ask the engineers to stratify the count data result by random seed so that you can make a `plot like the one in this notebook <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/maternal/child%20seeds%20and%20draws%20analysis.ipynb>`_ for a key outcome(s) of interest in your simulation (the most rare outcome of interest is likely the best to select!). If the results are really wiggly all the way to the end, then you likely need a larger population size. If the mean estimate and the width of the uncertainty interval do not change much after a certain point, then you may be able to decrease the population size. NOTE: stratifying count data results by random seed will cause the count data files to be really huge! It will require a lot of memory and time to load and transform. Consider making these plots just for a subset of draws included in the simulation rather than across all draws.

Signs that the simulation has too few draws:

- Simulation outputs match V&V targets for subset of draws included in the simulation significantly better than they match all 1,000 draws 
- Create `a plot like the one in this notebook <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/maternal/child%20seeds%20and%20draws%20analysis.ipynb>`_ for key outcomes of interest. If the results are really wiggly all the way to the end, then you likely need more draws.

Some potentially reasonable starting points:

- 50 input draws
- 100,000 population size per draw

To reduce computational intensity throughout model development, it may be desirable to run with a smaller population size and/or smaller number of draws (say 25) throughout the iterative V&V process and then increase these parameters for final production runs.
