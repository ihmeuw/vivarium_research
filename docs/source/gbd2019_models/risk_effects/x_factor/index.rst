.. _2019_risk_effect_x_factor:

..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1
  ---------------

  Section Level 2
  +++++++++++++++

  Section Level 3
  ^^^^^^^^^^^^^^^

  Section Level 4
  ~~~~~~~~~~~~~~~

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

===========================
Wasting X-Factor
===========================

.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

The x-factor is a risk exposure that tries to capture the differential risk experienced by some children who may experience more relapses of wasting. We believe this is an important component of wasting epidemiology to capture [see Brain Trust notes with Chris Murray for discussion of adding this component to the model]. There are many risk factors that have been described in the literature that pre-dispose children to wasting including maternal education, household food insecurity, family size, water and sanitation. 

Differential relapse rate literature overview
+++++++++++++++++++++++++++++++++++++++++++++++

[Stobaugh-et-al-2019]_ conducted a systematic literature review on relapse of SAM following treatment and found that "the proportion of children who relapsed after SAM treatment varied greatly from 0% to 37% across varying lengths of time following discharge" (p. 1). Generally, relapse was defined as presenting with SAM at least once following SAM treatment, but some studies defined relapse as inclusive of MAM as well. Additionally, no standard length of follow-up was used and the period ranged from 1 week to 18 months. [Stobaugh-et-al-2019]_ reported that relapse tended to occur more frequently in the first 6 months following discharge.

According to [Stobaugh-et-al-2019]_, an unpublished longitudinal study in Ethiopia (Tsineal et al. 2015/Jimma University) reported the probability of experiencing a new episode of SAM or MAM was 26% for 6 months and 7.5% for 12 months (we are interpreting the latter probability as the probability of a new episode in 6-12 months). Tsineal et al. 2015 also reportedly found a relapse rate of 15% for SAM and 44% for MAM over 12 months. Further, this study was the only one identified by [Stobaugh-et-al-2019]_ that included a true control group of non-malnourished counterparts: Tsineal et al. 2015 reportedly followed children after SAM treatement as well as non-wasted matched community controls for one year. They reportedly found that 15% of the SAM-treated group developd SAM in the year of follow-up while only 1.2% of control children did in the same period for respective incidence rates of 1.27 and 0.09 per 100 person months.

Since the time of this review, two additional studies were identified that compared wasting episode relapse rates betwen children who were recently treated for acute malnutrition and children who were not. 

[Abitew-et-al-2020]_ conducted a cross-sectional study in South Gondar
Zone, Amhara Region, Ethiopia of children discharged from community management of acute malnutrition (CMAM) programs and aged-matched children who were never treated for acute malnutrition. The study found that 34.2% of children discharged from CMAM programs were wasted compared to 26.7% of the control group. More specifically, 22.3% and 12.0% of the children discharged from CMAM were classified as having MAM and SAM, respectively, compared to 17.2% and 9.5% of the control population. Notably, the difference in wasting burden between these study populations found by [Abitew-et-al-2020]_ is of lower magnitude than other data sources that investigated the same measure. This may be because of the cross-sectional rather than longitudinal study design which measures prevalence rather than cumulative incidence. Further, the inclusion criteria for control subjects was based on whether they had previously received CMAM treatment without consideration of CMAM treatment need. Additionally, the prevalence of SAM in this population is quite high, indicating that there is a high background risk of acute malnutrition in the population that may not be generalizable to other populations with lower SAM prevalence.

[Adegok-et-al-2020]_ performed a prospective matched cohort study of SAM recurrance in Northern Nigeria. The study recruited children discharged from OTP treatment and matched community controls and followed them for 6 months. At the end of follow-up 24% of the OTP discharged children relapsed to SAM and 0.6% of community controls developed SAM.

