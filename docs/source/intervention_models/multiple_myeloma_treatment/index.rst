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
set of mutually exclusive treatment regimen categories, and we will be supplementing
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
    - A preferred treatment for multiple myeloma in which a patient has stem cells extracted,
      is given high-dose chemotherapy, and then receives an infusion of their own stem cells.
      Not every patient with multiple myeloma is eligible for ASCT, and treatment strategy varies significantly
      between eligible and ineligible patients.
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

.. list-table:: Affected Outcomes
  :widths: 15 15 15 15
  :header-rows: 1

  * - Outcome
    - Effect
    - Modeled?
    - Note
  * - Mortality
    - Various
    - Yes
    -
  * - Relapse
    - Various
    - Yes
    -
  * - Response to future therapy
    - Decreases efficacy of similar therapy
    - No
    -
  * - Quality of life/disability weight
    - Various
    - No
    -

Vivarium Modeling Strategy
--------------------------

The Phase 1 simulation only considered three categories of treatment regimen:
isatuximab-containing, daratumumab-containing, and other. Transitions between
these were determined only by coverage proportions, unaffected by prior treatment
for the simulant or covariates.

In Phase 2, we are expanding the treatment regimen categories considerably, to a
total of 24, and making transitions dependent on prior treatment and covariates.

Treatment Regimen Category Components
+++++++++++++++++++++++++++++++++++++

These are the components that make up our modelled treatment regimen categories.
They are drug classes, individual drugs, and ASCT. Not every combination of these
components is a valid treatment regimen category; those are enumerated in the next section.

.. list-table:: Modeled Treatment Regimen Category Components
  :widths: 1 1 5 10
  :header-rows: 1

  * - Component
    - Abbreviation
    - Drugs
    - Notes
  * - Proteasome inhibitors
    - PI
    - bortezomib, carfilzomib, ixazomib
    -
  * - Immunomodulatory drugs
    - IMID
    - lenalidomide, pomalidomide, thalidomide
    -
  * - Chemotherapy drugs
    - Chemo
    - bendamustine, cyclophosphamide, doxorubicin
    -
  * - Daratumumab
    - Dara
    - daratumumab
    -
  * - Isatuximab
    - Isa
    - isatuximab
    -
  * - Dexamethasone
    - Dex
    - dexamethasone
    -
  * - Autologous stem cell transplant
    - ASCT
    - N/A
    - While ASCT is a subsequent step after induction therapy, we consider it
      part of the same line and it is included in the treatment regimen category as if it
      were at the time of induction. We restrict it to only appear in NDMM; while
      later transplants do occur in real life, they are relatively uncommon, and
      we do not model them.

.. note::

  The drug class components represent *exactly one* drug from
  that class. If there is more than one, the treatment regimen will always fall
  into one of the Other treatment regimen categories described in the next section.

Treatment Regimen Categories
++++++++++++++++++++++++++++

Based on conversations
with the client and with our clinical expert, we are expanding the
modeled treatment regimen categories to the following set of 24 mutually exclusive and exhaustive
categories:

.. list-table:: Modeled Treatment Regimen Categories
  :widths: 5 10
  :header-rows: 1

  * - Treatment regimen category
    - Notes
  * - PI+Dex
    -
  * - IMID+Dex
    -
  * - PI+IMID+Dex
    -
  * - Chemo+PI+Dex
    -
  * - Chemo+IMID+Dex
    -
  * - Dara+PI+Dex
    -
  * - Dara+IMID+Dex
    -
  * - Isa+PI+Dex
    -
  * - Isa+IMID+Dex
    -
  * - Dara+PI+Chemo+Dex
    -
  * - Dara+PI+IMID+Dex
    -
  * - Other
    - Covers all other combinations of *non-ASCT components* in the absence of ASCT.
  * - PI+Dex+ASCT
    - NDMM only
  * - IMID+Dex+ASCT
    - NDMM only
  * - PI+IMID+Dex+ASCT
    - NDMM only
  * - Chemo+PI+Dex+ASCT
    - NDMM only
  * - Chemo+IMID+Dex+ASCT
    - NDMM only
  * - Dara+PI+Dex+ASCT
    - NDMM only
  * - Dara+IMID+Dex+ASCT
    - NDMM only
  * - Isa+PI+Dex+ASCT
    - NDMM only
  * - Isa+IMID+Dex+ASCT
    - NDMM only
  * - Dara+PI+Chemo+Dex+ASCT
    - NDMM only
  * - Dara+PI+IMID+Dex+ASCT
    - NDMM only
  * - Other+ASCT
    - Covers all other combinations of *non-ASCT components* in the presence of ASCT.

