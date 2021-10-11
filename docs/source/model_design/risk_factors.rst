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

A risk factor is any attribute whose measure is *causally* related to the measure
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

.. note::

  For information regarding the definition of **causal relationships**, see the causal relationship section on the :ref:`General Epidemiology Research Considerations and Best Practices <general_research>` page.

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
  based on data from soda sales in a certain region, this uncertainty needs to
  be  incorporated into the model. Similarly, researchers generally must be
  concerned  with biases from factors such as underreporting in the data.
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
In epidemiological studies, risk effect is used to study the relationship
between risk exposures and outcomes. We are not only interested in whether
a link between a given risk exposure (e.g. smoking) and certain outcome
(e.g. lung cancer) is statistically meaningful, but also the magnitude of
this relationship. The effect of exposure can be measured both in relative
and absolute terms. The risk ratio, the rate ratio, and the odds ratio are
relative measures of effect. Risk difference is an absolute measure of effect
and it is calculated by subtracting the risk of the outcome in exposed group
from unexposed. [Measure_of_effect]_

Risk effect in GBD
^^^^^^^^^^^^^^^^^^
The measure of risk effect in GBD is usually reported in relative term, namely
relative risk. It describes the relative relationship between the risk of
disease Y in the presence of agent X versus in absence of X. Mathematically,
it's calculated by dividing the incidence rate (or other measure such as the
excess mortality rate) of the cause in exposed population by the incidence rate
(or other measure) of the cause in unexposed population for a certain risk factor.
For example, if there are A incident cases and B person-years in exposed group;
C incident cases and D person-years in unexposed group, then the relative risk
(rate ratio) equals :math:`\frac{AD}{BC}`. Note that there are exceptions as in
the low birth weight short gestation (LBWSG) risk factor where the relative risk
is the ratio of all-cause mortality rate (ACMR) rather than incidence rate we
mentioned above. Therefore, we'd better check with GBD modeller what relative
risk they refer to before we model any risk-outcome pair in vivarium.

Risk effect in vivarium
^^^^^^^^^^^^^^^^^^^^^^^
In vivarium, we used to build the risk-outcomes component in order to study the
impact of desired outcomes contributed by given risk exposure. The outcome might
be a cause (e.g. ischemic heart disease attributable to high body-mass index)
or a intermediate outcome (e.g. systolic blood pressure associated with BMI).
For a risk-cause pair, simulation model would link the incidence (or other measure
such as excess mortality rate) of that cause to the relative risk from GBD or
external data sources like literature evidence.

The mathematical expressions are mainly fall into two categories:
 - risk exposure is categorical distributed:
     - :math:`i_{exposed} = i \times (1-PAF) \times RR`
     - :math:`i_{unexposed} = i \times (1-PAF)`
     - :math:`PAF = \frac{E(RR_e)-1}{E(RR_e)}`
     - :math:`E(RR_e) = p \times RR + (1-p)`
 - risk exposure is continuous distributed:
     - :math:`i = i \times (1-PAF) \times RR^{max(e−tmrel,0)/scalar}`
     - :math:`PAF = \frac{E(RR_e)-1}{E(RR_e)}`
     - :math:`E(RR_e) = \int_{lb}^{ub}RR^{max(e−tmrel,0)/scalar}p(e)de`

Where,
 - :math:`e` stands for risk exposure level
 - :math:`i` stands for incidence rate
 - :math:`p` stands for proportion of exposed population
 - :math:`RR` stands for relative risk or incidence rate ratio
 - :math:`PAF` stands for population attributable fraction
 - :math:`E(RR_e)` stands for expected relatiev risk at risk exposure level e 
 - :math:`tmrel` stands for theoretical minimum risk exposure level
 - :math:`lb` stands for lower bound (2.5%)
 - :math:`ub` stands for upper bound (97.5%)
 - :math:`scalar` is a numeric variable used to convert risk exposure level to 
   a desired unit
 - :math:`p(e)` is probability density function used to calculate the probability 
   of given risk exposure level e

For a risk-mediator outcome, simulation model would map a probability
distribution of possible mediator exposure level to each measurement of
associated risk factor (e.g. there is X% chance you will observe a SBP
>= 100 mm Hg for given BMI of 25 in adults).

Direct and indirect risk effect
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In general, we would model the risk-outcomes that is directly correlated
(e.g. BMI -> IHD), but sometimes we consider add mediator to account for
indirect relationship between a risk-cause pair. (e.g. BMI -> SBP -> IHD)
In the example shown above, the direct effect is determined by risk effect
between BMI and IHD (:math:`\mu_{1}`) and the indirect effect is the product
of risk effect between BMI and SBP (:math:`\mu_{2}`) and risk effect between
SBP and IHD (:math:`\mu_{3}`). Therefore, the total risk effect is the sum of
direct and indirect effect, namely :math:`\mu_{1} + \mu_{2} \times \mu_{3}`
based on a linear approach. Note that we need to check with GBD modeler whether 
the relative risk from GBD the direct, indirect or total effects and then choose 
the appropriate one in our model.

.. image:: mediation_example_bmi.svg

Definitions
-----------

Theoretical Minimum Risk Exposure Level/Distribution (TMREL/D)
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

The **theoretical minimum risk exposure level (TMREL)** is the level of risk
exposure that would minimize the risk of an adverse outcome for an individual.
For example, the TMREL for smoking would be "has never smoked." The
corresponding concept on the population level is the **theoretical minimum risk
exposure distribution (TMRED)**, which is the distribution of risk exposure that
would yield the lowest possible population risk. For smoking, the TMRED would be
the `degenerate probability distribution`_ assigning everyone in the population
to the TMREL category "has never smoked." [WHO-Global-Health-Risks-Annex]_,
[GBD-2017-Risk-Appendix-Modeling-Risk-Factors]_

.. _degenerate probability distribution: https://en.wikipedia.org/wiki/Degenerate_distribution

.. todo::

  Add formal mathematical definitions of TMREL and TMRED.