.. note::

   Given the limitations associated with the cross-sectional nature of the [Abitew-et-al-2020]_ study and the study location of Nigeria rather than Ethiopia for the [Adegok-et-al-2020]_ study, we decided to use the Jimma University study reported in [Stobaugh-et-al-2019]_ as the main data source to inform differential relapse rates by x-factor exposure status in the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>`.

Additional literature on relapse rates
+++++++++++++++++++++++++++++++++++++++

[Lambebo-et-al-2021]_ conducted a retrospective records review of children under five years of age who were admitted and discharged for SAM in 20 selected health posts in Hadiya zone, SNNPR, Ethiopia from 2014/2015 to 2019/2020. Notably, treatment defaulters and non-responders were not excluded from the cohort. Additionally, the cohort was open and children were not followed for relapse after the age of 60 months. They reported a relapse/readmission rate of 9.6% (95% CI: 7.7, 11.7) within the five year study period. 

[Abitew-et-al-2020b]_ conducted a study of children 6-59 months of age who were discharged from community-based management of acute malnutrition (CMAM) for MAM and uncomplicated SAM in the South Gonda Zone of Amhara region, Ethiopia. The study reported that after an average of 5.2 months of recovery, 445 of 1,273 children (35%) had relapsed. [Abitew-et-al-2020b]_ also found higher odds of relapse among children who were male, received pre-lacteal feeding, lived in food insecure households, and were not given vitamin A supplements. 

[Chang-et-al-2013]_ found that 63% of children successfully treated for MAM in Malawi remained well nourished during 12 months of follow-up (7% were lost to follow-up and 10% progressed to SAM). [Stobaugh-et-al-2018]_ found that 58% of children sucessfully treated for MAM in Malawi reamined well nourished during 12 months of follow-up. [Trehan-et-al-2015]_ found that 71% and 63% of children treated for MAM (defined as 12 weeks of treatment and until WHZ>-2, respectively) in Malawi did not relapse during 12 months of follow-up.

Vivarium Modeling Strategy
--------------------------

Wasting Incidence Rates
++++++++++++++++++++++++

Given the evidence from the Tsineal et al. 2015/Jimma University study reported in [Stobaugh-et-al-2019]_ that children who have recently recovered from SAM experience future episodes of SAM at ~10 times the rate of children who were at a healthy weight without a recent SAM episode, we selected the following risk effects values. We make the assumption that applied in a compound manner equally from the transition from mild child wasting to MAM (i2) and from MAM to SAM (i1).

.. list-table:: X-factor risk effects
   :header-rows: 1

   * - Affected parameter
     - Exposure category
     - Risk effect type
     - Risk effect
     - Note
   * - i1
     - Exposed (cat1)
     - Relative risk (RR)
     - :math:`\sqrt{10}`
     - 
   * - i1
     - Unexposed (cat2)
     - Relative risk (RR)
     - :math:`1`
     - 
   * - i2
     - Exposed (cat1)
     - Relative risk (RR)
     - :math:`\sqrt{10}`
     - 
   * - i2
     - Unexposed (cat2)
     - Relative risk (RR)
     - :math:`1`
     - 
   * - i3
     - Exposed (cat1)
     - Relative risk (RR)
     - :math:`1`
     - 
   * - i3
     - Unexposed (cat2)
     - Relative risk (RR)
     - :math:`1`
     - 

.. todo::
   
   Incorporate uncertainty about x-factor risk effect values?

For each incidence rate :math:`i(n)` in the dynamic wasting exposure model (i1, i2, and i3), the simulant-specific rate should be determined as follows:

.. math::

   i(n)_i = i(n) \times (1 - PAF_\text{i(n)}) \times RR_\text{i(n),i}

.. math::

   PAF_\text{i(n)} = \frac{RR_\text{i(n),cat1} * p_\text{cat1|source wasting state} + RR_\text{i(n),cat2} * (1 - p_\text{cat1|source wasting state}) - 1}{RR_\text{i(n),cat1} * p_\text{cat1|source wasting state} + RR_\text{i(n),cat2} * (1 - p_\text{cat1|source wasting state})}

Where:

- :math:`p_\text{cat1|source wasting state}` is the :ref:`x-factor risk exposure <2019_risk_exposure_x_factor>` among the source state for the relevant transition. Values shown in the table below:

.. list-table:: X-factor risk effects
   :header-rows: 1

   * - Transition
     - Source wasting state
     - :math:`p_\text{cat1}` value
     - Note
   * - i1
     - moderate acute malnutrition
     - 0.78
     - 
   * - i2
     - mild child wasting
     - 0.54
     - 
   * - i3
     - susceptible to child wasting
     - 0.45
     - Since the relative risk for this transition is equal to one, the impact of this value should be inconsequential 

.. note::

   This custom PAF calculation strategy was chosen due to the `underestimation of MAM and overestimation of SAM child wasting exposure states in model version 4.5.5 of the acute malnutrition simulation <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/model_4.5.5_exposure.pdf>`_. This appeared to be a result of an overestimation of the transition rate between MAM to SAM (i1) as a result of the higher x-factor exposure present in the MAM wasting state than the general population, `as shown in this notebook <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/4.5.5_v_4.5.6_wasting_transition_rates.ipynb>`_.

   The values in the table below are the x-factor exposures specific to the source wasting state for each wasting transition, as calculated among ages 6 months to 5 years after the first "burn-in" year of the simulation run.

.. note::

   Additional factors will affect wasting incidence rates i1, i2, and i3 in the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>`, including diarrheal diseases and SQ-LNS. 

Validation and Verification Criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- The ratio between wasting incidence rates among those exposed and unexposed to the x-factor should match the given x-factor effect size
- There should be no difference in wasting state remission rates by x-factor exposure status
- Wasting exposure should be greater among those exposed to the x-factor than those unexposed
- Wasting exposure should continue to validate to GBD

