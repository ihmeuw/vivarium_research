.. _2021_cause_preterm_birth_mncnh:

======================
Neonatal Preterm Birth
======================

Disease Overview
----------------

Preterm birth is defined as live birth before 37 completed weeks of gestation. It is often subdivided further into three categories of preterm birth, based on gestational age: extremely preterm (<28 weeks), very preterm (28 to <32 weeks), and moderate to late preterm (32 to <37 weeks).

Respiratory distress syndrome (RDS) is a common complication of preterm birth, particularly in infants born before 28 weeks of gestation. It is caused by the insufficient production of surfactant, a substance that helps keep the lungs inflated. RDS can lead to severe breathing difficulties and requires immediate medical intervention, often including respiratory support and surfactant replacement therapy.

GBD 2021 Modeling Strategy
--------------------------

In GBD, "Preterm" is used to describe any newborn baby born at less than 37 completed weeks of gestation, while "short gestation" refers to all gestational ages below the theoretical minimal risk exposure level (TMREL) for the LBWSG risk. 

We focus on only the mortality due to this cause, which is estimated together with all other cause-specific mortality through the CODEm process.

The nonfatal part is described here:
`GBD 2021 Non-fatal Neonatal Infections Modeling Strategy <https://www.healthdata.org/sites/default/files/methods_appendices/2021/Neonatal_nonfatal_GBD2020_final_RS_updated_Jul_11_AC.pdf>`_ (pages 1-12).

Cause Hierarchy
+++++++++++++++


- All causes (c_294) [level 0]

  - Communicable, maternal, neonatal, and nutritional diseases (c_295)

    - Maternal and neonatal disorders (c_962)

      - Neonatal disorders (c_380)
          
        - **Neonatal preterm birth (c_381) [level 4]**


Restrictions
++++++++++++

The following table describes restrictions on the effects of this cause
(such as being only fatal), as well as restrictions on the age
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
     - True
     -
   * - YLD only
     - False
     -
   * - YLL age group start
     - Early neonatal
     - GBD age group id 2
   * - YLL age group end
     - Post neonatal
     - GBD age group id 4

Vivarium Modeling Strategy
--------------------------

Preterm birth is a PAF-of-one cause, meaning it is 100% attributable to the :ref:`Low Birth Weight and Short Gestation (LBWSG) <2019_risk_effect_lbwsg>` risk factor.
Logically, the preterm birth cause should only affect neonates that were born preterm (gestational age of less than 37 weeks).
We enforce this constraint in our simulation.

Key interventions in the MNCNH portfolio are expected to be relevant to preterm birth **with RDS** specifically and therefore we further need to decompose preterm birth burden into "with RDS" and "without RDS" components.

Assumptions and Limitations
+++++++++++++++++++++++++++

Focusing solely on YLLs will likely underestimate the total burden of this cause and, consequently, the DALYs averted by interventions that reduce prevalence and mortality due to it. However, we anticipate this underestimation to be less than 10%.

GBD does not provide an estimate of the proportion of preterm births that are associated with RDS. We will need to make an assumption about this proportion based on data we obtain from another source.

We might need to include the prevalence of Preterm Birth Complications, in order to quantify the cost and impact of corticosteroids intervention, which prevents RDS incidence (as opposed to the CPAP intervention, which reduces on mortality among neonates who have RDS).

Cause Model Decision Graph
++++++++++++++++++++++++++

We are not modeling Preterm Birth dynamically as a finite state machine, but we can draw an directed 
graph to represent the collapsed decision tree  
representing this cause. Unlike a state machine representation, the values on the 
transition arrows represent decision probabilities rather than rates per 
unit time.
Note that these probabilities are not used directly in the model and are included here only for clarity.  If they end up being more confusing than enlightening, we should delete them.