As discussed in the :ref:`causality section <causal_relationships>` of the :ref:`general research page <general_research>`,
counterfactual analysis is used to describe the causal relationship between a
risk factor and an outcome. **The TMRED is a particular choice of counterfactual
exposure distribution** used for the causal attribution of disease burden to a
given risk factor in a population (see `Population Attributable Fraction
(PAF)`_). Other choices of counterfactual include the *plausible* minimum risk,
*feasible* minimum risk, and *cost-effective* minimum risk, each of which can
obviously depend on specific attributes of the population under consideration.
On the other hand, Murray et al. state in
[Comparative-quantification-health-risks-2003]_:

  "Biological principles as well as considerations of equity would necessitate
  that, **although the exposure distribution for theoretical minimum risk may
  depend on age and sex, it should in general be independent of geographical
  region or population.**"

However, the authors go on to add:

  "Exceptions to this are however unavoidable. An example would be the case of
  alcohol consumption, which in limited quantities and certain patterns, has
  beneficial effects on cardiovascular mortality, but is always harmful for
  other diseases such as cancers and accidents. In this case, the composition of
  the causes of death as well as drinking patterns in a region would determine
  the theoretical minimum distribution."

.. note::

  The above quote from [Comparative-quantification-health-risks-2003]_ is
  included to illustrate the subtleties in conceptualizing the TMREL as
  described by an original source advocating its use. **However, the description
  of the beneficial effects of alcohol is outdated**, as the latest research
  from `IHME <IHME alcohol study Lancet_>`_ and `Oxford <Oxford alcohol study
  preprint_>`_ shows that there is `no safe level of alcohol consumption`_.

  Based on more current research, here are some examples of risk factors with
  TMRELs that may depend on geography or population:

  - :ref:`Hemoglobin levels <2019_hemoglobin_anemia_and_iron_deficiency>` in
    the blood increase at high altitude, so the TMREL for hemoglobin
    concentration would be geography-dependent, with populations living at
    higher altitudes having a higher TMREL than those living at lower altitudes.
    GBD handles this situation not by explicitly defining different TMRELs, but
    rather by using altitude-adjusted hemoglobin data to estimate anemia
    prevalence.

  - High :ref:`Body Mass Index (BMI) <2019_risk_bmi>` is associated with
    increased risk of death in the general population, but it may be protective
    agianst some cancers and other chronic diseases (this phenomenon is termed
    the "`obseity paradox <obesity paradox cancer PubMed_>`_"). Thus, the
    optimal BMI (for minimizing overall risk) in a given population may depend
    on the leading causes of death or exposure to other risk factors in the
    population.

.. _IHME alcohol study Lancet: https://doi.org/10.1016/S0140-6736(18)31310-2

.. _Oxford alcohol study preprint: https://www.medrxiv.org/content/10.1101/2021.05.10.21256931v1

.. _no safe level of alcohol consumption: http://www.healthdata.org/news-release/new-scientific-study-no-safe-level-alcohol

.. _obesity paradox cancer PubMed: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5830139/

The smoking example `above <Theoretical Minimum Risk Exposure Level/Distribution
(TMREL/D)_>`_ illustrates two features of the TMREL that are typical of many
risk factors:

1. We imagine that everyone in the population has the same TMREL
2. The TMREL is *zero* or *no exposure*

However, neither of these conditions is necessary. In some cases, particularly
for continuous risk exposure variables, the TMREL may be a nonzero exposure
level. Moreover, there may be multiple TMRELs experienced by different members
of the population. For example, in GBD 2017 [GBD-2017-Risk-Appendix-Modeling-Risk-Factors]_:

1.  The TMREL for radon exposure is taken to be 10 `Bq
    <https://en.wikipedia.org/wiki/Becquerel>`_/m\ :superscript:`3`, which is
    equivalent to the average outdoor concentration of radon [ICRP]_.
2.  The :ref:`Low Birth Weight and Short Gestation <2017_risk_lbwsg>` risk
    factor has multiple TMREL categories since healthy babies have many
    different birth weights and gestational ages.

These examples illustrate some complexities in defining the TMREL and TMRED for
a given risk factor. For continuous risk exposure variables --- such as radon
exposure, or hemoglobin concentration, or systolic blood pressure --- it may be
impossible to define a single TMREL for the population, as we expect different
individuals to have different radon exposure levels or hemoglobin levels or
blood pressures, even in a theoretical population where risk is minimized. In
this case the TMRED will be a nontrivial probability distribution. For example,
a plausible TMRED for radon exposure would be some probability distribution of
positive radon exposure levels concentrated near the point 10 Bq/m\
:superscript:`3`. We will further discuss this point below.

.. todo::

  Add a more in-depth discussion of TMREDs for continuous exposure variables,
  based on systolic blood pressure example in [Estimating-Attributable-Burden]_.

  Also, say something about whether there should be different TMRELs for
  different risk-outcome pairs, and how GBD handles this.

  Add some discussion of issues brought up in `PR 153
  <https://github.com/ihmeuw/vivarium_research/pull/153>`_:

  - More in-depth description of counterfactual scenario, where one risk is set
    to the TMRED, but everything else is held constant, including exposure to
    other risk factors. Note that causally affected risk exposures would also
    change, as in the case of mediation (see BMI, SBP, mortality example in PR).

  - Mention approaches other than TMREL/D, e.g. No observed adverse effect
    level (NAOEL) and Lowest observed adverse effect level (LOAEL), and
    methods from cost-analysis.

  - Operationally, GBD only defines one TMRED for each risk factor, rather than
    one for each risk-outcome pair.

  - GBD assumes risks are monotonic (is that still true with splines in GBD
    2019+?), but this is not necessarily true (for example: BMI, sodium).

  - Clarify discussions of TMREL/D that depends on geography and/or biological
    features of the population, and of definitions of TMREL/D for population vs.
    individual (formal mathematical definitions should help with this).

  Fix broken links in citations [WHO-Global-Health-Risks-Annex]_ and
  [Estimating-Attributable-Burden]_.

Relative Risk (RR)
++++++++++++++++++

Measures of occurence
^^^^^^^^^^^^^^^^^^^^^

This is a recap: Epidemiology is the study of the distribution and determinants of disease frequency in human populations. Simply put, it is the study of the *occurence* of illness. Measures of disease frequency are tools to describe how common an illness is (or outcome of an event) with reference to the size of the population at risk. They are used to count cases, in relation to a population and to a measure of time. Outcomes can be infection, disease, disability, death, other risk-exposures, recovery or usage of health care.

