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

The CHERG iron report (available at :code:`J:\DATA\Incoming Data\MULTINATIONAL_REPORTS\CHERG_IRON_REPORT\cherg_iron.pdf`) is a meta-analysis of the association between iron deficiency and maternal mortality ratio. Since radomized trial evidence was lacking or weak, prospective observational studies provided the best data available and were included in the meta-analysis. Hemoglobin was selected as the exposure since "hardly any" studies assessed other measures of iron deficiency (p. 14). They only included studies with a hemoglobin range between 5-12 g/dL. After searching/screening, 10 articles were included in the meta-analysis, including studies from Malaysia, Nigeria, India (n=3), Nigeria (n=3), Ghana, and Indonesia.

Dietary Iron Deficiency
+++++++++++++++++++++++

The dietary iron deficiency cause in GBD 2019 has a population attributable fraction of 100% with the iron deficiency risk factor. This risk-outcome relationship is not described in full in this document page.

When choosing to model dietary iron deficiency, consideration should be paid to the other causes of iron deficiency (iron responsive anemias), described on the :ref:`Anemia Impairment Documentation Page <2019_anemia_impairment>`.

Vivarium Modeling Strategy
--------------------------

Maternal Disorders
++++++++++++++++++++

.. todo::

  Update this strategy so that the TMREL is equal to a hemoglobin level of 120 g/L or greater. This will require a custom PAF calculation -- we should be able to use the PAF calculation code above and update it to an ensemble distribution. 

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

Hemoglobin level will act as a risk factor for stillbirth, as described in the :ref:`pregnancy model document <other_models_pregnancy>`. For the implementation of this risk effect, hemoglobin risk exposure will be defined as **dichotomous** based on a threshold of 70 grams per liter (severe anemia among pregnant women). Notably, it is assumed that increased risk of stillbirth will result in decreased risk of live birth and vise versa, with no impact on the risk of abortion/miscarriage or ectopic pregnancy.

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

.. todo::

  Complete this section

Validation and verification criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Assumptions and limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

References
----------

.. [GBD-2019-Risk-Factors-Appendix-Hemoglobin-Risk-Effects]

   Pages 178-180 in `Supplementary appendix 1 to the GBD 2019 Risk Factors Capstone <risk_factors_methods_appendix_>`_:

     **(GBD 2019 Risk Factors Capstone)** GBD 2019 Risk Factor Collaborators. :title:`Global burden of 87 risk factors in 204 countries and territories, 1990–2019: a systematic analysis for the Global Burden of Disease Study 2019`. Lancet 2020; 396: 1223-1249. DOI:
     https://doi.org/10.1016/S0140-6736(20)30752-2

.. _risk_factors_methods_appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30752-2/attachment/54711c7c-216e-485e-9943-8c6e25648e1e/mmc1.pdf


.. [Omotayo-et-al-2021]

    Omotayo, M. O., Abioye, A. I., Kuyebi, M., & Eke, A. C. (2021). Prenatal anemia and postpartum hemorrhage risk: A systematic review and meta‐analysis. Journal of Obstetrics and Gynaecology Research, 47(8), 2565–2576. https://doi.org/10.1111/jog.14834

.. [Young-et-al-2019]

  Young, M. F., Oaks, B. M., Tandon, S., Martorell, R., Dewey, K. G., & Wendt, A. S. (2019). Maternal hemoglobin concentrations across pregnancy and maternal and child health: A systematic review and meta‐analysis. Annals of the New York Academy of Sciences, 1450(1), 47–68. https://doi.org/10.1111/nyas.14093