.. graphviz::

    digraph NN_preterm_decisions {
        rankdir = LR;
        lb [label="live birth", style=dashed]
        nn_alive [label="neonate did not\ndie of preterm"]
        nn_dead_RDS [label="neonate died\nof preterm with RDS"]
        nn_dead_no_RDS [label="neonate died\nof preterm without RDS"]

        lb -> nn_alive  [label = "1 - csmrisk_w - csmrisk_wo"]
        lb -> nn_dead_RDS [label = "csmrisk_w"]
        lb -> nn_dead_no_RDS [label = "csmrisk_wo"]
    }

.. list-table:: State Definitions
    :widths: 7 20
    :header-rows: 1

    * - State
      - Definition
    * - live birth
      - The parent simulant has given birth to a live child simulant (which
        is determined in the
        intrapartum step of the :ref:`pregnancy model
        <other_models_pregnancy_closed_cohort_mncnh>`)
    * - neonate did not die of preterm
      - The child simulant did not die of preterm birth complications during the first 28 days of life
    * - neonate died with RDS
      - The child simulant died due to preterm birth with respiratory distress syndrome within the first 28 days of life
    * - neonate died without RDS
      - The child simulant died due to preterm birth **without** respiratory distress syndrome within the first 28 days of life

.. _2021_cause_preterm_birth_mncnh_transition_probability_definitions:

.. list-table:: Transition Probability Definitions
    :widths: 1 5 20
    :header-rows: 1

    * - Symbol
      - Name
      - Definition
    * - csmrisk_w
      - Preterm with RDS Mortality Risk
      - The probability that a simulant who was born alive dies from preterm with RDS during the neonatal period
    * - csmrisk_wo
      - Preterm without RDS Mortality Risk
      - The probability that a simulant who was born alive dies from preterm without RDS during the neonatal period


Modeling Strategy
+++++++++++++++++

The Preterm Birth submodel needs to produce cause-specific mortality risks (CSMRisks) for preterm birth complications, with and without respiratory distress syndrome (RDS), for each simulant.

The calculation must take into account the "structural zeros" representing no mortality risk for simulants with a gestational age of 37 or more weeks.

The way these CSMRisks are used is the same for all subcauses, and therefore is included in the :ref:`Overall Neonatal Disorders Model <2021_cause_neonatal_disorders_mncnh>` page.
This page describes the CSMRisks modified by birth weight and gestational age,
but not modified by interventions, :math:`\text{CSMRisk}_{i,\text{preterm with RDS}}^0` and :math:`\text{CSMRisk}_{i,\text{preterm without RDS}}^0`.
The other values used in the overall neonatal disorders model are
:math:`\text{CSMRisk}_{i,\text{preterm with RDS}}` and :math:`\text{CSMRisk}_{i,\text{preterm without RDS}}`, which are the values after direct modifications by interventions.
These modifications are described on the relevant intervention pages.

For each preterm subcause, the formula is:

.. _preterm_csmrisk_equation:

.. math::
    \begin{aligned}
    \text{CSMRisk}_{i,k}^0
    &=
    \begin{cases}
    \text{CSMRisk}_{\text{age}_i,\text{sex}_i} / p_{\text{preterm},\text{age}_i} \cdot f_k \cdot \text{RR}_{\text{BW}_i,\text{GA}_i} \cdot Z, & \text{if GA} < 37; \\
    0, & \text{if GA} \geq 37;
    \end{cases}
    \end{aligned}

where :math:`k` is the subcause of interest (preterm birth with or without RDS),
:math:`\text{CSMRisk}_{\text{age},\text{sex}}` is the population-level cause-specific mortality risk for preterm birth complications for a given age group and sex,
:math:`\text{age}_i` and :math:`\text{sex}_i` are the age group and sex of simulant :math:`i`,
:math:`p_{\text{preterm},\text{age}}` is the prevalence of preterm (gestational age < 37 weeks) at the *beginning* of age group :math:`\text{age}`,
:math:`f_k` is the fraction of deaths due to the preterm birth cause that are due to subcause :math:`k` (with or without RDS), :math:`\text{RR}_{\text{BW},\text{GA}}` is the GBD relative risk on mortality for a birth weight of :math:`\text{BW}` and gestational age of :math:`\text{GA}`,
:math:`\text{BW}_i` and :math:`\text{GA}_i` are the birth weight and gestational age of simulant :math:`i` after intervention effects have been applied,
and :math:`Z` is a normalizing constant selected so that :math:`E[\text{RR}_{\text{BW,GA}} | \text{GA}<37] \cdot Z = 1`.

