.. _2021_cause_maternal_hemorrhage_mncnh:

===================
Maternal hemorrhage
===================

Disease Overview
----------------

GBD 2021 Modeling Strategy
--------------------------

Cause Hierarchy
+++++++++++++++

Restrictions
++++++++++++

Vivarium Modeling Strategy
--------------------------

Scope
+++++

Assumptions and Limitations
+++++++++++++++++++++++++++

Cause Model Diagram
+++++++++++++++++++

Data Tables
+++++++++++

The maternal hemorrhage cause model requires two probabilities, the
incidence risk (ir) per birth and the case fatality rate (cfr), for use
in the decision graph. The incidence risk per birth will be computed as

.. math::

    \text{ir} = \frac{\text{hemorrhage cases}}{\text{births}}
        = \frac{\text{(hemorrhage cases) / person-time}}
            {\text{births / person-time}}
        = \frac{\text{hemorrhage incidence rate}}{\text{birth rate}}.

The case fatality rate will be computed as

.. math::

    \begin{align*}
    \text{cfr} &= \frac{\text{hemorrhage deaths}}{\text{hemorrhage cases}} \\
        &= \frac{\text{(hemorrhage deaths) / person-time}}
            {\text{(hemorrhage cases) / person-time}}
        = \frac{\text{hemorrhage cause specific mortality rate}}
            {\text{hemorrhage incidence rate}}.
    \end{align*}

The following table shows the data needed from GBD for these
calculations as well as for the calculation of YLDs in the next section.

.. note::

    All quantities pulled from GBD in the following table are for a
    specific year, sex, age group, and location unless otherwise noted
    (e.g., SBR). Our simulation only includes pregnant women of
    reproductive age, so the sex will always be female. However, even
    though all of our simulants will be pregnant, we still pull each
    quantity for *all* females in a given year, age group, and location,
    because this is the default behavior of GBD. Since we are using the
    same total population in all the denominators, the person-time will
    cancel out in the above calculations to give us the probabilities we
    want.

.. list-table:: Data values and sources
    :header-rows: 1

    * - Variable
      - Definition
      - Value or source
      - Note
    * - ir
      - maternal hemorrhage incidence risk per birth
      - incidence_c368 / birth_rate
      - The value of ir is a probabiity in [0,1]. Denominator includes
        live births and stillbirths.
    * - cfr
      - case fatality rate of maternal hemorrhage
      - csmr_c368 / incidence_368
      - The value of cfr is a probabiity in [0,1]
    * - incidence_c368
      - incidence rate of maternal hemorrhage
      - como
      - Use the :ref:`total population incidence rate <total population
        incidence rate>` directly from GBD and do not rescale this
        parameter to susceptible-population incidence rate using
        condition prevalence. Total population person-time is used in
        the denominator in order to cancel out with the person-time in
        the denominators of birth_rate and csmr_c368.
    * - csmr_c368
      - maternal hemorrhage cause-specific mortality rate
      - deaths_c368 / population
      - Note that deaths / (average population for year) = deaths / person-time
    * - deaths_c368
      - count of deaths due to maternal hemorrhage
      - codcorrect
      -
    * - population
      - average population in a given year
      - get_population
      - Specific to age/sex/location/year demographic group. Numerically
        equal to person-time for the year.
    * - birth_rate
      - birth rate (live or still)
      - (1 + SBR) ASFR
      - Units are total births (live or still) per person-year
    * - ASFR
      - Age-specific fertility rate
      - get_covariate_estimates: coviarate_id=13
      - Assume lognormal distribution of uncertainty. Units in GBD are
        live births per person, or equivalently, per person-year.
    * - SBR
      - Stillbirth to live birth ratio
      - get_covariate_estimates: covariate_id=2267
      - Parameter is not age specific and has no draw-level uncertainty.
        Use mean_value as location-specific point parameter.
    * - yld_rate_c368
      - rate of maternal hemorrhage YLDs per person-year
      - como
      -
    * - ylds_per_case_c368
      - YLDs per case of maternal hemorrhage
      - yld_rate_c368 / incidence_c368
      -


Calculating Burden
++++++++++++++++++

Years of life lost
"""""""""""""""""""

Years lived with disability
"""""""""""""""""""""""""""

Validation Criteria
+++++++++++++++++++

References
----------