Baseline Coverage Data
++++++++++++++++++++++++

If any simulants are initialized into the NDMM state in the multiple myeloma cause model
(this is TBD according to what is easier to implement), they will all be initialized
to PI+IMID+Dex. The 10-year burn-in period of running the treatment assignment scheme
described below will make this initialization almost entirely inconsequential.

Treatment Assignment
++++++++++++++++++++

The Phase 1 simulation had fixed coverage percentages for each treatment regimen category
in each line, which varied between scenarios. In Phase 2, we will assign treatment regimen categories
according to these three schemes:

#. In the baseline scenario, we use "sophisticated" models, which take into account covariates and prior
   treatment in a patient's history, and some postprocessing "business rules" that modify their predicted
   probabilities.
#. In the naive-model scenario (Model 1; Model 3's alternative scenario 1), we use naive models that always predict the same probabilities
   regardless of covariates, with the same postprocessing rules as the baseline scenario.
   This will be even simpler than Phase 1 because it has no time trend.
#. In the other alternative scenarios, we use sophisticated models (same as the baseline scenario) with modified
   postprocessing rules.

Both the naive and sophisticated models are informed by Flatiron data.

To be precise, in each scheme there will be two models: one that assigns the
first line of treatment (the treatment a simulant receives at the time of incidence of MM)
and another that assigns later lines (at time of 1st, 2nd, 3rd, etc relapse). All models output probabilities;
the simulation will apply the postprocessing rules and then randomly assign a treatment regimen category according to the final probabilities.

Naive Models
~~~~~~~~~~~~

The naive models can be summarized very easily. They are provided as CSV
files where the first row contains treatment regimen categories and the second contains corresponding
(invariant) probabilities of assignment.

.. list-table:: Naive probabilities CSV paths
  :widths: 1 10
  :header-rows: 1

  * - Name
    - Path
  * - NDMM
    - J:\\Project\\simulation_science\\multiple_myeloma\\data\\treatment_model_input\\2022_07_10\\ndmm_model_naive_proba.csv
  * - RRMM
    - J:\\Project\\simulation_science\\multiple_myeloma\\data\\treatment_model_input\\2022_07_10\\rrmm_model_naive_proba.csv

Sophisticated Models
~~~~~~~~~~~~~~~~~~~~

The sophisticated models are random forests.
To avoid over-fitting, the maximum number of leaf nodes permitted in each tree was selected by 5-fold stratified cross-validation,
optimizing for log-loss of probabilistic predictions.
Though tree-based approaches inherently involve selecting features, some feature selection had to be done manually because of missing data;
we used a complete-case analysis, dropping records that were missing data in any necessary field.
Therefore, there was a trade-off between using information available to us and losing statistical power and representativeness.
Renal impairment was included as a predictor in NDMM because it showed strong feature importance in that model.
Cytogenetic risk was not included in either model because it did not improve predictions and lead to smaller sample size.
We tested alternative codings of previous-treatment covariates, but none improved predictions.

The sophisticated models require a more complex simulation implementation approach. Because they need to be trained within Foundry, they have to be passed from
Foundry to Vivarium in a serialized format. While a human-readable and interoperable
format would be ideal, due to Foundry constraints we will use :code:`joblib.dump` to output :code:`.pkl` files. The pickled
form of the models may depend on the version of Python, :code:`sklearn`,
and possibly sklearn subdependencies they were trained with. We will need to align
these between the Vivarium environment and the Foundry environment and verify
that outputs are what we expect. For this last task, see the verification script below.

.. list-table:: Python and package versions at model training time
  :header-rows: 1

  * - Package
    - Version
  * - Python
    - 3.8.13
  * - scikit-learn
    - 1.1.1
  * - pandas
    - 0.25.3
  * - numpy
    - 1.19.5

.. note::

  As of now, there is a bug in Foundry that does not allow us to download the pickle
  file. So, as a workaround, we are printing the file as hex bytes and using this script
  to generate the binary file:

  .. literalinclude:: hex_to_binary.py
    :language: python
    :linenos:

