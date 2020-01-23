.. _2017_cause_neural_tube_defects:

===================
Neural Tube Defects
===================

Disease Description
-------------------

Neural tube defects occur when the neural tube fails to close completely during
development. The GBD 2017 case definition includes **spina bifida**, in which
part of the spinal cord and/or meninges are uncovered by skin;
**encephalocele**, a congenital defect characterized by sac-like protrusions of
the brain and meninges through openings in the skull; and **anencephaly**, the
absence of a major portion of the brain, skull, and scalp. *Spina bifida
occulta*, a much less severe form of spina bifida where the defect in vertebral
column remains covered by skin, is excluded from the GBD case definition of
spina bifida.

All infants born with anencephaly die during the first few weeks of life, as
there is no remission and no cure for this condition. Infants born with spina
bifida or encephalocele typically require surgical intervention during the first
few weeks of life, and thereafter may experience a range of neural and motor
complications. The GBD 2017 case definitions of spina bifida and encephalocele
do not consider surgical intervention for either condition as remission.

Spina bifida corresponds to the ICD-10_ codes Q05.0, Q05.4,Q05.6, Q05.7, Q05.8,
and Q05.9. Encephalocele corresponds to the ICD-10 codes Q01.2, Q01.8, and
Q01.9. Anencephaly corresponds to the ICD-10 codes Q00.0 and Q00.2.
[GBD-2017-YLD-Capstone-Appendix-1-Neural-Tube-Defects]_

.. _ICD-10: https://en.wikipedia.org/wiki/ICD-10

.. todo::

   Add more information and references. In particular, find data about global prevalence and relation to folic acid during pregnancy.

Modeling Neural Tube Defects in GBD 2017
----------------------------------------

Congenital Anomalies in GBD 2017
++++++++++++++++++++++++++++++++

GBD 2017 uses similar modeling strategies to estimate the prevalence and
resulting disability and mortality of the following eight categories of
congenital anomalies: neural tube defects; congenital heart anomalies; orofacial
clefts; chromosomal disorders; congenital musculoskeletal anomalies; congenital
urogenital anomalies; congenital digestive anomalies; and other congenital birth
defects.

The GBD case definition of congenital anomalies includes any condition present
at birth that is a result of abnormalities of embryonic development, excluding
those that are directly the result of infections or substance abuse (e.g. fetal
alcohol syndrome, congenital syphilis) and excludes minor anomalies as they are
defined by EUROCAT. Further, our GBD case definition includes only live births
and excludes all terminations of pregnancy following prenatal diagnosis and
stillbirths.

Modeling Strategy for Neural Tube Defects
+++++++++++++++++++++++++++++++++++++++++

In GBD 2017, spina bifida, encephalocele, and anencephaly are each modeled
separately and then fit to a total model of all neural tube defects.

.. todo::

   Add relevant detail about NTD modeling process from
   [GBD-2017-YLD-Capstone-Appendix-1-Neural-Tube-Defects]_ and from the `CoD Capstone
   <DOI for CoD Capstone_>`_ Appendix [GBD-2017-CoD-Appendix-1-Neural-Tube-Defects]_.

Cause Hierarchy
+++++++++++++++

.. todo::

   Make cause hierarchy diagram.

     | cause id = c642
     | level = 4
     | parent = congenital_birth_defects (c641)
     | grandparent = other_non_communicable_diseases (c640)
     | great-grandparent = non_communicable_diseases (c409)
     | great-great-grandparent = all_causes (c294)

Sequelae and health states associated with Neural Tube Defects
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

The Neural Tube Defects cause has 85 sequelae, which can be summarized as follows:

- All infants with anencephaly are assigned the health state of severe motor and
  cognitive impairment, so there is 1 sequela for anencephaly.
- Cases of spina bifida are split into every combination of mild, moderate and
  severe motor impairment, all 6 severities of intellectual disability (none,
  borderline, mild, moderate, severe, profound), and presence or absence of
  urinary incontinence. Thus, there are :math:`3\times 6\times 2 =36` sequelae
  for spina bifida.
- Cases of encephalocele are split into every combination of motor impairments
  (none, mild, moderate, severe), all 6 severities of intellectual disability
  (none, borderline, mild, moderate, severe, profound), and presence or absence
  of urinary incontinence. Thus, there are :math:`4\times 6\times 2 =48` sequelae
  for encephalocele, and the total number of sequelae for all 3 subcategories of neural tube defects is :math:`1+36+48=85`.
- The proportions of the various sequelae were
  calculated using a pooled analysis of available literature on the long-term
  outcomes in cohorts of individuals born with each sub-type of neural tube
  defects.
- The distribution of health states associated with encephalocele was derived
  separately from the distribution of health states associated with spina
  bifida, although these two categories of neural tube defects are associated
  with the same list of long-term outcome sequela.

Cause Model Diagram
-------------------

There are two possible states for this cause, **with-condition** for people born *with* neural tube defects,  and
**free-of-condition** for people born *without* neural tube defects:

.. image:: neural_tube_defects_cause_model_diagram.svg

There is no transition between the states; each person is born into one state or
the other and permanently stays in that state. **Thus, incidence and remission
rates are zero.**

Data Description
----------------

.. todo::

    Decide on section headings and structure. E.g. should this whole section be
    called "State and Transition Data Tables" instead of "Data Description"? Is
    there anything else that belongs in a section titled "Data Description"?


State and Transition Data Tables
++++++++++++++++++++++++++++++++

.. list-table:: State Definitions
   :widths: 1, 5, 10
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - C
     - With **C**\ ondition
     - Born with neural tube defects
   * - F
     - **F**\ ree of Condition
     - Born without neural tube defects

