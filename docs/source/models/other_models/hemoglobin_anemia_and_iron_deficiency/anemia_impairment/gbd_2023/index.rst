.. _2023_anemia_impairment:

=================
Anemia Impairment
=================

.. contents::
   :local:
   :depth: 2

Impairment Description in GBD 2023
----------------------------------

The anemia impairment in GBD 2023 represents the total burden due to anemia across *all* GBD causes with anemia sequelae. 
For instance, mild anemia due to dietary iron deficiency, mild anemia due to hookworm disease, and mild anemia due to maternal hemorrhage all contribute to the mild anemia *impairment* in GBD. 
See the REI IDs for the anemia impairments in the table below.

[GBD_2021_Anaemia_Collaborators]_

.. _`2023 Anemia Impairment REI IDs Table`:

.. list-table:: Anemia Impairment REI IDs
  :widths: 15, 15
  :header-rows: 1

  * - Impairment
    - REI ID
  * - Total anemia
    - 192
  * - Mild anemia
    - 205
  * - Moderate anemia
    - 206
  * - Severe anemia
    - 207
  * - Moderate and severe anemia
    - 432

The anemia impairment is modeled in two steps, 1) the anemia envelope and 2) causal attribution. 

Anemia Envelope Estimation
++++++++++++++++++++++++++

The anemia envelope refers to the total prevalence and burden due to anemia in a given demographic group and is estimated using the :ref:`GBD 2023 Hemoglobin Model <2023_hemoglobin_model>`.

Once the hemoglobin concentration distribution is estimated, the anemia envelope is calculated by evaluating the area under the distribution curve below the severity-specific hemoglobin thresholds for anemia. 
GBD 2023 uses the WHO thresholds shown in the table below.

.. _`2023 WHO hemoglobin thresholds table`:

.. list-table:: WHO Hemoglobin Thresholds (g/L)
  :widths: 15, 15, 15, 15
  :header-rows: 1

  * - Group
    - Mild Anemia
    - Moderate Anemia
    - Severe Anemia
  * - Males and Females 0-6 days
    - 145-159
    - 100-144
    - <100
  * - Males and Females 7-27 days
    - 120-134
    - 85-119
    - <85
  * - Males and Females 1 month - 5 months
    - 100-109
    - 70-99
    - <70
  * - Males and Females 5 months - 4 years
    - 95-104
    - 70-94
    - <70
  * - Males and Females 5-14 years
    - 110-114
    - 80-109
    - <80
  * - Males 15+ years
    - 110-129
    - 80-109
    - <80
  * - Females 15+ years, non-pregnant
    - 110-119
    - 80-109
    - <80
  * - Females 15+ years, pregnant
    - 100-109
    - 70-99
    - <70

.. note::

  GBD uses the hemoglobin thresholds specific to *Males and Females 5-14 years* for pregnant females in this age group 
  (as opposed to the pregnancy-specific thresholds).

  GBD 2023 used different thresholds for the early, middle, and late neonatal periods (0-6 days, 7-27 days, and 1-5 months, respectively) 
  than the rest of the <5 age group,
  although there are not any international guidelines on appropriate thresholds of anemia in neonates. 
  To account for the higher hemoglobin levels typically seen in newborns, 
  GBD 2023 calculated the ratio of “normal” hemoglobin (defined as the 50th percentile of the global hemoglobin distribution) 
  for the different neonatal age groups by severity, and then multiplied the WHO 6–59-months thresholds by these ratios. 

Once severity-specific anemia prevalence is estimated, years lived with disability due to anemia can be estimated using the 
following severity-specific disability weights. NOTE: the anemia impairment is a YLD-only impairment and anemia is not considered 
a direct cause of death in GBD 2023.

.. _`2023 Anemia Disability Weights`:

.. list-table:: Anemia Disability Weights
  :widths: 15, 15
  :header-rows: 1

  * - Anemia Severity
    - Disability Weight
  * - Mild
    - 0.004
  * - Moderate
    - 0.052
  * - Severe
    - 0.149

