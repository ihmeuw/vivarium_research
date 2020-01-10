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
levels rising too high, and has a number of etiologies; Rh disease and 
glucose-6-phosphate dehydrogenase deficiency (G6PD) are two major ones. In 
addition to these two, GBD models 'preterm birth' and 'other causes' as
etiologies of EHB.

Bilirubin is produced during the breakdown of hemoglobin and other
heme-containing proteins. Healthy infants commonly have TB levels of > 1 mg/dL, 
which increases in the hours after birth.

At lower TB levels, an infant may be diagnosed with benign hyperbilirubinemia,
typified by a yellow pigmentation in the newborn caused by the bilirubin.
However as TB level increases towards EHB (typically classified as TB > 30
mg/dL), the infant becomes increasingly at risk of bilirubin crossing  the 
blood-brain barrier and binding to brain tissue, resulting in brain damage: 
bilirubin-induced neurologic dysfunction (BIND).

`Hemolytic disease`_ is a product of the mother's immunoglobin G antibodies
attacking the fetus or newborn's red blood cells. The main presentations of
this condition are RhD hemolytic diseaes and ABO hemolytic disease; however
there are over 30 other blood groups, various combinations of which can also
result in hemolytic disease.

`Glucose-6-phosphate dehygrogenase`_ (G6PD) deficiency is an enzymatic disorder 
of red blood cells. G6PD is a catalyst in the conversion of NADP to NADPH. NADPH
functions to protect red blood cells from oxidant accumulation, which in turn 
causes cell death.

`Preterm birth`_ infants experience a higher rate of EHB than infants born after
37 weeks of gestation. This is caused by a high level of red blood cell
turnover in the preterm infant, and thus higher bilirubin levels; a decreased
ability to process bilirubin, due to an immature liver; and increased
circulation of bile (which contains bilirubin) from the liver to the small 
intestine (enterohepatic circulation) in preterm infants. Furthermore, while the 
mechanic is not entirely understood, preterm infants `have been observed`_ to 
have a lower TB threshhold for developing BIND than their full-term counterparts.

We note that in the context of this model, *other causes* is calculated as the 
remainder of cases of EHB not attributale to Rh disease, preterm birth, or G6PD. 
It thus is defined to be all causes of EHB outside of Rh disease, preterm birth, 
and G6PD.

.. _neonatal jaundice: https://www.uptodate.com/contents/unconjugated-hyperbilirubinemia-in-the-newborn-pathogenesis-and-etiology?search=neonatal%20jaundice&source=search_result&selectedTitle=1~98&usage_type=default&display_rank=1

.. _Hemolytic disease: https://www.uptodate.com/contents/postnatal-diagnosis-and-management-of-hemolytic-disease-of-the-fetus-and-newborn?search=hemolytic%20disease%20of%20the%20newborn&source=search_result&selectedTitle=1~150&usage_type=default&display_rank=1

.. _Glucose-6-phosphate dehygrogenase: https://www.uptodate.com/contents/genetics-and-pathophysiology-of-glucose-6-phosphate-dehydrogenase-g6pd-deficiency?search=G6PD&source=search_result&selectedTitle=2~150&usage_type=default&display_rank=2

.. _Preterm birth: https://www.uptodate.com/contents/unconjugated-hyperbilirubinemia-in-the-preterm-infant-less-than-35-weeks-gestation?search=preterm%20bilirubinemia&source=search_result&selectedTitle=1~150&usage_type=default&display_rank=1

.. _have been observed: https://www.uptodate.com/contents/unconjugated-hyperbilirubinemia-in-the-preterm-infant-less-than-35-weeks-gestation?search=preterm%20bilirubinemia&source=search_result&selectedTitle=1~150&usage_type=default&display_rank=1#H3616699369

.. todo::
   Describe cause model
   
   
GBD Hierarchy
-------------

.. image:: jaundice_cause_hierarchy.svg

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

.. list-table:: Restrictions
	:widths: 15 15 20
	:header-rows: 1

	* - Restriction type
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
	  - age_group_id = 2; [0-7 days)
	* - YLL age group end
	  - Post neonatal
	  - age_group_id = 4; [28 days-1 year)
	* - YLD age group start
	  - Early neonatal
	  - age_group_id = 2; [0-7 days)
	* - YLD age group end
	  - 95 plus
	  - age_group_id = 235; 95 years +
