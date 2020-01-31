.. _2017_cause_neonatal_disorders:

==================
Neonatal Disorders
==================

.. todo::

  Add a brief introductory paragraph for this document.

.. contents::
   :local:
   :depth: 1

Disease Overview
----------------

.. todo::

   Add a general clinical overview of the cause.


GBD 2017 Modeling Strategy
--------------------------

.. todo::

  Add an overview of the GBD modeling section, citing
  [GBD-2017-YLD-Appendix-Neonatal-Disorders]_ and
  [GBD-2017-CoD-Appendix-Neonatal-Disorders]_.


Cause Hierarchy
+++++++++++++++

Restrictions
++++++++++++

The following table describes any restrictions in GBD 2017 on the effects of
this cause (such as being only fatal or only nonfatal), as well as restrictions
on the ages and sexes to which the cause applies.

.. list-table:: GBD 2017 Cause Restrictions
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
     - Early Neonatal
     - [0, 7 days), age_group_id=2
   * - YLL age group end
     - Post Neonatal
     - [28 days, 1 year), age_group_id=4
   * - YLD age group start
     - Early Neonatal
     - [0, 7 days), age_group_id=2
   * - YLD age group end
     - 95 plus
     - [95, 125 years), age_group_id=235


Vivarium Modeling Strategy
--------------------------

This model is designed to estimate YLLs due to neonatal disorders that could be
averted by an intervention that affects :ref:`Low Birth Weight and Short
Gestation (LBWSG) <2017_risk_lbwsg>`. The model groups together all of the
neonatal sub-causes, and is fatal-only (no disability). The rationale for this
design is as follows:

- All of the neonatal sub-causes (except sepsis -- see `Assumptions and
  Limitations`_ below) have the same 2-state cause model structure: "with
  condition" and "free of condition", with no between-state transitions.

- All of the causes affected by the LBWSG risk factor have the same risk ratios
  and hence will be affected in the same way by shifts between LBWSG categories.
  Thus, for the purposes of measuring the effects of an intervention on LBWSG,
  we can group together all the neonatal sub-causes into a single model of the
  parent cause, `neonatal disorders`.

- Based on the available data, it is unclear how to compute an appropriate
  average disability weight for the collection of all neonatal disorders. For
  the age groups we're considering in the BEP model (0-2 years), the ratio of
  YLDs to YLLs for neonatal disorders is very small, so we choose not to model
  disability for this cause.

  .. todo::

    Look into data and provide an estimate of neonatal YLDs as a fraction of neonatal DALYs for relevant age groups.

Scope
+++++

.. todo::

  Describe which aspects of the disease this cause model is designed to
  simulate, and which aspects it is **not** designed to simulate.

Assumptions and Limitations
+++++++++++++++++++++++++++

We assume no transitions between the "with condition" and "free of condition"
states because this is the behavior of all of the neonatal sub-causes except
:ref:`Neonatal Sepsis <2017_cause_neonatal_sepsis>`, which has SIS dynamics. We
expect this no-transisions assumption to be sufficiently accurate because we
compared a model of Neonatal Sepsis with no remission or post-birth incidence
against GBD 2017, and the results were very close [cite Kiran's code once it's
on GitHub].

Cause Model Diagram
+++++++++++++++++++

.. image:: neonatal_disorders_cause_model_diagram.svg

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
     - Infant developed neonatal disorders
   * - F
     - **F**\ ree of Condition
     - Infant did not develop neonatal disorders

.. list-table:: State Data
   :widths: 1, 5, 5, 10
   :header-rows: 1

   * - State
     - Measure
     - Value
     - Notes
   * - C
     - prevalence
     - prevalence_c380
     -
   * - C
     - birth prevalence
     - birth_prevalence_c380
     -
   * - C
     - excess mortality rate
     - :math:`\frac{\text{deaths_c380}}{\text{population} \,\times\, \text{prevalence_c380}}`
     - = (cause-specific mortality rate) / prevalence
   * - C
     - disability weight
     - N/A
     - this is a fatal-only model
   * - F
     - prevalence
     - 1 -- prevalence_c380
     -
   * - F
     - birth prevalence
     - 1 -- birth_prevalence_c380
     -
   * - F
     - excess mortality rate
     - 0
     -
   * - F
     - disability weight
     - N/A
     - this is a fatal-only model
   * - All
     - cause-specific mortality rate
     - :math:`\frac{\text{deaths_c380}}{\text{population}}`
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
   * - prevalence_c380
     - como
     - Prevalence of neonatal disorders
     -
   * - birth_prevalence_c380
     - como
     - Birth prevalence of neonatal disorders
     - age_group_id = 164 (at birth) and measure = 6 (incidence)
   * - deaths_c380
     - codcorrect
     - Deaths from neonatal disorders
     -
   * - population
     - demography
     - Mid-year population for given age/sex/year/location
     -

Validation Criteria
+++++++++++++++++++

References
----------

.. [GBD-2017-YLD-Appendix-Neonatal-Disorders]

   Pages 276-295 in `Supplementary appendix 1 to the GBD 2017 YLD Capstone <YLD
   appendix on ScienceDirect_>`_:

     **(GBD 2017 YLD Capstone)** GBD 2017 Disease and Injury Incidence and
     Prevalence Collaborators. :title:`Global, regional, and national incidence,
     prevalence, and years lived with disability for 354 diseases and injuries
     for 195 countries and territories, 1990–2017: a systematic analysis for the
     Global Burden of Disease Study 2017`. Lancet 2018; 392: 1789–858. DOI:
     https://doi.org/10.1016/S0140-6736(18)32279-7

.. _YLD appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322797-mmc1.pdf
.. _YLD appendix on Lancet.com: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32279-7/attachment/6db5ab28-cdf3-4009-b10f-b87f9bbdf8a9/mmc1.pdf


.. [GBD-2017-CoD-Appendix-Neonatal-Disorders]

   Pages 175-176 in `Supplementary appendix 1 to the GBD 2017 CoD Capstone <CoD
   appendix on ScienceDirect_>`_:

     **(GBD 2017 CoD Capstone)** GBD 2017 Causes of Death Collaborators.
     :title:`Global, regional, and national age-sex-specific mortality for 282
     causes of death in 195 countries and territories, 1980–2017: a systematic
     analysis for the Global Burden of Disease Study 2017`. Lancet 2018; 392:
     1736–88. DOI: http://dx.doi.org/10.1016/S0140-6736(18)32203-7

.. _CoD appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322037-mmc1.pdf
.. _CoD appendix on Lancet.com: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32203-7/attachment/5045652a-fddf-48e2-9a84-0da99ff7ebd4/mmc1.pdf
