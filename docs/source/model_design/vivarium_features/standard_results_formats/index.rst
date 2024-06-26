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

.. _vivarium_best_practices_standard_results_format:

=========================================================
Vivarium Standard Results Format
=========================================================

The aim of this page is to outline a standard format for Vivarium model results 
as they appear in the count data that the engineers pass off to the researchers.

.. contents::
   :local:
   :depth: 2

Motivation behind standard formatting
-------------------------------------

Standardized formatting of Vivarium model results may be beneficial in the 
following ways:

- Predictability of results format allows researchers to write results 
  processing code in advance of receiving results

- Results format consistency enables generalizable results processing code (for 
  researchers and engineers) and reduces the need to code exception cases

- Shared language and classification of terms may aid in communication between 
  researchers and engineers

Formatting guide
-----------------

General considerations
++++++++++++++++++++++

1. Consistency with GBD names is preferred over internal/other types of 
consistency. Generally, GBD names (such as age_group_name, location_name, 
cause_name, etc.) should appear in Vivarium results as 
:code:`{gbd_name}.replace(" ","_").lower()`. Note that sometimes GBD names 
things in inconsistent ways. For instance, "6-11 months" and "12 to 23 months". 
However, this will allow us to easily merge Vivarium results and GBD data using 
their shared names.

2. Successful execution of these standard formats depends on researcher 
documentation of requested model outputs within the simulation concept model 
document.

.. todo::

  Link to updated template doc when ready

3. If a researcher-requested output does not clearly fit within the examples 
outlined below, researchers and engineers should meet to determine desired 
results formatting and document the format within the project concept model 
requested outputs section.

Parameters in results dataframes
++++++++++++++++++++++++++++++++

.. list-table:: Parameters
  :header-rows: 1

  * - Parameter
    - Value type
    - Definition
    - Possible values
  * - :code:`input_draw`
    - integer
    - Simulated input draw number
    - [0, 999]
  * - :code:`scenario`
    - string
    - Simulated scenario name
    - * baseline
      * alternative
      * etc.
  * - :code:`age`
    - string
    - Age group of stratum
    - :code:`gbd_age_group_name.replace(" ","_").lower()`
      
      * early_neonatal
      * 50_to_54
      * etc.

      If age is not included as a stratifying variable in the simulation, the 
      age parameter should still be specified in vivarium results data frames 
      according to the simulation minimum and maximum age values.

      If there is no corresponding GBD age group name, the value should be 
      formatted as :code:`{age_min}_to_{age_max - 1}` if age units are years. 
      If age units are in another unit (days/weeks/months), then the value 
      should be formatted as :code:`{age_min}_to_{age_max - 1}_{units}`.

      If there is no maximum age, the age age value should be specified as 
      :code:`{age_min}_plus`. If there is no age minimum value, the age 
      parameter value should be specified as :code:`0_to_{age_max - 1}`. 
      Finally, if there is no minimum or maximum age, then the age parameter 
      value should be specified as :code:`all_ages` (consistent with GBD age 
      group ID 22). 
  * - :code:`sex`
    - string
    - Sex of stratum
    - * male
      * female
      * both
  * - :code:`year`
    - string
    - Simulated year
    - * 2022 
      * 2023
      * etc.

      If year is not included as a stratifying variable in the simulation, the 
      year parameter should still be specified in vivarium results data frames 
      with a value of :code:`{start_year}_through_{end_year}`.
  * - :code:`{other_stratifying_variables}` (example: :code:`treatment`)
    - string
    - Some other variable by which to stratify values (in the same way as age, 
      sex, year, etc.). Intervention coverage is a common example.
    - Name and values of {other_stratifying_variables} to be defined in advance 
      of implementation by researchers.

      Example:

      * covered
      * uncovered
  * - :code:`measure`
    - string
    - Description of what is being measured about the entity
    - * ylds
      * ylls
      * deaths
      * person_time
      * transition_count
      * first_moment
      * second_moment
      * births
  * - :code:`entity_type`
    - string
    - Type of entity being measured
    - * cause
      * rei
      * modelable_entity
      * {other}
  * - :code:`entity`
    - string
    - Name of entity being measured
    - :code:`gbd_{entity_type}_name.replace(" ","_").lower()` if there is a 
      corresponding GBD entity, otherwise agreed upon between research and 
      engineering teams
      
      * measles
      * child_stunting
      * hemoglobin
  * - :code:`sub_entity`
    - string
    - Name of entity state or category
    - * susceptible/infected/recovered
      * cat1/cat2/cat3/cat4
      * For transition_count sub-entities: {source_state}__to__{sink_state} 
        (example: infected__to__recovered)
      * not_applicable
  * - :code:`value`
    - float
    - Measured value
    - (-inf, inf)

.. note::

  As a reminder, the definitions of the first and second moments for a 
  continuous exposure measure, :math:`Y`, for our purposes are defined below. 

  .. math::

    \text{First moment} = \sum_{i}Y_i \times \text{person time}_i

    \text{Second moment} = \sum_{i}Y_i^2 \times \text{person time}_i

  Using these measures, we can then calculate the population mean and standard 
  deviation values for that continuous exposure by using the sum of person time 
  within the population.

Some examples
+++++++++++++

.. list-table:: Examples of measure and entity field values
  :header-rows: 1

  * - Result
    - Measure
    - Entity type
    - Entity
    - Sub-entity
  * - YLDs due to acute myocardial infarction
    - ylds
    - cause
    - ischemic_heart_disease
    - acute_myocardial_infarction
  * - Deaths due to diarrheal diseases
    - deaths
    - cause
    - diarrheal_diseases
    - infected
  * - Person time in the susceptible to measles state
    - person_time
    - cause
    - measles
    - susceptible
  * - Transitions from measles to recovered from measles
    - transition_count
    - cause
    - measles
    - infected__to__recovered
  * - Person time in severe child stunting (cat1)
    - person_time
    - rei
    - child_stunting
    - cat1
  * - Hemoglobin first moment
    - first_moment
    - modelable_entity
    - hemoglobin
    - not_applicable
  * - Stillbirths
    - births
    - fertility
    - stillbirth
    - not_applicable
  * - Live births
    - births
    - fertility
    - live_birth
    - not_applicable
  * - First moment of birth weight
    - first_moment
    - rei
    - birth_weight
    - not_applicable
  * - Live births with neural tube defects
    - births
    - cause
    - neural_tube_defects
    - infected
