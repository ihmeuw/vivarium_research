.. _2017_cause_diarrhea:

==================
Diarrheal Diseases
==================

Disease Description
-------------------

We follow GBD 2017 and "defined diarrhoeal disease episodes as three
or more loose stools in a 24-hour period." (p. 88 of
[GBD-2017-YLD-Capstone-Appendix-1]_).

.. todo::

   Adapt additional material from GBD capstone and other sources, e.g. [WHO]_,
   [CDC]_, [Wikipedia]_, [GBD-2017-YLD-Capstone-Appendix-1]_

Modeling Diarrheal Diseases in GBD 2017
---------------------------------------

According to the [GBD-2017-YLD-Capstone-Appendix-1]_, "There are no
major modelling updates from GBD 2016," (p. 93) and "self-reported
prevalence is the reference category" (p. 88).

.. todo::

   Add more context regarding GBD 2016 model for people who are not familiar.

Regarding the duration of a bout of diarrhea, "the mean duration was
the duration in days, an average of 4.3 (4.2 4.4)". (p. 89, based on a
paper referenced there).
For GBD 2017, the remission period was modeled as 5 days.
Since this assumption gets into the DisMod
model, we will use the remission rate that comes from DisMod.

The GBD 2017 adjusted for seasonal variation in diarrheal disease, but
we have not attempted to include this variation in Vivarium yet. (p. 89)

There is substantial additional effort in GBD to divide diarrhea
burden into the aetiologies of diarrhea, but we have not included
aetiologies in this simple model.  The non-fatal model is severity
split based. In our model, every individual will have the average
severity for their age/sex/location/year.

.. todo::

   Add relevant detail about diarrheal diseases modeling process from
   the CoD Appendix.

Cause Model Diagram
-------------------

.. image:: DD_cause_model.svg


S: _S_usceptible to diarrheal diseases

I: _I_nfected and currently experiencing a diarrheal disease bout


Data Descriptions
-----------------
	 
	 
.. list-table:: State definitions and initialization
   :widths: 5 30
   :header-rows: 1

   * - State
     - Definition
   * - I
     - Currently has diarrheal disease.
   * - S
     - Does not currently have diarrheal disease.
	 
.. csv-table:: Prevalence
   :header: State,Prevalence,Source
   :widths: 5, 10, 10
   :stub-columns: 0

   I,prev_302,como
   S,1-prev_302,NA

prev_302 = get_draws("cause_id", 302, source = "como", measure_id = 5, gbd_round_id = 5)

.. csv-table:: Transitions
   :header: Transition,Rate (per person-year),Source, Note
   :widths: 10, 20, 10, 30
   :stub-columns: 0

   I -> S,rem_302,epi,Already a rate within with-condition population
   S -> I,inc_302/(1-prev_302),como,We transform incidence to be a rate within the susceptible population.

inc_hazard_302 = get_draws("cause_id", 302, source = "como", measure_id = 6, gbd_round_id = 5)
rem_302 = get_model_results(gbd_team='epi', gbd_id=1181, gbd_round_id=5, measure_id = 7)



.. csv-table:: Excess Mortality Rate
   :header: State,EMR,source
   :widths: 5, 10, 10
   :stub-columns: 0

   I,(deaths_302/pop)/prev_302,codcorrect
   S,0,NA

deaths_302 = get_outputs("cause", cause_id = 302, measure_id = 1, metric_id = 1, gbd_round_id = 5)

.. csv-table:: Disability Weights
   :header: Severity level, DW (95% CI),Proportion of estimated diarrhea
   :widths: 10, 20, 10
   :stub-columns: 0

   Mild,0.0074 (0.049-0.104),.648
   Moderate,0.188 (0.125-0.264),.289
   Severe,0.247 (0.164-0.348),.069

Note, the above proportions sum to 1.006. These numbers come from the appendix
model writeup [GBD-2017-YLD-Capstone-Appendix-1]_. The severity splits come from a
meta-analysis on severity independent from the DisMod estimates. They splits are then
applied to the prevalence and incidence estimates, in order to calculate YLDs by sequela and
etiology.

.. todo::

	Look into what severity splits were actually used.


.. todo::

	Figure out how to typeset tables, such that they can include the fn calls

Validation Criteria
-------------------

.. todo::

   Describe tests for model validation.

References
----------

.. [WHO] Diarrheal disease Fact Sheet. World Health Organization, 2 May 2019.
   Retrieved 14 Nov 2019.
   https://www.who.int/news-room/fact-sheets/detail/diarrhoeal-disease

.. [CDC] Diarrhea: Common Illness, Global Killer.
   https://www.cdc.gov/healthywater/global/diarrhea-burden.html

.. [Wikipedia] Diarrhea. From Wikipedia, the Free Encyclopedia.
   Retrieved 14 Nov 2019.
   https://en.wikipedia.org/wiki/Diarrhea

.. [GBD-2017-YLD-Capstone-Appendix-1]
   Supplement to: `GBD 2017 Disease and Injury Incidence and Prevalence
   Collaborators. Global, regional, and national incidence, prevalence, and
   years lived with disability for 354 diseases and injuries for 195 countries
   and territories,    Disease Study 2017. Lancet 2018; 392: 178   (pp. 88-94)

   (Direct links to the YLD Appendix hosted on Lancet.com_ and ScienceDirect_)

.. _Lancet.com: `YLD appendix on Lancet.com`_
.. _ScienceDirect: `YLD appendix on ScienceDirect`_

.. _YLD appendix on Lancet.com: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32279-7/attachment/6db5ab28-cdf3-4009-b10f-b87f9bbdf8a9/mmc1.pdf
.. _YLD appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322797-mmc1.pdf
.. _DOI for YLD Capstone: https://doi.org/10.1016/S0140-6736(18)32279-791990
