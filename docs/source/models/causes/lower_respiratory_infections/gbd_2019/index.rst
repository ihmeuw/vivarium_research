.. _2019_cause_lower_respiratory_infections:

======================================
Lower Respiratory Infections: GBD 2019
======================================

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
mortality. [Wikipedia-LRI-2019]_, [GBD-2019-Capstone-Appendix-LRI]_

The lower respiratory tract or lower airway is derived from the developing foregut
and consists of the trachea, bronchi (primary, secondary and tertiary),
bronchioles (including terminal and respiratory), and lungs (including alveoli).
It also sometimes includes the larynx. [Wikipedia-LRI-2019]_

Transmission of LRI may occur via several pathways, including direct physical contact,
fomites, direct droplet spread, and suspended small particles. Intermingling of
large numbers of people can facilitate transmission of respiratory pathogens. [CDC-LRI-2019]_

In GBD 2016, malnutrition was identified as a leading risk factor for lower respiratory infection
mortality among children younger than 5 years and, together with air pollution (both household and ambient)
and increased antibiotic use, was identified as a focus for targeted intervention measures. [Lancet-LRI]_

.. todo::

   Describe more about deaths and complications due to LRI.
   Talk about current vaccination against influenza and pneumonia.
   https://apps.who.int/iris/bitstream/handle/10665/241904/WER8714_129-144.PDFp

Modeling LRI in GBD 2019
------------------------

The GBD LRI model comprises a fatal and a nonfatal model. The outputs of each of 
these are fit to four etiologies, which are modeled separately.

LRI deaths are estimated using separate CODEm models for children under 5 and 
persons aged 5-95+, due to the significant difference in fatality patterns. These 
models run using CoD data from vital registration systems, surveillance 
systems, and verbal autopsy, along with a set of covariates updated slightly 
from those used in GBD 2017. [GBD-2019-Capstone-Appendix-LRI]_

.. todo:: 

   include covariate tables. p96: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30925-9/attachment/deb36c39-0e91-4057-9594-cc60654cf57f/mmc1.pdf

These estimates are then adjusted using CodCorrect to fit the overall mortality 
envelope estimated by the GBD, and mapped to etiologies by location, year, age, 
and sex.

The case definition used for the nonfatal LRI model is "clinician- diagnosed 
pneumonia or bronchiolitis". Primary input data types include incidence and prevalence 
data from population surveys, scientific literature, and hospital/claims 
records. The modelers first adjust survey data for seasonality; then all input 
data with a non-reference case definition is adjusted using correction factors 
estimated with MR-BRT. The modelers defined time to recovery as 10 (5-15) days, 
which corresponds with a remission rate of 36.5 recoveries / person-year. 
LRI severity splits are obtained from a meta-analysis, and then the 
DisMod outputs are split according to severity before disablility weights for 
YLD calculation are applied. [GBD-2019-Capstone-Appendix-LRI]_ Note that as DisMod 
estimates an unrealistically high birth prevalence, after discussions with Theo 
and Nick, the modelers decided to set birth prevalence to zero. 

.. todo::

   Ask sim science, and then gbd team, what "model-MR" is. Different from dismod?

LRI viral etiologies include influenza and respiratory syncytial virus (RSV), 
and bacterial etiologies include Streptococcus pneumoniae and Haemophilus 
influenzae type B (Hib). The two types of etiologies are modeled using two different 
counterfactual strategies, and then for each etiology a PAF is calculated. Note 
that as LRI pathogens can co-infect, these PAFs can overlap. Due to a lack of 
data, the modelers did not map neonatal deaths to etiologies. [GBD-2019-Capstone-Appendix-LRI]_


The viral etiologies were modeled using the following formula:

.. math:: 

   PAF = Proportion(modeled)*(1-\frac{1}{OR})

Here, *Proportion* is the proportion of LRI cases that test positive for 
influenza or LRI, and *OR* is defined to be the odds ratio of LRI given the 
presence of the pathogen. The odds ratios were obtained from a log-linear 
interpolation model, and the proportion data for each etiology was modeled 
using DisMod. [GBD-2019-Capstone-Appendix-LRI]_


