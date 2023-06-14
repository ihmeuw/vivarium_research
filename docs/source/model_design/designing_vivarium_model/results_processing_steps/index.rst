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

.. _vivarium_best_practices_results_processing:

=================================================================
Vivarium Verification and Validation (V&V) and Results Processing
=================================================================

.. contents::
   :local:
   :depth: 2

Verification and validation
---------------------------

Verification and validation (V&V) is the process by which we check that Vivarium models
are behaving as we expect.

This can be split into verification (checking that the model approximately replicates target values it
was explicitly designed to replicate) and validation (checking that the model results are sensible,
e.g. by comparing to a real-life data source not used by the model).

.. _vivarium_v_and_v_process:

The V&V process
---------------

The current standard process for verification and validation (V&V) goes roughly as follows:

#. Researchers write documentation for features and components they would like to be present in
   the simulation, organized into model numbers.
   Generally, they include in this documentation a description of how they will V&V the results.
#. Software engineers implement these features and components in order by model number.
   When they complete implementation of a model number, they run the simulation and send the researchers
   (the file path of) the results.
   We sometimes call these results "count data" because the file path ends with :code:`count_data`.
#. Researchers use the results to assess whether new features and models are behaving as expected.
   Additionally, researchers check for regressions in previously implemented behavior; generally, this is
   done by re-running the V&V checks from previous model numbers on the latest results.
   These checks are usually made by graphing relevant quantities and comparing them to targets visually.
#. Researchers report any findings that need to be addressed.
   Sometimes these are bugs (the model does not do what the docs say), which are reported to the engineering team.
   Sometimes they are deeper issues with the model design (doing what the docs say does not give sensible results),
   which require some further research effort to address before they can be documented and handed off to the engineering team.
#. The engineering team makes any required updates and generates another set of results.
   The file path is sent to the researchers, who verify that the fixes have addressed the issues.
   The process repeats.

.. note::
  Sometimes, instead of simulation **results** being used in V&V, the researcher runs the latest version
  of the simulation themselves.
  See the `Interactive simulation`_ section below for more details.

.. note::
  Often, simulation runs for V&V can be smaller than the runs used for final results.
  Specifying a population size and number of draws separately for V&V can reduce the runtime and computational
  resource requirements.

Tips on how to do V&V and results processing
--------------------------------------------

These are some non-exhaustive tips and tricks!

General things to check/keep in mind
++++++++++++++++++++++++++++++++++++

- **Confirm that there are no failed jobs.** The software engineers should check this, but it can be a source of trouble if it is not caught. If there are draw/seed combinations that completed for some scenarios and not others, then the common random numbers will not be enforced across scenarios and results will not be as accurate as expected (outcomes may not exactly match across scenarios when they are expected to).

- **Confirm that you understand what the outputs (and artifact values) represent.** These sorts of misunderstandings can sometimes be the cause of researcher-suspected V&V issues, when really the outputs may meet the V&V targets but they are being interpreted incorrectly. The software engineers are the best resources here! Remember that artifact values generally represent suspectible population incidence rates while GBD values represent total population incidence rates.

- Generally, **all calculations should be done at the draw-specific level** (including calculations of the *differences* between scenarios). Then, once the desired output is calculated at the draw-specific level, take the mean, 2.5th percentile, and 97.5th percentile to generate an overall mean estimate and 95% uncertainty interval. Note that in some situations median values may be desired over means and other uncertainty intervals (such as 90% or 80%) may be desired over 95%.

- Remember that simulation input data are generally age and sex specific, so it's generally easiest to perform verification of simulation inputs and outputs at the age and sex specific level. However, especially if simulating across many years (which may result in slight changes in the population structure over time), be sure to also **evaluate total population outcome rates as well as age- and sex-specific rates**.

- If something is not verifying, but is close to the target, it could be due to stochastic variation. Check and see if it gets closer when you pool across all scenarios, all ages, etc. If so, stoachstic variation could be to blame for the deviation from the target value. In this case, consider increasing the simulated population size and/or simulated number of draws. Also, try looking at the median value, which may be closer to the target value than the mean is when there are small counts.

- Remember the distinction between model verification (Do model outputs accurately reflect model inputs? Did we make a mistake in *building* the model?) and model validation (Do model outputs accurately represent reality? Did we make a mistake in *designing* the model?). Be sure to validate model results, including to your own back-of-the-envelope calculation (:ref:`see this page for details <vivarium_best_practices_boe>`) as well as external data sources that may have evaluated similar research questions.

- Vivarium has an "untracked" population that can cause confusing issues if it is set to something unexpected. This is something that may be investigated in the `interactive simulation`_.

General list of things to verify
++++++++++++++++++++++++++++++++

Generally, we should verify that the simulation outputs match the expected values for everything that is in the simulation artifact, including:

