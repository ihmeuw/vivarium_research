.. role:: underline
    :class: underline

..
  RST needs unique labels for its reference targets (the things you make with
  ".. my_link_name:").  This document has several pre-defined reference target
  templates you should do a find and replace on when you copy this document.
  They are {YOUR_MODEL_TITLE} which you should replace with a title-case version
  of your model name, {YOUR_MODEL_UNDERSCORE} which you should replace with an
  underscore-separated all lowercase version of your model name, and
  {YOUR_MODEL_SHORT_NAME} which you should replace with an abbreviation of your
  model title.  For instance, if you were doing a model of severe acute malnutrition
  for the Children's Investment Fund Foundation based on GBD 2019, we might have

    YOUR_MODEL_TITLE = Vivarium CIFF Severe Acute Malnutrition
    YOUR_MODEL_UNDERSCORE = 2019_concept_model_vivarium_ciff_sam
    YOUR_MODEL_SHORT_NAME = ciff_sam

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




.. _{vivarium_census_prl_synth_data}:

==================================
Vivarium Census PRL Synthetic Data
==================================

.. contents::
  :local:

+--------------------------------------+
| List of abbreviations                |
+=======+==============================+
| ACS   | American Communities Survey  |
+-------+------------------------------+
| PRL   | Probabilistic Record Linkage |
+-------+------------------------------+
| USCB  | United States Census Bureau  |
+-------+------------------------------+

.. _{census_prl}1.0:

1.0 Background
++++++++++++++

Probabilistic Record Linkage (PRL) typically uses sensitive data
containing information such as name, address, date of birth, and
sometimes even social security number, and the restrictions on access
to such data has been a barrier to developing and testing new methods
and software for PRL.  By simulating realistic, but synthetic, data
which includes these attributes, we can make PRL research and
development easier for ourselves and others.

We are certainly not the first to attempt such a data synthesis
project.  Prior approaches include FEBRL, GeCO from UQ, and UALR's
synthetic occupancy generator (SOG) approach.  There is also relevant
work from Chris Dibben, who developed `an R package for producing
synthetic data <https://www.synthpop.org.uk/index.html>`_, and from Robin Linacre, who developed `synthetic data for testing splink <http://github.com/moj-analytical-services/splink_synthetic_data>`_.

The unique elements of our work will rely on Vivarium: our synthetic
data will be informed by the United States Census Burea (USCB) needs
and publicly released USCB data (such as the American Communities
Survey [ACS]).  By using Vivarium, we will represent some realistic
dynamics of household and family structure at large scale and with
relevant geographies.  In the longer term, I hope that this work will
also be easily extendable because of our modular framework, for
example, I hope it will be somewhat straightforward to have a mash-up
of the PRL sim with the with cancer detection models we completed a
year ago, to help PRL researchers in cancer surveillance space.

.. _{census_prl}1.1:

1.1 Project overview
--------------------

All simulants will have age and sex (1), following our standard
approach.  We will also include attributes capturing race/ethnicity
(2), geographic location (3), and household id (4). To better name
individuals we will also include an attribute for their relationship
to a reference person (5). Due to the complex interplay of these
attributes we will need an enhanced fertility model (6).  We can use
our standard mortality model (7), but will need a totally new model of
migration (8) that accounts for moves by household and individual
simulants and allows migration in to and out of the tracked
population, as well as changes to geographic location and
household id.

On top of this, we will layer attributes relevant to PRL: mailing
addresses for each household (9); first, middle, and last names for
each simulant (10); date of birth (11); intended-to-be-unique
identification number modeling SSN that is missing for some and not
actually unique for others (12); and periodic observations of these
attributes through survey, census, and registry with realistic noise
(13).

Additional components we might want: time-dependent changes to
observers of sex, based on gender assigned at birth (14); multiple
households for individuals, leading to double counting in census (15);
twins and multiparous births in fertility model (16).

.. _{census_prl}5.0:

5.0 Vivarium modelling components
+++++++++++++++++++++++++++++++++

.. _{census_prl}5.1:

5.1 Vivarium concept model 
--------------------------

.. note::
  This is our standard vivarium concept model diagram we are used to seeing


.. _age-sex-etc:

5.2 Demographics
----------------

.. _{census_prl}5.2.1:

5.2.1 Population description
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  - cohort type
  - cohort length
  - age and sex structure
  - time step
  - fertility
  - stratifications 


.. _{census_prl}5.2.2:

5.2.2 Location description
~~~~~~~~~~~~~~~~~~~~~~~~~~



.. _{census_prl}5.3:

5.3 Models
----------

.. note::
  here we use the compartmental (SEIR) models with squares
  

.. _{census_prl}5.3.1:

5.3.1 Model 1
~~~~~~~~~~~~~

.. todo::

  - add verification and validation strategy
  - add python-style pseudo code to summarize model algorithm if necessary

.. _{census_prl}5.3.2:

5.3.2 Model 2
~~~~~~~~~~~~~

.. todo::

  - add verification and validation strategy
  - add python-style pseudo code to summarize model algorithm if necessary

.. _{census_prl}5.3.3:

5.3.3 Model 3
~~~~~~~~~~~~~

.. todo::

  - add verification and validation strategy
  - add python-style pseudo code to summarize model algorithm if necessary

.. _{census_prl}5.3.4:

5.3.4 Model 4
~~~~~~~~~~~~~

.. todo::

  - add verification and validation strategy
  - add python-style pseudo code to summarize model algorithm if necessary


.. _{census_prl}5.4:

5.4 Desired outputs
-------------------

.. _{census_prl}5.5:

5.5 Output meta-table shell
---------------------------

.. todo::
  - add special stratifications if necessary

.. _{census_prl}6.0:

6.0 Back of the envelope calculations
+++++++++++++++++++++++++++++++++++++


.. _{census_prl}7.0:

7.0 Limitations
+++++++++++++++

