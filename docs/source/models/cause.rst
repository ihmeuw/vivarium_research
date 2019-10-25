.. _models_cause:

===============
Modeling Causes
===============

.. todo::

   Overview of modeling GBD causes.

.. contents:

What is a cause?
----------------

The structure of a cause model
------------------------------

Common cause models
-------------------

.. todo::

   Add in visual representations of cause models (link .pngs)

+---------+--------------------------------+---------------------------------------------------------------------+
|Model    |States                          |Description                                                          |
+=========+================================+=====================================================================+
|SI_      |Susceptible-Infected            |Simulants never recover from infected (with condition) state         |
|         |                                |                                                                     |
+---------+--------------------------------+---------------------------------------------------------------------+
|SIS_     |Susceptible-Infected-Susceptible|Simulants can recover from infected (with condition) state and can   |
|         |                                |become infected again after recovery                                 |
|         |                                |                                                                     |
+---------+--------------------------------+---------------------------------------------------------------------+
|SIR_     |Susceptible-Infected-Recovered  |Simulants can recover from infected (with condition) state and cannot| 
|         |                                |become infected again after recovery                                 |
|         |                                |                                                                     |
+---------+--------------------------------+---------------------------------------------------------------------+
|Neonatal_|With and without condition      |Simulants are born either with or without condition                  |
|         |                                |                                                                     |
+---------+--------------------------------+---------------------------------------------------------------------+

.. _SI:

SI
++

In this cause model structure, simulants in the susceptible state can transition to the infected state, where they 
will remain for the remainder of the simulation. 

This cause model structure is appropriate for chronic conditions from which individuals can never recover.

Examples of conditions appropriate for SI cause models include Alzheimer’s disease and other dementias.

.. _SIS:

SIS
+++

In this cause model structure, simulants in the susceptible state can transition to the infected state and 
simulants in the infected state can transition to the susceptible state. Notably, this cause model allows for
simulants to enter the infected state more than once in a simulation. 

This cause model structure is appropriate for conditions for which individuals can have multiple cases over 
their lifetimes.

Examples of conditions appropriate for SIS cause models include diarrheal diseases.

.. _SIR:

SIR
+++

In this cause model structure, simulants in the susceptible state can transition to the infected state and 
simulants in the infected state can transition to a recovered state where they will remain for the remainder
of the simulation. Notably, the cause model allows individuals to become infected only once in a simulation.

This cause model structure is appropriate for conditions for which individuals can only have a single case, but 
do not stay in the with condition state forever.

An example of a condition appropriate for SIR cause models is measles.

.. _Neonatal:

Neonatal
++++++++

In this cause model structure, simulants who are born during the simulation can be born either with condition 
or without condition. Whether or not simulants born with condition may recover from the with condition state 
depends on the cause at hand.

This cause model structure is appropriate for conditions that are present at birth.

An example of a condition appropriate for a neonatal cause model without recovery from the condition state is 
preterm birth.

An example of a condition appropriate for a neonatal cause model with potential recovery from the condition 
state is cleft palate (which may be treated later in life).

Non-Standard Cause Models
+++++++++++++++++++++++++

There are instances where a particular cause may not fit well into one of the common cause model structures discussed above. Examples of situations that may require custom cause model structures are listed below:

- Cause models with severity splits
- Joint cause models (multiple closely related causes represented in a single cause model)
- Other scenarios required by the specifics of a given cause

Common data sources for cause models
------------------------------------

.. todo::

   Format as table with measure, measure definition, data sources and
   their uses.

Incidence
+++++++++

Birth prevalence
++++++++++++++++

Remission
+++++++++

Prevalence
++++++++++

Cause-specific mortality
++++++++++++++++++++++++

Excess mortality
++++++++++++++++

Disability weight
+++++++++++++++++

Non-standard data sources for cause models
------------------------------------------
