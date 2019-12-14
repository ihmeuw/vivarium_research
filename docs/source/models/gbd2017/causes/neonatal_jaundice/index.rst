.. _2017_cause_neonatal_jaundice:

==============================================
Haemolytic disease and other neonatal jaundice
==============================================

Disease Description
-------------------

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
	  - emr
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
	* - prevalence_s{id}
	  - como
	  - Prevalence of sequela with id {id}
	  -
	* - disability_weight_s{id}
	  - YLDs appendix
	  - disability weight of sequela with id {id}
	  -
	