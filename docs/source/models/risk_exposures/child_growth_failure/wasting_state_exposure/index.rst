.. role:: underline
    :class: underline



..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  +++++++++++++++++++++
  
  Section Level 2 (#.#)
  ---------------------

  Section Level 3 (#.#.#)
  ~~~~~~~~~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.



.. _2021_risk_exposure_wasting_state_exposure:

=====================================================
Wasting dynamic transition model (GBD 2021)
=====================================================

.. note::

  This page has been adapted from the :ref:`2020 wasting/PEM model document <2020_risk_exposure_wasting_state_exposure>`
  used in the :ref:`acute malnutrition simulation <2019_concept_model_vivarium_ciff_sam>`.

  This adaptation is intended for use in the 
  :ref:`nutrition optimization simulation <2021_concept_model_vivarium_nutrition_optimization>`.

  Any changes to the wasting exposure modeling strategy from the version implemented
  in the acute malnutrition simulation can be viewed in this PR (TODO: LINK ADDITIONAL APPROPRIATE PRs).

    - `vivarium_research PR#1254 <https://github.com/ihmeuw/vivarium_research/pull/1254>`_: updated wasting intervention parameters (from the Ethiopian ministry of health values used in the acute malnutrition project to the COMPAS trial values used in the nutrition optimization project)
    - `vivarium_research PR#1257 <https://github.com/ihmeuw/vivarium_research/pull/1257>`_: updated :math:`d_i` equation to include malaria as an affected cause and to make excess mortality rates of affected causes specific to wasting exposure category
    - `vivarium_research PR#1258 <https://github.com/ihmeuw/vivarium_research/pull/1258>`_: updated time_step scalar value (may have already been implemented in the acute malnutrition model and just the docs were out of date)

  Also note that the protein energy malnutrition (PEM) risk-attributable cause model
  has been removed from this page and is instead available here: TODO: LINK PAGE.

.. contents::
  :local:

Overview
++++++++

This page contains information pertaining to the child wasting risk exposure model. 
GBD stratifies wasting into four categories: TMREL, mild, moderate, and severe wasting. 
Pages related to the wasting risk exposure model include:

- Protein energy malnutrition risk attributable cause
- Wasting risk effects

.. todo::

  Include links to above referenced pages

 For background information on child wasting, see the :ref:`2020 wasting/PEM model document <2020_risk_exposure_wasting_state_exposure>`.

.. todo::
  Link to future PEM page and to risk effects doc

+-------------------------------------------------+
| List of abbreviations                           |
+=======+=========================================+
| AM    | Acute malnutrition                      |
+-------+-----------------------------------------+
| MAM   | Moderate acute malnutrtion              |
+-------+-----------------------------------------+
| SAM   | Severe acute malnutrition               |
+-------+-----------------------------------------+
| TMREL | Theoretical minimum risk exposure level |
+-------+-----------------------------------------+
| CGF   | Child growth failure composed of wasting|
|       | stunging and underweight                |
+-------+-----------------------------------------+
| PEM   | Protein energy malnutrition             |
+-------+-----------------------------------------+

Wasting Exposure in GBD 2021
++++++++++++++++++++++++++++

Case definition
---------------

Wasting, a sub-component indicator of child growth failure (CGF), is based on a 
categorical definition using the WHO 2006 growth standards for children 0-59 
months. Definitions are based on z-scores from the growth standards, which were 
derived from an international reference population. Mild, moderate and severe 
categorical prevalences were estimated for each of the three indicators. 
Theoretical minimum risk exposure level (TMREL) for wasting was assigned to be 
greater than or equal to one standard deviation below the mean (-1 SD) of the 
WHO 2006 standard weight-for-height curve. This has not changed since GBD 2010.

+----------------------------------------------+
| Wasting category definition (range -7 to +7) |
+=======+======================================+
| TMREL |  >= -1                               |            
+-------+--------------------------------------+
| MILD  |  < -1 to -2 Z score                  |
+-------+--------------------------------------+
| MAM   |  < -2 to -3 Z score                  |
+-------+--------------------------------------+
| SAM   |  < -3 Z score                        |
+-------+--------------------------------------+

Exposure estimation
-------------------

In modeling CGF, all data types go into ST-GPR modeling. GBD has ST-GPR models 
for moderate, severe, and mean stunting, wasting, and underweight. The output 
of these STGPR models is an estimate of moderate, severe, and mean stunting, 
wasting, and underweight for all under 5 age groups, all locations, both sexes, 
and all years. 

They also take the microdata sources and fit ensemble distributions to the 
shapes of the stunting, wasting, and underweight distributions. They thus find 
characteristic shapes of stunting, wasting, and underweight curves. Once they 
have ST-GPR output as well as weights that define characteristic curve shapes, 
the last step is to combine them. They anchor the curves at the mean output from 
ST-GPR, use the curve shape from the ensemble distribution modeling, and then 
use an optimization function to find the standard deviation value that allows 
them to stretch/shrink the curve to best match the moderate and severe CGF 
estimates from ST-GPR. The final CGF estimates are the area under 
the curve for this optimized curve.

Note that the z-score ranges from -7 to +7. If we limit ourselves to Z-scores 
between -4 and +4, we will be excluding a lot of kids.

CGF burden does not start until *after* neonatal age groups (from 1mo onwards). 
In the neonatal age groups (0-1mo), burden comes from LBWSG. See risk effects 
page for details on model structure. The literature on interventions for wasting 
target age groups 6mo onwards. This coincides with the timing of supplementary 
food introduction. Prior to 6mo, interventions to reduce DALYs focus on 
breastfeeding and reduction of LBWSG. 

Vivarium Modeling Strategy
++++++++++++++++++++++++++

.. image:: vivarium_wasting_model_with_t1.svg

We will model wasting in four compartments: TMREL, Mild, Moderate, and Severe.
In a given timestep a simulant will either stay put, transition to an adjacent 
wasting category, or die. In this case of "CAT 1: severe wasting", simulants can 
also transition to "CAT 3: Mild wasting" via a treatment arrow, t1.

We will use the GBD 2021 wasting and PEM models to inform this model, in 
addition to data found in the literature. We will derive the remaining 
transition rates from a Markov chain model, described in further detail below. 
Simulants in each wasting category will receive a corresponding relative risk 
for diarrheal diseases, measles, lower respiratory infections. 

For wave I of the :ref:`nutrition optimization model <2021_concept_model_vivarium_nutrition_optimization>`, the vivarium 
models for these affected causes will draw from the corresponding GBD 2019 models
until we update the entire simulation to GBD 2021 results.

Assumptions and Limitations
---------------------------

..  todo::

  Describe the clinical and mathematical assumptions made for this cause model,
  and the limitations these assumptions impose on the applicability of the
  model. Flesh out list below.

 - Markov chain assumption is flawed (remission / incidence isn't constant over time / memoryless).

 - Seasonality of data

 - Unclear if our input data that informs "time to recovery from SAM" ought to be "time to recovery or death from SAM"

Input data
----------

GBD and literature sources
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table:: Wasting model input data sources
   :widths: 15 15
   :header-rows: 1

   * - Variable
     - Source
   * - Wasting state prevalence
     - GBD wasting model
   * - Wasting state mortality rates
     - Derived from GBD, with CGF correlation from DHS
   * - Transition rates from severe to more mild states
     - Derived from literature on recovery
   * - Transition rates from mild to more severe states
     - Derived using a Markov model 

Deriving wasting transition probabilities
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Markov derivation
^^^^^^^^^^^^^^^^^

.. important::

  **For wave I of the nutrition optimization model**

  We will model wasting transitions and risk effects **only** among simulants at least six months of age. Simulants should be initialized into a wasting model state at birth with a birth prevalence equal to the wasting risk exposure among the 1-5 month age group (age_group_id=388, or the postneonatal age_group_id=4 if using GBD 2019 instead of GBD 2021). 

  All wasting transition rates should equal zero among all ages under 6 months. The relative risks for each wasting risk exposure category and each risk/outcome pair should equal one for all ages under 6 months.

  Wasting transition rates should be informed by the data tables below for ages over 6 months. Wasting risk effects for ages over 6 months should be informed by the standard GBD wasting relative risks.

  NOTE: When the birthweight and wasting risk exposure at birth correlation is implemented, it will cause simulants with a greater neonatal mortality (due to brithweight exposure) to be initialized into more severe wasting states. This will cause the wasting exposure distribution to shift to less severe wasting states over the neonatal period as simulants with lower birthweights (and more severe wasting states due to the birthweight and wasting exposure correlation) die. The magnitude of the bias introduced by this modeling strategy should be investigated upon implementation to determine if different modeling strategies are necessary. This should be done by comparing the wasting exposure and wasting-affected outcomes in the simulation output to the GBD inputs by age group.

  NOTE: The modeling decision not to model wasting transitions among simulants less than six months of age is due to the reliance of the wasting model transition rates on the wasting treatment model and the lack of data to inform treatment-related transition rates among this age group. Note that a sensitivity analysis scenario that includes infants less than six months of age in the treatment model may be performed in the future.

This Markov model comprises 5 compartments: four wasting categories, plus CAT 0.
Because we need simulants to die at a higher rate out of CAT 1 than CAT 2, 3, or
the TMREL, it is necessary to include death to correctly derive our transition 
rates. Thus we allow simulants to die into CAT 0. However, because we need to 
assume equilibrium of our system over time, we allow simulants to "age in" to 
CATs 1-4, from CAT 0. We thus set the transition probabilies :math:`f_i` equal 
to the prevalence of the four wasting categories, obtained from GBD. 

It is important here to note first that :math:`f_i` don't represent fertility rates: 
rather, if :math:`k_i` sims died in timestep :math:`k`, we allow :math:`k_i` sims to
age in in timestep :math:`k+1`, to replenish those that died. Second, we 
emphasize that we utilize this method in order to calculate transition 
probabilities between the different wasting categories. However, the final 
Vivarium model of wasting will not include a reincarnation pool.

Here we include equations for the transition probabilities, and in the section 
that follows we will detail how to calculate all the variables used.

.. todo::

  Investigate r4 parameter value... confirm if we want to keep the same

.. list-table:: Wasting transition probability equations
   :widths: 5 15 10 10
   :header-rows: 1

   * - Variable
     - Equation
     - Description
     - Source
   * - i1
     - ap0*f2/ap2 + ap0*f3/ap2 + ap0*f4/ap2 + ap1*r2/ap2 + ap1*t1/ap2 - d2 - ap3*d3/ap2 - ap4*d4/ap2
     - Daily probability of incidence into cat 1 from cat 2
     - System of equations
   * - i2
     - ap0*f3/ap3 + ap0*f4/ap3 + ap1*t1/ap3 + ap2*r3/ap3 - d3 - ap4*d4/ap3
     - Daily probability of incidence into cat 2 from cat 1
     - System of equations
   * - i3
     - ap0*f4/ap4 + ap3*r4/ap4 - d4
     - Daily probability of incidence into cat 3 from cat 4
     - System of equations
   * - r2
     - 1 - e^(-(1-sam_tx_coverage*sam_tx_efficacy)*(1/time_to_sam_ux_recovery))
     - Daily probability of remission into cat 2 from cat 1 (untreated)
     - Nicole's calculations; also referred to as r2ux 
   * - r3
     - 1 - e^(-(mam_tx_coverage*mam_tx_efficacy * 1/time_to_mam_tx_recovery + (1-mam_tx_coverage*mam_tx_efficacy)*(1/time_to_mam_ux_recovery)))
     - Daily probability of remission from cat 2 into cat 3 (average of treated and untreated combined)
     - Nicole's calculations
   * - r4
     - 1 - e^{-rate}. 6-12 months: rate = 0.006140 (SD: 0.003015). 1-4 years: rate = 0.005043  (SD: 0.002428). For each rate parameter, use truncated normal distribution of uncertainty with lower bound equal to zero and upper bound equal to 25 standard deviations above the mean (25 standard deviations above the mean was determined to be the upper limit of the python distribution function)
     - Daily probability of remission from cat 3 into cat 4
     - From `implied transition rate from the KI data <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/wasting_transitions/alibow_ki_database_rates/KI_rates_5.3.3.ipynb>`_. Assume a normal distribution of uncertainty.
   * - t1
     - 1 - e^(-sam_tx_coverage*sam_tx_efficacy * (1/time_to_sam_tx_recovery))
     - Daily probability of remission into cat 3 from cat 1 (treated)
     - Nicole's calculations 
   * - s1
     - -r2 - t1 + ap2*d2/ap1 + ap3*d3/ap1 + ap4*d4/ap1 + (-ap0 + ap1)/ap1
     - Daily probability of staying in cat 1
     - System of equations
   * - s2
     - -ap0*f2/ap2 - ap0*f3/ap2 - ap0*f4/ap2 - ap1*r2/ap2 - ap1*t1/ap2 - r3 + 1 + ap3*d3/ap2 + ap4*d4/ap2
     - Daily probability of staying in cat 2
     - System of equations
   * - s3
     - -ap0*f3/ap3 - ap0*f4/ap3 - ap1*t1/ap3 - ap2*r3/ap3 - r4 + 1 + ap4*d4/ap3
     - Daily probability of staying in cat 3
     - System of equations
   * - s4
     - -ap0*f4/ap4 - ap3*r4/ap4 + 1
     - Daily probability of staying in cat 4
     - System of equations

In terms of the following variables:

.. list-table:: Variables for transition probabilities
   :widths: 10 10 10 10 10
   :header-rows: 1

   * - Variable
     - Description
     - Equation
     - Notes
     - Update
   * - :math:`d_i`
     - Death probability out of wasting category :math:`i`
     - :math:`1 - exp(-(acmr + (\sum_{c\in causes} emr_{ci} * prevalence_{ci} - csmr_c)) * timestep)` for causes in :ref:`c302/diarrheal diseases <diarrheal_diseases>`, :ref:`c322/lower respiratory infections <cause_lri>`, :ref:`c341/measles <cause_measles>`, malaria, and c387/protein energy malnutrition
     - TODO: link malaria and PEM documents when ready
     - Included malaria as additional affected cause, :math:`emr_c` updated to wasting category-specific :math:`emr_{ci}`
   * - :math:`f_i`
     - "Age-in" probability into :math:`cat_i`
     - Prevalence of wasting category i, pulled from GBD
     - These probabilities were chosen to maintain equilibrium of our system
     -
   * - :math:`ap_0`
     - Adjusted prevalence of :math:`cat_0` (the reincarnation pool)
     - 1 - exp(-acmr / 365)
     - We set this equal to the number of simulants that die each time step
     - 
   * - :math:`ap_i` for :math:`i\in \{1,2,3,4\}`
     - Adjusted prevalence of :math:`cat_i`
     - :math:`f_i/(ap_0 + 1)`
     - All category "prevalences" are scaled down, such that the prevalence of cat 0 (the reincarnation pool) and the prevalences of the wasting categories sum to 1
     - 
   * - mam_tx_coverage
     - Proportion of MAM (CAT 2) cases that have treatment coverage
     - :math:`C_{MAM}` parameter on the :ref:`combined protocol wasting intervention page <intervention_wasting_tx_combined_protocol>`
     - Baseline scenario value
     - Parameter value update
   * - sam_tx_coverage
     - Proportion of SAM (CAT 1) cases that have treatment coverage
     - :math:`C_{SAM}` parameter on the :ref:`combined protocol wasting intervention page <intervention_wasting_tx_combined_protocol>`
     - Baseline scenario value
     - Parameter value update
   * - sam_tx_efficacy
     - Proportion of children treated for SAM who successfully respond to treatment
     - :math:`E_{SAM}` parameter on the :ref:`combined protocol wasting intervention page <intervention_wasting_tx_combined_protocol>`
     - Baseline scenario value
     - Parameter value update
   * - mam_tx_efficacy
     - Proportion of children treated for MAM who successfully respond to treatment
     - :math:`E_{MAM}` parameter on the :ref:`combined protocol wasting intervention page <intervention_wasting_tx_combined_protocol>`
     - Baseline scenario value
     - Parameter value update
   * - time_to_mam_ux_recovery
     - Without treatment or death, average days spent in MAM before recovery
     - :math:`365 / r_\text{MAM,ux}` 
     - :math:`r_\text{MAM,ux}` parameter defined on the :ref:`combined protocol wasting intervention page <intervention_wasting_tx_combined_protocol>`
     - Parameter value update
   * - time_to_mam_tx_recovery
     - With treatment and without death, average days spent in MAM before recovery
     - :math:`365 / r_\text{MAM,tx}`
     - :math:`r_\text{MAM,tx}` parameter defined on the :ref:`combined protocol wasting intervention page <intervention_wasting_tx_combined_protocol>`
     - Parameter value update
   * - time_to_sam_ux_recovery
     - Without treatment or death, average days spent in SAM before recovery
     - :math:`365 / r_{SAM,ux}`
     - :math:`r_\text{SAM,ux}` parameter defined on the :ref:`combined protocol wasting intervention page <intervention_wasting_tx_combined_protocol>` 
     - Parameter value update
   * - time_to_sam_tx_recovery
     - With treatment and without death, average days spent in SAM before recovery
     - :math:`365 / r_{SAM,tx}`
     - :math:`r_\text{SAM,tx}` parameter defined on the :ref:`combined protocol wasting intervention page <intervention_wasting_tx_combined_protocol>` 
     - Parameter value update
   * - time_step
     - Scalar time step conversion to days
     - 1/365
     -
     - Update from documented value of 1; I suspect the docs were out of date with implementation. Ask Ali if confused.

.. todo::

  1. Incidence_ci will need to account for stunting and underweight correlation too
    
    Will probably be best to provide a "joint CGF" RR calculated from correlation notebooks here

  2. Update PAF data... will need to come from correlation calculations rather than calculation listed here

  3. Need to make duration specific to each wasting category and a function of both remission rate and category-specific EMR

  4. EMR needs to be affected by category-specific CGF RRs

.. list-table:: Calculations for variables in transition equations
   :widths: 6 10 10
   :header-rows: 1

   * - Variable
     - Description
     - Equation
   * - :math:`prevalence_{ci}`
     - The prevalence of cause c among wasting category i
     - :math:`incidence_{ci} * duration_c`
   * - :math:`duration_c`
     - The average duration of cause c, in years
     - Defined on the respective cause model documents for :ref:`diarrheal diseases <2019_cause_diarrhea>`, :ref:`measles <2019_cause_measles>`, and :ref:`lower respiratory infections <2019_cause_lower_respiratory_infections>`
   * - :math:`incidence_{ci}`
     - incidence probability of cause c among wasting category i
     - :math:`incidence_{c}*(1-paf_{c})*rr_{ci}`
   * - :math:`incidence_c`
     - population-level incidence probability of cause c 
     - Pulled from GBD
   * - :math:`paf_{c}`
     - The PAF of cause c attributable to wasting
     - :math:`\frac{(\sum_{i} prevalence_{i} * rr_{ci})-1}{\sum_{i} prevalence_{i} * rr_{ci}}`
   * - :math:`rr_{ci}`
     - The relative risk for incidence of cause c given wasting category i
     -
   * - :math:`prevalence_{i}`
     - the prevalence of wasting category i 
     - Pulled from GBD
   * - :math:`acmr`
     - All-cause mortality probability
     - Pulled from GBD
   * - :math:`emr_c`
     - Excess mortality probability of cause c
     - Pulled from GBD
   * - :math:`csmr_c`
     - Cause-specific mortality rate of cause c
     - Pulled from GBD

Derivation proofs
'''''''''''''''''''

We now detail how the above wasting probability transition equations were derived.


We solve our transition probabilities using a 
Markov Chain transition matrix **T**. 

T = 

.. csv-table:: 
   :file: wasting_state_1x4_death.csv
   :widths: 5, 5, 5, 5, 5, 5


:math:`π_{T}` = 

+----+----+----+----+----+
| p4 | p3 | p2 | p1 | p0 |
+----+----+----+----+----+

:math:`π_{T}` is the eigenvector at equilibrium

  a) :math:`π_{T}\times\text{T} = π_{T}` (the T means transposed, this is a 1 row vector)
  b) :math:`\sum_{\text{i=p}}` = :math:`π_{T}`
  c) :math:`π_{i}` ≥ 0 , these are GBD 2021 age/sex/location/year-specific prevalence for wasting categories 1-4, plus :math:`p0`, which will equal the number of sims who die in a timestep


