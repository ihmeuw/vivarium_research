.. _lung_cancer_cancer_concept_model:
..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  +++++++++++++++++++++
  
  Section Level 2 (#.#)
  ---------------------

  Section Level 3 (#.#.#)
  ~~~~~~~~~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

=======================================
Vivarium CSU Lung Cancer Simulation
=======================================

.. contents::
  :local:

.. list-table:: List of abbreviations
   :header-rows: 1

   * - Label
     - Definition
   * - TBL
     - Tracheal, Bronchus, and Lung cancer
   * - MST
     - Mean sojourn time
   * - AST
     - Average survival time
   * - ODF
     - Overdiagnosis factor
   * - LDCT
     - Low dose computed topography
   * - CXR
     - Chest x-ray

.. _1.0:

1.0 Background
++++++++++++++

.. _1.1:

For this project, we are interested in the expected impact of increases in lung cancer screening coverage on the rates of detected lung cancer over the next 20 years among the insured population in select areas in China. 

1.1 Project overview
--------------------

This project intends to model the impact of increased lung cancer screening coverage on lung cancer detection forecasted from 2020 to 2040 among the insured population in select areas of China. The model will make use of the current lung cancer screening guidelines, which are dependent on age, smoking status, and cumulative smoking history. Screening will affect the timing of dection for some lung cancers (in the preclinical rather than clinical phase) as well as whether indolent cancers are detected or not.

.. _1.2:

1.2 Literature review
---------------------

.. _2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++

The main outcome of this model is lung cancer *detections*, diagnosed either via screening or symptomatic presentation. This outcome will be assessed yearly in a baseline scenario with no lung cancer screening scale-up and an alternative scenario in which lung cancer screening coverage is scaled up. 
.. _3.0:

3.0 Causal framework
++++++++++++++++++++

.. _3.1:

3.1 Causal variables
--------------------
 
.. _4.0:

4.0 Intervention
++++++++++++++++

.. _4.1:

4.1 Simulation scenarios
------------------------

**Baseline**: Lung cancer screening coverage from 2020-2040 in the model population is assumed to follow 20 year lag from US coverage rates.

**Alternative**: Lung cancer screening coverage from 2020-2040 in the model population is scaled up to target coverage.

.. todo::

  Refine this... also, see section below

.. _5.0:

5.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _5.1:

5.1 Vivarium concept model 
--------------------------

.. image:: concept_model_diagram.svg

Note that we are not modeling an effect of lung cancer screening coverage on lung cancer mortality and morbidity because it is not an explicit outcome of interest in this project, although there is evidence that there is an effect.

.. _5.2:

5.2 Demographics
----------------

The demographic model for this project should follow the same demographic model for the existing SwissRe models, as defined in the 
:ref:`Vivarium CSU Breast Cancer Screening Concept Model Documentation <2017_concept_model_vivarium_swissre_breastcancer>`, both in terms of the population and location descriptions.

.. _5.3:

5.3 Models
----------

.. _5.3.1:

5.3.1 Core lung cancer model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The lung cancer cause model that should be used for this project is documented on the :ref:`2017 Tracheal, Bronchus, and Lung Cancer Page <2017_lung_cancer>`.

.. _5.3.2:

5.3.2 Screening and detection model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

5.3.2.1 Screening Model
^^^^^^^^^^^^^^^^^^^^^^^

*Annual* screenings should be scheduled for simulants who meet ALL of the following criteria: 

#. 50-74 years old
#. 20+ pack-year history
#. Current smokers or former smokers with <5 years since quitting
#. Lung cancer not already detected

.. todo::

  Include probability of attending screening data, time to next scheduled screen distribution, screenining initialization information

5.3.2.2 Detection Model
^^^^^^^^^^^^^^^^^^^^^^^

Lung cancers may be detected in one of two ways in this simulation: either via screening or symptomatic presentation.

  Detection via screening occurs when:

    - Simulant is in the PC or I states of the lung cancer cause model
    - Simulant attends a scheduled lung cancer screening
    - Lung cancer is detected according to sensitivity parameters defined below

  Detection via symptomatic presentation occurs when:

    - Simulant has not already had lung cancer detection via screening
    - Simulant transitions from PC to C state in the lung cancer cause model

.. note::

  We may want to eventually incorporate some lag period here between when simulant begins to experience symptoms and when lung cancer is actually formally diagnosed.

5.3.2.3 Screening Sensitivity and Specificity
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Lung cancer screening specificity is assumed to be 100%; in other words, we assume that there will be no false negative lung cancer results detected via screening. 

.. todo::

  Document screening sensitivity value and references

5.3.2.4 Screening Coverage
^^^^^^^^^^^^^^^^^^^^^^^^^^

- Baseline

.. todo:: 
  
  Document values for 20 year lag from US coverage, as suggested by SwissRe. Sex-specific values if possible. 

- Alternative

.. todo::

  Document target screening coverage rate and scale-up algorithm

.. _5.3.3:

5.3.3 Smoking model
~~~~~~~~~~~~~~~~~~~

The smoking risk exposure model to be used for this project is documented :ref:`here <2017_smoking_risk_exposure_forecasted>`.

The smoking risk factor will affect lung cancer incidence, as described in the :ref:`smoking risk effects page <2017_risk_effect_smoking>`.

The smoking risk exposure should also be used to determine the lung cancer screening model algorithm, as described in section `5.3.2`_ Screening and detection model.

.. _5.4:

5.4 Input data sources
----------------------

.. _5.5:

5.5 Output meta-table shell
---------------------------

.. csv-table:: Output table shell metadata
  :file: output_table_shell.csv
  :header-rows: 1

.. _6.0:

6.0 Validation and verification
+++++++++++++++++++++++++++++++

.. _7.0:

7.0 Limitations
+++++++++++++++

.. _8.0:

8.0 References
++++++++++++++

.. todo::

 add cited works