Each pickled object is an sklearn Classifier, implemented by an sklearn Pipeline.
This object has a :code:`predict_proba` method which takes a pandas DataFrame
of covariates and returns a 2d numpy array of probabilities. That returned array
can be transformed into a DataFrame with meaningful column names like so:

.. code-block:: python

  ndmm_assignment_probs = pd.DataFrame(ndmm_model.predict_proba(ndmm_X_to_predict), columns=ndmm_model.classes_)

.. note::

  The :code:`.classes_` array may not contain all the treatment regimen categories in the model.
  Any treatment regimen categories missing should have probability 0 of being selected.

.. list-table:: Pickle file paths
  :widths: 1 10
  :header-rows: 1

  * - Name
    - Path
  * - NDMM
    - J:\\Project\\simulation_science\\multiple_myeloma\\data\\treatment_model_input\\2022_07_10\\ndmm_model.pkl
  * - RRMM
    - J:\\Project\\simulation_science\\multiple_myeloma\\data\\treatment_model_input\\2022_07_10\\rrmm_model.pkl
  * - NDMM naive model
    - J:\\Project\\simulation_science\\multiple_myeloma\\data\\treatment_model_input\\2022_07_10\\ndmm_model_naive.pkl
  * - RRMM naive model
    - J:\\Project\\simulation_science\\multiple_myeloma\\data\\treatment_model_input\\2022_07_10\\rrmm_model_naive.pkl


Model Covariates
~~~~~~~~~~~~~~~~

.. list-table:: Covariates for NDMM treatment assignment
  :header-rows: 1

  * - Column name
    - Description
    - Allowed values
  * - FirstTreatmentAge
    - Age at time of first treatment/incidence of MM (for NDMM, this equals current age) in un-rounded years.
    -
  * - Sex
    - The simulant's sex. Binary because our source data does not distinguish between intersex and not recorded.
    - 'M' or 'F'
  * - RenalImpairment
    - Whether or not the simulant has renal impairment.
    - 0 or 1
  * - Year
    - Current (unrounded) year minus 2000. e.g. 22.5 for halfway through 2022.
    -

.. list-table:: Covariates for RRMM treatment assignment
  :header-rows: 1

  * - Column name
    - Description
    - Allowed values
  * - FirstTreatmentAge
    - Age at time of first treatment/incidence of MM in un-rounded years.
    -
  * - Sex
    - The simulant's sex. Binary because our source data does not distinguish between intersex and not recorded.
    - 'M' or 'F'
  * - Year
    - Current (unrounded) year minus 2000. e.g. 22.5 for halfway through 2022.
    -
  * - Duration_previous
    - Time since the **previous** relapse in days. In other words, the number of days the simulant spent in the cause model state they are transitioning out of.
    -
  * - {component}_flag_previous
    - For each component part of a valid treatment regimen category (e.g. 'PI', 'IMID', 'ASCT')
      a binary flag indicating whether it was present in the previous line of treatment.
      The Isa_flag_previous and Dara_flag_previous flags are ignored by the treatment model, but used in the business rules.
    - 0 or 1
  * - IsaOrDara_flag_previous
    - A binary flag indicating whether Dara **or** Isa was present in the previous line of treatment. They are assumed to affect future treatment identically.
    - 0 or 1
  * - NumberOfComponents_previous
    - **Number** of component parts of a valid treatment regimen category (e.g. 'PI', 'IMID', 'ASCT')
      present in the previous line of treatment. Equivalently, the sum of {component}_flag_previous across
      all components.
    -
  * - LineNumber
    - Line of treatment. Equal to the number of relapses + 1.
    - Less than or equal to 5.
  * - TimeSinceFirstTreatment
    - Time elapsed since first treatment (a.k.a. incidence of MM) in unrounded years.
    -

Model Transfer Verification
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following script verifies that assignment probabilities for a certain set of covariates
match those generated within Foundry. It requires access to all the files in J:\\Project\\simulation_science\\multiple_myeloma\\data\\treatment_model_input\\2022_07_10.

.. literalinclude:: verify_model_probabilities.py
  :language: python
  :linenos:

Postprocessing rules
~~~~~~~~~~~~~~~~~~~~

Goals
^^^^^

Our postprocessing rules are designed so that:

