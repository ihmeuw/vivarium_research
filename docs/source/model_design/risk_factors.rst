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

.. todo::

  Update this section once this page has been filled in further.

.. todo::
  
  Separate this into "in the field of epi", "in GBD", and "in vivarium"

A risk factor is any attribute whose measure is causally related to the measure 
of an outcome. Such attributes can range widely, and are categorized by GBD into 
environmental/occupational, behavioral, and metabolic risks. For example:

  * Environmental/occupational

    * The level of particulate matter in the air of an individual's environment

    * An individual's access or lack thereof to clear water

  * Behavioral

    * An individual's alcohol intake

    * A low level of physical activity

    * A history or lack thereof of childhood abuse

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
  birth weight" than if that same child, all other factors held constant, had the 
  attribute "mother had a healthy BMI during pregnancy". We will then say that the 
  attribute "low birth weight" causes the child to have a higher probability of 
  experiencing a bout of diarrheal disease. We then attribute health loss to this 
  bout of diarrheal disease.

Risk factors are implemented in epidemiological models as a risk exposure
that is mapped to a risk effect. For example, a categorical exposure to "having 
a high BMI" is mapped to a higher differential probability of experiencing 
chronic kidney disease (CKD).

Within the context of our models, a risk factor will be an attribute of a 
simulant averaged over a timestep. This is in contrast to GBD, wherein a risk 
factor is an attribute of a population, potentially for a given sex-age-location, 
averaged over one year.

Risk exposures and effects are discussed in more detail in the proceeding 
sections. Here we will note that when defining the relationship between 
a risk effect and a risk exposure, the subset of a simulant's history 
of exposure that ought to be associated with a risk effect will depend on the 
risk factor. 

	For example, consider the risk-outcome pairs *unsafe water 
	source* and *diarrheal diseases*, versus *smoking* and *diabetes*. We see that 
	only a simulant's recent exposure to an unsafe water source will affect their 
	probability of suffering from diarrheal diseases in the next week. However, the 
	probability of becoming diabetic in the next year will be affected by a
	simulant's entire history of smoking.


What is a causal relationship?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this context, causal relationships imply that there is a direct cause and 
effect relationship between two traits (generally an exposure and an outcome). 
Notably, we hope to differentiate *causal* relationships (which have a direct 
cause and effect relationship) from *correlated* relationships (which have a 
relationship, but it may be driven by something other than a direct cause and 
effect). As it turns out, distinguishing between correlation and causation can 
be quite a challenging task and many fields, including epidemiology, are 
devoted to the process of *causal inference,* or drawing a conclusion about a 
causal relationship based on the available evidence.

An term that is often used in causal inference is the **counterfactual**. The 
counterfactual refers to an alternate reality in which only a single variable 
has changed and all else has remained exactly the same. 

  For instance, say that we wanted to evaluate the causal realtionship between 
  smoking and lung cancer. Hypothetically, we could compare lung cancer rates 
  between 1954 when smoking was at its peak in the US and 2020 when smoking 
  rates in the US are lower. However, you can quickly imagine additional 
  differences between 1954 and 2020 US that may also impact the rates of lung 
  cancer, such as differences in air pollution due to automobiles and the rise 
  of electronic cigarettes. 

  Therefore, while the comparison between 1954 and 2020 US may be interesting 
  and useful, it is not a true counterfactual comparison. Instead, a 
  counterfactual scenario could be conceptualized as "what would the lung 
  cancer rate in the US be in 1954 *if no one smoked* and **all else was equal**?" 
  Then, we could evaluate the independent effect of smoking on lung cancer
  without interference from any other factors.

However, by definition, the counterfactual scenario is impossible to directly 
evaluate, which is the core challenge in causal inference. Luckily, there are 
several strategies that can be used to attempt to indirectly answer the 
counterfactual question and perform causal inference. Some examples include
randomized control trials and adjustment for confounding variables in 
epidemiology studies.