There are two main measures of disease occurence/frequency: **prevalence** and **incidence**. Incidence quantifies the occurence of new cases of disease whereas prevalence, a measure of status rather than newly occuring disease, quantifies existing cases. New cases are called **incident cases** and existing cases are called **prevalent cases**.

.. todo::

  link to the other doc on incidence and prevalence? how do we thin this down?

  :ref:`prevalence and incidence <models_cause>`

Example:

  * Measure of incidence: 124.2 out of 100,000 women developed breast cancer in the USA in 2016.
  * Measure of incidence: A study of 3000 children in selected rural areas of Ethiopia looked at the levels of disease and death caused by diarrhoea. It found 4 deaths of diarrhoea per 1,000 children per year. The same study found 360 episodes of diarrhoea per 100 children per year.
  * Measure of prevalence: 20.7% of women attending antenatal care at rural clinics Siaya county, western Kenya were HIV positive in 2015

Prevalence
^^^^^^^^^^
Prevalence focuses on existing states. Prevalence of a state (such as the 'with condition state') at a point in time may be defined as the proportion of a population in that state at that time; thus prevalence is the proportion of persons in a defined population that have the outcome under study in a defined period of time. Prevalence is a proportion and has no time units. However, the point in time to which it refers must always be specified. The term ‘prevalence rate’ is often wrongly used instead of ‘prevalence’. Prevalence is, by definition, a proportion not a rate.

*Point prevalence* is the number of current cases (new and pre-existing) at a defined instant in time. The denominator is the population at the same defined instant in time. This measure is called point prevalence because it refers to a single point in time. It is often referred to simply as prevalence.

Examples:

    * the percentage of people with schistosomiasis parasites in the blood in a village in Kenya in a survey on 12th  December 2019
    * the proportion of people who have diabetes in China today
    * The proportion of the population experiencing a diarrhoea day (3 or more loose or liquid stools per day) at the time of interest, e.g. the day of a surveillance visit or the day before.

+------------------------+-----------------------------------------------+
|   Measure              | Math                                          |
+------------------------+-----------------------------------------------+
| Point prevalence       |:math:`\frac{\text{number of current cases in  |
|                        |a defined population at a point in time}}      |
|                        |{\text{number of people in the defined         |
|                        |population at the same time point}}`           |
+------------------------+-----------------------------------------------+

*Period prevalence* is the proportion of persons in the population who have the disease (new and pre-existing cases) over a defined period of time. The denominator is the average or mid-period population. This measure is used when the condition is recurrent and non-fatal.

Examples:

    * The proportion of women who have used oral contraceptives at any time during the 12-month period preceding the day of the survey.
    * The proportion of the population experiencing at least 1 day with diarrhoea over a pre-defined time window (recall period) prior to a given point in time, e.g. a surveillance visit by the study team.

+------------------------+-----------------------------------------------+
|   Measure              | Math                                          |
+------------------------+-----------------------------------------------+
| Period prevalence      |:math:`\frac{\text{number of current cases in  |
|                        |a defined population at over a period of time}}|
|                        |{\text{average or mid-period population}}`     |
+------------------------+-----------------------------------------------+

Because of these dynamic changes, the magnitude of the prevalence varies from one point in time to another as illustrated by the following diagram:

    .. image:: prevalence_diagram.svg

.. note::

    In our vivarium models, we estimate the **period prevalence** of condition as

            :math:`\frac{\text{person-time in with-condition state}}{\text{total person time for age, sex, location, year}}`


The *prevalence pool* is the subset of the population who is in the given state (such as the 'with-condition state'). A person who dies from the state is removed from the prevalence pool: death decreases prevalence. People can also exit the prevalence pool by recovering from the state (remission) or emigrating from the population. Diseases with high incidence rates may have low prevalence if they are rapidly fatal or quickly cured. Conversely, diseases with low incidence rates may have substantial prevalence if they are nonfatal but incurable.

.. note::

    Prevalence is seldom of direct interest in etiological applications of epidemiological research because it reflects both incidence rate and duration of disease. However, for congentical diseases, prevalence is the measure usually employed. This the birth prevalence. The incidence of the condition that causes the congenital condition would have occured in the pregnant mother, which only becomes apparent when the baby is born.

Incidence
^^^^^^^^^
The number of cases of a condition present in a population at a point in time depends not only on the frequency with which new cases occur and are identified, but also on the average duration of the condition (i.e.remission, mortality). As a consequence, prevalence may vary from one population to another solely because of variations in duration of the condition. Prevalence is therefore not the most useful measure when attempting to establish and quantify the determinants of disease; for this purpose, a measurement of the flow of new cases arising from the population is more informative. Incidence focuses on new cases. There are three main measures of incidence: **risk**, **rate**, and **odds**.

Risk
****

**Incidence risk**, also called *incidence proportion*, *attack rate*, or *cumulative incidence* is the probability of occurence of disease among a disease free, at risk, population during a specified time period. It is the number of new cases of disease during a defined period of time divided by the population at the start of the time period. Like any proportion, risk has no time units but the time period to which it applies must be specified, otherwise it is not interpretable. The survival proportion is 1 minus incidence proportion.

+------------------------+-----------------------------------------------+
|   Measure              | Math                                          |
+------------------------+-----------------------------------------------+
|| Incidence risk        |:math:`\frac{\text{new cases of disease during |
|| Incidence proportion  |time period}}{\text{disease free, at risk,     |
|| Attack rate           |population at the start of the time period}}`  |
|| Cumulative incidence  |                                               |
+------------------------+-----------------------------------------------+

Example:

  * A group of 5000 healthy women aged 45–75 years was identified at the beginning of 1981 and followed up for five years. During this period, 20 new cases of breast cancer were  detected. Hence, the risk of developing breast cancer in this population during this five-year period was 20/5000 = 0.4%.
  * A total of 13 264 lung cancer cases in males were diagnosed in a certain population in 1971. These cases were followed up for five years. At the end of this follow-up period, only 472 cases were still alive. The probability of surviving during this five-year period was 472/13 264 = 3.6%. Thus, the probability of dying during the period was 100% – 3.6% = 96.4%.

