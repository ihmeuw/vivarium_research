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
  ~~~~~~~~~~~~~~~
  Section Level 4
  ^^^^^^^^^^^^^^^
  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.

.. _custom_parameterized_draw:

.. role:: underline
    :class: underline

=========================================================
Custom parameterized draws
=========================================================

.. contents::
   :local:
   :depth: 2

Motivation behind custom parameterized draw feature
---------------------------------------------------

Historical behavior
+++++++++++++++++++

For GBD parameters with draw-level estimates (this notably excludes GBD covariate estimates), we have randomly selected a numbered draw between 0 and 999 and then used the corresponding value for each GBD draw-level parameter used in a simulation. The draw number used is reported to researchers who therefore can easily look up the specific parameter values used for that simulation run. Notably, we have not documented draw-level correlation patterns within GBD estimates to understand the potential implications of this strategy, but it is consistent with GBD methodology.

For parameters without draw-level estimates, including GBD covariate estimates and values obtained from the literature, we have randomly sampled a value from within the parameter's uncertainty distribution for each run of the simulation. The parameter value used for each simulation run has not historically been reported with simulation outputs, so researchers therefore cannot easily look up the specific values used for a given simulation run for parameters without draw-level estimates.

We have historically run several randomly sampled draws of our simulation to obtain a distribution of simulation results and often report the mean and 95% uncertainty intervals of this distribution as the main results for our models.

Problem space
+++++++++++++

We have run into computational resource constraints and running several draws for the same simulation (required in order to get a reasonably stable estimate of average simulation results using this historical methodology) can be computationally expensive.

Because researchers historically have not had a record of values sampled for parameters without draw-level estimates, when verification and validation criteria for these parameters are not met, it can be difficult to assess whether it is due to a bug or due to "unlucky" draw selection in which we have sampled parameter values that do not reflect the expected distribution due to random chance.

We historically have not had a easy or systematic way to assess which parameters primarily influence the magnitude of our simulation results. In other words, while we often present a Monte Carlo uncertainty interval, we have lacked a systematic way to analyze which combination of parameter values comprise the lower and upper ends of those intervals.

Custom draw parameterization
----------------------------

Feature description
+++++++++++++++++++

A feature in Vivarium that allows researchers to request and engineers to implement custom-selected (rather than randomly selected) values for each simulated parameter. These custom-selected parameter values for each simulation run should be recorded and made available for researchers to access.

Relative to the parameter's full set of draws or specified uncertainty interval, these requests may take the form of:

- Mean
- Median
- Minumum or maximum
- Some percentile (0.025, 0.1, 0.9, 0.975, etc.)
- Some specified point value (either within or outside of existing distribution)

Potential use cases
~~~~~~~~~~~~~~~~~~~

A single draw that uses the average value for all modeled parameters could be used throughout verification and validation, reducing computational resource requirements.

A single draw that uses the average value for all modeled parameters could be used to report an estimate of the average simulation results rather than the average of several randomly sampled draws when computational resources are extremely limited.

Allows for sensitivity analysis around parameter influence (e.g. `tornado diagrams <https://en.wikipedia.org/wiki/Tornado_diagram>`_), which can serve as additional simulation findings and sights of our models. This may allow us to make predictions about how simulation results may differ in similar locations to the modeled location that vary with respect to certain key influential parameters.

Challenges to consider
~~~~~~~~~~~~~~~~~~~~~~

Some parameter values may not be independent from other parameter values. Examples include:

- Categorical risk exposures must always sum to 1 across categories

- Population attributable fractions are a function of relative risk and risk exposure values

- The all-cause mortality rate is a function of cause-specific mortality rates

- Varying parameter values for younger age groups may have implications for older age groups that could cause lack of validation with respect to these parameters in the older age groups.

- Varying incidence and/or remission rates may make them no longer compatible with prevalence (and other possibilities for similar discontinuities)

There are not guarantees that the simulation results using the average value for all parameters approximates the average simulation result across many randomly sampled draws.

Selecting the "average" value for a parameter may be challenging in the case of skewed parameter distributions such as relative risks where the mean and median values differ.

For sensitivity analysis and tornado diagrams
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Our simulations contain a high number of parameters, so running multiple values for each parameter may be onerous and require significant computational resources.

Identifying reasonable upper and lower bounds for each parameter may be difficult. For instance,

- Selecting upper and lower 95% uncertainty intervals may bias our assessment of influential parameters towards parameters with more parameter uncertainty.

- Varying parameter values by some constant scalar value could test parameter values in implausible ranges.

- Custom-defined parameter values could be onerous and may be less directly comparable across parameters.

Protocol
++++++++

1. For all simulated parameters, researchers will define the "default" value within the defined uncertainty interval in the respective cause, risk, or intervention model document. This value should be equal to the median or mean value as appropriate. These default values should include clear instructions for how to calculate the default value of parameter values that are not independent, including:

  - :underline:`Categorical risk exposures`, suggestion: :math:`exposure_{TMREL} = 1 - \sum_{i}^{n-1} exposure_{cat_i}`

  - :underline:`Population attributable fraction`, suggestion: calculated according to specified risk exposure and relative risk values, with instructions for how to perform calculation (:math:`\frac{\bar{RR} - 1}{\bar{RR}}`)

2. Unless otherwise specified or requested, engineers will run simulations using a single draw that selects this specified default value for all simulated parameters. 

3. Researchers will specify deviations from default parameters in the model versions table in a given concept model document.

.. todo::

  Researchers and engineers to align a desired format for these requests.