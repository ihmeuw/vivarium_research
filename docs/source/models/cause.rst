.. _models_cause:

===============
Modeling Causes
===============

.. note::

   Vivarium has the infrastructure to model causes at any level in the GBD hierarchy.
   However, it is recommended to model GBD causes at the most detailed level to avoid 
   problems with missingness in the GBD cause hierarchy.

The structure of a cause model
------------------------------
- **Cause entities:** Searching the GBD cause_id associated with the cause. Find out
  affected outcomes by this cause (either mortality, disability, or both). Start thinking 
  about the restrictions such as certain ages or sexes applied to this cause.
  (useful package: `gbd_mapping <https://vivarium.readthedocs.io/projects/gbd-mapping/
  en/latest/gbd_mapping.html>`_)
- **Modeling Strategy:** To address proper methods that used to model causes we interested.
  This decision will be driven by data availability and disease epidemiology. It's 
  recommended to document any cause with PAF of one relationship with modeled risks 
  independently. Also, paying attention to situations where you might have multiple causes 
  in the model with overlapping definitions. For example, diabetes and chronic kidney 
  disease due to diabetes.
- **Data Sources:** This section is to find out what data sources are used to inform your
  cause model and only important to fill out if you deviate from our standard data sources
  (which will be returned from ``vivarium_inputs`` tools).
- **Component:** This section is primarily necessary for non standard components, and you
  should be able to answer following questions throughout the filling process.
    1. What components are used to implement the cause model?
    2. How do you include them in the simulation?
    3. What columnsdo they create in the population table?  What do the columns mean?
    4. What value pipelines do they create? What do the values coming out of 
       the pipelines mean?
- **Parameters:** List all available parameters in the format of *parameter name* plus
  *parameter description*. This section is primarily necessary for non standard 
  components. It should otherwise point to standard documentation or state that 
  no parameters are available.


Common cause models
-------------------

**SI** - Short for susceptible-infected. This modeling strategy is appropriate for 
causes where people never recover once they enter into a with condition state. 
Example: Ischemic Heart Disease

**SIS** - Short for susceptible-infected-susceptible. This modeling strategy 
is appropriate for causes where individuals can have multiple cases over 
the course of their lives. Example: Diarrheal Diseases

**SIR** - Short for susceptible-infected-recovered. This modeling strategy
is appropriate for causes where individuals can only have a single
case, but do not stay in the with condition state forever. Example: Measles

**Neonatal** - This modeling strategy is appropriate for causes that an 
individual is born into the with condition state with and never recovers from.
Example: Preterm birth

Common data sources for cause models
------------------------------------

.. note::

   Currently there are `GBD shared functions <https://hub.ihme.washington.edu/display/GBD2019/GBD+2019+Shared+Functions>`_ such as ``get_draw`` that return you draw-level
   values; alternatively, you can also pull data by using `vivarium_inputs
   <https://vivarium.readthedocs.io/projects/vivarium-inputs/en/latest/tutorials/pulling_data.html>`_.

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
| get_raw_data()   | modelable entity, measure, and location               |
+------------------+-------------------------------------------------------+
| get_measure()    | modelable entity, measure, and location               |
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