The bacterial etiologies were modeled using a vaccine probe design: the
modelers first calculated the ratio of vaccine effectiveness against
nonspecific pneumonia to pathogen-specific pneumonia. Estimates were adjusted by 
vaccine coverage and exoected vaccine performance to generate country- and year-
specific PAFs. DisMod was used to model an age pattern, resulting in the final
location- year- and age- specific PAF estimates. Due to a lack of vaccine
efficacy data for children over two years old, the modelers did not map LRI in 
over-5 year olds to Hib. [GBD-2019-Capstone-Appendix-LRI]_


GBD hierarchy
-------------
.. image:: lri_hierarchy.svg

c_{} - cause_{gbd_id}, s_{} - sequelae_{gbd_id}

GBS stands for Guillain-Barré syndrome.

Cause Model Diagram
-------------------

.. image:: lri_disease_model.svg


Model Assumptions and Limitations
---------------------------------
Because DisMod estimated an unrealistically high birth prevalence, the modelers 
set birth prevalence to zero. Consequently, the birth prevalence, incidence, 
and prevalence available from get_outputs are incongruous with one another.

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

.. todo::

   Describe more assumptions and limitations of the model.


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
     - 0
     -
   * - S
     - prevalence
     - 1-prevalence_calculated
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
     - 0
     -
   * - I
     - prevalence_calculated
     - **For early neonatal age group:** (birth_prevalence_I + (incidence_rate_c322 * duration_c322))/2. **For all other age groups:** incidence_rate_c322 * duration_c322
     - Justification included below. Early neonatal age group exception due to non-steady state dynamics in this age group given birth prevalence of zero causes increasing prevalence within age group and short duration of age group. `Citation on these dynamics and approximations here for reference <https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3465772/>`_.
   * - I
     - excess mortality rate
     - :math:`\frac{\text{deaths_c322}}{\text{population} \,\times\,\text{prevalence_calculated}}`
     -
   * - I
     - disability weights
     - disability_weight_s670 :math:`\times` prevalence_s670+ disability_weight_s669 :math:`\times` prevalence_s669 + disability_weight_s671 :math:`\times` prevalence_s671
     -
   * - ALL
     - cause specific mortality rate
     - :math:`\frac{\text{deaths_c322}}{\text{population}}`
     -

