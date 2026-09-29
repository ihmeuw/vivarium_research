.. _costing_lit_review_vivarium_mncnh_portfolio:


..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  ---------------------

  Section Level 2 (#.#)
  +++++++++++++++++++++

  Section Level 3 (#.#.#)
  ~~~~~~~~~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.


MNCNH Portfolio Costing Analysis
================================

.. contents::
  :local:
  :depth: 2


1.0 Background
--------------

In tandem with our simulation of the MNCNH portfolio [[todo: insert link to concept model]], 
we are conducting a systematic literature review to estimate the costs of delivering several different maternal and newborn health interventions in low- and middle-income countries. 
Cost estimates derived from this literature review (extracted in the form of reported components such as personnel, consumables, and distribution, 
then meta-regressed to understand variability across locations and delivery contexts) will be paired with the effectiveness estimates from the microsimulation to determine cost-effectiveness of these interventions, 
helping funders and other decision-makers compare interventions and allocate resources to ensure greatest reduction in maternal and newborn burden of disease.
In past iterations of this work, we have also conducted cost-effectiveness analyses [[todo: insert reference to past costing work, appendix from NO]], 
however, the methods by which we are conducting our current economic analysis differ from previous projects in 3 key ways:

1. Systematic literature review of all available published data on each intervention and associated costs. [[todo: insert link to lit review section]]
2. Use of regression tool (MR-BRT) as opposed to a simple calculation of average. [[todo: insert link to data processing SOP and MR-BRT methodology section]]
3. Finer granularity in cost categories. [[todo: insert link to cost taxonomy]]

We have also scoped a Wave 2 and Wave 3 of this costing analysis which will complicate the way by which the different cost components associated with intervention delivery are scaled, 
such that rather than estimating the cost of delivering each additional unit of an intervention (i.e., cost per person treated), 
we will consider the natural unit of scale for each cost category modeled in order to more realistically capture the true costs of scaling up the delivery of an intervention (e.g., cost per facility-year, cost per new health worker-year). 
We also hope to include what are known as offset costs in later iterations of our costing model, such as cost savings from averted healthcare utilization due to improved maternal and newborn health outcomes.
The details of these later waves are still being determined, and you can read more later in this document. [[todo: insert link to descriptions of wave 2 and 3]]



1.1 Scope
+++++++++

The below table lists the MNCNH portfolio interventions that we are planning to produce cost estimates for, 
along with their corresponding model documentation and the status of cost estimation.

.. list-table:: Interventions in scope for costing
  :header-rows: 1
  :widths: 18 40 42

  * - Simulation stage
    - Intervention
    - Model documentation
    - Status of costing
  * - Antenatal
    - Iron and folic acid supplementation (IFA)
    - :ref:`Oral iron in pregnancy <oral_iron_antenatal>`
    - Cost estimates have been extracted from literature but not yet processed
  * - Antenatal
    - Multiple micronutrient supplementation (MMS)
    - :ref:`Oral iron in pregnancy <oral_iron_antenatal>`
    - Cost estimates have been extracted from literature but not yet processed
  * - Antenatal
    - Intravenous iron for anemia in pregnancy
    - :ref:`IV iron intervention <intervention_iv_iron_antenatal_mncnh>`
    - Cost estimates have been extracted from literature but not yet processed
  * - Antenatal
    - Anemia screening (ANC hemoglobin testing)
    - :ref:`Anemia screening <anemia_screening>`
    - Cost estimates have been extracted from literature but not yet processed
  * - Antenatal
    - Standard and AI-assisted ultrasound
    - :ref:`AI ultrasound module <2024_vivarium_mncnh_portfolio_ai_ultrasound_module>`
    - Cost estimates have been extracted from literature and partially processed
  * - Antenatal
    - Pre-eclampsia testing and treatment
    - Not yet documented
    - Cost estimates have not yet been extracted from literature
  * - Intrapartum
    - Intrapartum azithromycin for maternal sepsis prevention
    - :ref:`Azithromycin intervention <azithromycin_intervention>`
    - Cost estimates have been extracted from literature and partially processed
  * - Intrapartum
    - Misoprostol for prevention of postpartum hemorrhage
    - :ref:`Misoprostol intervention <misoprostol_intervention>`
    - Cost estimates have been extracted from literature but not yet processed
  * - Intrapartum
    - Antenatal corticosteroids
    - :ref:`ACS intervention <acs_intervention>`
    - Cost estimates have not yet been extracted from literature
  * - Intrapartum
    - E-MOTIVE bundle for postpartum hemorrhage treatment
    - :ref:`E-MOTIVE intervention <emotive_intervention>`
    - Cost estimates have not yet been extracted from literature
  * - Intrapartum
    - Caesarean section (elective and emergent [[double-check types of c-section]])
    - :ref:`Intrapartum interventions module <2024_vivarium_mncnh_portfolio_intrapartum_interventions_module>`
    - Cost estimates have not yet been extracted from literature 
  * - Intrapartum
    - Intrapartum sensors
    - Not yet documented
    - Cost estimates have not yet been extracted from literature
  * - Neonatal
    - Inpatient and outpatient antibiotic management of PSBI
    - :ref:`Neonatal antibiotics <intervention_neonatal_antibiotics>`
    - Cost estimates have been extracted from literature and partially processed
  * - Neonatal
    - CPAP for respiratory distress syndrome
    - :ref:`CPAP intervention <intervention_neonatal_cpap>`
    - Cost estimates have been partially extracted from literature ([[double-check: literature review still in screening phase?]])
  * - Neonatal
    - Probiotics for infection prevention in preterm neonates
    - :ref:`Neonatal probiotics <intervention_neonatal_probiotics>`
    - Cost estimates have been extracted from literature and partially processed

.. note::

  This table summarizes the status of the costs estimated for scoped interventions and was 
  last updated on 2025-09-28.

.. _costing_lit_review_taxonomy:

2.0 Cost taxonomy
-----------------

2.1 Three kinds of extracted estimate
+++++++++++++++++++++++++++++++++++++

Extracted values fall into one of three buckets, recorded in the ``cost_type``
field of the extraction sheet:

**Unit costs** — the cost of delivering one unit of intervention to one person.
These are the focus of the costing model and the input to the meta-regression.

**Cost-effectiveness estimates** — published ICERs and similar. These are *not*
inputs to our analysis; they are retained as validity checks against the
cost-effectiveness estimates we eventually produce from our own unit costs and
simulation output.

**Offset costs** — as above: extracted, but out of scope for the unit cost.

2.2 Unit cost taxonomy (wave 1)
-------------------------------

[[after defining unit costs, show how we're using  wave 1 cost taxonomy and 
to calculate our first estimates via regression (regression for each intervention-category
pair, then sum total to get overall cost of intervention per person)]]

2.3 Unit cost taxonomy (wave 2 & 3)
-----------------------------------

[[describe how each cost category has a different natural unit
and even though for wave 1 costs we are assuming all cost categories scale up by person, 
we know it's more complicated than this in reality]]


3.1 Intervention Profile Sheet
++++++++++++++++++++++++++++++

[[Unit definitions, protocols, and delivery assumptions are maintained in the
**Intervention Profile Sheet**, which serves three purposes: it standardizes what
each intervention is assumed to consist of, it records which cost categories are
relevant to each intervention, and it identifies which interventions share delivery
platforms and are therefore reasonable cost proxies for one another.

For each intervention, the sheet records:

- The unit being costed, and the dosage or quantity constituting a full treatment.
- The relevant WHO guideline, and the narrowed-down protocol we assume.
- The standard-of-care comparator, if any.
- Personnel type and time required to deliver, and the delivery facility type. See
  the
  :ref:`delivery facility choice model <2024_facility_model_vivarium_mncnh_portfolio>`
  for the facility types represented in the simulation.
- Which cost categories from the taxonomy are relevant.
- Covariates and stratifications for that intervention.
- Assumed time frame for scale-up.
- The literature used for effects and the literature used for costs, kept in
  separate columns because they are frequently different bodies of work.
]]

4.0 Literature review methods
-----------------------------

We follow PRISMA 2020 guidelines and the GBD systematic review protocol so that the
search is systematic and replicable. Searches are conducted and tracked in
**DistillerSR**, which retains PubMed search history, allows inclusion criteria to
be edited retroactively without restarting screening, and maintains the PRISMA 2020
flow diagram automatically. One search is run per intervention. 


4.1 Review process
++++++++++++++++++

1. Develop inclusion criteria and the search string, with assistance from a UW
   Health Sciences librarian.
2. Run the search in PubMed within Distiller; import EMBASE references (and Web of
   Science and EconLit where relevant) separately; de-duplicate.
3. **Screening level 1 (title/abstract).** One reviewer screens 100% of references;
   a second reviewer screens a random 10% as a quality check. Conflicts are
   resolved by group discussion.
4. **Screening level 2 (full text).** Same dual-screening protocol.
5. Iterate on search strategy and inclusion criteria depending on the number of
   references returned.
6. Data extraction into the extraction sheet.
7. Data processing for meta-regression — see the
   :ref:`meta-regression document <costing_metaregression_vivarium_mncnh_portfolio>`.

Reviews and meta-analyses are excluded from extraction, but are flagged during
screening so that their reference lists can be used to augment the search.


4.2 Inclusion and exclusion criteria
++++++++++++++++++++++++++++++++++++

Criteria are defined per intervention using the **PICOS** framework — Population,
Intervention, Comparison, Outcome, Study design. In DistillerSR, exclusion reasons
are selected from a form so that exclusions are auditable.

Across all interventions the study design criterion is the same: **RCT or costing
study collecting primary data**.

.. list-table:: PICOS criteria by intervention
  :header-rows: 1
  :widths: 16 28 20 18 18

  * - Intervention
    - Population
    - Intervention
    - Comparison
    - Outcome
  * - Intrapartum azithromycin
    - General population; may narrow to antenatal care depending on screening yield
    - Azithromycin or similar oral antibiotic
    - Any
    - Sepsis prevention and associated costs
  * - Neonatal probiotics
    - Newborn infants; not limited to preterm, though most literature concerns low
      birthweight or preterm infants
    - Probiotics
    - Any
    - Neonatal sepsis or NEC prevention and associated costs
  * - Standard ultrasound
    - Obstetric or pregnant patients in any LMIC healthcare setting
    - Standard ultrasound scan
    - Any
    - Costs associated with intervention
  * - Intravenous iron
    - Pregnant patients
    - Any IV iron
    - Oral iron
    - Anemia
  * - Oral iron (IFA and MMS)
    - Pregnant patients
    - IFA / MMS
    - Any
    - Anemia
  * - Anemia screening
    - Pregnant patients
    - Anemia screening
    - Any
    - Anemia
  * - Neonatal antibiotics
    - Infants
    - Neonatal antibiotics for prevention and management of PSBI
    - Any
    - Costs associated with intervention
  * - CPAP
    - Infants and neonates
    - CPAP availability, including lower-cost CPAP variants such as VAYU
    - Standard CPAP or invasive mechanical ventilation
    - Respiratory distress syndrome and associated costs

.. todo:: 
  Define criteria for the remaining portfolio interventions (antenatal corticosteroids,
  E-MOTIVE, generalized hospitalization and patient admission, and caesarean section).


4.3 Search strategy
+++++++++++++++++++

[[ link to sharepoint excel with search strategies for each intervention and note that
searches are also tracked in distiller]]

.. _costing_lit_review_extraction:

5.0 Data extraction
-------------------

.. list-table:: Extraction sheet fields
  :header-rows: 1
  :widths: 32 68

  * - Field
    - Description
  * - ``citation``
    - Short citation.
  * - ``URL/file_path``
    - URL, file path, or DOI for the source.
  * - ``year_published``
    - Publication year.
  * - ``study_design``
    - Type of study or article.
  * - ``study_location``
    - Country or location; repeated for every value from that study.
  * - ``year_start``, ``year_end``
    - Years the data in the study pertain to.
  * - ``table or page_number``
    - Where in the source the value was reported.
  * - ``intervention_name``
    - Name of the MNCNH portfolio intervention.
  * - ``target_population``
    - Who was included in the study's cost estimates.
  * - ``healthcare_setting``
    - Facility type or setting.
  * - ``intervention_description``
    - What the intervention consisted of, including dosage and regimen.
  * - ``cost_type_description``
    - How the study authors described this cost, in their words.
  * - ``cost_type_description_simplified``
    - Standardized description of what the cost includes. More specific than the
      cost category — "probiotics" rather than "product cost" — and standardized
      enough to group like costs across studies for the regression.
  * - ``cost_category``
    - Which taxonomy category or categories this maps to.
  * - ``cost_value``
    - The extracted cost estimate. One value per row.
  * - ``uncertainty_value``
    - The uncertainty value or values, if reported.
  * - ``uncertainty_type``
    - How uncertainty is defined: 95% CI, standard deviation, min–max.
  * - ``uncertainty_origin``
    - How the uncertainty arose — three different costs averaged, a range of prices
      across facilities. This informs how the uncertainty can be used in the
      regression.
  * - ``cost_unit``
    - Unit of the cost as reported: per visit, per patient, per cohort, per day.
  * - ``conversion_factor``
    - The number needed to convert the reported value to a unit cost: length of
      treatment, number of people, dosage.
  * - ``conversion_factor_description``
    - What the conversion factor represents for this study.
  * - ``payer_perspective``
    - Perspective, if reported.
  * - ``currency``
    - Currency the cost was reported in.
  * - ``base_year``
    - Base year for inflation adjustment.
  * - ``data_source``
    - Where the study obtained the cost: primary micro-costing, price catalogue,
      facility survey, expert opinion, manufacturer quote. Also indicates whether
      prices were collected locally or from international markets, which determines
      the currency conversion approach.
  * - ``notes``
    - Anything else needed to interpret the value.
  * - ``extractor``
    - Who extracted the row.
  * - ``cost_type``
    - Unit cost, cost-effectiveness estimate, or offset cost.



5.1 Extraction conventions
++++++++++++++++++++++++++

[[Review]]

A few conventions exist specifically to keep downstream processing tractable.

**One value per row.** Cells containing multiple numbers, or numbers mixed with
explanatory text, cannot be processed programmatically. Where a study reports
several values for what is conceptually the same cost, they are split into separate
rows.

**Record conversion factors explicitly.** Most reported costs are not in the unit we
need, and the number required to convert them is often buried in the methods
section — a mean 23.6 days of treatment, 82 participants in a trial arm, a 2 g single
dose delivered as four 500 mg tablets, three minutes of pharmacy technician time.
These go in ``conversion_factor``, with their meaning in
``conversion_factor_description``.

**Record how uncertainty was obtained, not just its value.** A 95% CI from a trial
and a min–max range across price catalogue entries are different kinds of
uncertainty and are usable in different ways.

**Standardize location and currency fields** for direct use by the currency
conversion script.

**Do not be afraid to add columns**, as long as extraction does not become onerous.
The important thing is a standardized place for each kind of value — the more
standardized the sheet, the more of the processing can be automated and trusted.


5.2 Summary of Data sources 
+++++++++++++++++++++++++++

Cost estimates in the included literature come from a wide range of underlying
sources, and the source materially affects how the estimate should be treated:

- Primary micro-costing at study sites
- Programme and facility financial or expenditure records
- Price catalogues, reference prices, and national tariff databases
- Facility and pharmacy surveys or records
- Expert opinion surveys
- Household or patient surveys
- Manufacturer, supplier, or implementer quotes


8.0 Relevant links
------------------

[[Todo: add relevant links]]

Methodological references informing this work:

- PRISMA 2020 statement and checklist.
- WHO-CHOICE guidelines on cost-effectiveness analysis: perspective, discounting,
  and allocation of joint costs.
- Guttmacher Institute *Adding It Up* methodology report — transparent cost
  breakdowns by personnel, commodities, inpatient days, and overhead, with indirect
  markup rates applied to direct costs for programme and systems costs.
- Disease Control Priorities, 3rd edition (DCP3) — ICER estimates generalized to
  LIC/LMIC contexts using GDP or wage proxies.
- OneHealth Tool, LiST, and Optima Nutrition — existing MNCH costing tools.
- MINIMOD — fortified food product costing, including start-up and operational
  costs.
- *Economic evaluations of maternal health interventions: a scoping review*.
- *Economic evaluations of interventions to reduce neonatal morbidity and mortality:
  a review of the evidence in LMICs and its implications for South Africa*.
- Portnoy et al. (2020) — population size as a proxy for service volume at site
  level.
- Ward et al. (2022) — scale-up costs for ultrasound.

Related IHME work:

- **DEX** — US health care spending, bottom-up, stratified by condition, type of
  care, age, payer, county, and race/ethnicity.
- **Cost-Effectiveness project** — meta-regression of ICERs for HIV/AIDS, malaria,
  syphilis, and tuberculosis across 128 countries, using a Bayesian mixed-effects
  framework; top-down.
- **DAH project** — spending on health care associated with malaria and brain
  disorders globally, using DEX price-of-care estimates adjusted by type of care,
  year, and country factors from National Health Accounts.
- :ref:`Nutrition Optimization <2021_concept_model_vivarium_nutrition_optimization>`
  — prior Simulation Science costing: funder perspective, bottom-up, categories of
  service, product, distribution, and other (training, supervision), stratified by
  location.
- :ref:`Alzheimer's Disease Early Detection Simulation <2025_concept_model_vivarium_alzheimers>`
  — prior Simulation Science costing, including the currency conversion
  implementation this project builds on.
