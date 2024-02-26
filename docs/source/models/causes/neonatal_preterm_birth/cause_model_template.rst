.. _neonatal_preterm:

==============================
Neonatal Preterm Birth
==============================

.. contents::
   :local:
   :depth: 1

.. list-table:: Abbreviations
  :widths: 15 15 15
  :header-rows: 1

  * - Abbreviation
    - Definition
    - Note
  * - PTB
    - Preterm birth
    - 

Disease Overview
----------------

Preterm birth (typically defined as less than 37 weeks gestational age at birth) is a major risk factor
for neonatal mortality, with some neonatal deaths being directly attributed to PTB rather than other
specific causes.

GBD 2019 Modeling Strategy
--------------------------

**Fatal description**

Neonatal PTB is a cause of neonatal mortality within the aggregate neonatal disorders cause in GBD.

**Non-fatal description**

.. todo::

  Describe non-fatal PTB cause modeling strategy and associated YLDs/impairments in GBD

Cause Hierarchy
+++++++++++++++

Restrictions
++++++++++++

The following table describes any restrictions in GBD 2019 on the effects of
this cause (such as being only fatal or only nonfatal), as well as restrictions
on the ages and sexes to which the cause applies.

.. list-table:: GBD 2019 Cause Restrictions
   :widths: 15 15 20
   :header-rows: 1

   * - Restriction Type
     - Value
     - Notes
   * - Male only
     -
     -
   * - Female only
     -
     -
   * - YLL only
     -
     -
   * - YLD only
     -
     -
   * - YLL age group start
     -
     -
   * - YLL age group end
     -
     -
   * - YLD age group start
     -
     -
   * - YLD age group end
     -
     -


Vivarium Modeling Strategy
--------------------------

.. todo::

  Add an overview of the Vivarium modeling section.

Scope
+++++

.. todo::

  Describe which aspects of the disease this cause model is designed to
  simulate, and which aspects it is **not** designed to simulate.

Assumptions and Limitations
+++++++++++++++++++++++++++

.. todo::

  Describe the clinical and mathematical assumptions made for this cause model,
  and the limitations these assumptions impose on the applicability of the
  model.

Cause Model Diagram
+++++++++++++++++++

State and Transition Data Tables
++++++++++++++++++++++++++++++++

This section gives necessary information to software engineers for building the model. 
This section usually contains four tables: Definitions, State Data, Transition Data and Data Sources.

Definitions
"""""""""""

This table contains the definitions of all the states in **cause model diagram**. 

.. list-table:: State Definitions
   :widths: 5 5 20
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - 
     - 
     - 
   * - 
     - 
     - 

For example, the *Definitions* table for *SIR* and *With-Condition and Free of Condition Model* models are as below:

**SIR Model**

.. list-table:: State Definitions
   :widths: 5 5 20
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - S
     - Susceptible
     - Susceptible to {cause name}
   * - I
     - Infected
     - Infected with {cause name}
   * - R
     - Recovered
     - Infected with {cause name}


**With-Condition and Free of Condition Model**

.. list-table:: State Definitions
   :widths: 1, 5, 10
   :header-rows: 1

   * - State
     - State Name
     - Definition
   * - C
     - With **C**\ ondition
     - Born with {cause name}
   * - F
     - **F**\ ree of Condition
     - Born without {cause name}

Include states, their names and definitions appropriate to your model.

States Data
"""""""""""

This table contains the **measures** and their **values** for each state in cause-model diagram. This information is used to 
initialize the model. The common measures in each state are prevalence, birth prevalence, excess mortality rate and disability weights. 
Cause specific mortality rate is the common measure for all states. In most of the models either prevalence or birth prevalence is used. 
But in some rare cases like neonatal models both prevalence and birth prevalence are used in model initialization. The Value column contains the formula to calculate 
the measure in each state.

The structure of the table is as below. For each state, the measures and values must be included.

.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - State
     - prevalence
     - 
     - 
   * - State
     - birth prevalence
     - 
     - 
   * - State
     - excess mortality rate
     - 
     - 
   * - State
     - disabilty weights
     - 
     -
   * - ALL
     - cause specific mortality rate
     - 
     - 

An example of SI model with both prevalence and birth prevalence in the initialization is given below to explain better. 


