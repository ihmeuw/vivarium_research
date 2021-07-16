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



.. _2020_risk_exposure_wasting_state_exposure:

================================
Wasting as finite state machines
================================

.. contents::
  :local:

+-------------------------------------------------+
| List of abbreviations                           |
+=======+=========================================+
| AM    | acute malnutrition                      |
+-------+-----------------------------------------+
| MAM   | moderate acute malnutrtion              |
+-------+-----------------------------------------+
| SAM   | Severe acute malnutrition               |
+-------+-----------------------------------------+
| TMREL | theoretical minimum risk exposure level |
+-------+-----------------------------------------+
| CGF   | child growth failure composed of wasting|
|       | stunging and underweight                |
+-------+-----------------------------------------+
| DD    | Diarrheal disease                       |
+-------+-----------------------------------------+
| LRI   | lower respiratory tract infection       |
+-------+-----------------------------------------+
| MSLS  | measles                                 |
+-------+-----------------------------------------+
| PEM   | protein energy malnutrition             |
+-------+-----------------------------------------+


Risk Exposure Overview
++++++++++++++++++++++

Malnutrition is an imbalance between the body’s needs and its use and intake of nutrients. The imbalance can be caused by poor or lacking diet, poor hygiene, disease states, lack of knowledge, and cultural practices, among others. Underweight, stunting, wasting, obesity, and vitamin and mineral deficiencies are all forms of malnutrition. 

**Acute malnutrition (AM)**, also referred to as wasting, is recent rapid weight loss or a failure to gain weight that results from illness, lack of appropriate foods, or other underlying causes. For an individual, AM is not a chronic condition: children with AM either recover or die and recovered children can relapse to AM. It is measured in weight-for-height z-scores (WFH) which is a comparison of a child’s WFH from the median value of the global reference population. A z-score between -2 to -3 indicates moderate acute malnutrition (MAM) and a z-score below -3 indicate severe acute malnutrition (SAM). WHZ z-scores range from -7 to +7. Although MAM is less severe, it affects a greater number of children and is associated with more nutrition-related deaths than SAM. Children with AM are at greater risk of death from diarrhea and other infectious diseases than well-nourished children. They also face greater risk of morbidity from infectious diseases and delayed physical and cognitive development. AM tends to peak during seasonal hunger, disease outbreaks, or during food security ‘shocks’ (e.g. economic or climatic crises) and stresses including humanitarian crises. However, AM is a problem that not only occurs in emergencies, but also can be endemic in development contexts. MAM should not be neglected, as untreated, it can deteriorate to SAM and possible death. Furthermore, evidence is emerging that repeated episodes of MAM can have a significant impact on stunting; prevention of wasting could potentially increase height in children. 

.. note::
  Include here a clinical background and overview of the risk exposure you're 
  modeling. Note that this is only for the exposure; you will include information 
  on the relative risk of the relevant outcomes, and the cause models for those 
  outcomes, in a different document.

Risk Exposures Description in GBD
+++++++++++++++++++++++++++++++++

Case definition
---------------

Wasting, a sub-compoonent indicator of child growth failure (CGF), is based on a categorical definition using the WHO 2006 growth standards for children 0-59 months. Definitions are based on Z-cores from the growth standards, which were derived from an international reference population. Mild, moderate and severe categorical prevalences were estimated for each of the three indicators. Theoretical minimum risk exposure level (TMREL) for wasting was assigned to be greater than or equal to one standard deviation below the mean (-1 SD) of the WHO 2006 standard weight-for-height curve. This has not changed since GBD 2010.

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

Input data
----------

Two types of input data are used in CGF estimation:  

  1. **Tabulated report data**. This data does not report individual anthropometric measurements. It only reports the prevalence of forms of CGF in a sample size. For example, this data would may report a 15% prevalence of moderate stunting out of a nationally representative sample of 5,000 children.

  2. **Microdata**. This data does have individual anthropometric measurements. From these datasources, GBD can see entire distributions of CGF, while also collapsing them down to point prevalences like moderate and severe CGF. 

Exposure estimation
------------------- 

