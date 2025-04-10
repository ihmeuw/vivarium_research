.. _2019_hemoglobin_anemia_and_iron_deficiency:

=======================================
Hemoglobin, Anemia, and Iron Deficiency
=======================================

The hemoglobin, anemia, and iron deficiency models are complex and related. This page will provide a brief overview of the different components relating to these topics for context. See the below links for quick access to documentation pages for the following components:

.. toctree::
   :maxdepth: 1
   :glob:

   */index

Topic Overview
--------------

Generally, **anemia** is a condition defined by a deficiency of red blood cells
or a deficiency of hemoglobin in the blood. Anemia is typically classified by
hemoglobin concentrations below a defined threshold that varies by age and sex.
Severity of anemia is similarly classified according to ranges of hemoglobin
concentrations. Anemia is associated with increased morbidity and mortality and
symptoms of anemia often include weakness, fatigue, and difficulty
concentrating [Kassebaum-et-al-2016-iron-deficiency-2019]_.

 Notably, anemia may be caused by many diverse factors. Examples of factors
 that may cause anemia include genetic mutations in hemoglobin genes, acute or
 chronic blood loss, altered red blood cell morphology, inadequate nutritional
 intake, and others [Kassebaum-et-al-2016-iron-deficiency-2019]_.

**Iron deficiency anemia** is a type of anemia that is due to insufficient
iron levels, which lead to a deficiency of hemoglobin in the blood. Notably,
iron deficiency anemia can occur when dietary intake of iron is insufficient or when there is excess loss of iron from the body (ex: menstrual disorders, hookworm disease, etc.). Iron deficiency anemia is the most common cause of anemia globally in most populations and will respond to iron supplementation.

**Dietary iron deficiency anemia** is a specific type of iron deficiency anemia
that is due to inadequate dietary intake of iron, leading to inadequate iron
levels in the body and a subsequent deficiency of hemoglobin in the blood.

GBD 2019 Hemoglobin, Anemia, and Iron Deficiency Overview
---------------------------------------------------------

Hemoglobin Model
^^^^^^^^^^^^^^^^

The hemoglobin model is the starting point for both the anemia impairment and iron deficiency risk factor models. The hemoglobin model estimates the *distribution* of population hemoglobin concentration for each location-, age-, sex-, and year-specific demographic group. This is done by estimation of mean and standard deviation hemoglobin values and a corresponding ensemble distribution fit. 

This model will allow the assignment of specific hemoglobin concentration values to individual simulants and will likely need to be used in order to model either the anemia impairment or iron deficiency risk factor.

:ref:`Hemoglobin Model Documentation can be found here <hemoglobin>`.

Anemia Impaiment
^^^^^^^^^^^^^^^^

The anemia impairment model in GBD 2019 uses the hemoglobin distribution model to evaluate the total prevalence of anemia ("anemia envelope") based on age- and sex-specific thresholds. The anemia impairment model also performs *causal attribution* in which specific causes of anemia (for example, dietary iron deficiency or maternal hemorrhage) are assigned to all of the cases in the anemia envelope (note: cases in the anemia envelope refers to all individuals with prevalent anemia). 

This model should be used in order to model YLDs due to anemia directly.

:ref:`The 2019 GBD Anemia Impairment Documentation Page can be found here <2019_anemia_impairment>`.

Iron Deficiency Risk Factor
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The iron deficiency risk factor model in GBD 2019 uses the hemoglobin distribution model to estimate 1) iron deficiency risk exposure  and 2) iron deficiency risk effects that include maternal disorders as well as a PAF-of-1 relationship with dietary iron deficiency.

The iron deficiency risk factor exposure model should be utilized when the population attributable burden/fraction of iron deficiency is of interest. However, the exposure model may not be necessary to model the effects of interventions that increase population hemoglobin levels as YLDs due to anemia can be evaluated using the anemia impairment model and effects on maternal disorders can be modeled more directly (see the risk effects page for more details).

:ref:`The 2019 GBD Iron Deficiency Risk Exposure Documentation Page can be found here <2019_risk_exposure_iron_deficiency>`.

:ref:`The 2019 GBD Iron Deficiency Risk Effects Documentation Page can be found here <2019_risk_effect_iron_deficiency>`.


References
----------

.. [Kassebaum-et-al-2016-iron-deficiency-2019]

  View `Kassebaum et al. 2016`_

    Kassebaum NJ, GBD 2013 Anemia Collaborators. The Global Burden of
    Anemia. Hematol Oncol Clin North Am. 2016 Apr;30(2):247-308. doi: https://doi.org/10.1016/j.hoc.2015.11.002

.. _`Kassebaum et al. 2016`: https://www.clinicalkey.com/service/content/pdf/watermarked/1-s2.0-S0889858815001896.pdf?locale=en_US&searchIndex=