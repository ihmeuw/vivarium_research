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

A factor :math:`M` is said to be an effect modifier if the effect of the 
exposure :math:`E` on disease :math:`D` varies for different values of 
:math:`M`. Effect modification is sometimes also called *interaction*. We 
illustrate this relationship below.

.. figure:: effect_mod_arrow_diagram.svg
  :align: center

If :math:`M` is some dichotomous effect modifier, then :math:`B\neq C`, and to 
understand the full story of how :math:`E` acts on :math:`O`, we cannot simply 
consider :math:`A`.

Observe this is in direct contrast to confounding, in which the exposure and 
confounding factor *must not depend on one another* to determine the risk.

We note that effect modification is a statistical phenomenon which may or may 
not reflect a biological phenomenon. However, in the case of epidemiological 
modeling, following the Bradford-Hill criteria of *plausibility*, we would hope 
to be able to explain the effect modification when implementing an effect 
modifier in a model.

Consider asbestos dust as an exposure for lung cancer. Say that in a cohort 
study, we find the following:

.. list-table:: Death rate per 100,000py: asbestos exposure alone
  :widths: 10 10
  :header-rows: 0
  :stub-columns: 1

  * - No Asbestos exposure
    - 66.95
  * - Asbestos exposure
    - 470.85

We might now conclude that the effect of asbestos on lung cancer has a rate 
ratio for :math:`470.85/66.95\approx 7.0`. However, when we stratify by 
smoking, we find the following:

.. list-table:: Death rates per 100,000py: asbestos exposure stratified by smoking status
  :widths: 10 10 10
  :header-rows: 1
  :stub-columns: 1

  * - 
    - Non smokers
    - Smokers 
  * - No Asbestos exposure
    - 11.3
    - 122.6
  * - Asbestos exposure
    - 40.1
    - 901.6

This shows us that the rate ratios for the effect of asbestos on lung cancer 
vary according to smoking status: the rate ratio is :math:`40.1/11.3\approx 3.5` 
for non-smokers and :math:`901.6/122.6\approx 7.3` for smokers.

.. todo:: add citation to Nicole's textbook

We include below a graphical representation of a risk outcome stratified by sex, and by age, taken from (http://osctr.ouhsc.edu/sites/default/files/2020-02/Module8PartVNotes.pdf). On the y-axis we have incidence of some outcome such as high blood pressure, and on the x-axis we have an exposure such as obesity.

.. todo::
   Format citations.

.. figure:: without_em_illustration.jpg
   :scale: 75 %
   :alt: Risk outcome stratified by sex

   Risk outcome stratified by sex.

Observe that the difference in incidence of high blood pressure, between female and male, is not *modified* by the exposure status. Thus the incidence ratio between exposed and unexposed groups is not modified by sex.

.. figure:: with_em_illustration.jpg
   :scale: 75 %

   Risk outcome stratified by age cutoff.

Here, we see that the risk attributable to our exposure is higher in our older group than in our younger group; thus age is an effect modifier for this risk outcome.

Finally, we emphasize that when dealing with a confounding variable, in order to best understand the effects of our exposure, we seek to *remove* the influence of the confounder. By contrast, if variable B is an effect modifier for exposure A, then this interaction is an important property of the relationship between A and B, and their influence on the disease. Rather than remove, we thus try to *capture and describe* effect modification in the greatest detail possible. (Cite Nicole's textbook)

.. todo::
  Add section on GBD. They briefly discussed mediation in the risk factors training this year; no reference to effect modification. I would guess that very few GBD risk factors take this into account. Main challenge is that risk factors are modeled by different teams that are often siloed: if a risk factor on one team is an effect modifier for a risk factor on another team, it's difficult for them to coordinate workflows. Need to do some digging.

Mediation
"""""""""

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
