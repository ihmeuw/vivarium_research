.. _2021_cause_postpartum_depression_mncnh:

=============================================
Postpartum depression
=============================================

.. contents::
    :local:

.. note::

  The modeling strategy for this cause may be updated upon release of the GBD 2023 methods appendix, but this is an adequate placeholder strategy until this is determined

  Additionally, there is evidence that the incidence of PPD may depend on birth outcome, mode of delivery (vaginal vs. cesarean), and/or preterm status [Silverman-et-al-2017]_, which is currently not considered in this cause model. 

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - PPD
    - Postpartum depression
    - 
  * - MDD
    - Major depressive disorder
    - 

Disease Overview
----------------

The postpartum period is a time of intense transition and can cause new mothers and birthing parents to be vulnerable to psychiatric disorders. Depression episodes can be twice as likely during the postpartum period relative to other times of life and postpartum depression (PPD) can adversely affect the wellbeing of mothers and birthing parents, infants, and other family members. 

PPD refers to non-psychotic depressive episodes in the postpartum period that persist for more than two weeks and shares the same diagnostic criteria as major depressive disorder in the DSM-5 [Shorey-et-al-2018]_. Specifically, major depressive disorders are marked by depressed mood or loss of interest/pleasure that represent a change from the person's baseline and impaired functioning observed across social, occupational, and educational domains. Additional symptoms may include excessive sleeping or insomnia; change in eating, appetite, or weight; agitated or slow motor activity; fatigue; feeling worthless or inappropriately guilty; trouble concentrating; and repeated thoughts about death. [GBD-2019-Capstone-Appendix-PPD]_

GBD 2023 Modeling Strategy
--------------------------

.. todo::

  Update information to GBD 2023 as necessary when methods appendix becomes available

Postpartum depression is not specifically estimated by the GBD. Rather, we will inform the prevalence of postpartum depression from a recent review and meta-analysis performed by [Shorey-et-al-2018-mncnh]_. This review focused on healthy mothers with no prior history of postpartum depression, but found similar results to previous evaluations of postpartum depression prevalence among the broader population. [Shorey-et-al-2018-mncnh]_ reported that the incidence of postpartum depression was equal to 12% (95% CI 0.04–0.20).

While the GBD does not model PPD, it does model major depressive disorder. The GBD estimated that the average duration of major depressive disorder was 0.65 (95% UI: 0.59, 0.70) of one year (as informed through analysis of longitudinal studies on remission from major depressive disorder and the assumption that 40 years is the maximum duration of the condition), which we will use to inform the duration of postpartum depression in our simulation [GBD-2019-Capstone-Appendix-PPD-mncnh]_ (page 1013). 

Additionally, the GBD models severity distributions and associated disability weights for major depressive disorder, summarized in the table below [GBD-2019-Capstone-Appendix-PPD-mncnh]_ (page 1013). Notably, the GBD defines major depressive disorder (MDD) as an episodic mood disorder involving the experience of one or more major depressive episode(s). The percent of case severity was determined from the US National Epidemiological Survey on Alchol and Related Conditions (conducted in two waves from 2001-2002 and 2004-2005) and the Australian National Survey of Mental Health and Wellbeing of Adults. Notably, burden due to major depressive disorder in GBD begins in the 1 to 4 year age group.

We will conservatively assume that postpartum depression is not a cause/contributor of maternal mortality due to suicide or other causes in our simulation. While the GBD estimates deaths due to self-harm, these estimates are not specific to the postpartum population and therefore may not be generalizable.  

Vivarium Modeling Strategy
--------------------------

Scope
+++++

We will not model PPD as a dynamic transition model, but rather a probabilistic condition that begins at the time of birth and persists for some specified duration. The probability of experiencing PPD will be informed by a ratio per birth from the literature. PPD will be modeled as a YLD-only cause, although this is a limitation of our model as PPD may be associated with risk of suicide or infanticide in extreme cases.

Restrictions
++++++++++++

