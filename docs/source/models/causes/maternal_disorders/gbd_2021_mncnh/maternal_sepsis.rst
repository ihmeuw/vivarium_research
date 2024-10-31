.. _2021_cause_maternal_sepsis_mncnh:

=============================================
Maternal sepsis and other maternal infections
=============================================

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

The goal of the maternal sepsis model is to capture YLLs and YLDs due to
maternal sepsis among women of reproductive age. We only model maternal
sepsis among simulants who give (live or still) birth after a full term
pregnancy. This page documents how to model the baseline burden of
maternal sepsis. Other simulation components such as azithromycin and
c-sections will affect the rates of maternal sepsis; such effects will
be described elsewhere.

Modeling Strategy Details
+++++++++++++++++++++++++

Since the MNCNH Portfolio project does not model the passage of time, we
will not model maternal sepsis as a dynamic state transition model.
Rather, all "transitions" in the model will be modeled as decisions made
during a single timestep. To obtain the decision probabilities of each
incident case or maternal sepsis death, we will convert GBD's annual
incidence and mortality rates among women of reproductive age into event
rates *per birth* (including stillbirths). We will use the counts of
deaths to calculate YLLs, and we will use the counts of incident cases
to calculate YLDs.

Assumptions and Limitations
+++++++++++++++++++++++++++

Cause Model Diagram
+++++++++++++++++++

Data Tables
+++++++++++

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