In modeling CGF, all data types go into ST-GPR modeling. We have STGPR models for moderate, severe, and mean stunting, wasting, and underweight. The output of these STGPR models is an estimate of moderate, severe, and mean stunting, wasting, and underweight for all under 5 age groups, all locations, both sexes, and all years. 

We also take the microdata sources and fit ensemble distributions to the shapes of the stunting, wasting, and underweight distributions. By doing this we can find characteristic shapes of stunting, wasting, and underweight curves. Once we have ST-GPR output as well as weights that define characteristic curve shapes, the last step is to combine them. We anchor the curves at the mean output from ST-GPR, use the curve shape from the ensemble distribution modeling, and then use an optimization function to find the standard deviation value that allows us to stretch/shrink the curve to best match the moderate and severe CGF estimates we got from ST-GPR. The final CGF estimates are the area under the curve for this optimized curve.

Note that the z-score ranges from -7 to +7. If we limit ourselves to Z-scores between -4 and +4, we will be excluding a lot of kids.

.. note::
  In the paper that Ryan (GBD modeller for CGF and LWBSG) is working on right now, he presents the first results ever for "extreme" stunting which we define as kids with stunting Z scores below -4. For Ethiopia, that's about 7% of kids. So it's non-trivial!


Outcomes affected by wasting
----------------------------

CGF burden does not start until *after* neonatal age groups (from 1mo onwards). In the neonatal age groups (0-1mo), burden comes from LBWSG. From post-neonatal (1mo+) age onwards, CGF outcomes affected include lower-respiratory disease (LRI), diarrheal disease (DD), measles, and protein energy malnutrition (PEM). The literature on interventions for wasting target age groups 6mo onwards. This coincides with the timing of supplementary food introduction. Prior to 6mo, interventions to reduce DALYs focus on breastfeeding and reduction of LBWSG. 

.. todo::
  Put RRs here(?)

Vivarium Modeling Strategy
++++++++++++++++++++++++++

We will build a duration based Markov chain finite state state transition model 
for progression and recovery of acute malnutrition calibrated to GBD 2020 
prevalence of wasting. We do this progressively from a wasting only model to one 
with causes and disease feedback. The arrows in the model diagram figures 
represent the transition probabilities into and out of each state which 
determines the movement of children in and out of each state. 

We first build

  1. 1x4 state model with wasting only
  2. 2x4 state model with 2 disease states and 4 wasting states
  3. 2x4 state model with 2 disease states and 4 wasting states with death and fertility (tbd)


Assumptions and Limitations
+++++++++++++++++++++++++++

Describe the clinical and mathematical assumptions made for this cause model,
and the limitations these assumptions impose on the applicability of the
model.

Markov chains
-------------

.. todo::
  add some detail about markov chains, define mathematic notations 

Equilibirum
-----------

.. todo::
  add some detail about equilirium

Arborescence
------------

.. todo::
  add some detail about graph theory and the process we did to discover the pattern in our markov chains

As a rule for the finiate state machines, the numerator of the prevalence of a state is the sum of the product of all edges in every unique anti-arborescence (graph theory).

.. note::
  This section will become the methods section in the manuscript. 


Restrictions
------------

.. list-table:: GBD 2020 Risk Exposure Restrictions
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
   * - Age group start
     -
     -
   * - Age group end
     -
     -

..	todo::

	Determine if there's something analogous to "YLL/YLD only" for this section

Risk Exposure Model Diagram
---------------------------

Finite state machine 1x4 
~~~~~~~~~~~~~~~~~~~~~~~~


.. image:: wasting_state_1x4.svg

To solve the 10 transition pobabilities, we use a Markov Chain transition matrix **T**. 

T = 

.. csv-table:: 
   :file: wasting_state_1x4.csv
   :widths: 5, 5, 5, 5, 5


:math:`π_{T}` = 

+----+----+----+----+
| p4 | p3 | p2 | p1 |
+----+----+----+----+

:math:`π_{T}` is the eigenvector at equilibrium

  a) :math:`π_{T}\times\text{T} = π_{T}` (the T means transposed, this is a 1 row vector)
  b) :math:`\sum_{\text{i=p}}` = :math:`π_{T}`
  c) :math:`π_{i}` ≥ 0 , these are GBD 2020 age/sex/location/year-specific prevalence for wasting categories 1-4


