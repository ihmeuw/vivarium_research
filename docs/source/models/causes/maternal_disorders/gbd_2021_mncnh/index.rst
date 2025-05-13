.. _2021_cause_maternal_disorders_mncnh:

===================================
Maternal disorders: GBD 2021, MNCNH
===================================

.. note::

    This page is adapted from the previously developed :ref:`GBD 2021
    maternal disorders cause model <2021_cause_maternal_disorders>`,
    which was updated from the :ref:`GBD 2019 maternal disorders cause
    model <2019_cause_maternal_disorders>`. In contrast to previous
    versions of the model, in the :ref:`MNCNH Portfolio project
    <2024_concept_model_vivarium_mncnh_portfolio>`  we are modeling
    several of the maternal disorders subcauses (see `Modeled
    Subcauses`_) rather than modeling a single overarching cause. This
    page documents the strategy for capturing the burden of the
    remaining maternal disorders subcauses that are not explicitly
    modeled, as well as the strategy for dealing with interactions
    between the different subcauses.

.. contents::
   :local:

Modeled Subcauses
-----------------

The following maternal disorders subcauses will be modeled individually,
in the indicated model-building wave:

Wave 1
++++++

.. toctree::
    :maxdepth: 1

    maternal_hemorrhage
    maternal_sepsis
    obstructed_labor

Wave 2
++++++

.. toctree::
    :maxdepth: 1

    postpartum_depression

Wave 3
++++++

* Maternal hypertensive disorders

The remainder of this document describes maternal disorders overall,
describes the strategy for capturing the burden of the maternal
disorders subcauses that are not explicitly modeled above, and explains
how to incorporate multiple modeled subcauses into the same simulation.

Disease Overview
----------------

GBD 2021 Modeling Strategy
--------------------------

Cause Hierarchy
+++++++++++++++

- All causes (c_294) [level 0]

  - Communicable, maternal, neonatal, and nutritional diseases (c_295)

    - Maternal and neonatal disorders (c_962)

      - **Maternal disorders (c_366)** [level 3]

        - Maternal hemorrhage (c_367)

          - Maternal hemorrhage with less than 1 liter blood loss (s_180)

          - Maternal hemorrhage with greater than 1 liter blood loss (s_181)

          - Mild anemia due to maternal hemorrhage (s_182)

          - Moderate anemia due to maternal hemorrhage (s_183)

          - Severe anemia due to maternal hemorrhage (s_184)

        - Maternal sepsis and other maternal infections (c_368)

          - Puerperal sepsis (s_937)

          - Other maternal infections (s_938)

          - Infertility due to puerperal sepsis (s_675)

        - Maternal hypertensive disorders (c_369)

          - Severe pre-eclampsia (s_185)

          - Eclampsia (s_186)

          - Other hypertensive disorders of pregnancy (s_676)

          - Long term sequelae of severe pre-eclampsia (s_187)

          - Long term sequelae of eclampsia (s_677)

        - Maternal obstructed labor and uterine rupture (c_370)

          - Obstructed labor, acute event (s_188)

          - Rectovaginal fistula (s_189)

          - Vesicovaginal fistula (s_190)

        - Ectopic pregnancy (c_374)

          - Ectopic pregnancy (s_5165)

        - Maternal abortion and miscarriage (c_995)

          - Maternal abortive outcome (s_191)

        - Other direct maternal disorders (c_379)

          - Other maternal disorders (s_192)

        - Indirect maternal deaths (c_375)

        - Late maternal deaths (c_376)

        - Maternal deaths aggravated by HIV/AIDs (c_741)

