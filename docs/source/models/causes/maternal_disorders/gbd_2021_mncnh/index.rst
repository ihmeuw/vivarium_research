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
    modeled.

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

Wave 3
++++++

* Maternal hypertensive disorders

The remainder of this document describes maternal disorders overall and
describes the strategy for capturing the burden of the maternal
disorders subcauses that are not explicitly modeled above.

Disease Overview
----------------

GBD 2021 Modeling Strategy
--------------------------

Cause Hierarchy
+++++++++++++++

- All causes (c_294) [level 0]

  - Communicable, maternal, neonatal, and nutritional diseases (c_295)

    - Maternal disorders and neonatal disorders (c_962)

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

#. Abortion is defined as elective or medically indicated termination of
   pregnancy at any gestational age, regardless of symptoms or
   complications (abortion), or spontaneous loss of pregnancy before 24
   weeks of gestation (miscarriage) with complications requiring medical
   care. Miscarriages that do not require medical care are not included
   in this cause.
#. Ectopic pregnancy is defined as a pregnancy that implants outside of
   the uterine cavity, generally presenting with abdominal pain and
   vaginal bleeding.
#. Obstructed labour and uterine rupture.

   a. Acute event includes failure to progress (no advance of the
      presenting part of the fetus despite strong uterine contractions),
      cephalopelvic disproportion (fetal size that is too 721 large for
      maternal pelvic dimensions), non-vertex fetal positioning during
      labour (any fetal position besides head down during labour;
      excludes non-vertex positioning during antepartum period), and
      uterine rupture during labour (non-surgical breakdown of uterine
      wall during labour and delivery). Perineal lacerations without any
      of the above conditions are excluded from the case definition.
      (Estimation of the incidence and short- term disability due to
      these conditions is described in this appendix section.)
   b. Obstetric fistula is defined as an abnormal opening between the
      vagina and the bladder or rectum with involuntary escape of urine,
      flatus, and/or faeces following childbirth. (The non-fatal burden
      of fistulas is included in the non-fatal burden of obstructed
      labour in reporting, but estimation is described in a separate
      appendix section on “Fistula – impairment.”)

#. Maternal haemorrhage includes heavier than expected postpartum
   bleeding (>500 ml following vaginal delivery or >1000 ml after
   cesarean delivery) or antepartum bleeding (vaginal bleeding from any
   cause at or beyond 20 weeks of gestation and prior to onset of
   labour), or placental disorders with haemorrhage regardless of blood
   volume lost or timing of bleeding event. Placental disorders without
   haemorrhage are included with other [direct] maternal disorders.
#. Maternal sepsis and other maternal infections encompasses maternal
   sepsis during or following labour and delivery (defined as
   temperature <36°C or >38°C and clinical signs of shock [systolic
   blood pressure <90 mmHg and tachycardia >120 bpm]) as well as other
   maternal infections believed to have a close epidemiological
   relationship with pregnancy, including genitourinary tract infections
   (excluding sexually transmitted diseases), obstetrical wound
   infections, and breast infections related to childbirth and
   lactation.

#. Hypertensive disorders of pregnancy includes several subcategories:

   a. Gestational hypertension is the new onset of hypertension in a
      pregnant person after 20 weeks’ gestation, as defined by having a
      blood pressure measured >140/90 mmHg on more than one occasion.
   b. Preeclampsia is defined by hypertension [>140/90 mmHg] and
      proteinuria [≥0.3 g/l], with or without signs of end-organ damage.
   c. Severe preeclampsia is defined by preeclampsia with severe
      hypertension [>160/100 mmHg] or other signs of end organ damage
      [liver: low platelets, elevated liver enzymes, coagulation issues;
      kidney: elevated creatinine; central nervous system: headaches or
      visual disturbances], syndrome of hypertension, elevated liver
      enzymes, low platelets [HELLP syndrome]).
   d. Eclampsia is defined as hypertension and seizures, with or without
      proteinuria. This definition excludes chronic hypertension in a
      pregnant person (hypertension present prior to 20 weeks’
      gestation) unless superimposed preeclampsia develops.
#. Other [direct] maternal disorders includes a variety of different
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

Validation Criteria
+++++++++++++++++++

References
----------
