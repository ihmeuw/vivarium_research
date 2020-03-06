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

Measures of occurence
+++++++++++++++++++++

This is a recap: Epidemiology is the study of the distribution and determinants of disease frequency in human populations. Simply put, it is the study of the *occurence* of illness. Measures of disease frequency are tools to describe how common an illness is (or outcome of an event) with reference to the size of the population at risk. They are used to count cases, in relation to a population and a measure of time. Outcomes can be infection, disease, disability, death, recovery or usage of health care. 

There are two main measures of disease occurence/frequency: prevalence and incidence. Incidence quantifies the occurence of new cases of disease whereas prevalence, a measure of status rather than newly occuring disease, quantifies existing cases. New cases are called incident cases and existing cases are called prevalent cases. 

Example: 
1. Measure of incidence: 124.2 out of 100,000 women developed breast cancer in the USA in 2016.
2. Measure of incidence: A study of 3000 children in selected rural areas of Ethiopia looked at the levels of disease and death caused by diarrhoea. It found 4 deaths of diarrhoea per 1,000 children per year. The same study found 360 episodes of diarrhoea per 100 children per year.
3. Measure of prevalence: 20.7% of women attending antenatal care at rural clinics Siaya county, western Kenya were HIV positive in 2015

Incidence
^^^^^^^^^
Incidence focuses on new cases. There are two measures of incidence: risk and rate. 

*Incidence risk*, also called *incidence proportion*, *attack rate*, or *cumulative incidence* is the probability of occurence of disease among a disease free, at risk, population during a specified time period. It is the number of new cases of disease during a defined period of time divided by the population at the start of the time period. It is not interpretable without specification of the time period to which it applies. The counterfactual of the incidence proportion is the survival proportion which is 1-incidence proportion.                                                 

*Incidence rate* has the same numerator as incidence risk, that is the appearance of new cases. In contrast to risks, which relate the number of new cases to the size of the population at risk in the beginning of the period studied, rates relate the number of new cases to the person-time (Y) at risk, a measure that takes into account changes in the size of the population at risk during the follow-up period. The rate takes into account the fact that some people who start at risk do not remain at risk during the whole period, because they develop the disease, or die, or leave the population by migrating, refusing to continue to participate in the study etc. Others may join the population at risk after the beginning of the period, through birth, migration into the area, recruitment into the study, etc. The denominator in a rate (Y) is thus the sum of the time each person in the study population remained at risk during the study period. This is called the person-time experience at risk, and is expressed in units of person-time: person-years at risk, person-days at risk, baby-weeks at risk etc.

For rare diseases, risk and rates are numerically similar. 

Prevalence
^^^^^^^^^^
Prevalence focuses on existing states. Prevalence of a state (such as the 'with condition state') at a point in time may be defined as the proportion of a population in that state at that time; thus prevalence is the proportion of persons in a defined population that have the outcome under study in a defined period of time. 

*Point prevalence* is the number of current cases (new and pre-existing) at a defined instant in time. The denominator is the population at the same defined instant in time. Eg. the percentage of people with schistosomiasis parasites in the blood in a village in Kenya in a survey in December 2019; the proportion of people who have diabetes in China today. 

*Period prevalence* is the number of current cases (new and pre-existing) over a defined period of time. The denominator is the average or mid-period population. 

The *prevalence pool* is the subset of the population who is in the given state (such as the 'with condition state'). A person who dies from the state is removed from the prevalence pool: death decreases prevalence. People can also exit the prevalence pool by recovering from the state (remission) or emigrating from the population. Diseases with high incidence rates may have low prevalence if they are rapidly fatal or quickly cured. Conversely, diseases with low incidence rates may have substantial prevalence if they are nonfatal but incurable. 

Prevalence is seldom of direct interest in etiological applications of epidemiological research because it reflects both incidence rate and duration of disease. However, for congentical disesases, prevalence is the measure usually employed. In our simulations, we call this the birth prevalence. 

Measures of effect
++++++++++++++++++

Measures of effect are used to compare the frequency of outcome between specified populations. When one population group is exposed to a risk factor and the other is not, measures of effect can be used to study associations between frequency of disease and the risk factor. They reflect the increase in frequency of disease in one population in comparison with another. Frequency measures (e.g. risks, rates) can be compared by estimating their *ratios* or *differences*. 

Ratio measures (relative risk)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Ratio measures estimate how many times more common a disease is in one population compared with another; they provide a measure of the *magnitude* of the effect of a risk factor on incidence of disease. The effect of the risk factor can be also be measured on cause-specific mortality, or all cause-mortality. 

It is possible to compare any type of measure of frequency (e.g. risks, rates) between two populations. For example, the rate ratio (RR) compares the rate of disease between two groups. Similarly, the risk ratio and the odds ratio (OR) compare risks and odds between two groups respectively. For rare diseases, risks and rates tend to be numerically similar, so rate ratios and risk ratios tend also to be numerically very similar. The term ‘relative risk’ is often used to mean either the rate ratio or risk ratio (or sometimes even the odds ratio). However, it is always better to be specific about which ratio measure you are using, to avoid confusion.

