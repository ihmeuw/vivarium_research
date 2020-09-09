.. _2019_anemia_impairment:

=================
Anemia Impairment
=================

.. contents::
   :local:
   :depth: 2

Impairment Description in GBD 2019
-------------------------------------

The anemia impairment in GBD 2019 represents the total burden due to anemia across *all* GBD causes with anemia sequelae. For instance, mild anemia due to dietary iron deficiency, mild anemia due to hookworm disease, and mild anemia due to maternal hemorrhage all contribute to the mild anemia *impairment* in GBD. See the REI IDs for the anemia impairments in the table below.

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

The anemia impairment is modeled in two steps, 1) the anemia envelope and 2) causal attribution. 

Anemia Envelope Estimation
++++++++++++++++++++++++++

The anemia envelope refers to the total prevalence and burden due to anemia in a given demographic group and is estimated using the :ref:`GBD 2019 Hemoglobin Model <2019_hemoglobin_model>`.

Once the hemoglobin concentration distribution is estimated, the anemia envelope is calculated by evaluating the area under the distribution curve below the severity-specific hemoglobin thresholds for anemia. GBD 2019 uses the WHO thresholds shown in the table below.

.. _`WHO hemoglobin tresholds table`:

.. list-table:: WHO Hemoglobin Thresholds (g/L)
  :widths: 15, 15, 15, 15
  :header-rows: 1

  * - Group
    - Mild Anemia
    - Moderate Anemia
    - Severe Anemia
  * - Males and Females <28 days
    - 130-149
    - 90-129
    - <90
  * - Males and Females 1 month - 4 years
    - 100-109
    - 70-99
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

  GBD 2019 used a different threshold for the neonatal period than the rest of the <5 age group, although there are not any international guidelines on appropriate thresholds of anemia in neonates. The thresholds chosen were "a blend" of those recommended by the WHO for 6 to 59 months and the higher hemoglobin levels typically seen in newborns.

Once severity-specific anemia prevalence is estimated, years lived with disability due to anemia can be estimated using the following severity-specific disability weights. NOTE: the anemia impairment is a YLD-only impairment and anemia is not considered a direct cause of death in GBD 2019.

.. _`Anemia Disability Weights`:

.. list-table:: Anemia Disability Weights
  :widths: 15, 15, 15, 15
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

Causal Attribution
++++++++++++++++++

While the anemia envelope represents the total prevalence of anemia, the causal attribution process allows for estimation of what conditions *cause* that anemia. With some exceptions (see below_), two inputs were required for each cause included in the causal attribution process, 1) the cause prevalence (generated from other GBD processes), and 2) the cause-specific hemoglobin shift. Cause-specific hemoglobin shifts were derived from published studies that compared hemoglobin concentrations among diseased and non-diseased populations; these shifts were meta-analyzed for use in GBD 2019.

.. _below:

Notably, there were several causes that were not assigned specific hemoglobin shifts, including dietary iron deficiency; other infectious diseases; other neglected tropical diseases; other endocrine, nutrition, blood, and immune disorders; and other hemoglobinopathies and hemolytic anemias. Instead, the residual anemia envelope (with an enforced minimum 10%) were assigned to these causes in a manner analogous to fixed proportion redistribution.

A complete list of the causes included in the causal attribution process for anemia include: 

  P. falciparum parasitaemia without clinical malaria; P. vivax parasitaemia without clinical malaria; Clinical malaria; Schistosomiasis; Hookworm disease; Other neglected tropical diseases; Maternal haemorrhage; Vitamin A deficiency (under 15 years only); Other infectious diseases; Peptic ulcer disease; Gastritis; Stage III chronic kidney disease; Stage IV chronic kidney disease ; Stage V chronic kidney disease; End stage renal disease; Uterine fibroids; Menstrual disorders; Other haemoglobinopathies and haemolytic anaemias; Other endocrine, nutrition, blood, and immune disorders; G6PD deficiency; Hemizygous G6PD deficiency; Beta-thalassaemia major; Beta-thalassaemia trait; Haemoglobin E trait; Haemoglobin E/beta-thalassaemia; Haemoglobin H disease; Homozygous sickle cell and severe sickle cell/beta-thalassaemia parent; Haemoglobin SC disease; Mild sickle cell/beta-thalassaemia; Sickle cell trait; HIV; Cirrhosis and other chronic liver diseases, decompensated; Ulcerative colitis; Crohn’s disease; dietary iron deficiency; other infectious diseases; other neglected tropical diseases; other endocrine, nutrition, blood, and immune disorders; and other hemoglobinopathies and hemolytic anemias.

The following table displays the cause- and sex-specific hemoglobin shifts used for the anemia causal attribution process in GBD 2019. These shifts are hosted `here <https://stash.ihme.washington.edu/projects/MNCH/repos/anemia_causal_attribution/browse/priors/hb_shifts.csv>`_.

.. csv-table:: Cause- and Sex-Specific Hemoglobin Shifts
  :widths: 15 15 15
  :file: hb_shifts.csv

Iron Responsive Causes
^^^^^^^^^^^^^^^^^^^^^^

A list of which causes of anemia are iron responsive can be found in the excel sheet hosted `here <https://stash.ihme.washington.edu/projects/MNCH/repos/anemia_causal_attribution/browse/in_out_meid_map.xlsx>`_.

Vivarium Modeling Strategy
--------------------------

Scope
++++++++

The Vivarium modeling strategy for the anemia impairment will first rely on the :ref:`Hemoglobin Distribution Model <2019_hemoglobin_distribution>`. Vivarium simulants should first be assigned a hemoglobin value and then their anemia status can be evaluated by the hemoglobin thresholds shown on this page. YLDs should be accrued according to the severity-specific disability weights listed in this document. Specific causes (or groups of causes, for example iron-responsive causes) of anemia can also be assigned to individual if relevant/necessary for the project.

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
     - Note the pregnancy adjustment for women of reproductive age
   * - Age group start
     - Birth (age_group_id=2)
     - Note early and late neonatal age group (ID 2,3) modelling exception
   * - Age group end
     - 95+
     - 

Assumptions and Limitations
+++++++++++++++++++++++++++

The assumptions and limitations of this vivarium anemia impairment model include the same assumptions and limitations as the :ref:`Hemoglobin distribution model <2019_hemoglobin_model>`.

Additionally, the GBD 2019 causal attribution process assumes no change in hemoglobin standard deviation by cause, which is likely not accurate, but represents a significant data gap. The causal attribution process also relies on residual attribution rather than direct attribution to several causes of anemia, including dietary iron deficiency anemia, which makes the prevalence estimates of these causes sensitive to the prevalence estimates of other anemia causes. 

Validation Criteria
+++++++++++++++++++

Prevalence of severity-specific anemia should be approximately equal to the GBD 2019 severity-specific anemia impairment prevalence.

0 < Severity-specific anemia prevalence < 1

References
----------

.. [Kassebaum-et-al-2016]

  View `Kassebaum et al. 2016`_

    Kassebaum NJ, GBD 2013 Anemia Collaborators. The Global Burden of
    Anemia. Hematol Oncol Clin North Am. 2016 Apr;30(2):247-308. doi: https://doi.org/10.1016/j.hoc.2015.11.002

.. _`Kassebaum et al. 2016`: https://www.clinicalkey.com/service/content/pdf/watermarked/1-s2.0-S0889858815001896.pdf?locale=en_US&searchIndex=