We calculate prevalence using the equation prevalence = incidence * duration. 
(See assumptions and limitations for the need to replace GBD's prevalence).
This is appropriate because LRI has a short and relatively uniform duration of 
7.79 days (95% CI 6.2–9.64) days [GBD-2019-Capstone-Appendix-LRI]_. This assumption is valid under steady state conditions. However, the prevalence of LRI is not in steady state for the early neonatal age group given a birth prevalence of 0 and a short duration of the age group (prevalence will increase as the population ages within the age group). Therefore, we calculate the prevalence in the early neonatal age group as an average of the birth prevalence and the approximated prevalence under a steady state transition (incidence * duration). This is approach is `discussed in this citation for reference <https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3465772/>`_.

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
     - :math:`\frac{\text{incidence_rate_c322}}{(1-\text{prevalence_calculated})}`
     - Incidence in GBD are estimated for the total population. Here we transform incidence to be a rate within the susceptible population.
   * - r: USED IN CIFF AND IV IRON SIMULATIONS AS WELL AS MODELS 1-11 OF NUTRITION OPTIMIZATION SIMULATION
     - I
     - S
     - (-1/time_step)*log(1-time_step/duration_c322)
     - Where time_step is the duration of the simulation time_step in years. Use the :code:`np.log()` function. See discussion of this equation on the :ref:`diarrheal diseases cause model document <2019_cause_diarrhea>` and :ref:`Choosing an Appropriate Time Step page <vivarium_best_practices_time_steps>` page for more information.
   * - r: FOR USE IN NUTRITION OPTIMIZATION SIMULATION AFTER IMPLEMENTATION OF VARIABLE TIMESTEPS
     - I
     - S
     - 1/duration_c322
     - 

.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1

   * - Measure
     - Sources
     - Description
     - Notes
   * - birth_prevalence_c322
     - como
     - 0
     - No birth prevalence
   * - prevalence_calculated
     - Calculated from incidence (como) and duration (literature/gbd)
     - Duration-based calculation of LRI Prevalence
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
   * - duration_c322
     - (7.79 days; 95% CI 6.2–9.64; normal distribution of uncertainty)/365
     - Mean duration of an LRI case (in years). From the YLD appendix
     - This value should not vary by age group despite the fact that the duration is longer than the length of the early neonatal age group.

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
     - Post neonatal (age group ID 4, 1 month to 1 year)
     - GBD age group start is early neonatal (age group ID 2, 0-6 days)
   * - YLL age group end
     - Age 95+
     - GBD age group id is 235
   * - YLD age group start
     - Post neonatal (age group ID 4, 1 month to 1 year)
     - GBD age group start is early neonatal (age group ID 2, 0-6 days)
   * - YLD age group end
     - Age 95+
     - GBD age group id is 235

.. note:: 

  **A note on the LRI age start parameter:**

    This Vivarium modeling strategy sets the LRI cause model age start to the post neonatal age group (1 month to 1 year) despite the GBD age start parameter being the early neonatal age group (0 to 6 days). We exclude the early and late neonatal age groups from the cause model as a strategy that allows us to increase the timestep of our cause models.

    The rationale behind this modeling decision is related to the *Relationship between timesteps and modeled rates in Vivarium* as described on the :ref:`Choosing an Appropriate Time Step page <vivarium_best_practices_time_steps>` that is exacerbated by the inclusion of the :ref:`low birth weight and short gestation risk factor <2019_risk_effect_lbwsg>` in the model. Essentially, because the LBWSG risk factor affects LRI excess mortality rates in our models during the neonatal age groups and the LBWSG relative risk values for the highest risk categories are quite large (up to 700!), the inclusion of the LBWSG risk effects on LRI causes individual-level LRI excess mortality rates to be too large to accurately approximate in our models without a very small timestep, which leads to underestimation of neonatal LRI mortality rates with a timestep on the order of 0.5 days.

    Therefore, we employ the following strategy:

      - Model the LRI SI cause model as described in this document for ages older than late neonatal only, and

      - Include LRI as an **unmodeled** cause that is **affected** by the LBWSG risk factor (see the :ref:`LBSWG risk effects page <2019_risk_effect_lbwsg>` for details). This will allow us to model LRI *CSMR* rather than *EMR* among the neonatal age groups, which is lower in magnitude and therefore less easier to approximate at larger simulation timesteps. Notably, this strategy does not allow us to model years lived with disability due to LRI among the neonatal age groups.

    This strategy allowed us to increase the simulation timestep to 4 days and still meet verification criteria.

Validation Criteria
-------------------
Baseline vivarium model results should compare to GBD artifact data with respect to age-, sex-, location-, and year-specific LRI:

- Prevalence
- Incidence rate
- Remission rate
- Cause-specifc mortality rate
- Excess mortality rate
- YLDs due to LRI
- YLLs due to LRI

.. note::

  The prior bound for the LRI remission rate is 7.3 days, which is longer than the duration of the early neonatal age group (6 days), so theoretically there should be few or no remitted cases of LRI in the early neonatal age group. However, LRI birth prevalence is expected to be greater than LRI prevalence in the early neonatal age group due to LRI's excess mortality rate.

References
----------
.. [Wikipedia-LRI-2019] Lower respiratory tact infection. From Wikipedia, the Free Encyclopedia.
   Retrieved 22 Nov 2019.
   https://en.wikipedia.org/wiki/Lower_respiratory_tract_infection

.. [CDC-LRI-2019] Respiratory Infections (*The Yellow Book*). Centers for Disease Control and Prevention, 2019. Retrieved 20 Dec 2019.
   https://wwwnc.cdc.gov/travel/yellowbook/2020/posttravel-evaluation/respiratory-infections

.. [Lancet-LRI] The Global Burden of Lower Respiratory Infections: Making Progress, but We Need to Do Better (*Volume 18*).
   The Lancet Infectious Diseases, 2018. Retrieved 20 Dec 2019.
   https://www.sciencedirect.com/science/article/pii/S1473309918304079?via%3Dihub

.. [GBD-2019-Capstone-Appendix-LRI]
  Appendix to: `GBD 2019 Diseases and Injuries Collaborators. Global burden of
  369 diseases and injuries in 204 countries and territories, 1990–2019: a 
  systematic analysis for the Global Burden of Disease Study 2019. The Lancet. 
  17 Oct 2020;396:1204-1222` 
