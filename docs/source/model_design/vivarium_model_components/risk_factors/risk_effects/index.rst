.. _models_risk_effect:

=====================
Risk Effects
=====================

.. contents::
  :local:

What is a risk effect?
++++++++++++++++++++++

A risk effect is a measure of how some variable (the risk factor) causally impacts
some outcome variable. 

Generally, we will use risk effects models to represent 
associations between two variables that are assumed to be causal and 
:ref:`risk correlation models <risk_correlation>` to represent *non-causal* 
associations between two variables (see the :ref:`causality <general_dags>`
documentation page for more information on causality). It is important to note
that for any two variables that are causally related to one another, there is 
likely also additional non-causal correlation between them through additional
variables and shared common causes.

There are several attributes of a risk effect that are important to consider, 
including the 

- direction (ex: positive or negative association), 
- shape (ex: linear, U-shaped, etc.), 
- magnitude (ex: large or small), 
- and statisical certainty 

of the association between the risk factor and the outcome. 

The risk effect may be measured in both absolute (ex: risk difference) or 
relative terms (ex: relative risk). See the 
:ref:`measures of excess risk page <excess_risk_measures>` for more 
information on such measures.

Risk effects are typically estimated in epidemiologic studies that assess
how different levels of :ref:`risk exposures <risk_exposure>` affect some 
outcome variable such as an incidence or mortality rate.
There are several factors that may bias the quantification of a risk effect
in epidemiologic studies (including influence by confounding), 
and causal inference from such studies may be inhibited by such limitations.
See the page on :ref:`causality <general_dags>` for more information on the topic.

Risk effect in GBD
^^^^^^^^^^^^^^^^^^

The measure of risk effect in GBD is usually reported in relative terms, namely
relative risk. It describes the relative relationship between the risk of
disease Y in the presence of agent X versus in absence of X. Mathematically,
it's calculated by dividing the rate of some outcome (such as incidence or mortality
rate) among the population exposed to a risk by the outcome rate in the unexposed population.
For example, if there are A incident cases and B person-years in exposed group;
C incident cases and D person-years in the unexposed group, then the relative risk
(rate ratio) equals :math:`\frac{AD}{BC}`. The "unexposed" or "reference" group
in the GBD-estimated relative risks is always the TMREL for that risk. For GBD 
risk factors with continuous risk exposures, the GBD-estimated relative risks
represent the relative risk associated with a defined unit increase in risk exposure
above the TMREL. This unit increase may be more than a single unit change in risk
exposure, so it is important to clarify this with the GBD modeler.

.. todo::

    Determine if there is a data source that documents these units

The GBD-estimated relative risks are assumed to represent the *causal* effect of the 
risk on the outcome, as they are calculated in the absense of confounding factors and 
the evidence is assessed to ensure it meets criteria for causality.
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
the :ref:`risk correlation page <risk_correlation>` for more details.

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

In general, we would model the risk-outcomes that are directly causally related
(e.g. BMI -> IHD), but sometimes we consider adding a mediator to account for
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


Restrictions
^^^^^^^^^^^^

As with cause models, risk effects models may include restrictions, which answer
the questions: Who does this apply to? For which population groups (e.g., age or sex group)
is this risk effect not valid? 

It is worth noting that although risk effect and risk exposure both are related to risk factors,
restrictions for these two elements function differently. Risk exposure restrictions do
not include outcome restrictions (i.e., YLL only or YLD only), however risk effect
restrictions do. Due to the nature of the relationship between risk exposure and risk 
effects, risk effects restrictions will always be within restrictions for risk exposure. 
To illustrate, if a risk exposure restriction for a given risk factor is male only, then 
the risk effects model will also be restricted to male only. 

For example, GBD 2019 modeled low-birthweight and short gestation (LBWSG) relative
risks with age and outcome restrictions. See the table below for details. 

.. list-table:: Age, Sex, and Outcome Restrictions for LBWSG Relative Risks in GBD 2019
  :widths: 15 15 20
  :header-rows: 1

  * - Restriction Type
    - Value
    - Notes
  * - Male only
    - False
    -
  * - Female only
    - False
    -
  * - YLL only
    - True
    - Except for Neonatal preterm birth; see :ref:`note <note_on_preterm_birth_DALYs>` below
  * - YLD only
    - False
    -
  * - Age group start
    - Early neonatal (0-7 days, age_group_id = 2)
    -
  * - Age group end
    - Late neonatal (7-28 days, age_group_id = 3)
    - Except for Neonatal preterm birth; see :ref:`note <note_on_preterm_birth_DALYs>` below

.. _note_on_preterm_birth_DALYs:

.. note::

  GBD attributes 100% of the DALYs due to Neonatal Preterm Birth to the LBWSG
  risk factor. In particular, the attribution includes YLDs as well as YLLs, and
  the age restrictions for the LBWSG-attributable DALYs are the same as the age
  restrictions for Neonatal Preterm Birth.

  * **YLLs due to Neonatal preterm birth**, 100% attributable to LBWSG:

    - Age group start = 2 (Early neonatal, 0-7 days)
    - Age group end = 5 (1 to 4)

  * **YLDs due to Neonatal preterm birth**, 100% attributable to LBWSG:

    - Age group start = 2 (Early neonatal, 0-7 days)
    - Age group end = 235 (95+)

  Note that this attribution of DALYs is **not** based on the relative risks for
  all-cause mortality, but instead is based on the logic that all preterm births
  are due to short gestation by definition. Thus, if we include Neonatal Preterm
  Birth in our models, the relative risks likely must be handled differently for
  this cause.

.. todo::

    Follow up about assumptions that GBD uses to apply relative risk to YLLs and
    YLDs.