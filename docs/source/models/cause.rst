.. _models_cause:

===============
Modeling Causes
===============

.. todo::

   Overview of modeling GBD causes.

.. contents:

What is a cause?
----------------

The structure of a cause model
------------------------------

Common cause models
-------------------

.. todo::

   Format as table with model type, description.
   Fill in descriptions.

SI
++

SIS
+++

SIR
+++

Neonatal
++++++++

Common data sources for cause models
------------------------------------

.. todo::

   Update mortality-related data sources within existing format.

Once a cause model structure is specified, data is needed to inform its states and transitions. For our purposes, cause models generally have the following data needs:

1. The probability that a simulant will start the simulation in a given state within the cause model
2. The probability that a simulant will transition to a new state within the cause model in a given timestep
3. The disability weight for each state in the cause model
4. The probability that a simulant in a given cause model state will die in a given timestep

There are several common data sources that can be used for these needs, which are outlined in the table below and discussed in more detail afterward.

+--------------+--------------------------------+--------------------+
|Measure       |Definition                      |Uses                |
+==============+================================+====================+
|Prevalence    |Proportion of population        |Initialize cause    |
|              |with a given condition          |model states        |
+--------------+--------------------------------+--------------------+
|Birth         |Proportion of all live births   |Initialize neonatal |
|Prevalence    |born with a given condition     |cause model states  |
+--------------+--------------------------------+--------------------+
|Incidence     |Number of new cases of a given  |Estimate transition |
|              |condition per person-year       |rates               |
+--------------+--------------------------------+--------------------+
|Remission     |Number of recovered cases from a|Estimate transition |
|              |given condition per person-year |rates               |
+--------------+--------------------------------+--------------------+
|Disability    |INSERT DEFINITION (Yaqi?)       |INSERT USES (Yaqi?) |
|Weights       |                                |                    |
+--------------+--------------------------------+--------------------+
|Cause-Specific|INSERT DEFINITION (Yaqi?)       |INSERT USES (Yaqi?) |
|Mortality     |                                |                    |
+--------------+--------------------------------+--------------------+
|Excess        |INSERT DEFINITION (Yaqi?)       |INSERT USES (Yaqi?) |
|Mortality     |                                |                    |
+--------------+--------------------------------+--------------------+

Prevalence
++++++++++

Prevalence is defined as the **proportion of a given population that possesses a given condition or trait** at a 
given timepoint.

	For example, the prevalence of obesity in the United States was approximately 40% in 2016.

When a time *frame* (such as 2016, i.e. 1/1/16 to 12/31/16) instead of a *timepoint* (such as 1/1/16) is 
reported, it is commonly assumed that the reported prevalence represents the prevalence of the *midpoint* of 
that timeframe (7/1/16 is the midpoint for the time frame of all of 2016). However, this may not always be the 
case and it should be considered when relevant.

Prevlance data can be used to **initialize cause model states** and represents the **probability that a simulant 
will begin the simulation in a given state.**

	For example, the probability that a simulant in a model of obesity in the United States beginning in 
	2016 will begin the simulation as obese is 0.4 or 40%.

Birth Prevalence
++++++++++++++++

Birth prevalence is defined as the **proportion of live births in a given population that possess a given 
condition or trait at birth.**
 
	For example, the birth prevalence for cleft lip in the United States in 2006 was 10.63 per 10,000 live 
	births, or 0.163%.

Birth prevalence data can be used to **initialize neonatal cause model states** and represent the **probability that a 
simulant who is born during the simulation will be born into a given neonatal cause model state.** 

	For example, the probability that a simulant born during a simulation of cleft lip in the United States 
	in 2006 is 0.00163, or 0.163%.

Incidence Rates
+++++++++++++++

Incidence rates are defined as the **number of new cases of a condition that occur per person-year of the at-risk 
population (individuals without condition).** 

	For example, the incidence of multiple sclerosis (MS) in the United States is 2.8 per 100,000 
	person-years. 

	This suggests that if we followed 100,000 individuals without MS for 1 year each (100,000 people * 
	1 year = 100,000 person-years), we would expect 2.8 of these individuals to develop MS within this timeframe. 

	Alternatively, if we followed 50,000 individuals without MS for 2 years each (50,000 people * 2 years = 100,000 
	person-years), we also would expect 2.8 of these individuals to develop MS within this timeframe.

Incidence can be used to **estimate cause model transition rates** and can represent the **probability that a simulant 
will transition from a susceptible state to an infected state within a given timestep.** 

	For example, with a timestep of one year, the probability that a simulant will transition from a 
	susceptible (without MS) cause model state to an infected (with MS) cause model state is 2.8*10^(-5).

**A Few Considerations for Incidence Data Sources:**

As mentioned above, the denominator for incidence is person-years of the *at-risk* population, or the population 
*without* condition (``1 - condition prevalence``). However, in certain scenarios, this may not always be the case.

	When the prevalence of a condition is *small*, ``1 - prevalence`` will *approximately* equal ``1``. In 
	these cases, incidence may be calculated as the number of new cases per person-years in the *entire* 
	population as an approximation of a number of new cases per person-years in the *at-risk* population. 
	This approximation will likely not have a large impact when condition prevalence is low, although the 
	use and impact of this approximation in incidence data sources used for cause models should be considered.

