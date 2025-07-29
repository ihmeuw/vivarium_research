=================
Burn-in Periods
=================

For some models, we may choose to run a burn-in period before the simulation begins in 
order to initialize unknown parameters or correlations between parameters. 
Running a burn-in period involves 
initializing the model with simple "best guess" or approximate values, and then running the model for a period 
of time before the simulation start (the point at which we begin making the observations
of simulants we will analyze to answer our "business question"). 

The model's state at the end 
of the burn-in period is the initial state of the simulation. Over the course of the 
burn-in period, the simple initialized values will change according to their modeled
relationsips with other parameters, and eventually reach an equillibrium where the 
parameter values and correlations between them reflect our assumptions about the population.

.. note::
    The burn-in period and simulation period are continuous with each other and there are 
    no adjustments made to the model in between them.  
    
    The difference is that during the simulation period, we observe the population and record the 
    data we will use to answer the "business question" associated with the model. 
    We consider the burn-in period to be outside the time period we are simulating, 
    with the model not yet fully initialized,
    therefore we would not want to consider the events of the burn-in period in our analysis of the 
    business question.

When to use a burn-in period
============================

We always use the best available data in our simulations, but there won't be perfect data in GBD or 
the literature for every parameter and correlation between parameters we wish to be initialized at 
the beginning of the model. 

We may not find any data directly informing a parameter value during 
our literature search, or we may only have "starting point" data we are not very confident in,
for reasons such as a small sample size, or a study environment that differs from our simulation. 

Burn-in periods are only one way to address a lack of direct data. For example, another approach would be to use 
analytical methods to calculate an intial value for a parameter or correlation.

Burn-ins and analytical computations are both useful under the same general circumstances - 
when we may not have quality data directly informing the initial value of a parameter, 
but we have data about how that parameter should interact with other components of the model or 
change over or time. 

A burn-in would determine an initial value by running the simulation until the parameter stabilizes,
while an analytical approach would develop a system of equations which could solve for a value mathematically.

.. note::
    The term "burn-in" may originate from electronics testing, in which components undergo an initial 
    stress test before being distributed to catch early failures. This term 
    `has also been used <https://web.archive.org/web/20200807013910/https://www.tested.com/tech/accessories/459117-science-and-myth-burning-headphones/>`_ 
    in the context of sound equipment to refer to a similar period of utilization, also called "break-in", after 
    which components reach their peak performance. 

Example: Multiple Myeloma
=========================

Let's make this more concrete using our `Multiple Myeloma (MM) model <https://vivarium-research.readthedocs.io/en/latest/models/causes/neoplasms/multiple_myeloma/gbd_2019_phase_2/cancer_model.html>`_ 
as an example. The MM model has `two disease states <https://vivarium-research.readthedocs.io/en/latest/models/causes/neoplasms/multiple_myeloma/gbd_2019_phase_2/cancer_model.html#cause-model-diagram>`_, 
one for newly-diagnosed multiple myeloma (NDMM) and one for relapsed and/or refractory multiple myeloma (RRMM), which consists of stages corresponding to the 
number of relapses. 

We had GBD data for incidence rates as well as survival rates from the literature, so we were able to use a burn-in period to estimate prevalences for each stage.
The simulation period was 4 years, preceded by a 10 year burn-in period.

The graph below shows MM prevalence by stage over a 14 year period from the start of the burn-in period. Initially, only "multiple_myeloma_1" (newly-diagnosed) and "multiple_myeloma_2" (1st relapse)
have a non-zero prevalence, but throughout the burn-in period, simulants experience higher-degree relapses and mortality based on the modeled incidence and survival rates. 
Eventually, we reach an equilibrium where all states have a prevalence between approximately .1 and .3. 

.. image:: mm_stages.png

The graph also demonstrates how we can visually determine when we reach equillibrium by plotting the parameters of interest and running the simulation until 
they reach a steady state. Once we run the simulation long enough to reach an equilibrium (by trail and error, for instance), we know how long our burn-in period
must last.

Example: CVD
============
We can also take a look at our `Cardiovascular Disease (CVD) model 
<https://vivarium-research.readthedocs.io/en/latest/models/concept_models/vivarium_us_cvd/concept_model.html>`_ 
as another example. The CVD model has `several parameters 
<https://vivarium-research.readthedocs.io/en/latest/models/concept_models/vivarium_us_cvd/concept_model.html#initialization-parameters>`_ 
which are initialized using a burn-in period of `two years 
<https://vivarium-research.readthedocs.io/en/latest/models/concept_models/vivarium_us_cvd/concept_model.html#simulation-timeframe-and-intervention-start-dates>`_.

Medication buckets
------------------
Two of these are medication buckets for treatments for the Systolic Blood Pressure (SBP) and Low Density 
Lipoprotein Cholestorol (LDL-C) Risk Factors. 

`Blood pressure treatments <https://vivarium-research.readthedocs.io/en/latest/models/concept_models/vivarium_us_cvd/concept_model.html#treatment-effects>`_ 
are split into 6 buckets based on the number of medications and dosage. However, we only had data 
informing the ratio of people on one medication versus two or more medications. So, we used only these two buckets
at the initalization of our burn-in period, and allowed our `Treatment ramp 
<https://vivarium-research.readthedocs.io/en/latest/models/concept_models/vivarium_us_cvd/concept_model.html#healthcare-system-modeling>`_, 
which models how people move through the healthcare system and change medications,
to determine how people fall into the more granular medication buckets. 

The below graph gives an idea of how these buckets change during the burn-in and simulation periods.
Initially, all the treatment buckets except for "one drug at half dose" and "two drugs at half dose"
are near zero, but increase through 2025, at the expense of the two initial buckets, while "no treatment" 
remains stable. 
By 2025, all six buckets are populated and we begin the simulation period. 
The buckets continue to change during the simulation period as more people receive treatment.

.. image:: cvd_buckets.png


.. todo:: 
    Add section about correlations? Eg blood pressure is a risk factor for both heart disease and stroke, so 
    can look at how fraction of people with both heart disease and stroke changes over time - it should go 
    up as they both get affected by common risk factor of blood pressure, then level off over time. 
    Would need to get model outputs and plot this data to show this.

More information
================

For more information on burn-in periods in our Simulation Science Vivarium models, you can read about other models with 
burn-in periods such as `Acute Malnutrition <https://vivarium-research.readthedocs.io/en/latest/models/concept_models/vivarium_ciff_sam/concept_model.html>`_.

Additionally, for a more hands-on introduction, you could try adding on to the `Vivarium simulation tutorial <https://vivarium-research.readthedocs.io/en/latest/onboarding_resources/tutorial/index.html>`_
and creating your own burn-in period. For example, you could model a second risk factor, besides child wasting, for the diarrheal diseases cause, and you 
could run a burn-in period to initialize the correlation between child wasting and your new risk factor, by plotting how the number of simulants with 
both risk factors changes over time.

.. todo::
        * Adding to glossary
