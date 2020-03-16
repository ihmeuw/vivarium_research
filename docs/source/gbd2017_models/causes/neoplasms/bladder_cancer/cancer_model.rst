.. _2017_cancer_model_bladder_cancer:

==============
Bladder Cancer
==============

Disease Overview
----------------

.. todo::

   Add definition of bladder cancer. In particular, find data about global prevalence and disease fatal and non fatal description.


GBD 2017 Modeling Strategy
--------------------------

Bladder cancer in GBD 2017
++++++++++++++++++++++++++

The GBD modelling strategy can be found in the GBD YLD Capstone Appendix [GBD-2017-YLD-Capstone-Appendix-1-Bladder-Cancer]_.


Incidence is estimated directly from mortality using mortality to incidence ratios (MIR).

Because of long-term disability associated with cystectomy, prevalence for bladder cancer is estimated beyond ten years. To estimate the disability, 
total prevalence for bladder cancer is split into

#. Diagnosis and primary therapy
#. Controlled phase

   #. Controlled phase of bladder cancer, with incontinence
   #. Controlled phase of bladder cancer, without incontinence
#. Metastatic phase
#. Terminal phase
#. Incontinence from bladder cancer, beyond 10 years

.. todo::

   Add more details about GBD modelling strategy of bladder cancer.

Cause Hierarchy
++++++++++++++++

.. image:: bladder_cancer_hierarchy.svg


Restrictions
++++++++++++

The following table describes any restrictions on the effects of this cause
(such as being only fatal or only nonfatal), as well as restrictions on the age
and sex of simulants to which different aspects of the cause model apply.

.. list-table:: Restrictions
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
     - 15 to 19
     - GBD age group id 8
   * - YLL age group end
     - 95 plus
     - GBD age group id 235
   * - YLD age group start
     - 15 to 19
     - GBD age group id 8
   * - YLD age group end
     - 95 plus
     - GBD age group id 235


Vivarium Modeling Strategy
--------------------------

Scope
+++++

.. todo::

   Add scope.

Model Assumptions and Limitations
+++++++++++++++++++++++++++++++++

1. Within GBD 2017, after diagnosis/ treatment if a patient survives more than 10 years, they are considered cured for calculating disability. 
For simulation models, this means that if the simulation is run for more than 10 years, then excess mortality rate exists due to cancer after 
10 years and the number of deaths increase. But as per GBD 2017, after 10 years, the patients do not have excess mortality rate. So, this model 
might over estimate deaths in that scenario.

.. todo::

   Add more assumptions and limitations.


Cause Model Diagram
+++++++++++++++++++

Within GBD 2017 data, the remission rate is not available which makes it difficult to transition through the states.  So, due to data limitations we are simplifying the model.
 
Note: This simpliflication might over estimate the number of deaths. See Model Assumptions and Limitations section for more information.

.. image:: cancer_cause_model.svg


State and Transition Data Tables
++++++++++++++++++++++++++++++++

.. list-table:: Definitions
   :widths: 15 20 30
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - Susceptible
     - Susceptible to bladder cancer
   * - I
     - Infected
     - Infected with bladder cancer


.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - S
     - prevalence
     - 1-prevalence_c474
     - 
   * - S
     - excess mortality rate
     - 0
     - 
   * - S
     - disabilty weights
     - 0
     -
   * - I
     - prevalence
     - prevalence_c474
     - 
   * - I
     - excess mortality rate
     - :math:`\frac{\text{deaths_c474}}{\text{population} \times \text{prevalence_c474}}`
     - 
   * - I
     - disability weights
     - :math:`\displaystyle{\sum_{s\in \text{sequelae_c474}}} \scriptstyle{\text{disability_weight}_s \,\times\, \text{prevalence}_s}`
     - total disability weight over all sequelae with ids s_341, s_5528, s_5531, s_343, s_344, s_5534
   * - ALL
     - cause specific mortality rate
     - :math:`\frac{\text{deaths_c474}}{\text{population}}`
     - 


.. list-table:: Transition Data
   :widths: 10 10 10 30 30
   :header-rows: 1
   
   * - Transition
     - Source 
     - Sink 
     - Value
     - Notes
   * - i
     - S
     - I
     - :math:`\frac{\text{incidence_rate_c474}}{\text{1 - prevalence_c474}}`
     - Incidence rate in total population is divided by 1-prevalence_c474 to get incidence rate among the susceptible population.


.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Measure
     - Sources
     - Description
     - Notes
   * - prevalence_c474
     - como
     - Prevalence of cause bladder cancer
     - 
   * - deaths_c474
     - codcorrect
     - Deaths from bladder cancer
     - 
   * - population
     - demography
     - Mid-year population for given country
     - 
   * - incidence_rate_c474
     - como
     - Incidence rate for bladder cancer
     - 
   * - disability_weight_s{`sid`}
     - YLD appendix
     - Disability weights associated with each sequelae
     - 
   * - prevalence_s{`sid`}
     - como
     - Prevalence of each sequelae
     - 



Validation Criteria
+++++++++++++++++++

.. todo::

   Describe tests for model validation.


References
----------

.. [GBD-2017-YLD-Capstone-Appendix-1-Bladder-Cancer]
   Supplement to: `GBD 2017 Disease and Injury Incidence and Prevalence
   Collaborators. Global, regional, and national incidence, prevalence, and
   years lived with disability for 354 diseases and injuries for 195 countries
   and territories, 1990–2017: a systematic analysis for the Global Burden of
   Disease Study 2017. Lancet 2018; 392: 1789–858`
   (pp. 310-317)
