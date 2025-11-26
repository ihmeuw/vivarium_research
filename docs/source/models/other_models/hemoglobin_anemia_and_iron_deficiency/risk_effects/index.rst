.. _2019_risk_effect_iron_deficiency:

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

============================
Iron Deficiency Risk Effects
============================

.. contents::
   :local:
   :depth: 2

GBD 2019 Modeling Strategy
--------------------------

Iron deficiency in the GBD risk factors is defined as **inadequate iron to meet the body's needs** and is quantified in terms of mean hemoglobin concentration at the population level from the cumulative effect of all causes that lead to iron deficiency, including dietary iron deficiency (GBD *cause* of inadequate intake of elemental iron) as well as other causes that manifest as iron deficiency (eg, maternal hemorrhage, uterine fibroids, menstrual disorders, hookworm, schistosomiasis, gastritis and duodenitis, inflammatory bowel disease, etc.). The iron deficiency risk exposure is defined as a **continuous distribution of hemoglobin concentrations in g/L** and is a risk factor for maternal disorders and has a risk-attributable cause of dietary iron deficiency.

.. image:: iron_risk_hierarchy.svg

.. list-table:: Affected Entities
   :widths: 5 5 5 5 5
   :header-rows: 1

   * - Outcome
     - Outcome type
     - Outcome ID
     - Affected measure
     - Note
   * - Maternal disorders
     - Cause
     - 366
     - YLDs/YLLs
     - Maternal disorders is not a most-detailed cause; the iron deficiency risk factor affects each of the most-detailed causes in the maternal disorders cause group equally
   * - Dietary iron deficiency
     - Cause
     - 390
     - Prevalence
     - PAF-of-1 relationship

Maternal Disorders
++++++++++++++++++

The GBD 2019 Risk-Outcome pair relationship between iron deficiency and maternal disorders relies on the association between hemoglobin concentration and maternal mortality from the literature, specifically the CHERG iron report [GBD-2019-Risk-Factors-Appendix-Hemoglobin-Risk-Effects]_.

.. note::

  According to a correspondence with Chris Murray, there is contraversy surrounding the inclusion of this risk-outcome pair in GBD because there is evidence supporting an association between iron supplementation and hemoglobin increases as well as evidence supporting an association between hemoglobin increases and maternal mortality, but no/little evidence to support an association between iron supplementation and maternal mortality directly.

Notably, the *same* relative risks for this risk-outcome pair apply to both YLDs and YLLs and are constant for each age-group and each most-detailed cause within the maternal disorders cause heirarchy. This approach makes the assumption that changes in hemoglobin concentration affect each of the maternal disorders equally and also affect morbidity and mortality equally.

  A limitation of this approach is that if changes in hemoglobin concentration affect a maternal disorder with a higher disability weight more or less than a maternal disorder with a lower disability weight, then our estimation of change in maternal disorder YLDs due to a change in hemoglobin concentration will be biased. 

.. todo::

  Include fiugre for cause hierarychy of maternal disorders

The relative risks used for this risk outcome pair are scaled to units of hemoglobin concentration in g/dL. Because the iron deficiency exposure (and mean population hemoglobin concentration) in GBD 2019 are defined in g/L, the units will need to be converted.

The PAF for this risk outcome pair is computed using the :code:`cont_paf_nocap` function shown in the code block below according to the parameter values defined at the beginning of the code block (function found at the 10/25/2019 version of the file found  `here <https://stash.ihme.washington.edu/projects/RF/repos/paf/browse/math.R#9-10,30>`_).

