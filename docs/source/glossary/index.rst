.. _glossary:

========
Glossary
========

.. glossary::

   Burn-in Period
      A period prior to the simulation time frame in which the Vivarium model is
      run in order to intialize simulation parameters.
   
   Concept Model
      A detailed description of an entire simulation model.  Concept models
      use narrative, math equations, and diagrams to describe a system
      we wish to study.

   Entity Component System
      One of the key software patterns used by ``vivarium`` to facilitate
      the modular design of simulation models. In our modeling, the entities are
      people and the components represent different attributes of those people.
      The software is organized around components representing
      attributes rather than components representing people.
      [`Wikipedia article <https://en.wikipedia.org/wiki/Entity_component_system>`__]

   Global Burden of Disease
      The Global Burden of Disease Study (GBD) is a comprehensive regional and
      global research program of disease burden that assesses mortality and
      disability from major diseases, injuries, and risk factors.
      [`Wikipedia article <https://en.wikipedia.org/wiki/Global_Burden_of_Disease_Study>`__]

   Internally Consistent Model
      A model whose rules and logical structure agree with the data used to
      drive it. Internally consistent models are
      :term:`verifiable <Verification>`.
      
   Simulation Outcome
      A quantity we can observe in a simulation. Some examples: counts of
      drugs distributed, cases of disease, counts of death.

   Sufficiently Complex Model
      A model that contains enough detail to accurately capture all
      :term:`outcomes <Simulation Outcome>` of interest.

   Validation
      The process by which we determine whether a model is "correct",
      meaning it makes logical sense, has the sort of behavior we expect,
      and is sufficiently accurate for the intended modeling purposes.
      Validation applies both to the :term:`concept model <Concept Model>`
      and the simulation implementation of the model, though the criteria
      we use for validation may be different.

   Verification
      The process by which we determine whether a simulation implementation
      is error free and accurately implements a
      :term:`concept model <Concept Model>`.
