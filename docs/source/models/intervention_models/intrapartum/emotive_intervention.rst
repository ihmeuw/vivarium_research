.. _emotive_intervention:

============================================
E-MOTIVE for postpartum hemorrhage treatment
============================================

.. contents::
   :local:
   :depth: 1

Intervention Overview
-----------------------

E-MOTIVE is a bundle of interventions -- each denoted by a letter in the name -- to detect (E) and treat (MOTIVE) postpartum hemorrhage.

This section describes how an E-MOTIVE intervention can be implemented for the :ref:`MNCNH Portfolio model <2024_concept_model_vivarium_mncnh_portfolio>`.
See the :ref:`Postpartum hemorrhage cause model <2023_cause_postpartum_hemorrhage_mncnh>` for relevant details.

Baseline Coverage Data
++++++++++++++++++++++++

For modeling purposes, we will assume 0% baseline coverage of E-MOTIVE for all our modeled locations.
This was approximately true in 2023, and we are checking our baseline calibration against GBD 2023.
In Ethiopia [Gudu_et_al_2026]_ indicates that as of 2025 E-MOTIVE had not progressed further than a pilot study,
in Pakistan [Mubeen_et_al_2026]_ shows that as of recently (presented June 2026 at a conference) researchers are still studying strategies for implementing E-MOTIVE,
and in Nigeria the AMPLI-PPHI project was launched in 2024 to scale up E-MOTIVE [Njogu_et_al_2026]_.

.. todo::

  Coverage is expected to become substantial in at least Nigeria
  under existing scale-up plans, so we will likely want to add another scenario in the future that models our
  best guess of a future year for comparison with optimized portfolios.

Vivarium Modeling Strategy
--------------------------

This intervention requires adding an attribute to all simulants to specify if a pregnant person receives E-MOTIVE during labor or not.  We will track this
and the model will have different incidence rates for postpartum hemorrhage severities for individuals with and without E-MOTIVE.

E-MOTIVE will be limited to those giving birth in facility (not home births).
In the future, it should be limited to vaginal deliveries, but we do not yet have a model that differentiates between vaginal and cesarean deliveries, so we will apply it to all facility births for now.
To avoid overcounting E-MOTIVE impact, we adjust the effect to account for no impact on cesarean deliveries.

While E-MOTIVE trial data show a substantial decrease in the incidence of postpartum hemorrhage at the 300mL level in the intervention arm, the E-MOTIVE intervention is only supposed to trigger
before 300 mL of blood loss in very rare circumstances.
The most plausible explanation for the substantial improvement seen in the E-MOTIVE trial is training spillovers leading to better preventative care,
which we exclude here because we will not be able to cost these preventative care changes without understanding more about them.

In our model, the parameters :math:`\text{ir\_500mL\_per\_300mL\_case}` and :math:`\text{ir\_1L\_per\_500mL\_case}` on the :ref:`postpartum hemorrhage cause model <2023_cause_postpartum_hemorrhage_mncnh>` page
will be modified as follows for simulants who receive E-MOTIVE:

.. math::

  \text{cesarean\_fraction\_ifd} = \frac{\text{csection\_coverage\_prop}}{\text{IFD\_coverage\_prop}}

.. math::

  \text{ir}^\text{E-MOTIVE} = (1 - \text{cesarean\_fraction\_ifd}) \times \text{ir} \times \text{RR}^\text{E-MOTIVE} + \text{cesarean\_fraction\_ifd} \times \text{ir},

where:

-- :math:`\text{ir}` is one of :math:`\text{ir\_500mL\_per\_300mL\_case}` or :math:`\text{ir\_1L\_per\_500mL\_case}`,
- :math:`\text{RR}^\text{E-MOTIVE}` is the relative risk on the relevant incidence parameter from the table below,
- :math:`\text{cesarean\_fraction\_ifd}` is the fraction of facility births that are cesarean deliveries,
- :math:`\text{csection\_coverage\_prop}` is GBD covariate ID 2381 "proportion of live births delivered by Caesarean Section (c-section)",
- :math:`\text{IFD\_coverage\_prop}` is GBD covariate ID 51 "Percent of women giving birth in a health facility".

