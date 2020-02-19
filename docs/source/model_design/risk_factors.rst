.. _models_risk_factors:

=====================
Modeling Risk Factors
=====================

.. todo::

  Add description of what's in this document.

  Also see the following sections in :ref:`Modeling Causes <models_cause>`:

  * Learning objectives
  * Why do we want a document that describes each cause model?

  It looks like most of that content is generalizable to both risks and causes.
  Should we put similar sections in both documents, or pull them out into a more
  general document about designing Vivarium models?

  On the other hand, it looks like the following sections in :ref:`Modeling
  Causes <models_cause>` have details that are specific to causes, but should
  have analogues for risks in this document:

  * How is a cause model incorporated into a larger model?
  * What does a model document look like?

.. contents::
  :local:

Overview
--------

What is a risk factor?
++++++++++++++++++++++

A risk factor is any attribute whose measure is causally related to the measure 
of an outcome. Such attributes can range widely, and are categorized by GBD into 
environmental/occupational, behavioral, and metabolic risks. For example:

  * Environmental/occupational

    * The level of particulate matter in the air of an individual's environment

    * An individual's access or lack thereof to clear water

  * Behavioral

    * An individual's alcohol intake

    * A low level of physical activity

    * A history or lack thereof of childhood abuse0

  * Metabolic

    * The blood pressure of an individual

    * Having or not having a high BMI

For our purposes, the outcomes of these risks will generally be a differential 
probability of some cause of health loss. However, the outcome of a risk could 
also be the differential probability of another risk exposure.

  For example, we might say that an individual with the attribute "is a daily 
  smoker" is :math:`x_1` times more likely to develop lung cancer than if that same 
  individual had the attribute "has never smoked". We quantify this more 
  rigorously in our explanation of relative risk (RR) and theoretical minimum risk 
  level (TMREL).

  We might also say that an individual with the attribute "mother had a BMI of 17 
  during pregnancy" is :math:`x_2` times more likely to end up with the attribute "low 
  weight" than if that same child, all other factors held constant, had the 
  attribute "mother had a healthy BMI during pregnancy". We will then say that the 
  attribute "low birth weight" causes the child to have a higher probability of 
  experiencing a bout of diarrheal disease. We then attribute health loss to this 
  bout of diarrheal disease.

In the context of our models, risk factors will be attributes of populations. 
For example, we might consider:

  * The level of particulate matter in the air of the environment the population habituates

  * The distribution of blood pressure in the population

  * The level of access to clean water in the population
  
  * The distribution individuals who have a family member with alzheimer disease


What is a causal relationship?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

What is a risk exposure?
++++++++++++++++++++++++

What is a risk effect?
++++++++++++++++++++++

Definitions
-----------

Theoretical Minimum Risk Exposure Level/Distribution (TMREL/D)
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Relative Risk (RR)
++++++++++++++++++

Population Attributable Fraction (PAF)
++++++++++++++++++++++++++++++++++++++
