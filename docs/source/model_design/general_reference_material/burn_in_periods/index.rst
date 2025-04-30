=================
Burn-in Periods
=================

For some models, we may choose to run a `burn-in period` before the simulation begins in 
order to initialize unknown parameter values in the population. Running a burn-in period involves 
initializing the model with unrealistic values, and then running the model for a period 
of time before the `simulation start` -- the point at which we begin making the observations
of simulants we will analyze to answer our `business question`. 

The model's state at the end 
of the burn-in period is the initial state of the simulation. Over the course of the 
burn-in period, the unrealistically initialized values will change according to their 
relationsips with other parameters, until those values and relationships reach an equillibrium 
which reflects the data that informs our understanding of the population.

.. note::
    The burn-in period and simulation period are continuous with each other and there are 
    no adjustments made to the model in between them. In other words, the model operates in 
    exactly the same way regardless if it is in the burn-in or simulation period. 
    The key distinction is that the goal of the burn-in period is to arrive at parameter 
    values which accurately reflect the population before we begin the simulation, while the 
    goal of the simulation is is to observe the population in order to answer the 
    `business question` associated with the model. 

    When we know the relationships between some of our model parameters but not the values 
    the parameters should be initialized to in the model, the burn-in period is necessary 
    to properly initialize the model so it can successfully answer the business question.

Example: CVD
============
Let's make this more concrete using our `Cardiovascular Disease (CVD) model 
<https://vivarium-research.readthedocs.io/en/latest/models/concept_models/vivarium_us_cvd/concept_model.html>`_ 
as an example. The CVD model has `several parameters 
<https://vivarium-research.readthedocs.io/en/latest/models/concept_models/vivarium_us_cvd/concept_model.html#initialization-parameters>`_ 
which are initialized using a burn-in period of `two years 
<https://vivarium-research.readthedocs.io/en/latest/models/concept_models/vivarium_us_cvd/concept_model.html#simulation-timeframe-and-intervention-start-dates>`_.

Medication buckets
------------------
Two of these are medication buckets for treatments for the Systolic Blood Pressure (SBP) and Low Density 
Lipoprotein Cholestorol (LDL-C) Risk Factors. 

`Blood pressure treatments <https://vivarium-research.readthedocs.io/en/latest/models/concept_models/vivarium_us_cvd/concept_model.html#treatment-effects>`_ 
are split into 6 buckets based on the number of medications and dosage. However, we only had data 
informing the split between people on one medication and two or more medications. So, we used this 
split at the initalization of our burn-in period, and allowed our `Treatment ramp 
<https://vivarium-research.readthedocs.io/en/latest/models/concept_models/vivarium_us_cvd/concept_model.html#healthcare-system-modeling>`_ 
modeling how people move through the healthcare and change medication buckets (based on NHANES data ??)
to determine how people fall into the more granular medication buckets. 

At the start of the burn-in period simulants were in only two buckets, but by the start of the simulation 
all six buckets were initialized.

.. todo:: 
    Knowing when we reached equilibrium, and checking the equilibrium

Follow-up visits
----------------
Parameters regarding follow-up visits were also intialized using the burn-in period. 


When/How to use a burn-in period
============================
Burn-in periods are useful when we may not have data to directly inform the initial value of a 
model parameter, but we have data about how that parameter should change over or time or interact
with other components of the model. 

.. todo::
    Covariance, analytical as an alternative, how we check that the equilibrium is correct, how we 
    implement burn-in/ choose length

Other examples
==============

.. todo::
    MM, Acute Malnutrition?

Todos/Notes
=====

.. todo::
    General todo:
        * Ordering sections?
        * Origin of term?

.. note::
    Other feedback from last doc session:
        * Example building on Zeb's tutorial?
        * Limitations?
        * Adding to glossary?