The :math:`\text{cesarean\_fraction\_ifd}` should be clipped to 1 if :math:`\text{csection\_coverage\_prop} \gt \text{IFD\_coverage\_prop}`,
but let's note if this is happening often.

.. list-table:: E-MOTIVE Intervention Parameters
  :widths: 15 15 15
  :header-rows: 1

  * - Parameter
    - RR for vaginal deliveries
    - Note
  * - :math:`\text{ir\_500mL\_per\_300mL\_case}`
    - 0.846 (95% CI: 0.822, 0.871)
    - This value is derived from unpublished data shared with us by the E-MOTIVE trial team, along with published data from the trial report [E-MOTIVE]_, all of which can be found at :code:`J:\\Project\\simulation_science\\mnch_grant\\MNCNH portfolio\\EMOTIVE trial data.xlsx`.
      The confidence interval was calculated using the standard error of the log RR (see spreadsheet for calculation).
      Assume a log-normal distribution of uncertainty when sampling values.
  * - :math:`\text{ir\_1L\_per\_500mL\_case}`
    - 0.741 (95% CI: 0.689, 0.797)
    - This value is derived from unpublished data shared with us by the E-MOTIVE trial team, along with published data from the trial report [E-MOTIVE]_, all of which can be found at :code:`J:\\Project\\simulation_science\\mnch_grant\\MNCNH portfolio\\EMOTIVE trial data.xlsx`.
      The confidence interval was calculated using the standard error of the log RR (see spreadsheet for calculation).
      Assume a log-normal distribution of uncertainty when sampling values.

Calibration Strategy
--------------------

We assume that the E-MOTIVE bundle was not implemented in any of the countries in the MNCNH Portfolio model in 2023 (see note above),
which means that our baseline burden estimates from GBD do not require any adjustment for baseline coverage of E-MOTIVE.

Assumptions and Limitations
---------------------------

- By not including an effect of E-MOTIVE on :math:`\text{ir\_300mL}`, we exclude a substantial portion of the benefit seen in the E-MOTIVE trial.
  We do this because we do not understand the mechanism of this effect, which makes costing it challenging.
- Our knowledge of coverage in 2023 (assumed 0%) is based only on circumstantial evidence such as recent reports from pilot studies.
- We do not model specifically who is diagnosed with postpartum hemorrhage, and therefore spread the benefits (and costs) of the intervention over all pregnant simulants in facilities covered by the E-MOTIVE intervention, rather than only those who are diagnosed with postpartum hemorrhage.
  This is due to a lack of sufficient data on the diagnosis process.
- We do not currently model specifically who gives birth via cesarean section, so we spread the effect of E-MOTIVE over all births in covered facilities,
  rather than limiting it to those who give birth vaginally.
  We plan to revisit this in a future model when C-sections are differentiated.
- Our proportional adjustment to the E-MOTIVE effect for C-sections being ineligible and therefore having no impact from E-MOTIVE
  assumes that PPH is independent of the mode of delivery, but in fact we expect that PPH is more common after C-section, and more often severe.
  This will cause us to overestimate the impact of E-MOTIVE, since we are not accounting for the eligible population being lower-risk
  than the total population. 

Validation and Verification Criteria
------------------------------------

* The incidence at the 300mL level should be the same as when this intervention is not included in the model.
* The ratio of postpartum hemorrhage incidence (at the 500mL level) among those without E-MOTIVE divided by those with E-MOTIVE should equal the relative risk parameter used in the model.

References
------------

.. [Gudu_et_al_2026] Gudu, Wondimu, et al. "Feasibility, acceptability, and effectiveness of the E-MOTIVE bundle intervention for early detection and management of postpartum hemorrhage in a low-middle-income country: implementation research." AJOG global reports 6.1 (2026): 100588.

.. [Mubeen_et_al_2026] Mubeen, Kiran, et al. "Exploring postpartum hemorrhage management: Insights for implementing E-MOTIVE Bundle in Pakistan." European Journal of Midwifery 10.Supplement 1.

.. [Njogu_et_al_2026] Njogu, Rosemary, et al. "From guesstimates to game changers: Introducing objective measurement of blood loss for timely postpartum hemorrhage detection in Nigeria, Zambia, and Kenya." International Journal of Gynecology & Obstetrics 172 (2026): S17-S25.
