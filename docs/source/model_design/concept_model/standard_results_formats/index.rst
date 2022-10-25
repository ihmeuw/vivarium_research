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

.. contents::
   :local:
   :depth: 1

The aim of this page is to outline a standard format for Vivarium model results as they appear in the count data that the engineers pass off to the researchers.

Motivation behind standard formatting
-------------------------------------

Standardized formatting of Vivarium model results may be beneficial in the following ways:

- Predictability of results format allows researchers to write results processing code in advance of receiving results

- Results format consistency enables generalizable results processing code (for researchers and engineers) and reduces the need to code exception cases

- Shared language and classification of terms may aid in communication between researchers and engineers

Formatting guide
-----------------

General considerations
++++++++++++++++++++++

1. Consistency with GBD names is preferred over internal/other types of consistency. Generally, GBD names (such as age_group_name, location_name, cause_name, etc.) should appear in Vivarium results as :code:`{gbd_name}.replace(" ","_").lower()`. Note that sometimes GBD names things in inconsistent ways. For instance, "6-11 months" and "12 to 23 months". However, this will allow us to easily merge Vivarium results and GBD data using their shared names.

2. Successful execution of these standard formats depends on researcher documentation of requested model outputs within the simulation concept model document.

.. todo::

  Link to updated template doc when ready

3. If a researcher-requested output does not clearly fit within the examples outlined below, researchers and engineers should meet to determine desired results formatting and document the format within the project concept model requested outputs section.

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
  * - :code:`sex`
    - string
    - Sex of stratum
    - * male
      * female
  * - :code:`year`
    - integer
    - Simulated year
    - * 2022 
      * 2023
      * etc.
  * - :code:`{other_stratifying_variables}` (example: :code:`treatment`)
    - string
    - Some other variable by which to stratify values (in the same way as age, sex, year, etc.). Intervention coverage is a common example.
    - Name and values of {other_stratifying_variables} to be defined in advance of implementation by researchers.


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
  * - :code:`entity_type`
    - string
    - Type of entity being measured
    - * cause
      * rei
      * {other}
  * - :code:`entity`
    - string
    - Name of entity being measured
    - :code:`gbd_{entity_type}_name.replace(" ","_").lower()`
      
      * measles
      * child_stunting
  * - :code:`sub_entity`
    - string
    - Name of entity state or category
    - * measles/susceptible_to_measles
      * cat1/cat2/cat3/cat4
  * - :code:`value`
    - float
    - Measured value
    - (-inf, inf)

.. note::

  As a reminder, the definitions of the first and second moments for a continuous exposure measure, :math:`Y`, for our purposes are defined below. 

  .. math::

    \text{First moment} = \sum_{i}Y_i \times \text{person time}_i

    \text{Second moment} = \sum_{i}Y_i \times \text{person time}_i

  Using these measures, we can then calculate the population mean and standard deviation values for that continuous exposure by dividing the first and second moment (respectively) by the sum of person time within the population.

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
    - diarrheal_diseases
  * - Person time in the susceptible to measles state
    - person_time
    - cause
    - measles
    - susceptible_to_measles
  * - Transitions from measles to recovered from measles
    - transition_count
    - cause
    - measles
    - measles_to_recovered_from_measles
  * - Person time in severe child stunting (cat1)
    - person_time
    - rei
    - child_stunting
    - cat1
  * - Hemoglobin first moment
    - first_moment
    - rei
    - hemoglobin
    - N/A