In GBD, relatives risks are usually ratio of incidence rates of causes in those exposed vs unexposed to the risk factor. However, there are exceptions as in the low birth rate short gestation (LBWSG) risk factor where the relative risks are ratios of all-cause mortality rates. It is best practice to always check with the risk appendix or the GBD modeller what the relative risks refer to each risk-outcome pair. 

For example, a study was conducted to measure the effect of vitamin A food fortification on incidence of measles in children under 5. GBD defines risk factors to be malignant. Hence, the exposed group (exposed to poor nutrition) are those who are not covered by food fortification while those unexposed are covered by food fortification. The table below shows the results: 

.. image:: rate_2x2table.svg

rate1 is the rate disease in the exposed group (no fortified foods)
rate0 is the rate of disease in the unexposed group (with fortified foods)
The rate ratio (RR) is thus rate1/rate0, = 100/40 = 2.5. 

This is interpreted as: 'children who do not eat foos fortified by vitamin A food are 2.5 times more likely to get measles than children who eat vitamin A enriched foods'.

Alternatively, the risk is computed as follows:

.. image:: risk_2x2table.svg

risk1 is the risk of having measles in the exposed: a/(a+c) 
risk0 is the risk of having measles in the unexposed: b/(b+d)
The risk ratio is (RR) is thus risk1/risk0 = [a/(a+c)]/[b/(b+d)]

This is interpreted as: 'there are X times more cases of measles among children who do not eat vitamin A fortified foods than those who eat vitamin A fortified foods'

If we want to compute the odds ratio:
The odds of disease in the exposed is a/c = risk1(1-risk1)
The odds of disease in the unexposed is b/d = risk0(1-risk0)
The odds ratio is: ad/bc= risk1(1-risk1)/risk0(1-risk0)

If the disease is rare and not recurrent, then the risk ratio, the rate ratio and the odds ratio are numerically similar. Odds ratios are often derived from case-control studies in which people with and without the outcome of interest are compared for their exposure. Depending on how the controls were sampled the odds ratio in a case control study can be equivalent to the risk of rate ratios that would have been obtained if the whole population had been studied. 

Difference measures
^^^^^^^^^^^^^^^^^^^

Difference measures are used to estimate the *excess* risk of disease caused by a risk factor *among the exposed group*. That is, difference measures of effect estimate how much of the
disease in the exposed group was due to the risk factor of interest. Two commonly used difference measures of effect are the risk difference and the risk difference percent.

*Risk difference* (RD) is the absolute differene between two risks. This is calculated by subracting the risk in the unexposed group (risk0) from the risk in the exposed group (risk1):

Risk difference = risk in exposed (risk1) - risk in unexposed (risk0)

Similary, the rate difference is calculated by subtracting the rate in the unexposed from the rate in the exposed. 

For example, A study measured the risk of HIV infection among children born to HIV-infected mothers,according to whether the babies were breastfed or not. Among non-breastfed children of HIVinfected
mothers, the risk of HIV infection was 150 infections per 1000 children. Among breastfed babies, the risk was 280 infections per 1000 children. The risk difference was thus
130 infections per 1000 children (130 = 280 - 150). The interpretation is that the risk factor, in this case breastfeeding, was responsible for the infection of 130 of every 1000 children
born to, and breastfed by, HIV-infected mothers. Notice that the risk difference retains the same units as the original risks used to calculate it. Thus, if the risk in the exposed and
unexposed groups is measured in ‘cases per 1000 persons’, then the risk difference will have the same units.

In most situations, where disease is not very common, risk differences and rate differences will be numerically similar. (Note that in the above example, HIV infection was common among study participants, so risk and rate differences would be unlikely to be similar.) In the literature, the risk difference is sometimes called the *attributable risk* or *excess risk*. Similarly, the terms attributable rate or excess rate are sometimes used to mean the rate difference.

The *risk difference percent* (RD%) measures the proportion of cases in the exposed group that are due to the exposure. That is, the RD% is the excess risk among the exposed expressed as a
proportion (or percentage) of the risk in the exposed group. It is calculated by dividing the risk difference by the risk among the exposed: 

Risk difference % = (risk1-risk0)/risk1

For example, the RD% from the above example is (280/1000 -150/1000)/ 280/1000 = 0.46 or 46%

We interpret this by saying breastfeeding was responsible for 46% of HIV infections among children born to, and breastfed by, HIV-infected mothers (the exposed). Note that this
does not mean that breastfeeding is responsible for 46% of HIV infections among children born to HIV-infected mothers. Measures of effect tell us only about the additional risk of
disease among exposed individuals (here, children of HIV-infected mothers who were breastfed) compared with unexposed individuals. In order to estimate how important breastfeeding is as a risk factor for HIV in the target population (here, children born to HIV-infected mothers), we would also need to have information on how common the risk factor is in the population (i.e., what proportion of children born to HIV-infected mothers are breastfed), see next section. The RD% is sometimes also called the *attributable fraction in the exposed*, or the *aetiologic fraction in the exposed*.


Population Attributable Fraction (PAF)
++++++++++++++++++++++++++++++++++++++