.. list-table:: State Data
   :widths: 1, 5, 5, 10
   :header-rows: 1

   * - State
     - Measure
     - Value
     - Notes
   * - C
     - prevalence
     - prevalence_c642
     -
   * - C
     - birth prevalence
     - birth_prevalence_c642
     -
   * - C
     - excess mortality rate
     - :math:`\frac{\text{deaths_c642}}{\text{population} \,\times\, \text{prevalence_c642}}`
     - = :math:`\frac{\text{cause-specific mortality rate}}{\text{prevalence}}`
   * - C
     - disability weight
     - :math:`\displaystyle{\sum_{s\in \text{sequelae_c642}}} \scriptstyle{\text{disability_weight}_s \,\times\, \text{prevalence}_s}`
     - = average disability weight over all sequelae
   * - F
     - prevalence
     - 1 -- prevalence_c642
     -
   * - F
     - birth prevalence
     - 1 -- birth_prevalence_c642
     -
   * - F
     - excess mortality rate
     - 0
     -
   * - F
     - disability weight
     - 0
     -
   * - All
     - cause-specific mortality rate
     - :math:`\frac{\text{deaths_c642}}{\text{population}}`
     -

.. list-table:: Transition Data
   :widths: 1, 1, 1, 5, 10
   :header-rows: 1

   * - Transition
     - Source State
     - Sink State
     - Value
     - Notes
   * - N/A
     - N/A
     - N/A
     - N/A
     - N/A

.. list-table:: Data Sources and Definitions
   :widths: 1, 3, 10, 10
   :header-rows: 1

   * - Value
     - Source
     - Description
     - Notes
   * - prevalence_c642
     - como
     - Prevalence of neural tube defects
     -
   * - birth_prevalence_c642
     - como
     - Birth prevalence of neural tube defects
     -
   * - deaths_c642
     - codcorrect
     - Deaths from neural tube defects
     -
   * - population
     - demography
     - Mid-year population for given age/sex/year/location
     -
   * - sequelae_c642
     - gbd_mapping
     - List of 85 sequelae for neural tube defects
     -
   * - prevalence_s{`sid`}
     - como
     - Prevalence of sequela with id `sid`
     -
   * - disability_weight_s{`sid`}
     - YLD Appendix
     - Disability weight of sequela with id `sid`
     -

Model Assumptions and Limitations
---------------------------------

Restrictions
++++++++++++

The following table describes any restrictions on the effects of this cause
(such as being only fatal or only nonfatal), as well as restrictions on the age
and sex of simulants to which different aspects of the cause model apply.

.. list-table:: Restrictions
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
     -
   * - YLL only
     - False
     -
   * - YLD only
     - False
     -
   * - YLL age group start
     - Early neonatal
     - GBD age group id 2
   * - YLL age group end
     - 60 to 64
     - GBD age group id 17
   * - YLD age group start
     - Early neonatal
     - GBD age group id 2
   * - YLD age group end
     - 95 plus
     - GBD age group id 235

Scope
+++++

This model is designed to be used for estimating DALYs due to neural tube
defects that are averted from an intervention that directly reduces the birth
prevalence of neural tube defects, such as large-scale fortification of flour
with folic acid, or targeted folic acid supplementation during pregnancy.

This model groups together all three severities of neural tube defects
(anencephaly, encephalocele, and spina bifida), weighted by prevalence. Thus it
is unable to capture any differential effects of an intervention that affects
the birth prevalence of the different subtypes of neural tube defects at
different rates.

.. todo::

   Describe more assumptions and limitations of the model.

Validation Criteria
-------------------

.. todo::

   Describe tests for model validation.

References
----------

.. [GBD-2017-YLD-Capstone-Appendix-1-Neural-Tube-Defects]
   Supplement to: `GBD 2017 Disease and Injury Incidence and Prevalence
   Collaborators. Global, regional, and national incidence, prevalence, and
   years lived with disability for 354 diseases and injuries for 195 countries
   and territories, 1990–2017: a systematic analysis for the Global Burden of
   Disease Study 2017. Lancet 2018; 392: 1789–858 <DOI for YLD Capstone_>`_
   (pp. 658-694)

   (Direct links to the YLD Appendix hosted on `Lancet.com <YLD appendix on Lancet.com_>`_ and `ScienceDirect <YLD appendix on ScienceDirect_>`_)

.. _YLD appendix on Lancet.com: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32279-7/attachment/6db5ab28-cdf3-4009-b10f-b87f9bbdf8a9/mmc1.pdf
.. _YLD appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322797-mmc1.pdf
.. _DOI for YLD Capstone: https://doi.org/10.1016/S0140-6736(18)32279-7

.. [GBD-2017-CoD-Appendix-1-Neural-Tube-Defects]

   Supplement to: `GBD 2017 Causes of Death Collaborators. Global, regional, and
   national age-sex-specific mortality for 282 causes of death in 195 countries
   and territories, 1980–2017: a systematic analysis for the Global Burden of
   Disease Study 2017. Lancet 2018; 392: 1736–88 <DOI for CoD Capstone_>`_
   (pp. 318-323)

   (Direct links to the CoD Appendix hosted on `Lancet.com <CoD appendix on Lancet.com_>`_ and `ScienceDirect <CoD appendix on ScienceDirect_>`_)

.. _CoD appendix on Lancet.com: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32203-7/attachment/5045652a-fddf-48e2-9a84-0da99ff7ebd4/mmc1.pdf
.. _CoD appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322037-mmc1.pdf
.. _DOI for CoD Capstone: http://dx.doi.org/10.1016/S0140-6736(18)32203-7