In the second example, the measures are risks, as they represent the proportion of lung cancer cases who were still alive (or who died) at the end of the follow-up period out of all cases diagnosed at the beginning of the study. These calculations assume that all individuals were followed up for the entire five-year period (or until death if it occurred earlier). These measures are often called survival and fatality ‘rates’; this is incorrect as, by definition, they are proportions. Risk is a measure commonly used to quantify the survival experience of a group of subjects.

Odds
****

Another measure of disease occurence or frequency is odds of disease, which is the ratio of the total number of cases to the total number of persons who remained disease free over the study period.

+------------------------+-----------------------------------------------+
|   Measure              | Math                                          |
+------------------------+-----------------------------------------------+
|  Incidence odds        |:math:`\frac{\text{new cases of disease during |
|                        |time period}}{\text{people who remained disease|
|                        |-free during the time period}}`                |
|                        +-----------------------------------------------+
|                        |can be derived to become :math:`\frac{\text    |
|                        |{risk}}{\text{1-risk}}`                        |
+------------------------+-----------------------------------------------+

.. note::
  Risk and odds of disease use the same numerator (number of new cases) but different denominators. In the calculation of risk, the denominator is the total number of disease-free individuals at the beginning of the study period, whereas when calculating the odds of disease, it is the number of individuals who remained disease-free at the end of the period.

Rate
****

**Incidence rate** has the same numerator as incidence risk, that is the appearance of new cases. In contrast to risks, which relate the number of new cases to the size of the population at risk in the beginning of the period studied, rates relate the number of new cases to the person-time (Y) at risk, a measure that takes into account changes in the size of the population at risk during the follow-up period. The rate takes into account the fact that some people who start at risk do not remain at risk during the whole period, because they develop the disease, or die, or leave the population by migrating, refusing to continue to participate in the study etc. Others may join the population at risk after the beginning of the period, through birth, migration into the area, recruitment into the study, etc. The denominator in a rate (Y) is thus the sum of the time each person in the study population remained at risk during the study period. This is called the person-time experience at risk, and is expressed in units of person-time: person-years at risk, person-days at risk, baby-weeks at risk etc.

For rare diseases, risk and rates are numerically similar.

.. todo::

  example of how this is so


+------------------------+-----------------------------------------------+
|   Measure              | Math                                          |
+------------------------+-----------------------------------------------+
| | Incidence rate       |:math:`\frac{\text{new cases of disease during |
| | Incidence density    |time period}}{\text{total person-time at       |
| | Force of morbidity or|risk during time period}}`                     |
| | mortality            |                                               |
+------------------------+-----------------------------------------------+

.. todo::

   James says: give example and how the time period needs to be specified.
   Has this been addressed in the examples?

Relationship between rate and risk
**********************************

Risk depends on both the incidence rate and on the duration of the at-risk period. In vivarium, we apply the incidence rate to each simulant at each time step to estimate the risk of developing disease where the duration of the period is the duration of the time-step:

    Risk = :math:`1 – e^\text{( –incidence rate × duration of the period at risk)}`

For disease that have a low incidence rate or when the period at risk is short, the following approximation can be used:

    Risk = incidence rate × duration of the period at risk.

Example:

  * The incidence rate of a particular condition in a population is 50 per 100 000 person-years. The risk for an individual in this population of developing this condition during a five-year period (assuming no other causes of death) is given by

      - 5-year risk = :math:`1 – e^\text{( –0.0005 per person-year × 5 years)}` = 0.25%
        | The simplified equation can yield the same result
      - 5-year risk=0.0005 per person-year X 5 years = 0.25%
  * Consider now a common condition with an incidence rate of 300 per 1000 person-years

      - 5-year risk = :math:`1 – e^\text{( –0.3 per person-year × 5 years)}` = 78%
        | The simplified equation does not yield the same result
      - 5-year risk = 0.3 per person-year X 5 years = 150%

Measures of effect
++++++++++++++++++

Measures of effect are used to compare the frequency of outcome between specified populations. When one population group is exposed to a risk factor and the other is not, measures of effect can be used to study associations between frequency of disease and the risk factor. They reflect the increase or decrease in frequency of disease in one population in comparison with another. Frequency measures (e.g. risks, rates) can be compared by estimating their *ratios* or *differences*.

Ratio measures
^^^^^^^^^^^^^^
Ratio measures estimate how many times more common a disease is in one population compared with another; they provide a measure of the *magnitude* of the effect of a risk factor on incidence of disease. The effect of the risk factor can be also be measured on cause-specific mortality, or all cause-mortality.

It is possible to compare any type of measure of frequency (e.g. risks, rates) between two populations. For example, the rate ratio (RR) compares the rate of disease between two groups. Similarly, the risk ratio and the odds ratio (OR) compare risks and odds between two groups respectively. For rare diseases, risks and rates tend to be numerically similar, so rate ratios and risk ratios tend also to be numerically very similar. The term ‘relative risk’ is often used to mean either the rate ratio or risk ratio (or sometimes even the odds ratio). However, it is always better to be specific about which ratio measure you are using, to avoid confusion.

In GBD, relatives risks are usually ratio of incidence rates of causes in those exposed vs unexposed to the risk factor. However, there are exceptions as in the low birth rate short gestation (LBWSG) risk factor where the relative risks are ratios of all-cause mortality rates. It is best practice to always check with the risk appendix or the GBD modeller what the relative risks refer to each risk-outcome pair.

.. todo::

      write down numerator and denominator. Has this been adequately addressed with the equations written out below?

For example (hypothetical- cite my brain), a study was conducted to measure the effect of vitamin A food fortification on incidence of measles in children under 5. GBD defines risk factors to be malignant. Hence, the exposed group (exposed to poor nutrition) are those who are not covered by food fortification while those unexposed are covered by food fortification. The table below shows the results:

+----------+----------+--------------+-----------------+
|          | Incident | Person-years | Rate per 100,000|
|          | cases    | at risk      | person-years    |
+----------+----------+--------------+-----------------+
|Exposed   |     2    |  2000        |     100         |
+----------+----------+--------------+-----------------+
|Unexposed |     1    |  2500        |     40          |
+----------+----------+--------------+-----------------+