The following table describes any restrictions in the
effects of this cause (such as being only fatal or only nonfatal), as
well as restrictions on the ages and sexes to which the cause applies.

.. list-table:: Cause Restrictions
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     - False
     -
   * - Female only
     - True
     -
   * - YLL only
     - False
     -
   * - YLD only
     - True
     -
   * - YLL age group start
     - 10 to 14 (ID=7)
     -
   * - YLL age group end
     - 50 to 54 (ID=15)
     -
   * - YLD age group start
     - 10 to 14 (ID=7)
     -
   * - YLD age group end
     - 50 to 54 (ID=15)
     -

Assumptions and Limitations
+++++++++++++++++++++++++++

- We are limited in that the rate of PPD in our model is informed from a systematic literature review and meta-analysis that is not location-, year-, or age-specific and the analysis of PPD incidence primarily conducted in high-resource settings.

- We are limited in that we do not consider mortality associated with PPD in our model.

- We are limited in that we assume all PPD cases persist for the same average duration of a single MDD episode. This is limited in the sense that duration may vary by MDD severity (for example, a longer duration for more severe cases), which could cause our estimation of YLDs to be biased. Additionally, we assume that duration of PPD is equal to the duration of all MDD episodes.

- We assume that the GBD MDD severity distribution, which is based on analysis of high-resource settings, generalizes to the severity of PPD in our simulation population of interest.

- We assume that the onset of PPD occurs immediately following birth. However, the onset of PPD may peak around two or three months postpartum [Shorey-et-al-2018-mncnh]_.

- We assume that the incidence of PPD does not vary by pregnancy outcome (incidence is constant across partial term pregnancy loss, stillbirth, and live births)


Cause Model Decision Graph
++++++++++++++++++++++++++

Although we're not modeling PPD dynamically as a finite state
machine, we can draw an analogous directed graph that can be interpreted
as a (collapsed) decision tree rather than a state transition diagram.
The main difference is that the values on the transition arrows
represent decision probabilities rather than rates per unit time. The
maternal sepsis decision graph drawn below should be inserted on the
"full term pregnancy" branch of the decision graph from the
:ref:`pregnancy model <other_models_pregnancy_closed_cohort_mncnh>`,
between the intrapartum model and the birth of the child simulant. Solid
lines are the pieces added by the maternal sepsis model, while dashed
lines indicate pieces of the underlying pregnancy model.

.. todo::

    Put an explanation like the following (but with more precision) on
    some central page (rather than on each individual model page):

        To convert the graph to a decision tree, recursively split nodes
        with more than one incoming arrow until all nodes except the
        root have one incoming edge. Each time a node is split, all its
        outgoing edges are replicated, which may lead to additional
        downstream splits. Equivalently, the tree structure can be
        implicitly recovered by remembering the path taken to get to
        each node.

    Jira ticket: https://jira.ihme.washington.edu/browse/SSCI-2006

.. graphviz::

    digraph ppd_decisions {
        rankdir = LR;
        ftp [label="pregnancy, post\nintrapartum", style=dashed]
        ftb [label="birth", style=dashed]
        alive [label="parent alive"]
        dead [label="parent dead"]

        ftp -> alive  [label = "1 - ir"]
        ftp -> PPD [label = "ir"]
        PPD -> alive [label = "1 - cfr"]
        PPD -> dead [label = "cfr"]
        alive -> ftb  [label = "1", style=dashed]
        dead -> ftb  [label = "1", style=dashed]
    }

.. list-table:: State Definitions
    :widths: 7 20
    :header-rows: 1

    * - State
      - Definition
    * - pregnancy, post intrapartum
      - Parent simulant has any pregnancy outcome (live, still, or partial term birth) determined by the
        :ref:`pregnancy model
        <other_models_pregnancy_closed_cohort_mncnh>`, **and** has
        already been through the antenatal and intrapartum models
    * - PPD
      - Parent simulant has postpartum depression
    * - parent alive
      - Parent simulant is still alive
    * - parent dead
      - Parent simulant died of postpartum depression
    * - birth
      - The parent simulant pregnancy has ended with any outcome (live, still, or partial term birth) as be determined in the
        next step of the :ref:`pregnancy model
        <other_models_pregnancy_closed_cohort_mncnh>`)

