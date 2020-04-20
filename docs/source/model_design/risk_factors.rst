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
"""""""""""
**What is confounding?**

**Confounding occurs when an estimate of the association between an exposure and a health outcome is mixed together with the effect of another exposure on the same health outcome, and the two exposures are associated**. The presence of a confounding exposure biases the estimate of the effect of the exposure of interest on the health outcome. 

The bias can be negative (resulting in underestimation of the exposure effect), or positive (overestimation of the exposure effect), or can even reverse the apparent direction of effect. Confounding should always be addressed when assessing causality and failure to account for confounding leads to incorrectly concluding that an effect or its magnitude is due to one, rather than another variable. 

In order for a factor to be a confounder (C), it must meet the following criteria:

  1. Must be a risk factor, or the surrogate of a risk factor, for the outcome (O) of interest in those who are unexposed to the exposure (E) being investigated.
  2. Must be correlated, positively or negatively, with the exposure (E). If the study population is stratified into exposed and unexposed groups, this means that (C) has a differential distribution in the two groups.
  3. In addition, (C) should not be an intermediate step on the causal pathway between the exposure (E) and outcome (O) being investigated (else the factor is considered an :ref:`intermediate <intermediates>`). In other words, (C) should not be caused by the exposure (E).  

.. note::

  criteria 2, that the confounder needs to be correlated to the exposure, 


.. image:: confounding_triangle.svg

.. todo::
  to be put into maybe a study design section?

  In **randomized experimental studies**, the process of randomising individuals (or groups) to different exposures generally ensures that the different groups are equally balanced with respect to all relevant factors that might influence the risk of the outcome. In such randomised studies, 'exposure' usually refers to a treatment or other intervention that is being compared to another, or to no intervention. Randomisation ensures that every treatment group has a similar risk of the outcome at the beginning of the study. Provided the study is conducted rigorously and is sufficiently large, if we see a difference in the incidence of the outcome between treatment groups at the end of the study, then we can conclude that this difference is caused by the treatment. For this reason, experimental studies provide the strongest evidence of a causal association between an exposure and disease.

  In **observational studies**, however, it is rarely possible for individuals to be randomly assigned to an exposure. Often, individuals who share a particular risk factor have other characteristics in common that influence their risk of disease. Individuals who do not share this particular risk factor may also differ in other important ways that influence their risk of disease. So we cannot be sure that those with and without the risk factor of interest (exposed and unexposed individuals) are similar, or comparable, with respect to all other relevant factors. This makes it difficult to determine if the association we observe between disease and our risk factor of interest is real, or whether it is influenced by other factors.

**An example**:
Imagine that you are interested in knowing whether smoking (our risk factor of interest) influences the risk of coronary heart disease (CHD) in men aged 18 to 64 years. You conduct a cohort study with an exposed group of male smokers in this age group from the general population, and compare their risk of CHD after a number of years to that of an unexposed group of non-smoking males in the same age group. You would expect to find a higher incidence of CHD among smokers. However, males who smoke are also likely to have a higher alcohol intake, which also increases the risk of CHD. Thus, the effect that you observe for the smoking-CHD association is **mixed up** with the effect of the association between alcohol intake and CHD. Without taking account of differences in alcohol intake between smokers and non-smokers, the magnitude of the smoking-CHD association estimated from the study may be higher than the **true** value, leading to incorrect conclusions.

The criteria for alcohol to be a confounding factor for the smoking-CHD relationship is met because:

  1. Alcohol intake is a risk factor for CHD in non-smokers. In other words the relationship between alcohol and CHD is not dependent on smoking status.  
  2. Smokers generally have a higher alcohol intake (in most populations). 
  3. Finally, alcohol intake is not on the causal pathway between smoking and CHD (smoking does not in itself cause people to drink more alcohol). 

.. image:: smoking_triangle.svg

Note that the dotted line between smoking and alcohol indicates that we do not expect a 'causal' link between the smoking and alcohol. Rather, it indicates that the two are associated in the population.

**How to identify confounding?**

We look for confounding by stratifying (splitting) the data according to the proposed confounding factor and then examining the measures of effect of the exposure on the outcome in the different strata separately. If the stratum-specific measures of effect are similar to each other, but different from the crude measure of effect, this is evidence for confounding. We can now consider a numerical example to demonstrate how you can look for confounding in data from an epidemiological study.

**An example**:
A report was published that made the novel claim that coffee consumption is associated with risk of cancer of the pancreas. Here, the exposure (E) is coffee consumption and the outcome (O) is cancer of the pancreas. The importance of this finding was disputed because it was pointed out that coffee consumption is associated with cigarette smoking, and smoking is known to be a risk factor for cancer of the pancreas. Thus, smoking may be confounding (C) the association between coffee consumption and risk of cancer of the pancreas.

(Smoking is a credible alternative explanation for the reported association between coffee and pancreatic cancer. While there are many other things that are associated with coffee drinking, for any of these things to provide a credible alternative explanation for the coffee-cancer relationship, they would have to be associated with cancer risk indepedent of coffee drinking [criteria 1].)

Suppose that the association between coffee consumption and pancreatic cancer was detected in a case-control study, where the basic data was as follows:

+---------+---------------+-----------------------+
|         | Drinks coffee | Does not drink coffee | 
+=========+===============+=======================+
| Cases   |      450      |          300          | 
+---------+---------------+-----------------------+
| Control |      200      |          250          |
+---------+---------------+-----------------------+
  
From this data, it seems that the odds of coffee consumption among cases (450/300 = 1.5) is higher than that among controls (200/250 = 0.8), giving an odds ratio of 1.9.

Suppose we now look at the association between coffee consumption and pancreatic cancer separately for smokers and non-smokers. This is known as stratification. 

The table below shows the data on coffee consumption and disease status for smokers and non-smokers (or stratified by smoking status):

+----------+---------------------------------------+---------------------------------------+
|          | Smokers                               | Non-smokers                           |
+==========+===============+=======================+===============+=======================+
|          | Drinks coffee | Does not drink coffee | Drinks coffee | Does not drink coffee |
+----------+---------------+-----------------------+---------------+-----------------------+
| Cases    |      400      |          200          |       50      |          100          |
+----------+---------------+-----------------------+---------------+-----------------------+
| Control  |      100      |          50           |      100      |          200          |
+----------+---------------+-----------------------+---------------+-----------------------+
|Odds ratio| (400/200)÷(100/50) = 1.0              | (50/100)÷(100/200) = 1.0              |
+----------+---------------------------------------+---------------------------------------+

If smoking had no influence on the association between coffee consumption and pancreatic cancer, then we would expect that the odds ratio would still be about 1.9, both in smokers and non-smokers. In fact, in our example, the odds ratio for both smokers and non-smokers is 1.0. In other words, after stratifying by smoking status, there appears to be no evidence of an association between coffee consumption and pancreatic cancer. The results support the suggestion that smoking confounded the association between coffee and risk of cancer of the pancreas. The statistical association between coffee drinking and cancer is still valid, but the explanation for this association is that it is largely due to unequal distribution of smoking behaviour among people who do, and do not, drink coffee.

Why should this be? We mentioned earlier that, in order for a factor to be a confounder, it must be associated with the risk factor under investigation. In our example, we can investigate whether this is true by examining the data from *controls*, since the distribution of all exposures in the control group should reflect the distribution of exposures in the population from which the cases originated. 

The table below shows the association between the exposure (E), coffee consumption, and the confounder (C), smoking, *among the controls* [criteria 2]:

+------------+---------------+-----------------------+
|            | Drinks coffee | Does not drink coffee | 
+============+===============+=======================+
|Smokers     | 100 (**50%**) |       50 (**20%**)    |  
+------------+---------------+-----------------------+
|Non-smokers |   100 (50%)   |       200 (80%)       |
+------------+---------------+-----------------------+
|Total       |  200 (100%)   |      250 (100%)       |
+------------+---------------+-----------------------+

We can see that, among coffee drinkers, 1 in 2 (50%) are smokers, whereas among those who do not drink coffee, only 1 in 5 (20%) are smokers. This observation satisfies the first criterion for a confounding factor, that it must be associated with the risk factor under investigation. The coffee drinkers and non-coffee drinkers are not comparable (similar) in their drinking habits. (* Note: In a cohort study, we could look at this association by constructing a similar table, but replacing the number of controls in each cell with the number of person-years at risk (or the number of persons at the start of follow-up if we are conducting an analysis of risks rather than rates)).

We also mentioned above that, for a factor to be a confounder, it should be a risk factor for the outcome and that this relationship is not dependent on exposure status [criteria 1]. In our example, we can confirm this by looking at the association between smoking and pancreatic cancer separately for those who drink coffee and those who do not:

+----------+---------------------------+---------------------------+
|          | Drinks coffee             | Does not drink coffee     |
+==========+=============+=============+=============+=============+
|          | Smoker      | Non-smoker  | Smokers     | Non-smokers |
+----------+-------------+-------------+-------------+-------------+
| Cases    |      400    |    50       |   200       |     100     |
+----------+-------------+-------------+-------------+-------------+
| Control  |      100    |    100      |   50        |     200     |
+----------+-------------+-------------+-------------+-------------+
|Odds ratio| (400/50)÷(100/100) = 8.0  | (200/100)÷(50/200) = 8.0  |
+----------+---------------------------+---------------------------+

The odds of pancreatic cancer are 8 times higher among individuals who smoke than among individuals who do not smoke regardless of whether or not they drink coffee. This then satisfies the first criterion that the factor must be a risk factor for the disease in those unexposed.

Finally, we can be confident that smoking is not on the causal pathway between coffee drinking and pancreatic cancer, so the third criterion for being a confounder is satisfied.

It should now be clearer why smoking acts as a confounder in the association between coffee consumption and pancreatic cancer. Smoking is itself a risk factor for pancreatic cancer, and smoking is also differentially distributed between those who drink and not drink coffee. Thus, when we first looked at the overall association between coffee consumption and pancreatic cancer, the effect of coffee consumption was **mixed up** with the effect of smoking (because there are proportionately more smokers among those who drink coffee than among those who do not). But once we accounted for smoking by looking at the data separately for smokers and non-smokers, it became clear that there is, in fact, no evidence for an association between coffee and pancreatic cancer.

Having established that smoking appears to confound the association between coffee consumption and pancreatic cancer, the final step is to combine, or pool, the data across strata of smoking to obtain a combined, or pooled, estimate of the effect of coffee consumption on pancreatic cancer adjusted for the confounding effect of smoking. This pooled estimate is an average of the effect across all strata of smoking weighted by the size of each stratum. There are statistical methods for obtaining such pooled estimates (e.g. Mantel-Haenszel, regression). There are a number of strategies to minimise or deal with confounding, both when designing a study and in the analysis phase.

.. todo::
  How does GBD handle confounding

Intermediates
"""""""""""""

Effect Modification
"""""""""""""""""""

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
