.. _models_cause:

===============
Modeling Causes
===============

.. todo::

   Overview of modeling GBD causes.

What is a cause?
----------------

The structure of a cause model
------------------------------

Common cause models
-------------------

SI - Short for susceptible-infected. This modeling strategy is appropriate for 
causes where people never recover once they enter into a with condition state. 
Example: Ischemic Heart Disease

SIS - Short for susceptible-infected-susceptible. This modeling strategy 
is appropriate for causes where individuals can have multiple cases over 
the course of their lives. Example: Diarrheal Diseases

SIR - Short for susceptible-infected-recovered. This modeling strategy
is appropriate for causes where individuals can only have a single
case, but do not stay in the with condition state forever. Example: Measles

Neonatal - This modeling strategy is appropriate for causes that an 
individual is born into the with condition state with and never recovers from.
Example: Preterm birth

Common data sources for cause models
------------------------------------

.. note::

   Currently there are GBD shared function tools that return you draw-level values;
   alternatively, you can also pull data by using ``vivarium_inputs`` tools.

Available Tools

+------------------+-------------------------------------------------------+
| **Tool**         | **Requirements**                                      |
+------------------+-------------------------------------------------------+
| get_draw("como") | only accepts one of the following types:              |
|                  | cause_id, rei_id, or sequela_id                       |
+------------------+-------------------------------------------------------+
| get_draw("epi")  | with rare exceptions, Prevalence, Incidence, EMR, and |
|                  | WCMR values are non-final and should not be used      |  
+------------------+-------------------------------------------------------+
| get_raw_data()   | modelable entity, measure, and lcoation               |
+------------------+-------------------------------------------------------+
| get_measure()    | modelable entity, measure, and lcoation               |
+------------------+-------------------------------------------------------+

Cause Measures

+-------------------+---------------------------------------------+-------------------------+
| **Measure**       | **GBD Definition**                          | **Sources**             |
+-------------------+---------------------------------------------+-------------------------+
| Incidence         | New instances of the cause within the year  | COMO                    |
+-------------------+---------------------------------------------+-------------------------+
| Prevalence        | Proportion of a population that experiences | COMO                    |
|                   | the cause for a specific time interval      |                         |
+-------------------+---------------------------------------------+-------------------------+
| Birth Prevalence  |                                             | COMO                    |
+-------------------+---------------------------------------------+-------------------------+
| Remisson          |                                             | Epi/Dismod              |
+-------------------+---------------------------------------------+-------------------------+
| Deaths            | Number of deaths due to a GBD cause         | CoDCorrect              |
+-------------------+---------------------------------------------+-------------------------+
| Disability Weight | Proportion weight attached to disability    | Mapped at sequela level |
|                   | value attributed to a GBD cause             |                         |
+-------------------+---------------------------------------------+-------------------------+
| Cause-specific    | The rate of death due to a specific cause,  | Epi (deaths/population) |
| Mortality         | relative to the population                  |                         | 
+-------------------+---------------------------------------------+-------------------------+
| Excess Mortality  | The individual rate of mortality due to the | Epi (CSMR/prevalenc)    |
|                   | specific disease or due to elevated risk    |                         |
|                   | caused by the presence of the disease       |                         |
+-------------------+---------------------------------------------+-------------------------+

Non-standard data sources for cause models
------------------------------------------
