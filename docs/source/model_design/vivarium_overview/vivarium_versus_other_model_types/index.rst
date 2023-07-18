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

.. _vivarium_best_practices_vivarium_and_other_models:

=========================================================
What is Vivarium Good For?
=========================================================

.. contents::
   :local:
   :depth: 1

What are individual-based microsimulations?
-------------------------------------------

Vivarium, a platform developed by the Simulation Science team, enables individual-based microsimulation, also known as agent-based simulation. This is a technique for combining information about attributes of individuals in a population (such as demographics, risk factors, disease occurrence, and intervention coverage) and relationships between these attributes, to estimate health outcomes in a simulated environment over time.

Individual-level microsimulation models incorporate relevant characteristics, including: 

- Basic demographics (e.g., age, sex/gender, race/ethnicity)
- Exposure to risk factors
- Disease incidence 
- Healthcare visit frequency
- Treatment (i.e., timing, duration, frequency, adherence, and known/assumed treatment effects)
- Adverse events
- Mortality rate/life expectancy 

By using individual-level microsimulation, we probabilitistically assign the above attributes heterogeneously across individuals within the simulated population. Taken in aggregate, these attributes match real-world population-level data, derived from IHME's Global Burden of Disease (GBD) databases and other sources. Over the duration of a given microsimulation
run, simulant attributes are dynamically updated.

Simulation components are interdependent, and relationships between attributes are also based on best available real-world 
evidence. For example, disease progression is a function of simulant characteristics and treatment; survival depends on stage of disease and other characteristics. 

What are the advantages and disadvantages of individual-based microsimulations?
-------------------------------------------------------------------------------

.. todo::

  Fill out this section with strengths and weakness of individual-based microsimulation. 
  

How does Vivarium compare with other microsimulation tools?
-----------------------------------------------------------

.. todo::

 - Versus decision tree or other types of models?
 - Different types of agent-based models (mini lit review) 
 - What differential equations underly these different types of models?

References
----------

Sorensen et al. (2017). `Microsimulation models for cost-effectiveness analysis: a review and introduction to CEAM.` SummerSim '17: Proceedings of the Summer Simulation Multi-Conference, Society for Computer Simulation International, https://dl.acm.org/doi/10.5555/3140065.3140097. 

Allen et al. (2019). `Enabling Model Complexity Through an Improved Workflow.` Healthy Algorithms, https://healthyalgorithms.files.wordpress.com/2021/05/2019-enabling-model-complexity-through-an-improved-workflow-mws_paper-christine-allen.pdf. 