.. note::

  **Notes on how to calculate the normalizing constant** :math:`Z` **for the preterm birth cause of death described above.**

  As described on the :ref:`LBWSG risk effects page <2019_risk_effect_lbwsg>`, we utilize a custom PAF calculation for the interpolated LBWSG relative risks specific to a given gestational age and birth weight. This custom calculation has been performed in a pipeline like the one `linked here for the nutrition optimization simulation <https://github.com/ihmeuw/vivarium_gates_nutrition_optimization_child/blob/main/src/vivarium_gates_nutrition_optimization_child/data/lbwsg_paf.yaml>`_. A modification to this pipeline has been made for the MNCNH simulation to account for the modeling strategy of using mortality risks rather than mortality rates by using the LBWSG exposure distribution at 8 days of life to calculate the LBWSG PAF for the late neonatal age group. This strategy is described on the :ref:`MNCNH neonatal all cause mortality document <2021_cause_neonatal_disorders_mncnh>` and the same strategy should be used here as well.

  We will utilize this same LBWSG PAF calculation pipeline to calculate the normalizing constant :math:`Z` for the preterm birth cause of death. To do this, we will follow the same LBWSG PAF calculation steps, but perform it only among LBWSG exposures that have gestational ages less than 37 weeks. This pipeline then outputs a "PAF" value which is only *among the preterm population*, calculated as :math:`\frac{E[\text{RR}_{\text{BW,GA}} | \text{GA}<37] - 1}{E[\text{RR}_{\text{BW,GA}} | \text{GA}<37]}`, which is equal to :math:`Z + 1`. Therefore, we can use (1 - "PAF") as the :math:`Z` term for the preterm birth cause of death (with "PAF" equal to the value output from the PAF calculation pipeline).

  We will use a population size of :math:`41^2 \times 58 \times 2 =` **194,996** for this calculation. This number was selected in order to satisfy the following criteria.
  
  - The total population size of the PAF calculation pipeline must be divisible by the product of the number of LBWSG exposure categories (58) and the number of sexes (2) used in the PAF calculation

  - The population size per LBWSG exposure category per sex is required to be a perfect square to be compatible with our strategy of initializing individual exposures on a grid within each LBWSG exposure category
  
  - :math:`23^2` (529) was determined to be an adequate population size per LBWSG exposure category per sex in a `previous analysis <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/LBWSG%20PAF%20population%20size%20check.ipynb>`_ of the PAF using all 58 LBWSG exposure categories
  
  - We would like to increase the population size per category relative to the previous analysis by a factor of at least 58/38, as we will be performing this calculation on the 38 preterm categories out of the 58 total categories. We've actually increased it by a factor of :math:`41^2 \div 23^2 \approx 3`, so substantially more.

We define the ENN CSMRisk as:

.. math::

  \text{CSMRisk}_{\text{ENN},\text{sex}} = \frac{\text{enn\_death\_count}}{\text{live\_birth\_count}},

where the :math:`\text{enn\_death\_count}` and :math:`\text{live\_birth\_count}` are
quantities pulled from GBD, as detailed in the table below.

The LNN CSMRisk is:

.. math::

  \text{CSMRisk}_{\text{LNN},\text{sex}} = \frac{\text{lnn\_death\_count}}{\text{live\_birth\_count} - \text{enn\_all\_cause\_death\_count}},

where, again, all quantities are pulled from GBD as detailed in the table below.