| :math:`rate_{1}` is the rate disease in the exposed group (no fortified foods)
| :math:`rate_{0}` is the rate of disease in the unexposed group (with fortified foods)
| The **rate ratio** is thus :math:`\frac{rate_1}{rate_0} = \frac{100}{40} = 2.5`

This is interpreted as: 'children who do not eat foods fortified by vitamin A food are 2.5 times more likely to get measles than children who eat vitamin A enriched foods'.

Alternatively, we can compute the risk ratio for a disease as follows:

+----------------+---------+----------+----------+
|                | Exposed |Unexposed | Total    |
+----------------+---------+----------+----------+
|With disease    |  a      |  b       | a+b      |
+----------------+---------+----------+----------+
|Without disease |  c      |  d       | c+d      |
+----------------+---------+----------+----------+
|                | a+c     | b+d      | a+b+d+c  |
+----------------+---------+----------+----------+

| :math:`risk_{1}` is the risk of having disease in the exposed: :math:`\frac{a}{a+c}`
| :math:`risk_{0}` is the risk of having disease in the unexposed: :math:`\frac{b}{b+d}`
| The **risk ratio** is thus :math:`\frac{risk_1}{risk_0} = \frac{a/(a+c)}{b/(b+d)}`

This is interpreted as: 'there are X times more cases of measles among children who do not eat vitamin A fortified foods than those who eat vitamin A fortified foods'

We might need to use the odds ratio to measure effect of an exposure on rare diseases using a case-control design. Because the disease is rare, we will need to follow a lot of people for a long time before we see an incident cases. It would be easier to actively find the rare cases and then look at whether they have been exposed or not.

If we want to compute the odds ratio:

| :math:`odds_{1}` is the odds of disease in the exposed: :math:`\frac{a}{c} = \frac{risk_1}{1-risk_1}`
| :math:`odds_{0}` is the odds of disease in the unexposed: :math:`\frac{b}{d} = \frac{risk_0}{(1-risk_0)}`
| The **odds ratio** is thus: :math:`\frac{ad}{bc} = \frac{risk_1/(1-risk_1)}{risk_0/(1-risk_0)}`

If the disease is rare and not recurrent, then the risk ratio, the rate ratio and the odds ratio are numerically similar. Odds ratios are often derived from case-control studies in which people with and without the outcome of interest are compared for their exposure. Depending on how the controls were sampled the odds ratio in a case control study can be equivalent to the risk of rate ratios that would have been obtained if the whole population had been studied.

.. todo::

  give example how they are similar
  DISCUSS CASE-CONTROL STUDIES- should we do another section on study designs?


To summarize, relative risks can be:

  1. Risk ratio: probability of disease in exposed/probability of disease in unexposed
  2. Rate ratio: incidence rate of disease in exposed/ incidence rate of disease in unexposed
  3. Odds ratio: odds of disease in exposed/odds of disease in unexposed

  If the relative risk is >1, the exposure is harmful. If the relative risk is <1, the exposure is protective. In GBD, we define risks as harmful and so we always use >1 relative risks.

Difference measures
^^^^^^^^^^^^^^^^^^^

Difference measures are used to estimate the *excess* risk of disease caused by a risk factor *among the exposed group*. That is, difference measures of effect estimate how much of the
disease in the exposed group was due to the risk factor of interest. Two commonly used difference measures of effect are the risk difference and the risk difference percent.

*Risk difference* (RD) is the absolute differene between two risks. This is calculated by subracting the risk in the unexposed group :math:`risk_{0}` from the risk in the exposed group :math:`risk_{1}`:

    Risk difference (RD) = risk in exposed :math:`risk_{1}` - risk in unexposed :math:`risk_{0}`

Similary, the rate difference is calculated by subtracting the rate in the unexposed from the rate in the exposed.

Example:

  A study measured the risk of HIV infection among children born to HIV-infected mothers,according to whether the babies were breastfed or not. Among non-breastfed children of HIV infected mothers, the risk of HIV infection was 150 infections per 1000 children. Among breastfed babies, the risk was 280 infections per 1000 children. The risk difference was thus 130 infections per 1000 children (130 = 280 - 150). The interpretation is that the risk factor, in this case breastfeeding, was responsible for the infection of 130 of every 1000 children born to, and breastfed by, HIV-infected mothers. Notice that the risk difference retains the same units as the original risks used to calculate it. Thus, if the risk in the exposed and unexposed groups is measured in ‘cases per 1000 persons’, then the risk difference will have the same units.

In most situations, where disease is not very common, risk differences and rate differences will be numerically similar. (Note that in the above example, HIV infection was common among study participants, so risk and rate differences would be unlikely to be similar.) In the literature, the risk difference is sometimes called the *attributable risk* or *excess risk*. Similarly, the terms attributable rate or excess rate are sometimes used to mean the rate difference.

The *risk difference percent* (RD%) measures the proportion of cases in the exposed group that are due to the exposure. That is, the RD% is the excess risk among the exposed expressed as a proportion (or percentage) of the risk in the exposed group. It is calculated by dividing the risk difference by the risk among the exposed:

    Risk difference % = :math:`\frac{risk_1-risk_0}{risk_1}`

For example, the RD% from the above example is :math:`\frac{(280/1000) - (150/1000)}{280/1000} = 0.46` or 46%

We interpret this by saying breastfeeding was responsible for 46% of HIV infections among children born to, and breastfed by, HIV-infected mothers (the exposed). Note that this does not mean that breastfeeding is responsible for 46% of HIV infections among children born to HIV-infected mothers. Measures of effect tell us only about the additional risk of disease among exposed individuals (here, children of HIV-infected mothers who were breastfed) compared with unexposed individuals. In order to estimate how important breastfeeding is as a risk factor for HIV in the target population (here, children born to HIV-infected mothers), we would also need to have information on how common the risk factor is in the population (i.e., what proportion of children born to HIV-infected mothers are breastfed), see next section. The RD% is sometimes also called the *attributable fraction in the exposed*, or the *aetiologic fraction in the exposed*.