Solving a)

  1)  :math:`ap_4s_4 + ap_3r_4 + ap_0f_4 = ap_4` 
  2)  :math:`ap_4i_3 + ap_3s_3 + ap_2r_3 + ap_0f_3 = ap_3`
  3)  :math:`ap_3i_2 + ap_2s_2 + ap_1r_2 + ap_0f_2 = ap_2`
  4)  :math:`ap_2i_1 + ap_1s_1 + ap_0f_1 = ap_1`
  5)  :math:`ap_4d_4 + ap_3d_3 + ap_2d_2 + ap_1d_1=ap_0`

Rows of the P matrix sums to 1

  6)  :math:`s_4 + i_3 + d-4 = 1`
  7)  :math:`r_4 + s_3 + i_2 + d_3 = 1`
  8)  :math:`r_3 + s_2 + i_1 + d_2 = 1`
  9)  :math:`r_2 + s_1 + d_1 = 1`
  10) :math:`f_4+f_3+f_2+f_1=1`


.. code-block:: python

  import numpy as np, pandas as pd
  import sympy as sym
  from sympy import symbols, Matrix, solve, simplify

  # define symbols
  s4, i3 = symbols('s4 i3')
  r4, s3, i2 = symbols('r4 s3 i2')
  r3, s2, i1 = symbols('r3 s2 i1')
  r2, s1 = symbols('r2 s1')
  d4, d3, d2, d1 = symbols('d4 d3 d2 d1')
  f4, f3, f2, f1 = symbols('f4 f3 f2 f1')
  ap4, ap3, ap2, ap1, ap0 = symbols('ap4 ap3 ap2 ap1 ap0')
  acmr = sym.Symbol('acmr')


  # for k linearly independent eqns, sympy will solve the first k unknowns
  unknowns = [i2,s1,s2,s3,s4,r3,i1,i3,t1,r4,r2,d1,d2,d3,d4,f1,f2,f3,f4]

  def add_eq(terms, y, i, A, v):
    """
    For input equation y = sum([coeff*var for var:coeff in {terms}])
    adds right side of equation to to row i of matrix A
    
    adds y to row i of vector v
    """
    for x in terms.keys():
        A[x][i] = terms[x]
    v.iloc[i] = y


  # # assuming equilibrium:
  # p4*s4 + p3*r4 + p0*f4 = p4
  eq1 = [{s4:p4, r4:p3, f4:p0}, p4]

  # p4*i3 + p3*s3 + p2*r3 + p0*f3 = p3
  eq2 = [{i3:p4, s3:p3, r3:p2, f3:p0}, p3]

  # p3*i2 + p2*s2 + p1*r2 + p0*f2 = p2
  eq3 = [{i2:p3, s2:p2, r2:p1, f2:p0}, p2]

  # p2*i1 + p1*s1 + p0*f1 = p1
  eq4 = [{i1:p2, s1:p1, f1:p0}, p1]

  # p4*d4 + p3*d3 + p2*d2 + p1*d1 + p0*sld = p0
  eq5 = [{d4:p4, d3:p3, d2:p2, d1:p1}, p0]


  # # rows sum to one:
  # s4 + i3 + d4 = 1
  eq6 = [{s4:1, i3:1, d4:1}, 1]

  # r4 + s3 + i2 + d3 = 1
  eq7 = [{r4:1, s3:1, i2:1, d3:1}, 1]

  # r3 + s2 + i1 + d2 = 1
  eq8 = [{r3:1, s2:1, i1:1, d2:1}, 1]

  # r2 + s1 + d1 = 1
  eq9 = [{r2:1, s1:1, d1:1}, 1]

  # f4 + f3 + f2 + f1 + sld = 1
  eq10 = [{f4:1, f3:1, f2:1, f1:1}, 1]


  def build_matrix(eqns, unknowns):
    """
    INPUT
    ----
    eqns: a list of sympy equations
    unknowns: a list of sympy unknowns
    ----
    OUTPUT
    ----
    A:  a matrix containing the coefficients of LHS of all eq in eqns.
        nrows = number of equations
        rcols = number of unknowns
    b: an nx1 matrix containing the RHS of all the eqns
    x: a sympy matrix of the unknowns
    """
    n_eqns = len(eqns)
    n_unknowns = len(unknowns)

    # frame for matrix/LHS equations.
    # nrows = n_eqns, ncols = n_unknowns
    A = pd.DataFrame(
        index = range(n_eqns),
        columns = unknowns,
        data = np.zeros([n_eqns,n_unknowns])
    )
    
    # frame for RHS of equations
    b = pd.DataFrame(index = range(n_eqns), columns = ['val'])
    
    # populate LHS/RHS
    i = 0
    for eq in eqns:

        add_eq(eq[0], eq[1], i, A, b)
        i += 1
    
    # convert to sympy matrices
    A = sym.Matrix(A)
    b = sym.Matrix(b)
    x = sym.Matrix(unknowns) #vars to solve for
    
    return A, x, b

  # solve in terms of i3 
  A0, x0, b0 = build_matrix([eq1,eq2,eq3,eq4,eq5,eq6,eq7,eq8,eq9,eq10,eq11,eq12],
                           unknowns)

  result_0 = sym.solve(A0 * x0 - b0, x0)

  # solve in terms of duration of cat3 instead of i3:
  A1, x1, b1 = build_matrix([eq1,eq2,eq3,eq4,eq5,eq6,eq7,eq8,eq9,eq10],
                         unknowns)
  result_1 = sym.solve(A1 * x1 - b1, x1)


