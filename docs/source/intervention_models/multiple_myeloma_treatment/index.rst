.. _multiple_myeloma_treatment:

..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1
  ---------------

  Section Level 2
  +++++++++++++++

  Section Level 3
  ~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

==============================
Multiple Myeloma Treatment
==============================

The multiple myeloma treatment model for :ref:`Phase 2 of the project
<2019_concept_model_vivarium_csu_multiple_myeloma_phase_2>` will incorporate
much of the information and strategy from the :ref:`Multiple Myeloma Phase 1
Treatment Model <mm5.3.3>`. The main differences are that we are expanding the
set of mutually exclusive treatment categories, and we will be supplementing
data from literature and expert opinion with patient-level data from Flatiron to
inform our treatment algorithm.

.. contents::
   :local:

.. list-table:: Abbreviations
  :widths: 5 5 10
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - ASCT
    - autologous stem cell transplantation
    -
  * - IMiD
    - immunomodulatory imide drug
    -
  * - PI
    - proteasome inhibitor
    -
  * - MoAB
    - monoclonal antibody
    -
  * - Isa
    - isatuximab
    -
  * - Dara
    - daratumumab
    -
  * - Dex
    - dexamethasone
    -

Links to Related Models
-----------------------

* :ref:`Multiple Myeloma Cause Model <2019_cancer_model_multiple_myeloma>`
* :ref:`Multiple Myeloma Phase 1 Concept Model <2019_concept_model_vivarium_csu_multiple_myeloma>`
* :ref:`Multiple Myeloma Phase 2 Concept Model <2019_concept_model_vivarium_csu_multiple_myeloma_phase_2>`

Intervention Overview
-----------------------

Treatment guidelines for multiple myeloma are complex and varied.
[Rajkumar-and-Kumar-2020]_ and [Nijhof-et-al-2017]_ published recent reviews on
multiple myeloma treatment options and guidelines.

Classes of Drugs for Treating Multiple Myeloma
++++++++++++++++++++++++++++++++++++++++++++++

Important classes of
anti-myeloma drugs are summarized (non-exhaustively) below, according to
[Nijhof-et-al-2017]_:

.. list-table:: Select anti-myeloma drug classes
   :header-rows: 1

   * - Class
     - Abbreviation
     - Drugs
   * - Immunomodulatory imide drugs
     - IMiDs
     - thalidomide, lenalidomide, pomalidomide
   * - Proteasome inhibitors
     - PIs
     - bortezomib, carfilzomib, ixazomib, marizomib, oprozomib
   * - Monoclonal antibodies
     - MoABs
     - isatuximab (anti-CD38), daratumumab (anti-CD38), MOR202 (anti-CD38), elotuzamab (anti-CS1/anti-SLAM7), denosumab (anti-RANKL), siltuximab (anti-IL6), IPH2101 (anti-KIR2DL1/2/3)
   * - Corticosteroids
     - steroids
     - dexamethasone, prednisone

Autologous Stem Cell Transplantation (ASCT)
+++++++++++++++++++++++++++++++++++++++++++

The standard of care for fit multiple myeloma patients is to receive high-dose
chemotherapy (HDT) with autologous stem cell rescue — otherwise known as
autologous stem cell transplant (ASCT) — after completion of induction therapy.
Autologous stem cell transplant can provide significant remission that is both
long and deep, extending survival.