.. todo::

   Link interactive sim validation notebooks and describe targets

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- We assume wasting recovery rates are not affected by the x-factor
- In the absence of more detailed evidence, we assume that the increased risk of SAM incidence observed in the Jimma university study attributable to the "x-factor" risk is applied in a compound manner equally from the transition from mild child wasting to MAM (i2) and from MAM to SAM (i1).
- We are limited in that few studies have evaluated the epidemiology of SAM relapse and even fewer with a true control population that we are using to inform this risk factor in our simulation.
- We do not model a direct causal effect of an episode of wasting on future episodes of wasting

References
----------

.. [Abitew-et-al-2020]
   Abitew DB, Worku A, Mulugeta A, Bazzano AN. Rural children remain more at risk of acute malnutrition following exit from community based management of acute malnutrition program in South Gondar Zone, Amhara Region, Ethiopia: a comparative cross-sectional study. PeerJ. 2020 Feb 7;8:e8419. doi: 10.7717/peerj.8419. PMID: 32071802; PMCID: PMC7008819. 
   `Abitew et al 2020 available here <https://pubmed.ncbi.nlm.nih.gov/32071802/>`_

.. [Abitew-et-al-2020b]
   Abitew DB, Yalew AW, Bezabih AM, Bazzano AN. Predictors of relapse of acute malnutrition following exit from community-based management program in Amhara region, Northwest Ethiopia: An unmatched case-control study. PLoS One. 2020 Apr 22;15(4):e0231524. doi: 10.1371/journal.pone.0231524. PMID: 32320426; PMCID: PMC7176369. 
   `Abitew et al 2020b available here <https://pubmed.ncbi.nlm.nih.gov/32320426/>`_

.. [Adegok-et-al-2020]
   Adegoke O, Arif S, Bahwere P, Harb J, Hug J, Jasper P, Mudzongo P, Nanama S, Olisenekwu G, Visram A. Incidence of severe acute malnutrition after treatment: A prospective matched cohort study in Sokoto, Nigeria. Matern Child Nutr. 2021 Jan;17(1):e13070. doi: 10.1111/mcn.13070. Epub 2020 Aug 5. PMID: 32761792; PMCID: PMC7729648.
   `Adegok et al 2020 available here <https://pubmed.ncbi.nlm.nih.gov/32761792/>`_

.. [Chang-et-al-2013]
   Chang CY, Trehan I, Wang RJ, Thakwalakwa C, Maleta K, Deitchler M, Manary MJ. Children successfully treated for moderate acute malnutrition remain at risk for malnutrition and death in the subsequent year after recovery. J Nutr. 2013 Feb;143(2):215-20. doi: 10.3945/jn.112.168047. Epub 2012 Dec 19. PMID: 23256140; PMCID: PMC3735907.
   `Chang et al 2013 available here <https://pubmed.ncbi.nlm.nih.gov/23256140/>`_

.. [Lambebo-et-al-2021]
   Lambebo A, Temiru D, Belachew T. Frequency of relapse for severe acute malnutrition and associated factors among under five children admitted to health facilities in Hadiya Zone, South Ethiopia. PLoS One. 2021 Mar 25;16(3):e0249232. doi: 10.1371/journal.pone.0249232. PMID: 33765081; PMCID: PMC7993841.
   `Lambebo et al 2021 available here <https://pubmed.ncbi.nlm.nih.gov/33765081/>`_

.. [Stobaugh-et-al-2018]
   Stobaugh HC, Rogers BL, Webb P, Rosenberg IH, Thakwalakwa C, Maleta KM, Trehan I, Manary MJ. Household-level factors associated with relapse following discharge from treatment for moderate acute malnutrition. Br J Nutr. 2018 May;119(9):1039-1046. doi: 10.1017/S0007114518000363. Epub 2018 Mar 5. PMID: 29502542.
   `Stobaugh et al 2018 available here <https://pubmed.ncbi.nlm.nih.gov/29502542/>`_

.. [Stobaugh-et-al-2019]
   Stobaugh HC, Mayberry A, McGrath M, Bahwere P, Zagre NM, Manary MJ, Black R, Lelijveld N. Relapse after severe acute malnutrition: A systematic literature review and secondary data analysis. Matern Child Nutr. 2019 Apr;15(2):e12702. doi: 10.1111/mcn.12702. Epub 2018 Oct 18. PMID: 30246929; PMCID: PMC6587999.
   `Stobaugh et al 2019 available here <https://pubmed.ncbi.nlm.nih.gov/30246929/>`_
   
.. [Trehan-et-al-2015]
   Trehan I, Banerjee S, Murray E, Ryan KN, Thakwalakwa C, Maleta KM, Manary MJ. Extending supplementary feeding for children younger than 5 years with moderate acute malnutrition leads to lower relapse rates. J Pediatr Gastroenterol Nutr. 2015 Apr;60(4):544-9. doi: 10.1097/MPG.0000000000000639. PMID: 25419681; PMCID: PMC4380557.
   `Trehan et al 2015 available here <https://pubmed.ncbi.nlm.nih.gov/25419681/>`_
