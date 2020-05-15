..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1
  +++++++++++++++
  
  Section Level 2
  ---------------

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


.. _2017_concept_model_vivarium_swissre_breastcancer:

========================================
Vivarium SwissRe Breast Cancer Screening
========================================

Project Overview
++++++++++++++++

Modeling aim and objectives
+++++++++++++++++++++++++++

IHME will estimate the yearly number of cases of cancer detected per 100,000 insured population under specific screening practices to allow Swiss Re to identify the trends that are important to its critical illness product. This will facilitate their work to project how much they will pay out for certain cancer sites they picked in both a baseline and alternative scenario.

Modeling design and methodology
+++++++++++++++++++++++++++++++

Model design
------------

A closed cohort of simulants carrying insurance for their entire life and stay in the simulation world from 2020 to 2040. We intend to model both sexes, 0 to 74 in 5 years age band, given age and sex weight distribution for a mix of four or five provinces in China. 

Model location description
--------------------------
Swiss Re suggests us to model a combination of provinces rather than select a proxy city such as Beijing or Shanghai. This is because GBD cancer incidence in Beijing/Shanghai is much lower than national average. Potential provinces they have mentioned in the last call are: Guangdong, Jiangsu, Jilin, and Gansu; where Guangdong and Jiangsu located in the south, Jilin and Gansu located in the north.


Population description
----------------------

Our projections will focus on the population from a weighted blend of Chinese provinces that Swiss Re and IHME agree best resemble Swiss Re’s insured population, and on the annual number of cancer cases detected by cancer screening programs among the insured population from 2018 to 2030.

.. todo::
	population distribution table


Causal diagram
--------------

.. todo::

	- insert causal diagrams (8,9,10);
	- state and transition tables

Intervention
------------

Outcomes intervention affects
-----------------------------

Risk factors
-Family history
-High body-mass index
-High fasting plasma glucose
-Alcohol use
-Secondhand smoke
-Low physical activity
-Smoking

Cause
-Breast cancer
 
.. todo::

	- detail risks
	- cause hierarchy


Simulation scenarios
--------------------

IHME will produce both a baseline (business as usual) simulation, and an alternative scenario simulation in which key cancer screening practice or policies are implemented in our Vivarium simulation framework. The baseline scenario will incorporate expected trends in disease rates. The alternative scenario will augment the baseline scenario with the introduction and scale-up of new screening technology.

Screening algorithm
-------------------

.. todo:: screening algorithm diagram


Baseline correlations
---------------------

Effect sizes
------------


Simulation model specs
++++++++++++++++++++++

Output meta-table shell
+++++++++++++++++++++++

Limitations
+++++++++++