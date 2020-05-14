.. _2017_risk_lbwsg:

.. role:: sal

.. raw:: html

   <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
   <script>
     $(document).ready(function() {
       $('.sal').parent().addClass('sal-parent');
     });
   </script>
   <style>
      .sal-parent {background-color:#E9967A;}
   </style>

.. role:: pin

.. raw:: html

   <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
   <script>
     $(document).ready(function() {
       $('.pin').parent().addClass('pin-parent');
     });
   </script>
   <style>
      .pin-parent {background-color:#FFBCD9;}
   </style>

.. role:: gre

.. raw:: html

   <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
   <script>
     $(document).ready(function() {
       $('.gre').parent().addClass('gre-parent');
     });
   </script>
   <style>
      .gre-parent {background-color:#B0BF1A;}
   </style>

.. role:: blu

.. raw:: html

   <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
   <script>
     $(document).ready(function() {
       $('.blu').parent().addClass('blu-parent');
     });
   </script>
   <style>
      .blu-parent {background-color:#89CFF0;}
   </style>

====================================
Low Birth Weight and Short Gestation
====================================

Risk exposure overview
++++++++++++++++++++++

Describe this risk

GBD 2017 modelling strategy
+++++++++++++++++++++++++++

Risk exposure description in GBD 2017
-------------------------------------

The meaning of the “low birth weight” and “short gestation” in GBD have subtle definitional differences
compared to other usages of “low birth weight” and “short gestation” in literature. The term “low birth
weight” has historically been used to refer to birth weight (BW) less than 2500 grams. However, because
the goal of the GBD risk factors analysis is to quantify the entirety of attributable burden due to each
risk factor, the GBD definition of “low birth weight” therefore refers to all birth weight below the
Theoretical Minimum Risk Exposure Level (TMREL) for birth weight. Likewise, new-borns have been
typically been classified into gestational age (GA) categories of “extremely preterm” (<28 weeks of
gestation), “very preterm” (28-<32 weeks of gestation), and “moderate to late preterm” (32-<37 weeks
of gestation). “Short gestation” in GBD refers to all gestational ages below the gestational age TMREL.

Exposures and relative risks for the GBD Low birth weight and short gestation risk factors are divided
into joint 500-gram birth weight and 2-week gestational age combinations. The lowest risk overall 500-
gram/2-week bin is the overall TMREL. The univariate TMRELs vary with GA and BW. The lowest risk GA
varies by BW category and the lowest risk BWs vary with GA category. The latter are used to quantify
univariate attributable risk. Under this framework, all attributable burden under the joint TMREL is
referred to jointly as burden of LBWSG. All attributable burden to BWs under the TMREL for each GA
category are, on aggregate, “low birth weight” and all attributable burden to GAs under the TMREL for
each BW category are, on aggregate, “short gestation.” Each combination of 500-grams and 2-wks is
associated with a relative risk for mortality by neonatal period (early and late neonatal) and by the
causes, and relative to the joint TMREL.

.. note::

   *  PAF-of-1 with LBWSG:

      - The cause :ref:`Neonatal preterm birth complications
        <2017_cause_neonatal_preterm>` is
        100% attributable to this risk.

How is the exposure estimated in GBD 2017
-----------------------------------------

To model the joint distribution of exposure of low birth weight and short gestation for each location,
year, and sex estimated in GBD 2017, three types of information are used:

   - Distribution of gestational age for each location, year, and sex
   - Distribution of birth weight for each location, year, and sex
   - Copula family and parameters, specifying correlation between gestational age and birth weight distributions

Exposure modelling strategy in GBD 2017
---------------------------------------

GBD 2017 creates a joint distribution of birth weight and gestation age to create the low birth weight short gestation risk factor. It takes birth weight and gestational age microdata from 11 locations and uses ensemble model methods standard to GBD risk factors, to first create separate distributions of birth weight and gestational age for every location-sex-year. Then to model the joint distribution of gestational age and birth weight from separate distributions, the Spearman correlation for each country where joint microdata was available was pooled across all years of data available. This ranged from 0.25-0.49. Pooling across all countries in the dataset, the overall Spearman correlation was 0.38. Copula modelling was used to model joint distributions between the birth weight and gestational age marginal distributions. The joint distribution is then divided into 500g by 2wk bins. Birth prevalence was then calculated for each 500g by 2wk bin.

.. note::
   The risk appendix's description of "2-week age bins" is not totally accurate because:

   - There are two 1-week age bins (36-37 weeks, and 37-38 weeks).
   - There are two categories where the age range is 0-24 weeks (all the
     "extremely extreme" preterm births are grouped together).
     See image of LBWSG categories below

.. image:: lbwsg_categories.svg

Relative risks estimate in GBD 2017
-----------------------------------

**The available data for deriving relative risk was only for all-cause mortality.** For each location, the risk of all-cause mortality at the *early neonatal* period and *late neonatal* period at joint birth weight and gestational age combinations was calculated. In all datasets except for the United States, sex-specific data were combined to maximise sample size. The United States analyses were sex-specific. Relative risks were then calculated for each 500g and 2wk combination.

TMREL in GBD 2017
-----------------
For each of the country-derived relative risk surfaces, the 500 g and 2-week gestational age joint bin with the lowest risk was identified. This bin differed within each country dataset. To identify the universal 500 g and 2-week gestational age category that would serve as the universal TMREL, all bins that were identified as the TMREL was chosen. This is cat55 (40-42ga, 3500-400g) and cat56 (40-42ga, 4000-4500g)

.. note::
   the TMREL categories listed in GBD 2017 risk appendix are wrong.

Causes that are affected by LBWSG
---------------------------------

The available data for deriving relative risk was only for all-cause mortality. The exception was the USA
linked infant birth-death cohort data, which contained 3-digit ICD causes of death, but also had nearly
30% of deaths coded to causes that are ill-defined, or intermediate, in the GBD cause classification
system. GBD 2017 analysed the relative risk of all-cause mortality across all available sources and selected
outcomes based on criteria of biologic plausibility. Some causes, most notably congenital birth defects,
haemoglobinopathies, malaria, and HIV/AIDS, were excluded based on the criteria that reverse causality could not be excluded.
The final list of outcomes included in calculating the attributable burden for LBWSG are in the table below.

+----------+---------------------------------------------------------+
| Cause id | Cause (outcomes)                                        |
+==========+=========================================================+
|  302     | diarrheal diseases                                      |
+----------+---------------------------------------------------------+
|  322     | lower respiratory tract infections                      |
+----------+---------------------------------------------------------+
|  328     | upper respiratory tract infections                      |
+----------+---------------------------------------------------------+
|  329     | otitis media                                            |
+----------+---------------------------------------------------------+
|  333     | pneumococcal meningitis                                 |
+----------+---------------------------------------------------------+
|  334     | H influenzae type B meningitis                          |
+----------+---------------------------------------------------------+
|  335     | meningococcal meningitis                                |
+----------+---------------------------------------------------------+
|  336     | other meningitis                                        |
+----------+---------------------------------------------------------+
|  337     | encephalitis                                            |
+----------+---------------------------------------------------------+
|  381     | neonatal preterm birth complications                    |
+----------+---------------------------------------------------------+
|  382     | neonatal encephalopathy due to birth asphyxia and trauma|
+----------+---------------------------------------------------------+
|  383     | neonatal sepsis and other neonatal infections           |
+----------+---------------------------------------------------------+
|  384     | hemolytic disease and other neonatal jaundice           |
+----------+---------------------------------------------------------+
|  385     | other neonatal disorders                                |
+----------+---------------------------------------------------------+
|  686     | sudden infant death syndrome                            |
+----------+---------------------------------------------------------+

.. todo::

  discuss in detail the PAF of 1 causes.

Restrictions
------------

LBWSG risk effect on all-cause moratality only applies to the early neonatal and late neonatal age groups.

+------------------+-------------------------------------------------------+-----------+
| Restriction type | Value                                                 | Notes     |
+==================+=======================================================+===========+
|  Male only       | False                                                 |           |
+------------------+-------------------------------------------------------+-----------+
|  Female only     | False                                                 |           |
+------------------+-------------------------------------------------------+-----------+
|  Age group       | early neonatal (0-6 days)                             | id 2      |
|                  | late neonatal (7-28 days)                             | id 3      |
+------------------+-------------------------------------------------------+-----------+

Vivarium modelling strategy
+++++++++++++++++++++++++++

First, we convert the GBD 500g-2weeks birthweight-ga bins/categories to a joint continuous distribution using `Abie's notebook <https://github.com/ihmeuw/vivarium_data_analysis/blob/master/pre_processing/lbwsg/2019_03_19c_lbwsg_cat_to_continuous_abie.ipynb>`__.. We assume a uniform distribution within each bin/category.

.. note ::
    That this is likely biasing towards overestimating extreme birthweights or gestational ages. For example, in the 0-500g category, most babies are probably pretty close to 500g, not equally probable to be 1 gram versus 499 grams.

Because the relative risks from GBD are for all-cause mortality in the early and late neonatal period, we first decompose all-cause mortality rate (ACMR) as the sum of:

   - mortality from causes that are affected by LBWSG and modelled in the sim (:gre:`green`)
   - mortality from causes that are affected by LBWSG but not modelled in the sim (:blu:`blue`)
   - mortality from causes that are unaffected by LBWSG and modelled in the sim (:sal:`salmon`)
   - mortality from causes that are unaffected by LBWSG but not modelled in the sim (:pin:`pink`)

We are interested in applying the PAF and relative risk to only the causes that
GBD considers to be affected by LBWSG (green and blue). An example of these
causes from the :ref:`large-scale-food fortification concept model
<2017_concept_model_vivarium_conic_lsff>` concept model diagram is shown below:


+---------------------+------------------------------------------------------------------------+
|        Cause        | Causes by risk factors                                                 |
+==========+==========+=======================+=================+================+=============+
|  Group   | ID       | LBWSG                 | vitamin A       |   iron         |folic acid   |
+----------+----------+-----------------------+-----------------+----------------+-------------+
|Modelled  |:gre:`302`|diarrheal diseases     |diarrheal        |                |             |
|causes    |          |                       |diseases         |                |             |
|affected  +----------+-----------------------+-----------------+----------------+-------------+
|by        |:gre:`322`|lower respiratory      |lower respiratory|                |             |
|LBWSG     |          |tract infection        |tract infection  |                |             |
+----------+----------+-----------------------+-----------------+----------------+-------------+
|          |:blu:`328`|upper respiratory      |                 |                |             |
|Un-       |          |tract infections       |                 |                |             |
|modelled  +----------+-----------------------+-----------------+----------------+-------------+
|causes    |:blu:`329`|otitis media           |                 |                |             |
|affected  |          |                       |                 |                |             |
|by        +----------+-----------------------+-----------------+----------------+-------------+
|LBWSG     |:blu:`333`|pneumococcal           |                 |                |             |
|          |          |meningitis             |                 |                |             |
|          +----------+-----------------------+-----------------+----------------+-------------+
|          |:blu:`334`|H influenzae type      |                 |                |             |
|          |          |B meningitis           |                 |                |             |
|          +----------+-----------------------+-----------------+----------------+-------------+
|          |:blu:`335`|meningococcal          |                 |                |             |
|          |          |meningitis             |                 |                |             |
|          +----------+-----------------------+-----------------+----------------+-------------+
|          |:blu:`336`|other meningitis       |                 |                |             |
|          |          |                       |                 |                |             |
|          +----------+-----------------------+-----------------+----------------+-------------+
|          |:blu:`337`|encephalitis           |                 |                |             |
|          |          |                       |                 |                |             |
|          +----------+-----------------------+-----------------+----------------+-------------+
|          |:blu:`381`|neonatal preterm       |                 |                |             |
|          |          |birth complications    |                 |                |             |
|          +----------+-----------------------+-----------------+----------------+-------------+
|          |:blu:`382`|neonatal               |                 |                |             |
|          |          |encephalopathy         |                 |                |             |
|          +----------+-----------------------+-----------------+----------------+-------------+
|          |:blu:`383`|neonatal sepsis and oth|                 |                |             |
|          |          |er neonatal infections |                 |                |             |
|          +----------+-----------------------+-----------------+----------------+-------------+
|          |:blu:`384`|hemolytic disease and  |                 |                |             |
|          |          |other neonatal jaundice|                 |                |             |
|          +----------+-----------------------+-----------------+----------------+-------------+
|          |:blu:`385`|other neonatal         |                 |                |             |
|          |          |disorders              |                 |                |             |
|          +----------+-----------------------+-----------------+----------------+-------------+
|          |:blu:`686`|sudden infant          |                 |                |             |
|          |          |death syndrome         |                 |                |             |
+----------+----------+-----------------------+-----------------+----------------+-------------+
|Modelled  |:sal:`341`|                       | measles         |                |             |
|causes    |          |                       |                 |                |             |
|unaffected+----------+-----------------------+-----------------+----------------+-------------+
|by        |:sal:`389`|                       | vitamin A       |                |             |
|LBWSG     |          |                       |                 |                |             |
|          +----------+-----------------------+-----------------+----------------+-------------+
|          |:sal:`390`|                       |                 |dietary iron    |             |
|          |          |                       |                 |deficiency      |             |
|          +----------+-----------------------+-----------------+----------------+-------------+
|          |:sal:`642`|                       |                 |                | neural tube |
|          |          |                       |                 |                | defects     |
+----------+----------+-----------------------+-----------------+----------------+-------------+
|Un-       |:pin:`---`|causes not in our model                                                 |
|modelled  |          |                                                                        |
|causes    |          |                                                                        |
|unaffected|          |                                                                        |
|by LBWSG  |          |                                                                        |
+----------+----------+------------------------------------------------------------------------+

.. note::

  To pull CSMRs for the blue causes, use measure_id for death and metric_id for rate

At any time :math:`t` in a Vivarium simulation, each individual  :math:`i` has
an instantaneous mortality rate (i.e. mortality hazard) :math:`\text{mr}(i) =
\text{mr}_t(i)` that dictates how likely they are to die in the next instant.
The mortality hazard is dependent on which cause states the individual is in at
time :math:`t`. Our goal is to define the individual mortality hazard
:math:`\text{mr}(i)` so that the LBWSG relative risks for mortality are applied
only to the causes that GBD considers to be affected by LBWSG (green and blue),
while preserving the requirement that the `expected value`_ (denoted by
:math:`E`) of the mortality hazard equals the all-cause mortality rate for the
individual's location, year, age, and sex:

.. _expected value: https://en.wikipedia.org/wiki/Expected_value

.. math::

  E [\text{mr}(i)] = \text{ACMR}.

All-cause mortality is the sum of all the cause-specific mortality rates
(CSMRs):

.. math::

   \text{ACMR} =  \sum\limits_{\text{pink}}\text{CSMR} + \sum\limits_{\text{salmon}}\text{CSMR} + \sum\limits_{\text{green}}\text{CSMR} + \sum\limits_{\text{blue}}\text{CSMR}

.. note::

  To minimize the amount of data we need to pull from GBD, we can solve for the
  sum of mortality rates from unmodelled causes unaffected by LBWSG (pink) in
  terms of the all-cause mortality rate and the CSMRs of the green, blue, and
  salmon causes:

  .. math::

    \sum_{\text{pink}}\text{CSMR} = \text{ACMR}
    - \sum_{\text{salmon}}\text{CSMR}
    - \sum_{\text{green}}\text{CSMR}
    - \sum\limits_{\text{blue}}\text{CSMR}

  This equation can be substituted into :eq:`mortality_hazard` below to
  eliminate the pink causes from the computation of the mortality hazard for an
  individual simulant.

We now describe our strategy for defining the individual mortality hazard
:math:`\text{mr}(i)`, taking an individual's LBWSG category into account. For
the modelled causes (green and salmon) we will use the cause-state-dependent
excess morality rates (EMRs) instead of the CSMR, which is the average EMR over
all cause states (including the "without condition" state). For example, the
excess mortality rates for a two-state cause (with condition / without
condition) would be:

   - mortality rate due to cause if the person does NOT have the condition: EMR=0
   - mortality rate due to cause if the person HAS the condition: EMR of the condition (with EMR > CSMR)

We will need the following variables:

.. math::
  :nowrap:

  \begin{align*}
  &i &&= \text{identifier for an individual simulant}\\
  &c &&= \text{identifier for a cause}\\
  &\text{cat}(i) &&= \text{low birth weight short gestation category of individual $i$}\\
  &\text{state}_c(i) &&= \text{current cause state of individual $i$ in cause model diagram for $c$}\\
  &\text{CSMR}_c &&= \text{cause-specific mortality rate for cause $c$}\\
  &\text{EMR}_{\text{state}_c(i)} &&= \text{excess mortality rate for the cause state state$_c(i)$}\\
  &\textit{RR}_{\text{cat}(i)} &&= \text{relative risk for all-cause mortality in LBWSG category cat$(i)$}\\
  &\text{PAF} &&= \text{PAF of LBWSG for affected causes at most-detailed cause level}
  \end{align*}

See the :ref:`note below <PAF information>` about how to compute the above PAF
or pull it from GBD. Note that since :math:`\text{state}_c(i)` implicitly
depends on the time :math:`t`, the individual mortality hazard will also depend
on time. Using the above definitions, we will define the following individual
mortality rates below:

.. math::
  :nowrap:

  \begin{align*}
  &\text{csmr}_c(i) &&= \text{conditional cause-specific mortality hazard of cause $c$ for individual $i$}\\
  &\text{csmr}_c^*(i) &&= \text{LBWSG-stratified cause-specific mortality hazard of $c$ for $i$}\\
  &\text{mr}(i) &&= \text{overall mortality hazard for individual $i$}
  \end{align*}

For each cause :math:`c`, define the conditional cause-specific mortality
hazard for individual :math:`i` to be

.. math::

  \text{csmr}_c(i) :=
  \begin{cases}
  \text{CSMR}_c
    & \text{if $c \in$ unmodelled}, \\
  \text{EMR}_{\text{state}_c(i)}
    & \text{if $c\in $ modelled}.
  \end{cases}

The descriptor "conditional" here means that the above individual csmr's can be
interpreted as the cause-level expected CSMR's `conditioned <conditioning_>`_
(i.e. `stratified <stratification_>`_) on all the individual cause states
observed in the simulation. In other words, :math:`\text{csmr}_c(i)` is the
`conditional expectation`_ of an individual's cause-specific mortality hazard,
given whether :math:`c` is one of the causes we are modeling, and if so, given
which of :math:`c`'s cause states the individual :math:`i` is in.

.. _conditioning: https://en.wikipedia.org/wiki/Conditioning_(probability)
.. _conditional expectation: https://en.wikipedia.org/wiki/Conditional_expectation
.. _stratification: https://en.wikipedia.org/wiki/Stratification_(clinical_trials)

Now we additionally stratify/condition the csmr's by the individual's LBWSG
category. Define the LBWSG-stratified cause-specific mortality hazard of
:math:`c` for individual :math:`i` to be

.. math::

  \text{csmr}_c^*(i) :=
  \begin{cases}
  \text{csmr}_c(i)
    & \text{if $c \in$ unaffected}, \\
  \text{csmr}_c(i)\cdot (1-\text{PAF})\cdot \textit{RR}_{\text{cat}(i)}
    & \text{if $c \in$ affected}.
  \end{cases}

As described above, we are applying the PAF and relative risks only to the
causes GBD considers affected by LBWSG. For the affected causes, we first
compute the risk-deleted mortality rate by multiplying the individual csmr by
:math:`(1-\text{PAF})`, then multiply by the relative risk for the individual's
LBWSG category to get the cause-specific mortality hazard corresponding to that
risk category.

The individual's total mortality hazard, stratified by all modeled cause states
and LBWSG risk categories, is then

.. math::
  :label: mortality_hazard

  \text{mr}(i)
  & := \sum_{c\,\in\, \text{causes}} \text{csmr}_c^*(i) \\
  &= \sum_{c\,\in\, \text{pink}}
    \text{CSMR}_c
    + \sum_{c\,\in\, \text{salmon}}
    \text{EMR}_{\text{state}_c(i)} \\
    &\qquad\qquad + \left(\sum_{c\,\in\, \text{blue}}
    \text{CSMR}_c
    + \sum_{c\,\in\, \text{green}}
    \text{EMR}_{\text{state}_c(i)}\right)
    \cdot (1-\text{PAF})\cdot \textit{RR}_{\text{cat}(i)},

because

.. math::

  \text{csmr}_c^*(i) =
  \begin{cases}
  \text{CSMR}_c
    & \text{if $c \in$ pink (unaffected, unmodelled)}, \\
  \text{EMR}_{\text{state}_c(i)}
    & \text{if $c\in $ salmon (unaffected, modelled)}, \\
  \text{CSMR}_c\cdot (1-\text{PAF})\cdot \textit{RR}_{\text{cat}(i)}
    & \text{if $c \in$ blue (affected, unmodelled)}, \\
  \text{EMR}_{\text{state}_c(i)}\cdot (1-\text{PAF})\cdot \textit{RR}_{\text{cat}(i)}
    & \text{if $c \in$ green (affected, modelled)}.
  \end{cases}

.. _PAF information:

.. important::

   The population attributable fraction (PAF) in the above equation represents PAFs for most-detailed causes (they are all roughly equal tp 0.94) affected by LBWSG (or as calculated in vivarium from LBWSG relative risks and exposure). This approach assumes that relative risks for LBWSG applies only to causes that GBD considers to be affected by LBWSG (green and blue causes).

   `LBWSG PAF notebook <https://github.com/ihmeuw/vivarium_data_analysis/blob/master/pre_processing/lbwsg/LBWSG%20exposure%2C%20rrs%2C%20pafs.ipynb>`__.

.. todo::

   - add a proof that the expected value of :math:`\text{mr}(i)` equals the ACMR.
   - add more description of the all-causes PAF and most-detailed-cause PAF and the logical reasoning for using one over the other.
   - add the problems we ran in and how we ended up trouble-shooting and came to the conclusion to use the most-detailed-cause PAF
   - here, we can also discuss the other equations that thought up but did not end up using.
   - this way the following section will have more context.

Assumptions and limitations
+++++++++++++++++++++++++++

Strengths

   o  This approach is consistent with GBD methodology and avoids artificially decreasing the mortality rate for individual causes that are not affected by improvements in LBWSG (due to reverse causality or other concerns).

Limitations

   o  The risk appendix of GBD 2017 says that the data available to compute the relative risks (RR) for the risk exposure LBWSG are for the outcome of all-cause mortality. GBD then evaluated the relative risk of all-cause mortality across all available sources.  Based on criteria of biologic plausibility, a list of causes for which GBD believes LBWSG impacts mortality through were selected. Some causes, most notably congenital birth defects, haemoglobinopathies, malaria, and HIV/AIDS, were excluded based on the criteria that reverse causality could not be excluded. GBD assumed that the relative risks for all-cause mortality rates by LBWSG category applied equally to mortality rates from each of these blue causes only and did not apply to any other GBD causes in order to calculate the population attributable burden due to LBWSG; in other words, the conservatively ignored the potential impact of LBWSG on mortality due to causes that did not meet their causal criteria. We are choosing to apply the RRs only to this list of LBWSG-affected causes. We believe this is consistent with GBD's approach but may not fully reflect what the RRs capture.

   o  Because we are applying the same all-cause mortality RR to all affected causes, we are not able to evaluate the impact of LBWSG on cause-specific mortality accurately.

Bias

   Notably, it is uncertain if this approach will cause an exaggeration or underestimation of the impact of LBWSG on mortality in the neonatal age groups in our models compared with real-life because it requires an evaluation of the relative risks of mortality by LBWSG exposure category stratified by affected and unaffected causes and these data are not readily available to us.

    o   One source of bias could be from not including the reverse-causality causes: suppose we have a nutritional supplement that impacts LBWSG. This supplement was tested in an RCT in western Kenya where malaria is prevalent. Suppose there is some causal link in both directions between birthweight and malaria. For example, malaria during pregnancy can cause low birth weight babies due to the accumulation of parasites in the placentas of pregnant women. She can also pass on the malaria to the baby before or during childbirth. A low birth weight baby may also be more susceptible to diseases including malaria. So if a baby is low birth weight and has malaria, we do not know 100% whether this was 'congenital malaria' acquired from the mother before or during delivery and the mother's malaria caused its low birth weight, or whether the baby was born low birth weight malaria-free but had higher likelihood of acquiring malaria from an infectious mosquito bite. Without a well designed study, it is hard to know. Hence GBD did not include malaria in the list of LBWSG-affected causes. If we improve birthweight in this population due to the supplement, we also decrease incidence of malaria in the latter case (the low birth weight baby born malaria free, but then acquired it because it was low birth weight), and decrease mortality from malaria. However, this effect through malaria will not be captured in our model, so our modelled effect on neonatal mortality might be less than the empirial effect of this supplement on neonatal mortality.

    o  GBD assumes that the RR's for CSMR for each LBWSG-affected-causes (green and blue) are the same as the overall RR for ACMR (RR_acmr). This won't matter for the blue causes that we aren't modeling explicitly, but for the green causes that we *are* modeling, it could throw off our results depending on whether the RR's for that cause (RR_csmr) is larger or smaller than the overall RR for all causes (RR_acmr).

    o  Another source of bias could be from not applying the RRs to the causes they are intended for. Following from the limitation mentioned above, we are applying the RRs in an inconsistent manner with that they represent: they represent a ratio of ACMRs (let's call it :math:`RR_{acmr}`), but we are using them as a ratio of all-"affected (blue and green) cause"-mortality-rates (let's call this :math:`RR_{aacmr}`). We do not know whether the :math:`RR_{acmr}` is larger or smaller than the :math:`RR_{aacmr}`.

      | If the :math:`RR_{acmr}` < :math:`RR_{aacmr}`, we are underestimating deaths.
      | If the :math:`RR_{acmr}` > :math:`RR_{aacmr}` then we are over-estimating deaths.

   This can be illusted by the following equations:

    | LWB=low birth weight babies
    | NBW=normal birth weight babies (or TMREL category)

    :math:`RR_{acmr}` = :math:`\frac{\text{(LBW_deaths_affected + LBW_deaths_unaffected)/LBW_births}}{\text{(NBW_deaths_affected + NBW_deaths_unaffected)/NBW_births}}`

                      = :math:`\frac{\text{(LBW_deaths_affected + LBW_deaths_unaffected)}}{\text{(NBW_deaths_affected + NBW_deaths_unaffected)}} \times \frac{\text{NBW_births}}{\text{LBW_births}}`

    :math:`RR_{aacmr}` = :math:`\frac{\text{LBW_deaths_affected/LBW_births}}{\text{NBW_deaths_affected/NBW_births}}`

                       = :math:`\frac{\text{LBW_deaths_affected}}{\text{NBW_deaths_affected}} \times \frac{\text{NBW_births}}{\text{LBW_births}}`

   Since we do not know the ratio of the number of :math:`\text{LBW_deaths_unaffected}` to the number of :math:`\text{NBW_deaths_unaffected}`, we do not know the direction of bias. We would need to analyse the stratified microdata.

   .. todo::
      check to see (LBW_deaths_unaffected / NBW_deaths_unaffected) ?<? (LBW_deaths_affected / NBW_deaths_affected) or the reverse inequality?

      - if this above inequality is true, then it implies RR_acmr < RR_aacmr (the math checks out)
      - at first glance, the above inequality seems more likely than the reverse, BUT the unaffected causes include reverse causality causes which can complicate things.
      - thus, we should dig into a bit more later

Risk Exposure Model Diagram
+++++++++++++++++++++++++++

Data Description Tables
+++++++++++++++++++++++

Validation Criteria
+++++++++++++++++++

Our baseline scenario should compare with GBD artifact data with regards to:

  - LBWSG exposure categories (note: consider a proxy for this so that we don't need to observe person time in each category, perhaps mean BW or mean RR or birth prevalence?)
  - All-cause mortality rates in the early neonatal and late neonatal categories
