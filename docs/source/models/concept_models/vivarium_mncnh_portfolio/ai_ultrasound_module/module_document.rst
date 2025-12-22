.. role:: underline
    :class: underline

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

.. _2024_vivarium_mncnh_portfolio_ai_ultrasound_module:

======================================
AI Ultrasound Module
======================================

.. contents::
  :local:

1.0 Overview
++++++++++++

This module assesses whether a simulant receives an ultrasound during a specific antenatal care visit, tracks the details of that care, and outputs a "believed" gestational age at the end of pregnancy for that simulant based on the simulant's real gestational age at the end of pregnancy and the measurement error specific to the timing and type of gestational age dating care they recieved. Notably, coverage and type of ultrasounds offered at ANC visits will be scenario-dependent.

2.0 Module Diagram and Data
+++++++++++++++++++++++++++++++

2.1 Module Diagram
----------------------

.. image:: ai_ultrasound_module_diagram.drawio.png


2.2 Module Inputs
---------------------

.. list-table:: Module required inputs
  :header-rows: 1

  * - Input
    - Source module
    - Application
    - Note
  * - ANC attendance category
    - :ref:`Antenatal care module <2024_vivarium_mncnh_portfolio_anc_module>`
    - Decision node 1
    - 4-category exposure variable.  As described in the :ref:`facility
      choice model document
      <2024_facility_model_vivarium_mncnh_portfolio>`, ANC attendance is
      correlated with other model variables.
  * - Gestational age at end of pregnancy (intervention modified)
    - :ref:`Pregnancy module <2024_vivarium_mncnh_portfolio_pregnancy_module>`
    - Action point IV
    - Point value in days

2.3 Module Decision Nodes
-----------------------------

.. list-table:: Module decision nodes
  :header-rows: 1

  * - Decision node
    - Description
    - Information
    - Note
  * - 1
    - Attends ANC at any point in pregnancy?
    - Decide "No" if ANC attendance
      category is *none*; decide "Yes" otherwise
    - ANC attendance has four exposure categories: The *none* category
      corresponds to no ANC attendance, while the other three categories
      indicate some ANC attendance
  * - 2
    - Receives ultrasound?
    - Scenario-dependent variable: see the :ref:`pregnancy component scenario table <MNCNH pregnancy component scenario table>` for values (and baseline coverage section below for baseline coverage)
    - "Yes" if random propensity <= scenario-specific ultrasound coverage defined in table
  * - 3
    - Ultrasound type?
    - Scenario-dependent variable: :ref:`pregnancy component scenario table <MNCNH pregnancy component scenario table>` for values (and baseline coverage section below for baseline coverage)
    - Possible values are "none," "standard," and "AI-assisted"
  * - 4
    - Attends ANC during first trimester?
    - Decide "Yes" if ANC attendance category is ``first_trimester_only`` or ``first_trimester_and_later_pregnancy``. Decide "No" otherwise.
    - 
  * - 5
    - Is estimated gestational age < 37 weeks?
    - "Yes" or "No" depending on the estimated gestational age
      calculated in Action point IV
    -

2.3.1: Baseline coverage
~~~~~~~~~~~~~~~~~~~~~~~~~

We assume 100% of ultrasounds are standard (and 0% are AI-assisted) at baseline.  Baseline coverage of ultrasound among those who attend ANC:

.. list-table:: Baseline ultrasound coverage values
  :header-rows: 1

  * - Location
    - Value
    - Note
  * - Ethiopia
    - 60.7%
    - `Ethiopia ultrasound rate <https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8905208/>`_
  * - Nigeria
    - 58.7%
    - `Nigeria ultrasound rate <https://www.researchgate.net/publication/51782476_Awareness_of_information_expectations_and_experiences_among_women_for_obstetric_sonography_in_a_south_east_Nigeria_population>`_ 
  * - Pakistan
    - 66.7%
    - `India ultrasound rate <https://dhsprogram.com/pubs/pdf/FR339/FR339.pdf>`_ (Table 8.12, averaged percentage of women attending ANC 1-3 times and 4+ times). we currently use ultrasound utilization rates derived from the India DHS 2015-2016 as an imperfect proxy that can hopefully be improved with further research



