Delivery Facility Choice Model
==============================


[[Causal model diagram]]

Description of "instrisic correlation" of propensities for ANC, home delivery, and LBWSG
----------------------------------------------------------------------------------------

We hypothesize that there are important "common causes" of nodes in the diagram above.  For example, having a home delivery and having no ANC visits might both be influenced by rurality --- if all health services are offered far away, it is logical that people will be able to access them less.
Similarly, it is likely that there are social exclusion factors causeing both exposure to LBWSG risk and lack of access to ANC and in-facility birth.
In a simulation model where we have not included scenarios that change these factors, we do not have to model their effects explicitly.
For our purposes, it is sufficient to capture the correlations between ANC, in-facility birth, and LBWSG risk exposure.
In Vivarium, this is best accomplished using a Gaussian copula to induce correlations between the propensities of these three nodes.

Conditional probabilities of home delivery when (1) believe preterm and (2) believe full term
---------------------------------------------------------------------------------------------

In addition to correlation, there is an essential theory that a belief about preterm status is influential in the decision to have a home delivery.  We will model this as a conditional probability of home delivery given a belief about preterm status.  

Challenge of calibrating the model
----------------------------------

We have developed a nonlinear optimization model to find a consistent set of parameters for the Gaussian copula and the conditional probabilities.
It will be described in detail here.

Link to code implementing it, too.


Range of propensity and probabilities (and probability gaps) that are consistent with existing data
----------------------------------------------------------------------------------------------

An important result of this optimization was to determine that the system is underdetermined.  With the existing data we have available, there are a range of consistent values for the propensity and probability parameters.  This section explores the tradeoffs between the parameters, to guide us in setting appropriate values.