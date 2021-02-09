.. _2017_cause_latent_tb:

===================
Latent Tuberculosis
===================

.. list-table:: Abbreviations
   :widths: 5 10
   :header-rows: 1

   * - Label
     - Definition
   * - S
     - susceptible
   * - C
     - with condition
   * - TB
     - tuberculosis
   * - LTBI
     - latent tuberculosis infection
   * - AcTB
     - active tuberculosis
   * - DS-TB
     - Drug-susceptible TB
   * - MDR-TB
     - Multidrug-resistant TB
   * - XDR-TB
     - Extensively drug-resistant TB
   * - HIV
     - human immunodeficiency virus
   * - HIV+ DS-TB
     - HIV/AIDS - Drug-susceptible TB
   * - HIV+ MDR-TB
     - HIV/AIDS - Multidrug-resistant TB
   * - HIV+ XDR-TB
     - HIV/AIDS - Extensively drug-resistant TB
   * - prev
     - prevalence
   * - i
     - incidence
   * - csmr
     - cause-specific mortality rate
   * - emr
     - excess mortality rate
   * - dw
     - disability weight
   * - {measure}_{gbd_id_type}{gbd_id}
     - e.g. prev_c954 = prevalence of LTBI

Disease Overview
----------------

TB definitions
++++++++++++++
Tuberculosis (TB) is a disease caused by the bacteria Mycobacterium 
tuberculosis. It most commonly affects the lungs, although it can affect 
other parts of the body. TB can be fatal if not recognized and treated. 
It also can spread from person to person to infect others. Anyone who 
inhales the airborne droplets that contains TB bacteria is called a "contact". 
A contact can be someone who living with the person who has active TB, 
like a family member, friend, or coworker. [UpToDate]_

What is latent TB?
++++++++++++++++++
Latent tuberculosis infection (LTBI) is defined as a state of persistent 
immune response to stimulation by Mycobacterium tuberculosis antigens with 
no evidence of clinically manifested active TB. [WHO]_

What is active TB?
++++++++++++++++++
Active tuberculosis, also known as reactivation TB. It occurs when individual's 
immune system becomes weakened and is no longer able to contain the latent 
bacteria; then the TB bacteria become "active", overwhelm the immune system and 
cause a person to become ill. [UpToDate]_ In GBD, active TB consists of 6 child 
causes: Drug-susceptible TB, Multidrug-resistant TB, Extensively drug-resistant 
TB, HIV/AIDS - Drug-susceptible TB, HIV/AIDS - Multidrug-resistant TB, and 
HIV/AIDS - Extensively drug-resistant TB.

TB progression
++++++++++++++
Active TB disease developed within 2 years is called rapid progression. Individuals 
who do not have rapid progression are classified as having slow-progressing latent 
tuberculosis infection. With latent infection, individuals experience no adverse 
health effects and will not transmit Mycobacterium tuberculosis, but they face 
an ongoing risk of developing active tuberculosis through reactivation.


GBD 2017 Modeling Strategy
--------------------------
First, GBD estimated risk-weighted (a set collection of risks defined by GBD) 
prevalence of LTBI by demographic characteristics using data from population-based 
tuberculin surveys and cohort studies reporting the risk of developing active TB 
disease as a function of induration size. Next, they divided the inputs on 
prevalence, incidence, and cause-specific mortality rate (CSMR) by the risk-weighted 
LTBI prevalence in order to model TB among at risk populatoin. GBD ran a mixed 
effects regression (with region random effects) using logit transformed 
mortality-to-incidence (MI) ratios from locations with a 4-star or above rating 
(countries with poor surveillance systems are classified as less than 4 stars) 
on causes of death with HAQI as a covariate anchoring the lower bound of the 
HAQI scale with a data point reported in the Bangalore study to predict age-sex 
specific MI ratios for all locations and years. Then the age-sex-specific 
incidence were estimated based on those predicted MI ratios. GBD used DisMod-MR 
2.1 (Bayesian meta-regression tool) to generate consistent trends in all parameters, 
and multiplied the outputs by the risk-weighted prevalence of LTBI to get 
population-level estimates of incidence and prevalence. GBD disaggregated the 
all-form TB outputs from DisMod-MR 2.1 into MDR-TB and XDR-TB by HIV status. 
To do so, they estimated the proportions of TB cases with MDR-TB for all locations 
and years, and then estimated the proportions of MDR-TB among HIV-negative and 
HIV-positive individuals based on the risk of MDR-TB associated with HIV infection 
from a meta-analysis. To split MDR-TB into MDR-TB with and without extensive drug 
resistance, GBD pooled the notification and survey data on the proportion of 
MDR-TB cases with extensive drug resistance by super-region, and applied these 
proportions to MDR-TB cases among HIV-negative and HIV-positive individuals, 
respectively. [GBD-2017-YLD-Capstone-Appendix-1]_