.. code-block::
  
  lower = 0
  upper = 5_000
  rr_scalar = 10
  dist = 'normal'
  inv_exp = 1

  # NOTE - used for iron only
  cont_paf_nocap <- function(dt, lower, upper, rr_scalar, dist, inv_exp) {
      calc_paf <- function(lower, upper, exp_mean, exp_sd, rr, tmrel, rr_scalar,
                           dist, inv_exp) {
          if (dist == "normal") {
              bound <- qnorm(0.999999, exp_mean, exp_sd)
              if (inv_exp == 0) {
                  denom <- integrate(function(x) dnorm(x, exp_mean, exp_sd) * rr^((x - tmrel + abs(x - tmrel))/2/rr_scalar),
                                     lower, bound, stop.on.error = FALSE)$value
              } else if (inv_exp == 1) {
                  denom <- integrate(function(x) dnorm(x, exp_mean, exp_sd) * rr^((tmrel - x + abs(tmrel - x))/2/rr_scalar),
                                     lower, bound, stop.on.error = FALSE)$value
              }
          } else if (dist == "lognormal") {
              mu <- log(exp_mean/sqrt(1 + (exp_sd^2/(exp_mean^2))))
              exp_sd <- sqrt(log(1 + (exp_sd^2/exp_mean^2)))
              exp_mean <- mu
              bound <- qlnorm(0.999999, exp_mean, exp_sd)
              if (inv_exp == 0) {
                  denom <- integrate(function(x) dlnorm(x, exp_mean, exp_sd) * rr^((x - tmrel + abs(x - tmrel))/2/rr_scalar),
                                     lower, bound, stop.on.error = FALSE)$value
              } else if (inv_exp == 1) {
                  denom <- integrate(function(x) dlnorm(x, exp_mean, exp_sd) * rr^((tmrel - x + abs(tmrel - x))/2/rr_scalar),
                                     lower, bound, stop.on.error = FALSE)$value
              }
          } else {
              stop("Distribution ", dist, " not currently implemented.")
          }
          return((denom-1)/denom)
      }
      dt[, paf := {
          if (inherits(try(ans <- calc_paf(lower=lower,
                                           upper=upper,
                                           exp_mean=exp_mean,
                                           exp_sd=exp_sd,
                                           rr=rr,
                                           tmrel=tmrel,
                                           rr_scalar=rr_scalar,
                                           dist=dist,
                                           inv_exp=inv_exp),silent=TRUE),"try-error"))
              as.numeric(NA)
          else
              ans
      }, by=1:nrow(dt)]
      return(dt)
  }

.. note::

  According to a correspondence with Nick Kassebaum, a normal distribution is assumed for the population hemoglobin concentration in the PAF calculation of this risk outcome pair, although a potential methodological improvement for GBD 2020 will be to assume the ensemble distribution used in the hemoglobin model instead.

The GBD 2019 Population Attributable Fractions for maternal disorders rely on the iron deficiency exposure and TMREL as estimated in the *Global TMREL exposure estimation* approach outlined in the :ref:`Iron Deficiency Risk Exposure page <2019_risk_exposure_iron_deficiency>`. However, according to a correspondence with Nick Kassebaum, the *Location-specific TMREL exposure estimation approach* is more conceptually/clinically correct, although the results are expected to be similar.

Additionally, the GBD 2019 Population Attributable Fraction calculation for this risk outcome pair uses the iron deficiency exposure mean and standard deviation values for the *general* population. However, because maternal disorders are specific to the *pregnant/lactating* population, it may be desired to use the exposure mean and standard devaition values specific to the *pregnant/lactating* population (with pregnancy adjustment factors described in the :ref:`Hemoglobin Model Documentation Page <2019_hemoglobin_model>` applied). This methodological change will result in a *greater* PAF than the two possible methods described above.

Alternative Approach
^^^^^^^^^^^^^^^^^^^^^^

Because the relative risks for maternal mortality are defined in terms of hemoglobin concentration rather than iron deficiency specifically, if the effect size of an intervention is measured in terms of hemoglobin concentration, the relative risks may be applied directly to the maternal disorders burden rather than through the typical approach of calculating the "risk-deleted" burden and then multiplying by the mean relative risk. This alternative approach will avoid confusion regarding the differing definitions of the iron deficiency risk exposure, TMREL, and PAF for maternal disorders.

Chris Murray and Theo Vos suggested that this approach be used for estimating the impact of interventions that act on hemoglobin concentration on maternal disorders.