.. warning::

  For the early and late neonatal age groups, the post-neonatal anemia prevalence was simply copied as the anemia prevalence for these age-groups rather than direct estimation of anemia among these age groups in GBD 2019.

.. todo:: 

  Add link to further documentation on how Vivarium uses GBD disability weights from health states to be for the impairment.

Causal Attribution
++++++++++++++++++

While the anemia envelope represents the total prevalence of anemia, 
the causal attribution process allows for estimation of what conditions *cause* that anemia. 
With some exceptions (see below), two inputs were required for each cause included in the causal attribution process, 
1) the cause prevalence (generated from other GBD processes), and 2) the cause-specific hemoglobin shift. 
The GBD 2023 cause-specific hemoglobin shifts are derived from individual-level insurance-claims data from the MarketScan research database to generate age-, sex-, and pregnancy-specific hemoglobin shifts associated with sickle cell disease, sickle cell trait, HIV, postpartum hemorrhage, and peuerperal sepsis.
This is an improvement from the GBD 2019 anemia causal attribution process, which used single, non-age-specific scalar values without uncertainties for cause-specific hemoglobin shifts, thereby ignoring how the effects of a disease may vary by age, sex, and pregnancy status. 
For anemia causes that were not analysed using MarketScan data, the same literature-based Hb shift values from GBD 2021 were applied. 

Notably, there were several causes that were not assigned specific hemoglobin shifts, including dietary iron deficiency; other infectious diseases; other neglected tropical diseases; other endocrine, nutrition, blood, and immune disorders; and other hemoglobinopathies and hemolytic anemias.
Instead, the residual anemia envelope (with an enforced minimum 10%) were assigned to these causes in a manner analogous to fixed proportion redistribution.

A complete list of the causes included in the causal attribution process for anemia include: 

  P. falciparum parasitaemia without clinical malaria; P. vivax parasitaemia without clinical malaria; Clinical malaria; Schistosomiasis; Hookworm disease; Other neglected tropical diseases; Maternal haemorrhage; Vitamin A deficiency (under 15 years only); Other infectious diseases; Peptic ulcer disease; Gastritis; Stage III chronic kidney disease; Stage IV chronic kidney disease ; Stage V chronic kidney disease; End stage renal disease; Uterine fibroids; Menstrual disorders; Other haemoglobinopathies and haemolytic anaemias; Other endocrine, nutrition, blood, and immune disorders; G6PD deficiency; Hemizygous G6PD deficiency; Beta-thalassaemia major; Beta-thalassaemia trait; Haemoglobin E trait; Haemoglobin E/beta-thalassaemia; Haemoglobin H disease; Homozygous sickle cell and severe sickle cell/beta-thalassaemia parent; Haemoglobin SC disease; Hyperthyroid disease; Hypothyroid disease; Mild sickle cell/beta-thalassaemia; Sickle cell trait; HIV/AIDS; Cirrhosis and other chronic liver diseases, decompensated; Ulcerative colitis; Crohn’s disease; dietary iron deficiency; other infectious diseases; other neglected tropical diseases; other endocrine, nutrition, blood, and immune disorders; and other hemoglobinopathies and hemolytic anemias.

Unlike with GBD 2019, cause- and sex-specific hemoglobin shifts used for the anemia causal attribution process in GBD 2023 can be pulled directly from Shared Functions.

.. todo:: 

  Figure out how to pull the cause- and sex-specific hemoglobin shifts from Shared Functions.

.. note:: 

  Even though pregnancy-specific shifts were estimated, they were not used in the causal attribution pipeline.

Iron Responsive Causes
^^^^^^^^^^^^^^^^^^^^^^

A list of which causes of anemia are iron responsive can be found in the excel sheet hosted at `<https://stash.ihme.washington.edu/projects/MNCH/repos/anemia_causal_attribution/browse/in_out_meid_map.xlsx>`_.

Vivarium Modeling Strategy
--------------------------

Scope
++++++++