One way in which causal inference is performed for a particular relationship 
between an exposure and outcome is assessment based on the Bradford Hill 
criteria for causation. The Bradford Hill criteria are a group of principles 
that may be used in evaluating the epidemiologic evidence of a causal 
relationship such that the more criteria that are satisfied, the more likely 
it is that a causal relationship exists. The criteria are listed below:

  - **Strength/Effect Size:** The larger the association, the more likely 
    that it is causal.
  - **Consistency/Reproducibility:** Consistent findings observed by different 
    people in different places increase the likelihood of causality.
  - **Specificity:** The more specific the association between a cause and an 
    effect, the more likely that it is causal.
  - **Temporality:** The effect **must** occur *after* the cause.
  - **Biological Gradient/Dose-Response Relationship:** Greater exposure should 
    generally lead to greater observed effect.
  - **Plausibility:** A plausible mechanism between cause and effect is helpful 
    (although limited by current knowledge).
  - **Coherence:** Coherence between epidemiological and laboratory findings 
    increases the likelihood of a causality.
  - **Experiment:** Experimental evidence between the cause and effect generally 
    supports a causal relationship.
  - **Analogy:** Analogies or similarities between the observed associations and 
    other associations exist generally support a causal relationship.
  - **Reversibility:** If the cause is deleted, the effect should also disappear.

A particularly relevant criterion listed above is **temporality**, which 
declares that in order for a relationship to be causal, the cause or exposure 
must occur *before* the effect or outcome chronologically. When this criterion 
is not satisfied, there is a risk for **reverse causalility**, in which the 
causal relationship occurs in the opposite direction as expected.

While these criteria are a useful guide for assessing whether there is 
sufficient evidence to conclude that a relationship is causal, there are 
several concepts that should be considered when thinking about causality 
between an  exposure and an outcome. Relationships that complicate our 
understanding of causality, including confounding, intermediates, effect 
modification, and mediation are discussed in the following subsections.

Notably, in the following sections, solid arrows are used to depict causal 
relationships directionally between a cause/exposure and effect/outcome. 

.. todo::

  Discuss counterfactual analysis as performed in our assessment of interventions.

  Discuss criteria (sim science and GBD) for modeling a risk outcome pair

Confounding
""""""""""""

Intermediates
"""""""""""""

Effect Modification
"""""""""""""""""""

Mediation
"""""""""

Causal Inference in the Global Burden of Disease Study
""""""""""""""""""""""""""""""""""""""""""""""""""""""

Notably, GBD researchers use an evidence scoring system that is based off of a subset of the Bradford Hill Criteria to evaluate the quality of evidence regarding causal relationships between risk-outcome pairs in GBD. Specifically, before computing the relative risks for a GBD risk factor, GBD researchers evaluate the *risk of bias* among individual studies that investigate the relationship between a risk-outcome pair. Then, GBD researchers additionally evaluate the strength (as a direct result of the relative risk curve they compute), consistency (through evluating between study heterogeneity), and dose-response (through the shape of the relative risk curve) for the computed relative risks for a given risk factor. Using these criteria, GBD researchers create a quantitive quality of evidence score for each risk-outcome pair in GBD.

Specifically, GBD researchers evaluate the risk of bias within individual studies based on the following characteristics:

1) Representativeness of the study population

2) Exposure measurement

  a) Individual versus population

  b) Objective versus self-report

  c) Multiple prospective versus baseline prospective versus retrospective

3) Outcome measurement

  a) Death certificatie/physician diagnosis/medical records versus self-report

  b) Blind outocme assessment versus not

4) Reverse causation: low, medium, high

5) Control for confounding 

  a) Randomized controlled trial

  b) Age, sex, tobacco, income, education, other critical determinants for a specific outcome not on the causal pathway

  c) Age, sex, tobacco, other critical determininants for a specific outcome not on the causal pathway

  d) Age, sex

6) Selection bias

  a) High follow-up (95%), not opportunity for selection

  b) Moderate follow-up (85-95%), limited opportunity for selection

  c) Low follow-up (<85%), considerable opportunity for selection

.. note::

  This information was obtained from a science seminar presented by Ryan Barber and Chris Murray on March 11, 2020; a recording is available `here <https://hub.ihme.washington.edu/display/GBD2020/GBD+Science+Seminar+series>`_. Documentation for GBD's evidence scoring system is available `here <https://hub.ihme.washington.edu/display/GBD2020/Evidence+score>`_.

.. note::

  It may be helpful to add sections for bias (selection bias, measurement bias, confounding bias, etc.) and generalizability to the above causal relationships section for additional context here

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