Solving a)

  1)  :math:`p_4s_4 + p_3r_4 = p_4` 
  2)  :math:`p_4i_3 + p_3s_3 + p_2r_3 = p_3`
  3)  :math:`p_3i_2 + p_2s_2 + p_1r_2 = p_2`
  4)  :math:`p_2i_1 + p_1xs_1 = p_1`


Rows of the P matrix sums to 1

  5)  :math:`s_4 + i_3 = 1`
  6)  :math:`r_4 + s_3 + i_2 = 1`
  7)  :math:`r_3 + s_2 + i_1 = 1`
  8)  :math:`r_2 + s_1 = 1`

We have duration of treated and untreated sam and mam as well as coverage from the literature :   

  9)  :math:`r_2 = 1/Dsam`   
  10) :math:`r_3 + i_1  = 1/Dmam`
  11) :math:`i_2 + r_4 = 1/dur\_cat3`

where

 - Duration of cat 1: Dsam = C x Dsam_tx + (1-C)Dsam_ux ~ 40 days stand in value (will refine)
 - Duration of cat 2: Dmam = C x Dmam_tx + (1-C)Dmam_ux ~ 70 days stand in value (will refine)
 - Duration of cat 3: :math:`1 / (i_2 + r_4)`. We still need more values from the literature to solve for this.
 - tx is treated
 - ux is untreated
 - C is treatment coverage proportion



We solve this system of equations in terms of :math:`p_1,p_2,p_3,p_4` and one unknown;
for now, this unknown is :math:`dur\_cat3`, which we will assume to be :math:`1/365` until we
find values from the literature with which to update this.

Solving in terms of :math:`i_3`, we get:

.. list-table:: Transition probabilities solved in terms of :math:`i_3`
   :widths: 10 25
   :header-rows: 1

   * - Variable
     - Value
   * - s1
     - 0.975
   * - s2
     - 0.985714285714286
   * - s3
     - -i3*p4/p3 + 0.00357142857142857*(7.0*p1 - 4.0*p2 + 280.0*p3)/p3
   * - s4
     - 1.0 - i3
   * - r2
     - 0.025
   * - r3
     - 0.00357142857142857*(-7.0*p1 + 4.0*p2)/p2
   * - r4
     - i3*p4/p3
   * - i1
     - 0.025*p1/p2
   * - i2
     - 0.00357142857142857*(-7.0*p1 + 4.0*p2)/p3


Solving in terms of :math:`dur\_cat3`, we get:

.. list-table:: Transition probabilities solved in terms of :math:`dur\_cat3`
   :widths: 10 25
   :header-rows: 1

   * - Variable
     - Value
   * - s1
     - 0.975
   * - s2
     - 0.985714285714286
   * - s3
     - (dur_cat3 - 1.0)/dur_cat3
   * - s4
     - 0.00357142857142857*(-7.0*dur_cat3*p1 + 4.0*dur_cat3*p2 + 280.0*dur_cat3*p4 - 280.0*p3)/(dur_cat3*p4)
   * - r2
     - 0.025
   * - r3
     - 0.00357142857142857*(-7.0*p1 + 4.0*p2)/p2
   * - r4
     - 0.00357142857142857*(7.0*dur_cat3*p1 - 4.0*dur_cat3*p2 + 280.0*p3)/(dur_cat3*p3)
   * - i1
     - 0.025*p1/p2
   * - i2
     - 0.00357142857142857*(-7.0*p1 + 4.0*p2)/p3
   * - i3
     - 0.00357142857142857*(7.0*dur_cat3*p1 - 4.0*dur_cat3*p2 + 280.0*p3)/(dur_cat3*p4)

The code used to solve this system of equations is here:

