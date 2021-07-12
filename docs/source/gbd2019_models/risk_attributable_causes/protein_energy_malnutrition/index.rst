.. _2019_cause_pem:

===========================
Protein Energy Malnutrition
===========================

GBD 2019 Modeling Strategy
--------------------------

PEM is responsible for both fatal and nonfatal outcomes within the GBD 
framework. GBD maintains a cause of death model called "Nutritional 
deficiencies" that is split into *PEM* and *Other Nutritional Deficiencies* that 
estimates PEM mortality. Nonfatal PEM cases are modelled independently, using 
the case definition moderate and severe malnutrition, defined in terms of 
weight-for-height Z-scores (WHZ). All PEM cases are attributed to the GBD Child 
Growth Failure risk factor.

.. todo::
   
   Finish filling in details


Protein Energy Malnutrition (PEM) in GBD 2019
+++++++++++++++++++++++++++++++++++++++++++++

Cause Hierarchy
+++++++++++++++

.. image:: pem_cause_hierarchy.svg

Restrictions
++++++++++++

Vivarium Modeling Strategy
--------------------------

Scope
+++++

Vivarium Modeling Strategy for Protein Energy Malnutrition (PEM)
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Assumptions and Limitations
+++++++++++++++++++++++++++

Assumptions
+++++++++++

Limitations
+++++++++++

Cause Model Diagram
-------------------

Data Description
----------------

State and Transition Data Tables
++++++++++++++++++++++++++++++++

.. list-table:: State Data
   :widths: 5 10 10 20
   :header-rows: 1

   * - State
     - Measure
     - Value
     - Notes
   * - MAM
     - disability weight
     - :math:`\frac{{\sum_{sequelae\in \text{MAM}}} \scriptstyle{\text{disability_weight}_s \times\ \text{prevalence}_s}}{{\sum_{sequelae\in \text{MAM}} \scriptstyle{\text{prevalence}_s}}}`
     - disability weight for MAM
   * - SAM
     - disability weight
     - :math:`\frac{{\sum_{sequelae\in \text{SAM}}} \scriptstyle{\text{disability_weight}_s \times\ \text{prevalence}_s}}{{\sum_{sequelae\in \text{SAM}} \scriptstyle{\text{prevalence}_s}}}`
     - disability weight for SAM


.. list-table:: Data Sources and Definitions
   :widths: 10 10 20 20
   :header-rows: 1

   * - Variable
     - Source
     - Description
     - Notes
   * - MAM sequelae
     - 
     - {s198, s2033}
     - Moderate wasting with eodema, moderate wasting without oedema
   * - SAM sequelae
     - 
     - {s199, s2036}
     - Severe wasting with eodema, severe wasting without oedema

Note we pull the above sequelae by using:

.. code-block:: python

  from db_queries import get_sequela_metadata
  
  hierarchy_2019 = get_sequela_metadata(sequela_set_id=2, gbd_round_id=6, decomp_step="step4")
  hierarchy_2019.loc[(hierarchy_2019.cause_id==387)]

.. list-table:: Restrictions
   :widths: 10 10 20
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
     - Post Neonatal
     - age_group_id = 4
   * - YLL age group end
     - 95 plus
     - age_group_id = 235
   * - YLD age group start
     - Early Neonatal
     - age_group_id = 2
   * - YLD age group end
     - 95 plus
     - age_group_id = 235


Validation Criteria
-------------------

References
----------
