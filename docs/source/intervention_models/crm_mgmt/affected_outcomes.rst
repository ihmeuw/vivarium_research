.. _intervention_crm_mgmt_affected_outcomes:


Affected Outcomes
*****************

Affected outcome - Outreach effect on adherence

A simulant receiving the outreach intervention is twice as likely to be adherent. [Describe the distribution; introduce uncertainty]
.. todo:: 
insert link to adeherence attribute documentation.
age/year/sex specific adherence [VITAMIN A DEFICIENCY; prepping the data]
Compare propensity to X
If enrolled 
***From their starting propensity double the probability that they are 80% adherent***

We assume that all simulants, if prescribed medication, will begin taking it (initiation = 100%). Not all simulants will be be adherent (defined as PDC>=80%). We further assume that all simulants who are adherent will receive the full effect of their medication and that non-adherent simulants will receive no benefit from the medication that they do take. 

For each level in the hypertension treatment ramp
If non-adherent (PDC<0.8), then SBP = untreated SBP
If adherent (PDC>=0.8), then SBP\ :sub:`level[i]` = untreated SBP – medication\ :sub:`level[i]` 

For each level in LDL-c treatment options
If non-adherent (PDC<0.8), then LDL-c = untreated LDL-c
If adherent (PDC>=0.8), then LDL-c\ :sub:`level[i]` = untreated LDL-c – medication\ :sub:`level[i]` 

Draw from normal distribution with mean +/ SD, apply change to simulant

.. todo::

  Consider updating assumption around initiation of treatment. 
  Consider relaxing assumptions about adherence and medication effectiveness - e.g., 0-49% PDC would receieve no effect of medication, 50-79% PDC would receive 50% effect of medication, >=80% would receive full effectiveness. 
  

Affected Outcome #1 - SBP
+++++++++++++++++++++++++

Links to documentation for relevant risk pages

* :ref:`See SBP risk exposure documentation <2019_risk_sbp>`

* :ref:`See SBP risk effect documentation <2019_risk_effect_sbp>`

SBP: the intervention will affect the level of exposure of a simulant to SBP level at a given time step. SBP is a continuous exposure, ranging from 90 to 200 mm Hg, based on age and sex.

Affected Outcome #1 Restrictions: restrictions can be found in the risk exposure documentation linked above; there are no additional restrictions for the interventions described in this document.

.. list-table:: Affected Outcome #1 Effect Size
  :widths: 15 15 15 
  :header-rows: 1

  * - Population
    - Effect size
    - Note
  * - All
    - Effect of intervention on adherence OR: 2.3
    - Outreach intervention
  * - All
    - Effect of intervention on adherence OR 1.5
    - Lifestyle intervention
  * - All
    - Effect of intervention on adherence OR 3
    - Polypill intervention    


.. todo::

  Some people won’t take the medication (assuming 100% initiation; lack of adherence) 
  Some people will take it for only some amount of time (adherence status = non adherent)** Future work [contribute to efficacy/effectiveness treatment gap]
  For people taking their med, this is how the sim should change their exposure (adherence status = adherent) [assume clinical trial efficacy]

  Describe exactly *how* to apply the effect sizes to the affected measures documented above in zenon we did something like your first proposal where people had some probability of being adherent, and were adherent or not which was unvarying