The Vivarium modeling strategy for the anemia impairment will first rely
on the :ref:`hemoglobin model <2023_hemoglobin_model>`. Vivarium simulants should first be
assigned a hemoglobin value and then their anemia status can be evaluated
by the hemoglobin thresholds shown on this page (thresholds are
pregnancy-specific for women of reproductive age; see the pregnancy
hemoglobin adjustment documentation on the :ref:`hemoglobin model <2019_hemoglobin_model>`. YLDs
should be accrued according to the severity-specific disability weights
listed in this document. Specific causes (or groups of causes, for
example iron-responsive causes) of anemia can also be assigned to
individual simulants if relevant/necessary for the project (this could
be done by using the cause-specific hemoglobin shifts, but this process
is not yet described in this document).

.. note:: 

  The male and female aged 5 to 14 hemoglobin thresholds should be used for pregnant females less than 15 years of age.

  Women who are pregnant and in the postpartum period (according to the :ref:`pregnancy model document <other_models_pregnancy>` should be evaluated for anemia according to the pregnancy-specific thresholds.

.. todo:: 

  Finish updating this section to 2023 hemoglobin model.

Restrictions
++++++++++++

.. list-table:: GBD 2019 Anemia Impairment Restrictions
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
     - Note the pregnancy adjustment for women of reproductive age, described in the :ref:`Hemoglobin Model Documentation <2019_hemoglobin_model>`
   * - Age group start
     - Early neonatal (age_group_id=2)
     - Note early and late neonatal age group (ID 2,3) modelling exception
   * - Age group end
     - 95+
     - 

.. todo:: 

  Update this section to 2023 anemia impiarment restrictions.

Assumptions and Limitations
+++++++++++++++++++++++++++

The assumptions and limitations of this vivarium anemia impairment model include the same assumptions and limitations as the :ref:`Hemoglobin distribution model <2019_hemoglobin_model>`.

Additionally, the GBD 2019 causal attribution process assumes no change in hemoglobin standard deviation by cause, which is likely not accurate, but represents a significant data gap. 
The causal attribution process also relies on residual attribution rather than direct attribution to several causes of anemia, including dietary iron deficiency anemia, which makes the prevalence estimates of these causes sensitive to the prevalence estimates of other anemia causes. 

.. todo:: 

  Update this section to 2023 anemia impiarment restrictions.

Validation Criteria
+++++++++++++++++++

Prevalence of severity-specific anemia as calculated in the Vivarium simulation should be approximately equal to the GBD 2019 severity-specific anemia impairment prevalence (REI IDs listed in the `2023 Anemia Impairment REI IDs Table`_) among demographic groups that do not include women of reproductive age. The `custom validation targets <https://github.com/ihmeuw/vivarium_research_iv_iron/tree/main/hgb_validation_targets>`_ should be used for women of reproductive age due to the underestimation of GBD 2019 anemia imairment prevalence among this group caused by erroneously applying the inverse of the pregnancy adjustment factor, described on the :ref:`hemoglobin document <2019_hemoglobin_model>` and `shown here <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/maternal/model3%2C%20fixed%20hemoglobin%20weight%20experiment/hemoglobin%20exposure%20nano%20sims/R%20code%20comparisons/R%20code%20prevalence%20plotting.ipynb>`_.

0 < severity-specific anemia prevalence < 1

0 < total anemia prevalence < 1

.. todo:: 

  Update this section to 2023 anemia impiarment validation criteria.

References
----------

.. [GBD_2021_Anaemia_Collaborators]

  GBD 2021 Anaemia Collaborators. Prevalence, years lived with disability, and trends in anaemia burden by severity and cause, 1990-2021: findings from the Global Burden of Disease Study 2021. Lancet Haematol. 2023 Sep;10(9):e713-e734. doi: 10.1016/S2352-3026(23)00160-6. Epub 2023 Jul 31. Erratum in: Lancet Haematol. 2023 Oct;10(10):e796. doi: 10.1016/S2352-3026(23)00283-1. Erratum in: Lancet Haematol. 2024 Jan;11(1):e10. doi: 10.1016/S2352-3026(23)00373-3. PMID: 37536353; PMCID: PMC10465717.