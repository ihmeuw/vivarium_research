.. _models_intervention:

======================
Modeling Interventions
======================

Many of our Vivarium simulations are designed to measure the effects of
a hypothetical intervention on a simulated population. Such
interventions are described by an intervention model document. Like a
cause model document, a risk exposure model document, or a risk effects
model document, the goal of an intervention model document is to
organize the complexity of the model so that others can understand it:
The simulation researcher is responsible for communicating in writing
how the intervention model should function, with sufficient detail so
that (1) the engineer can implement the model in Vivarium; and (2) other
researchers can understand what was done, including the strengths and
weaknesses of the approach and how to verify and validate the results.
This page describes in more detail what should go into an intervention
model document.

.. contents::
  :local:

General guidelines
------------------

When writing an intervention model document (or any other component
model document for Vivarium), you must include the following details to
allow a software engineer to implement the model:

* Attributes of a simulant that are required for modeling the
  intervention (e.g. age, sex, and systolic blood pressure level for a
  model of anti-hypertensive medications);

* Attributes of a simulant that will be added by this model component
  (e.g. current prescription, adherence status, last-measured SBP
  level, and untreated SBP level;

* How to initialize the attributes added by this model when a new
  simulant is instantiated;

* How to update the attributes (including both required and added
  attributes) during each simulation time-step.

We have developed a template for intervention model documents, which
can help organize a complex model, and the remainder of this document
describes what a researcher might include for each section when using
:ref:`this template <intervention_model_template>`.
An example intervention model document that uses this template is the
:ref:`latent tuberculosis treatment intervention <intervention_latent_tuberculosis_treatment>`.

Key questions to address
------------------------

This  template aims at making sure basic aspects of an intervention are
understood and written out so that the SWE team has a clear idea of
expectations and the Researchers and SWEs do not need to go back and
forth about clarifying these details throughout the project. Questions
we need to answer about intervention early in research process (to be
agreed upon with the client):

Research aims and objectives
++++++++++++++++++++++++++++

Outcomes the intervention affects
+++++++++++++++++++++++++++++++++

Effect sizes and definitions
++++++++++++++++++++++++++++

Potential confounders and mediators
+++++++++++++++++++++++++++++++++++

Limitations
+++++++++++

The structure of an intervention model document
-----------------------------------------------

Intervention overview
+++++++++++++++++++++

This section should include a brief description of the intervention to
be modeled.  It is often useful to distinguish between an
"intervention technology" and an "intervention implementation".  For
example, **Vitamin A Supplementation (VAS)** is an example of an
intervention technology, and **Scaling Up Coverage of VAS** is an example
of an intervention implementation.  We often compare scenarios with
alternative intervention implementations, to see how different
strategies for implementing an intervention technology might result in
different impacts on population health.

This section does not need to be long; one or two paragraphs with
carefully selected links for a reader who needs to learn more will
often suffice.

Baseline coverage
+++++++++++++++++

An essential detail in any intervention model document is how to
initialize the attributes added by the model when a new simulant is
instantiated.  In the case of a Vitamin A Supplementation model, this
could take the form a single coverage percentage, applied
independently to each simulant.  Even this has some complexity,
however, because the coverage percentage is not known precisely and its
uncertainty might be quantified by some probability distribution; and
it is sure to vary by location and over time.

In a more complex intervention model, the baseline coverage section
would describe a relationship between the simulant's attributes that
are required from other models and the attributes that will be added
by this model component.  For example, an intervention model document
for anti-hypertensive medications might specify a model for the joint
probability that a simulant was at each point in their treatment ramp
and was/was not adherent to their prescribed treatment, as a function
of their age, sex, and measured SBP by providing the betas of a
multinomial regression fit to NHANES data.

Vivarium Modeling Strategy
++++++++++++++++++++++++++

This section will go into detail about how to represent the intervention
technology and the intervention implementation in Vivarium.  It can
begin with a high-level summary of just one paragraph, e.g. "The
treatment model links anti-hypertensive treatments to an additive
shift in SBP level, which has a ripple effect on IHD and other causes
which have DALYs due to SBP."

Intervention effects
++++++++++++++++++++

This section must describe precisely what the intervention effects are
and how the affected outcomes should be modified by the
intervention. It is often complicated because there is some baseline
level of treatment which is already present in the population-level
estimates from GBD, and therefore some amount of "treatment deletion"
is necessary. For example, if the population mean SBP (for a specific
time, location, age, and sex) is 140 and 45% of the population is
treated, then the intervention effect for untreated simulants would be
to increase their SBP to counterbalance the intervention effect for
treated simulants.

This is where any relationship between prescription, adherence, and
outcomes can be described precisely, as well.


The treatment algorithm
+++++++++++++++++++++++

This section is where the researcher can describe how to update the
attributes added by this model component. We have found that a
decision tree can be a good way to communicate this with engineers and
outside researchers.  In a decision tree, each node represents a thing
that might happen during a simulation time step (such as "visit
clinic?" or "get SBP measured?") and the arrows out of each node
represent whether it did indeed happen, leading to a terminal node
describing how the simulant's attributes are changed because of the
treatment.  (Typically the changes are to the attributes added by this
model, e.g. prescription and adherence, not the attributes required
from other models.)

Example: somebody goes to the doctor (start of treatment algorithm) ;
treatment changes or doesn't change (end of treatment algorithm).

Assumptions and limitations
+++++++++++++++++++++++++++

This is a good place to capture all the things that might go into a
limitations paragraph in a paper presenting results from a Vivarium
model that includes this intervention model as a component.

Validation and verification criteria
++++++++++++++++++++++++++++++++++++

The software engineers seem to really appreciate having some idea
ahead of time what we on the research side will be looking for to see
if this model is working. It is a good practice for us to think it
through ahead of time, too.


Examples of intervention model documents
----------------------------------------

A library of intervention model documents used for Vivarium simulations can be found :ref:`here <intervention_models>`.


Data sources for intervention models
------------------------------------

NHANES

MarketScan

FlatIron

Published Literature

Cochrane Review
