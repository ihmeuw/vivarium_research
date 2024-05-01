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

.. _race_ethnicity:

============================================
Inclusive Health Metrics: Race and Ethnicity
============================================

On this page you will find ...

.. todo::

    Fill out this section to describe what this guide will include.

If you have any questions or comments about the content on this page - please reach out! You can
contact us directly `on GitHub <https://github.com/ihmeuw/vivarium_research/issues?q=is%3Aopen+is%3Aissue+label%3Abliss>`_ or anonymously
on our `feedback form <https://docs.google.com/forms/d/e/1FAIpQLSeCED9TFQsH-1u4QkFxJvno4WaEDz6h9rhJeyFlAlqyG7MAJg/viewform>`_.

.. list-table:: **What this is vs. What this isn't**
   :header-rows: 1

   * - This is...
     - This isn't...
   * -
     -

.. todo::

    Fill out table with some guiding principles for this guide. Can refer to same table in the sex and gender guide.

1.0 Research question
+++++++++++++++++++++

1.1 Research question
---------------------

.. todo::

    In this section we'll discuss the questions "How do race and ethnicity fit into my research question?" and "Does my research highlight biological or social components of causality?",
    and how a health metrics researcher would answer this question and use that answer to inform their research question.

1.2 Risk factors vs. risk markers
---------------------------------

.. todo::

    In this section we'll discuss the question "Does/should my research look at race and ethnicity as risk factors or as risk markers?" and how a health
    metrics researcher would answer this question and use that answer to inform their research question.

2.0 Methodology
+++++++++++++++

2.1 Data sources
----------------

As noted above, the government provides standardized race and ethnicity
categories, though these do change over time. Currently, the race
categories are American Indian or Alaska Native, Asian, Black or African American,
Native Hawaiian or Other Pacific Islander, and White. The ethnicity
categories are Hispanic or Latino and Not Hispanic or Latino.

By having a set standard,
it improves the chance that multiple data sources will have the same
categories. However, this is not guaranteed. Here, we will go through
a few scenarios of how race and ethnicity categories might be misaligned
between datasets and the options for handling each.

Nested Categories
~~~~~~~~~~~~~~~~~

In this guide, we use nested categories to mean that one dataset has more granular
categories than another. For example, one dataset might report a race group
as simply "Asian" whereas another might have many categories that fit within
this group like Chinese, Filipino, Japanese, or Korean. In fact, the US goverment
often collects both the more granular and rolled up categories of data.

Granular data is usually better, as different groups within a single race
category can have very different experiences and needs. Try to keep the
most granular data possible. However, granular data can sometimes create
issues with statistical power or small sample size. Weigh the different
pros and cons as they relate to your project, centering people's
identities and needs in the conversation.

Non-Nested Categories
~~~~~~~~~~~~~~~~~~~~~

If you need to combine multiple datasets, you will likely have to combine
race and ethnicity categories that won't match up perfectly. One option
is to take the "least common denominator" approach, which essentially means
using the most granular race and ethnicity categories possible that still
capture the data fully.

Often this will end up being the US standard categories above. We strongly
recommend against using fewer categories than the US standard unless it
is impossible to do otherwise. Creating larger buckets ends up merging
individuals with diverse experiences, backgrounds, and identities. Consider
what there is to be gained from this analysis and if race and ethnicity are
important to include if you plan to use fewer categories than the US standard.

Another option is to attempt a crosswalking approach if one or more of your
input datasets use different categories than the standard. This would allow
you to retain all of the data inputs, while keeping some granularity in categories.

Multiracial Groups
~~~~~~~~~~~~~~~~~~

Part of the US standard approach is allowing people to select as many race and
ethnicity categories as they identify with. Many people have multiracial
identities and capturing this is important. However, it creates a statistical
issue without an easy answer - how do you handle overlapping groups?

Often, someone will have made the decision about how to handle
race/ethnicity categories and multiracial individuals before you
receive the data. In this case, try to find out what was assumed
and note it appropriately in your limitations as needed.

Below we outline some options for how to handle multiracial data.
To understand them more clearly, let's provide an example of a single
person who selected both "Black or African American" and "Asian" for
their race.

The first option is to include all
combinations of race/ethnicity groups. So for this example, you would have
groups for "Black or African American alone", "Asian alone", and "Both Black or African
American and Asian". If your dataset is large
enough to support having this level of granularity in groups, this
approach can work well. However, often this leads to issues with
small sample sizes.

The second option is to exclude everyone who selected multiple race
or ethnicity groups. So we would just not count our example individual. We do not
recommend this approach.

The third is to create a large, "multiracial" group. The resulting
groups would then be "Black or African American", "Asian", and "Multiracial". We also do
not recommend this approach as the resulting group is generally
too diverse to have any meaningful conclusions about.

The fourth is to count people in all race/ethnicity groups they
selected. Therefore in our example, the individual would be
counted twice - once in "Black or African American" and once in "Asian". This
can lead to double counting in the data which might be more or
less important depending on the size of the multiracial group
in the dataset and the type of analysis. This might be a reasonable option.

The fifth option is to run analyses with
both a more limited race/ethnicity group, and then with a larger,
multiracial group. For example, you would have categories of "Asian"
and "Asian alone" both existing. "Asian" would include anyone who
selected Asian, including the multiracial person in our example,
and "Asian alone" would be people who only identify as
Asian, excluding the example individual. Often people will present
anlyses for both of these groups. This is also a reasonable
option.

Last, you can attempt to crosswalk individuals into a single
race/ethnicity group. There have been multiple attempts to do
this based on studies that allow respondents to select all racial
categories they identify with and then to pick a single one they
most identify with. [Liebler_2008]_ Therefore, the example individual
would be placed in a single racial group - either "Black or African
American" or "Asian" based on their other data. If this is
feasible based on the data present, it is also a reasonable approach.

2.2 Considering prior adjustment for race and ethnicity
-------------------------------------------------------

.. todo::

    In this section we'll discuss the question "How do our data sources adjust for race and ethnicity and how does that affect how we adjust in our own models?" and how a health
    metrics researcher would answer this question and use that answer to inform their methods.


3.0 Results
+++++++++++

.. todo::

    In this section we'll discuss the question "How do I frame my communication about race and ethnicity without stigmatizing/othering?" and how a health
    metrics researcher would answer this question and use that answer to inform their communications and language.

4.0 References
++++++++++++++

.. [Liebler_2008]
    Liebler CA, Halpern-Manners A. A practical approach to using multiple-race response data: a bridging method for public-use microdata. Demography. 2008 Feb;45(1):143-55. doi: 10.1353/dem.2008.0004. PMID: 18390296; PMCID: PMC2831381.