.. code-block:: python

  import numpy as np, pandas as pd
  import sympy as sym
  from sympy import symbols, Matrix, solve, simplify

  # define symbols / unknowns
  s4, i3 = symbols('s4 i3')
  r4, s3, i2 = symbols('r4 s3 i2')
  r3, s2, i1 = symbols('r3 s2 i1')
  r2, s1 = symbols('r2 s1')
  p4, p3, p2, p1 = symbols('p4 p3 p2 p1')

  # # uncomment these if don't want to solve in terms of p_is
  # sex/age-specific GBD prevalence of wasting cat 1-4
  # p4 = 0.7
  # p3 = 0.2
  # p2 = 0.07 
  # p1 = 0.03

  unknowns = [s1,s2,s3,s4,r2,r3,r4,i1,i2,i3]

  def add_eq(terms, y, i, A, v):
    """
    For input equation y = sum([coeff*var for var:coeff in {terms}])
    adds right side of equation to to row i of matrix A
    
    adds y to row i of vector v
    """
    for x in terms.keys():
        A[x][i] = terms[x]
    v.iloc[i] = y

  # define equations
  # 1) p4*s4 + p3*r4 = p4 
  eq1 = [{s4:p4, r4:p3}, p4]

  # 2) p4*i3 + p3*s3 +p2*r3 = p3
  eq2 = [{i3:p4, s3:p3, r3:p2}, p3]

  # 3) p3*i2 + p2*s2 + p1*r2 = p2
  eq3 = [{i2:p3, s2:p2, r2:p1}, p2]

  # 4) p2*i1 + p1*s1 = p1
  eq4 = [{i1:p2, s1:p1}, p1]

  # 5) s4 + i3 =1
  eq5 = [{s4:1, i3:1}, 1]

  # 6) r4 + s3 + i2 = 1
  eq6 = [{r4:1, s3:1, i2:1}, 1]

  # 7) r3 + s2 + i1 =1
  eq7 = [{r3:1, s2:1, i1:1}, 1]

  # 8) r2 + s1 = 1
  eq8 = [{r2:1, s1:1}, 1]

  # 9) r2 = 1/Dsam
  eq9 = [{r2:1}, 1/40]

  # 10) r3 + i1  = 1/Dmam
  eq10 = [{r3:1, i1:1}, 1/70]

  # 1/dur_cat3 = i2 + r4
  dur_cat3 = sym.Symbol('dur_cat3')

  eq11 = [{i2:1, r4:1}, 1/dur_cat3]

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

  # solve in terms of p1, p2, p3, p4, and one dependent unknown:
  A0, x0, b0 = build_matrix([eq1,eq2,eq3,eq4,eq5,eq6,eq7,eq8,eq9,eq10],
                           unknowns)


  result_0 = sym.solve(A0 * x0 - b0, x0)

  # solve in terms of duration of cat3 instead of i3:
  A1, x1, b1 = build_matrix([eq1,eq2,eq3,eq4,eq5,eq6,eq7,eq8,eq9,eq10,eq11],
                         unknowns)
  result_1 = sym.solve(A1 * x1 - b1, x1)





.. todo::
    - Beatrix will add a table of solutions that holds values for p1,p2,p3,p4
    - We also need the closed form graph theory solution


Finite state machine 1x4 + death
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In the above section we calculated the transition probabilities assuming that 
all simulants exist in one of the four wasting categories. The transition 
probabilities are thus incorrect, because simulants never die. In reality, we 
expect children to age into the four wasting categories, and to die out of SAM 
at a higher rate than out of MAM, mild wasting, or the TMREL. Thus in the above model, we 
expect simulants who ought to be dying to instead be remitting to MAM.

Here we correct this by allowing simulants to die into **CAT 0** at differential 
rates. However, as we still need to assume equilibrium across the wasting states 
over time, we allow sims to age in to the four wasting categories out of 
**CAT 0**, our "reincarnation pool". We then set the transition probabilies 
:math:`f_i` equal to the prevalence of the four wasting categories.

.. image:: wasting_diagram_with_treatment.svg

It is important here to note first that :math:`f_i` don't represent fertility rates, 
but rather that we only allow enough sims to age in each timestep necessary to 
replenish those that died. Second, we emphasize that we utilize this method in 
order to calculate transition probabilities between the different wasting categories. 
However, the final Vivarium model of wasting will not include a reincarnation 
pool.

Here we include equations for the transition probabilities. These probabilities 
are used to calculate transition rates in the Transition Data Table. In the 
section that follows we will detail how to calculate all the variables used below.

