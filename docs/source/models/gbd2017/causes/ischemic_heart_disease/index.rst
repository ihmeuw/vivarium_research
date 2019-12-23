.. _2017_cause_ischemic_heart_disease:

======================
Ischemic Heart Disease
======================

Disease Description
-------------------

Ischemic heart disease (IHD) is a non-communicable cardiovascular disease which occurs when the arteries of the heart cannot deliver enough oxygen-rich blood to the heart. Since 1990, this disease has been a leading cause of global Years of Life Lost (YLL). GBD 2017 listed IHD as the leading cause of YLLs globally, with a mean percentage increase in 3.9% in all-age YLL rate since 2007. According to NIH_, IHD is also known as Coronary Artery Disease, Coronary Heart Disease, Coronary Microvascular Disease. Symptomps and complications can vary by person, even if they have the same type of ischemic heart disease. Reported symptoms vary whether a person is experiencing an acute coronary event, such as a heart attack, or has chronic IHD. Symptoms may get worse as the buildup of plague continues to narrow the coronary arteries.

Acute coronary events may cause symptoms such as angina, cold sweats, dizziness, nausuea, neckpain, shortness of breath, sleep disturbances, or weakness. 

Chronic ischemic heart disease can cause signs and symptoms such as angina, anxiety or nervousness, fatigue, or neckpain. 

.. _NIH: https://www.nhlbi.nih.gov/health-topics/ischemic-heart-disease


Modeling Ischemic Heart Disease (IHD) in GBD 2017
-------------------------------------------

Myocardial infarction (MI) in GBD 2017
++++++++++++++++++++++++++++++++++++++

GBD 2017 models IHD using Myocardial infarction (MI) sequelae to estimate the prevalence of IHD, due to the challenges of disease detection and varying symptoms across the population.


1. Acute myocardial infarction (MI): Definite and possible MI according to the third universal
definition of myocardial infarction:

a. When there is clinical evidence of myocardial necrosis in a clinical setting consistent with
myocardial ischemia or
b. Detection of a rise and/or fall of cardiac biomarker values and with at least one of the following: 
  i. symptoms of ischaemia, 
  ii. new or presumed new ST-segment-T wave changes or new left bundle branch block, 
  iii. development of pathological Q waves in the 277 ECG, 
  iv. imaging evidence of new loss of viable myocardium or new regional wall motion abnormality, or 
  v. identification of an intracoronary thrombus by angiography or autopsy.
c. Sudden (abrupt) unexplained cardiac death, involving cardiac arrest or no evidence of a noncoronary cause of death
d. Prevalent MI is considered to last from the onset of the event to 28 days after the event and is divided into an acute phase (0–2 days) and subacute (3–28 days).

2. Chronic IHD
a. Angina; clinically diagnosed stable exertional angina pectoris or definite angina pectoris
according to the Rose Angina Questionnaire, physician diagnosis, or taking nitrate
medication for the relief of chest pain.
b. Asymptomatic ischemic heart disease following myocardial infarction; survival to 28 days
following incident MI. The GBD study does not use estimations.

A systematic review for myocardial infarction was not performed for GBD 2017. Updates to systematic
reviews are performed on an ongoing schedule across all GBD causes; an update for myocardial infarction
will be performed in the next one to two iterations.
A systematic review was done for myocardial infarction for GBD 2015. The search strings used were
extensive; a full list will be provided on request.
The dates of the search were 1/1/2009 に 2/3/2015. 38,522 studies were returned; 194 were extracted
(this number includes extractions that were done for STEMI/NSTEMI models and revascularisation models
that are not currently part of the MI modelling process but may be in the future).
A systematic review for myocardial infarction was also done for GBD 2013. The extensive search terms for
that review will be provided on request. 

Vital registration, verbal autopsy data were used to model ischaemic heart disease in GBD 2017. The model outliered verbal
autopsy data in countries and subnational locations where high-quality vital registration data were also
available. The model also outliered non-representative subnational verbal autopsy data points, ICD8 and ICD9
BTL data points which were inconsistent with the rest of the data and created implausible time trends,
and data in a number of Indian states identified by experts as poor-quality. 
[GBD-2017-YLD-Capstone-Appendix-1-Ischemic-Heart-Disease]_

Cause Model Diagram
--------------------
.. image:: ischemic_heart_disease_transitions.svg
  :width: 150


Data Description
----------------

.. todo::

   Add tables describing data sources for the Vivarium model.


Model Assumptions and Limitations
---------------------------------

Apart from inpatient hospital and inpatient claims data, GBD 2017 did not include any data from sources other than the literature for myocardial infarction. Given this information, the assumption is that MI is the best and only estimator for the IHD model. The limitation of this assumption and approach is the exclusion of non-MI data sources could be underestimating the IHD model. 

Restrictions
++++++++++++
.. todo:: 

    Restriction type (Yll only, YLD only, YLL age start, YLL age end, YLD age start, YLD age end, male only, female only). 
    Value (True, False, 5, 255, 13, No)

.. todo::

   Describe more assumptions and limitations of the model.


Validation Criteria
-------------------

.. todo::

   Describe tests for model validation.


References
----------

.. [GBD-2017-YLD-Capstone-Appendix-1-Ischemic-Heart-Disease]
   Supplement to: `GBD 2017 Disease and Injury Incidence and Prevalence
   Collaborators. Global, regional, and national incidence, prevalence, and
   years lived with disability for 354 diseases and injuries for 195 countries
   and territories, 1990–2017: a systematic analysis for the Global Burden of
   Disease Study 2017. Lancet 2018; 392: 1789–858 <DOI for YLD Capstone_>`_
   (pp. 335-341)


