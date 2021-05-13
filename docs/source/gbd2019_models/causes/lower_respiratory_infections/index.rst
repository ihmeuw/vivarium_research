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
This model is designed to be used for estimating DALYs due to LRI that are 
averted from a country-level intervention(e.g. food fortification or 
supplementation given to a percentage of the population) that can reduce LRI 
incidence as a downstream effect.

There is substantial additional effort in GBD to divide LRI
burden into the aetiologies of LRI, but we do not include
aetiologies in this simple model.

There are three sequelae associated with LRI, including moderate LRI, severe 
LRI, and Guillain-Barré syndrome due to LRI. We are not tracking the long-term 
effects of Guillain-Barré syndrome (which can include paralysis, for example). 
However, since the prevalence of GBS is so low, there would likely not be great 
benefit in capturing its long-term YLDs in addition to its short-term YLDs.


.. note::

	Birth prevalence of LRI was allowed in the DisMod modeling process for LRI. However, it was not reported as a final result in GBD 2019. LRI birth prevalence must therefore be retreieved using get_model_results('epi', 1258, age_group_id=164, measure_id=5, gbd_round_id=6, year_id=2019, decomp_step = 'step4', status = 'best') or get_draws('modelable_entity_id', 1258, source='epi', age_group_id=164, measure_id=5, gbd_round_id=6, year_id=2019, decomp_step = 'step4'). (Todo: this
  was the case in GBD2017. Check that it's not measure_id=6 instead of 5?)

.. todo::

   Describe more assumptions and limitations of the model.


Data Description
----------------


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
  systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 
  17 Oct 2020;396:1204-1222` 