.. list-table:: Wasting transition probability equations
   :widths: 5 15 10 10
   :header-rows: 1

   * - Variable
     - Equation
     - Description
     - Source
   * - r2
     - -ap0*f2/ap1 - ap0*f3/ap1 - ap0*f4/ap1 - t1 + ap2*d2/ap1 + ap2*i1/ap1 + ap3*d3/ap1 + ap4*d4/ap1
     - Daily probability of remission into cat 2 from cat 1
     - System of equations
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
     - (1-sam_tx_coverage)*(1/time_to_sam_ux_recovery)
     - Daily probability of remission into cat 2 from cat 1 (untreated)
     - Nicole's calculations; also referred to as r2ux (get lit source!)
   * - r3
     - mam_tx_coverage * 1/time_to_mam_tx_recovery + (1-mam_tx_coverage)*(1/time_to_mam_ux_recovery)
     - Daily probability of remission from cat 2 into cat 3 (treated or untreated)
     - Nicole's calculations (get lit source!)
   * - r4
     - 0.001
     - Daily probability of remission from cat 3 into cat 4
     - Assumed to be small
   * - t1
     - sam_tx_coverage * (1/time_to_sam_tx_recovery)
     - Daily probability of remission into cat 3 from cat 1 (treated)
     - Nicole's calculations (get lit source!)
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


in terms of the following variables:

.. list-table:: Variables for transition probabilities
   :widths: 10 10 10 10
   :header-rows: 1

   * - Variable
     - Description
     - Equation
     - Notes
   * - :math:`d_i`
     - Death probability out of wasting category :math:`i`
     - :math:`1 - exp(-1 * (acmr + (\sum_{c\in diar,lri,msl,pem} emr_c*prevalence_{ci}) - csmr_c) * time_step)`
     - 
   * - :math:`f_i`
     - "Age-in" probability into :math:`cat_i`
     - Prevalence of wasting category i, pulled from GBD
     - These probabilities were chosen to maintain equilibrium of our system
   * - :math:`ap_0`
     - Adjusted prevalence of :math:`cat_0` (the reincarnation pool)
     - 1 - exp(-acmr * 1 / 365)
     - We set this equal to the number of simulants that die each time step
   * - :math:`ap_i` for :math:`i\in \{1,2,3,4\}`
     - Adjusted prevalence of :math:`cat_i`
     - :math:`f_i/(ap_0 + 1)`
     - All category "prevalences" are scaled down, such that the prevalence of cat 0 (the reincarnation pool) and the prevalences of the wasting categories sum to 1
   * - :math:`mam_tx_coverage`
     - Proportion of MAM (CAT 2) cases that have treatment coverage
     - 0.488
     - Potentially to be updated
   * - :math:`sam_tx_coverage`
     - Proportion of SAM (CAT 1) cases that have treatment coverage
     - 0.488
     - Potentially to be updated
   * - :math:`time_to_mam_ux_recovery`
     - Without treatment or death, average days spent in MAM before recovery
     - 63
     - Potentially to be updated
   * - :math:`time_to_mam_tx_recovery`
     - With treatment and without death, average days spent in MAM before recovery
     - 41.3
     - Potentially to be updated
   * - :math:`time_to_sam_ux_recovery`
     - Without treatment or death, average days spent in SAM before recovery
     - 60.5
     - Potentially to be updated
   * - :math:`time_to_sam_tx_recovery`
     - With treatment and without death, average days spent in SAM before recovery
     - 48.3
     - Potentially to be updated
   * - :math:`time_step`
     - Scalar time step conversion to days
     - 1
     -



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
     - The average duration of cause c
     - 10 days (for measles, diarrhea, and lri)
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

We now detail how the above wasting probability transition equations were derived.

.. todo::
  Consider adding all code for calculating above eqns.


As in the previous section, we solve our transition probabilities using a 
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
  c) :math:`π_{i}` ≥ 0 , these are GBD 2020 age/sex/location/year-specific prevalence for wasting categories 1-4, plus :math:`p0`, which will equal the number of people who die in a timestep


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

We have duration of treated and untreated sam and mam as well as coverage from the literature :   

  11) :math:`r_2 + d_1 = 1/duration\_cat_1`
  12) :math:`r_3 + i_1 + d_2 = 1/duration\_cat_2`
  13) :math:`i_2 + r_4 + d_3 = 1/duration\_cat_3`

