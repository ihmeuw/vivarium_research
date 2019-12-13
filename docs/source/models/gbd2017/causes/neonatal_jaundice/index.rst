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

Preliminary!

.. list-table:: Definitions
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
	  
.. list-table:: States
	:widths: 5 10 10 20
	:header-rows: 1
	
	* - State
	  - Measure
	  - Value
	  - Notes
	* - C
	  - prevalence
	  - prev_c384
	  -
	* - C
	  - birth prevalence
	  - birth_prev_unknown
	  - is this the table we want to house this in?
	* - C
	  - emr
	  - :math:`\frac{\text{deaths_c384}}{\text{population} \,\times\, \text{prevalence_c384}}`
	  -
	* - C
	  - disability weight
	  - :math:`\displaystyle{\sum_{s\in \text{sequelae_c384}}} \scriptstyle{\text{disability_weight}_s \,\times\, \text{prevalence}_s}`
	  -
	* - F
	  - prevalence
	  - 1-prev_c384
	  -
	* - F
	  - birth prevalence
	  - 1-birth_prev_unknown
	  - is this the table we want this in?
	* - F
	  - emr
	  - 0
	  -
	* - F
	  - disability weight
	  - 0
	  -
	* - All
	  - CSMR
	  - :math:`\frac{\text{deaths_c384}}{\text{population}}`
	  -
	  
.. list-table:: Sequelae
	:widths: 10 10 20
	:header-rows: 1
	
	* - Sequela_name
	  - sequela_id
	  - Notes
	* - Moderate motor impairment due to hemolytic disease and other neonatal jaundice
	  - 738
	  -
	* - Moderate motor impairment with blindness due to hemolytic disease and other neonatal jaundice
	  - 749
	  -
	* - Moderate motor impairment with blindness due to hemolytic disease and other neonatal jaundice
	  - 748
	  - 
	* - Moderate motor impairment with blindness and epilepsy due to hemolytic disease and other neonatal jaundice
	  - 749
	  -
	* - Moderate motor impairment with epilepsy due to hemolytic disease and other neonatal jaundice
	  - 760
	  -
	* - Moderate motor plus cognitive impairment with blindness due to hemolytic disease and other neonatal jaundice
	  - 701
	  -
	* - Moderate motor plus cognitive impairment with blindness and epilepsy due to hemolytic disease and other neonatal jaundice
	  - 711
	  -
	* - Moderate motor plus cognitive impairment with epilepsy due to hemolytic disease and other neonatal jaundice
	  - 715
	  -
	* - Severe motor plus cognitive impairment with blindness due to hemolytic disease and other neonatal jaundice
	  - 722
	  -
	* - Severe motor plus cognitive impairment with blindness and epilepsy due to hemolytic disease and other neonatal jaundice
	  - 727
	  -
	* - Severe motor plus cognitive impairment with epilepsy due to hemolytic disease and other neonatal jaundice
	  - 733
	  -
	* - Severe motor impairment severe due to hemolytic disease and other neonatal jaundice
	  - 762
	  -
	* - Severe motor impairment with blindness due to hemolytic disease and other neonatal jaundice
	  - 769
	  -
	* - Severe motor impairment with blindness and epilepsy due to hemolytic disease and other neonatal jaundice
	  - 776
	  -
	* - Severe motor impairment with epilepsy due to hemolytic disease and other neonatal jaundice
	  - 784
	  -
	* - Extreme hyperbilirubinemia due to hemolytic disease and other neonatal jaundice, without kernicterus
	  - 7223
	  -
	  
.. list-table:: Transitions
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
	  
.. list-table:: Data Definitions
	:widths: 10 10 20
	:header-rows: 1
	
	* - Variable
	  - Source
	  - Notes
	* - prev_c384
	  - como
	  - 
	* - birth_prev_unknown
	  - como?
	  - have asked helena about this
	* - deaths_c384
	  - codcorrect
	  - 
	* - disability weights
	  - YLDs appendix
	  - 
	