As mentioned on the :ref:`Overall Neonatal Disorders Model <2021_cause_neonatal_disorders_mncnh>`
page, the GBD relative risks of LBWSG (which are the
same across all affected causes)
are informed by all-cause mortality data without adjustment for confounding.
The GBD assumes they represent the *causal* effect of LBWSG on each affected cause, and we do the same here for the preterm birth subcauses,
except that we add the additional constraint that the risk must be 0 for neonates not
born preterm.

.. note::  
  If we get more specific data about RDS or non-RDS preterm death rates stratified by gestational age, we may want to use different relative risks to reflect that.
  However, at the moment we don't even have relative risks that are *cause*-specific, much less *subcause*-specific.

.. note::
  There is no guarantee from GBD that after moving all of the preterm CSMRisk into the preterm categories,
  it will not exceed ACMRisk in those categories.
  In practice this does not occur with GBD 2023 data in our modeled locations.

  Our shifting of preterm mortality risk furthermore increases the possibility that *total* CSMRisk across
  all causes may exceed ACMRisk for preterm categories (in the current MNCNH model, since preterm birth
  subcauses are the *only* modeled subcauses that do not use the GBD relative risks unmodified, it is *only*
  due to these subcauses that this is possible at all).
  In practice, we find that this does happen, but quite rarely, in our modeled locations.
  In these rare cases, we scale down the CSMRisks so that their sum is equal to ACMRisk,
  as described on the overall neonatal disorders cause model page.

:math:`p_{\text{preterm},\text{age}}`, as mentioned above, represents the prevalence/exposure
of preterm (gestational age < 37 weeks) at the *beginning* of the age group.
For ENN, the beginning of the age group is birth, so the prevalence of preterm
at birth is a sum of the birth prevalence for all LBWSG categories with gestational
age less than 37 weeks:

.. math::

  p_{\text{preterm},\text{ENN}} = \sum_{\{\text{cat}: \text{GA}<37\}} \text{lbwsg\_birth\_prevalence}_\text{cat},

where :math:`\text{lbwsg\_birth\_prevalence}` can be pulled from GBD with minor transformations,
as detailed in the table below.

For LNN, the situation is more complicated, because we need to account
for differential mortality in the ENN period.
Therefore, the easiest way to calculate :math:`p_{\text{preterm},\text{LNN}}` is to get the end-of-ENN preterm
prevalence from the same LBWSG PAF calculation pipeline used for :math:`Z`
above.
As detailed at :ref:`details_of_the_lbwsg_paf_calculation` on the neonatal all-cause
mortality page, there are two iterative steps using microsimulation, with the late neonatal calculations
using the result of the early neonatal calculations.
Similarly to the LNN PAF, *after* the early neonatal calculations are complete, the prevalence of
preterm at the end of the ENN age group should be calculated.
This value should be used as :math:`p_{\text{preterm},\text{LNN}}` for the purposes
of the CSMRisk equation.

Determining the prevalence of preterm is a bit more complex than it sounds, because in the PAF calculation pipeline,
the same number of simulants are assigned to each LBWSG category, rather than assigning each simulant
to a random category with probability equal to that category's prevalence at birth.
Due to this initialization strategy, all quantities calculated in the pipeline must use *weights*
to account for the fact that the simulants in the categories with higher birth prevalence represent more people.
Therefore, :math:`p_{\text{preterm},\text{LNN}}` is calculated as follows:

.. math::

  p_{\text{preterm},\text{LNN}} = \frac{
    \sum_{\{\text{cat}: \text{GA}<37\}} \text{lbwsg\_birth\_prevalence}_\text{cat} \times \frac{n_\text{cat} - n^\text{deaths}_\text{cat}}{n_\text{cat}}
  }{
    \sum_{\text{cat}} \text{lbwsg\_birth\_prevalence}_\text{cat} \times \frac{n_\text{cat} - n^\text{deaths}_\text{cat}}{n_\text{cat}}
  },