Ratios versus differences: which is more appropriate?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Ratio measures and difference measures tell us very different things. Ratio measures are used to summarise the strength of association between a risk factor and an outcome. Difference measures, on the other hand, are used to summarise how much more disease is experienced by a group exposed to a risk factor of interest compared to an unexposed group. Assuming that the association between risk factor and disease is causal, difference measures can be used to estimate how much of a disease among the exposed can be attributed to exposure, or could be prevented by eliminating the risk factor. Note these measures only relate to the exposed group.

Difference measures relating to the whole population tend to be more useful and thus more widely used. These population difference measures, also called measures of impact. It is important to realise that ratios and differences can result in very different interpretations. For example, if an association between a risk factor and disease outcome is very strong in a particular group (high relative risks), but the outcome is relatively uncommon in this group, a big increase in risk will result in a modest increase in cases. Alternatively, if the outcome is common among a group, a small relative risk can lead to a large increase in cases. Ratio measures are most useful for determining which risk factors are most strongly associated with disease, whereas difference measures are more useful for estimating the public health importance of different risk factors.

Population Attributable Fraction (PAF)
++++++++++++++++++++++++++++++++++++++

Measures of population impact estimate the expected health impact on a population *if* the distribution of risk factors that cause disease in that population is changed or removed. In GBD, this means lowering the level of exposure to disease causing risk factors to that of the theoretical minimum risk exposure level (TMREL, see TMREL section). Measures of impact take into account both the **strength of the association** (estimated by a measure of effect, like the rate ratio) *and* the **distribution of the risk factor in the population**. Measures of impact assume that we have established that the association between disease and risk factor is *causal*. If this assumption is true, population impact estimates measure how much of the disease in the population is caused by the suspected risk factor.

The population attributable fraction (PAF) is a measure of population impact. Intuitively, PAF equals (O − E)/O, where O and E refer to the observed number of cases and the expected number of cases under no exposure or a minimum exposure level, respectively. As an example, in early 1950, using the Doll and Hill case-control study of smoking and lung cancer deaths throughout England and Wales, Doll derived O = 11189 (observed number of cases in a population distributed with smokers and non-smokers) and E = 1875 (expected number of cases in a population of non-smokers). Therefore the smoking PAF for lung cancer deaths was (11189 − 1875)/11189= 83%; interpreted as 83% of lung cancer deaths was caused by smoking and if no one smoked, 83% of lung cancer cases can be avoided. The term “attributable” has a causal interpretation: **PAF is the estimated fraction of all cases that would not have occurred if there had been no exposure (or TMREL level of exposure)**.

It is important to remember that measures of population impact are **specific to the population studied**, and can **only be generalised to populations with exactly the same distribution of risk factors**. Also note that risk factors that are strongly associations but which are rare, like being exposed to an X-ray in pregnancy and leukaemia in childhood, may have a large measure of effect but small measure of impact.

There are two main measures of population impact: 1) population attributable risk (PAR) and 2) population attributable risk fraction (PAF).

Population attributable risk (PAR)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Example 2x2 risk table:

+----------------+--------------+--------------+---------------------+
|                | Exposed      | Unexposed     | Total              |
+----------------+--------------+--------------+---------------------+
|With disease    |  a           |  c           | a+c                 |
+----------------+--------------+--------------+---------------------+
|Without disease |  b           |  d           | b+d                 |
+----------------+--------------+--------------+---------------------+
|Total           | a+b          | c+d          | a+b+d+c             |
+----------------+--------------+--------------+---------------------+
|Risk            | r1 = a/(a+b) | r0 = c/(c+d) | r = (a+c)/(a+b+c+d) |
+----------------+--------------+--------------+---------------------+


The PAR is the absolute difference between the risk/rate in the whole population (r) and the risk/rate in the unexposed group (r0).

Population attributable risk (PAR) is calculated as

	PAR = r - r0
	Relative risk RR = r1/r0

	*Note* that the risk difference (RD) in the earlier section contrasts the rate/risk in the exposed group (r1) and the rate/risk in the unexposed group (r0 = r1-r0).

If we know the risks among the exposed (r1) and unexposed (r0), and the prevalence of exposure in the population ( :math:`p_p` )

.. math:: PAR = p_p (r1-r0)

where

.. math:: p_p = \frac{a+b}{a+b+c+d}

.. code-block:: Python

  The prevalence of exposure in the population is

  It can be shown that

  PAR = r - r0
      = (a+c)/(a+b+c+d) - c/(c+d)
      = (ad-bc)/[(a+b+c+d)(c+d)]

  PAR =  .. math:: p_p (r1-r0)
      = (a+b)/(a+b+c+d) x [(a/(a+b) - c/(c+d)]
      = (ad-bc)/[(a+b+c+d)(c+d)]

Population attributable risk fraction (PAF)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The population attributable fraction is a quantification of the proportion of a given cause outcome, such as cases, deaths, or DALYs, that could be eliminated by removing a risk exposure. It is the proportion of all cases in the whole study population (exposed and unexposed) that may be attributed to the exposure, assuming a causal association. The population attributable risk fraction (PAF) is estimated by dividing the population attributable risk by the risk in the total population (r).

   PAF = PAR/r

       = (r - r0) / r

When only the risk ratio (RR) and the **prevalence of exposure in the population** are known, PAF can also be written as:

.. math:: \text{PAF}=\frac{p_p(RR-1)}{1+p_p(RR-1)} ...(a)

Note that the PAF increases with the rate ratio θ, but also with the prevalence of exposure p. It will therefore vary between populations, depending on how common the
exposure is.

It is important to note the PAF in equation (a) will give us an accurate representation of the porportion of cases occuring in the total population that would be avoided if the exposure were removed only if the assumptions that 1) the observed association between exposure and disease is causal, and that 2) it is free from confounding and bias.

.. todo::

  I'm wondering if it is it possible to illustrate this using DAGs? or visually? I'll have a think

Although equation (a) is the best-known formula for the PAF and the one used in GBD PAF calculations, there is an alternative formulation which can be useful when we wish to take account of confounders and joint effects

If you know the **prevalence of exposure among cases** (:math:`p_c`) there is a very useful formula for PAF which can be used with risk or rate ratios that have been adjusted for confounding:

