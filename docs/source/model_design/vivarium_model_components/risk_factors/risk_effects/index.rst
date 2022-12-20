.. _models_risk_effect:

=====================
Risk Effects
=====================

.. contents::
  :local:

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
from unexposed [Measure_of_effect]_. See the 
:ref:`measures of excess risk page <excess_risk_measures>` for more 
information on such measures.

Risk effect in GBD
^^^^^^^^^^^^^^^^^^

The measure of risk effect in GBD is usually reported in relative term, namely
relative risk. It describes the relative relationship between the risk of
disease Y in the presence of agent X versus in absence of X. Mathematically,
it's calculated by dividing the rate of some outcome (such as incidence or mortality
rate) population exposed to a risk by the outcome rate in unexposed population.
For example, if there are A incident cases and B person-years in exposed group;
C incident cases and D person-years in unexposed group, then the relative risk
(rate ratio) equals :math:`\frac{AD}{BC}`. The "unexposed" or "reference" group
in the GBD-estimated relative risks is always the TMREL for that risk. For GBD 
risk factors with continuous risk exposures, the GBD-estimated relative risks
represent the relative risk associated with a defined unit increase in risk exposure
above the TMREL. This unit increase may be more than a single unit change in risk
exposure, so it is important to clarify this with the GBD modeler.

.. todo::

    Determine if there is a data source that documents these units

The GBD-estimated relative risks are adjusted for confounding and therefore
assumed to represent the *causal* effect size between the risk and outcome.
See the :ref:`causality documentation page <general_dags>` for more information 
on the topic. GBD has begun to quantify the quality of evidence for causality between
risk-outcome pairs they model in an effort termed "the burden of proof," summarized
in publications such as [Zheng-et-al-2022]_ and 
`this webpage <https://vizhub.healthdata.org/burden-of-proof/>`_. Additionally, the 
GBD-estimated relative risks represent the *total* effect of the risk on the outcome, 
including any mediated effects. See the :ref:`mediation documentation page <risk_mediation>` 
for more information on the topic.

While relative risks in GBD are typically age- and sex-specific, they are assumed 
not to vary by location or year. GBD applies risk effects to either YLDs, YLLs, or both.
Importantly, a risk factor could affect YLDs due to a given condition by affecting
its incidence rate, remission rate, or severity of disease. Therefore, it is important
to discuss reasonable assumptions with subject matter experts to determine the
most appropriate measure to which to apply the GBD risk effects in our vivarium
simulations.

Finally, it is important to note that because the GBD relative risks represent
the *causal* impact between and risk and an outcome, they cannot represent
the non-causal association between a given risk and an outcome or other risk factors.
Desired correlation between two variables will need to be accounted for separately; see
the :ref:`risk correlation page <2017_risk_models>` for more details.

Risk effect in vivarium
^^^^^^^^^^^^^^^^^^^^^^^

Materials related to risk effects models in vivarium:

- :ref:`Existing risk effects models <risk_effects_models>`
- :ref:`Risk effect model document template <risk_effects_model_template>`

Generally, we will use risk effects models to represent *causal* associations
between two variables and risk correlation models to represent *non-causal*
associations between two variables in vivarium.

A risk effects model for a given risk-outcome pair must document:

- Relative risk as a function of risk exposure
- Instructions for how to apply the risk effect to a given outcome

    - This will likely include information related to the risk-outcome pair's :ref:`population attributable fraction <pafs>`.

In vivarium, we build the risk-outcomes component in order to study the
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
     - :math:`i = i \times (1-PAF) \times rr^{max(e−tmrel,0)/scalar}`
     - :math:`PAF = \frac{E(RR_e)-1}{E(RR_e)}`
     - :math:`E(RR_e) = \int_{lower}^{upper}rr^{max(e−tmrel,0)/scalar}p(e)de`

Where,
 - :math:`e` stands for risk exposure level
 - :math:`i` stands for incidence rate
 - :math:`p` stands for proportion of exposed population
 - :math:`RR` stands for relative risk or incidence rate ratio
 - :math:`PAF` stands for population attributable fraction
 - :math:`E(RR_e)` stands for expected relative risk at risk exposure level e 
 - :math:`tmrel` stands for theoretical minimum risk exposure level
 - :math:`lower` stands for minimum exposure value
 - :math:`upper` stands for maximum exposure value
 - :math:`rr` is the base of the exponent in an exponential relative risk model
 - :math:`scalar` is a numeric variable used to convert risk exposure level to 
   a desired unit
 - :math:`p(e)` is probability density function used to calculate the probability 
   of given risk exposure level e

We can refer to the outcome rate multiplied by (1 - PAF) as the "risk-deleted outcome rate."

.. todo::

    Add a note about bias this introduces...

        PAF relies on exposure in the population, not the "at-risk" group for the outcome. This bias is larger when the at-risk population is small relative to the total population.

        But maybe this belongs in the PAF section?

Direct and indirect risk effect
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. todo::

    Move mediation-related information to the mediation page

For a risk-mediator outcome, simulation model would map a probability
distribution of possible mediator exposure level to each measurement of
associated risk factor (e.g. there is X% chance you will observe a SBP
>= 100 mm Hg for given BMI of 25 in adults).

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