- Population age and sex structure at initialization and over time 

- Risk factor exposures

- Risk factor effects

- All-cause mortality, YLL, YLD, and DALY rates
  
  - YLL, YLD, and DALY outcomes are generally not in the artifact, so they will need to be pulled from GBD directly

  - Note that all cause YLD rates are not expected to verify since the simulation outputs will represent YLDs due to modeled causes only. If they differ dramatically, consider adjusting for this in post-processing.

- Cause-specific parameters (including all relevant data such as prevalence, incidence, remission, excess mortality, cause-specific mortality, YLDs, YLLs, DALYs)

- Intervention coverage

- Intervention effects

- Any other modeled parameters!

Verification of these parameters compared to artifact and GBD values is generally done for the baseline scenario and alternative scenarios as necessary (especially for intervention coverage and effect verification). However, they should also be evalutated in alternative scenarios to ensure that there are no unexpected changes.

Additionally, especially if simulating across several years, we should check not only that the parameters meet verification criteria across all simulated years, but also that there are no unacceptable/obvious trends in simulated outputs across simulated years (ex: some mortality rate increasing with time, etc.).

.. _vivarium_interactive_sim_v_and_v:

Interactive simulation
++++++++++++++++++++++

Some things may be easier to verify in interactive simulations rather than from count data outputs. Such parameters may include:

- Risk factors with many categories (ex: LBWSG) because stratifying simulation outcomes by many categories may be too much of a drain on computation time

- Continuous risk factors. Mean exposure values and/or proportions below a given threshold may be included as simulation outputs (TODO: provide link/info), but otherwise interactive simulations may be helpful to verify risk exposure standard deviation or other measures.

- Many risk effects on the same event. If it is not computationally feasible to stratify the event rate by all risk factors that affect it, the best way to verify these risk effects may be to re-calculate and verify the event *rate* at the simulant level.

- Continuous risk effects. TODO: provide details or examples

- Continuity at the simulant level (to ensure that parameters that should not change over time *do* not change over time at the individual level)

However, V&V in an interactive simulation generally uses a smaller population size than V&V of simulation results,
since we have not developed a system for parallelizing interactive simulation runs.
This smaller population size can make certain aspects of the simulation harder to check.

Some examples of often desired outputs
++++++++++++++++++++++++++++++++++++++

- Averted {outcome, such as DALYs/deaths/etc.} count per 100,000 person-years among {population} in an alternative scenario relative to the baseline scenario in {simulated timeframe}

- Averted {outcome} count (count space) among {population} in an alternative scenario relative to the baseline scenario in {simulated timeframe}

  - Note: in order to get count-space results, we will have to scale out rate-space results by the population size of our modeled location (you can usually find this in the artifact)

- Absolute reduction in risk exposure (low birth weight prevalence decreased from X% in the baseline scenario to Y% in the alternative scenario)

- Relative reduction in risk exposure (low birthweight prevalence was reduced by 50% of its baseline value in the alternative scenario)

Some coding resources and demos
+++++++++++++++++++++++++++++++

Some helpful documentation sources include:

- `GBD shared functions documentation on the HUB <https://hub.ihme.washington.edu/display/SF/Shared+Functions+Home>`_, particularly the pages on:

  - `db_queries <https://scicomp-docs.ihme.washington.edu/db_queries/current/index.html>`_, and

  - `get_draws <https://scicomp-docs.ihme.washington.edu/get_draws/current/get_draws.html#module-get_draws>`_

- `Vivarium Artifact documentation <https://vivarium.readthedocs.io/en/latest/api_reference/framework/artifact/artifact.html>`_. Note that the research team will generally only use the :code:`.load()` function and not any of the Artifact editing functions

- `Vivarium InteractiveContext documentation <https://vivarium.readthedocs.io/en/latest/api_reference/interface/interactive.html?highlight=InteractiveContext#vivarium.interface.interactive.InteractiveContext>`_


Some example of verification and validation notebooks can be found here:

- :ref:`Acute malnutrition phase I model <2019_concept_model_vivarium_ciff_sam>`, `cause and risk exposure verification notebook <https://github.com/ihmeuw/vivarium_research_ciff_sam/blob/main/model_validation/model4/alibow_gbd_verification/model_4.0.1.ipynb>`_ (note there were some outstanding V&V issues in this model version). 

- `An interactive simulation demo notebook <https://github.com/ihmeuw/vivarium_research_iv_iron/blob/main/validation/maternal/interactive_simulations/Interactive%20simulation%20demo.ipynb>`_

.. todo::

  Add more demos/examples and make them more useful. They are not currently designed to be stand-alone resources and probably need someone to talk through them to make them make sense. It would be nice to add in enough commentary so that they could stand alone.