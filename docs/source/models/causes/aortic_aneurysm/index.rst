.. _2019_cause_aortic_aneurysm:

==============================
Aortic Aneurysm
==============================

.. contents::
   :local:
   :depth: 1

Disease Overview
----------------

*Also known as abdominal aortic aneurysm (AAA), thoracic aortic aneurysm* (*TAA*)

An aneurysm is a balloon-like bulge in an artery. Arteries are blood vessels that carry blood from your heart to your organs. Aortic aneurysms are aneurysms that occur in the aorta, the main artery carrying oxygen-rich blood to your body. The aorta has thick walls that withstand normal blood pressure. However, certain medical problems, genetic conditions, and trauma can damage or weaken these walls. The force of blood pushing against the weakened or injured walls can cause an aneurysm. 
 
An aortic aneurysm can grow large and either rupture or split. A split is called a dissection and, like a rupture, is life-threatening. Early diagnosis and treatment may prevent serious or life-threatening complications. However, aortic aneurysms can develop and grow large before causing any symptoms. Doctors may be able to slow the growth of an aortic aneurysm with medicines or repair it with surgery if it is found before it ruptures or dissects.
[NIH]_

GBD 2019 Modeling Strategy
--------------------------

GBD 2019 Non-Fatal Modeling Strategy
++++++++++++++++++++++++++++++++++++

Aortic aneurysm is not currently modeled as a non-fatal model in GBD.

GBD 2019 Fatal Modeling Strategy
++++++++++++++++++++++++++++++++++++

We included vital registration data in a standard CODEm approach to model aortic aneurysm. 
[GBD-2019-Capstone-Appendix]_ 

Cause Hierarchy
+++++++++++++++

.. image:: cause_hierarchy_aa.svg

Restrictions
++++++++++++

The following table describes any restrictions in GBD 2019 on the effects of
this cause (such as being only fatal or only nonfatal), as well as restrictions
on the ages and sexes to which the cause applies.

.. list-table:: GBD 2019 Cause Restrictions
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
     - True
     -
   * - YLD only
     - False
     -
   * - YLL age group start
     - 15
     - [15, 19 years), age_group_id=8
   * - YLL age group end
     - 125
     - [95, 125), age_group_id=235
   * - YLD age group start
     - NULL
     -
   * - YLD age group end
     - NULL
     -

Vivarium Modeling Strategy
--------------------------

Scope
+++++

Aortic aneurysm is only a fatal condition and has no GBD nonfatal model. Initial approach is to allow deaths to occur per the standard simulation approach for any GBD cause. The cause-specific mortality rate should be modified by tobacco smoking; this relationship is defined in the overall concept model document. 

Assumptions and Limitations
+++++++++++++++++++++++++++

Aortic aneurysm can be diagnosed via ultrasound and treated with either medication or surgery, which reduces the risk of mortality. However, as of GBD 2019, we do not estimate nonfatal burden for this cause.

Cause Model Diagram
+++++++++++++++++++

.. image:: cause_model_aa.svg

State and Transition Data Tables
++++++++++++++++++++++++++++++++

Definitions
"""""""""""

.. list-table:: State Definitions
   :widths: 5 5 20
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - **S**\usceptible to aortic aneurysm
     - Simulant that has not been diagnosed with an aortic aneurysm


States Data
"""""""""""

.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - All
     - cause-specific mortality (CSMR)
     - :math:`\frac{\text{deaths_c501}}{\text{population}}`
     - Post CoDCorrect cause-level CSMR


Transition Data
"""""""""""""""

.. list-table:: Transition Data
   :widths: 10 10 10 20 30
   :header-rows: 1
   
   * - Transition
     - Source 
     - Sink 
     - Value
     - Notes
   * - 
     - 
     - 
     - 
     - 


Data Sources
""""""""""""

.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Measure
     - Sources
     - Description
     - Notes
   * - deaths_c501
     - codcorrect
     - Deaths from aortic aneurysm
     - 
   * - population
     - demography
     - Mid-year population for given age/sex/year/location
     - 


Validation Criteria
+++++++++++++++++++

Compare CSMR experienced by simulants to CSMR from CoDCorrect in GBD 

References
----------

.. [NIH] Aortic Aneurysm. National Heart Lung and Blood Institute, U.S. Department of Health and Human Services.
  Retrieved 13 April 2021.
  https://www.nhlbi.nih.gov/health-topics/aneurysm

.. [GBD-2019-Capstone-Appendix]
  Appendix_ to: `GBD 2019 Diseases and Injuries Collaborators. Global burden of 369 diseases and injuries in 204 countries and territories, 1990–2019: a systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 17 Oct 2020;396:1204-1222` 

.. _Appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30925-9/attachment/deb36c39-0e91-4057-9594-cc60654cf57f/mmc1.pdf
