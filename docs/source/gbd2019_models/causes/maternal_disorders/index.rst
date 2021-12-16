.. _2019_cause_maternal_disorders:

==============================
Maternal disorders
==============================

.. todo::

  Add a brief introductory paragraph for this document.

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - 
    - 
    - 

.. todo::

  Fill out table with any abbreviations and their definitions used in this document.

Disease Overview
----------------

.. todo::

   Add a general clinical overview of the cause.

GBD 2019 Modeling Strategy
--------------------------

.. todo::

  Add an overview of the GBD modeling section.

Cause Hierarchy
+++++++++++++++

- All causes (c_294)

  - Communicable, maternal, neonatal, and nutritional diseases (c_295)

    - Maternal disorders and neonatal disorders (c_962)

      - **Maternal disorders (c_366)**

        - Maternal hemorrhage (c_367)

          - Mild anemia due to maternal hemorrhage (s_182)

          - Moderate anemia due to maternal hemorrhage (s_183)

          - Severe anemia due to maternal hemorrhage (s_184)

          - Maternal hemorrhage with less than 1 liter blood loss (s_180)

          - Maternal hemorrhage with greater than 1 liter blood loss (s_181)

        - Maternal sepsis and other maternal infections (c_368)

          - Infertility due to puerperal sepsis (s_675)

          - Other maternal infections (s_938)

          - Puerperal sepsis (s_937)

        - Maternal hypertensive disorders (c_369)

          - Long term sequelae of severe pre-eclampsia (s_677)

          - Long term sequelae of eclampsia (s_677)

          - Other hypertensive disorders of pregnancy (s_676)

          - Severe pre-eclampsia (s_185)

          - Eclampsia (s_186)

        - Maternal obstructed labor and uterine rupture (c_370)

          - Obstructed labor, acute event (s_188)

          - Rectovaginal fistula (s_189)

          - Vesicovaginal fistula (s_190)

        - Abortion and miscarriage (c_995)

          - Maternal abortive outcome (s_191)

        - Ectopic pregnancy (c_374)

          - Ectopic pregnancy (s_5165)

        - Indirect maternal deaths (c_375)

        - Late maternal deaths (c_376)

        - Maternal deaths aggrevated by HIV/AIDs (c_741)

        - Other maternal disorders (c_379)

          - Other maternal disorders (s_192)

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
     -
     -
   * - Female only
     -
     -
   * - YLL only
     -
     -
   * - YLD only
     -
     -
   * - YLL age group start
     -
     -
   * - YLL age group end
     -
     -
   * - YLD age group start
     -
     -
   * - YLD age group end
     -
     -


Vivarium Modeling Strategy
--------------------------

.. todo::

  Add an overview of the Vivarium modeling section.

Scope
+++++

.. todo::

  Describe which aspects of the disease this cause model is designed to
  simulate, and which aspects it is **not** designed to simulate.

Assumptions and Limitations
+++++++++++++++++++++++++++

.. todo::

  Describe the clinical and mathematical assumptions made for this cause model,
  and the limitations these assumptions impose on the applicability of the
  model.

Cause Model Diagram
+++++++++++++++++++

State and Transition Data Tables
++++++++++++++++++++++++++++++++

This section gives necessary information to software engineers for building the model. 
This section usually contains four tables: Definitions, State Data, Transition Data and Data Sources.

Definitions
"""""""""""

This table contains the definitions of all the states in **cause model diagram**. 

.. list-table:: State Definitions
   :widths: 5 5 20
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - 
     - 
     - 
   * - 
     - 
     - 

For example, the *Definitions* table for *SIR* and *With-Condition and Free of Condition Model* models are as below:

**SIR Model**

.. list-table:: State Definitions
   :widths: 5 5 20
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - Susceptible
     - Susceptible to {cause name}
   * - I
     - Infected
     - Infected with {cause name}
   * - R
     - Recovered
     - Infected with {cause name}


**With-Condition and Free of Condition Model**

.. list-table:: State Definitions
   :widths: 1, 5, 10
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - C
     - With **C**\ ondition
     - Born with {cause name}
   * - F
     - **F**\ ree of Condition
     - Born without {cause name}

Include states, their names and definitions appropriate to your model.

States Data
"""""""""""

This table contains the **measures** and their **values** for each state in cause-model diagram. This information is used to 
initialize the model. The common measures in each state are prevalence, birth prevalence, excess mortality rate and disability weights. 
Cause specific mortality rate is the common measure for all states. In most of the models either prevalence or birth prevalence is used. 
But in some rare cases like neonatal models both prevalence and birth prevalence are used in model initialization. The Value column contains the formula to calculate 
the measure in each state.

The structure of the table is as below. For each state, the measures and values must be included.

.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - State
     - prevalence
     - 
     - 
   * - State
     - birth prevalence
     - 
     - 
   * - State
     - excess mortality rate
     - 
     - 
   * - State
     - disabilty weights
     - 
     -
   * - ALL
     - cause specific mortality rate
     - 
     - 



Transition Data
"""""""""""""""

This table contains the measures needed for transition from one state to other in the cause model. The common measures used are *incident rate* to 
move from Susceptible to Infected and *remission rate* to move from Infected to Susceptible or Recovered states. Some times there may not be transition 
between states as in Neonatal disorders.

The structure of the table is as below. 

.. list-table:: Transition Data
   :widths: 10 10 10 20 30
   :header-rows: 1
   
   * - Transition
     - Source 
     - Sink 
     - Value
     - Notes
   * - i
     - S
     - I
     - 
     - 
   * - r
     - I
     - R
     - 	
     - 


Data Sources
""""""""""""

This table contains the data sources for all the measures. The table structure and common measures are as below:

.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Measure
     - Sources
     - Description
     - Notes
   * - prevalence_cid
     - 
     - 
     - 
   * - birth_prevalence_cid
     - 
     - 
     -
   * - deaths_cid
     - 
     - 
     - 
   * - population
     - 
     - 
     - 
   * - sequelae_cid
     - 
     - 
     - 
   * - incidence_rate_cid
     - 
     - 
     - 
   * - remission_rate_m1594
     - 
     - 
     - 
   * - disability_weight_s{`sid`}
     - 
     - 
     - 
   * - prevalence_s{`sid`}
     - 
     - 
     - 


Validation Criteria
+++++++++++++++++++

References
----------
