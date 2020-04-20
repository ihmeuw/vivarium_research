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
  
  Separate this into "in the field of epi", "in GBD", and "in vivarium". 
  Disambiguate language between risk exposure vs. risk factor

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

  For instance, suppose you've finished work and you're trying to determine 
  how to get down to the international district for dinner. You go to your 
  maps application and ask **What is the quickest route to my destination?** 
  It tells you that based on the current time, weather, day of the week, road 
  work conditions, etc. that you should take the light rail.

  So you leave the office, walk a few blocks to the westlake station, and 
  catch the train. Two stops in, your train gets stopped behind a broken down 
  bus. You decide to get off the train and walk the remaining distance. 
  Arriving ten minutes late to dinner, you think to yourself **Would I have 
  arrived on time if I took the bus instead?**

As illustrated here, by definition the counterfactual question is impossible 
to *directly* answer because it is a purely hypothetical question without 
direct supporting evidence; we can only use what we know to make a *guess* at 
what might have happened in the counterfactual scenario. Consider the 
following example:

  Say that we wanted to evaluate the causal realtionship between 
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

  However, we cannot wave a magic wand and explore the lung cancer rate in 
  this alternative universe in 1954 to answer this question. Luckily, there 
  are several methods in the field of epidemiology that attempt to answer 
  conterfactual questions regarding causal relationships through randomized 
  controlled trials and other types of studies. 

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

Confounding
""""""""""""

Intermediates
"""""""""""""

An intermediate variable as discussed in this section is defined as a variable 
between an exposure and outcome in a sequential causal chain, as demonstrated 
in the diagram below:

.. image:: basic_int_diagram.svg

An Example of an Uncomplicated Intermediate
*******************************************

A (simplified) example that can demonstrate such a causal pathway is the 
relationship between the exposure of cigarette smoking, which causes the intermediate variable of accumulated tar in lungs, which in 
turn causes lung cancer (note: for the purposes of this 
example, assume that there is no direct causal relationship between cigarette 
smoking and lung cancer other than through the intermediate variable of 
accumulated tar in lungs).

.. image:: smoking_intermediate_example.svg

Now, let's say that we plan to enact an advertising campaign to reduce smoking 
in hopes of reducing population lung cancer rates. Our expected causal pathway 
would look like this:

.. image:: smoking_intervention_example.svg

Therefore, as we increase intervention coverage (assuming the intervention is effective), we would expect a decrease in 
population lung cancer rates, as these two variables are located on the same 
causal pathway. 

An Example of a Complicated Intermediate
****************************************

Now, let's imagine that a brand new hypothetical medication was just 
created that dissolves tar in lungs that accumulates due to smoking and is now 
widely used in some areas. Our causal diagram would now look like this:

.. image:: medication_example.svg

Quickly, we can now see that the relationship we previously knew between 
smoking and lung cancer is now impacted by the use of this hypothetical 
medication that affects the intermediate variable between smoking and lung 
cancer. Therefore, we can only expect lung cancer rates to decrease *by 
the expected amount as a result of our marketing intervention* in areas 
that do not widely use this medication.

Notably, intermediate variables may be relevant in situations in which the 
variable located most proximal to the outcome in the causal pathway is 
difficult to measure. For instance, measuring the amount of tar in a person's 
lungs is an invasive procedure; measuring the amount of cigarettes a person 
smokes is much easier in comparison. Therefore, data availability may dictate 
that we model cigarette smoking rather than lung tar. Such variables are often 
referred to as **proxy variables** (variables that are not directly relevant, 
but serve in place of an unobservable or immeasurable relevant variable).

  Using cigarette smoking as a proxy variable for lung tar may be a reasonable 
  approach given that there is no interference on the intermediate variable of 
  lung tar by another exogenous variable (i.e. the medication). However, if 
  there *is* interference on the intermediate variable in the relationship 
  between the exposure and outcome (i.e. significant use of the medication), 
  then the previously measured relationship between smoking and lung cancer 
  will not apply to this population in the same way.