Data Description Tables
+++++++++++++++++++++++

.. todo::

  Will want to update this strategy to be static propensity model rather than birth prevalence of 5 month olds so that we can have LBWSG affect wasting exposure for those under 6 months of age even for wave 1 in which we don't have wasting transitions for this group yet (this should be similar to how we did it for IV iron)

.. list-table:: Wasting State Data
   :widths: 5 10 10 20
   :header-rows: 1

   * - State
     - Measure
     - Value
     - Notes
   * - TMREL, MILD, MAM, SAM
     - birth prevalence
     - :math:`prevalence_{240_{cat-1-4}}`
     - Use prevalence of age_group_id = 388 (1 to 5 months)

.. code-block:: python

   #to pull GBD 2021 category specific prevalence of wasting

    get_draws(gbd_id_type='rei_id',
                    gbd_id=240,
                    source='exposure',
                    year_id=2021,
                    gbd_round_id=7,
                    status='best',
                    location_id = [179],
                    decomp_step = 'iterative')

.. list-table:: Wasting Restrictions 2021
   :widths: 10 10 20
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
   * - Prevalence age group start
     - Early Neonatal
     - age_group_id = 2. This is the earliest age group for which the wasting risk exposure estimates nonzero prevalence.
   * - Burden age group start
     - 28 days - 5 months
     - age_group_id = 388. This is the earliest age group for which there exist wasting RRs.
   * - Age group end
     - 2 to 4
     - age_group_id = 34