* We do not assign Isa or Dara regimen categories before those treatments were approved/in use.
* We approximately match the Isa coverage (sum of all Isa-containing regimen categories) from our line- and year-specific projections.
* We approximately match the Dara coverage (sum of all Dara-containing regimen categories) from ? (data source TBD, for now we will use Phase 1 numbers but expect to update these). Though we do have the sample size to inform this from Flatiron, it is not clear how to extrapolate it (see coverage inputs section below).
* The split between the Isa-containing regimen categories matches the split between the analogous Dara-containing categories observed in Flatiron, conditional on covariates.
* All non-Isa categories are associated with covariates according to the observed associations in Flatiron.
* Isa is associated with covariates -- besides line and year -- in the same way as Dara (they have the same patient profile), except that when it follows Dara in our Isa-after-Dara scenario, it is constant across these covariates.
* The probability of interest for each of our alternative scenarios (probability of Isa after Dara, probability of Isa in the first line) approximates our specified probability in that scenario, and is zero in all other scenarios. When Isa scales up in these scenarios, it selectively replaces Dara.
* We use extrapolation from Flatiron data to project time trends of all regimen categories **that do not contain Isa or Dara** into the future. This may be a linear or flat (every future year is like the present) extrapolation, depending on treatment assignment model choices.

Detailed description
^^^^^^^^^^^^^^^^^^^^

After getting the predicted probabilities from the model as described above, perform the following steps:

#. Multiply the probability of each Dara-containing regimen category by :math:`\text{dara_target_coverage} / \text{projected_dara}`, where dara_target_coverage is a linear interpolation or extrapolation by year of the scenario- and line-specific value in the "Target Dara coverage" data file, and projected_dara is a linear interpolation or extrapolation by year of the line-specific value of "Dara_all" from the "Projected Dara coverage from Flatiron" data file.
#. If the date is before Jan. 1, 2016 and this is an RRMM assignment, set the probabilities of all Dara-containing categories to 0.
#. If the date is before Jan. 1, 2019 and this is an NDMM assignment, set the probabilities of all Dara-containing categories to 0.
#. For each of the regimen category pairs that only differ by substituting Isa with Dara, perform this step:
    * Set the probability of the Isa-containing category to :math:`p_\text{dara} * \frac{\text{isa_target_coverage}}{\text{dara_target_coverage} * (\text{projected_dara_isa_corresponding} / \text{projected_dara})}`, where :math:`p_\text{dara}` is the probability of the corresponding Dara regimen category (after application of previous steps), isa_target_coverage is a linear interpolation or extrapolation by year of the scenario- and line-specific value in the "Target Isa coverage" data file, dara_target_coverage is a linear interpolation or extrapolation by year of the scenario- and line-specific value in the "Target Dara coverage" data file, projected_dara_isa_corresponding is a linear interpolation or extrapolation by year of the scenario- and line-specific value of "Dara_Isa_corresponding" from the "Dara coverage from Flatiron" data file, and projected_dara is a linear interpolation or extrapolation by year of the line-specific value of "Dara_all" from the "Projected Dara coverage from Flatiron" data file.
#. If this is an RRMM assignment and the previous line contained a Dara component (in other words, if the Dara_flag_previous in the model covariates table above is 1):
    #. If the scenario is alternative scenario 2 (Isa-after-Dara) and the patient is in second line treatment (first relapse state), multiply the probabilities of all Dara-containing categories by ((the sum of the probabilities of all the Isa- **or** Dara-containing categories - target Isa retreatment coverage) / the sum of all the Dara-containing categories), then multiply the probabilities of all Isa-containing categories by (target Isa retreatment coverage / the sum of the probabilities of all the Isa-containing categories), where "target Isa retreatment coverage" is 0.05 or the sum of all Isa- **or** Dara-containing categories, whichever is less.
    #. Otherwise, multiply the probabilities of all Dara-containing categories by (the sum of all the Isa- **or** Dara-containing categories / the sum of all the Dara-containing categories), then set the probabilities of all Isa-containing categories to 0.
#. Split the probabilities into two sets: those that contain ASCT and those that do not. Within each set:
    #. Divide the probabilities of the categories that **do not contain Isa or Dara** by the sum of those probabilities.
    #. Multiply the probabilities of the categories that **do not contain Isa or Dara** by (1 - the sum of the probabilities that **do contain Isa or Dara**).
#. The probabilities should now sum to 1, and the probabilities of Isa- and Dara-containing categories should not have changed in the last two steps.
#. Sample the assigned treatment.

Example code
^^^^^^^^^^^^

Below is Python code implementing these rules in a non-Vivarium context, for use as a guide.