.. math:: \text{PAF}=\frac{p_c(RR_{adj}-1)}{RR_{adj}} ...(b)

The following diagram illustrates how the PAF is derived intuitively from the **prevalence of exposure among cases** (:math:`p_c`)

.. image:: PAF_intuitive_diagram.svg

However, it is not always possible to find the *prevalence of exposure among cases* (:math:`p_c`) and so equation (a) is used in our simulation models. This will introduce bias. The following section talks about the bias that occurs.

Bias in PAF Calculation
^^^^^^^^^^^^^^^^^^^^^^^

The PAF can be calculated using the following formula:

.. math::
	:label: exposed_cases_paf_eq

	\text{PAF}=\frac{p_c(RR_{adj}-1)}{RR_{adj}}

In which we define :math:`p_c` to be the proportion of cases (individuals who
possess the outcome of interest) that are exposed, and :math:`RR_{adj}` has been adjusted for confounding and effect modification.

There is the a second PAF equation, which can be used *in the absence of
confounding or effect modification:*

.. math:: \text{PAF}=\frac{p_p(RR_{cr}-1)}{1+p_p(RR_{cr}-1)} =\frac{p_p(RR_{adj}-1)}{1+p_p(RR_{adj}-1)}
	:label: exposed_population_paf_eq

Note that here, the crude relative risk :math:`(RR_{cr})` is equivalent to the adjusted :math:`(RR_{adj})`. We define :math:`p_p` to be the proportion of the entire
population that is exposed.

This is typically easier to conceptualize if we break the population down as
follows:

.. list-table:: Exposure x Cases
	:widths: 1 1 1
	:header-rows: 1
	:stub-columns: 1
	:align: center

	* -
	  - Cases
	  - Non-cases
	* - Exposed
	  - a
	  - b
	* - Unexposed
	  - c
	  - d

Observe that the above table is a full partition of our population. We can see
then that the proportion of cases that are exposed is given by:

..	math:: p_c=\frac{a}{a+c}

And the proportion of the entire population that is exposed is given by:

.. math:: p_p = \frac{a+b}{a+b+c+d}

It can be shown that when the fraction of cases in the unexposed times the
relative risk :math:`\left( \frac{c}{c+d} \cdot RR_{adj} \right)` equals the fraction
of cases in the exposed :math:`\left( \frac{a}{a+b} \right)`, i.e., when there
are no confounders or effect modifiers, equation :eq:`exposed_cases_paf_eq` equals equation :eq:`exposed_population_paf_eq`.

However, when :math:`\frac{c}{c+d} \cdot RR_{adj} \neq \frac{a}{a+b}`,
equation :eq:`exposed_cases_paf_eq` does *not* equal equation :eq:`exposed_population_paf_eq`. Intuitively, we can imagine
a confounder that is positively associated with
our exposure, holding all else constant. Then there will be a
disproportionately high number of cases among the exposed, and
:math:`\frac{c}{c+d} \cdot RR_{adj} < \frac{a}{a+b}`.

This can be solved via weighting equation :eq:`exposed_population_paf_eq` per stratum of our confounder or
effect modifier, yielding equation :eq:`stratified_paf_eq`:

.. math:: \text{PAF} = \sum_{i=1}^z W_i \frac{p_i(RR_i-1)}{1+p_i(RR_i-1)}
	:label: stratified_paf_eq

Here, for each stratum :math:`i` of our confounder or effect modifier,
:math:`p_i` is the proportion of the stratum that is exposed, :math:`W_i` is
the proportion of the cases in the stratum, and :math:`RR_i` is the
stratum-specific adjusted *RR*. Note that in the case of a confounder,
:math:`RR_{i}` will be equal across strata, and in the case of effect
modification, there will be a different :math:`RR_{i}` per stratum. More
information on confounding and effect modification can be found
in the section on :ref:`causal relationships<causal_relationships>`.

While we know equation :eq:`exposed_population_paf_eq` to be biased, we have had to use it in Vivarium
modeling due to insufficient data for use of equation :eq:`exposed_population_paf_eq` or :eq:`stratified_paf_eq`.

The following is a high-level summary of a the paper *Confounding and Bias in the
Attributable Fraction* by [Darrow]_, which examines the direction and
magnitude of this bias for different scenarios. This was achieved by generating synthetic
data with varying degrees of exposure prevalence, confounding, relative
risk for the disease (or cause), and prevalence of the confounder in the exposed
and unexposed groups. These scenarios were all examined for one dichotomous
confounder; however, Darrow then showed these results generalize to two
dichotomous confounders.

We consider PAF bias primarily in terms of the following ratio:

.. math:: \frac{\text{biased PAF}}{\text{unbiased PAF}}

Where the biased PAF is calculated using equation :eq:`exposed_population_paf_eq`, and the unbiased PAF is
calculated using equation :eq:`stratified_paf_eq`.

Direction
^^^^^^^^^

The direction of this bias was found to be fully determined by the confounding
risk ratio:

..	math:: \frac{RR_{crude}}{RR_{adj}}

Here, :math:`RR_{adj}` is the Mantel-Haensel adjusted RR. A positive *counfouding RR* (:math:`>1.0`) resulted in a negative
PAF bias, and a negative *confounding RR* (:math:`<1.0`) resulted in a positive
PAF bias.

Furthermore, the direction of the *confounding RR* is fully determined by :eq:`exposed_cases_paf_eq` the
direction of the association between the confounder and the exposure, and :eq:`exposed_population_paf_eq`
the direction of the association between the confounder and disease (or cause).

This relationship is captured as follows:

.. list-table:: Direction of Bias in the PAF
	:widths: 4 4 3 3
	:header-rows: 1

	* - Confounder-exp \n assoc.
	  - Confounder-cond'n assoc.
	  - Confouding ratio
	  - PAF bias
	* - :math:`+`
	  - :math:`+`
	  - :math:`>1.0` :math:`(+)`
	  - :math:`-`
	* - :math:`-`
	  - :math:`-`
	  - :math:`>1.0` :math:`(+)`
	  - :math:`-`
	* - :math:`-`
	  - :math:`+`
	  - :math:`<1.0` :math:`(-)`
	  - :math:`+`
	* - :math:`+`
	  - :math:`-`
	  - :math:`<1.0` :math:`(-)`
	  - :math:`+`