where

 - Duration of cat 1: Dsam = C x Dsam_tx + (1-C)Dsam_ux ~ 40 days stand in value (will refine)
 - Duration of cat 2: Dmam = C x Dmam_tx + (1-C)Dmam_ux ~ 70 days stand in value (will refine)
 - Duration of cat 3: :math:`1 / (i_2 + r_4)`. ~ 365 days (will refine)
 - tx is treated
 - ux is untreated
 - C is treatment coverage proportion


.. todo::
    Check with Chris Troeger about the duration of cat3. Also see if Gates 
    Foundation has a way to calculate this from their KI database.

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

  dur_cat1, dur_cat2, dur_cat3, dur_cat4 = symbols('dur_cat1 dur_cat2 dur_cat3 dur_cat4')

  unknowns = [s1,s2,s3,s4,r2,r3,r4,i1,i2,i3,d1,d2,d3,d4,f1,f2,f3,f4]

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


  # # adding durations of states
  # r2 + d1 = 1/Dsam
  eq11 = [{r2:1, d1:1}, (1/dur_cat1)]

  # r3 + i1 + d2 = 1/Dmam
  eq12 = [{r3:1, i1:1, d2:1}, (1/dur_cat2)]

  # r4 + i2 + d3 = 1/Dmild
  eq13 = [{r4:1, i2:1, d3:1}, 1/dur_cat3]


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
  A1, x1, b1 = build_matrix([eq1,eq2,eq3,eq4,eq5,eq6,eq7,eq8,eq9,eq10,eq11,eq12,eq13],
                         unknowns)
  result_1 = sym.solve(A1 * x1 - b1, x1)


Finite state machine 2x4 
~~~~~~~~~~~~~~~~~~~~~~~~~

.. image:: wasting_state_2x4.svg





Data Description Tables
+++++++++++++++++++++++

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
    location_id=179,
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

..    :widths: 10 10 10 10
..    :header-rows: 1

..    * - Variable
..      - Description
..      - Equation
..      - Notes
..    * - :math:`d_i`
..      - Death probability out of wasting category :math:`i`
..      - :math:`1 - exp(-1 * (acmr + (\sum_{c\in diar,lri,msl,pem} emr_c*prevalence_{ci}) - csmr_c) * time_step)`
..      - 
..    * - :math:`f_i`
..      - "Age-in" probability into :math:`cat_i`
..      - Prevalence of wasting category i, pulled from GBD
..      - These probabilities were chosen to maintain equilibrium of our system
..    * - :math:`ap_0`
..      - Adjusted prevalence of :math:`cat_0` (the reincarnation pool)
..      - 1 - exp(-acmr * 1 / 365)
..      - We set this equal to the number of simulants that die each time step
..    * - :math:`ap_i` for :math:`i\in \{1,2,3,4\}`
..      - Adjusted prevalence of :math:`cat_i`
..      - :math:`f_i/(ap_0 + 1)`
..      - All category "prevalences" are scaled down, such that the prevalence of cat 0 (the reincarnation pool) and the prevalences of the wasting categories sum to 1
..    * - :math:`mam_tx_coverage`
..      - Proportion of MAM (CAT 2) cases that have treatment coverage
..      - 0.488
..      - Potentially to be updated
..    * - :math:`sam_tx_coverage`
..      - Proportion of SAM (CAT 1) cases that have treatment coverage
..      - 0.488
..      - Potentially to be updated
..    * - :math:`time_to_mam_ux_recovery`
..      - Without treatment or death, average days spent in MAM before recovery
..      - 63
..      - Potentially to be updated
..    * - :math:`time_to_mam_tx_recovery`
..      - With treatment and without death, average days spent in MAM before recovery
..      - 41.3
..      - Potentially to be updated
..    * - :math:`time_to_sam_ux_recovery`
..      - Without treatment or death, average days spent in SAM before recovery
..      - 60.5
..      - Potentially to be updated
..    * - :math:`time_to_sam_tx_recovery`
..      - With treatment and without death, average days spent in SAM before recovery
..      - 48.3
..      - Potentially to be updated
..    * - :math:`time_step`
..      - Scalar time step conversion to days
..      - 1
..      -
