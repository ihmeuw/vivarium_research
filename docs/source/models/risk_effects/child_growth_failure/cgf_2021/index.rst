.. _2021_risk_effect_cgf:

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

======================================
Child Growth Failure Risk Effects 2021
======================================

.. contents::
   :local:
   :depth: 2

Risk Overview
-------------

Child growth failure (CGF) is estimated using three risk exposures: stunting or low height 
for age (HAZ), wasting or low weight got height (WHZ), and underweight or low weight for 
age (WAZ). 

The risk effects are found for each of these risk exposures based on categorical 
definitions using the WHO 2006 growth standards for children 0-59 months. 
They are: mild (<-1 to -2 Z score), moderate (<-2 to -3 Z score), and severe 
(<-3 Z score).

All three metrics are a measure of acute malnutrition and are associated with increased 
mortality and susceptibility to infectious disease. More information can be found in 
the :ref:`CGF risk exposure model document <risk_exposure_child_growth_failure>`. 

GBD Modeling Strategy
----------------------

In the GBD 2021 model, there were significant changes from the prior 2019 risk effects. 
Prior GBD models used a simulated joint distribution of stunting, underweight, and wasting 
measures from the [Olofin_2013]_ meta-analysis. 

In GBD 2021, GBD created age-specific joint distributions of stunting, underweight, and 
wasting measures from 15 longitudinal studies (from 26 locations) in the Bill and Melinda 
Gates Foundation’s Knowledge Integration (Ki) database. The RR adjustment method was 
also strengthened in GBD 2021 by constraining optimisation in two ways. These changes 
result in a couple of differences relevant to our simulation: 

#. There are now separate RR values for incidence and mortality 
#. Malaria was identified as an affected cause 

The incidence and mortality RR values from GBD are for incidence and CSMR. For this model, 
we will convert to incidence and EMR relative risks. More information on this conversion is 
below. 

In order to account for the high degree of correlation between CGF indicators, GBD used a 
constrained optimisation method to adjust the observed univariate RRs that come out of the 
Burden of Proof analysis. Using a joint distribution of stunting, underweight, and wasting, 
they generated one thousand RR draws for each univariate indicator and severity. Then they 
altered these univariate RRs for each causes based upon interactions among the CGF indicators. 
This means that the resulting RRs are independent of other CGF risks. 

Vivarium Modeling Strategy
--------------------------

For the :ref:`nutrition optimization model <2021_concept_model_vivarium_nutrition_optimization>`, 
there are separate relative risks for the three components of child growth failure: HAZ, WAZ, and 
WHZ. Relative risks are categorical. 

These risk exposures affect four causes: diarrheal diseases, LRIs, malaria, and measles. 
Additionally, these relative risks vary by simulant age. The age categories are: 1 to 5 months, 
6 to 11 months, 12 to 23 months, and 2 to 4 years. Note that for simulants less than one month 
of age, the risk effects are caused by LBWSG not CGF and so are not included here. Additionally, 
there are separate relative risks for incidence and mortality. 

Therefore, a simulant's relative risk value is dependent on: the risk exposure variable 
(e.g., WAZ), the simulant's risk exposure category (e.g., moderate), the cause (e.g., malaria) 
and cause metric affected (e.g., incidence), and the simulant's age (e.g., 6-11 months). 
Putting this together, a single relative risk might be the RR for **WAZ** on **malaria incidence** 
for a simulant in the **moderate** exposure category who is **6-11 months** old. 

For stunting and underweight, relative risk values can be pulled using the following code::

  rrs = get_draws(gbd_round_id=7, year_id=2021, gbd_id_type='rei_id', gbd_id=[241,240,94], source='rr', decomp_step='iterative')

Wasting relative risks will be generated separately to accomodate the sub-exposures in the 
MAM (cat2) category in our :ref:`wasting risk exposure model <2021_risk_exposure_wasting_state_exposure>`. 
Until these relative risk estimates are available, assume wasting relative risks consistent
with those pulled from GBD with both MAM sub exposures ("Better" MAM/cat2.5 and "Worse" MAM/cat2.0) 
having the same relative risk values as the overall MAM category cat2.

.. todo::

   Generate and link custom wasting RR values

The mortality relative risk values will then need to be adjusted. The GBD values are for CSMR, 
but we will use EMR. To adjust between CSMR and EMR values, you can use this equation: 

.. math::
   
   \text{EMR RR_cause,i} = \frac{\text{CSMR RR_cause,i}}{\text{incidence RR_cause,i}}