2.4 Module Action Points
---------------------------

.. list-table:: Module action point
  :header-rows: 1

  * - Action point
    - Description
    - Information
    - Note
  * - I
    - Record ultrasound type
    - Record "None", "Standard", or "AI-assisted" to output depending on responses to decision nodes 1, 2, and 3.
    - 
  * - II
    - Record ultrasound timing
    - Record "N/A", "First trimester", or "Later pregnancy" to output depending on responses to prior decision nodes
    - 
  * - III
    - Sample random error for estimated gestational age
    - GA error is normally distributed with mean 0 and standard
      deviation depending on ultrasound type, as specified in the table
      below
    - See instructions in section `2.4.1 Calculation of estimated
      gestational age`_ below
  * - IV
    - Calculate estimated gestational age
    - Add the random GA error from Action point III to the gestational
      age from the pregnancy module, and record to output
    - See instructions in section `2.4.1 Calculation of estimated
      gestational age`_ below
  * - V
    - Record believed preterm status
    - Record ``believed_term`` or ``believed_preterm`` to output depending on respond to decision node #5
    - Corresponds to estimated gestational age < 37 weeks

2.4.1 Calculation of estimated gestational age
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Estimated gestational age should be calculated by adding a randomly sampled value from a normal distribution with a mean of zero and a standard deviation defined below to the simulant's assigned gestational age at birth exposure (input from the pregnancy module).

.. list-table:: Standard deviation values by ultrasound type
  :header-rows: 1

  * - Ultrasound type
    - Ultrasound timing
    - Standard deviation
    - Reference
  * - None
    - N/A
    - 10 days
    - 
  * - Standard
    - First trimester
    - 6.7 days
    - 
  * - Standard
    - Later pregnancy
    - XXX days
    - 
  * - AI-assisted ultrasound
    - First trimester
    - 5 days
    - 
  * - AI-assisted ultrasound
    - Later pregnancy
    - XXX days
    - 

.. note::

  The "Later pregnancy" ultrasound timing corresponds with our :ref:`Antenatal Care Attendance model <2024_vivarium_mncnh_portfolio_anc_module>` "later pregnancy visit." Attendance of the later pregnancy ANC visit is a dichotomous variable in our model that is True if a simulant attends an ANC visit at any time during their second or third trimester and false otherwise. Our model does not consider the timing or frequency with which ANC visits are attended in the second or third trimesters.

.. todo::

  Update values in the table above. The existing value for standard ultrasound represents 
  an average value across pregnancy rather than differential values based on timing of u
  ltrasound measurement. The data in this 
  `paper referenced below <https://obgyn.onlinelibrary.wiley.com/doi/10.1002/uog.15894>`__ 
  may be a good source for updating the GA estimation standard deviation to be specific to 
  trimester of measurement.