Now, let's say that some time has gone by and now this medication has become 
quite common. A new study measured the relationship between smoking and lung 
cancer in a study population in which 50% of smokers used the medication. Now, 
let's say that we are interested in using the data from that study on the 
relationship between smoking and lung cancer in a simulation for a different 
location. However, in the location we wish to model, the medication is not 
approved at a national level and therefore use of the medication is close to 
zero. However, since we know that the relationship between smoking and lung 
cancer as we've defined it in this example is affected by the use of this 
medication, applying the data from this new study to this model location would 
be inappropriate. Rather, we should use data that measured the relationship 
between smoking and lung cancer in a study population with a similar exposure 
to the exogenous variable (medication) on the intermediate variable.

Additional Considerations
*************************

Another example of when an intermediate variable might interfere with the 
relationship between an exposure and outcome is when a given intervention 
*decreases* the prevalence of an intermediate variable (that is related to an 
outcome), but the prevalence of that intermediate variable in a specific 
location is already zero and therefore cannot be decreased any further. The 
opposite example of an intervention that *increases* the prevalence of an 
intermediate variable that is already 100% prevalent also holds true.

	For instance, imagine the example of folic acid supplementation 
	(exposure), which *decreases* folic acid deficiency (intermediate), which
	causes neural tube birth defects (outcome). Notably, neural tube birth 
	defects are also caused through other causal pathways such as maternal diabetes. 
	Given that the causal pathway from folic acid fortification-->folic acid deficiency-->neural tube defects is true, we would expect an increase in 
	exposure to folic acid supplementation to decrease neural tube defects. 
	However, the maximum effect of increasing exposure to folic acid 
	supplementation is dependent on the prevalence of the intermediary, folic acid deficiency, in 
	the population. Notably, if folic acid deficiency is zero,
	increasing folic acid supplementation exposure will have no effect on neural tube defects (there is no folic acid deficiency in the population!).  We will need to act on other exposures to reduce neural tube defects in this population, assuming there are other causal pathways for neural tube defects (eg. maternal diabetes) 

The impact of interference by intermediate variables between a given exposure 
and outcome should be carefully considered when designing simulation models. 
Particularly, special consideration should be given to how a relationship 
between an exposure and outcome may differ in various populations based on the 
differing levels of the intermediate variables.

Notably, when the exact mechanism that drives the effect of an exposure on an 
outcome is not well understood, it is possible that there may be *unknown* or 
*unmeasured* intermediate variables on the causal pathway between the exposure 
and outcome. In this case, it is important to carefully consider the 
*generalizability* of data sources that measure the relationship between the 
exposure and outcome to the model population to which it will be applied; or 
in other words, consider key similarities and differences between between the 
study and model populations that may or may not cause the study data to 
accurately reflect the situation in the model population. Additionally, 
limitations of the model should be noted when appropriate.

Effect Modification
"""""""""""""""""""

A factor :math:`M` is said to be an effect modifier if the effect of the 
exposure :math:`E` on disease :math:`D` varies for different values of 
:math:`M`. Effect modification is sometimes also called *interaction*. We 
illustrate this relationship below.

.. figure:: effect_mod_arrow_diagram.svg
  :align: center

If :math:`M` is some dichotomous effect modifier, then :math:`B\neq C`, and :math:`A` does not encompass the entire picture of how :math:`E` acts on :math:`O`. Rather, :math:`A` was calculated from some population; for the sake of example, let's say that :math:`M=1` in :math:`\frac{1}{10}` of this population. Then we see that :math:`A` is tells us about the effect of :math:`E` on a new population if and only if the new population also has the same prevalence of :math:`M`. If we wish to understand how :math:`E` operates in some population where :math:`M` is prevalent in :math:`\frac{1}{3}` of the population, then we would need to know :math:`B` and :math:`C`.

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

