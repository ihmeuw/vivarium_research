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

Regarding the duration of a bout of diarrhea, "the mean duration was
the duration in days, an average of 4.3 (4.2 4.4)". (p. 89, based on a paper referenced there)

The GBD 2017 adjusted for seasonal variation in diarrheal disease, but
we have not attempted to include this variation in Vivarium yet. (p. 89)

There is substantial additional effort in GBD to divide diarrhea
burden into the aetiologies of diarrhea, but we have not included
aetiologies in this simple model.

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

.. todo::

   Add tables describing data sources for the Vivarium model.

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
