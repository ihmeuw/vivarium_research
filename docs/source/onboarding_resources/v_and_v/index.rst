.. _v&v:

=================================
Verification and Validation (V&V)
=================================

.. contents::
   :local:

This document is intended as an introduction to the details of the V&V process for team members 
taking on this task for the first time. It is complementary to:

* :ref:`vivarium_best_practices_results_processing`, which introduces the concept of 
  V&V and the general process we follow, and provides some tips and tricks.
* The `MNCNH V&V process documentation <https://github.com/ihmeuw/vivarium_gates_mncnh/blob/main/README.rst#vv-process>`__,
  which defines our high-level V&V procedures for that model, including a sequence of tasks to follow and 
  how to interface with other team members. 

The goal of this page is to describe a more detailed set of steps for V&Ving a model run
which includes additional considerations, tips and strategies not covered in these links.
It should give an idea of the range of things you can expect to encounter during V&V,
from the types of checks you might evaluate or create, strategies you might employ to 
investigate potential issues, and what conclusions you might come to.

Info gathering
--------------
What information do I need to complete V&V? 

Before starting, it can be helpful to create a page in your notes with documentation and PR links and other info 
that you want to be familiar with and able to refer back to easily.

For example:

* PRs

  * **Model run PR** - the PR that updates the model results directory and runs the results V&V notebooks. 
    Could be created by research or engineering. May be a separate PR from the engineering implementation, or the same.
    Contains a ReviewNB link for the existing results tests.
  * **Engineering implementation PR** - the Vivarium code changes, with a written description. 
    Comparing the research and engineer descriptions of the model changes can make it easier to understand both of them, 
    and to investigate unexpected model behavior. 
    May contain a ReviewNB link for existing interactive tests. 
  * **Research documentation PR** - updates the documentation and V&V criteria for model components involved in the run. 
    Similar to the component docs (see below), but with a diff specific to this model which is helpful for understanding 
    changes and is important for writing new checks or changing existing ones.

* Docs

  * **Component documentation** related to the run. In addition to specific changes for this model, it's important to 
    understand the pre-existing documentation for the components involved. Any pages linked in the engineering implementation 
    PR (or the ticket linked in the description) or modified by the research documentation PR are likely relevant.
    May include causes, interventions, risk exposures or risk effects which were modified for this run.
  * **Other documentation** not linked in the above locations can be helpful to save as you come across it, such as while 
    trying to understand a modified component or while investigating unexpected behavior. Components upstream of or downstream to 
    one that was modified can be relevant to its behavior and how that appears in the V&V results.

* Other

  * **Base model version** that the current model code is branched off of. Recorded in the 
    `model tracker <https://uwnetid.sharepoint.com/:x:/s/ihme_simulation_science_team/cQoclqYpdBSzQ5eMH4hDp7NREgUCdN-AgoCC1OPV-Io8ssTsWA>`__.
    When reviewing V&V notebook diffs, the current test results are compared to the results for the base model version.
    Knowing the base model is important for understanding what updates are included, since 
    the team may have a number of completed or in progress model updates which have not yet been merged in.


Reviewing existing checks
-------------------------

After becoming familiar with the changes in the model, you can start making progress on V&V. 
Start by reviewing the existing checks output to check for regresssions in previously implemented behavior.

Existing checks can either be in the form of asserts, or plots. Asserts are checked automatically and will 
throw an error if any fail. Plots must be checked visually by scrolling through the ReviewNB diff linked in the model run 
and/or engineering implementation PR. 

The process of reviewing existing checks involves reviewing the diff to evaluate plots to determine whether they could 
indicate a verification or validation concern, and investigating such concerns (failing asserts or plots) to determine 
whether they are due to the model implementation not matching the docs, an error in the documentation, a bug with the V&V notebook code, 
or not actually an issue at all.

Evaluating plots
~~~~~~~~~~~~~~~~

Scroll through each of the executed V&V notebooks that has changes in the ReviewNB diff. Keep an eye out for any asserts that 
failed, and visually evaluate each plot that shows up in the diff. Diffs for other outputs such as dataframes can be ignored 
unless they are relevant to an issue investigation.

For each plot in the diff, evaluate whether it may be an indication that V&V is no longer passing. Any failing assert or 
concerning plot should be investigated further (see below). It can be helpful to first review the entire diff, adding comments to mark 
potentially concerning plots, and then return to each to consider it in more detail. 

:ref:`Remember <v_and_v_tips>` that we must both verify that the model is implemented according to the documentation, and also
validate that it accurately represents reality. Many plots visually indicate a tolerance for a certain degree of disagreement 
between the simulation and reality, making validation failures clear. However, a validating plot doesn't necessarily suggest
verification as well. For example, a value could have changed unexpectedly, significantly and systematically since the base version 
due to a bug in the model implementation, but still be within a confidence interval. 

There are a number of different kinds of plots in our V&V notebooks, which may require slightly different kinds of interpretation. 
The remainder of this section will show examples and discuss how to determine if the plots validate the model or not, 
but keep in mind verification should also be considered, somewhat separately. 

.. todo::
  probably also some plots are more about validation and some are more about verification depending on the target value?

Types of plots
^^^^^^^^^^^^^^