.. code-block:: python

  #age group id differences between 2019 and 2021

  #2021 age ids
  early nn = 2 
  late nn = 3
  1m-5m = 388   #2019 it was 4 = postneonatal
  6m-11m = 389  #2019 it was 4 = postneonatal
  12m-23m = 238 #2019 it was 5 = 1-5
  2y-4y = 34    #2019 it was 5 = 1-5



.. todo::

  Replace this section with a link to custom-calculated correlated PAFs for all CGF

As we are building this model before the completion of GBD 2020, we 
will need to calculate the PAFs ourselves, using the following equation:

.. math::
  \frac{(\sum_{wasting\_category_i} prevalence_{i} * rr_{ci})-1}{\sum_{wasting\_category_i} prevalence_{i} * rr_{ci}}

.. list-table:: PAF equation variable descriptions
   :widths: 6 10 10
   :header-rows: 1

   * - Variable
     - Description
     - Equation
   * - :math:`rr_{ci}`
     - The relative risk for incidence of cause c given wasting category i
     -
   * - :math:`prevalence_{i}`
     - the prevalence of wasting category i 
     - Pulled from GBD


Note the RRs should be pulled as follows:

.. code-block:: python

  from get_draws.api import get_draws
  get_draws(
    gbd_id_type='rei_id',
    gbd_id=240,
    source='rr',
    sex_id=[1,2],
    age_group_id=[2, 3, 388, 389, 34],
    decomp_step='iterative',
    status='best'
  )


