.. _2017_cause_lower_respiratory_infections:

============================
Lower Respiratory Infections
============================

Disease Description
-------------------

Lower respiratory infections (*LRI*), principally clinician-diagnosed pneumonia
and bronchiolitis, is a major global killer of both children and adults. Symptoms
include shortness of breath, weakness, fever, coughing and fatigue. It is important to check for a fever. Symptoms can last about 7 days and the infection is contagious
to others shortly before and while experiencing symptoms. It is mainly
caused by four microorganisms - Streptococcus pneumoniae (*pneumococcal
pneumonia*), Haemophilus influenzae type B (*Hib*),influenza, and respiratory
syncytial virus (*RCV*). LRI can be caused by multiple pathogens and the pathogens may co-infect.
Pneumococcal pneumonia is the largest cause of LRI
mortality. [Wikipedia]_, [GBD-2017-YLD-Capstone-Appendix-1]_

Modeling LRI in GBD 2017
------------------------

The GBD 2017 defined the time to recovery for LRI as an average of 10 days(*5-15 days*),
which corresponds with a remission 36.5.


GBD hierarchy
-------------
.. image:: lri_hierarchy.svg

c_{} - cause_{gbd_id}, s_{} - sequelae_{gbd_id}

GBS stands for Guillain-Barré syndrome.

Cause Model Diagram
-------------------

.. image:: lri_disease_model.svg


Data Description
----------------
.. list-table:: **Definition**
   :widths: 5 30
   :header-rows: 1

   * - State
     - Definition
   * - S
     - Susceptible but does not currently have LRI
   * - I
     - Currently infected and having the condition

.. list-table:: **States Data**
   :widths: 20 25 30 30
   :header-rows: 1

   * - State
     - Measure
     - Value
     - Notes
   * - S
     - prevalence
     - 1-prevalence_c322
     -
   * - S
     - excess mortality |br| rate
     - 0
     -
   * - S
     - disabilty weights
     - 0
     -
   * - I
     - prevalence
     - prevalence_c322
     -
   * - I
     - excess mortality |br| rate
     - :math:`\frac{\text{deaths_c322}}{\text{population * prevalence_c322}}`
     -
   * - I
     - disability weights
     - disability_weight_s670* |br| prevalence_s670+ |br| disability_weight_s669* |br| prevalence_s669
     - GBD assumes 15% of LRI |br| cases as severe and 85% |br| as moderate |br| [GBD-2017-YLD-Capstone-Appendix-1]_.
   * - ALL
     - cause specific |br| mortality rate
     - :math:`\frac{\text{deaths_c322}}{\text{population}}`
     -

.. list-table:: **Transition Data**
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
     - incidence_rate_c322
     - Incidence rate in |br| total population
   * - r
     - I
     - S
     - remission_rate_c322
     -
.. list-table:: **Data Sources**
   :widths: 20 25 25 25
   :header-rows: 1

   * - Measure
     - Sources
     - Description
     - Notes
   * - prevalence_c322
     - COMO
     - Prevalence of LRI
     -
   * - deaths_c322
     - CoDCorrect
     - Deaths from LRI
     -
   * - population
     - Demography
     - Mid-year population for |br| given country
     -
   * - incidence_rate_c322
     - COMO
     - Incidence rate for LRI
     -
   * - remission_rate_c322
     - DisMod-MR
     - Remission rate for LRI
     -
   * - disability_weight_{sid}
     - GBD YLD Appendix
     - Disability weights associated |br| with each sequelae
     -
   * - prevalence_{sid}
     - COMO
     - Prevalence of each sequelae
     -


Model Assumptions and Limitations
---------------------------------
There is substantial additional effort in GBD to divide LRI
burden into the aetiologies of LRI, but we have not included
aetiologies in this simple model.

There are three sequelae associated with LRI. We do not consider Guillain-Barré syndrome
in this model because the prevalence of it is too low to affect the overall disability weight.

Validation Criteria
-------------------

.. todo::

   Describe tests for model validation.

References
----------

.. [Wikipedia] Lower respiratory tact infection. From Wikipedia, the Free Encyclopedia.
   Retrieved 22 Nov 2019.
   https://en.wikipedia.org/wiki/Lower_respiratory_tract_infection

.. [GBD-2017-YLD-Capstone-Appendix-1]
   Supplement to: `GBD 2017 Disease and Injury Incidence and Prevalence
   Collaborators. Global, regional, and national incidence, prevalence, and
   years lived with disability for 354 diseases and injuries for 195 countries
   and territories, 1990–2017: a systematic analysis for the Global Burden of
   Disease Study 2017. Lancet 2018; 392: 1789–858 <DOI for YLD Capstone_>`_
   (pp. 246-7)

   (Direct links to the YLD Appendix hosted on `Lancet.com <YLD appendix on Lancet.com_>`_

.. _YLD appendix on Lancet.com: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32279-7/attachment/6db5ab28-cdf3-4009-b10f-b87f9bbdf8a9/mmc1.pdf
.. _YLD appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322797-mmc1.pdf
.. _DOI for YLD Capstone: https://doi.org/10.1016/S0140-6736(18)32279-7