A common style of V&V plot plots the error of a simulation value, relative to its value in the artifact. Often this relative error 
is plotted for every age group-draw combination, as in the right-hand plots in 
`this cell <https://app.reviewnb.com/ihmeuw/vivarium_gates_mncnh/blob/main/tests%2Fmodel_notebooks%2Fresults%2Fexecuted%2Fmaternal.ipynb/file/#comment-nb-9fe95317>`__ 
for maternal disorders incidence, mortality, and YLDs.
These plots include the age group means (over all draws) as large circles, and (arbitrary) 10% error tolerance guidelines.
On the left-hand side the simulation and artifact values are plotted directly against each other. 

You'll notice that while many draw-level values are outside the target lines, the age group mean values tend to be within them. 
Without plotting age group-specific confidence intervals as a reference for draw-level uncertainty, these arbitrary age group mean 
targets are the best we can do.

Some plots do include confidence intervals, such as 
`these <https://app.reviewnb.com/ihmeuw/vivarium_gates_mncnh/blob/main/tests%2Fmodel_notebooks%2Fresults%2Fexecuted%2Fhemoglobin.ipynb/file/#comment-nb-e2329fde>`__ 
for anemia YLDs per pregnancy by age group. 
Both the simulation and artifact values plot confidence intervals representing draw-level uncertainty, 
and we generally consider these to be validating if the bars are overlapping. 
`Bar charts <https://app.reviewnb.com/ihmeuw/vivarium_gates_mncnh/blob/main/tests%2Fmodel_notebooks%2Fresults%2Fexecuted%2Ffacility_choice.ipynb/file/#comment-nb-cc651efb>`__
are similar. 

For other plots, the simulation and artifact values vary more significantly by the value they're plotted against. 
`For example <https://app.reviewnb.com/ihmeuw/vivarium_gates_mncnh/blob/main/tests%2Fmodel_notebooks%2Finteractive%2Fexecuted%2Finteractive_simulation_hemoglobin.ipynb/file/#comment-nb-f7889738>`__ 
the RR of stillbirth due to IV iron varies quite a bit by first trimester ANC hemoglobin.
Without confidence intervals, matching the expected pattern of change over different hemoglobin levels is the important criterion.

.. note::
  Other plots to discuss to cover the full range of plots you might encounter? I quickly went thru all the MNCNH notebooks and thought these 
  few were pretty representative but maybe ppl have other ideas

.. note::
  Note about randomness being re-rolled?

.. note::
  Note about stochastic variation and standard errors to set up that part of 'new tests' section?


Investigating concerns
~~~~~~~~~~~~~~~~~~~~~~

As mentioned above, there are a number of possible outcomes for a potentially concerning plot or failing assert:

* Model implementation does not match the docs (validation issue)
* Unexpected model behavior due to error in documentation (verification issue)
* Bug in the V&V notebook code
* Not actually an issue

The most critical part of investigating potential issues is sorting them into one of the above buckets. 
It's less important to know the details of what is causing the unexpected behavior, 
than reaching and communicating some degree of confidence in who
will be responsible for correcting it, since that person can then investigate further.
That being said, triaging the issue into one of these categories generally requires having some understanding 
of the root cause of the behavior. 

Additionally, unless you're very confident that the behavior you're seeing is of a significant enough magnitude 
to warrant further investigation, it may be advisable to consult the team before spending more than 15 minutes or so
looking into it.

There are many strategies which can be helpful for triaging an issue. 
Some, sorted loosely by how time consuming they are and therefore which to consider first, include:

* Looking at **related plots and outputs** in the V&V notebooks. There are likely many clues related to the value 
  or component you're investigating already displayed and easily viewed without running any new code. 
* Re-reviewing **docs and the engineering implementation**. 
  Consider what you know to have changed in the model (from the docs and implementation PR) and what values you are 
  ultimately observing an unexpected value for. From your knowledge of the model (and/or from reading docs), what 
  are all the effect pathways that lead from each change to the observed behavior. You should be able to create a 
  list of possible explanations, and rule them out or support them using various other strategies.
* Preliminary **evaluation of the errroring value** via the model notebook. Run the notebook up to the 
  check in question. Do all the simulants have unexpected values, or is there a subgroup which is associated with the issue?
  Filter the population table to only 'failing' simulants, or subgroups of interest for this update, and check their attributes in
  the table, adding columns related to the model changes as necessary. Look for any patterns in the size of the difference 
  from the expected value. If applicable, check these if these details match your expectations at previous timesteps as well.
* **Ask the team**. Summarize what you know so far in a slack message. What hypotheses have you considered, and what do you 
  think you've ruled out? What have you learned about relevant stratifications of the population, magnitude of error, and 
  behavior over the course of the sim? The team may be able to help you narrow things down, or suggest new theories for why 
  this may or may not be an issue. If it seems significant investigation will be required, another team member may be better
  suited to perform this.
* **Advanced strategies** for more in-depth investigation may include evaluating values other than the one with an observed error 
  in the ways described above, evaluating a pipeline modification sequence, and creating temporary PRs in order to utilize a 
  ReviewNB diff between two branches other than what you were originally looking at (to narrow down issues that could have been 
  introcuced in any of multiple branches).

Adding new checks
-----------------

Rough outline:

* Did engineering add them already? Or are engineering tests helpful for seeing how to check values?
* What notebook or where in the notebook to add them?
* Understanding and utilizing existing variables or re-using existing code/functions
* Asserts vs plots
* Simulant vs population-level checks
* Types of asserts including checking standard error 
* Choosing a plot type/ guidelines for creating plots

Finishing up
------------

Rough outline:

* Running/ re-running tests 
* Checking diffs 
* PR description and documentation of issues 