.. list-table:: States Data
   :widths: 20 25 30 30
   :header-rows: 1
   
   * - State
     - Measure
     - Value
     - Notes
   * - S
     - prevalence
     - 1-prevalence_cid
     - 
   * - S
     - birth prevalence
     - 1-birth_prevalence_cid
     - 
   * - S
     - excess mortality rate
     - 0
     - 
   * - S
     - disabilty weights
     - 0
     -
   * - I
     - prevalence
     - prevalence_cid
     - 
   * - I
     - birth prevalence
     - birth_prevalence_cid
     - 
   * - I
     - excess mortality rate
     - :math:`\frac{\text{deaths_cid}}{\text{population} \times \text{prevalence_cid}}`
     - = (cause-specific mortality rate) / prevalence
   * - I
     - disability weights
     - :math:`\displaystyle{\sum_{s\in \text{sequelae_cid}}} \scriptstyle{\text{disability_weight}_s \,\times\, \text{prevalence}_s}`
     - = total disability weight over all sequelae
   * - ALL
     - cause specific mortality rate
     - :math:`\frac{\text{deaths_cid}}{\text{population}}`
     - 

Transition Data
"""""""""""""""

This table contains the measures needed for transition from one state to other in the cause model. The common measures used are *incident rate* to 
move from Susceptible to Infected and *remission rate* to move from Infected to Susceptible or Recovered states. Some times there may not be transition 
between states as in Neonatal disorders.

The structure of the table is as below. 

.. list-table:: Transition Data
   :widths: 10 10 10 20 30
   :header-rows: 1
   
   * - Transition
     - Source 
     - Sink 
     - Value
     - Notes
   * - i
     - S
     - I
     - 
     - 
   * - r
     - I
     - R
     - 	
     - 
 

An example, if the data is present in GBD,

.. list-table:: Transition Data
   :widths: 10 10 10 20 30
   :header-rows: 1
   
   * - Transition
     - Source 
     - Sink 
     - Value
     - Notes
   * - i
     - S
     - I
     - :math:`\frac{\text{incidence_rate_cid}}{\text{1 - prevalence_cid}}`
     - 
   * - r
     - I
     - R
     - remission_rate_cid
     - 

Sometimes, we might need to use *modelable entity id* to get data. Sometimes, we might need to calculate remission rate 
based on average case duration. In that case, the row would look like,

.. list-table:: Transition Data
   :widths: 10 10 10 20 30
   :header-rows: 1
   
   * - Transition
     - Source 
     - Sink 
     - Value
     - Notes
   * - r
     - I
     - R
     - remission_rate_cid :math:`= \frac{\text{365 person-days}}{\text{average case duration in days} \times \text{1 year}}`
     - 
	 

Data Sources
""""""""""""

This table contains the data sources for all the measures. The table structure and common measures are as below:

.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Measure
     - Sources
     - Description
     - Notes
   * - prevalence_cid
     - 
     - 
     - 
   * - birth_prevalence_cid
     - 
     - 
     -
   * - deaths_cid
     - 
     - 
     - 
   * - population
     - 
     - 
     - 
   * - sequelae_cid
     - 
     - 
     - 
   * - incidence_rate_cid
     - 
     - 
     - 
   * - remission_rate_m1594
     - 
     - 
     - 
   * - disability_weight_s{`sid`}
     - 
     - 
     - 
   * - prevalence_s{`sid`}
     - 
     - 
     - 

An example, that contains common sources for the measures,

.. list-table:: Data Sources
   :widths: 20 25 25 25
   :header-rows: 1
   
   * - Measure
     - Sources
     - Description
     - Notes
   * - prevalence_cid
     - como
     - Prevalence of cause
     - 
   * - birth_prevalence_cid
     - como
     - Birth prevalence of cause
     -
   * - deaths_cid
     - codcorrect
     - Deaths from cause
     - 
   * - population
     - demography
     - Mid-year population for given age/sex/year/location
     - 
   * - sequelae_cid
     - gbd_mapping
     - List of sequelae
     - 
   * - incidence_rate_cid/mid
     - como/dismod
     - Incidence rate for cause
     - 
   * - remission_rate_cid/mid
     - como/dismod
     - Remission rate for cause
     - 
   * - disability_weight_s{`sid`}
     - YLD appendix
     - Disability weight of sequela with id `sid`
     - 
   * - prevalence_s{`sid`}
     - como
     - Prevalence of sequela with id `sid`
     - 


Validation Criteria
+++++++++++++++++++

References
----------

.. todo::

  Update references to GBD 2019 once published

.. [GBD-2019-YLD-Appendix-Cause-Model-Template]

   Pages ???-??? in `Supplementary appendix 1 to the GBD 2017 YLD Capstone <YLD
   appendix on ScienceDirect_>`_:

     **(GBD 2017 YLD Capstone)** GBD 2017 Disease and Injury Incidence and
     Prevalence Collaborators. :title:`Global, regional, and national incidence,
     prevalence, and years lived with disability for 354 diseases and injuries
     for 195 countries and territories, 1990–2017: a systematic analysis for the
     Global Burden of Disease Study 2017`. Lancet 2018; 392: 1789–858. DOI:
     https://doi.org/10.1016/S0140-6736(18)32279-7

.. _YLD appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322797-mmc1.pdf
.. _YLD appendix on Lancet.com: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32279-7/attachment/6db5ab28-cdf3-4009-b10f-b87f9bbdf8a9/mmc1.pdf


.. [GBD-2019-CoD-Appendix-Cause-Model-Template]

   Pages ???-??? in `Supplementary appendix 1 to the GBD 2017 CoD Capstone <CoD
   appendix on ScienceDirect_>`_:

     **(GBD 2017 CoD Capstone)** GBD 2017 Causes of Death Collaborators.
     :title:`Global, regional, and national age-sex-specific mortality for 282
     causes of death in 195 countries and territories, 1980–2017: a systematic
     analysis for the Global Burden of Disease Study 2017`. Lancet 2018; 392:
     1736–88. DOI: http://dx.doi.org/10.1016/S0140-6736(18)32203-7

.. _CoD appendix on ScienceDirect: https://ars.els-cdn.com/content/image/1-s2.0-S0140673618322037-mmc1.pdf
.. _CoD appendix on Lancet.com: https://www.thelancet.com/cms/10.1016/S0140-6736(18)32203-7/attachment/5045652a-fddf-48e2-9a84-0da99ff7ebd4/mmc1.pdf

.. tip::

   In the `citations
   <https://docutils.sourceforge.io/docs/user/rst/quickref.html#citations>`_
   above, replace "Pages ???-???" with the correct page numbers for your cause
   in the two appendices, and replace the `Cause-Model-Template` suffix in the
   citation names with the name of your cause. The suffix is necessary because
   Sphinx requires citation names to be unique `throughout the entire
   documentation
   <http://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html#citations>`_.

   You can follow the syntax above to add your own references, and you can cite
   the references such as [GBD-2019-YLD-Appendix-Cause-Model-Template]_ and
   [GBD-2019-CoD-Appendix-Cause-Model-Template]_ from within your text by
   enclosing the full citation name in brackets and adding a trailing
   underscore, like this: :code:`[Full-Citation-Name]_`.

   Delete this :code:`.. tip::` `directive
   <https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#directives>`_
   once you fill in the correct page numbers for your cause in the appendices
   and rename the references appropriately.

.. admonition:: Todo for template development

  Is there a better solution to the global citation problem than making citation
  names longer to ensure that they're unique?

  The same "append a suffix" rule would also apply to other common citations
  like WHO, CDC, UpToDate, and Wikipedia. For example, the WHO citation for
  Measles would be [WHO-Measles].

  In `Pull Request 99`_, we decided to go with the above naming convention for
  now. But @James said it should be possible to adapt the sphinx builder to
  resolve citations to the most local level if desired.

.. admonition:: Todo for template development

  Decide on section names and overall structure.

  In `Pull Request 93`_, people seemed generally good with the existing
  structure, but there were several suggestions for reorganization (in
  particular from @James and @Beatrix) that I have implemented above.

  Here are some of the questions and comments we have discussed so far:

  **Question:** Are the sections in a good order?

  In `Pull Request 91`_, @Lu said:

    The template looks good to me. I was putting the model assumptions and
    limitations section right after the cause model diagram. But I think
    this order makes more sense.

    ("This order" referring to: `Cause Model Diagram`, `Data Description`,
    `Model Assumptions and Limitations`.)

  And @Yongquan said:

    Model assumptions and/or limitations can be mentioned in summary disease
    model description and fully explained in Model Assumptions and
    Limitations section.

  Whereas @James said:

    I think the restrictions in this section (`Model Assumptions and
    Limitations`) should move up to the GBD Modeling section.

    Also, perhaps we should have a section following the GBD section called
    `vivarium modeling strategy` which would include the scope and the
    restrictions we apply to the model (which might be different than GBD's
    restrictions). To serve as a narrative description accompanying the cause
    model diagram and data tables.

  On the other hand, @Kiran said:

    I am good with this structure. But, we have to make changes to the
    causes that are finished. Also, for restrictions I like it under
    Assumptions and Limitations section. We can add subsections if there are
    different types of restrictions.

  **Question:** Do we have examples of restrictions we would apply that are
  different from GBD restrictions?

    See `Pull Request 93`_ for some thoughts on this question from @Ali and
    @James.

  Also, in `Pull Request 76`_, @Beatrix said:

    I kind of like `Model Assumptions and Limitations` before the data
    description, because i like the idea of going from most high-level to most
    nitty-gritty as you go through the document. In that schema, in my mind,
    it would go:

    | model diagram,
    | then limitations,
    | then data description
    |
    | (as kiran has).

    If we wanted the diagram near the tables that reference it (which i also
    like), what if we did model diagram, then data descriptions, then
    limitations? to maintain some of the newspaper-style high level --->
    detailed ordering?