Magnitude
^^^^^^^^^

The magnitude of the PAF bias was shown to **increase** with:

	- lower exposure prevalence

	- smaller :math:`RR_{adj}` for the disease (or cause)

	- magnitude of the *confounding RR*

The first two factors are intuitive: observe that in our measure of bias,
:math:`\frac{\text{biased PAF}}{\text{unbiased PAF}}`, a smaller exposure
prevalence will lead to a smaller true PAF in the denominator, amplifying the
bias. Similarly, a smaller :math:`RR_{adj}` will also result in a smaller true PAF, again
amplifing the bias.

However, when examining the absolute difference between the biased and unbiased
PAFs, note that Darrow did not find that lower exposure prevalence necessarily
caused a larger *absolute* PAF bias.

For the *confounding RR*, we note that by "magnitude" we mean distance from
*confounding RR* =1. That is, as a *confouding RR* <1 decreases, it causes an
increased **overestimation** of the PAF, and as a *confounding RR*>1 increases,
it causes an increased **underestimation** of the PAF.

Darrow states that the amount of bias under most realistic scenarios is on the
order of 10%-20%. Note that this percentage describes the percentage difference
between the biased and unbiased PAF. That is, if the true PAF is 50%, and the
biased PAF is 40%, we characterize this as a 20% negative bias.

Below we include graphs from the paper illustrating PAF bias as a function of
exposure prevalence and RR.

    .. image:: darrow_confounding_figures.jpg

Other sources of bias
^^^^^^^^^^^^^^^^^^^^^

Darrow concludes by noting that the PAF is highly sensitive to the relative
risk, exposure prevalence, and distribution of confounders. Thus when relative
risk and exposure prevalence data is collected from published papers, if one
tries to apply these measures to a target population with different population
characteristics and without sufficient data to correctly calculate the PAF, the
bias caused by the differing distributions between the study and target
populations can result in vastly more bias than that of using the wrong PAF
equation.

Estimation of the PAF in epidemiological studies
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. todo::

  detail this section more and give modified PAF for each study design

Cohort studies: Simplest situation, since disease rates in exposed and unexposed can be measured directly
Cross-sectional studies: Prevalence of a disease state is measured, rather than its incidence.
Unmatched case-control studies: Ratio of two proportions, given independent samples
Matched case-control studies: Can use alternative equation in this case, providing the cases can be regarded as a representative sample of all cases.
Exposure with multiple levels: Estimate the proportion of cases attributable to each level of exposure, the proportion of cases that would be avoided if the rate of disease in each exposure group were reduced to that in the unexposed (or baseline) group.
There are some caveats to the cohort studies estimation of PAF, if exposed and unexposed cohorts have been sampled separately for the study. A separate estimate of p or p’ will be required.

In cross-sectional studies, this is also known as the proportion of prevalent cases in the population. There are some potential issues this type of study of interpreting prevalence rather than incidence cases. If an exposure is associated with increased prevalence of disease, it could be because the exposure increases the risk of developing the disease, or because it increases the amount of time a person has the disease, or even because it increases survival from the disease.

This use of PAF is recommended for chronic disease states.

References
----------

.. [Darrow] Confounding and bias in the attributable fraction, Jan 2011
	https://www.ncbi.nlm.nih.gov/pubmed/20975564

.. [Exposure_definition_and_measurement] Developing a Protocol for Observational Comparative Effectiveness Research: A User's Guide.Agency for Healthcare Research and Quality (US), Jan 2013
   Retrieved 11 March 2020.
   https://www.ncbi.nlm.nih.gov/books/NBK126190/

.. [Measure_of_effect] Measures of Effect: Relative Risks, Odds Ratios, Risk Difference, and 'Number Needed to Treat'
   Retrived 19 March 2020.
   https://pubmed.ncbi.nlm.nih.gov/17653136/

.. [WHO-Global-Health-Risks-Annex]

  `Annex A: Data and methods
  <https://www.who.int/healthinfo/global_burden_disease/GlobalHealthRisks_report_annex.pdf>`_
  in :title:`Global Health Risks: Mortality and burden of disease attributable
  to selected major risks`. World Health Organization. 2009.
  https://www.who.int/healthinfo/global_burden_disease/global_health_risks/en/

.. [Comparative-quantification-health-risks-2003]

  Murray, C.J., Ezzati, M., Lopez, A.D. et al. Comparative quantification of
  health risks: Conceptual framework and methodological issues. :title:`Popul
  Health Metrics` 1, 1 (2003). https://doi.org/10.1186/1478-7954-1-1

.. [Estimating-Attributable-Burden]

  `Chapter 25: Estimating attributable burden of disease from exposure and
  hazard data
  <http://www9.who.int/publications/cra/chapters/volume2/2129-2140.pdf>`_ by
  Stephen Vander Hoorn, Majid Ezzati, Anthony Rodgers, Alan D. Lopez and
  Christopher J.L. Murray. In :title:`Comparative Quantification of Health
  Risks: Global and Regional Burden of Disease Attribution to Selected Major
  Risk Factors`. World Health Organization. 2004.
  http://www9.who.int/publications/cra/en/

.. [GBD-2017-Risk-Appendix-Modeling-Risk-Factors]

  `Supplementary appendix 1 <Risk appendix on ScienceDirect_>`_ to the **GBD
  2017 Risk Factors Capstone**: GBD 2017 Risk Factor Collaborators. Global,
  regional, and national comparative risk assessment of 84 behavioural,
  environmental and occupational, and metabolic risks or clusters of risks for
  195 countries and territories, 1990–2017: a systematic analysis for the Global
  Burden of Disease Study 2017. :title:`The Lancet`. 8 Nov 2018; 392: 1923-94.
  doi: http://dx.doi.org/10.1016/S0140-6736(18)32225-6.

.. _Risk appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322256-mmc1.pdf

.. [ICRP]

  `Radon: Units of Measure <http://icrpaedia.org/Radon:_Units_of_Measure>`_.
  International Commission on Radiological Protection.