Cause hierarchy
+++++++++++++++

.. image:: cause_hierarchy.svg

- {Anemia} = [no_anemia, mild_anemia, moderate_anemia, severe_anemia]
- {HIV/AIDS} = [early_hiv, symptomatic_hiv, hiv_aids_with_art, aids]
The causes in the GBD at any level of hierarchy are mutually exclusive 
and collectively exhaustive. 

Restrictions
++++++++++++
The following table describes any restrictions in GBD 2017 on the effects of 
tuberculosis.

.. list-table:: GBD 2017 Cause Restrictions
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
     - age_group_id = 4
     - Post neonatal
   * - YLL age group end
     - age_group_id = 235
     - 95+ years
   * - YLD age group start
     - age_group_id = 2
     - Early neonatal
   * - YLD age group end
     - age_group_id = 235
     - 95+ years


Vivarium Modeling Strategy
--------------------------
Our TB model includes both tuberculosis and HIV/AIDS. We combine TB and HIV 
together because HIV has impacts on both progression rate of LTBI to active TB 
and active TB excess mortality rate. Note that we have excluded the active TB 
drug resistance and GBD predicted the proportion of new TB cases with MDR-TB or 
XDR-TB by ST-GPR. In this joint model, each simulant occupies a state at each 
discrete time step. It is convenient to distinguish two sub-state types: a healthy 
(susceptible) state and a disease (with condition) state. Many simulants began 
the simulation in a susceptible state with, for example, no TB and remain in the 
susceptible state until they contract LTBI, progress to active TB, or die due to 
TB or other causes. Each state is mutually exclusive (e.g. a simulant can be 
susceptible or be a prevalent case of TB, but not both). However, a simulant may 
have TB and still be susceptible to HIV or vice versa. Prevalence is the measure 
that describes the proportion of individuals with disease in the total population 
during the given simulation time step. The prevalence of a disease state determines 
what proportion of the population will occupy that disease state during each time 
step. Each disease state has transition attributes defining the simulant transitions 
into and out of the state. We calculate transition probabilities from rates 
estimated in the GBD study and external data sources as required. In addition, 
it is worth noting that this model for CSU contracted project is not a dynamic 
transmission model. We will not model infection passing between specific individuals 
in the simulation, although the model is individual-based. In other words, individuals 
in the simulation will, for example, move from uninfected to infected states, but 
the model will not specify that individual X infected individual Y. As described 
above, the model will be calibrated in aggregated level, the outputs from 
simulation baseline scenario should match the population level rates estimated 
in the GBD.

Cause model diagram
+++++++++++++++++++



State and transition data tables
++++++++++++++++++++++++++++++++



Validation criteria
+++++++++++++++++++



References
----------
.. [UpToDate] Tuberculosis (Beyond the Basics).
   Retrieved Dec 23, 2019.
   https://www.uptodate.com/contents/tuberculosis-beyond-the-basics

.. [WHO] Latent tuberculosis infection (LTBI).
   Retrieved Dec 23, 2019.
   https://www.who.int/tb/areas-of-work/preventive-care/ltbi_faqs/en/

.. [GBD-2017-YLD-Capstone-Appendix-1] Supplementary Appendix 1:
   James SL, Abate D, Abate KH, et al. Global, regional, and national
   incidence, prevalence, and years lived with disability for 354 diseases and injuries for 195 countries and territories, 1990–2017: a systematic analysis
   for the Global Burden of Disease Study 2017. The Lancet 2018; 392: 1789–858.
   (pp. 65-74)
   https://www.thelancet.com/cms/10.1016/S0140-6736(18)32279-7/attachment/6db5ab28-cdf3-4009-b10f-b87f9bbdf8a9/mmc1.pdf

.. [Global-TB-Burden-2018] Methods used by WHO to estimate the global burden of TB disease
   https://www.who.int/tb/publications/global_report/gtbr2018_online_technical_appendix_global_disease_burden_estimation.pdf