.. code-block:: python

  # Assumes a single Pandas DataFrame (NDMM and RRMM) with all covariates, joined with the regimen category
  # probabilities from the relevant assignment model, where each row is a simulant. The RRMM-only covariates
  # are assumed to be null for NDMM simulants.

  all_regimen_categories = [
    'PI+Dex',
    'IMID+Dex',
    'PI+IMID+Dex',
    'Chemo+PI+Dex',
    'Chemo+IMID+Dex',
    'Dara+PI+Dex',
    'Dara+IMID+Dex',
    'Isa+PI+Dex',
    'Isa+IMID+Dex',
    'Dara+PI+Chemo+Dex',
    'Dara+PI+IMID+Dex',
    'Other',
    'PI+Dex+ASCT',
    'IMID+Dex+ASCT',
    'PI+IMID+Dex+ASCT',
    'Chemo+PI+Dex+ASCT',
    'Chemo+IMID+Dex+ASCT',
    'Dara+PI+Dex+ASCT',
    'Dara+IMID+Dex+ASCT',
    'Isa+PI+Dex+ASCT',
    'Isa+IMID+Dex+ASCT',
    'Dara+PI+Chemo+Dex+ASCT',
    'Dara+PI+IMID+Dex+ASCT',
    'Other+ASCT',
  ]

  dara_containing = [c for c in all_regimen_categories if 'Dara' in c]
  isa_containing = [c for c in all_regimen_categories if 'Isa' in c]
  asct_containing = [c for c in all_regimen_categories if 'ASCT' in c]
  isa_dara_pairs = [
    ('Isa+PI+Dex', 'Dara+PI+Dex'),
    ('Isa+IMID+Dex', 'Dara+IMID+Dex'),
    ('Isa+PI+Dex+ASCT', 'Dara+PI+Dex+ASCT'),
    ('Isa+IMID+Dex+ASCT', 'Dara+IMID+Dex+ASCT'),
  ]

  # This imagines that dara_target and isa_target are pd.Series with multi-indices of (scenario, line, year),
  # and that dara_coverage_projected is a pd.DataFrame with multi-index of (line, year) with columns Dara_all and Dara_isa_corresponding
  probabilities_df['Scenario'] = scenario
  # TODO: Both of these need to interpolate/extrapolate by year, however that is done in Vivarium
  dara_target_coverage = dara_target.loc[zip(probabilities_df.Scenario, probabilities_df.LineNumber, probabilities_df.Year)]
  projected_dara = dara_coverage_projected.loc[zip(probabilities_df.LineNumber, probabilities_df.Year), 'Dara_all']

  for dara_regimen_category in dara_containing:
    probabilities_df[dara_regimen_category] = probabilities_df[dara_regimen_category] * (dara_target_coverage / projected_dara)

  if date < datetime.date(2016, 1, 1):
    probabilities_df.loc[probabilities_df.LineNumber > 1, dara_containing] = 0
  if date < datetime.date(2019, 1, 1):
    probabilities_df.loc[probabilities_df.LineNumber == 1, dara_containing] = 0
  
  # TODO: Both of these need to interpolate/extrapolate by year, however that is done in Vivarium
  isa_target_coverage = isa_target.loc[zip(probabilities_df.Scenario, probabilities_df.LineNumber, probabilities_df.Year)]
  projected_dara_isa_corresponding = dara_coverage_projected.loc[zip(probabilities_df.LineNumber, probabilities_df.Year), 'Dara_isa_corresponding']

  for isa_regimen_category, dara_regimen_category in isa_dara_pairs:
    probabilities_df[isa_regimen_category] = probabilities_df[dara_regimen_category] * (isa_target_coverage / (dara_target_coverage * (projected_dara_isa_corresponding / projected_dara)))

  if scenario == 'alternative_2_isa_after_dara':
    dara_containing_sum = probabilities_df.loc[(probabilities_df.LineNumber == 2) & (probabilities_df.Dara_flag_previous == 1), dara_containing].sum(axis=1)
    isa_containing_sum = probabilities_df.loc[(probabilities_df.LineNumber == 2) & (probabilities_df.Dara_flag_previous == 1), isa_containing].sum(axis=1)
    target_isa_retreatment_coverage = np.minimum(0.05, dara_containing_sum + isa_containing_sum)
    probabilities_df.loc[(probabilities_df.LineNumber == 2) & (probabilities_df.Dara_flag_previous == 1), dara_containing] *= ((dara_containing_sum + isa_containing_sum - target_isa_retreatment_coverage) / dara_containing_sum)
    probabilities_df.loc[(probabilities_df.LineNumber == 2) & (probabilities_df.Dara_flag_previous == 1), isa_containing] *= target_isa_retreatment_coverage / isa_containing_sum
  else:
    dara_containing_sum = probabilities_df.loc[(probabilities_df.LineNumber == 2) & (probabilities_df.Dara_flag_previous == 1), dara_containing].sum(axis=1)
    isa_containing_sum = probabilities_df.loc[(probabilities_df.LineNumber == 2) & (probabilities_df.Dara_flag_previous == 1), isa_containing].sum(axis=1)
    probabilities_df.loc[(probabilities_df.LineNumber == 2) & (probabilities_df.Dara_flag_previous == 1), dara_containing] *= ((dara_containing_sum + isa_containing_sum) / dara_containing_sum)
    probabilities_df.loc[(probabilities_df.LineNumber == 2) & (probabilities_df.Dara_flag_previous == 1), isa_containing] = 0

  # All scenarios: Isa after Dara in lines 3, 4, 5 never happens
  dara_containing_sum = probabilities_df.loc[(probabilities_df.LineNumber > 2) & (probabilities_df.Dara_flag_previous == 1), dara_containing].sum(axis=1)
  isa_containing_sum = probabilities_df.loc[(probabilities_df.LineNumber > 2) & (probabilities_df.Dara_flag_previous == 1), isa_containing].sum(axis=1)
  probabilities_df.loc[(probabilities_df.LineNumber > 2) & (probabilities_df.Dara_flag_previous == 1), dara_containing] *= ((dara_containing_sum + isa_containing_sum) / dara_containing_sum)
  probabilities_df.loc[(probabilities_df.LineNumber > 2) & (probabilities_df.Dara_flag_previous == 1), isa_containing] = 0

  isa_dara_probabilities_before_normalization = probabilities_df[isa_containing + dara_containing]
  for category_set in (asct_containing, [c for c in all_regimen_categories if c not in asct_containing]):
    dara_isa_containing = [c for c in category_set if c in dara_containing or c in isa_containing]
    non_isa_dara_containing = [c for c in category_set if c not in dara_isa_containing]
    probabilities_df.loc[:, non_isa_dara_containing] /= probabilities_df.loc[:, non_isa_dara_containing].sum(axis=1)
    probabilities_df.loc[:, non_isa_dara_containing] *= (1 - probabilities_df.loc[:, dara_isa_containing].sum(axis=1))
  assert np.allclose(probabilities_df.loc[:, all_regimen_categories].sum(axis=1), 1.0, atol=1e-10, rtol=0)
  assert probabilities_df[isa_containing + dara_containing].equals(isa_dara_probabilities_before_normalization)