Further, it is important to consider that cause models are *state*-specific and not necessarily 
*disease*-specific. What does this mean?

	Consider a cause model in which an individual can trasition from a susceptible state to a mild disease 
	state OR from a susceptible state to a severe disease state.

	In this case, the incidence rate for overall disease (mild and severe) does not help us estimate the 
	transition rates from susceptible to mild disease or to severe disease. In these cases, incidence rates 
	specific to mild and severe disease are needed to inform the specific transitions present in the cause model.

Lastly, see the section on hazard rates in non-standard data sources below to determine when hazard rates may be 
preferrable to annual incidence rates as a data source for cause model transition rates.

Remission Rates
+++++++++++++++

Remission rates are defined as the **number of newly recovered cases from a condition that occur per person-year 
of the population with the condition.**

	For example, the remission rate of type II diabetes in the United States is 2.4 per 10,000 person-years.

	This suggests that if we followed 10,000 individuals with type II diabetes for one year each, we would 
	expect to see 2.4 individuals recover from type II diabetes.

Remission rates can be used to estimate cause model transition rates and represent the probability that a 
simulant in an infected (with condition) state will transition to a non-infected (without condition) state. 

	For example, with a time step of one year, the probability that a simulant in the infected state in a 
	model of type II diabetes in the United States will transition to a susceptible or recovered state 
	within a timestep is 2.4*10^(-4), or 0.024%.

.. NOTE::

	The considerations discussed in the incidence section above apply to remission rates as well. See above 
	for details.

Disability Weights
++++++++++++++++++

(TO-DO)

Cause-Specific Mortality
++++++++++++++++++++++++

(TO-DO)

Excess Mortality
++++++++++++++++

(TO-DO)

Non-Standard Data Sources for Cause Models
------------------------------------------

Duration
++++++++

In certain situations, there may be restrictions on the amount of time a simulant may occupy a given cause model 
state. In these cases, it is important to specify the duration that simulants may remain in the state of interest.

For example, in conditions that have acute and chronic phases, it may be necessary to specify the length 
of time an individual occupies the acute phase before transitioning into the chronic phase.

	E.g. In a cause model of ischemic heart disease, a simulant may transition from susceptible to a 
	myocardial infarction state, where they remain for 28 days, before they transition to a ischemic 
	heart disease state.

Restrictions
++++++++++++

In addition to time-related restrictions discussed above, certain situations may require additional restrictions 
to be placed on cause model states. Examples of possible restrictions include:

- Age range restrictions (e.g. only simulants under 5 years old may enter this state) 
- Sex restrictions (e.g. only female simulants may enter this state) 
- Restrictions related to states in other cause models (e.g. only simulants who are susceptible to condition X may enter this state) 
- Etc.

Hazard Rates 
++++++++++++

A "hazard" is a term commonly used in epidemiology survival analysis. For our purposes, we can think of a hazard 
rate as an *instantaneous* version of incidence, remission, or mortality rates as opposed to the annual versions 
of these rates that we've previously discussed.


	**Annual rates** tell us how many new cases occur per person-year, or in other words, per 
	person over a time *frame* of one year. For instance,

		The annual (hypothetical) incidence of influenza was 0.15 cases per person-year.

		The annual (hypothetical) cancer mortality rate was 0.2 cases per person-year.

	**Instantaneous (or hazard) rates**, tell us the how many new cases occur at a specific 
	time *point*. For instance,

		The (hypothetical) hazard rate of influenza incidence was 0.001 on July 1st and 0.3 on December 
		1st.

		The hazard rate of (hypothetical) cancer mortality is 0.4 in the first year after diagnosis, 0.3 
		in the second year of diagnosis, 0.2 in the third year after diagnosis, and so-on.

As illustrated through these examples, the hazard rate allows us to consider differing incidence rates at 
different time points relative to a specific contextualizing event. 

In the example of hazard rates for cancer mortality, we see that an individual is more likely to die from cancer 
in the first year following diagnosis than the third year. Importantly, this can be interpreted as an individual 
who has lived three years after diagnosis is less likely to die from breast cancer than an individual who has so 
far only survived one year after diagnosis.

However, in the example of the annual cancer mortality rate, we have a single measure which we are forced to 
assume is constant and uniformly distributed over the time frame we apply it to. This assumption would suggest 
that an individual with breast cancer always has the same probability of breast cancer mortality following 
diagnosis, regardless of how much time has passed since diagnosis. The assumption also suggests that an 
individual has the same probability of influenza infection on every day of the year.

**What does this mean for choosing the best cause model data source?**

Depending on the specific cause model at hand, the prefered data source may vary between annual incidence rates 
and instantaneous incidence (or hazard) rates. The table below discusses some considerations that may influence 
which data source is preferable. In general...

**Annual incidence rates are preferable when:**

- The assumption of uniform and constant distribution of new cases is **valid**

			or

- The assumption of uniform and constant distribution of new cases is **invalid**, but there is insufficient data to utilize an instantaneous hazard rate (note this as a model limitation and consider other ways to address it)

			or

- The assumption of uniform and constant distribution of new cases is **invalid**, but the assumption will not 
impact model results in a meaningful way

**Instantaneous incidence (hazard) rates are preferable when:**

- There is not a uniform or constant distribution of new cases over an annual timeframe

			and

- There is sufficient data to inform incidence on a timeframe more specific than annual

			and

- Using a hazard rate adds value to the model