Notably, this alternative approach was found to estimate similar (but slightly greater) intervention impact to the standard approach using the location-specific TMREL exposure estimation approach specific and exposure parameters specific to the pregnant and lactating population in the project hosted in `this repository <https://github.com/ihmeuw/sim_sci_maternal_anemia>`_.

Details on the CHERG iron report
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The CHERG iron report (available at :code:`J:\DATA\Incoming Data\MULTINATIONAL_REPORTS\CHERG_IRON_REPORT\cherg_iron.pdf`) is a meta-analysis of the association between iron deficiency and maternal mortality ratio. Since radomized trial evidence was lacking or weak, prospective observational studies provided the best data available and were included in the meta-analysis. Hemoglobin was selected as the exposure since "hardly any" studies assessed other measures of iron deficiency (p. 14). They only included studies with a hemoglobin range between 5-12 g/dL. After searching/screening, 10 articles were included in the meta-analysis, including studies from Malaysia, India (n=3), Nigeria (n=3), Ghana, and Indonesia.

Notably, the CHERG iron report cites the odds ratio associated with an increase in hemoglobin concentration of 1 g/dL to be equal to 0.713 (95% CI: 0.596, 0.852). However, the relative risks used by GBD are equal to 1.25 (95% UI: 1.09, 1.43), the inverse of which is 0.8 (95% UI: 0.70, 0.91). The GBD iron deficiency risk factor modeler for GBD 2019 reported the following:

  *The relative risk values date back to GBD 2013*. The source is the CHERG iron report& Murray-Kolb LE, Chen L, Chen P, Shapiro M, Caulfield L. CHERG Iron Report: Maternal Mortality, Child Mortality, Perinatal Mortality, Child Cognition, and Estimates of Prevalence of Anemia due to Iron Deficiency. Baltimore, USA: CHERG, 2012. *However there appears to have been some post-processing done that was not recorded*   
  *From emails between Hmwe and Nick K, it seems that in GBD 2013 the odds ratio was converted to a relative risk*. 
  *If the outcome were rare in the population you could assume the RR and OR to be roughly equal, but when it is common (as iron is thought to be) more assumptions are needed*. 
  **The exact process of this conversion is unknown and assumptions made in order to do it are unknown**.

The email thread referenced above can be found here: :code:`J:\temp\hkl1\Documentation\Offboarding\Iron\previous_documentation\iron_rr_emails.docx`.

.. note::

  In the email thread referenced above, they discuss performing the calculation of OR to RR using https://www.epigear.com/Products/EpigearXL/epigearxl.html and the equation on this page: https://www.epigear.com/index_files/or2rr.html where p=the prevalence of the risk factor and s=the outcome rate. These values were presumed to be calculated using global values for iron deficiency risk factor prevalence and maternal mortality outcome rates from GBD. 

  Notably, according ot my test calculation of this equation :download:`found in this excel file <or_to_rr_test_calculation.xlsx>`, given that pregnancy-related mortality is a rare outcome, the OR and RRs approximate each other. However, if the definitions of "p" and "s" are switched, given that iron deficiency is a prevalent risk factor, that could erroneously lead to a difference between the OR and RR on the magnitude of the difference seen between the CHERG OR and GBD RR.

Dietary Iron Deficiency
+++++++++++++++++++++++

The dietary iron deficiency cause in GBD 2019 has a population attributable fraction of 100% with the iron deficiency risk factor. This risk-outcome relationship is not described in full in this document page.

When choosing to model dietary iron deficiency, consideration should be paid to the other causes of iron deficiency (iron responsive anemias), described on the :ref:`Anemia Impairment Documentation Page <2019_anemia_impairment>`.

Vivarium Modeling Strategy
--------------------------

Maternal Disorders
++++++++++++++++++++

Primary approach
^^^^^^^^^^^^^^^^^^

This section will describe the modeling strategy for the effect of :ref:`hemoglobin exposure <2019_hemoglobin_model>` at the time of birth on :ref:`incident maternal disorders <2019_cause_maternal_disorders>`.