Coverage inputs
^^^^^^^^^^^^^^^

.. image:: dara_coverage_plot.png
  :width: 800
  :alt: Dara (and Isa) coverage plot

The upward trend in Dara use observed in Flatiron is steep; a linear extrapolation (in logistic space) out to 2028 puts it at nearly 100%. A tree-based model such as a random forest creates a flat extrapolation, in which all future years are the same as the present.

Notably, all Flatiron data (new and old LoT coding) points to higher Dara uptake than the projections we used in Phase 1.

Data files:

:download:`Target Isa coverage <target_isa_coverage.csv>`

.. todo::

  The target Dara numbers are not finalized!

:download:`Target Dara coverage <target_dara_coverage.csv>`

Dara coverage from Flatiron can be found at J:\\Project\\simulation_science\\multiple_myeloma\\data\\treatment_model_input\\2022_07_10\\dara_coverage_from_flatiron.csv.

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

Mortality and relapse hazard ratios for each regimen category, plus the major subcategories of the 'Other' category, in each setting were estimated using a
network meta-analysis of published findings with study random effects. The majority of categories could
be connected by a network of randomized controlled trials (RCTs). Other categories
were connected using non-randomized evidence: two matched analyses between different RCTs,
and two matched analyses comparing RCT evidence with claims data, were included. Assumptions
of equivalence, with included uncertainty, were made between substantially similar
categories, including those that differed only by substitution of Isa with Dara, and those that differed only
by substitution of melphalan with cyclophosphamide and prednisone/prednisolone with dexamethasone. We assumed
that adding drugs to a regimen could not decrease efficacy. After estimating HRs for each subcategory, the HR
of the 'Other' category was calculated by weighting these subcategories according to the observed proportions
of use in Flatiron data.