Subcause case definitions
""""""""""""""""""""""""""""

Maternal disorders are direct obstetric complications of pregnancy,
childbirth, and the postpartum period:

1. **Abortion** is defined as elective or medically indicated
   termination of pregnancy at any gestational age, regardless of
   symptoms or complications (**abortion**), or spontaneous loss of
   pregnancy before 24 weeks of gestation (**miscarriage**) with
   complications requiring medical care. Miscarriages that do not
   require medical care are not included in this cause.
#. **Ectopic pregnancy** is defined as a pregnancy that implants outside
   of the uterine cavity, generally presenting with abdominal pain and
   vaginal bleeding.
#. **Obstructed labour and uterine rupture**.

   a. Acute event includes failure to progress (no advance of the
      presenting part of the fetus despite strong uterine contractions),
      cephalopelvic disproportion (fetal size that is too large for
      maternal pelvic dimensions), non-vertex fetal positioning during
      labour (any fetal position besides head down during labour;
      excludes non-vertex positioning during antepartum period), and
      uterine rupture during labour (non-surgical breakdown of uterine
      wall during labour and delivery). Perineal lacerations without any
      of the above conditions are excluded from the case definition.
      (Estimation of the incidence and short- term disability due to
      these conditions is described in this appendix section.)
   #. Obstetric fistula is defined as an abnormal opening between the
      vagina and the bladder or rectum with involuntary escape of urine,
      flatus, and/or faeces following childbirth. (The non-fatal burden
      of fistulas is included in the non-fatal burden of obstructed
      labour in reporting, but estimation is described in a separate
      appendix section on “Fistula – impairment.”)

#. **Maternal haemorrhage** includes heavier than expected postpartum
   bleeding (>500 ml following vaginal delivery or >1000 ml after
   cesarean delivery) or antepartum bleeding (vaginal bleeding from any
   cause at or beyond 20 weeks of gestation and prior to onset of
   labour), or placental disorders with haemorrhage regardless of blood
   volume lost or timing of bleeding event. Placental disorders without
   haemorrhage are included with other [direct] maternal disorders.
#. **Maternal sepsis and other maternal infections** encompasses
   maternal sepsis during or following labour and delivery (defined as
   temperature <36°C or >38°C and clinical signs of shock [systolic
   blood pressure <90 mmHg and tachycardia >120 bpm]) as well as other
   maternal infections believed to have a close epidemiological
   relationship with pregnancy, including genitourinary tract infections
   (excluding sexually transmitted diseases), obstetrical wound
   infections, and breast infections related to childbirth and
   lactation.

#. **Hypertensive disorders of pregnancy** includes several
   subcategories:

   a. Gestational hypertension is the new onset of hypertension in a
      pregnant person after 20 weeks’ gestation, as defined by having a
      blood pressure measured >140/90 mmHg on more than one occasion.
   #. Preeclampsia is defined by hypertension [>140/90 mmHg] and
      proteinuria [≥0.3 g/l], with or without signs of end-organ damage.
   #. Severe preeclampsia is defined by preeclampsia with severe
      hypertension [>160/100 mmHg] or other signs of end organ damage
      [liver: low platelets, elevated liver enzymes, coagulation issues;
      kidney: elevated creatinine; central nervous system: headaches or
      visual disturbances], syndrome of hypertension, elevated liver
      enzymes, low platelets [HELLP syndrome]).
   #. Eclampsia is defined as hypertension and seizures, with or without
      proteinuria. This definition excludes chronic hypertension in a
      pregnant person (hypertension present prior to 20 weeks’
      gestation) unless superimposed preeclampsia develops.
#. **Other [direct] maternal disorders** includes a variety of different
   obstetric complications. The most common of these in ICD-10-coded
   vital registration sources in terms of number of deaths include O88
   (obstetric embolism), O26 (maternal care for other conditions
   predominantly related to pregnancy), O90 (complications of the
   puerperium, not elsewhere classified), O75 (other complications of
   labour and delivery, not elsewhere classified), C58 (malignant
   neoplasm of placenta), and O36 (maternal care for other fetal
   problems).

Restrictions
++++++++++++

Vivarium Modeling Strategy
--------------------------

Scope
+++++

Assumptions and Limitations
+++++++++++++++++++++++++++

Cause Model Diagram
+++++++++++++++++++

Data Tables
++++++++++++++++++++++++++++++++

Calculating Burden
++++++++++++++++++

Years of life lost
"""""""""""""""""""

Years lived with disability
"""""""""""""""""""""""""""

Modeling multiple maternal disorders together
+++++++++++++++++++++++++++++++++++++++++++++

