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
  :depth: 2

1.0 Overview
++++++++++++

This module assesses whether a simulant receives an ultrasound during antenatal care, tracks the details of that care, and outputs a "believed" gestational age for that simulant based on the simulant's real gestational age and the measurement error of the gestational age dating care they recieved. Notably, coverage and type of ultrasounds offered at ANC visits will be scenario-dependent.

2.0 Module Diagram and Data
+++++++++++++++++++++++++++++++

2.1 Module Diagram
----------------------

.. image:: ai_ultrasound_module_diagram.drawio.svg

2.2 Module Inputs
---------------------

.. list-table:: Module required inputs
  :header-rows: 1

  * - Input
    - Source module
    - Application
    - Note
  * - ANC attendance
    - :ref:`Antenatal care module <2024_vivarium_mncnh_portfolio_anc_module>`
    - Decision node 1
    - True/False value for each simulant
  * - Gestational age
    - :ref:`Pregnancy module <2024_vivarium_mncnh_portfolio_pregnancy_module>`
    - Action point IV
    - Point value in days

.. todo::

  Determine if partial term pregnancies are totally excluded from this decision tree or if we should use pregnancy duration instead of gestational age here

2.3 Module Decision Nodes
-----------------------------

.. list-table:: Module decision nodes
  :header-rows: 1

  * - Decision node
    - Description
    - Information
    - Note
  * - 1
    - Attends ANC?
    - Input from antenatal care module (True/False for each simulant)
    - As described in the :ref:`facility choice model document
      <2024_facility_model_vivarium_mncnh_portfolio>`, the ANC
      propensity is correlated with other propensities, and the
      categories must be ordered False < True when sampling ANC
      attendance from its propensity
  * - 2
    - Receives ultrasound?
    - Scenario-dependent variable: see the :ref:`pregnancy component scenario table <MNCNH pregnancy component scenario table>` for values (and baseline coverage section below for baseline coverage)
    - "Yes" if random propensity <= scenario-specific ultrasound coverage defined in table
  * - 3
    - Ultrasound type?
    - Scenario-dependent variable: :ref:`pregnancy component scenario table <MNCNH pregnancy component scenario table>` for values (and baseline coverage section below for baseline coverage)
    - Possible values are "none," "standard," and "AI-assisted"

2.3.1: Baseline coverage
~~~~~~~~~~~~~~~~~~~~~~~~~

We assume 100% of ultrasounds are standard (and 0% are AI-assisted) at baseline. Baseline coverage of ultrasound among those who attend ANC:

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
    - Record :code:`none` for ultrasound type
    - Record to output A
    - 
  * - II
    - Record :code:`standard` for ultrasound type
    - Record to output A
    - 
  * - III
    - Record :code:`ai_assisted` for ultrasound type
    - Record to output A
    - 
  * - IV
    - Calculate estimated gestational age
    - See instructions below and record to output B
    -
  * - V
    - Record believed preterm status
    - Record to output C: *believed preterm* if estimated gestational
      age < 37 weeks; *believed term* if estimated gestational age is
      37+ weeks
    -

2.4.1 Calculation of estimated gestational age
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Estimated gestational age should be calculated by adding a randomly sampled value from a normal distribution with a mean of zero and a standard deviation defined below to the simulant's assigned gestational age at birth exposure (input from the pregnancy module).

.. list-table:: Standard deviation values by ultrasound type
  :header-rows: 1

  * - Ultrasound type
    - Standard deviation
  * - None
    - 10 days
  * - Standard
    - 6.7 days
  * - AI-assisted ultrasound
    - 5 days

.. todo::

  Add references for these numbers. Here's the `notebook I used to
  get them
  <https://github.com/ihmeuw/vivarium_research_mncnh_portfolio/blob/main/facility_choice/2025_04_17a_investigate_ga_error.ipynb>`_,
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
  * - A. Type of ultrasound received
    - *none* / *standard* / *AI-assisted*
    - Used for V&V and for estimation of output B
  * - B. Estimated gestational age
    - Point values in days
    - Used for V&V, calculation of output C, and determination of
      eligibility for antenatal corticosteroids
  * - C. Believed preterm status
    - *believed preterm* / *believed term*
    - Used for V&V and for facility choice module in intrapartum component


3.0 Assumptions and limitations
++++++++++++++++++++++++++++++++

* The timing of ANC visits impacts the ability to accurately estimate gestational age, but we use an average instead. 
* The current version of the model does not include any false positive
  rates for LBW. Since a false positive is unlikely to cause harm, only
  inclusion in higher level care, this seems sufficient.
* Single cohort of pregnancies does not allow for cyclic effects such as improved ANC visit rates due to ultrasound presence 
* The data for baseline ultrasound utilization at the ANC is non-ideal for all of the locations. Our data for Ethiopia is most aligned with the value we are trying to find, as it comes from `a paper that
  estimates ultrasound utilization at ANC <https://pmc.ncbi.nlm.nih.gov/articles/PMC8905208/>`_, in a specific municipality of Jimma in Ethiopia. For Nigeria, our literature value is less trustworthy, coming from a paper that reports the percentage of 
  study participants who had previously had an obstetric ultrasound. We were unable to find any value for Pakistan, instead using data from the India DHS 2015-2016 to inform our Pakistan ultrasound coverage.
  India is probably not a great proxy for Pakistan, as use of ultrasound technology in India is heavily regulated (`see here <https://pmc.ncbi.nlm.nih.gov/articles/PMC5441446/#:~:text=In%20an%20attempt%20to%20curb,to%20facilitate%20sex%E2%80%93selective%20abortions>`__.).

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
* Confirm gestational age estimate and real gestational age have the correct margin of error based on ultrasound type 

5.0 References
+++++++++++++++