The effect of ASCT was estimated separately with a small meta-analysis of two RCTs: [DETERMINATION]_ and [IFM_2009]_.
ASCT and induction regimen were assumed not to modify each others' effects.

After estimating HRs relative to a common reference category by combination of induction regimen
and ASCT effects, a HR relative to the common reference category was calculated for the population-level
mix of treatments observed in Flatiron data, which informs the base hazard described above. All HRs were
then modified to be relative to this population-level mix.

.. csv-table:: Mortality hazard ratios
  :file: mortality_hrs.csv
  :header-rows: 1

:download:`mortality_hrs.csv`

.. csv-table:: Relapse hazard ratios
  :file: relapse_hrs.csv
  :header-rows: 1

:download:`relapse_hrs.csv`

A log-normal distribution of uncertainty within the uncertainty intervals reported
above should be assumed. The mortality and relapse hazard ratios for the same
regimen category should be sampled with the same random percentile from their respective distributions,
so that mortality and relapse effects are correlated.

Assumptions and Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. We assume that treatment assignment depends only on the selected covariates and
   characteristics of the immediately preceding treatment, and that the remaining variation
   is truly random.
#. We assume that regimen categories not including Isa or Dara will not change
   in relative proportion between the end of our data (roughly 2022) and the end
   of our simulation (2028).
#. We only model ASCT in NDMM.
#. We assume all conditioning regimens for ASCT have identical effects.
#. We assume all maintenance therapies, or the lack of maintenance therapy, have
   identical effects.
#. We assume that all regimens within a regimen category have identical effects.
#. We assume that treatment regimen categories have proportional hazards; that is,
   their hazard ratios do not change depending on time since incidence/relapse.
#. We assume that treatment regimen categories do not have interaction effects
   with any covariates.

Validation and Verification Criteria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Treatment Assignment
^^^^^^^^^^^^^^^^^^^^

In each year, line, and age group, we will calculate the proportions of initiated treatments that were in each treatment
regimen category using the output of the treatment observer.

When the simulation is using a naive treatment assignment scheme, these should approximately equal the proportions of the relevant (NDMM or RRMM) naive scheme, in every year and line. In practice, we will bin later lines to have sufficient
sample size to verify this.

When the simulation is using a sophisticated treatment assignment scheme, NDMM treatment proportions should be similar to the naive proportions, except that:

 #. Treatments with a positive time trend according to our model outputs in Foundry have higher proportions in the
    first year. They should have even higher proportions in later simulation years. Both of these effects will be
    reversed for treatments with negative time trends.
 #. Treatments with a positive age trend according to our model outputs in Foundry have higher proportions in older
    age groups, and vice versa.

.. todo::

  How do we verify RRMM treatment assignment once we are using a sophisticated treatment assignment scheme?

Treatment Effects
^^^^^^^^^^^^^^^^^

In each timestep, we will calculate the death risk and relapse risk in each treatment regimen category.
The death risk is :code:`died_by_end` divided by :code:`alive_at_start`, while the relapse risk is :code:`progressed_by_end` divided by :code:`alive_at_start`.
All of these values are recorded by the survival observer.

When the simulation is using a naive treatment assignment scheme, the relative risk of death or relapse between treatment :math:`t1` and treatment :math:`t2` in a timestep, :math:`risk_{t1} / risk_{t2}`,
should approximately equal the ratio of the corresponding HRs, :math:`HR_{t1} / HR_{t2}`. In practice,
we will bin groups of adjacent timesteps in order to have sufficient sample size to verify this.

.. todo::

  How do we verify treatment effects once we are using a sophisticated treatment assignment scheme?

References
~~~~~~~~~~

.. [DETERMINATION] Triplet Therapy, Transplantation, and Maintenance until Progression in Myeloma
   https://www.nejm.org/doi/full/10.1056/NEJMoa2204925
   (accessed July 9, 2022)

.. [IFM_2009] Early Versus Late Autologous Stem Cell Transplant in Newly Diagnosed Multiple Myeloma: Long-Term Follow-up Analysis of the IFM 2009 Trial
   https://ash.confex.com/ash/2020/webprogram/Paper134538.html
   (accessed July 9, 2022)
