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

.. _GBD_disease_health:

=================================================
Understanding GBD's Disease and Health Categories
=================================================

.. contents::
  :local:

GBD Definitions
---------------

These definitions and others can be found on the `glossary Hub page <https://hub.ihme.washington.edu/pages/viewpage.action?spaceKey=INTRANET&title=IHME+Glossary>`_. 

.. list-table:: GBD definitions of terms 
  :widths: 15 15 15
  :header-rows: 1

  * - Term 
    - Definition
    - Notes
  * - Cause
    - A cause of death or disability. Includes injuries, diseases, and conditions. 
    - See cause list for more details 
  * - Cause List 
    - The list of all causes in GBD. It is a mutually exclusive and collectively exhaustive list of hierarchical categories that does not ignore any cause of death. All death and disability within GBD can be found within the cause list. 
    - 
  * - Health State 
    - The current state of health associated with a given cause and sequela.
    - 
  * - Impairment
    - The symptoms of a disease, such as vision loss as a result of diabetes. Clinically the same as sequelae. 
    - GBD calculates these very differently than sequelae despite them being clinically the same. 
  * - Sequela or Sequelae 
    - The medical conditions that can occur among people who contract a disease or suffer an injury. In other words, the negative health effects of a cause that are associated with certain health states. For example, chronic kidney disease can be a sequela of diabetes, neck pain can be a sequela of whiplash, and foot ulcers is a sequela of diabetes.
    - "Sequela" is singular. "Sequelae" is plural. 


Understanding the Definitions within the GBD Hierarchy Context
--------------------------------------------------------------

To understand the above definitions in practice, it is helpful to think of them 
in the context of a specific example. We will use cardiovascular disease for this. 
In particular, we will examine: 

- Causes: ischemic heart disease (IHD) and hypertensive heart disease (HHD) 
- Health states: medically managed, mild, moderate and severe heart failure 
- Impairments: heart failure 
- Sequelae: numerous, including "severe heart failure due to IHD" and "AMI first 2 days" among others 

Causes
++++++

The cause hierarchy diagrams for IHD and HHD are included here as a reference. 


**IHD**:

.. image:: cause_hierarchy_ihd.svg

**HHD**: 

.. image:: cause_hierarchy_hhd.svg

As you can see, the cause hierarchy slowly breaks down cause groups into more specific 
diseases, moving from all non-communicable diseases to specific types of cardiovascular 
disease. At each level, the cause hierarchy is mutually exclusive and 
collectively exhaustive - meaning all disease and death can be placed into a group at 
each level of the diagram. 

Both IHD and HHD are within the more general cardiovascular disease cause (c_491). IHD and HHD 
are causes within GBD. 

Sequelae
++++++++

Once you have selected a specific cause - for example, IHD - you can then identify the 
sequelae within that cause. These are all of the items listed below IHD and HHD in the 
diagrams above. 

Sequelae detail a specific medical condition associated with 
a cause. For example, IHD has medical conditions like acute myocardial infarction 
(a heart attack) and angina (chest pain) as associated sequelae. These are the things 
a patient might be experiencing, or a doctor might identify. 

Sequelae often contain a level of severity for that condition - for example, mild and moderate 
angina are both sequelae within IHD. 

Health States
+++++++++++++

A health state is the amount of health or disability within a sequelae. This is summarized 
through the disability weight. More information on this can be found in `this section of the cause model page <https://vivarium-research.readthedocs.io/en/latest/model_design/vivarium_model_components/causes/index.html#disability-weights>`_. 

Using our above sequelae (acute myocardial infarction and angina) as an example - 
the amount of health lost while experiencing an acute 
myocardial infarction is quite high! You're likely hospitalized and in a lot of pain. 
However, the health lost from angina might be less significant. You're likely at home and 
might only experience discomfort when under stress. This affects your disability weight value. 

One important note is that health states can be shared across sequelae - and even shared 
between sequelae of different causes. For example, severe heart failure due to IHD and 
severe heart failure due to HHD have the same amount of health loss associated with them. 
Severe heart failure feels the same to a patient no matter the cause. Therefore, we would 
say that the health state and therefore the disability weight is the same for both sequelae. 

Impairments
+++++++++++

In some cases, a medical condition or sequela might have multiple causes. For example, heart failure. 
It is caused by both IHD and HHD (and others!) and has sequelae associated with both causes. 
We even learned above that it has the exact same health state in both causes. Heart failure 
is an example of an impairment. 

An impairment is a sequelae that shows up in 2 or more causes. 

In the GBD machinery, impairments are estimated very differently than sequelae. Instead of 
estimating a cause and then its sequelae, impairments are estimated first and then attributed 
to certain causes as their sequelae. 

This process exists for analytical reasons. For example, a lot of data exists for anemia (another impairment), 
which can then be split up by severity and cause to obtain the sequela "chronic kidney 
disease due to diabetes, with mild anemia". Further information the GBD calculations can 
be found on the `Impairments 101 Hub page <https://hub.ihme.washington.edu/display/GBD2016/Impairments+101>`_. 

To learn more about how to model impairments, check out this :ref:`page on modeling impairments <impairments>`. 
