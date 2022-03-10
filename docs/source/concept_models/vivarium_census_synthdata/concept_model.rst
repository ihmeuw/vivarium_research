.. role:: underline
    :class: underline

..
  RST needs unique labels for its reference targets (the things you make with
  ".. my_link_name:").  This document has several pre-defined reference target
  templates you should do a find and replace on when you copy this document.
  They are {YOUR_MODEL_TITLE} which you should replace with a title-case version
  of your model name, {YOUR_MODEL_UNDERSCORE} which you should replace with an
  underscore-separated all lowercase version of your model name, and
  {YOUR_MODEL_SHORT_NAME} which you should replace with an abbreviation of your
  model title.  For instance, if you were doing a model of severe acute malnutrition
  for the Children's Investment Fund Foundation based on GBD 2019, we might have

    YOUR_MODEL_TITLE = Vivarium CIFF Severe Acute Malnutrition
    YOUR_MODEL_UNDERSCORE = 2019_concept_model_vivarium_ciff_sam
    YOUR_MODEL_SHORT_NAME = ciff_sam

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




.. _{vivarium_census_prl_synth_data}:

==================================
Vivarium Census PRL Synthetic Data
==================================

.. contents::
  :local:

+------------------------------------+
| List of abbreviations              |
+=======+============================+
|       |                            |
+-------+----------------------------+

.. _{census_prl}1.0:

1.0 Background
++++++++++++++


.. _{census_prl}1.1:

1.1 Project overview
--------------------



.. _{census_prl}1.2:

1.2 Literature review
---------------------


.. _{census_prl}2.0:

2.0 Modeling aims and objectives
++++++++++++++++++++++++++++++++


.. _{census_prl}3.0:

3.0 Causal framework
++++++++++++++++++++

.. _{census_prl}3.1:

3.1 Causal diagram
------------------
 
 .. note::
    link to DAGs page
    use round circles with DAGs

**Outcome (O)**:



**Most proximal determinant/exposure (E)**:
  


**Confounders (C)**:



**Effect modifiers**:


**Mediators (M)**:


.. _{census_prl}3.2:

3.2 Effect sizes
----------------



4.0 Intervention
++++++++++++++++



.. _{census_prl}4.1:

4.1 Simulation scenarios
------------------------


.. _{census_prl}5.0:

5.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _{census_prl}5.1:

5.1 Vivarium concept model 
--------------------------

.. note::
  This is our standard vivarium concept model diagram we are used to seeing

.. _{census_prl}5.2:

5.2 Demographics
----------------

.. _{census_prl}5.2.1:

5.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  - cohort type
  - cohort length
  - age and sex structure
  - time step
  - fertility
  - stratifications 


.. _{census_prl}5.2.2:

5.2.2 Location description
~~~~~~~~~~~~~~~~~~~~~~~~~~



.. _{census_prl}5.3:

5.3 Models
----------

.. note::
  here we use the compartmental (SEIR) models with squares
  

.. _{census_prl}5.3.1:

5.3.1 Model 1
~~~~~~~~~~~~~

.. todo::

  - add verification and validation strategy
  - add python-style pseudo code to summarize model algorithm if necessary

.. _{census_prl}5.3.2:

5.3.2 Model 2
~~~~~~~~~~~~~

.. todo::

  - add verification and validation strategy
  - add python-style pseudo code to summarize model algorithm if necessary

.. _{census_prl}5.3.3:

5.3.3 Model 3
~~~~~~~~~~~~~

.. todo::

  - add verification and validation strategy
  - add python-style pseudo code to summarize model algorithm if necessary

.. _{census_prl}5.3.4:

5.3.4 Model 4
~~~~~~~~~~~~~

.. todo::

  - add verification and validation strategy
  - add python-style pseudo code to summarize model algorithm if necessary


.. _{census_prl}5.4:

5.4 Desired outputs
-------------------

.. _{census_prl}5.5:

5.5 Output meta-table shell
---------------------------

.. todo::
  - add special stratifications if necessary

.. _{census_prl}6.0:

6.0 Back of the envelope calculations
+++++++++++++++++++++++++++++++++++++


.. _{census_prl}7.0:

7.0 Limitations
+++++++++++++++

