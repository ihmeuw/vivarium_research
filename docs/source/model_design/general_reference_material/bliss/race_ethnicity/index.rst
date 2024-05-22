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

1.0 Research considerations
++++++++++++++++++++++++++++

Before beginning with your research, there are some crucial considerations to
take as you read through our recommendations. Determining precisely how 
concepts of race and ethnicity fit into your research question is a critical 
first step. For instance, the following are some examples of questions you may 
ask yourself in the early stages of your research: “Why are race and/or 
ethnicity important to my research question?”, “What is gained by considering 
race and/or ethnicity in my research project?”, and “Is race, ethnicity, or 
some combination of the two the appropriate measure for my analysis?”. An 
`IHME-created guide to diversity, equity, and inclusion research considerations <https://hub.ihme.washington.edu/display/DEI/DEI+and+Research+Considerations>`_ 
is a resource that may be useful in providing a framework to think through 
these sorts of questions in addition to the remainder of this guide. 

Another important consideration to take throughout the process is an 
understanding of your specific context and audience. For instance, relevant 
race and ethnicity categories and associations will vary by population; you 
should be sure to have an understanding of the dynamics of the population 
relevant to your research and remember that racial and ethnic categories used 
in one setting may not be appropriate in others. Seeking guidance from experts 
and existing resources in the field specific to your setting is encouraged!

There are three main challenges in considering race and ethnicity in biomedical 
research that have been proposed by [Kaplan-and-Bennet-2003]_ and we encourage 
you to keep them in mind throughout your work. These challenges are listed 
below and discussed in more detail in the referenced paper and will also be 
expanded upon throughout the remainder of this guide.
    
    1.  To account for the limitations of racial/ethnic data
    2.  To distinguish between race/ethnicity as risk factor or as risk marker
    3.  To avoid contributing to the racial/ethnic division of society

Finally, make sure to be aware of your target journal’s policies regarding race 
and ethnicity. Many journals have specific established guidelines that must be 
adhered to.

Taking these considerations into account in your work before and while 
implementing this guide’s recommendations will help to ensure that your research 
is not only respectful and sensitive to the complexities of race and ethnicity 
but also adherent to relevant guidelines and meaningful to your intended 
audience. 

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

3.0 Results
+++++++++++

Communication of results
------------------------

In this section we’ll discuss how health metric researchers can talk about health research related to race and ethnicity without stigmatizing, othering,
or otherwise causing harm to historically marginalized racial and ethnic groups. It is important to be aware of how we talk about race and racism, 
particularly in the field of health metrics sciences, in which we aim [[to identify and investigate health inequities]]. 

One helpful framework for differentiating ways of communicating about race is that of *race-based research vs. race-conscious research* 
(https://www.thelancet.com/article/S0140-6736(20)32076-6/fulltext). Race-based research, which is characterized by race essentialism, 
the notion that race is a biological factor (rather than a sociopolitical construct). The practice of using race in this way has historically 
been the norm in US health research, and causes harm for historically marginalized and minoritized groups, thereby exacerbating the very health 
inequities their health research may be attempting to elucidate and alleviate. For examples of outdated race-based practices in medicine, and 
their race-conscious alternatives, see Table 1 from Cerdena et al.’s 2020 paper (https://www.thelancet.com/article/S0140-6736(20)32076-6/fulltext#tbl1). 
Race-conscious research, on the other hand, calls for a shift in focus from race to racism as a key determinant of illness and health.

Key recommendations from other sources
--------------------------------------

Here we have collected recommendations from various experts and guides advocating for new standards of communication regarding racial health disparities.

1. Use a health equity lens when framing information about health disparities (https://www.cdc.gov/healthcommunication/HealthEquityGuidingPrinciples.pdf).

    Rather than allowing dominant narratives around race, individualism, and meritocracy limit our understanding of the root causes of health inequities, 
    it is important to center a health equity perspective in health metrics research.  An equity lens allows us to recognize that systems of power and oppression 
    (including white supremacy) shape institutional policies and living conditions that systematically harm populations (https://www.ama-assn.org/system/files/ama-aamc-equity-guide.pdf).

2. Use person-first language, avoid unintentional blaming, and be as specific as possible about the group to which you're referring. 
    
    For more elaboration on these tips, please see Advancing Health Equity: A Guide to Language, Narrative and Concepts (https://www.ama-assn.org/system/files/ama-aamc-equity-guide.pdf).

3. Explicitly define race during experimental design, and specify the reason for its use in the study (https://www.healthaffairs.org/content/forefront/racism-new-standard-publishing-racial-health-inequities). 
    
    In defining race as it pertains to your research, you shouldreview all relevant social, environmental, and structural factors for which race may serve as a 
    proxy measure.  "For the reader, these additional details enable careful interpretation of study results and implications. But for authors, it engenders critical thinking about racial constructs that prevent the reification of race as a biological entity. (https://www.healthaffairs.org/content/forefront/racism-new-standard-publishing-racial-health-inequities)" 

    Health metrics researchers should embrace a critical race theory framework, which provides "tools for conducting research and practice are intended to elucidate contemporary racial phenomena, expand the vocabulary with which to discuss complex racial concepts, and challenge racial hierarchies" (https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2837428/pdf/S30.pdf)

4. Cite the experts, particularly scholars of color whose work forms the basis of the field’s knowledge on racism and its effects (https://www.healthaffairs.org/content/forefront/racism-new-standard-publishing-racial-health-inequities).

.. todo::

    Fix citations and add to References list.

Reporting results accurately
----------------------------

.. todo:: 

    Use recommendations from sex/gender guide to fill out this section. This section should include 
    a. Outline goals when we present our race/ethnicity-related findings
    b. General strategy (ie explain fully in standalone parts of paper, otherwise use shorthand) - Recs for detailed description of methods with examples and recs for abbreviated description with examples 

4.0 References
++++++++++++++

.. [Kaplan-and-Bennet-2003]
    Kaplan JB, Bennett T. Use of Race and Ethnicity in Biomedical Publication. JAMA. 2003;289(20):2709–2716. doi:10.1001/jama.289.20.2709

.. [Liebler_2008]
    Liebler CA, Halpern-Manners A. A practical approach to using multiple-race response data: a bridging method for public-use microdata. Demography. 2008 Feb;45(1):143-55. doi: 10.1353/dem.2008.0004. PMID: 18390296; PMCID: PMC2831381.