The risk exposure will be continuous. Given that the CHERG iron report included only studies with hemoglobin concentration ranges from 5-12 g/dL, we will assume a TMREL of 12 g/dL in the risk-outcome relationship between hemoglobin and maternal disorders. However, since the risk exposure used in the :ref:`IV iron simulation <2019_concept_model_vivarium_iv_iron_maternal_sim>` (hemoglobin) is different than the GBD definition (iron deficiency), we cannot use the GBD PAFs. Therefore, we will calculate our own PAFs.

The outcome in this risk-outcome pair relationship is the probability of experiencing an incident maternal disorder case at birth, with the simulant-specific value represented by the variable *mdir_i* and defined in the table below based on the simulant's hemoglobin exposure value.

.. list-table:: Parameter values and definitions
  :header-rows: 1

  * - Parameter
    - Definition
    - Value
    - Note
  * - tmrel
    - TMREL for hemoglobin on maternal disorders
    - 120
    - For all age/location groups
  * - hgb_i
    - Simulant hemoglobin exposure value **at the time of birth** in g/L
    - As determined by the :ref:`hemoglobin document <2019_hemoglobin_model>`
    - 
  * - rr_scalar
    - Conversion factor between hgb_i units (g/L) and RR units (g/dL)
    - 10
    - 
  * - exposure_i
    - Simulant risk exposure value
    - (tmrel - hgb_i + abs(tmrel - hgb_i))/2/rr_scalar
    - abs() is absolute value function. Exposure should be 0 if simulant hemoglobin exposure is greater than or equal to 120 g/L
  * - rr
    - Relative risk associated with one g/dL decrease in hemoglobin concentration below 12 g/dL 
    - get_draws(gbd_id_type='rei_id', gbd_id=95, gbd_round_id=6, year_id=2019, sex_id=2, source='rr', decomp_step='step4', status='best')
    - This call will return cause-specific values for each subcause within the maternal disorders cause, but the values do not vary by subcause, so we can select any singular subcause (ex: cause_id=367) to use for application to the overall maternal disorders cause (cause_id=366). The values also do not vary by age_group. Additionally, relative risks do not vary by location and therefore cannot be pulled for a specific location_id.
  * - rr_i
    - Simulant relative risk relative to TMREL
    - rr ** exposure_i
    - ** is exponentiation
  * - PAF
    - PAF for impact of hemoglobin on maternal disorders
    - 1,000 draws of PAFs for the locations used in the :ref:`IV iron simulation <2019_concept_model_vivarium_iv_iron_maternal_sim>` `can be found in a .csv file here <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/parameter_aggregation/hemoglobin_maternal_disorder_pafs/hemoglobin_and_maternal_disorders_pafs.csv>`_ 
    - 
  * - mdir
    - Maternal disorders incidence ratio: population ratio of maternal disorders per birth
    - As determined by the :ref:`maternal disorders cause model <2019_cause_maternal_disorders>`
    - Use **Ratios per birth** values, NOT the rate among all WRA from GBD. Values are age and location specific.
  * - mdir_i
    - Simulant specific probability of experiencing incident maternal disorder
    - IFELSE(mdir * (1 - PAF) * rr_i < 1, mdir * (1 - PAF) * rr_i, 1)
    - Is possible to be greater than one, so clipped at one.

**Details on the PAF calculation.**

The PAF for this continuous risk factor exposure can be calculated with the following code.