.. list-table:: Transition Probability Definitions
    :widths: 1 5 20
    :header-rows: 1

    * - Symbol
      - Name
      - Definition
    * - ir
      - incidence risk
      - The probability that a pregnant simulant gets postpartum depression
    * - cfr
      - case fatality rate
      - The probability that a simulant with sepsis or another maternal
        infection dies of that infection

Data Tables
+++++++++++


.. list-table:: Data values and sources
    :header-rows: 1

    * - Variable
      - Definition
      - Value or source
      - Note
    * - ir
      - postpartum depression incidence risk per birth
      - 0.12 (95% CI 0.04, 0.20), truncated normal distribution (truncate at 95% CI limits). Apply uncertainty as parameter uncertainty, not individual-level heterogeneity
      - [Shorey-et-al-2018-mncnh]_
    * - cfr
      - case fatality rate of postpartum depression
      - 0
      - assumption
    * - case duration
      - amount of time "infectedd" with PPD, in years
      - 0.65 years (95% UI: 0.59, 0.70; truncated normal distribution). Apply uncertainty as parameter uncertainty, not individual-level heterogeneity
      - GBD 2019 methods appendix for major depressive disorder [GBD-2019-Capstone-Appendix-PPD-mncnh]_


.. list-table:: Major depressive disorder sequelae
  :header-rows: 1

  * - Severity
    - Percent of cases
    - Disability weight
  * - Asymptomatic
    - 14
    - 0
  * - Mild
    - 59 
    - 0.145 (0.099, 0.209)
  * - Moderate
    - 17 
    - 0.396 (0.267, 0.531)
  * - Severe
    - 10 
    - 0.658 (0.477, 0.807)


Calculating Burden
++++++++++++++++++

Years of life lost
"""""""""""""""""""

There will be no YLLs due to PPD as we assume it is a nonfatal only cause.

Years lived with disability
"""""""""""""""""""""""""""

For simulants who are determined to have an incident case of PPD, use the following instructions to calculate YLDs due to PPD:

1. Assign a case severity according to the "percent of cases" columns in the "Major depressive disorder sequelae" table
2. Multiply the case duration (found in the "Data values and sources" table) by the disability weight corresponding to the case severity assigned to that simulant to calculate YLDs due to PPD for that simulant.

Validation Criteria
+++++++++++++++++++

- Check population-level incidence rate is as expected
- Check that all pregnancy outcomes experience PPD at the same incidence rate
- Check that YLDs are as expected

References
----------

.. [GBD-2019-Capstone-Appendix-PPD-mncnh]
  Appendix to: `GBD 2019 Diseases and Injuries Collaborators. Global burden of
  369 diseases and injuries in 204 countries and territories, 1990–2019: a 
  systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 
  17 Oct 2020;396:1204-1222` 

.. [Shorey-et-al-2018-mncnh]
  Shorey S, Chee CYI, Ng ED, Chan YH, Tam WWS, Chong YS. Prevalence and incidence of postpartum depression among healthy mothers: A systematic review and meta-analysis. J Psychiatr Res. 2018 Sep;104:235-248. doi: 10.1016/j.jpsychires.2018.08.001. Epub 2018 Aug 3. PMID: 30114665.

.. [Silverman-et-al-2017]
  Silverman ME, Reichenberg A, Savitz DA, Cnattingius S, Lichtenstein P, Hultman CM, Larsson H, Sandin S. The risk factors for postpartum depression: A population-based study. Depress Anxiety. 2017 Feb;34(2):178-187. doi: 10.1002/da.22597. Epub 2017 Jan 18. PMID: 28098957; PMCID: PMC5462547.