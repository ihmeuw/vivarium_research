.. _2017_cause_neonatal_jaundice:

==============================================
Haemolytic disease and other neonatal jaundice
==============================================

Disease Description
-------------------

Hemolytic disease and neonatal jaundice are two separate etiologies by which
an newborn infant might develop hyperbilirubinemia.

Hemolytic disease is a product of the mother's immunoglobin G antibodies
attacking the fetus or newborn's red blood cells. The main presentations of
this condition are RhD hemolytic diseaes and ABO hemolytic disease; however
there are over 30 other blood groups, some of combinations of which can also
result in hemolytic disease.

Neonatal jaundice is a product of total serum or plasma bilirubin (TB)
levels rising too high.

Bilirubin is produced during the breakdown of hemoglobin and other
heme-containing proteins, and a healthy infants commonly have TB levels of > 1
mg/dL, which increases in the hours after birth. As TB level increases,
"hyperbilirubinemia" is classified into significant, severe, and extreme
hyperbilirubinemia.

From uptodate: Hemolytic disease of the fetus and newborn (HDFN), also known as alloimmune HDFN or erythroblastosis fetalis, is caused by the destruction of red blood cells (RBCs) of the neonate or fetus by maternal immunoglobulin G (IgG) antibodies. These antibodies are produced when fetal erythrocytes, which express an RBC antigen not expressed in the mother, gain access to the maternal circulation.

Case definition in GBD 2017
+++++++++++++++++++++++++++



`Haemolytic disease of the newborn`_ and other `neonatal jaundice`_ refers to
several aetiologies by which an infant develops extreme hyperbilirubinemia_
(EHB) and can then go on to develop kernicterus_. The aetiologies that we model
for GBD are EHB from `Rhesus (Rh) disease`_, preterm birth,
`glucose-6-phosphate dehydrogenase deficiency`_ (G6PD), and other causes.

.. _Haemolytic disease of the newborn: https://www.urmc.rochester.edu/encyclopedia/content.aspx?ContentTypeID=90&ContentID=P02368
.. _neonatal jaundice: https://en.wikipedia.org/wiki/Neonatal_jaundice
.. _hyperbilirubinemia: https://www.chop.edu/conditions-diseases/hyperbilirubinemia-and-jaundice
.. _kernicterus: https://en.wikipedia.org/wiki/Kernicterus
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
	