**Autologous vs. Allogeneic:** "Autologous" refers to the blood-making stem
cells that are harvested from the patient to be a source of new blood cells
after high-dose chemotherapy with melphalan. "Allogeneic" transplant, in which
donor stem cells are used instead of the patient's own cells, is not performed
in myeloma outside the context of a clinical trial.
[https://www.myeloma.org/autologous-stem-cell-transplant]

.. todo::

  Look into some questions about ASCT. For example:

  * What factors determine whether a patient is eligible for ASCT?

    - According to [Rajkumar-and-Kumar-2020]_, "In general, eligibility for ASCT
      is affected by age, `performance status`_, and comorbidities."
    - According to https://www.myeloma.org/autologous-stem-cell-transplant,
      transplant eligibility also depends on disease-related factors including
      "the type and the stage of the disease, its aggressiveness and
      responsiveness to treatment, the levels of serum albumin and beta-2
      microglobulin, and the presence or absence of certain chromosomal
      abnormalities in the patient’s myeloma cells."

  * When in the treatment cycle does ASCT usually occur? (According to the
    treatment algorithm in [Rajkumar-and-Kumar-2020]_, ASCT is usually done in
    the first line, but sometimes after the first relapse. How often is ASCT
    done more than once?)
  * How does eligibility for ASCT affect choice of treatment regimens?
  * How does ASCT affect survival rates and progression rates in the first line
    and in later lines? (E.g., if ASCT is done in the first line, (a) does it
    delay the onset of the first relapse, and (b) does it have a detectable
    effect on survival or progression after the first relapse?)

  The answers to these questions may affect how we implement the MM treatment
  algorithm in Vivarium, and they may also affect how we implement the survival
  regression of Flatiron data to get transition rates for the MM cause model.

.. _performance status: https://ecog-acrin.org/resources/ecog-performance-status/

Maintenance Therapy and Continuous Therapy
++++++++++++++++++++++++++++++++++++++++++

**Maintenance therapy** refers to treatment given to patients after high-dose
chemotherapy with autologous stem cell transplant (ASCT), while **continuous
therapy** refers to treatment given to patients who do not go on to transplant
after frontline therapy.

While maintenance and continuous therapy with Revlimid® (lenalidomide) is the
standard of care for treatment of multiple myeloma, there is currently no set
time period for the optimal duration of maintenance.
[https://www.myeloma.org/maintenance-therapy]

Myeloma Treatment Algorithm Flowcharts
++++++++++++++++++++++++++++++++++++++

The following flowcharts illustrate the current treatment algorithms for
multiple myeloma recommended in [Rajkumar-and-Kumar-2020]_. For more details,
see the original reference and the description from the :ref:`Multiple Myeloma
Phase 1 Treatment Model <mm5.3.3>`. The images are shared under the `Creative
Commons license <creative_commons_license_>`_.

Note that capital letters in the abbreviations for treatment regimens in the
figures below refer to the brand names of the drugs, not the generic names. For
example, VRd stands for Velcade® (bortezomib), Revlimid® (lenalidomide),
dexamethasone.

.. _creative_commons_license: https://creativecommons.org/licenses/by/4.0/

Treatment of Newly Diagnosed Myeloma
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

According to [Rajkumar-and-Kumar-2020]_, the two main factors driving the
authors' approach to treating newly diagnosed MM are (1) eligibility for
autologous stem cell transplantation (ASCT) and (2) risk stratification. *Risk
stratification* refers to the presence (high risk) or absence (standard risk) of
certain cytogenetic abnormalities, which are screened for upon diagnosis of MM.
The current recommended algorithm for the treatment of symptomatic newly
diagnosed MM based on transplant eligibility and cytogenetic risk is shown in
:ref:`Fig. 1
<mm_treatment_fig_1_treatment_of_newly_diagnosed_multiple_myeloma>`.

See also:

* https://www.myeloma.org/frontline-treatment-options
* https://www.seattlecca.org/diseases/multiple-myeloma/treatment

.. _mm_treatment_fig_1_treatment_of_newly_diagnosed_multiple_myeloma:

.. figure:: Rajkumar_2020_Fig1_line_1_treatment.webp

  Fig. 1: Approach to the treatment of newly diagnosed myeloma in
  transplant-eligible **(a)** and transplant-ineligible **(b)** patients. VRd,
  Bortezomib, lenalidomide, dexamethasone; DRd, daratumumab, lenalidomide,
  dexamethasone; Dara-VRd, daratumumab, bortezomib, lenalidomide, dexamethasone;
  ASCT, autologous stem cell transplantation.

Treatment of Relapsed Myeloma
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

According to [Rajkumar-and-Kumar-2020]_, with modern therapy, the first relapse
of MM occurs after ~3–4 years following initial diagnosis. Each subsequent
remission is of shorter duration. Many patients with MM receive five or more
lines of therapy in a sequential manner over several years. The remission
duration in relapsed MM decreases with each regimen.

The choice of treatment at each relapse is affected by many factors, including
the timing of the relapse, response to prior therapy, aggressiveness of the
relapse, and `performance status`_. In general, a triplet regimen is preferred.
At each relapse, a regimen that contains at least two new drugs that the patient
is not refractory to should be considered. The recommended algorithm for the
treatment of relapsed MM is given in :ref:`Fig. 2
<mm_treatment_fig_2_treatment_of_relapsed_multiple_myeloma>`.

See also:

* https://www.myeloma.org/relapsed-multiple-myeloma
* https://www.myeloma.org/treatments-subsequent-relapse

.. _mm_treatment_fig_2_treatment_of_relapsed_multiple_myeloma:

.. figure:: Rajkumar_2020_Fig2_line_2plus_treatment.webp

  Fig. 2: Approach to the treatment of relapsed multiple myeloma in first
  relapse **(a)** and second or higher relapse **(b)**. DRd daratumumab,
  lenalidomide, dexamethasone; KRd carfilozomib, lenalidomide, dexamethasone;
  IRd ixazomib, lenalidomide, dexamethasone; ERd elotuzumab, lenalidomide,
  dexamethasone; DVd daratumumab, bortezomib, dexamethasone; DPd daratumumab,
  pomalidomide, dexamethasone; KPd carfilzomib, pomalidomide, dexamethasone; VCd
  bortezomib, cyclophosphamide; DKd daratumumab, carfilzomib, dexamethasone; IPd
  ixazomib, pomalidomide, dexamethasone.

Affected Outcomes
+++++++++++++++++

.. todo::

  Fill out the following table with a list of known outcomes affected by the intervention, regardless of if they will be included in the simulation model or not, as it is important to recognize potential unmodeled effects of the intervention and note them as limitations as applicable.

.. list-table:: Affected Outcomes
  :widths: 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note
  * -
    -
    -
    -

Baseline Coverage Data
++++++++++++++++++++++++

We plan to use Flatiron to inform baseline coverage of each treatment regimen.

.. todo::

  Document known baseline coverage data, using the table below if appropriate

.. list-table:: Baseline coverage data
  :widths: 15 15 15 15 15
  :header-rows: 1

  * - Location
    - Subpopulation
    - Coverage parameter
    - Value
    - Note
  * -
    -
    -
    -
    -

Vivarium Modeling Strategy
--------------------------

.. todo::

  Add an overview of the Vivarium modeling section.

Treatment Regimen Categories
++++++++++++++++++++++++++++

The Phase 1 simulation only considered three categories of treatment regimen:
isatuximab-containing, daratumumab-containing, and other. Based on conversations
with the client and with our clinical expert Manoj Menon, we plan to expand the
modeled treatment categories to the following set of 16 mutually exclusive
categories:

.. list-table:: Modeled Treatment Regimen Categories
  :widths: 5 10 8 15
  :header-rows: 1

  * - Enumeration
    - Treatment category
    - Supercategory
    - Notes
  * - 1
    - PI/Dex
    -
    -
  * - 2
    - IMID/Dex
    -
    -
  * - 3
    - PI/IMID/Dex
    -
    -
  * - 4
    - Chemo/PI/Dex
    -
    -
  * - 5
    - Chemo/IMID/Dex
    -
    -
  * - 6
    - Dara/bortezomib/Dex
    - Dara/PI/Dex
    -
  * - 7
    - Dara/carfilzomib/Dex
    - Dara/PI/Dex
    -
  * - 8
    - Dara/ixazomib/Dex
    - Dara/PI/Dex
    -
  * - 9
    - Dara/lenalidomide/Dex
    - Dara/IMID/Dex
    -
  * - 10
    - Dara/pomalidomide/Dex
    - Dara/IMID/Dex
    -
  * - 11
    - Dara/thalidomide/Dex
    - Dara/IMID/Dex
    -
  * - 12
    - Isa/PI/Dex
    -
    -
  * - 13
    - Isa/IMID/Dex
    -
    -
  * - 14
    - Dara/PI/Chemo/Dex
    -
    -
  * - 15
    - Dara/PI/IMID/Dex
    -
    -
  * - 16
    - Other
    -
    -

.. todo::

  Verify the definitions of the treatment regimen categories with Manoj after
  checking what drugs show up in Flatiron data. That is, exactly which drugs
  should we include in each drug class (IMiD, PI, chemo, etc.), and what will be
  the consequences of lumping everything else into "Other"?

Modeled Affected Outcomes
+++++++++++++++++++++++++

.. list-table:: Modeled Outcomes
  :header-rows: 1

  * - Outcome
    - Affected measure
    - Effect size measure
    - Effect size
    - Note
  * - Mortality
    - Hazard rate of death
    - Hazard ratio
    - Various
    - HRs relative to mix of treatment observed in Flatiron survival data
  * - Relapse
    - Hazard rate of relapse
    - Hazard ratio
    - Various
    - HRs relative to mix of treatment observed in Flatiron survival data


Mortality and Relapse Effects
+++++++++++++++++++++++++++++

.. note::

  For more about how we model relapse, see :ref:`the Multiple Myeloma
  cause model <2019_cancer_model_multiple_myeloma>`.

For each multiple myeloma setting (NDMM, RRMM) in which it can be used,
each regimen category has a hazard ratio (HR) for mortality and an HR for relapse.
These hazard ratios are relative to the regimen category mix in the base survival curve.
Therefore, the hazard at time :math:`t` after incidence/relapse for a simulant
with covariates :math:`x` being treated with regimen category :math:`r` is:

.. math::

  h(t|x,r) = h(t|x) * HR_r

**Note that even though there are only two settings -- NDMM and RRMM -- there are
three base survival curves.** This is because HRs between ASCT
and non-ASCT NDMM regimen categories cannot be estimated. In NDMM,
the correct base curve is selected according to the treatment assigned, and then the
HR is applied to it.

.. todo::

  Explain how HRs were estimated, including both NMA and making them relative to
  Flatiron regimen category mix.

.. todo::

  These are placeholder values pending completion of network meta-analysis! The
  final files may not have values for *every* setting-category combination listed here, but
  they are guaranteed not to be missing any combinations that are possible outputs
  of the relevant treatment assignment model.

.. csv-table:: Mortality hazard ratios
  :file: mortality_hrs.csv
  :header-rows: 1

.. csv-table:: Relapse hazard ratios
  :file: relapse_hrs.csv
  :header-rows: 1

A lognormal distribution of uncertainty within the uncertainty intervals reported
above should be assumed (for the purposes of the placeholder values, the point
estimate can be ignored).

.. todo::

  Should there be correlation between mortality hazard ratio and relapse hazard ratio,
  similar to the correlation between OS and PFS in Phase 1?

.. todo::

  Note research considerations related to generalizability of the effect sizes listed above as well as the strength of the causal criteria, as discussed on the :ref:`general research consideration document <general_research>`.

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. todo::

  Add an assumption about time trend, once we determine which assumption we will make.

#. We assume that treatment assignment depends only on the selected covariates and
   characteristics of the preceding treatment, and that the remaining variation
   is truly random.
#. We assume a linear effect of line number/number of previous relapses on
   treatment assignment (in log-probability space).
#. We assume that all regimens within a regimen category have identical effects.
#. We assume that treatment regimen categories have proportional hazards; that is,
   their hazard ratios do not change depending on time since incidence/relapse.
#. We assume that treatment regimen categories do not have interaction effects
   with any covariates.

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