.. todo:: add citation to Nicole's textbook. Graphs below were reproduced from http://osctr.ouhsc.edu/sites/default/files/2020-02/Module8PartVNotes.pdf

We include below a graphical representation of a risk outcome stratified by sex, and by age. On the y-axis we have incidence of some outcome such as high blood pressure, and on the x-axis we have an exposure such as obesity.

.. todo::
   Format citations.

.. image:: without_em_illustration.svg
  :width: 400

Observe that the difference in incidence of high blood pressure, between people from Town A versus Town B, is not *modified* by the exposure status. Thus the incidence ratio between exposed and unexposed groups, within this population, is not modified by town of residence.

.. figure:: with_em_illustration.svg
  :width: 400

Here, we see that the risk attributable to our exposure is higher in our older group than in our younger group; thus age is an effect modifier for this risk outcome.

Finally, we emphasize that when dealing with a confounding variable, in order to best understand the effects of our exposure, we seek to *remove* the influence of the confounder. By contrast, if variable B is an effect modifier for exposure A, then this interaction is an important property of the relationship between A and B, and their influence on the disease. Rather than remove, we thus try to *capture and describe* effect modification in the greatest detail possible. (Cite Nicole's textbook)


**Effect modification in GBD**

GBD models estimate globally, and almost all of GBD's relative risks are used universally across location, sex, age, and time. This means that GBD generally assumes that the study populations from which they calculate their relative risks are applicable universally, without adjustments for the different sexes, locations, or other potential effect modifiers. When using GBD risk factors in a Vivarium model, it is thus important to know what studies GBD used for their relative risk calculation. From these studies it is necessary to consider:

  - what the prevalence of various effect modifiers in these populations might have been

  - if we believe these are similar enough to the populations we are modeling to use GBD effect sizes

In the case that GBD effect sizes are *not* generalizeable and we are unable to find studies that supply relative risks and effect sizes stratified by the appropriate effect modifiers, it is also necessary to state the uncertainty that will derive from this lack of information.


Mediation
"""""""""
**Definition**:
Mediation analysis aims to disentangle the effect of an independent variable on an dependent variable explained (indirect effect) or 
unexplained (direct effect) by a given set of mediators. Rather than a direct causal relationship between the 
independent variable and the dependent variable, a mediating variable improves understanding the relationship between the independent and dependent variables.
The independent variable influences the mediating variable, which in turn influences the dependent variables. 

Generic Depiction: 

.. image:: risk_factors_mediation_diagram.svg

Example: 

.. image:: risk_factors_mediation_example.svg

**Direct versus indirect effects**:
In the example diagram shown above, the indirect effect is the product of path coefficients "1" and "3". 
The direct effect is the coefficient "2". The direct effect measures the extent to which the dependent variable 
changes when the independent variable increases by one unit and the mediator variable remains unaltered.
In contrast, the indirect effect measures the extent to which the dependent variable changes when the independent variable 
is held fixed and the mediator variable changes by the amount it would have changed had the independent variable increased by one unit.
In linear systems, the total effect is equal to the sum of the direct and indirect (2 + 1*3 in the model above). 
In nonlinear models, the total effect is not generally equal to the sum of the direct and indirect effects, but to a modified combination of the two.

**Multiple risk factors**: non-independent risk case (aka: mediation). If MF is mediation factor if Risk 2 through Risk 1
for a given cause
 .. math:: RR_2 = (RR_2 - 1)(1 - MF_{2/1}) + 1
Generalized for multiple pathways of R1 through other RFs
 .. math:: RR_i = (RR_i - 1)(1 - \prod_{j = 1}^n (1 - MF_{i/j})) + 1
This adjusted or non-mediated RR is then used to calculate a non-mediated PAF, with which we can assume independence across risk 
factors when aggregating

Here is `GBD mediator template <https://hub.ihme.washington.edu/display/gbd2017/Mediator+Template>`_ which belongs to GBD/risk factors causal criteria section

Causal Inference in the Global Burden of Disease Study
""""""""""""""""""""""""""""""""""""""""""""""""""""""

Notably, GBD researchers use an evidence scoring system that is based off of a 
subset of the Bradford Hill Criteria to evaluate the quality of evidence 
regarding causal relationships between risk-outcome pairs in GBD. 
Specifically, before computing the relative risks for a GBD risk factor, GBD 
researchers evaluate the *risk of bias* among individual studies that 
investigate the relationship between a risk-outcome pair. Then, GBD 
researchers additionally evaluate the strength (as a direct result of the 
relative risk curve they compute), consistency (through evaluating between 
study heterogeneity), and dose-response (through the shape of the relative 
risk curve) for the computed relative risks for a given risk factor. Using 
these criteria, GBD researchers create a quantitive quality of evidence score 
for each risk-outcome pair in GBD.

.. note::

	The formal evidence scoring system is planned to be used in GBD 2020 and 
	was not used in this systematic way for previous GBD rounds.

	Additional, this evaluation of the epidemiological evidence to support a 
	causal relationship between a risk-outcome pair is part of a large process 
	that GBD uses to select risk-outcome pairs to model, which includes an 
	evaluation of the importance of the risk factor to the outcome, data 
	availability, and generalizability.

Specifically, GBD researchers evaluate the risk of bias within individual 
studies based on the following characteristics:

1) Representativeness of the study population

2) Exposure measurement

  a) Individual versus population

  b) Objective versus self-report

  c) Multiple prospective versus baseline prospective versus retrospective

3) Outcome measurement

  a) Death certificatie/physician diagnosis/medical records versus self-report

  b) Blind outcome assessment versus not

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

Parameters related to evidence quality are then accounted for in the assessment
of the relationship of the risk-outcome pair through MR-BRT analyses.

.. note::

  This information was obtained from a science seminar presented by Ryan 
  Barber and Chris Murray on March 11, 2020; a recording is available `here <https://hub.ihme.washington.edu/display/GBD2020/GBD+Science+Seminar+series>`_. Documentation for GBD's evidence scoring system is available `here <https://hub.ihme.washington.edu/display/GBD2020/Evidence+score>`_.

.. todo::

  Add additional section for causal inference on the simulation science team, 
  specifically.

  Additionally, t may be helpful to add sections for bias (selection bias, 
  measurement bias, confounding bias, etc.) and generalizability to the above 
  causal relationships section for additional context here.

What is a risk exposure?
++++++++++++++++++++++++

A **risk exposure** is any attribute whose measure is causally related to the 
measure of an outcome, such as a disease or another risk exposure.

A **risk exposure**, together with a **risk outcome**, constitute a **risk factor**.

We will first consider a risk exposure in the context of an individual. An 
exposure will have different possible measures which fall along a distribution, 
and an individual will possess a specific measure within this distribution.

	For example, consider the exposure *systolic blood pressure*. SBP ranges 
	from about 60 to 200, and any given individual will have a specific SBP measurement.

	One can also define categorical distributions. Consider, for example, the 
	exposure *has worked in mining*. Here, we assign each individual either 
	"yes" or "no".

Risk exposure distributions can be:
 
 - Categorical
 	
 	- Dichotomous

 	- Unordered polytomous

 	- Ordered polytomous

 - Continuous

After identifying an attribute of interest, the manner in which the risk 
exposure is defined will be subject to the data access and the particular 
research question the model is meant to answer. Major considerations include 
the unit of analysis, the time frame of interest, data available, and sources of 
bias within the data.

	For example, if the exposure is a one-time event with persistant effects, it 
	can be defined as a dichotomous exposure. However, if the exposure is smoking 
	as a risk for lung cancer, a continuous exposure defined with units of person-time 
	such as pack years per individual will likely be more suitable.

As our models will typically use GBD estimates, some of the other typically 
important considerations around data will have less broad applicability to our 
models. However, we include these as notes. The exposure definition must 
account for any gaps within the attribute of interest and the data available. 
	For example, if one is interested in soda consumption, and is building a model 
	based on data from soda sales in a certain region, this uncertainty needs to be 
	incorporated into the model. Similarly, researchers generally must be concerned 
	with biases from factors such as underreporting in the data. 
	[Exposure_definition_and_measurement]_


Risk exposures in GBD
---------------------

GBD estimates always pertain to the mid-year or yearly average measurements of 
a population with a specific location, year, sex, and age, or an aggregation of 
some such populations. Thus, in the context of GBD, a risk exposure is a 
*distribution of individual exposure values* within a location-year-sex-age-
population.

If the exposure is dichotomous, for each location, sex, and year, GBD 
will estimate a continuous age trend of the proportion of, say, individuals with
BMI over 30. If the exposure is continuous, then GBD estimates the distribution of the 
exposure variable over the population in each age, sex, year, and location.

GBD's risk exposures will generally be less reliable than GBD cause-of-death 
models, and when designing a risk exposure, it is important to both learn from
the GBD modeler what the entity captured by their exposure model is.

	Take, for example, the GBD exposure *has ever experienced 
	intimate partner violence*. Barring incredibly high mortality rates among 
	IPV victims, we would expect the proportion of the population that has ever 
	experienced IPV to increase monotonically with age. However, survey data 
	consistenly reports this proportion to peak among 30-40 year olds, which is 
	refleced in the GBD model. We believe this phenomenon to be the result of 
	recall bias. When implementing this in a model, however, if we were to 
	initialize a population with dichotomous and persistent IPV exposure values 
	from GBD estimates and then allow the simulants to age for 10 years, our 
	exposure distribution would no longer match our reference data. Thus it 
	becomes clear that the entity we're describing needs to be "recollection of 
	IPV", "recent experience of IPV", or some other attribute that incorporates a 
	time component.

Risk exposures in Vivarium
--------------------------

In Vivarium, each simulant will be assigned an exposure value. We will 
typically derive these values from a population-level distribution provided by a 
GBD risk exposure.

Any given attribute that we are interested in may be codified in a variety of 
ways. The choices to make include which distribution to use, how to measure the 
risk, and what time frame within which to consider the risk. We include some 
examples below.

	Say we are modeling *BMI* as a risk exposure. BMI could be 
	included as a continuous variable, or binned into {<20, 20-25,>25}. This 
	decision will be based on the outcomes of interest and data availability.

	If we are interested in BMI as a risk for IHD, we might only be interested
	in current BMI. However, if we are modeling BMI as a risk for osteoporosis,
	it is possible that we will be interested in the cumulative history of 
	BMI.

	Assume we are intersted in capturing *smoking* as a risk exposure. If the 
	outcome of interest is lung cancer, we will be interested in a subject's 
	full history of smoking. This might include:

	a) if the subject has ever been a regular smoker

	b) if so, with what frequency per week the subject smoked cigarettes

	c) the type of cigarettes smoked

	We could decide to encode these as a dichotomous variable (a), a categorical 
	variable (b), and a second categorical variable (c), and include these as three 
	different risk exposures in our model. This will necessitate some set of 
	interactions that occur amongst the different exposures. Alternatively, we 
	might define the risk exposure *smoking score*, which is a function of (a) (b) 
	and (c), and which has some continuous or ordered categorical distribution.

Note that in each case our smoking model captures the same information, but in 
the former we push the complexity of quantifying different types of smoking 
histories to another part of the model, and in the former we wrap this 
complexity into the exposure component.


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

References
----------

.. [Exposure_definition_and_measurement] Developing a Protocol for Observational Comparative Effectiveness Res earch: A User's Guide.Agency for Healthcare Research and Quality (US), Jan 2013
   Retrieved 11 March 2020.
   https://www.ncbi.nlm.nih.gov/books/NBK126190/
