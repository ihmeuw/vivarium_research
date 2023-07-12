..
  Section title decorators for this document:

  ==============
  Document Title
  ==============

  Section Level 1 (#.0)
  +++++++++++++++++++++
  
  Section Level 2 (#.#)
  ---------------------

  Section Level 3 (#.#.#)
  ~~~~~~~~~~~~~~~~~~~~~~~

  Section Level 4
  ^^^^^^^^^^^^^^^

  Section Level 5
  '''''''''''''''

  The depth of each section level is determined by the order in which each
  decorator is encountered below. If you need an even deeper section level, just
  choose a new decorator symbol from the list here:
  https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#sections
  And then add it to the list of decorators above.


.. _bliss:

==================
BLISS Style Guide
==================

Building Language Inclusivity into Simulation Science (BLISS) is an important part of
our team's work! Here you will find our ongoing style guide for incorporating inclusive 
language into our day-to-day work.


1.0 Overview 
++++++++++++
Add an introductory paragraph here (include visual of 'What this is vs. what this isn't').

1.1 Guiding Principles
----------------------
In this section, we will outline the guiding principles of BLISS.

1.2 Glossary of General Terminology
-----------------------------------
In this section, we will create a glossary of general terminology that will be used 
throughout this style guide (e.g., for starters, we should explicitly define sex and 
gender; SGM) (include visual of 'Do's and Don'ts)

2.0 Dealing with Limitations in Upstream Research
+++++++++++++++++++++++++++++++++++++++++++++++++

Our research doesn't generally involve primary data collection.
Therefore, the *input* data to our modeling process is almost always
the *output* of other research, such as a survey, which we don't have
control over.

A lot of the time, we are multiple steps removed from the original data.
For example, many of our models use Global Burden of Disease (GBD) outputs.
These outputs are the result of a modeling process which itself
uses published results from primary research.
GBD is a little bit special in that we have a pretty good understanding of
its inner workings; see the GBD-specific section below.

Frequently, upstream research does not report sex and/or gender in ways that
reflect the difference between, and complexity of, those concepts.
Since we are stuck with whatever is reported, we have to decide
both how to use the variables reported in our analysis, and how to acknowledge
the limitations introduced to our research by these issues in our
research outputs (presentations, reports, etc).

2.1 Investigating sex and gender variables in upstream research 
---------------------------------------------------------------

**We should not take the names of sex or gender variables in input data at
face value.**
Due to prevalent misunderstandings of sex and gender as distinct and complex concepts,
these variables are very likely to be mislabeled.

Instead, we should trace these variables back to their source when it is
feasible to do so.
For example, if we are using data from a survey, we should find the actual survey
questions asked to respondents.

Sometimes, doing this investigation will make it clear that the variable
is an accurate reflection of either sex or gender.
In fact, it may be an even more precise measure, such as the presence of a Y chromosome
(a characteristic that is one facet of biological sex) or gender *identity* (as opposed
to expression).
Unfortunately, however, the most common outcome of this investigation will be to find
that sex and gender were conflated and/or restricted to a binary.
For example, a survey question that simply asks "are you male or female?" may be
interpreted by some respondents as asking about sex and by other respondents as asking
about gender.
Non-binary people who interpret it as a gender question, and intersex people who interpret
it as a sex question, will not see themselves represented in the answer choices.
They may not respond at all, or they may inaccurately choose one of the
binary categories.

When it is not feasible to trace a sex or gender variable back to its source,
either because we are many levels steps removed from the original data or because
there is a lack of public documentation about a data source,
**we should assume that it is a non-differentiated sex/gender measure,**
unless there are clear signs of effort to construct a valid sex/gender measure.
Unfortunately, given current research practices, it is most common that a single binary variable
labeled either "gender" or "sex" actually represents a non-differentiated sex/gender measure.

2.2 Methodology
---------------

As much as possible, our research should be precise about the variables of interest.
For example, if we are modeling pregnancy, the variable we are interested in is the
ability to become pregnant.
This not only clarifies that we are interested in biological sex and not gender, but is even
more precise that it is this facet of biological sex that matters,
not another facet such as chromosomal makeup.

It is frequently not possible to be this precise;
we should try to at least determine whether our research question is about sex or gender.
In some cases, even this may not be clear, for example if we are researching an
association that could be mediated by either sex or gender (or both), making them both
variables of interest.

When our input data does not include a variable of interest, we are forced to use
**proxy measures**.
A proxy measure is another variable that is highly correlated with the variable of interest,
which we use as a stand-in for it.
In the pregnancy example, we might use as a proxy whether `someone was assigned female sex at birth <https://en.wikipedia.org/wiki/Sex_assignment>`_
and is between the ages of 15 and 50.
This is an imperfect proxy for the ability to become pregnant because some people in this group
are not able to become pregnant (e.g. due to having had a hysterectomy) and in rare cases
someone may be able to become pregnant who is not in this group (e.g. due to inaccuracy in sex assignment at birth).

Whenever we use a proxy measure, we introduce a limitation into our research,
which we should acknowledge explicitly.
These limitations could lead to harm if they informed incorrect conclusions that
resulted in real-world decisions or policies.
This harm would be especially likely to impact those for whom the proxy measure and the
underlying variable of interest are not the same.
For example, if we use gender as a proxy measure for sex,
the people most likely to be left out of our conclusions are transgender, non-binary,
and intersex people.
We should always weigh these harms against the potential benefits of the research
before deciding to use a proxy measure.

2.3 Terminology
---------------

When we determine that a variable in an input data source reflects something different
than the name it was given by the upstream researchers, we should use the more
accurate terminology wherever possible, even when talking specifically about that
data source.

The only exception to this is that we should unambiguously state, somewhere in our
research outputs, the variable name we used from the input data file.
This should only need to be mentioned once.
This promotes clarity and reproducibility by ensuring that readers can find the
data we used.

For example, the first time we mentioned the sex/gender variable of the National Health and Nutrition Examination Survey (NHANES)
in the appendix of the VEHSS diabetic retinopathy paper: [VEHSS_DR]_

.. pull-quote::

  NHANES data report a variable named “gender,” but... [description of limitations]

  As such, this variable is best understood as a
  non-differentiated sex/gender measure, a proxy measure for both sex and gender that does
  not directly measure either.
  Hereafter, we refer to this variable as “sex/gender” to reflect
  this limitation.

Because we are deviating from the language of the upstream research authors, it is
a good idea to (concisely) justify why we think the original authors' language was inaccurate.
In the NHANES example, the full first sentence of the above quote was:

.. pull-quote::
  NHANES data report a variable named “gender,” but this reflects a survey question, “Is
  {NAME} male or female?,” which only allowed binary responses, was only asked by the
  interviewer if they hadn't already assumed the gender of the respondent, and could be
  interpreted as asking about biological sex.

2.4 GBD
-------

.. todo::
  Describe the best methodology/terminology for working with the "sex" variable from GBD

3.0 Discussing Simulation Science Findings
++++++++++++++++++++++++++++++++++++++++++
In this section, we will elaborate on how to incorporate BLISS principles into our own 
research processes and calculations.  

3.1 Table Presentation
----------------------

3.2 Measurement Error
---------------------
In this section, we will elaborate on how misinterpretations of sex/gender might affect 
results.

3.3 Other Gender-Inclusive Guides
---------------------------------

- DEI Research Guide
- Design team guidelines for discussing gender, sex, and sexuality
- Gates Foundation
- World Health Organization


4.0 BLISS in Action 
+++++++++++++++++++
In this section, we will use case studies to explore the different ways in which 
BLISS principles can be practically applied to specific areas of public health research. 
Elaborate on lessons learned from other projects in which we've used BLISS (e.g., VEHSS
DR paper; IV Iron communications and IDM Symposium)

5.0 References
++++++++++++++

.. [VEHSS_DR] Lundeen EA, Burke-Conte Z, Rein DB, et al. Prevalence of Diabetic Retinopathy in the US in 2021. JAMA Ophthalmol. Published online June 15, 2023. doi:10.1001/jamaophthalmol.2023.2289, `online version <https://jamanetwork.com/journals/jamaophthalmology/fullarticle/2806093>`_

.. [Bauer, 2022]
    `Sex and Gender Multidimensionality in Epidemiologic Research.` American Journal of Epidemiology, Oxford University Press, 30 September 2022, https://academic.oup.com/aje/article/192/1/122/6747669. 

.. [Ritz and Greaves, 2022]
    `Transcending the Male-Female Binary in Biomedical Research: Constellations, Heterogeneity, and Mechanism When Considering Sex and Gender.` International Journal of Environmental Research and Public Health, 30 March 2022, https://www.mdpi.com/1660-4601/19/7/4083. 