.. code-block:: python

  import scipy.stats as sp
  import scipy.integrate as integrate
  import numpy as np

  def _gamma_pdf(x, mean, sd):
    shape = (mean**2)/(sd**2)
    rate = mean / (sd**2)
    return sp.gamma(shape, scale=1/rate).pdf(x)

  def _mirrored_gumbel_pdf(x, mean, sd):
    x_max = 220 
    alpha = x_max - mean - (sd * np.euler_gamma * np.sqrt(6) / np.pi)
    scale = sd * np.sqrt(6) / np.pi
    return sp.gumbel_r(alpha, scale=scale).pdf(x_max - x)

  def calculate_paf(mean, sd):
  """NOTE: the mean and sd inputs for this function 
  should be specific to the pregnant population
  and in g/L"""

    tmrel = 120 # as defined in the table above
    rr_scalar = 10 # as defined in the table above
    lower = 0 # lower bound of integration
    upper = 300 # upper bound of integration. greater than x_max value to be safe
    gamma_weight = 0.4 # from hemoglobin distribution document
    mgumbel_weight = 1 - gamma_weight

    mean_rr = integrate.quad(lambda x: ((_mirrored_gumbel_pdf(x, mean, sd)*mgumbel_weight
                                         + _gamma_pdf(x, mean, sd)*gamma_weight)                                     
                                            * rr**((tmrel - x + abs(tmrel - x))/2/rr_scalar)),
                                                        lower, upper)[0]
    paf = (mean_rr - 1)/mean_rr

    return paf

Archived approach for reference
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The recommended approach for modeling the relationship between hemoglobin and maternal disorders is described in the `Alternative Approach`_ section in this document. Therefore, there is no need to use the PAF in order to apply the relative risks.

Instead, the relative risks should be applied to both the YLD (or incidence) and YLL (CSMR or EMR) rate for maternal disorders (or a specific modeled individual maternal disorder), such that:

.. math:: 

    rate_i = rate_\text{GBD} * 1 / e^{\text{ln(RR)} * (hgb_i - hgb_\text{GBD})/10}

.. todo::

  Explain details of this equation and update formatting as requested by Nathaniel.
 
Where, 

.. list-table:: Parameter Definitions
   :widths: 5 5 5
   :header-rows: 1

   * - Parameter
     - Definition
     - Note
   * - :math:`hgb_i`
     - Hemoglobin value for an individual pregnant simulant in g/L
     - 
   * - :math:`hgb_\text{GBD}`
     - Mean hemoglobin value among the pregnant/lactating population from GBD in g/L
     - 
   * - :math:`rate_i`
     - Probability of incident maternal disorder at birth for an individual simulant
     - 
   * - :math:`rate_\text{GBD}`
     - Population-level probability of incident maternal disorder at birth for a simulant's demographic group
     - 
   * - :math:`RR`
     - Relative risks for iron deficiency and maternal disorders
     - Should be constant for all age-groups and causes within maternal disorders group, can choose any

.. list-table:: Relative Risks
   :widths: 5 5 5
   :header-rows: 1

   * - Exposure
     - Relative Risk
     - Note
   * - Per unit deficit of hemoglobin (g/dL)
     - 1.25 (95% UI: 1.09, 1.43)
     - Note unit change (exposure is defined in g/L). Defined as relative risk of maternal disorder morbidity/mortality associated with a 1 g/dL decrease in hemoglobin concentration. Included here for reference, but should be pulled directly from GBD for use in vivarium (rei_id=95, decomp_step='step4').

Validation and Verification Criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Parameters that should be tracked for verification and validation include:

- Simulant pregnancy status (stratification preferred)
- Simulant hemoglobin concentration
- Simulant maternal disorder state

Simulants with higher hemoglobin concentrations should have lower maternal disorder rates (the specific difference in maternal disorder rates can be quanified for simulants with known hemoglobin concentrations).

If intervention causes increase in hemoglobin, the intervention scenario rate of maternal disorders should be lower than the baseline rate of maternal disorders.

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Notably, anemia is a sequela of maternal hemorrhage, which is a subcause of maternal disorders. Therefore, if a simulation model of an intervention that affects hemoglobin concentration evaluates both the impact on burden due to maternal disorders and the impact of YLDs due to anemia, it is possible that the impact on YLDs for anemia due to maternal hemorrhage will be double counted. This is likely a relative small portion of DALYs, but should be investigated and considered prior to implementation.

- We assume that the risk effect applies equally to YLDs as they do to YLLs (as does GBD). Given that the relative risks were measured according to mortality (not incidence or disability). Therefore, this modeling strategy assumes that hemoglobin decreases maternal disorder mortality entirely through a reduction of incidence with no effect on the case fatality rate without direct evidence to support this assumption. In fact, it could be possible that improvement in the risk exposure (shifting the distribution closer to the TMREL) would in fact *increase* YLDs due to an averted death due to maternal disorders that leads to living with maternal disorder disability.

