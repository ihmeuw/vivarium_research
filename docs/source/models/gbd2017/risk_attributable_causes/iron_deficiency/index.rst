.. _2017_cause_iron_deficiency:

================================================
Dietary Iron Deficiency (Iron Deficiency Anemia)
================================================

Disease Description
-------------------

Generally, **anemia** is a condition defined by a deficiency of red blood cells 
or a deficiency of hemoglobin in the blood. Anemia is typically classified by 
hemoglobin concentrations below a defined threshold that varies by age and sex. 
Severity of anemia is similarly classified according to ranges of hemoglobin 
concentrations. Anemia is associated with increased morbidity and mortality and 
symptoms of anemia often include weakness, fatigue, and difficulty 
concentrating.

 Notably, anemia may be caused by many diverse factors. Examples of factors 
 that may cause anemia include genetic mutations in hemoglobin genes, acute or 
 chronic blood loss, altered red blood cell morphology, inadequate nutritional 
 intake, and others.

**Iron deficiency anemia** is a type of anemia that is due to insufficient 
iron levels, which lead to a deficiency of hemoglobin in the blood. Notably, 
iron deficiency anemia can occur when dietary intake of iron is insufficient, 
although it may occur in other situations as well, such as when iron is lost 
through bleeding (ex: menstrual disorders, hookworm disease, etc.). Iron 
deficiency anemia is the most common cause of anemia globally in most 
populations.

**Dietary iron deficiency anemia** is a specific type of iron deficiency anemia 
that is due to inadequate dietary intake of iron, leading to inadequate iron 
levels in the body and a subsequent deficiency of hemoglobin in the blood.

Modeling Iron Deficiency in GBD 2017
------------------------------------

In GBD 2017, the cause dietary iron deficiency is a population attributable 
fraction (PAF) of 1 cause with the iron deficiency risk factor. This means 
that 100% of the dietary iron deficiency cases are attributable to the iron 
deficiency risk factor. Notably, there are additional causes other than 
dietary iron deficiency that are attributable to the iron deficiency risk 
factors (ex: maternal disorders).

Additionally, there is an anemia *impairment* modeled in GBD 2017 that 
represents **all** forms of anemia that are attributable to several causes, 
including causes such as hemoglobinopathies and hemolytic anemias that are not 
causally attributable to iron deficiency. 

Iron Deficiency Risk Factor (REI ID = 95)
+++++++++++++++++++++++++++++++++++++++++

The iron deficiency risk factor in GBD 2017 is modeled as a distribution of 
hemoglobin concentrations.

.. todo::

	Describe the population and distribution

Modeling Strategy for the Iron Deficiency Risk Factor
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. todo::

	Describe anemia envelope and causal attribution

Risk Factor Hierarchy
^^^^^^^^^^^^^^^^^^^^^

.. image:: iron_risk_hierarchy.svg

Dietary Iron Deficiency Cause (Cause ID = 95)
+++++++++++++++++++++++++++++++++++++++++++++

The dietary iron deficiency cause in GBD 2017 that is 100% attributable to the 
iron deficiency risk factor. The dietary iron deficiency cause in GBD is a 
YLD-only cause, meaning that it contributes to morbidity, but not mortality.

Modeling Strategy for the Dietary Iron Deficiency Cause
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The dietary iron deficiency cause in GBD 2017 is not modeled directly. Rather, 
the dietary iron deficiency cause is estimated as the remaining cases of 
anemia after all of the other anemic cases in the overall anemia envelope were 
causally attributed to their respective attributable causes (ex: 
hemoglobinopathies and hemolytic anemias).

Cause Hierarchy
^^^^^^^^^^^^^^^

.. image:: iron_cause_hierarchy.svg

Health States and Sequela
^^^^^^^^^^^^^^^^^^^^^^^^^

The sequela associated with the dietary iron deficiency cause in GBD 2017 
include mild iron deficiency anemia, moderate iron deficiency anemia, and 
severe iron deficiency anemia. The severity of iron deficiency anemia is 
determined by the WHO age- and sex- specific hemoglobin concentrations, as 
described in the table below.

.. list-table:: Hemoglobin Thresholds (g/L)
   :widths: 15, 15, 15, 15
   :header-rows: 1

	* - Group
	  - Mild Anemia
	  - Moderate Anemia
	  - Severe Anemia
	* - Males and Females <1 month
	  - 130-149
	  - 90-129
	  - <90
	* - Males and Females 1 month - 5 years
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
	  - 70-00
	  - <70

Cause Model Diagram
-------------------

Data Description
----------------

State and Transition Data Tables
++++++++++++++++++++++++++++++++

Model Assumptions and Limitations
---------------------------------

Validation Criteria
-------------------

References
----------

Kassebaum NJ, GBD 2013 Anemia Collaborators. The Global Burden of Anemia. 
Hematol Oncol Clin North Am. 2016 Apr;30(2):247-308. doi: 
10.1016/j.hoc.2015.11.002