where :math:`n_\text{cat}` is the number of simulants initialized into each LBWSG category at birth
and :math:`n^\text{deaths}_\text{cat}` is the number of deaths in each category when ENN mortality was applied.
Note that :math:`n_\text{cat}` will not vary by LBWSG exposure category under the current approach of assigning the same number of simulants to each LBWSG category.

The following table shows the data needed for these
calculations.

Data Tables
+++++++++++

.. note::

  All quantities pulled from GBD in the following table are pulled
  for all modeled years, sexes, age groups, and locations,
  except when the age group is explicitly specified.

.. list-table:: Data values and sources
    :header-rows: 1

    * - Variable
      - Definition
      - Value or source
      - Note
    * - enn_all_cause_death_count
      - Count of deaths due to all causes in the early neonatal age group
      - GBD: source='codcorrect', metric_id=1, cause_id=294, age_group_id=2
      - 
    * - enn_death_count
      - Count of deaths due to cause neonatal preterm birth complications in the early neonatal age group
      - GBD: source='codcorrect', metric_id=1, cause_id=381, age_group_id=2
      - 
    * - lnn_death_count
      - Count of deaths due to cause neonatal preterm birth complications in the late neonatal age group
      - GBD: source='codcorrect', metric_id=1, cause_id=381, age_group_id=3
      - 
    * - live_birth_count
      - Count of live births
      - GBD: covariate_id = 1106
      - 
    * - lbwsg_birth_prevalence
      - Birth prevalence of low birthweight and short gestation risk factor
      - GBD with post-processing: rei_id = 339, then remove the extraneous category and rescale prevalence :ref:`as described here <rescaling_lbwsg_exposure_data_pulled_from_gbd_2021>`.
      - 
    * - :math:`f_\text{preterm w RDS}`
      - fraction of preterm deaths with RDS
      - 85%
      - This value is not available from GBD and will need to be estimated based on other data sources. Tentative value of 85% included here is based on Table 4 in `this paper <https://www.sciencedirect.com/science/article/pii/S2214109X19302207>`_.
    * - :math:`f_\text{preterm wo RDS}`
      - fraction of preterm deaths without RDS
      - :math:`1 - f_\text{preterm w RDS}`
      - fractions sum to 1.0.
    * - :math:`\text{RR}_{\text{BW},\text{GA}}`
      - Relative Risk of all-cause mortality for a birth weight of BW and gestational age of GA
      - interpolated from GBD data
      - See :ref:`Low Birth Weight and Short Gestation (LBWSG) <2019_risk_effect_lbwsg>` page for details.
    * - :math:`Z`
      - Normalizing constant
      - calculated from :math:`\text{RR}_{\text{BW},\text{GA}}` and LBWSG exposure distribution.
      - see above for details.


Calculating Burden
++++++++++++++++++

Years of life lost
"""""""""""""""""""

The years of life lost (YLLs) due to Preterm Birth (with and without RDS)
are calculated assuming age :math:`a=14 \text{ days}`, and 
equals :math:`\operatorname{TMRLE}(a) - a`, where
:math:`\operatorname{TMRLE}(a)` is the theoretical minimum risk life
expectancy for a person of age :math:`a`.

Years lived with disability
"""""""""""""""""""""""""""

For simplicity, we will not include YLDs in this model.


Validation Criteria
+++++++++++++++++++

For the MNCNH simulation, neonatal mortality V&V criteria are documented on :ref:`the neonatal mortality page <2021_cause_neonatal_disorders_mncnh>`.

References
----------

`GBD 2021 Non-fatal Neonatal Infections Modeling Strategy <https://www.healthdata.org/sites/default/files/methods_appendices/2021/Neonatal_nonfatal_GBD2020_final_RS_updated_Jul_11_AC.pdf>`_ (pages 1-12).


`GBD 2021 Neonatal Preterm Factsheet <https://www.healthdata.org/research-analysis/diseases-injuries-risks/factsheets/2021-neonatal-preterm-birth-level-4-disease>`_.