- Application of the relative risks to maternal disorder YLDs assumes that the risk affects each subcause of maternal disorders equally. However, if the risk affects a subcause with low disability weights more than a cause with high disability weights, then we will be overestimating the effect of the risk on YLDs and vice versa.

Bias in the Population Attributable Fraction
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::

  This section is not applicable because this modelling strategy does not depend on PAFs.

Maternal hemorrhage incidence
+++++++++++++++++++++++++++++++

.. note::

  This risk outcome pair is not included in GBD.

Hemoglobin level will act as a risk factor for :ref:`maternal hemorrhage incidence <2019_cause_maternal_hemorrhage_incidence>`. For the implementation of this risk effect, hemoglobin risk exposure will be defined as **dichotomous** based on a threshold of 70 grams per liter (severe anemia among pregnant women).

The relative risk for this risk factor will apply to the probability of experiencing an incident case of maternal hemorrhage at birth such that:

.. math::

  ratio_\text{hgb>70} = ratio_{overall} * (1 - PAF)

  ratio_\text{hgb<=70} = ratio_{overall} * (1 - PAF) * RR

Where,

.. list-table:: Intervention coverage parameter definitions
  :header-rows: 1

  * - Parameter
    - Description  
    - Value
    - Note
  * - :math:`ratio_{overall}`
    - Overall ratio of incident maternal hemorrhage per birth
    - Defined on the :ref:`maternal hemorrhage incidence page <2019_cause_maternal_hemorrhage_incidence>`
    - 
  * - :math:`PAF`
    - PAF of maternal hemorrhage incidence attributable to hemoglobin
    - :math:`\frac{RR * p_\text{hgb<=70} + (1 - p_\text{hgb<=70}) - 1}{RR * p_\text{hgb<=70} + (1 - p_\text{hgb<=70})}`
    - 
  * - :math:`RR`
    - Relative risk of maternal hemorrhage incidence for hemoglobin < 70 g/L
    - 3.54 (95% CI: 1.2, 10.4)
    - Lognormal distribution of uncertainty, [Omotayo-et-al-2021]_
  * - :math:`p_\text{hgb<=70}`
    - Proportion of pregnant women with hemoglobin less than 70 g/L
    - Age-specific draw-level values for the locations in the :ref:`IV iron simulation <2019_concept_model_vivarium_iv_iron>` available in `the CSV file hosted here <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/parameter_aggregation/pregnant_proportion_with_hgb_below_70_age_specific.csv>`_.
    - Estimation of these values `performed in this notebook <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/parameter_aggregation/aggregated_hgb_below_70.ipynb>`_. NOTE: these values were updated on 4/22/2022 to based on the custom validation targets rather than GBD impairment prevalence.

.. note::

  This strategy ignores the impact of hemoglobin on the case fatality rate of maternal hemorrhage 

Validation and Verification Criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- :ref:`Maternal hemorrhage incidence <2019_cause_maternal_hemorrhage_incidence>` should continue to meet validation and verification criteria
- The relative risk of maternal hemorrhage incidence stratified by the hemoglobin level of 70 g/L should verify to the magnitude of the relative risk

Assumptions and limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- This modeling strategy assumes that maternal hemorrhage case fatality rate is not associated with hemoglobin level.
- We are limited in our use of a dichotomous exposure for hemoglobin. There are suspected differences in maternal hemoglobin risk by hemoglobin levels above 70, although we are limited by data quality to inform this relationship.

Birth outcomes
+++++++++++++++

.. note::

  This risk outcome pair is not included in GBD.

Hemoglobin level will act as a risk factor for stillbirth for live/stillbirth pregnancies (NOTE: not necessary to apply to abortion/miscarriage/ectopic pregnancies), as described in the :ref:`pregnancy model document <other_models_pregnancy>`. For the implementation of this risk effect, hemoglobin risk exposure will be defined as **dichotomous** based on a threshold of 70 grams per liter (severe anemia among pregnant women). Notably, it is assumed that increased risk of stillbirth will result in decreased risk of live birth and vise versa, with no impact on the risk of abortion/miscarriage or ectopic pregnancy.