Since the :ref:`MNCNH Portfolio simulation
<2024_concept_model_vivarium_mncnh_portfolio>` uses Vivarium timesteps
in a nonstandard way, we need to do more work to specify how different
simulation components interact and in what order decisions should be
made. This has two implications for modeling multiple maternal disorders
subcauses together:

1. We need to decide in which order to make decisions about the
   different maternal disorders subcauses, which will be important if
   there are causal interactions between them.
2. If a simulant experiences multiple maternal disorders simultaneously,
   we need to specify how to determine whether the simulant dies from
   one of the subcauses, and from which one.

To deal with the above two issues, we will

* Split incidence and mortality into separate timesteps
* Have a single timestep that handles mortality from all the maternal
  disorders subcauses together
* Have a separate incidence timestep for each of the modeled maternal
  disorders subcauses

More details are in the following two subsections.

Subcause ordering
"""""""""""""""""

We anticipate that there are correlations and perhaps causal
relationships between various maternal disorders subcauses. In Wave 1,
we are ignoring such interactions and treating the different subcauses
as independent. However, to be able to handle such interactions in
future waves, the simulation should make decisions about incidence of
the different subcauses in the order of the suspected causal
relationships. The specified order is:

#. Maternal hypertensive disorders
#. Obstructed labor and uterine rupture
#. Maternal hemorrhage
#. Maternal sepsis and other maternal infections
#. Residual maternal disorders

The current plan is to have a separate "incidence timestep" for each of the
modeled subcauses, ordered as above, and the simulation will decide
which simulants experience each subcause on the corresponding timestep.

Mortality component
"""""""""""""""""""

We will have a single simulation timestep that handles mortality from
all the maternal disorders subcauses together. The mortality timestep
should happen after the incidence timesteps of all the maternal
disorders subcauses. The mortlity timestep will work similarly to the
mortality component in a standard Vivarium simulation.

.. note::

    We may need to adjust the strategy for deciding mortality after
    implementing the "residual" maternal disorders subcause to capture
    DALYs from maternal disorders that are not explicitly modeled. In
    particular, some of the un-modeled subcauses are YLL only, so we
    will not have incidence rate data, so we'll have to assign deaths
    among the entire pregnant population rather than among incident
    cases.

On the mortality timestep, first we will determine whether the simulant
dies of *any* of the maternal disorders subcauses. Then, if the simulant
dies, we will decide which maternal disorder caused the death. Suppose
after the incidence timesteps for all the maternal disorders subcauses,
a simulant simultaneously has cases of :math:`k` different subcauses,
say :math:`c_1, \dotsc, c_k`. We will assume that the probability that
the simulant dies of one of these subcauses is

.. math::
    :label: prob_dies_eqn

    P(\text{simulant dies of one of $c_1,\dotsc, c_k$}
    \mid \text{simulant has $c_1,\dotsc, c_k$ only})
    = \sum_{i=1}^k \operatorname{cfr}_i,

where :math:`\operatorname{cfr}_i` is the case fatality risk (a.k.a.
case fatality rate) of the :math:`i^\mathrm{th}` subcause, :math:`c_i`.
If the simulant dies, we then specify that the probability that they die
of :math:`c_i` should be

.. math::
    :label: prob_ci_eqn

    P\left(\text{simulant dies of $c_i$}
    \:\middle|\:
    \genfrac{}{}{0pt}{}
    {\text{simulant has $c_1,\dotsc, c_k$ only}}{\text{and dies of one of them}}
    \right)
    = \frac{\operatorname{cfr}_i}{\sum_{i=1}^k \operatorname{cfr}_i}.

Clearly these conditional probabilities sum to 1, so every simulant who
dies will be assigned a cause of death. Moreover, we claim that using the
above conditional probabilities will lead to the correct case fatality
risk for all the maternal disorders subcauses.

To see this, first observe that multiplying the above two equations
yields

.. math::
    :label: cfr_cond_indep_eqn

    P(\text{simulant dies of $c_i$}
    \mid \text{simulant has $c_1,\dotsc, c_k$ only})
    = \operatorname{cfr}_i,
    \text{ if } c_i \in \{c_1,\dotsc, c_k\}.

In particular, :eq:`cfr_cond_indep_eqn` holds for **any set of causes**
:math:`c_1,\dotsc, c_k`, **as long as** :math:`c_i` **is one of them**.
Therefore, when we compute the overall case fatality risk of :math:`c_i`
by averaging over the entire population of simulants who have the cause
:math:`c_i`, we get

 .. math::
    :label: cfr_correct_eqn

    \begin{align*}
    P(\text{simulant dies of $c_i$} \mid \text{simulant has $c_i$})
        \hspace{-7.5cm}& \\
    &= \sum_k \sum_{\substack{c_1,\dotsc, c_k\in \text{causes}
        \\ c_i \in \{c_1,\dotsc, c_k\}}}
        P(\text{dies of $c_i$}
        \mid \text{has $c_1,\dotsc, c_k$ only})
        \cdot P(\text{has $c_1,\dotsc, c_k$ only} \mid \text{has $c_i$})\\
    &= \sum_k \sum_{\substack{c_1,\dotsc, c_k\in \text{causes}
        \\ c_i \in \{c_1,\dotsc, c_k\}}}
        \operatorname{cfr}_i
        \cdot P(\text{has $c_1,\dotsc, c_k$ only} \mid \text{has $c_i$})\\
    &= \operatorname{cfr}_i \cdot  \sum_k
        \sum_{\substack{c_1,\dotsc, c_k\in \text{causes}
            \\ c_i \in \{c_1,\dotsc, c_k\}}}
        P(\text{has $c_1,\dotsc, c_k$ only} \mid \text{has $c_i$})\\
    &= \operatorname{cfr}_i \cdot 1.
    \end{align*}

The first step and last step hold because the union of the disjoint
events :math:`\{\text{has $c_1,\dotsc, c_k$ only}\}` over all subsets
:math:`\{c_1,\dotsc, c_k\}` containing the cause :math:`c_i` equals the
event :math:`\{\text{has $c_i$}\}`. Since :math:`c_i` was arbitrary, we
get

.. math::

    P(\text{simulant dies of $c_i$} \mid \text{simulant has $c_i$})
    = \operatorname{cfr}_i

for all maternal disorders subcauses :math:`c_i` as claimed.

.. warning::

    If the case fatality risks of some of the maternal disorders
    subcauses are too large, the "probability" calculated in
    :eq:`prob_dies_eqn` may be greater than 1, which would lead the
    model to underestimate the true case fatality risks. This problem
    could be fixed, for example, by scaling down the probability in
    :eq:`prob_dies_eqn` to be less than 1, and scaling up the
    probability :math:`P(\text{simulant dies of $c_i$} \mid
    \text{simulant has $c_i$ only})` so that the average of the
    probabilities computed in :eq:`cfr_correct_eqn` still works out to
    the correct overall case fatality risk :math:`\operatorname{cfr}_i`.
    Note that the probabilities in :eq:`cfr_correct_eqn` depend on the
    joint distribution of all the causes, so in order to solve for the
    correct probability, we would either need some information about the
    joint distribution, or we would have to calibrate the model
    empirically.

    The potential for probabilities greater than 1 illustrates an
    inherent deficiency in the above methodology. Specifically, the the
    two assumptions :eq:`prob_dies_eqn` and :eq:`prob_ci_eqn` lead to
    the equation :eq:`cfr_cond_indep_eqn`, which is equivalent to the
    assumption that **the case fatality risk of** :math:`c_i` **is
    conditionally independent of whatever other causes you have, given
    that you have** :math:`c_i`. It is not difficult to see that this
    assumption cannot hold in general. For example, if you have a
    particularly deadly form of cancer, your case fatality risk for that
    cancer might be quite high in general. However, if you are also
    falling off a cliff, the case fatality risk of the cancer will be 0,
    since you will die of the fall with probability 1 before the cancer
    kills you.

    That is, in general, we expect the probability of dying from
    :math:`c_i` to depend on what other causes you have concurrently,
    because there could be crowd-out effects (e.g., the fall crowds out
    the cancer in the example above) or possibly "reinforcement" effects
    between the different causes. However, we suspect that this won't be
    an issue for the maternal disorders we are modeling, and the above
    calculations will likely be good enough approximations for our
    purposes.

Validation Criteria
+++++++++++++++++++

References
----------