.. todo::

  Add references for these numbers. Here's the `notebook I used to
  get them
  <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/21553cec52f351d910d90ae3647cb59d83886592/facility_choice/2025_04_17a_investigate_ga_error.ipynb>`_,
  which includes the citations.

.. note::
  
   BMGF sent us data on the error distribution of ultrasound accuracy based on gestational age so we could make this more accurate. 
   (See first bullet in Limitations list below for more details.)



2.5: Module Outputs
-----------------------

.. list-table:: Module outputs
  :header-rows: 1

  * - Output
    - Value
    - Note
  * - Ultrasound type
    - ``none``, ``standard``, ``ai_assisted``
    - Used to inform Ultrasound Summary output. Not needed for direct observation.
  * - Ultrasound timing
    - ``N/A``, ``first_trimester``, ``later_pregnancy``
    - Used to inform Ultrasound Summary output. Not needed for direct observation.
  * - Ultrasound summary
    - ``none``, ``standard_first_trimester``, ``standard_later_pregnancy``, ``ai_assisted_first_trimester``, ``ai_assisted_later_pregnancy``
    - Desired categories to be observered. Note that collapsing in this way allows us to avoid unnecessary stratifications in our outputs while maintaining the ability to perform V&V on ultrasound timing.
  * - Estimated gestational age
    - Point values in days
    - Used for V&V, and determination of
      eligibility for antenatal corticosteroids
  * - Believed preterm status
    - "believed preterm" or "believed term"
    - Used for V&V and for facility choice module in intrapartum component


3.0 Assumptions and limitations
++++++++++++++++++++++++++++++++

* Single cohort of pregnancies does not allow for cyclic effects such as improved ANC visit rates due to ultrasound presence 
* The data for baseline ultrasound utilization at the ANC is non-ideal for all of the locations. Our data for Ethiopia is most aligned with the value we are trying to find, as it comes from `a paper that
  estimates ultrasound utilization at ANC <https://pmc.ncbi.nlm.nih.gov/articles/PMC8905208/>`_, in a specific municipality of Jimma in Ethiopia. For Nigeria, our literature value is less trustworthy, coming from a paper that reports the percentage of 
  study participants who had previously had an obstetric ultrasound. We were unable to find any value for Pakistan, instead using data from the India DHS 2015-2016 to inform our Pakistan ultrasound coverage.
  India is probably not a great proxy for Pakistan, as use of ultrasound technology in India is heavily regulated (`see here <https://pmc.ncbi.nlm.nih.gov/articles/PMC5441446/#:~:text=In%20an%20attempt%20to%20curb,to%20facilitate%20sex%E2%80%93selective%20abortions>`__).

.. todo::

  If more suitable baseline coverage data for standard ultrasound utilization at ANCs for Nigeria or Pakistan, we should use that data instead and update 
  this documentation accordingly.

.. note:: 
  BMGF sent us data on the error distribution of ultrasound accuracy based on gestational age so we should be able to address the first limitation.
  We also found `a paper <https://obgyn.onlinelibrary.wiley.com/doi/10.1002/uog.15894>`_ that estimated uncertainty of GA dating by ultrasound was 6–7 
  days at 14 weeks' gestation, 12–14 days at 26 weeks' gestation and > 14 days in the third trimester.

  From Nathaniel: 
  I think the gestational age in the BMGF data and the gestational age in the paper are actually referring to two different things, and we may want to take both types of variation into account:

  The BMGF microdata compares the gestational age at birth estimated by ultrasound (given at some unknown time during the pregnancy) with gestational age at birth estimated by last menstrual period (LMP).
  I think the paper compares the gestational age estimated by an ultrasound in late pregnancy at the time of the late ultrasound with the "true" gestational age at the time of the late ultrasound, determined 
  from a combination of LMP and an ultrasound early in the pregnancy.
  From the BMGF data, I was interested in seeing whether there was bias (nonzero 1st moment) or skew (nonzero 3rd moment) in the error distribution depending on the gestational age at birth. It looks like there is: 
  For babies born early, you're more likely to overestimate their gestational age, whereas for babies born late, you're more likely to underestimate their gestational age (that is, when using LMP vs. an ultrasound).

  From the literature, I'm interested in how the size of the variance (2nd moment) of the error changes with the timing of when the ultrasound is administered. We know that the variance is higher when the ultrasound 
  is given later in pregnancy, and the paper quantifies how much higher.

4.0 Verification and Validation Criteria
+++++++++++++++++++++++++++++++++++++++++

* Confirm ANC visit rate matches expectations 
* Confirm ultrasound rates matches inputs for all scenarios 
* Confirm that ratio between ultrasound timing categories matches the expected ratio between first trimester ANC attendance and later pregnancy only ANC attendance. More specifically, the following should be true ``standard_first_trimester / standard_later_pregnancy == ai_assisted_first_trimester / ai_assisted_later_pregnancy == (anc_first_trimester_only + anc_first_trimester_and_later_pregnancy) / anc_later_pregnancy_only``
* Confirm that ultrasounds performed in the first trimester occur only among those who attend ANC in the first trimester according to their ANC attendance category (and likewise for later pregnancy)
* Confirm gestational age estimate and real gestational age have the correct margin of error based on ultrasound type and timing

5.0 References
+++++++++++++++