The relative risk for this risk factor will apply to the probability of experiencing still birth such that:

.. math::

  \text{stillbirth probability}_\text{hgb>70} = \text{stillbirth probability}_{overall} * (1 - PAF)

  \text{stillbirth probability}_\text{hgb<=70} = \text{stillbirth probability}_{overall} * (1 - PAF) * RR

And the probabilities of experiencing the remaining birth outcomes are as follows:

.. math:: 

  \text{other probability}_\text{hgb>70} = \text{other probability}_{overall}

  \text{other probability}_\text{hgb<=70} = \text{other probability}_{overall} 

  \text{live birth probability}_\text{hgb>70} = 1 - \text{stillbirth probability}_\text{hgb>70} - \text{other probability}_{overall}

  \text{live birth probability}_\text{hgb<=70} = 1 - \text{stillbirth probability}_\text{hgb<=70} - \text{other probability}_{overall}

Where,

.. list-table:: Intervention coverage parameter definitions
  :header-rows: 1

  * - Parameter
    - Description  
    - Value
    - Note
  * - :math:`\text{stillbirth probability}_{overall}`
    - Overall probability of a pregnancy resulting in a stillbirth
    - Defined on the :ref:`pregnancy model document <other_models_pregnancy>`
    - 
  * - :math:`PAF`
    - PAF of stillbirth probability attributable to hemoglobin
    - :math:`\frac{RR * p_\text{hgb<=70} + (1 - p_\text{hgb<=70}) - 1}{RR * p_\text{hgb<=70} + (1 - p_\text{hgb<=70})}`
    - 
  * - :math:`RR`
    - Relative risk of stillbirth for hemoglobin < 70 g/L
    - 3.87 (95% CI: 1.88, 8.06)
    - Lognormal distribution of uncertainty, [Young-et-al-2019]_
  * - :math:`p_\text{hgb<=70}`
    - Proportion of pregnant women with hemoglobin less than 70 g/L
    - Age-specific draw-level values for the locations in the :ref:`IV iron simulation <2019_concept_model_vivarium_iv_iron>` available in `the CSV file hosted here <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/parameter_aggregation/pregnant_proportion_with_hgb_below_70_age_specific.csv>`_.
    - Estimation of these values `performed in this notebook <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/parameter_aggregation/aggregated_hgb_below_70.ipynb>`_.

Validation and verification criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- The rate of each birth outcome should continue to validate to input data in the baseline scenario
- Birth outcome rates stratified by the hemoglobin level of 70 g/L (severe anemia during pregnancy) should verify to the magnitude of the risk effect

Assumptions and limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- We assume there is only an association between severe anemia and stillbirth and not an association between mild or moderate anemia and stillbirth. This assumption is a result of data limitations as highlighted in [Young-et-al-2019]_

Postpartum depression
+++++++++++++++++++++++

**Research background:**

Postpartum maternal hemoglobin will affect the odds of experiencing postpartum depression in our simulation. The magnitude of this effect in our simulation will be informed by evidence from [Kang-et-al-2020]_, which found that anemia was significantly associated with an increased risk of maternal depression (pooled OR/RR = 1.53, 95% CI 1.32–1.78). Notably, the hemoglobin threshold for the definition of anemia varied by study included in this meta-analysis, but was most often equal to 11 g/dL, which is the hemoglobin level we will use as the exposure of anemia to determine postpartum depression risk in our simulation. Further, while the set of adjustment variables varied by study in this meta-analysis, all studies adjusted for multiple confounding variables except a single study for which the adjustment variables were “unclear” (p. 91). 

**Modeling strategy:** 

