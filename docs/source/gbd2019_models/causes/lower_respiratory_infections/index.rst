.. _2019_cause_lower_respiratory_infections:

============================
Lower Respiratory Infections
============================

Disease Description
-------------------
Lower respiratory infections (*LRI*), principally clinician-diagnosed pneumonia
and bronchiolitis, is a major global killer of both children and adults. Symptoms
include shortness of breath, weakness, fever, coughing and fatigue. It is important to check for a fever. Symptoms can last about 7 days and the infection is contagious
to others shortly before and while experiencing symptoms. It is mainly
caused by four pathogens - Streptococcus pneumoniae (*pneumococcal
pneumonia*), Haemophilus influenzae type B (*Hib*), influenza, and respiratory
syncytial virus (*RCV*). Those pathogens may co-infect.
Pneumococcal pneumonia is the largest cause of LRI
mortality. [Wikipedia]_, [GBD-2019-Capstone-Appendix]_

The lower respiratory tract or lower airway is derived from the developing foregut
and consists of the trachea, bronchi (primary, secondary and tertiary),
bronchioles (including terminal and respiratory), and lungs (including alveoli).
It also sometimes includes the larynx. [Wikipedia]_

Transmission of LRI may occur via several pathways, including direct physical contact,
fomites, direct droplet spread, and suspended small particles. Intermingling of
large numbers of people can facilitate transmission of respiratory pathogens. [CDC]_

In GBD 2016, malnutrition was identified as a leading risk factor for lower respiratory infection
mortality among children younger than 5 years and, together with air pollution (both household and ambient)
and increased antibiotic use, was identified as a focus for targeted intervention measures. [Lancet]_

.. todo::

   Describe more about deaths and complications due to LRI.
   Talk about current vaccination against influenza and pneumonia.
   https://apps.who.int/iris/bitstream/handle/10665/241904/WER8714_129-144.PDFp

Modeling LRI in GBD 2019
------------------------


GBD hierarchy
-------------


Cause Model Diagram
-------------------


Model Assumptions and Limitations
---------------------------------


Data Description
----------------
.. list-table:: Definition
   :widths: 5 20 30
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - Susceptible
     - Susceptible but does not currently have LRI
   * - I
     - Infected
     - Currently infected and having the condition

.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1

   * - State
     - Measure
     - Value
     - Notes
   * - S
     - birth prevalence
     - 1-birth_prevalence_meid1258
     -
   * - S
     - prevalence
     - 1-prevalence_c322
     -
   * - S
     - excess mortality rate
     - 0
     -
   * - S
     - disability weights
     - 0
     -
   * - I
     - birth prevalence
     - birth_prevalence_meid1258
     -
   * - I
     - prevalence
     - prevalence_c322
     -
   * - I
     - excess mortality rate
     - :math:`\frac{\text{deaths_c322}}{\text{population} \,\times\,\text{prevalence_c322}}`
     -
   * - I
     - disability weights
     - disability_weight_s670 :math:`\times` prevalence_s670+ disability_weight_s669 :math:`\times` prevalence_s669 + disability_weight_s671 :math:`\times` prevalence_s671
     -
   * - ALL
     - cause specific mortality rate
     - :math:`\frac{\text{deaths_c322}}{\text{population}}`
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
     - :math:`\frac{\text{incidence_rate_c322}}{(1-\text{prevalence_c322})}`
     - Incidence in GBD are estimated for the total population. Here we transform incidence to be a rate within the susceptible population.
   * - r
     - I
     - S
     - remission_rate_c322
     -
.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1

   * - Measure
     - Sources
     - Description
     - Notes
   * - birth_prevalence_meid1258
     - epi
     - Birth Prevalence of LRI
     - get_draws('modelable_entity_id', 1258, source='epi', age_group_id=164, measure_id=5, gbd_round_id=6, year_id=2019, decomp_step='step4', status = 'best')
   * - prevalence_c322
     - como
     - Prevalence of LRI
     -
   * - deaths_c322
     - codcorrect
     - Deaths from LRI
     -
   * - population
     - demography
     - Mid-year population for given age/sex/year/location
     -
   * - incidence_rate_c322
     - como
     - Incidence rate of LRI within the entire population
     -
   * - remission_rate_m1258
     - dismod-mr
     - Remission rate of LRI within the infected population
     -
   * - disability_weight_s{sid}
     - YLD Appendix
     - Disability weights associated with each sequela
     - Note Guillain-Barre due to LRI is included in sequelae.
   * - prevalence_s{sid}
     - como
     - Prevalence of each sequela with id 'sid'
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
     - GBD age group id is 2
   * - YLL age group end
     - Age 95+
     - GBD age group id is 235
   * - YLD age group start
     - Early neonatal
     - GBD age group id is 2
   * - YLD age group end
     - Age 95+
     - GBD age group id is 235

Validation Criteria
-------------------


References
----------
.. [Wikipedia] Lower respiratory tact infection. From Wikipedia, the Free Encyclopedia.
   Retrieved 22 Nov 2019.
   https://en.wikipedia.org/wiki/Lower_respiratory_tract_infection

.. [CDC] Respiratory Infections (*The Yellow Book*). Centers for Disease Control and Prevention, 2019. Retrieved 20 Dec 2019.
   https://wwwnc.cdc.gov/travel/yellowbook/2020/posttravel-evaluation/respiratory-infections

.. [Lancet] The Global Burden of Lower Respiratory Infections: Making Progress, but We Need to Do Better (*Volume 18*).
   The Lancet Infectious Diseases, 2018. Retrieved 20 Dec 2019.
   https://www.sciencedirect.com/science/article/pii/S1473309918304079?via%3Dihub

.. [GBD-2019-Capstone-Appendix]
  Appendix_ to: `GBD 2019 Diseases and Injuries Collaborators. Global burden of 
  369 diseases and injuries in 204 countries and territories, 1990–2019: a 
  systematic analysis for the Global Burden of Disease Study 2019. The L