.. list-table:: Transition Data
 :widths: 10 10 10 10 10
 :header-rows: 1

 * - Transition
   - Source State
   - Sink State
   - Value
   - Notes
 * - ux_rem_rate_sam
   - CAT 1
   - CAT 2
   - :math:`-log(1 - r2) * 365`
   - Untreated remission rate (counts/person-year) from SAM to MAM
 * - tx_rem_rate_sam
   - CAT 1
   - CAT 3
   - :math:`-log(1 - t1) * 365`
   - Treated remission rate (counts/person-year) from SAM to mild wasting
 * - rem_rate_mam
   - CAT 2
   - CAT 3
   - :math:`-log(1 - r3) * 365`
   - Remission rate (counts/person-year) from MAM to mild wasting
 * - rem_rate_mild
   - CAT 3
   - CAT 4
   - :math:`-log(1 - r4) * 365`
   - Remission rate (counts/person-year) from mild wasting to TMREL
 * - inc_rate_sam
   - CAT 2
   - CAT 1
   - :math:`-log(1 - i1) * 365`
   - Incidence rate (counts/person-year) from MAM to SAM
 * - inc_rate_mam
   - CAT 3
   - CAT 2
   - :math:`-log(1 - i2) * 365`
   - Incidence rate (counts/person-year) from mild wasting to MAM
 * - inc_rate_mild
   - CAT 2
   - CAT 1
   - :math:`-log(1 - i3) * 365`
   - Incidence rate (counts/person-year) from TMREL to mild wasting

Validation 
++++++++++

Wasting model

  - prevalence of cat 1-4
  - the incidences and the recovery rates (with our calibration inputs, can be accessed in interative sim)
  - death rates per category
  - relative risks (this would be done in the cause model validation)
  - SAM and MAM duration (including who recovered from t1 arrow vs. r2 arrow)
  - fertility (total person-time vs. year)

References
++++++++++

.. todo::

  Link GBD 2021 methods appendix when finished