Postpartum hemoglobin level will act as a risk factor for :ref:`postpartum depression <2019_cause_postpartum_depression>`. For the implementation of this risk effect, hemoglobin risk exposure will be defined as **dichotomous** based on a threshold of 110 grams per liter. This risk exposure should be assessed at **two weeks postpartum** (*after* the application of intervention effects related to :ref:`postpartum IV iron <intervention_iv_iron_postpartum>`).

The relative risk for this risk factor will apply to the probability of experiencing an case of postpartum depression at birth such that:

.. math::

  ratio_\text{hgb>110} = ratio_{overall} * (1 - PAF)

  ratio_\text{hgb<=110} = ratio_{overall} * (1 - PAF) * RR

Where,

.. list-table:: Intervention coverage parameter definitions
  :header-rows: 1

  * - Parameter
    - Description  
    - Value
    - Note
  * - :math:`ratio_{overall}`
    - Overall ratio of postpartum depression per birth
    - Defined on the :ref:`postpartum depression page <2019_cause_postpartum_depression>`
    - 
  * - :math:`PAF`
    - PAF of postpartum depression attributable to hemoglobin
    - :math:`\frac{RR * p_\text{hgb<=110} + (1 - p_\text{hgb<=110}) - 1}{RR * p_\text{hgb<=110} + (1 - p_\text{hgb<=110})}`
    - 
  * - :math:`RR`
    - Relative risk of maternal hemorrhage incidence for hemoglobin < 110 g/L
    - 1.53, 95% CI 1.32, 1.78)
    - Lognormal distribution of uncertainty, [Kang-et-al-2020]_
  * - :math:`p_\text{hgb<=110}`
    - Proportion of pregnant women with hemoglobin less than 110 g/L
    - Needs to be calculated for age-specific draw-level values for modeled locations, similar to those calculated for hemoglobin levels below 70 g/L `as calculated here <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/parameter_aggregation/aggregated_hgb_below_70.ipynb>`_
    - 

Validation and verification criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- We should continue to meet validation and verification criteria for the :ref:`postpartum depression model <2019_cause_postpartum_depression>`

- The ratio of postpartum depression among those with hemoglobin less than 110 g/L relative to those with hemoglobin greater than 110 g/L should replicate the RR.

Assumptions and limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- We are limited in that the relative risk information on hemoglobin and postpartum depression is available at the dichotomous rather than continuous level.

References
----------

.. [GBD-2019-Risk-Factors-Appendix-Hemoglobin-Risk-Effects]

  Pages 178-180 in `Supplementary appendix 1 to the GBD 2019 Risk Factors Capstone <risk_factors_methods_appendix_>`_:

   **(GBD 2019 Risk Factors Capstone)** GBD 2019 Risk Factor Collaborators. :title:`Global burden of 87 risk factors in 204 countries and territories, 1990–2019: a systematic analysis for the Global Burden of Disease Study 2019`. Lancet 2020; 396: 1223-1249. DOI: https://doi.org/10.1016/S0140-6736(20)30752-2

.. _risk_factors_methods_appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30752-2/attachment/54711c7c-216e-485e-9943-8c6e25648e1e/mmc1.pdf

.. [Kang-et-al-2020]

  Kang, S. Y., Kim, H.-B., & Sunwoo, S. (2020). Association between anemia and maternal depression: A systematic review and meta-analysis. Journal of Psychiatric Research, 122, 88–96. https://doi.org/10.1016/j.jpsychires.2020.01.001

.. [Omotayo-et-al-2021]

  Omotayo, M. O., Abioye, A. I., Kuyebi, M., & Eke, A. C. (2021). Prenatal anemia and postpartum hemorrhage risk: A systematic review and meta‐analysis. Journal of Obstetrics and Gynaecology Research, 47(8), 2565–2576. https://doi.org/10.1111/jog.14834

.. [Young-et-al-2019]

  Young, M. F., Oaks, B. M., Tandon, S., Martorell, R., Dewey, K. G., & Wendt, A. S. (2019). Maternal hemoglobin concentrations across pregnancy and maternal and child health: A systematic review and meta‐analysis. Annals of the New York Academy of Sciences, 1450(1), 47–68. https://doi.org/10.1111/nyas.14093