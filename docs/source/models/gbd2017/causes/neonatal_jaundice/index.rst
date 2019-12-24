.. _2017_cause_neonatal_jaundice:

==============================================
Haemolytic disease and other neonatal jaundice
==============================================

Disease Description
-------------------

*Hemolytic disease and other neonatal jaundice* refers to the different
etiologies by which a newborn might develop extreme hyperbilirubinemia (EHB),
which can in turn become kernicterus.

`Neonatal jaundice`_ is a product of total serum or plasma bilirubin (TB)
levels rising too high, and has a number of etiologies; hemolytic disease and glucose-6-phosphate dehydrogenase deficiency (G6PD) are two major ones. In
addition to these two, GBD models 'preterm birth' and 'other causes' as
etiologies of EHB.

Bilirubin is produced during the breakdown of hemoglobin and other
heme-containing proteins. Healthy infants commonly have TB levels of > 1 mg/dL, 
which increases in the hours after birth.

At lower TB levels, an infant may be diagnosed with benign hyperbilirubinemia,
typified by a yellow pigmentation in the newborn caused by the bilirubin.
However as TB level increases towards extreme hyperbilirubinemia (EHB; typically
classified as TB > 30 mg/dL), the infant becomes increasingly at risk of
bilirubin crossing  the blood-brain barrier and binding to brain tissue, 
resulting in brain damage: bilirubin-induced neurologic dysfunction (BIND).

`Hemolytic disease`_ is a product of the mother's immunoglobin G antibodies
attacking the fetus or newborn's red blood cells. The main presentations of
this condition are RhD hemolytic diseaes and ABO hemolytic disease; however
there are over 30 other blood groups, various combinations of which can also
result in hemolytic disease.

.. todo::
	G6PD

.. todo::
	preterm birth

.. todo::
	other causes


The most common etiologies of hyperbilirubinemia include incompatibilty between
the mother and infant's blood types, lack of breastfeeding, recieving breastmilk 
if the mother's antigens are incompatible with the infant (called Breastmilk
jaundice; this would develop a few days after birth), and poor liver function in
the infant.

**The etiologies modeled by GBD** include EHB from `Rhesus (Rh) disease`_, preterm
birth, `glucose-6-phosphate dehydrogenase deficiency`_ (G6PD), and other causes.

.. _Hemolytic disease: https://www.uptodate.com/contents/postnatal-diagnosis-and-management-of-hemolytic-disease-of-the-fetus-and-newborn?search=hemolytic%20disease%20of%20the%20newborn&source=search_result&selectedTitle=1~150&usage_type=default&display_rank=1
.. _neonatal jaundice: https://www.uptodate.com/contents/unconjugated-hyperbilirubinemia-in-the-newborn-pathogenesis-and-etiology?search=neonatal%20jaundice&source=search_result&selectedTitle=1~98&usage_type=default&display_rank=1
.. _Rhesus (Rh) disease: https://en.wikipedia.org/wiki/Rh_disease
.. _glucose-6-phosphate dehydrogenase deficiency: https://en.wikipedia.org/wiki/Glucose-6-phosphate_dehydrogenase_deficiency
 
.. todo::
   Describe cause model
   
Cause Model Diagram
-------------------

There are two possible states for this cause, **with-condition** for people born *with* hemolytic disease or other neonatal jaundice, and
**free-of-condition** for people born *without* hemolytic disease or other neonatal jaundice:

.. image:: neonatal_jaundice_cause_model_diagram.svg

There is no transition between the states; each person is born into one state or
the other and permanently stays in that state. **Thus, incidence and remission
rates are zero.**

Data Descriptions
-----------------

.. list-table:: State Definitions
	:widths: 5 10 10
	:header-rows: 1
	
	* - State
	  - State name
	  - Definition
	* - C
	  - With **C**\ ondition
	  - Simulant was born with haemolytic disease or other neonatal jaundice
	* - F
	  - **F**\ ree of condition
	  - Simulant was not born with haemolytic disease or other neonatal jaundice
	  
.. list-table:: State Data
	:widths: 5 10 10 20
	:header-rows: 1
	
	* - State
	  - Measure
	  - Value
	  - Notes
	* - C
	  - prevalence
	  - prevalence_c384
	  -
	* - C
	  - birth prevalence
	  - birth_prevalence_c384
	  - 
	* - C
	  - excess mortality rate
	  - :math:`\frac{\text{deaths_c384}}{\text{population} \,\times\, \text{prevalence_c384}}`
	  -
	* - C
	  - disability weight
	  - :math:`\displaystyle{\sum_{s\in \text{sequelae_c384}}} \scriptstyle{\text{disability_weight}_s \,\times\, \text{prevalence}_s}`
	  -
	* - F
	  - prevalence
	  - 1-prevalence_c384
	  -
	* - F
	  - birth prevalence
	  - 1-birth_prevalence_c384
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
	  - :math:`\frac{\text{deaths_c384}}{\text{population}}`
	  -
	 
	  
.. list-table:: Transition Data
	:widths: 10 10 10 10 10
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
	:widths: 10 10 20 20
	:header-rows: 1
	
	* - Variable
	  - Source
	  - Description
	  - Notes
	* - prevalence_c384
	  - como
	  - Prevalence of hemolytic disease and other neonatal jaundice
	  - 
	* - birth_prevalence_c384
	  - como
	  - Proportion of babies born with hemolytic disease and other neonatal jaundice
	  - age_group_id = 164 and measure = 6 (incidence)
	* - deaths_c384
	  - codcorrect
	  - Count of deaths due to hemolytic diseases and other neonatal jaundice
	  - 
	* - population
	  - demography
	  - Mid-year population for given sex/age/year/location
	  -
	* - prevalence_s{sid}
	  - como
	  - Prevalence of sequela with id {id}
	  -
	* - disability_weight_s{sid}
	  - YLD appendix
	  - Disability weight of sequela with id {id}
	  -
	