We have validated this equation in two ways. First, we checked this mathematically. 
Using equations for incidence, EMR, and prevalence based on information we knew in the 
model, we found an equation for EMR relative risk. We tested this equation and found 
that the answer was almost identical to the equation shown above. The math 
proof for this can be found :download:`in this word doc <cgf_risks_math.docx>`.

Secondly, we created a `nano simulation <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/cgf_nanosim/cgf_nanosim_v3.ipynb>`_ to test that by using the equation above and 
applying the EMR and incidence relative risks to the simulated population, that the 
resulting CSMR relative risk was about what we expected. The notebook validated this 
approach and was able to reproduce the expected CSMR RR with some noise. 

There are some cases where the CSMR RR is less than the incidence RR value. This will then 
create an EMR RR less than one - or a protective effect from CGF to disease survival. There
are also some cases in which the GBD estimate of the incidence RR is less than one. While 
this is counterintuitive, we are allowing for this case to be in the model. We expect this 
is due to a lack of statistical significance in creation of RR values which will be accounted 
for in our monte carlo uncertainty. 

PAFs will be calculated separately to account for the correlation between wasting, 
stunting, and underweight risk exposures as a single joint PAF for CGF. Draw-level
PAF values are available below:

- `Ethiopia CGF PAF values <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/cgf_correlation/ethiopia/pafs_3.csv>`_

   - `Ethiopian PAF values calculated here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/cgf_correlation/ethiopia/CGF%20correlation%20data%20generation.ipynb>`_

- `Pakistan CGF PAF values <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/cgf_correlation/pakistan/pafs_3.csv>`_

   - `Pakistani PAF values calculated here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/cgf_correlation/pakista /CGF%20correlation%20data%20generation.ipynb>`_

- `Nigeria CGF PAF values <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/cgf_correlation/nigeria/pafs_3.csv>`_

   - `Nigerian PAF values calculated here <https://github.com/ihmeuw/vivarium_research_nutrition_optimization/blob/data_prep/data_prep/cgf_correlation/nigeria/CGF%20correlation%20data%20generation.ipynb>`_

.. note::

   There are some draws for which the PAF is negative. This happens because the 
   relative risk values for some draws are less than one. We should use these 
   values regardless as part of our Monte Carlo analysis.

With the RR and PAF values above, the following equations can be used to calculate 
simulant level incidence and EMR. 

.. math::

   incidence_\text{cause,i} = incidence_\text{cause} * (1 - PAF_\text{CGF,cause}) * RR_\text{HAZ,cause,i} * RR_\text{WAZ,cause,i} * RR_\text{WHZ,cause,i}

Where the relative risk value will depend on the simulant's age group and risk exposure category. 

.. math:: 

   EMR_\text{cause,i} = EMR_\text{cause} * (1 - PAF_\text{CGF,cause}) * RR_\text{HAZ,cause,i} * RR_\text{WAZ,cause,i} * RR_\text{WHZ,cause,i}

Note that since the RR values from GBD are independent, we multiply them together here without 
double counting the CGF relative risks. 

Validation and Verification Criteria
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Verification and validation criteria from the diarrheal diseases, malaria, mealses and LRI cause models should remain true.
#. Verification and validation criteria from the child growth failure exposure model should remain true.
#. Relative risk values should approximately match what is expected for incidence and mortality from each cause. 

Assumptions and Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. We assume that converting to EMR relative risks from the GBD supplied CSMR relative risks will work for all combinations of RRs, incidences, risk exposures, etc. We believe this is true based on the nano sim and math proof above. 
#. We assume that the duration of illness will be the same for all simulants. It is possible that wasted, stunted, or underweight children might have lower immune function and therefore take longer to recover from an illness. This would lead to a longer duration. We do not include this in our model. 
#. Some EMR RR values might be less than 1 when the CSMR RR is less than the incidence RR. This is counterintuitivebut we allow it in the model since we think this is due to a lack of statistical significance in creation of RR values which will be accounted for in our monte carlo uncertainty. 

References
----------

.. _risk_factors_methods_appendix: https://www.thelancet.com/cms/10.1016/S0140-6736(20)30752-2/attachment/54711c7c-216e-485e-9943-8c6e25648e1e/mmc1.pdf

.. [Olofin_2013]
   Olofin I, McDonald CM, Ezzati M, et al. Associations of Suboptimal Growth with All‐Cause and Cause‐
   Specific Mortality in Children under Five Years: A Pooled Analysis of Ten Prospective Studies. PLOS ONE
   2013; 8: e64636
